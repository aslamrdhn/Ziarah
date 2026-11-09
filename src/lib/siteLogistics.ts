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
}

/**
 * Mengembalikan daftar `doaKhusus` makam yang dilengkapi transliterasi Latin dan doa hajat kontekstual.
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
  const corpus = `${site.id} ${site.title} ${site.name} ${site.description} ${site.history || ''}`.toLowerCase();

  let contextualDoa: EnrichedDoaKhususItem = {
    title: `Doa Munajat Wasilah Hajat & Keberkahan di ${site.title}`,
    text: 'اللّٰهُمَّ إِنِّي أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ مُحَمَّدٍ نَبِيِّ الرَّحْمَةِ، وَبِكَرَامَةِ أَوْلِيَائِكَ الصَّالِحِينَ أَهْلِ هٰذِهِ الْمَقْبَرَةِ، أَنْ تَقْضِيَ حَاجَاتِنَا وَتَفْتَحَ لَنَا أَبْوَابَ الْخَيْرِ وَالتَّيْسِيرِ وَالْبَرَكَةِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ',
    latin:
      "Allaahumma innii as-aluka wa atawajjahu ilaika bi nabiyyika Muhammadin nabiyyir-rahmah, wa bi karaamati auliyaa-ikash-shaalihiina ahli haadzihil-maqbarah, an taqdhiya haajaatinaa wa taftaha lanaa abwaabal-khairi wat-taisiiri wal-barakati fid-diini wad-dun-yaa wal-aakhirah.",
    translation:
      `Ya Allah, sesungguhnya aku memohon dan menghadapkan diri kepada-Mu dengan wasilah Nabi-Mu Muhammad pembawa rahmat, serta dengan kemuliaan para kekasih-Mu yang shalih penghuni maqbarah ini (${site.name}), kabulkanlah hajat-hajat kami, dan bukakanlah bagi kami pintu-pintu kebaikan, kemudahan, serta keberkahan dalam agama, dunia, dan akhirat.`,
  };

  if (
    corpus.includes('drajat') ||
    corpus.includes('kuncung') ||
    corpus.includes('malik ibrahim') ||
    corpus.includes('gresik') ||
    corpus.includes('giri') ||
    corpus.includes('dagang') ||
    corpus.includes('niaga')
  ) {
    contextualDoa = {
      title: `Doa Khusus Wasilah Kelapangan Rezeki, Perniagaan & Lunas Hutang di ${site.title}`,
      text: 'اللّٰهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ، اللّٰهُمَّ يَا فَتَّاحُ يَا رَزَّاقُ بَارِكْ لَنَا فِي تِجَارَتِنَا وَأَرْزَاقِنَا كَمَا بَارَكْتَ لِأَوْلِيَائِكَ الصَّالِحِينَ وَاقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ',
      latin:
        "Allaahummakfinii bi halaalika 'an haraamik, wa aghninii bi fadhlika 'amman siwaak. Allaahumma yaa Fattaahu yaa Razzaaqu baarik lanaa fii tijaaratinaa wa arzaaqinaa kamaa baarakta li auliyaa-ikash-shaalihiin, waqdhi 'annad-daina wa aghninaa minal-faqr.",
      translation:
        'Ya Allah, cukupkanlah aku dengan rezeki halal-Mu sehingga terjaga dari yang haram, dan kayakanlah aku dengan karunia-Mu sehingga tidak bergantung kepada selain-Mu. Wahai Dzat Maha Pembuka pintu rezeki, berkahilah usaha dan perniagaan kami sebagaimana Engkau memberkahi para kekasih-Mu yang shalih, lunaskanlah seluruh tanggungan hutang kami, dan angkatlah kami dari kefakiran.',
    };
  } else if (
    corpus.includes('muria') ||
    corpus.includes('kwitang') ||
    corpus.includes('empang bogor') ||
    corpus.includes('ayu') ||
    corpus.includes('nyai') ||
    corpus.includes('ratu')
  ) {
    contextualDoa = {
      title: `Doa Khusus Wasilah Kemudahan Jodoh Shalih & Keluarga Sakinah di ${site.title}`,
      text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا ۝ اللّٰهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا وَارْزُقْنَا زَوْجًا صَالِحًا وَمَوَدَّةً وَرَحْمَةً وَسَكِينَةً دَائِمَةً',
      latin:
        "Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a'yunin waj'alnaa lil-muttaqiina imaamaa. Allaahumma allif baina quluubinaa wa ashlih dzaata baininaa warzuqnaa zaujan shaalihan wa mawaddatan wa rahmatan wa sakiinatan daa-imah.",
      translation:
        'Ya Tuhan kami, anugerahkanlah kepada kami pasangan hidup dan keturunan yang menjadi penyejuk mata kami, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa. Ya Allah, tautkanlah hati kami dalam kasih sayang, damaikanlah rumah tangga kami, dan karuniakanlah pendamping hidup yang shalih/shalihah beserta ketenteraman batin yang abadi.',
    };
  } else if (
    corpus.includes('kholil') ||
    corpus.includes('hamid') ||
    corpus.includes('pasuruan') ||
    corpus.includes('hasyim asy') ||
    corpus.includes('tebuireng') ||
    corpus.includes('ampel') ||
    corpus.includes('bonang') ||
    corpus.includes('sekumpul')
  ) {
    contextualDoa = {
      title: `Doa Khusus Wasilah Ilmu Bermanfaat, Keturunan Ahlul Qur'an & Jalan Keluar di ${site.title}`,
      text: 'اللّٰهُمَّ انْفَعْنَا بِمَا عَلَّمْتَنَا وَعَلِّمْنَا مَا يَنْفَعُنَا وَزِدْنَا عِلْمًا نَافِعًا وَعَمَلًا مُتَقَبَّلًا، وَأَفِضْ عَلَيْنَا مِنْ بَرَكَاتِ عُلَمَائِكَ وَأَوْلِيَائِكَ الصَّالِحِينَ، وَاجْعَلْ لَنَا مِنْ كُلِّ هَمٍّ فَرَجًا وَمِنْ كُلِّ ضِيقٍ مَخْرَجًا',
      latin:
        "Allaahummanfa'naa bimaa 'allamtanaa wa 'allimnaa maa yanfa'unaa wa zidnaa 'ilman naafi'an wa 'amalan mutaqabbalaa, wa afidh 'alainaa min barakaati 'ulamaa-ika wa auliyaa-ikash-shaalihiin, waj'al lanaa min kulli hammin farajan wa min kulli dhiiqin makhrajaa.",
      translation:
        'Ya Allah, berikanlah kemanfaatan atas ilmu yang telah Engkau ajarkan kepada kami, ajarkanlah ilmu yang membawa maslahat bagi kami, limpahkanlah kepada keluarga dan keturunan kami keberkahan ilmu para ulama dan kekasih-Mu yang shalih, serta bukakanlah kelapangan dari setiap kesedihan dan jalan keluar dari setiap kesempitan hidup.',
    };
  }

  const baseItems: EnrichedDoaKhususItem[] = [];

  if (Array.isArray(site.doaKhusus) && site.doaKhusus.length > 0) {
    site.doaKhusus.forEach((d) => {
      baseItems.push({
        title: d.title,
        text: d.text,
        latin:
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

