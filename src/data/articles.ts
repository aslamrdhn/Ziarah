export type ZiarahArticleCategory =
  | 'Rute Ziarah'
  | 'Tata Cara & Fikih'
  | 'Musiman & Haul'
  | 'Hajat & Keteladanan';

export interface ZiarahArticleSection {
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface ZiarahArticleCtaTarget {
  label: string;
  to: string;
  description: string;
}

export interface ZiarahArticle {
  slug: string;
  title: string;
  metaDescription: string;
  category: ZiarahArticleCategory;
  publishedAt: string;
  readTimeMinutes: number;
  excerpt: string;
  sections: ZiarahArticleSection[];
  relatedSiteSlugs: string[];
  ctaTarget: ZiarahArticleCtaTarget;
  references: string[];
}

export const ARTICLE_CATEGORIES: readonly ('Semua' | ZiarahArticleCategory)[] = [
  'Semua',
  'Rute Ziarah',
  'Tata Cara & Fikih',
  'Musiman & Haul',
  'Hajat & Keteladanan',
] as const;

export const ZIARAH_ARTICLES: ZiarahArticle[] = [
  {
    slug: 'rute-ziarah-wali-songo-dari-jakarta-3-hari-2-malam',
    title: 'Rute Ziarah Wali Songo dari Jakarta 3 Hari 2 Malam: Urutan Jalur Paling Efisien',
    metaDescription:
      'Panduan rute ziarah Wali Songo 3 hari 2 malam dari Jakarta: urutan Cirebon hingga Surabaya, estimasi waktu tempuh, titik istirahat bus, dan peta GPS lengkap.',
    category: 'Rute Ziarah',
    publishedAt: '2026-11-20',
    readTimeMinutes: 8,
    excerpt:
      'Perencanaan jadwal dan urutan koridor Pantura–Trans Jawa yang paling hemat tenaga untuk rombongan bus maupun kendaraan keluarga dari Jakarta menuju sembilan maqbarah Wali Songo di Jawa Barat, Jawa Tengah, dan Jawa Timur.',
    sections: [
      {
        heading: 'Prinsip Menyusun Rute Ziarah Wali Songo dari Barat ke Timur',
        paragraphs: [
          'Perjalanan ziarah ke sembilan makam Wali Songo membentang sekitar 570 hingga 650 kilometer dari Cirebon di Jawa Barat hingga Surabaya di ujung timur jalur Pantura (tergantung jalur singgah tiap makam). Tanpa urutan koridor yang rapi, rombongan sering kehabisan waktu di jalan akibat bolak-balik melintasi kabupaten yang berdekatan seperti Demak, Kudus, Tuban, Lamongan, dan Gresik.',
          'Kunci utama efisiensi perjalanan 3 hari 2 malam (3H2M) dari Jakarta atau Jabodetabek adalah menggunakan pola sapuan searah dari barat ke timur melalui Tol Trans-Jawa pada keberangkatan, lalu memanfaatkan jalur tol penuh saat kepulangan dari Surabaya menuju Jakarta.',
        ],
        bulletPoints: [
          'Keberangkatan ideal dimulai Kamis malam atau Jumat selepas Isya (pukul 20.00–21.00 WIB) dari Jakarta agar tiba di Cirebon menjelang tengah malam atau waktu Subuh.',
          'Gunakan pakaian katun yang menyerap keringat, sandal yang mudah dilepas-pasang di area maqbarah, serta siapkan kantong sandal pribadi di dalam tas kecil.',
          'Bagi koordinator rombongan bus, pastikan pengemudi utama dan pengemudi cadangan bergantian setiap 4 jam demi keselamatan seluruh jamaah.',
        ],
      },
      {
        heading: 'Hari Pertama: Cirebon, Demak, Kudus, dan Lereng Gunung Muria',
        paragraphs: [
          'Etape pertama dimulai di Kompleks Astana Gunung Sembung, Cirebon, untuk berziarah ke Makam Sunan Gunung Jati (Syarif Hidayatullah). Mengingat area serambi Pasarean Agung memiliki tata tertib warisan kesultanan, peziarah umum berdoa dengan khusyuk dari serambi luar pintu sembilan sebelum melanjutkan perjalanan via Tol Kanci–Pejagan–Semarang.',
          'Menjelang waktu Zuhur atau Jumat siang, rombongan tiba di Kabupaten Demak untuk berziarah ke Makam Sunan Kalijaga di Kadilangu serta menyempatkan shalat berjamaah di Masjid Agung Demak yang juga menjadi lokasi maqbarah Sultan Raden Patah. Dari Demak, perjalanan bergeser 45 menit ke arah timur menuju Kota Kudus.',
          'Di Kudus, ziarah diawali di Makam Sunan Kudus (Syekh Ja\'far Shadiq) yang berada tepat di belakang Masjid Al-Aqsha Menara Kudus. Sore hingga petang dilanjutkan naik ke Desa Colo di lereng Gunung Muria untuk berziarah ke Makam Sunan Muria (Raden Umar Said). Dari terminal parkir Colo, jamaah dapat menggunakan jasa ojek lokal yang terorganisasi rapi atau berjalan kaki menapaki anak tangga sambil menjaga ketenangan napas.',
        ],
        bulletPoints: [
          'Titik 1 (04.00–06.00 WIB): Makam Sunan Gunung Jati, Gunung Sembung, Cirebon.',
          'Titik 2 (11.30–13.30 WIB): Makam Sunan Kalijaga, Kadilangu, Demak.',
          'Titik 3 (14.30–16.00 WIB): Makam Sunan Kudus, Kauman, Kudus.',
          'Titik 4 (16.45–19.30 WIB): Makam Sunan Muria, Colo, Dawe, Kudus (bermalam di Kudus/Rembang atau lanjut perjalanan malam ke Tuban).',
        ],
      },
      {
        heading: 'Hari Kedua: Pesisir Tuban, Paciran Lamongan, dan Kota Santri Gresik',
        paragraphs: [
          'Memasuki hari kedua, rombongan menyusuri jalur Pantura timur melewati Rembang dan Lasem menuju Kabupaten Tuban. Sasaran pertama pada pagi hari adalah Makam Sunan Bonang (Raden Makhdum Ibrahim) yang terletak di sebelah barat Alun-Alun Tuban dan Masjid Agung Tuban. Area parkir bus berada di kawasan Pantai Boom Tuban yang dihubungkan dengan becak wisata maupun jalur pejalan kaki.',
          'Dari Tuban, perjalanan berlanjut sekitar 1 jam ke arah timur menyusuri pesisir utara Lamongan menuju Makam Sunan Drajat (Raden Qasim) di Desa Drajat, Kecamatan Paciran. Kompleks maqbarah Sunan Drajat berada di perbukitan teduh lengkap dengan Museum Sunan Drajat yang menyimpan artefak gamelan Singo Mengkok serta naskah Catur Piwulang.',
          'Siang menjelang sore, rombongan memasuki Kabupaten Gresik untuk menziarahi dua maqbarah Wali Songo sekaligus: Makam Sunan Giri (Raden Paku) di perbukitan Kebomas, kemudian turun ke pusat kota dekat alun-alun untuk berziarah ke Makam Syekh Maulana Malik Ibrahim (Sunan Gresik) di Desa Gapurosukolilo.',
        ],
        bulletPoints: [
          'Titik 5 (07.30–09.30 WIB): Makam Sunan Bonang, Kutorejo, Tuban.',
          'Titik 6 (11.00–13.00 WIB): Makam Sunan Drajat, Paciran, Lamongan.',
          'Titik 7 (14.30–16.30 WIB): Makam Sunan Giri, Kebomas, Gresik.',
          'Titik 8 (17.00–19.00 WIB): Makam Syekh Maulana Malik Ibrahim (Sunan Gresik), Gapurosukolilo, Gresik.',
        ],
      },
      {
        heading: 'Hari Ketiga: Penutup di Kawasan Ampel Surabaya dan Perjalanan Pulang',
        paragraphs: [
          'Puncak rangkaian ziarah Wali Songo ditutup di Kompleks Masjid Agung Sunan Ampel, Surabaya, untuk berziarah ke Makam Sunan Ampel (Raden Rahmat) beserta maqbarah Mbah Bolong dan Mbah Sholeh. Waktu terbaik mengunjungi kawasan Ampel adalah malam hari selepas Isya pada hari kedua atau pagi hari pada hari ketiga setelah Subuh, ketika udara serambi masjid sangat sejuk dan arus peziarah mengalir tertib.',
          'Seusai merampungkan bacaan Surah Yasin, tahlil, dan doa arwah di maqbarah Sunan Ampel, jamaah dapat beristirahat sejenak menikmati kuliner khas Arab-Melayu di sepanjang lorong Pasar Ampel sebelum bus masuk ke Gerbang Tol Dupak atau Warugunung untuk perjalanan pulang langsung ke Jakarta via Tol Trans-Jawa (estimasi 9–10 jam perjalanan lancar).',
        ],
        bulletPoints: [
          'Titik 9 (20.30–22.30 WIB Hari ke-2 atau 05.00–07.30 WIB Hari ke-3): Makam Sunan Ampel, Semampir, Surabaya.',
          'Kepulangan (08.00–18.00 WIB Hari ke-3): Surabaya → Tol Solo–Ngawi → Tol Semarang–Batang → Tol Cipali → Jakarta dengan istirahat setiap 3–4 jam di Rest Area KM 575, KM 429, dan KM 207.',
        ],
      },
      {
        heading: 'Adab Rombongan dan Persiapan Bacaan Selama di Perjalanan',
        paragraphs: [
          'Agar perjalanan tiga hari tidak sekadar menjadi wisata fisik, pemimpin rombongan dianjurkan membacakan ringkasan riwayat dakwah setiap tokoh sekitar 15 menit sebelum bus tiba di lokasi maqbarah. Dengan memahami keteladanan Sunan Gunung Jati yang memuliakan fakir miskin, kearifan budaya Sunan Kalijaga, hingga kepedulian sosial Sunan Drajat, hati setiap peziarah akan lebih hadir saat melantunkan doa.',
          'Seluruh teks bacaan salam ahli kubur, Qasidah Salamullah Ya Sadah, susunan tawassul, Surah Yasin, serta tahlil lengkap telah tersedia secara digital di portal ini sehingga jamaah tidak perlu khawatir tertinggal buku saku di dalam bus.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'sunan-gunung-jati-cirebon',
      'makam-sunan-kalijaga-demak',
      'makam-sunan-kudus',
      'sunan-muria-kudus',
      'sunan-bonang-tuban',
      'sunan-drajat-lamongan',
      'sunan-giri-gresik',
      'sunan-gresik',
      'sunan-ampel-surabaya',
    ],
    ctaTarget: {
      label: 'Buka Peta Rute Interaktif 183 Makam Wali',
      to: '/peta',
      description:
        'Lihat titik koordinat GPS kesembilan makam Wali Songo di atas peta geospasial dan rencanakan urutan pemberhentian rombongan Anda.',
    },
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo: Buku Pertama yang Mengungkap Wali Songo Sebagai Fakta Sejarah. Depok: Pustaka IIMaN.',
      'De Graaf, H.J. & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa: Peralihan dari Majapahit ke Mataram. Jakarta: Grafiti Pers.',
    ],
  },
  {
    slug: 'rute-ziarah-wali-habaib-jakarta-1-hari',
    title: 'Rute Ziarah Makam Wali dan Habaib di Jakarta 1 Hari: Urutan Bebas Macet dari Utara ke Selatan',
    metaDescription:
      'Panduan rute ziarah makam Wali dan Habaib di DKI Jakarta dalam 1 hari: urutan Luar Batang, Mbah Priok, Kwitang, Kalibata, hingga Jatinegara bebas macet.',
    category: 'Rute Ziarah',
    publishedAt: '2026-11-20',
    readTimeMinutes: 7,
    excerpt:
      'Strategi menyusuri tujuh maqbarah ulama dan habaib bersejarah di DKI Jakarta dalam satu hari penuh dengan mengikuti pola arus lalu lintas dari pesisir Jakarta Utara menuju Jakarta Pusat, Jakarta Timur, dan Jakarta Selatan.',
    sections: [
      {
        heading: 'Mengapa Urutan Rute Ziarah di Jakarta Harus Dimulai dari Pesisir Utara?',
        paragraphs: [
          'DKI Jakarta menyimpan jaringan maqbarah ulama dan habaib abad ke-17 hingga ke-20 yang menjadi poros keilmuan Betawi dan Nusantara. Tantangan terbesar berziarah di ibu kota bukanlah jarak antar-makam yang sebenarnya hanya berkisar 8–15 kilometer, melainkan kepadatan lalu lintas jam kerja serta keterbatasan kantong parkir di kawasan pemukiman padat.',
          'Dengan memulai perjalanan pagi hari dari pesisir Jakarta Utara (Luar Batang dan Tanjung Priok) sebelum aktivitas pelabuhan memuncak, kemudian bergerak ke selatan menuju Kwitang, Jatinegara Kaum, Cipinang Muara, hingga Kalibata, Anda dapat menuntaskan 6–7 titik maqbarah dalam satu hari dengan tenang.',
        ],
      },
      {
        heading: 'Sesi Pagi (06.30–11.30 WIB): Masjid Luar Batang dan Maqbarah Mbah Priok',
        paragraphs: [
          'Titik keberangkatan pertama pada pagi hari adalah Masjid Jami Keramat Luar Batang di Penjaringan, Jakarta Utara, tempat bersemayamnya Al-Habib Husein bin Abubakar Alaydrus (wafat 1756 M). Ulama muda asal Hadramaut ini dikenal luas karena ketulusan dakwahnya merangkul masyarakat pesisir Sunda Kelapa pada masa kolonial VOC.',
          'Dari Luar Batang, perjalanan dilanjutkan ke arah timur melalui Tol Pelabuhan menuju Koja, Tanjung Priok, untuk berziarah ke Makam Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok, wafat 1756 M). Kawasan Gubah Al-Haddad di tepi pelabuhan ini memiliki pelataran yang sangat lapang, teduh, dan tertata rapi bagi peziarah keluarga maupun rombongan.',
        ],
        bulletPoints: [
          '06.30–08.15 WIB: Makam Habib Husein bin Abubakar Alaydrus, Masjid Luar Batang, Penjaringan, Jakarta Utara.',
          '09.00–10.45 WIB: Makam Habib Hasan bin Muhammad Al-Haddad (Mbah Priok), Koja, Tanjung Priok, Jakarta Utara.',
        ],
      },
      {
        heading: 'Sesi Siang (11.45–15.30 WIB): Kwitang, Jatinegara Kaum, dan Petamburan/Jatinegara',
        paragraphs: [
          'Menjelang waktu Zuhur, arahkan kendaraan ke kawasan Senen, Jakarta Pusat, menuju Masjid Jami Al-Riyadh Kwitang untuk melaksanakan shalat Zuhur berjamaah dan berziarah ke Makam Al-Habib Ali bin Abdurrahman Al-Habsyi (Habib Ali Kwitang, wafat 1968 M). Beliau adalah pelopor majelis taklim Ahad pagi tertua di Jakarta yang menyatukan para ulama Betawi dan habaib.',
          'Seusai Zuhur dan makan siang di sekitar Kwitang atau Salemba, perjalanan bergeser 20 menit ke arah timur menuju Kompleks Masjid Assalafiyah Jatinegara Kaum, Pulogadung, untuk menziarahi Makam Pangeran Jayakarta (Raden Sungkawa), panglima dan ulama pelindung masyarakat Jayakarta pada awal abad ke-17.',
          'Masih di koridor Jakarta Timur, Anda dapat melanjutkan ziarah ke Makam Al-Habib Utsman bin Yahya (Mufti Betawi pengarang lebih dari seratus kitab fikih dan akidah Melayu-Pegon) di kawasan Pondok Bambu/Jatinegara, serta Makam Guru Marzuki bin Mirshod di Cipinang Muara yang merupakan mahaguru para kiai besar Betawi.',
        ],
        bulletPoints: [
          '11.45–13.15 WIB: Shalat Zuhur & ziarah Makam Habib Ali bin Abdurrahman Al-Habsyi, Kwitang, Jakarta Pusat.',
          '13.45–14.45 WIB: Makam Pangeran Jayakarta, Jatinegara Kaum, Jakarta Timur.',
          '15.00–16.30 WIB: Makam Mufti Betawi Habib Utsman bin Yahya & Makam Guru Marzuki Cipinang Muara, Jakarta Timur.',
        ],
      },
      {
        heading: 'Sesi Sore–Maghrib (17.00–19.30 WIB): Penutup di Maqbarah Habib Kuncung Kalibata',
        paragraphs: [
          'Rangkaian ziarah 1 hari di Jakarta ditutup dengan suasana syahdu menjelang Maghrib di Masjid Jami At-Taubah, Rawajati, Kalibata, Jakarta Selatan. Di kompleks ini bersemayam Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung, wafat 1926 M), waliyullah yang semasa hidupnya dikenal sangat tawadhu, gemar menyantuni anak yatim, dan mencintai kaum dhuafa.',
          'Lokasinya yang strategis dekat Stasiun Duren Kalibata dan akses Tol Dalam Kota memudahkan peziarah untuk kembali ke rumah masing-masing selepas shalat Maghrib atau Isya berjamaah.',
        ],
        bulletPoints: [
          '17.00–19.00 WIB: Makam Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung), Rawajati, Kalibata, Jakarta Selatan.',
          'Tips transportasi umum: Rute Kwitang dan Kalibata sangat ramah pengguna KRL Commuter Line (Stasiun Kramat/Senen untuk Kwitang dan Stasiun Duren Kalibata untuk Makam Habib Kuncung).',
        ],
      },
    ],
    relatedSiteSlugs: [
      'habib-husein-bin-abubakar-alaydrus-jakarta-utara',
      'habib-hasan-bin-muhammad-al-haddad-jakarta-utara',
      'habib-ali-bin-abdurrahman-al-habsyi-jakarta-pusat',
      'pangeran-jayakarta-jakarta-timur',
      'habib-utsman-bin-yahya-jakarta-timur',
      'guru-marzuki-cipinang-muara-jakarta-timur',
      'habib-ahmad-bin-alwi-al-haddad-jakarta-selatan',
    ],
    ctaTarget: {
      label: 'Lihat Titik Koordinat Makam Wali DKI Jakarta di Peta',
      to: '/peta',
      description:
        'Buka peta interaktif untuk memantau lokasi presisi dan navigasi jalan raya menuju seluruh maqbarah ulama serta habaib di DKI Jakarta.',
    },
    references: [
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII & XVIII. Jakarta: Kencana.',
      'Alatas, Ismail Fajrie (2021). What Is Religious Authority? Cultivating Islamic Communities in Indonesia. Princeton: Princeton University Press.',
    ],
  },
  {
    slug: 'jalur-ziarah-ulama-jawa-timur-dan-madura',
    title: 'Jalur Ziarah Ulama Pesantren Jawa Timur dan Madura: Menyambung Sanad Keilmuan Nusantara',
    metaDescription:
      'Panduan jalur ziarah pesantren dan ulama Jawa Timur hingga Madura: rute Syaichona Kholil Bangkalan, Sunan Ampel, Tebuireng Jombang, Pasuruan, dan Lirboyo.',
    category: 'Rute Ziarah',
    publishedAt: '2026-11-20',
    readTimeMinutes: 8,
    excerpt:
      'Panduan menyusuri poros sanad pesantren terbesar di Indonesia: menyeberangi Jembatan Suramadu menuju Syaichona Kholil Bangkalan, lalu menyambung ke Sunan Ampel Surabaya, empat maqbarah pendiri NU di Jombang, Lirboyo Kediri, hingga Mbah Hamid Pasuruan.',
    sections: [
      {
        heading: 'Poros Sanad Keilmuan Pesantren Jawa Timur dan Pulau Madura',
        paragraphs: [
          'Jawa Timur dan Pulau Madura merupakan jantung jaringan pesantren salafiyah di Nusantara. Hampir seluruh kiai pendiri pesantren besar di Pulau Jawa pada abad ke-19 dan ke-20 menimba ilmu serta mengambil tabarruk keilmuan kepada Syaichona Muhammad Kholil di Bangkalan, Madura, sebelum mendirikan pesantren di daerah masing-masing.',
          'Menempuh jalur ziarah ulama Jawa Timur dan Madura adalah ikhtiar batin untuk mengenang ketekunan belajar, keikhlasan mengajar, serta perjuangan kebangsaan para masyayikh yang merumuskan Resolusi Jihad demi mempertahankan kemerdekaan Indonesia.',
        ],
      },
      {
        heading: 'Etape 1: Menyeberang ke Bangkalan Madura dan Kembali ke Ampel Surabaya',
        paragraphs: [
          'Perjalanan dimulai dari Surabaya menuju Pulau Madura melintasi Jembatan Suramadu (sekitar 45–60 menit perjalanan) ke Masjid Agung Syaichona Kholil di Martajasah, Kabupaten Bangkalan. Di sinilah bersemayam Syaichona Muhammad Kholil bin Abdul Lathif (wafat 1925 M), mahaguru para ulama Nusantara yang menguasai ilmu fikih, nahwu-sharaf Al-Alfiyah, dan tasawuf.',
          'Jika waktu memadai di Pulau Madura, peziarah juga dapat mengunjungi Makam Sunan Cendana di Kwanyar Bangkalan atau merencanakan perjalanan tersendiri ke Bujuk Batu Ampar di Pamekasan dan Asta Tinggi di Sumenep. Setelah dari Martajasah Bangkalan, rombongan kembali menyeberang ke Surabaya untuk berziarah ke Makam Sunan Ampel (Raden Rahmat) di Kecamatan Semampir.',
        ],
        bulletPoints: [
          'Martajasah, Bangkalan: Makam Syaichona Muhammad Kholil Bangkalan (mahaguru para muassis pesantren).',
          'Kwanyar, Bangkalan: Makam Sunan Cendana (Syaikh Zainal Abidin, cucu Sunan Giri).',
          'Semampir, Surabaya: Makam Sunan Ampel (sesepuh Wali Songo dan pendiri Pesantren Ampel Denta).',
        ],
      },
      {
        heading: 'Etape 2: Empat Poros Pesantren Jombang (Tebuireng, Tambakberas, Denanyar, Rejoso)',
        paragraphs: [
          'Dari Surabaya, perjalanan dilanjutkan sekitar 1,5 jam melalui Tol Surabaya–Mojokerto menuju Kabupaten Jombang yang dijuluki Kota Santri. Di Jombang terdapat empat kompleks maqbarah pesantren bersejarah yang jaraknya saling berdekatan dan dapat diziarahi dalam satu rangkaian waktu setengah hari.',
          'Titik utama adalah Kompleks Pemakaman Pondok Pesantren Tebuireng, tempat bersemayamnya Hadratussyaikh KH. Hasyim Asy\'ari (Pendiri Nahdlatul Ulama dan Pahlawan Nasional), KH. Abdul Wahid Hasyim, serta Presiden ke-4 RI KH. Abdurrahman Wahid (Gus Dur). Setelah itu, ziarah dilanjutkan ke Makam KH. Abdul Wahab Chasbullah di Tambakberas, Makam KH. Bisri Syansuri di Denanyar, dan Maqbarah KH. Romly Tamim (penyusun Wirid Istighotsah) di Pesantren Darul Ulum Rejoso, Peterongan.',
        ],
        bulletPoints: [
          'PP Tebuireng, Jombang: Maqbarah Hadratussyaikh KH. Hasyim Asy\'ari & KH. Abdurrahman Wahid (Gus Dur).',
          'PP Bahrul Ulum Tambakberas, Jombang: Maqbarah KH. Abdul Wahab Chasbullah (penggerak utama pendirian NU & pencipta Syubbanul Wathan).',
          'PP Mamba\'ul Ma\'arif Denanyar, Jombang: Maqbarah KH. Bisri Syansuri (ahli fikih & pelopor pesantren putri).',
          'PP Darul Ulum Rejoso, Jombang: Maqbarah KH. Romly Tamim (Mursyid Thariqah Qadiriyah wa Naqsyabandiyah).',
        ],
      },
      {
        heading: 'Etape 3: Bumi Panjalu Kediri (Lirboyo, Ploso, Jampes) hingga Pasuruan',
        paragraphs: [
          'Dari Jombang, rute bergerak ke selatan sekitar 1 jam menuju Kota dan Kabupaten Kediri. Di bagian barat Sungai Brantas, peziarah dapat mengunjungi Maqbarah Masyayikh Pondok Pesantren Lirboyo (KH. Abdul Karim, KH. Marzuqi Dahlan, dan KH. Mahrus Aly), dilanjutkan ke Makam Syekh Ihsan Muhammad Dahlan Al-Jampesi (pengarang kitab tasawuf Sirajuth Thalibin yang dikaji di Universitas Al-Azhar Kairo) di Gampengrejo, serta Makam KH. Hamim Tohari Djazuli (Gus Miek) di Mojo, Ploso.',
          'Sebagai penutup jalur timur, rombongan dapat bergerak menuju Kota Pasuruan untuk berziarah ke Makam KH. Abdul Hamid (Mbah Hamid Pasuruan, wafat 1982 M) yang terletak di kompleks Masjid Agung Al-Anwar tepat di pusat kota Pasuruan, serta Makam KH. Muhammad Syarwani Abdan (Guru Bangil) di Bangil, Kabupaten Pasuruan.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'makam-syaichona-muhammad-kholil-bangkalan',
      'sunan-ampel-surabaya',
      'rais-akbar-pendiri-nahdlatul-ulama-pahlawan-nasional-pencetus-resolusi-jihad-22-oktober-1945-jombang',
      'makam-kh-abdurrahman-wahid-jombang',
      'makam-kh-abdul-wahab-chasbullah-jombang',
      'makam-kh-bisri-syansuri-jombang',
      'makam-kh-romly-tamim-masyayikh-darul-ulum-jombang',
      'makam-kh-abdul-karim-kh-marzuqi-dahlan-kh-mahrus-aly-kediri',
      'wali-agung-penyejuk-umat-pengasuh-pondok-pesantren-salafiyah-pasuruan',
    ],
    ctaTarget: {
      label: 'Buka Kumpulan Wirid & Doa Khusus Para Masyayikh',
      to: '/doa',
      description:
        'Amalkan bacaan tawassul, hizib, dan doa warisan para ulama pesantren Jawa Timur serta Madura lengkap dengan teks Arab, Latin, dan artinya.',
    },
    references: [
      'Dhofier, Zamakhsyari (2011). Tradisi Pesantren: Studi Pandangan Hidup Kyai dan Visinya Mengenai Masa Depan Indonesia. Jakarta: LP3ES.',
      'Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat: Tradisi-Tradisi Islam di Indonesia. Bandung: Mizan.',
      'Rifai, Muhammad (2009). KH. Hasyim Asy\'ari: Biografi Singkat 1871–1947. Yogyakarta: Garasi.',
    ],
  },
  {
    slug: 'urutan-doa-ziarah-kubur-orang-tua-singkat-arab-latin',
    title: 'Urutan Doa Ziarah Kubur Orang Tua Singkat (Arab, Latin & Artinya): 6 Langkah Mudah Diamalkan',
    metaDescription:
      'Tuntunan 6 langkah urutan doa ziarah kubur orang tua singkat lengkap teks Arab, Latin, dan artinya: salam ahli kubur, istighfar, Al-Fatihah, tahlil, dan doa.',
    category: 'Tata Cara & Fikih',
    publishedAt: '2026-11-20',
    readTimeMinutes: 6,
    excerpt:
      'Panduan praktis enam tahapan ziarah kubur ke makam ayah dan ibu bagi peziarah yang ingin berdoa dengan khusyuk, tertib, dan sesuai sunnah Rasulullah SAW meskipun memiliki waktu terbatas.',
    sections: [
      {
        heading: 'Bakti Anak yang Tidak Terputus Setelah Orang Tua Wafat',
        paragraphs: [
          'Di antara amal jariyah yang pahalanya terus mengalir kepada seorang muslim yang telah wafat adalah doa tulus dari anak yang shalih dan shalihah, sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim. Berziarah ke makam ayah dan ibu bukan sekadar tradisi tahunan menjelang Ramadhan atau Idul Fitri, melainkan wujud silaturahmi ruhani dan bakti anak (birrul walidain) sepanjang hayat.',
          'Banyak peziarah merasa ragu ketika hendak berziarah sendiri ke makam orang tua karena khawatir belum hafal rangkaian tahlil yang panjang. Padahal, inti ziarah kubur dapat diamalkan secara ringkas, khusyuk, dan sempurna melalui enam langkah berurutan berikut ini.',
        ],
      },
      {
        heading: 'Langkah 1 & 2: Berwudhu, Meluruskan Niat, dan Mengucapkan Salam Ahli Kubur',
        paragraphs: [
          'Sebelum berangkat atau setibanya di area pemakaman, disunnahkan menjaga wudhu, mengenakan pakaian yang sopan dan menutup aurat, serta meluruskan niat di dalam hati: berziarah untuk mengingat akhirat dan mendoakan ampunan Allah SWT bagi kedua orang tua.',
          'Saat memasuki gerbang pemakaman dan berdiri menghadap ke arah makam orang tua (membelakangi kiblat saat memberi salam, lalu menghadap kiblat saat berdoa), ucapkanlah salam ahli kubur yang diajarkan Rasulullah SAW dalam Hadits Riwayat Muslim:',
        ],
        bulletPoints: [
          'Teks Arab: السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَلَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ',
          'Transliterasi Latin: Assalamu\'alaikum ahlad-diyaari minal mu\'miniina wal muslimiin, wa innaa insyaa Allahu bikum lalaahiquun, nas\'alullaha lanaa wa lakumul \'aafiyah.',
          'Artinya: "Semoga keselamatan tercurah kepada kalian, wahai penghuni pemakaman dari kalangan orang-orang beriman dan kaum muslimin. Sesungguhnya kami insya Allah akan menyusul kalian. Kami memohon kepada Allah keselamatan bagi kami dan bagi kalian."',
        ],
      },
      {
        heading: 'Langkah 3 & 4: Membaca Istighfar, Hadiah Al-Fatihah, dan Surat-Surat Pendek',
        paragraphs: [
          'Setelah duduk dengan sopan di sisi makam (tidak duduk atau menginjak bagian atas pusara makam), mulailah dengan membaca istighfar tiga kali (Astaghfirullahal \'azhiim) dan shalawat kepada Nabi Muhammad SAW (Allahumma shalli \'alaa Sayyidinaa Muhammad wa \'alaa aali Sayyidinaa Muhammad).',
          'Selanjutnya, kirimkan hadiah bacaan Surah Al-Fatihah yang diawali kepada Rasulullah SAW, para sahabat, para waliyullah dan ulama, kemudian dikhususkan secara spesifik dengan menyebut nama ayah atau ibu tercinta. Jika memiliki waktu luang, bacalah Surah Yasin; namun apabila waktu terbatas, Anda sangat dianjurkan membaca rangkaian surat pendek Al-Qur\'an dan Ayat Kursi:',
        ],
        bulletPoints: [
          'Surah Al-Fatihah (1 kali) diniatkan pahalanya untuk almarhum ayah / almarhumah ibu.',
          'Surah Al-Ikhlas (3 kali), Surah Al-Falaq (1 kali), dan Surah An-Nas (1 kali).',
          'Ayat Kursi — QS. Al-Baqarah ayat 255 (1 kali).',
        ],
      },
      {
        heading: 'Langkah 5 & 6: Dzikir Tahlil Ringkas dan Doa Khusus Ampunan Orang Tua',
        paragraphs: [
          'Seusai membaca ayat-ayat Al-Qur\'an, lantunkan kalimat tasbih (Subhanallah wa bihamdihi, Subhanallahil \'azhiim), tahmid, takbir, serta kalimat tauhid tahlil Laa ilaaha illallah sebanyak 33 kali atau 100 kali dengan suara lembut dan penuh penghayatan.',
          'Tutuplah rangkaian ziarah dengan mengangkat kedua tangan menghadap kiblat, memohonkan ampunan dan kelapangan kubur bagi orang tua melalui doa yang diabadikan dalam Al-Qur\'an (QS. Ibrahim: 41 dan QS. Al-Isra\': 24) serta doa arwah:',
        ],
        bulletPoints: [
          'Doa Orang Tua (Arab): رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
          'Transliterasi Latin: Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.',
          'Doa Kelapangan Kubur (Latin): Allahummaghfir lahu (lahaa) warhamhu (haa) wa \'aafihi (haa) wa\'fu \'anhu (haa), waj\'alil jannata matswaahu (haa).',
          'Artinya: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, serta sayangilah keduanya sebagaimana mereka menyayangiku di waktu kecil. Ya Allah, ampunilah beliau, rahmatilah beliau, berikanlah keselamatan dan maafkanlah kesalahannya, serta jadikanlah surga sebagai tempat kembalinya."',
        ],
      },
    ],
    relatedSiteSlugs: [
      'sunan-ampel-surabaya',
      'sunan-gunung-jati-cirebon',
      'makam-kh-muhammad-sholeh-darat-as-samarani-semarang',
      'makam-kh-muhammad-zaini-bin-abdul-ghani-al-banjari-abah-guru-sekumpul',
    ],
    ctaTarget: {
      label: 'Buka Panduan Yasin, Tahlil Lengkap & Tasbih Digital',
      to: '/panduan',
      description:
        'Gunakan halaman Panduan Ziarah dilengkapi fitur Tasbih Digital 33x/100x dan teks Yasin-Tahlil yang nyaman dibaca langsung di sisi makam.',
    },
    references: [
      'Imam An-Nawawi (wafat 676 H). Kitab Al-Adzkar: Himpunan Doa dan Dzikir Pilihan dari Hadits Shahih. Beirut: Darul Fikr.',
      'Imam Al-Ghazali (wafat 505 H). Ihya\' Ulumiddin, Juz IV: Kitab Dzikrul Maut wa Maa Ba\'dahu (Mengingat Kematian dan Alam Akhirat).',
      'KH. Muhyiddin Abdusshomad (2008). Fiqh Tradisionalis: Jawaban Pelbagai Persoalan Keagamaan Sehari-hari. Malang: Pustaka Bayan.',
    ],
  },
  {
    slug: 'hukum-ziarah-kubur-wanita-haid-menurut-ulama',
    title: 'Hukum Ziarah Kubur bagi Wanita Haid Menurut Ulama Mazhab Syafi\'i & Adab Bacaannya',
    metaDescription:
      'Penjelasan fikih Ahlussunnah wal Jamaah dan Mazhab Syafi\'i tentang hukum ziarah kubur bagi wanita haid beserta adab dzikir, shalawat, dan doa tanpa tilawah.',
    category: 'Tata Cara & Fikih',
    publishedAt: '2026-11-20',
    readTimeMinutes: 6,
    excerpt:
      'Kupasan fikih yang santun dan berimbang mengenai kebolehan perempuan yang sedang berhalangan (haid) mengikuti ziarah kubur orang tua maupun makam Waliyullah, lengkap dengan batasan area masjid dan bacaan dzikir yang dianjurkan.',
    sections: [
      {
        heading: 'Apakah Wanita yang Sedang Haid Boleh Mengikuti Ziarah Kubur?',
        paragraphs: [
          'Dalam perjalanan ziarah keluarga maupun rombongan majelis taklim, sering muncul pertanyaan praktis: bagaimana jika seorang muslimah mengalami haid di tengah jadwal ziarah kubur? Apakah ia tetap boleh masuk ke area pemakaman atau harus menunggu di dalam kendaraan?',
          'Menurut penjelasan para ulama fikih Mazhab Syafi\'i dan jumhur ulama Ahlussunnah wal Jamaah, area pemakaman (maqbarah) bukanlah masjid. Oleh karena itu, **wanita yang sedang haid diperbolehkan masuk ke area pemakaman dan melaksanakan ziarah kubur**, selama ia menjaga adab kesopanan, tidak memasuki ruangan utama masjid yang menyatu dengan kompleks makam, serta menjaga batas bacaan sesuai ketentuan fikih.',
        ],
      },
      {
        heading: 'Landasan Hadits dan Hikmah Mengingat Akhirat bagi Setiap Muslim',
        paragraphs: [
          'Kebolehan berziarah kubur dalam keadaan haid didasarkan pada tujuan utama disyariatkannya ziarah kubur itu sendiri, yakni melembutkan hati dan mengingatkan manusia kepada kematian serta hari akhirat (HR. Muslim). Mengingat kematian, mendoakan orang tua, dan mengambil keteladanan dari perjuangan para ulama adalah amal hati yang sangat dianjurkan baik bagi orang yang suci dari hadats maupun wanita yang sedang berhalangan.',
          'Selain itu, tidak ada dalil syar\'i yang mensyaratkan kesucian dari hadats besar (haid) untuk sekadar memasuki area pemakaman umum atau kompleks maqbarah terbuka.',
        ],
        bulletPoints: [
          'Area pemakaman terbuka, pendopo maqbarah, dan selasar luar masjid boleh dimasuki oleh wanita yang sedang haid.',
          'Apabila letak pusara makam berada tepat di dalam bangunan ruang shalat masjid (iktikaf), maka wanita haid cukup berdiri atau duduk berdoa dari serambi luar masjid di luar batas ruang shalat.',
        ],
      },
      {
        heading: 'Batasan Membaca Al-Qur\'an vs. Kebolehan Berdzikir dan Berdoa',
        paragraphs: [
          'Dalam fikih Mazhab Syafi\'i, wanita yang sedang haid diharamkan membaca ayat Al-Qur\'an dengan niat tilawah (ibadah membaca Al-Qur\'an). Namun, para ulama menjelaskan bahwa wanita haid **tetap diperbolehkan dan sangat dianjurkan** melantunkan seluruh bentuk dzikir, istighfar, tasbih, tahlil, shalawat Nabi, serta doa-doa permohonan ampunan bagi ahli kubur.',
          'Bahkan, terkait ayat-ayat Al-Qur\'an yang mengandung makna doa atau pelindung (seperti kalimat basmalah, hamdalah, kalimat istirja\' Innaa lillaahi wa innaa ilaihi raaji\'uun, atau doa sapu jagat Rabbanaa aatinaa fid-dunyaa hasanah), ulama Mazhab Syafi\'i membolehkan wanita haid mengucapkannya **dengan syarat diniatkan di dalam hati murni sebagai dzikir atau doa**, bukan diniatkan sebagai tilawah Al-Qur\'an.',
        ],
        bulletPoints: [
          'Boleh dan dianjurkan: Mengucapkan salam ahli kubur (Assalamu\'alaikum ahlad-diyaar...).',
          'Boleh dan dianjurkan: Membaca istighfar (Astaghfirullahal \'azhiim), tahlil (Laa ilaaha illallah), tasbih, tahmid, dan takbir.',
          'Boleh dan dianjurkan: Memperbanyak bacaan shalawat kepada Rasulullah SAW dan membaca Qasidah Salamullah Ya Sadah.',
          'Boleh dan dianjurkan: Menyimak dengan khusyuk bacaan Surah Yasin yang dilantunkan oleh anggota rombongan lain sambil mengaminkan doa arwah.',
        ],
      },
      {
        heading: 'Adab Praktis bagi Muslimah Saat Berziarah ke Maqbarah Waliyullah',
        paragraphs: [
          'Agar ziarah tetap membawa ketenangan batin dan keberkahan, muslimah yang sedang berhalangan dianjurkan tetap berwudhu atau membasuh anggota wudhu untuk menjaga kesegaran dan kekhusyukan diri, mengenakan busana muslimah yang longgar dan menutup aurat dengan sempurna, serta menjaga ketenangan suara di area maqbarah.',
          'Ketika jamaah lain sedang membaca Surah Yasin, seorang muslimah yang sedang haid dapat memanfaatkan waktu tersebut untuk memperbanyak dzikir tasbih, istighfar, dan munajat doa di dalam hati bagi keluarga serta orang-orang tercinta.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'makam-ratu-kalinyamat-sultan-hadlirin-jepara',
      'bukti-epigrafis-tertua-kehadiran-islam-di-nusantara-gresik',
      'permaisuri-cakraningrat-i-cucu-sunan-giri-situs-epigrafi-kaligrafi-batu-kapur-terbaik-di-madura-bangkalan',
      'siti-khotijah-ratu-ayu-anak-agung-rai-denpasar',
    ],
    ctaTarget: {
      label: 'Gunakan Tasbih Digital & Bacaan Dzikir Ziarah',
      to: '/panduan',
      description:
        'Buka fitur Tasbih Digital, Salam Ahli Kubur, Qasidah Salamullah Ya Sadah, dan Doa Arwah yang dapat diamalkan oleh setiap peziarah.',
    },
    references: [
      'Imam An-Nawawi (wafat 676 H). Al-Majmu\' Syarh Al-Muhadzdzab, Juz II: Bab Hukum-Hukum Haid dan Bacaan Dzikir.',
      'Syekh Nawawi Al-Bantani (wafat 1897 M). Nihayatuz Zain fi Irsyadil Mubtadi\'in & Kasyifatus Saja Syarh Safinatun Naja.',
      'Lembaga Bahtsul Masail PBNU (2011). Ahkamul Fuqaha: Solusi Problematika Aktual Hukum Islam Keputusan Muktamar, Munas, dan Konbes NU. Surabaya: Khalista.',
    ],
  },
  {
    slug: 'susunan-tawassul-hadiah-al-fatihah-ziarah-makam-wali',
    title: 'Susunan Tawassul & Hadiah Al-Fatihah Saat Ziarah Makam Wali: Kaidah Lurus Sesuai Akidah Ahlussunnah',
    metaDescription:
      'Panduan kaidah tawassul yang lurus sesuai akidah Ahlussunnah wal Jamaah beserta susunan 4 simpul hadiah Surah Al-Fatihah saat berziarah ke makam Waliyullah.',
    category: 'Tata Cara & Fikih',
    publishedAt: '2026-11-20',
    readTimeMinutes: 7,
    excerpt:
      'Memahami hakikat tawassul dan hadiah pahala bacaan Surah Al-Fatihah agar tetap murni bertauhid kepada Allah SWT, jauh dari kesyirikan, serta mengikuti tuntunan para ulama salaf.',
    sections: [
      {
        heading: 'Meluruskan Pemahaman: Apa Itu Tawassul dalam Ziarah Kubur?',
        paragraphs: [
          'Kata tawassul berasal dari bahasa Arab al-wasilah yang berarti perantara atau jalan untuk mendekatkan diri kepada Allah SWT, sebagaimana firman Allah dalam QS. Al-Ma\'idah ayat 35: "Wahai orang-orang yang beriman, bertakwalah kepada Allah dan carilah wasilah (jalan yang mendekatkan diri) kepada-Nya."',
          'Dalam akidah Ahlussunnah wal Jamaah, **berziarah dan bertawassul di makam para Waliyullah sama sekali bukan meminta atau menyembah kepada penghuni kubur**. Seluruh permohonan ampunan, kelapangan rezeki, kesembuhan, dan ketenangan batin semata-mata ditujukan hanya kepada Allah SWT. Para waliyullah dan ulama yang diziarahi diposisikan sebagai hamba-hamba yang dicintai Allah, yang melalui kecintaan kita kepada mereka serta teladan amal shalih mereka, kita berharap doa kita lebih dikabulkan oleh Allah SWT.',
        ],
      },
      {
        heading: 'Hukum Menghadiahkan Pahala Bacaan Al-Fatihah kepada Ahli Kubur',
        paragraphs: [
          'Menghadiahkan pahala bacaan Surah Al-Fatihah, Surah Yasin, tahlil, dan sedekah kepada kaum muslimin yang telah wafat merupakan amalan yang disepakati sampainya oleh jumhur ulama empat mazhab, sebagaimana ditegaskan oleh Imam Ahmad bin Hanbal, Ibnu Qudamah dalam Al-Mughni, serta Imam An-Nawawi dan Ibnu Hajar Al-Haitami dalam literatur Mazhab Syafi\'i.',
          'Ketika seorang peziarah mengucapkan "Ilaa hadhratin Nabiyyil Mushthafa... al-Fatihah", maknanya adalah memohon kepada Allah SWT agar menganugerahkan tambahan rahmat, kemuliaan, dan pahala bacaan Surah Al-Fatihah tersebut kepada ruh yang disebutkan namanya, sekaligus menyambungkan ikatan mahabbah (cinta karena Allah) antara generasi yang masih hidup dengan para pendahulu yang shalih.',
        ],
      },
      {
        heading: 'Empat Simpul Susunan Tawassul Al-Fatihah yang Ringkas dan Tertib',
        paragraphs: [
          'Dalam tradisi pesantren Nusantara, susunan hadiah Al-Fatihah sebelum membaca Yasin dan Tahlil disusun secara berjenjang mengikuti adab penghormatan sanad keilmuan dalam empat simpul utama:',
        ],
        bulletPoints: [
          'Simpul Pertama (Kepada Rasulullah SAW & Keluarga/Sahabat): Ilaa hadhratin Nabiyyil Mushthafa Sayyidinaa Muhammadin shallallahu \'alaihi wa sallam, wa \'alaa aalihi wa ash-haabihi wa azwaajihi wa dzurriyyaatihi wa ahli baitihil kiraam, syai-ul lillaahi lahumul Faatihah. (Baca Surah Al-Fatihah).',
          'Simpul Kedua (Kepada Para Nabi, Syuhada, Shalihin & Sulthanul Auliya): Tsumma ilaa arwaahi jamii\'il anbiyaa-i wal mursaliin, wasy-syuhadaa-i wash-shaalihiin, wal \'ulamaa-il \'aamiliin, khushuushan Sulthaanil Auliyaa Syekh Abdul Qadir Al-Jailani, syai-ul lillaahi lahumul Faatihah. (Baca Surah Al-Fatihah).',
          'Simpul Ketiga (Kepada Para Wali Songo, Ulama Nusantara & Tokoh yang Diziarahi): Tsumma ilaa arwaahi jamii\'i Auliyaa-illaahi Ta\'aalaa fii jihatil arba\'ah, khushuushan Auliyaa-i Tis\'ah (Wali Songo) wa \'ulamaa-i biladinaa Indonesia, wa khushuushan ilaa ruuhi [Sebut Nama Waliyullah/Ulama yang Diziarahi], syai-ul lillaahi lahumul Faatihah. (Baca Surah Al-Fatihah).',
          'Simpul Keempat (Kepada Orang Tua, Guru & Seluruh Kaum Muslimin): Tsumma ilaa arwaahi aabaa-inaa wa ummahaatinaa wa masyaayikhinaa wa jamii\'il muslimiina wal muslimaat wal mu\'miniina wal mu\'minaat, syai-ul lillaahi lahumul Faatihah. (Baca Surah Al-Fatihah).',
        ],
      },
      {
        heading: 'Adab Hati Saat Melantunkan Tawassul dan Munajat Hajat',
        paragraphs: [
          'Setelah merampungkan keempat simpul Al-Fatihah serta rangkaian dzikir tahlil, sampaikanlah hajat pribadi maupun keluarga langsung kepada Allah SWT dengan penuh kerendahan hati. Hindari segala bentuk perbuatan yang bertentangan dengan syariat, seperti meminta nomor keberuntungan, mengambil tanah atau batu makam untuk jimat, maupun meratap secara berlebihan.',
          'Dengan menjaga kemurnian tauhid dan ketertiban adab, ziarah makam waliyullah akan menjadi madrasah ruhani yang menyegarkan iman dan menguatkan semangat ibadah sepulang dari perjalanan.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'matahari-islam-kalimantan-pengarang-kitab-sabilal-muhtadin-maha-guru-dzurriyah-ulama-nusantara-banjar',
      'syekh-nawawi-al-bantani-serang',
      'makam-kh-dalhar-watucongol-kyai-raden-santri-magelang',
      'pesantren-al-anwar-maqbarah-masyayikh-sarang-rembang',
    ],
    ctaTarget: {
      label: 'Jelajahi 549 Wirid & Doa Tawassul Spesifik 183 Tokoh',
      to: '/doa',
      description:
        'Temukan teks tawassul dan doa khusus yang telah disesuaikan dengan nama serta sanad keilmuan masing-masing dari 183 Waliyullah di Nusantara.',
    },
    references: [
      'Sayyid Muhammad bin Alawi Al-Maliki Al-Hasani (2003). Mafahim Yajibu an Tushahhah (Paham-Paham yang Perlu Diluruskan Seputar Tawassul dan Ziarah). Makkah Al-Mukarramah.',
      'KH. Siradjuddin Abbas (2006). I\'itiqad Ahlussunnah wal Jamaah & 40 Masalah Agama. Jakarta: Pustaka Tarbiyah.',
      'Syekh Muhammad Arsyad Al-Banjari (1779 M). Sabilal Muhtadin li Tafaqquh fi Amrid Din.',
    ],
  },
  {
    slug: 'kalender-haul-wali-songo-dan-ulama-nusantara',
    title: 'Kalender Haul Wali Songo, Habaib & Ulama Nusantara Sepanjang Tahun Hijriah',
    metaDescription:
      'Ringkasan kalender bulan Hijriah jadwal haul Wali Songo, Habaib, dan Ulama Nusantara dari Muharram hingga Dzulhijjah beserta tips persiapan keberangkatan.',
    category: 'Musiman & Haul',
    publishedAt: '2026-11-20',
    readTimeMinutes: 8,
    excerpt:
      'Peta waktu peringatan haul akbar para Waliyullah dari bulan Muharram hingga Dzulhijjah untuk membantu jamaah dan pengurus rombongan merencanakan keberangkatan ziarah tahunan secara tertib.',
    sections: [
      {
        heading: 'Makna Peringatan Haul dalam Tradisi Islam Nusantara',
        paragraphs: [
          'Jadwal haul dan buka luwur mengikuti penanggalan Hijriah dan dapat bergeser sesuai penetapan resmi panitia atau pengurus makam setempat setiap tahunnya.',
          'Kata haul berasal dari bahasa Arab al-haul yang berarti genap satu tahun. Dalam tradisi umat Islam di Nusantara, peringatan haul seorang ulama atau waliyullah diselenggarakan setahun sekali berdasarkan penanggalan Hijriah untuk mengenang wafatnya tokoh tersebut, membacakan manaqib (sejarah hidup dan keteladanan akhlaknya), melantunkan dzikir tahlil bersama, serta menyambung silaturahmi antar-murid dan jamaah.',
          'Karena penanggalan Hijriah lebih pendek sekitar 10–11 hari dibandingkan kalender Masehi, tanggal Masehi pelaksanaan haul selalu bergeser maju setiap tahunnya. Selain itu, tanggal puncak acara haul di setiap maqbarah senantiasa mengikuti ketetapan resmi keluarga dzurriyah, pengasuh pesantren, atau yayasan pengurus makam setempat.',
        ],
      },
      {
        heading: 'Muharram hingga Rabiul Akhir: Haul Sunan Kudus, Sunan Gresik & Habib Sholeh Tanggul',
        paragraphs: [
          'Memasuki awal tahun baru Hijriah di bulan Muharram, ribuan peziarah memadati Kota Kudus untuk menghadiri peringatan Buka Luwur (penggantian kain kelambu pusara) Makam Sunan Kudus yang puncaknya berlangsung setiap tanggal 10 Muharram (Hari Asyura) dengan pembagian ribuan bungkus nasi Jangkrik kepada masyarakat.',
          'Pada bulan Rabiul Awal (bulan Maulid Nabi SAW) dan Rabiul Akhir, peringatan haul berlanjut di berbagai penjuru Jawa Timur: mulai dari Haul Akbar Syekh Maulana Malik Ibrahim (Sunan Gresik) setiap tanggal 12 Rabiul Awal, Haul Sunan Giri di Kebomas Gresik pada bulan Rabiul Awal, hingga Haul Akbar Habib Sholeh bin Muhsin Al-Hamid di Tanggul, Jember, yang rutin digelar pada pekan kedua bulan Syawal, serta Haul Habib Ali bin Muhammad Al-Habsyi (pengarang Maulid Simthuddurar) di Masjid Riyadh Solo setiap tanggal 20 Rabiul Akhir.',
        ],
        bulletPoints: [
          '10 Muharram: Puncak Buka Luwur Makam Sunan Kudus, Kabupaten Kudus, Jawa Tengah.',
          '12 Rabiul Awal: Haul Syekh Maulana Malik Ibrahim (Sunan Gresik), Kabupaten Gresik, Jawa Timur.',
          '1–15 Muharram (Puncak 15 Muharram): Rangkaian Buka Luwur & Haul Sunan Muria (Raden Umar Said), Colo, Kabupaten Kudus, Jawa Tengah (tanggal puncak mengikuti penetapan resmi panitia setempat).',
          '20 Rabiul Akhir: Peringatan Haul Habib Ali bin Muhammad Al-Habsyi, Masjid Riyadh, Pasar Kliwon, Surakarta (tanggal puncak mengikuti pengumuman resmi panitia Masjid Riyadh).',
          'Haul Habib Anis bin Alwi Al-Habsyi, Masjid Riyadh, Pasar Kliwon, Surakarta: Mengikuti pengumuman resmi panitia Masjid Riyadh Solo.',
        ],
      },
      {
        heading: 'Jumadil Awal hingga Sya\'ban: Haul Guru Sekumpul, Sunan Ampel & Ziarah Kubro Palembang',
        paragraphs: [
          'Paruh tengah tahun Hijriah diwarnai salah satu perhelatan keagamaan terbesar di Asia Tenggara, yaitu Haul Akbar Abah Guru Sekumpul (KH. Muhammad Zaini bin Abdul Ghani) di Martapura, Kalimantan Selatan, yang diselenggarakan setiap pekan awal bulan Rajab (sekitar tanggal 5 Rajab) dan dihadiri jutaan jamaah dengan layanan dapur umum relawan gratis di sepanjang jalan.',
          'Memasuki bulan Sya\'ban (Ruwah) menjelang Ramadhan, poros haul bergerak ke Surabaya dengan digelarnya Haul Agung Sunan Ampel pada pertengahan bulan Sya\'ban (sekitar pekan Nisfu Sya\'ban), serta tradisi Ziarah Kubro Ulama dan Auliya Palembang Darussalam pada pekan terakhir bulan Sya\'ban yang menyusuri Makam Kiai Marogan, Kawah Tengkurep, dan Gubah Duku.',
        ],
        bulletPoints: [
          '5 Rajab: Haul Akbar Abah Guru Sekumpul (KH. Muhammad Zaini bin Abdul Ghani), Martapura, Kalimantan Selatan.',
          'Pertengahan Sya\'ban (sekitar 15–17 Sya\'ban): Haul Agung Sunan Ampel, Semampir, Surabaya, Jawa Timur.',
          'Akhir Sya\'ban (10 hari menjelang Ramadhan): Ziarah Kubro Ulama & Auliya Palembang Darussalam, Sumatera Selatan.',
        ],
      },
      {
        heading: 'Ramadhan hingga Dzulhijjah: Haul Tebuireng, Mbah Hamid Pasuruan & Sunan Gunung Jati',
        paragraphs: [
          'Di bulan suci Ramadhan, Pondok Pesantren Tebuireng Jombang menyelenggarakan peringatan haul wafatnya Hadratussyaikh KH. Hasyim Asy\'ari (wafat 7 Ramadhan 1366 H), disusul haul para masyayikh pesantren lainnya. Pada bulan Syawal, Kota Bangkalan Madura menyambut jamaah Haul Syaichona Muhammad Kholil Bangkalan (wafat 29 Ramadhan), sementara Gresik menggelar Haul Sunan Bonang di Tuban pada bulan Muharram/Syawal sesuai takwim kepanitiaan.',
          'Menjelang akhir tahun Hijriah, bulan Dzulqa\'dah dan Dzulhijjah menjadi puncak kunjungan di Kota Pasuruan pada Haul Akbar KH. Abdul Hamid (Mbah Hamid Pasuruan) setiap tanggal 9 Dzulhijjah (Hari Arafah), serta tradisi Grebeg Syawal dan Grebeg Besar (Idul Adha) di Astana Gunung Sembung Cirebon (Makam Sunan Gunung Jati) dan Kadilangu Demak (Makam Sunan Kalijaga).',
        ],
        bulletPoints: [
          '7 Ramadhan: Peringatan Haul Hadratussyaikh KH. Hasyim Asy\'ari, PP Tebuireng, Jombang.',
          '9 Dzulhijjah: Haul Akbar KH. Abdul Hamid (Mbah Hamid Pasuruan), Masjid Agung Al-Anwar, Kota Pasuruan.',
          '10 Dzulhijjah (Idul Adha): Tradisi Penjamasan & Grebeg Besar Makam Sunan Kalijaga di Kadilangu Demak serta Astana Gunung Jati Cirebon.',
          'Catatan Penting: Selalu konfirmasi jadwal resmi kepanitiaan haul tahun berjalan sebelum memesan akomodasi karena tanggal pelaksanaan dapat menyesuaikan hari libur akhir pekan.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'makam-kh-muhammad-zaini-bin-abdul-ghani-al-banjari-abah-guru-sekumpul',
      'makam-habib-anis-bin-alwi-al-habsyi-habib-alwi-bin-ali-al-habsyi-surakarta',
      'sunan-ampel-surabaya',
      'makam-sunan-kudus',
      'wali-agung-penyejuk-umat-pengasuh-pondok-pesantren-salafiyah-pasuruan',
      'wali-quthub-mustajabud-da-wah-penggubah-shalawat-manshub-jember',
      'makam-kh-masagus-abdul-hamid-bin-mahmud-kiai-marogan-palembang',
    ],
    ctaTarget: {
      label: 'Cek Jadwal Haul Spesifik di Direktori 183 Makam',
      to: '/direktori',
      description:
        'Setiap kartu makam di Direktori Ziarah Nusantara dilengkapi informasi jadwal haul tahunan, jam operasional, dan adab lokal maqbarah.',
    },
    references: [
      'Alatas, Ismail Fajrie (2014). Pilgrimage and Network Formation in Two Contemporary Ba \'Alawi Haul in Central Java. Journal of Islamic Studies.',
      'Dinas Kepemudaan, Olahraga dan Pariwisata Provinsi Jawa Tengah — Event Buka Luwur Sunan Muria (https://visitjawatengah.jatengprov.go.id/id/event/buka-luwur-sunan-muria).',
    ],
  },
  {
    slug: 'tradisi-nyadran-ziarah-kubur-menjelang-ramadhan',
    title: 'Tradisi Nyadran & Ziarah Kubur Menjelang Ramadhan: Sejarah, Hikmah Sosial, dan Adabnya',
    metaDescription:
      'Sejarah dan hikmah tradisi Nyadran atau Ruwahan di bulan Sya\'ban menjelang Ramadhan: adab merawat makam leluhur, silaturahmi sosial, dan doa arwah bersama.',
    category: 'Musiman & Haul',
    publishedAt: '2026-11-20',
    readTimeMinutes: 6,
    excerpt:
      'Menelusuri akar sejarah dakwah kultural para Wali Songo di balik tradisi Nyadran atau Ruwahan setiap bulan Sya\'ban: memadukan bakti doa bagi leluhur, gotong royong membersihkan pemakaman, dan sedekah pangan bagi sesama.',
    sections: [
      {
        heading: 'Asal-Usul Tradisi Nyadran dan Ruwahan di Bulan Sya\'ban',
        paragraphs: [
          'Setiap memasuki bulan Sya\'ban—yang dalam penanggalan Jawa disebut bulan Ruwah (berasal dari kata arwah)—masyarakat muslim di Jawa Tengah, DI Yogyakarta, Jawa Timur, hingga berbagai daerah di Nusantara melaksanakan tradisi Nyadran atau ziarah kubur massal menjelang datangnya bulan suci Ramadhan.',
          'Dalam kajian sejarah kebudayaan Islam Nusantara, tradisi Nyadran merupakan buah dakwah kultural para Wali Songo, khususnya Sunan Kalijaga dan Sunan Bonang, yang mengislamkan tradisi penghormatan leluhur masyarakat Jawa kuno menjadi kegiatan bakti doa arwah, pembacaan kalimat thayyibah tahlil, serta sedekah makanan yang selaras dengan ajaran tauhid.',
        ],
      },
      {
        heading: 'Tiga Rangkaian Utama dalam Tradisi Nyadran yang Sarat Makna',
        paragraphs: [
          'Berbeda dengan ziarah pribadi biasa, tradisi Nyadran di desa-desa maupun lingkungan perkotaan mengintegrasikan tiga dimensi ibadah sekaligus: kebersihan lingkungan (thaharah), doa berjamaah (ukhuwah), dan kedermawanan sosial (shadaqah).',
        ],
        bulletPoints: [
          'Besik Kubur (Gotong Royong Membersihkan Makam): Warga desa bersama-sama mencabut rumput liar, merapikan jalan setapak pemakaman, dan membersihkan nisan orang tua maupun sesepuh desa agar area pemakaman tampak asri dan terhormat.',
          'Kirim Doa, Yasinan & Tahlil Bersama: Dipimpin oleh kiai atau modin setempat, seluruh warga berkumpul di serambi masjid atau pendopo makam untuk membaca Surah Yasin, tahlil, dan doa arwah bagi seluruh leluhur desa serta kaum muslimin.',
          'Kembul Bujana & Sedekah Pangan: Warga saling berbagi hidangan nasi berkat, apem, ketan, dan kolak—tiga kudapan simbolis warisan Sunan Kalijaga yang berasal dari serapan kata Arab \'afwun (permohonan maaf), khatha-an (kesalahan), dan khalaq (kembali bersih menyongsong Ramadhan).',
        ],
      },
      {
        heading: 'Mengapa Ziarah Kubur Sangat Dianjurkan Menjelang Bulan Ramadhan?',
        paragraphs: [
          'Secara psikologis dan spiritual, berziarah ke makam orang tua serta para ulama menjelang tanggal 1 Ramadhan adalah pengingat terbaik bahwa tahun lalu mungkin masih ada anggota keluarga yang berpuasa bersama kita, namun tahun ini mereka telah mendahului kita ke alam barzakh.',
          'Kesadaran akan singkatnya umur dunia inilah yang membuat seorang muslim memasuki bulan Ramadhan dengan hati yang lembut, bebas dari dendam terhadap sesama, serta bersungguh-sungguh menjaga kualitas puasa, shalat tarawih, dan tilawah Al-Qur\'annya.',
        ],
      },
      {
        heading: 'Adab Menjaga Kemurnian Ibadah Saat Melaksanakan Nyadran',
        paragraphs: [
          'Para ulama mengingatkan agar pelaksanaan Nyadran atau ziarah menjelang Ramadhan senantiasa dijaga dari pemborosan makanan (mubadzir) maupun keyakinan yang menyimpang. Hidangan yang dibawa saat Nyadran diniatkan murni sebagai sedekah untuk dimakan bersama warga dan fakir miskin yang pahalanya dihadiahkan kepada ahli kubur, bukan sebagai sesaji untuk roh.',
          'Saat berada di pemakaman, utamakan ketenangan, hindari menginjak pusara makam lain ketika kondisi pemakaman sedang ramai, dan luangkan waktu untuk saling bermaafan dengan sanak kerabat yang hadir.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'makam-sunan-kalijaga-demak',
      'makam-ki-ageng-gribig-sayyid-wasibagno-timur-klaten',
      'makam-sunan-pandanaran-ii-sunan-tembayat-klaten',
      'makam-panembahan-senopati-ki-ageng-pemanahan-sultan-hadiwijaya-yogyakarta',
      'makam-sultan-agung-hanyakrakusuma-raja-raja-mataram-bantul',
    ],
    ctaTarget: {
      label: 'Baca Kisah Kearifan Dakwah Para Wali di Rubrik Sejarah',
      to: '/rubrik',
      description:
        'Selami kisah nyata kearifan dakwah kultural Wali Songo dan wasiat batin para ulama Nusantara yang menyejukkan hati.',
    },
    references: [
      'Geertz, Clifford (1960). The Religion of Java. Glencoe: The Free Press.',
      'Woodward, Mark R. (1989). Islam in Java: Normative Piety and Mysticism in the Sultanate of Yogyakarta. Tucson: University of Arizona Press.',
      'Kementerian Pendidikan dan Kebudayaan RI — Warisan Budaya Takbenda Indonesia: Tradisi Nyadran dan Ya Qowiyyu Jatinom.',
    ],
  },
  {
    slug: 'makna-tombo-ati-sunan-bonang-dan-doa-penenang-hati',
    title: 'Makna 5 Pilar Tombo Ati Sunan Bonang & Doa Penenang Hati Saat Gelisah Menghadapi Ujian',
    metaDescription:
      'Bedah makna 5 pilar tembang Tombo Ati warisan Sunan Bonang berdasarkan nasihat Ibrahim bin Adham beserta amalan dzikir dan doa penenang hati yang gelisah.',
    category: 'Hajat & Keteladanan',
    publishedAt: '2026-11-20',
    readTimeMinutes: 7,
    excerpt:
      'Menyelami lima resep pengobat hati (Tombo Ati) yang digubah oleh Sunan Bonang di Tuban dari wejangan sufi besar Ibrahim bin Adham, lengkap dengan doa Rasulullah SAW untuk meredakan kecemasan hidup.',
    sections: [
      {
        heading: 'Asal-Usul Tembang Tombo Ati: Dari Ibrahim bin Adham hingga Sunan Bonang',
        paragraphs: [
          'Hampir setiap muslim di Nusantara akrab dengan syair Jawa yang teduh: "Tombo ati iku limo perkarane..." (Obat hati itu ada lima perkaranya). Syair ini merupakan gubahan dakwah Sunan Bonang (Raden Makhdum Ibrahim, putra Sunan Ampel) di pesisir Tuban pada abad ke-15 untuk memudahkan masyarakat awam menghafal resep penyucian jiwa (tazkiyatun nafs).',
          'Secara sanad keilmuan, kelima resep Tombo Ati bukanlah karangan bebas tanpa dasar, melainkan terjemahan puitis dari nasihat ulama sufi generasi tabi\'it tabi\'in, Syekh Ibrahim bin Adham (wafat 162 H), sebagaimana dikutip oleh Imam An-Nawawi dalam kitab At-Tibyan fi Adabi Hamalatil Qur\'an tentang lima perkara yang menghidupkan hati yang gersang.',
        ],
      },
      {
        heading: 'Membedah Lima Pilar Tombo Ati untuk Mengobati Kegelisahan Modern',
        paragraphs: [
          'Di tengah tekanan pekerjaan, kecemasan ekonomi, dan hiruk-pikuk media sosial saat ini, kelima pilar Tombo Ati bekerja sebagai terapi ruhani yang mengembalikan keseimbangan batin seorang mukmin:',
        ],
        bulletPoints: [
          '1. Moco Qur\'an lan Maknane (Membaca Al-Qur\'an dan Merenungi Maknanya): Membaca beberapa ayat Al-Qur\'an setiap hari disertai terjemahan atau tafsirnya agar hati merasakan sapaan langsung dari Allah SWT.',
          '2. Shalat Wengi Lakonono (Mendirikan Shalat Malam / Tahajud): Bangun di sepertiga malam terakhir ketika dunia sedang hening untuk mengadukan seluruh beban hidup di atas sajadah.',
          '3. Wong Kang Sholeh Kumpulono (Berkumpul dengan Orang-Orang Shalih): Menghadiri majelis ilmu, bersilaturahmi ke pesantren, serta menziarahi maqbarah para ulama untuk menyerap keteduhan akhlak dan keteguhan iman mereka.',
          '4. Weteng Iro Ingkang Luwe (Memperbanyak Puasa & Menjaga Perut): Melatih pengendalian diri melalui puasa sunnah dan menjaga kehalalan rezeki yang masuk ke dalam tubuh.',
          '5. Dzikir Wengi Ingkang Suwe (Memperbanyak Dzikir di Waktu Malam): Mengisi waktu malam dengan istighfar, tasbih, dan shalawat hingga hati mencapai ketenteraman (alaa bidzikrillaahi tathma\'innul quluub — QS. Ar-Ra\'d: 28).',
        ],
      },
      {
        heading: 'Ziarah sebagai Bagian dari Pilar "Berkumpul dengan Orang-Orang Shalih"',
        paragraphs: [
          'Para ulama menjelaskan bahwa perintah berkumpul dengan orang-orang shalih mencakup duduk bersama ulama yang masih hidup untuk menimba ilmu, maupun berziarah ke makam para ulama dan waliyullah yang telah wafat untuk mengenang keteladanan hidup mereka.',
          'Ketika seseorang duduk berdzikir di serambi maqbarah Sunan Bonang di Tuban, Sunan Kalijaga di Demak, atau para masyayikh pesantren, ia sedang menjauhkan dirinya sejenak dari lingkungan yang melalaikan akhirat dan membawa hatinya ke dalam suasana dzikir yang meneduhkan.',
        ],
      },
      {
        heading: 'Doa Rasulullah SAW untuk Menghilangkan Kesedihan dan Kecemasan Hati',
        paragraphs: [
          'Selain mengamalkan lima pilar Tombo Ati, Rasulullah SAW mengajarkan sebuah doa agung dalam Hadits Riwayat Bukhari dan Muslim bagi siapa saja yang sedang dilanda kegelisahan, kesedihan mendalam, atau himpitan beban hidup:',
        ],
        bulletPoints: [
          'Teks Arab: اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
          'Transliterasi Latin: Allahumma innii a\'uudzu bika minal hammi wal hazan, wal \'ajzi wal kasal, wal bukhli wal jubn, wa dhala\'id daini wa ghalabatir rijaal.',
          'Artinya: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kecemasan dan kesedihan, dari kelemahan dan kemalasan, dari sifat kikir dan pengecut, serta dari lilitan utang dan penindasan orang lain." (HR. Bukhari no. 6369).',
        ],
      },
    ],
    relatedSiteSlugs: [
      'sunan-bonang-tuban',
      'sunan-ampel-surabaya',
      'makam-sunan-kalijaga-demak',
      'syekh-abdul-muhyi-pamijahan-tasikmalaya',
      'makam-datu-sanggul-syekh-abdussamad-tapin',
    ],
    ctaTarget: {
      label: 'Temukan Makam Wali dengan Filter Suasana Hati di Beranda',
      to: '/direktori',
      description:
        'Gunakan filter "Apa yang Sedang Dicari Hati Anda Hari Ini?" di Beranda untuk memilih topik Keteduhan Batin & Pengobat Gelisah.',
    },
    references: [
      'Imam An-Nawawi (wafat 676 H). At-Tibyan fi Adabi Hamalatil Qur\'an (Penjelasan Lima Obat Hati dari Ibrahim bin Adham).',
      'Schrieke, B.J.O. (1916). Het Boek van Bonang (Kajian Filologi Naskah Suluk Sunan Bonang). Utrecht: P. den Boer.',
    ],
  },
  {
    slug: 'rangkaian-ayat-syifa-dan-doa-kesembuhan-sesuai-sunnah',
    title: 'Rangkaian Ayat Syifa & Doa Kesembuhan Sesuai Sunnah: Ikhtiar Batin Mendampingi Pengobatan Medis',
    metaDescription:
      'Tuntunan ayat-ayat Syifa dalam Al-Qur\'an dan doa kesembuhan Rasulullah SAW riwayat Bukhari-Muslim sebagai ikhtiar batin mendampingi pengobatan medis.',
    category: 'Hajat & Keteladanan',
    publishedAt: '2026-11-20',
    readTimeMinutes: 7,
    excerpt:
      'Panduan memadukan ikhtiar pengobatan medis dengan doa kesembuhan (Syifa\') dari Al-Qur\'an dan Hadits Shahih, serta meneladani tradisi pelayanan kesehatan masyarakat warisan para Wali Songo.',
    sections: [
      {
        heading: 'Keseimbangan Ikhtiar Medis dan Doa Kesembuhan dalam Islam',
        paragraphs: [
          'Dalam ajaran Islam, berobat secara medis ketika mengalami sakit merupakan perintah Rasulullah SAW sebagaimana sabda beliau dalam Hadits Riwayat Abu Dawud: "Berobatlah wahai hamba-hamba Allah, karena sesungguhnya Allah tidak menurunkan suatu penyakit melainkan Dia juga menurunkan obatnya." Para Wali Songo sendiri—seperti Syekh Maulana Malik Ibrahim di Gresik, Sunan Drajat di Lamongan, dan Sunan Muria di Kudus—dikenal dalam catatan sejarah sebagai tabib yang mengobati masyarakat dengan ramuan herbal Nusantara secara cuma-cuma.',
          'Seiring dengan ikhtiar medis di rumah sakit atau dokter, seorang mukmin dianjurkan menguatkan daya tahan batinnya dengan meyakini bahwa hakikat penyembuh (Asy-Syafi) hanyalah Allah SWT, sebagaimana doa Nabi Ibrahim AS dalam QS. Asy-Syu\'ara ayat 80: "Wa idzaa maridhtu fahuwa yasyfiin" (Dan apabila aku sakit, Dialah Allah yang menyembuhkanku).',
        ],
      },
      {
        heading: 'Ayat-Ayat Syifa\' (Penyembuh dan Penenteram Jiwa) dalam Al-Qur\'an',
        paragraphs: [
          'Para ulama salaf merangkum enam ayat di dalam Al-Qur\'an yang memuat kata syifaa\' (kesembuhan/penawar), yang dikenal sebagai Ayat-Ayat Syifa\'. Dua di antaranya yang paling mudah dihafal dan dibaca berulang kali setelah shalat maupun saat mendampingi keluarga yang sedang sakit adalah:',
        ],
        bulletPoints: [
          '1. QS. Al-Isra\' Ayat 82 (Arab): وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
          'Transliterasi Latin: Wa nunazzilu minal Qur\'aani maa huwa syifaa-uw wa rahmatul lil mu\'miniin.',
          'Artinya: "Dan Kami turunkan dari Al-Qur\'an sesuatu yang menjadi penawar (kesembuhan) dan rahmat bagi orang-orang yang beriman."',
          '2. QS. Yunus Ayat 57 (Latin): Yaa ayyuhan-naasu qad jaa-atkum mau\'izhatum mir rabbikum wa syifaa-ul limaa fish-shuduuri wa hudaw wa rahmatul lil mu\'miniin ("Wahai manusia, sungguh telah datang kepadamu pelajaran dari Tuhanmu, penyembuh bagi penyakit yang ada di dalam dada, dan petunjuk serta rahmat bagi orang yang beriman").',
        ],
      },
      {
        heading: 'Doa Kesembuhan yang Diajarkan Rasulullah SAW (HR. Bukhari & Muslim)',
        paragraphs: [
          'Ketika menjenguk keluarga yang sakit atau mendoakan kesembuhan diri sendiri, Rasulullah SAW meletakkan tangan kanan pada bagian yang sakit atau mengangkat tangan seraya memohon kepada Allah SWT dengan doa shahih riwayat Imam Bukhari dan Imam Muslim berikut:',
        ],
        bulletPoints: [
          'Teks Arab: اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
          'Transliterasi Latin: Allahumma Rabban-naas, adzhibil ba\'sa, isyfi Antasy-Syaafii, laa syifaa-a illaa syifaa-uka, syifaa-al laa yughaadiru saqamaa.',
          'Artinya: "Ya Allah, Tuhan seluruh manusia, hilangkanlah penyakit ini. Sembuhkanlah, karena Engkaulah Maha Penyembuh. Tidak ada kesembuhan selain kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan rasa sakit sedikit pun." (HR. Bukhari no. 5675 & Muslim no. 2191).',
          'Shalawat Tibbil Qulub (Shalawat Syifa): Allahumma shalli \'alaa Sayyidinaa Muhammadin thibbil quluubi wa dawaa-ihaa, wa \'aafiyatil abdaani wa syifaa-ihaa, wa nuuril abshaari wa dhiyaa-ihaa, wa \'alaa aalihi wa shahbihi wa sallim.',
        ],
      },
      {
        heading: 'Meneladani Kepedulian Kesehatan Para Waliyullah Nusantara',
        paragraphs: [
          'Saat berziarah ke maqbarah para Waliyullah atau membaca riwayat dakwah mereka, kita belajar bahwa kesalehan spiritual dalam Islam selalu berjalan beriringan dengan kepedulian terhadap kesehatan jasmani sesama manusia. Jangan pernah menghentikan pengobatan dokter demi ritual non-medis; sebaliknya, jadikan dzikir, sedekah kepada fakir miskin, dan doa kesembuhan ini sebagai penopang ketenangan batin agar proses pemulihan medis berjalan optimal atas izin Allah SWT.',
        ],
      },
    ],
    relatedSiteSlugs: [
      'sunan-gresik',
      'sunan-drajat-lamongan',
      'sunan-muria-kudus',
      'wali-quthub-al-ghaus-mahkota-para-auliya-ba-alawi-abad-ke-20-gresik',
      'wali-quthub-mustajabud-da-wah-penggubah-shalawat-manshub-jember',
    ],
    ctaTarget: {
      label: 'Titipkan Munajat Doa Kesembuhan atau Buka Kumpulan Doa',
      to: '/doa',
      description:
        'Buka halaman Kumpulan Doa & Wirid untuk mengamalkan bacaan tawassul serta doa-doa permohonan kesehatan dan keselamatan keluarga.',
    },
    references: [
      'Imam Al-Bukhari (wafat 256 H). Shahih Al-Bukhari: Kitab Ath-Thibb (Kitab Pengobatan dan Doa Ruqyah Syar\'iyyah).',
      'Ibnu Qayyim Al-Jauziyyah (wafat 751 H). Ath-Thibb An-Nabawi (Metode Pengobatan dan Doa Kesembuhan Nabi SAW).',
      'Sunyoto, Agus (2016). Atlas Wali Songo: Kiprah Pengobatan dan Sosial Masyarakat Syekh Maulana Malik Ibrahim & Sunan Drajat.',
    ],
  },
];

export const ARTICLES = ZIARAH_ARTICLES;

export function findArticleBySlug(rawSlug?: string | null): ZiarahArticle | null {
  if (!rawSlug) return null;
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase();
  if (!normalized) return null;
  return ZIARAH_ARTICLES.find((a) => a.slug.toLowerCase() === normalized) || null;
}
