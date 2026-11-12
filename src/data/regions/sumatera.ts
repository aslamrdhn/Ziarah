import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Pulau Sumatera (Tahap 5 — 10 Provinsi):
 * Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau,
 * Jambi, Sumatera Selatan, Kepulauan Bangka Belitung, Bengkulu, dan Lampung.
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const SUMATERA_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. PROVINSI ACEH (SERAMBI MAKKAH)
  // =========================================================================
  {
    id: 'syekh-abdurrauf-as-singkili',
    legacyId: 'ulama-3',
    name: 'Makam Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Teungku Syiah Kuala, Banda Aceh)',
    title: 'Mufti Agung Kesultanan Aceh Darussalam, Pengarang Tafsir Tarjuman Al-Mustafid & Mursyid Utama Thariqah Syattariyah Nusantara',
    description:
      'Kompleks Cagar Budaya Makam Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala, 1615–1693 M) di Gampong Deah Raya, Kecamatan Syiah Kuala, Kota Banda Aceh, Provinsi Aceh—maha guru para wali penyebar Islam ke Sumatera Barat (Syekh Burhanuddin Ulakan) dan Tanah Jawa (Syekh Abdul Muhyi Pamijahan).',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 M (1024–1105 H / 1615–1693 M)',
    province: 'Aceh',
    city: 'Banda Aceh',
    district: 'Kec. Syiah Kuala',
    address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh',
    location: {
      lat: 5.5956,
      lng: 95.3318,
      address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh',
      district: 'Kec. Syiah Kuala',
      city: 'Banda Aceh',
      province: 'Aceh',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Kesultanan Aceh Darussalam (Banda Aceh)',
    sanad:
      'Syekh Abdurrauf bin Ali Al-Jawi Al-Fansuri As-Singkili; bermukim 19 tahun di Haramain dan Yaman (1642–1661 M) berguru langsung kepada Syaikh Ahmad Al-Qusyasyi dan Syaikh Ibrahim Al-Kurani di Madinah; guru utama dari Syekh Burhanuddin Ulakan (Minangkabau), Syekh Abdul Muhyi Pamijahan (Jawa Barat), dan Syekh Abdul Malik (Tok Pulau Manis, Terengganu).',
    karya: [
      'Tafsir Tarjuman Al-Mustafid (Tafsir Al-Qur’an 30 juz lengkap pertama dalam bahasa Melayu Jawi di Asia Tenggara)',
      'Kitab Mir’atuth Thullab fi Tasyil Ma’rifat Ahkam Asy-Syar’iyyah lil Malikil Wahhab (kanun hukum perdata, pidana, dan ketatanegaraan Kesultanan Aceh atas titah Sultanah Safiatuddin)',
      'Kitab Tanbihul Masyi, ’Umdatul Muhtajin, Kifayatul Muhtajin, dan Syarh Lathaif Al-Asrar (rujukan utama tasawuf neo-sufisme & Thariqah Syattariyah)',
    ],
    history:
      '**Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili**—yang sangat dimuliakan oleh masyarakat Aceh dengan gelar **Teungku Syiah Kuala** (*Syaikh Ulama di Kuala / Muara Krueng Aceh*, lahir di Singkil sekitar tahun **1024 H / 1615 M** dan wafat di Banda Aceh pada **1105 H / 1693 M**)—adalah poros intelektual Islam Nusantara abad ke-17 M. Setelah menimba ilmu dasar kepada ayahandanya Syaikh Ali di dayah Simpang Kanan (Singkil) dan di ibu kota Banda Aceh, beliau berangkat ke Timur Tengah pada tahun **1642 M** dan bermukim selama **19 tahun** di Doha, Yaman (Zabid dan Mukha), Makkah, serta Madinah. Di Madinah Al-Munawwarah, beliau menjadi murid utama sekaligus khalifah mursyid **Syaikh Ahmad Al-Qusyasyi** (wafat 1660 M) dan sahabat dekat ulama besar **Syaikh Ibrahim Al-Kurani**.\n\nSekembalinya ke Aceh sekitar tahun **1661 M**, Syekh Abdurrauf As-Singkili diangkat sebagai **Qadhi Malikul Adil** (Mufti Agung Kesultanan Aceh Darussalam) mendampingi empat ratu (*Sultanah*) berturut-turut: **Sultanah Tajul Alam Safiatuddin Syah** (1641–1675 M), **Sultanah Nurul Alam Naqiyatuddin Syah**, **Sultanah Inayat Zakiatuddin Syah**, dan **Sultanah Kamalat Zainatuddin Syah**. Dengan kebijaksanaan ilmu yang tinggi, beliau berhasil mendamaikan ketegangan teologis pasca-polemik *Wujudiyyah* di Aceh melalui sintesis *Neo-Sufisme* yang mengharmoniskan ketatnya syariat fikih Syafi’iyah dengan kedalaman hakikat tasawuf **Thariqah Syattariyah**.\n\nDi muara Sungai Aceh (*Kuala*), Syekh Abdurrauf mendirikan dayah besar yang melahirkan murid-murid penyebar Islam ke seluruh Nusantara, di antaranya **Syekh Burhanuddin Ulakan** (Sumatera Barat), **Syekh Abdul Muhyi Pamijahan** (Tasikmalaya, Jawa Barat), dan **Syekh Dawud Al-Jawi Al-Fansuri**. Beliau juga menulis **Tafsir Tarjuman Al-Mustafid**—tafsir Al-Qur’an 30 juz lengkap berbahasa Melayu pertama di Nusantara—serta kitab hukum **Mir’atuth Thullab**. Beliau wafat pada tahun **1693 M** dalam usia sekitar 78 tahun dan dimakamkan di tepi pantai **Gampong Deah Raya, Kecamatan Syiah Kuala, Kota Banda Aceh**; nama besar beliau diabadikan menjadi nama perguruan tinggi negeri terbesar di Aceh, **Universitas Syiah Kuala (USK)**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Aceh dan kesaksian dunia saat bencana gempa dan **Tsunami Samudra Hindia 26 Desember 2004**, meskipun lokasi Kompleks Makam Teungku Syiah Kuala berada tepat di bibir pantai Gampong Deah Raya (hanya berjarak beberapa puluh meter dari laut lepas) dan seluruh bangunan di sekelilingnya rata tersapu gelombang raksasa setinggi puluhan meter, struktur pusara utama Syekh Abdurrauf As-Singkili tetap utuh bertahan.<!--more-->\n\nDi Kompleks Makam Syiah Kuala juga tumbuh pohon-pohon kurma dan sumber sumur air tawar di dekat bibir pantai asin yang sejak berabad-abad lalu menjadi tempat berwudhu dan mengambil berkah doa bagi para peziarah dari seluruh penjuru Nusantara dan Malaysia.',
    ],
    untoldStory:
      'Kajian filologi Prof. Azyumardi Azra (*Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII & XVIII*) dan Prof. Peter Riddell membuktikan bahwa ketika ulama-ulama Nusantara meminta fatwa ke Madinah mengenai persoalan tasawuf *Wahdatul Wujud*, Syaikh Ibrahim Al-Kurani menulis kitab khusus berjudul **Ithaf Az-Dzaki** yang ditujukan langsung untuk mendukung otoritas keilmuan sahabatnya, Syekh Abdurrauf As-Singkili di Aceh.<!--more-->\n\nSelain itu, melalui kitab *Mir’atuth Thullab* yang ditulis atas permintaan Ratu Sultanah Safiatuddin, Syekh Abdurrauf menegaskan legitimasi kepemimpinan perempuan yang adil dalam tata negara Islam Aceh abad ke-17.',
    barokahHajat:
      'Peziarah, akademisi, mahasiswa, dan pengamal Thariqah Syattariyah yang berziarah ke maqbarah Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala) di Banda Aceh umumnya bertawassul memohon kepada Allah SWT keluasan ilmu tafsir Al-Qur’an dan syariat, kebijaksanaan dalam mendamaikan umat, serta keselamatan dari bencana.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala Banda Aceh)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الشَّيْخِ عَبْدِ الرَّؤُوفِ بْنِ عَلِيٍّ الْفَنْصُورِيِّ السِّنْكِيلِيِّ (تُونْغكُو شِيَاحْ كُوَالَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ بِفَهْمِ الْقُرْآنِ وَالسُّنَّةِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الشَّيْخِ عَبْدِ الرَّؤُوفِ بْنِ عَلِيٍّ الْفَنْصُورِيِّ السِّنْكِيلِيِّ (تُونْغكُو شِيَاحْ كُوَالَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ بِفَهْمِ الْقُرْآنِ وَالسُّنَّةِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimir-Rabbaaniyyi wal-'Aarifish-Shamadaaniyyi asy-Syaikh 'Abdir-Ra'uuf bin 'Alii al-Fanshuurii as-Singkiilii (Teungku Syiah Kuala) syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu waftah 'alainaa futuuhal-'aarifiina bi fahmil-Qur-aani was-Sunnati wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan arif billah Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Teungku Syiah Kuala), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, bukakanlah bagi kami pintu makrifat para arifin dalam memahami Al-Qur’an dan Sunnah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan arif billah Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Teungku Syiah Kuala), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, bukakanlah bagi kami pintu makrifat para arifin dalam memahami Al-Qur’an dan Sunnah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Syawal / Rayeuk Syawal (Tradisi Ziarah Syawalan & Kenduri Haul Akbar Teungku Syiah Kuala di Gampong Deah Raya, Kecamatan Syiah Kuala, Kota Banda Aceh; jadwal kenduri tahunan dikoordinasikan oleh penjaga makam dan Pemko Banda Aceh).',
    localAdab:
      'Wajib mematuhi Qanun Syariat Islam Provinsi Aceh dengan mengenakan busana muslim/muslimah yang menutup aurat secara sempurna, melepas alas kaki saat memasuki cungkup makam Teungku Syiah Kuala, menjaga pemisahan saf laki-laki dan perempuan, serta menjaga kebersihan kawasan pantai Deah Raya.',
    facilities: ['Cungkup Utama Maqbarah Teungku Syiah Kuala', 'Masjid & Musholla Kompleks Makam Syiah Kuala', 'Sumur Tua & Balee Seumike (Balai Pengajian)', 'Area Parkir Bus Wisata Religi Deah Raya Banda Aceh'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB (Tutup sementara saat waktu Shalat Jumat)',
    references: [
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII dan XVIII. Jakarta: Kencana.',
      'Riddell, Peter G. (2001). Islam and the Malay-Indonesian World: Transmission and Responses (Bab Abdurrauf al-Singkili and Tarjuman al-Mustafid). London: Hurst & Co.',
      'Daudy, Ahmad (1983). Allah dan Manusia dalam Konsepsi Syeikh Nuruddin ar-Raniry & Syeikh Abdurrauf as-Singkili. Jakarta: Rajawali.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-hamzah-fansuri',
    legacyId: 'ulama-24',
    name: 'Makam Syekh Hamzah Al-Fansuri (Oboh, Rundeng, Subulussalam)',
    title: 'Bapak Sastra Melayu Islam, Pelopor Puisi Syair Sufi Nusantara & Ulama Agung Zaman Sultan Alauddin Riayat Syah',
    description:
      'Kompleks Cagar Budaya Makam Syekh Hamzah Al-Fansuri (wafat akhir abad ke-16 / awal abad ke-17 M) di Kampong Oboh, Kecamatan Rundeng, Kota Subulussalam (kawasan hulu Sungai Singkil / Fansur), Provinsi Aceh.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-16 – Awal Abad ke-17 M (Wafat ~1590 / 1607 M)',
    province: 'Aceh',
    city: 'Subulussalam',
    district: 'Kec. Rundeng',
    address: 'Desa/Kampong Oboh, Kec. Rundeng, Kota Subulussalam',
    location: {
      lat: 2.6612,
      lng: 97.9218,
      address: 'Desa/Kampong Oboh, Kec. Rundeng, Kota Subulussalam',
      district: 'Kec. Rundeng',
      city: 'Subulussalam',
      province: 'Aceh',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Sufi & Sastra Melayu Aceh (Situs Makam Syekh Hamzah Fansuri di Oboh Rundeng Subulussalam)',
    sanad:
      'Syekh Hamzah bin Abdullah Al-Fansuri; mengembara menuntut ilmu tasawuf ke Makkah, Madinah, Baghdad (mengambil baiat Thariqah Qadiriyah), Kudus/Pahang, dan Ayutthaya (Siam); guru ruhani dari Syekh Syamsuddin As-Sumatrani dan Sultan Alauddin Riayat Syah Sayyidil Mukammil.',
    karya: [
      'Risalah tasawuf prosa Melayu: Asrarul ’Arifin fi Bayan ’Ilm As-Suluk wat-Tauhid, Syarabul ’Asyiqin, dan Al-Muntahi',
      'Kumpulan Syair Sufi Melayu: Syair Perahu, Syair Burung Pingai, Syair Dagang, dan Syair Sidang Fakir (tonggak kelahiran bentuk puisi Syair empat baris bersajak a-a-a-a dalam sastra Melayu-Indonesia)',
    ],
    history:
      '**Syekh Hamzah Al-Fansuri** (hidup pada paruh kedua abad ke-16 hingga awal abad ke-17 M) adalah ulama sufi legendaris, poliglot yang menguasai bahasa Arab, Persia, dan Melayu, sekaligus **Bapak Sastra Melayu Islam Nusantara**. Nama nisbah *Al-Fansuri* merujuk pada kawasan **Fansur (Barus–Singkil–Subulussalam)** di pesisir barat-selatan Aceh dan Sumatera Utara yang sejak berabad-abad terkenal sebagai bandar kapur barus dunia. Dalam bait syairnya yang terkenal (*"Hamzah nin asalnya Fansuri / Mendapat wujud di tanah Syahrnawi / Beroleh khilafat ilmu yang ’ali / Daripada ’Abdul Qadir Jilani"*), beliau mengisahkan pengembaraan ruhaninya menuntut ilmu hingga ke Makkah, Madinah, Yerusalem, Baghdad (tempat beliau mengambil ijazah *Thariqah Qadiriyah*), hingga Syahrnawi (Ayutthaya di Siam).\n\nSekembalinya ke Kesultanan Aceh Darussalam pada masa pemerintahan **Sultan Alauddin Riayat Syah Sayyidil Mukammil** (1589–1604 M) dan awal masa **Sultan Iskandar Muda**, Syekh Hamzah Fansuri memimpin dayah pendidikan tasawuf di wilayah hulu Sungai Singkil (kawasan Rundeng / Singkil). Beliau menciptakan revolusi bahasa dan sastra di Asia Tenggara dengan mengangkat bahasa Melayu menjadi bahasa ilmu filsafat dan metafisika Islam tingkat tinggi melalui risalah **Syarabul ’Asyiqin** (*Minuman Para Pecinta Tuhan*), **Asrarul ’Arifin** (*Rahasia Para Ahli Makrifat*), dan **Al-Muntahi**, serta memperkenalkan bentuk puisi **Syair Melayu** bersajak *a-a-a-a* seperti **Syair Perahu** dan **Syair Burung Pingai**.\n\nBerdasarkan kajian epigrafi Prof. Claude Guillot dan Ludvik Kalus terhadap inskripsi nisan di Makkah (yang menyebut wafatnya beliau pada 1527 M menurut satu hipotesis baru) maupun tradisi sejarah Kesultanan Aceh dan kajian Prof. Syed Muhammad Naquib al-Attas serta Prof. A. Hasjmy (yang mencatat kiprah beliau hingga akhir abad ke-16 M), situs maqbarah beliau yang dihormati secara turun-temurun oleh masyarakat Aceh Singkil dan Subulussalam terletak di **Kampong Oboh, Kecamatan Rundeng, Kota Subulussalam**, di tepi aliran Sungai Lae Soraya (Hulu Sungai Singkil).',
    karomah: [
      'Dalam tradisi lisan masyarakat Singkil–Subulussalam dan kajian sastra sufi Nusantara, karomah abadi Syekh Hamzah Fansuri terpancar dari bait-bait **Syair Perahu** gubahan beliau (*"Wahai muda kenali dirimu / Inilah perahu tamsil tubuhmu / Tiadalah berapa lama hidupmu / Ke akhirat jua kekal diammu"*) yang selama lebih dari 400 tahun terus dilantunkan oleh para pelaut, santri dayah, dan masyarakat Melayu dari Aceh hingga kepulauan Maluku sebagai pengingat perjalanan ruhani menuju Allah SWT.<!--more-->\n\nDi Kompleks Makam Kampong Oboh, Kecamatan Rundeng, Kota Subulussalam, pusara Syekh Hamzah Fansuri yang dinaungi cungkup megah di tepi Sungai Lae Soraya senantiasa terjaga keasriannya dan menjadi pusat ziarah tahunan masyarakat pantai barat-selatan Aceh.',
    ],
    untoldStory:
      'Kajian filologi monumental Prof. Syed Muhammad Naquib al-Attas (*The Mysticism of Hamzah Fansuri*, 1970) dan Prof. Abdul Hadi W.M. (*Tasawuf Yang Tertindas*) menunjukkan bahwa ajaran tasawuf *Wujudiyyah* Syekh Hamzah Fansuri berakar kuat pada tradisi metafisika Ibnu ’Arabi dan ’Abdul Karim Al-Jili yang menegaskan kemurnian tauhid (*Laa maujuda illallah* dalam maqam *fana’*), bukan panteisme dangkal sebagaimana dituduhkan oleh lawan-lawan politiknya beberapa dekade setelah beliau wafat.<!--more-->\n\nDi sekitar lokasi makam beliau di Kecamatan Rundeng, Kota Subulussalam, juga terdapat makam murid-murid dan ulama kuno jaringan Singkil–Fansur yang dulu menghubungkan jalur sungai pedalaman dengan pelabuhan samudra.',
    barokahHajat:
      'Peziarah, sastrawan, peneliti filologi, dan penempuh jalan ruhani yang berziarah ke maqbarah Syekh Hamzah Fansuri di Rundeng Subulussalam umumnya bertawassul memohon kepada Allah SWT kejernihan pengenalan diri dan Tuhan (*Man ’arafa nafsah faqad ’arafa Rabbah*), keindahan hikmah dalam berkarya sastra dan dakwah, serta keselamatan berlayar mengarungi kehidupan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Hamzah Al-Fansuri (Rundeng Subulussalam Aceh)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَأَبِي الْأَدَبِ الْإِسْلَامِيِّ الشَّيْخِ حَمْزَةَ الْفَنْصُورِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَارْزُقْنَا مَعْرِفَتَكَ وَمَحَبَّتَكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَأَبِي الْأَدَبِ الْإِسْلَامِيِّ الشَّيْخِ حَمْزَةَ الْفَنْصُورِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَارْزُقْنَا مَعْرِفَتَكَ وَمَحَبَّتَكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aarifi billaah wa Abil-Adabil-Islaamii asy-Syaikh Hamzah al-Fanshuurii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu warzuqnaa ma'rifataka wa mahabbataka wanfa'naa bi asraarihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah dan bapak sastra Islam Syekh Hamzah Al-Fansuri, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, karuniakanlah kepada kami makrifat dan cinta kepada-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah dan bapak sastra Islam Syekh Hamzah Al-Fansuri, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, karuniakanlah kepada kami makrifat dan cinta kepada-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Jadwal Haul dan Ziarah Akbar Syekh Hamzah Fansuri dilaksanakan secara berkala di Kampong Oboh, Kecamatan Rundeng, Kota Subulussalam (terutama menjelang bulan suci Ramadhan, Syawal, dan peringatan hari jadi Kota Subulussalam; konfirmasi jadwal tahunan kepada Dinas Pendidikan Dayah / Majelis Adat Aceh Kota Subulussalam).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang menutup aurat sesuai Syariat Islam di Aceh, melepas alas kaki saat memasuki cungkup makam Syekh Hamzah Fansuri di Kampong Oboh, serta menjaga ketenangan dan kesucian situs cagar budaya.',
    facilities: ['Cungkup Utama Makam Syekh Hamzah Fansuri', 'Musholla & Balai Ziarah Kampong Oboh', 'Tepian Sungai Lae Soraya Rundeng', 'Area Parkir Peziarah Rundeng Subulussalam'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Al-Attas, Syed Muhammad Naquib (1970). The Mysticism of Hamzah Fansuri. Kuala Lumpur: University of Malaya Press.',
      'Drewes, G.W.J. & Brakel, L.F. (1986). The Poems of Hamzah Fansuri. Dordrecht: Foris Publications / KITLV.',
      'Hadi W.M., Abdul (2001). Tasawuf Yang Tertindas: Kajian Hermeneutik Terhadap Karya-Karya Hamzah Fansuri. Jakarta: Paramadina.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-malikussaleh',
    legacyId: 'auliya-25',
    name: 'Makam Sultan Malikussaleh / Meurah Silu (Samudera Pasai, Aceh Utara)',
    title: 'Pendiri Kesultanan Samudera Pasai (1267 M) & Bukti Epigrafi Kerajaan Islam Pertama di Nusantara (Wafat 696 H / 1297 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sultan Al-Malik Ash-Shalih (wafat Ramadhan 696 H / 1297 M) dan putranya Sultan Al-Malik Azh-Zhahir di Desa Beuringen, Kecamatan Samudera, Kabupaten Aceh Utara—mercusuar peradaban Islam awal di Asia Tenggara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-13 M (Memerintah ~1267–1297 M / Wafat Ramadhan 696 H)',
    province: 'Aceh',
    city: 'Aceh Utara',
    district: 'Kec. Samudera',
    address: 'Gampong Beuringen, Kec. Samudera, Kabupaten Aceh Utara',
    location: {
      lat: 5.1418,
      lng: 97.2185,
      address: 'Gampong Beuringen, Kec. Samudera, Kabupaten Aceh Utara',
      district: 'Kec. Samudera',
      city: 'Aceh Utara',
      province: 'Aceh',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Makam_Sultan_Malik_As-Shalih_%28Malikussaleh%29.jpg',
    imageSource: 'Wikimedia Commons — Batu Nisan & Kompleks Makam Sultan Malikussaleh (696 H / 1297 M) di Beuringen, Samudera, Aceh Utara',
    sanad:
      'Meurah Silu (Sultan Al-Malik Ash-Shalih); menerima dakwah Islam dari utusan Syarif Makkah (Syaikh Ismail Ash-Shiddiq) dan sufi India/Timur Tengah (Fakir Muhammad); ayahanda dari Sultan Muhammad Malikul Dhahir dan leluhur jaringan ulama Pasai–Wali Songo Jawa (termasuk Maulana Malik Ibrahim dan Sunan Gunung Jati).',
    karya: [
      'Pendirian Kesultanan Samudera Pasai (1267 M) sebagai kerajaan maritim dan pusat studi fikih Mazhab Syafi’i pertama di Asia Tenggara',
      'Pencetakan mata uang emas murni (Dirham / Deureuham Samudera Pasai) berinskripsi nama sultan dan gelar khalifah Islam',
      'Peletakan tradisi batu nisan berkaligrafi kufi-naskhi dan puisi sufi Khalifah Ali bin Abi Thalib pada nisan tahun 696 H (1297 M)',
    ],
    history:
      '**Sultan Malikussaleh**—yang sebelum memeluk Islam dikenal dalam *Hikayat Raja-Raja Pasai* dan *Sejarah Melayu (Sulalatus Salatin)* dengan gelar **Meurah Silu** (wafat pada bulan **Ramadhan 696 H / Juni–Juli 1297 M**)—adalah pendiri dan raja pertama **Kesultanan Samudera Pasai**, kerajaan Islam pertama yang menjadi fondasi peradaban Islam di kepulauan Nusantara. Setelah menyatukan wilayah pesisir Rimba Jreun dan mendirikan negeri *Samudera* di dekat aliran Krueng Pase (Aceh Utara), Meurah Silu memeluk agama Islam sekitar tahun **1267 M** dengan menyandang gelar **Sultan Al-Malik Ash-Shalih** (*Raja yang Shalih*) dan menikahi Putri Ganggang Sari dari Kerajaan Perlak.\n\nDi bawah pemerintahan Sultan Malikussaleh dan putranya **Sultan Muhammad Malikul Dhahir** (wafat 1326 M), Samudera Pasai tumbuh menjadi bandar niaga internasional yang mencetak mata uang emas sendiri (*Dirham*) serta menjadi pusat kajian fikih **Mazhab Syafi’i** yang dikunjungi oleh pengembara Venesia **Marco Polo** (singgah tahun 1292 M) dan pengembara besar Maroko **Ibnu Battutah** (singgah tahun 1345–1346 M dalam perjalanan ke Tiongkok). Dari kawah candradimuka Samudera Pasai inilah lahir kader-kader ulama yang kelak berdakwah ke Malaka, Patani, hingga tanah Jawa (seperti Syekh Maulana Malik Ibrahim, Syekh Quro Karawang, dan Syarif Hidayatullah Sunan Gunung Jati yang lahir di Pasai).\n\nBukti arkeologis dan epigrafis yang tidak terbantahkan adalah **Batu Nisan Sultan Malikussaleh** di **Gampong Beuringen, Kecamatan Samudera, Kabupaten Aceh Utara**, yang terpahat indah dalam bahasa Arab menyatakan bahwa sang sultan yang bertakwa, penakluk, dan pemurah hati (*Al-Malik Ash-Shalih*) wafat pada **bulan Ramadhan tahun 696 Hijriah (1297 M)**. Di sisi lain batu nisan beliau terpahat untaian puisi sufi yang dinisbatkan kepada Sayyidina Ali bin Abi Thalib RA tentang kefanaan dunia. Tepat di sebelahnya terletak pusara putranya, **Sultan Malikul Dhahir**.',
    karomah: [
      'Dalam naskah klasik *Hikayat Raja-Raja Pasai* dan *Sulalatus Salatin*, dikisahkan bahwa sebelum kedatangan kapal utusan Syarif Makkah (Syaikh Ismail), Meurah Silu bermimpi bertemu dengan **Baginda Rasulullah SAW** yang menuntun beliau mengucapkan dua kalimat syahadat dan meludahi mulut beliau dengan hikmah, sehingga ketika terbangun dari tidurnya pada pagi hari, Meurah Silu langsung fasih membaca Al-Qur’an 30 juz di hadapan Syaikh Ismail meskipun sebelumnya belum pernah belajar huruf Arab.<!--more-->\n\nDi Kompleks Cagar Budaya Nasional Gampong Beuringen juga terdapat **Museum Islam Samudera Pasai** yang menyimpan koleksi dirham emas kuno, manuskrip, dan artefak kejayaan kesultanan Islam pertama di Nusantara.',
    ],
    untoldStory:
      'Inskripsi pada sisi belakang batu nisan Sultan Malikussaleh (1297 M) memuat lima bait syair zuhud berbahasa Arab yang sangat menyentuh hati: *"Sesungguhnya dunia ini fana dan tiada kekal / Sesungguhnya dunia ini ibarat sarang yang ditenun oleh laba-laba... Semua yang ada di dunia ini pasti akan binasa, kecuali amal shalih yang menjadi bekal."*<!--more-->\n\nTradisi ziarah ke Makam Sultan Malikussaleh di Aceh Utara tidak hanya dilakukan oleh masyarakat Indonesia, tetapi juga oleh para peziarah, sejarawan, dan kerabat kesultanan dari Malaysia, Brunei Darussalam, dan Patani (Thailand Selatan) yang memandang Samudera Pasai sebagai ibu peradaban Melayu-Islam.',
    barokahHajat:
      'Peziarah, pemimpin daerah, dan penuntut ilmu sejarah yang berziarah ke maqbarah Sultan Malikussaleh di Samudera Aceh Utara umumnya bertawassul memohon kepada Allah SWT kejayaan dan keadilan kepemimpinan yang berlandaskan iman, keberkahan perniagaan yang jujur, serta kefasihan lisan dan hati dalam mencintai Al-Qur’an.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Al-Malik Ash-Shalih (Malikussaleh Samudera Pasai)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ التَّقِيِّ النَّاصِحِ الْمَلِكِ الصَّالِحِ وَوَلَدِهِ الْمَلِكِ الظَّاهِرِ وَسَلَاطِينِ وَعُلَمَاءِ سَمُودْرَا فَاسَايْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعْلِ كَلِمَةَ الْحَقِّ وَالدِّينِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ التَّقِيِّ النَّاصِحِ الْمَلِكِ الصَّالِحِ وَوَلَدِهِ الْمَلِكِ الظَّاهِرِ وَسَلَاطِينِ وَعُلَمَاءِ سَمُودْرَا فَاسَايْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعْلِ كَلِمَةَ الْحَقِّ وَالدِّينِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanit-Taqiyyin-Naashihil-Malikish-Shaalih wa waladihil-Malikizh-Zhaahir wa Salaathiini wa 'Ulamaa-i Samudera Pasai syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa a'li kalimatal-haqqi wad-diini wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan yang bertakwa lagi pemberi nasihat Al-Malik Ash-Shalih (Malikussaleh), putranya Sultan Al-Malik Azh-Zhahir, beserta para sultan dan ulama Samudera Pasai, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tinggikanlah kalimat kebenaran dan agama-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan yang bertakwa lagi pemberi nasihat Al-Malik Ash-Shalih (Malikussaleh), putranya Sultan Al-Malik Azh-Zhahir, beserta para sultan dan ulama Samudera Pasai, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tinggikanlah kalimat kebenaran dan agama-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Ramadhan & Muharram / Pekan Kebudayaan Samudera Pasai (Peringatan Haul Akbar Sultan Malikussaleh yang wafat pada Ramadhan 696 H di Gampong Beuringen, Kecamatan Samudera, Kabupaten Aceh Utara).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat sesuai Qanun Syariat Islam Aceh, melepas alas kaki saat memasuki cungkup Cagar Budaya Makam Sultan Malikussaleh, serta tidak menyentuh atau menggores pahatan kaligrafi batu nisan abad ke-13 M.',
    facilities: ['Cungkup Cagar Budaya Nasional Makam Sultan Malikussaleh & Sultan Malikul Dhahir', 'Museum Islam Samudera Pasai', 'Masjid & Balee Peziarah Beuringen', 'Area Parkir Luas Wisata Sejarah Samudera Aceh Utara'],
    openingHours: 'Buka Setiap Hari 08.00 – 18.00 WIB',
    references: [
      'Alfian, Teuku Ibrahim (1973). Kronika Pasai: Sebuah Tinjauan Sejarah. Yogyakarta: Gadjah Mada University Press.',
      'Jones, Russell (Ed.) (1999). Hikayat Raja Pasai. Kuala Lumpur: Yayasan Karyawan dan Penerbit Fajar Bakti.',
      'Guillot, Claude & Kalus, Ludvik (2008). Batu Nisan zaman Samudera Pasai. Jakarta: KPG & EFEO.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-iskandar-muda',
    name: 'Makam Sultan Iskandar Muda (Baperis, Peuniti, Baiturrahman, Banda Aceh)',
    title: 'Pahlawan Nasional, Penguasa Puncak Kejayaan Kesultanan Aceh Darussalam (1607–1636 M) & Pembangun Masjid Raya Baiturrahman',
    description:
      'Kompleks Cagar Budaya Makam Sultan Iskandar Muda (1593 – 27 Desember 1636 M) di samping Krueng Daroy dan Museum Aceh, Gampong Peuniti, Kecamatan Baiturrahman, Kota Banda Aceh, Provinsi Aceh.',
    category: 'Auliya Nusantara',
    era: 'Awal Abad ke-17 M (Memerintah 1607–1636 M; Wafat 29 Rajab 1046 H / 27 Desember 1636 M)',
    province: 'Aceh',
    city: 'Banda Aceh',
    district: 'Kec. Baiturrahman',
    address: 'Jl. Sultan Alaidin Mahmudsyah, Gampong Peuniti (Kompleks Baperis / Museum Aceh), Kec. Baiturrahman, Kota Banda Aceh',
    location: {
      lat: 5.5482,
      lng: 95.3208,
      address: 'Jl. Sultan Alaidin Mahmudsyah, Gampong Peuniti (Kompleks Baperis / Museum Aceh), Kec. Baiturrahman, Kota Banda Aceh',
      district: 'Kec. Baiturrahman',
      city: 'Banda Aceh',
      province: 'Aceh',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Aceh (Kompleks Makam Sultan Iskandar Muda di Peuniti Baiturrahman Banda Aceh)',
    sanad:
      'Sultan Iskandar Muda Johan Pahlawan Meukuta Alam (cucu Sultan Alauddin Riayat Syah Sayyidil Mukammil dari jalur ibu Putri Raja Indra Bangsa); berguru ilmu agama dan tasawuf kepada Syaikh Syamsuddin As-Sumatrani (Qadhi Malikul Adil Aceh) dan Syaikh Ibrahim bin Abdullah Asy-Syami.',
    karya: [
      'Kodifikasi hukum adat dan syariat Kesultanan Aceh Adat Meukuta Alam / Adat Makuta Alam (dengan adagium masyhur: Adat bak Poteu Meureuhom, Hukom bak Syiah Kuala)',
      'Pembangunan dan perluasan Masjid Raya Baiturrahman Banda Aceh serta penataan Taman Ghairah / Gunongan dan aliran Krueng Daroy',
      'Kejayaan armada maritim Selat Malaka yang menempatkan Aceh sebagai salah satu dari 5 Kerajaan Islam Terbesar di Dunia abad ke-17',
    ],
    history:
      '**Sultan Iskandar Muda**—yang bergelar **Paduka Seri Sultan Iskandar Muda Johan Pahlawan Meukuta Alam** atau *Po Teuh Meureuhom* (lahir di Bandar Aceh Darussalam sekitar tahun **1593 M** dan wafat pada **29 Rajab 1046 H / 27 Desember 1636 M**; ditetapkan sebagai **Pahlawan Nasional RI** melalui **Keppres No. 077/TK/1993 tanggal 14 September 1993**)—adalah penguasa terbesar yang membawa **Kesultanan Aceh Darussalam** ke puncak kejayaan politik, militer, ekonomi, dan keilmuan Islam di Asia Tenggara. Naik takhta pada usia muda (1607 M), beliau membangun angkatan laut tangguh dengan kapal-kapal perang raksasa (*Cakra Donya*) untuk menjaga kedaulatan Selat Malaka dan melancarkan ekspedisi antikolonial menggempur benteng Portugis di Malaka (1629 M).\n\nDi bidang keagamaan dan intelektual, Sultan Iskandar Muda mengangkat ulama sufi besar **Syekh Syamsuddin As-Sumatrani** (wafat 1630 M) sebagai *Qadhi Malikul Adil* dan penasihat utama istana. Beliau membangun **Masjid Raya Baiturrahman** sebagai pusat universitas Islam (*Jami’ah Baiturrahman*) serta mewariskan konstitusi **Adat Meukuta Alam** yang mengintegrasikan syariat Islam dengan hukum adat Aceh—sebagaimana terpatri dalam *hadih maja* Aceh: *"Adat bak Poteu Meureuhom, Hukom bak Syiah Kuala, Qanun bak Putroe Phang, Reusam bak Laksamana"* (*Adat dari Sultan Iskandar Muda, Hukum Syariat dari Syiah Kuala*).\n\nSultan Iskandar Muda wafat pada tanggal **29 Rajab 1046 H (27 Desember 1636 M)** dalam usia 43 tahun dan dimakamkan di kawasan bekas istana **Dalam Darud Dunya** di tepi aliran sungai buatan **Krueng Daroy**, tepatnya di **Kompleks Baperis (berdampingan dengan Museum Aceh dan Meuligoe Gubernur), Gampong Peuniti, Kecamatan Baiturrahman, Kota Banda Aceh**.',
    karomah: [
      'Dalam kitab *Bustanus Salatin* karya Syaikh Nuruddin Ar-Raniry dan kajian sejarawan Prancis Prof. Denys Lombard (*Le Sultanat d’Atjéh au temps d’Iskandar Muda*), ketegasan keadilan Sultan Iskandar Muda tercatat abadi ketika beliau dengan berat hati tetap menjatuhkan hukuman syariat yang adil terhadap putra mahkotanya sendiri (Meurah Pupok) seraya mengucapkan kalimat masyhur: *"Mati anak ada makamnya, namun jika mati hukum dan adat, ke mana lagi rakyat akan mencari keadilan?"*<!--more-->\n\nUniknya, demi menyelamatkan makam agung Sultan Iskandar Muda dari penghancuran oleh tentara kolonial Belanda saat Perang Aceh (1873–1904), para ulama dan bangsawan Aceh sempat menyamarkan titik pusara beliau selama puluhan tahun hingga akhirnya dibuka kembali secara resmi oleh keturunan kesultanan (**Pocut Meurah**) pada tanggal **19 Desember 1952**.',
    ],
    untoldStory:
      'Lokasi makam Sultan Iskandar Muda di Gampong Peuniti berada dalam satu gugusan cagar budaya inti Kota Banda Aceh yang sangat mudah dijangkau peziarah: tepat bersebelahan dengan **Rumoh Aceh / Museum Aceh** dan **Lonceng Cakra Donya** (hadiah Kaisar Yongle Dinasti Ming melalui Laksamana Cheng Ho tahun 1414 M), serta hanya berjarak sekitar 600 meter di selatan **Masjid Raya Baiturrahman** dan 500 meter dari **Kompleks Kandang XII (Makam Sultan Ali Mughayat Syah)** serta **Gunongan**.<!--more-->\n\nSetiap tanggal **27 Desember**, Pemerintah Aceh, Majelis Adat Aceh, dan para ulama dayah rutin menggelar **Haul Akbar Sultan Iskandar Muda** dengan zikir *Dalail Khairat*, samadiyah, dan santunan anak yatim di Kompleks Makam Baperis Banda Aceh.',
    barokahHajat:
      'Peziarah, negarawan, dan penegak hukum yang berziarah ke maqbarah Sultan Iskandar Muda di Baiturrahman Banda Aceh umumnya bertawassul memohon kepada Allah SWT ketegasan dan keadilan dalam memimpin tanpa pandang bulu, kemakmuran negeri yang berlandaskan syariat, serta keberanian menjaga kehormatan bangsa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Sultan Iskandar Muda (Meukuta Alam Banda Aceh)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْعَادِلِ الْمُجَاهِدِ إِسْكَنْدَرْ مُودَا جُوهَانْ فَهْلَاوَانْ مَكُوتَا عَالَمْ وَسَلَاطِينِ أَتشِيهْ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْ بِلَادَنَا بَلْدَةً طَيِّبَةً وَرَبٌّ غَفُورٌ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْعَادِلِ الْمُجَاهِدِ إِسْكَنْدَرْ مُودَا جُوهَانْ فَهْلَاوَانْ مَكُوتَا عَالَمْ وَسَلَاطِينِ أَتشِيهْ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْ بِلَادَنَا بَلْدَةً طَيِّبَةً وَرَبٌّ غَفُورٌ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-'Aadilil-Mujaahid Iskandar Muda Johan Pahlawan Meukuta Alam wa Salaathiini Aceh Darussalam syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waj'al bilaadanaa baldatan thayyibatan wa Rabbun Ghafuur wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan yang adil lagi pejuang Sultan Iskandar Muda Johan Pahlawan Meukuta Alam beserta para sultan Aceh Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah negeri kami negeri yang baik dan berada dalam ampunan Tuhan Yang Maha Pengampun, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan yang adil lagi pejuang Sultan Iskandar Muda Johan Pahlawan Meukuta Alam beserta para sultan Aceh Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah negeri kami negeri yang baik dan berada dalam ampunan Tuhan Yang Maha Pengampun, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '27 Desember / 29 Rajab (Puncak Haul Akbar Tahunan Sultan Iskandar Muda di Kompleks Makam Baperis, Gampong Peuniti, Kecamatan Baiturrahman, Kota Banda Aceh).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat sesuai Syariat Islam Aceh, melepas alas kaki sebelum menaiki pelataran cungkup Makam Sultan Iskandar Muda, serta menjaga ketertiban di kawasan cagar budaya Museum Aceh.',
    facilities: ['Cungkup Utama Makam Sultan Iskandar Muda', 'Museum Negeri Aceh & Lonceng Cakra Donya (Berdampingan)', 'Tepian Krueng Daroy & Dekat Masjid Raya Baiturrahman', 'Area Parkir Wisata Sejarah Peuniti Banda Aceh'],
    openingHours: 'Buka Setiap Hari 08.00 – 17.30 WIB',
    references: [
      'Lombard, Denys (1986). Kerajaan Aceh: Zaman Sultan Iskandar Muda (1607–1636). Jakarta: Balai Pustaka.',
      'Ar-Raniry, Syaikh Nuruddin (1638 / 1966). Bustanus Salatin Bab II Pasal 13 (ed. Teuku Iskandar). Kuala Lumpur: Dewan Bahasa dan Pustaka.',
      'Hadi, Amirul (2004). Islam and State in Sumatra: A Study of Seventeenth-Century Aceh. Leiden: Brill.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'teungku-di-anjong-banda-aceh',
    legacyId: 'habib-15',
    name: 'Makam Al-Habib Abu Bakar bin Husein Balfaqih (Teungku Di Anjong — Peulanggahan, Banda Aceh)',
    title: 'Waliyullah Quthub Hadramaut–Aceh Abad ke-18 & Pendiri Masjid Bersejarah Teungku Di Anjong (1769 M)',
    description:
      'Kompleks Cagar Budaya Masjid dan Makam Teungku Di Anjong (Al-Habib Abu Bakar bin Husein Balfaqih, 1705–1782 M) beserta permaisurinya Cut Po Fatimah di Gampong Peulanggahan, Kecamatan Kuta Raja, Kota Banda Aceh, Provinsi Aceh.',
    category: 'Habaib',
    era: 'Abad ke-18 M (Lahir 1117 H / 1705 M – Wafat 14 Ramadhan 1196 H / 1782 M)',
    province: 'Aceh',
    city: 'Banda Aceh',
    district: 'Kec. Kuta Raja',
    address: 'Gampong Peulanggahan, Kec. Kuta Raja, Kota Banda Aceh',
    location: {
      lat: 5.5685,
      lng: 95.3142,
      address: 'Gampong Peulanggahan, Kec. Kuta Raja, Kota Banda Aceh',
      district: 'Kec. Kuta Raja',
      city: 'Banda Aceh',
      province: 'Aceh',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg',
    imageSource: 'Wikimedia Commons — Masjid & Kompleks Makam Bersejarah Teungku Di Anjong (Habib Abu Bakar Balfaqih, Peulanggahan Banda Aceh)',
    sanad:
      'Al-Habib Abu Bakar bin Husein bin Umar Balfaqih Ba’alawi asal Tarim, Hadramaut (Yaman); menuntut ilmu di Tarim dan Haramain sebelum berdakwah ke Malabar (India), Kedah, dan menetap di Banda Aceh sebagai mursyid utama Sultan Alauddin Mahmud Syah (1760–1781 M).',
    karya: [
      'Pendirian Masjid Teungku Di Anjong di Gampong Peulanggahan, Kuta Raja, Banda Aceh pada tahun 1182 H / 1769 M',
      'Pengembangan Dayah Peulanggahan dan penyebaran ratib serta wirid Thariqah ’Alawiyyah–Qadiriyah di pesisir Aceh',
    ],
    history:
      '**Al-Habib Abu Bakar bin Husein Balfaqih**—yang sangat dicintai dan dimuliakan oleh rakyat Aceh dengan gelar **Teungku Di Anjong** (*Ulama Agung yang Disanjung di Rumah Anjungan*, lahir di Tarim, Hadramaut pada tahun **1117 H / 1705 M** dan wafat di Banda Aceh pada **14 Ramadhan 1196 H / Agustus 1782 M**)—adalah ulama sufi *Ahlul Bait* yang menjadi poros spiritual Kesultanan Aceh pada abad ke-18 M. Setelah menguasai ilmu fikih Syafi’i, hadis, dan tasawuf di Tarim serta Makkah, beliau berhijrah menyebarkan dakwah melewati India dan Semenanjung Malaya hingga berlabuh di Kuala Aceh pada masa pemerintahan **Sultan Alauddin Mahmud Syah** (1760–1781 M).\n\nKetinggian ilmu, kezuhudan, dan kemuliaan akhlak Habib Abu Bakar Balfaqih membuat Sultan Aceh dan masyarakat Gampong Peulanggahan (kawasan pelabuhan sungai Krueng Aceh di Kuta Raja) membangun sebuah rumah panggung beranjung khusus bagi beliau hingga beliau masyhur dipanggil **Teungku Di Anjong**. Pada tahun **1182 H (1769 M)**, beliau mendirikan **Masjid Teungku Di Anjong** dan dayah pengajian yang menjadi pusat rujukan ulama dari seluruh Aceh.\n\nBeliau menikah dengan seorang syarifah shalihah, **Syarifah Fathimah binti Abdurrahman Al-Aidid (Cut Po Fatimah / Aja Eusteri)**. Teungku Di Anjong wafat tepat pada malam **14 Ramadhan 1196 H (1782 M)** dalam usia 77 tahun dan dimakamkan di dalam cungkup khusus di samping **Masjid Teungku Di Anjong, Gampong Peulanggahan, Kecamatan Kuta Raja, Kota Banda Aceh**, berdampingan dengan makam sang istri tercinta.',
    karomah: [
      'Dalam catatan orientalis Belanda Prof. C. Snouck Hurgronje (*The Achehnese*, 1906) yang menyaksikan langsung kehidupan beragama masyarakat Banda Aceh pada abad ke-19, disebutkan bahwa makam **Teungku Di Anjong** di Peulanggahan dan makam **Teungku Syiah Kuala** di Deah Raya adalah dua makam waliyullah yang paling dijunjung tinggi oleh seluruh lapisan rakyat dan sultan Aceh untuk bernazar serta memohon keberkahan.<!--more-->\n\nKetika Tsunami Aceh 26 Desember 2004 menerjang kawasan pesisir Kuta Raja dan Peulanggahan, kubah cungkup tempat pusara Habib Abu Bakar Balfaqih (Teungku Di Anjong) dan istrinya berada tetap berdiri kokoh di tengah terjangan gelombang laut.',
    ],
    untoldStory:
      'Di halaman Kompleks Masjid dan Makam Teungku Di Anjong di Gampong Peulanggahan masih terdapat batu prasasti dan meriam kuno peninggalan abad ke-18 M, serta bangunan cungkup makam kuno yang mempertahankan ornamen kaligrafi kayu khas Kesultanan Aceh.<!--more-->\n\nSetiap malam **14 Ramadhan**, masyarakat Gampong Peulanggahan dan para habaib serta teungku dayah di Banda Aceh berkumpul di Masjid Teungku Di Anjong untuk menyelenggarakan **Haul Teungku Di Anjong** yang dirangkai dengan buka puasa bersama (*kuah beulangong*), shalat Tarawih, dan khataman Al-Qur’an.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Al-Habib Abu Bakar bin Husein Balfaqih (Teungku Di Anjong) dan Cut Po Fatimah di Peulanggahan Banda Aceh umumnya bertawassul memohon kepada Allah SWT kemuliaan akhlak dan rumah tangga yang sakinah, keberkahan ibadah di bulan suci Ramadhan, serta keselamatan dunia-akhirat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Abu Bakar bin Husein Balfaqih (Teungku Di Anjong Banda Aceh)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْقُطْبِ الْحَبِيبِ أَبِي بَكْرِ بْنِ حُسَيْنٍ بَلْفَقِيهْ (تُونْغكُو دِي أَنْجُونْغ) وَزَوْجَتِهِ الشَّرِيفَةِ فَاطِمَةَ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِأَسْرَارِهِمَا وَبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْقُطْبِ الْحَبِيبِ أَبِي بَكْرِ بْنِ حُسَيْنٍ بَلْفَقِيهْ (تُونْغكُو دِي أَنْجُونْغ) وَزَوْجَتِهِ الشَّرِيفَةِ فَاطِمَةَ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِأَسْرَارِهِمَا وَبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Quthbil-Habiib Abii Bakr bin Husain Balfaqih (Teungku Di Anjong) wa zaujatihisy-Syariifah Faathimah syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanfa'naa bi asraarihimaa wa barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub Al-Habib Abu Bakar bin Husein Balfaqih (Teungku Di Anjong) beserta istrinya Syarifah Fatimah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub Al-Habib Abu Bakar bin Husein Balfaqih (Teungku Di Anjong) beserta istrinya Syarifah Fatimah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '14 Ramadhan (Puncak Haul Akbar Tahunan Al-Habib Abu Bakar bin Husein Balfaqih / Teungku Di Anjong di Kompleks Masjid Teungku Di Anjong, Gampong Peulanggahan, Kecamatan Kuta Raja, Kota Banda Aceh).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang menutup aurat sesuai Qanun Syariat Islam Aceh, melepas alas kaki saat memasuki area masjid dan cungkup makam Teungku Di Anjong, serta menjaga ketenangan jamaah.',
    facilities: ['Masjid Bersejarah Teungku Di Anjong (1769 M)', 'Cungkup Maqbarah Teungku Di Anjong & Cut Po Fatimah', 'Tempat Wudhu & Balai Pengajian Peulanggahan', 'Area Parkir Peziarah Kuta Raja Banda Aceh'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Snouck Hurgronje, C. (1906). The Achehnese (Vol. I & II). Leiden: E.J. Brill.',
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait. Jeddah: Alamul Ma’rifah.',
      'Balai Pelestarian Cagar Budaya (BPCB) Aceh — Monografi Situs Masjid dan Makam Teungku Di Anjong Peulanggahan Banda Aceh.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 2. PROVINSI SUMATERA UTARA
  // =========================================================================
  {
    id: 'syekh-abdul-wahab-rokan-besilam',
    legacyId: 'ulama-26',
    name: 'Makam Syekh Abdul Wahab Rokan Al-Khalidi An-Naqsyabandi (Tuan Guru Babussalam / Besilam, Langkat)',
    title: 'Mujaddid Thariqah Naqsyabandiyah Khalidiyah Sumatera–Semenanjung Malaya & Pendiri Kampung Suluk Babussalam (1883 M)',
    description:
      'Kompleks Maqbarah dan Rumah Suluk Kampung Babussalam (Besilam) di Desa Besilam, Kecamatan Padang Tualang, Kabupaten Langkat, Provinsi Sumatera Utara—tempat peristirahatan Syekh Abdul Wahab Rokan (1811–1926 M), mursyid agung Sultan Langkat dan ribuan khalifah tarekat di Asia Tenggara.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-20 M (28 September 1811 – 27 Desember 1926 M / 21 Jumadil Akhir 1345 H)',
    province: 'Sumatera Utara',
    city: 'Langkat',
    district: 'Kec. Padang Tualang',
    address: 'Kampung Babussalam, Desa Besilam, Kec. Padang Tualang, Kabupaten Langkat',
    location: {
      lat: 3.9035,
      lng: 98.3612,
      address: 'Kampung Babussalam, Desa Besilam, Kec. Padang Tualang, Kabupaten Langkat',
      district: 'Kec. Padang Tualang',
      city: 'Langkat',
      province: 'Sumatera Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Sumatera Utara (Kompleks Maqbarah Tuan Guru Besilam Syekh Abdul Wahab Rokan, Padang Tualang, Langkat)',
    sanad:
      'Lahir dengan nama Abu Qasim bin Abdul Manaf bin Yasin di Rantau Binuang Sakti (Rokan, Riau); murid fikih Syekh Muhammad Yusuf dan Syekh Abdus Shamad di Tanah Melayu serta bermukim 6 tahun di Makkah (1863–1869 M) menerima baiat dan khilafah tertinggi Thariqah Naqsyabandiyah Khalidiyah dari Syaikh Sulaiman Zuhdi di Jabal Abu Qubais.',
    karya: [
      'Pendirian Kampung Persulukan Babussalam (Besilam) di Padang Tualang, Langkat pada 12 Syawal 1300 H / 1883 M di atas tanah wakaf Sultan Musa Al-Mu’azzam Syah (Sultan Langkat)',
      'Penyusunan 44 Wasiat Tuan Guru Syekh Abdul Wahab Rokan bagi murid dan anak-cucu serta jaringan ekonomi mandiri pesantren (perkebunan lada, karet, dan percetakan di Penang/Langkat)',
      'Pengangkatan lebih dari 120 khalifah mursyid Thariqah Naqsyabandiyah di Aceh, Sumatera Utara, Riau, Sumatera Barat, Johor, Perak, hingga Kelantan',
    ],
    history:
      '**Syekh Abdul Wahab Rokan Al-Khalidi An-Naqsyabandi**—yang masyhur dengan gelar kehormatan **Tuan Guru Babussalam (Tuan Guru Besilam)** (lahir di Kampung Danau Runda, Rantau Binuang Sakti, Rokan, Riau pada **19 Rabiul Akhir 1230 H / 28 September 1811 M** dan wafat di Besilam, Langkat pada **21 Jumadil Akhir 1345 H / 27 Desember 1926 M** dalam usia 115 tahun)—adalah mursyid agung *Thariqah Naqsyabandiyah Khalidiyah* terbesar di Pulau Sumatera dan Semenanjung Malaya. Setelah mengkhatamkan pengajian Al-Qur’an dan kitab fikih di Rokan, Tambusai (tempat beliau sempat bergabung dengan perjuangan Tuanku Tambusai), dan Melaka, beliau berangkat ke Tanah Suci Makkah pada tahun **1863 M**.\n\nDi Makkah Al-Mukarramah, beliau berguru ilmu syariat kepada **Syaikh Muhammad Yunus Batu Bara**, **Syaikh Zainuddin Sumbawa**, dan **Syaikh Nawawi Al-Bantani**, lalu menjalani riyadhah suluk *Thariqah Naqsyabandiyah Khalidiyah* di Jabal Abu Qubais di bawah bimbingan langsung **Syaikh Sulaiman Zuhdi Al-Khalidi** hingga dianugerahi ijazah kemursyidan tertinggi (*Khalifah Kubra*) untuk seluruh wilayah Sumatera dari Aceh hingga Palembang.\n\nSekembalinya ke Nusantara pada tahun 1869 M, beliau mendirikan perkampungan dakwah di Kubah (Kubu), Dumai, dan Batu Pahat (Johor), sebelum akhirnya diundang oleh Sultan Langkat yang sangat saleh, **Sultan Musa Al-Mu’azzam Syah**, untuk membuka perkampungan tarekat mandiri di **Kampung Babussalam (Besilam), Kecamatan Padang Tualang, Kabupaten Langkat** pada tanggal **12 Syawal 1300 H (1883 M)**. Di Besilam, Tuan Guru Syekh Abdul Wahab Rokan menerapkan tata tertib syariat yang murni disertai kemandirian ekonomi pertanian dan peternakan bersama. Beliau wafat pada tanggal **27 Desember 1926 M (21 Jumadil Akhir 1345 H)** dan dimakamkan di dalam **Kubah Maqbarah Tuan Guru Babussalam, Desa Besilam, Kecamatan Padang Tualang, Kabupaten Langkat**.',
    karomah: [
      'Dalam buku klasik *Syekh Abdul Wahab Rokan: 1811–1926, Tengku Besar Tanah Melayu dan Sumatera* karya cucu beliau H.M. Said dan penelitian antropolog Prof. Martin van Bruinessen (*Tarekat Naqsyabandiyah di Indonesia*), karomah utama Tuan Guru Besilam tampak dari usia beliau yang mencapai **115 tahun** dalam keadaan sehat walafiat, membina puluhan ribu murid suluk, serta menjadi guru ruhani bagi para Sultan Langkat (**Sultan Musa** dan **Sultan Abdul Aziz**).<!--more-->\n\nDi Kampung Babussalam Besilam Langkat, hingga hari ini kegiatan *Suluk* (khalwat zikir 10, 20, hingga 40 hari di bulan Ramadhan, Rabiul Awal, dan Jumadil Akhir) terus diikuti oleh ribuan jamaah dari Indonesia, Malaysia, Singapura, dan Thailand di gedung persulukan kayu bersejarah peninggalan Tuan Guru.',
    ],
    untoldStory:
      'Syekh Abdul Wahab Rokan mewariskan naskah **44 Wasiat Tuan Guru Babussalam** yang sangat visioner bagi zamannya: selain mewajibkan shalat berjamaah dan zikir, beliau berwasiat agar umat Islam membangun kemandirian ekonomi (menanam kebun, berdagang dengan jujur, tidak berutang pada rentenir kolonial), menjaga kebersihan kampung, serta menghormati tamu tanpa memandang suku bangsa.<!--more-->\n\nDi dalam Kompleks Babussalam Besilam terdapat **Masjid Raya Babussalam**, **Madrasah Tarbiyah**, **Rumah Suluk Laki-Laki dan Perempuan**, serta **Makam Sultan Musa Al-Mu’azzam Syah (Sultan Langkat)** yang meminta dimakamkan di dekat gurunya di Besilam.',
    barokahHajat:
      'Peziarah dan jamaah suluk yang berziarah ke maqbarah Tuan Guru Syekh Abdul Wahab Rokan di Babussalam Besilam Langkat umumnya bertawassul memohon kepada Allah SWT kebersihan hati melalui zikir *khafi* (*lathaif*), umur panjang yang penuh berkah ibadah, serta kemandirian ekonomi dan ketenteraman batin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Tuan Guru Syekh Abdul Wahab Rokan (Babussalam Besilam Langkat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُرْشِدِ الْكَامِلِ وَالْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْوَهَّابِ رُوكَانْ الْخَالِدِيِّ النَّقْشَبَنْدِيِّ بَابِ السَّلَامِ لَانْغكَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَطَهِّرْ قُلُوبَنَا بِذِكْرِكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُرْشِدِ الْكَامِلِ وَالْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْوَهَّابِ رُوكَانْ الْخَالِدِيِّ النَّقْشَبَنْدِيِّ بَابِ السَّلَامِ لَانْغكَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَطَهِّرْ قُلُوبَنَا بِذِكْرِكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Mursyidil-Kaamili wal-'Aarifi billaah asy-Syaikh 'Abdil-Wahhaab Rokan al-Khaalidiyyin-Naqsyabandii Baabis-Salaam Langkat syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa thahhir quluubanaa bi dzikrika wanfa'naa bi asraarihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh mursyid kamil dan arif billah Syekh Abdul Wahab Rokan Al-Khalidi An-Naqsyabandi Babussalam Langkat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, sucikanlah hati kami dengan zikir kepada-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh mursyid kamil dan arif billah Syekh Abdul Wahab Rokan Al-Khalidi An-Naqsyabandi Babussalam Langkat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, sucikanlah hati kami dengan zikir kepada-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '21 Jumadil Akhir (Puncak Haul Akbar Internasional Tuan Guru Babussalam Syekh Abdul Wahab Rokan yang dihadiri ratusan ribu jamaah di Kampung Babussalam, Desa Besilam, Kecamatan Padang Tualang, Kabupaten Langkat).',
    localAdab:
      'Wajib mematuhi adab Kampung Tarekat Babussalam: mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (laki-laki memakai peci/kopiah, perempuan memakai busana kurung longgar dan kerudung), dilarang merokok atau membuat kegaduhan di sekitar Rumah Suluk dan Kubah Makam, serta mengikuti arahan Tuan Guru Babussalam yang bertugas.',
    facilities: ['Kubah Utama Maqbarah Syekh Abdul Wahab Rokan', 'Masjid Raya Babussalam & Rumah Persulukan Besilam', 'Maqbarah Sultan Musa Langkat & Tuan Guru Penerus', 'Area Parkir Luas Bus Wisata Religi Besilam Padang Tualang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Said, H.A. Fuad (1983). Syekh Abdul Wahab Rokan: Tuan Guru Babussalam. Medan: Pustaka Babussalam.',
      'Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia: Survei Historis, Geografis, dan Sosiologis. Bandung: Mizan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-musthafa-husein-purba-baru',
    name: 'Makam Syekh Musthafa Husein Nasution Al-Mandili (Pesantren Musthafawiyah Purba Baru, Mandailing Natal)',
    title: 'Pendiri Pondok Pesantren Musthafawiyah Purba Baru (1912 M) & Maha Guru Ulama Tapanuli–Sumatera Utara',
    description:
      'Kompleks Maqbarah dan Masjid Pondok Pesantren Musthafawiyah di Desa Purba Baru, Kecamatan Lembah Sorik Marapi, Kabupaten Mandailing Natal, Provinsi Sumatera Utara—tempat peristirahatan Syekh Musthafa Husein Nasution (1886–1955 M), murid Syaikh Ahmad Khatib Al-Minangkabawi dan Syaikh Abdul Qadir Al-Mandili.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Pertengahan Abad ke-20 M (1886 – 16 November 1955 M)',
    province: 'Sumatera Utara',
    city: 'Mandailing Natal',
    district: 'Kec. Lembah Sorik Marapi',
    address: 'Kompleks Pondok Pesantren Musthafawiyah, Desa Purba Baru, Kec. Lembah Sorik Marapi, Kabupaten Mandailing Natal',
    location: {
      lat: 0.7615,
      lng: 99.6042,
      address: 'Kompleks Pondok Pesantren Musthafawiyah, Desa Purba Baru, Kec. Lembah Sorik Marapi, Kabupaten Mandailing Natal',
      district: 'Kec. Lembah Sorik Marapi',
      city: 'Mandailing Natal',
      province: 'Sumatera Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Sumatera Utara (Pondok Pesantren Musthafawiyah Purba Baru & Maqbarah Syekh Musthafa Husein Mandailing Natal)',
    sanad:
      'Syekh Musthafa bin Husein bin Umar Nasution Al-Mandili; bermukim 12 tahun di Makkah Al-Mukarramah (1900–1912 M) berguru kepada Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Abdul Qadir bin Shabir Al-Mandili, Syaikh Mukhtar Ath-Tharid, dan Syaikh Shalih Bafadhal (seperguruan dengan KH. Hasyim Asy’ari, Syekh Sulaiman Ar-Rasuli, dan KH. Abdul Halim Majalengka).',
    karya: [
      'Pendirian Pondok Pesantren Musthafawiyah (12 November 1912 M di Tanobato, lalu pindah ke Purba Baru 1915 M) sebagai pesantren tertua dan terbesar di Sumatera Utara',
      'Pelestarian tradisi ribuan gubuk santri mandiri (Banjar) di Lembah Sorik Marapi yang mencetak ribuan ulama, qadhi, dan mubaligh Sumatera',
      'Pendirian Nahdlatul Ulama di wilayah Tapanuli / Sumatera Utara (1947 M) dan perjuangan mempertahankan kemerdekaan RI',
    ],
    history:
      '**Syekh Musthafa bin Husein Nasution Al-Mandili** (lahir di Tanobato, Kayu Laut, Mandailing pada tahun **1303 H / 1886 M** dengan nama kecil Muhammad Yatim dan wafat di Padangsidimpuan/Purba Baru pada **16 November 1955 M**)—adalah ulama besar pelopor pendidikan pesantren salafiyah terbesar di Provinsi Sumatera Utara. Setelah belajar dasar agama kepada Syekh Abdul Hamid Hutapungkut di Kotanopan, pemuda Musthafa berangkat ke Tanah Suci Makkah pada tahun **1900 M** dan bermukim menuntut ilmu di Masjidil Haram selama **12 tahun** di bawah bimbingan **Syaikh Abdul Qadir Al-Mandili**, **Syaikh Ahmad Khatib Al-Minangkabawi**, **Syaikh Mukhtar Ath-Tharid Al-Bogori**, dan **Syaikh Umar Bajunaid**.\n\nSekembalinya ke tanah air pada tanggal **12 November 1912 M**, Syekh Musthafa Husein mendirikan madrasah dan pesantren di kampung halamannya **Tanobato**. Ketika banjir bandang dan longsor besar melanda Tanobato pada tahun **1915 M**, beliau memindahkan pusat pesantren ke **Desa Purba Baru, Kecamatan Lembah Sorik Marapi, Kabupaten Mandailing Natal** (di tepi jalan lintas Sumatera di kaki Gunung Sorik Marapi), yang kemudian diberi nama **Pondok Pesantren Musthafawiyah Purba Baru**.\n\nCiri khas paling ikonik dari Pesantren Musthafawiyah Purba Baru yang dirintis Syekh Musthafa Husein adalah deretan ribuan pondok kayu berukuran kecil (**Gubuk Santri / Banjar**) yang dibangun sendiri oleh para santri putra di sepanjang lembah sungai untuk melatih kemandirian hidup (*zuhud* dan *riyadhah*) sambil mengkaji kitab kuning *turats* Syafi’iyah selama 7 tahun. Syekh Musthafa Husein juga merupakan tokoh sentral pergerakan **Al-Ittihadiyah** dan pendiri **Nahdlatul Ulama di Tapanuli (1947)**. Beliau wafat pada tanggal **16 November 1955 M** dan dimakamkan di dalam kubah maqbarah di samping Masjid Pondok Pesantren Musthafawiyah, Desa Purba Baru, Mandailing Natal.',
    karomah: [
      'Dalam biografi sejarah *Syekh Musthafa Husein dan Pesantren Musthafawiyah Purba Baru*, keistimewaan besar beliau adalah keteguhan menjaga kurikulum kitab kuning klasik (*Nahu, Shorof, Fikih Syafi’i, Tafsir Jalalain*) dan tradisi *Gubuk Santri* selama lebih dari **114 tahun** sejak 1912 M hingga hari ini dengan jumlah santri aktif mencapai lebih dari 10.000 orang dari seluruh Sumatera dan Malaysia.<!--more-->\n\nKetika beliau wafat pada 16 November 1955 di Padangsidimpuan dan jenazahnya dibawa sepanjang 60 km menuju Purba Baru, puluhan ribu masyarakat Mandailing berdiri berjejer di sepanjang jalan raya secara spontan untuk memberikan penghormatan terakhir dan berebut memikul keranda sang Maha Guru.',
    ],
    untoldStory:
      'Di dalam kubah Maqbarah Pondok Pesantren Musthafawiyah Purba Baru, pusara **Syekh Musthafa Husein Nasution** berdampingan dengan makam putra sekaligus penerus beliau, **Syekh H. Abdullah Musthafa Nasution** (wafat 1996 M), sebelum estafet kepemimpinan pesantren dilanjutkan oleh cucu beliau **H. Musthafa Bakri Nasution**.<!--more-->\n\nSaat melintasi Jalan Lintas Sumatera (Jalinsum) ruas Kotanopan–Panyabungan di Kecamatan Lembah Sorik Marapi, setiap pelintas dan peziarah akan disambut pemandangan ribuan *Gubuk Santri* Musthafawiyah dan santri bersarung-bersorban putih yang berjalan menuju masjid pesantren.',
    barokahHajat:
      'Peziarah, santri, dan orang tua yang berziarah ke maqbarah Syekh Musthafa Husein di Pesantren Musthafawiyah Purba Baru Mandailing Natal umumnya bertawassul memohon kepada Allah SWT kemandirian dan ketekunan anak-cucu dalam menuntut ilmu agama (*tafaqquh fid-din*), keberkahan ilmu kitab kuning, serta keteguhan akidah *Ahlussunnah wal Jama’ah*.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Musthafa Husein Nasution (Musthafawiyah Purba Baru Mandailing Natal)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ مُصْطَفَى حُسَيْنْ نَاسُوتِيُونْ الْمَنْدِيلِيِّ وَوَلَدِهِ الشَّيْخِ عَبْدِ اللهِ مُصْطَفَى وَمَشَايِخِ الْمُصْطَفَوِيَّةِ فُورْبَا بَارُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا الْعِلْمَ النَّافِعَ وَالْعَمَلَ الصَّالِحَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ مُصْطَفَى حُسَيْنْ نَاسُوتِيُونْ الْمَنْدِيلِيِّ وَوَلَدِهِ الشَّيْخِ عَبْدِ اللهِ مُصْطَفَى وَمَشَايِخِ الْمُصْطَفَوِيَّةِ فُورْبَا بَارُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا الْعِلْمَ النَّافِعَ وَالْعَمَلَ الصَّالِحَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah asy-Syaikh Mushthafaa Husain Nasution al-Mandiilii wa waladihisy-Syaikh 'Abdillaah Mushthafaa wa Masyaayikhil-Mushthafawiyyah Purba Baru syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnal-'ilman-naafi'a wal-'amalash-shaaliha wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah Syekh Musthafa Husein Nasution Al-Mandili, putranya Syekh Abdullah Musthafa, beserta para masyayikh Pondok Pesantren Musthafawiyah Purba Baru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami ilmu yang bermanfaat dan amal yang shalih, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah Syekh Musthafa Husein Nasution Al-Mandili, putranya Syekh Abdullah Musthafa, beserta para masyayikh Pondok Pesantren Musthafawiyah Purba Baru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami ilmu yang bermanfaat dan amal yang shalih, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12–16 November (Peringatan Milad Pondok Pesantren Musthafawiyah 12 November & Haul Akbar Syekh Musthafa Husein Nasution di Desa Purba Baru, Kecamatan Lembah Sorik Marapi, Kabupaten Mandailing Natal).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melapor kepada petugas keamanan/penerima tamu Pondok Pesantren Musthafawiyah Purba Baru, serta menjaga ketenangan kegiatan belajar mengajar puluhan ribu santri.',
    facilities: ['Kubah Maqbarah Syekh Musthafa Husein Purba Baru', 'Masjid Jami’ Pondok Pesantren Musthafawiyah', 'Kawasan Ribuan Gubuk Santri (Banjar) Purba Baru', 'Area Parkir Bus Tamu Lintas Sumatera Purba Baru'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Pulungan, Abbas (2004). Pesantren Musthafawiyah Purba Baru Mandailing: Bangkit dan Berkembangnya Pendidikan Islam di Sumatera Utara. Bandung: Citapustaka Media.',
      'Steenbrink, Karel A. (1986). Pesantren, Madrasah, Sekolah: Pendidikan Islam dalam Kurun Modern. Jakarta: LP3ES.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-papan-tinggi-mahligai-barus',
    legacyId: 'ulama-36',
    name: 'Kompleks Makam Papan Tinggi (Syekh Mahmud) & Makam Mahligai (Syekh Rukunuddin — Barus, Tapanuli Tengah)',
    title: 'Cagar Budaya Nasional Titik Nol Peradaban Islam Nusantara di Bandar Kapur Barus Kuno',
    description:
      'Kompleks Cagar Budaya Nasional Makam Papan Tinggi (Syekh Mahmud di puncak bukit 715 anak tangga, Desa Pananggahan) dan Kompleks Makam Mahligai (Syekh Rukunuddin wafat 48 H / abad ke-14 M & Syekh Ushuluddin di Desa Aek Dakka), Kecamatan Barus, Kabupaten Tapanuli Tengah, Provinsi Sumatera Utara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-7 – Abad ke-14 M (Era Bandar Kapur Barus / Fansur Kuno)',
    province: 'Sumatera Utara',
    city: 'Tapanuli Tengah',
    district: 'Kec. Barus',
    address: 'Desa Pananggahan (Makam Papan Tinggi) & Desa Aek Dakka (Makam Mahligai), Kec. Barus, Kabupaten Tapanuli Tengah',
    location: {
      lat: 2.0425,
      lng: 98.4112,
      address: 'Desa Pananggahan (Makam Papan Tinggi) & Desa Aek Dakka (Makam Mahligai), Kec. Barus, Kabupaten Tapanuli Tengah',
      district: 'Kec. Barus',
      city: 'Tapanuli Tengah',
      province: 'Sumatera Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Batu Nisan Kuno Makam Syekh Mahmud di Puncak Bukit Papan Tinggi, Barus, Tapanuli Tengah',
    sanad:
      'Jaringan saudagar-sufi dan mubaligh awal dari Jazirah Arab (Yaman/Hadramaut), Persia, dan Gujarat yang berlabuh di Pelabuhan Internasional Kapur Barus (Fansur / Lobu Tua) sejak masa kekhalifahan Islam awal hingga abad ke-14 M.',
    karya: [
      'Komunitas Muslim tertua di pesisir barat Sumatera (Bandar Kapur Barus / Fansur) yang tercatat dalam naskah geografi Arab klasik (Ibnu Khurdadzbih & Al-Mas’udi abad ke-9/10 M)',
      'Warisan epigrafi puluhan batu nisan kuno berkaligrafi Arab-Persia di Papan Tinggi, Mahligai, Tuan Ambar, dan Batu Badan (Barus)',
      'Penetapan resmi Tugu Titik Nol Peradaban Islam Nusantara di Barus (24 Maret 2017)',
    ],
    history:
      'Kota tua **Barus** (yang dalam literatur klasik Arab, Persia, Yunani, dan Tiongkok dikenal sebagai **Fansur / Pansur**) di pesisir barat **Kabupaten Tapanuli Tengah, Provinsi Sumatera Utara** memegang posisi yang sangat istimewa dalam sejarah dunia dan Islam Nusantara. Sejak zaman kuno, hutan-hutan di pedalaman Barus menghasilkan komoditas aromatik dan medis paling berharga di dunia, yakni **Kapur Barus** (*Dryobalanops aromatica*—yang kata *Kafur* sendiri diabadikan dalam Al-Qur’an Surah Al-Insan ayat 5) serta kemenyan. Kapal-kapal saudagar dan mubaligh Muslim dari Jazirah Arab, Yaman, dan Teluk Persia telah berlabuh langsung di pantai barat Sumatera (Lobu Tua dan Kedai Gadang, Barus) sejak abad ke-7 hingga ke-14 M.\n\nJejak arkeologis kehadiran para auliya pendakwah awal di Barus terpahat abadi pada dua kompleks pemakaman Cagar Budaya Nasional utama di Kecamatan Barus: pertama, **Kompleks Makam Papan Tinggi** di puncak bukit setinggi ~200 mdpl di **Desa Pananggahan** (yang dicapai dengan mendaki **715 hingga 720 anak tangga** menghadap Samudra Hindia), tempat bersemayamnya **Syekh Mahmud** dengan batu nisan granit raksasa sepanjang hampir 7 meter dan tinggi 1,5 meter yang bertuliskan kaligrafi kalimat tauhid serta ayat suci Al-Qur’an dan fragmen puisi sufi Persia karya **Sa’di Asy-Syirazi**.\n\nKedua, sekitar 3 km dari Papan Tinggi, terdapat **Kompleks Makam Mahligai** seluas 3 hektare di **Desa Aek Dakka, Kecamatan Barus**, yang menyimpan **215 makam kuno** para syekh penyebar Islam, termasuk pusara utama **Syekh Rukunuddin** (yang pada nisannya tertulis angka tahun 48 H menurut pembacaan tradisional lokal, atau abad ke-14 M menurut pembacaan epigrafi modern), **Syekh Ushuluddin**, **Syekh Zainal Abidin Ilyas**, dan **Tuan Khatib**. Atas signifikansi historis ini, Presiden RI meresmikan **Tugu Titik Nol Peradaban Islam Nusantara di Barus** pada tanggal **24 Maret 2017**.',
    karomah: [
      'Dalam tradisi lisan masyarakat pesisir Barus–Tapanuli Tengah, karomah Syekh Mahmud di Makam Papan Tinggi tampak dari keberadaan batu nisan monolit berukuran raksasa (beratnya mencapai beberapa ton dari batu padas/granit utuh) yang berada tepat di puncak tebing bukit curam setinggi 200 meter di atas permukaan laut, padahal di puncak bukit tersebut tidak terdapat batuan sejenis.<!--more-->\n\nDi puncak Bukit Papan Tinggi juga tumbuh pohon kayu besar berusia ratusan tahun yang menaungi pusara Syekh Mahmud serta sumber air jernih di mana para peziarah yang selesai mendaki lebih dari 700 anak tangga dapat beristirahat sambil memandang birunya teluk pelabuhan kuno Barus.',
    ],
    untoldStory:
      'Penelitian arkeologi dan epigrafi selama belasan tahun oleh tim gabungan **Pusat Penelitian Arkeologi Nasional (Puslitarkenas)** dan **École française d’Extrême-Orient (EFEO)** yang dipimpin Prof. Claude Guillot, Ludvik Kalus, dan Daniel Perret di situs Lobu Tua, Bukit Hasang, Papan Tinggi, dan Mahligai membuktikan bahwa Barus adalah kosmopolis Islam multinasional pertama di pantai barat Sumatera (tempat bertemunya ulama Arab, Persia, India, dan pribumi Nusantara).<!--more-->\n\nSelain Makam Papan Tinggi dan Makam Mahligai, peziarah yang datang ke Kecamatan Barus juga lazim mengunjungi **Makam Syekh Ibrahim Syah (Tuan Batu Badan)**, **Makam Tuan Ambar**, dan **Makam Tuan Makhdum** yang membentuk sabuk makam-makam wali kuno di perbukitan Barus.',
    barokahHajat:
      'Peziarah, peneliti sejarah Islam, dan santri yang mendaki dan berziarah ke Makam Papan Tinggi (Syekh Mahmud) serta Makam Mahligai (Syekh Rukunuddin) di Barus Tapanuli Tengah umumnya bertawassul memohon kepada Allah SWT keteguhan iman sebagaimana para mubaligh perintis awal, kekuatan fisik dan ruhani dalam berdakwah, serta keberkahan ilmu dan rezeki.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Mahmud (Papan Tinggi) & Syekh Rukunuddin (Mahligai Barus)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ مَحْمُودْ فَفَانْ تِينْغغِي وَالشَّيْخِ رُكْنِ الدِّينِ وَالشَّيْخِ أُصُولِ الدِّينِ وَأَوْلِيَاءِ بَارُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الْإِسْلَامِ وَالسُّنَّةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ مَحْمُودْ فَفَانْ تِينْغغِي وَالشَّيْخِ رُكْنِ الدِّينِ وَالشَّيْخِ أُصُولِ الدِّينِ وَأَوْلِيَاءِ بَارُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الْإِسْلَامِ وَالسُّنَّةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh Mahmuud Papan Tinggi wasy-Syaikh Rukniddiin wasy-Syaikh Ushuuliddiin wa Auliyaa-i Barus syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbitnaa 'alal-Islaami was-Sunnati wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali pendakwah di jalan Allah Syekh Mahmud Papan Tinggi, Syekh Rukunuddin, Syekh Ushuluddin, beserta seluruh auliya penyebar Islam di Barus, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas Islam dan Sunnah, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali pendakwah di jalan Allah Syekh Mahmud Papan Tinggi, Syekh Rukunuddin, Syekh Ushuluddin, beserta seluruh auliya penyebar Islam di Barus, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas Islam dan Sunnah, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban (Tradisi Ziarah Akbar Menjelang Ramadhan), Syawal, dan Muharram di Kompleks Cagar Budaya Makam Papan Tinggi & Makam Mahligai, Kecamatan Barus, Kabupaten Tapanuli Tengah.',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menyiapkan kondisi fisik serta air minum saat mendaki 715 anak tangga Makam Papan Tinggi, tidak menaiki atau menduduki batu nisan kuno, serta menjaga kebersihan hutan bukit Barus.',
    facilities: ['Kompleks Makam Papan Tinggi (715 Anak Tangga Bukit Pananggahan)', 'Kompleks Cagar Budaya Makam Mahligai Desa Aek Dakka', 'Tugu Titik Nol Peradaban Islam Nusantara Barus', 'Musholla, Gazebo Istirahat & Area Parkir Wisata Barus'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Guillot, Claude & Kalus, Ludvik (2008). Inskripsi Islam Tertua di Indonesia (Barus). Jakarta: Kepustakaan Populer Gramedia (KPG) & EFEO.',
      'Perret, Daniel & Surachman, Heddy (Ed.) (2015). Barus Negeri Kamper: Sejarah dari Abad ke-12 hingga Pertengahan Abad ke-17. Jakarta: KPG & Puslitarkenas.',
      'Tjandrasasmita, Uka (2009). Arkeologi Islam Nusantara. Jakarta: KPG.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-hasan-mashum-medan',
    name: 'Makam Syekh Hasan Ma’shum Al-Madani / Tuan Guru Deli (Kompleks Masjid Raya Al-Mashun, Medan)',
    title: 'Mufti Agung Kesultanan Deli (Imam Paduka Tuan), Pengarang Kutubus Sittah Melayu & Pendiri Al-Jam’iyatul Washliyah',
    description:
      'Kompleks Pemakaman Masjid Raya Al-Mashun di Jl. Sisingamangaraja, Kelurahan Masjid, Kecamatan Medan Kota, Kota Medan, Provinsi Sumatera Utara—tempat peristirahatan Al-Allamah Syekh Hasanuddin bin Syaikh Muhammad Ma’shum (1884–1937 M), ulama besar Kesultanan Deli.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Awal Abad ke-20 M (17 Muharram 1301 H / 1884 M – 24 Syawal 1355 H / 7 Januari 1937 M)',
    province: 'Sumatera Utara',
    city: 'Medan',
    district: 'Kec. Medan Kota',
    address: 'Kompleks Masjid Raya Al-Mashun, Jl. Sisingamangaraja, Kel. Masjid, Kec. Medan Kota, Kota Medan',
    location: {
      lat: 3.5752,
      lng: 98.6873,
      address: 'Kompleks Masjid Raya Al-Mashun, Jl. Sisingamangaraja, Kel. Masjid, Kec. Medan Kota, Kota Medan',
      district: 'Kec. Medan Kota',
      city: 'Medan',
      province: 'Sumatera Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Kesultanan Deli & Ulama Medan (Kompleks Masjid Raya Al-Mashun & Maqbarah Syekh Hasan Ma’shum Medan)',
    sanad:
      'Al-Allamah Syekh Hasanuddin bin Syaikh Muhammad Ma’shum bin Syaikh Abi Bakar Al-khalidi Al-Madani Ad-Dali; bermukim 22 tahun di Makkah Al-Mukarramah (1894–1916 M) berguru kepada Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Abdul Hamid Kudus, Syaikh Ali Al-Maliki, dan Syaikh Abdul Qadir Al-Mandili hingga dipercaya mengajar di Masjidil Haram.',
    karya: [
      'Lebih dari 12 kitab fikih, tauhid, dan tasawuf, di antaranya Kutubus Sittah (6 risalah pegangan umat Melayu), Samirush Shibyan, Durarul Bayan, dan Tadzkiratul Muridin',
      'Khadimul ’Ulama dan Pembina Utama berdirinya organisasi Islam Al-Jam’iyatul Washliyah di Medan (30 November 1930 M) serta Maktab Islamiyah Tapanuli (MIT)',
      'Fatwa dan bimbingan keagamaan sebagai Mufti Agung Kesultanan Deli (Imam Paduka Tuan) di Masjid Raya Al-Mashun Medan (1916–1937 M)',
    ],
    history:
      '**Al-Allamah Syekh Hasanuddin bin Syaikh Muhammad Ma’shum**—yang masyhur dengan nama **Syekh Hasan Ma’shum** atau **Tuan Guru Deli** (lahir di Labuhan Deli, Medan pada **17 Muharram 1301 H / 18 November 1883 / 1884 M** dan wafat di Medan pada **24 Syawal 1355 H / Kamis, 7 Januari 1937 M**)—adalah puncak otoritas keilmuan Islam di Sumatera Timur pada paruh pertama abad ke-20 M. Sejak usia 10 tahun (1894 M), beliau dibawa ke Tanah Suci Makkah dan menuntut ilmu selama **22 tahun** kepada para ulama besar Masjidil Haram seperti **Syaikh Ahmad Khatib Al-Minangkabawi**, **Syaikh Abdul Qadir Al-Mandili**, dan **Syaikh Ali Al-Maliki** hingga beliau diizinkan membuka halaqah pengajian di Masjidil Haram dan rumahnya di Syamiyah menjadi pusat berkumpulnya pelajar Melayu-Nusantara.\n\nPada tahun **1916 M**, atas permohonan resmi Sultan Deli **Sultan Ma’moen Al-Rasyid Perkasa Alamsyah** (pembangun Masjid Raya Al-Mashun dan Istana Maimun), Syekh Hasan Ma’shum kembali ke Medan dan diangkat sebagai **Mufti Kesultanan Deli** dengan gelar tertinggi **Imam Paduka Tuan**. Selama lebih dari 20 tahun, majelis pengajian beliau di **Masjid Raya Al-Mashun Medan** dan di Labuhan Deli dihadiri ribuan penuntut ilmu dari Sumatera Utara, Aceh, Riau, hingga Semenanjung Malaya.\n\nBeliau adalah guru utama dan pelindung berdirinya **Maktab Islamiyah Tapanuli (MIT, 1918)** serta organisasi besar **Al-Jam’iyatul Washliyah** yang dideklarasikan oleh murid-murid beliau (**Syekh Abdurrahman Syihab**, **Syekh Muhammad Arsyad Thalib Lubis**, dan **Syekh Ismail Banda**) pada tanggal **30 November 1930 M** di Medan. Syekh Hasan Ma’shum wafat pada tanggal **7 Januari 1937 M (24 Syawal 1355 H)** dalam usia 53 tahun dan dimakamkan di **Kompleks Pemakaman Masjid Raya Al-Mashun, Kecamatan Medan Kota, Kota Medan**.',
    karomah: [
      'Dalam buku biografi sejarah Al-Washliyah dan kesaksian murid-murid beliau seperti Syekh Arsyad Thalib Lubis, kemuliaan Syekh Hasan Ma’shum tampak dari bagaimana beliau berhasil mempersatukan dua kelompok ulama (*Kaum Tua* dan *Kaum Muda*) yang sedang berdebat sengit di Medan pada tahun 1920-an hingga melahirkan organisasi **Al-Jam’iyatul Washliyah** (*Perhimpunan Yang Menghubungkan/Mempersatukan Persaudaraan*).<!--more-->\n\nKetika beliau wafat pada hari Kamis, 7 Januari 1937 M, Sultan Deli memerintahkan pengibaran bendera setengah tiang di seluruh wilayah Kesultanan Deli dan puluhan ribu pelayat memenuhi pelataran Masjid Raya Al-Mashun Medan untuk menyalatkan sang *Imam Paduka Tuan*.',
    ],
    untoldStory:
      'Masjid tempat beliau mengajar dan dimakamkan—**Masjid Raya Al-Mashun Medan** (dibangun 1906–1909 M oleh Sultan Ma’moen Al-Rasyid)—merupakan mahakarya arsitektur Islam dunia yang memadukan gaya Timur Tengah, India (Mughal), dan Spanyol (Moor) berbentuk segi delapan (*oktagonal*).<!--more-->\n\nDi Kompleks Pemakaman samping Masjid Raya Al-Mashun Medan, selain pusara **Syekh Hasan Ma’shum**, bersemayam pula **Sultan Ma’moen Al-Rasyid Perkasa Alamsyah** dan keluarga besar raja-raja Kesultanan Deli.',
    barokahHajat:
      'Peziarah, pelajar madrasah Al-Washliyah, dan ulama yang berziarah ke maqbarah Syekh Hasan Ma’shum di Kompleks Masjid Raya Al-Mashun Medan umumnya bertawassul memohon kepada Allah SWT kedalaman ilmu fikih dan hadis, kemampuan merajut ukhuwah Islamiyah (*silaturahmi / washliyah*), serta keberkahan dakwah di perkotaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Hasan Ma’shum (Imam Paduka Tuan Masjid Raya Al-Mashun Medan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْمُفْتِي الشَّيْخِ حَسَنِ الدِّينِ بْنِ مُحَمَّدْ مَعْصُومْ الْمَدَنِيِّ الدَّالِيِّ وَسَلَاطِينِ وَعُلَمَاءِ مِيدَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَلِّفْ بَيْنَ قُلُوبِنَا وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْمُفْتِي الشَّيْخِ حَسَنِ الدِّينِ بْنِ مُحَمَّدْ مَعْصُومْ الْمَدَنِيِّ الدَّالِيِّ وَسَلَاطِينِ وَعُلَمَاءِ مِيدَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَلِّفْ بَيْنَ قُلُوبِنَا وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatil-Muftii asy-Syaikh Hasaniddiin bin Muhammad Ma'shuum al-Madanii ad-Daalii wa Salaathiini wa 'Ulamaa-i Medan syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa allif baina quluubinaa wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah mufti Syekh Hasanuddin bin Muhammad Ma’shum Al-Madani Ad-Dali beserta para sultan dan ulama Medan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, persatukanlah hati kami dalam persaudaraan, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah mufti Syekh Hasanuddin bin Muhammad Ma’shum Al-Madani Ad-Dali beserta para sultan dan ulama Medan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, persatukanlah hati kami dalam persaudaraan, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '24 Syawal / 7 Januari & 30 November (Peringatan Haul Syekh Hasan Ma’shum & Milad Al-Jam’iyatul Washliyah di Kompleks Masjid Raya Al-Mashun, Kecamatan Medan Kota, Kota Medan).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat (tersedia jubah/kerudung peminjaman di gerbang Masjid Raya Al-Mashun bagi pengunjung umum), melepas alas kaki di batas suci masjid dan kompleks makam, serta menjaga ketenangan ibadah.',
    facilities: ['Kompleks Makam Syekh Hasan Ma’shum & Sultan Deli', 'Masjid Raya Al-Mashun Medan (Cagar Budaya Nasional 1906 M)', 'Dekat Istana Maimun Kesultanan Deli', 'Area Parkir Luas Masjid Raya Medan'],
    openingHours: 'Buka Setiap Hari 05.00 – 22.00 WIB',
    references: [
      'Ja’far, M. (2015). Biografi Intelektual Syekh Hasan Maksum: Pengabdian Ulama Masjidil Haram di Kesultanan Deli. Jakarta: Perdana Publishing.',
      'Sinar, Tengku Luckman (1991). Sejarah Medan Tempo Doeloe. Medan: Perwira.',
      'Chalidjah Hasanuddin (1988). Al-Jam’iyatul Washliyah 1930–1942: Api Dalam Sekam di Sumatera Timur. Bandung: Pustaka.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 3. PROVINSI SUMATERA BARAT (RANAH MINANGKABAU)
  // =========================================================================
  {
    id: 'syekh-burhanuddin-ulakan',
    legacyId: 'ulama-25',
    name: 'Makam Syekh Burhanuddin Ulakan (Tuanku Ulakan — Ulakan Tapakis, Padang Pariaman)',
    title: 'Pelopor Utama Penyebaran Islam & Mursyid Thariqah Syattariyah di Ranah Minangkabau (1646–1704 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam dan Masjid Tuo Syekh Burhanuddin Ulakan (Pono, 1646–1704 M) di Nagari Ulakan, Kecamatan Ulakan Tapakis, Kabupaten Padang Pariaman, Provinsi Sumatera Barat—pusat tradisi *Basapa* ratusan ribu jamaah setiap bulan Safar.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 – Awal Abad ke-18 M (1056–1116 H / 1646 – 20 Juni 1704 M)',
    province: 'Sumatera Barat',
    city: 'Padang Pariaman',
    district: 'Kec. Ulakan Tapakis',
    address: 'Nagari Ulakan, Kec. Ulakan Tapakis, Kabupaten Padang Pariaman',
    location: {
      lat: -0.7062,
      lng: 100.1972,
      address: 'Nagari Ulakan, Kec. Ulakan Tapakis, Kabupaten Padang Pariaman',
      district: 'Kec. Ulakan Tapakis',
      city: 'Padang Pariaman',
      province: 'Sumatera Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Sumatera Barat (Kompleks Makam Syekh Burhanuddin Ulakan & Tradisi Basapa di Padang Pariaman)',
    sanad:
      'Lahir dengan nama Pono (Kanak) di Sintuk/Pariaman dari ayah bernama Pampak Sati; belajar kepada Syaikh Madinah di Tapakis lalu bermukim puluhan tahun di Banda Aceh berguru langsung kepada Mufti Agung Syekh Abdurrauf bin Ali As-Singkili (Teungku Syiah Kuala) hingga diangkat sebagai Khalifah Utama Thariqah Syattariyah untuk Minangkabau.',
    karya: [
      'Pendirian Surau Gadang Tanjung Medan di Ulakan (~1680 M) sebagai surau induk pertama penyebaran Islam dan Thariqah Syattariyah di seluruh darek dan rantau Minangkabau',
      'Peletakan fondasi falsafah harmoni adat dan syariat Minangkabau (Adat basandi syarak, syarak basandi Kitabullah; Syarak mangato, adat mamakai)',
      'Kaderisasi empat Tuanku Khalifah utama (Tuanku Mansiangan Nan Tuo di Pandai Sikek, Tuanku Bayang, Tuanku Kubung Tiga Belas Solok, dan Tuanku Padang Ganting)',
    ],
    history:
      '**Syekh Burhanuddin Ulakan**—yang lahir dengan nama kecil **Pono** di kawasan Sintuk/Pariaman sekitar tahun **1056 H (1646 M)** dan wafat di Ulakan pada **10 Safar 1116 H (Juni 1704 M)**—adalah ulama agung pelopor utama islamisasi pedalaman dan pesisir **Ranah Minangkabau (Sumatera Barat)** serta penyebar utama **Thariqah Syattariyah**. Pada masa mudanya, setelah mendapatkan pengajaran tauhid awal dari Syaikh Abdullah Arif (Syaikh Madinah) di Tapakis, Pono berangkat merantau menuntut ilmu ke pusat keilmuan **Kesultanan Aceh Darussalam** dan mengabdi serta belajar selama bertahun-tahun kepada **Syekh Abdurrauf bin Ali As-Singkili (Teungku Syiah Kuala)** bersama sahabat seperguruannya **Syekh Abdul Muhyi Pamijahan** (Tasikmalaya).\n\nSetelah menguasai ilmu tafsir, hadis, fikih Syafi’i, dan hakikat tasawuf, gurunya Syekh Abdurrauf menganugerahkan nama Islam **Burhanuddin** (*Bukti Kebenaran Agama*) serta melantik beliau sebagai *Khalifah Thariqah Syattariyah* untuk kembali menyinari tanah Minangkabau sekitar tahun **1680 M**. Setibanya di **Nagari Ulakan, Kabupaten Padang Pariaman**, Syekh Burhanuddin tidak menggunakan kekerasan, melainkan merangkul para penghulu adat (*Niniak Mamak*) dengan mendirikan **Surau Tanjung Medan** sebagai lembaga pendidikan kader ulama dan pusat musyawarah.\n\nDari Surau Ulakan inilah lahir murid-murid besar (*Tuanku Nan Ampek*) yang membawa Islam masuk ke jantung dataran tinggi (*Luhak Nan Tigo*: Tanah Datar, Agam, dan Lima Puluh Kota), seperti **Tuanku Mansiangan Nan Tuo** di Koto Baru/Pandai Sikek. Syekh Burhanuddin Ulakan wafat pada hari Rabu, **10 Safar 1116 H (1704 M)** dan dimakamkan di **Kompleks Maqbarah Nagari Ulakan, Kecamatan Ulakan Tapakis, Kabupaten Padang Pariaman**. Wafatnya beliau di bulan Safar melahirkan tradisi ziarah akbar tahunan **Basapa (Bersafar)** yang diikuti ratusan ribu peziarah.',
    karomah: [
      'Dalam naskah *Silsilah Syattariyah Minangkabau* dan tradisi lisan Pariaman, dikisahkan karomah kesabaran dan kelembutan dakwah Syekh Burhanuddin ketika pertama kali kembali dari Aceh ke Ulakan: beliau mendidik anak-anak nagari bermain sambil mengajarkan kalimat syahadat dan adab berwudhu, hingga para tetua adat yang semula curiga justru takjub melihat perubahan akhlak anak-anak mereka dan berbondong-bondong masuk Islam.<!--more-->\n\nDi Nagari Ulakan masih berdiri **Masjid Tuo Kayu Jao / Masjid Tuo Syekh Burhanuddin** di Manggopoh Ulakan dengan tiang-tiang kayu kuno tanpa paku dan mushaf-mushaf manuskrip abad ke-17 peninggalan masa beliau.',
    ],
    untoldStory:
      'Tradisi **Basapa (Basafa / Bersafar)** di Makam Syekh Burhanuddin Ulakan telah ditetapkan sebagai **Warisan Budaya Takbenda Nasional Indonesia**: setiap hari **Rabu setelah tanggal 10 bulan Safar** (dalam perhitungan takwim *khamsiah* Syattariyah), ratusan ribu jamaah dari Sumatera Barat, Riau, Jambi, dan Bengkulu memenuhi pantai dan kompleks makam Ulakan untuk melaksanakan *Basapa Gadang* (dan sepekan kemudian *Basapa Ketek*).<!--more-->\n\nHubungan persaudaraan spiritual antara **Syekh Burhanuddin Ulakan (Padang Pariaman)**, **Syekh Abdurrauf As-Singkili (Banda Aceh)**, dan **Syekh Abdul Muhyi Pamijahan (Tasikmalaya)** merupakan bukti nyata betapa eratnya jaringan sanad keilmuan antara Sumatera dan Jawa sejak abad ke-17 M.',
    barokahHajat:
      'Peziarah dan jamaah *Basapa* yang berziarah ke maqbarah Syekh Burhanuddin di Ulakan Padang Pariaman umumnya bertawassul memohon kepada Allah SWT keteguhan iman dan keselarasan hidup antara adat dan syariat, keberkahan menuntut ilmu di surau/pesantren, serta keselamatan merantau dan mencari nafkah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Burhanuddin Ulakan (Tuanku Ulakan Padang Pariaman)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ مُرْشِدِ الطَّرِيقَةِ الشَّطَّارِيَّةِ الشَّيْخِ بُرْهَانِ الدِّينِ أُولَاكَانْ فَرِيَامَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ قُلُوبَنَا عَلَى طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ مُرْشِدِ الطَّرِيقَةِ الشَّطَّارِيَّةِ الشَّيْخِ بُرْهَانِ الدِّينِ أُولَاكَانْ فَرِيَامَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ قُلُوبَنَا عَلَى طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah Mursyidith-Thariiqatisy-Syaththaariyyah asy-Syaikh Burhaaniddiin Ulakan Pariaman syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa tsabbit quluubanaa 'alaa thaa'atika wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah mursyid Thariqah Syattariyah Syekh Burhanuddin Ulakan Pariaman, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah hati kami dalam ketaatan kepada-Mu, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah mursyid Thariqah Syattariyah Syekh Burhanuddin Ulakan Pariaman, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah hati kami dalam ketaatan kepada-Mu, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Hari Rabu setelah 10 Safar (Puncak Tradisi Ziarah Nasional Basapa Gadang & Basapa Ketek Mengenang Wafatnya Syekh Burhanuddin di Nagari Ulakan, Kecamatan Ulakan Tapakis, Kabupaten Padang Pariaman).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (kaum ibu disarankan mengenakan baju kurung basiba/mukena dan kaum bapak memakai sarung serta peci), melepas alas kaki saat memasuki cungkup makam Syekh Burhanuddin, serta mengikuti pengaturan Tuanku penjaga makam.',
    facilities: ['Cungkup Utama Maqbarah Syekh Burhanuddin Ulakan', 'Masjid Agung Syekh Burhanuddin & Surau Tuo Ulakan', 'Museum & Penyimpanan Manuskrip Kuno Ulakan', 'Area Parkir Luas Pantai & Wisata Religi Ulakan Tapakis (Dekat Bandara Internasional Minangkabau)'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Fathurahman, Oman (2008). Tarekat Syattariyah di Minangkabau: Teks dan Konteks. Jakarta: Prenada Media Group & EFEO.',
      'Dobbin, Christine (1983). Islamic Revivalism in a Changing Peasant Economy: Central Sumatra, 1784–1847. London: Curzon Press.',
      'Azra, Azyumardi (2003). Surau: Pendidikan Islam Tradisional dalam Transisi dan Modernisasi. Jakarta: Logos.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-sulaiman-ar-rasuli-canduang',
    name: 'Makam Syekh Sulaiman Ar-Rasuli (Inyiak Canduang — Canduang Koto Laweh, Agam)',
    title: 'Pendiri Madrasah Tarbiyah Islamiyah (MTI) Canduang, Muassis Persatuan Tarbiyah Islamiyah (PERTI, 1928 M) & Penggagas Falsafah ABS-SBK',
    description:
      'Kompleks Maqbarah Pondok Pesantren Madrasah Tarbiyah Islamiyah (MTI) Canduang di Nagari Canduang Koto Laweh, Kecamatan Canduang, Kabupaten Agam (kaki Gunung Marapi, dekat Bukittinggi), Provinsi Sumatera Barat—tempat peristirahatan Maulana Syekh Sulaiman Ar-Rasuli (1871–1970 M).',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (10 Desember 1871 – 1 Agustus 1970 M / 29 Jumadil Awal 1390 H)',
    province: 'Sumatera Barat',
    city: 'Agam',
    district: 'Kec. Canduang',
    address: 'Kompleks Pondok Pesantren MTI Canduang, Nagari Canduang Koto Laweh, Kec. Canduang, Kabupaten Agam',
    location: {
      lat: -0.3125,
      lng: 100.4312,
      address: 'Kompleks Pondok Pesantren MTI Canduang, Nagari Canduang Koto Laweh, Kec. Canduang, Kabupaten Agam',
      district: 'Kec. Canduang',
      city: 'Agam',
      province: 'Sumatera Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Minangkabau (Pondok Pesantren MTI Canduang & Maqbarah Inyiak Canduang Syekh Sulaiman Ar-Rasuli di Agam)',
    sanad:
      'Maulana Syekh Sulaiman bin Muhammad Rasul Al-Khalidi Asy-Syafi’i (Inyiak Canduang); murid Syekh Abdullah Halaban dan Syekh Abdussalam Banuhampu, lalu bermukim di Makkah (1903–1907 M) berguru kepada Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Mukhtar Ath-Tharid, Syaikh Umar Bajunaid, dan mengambil ijazah Thariqah Naqsyabandiyah Khalidiyah.',
    karya: [
      'Pendirian Madrasah Tarbiyah Islamiyah (MTI) Canduang dan deklarasi organisasi Persatuan Tarbiyah Islamiyah (PERTI) pada 5 Mei 1928 M bersama Syekh Abbas Qadhi Ladang Laweh dan Syekh Muhammad Jamil Jaho',
      'Lebih dari 22 kitab berbahasa Arab dan Melayu Jawi/Minang, di antaranya Pertalian Adat dan Syarak (yang mempopulerkan adagium Adat Basandi Syarak, Syarak Basandi Kitabullah), Dawa’ul Qulub, Tsamaratul Ihsan, dan Pedoman Puasa',
      'Anggota Konstituante RI dan pemimpin Ketua Sidang Mahkamah Syar’iyah Sumatera Tengah',
    ],
    history:
      '**Maulana Syekh Sulaiman Ar-Rasuli**—yang sangat dihormati di seluruh ranah Minangkabau dengan sapaan **Inyiak Canduang** (lahir di Canduang, Kabupaten Agam pada **10 Desember 1871 M / 1290 H** dan wafat pada **1 Agustus 1970 M / 29 Jumadil Awal 1390 H** dalam usia hampir 100 tahun)—adalah ulama besar penjaga benteng *Ahlussunnah wal Jama’ah* bermazhab Syafi’i di Sumatera Barat. Setelah mengkhatamkan ilmu alat, fikih, dan tafsir di berbagai surau besar Minangkabau (Biaro, Sungai Dareh, dan Halaban di bawah bimbingan Syekh Abdullah Halaban), beliau berangkat ke Makkah Al-Mukarramah pada tahun **1903 M** dan berguru langsung kepada **Syaikh Ahmad Khatib Al-Minangkabawi**, **Syaikh Umar Bajunaid**, dan **Syaikh Said Al-Yamani** (seperguruan dengan KH. Hasyim Asy’ari).\n\nSekembalinya ke kampung halamannya di lereng utara Gunung Marapi pada tahun **1908 M**, Inyiak Canduang membuka Surau Baru Canduang yang pada tanggal **5 Mei 1928 M (15 Dzulqa’dah 1346 H)** ditransformasikan dari sistem halaqah surau menjadi sistem madrasah klasikal bernama **Madrasah Tarbiyah Islamiyah (MTI) Canduang**. Pada hari bersejarah yang sama di Canduang, beliau bersama para ulama *Kaum Tua* Minangkabau—seperti **Syekh Muhammad Jamil Jaho**, **Syekh Abbas Qadhi Ladang Laweh**, dan **Syekh Abdul Wahid Asshalihi Tobek Godang**—mendeklarasikan berdirinya organisasi Islam **Persatuan Tarbiyah Islamiyah (PERTI)**.\n\nPeran historis Inyiak Canduang yang tak lekang oleh zaman adalah kemampuannya mendamaikan para *Penghulu Adat* dan *Alim Ulama* Minangkabau melalui karya monumentalnya **Pertalian Adat dan Syarak**, yang mengukuhkan falsafah hidup Minangkabau: *"Adat basandi syarak, syarak basandi Kitabullah"*. Beliau wafat pada hari Sabtu, **1 Agustus 1970 M** (saat itu ribuan pelayat menyaksikan awan memayungi langit Canduang) dan dimakamkan di dalam kubah maqbarah di halaman depan **Pondok Pesantren MTI Canduang, Kecamatan Canduang, Kabupaten Agam**.',
    karomah: [
      'Dalam buku biografi *Syekh Sulaiman Ar-Rasuli: Profil Ulama Pejuang* dan kesaksian ribuan murid MTI Canduang, karomah keilmuan Inyiak Canduang tampak dari produktivitasnya menulis **22 kitab** dalam bentuk *nazham* (syair Melayu/Minang berirama) dan prosa Arab-Jawi sehingga ajaran akidah *Sifat Dua Puluh* dan fikih Syafi’i mudah dihafal oleh masyarakat nagari hingga kaum ibu di surau-surau.<!--more-->\n\nSemasa hidupnya, Presiden Pertama RI **Ir. Soekarno** sangat menghormati kewibawaan Syekh Sulaiman Ar-Rasuli dan berkunjung langsung ke Canduang pada masa perjuangan kemerdekaan untuk meminta nasihat serta dukungan ulama Sumatera Barat bagi keutuhan Republik Indonesia.',
    ],
    untoldStory:
      'Hubungan antara **Syekh Sulaiman Ar-Rasuli (Pendiri PERTI di Sumatera)** dan **Hadratussyaikh KH. Hasyim Asy’ari (Pendiri NU di Jawa)** adalah saudara seperguruan di Makkah yang memiliki visi perjuangan identik: keduanya sama-sama mempertahankan empat mazhab fikih (*khususnya Syafi’iyah*), akidah Asy’ariyah–Maturidiyah, dan tasawuf mu’tabarah di wilayah masing-masing.<!--more-->\n\nDi Kompleks Pondok Pesantren MTI Canduang Kabupaten Agam, peziarah dapat mengunjungi kubah makam Inyiak Canduang sekaligus melihat koleksi kitab asli tulisan tangan dan tongkat peninggalan beliau yang dirawat oleh keluarga besar MTI Canduang.',
    barokahHajat:
      'Peziarah, santri MTI/PERTI, dan pemuka adat yang berziarah ke maqbarah Syekh Sulaiman Ar-Rasuli (Inyiak Canduang) di Canduang Agam umumnya bertawassul memohon kepada Allah SWT keteguhan memegang akidah *Ahlussunnah wal Jama’ah*, keharmonisan antara adat budaya dan syariat agama, serta umur panjang yang penuh berkah ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Maulana Syekh Sulaiman Ar-Rasuli (Inyiak Canduang Agam)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ مَوْلَانَا الشَّيْخِ سُلَيْمَانَ الرَّسُولِيِّ الْخَالِدِيِّ الشَّافِعِيِّ (إِينْيِياكْ تشَانْدُوَانْغ) وَمَشَايِخِ التَّرْبِيَةِ الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْنَا عَلَى عَقِيدَةِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ مَوْلَانَا الشَّيْخِ سُلَيْمَانَ الرَّسُولِيِّ الْخَالِدِيِّ الشَّافِعِيِّ (إِينْيِياكْ تشَانْدُوَانْغ) وَمَشَايِخِ التَّرْبِيَةِ الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْنَا عَلَى عَقِيدَةِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah Maulaanaa asy-Syaikh Sulaimaan ar-Rasuulii al-Khaalidii asy-Syaafi'ii (Inyiak Canduang) wa Masyaayikhit-Tarbiyatil-Islaamiyyah syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wahfazhnaa 'alaa 'aqiidati Ahlis-Sunnati wal-Jamaa'ati wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah Maulana Syekh Sulaiman Ar-Rasuli Al-Khalidi Asy-Syafi’i (Inyiak Canduang) beserta para masyayikh Tarbiyah Islamiyah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, peliharalah kami di atas akidah Ahlussunnah wal Jama’ah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama al-allamah Maulana Syekh Sulaiman Ar-Rasuli Al-Khalidi Asy-Syafi’i (Inyiak Canduang) beserta para masyayikh Tarbiyah Islamiyah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, peliharalah kami di atas akidah Ahlussunnah wal Jama’ah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Mei (Milad MTI Canduang & PERTI) serta 1 Agustus / 29 Jumadil Awal (Puncak Haul Akbar Maulana Syekh Sulaiman Ar-Rasuli di Kompleks Pondok Pesantren MTI Canduang, Kecamatan Canduang, Kabupaten Agam).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melapor ke kantor sekretariat Pondok Pesantren MTI Canduang, melepas alas kaki saat memasuki kubah maqbarah Inyiak Canduang, serta menjaga ketertiban lingkungan asrama santri.',
    facilities: ['Kubah Maqbarah Maulana Syekh Sulaiman Ar-Rasuli', 'Masjid & Kampus Pondok Pesantren MTI Canduang', 'Perpustakaan Turats Inyiak Canduang', 'Area Parkir Bus Tamu Canduang Koto Laweh Agam'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Kosu, Baharuddin & Tim (1983). Syekh Sulaiman Ar-Rasuli: Profil Ulama Pejuang. Padang: Pemda Sumatera Barat.',
      'Yunus, Mahmud (1979). Sejarah Pendidikan Islam di Indonesia. Jakarta: Mutiara.',
      'Putra, Apria (2011). Ulama-Ulama Luak Nan Tuo: Catatan Biografi Ulama Minangkabau Abad XIX dan XX. Padang: Minangkabau Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-muhammad-jamil-jaho',
    name: 'Makam Syekh Muhammad Jamil Jaho (Inyiak Jaho — Sepuluh Koto, Tanah Datar)',
    title: 'Ulama Besar Ahli Ushul Fiqh Minangkabau, Pendiri MTI Jaho & Ketua Umum Pertama PB PERTI',
    description:
      'Kompleks Maqbarah dan Masjid Pondok Pesantren Madrasah Tarbiyah Islamiyah (MTI) Jaho di Nagari Jaho, Kecamatan Sepuluh Koto (X Koto), Kabupaten Tanah Datar (lembah Gunung Marapi dan Singgalang, dekat Padang Panjang), Provinsi Sumatera Barat—tempat peristirahatan Syekh Muhammad Jamil Jaho (1875–1945 M).',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Pertengahan Abad ke-20 M (1875 – 1945 M)',
    province: 'Sumatera Barat',
    city: 'Tanah Datar',
    district: 'Kec. Sepuluh Koto',
    address: 'Kompleks Pondok Pesantren MTI Jaho, Nagari Jaho, Kec. Sepuluh Koto (X Koto), Kabupaten Tanah Datar',
    location: {
      lat: -0.4485,
      lng: 100.4152,
      address: 'Kompleks Pondok Pesantren MTI Jaho, Nagari Jaho, Kec. Sepuluh Koto (X Koto), Kabupaten Tanah Datar',
      district: 'Kec. Sepuluh Koto',
      city: 'Tanah Datar',
      province: 'Sumatera Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Minangkabau (Pondok Pesantren MTI Jaho & Maqbarah Inyiak Jaho Syekh Muhammad Jamil di Tanah Datar)',
    sanad:
      'Syekh Muhammad Jamil bin Datuk Garang (Inyiak Jaho); murid dari Syekh Aluma Koto Tuo, Syekh Abdullah Halaban, lalu bermukim 10 tahun di Makkah Al-Mukarramah (1908–1918 M) berguru kepada Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Abdul Karim Ad-Daghestani, dan Syaikh Said Al-Yamani hingga mengajar di Masjidil Haram.',
    karya: [
      'Pendirian Surau dan Madrasah Tarbiyah Islamiyah (MTI) Jaho (1922/1928 M) di lereng Gunung Singgalang–Marapi yang menjadi rujukan utama ilmu Ushul Fiqh dan Balaghah di Sumatera',
      'Karya tulis bahasa Arab tingkat tinggi: Tadzkiratul Qulub fi Muraqabatil ’Allamil Ghuyub (Tasawuf), Nujumul Hidayah (Tauhid), Al-Fawaidul Janiyyah, dan Kasyful Awrad',
      'Pendiri bersama Persatuan Tarbiyah Islamiyah (PERTI, 1928 M) dan pemegang sanad Thariqah Naqsyabandiyah Khalidiyah',
    ],
    history:
      '**Maulana Syekh Muhammad Jamil Jaho**—yang masyhur dengan gelar **Inyiak Jaho** (lahir di Nagari Jaho, Kecamatan Sepuluh Koto, Kabupaten Tanah Datar pada tahun **1875 M** dan wafat pada tahun **1945 M**)—adalah salah satu ulama paling alim dalam bidang *Ushul Fiqh*, *Mantiq*, *Balaghah*, dan *Tasawuf* di Pulau Sumatera pada abad ke-20 M. Putra dari **Datuk Garang** (Penghulu Suku Tambangan di Jaho) dan **Ibu Siti** ini menimba ilmu dari surau ke surau di Minangkabau hingga bertemu sahabat sejatinya, **Syekh Sulaiman Ar-Rasuli (Inyiak Canduang)**, saat keduanya mengaji kepada **Syekh Abdullah Halaban** di Lima Puluh Kota.\n\nPada tahun **1908 M**, Syekh Muhammad Jamil Jaho berangkat menunaikan ibadah haji dan bermukim selama **10 tahun** di Makkah Al-Mukarramah. Karena kecerdasannya yang luar biasa dalam ilmu alat dan fikih Syafi’iyah di bawah bimbingan **Syaikh Ahmad Khatib Al-Minangkabawi** dan **Syaikh Said Al-Yamani**, beliau diangkat menjadi salah satu pengajar halaqah di **Masjidil Haram** dan dipercaya menguji para thalabah asal Asia Tenggara. Beliau kembali ke tanah air pada tahun **1918 M** dan mengembangkan surau di kampung halamannya **Nagari Jaho, Kecamatan Sepuluh Koto (X Koto), Kabupaten Tanah Datar** (di lembah sejuk antara Gunung Marapi dan Gunung Singgalang, dekat Kota Padang Panjang).\n\nBersama sahabat kentalnya Inyiak Canduang, pada tahun **1928 M** beliau mengubah suraunya menjadi **Madrasah Tarbiyah Islamiyah (MTI) Jaho** dan ikut mendirikan organisasi **Persatuan Tarbiyah Islamiyah (PERTI)**. MTI Jaho sangat masyhur di seluruh Sumatera, Jambi, Riau, dan Aceh sebagai kawah candradimuka spesialis kitab-kitab induk *Ushul Fiqh* (seperti *Jam’ul Jawami’* dan *Lathaiful Isyarat*) serta *Balaghah*. Syekh Muhammad Jamil Jaho wafat pada tahun **1945 M** dan dimakamkan di Kompleks Maqbarah **Masjid Pondok Pesantren MTI Jaho, Kecamatan Sepuluh Koto, Kabupaten Tanah Datar**.',
    karomah: [
      'Dalam catatan sejarah pendidikan Islam Prof. Mahmud Yunus dan kesaksian para ulama tua Sumatera Barat, keistimewaan Inyiak Jaho yang diakui kawan maupun lawan debatnya adalah kedalaman penguasaan ilmu *Ushul Fiqh* dan *Mantiq* (logika Islam) yang sangat tajam namun disampaikan dengan kerendahan hati seorang sufi pengamal *Thariqah Naqsyabandiyah Khalidiyah*.<!--more-->\n\nDari tangan dingin Syekh Muhammad Jamil Jaho di MTI Jaho lahir ribuan ulama besar yang mendirikan madrasah dan pesantren cabang di seluruh Sumatera Barat, Riau, Jambi, Bengkulu, hingga Malaysia.',
    ],
    untoldStory:
      'Dalam khazanah ulama *Kaum Tua* (Ahlussunnah wal Jama’ah) Minangkabau abad ke-20, **Syekh Muhammad Jamil Jaho (Inyiak Jaho)**, **Syekh Sulaiman Ar-Rasuli (Inyiak Canduang)**, **Syekh Abbas Qadhi Ladang Laweh**, dan **Syekh Abdul Wahid Tobek Godang** dikenal sebagai **"Empat Serangkai Ulama Tarbiyah"** yang bahu-membahu menjaga tradisi kitab kuning dan tasawuf di Sumatera.<!--more-->\n\nLokasi Pondok Pesantren MTI Jaho dan makam Inyiak Jaho sangat strategis di tepi jalur lintas Bukittinggi–Padang Panjang (Kecamatan X Koto, Tanah Datar) dengan latar belakang pemandangan Gunung Singgalang dan udara pegunungan yang sangat sejuk.',
    barokahHajat:
      'Peziarah dan santri yang berziarah ke maqbarah Syekh Muhammad Jamil Jaho (Inyiak Jaho) di X Koto Tanah Datar umumnya bertawassul memohon kepada Allah SWT ketajaman pemahaman dalam ilmu *Ushul Fiqh*, bahasa Arab (*Nahwu, Shorof, Balaghah*), serta kejernihan hati dalam mengamalkan ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Maulana Syekh Muhammad Jamil Jaho (Inyiak Jaho Tanah Datar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْأُصُولِيِّ وَالْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ جَمِيلْ جَاهُو الْخَالِدِيِّ الشَّافِعِيِّ وَمَشَايِخِ جَاهُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَفَقِّهْنَا فِي الدِّينِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْأُصُولِيِّ وَالْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ جَمِيلْ جَاهُو الْخَالِدِيِّ الشَّافِعِيِّ وَمَشَايِخِ جَاهُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَفَقِّهْنَا فِي الدِّينِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Ushuuliyyi wal-'Aarifi billaah asy-Syaikh Muhammad Jamiil Jaho al-Khaalidii asy-Syaafi'ii wa Masyaayikhi Jaho syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa faqqihnaa fid-diini wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama ahli ushul fiqh dan arif billah Syekh Muhammad Jamil Jaho Al-Khalidi Asy-Syafi’i beserta para masyayikh Jaho, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, pahamkanlah kami secara mendalam dalam ilmu agama, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama ahli ushul fiqh dan arif billah Syekh Muhammad Jamil Jaho Al-Khalidi Asy-Syafi’i beserta para masyayikh Jaho, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, pahamkanlah kami secara mendalam dalam ilmu agama, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Mei (Milad PERTI & MTI Jaho) serta Haul Tahunan Syekh Muhammad Jamil Jaho di Kompleks Pondok Pesantren MTI Jaho, Nagari Jaho, Kecamatan Sepuluh Koto, Kabupaten Tanah Datar (konfirmasi tanggal pelaksanaan tahunan kepada pengurus Yayasan MTI Jaho).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melapor kepada pengurus Pondok Pesantren MTI Jaho, melepas alas kaki saat memasuki cungkup makam Inyiak Jaho, serta menjaga ketenangan kegiatan belajar santri.',
    facilities: ['Cungkup Maqbarah Syekh Muhammad Jamil Jaho', 'Masjid & Asrama Pondok Pesantren MTI Jaho', 'Ruang Kajian Kitab Turats Jaho', 'Area Parkir Peziarah Nagari Jaho X Koto Tanah Datar'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Sanusi, Shofwan Karim (1998). Syekh Muhammad Jamil Jaho: Ulama, Pendidik dan Pejuang. Padang: IAIN Imam Bonjol.',
      'Yunus, Mahmud (1979). Sejarah Pendidikan Islam di Indonesia. Jakarta: Mutiara.',
      'Koto, Alaiddin (1997). Pemikiran Politik PERTI (Persatuan Tarbiyah Islamiyah) 1945–1970. Jakarta: RajaGrafindo Persada.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 4. PROVINSI RIAU (BUMI LANCANG KUNING)
  // =========================================================================
  {
    id: 'sultan-syarif-kasim-ii-siak',
    name: 'Makam Sultan Syarif Kasim II (Kompleks Masjid Sultan Syahabuddin, Siak Sri Indrapura)',
    title: 'Pahlawan Nasional & Sultan Terakhir Kesultanan Siak Sri Indrapura yang Menyerahkan Mahkota serta 13 Juta Gulden untuk Kemerdekaan RI',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sultan Syarif Kasim II Abdul Jalil Saifuddin (1893–1968 M) dan Permaisuri Tengku Agung Syarifah Latifah tepat di samping Masjid Sultan Syahabuddin dan Istana Asserayah Hasyimiyah, Kelurahan Kampung Dalam, Kecamatan Siak, Kabupaten Siak, Provinsi Riau.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1 Desember 1893 – 23 April 1968 M)',
    province: 'Riau',
    city: 'Siak',
    district: 'Kec. Siak',
    address: 'Kompleks Masjid Sultan Syahabuddin (Dekat Istana Siak), Kel. Kampung Dalam, Kec. Siak, Kabupaten Siak',
    location: {
      lat: 0.7962,
      lng: 102.0492,
      address: 'Kompleks Masjid Sultan Syahabuddin (Dekat Istana Siak), Kel. Kampung Dalam, Kec. Siak, Kabupaten Siak',
      district: 'Kec. Siak',
      city: 'Siak',
      province: 'Riau',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Riau (Istana Siak, Masjid Syahabuddin & Makam Sultan Syarif Kasim II di Siak Sri Indrapura)',
    sanad:
      'Assayyidis Syarif Kasim Sani Abdul Jalil Saifuddin bin Sultan Syarif Hasyim I Abdul Jalil Saifuddin Ba’alawi Al-Hasyimi (Sultan ke-12 Kesultanan Siak Sri Indrapura, keturunan dzurriyah Rasulullah SAW marga Syahabuddin dan Raja Kecil / Sultan Abdul Jalil Rahmat Syah).',
    karya: [
      'Pendirian Madrasah Taufiqiyah Al-Hasyimiyah (sekolah agama modern pertama bagi putra) dan Madrasah An-Nisa / Latifah School (sekolah perempuan pertama di Riau bersama Permaisuri Syarifah Latifah)',
      'Pembangunan kembali Masjid Raya Sultan Syahabuddin Siak (1926/1935 M) di tepi Sungai Siak',
      'Maklumat penyatuan Kesultanan Siak Sri Indrapura ke dalam Negara Kesatuan Republik Indonesia (1945) disertai sumbangan ikhlas 13 juta gulden emas serta mahkota kerajaan untuk perjuangan RI',
    ],
    history:
      '**Sultan Assyaidis Syarif Kasim Sani Abdul Jalil Saifuddin (Sultan Syarif Kasim II)** (lahir di Siak Sri Indrapura pada **1 Desember 1893 M / 22 Jumadil Awal 1311 H** dan wafat di Rumbai, Pekanbaru pada **23 April 1968 M**; ditetapkan sebagai **Pahlawan Nasional RI** melalui **Keppres No. 109/TK/1998 tanggal 6 November 1998**) adalah Sultan ke-12 sekaligus sultan terakhir **Kesultanan Siak Sri Indrapura**, kerajaan Melayu-Islam terbesar di pesisir timur Sumatera. Dinobatkan pada tanggal **3 Maret 1915 M** menggantikan ayahandanya **Sultan Syarif Hasyim I** (pembangun Istana Siak *Asserayah Hasyimiyah* / Istana Matahari Timur), Sultan Syarif Kasim II memimpin dengan visi keislaman yang maju dan keberpihakan kuat terhadap pendidikan rakyat.\n\nBersama permaisurinya yang cerdas, **Tengku Agung Syarifah Latifah**, beliau mendirikan **Madrasah Taufiqiyah Al-Hasyimiyah** dan **Sekolah Perempuan Latifah School**, memberikan beasiswa kepada pemuda-pemudi Siak untuk menuntut ilmu ke Mesir, Makkah, Sumatera Barat, dan Jawa, serta menolak kebijakan kerja paksa (*rodi*) pemerintah kolonial Belanda. Beliau juga memugar **Masjid Raya Sultan Syahabuddin** pada tahun 1926–1935 M sebagai pusat ibadah dan syiar Islam di tepi Sungai Siak.\n\nPuncak pengorbanan dan keikhlasan luar biasa Sultan Syarif Kasim II terjadi sesaat setelah Proklamasi Kemerdekaan RI **17 Agustus 1945**: tanpa ragu sedikit pun, beliau mengirim kawat dukungan kepada Presiden Soekarno, mengibarkan bendera Merah Putih di halaman Istana Siak, menyerahkan kedaulatan Kesultanan Siak bergabung ke dalam Republik Indonesia, serta menyumbangkan harta kekayaan pribadinya senilai **13 Juta Gulden** (setara triliunan rupiah saat ini) beserta **Mahkota Emas Berlian Kesultanan Siak** (yang kini tersimpan di Museum Nasional Jakarta) untuk membiayai perjuangan kemerdekaan Indonesia. Beliau wafat pada tanggal **23 April 1968 M** dan dimakamkan di dalam cungkup khusus tepat di samping barat **Masjid Sultan Syahabuddin, Kelurahan Kampung Dalam, Kecamatan Siak, Kabupaten Siak**.',
    karomah: [
      'Dalam catatan sejarah perjuangan kemerdekaan Republik Indonesia, keteladanan *zuhud* dan cinta tanah air Sultan Syarif Kasim II hampir tiada duanya di dunia: seorang raja kaya raya keturunan Rasulullah SAW yang rela turun takhta secara sukarela dan menyerahkan mahkota serta 13 juta gulden hartanya demi tegaknya Republik Indonesia tanpa pernah meminta jabatan atau imbalan apa pun hingga akhir hayatnya.<!--more-->\n\nDi Kompleks Cagar Budaya Siak Sri Indrapura, peziarah dapat berziarah ke **Makam Sultan Syarif Kasim II** (di samping Masjid Syahabuddin), lalu mengunjungi **Kompleks Makam Koto Tinggi** (makam ayahanda beliau Sultan Syarif Hasyim I dan para sultan Siak terdahulu) serta **Makam Marhum Buantan (Raja Kecil)** yang berada di sekitar kawasan Istana Siak.',
    ],
    untoldStory:
      'Di dalam cungkup Makam Sultan Syarif Kasim II di samping Masjid Sultan Syahabuddin, pusara sang Sultan berdampingan dengan pusara dua permaisuri tercintanya: **Tengku Agung Syarifah Latifah** (wafat 1929 M) dan **Tengku Maharatu Syarifah Fadlun**.<!--more-->\n\nNama besar Pahlawan Nasional Sultan Syarif Kasim II kini diabadikan menjadi nama **Bandar Udara Internasional Sultan Syarif Kasim II** dan **Universitas Islam Negeri (UIN) Sultan Syarif Kasim Riau** di Pekanbaru.',
    barokahHajat:
      'Peziarah, pemimpin pemerintahan, pelajar, dan dermawan yang berziarah ke maqbarah Sultan Syarif Kasim II di Siak Sri Indrapura umumnya bertawassul memohon kepada Allah SWT keikhlasan dalam menginfakkan harta di jalan kebaikan, amanah kepemimpinan yang mencintai rakyat dan tanah air, serta keberkahan ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Sultan Syarif Kasim II (Siak Sri Indrapura Riau)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ السَّيِّدِ الشَّرِيفِ قَاسِمْ الثَّانِي عَبْدِ الْجَلِيلِ سَيْفِ الدِّينِ وَوَالِدِهِ السُّلْطَانِ الشَّرِيفِ هَاشِمْ وَسَلَاطِينِ سِيَاكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْزِهِمْ عَنْ بِلَادِنَا خَيْرَ الْجَزَاءِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ السَّيِّدِ الشَّرِيفِ قَاسِمْ الثَّانِي عَبْدِ الْجَلِيلِ سَيْفِ الدِّينِ وَوَالِدِهِ السُّلْطَانِ الشَّرِيفِ هَاشِمْ وَسَلَاطِينِ سِيَاكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْزِهِمْ عَنْ بِلَادِنَا خَيْرَ الْجَزَاءِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahid as-Sayyidisy-Syariif Qaasim ats-Tsaanii 'Abdil-Jaliil Saifiddiin wa waalidihis-Sulthaanisy-Syariif Haasyim wa Salaathiini Siak syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wajzihim 'an bilaadinaa khairal-jazaa'i wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang Assayyidis Syarif Kasim II Abdul Jalil Saifuddin, ayahandanya Sultan Syarif Hasyim, beserta seluruh sultan Siak Sri Indrapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, balaslah jasa besar mereka bagi negeri kami dengan sebaik-baik balasan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang Assayyidis Syarif Kasim II Abdul Jalil Saifuddin, ayahandanya Sultan Syarif Hasyim, beserta seluruh sultan Siak Sri Indrapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, balaslah jasa besar mereka bagi negeri kami dengan sebaik-baik balasan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '23 April (Haul Wafatnya Sultan Syarif Kasim II) & 10 November / Hari Pahlawan (Ziarah Nasional di Kompleks Masjid Sultan Syahabuddin, Kecamatan Siak, Kabupaten Siak, Provinsi Riau).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (atau busana Melayu sopan), melepas alas kaki saat memasuki cungkup Makam Sultan Syarif Kasim II dan Masjid Sultan Syahabuddin, serta menjaga ketertiban kawasan cagar budaya Istana Siak.',
    facilities: ['Cungkup Utama Makam Sultan Syarif Kasim II', 'Masjid Raya Sultan Syahabuddin Siak (1926 M)', 'Istana Asserayah Hasyimiyah (Istana Siak) & Kompleks Makam Koto Tinggi', 'Area Parkir Luas Wisata Sejarah & Religi Tepian Sungai Siak'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Luthfi, Amir dkk. (1991). Sejarah Daerah Riau. Pekanbaru: Departemen Pendidikan dan Kebudayaan.',
      'Barnard, Timothy P. (2003). Multiple Centres of Authority: Society and Environment in Siak and Eastern Sumatra, 1674–1827. Leiden: KITLV Press.',
      'Pemerintah Kabupaten Siak (2005). Biografi Pahlawan Nasional Sultan Syarif Kasim II (1893–1968). Siak Sri Indrapura.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-abdurrahman-siddiq-sapat',
    name: 'Makam Syekh Abdurrahman Siddiq Al-Banjari (Tuan Guru Sapat — Kuala Indragiri, Indragiri Hilir)',
    title: 'Mufti Kerajaan Indragiri, Cicit Datuk Kalampayan Martapura & Pengarang Risalah Amal Ma’rifat',
    description:
      'Kompleks Cagar Budaya Kubah Makam dan Masjid Al-Hidayah Syekh Abdurrahman Siddiq bin Muhammad Afif Al-Banjari (Tuan Guru Sapat, 1857–1939 M) di Dusun Kampung Hidayat, Desa Teluk Dalam (Sapat), Kecamatan Kuala Indragiri (Kuindra), Kabupaten Indragiri Hilir, Provinsi Riau.',
    category: 'Ulama Nusantara',
    era: 'Paruh Kedua Abad ke-19 – Awal Abad ke-20 M (1857 M – 4 Sya’ban 1358 H / 10 Maret 1939 M)',
    province: 'Riau',
    city: 'Indragiri Hilir',
    district: 'Kec. Kuala Indragiri',
    address: 'Kampung Hidayat, Desa Teluk Dalam (Sapat), Kec. Kuala Indragiri (Kuindra), Kabupaten Indragiri Hilir',
    location: {
      lat: -0.3518,
      lng: 103.3245,
      address: 'Kampung Hidayat, Desa Teluk Dalam (Sapat), Kec. Kuala Indragiri (Kuindra), Kabupaten Indragiri Hilir',
      district: 'Kec. Kuala Indragiri',
      city: 'Indragiri Hilir',
      province: 'Riau',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Riau (Kompleks Kubah Makam & Masjid Al-Hidayah Tuan Guru Sapat Syekh Abdurrahman Siddiq di Indragiri Hilir)',
    sanad:
      'Syekh Abdurrahman Siddiq bin Muhammad ’Afif bin Mahmud bin Jamaluddin bin Syekh Muhammad Arsyad Al-Banjari (Datuk Kalampayan Martapura); menuntut ilmu di Dalam Pagar Martapura, Padang, lalu bermukim 7 tahun di Makkah (1882–1889 M) berguru kepada Sayyid Bakri Syatha (pengarang I’anatuth Thalibin), Syaikh Ahmad Dimyathi, Syaikh Nawawi Al-Bantani, dan Syaikh Sa’id Babashil.',
    karya: [
      'Lebih dari 18 kitab bahasa Melayu Jawi yang dicetak di Singapura, Kairo, dan Makkah, di antaranya: Risalah ’Amal Ma’rifat (Tasawuf), Asrarus Shalat, Risalah Syajaratul Arsyadiyah (Silsilah Datuk Kalampayan), ’Aqaidul Iman, dan Syair Ibarat dan Khabar Kiamat',
      'Pembukaan Kampung Hidayat di Sapat dan pembangunan Masjid Al-Hidayah Sapat (1927 M) dengan arsitektur kayu ulin/belian kuno',
      'Pengabdian sebagai Mufti Agung Kerajaan Indragiri di Rengat selama 27 tahun (1910–1937 M) atas pengangkatan Sultan Mahmud Syah',
    ],
    history:
      '**Syekh Abdurrahman Siddiq bin Muhammad ’Afif Al-Banjari**—yang sangat dimuliakan di Riau, Kepulauan Bangka Belitung, Jambi, Kalimantan Selatan, hingga Malaysia dan Singapura dengan gelar **Tuan Guru Sapat** atau **Datu Sapat** (lahir di Dalam Pagar, Martapura, Kalimantan Selatan pada tahun **1274 H / 1857 M** dan wafat di Sapat, Indragiri Hilir pada **4 Sya’ban 1358 H / 10 Maret 1939 M**)—adalah buyut (keturunan ke-4) dari maha guru ulama Kalimantan, **Syekh Muhammad Arsyad Al-Banjari (Datuk Kalampayan)**. Setelah menuntut ilmu kepada bibinya yang alim (Nyai Sa’idah dan Nyai Khatimah) di Martapura serta merantau ke Padang, beliau bermukim di Makkah Al-Mukarramah selama 7 tahun (**1882–1889 M**) dan menjadi murid kesayangan **Sayyid Abu Bakar Syatha Ad-Dimyathi**, **Syaikh Nawawi Al-Bantani**, dan **Syaikh Ahmad Zaini Dahlan** hingga diberi gelar kehormatan **Ash-Shiddiq** karena kejujuran dan kedalaman ilmunya.\n\nSekembalinya dari Tanah Suci, beliau berdakwah dengan penuh kesabaran selama **12 tahun di Muntok, Pulau Bangka (1890–1902 / 1910 M)** sebelum akhirnya berhijrah membuka hutan rawa pasang surut di **Parit Hidayat, Sapat (Desa Teluk Dalam, Kecamatan Kuala Indragiri, Kabupaten Indragiri Hilir, Riau)**. Bersama para muridnya, beliau menggali parit irigasi, membuka ribuan hektare kebun kelapa mandiri untuk membiayai santri secara gratis, dan mendirikan **Masjid Al-Hidayah Kampung Hidayat**. Kemasyhuran ilmunya membuat Sultan Indragiri, **Sultan Mahmud Syah**, mengangkat beliau sebagai **Mufti Kerajaan Indragiri (1910–1937 M)** meski beliau menolak gaji dari pemerintah kolonial Belanda.\n\nTuan Guru Sapat sangat produktif menulis **18 kitab** dalam bidang tauhid, fikih Syafi’i, tasawuf, dan sastra syair (seperti *Risalah ’Amal Ma’rifat*, *Asrarus Shalat*, dan *Syair Ibarat dan Khabar Kiamat*) yang dicetak oleh Mathba’ah Al-Ahmadiah Singapura. Beliau wafat pada tanggal **4 Sya’ban 1358 H (1939 M)** dan dimakamkan di dalam **Kubah Maqbarah Kampung Hidayat Sapat, Kecamatan Kuala Indragiri, Kabupaten Indragiri Hilir**.',
    karomah: [
      'Dalam kitab manaqib *Tuan Guru Sapat* dan kesaksian masyarakat Indragiri Hilir serta Banjar, karomah paling nyata dari Syekh Abdurrahman Siddiq adalah sifat *wara’* dan kemandirian ekonominya: ketika diangkat menjadi Mufti Kerajaan Indragiri, beliau tidak mau menerima satu sen pun uang gaji yang bersumber dari kas kolonial Belanda, melainkan menghidupi seluruh keluarga dan ribuan santrinya dari hasil perkebunan kelapa yang beliau tanam sendiri di Kampung Hidayat Sapat.<!--more-->\n\nSetiap peringatan **Haul Akbar Tuan Guru Sapat** pada bulan **Sya’ban**, puluhan kapal *speedboat* dan pompong membawa puluhan ribu peziarah dari Tembilahan, Pekanbaru, Tanjungpinang, Jambi, Bangka, hingga Banjarmasin/Martapura melintasi muara Sungai Indragiri menuju dermaga Kampung Hidayat Sapat.',
    ],
    untoldStory:
      'Syekh Abdurrahman Siddiq Al-Banjari adalah penyusun kitab **Risalah Syajaratul Arsyadiyah**, yakni kitab silsilah genealogis resmi pertama yang mencatat seluruh cabang keturunan **Syekh Muhammad Arsyad Al-Banjari (Datuk Kalampayan)** yang tersebar di Kalimantan, Sumatera, Jawa, dan Semenanjung Malaya.<!--more-->\n\nDi Kompleks Kampung Hidayat Sapat, tepat di dekat kubah makam beliau, masih berdiri kokoh **Masjid Al-Hidayah Sapat (dibangun tahun 1927 M)** dengan tiang-tiang kayu ulin dan mimbar ukir kuno asli peninggalan tangan Tuan Guru Sapat.',
    barokahHajat:
      'Peziarah dan santri yang menyeberangi sungai untuk berziarah ke maqbarah Syekh Abdurrahman Siddiq (Tuan Guru Sapat) di Kuala Indragiri umumnya bertawassul memohon kepada Allah SWT kemurnian tauhid dan *ma’rifatullah*, keberkahan usaha pertanian/perkebunan yang halal dan mandiri, serta ketersambungan berkah ulama Datuk Kalampayan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdurrahman Siddiq Al-Banjari (Tuan Guru Sapat Indragiri Hilir)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْمُفْتِي الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الرَّحْمٰنِ الصِّدِّيقِ بْنِ مُحَمَّدْ عَفِيفْ الْبَنْجَرِيِّ (تُوَانْ غُورُو سَافَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَارْزُقْنَا صِدْقَ التَّوَكُّلِ وَالْمَعْرِفَةِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْمُفْتِي الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الرَّحْمٰنِ الصِّدِّيقِ بْنِ مُحَمَّدْ عَفِيفْ الْبَنْجَرِيِّ (تُوَانْ غُورُو سَافَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَارْزُقْنَا صِدْقَ التَّوَكُّلِ وَالْمَعْرِفَةِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimir-Rabbaaniyyi wal-Muftil-'Aarifi billaah asy-Syaikh 'Abdir-Rahmaan ash-Shiddiiq bin Muhammad 'Afiif al-Banjarii (Tuan Guru Sapat) syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu warzuqnaa shidqat-tawakkuli wal-ma'rifati wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan mufti arif billah Syekh Abdurrahman Siddiq bin Muhammad Afif Al-Banjari (Tuan Guru Sapat), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, karuniakanlah kepada kami kejujuran tawakkal dan makrifat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan mufti arif billah Syekh Abdurrahman Siddiq bin Muhammad Afif Al-Banjari (Tuan Guru Sapat), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, karuniakanlah kepada kami kejujuran tawakkal dan makrifat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '4–5 Sya’ban (Puncak Haul Akbar Tahunan Syekh Abdurrahman Siddiq Al-Banjari / Tuan Guru Sapat di Kampung Hidayat, Desa Teluk Dalam, Kecamatan Kuala Indragiri, Kabupaten Indragiri Hilir, Provinsi Riau).',
    localAdab:
      'Perjalanan menuju Kampung Hidayat Sapat ditempuh menggunakan speedboat/pompong dari Pelabuhan Tembilahan (sekitar 30–40 menit); peziarah wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki di pelataran jembatan kayu menuju Kubah Makam dan Masjid Al-Hidayah, serta menjaga ketertiban.',
    facilities: ['Kubah Utama Maqbarah Syekh Abdurrahman Siddiq (Tuan Guru Sapat)', 'Masjid Bersejarah Al-Hidayah Kampung Hidayat (1927 M)', 'Dermaga Pelabuhan Wisata Religi Kampung Hidayat Sapat', 'Balai Istirahat Peziarah Kuala Indragiri'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Alhamidi, M. Nazir Karim (1992). Syeikh Abdurrahman Siddiq Al-Banjari: Ulama dan Sastrawan di Kerajaan Indragiri. Pekanbaru: Susqa Press.',
      'Daudi, Abu (1996). Maulana Syekh Muhammad Arsyad Al-Banjari (Tuan Haji Besar) dan Keturunannya. Martapura: Yapida.',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'marhum-pekan-senapelan',
    name: 'Makam Marhum Pekan (Sultan Muhammad Ali) & Marhum Bukit (Kompleks Masjid Raya Senapelan, Pekanbaru)',
    title: 'Pendiri Kota Pekanbaru (23 Juni 1784 M), Pembangun Masjid Raya Pekanbaru (1762 M) & Sultan Siak ke-5',
    description:
      'Kompleks Cagar Budaya Nasional Makam Marhum Pekan (Sultan Muhammad Ali Abdul Jalil Muazzam Syah, wafat 1791 M) dan ayahandanya Marhum Bukit (Sultan Alamuddin Syah, wafat 1766 M) di halaman Masjid Raya Pekanbaru, Kelurahan Kampung Bandar, Kecamatan Senapelan, Kota Pekanbaru, Provinsi Riau.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Sultan Alamuddin wafat 1766 M; Sultan Muhammad Ali wafat 1791 M)',
    province: 'Riau',
    city: 'Pekanbaru',
    district: 'Kec. Senapelan',
    address: 'Kompleks Masjid Raya Pekanbaru, Jl. Senapelan, Kel. Kampung Bandar, Kec. Senapelan, Kota Pekanbaru',
    location: {
      lat: 0.5382,
      lng: 101.4425,
      address: 'Kompleks Masjid Raya Pekanbaru, Jl. Senapelan, Kel. Kampung Bandar, Kec. Senapelan, Kota Pekanbaru',
      district: 'Kec. Senapelan',
      city: 'Pekanbaru',
      province: 'Riau',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Kota Pekanbaru (Kompleks Masjid Raya Senapelan & Makam Marhum Pekan di Pekanbaru Riau)',
    sanad:
      'Sultan Muhammad Ali Abdul Jalil Muazzam Syah (Marhum Pekan, Sultan Siak ke-5) bin Sultan Abdul Jalil Alamuddin Syah (Marhum Bukit, Sultan Siak ke-4) bin Raja Kecil (Sultan Abdul Jalil Rahmat Syah, pendiri Kesultanan Siak); dibimbing oleh ulama besar Sayyid Utsman bin Syahabuddin.',
    karya: [
      'Pemindahan pusat pemerintahan ke Senapelan dan pembangunan Masjid Raya Pekanbaru (Masjid Alam) pada tahun 1762 M',
      'Pendirian pasar niaga baru (Pekan Baharu) di tepi Sungai Siak pada Selasa, 21 Rajab 1204 H / 23 Juni 1784 M yang menjadi hari jadi resmi Kota Pekanbaru',
      'Perlawanan maritim terhadap monopoli VOC Belanda di Selat Malaka bersama ulama dan panglima Siak',
    ],
    history:
      'Sejarah berdirinya **Kota Pekanbaru** (ibu kota Provinsi Riau) dan penyebaran syiar Islam di hulu Sungai Siak tidak dapat dipisahkan dari dua sosok sultan agung Kesultanan Siak yang dimakamkan di **Kompleks Masjid Raya Senapelan**: yakni **Sultan Abdul Jalil Alamuddin Syah (Marhum Bukit, Sultan Siak ke-4)** dan putranya **Sultan Muhammad Ali Abdul Jalil Muazzam Syah (Marhum Pekan, Sultan Siak ke-5)**. Pada tahun **1762 M**, untuk menghindari intervensi politik kolonial Belanda di hilir sungai (Mempura), Sultan Alamuddin Syah memindahkan pusat kerajaannya ke daerah perbukitan **Senapelan** di tepi Sungai Siak dan langsung mendirikan **Masjid Alam (kini Masjid Raya Pekanbaru, masjid tertua di Provinsi Riau)** sebelum beliau wafat pada tahun **1766 M** dan digelari **Marhum Bukit**.\n\nKepemimpinan Senapelan dilanjutkan oleh putranya, **Sultan Muhammad Ali Abdul Jalil Muazzam Syah** (memerintah sebagai Sultan Siak 1766–1779 M, lalu menjabat sebagai *Raja Tua* pendamping Sultan Yahya). Dengan visi kemaritiman dan ekonomi Islam yang tajam, Sultan Muhammad Ali bersama Dewan Menteri Empat Suku memprakarsai pembukaan pusat pasar perdagangan baru (**Pekan Baharu**) di pelabuhan Senapelan yang menghubungkan saudagar dataran tinggi Minangkabau (Petapahan) dengan jalur pelayaran Selat Malaka pada hari **Selasa, 21 Rajab 1204 H (23 Juni 1784 M)**—tanggal yang kini ditetapkan sebagai **Hari Jadi Kota Pekanbaru**.\n\nSultan Muhammad Ali wafat pada tahun **1791 M** dan diberi gelar anumerta **Marhum Pekan**. Beliau dimakamkan bersama ayahandanya (**Marhum Bukit**), **Sultan Usman Syah (Marhum Damai)**, dan kerabat diraja di dalam **Kompleks Cagar Budaya Nasional Makam Marhum Pekan** tepat di pelataran timur **Masjid Raya Pekanbaru, Kelurahan Kampung Bandar, Kecamatan Senapelan, Kota Pekanbaru**.',
    karomah: [
      'Dalam tradisi masyarakat Melayu Pekanbaru, kemuliaan *Marhum Bukit* dan *Marhum Pekan* tampak dari bagaimana mereka meletakkan pembangunan **Masjid Raya Senapelan (1762 M)** dan **Sumur Tua Masjid Raya** sebagai fondasi pertama sebelum membangun istana dan pasar, sehingga perkembangan Pekanbaru dari sebuah kampung sungai kecil menjadi kota metropolitan tetap berporos pada nilai-nilai Melayu-Islam.<!--more-->\n\nHingga kini, setiap menjelang bulan suci Ramadhan (**Tradisi Petang Megang / Mandi Balimau Kasai**) dan peringatan Hari Jadi Kota Pekanbaru (23 Juni), Gubernur Riau, Wali Kota Pekanbaru, tokoh Lembaga Adat Melayu (LAM) Riau, dan ribuan warga selalu mengawali rangkaian acara dengan berziarah dan bertahlil di Makam Marhum Pekan di Masjid Raya Senapelan.',
    ],
    untoldStory:
      'Di dalam kompleks pemakaman Masjid Raya Senapelan Pekanbaru terdapat beberapa cungkup utama: cungkup **Marhum Bukit (Sultan Alamuddin Syah)**, cungkup **Marhum Pekan (Sultan Muhammad Ali)**, serta makam **Sayyid Syarif Utsman Syahabuddin** / kerabat ulama kesultanan yang menjadi penasihat agama istana.<!--more-->\n\nDi halaman Masjid Raya Pekanbaru juga masih terjaga **Sumur Tua Abad ke-18** peninggalan masa Sultan Alamuddin Syah yang airnya tetap jernih dan digunakan oleh para peziarah untuk berwudhu.',
    barokahHajat:
      'Peziarah, pelaku usaha perdagangan/pasar, dan masyarakat Pekanbaru yang berziarah ke maqbarah Marhum Pekan dan Marhum Bukit di Senapelan Pekanbaru umumnya bertawassul memohon kepada Allah SWT kemajuan usaha perniagaan (*Pekan Baharu*) yang berkah, ketenteraman Kota Pekanbaru, serta keselamatan menyambut bulan suci Ramadhan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Marhum Pekan (Sultan Muhammad Ali) & Marhum Bukit (Sultan Alamuddin Syah Senapelan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ عَبْدِ الْجَلِيلِ عَلَامِ الدِّينِ شَاهْ (مَرْحُومْ بُوكِيتْ) وَوَلَدِهِ السُّلْطَانِ مُحَمَّدْ عَلِيّ عَبْدِ الْجَلِيلِ مُعَظَّمْ شَاهْ (مَرْحُومْ فِيكَانْ) وَمُؤَسِّسِي فِيكَانْبَارُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي بَلْدَتِنَا وَأَرْزَاقِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ عَبْدِ الْجَلِيلِ عَلَامِ الدِّينِ شَاهْ (مَرْحُومْ بُوكِيتْ) وَوَلَدِهِ السُّلْطَانِ مُحَمَّدْ عَلِيّ عَبْدِ الْجَلِيلِ مُعَظَّمْ شَاهْ (مَرْحُومْ فِيكَانْ) وَمُؤَسِّسِي فِيكَانْبَارُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي بَلْدَتِنَا وَأَرْزَاقِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan 'Abdil-Jaliil 'Alaamiddiin Syaah (Marhum Bukit) wa waladihis-Sulthaan Muhammad 'Alii 'Abdil-Jaliil Mu'azhzham Syaah (Marhum Pekan) wa Mu-assisii Pekanbaru syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik fii baldatinaa wa arzaaqinaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Abdul Jalil Alamuddin Syah (Marhum Bukit), putranya Sultan Muhammad Ali Abdul Jalil Muazzam Syah (Marhum Pekan), beserta para pendiri Kota Pekanbaru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah kota dan rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Abdul Jalil Alamuddin Syah (Marhum Bukit), putranya Sultan Muhammad Ali Abdul Jalil Muazzam Syah (Marhum Pekan), beserta para pendiri Kota Pekanbaru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah kota dan rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Sehari Menjelang 1 Ramadhan (Tradisi Ziarah Kubro Petang Megang Pekanbaru) & 23 Juni / 21 Rajab (Ziarah Hari Jadi Kota Pekanbaru di Kompleks Masjid Raya Senapelan, Kota Pekanbaru).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah atau busana Melayu yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Cagar Budaya Makam Marhum Pekan dan Masjid Raya Pekanbaru, serta menjaga ketertiban.',
    facilities: ['Cungkup Cagar Budaya Nasional Makam Marhum Pekan & Marhum Bukit', 'Masjid Raya Pekanbaru (Didirikan 1762 M)', 'Sumur Tua Abad ke-18 Masjid Raya Senapelan', 'Tepian Sungai Siak & Area Parkir Wisata Religi Senapelan Pekanbaru'],
    openingHours: 'Buka Setiap Hari 06.00 – 21.00 WIB',
    references: [
      'Suwardi MS dkk. (2006). Sejarah Perjuangan Rakyat Riau dan Berdirinya Kota Pekanbaru. Pekanbaru: Unri Press.',
      'Barnard, Timothy P. (2003). Multiple Centres of Authority: Society and Environment in Siak and Eastern Sumatra, 1674–1827. Leiden: KITLV Press.',
      'Balai Pelestarian Cagar Budaya (BPCB) Sumatera Barat–Riau–Kepri — Monografi Situs Cagar Budaya Makam Marhum Pekan Senapelan Pekanbaru.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 5. PROVINSI KEPULAUAN RIAU (BUNDA TANAH MELAYU)
  // =========================================================================
  {
    id: 'raja-ali-haji-penyengat',
    name: 'Makam Raja Ali Haji & Engku Putri Raja Hamidah (Pulau Penyengat, Tanjungpinang)',
    title: 'Pahlawan Nasional, Bapak Bahasa Indonesia Baku, Sejarawan Tuhfat Al-Nafis & Pengarang Gurindam Dua Belas',
    description:
      'Kompleks Cagar Budaya Nasional Makam Engku Putri Raja Hamidah dan Raja Ali Haji bin Raja Ahmad (1808–1873 M) di Pulau Penyengat Inderasakti, Kelurahan Penyengat, Kecamatan Tanjungpinang Kota, Kota Tanjungpinang, Provinsi Kepulauan Riau.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 M (1808 – ~1873 M)',
    province: 'Kepulauan Riau',
    city: 'Tanjungpinang',
    district: 'Kec. Tanjungpinang Kota',
    address: 'Kompleks Makam Engku Putri, Pulau Penyengat, Kel. Penyengat, Kec. Tanjungpinang Kota, Kota Tanjungpinang',
    location: {
      lat: 0.9278,
      lng: 104.4192,
      address: 'Kompleks Makam Engku Putri, Pulau Penyengat, Kel. Penyengat, Kec. Tanjungpinang Kota, Kota Tanjungpinang',
      district: 'Kec. Tanjungpinang Kota',
      city: 'Tanjungpinang',
      province: 'Kepulauan Riau',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Nasional Pulau Penyengat (Masjid Raya Sultan Riau & Kompleks Makam Engku Putri serta Raja Ali Haji di Tanjungpinang)',
    sanad:
      'Raja Ali Haji bin Raja Ahmad (Engku Haji Tua) bin Raja Haji Fisabilillah (Yang Dipertuan Muda Riau IV); berhaji dan menuntut ilmu di Makkah serta Kairo (1828 M) kepada Syaikh Daud bin Abdullah Al-Fathani; mursyid dan pengamal Thariqah Naqsyabandiyah di Pulau Penyengat.',
    karya: [
      'Gurindam Dua Belas (1847 M) — mahakarya puisi didaktik tasawuf dan akhlak Melayu yang terpahat di dinding makam beliau',
      'Kitab Tuhfat Al-Nafis (Bingkisan Berharga, 1865 M) dan Silsilah Melayu dan Bugis (historiografi standar dunia Melayu-Nusantara)',
      'Kitab Bustanul Katibin (1850 M, tata bahasa Melayu pertama) dan Kitab Pengetahuan Bahasa (kamus ensiklopedis bahasa Melayu yang menjadi cikal bakal Bahasa Indonesia) serta Tsamarat Al-Muhimmah (ketatanegaraan Islam)',
    ],
    history:
      '**Raja Ali Haji bin Raja Ahmad** (lahir di Selangor/Penyengat sekitar tahun **1808 M** dan wafat di Pulau Penyengat sekitar tahun **1873 M**; ditetapkan sebagai **Pahlawan Nasional RI** melalui **Keppres No. 089/TK/2004 tanggal 5 November 2004**) adalah ulama besar, sejarawan, pakar hukum tata negara Islam, sekaligus **Bapak Bahasa Melayu Tinggi (cikal bakal Bahasa Indonesia)**. Beliau adalah cucu kandung dari pahlawan besar syahid perang melawan Belanda di Teluk Ketapang, **Raja Haji Fisabilillah** (Yang Dipertuan Muda Riau IV). Pada tahun **1828 M**, Raja Ali Haji mendampingi ayahandanya (**Raja Ahmad / Engku Haji Tua**) menunaikan ibadah haji dan menuntut ilmu bahasa Arab, fikih Syafi’i, dan tasawuf di Makkah Al-Mukarramah (termasuk berguru kepada **Syaikh Daud bin Abdullah Al-Fathani**).\n\nSekembalinya ke **Pulau Penyengat Inderasakti**—pulau kecil bersejarah di seberang Kota Tanjungpinang yang dihadiahkan oleh Sultan Mahmud Syah III sebagai maskawin kepada permaisurinya, **Engku Putri Raja Hamidah** (putri Raja Haji Fisabilillah, pemegang *Regalia* / Alat Kebesaran Kerajaan Riau-Lingga)—Raja Ali Haji menjadikan Pulau Penyengat sebagai pusat intelektual dan literasi Islam terbesar di dunia Melayu abad ke-19 (melalui perkumpulan cendekiawan *Rusydiyah Club* dan percetakan *Mathba’at Al-Riauwiyyah*). Beliau juga menjabat sebagai penasihat agama (*Ahlul Halli wal ’Aqdi*) bagi para Yang Dipertuan Muda Riau dan mursyid **Thariqah Naqsyabandiyah**.\n\nMahakarya sastra-tasawuf beliau yang paling monumental adalah **Gurindam Dua Belas** (ditulis pada 23 Rajab 1263 H / 1847 M), yang merangkum tahapan *syariat, tarekat, hakikat, dan ma’rifat* dalam bait-bait dua baris yang sangat indah (*"Barang siapa mengenal yang empat / Maka ia itulah orang yang ma’rifat"*). Beliau juga menulis kitab sejarah **Tuhfat Al-Nafis**, kitab ketatanegaraan **Tsamarat Al-Muhimmah**, dan tata bahasa Melayu **Bustanul Katibin** yang menjadi fondasi Bahasa Indonesia modern. Setelah wafat sekitar tahun **1873 M**, Raja Ali Haji dimakamkan di **Kompleks Makam Engku Putri Raja Hamidah, Pulau Penyengat, Kota Tanjungpinang**.',
    karomah: [
      'Dalam kajian filologi Virginia Matheson Hooker (*Tuhfat al-Nafis*) dan Jan van der Putten, keistimewaan luar biasa Raja Ali Haji dan Pulau Penyengat adalah bagaimana sebuah pulau kecil berukuran panjang hanya 2 kilometer mampu melahirkan standar bahasa persatuan (**Bahasa Melayu Riau**) yang pada Sumpah Pemuda 28 Oktober 1928 diangkat menjadi **Bahasa Indonesia** bagi ratusan juta rakyat Nusantara.<!--more-->\n\nDi Pulau Penyengat juga berdiri megah **Masjid Raya Sultan Riau Penyengat** (dibangun tahun 1832 M pada masa Yang Dipertuan Muda Raja Abdurrahman) yang perekat bangunannya menggunakan campuran kapur dan putih telur serta menyimpan mushaf Al-Qur’an tulis tangan abad ke-19.',
    ],
    untoldStory:
      'Di dalam **Kompleks Makam Engku Putri** di Pulau Penyengat, pusara **Raja Ali Haji** berada tepat di sisi luar cungkup utama tempat bersemayamnya bibi beliau, **Engku Putri Raja Hamidah** (wafat 1844 M), **Raja Ahmad (Engku Haji Tua)**, dan **Raja Abdullah (Yang Dipertuan Muda Riau IX, mursyid Thariqah Naqsyabandiyah)**. Adapun di bukit selatan pulau terdapat **Makam Pahlawan Nasional Raja Haji Fisabilillah** dan **Habib Syaikh bin Alwi Assegaf**.<!--more-->\n\nPada dinding kompleks makam Raja Ali Haji di Pulau Penyengat terpahat lengkap seluruh dua belas pasal **Gurindam Dua Belas**, sehingga setiap peziarah dapat berdoa sekaligus merenungi wasiat hikmah sang ulama-pujangga.',
    barokahHajat:
      'Peziarah, sastrawan, akademisi, dan pelajar yang menyeberang dengan *pompong* ke Pulau Penyengat Tanjungpinang untuk berziarah ke maqbarah Raja Ali Haji dan Engku Putri umumnya bertawassul memohon kepada Allah SWT kecerdasan akal budi (*"Jika hendak mengenal orang berbangsa, lihat kepada budi dan bahasa"*), keberkahan karya tulis dan ilmu pengetahuan, serta kemuliaan akhlak.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Raja Ali Haji, Raja Haji Fisabilillah & Engku Putri (Pulau Penyengat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّهِيدِ رَاجَا حَاجّ فِي سَبِيلِ اللهِ وَابْنَتِهِ إِينْغكُو فُوتْرِي رَاجَا حَمِيدَةْ وَالْعَالِمِ الْأَدِيبِ رَاجَا عَلِيّ حَاجّ بِنْ رَاجَا أَحْمَدْ فِينْيِينْغَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَزِدْنَا عِلْمًا وَأَدَبًا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّهِيدِ رَاجَا حَاجّ فِي سَبِيلِ اللهِ وَابْنَتِهِ إِينْغكُو فُوتْرِي رَاجَا حَمِيدَةْ وَالْعَالِمِ الْأَدِيبِ رَاجَا عَلِيّ حَاجّ بِنْ رَاجَا أَحْمَدْ فِينْيِينْغَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَزِدْنَا عِلْمًا وَأَدَبًا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syahiid Raja Haji Fisabilillah wabnatihii Engku Putri Raja Hamidah wal-'Aalimil-Adiib Raja 'Alii Haajj bin Raja Ahmad Penyengat syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa zidnaa 'ilman wa adaban wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pahlawan syahid Raja Haji Fisabilillah, putrinya Engku Putri Raja Hamidah, dan ulama pujangga Raja Ali Haji bin Raja Ahmad Pulau Penyengat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tambahkanlah kepada kami ilmu dan adab yang luhur, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pahlawan syahid Raja Haji Fisabilillah, putrinya Engku Putri Raja Hamidah, dan ulama pujangga Raja Ali Haji bin Raja Ahmad Pulau Penyengat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tambahkanlah kepada kami ilmu dan adab yang luhur, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '28 Oktober (Refleksi Hari Sumpah Pemuda & Bahasa Indonesia) serta Bulan Rajab / Sya’ban (Ziarah Kubro Kesultanan Riau-Lingga di Kompleks Makam Engku Putri & Raja Ali Haji, Pulau Penyengat, Kota Tanjungpinang).',
    localAdab:
      'Pulau Penyengat ditempuh sekitar 10–15 menit naik perahu motor tradisional (pompong) dari Dermaga Penyengat Tanjungpinang; peziarah wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (baju kurung Melayu sangat dianjurkan), melepas alas kaki di kompleks makam, serta menjaga ketertiban pulau cagar budaya.',
    facilities: ['Kompleks Cagar Budaya Nasional Makam Engku Putri & Raja Ali Haji', 'Masjid Raya Sultan Riau Pulau Penyengat (1832 M)', 'Kompleks Makam Raja Haji Fisabilillah & Raja Ja’far', 'Dermaga Pompong & Becak Motor Wisata Pulau Penyengat'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Hooker, Virginia Matheson (Ed.) (1991). Tuhfat al-Nafis: Sejarah Melayu-Islam Karya Raja Ali Haji. Kuala Lumpur: Dewan Bahasa dan Pustaka.',
      'Putten, Jan van der & Al Azhar (1995). Di Dalam Berkekalan Persahabatan: Surat-Surat Raja Ali Haji kepada Von de Wall. Leiden: University of Leiden.',
      'Junus, Hasan (2002). Raja Ali Haji Budayawan di Gerbang Abad XX. Pekanbaru: Unri Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-mahmud-riayat-syah-lingga',
    name: 'Makam Sultan Mahmud Riayat Syah / Sultan Mahmud Syah III (Kompleks Masjid Sultan Lingga, Daik, Kabupaten Lingga)',
    title: 'Pahlawan Nasional, Pemimpin Perang Maritim Melawan VOC & Pendiri Pusat Kesultanan Riau–Lingga–Johor–Pahang di Daik Lingga',
    description:
      'Kompleks Cagar Budaya Nasional Makam Merah Sultan Mahmud Riayat Syah (1760–1812 M) tepat di belakang Masjid Jami’ Sultan Lingga, Kelurahan Daik, Kecamatan Lingga, Kabupaten Lingga, Provinsi Kepulauan Riau.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Awal Abad ke-19 M (24 Maret 1760 – 12 Januari 1812 M)',
    province: 'Kepulauan Riau',
    city: 'Lingga',
    district: 'Kec. Lingga',
    address: 'Kompleks Masjid Sultan Lingga (Makam Merah), Kel. Daik, Kec. Lingga, Kabupaten Lingga',
    location: {
      lat: -0.2145,
      lng: 104.6238,
      address: 'Kompleks Masjid Sultan Lingga (Makam Merah), Kel. Daik, Kec. Lingga, Kabupaten Lingga',
      district: 'Kec. Lingga',
      city: 'Lingga',
      province: 'Kepulauan Riau',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Kepulauan Riau (Masjid Sultan Lingga & Kompleks Makam Merah Sultan Mahmud Riayat Syah di Daik Lingga)',
    sanad:
      'Paduka Sri Sultan Mahmud Riayat Syah Zillullah fil ’Alam bin Sultan Abdul Jalil Muazzam Syah (Sultan ke-15 Imperium Johor–Pahang–Riau–Lingga); dibimbing dalam perjuangan oleh pamannya Raja Haji Fisabilillah serta para ulama tarekat dan habaib di Daik Lingga.',
    karya: [
      'Kepemimpinan perang gerilya laut di Selat Malaka dan Laut Tiongkok Selatan yang menghancurkan armada VOC Belanda di Tanjungpinang (1784–1787 M)',
      'Pemindahan ibu kota imperium Melayu dari Hulu Riau (Bintan) ke Daik Lingga pada tahun 1787 M dan pembangunan Masjid Jami’ Sultan Lingga (1800 M)',
      'Penyatuan empat wilayah besar Melayu (Johor, Pahang, Riau, dan Lingga) di bawah payung syariat dan adat Melayu',
    ],
    history:
      '**Sultan Mahmud Riayat Syah**—atau dikenal juga sebagai **Sultan Mahmud Syah III** dan bergelar anumerta **Marhum Masjid** (lahir di Hulu Riau, Bintan pada **24 Maret 1760 M** dan wafat di Daik Lingga pada **12 Januari 1812 M / 27 Dzulhijjah 1226 H**; ditetapkan sebagai **Pahlawan Nasional RI** oleh Presiden Joko Widodo melalui **Keppres No. 115/TK/Tahun 2017 tanggal 6 November 2017**)—adalah maharaja besar **Kesultanan Johor–Pahang–Riau–Lingga** yang menolak tunduk pada hegemoni kolonial Belanda di Selat Malaka. Dinobatkan sejak usia belia (1761 M), beliau tumbuh menjadi pemimpin pemberani yang bersama pamannya, **Raja Haji Fisabilillah**, mengobarkan perang semesta melawan armada VOC Belanda (1782–1784 M).\n\nKetika Belanda berupaya mengekang kedaulatan Riau melalui perjanjian paksa, Sultan Mahmud Riayat Syah melancarkan serangan balasan bersama armada *Lanun/Ilanun* pada Mei **1787 M** hingga menghancurkan garnisun Belanda di Tanjungpinang. Demi membangun pangkalan pertahanan dan peradaban Islam yang tidak mudah dijangkau kapal meriam Belanda, pada tahun **1787 M** Sultan Mahmud Riayat Syah mengambil langkah strategis besar (*hijrah*) dengan memindahkan seluruh pusat pemerintahan kerajaan bersama 200 kapal rakyat menuju **Daik di Pulau Lingga** (di kaki Gunung Daik yang bercabang tiga), sehingga Daik Lingga dijuluki **Bunda Tanah Melayu**.\n\nDi Daik Lingga, Sultan Mahmud Riayat Syah mendirikan **Masjid Jami’ Sultan Lingga** sekitar tahun **1800 M** (masjid kuno berkonstruksi tanpa tiang penyangga tengah dengan mimbar kayu berukir kaligrafi tahun 1215 H) serta mengundang para ulama besar untuk mengajar fikih dan tasawuf. Beliau wafat pada tanggal **12 Januari 1812 M** dan dimakamkan di dalam cungkup bata berpagar tembok merah (**Kompleks Makam Merah**) tepat di belakang mihrab **Masjid Sultan Lingga, Kelurahan Daik, Kecamatan Lingga, Kabupaten Lingga**, sehingga beliau masyhur disebut **Marhum Masjid**.',
    karomah: [
      'Dalam kitab *Tuhfat al-Nafis* karya Raja Ali Haji dan kajian sejarawan Inggris R.O. Winstedt, kemuliaan Sultan Mahmud Riayat Syah tercatat dari kecerdikan diplomasi dan keberanian maritimnya yang membuat Gubernur Jenderal VOC di Batavia kewalahan hingga bangkrutnya VOC pada akhir abad ke-18, sekaligus menjadikan Daik Lingga sebagai pusat peradaban Islam-Melayu yang berdaulat selama lebih dari satu abad.<!--more-->\n\nKarena ketaatan beliau memakmurkan masjid yang dibangunnya hingga wafat dan dimakamkan tepat di belakang kiblat Masjid Sultan Lingga, masyarakat Melayu secara turun-temurun memuliakan beliau dengan gelar **Marhum Masjid**.',
    ],
    untoldStory:
      'Di dalam **Masjid Jami’ Sultan Lingga** di Daik (yang ditetapkan sebagai Cagar Budaya Nasional), masih tersimpan artefak asli peninggalan masa Sultan Mahmud Riayat Syah tahun 1800 M: berupa **Mimbar Kayu Jati Ukir Kaligrafi**, **Bedug Kuno**, serta tata ruang atap limas bersusun tiga tanpa tiang tengah.<!--more-->\n\nDi Kabupaten Lingga, selain berziarah ke **Makam Merah Sultan Mahmud Riayat Syah**, peziarah juga dapat mengunjungi **Kompleks Makam Bukit Cengkeh** (makam Sultan Muhammad Syah dan Sultan Mahmud Muzaffar Syah) serta **Situs Istana Damnah** di kaki Gunung Daik.',
    barokahHajat:
      'Peziarah, prajurit bahari, dan masyarakat Kepulauan Riau yang berziarah ke maqbarah Sultan Mahmud Riayat Syah (Marhum Masjid) di Daik Lingga umumnya bertawassul memohon kepada Allah SWT keteguhan hati dalam mempertahankan kehormatan dan kedaulatan negeri, kecintaan memakmurkan masjid, serta keberkahan tanah Melayu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Sultan Mahmud Riayat Syah (Marhum Masjid Daik Lingga)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ مَحْمُودْ رِعَايَةْ شَاهْ (مَرْحُومْ مَسْجِدْ) وَسَلَاطِينِ وَعُلَمَاءِ دَائِيكْ لِينْغغَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنْ عُمَّارِ مَسَاجِدِكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ مَحْمُودْ رِعَايَةْ شَاهْ (مَرْحُومْ مَسْجِدْ) وَسَلَاطِينِ وَعُلَمَاءِ دَائِيكْ لِينْغغَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنْ عُمَّارِ مَسَاجِدِكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahid Mahmuud Ri'aayat Syaah (Marhum Masjid) wa Salaathiini wa 'Ulamaa-i Daik Lingga syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waj'alnaa min 'ummaari masaajidika wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang Mahmud Riayat Syah (Marhum Masjid) beserta para sultan dan ulama Daik Lingga, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami termasuk orang-orang yang memakmurkan masjid-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang Mahmud Riayat Syah (Marhum Masjid) beserta para sultan dan ulama Daik Lingga, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami termasuk orang-orang yang memakmurkan masjid-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Januari / 27 Dzulhijjah & 10 November (Peringatan Haul Akbar & Hari Pahlawan Nasional Sultan Mahmud Riayat Syah di Kompleks Masjid Sultan Lingga, Kelurahan Daik, Kecamatan Lingga, Kabupaten Lingga).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah atau busana Melayu yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki pelataran Masjid Sultan Lingga dan Kompleks Makam Merah, serta menjaga kelestarian cagar budaya.',
    facilities: ['Kompleks Cagar Budaya Nasional Makam Merah Sultan Mahmud Riayat Syah', 'Masjid Jami’ Sultan Lingga (Didirikan 1800 M)', 'Museum Linggam Cahaya Daik Lingga', 'Area Parkir Peziarah Daik Kabupaten Lingga'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Malik, Abdul dkk. (2017). Sultan Mahmud Riayat Syah: Pahlawan Besar Gerilya Laut dari Lingga. Yogyakarta / Tanjungpinang: Komodo Books & Pemkab Lingga.',
      'Andaya, Leonard Y. (1975). The Kingdom of Johor 1641–1728: Economic and Political Developments. Kuala Lumpur: Oxford University Press.',
      'Hooker, Virginia Matheson (1991). Tuhfat al-Nafis. Kuala Lumpur: DBP.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 6. PROVINSI JAMBI (BUMI SEPUCUK JAMBI SEMBILAN LURAH)
  // =========================================================================
  {
    id: 'sultan-thaha-syaifuddin-tebo',
    name: 'Makam Sultan Thaha Syaifuddin (Muara Tebo, Kabupaten Tebo, Jambi)',
    title: 'Pahlawan Nasional & Sultan Terakhir Kesultanan Jambi yang Gugur Syahid Melawan Kolonial Belanda (1816–1904 M)',
    description:
      'Kompleks Cagar Budaya Makam Pahlawan Nasional Sultan Thaha Syaifuddin (1816 – 26 April 1904 M) di Jl. Pahlawan, Kelurahan Muara Tebo, Kecamatan Tebo Tengah, Kabupaten Tebo, Provinsi Jambi.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-20 M (1816 – 26 April 1904 M)',
    province: 'Jambi',
    city: 'Tebo',
    district: 'Kec. Tebo Tengah',
    address: 'Jl. Pahlawan, Kel. Muara Tebo, Kec. Tebo Tengah, Kabupaten Tebo',
    location: {
      lat: -1.4685,
      lng: 102.4372,
      address: 'Jl. Pahlawan, Kel. Muara Tebo, Kec. Tebo Tengah, Kabupaten Tebo',
      district: 'Kec. Tebo Tengah',
      city: 'Tebo',
      province: 'Jambi',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Provinsi Jambi (Kompleks Makam Sultan Thaha Syaifuddin di Muara Tebo)',
    sanad:
      'Sultan Thaha Syaifuddin bin Sultan Muhammad Fakhruddin (keturunan langsung Datuk Paduko Berhalo / Ahmad Salim asal Turki dan Orang Kayo Hitam, pendiri Kesultanan Islam Jambi); didukung oleh jaringan ulama dan habaib Jambi (Sayyid Idrus Al-Jufri / Pangeran Wirokusumo).',
    karya: [
      'Pembatalan sepihak perjanjian kolonial Belanda dan pengukuhan Piagam Hukum Adat Jambi: Adat Bersendi Syarak, Syarak Bersendi Kitabullah (1855 M)',
      'Kepemimpinan perang gerilya terpanjang di hulu Sungai Batanghari selama hampir setengah abad (1858–1904 M) dari Muara Tembesi, Muara Tebo, hingga Tanah Garo',
    ],
    history:
      '**Sultan Thaha Syaifuddin**—yang lahir di Keraton Tanah Pilih, Jambi pada pertengahan tahun **1816 M** dengan nama kecil **Raden Thaha Jayadiningrat** dan gugur syahid di Betung Bedarah, Tebo pada **26 April 1904 M** dalam usia 88 tahun (ditetapkan sebagai **Pahlawan Nasional RI** melalui **SK Presiden No. 079/TK/1977 tanggal 24 Oktober 1977**)—adalah Sultan ke-20 Kesultanan Jambi dan simbol keteguhan jihad antikolonial rakyat Jambi. Ketika naik takhta pada tahun **1855 M** menggantikan pamannya Sultan Abdurrahman Nazaruddin, tindakan pertama Sultan Thaha Syaifuddin adalah menolak memperbarui kontrak monopoli VOC/Hindia Belanda dan menegaskan kedaulatan penuh Kesultanan Jambi yang berlandaskan syariat Islam.\n\nKemarahan Belanda berujung pada pengiriman ekspedisi armada kapal perang ke Kota Jambi pada bulan **September 1858 M** yang membombardir Keraton Tanah Pilih (di lokasi Masjid Agung Al-Falah Jambi saat ini). Pantang menyerah sedikit pun, Sultan Thaha Syaifuddin bersama panglima utamanya (**Raden Mattaher** dan **Pangeran Hadi**) serta para ulama memindahkan ibu kota perjuangan ke wilayah hulu Sungai Batanghari (**Muara Tembesi, Muara Tebo, Merangin, hingga Bungo**). Selama **46 tahun tanpa henti (1858–1904 M)**, meskipun usianya semakin sepuh, Sultan Thaha memimpin langsung perang gerilya hutan dan sungai serta menjalin korespondensi meminta bantuan Khalifah Turki Utsmani.\n\nPada malam tanggal **26 April 1904 M**, markas persembunyian beliau di dusun **Betung Bedarah (Kecamatan Tebo Ilir, Kabupaten Tebo)** dikepung secara mendadak oleh pasukan marsose Belanda, dan Sultan Thaha Syaifuddin yang telah berusia 88 tahun gugur sebagai *syahid* mempertahankan negerinya. Jenazah mulia beliau kemudian dibawa dan dimakamkan dengan penghormatan tinggi di **Kelurahan Muara Tebo, Kecamatan Tebo Tengah, Kabupaten Tebo, Provinsi Jambi**.',
    karomah: [
      'Dalam catatan arsip militer kolonial Belanda dan buku sejarah Elsbeth Locher-Scholten (*Sumatran Sultanate and Colonial State: Jambi and the Rise of Dutch Imperialism*), perlawanan Sultan Thaha Syaifuddin diakui sebagai salah satu perang gerilya paling mengagumkan dalam sejarah: selama hampir setengah abad hingga usia 88 tahun, seluruh rakyat pedalaman Jambi menjaga rahasia keberadaan sang Sultan karena memandang beliau sebagai pemimpin *Waliyul Amri* yang diberkahi Allah SWT.<!--more-->\n\nNama agung Sultan Thaha Syaifuddin kini diabadikan menjadi nama **Bandar Udara Sultan Thaha** dan **Universitas Islam Negeri (UIN) Sulthan Thaha Saifuddin** di Provinsi Jambi.',
    ],
    untoldStory:
      'Perjuangan bersenjata Kesultanan Jambi di bawah Sultan Thaha Syaifuddin mendapat dukungan spiritual penuh dari para habaib dan ulama Seberang Kota Jambi, termasuk menantu kesultanan **Sayyid Idrus bin Hasan Al-Jufri (Pangeran Wirokusumo)** dan panglima legendaris **Raden Mattaher** (cucu Sultan Thaha yang melanjutkan perang hingga gugur syahid di Muaro Jambi tahun 1907 dan juga dianugerahi gelar Pahlawan Nasional tahun 2020).<!--more-->\n\nKompleks Makam Sultan Thaha Syaifuddin berada di pusat kota **Muara Tebo, Kabupaten Tebo**, tepat di pertemuan Sungai Batanghari dan Sungai Batang Tebo, dilengkapi cungkup monumental dan taman pahlawan.',
    barokahHajat:
      'Peziarah, prajurit, pelajar, dan masyarakat Jambi yang berziarah ke maqbarah Pahlawan Nasional Sultan Thaha Syaifuddin di Muara Tebo umumnya bertawassul memohon kepada Allah SWT keistiqamahan perjuangan hingga akhir hayat (*husnul khatimah*), keberanian membela kebenaran tanpa kompromi terhadap kezaliman, serta kemuliaan bangsa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Sultan Thaha Syaifuddin (Muara Tebo Jambi)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ الشَّهِيدِ طٰهَ سَيْفِ الدِّينِ وَرَادِينْ مَاطَاهِرْ وَسَلَاطِينِ وَعُلَمَاءِ جَامْبِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ الشَّهِيدِ طٰهَ سَيْفِ الدِّينِ وَرَادِينْ مَاطَاهِرْ وَسَلَاطِينِ وَعُلَمَاءِ جَامْبِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahidisy-Syahiid Thaahaa Saifiddiin wa Raden Mattaher wa Salaathiini wa 'Ulamaa-i Jambi syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang syahid Thaha Syaifuddin, Raden Mattaher, beserta seluruh sultan dan ulama Jambi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang syahid Thaha Syaifuddin, Raden Mattaher, beserta seluruh sultan dan ulama Jambi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '26 April (Peringatan Gugurnya Sultan Thaha Syaifuddin), 6 Januari (Hari Jadi Provinsi Jambi), & 10 November (Ziarah Nasional Hari Pahlawan di Kompleks Makam Sultan Thaha Syaifuddin, Kelurahan Muara Tebo, Kecamatan Tebo Tengah, Kabupaten Tebo).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup utama Makam Sultan Thaha Syaifuddin, serta menjaga ketertiban dan kebersihan taman makam pahlawan.',
    facilities: ['Cungkup Utama Makam Pahlawan Nasional Sultan Thaha Syaifuddin', 'Plaza & Taman Ziarah Muara Tebo', 'Musholla & Balai Istirahat Peziarah', 'Area Parkir Luas Pusat Kota Muara Tebo'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Locher-Scholten, Elsbeth (2004). Sumatran Sultanate and Colonial State: Jambi and the Rise of Dutch Imperialism, 1830–1907. Ithaca: Cornell University Southeast Asia Program.',
      'Sagimun M.D. (1985). Sultan Thaha Syaifuddin: Pahlawan Nasional. Jakarta: Proyek Biografi Pahlawan Nasional Depdikbud.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'guru-abdul-madjid-baragbah-jambi',
    name: 'Makam KH. Abdul Madjid (Guru Majid) & Al-Habib Husin bin Ahmad Baragbah (Seberang Kota Jambi)',
    title: 'Poros Ulama Seberang Kota Jambi: Penyebar Islam Abad ke-18 (Keramat Tambak) & Maha Guru Madrasah Jambi',
    description:
      'Kompleks Pemakaman Keramat Tambak (Al-Habib Husin bin Ahmad Baragbah, wafat 1173 H / 1760 M) dan Maqbarah Masyayikh Seberang Kota Jambi (KH. Abdul Madjid / Guru Majid Al-Jambi, 1848–1939 M) di Kelurahan Tahtul Yaman & Tanjung Johor, Kecamatan Pelayangan, Seberang Kota Jambi, Provinsi Jambi.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-18 – Awal Abad ke-20 M (Habib Husin Baragbah wafat 1760 M; Guru Abdul Madjid: 1848–1939 M)',
    province: 'Jambi',
    city: 'Jambi',
    district: 'Kec. Pelayangan',
    address: 'Kelurahan Tahtul Yaman & Tanjung Johor, Kec. Pelayangan (Seberang Kota Jambi), Kota Jambi',
    location: {
      lat: -1.5812,
      lng: 103.6115,
      address: 'Kelurahan Tahtul Yaman & Tanjung Johor, Kec. Pelayangan (Seberang Kota Jambi), Kota Jambi',
      district: 'Kec. Pelayangan',
      city: 'Jambi',
      province: 'Jambi',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Kota Santri Seberang Kota Jambi (Kompleks Makam Keramat Tambak Habib Husin Baragbah & Guru Abdul Madjid di Pelayangan Jambi)',
    sanad:
      'Al-Habib Husin bin Ahmad bin Abdurrahman Baragbah Ba’alawi adalah ulama sufi asal Tarim Hadramaut abad ke-18; sedangkan KH. Abdul Madjid bin H. Muhammad Nur (Guru Majid, 1848–1939 M) bermukim puluhan tahun di Makkah berguru kepada Syaikh Nawawi Al-Bantani dan Syaikh Ahmad Khatib Al-Minangkabawi.',
    karya: [
      'Perintisan kawasan santri Tahtul Yaman dan Arab Melayu di Seberang Kota Jambi oleh Al-Habib Husin bin Ahmad Baragbah (abad ke-18 M)',
      'Pendirian jaringan 4 Madrasah bersejarah di Seberang Kota Jambi (Nurul Iman, Sa’adatuddarain di Tahtul Yaman oleh Guru Abdul Madjid tahun 1915 M, Nurul Islam, dan As’ad)',
      'Pengkaderan ulama besar Jambi, Riau, dan Sumatera Selatan di sepanjang tepian utara Sungai Batanghari',
    ],
    history:
      'Kawasan **Seberang Kota Jambi (Sekoja)**—yang meliputi Kecamatan Pelayangan dan Kecamatan Danau Teluk di sisi utara aliran Sungai Batanghari, dihubungkan dengan Jembatan Gentala Arasy—dikenal luas sebagai **"Serambi Makkah-nya Provinsi Jambi"** yang tak pernah tersentuh tempat maksiat sejak abad ke-18 M. Fondasi kerohanian kawasan ini diletakkan oleh waliyullah besar asal Tarim, Hadramaut, yakni **Al-Habib Husin bin Ahmad bin Abdurrahman Baragbah** (wafat tahun **1173 H / 1760 M**, dikenal dengan gelar **Tuanku Keramat Tambak**). Beliau berlabuh di Jambi pada paruh pertama abad ke-18 M, menikahi putri bangsawan Kesultanan Jambi, dan membimbing para sultan serta masyarakat di **Kampung Arab Melayu dan Tahtul Yaman** dalam pengamalan fikih Syafi’i serta *Thariqah ’Alawiyyah*.\n\nDua abad kemudian, obor keilmuan Seberang Kota Jambi mencapai puncaknya melalui sosok *Maha Guru Ulama Jambi*, **Al-Allamah KH. Abdul Madjid bin H. Muhammad Nur (Guru Majid Jambi)** (lahir di Tanjung Johor, Seberang Kota Jambi sekitar tahun **1848 M** dan wafat pada **1939 M** dalam usia 91 tahun). Guru Majid bermukim selama lebih dari 20 tahun di Makkah Al-Mukarramah sebagai murid sekaligus rekan diskusi **Syaikh Nawawi Al-Bantani**, **Syaikh Ahmad Khatib Al-Minangkabawi**, dan **Syaikh Mukhtar Ath-Tharid** hingga dipercaya mengajar di Masjidil Haram.\n\nSekembalinya ke Seberang Kota Jambi pada awal abad ke-20, **Guru Abdul Madjid** bersama tiga ulama besar lainnya (**KH. Kemas Muhammad Saleh**, **KH. Ahmad Syakur**, dan **KH. Ibrahim bin Abdul Majid**) mendirikan empat madrasah induk (*Madrasah Nurul Iman, Madrasah Sa’adatuddarain di Tahtul Yaman [1915 M], Madrasah Nurul Islam, dan Madrasah As’ad*). Makam **Al-Habib Husin bin Ahmad Baragbah** di **Kompleks Makam Keramat Tambak (Kelurahan Tahtul Yaman, Kecamatan Pelayangan)** dan makam **KH. Abdul Madjid (Guru Majid)** di Seberang Kota Jambi menjadi tujuan utama ziarah masyarakat Provinsi Jambi.',
    karomah: [
      'Dalam tradisi lisan masyarakat Seberang Kota Jambi dan manaqib keluarga Baragbah, karomah Al-Habib Husin bin Ahmad Baragbah (*Keramat Tambak*) dan Guru Abdul Madjid tampak dari terjaganya kesucian kampung-kampung di Seberang Kota Jambi (*Tahtul Yaman, Arab Melayu, Mudung Laut, Olak Kemang, Tanjung Johor*): selama ratusan tahun masyarakat setempat tetap memegang teguh adat memakai sarung, baju kurung Melayu, dan tudung lingkup, serta menghidupkan pengajian kitab kuning di setiap langgar.<!--more-->\n\nSetiap peringatan **Haul Akbar Al-Habib Husin bin Ahmad Baragbah** di Kompleks Makam Keramat Tambak Tahtul Yaman dan Haul Masyayikh Madrasah Sa’adatuddarain/As’ad, ribuan peziarah menyeberangi Jembatan Pedestrian **Gentala Arasy** atau menggunakan perahu ketek melintasi Sungai Batanghari.',
    ],
    untoldStory:
      'Putra dari Al-Habib Husin bin Ahmad Baragbah adalah **Sayyid Qasim bin Husin Baragbah**, yang menurunkan ulama-ulama besar Jambi dan Kalimantan Barat. Adapun murid dan penerus **KH. Abdul Madjid (Guru Majid)** termasuk ulama kharismatik **KH. Abdul Qadir Ibrahim (Guru Qadir)** pengasuh Pondok Pesantren As’ad Olak Kemang.<!--more-->\n\nPeziarah yang datang ke Kota Jambi dapat memarkir kendaraan di kawasan Menara **Gentala Arasy**, berjalan kaki menikmati panorama Sungai Batanghari, lalu berziarah ke **Makam Keramat Tambak Habib Husin Baragbah** dan **Madrasah Sa’adatuddarain Guru Abdul Madjid** di Kelurahan Tahtul Yaman, Kecamatan Pelayangan.',
    barokahHajat:
      'Peziarah dan santri yang berziarah ke maqbarah Al-Habib Husin bin Ahmad Baragbah (Keramat Tambak) dan KH. Abdul Madjid (Guru Majid) di Seberang Kota Jambi umumnya bertawassul memohon kepada Allah SWT kebahagiaan dunia dan akhirat (*Sa’adatuddarain*), terjaganya lingkungan keluarga yang religius, serta keberkahan menuntut ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Husin bin Ahmad Baragbah & KH. Abdul Madjid (Seberang Kota Jambi)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ حُسَيْنِ بْنِ أَحْمَدَ بَارَغْبَةْ وَالْعَلَّامَةِ الشَّيْخِ عَبْدِ الْمَجِيدِ الْجَامْبِيِّ وَمَشَايِخِ تَحْتَ الْيَمَنِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا سَعَادَةَ الدَّارَيْنِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ حُسَيْنِ بْنِ أَحْمَدَ بَارَغْبَةْ وَالْعَلَّامَةِ الشَّيْخِ عَبْدِ الْمَجِيدِ الْجَامْبِيِّ وَمَشَايِخِ تَحْتَ الْيَمَنِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا سَعَادَةَ الدَّارَيْنِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah al-Habiib Husain bin Ahmad Baragbah wal-'Allaamah asy-Syaikh 'Abdil-Majiid al-Jambii wa Masyaayikhi Tahtal-Yaman syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnaa sa'aadatad-daaraini wanfa'naa bi 'uluumihim wa barakaatihim.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Al-Habib Husin bin Ahmad Baragbah, Al-Allamah KH. Abdul Madjid Al-Jambi, beserta para masyayikh Tahtul Yaman Seberang Kota Jambi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami kebahagiaan dunia dan akhirat (Sa’adatuddarain), serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Al-Habib Husin bin Ahmad Baragbah, Al-Allamah KH. Abdul Madjid Al-Jambi, beserta para masyayikh Tahtul Yaman Seberang Kota Jambi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami kebahagiaan dunia dan akhirat (Sa’adatuddarain), serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban & Dzulqa’dah / Dzulhijjah (Puncak Haul Akbar Al-Habib Husin bin Ahmad Baragbah di Kompleks Makam Keramat Tambak & Haul Masyayikh Madrasah Sa’adatuddarain di Kelurahan Tahtul Yaman, Kecamatan Pelayangan, Seberang Kota Jambi).',
    localAdab:
      'Wajib menghormati kearifan lokal Kampung Santri Seberang Kota Jambi dengan mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat secara penuh, melepas alas kaki saat memasuki cungkup Makam Keramat Tambak, serta menjaga ketenangan warga dan santri.',
    facilities: ['Cungkup Makam Keramat Tambak (Habib Husin Baragbah)', 'Kompleks Madrasah Sa’adatuddarain & Maqbarah Guru Abdul Madjid', 'Masjid Al-Ikhsaniyah (Masjid Batu Tertua di Seberang Kota Jambi, 1880 M)', 'Jembatan Pedestrian & Museum Menara Gentala Arasy'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Rahim, Husni (1998). Sistem Otoritas dan Administrasi Islam: Studi tentang Pejabat Agama Masa Kesultanan dan Kolonial di Palembang dan Jambi. Jakarta: Logos.',
      'Hasbullah, Moeflich (2017). Sejarah Sosial Intelektual Islam di Indonesia (Jaringan Madrasah Seberang Kota Jambi). Bandung: Pustaka Setia.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 7. PROVINSI SUMATERA SELATAN (BUMI SRIWIJAYA & PALEMBANG DARUSSALAM)
  // =========================================================================
  {
    id: 'kiai-marogan-palembang',
    legacyId: 'ulama-27',
    name: 'Makam KH. Masagus Abdul Hamid bin Mahmud (Kiai Marogan — Muara Ogan, Kertapati, Palembang)',
    title: 'Waliyullah Agung Palembang Abad ke-19, Mursyid Thariqah Sammaniyah & Pembangun Masjid Lawang Kidul serta Masjid Muara Ogan',
    description:
      'Kompleks Cagar Budaya Masjid dan Kubah Makam Kiai Muara Ogan (KH. Masagus Abdul Hamid bin Masagus Mahmud, 1811–1901 M) di pertemuan Sungai Musi dan Sungai Ogan, Kelurahan Kemang Agung, Kecamatan Kertapati, Kota Palembang, Provinsi Sumatera Selatan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 M (1811 – 17 Rajab 1319 H / 31 Oktober 1901 M)',
    province: 'Sumatera Selatan',
    city: 'Palembang',
    district: 'Kec. Kertapati',
    address: 'Kompleks Masjid Kiai Muara Ogan (Marogan), Jl. Ki Marogan, Kel. Kemang Agung, Kec. Kertapati, Kota Palembang',
    location: {
      lat: -3.0128,
      lng: 104.7495,
      address: 'Kompleks Masjid Kiai Muara Ogan (Marogan), Jl. Ki Marogan, Kel. Kemang Agung, Kec. Kertapati, Kota Palembang',
      district: 'Kec. Kertapati',
      city: 'Palembang',
      province: 'Sumatera Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Palembang Darussalam (Masjid & Makam Kiai Marogan di Muara Ogan Kertapati Palembang)',
    sanad:
      'KH. Masagus Abdul Hamid bin Masagus Mahmud (alias Kanang, keturunan bangsawan Kesultanan Palembang Darussalam dan ibunda Perawati keturunan Tionghoa-Sunda); berguru di Palembang dan Makkah kepada Syaikh Muhammad Azhari bin Abdullah Al-Falimbani, Syaikh Ahmad Zaini Dahlan, dan Syaikh Muhammad Sambas (sanad Thariqah Sammaniyah & Qadiriyah wa Naqsyabandiyah).',
    karya: [
      'Pembangunan dua masjid kembar bersejarah di tepi Sungai Musi menggunakan harta perniagaan kayu pribadinya: Masjid Muara Ogan / Kiai Marogan (1310 H / 1871 M) di Kertapati dan Masjid Lawang Kidul (1881 M) di 5 Ilir Palembang',
      'Penyebaran zikir Lailahaillallah berjamaah di atas perahu sepanjang aliran Sungai Musi dan Sungai Ogan hingga pedalaman Sumatera Selatan',
      'Penyusunan wirid Perukunan Kiai Marogan dan pembelaan hak ibadah umat Islam Palembang di hadapan pemerintah kolonial Belanda',
    ],
    history:
      '**KH. Masagus Abdul Hamid bin Masagus Mahmud**—yang sangat dicintai dan dimuliakan oleh seluruh masyarakat Sumatera Selatan dengan gelar **Kiai Muara Ogan** atau **Kiai Marogan** (lahir di Kampung Karang Berahi / Kertapati, Palembang sekitar tahun **1811 M** dan wafat pada **17 Rajab 1319 H / 31 Oktober 1901 M** dalam usia 90 tahun)—adalah waliyullah dan ulama saudagar terbesar di Palembang pasca-runtuhnya Kesultanan Palembang Darussalam. Sejak kecil beliau ditinggal wafat ayahandanya saat menunaikan ibadah haji dan dibesarkan oleh ibundanya yang shalihah, **Nyimas Perawati**. Berkat kejujuran, kerja keras, dan doa ibundanya, usaha penggergajian dan perdagangan kayu (*sawmill*) yang dirintis Kiai Marogan berkembang sangat pesat hingga beliau menjadi pengusaha pribumi terkaya di Palembang.\n\nKekayaan melimpah tersebut digunakan sepenuhnya oleh Kiai Marogan untuk berjihad di jalan dakwah dan menuntut ilmu ke Tanah Suci Makkah. Sepulang dari Makkah dengan membawa sanad fikih Syafi’iyah dan **Thariqah Sammaniyah / Naqsyabandiyah**, beliau membangun dua masjid agung berarsitektur kayu unglen/tembesu dan bergaya perpaduan Melayu-Tiongkok-Eropa di tepi Sungai Musi dengan biaya pribadinya sendiri: yakni **Masjid Jami’ Kiai Muara Ogan (1871 M)** di pertemuan Sungai Musi dan Sungai Ogan (Kertapati) serta **Masjid Lawang Kidul (1881 M)** di kawasan 5 Ilir Palembang.\n\nDengan menggunakan perahu besar yang dikayuh oleh para muridnya sambil melantunkan zikir *Laa ilaaha illallaah* secara bergema di atas Sungai Musi, Kiai Marogan berdakwah dari kampung ke kampung hingga pedalaman Ogan dan Komering. Beliau wafat pada tanggal **17 Rajab 1319 H (31 Oktober 1901 M)** dan dimakamkan di dalam cungkup maqbarah di samping **Masjid Kiai Muara Ogan, Kelurahan Kemang Agung, Kecamatan Kertapati, Kota Palembang**.',
    karomah: [
      'Dalam kitab manaqib *Kiai Marogan* dan tradisi lisan masyarakat Palembang, terdapat banyak kisah karomah beliau yang dituturkan secara turun-temurun: di antaranya kisah kayu-kayu gelondongan milik beliau yang hanyut sendiri mengikuti arus sungai menuju lokasi pembangunan Masjid Muara Ogan dan Masjid Lawang Kidul, serta kisah ikan-ikan kecil di Sungai Musi (*ikan seluang*) yang muncul ke permukaan sungai setiap kali perahu Kiai Marogan melintas sambil berzikir.<!--more-->\n\nHingga hari ini, setiap bulan **Rajab**, peringatan **Haul Akbar Kiai Marogan** di Palembang dimeriahkan dengan prosesi **Ziarah Sungai Musi** menggunakan puluhan perahu hias dan *ketek* dari Masjid Lawang Kidul menuju Masjid Kiai Muara Ogan di Kertapati yang diikuti puluhan ribu jamaah.',
    ],
    untoldStory:
      'Pada tahun 1890-an, ketika pemerintah kolonial Hindia Belanda sempat melarang pelaksanaan Shalat Jumat di **Masjid Lawang Kidul** karena khawatir memicu kebangkitan umat Islam Palembang, Kiai Marogan dengan tegas membela hak ibadah jamaah hingga pemerintah kolonial akhirnya mencabut larangan tersebut pada tahun 1893 M.<!--more-->\n\nDi dalam cungkup Maqbarah Kiai Marogan di tepi muara Sungai Ogan, pusara **KH. Masagus Abdul Hamid (Kiai Marogan)** berdampingan dengan makam adik kandungnya (**KH. Masagus Abdul Aziz / Kiai Mudo**) serta para murid dan keturunan beliau.',
    barokahHajat:
      'Peziarah, saudagar/pengusaha, dan santri yang berziarah ke maqbarah Kiai Marogan di Kertapati Palembang umumnya bertawassul memohon kepada Allah SWT keberkahan usaha perniagaan yang melimpah untuk diwakafkan di jalan agama (wakaf masjid), kemuliaan bakti kepada ibu, serta keistiqamahan berzikir.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Masagus Abdul Hamid bin Mahmud (Kiai Marogan Palembang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مَاسَاغُوسْ عَبْدِ الْحَمِيدِ بْنِ مَحْمُودْ (كِيَاهِي مَارُوغَانْ) وَأَخِيهِ الشَّيْخِ عَبْدِ الْعَزِيزِ فَالِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَبَارِكْ فِي أَرْزَاقِنَا وَأَعْمَالِنَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مَاسَاغُوسْ عَبْدِ الْحَمِيدِ بْنِ مَحْمُودْ (كِيَاهِي مَارُوغَانْ) وَأَخِيهِ الشَّيْخِ عَبْدِ الْعَزِيزِ فَالِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَبَارِكْ فِي أَرْزَاقِنَا وَأَعْمَالِنَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh Kiyaahii al-Haajj Masagus 'Abdil-Hamiid bin Mahmuud (Kiai Marogan) wa akhiihisy-Syaikh 'Abdil-'Aziiz Palembang syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wa baarik fii arzaaqinaa wa a'maalinaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah KH. Masagus Abdul Hamid bin Mahmud (Kiai Marogan) beserta adiknya KH. Masagus Abdul Aziz Palembang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, berkahilah rezeki dan amal ibadah kami, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah KH. Masagus Abdul Hamid bin Mahmud (Kiai Marogan) beserta adiknya KH. Masagus Abdul Aziz Palembang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, berkahilah rezeki dan amal ibadah kami, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '17 Rajab (Puncak Haul Akbar Kiai Marogan & Napak Tilas Ziarah Sungai Musi dari Masjid Lawang Kidul ke Masjid Kiai Muara Ogan, Kecamatan Kertapati, Kota Palembang).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki pelataran Masjid Kiai Muara Ogan dan cungkup maqbarah Kiai Marogan, serta menjaga ketertiban tepian Sungai Musi.',
    facilities: ['Cungkup Utama Maqbarah Kiai Marogan', 'Masjid Bersejarah Kiai Muara Ogan (Didirikan 1871 M)', 'Dermaga Perahu Wisata Religi Sungai Musi & Ogan', 'Area Parkir Bus Peziarah Kertapati Palembang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Peeters, Jeroen (1997). Kaum Tuo – Kaum Mudo: Perubahan Religius di Palembang 1821–1942. Jakarta: INIS.',
      'Rahim, Husni (1998). Sistem Otoritas dan Administrasi Islam di Palembang. Jakarta: Logos.',
      'Yayasan Masjid Kiai Muara Ogan — Manaqib Sejarah Perjuangan KH. Masagus Abdul Hamid (Kiai Marogan) Palembang.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kompleks-kawah-tengkurep-palembang',
    legacyId: 'auliya-26',
    name: 'Kompleks Pemakaman Kesultanan Palembang Darussalam Kawah Tengkurep (Sultan Mahmud Badaruddin I Jayo Wikramo — 3 Ilir, Palembang)',
    title: 'Astana Agung Para Sultan, Ulama & Habaib Kesultanan Palembang Darussalam (Dibangun Tahun 1728 M)',
    description:
      'Kompleks Cagar Budaya Nasional Pemakaman Kawah Tengkurep di Jl. Belabak, Kelurahan 3 Ilir, Kecamatan Ilir Timur II, Kota Palembang, Provinsi Sumatera Selatan—peristirahatan Sultan Mahmud Badaruddin I Jayo Wikramo (pendiri Masjid Agung Palembang), Sultan Ahmad Najamuddin, dan para ulama istana abad ke-18 M.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Awal Abad ke-19 M (Dibangun 1728 M; Sultan Mahmud Badaruddin I wafat 1757 M)',
    province: 'Sumatera Selatan',
    city: 'Palembang',
    district: 'Kec. Ilir Timur II',
    address: 'Jl. Belabak, Kel. 3 Ilir, Kec. Ilir Timur II, Kota Palembang',
    location: {
      lat: -2.9762,
      lng: 104.7845,
      address: 'Jl. Belabak, Kel. 3 Ilir, Kec. Ilir Timur II, Kota Palembang',
      district: 'Kec. Ilir Timur II',
      city: 'Palembang',
      province: 'Sumatera Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Masjid Agung Sultan Mahmud Badaruddin I Jayo Wikramo & Khazanah Kawah Tengkurep Palembang',
    sanad:
      'Sultan Mahmud Badaruddin I Jayo Wikramo (memerintah 1724–1757 M, keturunan Susuhunan Abdurrahman Khalifatul Mukminin Sayyidul Imam, pendiri Kesultanan Palembang Darussalam); pelindung utama jaringan ulama Haramain–Palembang abad ke-18 (termasuk ayahanda Syaikh Abdus Shamad Al-Falimbani, Sayyid Idrus Al-Idrus, dan Imam Sayyid Abdurrahman).',
    karya: [
      'Peletakan batu pertama pembangunan Masjid Agung Palembang (Masjid Sultan Mahmud Badaruddin Jayo Wikramo) pada 1 Jumadil Akhir 1151 H / 1738 M',
      'Pembangunan Kompleks Astana Kawah Tengkurep (1728 M) dengan kubah beton kuno berbahan batu kapur Karang Jaya, pasir, dan putih telur',
      'Pengangkatan Palembang Darussalam sebagai pusat penulisan kitab Jawi dan penerjemahan karya Imam Al-Ghazali di Asia Tenggara pada abad ke-18 M',
    ],
    history:
      '**Kompleks Pemakaman Kawah Tengkurep** di **Kelurahan 3 Ilir, Kecamatan Ilir Timur II, Kota Palembang** adalah monumen keagungan spiritual dan arsitektur **Kesultanan Palembang Darussalam** pada abad ke-18 M. Nama *Kawah Tengkurep* berasal dari bahasa Melayu Palembang yang berarti *"Kuali Besar (Kawah) yang Tertelungkup/Terbalik"*, merujuk pada bentuk atap kubah-kubah cungkup utama makam yang melengkung kokoh laksana kawah raksasa terbalik. Kompleks ini dibangun pada tahun **1728 M** atas titah penguasa besar Kesultanan Palembang Darussalam, **Sultan Mahmud Badaruddin I Jayo Wikramo** (memerintah **1724–1757 M**).\n\nDi bawah pemerintahan Sultan Mahmud Badaruddin I Jayo Wikramo dan putra-putranya (**Susuhunan Ahmad Najamuddin I Adi Kesumo** dan **Sultan Muhammad Bahauddin**), Kesultanan Palembang mencapai kemakmuran luar biasa berkat perdagangan lada dan timah Bangka. Kemakmuran tersebut diabdikan oleh sang Sultan untuk membangun **Masjid Agung Palembang** (mulai dibangun 1738 M dan diresmikan 28 Jumadil Awal 1161 H / 26 Mei 1748 M) serta menjadikan keraton Palembang sebagai perpustakaan dan pusat kajian tasawuf terbesar di Nusantara (masa lahirnya ulama dunia asal Palembang di Makkah: **Syaikh Abdus Shamad Al-Falimbani** pengarang *Siyarus Salikin* dan *Hidayatus Salikin*, **Syaikh Kemas Fakhruddin**, dan **Syaikh Muhammad Muhyiddin bin Syihabuddin**).\n\nKetika wafat pada tahun **1757 M**, Sultan Mahmud Badaruddin I Jayo Wikramo dimakamkan di cungkup utama **Kawah Tengkurep** bersama empat permaisurinya, disusul oleh **Sultan Ahmad Najamuddin I**, **Sultan Muhammad Bahauddin** (ayahanda Pahlawan Nasional Sultan Mahmud Badaruddin II yang diasingkan ke Ternate), serta guru besar agama istana (**Imam Sayyid Idrus Al-Idrus**).',
    karomah: [
      'Dalam kajian arkeologi Islam Nusantara dan catatan pejabat Belanda J.I. van Sevenhoven (*Lukisan tentang Ibukota Palembang*, 1821), keajaiban konstruksi kubah **Kawah Tengkurep** yang bertahan hampir 300 tahun tanpa besi tulangan modern terletak pada teknologi perekat tradisionalnya yang mencampurkan batu kapur dari Pulau Kemaro/Karang Jaya dengan putih telur, tetes tebu, dan susu kapur hingga sekeras batu padas.<!--more-->\n\nDi Kompleks Kawah Tengkurep juga bersemayam guru-guru spiritual para Sultan Palembang yang menjadikan Palembang bergelar **Darussalam** (*Negeri Keselamatan dan Kedamaian*).',
    ],
    untoldStory:
      'Terdapat tiga cungkup utama berbentuk *kawah tengkurep* di dalam kompleks ini: Cungkup I tempat pusara **Sultan Mahmud Badaruddin I Jayo Wikramo** beserta empat permaisuri dan **Imam Sayyid Idrus**; Cungkup II tempat pusara **Susuhunan Ahmad Najamuddin I**; dan Cungkup III tempat pusara **Sultan Muhammad Bahauddin** (yang menyumbangkan wakaf tanah dan biaya cetak kitab bagi para ulama Palembang di Haramain).<!--more-->\n\nSetiap menjelang bulan suci Ramadhan (**Ziarah Kubro Ulama & Auliya Palembang Darussalam** pada sepuluh hari terakhir bulan Sya’ban), Kompleks Kawah Tengkurep di 3 Ilir menjadi salah satu titik pemberhentian utama puluhan ribu peziarah dalam dan luar negeri.',
    barokahHajat:
      'Peziarah, sejarawan, dan pemimpin masyarakat yang berziarah ke Kompleks Kawah Tengkurep Palembang umumnya bertawassul memohon kepada Allah SWT kemakmuran negeri yang mendukung tegaknya ilmu agama, keharmonisan antara *ulama* dan *umara*, serta keteguhan menjaga warisan peradaban Islam.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Mahmud Badaruddin I Jayo Wikramo & Auliya Kawah Tengkurep (Palembang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ مَحْمُودْ بَدْرِ الدِّينِ الْأَوَّلِ جَايُو وِيكْرَامُو وَالسُّلْطَانِ أَحْمَدْ نَجْمِ الدِّينِ وَالسُّلْطَانِ مُحَمَّدْ بَهَاءِ الدِّينِ وَالْإِمَامِ السَّيِّدِ إِدْرِيسَ الْعَيْدَرُوسِ وَعُلَمَاءِ فَالِيمْبَانْغ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ مَحْمُودْ بَدْرِ الدِّينِ الْأَوَّلِ جَايُو وِيكْرَامُو وَالسُّلْطَانِ أَحْمَدْ نَجْمِ الدِّينِ وَالسُّلْطَانِ مُحَمَّدْ بَهَاءِ الدِّينِ وَالْإِمَامِ السَّيِّدِ إِدْرِيسَ الْعَيْدَرُوسِ وَعُلَمَاءِ فَالِيمْبَانْغ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Mahmuud Badriddiin al-Awwal Jayo Wikramo was-Sulthaan Ahmad Najmiddiin was-Sulthaan Muhammad Bahaa-iddiin wal-Imaam as-Sayyid Idriis al-'Aidaruus wa 'Ulamaa-i Palembang Darussalam syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Mahmud Badaruddin I Jayo Wikramo, Sultan Ahmad Najamuddin, Sultan Muhammad Bahauddin, Imam Sayyid Idrus Al-Idrus, beserta seluruh ulama Kesultanan Palembang Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Mahmud Badaruddin I Jayo Wikramo, Sultan Ahmad Najamuddin, Sultan Muhammad Bahauddin, Imam Sayyid Idrus Al-Idrus, beserta seluruh ulama Kesultanan Palembang Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Hari Terakhir Bulan Sya’ban (Rangkaian Puncak Ziarah Kubro Ulama & Auliya Palembang Darussalam di Kompleks Kawah Tengkurep, Kelurahan 3 Ilir, Kecamatan Ilir Timur II, Kota Palembang).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki ketiga cungkup kubah Kawah Tengkurep, serta menjaga kelestarian bangunan cagar budaya abad ke-18 M.',
    facilities: ['Tiga Cungkup Utama Cagar Budaya Kawah Tengkurep (1728 M)', 'Pendopo & Musholla Ziarah Kawah Tengkurep', 'Balai Adat Kesultanan Palembang Darussalam', 'Area Parkir Luas Bus Wisata Religi 3 Ilir Palembang'],
    openingHours: 'Buka Setiap Hari 08.00 – 17.30 WIB (Buka penuh saat Ziarah Kubro Sya’ban)',
    references: [
      'Sevenhoven, J.I. van (1971). Lukisan tentang Ibukota Palembang. Jakarta: Bhratara.',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII dan XVIII (Bab Ulama Palembang). Jakarta: Kencana.',
      'Hanafiah, Djohan (1988). Masjid Agung Palembang: Sejarah dan Masa Depannya. Jakarta: Haji Masagung.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'gubah-duku-habib-ahmad-shahab-palembang',
    name: 'Kompleks Pemakaman Gubah Duku (Al-Habib Ahmad bin Syech Shahab — 3 Ilir, Palembang)',
    title: 'Waliyullah Quthub Palembang ("Gubah Duku") & Poros Utama Tradisi Ziarah Kubro Palembang Darussalam',
    description:
      'Kompleks Pemakaman Gubah Duku di Jl. Dr. M. Isa, Lorong Gubah Duku, Kelurahan Kuto Batu / 3 Ilir, Kecamatan Ilir Timur II, Kota Palembang, Provinsi Sumatera Selatan—tempat peristirahatan Al-Habib Ahmad bin Syech bin Ahmad bin Syech Shahab (1847–1925 M) beserta para habaib dan ulama Palembang.',
    category: 'Habaib',
    era: 'Paruh Kedua Abad ke-19 – Awal Abad ke-20 M (1263–1344 H / 1847–1925 M)',
    province: 'Sumatera Selatan',
    city: 'Palembang',
    district: 'Kec. Ilir Timur II',
    address: 'Jl. Dr. M. Isa, Lorong Gubah Duku, Kel. Kuto Batu / 3 Ilir, Kec. Ilir Timur II, Kota Palembang',
    location: {
      lat: -2.9718,
      lng: 104.7765,
      address: 'Jl. Dr. M. Isa, Lorong Gubah Duku, Kel. Kuto Batu / 3 Ilir, Kec. Ilir Timur II, Kota Palembang',
      district: 'Kec. Ilir Timur II',
      city: 'Palembang',
      province: 'Sumatera Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Kubro Habaib & Ulama Palembang (Kompleks Maqbarah Gubah Duku 3 Ilir Palembang)',
    sanad:
      'Al-Habib Ahmad bin Syech bin Ahmad bin Syech bin Thahir bin Muhammad Shahabuddin Ba’alawi; menuntut ilmu di Palembang dan bermukim di Hadramaut (Tarim) serta Makkah Al-Mukarramah berguru kepada Al-Habib Ali bin Muhammad Al-Habsyi (pengarang Simthuddurar), Al-Habib Idrus bin Umar Al-Habsyi, dan Al-Habib Ahmad bin Hasan Al-Attas.',
    karya: [
      'Pendirian Majelis Taklim, Wakaf Kebun Duku, dan Madrasah keislaman di Palembang pada akhir abad ke-19 M',
      'Peletakan tradisi arak-arakan Ziarah Kubro Ulama dan Auliya Palembang menjelang bulan suci Ramadhan yang bertahan hingga kini',
    ],
    history:
      '**Al-Habib Ahmad bin Syech bin Ahmad bin Syech Shahab**—yang sangat masyhur di kalangan ulama Hadramaut dan masyarakat Sumatera Selatan dengan julukan **Habib Ahmad Gubah Duku** (lahir di Palembang pada tahun **1263 H / 1847 M** dan wafat pada **25 Shafar 1344 H / September 1925 M**)—adalah seorang *waliyullah* besar, saudagar dermawan, dan ulama *Ahlul Bait* yang menjadi pengayom umat Islam Palembang pada masa kolonial. Setelah mempelajari dasar-dasar ilmu agama kepada para kiai dan habaib sepuh di Palembang, beliau berlayar ke tanah leluhurnya di **Tarim, Hadramaut** serta ke **Makkah Al-Mukarramah**, mengambil sanad ilmu dan ijazah langsung dari wali quthub zamannya seperti **Al-Habib Ali bin Muhammad Al-Habsyi (Seiwun)** dan **Al-Habib Ahmad bin Hasan Al-Attas (Huraidhah)**.\n\nSekembalinya ke Kota Palembang, Habib Ahmad bin Syech Shahab menghidupkan majelis pembacaan kitab klasik, ratib, dan maulid, serta mewakafkan tanah perkebunan pohon duku miliknya yang sangat luas di kawasan **3 Ilir / Kuto Batu (Kecamatan Ilir Timur II)** untuk kemaslahatan umat dan pemakaman para habaib serta ulama. Oleh masyarakat Palembang, kata *Kubah* (bangunan cungkup makam) dilafalkan menjadi **"Gubah"**, sehingga kompleks pemakaman di tengah kebun duku wakaf beliau dikenal sebagai **Kompleks Pemakaman Gubah Duku**.\n\nDalam tradisi akbar tahunan **Ziarah Kubro Ulama dan Auliya Palembang Darussalam** yang dilaksanakan selama tiga hari berturut-turut pada sepuluh hari terakhir bulan **Sya’ban** (menjelang Ramadhan), **Kompleks Pemakaman Gubah Duku** merupakan salah satu titik utama hari pertama dan ketiga yang dikunjungi oleh puluhan ribu jamaah berjubah putih beserta para ulama dari Yaman, Makkah, Malaysia, dan seluruh Indonesia.',
    karomah: [
      'Dalam manaqib *Habib Ahmad bin Syech Shahab (Gubah Duku)* dan kesaksian para ulama Palembang, karomah beliau tampak dari kedermawanan yang luar biasa serta kemakbulan doa beliau: kebun duku tempat beliau berkhalwat dan berzikir senantiasa berbuah sangat lebat dan manis, dan seluruh hasilnya disedekahkan untuk membiayai santri, fakir miskin, serta jamuan tamu.<!--more-->\n\nDi Kompleks Gubah Duku, selain pusara utama **Al-Habib Ahmad bin Syech Shahab**, bersemayam pula puluhan habaib dan ulama besar Palembang seperti **Al-Habib Alwi bin Ahmad Bahsin**, **Al-Habib Abdullah bin Salim Al-Kaff**, dan para dzurriyah Shahabuddin.',
    ],
    untoldStory:
      'Selain **Gubah Duku (Habib Ahmad bin Syech Shahab)** di kawasan Ilir Timur II, rangkaian **Ziarah Kubro Palembang** juga menghubungkan peziarah dengan **Pemakaman Kambang Koci**, **Kawah Tengkurep**, serta **Makam Telaga Swidak & Babussalam Assegaf** (tempat bersemayamnya **Al-Habib Abdurrahman bin Hasan Assegaf** dan **Al-Habib Ahmad bin Hasan Al-Habsyi** di Seberang Ulu).<!--more-->\n\nSaat pelaksanaan Ziarah Kubro di bulan Sya’ban, sepanjang jalan menuju Lorong Gubah Duku di Jl. Dr. M. Isa Palembang dipenuhi warga yang berlomba-lomba menyediakan hidangan kopi, teh, kue tradisional Palembang, dan nasi minyak secara gratis bagi seluruh peziarah.',
    barokahHajat:
      'Peziarah dan pecinta *Ahlul Bait* yang berziarah ke maqbarah Al-Habib Ahmad bin Syech Shahab di Gubah Duku Palembang umumnya bertawassul memohon kepada Allah SWT keberkahan harta yang dermawan, kemuliaan akhlak mengikuti jejak *Salafus Shalih* Thariqah ’Alawiyyah, serta kesiapan hati menyambut bulan suci Ramadhan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Ahmad bin Syech Shahab (Gubah Duku Palembang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ شَيْخٍ بْنِ أَحْمَدَ شِهَابِ الدِّينِ (غُوبَاهْ دُوكُو) وَسَادَاتِنَا الْعَلَوِيِّينَ وَعُلَمَاءِ فَالِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاسْلُكْ بِنَا سَبِيلَهُمْ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ شَيْخٍ بْنِ أَحْمَدَ شِهَابِ الدِّينِ (غُوبَاهْ دُوكُو) وَسَادَاتِنَا الْعَلَوِيِّينَ وَعُلَمَاءِ فَالِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاسْلُكْ بِنَا سَبِيلَهُمْ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah al-Habiib Ahmad bin Syaikh bin Ahmad Syihaabiddiin (Gubah Duku) wa Saadaatinal-'Alawiyyiina wa 'Ulamaa-i Palembang syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wasluk binaa sabiilahum wanfa'naa bi asraarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Al-Habib Ahmad bin Syech bin Ahmad Syihabuddin (Gubah Duku) beserta para Saadah Alawiyyin dan ulama Palembang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tuntunlah kami meniti jalan keshalihan mereka, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Al-Habib Ahmad bin Syech bin Ahmad Syihabuddin (Gubah Duku) beserta para Saadah Alawiyyin dan ulama Palembang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tuntunlah kami meniti jalan keshalihan mereka, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '25 Shafar (Haul Khusus Al-Habib Ahmad bin Syech Shahab) & Jumat–Ahad Pekan Terakhir Bulan Sya’ban (Puncak Ziarah Kubro Ulama dan Auliya Palembang Darussalam di Kompleks Gubah Duku, Kecamatan Ilir Timur II, Kota Palembang).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat (disunnahkan berbusana putih), memisahkan saf peziarah laki-laki dan perempuan sesuai ketetapan pengurus Gubah Duku, serta menjaga adab tawassul.',
    facilities: ['Kubah Utama Maqbarah Al-Habib Ahmad bin Syech Shahab (Gubah Duku)', 'Musholla & Pendopo Majelis Ziarah Kubro Gubah Duku', 'Tempat Wudhu & Fasilitas Tamu', 'Area Parkir Peziarah Jl. Dr. M. Isa Ilir Timur II Palembang'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Panitia Ziarah Kubro Palembang Darussalam — Buku Panduan & Manaqib Auliya dan Ulama Palembang Darussalam (Gubah Duku, Kambang Koci, Kawah Tengkurep, & Telaga Swidak). Palembang: Majelis Ziarah Kubro.',
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait. Jeddah: Alamul Ma’rifah.',
      'Peeters, Jeroen (1997). Kaum Tuo – Kaum Mudo: Perubahan Religius di Palembang 1821–1942. Jakarta: INIS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 8. PROVINSI KEPULAUAN BANGKA BELITUNG (SERUMPUN SEBALAI)
  // =========================================================================
  {
    id: 'tuan-guru-siddiq-muntok-bangka',
    name: 'Situs Pesantren, Masjid Jami’ & Makam Ulama Jejak Syekh Abdurrahman Siddiq (Tuan Guru Muntok — Mentok, Bangka Barat)',
    title: 'Pusat Dakwah 12 Tahun Syekh Abdurrahman Siddiq Al-Banjari (1890–1902 M), Masjid Jami’ Muntok (1883 M) & Makam Keramat Bangka Barat',
    description:
      'Kompleks Cagar Budaya Masjid Jami’ Muntok (1883 M), Makam Keramat Raje/Ulama Muntok, dan Situs Pengajian Syekh Abdurrahman Siddiq Al-Banjari (Tuan Guru Sapat/Muntok) beserta murid utamanya KH. Muhammad Daud di Kelurahan Tanjung & Sungai Daeng, Kecamatan Mentok (Muntok), Kabupaten Bangka Barat, Provinsi Kepulauan Bangka Belitung.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-20 M (Dakwah di Muntok: 1890–1902/1910 M)',
    province: 'Kepulauan Bangka Belitung',
    city: 'Bangka Barat',
    district: 'Kec. Mentok',
    address: 'Kompleks Masjid Jami’ Muntok & Makam Ulama Muntok, Kel. Tanjung / Sungai Daeng, Kec. Mentok (Muntok), Kabupaten Bangka Barat',
    location: {
      lat: -2.0638,
      lng: 105.1632,
      address: 'Kompleks Masjid Jami’ Muntok & Makam Ulama Muntok, Kel. Tanjung / Sungai Daeng, Kec. Mentok (Muntok), Kabupaten Bangka Barat',
      district: 'Kec. Mentok',
      city: 'Bangka Barat',
      province: 'Kepulauan Bangka Belitung',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Pulau Bangka (Kompleks Masjid Jami’ Muntok & Situs Dakwah Syekh Abdurrahman Siddiq di Bangka Barat)',
    sanad:
      'Syekh Abdurrahman Siddiq bin Muhammad ’Afif Al-Banjari (cicit Syekh Muhammad Arsyad Al-Banjari / Datuk Kalampayan; murid Sayyid Bakri Syatha dan Syaikh Nawawi Al-Bantani di Makkah) yang membina ulama-ulama Pulau Bangka seperti KH. Muhammad Daud Muntok, KH. Abdul Hamid, dan jaringan penghulu Masjid Jami’ Muntok.',
    karya: [
      'Penulisan kitab Fathul ’Alim fi Tartibit Ta’lim (ditulis di Muntok Bangka tahun 1322 H / 1904 M), Risalah ’Amal Ma’rifat, dan Majmu’ul Ayat wal Hadits fi Fadhli ’Ilmi wal ’Ulama',
      'Pengembangan pusat pengajian kitab kuning di Masjid Jami’ Muntok (didirikan 1879–1883 M oleh Tumenggung Kartanegara II & Abang Muhammad Ali)',
      'Pemberantasan takhayul serta pembinaan akidah Ahlussunnah wal Jama’ah di seluruh pelosok Pulau Bangka',
    ],
    history:
      'Kota pelabuhan tua **Muntok (Mentok) di Kabupaten Bangka Barat** adalah pintu gerbang utama masuknya ajaran Islam dan kesultanan Melayu-Palembang ke **Pulau Bangka**. Setelah berdirinya **Masjid Jami’ Muntok** pada tanggal **13 Muharram 1300 H (24 November 1883 M)** atas prakarsa Demang **Abang Muhammad Ali (Tumenggung Kartanegara)** bersama komunitas Muslim Melayu, Bugis, dan Arab, Kota Muntok menerima anugerah keilmuan besar dengan kedatangan ulama kharismatik lulusan Makkah: **Syekh Abdurrahman Siddiq bin Muhammad ’Afif Al-Banjari** (cicit Datuk Kalampayan Martapura) sekitar tahun **1890 M**.\n\nSelama lebih dari **12 tahun bermukim di Muntok, Pulau Bangka (1890–1902 M, dan bolak-balik hingga 1910 M)**, Syekh Abdurrahman Siddiq—yang oleh masyarakat Bangka dipanggil dengan penuh takzim sebagai **Tuan Guru Muntok**—mengajar di **Masjid Jami’ Muntok** dan berjalan kaki menembus hutan-hutan Pulau Bangka (dari Muntok, Kelapa, Jebus, hingga Pangkalpinang) untuk meluruskan akidah masyarakat, memberantas praktik perdukunan yang menyimpang, serta mendirikan langgar-langgar pengajian. Di Kota Muntok inilah beliau menulis beberapa kitab monumentalnya yang kemudian dicetak di Singapura, seperti **Fathul ’Alim fi Tartibit Ta’lim** (selesai ditulis di Muntok pada 1322 H / 1904 M) dan **Risalah ’Amal Ma’rifat**.\n\nDi Muntok pula Syekh Abdurrahman Siddiq menikah dan mendidik murid-murid ulama lokal Bangka (seperti **KH. Muhammad Daud**, **Kemas Haji Umar**, dan para penghulu Muntok) sebelum beliau melanjutkan dakwah ke Sapat (Indragiri Hilir). Di Kecamatan Mentok, **Kompleks Masjid Jami’ Muntok**, **Kompleks Makam Keramat & Raja/Ulama Muntok (Kota Seribu Makam)** tempat bersemayamnya para leluhur pendiri Muntok (**Encek Wan Akub**, **Tumenggung Kartanegara**, serta murid dan keluarga Tuan Guru Syekh Abdurrahman Siddiq) menjadi pusat ziarah dan haul tahunan masyarakat Kepulauan Bangka Belitung.',
    karomah: [
      'Dalam kajian sejarah Islam Bangka (Dr. Rusydi Sulaiman) dan tradisi lisan masyarakat Muntok, karomah dakwah Syekh Abdurrahman Siddiq di Pulau Bangka tampak dari keberanian dan keikhlasan beliau memasuki kampung-kampung terpencil di tengah hutan Pulau Bangka yang kala itu masih rawan binatang buas dan ilmu hitam, hingga penduduk desa-desa tersebut berbondong-bondong bertaubat dan mendirikan masjid.<!--more-->\n\nDi samping **Masjid Jami’ Muntok (1883 M)** berdiri berdampingan **Kelenteng Kung Fuk Miaw (1820 M)** dalam satu hamparan lahan selama hampir satu setengah abad, menjadi simbol nyata toleransi dan kedamaian masyarakat Bangka (*Serumpun Sebalai*) yang dibina oleh para ulama dan tetua adat Muntok.',
    ],
    untoldStory:
      'Ikatan batin antara masyarakat **Kabupaten Bangka Barat (Muntok)**, **Kabupaten Indragiri Hilir (Sapat, Riau)**, dan **Martapura (Kalimantan Selatan)** sangat kuat berkat jejak dakwah Syekh Abdurrahman Siddiq: bahkan sejumlah keturunan dan murid beliau tetap menetap dan wafat di Pulau Bangka.<!--more-->\n\nSetiap tahun, Pemerintah Kabupaten Bangka Barat bersama majelis ulama dan dzurriyah rutin menyelenggarakan **Haul Tuan Guru Syekh Abdurrahman Siddiq Al-Banjari di Masjid Jami’ Muntok** serta ziarah ke **Kompleks Makam Kota Seribu Muntok**.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang berziarah ke Kompleks Masjid Jami’ Muntok, Makam Ulama/Temenggung Muntok, serta bertawassul kepada Tuan Guru Syekh Abdurrahman Siddiq di Bangka Barat umumnya memohon kepada Allah SWT adab menuntut ilmu (*Fathul ’Alim*), keteguhan akidah keluarga, serta kerukunan hidup bermasyarakat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Tuan Guru Syekh Abdurrahman Siddiq & Ulama Pendiri Muntok (Bangka Barat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ الشَّيْخِ عَبْدِ الرَّحْمٰنِ الصِّدِّيقِ الْبَنْجَرِيِّ وَالْأَمِيرِ مُحَمَّدْ عَلِيّ وَالشَّيْخِ مُحَمَّدْ دَاوُدْ وَعُلَمَاءِ مُنْتُوكْ بَانْغكَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَالِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ الشَّيْخِ عَبْدِ الرَّحْمٰنِ الصِّدِّيقِ الْبَنْجَرِيِّ وَالْأَمِيرِ مُحَمَّدْ عَلِيّ وَالشَّيْخِ مُحَمَّدْ دَاوُدْ وَعُلَمَاءِ مُنْتُوكْ بَانْغكَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَالِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimir-Rabbaanii asy-Syaikh 'Abdir-Rahmaan ash-Shiddiiq al-Banjarii wal-Amiir Muhammad 'Alii wasy-Syaikh Muhammad Daawud wa 'Ulamaa-i Muntok Bangka syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waftah 'alainaa futuuhal-'aalimiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani Syekh Abdurrahman Siddiq Al-Banjari, Tumenggung Abang Muhammad Ali, KH. Muhammad Daud, beserta seluruh ulama dan pendiri Muntok Pulau Bangka, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, bukakanlah bagi kami pintu ilmu para ulama, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani Syekh Abdurrahman Siddiq Al-Banjari, Tumenggung Abang Muhammad Ali, KH. Muhammad Daud, beserta seluruh ulama dan pendiri Muntok Pulau Bangka, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, bukakanlah bagi kami pintu ilmu para ulama, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban (Peringatan Haul Tuan Guru Syekh Abdurrahman Siddiq Al-Banjari) & Muharram (Milad Masjid Jami’ Muntok & Ziarah Makam Kota Seribu di Kecamatan Mentok, Kabupaten Bangka Barat).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat saat memasuki Masjid Jami’ Muntok dan Kompleks Pemakaman Kota Seribu Muntok, serta menjaga kerukunan dan ketertiban lingkungan cagar budaya.',
    facilities: ['Masjid Jami’ Muntok (Cagar Budaya Nasional 1883 M)', 'Kompleks Cagar Budaya Makam Kota Seribu Muntok', 'Museum Timah Indonesia Muntok (Dekat Lokasi)', 'Area Parkir Wisata Sejarah & Religi Mentok Bangka Barat'],
    openingHours: 'Buka Setiap Hari 06.00 – 21.00 WIB',
    references: [
      'Sulaiman, Rusydi (2014). Islam di Bangka Belitung: Sejarah, Jaringan Ulama, dan Tradisi Keagamaan. Pangkalpinang: STAIN Syaikh Abdurrahman Siddik Press.',
      'Wieringa, Edwin P. (2001). Syair Ibarat dan Khabar Kiamat Karya Syekh Abdurrahman Siddiq Al-Banjari. Leiden: KITLV.',
      'BPCB Jambi — Inventarisasi Situs Cagar Budaya Masjid Jami’ dan Kompleks Makam Kuno Muntok Bangka Barat.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-abu-bakar-al-attas-bangka',
    name: 'Makam Ulama Penyebar Islam Pulau Bangka (Habib Abu Bakar Al-Attas / KH. Mansyur & Syekh Haji Muhammad Afif — Pangkalpinang & Bangka)',
    title: 'Jaringan Habaib & Ulama Perintis Kampung Melayu Tuatunu Pangkalpinang serta Mendo Barat Pulau Bangka',
    description:
      'Kompleks Pemakaman Ulama Penyebar Islam Pulau Bangka (Al-Habib Abu Bakar bin Abdullah Al-Attas / KH. Mansyur bin H. Abdul Hamid di Kelurahan Tuatunu Indah, Kecamatan Gerunggang, Kota Pangkalpinang serta Makam Keramat Kota Kapur / Kemuja di Kecamatan Mendo Barat, Kabupaten Bangka), Provinsi Kepulauan Bangka Belitung.',
    category: 'Habaib',
    era: 'Abad ke-19 – Abad ke-20 M',
    province: 'Kepulauan Bangka Belitung',
    city: 'Pangkalpinang',
    district: 'Kec. Gerunggang',
    address: 'Kelurahan Tuatunu Indah, Kec. Gerunggang, Kota Pangkalpinang (serta Desa Kemuja, Kec. Mendo Barat, Kabupaten Bangka)',
    location: {
      lat: -2.1185,
      lng: 106.0842,
      address: 'Kelurahan Tuatunu Indah, Kec. Gerunggang, Kota Pangkalpinang (serta Desa Kemuja, Kec. Mendo Barat, Kabupaten Bangka)',
      district: 'Kec. Gerunggang',
      city: 'Pangkalpinang',
      province: 'Kepulauan Bangka Belitung',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Pangkalpinang & Bangka (Kompleks Masjid Jamik Pangkalpinang, Kampung Melayu Tuatunu & Desa Santri Kemuja)',
    sanad:
      'Jaringan ulama dan habaib Hadramaut–Palembang–Haramain yang menyebarkan Islam di bagian tengah dan timur Pulau Bangka (Pangkalpinang, Tuatunu, dan Kemuja Mendo Barat), bersambung sanad dengan Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Nawawi Al-Bantani, dan Syekh Abdurrahman Siddiq.',
    karya: [
      'Perintisan Kampung Melayu Religius Tuatunu di Kota Pangkalpinang dan Desa Santri Kemuja di Kecamatan Mendo Barat, Kabupaten Bangka',
      'Pembangunan Masjid Jamik Pangkalpinang (1936 M) dan pelestarian tradisi zikir, maulid, serta Nganggung (Sepintu Sedulang) berbasis ukhuwah Islamiyah',
    ],
    history:
      'Penyebaran dan penguatan syiar Islam di jantung **Pulau Bangka**—khususnya di **Kota Pangkalpinang (Kampung Tuatunu dan Masjid Jamik)** serta kawasan **Kecamatan Mendo Barat (Kota Kapur, Petaling, dan Kemuja) di Kabupaten Bangka**—berlangsung melalui sinergi erat antara para saudagar-ulama *Habaib Ba’alawi* (seperti **Al-Habib Abu Bakar bin Abdullah Al-Attas** dan jaringan dakwah marga Al-Habsyi/Al-Kaff dari Palembang) dengan para kiai pribumi Bangka lulusan Makkah Al-Mukarramah seperti **KH. Mansyur bin H. Abdul Hamid (Guru Mansyur Tuatunu)** dan **KH. Ahmad bin H. Abdul Rauf (Kemuja)**. Pada abad ke-18 dan ke-19 M, jalur sungai Mendo dan pelabuhan Pangkalpinang menjadi pintu masuk para mubaligh dari Kesultanan Palembang dan Johor yang mengislamkan masyarakat *Lom* / Melayu Bangka.\n\nDi wilayah **Tuatunu (Kecamatan Gerunggang, Kota Pangkalpinang)** dan **Desa Kemuja (Kecamatan Mendo Barat, Kabupaten Bangka)**, para ulama dan habaib ini mendirikan surau-surau pengajian Al-Qur’an, mengajar kitab fikih Syafi’iyah (*Sabilal Muhtadin* dan *Perukunan Melayu*), serta memelopori berdirinya **Masjid Jamik Pangkalpinang** pada tanggal **3 Syawal 1355 H (18 Desember 1936 M)** yang memiliki tiang-tiang raksasa dan menjadi masjid bersejarah kebanggaan ibu kota Provinsi Kepulauan Bangka Belitung.\n\nPara ulama Pulau Bangka juga berhasil mengislamkan tradisi adat lokal menjadi tradisi **Nganggung (Sepintu Sedulang)**—yakni tradisi setiap kepala keluarga membawa satu dulang berisi makanan tertutup tudung saji pandan merah ke masjid saat Maulid Nabi SAW, Nisfu Sya’ban, Muharram, maupun Haul Ulama untuk disantap bersama selepas membaca tahlil dan doa. Makam para habaib dan ulama penyebar Islam di **Tuatunu (Pangkalpinang)** serta **Kemuja / Kota Kapur (Kabupaten Bangka)** senantiasa ramai diziarahi masyarakat Bangka Belitung.',
    karomah: [
      'Dalam tradisi lisan masyarakat Melayu Bangka di Tuatunu dan Mendo Barat, keistimewaan para habaib dan tuan guru penyebar Islam Pulau Bangka tampak dari keberkahan tradisi **Nganggung (Sepintu Sedulang)** yang mereka wariskan: setiap kali digelar peringatan Maulid atau Haul di masjid dan makam ulama, ribuan dulang makanan terkumpul secara sukarela dari setiap pintu rumah warga sebagai bukti hidupnya semangat gotong royong dan sedekah.<!--more-->\n\nKampung **Tuatunu di Pangkalpinang** dan **Desa Kemuja di Mendo Barat** hingga kini dikenal sebagai pusat lahirnya para qari, penghafal Al-Qur’an, dan tuan guru di Provinsi Kepulauan Bangka Belitung.',
    ],
    untoldStory:
      'Di pesisir barat Kecamatan Mendo Barat (Desa **Kota Kapur**, tempat ditemukannya Prasasti Sriwijaya abad ke-7 M), juga terdapat makam-makam keramat penyebar Islam awal yang berdakwah di jalur Selat Bangka sejak masa Kesultanan Palembang dan Pahlawan Nasional **Depati Amir** (1805–1869 M).<!--more-->\n\nPeziarah yang berkunjung ke Kota Pangkalpinang dapat memulai perjalanan religi dari **Masjid Jamik Pangkalpinang** dan **Masjid Raya Tuatunu** (masjid terbesar di Bangka Belitung), lalu berziarah ke maqbarah para ulama dan habaib di Tuatunu serta Kemuja.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Al-Habib Abu Bakar Al-Attas dan para ulama penyebar Islam Pulau Bangka di Pangkalpinang serta Kabupaten Bangka umumnya bertawassul memohon kepada Allah SWT keberkahan persaudaraan dan sedekah (*Sepintu Sedulang*), keteguhan iman keluarga, serta kelancaran usaha yang halal.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Habib Abu Bakar Al-Attas, KH. Mansyur & Ulama Penyebar Islam Pulau Bangka',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ أَبِي بَكْرِ بْنِ عَبْدِ اللهِ الْعَطَّاسِ وَالشَّيْخِ مَنْصُورْ تُوَاتُونُو وَالشَّيْخِ أَحْمَدْ كَمُوجَا وَكَافَّةِ أَوْلِيَاءِ وَعُلَمَاءِ جَزِيرَةِ بَانْغكَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَرْزَاقِنَا وَأَهْلِينَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ أَبِي بَكْرِ بْنِ عَبْدِ اللهِ الْعَطَّاسِ وَالشَّيْخِ مَنْصُورْ تُوَاتُونُو وَالشَّيْخِ أَحْمَدْ كَمُوجَا وَكَافَّةِ أَوْلِيَاءِ وَعُلَمَاءِ جَزِيرَةِ بَانْغكَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَرْزَاقِنَا وَأَهْلِينَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Habiib Abii Bakr bin 'Abdillaah al-'Aththaas wasy-Syaikh Manshuur Tuatunu wasy-Syaikh Ahmad Kemuja wa kaaffati Auliyaa-i wa 'Ulamaa-i Jaziirati Bangka syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik fii arzaaqinaa wa ahliinaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Abu Bakar bin Abdullah Al-Attas, KH. Mansyur Tuatunu, KH. Ahmad Kemuja, beserta seluruh auliya dan ulama penyebar Islam di Pulau Bangka, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah rezeki dan keluarga kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Abu Bakar bin Abdullah Al-Attas, KH. Mansyur Tuatunu, KH. Ahmad Kemuja, beserta seluruh auliya dan ulama penyebar Islam di Pulau Bangka, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah rezeki dan keluarga kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal (Maulid Akbar & Tradisi Nganggung Sepintu Sedulang), 1 Muharram, & Ruwahan Sya’ban di Kelurahan Tuatunu Indah (Kota Pangkalpinang) dan Desa Kemuja (Kecamatan Mendo Barat, Kabupaten Bangka).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, menghormati tradisi adat Melayu-Islam Kampung Tuatunu dan Kemuja, serta menjaga kebersihan area pemakaman dan masjid.',
    facilities: ['Kompleks Makam Ulama Kampung Melayu Tuatunu & Kemuja', 'Masjid Raya Tuatunu & Masjid Jamik Pangkalpinang (1936 M)', 'Balai Adat Nganggung Sepintu Sedulang', 'Area Parkir Peziarah Gerunggang Pangkalpinang'],
    openingHours: 'Buka Setiap Hari 06.00 – 21.00 WIB',
    references: [
      'Sulaiman, Rusydi (2014). Islam di Bangka Belitung: Sejarah, Jaringan Ulama, dan Tradisi Keagamaan. Pangkalpinang: STAIN SAS Press.',
      'Elvian, Akhmad (2013). Pangkalpinang dalam Lintasan Sejarah. Pangkalpinang: Dinas Kebudayaan dan Pariwisata Kota Pangkalpinang.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 9. PROVINSI BENGKULU (BUMI RAFFLESIA)
  // =========================================================================
  {
    id: 'sentot-alibasyah-bengkulu',
    name: 'Makam Sentot Alibasyah Prawirodirdjo (Kelurahan Bajak, Teluk Segara, Kota Bengkulu)',
    title: 'Panglima Besar Perang Jawa Pangeran Diponegoro ("Ali Pasha") yang Wafat dalam Pengasingan di Bengkulu (1808–1855 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Panglima Perang Sentot Alibasyah Prawirodirdjo (1808 – 17 April 1855 M) di Jl. Sentot Alibasyah, Kelurahan Bajak, Kecamatan Teluk Segara, Kota Bengkulu, Provinsi Bengkulu.',
    category: 'Auliya Nusantara',
    era: 'Paruh Pertama Abad ke-19 M (1808 – 17 April 1855 M)',
    province: 'Bengkulu',
    city: 'Bengkulu',
    district: 'Kec. Teluk Segara',
    address: 'Jl. Sentot Alibasyah, Kel. Bajak, Kec. Teluk Segara, Kota Bengkulu',
    location: {
      lat: -3.7885,
      lng: 102.2562,
      address: 'Jl. Sentot Alibasyah, Kel. Bajak, Kec. Teluk Segara, Kota Bengkulu',
      district: 'Kec. Teluk Segara',
      city: 'Bengkulu',
      province: 'Bengkulu',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Nasional Kota Bengkulu (Kompleks Makam Panglima Sentot Alibasyah Prawirodirdjo di Kelurahan Bajak)',
    sanad:
      'Raden Bagus Sentot (bergelar Alibasyah Abdul Musthafa Prawirodirdjo) bin Ronggo Prawirodirdjo III (Bupati Wedana Madiun yang gugur melawan Daendels tahun 1810 M) dan cucu menantu Sultan Hamengkubuwono IV; keponakan sekaligus Panglima Besar Angkatan Perang Pangeran Diponegoro serta sahabat seperjuangan Kyai Mojo.',
    karya: [
      'Komando kavaleri legendaris laskar santri Pangeran Diponegoro dalam Perang Jawa (1825–1829 M) yang mengalahkan pasukan Belanda di Kroya, Banyumas, dan Bagelen',
      'Jalinan rahasia solidaritas Islam antikolonial bersama para ulama dan pejuang Paderi di Sumatera Barat (1832–1833 M)',
      'Pembinaan keagamaan masyarakat dan zikir tarekat selama masa pengasingan di Bengkulu hingga akhir hayat (1833–1855 M)',
    ],
    history:
      '**Sentot Alibasyah Prawirodirdjo**—yang lahir pada tahun **1808 M** dengan nama **Raden Bagus Sentot** dan menyandang gelar kehormatan tertinggi militer Kesultanan Yogyakarta **Alibasyah Abdul Musthafa Prawirodirdjo** (dari gelar panglima Turki Utsmani *Ali Pasha*, wafat di Bengkulu pada **17 April 1855 M**)—adalah Panglima Besar paling brilian dalam **Perang Jawa (1825–1830 M)** mendampingi pamannya, **Pangeran Diponegoro**. Ayahanda beliau adalah **Raden Ronggo Prawirodirdjo III**, Bupati Madiun yang gugur melawan Marsekal Daendels pada tahun 1810 M. Sejak usia 17 tahun (1825 M), Sentot bergabung dengan Pangeran Diponegoro di Selarong dan pada usia 18 tahun diangkat menjadi Panglima Besar bersama Pangeran Ngabehi Joyokusumo. Di medan pertempuran Banyumas, Bagelen, dan Progo, pasukan berkuda bersorban yang dipimpin Sentot berulang kali menghancurkan kolone pasukan Jenderal De Kock.\n\nSetelah gencatan senjata tahun 1829 M, pemerintah kolonial Belanda yang sangat mengkhawatirkan pengaruh besar Sentot di tanah Jawa mengirim beliau beserta pasukannya ke Sumatera Barat (1832 M). Namun, setibanya di Ranah Minangkabau, hati nurani keislaman Sentot Alibasyah menolak memerangi sesama pejuang Muslim kaum Paderi; sebaliknya, beliau justru menjalin kontak rahasia dengan para pemimpin dan ulama Paderi untuk berbalik menghantam Belanda. Mengetahui rencana tersebut, Belanda melucuti dan menangkap Sentot Alibasyah pada tahun **1833 M** lalu mengasingkannya ke **Bengkulu**.\n\nSelama **22 tahun masa pengasingannya di Bengkulu (1833–1855 M)**, Sentot Alibasyah memilih menghabiskan sisa umurnya dengan mendekatkan diri kepada Allah SWT, beribadah, dan mengajar agama kepada masyarakat sekitar Kelurahan Bajak dan Pondok Besi. Beliau wafat pada tanggal **17 April 1855 M** dalam usia 47 tahun dan dimakamkan di puncak bukit **Kelurahan Bajak, Kecamatan Teluk Segara, Kota Bengkulu**.',
    karomah: [
      'Dalam kajian sejarawan Inggris Prof. Peter Carey (*The Power of Prophecy: Prince Diponegoro and the End of an Old Order in Java*) dan tradisi lisan masyarakat Bengkulu, kemuliaan Sentot Alibasyah tampak dari perubahan hidupnya di pengasingan Bengkulu menjadi seorang sufi ahli ibadah (*abid*) yang sangat dihormati oleh masyarakat Melayu Bengkulu, hingga keturunan prajurit beliau membentuk komunitas muslim yang religius di Bengkulu.<!--more-->\n\nDi Kompleks Cagar Budaya Makam Sentot Alibasyah di Kelurahan Bajak, struktur makam beliau memiliki keunikan arsitektur berupa undakan bertingkat dengan atap lengkung (*kubah memanjang*) yang terawat sangat rapi di tengah taman kota Bengkulu.',
    ],
    untoldStory:
      'Lokasi Makam Sentot Alibasyah di Kelurahan Bajak, Kecamatan Teluk Segara berada sangat strategis di jantung wisata sejarah Kota Bengkulu: hanya berjarak sekitar 800 meter dari **Benteng Marlborough** dan tidak jauh dari **Rumah Pengasingan Bung Karno** serta **Masjid Jamik Bengkulu** yang dirancang oleh Ir. Soekarno.<!--more-->\n\nTradisi masyarakat Bengkulu menyebut kawasan makam beliau dengan penuh hormat sebagai **Makam Keramat Sentot Alibasyah**, di mana setiap Hari Pahlawan dan bulan Sya’ban/Muharram digelar doa bersama oleh pemerintah daerah, TNI/Polri, dan warga Kota Bengkulu.',
    barokahHajat:
      'Peziarah, prajurit TNI/Polri, dan generasi muda yang berziarah ke maqbarah Panglima Sentot Alibasyah Prawirodirdjo di Teluk Segara Kota Bengkulu umumnya bertawassul memohon kepada Allah SWT keberanian jiwa kesatria dalam membela agama dan tanah air, keteguhan persaudaraan sesama Muslim, serta *husnul khatimah* di masa tua.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Panglima Besar Sentot Alibasyah Abdul Musthafa Prawirodirdjo (Bengkulu)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقَائِدِ الْمُجَاهِدِ عَلِيّ بَاشَا عَبْدِ الْمُصْطَفَى فْرَاوِيرُودِيرْجُو (سِينْتُوتْ أَلِيبَاشَاهْ) وَجُنُودِ الْجِهَادِ فِي بِينْغكُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ أَقْدَامَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقَائِدِ الْمُجَاهِدِ عَلِيّ بَاشَا عَبْدِ الْمُصْطَفَى فْرَاوِيرُودِيرْجُو (سِينْتُوتْ أَلِيبَاشَاهْ) وَجُنُودِ الْجِهَادِ فِي بِينْغكُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ أَقْدَامَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Qaa-idil-Mujaahid 'Alii Baasyaa 'Abdil-Mushthafaa Prawirodirdjo (Sentot Alibasyah) wa Junuudil-Jihaadi fii Bengkulu syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa tsabbit aqdaamanaa 'alal-haqqi wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh panglima pejuang Alibasyah Abdul Musthafa Prawirodirdjo (Sentot Alibasyah) beserta para prajurit jihad di Bengkulu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah langkah kami di atas kebenaran, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh panglima pejuang Alibasyah Abdul Musthafa Prawirodirdjo (Sentot Alibasyah) beserta para prajurit jihad di Bengkulu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah langkah kami di atas kebenaran, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '17 April (Mengenang Wafatnya Sentot Alibasyah Prawirodirdjo), 1 Muharram (Festival Tabut Bengkulu), & 10 November (Ziarah Hari Pahlawan di Kompleks Makam Sentot Alibasyah, Kelurahan Bajak, Kecamatan Teluk Segara, Kota Bengkulu).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Cagar Budaya Makam Sentot Alibasyah, serta menjaga kebersihan dan keheningan kompleks makam.',
    facilities: ['Cungkup Cagar Budaya Nasional Makam Sentot Alibasyah', 'Taman & Pendopo Ziarah Kelurahan Bajak', 'Dekat Benteng Marlborough & Masjid Jamik Bung Karno Bengkulu', 'Area Parkir Peziarah Jl. Sentot Alibasyah Kota Bengkulu'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Carey, Peter (2014). Takdir: Riwayat Pangeran Diponegoro (1785–1855). Jakarta: Penerbit Buku Kompas.',
      'Sukoco, Bambang (1982). Sentot Alibasyah Prawirodirdjo: Panglima Perang Diponegoro. Jakarta: Departemen Pendidikan dan Kebudayaan.',
      'BPCB Jambi — Monografi Situs Cagar Budaya Makam Sentot Alibasyah Kota Bengkulu.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-burhanuddin-imam-senggolo-bengkulu',
    name: 'Makam Syekh Burhanuddin / Imam Senggolo (Pasar Bengkulu, Kota Bengkulu)',
    title: 'Ulama Sufi Penyebar Islam Pesisir Bengkulu & Pelopor Tradisi Keagamaan Muharram (Tabut) di Bumi Rafflesia',
    description:
      'Kompleks Cagar Budaya Makam Syekh Burhanuddin (Imam Senggolo, wafat abad ke-18 M) di kawasan Karabela / Kelurahan Pasar Bengkulu & Berkas, Kecamatan Teluk Segara / Sungai Serut, Kota Bengkulu, Provinsi Bengkulu.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Sekitar 1685–1760 M)',
    province: 'Bengkulu',
    city: 'Bengkulu',
    district: 'Kec. Teluk Segara',
    address: 'Kawasan Karabela / Pasar Bengkulu, Kec. Teluk Segara, Kota Bengkulu',
    location: {
      lat: -3.7812,
      lng: 102.2518,
      address: 'Kawasan Karabela / Pasar Bengkulu, Kec. Teluk Segara, Kota Bengkulu',
      district: 'Kec. Teluk Segara',
      city: 'Bengkulu',
      province: 'Bengkulu',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Pesisir Bengkulu (Situs Makam Syekh Burhanuddin / Imam Senggolo di Kota Bengkulu)',
    sanad:
      'Syekh Burhanuddin yang bergelar Imam Senggolo (ulama sufi asal wilayah Bengal/Benggala India dan keturunan Arab yang tiba di pesisir Bengkulu pada masa pembangunan Benteng Marlborough abad ke-18 M, berinteraksi erat dengan ulama Minangkabau dan Kesultanan Sungai Serut / Selebar).',
    karya: [
      'Penyebaran dakwah Islam dan pengajaran Al-Qur’an di kawasan pesisir Pasar Bengkulu, Pondok Besi, dan Sungai Serut pada abad ke-18 M',
      'Perintisan tradisi peringatan 1–10 Muharram (Mengenang Kesyahidan Cucu Rasulullah SAW, Sayyidina Husain RA di Karbala) yang berkembang menjadi budaya Tabut Bengkulu',
    ],
    history:
      '**Syekh Burhanuddin**—yang dalam historiografi dan tradisi lisan masyarakat Kota Bengkulu sangat masyhur dengan gelar **Imam Senggolo** (hidup pada akhir abad ke-17 hingga pertengahan abad ke-18 M)—adalah ulama pelopor syiar Islam di pesisir **Kota Bengkulu** sekaligus tokoh kunci di balik lahirnya tradisi budaya-religius **Tabut Bengkulu** setiap tanggal 1 hingga 10 Muharram. Nama *Imam Senggolo* merujuk pada peran beliau sebagai imam agama utama dari komunitas Muslim asal *Benggala (Bengal)* dan keturunan Arab-Persia (*Sipai*) yang datang ke Bengkulu pada masa pembangunan Benteng York dan Benteng Marlborough (1685–1718 M).\n\nTidak sekadar tinggal di lingkungan benteng, Syekh Burhanuddin (Imam Senggolo) memilih membaur dan menikahi perempuan pribumi Bengkulu di kawasan **Pasar Bengkulu dan Berkas (Kecamatan Teluk Segara)**. Beliau mendirikan surau pengajian Al-Qur’an, mengajarkan ilmu fikih serta kecintaan mendalam kepada **Ahlul Bait Rasulullah SAW**, dan membimbing masyarakat nelayan pesisir Bengkulu memeluk Islam secara kaffah.\n\nSetiap memasuki tanggal **1 hingga 10 Muharram (Asyura)**, Syekh Burhanuddin memimpin masyarakat Muslim Bengkulu mengadakan majelis doa, tahlil, dan tafakur mengenang keteladanan serta kesyahidan cucu tercinta Nabi Muhammad SAW, **Sayyidina Husain bin Ali RA**, di Padang Karbala. Setelah Syekh Burhanuddin wafat, beliau dimakamkan di kawasan pemakaman kuno yang dinamai **Karabela (Karbala)** di Kota Bengkulu, dan hingga ratusan tahun kemudian, setiap tanggal **1 Muharram** keluarga keturunan Imam Senggolo (*Keluarga Kerukunan Tabut Bencoolen*) selalu memulai rangkaian acara Muharram dengan **Ziarah Kubro dan Doa Bersama di Makam Syekh Burhanuddin (Imam Senggolo)**.',
    karomah: [
      'Dalam kajian antropologi agama (Prof. Badrul Munir Chair dan sejarawan Bengkulu H. Badrul Munir) serta tradisi lisan masyarakat Pasar Bengkulu, karomah Syekh Burhanuddin (Imam Senggolo) tampak dari kemampuannya menyatukan masyarakat pendatang (Arab-India, Minangkabau, Bugis) dengan masyarakat asli Melayu/Rejang Bengkulu melalui ikatan cinta kepada keluarga Nabi Muhammad SAW.<!--more-->\n\nLokasi makam beliau yang dikenal sebagai **Padang Karabela Bengkulu** menjadi titik sakral yang dijaga turun-temurun oleh belasan generasi keturunan beliau (*Keluarga Imam Senggolo*) hingga abad ke-21.',
    ],
    untoldStory:
      'Di Provinsi Bengkulu terdapat dua jalur besar masuknya Islam yang saling melengkapi: jalur pesisir utara/barat melalui **Minangkabau–Mukomuko–Pasar Bengkulu** (termasuk jaringan murid Syekh Burhanuddin Ulakan dan **Syekh Burhanuddin Imam Senggolo**), serta jalur selatan melalui **Kesultanan Banten–Selebar–Serunting Sakti**.<!--more-->\n\nPeziarah yang mengunjungi **Makam Syekh Burhanuddin (Imam Senggolo)** di Kota Bengkulu dapat merangkai perjalanan ziarahnya dengan mengunjungi **Makam Panglima Sentot Alibasyah** di Kelurahan Bajak yang hanya berjarak sekitar 1,5 kilometer.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Burhanuddin (Imam Senggolo) di Kota Bengkulu umumnya bertawassul memohon kepada Allah SWT kecintaan yang tulus kepada Rasulullah SAW dan cucu-cucu beliau (*Al-Hasan wal-Husain*), kerukunan keluarga lintas suku, serta keberkahan di bulan Muharram.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Burhanuddin / Imam Senggolo (Kota Bengkulu)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَآلِ بَيْتِهِ الطَّاهِرِينَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بُرْهَانِ الدِّينِ (إِمَامْ سِينْغغُولُو) وَعُلَمَاءِ بِينْغكُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا مَحَبَّتَكَ وَمَحَبَّةَ نَبِيِّكَ وَأَهْلِ بَيْتِهِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَآلِ بَيْتِهِ الطَّاهِرِينَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بُرْهَانِ الدِّينِ (إِمَامْ سِينْغغُولُو) وَعُلَمَاءِ بِينْغكُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا مَحَبَّتَكَ وَمَحَبَّةَ نَبِيِّكَ وَأَهْلِ بَيْتِهِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama wa Aali Baitihith-Thaahiriin, tsumma ilaa ruuhil-Waliyyish-Shaalih asy-Syaikh Burhaaniddiin (Imam Senggolo) wa 'Ulamaa-i Bengkulu syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnaa mahabbataka wa mahabbata Nabiyyika wa Ahli Baitihii wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW beserta Ahlul Bait beliau yang suci, kemudian khusus kepada ruh wali yang shalih Syekh Burhanuddin (Imam Senggolo) dan para ulama Bengkulu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami cinta kepada-Mu, cinta kepada Nabi-Mu, dan cinta kepada Ahlul Baitnya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW beserta Ahlul Bait beliau yang suci, kemudian khusus kepada ruh wali yang shalih Syekh Burhanuddin (Imam Senggolo) dan para ulama Bengkulu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami cinta kepada-Mu, cinta kepada Nabi-Mu, dan cinta kepada Ahlul Baitnya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '1–10 Muharram (Puncak Ziarah Kubro Awal Tahun Baru Hijriah & Tradisi Muharram di Kompleks Makam Syekh Burhanuddin / Imam Senggolo, Kawasan Karabela / Pasar Bengkulu, Kota Bengkulu).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, meluruskan niat ziarah semata-mata mendoakan ahli kubur dan bertawassul kepada Allah SWT sesuai tuntunan syariat, serta menjaga kebersihan kompleks makam Karabela.',
    facilities: ['Cungkup Makam Syekh Burhanuddin (Imam Senggolo)', 'Pendopo Ziarah Padang Karabela Bengkulu', 'Dekat Pantai Jakat & Pasar Bengkulu', 'Area Parkir Peziarah Teluk Segara Kota Bengkulu'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Siddik, Abdullah (1996). Sejarah Bengkulu 1500–1990. Jakarta: Balai Pustaka.',
      'Feener, R. Michael (2015). Muharram Observances in Bengkulu: Historical and Anthropological Perspectives. Studia Islamika.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 10. PROVINSI LAMPUNG (SAI BUMI RUWA JURAI)
  // =========================================================================
  {
    id: 'raden-intan-ii-lampung',
    name: 'Makam Pahlawan Nasional Raden Intan II (Benteng Cempaka, Gedung Harta, Kalianda, Lampung Selatan)',
    title: 'Pahlawan Nasional Lampung, Keturunan Fatahillah–Sunan Gunung Jati & Panglima Jihad Antikolonial Gunung Rajabasa (1834–1856 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam dan Benteng Cempaka Pahlawan Nasional Raden Intan II (1834 – 5 Oktober 1856 M) di Desa Gedung Harta, Kecamatan Penengahan (kawasan Kalianda / kaki Gunung Rajabasa), Kabupaten Lampung Selatan, Provinsi Lampung.',
    category: 'Auliya Nusantara',
    era: 'Pertengahan Abad ke-19 M (1834 – 5 Oktober 1856 M)',
    province: 'Lampung',
    city: 'Lampung Selatan',
    district: 'Kec. Penengahan',
    address: 'Benteng Cempaka, Desa Gedung Harta, Kec. Penengahan (Kawasan Kalianda), Kabupaten Lampung Selatan',
    location: {
      lat: -5.7512,
      lng: 105.6542,
      address: 'Benteng Cempaka, Desa Gedung Harta, Kec. Penengahan (Kawasan Kalianda), Kabupaten Lampung Selatan',
      district: 'Kec. Penengahan',
      city: 'Lampung Selatan',
      province: 'Lampung',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Provinsi Lampung (Kompleks Makam & Benteng Cempaka Raden Intan II di Kalianda / Penengahan Lampung Selatan)',
    sanad:
      'Raden Intan II bin Raden Imba II bin Raden Intan I; keturunan langsung darah biru Keratuan Darah Putih (Kuripan, Lampung Selatan) yang bersambung silsilahnya kepada Fatahillah / Faletehan dan Syarif Hidayatullah (Sunan Gunung Jati Cirebon–Banten) melalui pernikahan dengan Putri Sinar Alam (Ratu Pugung); dibimbing secara ruhani oleh ulama besar Banten KH. Wasyid (Haji Wakhia).',
    karya: [
      'Pembangunan sistem pertahanan berlapis di lereng Gunung Rajabasa (Benteng Cempaka, Benteng Bendulu, Benteng Raja Gepeh, dan Benteng Ketimbang)',
      'Kepemimpinan perang jihad mempertahankan kedaulatan Keratuan Darah Putih Lampung terhadap tiga ekspedisi besar tentara kolonial Belanda (1851–1856 M)',
    ],
    history:
      '**Raden Intan II** (lahir di Kuripan, Lampung Selatan pada tahun **1834 M** dan gugur syahid pada **5 Oktober 1856 M** dalam usia 22 tahun; ditetapkan sebagai **Pahlawan Nasional RI** melalui **SK Presiden No. 082/TK/1986 tanggal 23 Oktober 1986**) adalah pahlawan besar kebanggaan masyarakat Lampung dan pemimpin **Keratuan Darah Putih** di kaki Gunung Rajabasa, Kabupaten Lampung Selatan. Secara genealogis, keluarga besar Keratuan Darah Putih adalah keturunan langsung dari panglima Islam Nusantara **Fatahillah (Syarif Hidayatullah / Sunan Gunung Jati)** melalui pernikahan dengan **Putri Sinar Alam** dari Keratuan Pugung pada abad ke-16 M. Kakek beliau (**Raden Intan I**, wafat 1828 M) dan ayahanda beliau (**Raden Imba II**, diasingkan Belanda ke Pulau Timor tahun 1834 M saat Raden Intan II masih dalam kandungan) semuanya wafat dalam perjuangan melawan penjajah.\n\nSaat dinobatkan memimpin Keratuan Darah Putih pada usia **16 tahun (1850 M)**, Raden Intan II didampingi oleh guru agama sekaligus penasihat perang asal Banten, **Haji Wakhia (KH. Wasyid)**, serta panglima **Wak Maas** dan **Singa Branta**. Ketika Belanda mengirim ekspedisi militer tahun 1851 dan 1853 ke Kalianda, pasukan santri dan jawara Lampung di bawah komando Raden Intan II berhasil memukul mundur tentara kolonial dari benteng-benteng alam di lereng Gunung Rajabasa (**Benteng Cempaka, Benteng Bendulu, dan Benteng Harta**).\n\nPada bulan Agustus **1856 M**, Belanda mengerahkan armada perang besar-besaran yang terdiri dari 9 kapal perang di bawah komando Kolonel Waleson untuk mengepung Gunung Rajabasa. Karena tidak sanggup menangkap Raden Intan II dalam pertempuran terbuka, Belanda menggunakan siasat licik perundingan palsu pada malam **5 Oktober 1856 M**. Meski dikeroyok saat tidak memegang senjata lengkap, pemuda pemberani berusia 22 tahun itu bertempur hingga gugur sebagai *syahid fi sabilillah*. Beliau dimakamkan di dalam kompleks **Benteng Cempaka, Desa Gedung Harta, Kecamatan Penengahan (Kalianda), Kabupaten Lampung Selatan**.',
    karomah: [
      'Dalam naskah *Sejarah Keratuan Darah Putih* dan tradisi lisan masyarakat Kalianda–Lampung Selatan, keistimewaan Raden Intan II tampak dari keberanian dan kewibawaan ruhaninya di usia yang masih sangat belia (16 hingga 22 tahun) yang mampu menyatukan seluruh marga adat Lampung (*Pepadun* dan *Saibatin*) serta laskar ulama Banten untuk berjihad di bawah kalimat tauhid.<!--more-->\n\nNama mulia Raden Intan II kini diabadikan menjadi nama **Bandar Udara Internasional Raden Inten II**, **Universitas Islam Negeri (UIN) Raden Intan Lampung**, dan **Korem 043/Garuda Hitam Lampung**.',
    ],
    untoldStory:
      'Lokasi **Makam Raden Intan II di Desa Gedung Harta (Kecamatan Penengahan, Lampung Selatan)** masih berada tepat di dalam area asli **Benteng Cempaka**, yang dikelilingi oleh parit pertahanan kuno dan gundukan tanah benteng yang dulu digunakan pasukan beliau menahan meriam Belanda.<!--more-->\n\nHanya berjarak beberapa kilometer dari Makam Raden Intan II di Desa Gedung Harta, peziarah juga dapat mengunjungi **Rumah Adat Lamban Balak Keratuan Darah Putih** di **Desa Kuripan, Kecamatan Penengahan** yang masih menyimpan silsilah dan pusaka asli peninggalan masa Sunan Gunung Jati–Fatahillah dan Raden Intan.',
    barokahHajat:
      'Peziarah, mahasiswa UIN Raden Intan, prajurit, dan pemuda yang berziarah ke maqbarah Pahlawan Nasional Raden Intan II di Gedung Harta Lampung Selatan umumnya bertawassul memohon kepada Allah SWT semangat kepemimpinan pemuda yang gagah berani dan bertakwa, kecintaan membela kehormatan bangsa dan agama, serta ketersambungan berkah silsilah Wali Songo di tanah Sumatera.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Raden Intan II & Leluhur Keratuan Darah Putih (Lampung Selatan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الشَّابِّ الْمُجَاهِدِ الشَّهِيدِ رَادِينْ إِينْتَانْ الثَّانِي وَوَالِدِهِ رَادِينْ إِيمْبَا الثَّانِي وَجَدِّهِ رَادِينْ إِينْتَانْ الْأَوَّلِ وَالشَّيْخِ الحَاجِّ وَاخِيَا لَامْفُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ شَهَادَتَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الشَّابِّ الْمُجَاهِدِ الشَّهِيدِ رَادِينْ إِينْتَانْ الثَّانِي وَوَالِدِهِ رَادِينْ إِيمْبَا الثَّانِي وَجَدِّهِ رَادِينْ إِينْتَانْ الْأَوَّلِ وَالشَّيْخِ الحَاجِّ وَاخِيَا لَامْفُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ شَهَادَتَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Amiirisy-Syaabbil-Mujaahidisy-Syahiid Raden Intan ats-Tsaanii wa waalidihii Raden Imba ats-Tsaanii wa jaddihii Raden Intan al-Awwal wasy-Syaikh al-Haajj Wakhia Lampung syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal syahaadatahum wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pangeran muda pejuang syahid Raden Intan II, ayahandanya Raden Imba II, kakeknya Raden Intan I, serta Syekh Haji Wakhia Lampung, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah kesyahidan mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pangeran muda pejuang syahid Raden Intan II, ayahandanya Raden Imba II, kakeknya Raden Intan I, serta Syekh Haji Wakhia Lampung, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah kesyahidan mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Oktober (Peringatan Gugurnya Pahlawan Nasional Raden Intan II) & 10 November (Ziarah Nasional Hari Pahlawan di Kompleks Makam Benteng Cempaka, Desa Gedung Harta, Kecamatan Penengahan / Kalianda, Kabupaten Lampung Selatan).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup utama Makam Raden Intan II, serta menjaga kelestarian situs parit dan tanggul Benteng Cempaka.',
    facilities: ['Cungkup Utama Makam Pahlawan Nasional Raden Intan II', 'Situs Cagar Budaya Benteng Cempaka Gedung Harta', 'Musholla, Pendopo Ziarah & Galeri Informasi Sejarah', 'Area Parkir Luas Bus Peziarah Jalinsum Kalianda–Bakauheni'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Suwandi, Wan (1986). Riwayat Perjuangan Raden Intan II: Pahlawan Nasional dari Lampung. Jakarta: Departemen Sosial RI.',
      'Kementerian Pendidikan dan Kebudayaan RI — Sejarah Perjuangan Rakyat Lampung Melawan Kolonialisme Belanda.',
      'BPCB Banten — Monografi Situs Cagar Budaya Benteng Cempaka dan Makam Raden Intan II Lampung Selatan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-ghalib-pringsewu-lampung',
    name: 'Makam KH. Ghalib bin KH. Rohani (Pringsewu Barat, Kabupaten Pringsewu, Lampung)',
    title: 'Ulama Kharismatik Murid Syaikhona Kholil Bangkalan & Panglima Laskar Hizbullah–Sabilillah Pejuang Kemerdekaan Lampung (1899–1949 M)',
    description:
      'Kompleks Pemakaman dan Masjid Jami’ KH. Ghalib di Kelurahan Pringsewu Barat, Kecamatan Pringsewu, Kabupaten Pringsewu, Provinsi Lampung—tempat peristirahatan Al-Allamah Al-Mujahid KH. Ghalib (1899 – 9 November 1949 M), kiai pendiri pesantren dan pahlawan syahid Agresi Militer Belanda II di Lampung.',
    category: 'Ulama Nusantara',
    era: 'Paruh Pertama Abad ke-20 M (1899 – 9 November 1949 M)',
    province: 'Lampung',
    city: 'Pringsewu',
    district: 'Kec. Pringsewu',
    address: 'Kompleks Masjid Jami’ KH. Ghalib, Jl. KH. Ghalib, Kel. Pringsewu Barat, Kec. Pringsewu, Kabupaten Pringsewu',
    location: {
      lat: -5.3542,
      lng: 104.9685,
      address: 'Kompleks Masjid Jami’ KH. Ghalib, Jl. KH. Ghalib, Kel. Pringsewu Barat, Kec. Pringsewu, Kabupaten Pringsewu',
      district: 'Kec. Pringsewu',
      city: 'Pringsewu',
      province: 'Lampung',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Pejuang Kemerdekaan Lampung (Kompleks Masjid Jami’ & Maqbarah KH. Ghalib di Pringsewu)',
    sanad:
      'KH. Ghalib bin KH. Rohani bin KH. Saman (lahir di Mojosari, Mojokerto, Jawa Timur tahun 1899 M); murid langsung dari Maha Guru Syaikhona Muhammad Kholil Bangkalan Madura, Hadratussyaikh KH. Hasyim Asy’ari di Pondok Pesantren Tebuireng Jombang, dan Pondok Pesantren Siwalan Panji Sidoarjo.',
    karya: [
      'Pendirian Masjid dan Pondok Pesantren KH. Ghalib di Pringsewu pada tahun 1927–1930 M sebagai pesantren perintis tertua di wilayah Pringsewu–Tanggamus Lampung',
      'Komando Pasukan Laskar Hizbullah dan Sabilillah Karesidenan Lampung dalam mempertahankan kemerdekaan RI menghadapi Agresi Militer Belanda I dan II (1945–1949 M)',
    ],
    history:
      '**Al-Allamah Al-Mujahid KH. Ghalib bin KH. Rohani** (lahir di Desa Mojosari, Kabupaten Mojokerto, Jawa Timur pada tahun **1899 M** dan gugur syahid di Pringsewu, Lampung pada **9 November 1949 M**)—adalah ulama besar perintis pesantren sekaligus panglima perang kemerdekaan yang paling dihormati di Provinsi Lampung. Sejak masa mudanya di Jawa Timur, pemuda Ghalib menuntut ilmu kepada para wali kutub zamannya: beliau mengaji di **Pondok Pesantren Siwalan Panji Sidoarjo**, berguru langsung kepada **Syaikhona Muhammad Kholil di Bangkalan Madura**, serta memperdalam hadis dan fikih kepada **Hadratussyaikh KH. Hasyim Asy’ari di Pondok Pesantren Tebuireng, Jombang**.\n\nSekitar tahun **1927 M**, atas isyarat guru-gurunya untuk berdakwah membuka tanah baru di Pulau Sumatera, KH. Ghalib berhijrah ke wilayah **Pringsewu (kawasan hutan bambu *Pring Sewu* di Lampung)**. Dengan penuh keteladanan dan kemandirian, beliau membuka lahan pertanian, membangun **Masjid Jami’ dan Pondok Pesantren Pringsewu** sekitar tahun **1930 M**, serta membina masyarakat transmigran Jawa maupun masyarakat adat Lampung Pepadun/Saibatin dalam ukhuwah Islamiyah yang erat.\n\nKetika pecah Revolusi Kemerdekaan RI (1945–1949 M) dan gema **Resolusi Jihad** berkumandang, Pesantren KH. Ghalib di Pringsewu berubah menjadi markas besar perjuangan rakyat Lampung. KH. Ghalib diangkat menjadi **Komandan Pasukan Hizbullah–Sabilillah Lampung** yang memimpin pertempuran gerilya sengit menghadang tentara Belanda di Front Gedongtataan, Talangpadang, hingga Tanjungkarang. Pada saat **Agresi Militer Belanda II**, KH. Ghalib ditangkap dan gugur sebagai **syahid mempertahankan kemerdekaan Republik Indonesia pada tanggal 9 November 1949 M** (sehari sebelum tanggal 10 November). Jenazah beliau dimakamkan di **Kompleks Masjid Jami’ KH. Ghalib, Kelurahan Pringsewu Barat, Kecamatan Pringsewu, Kabupaten Pringsewu, Provinsi Lampung**.',
    karomah: [
      'Dalam kesaksian para pejuang veteran Hizbullah Lampung dan para santri sepuh Pringsewu, karomah KH. Ghalib tampak dari keteguhan hati dan keberanian beliau di medan perang: sebelum memimpin santri dan pejuang maju menghadapi tank Belanda di Gedongtataan, beliau memimpin zikir dan pembacaan *Hizib Nashr* di Masjid Pringsewu hingga membangkitkan keberanian luar biasa di dada para pejuang.<!--more-->\n\nHingga hari ini, setiap tanggal **9–10 November** (bertepatan dengan Haul Syahidnya KH. Ghalib dan Hari Pahlawan Nasional), puluhan ribu santri, ulama Nahdlatul Ulama, pejabat pemerintah Provinsi Lampung, dan masyarakat tumpah ruah memadati Kompleks Masjid dan Makam KH. Ghalib di Kabupaten Pringsewu.',
    ],
    untoldStory:
      'Sanad keilmuan KH. Ghalib Pringsewu menjadi penghubung langsung antara **Jaringan Pesantren Jawa Timur–Madura (Syaikhona Kholil Bangkalan & Tebuireng Jombang)** dengan tumbuhnya ratusan pondok pesantren di **Provinsi Lampung** (Pringsewu, Lampung Tengah, Lampung Timur, hingga Metro).<!--more-->\n\nYayasan KH. Ghalib di Pringsewu Barat kini mengelola kompleks maqbarah yang asri, Masjid Jami’ KH. Ghalib, pondok pesantren, serta madrasah/sekolah dari tingkat dasar hingga menengah yang terus melahirkan kader-kader ulama dan cendekiawan Lampung.',
    barokahHajat:
      'Peziarah, santri pesantren Lampung, dan pejuang bangsa yang berziarah ke maqbarah KH. Ghalib di Pringsewu umumnya bertawassul memohon kepada Allah SWT keteguhan iman dan keberanian berjihad membela agama serta NKRI (*Hubbul Wathan Minal Iman*), keberkahan ilmu pesantren, serta kemuliaan syahid di jalan Allah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Mujahid Asy-Syahid KH. Ghalib (Pringsewu Lampung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّهِيدِ كِيَاهِي الحَاجِّ غَالِبْ بْنِ رُوحَانِي وَشُهَدَاءِ حِزْبِ اللهِ وَسَبِيلِ اللهِ فِي فْرِينْغسِيوُو لَامْفُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّهِيدِ كِيَاهِي الحَاجِّ غَالِبْ بْنِ رُوحَانِي وَشُهَدَاءِ حِزْبِ اللهِ وَسَبِيلِ اللهِ فِي فْرِينْغسِيوُو لَامْفُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahidisy-Syahiid Kiyaahii al-Haajj Ghaalib bin Ruuhaanii wa Syuhadaa-i Hizbillaah wa Sabiilillaah fii Pringsewu Lampung syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang syahid KH. Ghalib bin Rohani beserta para syuhada Hizbullah dan Sabilillah di Pringsewu Lampung, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang syahid KH. Ghalib bin Rohani beserta para syuhada Hizbullah dan Sabilillah di Pringsewu Lampung, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '9–10 November (Puncak Haul Akbar Syahidnya KH. Ghalib & Hari Pahlawan Nasional di Kompleks Masjid Jami’ KH. Ghalib, Kelurahan Pringsewu Barat, Kecamatan Pringsewu, Kabupaten Pringsewu, Provinsi Lampung).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi Masjid Jami’ KH. Ghalib dan cungkup maqbarah beliau, serta menjaga ketenangan kegiatan pendidikan Yayasan KH. Ghalib.',
    facilities: ['Cungkup Utama Maqbarah KH. Ghalib Pringsewu', 'Masjid Jami’ & Pondok Pesantren KH. Ghalib Pringsewu Barat', 'Monumen Perjuangan KH. Ghalib', 'Area Parkir Luas Bus Wisata Religi Pringsewu Lampung'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Tim Sejarah Pemerintah Provinsi Lampung (1995). Sejarah Perjuangan Kemerdekaan di Daerah Lampung (Peran KH. Ghalib dan Laskar Hizbullah Pringsewu). Bandar Lampung.',
      'Yayasan KH. Ghalib Pringsewu — Biografi dan Sejarah Perjuangan Al-Maghfurlah KH. Ghalib (1899–1949 M). Pringsewu: Yayasan KH. Ghalib.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];

