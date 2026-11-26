const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

export interface FridayNightWindowInfo {
  weekKey: string;
  isFridayNightWindow: boolean;
  windowStatusLabel: string;
  nextFridayNightLabel: string;
}

/**
 * Menghitung kunci sesi mingguan Lingkar Doa Jumat Malam berbasis zona waktu WIB (UTC+7).
 * Format yang dihasilkan: "YYYY-Www" (misal: "2026-W48").
 */
export function getCurrentFridayNightSessionKey(now: Date = new Date()): string {
  const safeDate =
    now instanceof Date && !Number.isNaN(now.getTime()) ? now : new Date();
  const wibTime = new Date(safeDate.getTime() + WIB_OFFSET_MS);

  // Gunakan perhitungan ISO-week berbasis tanggal WIB
  const target = new Date(
    Date.UTC(
      wibTime.getUTCFullYear(),
      wibTime.getUTCMonth(),
      wibTime.getUTCDate()
    )
  );
  // Hari dalam seminggu (Senin = 1 .. Minggu = 7)
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.getTime();

  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
  }

  const weekNumber =
    1 + Math.ceil((firstThursday - target.getTime()) / (7 * 24 * 3600 * 1000));
  const isoYear = new Date(firstThursday).getUTCFullYear();
  const paddedWeek = String(weekNumber).padStart(2, '0');

  return `${isoYear}-W${paddedWeek}`;
}

export function getFridayNightWindowInfo(
  now: Date = new Date()
): FridayNightWindowInfo {
  const safeDate =
    now instanceof Date && !Number.isNaN(now.getTime()) ? now : new Date();
  const weekKey = getCurrentFridayNightSessionKey(safeDate);
  const wibTime = new Date(safeDate.getTime() + WIB_OFFSET_MS);

  // 0 = Minggu, 4 = Kamis, 5 = Jumat
  const dayOfWeek = wibTime.getUTCDay();
  const hour = wibTime.getUTCHours();

  // Malam Jumat (Kamis >= 17:00 WIB s/d Jumat <= 23:59 WIB)
  const isThursdayEvening = dayOfWeek === 4 && hour >= 17;
  const isFridayAllDay = dayOfWeek === 5;
  const isFridayNightWindow = isThursdayEvening || isFridayAllDay;

  const windowStatusLabel = isFridayNightWindow
    ? 'Sesi Lingkar Doa Pekan Ini Sedang Berlangsung (Kamis Petang – Jumat Malam WIB)'
    : 'Ruang Bacaan Mandiri Terbuka • Sesi Bersama Berikutnya: Kamis Ba’da Maghrib & Jumat Malam';

  return {
    weekKey,
    isFridayNightWindow,
    windowStatusLabel,
    nextFridayNightLabel: 'Setiap Kamis Ba’da Maghrib s/d Jumat Pukul 23.59 WIB'
  };
}

/**
 * Menghasilkan label partisipan yang 100% jujur tanpa angka palsu / Math.random().
 */
export function formatHonestParticipantLabel(realCount: number): string {
  const safeCount =
    typeof realCount === 'number' && Number.isFinite(realCount)
      ? Math.max(0, Math.floor(realCount))
      : 0;

  if (safeCount <= 0) {
    return 'Mulai lingkaran doa malam ini — Anda bisa menjadi pembaca pertama.';
  }

  return `${safeCount.toLocaleString('id-ID')} jamaah telah ikut melantunkan doa pada sesi pekan ini.`;
}

/**
 * Menyamarkan nama partisipan publik pada Lingkar Doa Jumat Malam menjadi inisial santun
 * atau "Hamba Allah" untuk mencegah injeksi teks bebas tanpa moderasi (F7).
 */
export function maskParticipantInitials(rawName: string): string {
  const cleaned = String(rawName || '')
    .replace(/[^a-zA-Z\s.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned || /^hamba\s+allah$/i.test(cleaned)) {
    return 'Hamba Allah';
  }

  const tokens = cleaned
    .split(' ')
    .map((t) => t.replace(/[^a-zA-Z]/g, ''))
    .filter((t) => t.length > 0)
    .slice(0, 3);

  if (tokens.length === 0) {
    return 'Hamba Allah';
  }

  const initials = tokens.map((t) => `${t[0].toUpperCase()}.`).join('');
  return `Hamba Allah (${initials})`;
}

/**
 * Membangun payload presensi Lingkar Doa yang hanya memuat 3 field aman
 * (weekKey, displayName, createdAt) sesuai aturan Firestore F7.
 */
export function buildLingkarDoaPublicPayload<TCreatedAt>(params: {
  weekKey: string;
  displayName: string;
  createdAt: TCreatedAt;
}): {
  weekKey: string;
  displayName: string;
  createdAt: TCreatedAt;
} {
  const cleanName =
    String(params.displayName || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 60) || 'Hamba Allah';

  return {
    weekKey: String(params.weekKey || '').trim().slice(0, 16),
    displayName: cleanName,
    createdAt: params.createdAt,
  };
}

