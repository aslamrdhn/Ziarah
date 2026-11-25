import {
  MIN_DONATION_AMOUNT,
  OFFICIAL_QRIS_STATIC_PAYLOAD,
  resolveOfficialQrisPayload,
} from './qris';

export interface DonationTier {
  amount: number;
  label: string;
  customQrisPayload?: string;
  customQrisImageUrl?: string;
}

export const DEFAULT_BANK_ACCOUNT_INFO = {
  bankName: 'Bank BCA',
  accountNumber: '5470-0856-08',
  accountHolder: 'ARIF NURACHMAN HAKIM',
} as const;

export const INFAQ_SETTINGS_CACHE_KEY = 'ziarah_local_settings_cache';

export const DEFAULT_DONATION_TIERS: DonationTier[] = [
  { amount: 2000, label: 'Infaq Harian' },
  { amount: 5000, label: 'Doa & Naskah' },
  { amount: 10000, label: 'Rawat Arsip' },
  { amount: 15000, label: 'Riset Sanad' },
  { amount: 20000, label: 'Server & Peta' },
  { amount: 30000, label: 'Sahabat Ziarah' },
];

export const DEFAULT_WHATSAPP_TEMPLATE =
  "Assalamu'alaikum Admin Ziarah Nusantara, saya {{nama}} ingin mengonfirmasi transfer infaq sebesar Rp {{nominal}} untuk program {{program}} ({{makam}}) ke rekening {{bank}} {{rekening}}. Berikut saya lampirkan bukti transfernya. Terima kasih.";

export interface ParsedInfaqConfig {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl: string;
  qrisPayload: string;
  donationTiers: DonationTier[];
  whatsappConfirmNumber: string;
  whatsappMessageTemplate: string;
}

export function parseFirestoreInfaqConfig(
  raw?: Record<string, unknown> | null
): ParsedInfaqConfig {
  const data = raw && typeof raw === 'object' ? raw : {};
  const bankName =
    typeof data.bankName === 'string' && data.bankName.trim()
      ? data.bankName.trim()
      : DEFAULT_BANK_ACCOUNT_INFO.bankName;
  const accountNumber =
    typeof data.accountNumber === 'string' && data.accountNumber.trim()
      ? data.accountNumber.trim()
      : DEFAULT_BANK_ACCOUNT_INFO.accountNumber;
  const accountHolder =
    typeof data.accountHolder === 'string' && data.accountHolder.trim()
      ? data.accountHolder.trim()
      : DEFAULT_BANK_ACCOUNT_INFO.accountHolder;
  const qrisImageUrl =
    typeof data.qrisImageUrl === 'string' ? data.qrisImageUrl.trim() : '';
  const qrisPayload = resolveOfficialQrisPayload(
    typeof data.qrisPayload === 'string'
      ? data.qrisPayload
      : OFFICIAL_QRIS_STATIC_PAYLOAD
  );
  const donationTiers = normalizeDonationTiers(data.donationTiers);
  const whatsappConfirmNumber = normalizeWhatsappNumber(
    typeof data.whatsappConfirmNumber === 'string'
      ? data.whatsappConfirmNumber
      : ''
  );
  const whatsappMessageTemplate =
    typeof data.whatsappMessageTemplate === 'string' &&
    data.whatsappMessageTemplate.trim()
      ? data.whatsappMessageTemplate.trim()
      : DEFAULT_WHATSAPP_TEMPLATE;

  return {
    bankName,
    accountNumber,
    accountHolder,
    qrisImageUrl,
    qrisPayload,
    donationTiers,
    whatsappConfirmNumber,
    whatsappMessageTemplate,
  };
}

export function getCachedOrDefaultInfaqConfig(): ParsedInfaqConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(INFAQ_SETTINGS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return parseFirestoreInfaqConfig(parsed as Record<string, unknown>);
        }
      }
    }
  } catch {
    // Fallback to default config
  }
  return parseFirestoreInfaqConfig(null);
}

export function normalizeDonationTiers(raw?: unknown): DonationTier[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_DONATION_TIERS.map((t) => ({ ...t }));
  }

  const seenAmounts = new Set<number>();
  const normalized: DonationTier[] = [];

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const candidate = item as Record<string, unknown>;
    const rawAmount = Number(candidate.amount);
    if (!Number.isFinite(rawAmount)) continue;

    const roundedAmount = Math.round(rawAmount);
    if (roundedAmount < MIN_DONATION_AMOUNT) continue;
    if (seenAmounts.has(roundedAmount)) continue;
    seenAmounts.add(roundedAmount);

    const rawLabel =
      typeof candidate.label === 'string'
        ? candidate.label.replace(/[\u0000-\u001F\u007F]/g, '').trim()
        : '';
    const label = (rawLabel || 'Infaq Operasional').slice(0, 40);

    const customQrisPayload =
      typeof candidate.customQrisPayload === 'string' && candidate.customQrisPayload.trim()
        ? candidate.customQrisPayload.trim().slice(0, 1000)
        : undefined;
    const customQrisImageUrl =
      typeof candidate.customQrisImageUrl === 'string' && candidate.customQrisImageUrl.trim()
        ? candidate.customQrisImageUrl.trim().slice(0, 1000)
        : undefined;

    normalized.push({
      amount: roundedAmount,
      label,
      ...(customQrisPayload ? { customQrisPayload } : {}),
      ...(customQrisImageUrl ? { customQrisImageUrl } : {}),
    });
  }

  if (normalized.length === 0) {
    return DEFAULT_DONATION_TIERS.map((t) => ({ ...t }));
  }

  return normalized;
}

export function normalizeWhatsappNumber(raw?: string): string {
  if (typeof raw !== 'string') return '';
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return '';
  const converted = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
  if (converted.length < 9) return '';
  return converted;
}

export function buildWhatsappConfirmUrl(params: {
  whatsappNumber: string;
  donorName?: string;
  amount?: number;
  programTitle?: string;
  siteName?: string;
  bankName?: string;
  accountNumber?: string;
  template?: string;
}): string | null {
  const normalized = normalizeWhatsappNumber(params.whatsappNumber);
  if (!normalized) return null;

  const activeTemplate =
    typeof params.template === 'string' && params.template.trim()
      ? params.template.trim()
      : DEFAULT_WHATSAPP_TEMPLATE;

  const cleanDonor = (params.donorName || '').trim() || 'Hamba Allah';
  const cleanProgram =
    (params.programTitle || '').trim() || 'Infaq Operasional & Pemeliharaan Digital';
  const cleanSite = (params.siteName || '').trim() || 'Khazanah Auliya Nusantara';
  const cleanBank = (params.bankName || '').trim() || 'Bank BCA';
  const cleanAccount = (params.accountNumber || '').trim() || '-';

  const validAmount =
    typeof params.amount === 'number' &&
    Number.isFinite(params.amount) &&
    Math.round(params.amount) >= MIN_DONATION_AMOUNT
      ? Math.round(params.amount)
      : undefined;

  let message = activeTemplate;
  if (validAmount !== undefined) {
    message = message.replace(/\{\{\s*nominal\s*\}\}/gi, validAmount.toLocaleString('id-ID'));
  } else {
    message = message
      .replace(/Rp\s*\{\{\s*nominal\s*\}\}/gi, 'nominal pilihan saya')
      .replace(/\{\{\s*nominal\s*\}\}/gi, 'nominal pilihan saya');
  }

  message = message
    .replace(/\{\{\s*nama\s*\}\}/gi, cleanDonor)
    .replace(/\{\{\s*program\s*\}\}/gi, cleanProgram)
    .replace(/\{\{\s*makam\s*\}\}/gi, cleanSite)
    .replace(/\{\{\s*bank\s*\}\}/gi, cleanBank)
    .replace(/\{\{\s*rekening\s*\}\}/gi, cleanAccount);

  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
