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
});

