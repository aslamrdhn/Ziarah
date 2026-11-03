import type { ZiarahSite } from './sites';

export const TOTAL_SITE_COUNT = 96;

export const ALL_PROVINCES: string[] = [
  'Semua Provinsi',
  'Aceh',
  'Bali',
  'Banten',
  'DI Yogyakarta',
  'DKI Jakarta',
  'Gorontalo',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Lampung',
  'Maluku Utara',
  'Nusa Tenggara Barat',
  'Sulawesi Selatan',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Sumatera Utara',
];

export const initialSites: ZiarahSite[] = [
  {
    id: 'wali-1',
    name: 'Syekh Maulana Malik Ibrahim (Makdum Ibrahim As-Samarqandi)',
    title: 'Sunan Gresik (Syekh Maghribi)',
    description:
      'Ketua Dewan Walisongo generasi pertama, pelopor dakwah Islam di pesisir utara Jawa melalui tata niaga, pengobatan gratis, dan irigasi pertanian.',
    location: {
      lat: -7.1643,
      lng: 112.6565,
      address: 'Jl. Malik Ibrahim No. 52-62, Gapuro Sukolilo, Kec. Gresik',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    category: 'Walisongo',
    era: 'Abad ke-14 – Awal Abad ke-15 M (Wafat 12 Rabiul Awal 822 H / 8 April 1419 M)',
    sanad: 'Jaringan Ulama Hadramaut, Gujarat, & Samarkand; Ayahanda Sunan Ampel dan leluhur para Walisongo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam Syekh Maulana Malik Ibrahim, Gresik',
    history:
      'Syekh Maulana Malik Ibrahim mendarat di Desa Sembalo, Leran sekitar tahun 1371 M dan mendirikan masjid serta pesantren pertama di Tanah Jawa hingga wafat tahun 1419 M.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Area Parkir Bus & Mobil', 'Toilet & Tempat Wudhu', 'Pendopo Peziarah'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah tanah tandus dan berair payau di pesisir Gresik menjadi lahan pertanian subur melalui doa dan rekayasa saluran air.',
      'Menyembuhkan wabah penyakit masyarakat Majapahit pesisir dengan ramuan daun dan doa Al-Fatihah.',
      'Turunnya hujan deras seketika saat masyarakat berniat mengorbankan seorang gadis dalam ritual kuno meminta hujan.',
    ],
  },
  {
    id: 'wali-2',
    name: 'Sayyid Ali Rahmatullah (Raden Rahmat)',
    title: 'Sunan Ampel',
    description:
      "Sesepuh Dewan Walisongo, pendiri Pesantren Ampel Denta Surabaya, dan pencetus falsafah etika sosial 'Moh Limo'.",
    location: {
      lat: -7.2285,
      lng: 112.7397,
      address: 'Jl. Ampel Masjid No. 53, Ampel, Kec. Semampir',
      city: 'Surabaya',
      province: 'Jawa Timur',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 M (1401 – 1481 M)',
    sanad: 'Putra Syekh Ibrahim Asmoroqondi & Dewi Candrawulan; Mahaguru bagi Sunan Bonang, Sunan Drajat, Sunan Giri, Raden Fattah, dan Sunan Kalijaga',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Makam_Sunan_Ampel.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam Kanjeng Sunan Ampel, Surabaya',
    history:
      'Raden Rahmat mendirikan Pesantren Ampel Denta di Surabaya yang menjadi pusat kaderisasi para Walisongo dan perintis Kesultanan Demak.',
    facilities: ['Masjid Agung Sunan Ampel (Berdiri 1421 M)', 'Sumur Karomah Nadzir', 'Area Wudhu & Toilet Terpadu'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Kisah Mbah Sholeh (penjaga kebersihan Masjid Ampel) yang hidup kembali hingga 9 kali atas doa dan ucapan Kanjeng Sunan Ampel.',
      "Mbah Sonhaji (Mbah Bolong) yang melubangi dinding pengimaman Masjid Ampel dan memperlihatkan bangunan Ka'bah secara nyata di Makkah sebagai bukti presisi arah kiblat.",
      'Berjalan di atas permukaan air sungai dan laut saat menuju kawasan rawa Ampel Denta.',
    ],
  },
  {
    id: 'wali-3',
    name: 'Syekh Maulana Makhdum Ibrahim',
    title: 'Sunan Bonang',
    description: "Maestro suluk sastra pesisir, pencipta gending dakwah 'Tombo Ati', dan pengarang Suluk Wujil.",
    location: {
      lat: -6.8943,
      lng: 112.062,
      address: 'Jl. KH. Mustain, Kutorejo, Kec. Tuban (Barat Alun-Alun Tuban)',
      city: 'Tuban',
      province: 'Jawa Timur',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 – Awal Abad ke-16 M (1465 – 1525 M)',
    sanad: 'Putra Sunan Ampel & Nyai Ageng Manila; Berguru kepada Syekh Maulana Ishaq di Pasai; Guru utama Sunan Kalijaga',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Sunan_Bonang-BW.png',
    imageSource: 'Wikimedia Commons — Arsip Lukisan Sejarah Sunan Bonang, Tuban',
    history:
      'Putra Sunan Ampel yang memusatkan dakwah di Tuban melalui karya suluk sastra tasawuf dan instrumen gamelan bonang.',
    facilities: ['Masjid Agung Tuban', 'Pendopo & Gapura Paduraksa Kuno', 'Area Parkir Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah buah pohon aren menjadi emas berkilauan saat menyadarkan Raden Sahid (kelak menjadi Sunan Kalijaga) di tepi sungai.',
      'Alunan tabuhan gamelan bonang beliau membuat masyarakat yang mendengarnya luluh hatinya dan berbondong-bondong mengucapkan syahadat.',
      'Memunculkan mata air tawar di tepi pantai dengan menancapkan tongkatnya.',
    ],
  },
  {
    id: 'wali-4',
    name: 'Raden Qasim (Syarifuddin)',
    title: 'Sunan Drajat',
    description:
      "Pelopor dakwah filantropi Islam dan ketahanan sosial melalui filosofi 'Catur Piwulang' di pesisir Paciran, Lamongan.",
    location: {
      lat: -6.877,
      lng: 112.3552,
      address: 'Desa Drajat, Kec. Paciran',
      city: 'Lamongan',
      province: 'Jawa Timur',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 – ke-16 M (1470 – 1522 M)',
    sanad: 'Putra bungsu Sunan Ampel & Nyai Ageng Manila; Adik kandung Sunan Bonang',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Makam_Sunan_Drajat_Lamongan.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam Sunan Drajat, Paciran, Lamongan',
    history:
      'Putra Sunan Ampel yang berdakwah di Paciran, Lamongan dengan ajaran empat pilar kemanusiaan Catur Piwulang.',
    facilities: ['Museum Sunan Drajat', "Masjid Jami' Sunan Drajat", 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 22:00 WIB',
    karomah: [
      'Diselamatkan oleh ikan cucut dan ikan talang saat perahunya pecah dihantam badai laut di perairan Lamongan hingga mendarat selamat di Desa Jelag.',
      'Mengeluarkan air jernih dari bekas cabutan pohon lengkeng di puncak bukit Drajat yang kini menjadi Sumur Lengsanga.',
    ],
  },
  {
    id: 'wali-5',
    name: "Sayyid Ja'far Shadiq Azmatkhan",
    title: 'Sunan Kudus',
    description:
      'Ulama ahli fikih, hakim agung Kesultanan Demak, dan arsitek akulturasi Masjid Al-Aqsha Menara Kudus.',
    location: {
      lat: -6.8041,
      lng: 110.8405,
      address: 'Jl. Menara, Pejaten, Kauman, Kec. Kota Kudus',
      city: 'Kudus',
      province: 'Jawa Tengah',
    },
    category: 'Walisongo',
    era: 'Abad ke-16 M (Wafat 5 Mei 1550 M)',
    sanad: 'Putra Raden Usman Haji (Sunan Ngudung) & Syarifah Ruhil (Putri Sunan Ampel); Murid Sunan Kalijaga & Kyai Telingsing',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Masjid_Menara_Kudus_Tampak_Depan.jpg',
    imageSource: 'Wikimedia Commons — Masjid Al-Aqsha & Menara Kudus (Peninggalan Sunan Kudus, 1549 M)',
    history:
      "Sayyid Ja'far Shadiq mendirikan Masjid Al-Aqsha Menara Kudus pada 1549 M dengan pendekatan toleransi budaya yang luhur.",
    facilities: ['Masjid Al-Aqsha & Menara Kudus', 'Tempat Wudhu Pancuran 8', 'Terminal Wisata Bakalan Krapyak'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Meredakan wabah penyakit di tanah Baitul Maqdis melalui doa hingga diberi hadiah batu prasasti oleh Amir Palestina.',
      'Memenangkan perdebatan ilmu dan adu kesaktian spiritual secara santun sehingga para pendeta dan bangsawan lokal memeluk Islam tanpa paksaan.',
    ],
  },
  {
    id: 'wali-6',
    name: 'Raden Paku (Sultan Abdul Faqih / Prabu Satmata)',
    title: 'Sunan Giri',
    description:
      'Raja-Ulama pendiri Giri Kedaton yang menyebarkan dakwah Islam hingga Lombok, Kalimantan, Sulawesi, Maluku, dan Ternate.',
    location: {
      lat: -7.1738,
      lng: 112.63,
      address: 'Jl. Sunan Giri, Pedukuhan, Kebomas, Kec. Kebomas',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 – Awal Abad ke-16 M (1442 – 1506 M)',
    sanad: 'Putra Syekh Maulana Ishaq & Dewi Sekardadu; Murid sekaligus menantu Sunan Ampel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg',
    imageSource: 'Wikimedia Commons — Gapura Paduraksa & Undakan Makam Sunan Giri, Kebomas, Gresik',
    history:
      'Pendiri Pesantren Giri Kedaton di puncak Bukit Giri pada 1487 M yang melahirkan mubaligh ke seluruh Nusantara Timur.',
    facilities: ['Cungkup Ukiran Kayu Jati Kuno', 'Masjid Besar Ainul Yaqin Sunan Giri', 'Museum & Parkir Terpadu Giri'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Saat masih bayi dalam peti di tengah Selat Bali, peti Raden Paku memancarkan cahaya terang dan membuat kapal dagang Nyai Ageng Pinatih berhenti berputar-putar.',
      'Pena tulis beliau berubah menjadi Keris Kalamunyeng untuk mempertahankan Pesantren Giri Kedaton.',
      'Memindahkan segenggam tanah dari Pasai untuk menentukan lokasi bukit yang kelak memiliki bau dan warna tanah serupa di Kebomas Gresik.',
    ],
  },
  {
    id: 'wali-7',
    name: 'Raden Mas Said (Syekh Malaya)',
    title: 'Sunan Kalijaga',
    description:
      'Budayawan agung Walisongo yang mengislamkan masyarakat Jawa melalui wayang kulit, gamelan Sekaten, dan Kidung Rumeksa ing Wengi.',
    location: {
      lat: -6.8988,
      lng: 110.6409,
      address: 'Jl. Raden Sahid, Kadilangu, Kec. Demak',
      city: 'Demak',
      province: 'Jawa Tengah',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 – ke-16 M (sekitar 1450 – 1586 M)',
    sanad: 'Putra Tumenggung Wilatikta; Murid utama Sunan Bonang, Sunan Ampel, dan Sunan Gunung Jati',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg',
    imageSource: 'Wikimedia Commons — Serambi Masjid Agung Demak & Poros Dakwah Sunan Kalijaga',
    history:
      'Wali budayawan yang menyebarkan Islam dengan penuh kearifan dari pesisir Demak hingga pedalaman Mataram.',
    facilities: ['Kompleks Makam Kadilangu', 'Masjid Sunan Kalijaga Kadilangu', 'Pendopo Notobratan'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Menyatukan serpihan kayu (tatal) menjadi tiang utama Soko Tatal di Masjid Agung Demak hanya dalam satu malam melalui munajat.',
      'Menentukan arah kiblat Masjid Agung Demak dengan memegang pucuk Masjidil Haram di tangan kanan dan pucuk kubah Masjid Demak di tangan kiri.',
      'Bertafakur menjaga tongkat Sunan Bonang di tepi sungai selama bertahun-tahun hingga tubuhnya dirambati tumbuhan tanpa bergeming.',
    ],
  },
  {
    id: 'wali-8',
    name: 'Raden Umar Said (Raden Prawoto)',
    title: 'Sunan Muria',
    description:
      'Putra Sunan Kalijaga yang berdakwah di lereng Gunung Muria, membimbing petani, nelayan, dan pelestari ekologi hutan.',
    location: {
      lat: -6.6499,
      lng: 110.892,
      address: 'Desa Colo, Kec. Dawe, Lereng Gunung Muria',
      city: 'Kudus',
      province: 'Jawa Tengah',
    },
    category: 'Walisongo',
    era: 'Abad ke-16 M',
    sanad: 'Putra Sunan Kalijaga & Dewi Saroh binti Maulana Ishaq; Keponakan Sunan Giri',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Wisata_Religi.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Wisata Religi Lereng Gunung Muria, Colo, Kudus',
    history:
      'Membina masyarakat pedalaman, petani gunung, dan nelayan dari puncak Gunung Muria di Desa Colo, Kudus.',
    facilities: ['Masjid Sunan Muria', '700+ Anak Tangga & Pangkalan Ojek Gunung', 'Sumber Air Gentong Keramat'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Memancarkan mata air jernih di puncak Gunung Muria yang tidak pernah kering meski musim kemarau panjang.',
      'Doa dan wejangan beliau menjaga keseimbangan ekosistem hutan Gunung Muria dari kerusakan selama berabad-abad.',
    ],
  },
  {
    id: 'wali-9',
    name: 'Syarif Hidayatullah (Sayyid Al-Kamil)',
    title: 'Sunan Gunung Jati',
    description:
      'Wali Qutub sekaligus Sultan pertama Kesultanan Cirebon dan peletak dasar Kesultanan Banten serta Jayakarta.',
    location: {
      lat: -6.6601,
      lng: 108.5369,
      address: 'Jl. Alun-Alun Ciledug No. 53, Astana, Kec. Gunungjati',
      city: 'Cirebon',
      province: 'Jawa Barat',
    },
    category: 'Walisongo',
    era: 'Abad ke-15 – ke-16 M (1448 – 1568 M)',
    sanad: 'Putra Syarif Abdullah Umdatuddin Azmatkhan & Nyai Rara Santang; Murid Syekh Datuk Kahfi & Sunan Ampel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg',
    imageSource: 'Wikimedia Commons — Gerbang Astana Gunung Sembung (Makam Sunan Gunung Jati, Cirebon)',
    history:
      'Pemimpin Kesultanan Cirebon dan poros penyebaran Islam di Jawa Barat, Banten, dan Sunda Kelapa.',
    facilities: ['Kompleks Astana Gunung Sembung (9 Pintu)', 'Masjid Dog Jumeneng', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah gumpalan tanah menjadi emas saat diuji keilmuan dan kewaliannya, lalu mengembalikannya menjadi tanah karena kezuhudan beliau.',
      'Menyembuhkan penyakit kusta dan berbagai wabah hanya dengan sentuhan tangan dan doa.',
      'Membuktikan kehamilan semu (bokor kuningan) yang dipasang untuk menguji kewaliannya di hadapan kaisar Tiongkok hingga Putri Ong Tin benar-benar hamil dan menyusul ke Cirebon.',
    ],
  },
  {
    id: 'habib-1',
    name: 'Al-Habib Ali bin Abdurrahman Al-Habsyi',
    title: 'Habib Ali Kwitang',
    description:
      'Ulama kharismatik pelopor Majelis Taklim Kwitang dan pemersatu habaib serta ulama tanah Betawi.',
    location: {
      lat: -6.1843,
      lng: 106.8407,
      address: 'Jl. Kramat Kwitang I No. 10, Kwitang, Kec. Senen',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
    },
    category: 'Habaib',
    era: 'Abad ke-19 – ke-20 M (20 April 1870 – 13 Oktober 1968 M)',
    sanad: 'Murid Habib Ali bin Muhammad Al-Habsyi (Pengarang Simthud Durar, Seiwun) & Habib Utsman bin Yahya',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Habib_ali_kwitang.jpg',
    imageSource: 'Wikimedia Commons — Potret Al-Habib Ali bin Abdurrahman Al-Habsyi (Kwitang)',
    history:
      'Perintis pengajian akbar Minggu pagi di Kwitang dan pendiri Islamic Center Indonesia di Jakarta Pusat.',
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", 'Gedung Majelis Taklim ICI', 'Kubah Makam Habib Ali Kwitang'],
    openingHours: '07:00 - 21:00 WIB',
    karomah: [
      'Kewibawaan dan pancaran mahabbah beliau membuat ratusan orang masuk Islam dan bertaubat hanya dengan memandang wajahnya saat berdoa.',
    ],
  },
  {
    id: 'habib-2',
    name: 'Al-Habib Husein bin Abubakar Alaydrus',
    title: 'Habib Husein Luar Batang',
    description:
      'Waliyullah muda dari Hadramaut yang menjadi benteng spiritual pesisir Sunda Kelapa pada abad ke-18.',
    location: {
      lat: -6.1238,
      lng: 106.8065,
      address: 'Jl. Luar Batang V No. 1, Penjaringan, Kec. Penjaringan',
      city: 'Jakarta Utara',
      province: 'DKI Jakarta',
    },
    category: 'Habaib',
    era: 'Abad ke-18 M (Wafat 17 Ramadhan 1169 H / 24 Juni 1756 M)',
    sanad: 'Jaringan Tarekat Alawiyyin Hadramaut (Tarim - Gujarat - Sunda Kelapa); Bersama muridnya Haji Abdul Kadir',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/98/COLLECTIE_TROPENMUSEUM_Moskee_Luar_Batang_%28Batavia%29_TMnr_60046455.jpg',
    imageSource: 'Koleksi Tropenmuseum / Wikimedia Commons — Masjid Keramat Luar Batang Batavia',
    history:
      'Pendiri surau dan Masjid Keramat Luar Batang di kawasan pelabuhan Sunda Kelapa pada abad ke-18.',
    facilities: ["Masjid Jami' Keramat Luar Batang", 'Ruang Makam Habib Husein & Haji Abdul Kadir'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Saat dipenjara VOC di Glodok, sipir Belanda melihat Habib Husein mengimami shalat berjamaah di lapangan luar sementara pintu selnya masih terkunci rapat dari luar.',
      'Jenazah beliau keluar sendiri dari kurung batang (keranda) saat hendak dibawa ke pemakaman Tanah Abang karena menghendaki dimakamkan di surau Luar Batang.',
    ],
  },
  {
    id: 'habib-3',
    name: 'Al-Habib Hasan bin Muhammad Al-Haddad',
    title: 'Mbah Priok (Tanjung Priok)',
    description:
      'Ulama sufi penyebar Islam di pesisir utara Batavia yang namanya menjadi asal-usul kawasan Tanjung Priok.',
    location: {
      lat: -6.1082,
      lng: 106.8832,
      address: 'Jl. Dobo No. 1, Koja, Kawasan Pelabuhan Tanjung Priok',
      city: 'Jakarta Utara',
      province: 'DKI Jakarta',
    },
    category: 'Habaib',
    era: 'Abad ke-18 M (1727 – 1756 M)',
    sanad: 'Keturunan Al-Imam Abdullah bin Alwi Al-Haddad (Pengarang Ratib Al-Haddad); Berasal dari Palembang',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/COLLECTIE_TROPENMUSEUM_De_haven_van_Tandjoengpriok_op_de_achtergrond_het_station_Batavia_Java_TMnr_10008011.jpg',
    imageSource: 'Koleksi Tropenmuseum / Wikimedia Commons — Kawasan Bersejarah Tanjung Priok',
    history:
      'Ulama sufi keturunan Imam Abdullah bin Alwi Al-Haddad yang berdakwah di pelayaran pesisir utara Jawa.',
    facilities: ['Kubah & Pendopo Makam Mbah Priok', 'Masjid Al-Maqom', 'Sumur Keramat Air Tawar'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Saat perbekalan habis di tengah laut, beliau memasukkan batu karang ke dalam periuk (priuk) lalu berdoa hingga berubah menjadi nasi hangat.',
      'Ikan-ikan lumba-lumba dan cucut mengiringi jenazah beliau hingga mendarat di pantai utara Jakarta.',
    ],
  },
];
