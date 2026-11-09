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

export function getSiteLogistics(site: ZiarahSite): SiteLogisticsInfo {
  const preset = HISTORICAL_LOGISTICS_BY_ID[site.id];
  const titleLower = `${site.title} ${site.name}`.toLowerCase();

  let fallbackHaul = 'Setiap Tahun (Mengikuti Kalender Hijriah Majelis & Pengurus Maqbarah Setempat)';
  let fallbackAdab =
    'Berwudhu sebelum masuk maqbarah, berpakaian sopan menutup aurat, melepas alas kaki di batas suci, dan mematuhi arahan juru kunci setempat.';

  if (titleLower.includes('sekumpul') || titleLower.includes('zaini abdul ghani')) {
    fallbackHaul = '5 Rajab (Haul Akbar Abah Guru Sekumpul Martapura)';
    fallbackAdab = 'Mengikuti jalur relawan Sekumpul, menjaga kebersihan musholla Ar-Raudhah, dan mengutamakan adab majelis.';
  } else if (titleLower.includes('kholil') || titleLower.includes('bangkalan')) {
    fallbackHaul = '27 Ramadhan (Haul Akbar Syaikhona Kholil Bangkalan, Martajasah)';
    fallbackAdab = 'Berpakaian muslim rapi, menjaga ketenangan di dalam Masjid Syaikhona Kholil, dan tertib saat pergantian rombongan.';
  } else if (titleLower.includes('hasyim asy') || titleLower.includes('tebuireng') || titleLower.includes('gus dur')) {
    fallbackHaul = 'Bulan Dzulhijjah / Muharram (Haul Masyayikh Pesantren Tebuireng Jombang)';
    fallbackAdab = 'Mematuhi jadwal buka-tutup area makam Pesantren Tebuireng (tutup saat jam kegiatan santri tertentu) dan berpakaian sopan.';
  } else if (titleLower.includes('luar batang') || titleLower.includes('husein bin abubakar')) {
    fallbackHaul = 'Minggu Terakhir Bulan Syawal (Haul Akbar Habib Husein Luar Batang Jakarta)';
    fallbackAdab = 'Melepas alas kaki sebelum masuk serambi masjid, memisahkan barisan jamaah pria dan wanita, serta menjaga ketenangan.';
  } else if (titleLower.includes('kwitang') || titleLower.includes('ali al-habsyi')) {
    fallbackHaul = 'Kamis Sore Akhir Rabiul Akhir (Haul Agung Habib Ali bin Abdurrahman Al-Habsyi Kwitang)';
    fallbackAdab = 'Mengenakan busana muslim sopan (dianjurkan putih) dan mengikuti ketertiban pengurus Islamic Center Kwitang.';
  } else if (titleLower.includes('mbah priok') || titleLower.includes('hasan bin muhammad al-haddad')) {
    fallbackHaul = 'Akhir Bulan Sya’ban (Haul Akbar Gubah Al-Haddad / Mbah Priok Tanjung Priok)';
    fallbackAdab = 'Menjaga adab di area majelis dan maqbarah Gubah Al-Haddad serta mengikuti petunjuk petugas parkir & keamanan makam.';
  } else if (site.category === 'Walisongo') {
    fallbackHaul = 'Bulan Muharram / Dzulhijjah (Agenda Haul Tahunan & Tradisi Buka Luwur)';
    fallbackAdab = 'Menjaga kesopanan pakaian, melepas alas kaki di batas cungkup, serta menghormati kearifan adat dan arahan juru kunci.';
  } else if (site.category === 'Habaib') {
    fallbackHaul = 'Rabiul Awal / Sya’ban (Haul Tahunan & Pembacaan Maulid / Ratib)';
    fallbackAdab = 'Menjaga adab majelis dzikir, memisahkan shaf peziarah laki-laki dan perempuan, serta tidak meninggikan suara di dekat cungkup.';
  }

  return {
    haulSchedule: site.haulSchedule?.trim() || preset?.haulSchedule || fallbackHaul,
    localAdab: site.localAdab?.trim() || preset?.localAdab || fallbackAdab,
    shortEra: extractShortEra(site.era),
  };
}

/**
 * Menghasilkan deskripsi Berkah & Wasilah Hajat yang biasa diharapkan peziarah di makam tersebut.
 * Menggunakan nilai `site.barokahHajat` dari Admin jika tersedia, atau fallback kontekstual cerdas untuk seluruh 96+ makam.
 */
export function getSiteBarokahHajat(site: ZiarahSite): string {
  if (site.barokahHajat && site.barokahHajat.trim().length > 0) {
    return site.barokahHajat.trim();
  }

  const corpus = `${site.id} ${site.title} ${site.name} ${site.description} ${site.history || ''}`.toLowerCase();

  if (
    corpus.includes('drajat') ||
    corpus.includes('kuncung') ||
    corpus.includes('malik ibrahim') ||
    corpus.includes('gresik') ||
    corpus.includes('giri') ||
    corpus.includes('dagang') ||
    corpus.includes('niaga') ||
    corpus.includes('ekonomi')
  ) {
    return `Di ${site.title}, peziarah umumnya bertawassul mengharapkan wasilah kelancaran ikhtiar usaha & perniagaan, terbukanya pintu rezeki yang halal lagi berkah, kemudahan melunasi tanggungan hutang, serta kedermawanan hati dalam menolong sesama.`;
  }

  if (
    corpus.includes('muria') ||
    corpus.includes('kwitang') ||
    corpus.includes('empang bogor') ||
    corpus.includes('ayu') ||
    corpus.includes('nyai') ||
    corpus.includes('ratu') ||
    corpus.includes('jodoh') ||
    corpus.includes('keluarga')
  ) {
    return `Biasanya peziarah yang datang ke ${site.title} memanjatkan doa dan tawassul dengan mengharapkan wasilah dimudahkan bertemu jodoh pendamping hidup yang shalih/shalihah, kerukunan rumah tangga (sakinah mawaddah warahmah), serta kelembutan hati seluruh anggota keluarga.`;
  }

  if (
    corpus.includes('kholil') ||
    corpus.includes('hamid') ||
    corpus.includes('pasuruan') ||
    corpus.includes('hasyim asy') ||
    corpus.includes('tebuireng') ||
    corpus.includes('ampel') ||
    corpus.includes('bonang') ||
    corpus.includes('sekumpul') ||
    corpus.includes('pesantren') ||
    corpus.includes('kitab')
  ) {
    return `Di ${site.title}, para santri, orang tua, dan peziarah umumnya bertawassul mengharapkan wasilah ilmu yang bermanfaat & penuh berkah, dikaruniai keturunan yang shalih-shalihah penghafal Al-Qur'an, serta dibukakan jalan keluar (makhraja) dari berbagai himpitan batin dan kesulitan hidup.`;
  }

  if (
    corpus.includes('kalijaga') ||
    corpus.includes('kudus') ||
    corpus.includes('gunung jati') ||
    corpus.includes('hasanuddin') ||
    corpus.includes('sultan') ||
    corpus.includes('adipati') ||
    corpus.includes('raja') ||
    corpus.includes('luar batang') ||
    corpus.includes('priok')
  ) {
    return `Peziarah yang berziarah ke ${site.title} umumnya bertawassul memohon kepada Allah SWT agar dikaruniai keteguhan iman di tengah ujian, kewibawaan & amanah dalam kepemimpinan/pekerjaan, keselamatan keluarga dari bala bencana, serta dikabulkannya hajat-hajat besar yang sedang diperjuangkan.`;
  }

  if (site.category === 'Habaib') {
    return `Di ${site.title}, jamaah dan peziarah umumnya bertawassul mengharapkan syafaat kecintaan kepada Dzurriyah Rasulullah SAW, keteduhan batin dari kegelisahan dunia, kesembuhan penyakit lahir maupun batin, serta keberkahan rezeki keluarga.`;
  }

  return `Biasanya peziarah yang berziarah ke ${site.title} (${site.location.city}) bertawassul memohon kepada Allah SWT dengan wasilah keshalihan beliau agar dikabulkan hajat-hajat terbaik: ketenangan batin, kemudahan jodoh & keturunan yang shalih, kelapangan rezeki keluarga, serta husnul khatimah.`;
}

/**
 * Mengembalikan daftar `doaKhusus` makam. Jika makam belum memiliki item `doaKhusus` kustom di database,
 * fungsi ini menghasilkan bacaan Tawassul, Wirid & Doa Munajat Hajat Khusus yang relevan untuk makam tersebut.
 */
export function getEffectiveSiteDoaKhusus(
  site: ZiarahSite
): { title: string; text: string; translation?: string }[] {
  if (Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0) {
    return site.doaKhusus;
  }

  return [
    {
      title: `Tawassul & Munajat Hajat Khusus di ${site.title}`,
      text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ وَلِيِّ اللهِ الصَّالِحِ صَاحِبِ هٰذِهِ الْمَقْبَرَةِ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ ۝ اللّٰهُمَّ إِنِّي أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ مُحَمَّدٍ نَبِيِّ الرَّحْمَةِ وَبِأَوْلِيَائِكَ الصَّالِحِينَ أَنْ تَقْضِيَ حَاجَاتِنَا وَتُيَسِّرَ أُمُورَنَا وَتَشْرَحَ صُدُورَنَا',
      translation: `Kaifiyah & Arti: Hadiahkan Al-Fatihah 1x kepada Rasulullah SAW dan 1x khusus kepada ${site.name} (${site.title}), lanjutkan membaca Surat Al-Ikhlas 3x, Al-Falaq 1x, An-Nas 1x, dan Shalawat Nabi 11x. Artinya: "Ya Allah, sesungguhnya aku memohon kepada-Mu dan menghadapkan diri kepada-Mu dengan wasilah Nabi-Mu Muhammad Nabi pembawa rahmat serta para kekasih-Mu yang shalih, kabulkanlah hajat-hajat kami, mudahkanlah segala urusan kami, dan lapangkanlah dada kami."`,
    },
  ];
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

