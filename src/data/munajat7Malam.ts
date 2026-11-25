export type MunajatEmotionTag =
  | 'hati_gelisah'
  | 'ikhtiar_rezeki'
  | 'keluarga'
  | 'keteguhan';

export interface MunajatNightItem {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  emotionTag: MunajatEmotionTag;
  arabic: string;
  latin: string;
  translation: string;
  sourceRef: string;
  reflection: string;
  relatedSiteId: string;
  relatedUlamaName: string;
  relatedWisdomTitle: string;
  actionStep: string;
}

export const MUNAJAT_EMOTION_LABELS: Record<
  MunajatEmotionTag,
  { label: string; subtitle: string }
> = {
  hati_gelisah: {
    label: 'Hati Gelisah & Lelah Batin',
    subtitle: 'Menata kembali napas batin dengan istighfar, tasbih, dan tawakal.'
  },
  ikhtiar_rezeki: {
    label: 'Ikhtiar Rezeki Halal & Amanah',
    subtitle: 'Menguatkan etos kerja jujur, kemandirian, dan kecukupan yang berkah.'
  },
  keluarga: {
    label: 'Keteduhan Keluarga & Keturunan',
    subtitle: 'Merawat kesabaran rumah tangga dan saling menuntun dalam kebaikan.'
  },
  keteguhan: {
    label: 'Keteguhan & Kepedulian Sesama',
    subtitle: 'Menjaga istiqamah adab, kesabaran menghadapi ujian, dan empati sosial.'
  }
};

export const MUNAJAT_7_MALAM: readonly MunajatNightItem[] = [
  {
    day: 1,
    title: 'Malam 1 — Melepas Lelah & Istighfar',
    emotionTag: 'hati_gelisah',
    arabic:
      'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ أَسْتَغْفِرُ اللهَ الْعَظِيمَ',
    latin:
      "Fa inna ma'al-'usri yusra. Inna ma'al-'usri yusra. Astaghfirullahal-'azhim (33x).",
    translation:
      'Maka sesungguhnya beserta kesulitan ada kemudahan. Sesungguhnya beserta kesulitan itu ada kemudahan. Aku memohon ampun kepada Allah Yang Maha Agung.',
    sourceRef: 'QS. Al-Insyirah: 5–6 & Istighfar (33x)',
    reflection:
      'Sunan Bonang mewariskan suluk Tombo Ati sebagai pengingat bahwa kegelisahan sering berakar dari hati yang kelelahan memikul beban sendirian. Membaca kalam Allah dengan perlahan, menjaga shalat malam, berkumpul dengan orang saleh, dan memperbanyak istighfar di keheningan malam membantu melepaskan ketegangan batin secara jujur di hadapan Allah SWT. Kemudahan tidak selalu berarti beban langsung hilang malam ini, melainkan hati yang diberi ruang lapang untuk kembali bernapas dan berpikir jernih.',
    relatedSiteId: 'sunan-bonang',
    relatedUlamaName: 'Sunan Bonang (Raden Makhdum Ibrahim)',
    relatedWisdomTitle: 'Hikmah Suluk Tombo Ati (Lima Penawar Hati)',
    actionStep:
      'Esok pagi, luangkan waktu 10 menit sebelum memegang gawai untuk membaca Al-Qur’an beserta terjemahannya satu halaman dengan tenang.'
  },
  {
    day: 2,
    title: 'Malam 2 — Ketenangan Saat Terhimpit',
    emotionTag: 'hati_gelisah',
    arabic:
      'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    latin:
      'La ilaha illa Anta subhanaka inni kuntu minazh-zhalimin.',
    translation:
      'Tidak ada Tuhan selain Engkau, Mahasuci Engkau. Sungguh, aku termasuk orang-orang yang zalim.',
    sourceRef: 'QS. Al-Anbiya: 87 (Doa Nabi Yunus AS)',
    reflection:
      'Dalam riwayat keteladanan Syaichona Muhammad Kholil Bangkalan, ketika seorang kerabat mengadukan himpitan hidup yang berat, beliau menasihatkan agar tidak meninggalkan dzikir dan shalawat di tengah kesempitan. Doa Nabi Yunus AS mengajarkan kita mengakui keterbatasan diri tanpa menyalahkan keadaan secara berlebihan. Pengakuan yang tulus di hadapan Allah SWT membuka pintu ketenangan batin agar kita tidak mengambil keputusan secara tergesa-gesa saat sedang tertekan.',
    relatedSiteId: 'syaichona-kholil-bangkalan',
    relatedUlamaName: 'Syaichona Muhammad Kholil Bangkalan',
    relatedWisdomTitle: 'Nasihat Menjaga Dzikir & Shalawat di Tengah Kesempitan',
    actionStep:
      'Catat satu persoalan paling mendesak yang sedang Anda hadapi di atas kertas, lalu pilah mana bagian yang bisa Anda ikhtiarkan esok hari dan mana yang harus diserahkan kepada Allah SWT.'
  },
  {
    day: 3,
    title: 'Malam 3 — Kesabaran & Kelapangan Hati',
    emotionTag: 'keteguhan',
    arabic:
      'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا',
    latin:
      'Rabbana afrigh ‘alaina shabran wa tsabbit aqdamana.',
    translation:
      'Ya Tuhan kami, limpahkanlah kesabaran kepada kami dan kokohkanlah langkah-langkah kami.',
    sourceRef: 'QS. Al-Baqarah: 250',
    reflection:
      'K.H. Abdul Hamid Pasuruan dikenal dengan kelembutan akhlak, ketabahan menafkahi keluarga, serta kesabaran membalas sikap keras orang lain dengan doa dan kebaikan. Kesabaran dalam tradisi ulama bukanlah sikap pasif menerima nasib, melainkan keteguhan menjaga pijakan moral agar tidak goyah saat diuji. Ketika hati dilimpahi kesabaran, langkah kaki kita dalam bekerja dan berbuat baik menjadi lebih terarah dan tidak mudah patah oleh omongan sekitar.',
    relatedSiteId: 'kh-abdul-hamid-pasuruan',
    relatedUlamaName: 'K.H. Abdul Hamid Pasuruan',
    relatedWisdomTitle: 'Ketabahan Menafkahi Keluarga & Membalas Keburukan dengan Kebaikan',
    actionStep:
      'Tahan diri dari mengeluh atau membalas ucapan yang kurang menyenangkan esok hari; ganti dengan senyum, diam yang terhormat, dan fokus menyelesaikan tanggung jawab utama Anda.'
  },
  {
    day: 4,
    title: 'Malam 4 — Ikhtiar Rezeki Halal & Berkah',
    emotionTag: 'ikhtiar_rezeki',
    arabic:
      'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    latin:
      'Allahummakfini bihalalika ‘an haramika wa aghnini bifadhlika ‘amman siwak.',
    translation:
      'Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal hingga aku terhindar dari yang haram, dan kayakanlah aku dengan karunia-Mu hingga aku tidak bergantung kepada selain-Mu.',
    sourceRef: 'HR. Tirmidzi no. 3563',
    reflection:
      'Sunan Kudus menanamkan falsafah Gusjigang—bagus akhlaknya, tekun mengaji ilmu, dan cakap berdagang secara jujur. Doa yang diajarkan Rasulullah SAW ini memohon kecukupan yang halal dan kemandirian martabat, bukan janji jalan pintas tanpa kerja keras. Keberkahan rezeki tumbuh ketika doa malam dipadukan dengan kejujuran timbangan, ketepatan janji, dan kedisiplinan dalam merawat mata pencaharian sehari-hari.',
    relatedSiteId: 'sunan-kudus',
    relatedUlamaName: 'Sunan Kudus (Sayyid Ja’far Shadiq)',
    relatedWisdomTitle: 'Etos Gusjigang: Akhlak Mulia, Ilmu, dan Kemandirian Niaga',
    actionStep:
      'Periksa kembali catatan keuangan atau pekerjaan Anda esok hari: rapikan satu kewajiban, tagihan, atau janji kerja secara jujur dan tepat waktu.'
  },
  {
    day: 5,
    title: 'Malam 5 — Keteduhan Keluarga & Keturunan',
    emotionTag: 'keluarga',
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    latin:
      'Rabbana hablana min azwajina wa dzurriyyatina qurrata a’yunin waj’alna lil-muttaqina imama.',
    translation:
      'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
    sourceRef: 'QS. Al-Furqan: 74',
    reflection:
      'Sunan Muria mendakwahkan nilai keteduhan rumah tangga melalui tembang Kinanthi, yang bermakna saling menggandeng dan menuntun dengan penuh kasih sayang. Rumah yang menyejukkan mata tidak terbangun dalam semalam, melainkan dirawat lewat keteladanan adab, kesediaan mendengar, dan doa orang tua yang tak putus bagi anak-keturunannya. Memohon keluarga yang menjadi penyejuk mata juga berarti memulai keteladanan takwa dari diri kita sendiri.',
    relatedSiteId: 'sunan-muria',
    relatedUlamaName: 'Sunan Muria (Raden Umar Said)',
    relatedWisdomTitle: 'Falsafah Kinanthi: Saling Menuntun dalam Kebaikan Rumah Tangga',
    actionStep:
      'Sampaikan satu kalimat apresiasi atau doa kebaikan secara langsung kepada pasangan, orang tua, atau anak Anda esok hari tanpa disertai tuntutan.'
  },
  {
    day: 6,
    title: 'Malam 6 — Amanah & Kepedulian Sesama',
    emotionTag: 'keteguhan',
    arabic:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin:
      'Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina ‘adzaban-nar.',
    translation:
      'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    sourceRef: 'QS. Al-Baqarah: 201',
    reflection:
      'Sunan Gunung Jati meninggalkan wasiat luhur yang terus dikenang di Cirebon: "Ingsun titip tajug lan fakir miskin"—aku titipkan tempat ibadah (pendidikan ilmu) dan kepedulian kepada kaum lemah. Kebaikan dunia dan akhirat dalam doa sapu jagat tidak berhenti pada keselamatan pribadi, tetapi meluas menjadi kebermanfaatan bagi sesama. Hati yang gemar meringankan beban orang lain akan selalu dilapangkan jalannya oleh Allah SWT.',
    relatedSiteId: 'sunan-gunung-jati',
    relatedUlamaName: 'Sunan Gunung Jati (Syarif Hidayatullah)',
    relatedWisdomTitle: 'Wasiat "Ingsun Titip Tajug lan Fakir Miskin"',
    actionStep:
      'Sisihkan sedekah semampunya esok pagi—baik berupa makanan, bantuan tenaga, maupun infaq pendidikan—kepada tetangga atau mereka yang membutuhkan di sekitar Anda.'
  },
  {
    day: 7,
    title: 'Malam 7 — Tawakal & Melangkah Kembali',
    emotionTag: 'hati_gelisah',
    arabic:
      'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ',
    latin:
      'Hasbunallahu wa ni’mal-wakil.',
    translation:
      'Cukuplah Allah (menjadi penolong) bagi kami dan Dia sebaik-baik pelindung.',
    sourceRef: 'QS. Ali Imran: 173',
    reflection:
      'Hadratussyaikh K.H. Hasyim Asy’ari melalui kitab Adabul ‘Alim wal Muta’allim mengajarkan bahwa puncak dari ilmu dan amal adalah adab, keikhlasan, serta tawakal yang kokoh kepada Allah SWT. Setelah enam malam mengurai lelah, memohon ampun, dan menata niat, malam ketujuh adalah saatnya mengikat kembali tekad untuk melangkah dengan tenang. Bertawakal berarti menyerahkan hasil akhir sepenuhnya kepada Allah SWT sembari tetap menjalankan ikhtiar lahir secara disiplin dan terhormat.',
    relatedSiteId: 'kh-hasyim-asyari-tebuireng',
    relatedUlamaName: 'Hadratussyaikh K.H. Hasyim Asy’ari',
    relatedWisdomTitle: 'Keteguhan Adab, Keikhlasan Ilmu, dan Istiqamah Perjuangan',
    actionStep:
      'Susun tiga langkah kerja atau kebaikan yang realistis untuk sepekan ke depan, awali dengan Basmalah, dan jalankan dengan hati yang tenang.'
  }
];
