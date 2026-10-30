import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Copy,
  Sun,
  Smartphone,
  Vibrate,
  BookOpen,
  Sparkles,
  Check,
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ziarah_panduan_prefs_v1';

interface SavedPanduanPrefs {
  tasbihCount: number;
  tasbihMax: 33 | 100;
  tasbihLoops: number;
  fontSize: 'A' | 'A+' | 'A++';
  showLatin: boolean;
  showTerjemahan: boolean;
  outdoorMode: boolean;
  hapticEnabled: boolean;
}

interface PrayerSectionData {
  id: 'SALAM' | 'TAWASSUL' | 'YASIN' | 'TAHLIL' | 'DOA';
  stepLabel: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  arabicLines: string[];
  latinText: string;
  translationText: string;
}

const PRAYER_SECTIONS: PrayerSectionData[] = [
  {
    id: 'SALAM',
    stepLabel: '1. Salam',
    shortLabel: 'Salam',
    title: 'Salam Masuk Area Makam Waliyullah (Qasidah Salamullah Ya Sadah)',
    subtitle: 'Dibaca dengan berdiri sopan menghadap makam sebelum duduk berdzikir',
    arabicLines: [
      'سَلَامُ اللهِ يَا سَادَة ٠ مِنَ الرَّحْمٰنِ يَغْشَاكُمْ',
      'عِبَادَ اللهِ جِئْنَاكُمْ ٠ قَصَدْنَاكُمْ طَلَبْنَاكُمْ',
      'تُعِينُونَا تُغِيثُونَا ٠ بِهِمَّتِكُمْ وَجَدْوَاكُمْ',
      'فَأَحِبُّونَا وَأَعْطُونَا ٠ عَطَايَاكُمْ هَدَايَاكُمْ',
      'فَلَا خَيَّبْتُمُو ظَنِّي ٠ فَحَاشَاكُمْ وَحَاشَاكُمْ',
      'سَعِدْنَا إِذْ أَتَيْنَاكُمْ ٠ وَفُزْنَا حِينَ زُرْنَاكُمْ',
      'فَقُومُوا وَاشْفَعُوا فِينَا ٠ إِلَى الرَّحْمٰنِ مَوْلَاكُمْ',
    ],
    latinText:
      "Salaamullaahi yaa saadah, minar-Rahmaani yaghshaakum.\n'Ibaadallaahi ji'naakum, qashadnaakum thalabnaakum.\nTu'iinuunaa tughiitsuunaa, bihimmatikum wa jadwaakum.\nFa ahibbuunaa wa a'thuunaa, 'athaayaakum hadaayaakum.\nFalaa khayyabtumuu zhannii, fahaasyaakum wa haasyaakum.\nSa'idnaa idz atainaakum, wa fuznaa hiina zurnaakum.\nFaquumuu wasyfa'uu fiinaa, ilar-Rahmaani mawlaakum.",
    translationText:
      'Kesejahteraan dari Allah wahai para pemimpin, dari Tuhan Yang Maha Pengasih semoga menyelimuti kalian. Wahai hamba-hamba Allah, kami datang kepada kalian, kami bermaksud kepada kalian, kami berharap wasilah kalian. Bantulah kami, tolonglah kami dengan tekad dan kemurahan kalian. Maka cintailah kami dan berikanlah kepada kami karunia serta hadiah kalian. Janganlah kalian mengecewakan prasangka baikku, maka mustahil bagi kalian mengecewakan kami. Kami berbahagia ketika mendatangi kalian dan beruntung ketika menziarahi kalian. Maka bangkitlah dan mohonkanlah syafaat bagi kami kepada Tuhan Yang Maha Pengasih, Tuhan kalian.',
  },
  {
    id: 'TAWASSUL',
    stepLabel: '2. Tawassul',
    shortLabel: 'Tawassul',
    title: 'Susunan Bacaan Tawassul Al-Fatihah Khusus Ziarah',
    subtitle: 'Menghadiahkan bacaan Surah Al-Fatihah kepada Rasulullah SAW, para sahabat, dan Waliyullah',
    arabicLines: [
      'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَآلِهِ وَصَحْبِهِ شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةُ',
      'ثُمَّ إِلَى حَضْرَةِ إِخْوَانِهِ مِنَ الْأَنْبِيَاءِ وَالْمُرْسَلِيْنَ وَالْأَوْلِيَاءِ وَالشُّهَدَاءِ وَالصَّالِحِيْنَ وَالصَّحَابَةِ وَالتَّابِعِيْنَ وَالْعُلَمَاءِ الْعَامِلِيْنَ... الْفَاتِحَةُ',
      'ثُمَّ إِلَى رُوْحِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ وَأَوْلِيَاءِ تِسْعَةِ (وَالِي سُونْغُو) وَأَوْلِيَاءِ نُوسَانْتَارَا وَخُصُوْصًا إِلَى رُوْحِ الْوَلِيِّ الصَّالِحِ الْمَقْبُوْرِ هُنَا... الْفَاتِحَةُ',
    ],
    latinText:
      "Ilaa hadhratin nabiyyil musthafaa Muhammadin shallallaahu 'alaihi wa sallama, wa aalihi wa shahbihii syai-un lillaahi lahumul faatihah...\n\nTsumma ilaa hadhrati ikhwaanihii minal ambiyaa-i wal mursaliina wal auliyaa-i wasy-syuhadaa-i wash-shaalihiina wash-shahaabati wat-taabi'iina wal 'ulamaa-il 'aamiliin... al-faatihah...\n\nTsumma ilaa ruuhi sulthaanil auliyaa-i asy-Syaikh 'Abdil Qaadir al-Jailaanii wa Auliyaa-i Tis'ah (Wali Songo) wa Auliyaa-i Nusantara wa khushuushan ilaa ruuhil waliyyish-shaalihil maqbuuri hunaa (Sebutkan Nama Wali yang diziarahi)... al-faatihah...",
    translationText:
      'Kehadirat Nabi Pilihan Muhammad SAW, keluarga, dan para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka bacaan Al-Fatihah. Kemudian kepada para saudaranya dari kalangan para nabi, rasul, wali, syuhada, orang-orang saleh, sahabat, tabiin, dan ulama yang mengamalkan ilmunya... Al-Fatihah. Kemudian kepada ruh Sultan Para Wali Syekh Abdul Qadir Al-Jailani, para Wali Songo, para Auliya Nusantara, dan khususnya kepada ruh Wali yang dimakamkan di tempat ini... Al-Fatihah.',
  },
  {
    id: 'YASIN',
    stepLabel: '3. Yasin',
    shortLabel: 'Yasin',
    title: 'Surah Yasin & Surat-Surat Pendek',
    subtitle: 'Pembacaan Surah Yasin dilanjutkan Al-Ikhlas (3x), Al-Falaq, An-Nas, dan Ayat Kursi',
    arabicLines: [
      'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ',
      'يسٓ ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ﴿٤﴾ تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ﴿٥﴾ لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ﴿٦﴾',
      'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ ﴿٥٨﴾',
      'فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ ﴿٨٣﴾',
      'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾ (٣×)',
      'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ... وَهُوَ الْعَلِيُّ الْعَظِيمُ ﴿٢٥٥﴾',
    ],
    latinText:
      "Bismillaahir rahmaanir rahiim.\nYaa siin. Wal qur'aanil hakiim. Innaka laminal mursaliin. 'Alaa shiraathim mustaqiim. Tanziilal 'aziizir rahiim. Litundzira qauman maa undzira aabaa-uhum fahum ghaafiluun...\nSalaamun qaulam mir rabbir rahiim...\nFasubhaanalladzii biyadihii malakuutu kulli syai-in wa ilaihi turja'uun.\n\nQul huwallaahu ahad, Allaahush shamad, lam yalid wa lam yuulad, wa lam yakul lahuu kufuwan ahad (3x).\nAllaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw wa laa naum...",
    translationText:
      'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Yaa Siin. Demi Al-Qur’an yang penuh hikmah. Sesungguhnya engkau (Muhammad) benar-benar salah seorang dari rasul-rasul, yang berada di atas jalan yang lurus, sebagai wahyu yang diturunkan oleh Yang Maha Perkasa lagi Maha Penyayang... Kepada mereka dikatakan: "Salam" sebagai ucapan selamat dari Tuhan Yang Maha Penyayang... Maka Mahasuci (Allah) yang di tangan-Nya kekuasaan atas segala sesuatu dan kepada-Nya kamu dikembalikan.',
  },
  {
    id: 'TAHLIL',
    stepLabel: '4. Tahlil',
    shortLabel: 'Tahlil',
    title: 'Susunan Dzikir Tahlil, Tasbih & Shalawat',
    subtitle: 'Gunakan Tasbih Digital di atas untuk menghitung ketukan dzikir 33x atau 100x dengan getaran haptik',
    arabicLines: [
      'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ (٣×)',
      'أَفْضَلُ الذِّكْرِ فَاعْلَمْ أَنَّهُ: لَا إِلٰهَ إِلَّا اللهُ، حَيٌّ مَوْجُوْدٌ',
      'لَا إِلٰهَ إِلَّا اللهُ، حَيٌّ مَعْبُوْدٌ ٠ لَا إِلٰهَ إِلَّا اللهُ، حَيٌّ بَاقٍ',
      'لَا إِلٰهَ إِلَّا اللهُ (٣٣× أَوْ ١٠٠×)',
      'لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ',
      'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، اللَّهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ (٣×)',
      'سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيْمِ (٣٣×)',
    ],
    latinText:
      "Astaghfirullaahal 'azhiim alladzii laa ilaaha illaa huwal hayyul qayyuumu wa atuubu ilaih (3x).\nAfdhaludz-dzikri fa'lam annahuu: Laa ilaaha illallaah, hayyum maujuud.\nLaa ilaaha illallaah, hayyum ma'buud. Laa ilaaha illallaah, hayyum baaq.\nLaa ilaaha illallaah (33x atau 100x).\nLaa ilaaha illallaah Muhammadur rasuulullaah shallallaahu 'alaihi wa sallam.\nAllahumma shalli 'alaa sayyidinaa Muhammad, Allahumma shalli 'alaihi wa sallim (3x).\nSubhaanallaahi wa bihamdih, subhaanallaahil 'azhiim (33x).",
    translationText:
      'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia Yang Maha Hidup lagi terus-menerus mengurus makhluk-Nya, dan aku bertaubat kepada-Nya (3x). Ketahuilah bahwa sebaik-baik dzikir adalah: Tiada Tuhan selain Allah, Maha Hidup lagi Maha Ada. Tiada Tuhan selain Allah (33x / 100x). Tiada Tuhan selain Allah, Nabi Muhammad adalah utusan Allah SAW. Ya Allah limpahkanlah rahmat atas junjungan kami Nabi Muhammad, ya Allah limpahkanlah rahmat dan kesejahteraan atasnya (3x). Mahasuci Allah dan dengan memuji-Nya, Mahasuci Allah Yang Maha Agung (33x).',
  },
  {
    id: 'DOA',
    stepLabel: '5. Doa',
    shortLabel: 'Doa',
    title: 'Doa Penutup Ziarah Kubur (Doa Arwah & Tawassul)',
    subtitle: 'Dibaca dengan mengangkat kedua tangan menghadap Kiblat',
    arabicLines: [
      'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ. اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِيْنَ، حَمْدًا شَاكِرِيْنَ، حَمْدًا النَّاعِمِيْنَ، حَمْدًا يُوَافِيْ نِعَمَهُ وَيُكَافِئُ مَزِيْدَهُ',
      'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
      'اللَّهُمَّ اجْعَلْ وَأَوْصِلْ ثَوَابَ مَا قَرَأْنَاهُ مِنْ سُوْرَةِ يَسٓ وَمَا هَلَّلْنَا وَمَا سَبَّحْنَا وَمَا اسْتَغْفَرْنَا هَدِيَّةً بَالِغَةً وَرَحْمَةً نَازِلَةً وَبَرَكَةً شَامِلَةً إِلَى حَضْرَةِ حَبِيْبِنَا وَشَفِيْعِنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَإِلَى أَرْوَاحِ جَمِيْعِ الْأَوْلِيَاءِ وَالْعُلَمَاءِ وَخُصُوْصًا إِلَى رُوْحِ هٰذَا الْوَلِيِّ الصَّالِحِ الْمَقْبُوْرِ هُنَا',
      'اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ، وَانْفَعْنَا بِأَسْرَارِهِمْ وَأَنْوَارِهِمْ وَعُلُوْمِهِمْ وَبَرَكَاتِهِمْ فِي الدِّيْنِ وَالدُّنْيَا وَالْآخِرَةِ',
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ٠ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِيْنَ',
    ],
    latinText:
      "Bismillaahir rahmaanir rahiim. Alhamdulillaahi rabbil 'aalamiin, hamdasy-syaakiriin, hamdan-naa'imiin, hamdan yuwaafii ni'amahuu wa yukaafi'u maziidah.\nAllahumma shalli wa sallim 'alaa sayyidinaa Muhammadin wa 'alaa aali sayyidinaa Muhammad.\nAllahummaj'al wa awshil tsawaaba maa qara'naahu min suurati Yasin wa maa hallalnaa wa maa sabbahnaa wa mastaghfarnaa hadiyyatan baalighatan wa rahmatan naazilatan wa barakatan syaamilatan ilaa hadhrati habiibinaa wa syafii'inaa Muhammadin shallallaahu 'alaihi wa sallam, wa ilaa arwaahi jamii'il auliyaa-i wal 'ulamaa-i wa khushuushan ilaa ruuhi haadzal waliyyish-shaalihil maqbuuri hunaa.\nAllahummaghfir lahum warhamhum wa 'aafihim wa'fu 'anhum, wanfa'naa bi asraarihim wa anwaarihim wa 'uluumihim wa barakaatihim fid-diini wad-dunyaa wal aakhirah.\nRabbanaa aatinaa fid-dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban naar. Walhamdulillaahi rabbil 'aalamiin.",
    translationText:
      'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam. Ya Allah, jadikanlah dan sampaikanlah pahala dari apa yang kami baca dari Surah Yasin, tahlil, tasbih, dan istighfar kami sebagai hadiah yang sampai, rahmat yang turun, dan keberkahan yang menyeluruh kehadirat kekasih dan pemberi syafaat kami Nabi Muhammad SAW, serta kepada ruh seluruh waliyullah dan ulama, khususnya kepada ruh wali saleh yang dimakamkan di sini. Ya Allah ampunilah mereka, sayangilah mereka, dan berikanlah kami manfaat melalui rahasia keteladanan, cahaya, ilmu, dan keberkahan mereka dalam urusan agama, dunia, dan akhirat. Ya Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari siksa neraka.',
  },
];

export const BacaanZiarah: React.FC = () => {
  // Load initial preferences & tasbih state from localStorage
  const [fontSize, setFontSize] = useState<'A' | 'A+' | 'A++'>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (saved.fontSize === 'A' || saved.fontSize === 'A+' || saved.fontSize === 'A++') return saved.fontSize;
    } catch {}
    return 'A';
  });

  const [tasbihCount, setTasbihCount] = useState<number>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.tasbihCount === 'number' && saved.tasbihCount >= 0) return saved.tasbihCount;
    } catch {}
    return 0;
  });

  const [tasbihMax, setTasbihMax] = useState<33 | 100>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (saved.tasbihMax === 33 || saved.tasbihMax === 100) return saved.tasbihMax;
    } catch {}
    return 33;
  });

  const [tasbihLoops, setTasbihLoops] = useState<number>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.tasbihLoops === 'number' && saved.tasbihLoops >= 0) return saved.tasbihLoops;
    } catch {}
    return 0;
  });

  const [showLatin, setShowLatin] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.showLatin === 'boolean') return saved.showLatin;
    } catch {}
    return true;
  });

  const [showTerjemahan, setShowTerjemahan] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.showTerjemahan === 'boolean') return saved.showTerjemahan;
    } catch {}
    return true;
  });

  const [outdoorMode, setOutdoorMode] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.outdoorMode === 'boolean') return saved.outdoorMode;
    } catch {}
    return false;
  });

  const [hapticEnabled, setHapticEnabled] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.hapticEnabled === 'boolean') return saved.hapticEnabled;
    } catch {}
    return true;
  });

  const [activeStep, setActiveStep] = useState<'SEMUA' | 'SALAM' | 'TAWASSUL' | 'YASIN' | 'TAHLIL' | 'DOA'>('SEMUA');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);
  const [wakeLockSupported, setWakeLockSupported] = useState<boolean>(false);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      const prefs: SavedPanduanPrefs = {
        tasbihCount,
        tasbihMax,
        tasbihLoops,
        fontSize,
        showLatin,
        showTerjemahan,
        outdoorMode,
        hapticEnabled,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [tasbihCount, tasbihMax, tasbihLoops, fontSize, showLatin, showTerjemahan, outdoorMode, hapticEnabled]);

  // Screen Wake Lock API integration so screen never dims/locks mid-Yasin or Tahlil
  const requestWakeLock = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      setWakeLockSupported(false);
      return null;
    }
    setWakeLockSupported(true);
    try {
      const sentinel = await (navigator as any).wakeLock.request('screen');
      setWakeLockActive(true);
      sentinel.addEventListener('release', () => {
        setWakeLockActive(false);
      });
      return sentinel;
    } catch {
      setWakeLockActive(false);
      return null;
    }
  }, []);

  useEffect(() => {
    let sentinel: any = null;
    requestWakeLock().then((s) => {
      sentinel = s;
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock().then((s) => {
          sentinel = s;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (sentinel && typeof sentinel.release === 'function') {
        sentinel.release().catch(() => {});
      }
    };
  }, [requestWakeLock]);

  // Haptic Tasbih Digital Handler
  const handleTasbihClick = () => {
    setTasbihCount((prev) => {
      const next = prev + 1;
      if (next >= tasbihMax) {
        // Completed 33 or 100 round -> Double Haptic Pulse [40, 60, 40]
        if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          try {
            navigator.vibrate([40, 60, 40]);
          } catch {}
        }
        setTasbihLoops((loops) => loops + 1);
        return tasbihMax;
      }
      if (prev >= tasbihMax) {
        // Starting new round from 1
        if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          try {
            navigator.vibrate(15);
          } catch {}
        }
        return 1;
      }
      // Standard single tap -> 15ms Haptic Tick
      if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(15);
        } catch {}
      }
      return next;
    });
  };

  const handleResetTasbih = () => {
    if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(25);
      } catch {}
    }
    setTasbihCount(0);
    setTasbihLoops(0);
  };

  const getArabicFontSizeClass = () => {
    if (fontSize === 'A+') return 'text-4xl md:text-5xl';
    if (fontSize === 'A++') return 'text-5xl md:text-6xl';
    return 'text-3xl md:text-4xl';
  };

  const displayedSections =
    activeStep === 'SEMUA' ? PRAYER_SECTIONS : PRAYER_SECTIONS.filter((s) => s.id === activeStep);

  return (
    <section
      className={`min-h-screen px-4 py-6 sm:py-10 md:px-8 transition-colors duration-200 ${
        outdoorMode ? 'bg-white text-black' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* =====================================================================
            1. EDITORIAL HEADER (85-10-5 Formula + Field Usability Status)
            ===================================================================== */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                outdoorMode
                  ? 'bg-black text-white'
                  : 'bg-emerald-950/5 text-emerald-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Panduan Ibadah Lapangan · Ahlussunnah wal Jama&apos;ah</span>
            </div>
            <h1
              className={`font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] ${
                outdoorMode ? 'text-black font-bold' : 'text-stone-900'
              }`}
            >
              Tuntunan Yasin, Tahlil &amp; Tasbih Digital.
            </h1>
            <p
              className={`text-sm sm:text-base leading-relaxed tracking-tight ${
                outdoorMode ? 'text-stone-900 font-medium' : 'text-stone-500'
              }`}
            >
              Dirancang khusus untuk keterbacaan di area maqbarah: layar tetap menyala otomatis, mode kontras matahari
              (WCAG AAA), dan tasbih digital dengan umpan balik getar haptik.
            </p>
          </div>

          {/* Field Status Pills (Wake Lock & Outdoor Contrast Toggle) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setOutdoorMode(!outdoorMode)}
              aria-pressed={outdoorMode}
              className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition cursor-pointer border ${
                outdoorMode
                  ? 'bg-black text-white border-black shadow-sm font-semibold'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>{outdoorMode ? 'Mode Kontras Matahari: Aktif' : 'Mode Luar Ruangan (Matahari)'}</span>
            </button>

            {wakeLockSupported && (
              <button
                type="button"
                onClick={() => {
                  if (!wakeLockActive) requestWakeLock();
                }}
                className={`px-3.5 py-2.5 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 border ${
                  wakeLockActive
                    ? outdoorMode
                      ? 'bg-stone-100 text-black border-black font-semibold'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-white text-stone-500 border-stone-200/70'
                }`}
                title="Mencegah layar ponsel mati otomatis saat membaca Yasin dan Tahlil"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>{wakeLockActive ? 'Layar Tetap Menyala' : 'Aktifkan Layar Menyala'}</span>
              </button>
            )}
          </div>
        </header>

        {/* =====================================================================
            2. ASYMMETRIC BENTO GRID:
               - 1 Kotak Besar (Left, 5 cols): Tasbih Digital Haptic + Persistence
               - 2 Kotak Sedang (Right, 7 cols): Tahapan Doa & Kontrol Tipografi
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* BENTO BOX 1 (KOTAK BESAR): TASBIH DIGITAL INTERAKTIF + HAPTIC */}
          <div
            className={`lg:col-span-5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition ${
              outdoorMode
                ? 'bg-white border-2 border-black shadow-none'
                : 'bg-white border border-stone-200/70 shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider block ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    Tasbih Digital Lapangan
                  </span>
                  <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                    Ketuk tanpa perlu menatap layar · Tersimpan otomatis
                  </span>
                </div>

                {/* Target 33 / 100 Pill Selector */}
                <div
                  className={`flex items-center p-1 rounded-full border ${
                    outdoorMode ? 'bg-stone-100 border-black' : 'bg-stone-100 border-stone-200/70'
                  }`}
                >
                  {([33, 100] as const).map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => {
                        setTasbihMax(target);
                        setTasbihCount(0);
                      }}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition cursor-pointer ${
                        tasbihMax === target
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {target}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Smooth Progress Bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-emerald-700 h-full rounded-full"
                  initial={false}
                  animate={{ width: `${Math.min(100, Math.round((tasbihCount / tasbihMax) * 100))}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            </div>

            {/* Giant Tactile Thumb-Zone Tap Area */}
            <div className="my-4 flex items-stretch gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                onClick={handleTasbihClick}
                aria-label={`Tambah hitungan tasbih, saat ini ${tasbihCount} dari ${tasbihMax}`}
                className={`flex-1 min-h-[148px] rounded-2xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer select-none transition border ${
                  outdoorMode
                    ? 'bg-stone-50 border-2 border-black hover:bg-stone-100'
                    : 'bg-[#FAF8F5] hover:bg-emerald-950/5 border-stone-200/80'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <motion.span
                    key={tasbihCount}
                    initial={{ scale: 1.2, y: -2 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    className={`font-serif text-5xl sm:text-6xl font-bold tabular-nums tracking-tight ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    {tasbihCount}
                  </motion.span>
                  <span className={`text-sm font-medium tabular-nums ${outdoorMode ? 'text-stone-800' : 'text-stone-400'}`}>
                    / {tasbihMax}
                  </span>
                </div>

                <span
                  className={`text-xs font-medium mt-2 ${
                    tasbihCount === tasbihMax
                      ? 'text-emerald-700 font-semibold'
                      : outdoorMode
                        ? 'text-stone-900'
                        : 'text-stone-500'
                  }`}
                >
                  {tasbihCount === tasbihMax
                    ? 'Alhamdulillah, Selesai 1 Putaran (Ketuk untuk Lanjut)'
                    : 'Ketuk area ini untuk menghitung dzikir'}
                </span>
              </motion.button>

              <button
                type="button"
                onClick={handleResetTasbih}
                title="Reset Hitungan Tasbih"
                aria-label="Reset Hitungan Tasbih"
                className={`px-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  outdoorMode
                    ? 'bg-white border-2 border-black text-black hover:bg-stone-100'
                    : 'bg-white border-stone-200/80 text-stone-500 hover:text-stone-900 hover:border-stone-400'
                }`}
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span className="text-[10px] font-medium">Reset</span>
              </button>
            </div>

            {/* Bottom Tasbih Footer: Loop Counter & Haptic Feedback Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200/70 text-xs">
              <span className={outdoorMode ? 'text-black font-semibold' : 'text-stone-500'}>
                Putaran Selesai: <strong className="text-stone-900 tabular-nums">{tasbihLoops}×</strong>
              </span>

              <button
                type="button"
                onClick={() => setHapticEnabled(!hapticEnabled)}
                aria-pressed={hapticEnabled}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition cursor-pointer border ${
                  hapticEnabled
                    ? 'bg-emerald-950/5 text-emerald-800 border-emerald-200/80'
                    : 'bg-stone-100 text-stone-500 border-stone-200/70'
                }`}
              >
                <Vibrate className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Getar Haptik: {hapticEnabled ? 'Aktif' : 'Nonaktif'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN (2 KOTAK SEDANG DI SAMPINGNYA) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* BENTO BOX 2 (KOTAK SEDANG ATAS): TAHAPAN BACAAN YASIN, TAHLIL & DOA */}
            <div
              className={`rounded-3xl p-5 sm:p-6 flex-1 flex flex-col justify-between transition ${
                outdoorMode
                  ? 'bg-white border-2 border-black'
                  : 'bg-white border border-stone-200/70 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider block ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    Urutan Bacaan Ziarah Kubur
                  </span>
                  <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                    Pilih &ldquo;Semua Sekaligus&rdquo; untuk membaca dari awal hingga doa tanpa mengetuk layar
                  </span>
                </div>
                <Link
                  to="/doa"
                  className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
                >
                  Buka Kumpulan Doa Khusus →
                </Link>
              </div>

              {/* Horizontal / Grid Pill Selector for Reading Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('SEMUA')}
                  className={`py-2.5 px-3.5 rounded-2xl text-xs font-medium tracking-tight text-left flex items-center justify-between transition cursor-pointer border ${
                    activeStep === 'SEMUA'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                      : outdoorMode
                        ? 'bg-white text-black border-black hover:bg-stone-100'
                        : 'bg-[#FAF8F5] text-stone-700 border-stone-200/70 hover:border-stone-400'
                  }`}
                >
                  <span>Semua Sekaligus</span>
                  <Eye className="w-3.5 h-3.5 opacity-80 shrink-0" aria-hidden="true" />
                </button>

                {PRAYER_SECTIONS.map((sec) => {
                  const isSelected = activeStep === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveStep(sec.id)}
                      className={`py-2.5 px-3.5 rounded-2xl text-xs font-medium tracking-tight text-left flex items-center justify-between transition cursor-pointer border ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                          : outdoorMode
                            ? 'bg-white text-black border-black hover:bg-stone-100'
                            : 'bg-[#FAF8F5] text-stone-700 border-stone-200/70 hover:border-stone-400'
                      }`}
                    >
                      <span>{sec.stepLabel}</span>
                      <BookOpen className="w-3.5 h-3.5 opacity-60 shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BENTO BOX 3 (KOTAK SEDANG BAWAH): KONTROL TIPOGRAFI ARAB & TERJEMAHAN */}
            <div
              className={`rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                outdoorMode
                  ? 'bg-white border-2 border-black'
                  : 'bg-white border border-stone-200/70 shadow-xs'
              }`}
            >
              <div className="space-y-1">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider block ${
                    outdoorMode ? 'text-black' : 'text-stone-900'
                  }`}
                >
                  Tipografi Naskh &amp; Terjemahan
                </span>
                <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                  Atur ukuran harakat Arab serta tampilan Latin &amp; arti Bahasa Indonesia
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Font Size Pill Selector */}
                <div
                  className={`flex items-center p-1 rounded-full border ${
                    outdoorMode ? 'bg-stone-100 border-black' : 'bg-[#FAF8F5] border-stone-200/80'
                  }`}
                >
                  {(['A', 'A+', 'A++'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                        fontSize === size
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Latin Toggle Pill */}
                <button
                  type="button"
                  onClick={() => setShowLatin(!showLatin)}
                  aria-pressed={showLatin}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer border ${
                    showLatin
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400'
                  }`}
                >
                  {showLatin ? '✓ Latin' : 'Latin'}
                </button>

                {/* Translation Toggle Pill */}
                <button
                  type="button"
                  onClick={() => setShowTerjemahan(!showTerjemahan)}
                  aria-pressed={showTerjemahan}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer border ${
                    showTerjemahan
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400'
                  }`}
                >
                  {showTerjemahan ? '✓ Terjemahan' : 'Terjemahan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. NASKH MODERN READING CANVAS (Generous Line Height leading-[2.8])
            ===================================================================== */}
        <div className="space-y-6">
          {displayedSections.map((section) => {
            const isCopied = copiedId === section.id;
            return (
              <article
                key={section.id}
                className={`rounded-3xl p-6 sm:p-10 transition ${
                  outdoorMode
                    ? 'bg-white border-2 border-black shadow-none'
                    : 'bg-white border border-stone-200/70 shadow-xs'
                }`}
              >
                {/* Section Header */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-8 border-b ${
                    outdoorMode ? 'border-black' : 'border-stone-200/70'
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        outdoorMode ? 'bg-black text-white' : 'bg-emerald-950/5 text-emerald-800'
                      }`}
                    >
                      {section.stepLabel}
                    </span>
                    <h2
                      className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${
                        outdoorMode ? 'text-black' : 'text-stone-900'
                      }`}
                    >
                      {section.title}
                    </h2>
                    <p className={`text-xs ${outdoorMode ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                      {section.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const fullText = `${section.title}\n\n${section.arabicLines.join('\n')}\n\nLatin:\n${section.latinText}\n\nArtinya:\n${section.translationText}`;
                      navigator.clipboard?.writeText(fullText);
                      setCopiedId(section.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className={`self-start sm:self-auto px-3.5 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer border ${
                      outdoorMode
                        ? 'bg-white text-black border-black hover:bg-stone-100'
                        : 'bg-[#FAF8F5] text-stone-700 border-stone-200/80 hover:border-stone-400'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span className="text-emerald-700 font-semibold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                        <span>Salin Bacaan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Arabic Naskh Text with Generous Line Spacing */}
                <div className="space-y-8">
                  <div className="text-center" dir="rtl">
                    <div
                      className={`font-arabic leading-[2.8] space-y-4 ${getArabicFontSizeClass()} ${
                        outdoorMode ? 'text-black font-bold' : 'text-stone-900'
                      }`}
                    >
                      {section.arabicLines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>

                  {/* Transliterasi Latin */}
                  {showLatin && (
                    <div
                      className={`p-5 sm:p-7 rounded-2xl text-center border ${
                        outdoorMode
                          ? 'bg-stone-50 border-black text-black font-semibold'
                          : 'bg-[#FAF8F5] border-stone-200/70 text-stone-700'
                      }`}
                    >
                      <p className="italic leading-loose text-sm sm:text-base whitespace-pre-line">
                        &ldquo;{section.latinText}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Terjemahan Bahasa Indonesia */}
                  {showTerjemahan && (
                    <div className="text-center px-2 sm:px-8">
                      <p
                        className={`text-sm sm:text-base leading-relaxed max-w-3xl mx-auto ${
                          outdoorMode ? 'text-black font-medium' : 'text-stone-500'
                        }`}
                      >
                        &ldquo;{section.translationText}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Crawlable SEO Content (SR-Only so visual design remains 100% clean) */}
      <div className="sr-only">
        <h2>Apa Tujuan &amp; Hukum Ziarah Kubur dalam Islam?</h2>
        <p>
          Dalam syariat Islam, hukum ziarah kubur adalah sunnah berdasarkan hadits riwayat Imam Muslim (no. 977). Tujuan
          ziarah kubur adalah mengingatkan diri kepada kematian dan akhirat, mendoakan ampunan bagi ahli kubur, serta
          meneladani perjuangan dakwah para Waliyullah.
        </p>
        <h2>Urutan Bacaan Doa Ziarah Kubur Singkat</h2>
        <ol>
          <li>Berwudhu dan meluruskan niat ziarah kubur karena Allah SWT.</li>
          <li>
            Mengucapkan salam ahli kubur: Assalaamu&apos;alaikum ahlad-diyaari minal mu&apos;miniina wal muslimiin, wa
            innaa insyaa Allaahu bikum laahiquun, nas&apos;alullaaha lanaa wa lakumul &apos;aafiyah.
          </li>
          <li>Membaca Istighfar 3x dan Tawassul Al-Fatihah kepada Rasulullah SAW, para Waliyullah, dan ahli kubur.</li>
          <li>Membaca Surah Yasin, Al-Ikhlas (3x), Al-Falaq, An-Nas, dan Ayat Kursi.</li>
          <li>Membaca kalimat thayyibah Tahlil (Laa ilaaha illallaah) dan tasbih.</li>
          <li>Membaca doa khusus ziarah kubur (doa arwah) memohon ampunan dan rahmat Allah SWT.</li>
        </ol>
        <ul>
          <li><Link to="/situs/sunan-gresik">Makam Sunan Gresik</Link></li>
          <li><Link to="/situs/sunan-ampel-surabaya">Makam Sunan Ampel Surabaya</Link></li>
          <li><Link to="/situs/sunan-bonang-tuban">Makam Sunan Bonang Tuban</Link></li>
          <li><Link to="/situs/sunan-drajat-lamongan">Makam Sunan Drajat Lamongan</Link></li>
          <li><Link to="/situs/sunan-kudus">Makam Sunan Kudus</Link></li>
          <li><Link to="/situs/sunan-giri-gresik">Makam Sunan Giri Gresik</Link></li>
          <li><Link to="/situs/sunan-kalijaga-demak">Makam Sunan Kalijaga Demak</Link></li>
          <li><Link to="/situs/sunan-muria-kudus">Makam Sunan Muria Kudus</Link></li>
          <li><Link to="/situs/sunan-gunung-jati-cirebon">Makam Sunan Gunung Jati Cirebon</Link></li>
        </ul>
      </div>
    </section>
  );
};
