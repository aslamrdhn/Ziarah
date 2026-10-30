/**
 * Utilitas sanitasi input & validasi URL dari hulu ke hilir
 * untuk mencegah XSS (javascript:/data: URL injection), karakter kontrol rusak,
 * dan penolakan Firestore Security Rules akibat string melebihi batas ukuran.
 */

export function sanitizePlainText(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    // Hapus karakter kontrol ASCII berbahaya (kecuali newline \n dan tab \t)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    // Hapus tag HTML mentah untuk mencegah injeksi markup
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultilineText(input: unknown, maxLength = 3000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeHttpUrl(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim().slice(0, maxLength);
  if (!trimmed) return '';
  if (trimmed.startsWith('/')) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString().slice(0, maxLength);
    }
    return '';
  } catch {
    return '';
  }
}

export function isSafeExternalUrl(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function sanitizeDonationAmount(input: unknown, min = 1000, max = 1000000000): number {
  const num = typeof input === 'number' ? input : Number(String(input || '').replace(/[^0-9]/g, ''));
  if (!Number.isFinite(num) || num < min) return 0;
  return Math.min(Math.round(num), max);
}
