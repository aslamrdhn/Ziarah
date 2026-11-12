import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Bali, Nusa Tenggara (NTB & NTT), Maluku & Papua (Tahap 7).
 * Setiap entri di dalam array ini digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const BALI_NUSA_MALUKU_PAPUA_SITES: ZiarahSite[] = [
  // =========================================================================
  // I. PROVINSI BALI (WALI PITU & AULIYA BALI)
  // =========================================================================
  {
    id: 'habib-ali-bafaqih-negara',
    legacyId: 'habib-11',
    name: 'Makam Al-Habib Ali bin Umar bin Abu Bakar Bafaqih (Loloan Barat, Negara, Kabupaten Jembrana)',
    title: 'Habib Ali bin Umar Bafaqih Loloan (Wali Pitu Bali & Pendiri Pesantren Syamsul Huda Jembrana, 1890–1997 M)',
    description:
      'Kompleks Maqbarah Pondok Pesantren Syamsul Huda Loloan Barat, tempat peristirahatan Al-Allamah Al-Habib Ali bin Umar bin Abu Bakar Bafaqih (Wali Pitu Bali Barat) di Kelurahan Loloan Barat, Kecamatan Negara, Kabupaten Jembrana, Provinsi Bali.',
    category: 'Habaib',
    era: 'Abad ke-20 M (Lahir di Banyuwangi 1890 M – Wafat di Loloan, Jembrana 24 Oktober 1997 M / Usia 107 Tahun)',
    province: 'Bali',
    city: 'Jembrana',
    district: 'Kec. Negara',
    address: 'Kompleks Pondok Pesantren Syamsul Huda, Jl. Gatot Subroto, Kel. Loloan Barat, Kec. Negara, Kabupaten Jembrana',
    location: {
      lat: -8.3642,
      lng: 114.6185,
      address: 'Kompleks Pondok Pesantren Syamsul Huda, Jl. Gatot Subroto, Kel. Loloan Barat, Kec. Negara, Kabupaten Jembrana',
      district: 'Kec. Negara',
      city: 'Jembrana',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Pura_Jagatnatha_Jembrana.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Kota Negara, Kabupaten Jembrana, Bali Barat (Wilayah Komunitas Melayu-Bugis Loloan & Makam Habib Ali Bafaqih)',
    sanad:
      'Al-Habib Ali bin Umar bin Abu Bakar Bafaqih; dzurriyah Rasulullah SAW marga Bafaqih yang berguru kepada ulama Haramain serta masyayikh Banyuwangi dan Jawa Timur; pendiri Madrasah/Pondok Pesantren Syamsul Huda Loloan (1935 M) dan guru spiritual masyarakat Muslim Melayu-Bugis Loloan Jembrana.',
    karya: [
      'Pendirian Madrasah & Pondok Pesantren Syamsul Huda Loloan Barat, Negara, Kabupaten Jembrana pada tahun 1935 M (lembaga pendidikan Islam formal tertua di Bali Barat)',
      'Pelestarian tradisi keilmuan kitab kuning beraksara Jawi/Arab Melayu dan arsitektur rumah panggung Muslim Loloan Jembrana',
      'Pembinaan kerukunan sosial antara komunitas Muslim Melayu-Bugis Loloan dengan masyarakat Hindu Bali di Kabupaten Jembrana',
    ],
    history:
      '**Al-Allamah Al-Habib Ali bin Umar bin Abu Bakar Bafaqih** (lahir di **Banyuwangi** sekitar tahun **1890 M** dan wafat di **Loloan Barat, Negara, Kabupaten Jembrana** pada **24 Oktober 1997 M** dalam usia sekitar 107 tahun) adalah ulama kharismatik, pendiri pesantren, dan salah satu tokoh utama dalam rangkaian ziarah **Wali Pitu di Pulau Bali**. Sejak masa muda, beliau mendalami ilmu fikih Syafi’i, tasawuf, dan hikmah kepada ayahandanya (**Habib Umar Bafaqih**) serta para ulama di Jawa Timur dan Makkah Al-Mukarramah.\n\nSekitar tahun **1917–1920 M**, Habib Ali Bafaqih menetap di perkampungan Muslim bersejarah **Loloan Barat, Kecamatan Negara, Kabupaten Jembrana**—sebuah kawasan pesisir sungai Ijo Gading yang sejak abad ke-17 M telah dihuni oleh komunitas Muslim Bugis-Wajo dan Melayu Pontianak atas izin Raja Jembrana (**I Gusti Agung Putu**). Melihat kebutuhan pendidikan agama yang sistematis bagi generasi muda Muslim Bali Barat, pada tahun **1935 M** beliau meresmikan **Madrasah / Pondok Pesantren Syamsul Huda Loloan**.\n\nSelama lebih dari tujuh dekade berdakwah di Jembrana, Habib Ali bin Umar Bafaqih dikenal sangat santun, dermawan, dan dihormati baik oleh umat Islam maupun umat Hindu Bali. Ketika KH. Toyyib Zaen Arifin (penggagas rihlah Wali Pitu asal Surabaya) melakukan penelusuran makam-makam wali di Bali pada dekade 1990-an, maqbarah Habib Ali Bafaqih di Loloan Barat ditetapkan sebagai salah satu simpul utama **Wali Pitu Bali** yang menjadi gerbang pertama peziarah dari arah Pelabuhan Gilimanuk.',
    karomah: [
      'Dalam catatan sejarah Muslim Bali (Dr. Dhurorudin Mashad, *Muslim Bali: Mencari Kembali Harmoni yang Hilang*, 2014) serta penuturan santri sepuh Loloan, keistimewaan nyata Habib Ali bin Umar Bafaqih tampak pada karunia umur panjang yang melampaui satu abad (107 tahun) dalam keadaan sehat, jernih ingatan, dan istiqamah mengajar kitab serta memimpin majelis dzikir.<!--more-->\n\nDi masa perjuangan kemerdekaan Republik Indonesia di Jembrana, kediaman dan pesantren beliau di Loloan Barat menjadi tempat perlindungan serta doa keselamatan bagi para pejuang lintas agama di Bali Barat.',
    ],
    untoldStory:
      'Kampung **Loloan** di Kecamatan Negara, Kabupaten Jembrana memiliki warisan budaya Islam yang sangat unik di Pulau Bali: masyarakatnya sehari-hari bertutur menggunakan **Bahasa Melayu dialek Loloan** dan tinggal di rumah-rumah panggung kayu tradisional (*rumah panggung Loloan*), serta menyimpan mushaf Al-Qur’an kuno tulisan tangan abad ke-19.<!--more-->\n\nKehadiran **Habib Ali bin Umar Bafaqih** sejak awal abad ke-20 M memperkuat identitas keislaman Loloan sebagai kota santri di Bali Barat yang hidup rukun berdampingan dengan desa-desa adat Bali di sekitarnya.',
    barokahHajat:
      'Peziarah yang mengawali atau mengakhiri rihlah Wali Pitu Bali di maqbarah Habib Ali bin Umar Bafaqih Loloan Jembrana umumnya bertawassul memohon kepada Allah SWT keberkahan umur panjang dalam ketaatan, keteguhan iman keluarga di tengah lingkungan yang majemuk, serta ilmu agama yang bermanfaat bagi keturunan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Ali bin Umar Bafaqih (Loloan Negara Jembrana)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ عَلِيِّ بْنِ عُمَرَ بْنِ أَبِي بَكْرٍ بَافَقِيهِ لُولُوَانْ نَغَارَا بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَطَوِّلْ أَعْمَارَنَا فِي طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ عَلِيِّ بْنِ عُمَرَ بْنِ أَبِي بَكْرٍ بَافَقِيهِ لُولُوَانْ نَغَارَا بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَطَوِّلْ أَعْمَارَنَا فِي طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Habiib 'Alii bin 'Umar bin Abii Bakrin Baafaqiih Loloan Negara Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa thawwil a'maaranaa fii thaa'atika wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Ali bin Umar bin Abu Bakar Bafaqih Loloan Negara Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, panjangkanlah umur kami dalam ketaatan kepada-Mu, serta limpahkanlah kemanfaatan ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Ali bin Umar bin Abu Bakar Bafaqih Loloan Negara Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, panjangkanlah umur kami dalam ketaatan kepada-Mu, serta limpahkanlah kemanfaatan ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Jumadil Akhir / Oktober (Haul Akbar Al-Habib Ali bin Umar Bafaqih di Kompleks Pondok Pesantren Syamsul Huda, Loloan Barat, Kecamatan Negara, Kabupaten Jembrana).',
    localAdab:
      'Berpakaian muslim/muslimah yang rapi dan sopan, menjaga ketenangan di lingkungan asrama santri Pondok Pesantren Syamsul Huda Loloan, serta mengikuti pengaturan parkir bus di jalur utama Denpasar–Gilimanuk.',
    facilities: ['Kubah Maqbarah Habib Ali bin Umar Bafaqih', 'Masjid & Pondok Pesantren Syamsul Huda Loloan', 'Tempat Wudhu & Toilet Peziarah', 'Area Parkir Rombongan Bus Ziarah Wali Pitu'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Saifuddin, Ahmad dkk. (2018). Sejarah dan Tradisi Ziarah Wali Pitu di Pulau Bali. Jurnal Lektur Keagamaan Kementerian Agama RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-ali-kusamba',
    legacyId: 'habib-10',
    name: 'Makam Al-Habib Ali bin Abu Bakar Al-Hamid (Kampung Kusamba, Dawan, Kabupaten Klungkung)',
    title: 'Habib Ali bin Abu Bakar Al-Hamid Kusamba (Wali Pitu Bali & Ulama Pesisir Klungkung, Abad ke-19 M)',
    description:
      'Kompleks Makam Keramat Pantai Kusamba, tempat peristirahatan Al-Habib Ali bin Abu Bakar bin Umar Al-Hamid (Wali Pitu Bali Timur) di Kampung Islam Kusamba, Kecamatan Dawan, Kabupaten Klungkung, Provinsi Bali.',
    category: 'Habaib',
    era: 'Pertengahan Abad ke-19 M (Masa Raja Dewa Agung Istri Kanya di Kerajaan Klungkung)',
    province: 'Bali',
    city: 'Klungkung',
    district: 'Kec. Dawan',
    address: 'Kampung Islam Kusamba, Desa Kusamba, Kec. Dawan, Kabupaten Klungkung',
    location: {
      lat: -8.5562,
      lng: 115.4582,
      address: 'Kampung Islam Kusamba, Desa Kusamba, Kec. Dawan, Kabupaten Klungkung',
      district: 'Kec. Dawan',
      city: 'Klungkung',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Kerta_Gosa_Pavilion_in_Klungkung%2C_Bali.jpg',
    imageSource: 'Wikimedia Commons — Bale Kerta Gosa Kerajaan Klungkung, Bali (Pusat Pemerintahan Dewa Agung Klungkung Tempat Habib Ali Al-Hamid Mengabdi)',
    sanad:
      'Al-Habib Ali bin Abu Bakar bin Umar bin Abu Bakar Al-Hamid; dzurriyah Rasulullah SAW marga Al-Hamid yang menjalin persahabatan erat dan menjadi juru bahasa/diplomat Bahasa Melayu di lingkungan Puri Agung Klungkung pada abad ke-19 M.',
    karya: [
      'Pembinaan Kampung Muslim Kusamba dan Masjid Al-Mahdi di pesisir Kecamatan Dawan, Kabupaten Klungkung',
      'Peran diplomasi dan pengajaran bahasa komunikasi Nusantara (Melayu) bagi keluarga besar Puri Agung Klungkung',
      'Warisan persaudaraan historis (*nyama selam*) antara warga Muslim Kampung Kusamba dengan masyarakat Puri Klungkung',
    ],
    history:
      '**Al-Habib Ali bin Abu Bakar bin Umar Al-Hamid** adalah ulama dan habib kharismatik abad ke-19 M yang menyebarkan dakwah Islam penuh kedamaian di pesisir **Kusamba, Kecamatan Dawan, Kabupaten Klungkung, Provinsi Bali**. Berdasarkan kajian sejarah komunitas Muslim Klungkung (Prof. I Nyoman Wijaya dan Dr. Dhurorudin Mashad), bandar pelabuhan Kusamba pada abad ke-18 hingga ke-19 M merupakan pelabuhan niaga strategis milik **Kerajaan Klungkung** yang ramai disinggahi kapal-kapal dagang dari Bugis, Lombok, Sumbawa, dan Jawa.\n\nKedalaman ilmu, keluhuran akhlak, serta kecakapan **Habib Ali bin Abu Bakar Al-Hamid** dalam berbahasa Melayu dan Arab menarik perhatian **Raja Klungkung (Ida I Dewa Agung Putra / Dewa Agung Istri Kanya)**. Beliau diangkat menjadi guru bahasa Melayu sekaligus penasihat hubungan dagang antar-kerajaan di lingkungan **Puri Agung Semarapura Klungkung**.\n\nDalam sebuah perjalanan di wilayah Klungkung bagian barat (sekitar perbatasan Gianyar/Batuaji), beliau wafat dan atas penghormatan Raja Klungkung beserta komunitas Muslim pesisir, jenazah beliau dimakamkan dengan penuh kemuliaan di **Kampung Islam Kusamba, Kecamatan Dawan**. Kini kompleks makam Habib Ali bin Abu Bakar Al-Hamid tepat di tepi Pantai Kusamba (dekat dermaga penyeberangan menuju Nusa Penida) menjadi salah satu destinasi utama ziarah **Wali Pitu Bali**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Kampung Islam Kusamba dan catatan ziarah Wali Pitu Bali, keistimewaan Habib Ali bin Abu Bakar Al-Hamid tampak dari kemampuannya merajut kasih sayang lintas iman hingga Raja Klungkung menganugerahkan tanah perdikan bagi pemukiman Muslim dan Masjid Al-Mahdi di Kusamba.<!--more-->\n\nHingga hari ini, hubungan kekerabatan adat (*nyama selam*) antara warga Muslim Kusamba dan keluarga Puri Klungkung tetap terjaga harmonis dalam berbagai momentum sejarah.',
    ],
    untoldStory:
      'Pantai **Kusamba** di Kecamatan Dawan, Kabupaten Klungkung tidak hanya terkenal dengan tradisi petani garam tradisional berbahan batang kelapa, tetapi juga merupakan saksi sejarah **Perang Kusamba (Mei 1849 M)** ketika laskar Kerajaan Klungkung bersama prajurit Muslim Kusamba mempertahankan tanah Bali dari agresi militer Belanda hingga menewaskan Mayor Jenderal A.V. Michiels.<!--more-->\n\nKeberadaan makam **Habib Ali bin Abu Bakar Al-Hamid** di jantung Kampung Kusamba menjadi monumen hidup kesetiaan ulama dan santri Kusamba terhadap tanah airnya.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Habib Ali bin Abu Bakar Al-Hamid di Pantai Kusamba Klungkung umumnya bertawassul memohon kepada Allah SWT kelancaran komunikasi dan diplomasi dalam pekerjaan, kerukunan bertetangga, serta keberkahan usaha perniagaan pesisir.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Ali bin Abu Bakar Al-Hamid (Kusamba Klungkung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ عَلِيِّ بْنِ أَبِي بَكْرِ بْنِ عُمَرَ الْحَامِدِ كُوسَامْبَا كْلُونْغكُونْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَأَلِّفْ بَيْنَ قُلُوبِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْحَبِيبِ عَلِيِّ بْنِ أَبِي بَكْرِ بْنِ عُمَرَ الْحَامِدِ كُوسَامْبَا كْلُونْغكُونْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَأَلِّفْ بَيْنَ قُلُوبِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Habiib 'Alii bin Abii Bakrin bin 'Umar al-Haamid Kusamba Klungkung Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa allif baina quluubinaa wanfa'naa bi barakaatihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Ali bin Abu Bakar bin Umar Al-Hamid Kusamba Klungkung Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, lembutkanlah dan satukanlah hati kami, serta limpahkanlah keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Habib Ali bin Abu Bakar bin Umar Al-Hamid Kusamba Klungkung Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, lembutkanlah dan satukanlah hati kami, serta limpahkanlah keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Maulid Nabi SAW (Haul Akbar Al-Habib Ali bin Abu Bakar Al-Hamid di Kampung Islam Kusamba, Kecamatan Dawan, Kabupaten Klungkung).',
    localAdab:
      'Mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi cungkup makam Kusamba, serta menjaga kebersihan lingkungan Pantai Kusamba dan Masjid Al-Mahdi.',
    facilities: ['Cungkup Makam Habib Ali bin Abu Bakar Al-Hamid', 'Masjid Al-Mahdi Kampung Islam Kusamba', 'Pendopo Istirahat & Tempat Wudhu', 'Area Parkir Bus Pantai Kusamba'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Wijaya, I Nyoman (2009). Islam di Klungkung: Sejarah Komunitas Muslim Kusamba dan Gelgel. Denpasar: Fakultas Sastra Universitas Udayana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'karangrupit-buleleng',
    legacyId: 'auliya-22',
    name: 'Makam Keramat Karangrupit — Syekh Haji Mukmin & Auliya Pesisir Utara (Temukus, Banjar, Kabupaten Buleleng)',
    title: 'Syekh Haji Mukmin Makam Keramat Karangrupit (Wali Pitu Bali di Pesisir Temukus Buleleng)',
    description:
      'Kompleks Makam Keramat Karangrupit di tepi pantai Desa Temukus, tempat peristirahatan Syekh Haji Mukmin dan ulama pelopor dakwah pesisir Bali Utara di Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – ke-17 M (Jaringan Dakwah Maritim Pesisir Utara Buleleng)',
    province: 'Bali',
    city: 'Buleleng',
    district: 'Kec. Banjar',
    address: 'Dusun Labuhan Aji / Karangrupit, Desa Temukus, Kec. Banjar (Jalur Singaraja–Seririt), Kabupaten Buleleng',
    location: {
      lat: -8.1795,
      lng: 114.9885,
      address: 'Dusun Labuhan Aji / Karangrupit, Desa Temukus, Kec. Banjar (Jalur Singaraja–Seririt), Kabupaten Buleleng',
      district: 'Kec. Banjar',
      city: 'Buleleng',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Danau_Buyan.jpg',
    imageSource: 'Wikimedia Commons — Lanskap Kabupaten Buleleng, Bali Utara (Wilayah Pesisir Temukus & Kompleks Makam Keramat Karangrupit)',
    sanad:
      'Syekh Haji Mukmin (Mbah Karangrupit); ulama sufi dan mubaligh maritim yang membuka pemukiman dakwah di pesisir Karangrupit, Desa Temukus, dekat pelabuhan kuno Labuhan Aji Buleleng bersama jaringan murid Kesultanan Cirebon dan Jawa Timur.',
    karya: [
      'Pembukaan titik dakwah dan surau pesisir Karangrupit di Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng',
      'Pembinaan spiritual para pelaut dan saudagar Muslim di jalur pelayaran Jawa–Buleleng–Lombok',
      'Warisan situs maqbarah Karangrupit yang dinaungi pepohonan rindang tepat di tepi laut Bali Utara',
    ],
    history:
      '**Kompleks Makam Keramat Karangrupit** di **Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali** adalah salah satu situs bersejarah dalam jaringan **Wali Pitu Bali** di pesisir utara Pulau Dewata. Kawasan Temukus dan Labuhan Aji sejak abad ke-16 hingga ke-19 M merupakan pelabuhan alam tempat bersandarnya perahu-perahu layar dari Cirebon, Gresik, Madura, dan Bugis yang berdagang di wilayah Kerajaan Buleleng (Panji Sakti).\n\nDi kompleks Karangrupit ini bersemayam **Syekh Haji Mukmin** (yang dikenal masyarakat setempat sebagai **Wali Karangrupit**) berdampingan dengan jejak dakwah **Syekh Abdul Qodir Muhammad (The Kwan Pao Lie)**. Dalam tradisi sejarah lisan Muslim Buleleng dan catatan Yayasan Al-Khidmah Wali Pitu Bali, Syekh Haji Mukmin adalah ulama sufi yang berdakwah dengan keteladanan akhlak, pengobatan tradisional, dan bimbingan rohani bagi masyarakat pesisir Temukus dan Pegayaman.\n\nNama *Karangrupit* sendiri merujuk pada formasi batu karang pantai yang menyempit (*rupit*) di pesisir Desa Temukus. Letaknya yang sangat strategis di tepi jalan raya utama **Singaraja–Seririt–Gilimanuk** menjadikan Makam Keramat Karangrupit sebagai titik persinggahan utama para peziarah yang menempuh jalur utara Bali.',
    karomah: [
      'Dalam riwayat tradisi lisan masyarakat Muslim Temukus dan peziarah Wali Pitu Bali (dicatat oleh H. Toyyib Zaen Arifin dan kajian Lektur Keagamaan Kemenag RI), lokasi makam Syekh Haji Mukmin di Karangrupit tetap terpelihara utuh dari abrasi gelombang laut utara Bali selama berabad-abad.<!--more-->\n\nSuasana cungkup makam yang teduh di bawah naungan pohon besar di tepi pantai memberikan ketenangan batin yang mendalam bagi para peziarah yang bermunajat di sana.',
    ],
    untoldStory:
      'Wilayah Kabupaten Buleleng di Bali Utara menyimpan sejarah panjang akulturasi Islam dan budaya Bali sejak masa raja **Ki Barak Panji Sakti** pada abad ke-17 M, yang menghadiahkan desa perbukitan **Pegayaman** kepada prajurit Muslim asal Blambangan dan Mataram.<!--more-->\n\nDi pesisir baratnya, pelabuhan **Labuhan Aji dan Karangrupit (Desa Temukus)** menjadi pintu masuk para ulama dan habaib yang berdakwah melalui jalur laut.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Keramat Karangrupit (Syekh Haji Mukmin) di Temukus Buleleng umumnya bertawassul memohon kepada Allah SWT keselamatan dalam perjalanan jauh di darat maupun di laut, keteguhan hati dalam merantau mencari nafkah halal, serta ketenangan jiwa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Haji Mukmin (Makam Keramat Karangrupit Buleleng)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْحَاجِّ مُؤْمِنٍ وَأَوْلِيَاءِ كَارَانْغرُوبِيتْ بُولِيلِينْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَسَلِّمْنَا فِي أَسْفَارِنَا وَبَارِكْ فِي أَرْزَاقِنَا يَا أَرْحَمَ الرَّاحِمِينَ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْحَاجِّ مُؤْمِنٍ وَأَوْلِيَاءِ كَارَانْغرُوبِيتْ بُولِيلِينْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَسَلِّمْنَا فِي أَسْفَارِنَا وَبَارِكْ فِي أَرْزَاقِنَا يَا أَرْحَمَ الرَّاحِمِينَ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh al-Haajj Mu'min wa Auliyaa-i Karangrupit Buleleng Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa sallimnaa fii asfaarinaa wa baarik fii arzaaqinaa yaa Arhamar-Raahimiin.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Haji Mukmin beserta para auliya Karangrupit Buleleng Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, selamatkanlah kami dalam perjalanan kami, dan berkahilah rezeki kami wahai Dzat Yang Maha Penyayang.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Haji Mukmin beserta para auliya Karangrupit Buleleng Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, selamatkanlah kami dalam perjalanan kami, dan berkahilah rezeki kami wahai Dzat Yang Maha Penyayang.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Maulid Nabi SAW (Pengajian & Haul Bersama Makam Keramat Karangrupit di Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng).',
    localAdab:
      'Berpakaian sopan menutup aurat, melepas alas kaki saat memasuki pendopo cungkup Karangrupit, menjaga kebersihan area pantai Temukus, serta tidak melakukan perbuatan yang menyalahi syariat.',
    facilities: ['Cungkup Makam Keramat Karangrupit', 'Musholla & Pendopo Dzikir Peziarah', 'Kamar Mandi & Tempat Wudhu', 'Area Parkir Bus Jalur Singaraja–Seririt'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Saifuddin, Ahmad dkk. (2018). Sejarah dan Tradisi Ziarah Wali Pitu di Pulau Bali. Jurnal Lektur Keagamaan Kementerian Agama RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'the-kwan-lie-buleleng',
    name: 'Makam The Kwan Pao Lie — Syekh Abdul Qodir Muhammad (Labuhan Aji / Temukus, Banjar, Kabupaten Buleleng)',
    title: 'The Kwan Pao Lie Syekh Abdul Qodir Muhammad (Wali Pitu Bali & Murid Sunan Gunung Jati di Temukus Buleleng)',
    description:
      'Maqbarah Syekh Abdul Qodir Muhammad (nama asal Tionghoa: The Kwan Pao Lie), bangsawan dan tabib Muslim murid Sunan Gunung Jati Cirebon yang berdakwah di Labuhan Aji / Karangrupit, Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (Zaman Dakwah Kanjeng Sunan Gunung Jati Cirebon & Pesisir Bali Utara)',
    province: 'Bali',
    city: 'Buleleng',
    district: 'Kec. Banjar',
    address: 'Kawasan Karangrupit / Labuhan Aji, Desa Temukus, Kec. Banjar, Kabupaten Buleleng',
    location: {
      lat: -8.1798,
      lng: 114.9888,
      address: 'Kawasan Karangrupit / Labuhan Aji, Desa Temukus, Kec. Banjar, Kabupaten Buleleng',
      district: 'Kec. Banjar',
      city: 'Buleleng',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Danau_Buyan.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Kabupaten Buleleng, Bali Utara (Situs Maqbarah Syekh Abdul Qodir Muhammad / The Kwan Pao Lie di Temukus)',
    sanad:
      'Syekh Abdul Qodir Muhammad (The Kwan Pao Lie); ulama dan tabib keturunan Tionghoa yang memeluk Islam serta mengambil baiat tarekat langsung dari Kanjeng Sunan Gunung Jati (Syekh Syarif Hidayatullah) di Kesultanan Cirebon sebelum berhijrah ke Bali Utara.',
    karya: [
      'Dakwah bil-hal melalui pengobatan tradisional cuma-cuma (ketabiban Tionghoa-Islam) bagi penduduk pesisir Buleleng',
      'Jembatan akulturasi persaudaraan antara komunitas Tionghoa, Muslim Jawa-Melayu, dan masyarakat adat Bali Utara',
      'Pembinaan jamaah dzikir di kawasan Labuhan Aji dan Karangrupit, Desa Temukus, Kabupaten Buleleng',
    ],
    history:
      '**Syekh Abdul Qodir Muhammad**—yang memiliki nama lahir Tionghoa **The Kwan Pao Lie** (atau **The Kwan Lie**)—adalah salah satu figur paling unik dalam sejarah penyebaran Islam di Nusantara dan rangkaian **Wali Pitu Bali**. Berdasarkan literatur manaqib Wali Pitu Bali dan kajian sejarah Islam pesisir (Dr. Dhurorudin Mashad, 2014), beliau semula adalah seorang bangsawan dan ahli pengobatan (tabib) asal daratan Tiongkok yang merantau ke Pulau Jawa pada abad ke-16 M.\n\nSaat singgah di **Kesultanan Cirebon**, The Kwan Pao Lie bertemu dengan **Kanjeng Sunan Gunung Jati (Syekh Syarif Hidayatullah)** yang memiliki permaisuri keturunan Tionghoa (Putri Ong Tien Nio). Terpikat oleh keluhuran budi dan kedalaman ilmu tasawuf Sunan Gunung Jati, The Kwan Pao Lie memeluk agama Islam, mendalami ilmu tauhid serta tarekat, dan diberi nama Islam **Syekh Abdul Qodir Muhammad**.\n\nKetika gejolak politik terjadi di pesisir Jawa, beliau mendapat isyarat dari gurunya untuk melanjutkan pengembaraan dakwah ke arah timur hingga berlabuh di **Labuhan Aji / Karangrupit, Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng (Bali Utara)**. Di sana beliau mengabdikan hidupnya mengobati masyarakat tanpa memungut bayaran dan mengajarkan ketauhidan hingga wafat dan dimakamkan di kompleks Karangrupit Temukus.',
    karomah: [
      'Dalam riwayat manaqib Wali Pitu Bali (KH. Toyyib Zaen Arifin) dan tradisi lisan masyarakat Temukus Buleleng, Syekh Abdul Qodir Muhammad (The Kwan Pao Lie) dikenal memiliki keahlian pengobatan yang disertai doa mustajab, sehingga banyak warga Bali Utara yang sembuh dari wabah penyakit berkat wasilah doa dan ramuan beliau.<!--more-->\n\nKeberadaan makam beliau di Karangrupit Temukus menjadi bukti historis bahwa dakwah Wali Songo merangkul multi-etnis, termasuk ulama keturunan Tionghoa yang menyebarkan kasih sayang di Pulau Bali.',
    ],
    untoldStory:
      'Tidak jauh dari lokasi makam **Syekh Abdul Qodir Muhammad (The Kwan Pao Lie)** di Desa Temukus, Kecamatan Banjar, berdiri pula pelabuhan tua **Labuhan Aji** dan klenteng pesisir yang menunjukkan betapa kosmopolitannya bandar Buleleng sejak berabad-abad silam.<!--more-->\n\nPeziarah dari berbagai latar belakang etnis (Jawa, Madura, Bugis, hingga Tionghoa Muslim) rutin berziarah ke pusara beliau untuk mengenang jejak murid Sunan Gunung Jati di Bali Utara.',
    barokahHajat:
      'Peziarah yang berziarah ke makam Syekh Abdul Qodir Muhammad (The Kwan Pao Lie) di Temukus Buleleng umumnya bertawassul memohon kepada Allah SWT kesembuhan dari berbagai penyakit lahir maupun batin, keberkahan usaha pengobatan dan perniagaan, serta kemantapan hidayah iman.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Qodir Muhammad / The Kwan Pao Lie (Temukus Buleleng)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْقَادِرِ مُحَمَّدٍ تِي كْوَانْ بَاوْ لِي تِيمُوكُوسْ بُولِيلِينْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاشْفِ مَرْضَانَا وَعَافِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْقَادِرِ مُحَمَّدٍ تِي كْوَانْ بَاوْ لِي تِيمُوكُوسْ بُولِيلِينْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاشْفِ مَرْضَانَا وَعَافِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh 'Abdil-Qaadir Muhammad (The Kwan Pao Lie) Temukus Buleleng Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wasyfi mardhaanaa wa 'aafinaa wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Abdul Qodir Muhammad (The Kwan Pao Lie) Temukus Buleleng Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, sembuhkanlah yang sakit di antara kami, berikanlah afiat, dan limpahkanlah keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Abdul Qodir Muhammad (The Kwan Pao Lie) Temukus Buleleng Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, sembuhkanlah yang sakit di antara kami, berikanlah afiat, dan limpahkanlah keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Rabiul Awal (Haul & Ziarah Akbar Syekh Abdul Qodir Muhammad / The Kwan Pao Lie di Kompleks Karangrupit, Desa Temukus, Kecamatan Banjar, Kabupaten Buleleng).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam, menjaga ketertiban rombongan, serta mengikuti arahan juru kunci Karangrupit Temukus.',
    facilities: ['Cungkup Makam Syekh Abdul Qodir Muhammad (The Kwan Pao Lie)', 'Musholla & Pendopo Peziarah Karangrupit', 'Tempat Wudhu & Toilet', 'Area Parkir Bus Ziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Arifin, Toyyib Zaen (2002). Manaqib Wali Pitu di Bali. Surabaya: Yayasan Al-Khidmah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-keramat-kembar-denpasar',
    name: 'Makam Keramat Agung Pemecutan — Raden Amangkuningrat & Situs Keramat Kembar (Pemecutan, Denpasar Barat, Kota Denpasar)',
    title: 'Raden Amangkuningrat Makam Keramat Kembar (Auliya Kawasan Puri Pemecutan Denpasar, Abad ke-18 M)',
    description:
      'Kompleks Makam Keramat Kembar / Keramat Agung Pemecutan, tempat peristirahatan Raden Amangkuningrat (bangsawan Muslim asal Madura/Blambangan yang memiliki ikatan sejarah dengan Puri Pemecutan) di Kecamatan Denpasar Barat, Kota Denpasar, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 – ke-18 M (Masa Persahabatan Kerajaan Pemecutan Badung dengan Bangsawan Muslim Madura & Blambangan)',
    province: 'Bali',
    city: 'Denpasar',
    district: 'Kec. Denpasar Barat',
    address: 'Kawasan Pemecutan, Kec. Denpasar Barat, Kota Denpasar',
    location: {
      lat: -8.6592,
      lng: 115.2045,
      address: 'Kawasan Pemecutan, Kec. Denpasar Barat, Kota Denpasar',
      district: 'Kec. Denpasar Barat',
      city: 'Denpasar',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/001_Bajra_Sandhi_Monument_from_Behind%2C_Bajra_Sandhi_Monument%2C_Denpasar_City%2C_Bali%2C_photograph_by_Anandajoti_Bhikkhu.jpg',
    imageSource: 'Wikimedia Commons — Kota Denpasar, Bali (Wilayah Puri Pemecutan & Situs Makam Keramat Kembar Denpasar Barat)',
    sanad:
      'Raden Amangkuningrat; tokoh bangsawan dan mubaligh Muslim asal kadipaten pesisir Jawa Timur/Madura yang menjalin hubungan kekerabatan dan diplomasi dengan lingkungan Kerajaan Mengwi dan Puri Pemecutan di Badung/Denpasar.',
    karya: [
      'Jejak sejarah akulturasi dan persaudaraan antara bangsawan Muslim Jawa-Madura dengan keluarga besar Puri Pemecutan Denpasar',
      'Pembinaan komunitas Muslim awal di kawasan Kampung Jawa dan Pemecutan, Kota Denpasar',
      'Warisan situs Makam Keramat Kembar Pemecutan yang diziarahi masyarakat Muslim dan dihormati warga puri setempat',
    ],
    history:
      '**Makam Keramat Kembar (Keramat Agung Pemecutan)** yang berlokasi di kawasan **Pemecutan, Kecamatan Denpasar Barat, Kota Denpasar, Provinsi Bali** merupakan situs sejarah Islam yang erat kaitannya dengan jaringan kekerabatan bangsawan **Blambangan, Madura, Mengwi, dan Puri Pemecutan Badung** pada abad ke-17 hingga ke-18 M. Tokoh yang dimuliakan di situs ini dikenal dengan gelar **Raden Amangkuningrat**, seorang pangeran dan mubaligh Muslim yang memiliki pertalian sejarah dengan **Pangeran Mas Sepuh (Keramat Pantai Seseh)** serta kisah masuk Islamnya **Ratu Ayu Anak Agung Rai (Siti Khotijah)**.\n\nBerdasarkan kajian sejarah sosial Muslim Denpasar (Universitas Udayana dan Dr. Dhurorudin Mashad, 2014), hubungan antara Puri Pemecutan di Denpasar dengan komunitas Muslim sejak abad ke-18 M terjalin sangat erat, baik melalui pernikahan bangsawan maupun bantuan militer prajurit Muslim yang kemudian dianugerahi pemukiman di **Kampung Jawa (Wanasari)** dan **Kepamogan**.\n\nSitus Makam Keramat Kembar di Pemecutan Denpasar Barat ini menjadi pengingat abadi bahwa penyebaran Islam di jantung Kota Denpasar berlangsung melalui jalur kekeluargaan, penghormatan adat, dan keluhuran akhlak para bangsawan sufi.',
    karomah: [
      'Dalam tradisi lisan masyarakat Muslim Pemecutan dan peziarah Bali, keberadaan Makam Keramat Kembar di tengah kawasan pusat Kota Denpasar yang padat tetap terjaga kelestarian dan kehormatannya berkat rasa takzim bersama antara warga Muslim dan keluarga besar Puri Pemecutan.<!--more-->\n\nBanyak peziarah yang singgah di situs ini merasakan suasana teduh dan ketenteraman batin di tengah hiruk-pikuk Kota Denpasar.',
    ],
    untoldStory:
      'Keluarga besar **Puri Agung Pemecutan** di Denpasar Barat sejak berabad-abad silam dikenal sebagai pelindung komunitas Muslim (*nyama selam*) di Denpasar. Bahkan di dalam lingkungan pemakaman keramat Pemecutan, tata krama ziarah Islam dan penghormatan leluhur Bali berjalan berdampingan tanpa pernah terjadi gesekan.<!--more-->\n\nHal ini menjadikan kawasan Pemecutan Denpasar Barat sebagai laboratorium sejarah toleransi beragama terbaik di Nusantara.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Keramat Kembar (Raden Amangkuningrat) di Pemecutan Denpasar Barat umumnya bertawassul memohon kepada Allah SWT kerukunan keluarga besar, kelancaran urusan pekerjaan dan usaha di perantauan, serta perlindungan dari fitnah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Raden Amangkuningrat (Makam Keramat Kembar Pemecutan Denpasar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ رَادِينْ أَمَانْغكُونِينْغرَاتْ وَأَوْلِيَاءِ فِيمِيتْشُوتَانْ دِينْبَاسَارْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَصْلِحْ ذَاتَ بَيْنِنَا وَبَارِكْ لَنَا فِي أَرْزَاقِنَا وَذُرِّيَّاتِنَا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ رَادِينْ أَمَانْغكُونِينْغرَاتْ وَأَوْلِيَاءِ فِيمِيتْشُوتَانْ دِينْبَاسَارْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَصْلِحْ ذَاتَ بَيْنِنَا وَبَارِكْ لَنَا فِي أَرْزَاقِنَا وَذُرِّيَّاتِنَا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Raaden Amangkuningrat wa Auliyaa-i Pemecutan Denpasar Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa ashlih dzaata baininaa wa baarik lanaa fii arzaaqinaa wa dzurriyyaatinaa.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Raden Amangkuningrat beserta para auliya Pemecutan Denpasar Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, rukunkanlah hubungan di antara kami, serta berkahilah rezeki dan keturunan kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Raden Amangkuningrat beserta para auliya Pemecutan Denpasar Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, rukunkanlah hubungan di antara kami, serta berkahilah rezeki dan keturunan kami.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Maulid Nabi SAW (Ziarah & Doa Bersama di Kompleks Makam Keramat Pemecutan, Kecamatan Denpasar Barat, Kota Denpasar).',
    localAdab:
      'Wajib berpakaian sopan menutup aurat, menjaga ketenangan di kawasan pemukiman Pemecutan Denpasar Barat, melepas alas kaki di batas cungkup, serta menghormati kearifan lokal masyarakat sekitar.',
    facilities: ['Cungkup Makam Keramat Kembar Pemecutan', 'Musholla & Tempat Wudhu Peziarah', 'Area Parkir Kendaraan Peziarah'],
    openingHours: 'Buka Setiap Hari 07.00 – 22.00 WITA',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Saifuddin, Ahmad dkk. (2018). Sejarah dan Tradisi Ziarah Wali Pitu di Pulau Bali. Jurnal Lektur Keagamaan Kementerian Agama RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'pangeran-mas-sepuh-seseh',
    legacyId: 'auliya-13',
    name: 'Makam Pangeran Mas Sepuh — Raden Amangkuningrat / Syekh Achmad Khaeruman (Pantai Seseh, Cemagi, Mengwi, Kabupaten Badung)',
    title: 'Pangeran Mas Sepuh Keramat Pantai Seseh (Wali Pitu Bali Putra Raja Mengwi & Blambangan, Abad ke-18 M)',
    description:
      'Kompleks Makam Keramat Pantai Seseh di tepi Samudra Hindia, tempat peristirahatan Pangeran Mas Sepuh (Raden Amangkuningrat / Syekh Achmad Khaeruman, Wali Pitu Pesisir Barat Daya Bali) di Desa Cemagi, Kecamatan Mengwi, Kabupaten Badung, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Masa Kerajaan Mengwi & Blambangan)',
    province: 'Bali',
    city: 'Badung',
    district: 'Kec. Mengwi',
    address: 'Pantai Seseh, Desa Cemagi, Kec. Mengwi, Kabupaten Badung',
    location: {
      lat: -8.6345,
      lng: 115.1128,
      address: 'Pantai Seseh, Desa Cemagi, Kec. Mengwi, Kabupaten Badung',
      district: 'Kec. Mengwi',
      city: 'Badung',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Tanah_Lot_Bali_Indonesia.jpg',
    imageSource: 'Wikimedia Commons — Pesisir Pantai Barat Daya Kabupaten Badung, Bali (Jalur Pantai Seseh & Tanah Lot, Lokasi Makam Keramat Pangeran Mas Sepuh)',
    sanad:
      'Pangeran Mas Sepuh (Raden Amangkuningrat / Syekh Achmad Khaeruman); putra Raja Mengwi I Gusti Agung Putu (Cokorda Sakti Blambangan) dari ibu putri bangsawan Muslim Blambangan (Jawa Timur), yang dididik dalam tradisi keislaman pesisir Jawa Timur.',
    karya: [
      'Jembatan spiritual dan kekeluargaan antara bangsawan Kerajaan Mengwi (Bali) dengan Kesultanan/Kadipaten Blambangan (Jawa Timur)',
      'Situs Cagar Budaya & Religi Makam Keramat Pantai Seseh di Desa Cemagi, Mengwi, Badung yang dihormati umat Islam dan masyarakat adat Desa Cemagi',
      'Keteladanan bakti anak kepada kedua orang tua lintas wilayah Jawa–Bali',
    ],
    history:
      '**Pangeran Mas Sepuh**—yang juga dikenal dengan gelar **Raden Amangkuningrat** atau **Syekh Achmad Khaeruman**—adalah tokoh bangsawan sufi abad ke-18 M yang makamnya di **Pantai Seseh, Desa Cemagi, Kecamatan Mengwi, Kabupaten Badung** menjadi salah satu simpul paling terkenal dalam jaringan **Wali Pitu Bali**. Berdasarkan kajian sejarah dan babad Mengwi–Blambangan (Dr. Dhurorudin Mashad, 2014), beliau adalah putra dari Raja Mengwi **I Gusti Agung Putu (Cokorda Sakti Blambangan)** dari pernikahannya dengan putri penguasa Blambangan di Jawa Timur.\n\nSejak kecil, Pangeran Mas Sepuh tumbuh dan diasuh di lingkungan keluarga ibunya di Blambangan dalam pendidikan agama Islam yang taat. Ketika beranjak dewasa, beliau merindukan ayahandanya dan berlayar menyeberangi Selat Bali bersama para pengawal Muslim menuju **Pantai Seseh (wilayah Kerajaan Mengwi, Badung)**.\n\nSetibanya di Pantai Seseh, terjadi kesalahpahaman tragis dengan pasukan penjaga pantai Kerajaan Mengwi yang mengira rombongan beliau adalah pasukan penyerbu, hingga terjadi pertempuran yang menyebabkan beliau gugur syahid di tepi Pantai Seseh. Ketika Raja Mengwi mengetahui bahwa pemuda berwibawa yang gugur dengan pusaka keris kerajaan tersebut adalah darah dagingnya sendiri, sang raja sangat berduka dan memerintahkan agar makam putranya di Pantai Seseh dibangun serta dijaga dengan penuh kehormatan oleh masyarakat adat Desa Cemagi hingga akhir zaman.',
    karomah: [
      'Dalam tradisi lisan masyarakat adat Desa Cemagi dan manaqib Wali Pitu Bali, saat Pangeran Mas Sepuh wafat di Pantai Seseh, senjata prajurit tidak dapat melukai tubuh beliau sebelum beliau sendiri mengikhlaskan kepergiannya setelah bersuci di tepi laut.<!--more-->\n\nSelain itu, walaupun cungkup makam beliau berdiri sangat dekat dengan bibir Pantai Seseh yang berombak besar, area maqbarah beliau senantiasa aman dari terjangan pasang laut dan dirawat bersama oleh krama adat Desa Cemagi serta pengurus Muslim.',
    ],
    untoldStory:
      'Keunikan **Makam Keramat Pantai Seseh** di Kecamatan Mengwi, Kabupaten Badung terletak pada harmoni penjagaannya: tepat di sebelah cungkup makam Islam Pangeran Mas Sepuh berdiri pura pesisir Desa Adat Cemagi, dan setiap kali ada acara haul atau kunjungan rombongan ziarah, pecalang Desa Adat Cemagi turut membantu mengatur kelancaran lalu lintas peziarah.<!--more-->\n\nKisah hidup Pangeran Mas Sepuh mengabadikan ikatan darah yang tak terpisahkan antara masyarakat Jawa Timur (Blambangan) dan masyarakat Bali (Mengwi).',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Keramat Pantai Seseh (Pangeran Mas Sepuh) di Mengwi Badung umumnya bertawassul memohon kepada Allah SWT keutuhan kasih sayang antara orang tua dan anak, keteguhan iman di mana pun berada, serta perlindungan dari kesalahpahaman dan fitnah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pangeran Mas Sepuh (Makam Keramat Pantai Seseh Badung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ أَحْمَدَ خَيْرُمَانْ فَائِيرَانْ مَاسْ سِيبُوهْ سِيسِيهْ بَادُونْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْصِمْنَا مِنَ الْفِتَنِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ أَحْمَدَ خَيْرُمَانْ فَائِيرَانْ مَاسْ سِيبُوهْ سِيسِيهْ بَادُونْغ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْصِمْنَا مِنَ الْفِتَنِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Ahmad Khairuman Pangeran Mas Sepuh Seseh Badung Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa'shimnaa minal-fitani wanfa'naa bi barakaatihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Achmad Khaeruman (Pangeran Mas Sepuh) Pantai Seseh Badung Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, lindungilah kami dari segala fitnah, serta limpahkanlah keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Achmad Khaeruman (Pangeran Mas Sepuh) Pantai Seseh Badung Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, lindungilah kami dari segala fitnah, serta limpahkanlah keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Syawal (Haul Akbar Pangeran Mas Sepuh di Kompleks Makam Keramat Pantai Seseh, Desa Cemagi, Kecamatan Mengwi, Kabupaten Badung).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam, menghormati pura dan aturan adat Desa Cemagi di sekitar Pantai Seseh, serta memarkir bus besar di kantong parkir yang telah ditentukan guna menggunakan shuttle lokal.',
    facilities: ['Cungkup Makam Keramat Pantai Seseh', 'Musholla & Pendopo Dzikir Tepi Pantai', 'Tempat Wudhu & Toilet Peziarah', 'Shuttle Transportasi dari Kantong Parkir Bus Cemagi'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Schulte Nordholt, Henk (1996). The Spell of Power: A History of Balinese Politics, 1650–1940. Leiden: KITLV Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'siti-khotijah-denpasar',
    legacyId: 'auliya-23',
    name: 'Makam Ratu Ayu Anak Agung Rai — Siti Khotijah (Pemecutan Klod / Monang-Maning, Denpasar Barat, Kota Denpasar)',
    title: 'Siti Khotijah Ratu Ayu Anak Agung Rai (Wali Pitu Bali Putri Bangsawan Puri Pemecutan Denpasar)',
    description:
      'Kompleks Makam Keramat Ratu Ayu Siti Khotijah (Gusti Ayu Made Rai), putri bangsawan Puri Pemecutan/Mengwi yang memeluk Islam dan wafat saat melaksanakan shalat malam di kawasan Monang-Maning, Kelurahan Pemecutan Klod, Kecamatan Denpasar Barat, Kota Denpasar, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 M (Masa Kerajaan Badung / Puri Agung Pemecutan Denpasar)',
    province: 'Bali',
    city: 'Denpasar',
    district: 'Kec. Denpasar Barat',
    address: 'Jl. Gunung Batukaru (Kawasan Monang-Maning), Kel. Pemecutan Klod, Kec. Denpasar Barat, Kota Denpasar',
    location: {
      lat: -8.6652,
      lng: 115.1985,
      address: 'Jl. Gunung Batukaru (Kawasan Monang-Maning), Kel. Pemecutan Klod, Kec. Denpasar Barat, Kota Denpasar',
      district: 'Kec. Denpasar Barat',
      city: 'Denpasar',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/001_Bajra_Sandhi_Monument_from_Behind%2C_Bajra_Sandhi_Monument%2C_Denpasar_City%2C_Bali%2C_photograph_by_Anandajoti_Bhikkhu.jpg',
    imageSource: 'Wikimedia Commons — Kota Denpasar, Bali (Kawasan Pemecutan Klod, Lokasi Makam Keramat Ratu Ayu Siti Khotijah)',
    sanad:
      'Ratu Ayu Anak Agung Rai (Gusti Ayu Made Rai / Raden Ayu Siti Khotijah); putri bangsawan Puri Pemecutan/Mengwi yang memeluk Islam setelah sembuh dari sakit keras melalui perantaraan doa pangeran Muslim asal Bangkalan Madura (Raden Cakraningrat / Pangeran Sosrodiningrat).',
    karya: [
      'Simbol keteguhan iman muslimah bangsawan Bali dan kesucian ibadah shalat malam (tahajud)',
      'Pengikat persaudaraan abadi antara keluarga besar Puri Agung Pemecutan Denpasar dengan umat Islam Nusantara',
      'Kompleks Makam Keramat Ratu Ayu Siti Khotijah di Monang-Maning Denpasar yang diziarahi ribuan jamaah setiap pekan',
    ],
    history:
      '**Ratu Ayu Anak Agung Rai**—yang memiliki nama gadis **Gusti Ayu Made Rai** dan setelah memeluk Islam bergelar **Raden Ayu Siti Khotijah**—adalah satu-satunya tokoh perempuan dalam deretan **Wali Pitu di Pulau Bali**. Berdasarkan kajian sejarah budaya Universitas Udayana dan buku *Muslim Bali* (Dr. Dhurorudin Mashad, 2014), beliau adalah putri bangsawan Kerajaan Pemecutan/Mengwi pada abad ke-18 M yang pernah jatuh sakit keras hingga tak kunjung sembuh.\n\nRaja kemudian mengadakan sayembara bahwa siapa pun yang mampu menyembuhkan sang putri akan diangkat menjadi pendampingnya. Seorang bangsawan dan ulama Muslim asal **Bangkalan, Madura** (dalam riwayat disebut **Pangeran Cakraningrat / Sosrodiningrat**) berhasil menyembuhkan Gusti Ayu Made Rai melalui munajat doa kepada Allah SWT. Sang putri pun mantap memeluk agama Islam dengan kesadaran penuh, mengucapkan dua kalimat syahadat, dan menyandang nama **Siti Khotijah**.\n\nSuatu malam, ketika Siti Khotijah sedang khusyuk melaksanakan shalat tahajud mengenakan mukena putih di dalam biliknya, memancar cahaya terang benderang menyerupai kobaran api dari tubuh beliau. Para prajurit pengawal istana yang mengira terjadi kebakaran atau gangguan ilmu hitam melempar tombak ke arah cahaya tersebut hingga Siti Khotijah wafat syahidah dalam keadaan bersujud. Mengetahui kesucian dan ketulusan iman sang putri, Raja Pemecutan sangat menyesal dan menetapkan makam beliau di kawasan **Pemecutan Klod (Monang-Maning), Denpasar Barat** sebagai makam keramat yang wajib dihormati dan dijaga oleh keluarga puri beserta umat Islam selamanya.',
    karomah: [
      'Dalam tradisi lisan Puri Pemecutan dan manaqib Wali Pitu Bali, memancarnya cahaya terang dari bilik ibadah Ratu Ayu Siti Khotijah saat melaksanakan shalat malam serta harum semerbak yang keluar dari jasad beliau ketika wafat menjadi kesaksian nyata kemuliaan derajat kewalian beliau.<!--more-->\n\nDi kompleks maqbarah beliau di Jl. Gunung Batukaru Denpasar juga tumbuh pohon tua yang menembus atap cungkup dan dirawat dengan penuh takzim oleh pengelola makam.',
    ],
    untoldStory:
      'Hingga hari ini, pengelolaan **Makam Keramat Ratu Ayu Siti Khotijah** di Monang-Maning, Denpasar Barat dilakukan secara bersama-sama oleh yayasan pengelola yang melibatkan unsur tokoh keluarga besar **Puri Agung Pemecutan** dan tokoh Muslim Denpasar.<!--more-->\n\nSetiap peziarah yang datang diingatkan untuk menjaga adab kesopanan tertinggi serta tidak membawa atau mengonsumsi daging sapi di dalam area kompleks makam guna menghormati kearifan adat keluarga Puri Pemecutan.',
    barokahHajat:
      'Peziarah—khususnya kaum ibu, remaja putri, dan keluarga—yang berziarah ke maqbarah Ratu Ayu Siti Khotijah di Denpasar umumnya bertawassul memohon kepada Allah SWT kemantapan iman hingga husnul khatimah, kesembuhan dari penyakit berat, kemudahan jodoh yang shalih, serta kekhusyukan dalam ibadah malam.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Ratu Ayu Siti Khotijah (Pemecutan Denpasar)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيَّةِ الصَّالِحَةِ رَاتُو أَيُو سِيتِي خَدِيجَةَ فِيمِيتْشُوتَانْ دِينْبَاسَارْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَثَبِّتْ إِيمَانَنَا وَارْزُقْنَا حُسْنَ الْخَاتِمَةِ وَنُورَ الطَّاعَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيَّةِ الصَّالِحَةِ رَاتُو أَيُو سِيتِي خَدِيجَةَ فِيمِيتْشُوتَانْ دِينْبَاسَارْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَثَبِّتْ إِيمَانَنَا وَارْزُقْنَا حُسْنَ الْخَاتِمَةِ وَنُورَ الطَّاعَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyatish-Shaalihah Raatu Ayu Siti Khadiijah Pemecutan Denpasar Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahaa warhamhaa wa tsabbit iimaananaa warzuqnaa husnal-khaatimati wa nuurath-thaa'ah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyah yang shalihah Ratu Ayu Siti Khotijah Pemecutan Denpasar Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah iman kami, serta karuniakanlah kepada kami husnul khatimah dan cahaya ketaatan.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyah yang shalihah Ratu Ayu Siti Khotijah Pemecutan Denpasar Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah iman kami, serta karuniakanlah kepada kami husnul khatimah dan cahaya ketaatan.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Rajab (Peringatan Haul Ratu Ayu Anak Agung Rai / Siti Khotijah di Kompleks Makam Keramat Pemecutan Klod, Denpasar Barat).',
    localAdab:
      'Wajib mengenakan busana muslim/muslimah yang menutup aurat secara sempurna, memisahkan shaf peziarah laki-laki dan perempuan, tidak membawa makanan berbahan daging sapi ke area makam untuk menghormati keluarga Puri Pemecutan, serta mematuhi jam operasional (07.00–22.00 WITA).',
    facilities: ['Cungkup Utama Makam Ratu Ayu Siti Khotijah', 'Pendopo Dzikir Pria & Wanita Terpisah', 'Musholla, Tempat Wudhu & Toilet Bersih', 'Area Parkir Bus Luas Jl. Gunung Batukaru'],
    openingHours: 'Buka Setiap Hari 07.00 – 22.00 WITA',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Jurnal Studi Budaya Fakultas Ilmu Budaya Universitas Udayana: Situs Makam Keramat Ratu Ayu Siti Khotijah di Pemecutan Denpasar.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-umar-bedugul-tabanan',
    legacyId: 'auliya-14',
    name: 'Makam Syekh Habib Umar bin Maulana Yusuf Al-Maghribi (Bukit Bedugul, Candikuning, Baturiti, Kabupaten Tabanan)',
    title: 'Syekh Habib Umar Bukit Bedugul (Wali Pitu Bali di Atas Danau Beratan Tabanan, Abad ke-17 M)',
    description:
      'Kompleks Makam Keramat Puncak Bukit Bedugul pada ketinggian 1.400 mdpl di atas Danau Beratan, tempat peristirahatan Syekh Habib Umar bin Maulana Yusuf Al-Maghribi (Wali Pitu Pegunungan Tengah Bali) di Desa Candikuning, Kecamatan Baturiti, Kabupaten Tabanan, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 M (Masa Dakwah Sufi di Pegunungan Tengah Pulau Bali)',
    province: 'Bali',
    city: 'Tabanan',
    district: 'Kec. Baturiti',
    address: 'Puncak Bukit Bedugul (Sebelah Utara Kebun Raya / Danau Beratan), Desa Candikuning, Kec. Baturiti, Kabupaten Tabanan',
    location: {
      lat: -8.2735,
      lng: 115.1612,
      address: 'Puncak Bukit Bedugul (Sebelah Utara Kebun Raya / Danau Beratan), Desa Candikuning, Kec. Baturiti, Kabupaten Tabanan',
      district: 'Kec. Baturiti',
      city: 'Tabanan',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ulun_Danu_Beratan_Temple_Bali.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Danau Beratan & Perbukitan Bedugul, Desa Candikuning, Baturiti, Tabanan (Lokasi Makam Keramat Bukit Bedugul)',
    sanad:
      'Syekh Habib Umar bin Maulana Yusuf Al-Maghribi; waliyullah dan sufi uzlah yang berdakwah serta membuka komunitas Muslim pegunungan di Desa Candikuning, Bedugul, Kabupaten Tabanan.',
    karya: [
      'Perintisan komunitas Muslim pegunungan di Desa Candikuning (Kampung Islam Candikuning I & II), Kecamatan Baturiti, Kabupaten Tabanan',
      'Situs Maqbarah Puncak Bukit Bedugul yang menyatu dengan kelestarian hutan lindung di atas Danau Beratan',
      'Tradisi harmoni masyarakat Muslim Candikuning dan krama adat Bedugul dalam menjaga kelestarian alam danau dan hutan',
    ],
    history:
      '**Syekh Habib Umar bin Maulana Yusuf Al-Maghribi** adalah waliyullah penyebar Islam di kawasan pegunungan tengah Pulau Bali yang pusaranya di **Puncak Bukit Bedugul, Desa Candikuning, Kecamatan Baturiti, Kabupaten Tabanan** menjadi salah satu titik utama dalam **Wali Pitu Bali**. Berada di puncak perbukitan hutan hujan tropis pada ketinggian lebih dari 1.400 meter di atas permukaan laut yang menghadap langsung ke **Danau Beratan**, maqbarah ini menawarkan suasana uzlah dan tafakur alam yang sangat hening.\n\nBerdasarkan kajian sejarah komunitas Muslim Candikuning (Dr. Dhurorudin Mashad, 2014) dan penuturan sesepuh setempat, keberadaan makam keramat di Bukit Bedugul berkaitan erat dengan sejarah berdirinya pemukiman Muslim **Desa Candikuning** serta **Masjid Besar Al-Hidayah Bedugul** yang berada tepat di tepi tebing barat Danau Beratan.\n\nUntuk mencapai cungkup makam Syekh Habib Umar bin Maulana Yusuf Al-Maghribi, para peziarah meniti ratusan anak tangga membelah hutan lindung Bukit Bedugul yang berudara sejuk berkabut. Perjuangan fisik mendaki anak tangga menuju puncak bukit ini dimaknai oleh para peziarah sebagai simbol *mujahadah* (kesungguhan batin) dalam mendekatkan diri kepada Allah SWT.',
    karomah: [
      'Dalam catatan rihlah KH. Toyyib Zaen Arifin (penemu kembali jalur ziarah Wali Pitu Bali pada tahun 1991 M), letak makam Syekh Habib Umar bin Maulana Yusuf Al-Maghribi yang tersembunyi di puncak hutan Bukit Bedugul ditemukan melalui petunjuk batin (*isyarah* ruhaniyah) setelah beliau bermunajat, dan saat dibuka kembali ternyata di puncak bukit tersebut memang telah ada struktur makam kuno yang dihormati warga sekitar.<!--more-->\n\nHingga kini, kawasan hutan di sekitar cungkup makam tetap rimbun dan sejuk, menjadi tempat munajat yang sangat tenang.',
    ],
    untoldStory:
      'Di kaki Bukit Bedugul, tepatnya di **Desa Candikuning, Kecamatan Baturiti, Kabupaten Tabanan**, berdiri **Masjid Besar Al-Hidayah Bedugul** (didirikan awal abad ke-20 M oleh komunitas Muslim asal Sasak, Bugis, dan Jawa yang mengabdi di kawasan pegunungan Tabanan/Buleleng) yang menghadap langsung ke pemandangan **Pura Ulun Danu Beratan**.<!--more-->\n\nKedua rumah ibadah di tepi Danau Beratan ini menjadi ikon kerukunan umat beragama Provinsi Bali yang dikagumi wisatawan dunia.',
    barokahHajat:
      'Peziarah yang bermujahadah mendaki Puncak Bukit Bedugul untuk berziarah ke makam Syekh Habib Umar bin Maulana Yusuf Al-Maghribi umumnya bertawassul memohon kepada Allah SWT kejernihan hati dari kesombongan dunia, ketabahan fisik dan mental dalam meraih cita-cita luhur, serta kesejukan rumah tangga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Habib Umar Al-Maghribi (Puncak Bukit Bedugul Tabanan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْحَبِيبِ عُمَرَ بْنِ مَوْلَانَا يُوسُفَ الْمَغْرِبِيِّ جَبَلِ بِيدُوغُولْ تَابَانَانْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَنَوِّرْ قُلُوبَنَا وَثَبِّتْ أَقْدَامَنَا فِي طَاعَتِكَ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْحَبِيبِ عُمَرَ بْنِ مَوْلَانَا يُوسُفَ الْمَغْرِبِيِّ جَبَلِ بِيدُوغُولْ تَابَانَانْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَنَوِّرْ قُلُوبَنَا وَثَبِّتْ أَقْدَامَنَا فِي طَاعَتِكَ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh al-Habiib 'Umar bin Maulaanaa Yuusuf al-Maghribii Jabal Bedugul Tabanan Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa nawwir quluubanaa wa tsabbit aqdaamanaa fii thaa'atik.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Habib Umar bin Maulana Yusuf Al-Maghribi Bukit Bedugul Tabanan Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, terangilah hati kami, dan teguhkanlah langkah kami dalam ketaatan kepada-Mu.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Habib Umar bin Maulana Yusuf Al-Maghribi Bukit Bedugul Tabanan Bali, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, terangilah hati kami, dan teguhkanlah langkah kami dalam ketaatan kepada-Mu.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Muharram (Ziarah & Doa Bersama di Kompleks Makam Keramat Puncak Bukit Bedugul, Desa Candikuning, Kecamatan Baturiti, Kabupaten Tabanan).',
    localAdab:
      'Menyiapkan kondisi fisik dan pakaian hangat yang sopan menutup aurat karena udara dingin pegunungan Bedugul, menjaga kelestarian pohon dan kebersihan sepanjang jalur anak tangga hutan lindung, serta tidak memaksakan mendaki bagi lansia yang uzur (dapat berdoa dari musholla kaki bukit).',
    facilities: ['Cungkup Makam Puncak Bukit Bedugul', 'Jalur Anak Tangga & Pos Istirahat Hutan Bedugul', 'Musholla & Tempat Wudhu Kaki Bukit', 'Dekat Masjid Besar Al-Hidayah Danau Beratan Bedugul'],
    openingHours: 'Buka Setiap Hari 06.00 – 18.00 WITA',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Saifuddin, Ahmad dkk. (2018). Sejarah dan Tradisi Ziarah Wali Pitu di Pulau Bali. Jurnal Lektur Keagamaan Kementerian Agama RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'wali-kembar-karangasem',
    legacyId: 'auliya-24',
    name: 'Makam Wali Kembar Karangasem — Syekh Maulana Yusuf Al-Baghdadi & Syekh Abdul Qodir Jaelani (Bungaya Kangin, Bebandem, Kabupaten Karangasem)',
    title: 'Makam Wali Kembar Karangasem (Syekh Maulana Yusuf Al-Baghdadi & Syekh Abdul Qodir Jaelani Bali Timur)',
    description:
      'Kompleks Makam Keramat Wali Kembar di perbukitan Desa Bungaya Kangin, tempat peristirahatan Syekh Maulana Yusuf Al-Baghdadi dan Syekh Abdul Qodir Jaelani (Wali Pitu Bali Timur) di Kecamatan Bebandem, Kabupaten Karangasem, Provinsi Bali.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 M (Masa Jaringan Dakwah Islam di Kerajaan Karangasem Bali Timur)',
    province: 'Bali',
    city: 'Karangasem',
    district: 'Kec. Bebandem',
    address: 'Dusun Kecicang / Bukit Kembar, Desa Bungaya Kangin, Kec. Bebandem, Kabupaten Karangasem',
    location: {
      lat: -8.4425,
      lng: 115.5912,
      address: 'Dusun Kecicang / Bukit Kembar, Desa Bungaya Kangin, Kec. Bebandem, Kabupaten Karangasem',
      district: 'Kec. Bebandem',
      city: 'Karangasem',
      province: 'Bali',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Bali%2C_Pura_Besakih_6.jpg',
    imageSource: 'Wikimedia Commons — Lanskap Perbukitan Kabupaten Karangasem di Kaki Gunung Agung, Bali Timur (Wilayah Makam Wali Kembar Bungaya Kangin)',
    sanad:
      'Syekh Maulana Yusuf Al-Baghdadi dan Syekh Abdul Qodir Jaelani (Wali Kembar Karangasem); dua mubaligh sufi yang membuka dakwah Islam dan mendampingi komunitas Muslim Sasak-Melayu di wilayah Kerajaan Karangasem Bali Timur.',
    karya: [
      'Pembinaan komunitas Muslim bersejarah di Kampung Kecicang Islam dan Bungaya Kangin, Kecamatan Bebandem, Kabupaten Karangasem',
      'Situs Maqbarah Wali Kembar Karangasem yang menjadi penutup rangkaian ziarah Wali Pitu di ujung timur Pulau Bali',
      'Pelestarian tradisi seni rebana, burdah, dan tahlil masyarakat Muslim Karangasem',
    ],
    history:
      '**Makam Wali Kembar Karangasem** yang terletak di **Desa Bungaya Kangin (dekat Kampung Kecicang Islam), Kecamatan Bebandem, Kabupaten Karangasem, Provinsi Bali** adalah simpul paling timur dalam rangkaian **Wali Pitu Bali**. Di dalam cungkup maqbarah yang berada di atas perbukitan asri berlatar Gunung Agung ini bersemayam dua waliyullah yang dikenal dalam tradisi lisan dan manaqib Wali Pitu sebagai **Syekh Maulana Yusuf Al-Baghdadi** dan **Syekh Abdul Qodir Jaelani** (ulama Nusantara penyandang nama tabarruk kepada Sulthanul Auliya).\n\nBerdasarkan kajian sejarah Islam di Karangasem (Dr. Dhurorudin Mashad, 2014), masuknya Islam di Kabupaten Karangasem berlangsung sejak akhir abad ke-16 dan abad ke-17 M seiring hubungan erat antara **Kerajaan Karangasem** dengan **Pulau Lombok (Sasak)**. Raja-raja Karangasem menempatkan komunitas Muslim di sejumlah kampung strategis di sekitar pusat kerajaan, seperti **Kecicang Islam, Nyuling, Saren Jawa, dan Bukit Tabuan**, serta memberikan kebebasan penuh untuk mendirikan masjid dan mengamalkan syariat.\n\nKedua tokoh Wali Kembar di Bungaya Kangin ini dihormati sebagai guru mursyid yang menanamkan akidah Ahlussunnah wal Jamaah dan akhlak tasawuf bagi masyarakat Muslim Karangasem hingga tetap lestari selama ratusan tahun.',
    karomah: [
      'Dalam penuturan masyarakat Muslim Kecicang dan Bungaya Kangin Karangasem, kompleks Makam Wali Kembar di Kecamatan Bebandem tetap aman dan terlindungi saat terjadinya beberapa kali erupsi besar Gunung Agung pada abad ke-20 dan ke-21 M.<!--more-->\n\nPeziarah yang sampai di ujung timur Bali ini merasakan suasana pedesaan Karangasem yang sangat damai dan penuh kekeluargaan.',
    ],
    untoldStory:
      'Tidak jauh dari lokasi **Makam Wali Kembar** di Kecamatan Bebandem terdapat **Kampung Kecicang Islam**, salah satu desa Muslim tertua di Bali Timur yang memiliki masjid kuno berarsitektur tumpang tradisional (Masjid Baiturrahman Kecicang, berdiri sejak abad ke-17 M) serta tradisi *Rudat* dan *Burdah* yang memadukan seni Islam dengan budaya Karangasem.<!--more-->\n\nHarmoni antara Desa Bungaya dan Kampung Kecicang Islam menjadi teladan persaudaraan sejati di kaki Gunung Agung.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Wali Kembar di Bungaya Kangin Karangasem umumnya bertawassul memohon kepada Allah SWT persaudaraan yang rukun antara kakak-beradik dan sahabat seperjuangan, keselamatan dari bencana alam, serta kesempurnaan hajat ziarah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Wali Kembar Karangasem (Bungaya Kangin Bali Timur)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ مَوْلَانَا يُوسُفَ الْبَغْدَادِيِّ وَالشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ وَلِي كِيمْبَارْ كَارَانْغأَسِيمْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَاحْفَظْنَا مِنَ الْبَلَايَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ مَوْلَانَا يُوسُفَ الْبَغْدَادِيِّ وَالشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ وَلِي كِيمْبَارْ كَارَانْغأَسِيمْ بَالِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَاحْفَظْنَا مِنَ الْبَلَايَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Maulaanaa Yuusuf al-Baghdaadii wasy-Syaikh 'Abdil-Qaadir al-Jailaanii Wali Kembar Karangasem Bali syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wahfazhnaa minal-balaayaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Maulana Yusuf Al-Baghdadi dan Syekh Abdul Qodir Jaelani (Wali Kembar Karangasem Bali), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, lindungilah kami dari segala bencana, serta limpahkanlah keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Maulana Yusuf Al-Baghdadi dan Syekh Abdul Qodir Jaelani (Wali Kembar Karangasem Bali), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, lindungilah kami dari segala bencana, serta limpahkanlah keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Sya’ban (Haul & Pengajian Akbar Makam Wali Kembar di Desa Bungaya Kangin, Kecamatan Bebandem, Kabupaten Karangasem).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, melepas alas kaki di batas cungkup Makam Wali Kembar, menjaga ketertiban kendaraan di jalan desa Bungaya Kangin, serta menghormati masyarakat sekitar.',
    facilities: ['Cungkup Makam Wali Kembar Karangasem', 'Musholla & Pendopo Peziarah', 'Tempat Wudhu & Toilet', 'Area Parkir Kendaraan & Shuttle dari Kecicang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Jakarta: Pustaka Al-Kautsar.',
      'Arifin, Toyyib Zaen (2002). Manaqib Wali Pitu di Bali. Surabaya: Yayasan Al-Khidmah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  // =========================================================================
  // II. PROVINSI NUSA TENGGARA BARAT (LOMBOK & SUMBAWA)
  // =========================================================================
  {
    id: 'tgkh-zainuddin-abdul-madjid',
    legacyId: 'ulama-23',
    name: 'Makam Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Pancor, Selong, Kabupaten Lombok Timur)',
    title: 'Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Pendiri Nahdlatul Wathan & Pahlawan Nasional RI, 1898–1997 M)',
    description:
      'Kompleks Taman Makam Pahlawan Nasional & Musholla Al-Abror Pancor, tempat peristirahatan Al-Allamah Maulana Syaikh Tuan Guru Kyai Haji (TGKH.) Muhammad Zainuddin Abdul Madjid Al-Ampanani (Abul Madaris wal Masajid) di Kelurahan Pancor, Kecamatan Selong, Kabupaten Lombok Timur, Provinsi Nusa Tenggara Barat.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (17 Rabiul Awal 1316 H / 5 Agustus 1898 M – 20 Jumadil Akhir 1418 H / 21 Oktober 1997 M)',
    province: 'Nusa Tenggara Barat',
    city: 'Lombok Timur',
    district: 'Kec. Selong',
    address: 'Kompleks Pondok Pesantren Darunnahdlatain NWDI, Kel. Pancor, Kec. Selong, Kabupaten Lombok Timur',
    location: {
      lat: -8.6458,
      lng: 116.5182,
      address: 'Kompleks Pondok Pesantren Darunnahdlatain NWDI, Kel. Pancor, Kec. Selong, Kabupaten Lombok Timur',
      district: 'Kec. Selong',
      city: 'Lombok Timur',
      province: 'Nusa Tenggara Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Zainuddin_Abdul_Madjid.jpg',
    imageSource: 'Wikimedia Commons — Pahlawan Nasional Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Pancor, Selong, Lombok Timur)',
    sanad:
      'Al-Allamah Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Syaikh Muhammad Shaggaf Al-Ampanani); lulusan terbaik Madrasah Ash-Shaulatiyah Makkah (1923–1934 M) dengan predikat Mumtaz dan kata pengantar langsung dari Syaikh Hasan Muhammad Al-Masysyath; murid kesayangan Syaikh Salim Rahmatullah, Sayyid Amin Al-Kutbi, Syaikh Umar Hamdan Al-Mahrisi, dan Syaikh Ali Al-Maliki.',
    karya: [
      'Pendirian Pesantren Al-Mujahidin (1934 M), Madrasah Nahdlatul Wathan Diniyah Islamiyah / NWDI (17 Agustus 1937 M), Madrasah Nahdlatul Banat Diniyah Islamiyah / NBDI khusus perempuan (21 April 1943 M), dan organisasi Nahdlatul Wathan (1 Maret 1953 M)',
      'Penulisan kitab berbahasa Arab, Melayu, dan Sasak: Risalah at-Tauhid, Sullamul Hija Syarah Safinatun Naja, Tuhfatul Ampenaniyah Syarah Matan al-Bina, Mi’rajush Shibyan ilaa Sama’i ’Ilmil Bayan, Hizib Nahdlatul Wathan, dan Wasiat Renungan Masa',
      'Penggerak perlawanan heroik santri terhadap kolonialisme Belanda di Selong, Lombok Timur (1946 M, tempat gugurnya adik beliau TGH. Muhammad Faisal Abdul Madjid)',
    ],
    history:
      '**Al-Allamah Maulana Syaikh Tuan Guru Kyai Haji (TGKH.) Muhammad Zainuddin Abdul Madjid**—yang semasa kecil bernama **Muhammad Saggaf** dan di Makkah dikenal sebagai **Syaikh Muhammad Zainuddin Al-Ampanani** (lahir di Kampung Bermi, Pancor pada **17 Rabiul Awal 1316 H / 5 Agustus 1898 M** dan wafat pada **20 Jumadil Akhir 1418 H / 21 Oktober 1997 M**)—adalah mahaguru para ulama Pulau Lombok (*Bumi Seribu Masjid*), pendiri organisasi Islam terbesar di NTB (**Nahdlatul Wathan**), serta **Pahlawan Nasional Republik Indonesia**. Pada tahun **1923 M**, beliau berangkat ke Makkah Al-Mukarramah dan belajar di **Madrasah Ash-Shaulatiyah** di bawah bimbingan langsung **Syaikh Hasan Muhammad Al-Masysyath** hingga lulus dengan nilai sempurna (*Mumtaz*) yang mengukir sejarah intelektual Haramain.\n\nSekembalinya ke tanah air pada tahun **1934 M**, beliau mendirikan Pesantren Al-Mujahidin di Pancor, lalu pada **15 Jumadil Akhir 1356 H / 17 Agustus 1937 M** meresmikan **Madrasah Nahdlatul Wathan Diniyah Islamiyah (NWDI)**—madrasah klasikal pertama di Pulau Lombok. Enam tahun kemudian, pada **15 Rabiul Akhir 1362 H / 21 April 1943 M**, beliau mendirikan **Madrasah Nahdlatul Banat Diniyah Islamiyah (NBDI)** khusus untuk mengangkat derajat pendidikan kaum perempuan Sasak. Dari kedua madrasah induk inilah lahir ribuan madrasah, sekolah, dan perguruan tinggi di bawah naungan **Nahdlatul Wathan (1953 M)** hingga beliau digelari *Abul Madaris wal Masajid* (Bapak Madrasah-Madrasah dan Masjid-Masjid).\n\nDalam kancah perjuangan kemerdekaan, Maulana Syaikh membentuk laskar **Al-Mujahidin** di Lombok Timur untuk menghadang agresi NICA/Belanda pada tahun 1946 M, di mana adik kandung beliau (**TGH. Muhammad Faisal Abdul Madjid**) gugur sebagai syuhada dalam penyerbuan tangsi militer Belanda di Selong. Atas jasa keilmuan dan kepahlawanannya, Presiden RI menganugerahkan gelar **Pahlawan Nasional** melalui **Keppres RI No. 115/TK/Tahun 2017**.',
    karomah: [
      'Dalam literatur sejarah intelektual Haramain-Lombok (Prof. Jamaluddin, *Sejarah Islam Lombok*, dan biografi resmi Pahlawan Nasional TGKH. M. Zainuddin Abdul Madjid), keistimewaan nyata Maulana Syaikh terlihat saat gurunya di Makkah, **Syaikh Hasan Muhammad Al-Masysyath**, menuliskan pujian khusus dengan tinta emas pada ijazah beliau dan memberikan izin mengajar sebelum beliau menamatkan kelas tertinggi di Madrasah Ash-Shaulatiyah.<!--more-->\n\nDi samping itu, doa himpunannya yang terkenal, **Hizib Nahdlatul Wathan**, diamalkan secara istiqamah oleh jutaan jamaah di NTB, Bali, Kalimantan, Sulawesi, hingga mancanegara.',
    ],
    untoldStory:
      'Tanggal berdirinya **Madrasah NWDI** di Pancor yang ditetapkan oleh Maulana Syaikh jauh sebelum kemerdekaan RI ternyata jatuh tepat pada tanggal **17 Agustus (1937 M)**, tanggal yang delapan tahun kemudian menjadi hari Proklamasi Kemerdekaan Republik Indonesia (17 Agustus 1945 M).<!--more-->\n\nDi kompleks maqbarah beliau di Pancor, Selong, peziarah dapat berziarah sekaligus menyaksikan pusat pendidikan **Darunnahdlatain NWDI/NW** yang selalu semarak oleh ratusan ribu jamaah saat perhelatan **Hultah (Hari Ulang Tahun) Madrasah NWDI** setiap tahun.',
    barokahHajat:
      'Peziarah, santri, dan pendidik yang berziarah ke maqbarah Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid di Pancor Lombok Timur umumnya bertawassul memohon kepada Allah SWT kecerdasan ilmu agama dan umum, keberkahan dalam mendirikan dan mengelola lembaga pendidikan, serta kemuliaan akhlak keturunan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Pancor Lombok Timur)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مَوْلَانَا الشَّيْخِ مُحَمَّدٍ زَيْنِ الدِّينِ عَبْدِ الْمَجِيدِ الْأَمْفَنَانِيِّ مُؤَسِّسِ نَهْضَةِ الْوَطَنِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ وَأَحْزَابِهِ وَبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مَوْلَانَا الشَّيْخِ مُحَمَّدٍ زَيْنِ الدِّينِ عَبْدِ الْمَجِيدِ الْأَمْفَنَانِيِّ مُؤَسِّسِ نَهْضَةِ الْوَطَنِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ وَأَحْزَابِهِ وَبَرَكَاتِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Maulaanaasy-Syaikh Muhammad Zainuddiin 'Abdil-Majiid al-Ampanaanii mu-assisi Nahdlatil-Wathan syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wanfa'naa bi 'uluumihii wa asraarihii wa ahzaabihii wa barakaatihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid Al-Ampanani pendiri Nahdlatul Wathan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan ilmu, rahasia hikmah, hizib, dan keberkahan beliau kepada kami di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid Al-Ampanani pendiri Nahdlatul Wathan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan ilmu, rahasia hikmah, hizib, dan keberkahan beliau kepada kami di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '20 Jumadil Akhir / Bulan Syawal (Puncak Hultah Akbar NWDI & Haul Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid di Pancor, Kecamatan Selong, Kabupaten Lombok Timur).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang rapi dan menutup aurat (jamaah dianjurkan memakai selendang/serban putih), menjaga ketertiban shaf pria dan wanita di Musholla Al-Abror, serta menghormati santri dan pengurus pesantren.',
    facilities: ['Kompleks Makam Pahlawan Nasional Maulana Syaikh TGKH. M. Zainuddin Abdul Madjid', 'Musholla Al-Abror & Masjid Agung Al-Mujahidin Selong', 'Kampus Pondok Pesantren Darunnahdlatain Pancor', 'Area Parkir Luas Bus Peziarah'],
    openingHours: 'Buka Setiap Hari 06.00 – 22.00 WITA',
    references: [
      'Noor, Muhammad, Muslihan Habib & M. Harfin Zuhdi (2014). Visi Kebangsaan Religius: Refleksi Pemikiran dan Perjuangan Tuan Guru Kyai Haji Muhammad Zainuddin Abdul Madjid 1904–1997. Jakarta: Logos Wacana Ilmu.',
      'Keputusan Presiden Republik Indonesia Nomor 115/TK/Tahun 2017 tentang Penganugerahan Gelar Pahlawan Nasional kepada TGKH. Muhammad Zainuddin Abdul Madjid.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'wali-nyatoq-lombok',
    name: 'Makam Gaukan Wali Nyatoq — Sayyid Abdullah / Djafar (Gunung Sasak, Rembitan, Pujut, Kabupaten Lombok Tengah)',
    title: 'Gaukan Wali Nyatoq Rembitan (Wali Penyebar Islam Tanah Sasak Selatan & Pendiri Masjid Kuno Gunung Pujut)',
    description:
      'Kompleks Makam Keramat Puncak Bukit Nyatoq (Gunung Sasak), tempat peristirahatan Gaukan Wali Nyatoq (ulama penyebar Islam perdana di Lombok bagian selatan yang hanya menerima peziarah pada hari Rabu) di Desa Rembitan, Kecamatan Pujut, Kabupaten Lombok Tengah, Provinsi Nusa Tenggara Barat.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – ke-17 M (Masa Awal Islamisasi Kerajaan Pujut & Desa Adat Sade-Rembitan Lombok Tengah)',
    province: 'Nusa Tenggara Barat',
    city: 'Lombok Tengah',
    district: 'Kec. Pujut',
    address: 'Bukit Nyatoq, Desa Rembitan (Jalur Praya–Kuta Mandalika), Kec. Pujut, Kabupaten Lombok Tengah',
    location: {
      lat: -8.8385,
      lng: 116.2862,
      address: 'Bukit Nyatoq, Desa Rembitan (Jalur Praya–Kuta Mandalika), Kec. Pujut, Kabupaten Lombok Tengah',
      district: 'Kec. Pujut',
      city: 'Lombok Tengah',
      province: 'Nusa Tenggara Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Sade_Village_Lombok.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Desa Adat Sade & Rembitan, Kecamatan Pujut, Kabupaten Lombok Tengah (Wilayah Dakwah Gaukan Wali Nyatoq)',
    sanad:
      'Gaukan Wali Nyatoq (dalam Babad Lombok disebut Sayyid Abdullah / Djafar / Datu Wali Nyatoq); mubaligh sufi yang menyebarkan Islam di wilayah Kedatuan Pujut (Lombok Tengah bagian selatan) sezaman dengan jaringan dakwah Sunan Prapen di Lombok.',
    karya: [
      'Pendirian Masjid Kuno Gunung Pujut di Desa Sengkol/Rembitan, Kecamatan Pujut, Kabupaten Lombok Tengah (cagar budaya arsitektur masjid tumpang atap alang-alang)',
      'Pengislaman masyarakat suku Sasak di wilayah Pujut, Rembitan, Sade, dan Sengkol melalui pendekatan kearifan adat',
      'Tradisi unik "Ziarah Hari Rabu" (*Kemalik Wali Nyatoq*) yang dipatuhi secara turun-temurun oleh masyarakat Pulau Lombok',
    ],
    history:
      '**Gaukan Wali Nyatoq** (atau **Wali Nyato’**) adalah salah satu wali penyebar Islam paling dihormati di **Pulau Lombok, Provinsi Nusa Tenggara Barat**, yang makamnya berada di atas **Bukit Nyatoq, Desa Rembitan, Kecamatan Pujut, Kabupaten Lombok Tengah** (di tepi jalan raya utama menuju Desa Adat Sade dan Kuta Mandalika). Berdasarkan naskah *Babad Lombok* dan penelitian sejarah Islam Sasak (Prof. Jamaluddin, UIN Mataram), Wali Nyatoq adalah mubaligh besar abad ke-16/ke-17 M yang berdakwah di wilayah **Kerajaan Pujut**.\n\nNama *Nyatoq* dalam bahasa Sasak bermakna *"Nyata"* (jelas kewalian, kesaktian, dan kebenaran ajarannya). Beliau mendirikan **Masjid Kuno Gunung Pujut** yang beratap tumpang alang-alang dengan empat soko guru utama dan membimbing masyarakat Sasak selatan mengenal kalimat Tauhid, tata cara bersuci, serta pertanian lahan kering.\n\nKeunikan paling terkenal dari **Makam Wali Nyatoq** di seluruh Nusantara adalah aturan adat ziarahnya yang sangat ketat: **pintu kompleks makam Wali Nyatoq HANYA dibuka untuk peziarah pada hari Rabu** (mulai Rabu pagi hingga Rabu petang). Di luar hari Rabu, pintu gerbang bukit makam ditutup rapat untuk menghormati wasiat sang wali agar masyarakat Sasak fokus bekerja mencari nafkah dan menuntut ilmu selama enam hari lainnya, serta tidak mengkultuskan kuburan secara berlebihan.',
    karomah: [
      'Dalam kajian antropologi dan filologi Islam Lombok (Dr. Erni Budiwanti dan Prof. Jamaluddin), wasiat Gaukan Wali Nyatoq yang membatasi waktu ziarah hanya pada hari Rabu merupakan bentuk kebijaksanaan pedagogis sang wali untuk menjaga keseimbangan antara ibadah ukhrawi dan etos kerja duniawi masyarakat Sasak.<!--more-->\n\nSetiap hari Rabu, ribuan peziarah dari seluruh penjuru Lombok Timur, Lombok Tengah, Lombok Barat, hingga Mataram memadati Bukit Nyatoq di Desa Rembitan dengan penuh ketertiban.',
    ],
    untoldStory:
      'Tidak jauh dari **Makam Wali Nyatoq** di Desa Rembitan berdiri **Desa Adat Sade** dan situs **Masjid Kuno Gunung Pujut** (berdiri sekitar abad ke-16 M). Masjid Kuno Gunung Pujut dan Masjid Kuno Rembitan mempertahankan arsitektur asli suku Sasak dengan dinding anyaman bambu, lantai tanah liat, dan atap ijuk/alang-alang bertumpang yang tahan gempa.<!--more-->\n\nPeziarah yang merencanakan perjalanan ke Makam Wali Nyatoq wajib menjadwalkan kunjungannya tepat pada **hari Rabu**.',
    barokahHajat:
      'Peziarah yang datang pada hari Rabu ke Makam Gaukan Wali Nyatoq di Rembitan Pujut Lombok Tengah umumnya bertawassul memohon kepada Allah SWT keberkahan usaha pertanian dan perniagaan, kesembuhan dari penyakit, serta keselamatan keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Gaukan Wali Nyatoq (Rembitan Pujut Lombok Tengah)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ وَلِي نْيَاتُوقْ رِيمْبِيتَانْ فُوجُوتْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَبَارِكْ لَنَا فِي أَعْمَالِنَا وَأَرْزَاقِنَا وَعَافِنَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ وَلِي نْيَاتُوقْ رِيمْبِيتَانْ فُوجُوتْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَبَارِكْ لَنَا فِي أَعْمَالِنَا وَأَرْزَاقِنَا وَعَافِنَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Wali Nyatoq Rembitan Pujut Lombok syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa baarik lanaa fii a'maalinaa wa arzaaqinaa wa 'aafinaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah yang shalih Gaukan Wali Nyatoq Rembitan Pujut Lombok, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, berkahilah amal dan rezeki kami, serta karuniakanlah keselamatan di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah yang shalih Gaukan Wali Nyatoq Rembitan Pujut Lombok, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, berkahilah amal dan rezeki kami, serta karuniakanlah keselamatan di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Setiap Hari Rabu Sepanjang Tahun (Jadwal Khusus Buka Maqbarah Wali Nyatoq di Bukit Nyatoq, Desa Rembitan, Kecamatan Pujut, Kabupaten Lombok Tengah).',
    localAdab:
      'WAJIB memperhatikan jadwal: kompleks makam HANYA dibuka untuk peziarah pada HARI RABU (pukul 07.00–17.30 WITA). Peziarah wajib berpakaian sopan menutup aurat, melepas alas kaki saat menaiki bukit cungkup, serta mematuhi arahan pemangku/juru kunci adat Rembitan.',
    facilities: ['Cungkup Makam Puncak Bukit Wali Nyatoq', 'Tangga Pendakian Bukit Nyatoq Rembitan', 'Musholla & Tempat Wudhu Kaki Bukit', 'Area Parkir Luas Jalur Raya Praya–Kuta Mandalika'],
    openingHours: 'Khusus Hari Rabu 07.00 – 17.30 WITA (Tutup selain hari Rabu)',
    references: [
      'Jamaluddin (2019). Sejarah Islam Lombok: Periode Awal hingga Abad ke-20. Mataram: Sanabil Publishing UIN Mataram.',
      'Budiwanti, Erni (2000). Islam Sasak: Wetu Telu versus Waktu Lima. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-loang-baloq',
    legacyId: 'auliya-15',
    name: 'Makam Loang Baloq — Maulana Syekh Gauz Abdurrazzaq (Tanjung Karang, Sekarbela, Kota Mataram)',
    title: 'Syekh Gauz Abdurrazzaq Makam Loang Baloq (Ulama Sufi Penyebar Islam Pesisir Ampenan-Mataram)',
    description:
      'Kompleks Makam Keramat Loang Baloq di tepi Pantai Tanjung Karang, tempat peristirahatan Maulana Syekh Gauz Abdurrazzaq, Datuk Laut, dan Anak Yatim (Makam Bebeleq) di Kelurahan Tanjung Karang, Kecamatan Sekarbela, Kota Mataram, Provinsi Nusa Tenggara Barat.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – ke-17 M (Masa Dakwah Maritim di Pesisir Barat Pulau Lombok)',
    province: 'Nusa Tenggara Barat',
    city: 'Mataram',
    district: 'Kec. Sekarbela',
    address: 'Jl. Sultan Salahudin, Pantai Loang Baloq, Kel. Tanjung Karang, Kec. Sekarbela, Kota Mataram',
    location: {
      lat: -8.6042,
      lng: 116.0745,
      address: 'Jl. Sultan Salahudin, Pantai Loang Baloq, Kel. Tanjung Karang, Kec. Sekarbela, Kota Mataram',
      district: 'Kec. Sekarbela',
      city: 'Mataram',
      province: 'Nusa Tenggara Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Islamic_Center_NTB.jpg',
    imageSource: 'Wikimedia Commons — Kota Mataram, Pulau Lombok, Nusa Tenggara Barat (Pusat Peradaban Islam Mataram & Situs Makam Loang Baloq)',
    sanad:
      'Maulana Syekh Gauz Abdurrazzaq; ulama sufi asal Timur Tengah (Baghdad/Hadramaut) yang berlayar melalui Palembang dan Gresik hingga mendarat di pesisir Tanjung Karang (Ampenan/Sekarbela), Kota Mataram.',
    karya: [
      'Penyebaran Islam Ahlussunnah wal Jamaah di pesisir barat Pulau Lombok (Tanjung Karang, Sekarbela, dan Ampenan)',
      'Situs Cagar Budaya & Wisata Religi Makam Loang Baloq di Kota Mataram yang unik karena pusaranya berada di dalam rongga akar pohon beringin tua (*Loang Baloq*)',
      'Tradisi syukuran *Lebaran Topat* masyarakat Sasak Kota Mataram dan Lombok Barat selepas puasa Syawal',
    ],
    history:
      '**Kompleks Makam Loang Baloq** yang terletak tepat di seberang **Pantai Loang Baloq, Kelurahan Tanjung Karang, Kecamatan Sekarbela, Kota Mataram, Provinsi Nusa Tenggara Barat** adalah situs ziarah paling bersejarah di ibu kota Provinsi NTB. Di kompleks ini bersemayam **Maulana Syekh Gauz Abdurrazzaq**, seorang ulama sufi besar yang tiba di pesisir barat Pulau Lombok sekitar abad ke-16/ke-17 M untuk menyebarkan ajaran Islam di wilayah kerajaan-kerajaan awal Sasak barat.\n\nNama **Loang Baloq** berasal dari bahasa Sasak: *Loang* berarti *"lubang/rongga"* dan *Baloq* berarti *"buyut/tua/besar"*, merujuk pada keunikan pusara utama Maulana Syekh Gauz Abdurrazzaq yang berada tepat di dalam rongga akar pohon beringin raksasa berusia ratusan tahun. Di dalam kompleks yang sama terdapat tiga makam utama yang sangat dihormati masyarakat Lombok: makam **Maulana Syekh Gauz Abdurrazzaq**, makam **Datuk Laut** (pengawal dan murid setia beliau), serta makam **Anak Yatim (*Makam Bebeleq*)**.\n\nSelama berabad-abad, Makam Loang Baloq menjadi pusat ziarah masyarakat Sasak sebelum berangkat menunaikan ibadah haji maupun saat perayaan tradisi **Lebaran Topat** (8 Syawal, setelah menyelesaikan puasa sunnah enam hari di bulan Syawal).',
    karomah: [
      'Dalam tradisi lisan masyarakat Sasak Mataram dan kajian sejarah lokal (Prof. Jamaluddin, UIN Mataram), pohon beringin raksasa yang menaungi makam Maulana Syekh Gauz Abdurrazzaq di Loang Baloq tumbuh membentuk kubah alami yang melindungi pusara beliau selama ratusan tahun tanpa merusak struktur batu nisan di dalamnya.<!--more-->\n\nDi samping itu, makam Anak Yatim (*Makam Bebeleq*) di kompleks ini mengingatkan setiap peziarah akan kemuliaan menyantuni anak yatim dan fakir miskin sebagaimana teladan sang wali.',
    ],
    untoldStory:
      'Setiap tanggal **8 Syawal** (sepekan setelah Idul Fitri), puluhan ribu masyarakat Muslim Lombok memadati kawasan **Makam dan Pantai Loang Baloq** di Kecamatan Sekarbela, Kota Mataram untuk merayakan **Lebaran Topat** (Lebaran Ketupat).<!--more-->\n\nAcara diawali dengan ziarah kubur, dzikir, dan tahlil di pusara Maulana Syekh Gauz Abdurrazzaq, lalu dilanjutkan dengan makan ketupat bersama keluarga di tepi pantai sebagai ungkapan syukur atas tuntasnya puasa Ramadhan dan puasa sunnah enam hari bulan Syawal.',
    barokahHajat:
      'Peziarah dan calon jamaah haji yang berziarah ke Makam Loang Baloq (Maulana Syekh Gauz Abdurrazzaq) di Kota Mataram umumnya bertawassul memohon kepada Allah SWT kelancaran dan kemabruran ibadah haji/umrah, keselamatan keluarga, serta keberkahan rezeki.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Maulana Syekh Gauz Abdurrazzaq (Makam Loang Baloq Mataram)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مَوْلَانَا الشَّيْخِ غَوْثٍ عَبْدِ الرَّزَّاقِ وَأَوْلِيَاءِ لُوَانْغ بَالُوقْ مَاتَارَامْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا حَجَّ بَيْتِكَ الْحَرَامِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مَوْلَانَا الشَّيْخِ غَوْثٍ عَبْدِ الرَّزَّاقِ وَأَوْلِيَاءِ لُوَانْغ بَالُوقْ مَاتَارَامْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا حَجَّ بَيْتِكَ الْحَرَامِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Maulaanaasy-Syaikh Ghauts 'Abdir-Razzaaq wa Auliyaa-i Loang Baloq Mataram Lombok syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnaa hajja baitikal-haraami wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maulana Syekh Gauz Abdurrazzaq beserta para auliya Loang Baloq Mataram Lombok, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami rezeki berhaji ke Baitullah Al-Haram, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maulana Syekh Gauz Abdurrazzaq beserta para auliya Loang Baloq Mataram Lombok, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami rezeki berhaji ke Baitullah Al-Haram, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '8 Syawal (Puncak Ziarah Akbar Lebaran Topat di Kompleks Makam Loang Baloq, Kelurahan Tanjung Karang, Kecamatan Sekarbela, Kota Mataram).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki saat memasuki pelataran maqbarah, tidak mengikat benang atau kain pada akar pohon beringin dengan keyakinan yang menyimpang dari tauhid, serta menjaga kebersihan lingkungan makam.',
    facilities: ['Kompleks Makam Loang Baloq (Syekh Gauz Abdurrazzaq, Datuk Laut & Anak Yatim)', 'Musholla & Pendopo Peziarah', 'Taman Wisata Pantai Loang Baloq', 'Area Parkir Bus Luas Jl. Lingkar Selatan Mataram'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Jamaluddin (2019). Sejarah Islam Lombok: Periode Awal hingga Abad ke-20. Mataram: Sanabil Publishing UIN Mataram.',
      'Asnawi (2006). Tradisi Ziarah Makam Keramat Loang Baloq dan Batu Layar pada Masyarakat Sasak Lombok. Jurnal Penelitian Keislaman IAIN Mataram.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-batu-layar-lombok',
    name: 'Makam Keramat Batu Layar — Sayyid Duhri Al-Haddad / Syekh Sayyid Muhammad Al-Baghdadi (Batu Layar, Kabupaten Lombok Barat)',
    title: 'Sayyid Duhri Al-Haddad Makam Batu Layar (Waliyullah Penyebar Islam Pesisir Senggigi Lombok Barat)',
    description:
      'Kompleks Makam Keramat Batu Layar di tepi jalur pantai barat menuju Senggigi, tempat peristirahatan Sayyid Duhri Al-Haddad (Syekh Sayyid Muhammad Al-Baghdadi) di Desa Batu Layar, Kecamatan Batu Layar, Kabupaten Lombok Barat, Provinsi Nusa Tenggara Barat.',
    category: 'Habaib',
    era: 'Abad ke-17 – ke-18 M (Jaringan Dakwah Habaib & Ulama Pesisir Lombok Barat)',
    province: 'Nusa Tenggara Barat',
    city: 'Lombok Barat',
    district: 'Kec. Batu Layar',
    address: 'Jl. Raya Senggigi, Desa Batu Layar, Kec. Batu Layar, Kabupaten Lombok Barat',
    location: {
      lat: -8.5192,
      lng: 116.0635,
      address: 'Jl. Raya Senggigi, Desa Batu Layar, Kec. Batu Layar, Kabupaten Lombok Barat',
      district: 'Kec. Batu Layar',
      city: 'Lombok Barat',
      province: 'Nusa Tenggara Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Senggigi_beach_lombok.jpg',
    imageSource: 'Wikimedia Commons — Pesisir Pantai Batu Layar & Senggigi, Kabupaten Lombok Barat (Lokasi Kompleks Makam Keramat Sayyid Duhri Al-Haddad)',
    sanad:
      'Sayyid Duhri Al-Haddad (dikenal pula dalam tradisi Sasak sebagai Sayyid Muhammad Al-Baghdadi / Tuan Guru Batu Layar); ulama dzurriyah Rasulullah SAW asal Hadramaut/Timur Tengah yang berdakwah di pesisir utara Ampenan hingga Batu Layar, Kabupaten Lombok Barat.',
    karya: [
      'Penyebaran dakwah Islam dan pembinaan majelis dzikir masyarakat Sasak di pesisir Kecamatan Batu Layar dan Gunung Sari, Kabupaten Lombok Barat',
      'Kompleks Cagar Budaya Religi Makam Batu Layar beserta sumur tua air tawar di tepi pantai Senggigi',
      'Pusat tradisi ziarah *Lebaran Topat* Kabupaten Lombok Barat yang dihadiri ribuan masyarakat setiap 8 Syawal',
    ],
    history:
      '**Kompleks Makam Keramat Batu Layar** yang berlokasi di tepi **Jalan Raya Mataram–Senggigi, Desa Batu Layar, Kecamatan Batu Layar, Kabupaten Lombok Barat, Provinsi Nusa Tenggara Barat** merupakan pasangan kembar spiritual dari Makam Loang Baloq dalam tradisi ziarah masyarakat Sasak. Di dalam cungkup utama kompleks ini bersemayam **Sayyid Duhri Al-Haddad** (yang dalam sebagian riwayat lisan Sasak juga disebut **Syekh Sayyid Muhammad**), seorang ulama dan habib yang mendedikasikan hidupnya untuk mengislamkan dan membimbing masyarakat pesisir barat Pulau Lombok.\n\nBerdasarkan kajian sejarah lokal dan antropologi keagamaan Lombok (Prof. Jamaluddin dan Dr. Asnawi, UIN Mataram), Sayyid Duhri Al-Haddad mendarat di tanjung berbatu karang yang menyerupai layar perahu terkembang (*Batu Layar*). Di tempat tersebut beliau mendirikan tempat berkhalwat dan mengajar ilmu tauhid, fikih ibadah, serta akhlak karimah kepada penduduk Sasak.\n\nDi dalam kompleks Makam Batu Layar terdapat pula sumur tua (*Lingkok*) yang airnya tetap tawar dan jernih meskipun berjarak hanya beberapa puluh meter dari air laut Selat Lombok. Setiap hari, khususnya pada hari Jumat dan puncak perayaan **Lebaran Topat (8 Syawal)**, ribuan peziarah memadati maqbarah Sayyid Duhri Al-Haddad.',
    karomah: [
      'Dalam tradisi lisan masyarakat Sasak Lombok Barat, keistimewaan situs Makam Sayyid Duhri Al-Haddad di Batu Layar tampak dari keberadaan mata air sumur di dalam kompleks makam yang berasa tawar dan sejuk walau berada persis di bibir pantai berpasir hitam Selat Lombok.<!--more-->\n\nKeteladanan dakwah beliau yang penuh kelembutan membuat masyarakat Batu Layar dan Senggigi sangat memuliakan dzurriyah Rasulullah SAW dan para Tuan Guru.',
    ],
    untoldStory:
      'Dalam tradisi masyarakat Pulau Lombok, ziarah ke **Makam Loang Baloq (Kota Mataram)** dan **Makam Batu Layar (Kabupaten Lombok Barat)** telah menjadi rangkaian wajib yang tak terpisahkan.<!--more-->\n\nPemerintah Kabupaten Lombok Barat bahkan menjadikan kawasan Makam dan Pantai Batu Layar sebagai pusat penyelenggaraan resmi **Festival Lebaran Topat** setiap tanggal 8 Syawal yang diawali dengan pawai dulang pesaji dan dzikir tahlil akbar di cungkup Sayyid Duhri Al-Haddad.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Batu Layar (Sayyid Duhri Al-Haddad) di Lombok Barat umumnya bertawassul memohon kepada Allah SWT syafaat kecintaan kepada keluarga Nabi Muhammad SAW, kesejukan hati dan rumah tangga, serta kelancaran rezeki.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sayyid Duhri Al-Haddad (Makam Batu Layar Lombok Barat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدِ دُهْرِي الْحَدَّادِ وَأَوْلِيَاءِ بَاتُو لَايَارْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاسْقِنَا مِنْ بَرَكَاتِهِمْ وَأَعِنّا عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدِ دُهْرِي الْحَدَّادِ وَأَوْلِيَاءِ بَاتُو لَايَارْ لُومْبُوكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاسْقِنَا مِنْ بَرَكَاتِهِمْ وَأَعِنّا عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sayyid Duhrii al-Haddaad wa Auliyaa-i Batu Layar Lombok syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wasqinaa min barakaatihim wa a'innaa 'alaa dzikrika wa syukrika wa husni 'ibaadatik.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyid Duhri Al-Haddad beserta para auliya Batu Layar Lombok Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, curahkanlah keberkahan mereka kepada kami, serta tolonglah kami untuk senantiasa mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyid Duhri Al-Haddad beserta para auliya Batu Layar Lombok Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, curahkanlah keberkahan mereka kepada kami, serta tolonglah kami untuk senantiasa mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
      },
    ],
    haulSchedule:
      '8 Syawal (Puncak Ziarah Akbar Lebaran Topat Kabupaten Lombok Barat di Kompleks Makam Batu Layar, Kecamatan Batu Layar).',
    localAdab:
      'Wajib mengenakan pakaian sopan menutup aurat, melepas alas kaki saat memasuki serambi cungkup makam, menjaga ketertiban saat mengambil air wudhu/sumur kompleks, serta mengikuti arahan pengurus maqbarah.',
    facilities: ['Cungkup Utama Makam Sayyid Duhri Al-Haddad', 'Masjid & Pendopo Peziarah Batu Layar', 'Sumur Tua Kompleks Makam Batu Layar', 'Area Parkir Bus Jalur Raya Senggigi'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Jamaluddin (2019). Sejarah Islam Lombok: Periode Awal hingga Abad ke-20. Mataram: Sanabil Publishing UIN Mataram.',
      'Asnawi (2006). Tradisi Ziarah Makam Keramat Loang Baloq dan Batu Layar pada Masyarakat Sasak Lombok. Jurnal Penelitian Keislaman IAIN Mataram.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-dana-traha-bima',
    name: 'Kompleks Makam Dana Traha — Sultan Abdul Kahir & Raja-Raja Kesultanan Bima (Dara, Rasanae Barat, Kota Bima)',
    title: 'Kompleks Makam Dana Traha Sultan Abdul Kahir (Raja-Raja Kesultanan Bima Pulau Sumbawa, 1620–1640 M)',
    description:
      'Kompleks Cagar Budaya Makam Kesultanan Bima di atas Bukit Dana Traha, tempat peristirahatan Sultan Abdul Kahir (La Ka’i, Raja Bima pertama yang memeluk Islam dan mendirikan Kesultanan Bima pada 5 Juli 1640 M) beserta para Sultan Bima di Kelurahan Dara, Kecamatan Rasanae Barat, Kota Bima, Provinsi Nusa Tenggara Barat.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 – ke-20 M (Sultan Abdul Kahir Memeluk Islam 15 Rabiul Awal 1030 H / 1621 M & Wafat 1640 M)',
    province: 'Nusa Tenggara Barat',
    city: 'Bima',
    district: 'Kec. Rasanae Barat',
    address: 'Bukit Dana Traha, Kel. Dara, Kec. Rasanae Barat, Kota Bima (Pulau Sumbawa)',
    location: {
      lat: -8.4512,
      lng: 118.7325,
      address: 'Bukit Dana Traha, Kel. Dara, Kec. Rasanae Barat, Kota Bima (Pulau Sumbawa)',
      district: 'Kec. Rasanae Barat',
      city: 'Bima',
      province: 'Nusa Tenggara Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Asi_Mbojo.jpg',
    imageSource: 'Wikimedia Commons — Istana Kesultanan Bima (Asi Mbojo) di Kota Bima, Pulau Sumbawa, NTB (Warisan Sultan Abdul Kahir & Kompleks Makam Dana Traha)',
    sanad:
      'Sultan Abdul Kahir I (La Ka’i); putra Mahkota Kerajaan Bima yang memeluk Islam di bawah bimbingan Datuk ri Bandang dan Datuk ri Tiro (utusan Kesultanan Gowa-Tallo di Sape pada 15 Rabiul Awal 1030 H / 7 Februari 1621 M) serta menjalin persaudaraan erat dengan Kesultanan Gowa Makassar.',
    karya: [
      'Transformasi Kerajaan Bima menjadi Kesultanan Islam Bima pada 14 Rabiul Awal 1050 H / 5 Juli 1640 M dengan falsafah "Maja Labo Dahu" (Malu dan Takut kepada Allah SWT)',
      'Tradisi penulisan naskah resmi kesultanan beraksara Arab-Melayu (*Bo’ Sangaji Kai*) yang merekam sejarah hukum dan keulamaan Bima',
      'Kompleks Makam Raja-Raja Bukit Dana Traha di Kelurahan Dara, Kota Bima',
    ],
    history:
      '**Kompleks Makam Dana Traha** (*Tolobali Dana Traha*) yang terletak di atas bukit di **Kelurahan Dara, Kecamatan Rasanae Barat, Kota Bima (Pulau Sumbawa), Provinsi Nusa Tenggara Barat** adalah kompleks pemakaman suci para Sultan dan ulama **Kesultanan Bima (Mbojo)**. Tokoh utama yang bersemayam di bukit ini adalah **Sultan Abdul Kahir I** (nama asli sebelum Islam: **La Ka’i**), raja Bima pertama yang memeluk agama Islam dan peletak dasar peradaban Islam di Pulau Sumbawa bagian timur.\n\nBerdasarkan naskah primer ***Bo’ Sangaji Kai*** (catatan harian resmi Kesultanan Bima yang disunting oleh Prof. Henri Chambert-Loir dan Siti Maryam Salahuddin, 1999), La Ka’i bersama para bangsawan Bima mengucapkan syahadat di Sape pada **15 Rabiul Awal 1030 H (7 Februari 1621 M)** di hadapan dua ulama besar penyebar Islam Sulawesi Selatan, yakni **Datuk ri Bandang (Abdul Makmur Khatib Tunggal)** dan **Datuk ri Tiro (Nurdin Ariyani Khatib Bungsu)**. Setelah melalui perjuangan panjang menghadapi oposisi internal yang dibantu VOC, pada **14 Rabiul Awal 1050 H (5 Juli 1640 M)** beliau resmi dinobatkan sebagai **Sultan Bima I**.\n\nSelain Sultan Abdul Kahir I, di Bukit Dana Traha juga dimakamkan **Sultan Abdul Khair Sirajuddin** (Sultan Bima II), **Sultan Nuruddin Abubakar Ali Syah**, hingga **Sultan Ibrahim** dan **Sultan Muhammad Salahuddin**. Dari Kesultanan Bima inilah syiar Islam menyebar luas ke Dompu, Sumbawa, Manggarai (Flores Barat), hingga Sumba.',
    karomah: [
      'Dalam kajian filologi *Bo’ Sangaji Kai* (Henri Chambert-Loir & Siti Maryam R. Salahuddin, 1999), keistimewaan Sultan Abdul Kahir dan para Sultan Bima yang dimakamkan di Bukit Dana Traha adalah keteguhan mereka menegakkan falsafah hidup masyarakat Bima (*Dou Mbojo*): **"Maja Labo Dahu"**—yakni rasa malu dan takut berbuat maksiat kepada Allah SWT serta malu menyakiti sesama manusia.<!--more-->\n\nHingga kini, Bukit Dana Traha dipelihara sebagai situs cagar budaya sakral yang menghadap langsung ke Teluk Bima dan Istana Asi Mbojo.',
    ],
    untoldStory:
      'Nama **Dana Traha** dalam bahasa Bima (*Nggahi Mbojo*) bermakna *"Tanah Tempat Peristirahatan"*. Di kompleks bukit ini, batu-batu nisan para Sultan Bima dari abad ke-17 hingga ke-20 M dipahat dengan ragam hias kaligrafi Arab dan motif flora Nusantara yang memiliki kemiripan erat dengan nisan-nisan Sultan Gowa di Katangka Makassar.<!--more-->\n\nTanggal penobatan Sultan Abdul Kahir sebagai Sultan Bima (**5 Juli 1640 M**) kini diabadikan sebagai **Hari Jadi Bima** setiap tahunnya.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Makam Dana Traha (Sultan Abdul Kahir) di Kota Bima umumnya bertawassul memohon kepada Allah SWT keteguhan memegang prinsip kejujuran ("Maja Labo Dahu"), kemuliaan amanah kepemimpinan, serta keberkahan bagi masyarakat Pulau Sumbawa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Abdul Kahir & Para Sultan Bima (Bukit Dana Traha Kota Bima)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ عَبْدِ الْقَاهِرِ الْأَوَّلِ وَسَلَاطِينِ وَعُلَمَاءِ بِيمَا دَانَا تْرَاهَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا الْحَيَاءَ وَالْخَشْيَةَ مِنْكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ عَبْدِ الْقَاهِرِ الْأَوَّلِ وَسَلَاطِينِ وَعُلَمَاءِ بِيمَا دَانَا تْرَاهَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَارْزُقْنَا الْحَيَاءَ وَالْخَشْيَةَ مِنْكَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan 'Abdil-Qaahir al-Awwal wa Salaathiini wa 'Ulamaa-i Bima Dana Traha syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum warzuqnal-hayaa-a wal-khasyyata minka wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Abdul Kahir I beserta seluruh sultan dan ulama Kesultanan Bima di Bukit Dana Traha, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami sifat malu dan takut kepada-Mu, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Abdul Kahir I beserta seluruh sultan dan ulama Kesultanan Bima di Bukit Dana Traha, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, karuniakanlah kepada kami sifat malu dan takut kepada-Mu, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Juli / 14 Rabiul Awal (Ziarah Agung Hari Jadi Kesultanan Bima & Haul Sultan Abdul Kahir di Kompleks Makam Bukit Dana Traha, Kelurahan Dara, Kota Bima).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat (dianjurkan memakai tenun *Tembe Nggoli* khas Bima), menjaga kelestarian struktur batu nisan cagar budaya di Bukit Dana Traha, serta mematuhi tata tertib juru pelihara makam.',
    facilities: ['Kompleks Cagar Budaya Makam Kesultanan Bima Bukit Dana Traha', 'Tangga Pendakian & Pendopo Bukit Dana Traha', 'Dekat Museum Asi Mbojo & Masjid Sultan Muhammad Salahuddin Bima', 'Area Parkir Kendaraan'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Chambert-Loir, Henri & Siti Maryam R. Salahuddin (1999). Bo’ Sangaji Kai: Catatan Kerajaan Bima. Jakarta: Ecole française d’Extrême-Orient (EFEO) & Yayasan Obor Indonesia.',
      'Abdullah, Tajib (1995). Sejarah Bima Dana Mbojo. Jakarta: Harapan Masa PGRI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // III. PROVINSI NUSA TENGGARA TIMUR (SOLOR, KUPANG & ENDE)
  // =========================================================================
  {
    id: 'makam-sultan-menanga-solor',
    name: 'Kompleks Makam Sultan Menanga & Penyebar Islam Pulau Solor (Menanga, Solor Timur, Kabupaten Flores Timur)',
    title: 'Kompleks Makam Sultan Menanga Pulau Solor (Pusat Persekutuan Kerajaan Islam Solor Watan Lema NTT)',
    description:
      'Kompleks Cagar Budaya Makam Sultan Menanga (Kiai/Kaicil Pertawi & Raja-Raja Islam Menanga) serta Masjid Tua Menanga, pusat persekutuan lima kerajaan Islam pesisir (*Solor Watan Lema*) di Desa Menanga, Kecamatan Solor Timur, Pulau Solor, Kabupaten Flores Timur, Provinsi Nusa Tenggara Timur.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – ke-17 M (Masa Kejayaan Persekutuan Islam Solor Watan Lema, 1550–1650 M)',
    province: 'Nusa Tenggara Timur',
    city: 'Flores Timur',
    district: 'Kec. Solor Timur',
    address: 'Desa Menanga, Kec. Solor Timur, Pulau Solor, Kabupaten Flores Timur',
    location: {
      lat: -8.4312,
      lng: 123.0815,
      address: 'Desa Menanga, Kec. Solor Timur, Pulau Solor, Kabupaten Flores Timur',
      district: 'Kec. Solor Timur',
      city: 'Flores Timur',
      province: 'Nusa Tenggara Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Larantuka_and_Ile_Mandiri.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Kepulauan Flores Timur & Selat Solor, Nusa Tenggara Timur (Wilayah Kerajaan Islam Menanga & Solor Watan Lema)',
    sanad:
      'Sultan Menanga (Kaicil Pertawi / Syahbuddin) dan ulama penyebar Islam Pulau Solor; terhubung langsung dengan jaringan dakwah maritim Pesantren Sunan Giri (Gresik), Kesultanan Ternate, Kesultanan Gowa-Tallo, dan saudagar Muslim Bengali-Palembang.',
    karya: [
      'Pembentukan konfederasi lima kerajaan Islam pesisir **Solor Watan Lema** (Lohayong, Lamakera, Lamahala, Terong, dan Labala) di Kepulauan Solor-Adonara-Lembata',
      'Perjuangan heroik mempertahankan kedaulatan perniagaan dan iman umat Islam Kepulauan Solor menghadapi kolonialisme Portugis pada abad ke-16 dan ke-17 M',
      'Warisan Situs Makam Sultan Menanga, Masjid Tua Menanga, dan meriam kuno di Kecamatan Solor Timur',
    ],
    history:
      '**Kompleks Makam Sultan Menanga dan Ulama Penyebar Islam Pulau Solor** di **Desa Menanga, Kecamatan Solor Timur, Kabupaten Flores Timur, Provinsi Nusa Tenggara Timur** merupakan bukti autentik bahwa syiar Islam telah berakar kuat di kepulauan Nusa Tenggara Timur sejak pertengahan abad ke-16 M. Berdasarkan sumber-sumber primer Portugis, Belanda (VOC), serta kajian sejarawan **Dietrich Stefan** dan **Roelofsz**, Islam masuk ke Pulau Solor dan Adonara sekitar tahun **1520–1550 M** melalui para mubaligh santri **Sunan Giri (Gresik)**, utusan **Kesultanan Ternate**, serta ulama asal Palembang/Benggala (seperti **Syahbuddin bin Ali bin Salman Al-Farisi**).\n\nUntuk membendung ekspansi militer dan monopoli Portugis yang membangun benteng di Lohayong (1566 M), para raja Muslim di Kepulauan Solor membentuk persekutuan maritim lima kerajaan Islam pesisir yang terkenal dengan nama **Solor Watan Lema** (*Lima Pantai Solor*): yakni **Kerajaan Lohayong** dan **Kerajaan Lamakera** di Pulau Solor, **Kerajaan Lamahala** dan **Kerajaan Terong** di Pulau Adonara, serta **Kerajaan Labala** di Pulau Lembata, dengan **Menanga** sebagai salah satu basis kepemimpinan kesultanannya.\n\nDi Desa Menanga, Kecamatan Solor Timur, kompleks makam para Sultan Menanga (**Kaicil Pertawi** dan penerusnya) beserta situs masjid tuanya tetap terawat dan dihormati oleh masyarakat Flores Timur—baik yang beragama Islam maupun Katolik—dalam ikatan persaudaraan adat *Lamaholot* (*Gelekat Lewo*).',
    karomah: [
      'Dalam kajian sejarah Islam Nusa Tenggara Timur (Prof. M. Shaleh Putuhena dan Balai Arkeologi), keteguhan para Sultan dan ulama Solor Watan Lema di Menanga dan Lamakera mampu menjaga eksistensi komunitas Muslim pesisir Flores Timur selama lebih dari empat abad di tengah kepungan benteng kolonial Portugis dan VOC.<!--more-->\n\nSemangat persaudaraan budaya *Lamaholot* menjadikan umat Islam di Menanga/Lamakera dan umat Katolik di Larantuka hidup rukun sebagai satu keluarga kandung.',
    ],
    untoldStory:
      'Banyak masyarakat Indonesia belum mengetahui bahwa di **Kabupaten Flores Timur (Pulau Solor dan Pulau Adonara)** berdiri kerajaan-kerajaan Islam tua yang memiliki hubungan korespondensi langsung dengan **Pesantren Giri Kedaton di Gresik** dan **Kesultanan Ternate** sejak abad ke-16 M.<!--more-->\n\nHingga kini, di Desa Menanga dan Lamakera (Solor Timur) masih tersimpan peninggalan sejarah berupa kompleks makam batu karang kuno, mimbar masjid tua, dan tradisi pembacaan barzanji berbahasa Arab-Melayu.',
    barokahHajat:
      'Peziarah dan peneliti sejarah yang mengunjungi Kompleks Makam Sultan Menanga di Pulau Solor Flores Timur umumnya bertawassul memohon kepada Allah SWT keteguhan iman di daerah minoritas, keberanian membela kebenaran, serta kerukunan persaudaraan sebangsa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Menanga & Ulama Solor Watan Lema (Flores Timur NTT)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ سَلَاطِينِ مِينَانْغَا وَعُلَمَاءِ جَزِيرَةِ سُولُورْ وَاتَانْ لِيمَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْ إِيمَانَنَا وَاحْفَظْ أُخُوَّتَنَا فِي الدِّينِ وَالْوَطَنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ سَلَاطِينِ مِينَانْغَا وَعُلَمَاءِ جَزِيرَةِ سُولُورْ وَاتَانْ لِيمَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَثَبِّتْ إِيمَانَنَا وَاحْفَظْ أُخُوَّتَنَا فِي الدِّينِ وَالْوَطَنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi Salaathiini Menanga wa 'Ulamaa-i Jaziirati Solor Watan Lema syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa tsabbit iimaananaa wahfazh ukhuwwatanaa fid-diini wal-wathan.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para Sultan Menanga dan ulama penyebar Islam Pulau Solor Watan Lema Flores Timur, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah iman kami, serta peliharalah persaudaraan kami dalam agama dan tanah air.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para Sultan Menanga dan ulama penyebar Islam Pulau Solor Watan Lema Flores Timur, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, teguhkanlah iman kami, serta peliharalah persaudaraan kami dalam agama dan tanah air.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Maulid Nabi SAW (Ziarah & Doa Bersama di Kompleks Makam Sultan Menanga, Desa Menanga, Kecamatan Solor Timur, Kabupaten Flores Timur).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, melapor kepada imam masjid/tetua adat Desa Menanga sebelum memasuki area makam cagar budaya, serta menjunjung tinggi nilai persaudaraan adat Lamaholot.',
    facilities: ['Kompleks Makam Cagar Budaya Sultan Menanga', 'Masjid Tua Desa Menanga Solor Timur', 'Dermaga Penyeberangan Perahu Motor Larantuka–Menanga Solor'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Barnes, R.H. (1987). Avarice and Iniquity at the Solor Fort. Bijdragen tot de Taal-, Land- en Volkenkunde (BKI), 143(2/3), 208–236.',
      'Dietrich, Stefan (1984). Islam and Christianity in East Flores (Solor Watan Lema). Kupang / Leiden.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-keramat-kampung-solor-kupang',
    name: 'Makam Ulama Penyebar Islam Kampung Solor & Masjid Al-Fatah (Kampung Solor, Kota Lama, Kota Kupang)',
    title: 'Makam Keramat Kampung Solor & Masjid Al-Fatah (Jejak Ulama Penyebar Islam Kota Kupang NTT, 1806 M)',
    description:
      'Kompleks Jejak Sejarah Ulama Penyebar Islam Kampung Solor dan Masjid Tua Al-Fatah (berdiri 1806 M oleh Syaikh Budiman / Bapainya Syaikh), pusat dakwah Islam tertua di Kelurahan Solor, Kecamatan Kota Lama, Kota Kupang, Provinsi Nusa Tenggara Timur.',
    category: 'Ulama Nusantara',
    era: 'Awal Abad ke-19 M (Perintisan Komunitas Muslim Kampung Solor & Masjid Al-Fatah Kupang, 1806 M)',
    province: 'Nusa Tenggara Timur',
    city: 'Kupang',
    district: 'Kec. Kota Lama',
    address: 'Kel. Kampung Solor / Bonipoi, Kec. Kota Lama, Kota Kupang',
    location: {
      lat: -10.1632,
      lng: 123.5815,
      address: 'Kel. Kampung Solor / Bonipoi, Kec. Kota Lama, Kota Kupang',
      district: 'Kec. Kota Lama',
      city: 'Kupang',
      province: 'Nusa Tenggara Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Kupang_bay.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Pesisir Teluk Kupang & Kecamatan Kota Lama, Kota Kupang, NTT (Lokasi Bersejarah Kampung Solor & Masjid Al-Fatah 1806 M)',
    sanad:
      'Syaikh Budiman (Bapainya Syaikh) bersama para ulama dan kapitan Muslim asal Pulau Solor (Lamakera/Menanga), Bima, dan Bugis yang membuka pemukiman Muslim Kampung Solor di pesisir Teluk Kupang pada awal abad ke-19 M.',
    karya: [
      'Pendirian Masjid Al-Fatah Kampung Solor/Bonipoi pada tahun 1806 M (masjid pertama dan tertua di Pulau Timor / Kota Kupang)',
      'Pembentukan pemukiman Muslim Kampung Solor di Kecamatan Kota Lama yang menjadi pusat niaga maritim dan dakwah Islam di Kota Kupang',
      'Warisan toleransi dan kerukunan antarumat beragama di jantung Kota Kupang selama lebih dari dua abad',
    ],
    history:
      '**Situs Sejarah dan Makam Ulama Penyebar Islam Kampung Solor** di **Kecamatan Kota Lama, Kota Kupang, Provinsi Nusa Tenggara Timur** merupakan monumen sejarah masuk dan berkembangnya agama Islam di **Pulau Timor**. Berdasarkan penelitian sejarah Islam di Kupang (Balai Pelestarian Nilai Budaya dan Lektur Keagamaan Kemenag RI), gelombang kedatangan umat Islam ke pesisir Teluk Kupang dipelopori oleh para pelaut, saudagar, dan ulama asal **Pulau Solor (Lamakera dan Menanga)** yang datang ke Kupang pada akhir abad ke-18 hingga awal abad ke-19 M.\n\nAtas kesepakatan dengan Raja Helong dan otoritas pelabuhan Kupang saat itu, komunitas Muslim asal Pulau Solor diberi wilayah pemukiman di pesisir pantai yang kemudian dinamakan **Kampung Solor (Kelurahan Solor, Kecamatan Kota Lama)**. Pada tahun **1806 M**, ulama pemimpin komunitas tersebut yang dikenal dengan nama **Syaikh Budiman (Bapainya Syaikh)** bersama **Atok Kiai / Kapitan Muslim Solor** mendirikan **Masjid Al-Fatah**, masjid pertama di seluruh daratan Pulau Timor.\n\nPara ulama dan sesepuh perintis Kampung Solor serta Batu Merah/Oeba di Kota Kupang ini mewariskan tradisi keislaman yang santun, terbuka, dan sangat dihormati oleh masyarakat Kristen Protestan maupun Katolik di Kota Kupang hingga menjadikan Kupang terkenal sebagai salah satu kota paling toleran di Indonesia.',
    karomah: [
      'Dalam catatan sejarah lokal Muslim Kupang, keberkahan dakwah Syaikh Budiman dan para sesepuh Kampung Solor tampak dari bertahannya Masjid Al-Fatah dan komunitas Muslim Kota Lama Kupang sejak tahun 1806 M melewati masa kolonial Belanda, pendudukan Jepang, hingga era modern sebagai oase ukhuwah di Pulau Timor.<!--more-->\n\nSetiap bulan suci Ramadhan, kawasan Kampung Solor di Kecamatan Kota Lama menjadi pusat wisata kuliner takjil dan silaturahmi lintas agama bagi seluruh warga Kota Kupang.',
    ],
    untoldStory:
      'Nama **Kelurahan Solor (Kampung Solor)** di pusat Kota Kupang adalah bukti abadi peran besar para pelaut dan mubaligh dari **Pulau Solor (Flores Timur)** dalam menyebarkan Islam ke ibu kota Provinsi Nusa Tenggara Timur.<!--more-->\n\nDi sekitar kawasan Kota Lama Kupang (Kampung Solor, Bonipoi, hingga Air Mata dan Oeba), jejak makam para imam dan sesepuh awal tetap diziarahi oleh keluarga besar Muslim Kupang.',
    barokahHajat:
      'Peziarah yang mengunjungi situs sejarah dan makam ulama perintis Kampung Solor di Kota Kupang umumnya bertawassul memohon kepada Allah SWT kelapangan rezeki di tanah perantauan, kerukunan hidup bertetangga lintas iman, serta keteguhan menjaga ibadah shalat berjamaah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syaikh Budiman & Ulama Perintis Kampung Solor (Kota Kupang NTT)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ بُودِيمَانْ وَعُلَمَاءِ كَامْفُونْغ سُولُورْ كُوبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي دِينِنَا وَمَعِيشَتِنَا وَأَلِّفْ بَيْنَ قُلُوبِنَا فِي السَّلَامِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ بُودِيمَانْ وَعُلَمَاءِ كَامْفُونْغ سُولُورْ كُوبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي دِينِنَا وَمَعِيشَتِنَا وَأَلِّفْ بَيْنَ قُلُوبِنَا فِي السَّلَامِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Budiman wa 'Ulamaa-i Kampung Solor Kupang syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik lanaa fii diininaa wa ma'iisyatinaa wa allif baina quluubinaa fis-salaam.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syaikh Budiman beserta para ulama perintis Kampung Solor Kota Kupang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah agama dan penghidupan kami, serta tautkanlah hati kami dalam kedamaian.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syaikh Budiman beserta para ulama perintis Kampung Solor Kota Kupang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah agama dan penghidupan kami, serta tautkanlah hati kami dalam kedamaian.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Menjelang Ramadhan (Ziarah & Doa Bersama Sesepuh Muslim Kampung Solor & Masjid Al-Fatah, Kecamatan Kota Lama, Kota Kupang).',
    localAdab:
      'Berpakaian muslim sopan dan rapi, menjaga ketertiban di lingkungan padat penduduk Kelurahan Kampung Solor / Bonipoi Kota Lama Kupang, serta memakmurkan shalat berjamaah di Masjid Tua Al-Fatah.',
    facilities: ['Masjid Bersejarah Al-Fatah Kupang (1806 M)', 'Kawasan Cagar Sejarah Muslim Kampung Solor & Air Mata Kupang', 'Tempat Wudhu & Ruang Ibadah', 'Akses Pusat Kota Lama Kupang'],
    openingHours: 'Buka Setiap Hari 05.00 – 22.00 WITA',
    references: [
      'Liliweri, Alo dkk. (2015). Sejarah Masuknya Islam di Kupang dan Eksistensi Kampung Solor. Kupang: Universitas Nusa Cendana.',
      'Direktorat Sejarah dan Nilai Budaya (2014). Masjid-Masjid Bersejarah di Indonesia Timur (Masjid Al-Fatah Kupang 1806). Jakarta: Kemendikbud RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-raja-islam-pulau-ende',
    name: 'Kompleks Makam Raja-Raja Kerajaan Islam Ende (Pulau Ende, Kabupaten Ende)',
    title: 'Kompleks Makam Raja-Raja Kerajaan Islam Ende (Pusat Kerajaan Islam Maritim Pulau Ende Flores, 1630–1907 M)',
    description:
      'Kompleks Cagar Budaya Makam Raja-Raja Kerajaan Islam Ende (Marhum Bao / Jari Jawa dan keturunannya) di Kecamatan Pulau Ende, Kabupaten Ende, Pulau Flores, Provinsi Nusa Tenggara Timur.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 – Awal Abad ke-20 M (Berdirinya Kerajaan Islam Ende sekitar 1630 M)',
    province: 'Nusa Tenggara Timur',
    city: 'Ende',
    district: 'Kec. Pulau Ende',
    address: 'Desa Rendoraterua / Renga Menge, Kec. Pulau Ende, Kabupaten Ende',
    location: {
      lat: -8.8752,
      lng: 121.5218,
      address: 'Desa Rendoraterua / Renga Menge, Kec. Pulau Ende, Kabupaten Ende',
      district: 'Kec. Pulau Ende',
      city: 'Ende',
      province: 'Nusa Tenggara Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Kelimutu_2008-08-05.jpg',
    imageSource: 'Wikimedia Commons — Lanskap Kabupaten Ende, Pulau Flores, Nusa Tenggara Timur (Wilayah Sejarah Kerajaan Islam Pulau Ende)',
    sanad:
      'Raja-raja dan ulama Kerajaan Islam Ende (keturunan Jari Jawa / Marhum Bao beserta jaringan ulama Kesultanan Bima, Gowa-Makassar, dan Ternate) yang mengislamkan Pulau Ende dan pesisir selatan Flores sejak awal abad ke-17 M.',
    karya: [
      'Pendirian Kerajaan Islam Ende (sekitar tahun 1630 M) yang berpusat di Pulau Ende dan pesisir Teluk Ende, Kabupaten Ende',
      'Pengusiran garnisun Portugis dari Benteng Pulau Ende pada awal abad ke-17 M oleh laskar Muslim Ende bersama armada Makassar',
      'Kompleks Makam Kuno Raja-Raja Ende dan artefak meriam pertahanan di Kecamatan Pulau Ende',
    ],
    history:
      '**Kompleks Makam Raja-Raja Kerajaan Islam Ende** yang terletak di **Kecamatan Pulau Ende, Kabupaten Ende, Provinsi Nusa Tenggara Timur** menyimpan lembaran emas sejarah peradaban Islam di bagian tengah **Pulau Flores**. Berdasarkan penelitian sejarawan Belanda **S. Roos (1872)**, **Van Suchtelen (1921)**, serta kajian arkeologi Islam di NTT, pada akhir abad ke-16 M bangsa Portugis sempat membangun benteng di Pulau Ende. Namun, masyarakat lokal yang dipimpin oleh tokoh Muslim yang dikenal dalam historiografi Ende sebagai **Jari Jawa (Marhum Bao)** bersama bantuan armada Muslim dari Makassar dan Bima berhasil merebut benteng tersebut dan mengusir Portugis sekitar tahun **1605–1630 M**.\n\nSejak saat itu, berdirilah **Kerajaan Islam Ende** yang diperintah secara turun-temurun oleh 14 generasi Raja Muslim (di antaranya **Raja Marhum Bao, Raja Kunyi, Raja Arubusman, hingga Raja Pua Nota dan Raja Haji Abdul Majid**). Pulau Ende menjadi pusat pendidikan Al-Qur’an, pembuatan perahu layar, dan tenun ikat Islami bernuansa motif patola (*Zawo Ende*) di pesisir selatan Flores.\n\nDi Kecamatan Pulau Ende (yang ditempuh sekitar 30–45 menit menggunakan perahu motor dari dermaga Kota Ende), kompleks makam batu karang berinskripsi Arab-Melayu milik para Raja dan ulama Kerajaan Islam Ende masih terawat dengan baik dan menjadi tujuan ziarah bersejarah di Pulau Flores.',
    karomah: [
      'Dalam catatan sejarah Kabupaten Ende, eksistensi Kerajaan Islam Ende dan jaringan ulamanya di Ende menjadi alasan historis mengapa ketika Bung Karno diasingkan oleh pemerintah kolonial Belanda ke Ende (1934–1938 M), beliau disambut hangat oleh masyarakat Ende yang religius dan pluralis (baik tokoh Islam dari jaringan Kerajaan Ende maupun tokoh Katolik SVD) hingga melahirkan renungan lima butir Pancasila.<!--more-->\n\nMakam para Raja Ende di Pulau Ende menjadi saksi bisu ketangguhan iman masyarakat pesisir Flores.',
    ],
    untoldStory:
      'Di **Pulau Ende**, hampir 100% penduduknya memeluk agama Islam secara turun-temurun sejak abad ke-17 M, lengkap dengan tradisi seni *Hadrah*, pembacaan kitab *Barzanji*, dan pembuatan sarung tenun ikat bermotif kaligrafi/geometris yang tidak menggunakan gambar makhluk bernyawa.<!--more-->\n\nPeziarah yang berkunjung ke Kota Ende dapat menyeberang dari Pelabuhan Ippi atau Pantai Kota Raja menuju Pulau Ende untuk berziarah ke kompleks makam para Raja Islam Ende.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Makam Raja-Raja Kerajaan Islam Ende di Pulau Ende umumnya bertawassul memohon kepada Allah SWT kemuliaan akhlak, keteguhan mempertahankan akidah keluarga, serta keberkahan usaha bahari dan kerajinan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Raja-Raja & Ulama Kerajaan Islam Ende (Pulau Ende Flores NTT)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ مُلُوكِ وَعُلَمَاءِ مَمْلَكَةِ إِينْدِي الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ مُلُوكِ وَعُلَمَاءِ مَمْلَكَةِ إِينْدِي الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi Muluuki wa 'Ulamaa-i Mamlakati Ende al-Islaamiyyah syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa a'izzal-Islaama wal-Muslimiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para raja dan ulama Kerajaan Islam Ende di Pulau Ende Flores, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum muslimin, serta limpahkanlah keberkahan mereka kepada kami di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para raja dan ulama Kerajaan Islam Ende di Pulau Ende Flores, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum muslimin, serta limpahkanlah keberkahan mereka kepada kami di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Maulid Nabi SAW (Ziarah Adat & Doa Bersama di Kompleks Makam Raja-Raja Kerajaan Islam Ende, Kecamatan Pulau Ende, Kabupaten Ende).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, berkoordinasi dengan juru kunci makam dan tokoh adat di Pulau Ende, serta menjaga kelestarian batu nisan kuno dan benteng bersejarah Pulau Ende.',
    facilities: ['Kompleks Makam Cagar Budaya Raja-Raja Islam Pulau Ende', 'Masjid Jami’ Pulau Ende', 'Situs Benteng & Meriam Kuno Pulau Ende', 'Dermaga Perahu Penyeberangan Kota Ende – Pulau Ende'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WITA',
    references: [
      'Van Suchtelen, B.C.C.M.M. (1921). Endeh (Flores). Mededeelingen van het Bureau voor de Bestuurszaken der Buitenbezittingen. Weltevreden.',
      'Parimartha, I Gde (2002). Perdagangan dan Politik di Nusa Tenggara 1815–1915. Jakarta: Djambatan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  // =========================================================================
  // IV. PROVINSI MALUKU (LEIHITU AMBON & BANDA NEIRA)
  // =========================================================================
  {
    id: 'masjid-tua-wapauwe-kaitetu',
    name: 'Kompleks Makam Ulama & Masjid Tua Wapauwe 1414 M — Jejak Jamilu, Perdana Jamilu & Imam Rijali (Negeri Kaitetu, Leihitu, Kabupaten Maluku Tengah)',
    title: 'Kompleks Makam Ulama & Masjid Tua Wapauwe Kaitetu (Jejak Imam Rijali & Penyebar Islam Jazirah Leihitu 1414 M)',
    description:
      'Kompleks Cagar Budaya Nasional Masjid Tua Wapauwe (berdiri 1414 M di Gunung Wawane) dan Makam Ulama Penyebar Islam Jazirah Leihitu (Jamilu, Perdana Jamilu, dan sanad keilmuan Imam Rijali) di Negeri Kaitetu, Kecamatan Leihitu, Pulau Ambon, Kabupaten Maluku Tengah, Provinsi Maluku.',
    category: 'Ulama Nusantara',
    era: 'Awal Abad ke-15 – Abad ke-17 M (Masjid Wapauwe berdiri 1414 M; Hikayat Tanah Hitu ditulis Imam Rijali 1646–1657 M)',
    province: 'Maluku',
    city: 'Maluku Tengah',
    district: 'Kec. Leihitu',
    address: 'Negeri Kaitetu, Kec. Leihitu, Pulau Ambon, Kabupaten Maluku Tengah',
    location: {
      lat: -3.5818,
      lng: 128.0885,
      address: 'Negeri Kaitetu, Kec. Leihitu, Pulau Ambon, Kabupaten Maluku Tengah',
      district: 'Kec. Leihitu',
      city: 'Maluku Tengah',
      province: 'Maluku',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Wapauwe_Mosque.jpg',
    imageSource: 'Wikimedia Commons — Masjid Tua Wapauwe (1414 M) di Negeri Kaitetu, Jazirah Leihitu, Kabupaten Maluku Tengah',
    sanad:
      'Perdana Jamilu (ulama asal Jailolo/Halmahera yang mengislamkan masyarakat Wawane-Kaitetu pada 1414 M), dilanjutkan oleh Imam Muhammad Al-Khathib dan Mushanif (penyalin mushaf Al-Qur’an kuno 1550 M/1590 M), serta sejarawan-ulama besar Tanah Hitu Imam Rijali (penulis Hikayat Tanah Hitu).',
    karya: [
      'Pembangunan Masjid Tua Wapauwe pada tahun 1414 M dengan konstruksi kayu tradisional tanpa satu pun paku besi dan atap ijuk sagu yang masih berdiri kokoh hingga hari ini',
      'Penyalinan Mushaf Al-Qur’an Kuno tulisan tangan Imam Muhammad Al-Khathib (1550 M) dan cucunya Mushanif (1590 M) di atas kertas kulit kayu Eropa-Lokal tanpa iluminasi pinggir',
      'Penulisan naskah sejarah primer *Hikayat Tanah Hitu* oleh Imam Rijali (ulama Kerajaan Tanah Hitu yang wafat di Makassar abad ke-17 M)',
    ],
    history:
      '**Kompleks Masjid Tua Wapauwe dan Makam Para Ulama Penyebar Islam Jazirah Leihitu** yang terletak di **Negeri Kaitetu, Kecamatan Leihitu (pesisir utara Pulau Ambon), Kabupaten Maluku Tengah, Provinsi Maluku** merupakan salah satu monumen peradaban Islam tertua di seluruh kepulauan Nusantara. Berdasarkan kajian arkeologi Islam dan filologi naskah ***Hikayat Tanah Hitu*** karya **Imam Rijali** (disunting oleh **Z.J. Manusama, 1977** dan **Hans Straver, 2018**), masjid ini semula didirikan pada tahun **1414 M** oleh ulama asal Jailolo (Maluku Utara) bernama **Perdana Jamilu** di lereng **Gunung Wawane** dengan nama *Masjid Wawane*.\n\nPada tahun **1614 M**, menyusul tekanan kolonial Belanda (VOC) terhadap **Kerajaan Islam Tanah Hitu**, masyarakat Wawane memindahkan bangunan masjid tersebut turun ke dataran pesisir **Negeri Kaitetu** di bawah pohon mangga hutan berbuah abu (*Wapa*) sehingga dinamakan **Masjid Wapauwe** (*Masjid di Bawah Pohon Mangga Berabu*). Konstruksi kayu masjid berukuran 10 x 10 meter ini dirangkai menggunakan pasak kayu tanpa sebatang paku besi pun.\n\nDi Negeri Kaitetu dan Jazirah Leihitu ini pula lahir tradisi keulamaan besar Maluku Tengah, termasuk penyalinan **Mushaf Al-Qur’an tulis tangan tertua di Maluku (1550 M dan 1590 M)** oleh **Imam Muhammad Al-Khathib** dan cucunya **Mushanif**, serta perjuangan intelektual **Imam Rijali** (Mihirjiguna), ulama sekaligus penasihat utama Kapitan Kakiali dan Kapitan Telukabessy dalam Perang Hitu melawan VOC.',
    karomah: [
      'Dalam tradisi lisan masyarakat Negeri Kaitetu dan catatan sejarah Cagar Budaya Nasional Provinsi Maluku, saat pemindahan Masjid Wawane dari puncak Gunung Wawane turun ke Negeri Kaitetu pada tahun 1614 M, setelah masyarakat bermunajat kepada Allah SWT, bangunan masjid berpindah dengan utuh ke lokasi saat ini.<!--more-->\n\nKeajaiban arsitektur pasak kayu Masjid Tua Wapauwe terbukti mampu bertahan lebih dari 600 tahun menghadapi berbagai gempa bumi besar di Kepulauan Maluku.',
    ],
    untoldStory:
      'Di rumah penjaga adat **Masjid Tua Wapauwe** di Negeri Kaitetu masih tersimpan pusaka literasi Islam abad ke-16 M yang sangat langka: yakni **Mushaf Al-Qur’an tulisan tangan Imam Muhammad Al-Khathib (selesai ditulis tahun 1550 M)** dan kitab khutbah Jumat serta kalender falakiyah kuno Tanah Hitu.<!--more-->\n\nJazirah Leihitu (Hitu Lama, Hitu Messing, Wakal, Mamala, Morela, hingga Kaitetu) hingga kini menjadi jantung keislaman di Pulau Ambon.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang mengunjungi Kompleks Masjid Tua Wapauwe & Makam Ulama Leihitu di Kaitetu Maluku Tengah umumnya bertawassul memohon kepada Allah SWT kelestarian iman lintas generasi, kecintaan terhadap Al-Qur’an, serta kekokohan rumah tangga dan masyarakat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Perdana Jamilu, Imam Muhammad Al-Khathib, Imam Rijali & Ulama Tanah Hitu (Kaitetu Maluku)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ فَرْدَانَا جَمِيلُو وَالْإِمَامِ مُحَمَّدٍ الْخَطِيبِ وَالْإِمَامِ رِجَالِي وَعُلَمَاءِ وَافَاوْوِي كَايْتِيتُو مَالُوكُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْ إِيمَانَنَا وَاجْعَلِ الْقُرْآنَ رَبِيعَ قُلُوبِنَا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ فَرْدَانَا جَمِيلُو وَالْإِمَامِ مُحَمَّدٍ الْخَطِيبِ وَالْإِمَامِ رِجَالِي وَعُلَمَاءِ وَافَاوْوِي كَايْتِيتُو مَالُوكُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاحْفَظْ إِيمَانَنَا وَاجْعَلِ الْقُرْآنَ رَبِيعَ قُلُوبِنَا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi Perdana Jamilu wal-Imaam Muhammad al-Khathiib wal-Imaam Rijaalii wa 'Ulamaa-i Wapauwe Kaitetu Maluku syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wahfazh iimaananaa waj'alil-Qur-aana rabii'a quluubinaa.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Perdana Jamilu, Imam Muhammad Al-Khathib, Imam Rijali, dan seluruh ulama Masjid Tua Wapauwe Kaitetu Tanah Hitu Maluku, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, peliharalah iman kami, serta jadikanlah Al-Qur’an sebagai penyejuk hati kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Perdana Jamilu, Imam Muhammad Al-Khathib, Imam Rijali, dan seluruh ulama Masjid Tua Wapauwe Kaitetu Tanah Hitu Maluku, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, peliharalah iman kami, serta jadikanlah Al-Qur’an sebagai penyejuk hati kami.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / 7 Syawal (Ziarah Adat, Tradisi Pukul Sapu & Maulid Nabi SAW di Kawasan Jazirah Leihitu / Negeri Kaitetu, Kabupaten Maluku Tengah).',
    localAdab:
      'Wajib mengenakan pakaian muslim/muslimah yang sopan dan menutup aurat, melapor kepada marbot/tetua adat Negeri Kaitetu sebelum memasuki Masjid Tua Wapauwe atau melihat mushaf kuno, serta tidak menyentuh artefak manuskrip abad ke-16 dengan tangan basah.',
    facilities: ['Cagar Budaya Nasional Masjid Tua Wapauwe (1414 M)', 'Penyimpanan Mushaf Al-Qur’an Kuno Tulis Tangan (1550 M)', 'Makam Para Imam & Sesepuh Negeri Kaitetu', 'Area Parkir & Jalur Pesisir Leihitu Ambon'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Manusama, Z.J. (1977). Hikayat Tanah Hitu: Historie en Sociale Structuur van de Ambonse Eilanden in het Algemeen en van Uli Hitu in het Bijzonder tot het Midden der Zeventiende Eeuw. Disertasi Rijksuniversiteit Leiden.',
      'Straver, Hans, Chris van Fraassen & Jan van der Putten (2018). Ridjali: Historie van Hitu. Utrecht: Landelijk Steunpunt Educatie Molukkers.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-penyebar-islam-banda-neira',
    name: 'Makam Penyebar Islam Kepulauan Banda & Syuhada Orang Kaya Banda (Banda Neira, Kepulauan Banda, Kabupaten Maluku Tengah)',
    title: 'Makam Penyebar Islam Kepulauan Banda Neira (Jejak Dakwah Santri Sunan Giri & Syuhada Orang Kaya Banda)',
    description:
      'Kompleks Situs Sejarah Makam Ulama Penyebar Islam Kepulauan Banda (Datuk Maulana / Syekh Maulana & Para Orang Kaya Syuhada Banda 1621 M) di Pulau Banda Neira dan Pulau Lonthoir (Banda Besar), Kecamatan Banda, Kabupaten Maluku Tengah, Provinsi Maluku.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 – ke-17 M (Islamisasi Banda Abad ke-15 M & Tragedi Syuhada Orang Kaya Banda 1621 M)',
    province: 'Maluku',
    city: 'Maluku Tengah',
    district: 'Kec. Banda',
    address: 'Pulau Banda Neira & Lonthoir, Kec. Banda, Kepulauan Banda, Kabupaten Maluku Tengah',
    location: {
      lat: -4.5258,
      lng: 129.8982,
      address: 'Pulau Banda Neira & Lonthoir, Kec. Banda, Kepulauan Banda, Kabupaten Maluku Tengah',
      district: 'Kec. Banda',
      city: 'Maluku Tengah',
      province: 'Maluku',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Fort_Belgica_Banda_Neira.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Bersejarah Pulau Banda Neira, Kepulauan Banda, Kabupaten Maluku Tengah',
    sanad:
      'Para ulama penyebar Islam awal Kepulauan Banda (jaringan mubaligh Pesantren Sunan Giri Gresik, Tuban, dan pedagang Muslim Melayu-Arab abad ke-15 M) serta 44 Orang Kaya (pemimpin adat dan ulama negeri-negeri Islam Banda) yang gugur mempertahankan kedaulatan Kepulauan Banda pada 1621 M.',
    karya: [
      'Pembentukan sistem pemerintahan masyarakat Islam maritim Kepulauan Banda yang dipimpin oleh dewan *Orang Kaya* dan *Syahbandar* di Lonthoir, Neira, Selamon, Waer, dan Ay sejak abad ke-15 M',
      'Jaringan perniagaan pala dan fuli Nusantara yang menghubungkan Kepulauan Banda dengan Gresik (Sunan Giri), Demak, Malaka, dan Haramain',
      'Keteladanan syuhada Kepulauan Banda dalam mempertahankan tanah air dan akidah dari kolonialisme VOC',
    ],
    history:
      '**Situs Makam Penyebar Islam Kepulauan Banda dan Para Syuhada Orang Kaya Banda** di **Banda Neira dan Lonthoir (Banda Besar), Kecamatan Banda, Kabupaten Maluku Tengah, Provinsi Maluku** menyimpan sejarah paling mengharukan dalam riwayat Islam dan perniagaan rempah dunia. Berdasarkan catatan pengembara Portugis **Tomé Pires (*Suma Oriental*, 1515 M)** serta kajian sejarawan **Prof. Willard A. Hanna (*Indonesian Banda*)** dan **M. Shaleh Putuhena**, penduduk Kepulauan Banda telah memeluk agama Islam sejak pertengahan **abad ke-15 M (sekitar 1460–1480 M)** melalui hubungan dagang dan dakwah langsung dengan pelabuhan **Gresik (Pesantren Sunan Giri)**, Tuban, dan Malaka.\n\nBerbeda dengan wilayah lain yang diperintah oleh seorang raja absolut, masyarakat Muslim Kepulauan Banda diatur secara musyawarah oleh para pemimpin negeri dan ulama yang bergelar **Orang Kaya** beserta **Imam** dan **Khatib** di setiap negeri (seperti Lonthoir, Selamon, Neira, Ortattan, dan Pulau Ay). Kemakmuran niaga buah pala membuat masyarakat Banda mampu membangun masjid-masjid megah dan mendatangkan guru-guru agama dari Jawa dan dunia Melayu.\n\nKetika Gubernur Jenderal VOC **Jan Pieterszoon Coen** menyerbu Banda pada tahun **1621 M** untuk memaksakan monopoli pala, **44 Orang Kaya dan pemuka agama Banda** dieksekusi secara kejam pada **8 Mei 1621 M** dan ribuan penduduk Muslim Banda mengungsi ke **Kepulauan Kei (Banda Eli dan Banda Elat)** serta **Seram Timur**. Makam para ulama penyebar Islam awal di perbukitan Lonthoir/Selamon dan monumen syuhada di Banda Neira kini menjadi situs ziarah dan renungan sejarah kemanusiaan yang sangat mendalam.',
    karomah: [
      'Dalam kajian sejarah maritim Maluku (Des Alwi, *Sejarah Maluku: Banda Naira, Ternate, Tidore dan Ambon*, 2005), keteguhan iman masyarakat Muslim Banda yang terusir pada tahun 1621 M terbukti luar biasa: ketika mereka mengungsi sejauh ratusan mil laut menuju **Pulau Kei Besar**, mereka mendirikan negeri **Banda Eli** dan **Banda Elat** sambil tetap mempertahankan bahasa asli Banda (*Turwandan*), seni tembikar, dan tradisi Islam leluhur mereka hingga abad ke-21 M.<!--more-->\n\nDi Banda Neira sendiri, jejak keislaman kembali tumbuh subur dan menginspirasi para tokoh bangsa yang diasingkan ke sana (seperti Bung Hatta dan Sutan Sjahrir).',
    ],
    untoldStory:
      'Dalam catatan *Babad Tanah Jawi* dan *Hikayat Tanah Hitu*, **Kanjeng Sunan Giri (Raden Paku)** di Gresik pada masa mudanya pernah berlayar niaga dan dakwah ke **Maluku dan Kepulauan Banda**, sehingga banyak kosakata dan tradisi santri Giri yang mewarnai keislaman awal di Kepulauan Banda dan Hitu.<!--more-->\n\nPeziarah yang mengunjungi Banda Neira dan Pulau Banda Besar (Lonthoir/Selamon) dapat menziarahi makam keramat para ulama awal di perbukitan kebun pala tua serta situs peringatan 44 Orang Kaya Syuhada Banda (* Parigi Rante*).',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Penyebar Islam & Syuhada Kepulauan Banda di Banda Neira umumnya bertawassul memohon kepada Allah SWT kemuliaan syahadah dan husnul khatimah, keberkahan rezeki hasil bumi dan perniagaan, serta ketabahan menghadapi ujian berat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Ulama Penyebar Islam & Syuhada Orang Kaya Kepulauan Banda (Banda Neira Maluku)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ عُلَمَاءِ وَشُهَدَاءِ جُزُرِ بَانْدَا نَيْرَا مَالُوكُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ شَهَادَتَهُمْ وَبَارِكْ لَنَا فِي أَرْزَاقِنَا وَأَوْطَانِنَا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ عُلَمَاءِ وَشُهَدَاءِ جُزُرِ بَانْدَا نَيْرَا مَالُوكُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَتَقَبَّلْ شَهَادَتَهُمْ وَبَارِكْ لَنَا فِي أَرْزَاقِنَا وَأَوْطَانِنَا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi 'Ulamaa-i wa Syuhadaa-i Juzuri Banda Neira Maluku syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa taqabbal syahaadatahum wa baarik lanaa fii arzaaqinaa wa authaaninaa.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para ulama penyebar Islam dan syuhada Orang Kaya Kepulauan Banda Neira Maluku, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah kesyahidan mereka, serta berkahilah rezeki dan tanah air kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para ulama penyebar Islam dan syuhada Orang Kaya Kepulauan Banda Neira Maluku, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terimalah kesyahidan mereka, serta berkahilah rezeki dan tanah air kami.',
      },
    ],
    haulSchedule:
      '8 Mei / Bulan Muharram (Doa Bersama Mengenang Syuhada Orang Kaya Banda & Ziarah Makam Ulama Kepulauan Banda di Banda Neira dan Lonthoir).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, menghormati pengurus adat negeri-negeri di Banda Neira dan Lonthoir, serta menjaga keheningan saat berdoa di situs makam ulama dan monumen syuhada.',
    facilities: ['Situs Makam Ulama Penyebar Islam Lonthoir & Selamon Banda', 'Monumen Peringatan Syuhada Orang Kaya Banda (Parigi Rante)', 'Masjid Jami’ Al-Huda Banda Neira', 'Pelabuhan Laut & Bandara Banda Neira'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Hanna, Willard A. (1978). Indonesian Banda: Colonialism and Its Aftermath in the Nutmeg Islands. Philadelphia: Institute for the Study of Human Issues.',
      'Alwi, Des (2005). Sejarah Maluku: Banda Naira, Ternate, Tidore dan Ambon. Jakarta: Dian Rakyat.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // V. PROVINSI MALUKU UTARA (KESULTANAN TERNATE & TIDORE)
  // =========================================================================
  {
    id: 'sultan-zainal-abidin-ternate',
    name: 'Makam Sultan Zainal Abidin Syah — Raja Ternate Pertama Bergelar Sultan & Murid Sunan Giri (Kompleks Masjid Sultan Ternate, Kota Ternate)',
    title: 'Sultan Zainal Abidin Ternate (Raja Ternate Pertama Bergelar Sultan & Murid Sunan Giri, 1486–1500 M)',
    description:
      'Kompleks Makam Kesultanan dan Masjid Sultan Ternate (Sigi Lamo), tempat peristirahatan dan pusat warisan Sultan Zainal Abidin Syah (memerintah 1486–1500 M, raja Ternate ke-18 yang mengganti gelar Kolano menjadi Sultan setelah nyantri kepada Sunan Giri di Gresik) di Kelurahan Soa Sio, Kecamatan Ternate Utara, Kota Ternate, Provinsi Maluku Utara.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 M (Memerintah Kesultanan Ternate 1486–1500 M; Berguru ke Giri Kedaton 1494/1495 M)',
    province: 'Maluku Utara',
    city: 'Ternate',
    district: 'Kec. Ternate Utara',
    address: 'Kompleks Masjid Sultan Ternate (Sigi Lamo), Kel. Soa Sio, Kec. Ternate Utara, Kota Ternate',
    location: {
      lat: 0.7998,
      lng: 127.3845,
      address: 'Kompleks Masjid Sultan Ternate (Sigi Lamo), Kel. Soa Sio, Kec. Ternate Utara, Kota Ternate',
      district: 'Kec. Ternate Utara',
      city: 'Ternate',
      province: 'Maluku Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Masjid_Sultan_Ternate.jpg',
    imageSource: 'Wikimedia Commons — Masjid Sultan Ternate (Sigi Lamo) di Kota Ternate, Maluku Utara (Pusat Syariat Kesultanan Ternate Warisan Sultan Zainal Abidin)',
    sanad:
      'Sultan Zainal Abidin Syah bin Kolano Marhum (Gapi Baguna II); belajar dasar Islam kepada Datuk Maulana Hussein di Ternate, lalu berlayar ke Jawa Timur (1494/1495 M) untuk nyantri langsung kepada Kanjeng Sunan Giri (Raden Paku / Prabu Satmata) di Pesantren Giri Kedaton Gresik bersama sahabatnya Pati Putah (Ambon).',
    karya: [
      'Transformasi resmi Kerajaan Gapi menjadi Kesultanan Islam Ternate pada tahun 1495 M dengan mengganti gelar raja dari *Kolano* menjadi *Sultan* dan menjadikan syariat Islam sebagai hukum dasar negara',
      'Pembentukan lembaga **Bobato Akhirat** (Dewan Ulama Kesultanan yang dipimpin oleh *Kadhi / Jou Kalem*, *Imam*, *Khatib*, dan *Modim*) yang mendampingi *Bobato Dunia*',
      'Pengiriman mubaligh lulusan Giri Kedaton (seperti Tuhubahahul) untuk mengislamkan kepulauan Maluku, Sulawesi Utara/Gorontalo, hingga Raja Ampat Papua',
    ],
    history:
      '**Sultan Zainal Abidin Syah** (memerintah **1486–1500 M**) adalah tonggak utama berdirinya institusi kesultanan Islam di kawasan Indonesia Timur (*Moloku Kie Raha*). Berdasarkan catatan sejarah primer Portugis (**Antonio Galvao**, *Treatise on the Moluccas*, 1544 M; **Valentijn**), serta kajian **Prof. Leonard Y. Andaya (1993)** dan **M. Shaleh Putuhena**, ayahanda beliau (**Kolano Marhum / Gapi Baguna II**, 1465–1486 M) adalah penguasa Ternate pertama yang memeluk Islam melalui dakwah pedagang dan ulama asal Jawa/Melayu bernama **Datuk Maulana Hussein**.\n\nKetika **Zainal Abidin** naik tahta pada tahun **1486 M**, beliau bertekad memperdalam ilmu fikih, tauhid, dan tata negara Islam langsung ke sumber pesantren Wali Songo di Tanah Jawa. Pada tahun **1494/1495 M**, beliau berlayar menuju **Gresik, Jawa Timur** dan mondok langsung di **Pesantren Giri Kedaton** di bawah asuhan **Kanjeng Sunan Giri (Raden Paku)**. Di Giri Kedaton, kealiman dan ketawadhuan beliau sangat dikagumi hingga masyarakat Jawa menjulukinya ***Sultan Bualawa*** (*Sultan Cengkeh*).\n\nSekembalinya dari Pesantren Sunan Giri ke Ternate dengan membawa sejumlah ulama Jawa (di antaranya mubaligh besar **Tuhubahahul**), Zainal Abidin menghapus gelar tradisional *Kolano* dan meresmikan gelar **Sultan**, membentuk dewan ulama kesultanan (**Bobato Akhirat**), serta mendirikan madrasah istana yang menjadikan Ternate mercusuar dakwah Islam di Maluku, Sulawesi, Nusa Tenggara, hingga Papua.',
    karomah: [
      'Dalam historiografi Wali Songo dan Maluku (Agus Sunyoto, *Atlas Wali Songo*, dan catatan Portugis Antonio Galvao 1544 M), kerendahan hati seorang raja besar pemilik kepulauan rempah terkaya di dunia seperti Sultan Zainal Abidin yang rela duduk bersila sebagai santri di hadapan Kanjeng Sunan Giri di Gresik merupakan teladan agung kemuliaan ilmu di atas harta dan tahta.<!--more-->\n\nBerkat sanad keilmuan Sunan Giri yang dibawa oleh Sultan Zainal Abidin inilah adat istiadat Kesultanan Ternate berfalsafah *"Adat باسندي Syara’, Syara’ باسندي Kitabullah"* (*Adat matoto agama*).',
    ],
    untoldStory:
      'Dalam pelayaran pulangnya dari Pesantren Sunan Giri di Gresik menuju Ternate, **Sultan Zainal Abidin** singgah di Bima, Makassar, Buton, dan Ambon (Hitu) untuk mempererat aliansi persaudaraan kerajaan-kerajaan Islam maritim Nusantara.<!--more-->\n\nDi Kompleks **Masjid Sultan Ternate (*Sigi Lamo*)** dan pemakaman kesultanan di Kelurahan Soa Sio, Kota Ternate, tradisi ibadah yang ketat dan penuh takzim warisan para Sultan Ternate masih dipertahankan hingga hari ini.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang berziarah ke Kompleks Makam Kesultanan & Masjid Sultan Ternate (warisan Sultan Zainal Abidin) umumnya bertawassul memohon kepada Allah SWT semangat menuntut ilmu agama sejauh apa pun, kemuliaan akhlak pemimpin yang menghormati ulama, serta keberkahan perniagaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Zainal Abidin Syah (Murid Sunan Giri & Pendiri Kesultanan Ternate)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ زَيْنِ الْعَابِدِينَ شَاهْ تِلْمِيذِ سُونَانْ غِيرِي وَسَلَاطِينِ وَعُلَمَاءِ تِيرْنَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَزِدْنَا عِلْمًا نَافِعًا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ زَيْنِ الْعَابِدِينَ شَاهْ تِلْمِيذِ سُونَانْ غِيرِي وَسَلَاطِينِ وَعُلَمَاءِ تِيرْنَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَزِدْنَا عِلْمًا نَافِعًا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Zainil-'Aabidiin Syaah tilmiidzi Sunan Giri wa Salaathiini wa 'Ulamaa-i Ternate syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa zidnaa 'ilman naafi'an wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Zainal Abidin Syah murid Kanjeng Sunan Giri beserta seluruh sultan dan ulama Kesultanan Ternate, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tambahkanlah ilmu yang bermanfaat bagi kami, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Zainal Abidin Syah murid Kanjeng Sunan Giri beserta seluruh sultan dan ulama Kesultanan Ternate, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, tambahkanlah ilmu yang bermanfaat bagi kami, serta limpahkanlah keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Malam Lailatul Qadar (Tradisi Malam *Ela-Ela* 27 Ramadhan) & Hari Raya Idul Fitri / Idul Adha di Kompleks Masjid Sultan Ternate (Sigi Lamo), Kelurahan Soa Sio, Kota Ternate.',
    localAdab:
      'Mematuhi aturan adat yang sangat sakral di Masjid Sultan Ternate (*Sigi Lamo*) dan pemakaman kesultanan: jamaah laki-laki wajib mengenakan celana panjang/sarung (tidak diperkenankan memakai sarung tanpa celana panjang di dalam Sigi Lamo) dan penutup kepala/kopiah, serta menjaga keheningan mutlak.',
    facilities: ['Kompleks Makam Kesultanan Ternate Soa Sio', 'Masjid Sultan Ternate (Sigi Lamo)', 'Kedaton Kesultanan Ternate', 'Area Parkir Kawasan Soa Sio Kota Ternate'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Andaya, Leonard Y. (1993). The World of Maluku: Eastern Indonesia in the Early Modern Period. Honolulu: University of Hawaii Press.',
      'Amal, M. Adnan (2016). Kepulauan Rempah-Rempah: Perjalanan Sejarah Maluku Utara 1250–1950. Jakarta: Kepustakaan Populer Gramedia.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-baabullah-ternate',
    legacyId: 'auliya-29',
    name: 'Makam Sultan Baabullah Datu Syah (Bukit Foramadiahi, Pulau Ternate, Kota Ternate)',
    title: 'Sultan Baabullah Datu Syah Ternate (Pengusir Kolonial Portugis 1575 M & Pahlawan Nasional RI)',
    description:
      'Kompleks Cagar Budaya Makam Puncak Bukit Foramadiahi di lereng Gunung Gamalama, tempat peristirahatan Sultan Baabullah Datu Syah (memerintah 1570–1583 M, Sultan Ternate ke-24 dan Pahlawan Nasional RI) di Kelurahan Foramadiahi, Kecamatan Pulau Ternate, Kota Ternate, Provinsi Maluku Utara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (10 Februari 1528 M – Juli 1583 M; Memerintah Puncak Kejayaan Ternate 1570–1583 M)',
    province: 'Maluku Utara',
    city: 'Ternate',
    district: 'Kec. Pulau Ternate',
    address: 'Bukit Foramadiahi, Kel. Foramadiahi, Kec. Pulau Ternate, Kota Ternate',
    location: {
      lat: 0.7685,
      lng: 127.3265,
      address: 'Bukit Foramadiahi, Kel. Foramadiahi, Kec. Pulau Ternate, Kota Ternate',
      district: 'Kec. Pulau Ternate',
      city: 'Ternate',
      province: 'Maluku Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Masjid_Sultan_Ternate.jpg',
    imageSource: 'Wikimedia Commons — Warisan Kejayaan Kesultanan Ternate, Kota Ternate, Maluku Utara (Makam Pahlawan Nasional Sultan Baabullah di Foramadiahi)',
    sanad:
      'Sultan Baabullah Datu Syah bin Sultan Khairun Jamilu Syah; cucu keilmuan jalur Kesultanan Ternate (Sultan Zainal Abidin murid Sunan Giri) yang dididik oleh para ulama Bobato Akhirat dan panglima jihad Kesultanan Ternate.',
    karya: [
      'Pengepungan Benteng Sao Paulo (Gamulamo) selama 5 tahun (1570–1575 M) hingga berhasil mengusir kolonial Portugis secara damai dan bermartabat dari Ternate pada 28 Desember 1575 M',
      'Penyatuan jaringan maritim Islam di 72 pulau berpenghuni dari Mindanao Selatan, Sulawesi, Maluku, Bima-Solor, hingga pesisir Papua (julukan *Penguasa 72 Pulau*)',
      'Diplomasi internasional yang berdaulat dengan menerima utusan penjelajah Inggris Sir Francis Drake di Ternate pada tahun 1579 M',
    ],
    history:
      '**Sultan Baabullah Datu Syah** (lahir pada **10 Februari 1528 M** dan wafat pada **Juli 1583 M**) adalah Sultan Ternate ke-24 yang membawa **Kesultanan Ternate** mencapai puncak kejayaan maritim, militer, dan syiar Islam di kawasan timur Nusantara pada abad ke-16 M. Beliau adalah putra dari **Sultan Khairun Jamilu Syah**, sultan alim yang dibunuh secara licik oleh Portugis di dalam Benteng Sao Paulo (Kastela) pada **25 Februari 1570 M** sehari setelah penandatanganan sumpah perdamaian di atas Al-Qur’an dan Injil.\n\nDi atas jenazah ayahandanya yang syahid, **Kaicil Baab** dinobatkan menjadi **Sultan Baabullah** dan mengumandangkan jihad fi sabilillah untuk membebaskan bumi Maluku dari penjajahan Portugis. Selama lima tahun berturut-turut (**1570–1575 M**), armada *kora-kora* Sultan Baabullah memblokade Benteng Sao Paulo hingga garnisun Portugis menyerah tanpa syarat pada **26–28 Desember 1575 M**. Menariknya, Sultan Baabullah menunjukkan akhlak perang Islam yang sangat mulia: beliau tidak membantai orang-orang Portugis yang menyerah, melainkan mengizinkan mereka pergi meninggalkan Ternate dan mengizinkan warga sipil yang ingin menetap dengan syarat tunduk pada hukum Kesultanan Ternate.\n\nDi bawah kepemimpinan Sultan Baabullah, wilayah pengaruh dan dakwah Islam Kesultanan Ternate membentang dari **Mindanao Selatan, Sulawesi Utara (Manado-Gorontalo), Buton, Kepulauan Banda-Ambon, Solor-Bima, hingga Raja Ampat dan pesisir Papua** hingga sejarawan Eropa menjulukinya ***Lord of Seventy-Two Islands*** (*Penguasa 72 Pulau*). Atas jasa kepahlawanannya, pemerintah RI menetapkan Sultan Baabullah sebagai **Pahlawan Nasional** melalui **Keppres RI No. 117/TK/Tahun 2020**.',
    karomah: [
      'Dalam catatan perjalanan pelaut Inggris **Sir Francis Drake** yang mengunjungi istana Sultan Baabullah di Ternate pada bulan November 1579 M (serta kajian Prof. Leonard Y. Andaya, 1993), kewibawaan rohani dan keagungan tata krama Islam Sultan Baabullah membuat bangsa-bangsa Eropa berdecak kagum.<!--more-->\n\nKeberhasilan Sultan Baabullah mengusir kekuatan militer imperium Portugis pada tahun 1575 M merupakan kemenangan dekolonisasi besar pertama bangsa Nusantara di abad ke-16.',
    ],
    untoldStory:
      'Makam **Sultan Baabullah Datu Syah** terletak di puncak **Bukit Foramadiahi**, sebuah perkampungan tua di lereng Gunung Gamalama, Kecamatan Pulau Ternate, yang dahulu berfungsi sebagai benteng pertahanan alam dan kedaton peristirahatan kesultanan.<!--more-->\n\nDari pelataran makam Sultan Baabullah di Bukit Foramadiahi, peziarah dapat memandang langsung hamparan laut biru Maluku, Pulau Maitara, dan Pulau Tidore yang dahulu menjadi saksi kejayaan armada Islam *Moloku Kie Raha*.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Sultan Baabullah di Bukit Foramadiahi Ternate umumnya bertawassul memohon kepada Allah SWT keberanian dan keteguhan hati dalam membela kehormatan agama dan bangsa, kewibawaan dalam kepemimpinan, serta kemuliaan bakti seorang anak kepada orang tua.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Baabullah Datu Syah & Sultan Khairun (Foramadiahi Ternate)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ بَابُ اللهِ دَاتُو شَاهْ وَالسُّلْطَانِ الشَّهِيدِ خَيْرُونْ جَمِيلُو شَاهْ فُورَامَادِيَاهِي تِيرْنَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْصُرِ الْحَقَّ وَالْعَدْلَ وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ بَابُ اللهِ دَاتُو شَاهْ وَالسُّلْطَانِ الشَّهِيدِ خَيْرُونْ جَمِيلُو شَاهْ فُورَامَادِيَاهِي تِيرْنَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْصُرِ الْحَقَّ وَالْعَدْلَ وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahid Baabullaah Daatu Syaah was-Sulthaanisy-Syahiid Khairun Jamiilu Syaah Foramadiahi Ternate syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanshuril-haqqa wal-'adla wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sang mujahid Sultan Baabullah Datu Syah dan ayahandanya yang syahid Sultan Khairun Jamilu Syah di Foramadiahi Ternate, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, menangkanlah kebenaran dan keadilan, serta limpahkanlah keberkahan keduanya kepada kami di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sang mujahid Sultan Baabullah Datu Syah dan ayahandanya yang syahid Sultan Khairun Jamilu Syah di Foramadiahi Ternate, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, menangkanlah kebenaran dan keadilan, serta limpahkanlah keberkahan keduanya kepada kami di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '28 Desember (Peringatan Hari Kemenangan Sultan Baabullah Mengusir Portugis 1575 M) & 10 November (Ziarah Hari Pahlawan di Bukit Foramadiahi, Kota Ternate).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, meniti jalur tangga menuju Bukit Foramadiahi dengan tertib, menjaga kebersihan cagar budaya makam, serta menghormati masyarakat adat Kelurahan Foramadiahi.',
    facilities: ['Kompleks Cagar Budaya Makam Sultan Baabullah Bukit Foramadiahi', 'Jalur Tangga & Garda Pandang Laut Maluku', 'Musholla Kelurahan Foramadiahi', 'Area Parkir Kendaraan Kaki Bukit Foramadiahi'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Andaya, Leonard Y. (1993). The World of Maluku: Eastern Indonesia in the Early Modern Period. Honolulu: University of Hawaii Press.',
      'Hanna, Willard A. & Des Alwi (1990). Turbulent Times Past in Ternate and Tidore. Banda Naira: Yayasan Warisan dan Budaya Banda Naira.',
      'Keputusan Presiden Republik Indonesia Nomor 117/TK/Tahun 2020 tentang Penganugerahan Gelar Pahlawan Nasional kepada Sultan Baabullah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-nuku-tidore',
    name: 'Makam Sultan Nuku Muhammad Amiruddin — Jou Barakati (Soasio, Tidore, Kota Tidore Kepulauan)',
    title: 'Sultan Nuku Muhammad Amiruddin Jou Barakati (Sultan Tidore & Pahlawan Nasional RI, 1738–1805 M)',
    description:
      'Kompleks Cagar Budaya Makam Pahlawan Nasional Sultan Nuku (Sultan Saidul Jehad el-Mabus Amiruddin Syah Kaicil Paparangan / Jou Barakati, 1738–1805 M) di Kelurahan Soasio, Kecamatan Tidore, Kota Tidore Kepulauan, Provinsi Maluku Utara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Awal Abad ke-19 M (1738 M – 14 November 1805 M)',
    province: 'Maluku Utara',
    city: 'Tidore Kepulauan',
    district: 'Kec. Tidore',
    address: 'Kawasan Kedaton Kie Soasio, Kel. Soasio, Kec. Tidore, Kota Tidore Kepulauan',
    location: {
      lat: 0.6542,
      lng: 127.4485,
      address: 'Kawasan Kedaton Kie Soasio, Kel. Soasio, Kec. Tidore, Kota Tidore Kepulauan',
      district: 'Kec. Tidore',
      city: 'Tidore Kepulauan',
      province: 'Maluku Utara',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Tidore_Island.jpg',
    imageSource: 'Wikimedia Commons — Pulau Tidore & Gunung Kie Matubu, Kota Tidore Kepulauan, Maluku Utara (Pusat Perjuangan Jou Barakati Sultan Nuku)',
    sanad:
      'Sultan Saidul Jehad el-Mabus Amiruddin Syah Kaicil Paparangan (Sultan Nuku / Jou Barakati); putra Sultan Jamaluddin Tidore, pewaris sanad keislaman Kesultanan Tidore (keturunan Sultan Ciriliyati yang diislamkan Syekh Mansur dari Arab pada abad ke-15 M).',
    karya: [
      'Perjuangan maritim selama 25 tahun (1780–1805 M) menyatukan armada Maluku, Seram Timur, dan Raja Ampat Papua hingga berhasil membebaskan Kesultanan Tidore dari cengkeraman VOC pada 12 April 1797 M',
      'Pengukuhan persatuan geopolitik dan keislaman antara Kesultanan Tidore dengan para Raja di Kepulauan Raja Ampat dan pesisir Tanah Papua (*Gamrange* dan *Raja Ampat*)',
      'Gelar mulia *Jou Barakati* (Tuan/Sultan yang Penuh Berkah) dan Pahlawan Nasional RI (Keppres No. 071/TK/1995)',
    ],
    history:
      '**Sultan Nuku Muhammad Amiruddin**—yang menyandang gelar resmi **Sri Paduka Maha Tuan Sultan Saidul Jehad el-Mabus Amiruddin Syah Kaicil Paparangan** dan sangat dicintai rakyat Maluku-Papua dengan julukan ***Jou Barakati*** (*Tuan yang Diberkahi Allah*)—adalah Sultan Tidore (lahir di Soasio tahun **1738 M** dan wafat pada **14 November 1805 M**) yang tidak pernah sekali pun dapat ditaklukkan oleh kolonial Belanda. Berdasarkan disertasi klasik **Dr. Muridan Widjojo (*The Revolt of Prince Nuku*, 2009)** dan **Prof. Katoppo (*Nuku: Sultan Saidul Jehad*)**, perjuangan beliau bermula ketika VOC menangkap dan mengasingkan ayahandanya (**Sultan Jamaluddin**) ke Batavia dan Sri Lanka pada tahun 1779 M serta memaksakan traktat yang menghapus kedaulatan Tidore.\n\nMenolak tunduk pada intervensi kolonial, Kaicil Nuku membangun basis armada laut di **Toloa, Seram Timur (Waru), Halmahera Selatan (Maba, Weda, Patani), hingga Kepulauan Raja Ampat (Misool, Salawati, Waigeo) dan pesisir Papua**. Selama lebih dari dua dekade, armada *kora-kora* yang dipimpinnya menghancurkan pos-pos militer VOC. Puncaknya, pada **12 April 1797 M**, dengan 70 kapal perang dari armada gabungan Maluku-Papua, Sultan Nuku merebut kembali ibu kota **Soasio, Pulau Tidore** tanpa pertumpahan darah bagi rakyat sipil, lalu pada tahun **1801 M** membebaskan Ternate dari kekuasaan Belanda.\n\nHingga wafatnya dalam kemuliaan di atas tahta merdeka Kesultanan Tidore pada **14 November 1805 M**, Sultan Nuku berhasil menjaga kedaulatan syariat Islam dan kemerdekaan negerinya. Pemerintah RI menganugerahkan gelar **Pahlawan Nasional** kepada Sultan Nuku melalui **Keppres RI No. 071/TK/Tahun 1995**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Tidore, Halmahera, Seram, dan Raja Ampat Papua (dicatat oleh Dr. Muridan Widjojo, KITLV Leiden 2009), gelar ***Jou Barakati*** (*Tuan yang Penuh Berkah*) disematkan kepada Sultan Nuku karena setiap kali beliau berlabuh di suatu pulau, panen sagu, pala, dan tangkapan ikan penduduk melimpah ruah serta armadanya selalu luput dari kepungan meriam VOC.<!--more-->\n\nBeliau adalah salah satu dari sangat sedikit pemimpin di Nusantara yang wafat sebagai pemenang mutlak di atas tahta kesultanannya yang merdeka dari penjajah.',
    ],
    untoldStory:
      'Perjuangan **Sultan Nuku (Jou Barakati)** menjadi bukti sejarah terkuat persatuan batin dan politik antara **Maluku Utara (Tidore)** dan **Tanah Papua (Raja Ampat, Fakfak, Biak)**: separuh dari kekuatan armada laut Sultan Nuku yang membebaskan Tidore pada tahun 1797 M terdiri atas para pelaut dan raja-raja Muslim maupun adat dari **Kepulauan Raja Ampat dan pesisir Papua**.<!--more-->\n\nMakam Sultan Nuku di **Kelurahan Soasio, Kota Tidore Kepulauan** berada satu kawasan dengan **Kedaton Kie Soasio** dan **Masjid Sultan Tidore**.',
    barokahHajat:
      'Peziarah yang berziarah ke Makam Sultan Nuku (Jou Barakati) di Soasio Kota Tidore Kepulauan umumnya bertawassul memohon kepada Allah SWT keberkahan hidup (*barakah*), kemenangan dalam perjuangan yang benar, kemandirian bangsa, serta persatuan masyarakat kepulauan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Nuku Muhammad Amiruddin / Jou Barakati (Soasio Tidore)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ سَيِّدِ الْجِهَادِ مُحَمَّدٍ أَمِيرِ الدِّينِ نُوكُو جُو بَرَكَاتِي وَسَلَاطِينِ تِيدُورِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَنْزِلْ عَلَيْنَا بَرَكَاتِ السَّمَاءِ وَالْأَرْضِ وَانْصُرْنَا عَلَى الْظَّالِمِينَ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ سَيِّدِ الْجِهَادِ مُحَمَّدٍ أَمِيرِ الدِّينِ نُوكُو جُو بَرَكَاتِي وَسَلَاطِينِ تِيدُورِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَنْزِلْ عَلَيْنَا بَرَكَاتِ السَّمَاءِ وَالْأَرْضِ وَانْصُرْنَا عَلَى الْظَّالِمِينَ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Sayyidil-Jihaad Muhammad Amiiruddiin Nuku Jou Barakati wa Salaathiini Tidore syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa anzil 'alainaa barakaatis-samaa-i wal-ardhi wanshurnaa 'alazh-zhaalimiin.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Saidul Jehad Muhammad Amiruddin Nuku (Jou Barakati) beserta seluruh sultan dan ulama Kesultanan Tidore, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, turunkanlah atas kami keberkahan langit dan bumi, serta tolonglah kami menghadapi kezaliman.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Saidul Jehad Muhammad Amiruddin Nuku (Jou Barakati) beserta seluruh sultan dan ulama Kesultanan Tidore, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, turunkanlah atas kami keberkahan langit dan bumi, serta tolonglah kami menghadapi kezaliman.',
      },
    ],
    haulSchedule:
      '12 April (Hari Jadi Tidore / Kemenangan Sultan Nuku 1797 M) & 14 November (Haul Wafat Jou Barakati Sultan Nuku di Kelurahan Soasio, Kota Tidore Kepulauan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang rapi dan menutup aurat, menjaga kesopanan di lingkungan Kedaton Kie Soasio dan Masjid Sultan Tidore, serta mematuhi tata krama adat Kesultanan Tidore.',
    facilities: ['Kompleks Cagar Budaya Makam Pahlawan Nasional Sultan Nuku Soasio', 'Kedaton Kie Soasio Kesultanan Tidore', 'Masjid Sultan Tidore (Sigi Lamo Tidore)', 'Pelabuhan Penyeberangan Rum Tidore – Bastiong Ternate'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Widjojo, Muridan Satrio (2009). The Revolt of Prince Nuku: Cross-Cultural Alliance-Making in Maluku, c. 1780–1810. Leiden: Brill / KITLV.',
      'Katoppo, E. (1957). Nuku: Riwayat Perjuangan Kemerdekaan di Maluku Utara 1780–1805. Jakarta: Kilatmadju.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // VI. PROVINSI PAPUA BARAT & PAPUA BARAT DAYA (FAKFAK & RAJA AMPAT)
  // =========================================================================
  {
    id: 'masjid-tua-patimburak-fakfak',
    name: 'Kompleks Masjid Tua Patimburak & Makam Penyebar Islam Kokas — Imam Abuhari Kilian (Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak)',
    title: 'Kompleks Masjid Tua Patimburak & Makam Penyebar Islam Kokas (Jejak Islam Kerajaan Wertuar Fakfak 1870 M)',
    description:
      'Kompleks Cagar Budaya Masjid Tua Patimburak (didirikan tahun 1870 M) dan Makam Imam Abuhari Kilian beserta penyebar Islam Teluk Sebakor/Kokas di Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak, Provinsi Papua Barat.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 M (Masjid Tua Patimburak didirikan oleh Imam Abuhari Kilian tahun 1870 M pada masa Raja Wertuar)',
    province: 'Papua Barat',
    city: 'Fakfak',
    district: 'Distrik Kokas',
    address: 'Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak',
    location: {
      lat: -2.7215,
      lng: 132.4285,
      address: 'Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak',
      district: 'Distrik Kokas',
      city: 'Fakfak',
      province: 'Papua Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Masjid_Tua_Patimburak.jpg',
    imageSource: 'Wikimedia Commons — Masjid Tua Patimburak (1870 M) di Tepi Teluk Kokas, Kampung Patimburak, Kabupaten Fakfak, Papua Barat',
    sanad:
      'Imam Abuhari Kilian; ulama dan imam pelopor dari jaringan mubaligh Seram Timur / Banda / Tidore yang berdakwah di wilayah Petuanan Kerajaan Wertuar (Raja Wertuar Semempe / Musa Heremba) di Distrik Kokas, Kabupaten Fakfak pada abad ke-19 M.',
    karya: [
      'Pembangunan Masjid Tua Patimburak pada tahun 1870 M di tepi Teluk Kokas dengan perpaduan arsitektur kubah segi enam dan atap tumpang tropis yang dikerjakan secara gotong royong lintas agama',
      'Pembinaan keislaman masyarakat suku Papua pesisir di wilayah Petuanan Kerajaan Wertuar (Kampung Patimburak dan Kokas)',
      'Perwujudan nyata falsafah adat Fakfak **"Satu Tungku Tiga Batu"** (*Ko, Onim, Fakfak* — persaudaraan kandung umat Islam, Kristen Protestan, dan Katolik dalam satu keluarga Papua)',
    ],
    history:
      '**Kompleks Masjid Tua Patimburak dan Makam Penyebar Islam Kokas (Imam Abuhari Kilian)** yang berdiri anggun di bibir pantai **Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak, Provinsi Papua Barat** adalah ikon sejarah peradaban Islam paling terkenal di Tanah Papua. Berdasarkan penelitian arkeologi Islam di Papua (**Balai Arkeologi Papua** dan kajian **Dr. Athoilah Aly / Kemenag RI**), Islam telah menyentuh wilayah pesisir Semenanjung Onin (Fakfak) sejak abad ke-16 dan ke-17 M melalui jalur perdagangan pala Papua (*Myristica argentea*) dengan Kesultanan Tidore, Ternate, Banda, dan Seram Timur.\n\nPada tahun **1870 M**, seorang ulama bernama **Imam Abuhari Kilian** bersama **Raja Wertuar VII (Musa Heremba)** dan masyarakat Kampung Patimburak mendirikan **Masjid Tua Patimburak** di tepi teluk yang dikelilingi tebing karst dan hutan bakau Distrik Kokas. Empat tiang kayu penyangga utama (*soko guru*) di dalam masjid ini melambangkan empat ajaran pokok dalam Islam serta keteguhan persatuan masyarakat adat.\n\nPada masa Perang Dunia II (1942 M), Masjid Tua Patimburak sempat dihujani bom dan peluru oleh pesawat militer Jepang—yang bekas lubang pelurunya masih terlihat pada salah satu pilar kayu asli masjid—namun bangunan masjid tetap berdiri tegak tanpa roboh. Ketika masjid ini direnovasi secara gotong royong oleh warga Kampung Patimburak, keluarga-keluarga Papua yang beragama Islam, Protestan, dan Katolik bahu-membahu mengerjakannya sesuai falsafah luhur Kabupaten Fakfak: **"Satu Tungku Tiga Batu"**.',
    karomah: [
      'Dalam catatan sejarah Cagar Budaya Kabupaten Fakfak dan penuturan pengurus Masjid Tua Patimburak (generasi keturunan Imam Abuhari Kilian), empat pilar kayu asli Masjid Tua Patimburak yang dibangun tahun 1870 M tetap utuh bertahan lebih dari 150 tahun dan selamat dari pemboman udara tentara Jepang pada Perang Dunia II.<!--more-->\n\nDi halaman belakang Kampung Patimburak juga tumbuh pohon mangga besar berusia lebih dari satu abad yang ditanam sejak masa pembangunan masjid.',
    ],
    untoldStory:
      'Untuk mencapai **Kampung Patimburak** dari pelabuhan Distrik Kokas, Kabupaten Fakfak, peziarah menyusuri teluk laut biru jernih menggunakan perahu *longboat* selama sekitar 30 menit melewati gugusan pulau karang dan situs lukisan cadas prasejarah (*Tapurarang*).<!--more-->\n\nDi Fakfak, sudah menjadi hal yang sangat lazim dalam satu keluarga kandung Papua terdapat kakak yang menjadi **Imam Masjid**, adik yang menjadi **Pendeta Gereja**, dan saudara lainnya yang menjadi **Pastor/Majelis**, yang semuanya duduk bersama merawat makam leluhur dan Masjid Tua Patimburak.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Masjid Tua Patimburak & Makam Imam Abuhari Kilian di Kokas Fakfak Papua Barat umumnya bertawassul memohon kepada Allah SWT kerukunan dan kedamaian di tengah kemajemukan keluarga serta bangsa, keteguhan iman di ujung timur Indonesia, serta keselamatan pelayaran.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Imam Abuhari Kilian & Penyebar Islam Patimburak Kokas (Fakfak Papua Barat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْإِمَامِ أَبُو هَارِي كِيلِيَانْ وَمُلُوكِ وَيرْتُوَارْ وَعُلَمَاءِ فَاتِيمْبُورَاكْ فَاكْفَاكْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَدِمِ السَّلَامَ وَالْأُخُوَّةَ بَيْنَنَا وَبَارِكْ فِي بِلَادِنَا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْإِمَامِ أَبُو هَارِي كِيلِيَانْ وَمُلُوكِ وَيرْتُوَارْ وَعُلَمَاءِ فَاتِيمْبُورَاكْ فَاكْفَاكْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَدِمِ السَّلَامَ وَالْأُخُوَّةَ بَيْنَنَا وَبَارِكْ فِي بِلَادِنَا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Imaam Abuhari Kilian wa Muluuki Wertuar wa 'Ulamaa-i Patimburak Fakfak Papua syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa adimis-salaama wal-ukhuwwata bainanaa wa baarik fii bilaadinaa.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Imam Abuhari Kilian, para Raja Wertuar, dan seluruh ulama penyebar Islam Patimburak Kokas Fakfak Papua Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, kekalkanlah kedamaian dan persaudaraan di antara kami, serta berkahilah negeri kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Imam Abuhari Kilian, para Raja Wertuar, dan seluruh ulama penyebar Islam Patimburak Kokas Fakfak Papua Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, kekalkanlah kedamaian dan persaudaraan di antara kami, serta berkahilah negeri kami.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Ramadhan (Ziarah Adat, Tradisi Hadrah Fakfak & Peringatan Maulid Nabi SAW di Kompleks Masjid Tua Patimburak, Distrik Kokas, Kabupaten Fakfak).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, melapor kepada imam dan pengurus adat Kampung Patimburak setibanya di dermaga kampung, serta menghormati falsafah adat "Satu Tungku Tiga Batu" masyarakat Fakfak.',
    facilities: ['Cagar Budaya Masjid Tua Patimburak (1870 M)', 'Makam Imam Abuhari Kilian & Sesepuh Kampung Patimburak', 'Dermaga Perahu Kampung Patimburak Teluk Kokas', 'Tempat Wudhu & Balai Kampung Patimburak'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Wanggai, Toni Victor Mandawiri (2009). Rekonstruksi Sejarah Umat Islam di Tanah Papua. Jakarta: Badan Litbang dan Diklat Departemen Agama RI.',
      'Mene, Bau (2015). Jejak Arkeologi Islam di Semenanjung Onin Fakfak (Masjid Tua Patimburak dan Petuanan Wertuar-Rumbati). Jurnal Papua Balai Arkeologi Jayapura.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-raja-rumbati-fakfak',
    name: 'Kompleks Makam Raja-Raja Rumbati & Penyebar Islam Teluk Patipi — Syekh Abdul Ghaffar (Rumbati, Distrik Furwagi, Kabupaten Fakfak)',
    title: 'Kompleks Makam Raja Rumbati & Teluk Patipi (Penyebar Islam Semenanjung Onin Fakfak Abad ke-14 – ke-17 M)',
    description:
      'Kompleks Cagar Budaya Makam Raja-Raja Petuanan Rumbati dan Jejak Dakwah Syekh Abdul Ghaffar (ulama asal Aceh/Pasai yang mengislamkan Semenanjung Onin Fakfak) di Kampung Rumbati, Distrik Furwagi (Teluk Patipi), Kabupaten Fakfak, Provinsi Papua Barat.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-14 – ke-17 M (Tradisi Naskah Rumbati 8 Agustus 1360 M & Kejayaan Kerajaan Islam Rumbati-Patipi Abad ke-17 M)',
    province: 'Papua Barat',
    city: 'Fakfak',
    district: 'Distrik Furwagi',
    address: 'Kampung Rumbati (Teluk Patipi), Distrik Furwagi, Kabupaten Fakfak',
    location: {
      lat: -2.7425,
      lng: 132.1185,
      address: 'Kampung Rumbati (Teluk Patipi), Distrik Furwagi, Kabupaten Fakfak',
      district: 'Distrik Furwagi',
      city: 'Fakfak',
      province: 'Papua Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Masjid_Tua_Patimburak.jpg',
    imageSource: 'Wikimedia Commons — Warisan Sejarah Islam Semenanjung Onin, Kabupaten Fakfak, Papua Barat (Wilayah Petuanan Kerajaan Islam Rumbati & Patipi)',
    sanad:
      'Syekh Abdul Ghaffar (mubaligh sufi asal Aceh/Samudera Pasai dalam manuskrip keluarga Raja Rumbati dan Raja Atti-Atti) serta para mubaligh dari Banda, Seram Timur (Gorom), dan Tidore yang mengislamkan Raja-Raja Petuanan Rumbati, Patipi, dan Fatagar di Kabupaten Fakfak.',
    karya: [
      'Pengislaman penguasa dan masyarakat pribumi Papua di kawasan Teluk Patipi dan Rumbati (Semenanjung Onin, Kabupaten Fakfak)',
      'Pembentukan sistem pemerintahan tujuh kerajaan/petuanan Islam Fakfak (Rumbati, Patipi, Fatagar, Ati-Ati, Wertuar, Arguni, dan Namatota)',
      'Penyimpanan naskah kuno beraksara Arab-Melayu dan pusaka keislaman di lingkungan Istana Raja Rumbati dan Patipi',
    ],
    history:
      '**Kompleks Makam Raja-Raja Rumbati dan Jejak Dakwah Syekh Abdul Ghaffar** di **Kampung Rumbati, Distrik Furwagi (kawasan Teluk Patipi), Kabupaten Fakfak, Provinsi Papua Barat** merupakan salah satu titik sejarah paling krusial bagi studi masuknya Islam di **Tanah Papua**. Berdasarkan disertasi **Dr. Toni Victor M. Wanggai (*Rekonstruksi Sejarah Umat Islam di Tanah Papua*, 2009)** dan seminar sejarah masuknya Islam di Papua (Fakfak, 2006), tradisi lisan dan naskah pegangan keluarga **Raja Rumbati (Marga Bauw)** serta **Raja Fatagar/Ati-Ati** mencatat bahwa seorang mubaligh sufi asal Aceh bernama **Syekh Abdul Ghaffar** telah tiba di **Fatagar Lama / Rumbati** pada tanggal **8 Agustus 1360 M** dan wafat pada tahun **1374 M** setelah mengislamkan penduduk setempat.\n\nSelanjutnya, pada **abad ke-16 hingga ke-17 M**, gelombang dakwah Islam di **Kerajaan Rumbati** dan **Kerajaan Patipi** semakin menguat melalui jaringan ulama dari **Banda, Seram Timur (Kataloka/Gorom), Bacan, dan Kesultanan Tidore** (termasuk peran mubaligh **Syekh Sahabuddin** dan **Imam Samalehu**). Raja-raja Petuanan Rumbati dan Patipi memeluk agama Islam, membangun masjid di tepi Teluk Patipi, serta menjalin hubungan niaga pala secara langsung dengan armada Nusantara.\n\nDi Kampung Rumbati (Distrik Furwagi) dan Kampung Patipi Pasir (Distrik Teluk Patipi), kompleks makam para Raja Muslim Rumbati dan Patipi beserta masjid tuanya menjadi bukti nyata bahwa masyarakat asli Papua di Semenanjung Onin telah memiliki kerajaan Islam berdaulat sejak berabad-abad silam.',
    karomah: [
      'Dalam kajian sejarah Islam Papua (Dr. Toni Victor M. Wanggai, 2009), keberadaan tujuh kerajaan/petuanan Islam pribumi di Fakfak dan Kaimana (**Rumbati, Patipi, Fatagar, Ati-Ati, Wertuar, Arguni, dan Namatota**) membuktikan bahwa Islam diterima secara damai oleh kepala-kepala suku asli Papua tanpa paksaan senjata hingga menjadi identitas adat turun-temurun mereka.<!--more-->\n\nPara Raja Muslim dari Rumbati, Fatagar, dan Ati-Ati di Fakfak kemudian juga tercatat sebagai pejuang merah-putih yang gigih mempertahankan integrasi Papua ke dalam Negara Kesatuan Republik Indonesia.',
    ],
    untoldStory:
      'Di lingkungan keluarga **Kerajaan Rumbati** dan **Kerajaan Patipi** di Kabupaten Fakfak masih tersimpan sejumlah manuskrip khutbah, silsilah raja-raja Muslim Papua, serta Al-Qur’an kuno tulisan tangan abad ke-18/ke-19 M.<!--more-->\n\nTanggal **8 Agustus (1360 M)** yang merujuk pada kedatangan **Syekh Abdul Ghaffar** di Rumbati/Fatagar Lama kini diperingati secara resmi setiap tahun di Kabupaten Fakfak sebagai **Hari Masuknya Islam di Tanah Papua**.',
    barokahHajat:
      'Peziarah dan peneliti sejarah yang mengunjungi Kompleks Makam Raja Rumbati & Teluk Patipi di Kabupaten Fakfak umumnya bertawassul memohon kepada Allah SWT perluasan cahaya hidayah dan ilmu pengetahuan, kelestarian adat yang bersendikan syariat, serta kemakmuran masyarakat Tanah Papua.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Abdul Ghaffar & Raja-Raja Islam Rumbati-Patipi (Fakfak Papua Barat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْغَفَّارِ وَمُلُوكِ رُومْبَاتِي وَفَاتِيفِي فَاكْفَاكْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا بِنُورِ الْإِيمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْغَفَّارِ وَمُلُوكِ رُومْبَاتِي وَفَاتِيفِي فَاكْفَاكْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَنَوِّرْ قُلُوبَنَا بِنُورِ الْإِيمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh 'Abdil-Ghaffaar wa Muluuki Rumbati wa Patipi Fakfak Papua syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa nawwir quluubanaa bi nuuril-iimaani wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Abdul Ghaffar beserta para Raja Islam Rumbati dan Patipi Fakfak Papua Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati kami dengan cahaya iman, serta limpahkanlah keberkahan mereka kepada kami di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syekh Abdul Ghaffar beserta para Raja Islam Rumbati dan Patipi Fakfak Papua Barat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, terangilah hati kami dengan cahaya iman, serta limpahkanlah keberkahan mereka kepada kami di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '8 Agustus (Peringatan Hari Masuknya Islam di Tanah Papua 1360 M) & Bulan Rabiul Awal di Kampung Rumbati (Distrik Furwagi) dan Teluk Patipi, Kabupaten Fakfak.',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, meminta izin kepada keluarga Raja Rumbati / tetua adat Kampung Rumbati di Distrik Furwagi sebelum memasuki kompleks makam kerajaan, serta menjaga kelestarian cagar budaya.',
    facilities: ['Kompleks Makam Raja-Raja Petuanan Rumbati & Patipi', 'Masjid Jami’ Kampung Rumbati & Masjid Tua Patipi', 'Rumah Adat / Kediaman Raja Rumbati', 'Dermaga Perahu Teluk Patipi & Akses Darat Fakfak'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Wanggai, Toni Victor Mandawiri (2009). Rekonstruksi Sejarah Umat Islam di Tanah Papua. Jakarta: Badan Litbang dan Diklat Departemen Agama RI.',
      'Onim, Jusuf Fredrik (2006). Islam dan Kristen di Tanah Papua: Meniti Jalan Bersama. Bandung: Jurnal Info Media.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'makam-kesultanan-misool-raja-ampat',
    name: 'Kompleks Makam Raja-Raja & Penyebar Islam Kerajaan Misool — Lilinta & Fafanlap (Misool Selatan, Kabupaten Raja Ampat)',
    title: 'Kompleks Makam Penyebar Islam Kesultanan Misool Lilinta & Fafanlap (Kerajaan Islam Bahari Raja Ampat Papua Barat Daya)',
    description:
      'Kompleks Cagar Budaya Makam Raja-Raja Islam Misool (Marga Umlati di Lilinta dan Marga Tafalas di Waigama) beserta ulama penyebar Islam Kepulauan Raja Ampat di Kampung Lilinta dan Fafanlap, Distrik Misool Selatan / Misool Barat, Kabupaten Raja Ampat, Provinsi Papua Barat Daya.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – ke-19 M (Masa Kerajaan Islam Misool & Salawati dalam Jaringan Kesultanan Bacan-Tidore)',
    province: 'Papua Barat Daya',
    city: 'Raja Ampat',
    district: 'Distrik Misool Selatan',
    address: 'Kampung Lilinta & Fafanlap, Distrik Misool Selatan / Misool Barat, Pulau Misool, Kabupaten Raja Ampat',
    location: {
      lat: -2.0418,
      lng: 130.2945,
      address: 'Kampung Lilinta & Fafanlap, Distrik Misool Selatan / Misool Barat, Pulau Misool, Kabupaten Raja Ampat',
      district: 'Distrik Misool Selatan',
      city: 'Raja Ampat',
      province: 'Papua Barat Daya',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Raja_Ampat_Islands.jpg',
    imageSource: 'Wikimedia Commons — Gugusan Kepulauan Raja Ampat, Provinsi Papua Barat Daya (Wilayah Historis Empat Kerajaan Islam Bahari: Misool, Salawati, Waigeo, dan Batanta)',
    sanad:
      'Para Raja (*Fun*) Kerajaan Islam Misool (Fun Lilinta dari marga Umlati dan Fun Waigama dari marga Tafalas) serta Raja Salawati (marga Arfan) yang memeluk Islam melalui dakwah ulama Kesultanan Bacan, Kesultanan Tidore, dan mubaligh Hadramaut-Seram sejak abad ke-16 M.',
    karya: [
      'Pembentukan institusi Kerajaan Islam Misool (Lilinta dan Waigama) serta Kerajaan Islam Salawati (Samate) sebagai bagian dari konfederasi historis *Raja Ampat* (*Empat Raja*)',
      'Tradisi keislaman masyarakat asli suku Matbat dan Maya di Pulau Misool yang menyatu dengan kearifan konservasi laut adat (*Sasi Laut*)',
      'Kompleks Makam Raja-Raja Misool di Lilinta/Waigama dan masjid-masjid kampung pesisir Misool Selatan (Fafanlap, Usaha Jaya, Yellu, dan Lilinta)',
    ],
    history:
      '**Kompleks Makam Raja-Raja dan Ulama Penyebar Islam Kerajaan Misool** di **Kampung Lilinta, Fafanlap, dan Waigama, Pulau Misool, Kabupaten Raja Ampat, Provinsi Papua Barat Daya** menyimpan bukti sejarah bahwa nama **Raja Ampat** sendiri berasal dari sejarah empat kerajaan bahari yang para rajanya (**Fun Giwar / Waigeo, Fun Tusan / Salawati, Fun Mastarai / Misool Lilinta, dan Fun Kilimuri / Waigama-Batanta**) memiliki pertalian erat dengan peradaban Islam Maluku Utara (**Kesultanan Bacan dan Kesultanan Tidore**) sejak abad ke-16 M.\n\nBerdasarkan catatan sejarah VOC (**Rumphius, 1678 M**; **Thomas Forrest, 1779 M**) dan penelitian **Balai Arkeologi Papua (Drs. Muhammad Irfan Mahmud)**, Pulau Misool merupakan pusat pemerintahan dua raja Muslim yang sangat disegani di perairan antara Laut Seram dan kepala burung Papua: yakni **Raja Lilinta (marga Umlati)** di pesisir selatan Misool dan **Raja Waigama (marga Tafalas)** di pesisir utara Misool, berdampingan dengan **Raja Salawati (marga Arfan)** di Samate. Para raja dan masyarakat pesisir Misool memeluk agama Islam, mengangkat *Imam*, *Khatib*, dan *Modim* di setiap kampung adat, serta menjadi sekutu utama armada **Sultan Nuku (Tidore)** pada abad ke-18 M.\n\nDi Kampung Lilinta dan Fafanlap (Distrik Misool Selatan), kompleks makam para Raja Misool dan ulama penyebar Islam beserta tradisi *Suluk*, *Hadrah*, dan kenduri Maulid Nabi tetap dijaga dengan penuh takzim di tengah keindahan gugusan pulau karst Misool yang mendunia.',
    karomah: [
      'Dalam kajian antropologi maritim Raja Ampat (Drs. M. Irfan Mahmud dan Dr. Toni Victor M. Wanggai), masyarakat Muslim di Kampung Lilinta, Fafanlap, dan Yellu di Pulau Misool memadukan ajaran Islam tentang larangan berbuat kerusakan di muka bumi (*laa tufsiduu fil-ardh*) dengan hukum adat **Sasi Laut** yang menjaga kelestarian terumbu karang, teripang, dan lola selama berabad-abad.<!--more-->\n\nHarmoni antara masyarakat Muslim pesisir Misool (suku Maya/Matbat Muslim) dan saudara-saudara mereka yang beragama Kristen di kampung tetangga diikat kuat oleh silsilah adat empat raja yang sama.',
    ],
    untoldStory:
      'Banyak wisatawan mengenal **Raja Ampat** di Provinsi Papua Barat Daya semata-mata karena keindahan baharinya, padahal secara historis **Raja Ampat** adalah kawasan kerajaan-kerajaan Islam tua di Tanah Papua (**Salawati di Samate, Misool di Lilinta, dan Waigama**).<!--more-->\n\nDi Kampung **Fafanlap, Usaha Jaya, Yellu, dan Lilinta (Misool Selatan)** maupun **Kampung Samate (Salawati Utara)**, menara-menara masjid berdiri megah di tepi laguna biru dan para peziarah dapat menziarahi makam para Raja (*Fun*) dan imam perintis dakwah di ujung timur Nusantara.',
    barokahHajat:
      'Peziarah yang mengunjungi Kompleks Makam Raja-Raja & Penyebar Islam Misool di Kabupaten Raja Ampat Papua Barat Daya umumnya bertawassul memohon kepada Allah SWT kelapangan rezeki bahari dan pariwisata yang halal, kelestarian alam ciptaan Allah, serta keutuhan ukhuwah dari Aceh hingga Papua.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Raja-Raja & Ulama Penyebar Islam Misool & Raja Ampat (Papua Barat Daya)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ مُلُوكِ وَعُلَمَاءِ مِيسُولْ وَسَالَاوَاتِي رَاجَا أَمْفَاتْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي بِحَارِنَا وَأَرْضِنَا وَثَبِّتْ إِيمَانَنَا إِلَى يَوْمِ الدِّينِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ مُلُوكِ وَعُلَمَاءِ مِيسُولْ وَسَالَاوَاتِي رَاجَا أَمْفَاتْ بَابُوَاشَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي بِحَارِنَا وَأَرْضِنَا وَثَبِّتْ إِيمَانَنَا إِلَى يَوْمِ الدِّينِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi Muluuki wa 'Ulamaa-i Misool wa Salawati Raja Ampat Papua syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik lanaa fii bihaarinaa wa ardhinaa wa tsabbit iimaananaa ilaa yaumid-diin.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para Raja dan ulama penyebar Islam di Misool dan Salawati Kepulauan Raja Ampat Papua Barat Daya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah lautan dan daratan kami, serta teguhkanlah iman kami hingga hari kiamat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para Raja dan ulama penyebar Islam di Misool dan Salawati Kepulauan Raja Ampat Papua Barat Daya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, berkahilah lautan dan daratan kami, serta teguhkanlah iman kami hingga hari kiamat.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal (Maulid Nabi SAW) & Syawal (Buka Sasi Laut & Ziarah Makam Leluhur Raja Misool di Kampung Lilinta dan Fafanlap, Distrik Misool Selatan, Kabupaten Raja Ampat).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melapor kepada tetua adat/keluarga Raja Lilinta (marga Umlati) atau pengurus masjid di Fafanlap/Lilinta, serta mematuhi pantangan adat *Sasi Laut* demi menjaga kelestarian ekosistem bahari Misool.',
    facilities: ['Kompleks Makam Raja-Raja Misool di Lilinta & Waigama', 'Masjid Jami’ Kampung Fafanlap, Usaha Jaya & Lilinta Misool Selatan', 'Dermaga Kapal & Speedboat Misool (Rute Sorong – Yellu/Fafanlap/Lilinta)', 'Balai Adat Masyarakat Misool'],
    openingHours: 'Buka Setiap Hari 07.00 – 18.00 WIT',
    references: [
      'Mahmud, Muhammad Irfan (2011). Jejak Arkeologi dan Sejarah Kesultanan di Kepulauan Raja Ampat (Misool dan Salawati). Jayapura: Balai Arkeologi Papua.',
      'Wanggai, Toni Victor Mandawiri (2009). Rekonstruksi Sejarah Umat Islam di Tanah Papua. Jakarta: Badan Litbang dan Diklat Departemen Agama RI.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];
