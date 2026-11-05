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
      'Malam itu angin kemarau berembus kering di pesisir Leran, Gresik. Di bawah cahaya pelita minyak jarak yang redup, seorang petani tua datang merangkak ke serambi surau sambil mendekap segenggam bulir padi yang hampa; sawahnya retak berair payau dan anak-anaknya sudah dua hari hanya meminum air tajin.\n\nSyekh Maulana Malik Ibrahim menatap wajah keriput itu dengan mata berkaca-kaca, mengambil bantal lusuh tempat beliau biasa menangis dalam sujud tahajud, lalu membisikkan satu rahasia munajat pembuka pintu langit sebelum menancapkan tongkat kayunya ke tanah tandus<!--more-->\n\nBeliau meminta sang petani menundukkan kepala dan melafalkan istighfar seratus kali serta shalawat Nabi dengan hati yang pasrah total kepada Ar-Razzaq, Sang Maha Pemberi Rezeki. Seketika itu pula, dari celah tanah yang retak memancar mata air tawar yang jernih dan sejuk di tengah kepungan rawa payau.\n\nSang Wali kemudian memegang bahu petani itu dan berwasiat lembut: "Selama tanganmu tidak pernah lelah memberi makan orang yang lapar dan lisanmu basah oleh istighfar di sepertiga malam, Allah tidak akan pernah membiarkan sumur rezekimu mengering." Hingga akhir hayatnya, batu nisan marmer beliau di Gapuro Sukolilo mengabadikan gelar mulia: Bantal bagi Para Fakir Miskin.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Area Parkir Bus & Mobil', 'Toilet & Tempat Wudhu', 'Pendopo Peziarah'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah tanah tandus dan berair payau di pesisir Gresik menjadi lahan pertanian subur melalui doa dan rekayasa saluran air.',
      'Di tengah malam buta saat wabah demam mematikan melanda pesisir Majapahit dan para tabib istana telah angkat tangan, seorang ibu berlari menembus gerimis sambil menggendong anaknya yang sekarat ke hadapan Syekh Maulana Malik Ibrahim.\n\nDengan napas tersengal dan air mata yang membasahi tanah, sang ibu merintih memohon pertolongan; sang Wali pun mengusap kening anak yang panas membara itu lalu membisikkan amalan rahasia kesembuhan<!--more-->\n\nBeliau melantunkan Surah Al-Fatihah tujuh kali dalam satu tarikan napas penuh keyakinan, lalu membasuhkan air embun dedaunan pesisir yang telah didoakan ke dada sang anak. Sebelum fajar menyingsing, demam anak itu luruh seketika dan ratusan keluarga pesisir memeluk Islam karena menyaksikan kasih sayang sang Wali yang merawat siapa saja tanpa memandang kasta.',
      'Ketika kemarau panjang menghanguskan ladang-ladang di Gresik, tetua adat setempat bersiap mengorbankan seorang gadis desa di atas panggung batu demi meredakan murka penjaga laut.\n\nDi saat pedang upacara hendak dihunus dan tangis keluarga sang gadis pecah di tengah kerumunan, Syekh Maulana Malik Ibrahim maju menghadang seorang diri dengan air mata haru lalu mengangkat kedua tangannya tinggi-tinggi ke langit yang gersang<!--more-->\n\nBeliau bermunajat dengan suara bergetar memohon kepada Allah Yang Maha Pengasih agar menurunkan hujan rahmat dan mengganti tradisi ketakutan itu dengan cahaya iman. Belum sempat kedua tangan beliau turun, mendung hitam bergulung-gulung dari arah laut dan hujan deras mengguyur bumi Gresik, menghentikan ritual pengorbanan manusia untuk selamanya.',
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
      'Sepertiga malam di serambi Masjid Agung Ampel Denta terasa begitu hening, hanya terdengar gemericik air wudhu dan desir angin dari arah Sungai Kalimas. Tiba-tiba seorang pemuda bangsawan Majapahit yang hancur hidupnya akibat judi, minuman keras, dan lilitan utang datang merangkak di lantai kayu sambil menangis tersedu-sedu.\n\nDengan tubuh gemetar karena rasa malu dan putus asa, ia berkata bahwa seluruh keluarganya telah mengusirnya dan ia merasa dosanya terlalu kotor untuk diampuni Tuhan; Kanjeng Sunan Ampel pun turun dari sajadahnya, merangkul pundak pemuda itu, lalu membisikkan wasiat batin pelebur belenggu maksiat<!--more-->\n\nSang Wali menuntun pemuda itu mengambil air wudhu dan mengajarkan riyadhoh lima pantangan jiwa yang kelak masyhur sebagai falsafah Moh Limo. Beliau berpesan agar sang pemuda menjaga wudhu setiap kali batal, bangun sebelum subuh untuk menangisi dosa dalam dua rakaat taubat, serta mengunci lisannya dengan kalimat tauhid Laa ilaaha illallaah setiap kali godaan lama datang menghampiri.\n\nEnam bulan berselang, pemuda yang dulunya dicemooh di seluruh pasar Surabaya itu tumbuh menjadi saudagar jujur dan dermawan yang membiayai dapur santri. Sunan Ampel menutup kisahnya kepada para murid dengan kalimat teduh: "Sehitam apa pun masa lalu seorang hamba, pintu rahmat Allah selalu lebih luas bagi hati yang benar-benar ingin pulang."',
    facilities: ['Masjid Agung Sunan Ampel (Berdiri 1421 M)', 'Sumur Karomah Nadzir', 'Area Wudhu & Toilet Terpadu'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Kisah Mbah Sholeh (penjaga kebersihan Masjid Ampel) yang hidup kembali hingga 9 kali atas doa dan ucapan Kanjeng Sunan Ampel.',
      "Ketika pembangunan Masjid Agung Ampel baru saja rampung, sebagian tokoh meragukan keakuratan arah kiblatnya hingga suasana musyawarah malam itu menjadi tegang.\n\nAtas isyarat batin Kanjeng Sunan Ampel, murid setianya Mbah Sonhaji (Mbah Bolong) maju ke dinding pengimaman lalu melubangi tembok batu itu dengan ujung jarinya dan meminta para hadirin menatap ke dalam lubang tersebut<!--more-->\n\nSeketika tersingkaplah hijab jarak ribuan kilometer hingga tampak bangunan suci Ka'bah di Makkah secara nyata tepat lurus di hadapan mihrab Masjid Ampel, membuat seluruh ulama dan santri jatuh bersujud syukur dengan derai air mata.",
      'Suatu malam ketika hujan badai membuat Sungai Kalimas meluap hebat, seorang warga miskin di seberang rawa Ampel Denta mengalami kritis dan membutuhkan pertolongan segera sementara tak satu pun tukang perahu berani menyeberang.\n\nKanjeng Sunan Ampel menenangkan murid-muridnya yang cemas di tepi dermaga, merapatkan jubahnya, lalu membisikkan rahasia tawakal para kekasih Allah<!--more-->\n\nBeliau berkata lembut bahwa barangsiapa menundukkan hawa nafsunya semata-mata karena Allah, maka seluruh unsur alam akan tunduk melayaninya. Dengan langkah tenang sambil melantunkan dzikir, beliau berjalan di atas permukaan air sungai yang bergolak deras tanpa membasahi telapak kakinya sedikit pun hingga tiba di rumah warga tersebut.',
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
      'Di bawah cahaya bulan purnama yang memantul di permukaan laut Tuban, suara denting gamelan bonang mengalun pelan dari pendopo kayu pesantren. Wujil—mantan abdi terkasih keraton Majapahit yang telah sepuluh tahun mengembara mencari arti hidup namun dadanya tetap terasa hampa—datang bersimpuh dengan air mata berlinang.\n\nSunan Bonang menghentikan tabuhan gamelannya, menatap Wujil yang sedang remuk batinnya dengan penuh welas asih, lalu membuka lembaran rahasia Suluk Wujil tentang obat penawar hati yang gelisah<!--more-->\n\nBeliau menjelaskan bahwa kelelahan jiwa manusia sesungguhnya berasal dari hati yang terus mencari sandaran pada pujian dan harta makhluk, bukan pada Sang Maha Pencipta. Dengan suara selembut angin malam, Sunan Bonang mengajarkan lima riyadhoh Tombo Ati: membaca Al-Qur\'an dengan meresapi maknanya, mendirikan shalat malam saat dunia terlelap, duduk berkumpul bersama orang-orang shalih, menjaga perut dari harta syubhat, serta memperbanyak dzikir di keheningan malam.\n\nMalam itu juga beban berat di dada Wujil luruh seperti embun pagi. Ia menemukan ketenangan sejati yang tak pernah ia dapatkan di gemerlap istana, dan bait-bait Tombo Ati warisan Sunan Bonang terus menjadi pelipur lara jutaan hati hingga berabad-abad kemudian.',
    facilities: ['Masjid Agung Tuban', 'Pendopo & Gapura Paduraksa Kuno', 'Area Parkir Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah buah pohon aren menjadi emas berkilauan saat menyadarkan Raden Sahid (kelak menjadi Sunan Kalijaga) di tepi sungai.',
      'Ketika masyarakat pesisir Tuban diliputi ketegangan dan kesedihan akibat runtuhnya tatanan lama, pada malam Jumat Sunan Bonang duduk di serambi masjid dan mulai menabuh gamelan bonangnya dengan irama suluk yang belum pernah terdengar sebelumnya.\n\nAnehnya, setiap orang yang melintas dan mendengar alunan gending itu tiba-tiba terdiam lalu menangis haru tanpa tahu sebabnya<!--more-->\n\nTernyata frekuensi dzikir khafi yang ditiupkan Sunan Bonang di balik tiap ketukan bonang itu langsung menyentuh fitrah ruhani mereka yang paling dalam. Ratusan warga yang semula keras hati datang bersimpuh di pelataran masjid, merasakan kesejukan batin yang luar biasa, lalu mengikrarkan dua kalimat syahadat dengan penuh kerinduan.',
      'Di puncak musim kemarau saat para musafir dan nelayan Tuban kehausan hebat karena seluruh sumur daratan berubah asin oleh rembesan air laut, seorang kakek tua datang mengadu dengan bibir pecah-pecah kepada Sunan Bonang.\n\nSang Wali tersenyum teduh, mengajak kakek itu berjalan ke tepi pantai, lalu menancapkan ujung tongkatnya tepat di atas pasir basah yang biasa terendam ombak laut asin<!--more-->\n\nSambil melantunkan shalawat Tibbil Qulub dan memohon kepada Allah Sang Pemilik Samudra, beliau mencabut tongkatnya. Seketika memancarlah mata air tawar yang jernih dan manis tepat di bibir pantai asin—Sumur Srumbung—yang hingga hari ini tak pernah kering menjadi saksi kasih sayang beliau.',
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
      'Malam itu angin barat menderu kencang menghantam pesisir Paciran, Lamongan, membuat perahu-perahu nelayan tertambat berhari-hari tanpa hasil tangkapan. Di tengah dingin yang menusuk tulang, seorang janda miskin mendaki bukit Dalem Duwur sambil mendekap anaknya yang menggigil kelaparan.\n\nSunan Drajat membukakan pintu pendoponya lebar-lebar, menyerahkan seluruh beras dan lauk yang semula disiapkan untuk santap malam keluarganya, lalu membisikkan wasiat rahasia pembuka keberkahan rezeki Catur Piwulang<!--more-->\n\nBeliau menatap mata janda itu dengan penuh empati dan berkata bahwa ketika hidup terasa paling sempit, jalan keluar tercepat di sisi Allah justru adalah dengan menolong sesama yang lebih lemah: memberi tongkat bagi yang buta, memberi makan yang lapar, memberi pakaian yang tak berpunya, dan memberi payung teduhan bagi yang kehujanan.\n\nBeliau kemudian mengajarkan amalan sedekah pagi walau hanya dengan seteguk air atau sepotong ubi disertai doa tawakal. Sejak malam itu, semangat gotong royong Catur Piwulang mengubah perbukitan kapur Drajat yang miskin menjadi pelabuhan niaga yang makmur tanpa seorang pun warganya dibiarkan tidur dalam keadaan lapar.',
    facilities: ['Museum Sunan Drajat', "Masjid Jami' Sunan Drajat", 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 22:00 WIB',
    karomah: [
      'Diselamatkan oleh ikan cucut dan ikan talang saat perahunya pecah dihantam badai laut di perairan Lamongan hingga mendarat selamat di Desa Jelag.',
      'Ketika para santri dan warga yang membangun pesantren di puncak perbukitan kapur Drajat kelelahan serta kehabisan air minum di bawah terik matahari, mereka mengadu dengan napas tersengal kepada Sunan Drajat.\n\nSang Wali menatap wajah para pencari ilmu itu dengan penuh iba, lalu melangkah ke sebatang pohon lengkeng hutan yang tumbuh di tanah berbatu dan memegang batangnya erat-erat<!--more-->\n\nBeliau memejamkan mata bermunajat memohon mata air kehidupan bagi para penuntut ilmu dan fakir miskin. Begitu pohon itu dicabut atas izin Allah, memancarlah mata air jernih yang tak pernah surut dari bekas akarnya—Sumur Lengsanga—yang hingga kini menjadi pelepas dahaga peziarah.',
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
      'Malam menjelang Hari Raya Idul Adha pada tahun-tahun awal berdirinya Masjid Al-Aqsha Menara Kudus terasa begitu mencekam. Di sudut-sudut kampung, para tetua masyarakat Hindu Kudus berbisik dengan wajah cemas karena khawatir esok pagi umat Islam yang semakin besar jumlahnya akan menyembelih sapi—hewan yang sangat mereka sucikan.\n\nDi keheningan sepertiga malam, Sayyid Ja\'far Shadiq (Sunan Kudus) mengumpulkan para santri dan tokoh muslim di hadapan batu mihrab dari Baitul Maqdis, lalu menyampaikan wasiat batin yang menggetarkan dada<!--more-->\n\nDengan suara tenang namun tegas, sang Waliyyul Ilmi berpesan bahwa memenangkan hati manusia dengan akhlak mulia dan menjaga perasaan tetangga jauh lebih dicintai Allah daripada memaksakan kehendak yang melukai batin sesama. Beliau mengajarkan bahwa kekuatan ilmu fikih yang sejati harus selalu melahirkan kasih sayang.\n\nKeesokan paginya, penduduk Kudus tertegun melihat seekor sapi ditambatkan dengan penuh penghormatan di halaman Menara Kudus, sementara Sunan Kudus mengumumkan bahwa umat Islam di Kudus hanya akan berkurban dengan kerbau. Tangis haru pecah di kalangan warga Hindu malam itu, dan ribuan keluarga memeluk Islam dengan hati yang luluh oleh keindahan adab sang Wali.',
    facilities: ['Masjid Al-Aqsha & Menara Kudus', 'Tempat Wudhu Pancuran 8', 'Terminal Wisata Bakalan Krapyak'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Meredakan wabah penyakit di tanah Baitul Maqdis melalui doa hingga diberi hadiah batu prasasti oleh Amir Palestina.',
      'Pada suatu malam yang sunyi, seorang adipati sakti yang angkuh datang bersama pengawalnya ke serambi Menara Kudus untuk menguji ilmu Sunan Kudus dan mengancam hendak membubarkan majelis pengajian para santri.\n\nSunan Kudus menyambutnya seorang diri dengan senyum tenang tanpa kemarahan sedikit pun, lalu membisikkan satu kalimat peringatan ruhani<!--more-->\n\nBeliau menunjuk ke arah delapan pancuran wudhu masjid dan mempersilakan sang tamu membasuh wajah serta hatinya dari kesombongan dunia. Begitu air wudhu menyentuh kening adipati itu, seluruh kesaktian yang ia banggakan luruh seketika dan dadanya dipenuhi ketenangan luar biasa hingga ia jatuh bersimpuh memohon bimbingan taubat.',
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
      'Malam itu obor-obor pasukan bersenjata tampak mengepung lereng Bukit Giri dari segala penjuru, membuat para santri dan keluarga di puncak Giri Kedaton dilanda kepanikan hebat. Namun di dalam bilik khalwatnya yang sederhana, Raden Paku (Sunan Giri) tetap duduk bersila dengan tenang menggoreskan pena kayu di atas lembaran kertas.\n\nKetika seorang santri senior masuk dengan napas terengah-engah dan tubuh gemetar mengabarkan bahwa barisan musuh telah mencapai tangga batu pertama, Sunan Giri mengangkat wajahnya yang teduh lalu membisikkan rahasia keteguhan hati di saat genting<!--more-->\n\nBeliau berpesan: "Jangan sekali-kali hatimu gentar kepada makhluk selama keningmu masih bersujud kepada Al-Qawiyyu, Yang Maha Kuat; karena bagi hamba yang bertawakal penuh, sehelai rumput pun dapat dijadikan Allah sebagai benteng yang tak tertembus." Beliau kemudian melafalkan doa perlindungan dan melemparkan pena kayunya ke halaman.\n\nAtas izin Allah SWT, pena kayu seorang ulama itu berubah menjadi Keris Kalamunyeng yang berkelebat di udara tanpa melukai nyawa, namun meruntuhkan seluruh nyali di dada ribuan prajurit lawan hingga mereka berbalik mundur menuruni bukit. Sejak malam itu, Bukit Giri menjadi mercusuar ilmu yang tak tergoyahkan.',
    facilities: ['Cungkup Ukiran Kayu Jati Kuno', 'Masjid Besar Ainul Yaqin Sunan Giri', 'Museum & Parkir Terpadu Giri'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Saat masih bayi dalam peti di tengah Selat Bali, peti Raden Paku memancarkan cahaya terang dan membuat kapal dagang Nyai Ageng Pinatih berhenti berputar-putar.',
      'Pada suatu malam yang dingin, seorang saudagar muda yang bangkrut total dan dikejar-kejar penagih utang mendaki tangga batu Giri Kedaton sambil menangis memohon doa kepada Sunan Giri.\n\nSang Wali mengambil segenggam pasir dari halaman pesantren, menyerahkannya kepada saudagar itu, lalu membisikkan wasiat adab berniaga dan sedekah pembuka pintu langit<!--more-->\n\nBeliau mewasiatkan agar sang saudagar memperbaiki shalat subuhnya, tidak pernah mengurangi takaran timbangan seberat biji sawi pun, dan menyisihkan hak anak yatim sebelum menghitung laba. Tak lama setelah mengamalkan wasiat itu, perniagaan saudagar tersebut bangkit secara ajaib hingga seluruh utangnya lunas dan ia menjadi penyokong kapal dakwah santri Giri ke Kepulauan Maluku.',
      'Ketika Raden Paku diperintahkan ayahandanya Syekh Maulana Ishaq untuk mencari lokasi pesantren yang akan memberkahi Nusantara, beliau berjalan menembus malam sambil menggenggam sekepal tanah dari Pasai.\n\nSetelah berhari-hari mendaki perbukitan dengan berpuasa dan berdzikir memohon petunjuk tempat terbaik bagi anak cucu umat, langkah beliau tiba-tiba terhenti di puncak Bukit Kebomas Gresik<!--more-->\n\nKetika dicocokkan, tanah di puncak bukit itu memiliki warna, keharuman, dan berat timbangan yang persis sama dengan tanah di dalam genggamannya. Di titik berkah itulah beliau membangun Giri Kedaton yang melahirkan ratusan ulama besar lintas pulau.',
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
      'Malam terakhir sebelum peresmian Masjid Agung Demak Bintoro menyisakan kecemasan yang mendalam di hati para tukang kayu dan bangsawan. Tiga tiang raksasa (Soko Guru) milik Sunan Ampel, Sunan Bonang, dan Sunan Gunung Jati telah berdiri megah, namun satu tiang bagian jatah Raden Mas Said (Sunan Kalijaga) belum juga tampak batang kayunya sementara waktu subuh tinggal beberapa jam lagi.\n\nDi tengah bisik-bisik keraguan orang banyak dan keheningan malam yang mencekam, Sunan Kalijaga duduk seorang diri di sudut pelataran sambil memunguti serpihan-serpihan kayu sisa tatal yang dibuang orang, mengikatnya erat, lalu menengadahkan tangan dalam munajat panjang yang menguras air mata<!--more-->\n\nDalam rintihan doanya, beliau memohon kepada Allah SWT agar berkenan menyatukan hati masyarakat Jawa yang masih terpecah-belah sebagaimana serpihan kayu kecil itu disatukan. Beliau kemudian membisikkan wasiat batin kepada murid terdekatnya: "Di hadapan Allah, serpihan amal kecil orang-orang lemah yang diikat dengan keikhlasan dan persatuan jauh lebih kokoh daripada kemegahan yang dibangun di atas kesombongan."\n\nSaat azan subuh pertama berkumandang membelah kabut Demak, seluruh jamaah terperanjat menyaksikan ikatan serpihan tatal itu telah menyatu sempurna menjadi batang tiang Soko Tatal yang berdiri paling kokoh menyangga atap Masjid Agung Demak hingga ratusan tahun kemudian.',
    facilities: ['Kompleks Makam Kadilangu', 'Masjid Sunan Kalijaga Kadilangu', 'Pendopo Notobratan'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Menyatukan serpihan kayu (tatal) menjadi tiang utama Soko Tatal di Masjid Agung Demak hanya dalam satu malam melalui munajat.',
      'Ketika Dewan Walisongo bermusyawarah hingga larut malam untuk menentukan presisi arah kiblat Masjid Agung Demak namun belum mencapai kata sepakat, suasana di dalam ruang utama masjid menjadi hening.\n\nSunan Kalijaga kemudian berdiri dengan penuh tawadhu di tengah ruangan, memejamkan mata dalam dzikir khusyuk, lalu merentangkan kedua tangannya<!--more-->\n\nAtas izin Allah SWT, hijab ruang tersingkap hingga telapak tangan kanan beliau menyentuh dinding Ka\'bah di Masjidil Haram dan tangan kiri beliau memegang tiang utama Masjid Agung Demak, meluruskan arah kiblat secara presisi dalam satu tarikan napas yang disaksikan langsung oleh para Wali.',
      'Di masa muda ketika Raden Sahid masih berjuang membersihkan sisa kekerasan dan masa lalunya, gurunya Sunan Bonang menancapkan sebatang tongkat di tepi sungai dan memintanya menjaga tongkat itu tanpa beranjak sedikit pun.\n\nBulan demi bulan hingga bertahun-tahun berlalu dalam terik matahari dan dinginnya badai malam sampai tubuh Raden Sahid ditumbuhi lumut dan dirambati akar pepohonan<!--more-->\n\nNamun di balik tubuh yang tak bergerak itu, qalbu beliau justru terbang melintasi derajat dzikir sirri yang paling jernih. Dari riyadhoh kesabaran luar biasa di tepi sungai itulah beliau diangkat menjadi Kanjeng Sunan Kalijaga, sang penuntun lembut bagi siapa saja yang pernah jatuh dalam dosa dan rindu kembali kepada Tuhan.',
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
      'Kabut malam turun menyelimuti lereng Gunung Muria yang dingin dan sunyi di ketinggian Desa Colo. Sepasang suami istri petani yang telah dua belas tahun menikah namun belum dikaruniai keturunan—hingga nyaris bercerai karena cemoohan lingkungan—mendaki ratusan anak tangga batu sambil berpegangan tangan dan menangis dalam gelap.\n\nSesampainya di serambi masjid puncak, Raden Umar Said (Sunan Muria) menyambut mereka dengan lentera hangat, menyodorkan secangkir air jernih dari Gentong Keramat, lalu membisikkan wasiat ketenangan batin<!--more-->\n\nSebagaimana filosofi tembang Sinom dan Kinanthi yang beliau gubah, Sunan Muria berpesan: "Setiap ujian hidup yang membuat langkah kaki kalian terasa berat dan mendaki, sesungguhnya sedang dipilih Allah untuk mengangkat derajat kalian lebih dekat ke pintu langit."\n\nBeliau kemudian menuntun pasangan itu melafalkan munajat Nabi Zakariya (Rabbi laa tadzarnii fardan wa Anta khairul waaritsiin) di sepertiga malam dengan hati yang ridha dan membekali mereka buah parijoto gunung. Setahun kemudian, pasangan itu kembali mendaki Bukit Muria sambil menggendong bayi mungil mereka yang sehat dan kelak tumbuh menjadi penghafal Al-Qur\'an.',
    facilities: ['Masjid Sunan Muria', '700+ Anak Tangga & Pangkalan Ojek Gunung', 'Sumber Air Gentong Keramat'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Memancarkan mata air jernih di puncak Gunung Muria yang tidak pernah kering meski musim kemarau panjang.',
      'Pada suatu malam gelap ketika sekelompok perambah berniat menebang pohon-pohon besar penyangga mata air di lereng Gunung Muria demi keuntungan sesaat, mereka naik membawa kapak tajam.\n\nBaru saja kapak pertama hendak diayunkan, tiba-tiba kabut beraroma kasturi turun menyelimuti hutan dan terdengar alunan tembang dzikir Sunan Muria yang menggema lembut dari balik pepohonan<!--more-->\n\nSuara teduh itu mengingatkan mereka bahwa setiap helai daun dan akar pohon di gunung adalah tasbih makhluk Allah yang menjaga sumber air bagi ribuan bayi dan petani di lembah bawah. Seketika kapak di tangan mereka terlepas, hati mereka luruh dalam tangis taubat, dan mereka berbalik menjadi penjaga hutan Muria seumur hidup.',
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
      'Malam itu suasana di Keraton Pakungwati dan Masjid Agung Sang Cipta Rasa Cirebon terasa begitu haru dan hening. Para pangeran, adipati, dan panglima perang berkumpul mengelilingi pembaringan Syarif Hidayatullah (Sunan Gunung Jati) yang telah berusia lebih dari satu abad, menantikan wasiat terakhir tentang pembagian wilayah kekuasaan, benteng pertahanan, atau harta benda kerajaan.\n\nNamun sang Sultan sekaligus Wali Qutub itu justru membuka matanya yang basah oleh air mata, memandang satu per satu wajah murid dan keluarganya, lalu mengucapkan satu kalimat pendek yang menggetarkan langit Cirebon<!--more-->\n\nDengan suara bergetar yang menembus relung jiwa, beliau berwasiat: "Ingsun titip tajug lan fakir miskin" (Aku titipkan langgar/masjid dan orang-orang fakir miskin). Tidak ada satu kata pun tentang emas, singgasana, atau kejayaan duniawi.\n\nBeliau kemudian menggenggam tangan para muridnya dan menjelaskan rahasia di balik wasiat itu: selama tempat-tempat sujud masih hidup oleh dzikir dan perut orang-orang fakir miskin tidak dibiarkan lapar, maka Allah sendiri yang akan menjaga negeri dan melapangkan rezeki setiap keluarga di dalamnya. Wasiat agung itulah yang hingga hari ini terpatri abadi di hati masyarakat Cirebon dan Tanah Pasundan.',
    facilities: ['Kompleks Astana Gunung Sembung (9 Pintu)', 'Masjid Dog Jumeneng', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    karomah: [
      'Mengubah gumpalan tanah menjadi emas saat diuji keilmuan dan kewaliannya, lalu mengembalikannya menjadi tanah karena kezuhudan beliau.',
      'Pada suatu malam yang dingin, seorang penderita penyakit kusta parah yang diusir dari kampungnya merangkak mendekati pagar luar Masjid Agung Sang Cipta Rasa sambil menangis tertahan karena malu bergabung dengan jamaah.\n\nMengetahui hal itu lewat mata batinnya, Sunan Gunung Jati keluar seorang diri dari mihrab sambil membawa kendi air wudhu, lalu duduk memeluk tubuh penderita itu tanpa rasa jijik sedikit pun<!--more-->\n\nBeliau membasuh luka-luka orang itu dengan tangannya sendiri seraya melantunkan doa syifa dan shalawat Nabi penuh cinta kasih. Atas izin Allah SWT, penyakit menahun itu sembuh bersih dan sang pria menjadi salah satu muadzin paling merdu di Cirebon.',
      'Ketika Syarif Hidayatullah mengembara ke daratan Tiongkok, Kaisar Hong Gie hendak menguji kebenaran ilmu sang ulama dengan memerintahkan putrinya, Ong Tin Nio, mengikat bokor kuningan di balik pakaiannya agar tampak seperti wanita hamil.\n\nDi hadapan ratusan pembesar istana yang menahan tawa untuk mempermalukan beliau, Kaisar bertanya berapa usia kandungan putrinya; Sunan Gunung Jati menatap tenang sambil berdoa dalam hati<!--more-->\n\nBeliau menjawab dengan penuh wibawa bahwa sang putri benar-benar sedang mengandung. Begitu tirai pemeriksaan dibuka, bokor kuningan itu lenyap dan Putri Ong Tin sungguh-sungguh hamil atas kuasa Allah SWT, hingga sang Kaisar takjub dan Putri Ong Tin memeluk Islam lalu berlayar menyusul beliau ke Cirebon.',
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
      'Pada malam-malam genting di bulan suci Ramadhan tahun 1945, suasana Kota Jakarta diselimuti ketegangan luar biasa di bawah bayang-bayang senjata tentara pendudukan. Di tengah kebimbangan menentukan langkah besar bagi nasib jutaan rakyat, Bung Karno datang diam-diam ke serambi kediaman Al-Habib Ali bin Abdurrahman Al-Habsyi di Kwitang.\n\nHabib Ali Kwitang menyambut beliau dengan pelukan hangat, menggenggam erat tangan Bung Karno dengan mata berkaca-kaca, lalu menengadah ke langit dalam munajat panjang sebelum membisikkan wasiat keberanian dan rahasia keberkahan hari Jumat<!--more-->\n\nSang Habib berpesan dengan suara bergetar penuh keyakinan bahwa proklamasi kemerdekaan yang dikumandangkan pada hari Jumat Sayyidul Ayyam di bulan Ramadhan akan dinaungi langsung oleh rahmat Allah SWT dan doa para Auliya Nusantara. Beliau menepuk dada Bung Karno agar melangkah maju tanpa rasa takut sedikit pun.\n\nSebelum berpisah, Habib Ali Kwitang menitipkan satu wasiat batin bagi seluruh anak bangsa: "Sesulit apa pun ujian hidup atau beban negeri ini kelak, jangan pernah tinggalkan majelis shalawat kepada Rasulullah SAW dan jangan putus mencintai ulama; karena dengan mahabbah kepada Nabi itulah hati yang remuk akan selalu dikuatkan kembali."',
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", 'Gedung Majelis Taklim ICI', 'Kubah Makam Habib Ali Kwitang'],
    openingHours: '07:00 - 21:00 WIB',
    karomah: [
      'Kewibawaan dan pancaran mahabbah beliau membuat ratusan orang masuk Islam dan bertaubat hanya dengan memandang wajahnya saat berdoa.',
      'Pada suatu Minggu subuh yang dingin di Kwitang, seorang ayah yang nyaris gelap mata karena terlilit utang dan diusir dari kontrakan duduk menangis tertunduk di balik tiang paling belakang majelis.\n\nDi tengah ribuan jamaah yang memadati jalanan, tiba-tiba Habib Ali Kwitang berdiri dari kursinya, berjalan membelah lautan manusia langsung menuju tiang tersebut, lalu menepuk bahu pria itu sambil tersenyum teduh<!--more-->\n\nTanpa sepatah kata pun yang mempermalukan, Habib Ali menyelipkan sebuah amplop ke genggaman pria itu yang ternyata jumlah isinya persis sama dengan nilai utang yang sedang mencekiknya, padahal ia belum pernah bercerita kepada siapa pun. Habib Ali hanya berbisik lembut: "Jangan pernah berputus asa dari rahmat Allah selama kakimu masih mau melangkah ke majelis kekasih-Nya, Nabi Muhammad SAW."',
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
