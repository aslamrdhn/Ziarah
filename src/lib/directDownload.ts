/**
 * Universal Mobile-Safe File Download & Native Share Helper
 * Ensures 1-tap file downloads (.pdf & .png) work reliably across Android Chrome,
 * iOS Safari, in-app WebViews (WhatsApp/Instagram/TikTok), and sandboxed iframes.
 */

export const OBJECT_URL_REVOKE_DELAY_MS = 30_000;

/**
 * Detects whether the current browsing context is a sandboxed iframe or
 * an in-app mobile WebView (WhatsApp, Instagram, FBAN/FBAV, Line, TikTok).
 */
export function isRestrictedWebViewOrIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.self !== window.top) {
      return true;
    }
  } catch {
    return true;
  }

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  return /(Instagram|FBAN|FBAV|Line\/|TikTok|BytedanceWebview|Musical\.ly|WhatsApp|WV\b|; wv\))/i.test(
    ua
  );
}

/**
 * Synchronously converts a Base64 Data URL (`data:image/png;base64,...`) into a typed `Blob`
 * without incurring network `fetch()` overhead.
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.includes(',')) {
    throw new Error('Format Data URL tidak valid.');
  }
  const [header, base64Payload] = dataUrl.split(',');
  const mimeMatch = header.match(/data:([^;]+);/i);
  const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

  const binaryStr = atob(base64Payload);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

/**
 * Triggers a direct browser download for a `Blob` (`application/pdf` or `image/png`).
 * Never revokes the Object URL synchronously—waits 30,000ms so Android Download Manager
 * and iOS Safari have enough time to stream the blob to disk.
 */
export async function downloadBlobFile(
  blob: Blob,
  filename: string
): Promise<'downloaded' | 'opened'> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'downloaded';
  }

  const safeFilename = (filename || 'dokumen-ziarah-nusantara')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-');

  const blobUrl = URL.createObjectURL(blob);

  try {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = safeFilename;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return 'downloaded';
  } catch {
    // Fallback for ultra-restrictive WebViews where anchor download click fails
    const dataUri = await blobToDataUrl(blob);
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = safeFilename;
    link.target = '_blank';
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return 'opened';
  } finally {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {
        // Ignore revoke errors
      }
    }, OBJECT_URL_REVOKE_DELAY_MS);
  }
}

/**
 * Uses the Mobile Web Share Level 2 API (`navigator.canShare({ files })` + `navigator.share`)
 * when explicitly triggered by the user via a "Bagikan / Simpan ke HP" button,
 * and falls back cleanly to `downloadBlobFile` when unsupported.
 */
export async function shareOrDownloadFile(
  blob: Blob,
  filename: string,
  title?: string
): Promise<'shared' | 'downloaded' | 'opened'> {
  const safeFilename = (filename || 'dokumen-ziarah-nusantara')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-');

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof File !== 'undefined') {
    try {
      const file = new File([blob], safeFilename, {
        type: blob.type || 'application/octet-stream',
        lastModified: Date.now(),
      });
      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title || safeFilename,
        });
        return 'shared';
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'name' in err && (err as { name: string }).name === 'AbortError') {
        // User dismissed the native share sheet intentionally — do not throw an error
        return 'shared';
      }
      // Fall through to direct download if native file share fails
    }
  }

  return downloadBlobFile(blob, safeFilename);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Gagal membaca Blob menjadi Data URL.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca Blob.'));
    reader.readAsDataURL(blob);
  });
}
