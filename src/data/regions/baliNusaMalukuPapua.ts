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
    name: 'Al-Habib Ali bin Umar bin Abu Bakar Bafaqih ', title: 'Habib Ali bin Umar Bafaqih Loloan ', description: 'Kompleks Maqbarah Pondok Pesantren Syamsul Huda Loloan Barat, tempat peristirahatan Al-Allamah Al-Habib Ali bin Umar bin Abu Bakar Bafaqih (Wali Pitu Bali Barat) di Kelurahan Loloan Barat, Kecamatan Negara, Kabupaten Jembrana, Provinsi Bali.', category: 'Habaib', era: 'Abad ke-20 M ', province: 'Bali', city: 'Jembrana', district: 'Kec. Negara', address: 'Kompleks Pondok Pesantren Syamsul Huda, Jl. Gatot Subroto, Kel. Loloan Barat, Kec. Negara, Kabupaten Jembrana', location: { lat: -8.3642, lng: 114.6185, address: 'Kompleks Pondok Pesantren Syamsul Huda, Jl. Gatot Subroto, Kel. Loloan Barat, Kec. Negara, Kabupaten Jembrana', district: 'Kec. Negara', city: 'Jembrana', province: 'Bali', }, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Pura_Jagatnatha_Jembrana.jpg', imageSource: 'Wikimedia Commons',
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
