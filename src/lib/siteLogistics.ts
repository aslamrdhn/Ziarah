import { ZiarahSite } from '../data/sites';

export interface SiteLogisticsInfo {
  haulSchedule: string;
  localAdab: string;
  shortEra: string;
}

export interface CuratedZiarahRoute {
  id: 'off' | 'jatim' | 'jateng' | 'jabar' | 'walisongo';
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  siteIds: string[];
}

export const CURATED_ZIARAH_ROUTES: CuratedZiarahRoute[] = [
  {
    id: 'off',
    label: 'Semua Titik (Tanpa Jalur)',
    shortLabel: 'Semua Titik',
    description: 'Menampilkan seluruh titik makam terverifikasi di Nusantara.',
    color: '#047857',
    siteIds: [],
  },
  {
    id: 'jatim',
    label: 'Jalur Wali Songo Jawa Timur',
    shortLabel: 'Jalur Jatim (5 Wali)',
    description: 'Rute berurutan: Sunan Ampel (Surabaya) → Sunan Giri (Gresik) → Sunan Gresik → Sunan Drajat (Lamongan) → Sunan Bonang (Tuban).',
    color: '#047857',
    siteIds: ['wali-2', 'wali-6', 'wali-1', 'wali-4', 'wali-3'],
  },
  {
    id: 'jateng',
    label: 'Jalur Wali Songo Jawa Tengah',
    shortLabel: 'Jalur Jateng (3 Wali)',
    description: 'Rute berurutan: Sunan Muria (Kudus) → Sunan Kudus → Sunan Kalijaga (Kadilangu, Demak).',
    color: '#0f766e',
    siteIds: ['wali-8', 'wali-5', 'wali-7'],
  },
  {
    id: 'jabar',
    label: 'Jalur Kesultanan Cirebon & Banten',
    shortLabel: 'Jalur Jabar & Banten',
    description: 'Rute berurutan: Sunan Gunung Jati (Cirebon) → Syekh Datuk Kahfi (Cirebon) → Sultan Maulana Hasanuddin (Banten).',
    color: '#b45309',
    siteIds: ['wali-9', 'ulama-19', 'auliya-1'],
  },
  {
    id: 'walisongo',
    label: 'Jalur Lengkap 9 Wali Songo (Pantura Jawa)',
    shortLabel: '9 Wali Songo Lengkap',
    description: 'Lintasan penuh 9 Wali Songo dari Surabaya, Gresik, Lamongan, Tuban, Kudus, Demak, hingga Cirebon.',
    color: '#065f46',
    siteIds: ['wali-2', 'wali-6', 'wali-1', 'wali-4', 'wali-3', 'wali-8', 'wali-5', 'wali-7', 'wali-9'],
  },
];

const HISTORICAL_LOGISTICS_BY_ID: Record<string, { haulSchedule: string; localAdab: string }> = {
  'wali-1': {
    haulSchedule: '12 Rabiul Awal (Puncak Haul Akbar Syekh Maulana Malik Ibrahim Gresik)',
    localAdab: 'Berpakaian sopan menutup aurat, menjaga ketenangan di pendopo maqbarah, dan mengikuti arahan juru kunci Gapuro Sukolilo.',
  },
  'wali-2': {
    haulSchedule: 'Pertengahan Bulan Sya’ban (Haul Agung Sunan Ampel Surabaya)',
    localAdab: 'Peziarah pria & wanita menempati jalur terpisah di area pagar cungkup; dilarang melangkahi makam pengikut di pelataran.',
  },
  'wali-3': {
    haulSchedule: '10 Muharram / Asyura (Haul Akbar Sunan Bonang Kutorejo Tuban)',
    localAdab: 'Melepas alas kaki sejak gapura paduraksa kedua dan menjaga kekhusyukan dzikir di sekitar cungkup utama.',
  },
  'wali-4': {
    haulSchedule: '10 Dzulhijjah / Bakda Idul Adha (Haul Agung Sunan Drajat Lamongan)',
    localAdab: 'Menjaga adab di tangga bukit Dalem Duwur serta menghormati tata tertib kompleks Museum & Pesantren Sunan Drajat.',
  },
  'wali-5': {
    haulSchedule: '10 Muharram / Buka Luwur Sunan Kudus (Menara Kudus)',
    localAdab: 'Wajib menjaga kesopanan pakaian, menghormati tradisi lokal Kudus (tidak membawa olahan daging sapi di area inti), dan tertib antrean cungkup.',
  },
  'wali-6': {
    haulSchedule: '24 Rabiul Awal (Haul Agung Sunan Giri Kebomas Gresik)',
    localAdab: 'Meniti anak tangga bukit Giri Kedaton dengan tenang dan melepas alas kaki sebelum memasuki serambi cungkup kayu ukir.',
  },
  'wali-7': {
    haulSchedule: '10 Dzulhijjah / Tradisi Penjamasan & Haul Sunan Kalijaga Kadilangu Demak',
    localAdab: 'Mengikuti giliran bukaan pintu cungkup oleh juru kunci Kadilangu serta tidak mengambil benda apa pun dari area maqbarah.',
  },
  'wali-8': {
    haulSchedule: '15 Muharram (Haul Akbar & Buka Luwur Sunan Muria Colo Kudus)',
    localAdab: 'Siapkan fisik untuk jalur tangga/ojek pegunungan Muria, jaga kebersihan mata air gentong, dan patuhi arahan pengurus yayasan.',
  },
  'wali-9': {
    haulSchedule: '10 Dzulhijjah / Grebeg Agung Idul Adha & Syawal (Astana Gunung Sembung Cirebon)',
    localAdab: 'Peziarah umum berdoa di depan Pintu Pasujudan (tingkat ke-3); area dalam hanya dibuka bagi keluarga keraton & izin khusus juru kunci (jeneng).',
  },
};

export function extractShortEra(era?: string): string {
  if (!era) return 'Warisan Nusantara';
  const match = era.match(/Abad\s+ke-\d+(?:\s*[–-]\s*(?:Abad\s+ke-)?\d+)?/i);
  if (match) return match[0];
  if (era.length <= 22) return era;
  return era.split('(')[0].trim().slice(0, 22);
}

export const HONEST_UNVERIFIED_LOGISTICS_FALLBACK =
  'Informasi fadhilah wasilah dan jadwal haul spesifik untuk lokasi ini sedang dalam proses verifikasi literatur oleh Tim Kurator Ziarah Nusantara.';

export function getSiteLogistics(site: ZiarahSite): SiteLogisticsInfo {
  const preset = HISTORICAL_LOGISTICS_BY_ID[site.id] || (site.legacyId ? HISTORICAL_LOGISTICS_BY_ID[site.legacyId] : undefined);

  const fallbackHaul = HONEST_UNVERIFIED_LOGISTICS_FALLBACK;
  const fallbackAdab =
    'Berwudhu sebelum memasuki area maqbarah, mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki di batas suci cungkup, serta mematuhi tata tertib juru kunci setempat.';

  const explicitAdab = Array.isArray(site.localAdab)
    ? site.localAdab.map((item) => item.trim()).filter(Boolean).join(' • ')
    : site.localAdab?.trim();

  return {
    haulSchedule: site.haulSchedule?.trim() || preset?.haulSchedule || fallbackHaul,
    localAdab: explicitAdab || preset?.localAdab || fallbackAdab,
    shortEra: extractShortEra(site.era),
  };
}

/**
 * Menghasilkan deskripsi Berkah & Wasilah Hajat yang biasa diharapkan peziarah di makam tersebut.
 * Menggunakan nilai eksplisit `site.barokahHajat` yang telah terkurasi, atau mengembalikan pemberitahuan
 * jujur tanpa menebak klaim sejarah berdasar kata kunci kota.
 */
export function getSiteBarokahHajat(site: ZiarahSite): string {
  if (Array.isArray(site.barokahHajat)) {
    const items = site.barokahHajat.map((item) => item.trim()).filter(Boolean);
    if (items.length > 0) {
      return items.join(' • ');
    }
  } else if (typeof site.barokahHajat === 'string' && site.barokahHajat.trim().length > 0) {
    return site.barokahHajat.trim();
  }

  return HONEST_UNVERIFIED_LOGISTICS_FALLBACK;
}

/**
 * Mengembalikan daftar `doaKhusus` makam. Jika makam belum memiliki item `doaKhusus` kustom di database,
 * fungsi ini menghasilkan bacaan Tawassul & Doa Munajat Ziarah Kubur umum Ahlussunnah wal Jamaah.
 */
export interface EnrichedDoaKhususItem {
  title: string;
  text: string;
  latin: string;
  translation: string;
}

export interface CompleteBarokahGuide {
  tataCaraWaktu: string[];
  doaItems: EnrichedDoaKhususItem[];
  wiridPenutupAdab: string[];
  isSpecificBarokah: boolean;
  isSpecificDoa: boolean;
  isCuratedSpecific: boolean;
  curationStatusLabel: string;
}

/**
 * Mengembalikan daftar `doaKhusus` makam yang dilengkapi transliterasi Latin dan terjemahan.
 */
export function getEffectiveSiteDoaKhusus(
  site: ZiarahSite
): { title: string; text: string; latin?: string; translation?: string }[] {
  return getSiteCompleteBarokahGuide(site).doaItems;
}

/**
 * Menghasilkan 3 Bagian Panduan Amalan Lengkap untuk seksi Barokah & Doa Khusus (Rp 5.000):
 * 1) Tata Cara & Waktu Terbaik Bertawassul Hajat di {site.name}
 * 2) Lafaz Bacaan Tawassul & Doa Khusus Hajat (Arab Naskh, Transliterasi Latin, Terjemahan Menyentuh Hati)
 * 3) Wirid Penutup & Adab Pulang Ziarah
 */
export function getSiteCompleteBarokahGuide(site: ZiarahSite): CompleteBarokahGuide {
  const contextualDoa: EnrichedDoaKhususItem = {
    title: `Doa Munajat Wasilah Hajat & Keberkahan di ${site.title}`,
    text: 'اللّٰهُمَّ إِنِّي أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ مُحَمَّدٍ نَبِيِّ الرَّحْمَةِ، وَبِكَرَامَةِ أَوْلِيَائِكَ الصَّالِحِينَ أَهْلِ هٰذِهِ الْمَقْبَرَةِ، أَنْ تَقْضِيَ حَاجَاتِنَا وَتَفْتَحَ لَنَا أَبْوَابَ الْخَيْرِ وَالتَّيْسِيرِ وَالْبَرَكَةِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ',
    latin:
      'Allaahumma innii as-aluka wa atawajjahu ilaika bi nabiyyika Muhammadin nabiyyir-rahmah, wa bi karaamati auliyaa-ikash-shaalihiina ahli haadzihil-maqbarah, an taqdhiya haajaatinaa wa taftaha lanaa abwaabal-khairi wat-taisiiri wal-barakati fid-diini wad-dun-yaa wal-aakhirah.',
    translation: `Ya Allah, sesungguhnya aku memohon dan menghadapkan diri kepada-Mu dengan wasilah Nabi-Mu Muhammad pembawa rahmat, serta dengan kemuliaan para kekasih-Mu yang shalih penghuni maqbarah ini (${site.name}), kabulkanlah hajat-hajat kami, dan bukakanlah bagi kami pintu-pintu kebaikan, kemudahan, serta keberkahan dalam agama, dunia, dan akhirat.`,
  };

  const baseItems: EnrichedDoaKhususItem[] = [];

  const isSpecificBarokah = Array.isArray(site.barokahHajat)
    ? site.barokahHajat.some((item) => item.trim().length > 0)
    : Boolean(typeof site.barokahHajat === 'string' && site.barokahHajat.trim().length > 0);
  const isSpecificDoa = Boolean(Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0);
  const isCuratedSpecific = isSpecificBarokah && isSpecificDoa;

  if (isSpecificDoa && Array.isArray(site.doaKhusus)) {
    site.doaKhusus.forEach((d) => {
      baseItems.push({
        title: d.title,
        text: d.text,
        latin:
          (d.latin && d.latin.trim()) ||
          `Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi waliyullaahish-shaalih ${site.name} (${site.title}), syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa'fu 'anhu wanfa'naa bi asraarihii wa anwaarihii wa 'uluumihii fid-diini wad-dun-yaa wal-aakhirah.`,
        translation:
          d.translation ||
          `Ya Allah, ampunilah dan muliakanlah derajat beliau (${site.name}), serta limpahkanlah kepada kami keberkahan ilmu, keteladanan, dan rahasia keshalihan beliau di dunia hingga akhirat.`,
      });
    });
  } else {
    baseItems.push({
      title: `Hadoroh & Tawassul Khusus di Pusara ${site.name}`,
      text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ وَلِيِّ اللهِ الصَّالِحِ صَاحِبِ هٰذِهِ الْمَقْبَرَةِ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ ۝ اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَانْفَعْنَا بِأَسْرَارِهِ وَأَنْوَارِهِ وَعُلُومِهِ وَبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ',
      latin:
        `Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi waliyullaahish-shaalih ${site.name} shaahibi haadzihil-maqbarah, syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa 'aafihi wa'fu 'anhu wanfa'naa bi asraarihii wa anwaarihii wa 'uluumihii wa barakaatihii fid-diini wad-dun-yaa wal-aakhirah.`,
      translation:
        `Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh kekasih Allah yang shalih penghuni maqbarah ini (${site.name}), Al-Fatihah. Ya Allah, muliakanlah beliau dan limpahkanlah kepada kami keberkahan ilmu, cahaya ketakwaan, dan kemuliaan akhlak beliau dalam urusan agama, dunia, dan akhirat.`,
    });
  }

  if (baseItems.length === 1) {
    baseItems.push(contextualDoa);
  }

  return {
    tataCaraWaktu: [
      `Waktu Utama Mustajab: Dianjurkan berziarah pada Kamis sore (malam Jumat), bakda Subuh ketika suasana maqbarah ${site.title} masih hening, atau sepertiga malam terakhir.`,
      `Persiapan & Adab Masuk: Menjaga wudhu sejak dari rumah/tempat wudhu kompleks, mengucapkan salam ziarah kubur di ambang cungkup, kemudian duduk tenang menghadap kiblat atau ke arah pusara dengan penuh takzim.`,
      `Urutan Pembacaan: Awali dengan Istighfar 3x, Shalawat Nabi 11x, Hadoroh Al-Fatihah kepada Rasulullah SAW, keluarga & sahabat beliau, lalu khususkan Al-Fatihah kepada ${site.name} sebelum membaca Yasin, Tahlil, dan Doa Khusus Hajat di bawah ini.`,
    ],
    doaItems: baseItems,
    wiridPenutupAdab: [
      `Wirid Penutup Hajat: Sebelum beranjak, baca "Yaa Hayyu Yaa Qayyuum bi rahmatika astaghiits" (11x), Shalawat Thibbil Qulub / Al-Fatih (7x), dan tutup dengan Al-Fatihah (1x) sambil menghadirkan hajat keluarga di dalam hati.`,
      `Adab Pulang & Menjaga Keberkahan: Mundur perlahan dengan sopan tanpa membelakangi cungkup secara tergesa-gesa, sisihkan infaq seikhlasnya untuk pemeliharaan maqbarah atau fakir miskin di sekitar lokasi sebagai penyempurna wasilah doa.`,
    ],
    isSpecificBarokah,
    isSpecificDoa,
    isCuratedSpecific,
    curationStatusLabel: isCuratedSpecific
      ? 'Khazanah Doa & Wasilah Terkurasi Khusus Makam Ini'
      : 'Tuntunan Tawassul & Doa Hajat Umum Ziarah Auliya — Menunggu Kurasi Spesifik Makam',
  };
}

/**
 * Menghitung jarak garis lurus (Haversine) dalam satuan kilometer (km)
 */
export function calculateDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Radius bumi dalam km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

