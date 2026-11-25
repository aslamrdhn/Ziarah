import type { ZiarahSite } from './sites';
import { getHaulDisplay, type HaulDisplayResult } from './haulVerification';

export interface ZiarahCorridor {
  slug: string;
  title: string;
  subtitle: string;
  regionSummary: string;
  recommendedDaysLabel: string;
  siteIds: readonly string[];
  recommendedDonationAmount: 20000 | 30000;
  editorialIntro: string;
}

export interface ResolvedCorridorSite {
  orderNumber: number;
  site: ZiarahSite;
  referencesCount: number;
  googleMapsUrl: string;
  haulDisplay: string;
  haulResult: HaulDisplayResult;
}

export interface SunnahZiarahAdabItem {
  step: number;
  title: string;
  description: string;
}

export const SUNNAH_ZIARAH_ADAB_STEPS: readonly SunnahZiarahAdabItem[] = [
  {
    step: 1,
    title: 'Meluruskan Niat & Menjaga Tauhid',
    description:
      'Berziarah untuk mengingat kematian (dzikrul maut), mendoakan para ulama dan orang saleh, serta meneladani perjuangan dakwah dan keikhlasan ilmu mereka. Seluruh permohonan dan hajat semata-mata dipanjatkan hanya kepada Allah SWT.'
  },
  {
    step: 2,
    title: 'Menjaga Wudhu & Pakaian yang Sopan',
    description:
      'Disunnahkan berwudhu sebelum memasuki kompleks maqbarah, mengenakan pakaian yang menutup aurat, rapi, serta melepas alas kaki pada batas area suci yang telah ditentukan pengurus makam.'
  },
  {
    step: 3,
    title: 'Mengucapkan Salam Ketika Memasuki Maqbarah',
    description:
      'Mengucapkan salam penghormatan ahli kubur sebagaimana diajarkan Rasulullah SAW atau melantunkan Qasidah Salamullah Ya Sadah dengan suara yang teduh dan penuh ketawadhuan.'
  },
  {
    step: 4,
    title: 'Menghadiahkan Bacaan Al-Qur’an, Tahlil & Shalawat',
    description:
      'Duduk dengan tenang tanpa mengganggu peziarah lain, lalu membaca Tawassul Al-Fatihah, Surah Yasin, ayat-ayat Al-Qur’an, dzikir tahlil, dan shalawat Nabi SAW.'
  },
  {
    step: 5,
    title: 'Berdoa Menghadap Kiblat',
    description:
      'Saat memanjatkan doa pribadi maupun doa bersama rombongan, disunnahkan menghadapkan wajah dan telapak tangan ke arah Kiblat, memohon ampunan, keteguhan iman, serta keberkahan hidup kepada Allah SWT.'
  },
  {
    step: 6,
    title: 'Menjaga Kebersihan, Ketertiban & Sedekah Lokal',
    description:
      'Tidak duduk atau menginjak bangunan makam, tidak membuang sampah sembarangan, mematuhi arahan juru kunci setempat, serta menyisihkan infaq pemeliharaan maqbarah atau membeli dagangan warga sekitar secara terhormat.'
  }
];

export const ZIARAH_CORRIDORS: readonly ZiarahCorridor[] = [
  {
    slug: 'jalur-wali-songo',
    title: 'Koridor 1: Jalur Wali Songo (Jawa Timur – Jawa Tengah – Jawa Barat)',
    subtitle: '9 Maqbarah Utama Penyebar Islam Nusantara dari Gresik hingga Cirebon',
    regionSummary: 'Gresik • Surabaya • Lamongan • Tuban • Demak • Kudus • Cirebon',
    recommendedDaysLabel: 'Rekomendasi 3–5 Hari Perjalanan Rombongan',
    recommendedDonationAmount: 30000,
    editorialIntro:
      'Rute klasik ziarah Nusantara yang menyusuri jejak sembilan wali pelopor dakwah kultural, pendidikan pesantren, dan kemandirian niaga di pesisir utara Pulau Jawa.',
    siteIds: [
      'syekh-maulana-malik-ibrahim',
      'sunan-ampel',
      'sunan-giri',
      'sunan-bonang',
      'sunan-drajat',
      'sunan-kalijaga',
      'sunan-kudus',
      'sunan-muria',
      'sunan-gunung-jati'
    ]
  },
  {
    slug: 'jalur-ulama-habaib-jakarta-banten',
    title: 'Koridor 2: Jalur Ulama & Habaib Jakarta–Banten',
    subtitle: '10 Maqbarah Terverifikasi Pesisir Batavia, Betawi & Kesultanan Banten',
    regionSummary: 'Jakarta Utara • Jakarta Pusat • Jakarta Selatan • Jakarta Timur • Banten Lama • Pandeglang • Serang',
    recommendedDaysLabel: 'Rekomendasi 1–2 Hari Perjalanan Keluarga / Majelis',
    recommendedDonationAmount: 20000,
    editorialIntro:
      'Jalur ziarah terpadu yang menghubungkan simpul para Habaib dan Muallim Betawi di Jakarta menuju pusat peradaban Islam Kesultanan Banten serta ulama besar Tanah Jawara.',
    siteIds: [
      'habib-husein-luar-batang',
      'mbah-priok',
      'pangeran-jayakarta',
      'habib-ali-kwitang',
      'habib-utsman-bin-yahya',
      'habib-ahmad-bin-alwi-al-haddad',
      'guru-marzuki-cipinang',
      'sultan-maulana-hasanuddin',
      'sultan-ageng-tirtayasa',
      'syekh-asnawi-caringin'
    ]
  },
  {
    slug: 'jalur-ulama-pesantren-habaib-jatim-madura',
    title: 'Koridor 3: Jalur Ulama Pesantren & Habaib Jawa Timur–Madura',
    subtitle: '10 Maqbarah Maha Guru Pesantren: Jombang, Kediri, Bangkalan, Pasuruan, Gresik & Situbondo',
    regionSummary: 'Jombang • Kediri • Bangkalan • Gresik • Pasuruan • Situbondo',
    recommendedDaysLabel: 'Rekomendasi 2–3 Hari Perjalanan Santri & Rombongan',
    recommendedDonationAmount: 20000,
    editorialIntro:
      'Menelusuri poros keilmuan pesantren Jawa Timur dan Madura—dari sanad keilmuan Syaichona Kholil Bangkalan, para muassis Nahdlatul Ulama di Jombang, Kediri, dan Situbondo, hingga majelis keteduhan Pasuruan dan Gresik.',
    siteIds: [
      'syaichona-kholil-bangkalan',
      'habib-abu-bakar-gresik',
      'kh-hasyim-asyari-tebuireng',
      'gus-dur-tebuireng',
      'kh-wahab-chasbullah',
      'kh-bisri-syansuri',
      'kh-abdul-karim-lirboyo',
      'syekh-ihsan-jampes-kediri',
      'kh-abdul-hamid-pasuruan',
      'kh-asad-syamsul-arifin'
    ]
  }
];

export function buildRealGoogleMapsUrl(site: ZiarahSite): string {
  const lat = site?.location?.lat;
  const lng = site?.location?.lng;
  if (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng)
  ) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const query = encodeURIComponent(
    `${site.name} ${site.location?.city || ''} ${site.location?.province || ''}`.trim()
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function resolveCorridorSites(
  corridor: ZiarahCorridor,
  allSites: readonly ZiarahSite[]
): ResolvedCorridorSite[] {
  const siteMap = new Map<string, ZiarahSite>();
  for (const s of allSites) {
    if (s && s.id) {
      siteMap.set(s.id, s);
    }
  }

  const resolved: ResolvedCorridorSite[] = [];
  for (const siteId of corridor.siteIds) {
    const found = siteMap.get(siteId);
    if (!found) continue;
    const refs = Array.isArray(found.references)
      ? found.references.filter(Boolean)
      : [];
    const haulResult = getHaulDisplay(found);
    resolved.push({
      orderNumber: resolved.length + 1,
      site: found,
      referencesCount: refs.length,
      googleMapsUrl: buildRealGoogleMapsUrl(found),
      haulDisplay: haulResult.text,
      haulResult
    });
  }

  return resolved;
}
