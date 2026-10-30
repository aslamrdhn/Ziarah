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
