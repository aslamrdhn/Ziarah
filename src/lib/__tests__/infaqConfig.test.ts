import { describe, it, expect } from 'vitest';
import {
  DEFAULT_DONATION_TIERS,
  DEFAULT_WHATSAPP_TEMPLATE,
  normalizeDonationTiers,
  normalizeWhatsappNumber,
  buildWhatsappConfirmUrl,
} from '../infaqConfig';
import {
  MIN_DONATION_AMOUNT,
  OFFICIAL_QRIS_STATIC_PAYLOAD,
  parseEmvTags,
  parseQrisMerchantInfo,
  injectQrisAmountTag54,
  resolveLockedTierQrisPayload,
} from '../qris';

describe('infaqConfig & Locked Tier QRIS Configuration', () => {
  it('verifies DEFAULT_DONATION_TIERS has exact 6 ordered amounts [2000, 5000, 10000, 15000, 20000, 30000] with non-empty labels', () => {
    expect(DEFAULT_DONATION_TIERS).toHaveLength(6);
    expect(DEFAULT_DONATION_TIERS.map((t) => t.amount)).toEqual([
      2000, 5000, 10000, 15000, 20000, 30000,
    ]);
    expect(DEFAULT_DONATION_TIERS.map((t) => t.label)).toEqual([
      'Infaq Harian',
      'Dukungan Doa & Naskah',
      'Pemeliharaan Arsip',
      'Riset Sanad & Sejarah',
      'Server & Peta Digital',
      'Sahabat Ziarah Utama',
    ]);
    for (const tier of DEFAULT_DONATION_TIERS) {
      expect(tier.label.trim().length).toBeGreaterThan(0);
    }
  });

  it('normalizes donation tiers: drops amounts < 2000, removes duplicates, preserves custom order, truncates labels to 40 chars, and falls back to default when empty/corrupt', () => {
    expect(normalizeDonationTiers(undefined)).toEqual(DEFAULT_DONATION_TIERS);
    expect(normalizeDonationTiers(null)).toEqual(DEFAULT_DONATION_TIERS);
    expect(normalizeDonationTiers([])).toEqual(DEFAULT_DONATION_TIERS);
    expect(normalizeDonationTiers([{ amount: 1 }, { amount: 1500 }, { amount: -500 }])).toEqual(
      DEFAULT_DONATION_TIERS
    );

    const customOrdered = normalizeDonationTiers([
      { amount: 25000.4, label: '  Tier Pertama Kurator  ' },
      { amount: 1000, label: 'Harus Dibuang (< 2000)' },
      { amount: 7500, label: '' }, // Empty label -> fallback 'Infaq Operasional'
      { amount: 25000, label: 'Duplikat 25rb Harus Dibuang' },
      {
        amount: 50000,
        label: 'Label Sangat Panjang Lebih Dari Empat Puluh Karakter Pasti Dipangkas',
        customQrisPayload: '000201010212...',
        customQrisImageUrl: 'https://ziarahnusantara.my.id/qris-50k.png',
      },
    ]);

    expect(customOrdered).toHaveLength(3);
    expect(customOrdered.map((t) => t.amount)).toEqual([25000, 7500, 50000]);
    expect(customOrdered[0].label).toBe('Tier Pertama Kurator');
    expect(customOrdered[1].label).toBe('Infaq Operasional');
    expect(customOrdered[2].label.length).toBeLessThanOrEqual(40);
    expect(customOrdered[2].customQrisPayload).toBe('000201010212...');
    expect(customOrdered[2].customQrisImageUrl).toBe('https://ziarahnusantara.my.id/qris-50k.png');
  });

  it('normalizes WhatsApp numbers: converts leading 0 to 62 and returns empty string for empty or too-short inputs', () => {
    expect(normalizeWhatsappNumber('0812-3456-7890')).toBe('6281234567890');
    expect(normalizeWhatsappNumber('+62 812 3456 7890')).toBe('6281234567890');
    expect(normalizeWhatsappNumber('08571234567')).toBe('628571234567');
    expect(normalizeWhatsappNumber('')).toBe('');
    expect(normalizeWhatsappNumber(undefined)).toBe('');
    expect(normalizeWhatsappNumber('08123')).toBe('');
    expect(normalizeWhatsappNumber('abc-def')).toBe('');
  });

  it('builds a valid encoded https://wa.me/... URL with placeholders filled and returns null when whatsappNumber is empty', () => {
    expect(
      buildWhatsappConfirmUrl({
        whatsappNumber: '',
        donorName: 'Ahmad',
        amount: 50000,
      })
    ).toBeNull();

    const urlWithAmount = buildWhatsappConfirmUrl({
      whatsappNumber: '0812-3456-7890',
      donorName: 'H. Ahmad',
      amount: 50000,
      programTitle: 'Infaq Operasional',
      siteName: 'Makam Sunan Ampel',
      bankName: 'Bank BCA',
      accountNumber: '5470-0856-08',
      template: DEFAULT_WHATSAPP_TEMPLATE,
    });

    expect(urlWithAmount).not.toBeNull();
    expect(urlWithAmount!.startsWith('https://wa.me/6281234567890?text=')).toBe(true);

    const decodedMsg = decodeURIComponent(urlWithAmount!.split('?text=')[1]);
    expect(decodedMsg).toContain('H. Ahmad');
    expect(decodedMsg).toContain('Rp 50.000');
    expect(decodedMsg).toContain('Infaq Operasional');
    expect(decodedMsg).toContain('(Makam Sunan Ampel)');
    expect(decodedMsg).toContain('Bank BCA 5470-0856-08');

    // When amount is not provided, 'Rp {{nominal}}' becomes 'nominal pilihan saya'
    const urlWithoutAmount = buildWhatsappConfirmUrl({
      whatsappNumber: '6281234567890',
      donorName: 'Hamba Allah',
      programTitle: 'Infaq Operasional',
      siteName: 'Umum',
      bankName: 'Bank BCA',
      accountNumber: '5470-0856-08',
    });
    const decodedNoAmount = decodeURIComponent(urlWithoutAmount!.split('?text=')[1]);
    expect(decodedNoAmount).toContain('sebesar nominal pilihan saya untuk program');
    expect(decodedNoAmount).not.toContain('{{nominal}}');
  });

  it('resolves locked tier QRIS payload with Tag 54 matching the selected amount (min 2000) and valid CRC-16 checksum', () => {
    for (const tier of DEFAULT_DONATION_TIERS) {
      const payload = resolveLockedTierQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD, tier.amount);
      const tags = parseEmvTags(payload);
      expect(tags.get('01')).toBe('12');
      expect(tags.get('54')).toBe(String(tier.amount));
      const info = parseQrisMerchantInfo(payload);
      expect(info.isValidCrc).toBe(true);
      expect(info.defaultAmount).toBe(tier.amount);
    }

    // Amounts below MIN_DONATION_AMOUNT (2000) are locked to 2000
    const clampedLow = resolveLockedTierQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD, 1);
    const lowTags = parseEmvTags(clampedLow);
    expect(lowTags.get('54')).toBe(String(MIN_DONATION_AMOUNT));
    expect(parseQrisMerchantInfo(clampedLow).isValidCrc).toBe(true);

    // Valid custom tier payload with valid EMVCo & CRC-16 is honored
    const custom75kPayload = injectQrisAmountTag54(OFFICIAL_QRIS_STATIC_PAYLOAD, 75000);
    const resolvedCustom = resolveLockedTierQrisPayload(
      OFFICIAL_QRIS_STATIC_PAYLOAD,
      15000,
      custom75kPayload
    );
    expect(resolvedCustom).toBe(custom75kPayload);
    expect(parseEmvTags(resolvedCustom).get('54')).toBe('75000');

    // Invalid custom tier payload falls back to injecting Tag 54 on basePayload
    const fallbackFromInvalidCustom = resolveLockedTierQrisPayload(
      OFFICIAL_QRIS_STATIC_PAYLOAD,
      20000,
      'INVALID_QRIS_STRING'
    );
    expect(parseEmvTags(fallbackFromInvalidCustom).get('54')).toBe('20000');
    expect(parseQrisMerchantInfo(fallbackFromInvalidCustom).isValidCrc).toBe(true);
  });
});
