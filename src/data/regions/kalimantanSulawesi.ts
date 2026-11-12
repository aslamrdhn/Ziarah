import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Pulau Kalimantan (5 Provinsi) & Pulau Sulawesi (6 Provinsi).
 * Tahap 6 — Ekspansi & Kurasi Penuh Kalimantan Selatan, Kalimantan Barat, Kalimantan Tengah,
 * Kalimantan Timur, Kalimantan Utara, Sulawesi Selatan, Sulawesi Barat, Sulawesi Tengah,
 * Sulawesi Utara, Gorontalo, dan Sulawesi Tenggara.
 *
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const KALIMANTAN_SULAWESI_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. PROVINSI KALIMANTAN SELATAN (BUMI LAMBUNG MANGKURAT / BANJAR)
  // =========================================================================
  {
    id: 'syekh-muhammad-arsyad-al-banjari',
    legacyId: 'ulama-28',
    name: 'Makam Syekh Muhammad Arsyad bin Abdullah Al-Banjari (Datu Kalampayan — Astambul, Banjar)',
    title: 'Matahari Islam Kalimantan, Pengarang Kitab Sabilal Muhtadin & Maha Guru Dzurriyah Ulama Nusantara (1710–1812 M)',
    description:
      'Kompleks Kubah Makam Datu Kalampayan (Syekh Muhammad Arsyad bin Abdullah Al-Banjari, 1122–1227 H / 1710–1812 M) di Desa Kalampayan Tengah, Kecamatan Astambul, Kabupaten Banjar, Provinsi Kalimantan Selatan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-18 – Awal Abad ke-19 M (17 Maret 1710 – 3 Oktober 1812 M / 6 Syawal 1227 H)',
    province: 'Kalimantan Selatan',
    city: 'Banjar',
    district: 'Kec. Astambul',
    address: 'Desa Kalampayan Tengah, Kec. Astambul, Kabupaten Banjar',
    location: {
      lat: -3.3324,
      lng: 114.8594,
      address: 'Desa Kalampayan Tengah, Kec. Astambul, Kabupaten Banjar',
      district: 'Kec. Astambul',
      city: 'Banjar',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Keilmuan Martapura & Kubah Makam Datu Kalampayan (Syekh Muhammad Arsyad Al-Banjari) di Kabupaten Banjar',
    sanad:
      'Syekh Muhammad Arsyad bin Abdullah bin Abdurrahman Al-Banjari; bermukim 30 tahun di Makkah dan 5 tahun di Madinah bersama Empat Serangkai Ulama Haramain (Syekh Abdus Shamad Al-Falimbani, Syekh Abdul Wahab Bugis, dan Syekh Abdurrahman Al-Batawi) berguru kepada Syaikh ’Athaillah bin Ahmad Al-Mishri, Syaikh Muhammad bin Abdul Karim As-Samman Al-Madani (pendiri Thariqah Sammaniyah), dan Syaikh Sulaiman Al-Kurdi; kakek buyut dari Syekh Abdurrahman Siddiq (Tuan Guru Sapat) dan KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul).',
    karya: [
      'Kitab Sabilal Muhtadin lit-Tafaqquh fi Amrid-Din (ditulis tahun 1193–1195 H / 1779–1781 M atas permintaan Sultan Tahmidullah II Banjar, kitab fikih Syafi’iyah rujukan utama di seluruh Asia Tenggara)',
      'Kitab Tuhfatur Raghibin (akidah Ahlussunnah wal Jama’ah), Kanzul Ma’rifah (tasawuf), Luqthatul ’Ajlan, dan Kitab al-Fara’idh',
      'Pembukaan kampung pendidikan santri Dalam Pagar (Martapura Timur) dan saluran irigasi pertanian Sungai Tuan sepanjang 6 kilometer di Kalampayan',
      'Pembentukan lembaga peradilan Islam (Mahkamah Syar’iyah / Mufti) di Kesultanan Banjar serta pelurusan arah kiblat masjid-masjid di Batavia dan Kalimantan (1772 M)',
    ],
    history:
      '**Syekh Muhammad Arsyad bin Abdullah Al-Banjari**—yang sangat dimuliakan oleh masyarakat Banjar dan umat Islam Asia Tenggara dengan gelar **Datu Kalampayan** (lahir di Lok Gabang, Martapura pada **15 Shafar 1122 H / 17 Maret 1710 M** dan wafat di Kalampayan pada **6 Syawal 1227 H / 3 Oktober 1812 M** dalam usia **102 tahun Masehi / 105 tahun Hijriah**)—adalah ulama besar yang dijuluki *"Matahari Agama dari Tanah Kalimantan"*. Sejak usia 7 tahun, kecerdasan dan kemerduan bacaan Al-Qur’an beliau menarik perhatian **Sultan Hamidullah (Sultan Kuning, memerintah 1700–1734 M)** hingga beliau diangkat anak asuh di lingkungan keraton Kesultanan Banjar. Pada usia 30 tahun (1740 M), Sultan Banjar membiayai penuh keberangkatan Muhammad Arsyad ke Tanah Suci Makkah dan Madinah.\n\nSelama **35 tahun menuntut ilmu di Haramain (30 tahun di Makkah dan 5 tahun di Madinah)**, Syekh Muhammad Arsyad Al-Banjari menjelma menjadi ulama besar yang diberi izin mengajar di **Masjidil Haram**. Beliau bersahabat erat dalam jaringan *"Empat Serangkai Ulama Jawi"* bersama **Syekh Abdus Shamad Al-Falimbani** (Palembang), **Syekh Abdul Wahab Bugis** (Sulawesi Selatan, yang kemudian menjadi menantu beliau), dan **Syekh Abdurrahman Al-Batawi** (Betawi). Dalam perjalanan pulang ke Nusantara pada tahun **1186 H (1772 M)**, beliau singgah di Batavia dan membetulkan arah kiblat Masjid Jembatan Lima, Masjid Pekojan, serta Masjid Luar Batang dengan penguasaan ilmu falak/astronomi yang sangat akurat.\n\nSetibanya di Martapura pada bulan **Ramadhan 1186 H (Desember 1772 M)**, **Sultan Tahmidullah II** menyambut beliau dengan sukacita dan menghadiahkan sebidang tanah hutan di tepi Sungai Martapura yang kemudian dibuka oleh Syekh Muhammad Arsyad bersama menantunya menjadi perkampungan santri **Dalam Pagar**. Atas permohonan Sultan Tahmidullah II pada tahun **1193 H (1779 M)**, beliau menyusun mahakarya fikih berbahasa Melayu Jawi **Sabilal Muhtadin lit-Tafaqquh fi Amrid-Din** yang selesai pada **27 Rabiul Akhir 1195 H (1781 M)** dan dicetak di Makkah, Kairo, serta Istanbul. Beliau wafat pada malam Selasa, **6 Syawal 1227 H (3 Oktober 1812 M)** dan dimakamkan di **Desa Kalampayan Tengah, Kecamatan Astambul, Kabupaten Banjar**.',
    karomah: [
      'Dalam kitab manaqib *Datu Kalampayan* (karya KH. Zafry Zamzam dan Abu Daudi) serta tradisi lisan masyarakat Banjar, karomah terbesar Syekh Muhammad Arsyad Al-Banjari adalah **keberkahan ilmu dan dzurriyah (keturunan) beliau** yang tak pernah putus melahirkan ratusan ulama besar dan wali quthub di Kalimantan, Sumatera, hingga Makkah—mulai dari **Mufti Jamaluddin**, **Syekh Muhammad Nafis** (jaringan murid), **Syekh Abdurrahman Siddiq (Tuan Guru Sapat)**, **KH. Zainal Ilmi Dalam Pagar**, hingga **KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul)**.<!--more-->\n\nDi Masjid Jembatan Lima Jakarta Barat, hingga hari ini masih tersimpan prasasti sejarah tahun 1772 M yang mencatat peristiwa ketika Syekh Muhammad Arsyad Al-Banjari memutar arah kiblat masjid sebesar 25 derajat ke kanan tepat mengarah ke bangunan Ka’bah di Makkah.',
    ],
    untoldStory:
      'Syekh Muhammad Arsyad Al-Banjari bukan hanya ulama kitab di atas mimbar, melainkan juga pelopor kemandirian ekonomi dan pangan umat: beliau memimpin para santrinya menggali terusan air sepanjang sekitar 6 kilometer yang dikenal sebagai **Sungai Tuan** untuk mengairi ribuan hektare lahan persawahan baru di kawasan Kalampayan dan Astambul.<!--more-->\n\nSetiap tanggal **6 Syawal** (sepekan setelah Hari Raya Idul Fitri), ratusan ribu jamaah dari seluruh penjuru Kalimantan, Jawa, Sumatera, dan Malaysia memadati **Kubah Datu Kalampayan di Kecamatan Astambul** serta Masjid Tuhfaturroghibin Dalam Pagar untuk memperingati **Haul Akbar Syekh Muhammad Arsyad Al-Banjari**.',
    barokahHajat:
      'Peziarah, santri, dan orang tua yang berziarah ke Kubah Datu Kalampayan di Astambul Kabupaten Banjar umumnya bertawassul memohon kepada Allah SWT dikaruniai keturunan (*dzurriyah*) yang alim dan shalih, kefahaman mendalam dalam ilmu fikih (*Sabilal Muhtadin*), serta keberkahan umur yang panjang dan produktif dalam ketaatan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ أَرْشَدْ بْنِ عَبْدِ اللهِ الْبَنْجَرِيِّ (دَاتُو كَلَامْفَايَانْ) صَاحِبِ سَبِيلِ الْمُهْتَدِينَ وَذُرِّيَّاتِهِ وَمَشَايِخِ بَنْجَرْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاهْدِنَا سَبِيلَ الْمُهْتَدِينَ وَارْزُقْنَا ذُرِّيَّةً صَالِحَةً عَالِمَةً وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ أَرْشَدْ بْنِ عَبْدِ اللهِ الْبَنْجَرِيِّ (دَاتُو كَلَامْفَايَانْ) صَاحِبِ سَبِيلِ الْمُهْتَدِينَ وَذُرِّيَّاتِهِ وَمَشَايِخِ بَنْجَرْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاهْدِنَا سَبِيلَ الْمُهْتَدِينَ وَارْزُقْنَا ذُرِّيَّةً صَالِحَةً عَالِمَةً وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatil-'Aarifi billaah asy-Syaikh Muhammad Arsyad bin 'Abdillaah al-Banjarii (Datu Kalampayan) shaahibi Sabiilil-Muhtadiin wa dzurriyyaatihii wa Masyaayikhi Banjar syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wahdinaa sabiilal-muhtadiina warzuqnaa dzurriyyatan shaalihatan 'aalimatan wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-arif billah Syekh Muhammad Arsyad bin Abdullah Al-Banjari (Datu Kalampayan) pengarang kitab Sabilal Muhtadin beserta seluruh dzurriyahnya dan para masyayikh Banjar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, tuntunlah kami meniti jalan orang-orang yang mendapat petunjuk (Sabilal Muhtadin), karuniakanlah kepada kami keturunan yang shalih dan berilmu, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-arif billah Syekh Muhammad Arsyad bin Abdullah Al-Banjari (Datu Kalampayan) pengarang kitab Sabilal Muhtadin beserta seluruh dzurriyahnya dan para masyayikh Banjar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, tuntunlah kami meniti jalan orang-orang yang mendapat petunjuk (Sabilal Muhtadin), karuniakanlah kepada kami keturunan yang shalih dan berilmu, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '6 Syawal (Puncak Haul Akbar Datu Kalampayan Syekh Muhammad Arsyad Al-Banjari di Kubah Kalampayan Tengah, Kecamatan Astambul & Masjid Jami’ Tuhfaturroghibin Dalam Pagar, Kabupaten Banjar).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (laki-laki dianjurkan berpeci putih/baju koko dan kain sarung), melepas alas kaki di batas suci Kubah Datu Kalampayan, memisahkan saf peziarah laki-laki dan perempuan, serta menjaga kekhusyukan bacaan Yasin dan Tahlil.',
    facilities: ['Kubah Utama Makam Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)', 'Masjid Jami’ Tuhfaturroghibin Dalam Pagar', 'Dermaga Wisata Religi Sungai Martapura', 'Pendopo Ziarah, Tempat Wudhu, Toilet & Area Parkir Bus Peziarah Astambul'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII dan XVIII. Jakarta: Kencana Prenada Media Group.',
      'Daudi, Abu (1996). Maulana Syekh Muhammad Arsyad Al-Banjari (Tuan Haji Besar). Martapura: Sekretariat Madrasah Sullamul ’Ulum Dalam Pagar.',
      'Steenbrink, Karel A. (1984). Beberapa Aspek tentang Islam di Indonesia Abad ke-19. Jakarta: Bulan Bintang.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'guru-sekumpul-martapura',
    legacyId: 'ulama-2',
    name: 'Makam KH. Muhammad Zaini bin Abdul Ghani Al-Banjari (Abah Guru Sekumpul — Martapura, Banjar)',
    title: 'Waliyullah Kharismatik Tanah Banjar, Mursyid Thariqah Sammaniyah & Magnet Haul Terbesar di Asia Tenggara (1942–2005 M)',
    description:
      'Kompleks Kubah Makam Musholla Ar-Raudhah Sekumpul, tempat peristirahatan Al-Alim Al-Allamah Al-Arif Billah KH. Muhammad Zaini bin Abdul Ghani Al-Banjari (Abah Guru Sekumpul, 1942–2005 M), berdampingan dengan pamannya KH. Seman Mulia dan KH. Salman Jalil di Kelurahan Sekumpul, Kecamatan Martapura, Kabupaten Banjar, Provinsi Kalimantan Selatan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 – Awal Abad ke-21 M (11 Februari 1942 – 10 Agustus 2005 M / 5 Rajab 1426 H)',
    province: 'Kalimantan Selatan',
    city: 'Banjar',
    district: 'Kec. Martapura',
    address: 'Kompleks Musholla Ar-Raudhah, Jl. Sekumpul, Kel. Sekumpul, Kec. Martapura, Kabupaten Banjar',
    location: {
      lat: -3.4192,
      lng: 114.8569,
      address: 'Kompleks Musholla Ar-Raudhah, Jl. Sekumpul, Kel. Sekumpul, Kec. Martapura, Kabupaten Banjar',
      district: 'Kec. Martapura',
      city: 'Banjar',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Kota Santri Martapura (Basis Keilmuan Pondok Pesantren Darussalam & Musholla Ar-Raudhah Abah Guru Sekumpul)',
    sanad:
      'KH. Muhammad Zaini bin Abdul Ghani bin Abdul Manaf bin Muhammad Seman bin H. Muhammad Sa’ad bin H. Abdullah bin Mufti H. Muhammad Khalid bin Khalifah H. Hasanuddin bin Syekh Muhammad Arsyad Al-Banjari (keturunan ke-8 Datu Kalampayan); dididik di Pondok Pesantren Darussalam Martapura oleh pamannya KH. Seman Mulia, KH. Sya’rani Arif, KH. Husin Qadri, dan KH. Salim Ma’ruf; serta menerima ijazah sanad dari Syaikh Yasin bin Isa Al-Fadani, Syaikh Muhammad Amin Kutbi, Kyai Falak Bogor, dan Syekh Syarwani Abdan (Guru Bangil).',
    karya: [
      'Risalah Mubarakah, Manaqib Asy-Syaikh As-Sayyid Muhammad bin Abdul Karim Al-Qadiri Al-Hasani As-Samman Al-Madani, dan Ar-Risalatun Nuraniyyah fi Syarhit Tawassulatis Sammaniyyah',
      'Nubdzah min Manaqibil Imam Al-Masyhur bil-Ustadzil A’zham Muhammad bin Ali Ba’alawi dan Al-Imdad fi Auradil Awrad',
      'Pembangunan Kompleks Majelis Taklim dan Musholla Ar-Raudhah Sekumpul Martapura yang menggemakan Maulid Simthuddurar serta Maulid Habsyi ke seluruh Nusantara',
    ],
    history:
      '**Al-Alim Al-Allamah Al-Arif Billah KH. Muhammad Zaini bin Abdul Ghani Al-Banjari**—yang sangat dicintai oleh jutaan umat Islam dengan panggilan takzim **Abah Guru Sekumpul** atau **Guru Ijai** (lahir di Tunggul Irang, Martapura pada malam Rabu, **27 Muharram 1361 H / 11 Februari 1942 M** dengan nama kecil **Qusyairi**, dan wafat pada Rabu pagi, **5 Rajab 1426 H / 10 Agustus 2005 M**)—adalah ulama sufi kharismatik keturunan generasi ke-8 dari **Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)**. Sejak usia 7 tahun beliau telah hafal Al-Qur’an dan pada usia 9 tahun telah hafal *Tafsir Jalalain* di bawah bimbingan ketat ayahandanya (**H. Abdul Ghani**), ibundanya (**Hj. Masliah**), neneknya (**Salbiyah**), serta paman sekaligus murobbi ruhaninya, **KH. Seman Mulia**.\n\nSaat menempuh pendidikan di **Pondok Pesantren Darussalam Martapura**, Abah Guru Sekumpul menimba ilmu langsung dari para ulama besar Tanah Banjar seperti **KH. Sya’rani Arif**, **KH. Husin Qadri**, **KH. Salim Ma’ruf**, dan ahli falak **KH. Salman Jalil**. Beliau juga berguru secara khusus tentang tasawuf dan suluk kepada sepupunya di Jawa Timur, **KH. Muhammad Syarwani Abdan (Guru Bangil)**, serta menerima sanad hadis dan *Thariqah Sammaniyah* dari ulama besar Haramain seperti **Syaikh Yasin Al-Fadani** dan **Sayyid Muhammad Amin Kutbi**.\n\nPada akhir dekade 1980-an, beliau memindahkan pusat pengajian dari Keraton ke kawasan kebun karet yang kemudian dibangun menjadi **Kompleks Musholla Ar-Raudhah, Kelurahan Sekumpul, Kecamatan Martapura**. Melalui kemerduan suara beliau yang tiada tara dalam melantunkan **Maulid Simthuddurar (Al-Habsyi)** dan pengajian kitab *Ihya’ ’Ulumiddin*, Sekumpul tumbuh menjadi lautan mahabbah kepada Rasulullah SAW dan para wali Allah. Ketika beliau wafat pada **5 Rajab 1426 H (10 Agustus 2005 M)**, beliau dimakamkan di dalam **Kubah Musholla Ar-Raudhah Sekumpul** berdampingan dengan makam pamannya (**KH. Seman Mulia**) dan gurunya (**KH. Salman Jalil**).',
    karomah: [
      'Dalam kesaksian para ulama dunia, habaib Hadramaut, dan masyarakat Indonesia, karomah nyata Abah Guru Sekumpul yang disaksikan setiap tahun adalah fenomena **Haul Akbar Guru Sekumpul setiap tanggal 5 Rajab di Martapura**: tanpa undangan resmi dan tanpa panitia pencari dana, lebih dari **2 hingga 3 juta peziarah** datang memadati Martapura–Banjarbaru, dan seluruh warga Kalimantan Selatan membuka rumah, dapur umum, penginapan, hingga bensin gratis sepanjang ratusan kilometer semata-mata karena cinta kepada Abah Guru Sekumpul.<!--more-->\n\nSemasa hidupnya, majelis Abah Guru Sekumpul di Musholla Ar-Raudhah menjadi tempat berkumpulnya para presiden, menteri, habaib sepuh, hingga rakyat kecil yang dijamu makan oleh beliau setiap selesai pengajian dengan penuh kasih sayang dan kedermawanan.',
    ],
    untoldStory:
      'Abah Guru Sekumpul sangat menekankan adab memuliakan ulama leluhur dan *Ahlul Bait* Nabi Muhammad SAW: sebelum seseorang berziarah ke Sekumpul, beliau semasa hidup selalu menganjurkan jamaahnya untuk terlebih dahulu menziarahi datuk beliau, **Syekh Muhammad Arsyad Al-Banjari di Kalampayan**, serta **KH. Zainal Ilmi di Dalam Pagar**.<!--more-->\n\nDi dalam Kubah Sekumpul, terdapat tiga pusara mulia yang berjajar rapi: pusara **KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul)**, pusara paman yang mendidik beliau sejak kecil (**KH. Seman Mulia**), dan pusara ahli falak/qadhi Banjar (**KH. Salman Jalil**).',
    barokahHajat:
      'Peziarah yang berziarah ke Kubah Abah Guru Sekumpul di Martapura umumnya bertawassul memohon kepada Allah SWT limpahan rasa cinta (*mahabbah*) yang mendalam kepada Rasulullah SAW melalui keberkahan shalawat, akhlak yang tawadhu dan pemurah, serta keberkahan rezeki yang halal dan melimpah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ زَيْنِي بْنِ عَبْدِ الْغَنِيِّ الْبَنْجَرِيِّ (أَبَاهْ غُورُو سَكُمْفُولْ) وَالشَّيْخِ سَمَّانْ مُولِيَا وَالشَّيْخِ سَلْمَانْ جَلِيلْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا كَمَالَ الْمَحَبَّةِ لِنَبِيِّكَ وَأَوْلِيَائِكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ زَيْنِي بْنِ عَبْدِ الْغَنِيِّ الْبَنْجَرِيِّ (أَبَاهْ غُورُو سَكُمْفُولْ) وَالشَّيْخِ سَمَّانْ مُولِيَا وَالشَّيْخِ سَلْمَانْ جَلِيلْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا كَمَالَ الْمَحَبَّةِ لِنَبِيِّكَ وَأَوْلِيَائِكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatil-'Aarifi billaah asy-Syaikh Muhammad Zainii bin 'Abdil-Ghanii al-Banjarii (Abah Guru Sekumpul) wasy-Syaikh Samaan Mulia wasy-Syaikh Salmaan Jaliil syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnaa kamaalal-mahabbati li Nabiyyika wa Auliyaa-ika wanfa'naa bi asraarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-arif billah Syekh KH. Muhammad Zaini bin Abdul Ghani Al-Banjari (Abah Guru Sekumpul), KH. Seman Mulia, dan KH. Salman Jalil, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami kesempurnaan cinta kepada Nabi-Mu dan para wali-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-arif billah Syekh KH. Muhammad Zaini bin Abdul Ghani Al-Banjari (Abah Guru Sekumpul), KH. Seman Mulia, dan KH. Salman Jalil, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami kesempurnaan cinta kepada Nabi-Mu dan para wali-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Rajab (Puncak Haul Akbar Abah Guru Sekumpul di Kompleks Musholla Ar-Raudhah, Kelurahan Sekumpul, Kecamatan Martapura, Kabupaten Banjar — salah satu majelis haul terbesar di dunia Islam).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi, sopan, dan menutup aurat (dianjurkan berbusana putih), mematuhi arahan para relawan Ar-Raudhah Sekumpul, memisahkan jalur masuk peziarah laki-laki dan perempuan, serta tidak mengambil foto secara berlebihan di depan pusara kubah.',
    facilities: ['Kubah Makam Abah Guru Sekumpul, KH. Seman Mulia & KH. Salman Jalil', 'Musholla Agung Ar-Raudhah Sekumpul', 'Posko Relawan & Fasilitas Wudhu/Toilet Peziarah', 'Area Parkir Terpadu Sekumpul Martapura'],
    openingHours: 'Mengikuti Jadwal Resmi Pembukaan Kubah Ar-Raudhah Sekumpul (Umumnya Buka Sore/Malam & Hari Tertentu)',
    references: [
      'Tim Sahabat (2005). Mengenal Lebih Dekat Al-Alim Al-Allamah Al-Arif Billah Syekh H. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul). Martapura: Majelis Ar-Raudhah.',
      'Mujiburrahman (2014). Ulama Banjar Kharismatik Masa Kini di Kalimantan Selatan: Studi Terhadap Figur Guru Bachiet, Guru Danau, dan Guru Sekumpul. Banjarmasin: IAIN Antasari Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-suriansyah-banjarmasin',
    legacyId: 'auliya-16',
    name: 'Kompleks Makam Sultan Suriansyah & Khatib Dayyan (Kuin Utara, Banjarmasin Utara)',
    title: 'Raja Banjar Pertama yang Memeluk Islam (24 September 1526 M) & Ulama Utusan Kesultanan Demak Pengislam Tanah Banjar',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sultan Suriansyah (Pangeran Samudera, memerintah 1526–1550 M) beserta Ratu Intan Sari, Sultan Rahmatullah, dan Penghulu Agung Khatib Dayyan di Kelurahan Kuin Utara, Kecamatan Banjarmasin Utara, Kota Banjarmasin, Provinsi Kalimantan Selatan.',
    category: 'Auliya Nusantara',
    era: 'Paruh Pertama Abad ke-16 M (Memeluk Islam 24 September 1526 M / 6 Dzulhijjah 932 H – Wafat sekitar 1550 M)',
    province: 'Kalimantan Selatan',
    city: 'Banjarmasin',
    district: 'Kec. Banjarmasin Utara',
    address: 'Jl. Kuin Utara, Kel. Kuin Utara, Kec. Banjarmasin Utara, Kota Banjarmasin',
    location: {
      lat: -3.2932,
      lng: 114.5698,
      address: 'Jl. Kuin Utara, Kel. Kuin Utara, Kec. Banjarmasin Utara, Kota Banjarmasin',
      district: 'Kec. Banjarmasin Utara',
      city: 'Banjarmasin',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sultan_Suriansyah_Mosque.JPG',
    imageSource: 'Wikimedia Commons — Masjid Sultan Suriansyah (1526 M), Masjid Tertua di Kalimantan Selatan Peninggalan Sultan Suriansyah & Khatib Dayyan di Kuin Utara Banjarmasin',
    sanad:
      'Sultan Suriansyah (lahir dengan nama Raden Samudera, cucu Maharaja Sukarama dari Kerajaan Negara Daha) yang diislamkan oleh Khatib Dayyan (ulama besar utusan Sultan Trenggono dari Kesultanan Demak Bintoro dan murid jaringan Sunan Kudus / Sunan Gunung Jati).',
    karya: [
      'Pendirian Kesultanan Banjar sebagai kerajaan Islam pertama di Kalimantan Selatan pada 6 Dzulhijjah 932 H / 24 September 1526 M (ditetapkan sebagai Hari Jadi Kota Banjarmasin)',
      'Pembangunan Masjid Sultan Suriansyah di tepi Sungai Kuin (1526 M), masjid kayu ulin tertua di Kalimantan Selatan',
      'Peletakan dasar hukum syariat Islam dan jabatan Penghulu / Khatib di lingkungan Keraton Banjar Kuin',
    ],
    history:
      '**Sultan Suriansyah**—yang sebelum memeluk Islam dikenal sebagai **Raden Samudera** atau **Pangeran Samudera** (memerintah **1526–1550 M**)—adalah pendiri **Kesultanan Banjar** sekaligus raja pertama di Kalimantan Selatan yang memeluk agama Islam. Sebagaimana tercatat dalam naskah klasik **Hikayat Banjar**, ketika terjadi sengketa suksesi takhta di Kerajaan Hindu **Negara Daha** antara Pangeran Samudera (cucu sah pewaris wasiat Maharaja Sukarama) melawan pamannya **Pangeran Tumenggung**, Patih Masih dan para menteri bandar pelabuhan **Banjarmasih (Kuin)** mengangkat Pangeran Samudera sebagai raja di muara Sungai Kuin serta menyarankan beliau meminta bantuan militer ke **Kesultanan Demak Bintoro** di Jawa.\n\n**Sultan Trenggono** dari Kesultanan Demak menyanggupi permohonan tersebut dengan syarat Pangeran Samudera beserta seluruh rakyat Banjar bersedia memeluk agama Islam. Setelah memperoleh kemenangan dan menyatukan Negara Daha ke dalam pangkuan Banjarmasin pada tanggal **6 Dzulhijjah 932 H (24 September 1526 M)**, Pangeran Samudera mengucapkan dua kalimat syahadat di bawah bimbingan ulama utusan Kesultanan Demak, **Khatib Dayyan**, dan menyandang gelar **Sultan Suriansyah (Sultan Suryanullah)**.\n\nBersama **Khatib Dayyan**, Sultan Suriansyah mendirikan **Masjid Sultan Suriansyah** di tepi Sungai Kuin yang ditopang tiang-tiang kayu ulin raksasa berukir kaligrafi dan sulur Melayu-Banjar. Ketika wafat sekitar tahun **1550 M**, Sultan Suriansyah dimakamkan di dalam **Kompleks Makam Sultan Suriansyah di Kelurahan Kuin Utara, Kecamatan Banjarmasin Utara** berdampingan dengan pusara **Khatib Dayyan**, permaisuri **Ratu Intan Sari**, serta putranya **Sultan Rahmatullah**.',
    karomah: [
      'Dalam naskah *Hikayat Banjar* dan tradisi lisan masyarakat Kuin Banjarmasin, sosok **Khatib Dayyan** dan **Sultan Suriansyah** dikenang memiliki kewibawaan spiritual luar biasa yang mampu mengubah masyarakat sungai Barito dan Martapura dari kepercayaan lama menjadi masyarakat Muslim yang sangat taat tanpa pertumpahan darah berkepanjangan, sebab Pangeran Tumenggung tetap diberi wilayah kehormatan di Batang Alai.<!--more-->\n\nDi Kompleks Makam Sultan Suriansyah di Kuin Utara, nisan-nisan kuno berukir kaligrafi dan motif *tunjuk langit* serta bangunan **Masjid Sultan Suriansyah (1526 M)** yang berjarak hanya sekitar 300 meter dari makam masih berdiri kokoh melintasi usia 500 tahun.',
    ],
    untoldStory:
      'Tanggal resmi masuk Islamnya Pangeran Samudera menjadi **Sultan Suriansyah** di tangan **Khatib Dayyan**—yakni **24 September 1526 M (6 Dzulhijjah 932 H)**—kini diabadikan secara resmi oleh pemerintah dan sejarawan sebagai **Hari Jadi Kota Banjarmasin**.<!--more-->\n\nPeziarah yang mengunjungi **Kompleks Makam Sultan Suriansyah dan Khatib Dayyan** di Kuin Utara dapat menempuh jalur darat maupun menyusuri wisata air **Sungai Barito dan Sungai Kuin** menggunakan perahu *klotok* sambil melaksanakan shalat sunnah di **Masjid Bersejarah Sultan Suriansyah**.',
    barokahHajat:
      'Peziarah dan pemimpin daerah yang berziarah ke Kompleks Makam Sultan Suriansyah dan Khatib Dayyan di Kuin Utara Banjarmasin umumnya bertawassul memohon kepada Allah SWT kepemimpinan yang adil dan membawa hidayah bagi masyarakat, keutuhan persaudaraan bangsa, serta keberkahan dakwah yang damai.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Suriansyah & Khatib Dayyan (Kuin Utara Banjarmasin)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ سُورْيَانْشَاهْ أَوَّلِ مُلُوكِ الْإِسْلَامِ فِي بَنْجَرْ وَالشَّيْخِ الْخَطِيبِ دَيَّانْ وَالسُّلْطَانِ رَحْمَةُ اللهِ وَأَوْلِيَاءِ كُوِينْ بَنْجَرْمَاسِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ سُورْيَانْشَاهْ أَوَّلِ مُلُوكِ الْإِسْلَامِ فِي بَنْجَرْ وَالشَّيْخِ الْخَطِيبِ دَيَّانْ وَالسُّلْطَانِ رَحْمَةُ اللهِ وَأَوْلِيَاءِ كُوِينْ بَنْجَرْمَاسِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Suriansyah awwali Muluukil-Islaami fii Banjar wasy-Syaikh al-Khathiib Dayyaan was-Sulthaan Rahmatullaah wa Auliyaa-i Kuin Banjarmasin syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa a'izzal-Islaama wal-Muslimiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Suriansyah raja Islam pertama di Tanah Banjar, Syekh Khatib Dayyan, Sultan Rahmatullah, beserta seluruh auliya di Kuin Banjarmasin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum Muslimin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Suriansyah raja Islam pertama di Tanah Banjar, Syekh Khatib Dayyan, Sultan Rahmatullah, beserta seluruh auliya di Kuin Banjarmasin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum Muslimin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '24 September / Bulan Dzulhijjah (Peringatan Haul Sultan Suriansyah, Khatib Dayyan & Milad Kesultanan Banjar / Hari Jadi Kota Banjarmasin di Kompleks Makam Sultan Suriansyah, Kelurahan Kuin Utara, Banjarmasin Utara).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam kayu ulin Sultan Suriansyah dan Khatib Dayyan, serta menjaga kelestarian cagar budaya abad ke-16 M.',
    facilities: ['Cungkup Cagar Budaya Makam Sultan Suriansyah & Khatib Dayyan', 'Masjid Bersejarah Sultan Suriansyah (Berjarak 300 m)', 'Dermaga Perahu Wisata Religi Sungai Kuin', 'Area Parkir Peziarah Kuin Utara Banjarmasin'],
    openingHours: 'Buka Setiap Hari 07.00 – 22.00 WITA',
    references: [
      'Ras, J.J. (1968). Hikajat Bandjar: A Study in Malay Historiography. The Hague: Martinus Nijhoff.',
      'Ideham, M. Suriansyah, dkk. (2003). Sejarah Banjar. Banjarmasin: Badan Penelitian dan Pengembangan Daerah Provinsi Kalimantan Selatan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-basirih-banjarmasin',
    legacyId: 'habib-12',
    name: 'Makam Al-Habib Hamid bin Abbas Bahasyim (Habib Basirih — Banjarmasin Selatan)',
    title: 'Waliyullah Majdzub Tepian Sungai Martapura ("Kubah Basirih") & Cagar Budaya Religi Utama Kota Banjarmasin (Wafat 1949 M)',
    description:
      'Kompleks Cagar Budaya Kubah Basirih (Makam Al-Habib Hamid bin Abbas Bahasyim, wafat 18 Jumadil Tsani 1368 H / 1949 M) di Jl. Keramat Basirih, Kelurahan Basirih Selatan, Kecamatan Banjarmasin Selatan, Kota Banjarmasin, Provinsi Kalimantan Selatan.',
    category: 'Habaib',
    era: 'Abad ke-19 – Paruh Pertama Abad ke-20 M (Wafat 18 Jumadil Akhir 1368 H / Mei 1949 M)',
    province: 'Kalimantan Selatan',
    city: 'Banjarmasin',
    district: 'Kec. Banjarmasin Selatan',
    address: 'Jl. Keramat Basirih, RT 13, Kel. Basirih Selatan, Kec. Banjarmasin Selatan, Kota Banjarmasin',
    location: {
      lat: -3.3478,
      lng: 114.5622,
      address: 'Jl. Keramat Basirih, RT 13, Kel. Basirih Selatan, Kec. Banjarmasin Selatan, Kota Banjarmasin',
      district: 'Kec. Banjarmasin Selatan',
      city: 'Banjarmasin',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sultan_Suriansyah_Mosque.JPG',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Sungai Kota Banjarmasin (Kubah Makam Habib Hamid bin Abbas Bahasyim di Basirih Selatan)',
    sanad:
      'Al-Habib Hamid bin Abbas bin Abdullah bin Husein bin Awadh bin Umar Bahasyim Ba’alawi; dzurriyah Rasulullah SAW dari marga Bahasyim Hadramaut yang leluhurnya (Habib Awadh bin Umar Bahasyim) berniaga dan berdakwah di Nusantara sejak abad ke-19 M; bersahabat dan saling memuliakan dengan para ulama besar Martapura dan Banjarmasin.',
    karya: [
      'Keteladanan riyadhah khalwat (uzlah) bertahun-tahun di tepian Sungai Basirih dalam zikir dan mahabbah kepada Allah SWT',
      'Warisan Kubah Keramat Basirih yang menjadi poros wisata religi sungai utama di Kota Banjarmasin',
    ],
    history:
      '**Al-Habib Hamid bin Abbas Bahasyim**—yang sangat masyhur di seluruh Kalimantan dengan sebutan **Habib Basirih** (lahir di Banjarmasin pada paruh kedua abad ke-19 M dan wafat pada **18 Jumadil Tsani 1368 H / Mei 1949 M**)—adalah seorang *waliyullah* dari kalangan *Saadah Ba’alawi* marga **Bahasyim** yang dikenal memiliki maqam *khalwat* (pengasingan diri untuk beribadah) dan *jadzab* (tenggelam dalam kecintaan ilahiah). Leluhur beliau berasal dari Hadramaut, Yaman yang merantau ke Nusantara dan menetap di tepian Sungai Martapura/Barito, Kota Banjarmasin.\n\nDalam perjalanan ruhaninya, Habib Hamid bin Abbas Bahasyim pernah menjalani *khalwat* (uzlah) yang sangat panjang di sebuah pondok kecil di atas batang kayu/perahu di tepian **Sungai Basirih (Kelurahan Basirih Selatan, Kecamatan Banjarmasin Selatan)** yang kala itu masih berupa hutan rawa pasang surut. Selama masa khalwat tersebut, beliau hanya berzikir, bershalawat, dan bermunajat kepada Allah SWT. Sekembalinya dari masa khalwat, para ulama sepuh Banjarmasin dan Martapura—termasuk di kemudian hari **KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul)**—sangat memuliakan maqam kewalian Habib Hamid Bahasyim.\n\nBeliau wafat pada tanggal **18 Jumadil Tsani 1368 H (1949 M)** dan dimakamkan di **Kelurahan Basirih Selatan, Kecamatan Banjarmasin Selatan** di dekat jembatan tol Basirih tepi Sungai Martapura. Kubah makam beliau (**Kubah Basirih**) kini ditetapkan sebagai Situs Cagar Budaya Kota Banjarmasin yang dikunjungi ribuan peziarah setiap hari melalui jalur darat maupun perahu *klotok*.',
    karomah: [
      'Dalam manaqib lisan masyarakat Banjar dan kesaksian para ulama, di antara karomah Habib Hamid bin Abbas Bahasyim (Habib Basirih) adalah ketahanan fisik dan ruhaninya saat berkhalwat di atas sungai di bawah terik matahari dan hujan lebat tanpa tersentuh penyakit, serta seringnya para nakhoda kapal dan nelayan di Sungai Barito melihat cahaya memancar dari pondok khalwat beliau di malam hari.<!--more-->\n\nDi halaman kompleks Kubah Basirih, berdiri pula sebuah bangunan rumah panggung kayu ulin bersejarah milik sepupu beliau (**Rumah Kanno / Habib Hasan Bahasyim**) yang selamat melewati masa pengeboman Perang Dunia II di Banjarmasin.',
    ],
    untoldStory:
      '**Abah Guru Sekumpul (KH. Muhammad Zaini bin Abdul Ghani)** semasa hidupnya sering berziarah ke **Kubah Habib Basirih** dan menganjurkan para muridnya untuk menziarahi Habib Hamid bin Abbas Bahasyim sebagai salah satu *wali paku bumi* Kota Banjarmasin bersama **Sultan Suriansyah di Kuin**.<!--more-->\n\nSetiap peringatan **Haul Akbar Habib Hamid bin Abbas Bahasyim (Habib Basirih)** pada bulan **Jumadil Akhir**, puluhan ribu peziarah memadati tepian Sungai Basirih menggunakan ratusan perahu *klotok* berhias bendera dan jalur darat Banjarmasin Selatan.',
    barokahHajat:
      'Peziarah yang berziarah ke Kubah Habib Hamid bin Abbas Bahasyim (Habib Basirih) di Banjarmasin Selatan umumnya bertawassul memohon kepada Allah SWT keikhlasan dalam berzikir dan berkhalwat dari kesombongan dunia, keberkahan kecintaan kepada *Ahlul Bait* Nabi SAW, serta keselamatan pelayaran dan perniagaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Hamid bin Abbas Bahasyim (Habib Basirih Banjarmasin)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْمَجْذُوبِ الْعَارِفِ بِاللهِ الْحَبِيبِ حَامِدْ بْنِ عَبَّاسْ بَاهَاشِمْ (حَبِيبْ بَاسِيرِيهْ) وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاجْذِبْ قُلُوبَنَا إِلَى مَحَبَّتِكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْمَجْذُوبِ الْعَارِفِ بِاللهِ الْحَبِيبِ حَامِدْ بْنِ عَبَّاسْ بَاهَاشِمْ (حَبِيبْ بَاسِيرِيهْ) وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاجْذِبْ قُلُوبَنَا إِلَى مَحَبَّتِكَ وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Majdzuubil-'Aarifi billaah al-Habiib Haamid bin 'Abbaas Baahaasyim (Habib Basirih) wa ushuulihii wa furuu'ihii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wajdzib quluubanaa ilaa mahabbatika wanfa'naa bi asraarihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali majdzub arif billah Al-Habib Hamid bin Abbas Bahasyim (Habib Basirih) beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, tariklah hati kami menuju samudra cinta-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali majdzub arif billah Al-Habib Hamid bin Abbas Bahasyim (Habib Basirih) beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, tariklah hati kami menuju samudra cinta-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '18 Jumadil Akhir / Jumadil Tsani (Puncak Haul Akbar Al-Habib Hamid bin Abbas Bahasyim di Kompleks Kubah Basirih, Kelurahan Basirih Selatan, Kecamatan Banjarmasin Selatan, Kota Banjarmasin).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki di koridor panggung kayu ulin menuju Kubah Basirih, menjaga adab terhadap para habaib dzurriyah Bahasyim, serta menjaga kebersihan tepian sungai.',
    facilities: ['Kubah Utama Makam Habib Hamid bin Abbas Bahasyim (Kubah Basirih)', 'Musholla & Pendopo Ziarah Tepian Sungai Basirih', 'Dermaga Klotok Wisata Sungai Banjarmasin', 'Kios Souvenir & Area Parkir Bus Peziarah Basirih Selatan'],
    openingHours: 'Buka Setiap Hari 07.00 – 22.00 WITA',
    references: [
      'Dinas Kebudayaan dan Pariwisata Kota Banjarmasin (2018). Profil Cagar Budaya Kubah Habib Hamid bin Abbas Bahasyim (Kubah Basirih). Banjarmasin.',
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait. Jeddah: Alamul Ma’rifah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datu-sanggul-rantau',
    name: 'Makam Datu Sanggul / Syekh Abdussamad (Desa Tatakan, Tapin Selatan, Kabupaten Tapin)',
    title: 'Waliyullah Sufi Abad ke-18 Sahabat Ruhani Datu Kalampayan & Pewaris Kitab Barencong di Bumi Ruhui Rahayu',
    description:
      'Kompleks Kubah Makam Datu Sanggul (Syekh Abdussamad, wafat abad ke-18 M) di Desa Tatakan, Kecamatan Tapin Selatan (kawasan Rantau), Kabupaten Tapin, Provinsi Kalimantan Selatan.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Sezaman dengan masa muda Syekh Muhammad Arsyad Al-Banjari, sekitar 1710–1770 M)',
    province: 'Kalimantan Selatan',
    city: 'Tapin',
    district: 'Kec. Tapin Selatan',
    address: 'Jl. Trans Kalimantan (Banjarmasin–Rantau), Desa Tatakan, Kec. Tapin Selatan, Kabupaten Tapin',
    location: {
      lat: -3.0218,
      lng: 115.1065,
      address: 'Jl. Trans Kalimantan (Banjarmasin–Rantau), Desa Tatakan, Kec. Tapin Selatan, Kabupaten Tapin',
      district: 'Kec. Tapin Selatan',
      city: 'Tapin',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Auliya Kalimantan Selatan (Kompleks Makam Datu Sanggul di Tatakan Kabupaten Tapin)',
    sanad:
      'Syekh Abdussamad (dikenal sebagai Datu Sanggul, ulama sufi asal Aceh/Palembang yang merantau ke Tanah Banjar dan berguru kepada Datu Suban di Pantai Jati Muning, Rantau); sahabat ruhani Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan).',
    karya: [
      'Penyebaran dakwah tauhid dan tasawuf hakikat di wilayah Muning, Tatakan, dan Rantau (Kabupaten Tapin) pada abad ke-18 M',
      'Warisan risalah tasawuf dan suluk para Datu Muning yang diselaraskan dengan syariat oleh Syekh Muhammad Arsyad Al-Banjari',
    ],
    history:
      '**Syekh Abdussamad**—yang sangat masyhur dalam historiografi sufisme Banjar dengan gelar **Datu Sanggul** (hidup pada abad ke-18 M di kawasan Muning/Tatakan, Rantau, Kabupaten Tapin)—adalah salah seorang *waliyullah* besar yang paling dihormati di Kalimantan Selatan. Nama asli beliau adalah **Abdussamad**, seorang perantau Muslim yang datang ke Tanah Banjar untuk mendalami ilmu syariat, tarekat, hakikat, dan makrifat kepada maha guru para wali di wilayah Muning (Rantau), yakni **Datu Suban** (bersama dua belas murid pilihan lainnya seperti Datu Muning, Datu Nuraya, dan Datu Pujung). Beliau mendapat julukan **Datu Sanggul** karena kegemarannya menyanggul rambut panjangnya saat berkhalwat dan berburu di hutan maupun menangkap ikan (*panting*) di sungai.\n\nDalam naskah manaqib Banjar yang sangat populer di kalangan pesantren Kalimantan Selatan, dikisahkan persahabatan ruhani yang sangat indah antara **Datu Sanggul** di Tatakan (Tapin) dengan **Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)** yang kala itu masih menuntut ilmu dan mengajar di Makkah Al-Mukarramah. Keduanya saling bertukar wawasan antara kedalaman *ilmu syariat* dan *ilmu hakikat*, hingga Syekh Muhammad Arsyad Al-Banjari memberikan kain kafan putih dari Tanah Suci Makkah yang dibawa pulang ke Tatakan untuk mengkafani jenazah Datu Sanggul saat wafat.\n\nMakam **Datu Sanggul (Syekh Abdussamad)** berada di **Desa Tatakan, Kecamatan Tapin Selatan, Kabupaten Tapin** (di tepi jalan poros utama lintas Kalimantan yang menghubungkan Banjarmasin–Martapura menuju Rantau dan Hulu Sungai). Kompleks makam beliau tak pernah sepi dari ribuan peziarah setiap hari.',
    karomah: [
      'Dalam tradisi lisan masyarakat Banjar dan kitab *Manaqib Datu Sanggul*, dikisahkan karomah *thayyul ardh* (melipat jarak bumi) yang dimiliki Datu Sanggul atas izin Allah SWT untuk menunaikan Shalat Jumat di Masjidil Haram Makkah bersama sahabatnya Syekh Muhammad Arsyad Al-Banjari, serta kisah pohon durian yang menjatuhkan buahnya tepat ketika beliau menjamu tamu.<!--more-->\n\nDi Kompleks Makam Datu Sanggul Desa Tatakan, terdapat pula sumur tua dan pohon-pohon rindang yang menjadi tempat istirahat dan tawassul para musafir lintas Kalimantan Selatan–Kalimantan Timur.',
    ],
    untoldStory:
      'Dalam tradisi keulamaan Banjar, kisah persahabatan **Datu Kalampayan** (ahli fikih/syariat) dan **Datu Sanggul** (ahli tasawuf/hakikat) selalu diajarkan oleh para tuan guru—termasuk oleh **Abah Guru Sekumpul**—sebagai lambang kesempurnaan integrasi antara **Syariat dan Hakikat** yang tidak boleh dipertentangkan.<!--more-->\n\nPeziarah yang melakukan perjalanan ziarah ke wilayah **Banua Enam (Tapin, Hulu Sungai Selatan, Hulu Sungai Tengah, Hulu Sungai Utara, Balangan, dan Tabalong)** selalu menjadikan **Makam Datu Sanggul di Tatakan (Tapin Selatan)** sebagai gerbang ziarah pertama selepas dari Martapura.',
    barokahHajat:
      'Peziarah dan musafir yang berziarah ke maqbarah Datu Sanggul (Syekh Abdussamad) di Tatakan Kabupaten Tapin umumnya bertawassul memohon kepada Allah SWT keseimbangan pengamalan syariat dan kejernihan batin (hakikat), persahabatan yang tulus karena Allah, serta keselamatan perjalanan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdussamad / Datu Sanggul (Tatakan Tapin)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الصَّمَدِ المُلَقَّبِ بِدَاتُو سَانْغغُولْ وَمُعَلِّمِهِ دَاتُو سُوبَانْ وَأَوْلِيَاءِ تَافِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْمَعْ لَنَا بَيْنَ الشَّرِيعَةِ وَالْحَقِيقَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الصَّمَدِ المُلَقَّبِ بِدَاتُو سَانْغغُولْ وَمُعَلِّمِهِ دَاتُو سُوبَانْ وَأَوْلِيَاءِ تَافِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْمَعْ لَنَا بَيْنَ الشَّرِيعَةِ وَالْحَقِيقَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh 'Abdish-Shamad al-mulaqqabi bi Datu Sanggul wa mu'allimihii Datu Suban wa Auliyaa-i Tapin syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wajma' lanaa bainasy-syarii'ati wal-haqiiqati wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdussamad yang bergelar Datu Sanggul beserta gurunya Datu Suban dan para auliya di Tapin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, himpunkanlah pada diri kami pengamalan syariat dan hakikat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdussamad yang bergelar Datu Sanggul beserta gurunya Datu Suban dan para auliya di Tapin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, himpunkanlah pada diri kami pengamalan syariat dan hakikat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Dzulhijjah (Puncak Haul Akbar Datu Sanggul / Syekh Abdussamad di Kompleks Kubah Datu Sanggul, Desa Tatakan, Kecamatan Tapin Selatan, Kabupaten Tapin).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Kubah Datu Sanggul, serta menjaga ketertiban dan kebersihan di area istirahat musafir Desa Tatakan.',
    facilities: ['Kubah Utama Makam Datu Sanggul (Syekh Abdussamad)', 'Musholla & Pendopo Ziarah Desa Tatakan', 'Fasilitas Wudhu, Toilet & Rest Area Musafir', 'Area Parkir Luas Bus Wisata Religi Tapin Selatan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Tim Sahabat (2001). Manaqib Datu Sanggul (Syekh Abdussamad) Tatakan Rantau. Martapura: Toko Buku Sahabat.',
      'Alfani Daud (1997). Islam dan Masyarakat Banjar: Deskripsi dan Analisa Kebudayaan Banjar. Jakarta: RajaGrafindo Persada.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-kasyful-anwar-martapura',
    legacyId: 'ulama-37',
    name: 'Makam KH. Kasyful Anwar Al-Banjari & Syekh Syihabuddin (Kampung Melayu, Martapura Timur, Banjar)',
    title: 'Mujaddid Kurikulum Pondok Pesantren Darussalam Martapura & Maha Guru Ulama Kalimantan (1887–1940 M)',
    description:
      'Kompleks Kubah Makam Al-Allamah KH. Kasyful Anwar bin H. Ismail Al-Banjari (1887–1940 M, Pimpinan ke-3 Pondok Pesantren Darussalam Martapura) di Desa Kampung Melayu Ilir, Kecamatan Martapura Timur, Kabupaten Banjar, Provinsi Kalimantan Selatan.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Paruh Pertama Abad ke-20 M (4 Rajab 1304 H / 1887 M – 18 Syawal 1359 H / 1940 M)',
    province: 'Kalimantan Selatan',
    city: 'Banjar',
    district: 'Kec. Martapura Timur',
    address: 'Desa Kampung Melayu Ilir, Kec. Martapura Timur, Kabupaten Banjar',
    location: {
      lat: -3.4012,
      lng: 114.8542,
      address: 'Desa Kampung Melayu Ilir, Kec. Martapura Timur, Kabupaten Banjar',
      district: 'Kec. Martapura Timur',
      city: 'Banjar',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg',
    imageSource: 'Wikimedia Commons — Pondok Pesantren Darussalam Martapura (Lembaga Pendidikan Islam Terbesar di Kalimantan Warisan KH. Kasyful Anwar)',
    sanad:
      'KH. Kasyful Anwar bin H. Ismail bin H. Muhammad Arsyad (keturunan jaringan ulama Dalam Pagar Martapura); bermukim 17 tahun di Makkah Al-Mukarramah berguru kepada Syaikh Umar Hamdan Al-Mahrisi, Syaikh Said Al-Yamani, Syaikh Ali Al-Maliki, dan Syaikh Mukhtar Ath-Tharid; guru utama dari KH. Seman Mulia, KH. Sya’rani Arif, dan KH. Abdul Qadir Hasan.',
    karya: [
      'Pembaruan sistem pendidikan klasikal berjenjang (Tahdiriyah, Ibtidaiyah, Tsanawiyah) di Pondok Pesantren Darussalam Martapura pada tahun 1922 M',
      'Penulisan kitab-kitab kurikulum pesantren: Risalatut Tauhid, Risalatul Fiqh, Tarikh as-Sirah an-Nabawiyyah, Durusut Tashrif, dan Tabyinul Rawi fi Syarhi Arba’in an-Nawawi',
    ],
    history:
      '**Al-Allamah KH. Kasyful Anwar bin H. Ismail Al-Banjari** (lahir di Kampung Melayu, Martapura pada **4 Rajab 1304 H / 29 Maret 1887 M** dan wafat pada malam Senin, **18 Syawal 1359 H / 17 November 1940 M**) adalah tokoh sentral pembaru pendidikan pesantren di Kalimantan dan pemimpin periode ketiga (1922–1940 M) **Pondok Pesantren Darussalam Martapura**—pesantren induk terbesar dan tertua di Kalimantan Selatan yang didirikan sejak 14 Juli 1914 M. Setelah menamatkan dasar keilmuan di kampung halamannya, pemuda Kasyful Anwar berangkat ke Makkah Al-Mukarramah dan bermukim selama **17 tahun (1896–1913 M)** menimba ilmu di Masjidil Haram.\n\nKetika beliau dipercaya memimpin **Madrasah Darussalam Martapura pada tahun 1922 M** menggantikan KH. Hasan Ahmad, KH. Kasyful Anwar melakukan lompatan sejarah besar: beliau mengadopsi sistem madrasah klasikal berjenjang sebagaimana diterapkan di Madrasah Shaulatiyah Makkah tanpa mengurangi sedikit pun kedalaman kitab kuning klasik (*turats*). Beliau juga menyusun sendiri kitab-kitab pegangan santri dari tingkat dasar hingga menengah dan menggaji para guru menggunakan harta hasil sawah pribadinya.\n\nDari tangan dingin KH. Kasyful Anwar lahir generasi emas ulama besar Kalimantan, termasuk **KH. Anang Sya’rani Arif**, **KH. Seman Mulia** (paman dan maha guru Abah Guru Sekumpul), **KH. Salim Ma’ruf**, dan **KH. Husin Qadri**. Beliau wafat pada **18 Syawal 1359 H (1940 M)** dan dimakamkan di **Kubah Kampung Melayu Ilir, Kecamatan Martapura Timur, Kabupaten Banjar**.',
    karomah: [
      'Dalam biografi *Ulama Banjar* dan kesaksian para santri sepuh Darussalam Martapura, keistimewaan KH. Kasyful Anwar tampak dari keikhlasan dan kewaliannya dalam mendidik santri: kitab-kitab tipis yang beliau tulis (*Risalatut Tauhid*, *Durusut Tashrif*, *Sirah Nabawiyah*) dipelajari oleh ratusan ribu santri di seluruh Kalimantan selama lebih dari satu abad dan menjadi pembuka pintu kefahaman ilmu alat maupun syariat.<!--more-->\n\nHingga hari ini, Pondok Pesantren Darussalam Martapura yang beliau tata kurikulumnya tetap berdiri megah dengan belasan ribu santri aktif, menjadi benteng utama Ahlussunnah wal Jama’ah di Pulau Kalimantan.',
    ],
    untoldStory:
      'Di sepanjang tepian Sungai Martapura di kawasan **Kecamatan Martapura Timur (Kampung Melayu, Keramat, hingga Dalam Pagar)**, berjejer kubah-kubah makam para masyayikh pimpinan Pondok Pesantren Darussalam Martapura: mulai dari **Kubah KH. Kasyful Anwar** di Kampung Melayu, **Kubah KH. Sya’rani Arif**, **Kubah KH. Abdul Qadir Hasan (Guru Tuha)**, hingga **Kubah KH. Zainal Ilmi** di Dalam Pagar.<!--more-->\n\nSetiap tanggal **18 Syawal** (dua belas hari setelah Haul Datu Kalampayan pada 6 Syawal), ribuan santri dan alumni Darussalam berkumpul di Kubah Kampung Melayu untuk memperingati **Haul Akbar KH. Kasyful Anwar**.',
    barokahHajat:
      'Peziarah, guru madrasah, dan santri yang berziarah ke Kubah KH. Kasyful Anwar di Kampung Melayu Martapura Timur umumnya bertawassul memohon kepada Allah SWT kecerdasan dan kemanfaatan ilmu yang diajarkan, ketulusan dalam mengelola lembaga pendidikan Islam, serta keberkahan sanad Pondok Pesantren Darussalam.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Allamah KH. Kasyful Anwar (Kampung Melayu Martapura)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ كَشْفِ الْأَنْوَارِ بْنِ إِسْمَاعِيلَ الْبَنْجَرِيِّ وَالشَّيْخِ شِهَابِ الدِّينِ وَمَشَايِخِ مَعْهَدِ دَارِ السَّلَامِ مَرْتَافُورَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاكْشِفْ لَنَا أَنْوَارَ الْعُلُومِ النَّافِعَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ كَشْفِ الْأَنْوَارِ بْنِ إِسْمَاعِيلَ الْبَنْجَرِيِّ وَالشَّيْخِ شِهَابِ الدِّينِ وَمَشَايِخِ مَعْهَدِ دَارِ السَّلَامِ مَرْتَافُورَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاكْشِفْ لَنَا أَنْوَارَ الْعُلُومِ النَّافِعَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah asy-Syaikh Kasyfil-Anwaar bin Ismaa'iil al-Banjarii wasy-Syaikh Syihaabiddiin wa Masyaayikhi Ma'hadi Daaris-Salaam Martapura syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waksyif lanaa anwaaral-'uluumin-naafi'ati wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah KH. Kasyful Anwar bin Ismail Al-Banjari, Syekh Syihabuddin, beserta seluruh masyayikh Pondok Pesantren Darussalam Martapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, singkapkanlah bagi kami cahaya-cahaya ilmu yang bermanfaat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah KH. Kasyful Anwar bin Ismail Al-Banjari, Syekh Syihabuddin, beserta seluruh masyayikh Pondok Pesantren Darussalam Martapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, singkapkanlah bagi kami cahaya-cahaya ilmu yang bermanfaat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '18 Syawal (Puncak Haul Akbar Al-Allamah KH. Kasyful Anwar di Kubah Kampung Melayu Ilir, Kecamatan Martapura Timur & Pondok Pesantren Darussalam Martapura, Kabupaten Banjar).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melepas alas kaki saat memasuki Kubah Kampung Melayu, serta menjaga ketenangan lingkungan pengajian masyarakat Martapura Timur.',
    facilities: ['Kubah Makam KH. Kasyful Anwar Kampung Melayu', 'Musholla & Majelis Ziarah Kampung Melayu Ilir', 'Dekat Kampus Pondok Pesantren Darussalam Martapura', 'Area Parkir Peziarah Martapura Timur'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ideham, M. Suriansyah, dkk. (2003). Sejarah Banjar. Banjarmasin: Badan Penelitian dan Pengembangan Daerah Provinsi Kalimantan Selatan.',
      'Badan Pengurus Pondok Pesantren Darussalam (2014). Satu Abad Pondok Pesantren Darussalam Martapura (1914–2014): Sejarah dan Biografi Para Pimpinan. Martapura.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datu-abulung-sungai-batang',
    legacyId: 'ulama-38',
    name: 'Makam Syekh Abdul Hamid Abulung / Datu Abulung (Sungai Batang, Martapura Barat, Banjar)',
    title: 'Ulama Sufi Falsafi Abad ke-18 di Tanah Banjar & Situs Masjid Jami’ Syekh Abdul Hamid Abulung',
    description:
      'Kompleks Kubah Makam dan Masjid Jami’ Syekh Abdul Hamid Abulung (Datu Abulung, wafat sekitar 1788 M) di Desa Sungai Batang, Kecamatan Martapura Barat, Kabupaten Banjar, Provinsi Kalimantan Selatan.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Masa pemerintahan Sultan Tahmidullah II Banjar, wafat sekitar 1788 M)',
    province: 'Kalimantan Selatan',
    city: 'Banjar',
    district: 'Kec. Martapura Barat',
    address: 'Desa Sungai Batang, Kec. Martapura Barat, Kabupaten Banjar',
    location: {
      lat: -3.3845,
      lng: 114.8285,
      address: 'Desa Sungai Batang, Kec. Martapura Barat, Kabupaten Banjar',
      district: 'Kec. Martapura Barat',
      city: 'Banjar',
      province: 'Kalimantan Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/KH_Abdul_Qadir_Hasan_Mosque.jpg',
    imageSource: 'Wikimedia Commons — Arsitektur Masjid & Kubah Ulama Kabupaten Banjar (Jalur Ziarah Makam Datu Abulung di Sungai Batang Martapura Barat)',
    sanad:
      'Syekh Abdul Hamid Abulung; ulama sufi asal Tanah Banjar yang menuntut ilmu tasawuf di Haramain (Makkah dan Madinah) pada abad ke-18 M sezaman dengan masa belajarnya Syekh Muhammad Arsyad Al-Banjari dan Syekh Muhammad Nafis Al-Banjari.',
    karya: [
      'Pengajaran tasawuf hakikat (Martabat Tujuh / Wujudiyah) di Kampung Abulung, tepi Sungai Martapura pada abad ke-18 M',
      'Warisan Masjid Jami’ Syekh Abdul Hamid Abulung di Desa Sungai Batang yang dibangun oleh Sultan Tahmidullah II sebagai penghormatan atas beliau',
    ],
    history:
      '**Syekh Abdul Hamid Abulung**—yang dikenal luas oleh masyarakat Kalimantan Selatan sebagai **Datu Abulung** (wafat sekitar tahun **1788 M** di Sungai Batang, Martapura)—adalah seorang ulama sufi abad ke-18 M yang mendalami ajaran tasawuf falsafi (*Martabat Tujuh*) di Tanah Suci Makkah sezaman dengan **Syekh Muhammad Arsyad Al-Banjari**. Sekembalinya ke Kesultanan Banjar, beliau bermukim dan mengajar ilmu hakikat di **Kampung Abulung (kini Desa Sungai Batang, Kecamatan Martapura Barat)** di tepian Sungai Martapura.\n\nDalam dinamika intelektual Kesultanan Banjar pada masa pemerintahan **Sultan Tahmidullah II (Sunan Nata Alam, 1761–1801 M)**, ungkapan-ungkapan tasawuf *syathahat* yang diajarkan oleh Syekh Abdul Hamid Abulung (*"Tiada yang wujud selain Dia"*) dinilai oleh otoritas istana berpotensi disalahpahami oleh masyarakat awam yang belum kokoh dasar syariatnya. Demi menjaga ketertiban akidah masyarakat umum, Sultan Tahmidullah II menjatuhkan hukuman mati kepada Syekh Abdul Hamid Abulung yang diterima oleh sang sufi dengan penuh ketenangan dan keikhlasan di dalam kerangkeng besi yang ditenggelamkan di Sungai Martapura.\n\nTidak lama setelah wafatnya beliau, masyarakat dan pihak kesultanan menyaksikan berbagai tanda kemuliaan pada jenazah Syekh Abdul Hamid Abulung. Sebagai bentuk penghormatan dan penebusan sejarah, **Sultan Tahmidullah II** memerintahkan pemakaman jenazah beliau secara terhormat di **Desa Sungai Batang, Kecamatan Martapura Barat**, serta membangun **Masjid Jami’ Syekh Abdul Hamid Abulung** di dekat makam beliau yang masih berdiri megah hingga hari ini.',
    karomah: [
      'Dalam naskah tradisi lisan Banjar dan penelitian filologi tasawuf Kalimantan Selatan, dikisahkan bahwa ketika kerangkeng besi tempat Syekh Abdul Hamid Abulung ditenggelamkan ke dasar Sungai Martapura, setiap waktu shalat lima waktu tiba, kerangkeng tersebut terapung ke permukaan air dan beliau terlihat mendirikan shalat di atas air dengan tenang hingga akhirnya wafat dalam keadaan sujud.<!--more-->\n\nHingga kini, peziarah yang menuju **Kubah Datu Kalampayan (Syekh Muhammad Arsyad Al-Banjari)** di Astambul hampir selalu singgah berziarah pula ke **Kubah Datu Abulung di Desa Sungai Batang**, menandai telah menyatunya penghormatan masyarakat Banjar terhadap kedua ulama besar abad ke-18 tersebut.',
    ],
    untoldStory:
      'Kisah sejarah antara **Syekh Muhammad Arsyad Al-Banjari** dan **Syekh Abdul Hamid Abulung** di Kalimantan Selatan melahirkan sintesis tasawuf yang sangat matang di Tanah Banjar melalui karya ulama sezaman mereka, **Syekh Muhammad Nafis bin Idris Al-Banjari** (pengarang kitab **Ad-Durrun Nafis** tahun 1200 H / 1785 M di Kelua, Tabalong), yang berhasil memadukan tasawuf *Martabat Tujuh* dengan keteguhan syariat Ahlussunnah wal Jama’ah.<!--more-->\n\nBangunan asli **Masjid Jami’ Syekh Abdul Hamid Abulung** di Desa Sungai Batang memiliki tiang-tiang kayu ulin kuno peninggalan abad ke-18 M dan telah ditetapkan sebagai Situs Cagar Budaya Kabupaten Banjar.',
    barokahHajat:
      'Peziarah yang berziarah ke Kubah Datu Abulung (Syekh Abdul Hamid Abulung) di Sungai Batang Martapura Barat umumnya bertawassul memohon kepada Allah SWT kemurnian tauhid dan keikhlasan hati semata-mata mengharap ridha Allah SWT, keteguhan mendirikan shalat dalam segala ujian hidup, serta ampunan bagi seluruh kaum Muslimin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Hamid Abulung / Datu Abulung (Sungai Batang Martapura)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الشَّهِيدِ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْحَمِيدِ أَبُولُونْغ (دَاتُو أَبُولُونْغ) وَأَوْلِيَاءِ مَرْتَافُورَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَحَقِّقْنَا بِالتَّوْحِيدِ الْخَالِصِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الشَّهِيدِ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْحَمِيدِ أَبُولُونْغ (دَاتُو أَبُولُونْغ) وَأَوْلِيَاءِ مَرْتَافُورَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَحَقِّقْنَا بِالتَّوْحِيدِ الْخَالِصِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyisy-Syahiidil-'Aarifi billaah asy-Syaikh 'Abdil-Hamiid Abulung (Datu Abulung) wa Auliyaa-i Martapura syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa haqqiqnaa bit-tauhiidil-khaalishi wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali syahid arif billah Syekh Abdul Hamid Abulung (Datu Abulung) beserta para auliya di Martapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, kokohkanlah hati kami dengan tauhid yang murni, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali syahid arif billah Syekh Abdul Hamid Abulung (Datu Abulung) beserta para auliya di Martapura, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, kokohkanlah hati kami dengan tauhid yang murni, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Dzulhijjah (Puncak Haul Akbar Syekh Abdul Hamid Abulung / Datu Abulung di Kompleks Kubah & Masjid Jami’ Datu Abulung, Desa Sungai Batang, Kecamatan Martapura Barat, Kabupaten Banjar).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki Kubah Datu Abulung dan Masjid Jami’ Sungai Batang, serta menjaga adab berprasangka baik (*husnudzan*) kepada seluruh ulama syariat maupun hakikat.',
    facilities: ['Kubah Utama Makam Datu Abulung', 'Masjid Cagar Budaya Jami’ Syekh Abdul Hamid Abulung', 'Dermaga Sungai Martapura Desa Sungai Batang', 'Area Parkir Peziarah Martapura Barat'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zamzam, Zafry (1979). Syekh Muhammad Arsyad Al-Banjari: Ulama Besar Juru Dakwah. Banjarmasin: Penerbit Karya.',
      'Humaidi (2016). Paham Wujudiyah Syekh Abdul Hamid Abulung dalam Sejarah Intelektual Islam Banjar. Jurnal Kandil BPNB Kalimantan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 2. PROVINSI KALIMANTAN BARAT (BUMI KHATULISTIWA)
  // =========================================================================
  {
    id: 'sultan-syarif-abdurrahman-alkadrie-pontianak',
    name: 'Kompleks Makam Kesultanan Pontianak Batu Layang (Sultan Syarif Abdurrahman Alkadrie — Pontianak Utara)',
    title: 'Sayyid Pendiri Kota Pontianak & Sultan Pertama Kesultanan Kadriah Pontianak (23 Oktober 1771 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Kesultanan Kadriah Pontianak di Batu Layang, tempat peristirahatan Sultan Syarif Abdurrahman bin Husein Alkadrie (1738–1808 M, pendiri Kota Pontianak) beserta para Sultan Pontianak di Kelurahan Batu Layang, Kecamatan Pontianak Utara, Kota Pontianak, Provinsi Kalimantan Barat.',
    category: 'Habaib',
    era: 'Abad ke-18 – Awal Abad ke-19 M (15 Rabiul Awal 1151 H / 1738 M – 1808 M)',
    province: 'Kalimantan Barat',
    city: 'Pontianak',
    district: 'Kec. Pontianak Utara',
    address: 'Jl. Khatulistiwa, Kel. Batu Layang, Kec. Pontianak Utara, Kota Pontianak',
    location: {
      lat: -0.0052,
      lng: 109.2985,
      address: 'Jl. Khatulistiwa, Kel. Batu Layang, Kec. Pontianak Utara, Kota Pontianak',
      district: 'Kec. Pontianak Utara',
      city: 'Pontianak',
      province: 'Kalimantan Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Masjid_Jami_Pontianak_%282026%29_01.jpg',
    imageSource: 'Wikimedia Commons — Masjid Jami’ Sultan Syarif Abdurrahman Alkadrie & Khazanah Kesultanan Kadriah Pontianak',
    sanad:
      'As-Sayyid Asy-Syarif Abdurrahman bin Husein bin Ahmad bin Husein Alkadrie Ba’alawi; putra dari Mufti Agung Kerajaan Mempawah Al-Habib Husein bin Ahmad Alkadrie dan ibunda Nyai Tua (putri bangsawan Kerajaan Matan/Ketapang), serta menantu dari Raja Mempawah Opu Daeng Menambon (Utin Candramidi) dan Sultan Banjar.',
    karya: [
      'Pembukaan hutan pertemuan Sungai Kapuas dan Sungai Landak serta pendirian Kota Pontianak dan Kesultanan Kadriah pada 14 Rajab 1185 H / 23 Oktober 1771 M',
      'Pembangunan Masjid Jami’ Sultan Syarif Abdurrahman (Masjid Jami’ Pontianak) dan Istana Kadriah di Kampung Dalam Bugis',
      'Penyatuan jaringan maritim Melayu, Bugis, Dayak, dan Habaib di pesisir Kalimantan Barat',
    ],
    history:
      '**Sultan Syarif Abdurrahman bin Husein Alkadrie** (lahir di Matan/Ketapang pada **15 Rabiul Awal 1151 H / 1738 M** dan wafat di Pontianak pada malam Jumat, **1 Dzulqa’dah 1223 H / Desember 1808 M**) adalah seorang ulama-bangsawan *Ahlul Bait* dari marga **Alkadrie (Al-Qadri)** yang mendirikan **Kota Pontianak** sekaligus menjadi Sultan pertama **Kesultanan Kadriah Pontianak (1771–1808 M)**. Beliau adalah putra dari waliyullah besar penyebar Islam di Kalimantan Barat, **Al-Habib Husein bin Ahmad Alkadrie** (Keramat Sebukit Rama Mempawah). Sejak muda, Syarif Abdurrahman dikenal cerdas dalam ilmu agama, tangguh dalam pelayaran maritim, dan menjalin hubungan kekerabatan dengan **Kerajaan Mempawah** (menikahi putri Opu Daeng Menambon, **Utin Candramidi**) serta **Kesultanan Banjar** (dianugerahi gelar *Pangeran Syarif Abdurrahman Nur Alam*).\n\nSetelah ayahandanya wafat di Mempawah pada tahun **1771 M**, Syarif Abdurrahman berangkat dengan 14 perahu menyusuri Sungai Peniti menuju muara **Sungai Kapuas**. Pada hari Rabu, **14 Rajab 1185 H (23 Oktober 1771 M)**, rombongan beliau tiba di titik strategis pertemuan **Sungai Kapuas Besar, Sungai Kapuas Kecil, dan Sungai Landak**. Di tempat yang kala itu berupa hutan lebat tersebut, Syarif Abdurrahman membuka lahan pertama dengan membangun **Masjid Jami’ Sultan Syarif Abdurrahman** dan **Istana Kadriah**, lalu pada **8 Sya’ban 1192 H (1778 M)** beliau dinobatkan secara resmi sebagai Sultan Pontianak.\n\nKetika wafat pada tahun **1808 M**, Sultan Syarif Abdurrahman Alkadrie dimakamkan di tepi Sungai Kapuas di **Kompleks Makam Kesultanan Batu Layang, Kelurahan Batu Layang, Kecamatan Pontianak Utara**—hanya berjarak sekitar 1,5 kilometer dari titik **Tugu Khatulistiwa**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Melayu Pontianak dan catatan sejarah Kesultanan Kadriah, pembukaan Kota Pontianak pada tahun 1771 M diawali dengan keberanian spiritual Syarif Abdurrahman menghalau gangguan makhluk halus di hutan pertemuan tiga sungai menggunakan tembakan meriam sebagai penanda titik berdirinya **Masjid Jami’ Sultan Syarif Abdurrahman** dan **Keraton Kadriah**.<!--more-->\n\nDi dalam Kompleks Makam Kesultanan Batu Layang, selain pusara utama **Sultan Syarif Abdurrahman Alkadrie** dan permaisuri **Utin Candramidi**, bersemayam pula tujuh Sultan Pontianak penerusnya termasuk **Sultan Syarif Kasim Alkadrie**, **Sultan Syarif Hamid II**, dan para kerabat Kesultanan Kadriah yang gugur pada Peristiwa Mandor (1944 M).',
    ],
    untoldStory:
      'Tanggal pendaratan dan pembukaan lahan Masjid Jami’ oleh **Sultan Syarif Abdurrahman Alkadrie** pada **23 Oktober 1771 M (14 Rajab 1185 H)** diperingati secara resmi setiap tahun sebagai **Hari Jadi Kota Pontianak**.<!--more-->\n\nPeziarah yang datang ke Kota Pontianak dapat menikmati wisata religi menyusuri Sungai Kapuas: memulai shalat dan ziarah di **Masjid Jami’ Sultan Syarif Abdurrahman** serta **Istana Kadriah** di Kecamatan Pontianak Timur, lalu menyeberang ke **Kompleks Makam Batu Layang** di Kecamatan Pontianak Utara.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Makam Kesultanan Batu Layang (Sultan Syarif Abdurrahman Alkadrie) di Pontianak Utara umumnya bertawassul memohon kepada Allah SWT keberanian merintis usaha dan peradaban baru yang diberkahi, kepemimpinan yang mengayomi masyarakat majemuk, serta keberkahan silsilah *Ahlul Bait* Nabi SAW.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Syarif Abdurrahman bin Husein Alkadrie (Batu Layang Pontianak)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الشَّرِيفِ عَبْدِ الرَّحْمٰنِ بْنِ حُسَيْنٍ الْقَادِرِيِّ مُؤَسِّسِ مَدِينَةِ فُونْتِيَانَاكْ وَكَافَّةِ سَلَاطِينِ الْقَادِرِيَّةِ فِي بَاتُو لَايَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي بِلَادِنَا وَأَرْزَاقِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الشَّرِيفِ عَبْدِ الرَّحْمٰنِ بْنِ حُسَيْنٍ الْقَادِرِيِّ مُؤَسِّسِ مَدِينَةِ فُونْتِيَانَاكْ وَكَافَّةِ سَلَاطِينِ الْقَادِرِيَّةِ فِي بَاتُو لَايَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي بِلَادِنَا وَأَرْزَاقِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan asy-Syariif 'Abdir-Rahmaan bin Husain al-Qaadrii mu-assisi Madiinati Pontianak wa kaaffati Salaathiinil-Qaadriyyati fii Batu Layang syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik fii bilaadinaa wa arzaaqinaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Syarif Abdurrahman bin Husein Alkadrie pendiri Kota Pontianak beserta seluruh Sultan Kadriah di Batu Layang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah negeri dan rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Syarif Abdurrahman bin Husein Alkadrie pendiri Kota Pontianak beserta seluruh Sultan Kadriah di Batu Layang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah negeri dan rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '23 Oktober (Ziarah Akbar Hari Jadi Kota Pontianak / 14 Rajab) & Bulan Dzulqa’dah (Haul Sultan Syarif Abdurrahman Alkadrie di Kompleks Makam Kesultanan Batu Layang, Kecamatan Pontianak Utara).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (dianjurkan mengenakan busana Melayu Teluk Belanga atau baju kurung saat ziarah adat), melepas alas kaki saat memasuki cungkup utama Makam Batu Layang, serta menjaga kebersihan tepian Sungai Kapuas.',
    facilities: ['Cungkup Utama Cagar Budaya Makam Kesultanan Batu Layang', 'Musholla & Pendopo Ziarah Batu Layang', 'Dermaga Wisata Air Sungai Kapuas', 'Dekat Tugu Khatulistiwa & Area Parkir Bus Peziarah Pontianak Utara'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'Rahman, Ansar, dkk. (2000). Syarif Abdurrahman Alkadrie: Perspektif Sejarah Berdirinya Kota Pontianak. Pontianak: Pemerintah Kota Pontianak.',
      'Veth, P.J. (1854). Borneo’s Wester-Afdeeling, Geographisch, Statistisch, Historisch. Zaltbommel: Joh. Noman en Zoon.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-husein-alkadrie-mempawah',
    legacyId: 'habib-16',
    name: 'Makam Al-Habib Husein bin Ahmad Alkadrie (Kramat Sebukit Rama — Mempawah Hilir, Mempawah)',
    title: 'Ulama Besar Asal Tarim Hadramaut, Mufti Agung Kerajaan Matan & Mempawah serta Ayahanda Pendiri Kota Pontianak (1708–1771 M)',
    description:
      'Kompleks Kubah Makam Keramat Sebukit Rama (Al-Habib Husein bin Ahmad Alkadrie, 1120–1184 H / 1708–1771 M) di Bukit Sebukit Rama, Desa Pasir, Kecamatan Mempawah Hilir, Kabupaten Mempawah, Provinsi Kalimantan Barat.',
    category: 'Habaib',
    era: 'Abad ke-18 M (1120 H / 1708 M – 3 Dzulhijjah 1184 H / Maret 1771 M)',
    province: 'Kalimantan Barat',
    city: 'Mempawah',
    district: 'Kec. Mempawah Hilir',
    address: 'Bukit Sebukit Rama, Desa Pasir, Kec. Mempawah Hilir, Kabupaten Mempawah',
    location: {
      lat: 0.3712,
      lng: 108.9625,
      address: 'Bukit Sebukit Rama, Desa Pasir, Kec. Mempawah Hilir, Kabupaten Mempawah',
      district: 'Kec. Mempawah Hilir',
      city: 'Mempawah',
      province: 'Kalimantan Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Masjid_Jami_Pontianak_%282026%29_01.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Kalimantan Barat (Warisan Dakwah Al-Habib Husein bin Ahmad Alkadrie di Sebukit Rama Mempawah)',
    sanad:
      'Al-Habib Husein bin Ahmad bin Husein bin Muhammad Alkadrie Ba’alawi (lahir di Tarim, Hadramaut tahun 1120 H / 1708 M); mengembara dakwah bersama tiga sahabatnya (Sayyid Abubakar Al-Aidarus, Sayyid Umar Assegaf, dan Syekh Salim bin Hambal) dari Hadramaut ke Aceh, Betawi, Semarang, Matan (Ketapang), hingga Mempawah.',
    karya: [
      'Jabatan Qadhi / Mufti Agung di Kerajaan Matan Tanjungpura (Ketapang) dan Kerajaan Mempawah pada masa Opu Daeng Menambon (Pangeran Mas Surya Negara)',
      'Pendirian pusat pendidikan Islam Kuala Mempawah (Galah Herang) yang menarik kapal-kapal dagang dan penuntut ilmu dari seluruh Laut Natuna dan Selat Karimata',
      'Kaderisasi putra beliau, Sultan Syarif Abdurrahman Alkadrie, sebagai pendiri Kesultanan Kadriah Pontianak',
    ],
    history:
      '**Al-Habib Husein bin Ahmad bin Husein Alkadrie**—yang dikenal oleh masyarakat Kalimantan Barat dengan gelar **Tuan Besar Mempawah** atau **Keramat Sebukit Rama** (lahir di kota suci para wali **Tarim, Hadramaut, Yaman** pada tahun **1120 H / 1708 M** dan wafat di Mempawah pada **3 Dzulhijjah 1184 H / Maret 1771 M** dalam usia 63 tahun)—adalah ulama pelopor pembaruan dakwah Islam dan peradaban kesultanan di Kalimantan Barat pada abad ke-18 M. Pada usia sekitar 21 tahun (1141 H / 1729 M), beliau bersama tiga sahabat ulama meninggalkan Tarim menuju Nusantara: singgah berdakwah di Aceh, tinggal di Betawi dan **Semarang** selama empat tahun, lalu berlayar ke **Kerajaan Matan (Ketapang, Kalimantan Barat)** pada tahun **1735 M**.\n\nDi Kerajaan Matan, **Sultan Muhammad Zainuddin** sangat memuliakan kedalaman ilmu fikih dan akhlak Habib Husein Alkadrie hingga mengangkat beliau menjadi **Mufti Agung Kerajaan Matan** dan menikahkannya dengan putri bangsawan keraton, **Nyai Tua** (dari pernikahan ini lahir **Syarif Abdurrahman Alkadrie** pada tahun 1738 M). Karena keteguhan prinsip Habib Husein dalam menegakkan keadilan hukum syariat tanpa pandang bulu, beliau kemudian menerima undangan mulia dari Raja Mempawah yang terkenal bijaksana, **Opu Daeng Menambon (Pangeran Mas Surya Negara)**, untuk pindah ke **Mempawah** pada tahun **1747/1755 M**.\n\nDi kawasan **Galah Herang (Kuala Mempawah)**, Habib Husein bin Ahmad Alkadrie mendirikan masjid dan lembaga pengajian besar yang menjadikan Mempawah pusat keilmuan Islam paling makmur di pesisir barat Kalimantan. Beliau wafat pada tanggal **3 Dzulhijjah 1184 H (1771 M)** dan dimakamkan di puncak **Bukit Sebukit Rama, Desa Pasir, Kecamatan Mempawah Hilir, Kabupaten Mempawah**.',
    karomah: [
      'Dalam manaqib *Habib Husein Alkadrie* dan tradisi lisan masyarakat Mempawah, keteguhan prinsip beliau dalam membela keadilan syariat terlihat ketika di Kerajaan Matan seorang nakhoda asing dijatuhi hukuman mati secara tidak adil; Habib Husein memilih meninggalkan jabatan dan kemewahan istana Matan demi membela kebenaran hukum Allah SWT, yang justru mengantarkan beliau dan keturunannya memperoleh kemuliaan abadi di Mempawah dan Pontianak.<!--more-->\n\nDi puncak **Bukit Sebukit Rama**, makam Al-Habib Husein bin Ahmad Alkadrie terletak tidak jauh dari makam sahabat dan pelindungnya, Raja Mempawah **Opu Daeng Menambon** (yang wafat tahun 1761 M), melambangkan persaudaraan abadi antara ulama *Ahlul Bait* Hadramaut dan bangsawan Bugis-Melayu.',
    ],
    untoldStory:
      'Dari keempat sahabat asal Tarim yang berangkat bersama pada tahun 1729 M, masing-masing berpisah menjadi cahaya Islam di berbagai penjuru Nusantara: **Sayyid Abubakar Al-Aidarus** wafat di Aceh, **Sayyid Umar Assegaf** berdakwah di Siak dan Palembang, **Syekh Salim bin Hambal** di Malabar, dan **Al-Habib Husein bin Ahmad Alkadrie** di Mempawah Kalimantan Barat.<!--more-->\n\nSetiap tanggal **3 Dzulhijjah** (atau rangkaian bulan Dzulhijjah/Muharram dan tradisi *Robo-Robo* di bulan Shafar), ribuan jamaah dari Pontianak, Singkawang, Sambas, dan Ketapang menaiki anak tangga **Bukit Sebukit Rama di Mempawah Hilir** untuk berziarah dan bertawassul.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang berziarah ke maqbarah Al-Habib Husein bin Ahmad Alkadrie di Sebukit Rama Mempawah umumnya bertawassul memohon kepada Allah SWT keteguhan memegang prinsip kebenaran dan keadilan, dikaruniai keturunan yang menjadi pemimpin umat, serta keberkahan ilmu yang bermanfaat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Husein bin Ahmad Alkadrie (Sebukit Rama Mempawah)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَارِفِ بِاللهِ الْمُفْتِي الْحَبِيبِ حُسَيْنِ بْنِ أَحْمَدَ الْقَادِرِيِّ وَالْأَمِيرِ أُوفُو دَايِنْغ مَنَامْبُونْ وَأَوْلِيَاءِ مِيمْفَاوَاهْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الْحَقِّ وَالْعَدْلِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَارِفِ بِاللهِ الْمُفْتِي الْحَبِيبِ حُسَيْنِ بْنِ أَحْمَدَ الْقَادِرِيِّ وَالْأَمِيرِ أُوفُو دَايِنْغ مَنَامْبُونْ وَأَوْلِيَاءِ مِيمْفَاوَاهْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الْحَقِّ وَالْعَدْلِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Aarifi billaah al-Muftii al-Habiib Husain bin Ahmad al-Qaadrii wal-Amiir Opu Daeng Menambon wa Auliyaa-i Mempawah syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbitnaa 'alal-haqqi wal-'adli wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-arif billah Mufti Al-Habib Husein bin Ahmad Alkadrie, Opu Daeng Menambon, beserta seluruh auliya di Mempawah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas kebenaran dan keadilan, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-arif billah Mufti Al-Habib Husein bin Ahmad Alkadrie, Opu Daeng Menambon, beserta seluruh auliya di Mempawah, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas kebenaran dan keadilan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '3 Dzulhijjah (Haul Akbar Al-Habib Husein bin Ahmad Alkadrie) & Rabu Terakhir Bulan Shafar (Tradisi Ziarah Akbar Sebukit Rama & Robo-Robo di Kecamatan Mempawah Hilir, Kabupaten Mempawah).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat saat mendaki tangga Bukit Sebukit Rama, melepas alas kaki di dalam Kubah Habib Husein Alkadrie, serta menjaga kebersihan lingkungan hutan bukit cagar budaya.',
    facilities: ['Kubah Makam Habib Husein bin Ahmad Alkadrie & Makam Opu Daeng Menambon di Sebukit Rama', 'Tangga Ziarah & Pendopo Istirahat Sebukit Rama', 'Masjid Keramat Sebukit Rama', 'Area Parkir Luas Bus Peziarah Desa Pasir Mempawah Hilir'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WIB',
    references: [
      'Al-Qadri, Syarif Ibrahim (1998). Sejarah Kesultanan Kadriah Pontianak dan Manaqib Al-Habib Husein bin Ahmad Al-Qadri. Pontianak.',
      'Usman, Syafaruddin (2015). Sejarah Kerajaan Mempawah dan Peran Ulama Hadramaut di Kalimantan Barat. Pontianak: Stain Pontianak Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 3. PROVINSI KALIMANTAN TENGAH (BUMI TAMBUN BUNGAI)
  // =========================================================================
  {
    id: 'kyai-gede-kotawaringin',
    name: 'Kompleks Makam & Masjid Kyai Gede (Kotawaringin Hulu, Kotawaringin Lama, Kotawaringin Barat)',
    title: 'Ulama Pelopor Penyebar Islam Kalimantan Tengah Abad ke-17, Mangkubumi Kesultanan Kotawaringin & Pendiri Masjid Kyai Gede (1632 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam dan Masjid Kyai Gede (Syekh Abdul Qadir, membangun masjid tahun 1042 H / 1632 M) di Kelurahan Kotawaringin Hulu, Kecamatan Kotawaringin Lama, Kabupaten Kotawaringin Barat (Pangkalan Bun), Provinsi Kalimantan Tengah.',
    category: 'Walisongo',
    era: 'Paruh Pertama Abad ke-17 M (Mendirikan Masjid Kyai Gede tahun 1042 H / 1632 M)',
    province: 'Kalimantan Tengah',
    city: 'Kotawaringin Barat',
    district: 'Kec. Kotawaringin Lama',
    address: 'Kelurahan Kotawaringin Hulu, Kec. Kotawaringin Lama, Kabupaten Kotawaringin Barat',
    location: {
      lat: -2.4415,
      lng: 111.4285,
      address: 'Kelurahan Kotawaringin Hulu, Kec. Kotawaringin Lama, Kabupaten Kotawaringin Barat',
      district: 'Kec. Kotawaringin Lama',
      city: 'Kotawaringin Barat',
      province: 'Kalimantan Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sultan_Suriansyah_Mosque.JPG',
    imageSource: 'Wikimedia Commons — Khazanah Arsitektur Masjid Kayu Ulin Kuno Kalimantan (Warisan Masjid & Makam Kyai Gede 1632 M di Kotawaringin Lama, Kalimantan Tengah)',
    sanad:
      'Kyai Gede (disebut juga Syekh Abdul Qadir); ulama besar asal tanah Jawa (jaringan dakwah Kesultanan Demak / Giri Kedaton) yang diutus oleh Sultan Mustain Billah dari Kesultanan Banjar mendampingi Pangeran Dipati Antakasuma mendirikan Kesultanan Kotawaringin di Kalimantan Tengah pada awal abad ke-17 M.',
    karya: [
      'Pembangunan Masjid Kyai Gede pada tahun 1042 H / 1632 M di Kotawaringin Lama (masjid tertua di Provinsi Kalimantan Tengah dengan konstruksi kayu ulin tanpa paku besi)',
      'Pengislaman suku-suku Dayak pedalaman Sungai Lamandau dan Sungai Arut dengan pendekatan adat kekeluargaan dan pertanian',
      'Peletakan tata pemerintahan Islam sebagai Mangkubumi pertama Kesultanan Kotawaringin mendampingi Pangeran Dipati Antakasuma dan Ratu Bagawan',
    ],
    history:
      '**Kyai Gede** (yang dalam tradisi pesantren Kalimantan juga dikenal dengan nama **Syekh Abdul Qadir**, hidup pada akhir abad ke-16 hingga pertengahan abad ke-17 M) adalah ulama besar penyebar Islam pertama di wilayah **Provinsi Kalimantan Tengah** sekaligus pendiri **Masjid Kyai Gede** yang berangka tahun **1042 H (1632 M)**. Berasal dari kalangan bangsawan-ulama tanah Jawa pasca-Kesultanan Demak yang mengabdi di **Kesultanan Banjar**, Kyai Gede ditugaskan oleh Sultan Banjar **Sultan Mustain Billah** untuk mendampingi putranya, **Pangeran Dipati Antakasuma**, merintis kerajaan Islam baru di wilayah barat yang kelak menjadi **Kesultanan Kotawaringin** (satu-satunya kesultanan Islam di Provinsi Kalimantan Tengah).\n\nSetibanya di hulu Sungai Lamandau—tepatnya di kawasan **Kotawaringin Lama (Kabupaten Kotawaringin Barat)**—Kyai Gede berdakwah dengan penuh kesantunan kepada masyarakat lokal Dayak Darat. Karena keluasan ilmu agama, kebijaksanaan, dan kesaktian ruhaninya, para kepala suku setempat menyerahkan kepemimpinan wilayah Kotawaringin kepada Pangeran Dipati Antakasuma sebagai Raja dan mengangkat **Kyai Gede sebagai Mangkubumi (Perdana Menteri sekaligus Mufti Agung)**.\n\nPada tahun **1042 H (1632 M)**—sebagaimana terukir pada inskripsi kaligrafi di bangunan masjid—Kyai Gede bersama 40 pengikutnya mendirikan **Masjid Kyai Gede** dari kayu ulin pilihan berukir perpaduan ornamen Jawa, Banjar, Tiongkok, dan Dayak. Ketika wafat, Kyai Gede dimakamkan di kompleks maqbarah kuno yang terletak di dekat **Masjid Kyai Gede, Kelurahan Kotawaringin Hulu, Kecamatan Kotawaringin Lama, Kabupaten Kotawaringin Barat**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Kotawaringin Lama dan catatan cagar budaya Kalimantan Tengah, karomah Kyai Gede tampak dari proses pembangunan **Masjid Kyai Gede tahun 1632 M** di tengah hutan belantara: tiang-tiang utama (*soko guru*) kayu ulin yang sangat berat ditebang dan didirikan dengan kekuatan zikir serta doa, dan bangunan masjid panggung tersebut bertahan hampir 400 tahun tanpa lapuk sedikit pun.<!--more-->\n\nDi dalam **Kompleks Makam Kyai Gede** di Kotawaringin Hulu, makam beliau dinaungi cungkup kayu ulin kuno dengan nisan-nisan berukir khas abad ke-17 yang dikelilingi pohon-pohon tua yang rindang.',
    ],
    untoldStory:
      '**Masjid dan Makam Kyai Gede di Kotawaringin Lama** merupakan bukti sejarah tak terbantahkan bahwa dakwah Islam di Kalimantan Tengah sejak abad ke-17 M tumbuh secara damai melalui prinsip *Huma Betang* (hidup rukun berdampingan) antara komunitas Muslim Melayu-Banjar-Jawa dengan masyarakat Dayak.<!--more-->\n\nPeziarah yang berkunjung ke **Pangkalan Bun (ibu kota Kabupaten Kotawaringin Barat)** kini dapat menjangkau Kecamatan **Kotawaringin Lama** dengan mudah melalui jalan darat beraspal melintasi Jembatan Pile Slab Rawa Danau maupun melalui jalur Sungai Lamandau.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Makam dan Masjid Kyai Gede di Kotawaringin Lama Kalimantan Tengah umumnya bertawassul memohon kepada Allah SWT kekuatan iman dalam merintis dakwah dan amal jariyah, kerukunan masyarakat majemuk, serta keberkahan usia bangunan dan keturunan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Kyai Gede / Syekh Abdul Qadir (Kotawaringin Lama Kalimantan Tengah)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْقَادِرِ المُلَقَّبِ بِكِيَاهِي غَدِي مُؤَسِّسِ الْمَسْجِدِ الْعَتِيقِ وَسَلَاطِينِ كُوتَاوَارِينْغِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْقَادِرِ المُلَقَّبِ بِكِيَاهِي غَدِي مُؤَسِّسِ الْمَسْجِدِ الْعَتِيقِ وَسَلَاطِينِ كُوتَاوَارِينْغِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh 'Abdil-Qaadir al-mulaqqabi bi Kyai Gede mu-assisi al-Masjidil-'Atiiq wa Salaathiini Kotawaringin syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdul Qadir yang bergelar Kyai Gede pendiri Masjid Kuno Kotawaringin beserta para Sultan Kotawaringin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah perjuangan dakwah mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdul Qadir yang bergelar Kyai Gede pendiri Masjid Kuno Kotawaringin beserta para Sultan Kotawaringin, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah perjuangan dakwah mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram & Rabiul Awal (Peringatan Haul Kyai Gede, Milad Masjid Kyai Gede 1042 H / 1632 M, & Ziarah Akbar Kesultanan Kotawaringin di Kelurahan Kotawaringin Hulu, Kecamatan Kotawaringin Lama, Kabupaten Kotawaringin Barat).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki Masjid Cagar Budaya Kyai Gede dan cungkup makam beliau, serta tidak merusak ukiran kayu ulin kuno abad ke-17 M.',
    facilities: ['Cungkup Cagar Budaya Makam Kyai Gede', 'Masjid Kuno Kyai Gede (Berdiri 1632 M)', 'Kompleks Makam Raja-Raja Kotawaringin (Astana Al-Nursari)', 'Area Parkir Peziarah Kotawaringin Lama'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIB',
    references: [
      'BPCB Kalimantan Timur / Samarinda (2017). Profil Cagar Budaya Nasional Masjid dan Makam Kyai Gede Kotawaringin Barat. Samarinda: Kemendikbud.',
      'Lontaan, J.U. (1975). Sejarah-Hukum Adat dan Adat Istiadat Kalimantan Barat dan Kalimantan Tengah (Sejarah Kesultanan Kotawaringin). Jakarta.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 4. PROVINSI KALIMANTAN TIMUR (BENUA ETAM)
  // =========================================================================
  {
    id: 'tunggang-parangan-kutai-lama',
    name: 'Makam Habib Hasyim bin Musayyakh bin Yahya / Datuk Tunggang Parangan (Kutai Lama, Anggana, Kutai Kartanegara)',
    title: 'Ulama Pengislam Raja Mahkota Kesultanan Kutai Kartanegara (1575 M) & Rekan Seperjuangan Datuk Ri Bandang',
    description:
      'Kompleks Cagar Budaya Makam Datuk Tunggang Parangan (Habib Hasyim bin Musayyakh bin Yahya) beserta Makam Raja Aji Mahkota dan Aji Dilayas di Desa Kutai Lama, Kecamatan Anggana, Kabupaten Kutai Kartanegara (dekat Samarinda), Provinsi Kalimantan Timur.',
    category: 'Habaib',
    era: 'Paruh Kedua Abad ke-16 – Awal Abad ke-17 M (Mengislamkan Kutai sekitar tahun 1575 M)',
    province: 'Kalimantan Timur',
    city: 'Kutai Kartanegara',
    district: 'Kec. Anggana',
    address: 'Jl. Habib Hasyim, Desa Kutai Lama, Kec. Anggana, Kabupaten Kutai Kartanegara',
    location: {
      lat: -0.5842,
      lng: 117.2685,
      address: 'Jl. Habib Hasyim, Desa Kutai Lama, Kec. Anggana, Kabupaten Kutai Kartanegara',
      district: 'Kec. Anggana',
      city: 'Kutai Kartanegara',
      province: 'Kalimantan Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sultan_Suriansyah_Mosque.JPG',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Kalimantan Timur (Kompleks Makam Datuk Tunggang Parangan & Raja Mahkota di Kutai Lama Anggana)',
    sanad:
      'Al-Habib Hasyim bin Musayyakh bin Abdullah bin Al-Mubarak bin Yahya Ba’alawi (bergelar Datuk Tunggang Parangan / Tuan Tunggang Parangan); berdakwah dari Sumatera Barat dan Makassar bersama sahabatnya Abdul Makmur Khatib Tunggal (Datuk Ri Bandang) menuju pusat Kerajaan Kutai Kartanegara di Kutai Lama pada abad ke-16 M.',
    karya: [
      'Pengislaman Raja Kutai Kartanegara ke-6, Raja Aji Mahkota (memerintah 1545–1610 M), beserta putranya Aji Dilayas dan seluruh rakyat Kutai pada sekitar tahun 1575 M',
      'Pembangunan masjid pertama di Kerajaan Kutai Lama dan peletakan undang-undang kerajaan berasaskan syariat Islam (Panji Selaten)',
    ],
    history:
      '**Al-Habib Hasyim bin Musayyakh bin Yahya**—yang dalam naskah sejarah klasik **Salasilah Kutai** sangat masyhur dengan gelar **Tuan Tunggang Parangan** atau **Datuk Tunggang Parangan** (berdakwah di Kutai pada paruh kedua abad ke-16 M sekitar tahun **1575 M**)—adalah waliyullah dan ulama pelopor yang mengislamkan **Kerajaan Kutai Kartanegara ing Martadipura** di **Provinsi Kalimantan Timur**. Sebagaimana tercatat dalam *Salasilah Kutai*, beliau datang ke muara Sungai Mahakam (**Kutai Lama, Kecamatan Anggana**) bersama rekan seperjuangannya, **Datuk Ri Bandang (Abdul Makmur Khatib Tunggal)**. Nama julukan *Tunggang Parangan* disematkan oleh masyarakat Kutai karena saat mendarat di pesisir Kutai Lama, beliau tampak menunggangi seekor ikan hiu parang (*ikan parangan*) di muara sungai.\n\nPada masa itu, Kerajaan Kutai Kartanegara dipimpin oleh raja ke-6 yang sangat disegani dan sakti, **Raja Aji Mahkota (Raja Mahkota Mulia Alam, memerintah 1545–1610 M)**. Dengan kesabaran, hujah akidah tauhid, dan karomah yang ditampakkan Allah SWT ketika terjadi adu kesaktian di istana Kutai Lama (di mana api tidak mampu membakar tubuh sang ulama dan tempat persembunyian Raja Mahkota selalu diketahui setelah sang ulama mendirikan shalat sunnah dua rakaat), Raja Aji Mahkota akhirnya luluh dan mengucapkan dua kalimat syahadat sekitar tahun **1575 M**.\n\nSetelah Raja Aji Mahkota dan putranya **Aji Dilayas** memeluk Islam serta mendirikan masjid, **Datuk Ri Bandang** kembali ke Sulawesi Selatan untuk melanjutkan dakwah di Kerajaan Gowa-Tallo, sedangkan **Datuk Tunggang Parangan (Habib Hasyim bin Musayyakh bin Yahya)** memilih menetap di **Kutai Lama** membina keislaman rakyat Kalimantan Timur hingga wafat. Makam beliau di **Desa Kutai Lama, Kecamatan Anggana, Kabupaten Kutai Kartanegara** (sekitar 40 menit dari Kota Samarinda) kini menjadi pusat ziarah terbesar di Kalimantan Timur.',
    karomah: [
      'Dalam naskah kuno *Salasilah Kutai* (diteliti oleh C.A. Mees, 1935) dan tradisi lisan masyarakat Kutai–Samarinda, karomah utama Datuk Tunggang Parangan adalah keteguhannya menegakkan shalat dan wudhu di hadapan Raja Aji Mahkota: air wudhu yang membasahi wajah dan anggota tubuh beliau memancarkan cahaya kewibawaan yang memadamkan kobaran api ujian sang raja.<!--more-->\n\nHanya berjarak beberapa ratus meter dari **Kubah Makam Datuk Tunggang Parangan (Habib Hasyim bin Yahya)** di Desa Kutai Lama, terdapat pula **Kompleks Makam Raja Aji Mahkota dan Raja Aji Dilayas**, sehingga peziarah dapat menziarahi ulama pengislam dan raja Muslim pertama Kutai sekaligus.',
    ],
    untoldStory:
      'Berdasarkan tahkik nasab oleh Rabithah Alawiyah dan para habaib Nusantara (termasuk Maulana Habib Luthfi bin Yahya), sosok **Tuan Tunggang Parangan** memiliki nama asli **Al-Habib Hasyim bin Musayyakh bin Yahya**, seorang ulama *Ahlul Bait* yang berdakwah bersama para mubaligh Minangkabau di jalur Selat Makassar.<!--more-->\n\nSetiap tahun pada bulan **Muharram / Shafar**, dilaksanakan **Haul Akbar Habib Hasyim bin Musayyakh bin Yahya (Datuk Tunggang Parangan)** di Desa Kutai Lama, Kecamatan Anggana yang dihadiri oleh Sultan Kutai Kartanegara, Gubernur Kalimantan Timur, para habaib, dan puluhan ribu jamaah.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Datuk Tunggang Parangan (Habib Hasyim bin Musayyakh bin Yahya) di Kutai Lama Kalimantan Timur umumnya bertawassul memohon kepada Allah SWT kekuatan shalat dan wudhu sebagai pembuka segala kesulitan, keberkahan dakwah yang meluluhkan hati yang keras, serta kemakmuran bumi Kalimantan Timur.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Habib Hasyim bin Musayyakh bin Yahya / Datuk Tunggang Parangan (Kutai Lama)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الْحَبِيبِ هَاشِمْ بْنِ مُسَيَّخْ بْنِ يَحْيَى المُلَقَّبِ بِتُونْغغَانْغ فَارَانْغَانْ وَالْمَلِكِ أَجِي مَهْكُوتَا وَأَوْلِيَاءِ كُوتَايْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا بِنُورِ الْإِيمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الْحَبِيبِ هَاشِمْ بْنِ مُسَيَّخْ بْنِ يَحْيَى المُلَقَّبِ بِتُونْغغَانْغ فَارَانْغَانْ وَالْمَلِكِ أَجِي مَهْكُوتَا وَأَوْلِيَاءِ كُوتَايْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا بِنُورِ الْإِيمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah al-Habiib Haasyim bin Musayyakh bin Yahyaa al-mulaqqabi bi Tunggang Parangan wal-Malik Aji Mahkota wa Auliyaa-i Kutai syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa nawwir quluubanaa bi nuuril-iimaani wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Al-Habib Hasyim bin Musayyakh bin Yahya yang bergelar Datuk Tunggang Parangan beserta Raja Aji Mahkota dan seluruh auliya di Kutai, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati kami dengan cahaya iman, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Al-Habib Hasyim bin Musayyakh bin Yahya yang bergelar Datuk Tunggang Parangan beserta Raja Aji Mahkota dan seluruh auliya di Kutai, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati kami dengan cahaya iman, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Shafar (Puncak Haul Akbar Habib Hasyim bin Musayyakh bin Yahya / Datuk Tunggang Parangan di Kompleks Kubah Kutai Lama, Kecamatan Anggana, Kabupaten Kutai Kartanegara).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki Kubah Makam Datuk Tunggang Parangan dan Kompleks Makam Raja Mahkota, serta menjaga ketertiban kawasan wisata religi Desa Kutai Lama.',
    facilities: ['Kubah Utama Makam Datuk Tunggang Parangan (Habib Hasyim bin Yahya)', 'Kompleks Makam Raja Aji Mahkota & Aji Dilayas Kutai Lama', 'Masjid & Pendopo Ziarah Kutai Lama', 'Area Parkir Luas Bus Peziarah Anggana Kutai Kartanegara'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mees, Constantinus Alting (1935). De Kroniek van Koetai: Tekstuitgave met Toelichting (Salasilah Kutai). Santpoort: C.A. Mees.',
      'Sarip, Muhammad (2017). Samarinda Bahari: Sejarah 7 Zaman Daerah Samarinda & Kutai. Samarinda: Komunitas Samarinda Bahari.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-abul-hasan-samarinda',
    name: 'Makam Tuan Guru KH. Abul Hasan (Kompleks Masjid Raya Darussalam, Pasar Pagi, Samarinda)',
    title: 'Ulama Kharismatik Perintis Pengajian Kitab Kuning Samarinda & Pendiri Masjid Raya Darussalam (1870–1944 M)',
    description:
      'Kompleks Kubah Makam Al-Allamah Tuan Guru KH. Abul Hasan bin H. Abdullah (1870–1944 M) di halaman samping Masjid Raya Darussalam, Jl. KH. Abul Hasan / Kelurahan Pasar Pagi, Kecamatan Samarinda Kota, Kota Samarinda, Provinsi Kalimantan Timur.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Paruh Pertama Abad ke-20 M (1870 – 25 Ramadhan 1363 H / September 1944 M)',
    province: 'Kalimantan Timur',
    city: 'Samarinda',
    district: 'Kec. Samarinda Kota',
    address: 'Kompleks Masjid Raya Darussalam, Kel. Pasar Pagi, Kec. Samarinda Kota, Kota Samarinda',
    location: {
      lat: -0.5038,
      lng: 117.1478,
      address: 'Kompleks Masjid Raya Darussalam, Kel. Pasar Pagi, Kec. Samarinda Kota, Kota Samarinda',
      district: 'Kec. Samarinda Kota',
      city: 'Samarinda',
      province: 'Kalimantan Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Kalimantan Timur (Kompleks Kubah Tuan Guru KH. Abul Hasan di Masjid Raya Darussalam Samarinda)',
    sanad:
      'Al-Allamah Tuan Guru KH. Abul Hasan bin H. Abdullah (ulama keturunan Banjar–Amuntai yang bermukim lama di Makkah Al-Mukarramah berguru kepada para masyayikh Masjidil Haram akhir abad ke-19, lalu berdakwah di Samarinda bersama KH. Abdullah Marisi dan jaringan ulama Martapura).',
    karya: [
      'Kepeloporan pembangunan Masjid Jamik Samarinda pada tahun 1925 M yang kemudian menjadi Masjid Raya Darussalam Samarinda',
      'Pembukaan halaqah pengajian kitab kuning (fikih Syafi’iyah, tauhid, dan tasawuf) bagi masyarakat pedagang Banjar, Bugis, dan Kutai di tepian Sungai Mahakam',
    ],
    history:
      '**Al-Allamah Tuan Guru KH. Abul Hasan bin H. Abdullah** (lahir di Amuntai, Kalimantan Selatan sekitar tahun **1870 M** dan wafat di Samarinda pada bulan suci **Ramadhan 1363 H / 1944 M**) adalah ulama sepuh (*waliyullah*) yang meletakkan fondasi keilmuan Islam Ahlussunnah wal Jama’ah di **Kota Samarinda, Provinsi Kalimantan Timur**. Setelah menuntut ilmu di Tanah Banjar dan bermukim bertahun-tahun di **Makkah Al-Mukarramah**, KH. Abul Hasan merantau ke bandar perdagangan tepi Sungai Mahakam, **Samarinda**, pada awal abad ke-20 M.\n\nPada tahun **1925 M**, melihat pesatnya pertumbuhan umat Islam dari kalangan saudagar Banjar, Bugis, dan Kutai di kawasan Pasar Pagi tepi Sungai Mahakam, Tuan Guru KH. Abul Hasan bersama para tokoh saudagar Muslim memelopori berdirinya **Masjid Jamik Samarinda** (yang kemudian oleh para ulama penerusnya diberi nama **Masjid Raya Darussalam Samarinda**, terinspirasi dari Pondok Pesantren Darussalam Martapura). Di masjid inilah KH. Abul Hasan menjadi imam besar sekaligus guru utama yang mengajarkan kitab-kitab fikih, tauhid, dan tasawuf dengan penuh keikhlasan.\n\nBeliau wafat dalam kemuliaan di bulan suci **Ramadhan 1363 H (1944 M)**. Sebagai bentuk penghormatan tertinggi masyarakat dan ulama Samarinda, jenazah **Tuan Guru KH. Abul Hasan** dimakamkan tepat di dalam cungkup kubah di halaman samping **Masjid Raya Darussalam, Kelurahan Pasar Pagi, Kecamatan Samarinda Kota**, dan nama beliau diabadikan menjadi nama jalan utama di pusat Kota Samarinda (**Jl. KH. Abul Hasan**).',
    karomah: [
      'Dalam penuturan para ulama sepuh Samarinda dan jamaah Masjid Raya Darussalam, karomah Tuan Guru KH. Abul Hasan tampak dari keberkahan majelis ilmu dan masjid yang beliau rintis: meskipun Kota Samarinda berkembang menjadi kota metropolitan bisnis di Kalimantan Timur, **Masjid Raya Darussalam** dan **Kubah KH. Abul Hasan** di Pasar Pagi tetap menjadi jantung zikir, iktikaf Ramadhan, dan majelis ilmu paling hidup di tengah pusat perniagaan kota.<!--more-->\n\nKetika dilakukan pemugaran besar-besaran terhadap Masjid Raya Darussalam Samarinda pada abad ke-20 dan ke-21, Kubah Makam KH. Abul Hasan tetap dijaga utuh dan terintegrasi dengan serambi masjid.',
    ],
    untoldStory:
      'Jaringan keilmuan antara **Samarinda (Kalimantan Timur)** dan **Martapura/Amuntai (Kalimantan Selatan)** yang dirintis oleh **Tuan Guru KH. Abul Hasan** bersama **KH. Abdullah Marisi** dan **KH. Muhammad Zaini (Guru Zaini Samarinda)** menjadikan tradisi keagamaan masyarakat Samarinda—seperti pembacaan Maulid Habsyi, Burdah, dan Manaqib Samman—sangat kental menyerupai kota santri Martapura.<!--more-->\n\nPeziarah yang berkunjung ke Kota Samarinda dapat dengan sangat mudah berziarah ke **Kubah KH. Abul Hasan** karena lokasinya berada tepat di kompleks **Masjid Raya Darussalam Pasar Pagi** di tepi Sungai Mahakam.',
    barokahHajat:
      'Peziarah, pedagang Pasar Pagi, dan penuntut ilmu yang berziarah ke Kubah Tuan Guru KH. Abul Hasan di Masjid Raya Darussalam Samarinda umumnya bertawassul memohon kepada Allah SWT keberkahan perniagaan yang jujur dan gemar bersedekah ke masjid, keistiqamahan menuntut ilmu di tengah kesibukan kota, serta kemuliaan wafat di bulan Ramadhan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Tuan Guru KH. Abul Hasan (Masjid Raya Darussalam Samarinda)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ كِيَاهِي الحَاجِّ أَبِي الْحَسَنِ بْنِ عَبْدِ اللهِ سَامَارِينْدَا وَمَشَايِخِ مَسْجِدِ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَرْزَاقِنَا وَعُلُومِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ كِيَاهِي الحَاجِّ أَبِي الْحَسَنِ بْنِ عَبْدِ اللهِ سَامَارِينْدَا وَمَشَايِخِ مَسْجِدِ دَارِ السَّلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَرْزَاقِنَا وَعُلُومِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatil-Waliyyish-Shaalih asy-Syaikh Kiyaahii al-Haajj Abil-Hasan bin 'Abdillaah Samarinda wa Masyaayikhi Masjidi Daaris-Salaam syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik fii arzaaqinaa wa 'uluuminaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah wali yang shalih Tuan Guru KH. Abul Hasan bin Abdullah Samarinda beserta para masyayikh Masjid Raya Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah rezeki dan ilmu kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah wali yang shalih Tuan Guru KH. Abul Hasan bin Abdullah Samarinda beserta para masyayikh Masjid Raya Darussalam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah rezeki dan ilmu kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '25 Ramadhan (Puncak Haul Akbar Tuan Guru KH. Abul Hasan bertepatan dengan malam-malam Lailatul Qadar di Masjid Raya Darussalam, Kelurahan Pasar Pagi, Kecamatan Samarinda Kota, Kota Samarinda).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat saat memasuki kompleks Masjid Raya Darussalam Samarinda, melepas alas kaki di koridor Kubah KH. Abul Hasan, serta menjaga ketenangan jamaah yang sedang shalat dan beriktikaf.',
    facilities: ['Kubah Makam Tuan Guru KH. Abul Hasan', 'Masjid Raya Darussalam Samarinda', 'Tempat Wudhu, Perpustakaan & Aula Majelis Taklim', 'Area Parkir Terpadu Masjid Raya Pasar Pagi Samarinda'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Sarip, Muhammad (2017). Samarinda Bahari: Sejarah 7 Zaman Daerah Samarinda. Samarinda: Komunitas Samarinda Bahari.',
      'Yayasan Masjid Raya Darussalam Samarinda — Sejarah Berdirinya Masjid Raya Darussalam (1925) dan Biografi Tuan Guru KH. Abul Hasan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 5. PROVINSI KALIMANTAN UTARA (BENUANTA)
  // =========================================================================
  {
    id: 'makam-raja-bulungan-tanjung-palas',
    name: 'Kompleks Makam Raja-Raja Kesultanan Bulungan (Sultan Maulana Muhammad Djalaluddin — Tanjung Palas, Bulungan)',
    title: 'Astana Cagar Budaya Para Sultan Penyebar Islam di Pesisir Utara Kalimantan & Tepian Sungai Kayan (Abad ke-18 – ke-20 M)',
    description:
      'Kompleks Cagar Budaya Makam Raja-Raja Kesultanan Bulungan (tempat peristirahatan Sultan Muhammad Kaharuddin, Sultan Maulana Muhammad Djalaluddin [1931–1958 M], dan para bangsawan Kesultanan Bulungan) serta Masjid Sultan Maulana Muhammad Djalaluddin di Kelurahan Tanjung Palas Tengah / Hilir, Kecamatan Tanjung Palas, Kabupaten Bulungan (seberang Tanjung Selor), Provinsi Kalimantan Utara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Pertengahan Abad ke-20 M (Kesultanan Bulungan: 1731–1958 M)',
    province: 'Kalimantan Utara',
    city: 'Bulungan',
    district: 'Kec. Tanjung Palas',
    address: 'Kelurahan Tanjung Palas Tengah & Tanjung Palas Hilir, Kec. Tanjung Palas, Kabupaten Bulungan (Seberang Tanjung Selor)',
    location: {
      lat: 2.8365,
      lng: 117.3582,
      address: 'Kelurahan Tanjung Palas Tengah & Tanjung Palas Hilir, Kec. Tanjung Palas, Kabupaten Bulungan (Seberang Tanjung Selor)',
      district: 'Kec. Tanjung Palas',
      city: 'Bulungan',
      province: 'Kalimantan Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sultan_Suriansyah_Mosque.JPG',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Kalimantan Utara (Kompleks Makam Kesultanan Bulungan & Masjid Sultan Maulana Muhammad Djalaluddin di Tanjung Palas)',
    sanad:
      'Dinasti Kesultanan Bulungan yang diislamkan sejak masa Wira Amir (bergelar Sultan Amiril Mukminin, 1731–1777 M) melalui jaringan ulama Kesultanan Berau, Sulu, dan Hadramaut (Sayyid Abdurrahman Al-Idrus / Arab Bilal); dilanjutkan hingga masa Sultan Maulana Muhammad Djalaluddin (memerintah 1931–1958 M).',
    karya: [
      'Penyebaran dakwah Islam di sepanjang muara Sungai Kayan, Tanjung Palas, Tanjung Selor, Tarakan, hingga Nunukan di Kalimantan Utara sejak tahun 1731 M',
      'Pembangunan Masjid Kasimuddin / Masjid Sultan Maulana Muhammad Djalaluddin di Tanjung Palas sebagai pusat syiar Islam tertua di Kabupaten Bulungan',
      'Integrasi kedaulatan wilayah Kesultanan Bulungan ke dalam Negara Kesatuan Republik Indonesia pada masa Sultan Maulana Muhammad Djalaluddin',
    ],
    history:
      '**Kesultanan Bulungan** yang berpusat di **Tanjung Palas** (di tepi barat Sungai Kayan, tepat berseberangan dengan **Tanjung Selor**, ibu kota Provinsi Kalimantan Utara) adalah poros utama masuk dan berkembangnya agama Islam di wilayah paling utara Pulau Kalimantan sejak abad ke-18 M. Tonggak resmi berdirinya Kesultanan Islam Bulungan dimulai pada tahun **1731 M**, ketika penguasa Bulungan **Wira Amir** memeluk agama Islam dan menyandang gelar **Sultan Amiril Mukminin (1731–1777 M)**, dibimbing oleh para ulama dari jaringan Kesultanan Berau, Sulu, serta para *habaib* dan mubaligh Arab-Melayu.\n\nPada abad ke-19 dan awal abad ke-20 M, syiar Islam di Bulungan diperkuat oleh **Sultan Muhammad Kaharuddin II**, **Sultan Kasimuddin**, serta **Sultan Maulana Muhammad Djalaluddin** (memerintah **1931–1958 M**). Para Sultan Bulungan membangun masjid agung kerajaan di Tanjung Palas (**Masjid Sultan Kasimuddin / Masjid Sultan Maulana Muhammad Djalaluddin**), mendatangkan guru-guru Al-Qur’an dan kitab fikih Syafi’iyah, serta mengayomi kerukunan antara suku **Bulungan, Tidung, dan Dayak** di sepanjang aliran Sungai Kayan hingga pulau-pulau pesisir (Tarakan, Bunyu, dan Nunukan).\n\nKetika **Sultan Maulana Muhammad Djalaluddin** wafat pada tahun **1958 M**, beliau dimakamkan bersama para Sultan dan kerabat kerajaan pendahulunya di **Kompleks Makam Raja-Raja Kesultanan Bulungan di Kecamatan Tanjung Palas, Kabupaten Bulungan**. Kompleks makam bernisan batu kuno berukir kaligrafi Arab-Melayu ini kini ditetapkan sebagai Situs Cagar Budaya utama di Provinsi Kalimantan Utara.',
    karomah: [
      'Dalam catatan sejarah lokal Kalimantan Utara dan kesaksian masyarakat Tanjung Palas, kemuliaan para Sultan dan ulama Kesultanan Bulungan tampak dari terjaganya **Masjid Sultan Maulana Muhammad Djalaluddin** serta **Kompleks Makam Raja-Raja Bulungan di Tanjung Palas Tengah/Hilir** yang tetap utuh dan dihormati masyarakat meskipun kompleks Istana Kesultanan Bulungan pernah mengalami tragedi pembakaran pada tahun 1964 M.<!--more-->\n\nDi dalam Kompleks Makam Kesultanan Bulungan di Tanjung Palas, terdapat puluhan nisan batu kuno dengan inskripsi aksara Arab-Jawi yang mencatat silsilah raja-raja Muslim penjaga perbatasan utara Nusantara.',
    ],
    untoldStory:
      '**Sultan Maulana Muhammad Djalaluddin (1931–1958 M)** bersama permaisurinya **Ratu Laila** dikenal sebagai pemimpin yang sangat religius dan nasionalis: beliau turut hadir dalam Konferensi Malino dan menetapkan Bulungan sebagai bagian sah dari Republik Indonesia.<!--more-->\n\nPeziarah yang tiba di **Tanjung Selor (ibu kota Provinsi Kalimantan Utara)** dapat menyeberangi Sungai Kayan melalui **Jembatan Kayan** atau menggunakan perahu *ketinting* selama 5 menit menuju **Kecamatan Tanjung Palas** untuk menziarahi **Kompleks Makam Raja-Raja Bulungan**, **Museum Kesultanan Bulungan**, dan **Masjid Sultan Maulana Muhammad Djalaluddin**.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Makam Raja-Raja Kesultanan Bulungan di Tanjung Palas Kalimantan Utara umumnya bertawassul memohon kepada Allah SWT penjagaan iman dan kedaulatan di wilayah perbatasan negeri, kepemimpinan yang adil dan mengayomi, serta rahmat ampunan bagi seluruh syuhada dan leluhur Bulungan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Maulana Muhammad Djalaluddin & Raja-Raja Kesultanan Bulungan (Kalimantan Utara)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ أَمِيرِ الْمُؤْمِنِينَ وَالسُّلْطَانِ مُحَمَّدْ كَهَارِ الدِّينِ وَالسُّلْطَانِ مَوْلَانَا مُحَمَّدْ جَلَالِ الدِّينِ وَكَافَّةِ سَلَاطِينِ وَعُلَمَاءِ بُولُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْ بِلَادَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ أَمِيرِ الْمُؤْمِنِينَ وَالسُّلْطَانِ مُحَمَّدْ كَهَارِ الدِّينِ وَالسُّلْطَانِ مَوْلَانَا مُحَمَّدْ جَلَالِ الدِّينِ وَكَافَّةِ سَلَاطِينِ وَعُلَمَاءِ بُولُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْ بِلَادَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Amiiril-Mu'miniin was-Sulthaan Muhammad Kahaariddiin was-Sulthaan Maulaanaa Muhammad Jalaaliddiin wa kaaffati Salaathiini wa 'Ulamaa-i Bulungan syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wahfazh bilaadanaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Amiril Mukminin, Sultan Muhammad Kaharuddin, Sultan Maulana Muhammad Djalaluddin, beserta seluruh sultan dan ulama Kesultanan Bulungan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jagalah negeri kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Amiril Mukminin, Sultan Muhammad Kaharuddin, Sultan Maulana Muhammad Djalaluddin, beserta seluruh sultan dan ulama Kesultanan Bulungan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jagalah negeri kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram & 12 Oktober (Ziarah Adat Birau Hari Jadi Kabupaten Bulungan & Haul Sultan-Sultan Bulungan di Kompleks Makam Raja-Raja Kesultanan Bulungan, Kecamatan Tanjung Palas, Kabupaten Bulungan).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki area cungkup Makam Kesultanan Bulungan dan Masjid Sultan Maulana Muhammad Djalaluddin, serta tidak menduduki atau menginjak nisan batu kuno cagar budaya.',
    facilities: ['Kompleks Cagar Budaya Makam Raja-Raja Kesultanan Bulungan', 'Masjid Bersejarah Sultan Maulana Muhammad Djalaluddin', 'Museum Kesultanan Bulungan Tanjung Palas', 'Dermaga Sungai Kayan & Area Parkir Peziarah Tanjung Palas'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Sellato, Bernard (2001). Forest, Resources and People in Bulungan: Elements for a History of Settlement, Trade, and Social Dynamics in Borneo, 1880–2000. Bogor: CIFOR.',
      'Datu Dissan (2007). Sejarah Kesultanan Bulungan di Kalimantan Utara. Tanjung Selor: Pemerintah Kabupaten Bulungan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 6. PROVINSI SULAWESI SELATAN (ANGING MAMMIRI / BUGIS-MAKASSAR)
  // =========================================================================
  {
    id: 'syekh-yusuf-al-makassari',
    legacyId: 'ulama-4',
    name: 'Makam Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari Al-Bantani (Tuanta Salamaka — Katangka, Somba Opu, Gowa)',
    title: 'Wali Quthub Nusantara, Mursyid Thariqah Khalwatiyah & Pahlawan Nasional Dua Benua: Indonesia dan Afrika Selatan (1626–1699 M)',
    description:
      'Kompleks Cagar Budaya Nasional Kubah Makam Syekh Yusuf Al-Makassari (Tuanta Salamaka ri Gowa, 1036–1110 H / 3 Juli 1626 – 23 Mei 1699 M) di Lakiung, Kelurahan Katangka, Kecamatan Somba Opu, Kabupaten Gowa (perbatasan Kota Makassar), Provinsi Sulawesi Selatan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 M (8 Syawal 1036 H / 3 Juli 1626 M – 22 Dzulqa’dah 1110 H / 23 Mei 1699 M)',
    province: 'Sulawesi Selatan',
    city: 'Gowa',
    district: 'Kec. Somba Opu',
    address: 'Jl. Syekh Yusuf, Lakiung, Kel. Katangka, Kec. Somba Opu, Kabupaten Gowa',
    location: {
      lat: -5.1886,
      lng: 119.4508,
      address: 'Jl. Syekh Yusuf, Lakiung, Kel. Katangka, Kec. Somba Opu, Kabupaten Gowa',
      district: 'Kec. Somba Opu',
      city: 'Gowa',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Kubah Makam Syekh Yusuf Al-Makassari (Tuanta Salamaka) di Lakiung, Katangka, Kabupaten Gowa',
    sanad:
      'Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari Al-Bantani; belajar di Gowa kepada Sayyid Ba’alawi bin Abdullah Al-Allamah Ath-Thahir (Bontoala) dan Jalaluddin Al-Aidid (Cikoang), lalu mengembara ke Banten, Aceh (menerima Thariqah Qadiriyah dari Syaikh Nuruddin Ar-Raniri), Yaman (Thariqah Naqsyabandiyah dari Syaikh Muhammad Abdul Baqi Al-Mizjaji dan Ba’alawiyah), Madinah (berguru kepada Syaikh Ibrahim Al-Kurani), hingga Damaskus Suriah (menerima ijazah puncak Thariqah Khalwatiyah dan gelar Tajul Khalwati dari Syaikh Abu Al-Barakat Ayyub bin Ahmad Al-Khalwati).',
    karya: [
      'Lebih dari 25 risalah tasawuf berbahasa Arab: Zubdatul Asrar fi Tahqiqi Ba’dhil Masyarib al-Akhyar, Minhajat as-Salikin, Safinat an-Najah, Mathalib as-Salikin, An-Nafhatu as-Sailaniyyah, dan Al-Barakat as-Sailaniyyah',
      'Perjuangan jihad bersenjata mendampingi Sultan Ageng Tirtayasa di Kesultanan Banten melawan VOC Belanda (1682–1683 M)',
      'Peletakan komunitas Muslim pertama di Tanjung Harapan (Zandvliet / Macassar, Cape Town, Afrika Selatan) pada masa pengasingan 1694–1699 M',
    ],
    history:
      '**Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari Al-Bantani**—yang sangat dicintai dan dimuliakan oleh masyarakat Sulawesi Selatan dengan gelar **Tuanta Salamaka ri Gowa** (*"Guru Kami yang Membawa Keselamatan dari Gowa"*, lahir di Moncongloe/Tallo, Makassar pada **8 Syawal 1036 H / 3 Juli 1626 M** dan wafat di Cape Town, Afrika Selatan pada **22 Dzulqa’dah 1110 H / 23 Mei 1699 M**)—adalah salah seorang ulama sufi terbesar dalam sejarah Nusantara yang dianugerahi gelar **Pahlawan Nasional oleh dua negara sekaligus: Republik Indonesia (SK Presiden No. 071/TK/1995) dan Republik Afrika Selatan (Order of the Companions of O.R. Tambo in Gold, 2005)**. Pada usia 18 tahun (1644 M), beliau meninggalkan Gowa untuk menuntut ilmu selama hampir tiga dekade melintasi Banten, Aceh, Yaman, Makkah, Madinah, hingga Damaskus (Suriah).\n\nDi Masjid Umayyah Damaskus, kealiman Syekh Yusuf diakui oleh para ulama Timur Tengah hingga gurunya menyematkan gelar kehormatan **Tajul Khalwati Hadiyatullah** (*Mahkota Tarekat Khalwatiyah*). Sekembalinya ke Nusantara sekitar tahun 1664–1670 M, beliau menetap di **Kesultanan Banten** karena diangkat menjadi Mufti Agung, menantu, sekaligus penasihat utama **Sultan Ageng Tirtayasa**. Ketika VOC Belanda mengintervensi Banten (1682–1683 M), Syekh Yusuf memimpin sekitar 4.000 pasukan pejuang Makassar, Bugis, dan Banten bergerilya melintasi hutan Priangan hingga tertangkap di Sukapura karena Belanda menyandera putrinya.\n\nKarena pengaruh Syekh Yusuf sangat ditakuti oleh Belanda, VOC mengasingkan beliau ke **Ceylon (Sri Lanka, 1684–1693 M)**—di mana para jamaah haji Nusantara tetap singgah meminta berkah dan kitab beliau—lalu dipindahkan lebih jauh lagi ke **Tanjung Harapan (Zandvliet / Macassar, Cape Town, Afrika Selatan)** pada tahun **1694 M** hingga beliau wafat pada **23 Mei 1699 M**. Atas permintaan tegas Raja Gowa **Sultan Abdul Jalil (memerintah 1677–1709 M)**, kerangka jenazah Syekh Yusuf dipulangkan oleh VOC ke tanah kelahirannya dan dimakamkan kembali dengan upacara kebesaran kerajaan pada tanggal **5 April 1705 M (12 Dzulhijjah 1116 H)** di **Lakiung, Kelurahan Katangka, Kecamatan Somba Opu, Kabupaten Gowa**.',
    karomah: [
      'Dalam kajian Prof. Azyumardi Azra dan Prof. Abu Hamid (*Syekh Yusuf: Seorang Ulama, Sufi dan Pejuang*), karomah luar biasa Syekh Yusuf Al-Makassari tampak dari kenyataan bahwa setiap negeri tempat beliau diasingkan justru berubah menjadi pusat cahaya Islam: di Sri Lanka beliau menulis kitab-kitab tasawuf *As-Sailaniyyah*, di Afrika Selatan beliau menjadi bapak pendiri komunitas Muslim Cape Malay, dan di empat lokasi makam/petilasan beliau (Cape Town, Banten, Palembang/Talang, dan Gowa) semuanya tumbuh menjadi maqbarah keramat yang tak pernah sepi diziarahi.<!--more-->\n\nDalam tradisi lisan masyarakat Gowa–Makassar, ketika peti jenazah Syekh Yusuf tiba dari Afrika Selatan di Lakiung pada tahun 1705 M, tercium semerbak harum kesturi dari dalam cungkup makam dan memancar cahaya yang disaksikan oleh Sultan Abdul Jalil beserta rakyat Gowa.',
    ],
    untoldStory:
      'Di dalam **Kubah Utama Makam Syekh Yusuf di Lakiung (Katangka, Somba Opu, Gowa)**, pusara **Tuanta Salamaka Syekh Yusuf** berdampingan dengan pusara permaisuri beliau (**Sitti Habiba / Daeng Nisanga**), serta di kompleks yang sama bersemayam pula **Sultan Abdul Jalil (Raja Gowa ke-19)** yang telah memperjuangkan pemulangan jenazah sang mahaguru dari Afrika Selatan ke tanah Gowa.<!--more-->\n\nHanya berjarak sekitar 500 meter dari Kompleks Makam Syekh Yusuf di Lakiung, berdiri **Masjid Tua Katangka (didirikan tahun 1603 M)**, masjid tertua di Kerajaan Gowa tempat Syekh Yusuf masa kecil belajar Al-Qur’an, serta **Kompleks Makam Sultan Hasanuddin (Katangka, Gowa, Sulsel)**—yakni **Sultan Gowa ke-16 (*I Mallombassi Daeng Mattawang / Ayam Jantan dari Timur*)** yang dengan gagah berani mempertahankan kedaulatan maritim Islam Makassar melawan monopoli VOC Belanda.',
    barokahHajat:
      'Peziarah dari seluruh dunia yang berziarah ke Kubah Makam Syekh Yusuf Al-Makassari di Katangka Gowa umumnya bertawassul memohon kepada Allah SWT keselamatan dunia dan akhirat (*Tuanta Salamaka*), keteguhan iman dan zikir *Thariqah Khalwatiyah* di tengah ujian hidup seberat apa pun, serta keberanian membela kebenaran.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari (Tuanta Salamaka Gowa)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الرَّبَّانِيِّ وَالْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ يُوسُفَ أَبِي الْمَحَاسِنِ تَاجِ الْخَلْوَتِيِّ الْمَقَاصِرِيِّ (تُوَانْتَا سَلَامَاكَا) وَالسُّلْطَانِ عَبْدِ الْجَلِيلِ وَأَوْلِيَاءِ غُووَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَسَلِّمْنَا فِي الدُّنْيَا وَالْآخِرَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الرَّبَّانِيِّ وَالْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ يُوسُفَ أَبِي الْمَحَاسِنِ تَاجِ الْخَلْوَتِيِّ الْمَقَاصِرِيِّ (تُوَانْتَا سَلَامَاكَا) وَالسُّلْطَانِ عَبْدِ الْجَلِيلِ وَأَوْلِيَاءِ غُووَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَسَلِّمْنَا فِي الدُّنْيَا وَالْآخِرَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbir-Rabbaanii wal-Mujaahidi fii sabiilillaah asy-Syaikh Yuusuf Abil-Mahaasin Taajil-Khalwatii al-Maqaashirii (Tuanta Salamaka) was-Sulthaan 'Abdil-Jaliil wa Auliyaa-i Gowa syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa sallimnaa fid-dunyaa wal-aakhirati wanfa'naa bi 'uluumihim wa barakaatihim.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub rabbani dan pejuang di jalan Allah Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari (Tuanta Salamaka), Sultan Abdul Jalil, beserta seluruh auliya di Gowa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah keselamatan kepada kami di dunia dan akhirat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub rabbani dan pejuang di jalan Allah Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari (Tuanta Salamaka), Sultan Abdul Jalil, beserta seluruh auliya di Gowa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah keselamatan kepada kami di dunia dan akhirat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka.',
      },
    ],
    haulSchedule:
      '22 Dzulqa’dah / 23 Mei (Haul Wafatnya Syekh Yusuf Al-Makassari) & Bulan Dzulhijjah / Syawal (Puncak Haul Akbar Tuanta Salamaka & Jamaah Tarekat Khalwatiyah di Kompleks Kubah Lakiung, Kelurahan Katangka, Kecamatan Somba Opu, Kabupaten Gowa).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (laki-laki dianjurkan memakai songkok recca/peci dan sarung), melepas alas kaki sebelum memasuki pelataran Kubah Makam Syekh Yusuf, serta menjaga kekhusyukan zikir jamaah tanpa melakukan praktik yang bertentangan dengan tauhid.',
    facilities: ['Kubah Utama Cagar Budaya Nasional Makam Syekh Yusuf Al-Makassari', 'Musholla & Pendopo Ziarah Lakiung', 'Dekat Masjid Tua Katangka (1603 M) & Makam Sultan Hasanuddin', 'Area Parkir Bus Peziarah Somba Opu Gowa'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Hamid, Abu (1994). Syekh Yusuf: Seorang Ulama, Sufi dan Pejuang. Jakarta: Yayasan Obor Indonesia.',
      'Tudjimah (1997). Syekh Yusuf Makasar: Riwayat dan Ajarannya. Jakarta: UI Press.',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII dan XVIII. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datuk-ri-bandang',
    legacyId: 'auliya-17',
    name: 'Makam Datuk Ri Bandang / Abdul Makmur Khatib Tunggal (Kaluku Bodoa, Tallo, Kota Makassar)',
    title: 'Anggota Tiga Serangkai Dato’ Tallua Pengislam Raja Gowa Sultan Alauddin & Raja Tallo Sultan Awalul Islam (1605 M)',
    description:
      'Kompleks Cagar Budaya Makam Datuk Ri Bandang (Syekh Abdul Makmur Khatib Tunggal, wafat abad ke-17 M) di Jl. Sinassara, Kelurahan Kaluku Bodoa, Kecamatan Tallo, Kota Makassar, Provinsi Sulawesi Selatan.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-16 – Paruh Pertama Abad ke-17 M (Mengislamkan Gowa-Tallo pada 9 Jumadil Awal 1014 H / 22 September 1605 M)',
    province: 'Sulawesi Selatan',
    city: 'Makassar',
    district: 'Kec. Tallo',
    address: 'Jl. Sinassara, Kel. Kaluku Bodoa, Kec. Tallo, Kota Makassar',
    location: {
      lat: -5.1118,
      lng: 119.4368,
      address: 'Jl. Sinassara, Kel. Kaluku Bodoa, Kec. Tallo, Kota Makassar',
      district: 'Kec. Tallo',
      city: 'Makassar',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Auliya Makassar (Kompleks Makam Datuk Ri Bandang di Kaluku Bodoa Kecamatan Tallo Makassar)',
    sanad:
      'Syekh Abdul Makmur yang bergelar Khatib Tunggal dan Datuk Ri Bandang; ulama besar asal Koto Tangah, Minangkabau (Sumatera Barat) yang menuntut ilmu di Pesantren Giri Kedaton (Sunan Giri / Sunan Prapen di Gresik) dan Kesultanan Aceh, lalu diutus bersama Datuk Patimang dan Datuk Ri Tiro (Dato’ Tallua) mengislamkan Sulawesi Selatan, Kutai, dan Bima.',
    karya: [
      'Pengislaman Mangkubumi Gowa / Raja Tallo I Mallingkaang Daeng Manyonri (Sultan Abdullah Awalul Islam) dan Raja Gowa XIV I Mangarangi Daeng Manrabbia (Sultan Alauddin) pada malam Jumat, 9 Jumadil Awal 1014 H / 22 September 1605 M',
      'Perintisan Masjid Tua Katangka (1603/1605 M) dan Masjid Tallo sebagai pusat pengajaran syariat dan fikih Syafi’iyah di Kerajaan Kembar Gowa-Tallo',
      'Penyebaran dakwah Islam lintas laut ke Kutai Kartanegara (bersama Datuk Tunggang Parangan), Kerajaan Bima (Nusa Tenggara Barat), dan Pulau Selayar',
    ],
    history:
      '**Syekh Abdul Makmur Khatib Tunggal**—yang diabadikan dalam lontara sejarah Makassar dengan gelar **Datuk Ri Bandang** (hidup pada paruh kedua abad ke-16 hingga paruh pertama abad ke-17 M)—adalah ulama pelopor yang mengislamkan kerajaan maritim terbesar di Indonesia Timur, yakni **Kerajaan Kembar Gowa-Tallo (Kesultanan Makassar)**. Berasal dari Koto Tangah, Minangkabau, beliau memperdalam ilmu agama di **Giri Kedaton (Gresik)** dan Aceh, lalu bersama dua rekannya—**Datuk Patimang (Khatib Sulaiman)** dan **Datuk Ri Tiro (Khatib Bungsu)**—membentuk misi dakwah tiga serangkai yang dikenal oleh masyarakat Bugis-Makassar sebagai **Dato’ Tallua** (*Tiga Datuk*). Ketiganya membagi strategi dakwah secara jenius: Datuk Patimang melalui jalur *Tauhid* di Luwu, Datuk Ri Tiro melalui jalur *Tasawuf* di Bulukumba, dan **Datuk Ri Bandang** melalui jalur **Syariat/Fikih** di pusat kekuasaan **Gowa-Tallo (Makassar)**.\n\nSebagaimana tercatat secara presisi dalam naskah **Lontara Bilang Gowa-Tallo**, Datuk Ri Bandang mendarat di pelabuhan Tallo dan disambut langsung oleh Mangkubumi Gowa sekaligus Raja Tallo yang sangat cerdas, **I Mallingkaang Daeng Manyonri Karaeng Katangka**. Pada malam Jumat, **9 Jumadil Awal 1014 H (22 September 1605 M)**, Raja Tallo mengucapkan syahadat dengan gelar **Sultan Abdullah Awalul Islam**, disusul malam itu juga oleh Raja Gowa ke-14, **I Mangarangi Daeng Manrabbia**, yang menyandang gelar **Sultan Alauddin**.\n\nDua tahun kemudian, pada hari Jumat **19 Rajab 1016 H (9 November 1607 M)**, dilaksanakan Shalat Jumat kerajaan pertama di Masjid Tallo dan Masjid Mangallekana yang menandai bahwa Islam telah menjadi agama resmi seluruh rakyat Makassar. Setelah berdakwah hingga ke Bima (NTB), Datuk Ri Bandang kembali ke Makassar hingga wafat dan dimakamkan di **Jl. Sinassara, Kelurahan Kaluku Bodoa, Kecamatan Tallo, Kota Makassar**.',
    karomah: [
      'Dalam naskah *Lontara Patturioloanga ri Tu Gowa* dan kajian Prof. Mattulada serta Prof. Ahmad M. Sewang, dikisahkan bahwa saat Datuk Ri Bandang pertama kali menjejakkan kaki di pantai Tallo dan mendirikan shalat dua rakaat, Raja Tallo I Mallingkaang Daeng Manyonri yang hendak menemuinya sempat diuji dengan penampakan kewibawaan nurani di persimpangan jalan sebelum sampai ke hadapan Datuk Ri Bandang dan langsung tertarik memeluk Islam.<!--more-->\n\nDi Kompleks Makam Datuk Ri Bandang di Kelurahan Kaluku Bodoa (Tallo), pusara beliau dijaga dengan sangat rapi dan setiap harinya diziarahi oleh masyarakat Makassar, Minangkabau, hingga Bima yang mengenang jasa besar sang mubaligh nusantara.',
    ],
    untoldStory:
      'Jejak dakwah **Datuk Ri Bandang** bersama muridnya **Datuk Ri Tiro** juga menyeberang hingga ke **Kesultanan Bima di Pulau Sumbawa (Nusa Tenggara Barat)** pada tahun **1620 M**, di mana beliau membimbing La Kai memeluk Islam menjadi **Sultan Abdul Kahir (Sultan Bima I)**—sehingga nama Datuk Ri Bandang dimuliakan di Sumatera Barat, Kalimantan Timur, Sulawesi Selatan, dan Nusa Tenggara Barat sekaligus.<!--more-->\n\nDi Kecamatan Tallo Kota Makassar, peziarah dapat menziarahi **Makam Datuk Ri Bandang di Kaluku Bodoa**, lalu melanjutkan ziarah ke **Kompleks Makam Raja-Raja Tallo** (tempat pusara **Sultan Abdullah Awalul Islam**) yang terletak tidak jauh di pesisir Tallo.',
    barokahHajat:
      'Peziarah dan da’i yang berziarah ke maqbarah Datuk Ri Bandang (Abdul Makmur Khatib Tunggal) di Tallo Kota Makassar umumnya bertawassul memohon kepada Allah SWT hikmah strategi dakwah yang cerdas dan menyentuh hati para pemimpin, keteguhan menegakkan syariat Islam, serta persaudaraan ukhuwah lintas pulau Nusantara.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Makmur Khatib Tunggal / Datuk Ri Bandang (Tallo Makassar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ الْمَعْمُورِ الْخَطِيبِ التُّونْغغَالْ (دَاتُوكْ رِي بَانْدَانْغ) وَالسُّلْطَانِ عَبْدِ اللهِ أَوَّلِ الْإِسْلَامِ وَالسُّلْطَانِ عَلَاءِ الدِّينِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَحْيِنَا عَلَى السُّنَّةِ وَالشَّرِيعَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ الْمَعْمُورِ الْخَطِيبِ التُّونْغغَالْ (دَاتُوكْ رِي بَانْدَانْغ) وَالسُّلْطَانِ عَبْدِ اللهِ أَوَّلِ الْإِسْلَامِ وَالسُّلْطَانِ عَلَاءِ الدِّينِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَحْيِنَا عَلَى السُّنَّةِ وَالشَّرِيعَةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh 'Abdil-Ma'muur al-Khathiib Tunggal (Datuk Ri Bandang) was-Sulthaan 'Abdillaah Awwalil-Islaam was-Sulthaan 'Alaa-iddiin syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa ahyinaa 'alas-sunnati wasy-syarii'ati wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdul Makmur Khatib Tunggal (Datuk Ri Bandang), Sultan Abdullah Awalul Islam, dan Sultan Alauddin Gowa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, hidupkanlah kami di atas sunnah dan syariat-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdul Makmur Khatib Tunggal (Datuk Ri Bandang), Sultan Abdullah Awalul Islam, dan Sultan Alauddin Gowa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, hidupkanlah kami di atas sunnah dan syariat-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '22 September / 9 Jumadil Awal (Peringatan Masuknya Islam di Gowa-Tallo) & Bulan Sya’ban (Ziarah Akbar Menjelang Ramadhan di Kompleks Makam Datuk Ri Bandang, Kelurahan Kaluku Bodoa, Kecamatan Tallo, Kota Makassar).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Makam Datuk Ri Bandang, serta menjaga ketenangan lingkungan permukiman warga Kaluku Bodoa.',
    facilities: ['Cungkup Cagar Budaya Makam Datuk Ri Bandang', 'Musholla & Pendopo Ziarah Jl. Sinassara Tallo', 'Dekat Kompleks Makam Raja-Raja Tallo', 'Area Parkir Peziarah Tallo Makassar'],
    openingHours: 'Buka Setiap Hari 07.00 – 21.00 WITA',
    references: [
      'Noorduyn, Jacobus (1956). De Islamisering van Makasar. Bijdragen tot de Taal-, Land- en Volkenkunde (BKI), 112.',
      'Sewang, Ahmad M. (2005). Islamisasi Kerajaan Gowa (Abad XVI sampai Abad XVII). Jakarta: Yayasan Obor Indonesia.',
      'Mattulada (1998). Sejarah, Masyarakat, dan Kebudayaan Sulawesi Selatan. Makassar: Hasanuddin University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datuk-patimang-luwu',
    legacyId: 'auliya-27',
    name: 'Makam Datuk Patimang / Datuk Sulaiman (Desa Patimang, Malangke, Luwu Utara)',
    title: 'Anggota Tiga Serangkai Dato’ Tallua Pengislam Kedatuan Luwu (Kerajaan Tertua di Sulawesi Selatan, 1605 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Datuk Patimang (Syekh Sulaiman / Khatib Sulaiman, wafat abad ke-17 M) di Desa Patimang, Kecamatan Malangke, Kabupaten Luwu Utara, Provinsi Sulawesi Selatan.',
    category: 'Auliya Nusantara',
    era: 'Awal Abad ke-17 M (Mengislamkan Datu Luwu pada 15 Ramadhan 1013 H / Februari 1605 M)',
    province: 'Sulawesi Selatan',
    city: 'Luwu Utara',
    district: 'Kec. Malangke',
    address: 'Desa Patimang, Kec. Malangke, Kabupaten Luwu Utara',
    location: {
      lat: -2.7945,
      lng: 120.3812,
      address: 'Desa Patimang, Kec. Malangke, Kabupaten Luwu Utara',
      district: 'Kec. Malangke',
      city: 'Luwu Utara',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Masjid_Tua_Palopo.JPG',
    imageSource: 'Wikimedia Commons — Masjid Tua Palopo (1604 M), Monumen Agung Islamisasi Kedatuan Luwu oleh Datuk Patimang (Khatib Sulaiman)',
    sanad:
      'Syekh Sulaiman yang bergelar Khatib Sulaiman dan Datuk Patimang; ulama besar asal Koto Tangah, Minangkabau (Sumatera Barat) lulusan Pesantren Giri Kedaton (Gresik) dan Kesultanan Aceh; pemimpin senior dari tiga serangkai Dato’ Tallua bersama Datuk Ri Bandang dan Datuk Ri Tiro.',
    karya: [
      'Pengislaman Payung/Datu Luwu ke-16 La Patiware Daeng Parabung yang bergelar Sultan Muhammad Wali Muzahiruddin pada 15 Ramadhan 1013 H / Februari 1605 M (raja pertama di Sulawesi Selatan yang resmi memeluk Islam)',
      'Pendekatan dakwah teologi Tauhid yang menyempurnakan konsep monoteisme kuno Bugis Luwu (Dewata SeuwaE) menuju kalimat Laa ilaaha illallaah',
      'Pembangunan Masjid Tua Palopo (1604 M) berbahan batu cadas dengan satu tiang utama (soko guru) kayu cinna gori',
    ],
    history:
      '**Syekh Sulaiman**—yang sangat dimuliakan oleh masyarakat Tana Luwu dan Sulawesi Selatan dengan gelar **Datuk Sulaiman** atau **Datuk Patimang** (hidup pada akhir abad ke-16 hingga paruh pertama abad ke-17 M)—adalah ulama pertama dari tiga serangkai **Dato’ Tallua** yang berhasil mengislamkan kerajaan tertua dan paling dihormati di Sulawesi Selatan, yakni **Kedatuan Luwu**. Ketika Datuk Sulaiman, Datuk Ri Bandang, dan Datuk Ri Tiro tiba di Teluk Bone dan Makassar pada tahun **1603 M**, para bangsawan setempat memberi tahu mereka bahwa menurut adat *Siri’ na Pacce* dan *Pangadereng*, seluruh kerajaan di Sulawesi Selatan memandang **Kedatuan Luwu di Malangke** sebagai *"kakak tua"* dan sumber kemuliaan bangsawan Bugis.\n\nOleh karena itu, ketiga ulama tersebut berlayar menuju pusat ibu kota Kedatuan Luwu di **Pattimang (Kecamatan Malangke, kini Kabupaten Luwu Utara)**. Di sana, **Datuk Sulaiman** berdialog secara mendalam dengan **Datu (Payung) Luwu ke-16, La Patiware Daeng Parabung**, beserta dewan adat *Bate Salapang*. Dengan penguasaan ilmu **Tauhid (Akidah)** yang bijaksana, Datuk Sulaiman menjelaskan bahwa keyakinan leluhur Luwu tentang *Dewata SeuwaE* (Tuhan Yang Maha Tunggal) menemukan kesempurnaan dan kemurnian hakikinya di dalam ajaran **Tauhid Islam (Laa ilaaha illallaah Muhammadur Rasulullah)**.\n\nPada tanggal **15 Ramadhan 1013 H (Februari 1605 M)**, Raja Luwu La Patiware Daeng Parabung resmi memeluk agama Islam dengan gelar **Sultan Muhammad Wali Muzahiruddin (Matinroe ri Ware)**, diikuti oleh seluruh rakyat Tana Luwu dan pembangunan **Masjid Tua Palopo (1604 M)**. Setelah Datuk Ri Bandang dan Datuk Ri Tiro berangkat ke Gowa-Tallo dan Bulukumba, Datuk Sulaiman tetap menetap membina keislaman Kedatuan Luwu hingga wafat dan dimakamkan di **Desa Patimang, Kecamatan Malangke, Kabupaten Luwu Utara**.',
    karomah: [
      'Dalam kajian antropolog Perancis Christian Pelras (*The Bugis*) dan arkeolog Dr. David Bulbeck serta tradisi lisan Tana Luwu, keistimewaan dakwah Datuk Patimang tampak dari keberhasilannya mengislamkan pusat peradaban besi dan keraton tertua *I La Galigo* di Malangke secara damai melalui dialog akidah yang sangat elegan.<!--more-->\n\nBangunan **Masjid Tua Palopo** yang didirikan pada masa dakwah Datuk Patimang (1604 M) memiliki dinding batu cadas setebal hampir 1 meter yang direkatkan dengan putih telur dan kapur, serta sebuah tiang tengah tunggal yang melambangkan ketunggalan Allah SWT (*Tauhid*).',
    ],
    untoldStory:
      'Nama kehormatan **Datuk Patimang** diambil dari nama ibu kota kuno Kedatuan Luwu, yakni **Desa Patimang di Kecamatan Malangke**, tempat beliau tinggal, mengajar, dan wafat. Di kawasan Kecamatan Malangke ini pula terletak **Makam Petta Matinroe ri Malangke (Sultan Abdullah, Raja Luwu ke-17)**.<!--more-->\n\nPeziarah yang melakukan perjalanan wisata religi di **Tana Luwu (Kota Palopo, Kabupaten Luwu, Luwu Utara, dan Luwu Timur)** dapat memulai ziarah dengan melaksanakan shalat di **Masjid Tua Palopo (1604 M)** dan Kompleks Makam Lokkoe di Kota Palopo, lalu menuju **Kompleks Cagar Budaya Makam Datuk Patimang** di Kecamatan Malangke, Kabupaten Luwu Utara.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Datuk Patimang (Syekh Sulaiman) di Malangke Luwu Utara umumnya bertawassul memohon kepada Allah SWT kemurnian akidah tauhid keluarga, kebijaksanaan dalam berdialog dan menyatukan masyarakat adat, serta keberkahan kemuliaan ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Sulaiman / Datuk Patimang (Malangke Luwu Utara)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ سُلَيْمَانَ المُلَقَّبِ بِدَاتُوكْ فَاتِيمَانْغ وَالسُّلْطَانِ مُحَمَّدْ وَلِيّ مُظَاهِرِ الدِّينِ وَأَوْلِيَاءِ لُووُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى كَلِمَةِ التَّوْحِيدِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ سُلَيْمَانَ المُلَقَّبِ بِدَاتُوكْ فَاتِيمَانْغ وَالسُّلْطَانِ مُحَمَّدْ وَلِيّ مُظَاهِرِ الدِّينِ وَأَوْلِيَاءِ لُووُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى كَلِمَةِ التَّوْحِيدِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh Sulaimaan al-mulaqqabi bi Datuk Patimang was-Sulthaan Muhammad Walii Muzhaahiriddiin wa Auliyaa-i Luwu syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbitnaa 'alaa kalimatit-tauhiidi wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Sulaiman yang bergelar Datuk Patimang, Sultan Muhammad Wali Muzahiruddin, beserta seluruh auliya di Tana Luwu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas kalimat tauhid, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Sulaiman yang bergelar Datuk Patimang, Sultan Muhammad Wali Muzahiruddin, beserta seluruh auliya di Tana Luwu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas kalimat tauhid, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15 Ramadhan (Mengenang Masuknya Islam di Kedatuan Luwu 1013 H / 1605 M) & 23 Januari (Ziarah Hari Perlawanan Rakyat Luwu di Kompleks Makam Datuk Patimang, Desa Patimang, Kecamatan Malangke, Kabupaten Luwu Utara).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Makam Datuk Patimang, serta menjaga kelestarian situs arkeologi Islam Malangke.',
    facilities: ['Cungkup Cagar Budaya Nasional Makam Datuk Patimang', 'Musholla & Pendopo Ziarah Desa Patimang', 'Taman Arkeologi Islam Malangke', 'Area Parkir Peziarah Kecamatan Malangke Luwu Utara'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Pelras, Christian (1996). The Bugis (Manusia Bugis). Oxford: Blackwell Publishers.',
      'Bulbeck, David & Caldwell, Ian (2000). Land of Iron: The Historical Archaeology of Luwu and the Cenrana Valley. Hull: University of Hull.',
      'Mattulada (1998). Sejarah, Masyarakat, dan Kebudayaan Sulawesi Selatan. Makassar: Hasanuddin University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datuk-ri-tiro',
    legacyId: 'auliya-28',
    name: 'Makam Datuk Ri Tiro / Abdul Jawad Khatib Bungsu (Ekatiro, Bontotiro, Kabupaten Bulukumba)',
    title: 'Anggota Tiga Serangkai Dato’ Tallua Penyebar Tasawuf Islam di Bulukumba, Bantaeng & Selayar (Awal Abad ke-17 M)',
    description:
      'Kompleks Cagar Budaya Makam Datuk Ri Tiro (Syekh Abdul Jawad Khatib Bungsu, wafat awal abad ke-17 M) di Kelurahan Ekatiro, Kecamatan Bontotiro, Kabupaten Bulukumba, Provinsi Sulawesi Selatan.',
    category: 'Auliya Nusantara',
    era: 'Awal Abad ke-17 M (Berdakwah di Tiro Bulukumba sejak sekitar 1604–1606 M)',
    province: 'Sulawesi Selatan',
    city: 'Bulukumba',
    district: 'Kec. Bontotiro',
    address: 'Kelurahan Ekatiro, Kec. Bontotiro, Kabupaten Bulukumba',
    location: {
      lat: -5.4812,
      lng: 120.4125,
      address: 'Kelurahan Ekatiro, Kec. Bontotiro, Kabupaten Bulukumba',
      district: 'Kec. Bontotiro',
      city: 'Bulukumba',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Raiyani_Muharramah_Annyorong_lopi_DSC_8826.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Budaya Bahari & Religi Kabupaten Bulukumba (Wilayah Dakwah Datuk Ri Tiro di Bontotiro)',
    sanad:
      'Syekh Abdul Jawad yang bergelar Khatib Bungsu dan Datuk Ri Tiro; ulama sufi asal Koto Tangah, Minangkabau (Sumatera Barat) lulusan Pesantren Giri Kedaton (Gresik) dan Kesultanan Aceh; anggota termuda dari tiga serangkai Dato’ Tallua bersama Datuk Patimang dan Datuk Ri Bandang.',
    karya: [
      'Pengislaman Raja Tiro La Unnyi (Karaeng Tiro) beserta Raja Bantaeng dan Raja Selayar pada awal abad ke-17 M melalui pendekatan tasawuf dan makrifatullah',
      'Pembinaan kearifan spiritual pembuat perahu Pinisi di pesisir Bulukumba (Bontobahari & Bontotiro)',
      'Peninggalan Situs Sumur Panjang Hila-Hila di Kecamatan Bontotiro',
    ],
    history:
      '**Syekh Abdul Jawad**—yang dikenal dengan gelar **Khatib Bungsu** karena merupakan yang termuda dari tiga serangkai *Dato’ Tallua*, serta digelari **Datuk Ri Tiro** karena berdakwah dan wafat di wilayah **Tiro, Kabupaten Bulukumba** (hidup pada akhir abad ke-16 hingga paruh pertama abad ke-17 M)—adalah waliyullah penyebar Islam di pesisir selatan Sulawesi Selatan. Dalam pembagian wilayah dakwah bersama dua saudaranya (**Datuk Patimang** di Luwu dan **Datuk Ri Bandang** di Gowa-Tallo), Syekh Abdul Jawad memilih wilayah **Tiro, Bira, Ara, Tanete (Bulukumba), Bantaeng, hingga Kepulauan Selayar**.\n\nPada masa itu, masyarakat dan para penguasa di wilayah Tiro terkenal sangat gemar mendalami ilmu kebatinan dan kesaktian. Menyikapi hal tersebut, **Datuk Ri Tiro** menggunakan pendekatan **Tasawuf (Hakikat dan Makrifatullah)**: beliau menunjukkan bahwa kesaktian tertinggi manusia tidak ada artinya di hadapan kemahakuasaan Allah SWT dan kebersihan jiwa seorang sufi yang berzikir. Melalui dialog ruhani yang mendalam, penguasa Kerajaan Tiro, **La Unnyi (Karaeng Tiro)**, beserta permaisuri dan seluruh rakyatnya mengucapkan dua kalimat syahadat sekitar tahun **1604–1606 M**, disusul oleh pengislaman **Raja Gantarang di Pulau Selayar (Sultan Pangali Patta Raja)**.\n\nDatuk Ri Tiro mengabdikan seluruh sisa usianya untuk mengajar Al-Qur’an, fikih, dan suluk tasawuf di semenanjung timur Bulukumba hingga wafat. Beliau dimakamkan di **Kelurahan Ekatiro, Kecamatan Bontotiro, Kabupaten Bulukumba**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Konjo–Bugis di Bulukumba, dikisahkan bahwa ketika Datuk Ri Tiro membutuhkan air tawar untuk berwudhu di perbukitan karang Bontotiro yang kering, beliau menggoreskan tongkatnya ke tanah hingga memancar mata air tawar yang jernih dan mengalir panjang membentuk **Permandian Alam Sumur Panjang Hila-Hila** yang tak pernah kering hingga hari ini.<!--more-->\n\nAjaran tasawuf Datuk Ri Tiro juga meresap ke dalam filosofi para maestro pembuat kapal **Pinisi** di Ara dan Tanah Beru (Bulukumba), di mana setiap tahapan pemotongan lunas kapal hingga peluncuran perahu ke laut (*Annyorong Lopi*) selalu diawali dengan doa, shalawat, dan zikir tauhid.',
    ],
    untoldStory:
      'Ketiga makam **Dato’ Tallua** membentuk segitiga emas ziarah wali di Sulawesi Selatan: **Datuk Patimang** di ujung utara Teluk Bone (Malangke, Luwu Utara), **Datuk Ri Bandang** di pesisir barat Selat Makassar (Tallo, Kota Makassar), dan **Datuk Ri Tiro** di ujung tenggara pertemuan Laut Flores dan Teluk Bone (Bontotiro, Kabupaten Bulukumba).<!--more-->\n\nPeziarah yang berkunjung ke destinasi wisata dunia **Tanjung Bira di Kabupaten Bulukumba** dapat menempuh perjalanan sekitar 25 menit ke arah utara menuju **Kecamatan Bontotiro** untuk berziarah ke **Kompleks Makam Datuk Ri Tiro** dan membasuh wajah di **Sumur Panjang Hila-Hila**.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Datuk Ri Tiro (Syekh Abdul Jawad Khatib Bungsu) di Bontotiro Bulukumba umumnya bertawassul memohon kepada Allah SWT kejernihan hati dalam mendalami ilmu tasawuf, kelancaran sumber penghidupan laksana mata air Hila-Hila, serta keselamatan bagi para pelaut.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Jawad Khatib Bungsu / Datuk Ri Tiro (Bontotiro Bulukumba)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْجَوَادِ الْخَطِيبِ الْبُونْغسُو (دَاتُوكْ رِي تِيرُو) وَالْمَلِكِ لَا أُونْيِي وَأَوْلِيَاءِ بُولُوكُومْبَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَطَهِّرْ قُلُوبَنَا بِمَعْرِفَتِكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ عَبْدِ الْجَوَادِ الْخَطِيبِ الْبُونْغسُو (دَاتُوكْ رِي تِيرُو) وَالْمَلِكِ لَا أُونْيِي وَأَوْلِيَاءِ بُولُوكُومْبَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَطَهِّرْ قُلُوبَنَا بِمَعْرِفَتِكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh 'Abdil-Jawaad al-Khathiib Bungsu (Datuk Ri Tiro) wal-Malik La Unnyi wa Auliyaa-i Bulukumba syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa thahhir quluubanaa bi ma'rifatika wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdul Jawad Khatib Bungsu (Datuk Ri Tiro), Karaeng Tiro La Unnyi, beserta seluruh auliya di Bulukumba, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, sucikanlah hati kami dengan makrifat kepada-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Abdul Jawad Khatib Bungsu (Datuk Ri Tiro), Karaeng Tiro La Unnyi, beserta seluruh auliya di Bulukumba, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, sucikanlah hati kami dengan makrifat kepada-Mu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban (Ziarah Akbar Menjelang Ramadhan) & Syawal (Puncak Ziarah Tahunan Masyarakat Bulukumba di Kompleks Makam Datuk Ri Tiro, Kelurahan Ekatiro, Kecamatan Bontotiro, Kabupaten Bulukumba).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Makam Datuk Ri Tiro, serta menjaga kemurnian akidah tauhid saat mengunjungi kawasan Sumur Panjang Hila-Hila.',
    facilities: ['Cungkup Cagar Budaya Makam Datuk Ri Tiro', 'Musholla & Pendopo Ziarah Ekatiro', 'Wisata Mata Air Sumur Panjang Hila-Hila Bontotiro', 'Area Parkir Luas Bus Peziarah Bontotiro Bulukumba'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Sewang, Ahmad M. (2005). Islamisasi Kerajaan Gowa (Abad XVI sampai Abad XVII). Jakarta: Yayasan Obor Indonesia.',
      'Mattulada (1998). Sejarah, Masyarakat, dan Kebudayaan Sulawesi Selatan. Makassar: Hasanuddin University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'pangeran-diponegoro-makassar',
    name: 'Makam Pahlawan Nasional Pangeran Diponegoro (Kelurahan Melayu Baru, Wajo, Kota Makassar)',
    title: 'Sultan Abdulhamid Herucokro Amirul Mukminin Panatagama Jawa, Panglima Agung Perang Jawa & Penulis Babad Diponegoro (1785–1855 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Pangeran Diponegoro (Bendara Pangeran Harya Dipanegara / Sultan Abdulhamid Herucokro, 11 November 1785 – 8 Januari 1855 M) beserta permaisuri Raden Ayu Retnaningsih dan keturunannya di Jl. Diponegoro, Kelurahan Melayu Baru, Kecamatan Wajo, Kota Makassar, Provinsi Sulawesi Selatan.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-18 – Pertengahan Abad ke-19 M (8 Muharram 1200 H / 11 November 1785 M – 19 Rabiul Akhir 1271 H / 8 Januari 1855 M)',
    province: 'Sulawesi Selatan',
    city: 'Makassar',
    district: 'Kec. Wajo',
    address: 'Jl. Diponegoro No. 50, Kel. Melayu Baru, Kec. Wajo, Kota Makassar',
    location: {
      lat: -5.1268,
      lng: 119.4092,
      address: 'Jl. Diponegoro No. 50, Kel. Melayu Baru, Kec. Wajo, Kota Makassar',
      district: 'Kec. Wajo',
      city: 'Makassar',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Grave_of_Diponegoro_in_Makassar.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Cagar Budaya Nasional Makam Pangeran Diponegoro di Kelurahan Melayu Baru, Kecamatan Wajo, Kota Makassar',
    sanad:
      'Bendara Raden Mas Mustahar / Ontowiryo (bergelar Bendara Pangeran Harya Dipanegara dan Sultan Abdulhamid Herucokro Kabirul Mukminin Sayidin Panatagama Khalifatullah Tanah Jawa), putra sulung Sultan Hamengkubuwono III Yogyakarta; dididik sejak kecil oleh buyutnya yang sangat alim Ratu Ageng Tegalrejo (permaisuri HB I), berguru fikih dan tasawuf Syattariyah/Naqsyabandiyah kepada Kyai Taftazani, Kyai Baidowi Bagelen, dan Kyai Mojo.',
    karya: [
      'Kepemimpinan jihad akbar Perang Jawa (1825–1830 M) bersama ratusan kiai, habaib, dan santri yang mengguncang fondasi keuangan kolonial Hindia Belanda',
      'Penulisan naskah otobiografi monumental Babad Diponegoro (diakui oleh UNESCO sebagai Memory of the World pada tahun 2013) selama masa pengasingan di Manado (1831–1832 M)',
      'Penulisan naskah tasawuf dan sejarah Islam Makasar (Hikayat Tanah Jawa & Arkanul Islam) selama 22 tahun masa pengasingan di Benteng Rotterdam Makassar (1833–1855 M)',
    ],
    history:
      '**Pangeran Diponegoro**—yang lahir di Keraton Yogyakarta menjelang fajar tanggal **8 Muharram 1200 H (11 November 1785 M)** dengan nama kecil **Bendara Raden Mas Mustahar (Ontowiryo)** dan wafat dalam pengasingan di Makassar pada **19 Rabiul Akhir 1271 H (8 Januari 1855 M)**; ditetapkan sebagai **Pahlawan Nasional RI** melalui **SK Presiden No. 087/TK/1973 tanggal 6 November 1973**—adalah seorang pangeran-ulama sufi yang memimpin perang antikolonial terbesar dalam sejarah Nusantara (**Perang Jawa, 1825–1830 M**). Sejak usia 7 tahun, beliau diasuh di luar tembok keraton oleh nenek buyutnya yang sangat taat beragama, **Kanjeng Ratu Ageng Tegalrejo**, di lingkungan pesantren Tegalrejo. Berbeda dengan bangsawan istana yang terpengaruh gaya hidup Eropa, Pangeran Diponegoro tumbuh sebagai seorang santri pengamal *Thariqah Syattariyah* dan *Naqsyabandiyah* yang gemar berkhalwat di Goa Selarong dan Goa Secang serta mendalami kitab-kitab fikih (*Muharrar*, *Taqrib*), tafsir, dan tasawuf (*Tuhfah*).\n\nKetika pemerintah kolonial Belanda merusak tatanan moral keraton, mencekik rakyat dengan pajak tol (*bandar*), dan memasang patok jalan melintasi makam leluhurnya di Tegalrejo pada **20 Juli 1825 M**, Pangeran Diponegoro mengibarkan bendera perang sabil dengan gelar **Sultan Abdulhamid Herucokro Amirul Mukminin Sayidin Panatagama**. Didukung oleh lebih dari 112 kiai pesantren dan habaib (termasuk **Kyai Mojo**, **Kyai Hasan Besari**, dan panglima muda **Sentot Alibasyah**), beliau memimpin perang gerilya selama lima tahun hingga Jenderal De Kock menangkap beliau secara licik saat perundingan di hari raya Idul Fitri di Magelang pada **28 Maret 1830 M**.\n\nBelanda mengasingkan Pangeran Diponegoro mula-mula ke **Manado (1830–1833 M)**—di mana beliau menulis mahakarya **Babad Diponegoro** yang kini diakui sebagai *Memory of the World UNESCO*—kemudian dipindahkan secara rahasia ke **Benteng Fort Rotterdam, Makassar** pada **11 Juli 1833 M**. Selama **22 tahun di Benteng Rotterdam Makassar (1833–1855 M)**, sang Pangeran tetap teguh menjaga shalat lima waktu, berzikir, dan menulis kitab tasawuf untuk putra-putrinya hingga wafat pada usia 69 tahun, **8 Januari 1855 M**. Atas wasiat beliau sendiri, jenazahnya dimakamkan di **Kampung Melayu (kini Jl. Diponegoro, Kelurahan Melayu Baru, Kecamatan Wajo, Kota Makassar)**.',
    karomah: [
      'Dalam mahakarya sejarawan Oxford Prof. Peter Carey (*Kuasa Ramalan: Pangeran Diponegoro dan Akhir Tatanan Lama di Jawa, 1785–1855*), terungkap bahwa Pangeran Diponegoro sesungguhnya adalah seorang wali sufi yang sangat menjaga kesucian wudhu, wirid *Ratib Samman/Haddad*, dan zikir *Thariqah Syattariyah*: di dalam kamar tahanan sempit di Benteng Rotterdam Makassar, masih tersimpan sajadah dan jubah putih yang beliau gunakan bermunajat setiap sepertiga malam terakhir selama lebih dari dua dekade tanpa pernah menyerah kepada Belanda.<!--more-->\n\nDi Kompleks Makam Pangeran Diponegoro di Kelurahan Melayu Baru (Makassar), bersemayam pula permaisuri setia yang mendampingi beliau di medan perang dan pengasingan, **Raden Ayu Retnaningsih** (wafat 1885 M), beserta putra-putra beliau (**Raden Mas Rahmat / Pangeran Diponingrat**, **Raden Mas Abdurrahman**, dsb.) yang keturunannya tetap menjaga kompleks makam hingga generasi kelima.',
    ],
    untoldStory:
      'Sebelum wafat di Makassar pada 8 Januari 1855 M, Pangeran Diponegoro mewariskan dua buku catatan tangan berisi ajaran tasawuf, zikir *Naqsyabandiyah–Syattariyah*, dan nasihat akhlak Islam kepada putra-putrinya yang kini disimpan di Museum Nasional dan diteliti oleh para filolog dunia.<!--more-->\n\nPeziarah yang berkunjung ke Kota Makassar dapat melakukan napak tilas lengkap perjuangan beliau: mengunjungi ruang tahanan dan musholla Pangeran Diponegoro di **Benteng Fort Rotterdam**, lalu berziarah ke **Kompleks Makam Pangeran Diponegoro** di Jl. Diponegoro, Kecamatan Wajo yang hanya berjarak sekitar 1,5 kilometer dari benteng.',
    barokahHajat:
      'Peziarah dari seluruh Indonesia yang berziarah ke maqbarah Pangeran Diponegoro di Kota Makassar umumnya bertawassul memohon kepada Allah SWT keteguhan prinsip iman dan kehormatan diri yang tak tergoyahkan oleh penindasan, kesabaran dalam menghadapi ujian panjang, serta semangat perjuangan membela bangsa dan agama.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pangeran Diponegoro / Sultan Abdulhamid Herucokro (Makassar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ عَبْدِ الْحَمِيدِ هِيرُوتْشُوكْرُو (فَانْغِيرَانْ دِيفُونَاغُورُو) وَزَوْجَتِهِ رَاتْنَانِينْغسِيهْ وَأَوْلَادِهِ وَجُنُودِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَصَبْرَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ عَبْدِ الْحَمِيدِ هِيرُوتْشُوكْرُو (فَانْغِيرَانْ دِيفُونَاغُورُو) وَزَوْجَتِهِ رَاتْنَانِينْغسِيهْ وَأَوْلَادِهِ وَجُنُودِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَصَبْرَهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahidi fii sabiilillaah 'Abdil-Hamiid Herucokro (Pangeran Diponegoro) wa zaujatihii Retnaningsih wa aulaadihii wa junuudihii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum wa shabrahum wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang di jalan Allah Sultan Abdulhamid Herucokro (Pangeran Diponegoro), permaisuri beliau Raden Ayu Retnaningsih, beserta putra-putri dan prajurit jihad beliau, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad dan kesabaran mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan pejuang di jalan Allah Sultan Abdulhamid Herucokro (Pangeran Diponegoro), permaisuri beliau Raden Ayu Retnaningsih, beserta putra-putri dan prajurit jihad beliau, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad dan kesabaran mereka, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '8 Januari (Haul Wafatnya Pangeran Diponegoro), 11 November (Milad Pangeran Diponegoro & Hari Pahlawan), & 1 Muharram di Kompleks Makam Pangeran Diponegoro, Kelurahan Melayu Baru, Kecamatan Wajo, Kota Makassar.',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki pendopo dan area makam Pangeran Diponegoro, serta menjaga ketenangan dan kebersihan cagar budaya nasional.',
    facilities: ['Kompleks Cagar Budaya Nasional Makam Pangeran Diponegoro & RA. Retnaningsih', 'Pendopo & Galeri Silsilah Keluarga Diponegoro Makassar', 'Musholla & Tempat Wudhu', 'Area Parkir Peziarah Jl. Diponegoro Kecamatan Wajo Makassar'],
    openingHours: 'Buka Setiap Hari 08.00 – 17.30 WITA',
    references: [
      'Carey, Peter (2012). Kuasa Ramalan: Pangeran Diponegoro dan Akhir Tatanan Lama di Jawa, 1785–1855 (3 Jilid). Jakarta: Kepustakaan Populer Gramedia.',
      'Yamin, Muhammad (1950). Sedjarah Peperangan Dipanegara: Pahlawan Kemerdekaan Indonesia. Jakarta: Pembangunan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'agh-muhammad-asad-sengkang',
    legacyId: 'ulama-39',
    name: "Makam Anregurutta KH. Muhammad As'ad Al-Bugisi (Sengkang, Tempe, Kabupaten Wajo)",
    title: "AGH. Muhammad As'ad (Maha Guru Ulama Bugis-Makassar & Pendiri Pondok Pesantren As'adiyah Sengkang, 1907–1952 M)",
    description:
      "Kompleks Pemakaman Islam Jami' Sengkang / Masjid Jami' Sengkang, tempat peristirahatan Al-Allamah Anregurutta KH. Muhammad As'ad bin Abdul Rasyid Al-Bugisi (1907–1952 M, pendiri Madrasah Arabiyah Islamiyah / Pondok Pesantren As'adiyah Sengkang) di Kecamatan Tempe, Kota Sengkang, Kabupaten Wajo, Provinsi Sulawesi Selatan.",
    category: 'Ulama Nusantara',
    era: 'Paruh Pertama Abad ke-20 M (12 Rabiul Akhir 1326 H / 1907 M – 12 Rabiul Akhir 1372 H / 29 Desember 1952 M)',
    province: 'Sulawesi Selatan',
    city: 'Wajo',
    district: 'Kec. Tempe',
    address: 'Kompleks Masjid Jami’ Sengkang / Pemakaman Islam Jami’, Kec. Tempe, Kota Sengkang, Kabupaten Wajo',
    location: {
      lat: -4.1285,
      lng: 120.0312,
      address: 'Kompleks Masjid Jami’ Sengkang / Pemakaman Islam Jami’, Kec. Tempe, Kota Sengkang, Kabupaten Wajo',
      district: 'Kec. Tempe',
      city: 'Wajo',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Saoraja_La_Tenri_Bali.jpg',
    imageSource: "Wikimedia Commons — Khazanah Sejarah Kota Santri Sengkang, Kabupaten Wajo (Pusat Pondok Pesantren As'adiyah Sengkang Warisan AGH. Muhammad As'ad)",
    sanad:
      "Al-Allamah Anregurutta KH. Muhammad As'ad bin Syekh Abdul Rasyid bin Syekh Muhammad Arsyad Al-Bugisi; lahir dan tumbuh di Makkah Al-Mukarramah, hafal Al-Qur'an usia 7 tahun, lulusan Madrasah Al-Falah Makkah dan pengajar di Masjidil Haram berguru kepada Sayyid Abbas Al-Maliki, Syaikh Umar Hamdan Al-Mahrisi, Syaikh Hasan Al-Yamani, dan Syaikh Ambo Wellang; maha guru dari AGH. Abdurrahman Ambo Dalle, AGH. Daud Ismail, AGH. Muhammad Yunus Martan, dan AGH. Abduh Pabbajah.",
    karya: [
      "Pendirian Madrasah Arabiyah Islamiyah (MAI) Sengkang pada bulan Mei 1930 M (yang setelah wafatnya diabadikan menjadi Pondok Pesantren As'adiyah Sengkang, pesantren tertua dan terbesar di Sulawesi Selatan)",
      'Penulisan puluhan kitab berbahasa Arab dan Bugis (Lontara): Al-Kawkab al-Munir fi Ushul at-Tafsir, Sullamul Aqidah, Nibrasul Abrar, Az-Zuhrah fi ’Ilm al-Faraidh, dan Nazham Al-Wasilah',
      'Peletakan tradisi keulamaan "Anregurutta" dan sistem pengajian halaqah Masjid Jami’ Sengkang yang melahirkan ratusan cabang madrasah di Indonesia Timur',
    ],
    history:
      "**Al-Allamah Anregurutta KH. Muhammad As'ad bin Abdul Rasyid Al-Bugisi**—yang sangat dihormati di seluruh Sulawesi dengan panggilan **Anregurutta Puang Haji Sade'** (lahir di **Makkah Al-Mukarramah** pada hari Senin, **12 Rabiul Akhir 1326 H / 1907 M** dan wafat di Sengkang pada hari Senin, **12 Rabiul Akhir 1372 H / 29 Desember 1952 M** dalam usia 45 tahun Masehi / 46 tahun Hijriah)—adalah *Maha Guru* (*Anregurutta*) yang memelopori lahirnya jaringan pondok pesantren modern dan salafiyah di Sulawesi Selatan. Kedua orang tua beliau (**Syekh H. Abdul Rasyid** dan **Hj. Siti Saleha**) adalah ulama keturunan bangsawan Bugis Wajo yang bermukim di Makkah. Sejak usia 7 tahun, Muhammad As'ad kecil telah khatam menghafal 30 juz Al-Qur'an, menamatkan Madrasah Al-Falah Makkah, dan diangkat menjadi pengajar di halaqah **Masjidil Haram**.\n\nPada tahun **1928 M**, beliau memutuskan pulang ke tanah leluhurnya di **Sengkang, Kabupaten Wajo, Sulawesi Selatan**. Mula-mula beliau membuka pengajian sistem *halaqah* (*mangaji tudang*) di kediamannya dan di **Masjid Jami' Sengkang**. Pada bulan **Mei 1930 M**, dengan dukungan Arung Matoa Wajo (**La Oddangpero**), beliau meresmikan **Madrasah Arabiyah Islamiyah (MAI) Sengkang**.\n\nMelalui MAI Sengkang, Anregurutta KH. Muhammad As'ad mendidik kader-kader ulama besar Sulawesi Selatan generasi pertama: di antaranya **AGH. Abdurrahman Ambo Dalle** (pendiri DDI Mangkoso), **AGH. Daud Ismail** (pendiri Yasrib Soppeng), **AGH. Muhammad Yunus Martan**, dan **AGH. Amberi Said**. Ketika beliau wafat tepat pada tanggal kelahirannya (**12 Rabiul Akhir 1372 H / 29 Desember 1952 M**), nama MAI Sengkang diubah menjadi **Pondok Pesantren As'adiyah Sengkang** untuk mengabadikan nama dan berkah perjuangan beliau.",
    karomah: [
      'Dalam kajian sejarah pendidikan Islam Sulawesi Selatan (Prof. Ismail Suardi Wekke dan Dr. Ahmad M. Sewang) serta manaqib *Anregurutta*, keistimewaan nyata KH. Muhammad As’ad tampak dari kecerdasan luar biasa dan keberkahan umurnya yang meski relatif singkat (wafat usia 45 tahun), namun berhasil mencetak hampir seluruh ulama besar (*Anregurutta*) di Sulawesi Selatan, Sulawesi Barat, Sulawesi Tengah, Sulawesi Tenggara, hingga Kalimantan Timur.<!--more-->\n\nDi samping itu, tanggal kelahiran dan tanggal wafat beliau jatuh pada hari dan tanggal Hijriah yang persis sama, yakni **hari Senin, 12 Rabiul Akhir** (1326 H – 1372 H), sebuah tanda kemuliaan yang dikenang dengan penuh takzim oleh para santri As’adiyah.',
    ],
    untoldStory:
      'Gelar kehormatan tertinggi bagi ulama besar di tanah Bugis-Makassar, yakni **Anregurutta (AGH.)** yang berarti *"Guru Utama / Maha Guru Kami"*, mencapai bentuk kelembagaannya melalui tradisi keilmuan yang dibangun oleh **AGH. Muhammad As’ad** di Sengkang, Kabupaten Wajo.<!--more-->\n\nDi Kota Sengkang (Kecamatan Tempe, Kabupaten Wajo), peziarah dapat mengunjungi **Masjid Jami’ Sengkang** (tempat halaqah bersejarah beliau sejak 1930 M), kampus pusat **Pondok Pesantren As’adiyah**, serta berziarah ke **Makam Anregurutta KH. Muhammad As’ad**.',
    barokahHajat:
      'Peziarah, santri penghafal Al-Qur’an, dan pendidik yang berziarah ke maqbarah Anregurutta KH. Muhammad As’ad di Sengkang Kabupaten Wajo umumnya bertawassul memohon kepada Allah SWT kekuatan hafalan Al-Qur’an dan hadis sejak usia dini, keberkahan umur yang sangat produktif melahirkan murid-murid alim, serta kefahaman kitab kuning.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Anregurutta KH. Muhammad As’ad Al-Bugisi (Sengkang Wajo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الحَافِظِ الشَّيْخِ مُحَمَّدْ أَسْعَدْ بْنِ عَبْدِ الرَّشِيدِ الْبُوقِسِيِّ مُؤَسِّسِ الْمَعْهَدِ الْأَسْعَدِيَّةِ وَمَشَايِخِ سِينْغكَانْغ وَاجُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَعْمَارِنَا وَعُلُومِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الحَافِظِ الشَّيْخِ مُحَمَّدْ أَسْعَدْ بْنِ عَبْدِ الرَّشِيدِ الْبُوقِسِيِّ مُؤَسِّسِ الْمَعْهَدِ الْأَسْعَدِيَّةِ وَمَشَايِخِ سِينْغكَانْغ وَاجُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ فِي أَعْمَارِنَا وَعُلُومِنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatil-Haafizh asy-Syaikh Muhammad As'ad bin 'Abdir-Rasyiid al-Buuqisii mu-assisi al-Ma'hadil-As'adiyyah wa Masyaayikhi Sengkang Wajo syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik fii a'maarinaa wa 'uluuminaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-hafizh Anregurutta KH. Muhammad As’ad bin Abdul Rasyid Al-Bugisi pendiri Pondok Pesantren As’adiyah beserta seluruh masyayikh Sengkang Wajo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah umur dan ilmu kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah al-hafizh Anregurutta KH. Muhammad As’ad bin Abdul Rasyid Al-Bugisi pendiri Pondok Pesantren As’adiyah beserta seluruh masyayikh Sengkang Wajo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah umur dan ilmu kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Akhir / 29 Desember (Puncak Haul Akbar Anregurutta KH. Muhammad As’ad Al-Bugisi & Milad Pondok Pesantren As’adiyah di Kota Sengkang, Kecamatan Tempe, Kabupaten Wajo).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat (laki-laki dianjurkan memakai peci/songkok Bugis dan sarung), menjaga ketertiban area Masjid Jami’ Sengkang dan makam Anregurutta, serta memuliakan para santri dan masyayikh As’adiyah.',
    facilities: ['Kompleks Makam Anregurutta KH. Muhammad As’ad Sengkang', 'Masjid Jami’ Bersejarah Sengkang (1930 M)', 'Kampus Utama Pondok Pesantren As’adiyah Sengkang', 'Area Parkir Luas Bus Peziarah Kecamatan Tempe Wajo'],
    openingHours: 'Buka Setiap Hari 06.00 – 22.00 WITA',
    references: [
      'Wekke, Ismail Suardi (2013). Tradisi Pendidikan Islam di Sulawesi Selatan: Studi tentang Anregurutta Haji Muhammad As’ad dan Pesantren As’adiyah. Jurnal Miqot.',
      'Rijal, Syamsul (2019). Biografi dan Jaringan Keilmuan Anregurutta KH. Muhammad As’ad Al-Bugisi. Makassar: Alauddin University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'agh-abdurrahman-ambo-dalle-barru',
    name: 'Makam Anregurutta KH. Abdurrahman Ambo Dalle (Mangkoso, Soppeng Riaja, Kabupaten Barru)',
    title: 'Ulama Besar Bugis-Makassar, Pendiri Darud Da’wah wal Irsyad (DDI) & Pengarang Kitab Risalah Ahlussunnah wal Jama’ah (1900–1996 M)',
    description:
      'Kompleks Maqbarah Kampus II Pondok Pesantren Darud Da’wah wal Irsyad (DDI) Mangkoso, tempat peristirahatan Al-Allamah Anregurutta Prof. KH. Abdurrahman Ambo Dalle (1900 – 29 November 1996 M) di Kelurahan Mangkoso, Kecamatan Soppeng Riaja, Kabupaten Barru, Provinsi Sulawesi Selatan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1900 – 18 Rajab 1417 H / 29 November 1996 M)',
    province: 'Sulawesi Selatan',
    city: 'Barru',
    district: 'Kec. Soppeng Riaja',
    address: 'Kampus II Pondok Pesantren DDI Mangkoso (Bulu Lampoko), Kel. Mangkoso, Kec. Soppeng Riaja, Kabupaten Barru',
    location: {
      lat: -4.2415,
      lng: 119.6285,
      address: 'Kampus II Pondok Pesantren DDI Mangkoso (Bulu Lampoko), Kel. Mangkoso, Kec. Soppeng Riaja, Kabupaten Barru',
      district: 'Kec. Soppeng Riaja',
      city: 'Barru',
      province: 'Sulawesi Selatan',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Saoraja_La_Tenri_Bali.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Bugis Sulawesi Selatan (Basis Perjuangan Anregurutta KH. Abdurrahman Ambo Dalle & DDI Mangkoso di Barru)',
    sanad:
      'Al-Allamah Anregurutta KH. Abdurrahman Ambo Dalle bin Puang Ngati Daeng Patobo; murid utama dan asisten pertama Anregurutta KH. Muhammad As’ad di MAI Sengkang Wajo (1930–1935 M), kemudian bermukim di Makkah Al-Mukarramah berguru kepada Sayyid Abbas Al-Maliki, Syaikh Umar Hamdan, dan Syaikh Ahmad Al-Fathani.',
    karya: [
      'Pendirian Madrasah Arabiyah Islamiyah (MAI) Mangkoso pada 21 Desember 1938 M dan organisasi besar Darud Da’wah wal Irsyad (DDI) di Watang Soppeng pada 7 Februari 1947 M (16 Rabiul Awal 1366 H)',
      'Penulisan kitab-kitab rujukan berbahasa Arab dan Bugis: Risalah Bahagian I’tiqad Ahlussunnah wal Jama’ah, Al-Qaulush Shadiq fi Ma’rifatil Khaliq, Mursyiduth Thullab (syarah nazham nahwu-sharaf), dan Hilyatus Syabab',
    ],
    history:
      '**Al-Allamah Anregurutta KH. Abdurrahman Ambo Dalle** (lahir di Desa UjungE, Tanasitolo, Kabupaten Wajo sekitar tahun **1900 M** dan wafat di Makassar pada hari Jumat, **18 Rajab 1417 H / 29 November 1996 M** dalam usia 96 tahun)—adalah ulama kharismatik terbesar di Sulawesi Selatan pada paruh kedua abad ke-20 M sekaligus pendiri organisasi pendidikan dan dakwah Islam terbesar di Sulawesi Selatan, **Darud Da’wah wal Irsyad (DDI)**. Sejak usia 7 tahun beliau telah khatam menghafal Al-Qur’an. Ketika **Anregurutta KH. Muhammad As’ad** mendirikan MAI Sengkang pada tahun 1930 M, Ambo Dalle menjadi murid paling cemerlang sekaligus asisten utama sang maha guru sebelum keduanya berangkat menunaikan ibadah haji dan memperdalam ilmu di **Makkah Al-Mukarramah** pada tahun 1935 M.\n\nPada akhir tahun **1938 M**, atas permohonan Raja Soppeng Riaja (**Andi Muhammad Tahir Petta Lolo**), Anregurutta Ambo Dalle hijrah ke **Mangkoso, Kecamatan Soppeng Riaja, Kabupaten Barru** dan mendirikan **MAI Mangkoso pada tanggal 21 Desember 1938 M**. Selanjutnya, dalam musyawarah besar ulama Ahlussunnah wal Jama’ah Sulawesi Selatan di Watang Soppeng pada tanggal **16 Rabiul Awal 1366 H (7 Februari 1947 M)**, beliau bersama para ulama mendirikan **Darud Da’wah wal Irsyad (DDI)** yang menyatukan ratusan madrasah dan pesantren dari Sulawesi Selatan, Sulawesi Barat, Sulawesi Tengah, hingga Kalimantan Timur.\n\nSelama hampir satu abad usianya, Gurutta Ambo Dalle membimbing umat melewati masa kolonial, masa pergolakan DI/TII di hutan Sulawesi (di mana beliau tetap menulis kitab-kitab syarah di tengah hutan), hingga masa pembangunan. Beliau wafat pada hari Jumat, **29 November 1996 M** dan dimakamkan di **Kompleks Kampus II Pondok Pesantren DDI Mangkoso (Bulu Lampoko), Kecamatan Soppeng Riaja, Kabupaten Barru**.',
    karomah: [
      'Dalam kesaksian para ulama Sulawesi Selatan dan murid-murid beliau (termasuk Prof. Dr. KH. Ali Yafie dan AGH. Faried Wadjedy), karomah keilmuan Anregurutta Ambo Dalle terlihat ketika beliau ditawan di tengah hutan selama 8 tahun (1955–1963 M) pada masa pergolakan Sulawesi Selatan: tanpa perpustakaan sama sekali, beliau sanggup menulis kitab-kitab syarah bahasa Arab dan Bugis yang sangat tebal murni mengandalkan kekuatan hafalan di luar kepala.<!--more-->\n\nBeliau wafat pada hari yang sangat mulia, yakni **hari Jumat, 18 Rajab 1417 H**, dan kepergiannya ditangisi oleh ratusan ribu warga Sulawesi Selatan yang berbaris sepanjang lebih dari 100 kilometer dari Makassar menuju Mangkoso, Kabupaten Barru.',
    ],
    untoldStory:
      'Hubungan adab antara murid (**AGH. Abdurrahman Ambo Dalle**) dan gurunya (**AGH. Muhammad As’ad Sengkang**) menjadi teladan abadi di pesantren-pesantren Bugis: meskipun DDI telah berkembang memiliki ratusan cabang madrasah, Gurutta Ambo Dalle tetap merendahkan diri dan menziarahi makam gurunya di Sengkang dengan penuh takzim.<!--more-->\n\nLokasi **Makam Anregurutta KH. Abdurrahman Ambo Dalle di Mangkoso (Kabupaten Barru)** terletak sangat strategis di jalur poros utama Trans Sulawesi **Makassar–Parepare**, sehingga setiap rombongan peziarah dan santri yang melintasi Kabupaten Barru selalu singgah berziarah di Kampus DDI Mangkoso.',
    barokahHajat:
      'Peziarah, santri, dan akademisi yang berziarah ke maqbarah Anregurutta KH. Abdurrahman Ambo Dalle di DDI Mangkoso Kabupaten Barru umumnya bertawassul memohon kepada Allah SWT kekuatan hafalan ilmu di luar kepala, ketabahan menghadapi fitnah zaman dengan tetap berkarya, serta kemuliaan wafat di hari Jumat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Anregurutta KH. Abdurrahman Ambo Dalle (DDI Mangkoso Barru)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ عَبْدِ الرَّحْمٰنِ أَمْبُو دَالِّي مُؤَسِّسِ دَارِ الدَّعْوَةِ وَالْإِرْشَادِ وَمَشَايِخِ مَانْغكُوسُو بَارُّو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى عَقِيدَةِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ عَبْدِ الرَّحْمٰنِ أَمْبُو دَالِّي مُؤَسِّسِ دَارِ الدَّعْوَةِ وَالْإِرْشَادِ وَمَشَايِخِ مَانْغكُوسُو بَارُّو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى عَقِيدَةِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah asy-Syaikh 'Abdir-Rahmaan Ambo Dalle mu-assisi Daarid-Da'wati wal-Irsyaad wa Masyaayikhi Mangkoso Barru syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbitnaa 'alaa 'aqiidati Ahlis-Sunnati wal-Jamaa'ati wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah Anregurutta KH. Abdurrahman Ambo Dalle pendiri Darud Da’wah wal Irsyad (DDI) beserta seluruh masyayikh Mangkoso Barru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas akidah Ahlussunnah wal Jama’ah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah Anregurutta KH. Abdurrahman Ambo Dalle pendiri Darud Da’wah wal Irsyad (DDI) beserta seluruh masyayikh Mangkoso Barru, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas akidah Ahlussunnah wal Jama’ah, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '18 Rajab / 29 November (Haul Wafatnya Anregurutta KH. Abdurrahman Ambo Dalle) & Bulan Syawal (Silaturahmi & Haul Akbar Keluarga Besar DDI di Kampus Pondok Pesantren DDI Mangkoso, Kecamatan Soppeng Riaja, Kabupaten Barru).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam Gurutta Ambo Dalle di Kampus Bulu Lampoko DDI Mangkoso, serta menjaga ketenangan kegiatan belajar-mengajar santri.',
    facilities: ['Cungkup Utama Maqbarah Anregurutta KH. Abdurrahman Ambo Dalle', 'Masjid & Kampus Pondok Pesantren DDI Mangkoso', 'Perpustakaan & Galeri Karya Gurutta Ambo Dalle', 'Area Parkir Luas Bus Wisata Religi Soppeng Riaja Barru'],
    openingHours: 'Buka Setiap Hari 06.00 – 22.00 WITA',
    references: [
      'Abduh, Muhammad, dkk. (1997). Biografi dan Perjuangan Anregurutta KH. Abdurrahman Ambo Dalle. Ujung Pandang: Pengurus Besar DDI.',
      'Halim, Wahyuddin (2015). As’adiyah Traditions and the Transformation of Islamic Education in South Sulawesi. Canberra: Australian National University.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 7. PROVINSI SULAWESI BARAT (TANAH MANDAR / MALAQBIQ)
  // =========================================================================
  {
    id: 'imam-lapeo-polewali-mandar',
    name: 'Makam KH. Muhammad Thahir / Imam Lapeo (Desa Lapeo, Campalagian, Polewali Mandar)',
    title: 'Waliyullah Agung Tanah Mandar ("Tosalamaq Imam Lapeo"), Murid Syaikhona Kholil & Pendiri Masjid Nurut Taubah (1839–1952 M)',
    description:
      'Kompleks Kubah Makam KH. Muhammad Thahir (Imam Lapeo, 1839 – 17 Juni 1952 M / 24 Ramadhan 1371 H) di halaman Masjid Jami’ Nurut Taubah, Desa Lapeo, Kecamatan Campalagian, Kabupaten Polewali Mandar, Provinsi Sulawesi Barat.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Pertengahan Abad ke-20 M (1839 – 24 Ramadhan 1371 H / 17 Juni 1952 M)',
    province: 'Sulawesi Barat',
    city: 'Polewali Mandar',
    district: 'Kec. Campalagian',
    address: 'Kompleks Masjid Jami’ Nurut Taubah, Jl. Poros Majene–Mamuju, Desa Lapeo, Kec. Campalagian, Kabupaten Polewali Mandar',
    location: {
      lat: -3.4472,
      lng: 119.1245,
      address: 'Kompleks Masjid Jami’ Nurut Taubah, Jl. Poros Majene–Mamuju, Desa Lapeo, Kec. Campalagian, Kabupaten Polewali Mandar',
      district: 'Kec. Campalagian',
      city: 'Polewali Mandar',
      province: 'Sulawesi Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Waliyullah Sulawesi (Kompleks Masjid Nurut Taubah & Kubah Makam KH. Muhammad Thahir / Imam Lapeo di Polewali Mandar)',
    sanad:
      'KH. Muhammad Thahir bin H. Muhammad bin H. Abdul Karim Al-Mandari (nama kecil Junna ’Ida / Kanna Ippa, bergelar Imam Lapeo dan Tosalamaq); berguru kepada ulama Yaman Al-Habib Alwi bin Abdullah bin Sahil Jamalullail (penghulu Pambusuang yang menjadi mertua beliau), lalu menuntut ilmu di Padang (Sumatera Barat), Makkah Al-Mukarramah, hingga ke Istanbul (Turki) dan menerima ijazah Thariqah Syadziliyah serta Naqsyabandiyah.',
    karya: [
      'Pembangunan Masjid Jami’ Nurut Taubah Lapeo (Campalagian, Polewali Mandar) dan puluhan masjid perintis di pesisir hingga pegunungan Tanah Mandar',
      'Pengislaman dan pembinaan akhlak masyarakat di pelosok Sulawesi Barat (Mamasa, Pitu Ulunna Salu, hingga Mamuju) dengan pendekatan kasih sayang',
      'Penulisan risalah doa, barzanji bahasa Mandar, serta bimbingan riyadhah Thariqah Syadziliyah di Mandar',
    ],
    history:
      '**KH. Muhammad Thahir**—yang sangat dicintai dan dimuliakan oleh seluruh masyarakat Mandar dengan gelar **Imam Lapeo** atau **Tosalamaq Imam Lapeo** (lahir di Pambusuang, Balanipa, Mandar sekitar tahun **1839 M** dengan nama kecil **Junna ’Ida** dan wafat di Lapeo pada malam Selasa, **24 Ramadhan 1371 H / 17 Juni 1952 M** dalam usia sekitar **113 tahun**)—adalah *waliyullah* paling masyhur di **Provinsi Sulawesi Barat**. Ayahandanya (**H. Muhammad**) adalah seorang guru mengaji dan pelaut tangguh di Pambusuang. Sejak muda, Muhammad Thahir berguru kepada ulama besar asal Hadramaut yang berdakwah di Pambusuang, **Al-Habib Alwi bin Abdullah bin Sahil Jamalullail**, yang sangat mencintai keshalihan pemuda Thahir hingga menikahkannya dengan putrinya (**Syarifah Rugayyah**).\n\nUntuk memperdalam ilmu syariat dan hakikat, KH. Muhammad Thahir mengembara ke **Sumatera Barat (Padang Pariaman)**, bermukim bertahun-tahun di **Makkah Al-Mukarramah**, bahkan tercatat pernah berlayar hingga ke **Istanbul (Turki Utsmani)** untuk mendalami ilmu tasawuf dan tarekat. Sekembalinya ke Tanah Mandar, beliau diangkat menjadi **Imam di Desa Lapeo (Kecamatan Campalagian, Kabupaten Polewali Mandar)** dan membangun **Masjid Nurut Taubah Lapeo**.\n\nDengan keteladanan akhlak yang sangat lembut, keberanian melawan kezaliman kolonial, dan kepedulian kepada fakir miskin, Imam Lapeo keluar-masuk hutan dan pegunungan Sulawesi Barat mendirikan masjid-masjid dan mengislamkan masyarakat pedalaman tanpa paksaan sedikit pun. Beliau wafat dalam keadaan mulia pada malam ganjil sepuluh hari terakhir Ramadhan (**24 Ramadhan 1371 H / 17 Juni 1952 M**) dan dimakamkan tepat di halaman **Masjid Jami’ Nurut Taubah, Desa Lapeo, Kecamatan Campalagian, Kabupaten Polewali Mandar**.',
    karomah: [
      'Dalam buku biografi karya cendekiawan Mandar Prof. Baharuddin Lopa dan tradisi lisan masyarakat Sulawesi Barat, KH. Muhammad Thahir (Imam Lapeo) dikenal memiliki begitu banyak karomah kewalian yang disaksikan masyarakat sezaman: mulai dari berjalan di atas air laut saat menolong perahu nelayan Mandar yang hampir tenggelam, meredakan badai di Selat Makassar dengan doa, hingga keberaniannya menghalau tentara Jepang yang hendak merusak kesucian masjid.<!--more-->\n\nHingga hari ini, **Masjid Nurut Taubah dan Kubah Makam Imam Lapeo** di tepi jalan poros utama **Majene–Mamuju (Kecamatan Campalagian, Polewali Mandar)** menjadi titik wajib persinggahan seluruh peziarah dan pengendara yang melintasi Provinsi Sulawesi Barat.',
    ],
    untoldStory:
      'Kawasan **Pambusuang dan Lapeo** di Kabupaten Polewali Mandar dikenal sebagai **"Serambi Madinah-nya Tanah Mandar"**: di mana santri-santri tidak hanya mengkaji kitab kuning berbahasa Arab dan Mandar di sepanjang pesisir pantai, tetapi juga melahirkan ulama-ulama besar dan tokoh nasional yang jujur serta pemberani seperti **Jaksa Agung Baharuddin Lopa**.<!--more-->\n\nDi Kompleks Masjid Nurut Taubah Lapeo, menara masjidnya yang unik berbentuk menyerupai roket dibangun oleh seorang arsitek perantau asal Pulau Jawa yang sembuh dari sakitnya setelah didoakan oleh Imam Lapeo.',
    barokahHajat:
      'Peziarah dan musafir yang berziarah ke Kubah Makam KH. Muhammad Thahir (Imam Lapeo) di Campalagian Polewali Mandar umumnya bertawassul memohon kepada Allah SWT taubat yang nasuha (*Nurut Taubah*), keselamatan perjalanan darat dan laut, keberkahan usia panjang yang penuh karomah kebaikan, serta kemuliaan wafat di malam Lailatul Qadar Ramadhan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muhammad Thahir / Tosalamaq Imam Lapeo (Polewali Mandar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مُحَمَّدْ طَاهِرْ (إِمَامْ لَافِيُو) وَالْحَبِيبِ عَلْوِي بْنِ عَبْدِ اللهِ بْنِ سَهْلٍ وَأَوْلِيَاءِ مَانْدَارْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا نُورَ التَّوْبَةِ النَّصُوحِ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مُحَمَّدْ طَاهِرْ (إِمَامْ لَافِيُو) وَالْحَبِيبِ عَلْوِي بْنِ عَبْدِ اللهِ بْنِ سَهْلٍ وَأَوْلِيَاءِ مَانْدَارْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا نُورَ التَّوْبَةِ النَّصُوحِ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh Kiyaahii al-Haajj Muhammad Thaahir (Imam Lapeo) wal-Habiib 'Alwii bin 'Abdillaah bin Sahl wa Auliyaa-i Mandar syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnaa nuurat-taubatin-nashuuhi wanfa'naa bi asraarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah KH. Muhammad Thahir (Imam Lapeo), Al-Habib Alwi bin Abdullah bin Sahil, beserta seluruh auliya di Tanah Mandar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami cahaya taubat nasuha, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah KH. Muhammad Thahir (Imam Lapeo), Al-Habib Alwi bin Abdullah bin Sahil, beserta seluruh auliya di Tanah Mandar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami cahaya taubat nasuha, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '24 Ramadhan / 17 Juni (Puncak Haul Akbar Wafatnya KH. Muhammad Thahir / Imam Lapeo di Kompleks Masjid Jami’ Nurut Taubah, Desa Lapeo, Kecamatan Campalagian, Kabupaten Polewali Mandar).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki serambi Masjid Nurut Taubah dan Kubah Makam Imam Lapeo, serta menjaga ketenangan jamaah yang sedang beribadah.',
    facilities: ['Kubah Utama Makam KH. Muhammad Thahir (Imam Lapeo)', 'Masjid Jami’ Bersejarah Nurut Taubah Lapeo', 'Tempat Wudhu, Toilet & Aula Istirahat Musafir', 'Area Parkir Luas Jalan Poros Trans Sulawesi Campalagian'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Lopa, Baharuddin (1982). KH. Muhammad Thahir (Imam Lapeo): Riwayat Hidup dan Perjuangannya. Jakarta.',
      'Kila, Syahrir (2014). Imam Lapeo: Ulama Sufi dari Tanah Mandar. Makassar: Balai Pelestarian Nilai Budaya (BPNB) Makassar.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-abdul-mannan-salabose-majene',
    name: 'Makam Syekh Abdul Mannan / Tuan di Salabose (Pangali-Ali, Banggae, Kabupaten Majene)',
    title: 'Ulama Pelopor Pengislam Kerajaan Banggae Mandar Abad ke-17 & Pendiri Masjid Kuno Salabose (1608 M)',
    description:
      'Kompleks Cagar Budaya Makam Syekh Abdul Mannan (Tuan di Salabose, wafat abad ke-17 M) dan Masjid Kuno Syekh Abdul Mannan Salabose (didirikan 1608 M) di atas bukit Lingkungan Salabose, Kelurahan Pangali-Ali, Kecamatan Banggae, Kabupaten Majene, Provinsi Sulawesi Barat.',
    category: 'Auliya Nusantara',
    era: 'Awal Abad ke-17 M (Mengislamkan Banggae Majene dan mendirikan Masjid Salabose sekitar tahun 1608 M)',
    province: 'Sulawesi Barat',
    city: 'Majene',
    district: 'Kec. Banggae',
    address: 'Lingkungan Salabose, Kel. Pangali-Ali, Kec. Banggae, Kabupaten Majene',
    location: {
      lat: -3.5358,
      lng: 118.9692,
      address: 'Lingkungan Salabose, Kel. Pangali-Ali, Kec. Banggae, Kabupaten Majene',
      district: 'Kec. Banggae',
      city: 'Majene',
      province: 'Sulawesi Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Awal Tanah Mandar (Kompleks Masjid Kuno & Makam Syekh Abdul Mannan di Salabose Majene)',
    sanad:
      'Syekh Abdul Mannan yang bergelar Tuanta di Salabose / Tuan di Salabose; mubaligh sufi dari jaringan kesultanan Gowa–Cikoang dan Jawa/Kalimantan yang menyebarkan Islam ke Kerajaan Banggae (Majene) pada masa Mara’dia Banggae I Sukkilan (awal abad ke-17 M).',
    karya: [
      'Pengislaman Raja (Mara’dia) Banggae Majene, I Sukkilan, beserta masyarakat Tanah Mandar pada sekitar tahun 1608 M',
      'Pembangunan Masjid Kuno Syekh Abdul Mannan Salabose (1608 M), masjid tertua di Kabupaten Majene dan Provinsi Sulawesi Barat',
      'Perintisan tradisi akbar Maulid Nabi SAW berbasis adat Mandar (Mawludu Salabose) dengan hiasan telur dan pohon pisang di puncak Bukit Salabose',
    ],
    history:
      '**Syekh Abdul Mannan**—yang dalam lontara sejarah Mandar sangat dihormati dengan gelar **Tuan di Salabose** atau **Tuanta di Salabose** (hidup pada awal abad ke-17 M)—adalah ulama pelopor yang mengislamkan **Kerajaan Banggae (Majene)** di pesisir **Tanah Mandar, Provinsi Sulawesi Barat**. Beliau datang ke bandar pelabuhan Majene pada awal abad ke-17 M (sekitar tahun **1608 M**, tak lama setelah masuknya Islam di Kerajaan Gowa-Tallo). Di wilayah Banggae yang kala itu dipimpin oleh **Mara’dia (Raja) Banggae, I Sukkilan**, Syekh Abdul Mannan menunjukkan akhlak kenabian, ilmu pengobatan, serta hujah tauhid yang meluluhkan hati sang raja dan dewan adat (*Ada’appe*).\n\nSetelah **Mara’dia I Sukkilan** resmi memeluk agama Islam, sang Raja menikahkan Syekh Abdul Mannan dengan putrinya yang bernama **Putri Tandihatu** dan menghadiahkan kawasan perbukitan **Salabose** (yang berada di ketinggian menghadap langsung ke Teluk Mandar dan Kota Majene) sebagai pusat pendidikan Islam. Di puncak Bukit Salabose inilah, pada tahun **1608 M**, Syekh Abdul Mannan bersama masyarakat Mandar mendirikan **Masjid Kuno Syekh Abdul Mannan Salabose** dengan empat tiang soko guru dari kayu pilihan.\n\nSyekh Abdul Mannan mengajar Al-Qur’an, fikih, dan tasawuf di Bukit Salabose hingga akhir hayatnya. Ketika wafat, beliau dimakamkan tepat di kompleks **Masjid Kuno Syekh Abdul Mannan di Lingkungan Salabose, Kelurahan Pangali-Ali, Kecamatan Banggae, Kabupaten Majene**.',
    karomah: [
      'Dalam kajian BPCB dan tradisi lisan masyarakat Majene, keistimewaan situs dakwah Syekh Abdul Mannan di Bukit Salabose tampak dari kelestarian **Masjid Kuno Salabose (1608 M)** yang masih menyimpan empat tiang soko guru kayu asli berusia lebih dari 400 tahun, mimbar kayu berukir kuno, serta mushaf Al-Qur’an tulisan tangan di atas kertas daluang peninggalan abad ke-17 M.<!--more-->\n\nSetiap bulan **Rabiul Awal**, Kompleks Masjid dan Makam Syekh Abdul Mannan di Salabose menjadi pusat perayaan **Maulid Agung Salabose (*Mawludu*)** yang dihadiri oleh Gubernur Sulawesi Barat, Bupati Majene, para mara’dia (pemangku adat Mandar), dan puluhan ribu warga dengan membawa ribuan pohon pisang berhias telur warna-warni (*tumbu*).',
    ],
    untoldStory:
      'Di Kabupaten Majene terdapat dua poros awal masuknya Islam pada awal abad ke-17 M: **Syekh Abdul Mannan (Tuan di Salabose)** di Kerajaan Banggae dan **Syekh Abdurrahim Kamaluddin (Tuan di Benuang / Pulau Karampuang)** di Kerajaan Sendana—keduanya menjadi tonggak berdirinya persekutuan kerajaan Islam Mandar (*Pitu Ba’bana Binanga*).<!--more-->\n\nDari pelataran **Makam dan Masjid Kuno Syekh Abdul Mannan di Bukit Salabose**, peziarah juga dapat mengunjungi **Kompleks Makam Raja-Raja dan Pahlawan Banggae (termasuk Makam Pahlawan Nasional Ibu Agung Hj. Andi Depu)** yang berada di kawasan perbukitan Majene.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Abdul Mannan (Tuan di Salabose) di Banggae Kabupaten Majene umumnya bertawassul memohon kepada Allah SWT kemurnian iman dan kecintaan merayakan kelahiran Nabi Muhammad SAW (Maulid), keberkahan rumah tangga, serta tegaknya nilai-nilai *Malaqbiq* (kemuliaan akhlak Mandar).',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Mannan / Tuan di Salabose (Majene Sulawesi Barat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ الْمَنَّانِ (تُوَانْ دِي سَالَابُوسِي) وَالْمَلِكِ سُوكِّيلَانْ وَأَوْلِيَاءِ مَاجِينِي مَانْدَارْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَمُنَّ عَلَيْنَا بِالْإِيمَانِ وَالْإِحْسَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ الْمَنَّانِ (تُوَانْ دِي سَالَابُوسِي) وَالْمَلِكِ سُوكِّيلَانْ وَأَوْلِيَاءِ مَاجِينِي مَانْدَارْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَمُنَّ عَلَيْنَا بِالْإِيمَانِ وَالْإِحْسَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh 'Abdil-Mannaan (Tuan di Salabose) wal-Malik Sukkilan wa Auliyaa-i Majene Mandar syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa munna 'alainaa bil-iimaani wal-ihsaani wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdul Mannan (Tuan di Salabose), Mara’dia Banggae I Sukkilan, beserta seluruh auliya di Majene Tanah Mandar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, anugerahkanlah kepada kami iman dan ihsan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdul Mannan (Tuan di Salabose), Mara’dia Banggae I Sukkilan, beserta seluruh auliya di Majene Tanah Mandar, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, anugerahkanlah kepada kami iman dan ihsan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal (Puncak Perayaan Maulid Agung Adat Mandar & Haul Syekh Abdul Mannan di Kompleks Masjid Kuno Salabose, Kelurahan Pangali-Ali, Kecamatan Banggae, Kabupaten Majene).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat saat menaiki kawasan Bukit Salabose, melepas alas kaki di dalam Masjid Kuno Salabose (1608 M) dan cungkup Makam Syekh Abdul Mannan, serta menjaga kelestarian benda cagar budaya.',
    facilities: ['Cungkup Cagar Budaya Makam Syekh Abdul Mannan (Tuan di Salabose)', 'Masjid Kuno Syekh Abdul Mannan Salabose (1608 M)', 'Pelataran Pandang Bukit Salabose Menghadap Teluk Mandar', 'Area Parkir Peziarah Pangali-Ali Banggae Majene'],
    openingHours: 'Buka Setiap Hari 07.00 – 20.00 WITA',
    references: [
      'Darwis, Robby (2015). Sejarah Masuknya Islam di Kerajaan Banggae Majene (Peran Syekh Abdul Mannan di Salabose). Makassar: UIN Alauddin.',
      'BPCB Sulawesi Selatan — Inventarisasi Situs Cagar Budaya Masjid Kuno dan Makam Syekh Abdul Mannan Salabose Kabupaten Majene.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 8. PROVINSI SULAWESI TENGAH (TADULAKO)
  // =========================================================================
  {
    id: 'habib-idrus-bin-salim-al-jufri-palu',
    legacyId: 'habib-13',
    name: 'Makam Al-Habib Sayyid Idrus bin Salim Al-Jufri / Guru Tua (Kamonji, Palu Barat, Kota Palu)',
    title: 'Pendiri Perguruan Islam Alkhairaat (1930 M), Maha Guru Indonesia Timur & Pahlawan Nasional (1890–1969 M)',
    description:
      'Kompleks Kubah Makam Al-Allamah Al-Habib Sayyid Idrus bin Salim Al-Jufri (Guru Tua, 15 Maret 1890 – 22 Desember 1969 M / 12 Syawal 1389 H) di halaman Masjid Alkhairaat, Jl. Sis Aljufri, Kelurahan Kamonji, Kecamatan Palu Barat, Kota Palu, Provinsi Sulawesi Tengah.',
    category: 'Habaib',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (14 Sya’ban 1307 H / 15 Maret 1890 M – 12 Syawal 1389 H / 22 Desember 1969 M)',
    province: 'Sulawesi Tengah',
    city: 'Palu',
    district: 'Kec. Palu Barat',
    address: 'Kompleks Masjid Alkhairaat, Jl. Sis Aljufri, Kel. Kamonji, Kec. Palu Barat, Kota Palu',
    location: {
      lat: -0.8986,
      lng: 119.8594,
      address: 'Kompleks Masjid Alkhairaat, Jl. Sis Aljufri, Kel. Kamonji, Kec. Palu Barat, Kota Palu',
      district: 'Kec. Palu Barat',
      city: 'Palu',
      province: 'Sulawesi Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Ulama Sulawesi (Kompleks Pusat Alkhairaat & Makam Al-Habib Sayyid Idrus bin Salim Al-Jufri / Guru Tua di Palu)',
    sanad:
      'Al-Allamah Al-Habib Sayyid Idrus bin Salim bin Alwi bin Saqqaf Al-Jufri Ba’alawi (lahir di Taris, Hadramaut, Yaman dari ayahanda Mufti Taris Sayyid Salim bin Alwi Al-Jufri dan ibunda bangsawan Bugis-Wajo Syarifah Nur / Andi Cella); berguru di Tarim Hadramaut kepada Al-Habib Abdurrahman bin Ubaidillah Assegaf, Al-Habib Abdullah bin Umar Asy-Syathiri (Rubath Tarim), dan Al-Habib Ali bin Muhammad Al-Habsyi, serta di Makkah kepada Sayyid Abbas Al-Maliki.',
    karya: [
      'Pendirian Perguruan Islam Alkhairaat di Kota Palu pada 14 Muharram 1349 H / 30 Juni 1930 M yang berkembang menjadi lebih dari 1.700 madrasah, sekolah, pondok pesantren, dan universitas (UNISA) di seluruh Indonesia Timur (Sulawesi, Maluku, Kalimantan, hingga Papua)',
      'Kumpulan ratusan syair Arab klasik (Diwan Syi’ir Guru Tua) yang menggugah semangat kemerdekaan RI, kecintaan kepada Rasulullah SAW, dan kemuliaan menuntut ilmu',
    ],
    history:
      '**Al-Allamah Al-Habib Sayyid Idrus bin Salim Al-Jufri**—yang sangat dicintai dan dimuliakan oleh jutaan umat Islam di kawasan timur Indonesia dengan gelar **Guru Tua** (lahir di kota ilmu **Taris, Hadramaut, Yaman** pada **14 Sya’ban 1307 H / 15 Maret 1890 M** dan wafat di Palu pada hari Senin, **12 Syawal 1389 H / 22 Desember 1969 M**)—adalah ulama besar, penyair Arab ulung, dan pendiri jaringan pendidikan Islam terbesar di Indonesia Timur, **Alkhairaat**. Ayahanda beliau adalah ulama dan Qadhi kota Taris, **Al-Habib Salim bin Alwi Al-Jufri**, sedangkan ibunda beliau (**Syarifah Nur / Andi Cella**) memiliki darah bangsawan Bugis Wajo (Sulawesi Selatan). Pada usia 19 tahun, pemuda Sayyid Idrus telah diangkat menggantikan ayahandanya sebagai Mufti dan kepala perguruan di Taris setelah menamatkan pendidikan tinggi di **Rubath Tarim** dan **Makkah Al-Mukarramah**.\n\nKarena kegigihan beliau menentang kolonialisme Inggris di Yaman Selatan, Habib Idrus berhijrah ke Nusantara pada tahun **1922 M**: mula-mula mengajar di Pekalongan, Jombang, dan Solo, lalu berlayar ke Sulawesi (Manado, Gorontalo, dan Wani) hingga tiba di **Lembah Palu, Sulawesi Tengah** pada tahun **1929 M**. Pada tanggal **14 Muharram 1349 H (30 Juni 1930 M)**, dengan restu Raja Palu (**Janggugu Tjatjo Idjazah**) dan masyarakat Kaili, Guru Tua mendirikan madrasah pertama **Alkhairaat di Palu** menggunakan bangku dan papan tulis yang beliau biayai sendiri.\n\nMelalui kader-kader muridnya yang dikirim ke pelosok pulau-pulau terpencil, **Alkhairaat** tumbuh menjadi lebih dari **1.700 lembaga pendidikan** (madrasah, pesantren, hingga Universitas Alkhairaat) yang membentengi akidah umat dari Sulawesi, Maluku Utara, Maluku, Kalimantan, hingga Papua. Beliau wafat pada **12 Syawal 1389 H (22 Desember 1969 M)** dan dimakamkan di dalam kubah di samping **Masjid Alkhairaat, Jl. Sis Aljufri, Kelurahan Kamonji, Kecamatan Palu Barat, Kota Palu**.',
    karomah: [
      'Dalam kesaksian masyarakat Kota Palu dan mukjizat penjagaan Allah SWT saat peristiwa **Gempa Bumi Dahsyat dan Likuifaksi Palu pada 28 September 2018 M**, ketika banyak bangunan besar di sekitar Palu Barat mengalami kerusakan berat, bangunan **Masjid Alkhairaat dan Kubah Makam Guru Tua (Al-Habib Idrus bin Salim Al-Jufri)** di Jl. Sis Aljufri tetap berdiri utuh dan menjadi tempat perlindungan ribuan warga.<!--more-->\n\nSetiap tanggal **12 Syawal** (sepekan setelah Idul Fitri), **Haul Akbar Guru Tua** di Kompleks Alkhairaat Palu Barat dihadiri oleh ratusan ribu *Abnaul Khairaat* (santri dan pecinta Alkhairaat), para menteri, gubernur se-Sulawesi dan Maluku, serta ulama mancanegara.',
    ],
    untoldStory:
      'Saat berita Proklamasi Kemerdekaan RI 17 Agustus 1945 sampai ke Sulawesi Tengah, **Guru Tua (Habib Idrus bin Salim Al-Jufri)** langsung menggubah bait-bait syair berbahasa Arab yang menyambut lahirnya bendera Merah Putih dan memerintahkan para santri Alkhairaat mengibarkan Merah Putih di halaman perguruan. Nama besar beliau kini diabadikan menjadi nama **Bandar Udara Mutiara SIS Al-Jufri Palu** dan **UIN Datokarama / Universitas Alkhairaat**.<!--more-->\n\nDi dalam Kubah Makam Guru Tua di Kelurahan Kamonji, Palu Barat, pusara **Al-Habib Idrus bin Salim Al-Jufri** berdampingan dengan makam cucu beliau yang meneruskan kepemimpinan Alkhairaat, **Al-Habib Saggaf bin Muhammad Al-Jufri** (wafat 2021 M).',
    barokahHajat:
      'Peziarah dan *Abnaul Khairaat* yang berziarah ke Kubah Makam Guru Tua (Al-Habib Idrus bin Salim Al-Jufri) di Palu Barat umumnya bertawassul memohon kepada Allah SWT semangat berjuang menyebarkan kebaikan (*Al-Khairaat*) dan pendidikan hingga ke daerah terpencil, kefasihan bahasa Arab dan ilmu syariat, serta perlindungan dari bencana.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Sayyid Idrus bin Salim Al-Jufri / Guru Tua (Alkhairaat Palu)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الدَّاعِي إِلَى اللهِ الْحَبِيبِ السَّيِّدِ إِدْرِيسَ بْنِ سَالِمٍ الْجُفْرِيِّ (غُورُو تُوَا) مُؤَسِّسِ الْخَيْرَاتِ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنْ أَبْنَاءِ الْخَيْرَاتِ الْمُخْلِصِينَ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الدَّاعِي إِلَى اللهِ الْحَبِيبِ السَّيِّدِ إِدْرِيسَ بْنِ سَالِمٍ الْجُفْرِيِّ (غُورُو تُوَا) مُؤَسِّسِ الْخَيْرَاتِ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنْ أَبْنَاءِ الْخَيْرَاتِ الْمُخْلِصِينَ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamatid-Daa'ii ilallaah al-Habiib as-Sayyid Idriis bin Saalim al-Jufrii (Guru Tua) mu-assisi al-Khairaat wa ushuulihii wa furuu'ihii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waj'alnaa min Abnaa-il-Khairaat al-mukhlisiina wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah penyeru jalan Allah Al-Habib Sayyid Idrus bin Salim Al-Jufri (Guru Tua) pendiri Perguruan Islam Alkhairaat beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami termasuk keluarga besar pencinta kebaikan (Alkhairaat) yang ikhlas, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-alim al-allamah penyeru jalan Allah Al-Habib Sayyid Idrus bin Salim Al-Jufri (Guru Tua) pendiri Perguruan Islam Alkhairaat beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami termasuk keluarga besar pencinta kebaikan (Alkhairaat) yang ikhlas, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Syawal (Puncak Haul Akbar Guru Tua Al-Habib Sayyid Idrus bin Salim Al-Jufri di Kompleks Pusat Alkhairaat, Jl. Sis Aljufri, Kelurahan Kamonji, Kecamatan Palu Barat, Kota Palu).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat, melepas alas kaki saat memasuki Masjid Alkhairaat dan Kubah Makam Guru Tua, memisahkan saf peziarah laki-laki dan perempuan, serta menjaga adab terhadap para habaib dan guru Alkhairaat.',
    facilities: ['Kubah Utama Makam Guru Tua (Habib Idrus bin Salim Al-Jufri)', 'Masjid Alkhairaat & Kampus Pusat Perguruan Islam Alkhairaat', 'Universitas Alkhairaat (UNISA) Palu', 'Area Parkir Peziarah Jl. Sis Aljufri Palu Barat'],
    openingHours: 'Buka Setiap Hari 06.00 – 22.00 WITA',
    references: [
      'Bachmid, Ahmad (2007). Sang Bintang dari Timur: Sayyid Idrus bin Salim Al-Jufri, Sosok Ulama dan Sastrawan. Jakarta: Studia Press.',
      'Pettalongi, Sagaf S. (2015). Sejarah dan Perkembangan Perguruan Islam Alkhairaat di Indonesia Timur. Palu: IAIN Palu Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datuk-karama-palu',
    name: 'Kompleks Makam Syekh Abdullah Raqie / Datuk Karama (Kampung Lere, Palu Barat, Kota Palu)',
    title: 'Ulama Sufi Asal Minangkabau Pembawa Islam Pertama di Lembah Palu (Tanah Kaili) pada Abad ke-17 M',
    description:
      'Kompleks Cagar Budaya Makam Datuk Karama (Syekh Abdullah Raqie, wafat abad ke-17 M) beserta istrinya Ince Jille dan murid-murid bangsawan Kaili di Jl. Cumi-Cumi, Kelurahan Lere, Kecamatan Palu Barat, Kota Palu, Provinsi Sulawesi Tengah.',
    category: 'Auliya Nusantara',
    era: 'Paruh Pertama Abad ke-17 M (Tiba di Teluk Palu sekitar tahun 1605–1650 M)',
    province: 'Sulawesi Tengah',
    city: 'Palu',
    district: 'Kec. Palu Barat',
    address: 'Jl. Cumi-Cumi, Kampung Lere, Kel. Lere, Kec. Palu Barat, Kota Palu',
    location: {
      lat: -0.8852,
      lng: 119.8495,
      address: 'Jl. Cumi-Cumi, Kampung Lere, Kel. Lere, Kec. Palu Barat, Kota Palu',
      district: 'Kec. Palu Barat',
      city: 'Palu',
      province: 'Sulawesi Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Awal Sulawesi Tengah (Kompleks Makam Syekh Abdullah Raqie / Datuk Karama di Kampung Lere Kota Palu)',
    sanad:
      'Syekh Abdullah Raqie yang bergelar Datuk Karama; ulama sufi dan bangsawan asal Koto Tangah / Pagaruyung, Minangkabau (Sumatera Barat) yang menuntut ilmu di Kesultanan Aceh dan berdakwah menyusuri pantai barat Sulawesi hingga mendarat di Kabonga (Donggala) dan Kampung Lere (Teluk Palu) pada abad ke-17 M.',
    karya: [
      'Pengislaman para Raja (Magau) dan bangsawan suku Kaili di Lembah Palu: Raja Kabonena (Ipue Njidi), Raja Palu (Pue Nggari), keluarga Vua Pinano, dan masyarakat Donggala–Sigi',
      'Peletakan nilai-nilai syariat Islam dalam hukum adat Kaili dan perintisan pusat pengajian awal di Kampung Lere, Palu Barat',
    ],
    history:
      '**Syekh Abdullah Raqie**—yang oleh masyarakat suku Kaili dan seluruh penduduk Sulawesi Tengah dimuliakan dengan gelar **Datuk Karama** (*"Datuk yang Memiliki Karomah"*, berdakwah di Lembah Palu pada paruh pertama abad ke-17 M)—adalah ulama pelopor pembawa cahaya Islam pertama di **Lembah Palu dan Donggala, Provinsi Sulawesi Tengah**. Berasal dari ranah **Minangkabau (Sumatera Barat)** dan sempat memperdalam ilmu tasawuf di **Kesultanan Aceh**, Syekh Abdullah Raqie berlayar bersama rombongannya menggunakan perahu layar melintasi Selat Makassar hingga mendarat mula-mula di **Tanjung Karang / Kabonga (Donggala)** lalu berlabuh di muara Sungai Palu di **Kampung Lere (Kecamatan Palu Barat, Kota Palu)**.\n\nSetibanya di Lembah Palu, Syekh Abdullah Raqie berdakwah dengan pendekatan adat, kesantunan akhlak, dan karomah yang ditampakkan Allah SWT, sehingga para penguasa (*Magau*) kerajaan-kerajaan Kaili berbondong-bondong memeluk agama Islam. Tokoh bangsawan Kaili pertama yang memeluk Islam di tangan Datuk Karama adalah **Raja Kabonena, Ipue Njidi**, disusul oleh **Raja Palu, Pue Nggari**, serta keluarga bangsawan **Pue Bongo** dan **Yenda Bulava** di Besusu dan Tatanga.\n\nSyekh Abdullah Raqie (Datuk Karama) menetap dan membina masyarakat Muslim Kaili di **Kampung Lere** hingga wafat. Beliau dimakamkan di **Kompleks Makam Datuk Karama di Kelurahan Lere, Kecamatan Palu Barat, Kota Palu** bersama istrinya (**Ince Jille**), putranya (**Ince Dg. Masarro**), dan putrinya (**Ince Dingko**). Nama besar beliau kini diabadikan secara resmi oleh negara menjadi nama **Universitas Islam Negeri (UIN) Datokarama Palu**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Kaili dan historiografi Islam Sulawesi Tengah (Prof. Haliadi-Sadi dan Dr. Lukman S. Thahir), julukan **Datuk Karama** diberikan oleh masyarakat Lembah Palu karena berbagai karomah yang disaksikan saat beliau berdakwah di Tanah Kaili, serta perlindungan ajaib atas **Kompleks Makam Datuk Karama di Kampung Lere**: ketika gelombang **Tsunami Teluk Palu pada 28 September 2018 M** menyapu bersih bangunan-bangunan di pesisir Pantai Lere dan Kampus IAIN di sebelahnya, cungkup utama Makam Datuk Karama tetap tegak bertahan.<!--more-->\n\nDi dalam Kompleks Makam Datuk Karama yang luas di Kelurahan Lere, selain pusara utama Syekh Abdullah Raqie dan keluarganya, terdapat pula sekitar 30 makam para raja (*Magau*) dan bangsawan Kaili pengikut setia beliau.',
    ],
    untoldStory:
      'Tiga abad setelah **Syekh Abdullah Raqie (Datuk Karama)** membuka jalan syahadat di Kampung Lere (Palu Barat) pada abad ke-17 M, **Al-Habib Idrus bin Salim Al-Jufri (Guru Tua)** datang ke Kecamatan Palu Barat yang sama pada tahun 1930 M untuk membangun lembaga pendidikan Alkhairaat—menjadikan Kecamatan **Palu Barat** sebagai poros kembar sejarah Islam di Sulawesi Tengah.<!--more-->\n\nJarak antara **Kompleks Makam Datuk Karama di Kelurahan Lere** dan **Kubah Makam Guru Tua di Kelurahan Kamonji** hanya sekitar 1,8 kilometer, sehingga setiap peziarah yang datang ke Kota Palu selalu menziarahi kedua makam wali besar ini dalam satu rangkaian perjalanan.',
    barokahHajat:
      'Peziarah dan mahasiswa UIN Datokarama yang berziarah ke maqbarah Syekh Abdullah Raqie (Datuk Karama) di Kampung Lere Kota Palu umumnya bertawassul memohon kepada Allah SWT keteguhan iman perintis dakwah, keselamatan dari bencana alam pesisir dan gempa, serta keberkahan ilmu pengetahuan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdullah Raqie / Datuk Karama (Kampung Lere Kota Palu)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ اللهِ رَاقِي المُلَقَّبِ بِدَاتُوكْ كَرَامَةْ وَزَوْجَتِهِ إِينْتشِي جِيلِّي وَأَوْلِيَاءِ فَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَكْرِمْنَا بِالتَّقْوَى وَالْإِيمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ عَبْدِ اللهِ رَاقِي المُلَقَّبِ بِدَاتُوكْ كَرَامَةْ وَزَوْجَتِهِ إِينْتشِي جِيلِّي وَأَوْلِيَاءِ فَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَكْرِمْنَا بِالتَّقْوَى وَالْإِحْسَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh 'Abdillaah Raqie al-mulaqqabi bi Datuk Karama wa zaujatihii Ince Jille wa Auliyaa-i Palu syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa akrimnaa bit-taqwaa wal-ihsaani wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdullah Raqie yang bergelar Datuk Karama beserta istrinya Ince Jille dan seluruh auliya di Lembah Palu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah kami dengan ketakwaan dan ihsan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali penyeru jalan Allah Syekh Abdullah Raqie yang bergelar Datuk Karama beserta istrinya Ince Jille dan seluruh auliya di Lembah Palu, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah kami dengan ketakwaan dan ihsan, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban (Ziarah Adat Menjelang Ramadhan), Muharram, & Syawal di Kompleks Cagar Budaya Makam Datuk Karama, Kelurahan Lere, Kecamatan Palu Barat, Kota Palu.',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki cungkup utama Makam Datuk Karama, serta menjaga kemurnian adab ziarah sesuai syariat Islam.',
    facilities: ['Cungkup Cagar Budaya Makam Syekh Abdullah Raqie (Datuk Karama)', 'Pendopo & Musholla Ziarah Kampung Lere', 'Dekat Kampus I UIN Datokarama Palu & Pantai Teluk Palu', 'Area Parkir Peziarah Kelurahan Lere Palu Barat'],
    openingHours: 'Buka Setiap Hari 07.00 – 20.00 WITA',
    references: [
      'Mattulada, dkk. (1990). Sejarah Daerah Sulawesi Tengah. Jakarta: Departemen Pendidikan dan Kebudayaan.',
      'Haliadi-Sadi & Syamsuddin (2015). Sejarah Islam di Lembah Palu: Jejak Dakwah Datuk Karama (Abdullah Raqie). Palu: Yayasan Masyarakat Indonesia Baru.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 9. PROVINSI SULAWESI UTARA (BUMI NYIUR MELAMBAI)
  // =========================================================================
  {
    id: 'kyai-mojo-tondano',
    legacyId: 'ulama-29',
    name: 'Makam Kyai Mojo / KH. Muslim Muhammad Khalifah (Bukit Tondano, Wulauan, Tondano Utara, Minahasa)',
    title: 'Ulama Besar Penasihat Spiritual Pangeran Diponegoro dalam Perang Jawa & Pendiri Kampung Jawa Tondano (1792–1849 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam Kyai Mojo (KH. Muslim Muhammad Khalifah, 1792 – 20 Desember 1849 M) beserta puluhan pengikut pasukannya di atas Bukit Tondano, Kelurahan Wulauan / Kampung Jawa Tondano (Jaton), Kecamatan Tondano Utara, Kabupaten Minahasa, Provinsi Sulawesi Utara.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-18 – Pertengahan Abad ke-19 M (1792 – 20 Desember 1849 M)',
    province: 'Sulawesi Utara',
    city: 'Minahasa',
    district: 'Kec. Tondano Utara',
    address: 'Bukit Tondano, Kel. Wulauan / Kampung Jawa, Kec. Tondano Utara, Kabupaten Minahasa',
    location: {
      lat: 1.3264,
      lng: 124.9189,
      address: 'Bukit Tondano, Kel. Wulauan / Kampung Jawa, Kec. Tondano Utara, Kabupaten Minahasa',
      district: 'Kec. Tondano Utara',
      city: 'Minahasa',
      province: 'Sulawesi Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Nasional Sulawesi Utara (Kompleks Makam Kyai Mojo & Kampung Jawa Tondano di Kabupaten Minahasa)',
    sanad:
      'KH. Muslim Muhammad Khalifah (bergelar Kyai Mojo), putra dari ulama besar Keraton Surakarta Kyai Iman Abdul Ngarip (pengasuh Pesantren Baderan dan Mojo di Pajang/Boyolali) dan ibunda R.A. Mursilah (adik perempuan Sultan Hamengkubuwono III); sepupu sekaligus maha guru dan panglima spiritual Pangeran Diponegoro.',
    karya: [
      'Panglima ruhani dan penasihat tertinggi hukum Islam (Amirul Mujahidin) dalam Perang Jawa mendampingi Pangeran Diponegoro (1825–1828 M)',
      'Perintisan komunitas Muslim bersejarah Kampung Jawa Tondano (Jaton) di Kabupaten Minahasa, Sulawesi Utara pada tahun 1830 M bersama 62 pengikut setianya',
      'Pelestarian tradisi zikir Thariqah Syattariyah, Maulid Hadrah Jaton, dan kerukunan persaudaraan dengan masyarakat Minahasa',
    ],
    history:
      '**KH. Muslim Muhammad Khalifah**—yang diabadikan dalam sejarah nasional Indonesia sebagai **Kyai Mojo** (lahir di Desa Mojo, Pajang/Boyolali dekat Surakarta sekitar tahun **1792 M** dan wafat dalam pengasingan di Tondano, Minahasa pada **20 Desember 1849 M**)—adalah ulama besar, mursyid tarekat, dan panglima spiritual utama **Pangeran Diponegoro** dalam **Perang Jawa (1825–1830 M)**. Ayahanda beliau adalah **Kyai Iman Abdul Ngarip**, ulama besar yang dianugerahi tanah perdikan di Desa Baderan dan Desa Mojo oleh Pakubuwono IV, sedangkan ibunda beliau (**R.A. Mursilah**) adalah adik perempuan Sultan Hamengkubuwono III—sehingga Kyai Mojo adalah sepupu langsung Pangeran Diponegoro.\n\nKetika Pangeran Diponegoro mengibarkan perang jihad melawan Belanda pada bulan **Juli 1825 M**, Kyai Mojo mengerahkan seluruh santri pesantrennya untuk bergabung ke Selarong. Di medan Perang Jawa, Kyai Mojo menjadi arsitek strategi perang gerilya sekaligus imam ruhani yang membakar semangat *jihad fi sabilillah* para bupati dan prajurit santri. Pada bulan **November 1828 M**, Kyai Mojo beserta pasukannya dikepung dan ditawan oleh Belanda di Klaten saat menuju perundingan, lalu dibawa ke Batavia.\n\nPada awal tahun **1830 M**, pemerintah kolonial Belanda mengasingkan **Kyai Mojo beserta 62 orang pengikut dan panglima santrinya** (semuanya laki-laki, termasuk Kyai Hasan Besari/penerusnya, Tumenggung, dan ulama pesantren) menggunakan kapal laut menuju **Tondano, Kabupaten Minahasa, Sulawesi Utara**. Di tepi Danau Tondano, Kyai Mojo dan ke-62 pengikutnya membuka lahan pertanian subur, menikahi gadis-gadis lokal Minahasa (*Walak Tondano*) secara terhormat, dan mendirikan **Masjid Agung Al-Falah serta Kampung Jawa Tondano (Jaton)** yang bertahan sebagai komunitas Muslim yang sangat religius dan rukun di tengah masyarakat Minahasa hingga hari ini. Kyai Mojo wafat pada tanggal **20 Desember 1849 M** dan dimakamkan di puncak **Bukit Tondano, Kelurahan Wulauan, Kecamatan Tondano Utara, Kabupaten Minahasa**.',
    karomah: [
      'Dalam kajian sejarah Prof. Peter Carey dan antropolog komunitas Jaton, keistimewaan besar Kyai Mojo dan 62 pengikutnya di Tondano tampak dari keberhasilan mereka menyemai benih Islam di tanah Minahasa dengan penuh kedamaian dan kasih sayang: dari pernikahan para santri Jawa pengikut Kyai Mojo dengan perempuan-perempuan Minahasa, lahirlah masyarakat **Jawa Tondano (Jaton)** yang memegang teguh zikir pesantren abad ke-19 sekaligus fasih berbahasa Tondano dan menjalin persaudaraan darah dengan keluarga besar Minahasa.<!--more-->\n\nDi Kompleks Cagar Budaya Makam Kyai Mojo di atas Bukit Wulauan (Tondano Utara), pusara Kyai Mojo dikelilingi oleh puluhan makam para panglima dan santri pengikut setianya yang wafat di tanah pengasingan.',
    ],
    untoldStory:
      'Tradisi Islam klasik Jawa abad ke-19 yang sudah langka di Pulau Jawa justru masih tersimpan utuh di **Kampung Jawa Tondano (Jaton)** warisan Kyai Mojo: seperti pembacaan **Maulid Al-Barzanji dengan iringan rebana besar dan gerak pencak silat (*Hadrah Jaton*)** serta perayaan **Bakdo Ketupat (Lebaran Ketupat)** yang dikunjungi oleh seluruh warga Sulawesi Utara lintas agama sebagai simbol toleransi nasional.<!--more-->\n\nLokasi **Makam Kyai Mojo di Tondano Utara** berjarak sekitar 35 kilometer (sekitar 50 menit perjalanan) dari **Kota Manado** maupun dari **Makam Tuanku Imam Bonjol di Pineleng**, sehingga peziarah dapat menziarahi kedua ulama besar pejuang kemerdekaan tersebut dalam satu hari.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Kyai Mojo di Bukit Tondano Kabupaten Minahasa umumnya bertawassul memohon kepada Allah SWT keteguhan iman di tanah perantauan, kerukunan dan toleransi hidup bermasyarakat, serta keberkahan keturunan yang tetap menjaga identitas santri.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muslim Muhammad Khalifah / Kyai Mojo (Tondano Minahasa)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مُسْلِمْ مُحَمَّدْ خَلِيفَةْ (كِيَاهِي مُوجُو) وَأَصْحَابِهِ الْمُجَاهِدِينَ فِي تُونْدَانُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَثَبِّتْ إِيمَانَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ كِيَاهِي الحَاجِّ مُسْلِمْ مُحَمَّدْ خَلِيفَةْ (كِيَاهِي مُوجُو) وَأَصْحَابِهِ الْمُجَاهِدِينَ فِي تُونْدَانُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَثَبِّتْ إِيمَانَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahidi fii sabiilillaah asy-Syaikh Kiyaahii al-Haajj Muslim Muhammad Khaliifah (Kyai Mojo) wa ash-haabihil-mujaahidiina fii Tondano syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum wa tsabbit iimaananaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang di jalan Allah KH. Muslim Muhammad Khalifah (Kyai Mojo) beserta seluruh sahabat pejuang pengikutnya di Tondano Minahasa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, teguhkanlah iman kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang di jalan Allah KH. Muslim Muhammad Khalifah (Kyai Mojo) beserta seluruh sahabat pejuang pengikutnya di Tondano Minahasa, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, teguhkanlah iman kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '20 Desember (Haul Wafatnya Kyai Mojo), 12 Rabiul Awal (Maulid Agung Hadrah Kampung Jawa Tondano), & 8 Syawal (Lebaran Ketupat Jaton di Kompleks Makam Kyai Mojo, Kecamatan Tondano Utara, Kabupaten Minahasa).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat saat menaiki anak tangga Bukit Makam Kyai Mojo, melepas alas kaki saat memasuki cungkup makam, serta menjaga ketertiban dan kerukunan masyarakat Kampung Jawa Tondano.',
    facilities: ['Cungkup Utama Cagar Budaya Nasional Makam Kyai Mojo & 62 Pengikutnya', 'Pendopo & Musholla Ziarah Bukit Tondano', 'Masjid Agung Al-Falah Kampung Jawa Tondano', 'Area Parkir Bus Peziarah Wulauan Tondano Utara'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Carey, Peter (2014). Takdir: Riwayat Pangeran Diponegoro (1785–1855). Jakarta: Penerbit Buku Kompas.',
      'Babcock, Timothy G. (1989). Kampung Jawa Tondano: Religion and Cultural Identity. Yogyakarta: Gadjah Mada University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'tuanku-imam-bonjol-minahasa',
    name: 'Makam Pahlawan Nasional Tuanku Imam Bonjol / Muhammad Shahab (Desa Lotta, Pineleng, Kabupaten Minahasa)',
    title: 'Ulama Besar Pemimpin Perang Paderi Sumatera Barat & Pahlawan Nasional yang Wafat dalam Pengasingan di Minahasa (1772–1864 M)',
    description:
      'Kompleks Cagar Budaya Nasional Makam dan Musholla Batu Pahlawan Nasional Tuanku Imam Bonjol (Muhammad Shahab / Peto Syarif, 1772 – 6 November 1864 M) di tepi Sungai Malalayang, Desa Lotta, Kecamatan Pineleng, Kabupaten Minahasa (perbatasan Kota Manado), Provinsi Sulawesi Utara.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-18 – Pertengahan Abad ke-19 M (1772 – 6 November 1864 M)',
    province: 'Sulawesi Utara',
    city: 'Minahasa',
    district: 'Kec. Pineleng',
    address: 'Jl. Raya Manado–Tomohon, Desa Lotta, Kec. Pineleng, Kabupaten Minahasa (Perbatasan Kota Manado)',
    location: {
      lat: 1.4252,
      lng: 124.8395,
      address: 'Jl. Raya Manado–Tomohon, Desa Lotta, Kec. Pineleng, Kabupaten Minahasa (Perbatasan Kota Manado)',
      district: 'Kec. Pineleng',
      city: 'Minahasa',
      province: 'Sulawesi Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Nasional Sulawesi Utara (Kompleks Makam Pahlawan Nasional Tuanku Imam Bonjol di Lotta Pineleng Minahasa)',
    sanad:
      'Muhammad Shahab (bergelar Peto Syarif, Malin Basa, dan Tuanku Imam Bonjol) bin Khatib Bayanuddin bin Syekh Usman (ulama asal Koto Tua / Sungai Rimbang, Pasaman, Sumatera Barat); menuntut ilmu di Aceh dan kepada ulama besar Minangkabau Tuanku Nan Renceh serta Tuanku Nan Tuo (Koto Tuo Agam).',
    karya: [
      'Pendirian benteng dan pusat peradaban Islam Negeri Bonjol di Pasaman, Sumatera Barat (1802 M)',
      'Kepemimpinan jihad Perang Paderi (1803–1837 M) bersama para ulama dan penghulu adat Minangkabau (*Adat Basandi Syarak, Syarak Basandi Kitabullah*) melawan kolonial Belanda',
      'Penulisan Naskah Otobiografi Tuanku Imam Bonjol serta peninggalan Batu Tempat Shalat dan Wudhu di tepi Sungai Lotta Pineleng, Minahasa (1841–1864 M)',
    ],
    history:
      '**Tuanku Imam Bonjol**—yang lahir di Tanjung Bunga, Lembah Alahan Panjang, Kabupaten Pasaman, Sumatera Barat pada tahun **1772 M** dengan nama asli **Muhammad Shahab** (kemudian bergelar **Peto Syarif** dan **Malin Basa**, wafat dalam pengasingan di Desa Lotta, Pineleng, Minahasa pada **6 November 1864 M** dalam usia **92 tahun**; ditetapkan sebagai **Pahlawan Nasional RI** melalui **SK Presiden No. 087/TK/1973 tanggal 6 November 1973**)—adalah ulama besar dan panglima tertinggi dalam **Perang Paderi (1803–1837 M)**. Setelah menimba ilmu fikih, tafsir, dan tasawuf kepada ayahandanya (**Khatib Bayanuddin**) serta ulama besar Agam (**Tuanku Nan Tuo** dan **Tuanku Nan Renceh**), pada tahun **1802 M** beliau mendirikan **Benteng Bonjol** di Pasaman sebagai pusat pengajaran syariat Islam.\n\nKetika kolonial Belanda mencampuri urusan Minangkabau pada tahun 1821 M, Tuanku Imam Bonjol berhasil menyatukan **Kaum Paderi (Ulama)** dan **Kaum Adat (Penghulu)** melalui konsensus bersejarah **Plakat Puncak Pato di Bukit Marapalam** (*Adat Basandi Syarak, Syarak Basandi Kitabullah*) untuk berjihad bersama melawan penjajah Belanda. Selama lebih dari 16 tahun, Benteng Bonjol tak sanggup ditaklukkan oleh tentara Belanda hingga Jenderal Cochius mengerahkan pengepungan total selama tiga tahun (1834–1837 M) dan menangkap Tuanku Imam Bonjol melalui perundingan di Palupuh pada **28 Oktober 1837 M**.\n\nPemerintah kolonial Belanda mengasingkan Tuanku Imam Bonjol mula-mula ke **Cianjur (Jawa Barat)**, kemudian ke **Ambon (Maluku, 1839 M)**, dan akhirnya sejak tahun **1841 M** dipindahkan ke **Desa Lotta, Kecamatan Pineleng, Kabupaten Minahasa (dekat Kota Manado), Sulawesi Utara** bersama pengawal setianya **Apolos Minggu**. Selama **23 tahun di Lotta Pineleng (1841–1864 M)**, sang ulama mengisi hari-harinya dengan bertani, berzikir, dan mendirikan shalat di atas sebongkah batu besar di tepi Sungai Malalayang/Lotta hingga wafat dengan tenang pada usia 92 tahun, **6 November 1864 M**.',
    karomah: [
      'Dalam catatan sejarah nasional dan tradisi masyarakat Desa Lotta Pineleng, keistimewaan ruhani Tuanku Imam Bonjol tampak dari keteguhan ibadahnya hingga usia 92 tahun di pengasingan: di tepi sungai tepat di bawah kompleks makam beliau di Desa Lotta, masih terawat utuh **Batu Tempat Shalat dan Batu Tempat Wudhu Tuanku Imam Bonjol** yang berlekuk bekas sujud dan pijakan kaki beliau selama puluhan tahun bermunajat kepada Allah SWT.<!--more-->\n\nBangunan cungkup **Makam Tuanku Imam Bonjol di Desa Lotta, Pineleng** dibangun dengan arsitektur atap **Rumah Gadang (Bagonjong) khas Minangkabau**, dan dijaga secara turun-temurun oleh keturunan pengawal setia beliau di tengah masyarakat Minahasa yang sangat menghormati sang pahlawan.',
    ],
    untoldStory:
      'Keberadaan makam dua ulama besar pahlawan nasional di **Kabupaten Minahasa, Sulawesi Utara**—yakni **Kyai Mojo di Tondano Utara** (dari Perang Jawa) dan **Tuanku Imam Bonjol di Pineleng** (dari Perang Paderi Sumatera Barat)—menjadikan tanah Minahasa memiliki ikatan sejarah keislaman dan kebangsaan yang sangat erat dengan Pulau Jawa dan Pulau Sumatera.<!--more-->\n\nLokasi **Kompleks Makam Tuanku Imam Bonjol di Desa Lotta, Kecamatan Pineleng** sangat mudah dijangkau karena berada tepat di jalan raya utama **Manado–Tomohon**, hanya berjarak sekitar 20 menit perjalanan dari pusat **Kota Manado**.',
    barokahHajat:
      'Peziarah dari seluruh Nusantara yang berziarah ke maqbarah Pahlawan Nasional Tuanku Imam Bonjol di Lotta Pineleng Minahasa umumnya bertawassul memohon kepada Allah SWT keistiqamahan menjaga shalat lima waktu hingga akhir usia, keselarasan antara adat budaya dan syariat agama, serta umur panjang yang penuh kemuliaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional Tuanku Imam Bonjol / Muhammad Shahab (Pineleng Minahasa)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ مُحَمَّدْ شِهَابْ (تُوَانْكُو إِمَامْ بُونْجُولْ) وَأَصْحَابِهِ وَشُهَدَاءِ الْإِسْلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَاجْعَلْنَا مُقِيمِي الصَّلَاةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ فِي سَبِيلِ اللهِ الشَّيْخِ مُحَمَّدْ شِهَابْ (تُوَانْكُو إِمَامْ بُونْجُولْ) وَأَصْحَابِهِ وَشُهَدَاءِ الْإِسْلَامِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ جِهَادَهُمْ وَاجْعَلْنَا مُقِيمِي الصَّلَاةِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahidi fii sabiilillaah asy-Syaikh Muhammad Syihaab (Tuanku Imam Bonjol) wa ash-haabihii wa Syuhadaa-il-Islaam syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal jihaadahum waj'alnaa muqiimish-shalaati wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang di jalan Allah Syekh Muhammad Shahab (Tuanku Imam Bonjol) beserta sahabat dan para syuhada Islam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, jadikanlah kami hamba-Mu yang senantiasa menegakkan shalat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang di jalan Allah Syekh Muhammad Shahab (Tuanku Imam Bonjol) beserta sahabat dan para syuhada Islam, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah amal jihad mereka, jadikanlah kami hamba-Mu yang senantiasa menegakkan shalat, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '6 November (Haul Wafatnya Tuanku Imam Bonjol & Peringatan SK Pahlawan Nasional) & 10 November (Ziarah Hari Pahlawan di Kompleks Makam Tuanku Imam Bonjol, Desa Lotta, Kecamatan Pineleng, Kabupaten Minahasa).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki saat memasuki bangunan cungkup Rumah Gadang Makam Tuanku Imam Bonjol dan Musholla Batu di tepi sungai, serta menjaga kelestarian situs sejarah nasional.',
    facilities: ['Cungkup Cagar Budaya Nasional Makam Tuanku Imam Bonjol (Arsitektur Bagonjong)', 'Situs Batu Shalat & Wudhu Tuanku Imam Bonjol di Tepi Sungai Lotta', 'Musholla & Galeri Sejarah Imam Bonjol', 'Area Parkir Bus Peziarah Jl. Raya Manado–Tomohon Pineleng'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Dobbin, Christine (2008). Gejolak Ekonomi, Kebangkitan Islam, dan Gerakan Padri: Minangkabau 1784–1847. Depok: Komunitas Bambu.',
      'Sjafnir A.N. (1988). Tuanku Imam Bonjol: Sejarah Intelektual dan Perjuangan Islam di Minangkabau. Padang: Departemen Pendidikan dan Kebudayaan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 10. PROVINSI GORONTALO (SERAMBI MADINAH)
  // =========================================================================
  {
    id: 'sultan-amai-gorontalo',
    name: 'Kompleks Makam & Masjid Hunto Sultan Amai (Kelurahan Biawu, Kota Selatan, Kota Gorontalo)',
    title: 'Raja Pertama yang Mengislamkan Kerajaan Gorontalo (1525 M), Pendiri Masjid Hunto (1495 M) & Peletak Falsafah Adat Bersendikan Syarak',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sultan Amai (Ta Olongia Lopo Islamu, memerintah akhir abad ke-15 hingga pertengahan abad ke-16 M) dan Masjid Hunto Sultan Amai (didirikan 1495/1525 M) di Kelurahan Biawu, Kecamatan Kota Selatan, Kota Gorontalo, Provinsi Gorontalo.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Pertengahan Abad ke-16 M (Mendirikan Masjid Hunto 1495 M & meresmikan Islam Kerajaan Gorontalo 1525 M)',
    province: 'Gorontalo',
    city: 'Gorontalo',
    district: 'Kec. Kota Selatan',
    address: 'Kompleks Masjid Hunto Sultan Amai, Kel. Biawu, Kec. Kota Selatan, Kota Gorontalo',
    location: {
      lat: 0.5335,
      lng: 123.0585,
      address: 'Kompleks Masjid Hunto Sultan Amai, Kel. Biawu, Kec. Kota Selatan, Kota Gorontalo',
      district: 'Kec. Kota Selatan',
      city: 'Gorontalo',
      province: 'Gorontalo',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Serambi Madinah Gorontalo (Kompleks Masjid Hunto & Makam Sultan Amai di Kelurahan Biawu Kota Gorontalo)',
    sanad:
      'Raja Amai yang setelah memeluk Islam menyandang gelar Sultan Amai dan digelari rakyat Gorontalo sebagai Ta Olongia Lopo Islamu ("Raja yang Mengislamkan Negeri"); memeluk Islam saat meminang Putri Owutango (putri Raja Palasa / Kumojolo di Teluk Tomini yang telah beragama Islam melalui jaringan Kesultanan Ternate) dan dibimbing oleh delapan raja kecil/ulama pengiring.',
    karya: [
      'Pembangunan Masjid Hunto Sultan Amai di Kampung Biawu pada tahun 1495 M (masjid tertua di Provinsi Gorontalo yang menjadi basis dakwah kerajaan)',
      'Deklarasi Islam sebagai agama resmi Kerajaan Gorontalo pada tahun 1525 M dan perumusan falsafah awal "Saraa Topa-topango To Adati" (Syarak bertumpu pada Adat) yang kemudian disempurnakan oleh Raja Eyato menjadi "Adati Hula-hula’a To Syara’a, Syara’a Hula-hula’a To Qur’ani"',
    ],
    history:
      '**Sultan Amai**—yang dalam historiografi adat Gorontalo dimuliakan dengan gelar **Ta Olongia Lopo Islamu** (*"Raja yang Mengislamkan Negeri"*, memerintah **Kerajaan Gorontalo** sekitar tahun **1472–1550 M**)—adalah penguasa pertama yang membawa cahaya agama Islam ke bumi **Hulontalo (Gorontalo)** hingga provinsi ini dijuluki sebagai **Serambi Madinah**. Pada akhir abad ke-15 M, Raja Amai melakukan perjalanan muhibah ke wilayah barat Teluk Tomini dan meminang **Putri Owutango**, putri dari **Raja Palasa (Raja Kumojolo)** yang kerajaannya telah lebih dahulu memeluk agama Islam. Pinangan tersebut diterima dengan syarat utama bahwa Raja Amai beserta seluruh rakyat Kerajaan Gorontalo bersedia memeluk agama Islam dan menjadikan Al-Qur’an sebagai pedoman hidup.\n\nRaja Amai mengucapkan dua kalimat syahadat, mempelajari tata cara shalat serta hukum Islam, dan pada tahun **1495 M** mulai membangun sebuah masjid di pusat basis kerajaan yang dinamai **Masjid Hunto Sultan Amai** (*Hunto* berarti *Basis / Pusat Perkumpulan*) di **Kelurahan Biawu, Kota Gorontalo**. Setelah memperdalam ajaran Islam bersama permaisuri **Putri Owutango** dan delapan tokoh penasihat agama, Sultan Amai kembali ke Gorontalo secara paripurna pada tahun **1525 M**.\n\nSekembalinya ke Gorontalo, **Sultan Amai** mengumpulkan seluruh kepala adat (*Baate*) dan rakyat di pelataran **Masjid Hunto Biawu**, merombak adat-istiadat lama yang bertentangan dengan tauhid (termasuk melarang konsumsi babi dan tuak), serta meletakkan fondasi integrasi **Adat dan Syariat Islam** yang kemudian disempurnakan oleh penerusnya, **Sultan Eyato**, menjadi falsafah luhur masyarakat Gorontalo: **"Adati Hula-hula’a To Syara’a, Syara’a Hula-hula’a To Kitabullah"** (*Adat bersendikan Syarak, Syarak bersendikan Kitabullah*). Ketika wafat, Sultan Amai dimakamkan tepat di kompleks **Masjid Hunto Sultan Amai, Kelurahan Biawu, Kecamatan Kota Selatan, Kota Gorontalo**.',
    karomah: [
      'Dalam kajian sejarah Islam Gorontalo (Prof. Hasanuddin dan Prof. Medi Botutihe) serta tradisi lisan masyarakat Biawu, keistimewaan situs dakwah Sultan Amai tampak pada **Masjid Hunto Sultan Amai (1495 M)** yang masih menyimpan **Sumur Tua Keramat Abad ke-15**, bedug kuno, dan mihrab asli tempat Sultan Amai mengimami shalat bersama rakyat Gorontalo lebih dari 500 tahun silam.<!--more-->\n\nNama agung **Sultan Amai** kini diabadikan secara resmi oleh pemerintah Republik Indonesia menjadi nama **Institut Agama Islam Negeri (IAIN) Sultan Amai Gorontalo**.',
    ],
    untoldStory:
      'Di dalam cungkup makam di kompleks **Masjid Hunto Kelurahan Biawu**, pusara **Sultan Amai (Ta Olongia Lopo Islamu)** berdampingan dengan makam permaisuri yang menjadi wasilah masuknya Islam di Gorontalo, **Putri Owutango**, serta putra mahkota mereka, **Matolodula Kiki** (yang melanjutkan dakwah Islam di Gorontalo pada paruh kedua abad ke-16 M).<!--more-->\n\nSetiap peringatan **Maulid Nabi Muhammad SAW (12 Rabiul Awal)**, kompleks Masjid Hunto dan Makam Sultan Amai di Kelurahan Biawu menjadi pusat pelaksanaan tradisi **Dikili (Zikir Maulid semalam suntuk berbahasa Arab dan Gorontalo)** serta pembagian kue tradisional **Walima / Tolangga**.',
    barokahHajat:
      'Peziarah dan akademisi IAIN Sultan Amai yang berziarah ke Kompleks Makam dan Masjid Hunto Sultan Amai di Kota Gorontalo umumnya bertawassul memohon kepada Allah SWT dikaruniai pasangan hidup yang membawa hidayah dan ketakwaan, keteguhan memegang falsafah *Adat Bersendikan Syarak*, serta keberkahan ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Amai (Ta Olongia Lopo Islamu — Masjid Hunto Gorontalo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ أَمَايْ أَوَّلِ مُلُوكِ الْإِسْلَامِ فِي غُورُونْتَالُو وَزَوْجَتِهِ الْأَمِيرَةِ أُووُوتَانْغُو وَابْنِهِ مَاتُولُودُولَا كِيكِي وَأَوْلِيَاءِ غُورُونْتَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الشَّرِيعَةِ وَالْقُرْآنِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ أَمَايْ أَوَّلِ مُلُوكِ الْإِسْلَامِ فِي غُورُونْتَالُو وَزَوْجَتِهِ الْأَمِيرَةِ أُووُوتَانْغُو وَابْنِهِ مَاتُولُودُولَا كِيكِي وَأَوْلِيَاءِ غُورُونْتَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْنَا عَلَى الشَّرِيعَةِ وَالْقُرْآنِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Amai awwali Muluukil-Islaami fii Gorontalo wa zaujatihil-Amiirati Owutango wabnihii Matolodula Kiki wa Auliyaa-i Gorontalo syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbitnaa 'alasy-syarii'ati wal-Qur'aani wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Amai raja Islam pertama di Gorontalo, permaisuri beliau Putri Owutango, putranya Matolodula Kiki, beserta seluruh auliya di Gorontalo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas syariat dan Al-Qur’an, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Amai raja Islam pertama di Gorontalo, permaisuri beliau Putri Owutango, putranya Matolodula Kiki, beserta seluruh auliya di Gorontalo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah kami di atas syariat dan Al-Qur’an, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal (Tradisi Maulid Agung Dikili & Walima di Masjid Hunto Sultan Amai) & Bulan Sya’ban / Syawal di Kelurahan Biawu, Kecamatan Kota Selatan, Kota Gorontalo.',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (dianjurkan memakai kopiah keranjang/*upia karanji* khas Gorontalo bagi laki-laki), melepas alas kaki saat memasuki Masjid Hunto Sultan Amai (1495 M) dan cungkup makam beliau, serta menjaga kesucian cagar budaya.',
    facilities: ['Cungkup Cagar Budaya Makam Sultan Amai & Putri Owutango', 'Masjid Kuno Hunto Sultan Amai (Berdiri 1495 M)', 'Sumur Tua Bersejarah Abad ke-15 Masjid Hunto', 'Area Parkir Peziarah Kelurahan Biawu Kota Gorontalo'],
    openingHours: 'Buka Setiap Hari 06.00 – 21.00 WITA',
    references: [
      'Botutihe, Medi & Daulima, Farha (2003). Sejarah Perkembangan Limo Pohala’a di Daerah Gorontalo. Limboto: Forum Suara Perempuan LSM Mbu’i Bungale.',
      'Hasanuddin & Amin, Basri (2012). Gorontalo dalam Dinamika Sejarah Masa Kolonial. Yogyakarta: Ombak.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'ju-panggola-gorontalo',
    name: 'Makam Keramat Auliya Ju Panggola / Ta Lo’o Baya Lipu (Kelurahan Dembe I, Kota Barat, Kota Gorontalo)',
    title: 'Waliyullah Berjubah Putih Penyebar Islam & Penjaga Spiritual Bumi Serambi Madinah Gorontalo ("Ilomata")',
    description:
      'Kompleks Cagar Budaya dan Wisata Religi Makam Keramat Auliya Ju Panggola (Ta Lo’o Baya Lipu / Ilomata, abad ke-15 – ke-17 M) serta Masjid Ju Panggola di atas perbukitan Kelurahan Dembe I, Kecamatan Kota Barat, Kota Gorontalo, Provinsi Gorontalo.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 – Abad ke-17 M (Masa awal penyebaran dan pemurnian Islam di Kerajaan Gorontalo)',
    province: 'Gorontalo',
    city: 'Gorontalo',
    district: 'Kec. Kota Barat',
    address: 'Bukit Dembe, Kel. Dembe I, Kec. Kota Barat, Kota Gorontalo',
    location: {
      lat: 0.5485,
      lng: 123.0215,
      address: 'Bukit Dembe, Kel. Dembe I, Kec. Kota Barat, Kota Gorontalo',
      district: 'Kec. Kota Barat',
      city: 'Gorontalo',
      province: 'Gorontalo',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Auliya Gorontalo (Kompleks Makam Keramat & Masjid Auliya Ju Panggola di Kelurahan Dembe I Kota Gorontalo)',
    sanad:
      'Auliya Ju Panggola (dalam bahasa Gorontalo berarti "Kakek Tua yang Mulia / Wali Sepuh"), juga bergelar Ta Lo’o Baya Lipu ("Yang Membuat Negeri Bercahaya") dan Ilomata ("Mata Air Karya Agung Ilahi"); tokoh wali sufi penyebar Islam dan pembimbing ruhani para Raja Gorontalo (Sultan Amai hingga Raja Eyato).',
    karya: [
      'Penyebaran dakwah tauhid, tasawuf, dan syariat Islam di kawasan Danau Limboto dan pesisir Kota Gorontalo',
      'Pembelaan spiritual dan patriotik atas kedaulatan masyarakat Gorontalo serta perintisan tradisi zikir dan doa di Bukit Dembe',
    ],
    history:
      '**Auliya Ju Panggola**—yang dalam bahasa Gorontalo bermakna *"Wali/Kakek Sepuh yang Mulia"* dan menyandang gelar kehormatan adat **Ta Lo’o Baya Lipu** (*"Sosok yang Membuat Negeri Gorontalo Bercahaya dengan Islam"*) serta **Ilomata**—adalah *waliyullah* paling dikeramatkan dan dicintai oleh masyarakat **Provinsi Gorontalo**. Dalam historiografi dan tradisi lisan *Wulito* masyarakat Gorontalo, Ju Panggola dikenal sebagai seorang ulama sufi berjubah dan bersorban serba putih dengan janggut putih panjang yang mendampingi para raja Muslim Gorontalo (sejak masa **Sultan Amai** hingga masa **Raja Eyato** pada abad ke-16 dan ke-17 M) dalam mengislamkan penduduk di sekitar **Danau Limboto dan Teluk Gorontalo**.\n\nDengan kedalaman ilmu makrifat, kesantunan, dan keberanian membela rakyat dari berbagai ancaman serta bencana, Ju Panggola membimbing masyarakat Gorontalo mengamalkan rukun Islam, memperbaiki tata cara bersuci dan shalat, serta mengajarkan zikir-zikir keselamatan. Beliau memilih tempat berkhalwat dan bermunajat di kawasan perbukitan **Dembe (Kelurahan Dembe I, Kecamatan Kota Barat)** yang menghadap langsung ke hamparan **Danau Limboto**.\n\nDi puncak bukit **Kelurahan Dembe I, Kecamatan Kota Barat, Kota Gorontalo** inilah terdapat **Makam Keramat Auliya Ju Panggola (Makam Ilomata)** beserta **Masjid Ju Panggola**. Kompleks makam ini merupakan destinasi wisata religi nomor satu di Provinsi Gorontalo yang dikunjungi oleh puluhan ribu peziarah setiap tahun.',
    karomah: [
      'Dalam penelitian antropologi budaya Gorontalo dan penuturan juru kunci (*Ta Lulupuhu*) Makam Ju Panggola, keunikan dan karomah **Makam Keramat Ju Panggola di Dembe I** tampak dari tanah pusara beliau yang terletak di dalam bangunan cungkup putih dan senantiasa mengeluarkan aroma harum alami serta terasa sejuk meskipun di musim kemarau panjang.<!--more-->\n\nSetiap perayaan **Maulid Nabi Muhammad SAW** di Kompleks Masjid dan Makam Ju Panggola (Dembe I), ribuan warga Gorontalo mengarak ratusan menara kue tradisional **Tolangga / Walima** (berisi kue *kolombengi*, *wapili*, dan *curuti*) sambil melantunkan **Dikili (Zikir Maulid Gorontalo)** sejak selepas Isya hingga terbit matahari.',
    ],
    untoldStory:
      'Lokasi **Makam Auliya Ju Panggola di Kelurahan Dembe I (Kecamatan Kota Barat)** berada dalam satu kawasan perbukitan bersejarah yang sangat indah di tepi **Danau Limboto**, berdekatan langsung dengan **Benteng Otanaha** (benteng batu kuno abad ke-16 peninggalan Raja Ilato dan putra-putranya: Ndoba, Tiliaya, dan Naha).<!--more-->\n\nBagi masyarakat Gorontalo yang hendak merantau, menunaikan ibadah haji, atau memulai hajat besar, berziarah dan bertawassul di **Makam Auliya Ju Panggola Dembe I** serta **Masjid Hunto Sultan Amai** telah menjadi tradisi turun-temurun selama berabad-abad.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Auliya Ju Panggola (Ta Lo’o Baya Lipu) di Dembe I Kota Gorontalo umumnya bertawassul memohon kepada Allah SWT bercahayanya hati dan rumah tangga dengan iman, keselamatan saat merantau atau menunaikan ibadah haji, serta dikabulkannya hajat-hajat kebaikan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Auliya Ju Panggola / Ta Lo’o Baya Lipu (Dembe Kota Gorontalo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ أَوْلِيَاءَ جُو فَانْغغُولَا (تَا لُؤُو بَايَا لِيفُو / إِيلُومَاتَا) وَالسُّلْطَانِ إِيَاتُو وَكَافَّةِ أَوْلِيَاءِ غُورُونْتَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا وَبِلَادَنَا بِنُورِ الْإِسْلَامِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ أَوْلِيَاءَ جُو فَانْغغُولَا (تَا لُؤُو بَايَا لِيفُو / إِيلُومَاتَا) وَالسُّلْطَانِ إِيَاتُو وَكَافَّةِ أَوْلِيَاءِ غُورُونْتَالُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا وَبِلَادَنَا بِنُورِ الْإِسْلَامِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah Auliyaa Ju Panggola (Ta Lo'o Baya Lipu / Ilomata) was-Sulthaan Eyato wa kaaffati Auliyaa-i Gorontalo syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa nawwir quluubanaa wa bilaadanaa bi nuuril-Islaami wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Auliya Ju Panggola (Ta Lo’o Baya Lipu / Ilomata), Sultan Eyato, beserta seluruh auliya di Gorontalo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati dan negeri kami dengan cahaya Islam, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Auliya Ju Panggola (Ta Lo’o Baya Lipu / Ilomata), Sultan Eyato, beserta seluruh auliya di Gorontalo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati dan negeri kami dengan cahaya Islam, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal (Puncak Perayaan Maulid Agung Dikili & Arak-arakan Walima Tolangga), Bulan Sya’ban (Menjelang Ramadhan), & Syawal di Kompleks Makam Keramat Auliya Ju Panggola, Kelurahan Dembe I, Kecamatan Kota Barat, Kota Gorontalo.',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki cungkup putih Makam Ju Panggola, menjaga niat tawassul yang lurus kepada Allah SWT tanpa kemusyrikan, serta menjaga ketertiban kawasan wisata religi Dembe I.',
    facilities: ['Cungkup Utama Makam Keramat Auliya Ju Panggola', 'Masjid Ju Panggola Dembe I', 'Dekat Benteng Otanaha & Panorama Danau Limboto', 'Area Parkir Peziarah Kelurahan Dembe I Kota Barat Gorontalo'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Daulima, Farha (2006). Mengenal Sastra Lisan Daerah Gorontalo (Sejarah dan Tradisi Ju Panggola). Limboto: Galeri Budaya Daerah Mbu’i Bungale.',
      'Kementerian Agama RI / Balai Litbang Agama Makassar (2016). Tradisi Ziarah Makam Ju Panggola pada Masyarakat Muslim Gorontalo. Jurnal Al-Qalam.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 11. PROVINSI SULAWESI TENGGARA (BUMI ANOA & NEGERI KHALIFATUL KHAMIS)
  // =========================================================================
  {
    id: 'sultan-murhum-buton',
    name: 'Kompleks Makam Sultan Murhum Kaimuddin Khalifatul Khamis (Benteng Keraton Buton, Wolio, Kota Baubau)',
    title: 'Raja ke-6 dan Sultan Pertama Kesultanan Buton (1542 M) yang Dibaiat oleh Syekh Abdul Wahid di Bumi Khalifatul Khamis',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sultan Murhum Kaimuddin Khalifatul Khamis (Lakilaponto / Halu Oleo, wafat 1584 M) dan Masjid Agung Keraton Buton di dalam kawasan Benteng Keraton Buton (Benteng Terluas di Dunia), Kelurahan Melai, Kecamatan Murhum (Wolio), Kota Baubau, Pulau Buton, Provinsi Sulawesi Tenggara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (Dilantik sebagai Sultan Buton pertama pada 948 H / 1542 M – Wafat 1584 M)',
    province: 'Sulawesi Tenggara',
    city: 'Baubau',
    district: 'Kec. Murhum',
    address: 'Kompleks Benteng Keraton Buton (Wolio), Kel. Melai, Kec. Murhum, Kota Baubau, Pulau Buton',
    location: {
      lat: -5.4748,
      lng: 122.6025,
      address: 'Kompleks Benteng Keraton Buton (Wolio), Kel. Melai, Kec. Murhum, Kota Baubau, Pulau Buton',
      district: 'Kec. Murhum',
      city: 'Baubau',
      province: 'Sulawesi Tenggara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Makam_Syekh_Yusuf.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Sulawesi Tenggara (Kompleks Benteng Keraton Buton, Masjid Agung Wolio & Makam Sultan Murhum di Kota Baubau)',
    sanad:
      'La Tolaki / Lakilaponto (juga bergelar Halu Oleo di Konawe dan Muna) yang setelah memeluk Islam dibaiat menjadi Sultan Murhum Kaimuddin Khalifatul Khamis oleh waliyullah besar asal Arab/Johor-Pahang, Syekh Abdul Wahid bin Syekh Sulaiman Al-Fathani (yang tiba di Burangasi dan Wolio Buton pada tahun 1527–1542 M).',
    karya: [
      'Transformasi Kerajaan Buton menjadi Kesultanan Islam Buton pada tahun 948 H / 1542 M dengan gelar resmi kesultanan "Khalifatul Khamis" (Penerus Khulafaur Rasyidin)',
      'Peletakan fondasi Masjid Agung Keraton Buton (Masigi Ogena Wolio) dan kawasan Benteng Keraton Buton di Kota Baubau',
      'Penyatuan kawasan Sulawesi Tenggara (Buton, Muna, Konawe/Kendari, dan Kepulauan Tukang Besi/Wakatobi) di bawah payung syariat dan tasawuf Islam',
    ],
    history:
      '**Sultan Murhum Kaimuddin Khalifatul Khamis**—yang sebelum memeluk Islam dikenal sebagai kesatria legendaris **Lakilaponto** atau **Halu Oleo** (Raja Buton ke-6 dan **Sultan Buton ke-1**, memerintah **1538/1542–1584 M**)—adalah penguasa agung yang mengubah Kerajaan Buton menjadi **Kesultanan Islam Buton** sekaligus menyebarkan syiar Islam ke seluruh **Provinsi Sulawesi Tenggara (Pulau Buton, Pulau Muna, Kepulauan Wakatobi, hingga daratan Konawe/Kendari)**. Kehadiran Islam di Buton dirintis oleh ulama sufi keturunan Arab yang datang dari Johor/Patani bernama **Syekh Abdul Wahid bin Syekh Sulaiman**, yang mula-mula mendarat di **Burangasi (Buton Selatan) pada tahun 933 H (1526/1527 M)** kemudian pindah ke pusat Kerajaan Buton di **Wolio (Baubau)**.\n\nDi bawah bimbingan **Syekh Abdul Wahid**, Raja Buton ke-6 **Lakilaponto** beserta seluruh perangkat adat *Siolimbona* mengucapkan dua kalimat syahadat. Pada tahun **948 H (1542 M)**, Lakilaponto dilantik secara resmi menjadi Sultan pertama Kesultanan Buton dengan gelar agung **Sultan Murhum Kaimuddin Khalifatul Khamis** (*"Sultan yang Dirahmati, Penegak Agama, dan Penerus Khalifah yang Kelima setelah Khulafaur Rasyidin"*). Sejak saat itu, undang-undang dasar Kesultanan Buton (**Martabat Tujuh** pada masa Sultan Dayanu Ikhsanuddin) dan sistem pemilihan sultan (bukan semata turun-temurun, melainkan dipilih secara demokratis oleh dewan *Siolimbona* berdasarkan akhlak dan kemampuan) berlandaskan pada nilai-nilai tasawuf Islam.\n\nSultan Murhum memimpin Kesultanan Buton dengan sangat adil dan gagah berani selama lebih dari empat dekade hingga wafat pada tahun **1584 M**. Beliau dimakamkan tepat di puncak kompleks **Benteng Keraton Buton (Benteng Wolio), Kelurahan Melai, Kecamatan Murhum, Kota Baubau**—tidak jauh dari **Masjid Agung Keraton Buton (Masigi Ogena)**.',
    karomah: [
      'Dalam kajian filologi naskah Buton (Prof. La Niampe dan Dr. Abdul Mulku Zahari dalam *Sejarah dan Adat Fiy Darul Butuni*) serta tradisi lisan masyarakat Sulawesi Tenggara, kemuliaan Sultan Murhum dan Syekh Abdul Wahid tampak pada predikat **Khalifatul Khamis** yang disematkan kepada Sultan Buton serta berdirinya **Benteng Keraton Buton** seluas **23,375 hektare** (diakui oleh *Guinness World Records* sebagai **Benteng Terluas di Dunia**) yang mengelilingi Masjid Agung dan Makam Sultan Murhum.<!--more-->\n\nDi dalam **Masjid Agung Keraton Buton (Masigi Ogena)** yang berada satu kompleks dengan Makam Sultan Murhum, terdapat sebuah lubang batu karang di bawah mihrab yang dikenal masyarakat Wolio sebagai *Pusat Tanah Buton*, tempat para ulama dan sultan berkhalwat mendengarkan gema takbir.',
    ],
    untoldStory:
      'Sosok **Lakilaponto (Sultan Murhum)** adalah pemersatu sejati seluruh suku besar di Provinsi Sulawesi Tenggara: beliau memiliki hubungan darah dan kepemimpinan di **Buton**, di **Muna** (putra Raja Muna Sugi Manuru), dan di daratan **Konawe/Tolaki** (dikenal sebagai **Halu Oleo**, *"Delapan Hari"*, yang namanya diabadikan menjadi nama **Universitas Halu Oleo Kendari** dan **Bandar Udara Haluoleo**), sementara nama Islam beliau diabadikan menjadi nama **Kecamatan Murhum** dan **Pelabuhan Murhum Kota Baubau**.<!--more-->\n\nSetiap peziarah yang datang ke **Kota Baubau, Pulau Buton** dapat berjalan kaki menyusuri gerbang batu (*Lawa*) **Benteng Keraton Buton**, menunaikan shalat di **Masjid Agung Keraton Buton**, melihat tiang bendera kuno berusia ratusan tahun (*Kasulana Tombi*), lalu berziarah dengan khusyuk di **Makam Sultan Murhum Kaimuddin Khalifatul Khamis**.',
    barokahHajat:
      'Peziarah, pemimpin pemerintahan, dan mahasiswa Sulawesi Tenggara yang berziarah ke maqbarah Sultan Murhum Kaimuddin Khalifatul Khamis di Benteng Keraton Buton Kota Baubau umumnya bertawassul memohon kepada Allah SWT kepemimpinan yang amanah dan merakyat, kekuatan benteng iman keluarga, serta persatuan masyarakat Sulawesi Tenggara.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Murhum Kaimuddin Khalifatul Khamis & Syekh Abdul Wahid (Keraton Buton Baubau)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ مَرْحُومْ قَائِمِ الدِّينِ خَلِيفَةِ الْخَامِسِ أَوَّلِ سَلَاطِينِ بُوتُونْ وَمُعَلِّمِهِ الشَّيْخِ عَبْدِ الْوَاحِدِ بْنِ سُلَيْمَانَ وَكَافَّةِ سَلَاطِينِ وَأَوْلِيَاءِ وُولِيُو بُوتُونْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَقِمْ بِنَا الدِّينَ وَالْعَدْلَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ مَرْحُومْ قَائِمِ الدِّينِ خَلِيفَةِ الْخَامِسِ أَوَّلِ سَلَاطِينِ بُوتُونْ وَمُعَلِّمِهِ الشَّيْخِ عَبْدِ الْوَاحِدِ بْنِ سُلَيْمَانَ وَكَافَّةِ سَلَاطِينِ وَأَوْلِيَاءِ وُولِيُو بُوتُونْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَقِمْ بِنَا الدِّينَ وَالْعَدْلَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Marhuum Qaa-imiddiin Khaliifatil-Khaamis awwali Salaathiini Buton wa mu'allimihisy-Syaikh 'Abdil-Waahid bin Sulaimaan wa kaaffati Salaathiini wa Auliyaa-i Wolio Buton syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa aqim binad-diina wal-'adla wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Murhum Kaimuddin Khalifatul Khamis Sultan pertama Kesultanan Buton, gurunya Syekh Abdul Wahid bin Sulaiman, beserta seluruh sultan dan auliya di Wolio Buton, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tegakkanlah agama dan keadilan melalui kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Murhum Kaimuddin Khalifatul Khamis Sultan pertama Kesultanan Buton, gurunya Syekh Abdul Wahid bin Sulaiman, beserta seluruh sultan dan auliya di Wolio Buton, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tegakkanlah agama dan keadilan melalui kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '17 Oktober (Hari Jadi Kota Baubau & Ziarah Adat Makam Sultan Murhum), Malam Lailatul Qadar Ramadhan (*Malona Qadiri*), & Idul Fitri/Idul Adha di Kompleks Benteng Keraton Buton, Kelurahan Melai, Kecamatan Murhum, Kota Baubau.',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat (dianjurkan memakai sarung tenun Buton/*Bia* dan peci *Kampu* saat acara adat), melepas alas kaki di area pagar Makam Sultan Murhum dan Masjid Agung Keraton Buton, serta menjaga kebersihan cagar budaya dunia Benteng Wolio.',
    facilities: ['Kompleks Cagar Budaya Nasional Makam Sultan Murhum Kaimuddin', 'Masjid Agung Keraton Buton (Masigi Ogena, Berdiri Abad ke-16)', 'Kawasan Benteng Keraton Buton (Benteng Terluas di Dunia 23,3 Ha)', 'Pusat Informasi Budaya Wolio & Area Parkir Peziarah Melai Kota Baubau'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zahari, Abdul Mulku (1977). Sejarah dan Adat Fiy Darul Butuni (Buton) Jilid I–III. Jakarta: Proyek Pengembangan Media Kebudayaan Depdikbud.',
      'Schoorl, J.W. / Pim Schoorl (2003). Masyarakat, Sejarah, dan Budaya Buton. Jakarta: Djambatan & KITLV.',
      'Yunus, Abd. Rahim (1995). Posisi Tasawuf dalam Sistem Kekuasaan di Kesultanan Buton pada Abad ke-19. Jakarta: INIS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];

