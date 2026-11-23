import { describe, it, expect } from 'vitest';
import {
  MIN_DONATION_AMOUNT,
  OFFICIAL_QRIS_STATIC_PAYLOAD,
  computeQrisCrc16,
  parseEmvTags,
  parseQrisMerchantInfo,
  injectQrisAmountTag54,
  buildQrisPayload,
  resolveOfficialQrisPayload,
  resolveLockedTierQrisPayload,
  getCustomQrisPayloadTag54Mismatch,
} from '../qris';

describe('QRIS EMVCo Dynamic Payload & CRC-16/CCITT-FALSE', () => {
  it('enforces MIN_DONATION_AMOUNT === 2000', () => {
    expect(MIN_DONATION_AMOUNT).toBe(2000);
  });

  it('validates official Ziarah Nusantara static QRIS payload CRC-16 checksum (0F4A)', () => {
    const info = parseQrisMerchantInfo(OFFICIAL_QRIS_STATIC_PAYLOAD);
    expect(info.isValidCrc).toBe(true);
    expect(info.crc).toBe('0F4A');
    expect(info.merchantName).toBe('Ziarah Nusantara, Organis');
    expect(info.merchantCity).toBe('Jakarta Selatan');
    expect(info.postalCode).toBe('12610');
    expect(info.nmid).toBe('ID1026625971761');
  });

  it('locks amounts below 2000 (e.g. Rp 1, Rp 500, Rp 1000) to 2000 (Tag 54042000) and recomputes valid CRC-16', () => {
    for (const lowAmount of [1, 500, 1000, -50, 0]) {
      const lockedQris = injectQrisAmountTag54(OFFICIAL_QRIS_STATIC_PAYLOAD, lowAmount);
      expect(lockedQris).toContain('54042000');
      const tags = parseEmvTags(lockedQris);
      expect(tags.get('01')).toBe('12');
      expect(tags.get('54')).toBe('2000');
      expect(parseQrisMerchantInfo(lockedQris).isValidCrc).toBe(true);
    }

    const qris5000 = injectQrisAmountTag54(OFFICIAL_QRIS_STATIC_PAYLOAD, 5000);
    expect(qris5000).toContain('54045000');
    const tags5000 = parseEmvTags(qris5000);
    expect(tags5000.get('01')).toBe('12');
    expect(tags5000.get('54')).toBe('5000');
    expect(parseQrisMerchantInfo(qris5000).isValidCrc).toBe(true);
  });

  it('injects dynamic transaction amount (Tag 54) and recomputes valid CRC-16 checksum', () => {
    const dynamic50k = buildQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD, {
      useSelectedAmount: true,
      amount: 50000,
    });
    const tags = parseEmvTags(dynamic50k);
    expect(tags.get('01')).toBe('12');
    expect(tags.get('54')).toBe('50000');

    const crcIndex = dynamic50k.lastIndexOf('6304');
    const providedCrc = dynamic50k.slice(crcIndex + 4);
    const expectedCrc = computeQrisCrc16(dynamic50k.slice(0, crcIndex + 4));
    expect(providedCrc).toBe(expectedCrc);
    expect(parseQrisMerchantInfo(dynamic50k).isValidCrc).toBe(true);
  });

  it('returns unmodified static payload when useSelectedAmount is false', () => {
    const res = buildQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD, {
      useSelectedAmount: false,
      amount: 100000,
    });
    expect(res).toBe(OFFICIAL_QRIS_STATIC_PAYLOAD);
  });

  it('falls back to OFFICIAL_QRIS_STATIC_PAYLOAD when CRC-16 is tampered', () => {
    const tampered = OFFICIAL_QRIS_STATIC_PAYLOAD.slice(0, -4) + 'FFFF';
    expect(resolveOfficialQrisPayload(tampered)).toBe(OFFICIAL_QRIS_STATIC_PAYLOAD);
    expect(resolveOfficialQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD)).toBe(OFFICIAL_QRIS_STATIC_PAYLOAD);
  });

  it('enforces Tag 54 matching lockedAmount when customTierPayload has a different Tag 54 or static payload', () => {
    const custom75k = injectQrisAmountTag54(OFFICIAL_QRIS_STATIC_PAYLOAD, 75000);
    expect(getCustomQrisPayloadTag54Mismatch(custom75k, 15000)).toBe(75000);
    expect(getCustomQrisPayloadTag54Mismatch(custom75k, 75000)).toBeNull();

    const locked15k = resolveLockedTierQrisPayload(
      OFFICIAL_QRIS_STATIC_PAYLOAD,
      15000,
      custom75k
    );
    const tags = parseEmvTags(locked15k);
    expect(tags.get('54')).toBe('15000');
    expect(parseQrisMerchantInfo(locked15k).isValidCrc).toBe(true);
  });

  it('compresses transfer proof image to valid base64 dataUrl <= 350,000 characters via compressProofImage', async () => {
    const { compressProofImage } = await import('../transferProof');
    const origWindow = (globalThis as any).window;
    const origDocument = (globalThis as any).document;

    try {
      (globalThis as any).window = {
        createImageBitmap: async () => ({
          width: 1440,
          height: 2560,
          close: () => {},
        }),
      };
      (globalThis as any).document = {
        createElement: (tag: string) => {
          if (tag === 'canvas') {
            return {
              width: 0,
              height: 0,
              getContext: () => ({
                fillStyle: '#FFFFFF',
                fillRect: () => {},
                drawImage: () => {},
                getImageData: (_x: number, _y: number, w: number, h: number) => {
                  const arr = new Uint8ClampedArray(w * h * 4);
                  for (let i = 0; i < arr.length; i += 4) {
                    const v = (i / 4) % 2 === 0 ? 20 : 240;
                    arr[i] = v;
                    arr[i + 1] = v;
                    arr[i + 2] = v;
                    arr[i + 3] = 255;
                  }
                  return { data: arr };
                },
              }),
              toDataURL: (_type?: string, quality?: any) => {
                const q = typeof quality === 'number' ? quality : 0.72;
                const repeatCount = q > 0.6 ? 400_000 : 120_000;
                return `data:image/jpeg;base64,${'A'.repeat(repeatCount)}`;
              },
            };
          }
          return {};
        },
      };

      const dummyFile = new File([new Uint8Array(4096)], 'struk-bca.jpg', { type: 'image/jpeg' });
      const result = await compressProofImage(dummyFile);
      expect(result.dataUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
      expect(result.dataUrl.length).toBeLessThanOrEqual(350_000);
      expect(result.width).toBeLessThanOrEqual(960);
      expect(result.height).toBeLessThanOrEqual(960);
      expect(result.referenceCode).toMatch(/^ZN-/);
    } finally {
      (globalThis as any).window = origWindow;
      (globalThis as any).document = origDocument;
    }
  });
});


