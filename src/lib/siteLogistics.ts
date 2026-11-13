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

export function sanitizeHistoricalLogisticsText(input?: string): string {
  if (!input) return '';
  return String(input)
    .replace(/Raden\s+Umar\s+Said\s*\(\s*Raden\s+Prawoto\s*\)/gi, 'Raden Umar Said (Sunan Muria)')
    .replace(/\bRaden\s+Prawoto\b/gi, 'Raden Umar Said (Sunan Muria)')
    .replace(
      /dimudahkan\s+bertemu\s+jodoh\s+pendamping\s+hidup/gi,
      'memohon kepada Allah SWT kecintaan tulus kepada Nabi Muhammad SAW, keberkahan majelis ilmu dan dakwah, serta keteguhan iman keluarga'
    )
    .trim();
}

function normalizeStringOrArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeHistoricalLogisticsText(String(item || '')))
      .filter(Boolean);
  }
  const trimmed = sanitizeHistoricalLogisticsText(String(value));
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
  const name = sanitizeHistoricalLogisticsText(site.name || site.title || 'Waliyullah');
  const city = (site.city || site.location?.city || 'Nusantara').trim();
  const province = (site.province || site.location?.province || 'Indonesia').trim();
  const roleContext = `${name} ${site.title || ''} ${site.category || ''}`.toLowerCase();

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
    return sanitizeHistoricalLogisticsText(site.barokahHajat);
  }
  if (Array.isArray(site.barokahHajat) && site.barokahHajat.length > 0 && site.barokahHajat[0]?.trim()) {
    return sanitizeHistoricalLogisticsText(site.barokahHajat[0]);
  }
  return buildRoleBasedBarokahHajat(site);
}

/**
 * Mengembalikan daftar amalan & doa khusus (`doaKhusus`) langsung dari data eksplisit makam.
 * Memastikan lafaz Arab, Latin, dan Terjemahan senantiasa menyertakan nama tokoh `site.name` secara spesifik.
 */
export function getEffectiveSiteDoaKhusus(site: ZiarahSite): SiteDoaKhususEntry[] {
  const siteName = sanitizeHistoricalLogisticsText(site.name || site.title || 'Waliyullah');
  const siteTitle = sanitizeHistoricalLogisticsText(site.title || siteName);

  const wiridPeganganEntry: SiteDoaKhususEntry = {
    title: `Wirid Pegangan & Dzikir Munajat Hajat di Maqbarah ${siteName}`,
    text: `أَسْتَغْفِرُ اللهَ الْعَظِيْمَ (٣×) • اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ (١١×) • لَا إِلٰهَ إِلَّا اللهُ الْمَلِكُ الْحَقُّ الْمُبِيْنُ، يَا فَتَّاحُ يَا رَزَّاقُ يَا كَافِي يَا مُغْنِي (٣٣×) • اللّٰهُمَّ بِحَقِّ أَوْلِيَائِكَ الصَّالِحِيْنَ خُصُوْصًا ${siteName} اقْضِ حَوَائِجَنَا وَيَسِّرْ أُمُوْرَنَا`,
    arab: `أَسْتَغْفِرُ اللهَ الْعَظِيْمَ (٣×) • اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ (١١×) • لَا إِلٰهَ إِلَّا اللهُ الْمَلِكُ الْحَقُّ الْمُبِيْنُ، يَا فَتَّاحُ يَا رَزَّاقُ يَا كَافِي يَا مُغْنِي (٣٣×) • اللّٰهُمَّ بِحَقِّ أَوْلِيَائِكَ الصَّالِحِيْنَ خُصُوْصًا ${siteName} اقْضِ حَوَائِجَنَا وَيَسِّرْ أُمُوْرَنَا`,
    latin: `Astaghfirullâhal 'azhîm (3x) • Allâhumma shalli 'alâ Sayyidinâ Muhammadin wa 'alâ âli Sayyidinâ Muhammad (11x) • Lâ ilâha illallâhul Malikul Haqqul Mubîn, Yâ Fattâhu Yâ Razzâqu Yâ Kâfî Yâ Mughnî (33x) • Allâhumma bi haqqi auliyâ-ikash shâlihîn khushûshan ${siteName} iqdhi hawâ-ijanâ wa yassir umûranâ.`,
    translation: `Aku memohon ampun kepada Allah Yang Maha Agung (3x). Ya Allah limpahkanlah rahmat kepada Junjungan kami Nabi Muhammad dan keluarganya (11x). Tiada Tuhan selain Allah Raja Yang Maha Benar lagi Maha Nyata; Wahai Maha Pembuka, Maha Pemberi Rezeki, Maha Mencukupi, Maha Memberi Kekayaan (33x). Ya Allah, dengan kemuliaan para kekasih-Mu yang shalih khususnya ${siteName} (${siteTitle}), kabulkanlah segala hajat kami dan mudahkanlah urusan kami.`,
    terjemahan: `Aku memohon ampun kepada Allah Yang Maha Agung (3x). Ya Allah limpahkanlah rahmat kepada Junjungan kami Nabi Muhammad dan keluarganya (11x). Tiada Tuhan selain Allah Raja Yang Maha Benar lagi Maha Nyata; Wahai Maha Pembuka, Maha Pemberi Rezeki, Maha Mencukupi, Maha Memberi Kekayaan (33x). Ya Allah, dengan kemuliaan para kekasih-Mu yang shalih khususnya ${siteName} (${siteTitle}), kabulkanlah segala hajat kami dan mudahkanlah urusan kami.`,
    kaifiyah: `Dibaca dengan khusyuk setelah menghadiahkan Surah Al-Fatihah dan Surah Yasin di dekat maqbarah ${siteName}, atau diamalkan secara istiqamah selesai shalat fardhu / tahajud sambil menghadirkan niat hajat pribadi.`,
  };

  if (Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0) {
    const validEntries = site.doaKhusus
      .map((d) => {
        const rawArab = sanitizeHistoricalLogisticsText(d.text || d.arab || '');
        const rawLatin = sanitizeHistoricalLogisticsText(d.latin || '');
        const rawTranslation = sanitizeHistoricalLogisticsText(d.translation || d.terjemahan || '');
        const rawKaifiyah = sanitizeHistoricalLogisticsText(d.kaifiyah || '');

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
          title: sanitizeHistoricalLogisticsText(d.title) || `Tawassul & Munajat Khusus di Maqbarah ${siteName}`,
          text: arabWithPerson,
          arab: arabWithPerson,
          latin: latinWithPerson,
          translation: translationWithPerson,
          terjemahan: translationWithPerson,
          ...(rawKaifiyah ? { kaifiyah: rawKaifiyah } : {}),
        };
      })
      .filter((d) => Boolean(d.text));

    if (validEntries.length === 1) {
      return [...validEntries, wiridPeganganEntry];
    }
    if (validEntries.length > 1) {
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
    wiridPeganganEntry,
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
    : 'Panduan Tawassul, Wirid Pegangan & Wasilah Hajat Khusus Maqbarah';

  const hajatUtama = getSiteBarokahHajat(site);
  const effectiveDoas = getEffectiveSiteDoaKhusus(site);
  const primary = effectiveDoas[0];

  const safeName = sanitizeHistoricalLogisticsText(site.name || site.title || 'Waliyullah');
  const safeTitle = sanitizeHistoricalLogisticsText(site.title || safeName);

  const customKaifiyah = primary.kaifiyah
    ? primary.kaifiyah
        .split(/\n+/)
        .map((s) => sanitizeHistoricalLogisticsText(s))
        .filter(Boolean)
    : [
        `Mengucapkan salam penghormatan ahli kubur saat memasuki area maqbarah ${safeName} dalam keadaan suci berwudhu.`,
        `Membaca Istighfar 3x, Syahadat, dan Shalawat Nabi 11x, kemudian menghadiahkan Surah Al-Fatihah khusus kepada ${safeName} (${safeTitle}).`,
        `Membaca Surah Yasin, Tahlil, Wirid Pegangan 33x, lalu memanjatkan Doa Tawassul & Munajat Hajat di atas dengan khusyuk semata-mata memohon ridha Allah SWT.`,
      ];

  const wiridPenutupAdab = [
    `Menutup doa munajat di maqbarah ${safeName} dengan membaca Shalawat Nabi 11 kali dan Surah Al-Fatihah.`,
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
 * Mengembalikan estimasi konversi kalender Hijriah ke Masehi (2026 / 2027 M) untuk jadwal Haul.
 */
export function estimateHaulGregorian2026(haulSchedule?: string, siteId?: string): string | null {
  if (!haulSchedule || haulSchedule === HONEST_UNVERIFIED_LOGISTICS_FALLBACK) return null;
  const text = haulSchedule.toLowerCase();
  const id = (siteId || '').toLowerCase();

  if (id === 'sunan-ampel' || id === 'wali-2') {
    return 'Estimasi Kalender Masehi: Sekitar Februari 2026 / Januari–Februari 2027 M (Pertengahan Sya’ban 1447/1448 H)';
  }
  if (id === 'sunan-kudus' || id === 'wali-5' || text.includes('10 muharram') || text.includes('asyura')) {
    return 'Estimasi Kalender Masehi: Sekitar Akhir Juni 2026 / Pertengahan Juni 2027 M (10 Muharram 1448/1449 H)';
  }
  if (text.includes('muharram') || text.includes('suro')) {
    return 'Estimasi Kalender Masehi: Sekitar Juni–Juli 2026 / Juni 2027 M (Bulan Muharram 1448/1449 H)';
  }
  if (text.includes('safar') || text.includes('sapar')) {
    return 'Estimasi Kalender Masehi: Sekitar Juli–Agustus 2026 / Juli 2027 M (Bulan Safar 1448/1449 H)';
  }
  if (text.includes('rabiul awal') || text.includes('maulid') || text.includes('mulud')) {
    return 'Estimasi Kalender Masehi: Sekitar Agustus–September 2026 / Agustus 2027 M (Bulan Rabiul Awal 1448/1449 H)';
  }
  if (text.includes('rabiul akhir') || text.includes('bakda mulud')) {
    return 'Estimasi Kalender Masehi: Sekitar September–Oktober 2026 M (Bulan Rabiul Akhir 1448 H)';
  }
  if (text.includes('jumadil awal')) {
    return 'Estimasi Kalender Masehi: Sekitar Oktober–November 2026 M (Bulan Jumadil Awal 1448 H)';
  }
  if (text.includes('jumadil akhir') || text.includes('jumadil tsaniyah')) {
    return 'Estimasi Kalender Masehi: Sekitar November–Desember 2026 M (Bulan Jumadil Akhir 1448 H)';
  }
  if (text.includes('rajab') || text.includes('rejeb')) {
    return 'Estimasi Kalender Masehi: Sekitar Desember 2026 – Januari 2027 M (Bulan Rajab 1448 H)';
  }
  if (text.includes("sya'ban") || text.includes('syaban') || text.includes('ruwah')) {
    return 'Estimasi Kalender Masehi: Sekitar Januari–Februari 2027 M (Bulan Sya’ban 1448 H)';
  }
  if (text.includes('ramadhan') || text.includes('ramadan') || text.includes('likuran')) {
    return 'Estimasi Kalender Masehi: Sekitar Februari–Maret 2027 M (Bulan Suci Ramadhan 1448 H)';
  }
  if (text.includes('syawal') || text.includes('syawalan')) {
    return 'Estimasi Kalender Masehi: Sekitar Maret–April 2027 M (Bulan Syawal 1448 H)';
  }
  if (text.includes('dzulqaidah') || text.includes("dzulqa'dah") || text.includes('apit')) {
    return 'Estimasi Kalender Masehi: Sekitar April–Mei 2027 M (Bulan Dzulqa’dah 1448 H)';
  }
  if (text.includes('dzulhijjah') || text.includes('besar') || text.includes('idul adha')) {
    return 'Estimasi Kalender Masehi: Sekitar Mei–Juni 2026 / Mei 2027 M (Bulan Dzulhijjah 1447/1448 H)';
  }
  return 'Estimasi Kalender Masehi: Mengikuti Penetapan Takwim Hijriah 1447–1448 H (2026/2027 M) Pengurus Maqbarah';
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
  const safeName = sanitizeHistoricalLogisticsText(site.name || site.title || 'Waliyullah');
  const explicitHaul = sanitizeHistoricalLogisticsText(site.haulSchedule);
  const explicitAdab = normalizeStringOrArray(site.localAdab);
  const explicitHajat = normalizeStringOrArray(site.barokahHajat);
  const explicitKaromah = normalizeStringOrArray(site.karomah);

  const resolvedDoas = getEffectiveSiteDoaKhusus({
    ...(site as ZiarahSite),
    name: safeName,
  });

  return {
    haulSchedule: explicitHaul || HONEST_UNVERIFIED_LOGISTICS_FALLBACK,
    localAdab:
      explicitAdab.length > 0
        ? explicitAdab.join(' ')
        : `Berpakaian muslim/muslimah yang sopan dan menutup aurat saat memasuki kompleks pemakaman ${safeName}. Menjaga ketenangan, ketertiban, serta meluruskan niat ziarah dan tawassul semata-mata mengharap ridha Allah SWT.`,
    barokahHajat: explicitHajat.length > 0 ? explicitHajat : [getSiteBarokahHajat({ ...site, name: safeName })],
    doaKhusus: resolvedDoas,
    karomah: explicitKaromah,
    untoldStory: site.untoldStory ? sanitizeHistoricalLogisticsText(String(site.untoldStory)) : '',
  };
}

