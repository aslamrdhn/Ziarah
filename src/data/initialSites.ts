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
    untoldStory:
      'Malam itu angin kemarau berembus kering di pesisir Leran, Gresik. Di bawah cahaya pelita minyak jarak yang redup, seorang petani tua datang merangkak ke serambi surau sambil mendekap segenggam bulir padi yang hampa; sawahnya retak berair payau dan anak-anaknya sudah dua hari hanya meminum air tajin.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Area Parkir Bus & Mobil', 'Toilet & Tempat Wudhu', 'Pendopo Peziarah'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Sepertiga malam di serambi Masjid Agung Ampel Denta terasa begitu hening, hanya terdengar gemericik air wudhu dan desir angin dari arah Sungai Kalimas. Tiba-tiba seorang pemuda bangsawan Majapahit yang hancur hidupnya akibat judi, minuman keras, dan lilitan utang datang merangkak di lantai kayu sambil menangis tersedu-sedu.',
    facilities: ['Masjid Agung Sunan Ampel (Berdiri 1421 M)', 'Sumur Karomah Nadzir', 'Area Wudhu & Toilet Terpadu'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Di bawah cahaya bulan purnama yang memantul di permukaan laut Tuban, suara denting gamelan bonang mengalun pelan dari pendopo kayu pesantren. Wujil—mantan abdi terkasih keraton Majapahit yang telah sepuluh tahun mengembara mencari arti hidup namun dadanya tetap terasa hampa—datang bersimpuh dengan air mata berlinang.',
    facilities: ['Masjid Agung Tuban', 'Pendopo & Gapura Paduraksa Kuno', 'Area Parkir Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Malam itu angin barat menderu kencang menghantam pesisir Paciran, Lamongan, membuat perahu-perahu nelayan tertambat berhari-hari tanpa hasil tangkapan. Di tengah dingin yang menusuk tulang, seorang janda miskin mendaki bukit Dalem Duwur sambil mendekap anaknya yang menggigil kelaparan.',
    facilities: ['Museum Sunan Drajat', "Masjid Jami' Sunan Drajat", 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 22:00 WIB',
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
    untoldStory:
      'Malam menjelang Hari Raya Idul Adha pada tahun-tahun awal berdirinya Masjid Al-Aqsha Menara Kudus terasa begitu mencekam. Di sudut-sudut kampung, para tetua masyarakat Hindu Kudus berbisik dengan wajah cemas karena khawatir esok pagi umat Islam yang semakin besar jumlahnya akan menyembelih sapi—hewan yang sangat mereka sucikan.',
    facilities: ['Masjid Al-Aqsha & Menara Kudus', 'Tempat Wudhu Pancuran 8', 'Terminal Wisata Bakalan Krapyak'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Malam itu obor-obor pasukan bersenjata tampak mengepung lereng Bukit Giri dari segala penjuru, membuat para santri dan keluarga di puncak Giri Kedaton dilanda kepanikan hebat. Namun di dalam bilik khalwatnya yang sederhana, Raden Paku (Sunan Giri) tetap duduk bersila dengan tenang menggoreskan pena kayu di atas lembaran kertas.',
    facilities: ['Cungkup Ukiran Kayu Jati Kuno', 'Masjid Besar Ainul Yaqin Sunan Giri', 'Museum & Parkir Terpadu Giri'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Malam terakhir sebelum peresmian Masjid Agung Demak Bintoro menyisakan kecemasan yang mendalam di hati para tukang kayu dan bangsawan. Tiga tiang raksasa (Soko Guru) milik Sunan Ampel, Sunan Bonang, dan Sunan Gunung Jati telah berdiri megah, namun satu tiang bagian jatah Raden Mas Said (Sunan Kalijaga) belum juga tampak batang kayunya.',
    facilities: ['Kompleks Makam Kadilangu', 'Masjid Sunan Kalijaga Kadilangu', 'Pendopo Notobratan'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Kabut malam turun menyelimuti lereng Gunung Muria yang dingin dan sunyi di ketinggian Desa Colo. Sepasang suami istri petani yang telah dua belas tahun menikah namun belum dikaruniai keturunan—hingga nyaris bercerai karena cemoohan lingkungan—mendaki ratusan anak tangga batu sambil berpegangan tangan dan menangis dalam gelap.',
    facilities: ['Masjid Sunan Muria', '700+ Anak Tangga & Pangkalan Ojek Gunung', 'Sumber Air Gentong Keramat'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Malam itu suasana di Keraton Pakungwati dan Masjid Agung Sang Cipta Rasa Cirebon terasa begitu haru dan hening. Para pangeran, adipati, dan panglima perang berkumpul mengelilingi pembaringan Syarif Hidayatullah (Sunan Gunung Jati) yang telah berusia lebih dari satu abad, menantikan wasiat terakhir beliau: "Ingsun titip tajug lan fakir miskin."',
    facilities: ['Kompleks Astana Gunung Sembung (9 Pintu)', 'Masjid Dog Jumeneng', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
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
    untoldStory:
      'Pada malam-malam genting di bulan suci Ramadhan tahun 1945, suasana Kota Jakarta diselimuti ketegangan luar biasa di bawah bayang-bayang senjata tentara pendudukan. Di tengah kebimbangan menentukan langkah besar bagi nasib jutaan rakyat, Bung Karno datang diam-diam ke serambi kediaman Al-Habib Ali bin Abdurrahman Al-Habsyi di Kwitang.',
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", 'Gedung Majelis Taklim ICI', 'Kubah Makam Habib Ali Kwitang'],
    openingHours: '07:00 - 21:00 WIB',
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
  },
];
