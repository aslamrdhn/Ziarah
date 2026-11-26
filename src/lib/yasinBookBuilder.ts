import { normalizeWhatsappNumber } from './infaqConfig';

export type LineageRelation = 'bin' | 'binti';

export type YasinCoverTheme = 'emerald-classic' | 'ivory-gold' | 'midnight-calm';

export type CommemorationEventPreset =
  | 'Mengenang 7 Hari'
  | 'Mengenang 40 Hari'
  | 'Mengenang 100 Hari'
  | 'Mengenang 1000 Hari'
  | 'Haul'
  | 'Custom';

export interface YasinMemorialInput {
  deceasedName: string;
  lineageRelation: LineageRelation;
  parentName: string;
  birthDateText: string;
  deathDateText: string;
  eventPreset: CommemorationEventPreset;
  customEventLabel?: string;
  familyGreeting: string;
  familyNamesFooter?: string;
  theme: YasinCoverTheme;
}

export interface SanitizedYasinMemorialData {
  deceasedName: string;
  lineageRelation: LineageRelation;
  parentName: string;
  fullLineageLabel: string;
  birthDateText: string;
  deathDateText: string;
  lifeSpanLabel: string;
  eventLabel: string;
  familyGreeting: string;
  familyNamesFooter: string;
  theme: YasinCoverTheme;
}

export interface LocalPhotoValidationResult {
  valid: boolean;
  error?: string;
}

export const MAX_MEMORIAL_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MEMORIAL_PHOTO_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
] as const;

export const DEFAULT_FAMILY_GREETING =
  'Segala puji bagi Allah SWT, Tuhan semesta alam. Shalawat serta salam semoga senantiasa tercurah kepada junjungan kita Nabi Muhammad SAW, beserta keluarga, sahabat, dan para pengikutnya hingga akhir zaman. Dengan segala kerendahan hati, kami memohon keikhlasan doa dan hadiah Al-Fatihah dari Bapak/Ibu/Saudara/i sekalian, semoga Allah SWT menerima seluruh amal ibadah almarhum/almarhumah, mengampuni segala kekhilafannya, serta menempatkannya di sisi-Nya yang mulia.';

function cleanLine(text: string | undefined, maxLen: number): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function cleanParagraph(text: string | undefined, maxLen: number): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/\r\n/g, '\n').trim().slice(0, maxLen);
}

export function sanitizeYasinMemorialInput(
  input: Partial<YasinMemorialInput>
): SanitizedYasinMemorialData {
  const deceasedName = cleanLine(input.deceasedName, 90) || 'Almarhum / Almarhumah';
  const lineageRelation: LineageRelation =
    input.lineageRelation === 'binti' ? 'binti' : 'bin';
  const parentName = cleanLine(input.parentName, 90);

  const fullLineageLabel = parentName
    ? `${deceasedName} ${lineageRelation} ${parentName}`
    : deceasedName;

  const birthDateText = cleanLine(input.birthDateText, 50);
  const deathDateText = cleanLine(input.deathDateText, 50);

  let lifeSpanLabel = '';
  if (birthDateText && deathDateText) {
    lifeSpanLabel = `Lahir: ${birthDateText}  •  Wafat: ${deathDateText}`;
  } else if (deathDateText) {
    lifeSpanLabel = `Wafat: ${deathDateText}`;
  } else if (birthDateText) {
    lifeSpanLabel = `Lahir: ${birthDateText}`;
  }

  const preset = input.eventPreset || 'Mengenang 40 Hari';
  const customLabel = cleanLine(input.customEventLabel, 70);
  const eventLabel =
    preset === 'Custom'
      ? customLabel || 'Doa & Tahlil Kenangan'
      : preset;

  const familyGreeting =
    cleanParagraph(input.familyGreeting, 900) || DEFAULT_FAMILY_GREETING;

  const familyNamesFooter =
    cleanLine(input.familyNamesFooter, 120) || 'Keluarga Besar yang Berduka';

  const allowedThemes: YasinCoverTheme[] = [
    'emerald-classic',
    'ivory-gold',
    'midnight-calm'
  ];
  const theme: YasinCoverTheme =
    input.theme && allowedThemes.includes(input.theme)
      ? input.theme
      : 'emerald-classic';

  return {
    deceasedName,
    lineageRelation,
    parentName,
    fullLineageLabel,
    birthDateText,
    deathDateText,
    lifeSpanLabel,
    eventLabel,
    familyGreeting,
    familyNamesFooter,
    theme
  };
}

export function validateLocalMemorialPhoto(file: {
  size: number;
  type: string;
  name?: string;
} | null | undefined): LocalPhotoValidationResult {
  if (!file) {
    return { valid: false, error: 'Tidak ada berkas foto yang dipilih.' };
  }
  const mime = (file.type || '').toLowerCase();
  if (
    !ALLOWED_MEMORIAL_PHOTO_TYPES.includes(
      mime as (typeof ALLOWED_MEMORIAL_PHOTO_TYPES)[number]
    )
  ) {
    return {
      valid: false,
      error: 'Format foto harus berupa JPG, PNG, atau WebP.'
    };
  }
  if (typeof file.size !== 'number' || file.size <= 0) {
    return { valid: false, error: 'Ukuran berkas foto tidak valid.' };
  }
  if (file.size > MAX_MEMORIAL_PHOTO_BYTES) {
    return {
      valid: false,
      error: 'Ukuran foto maksimal 5 MB agar tetap ringan diproses di perangkat Anda.'
    };
  }
  return { valid: true };
}

export interface YasinPhysicalPrintOrderParams {
  whatsappConfirmNumber: string;
  memorial: SanitizedYasinMemorialData;
  copiesCount: number;
  deliveryCity: string;
}

export function buildYasinPhysicalPrintWaUrl(
  params: YasinPhysicalPrintOrderParams
): string | null {
  const normalized = normalizeWhatsappNumber(params.whatsappConfirmNumber || '');
  if (!normalized) return null;

  const safeCopies =
    Number.isFinite(params.copiesCount) && params.copiesCount >= 10
      ? Math.round(params.copiesCount)
      : 50;
  const city = cleanLine(params.deliveryCity, 60) || 'Belum disebutkan';
  const themeLabels: Record<YasinCoverTheme, string> = {
    'emerald-classic': 'Hijau Zamrud Klasik (#064E3B)',
    'ivory-gold': 'Krem Gading & Aksen Emas',
    'midnight-calm': 'Hijau Tua Malam Teduh'
  };

  const messageLines = [
    'Assalamu’alaikum Tim Kurator / Mitra Percetakan Ziarah Nusantara,',
    '',
    'Saya ingin berkonsultasi & memesan *Cetak Fisik Buku Tahlil & Doa Arwah Kenangan (Ukuran A5)* dengan rincian:',
    `• Nama Almarhum/ah: ${params.memorial.fullLineageLabel}`,
    `• Peringatan Acara: ${params.memorial.eventLabel}`,
    params.memorial.lifeSpanLabel
      ? `• Tanggal: ${params.memorial.lifeSpanLabel}`
      : null,
    `• Tema Sampul: ${themeLabels[params.memorial.theme]}`,
    `• Jumlah Cetak: ${safeCopies} eksemplar`,
    `• Kota Tujuan Pengiriman: ${city}`,
    '',
    'Mohon informasi estimasi biaya cetak dan waktu pengerjaannya. Terima kasih.'
  ].filter(Boolean);

  return `https://wa.me/${normalized}?text=${encodeURIComponent(
    messageLines.join('\n')
  )}`;
}

export const HONEST_YASIN_EXCERPT_HEADING =
  "3. KUTIPAN SURAH YASIN (AYAT 1–6, 58, 83), AL-IKHLAS, AL-MU'AWWIDZATAIN & AYAT KURSI";

export function getHonestYasinSectionHeading(isFull83Verified: boolean): {
  stepLabel: string;
  title: string;
  subtitle: string;
} {
  if (isFull83Verified) {
    return {
      stepLabel: '3. SURAH YASIN (83 AYAT LENGKAP)',
      title: '3. SURAH YASIN (83 AYAT LENGKAP)',
      subtitle: 'Bacaan lengkap Surah Yasin 83 ayat terverifikasi beserta terjemahan.',
    };
  }
  return {
    stepLabel: HONEST_YASIN_EXCERPT_HEADING,
    title: HONEST_YASIN_EXCERPT_HEADING,
    subtitle: 'Kutipan ayat pilihan Surah Yasin, Surah Al-Ikhlas, Al-Falaq, An-Nas, dan Ayat Kursi.',
  };
}

export interface BukuYasinVoluntaryInfaqParams<TReceipt = unknown> {
  amount: number;
  senderAccount: string;
  paymentMethod: 'QRIS' | 'Transfer Bank' | string;
  receipt: TReceipt;
  consentAkad: boolean;
  consentAt?: string;
}

/**
 * Builds the Firestore payload for voluntary infaq submitted on `/buku-yasin`.
 * UU PDP GUARANTEE (F3): Never includes `deceasedName`, `parentName`, lineage,
 * birth/death dates, or family greeting in the database payload, and always
 * defaults `showPublicly: false` and `isAnonymous: true`.
 */
export function buildBukuYasinVoluntaryInfaqPayload<TReceipt>(
  params: BukuYasinVoluntaryInfaqParams<TReceipt>
) {
  const cleanSender = cleanLine(params.senderAccount, 80) || 'Hamba Allah';
  return {
    programId: 'buku-yasin-a5',
    programTitle: 'Infaq Sukarela Buku Tahlil & Doa Arwah A5',
    siteId: 'buku-yasin',
    siteName: 'Layanan Penyusun Buku Yasin & Tahlil A5',
    amount: params.amount,
    donorName: 'Hamba Allah',
    paymentMethod: params.paymentMethod,
    senderAccount: cleanSender,
    receipt: params.receipt,
    isAnonymous: true,
    showPublicly: false,
    consentAkad: params.consentAkad,
    consentVersion: '2026-11-26',
    consentAt: params.consentAt || new Date().toISOString(),
    doaHajat: 'Infaq sukarela operasional & pemeliharaan digital arsip.',
  };
}

