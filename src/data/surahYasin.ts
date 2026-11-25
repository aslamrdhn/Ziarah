export interface YasinVerse {
  number: number;
  arabic: string;
  latin: string;
  translation: string;
}

/**
 * CATATAN KEJUJURAN ILMIAH (ANTI-HALUSINASI):
 * Teks Al-Qur'an Surah Yasin 83 ayat lengkap wajib bersumber dari berkas mushaf resmi
 * Kemenag RI / Tanzil terverifikasi dan DILARANG diketik dari ingatan model AI.
 * Selama berkas 83 ayat penuh belum dimuat, array ini dibiarkan kosong secara jujur
 * dan Buku Kenangan A5 mencetak paket Tawassul, Tahlil Lengkap & Doa Arwah yang telah
 * terverifikasi 100%.
 */
export const SURAH_YASIN_VERSES: YasinVerse[] = [];

export function isCompleteVerifiedYasin(verses: YasinVerse[]): boolean {
  if (!Array.isArray(verses) || verses.length !== 83) {
    return false;
  }

  for (let i = 0; i < 83; i++) {
    const v = verses[i];
    if (!v || v.number !== i + 1) return false;
    if (
      typeof v.arabic !== 'string' ||
      v.arabic.trim().length === 0 ||
      v.arabic.includes('...')
    ) {
      return false;
    }
    if (typeof v.latin !== 'string' || v.latin.trim().length === 0) {
      return false;
    }
    if (typeof v.translation !== 'string' || v.translation.trim().length === 0) {
      return false;
    }
  }

  const firstVerse = verses[0].arabic;
  const lastVerse = verses[82].arabic;
  if (!firstVerse.includes('يس')) return false;
  if (!lastVerse.includes('فَسُبْحَانَ')) return false;

  return true;
}
