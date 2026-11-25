import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  dataUrlToBlob,
  downloadBlobFile,
  shareOrDownloadFile,
  isRestrictedWebViewOrIframe,
  OBJECT_URL_REVOKE_DELAY_MS,
} from '../directDownload';

const SAMPLE_PNG_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

describe('Universal Mobile-Safe File Download & Native Upload Mechanics', () => {
  const clickMock = vi.fn();
  const appendChildMock = vi.fn();
  const removeChildMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    clickMock.mockReset();
    appendChildMock.mockReset();
    removeChildMock.mockReset();

    const mockWindow: Record<string, unknown> = {};
    mockWindow.self = mockWindow;
    mockWindow.top = mockWindow;

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('document', {
      createElement: (tag: string) => ({
        tagName: tag.toUpperCase(),
        href: '',
        download: '',
        rel: '',
        target: '',
        style: {},
        click: clickMock,
      }),
      body: {
        appendChild: appendChildMock,
        removeChild: removeChildMock,
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('converts a base64 PNG dataUrl into a typed Blob synchronously via dataUrlToBlob', () => {
    const blob = dataUrlToBlob(SAMPLE_PNG_DATA_URL);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('delays URL.revokeObjectURL by 30,000ms in downloadBlobFile so mobile browsers never cancel the download', async () => {
    const createObjectUrlSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:https://ziarahnusantara.my.id/mock-uuid');
    const revokeObjectUrlSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const blob = dataUrlToBlob(SAMPLE_PNG_DATA_URL);
    const result = await downloadBlobFile(blob, 'buku-yasin-a5.pdf');

    expect(result).toBe('downloaded');
    expect(createObjectUrlSpy).toHaveBeenCalledWith(blob);
    expect(appendChildMock).toHaveBeenCalledTimes(1);
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(removeChildMock).toHaveBeenCalledTimes(1);

    // CRITICAL: URL.revokeObjectURL must NOT be called synchronously after click()
    expect(revokeObjectUrlSpy).not.toHaveBeenCalled();

    // Advance 29 seconds — still must not be revoked
    vi.advanceTimersByTime(OBJECT_URL_REVOKE_DELAY_MS - 1000);
    expect(revokeObjectUrlSpy).not.toHaveBeenCalled();

    // Advance past 30,000ms — now it must be revoked cleanly
    vi.advanceTimersByTime(1500);
    expect(revokeObjectUrlSpy).toHaveBeenCalledWith(
      'blob:https://ziarahnusantara.my.id/mock-uuid'
    );
  });

  it('gracefully falls back to downloadBlobFile when Web Share API is unavailable in shareOrDownloadFile', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(
      'blob:https://ziarahnusantara.my.id/fallback-share'
    );
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const blob = dataUrlToBlob(SAMPLE_PNG_DATA_URL);
    const status = await shareOrDownloadFile(
      blob,
      'munajat-7-malam.pdf',
      'Buku Saku Munajat 7 Malam'
    );

    expect(status).toBe('downloaded');
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it('detects in-app WebViews and iframe contexts via isRestrictedWebViewOrIframe', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36 Instagram 312.0.0.0',
    });
    expect(isRestrictedWebViewOrIframe()).toBe(true);

    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    });
    expect(isRestrictedWebViewOrIframe()).toBe(false);
  });

  it('enforces native <label> + className="sr-only" (never className="hidden") and min-h-[44px] on all file inputs', () => {
    const rootDir = process.cwd();
    const filesToAudit = [
      'src/components/TransferProofUploadField.tsx',
      'src/views/BukuYasinKenangan.tsx',
      'src/views/AdminKurator.tsx',
    ];

    for (const relPath of filesToAudit) {
      const content = fs.readFileSync(path.join(rootDir, relPath), 'utf8');
      expect(content).toContain('type="file"');
      expect(content).toContain('className="sr-only"');
      expect(content).not.toMatch(/type="file"[\s\S]{0,160}className="hidden"/);
      expect(content).not.toContain('fileInputRef.current?.click()');
      expect(content).not.toContain('photoInputRef.current?.click()');
    }

    const transferProofContent = fs.readFileSync(
      path.join(rootDir, 'src/components/TransferProofUploadField.tsx'),
      'utf8'
    );
    expect(transferProofContent).toContain('min-h-[44px]');
    expect(transferProofContent).toContain('Ganti Foto');
  });

  it('enforces direct .PDF download buttons and forbids wrapping window.print() in setTimeout across all print/PDF views', () => {
    const rootDir = process.cwd();
    const pdfViews = [
      'src/views/BukuYasinKenangan.tsx',
      'src/views/MunajatTujuhMalam.tsx',
      'src/views/PanduanRuteZiarah.tsx',
      'src/components/SiteDetails.tsx',
    ];

    for (const relPath of pdfViews) {
      const content = fs.readFileSync(path.join(rootDir, relPath), 'utf8');
      expect(content).toContain('Unduh File PDF (.PDF)');
      expect(content).toContain('Bagikan / Simpan ke HP');
      expect(content).toContain('Cetak Langsung (Printer)');
      expect(content).not.toMatch(/setTimeout\(\s*\(\)\s*=>\s*\{[\s\S]{0,120}window\.print\(\)/);
    }
  });

  it('isolates vendor-pdf from homepage modulePreload in vite.config.ts and shapes Arabic via RTL canvas in pdfDocumentGenerator.ts', () => {
    const rootDir = process.cwd();
    const viteConfig = fs.readFileSync(path.join(rootDir, 'vite.config.ts'), 'utf8');
    expect(viteConfig).toContain("!dep.includes('vendor-pdf')");
    expect(viteConfig).toContain("!dep.includes('jspdf')");
    expect(viteConfig).toContain("return 'vendor-pdf'");

    const pdfGen = fs.readFileSync(
      path.join(rootDir, 'src/lib/pdfDocumentGenerator.ts'),
      'utf8'
    );
    expect(pdfGen).toContain("await import('jspdf')");
    expect(pdfGen).not.toMatch(/^import\s+.*from\s+['"]jspdf['"]/m);
    expect(pdfGen).toContain("ctx.direction = 'rtl'");
    expect(pdfGen).not.toContain('pdf.text(');
  });
});
