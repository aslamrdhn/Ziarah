import type { ZiarahSite } from '../data/sites';

export interface SiteDoaKhususEntry {
  title: string;
  text: string;
  arab?: string;
  latin?: string;
  translation?: string;
  terjemahan?: string;
  kaifiyah?: string;
}

export interface SiteLogisticsInfo {
  haulSchedule: string;
  localAdab: string;
  barokahHajat: string[];
  doaKhusus: SiteDoaKhususEntry[];
  karomah?: string[];
  untoldStory?: string;
}

export const HONEST_UNVERIFIED_LOGISTICS_FALLBACK =
  'Informasi fadhilah wasilah dan jadwal haul spesifik untuk lokasi ini sedang dalam proses verifikasi literatur oleh Tim Kurator Ziarah Nusantara.';

export interface CuratedZiarahRoute {
  id: 'off' | 'walisongo-pantura' | 'habaib-jabodetabek' | 'jawa-timur-madura' | 'mataram-kedu';
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  siteIds: string[];
}

export const CURATED_ZIARAH_ROUTES: CuratedZiarahRoute[] = [
  {
    id: 'off',
    label: 'Semua Makam (Tanpa Jalur Rute)',
    shortLabel: 'Semua Makam',
    description: 'Menampilkan seluruh titik lokasi makam Waliyullah di kepulauan Nusantara.',
    color: '#065f46',
    siteIds: [],
  },
  {
    id: 'walisongo-pantura',
    label: 'Jalur Ziarah Wali Songo (Cirebon – Gresik – Surabaya)',
    shortLabel: 'Rute Wali Songo',
    description:
      'Rute klasik ziarah 9 Wali Songo menyusuri pesisir utara Jawa mulai dari Cirebon, Demak, Kudus, Muria, Tuban, Lamongan, Gresik, hingga Ampel Surabaya.',
    color: '#047857',
    siteIds: [
      'sunan-gunung-jati',
      'sunan-kalijaga',
      'sunan-kudus',
      'sunan-muria',
      'sunan-bonang',
      'sunan-drajat',
      'syekh-maulana-malik-ibrahim',
      'sunan-giri',
      'sunan-ampel',
    ],
  },
  {
    id: 'habaib-jabodetabek',
    label: 'Jalur Auliya & Habaib Betawi – Banten – Bogor',
    shortLabel: 'Rute Betawi & Banten',
    description:
      'Rute ziarah maqbarah para Habaib dan Ulama besar di Jakarta (Luar Batang, Tanjung Priok, Kwitang, Condet), Empang Bogor, hingga Kesultanan Banten.',
    color: '#0f766e',
    siteIds: [
      'habib-husein-luar-batang',
      'mbah-priok',
      'habib-ali-kwitang',
      'habib-ahmad-bin-alwi-al-haddad',
      'pangeran-jayakarta',
      'guru-marzuki-cipinang',
      'habib-abdullah-empang-bogor',
      'sultan-maulana-hasanuddin',
      'syekh-asnawi-caringin',
    ],
  },
  {
    id: 'jawa-timur-madura',
    label: 'Jalur Masyayikh Pesantren Jawa Timur & Madura',
    shortLabel: 'Rute Jatim & Madura',
    description:
      'Rute ziarah ulama besar dan pendiri pesantren di Bangkalan Madura, Surabaya, Pasuruan, Jombang (Tebuireng), hingga Lirboyo Kediri.',
    color: '#1e40af',
    siteIds: [
      'syaichona-kholil-bangkalan',
      'sunan-ampel',
      'kh-abdul-hamid-pasuruan',
      'kh-hasyim-asyari-tebuireng',
      'kh-wahab-chasbullah',
      'kh-bisri-syansuri',
      'kh-romly-tamim-rejoso',
      'kh-abdul-karim-lirboyo',
      'gus-miek-ploso-kediri',
    ],
  },
  {
    id: 'mataram-kedu',
    label: 'Jalur Auliya Tanah Jawa Tengah & Mataram',
    shortLabel: 'Rute Jateng & DIY',
    description:
      'Rute ziarah poros tengah Jawa: Semarang, Demak, Gunung Tidar Magelang, Watucongol, Bayat Klaten, hingga pesisir selatan Yogyakarta.',
    color: '#92400e',
    siteIds: [
      'kh-sholeh-darat-semarang',
      'raden-patah-demak',
      'syekh-subakir-tidar',
      'kh-dalhar-watucongol',
      'kyai-nur-iman-mlangi',
      'kh-munawwir-krapyak',
      'syekh-maulana-maghribi-parangtritis',
      'sunan-pandanaran-bayat',
    ],
  },
];

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function extractShortEra(era?: string): string {
  if (!era) return '';
  const cleaned = era.trim();
  const parenIndex = cleaned.indexOf('(');
  if (parenIndex > 0) {
    return cleaned.slice(0, parenIndex).trim();
  }
  return cleaned.length > 28 ? `${cleaned.slice(0, 26).trim()}…` : cleaned;
}

function normalizeStringOrArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean);
  }
  const trimmed = String(value).trim();
  return trimmed ? [trimmed] : [];
}

/**
 * Menyusun narasi wasilah & hajat ziarah yang spesifik berdasarkan peran sejarah tokoh
 * apabila field eksplisit `site.barokahHajat` belum diisi pada objek makam.
 * Bebas dari pencocokan kata kunci dangkal ("habib" -> jodoh, "sultan" -> hutang).
 */
export function buildRoleBasedBarokahHajat(
  site: Pick<ZiarahSite, 'name' | 'title' | 'category' | 'city' | 'province' | 'location'>
): string {
  const name = (site.name || site.title || 'Waliyullah').trim();
  const city = (site.city || site.location?.city || 'Nusantara').trim();
  const province = (site.province || site.location?.province || 'Indonesia').trim();
  const roleContext = `${site.name || ''} ${site.title || ''} ${site.category || ''}`.toLowerCase();

  const isSultanOrHero =
    /\b(sultan|raja|pangeran|panembahan|adipati|ratu|pahlawan|diponegoro|imam bonjol|raden intan|sentot|mangkurat|cakraningrat|baabullah|hasanuddin|iskandar muda|ageng tirtayasa|malikussaleh|suriansyah)\b/i.test(
      roleContext
    );

  if (isSultanOrHero) {
    return `Peziarah yang mengunjungi kompleks makam ${name} di ${city}, ${province} umumnya bertawassul dan berdoa memohon kepada Allah SWT keteguhan iman dalam membela kebenaran, keberanian dan amanah dalam kepemimpinan, keadilan sosial, serta keselamatan bangsa dan negeri dari segala marabahaya.`;
  }

  const isHabibOrTarekat =
    site.category === 'Habaib' ||
    /\b(habib|habaib|sayyid|syarif|syarifah|al-haddad|al-idrus|alaydrus|al-attas|al-jufri|alkadrie|assegaf|bafaqih|ba'abud|bahasyim|bin yahya|al-habsyi|syadziliyah|naqsyabandiyah|qadiriyah|syattariyah|sammaniyah|khalwatiyah|tijaniyah|alawiyyin|mursyid|tarekat|thariqah)\b/i.test(
      roleContext
    );

  if (isHabibOrTarekat) {
    return `Peziarah yang berziarah ke maqbarah ${name} di ${city}, ${province} umumnya bertawassul memohon kepada Allah SWT keberkahan ilmu agama yang bermanfaat, kecintaan (mahabbah) kepada Rasulullah SAW beserta Ahlul Bait dan ulama shalihin, keteguhan iman, serta keberkahan hidup keluarga dunia dan akhirat.`;
  }

  return `Para santri, penuntut ilmu, dan peziarah yang datang ke maqbarah ${name} di ${city}, ${province} umumnya bertawassul memohon kepada Allah SWT terbukanya kefahaman ilmu yang berkah (futuhul 'arifin), keistiqamahan dalam beribadah, keshalihan keturunan, serta kelapangan jalan keluar dari berbagai kesulitan hidup.`;
}

/**
 * Mengembalikan kalimat ringkasan ikhtiar batin & fadhilah wasilah (`barokahHajat`)
 * langsung dari properti eksplisit pada objek makam, atau menyusun narasi spesifik
 * berbasis peran sejarah tokoh bila belum tersedia.
 */
export function getSiteBarokahHajat(
  site: Pick<ZiarahSite, 'id' | 'name' | 'title' | 'category' | 'location' | 'city' | 'province' | 'barokahHajat'>
): string {
  if (typeof site.barokahHajat === 'string' && site.barokahHajat.trim()) {
    return site.barokahHajat.trim();
  }
  if (Array.isArray(site.barokahHajat) && site.barokahHajat.length > 0 && site.barokahHajat[0]?.trim()) {
    return site.barokahHajat[0].trim();
  }
  return buildRoleBasedBarokahHajat(site);
}

/**
 * Mengembalikan daftar amalan & doa khusus (`doaKhusus`) langsung dari data eksplisit makam.
 * Memastikan lafaz Arab, Latin, dan Terjemahan senantiasa menyertakan nama tokoh `site.name` secara spesifik.
 */
export function getEffectiveSiteDoaKhusus(site: ZiarahSite): SiteDoaKhususEntry[] {
  const siteName = (site.name || site.title || 'Waliyullah').trim();
  const siteTitle = (site.title || siteName).trim();

  if (Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0) {
    const validEntries = site.doaKhusus
      .map((d) => {
        const rawArab = (d.text || d.arab || '').trim();
        const rawLatin = (d.latin || '').trim();
        const rawTranslation = (d.translation || d.terjemahan || '').trim();
        const rawKaifiyah = (d.kaifiyah || '').trim();

        const arabWithPerson = rawArab.includes(siteName)
          ? rawArab
          : `${rawArab} (إِلَى حَضْرَةِ ${siteName})`;
        const latinWithPerson = rawLatin
          ? rawLatin.includes(siteName)
            ? rawLatin
            : `Ilâ hadhrati ${siteName}, al-Fâtihah. ${rawLatin}`
          : `Ilâ hadhrati ${siteName}, syai-ul lillâhi lahumul Fâtihah.`;
        const translationWithPerson = rawTranslation
          ? rawTranslation.includes(siteName)
            ? rawTranslation
            : `Khusus ke hadirat ${siteName}: ${rawTranslation}`
          : `Khusus ke hadirat ${siteName} (${siteTitle}), kami bertawassul memohon keberkahan ilmu, keteguhan iman, dan ridha Allah SWT.`;

        return {
          title: d.title || `Tawassul & Munajat Khusus di Maqbarah ${siteName}`,
          text: arabWithPerson,
          arab: arabWithPerson,
          latin: latinWithPerson,
          translation: translationWithPerson,
          terjemahan: translationWithPerson,
          ...(rawKaifiyah ? { kaifiyah: rawKaifiyah } : {}),
        };
      })
      .filter((d) => Boolean(d.text));

    if (validEntries.length > 0) {
      return validEntries;
    }
  }

  const fallbackArab = `اِلَى حَضْرَةِ الْوَلِيِّ الصَّالِحِ ${siteName} شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ مُحَمَّدٍ نَبِيِّ الرَّحْمَةِ، وَبِكَرَامَةِ أَوْلِيَائِكَ الصَّالِحِيْنَ خُصُوْصًا ${siteName}، أَنْ تَقْضِيَ حَاجَاتِنَا وَتُفَرِّجَ كُرُبَاتِنَا وَتَرْزُقَنَا عِلْمًا نَافِعًا وَرِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا يَا أَرْحَمَ الرَّاحِمِيْنَ`;
  const fallbackLatin = `Ilâ hadhratil waliyyish shâlih ${siteName}, syai-ul lillâhi lahumul Fâtihah. Allâhumma innî as-aluka wa atawajjahu ilaika bi nabiyyika Muhammadin nabiyyir rahmah, wa bi karâmati auliyâ-ikash shâlihîn khushûshan ${siteName}, an taqdhiya hâjâtinâ wa tufarrija kurubâtinâ wa tarzuqanâ 'ilman nâfi'an wa rizqan halâlan thayyiban mubârakan yâ Arhamar Râhimîn.`;
  const fallbackTranslation = `Khusus ke hadirat waliyullah yang shalih ${siteName}, segala sesuatu milik Allah, untuk beliau Al-Fatihah. Ya Allah, sesungguhnya aku memohon dan menghadap kepada-Mu dengan wasilah Nabi-Mu Muhammad Nabi pembawa rahmat, serta dengan berkah karomah para wali-Mu yang shalih khususnya ${siteName} (${siteTitle}), kabulkanlah hajat-hajat kami, lapangkanlah kesulitan kami, dan karuniakanlah ilmu yang bermanfaat serta rezeki yang halal, baik, dan penuh berkah, wahai Dzat Yang Maha Pengasih.`;

  return [
    {
      title: `Doa Tawassul & Munajat di Maqbarah ${siteName}`,
      text: fallbackArab,
      arab: fallbackArab,
      latin: fallbackLatin,
      translation: fallbackTranslation,
      terjemahan: fallbackTranslation,
      kaifiyah: `1) Hadiahkan bacaan Surah Al-Fatihah kepada Nabi Muhammad SAW, para Sahabat, dan khusus kepada ${siteName}. 2) Bacalah Surah Yasin, Tahlil, dan shalawat Nabi dengan khusyuk. 3) Panjatkan doa munajat ini dengan penuh ketawadhuan seraya memohon ridha Allah SWT.`,
    },
  ];
}

export interface CompleteBarokahGuide {
  hajatUtama: string;
  doaTitle: string;
  arabic: string;
  latin: string;
  translation: string;
  kaifiyah: string[];
  tataCaraWaktu: string[];
  wiridPenutupAdab: string[];
  allDoas: SiteDoaKhususEntry[];
  doaItems: SiteDoaKhususEntry[];
  isCuratedSpecific: boolean;
  curationStatusLabel: string;
}

/**
 * Mengembalikan paket panduan Barokah, Hajat & Doa Khusus lengkap untuk `SiteDetails.tsx` dan `KumpulanDoa.tsx`.
 */
export function getSiteCompleteBarokahGuide(site: ZiarahSite): CompleteBarokahGuide {
  const hasExplicitHajat = Boolean(
    site.barokahHajat &&
      (typeof site.barokahHajat === 'string'
        ? site.barokahHajat.trim().length > 0
        : Array.isArray(site.barokahHajat) && site.barokahHajat.some((h) => String(h || '').trim().length > 0))
  );
  const hasExplicitDoa = Boolean(Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0);
  const isCuratedSpecific = hasExplicitHajat && hasExplicitDoa;
  const curationStatusLabel = isCuratedSpecific
    ? 'Khazanah Doa & Wasilah Terkurasi Khusus Makam Ini'
    : 'Tawassul & Munajat Waliyullah (Menunggu Kurasi Spesifik Makam)';

  const hajatUtama = getSiteBarokahHajat(site);
  const effectiveDoas = getEffectiveSiteDoaKhusus(site);
  const primary = effectiveDoas[0];

  const customKaifiyah = primary.kaifiyah
    ? primary.kaifiyah
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        `Mengucapkan salam penghormatan ahli kubur saat memasuki area maqbarah ${site.name} dalam keadaan suci berwudhu.`,
        `Membaca Istighfar 3x, Syahadat, dan Shalawat Nabi, kemudian menghadiahkan Surah Al-Fatihah khusus kepada ${site.name} (${site.title}).`,
        `Membaca Surah Yasin, Tahlil singkat, lalu memanjatkan Doa Tawassul & Munajat di atas dengan khusyuk semata-mata memohon ridha Allah SWT.`,
      ];

  const wiridPenutupAdab = [
    `Menutup doa munajat di maqbarah ${site.name} dengan membaca Shalawat Nabi 11 kali dan Surah Al-Fatihah.`,
    'Menjaga ketenangan, tidak melangkahi pusara, serta mundur secara perlahan dengan penuh adab saat meninggalkan area cungkup makam.',
    'Menyempurnakan ikhtiar batin dengan sedekah kepada fakir miskin atau kotak pemeliharaan maqbarah setempat.',
  ];

  return {
    hajatUtama,
    doaTitle: primary.title,
    arabic: primary.text,
    latin: primary.latin || '',
    translation: primary.translation || '',
    kaifiyah: customKaifiyah,
    tataCaraWaktu: customKaifiyah,
    wiridPenutupAdab,
    allDoas: effectiveDoas,
    doaItems: effectiveDoas,
    isCuratedSpecific,
    curationStatusLabel,
  };
}

/**
 * Mengembalikan informasi logistik ziarah (Jadwal Haul, Adab Lokal, Barokah Hajat, Doa Khusus,
 * serta Karomah dan Untold Story langsung dari objek `site` tanpa template generik Pesisir Jawa).
 */
export function getSiteLogistics(
  site: Pick<
    ZiarahSite,
    | 'id'
    | 'legacyId'
    | 'name'
    | 'title'
    | 'category'
    | 'location'
    | 'city'
    | 'province'
    | 'haulSchedule'
    | 'localAdab'
    | 'barokahHajat'
    | 'doaKhusus'
    | 'karomah'
    | 'untoldStory'
  >
): SiteLogisticsInfo {
  const explicitHaul = site.haulSchedule?.trim();
  const explicitAdab = normalizeStringOrArray(site.localAdab);
  const explicitHajat = normalizeStringOrArray(site.barokahHajat);
  const explicitKaromah = normalizeStringOrArray(site.karomah);

  const resolvedDoas = getEffectiveSiteDoaKhusus(site as ZiarahSite);

  return {
    haulSchedule: explicitHaul || HONEST_UNVERIFIED_LOGISTICS_FALLBACK,
    localAdab:
      explicitAdab.length > 0
        ? explicitAdab.join(' ')
        : `Berpakaian muslim/muslimah yang sopan dan menutup aurat saat memasuki kompleks pemakaman ${site.name}. Menjaga ketenangan, ketertiban, serta meluruskan niat ziarah dan tawassul semata-mata mengharap ridha Allah SWT.`,
    barokahHajat: explicitHajat.length > 0 ? explicitHajat : [getSiteBarokahHajat(site)],
    doaKhusus: resolvedDoas,
    karomah: explicitKaromah,
    untoldStory: site.untoldStory ? String(site.untoldStory) : '',
  };
}
