export interface ZiarahSite {
  id: string;
  name: string;
  title: string; // e.g. "Sunan Ampel"
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    province: string;
  };
  category: 'Walisongo' | 'Habaib' | 'Ulama Nusantara' | 'Auliya Nusantara';
  imageUrl: string;
  history: string;
  facilities: string[];
  openingHours: string;
  karomah?: string[];
  untoldStory?: string;
  doaKhusus?: {
    title: string;
    text: string;
    translation?: string;
  }[];
}

export const ziarahSites: ZiarahSite[] = [
  {
    id: "wali-1",
    name: "Maulana Malik Ibrahim",
    title: "Sunan Gresik",
    description: "Wali senior yang dianggap sebagai orang pertama yang menyebarkan Islam di tanah Jawa.",
    location: {
      lat: -7.1643,
      lng: 112.6565,
      address: "Jl. Malik Ibrahim, Gapuro Sukolilo, Kec. Gresik",
      city: "Gresik",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Maulana Malik Ibrahim atau Sunan Gresik datang ke Jawa awal abad ke-15. Beliau berdakwah dengan cara mendekati masyarakat melalui perdagangan dan pertanian, serta mengajarkan budi pekerti yang luhur.",
    untoldStory: "Menurut catatan saudagar Gujarat abad ke-14, Syekh Maulana Malik Ibrahim pernah menyelamatkan sebuah desa dari wabah mematikan hanya dengan membagikan air dari sumur kecil yang didoakannya. Sumur tersebut kini konon berada tersembunyi di bawah fondasi salah satu bangunan tua di sekitar makam.",
    facilities: ["Masjid", "Area Parkir", "Toilet", "Tempat Wudhu", "Toko Souvenir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "wali-2",
    name: "Raden Rahmat",
    title: "Sunan Ampel",
    description: "Pendiri Pesantren Ampel Denta dan bapak dari beberapa Wali Songo.",
    location: {
      lat: -7.2285,
      lng: 112.7397,
      address: "Jl. Ampel, Semampir",
      city: "Surabaya",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Masjid_Al-Khodlro%27_Pondok_Pesantren_Sunan_Ampel_Jombang-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Sunan Ampel sangat berperan dalam membentuk kader-kader pendakwah Islam di Jawa. Ajaran utamanya dikenal dengan 'Moh Limo' (Tidak melakukan lima hal tercela).",
    facilities: ["Masjid Agung", "Kawasan Religi", "Pasar Arab", "Area Wudhu Luas", "Penginapan"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mampu berjalan di atas air laut saat menyeberang menuju Ampel Denta tanpa perahu.",
      "Mampu menghentikan wabah penyakit mematikan yang saat itu melanda kawasan Surabaya hanya dengan doa dan sebotol air.",
      "Kemampuan mengetahui hal gaib (kasyaf) serta meramalkan kejadian di masa depan dengan tepat."
    ],
    doaKhusus: [
      {
        title: "Tawasul Sunan Ampel",
        text: "Ila hadroti Kanjeng Sunan Ampel, Raden Rahmatullah. Al-Fatihah...",
        translation: "Untuk Kanjeng Sunan Ampel, Raden Rahmatullah. (Lanjutkan membaca surat Al-Fatihah)"
      },
      {
        title: "Doa Keselamatan & Keteguhan Iman",
        text: "Allahumma inni as-aluka bihaqqi waliyyika as-sayyid Rahmatullah, an-tarzuqonii husnal khotimah wa turozziqoni istiqomah.",
        translation: "Ya Allah, aku memohon kepada-Mu dengan perantara kekasih-Mu Sayyid Rahmatullah (Sunan Ampel), agar Engkau mengkaruniakan kepadaku akhir yang baik dan keteguhan iman."
      }
    ]
  },
  {
    id: "wali-3",
    name: "Makhdum Ibrahim",
    title: "Sunan Bonang",
    description: "Pencipta gending Tombo Ati dan berdakwah menggunakan kesenian gamelan.",
    location: {
      lat: -6.8943,
      lng: 112.0620,
      address: "Kutorejo, Kec. Tuban",
      city: "Tuban",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Masjid_Agung_Tuban_Lama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Putra dari Sunan Ampel, beliau menyesuaikan ajaran Islam dengan budaya Jawa melalui instrumen bonang pada gamelan, sehingga mudah diterima masyarakat.",
    facilities: ["Masjid Raya", "Area Parkir Bus", "Toilet Bersih", "Pusat Jajanan"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "wali-4",
    name: "Raden Qasim",
    title: "Sunan Drajat",
    description: "Wali yang sangat fokus pada kepedulian sosial dan pengentasan kemiskinan.",
    location: {
      lat: -6.8770,
      lng: 112.3552,
      address: "Drajat, Paciran",
      city: "Lamongan",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Makam_Sunan_Drajat_Lamongan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Dikenal dengan ajarannya yang menekankan kedermawanan, kerja keras, dan kepedulian terhadap fakir miskin. Beliau menciptakan tembang Pangkur.",
    facilities: ["Museum Sunan Drajat", "Masjid", "Area Parkir Terpadu"],
    openingHours: "07:00 - 22:00 WIB"
  },
  {
    id: "wali-5",
    name: "Ja'far Shadiq",
    title: "Sunan Kudus",
    description: "Panglima perang Demak dan perancang Masjid Menara Kudus yang ikonik.",
    location: {
      lat: -6.8041,
      lng: 110.8405,
      address: "Pejaten, Kauman, Kec. Kota Kudus",
      city: "Kudus",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Masjid_Menara_Kudus_Tampak_Depan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Sunan Kudus banyak mengadopsi budaya Hindu-Buddha dalam arsitektur masjidnya sebagai strategi dakwah kultural.",
    facilities: ["Menara Kudus", "Masjid Al-Aqsha", "Kawasan Ziarah Tertata"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "wali-6",
    name: "Muhammad Ainul Yaqin",
    title: "Sunan Giri",
    description: "Pendiri Kedatuan Giri yang menjadi pusat pendidikan Islam internasional pada masanya.",
    location: {
      lat: -7.1738,
      lng: 112.6300,
      address: "Jl. Sunan Giri, Kebomas",
      city: "Gresik",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Giri Kedaton menjadi pusat penyebaran Islam hingga ke Maluku dan Nusa Tenggara. Sunan Giri juga menciptakan permainan anak-anak berbau Islam seperti Jelungan dan Cublak-Cublak Suweng.",
    facilities: ["Undakan Tangga Sejarah", "Masjid", "Area Kios Khas Gresik"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "wali-7",
    name: "Raden Sahid",
    title: "Sunan Kalijaga",
    description: "Wali paling populer yang menggunakan wayang kulit dan tembang untuk dakwah.",
    location: {
      lat: -6.8988,
      lng: 110.6409,
      address: "Kadilangu, Kec. Demak",
      city: "Demak",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Sunan Kalijaga memasukkan nilai-nilai Islam ke dalam tradisi lokal. Beliau menciptakan tokoh Punakawan dan tembang Ilir-Ilir.",
    untoldStory: "Dalam sebuah manuskrip kuno yang tersimpan rapat, disebutkan bahwa Sunan Kalijaga memiliki kemampuan untuk 'melipat bumi' (Syi'ir Tayyul Ardh) saat melakukan perjalanan dari Demak ke Cirebon dalam hitungan detik untuk menghadiri pertemuan rahasia para Wali. Kisah ini dijaga lisan secara turun temurun oleh para kuncen keraton.",
    facilities: ["Masjid Sunan Kalijaga", "Pusat Ziarah", "Sentra Oleh-oleh Demak"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "wali-8",
    name: "Raden Umar Said",
    title: "Sunan Muria",
    description: "Berdakwah di daerah pegunungan yang terpencil dan merakyat.",
    location: {
      lat: -6.6499,
      lng: 110.8920,
      address: "Colo, Dawe",
      city: "Kudus",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Wisata_Religi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Menyasar masyarakat pesisir, petani, dan pedagang kecil. Beliau menciptakan tembang Sinom dan Kinanthi.",
    facilities: ["Ojek Pegunungan", "Masjid Kuno", "Sumber Air Gentong"],
    openingHours: "06:00 - 20:00 WIB"
  },
  {
    id: "wali-9",
    name: "Syarif Hidayatullah",
    title: "Sunan Gunung Jati",
    description: "Pendiri Kesultanan Cirebon dan Banten, satu-satunya Wali Songo yang juga seorang raja.",
    location: {
      lat: -6.6601,
      lng: 108.5369,
      address: "Astana, Gunungjati",
      city: "Cirebon",
      province: "Jawa Barat"
    },
    category: "Walisongo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Memajukan perdagangan dan menyebarkan Islam di Jawa Barat. Menjalin hubungan baik dengan berbagai etnis termasuk Tionghoa.",
    facilities: ["Kompleks Makam Kesultanan", "Masjid", "Guci Kuno", "Pasar Ziarah"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-1",
    name: "Abdurrahman Wahid",
    title: "Gus Dur",
    description: "Presiden ke-4 RI dan tokoh pluralisme yang sangat dihormati.",
    location: {
      lat: -7.5332,
      lng: 112.2341,
      address: "Pesantren Tebuireng, Kec. Diwek",
      city: "Jombang",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Museum_Islam_Indonesia1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    history: "Cucu pendiri NU KH Hasyim Asy'ari. Dikenal dengan pemikirannya yang humanis dan perjuangannya membela kelompok minoritas.",
    facilities: ["Masjid Pesantren", "Museum Hasyim Asy'ari", "Perpustakaan", "Pusat Ziarah Tertata"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "habib-1",
    name: "Habib Ali bin Abdurrahman Alhabsyi",
    title: "Habib Ali Kwitang",
    description: "Ulama karismatik penggerak dakwah di tanah Betawi.",
    location: {
      lat: -6.1843,
      lng: 106.8407,
      address: "Kwitang, Kec. Senen",
      city: "Jakarta Pusat",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Masjid_Alhidayah_Kwitang_-_panoramio.jpg?width=800",
    history: "Mendirikan Majelis Taklim Kwitang yang menjadi pusat penyebaran Islam yang damai di Jakarta dan sekitarnya.",
    facilities: ["Majelis Taklim Kwitang", "Masjid Al-Riyadh", "Area Parkir"],
    openingHours: "08:00 - 17:00 WIB (Ramai Minggu Pagi)"
  },
  {
    id: "ulama-2",
    name: "KH Muhammad Zaini Abdul Ghani",
    title: "Abah Guru Sekumpul",
    description: "Ulama kharismatik dari Kalimantan Selatan yang majelisnya dihadiri jutaan jamaah.",
    location: {
      lat: -3.4357,
      lng: 114.8576,
      address: "Komp. Ar-Raudhah, Sekumpul, Martapura",
      city: "Banjar",
      province: "Kalimantan Selatan"
    },
    category: "Ulama Nusantara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Jemaah_Haul_ke-15_Guru_Sekumpul_2.jpg?width=800",
    history: "Dikenal luas sebagai waliyullah dari tanah Banjar. Beliau menyebarkan ajaran tasawuf dan kecintaan mendalam kepada Nabi Muhammad SAW melalui pembacaan Maulid Habsyi.",
    untoldStory: "Beberapa murid terdekat bersaksi bahwa pada malam-malam tertentu sebelum wafatnya, ruang suluk Abah Guru memancarkan aroma kasturi yang sangat kuat hingga tercium ke jalanan Sekumpul, sebuah tanda dari para tamu langit yang tak kasat mata.",
    facilities: ["Musholla Ar-Raudhah", "Kubah Makam", "Area Peziarah Luas", "Pusat Perbelanjaan Sekumpul"],
    openingHours: "08:00 - 18:00 WIB (Diatur Khusus)",
    karomah: [
      "Aroma harum semerbak (bau wangi) yang kerap muncul dari tubuh dan kamar beliau meskipun tanpa minyak wangi.",
      "Mampu menyembuhkan penyakit medis parah hanya dengan air putih yang beliau doakan.",
      "Kasyaf atau kemampuan mengetahui maksud hati para peziarah sebelum mereka sempat berbicara."
    ],
    doaKhusus: [
      {
        title: "Tawasul Abah Guru Sekumpul",
        text: "Ila hadroti Syekh Muhammad Zaini bin Abdul Ghani Al-Banjari (Guru Sekumpul). Al-Fatihah...",
        translation: "Untuk Syekh Muhammad Zaini bin Abdul Ghani Al-Banjari. (Lanjutkan membaca surat Al-Fatihah)"
      }
    ]
  },
  {
    id: "ulama-3",
    name: "Syekh Abdurrauf As-Singkili",
    title: "Teungku Syiah Kuala",
    description: "Mufti besar Kesultanan Aceh dan ulama pelopor Tarekat Syattariyah di Nusantara.",
    location: {
      lat: 5.5878,
      lng: 95.3333,
      address: "Deah Raya, Kec. Syiah Kuala",
      city: "Banda Aceh",
      province: "Aceh"
    },
    category: "Ulama Nusantara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Academic_activity_center_of_Syiah_Kuala_University.jpg?width=800",
    history: "Menerjemahkan Al-Qur'an pertama ke dalam bahasa Melayu (Tarjuman al-Mustafid). Makamnya terletak di dekat muara sungai (kuala) dan tidak hancur saat Tsunami 2004.",
    facilities: ["Masjid Jami'", "Kompleks Makam Bersejarah", "Pusat Studi Islam"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-4",
    name: "Syekh Yusuf Abul Mahasin Tajul Khalwati",
    title: "Syekh Yusuf Al-Makassari",
    description: "Pahlawan Nasional, Ulama Sufi yang berdakwah dari Gowa, Banten, Srilanka, hingga Afrika Selatan.",
    location: {
      lat: -5.2064,
      lng: 119.4533,
      address: "Jl. Syekh Yusuf, Ko'bang, Kec. Somba Opu",
      city: "Gowa",
      province: "Sulawesi Selatan"
    },
    category: "Ulama Nusantara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Masjid_Syekh_Muhammad_Yusuf_20220626_151617.jpg?width=800",
    history: "Diasingkan Belanda ke Afrika Selatan dan menjadi peletak dasar agama Islam di Cape Town. Jenazahnya dibawa kembali ke Gowa atas permintaan Sultan.",
    facilities: ["Kubah Makam Syekh Yusuf", "Masjid", "Area Parkir"],
    openingHours: "07:00 - 18:00 WITA"
  }
];
