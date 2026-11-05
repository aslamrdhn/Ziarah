import { describe, it, expect } from 'vitest';
import {
  OFFICIAL_QRIS_STATIC_PAYLOAD,
  computeQrisCrc16,
  parseEmvTags,
  parseQrisMerchantInfo,
  buildQrisPayload,
} from '../qris';

describe('QRIS EMVCo Dynamic Payload & CRC-16/CCITT-FALSE', () => {
  it('validates official Ziarah Nusantara static QRIS payload CRC-16 checksum (0F4A)', () => {
    const info = parseQrisMerchantInfo(OFFICIAL_QRIS_STATIC_PAYLOAD);
    expect(info.isValidCrc).toBe(true);
    expect(info.crc).toBe('0F4A');
    expect(info.merchantName).toBe('Ziarah Nusantara, Organis');
    expect(info.merchantCity).toBe('Jakarta Selatan');
    expect(info.postalCode).toBe('12610');
    expect(info.nmid).toBe('ID1026625971761');
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
});
