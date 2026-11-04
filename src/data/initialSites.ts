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
      'Pada suatu malam kemarau yang mencekam di pesisir Leran, seorang petani tua datang bersimpuh sambil menangis karena sawahnya mengering dan keluarganya terancam kelaparan. Syekh Maulana Malik Ibrahim menatapnya dengan mata berkaca-kaca, meletakkan bantal lusuh tempat beliau biasa bersujud, lalu membisikkan satu rahasia munajat pembuka pintu langit sebelum menancapkan tongkatnya ke tanah tandus<!--more--> dan meminta sang petani melafalkan istighfar serta shalawat dengan hati yang pasrah total kepada Ar-Razzaq. Seketika itu pula dari celah tanah yang retak memancar mata air tawar yang jernih di tengah kawasan payau. Beliau berwasiat: selama tanganmu tidak pernah lelah memberi makan orang yang lapar dan lisanmu basah oleh istighfar di sepertiga malam, Allah tidak akan pernah membiarkan sumur rezekimu mengering. Hingga akhir hayatnya, nisan marmer beliau mengabadikan gelar Umdat as-Salikin dan Bantal bagi Para Fakir Miskin.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Area Parkir Bus & Mobil', 'Toilet & Tempat Wudhu', 'Pendopo Peziarah'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah tanah tandus dan berair payau di pesisir Gresik menjadi lahan pertanian subur melalui doa dan rekayasa saluran air.',
      'Di tengah malam saat wabah penyakit mematikan melanda pesisir Majapahit dan para tabib istana angkat tangan, seorang ibu menggendong anaknya yang sekarat ke hadapan Syekh Maulana Malik Ibrahim sambil merintih putus asa; sang Wali mengusap kening anak itu dan membisikkan amalan rahasia kesembuhan<!--more--> berupa bacaan Surah Al-Fatihah tujuh kali dalam satu tarikan napas yakin yang dipadukan dengan air embun dedaunan pesisir. Sebelum fajar menyingsing, demam sang anak luruh dan ratusan warga yang sembuh berbondong-bondong memeluk Islam karena menyaksikan kasih sayang sang Wali yang merawat mereka tanpa memandang kasta.',
      'Ketika masyarakat pesisir hendak mengorbankan seorang gadis desa dalam ritual kuno karena kemarau panjang yang menghancurkan panen, Syekh Maulana Malik Ibrahim maju menghadang dengan air mata haru dan mengangkat kedua tangannya ke langit yang gersang<!--more--> seraya bermunajat memohon rahmat Allah Yang Maha Pengasih agar mengganti ketakutan warga dengan keberkahan. Belum sempat tangan beliau turun, mendung tebal bergulung-gulung dan hujan deras turun membasahi seluruh bumi Gresik, menghentikan tradisi pengorbanan manusia selamanya.',
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
    untoldStory:
      'Suatu malam yang hening di serambi Masjid Ampel Denta, seorang pemuda bangsawan yang hancur hidupnya akibat judi, minuman keras, dan lilitan utang datang merangkak sambil menangis tersedu-sedu karena merasa dosanya tak mungkin lagi diampuni Allah. Kanjeng Sunan Ampel merangkul pundak pemuda yang gemetar itu, menyeka air matanya, dan membisikkan wasiat batin pelebur belenggu maksiat<!--more--> yang kelak dikenal sebagai riyadhoh Moh Limo. Beliau mengajarkan sang pemuda untuk menjaga wudhu setiap batal, bangun sebelum subuh untuk menangisi dosa dalam dua rakaat taubat, dan membasahi lidah dengan kalimat tauhid Laa ilaaha illallaah. Beberapa bulan kemudian, pemuda yang dulunya dicemooh seluruh kota itu berubah menjadi saudagar jujur dan ahli ibadah yang dermawan, membuktikan wasiat Sunan Ampel bahwa sehitam apa pun masa lalu seorang hamba, pintu rahmat Allah selalu lebih luas bagi hati yang benar-benar pulang.',
    facilities: ['Masjid Agung Sunan Ampel (Berdiri 1421 M)', 'Sumur Karomah Nadzir', 'Area Wudhu & Toilet Terpadu'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Kisah Mbah Sholeh (penjaga kebersihan Masjid Ampel) yang hidup kembali hingga 9 kali atas doa dan ucapan Kanjeng Sunan Ampel.',
      "Ketika sebagian orang meragukan arah kiblat Masjid Agung Ampel yang baru dibangun dan suasana musyawarah menjadi tegang di keheningan malam, Mbah Sonhaji (Mbah Bolong) atas isyarat batin Sunan Ampel maju ke dinding pengimaman dan melubanginya sambil meminta para hadirin menatap ke dalam lubang tersebut<!--more--> dengan mata hati yang bersih dari kesombongan. Seketika tersingkaplah hijab jarak ribuan kilometer hingga tampak bangunan suci Ka'bah di Makkah secara nyata tepat lurus di hadapan mihrab, membuat seluruh ulama dan santri jatuh bersujud syukur dengan derai air mata.",
      'Saat perahu dakwah tertahan di muara sungai yang meluap hebat sementara warga yang sakit di seberang rawa Ampel Denta sangat membutuhkan pertolongan malam itu, Kanjeng Sunan Ampel menenangkan murid-muridnya yang cemas dan membisikkan rahasia tawakal<!--more--> bahwa barangsiapa menundukkan hawa nafsunya karena Allah, maka seluruh alam akan tunduk melayaninya. Dengan langkah tenang sambil berdzikir, beliau berjalan di atas permukaan air sungai yang deras tanpa membasahi telapak kakinya sedikit pun hingga tiba di seberang.',
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
    untoldStory:
      'Dalam keheningan malam purnama di pesisir Tuban, Wujil—mantan abdi keraton Majapahit yang telah bertahun-tahun mengembara mencari ketenangan batin namun hatinya tetap terasa hampa dan gelisah—bersimpuh menangis di hadapan Sunan Bonang. Sang Wali menghentikan tabuhan gamelannya, menatap Wujil dengan penuh welas asih, lalu membuka lembaran rahasia Suluk Wujil tentang obat penawar hati yang remuk<!--more--> yakni bahwa kegelisahan manusia bersumber dari hati yang mencari sandaran pada makhluk, bukan pada Sang Pencipta. Sunan Bonang kemudian menurunkan lima resep riyadhoh Tombo Ati—membaca Al-Qur\'an dengan merenungi maknanya, mendirikan shalat malam saat manusia terlelap, duduk bersama orang-orang shalih, menjaga perut dari yang syubhat, serta memperbanyak dzikir malam—yang seketika meluruhkan seluruh beban batin Wujil hingga ia mencapai derajat makrifat.',
    facilities: ['Masjid Agung Tuban', 'Pendopo & Gapura Paduraksa Kuno', 'Area Parkir Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah buah pohon aren menjadi emas berkilauan saat menyadarkan Raden Sahid (kelak menjadi Sunan Kalijaga) di tepi sungai.',
      'Ketika suasana batin masyarakat Tuban diliputi ketegangan dan kesedihan akibat runtuhnya kejayaan lama, pada malam Jumat Sunan Bonang menabuh gamelan bonangnya di serambi masjid dengan irama suluk yang menggetarkan dada hingga orang-orang yang mendengarnya tiba-tiba menangis tanpa tahu sebabnya<!--more--> karena frekuensi dzikir di balik tiap ketukan bonang itu menyentuh fitrah ruhani mereka yang paling dalam. Ratusan warga yang semula keras hati datang bersimpuh di pelataran masjid, merasakan kesejukan batin yang belum pernah mereka kecap seumur hidup, lalu mengucapkan dua kalimat syahadat dengan penuh kerinduan.',
      'Di saat para musafir dan nelayan pesisir Tuban kehausan hebat karena sumur-sumur daratan berubah asin oleh intrusi air laut, seorang kakek tua mengadu dengan bibir pecah-pecah kepada Sunan Bonang; sang Wali tersenyum teduh, menancapkan tongkatnya tepat di bibir pantai berpasir asin<!--more--> sambil melantunkan shalawat Tibbil Qulub dan memohon kepada Allah Sang Pemilik Samudra. Seketika memancarlah mata air tawar yang sejuk dan manis tepat di tengah kepungan air laut asin, yang hingga kini tetap mengalir menjadi saksi karomah dan kasih sayang beliau kepada umat.',
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
    untoldStory:
      'Pada suatu malam dingin ketika angin barat menghantam pesisir Lamongan dan para nelayan tidak bisa melaut selama berminggu-minggu, seorang janda miskin datang ke bukit Dalem Duwur sambil memeluk anaknya yang menggigil kelaparan. Sunan Drajat tidak sekadar memberikan seluruh persediaan makanan di rumahnya, tetapi juga memegang tangan janda itu dan membisikkan wasiat rahasia pembuka keberkahan rezeki Catur Piwulang<!--more--> yakni bahwa siapa pun yang sedang terhimpit kesulitan hidup hendaknya mendahulukan menolong sesama yang lebih lemah: memberi tongkat bagi yang buta, memberi makan yang lapar, memberi pakaian yang papa, dan memberi teduhan bagi yang kehujanan. Sejak malam itu, masyarakat Paciran mengamalkan sedekah subuh dan gotong royong Catur Piwulang hingga kawasan tandus tersebut berubah menjadi pelabuhan niaga yang makmur dan diberkahi.',
    facilities: ['Museum Sunan Drajat', "Masjid Jami' Sunan Drajat", 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 22:00 WIB',
    karomah: [
      'Diselamatkan oleh ikan cucut dan ikan talang saat perahunya pecah dihantam badai laut di perairan Lamongan hingga mendarat selamat di Desa Jelag.',
      'Ketika para santri dan warga yang mendaki perbukitan Drajat kelelahan serta kehabisan air di puncak bukit kapur yang kering kerontang, mereka mengadu dengan napas tersengal kepada Sunan Drajat; beliau menatap langit dengan penuh iba lalu memegang batang pohon lengkeng hutan di hadapannya<!--more--> seraya berdoa memohon mata air kehidupan bagi para penuntut ilmu dan fakir miskin. Begitu pohon itu dicabut dengan izin Allah, memancarlah mata air jernih yang tak pernah surut dari bekas akarnya—yang kini diabadikan sebagai Sumur Lengsanga—menjadi pelepas dahaga dan wasilah doa kesembuhan.',
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
    untoldStory:
      'Menjelang Hari Raya Kurban di masa awal berdirinya Masjid Al-Aqsha, suasana kota menjadi tegang karena para tokoh masyarakat Hindu Kudus merasa cemas hewan suci mereka—sapi—akan disembelih oleh umat Islam yang baru tumbuh. Di keheningan malam sebelum hari raya, Sunan Kudus mengumpulkan para santrinya di depan batu mihrab dari Baitul Maqdis dan menyampaikan wasiat batin yang menggetarkan hati<!--more--> bahwa memenangkan hati manusia dengan akhlak dan kasih sayang jauh lebih mulia di sisi Allah daripada memenangkan perdebatan dengan melukai perasaan tetangga. Keesokan paginya, beliau menambatkan seekor sapi di halaman masjid untuk dimuliakan dan memerintahkan umat Islam berkurban dengan kerbau. Kelembutan hati sang Wali membuat ribuan keluarga Kudus menangis haru dan berbondong-bondong memeluk Islam dengan sukarela.',
    facilities: ['Masjid Al-Aqsha & Menara Kudus', 'Tempat Wudhu Pancuran 8', 'Terminal Wisata Bakalan Krapyak'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Meredakan wabah penyakit di tanah Baitul Maqdis melalui doa hingga diberi hadiah batu prasasti oleh Amir Palestina.',
      'Saat seorang penguasa lokal yang sombong datang di tengah malam untuk menguji ilmu dan kesaktian Sunan Kudus dengan ancaman hendak membubarkan pengajian para santri, sang Wali menerimanya dengan senyum tenang di serambi Menara Kudus lalu membisikkan satu kalimat peringatan ruhani<!--more--> sambil menunjuk ke arah delapan pancuran wudhu agar sang tamu membasuh wajah dan hatinya dari kesombongan dunia. Begitu air wudhu menyentuh wajahnya, seluruh kesaktian yang ia banggakan luruh seketika dan hatinya dipenuhi ketenangan luar biasa hingga ia bersimpuh memohon bimbingan taubat.',
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
    untoldStory:
      'Pada suatu malam genting ketika ribuan pasukan bersenjata mengepung lereng Bukit Giri dan para santri serta keluarga pesantren dilanda ketakutan luar biasa, Raden Paku (Sunan Giri) tetap duduk tenang di dalam kamar khalwatnya menggoreskan pena di atas lembaran kitab. Saat seorang santri masuk dengan tubuh gemetar mengabarkan bahwa musuh sudah di ambang gerbang, Sunan Giri mengangkat wajahnya yang bercahaya dan membisikkan rahasia keteguhan hati di saat genting<!--more--> bahwa siapa pun yang menggantungkan keselamatannya semata-mata kepada Allah, maka sehelai rumput pun dapat menjadi benteng baginya. Beliau melemparkan pena kayunya sambil berdoa memohon perlindungan tanpa pertumpahan darah; atas izin Allah pena itu berubah menjadi Keris Kalamunyeng yang berkelebat menghalau rasa berani di dada pasukan lawan hingga mereka mundur dengan sendirinya.',
    facilities: ['Cungkup Ukiran Kayu Jati Kuno', 'Masjid Besar Ainul Yaqin Sunan Giri', 'Museum & Parkir Terpadu Giri'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Saat masih bayi dalam peti di tengah Selat Bali, peti Raden Paku memancarkan cahaya terang dan membuat kapal dagang Nyai Ageng Pinatih berhenti berputar-putar.',
      'Ketika seorang saudagar muda yang bangkrut dan terlilit utang dagang datang menangis di tangga batu Giri Kedaton pada malam hari, Sunan Giri memberinya segenggam pasir halaman pesantren sambil membisikkan wasiat adab berniaga dan sedekah<!--more--> agar tidak pernah mencurangi timbangan dan selalu menyisihkan hak fakir miskin sebelum menghitung keuntungan. Sesampainya di rumah, jalan rezeki saudagar itu terbuka secara ajaib dari arah yang tak disangka-sangka hingga seluruh utangnya lunas dan ia menjadi penyokong utama kapal dakwah santri Giri ke Maluku.',
      'Ketika Raden Paku hendak mencari titik pusat pesantren yang diberkahi untuk meneruskan amanah ayahandanya Syekh Maulana Ishaq, beliau berjalan menembus malam sambil membawa segenggam tanah dari Pasai dan bermunajat memohon petunjuk tempat terbaik bagi anak cucu umat<!--more--> hingga langkah beliau terhenti di puncak Bukit Kebomas Gresik yang warna, wangi, dan timbangan tanahnya persis sama dengan tanah di genggamannya. Di bukit itulah berdiri Giri Kedaton yang cahayanya menerangi Nusantara selama berabad-abad.',
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
    untoldStory:
      'Tepat pada malam terakhir sebelum peresmian Masjid Agung Demak, seluruh tukang kayu istana terdiam cemas karena satu tiang utama (Soko Guru) belum juga tersedia sementara waktu subuh kian mendekat. Di tengah keheningan malam yang mencekam itu, Sunan Kalijaga duduk seorang diri mengumpulkan serpihan-serpihan kayu sisa (tatal) yang tak terpakai, mengikatnya erat, lalu menengadahkan tangan dalam munajat panjang yang menguras air mata<!--more--> memohon kepada Allah agar menyatukan hati umat yang terserak sebagaimana serpihan kayu kecil itu. Beliau membisikkan rahasia batin bahwa di mata Allah, kepingan amal kecil yang diikat dengan keikhlasan dan persatuan jauh lebih kokoh daripada kemegahan yang disertai kesombongan. Saat fajar menyingsing, ikatan tatal itu telah menyatu menjadi tiang kayu utuh yang berdiri tegak menyangga Masjid Agung Demak hingga ratusan tahun kemudian.',
    facilities: ['Kompleks Makam Kadilangu', 'Masjid Sunan Kalijaga Kadilangu', 'Pendopo Notobratan'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Menyatukan serpihan kayu (tatal) menjadi tiang utama Soko Tatal di Masjid Agung Demak hanya dalam satu malam melalui munajat.',
      'Ketika para wali bermusyawarah hingga larut malam untuk menentukan presisi arah kiblat Masjid Agung Demak namun belum mencapai titik temu, Sunan Kalijaga berdiri dengan penuh tawadhu di tengah ruangan lalu merentangkan kedua tangannya dalam keheningan dzikir<!--more--> hingga atas izin Allah tangan kanan beliau menyentuh pucuk bangunan Masjidil Haram di Makkah dan tangan kiri beliau memegang pucuk tiang Masjid Agung Demak, meluruskan kiblat dalam satu tarikan napas yang disaksikan langsung oleh seluruh anggota Dewan Walisongo.',
      'Saat Raden Sahid masih berjuang membersihkan karat kesombongan dan masa lalunya, Sunan Bonang menancapkan tongkat di tepi sungai dan memintanya menunggu; malam demi malam berlalu dalam hujan dan panas hingga tubuh beliau dirambati akar pepohonan<!--more--> namun hatinya justru semakin terang benderang oleh dzikir sirri yang tak terputus. Dari riyadhoh kesabaran luar biasa di tepi sungai itulah beliau diangkat menjadi Kanjeng Sunan Kalijaga, sang penuntun hati jutaan manusia yang sedang terluka dan ingin kembali kepada Tuhan.',
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
    untoldStory:
      'Suatu malam yang berkabut tebal di puncak Gunung Muria, sepasang suami istri yang telah belasan tahun mendambakan keturunan dan nyaris putus asa karena cemoohan kerabat mendaki ratusan anak tangga batu sambil menangis menahan dingin. Sesampainya di serambi masjid puncak, Sunan Muria menyambut mereka dengan hangat, menyodorkan secangkir air dari Gentong Keramat, lalu membisikkan wasiat ketenangan batin<!--more--> sebagaimana alunan tembang Sinom dan Kinanthi: bahwa setiap ujian yang membuat langkah terasa mendaki sesungguhnya sedang mengangkat derajat seorang hamba lebih dekat ke langit. Beliau menuntun keduanya membaca doa Nabi Zakariya dengan penuh kepasrahan di sepertiga malam dan membekali mereka buah parijoto gunung; tak lama berselang, pasangan itu dikaruniai keturunan yang shalih dan berbakti.',
    facilities: ['Masjid Sunan Muria', '700+ Anak Tangga & Pangkalan Ojek Gunung', 'Sumber Air Gentong Keramat'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Memancarkan mata air jernih di puncak Gunung Muria yang tidak pernah kering meski musim kemarau panjang.',
      'Ketika sekelompok perambah hutan berniat menebang pohon-pohon penyangga mata air di lereng Gunung Muria pada malam hari demi keuntungan sesaat, tiba-tiba langkah mereka terhenti oleh kabut wangi dan suara tembang dzikir Sunan Muria yang menggema lembut dari balik pepohonan<!--more--> mengingatkan bahwa setiap helai daun dan tetes air gunung adalah tasbih makhluk Allah yang menjaga kehidupan anak cucu manusia di lembah. Hati mereka pun luruh penuh penyesalan, lalu berbalik menjadi penjaga kelestarian hutan dan sumber mata air Muria.',
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
    untoldStory:
      'Di penghujung usianya yang sepuh, ketika para bangsawan dan panglima Kesultanan Cirebon berkumpul di keheningan malam menantikan wasiat politik tentang takhta dan harta kerajaan, Syarif Hidayatullah (Sunan Gunung Jati) justru menatap mereka dengan linangan air mata. Dengan suara bergetar yang menembus relung jiwa, sang Sultan sekaligus Wali Qutub itu hanya mengucapkan satu kalimat wasiat terakhir yang menggetarkan langit Cirebon<!--more--> yakni: Ingsun titip tajug lan fakir miskin (Aku titipkan langgar/masjid dan orang-orang fakir miskin). Beliau menegaskan bahwa kejayaan sebuah negeri dan keberkahan hidup seseorang sama sekali tidak diukur dari tingginya istana, melainkan dari makmurnya tempat sujud dan kenyangnya perut fakir miskin yang dimuliakan. Wasiat emas itulah yang terus hidup menjaga ruh kemanusiaan di Bumi Pasundan dan Cirebon hingga hari ini.',
    facilities: ['Kompleks Astana Gunung Sembung (9 Pintu)', 'Masjid Dog Jumeneng', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah gumpalan tanah menjadi emas saat diuji keilmuan dan kewaliannya, lalu mengembalikannya menjadi tanah karena kezuhudan beliau.',
      'Pada suatu malam ketika seorang penderita penyakit kulit parah yang diasingkan oleh keluarganya sendiri merintih kesakitan di luar gerbang masjid karena malu mendekat, Sunan Gunung Jati keluar seorang diri membawa air wudhu, memeluk tubuh orang itu tanpa rasa jijik sedikit pun<!--more--> lalu mengusap luka-lukanya sambil melantunkan doa syifa dan shalawat Nabi dengan penuh cinta kasih. Atas izin Allah, penyakit yang telah menahun itu sembuh bersih dan kisah kasih sayang sang Sultan menyebar ke seluruh pelosok Jawa Barat.',
      'Saat Kaisar Tiongkok menguji kewalian Syarif Hidayatullah dengan menyuruh Putri Ong Tin memasang bokor kuningan di perutnya agar tampak hamil lalu menanyakan usia kandungannya di hadapan seluruh pembesar istana, Sunan Gunung Jati menatap dengan tenang dan berdoa dalam hati<!--more--> lalu menjawab bahwa sang putri benar-benar sedang mengandung. Begitu tirai dibuka, bokor kuningan itu lenyap dan Putri Ong Tin sungguh-sungguh hamil atas kuasa Allah, hingga sang putri luluh hatinya, memeluk Islam, dan berlayar menyusul beliau ke Cirebon.',
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
    untoldStory:
      'Di tengah malam-malam genting bulan Ramadhan menjelang Agustus 1945, ketika masa depan bangsa masih diselimuti ketidakpastian dan ancaman senjata, Bung Karno datang diam-diam ke kediaman Habib Ali Kwitang untuk memohon doa restu serta petunjuk waktu terbaik. Habib Ali Kwitang memegang erat tangan Bung Karno dengan mata berkaca-kaca, menengadah ke langit dalam munajat panjang, lalu membisikkan wasiat keberanian dan keberkahan hari Jumat<!--more--> bahwa kemerdekaan yang diproklamasikan pada hari Jumat di bulan suci Ramadhan akan dijaga langsung oleh pertolongan Allah dan doa para Auliya. Beliau juga berpesan agar setiap pemimpin dan rakyat tidak pernah meninggalkan majelis shalawat kepada Rasulullah SAW, karena dengan mahabbah kepada Nabi itulah hati yang terpecah belah akan selalu dipersatukan kembali.',
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", 'Gedung Majelis Taklim ICI', 'Kubah Makam Habib Ali Kwitang'],
    openingHours: '07:00 - 21:00 WIB',
    karomah: [
      'Kewibawaan dan pancaran mahabbah beliau membuat ratusan orang masuk Islam dan bertaubat hanya dengan memandang wajahnya saat berdoa.',
      'Pada suatu subuh yang dingin di Kwitang, seorang kepala keluarga yang hendak mengakhiri hidupnya karena terlilit utang dan kehilangan pekerjaan duduk menangis di pojok belakang majelis; tiba-tiba Habib Ali Kwitang membelah kerumunan ribuan jamaah, menghampiri pria itu, dan menepuk bahunya sambil tersenyum teduh<!--more--> seraya menyerahkan amplop berisi uang yang jumlahnya persis sama dengan utang pria tersebut, padahal pria itu belum pernah menceritakan bebannya kepada siapa pun. Habib Ali berbisik lembut: Jangan pernah berputus asa dari rahmat Allah selama engkau masih mau duduk di majelis kekasih-Nya, Nabi Muhammad SAW.',
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
