import { describe, it, expect } from 'vitest';
import {
  SURAH_YASIN_VERSES,
  isCompleteVerifiedYasin,
  type YasinVerse,
} from '../../data/surahYasin';
import {
  sanitizeYasinMemorialInput,
  validateLocalMemorialPhoto,
  buildYasinPhysicalPrintWaUrl,
  buildBukuYasinVoluntaryInfaqPayload,
  getHonestYasinSectionHeading,
  HONEST_YASIN_EXCERPT_HEADING,
} from '../yasinBookBuilder';
import { PRAYER_SECTIONS } from '../../data/bacaanZiarahData';

describe('Buku Yasin & Tahlil Kenangan builder & verification guard', () => {
  it('rejects empty or incomplete (< 83 verses) Surah Yasin arrays honestly', () => {
    expect(isCompleteVerifiedYasin(SURAH_YASIN_VERSES)).toBe(false);
    expect(isCompleteVerifiedYasin([])).toBe(false);

    const partial: YasinVerse[] = [
      {
        number: 1,
        arabic: 'يسٓ',
        latin: 'Yaa Siin',
        translation: 'Yaa Siin',
      },
    ];
    expect(isCompleteVerifiedYasin(partial)).toBe(false);
  });

  it('rejects 83 verses if any verse contains ellipsis (...) or wrong boundary verses', () => {
    const fake83: YasinVerse[] = Array.from({ length: 83 }, (_, idx) => ({
      number: idx + 1,
      arabic: idx === 0 ? 'يسٓ' : idx === 82 ? 'فَسُبْحَانَ الَّذِي بِيَدِهِ' : 'آية...',
      latin: 'latin',
      translation: 'terjemahan',
    }));
    expect(isCompleteVerifiedYasin(fake83)).toBe(false);
  });

  it('returns honest excerpt section heading when 83 verses are not activated (F5)', () => {
    const excerptHeading = getHonestYasinSectionHeading(false);
    expect(excerptHeading.title).toBe(HONEST_YASIN_EXCERPT_HEADING);
    expect(excerptHeading.title).toBe(
      "3. KUTIPAN SURAH YASIN (AYAT 1–6, 58, 83), AL-IKHLAS, AL-MU'AWWIDZATAIN & AYAT KURSI"
    );

    const fullHeading = getHonestYasinSectionHeading(true);
    expect(fullHeading.title).toBe('3. SURAH YASIN (83 AYAT LENGKAP)');
  });

  it('strips all deceased & family memorial PII from voluntary infaq payload and enforces showPublicly: false (F3 UU PDP)', () => {
    const fakeReceipt = {
      dataUrl: 'data:image/jpeg;base64,' + 'B'.repeat(600),
      width: 400,
      height: 600,
      fileName: 'bukti.jpg',
      sizeKb: 18,
      referenceCode: 'ZN-YASIN01',
    };

    const payload = buildBukuYasinVoluntaryInfaqPayload({
      amount: 30000,
      senderAccount: 'Bapak Hasan',
      paymentMethod: 'QRIS',
      receipt: fakeReceipt,
      consentAkad: true,
    });

    expect(payload.showPublicly).toBe(false);
    expect(payload.isAnonymous).toBe(true);
    expect(payload.consentAkad).toBe(true);
    expect(payload.siteName).toBe('Layanan Penyusun Buku Yasin & Tahlil A5');
    expect(payload.doaHajat).toBe(
      'Infaq sukarela operasional & pemeliharaan digital arsip.'
    );
    const serialized = JSON.stringify(payload);
    expect(serialized).not.toContain('deceasedName');
    expect(serialized).not.toContain('fullLineageLabel');
    expect(serialized).not.toContain('bin ');
    expect(serialized).not.toContain('binti ');
  });

  it('exposes complete verified TAWASSUL, TAHLIL, and DOA sections from bacaanZiarahData', () => {
    const ids = PRAYER_SECTIONS.map((s) => s.id);
    expect(ids).toContain('TAWASSUL');
    expect(ids).toContain('TAHLIL');
    expect(ids).toContain('DOA');
  });

  it('sanitizes family memorial inputs and formats bin/binti lineage cleanly', () => {
    const memorial = sanitizeYasinMemorialInput({
      deceasedName: '  H. Ahmad Dahlan \n ',
      lineageRelation: 'bin',
      parentName: 'KH. Abu Bakar',
      birthDateText: '1 Agustus 1868',
      deathDateText: '23 Februari 1923',
      eventPreset: 'Mengenang 40 Hari',
      theme: 'emerald-classic',
    });

    expect(memorial.deceasedName).toBe('H. Ahmad Dahlan');
    expect(memorial.fullLineageLabel).toBe('H. Ahmad Dahlan bin KH. Abu Bakar');
    expect(memorial.lifeSpanLabel).toContain('1 Agustus 1868');
    expect(memorial.lifeSpanLabel).toContain('23 Februari 1923');
    expect(memorial.eventLabel).toBe('Mengenang 40 Hari');
  });

  it('validates local memorial photo file type and 5 MB size limit', () => {
    expect(validateLocalMemorialPhoto(null).valid).toBe(false);
    expect(
      validateLocalMemorialPhoto({ size: 1024 * 500, type: 'image/jpeg' }).valid
    ).toBe(true);
    expect(
      validateLocalMemorialPhoto({ size: 1024 * 500, type: 'application/pdf' })
        .valid
    ).toBe(false);
    expect(
      validateLocalMemorialPhoto({ size: 6 * 1024 * 1024, type: 'image/png' })
        .valid
    ).toBe(false);
  });

  it('builds WhatsApp physical print consultation URL only when curator WA number is configured', () => {
    const memorial = sanitizeYasinMemorialInput({
      deceasedName: 'Hj. Siti Walidah',
      lineageRelation: 'binti',
      parentName: 'Kyai Fadlil',
      eventPreset: 'Haul',
    });

    expect(
      buildYasinPhysicalPrintWaUrl({
        whatsappConfirmNumber: '',
        memorial,
        copiesCount: 50,
        deliveryCity: 'Yogyakarta',
      })
    ).toBeNull();

    const url = buildYasinPhysicalPrintWaUrl({
      whatsappConfirmNumber: '0812-3456-7890',
      memorial,
      copiesCount: 100,
      deliveryCity: 'Surabaya',
    });
    expect(url).toContain('https://wa.me/6281234567890?text=');
    expect(decodeURIComponent(url!)).toContain('Hj. Siti Walidah binti Kyai Fadlil');
    expect(decodeURIComponent(url!)).toContain('100 eksemplar');
    expect(decodeURIComponent(url!)).toContain('Surabaya');
  });
});

