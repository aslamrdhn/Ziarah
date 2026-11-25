export interface PrayerSectionData {
  id: 'SALAM' | 'TAWASSUL' | 'YASIN' | 'TAHLIL' | 'DOA';
  stepLabel: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  arabicLines: string[];
  latinText: string;
  translationText: string;
}

export const PRAYER_SECTIONS: PrayerSectionData[] = [
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
