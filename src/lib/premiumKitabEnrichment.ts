import type { ZiarahSite } from '../data/sites';
import {
  getSiteBarokahHajat,
  getSiteLogistics,
  sanitizeHistoricalLogisticsText,
  sanitizePureArabicText,
} from './siteLogistics';

export interface TawassulNode {
  order: number;
  label: string;
  recipientSummary: string;
  arabic: string;
  latin: string;
  translation: string;
}

export type WasilahThemeKey =
  | 'kesembuhan'
  | 'rezeki'
  | 'ilmu_keluarga'
  | 'keteguhan_negeri'
  | 'ketenangan_taubat';

export interface CanonicalWasilahPrayer {
  id: string;
  theme: WasilahThemeKey;
  themeLabel: string;
  title: string;
  sourceCitation: string;
  arabic: string;
  latin: string;
  translation: string;
  kaifiyah: string;
  targetCount: 3 | 7 | 11 | 33;
}

export interface MuhasabahPoint {
  number: number;
  title: string;
  body: string;
}

export interface DeepTadabburContext {
  sectionHeading: string;
  dakwahNetworkSummary: string;
  factualDetails: {
    era: string;
    region: string;
    haulSchedule: string;
    primaryReferences: string[];
    sanadNote: string | null;
  };
  muhasabahPoints: MuhasabahPoint[];
}

function getSafeSiteIdentity(site: ZiarahSite) {
  const safeName = sanitizeHistoricalLogisticsText(site.name || site.title || 'Waliyullah');
  const safeTitle = sanitizeHistoricalLogisticsText(site.title || safeName);
  const city = (site.location?.city || site.city || 'Nusantara').trim();
  const province = (site.location?.province || site.province || 'Indonesia').trim();
  const era = (site.era || 'Khazanah Sejarah Islam Nusantara').trim();
  return { safeName, safeTitle, city, province, era };
}

/**
 * Membangun 4 simpul Silsilah Hadiah Al-Fatihah berbasis tradisi Majmu' Syarif
 * yang disesuaikan secara dinamis dengan kategori & profil faktual situs makam.
 * Semua teks Arab dijamin 100% bebas huruf Latin [a-zA-Z].
 */
export function buildStructuredTawassul(site: ZiarahSite): TawassulNode[] {
  const { safeName, safeTitle, city, province } = getSafeSiteIdentity(site);
  const wasilahSummary = getSiteBarokahHajat(site);
  const roleContext = `${safeName} ${safeTitle} ${site.category || ''}`.toLowerCase();

  const isSultanOrHero =
    /\b(sultan|raja|pangeran|panembahan|adipati|ratu|pahlawan|diponegoro|imam bonjol|raden intan|sentot|mangkurat|cakraningrat|baabullah|hasanuddin|iskandar muda|ageng tirtayasa|malikussaleh|suriansyah)\b/i.test(
      roleContext
    );

  let secondNodeLabel = 'Simpul Kedua · Silsilah Masyayikh & Ulama Nusantara';
  let secondNodeSummary =
    'Sulthanul Auliya Syekh Abdul Qadir al-Jilani RA, Imam al-Ghazali, Syekh Nawawi al-Bantani, serta seluruh ulama dan guru pesantren Nusantara.';
  let secondNodeArabic =
    'ثُمَّ إِلَى حَضْرَةِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ، وَالْإِمَامِ أَبِي حَامِدٍ الْغَزَالِيِّ، وَسَائِرِ الْعُلَمَاءِ الْعَامِلِيْنَ وَالْمَشَايِخِ الصَّالِحِيْنَ فِي نُوْسَانْتَارَا، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ';
  let secondNodeLatin =
    "Tsumma ilâ hadhrati Sulthânil Auliyâ'isy Syaikh 'Abdil Qâdir al-Jîlânî, wal Imâm Abî Hâmidin al-Ghazâlî, wa sâ-iril 'ulamâ-il 'âmilîna wal masyâyikhish shâlihîn fî Nûsântârâ, syai-un lillâhi lahumul Fâtihah.";
  let secondNodeTranslation =
    'Kemudian ke hadirat Sulthanul Auliya Syekh Abdul Qadir al-Jilani, Imam Abu Hamid al-Ghazali, serta seluruh ulama pengamal ilmu dan para guru shalih di Nusantara; untuk beliau semua Al-Fatihah.';

  if (site.category === 'Habaib') {
    secondNodeLabel = 'Simpul Kedua · Silsilah Sadah Alawiyyin & Thariqah Bani Alawi';
    secondNodeSummary =
      "Sulthanul Auliya Syekh Abdul Qadir al-Jilani RA, Imam al-Faqih al-Muqaddam Muhammad bin Ali Ba'alawi, Imam Abdullah bin Alawi al-Haddad, serta seluruh sadah Ba'alawi Nusantara.";
    secondNodeArabic =
      'ثُمَّ إِلَى حَضْرَةِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ، ثُمَّ إِلَى حَضْرَةِ الْإِمَامِ الْفَقِيْهِ الْمُقَدَّمِ مُحَمَّدِ بْنِ عَلِيٍّ بَاعَلَوِي، وَالْإِمَامِ عَبْدِ اللهِ بْنِ عَلَوِيٍّ الْحَدَّادِ، وَسَائِرِ السَّادَةِ آلِ بَاعَلَوِي وَالْأَوْلِيَاءِ الصَّالِحِيْنَ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ';
    secondNodeLatin =
      "Tsumma ilâ hadhrati Sulthânil Auliyâ'isy Syaikh 'Abdil Qâdir al-Jîlânî, tsumma ilâ hadhratil Imâm al-Faqîhil Muqaddam Muhammad bin 'Alî Bâ'alawî, wal Imâm 'Abdillâh bin 'Alawî al-Haddâd, wa sâ-iris sâdati Âli Bâ'alawî wal auliyâ-ish shâlihîn, syai-un lillâhi lahumul Fâtihah.";
    secondNodeTranslation =
      "Kemudian ke hadirat Sulthanul Auliya Syekh Abdul Qadir al-Jilani, Imam al-Faqih al-Muqaddam Muhammad bin Ali Ba'alawi, Imam Abdullah bin Alawi al-Haddad, serta seluruh keluarga besar Ba'alawi dan para wali Allah yang shalih; untuk beliau semua Al-Fatihah.";
  } else if (site.category === 'Walisongo') {
    secondNodeLabel = 'Simpul Kedua · Silsilah Wali Songo & Guru Dakwah Tanah Jawa';
    secondNodeSummary =
      'Sulthanul Auliya Syekh Abdul Qadir al-Jilani RA, Maulana Malik Ibrahim, serta seluruh sembilan Wali Songo perintis dakwah Islam di Jawa dan Nusantara.';
    secondNodeArabic =
      'ثُمَّ إِلَى حَضْرَةِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ، وَإِلَى حَضْرَةِ السَّادَةِ التِّسْعَةِ الْأَوْلِيَاءِ وَمَشَايِخِهِمْ فِي جَاوَى وَنُوْسَانْتَارَا، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ';
    secondNodeLatin =
      "Tsumma ilâ hadhrati Sulthânil Auliyâ'isy Syaikh 'Abdil Qâdir al-Jîlânî, wa ilâ hadhratis Sâdatit Tis'atil Auliyâ' (Wali Songo) wa masyâyikhihim fî Jâwâ wa Nûsântârâ, syai-un lillâhi lahumul Fâtihah.";
    secondNodeTranslation =
      'Kemudian ke hadirat Sulthanul Auliya Syekh Abdul Qadir al-Jilani, serta sembilan Wali Allah (Wali Songo) beserta para guru beliau di tanah Jawa dan Nusantara; untuk beliau semua Al-Fatihah.';
  } else if (isSultanOrHero) {
    secondNodeLabel = 'Simpul Kedua · Para Sultan Muslim Adil & Syuhada Nusantara';
    secondNodeSummary =
      'Para raja, sultan, umara Muslim yang adil, serta para syuhada yang berjuang menegakkan dakwah dan kemerdekaan di Nusantara.';
    secondNodeArabic =
      'ثُمَّ إِلَى حَضْرَةِ السَّلَاطِيْنِ وَالْأُمَرَاءِ الْعَادِلِيْنَ وَالشُّهَدَاءِ الصَّالِحِيْنَ الَّذِيْنَ جَاهَدُوْا فِي سَبِيْلِ اللهِ وَنَشَرُوْا دِيْنَ الْإِسْلَامِ فِي هٰذِهِ الْبِلَادِ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ';
    secondNodeLatin =
      "Tsumma ilâ hadhratis salâthîni wal umarâ-il 'âdilîna wasy syuhadâ-ish shâlihînalladzîna jâhadû fî sabîlillâhi wa nasyarû dînal Islâm fî hâdzihil bilâd, syai-un lillâhi lahumul Fâtihah.";
    secondNodeTranslation =
      'Kemudian ke hadirat para sultan dan pemimpin yang adil serta para syuhada yang shalih, yang berjuang di jalan Allah dan menyebarkan agama Islam di negeri ini; untuk beliau semua Al-Fatihah.';
  }

  return [
    {
      order: 1,
      label: 'Simpul Pertama · Hadirat Baginda Nabi Muhammad SAW & Ahlul Bait',
      recipientSummary:
        'Nabi Besar Muhammad SAW beserta keluarga suci, para istri, sahabat, tabi’in, dan seluruh dzurriyah beliau.',
      arabic: sanitizePureArabicText(
        'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى آلِهِ وَأَصْحَابِهِ وَأَزْوَاجِهِ وَذُرِّيَّاتِهِ أَجْمَعِيْنَ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ'
      ),
      latin:
        "Ilâ hadhratin Nabiyyil Mushthafâ Muhammadin shallallâhu 'alaihi wa sallama, wa 'alâ âlihi wa ash-hâbihi wa azwâjihi wa dzurriyyâtihi ajma'în, syai-un lillâhi lahumul Fâtihah.",
      translation:
        'Ke hadirat Baginda Nabi yang terpilih Muhammad SAW, beserta seluruh keluarga, sahabat, istri-istri, dan keturunan beliau; segala sesuatu milik Allah, untuk beliau semua Al-Fatihah.',
    },
    {
      order: 2,
      label: secondNodeLabel,
      recipientSummary: secondNodeSummary,
      arabic: sanitizePureArabicText(secondNodeArabic),
      latin: secondNodeLatin,
      translation: secondNodeTranslation,
    },
    {
      order: 3,
      label: `Simpul Ketiga · Khusus Sohibul Maqbarah (${safeName})`,
      recipientSummary: `Khusus ke hadirat ${safeName} (${safeTitle}) yang dimakamkan di ${city}, ${province}.`,
      arabic: sanitizePureArabicText(
        'ثُمَّ خُصُوْصًا إِلَى حَضْرَةِ صَاحِبِ هٰذَا الْمَقَامِ الْمُبَارَكِ الْوَلِيِّ الصَّالِحِ قَدَّسَ اللهُ سِرَّهُ الْعَزِيْزَ وَأَفَاضَ عَلَيْنَا مِنْ بَرَكَاتِهِ وَعُلُوْمِهِ فِي الدِّيْنِ وَالدُّنْيَا وَالْآخِرَةِ، شَيْءٌ لِلّٰهِ لَهُ الْفَاتِحَةُ'
      ),
      latin: `Tsumma khushûshan ilâ hadhrati shâhibi hâdzal maqâmil mubârak ${safeName} (${safeTitle}) fî ${city}, qaddasallâhu sirrahul 'azîz wa afâdha 'alainâ min barakâtihi wa 'ulûmihi fid dîni wad dun-yâ wal âkhirah, syai-un lillâhi lahul Fâtihah.`,
      translation: `Kemudian secara khusus ke hadirat penghuni maqbarah mulia ini, ${safeName} (${safeTitle}) di ${city}; semoga Allah menyucikan rahasia ruhani beliau dan melimpahkan kepada kita keberkahan ilmu serta amal beliau dalam urusan agama, dunia, dan akhirat; untuk beliau Al-Fatihah.`,
    },
    {
      order: 4,
      label: 'Simpul Keempat · Kedua Orang Tua, Leluhur & Niat Hajat Peziarah',
      recipientSummary: `Untuk orang tua, kakek-nenek, para guru, kaum muslimin, serta wasilah niat hajat peziarah di maqbarah ${safeName}.`,
      arabic: sanitizePureArabicText(
        'ثُمَّ إِلَى أَرْوَاحِ آبَائِنَا وَأُمَّهَاتِنَا وَأَجْدَادِنَا وَجَدَّاتِنَا وَمَشَايِخِنَا وَلِجَمِيْعِ الْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ، وَعَلَى نِيَّةِ الْقَبُوْلِ وَقَضَاءِ الْحَاجَاتِ وَتَيْسِيْرِ الْأُمُوْرِ وَالْعَافِيَةِ، الْفَاتِحَةُ'
      ),
      latin: `Tsumma ilâ arwâhi âbâ-inâ wa ummahâtinâ wa ajdâdinâ wa jaddâtinâ wa masyâyikhinâ wa li jamî'il muslimîna wal muslimât, wa 'alâ niyyatil qabûli wa qadhâ-il hâjâti wa taysîril umûri wal 'âfiyah bi barkati hâdzihil maqbarah (${safeName}), al-Fâtihah.`,
      translation: `Kemudian kepada arwah ayahanda dan ibunda kami, leluhur kami, guru-guru kami, dan seluruh kaum muslimin-muslimat, disertai niat diterimanya doa, terkabulnya hajat, dimudahkannya urusan, serta keselamatan lahir-batin (terutama ikhtiar: ${wasilahSummary}), Al-Fatihah.`,
    },
  ];
}

export function detectWasilahTheme(site: ZiarahSite): {
  key: WasilahThemeKey;
  label: string;
} {
  const wasilahField =
    typeof (site as { wasilah?: string }).wasilah === 'string'
      ? (site as { wasilah?: string }).wasilah!
      : '';
  const hajatText = getSiteBarokahHajat(site);
  const primaryText = `${wasilahField} ${hajatText}`.toLowerCase();
  const secondaryText = `${site.description || ''} ${site.history || ''}`.toLowerCase();

  const patterns: Array<{
    key: WasilahThemeKey;
    label: string;
    regex: RegExp;
  }> = [
    {
      key: 'kesembuhan',
      label: "Ikhtiar Kesembuhan, Kesehatan & Syifa' Lahir-Batin",
      regex:
        /\b(kesembuhan|sembuh|syifa|penyakit|kesehatan|sehat|pengobatan|thib|wabah|tolak bala)\b/i,
    },
    {
      key: 'rezeki',
      label: 'Kelapangan Rezeki Halal, Perniagaan & Lepas dari Hutang',
      regex:
        /\b(rezeki|niaga|perniagaan|dagang|usaha|hutang|utang|tani|pertanian|panen|kelapangan|kemakmuran|ekonomi)\b/i,
    },
    {
      key: 'keteguhan_negeri',
      label: 'Keteguhan Iman, Amanah Kepemimpinan & Keselamatan Negeri',
      regex:
        /\b(pemimpin|kepemimpinan|adil|keadilan|amanah|negeri|bangsa|daerah|marabahaya|keberanian|keteguhan iman)\b/i,
    },
    {
      key: 'ilmu_keluarga',
      label: "Futuhul 'Arifin (Ilmu Berkah), Pesantren & Keturunan Shalih",
      regex:
        /\b(ilmu|santri|pesantren|hafalan|qur'an|quran|keturunan|keluarga|anak|dzurriyah|futuhul)\b/i,
    },
  ];

  // Utamakan pencocokan pada narasi wasilah/hajat spesifik makam terlebih dahulu
  for (const candidate of patterns) {
    if (candidate.regex.test(primaryText)) {
      return { key: candidate.key, label: candidate.label };
    }
  }
  for (const candidate of patterns) {
    if (candidate.regex.test(secondaryText)) {
      return { key: candidate.key, label: candidate.label };
    }
  }

  return {
    key: 'ketenangan_taubat',
    label: 'Ketenangan Batin, Taubat Nasuha & Mahabbah Rasulullah SAW',
  };
}

/**
 * Mengembalikan 3 rangkaian ayat Al-Qur'an dan Doa Nabawi Sahih yang terverifikasi sumbernya
 * sesuai tema wasilah hajat maqbarah — bebas halusinasi dan bebas doa karangan.
 */
export function getCanonicalWasilahPrayers(site: ZiarahSite): CanonicalWasilahPrayer[] {
  const detected = detectWasilahTheme(site);
  const { safeName } = getSafeSiteIdentity(site);

  const bank: Record<WasilahThemeKey, Omit<CanonicalWasilahPrayer, 'theme' | 'themeLabel'>[]> = {
    kesembuhan: [
      {
        id: `${site.id}-canon-syifa-1`,
        title: "Ayat Syifa' — Penawar Penyakit Lahir dan Batin",
        sourceCitation: "Al-Qur'an, QS. Asy-Syu'ara: 80 & QS. Al-Isra': 82",
        arabic: sanitizePureArabicText(
          'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِيْنِ ۝ وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِيْنَ'
        ),
        latin:
          "Wa idzâ maridhtu fahuwa yasyfîn. Wa nunazzilu minal Qur-âni mâ huwa syifâ-un wa rahmatun lil mu'minîn.",
        translation:
          "Dan apabila aku sakit, Dialah Yang menyembuhkan aku. Dan Kami turunkan dari Al-Qur'an sesuatu yang menjadi penawar (obat) dan rahmat bagi orang-orang yang beriman.",
        kaifiyah: `Dibaca dengan penuh keyakinan sebanyak 7 kali setelah bertawassul di maqbarah ${safeName}, seraya meniatkan kesembuhan diri atau keluarga yang sedang sakit semata-mata atas izin Allah SWT.`,
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-syifa-2`,
        title: 'Doa Kesembuhan Nabi Muhammad SAW (Ruqyah Syar’iyyah)',
        sourceCitation: 'Hadis Sahih, HR. Al-Bukhari no. 5743 & Muslim no. 2191',
        arabic: sanitizePureArabicText(
          'اَللّٰهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا'
        ),
        latin:
          "Allâhumma Rabban nâsi adzhibil ba'sa, isyfi wa Antasy Syâfî, lâ syifâ-a illâ syifâ-uka syifâ-an lâ yughâdiru saqamâ.",
        translation:
          'Ya Allah, Tuhan pemelihara seluruh manusia, hilangkanlah penyakit ini, sembuhkanlah karena Engkaulah Dzat Yang Maha Menyembuhkan. Tiada kesembuhan selain kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan rasa sakit sedikit pun.',
        kaifiyah:
          'Diamalkan 7 kali sambil meletakkan tangan kanan di bagian tubuh yang sakit atau diniatkan untuk anggota keluarga yang sedang dirawat.',
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-syifa-3`,
        title: 'Doa Perlindungan Raga dari Segala Penyakit',
        sourceCitation: 'Hadis Sahih, HR. Muslim no. 2202',
        arabic: sanitizePureArabicText(
          'بِسْمِ اللهِ (٣×) أَعُوْذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ'
        ),
        latin: "Bismillâh (3x). A'ûdzu billâhi wa qudratihi min syarri mâ ajidu wa uhâdzir.",
        translation:
          'Dengan menyebut nama Allah (3x). Aku berlindung kepada Allah dan kekuasaan-Nya dari keburukan sakit yang sedang aku rasakan dan aku khawatirkan.',
        kaifiyah:
          'Dibaca pagi dan petang serta seusai shalat fardhu sebanyak 7 kali sebagai ikhtiar menjaga kesehatan lahir dan ketenangan jiwa.',
        targetCount: 7,
      },
    ],
    rezeki: [
      {
        id: `${site.id}-canon-rezeki-1`,
        title: 'Ayat Kunci Jalan Keluar & Rezeki dari Arah Tak Terduga',
        sourceCitation: "Al-Qur'an, QS. Ath-Thalaq: 2–3",
        arabic: sanitizePureArabicText(
          'وَمَنْ يَّتَّقِ اللهَ يَجْعَلْ لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ وَمَنْ يَّتَوَكَّلْ عَلَى اللهِ فَهُوَ حَسْبُهُ'
        ),
        latin:
          "Wa may yattaqillâha yaj'al lahû makhrajâ, wa yarzuq-hu min haitsu lâ yahtasib, wa may yatawakkal 'alallâhi fahuwa hasbuh.",
        translation:
          'Barang siapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya, dan memberinya rezeki dari arah yang tidak disangka-sangkanya. Dan barang siapa bertawakal kepada Allah, niscaya Allah akan mencukupkan keperluannya.',
        kaifiyah: `Dibaca 7 kali seusai salam ziarah ke ${safeName} maupun selesai shalat Dhuha dan Fardhu, disertai tekad menjaga ketakwaan serta kejujuran dalam berniaga.`,
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-rezeki-2`,
        title: 'Doa Kecukupan Rezeki Halal & Bebas Lilitan Hutang',
        sourceCitation: 'Hadis Hasan, HR. At-Tirmidzi no. 3563 (riwayat Ali bin Abi Thalib RA)',
        arabic: sanitizePureArabicText(
          'اَللّٰهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ'
        ),
        latin: "Allâhummakfinî bi halâlika 'an harâmika, wa aghninî bi fadhlika 'amman siwâk.",
        translation:
          'Ya Allah, cukupkanlah aku dengan rezeki halal-Mu sehingga terhindar dari yang haram, dan kayakanlah aku dengan karunia-Mu hingga tidak bergantung kepada selain-Mu.',
        kaifiyah:
          'Diamalkan 11 kali setiap selesai shalat fardhu atau menjelang membuka usaha dan ikhtiar mencari nafkah halal.',
        targetCount: 11,
      },
      {
        id: `${site.id}-canon-rezeki-3`,
        title: 'Doa Pagi Nabi SAW: Ilmu Manfaat, Rezeki Thayyib & Amal Diterima',
        sourceCitation: 'Hadis Sahih, HR. Ibnu Majah no. 925 & Musnad Ahmad',
        arabic: sanitizePureArabicText(
          'اَللّٰهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا'
        ),
        latin: "Allâhumma innî as-aluka 'ilman nâfi'an, wa rizqan thayyiban, wa 'amalan mutaqabbalâ.",
        translation:
          'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang halal lagi baik, serta amal ibadah yang Engkau terima.',
        kaifiyah:
          'Dibaca 3 kali setiap selesai shalat Subuh dan setelah berziarah agar keberkahan rezeki selalu menyatu dengan keberkahan amal.',
        targetCount: 3,
      },
    ],
    ilmu_keluarga: [
      {
        id: `${site.id}-canon-ilmu-1`,
        title: 'Doa Kelapangan Dada, Kefahaman & Tambahan Ilmu',
        sourceCitation: "Al-Qur'an, QS. Thaha: 25–28 & 114",
        arabic: sanitizePureArabicText(
          'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّنْ لِّسَانِي ۝ يَفْقَهُوْا قَوْلِي ۝ رَبِّ زِدْنِي عِلْمًا'
        ),
        latin:
          "Rabbisyrah lî shadrî, wa yassir lî amrî, wahlul 'uqdatam mil lisânî yafqahû qaulî. Rabbi zidnî 'ilmâ.",
        translation:
          'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah untukku urusanku, dan lepaskanlah kekakuan dari lidahku agar mereka mengerti perkataanku. Ya Tuhanku, tambahkanlah ilmu kepadaku.',
        kaifiyah: `Dibaca 7 kali sebelum belajar, mengajar, atau saat memohon futuh (terbukanya pemahaman ilmu) dengan meneladani semangat keilmuan ${safeName}.`,
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-ilmu-2`,
        title: 'Doa Keluarga Sakinah & Keturunan Penyejuk Mata',
        sourceCitation: "Al-Qur'an, QS. Al-Furqan: 74",
        arabic: sanitizePureArabicText(
          'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَّاجْعَلْنَا لِلْمُتَّقِيْنَ إِمَامًا'
        ),
        latin:
          "Rabbanâ hab lanâ min azwâjinâ wa dzurriyyâtinâ qurrata a'yunin waj'alnâ lil muttaqîna imâmâ.",
        translation:
          'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyejuk hati kami, dan jadikanlah kami teladan bagi orang-orang yang bertakwa.',
        kaifiyah:
          'Dibaca 7 kali pada sepertiga malam dan seusai shalat Maghrib/Subuh sambil menyebut nama anak-anak serta keluarga dalam hati.',
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-ilmu-3`,
        title: 'Doa Nabi Ibrahim AS untuk Keshalihan Anak Cucu',
        sourceCitation: "Al-Qur'an, QS. Ibrahim: 40",
        arabic: sanitizePureArabicText(
          'رَبِّ اجْعَلْنِي مُقِيْمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ'
        ),
        latin: "Rabbij'alnî muqîmash shalâti wa min dzurriyyatî, rabbanâ wa taqabbal du'â.",
        translation:
          'Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap menegakkan shalat; ya Tuhan kami, perkenankanlah doaku.',
        kaifiyah:
          'Diamalkan 3 kali setelah selesai berdoa di maqbarah agar anak keturunan senantiasa dijaga dalam ketaatan shalat dan akhlak mulia.',
        targetCount: 3,
      },
    ],
    keteguhan_negeri: [
      {
        id: `${site.id}-canon-teguh-1`,
        title: 'Doa Keteguhan Hati di Atas Hidayah & Kebenaran',
        sourceCitation: "Al-Qur'an, QS. Ali Imran: 8",
        arabic: sanitizePureArabicText(
          'رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَّدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ'
        ),
        latin:
          "Rabbanâ lâ tuzigh qulûbanâ ba'da idz hadaitanâ wa hab lanâ mil ladunka rahmatan innaka Antal Wahhâb.",
        translation:
          'Ya Tuhan kami, janganlah Engkau condongkan hati kami kepada kesesatan setelah Engkau beri petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi-Mu; sesungguhnya Engkau Maha Pemberi.',
        kaifiyah: `Dibaca 7 kali saat memohon keteguhan pendirian dalam menjalankan amanah keluarga, masyarakat, dan kepemimpinan, meneladani istiqamah ${safeName}.`,
        targetCount: 7,
      },
      {
        id: `${site.id}-canon-teguh-2`,
        title: 'Doa Keamanan, Kedamaian & Kemakmuran Negeri',
        sourceCitation: "Al-Qur'an, QS. Al-Baqarah: 126",
        arabic: sanitizePureArabicText(
          'رَبِّ اجْعَلْ هٰذَا بَلَدًا آمِنًا وَّارْزُقْ أَهْلَهُ مِنَ الثَّمَرَاتِ'
        ),
        latin: "Rabbij'al hâdzâ baladan âminan warzuq ahlahu minats tsamarât.",
        translation:
          'Ya Tuhanku, jadikanlah negeri ini negeri yang aman sentosa, dan limpahkanlah rezeki berupa buah-buahan (kemakmuran) kepada penduduknya.',
        kaifiyah:
          'Diamalkan 3 kali sebagai munajat keselamatan bagi daerah kelahiran, lingkungan tinggal, serta bangsa Indonesia tercinta.',
        targetCount: 3,
      },
      {
        id: `${site.id}-canon-teguh-3`,
        title: 'Dzikir Tawakal Hasbunallah & Perlindungan dari Marabahaya',
        sourceCitation: "Al-Qur'an, QS. Ali Imran: 173 & Hadis Sahih HR. Abu Dawud no. 5088",
        arabic: sanitizePureArabicText(
          'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيْلُ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرُ ۝ بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ'
        ),
        latin:
          "Hasbunallâhu wa ni'mal wakîl, ni'mal maulâ wa ni'man nashîr. Bismillâhilladzî lâ yadhurru ma'asmihi syai-un fil ardhi wa lâ fis samâ-i wa Huwas Samî'ul 'Alîm.",
        translation:
          'Cukuplah Allah menjadi penolong kami dan Allah adalah sebaik-baik pelindung, sebaik-baik pemimpin dan sebaik-baik penolong. Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi dan di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
        kaifiyah:
          'Dibaca 33 kali untuk meneguhkan keberanian batin menghadapi ujian berat, fitnah, atau marabahaya.',
        targetCount: 33,
      },
    ],
    ketenangan_taubat: [
      {
        id: `${site.id}-canon-tenang-1`,
        title: 'Sayyidul Istighfar — Penghulu Segala Permohonan Ampun',
        sourceCitation: 'Hadis Sahih, HR. Al-Bukhari no. 6306',
        arabic: sanitizePureArabicText(
          'اَللّٰهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ'
        ),
        latin:
          "Allâhumma Anta Rabbî lâ ilâha illâ Anta, khalaqtanî wa ana 'abduka, wa ana 'alâ 'ahdika wa wa'dika mastatha'tu, a'ûdzu bika min syarri mâ shana'tu, abû-u laka bi ni'matika 'alayya wa abû-u bi dzanbî faghfir lî fa innahu lâ yaghfirudz dzunûba illâ Anta.",
        translation:
          'Ya Allah, Engkaulah Tuhanku, tiada Tuhan selain Engkau. Engkau menciptakanku dan aku adalah hamba-Mu; aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku, aku mengakui nikmat-Mu atasku dan aku mengakui dosaku, maka ampunilah aku, karena tiada yang dapat mengampuni dosa selain Engkau.',
        kaifiyah: `Dibaca dengan penuh kerendahan hati 3 kali setiap pagi dan petang serta ketika berada di maqbarah ${safeName} untuk membersihkan hati sebelum berdoa.`,
        targetCount: 3,
      },
      {
        id: `${site.id}-canon-tenang-2`,
        title: 'Doa Nabi Yunus AS Ketika Terhimpit Ujian Berat',
        sourceCitation: "Al-Qur'an, QS. Al-Anbiya': 87 & HR. At-Tirmidzi no. 3505",
        arabic: sanitizePureArabicText('لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِيْنَ'),
        latin: "Lâ ilâha illâ Anta subhânaka innî kuntu minazh zhâlimîn.",
        translation:
          'Tiada Tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang-orang yang berbuat zalim.',
        kaifiyah:
          'Diulang 33 kali dengan tarikan napas tenang saat hati dilanda kegelisahan, kesedihan, atau kebuntuan hidup.',
        targetCount: 33,
      },
      {
        id: `${site.id}-canon-tenang-3`,
        title: 'Doa Sapu Jagat & Kebaikan Urusan Agama maupun Dunia',
        sourceCitation: "Al-Qur'an, QS. Al-Baqarah: 201 & Hadis Sahih HR. Muslim no. 2720",
        arabic: sanitizePureArabicText(
          'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَّفِي الْآخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ ۝ اَللّٰهُمَّ أَصْلِحْ لِي دِيْنِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيْهَا مَعَاشِي'
        ),
        latin:
          "Rabbanâ âtinâ fid dun-yâ hasanatan wa fil âkhirati hasanatan wa qinâ 'adzâban nâr. Allâhumma ashlih lî dînilladzî huwa 'ishmatu amrî wa ashlih lî dun-yâyallatî fîhâ ma'âsyî.",
        translation:
          'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat serta lindungilah kami dari siksa neraka. Ya Allah, perbaikilah bagiku agamaku yang menjadi penjaga urusanku, dan perbaikilah bagiku duniaku yang menjadi tempat kehidupanku.',
        kaifiyah:
          'Dibaca 11 kali sebagai penutup rangkaian munajat agar Allah SWT menata agama, kehidupan dunia, dan ketenteraman hati peziarah.',
        targetCount: 11,
      },
    ],
  };

  return bank[detected.key].map((item) => ({
    ...item,
    theme: detected.key,
    themeLabel: detected.label,
  }));
}

/**
 * Membangun refleksi Konteks Sanad Sejarah & 3 Butir Muhasabah Peziarah
 * murni berbasis data faktual situs (era, kota/provinsi, jadwal haul, rujukan, sanad)
 * serta prinsip tauhid dan akhlak Al-Qur'an tanpa mengarang cerita fiktif.
 */
export function buildDeepTadabburAndContext(site: ZiarahSite): DeepTadabburContext {
  const { safeName, safeTitle, city, province, era } = getSafeSiteIdentity(site);
  const logistics = getSiteLogistics(site);
  const references = Array.isArray(site.references)
    ? site.references.map((r) => sanitizeHistoricalLogisticsText(String(r || ''))).filter(Boolean)
    : [];
  const sanadNote = site.sanad ? sanitizeHistoricalLogisticsText(site.sanad) : null;

  const refSummary =
    references.length > 0
      ? `Catatan riwayat ${safeName} merujuk pada ${references.length} sumber literatur/arsip utama (antara lain: ${references[0]}).`
      : `Dokumentasi maqbarah ${safeName} di ${city}, ${province} dirawat dalam jaringan tradisi pesantren dan juru kunci setempat.`;

  const dakwahNetworkSummary = `${safeName} (${safeTitle}) berkiprah pada periode ${era} dan berpusat di wilayah ${city}, ${province} dalam kategori khazanah ${site.category}. ${refSummary}`;

  return {
    sectionHeading: `Konteks Sanad Sejarah & 3 Butir Muhasabah Peziarah (${safeName})`,
    dakwahNetworkSummary,
    factualDetails: {
      era,
      region: `${city}, ${province}`,
      haulSchedule: logistics.haulSchedule,
      primaryReferences: references,
      sanadNote,
    },
    muhasabahPoints: [
      {
        number: 1,
        title: "Pemurnian Tauhid & Adab Niat Ziarah (QS. Yunus: 62–64)",
        body: `Al-Qur'an menegaskan bahwa para kekasih Allah (auliyâ-ullâh) adalah hamba-hamba yang beriman dan bertakwa sehingga tiada rasa takut dan sedih pada mereka. Berziarah ke pusara ${safeName} di ${city} adalah wujud mahabbah dan doa untuk ahli kubur, seraya memanjatkan permohonan hanya kepada Allah SWT semata.`,
      },
      {
        number: 2,
        title: `Meneladani Ketekunan Dakwah & Akhlak ${safeName}`,
        body: `Keteladanan ${safeName} pada masa ${era} di ${province} menjadi cermin bagi peziarah masa kini: keteguhan menjaga amanah, kesabaran mendidik masyarakat tanpa memutus silaturahmi, dan keberanian membela kebenaran di tengah ujian zaman.`,
      },
      {
        number: 3,
        title: 'Komitmen Istiqamah 7 Hari Pasca-Ziarah',
        body: `Buah sejati dari ziarah ke ${safeName} tampak setelah kembali ke rumah: menjaga shalat lima waktu di awal waktu, melunakkan tutur kata kepada kedua orang tua dan keluarga, serta menunaikan sedekah tersembunyi kepada fakir miskin selama minimal tujuh hari berturut-turut.`,
      },
    ],
  };
}
