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
  imageSource?: string;
  history: string;
  facilities: string[];
  openingHours: string;
  era?: string;
  sanad?: string;
  karya?: string[];
  references?: string[];
  karomah?: string[];
  untoldStory?: string;
  haulSchedule?: string;
  localAdab?: string;
  doaKhusus?: {
    title: string;
    text: string;
    translation?: string;
  }[];
}

export const ziarahSites: ZiarahSite[] = [
  // =========================================================================
  // I. DEWAN WALISONGO (9 WALI UTAMA TANAH JAWA)
  // =========================================================================
  {
    id: "wali-1",
    name: "Syekh Maulana Malik Ibrahim (Makdum Ibrahim As-Samarqandi)",
    title: "Sunan Gresik (Syekh Maghribi)",
    description: "Ketua Dewan Walisongo generasi pertama, pelopor dakwah Islam di pesisir utara Jawa melalui tata niaga, pengobatan gratis, dan irigasi pertanian.",
    location: {
      lat: -7.1643,
      lng: 112.6565,
      address: "Jl. Malik Ibrahim No. 52-62, Gapuro Sukolilo, Kec. Gresik",
      city: "Gresik",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    era: "Abad ke-14 – Awal Abad ke-15 M (Wafat 12 Rabiul Awal 822 H / 8 April 1419 M)",
    sanad: "Jaringan Ulama Hadramaut, Gujarat, & Samarkand; Ayahanda Sunan Ampel dan leluhur para Walisongo",
    karya: [
      "Sistem irigasi pertanian Leran & pesisir Gresik",
      "Asrama pendidikan Islam pertama di Desa Sembalo (Leran)",
      "Metode dakwah bil-hikmah tanpa menghapus adat Jawa Kuno"
    ],
    references: [
      "Inskripsi Batu Nisan Marmer Cambay Gapurasukolilo Gresik (822 H / 1419 M)",
      "Sunyoto, Agus (2016). Atlas Wali Songo: Buku Pertama yang Mengungkap Wali Songo Sebagai Fakta Sejarah. Pustaka IIMaN.",
      "Drewes, G.W.J. (1968). New Light on the Coming of Islam to Indonesia. Bijdragen tot de Taal-, Land- en Volkenkunde.",
      "Wikipedia Bahasa Indonesia: Maulana Malik Ibrahim"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg",
    imageSource: "Wikimedia Commons — Kompleks Makam Syekh Maulana Malik Ibrahim, Gresik",
    history: "Syekh Maulana Malik Ibrahim (dikenal juga sebagai Kakek Bantal) mendarat di Desa Sembalo, Leran, Kecamatan Manyar sekitar tahun 1371 M pada masa pemerintahan Raja Hayam Wuruk (Majapahit). Beliau menghapus sekat kasta sosial dengan merangkul rakyat jelata, mengajarkan teknik bercocok tanam di tanah tandus, membuka pengobatan herbal cuma-cuma, serta mendirikan masjid dan pesantren pertama di Tanah Jawa hingga wafat tahun 1419 M.",
    untoldStory: "Menurut catatan epigrafi nisan marmer yang didatangkan dari Khambhat (Gujarat), Syekh Maulana Malik Ibrahim bergelar 'Umdat as-Salikin' (Tiang Para Penempuh Jalan Spiritual) dan 'Bantal bagi Para Fakir Miskin'. Tradisi lisan masyarakat Gresik mengisahkan beliau pernah memohon hujan di tengah kemarau panjang hingga muncul mata air tawar di dekat pesisir payau.",
    facilities: ["Masjid Maulana Malik Ibrahim", "Area Parkir Bus & Mobil", "Toilet & Tempat Wudhu", "Sentra Oleh-Oleh Pudak & Otak-otak Bandeng", "Pendopo Peziarah"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mengubah tanah tandus dan berair payau di pesisir Gresik menjadi lahan pertanian subur melalui doa dan rekayasa saluran air.",
      "Menyembuhkan wabah penyakit masyarakat Majapahit pesisir dengan ramuan daun dan doa Al-Fatihah.",
      "Turunnya hujan deras seketika saat masyarakat berniat mengorbankan seorang gadis dalam ritual kuno meminta hujan."
    ],
    doaKhusus: [
      {
        title: "Tawasul Syekh Maulana Malik Ibrahim",
        text: "إِلَى حَضْرَةِ الشَّيْخِ مَوْلَانَا مَالِكِ إِبْرَاهِيمَ المَغْرِبِيِّ قَدَّسَ اللهُ سِرَّهُ العَزِيزَ، الفَاتِحَة...",
        translation: "Kepada kehadirat Syekh Maulana Malik Ibrahim Al-Maghribi, semoga Allah mensucikan rahasia kemuliaannya. Al-Fatihah..."
      }
    ]
  },
  {
    id: "wali-2",
    name: "Sayyid Ali Rahmatullah (Raden Rahmat)",
    title: "Sunan Ampel",
    description: "Sesepuh Dewan Walisongo, pendiri Pesantren Ampel Denta Surabaya, dan pencetus falsafah etika sosial 'Moh Limo'.",
    location: {
      lat: -7.2285,
      lng: 112.7397,
      address: "Jl. Ampel Masjid No. 53, Ampel, Kec. Semampir",
      city: "Surabaya",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    era: "Abad ke-15 M (1401 – 1481 M)",
    sanad: "Putra Syekh Ibrahim Asmoroqondi & Dewi Candrawulan (Putri Raja Champa); Mahaguru bagi Sunan Bonang, Sunan Drajat, Sunan Giri, Raden Fattah, dan Sunan Kalijaga",
    karya: [
      "Falsafah Moral 'Moh Limo' (Moh Main, Moh Ngombe, Moh Madat, Moh Maling, Moh Madon)",
      "Pendirian Masjid Agung Sunan Ampel (1421 M) berarsitektur Jawa-Islam",
      "Jaringan kaderisasi Pesantren Ampel Denta"
    ],
    references: [
      "Babad Tanah Jawi & Babad Ngampeldenta",
      "Ricklefs, M.C. (2008). A History of Modern Indonesia since c. 1200. Stanford University Press.",
      "Jurnal Sejarah & Kebudayaan Islam UIN Sunan Ampel Surabaya: Peran Pesantren Ampel Denta dalam Islamisasi Nusantara",
      "Wikipedia Bahasa Indonesia: Sunan Ampel"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Makam_Sunan_Ampel.jpg",
    imageSource: "Wikimedia Commons — Kompleks Makam Kanjeng Sunan Ampel, Surabaya",
    history: "Raden Rahmat tiba di Jawa dari Champa sekitar tahun 1440 M dan dianugerahi tanah perdikan di kawasan rawa Ampel Denta oleh Prabu Brawijaya V (Majapahit). Beliau mengubah kawasan rawa tersebut menjadi pusat pendidikan Islam terbesar pada abad ke-15. Di Pesantren Ampel Denta inilah lahir cetak biru Kesultanan Demak Bintoro dan strategi dakwah kultural seluruh anggota Walisongo.",
    untoldStory: "Di sebelah kompleks makam Sunan Ampel terdapat makam Mbah Sholeh, seorang santri penjaga kebersihan masjid yang wafat sembilan kali. Setiap kali Mbah Sholeh wafat, tak ada santri lain yang sanggup menyapu masjid sebersih beliau hingga Sunan Ampel berucap 'Seandainya Sholeh masih hidup', dan atas izin Allah Mbah Sholeh hidup kembali hingga sembilan kuburannya berjajar sampai kini.",
    facilities: ["Masjid Agung Sunan Ampel (Berdiri 1421 M)", "Sumur Karomah Nadzir", "Pasar Gubah & Lorong Arab Ampel", "Area Wudhu & Toilet Terpadu", "Parkir Bus Pegirian"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Kisah Mbah Sholeh (penjaga kebersihan Masjid Ampel) yang hidup kembali hingga 9 kali atas doa dan ucapan Kanjeng Sunan Ampel.",
      "Mbah Sonhaji (Mbah Bolong) yang melubangi dinding pengimaman Masjid Ampel dan memperlihatkan bangunan Ka'bah secara nyata di Makkah sebagai bukti presisi arah kiblat.",
      "Berjalan di atas permukaan air sungai dan laut saat menuju kawasan rawa Ampel Denta."
    ],
    doaKhusus: [
      {
        title: "Tawasul Kanjeng Sunan Ampel",
        text: "إِلَى حَضْرَةِ سَيِّدِنَا الشَّيْخِ السَّيِّدِ عَلِي رَحْمَةُ اللهِ (سُونَانْ أَمْفِيلْ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Junjungan kami Syekh Sayyid Ali Rahmatullah (Sunan Ampel). Al-Fatihah..."
      },
      {
        title: "Doa Keteguhan Iman & Husnul Khotimah",
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ وَلِيِّكَ السَّيِّدِ رَحْمَةُ اللهِ أَنْ تَرْزُقَنِي حُسْنَ الخَاتِمَةِ وَالِاسْتِقَامَةَ.",
        translation: "Ya Allah, aku memohon kepada-Mu dengan wasilah kekasih-Mu Sayyid Rahmatullah (Sunan Ampel), karuniakanlah kepadaku husnul khotimah dan keistiqomahan."
      }
    ]
  },
  {
    id: "wali-3",
    name: "Syekh Maulana Makhdum Ibrahim",
    title: "Sunan Bonang",
    description: "Maestro suluk sastra pesisir, pencipta gending dakwah 'Tombo Ati', dan pengarang Suluk Wujil.",
    location: {
      lat: -6.8943,
      lng: 112.0620,
      address: "Jl. KH. Mustain, Kutorejo, Kec. Tuban (Barat Alun-Alun Tuban)",
      city: "Tuban",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    era: "Abad ke-15 – Awal Abad ke-16 M (1465 – 1525 M)",
    sanad: "Putra Sunan Ampel & Nyai Ageng Manila; Berguru kepada Syekh Maulana Ishaq di Pasai; Guru utama Sunan Kalijaga",
    karya: [
      "Suluk Wujil (naskah tasawuf Jawa Kuno tersimpan di Perpustakaan Universitas Leiden)",
      "Suluk Kaderesan, Suluk Regol, & Suluk Bentur",
      "Tembang Tombo Ati & Gending Dharma (bonang gamelan)"
    ],
    references: [
      "Schrieke, B.J.O. (1916). Het Boek van Bonang (Disertasi Universitas Leiden).",
      "Drewes, G.W.J. (1969). The Admonitions of Seh Bari. Bibliotheca Indonesica.",
      "Wikipedia Bahasa Indonesia: Sunan Bonang"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Sunan_Bonang-BW.png",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Arsip Lukisan Sejarah Sunan Bonang, Tuban",
    history: "Sunan Bonang adalah putra Sunan Ampel dari perkawinannya dengan Nyai Ageng Manila (putri Arya Teja, Bupati Tuban). Setelah mendalami tasawuf di Pasai bersama Sunan Giri, beliau memusatkan dakwahnya di Tuban. Beliau menggubah pakem gamelan Jawa dengan instrumen bonang serta menulis karya-karya suluk sastra tingkat tinggi yang memadukan tasawuf Al-Ghazali dengan estetika Jawa.",
    untoldStory: "Naskah Suluk Wujil mengabadikan wejangan rahasia Sunan Bonang kepada Wujil (mantan abdi keraton Majapahit) tentang hakikat pengenalan diri ('Man arafa nafsahu faqad arafa Rabbahu') dan rahasia ibadah sejati.",
    facilities: ["Masjid Agung Tuban", "Pendopo & Gapura Paduraksa Kuno", "Museum Kambang Putih", "Area Parkir Pantai Boom Tuban", "Pusat Kuliner & Souvenir"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mengubah buah pohon aren menjadi emas berkilauan saat menyadarkan Raden Sahid (kelak menjadi Sunan Kalijaga) di tepi sungai.",
      "Alunan tabuhan gamelan bonang beliau membuat masyarakat yang mendengarnya luluh hatinya dan berbondong-bondong mengucapkan syahadat.",
      "Memunculkan mata air tawar di tepi pantai dengan menancapkan tongkatnya."
    ],
    doaKhusus: [
      {
        title: "Syair & Doa Tombo Ati (Warisan Sunan Bonang)",
        text: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ القُلُوبِ وَدَوَائِهَا، وَعَافِيَةِ الأَبْدَانِ وَشِفَائِهَا، وَنُورِ الأَبْصَارِ وَضِيَائِهَا.",
        translation: "Ya Allah limpahkanlah rahmat kepada junjungan kami Nabi Muhammad SAW, sang penyembuh dan obat hati, penyehat badan, serta cahaya mata hati."
      }
    ]
  },
  {
    id: "wali-4",
    name: "Raden Qasim (Syarifuddin)",
    title: "Sunan Drajat",
    description: "Pelopor dakwah filantropi Islam dan ketahanan sosial melalui filosofi 'Catur Piwulang' di pesisir Paciran, Lamongan.",
    location: {
      lat: -6.8770,
      lng: 112.3552,
      address: "Desa Drajat, Kec. Paciran",
      city: "Lamongan",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    era: "Abad ke-15 – ke-16 M (1470 – 1522 M)",
    sanad: "Putra bungsu Sunan Ampel & Nyai Ageng Manila; Adik kandung Sunan Bonang",
    karya: [
      "Falsafah 'Catur Piwulang' (Empat Ajaran Kemanusiaan)",
      "Tembang Macapat Pangkur (mengajak manusia menjauhi hawa nafsu)",
      "Gamelan Singo Mengkok & desain rumah panggung Joglo Drajat"
    ],
    references: [
      "Inskripsi Kayu Cungkup Makam Sunan Drajat (Sengkalan Memet)",
      "Jurnal Penelitian Sejarah & Budaya Balai Pelestarian Nilai Budaya (BPNB) Jawa Timur",
      "Wikipedia Bahasa Indonesia: Sunan Drajat"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Makam_Sunan_Drajat_Lamongan.jpg",
    imageSource: "Wikimedia Commons — Kompleks Makam Sunan Drajat, Paciran, Lamongan",
    history: "Raden Qasim diperintahkan ayahandanya, Sunan Ampel, untuk berdakwah di pesisir barat Gresik (Desa Jelag, Paciran). Beliau mendirikan Pesantren Dalem Duwur di atas perbukitan Drajat dan mendapat gelar Sunan Mayang Madu dari Sultan Demak pada tahun 1520 M atas keberhasilannya mengentaskan kemiskinan masyarakat pesisir.",
    untoldStory: "Di dinding makam Sunan Drajat terukir 'Catur Piwulang' yang melegenda: (1) Wenehono teken marang wong kang wuto (Berilah tongkat pada orang buta), (2) Wenehono mangan marang wong kang luwe (Berilah makan pada orang lapar), (3) Wenehono iyup marang wong kang kaudanan (Berilah teduhan pada orang kehujanan), (4) Wenehono busono marang wong kang wudo (Berilah pakaian pada orang tak berpakaian).",
    facilities: ["Museum Sunan Drajat", "Masjid Jami' Sunan Drajat", "Pondok Pesantren Sunan Drajat", "Area Parkir Bus Luas", "Kios Batik & Kerajinan Paciran"],
    openingHours: "07:00 - 22:00 WIB",
    karomah: [
      "Diselamatkan oleh ikan cucut dan ikan talang saat perahunya pecah dihantam badai laut di perairan Lamongan hingga mendarat selamat di Desa Jelag.",
      "Mengeluarkan air jernih dari bekas cabutan pohon lengkeng di puncak bukit Drajat yang kini menjadi Sumur Lengsanga."
    ],
    doaKhusus: [
      {
        title: "Tawasul Kanjeng Sunan Drajat",
        text: "إِلَى حَضْرَةِ الشَّيْخِ شَرِيفِ الدِّينِ رَادِينْ قَاسِمْ (سُونَانْ دَرَاجَاتْ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Syekh Syarifuddin Raden Qasim (Sunan Drajat). Al-Fatihah..."
      }
    ]
  },
  {
    id: "wali-5",
    name: "Sayyid Ja'far Shadiq Azmatkhan",
    title: "Sunan Kudus",
    description: "Ulama ahli fikih, hakim agung Kesultanan Demak, dan arsitek akulturasi Masjid Al-Aqsha Menara Kudus.",
    location: {
      lat: -6.8041,
      lng: 110.8405,
      address: "Jl. Menara, Pejaten, Kauman, Kec. Kota Kudus",
      city: "Kudus",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    era: "Abad ke-16 M (Wafat 5 Mei 1550 M)",
    sanad: "Putra Raden Usman Haji (Sunan Ngudung) & Syarifah Ruhil (Putri Sunan Ampel); Murid Sunan Kalijaga & Kyai Telingsing",
    karya: [
      "Arsitektur Masjid Al-Aqsha & Menara Kudus (956 H / 1549 M)",
      "Tradisi Toleransi Larangan Menyembelih Sapi di Kudus",
      "Tembang Maskumambang & Mijil"
    ],
    references: [
      "Prasasti Batu Mihrab Masjid Al-Aqsha Kudus (956 H / 1549 M)",
      "Guillot, Claude (1985). La mosquée de Kudus. Archipel.",
      "Castles, Lance (1967). Religion, Politics, and Economic Behavior in Java: The Kudus Cigarette Industry. Yale University.",
      "Wikipedia Bahasa Indonesia: Sunan Kudus"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Masjid_Menara_Kudus_Tampak_Depan.jpg",
    imageSource: "Wikimedia Commons — Masjid Al-Aqsha & Menara Kudus (Peninggalan Sunan Kudus, 1549 M)",
    history: "Sayyid Ja'far Shadiq bergelar 'Waliyyul Ilmi' karena kedalaman ilmu fikih, tauhid, dan hadisnya. Beliau mendirikan Masjid Al-Aqsha pada 956 H (1549 M) dengan menara bata merah bergaya candi Jawa-Hindu dan melarang penyembelihan sapi demi menghormati perasaan masyarakat Hindu Kudus kala itu, menggantinya dengan kerbau.",
    untoldStory: "Batu padas di mihrab Masjid Menara Kudus dibawa langsung oleh Sunan Kudus dari Baitul Maqdis (Yerusalem) saat beliau menimba ilmu dan membantu meredakan wabah penyakit di tanah Palestina. Dari kata 'Al-Quds' itulah lahir nama kota 'Kudus'.",
    facilities: ["Masjid Al-Aqsha & Menara Kudus", "Tempat Wudhu Pancuran 8 (Asta Sanghika Marga)", "Terminal Wisata Bakalan Krapyak", "Sentra Jenang & Bordir Kudus"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Meredakan wabah penyakit di tanah Baitul Maqdis melalui doa hingga diberi hadiah batu prasasti oleh Amir Palestina.",
      "Memenangkan perdebatan ilmu dan adu kesaktian spiritual secara santun sehingga para pendeta dan bangsawan lokal memeluk Islam tanpa paksaan."
    ],
    doaKhusus: [
      {
        title: "Tawasul Sunan Kudus",
        text: "إِلَى حَضْرَةِ الشَّيْخِ سَيِّدِ جَعْفَرْ صَادِقْ (سُونَانْ قُدُوسْ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Syekh Sayyid Ja'far Shadiq (Sunan Kudus). Al-Fatihah..."
      }
    ]
  },
  {
    id: "wali-6",
    name: "Raden Paku (Sultan Abdul Faqih / Prabu Satmata)",
    title: "Sunan Giri",
    description: "Raja-Ulama pendiri Giri Kedaton yang menyebarkan dakwah Islam hingga Lombok, Kalimantan, Sulawesi, Maluku, dan Ternate.",
    location: {
      lat: -7.1738,
      lng: 112.6300,
      address: "Jl. Sunan Giri, Pedukuhan, Kebomas, Kec. Kebomas",
      city: "Gresik",
      province: "Jawa Timur"
    },
    category: "Walisongo",
    era: "Abad ke-15 – Awal Abad ke-16 M (1442 – 1506 M)",
    sanad: "Putra Syekh Maulana Ishaq & Dewi Sekardadu (Putri Raja Blambangan); Murid sekaligus menantu Sunan Ampel",
    karya: [
      "Pusat Pemerintahan & Pendidikan Islam Giri Kedaton (1487 M)",
      "Tembang Asmaradana & Pucung",
      "Permainan edukatif anak: Cublak-Cublak Suweng, Jamuran, & Jelungan",
      "Penataan Kalender Jawa-Islam"
    ],
    references: [
      "De Graaf, H.J. & Pigeaud, Th.G.Th. (1974). De Eerste Moslimse Vorstendommen op Java. KITLV.",
      "Babad Gresik & Serat Centhini",
      "Wikipedia Bahasa Indonesia: Sunan Giri"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg",
    imageSource: "Wikimedia Commons — Gapura Paduraksa & Undakan Makam Sunan Giri, Kebomas, Gresik",
    history: "Raden Paku (Joko Samudro) ditemukan saat bayi di Selat Bali oleh kapal dagang Nyai Ageng Pinatih (Syahbandar Gresik). Setelah berguru kepada Sunan Ampel dan Syekh Maulana Ishaq di Pasai, beliau mendirikan Giri Kedaton di puncak Bukit Giri pada tahun 1487 M. Santri-santri Giri Kedaton menjadi mubaligh utama di Indonesia bagian timur seperti Datuk Ri Bandang dan Sultan Zainal Abidin (Ternate).",
    untoldStory: "Ketika pasukan Majapahit menyerang Bukit Giri, Sunan Giri yang sedang menulis kitab melemparkan pena (kalam) kayunya sambil berdoa. Pena itu berubah menjadi keris pusaka 'Kalamunyeng' yang berhasil memukul mundur pasukan lawan tanpa pertumpahan darah besar.",
    facilities: ["Cungkup Ukiran Kayu Jati Kuno", "Masjid Besar Ainul Yaqin Sunan Giri", "Tangga Batu Bersejarah & Ojek Wisata", "Museum & Parkir Terpadu Giri"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Saat masih bayi dalam peti di tengah Selat Bali, peti Raden Paku memancarkan cahaya terang dan membuat kapal dagang Nyai Ageng Pinatih berhenti berputar-putar.",
      "Pena tulis beliau berubah menjadi Keris Kalamunyeng untuk mempertahankan Pesantren Giri Kedaton.",
      "Memindahkan segenggam tanah dari Pasai untuk menentukan lokasi bukit yang kelak memiliki bau dan warna tanah serupa di Kebomas Gresik."
    ]
  },
  {
    id: "wali-7",
    name: "Raden Mas Said (Syekh Malaya)",
    title: "Sunan Kalijaga",
    description: "Budayawan agung Walisongo yang mengislamkan masyarakat Jawa melalui wayang kulit, gamelan Sekaten, dan Kidung Rumeksa ing Wengi.",
    location: {
      lat: -6.8988,
      lng: 110.6409,
      address: "Jl. Raden Sahid, Kadilangu, Kec. Demak",
      city: "Demak",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    era: "Abad ke-15 – ke-16 M (sekitar 1450 – 1586 M)",
    sanad: "Putra Tumenggung Wilatikta (Bupati Tuban); Murid utama Sunan Bonang, Sunan Ampel, dan Sunan Gunung Jati; Guru spiritual Sultan Pajang & Panembahan Senopati (Mataram)",
    karya: [
      "Tembang Lir-Ilir, Gundul-Gundul Pacul, & Dhandhanggula",
      "Kidung Rumeksa ing Wengi (Doa Perlindungan Malam)",
      "Lakon Wayang Kalimasada, Dewa Ruci, Petruk Dadi Ratu, & Gamelan Sekaten",
      "Soko Tatal Masjid Agung Demak & Baju Takwa"
    ],
    references: [
      "Geertz, Clifford (1960). The Religion of Java. University of Chicago Press.",
      "Woodward, Mark R. (1989). Islam in Java: Normative Piety and Mysticism in the Sultanate of Yogyakarta.",
      "Babad Demak & Serat Lokapala",
      "Wikipedia Bahasa Indonesia: Sunan Kalijaga"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg",
    imageSource: "Wikimedia Commons — Serambi Masjid Agung Demak & Poros Dakwah Sunan Kalijaga",
    history: "Lahir sebagai bangsawan Tuban bernama Raden Mas Said, beliau meninggalkan kemewahan istana untuk membela rakyat kecil yang tercekik pajak (dikenal sebagai Brandal Lokajaya) sebelum disadarkan oleh Sunan Bonang. Setelah bertafakur di tepi sungai ('Kali Jaga'), beliau menjadi wali yang paling dekat dengan hati masyarakat Jawa dari pesisir hingga pedalaman Mataram.",
    untoldStory: "Saat pembangunan Masjid Agung Demak kekurangan satu tiang utama (Soko Guru) tepat sehari sebelum peresmian, Sunan Kalijaga mengumpulkan serpihan-serpihan kayu sisa (tatal), mengikatnya, lalu bermunajat sepanjang malam hingga serpihan kayu tersebut menyatu kokoh menjadi 'Soko Tatal'.",
    facilities: ["Kompleks Makam Kadilangu", "Masjid Sunan Kalijaga Kadilangu", "Pendopo Notobratan", "Area Parkir Luas & Sentra Jambu Demak"],
    openingHours: "Buka 24 Jam (Cungkup Utama Buka sesuai Jadwal Yayasan Kadilangu)",
    karomah: [
      "Menyatukan serpihan kayu (tatal) menjadi tiang utama Soko Tatal di Masjid Agung Demak hanya dalam satu malam melalui munajat.",
      "Menentukan arah kiblat Masjid Agung Demak dengan memegang pucuk Masjidil Haram di tangan kanan dan pucuk kubah Masjid Demak di tangan kiri.",
      "Bertafakur menjaga tongkat Sunan Bonang di tepi sungai selama bertahun-tahun hingga tubuhnya dirambati tumbuhan tanpa bergeming."
    ],
    doaKhusus: [
      {
        title: "Tawasul Kanjeng Sunan Kalijaga",
        text: "إِلَى حَضْرَةِ الشَّيْخِ مَلَايَا رَادِينْ شَهِيدْ (سُونَانْ كَالِي جَاغَا)، الفَاتِحَة...",
        translation: "Kepada kehadirat Syekh Malaya Raden Sahid (Sunan Kalijaga). Al-Fatihah..."
      }
    ]
  },
  {
    id: "wali-8",
    name: "Raden Umar Said (Raden Prawoto)",
    title: "Sunan Muria",
    description: "Putra Sunan Kalijaga yang berdakwah di lereng Gunung Muria, membimbing petani, nelayan, dan pelestari ekologi hutan.",
    location: {
      lat: -6.6499,
      lng: 110.8920,
      address: "Desa Colo, Kec. Dawe, Lereng Gunung Muria",
      city: "Kudus",
      province: "Jawa Tengah"
    },
    category: "Walisongo",
    era: "Abad ke-16 M",
    sanad: "Putra Sunan Kalijaga & Dewi Saroh binti Maulana Ishaq; Keponakan Sunan Giri",
    karya: [
      "Tembang Macapat Sinom & Kinanthi",
      "Ajaran konservasi alam lereng Gunung Muria (pelestarian Parijoto & Pakis Haji)",
      "Tradisi kenduri dan sedekah hasil bumi bernafaskan doa Islam"
    ],
    references: [
      "Jurnal Kebudayaan Islam IAIN Kudus: Ekoteologi dalam Tradisi Dakwah Sunan Muria",
      "Babad Tanah Jawi",
      "Wikipedia Bahasa Indonesia: Sunan Muria"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Wisata_Religi.jpg",
    imageSource: "Wikimedia Commons — Kawasan Wisata Religi Lereng Gunung Muria, Colo, Kudus",
    history: "Berbeda dengan para wali yang berdakwah di pusat kota kerajaan, Sunan Muria memilih bermukim di puncak Gunung Muria (ketinggian 1.600 mdpl) di Desa Colo. Beliau membina masyarakat pedalaman, petani gunung, dan nelayan sepanjang teluk Jepara-Pati-Kudus dengan pendekatan kesederhanaan, pertanian ramah lingkungan, dan tembang macapat.",
    untoldStory: "Di serambi Masjid Sunan Muria terdapat Gentong Keramat peninggalan beliau yang airnya bersumber dari mata air pegunungan Muria dan sejak ratusan tahun lalu menjadi wasilah doa kesembuhan bagi para peziarah yang mendaki ratusan anak tangga.",
    facilities: ["Masjid Sunan Muria", "700+ Anak Tangga & Pangkalan Ojek Gunung", "Sumber Air Gentong Keramat", "Kios Buah Parijoto & Kopi Muria"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Memancarkan mata air jernih di puncak Gunung Muria yang tidak pernah kering meski musim kemarau panjang.",
      "Doa dan wejangan beliau menjaga keseimbangan ekosistem hutan Gunung Muria dari kerusakan selama berabad-abad."
    ]
  },
  {
    id: "wali-9",
    name: "Syarif Hidayatullah (Sayyid Al-Kamil)",
    title: "Sunan Gunung Jati",
    description: "Wali Qutub sekaligus Sultan pertama Kesultanan Cirebon dan peletak dasar Kesultanan Banten serta Jayakarta.",
    location: {
      lat: -6.6601,
      lng: 108.5369,
      address: "Jl. Alun-Alun Ciledug No. 53, Astana, Kec. Gunungjati",
      city: "Cirebon",
      province: "Jawa Barat"
    },
    category: "Walisongo",
    era: "Abad ke-15 – ke-16 M (1448 – 1568 M)",
    sanad: "Putra Syarif Abdullah Umdatuddin Azmatkhan & Nyai Rara Santang (Putri Prabu Siliwangi Padjadjaran); Murid Syekh Datuk Kahfi, Syekh Athaillah Syadzili (Mesir), & Sunan Ampel",
    karya: [
      "Wasiat Emas 'Ingsun Titip Tajug lan Fakir Miskin' (Aku titipkan langgar/masjid dan fakir miskin)",
      "Pendirian Kesultanan Cirebon (Pakungwati) & Masjid Agung Sang Cipta Rasa (1489 M)",
      "Pengiriman Fatahillah membebaskan Sunda Kelapa (Jayakarta, 1527 M)"
    ],
    references: [
      "Naskah Carita Purwaka Caruban Nagari (Pangeran Arya Carbon, 1720 M)",
      "Naskah Negara Kretabhumi",
      "Djajadiningrat, Hoesein (1913). Critische Beschouwing van de Sadjarah Banten. Disertasi Universitas Leiden.",
      "Wikipedia Bahasa Indonesia: Sunan Gunung Jati"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg",
    imageSource: "Wikimedia Commons — Gerbang Astana Gunung Sembung (Makam Sunan Gunung Jati, Cirebon)",
    history: "Lahir di Makkah/Mesir tahun 1448 M dari pasangan penguasa Mesir Syarif Abdullah dan putri Prabu Siliwangi (Nyai Rara Santang / Syarifah Mudaim). Syarif Hidayatullah memilih kembali ke Nusantara untuk menyebarkan Islam di Tanah Pasundan. Pada 1479 M beliau menggantikan pamannya Pangeran Cakrabuana memimpin Cirebon dan menjadikannya poros maritim Islam yang berdaulat.",
    untoldStory: "Kompleks Astana Gunung Sembung memiliki 9 pintu bertingkat (Lawang Sanga) yang melambangkan sembilan tahapan maqam rohani dalam tasawuf, dihiasi ratusan keramik porselen Dinasti Ming bawaan Putri Ong Tin Nio.",
    facilities: ["Kompleks Astana Gunung Sembung (9 Pintu)", "Masjid Dog Jumeneng", "Sumur Jalatunda & Sumur Kejayaan", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mengubah gumpalan tanah menjadi emas saat diuji keilmuan dan kewaliannya, lalu mengembalikannya menjadi tanah karena kezuhudan beliau.",
      "Menyembuhkan penyakit kusta dan berbagai wabah hanya dengan sentuhan tangan dan doa.",
      "Membuktikan kehamilan semu (bokor kuningan) yang dipasang untuk menguji kewaliannya di hadapan kaisar Tiongkok hingga Putri Ong Tin benar-benar hamil dan menyusul ke Cirebon."
    ],
    doaKhusus: [
      {
        title: "Tawasul Kanjeng Sunan Gunung Jati",
        text: "إِلَى حَضْرَةِ الشَّيْخِ الشَّرِيفِ هِدَايَةُ اللهِ (سُونَانْ غُونُونْغ جَاتِي)، الفَاتِحَة...",
        translation: "Kepada kehadirat Syekh Syarif Hidayatullah (Sunan Gunung Jati). Al-Fatihah..."
      }
    ]
  },

  // =========================================================================
  // II. DKI JAKARTA & TANAH BETAWI (HABAIB, ULAMA & AULIYA)
  // =========================================================================
  {
    id: "habib-1",
    name: "Al-Habib Ali bin Abdurrahman Al-Habsyi",
    title: "Habib Ali Kwitang",
    description: "Ulama kharismatik pelopor Majelis Taklim Kwitang dan pemersatu habaib serta ulama tanah Betawi.",
    location: {
      lat: -6.1843,
      lng: 106.8407,
      address: "Jl. Kramat Kwitang I No. 10, Kwitang, Kec. Senen",
      city: "Jakarta Pusat",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (20 April 1870 – 13 Oktober 1968 M)",
    sanad: "Murid Habib Ali bin Muhammad Al-Habsyi (Pengarang Simthud Durar, Seiwun), Syekh Umar Hamdan Al-Mahrisi, & Habib Utsman bin Yahya",
    karya: [
      "Pendirian Islamic Center Indonesia (ICI) & Majelis Taklim Kwitang (sejak akhir abad ke-19)",
      "Kitab Al-Azhar Al-Wardiyyah fi As-Shuurah An-Nabawiyyah",
      "Pelopor pembacaan Maulid Simthud Durar secara massal di Jawa"
    ],
    references: [
      "Shahab, Alwi (2006). Maria van Engels: Menantu Habib Kwitang. Penerbit Republika.",
      "Jurnal Lektur Keagamaan Kemenag RI: Peran Majelis Taklim Kwitang dalam Jaringan Ulama Betawi",
      "Wikipedia Bahasa Indonesia: Ali bin Abdurrahman Alhabsyi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Habib_ali_kwitang.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Al-Habib Ali bin Abdurrahman Al-Habsyi (Kwitang)",
    history: "Lahir di Kwitang pada 20 Jumadil Awal 1286 H (1870 M), Habib Ali menimba ilmu di Hadramaut dan Haramain selama belasan tahun sebelum kembali ke Batavia. Beliau merintis pengajian Minggu pagi di Kwitang yang dihadiri puluhan ribu jamaah dan melahirkan ratusan majelis taklim murid-murid beliau seperti KH. Abdullah Syafi'i dan KH. Thohir Rohili.",
    untoldStory: "Sebelum Proklamasi 17 Agustus 1945, Bung Karno pernah datang meminta doa restu kepada Habib Ali Kwitang untuk kemerdekaan Republik Indonesia.",
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", "Gedung Majelis Taklim ICI", "Kubah Makam Habib Ali Kwitang", "Kios Kitab & Minyak Wangi"],
    openingHours: "07:00 - 21:00 WIB (Puncak Pengajian: Minggu Pagi 06:00 - 10:00 WIB)",
    karomah: [
      "Kewibawaan dan pancaran mahabbah beliau membuat ratusan orang masuk Islam dan bertaubat hanya dengan memandang wajahnya saat berdoa."
    ]
  },
  {
    id: "habib-2",
    name: "Al-Habib Husein bin Abubakar Alaydrus",
    title: "Habib Husein Luar Batang",
    description: "Waliyullah muda dari Hadramaut yang menjadi benteng spiritual pesisir Sunda Kelapa pada abad ke-18.",
    location: {
      lat: -6.1238,
      lng: 106.8065,
      address: "Jl. Luar Batang V No. 1, Penjaringan, Kec. Penjaringan",
      city: "Jakarta Utara",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    era: "Abad ke-18 M (Wafat 17 Ramadhan 1169 H / 24 Juni 1756 M)",
    sanad: "Jaringan Tarekat Alawiyyin Hadramaut (Tarim - Gujarat - Sunda Kelapa); Bersama muridnya Haji Abdul Kadir",
    karya: [
      "Pendirian Surau / Masjid Keramat Luar Batang (1739 M)",
      "Pembinaan masyarakat pelabuhan Sunda Kelapa di masa kolonial VOC"
    ],
    references: [
      "Heuken, Adolf (2003). Mesjid-mesjid Tua di Jakarta. Yayasan Cipta Loka Caraka.",
      "Van den Berg, L.W.C. (1886). Le Hadhramout et les colonies arabes dans l'archipel indien.",
      "Wikipedia Bahasa Indonesia: Masjid Luar Batang"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/COLLECTIE_TROPENMUSEUM_Moskee_Luar_Batang_%28Batavia%29_TMnr_60046455.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Masjid Keramat Luar Batang Batavia (Habib Husein Alaydrus)",
    history: "Habib Husein tiba di pelabuhan Sunda Kelapa sekitar tahun 1736 M. Beliau sempat menolong seorang tawanan Tionghoa yang hendak dihukum mati oleh VOC, yang kemudian masuk Islam dan diberi nama Haji Abdul Kadir. Karena pengaruhnya yang begitu besar di kalangan pribumi, VOC sempat memenjarakan beliau di Glodok sebelum akhirnya membebaskannya karena keajaiban yang disaksikan sipir.",
    untoldStory: "Saat jenazah Habib Husein hendak dimakamkan di Tanah Abang menggunakan kurung batang, jenazah beliau berulang kali menghilang dari dalam kurung batang dan telah kembali ke surau tempat beliau mengajar. Masyarakat pun sepakat memakamkannya di tempat itu dan menamainya 'Luar Batang' (keluar dari kurung batang).",
    facilities: ["Masjid Jami' Keramat Luar Batang", "Ruang Makam Habib Husein & Haji Abdul Kadir", "Tempat Wudhu & Toilet", "Area Parkir Pelabuhan Sunda Kelapa"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Saat dipenjara VOC di Glodok, sipir Belanda melihat Habib Husein mengimami shalat berjamaah di lapangan luar sementara pintu selnya masih terkunci rapat dari luar.",
      "Jenazah beliau keluar sendiri dari kurung batang (keranda) saat hendak dibawa ke pemakaman Tanah Abang karena menghendaki dimakamkan di surau Luar Batang."
    ],
    doaKhusus: [
      {
        title: "Tawasul Habib Husein Luar Batang",
        text: "إِلَى حَضْرَةِ القُطْبِ الحَبِيبِ حُسَيْنْ بِنْ أَبِي بَكْرٍ العَيْدَرُوسْ (لُوَارْ بَاتَانْغ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Al-Qutb Al-Habib Husein bin Abubakar Alaydrus Luar Batang. Al-Fatihah..."
      }
    ]
  },
  {
    id: "habib-3",
    name: "Al-Habib Hasan bin Muhammad Al-Haddad",
    title: "Mbah Priok (Tanjung Priok)",
    description: "Ulama sufi penyebar Islam di pesisir utara Batavia yang namanya menjadi asal-usul kawasan Tanjung Priok.",
    location: {
      lat: -6.1082,
      lng: 106.8832,
      address: "Jl. Dobo No. 1, Koja, Kawasan Pelabuhan Tanjung Priok",
      city: "Jakarta Utara",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    era: "Abad ke-18 M (1727 – 1756 M)",
    sanad: "Keturunan Al-Imam Abdullah bin Alwi Al-Haddad (Pengarang Ratib Al-Haddad); Berasal dari Palembang (Ulu Sungai Musi)",
    karya: [
      "Dakwah pelayaran selat Sunda & pesisir utara Jawa",
      "Asal-usul toponimi 'Tanjung Priok' dari periuk nasi yang mengapung di laut"
    ],
    references: [
      "Keputusan Gubernur DKI Jakarta tentang Cagar Budaya Makam Habib Hasan bin Muhammad Al-Haddad (Mbah Priok)",
      "Skripsi Fakultas Adab & Humaniora UIN Syarif Hidayatullah Jakarta: Sejarah Situs Makam Mbah Priok",
      "Wikipedia Bahasa Indonesia: Mbah Priok"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/COLLECTIE_TROPENMUSEUM_De_haven_van_Tandjoengpriok_op_de_achtergrond_het_station_Batavia_Java_TMnr_10008011.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Kawasan Bersejarah Tanjung Priok (Situs Makam Mbah Priok)",
    history: "Habib Hasan bin Muhammad Al-Haddad lahir di Palembang tahun 1727 M. Pada tahun 1756 M, dalam pelayaran dakwah menuju tanah Jawa bersama saudaranya Habib Zein, perahu beliau diterjang badai besar dan kehabisan perbekalan hingga beliau wafat di perairan teluk Jakarta.",
    untoldStory: "Periuk penanak nasi dan dayung kayu milik Habib Hasan ikut hanyut ke pantai dan ditancapkan di makamnya. Dayung kayu itu tumbuh menjadi pohon Tanjung dan periuknya selalu muncul kembali di atas makam, sehingga kawasan itu dinamai 'Tanjung Priok'.",
    facilities: ["Kubah & Pendopo Makam Mbah Priok", "Masjid Al-Maqom", "Sumur Keramat Air Tawar di Tepi Laut", "Area Parkir Cagar Budaya"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Saat perbekalan habis di tengah laut, beliau memasukkan batu karang ke dalam periuk (priuk) lalu berdoa hingga berubah menjadi nasi hangat.",
      "Ikan-ikan lumba-lumba dan cucut mengiringi jenazah beliau hingga mendarat di pantai utara Jakarta."
    ]
  },
  {
    id: "habib-4",
    name: "Al-Habib Ahmad bin Alwi Al-Haddad",
    title: "Habib Kuncung (Kalibata)",
    description: "Waliyullah majdzub yang dikenal luas dengan karomah melipat bumi (Tayyul Ardh) dan kopiah meruncingnya.",
    location: {
      lat: -6.2568,
      lng: 106.8501,
      address: "Jl. Rawajati Timur II No. 6, Rawajati, Kec. Pancoran (Kalibata)",
      city: "Jakarta Selatan",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (1838 – 1926 M)",
    sanad: "Murid ayahandanya Habib Alwi Al-Haddad, Habib Abdurrahman bin Abdullah Al-Habsyi (Cikini), & ulama Hadramaut",
    karya: [
      "Teladan kezuhudan dan kedermawanan terhadap fakir miskin di Batavia"
    ],
    references: [
      "Manaqib Al-Arif Billah Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung) — Majelis At-Taubah Kalibata",
      "Jurnal Studi Al-Qur'an & Sejarah Islam UNJ: Tradisi Ziarah Makam Habib Kuncung Kalibata"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Al-Hawi_Mosque%2C_Condet%2C_East_Jakarta_in_2022.jpg",
    imageSource: "Wikimedia Commons — Jaringan Masjid & Majelis Habaib Jakarta Selatan–Timur (Kalibata & Condet)",
    history: "Habib Ahmad bin Alwi Al-Haddad lahir di Qaidun, Hadramaut pada 26 Sya'ban 1254 H (1838 M). Beliau dijuluki 'Habib Kuncung' karena kegemarannya mengenakan kopiah dari Bugis yang ujungnya mengerucut ke atas. Beliau wafat pada 29 Sya'ban 1345 H (1926 M) dan dimakamkan di samping Masjid At-Taubah Kalibata.",
    untoldStory: "Banyak pedagang di Batavia dan Singapura bersaksi bahwa ketika mereka mengalami kesulitan besar di perantauan, Habib Kuncung tiba-tiba hadir menolong mereka padahal di saat bersamaan beliau terlihat sedang duduk di serambi rumah Habib Ali Kwitang.",
    facilities: ["Masjid Jami' At-Taubah Kalibata", "Kubah Makam Habib Kuncung", "Tempat Wudhu & Toilet", "Dekat Stasiun KRL Duren Kalibata"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mampu berada di dua tempat berbeda pada waktu bersamaan (Singapura dan Batavia) untuk menolong jamaah yang kesulitan.",
      "Mengetahui isi hati tamu yang datang sebelum tamu tersebut mengutarakan hajatnya."
    ]
  },
  {
    id: "habib-5",
    name: "Al-Habib Utsman bin Abdullah bin Aqil bin Yahya",
    title: "Habib Utsman bin Yahya (Mufti Betawi)",
    description: "Mufti Agung Batavia abad ke-19 yang produktif menulis lebih dari 116 kitab dalam bahasa Arab dan Melayu Jawi.",
    location: {
      lat: -6.2351,
      lng: 106.9012,
      address: "Kompleks Masjid Al-Abidin, Jl. Pahlawan Revolusi, Pondok Bambu, Kec. Duren Sawit",
      city: "Jakarta Timur",
      province: "DKI Jakarta"
    },
    category: "Habaib",
    era: "Abad ke-19 – Awal Abad ke-20 M (1822 – 1913 M)",
    sanad: "Murid Syekh Ahmad Zaini Dahlan (Mufti Syafi'iyah Makkah), Habib Abdullah bin Umar bin Yahya, & Syekh Rahmatullah Al-Kairanawi",
    karya: [
      "Kitab Sifat Dua Puluh (Tauhid Melayu Betawi)",
      "Kitab Maslakul Akhyar (Kumpulan Doa & Wirid yang masyhur di Betawi)",
      "Kitab Manasik Haji & 116 karya cetak litografi Petamburan"
    ],
    references: [
      "Kaptein, Nico J.G. (2014). Islam, Colonialism and the Modern Age in the Netherlands East Indies: A Biography of Sayyid Usman (1822–1914). Brill.",
      "Azra, Azyumardi (1995). Hadhrami Scholars in the Malay-Indonesian Diaspora. Studia Islamika.",
      "Wikipedia Bahasa Indonesia: Utsman bin Yahya"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/COLLECTIE_TROPENMUSEUM_Moskee_in_Pekodjan_Batavia_TMnr_10016511.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Masjid Kuno Pekojan Batavia (Basis Dakwah Habib Utsman bin Yahya)",
    history: "Lahir di Pekojan, Batavia pada 17 Rabiul Awal 1238 H (1822 M), Habib Utsman bin Yahya belajar selama 22 tahun di Makkah, Madinah, Mesir, Tunisia, hingga Istanbul dan Hadramaut. Sekembalinya ke Batavia pada 1862 M, beliau mendirikan percetakan litografi sendiri di Petamburan dan menjadi guru besar bagi para ulama Betawi generasi Guru Marzuki dan Guru Manshur.",
    facilities: ["Masjid Al-Abidin Pondok Bambu", "Ruang Makam Keluarga Al-Yahya", "Area Parkir & Tempat Wudhu"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "auliya-1",
    name: "Pangeran Achmad Jaketra (Wijayakrama)",
    title: "Pangeran Jayakarta",
    description: "Penguasa Jayakarta dan cucu Sunan Gunung Jati yang gigih melawan kolonialisme VOC di Batavia.",
    location: {
      lat: -6.2008,
      lng: 106.8992,
      address: "Jl. Jatinegara Kaum No. 49, Jatinegara Kaum, Kec. Pulo Gadung",
      city: "Jakarta Timur",
      province: "DKI Jakarta"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 – ke-17 M (Wafat sekitar 1640 M)",
    sanad: "Putra Pangeran Sungerasa Jayawikarta; Cucu Maulana Hasanuddin Banten & cicit Sunan Gunung Jati",
    karya: [
      "Masjid Assalafiyah Jatinegara Kaum (Berdiri 1620 M)",
      "Basis perlawanan gerilya Jatinegara terhadap Gubernur Jenderal J.P. Coen"
    ],
    references: [
      "Heuken, Adolf (1999). Sumber-sumber Asli Sejarah Jakarta Jilid II. Yayasan Cipta Loka Caraka.",
      "Wikipedia Bahasa Indonesia: Pangeran Jayakarta"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Makam_Pangeran_Jayakarta_-_panoramio.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kompleks Makam Pangeran Jayakarta, Jatinegara Kaum",
    history: "Setelah benteng Jayakarta diserbu pasukan VOC di bawah Jan Pieterszoon Coen pada Mei 1619, Pangeran Jayakarta beserta para pengikut setianya hijrah ke kawasan hutan pohon jati di tenggara Batavia (kini Jatinegara Kaum). Di sana beliau mendirikan Masjid Assalafiyah pada tahun 1620 M yang menjadi markas spiritual dan perjuangan.",
    facilities: ["Masjid Jami' Assalafiyah (Cagar Budaya 1620 M)", "Kompleks Makam Pangeran Jayakarta", "Area Parkir & Tempat Wudhu"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "ulama-5",
    name: "Syekh KH. Ahmad Marzuki bin Mirshod",
    title: "Guru Marzuki Cipinang Muara",
    description: "Mahaguru ulama Betawi abad ke-20 yang melahirkan puluhan kiai besar Jakarta dan sekitarnya.",
    location: {
      lat: -6.2248,
      lng: 106.8855,
      address: "Masjid Jami' Al-Marzukiyah, Jl. Cipinang Muara I, Kec. Jatinegara",
      city: "Jakarta Timur",
      province: "DKI Jakarta"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1877 – 1934 M)",
    sanad: "Murid Habib Utsman bin Yahya, Syekh Mahfudz At-Tarmasi, & Syekh Ahmad Khatib Al-Minangkabawi; Guru dari KH. Noer Ali, KH. Abdullah Syafi'i, & KH. Thohir Rohili",
    karya: [
      "Kitab Tamrinul Azhar, Tuhfatur Rahman, & Sabilut Taqlid",
      "Pesantren Cipinang Muara (kawah candradimuka ulama Betawi)"
    ],
    references: [
      "Fadhilah, Amir (2011). Genealogi Ulama Betawi: Studi tentang Jaringan Keilmuan Guru Marzuki Cipinang Muara. Jurnal Al-Qalam.",
      "Kifayatul Atqiya fi Tarjamah Guru Marzuki"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Masjid_Al-istiqomah_Kampung_Melayu_-_panoramio.jpg",
    imageSource: "Wikimedia Commons — Kawasan Masjid Jatinegara & Kampung Melayu (Basis Dakwah Guru Marzuki Cipinang Muara)",
    history: "Lahir di Rawa Bangke (Jatinegara) pada 16 Ramadhan 1293 H (1877 M), Guru Marzuki belajar di Makkah selama 7 tahun sebelum mendirikan pesantren di Cipinang Muara pada tahun 1914. Hampir seluruh ulama terkemuka Betawi abad ke-20 adalah murid langsung beliau.",
    facilities: ["Masjid Jami' Al-Marzukiyah", "Kompleks Makam Guru Marzuki", "Tempat Wudhu & Parkir"],
    openingHours: "07:00 - 21:00 WIB"
  },

  // =========================================================================
  // III. BANTEN & JAWA BARAT (KESULTANAN, TAREKAT & PESANTREN)
  // =========================================================================
  {
    id: "auliya-2",
    name: "Sultan Maulana Hasanuddin (Pangeran Sabakingkin)",
    title: "Sultan Maulana Hasanuddin Banten",
    description: "Putra Sunan Gunung Jati dan Sultan pertama Kesultanan Banten yang memakmurkan poros niaga Selat Sunda.",
    location: {
      lat: -6.0361,
      lng: 106.1540,
      address: "Kompleks Masjid Agung Banten Lama, Kec. Kasemen",
      city: "Serang",
      province: "Banten"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 M (Memerintah 1552 – 1570 M)",
    sanad: "Putra Sunan Gunung Jati & Nyai Kawunganten (Putri Prabu Surosowan)",
    karya: [
      "Pendirian Masjid Agung Banten & Keraton Surosowan",
      "Islamisasi wilayah Banten, Pandeglang, Lebak, hingga Lampung"
    ],
    references: [
      "Djajadiningrat, Hoesein (1913). Critische Beschouwing van de Sadjarah Banten.",
      "Guillot, Claude (2008). Banten: Sejarah dan Peradaban Abad X–XVII. Kepustakaan Populer Gramedia.",
      "Wikipedia Bahasa Indonesia: Maulana Hasanuddin dari Banten"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Masjid_agung_banten_lama.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Banten Lama & Makam Sultan Maulana Hasanuddin",
    history: "Pangeran Sabakingkin diutus oleh ayahandanya, Sunan Gunung Jati, untuk berdakwah di wilayah Banten Girang dan Surosowan. Dengan kesantunan dakwah dan kemampuannya mengislamkan800 ajar (pendeta) Gunung Pulosari, beliau mendirikan Kesultanan Banten pada 1552 M yang menjelma menjadi salah satu pelabuhan lada terbesar di Asia Tenggara.",
    facilities: ["Masjid Agung Banten Lama & Menara Hendrik Lucasz Cardeel", "Museum Situs Kepurbakalaan Banten Lama", "Plaza Peziarah Terpadu", "Terminal Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-6",
    name: "Syekh Muhammad Nawawi bin Umar Al-Jawi Al-Bantani",
    title: "Syekh Nawawi Al-Bantani (Situs Tanara)",
    description: "Sayyidul Ulama al-Hijaz (Pemuka Ulama Hijaz) asal Tanara, Banten, mahaguru seluruh ulama Nusantara abad ke-19.",
    location: {
      lat: -6.0177,
      lng: 106.3821,
      address: "Masjid Jami' Tanara & Pesantren An-Nawawi, Desa Pedersen, Kec. Tanara",
      city: "Serang",
      province: "Banten"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 M (1813 – 1897 M)",
    sanad: "Keturunan ke-12 Sultan Maulana Hasanuddin Banten; Murid Syekh Khatib As-Sambasi & Syekh Ahmad Zaini Dahlan; Guru dari Syaikhona Kholil Bangkalan, KH. Hasyim Asy'ari, KH. Ahmad Dahlan, & Syekh Asnawi Caringin",
    karya: [
      "Tafsir Al-Munir (Marah Labid li Kasyfi Ma'na Qur'an Majid - 2 Jilid)",
      "Nihayatuz Zain, Kasyifatus Saja, Tausyih 'ala Ibni Qasim, & Nashaihul 'Ibad (Lebih dari 115 Kitab Bahasa Arab)"
    ],
    references: [
      "Snouck Hurgronje, C. (1931). Mekka in the Latter Part of the 19th Century. Brill.",
      "Abdurrahman, M. (2018). Jaringan Keilmuan Syekh Nawawi Al-Bantani. Jurnal Tsaqafah.",
      "Wikipedia Bahasa Indonesia: Nawawi al-Bantani"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/8/8f/Lukisan_Syekh_Nawawi_al-Bantani_oleh_Kang_Alam.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Potret Lukisan Syekh Nawawi Al-Bantani (Sayyidul Ulama al-Hijaz, Tanara)",
    history: "Lahir di Desa Tanara, Serang tahun 1813 M, Syekh Nawawi berangkat ke Makkah pada usia 15 tahun dan menjadi imam serta pengajar di Masjidil Haram yang dihormati ulama Timur Tengah hingga digelari 'Imam Nawawi Ats-Tsani' (Imam Nawawi Kedua). Meskipun jasad beliau wafat dan dimakamkan di Ma'la (Makkah) pada 1897 M, di Situs Tanara terdapat makam ayahanda beliau (Syekh Umar bin Arabi), petilasan tempat beliau berkhalwat, serta tanah makam dari Ma'la yang dibawa saat Haul.",
    untoldStory: "Saat mengarang kitab di dalam kereta kuda yang gelap dalam perjalanan dari Kairo ke Makkah, jari telunjuk kiri Syekh Nawawi memancarkan cahaya terang seperti lampu minyak sehingga tangan kanannya dapat terus menulis naskah kitab hingga selesai.",
    facilities: ["Masjid Jami' Syekh Nawawi Tanara", "Makam Syekh Umar bin Arabi (Ayahanda)", "Pondok Pesantren An-Nawawi Tanara", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Jari telunjuk kiri beliau memancarkan cahaya lampu di tengah gelapnya malam saat menulis kitab di perjalanan.",
      "Jasad beliau di pemakaman Ma'la Makkah tetap utuh beserta kain kafannya saat petugas pemakaman hendak membuka liang lahatnya setelah satu tahun."
    ]
  },
  {
    id: "ulama-7",
    name: "Syekh KH. Tubagus Muhammad Asnawi",
    title: "Syekh Asnawi Caringin",
    description: "Ulama kharismatik mursyid Tarekat Qadiriyah wa Naqsyabandiyah dan pejuang pergerakan Banten.",
    location: {
      lat: -6.3688,
      lng: 105.8266,
      address: "Masjid Agung As-Salafiyah, Desa Caringin, Kec. Labuan",
      city: "Pandeglang",
      province: "Banten"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1850 – 1937 M)",
    sanad: "Murid Syekh Nawawi Al-Bantani & Syekh Abdul Karim Al-Bantani di Makkah",
    karya: [
      "Pendirian Masjid As-Salafiyah Caringin (1885 M)",
      "Pembinaan jaringan pesantren dan perlawanan анти-kolonial di Banten Barat"
    ],
    references: [
      "Kartodirdjo, Sartono (1966). The Peasants' Revolt of Banten in 1888. KITLV.",
      "Wikipedia Bahasa Indonesia: Asnawi Caringin"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Mesjid_Ar-Rahman%2C_Mesjid_Agung_Padeglang_-_panoramio.jpg",
    imageSource: "Wikimedia Commons — Arsip Masjid Agung Pandeglang (Wilayah Dakwah Syekh Asnawi Caringin)",
    history: "Lahir di Caringin tahun 1850 M, Syekh Asnawi selamat dari dahsyatnya tsunami letusan Gunung Krakatau 1883 saat menimba ilmu di Makkah. Sekembalinya ke Banten, beliau membangun kembali wilayah pesisir Labuan-Caringin dan sempat diasingkan Belanda ke Cianjur akibat pengaruh perjuangannya yang besar.",
    facilities: ["Masjid As-Salafiyah Caringin", "Kubah Makam Syekh Asnawi", "Area Parkir Pantai Caringin", "Tempat Wudhu & Toilet"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-8",
    name: "Syekh Haji Abdul Muhyi",
    title: "Syekh Abdul Muhyi Pamijahan",
    description: "Waliyullah penyebar Tarekat Syattariyah di Tanah Priangan Selatan dan murid utama Syekh Abdurrauf As-Singkili.",
    location: {
      lat: -7.5882,
      lng: 108.0815,
      address: "Desa Pamijahan, Kec. Bantarkalong",
      city: "Tasikmalaya",
      province: "Jawa Barat"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 – Awal Abad ke-18 M (1650 – 1730 M)",
    sanad: "Murid Syekh Abdurrauf As-Singkili (Aceh) & Syekh Ibrahim Al-Kurani (Madinah); Membawa sanad Tarekat Syattariyah ke Jawa Barat & Jawa Tengah",
    karya: [
      "Naskah Martabat Kang Pitu (Tasawuf Martabat Tujuh berbahasa Jawa & Sunda Pegon)",
      "Gua Safarwadi Pamijahan (tempat khalwat dan pengajaran santri)"
    ],
    references: [
      "Christomy, Tommy (2008). Signs of the Wali: Narratives at the Sacred Sites in Pamijahan, West Java. ANU Press.",
      "Ekadjati, Edi S. (1984). Penyebaran Agama Islam di Jawa Barat. Masyarakat Indonesia.",
      "Wikipedia Bahasa Indonesia: Abdul Muhyi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg",
    imageSource: "Wikimedia Commons — Khazanah Islam Tasikmalaya (Jalur Ziarah Syekh Abdul Muhyi Pamijahan)",
    history: "Lahir di Mataram sekitar tahun 1650 M dari jalur keturunan Raja Galuh dan Sunan Giri, Syekh Abdul Muhyi berguru kepada Syekh Abdurrauf As-Singkili di Aceh selama 8 tahun lalu berhaji bersama gurunya ke Makkah dan ziarah ke makam Syekh Abdul Qadir Al-Jailani di Baghdad. Beliau diperintahkan mencari sebuah gua di Priangan Selatan untuk menanam padi sejengkal hingga menemukan Gua Safarwadi di Pamijahan.",
    untoldStory: "Di dalam Gua Safarwadi Pamijahan terdapat mata air 'Cai Kahuripan' (Air Zamzam Pamijahan) dan batu cekungan menyerupai peci haji yang menurut tradisi lisan terhubung secara batiniah dengan tanah suci.",
    facilities: ["Kompleks Makam Puncak Pamijahan", "Gua Safarwadi", "Masjid Agung Pamijahan", "Terminal Wisata & Kios Senter Gua"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Menemukan Gua Safarwadi sesuai isyarat gaib dari gurunya Syekh Abdurrauf As-Singkili setelah padi yang ditanamnya berbuah hanya setinggi sejengkal.",
      "Menundukkan tokoh ilmu hitam Eyang Dimyati melalui kelembutan akhlak dan karomah hingga taubat menjadi santri beliau."
    ]
  },
  {
    id: "habib-6",
    name: "Al-Habib Abdullah bin Muhsin Al-Attas",
    title: "Habib Empang Bogor",
    description: "Waliyullah Qutub asal Hadramaut, mahaguru para habaib di Jawa, dan pendiri Masjid Keramat Empang Bogor.",
    location: {
      lat: -6.6079,
      lng: 106.7924,
      address: "Jl. Lolongok, Empang, Kec. Bogor Selatan",
      city: "Bogor",
      province: "Jawa Barat"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (1849 – 29 Dzulhijjah 1351 H / 25 April 1933 M)",
    sanad: "Murid Habib Abu Bakar bin Abdullah Al-Attas & Habib Sholeh bin Abdullah Al-Attas (Hadramaut); Guru dari Habib Alwi bin Muhammad Al-Haddad & Habib Ali bin Husein Al-Attas (Bungur)",
    karya: [
      "Kitab Fathul Qadir (Kumpulan Doa, Hizib & Munajat)",
      "Pendirian Masjid Jami' An-Nur Keramat Empang Bogor (1828/1900 M)"
    ],
    references: [
      "Manaqib Al-Qutb Al-Habib Abdullah bin Muhsin Al-Attas (Bogor)",
      "Jurnal Sejarah Peradaban Islam UIN SGD Bandung: Perkembangan Komunitas Arab di Empang Bogor"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/COLLECTIE_TROPENMUSEUM_Moskee_in_Buitenzorg_TMnr_60016665.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Masjid Bersejarah Buitenzorg / Empang Bogor",
    history: "Habib Abdullah bin Muhsin Al-Attas lahir di Desa Haurah, Hadramaut tahun 1265 H (1849 M). Setibanya di Jawa, beliau menetap di kawasan Empang, Bogor yang saat itu masih berupa hutan dan rawa. Beliau pernah dipenjara secara tidak adil oleh pemerintah kolonial Belanda selama beberapa tahun, namun justru di dalam penjara itulah karomah beliau memancar hingga kepala penjara dan keluarganya sembuh dari penyakit parah atas doa beliau.",
    facilities: ["Masjid Jami' An-Nur Keramat Empang", "Kubah Makam Habib Abdullah bin Muhsin Al-Attas", "Kawasan Kampung Arab Empang Bogor", "Area Parkir"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Saat dipenjara pemerintah kolonial, pintu besi penjara terbuka dengan sendirinya setiap waktu shalat malam dan beliau terlihat mengajar di luar penjara.",
      "Menyembuhkan istri kepala sipir Belanda yang kritis hanya dengan segelas air putih yang dibacakan Al-Fatihah."
    ]
  },
  {
    id: "ulama-9",
    name: "Syekh KH. Tubagus Muhammad Falak bin KH. Tubagus Abbas",
    title: "Mama Falak Pagentongan",
    description: "Ulama ahli falak (astronomi Islam), mursyid tarekat, dan pejuang kemerdekaan yang hidup hingga usia 130 tahun.",
    location: {
      lat: -6.5825,
      lng: 106.7644,
      address: "Pondok Pesantren Al-Falak, Jl. Pagentongan, Loji, Kec. Bogor Barat",
      city: "Bogor",
      province: "Jawa Barat"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1842 – 19 Juli 1972 M)",
    sanad: "Murid Syekh Nawawi Al-Bantani, Syekh Zaini Dahlan, & Sayyid Abdurrahman bin Muhammad Al-Masyhur (Mufti Hadramaut)",
    karya: [
      "Perhitungan Kalender & Hisab Falakiyah Nusantara",
      "Pendirian Pondok Pesantren Al-Falak Pagentongan Bogor (1901 M)"
    ],
    references: [
      "Biografi KH. Tubagus Muhammad Falak (Abah Falak) Pagentongan Bogor — Kementerian Agama RI",
      "Skripsi UIN Syarif Hidayatullah Jakarta: Peran KH. Tubagus Muhammad Falak dalam Pendidikan Islam di Bogor"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Naruhito_and_Masako_visit_Bogor_Palace_56.jpg",
    imageSource: "Wikimedia Commons — Kota Bersejarah Bogor (Kawasan Pesantren Al-Falak Pagentongan Mama Falak)",
    history: "Lahir di Pandeglang tahun 1842 M, beliau bermukim dan menuntut ilmu di Makkah selama 21 tahun (1857–1878 M) hingga mahir dalam ilmu tafsir, hadis, fikih, dan astronomi (ilmu falak) sehingga diberi gelar 'Mama Falak' oleh gurunya di Makkah. Beliau mendirikan Pesantren Pagentongan di Bogor pada 1901 M dan wafat pada 1972 M dalam usia 130 tahun.",
    facilities: ["Masjid & Pondok Pesantren Al-Falak Pagentongan", "Kubah Makam Mama Falak", "Area Parkir & Tempat Wudhu"],
    openingHours: "07:00 - 22:00 WIB"
  },
  {
    id: "ulama-10",
    name: "Syekh Hasanuddin bin Yusuf Sidik",
    title: "Syekh Qurotul Ain (Syekh Quro Karawang)",
    description: "Ulama pelopor penyebaran Islam pertama di Tatar Sunda (awal abad ke-15) dan guru dari Nyai Subang Larang (Ibunda Sunan Gunung Jati).",
    location: {
      lat: -6.2281,
      lng: 107.4602,
      address: "Desa Pulobata, Kec. Lemahabang",
      city: "Karawang",
      province: "Jawa Barat"
    },
    category: "Auliya Nusantara",
    era: "Awal Abad ke-15 M (Tiba di Karawang 1418 M)",
    sanad: "Ulama asal Champa yang berlayar bersama armada Laksamana Cheng Ho; Guru dari Nyai Subang Larang (Permaisuri Prabu Siliwangi)",
    karya: [
      "Pondok Quro (Pesantren pertama di Jawa Barat, berdiri 1418 M di Pelabuhan Pura Dalem Karawang)"
    ],
    references: [
      "Naskah Carita Purwaka Caruban Nagari",
      "Atja (1986). Carita Purwaka Caruban Nagari: Karya Sastra sebagai Sumber Pengetahuan Sejarah. Proyek Pengembangan Permuseuman Jawa Barat.",
      "Wikipedia Bahasa Indonesia: Syekh Quro"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Cagar Budaya Kabupaten Karawang (Wilayah Dakwah Syekh Quro)",
    history: "Syekh Hasanuddin tiba di Pelabuhan Bunut Kertayasa (Karawang) pada tahun 1418 M. Karena kemerduan suaranya saat melantunkan ayat-ayat suci Al-Qur'an dan keahliannya dalam ilmu qira'at, masyarakat menjulukinya 'Syekh Quro'. Murid beliau, Nyai Subang Larang, menikah dengan Prabu Siliwangi dan melahirkan Pangeran Walangsungsang, Nyai Rara Santang (Ibunda Sunan Gunung Jati), dan Raden Kian Santang.",
    facilities: ["Masjid Agung Syekh Quro", "Kompleks Makam Pulobata Lemahabang", "Sumur Karomah Syekh Quro", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-3",
    name: "Eyang Dalem Haji Abdul Manaf",
    title: "Keramat Kampung Mahmud (Bandung)",
    description: "Waliyullah pendiri Kampung Adat Islami Mahmud di tepian Sungai Citarum yang bebas dari jejak penjajahan kolonial.",
    location: {
      lat: -6.9605,
      lng: 107.5398,
      address: "Kampung Mahmud, Desa Mekarrahayu, Kec. Margaasih",
      city: "Bandung",
      province: "Jawa Barat"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-17 M",
    sanad: "Keturunan Syarif Hidayatullah (Sunan Gunung Jati) Cirebon yang bermukim lama di Makkah",
    karya: [
      "Pendirian Kampung Mahmud dengan segenggam tanah dari Makkah",
      "Aturan adat pelestarian kesederhanaan dan ketenangan ibadah"
    ],
    references: [
      "Jurnal Patanjala Balai Pelestarian Nilai Budaya Jawa Barat: Kearifan Lokal Masyarakat Kampung Adat Mahmud Kabupaten Bandung",
      "Wikipedia Bahasa Indonesia: Kampung Adat Mahmud"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Muara_sungai_Citarum.jpg",
    imageSource: "Wikimedia Commons — Aliran Sungai Citarum (Lanskap Kampung Adat Religi Mahmud, Bandung)",
    history: "Sebelum kembali dari ibadah haji dan bermukim di Makkah, Eyang Dalem Abdul Manaf membawa segenggam tanah dari Gubernuran Mahmud dekat Masjidil Haram. Tanah tersebut ditanam di kawasan rawa tepi Sungai Citarum sebagai tempat persembunyian dan pembinaan kader pejuang Islam yang tak pernah berhasil ditemukan oleh tentara Belanda.",
    facilities: ["Kompleks Makam Eyang Dalem Abdul Manaf", "Masjid Agung Mahmud", "Kampung Adat Religi", "Area Parkir Jembatan Mahmud"],
    openingHours: "Buka 24 Jam"
  },

  // =========================================================================
  // IV. JAWA TENGAH & DI YOGYAKARTA (MATARAM, PANTURA & PESANTREN)
  // =========================================================================
  {
    id: "auliya-4",
    name: "Syekh Muhammad Al-Baqir",
    title: "Syekh Subakir (Puncak Gunung Tidar)",
    description: "Ulama sufi asal Persia generasi Walisongo periode awal yang menumbal dan mensucikan Puser Tanah Jawa di Gunung Tidar.",
    location: {
      lat: -7.4939,
      lng: 110.2175,
      address: "Puncak Gunung Tidar, Magersari, Kec. Magelang Selatan",
      city: "Magelang",
      province: "Jawa Tengah"
    },
    category: "Auliya Nusantara",
    era: "Awal Abad ke-15 M (Masa Sultan Muhammad I Turki Utsmani, 1404 M)",
    sanad: "Utusan Khalifah Sultan Muhammad I (Turki Utsmani) dari wilayah Khorasan / Persia bersama Syekh Maulana Malik Ibrahim",
    karya: [
      "Tugu 'Sa-Alif-Lam-Mim' (Pakuning Tanah Jawa) di puncak Gunung Tidar",
      "Pembukaan dakwah Islam perdana di Jawa bagian tengah"
    ],
    references: [
      "Babad Tanah Jawi",
      "Sunyoto, Agus (2016). Atlas Wali Songo.",
      "Wikipedia Bahasa Indonesia: Syekh Subakir"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Goenoeng_Tidar_._Magelang.%2C_KITLV_1403054.tiff/lossy-page1-960px-Goenoeng_Tidar_._Magelang.%2C_KITLV_1403054.tiff.jpg",
    imageSource: "Koleksi KITLV Universitas Leiden / Wikimedia Commons — Bukit Gunung Tidar Magelang (Petilasan Syekh Subakir)",
    history: "Berdasarkan Babad Tanah Jawi, Syekh Subakir diutus ke Pulau Jawa untuk menetralisir pengaruh gaib negatif yang menghalangi dakwah generasi awal. Beliau mendaki puncak Gunung Tidar (Pusar Tanah Jawa) di Magelang, menancapkan batu hitam berajah kaligrafi tauhid (Tombak Kyai Panjang), dan berdialog dengan penguasa gaib Gunung Tidar (Sabdo Palon) sebelum kembali ke Persia pada tahun 1462 M.",
    facilities: ["Pendopo Petilasan Syekh Subakir", "Tugu Pakuning Tanah Jawa", "Jalur Tangga Kebun Raya Gunung Tidar", "Masjid & Area Parkir Terminal Tidar"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-5",
    name: "Ki Ageng Pandanaran II (Pangeran Mangkubumi)",
    title: "Sunan Bayat (Sunan Tembayat Klaten)",
    description: "Mantan Bupati Semarang yang meninggalkan tahta dan harta demi menempuh jalan sufi atas bimbingan Sunan Kalijaga.",
    location: {
      lat: -7.7728,
      lng: 110.6352,
      address: "Bukit Jabalkat, Desa Paseban, Kec. Bayat",
      city: "Klaten",
      province: "Jawa Tengah"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 M (Wafat sekitar 1546 M)",
    sanad: "Putra Ki Ageng Pandanaran I (Pendiri Kota Semarang) & Cucu Pangeran Sabrang Lor (Sultan Demak II); Murid utama Sunan Kalijaga",
    karya: [
      "Arsitektur Gapura Segara Muncar & Panemut di Bukit Jabalkat (1526 M)",
      "Serat Suluk Wijil & pembinaan Islam di pedalaman Mataram Selatan"
    ],
    references: [
      "Rinkes, D.A. (1911). De Heiligen van Java IV: Ki Pandan Arang te Tembajat. Tijdschrift voor Indische Taal-, Land- en Volkenkunde.",
      "Babad Tembayat",
      "Wikipedia Bahasa Indonesia: Sunan Bayat"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Masjid_Agung_Al-Aqsa%2C_Klaten%2C_Jawa_Tengah.jpg",
    imageSource: "Wikimedia Commons — Khazanah Islam Kabupaten Klaten (Jalur Ziarah Makam Sunan Bayat Paseban)",
    history: "Ki Ageng Pandanaran semula adalah Bupati Semarang yang kaya raya. Setelah ditegur oleh Sunan Kalijaga yang menyamar sebagai penjual rumput (yang di dalam ikatan rumputnya terdapat bongkahan emas), beliau bertaubat, menanggalkan jabatannya, dan berjalan kaki ke arah selatan melewati Salatiga (asal nama 'Salah Tiga') hingga bermukim dan berdakwah di Bukit Jabalkat, Tembayat, Klaten.",
    facilities: ["Kompleks Gapura Candi Bentar Bukit Jabalkat", "Masjid Agung Sunan Pandanaran", "Tangga Batu Kuno", "Area Parkir Bus Paseban"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-6",
    name: "Sultan Raden Fattah (Jin Bun / Sultan Syah Alam Akbar Al-Fattah)",
    title: "Raden Fattah (Masjid Agung Demak)",
    description: "Sultan pertama Kesultanan Demak Bintoro dan pelindung utama Dewan Walisongo.",
    location: {
      lat: -6.8946,
      lng: 110.6373,
      address: "Kompleks Masjid Agung Demak, Kauman, Bintoro, Kec. Demak",
      city: "Demak",
      province: "Jawa Tengah"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-15 – Awal Abad ke-16 M (1455 – 1518 M)",
    sanad: "Putra Prabu Brawijaya V (Majapahit); Murid dan menantu Sunan Ampel; Dididik oleh Pangeran Aria Damar di Palembang",
    karya: [
      "Pendirian Kesultanan Demak Bintoro (1478 M)",
      "Pembangunan Masjid Agung Demak bersama para Walisongo (1479 M)",
      "Kitab Hukum Salokantara (Kodifikasi hukum Islam-Jawa)"
    ],
    references: [
      "De Graaf, H.J. & Pigeaud, Th.G.Th. (1974). Kerajaan-Kerajaan Islam Pertama di Jawa. Grafiti Pers.",
      "Babad Tanah Jawi & Kronik Tionghoa Kelenteng Sam Poo Kong",
      "Wikipedia Bahasa Indonesia: Raden Patah"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Masjid_demak.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Demak & Kompleks Makam Sultan Raden Fattah",
    history: "Lahir di Palembang tahun 1455 M, Raden Fattah merantau ke Jawa dan berguru kepada Sunan Ampel di Surabaya. Atas restu Sunan Ampel, beliau membuka hutan Glagahwangi di Bintoro (Demak) yang berkembang menjadi pesantren dan kemudian dideklarasikan sebagai Kesultanan Islam pertama di Pulau Jawa.",
    facilities: ["Masjid Agung Demak", "Museum Masjid Agung Demak", "Kompleks Makam Raja-Raja Demak", "Alun-Alun & Parkir Terpadu"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-11",
    name: "Syekh KH. Ahmad Mutamakkin",
    title: "Syekh Ahmad Mutamakkin (Kajen Pati)",
    description: "Ulama sufi abad ke-18 pengarang Serat Cebolek dan cikal bakal ribuan pesantren di Desa Kajen, Pati.",
    location: {
      lat: -6.6203,
      lng: 111.0361,
      address: "Desa Kajen, Kec. Margoyoso",
      city: "Pati",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 – ke-18 M (1645 – 1740 M)",
    sanad: "Murid Syekh Muhammad Zain Al-Mizjaji (Yaman) & Syekh Ibrahim Al-Kurani; Leluhur KH. Bisri Mustofa, KH. Sahal Mahfudh, & KH. Abdurrahman Wahid (Gus Dur)",
    karya: [
      "Naskah Arsyul Muwahhidin (Tauhid & Tasawuf)",
      "Pendirian Masjid Jami' Kajen dengan ukiran kayu simbolik Bulan Muharram"
    ],
    references: [
      "Soebardi, S. (1975). The Book of Cabolek: A Critical Edition of an Eighteenth Century Javanese Text. KITLV.",
      "Bizawie, Zainul Milal (2002). Perlawanan Kultural Agama Rakyat: Pemikiran dan Paham Keagamaan Syekh Ahmad al-Mutamakkin dalam Pergumulan Islam dan Tradisi (1645–1740).",
      "Wikipedia Bahasa Indonesia: Ahmad Mutamakkin"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Masjid_Agung_Al-Muhtaram_Kajen.jpg",
    imageSource: "Wikimedia Commons — Masjid Agung Al-Muhtaram Kajen, Margoyoso, Pati (Kompleks Makam Syekh Ahmad Mutamakkin)",
    history: "Syekh Ahmad Mutamakkin adalah ulama besar masa Keraton Kartasura (Amangkurat IV dan Pakubuwono II) yang menimba ilmu tasawuf di Haramain dan Yaman. Kisah perdebatan intelektual beliau di hadapan Raja Kartasura diabadikan dalam karya sastra Jawa klasik 'Serat Cebolek'. Desa Kajen yang beliau rintis kini menjadi salah satu kampung santri terbesar di Jawa Tengah.",
    facilities: ["Masjid Jami' Kajen Margoyoso", "Cungkup Makam Syekh Ahmad Mutamakkin", "Kawasan Pesantren Kajen", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-7",
    name: "Syekh Jangkung (Raden Saridin)",
    title: "Syekh Jangkung (Saridin Kayen Pati)",
    description: "Waliyullah unik bergaya sufi malangmati dari masa Kesultanan Mataram Sultan Agung.",
    location: {
      lat: -6.8981,
      lng: 110.9762,
      address: "Desa Landoh, Kec. Kayen",
      city: "Pati",
      province: "Jawa Tengah"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-17 M (Masa Sultan Agung Hanyakrakusuma Mataram)",
    sanad: "Putra angkat Ki Ageng Kiringan; Murid Sunan Kalijaga & Sunan Kudus; Kakak ipar Sultan Agung Mataram",
    karya: [
      "Pembukaan Desa Landoh Kayen sebagai pusat pertanian dan dakwah rakyat"
    ],
    references: [
      "Babad Pati & Serat Syekh Jangkung",
      "Jurnal Sabda Fakultas Ilmu Budaya Universitas Diponegoro: Tokoh Saridin (Syekh Jangkung) dalam Tradisi Lisan Masyarakat Pati",
      "Wikipedia Bahasa Indonesia: Syekh Jangkung"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Masjid_Agung_Baitunnur_Pati.jpg",
    imageSource: "Wikimedia Commons — Masjid Agung Baitunnur Kabupaten Pati (Pusat Ziarah Bumi Mina Tani & Syekh Jangkung Kayen)",
    history: "Dikenal sejak muda dengan nama Saridin yang polos dan bersahaja, Syekh Jangkung menyembunyikan kewaliannya di balik perilaku sehari-hari yang merakyat (malangmati). Saat berlayar di Laut Jawa menggunakan belahan tempurung kelapa, beliau membantu armada Kesultanan Mataram dan diambil menjadi saudara ipar oleh Sultan Agung.",
    facilities: ["Kompleks Makam Syekh Jangkung Landoh", "Masjid Syekh Jangkung", "Kandang Kerbau Landoh (Tradisi Haul)", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Berlayar mengarungi Laut Jawa hingga Palembang dengan menaiki belahan tempurung kelapa (brambang).",
      "Durian yang jatuh pada malam hari saat dijaga Saridin tidak ada satu pun yang dicuri dan semuanya matang sempurna."
    ]
  },
  {
    id: "ulama-12",
    name: "KH. Nahrowi Dalhar bin KH. Abdurrahman",
    title: "Mbah Dalhar Gunungpring (Muntilan)",
    description: "Ulama kharismatik mursyid Tarekat Syadziliyah, pengasuh Pesantren Darussalam Watucongol, dan pembimbing spiritual laskar kemerdekaan.",
    location: {
      lat: -7.5892,
      lng: 110.2784,
      address: "Bukit Gunungpring, Desa Gunungpring, Kec. Muntilan",
      city: "Magelang",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (10 Syawal 1286 H / 1870 M – 29 Ramadhan 1378 H / 8 April 1959 M)",
    sanad: "Cucu Kyai Abdurrauf (Panglima Pangeran Diponegoro); Murid Syekh Mahfudz At-Tarmasi & Syekh Muhtarom Banyumas (Mursyid Syadziliyah); Guru dari KH. Mahrus Aly Lirboyo, KH. Dimyati Banten, & KH. Marzuki Giriloyo",
    karya: [
      "Kitab Tanwirul Ma'ani fi Manaqib Asy-Syaikh Abi Hasan Asy-Syadzili",
      "Ijazah Aurad Tarekat Syadziliyah & Doa Bambu Runcing Perjuangan 1945"
    ],
    references: [
      "Manaqib Simbah KH. Dalhar Watucongol Muntilan",
      "Jurnal Penelitian Agama UIN Sunan Kalijaga Yogyakarta: Peran KH. Dalhar Watucongol dalam Perjuangan Kemerdekaan di Kedu",
      "Wikipedia Bahasa Indonesia: Dalhar"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/1/16/Mbah_dalhar_dan_mbah_siradj.jpeg",
    imageSource: "Wikipedia Bahasa Indonesia — Dokumentasi Sejarah Simbah KH. Dalhar Watucongol Gunungpring & Mbah Siradj",
    history: "Lahir di Watucongol, Muntilan pada 1870 M dari keluarga pejuang Perang Jawa (Pangeran Diponegoro), Mbah Dalhar menuntut ilmu di Makkah selama 25 tahun (1896–1920 M). Pada masa Revolusi Fisik 1945–1949, Pondok Pesantren Watucongol menjadi tempat singgah Jenderal Sudirman, Bung Tomo, dan ribuan pejuang Hizbullah untuk memohon doa restu dan penyepuhan bambu runcing.",
    facilities: ["Kompleks Makam Puncak Bukit Gunungpring", "Masjid & Musholla Peziarah", "Anak Tangga Tertata & Ojek Wisata", "Terminal Parkir Bus Gunungpring"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-13",
    name: "KH. Muhammad Sholeh bin Umar As-Samarani",
    title: "KH. Sholeh Darat (Bergota Semarang)",
    description: "Mahaguru tiga serangkai pelopor kebangkitan bangsa: KH. Hasyim Asy'ari, KH. Ahmad Dahlan, dan R.A. Kartini.",
    location: {
      lat: -6.9936,
      lng: 110.4087,
      address: "TPU Bergota, Jl. Kyai Saleh, Randusari, Kec. Semarang Selatan",
      city: "Semarang",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – Awal Abad ke-20 M (1820 – 18 Desember 1903 M)",
    sanad: "Putra Kyai Umar (Pejuang Diponegoro); Murid Syekh Ahmad Zaini Dahlan & Syekh Muhammad Al-Muqri di Makkah",
    karya: [
      "Tafsir Faidhur Rahman fi Tarjamati Tafsir Kalam Malikid Dayyan (Tafsir Al-Qur'an pertama dalam huruf Arab Pegon Jawa, dihadiahkan kepada R.A. Kartini)",
      "Kitab Majmu'atus Syari'at al-Kafiyah lil 'Awam, Munjiyat, & Lathaifut Thaharah"
    ],
    references: [
      "Masrur, M. (2012). Kyai Soleh Darat dan Tafsir Faid al-Rahman. Jurnal At-Taqaddum UIN Walisongo Semarang.",
      "Surat-surat R.A. Kartini (Habis Gelap Terbitlah Terang) — Kisah Pengajian di Kabupaten Demak",
      "Wikipedia Bahasa Indonesia: Sholeh Darat"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/b/b4/Great_Mosque_of_Central_Java%2C_aerial_view.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Lanskap Islam Kota Semarang (Jejak Mahaguru KH. Sholeh Darat Bergota)",
    history: "KH. Sholeh Darat mendirikan Pesantren Darat di pesisir Semarang pada tahun 1870-an. Untuk menyiasati larangan kolonial Belanda terhadap penerjemahan Al-Qur'an ke bahasa lokal, beliau menulis Tafsir Faidhur Rahman menggunakan aksara Arab Pegon berbahasa Jawa sehingga tidak dicurigai pejabat Belanda namun dapat dipahami masyarakat pribumi dan menginspirasi R.A. Kartini melahirkan semboyan 'Minadz Dzulumaati ilan Nuur' (Habis Gelap Terbitlah Terang).",
    facilities: ["Cungkup Makam KH. Sholeh Darat di Bergota", "Musholla Peziarah", "Area Parkir Jl. Kyai Saleh"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-7",
    name: "Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas",
    title: "Habib Ahmad Sapuro (Pekalongan)",
    description: "Waliyullah kharismatik perintis kemakmuran dakwah Islam di Kota Batik Pekalongan.",
    location: {
      lat: -6.8965,
      lng: 109.6642,
      address: "Kompleks Makam Sapuro, Jl. KHM. Mansyur, Sapuro Kebulen, Kec. Pekalongan Barat",
      city: "Pekalongan",
      province: "Jawa Tengah"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (1839 – 24 Rajab 1347 H / 6 Januari 1929 M)",
    sanad: "Murid Sayyid Ahmad Zaini Dahlan (Makkah); Sahabat dekat Habib Abdullah bin Muhsin Al-Attas (Bogor)",
    karya: [
      "Kitab السلسلة الذهبية (As-Silsilah Adz-Dzahabiyyah)",
      "Pendirian Madrasah Salafiyah Pekalongan"
    ],
    references: [
      "Manaqib Al-Arif Billah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas Sapuro Pekalongan",
      "Jurnal Penelitian IAIN Pekalongan: Tradisi Haul Habib Ahmad bin Abdullah bin Thalib Al-Attas di Sapuro"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/International_Batik_Center.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kota Batik Pekalongan (Kawasan Ziarah Sapuro Habib Ahmad Al-Attas)",
    history: "Lahir di Kota Hajren, Hadramaut tahun 1255 H (1839 M), Habib Ahmad tiba di Pekalongan sekitar tahun 1878 M atas isyarat gurunya Syekh Ahmad Zaini Dahlan di Makkah. Beliau membangun masyarakat Pekalongan dengan ilmu fikih, keteladanan dagang yang jujur, dan majelis dzikir hingga wafat pada 24 Rajab 1347 H (1929 M).",
    facilities: ["Kubah Makam Habib Ahmad Sapuro", "Masjid Roudhotul Jannah Sapuro", "Area Parkir Bus Luas", "Sentra Batik & Kuliner Pekalongan"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-14",
    name: "KH. Muhammad Arwani Amin Said",
    title: "KH. Arwani Amin (Yanbu'ul Qur'an Kudus)",
    description: "Ulama ahli القراءات السبع (Qira'at Sab'ah) terkemuka di Asia Tenggara dan pendiri Pondok Tahfidh Yanbu'ul Qur'an Kudus.",
    location: {
      lat: -6.8058,
      lng: 110.8368,
      address: "Kompleks Pondok Tahfidh Yanbu'ul Qur'an, Jl. KH. M. Arwani, Kajeksan, Kec. Kota Kudus",
      city: "Kudus",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (5 September 1905 – 1 Oktober 1994 M)",
    sanad: "Murid KH. Muhammad Munawwir Krapyak (Pemegang Sanad Qira'at Sab'ah ke-29 dari Rasulullah SAW) & KH. Hasyim Asy'ari",
    karya: [
      "Kitab Faidhul Barakat fi Sab'il Qira'at (3 Jilid pedoman Qira'at Sab'ah)",
      "Metode Baca Tulis & Tahfidz Al-Qur'an 'Yanbu'a'",
      "Mursyid Tarekat Naqsyabandiyah Khalidiyah"
    ],
    references: [
      "Zuhri, Saifuddin (2015). Biografi dan Sanad Al-Qur'an KH. Muhammad Arwani Amin Kudus. Pustaka Yanbu'ul Qur'an.",
      "Wikipedia Bahasa Indonesia: Arwani Amin"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Masjid_Menara_Kudus.jpg",
    imageSource: "Wikimedia Commons — Kawasan Kota Santri Kudus Kulon (Dekat Pondok Tahfidh Yanbu'ul Qur'an KH. Arwani Amin)",
    history: "KH. Arwani Amin menghafal Al-Qur'an 30 juz beserta tujuh riwayat qira'at mutawatir (Qira'at Sab'ah) di bawah bimbingan KH. Munawwir Krapyak Yogyakarta selama 11 tahun. Beliau mendirikan Pondok Tahfidh Yanbu'ul Qur'an di Kudus pada tahun 1942 yang melahirkan ribuan penghafal Al-Qur'an bersanad di seluruh Indonesia.",
    facilities: ["Masjid Agung Pondok Yanbu'ul Qur'an", "Kompleks Makam KH. Arwani Amin", "Tempat Wudhu & Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-8",
    name: "BPH. Sandiyo (Kyai Nur Iman)",
    title: "Kyai Nur Iman Mlangi (Sleman Yogyakarta)",
    description: "Putra mahkota Keraton Mataram (Kakak Sultan Hamengkubuwono I) yang lebih memilih mendirikan Pesantren Pathok Negara Mlangi.",
    location: {
      lat: -7.7720,
      lng: 110.3344,
      address: "Masjid Pathok Negara Mlangi, Nogotirto, Kec. Gamping",
      city: "Sleman",
      province: "DI Yogyakarta"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 M (Lahir sekitar 1711 M)",
    sanad: "Putra Susuhunan Amangkurat IV (Mataram Kartasura); Santri Pesantren Gedongan Pasuruan; Leluhur ulama pesantren Jawa Tengah & Yogyakarta",
    karya: [
      "Masjid Pathok Negara Mlangi (Penjaga batas spiritual barat Keraton Yogyakarta)",
      "Jaringan 15 Pesantren Mlangi Yogyakarta"
    ],
    references: [
      "Babad Mlangi & Arsip Keraton Ngayogyakarta Hadiningrat",
      "Jurnal Thaqafiyyat UIN Sunan Kalijaga: Peran Kyai Nur Iman dan Masjid Pathok Negara Mlangi",
      "Wikipedia Bahasa Indonesia: Kyai Nur Iman Mlangi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Pathoknegara_Plasakuning_Pj_DSC_1681.jpg",
    imageSource: "Wikimedia Commons — Arsitektur Cagar Budaya Masjid Pathok Negara Kasultanan Ngayogyakarta (Jaringan Kyai Nur Iman Mlangi)",
    history: "Lahir sebagai pangeran bangsawan Mataram bernama BPH. Sandiyo, beliau menolak godaan kekuasaan keraton dan memilih menyamar sebagai santri biasa di Jawa Timur. Setelah adiknya naik tahta sebagai Sultan Hamengkubuwono I di Yogyakarta, beliau dianugerahi tanah perdikan di Desa Mlangi sebagai Masjid Pathok Negara sisi barat.",
    facilities: ["Masjid Pathok Negara Mlangi (Arsitektur Jawa Kuno)", "Kompleks Makam Kagungan Dalem Mlangi", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-9",
    name: "Syekh Maulana Maghribi (Syekh Bela Belu)",
    title: "Syekh Maulana Maghribi Parangtritis",
    description: "Waliyullah penyebar Islam di pesisir selatan Mataram yang bermukim di Bukit Sentono, di atas Pantai Parangtritis.",
    location: {
      lat: -8.0195,
      lng: 110.3318,
      address: "Bukit Sentono, Jl. Parangtritis, Desa Parangtritis, Kec. Kretek",
      city: "Bantul",
      province: "DI Yogyakarta"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-15 – ke-16 M",
    sanad: "Jaringan dakwah Walisongo di pesisir selatan Jawa; Guru spiritual Raden Gagak Handoko (Syekh Bela Belu)",
    karya: [
      "Pembinaan Islam masyarakat pesisir selatan Yogyakarta"
    ],
    references: [
      "Babad Tanah Jawi & Tradisi Lisan Pesisir Selatan Yogyakarta",
      "Jurnal Kebudayaan Balai Pelestarian Cagar Budaya (BPCB) DI Yogyakarta"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Dusk_till_dawn_%28cropped%29.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Perbukitan Pantai Parangtritis Bantul (Lokasi Bukit Sentono Syekh Maulana Maghribi)",
    history: "Terletak di puncak Bukit Sentono yang menghadap langsung ke Samudra Hindia dan Pantai Parangtritis, makam Syekh Maulana Maghribi menjadi pusat ziarah masyarakat Yogyakarta dan Jawa Tengah terutama pada malam Jumat Kliwon dan Selasa Kliwon.",
    facilities: ["Cungkup Makam Bukit Sentono", "Musholla Puncak Bukit", "Tangga Pendakian & Parkir Bawah Parangtritis"],
    openingHours: "Buka 24 Jam"
  },

  // =========================================================================
  // V. JAWA TIMUR & PULAU MADURA (POROS PESANTREN & WALI)
  // =========================================================================
  {
    id: "ulama-15",
    name: "Syaikhona KH. Muhammad Kholil bin KH. Abdul Lathif",
    title: "Syaikhona Kholil Bangkalan (Madura)",
    description: "Mahaguru para ulama Nusantara, pelopor berdirinya Nahdlatul Ulama, dan Pahlawan Nasional dari Bangkalan, Madura.",
    location: {
      lat: -7.0528,
      lng: 112.7285,
      address: "Kompleks Masjid Agung Syaikhona Kholil, Desa Martajasah, Kec. Bangkalan",
      city: "Bangkalan",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (27 Januari 1820 – 29 Ramadhan 1343 H / 24 April 1925 M)",
    sanad: "Keturunan Sunan Gunung Jati; Murid Syekh Nawawi Al-Bantani, Syekh Ahmad Khatib As-Sambasi, & Sayyid Ahmad Zaini Dahlan; Mahaguru dari KH. Hasyim Asy'ari, KH. Wahab Chasbullah, KH. Bisri Syansuri, KH. As'ad Syamsul Arifin, KH. Abdul Karim Lirboyo, & ratusan kiai besar Jawa-Madura",
    karya: [
      "Kitab As-Silah fi Bayan an-Nikah",
      "Kitab Matan asy-Syarif al-Kholili",
      "Isyarat Tongkat & Tasbih (Ayat 18–21 Surat Thaha & Ya Jabbar Ya Qahhar) sebagai restu pendirian Nahdlatul Ulama (1924–1926)"
    ],
    references: [
      "Rachman, Saifur (2001). Surat kepada Anjing Hitam: Biografi dan Karomah Syaikhona Kholil Bangkalan. Pustaka Ciganjur.",
      "Bruinessen, Martin van (1994). NU: Tradisi, Relasi-relasi Kuasa, Pencarian Wacana Baru. LKiS.",
      "Wikipedia Bahasa Indonesia: Kholil al-Bangkalani"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/MAKAM_SYAIKHONA_KHOLIL_MARTAJASAH.jpg",
    imageSource: "Wikimedia Commons — Kompleks Makam Syaikhona KH. Muhammad Kholil, Martajasah, Bangkalan Madura",
    history: "Lahir di Kampung Senenan, Kemayoran, Bangkalan pada 11 Jumadil Akhir 1235 H (1820 M), Syaikhona Kholil sudah hafal Alfiyah Ibnu Malik (1.000 bait) dan Al-Qur'an sejak belia. Setelah menimba ilmu di berbagai pesantren Jawa dan Makkah (1859 M), beliau mendirikan Pesantren Demangan Bangkalan yang mencetak hampir seluruh pendiri pesantren besar di Pulau Jawa dan Madura.",
    untoldStory: "Pada tahun 1924, menjelang berdirinya Jam'iyyah Nahdlatul Ulama, Syaikhona Kholil mengutus santri mudanya, Kiai As'ad Syamsul Arifin (Situbondo), mengantarkan sebatang tongkat sambil membacakan Surat Thaha ayat 17–23 serta seuntai tasbih dengan wirid 'Ya Jabbar Ya Qahhar' kepada KH. Hasyim Asy'ari di Tebuireng Jombang. Menerima isyarat gurunya itu, KH. Hasyim Asy'ari menangis haru dan mantap mendirikan NU.",
    facilities: ["Masjid Agung Syaikhona Muhammad Kholil Martajasah", "Kubah Makam Syaikhona Kholil", "Terminal Parkir Bus Martajasah", "Sentra Batik Tanjungbumi & Kuliner Bebek Sinjay"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Membuat lubang kiblat masjid dengan sebatang kayu hingga dari lubang tersebut tampak jelas bangunan Ka'bah di Masjidil Haram.",
      "Menolong jamaah yang tertinggal kapal laut menuju Makkah hanya dengan menyuruhnya memejamkan mata sambil berpegangan pada jubah beliau hingga tiba di Masjidil Haram dalam sekejap.",
      "Menyembuhkan orang lumpuh hanya dengan kejutan gertakan sehingga orang tersebut langsung berdiri dan berlari sehat."
    ],
    doaKhusus: [
      {
        title: "Tawasul Syaikhona Muhammad Kholil Bangkalan",
        text: "إِلَى حَضْرَةِ شَيْخِنَا الكَرِيمِ الشَّيْخِ مُحَمَّدْ خَلِيلْ بِنْ عَبْدِ اللَّطِيفْ البَانْغكَالَانِي قَدَّسَ اللهُ سِرَّهُ، الفَاتِحَة...",
        translation: "Kepada kehadirat Mahaguru kami Syekh Muhammad Kholil bin Abdul Lathif Al-Bangkalani, semoga Allah mensucikan rahasianya. Al-Fatihah..."
      },
      {
        title: "Sholawat Nariyah (Amalan Utama Syaikhona Kholil)",
        text: "اللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ العُقَدُ وَتَنْفَرِجُ بِهِ الكُرَبُ...",
        translation: "Ya Allah, limpahkanlah shalawat yang sempurna dan salam yang utuh kepada junjungan kami Nabi Muhammad SAW, yang dengannya terurai segala ikatan kesulitan dan dilapangkan segala kesempitan..."
      }
    ]
  },
  {
    id: "ulama-1",
    name: "Hadratussyaikh KH. Hasyim Asy'ari & KH. Abdurrahman Wahid (Gus Dur)",
    title: "Makam Tebuireng (KH. Hasyim Asy'ari & Gus Dur)",
    description: "Kompleks makam Pendiri Nahdlatul Ulama / Pahlawan Nasional Resolusi Jihad KH. Hasyim Asy'ari dan Presiden ke-4 RI KH. Abdurrahman Wahid (Gus Dur).",
    location: {
      lat: -7.5332,
      lng: 112.2341,
      address: "Pondok Pesantren Tebuireng, Jl. Irian Jaya No. 10, Cukir, Kec. Diwek",
      city: "Jombang",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-21 M (Tebuireng berdiri 1899 M)",
    sanad: "KH. Hasyim Asy'ari (1871–1947): Murid Syaikhona Kholil Bangkalan, Syekh Mahfudz At-Tarmasi, & Syekh Khatib Al-Minangkabawi; Ayahanda KH. Wahid Hasyim (Menteri Agama RI) & Kakek KH. Abdurrahman Wahid (Gus Dur, 1940–2009)",
    karya: [
      "Kitab Adabul 'Alim wal Muta'allim (Etika Pendidik dan Pelajar)",
      "Kitab Risalah Ahlussunnah wal Jama'ah & Qanun Asasi Nahdlatul Ulama",
      "Fatwa Resolusi Jihad 22 Oktober 1945 (Cikal bakal Hari Santri Nasional & Pertempuran 10 November Surabaya)"
    ],
    references: [
      "Khuluq, Lathiful (2000). Fajar Kebangunan Ulama: Biografi K.H. Hasyim Asy'ari. LKiS.",
      "Barton, Greg (2002). Gus Dur: The Authorized Biography of Abdurrahman Wahid. Equinox Publishing.",
      "Museum Islam Indonesia KH. Hasyim Asy'ari (MINHA) Tebuireng Jombang",
      "Wikipedia Bahasa Indonesia: Hasyim Asy'ari & Abdurrahman Wahid"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Hasyim_Asyari.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Resmi Hadratussyaikh KH. Muhammad Hasyim Asy'ari (Pendiri Pesantren Tebuireng)",
    history: "Didirikan oleh Hadratussyaikh KH. Hasyim Asy'ari pada tahun 1899 di dusun Tebuireng yang semula rawan kejahatan, Pesantren Tebuireng tumbuh menjadi mercusuar keilmuan hadis (Shahih Bukhari-Muslim) dan pergerakan kemerdekaan Indonesia. Di kompleks pemakaman keluarga pesantren ini bersemayam KH. Hasyim Asy'ari, KH. Abdul Wahid Hasyim, KH. Yusuf Hasyim, KH. Abdurrahman Wahid (Gus Dur), dan KH. Salahuddin Wahid (Gus Sholah).",
    untoldStory: "Di batu nisan KH. Abdurrahman Wahid (Gus Dur) tertulis epitaf dalam empat bahasa (Indonesia, Arab, Inggris, dan Mandarin): 'Di Sini Beristirahat Pejuang Kemanusiaan' (Here Rests a Humanist). Ribuan peziarah lintas latar belakang datang setiap hari tanpa henti.",
    facilities: ["Masjid Ulul Albab Pesantren Tebuireng", "Museum Islam Indonesia KH. Hasyim Asy'ari (MINHA)", "Lorong Peziarah & Pendopo Tahlil", "Terminal Parkir Bus Kawasan Wisata Religi Gus Dur"],
    openingHours: "07:00 - 21:00 WIB (Buka kembali pukul 01:00 - 03:30 WIB dini hari)",
    karomah: [
      "Mahaguru Syaikhona Kholil Bangkalan pernah datang sendiri ke Tebuireng untuk ikut mengaji hadis Shahih Bukhari-Muslim kepada muridnya, KH. Hasyim Asy'ari, sebagai penghormatan atas sanad hadis beliau.",
      "Fatwa Resolusi Jihad 22 Oktober 1945 menggerakkan ratusan ribu santri dan rakyat mempertahankan kemerdekaan RI di Surabaya."
    ],
    doaKhusus: [
      {
        title: "Tawasul Masyayikh Tebuireng",
        text: "إِلَى حَضْرَةِ حَضْرَةِ الشَّيْخِ مُحَمَّدْ هَاشِمْ أَشْعَرِي، وَالشَّيْخِ عَبْدِ الوَاحِدْ هَاشِمْ، وَالشَّيْخِ عَبْدِ الرَّحْمٰنْ وَاحِدْ (غُوسْ دُورْ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Hadratussyaikh KH. Muhammad Hasyim Asy'ari, KH. Abdul Wahid Hasyim, dan KH. Abdurrahman Wahid (Gus Dur). Al-Fatihah..."
      }
    ]
  },
  {
    id: "ulama-16",
    name: "KH. Abdul Wahab Chasbullah",
    title: "Mbah Wahab Chasbullah (Tambakberas Jombang)",
    description: "Pahlawan Nasional, penggerak Komite Hijaz, pencipta Mars Ya Lal Wathon, dan pendiri Nahdlatul Ulama.",
    location: {
      lat: -7.5152,
      lng: 112.2268,
      address: "Pondok Pesantren Bahrul Ulum, Jl. KH. Wahab Hasbullah, Tambakrejo (Tambakberas), Kec. Jombang",
      city: "Jombang",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (31 Maret 1888 – 29 Desember 1971 M)",
    sanad: "Putra KH. Chasbullah Said; Keturunan Joko Tingkir (Sultan Hadiwijaya Pajang); Murid Syaikhona Kholil Bangkalan, KH. Hasyim Asy'ari, & Syekh Mahfudz At-Tarmasi",
    karya: [
      "Syair Cinta Tanah Air 'Syubbanul Wathon' (Ya Lal Wathon, 1916/1934)",
      "Pendirian Nahdlatul Wathan (1916), Taswirul Afkar (1918), & Komite Hijaz (1926)",
      "Rais 'Aam PBNU (1947–1971)"
    ],
    references: [
      "Feillard, Andrée (1999). NU vis-à-vis Negara: Pencarian Isi, Bentuk dan Makna. LKiS.",
      "Zuhri, Saifuddin (1987). Berangkat dari Pesantren. Gunung Agung.",
      "Wikipedia Bahasa Indonesia: Abdul Wahab Hasbullah"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Abdul_Wahab_Hasbullah.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Pahlawan Nasional KH. Abdul Wahab Chasbullah (Tambakberas Jombang)",
    history: "KH. Abdul Wahab Chasbullah adalah arsitek organisasi dan diplomasi kalangan pesantren. Pada tahun 1926 beliau menginisiasi Komite Hijaz yang menghadap Raja Abdul Aziz Ibnu Saud di Makkah untuk menyelamatkan situs-situs bersejarah Islam (termasuk makam Nabi Muhammad SAW) serta menjamin kebebasan bermazhab di Tanah Suci. Dari pertemuan Komite Hijaz itulah lahir Jam'iyyah Nahdlatul Ulama pada 31 Januari 1926.",
    facilities: ["Masjid Jami' Bahrul Ulum Tambakberas", "Kompleks Makam Pahlawan Nasional KH. Wahab Chasbullah & KH. Fattah Hasyim", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-17",
    name: "KH. Muhammad Bisri Syansuri",
    title: "Mbah Bisri Syansuri (Denanyar Jombang)",
    description: "Ulama ahli fikih pendiri Pondok Pesantren Mamba'ul Ma'arif Denanyar dan pelopor pesantren putri di Jawa Timur.",
    location: {
      lat: -7.5398,
      lng: 112.2156,
      address: "Pondok Pesantren Mamba'ul Ma'arif, Jl. KH. Bisri Syansuri, Denanyar, Kec. Jombang",
      city: "Jombang",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (18 September 1886 – 25 April 1980 M)",
    sanad: "Murid KH. Kholil Harun (Kasingan Rembang), Syaikhona Kholil Bangkalan, & KH. Hasyim Asy'ari; Menantu KH. Chasbullah Tambakberas; Kakek dari pihak ibu KH. Abdurrahman Wahid (Gus Dur)",
    karya: [
      "Pendirian Pondok Pesantren Mamba'ul Ma'arif Denanyar (1917 M) & Pesantren Putri (1919 M)",
      "Perumus Undang-Undang Perkawinan Nasional No. 1 Tahun 1974 yang selaras syariat Islam"
    ],
    references: [
      "Aziz, Abdul (2015). KH. Bisri Syansuri: Pecinta Fiqh Sepanjang Hayat. LKiS.",
      "Wikipedia Bahasa Indonesia: Bisri Syansuri"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Bisri_Syansuri%2C_Memperkenalkan_Anggota-Anggota_DPR_Hasil_Pemilu_1971%2C_p89.jpg",
    imageSource: "Arsip Negara RI / Wikimedia Commons — Potret Resmi KH. Muhammad Bisri Syansuri (Pendiri Pesantren Denanyar Jombang)",
    history: "Lahir di Tayu, Pati pada 18 September 1886, KH. Bisri Syansuri dikenal sebagai ulama fikih yang sangat tegas, konsisten, sekaligus visioner dengan membuka akses pendidikan pesantren bagi santri perempuan sejak tahun 1919 di Denanyar, Jombang.",
    facilities: ["Masjid Jami' Pesantren Mamba'ul Ma'arif Denanyar", "Kompleks Makam KH. Bisri Syansuri", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-18",
    name: "KH. Romly Tamim & KH. Mustain Romly",
    title: "Makam Rejoso Peterongan (Darul 'Ulum Jombang)",
    description: "Pusat Tarekat Qadiriyah wa Naqsyabandiyah di Jombang dan penyusun wirid terkenal 'Al-Istighotsah bi Hadrati Rabbil Bariyyah'.",
    location: {
      lat: -7.5425,
      lng: 112.2752,
      address: "Pondok Pesantren Darul 'Ulum, Rejoso, Kec. Peterongan",
      city: "Jombang",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (KH. Romly Tamim: 1888 – 1958 M)",
    sanad: "Putra KH. Tamim Irsyad (Pendiri Pesantren Darul 'Ulum, 1885); Murid Syaikhona Kholil Bangkalan & KH. Hasyim Asy'ari",
    karya: [
      "Kitab Al-Istighotsah bi Hadrati Rabbil Bariyyah (Bacaan Istighotsah standar pesantren di seluruh Nusantara)",
      "Kitab Tsamratul Fikriyah (Silsilah & Amalan Tarekat Qadiriyah wa Naqsyabandiyah)"
    ],
    references: [
      "Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Mizan.",
      "Wikipedia Bahasa Indonesia: Pondok Pesantren Darul 'Ulum (Jombang)"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Masjid_Al-Khodlro%27_Pondok_Pesantren_Sunan_Ampel_Jombang-1.jpg",
    imageSource: "Wikimedia Commons — Arsitektur Masjid Pesantren di Kabupaten Jombang (Poros Pesantren Rejoso Peterongan)",
    history: "KH. Romly Tamim adalah Mursyid Agung Tarekat Qadiriyah wa Naqsyabandiyah di Rejoso, Peterongan, Jombang. Kitab 'Al-Istighotsah' susunan beliau menjadi bacaan doa bersama jutaan umat Islam di Indonesia dalam menghadapi masa-masa sulit sejak era kemerdekaan hingga kini.",
    facilities: ["Kompleks Makam Masyayikh Darul 'Ulum Rejoso", "Masjid Agung Pesantren Darul 'Ulum", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-19",
    name: "KH. Abdul Hamid bin Abdullah Umar",
    title: "KH. Abdul Hamid (Mbah Hamid Pasuruan)",
    description: "Waliyullah kharismatik dari Pasuruan yang terkenal dengan kelembutan akhlak, kesabaran luar biasa, dan karomah kasyaf.",
    location: {
      lat: -7.6416,
      lng: 112.9065,
      address: "Belakang Masjid Agung Al-Anwar, Jl. KH. Wachid Hasyim, Kebonsari, Kec.anggungrejo",
      city: "Pasuruan",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (1333 H / 1914 M – 9 Rabiul Awal 1403 H / 25 Desember 1982 M)",
    sanad: "Lahir di Lasem (Rembang) dengan nama Abdul Mu'thi; Murid KH. Baidhowi Lasem, KH. Ma'shum Lasem, & KH. Dimyati Termas; Mendapat isyarat kewalian dari Habib Ja'far bin Syaikhan Assegaf Pasuruan",
    karya: [
      "Pengasuh Pondok Pesantren Salafiyah Pasuruan",
      "Syi'ir dan teladan tasawuf akhlaki yang menjadi rujukan ulama se-Jawa"
    ],
    references: [
      "Mustofa, Misbah (1983). Biografi KH. Abdul Hamid Pasuruan.",
      "Hamid, Abdulloh (2018). Percik-percik Keteladanan Kiai Hamid Pasuruan. Lembaga Informasi dan Studi Islam.",
      "Wikipedia Bahasa Indonesia: Abdul Hamid Pasuruan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Masjid_Agung_Pasuruan.jpg",
    imageSource: "Wikimedia Commons — Masjid Agung Al-Anwar Kota Pasuruan (Lokasi Makam KH. Abdul Hamid Pasuruan)",
    history: "Lahir di Desa Sumbergirang, Lasem tahun 1914 M dengan nama kecil Abdul Mu'thi, beliau hijrah ke Pasuruan setelah menikah dengan putri KH. Ahmad Qusyairi. Kedalaman ilmu, kezuhudan, dan kasih sayang beliau membuat rumahnya di Kebonsari, Pasuruan tak pernah sepi dari kunjungan ulama besar, habaib, pejabat, hingga rakyat kecil dari seluruh penjuru Nusantara.",
    untoldStory: "Ketika masih muda dan belum dikenal orang di Pasuruan, wali besar Habib Ja'far bin Syaikhan Assegaf pernah mengumumkan di depan ribuan jamaah: 'Jika aku wafat nanti, datanglah kalian kepada Kiai Abdul Hamid, karena kunci kewalian Pasuruan telah diserahkan kepadanya.'",
    facilities: ["Masjid Agung Al-Anwar Kota Pasuruan", "Kompleks Makam KH. Abdul Hamid & Habib Taufiq", "Alun-Alun Kota Pasuruan", "Terminal Parkir Bus Wisata Religi"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mengetahui hajat dan isi hati tamu sebelum tamu tersebut berbicara (kasyaf) serta menjawabnya melalui nasihat lembut.",
      "Tetap tersenyum sabar dan mendoakan kebaikan bagi orang yang mencacinya hingga orang tersebut menangis dan bertaubat.",
      "Beberapa jamaah haji bersaksi bertemu dan bersalaman dengan Mbah Hamid di depan Multazam Ka'bah, sementara keluarga di Pasuruan menyaksikan beliau tidak meninggalkan rumahnya."
    ],
    doaKhusus: [
      {
        title: "Tawasul KH. Abdul Hamid Pasuruan",
        text: "إِلَى حَضْرَةِ الوَلِيِّ الكَامِلِ الشَّيْخِ عَبْدِ الحَمِيدْ بِنْ عَبْدِ اللهِ عُمَرْ البَاسُورُوَانِي، الفَاتِحَة...",
        translation: "Kepada kehadirat Wali Kamil Syekh KH. Abdul Hamid bin Abdullah Umar Pasuruan. Al-Fatihah..."
      }
    ]
  },
  {
    id: "habib-8",
    name: "Al-Qutb Al-Habib Abu Bakar bin Muhammad Assegaf",
    title: "Habib Abu Bakar Assegaf (Gresik)",
    description: "Wali Qutub asal Besuki–Gresik yang berkhalwat selama 15 tahun dan menjadi muara ziarah habaib sedunia.",
    location: {
      lat: -7.1568,
      lng: 112.6562,
      address: "Kompleks Masjid Jami' Gresik, Jl. KH. Wachid Hasyim, Pekauman, Kec. Gresik",
      city: "Gresik",
      province: "Jawa Timur"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (16 Dzulhijjah 1285 H / 1869 M – 17 Dzulhijjah 1376 H / 15 Juli 1957 M)",
    sanad: "Murid Al-Habib Ali bin Muhammad Al-Habsyi (Pengarang Maulid Simthud Durar, Seiwun), Habib Muhammad bin Idrus Al-Habsyi, & Habib Ahmad bin Hasan Al-Attas",
    karya: [
      "Majelis Rouhah & Maulid di Jalan KH. Zubair Gresik",
      "Guru utama Habib Sholeh Tanggul & Habib Abdul Qadir bin Ahmad Assegaf (Jeddah)"
    ],
    references: [
      "Manaqib Al-Qutb Al-Ghaus Al-Habib Abu Bakar bin Muhammad Assegaf Gresik",
      "Jurnal Sejarah Islam UIN Sunan Ampel Surabaya: Tradisi Haul Habib Abu Bakar bin Muhammad Assegaf di Gresik",
      "Wikipedia Bahasa Indonesia: Abu Bakar bin Muhammad Assegaf"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Aerial_of_Gresik%2C_and_Giri_Hills%2C_23_July_2015.jpg",
    imageSource: "Wikimedia Commons — Lanskap Udara Kota Tua & Alun-Alun Gresik (Kompleks Masjid Jami' & Makam Habib Abu Bakar Assegaf)",
    history: "Lahir di Besuki, Situbondo tahun 1285 H (1869 M), Habib Abu Bakar menuntut ilmu di Hadramaut sejak usia 8 tahun. Sekembalinya ke Gresik, atas isyarat rohani beliau menjalani khalwat (uzlah ibadah) di kamar rumahnya selama 15 tahun penuh sebelum akhirnya diperintahkan oleh gurunya, Habib Muhammad bin Idrus Al-Habsyi, untuk keluar membimbing umat.",
    facilities: ["Masjid Jami' Gresik (Alun-Alun Gresik)", "Kubah Makam Habib Abu Bakar Assegaf", "Rumah Bersejarah Jl. KH. Zubair (Lokasi Haul)", "Area Parkir Alun-Alun Gresik"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-9",
    name: "Al-Habib Sholeh bin Muhsin Al-Hamid",
    title: "Habib Sholeh Tanggul (Jember)",
    description: "Waliyullah yang doanya terkenal sangat mustajab (cepat dikabulkan) dan pencipta Sholawat Mansub.",
    location: {
      lat: -8.1636,
      lng: 113.4472,
      address: "Kompleks Masjid Riyadlus Sholihin, Krajan, Tanggul Kulon, Kec. Tanggul",
      city: "Jember",
      province: "Jawa Timur"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (17 Jumadil Awal 1313 H / 1895 M – 8 Syawal 1396 H / 3 Oktober 1976 M)",
    sanad: "Lahir di Wadi 'Amd (Hadramaut); Murid utama Al-Qutb Habib Abu Bakar bin Muhammad Assegaf (Gresik)",
    karya: [
      "Sholawat Mansub (Sholawat pemudah segala hajat yang diijazahkan secara luas)",
      "Pendirian Masjid Riyadlus Sholihin Tanggul & pembangunan jalan/jembatan masyarakat Jember"
    ],
    references: [
      "Manaqib Al-Arif Billah Al-Habib Sholeh bin Muhsin Al-Hamid Tanggul",
      "Jurnal Heritage UIN KHAS Jember: Karisma dan Filantropi Sosial Habib Sholeh bin Muhsin Al-Hamid di Tanggul Jember",
      "Wikipedia Bahasa Indonesia: Sholeh bin Muhsin al-Hamid"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Makam_Al_Habib_Husein_bin_Ali_Assegaf.jpg",
    imageSource: "Wikimedia Commons — Dokumentasi Kubah Makam Habaib Jawa Timur (Tradisi Ziarah Habib Sholeh Tanggul Jember)",
    history: "Habib Sholeh tiba di Indonesia pada tahun 1921 M dan menetap di Kecamatan Tanggul, Jember. Setelah berkhalwat selama lebih dari 3 tahun dan dibaiat oleh gurunya Habib Abu Bakar Assegaf di Gresik, beliau mengabdikan hidupnya untuk menyantuni fakir miskin, mendamaikan perselisihan masyarakat, dan mendoakan ribuan tamu yang datang.",
    facilities: ["Masjid Jami' Riyadlus Sholihin Tanggul", "Kubah Makam Habib Sholeh Tanggul", "Dekat Stasiun Kereta Api Tanggul", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Doa beliau terkenal secepat kilat menyambar (mustajab) dalam menyembuhkan penyakit maupun mengentaskan kesulitan hidup.",
      "Turunnya hujan lebat seketika di wilayah yang mengalami kekeringan parah tepat setelah beliau mengangkat tangan berdoa di lapangan."
    ],
    doaKhusus: [
      {
        title: "Sholawat Mansub Habib Sholeh Tanggul",
        text: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تَغْفِرُ بِهَا الذُّنُوبَ، وَتُصْلِحُ بِهَا القُلُوبَ، وَتَنْطَلِقُ بِهَا العُصُوبُ، وَتَلِينُ بِهَا الصُّعُوبُ، وَعَلَى آلِهِ وَصَحْبِهِ وَمَنْ إِلَيْهِ مَنْسُوبٌ.",
        translation: "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad SAW, yang dengan shalawat itu Engkau mengampuni dosa-dosa, memperbaiki hati, melancarkan urat-urat, dan memudahkan segala kesulitan, juga kepada keluarga, sahabat, dan siapa pun yang bernasab/terhubung kepadanya."
      }
    ]
  },
  {
    id: "ulama-20",
    name: "KHR. As'ad Syamsul Arifin",
    title: "KH. As'ad Syamsul Arifin (Situbondo)",
    description: "Pahlawan Nasional, mediator berdirinya Nahdlatul Ulama, dan pengasuh Pondok Pesantren Salafiyah Syafi'iyah Sukorejo.",
    location: {
      lat: -7.7524,
      lng: 114.2286,
      address: "Pondok Pesantren Salafiyah Syafi'iyah Sukorejo, Kec. Banyuputih",
      city: "Situbondo",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1897 – 4 Agustus 1990 M)",
    sanad: "Lahir di Syi'ib Ali, Makkah; Putra KHR. Syamsul Arifin; Murid utama Syaikhona Kholil Bangkalan & KH. Hasyim Asy'ari",
    karya: [
      "Pengembangan Pesantren Salafiyah Syafi'iyah Sukorejo & Universitas Ibrahimy",
      "Pemimpin Barisan Pelopor & Laskar Sabilillah di Karesidenan Besuki (1945)"
    ],
    references: [
      "Hasan, Syamsul A. (2003). Kharisma Kiai As'ad di Mata Umat. LKiS.",
      "Keputusan Presiden RI Tahun 2016 tentang Penganugerahan Gelar Pahlawan Nasional KHR. As'ad Syamsul Arifin",
      "Wikipedia Bahasa Indonesia: As'ad Syamsul Arifin"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/As%27ad_Syamsul_Arifin.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Pahlawan Nasional KHR. As'ad Syamsul Arifin (Sukorejo Situbondo)",
    history: "Lahir di Makkah tahun 1897 M, Kiai As'ad membuka hutan angker Sukorejo bersama ayahandanya menjadi pesantren besar pada tahun 1914. Beliau adalah santri kepercayaan Syaikhona Kholil Bangkalan yang mengantarkan tongkat dan tasbih restu pendirian NU kepada KH. Hasyim Asy'ari, serta tuan rumah Muktamar NU ke-27 tahun 1984 (Kembali ke Khittah 1926).",
    facilities: ["Kompleks Makam KHR. Syamsul Arifin & KHR. As'ad Syamsul Arifin", "Masjid Jami' Ibrahimy Sukorejo", "Area Parkir Bus Pantura Situbondo"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-21",
    name: "KH. Abdul Karim (Mbah Manab) & Masyayikh Lirboyo",
    title: "Makam Masyayikh Pesantren Lirboyo (Kediri)",
    description: "Pendiri Pondok Pesantren Lirboyo Kediri, benteng pendidikan kitab kuning salaf terbesar di Jawa Timur.",
    location: {
      lat: -7.8132,
      lng: 111.9834,
      address: "Kompleks Pondok Pesantren Lirboyo, Kec. Mojoroto",
      city: "Kediri",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1856 – 1954 M)",
    sanad: "Murid Syaikhona Kholil Bangkalan & KH. Hasyim Asy'ari; Mertua KH. Marzuqi Dahlan & KH. Mahrus Aly",
    karya: [
      "Pendirian Pondok Pesantren Lirboyo Kediri (1910 M) yang kini mendidik lebih dari 40.000 santri"
    ],
    references: [
      "Tim Pembukuan Lirboyo (2010). Sejarah Satu Abad Pondok Pesantren Lirboyo (1910–2010). Lirboyo Press.",
      "Wikipedia Bahasa Indonesia: Abdul Karim (ulama)"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Masjid_Agung_Kota_Kediri_tampak_depan.jpg",
    imageSource: "Wikimedia Commons — Khazanah Islam Kota Kediri (Kota Santri Pesantren Lirboyo KH. Abdul Karim)",
    history: "Lahir di Magelang tahun 1856 M dengan nama Manab, beliau mengembara menuntut ilmu ke berbagai pesantren di Jawa Timur dan berguru kepada Syaikhona Kholil Bangkalan selama puluhan tahun. Pada tahun 1910, atas saran mertuanya KH. Sholeh Banjarmelati, beliau menetap di Desa Lirboyo yang semula rawan kejahatan dan menyulapnya menjadi pusat pendidikan Islam yang disegani.",
    facilities: ["Masjid Lawang Songo Pesantren Lirboyo", "Kompleks Makam KH. Abdul Karim, KH. Marzuqi Dahlan, & KH. Mahrus Aly", "Area Parkir Bus Lirboyo"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-22",
    name: "KH. Hamim Tohari Djazuli",
    title: "Gus Miek (Tambak Ngadi Mojo Kediri)",
    description: "Ulama sufi kharismatik pendiri Majelis Sema'an Al-Qur'an Mantab dan Dzikrul Ghofilin yang berdakwah di tempat-tempat gelap.",
    location: {
      lat: -7.9024,
      lng: 111.9442,
      address: "Dusun Tambak, Desa Ngadi, Kec. Mojo",
      city: "Kediri",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (17 Agustus 1940 – 5 Juni 1993 M)",
    sanad: "Putra KH. Ahmad Djazuli Utsman (Pendiri Pesantren Al-Falah Ploso Kediri); Mendapat ijazah dan bimbingan spiritual dari KH. Dalhar Gunungpring, KH. Hamid Pasuruan, & KH. Jogorekso",
    karya: [
      "Amalan Wirid 'Dzikrul Ghofilin' (Dzikir bagi orang-orang yang lalai agar kembali ingat kepada Allah)",
      "Majelis Sema'an Al-Qur'an 'Mantab' sejak 1986"
    ],
    references: [
      "Ibad, Muhammad Nurul (2001). Perjalanan dan Ajaran Gus Miek. Pustaka Pesantren LKiS.",
      "Wikipedia Bahasa Indonesia: Hamim Tohari Djazuli"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/Buka_bersama_di_Masjid_Baitul_Hasanah_Nglumbang_Gurah_Kediri.jpg",
    imageSource: "Wikimedia Commons — Tradisi Majelis Jamaah di Kabupaten Kediri (Warisan Dakwah Gus Miek Mojo Kediri)",
    history: "KH. Hamim Djazuli (Gus Miek) dikenal sebagai waliyullah yang merangkul masyarakat pinggiran, klub malam, dan jalanan tanpa menghakimi mereka, lalu menuntun mereka kembali mencintai Al-Qur'an dan para wali melalui majelis Dzikrul Ghofilin dan Sema'an Al-Qur'an Mantab yang dihadiri ratusan ribu jamaah.",
    facilities: ["Kubah Makam Gus Miek Tambak Mojo", "Pendopo Sema'an Al-Qur'an", "Area Parkir Luas & Tempat Wudhu"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-10",
    name: "Syekh Sayyid Jumadil Kubro",
    title: "Syekh Jumadil Kubro (Troloyo Mojokerto)",
    description: "Leluhur agung para Walisongo yang berdakwah di jantung ibu kota Kemaharajaan Majapahit pada abad ke-14.",
    location: {
      lat: -7.5682,
      lng: 112.3915,
      address: "Kompleks Makam Troloyo, Desa Sentonorejo, Kec. Trowulan",
      city: "Mojokerto",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-14 M (Nisan Troloyo berangka tahun 1376 M / Era Hayam Wuruk Majapahit)",
    sanad: "Keturunan ke-10 Husain bin Ali RA dari Samarkand; Ayahanda Syekh Ibrahim Asmoroqondi & Maulana Ishaq; Kakek dari Sunan Ampel dan Sunan Giri",
    karya: [
      "Komunitas Muslim bangsawan di pusat keraton Majapahit (Trowulan) sebagaimana terbukti pada nisan berangka tahun Saka & Hijriyah"
    ],
    references: [
      "Damais, Louis-Charles (1957). Études javanaises I: Les tombes musulmanes datées de Tralaya. Bulletin de l'École française d'Extrême-Orient (BEFEO).",
      "Bruinessen, Martin van (1994). Najmuddin al-Kubra, Jumadil Kubra and Jamaluddin al-Akbar. Bijdragen tot de Taal-, Land- en Volkenkunde.",
      "Wikipedia Bahasa Indonesia: Syekh Jumadil Kubro"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/012_Front_View%2C_Candi_Bajang_Ratu_%2839533857925%29.jpg",
    imageSource: "Wikimedia Commons — Kawasan Cagar Budaya Trowulan Majapahit, Mojokerto (Dekat Kompleks Makam Troloyo Syekh Jumadil Kubro)",
    history: "Kompleks Makam Troloyo di Trowulan, Mojokerto merupakan bukti arkeologis terpenting bahwa sejak puncak kejayaan Majapahit di bawah Prabu Hayam Wuruk dan Patih Gajah Mada (abad ke-14), komunitas Muslim dan ulama sufi seperti Syekh Jumadil Kubro telah hidup berdampingan dengan damai di lingkungan keraton.",
    facilities: ["Pendopo Agung Makam Troloyo", "Masjid Syekh Jumadil Kubro", "Museum Majapahit Trowulan (Dekat Lokasi)", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-11",
    name: "Syekh Ibrahim Asmoroqondi (Maulana Ibrahim As-Samarqandi)",
    title: "Syekh Ibrahim Asmoroqondi (Tuban)",
    description: "Ayahanda Kanjeng Sunan Ampel dan ulama besar asal Samarkand yang menyebarkan Islam di pesisir Tuban.",
    location: {
      lat: -6.9041,
      lng: 112.1165,
      address: "Desa Gesikharjo, Kec. Palang",
      city: "Tuban",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Awal Abad ke-15 M (Wafat sekitar 1425 M)",
    sanad: "Putra Syekh Jumadil Kubro; Ayahanda dari Raden Ali Rahmatullah (Sunan Ampel) dan Raden Santri (Ali Murtadho)",
    karya: [
      "Masjid & Pesantren Asmoroqondi di Desa Gesikharjo, Palang, Tuban"
    ],
    references: [
      "Babad Tuban & Atlas Wali Songo (Agus Sunyoto)",
      "Wikipedia Bahasa Indonesia: Ibrahim Asmarakandi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Masjid_Agung_Tuban_Lama.jpg",
    imageSource: "Wikimedia Commons — Arsitektur Islam Pesisir Tuban (Jalur Ziarah Syekh Ibrahim Asmoroqondi Palang Tuban)",
    history: "Setelah berdakwah di Kerajaan Champa dan menikahi putri Raja Champa (Dewi Candrawulan), Syekh Ibrahim Asmoroqondi berlayar menuju Pulau Jawa bersama kedua putranya (Raden Rahmat dan Raden Santri) serta keponakannya (Raden Burereh). Beliau mendarat di Pelabuhan Gisik (Palang, Tuban) dan berdakwah di sana hingga wafat.",
    facilities: ["Masjid Syekh Ibrahim Asmoroqondi", "Cungkup Makam & Gapura Paduraksa Kuno", "Area Parkir Bus Pantura Tuban-Gresik"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-12",
    name: "Sultan Panembahan Somala & Raja-Raja Sumenep",
    title: "Asta Tinggi & Asta Yusuf (Sumenep Madura)",
    description: "Kompleks makam agung para Sultan dan ulama Sumenep di bukit Kebonagung beserta Makam Syekh Yusuf Talango.",
    location: {
      lat: -7.0012,
      lng: 113.8415,
      address: "Bukit Kebonagung, Kec. Kota Sumenep",
      city: "Sumenep",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-17 – ke-19 M (Dibangun sekitar 1750 M)",
    sanad: "Pangeran Lor, Pangeran Wetan, Bindara Saod (Keturunan ulama sufi Madura), & Sultan Abdurrahman Pakunataningrat (Ulama ahli bahasa & astronomi)",
    karya: [
      "Masjid Jamik Sumenep (1779 M) & Keraton Sumenep",
      "Arsitektur Kubah Asta Tinggi perpaduan Jawa, Islam, Eropa, dan Tionghoa"
    ],
    references: [
      "De Jonge, Huub (1989). Madura dalam Empat Zaman. KITLV.",
      "Wikipedia Bahasa Indonesia: Asta Tinggi Sumenep"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Pasarean_Asta_Tinggi1.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kompleks Pasarean Asta Tinggi Raja-Raja Sumenep, Madura",
    history: "Asta Tinggi merupakan kompleks makam para penguasa dan ulama Kesultanan Sumenep seperti Bindara Saod (ulama santri yang menjadi adipati), Panembahan Somala (pendiri Masjid Jamik Sumenep), dan Sultan Abdurrahman yang terkenal alim. Di Pulau Talango (seberang Kalianget Sumenep) juga terdapat Asta Syekh Yusuf yang ramai diziarahi.",
    facilities: ["Cungkup Kubah Asta Tinggi", "Musholla & Pendopo Peziarah", "Area Parkir Bus Luas"],
    openingHours: "07:00 - 21:00 WIB"
  },

  // =========================================================================
  // VI. BALI & NUSA TENGGARA (WALI PITU BALI & AULIYA SASAK LOMBOK)
  // =========================================================================
  {
    id: "auliya-13",
    name: "Pangeran Mas Sepuh (Raden Amangkuningrat / Keramat Pantai Seseh)",
    title: "Wali Pitu Bali: Keramat Pantai Seseh (Mengwi Badung)",
    description: "Putra Raja Mengwi (Bali) dan Ibu asal Blambangan yang menjadi waliyullah penyebar Islam di pesisir Pantai Seseh, Bali.",
    location: {
      lat: -8.6415,
      lng: 115.1062,
      address: "Pantai Seseh, Desa Cemagi, Kec. Mengwi",
      city: "Badung",
      province: "Bali"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 M",
    sanad: "Putra I Gusti Agung Putu (Raja Mengwi I) & Putri Blambangan; Dianugerahi gelar 'Syekh Achmad Chamdi' oleh KH. Toyyib Al-Asyhari",
    karya: [
      "Jembatan persaudaraan Muslim Blambangan dan masyarakat adat Puri Mengwi Bali"
    ],
    references: [
      "Zuhri, Saifuddin & Tim Al-Khidmah: Sejarah Penemuan dan Manaqib Wali Pitu di Bali (1992)",
      "Jurnal Ulumuna UIN Mataram: Tradisi Ziarah Wali Pitu di Pulau Bali dan Harmoni Lintas Agama",
      "Wikipedia Bahasa Indonesia: Wali Pitu"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Pura_Taman_Ayun_terletak_di_Mengwi%2C_Bali.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kawasan Pusaka Kerajaan Mengwi, Badung (Leluhur Pangeran Mas Sepuh Keramat Pantai Seseh)",
    history: "Pangeran Mas Sepuh adalah putra Raja Mengwi dari permaisuri asal Kerajaan Blambangan (Banyuwangi) yang beragama Islam. Saat berlayar dari Blambangan untuk menemui ayahandanya di Bali, beliau gugur di Pantai Seseh akibat kesalahpahaman prajurit penjaga pantai. Ketika prajurit menyadari bahwa yang gugur adalah putra mahkota yang membawa keris pusaka Kerajaan Mengwi, makam beliau dibangun dan dijaga secara turun-temurun baik oleh umat Islam maupun masyarakat Hindu Bali.",
    facilities: ["Kompleks Makam Tepi Pantai Seseh", "Musholla Peziarah", "Area Parkir Wisata Religi Seseh"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-10",
    name: "Al-Habib Ali bin Abu Bakar bin Umar bin Abu Bakar Al-Hamid",
    title: "Wali Pitu Bali: Habib Ali Kusamba (Klungkung)",
    description: "Ulama habaib penyebar Islam di Kerajaan Klungkung dan guru bahasa Melayu di Puri Agung Klungkung.",
    location: {
      lat: -8.5542,
      lng: 115.4581,
      address: "Kampung Islam Kusamba, Kec. Dawan",
      city: "Klungkung",
      province: "Bali"
    },
    category: "Habaib",
    era: "Abad ke-19 M",
    sanad: "Dzurriyah Rasulullah SAW marga Al-Hamid yang diangkat menjadi kerabat kehormatan Raja Klungkung (Ida I Dewa Agung Putra)",
    karya: [
      "Pembinaan Kampung Muslim Kusamba & diplomasi persaudaraan dengan Puri Klungkung"
    ],
    references: [
      "Vickers, Adrian (1987). Hinduism and Islam in Indonesia: Bali and the Pasisir World. Indonesia (Cornell University).",
      "Jurnal Studi Islam Institut Agama Islam (IAI) Al-Qolam: Harmoni Sosial di Makam Wali Pitu Kusamba Klungkung"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Kemegahan_Puri_Agung_Klungkung%2C_Warisan_Budaya_yang_tak_tenilai.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Puri Agung Klungkung Bali (Mitra Diplomasi Habib Ali bin Abu Bakar Al-Hamid Kusamba)",
    history: "Habib Ali bin Abu Bakar Al-Hamid sangat dihormati oleh Raja Klungkung karena keluasan ilmu dan akhlaknya. Beliau dipercaya menjadi juru bahasa dan penasihat hubungan luar negeri Puri Klungkung hingga wafat saat pulang dari mengajar di keraton.",
    facilities: ["Masjid Al-Mahdi Kampung Kusamba", "Kubah Makam Habib Ali Al-Hamid", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-11",
    name: "Al-Habib Ali bin Umar bin Abu Bakar Bafaqih",
    title: "Wali Pitu Bali: Habib Ali Bafaqih (Loloan Negara)",
    description: "Ulama besar pendiri Pondok Pesantren Syamsul Huda Loloan (1935) dan sesepuh Wali Pitu di Bali Barat.",
    location: {
      lat: -8.3688,
      lng: 114.6182,
      address: "Jl. Gunung Agung, Loloan Barat, Kec. Negara",
      city: "Jembrana",
      province: "Bali"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (1890 – 1997 M, usia 107 tahun)",
    sanad: "Lahir di Banyuwangi; Murid ulama Makkah & Hadramaut; Guru para kiai dan masyarakat Melayu-Bugis Loloan Jembrana",
    karya: [
      "Pendirian Pondok Pesantren Syamsul Huda Loloan (Pesantren tertua di Bali, 1935 M)"
    ],
    references: [
      "Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang. Pustaka Al-Kautsar.",
      "Wikipedia Bahasa Indonesia: Wali Pitu"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/TAMAN_PECANGAKAN.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kawasan Kota Negara, Jembrana Bali (Dekat Kampung Melayu Loloan Makam Habib Ali Bafaqih)",
    history: "Habib Ali Bafaqih mengabdikan hidupnya lebih dari 80 tahun untuk mengajar ilmu agama di Kampung Melayu-Bugis Loloan, Jembrana. Beliau wafat pada tahun 1997 dalam usia 107 tahun dan menjadi salah satu rujukan utama ziarah Wali Pitu di Pulau Dewata.",
    facilities: ["Kompleks Pesantren Syamsul Huda Loloan", "Kubah Makam Habib Ali Bafaqih", "Masjid Agung Baitul Qadim Loloan", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-14",
    name: "Syekh Habib Umar bin Maulana Yusuf Al-Maghribi",
    title: "Wali Pitu Bali: Keramat Bukit Bedugul (Tabanan)",
    description: "Waliyullah yang makamnya berada di puncak perbukitan sejuk Kebun Raya Bedugul di atas Danau Beratan.",
    location: {
      lat: -8.2798,
      lng: 115.1585,
      address: "Puncak Bukit Kebun Raya Eka Karya Bedugul, Candikuning, Kec. Baturiti",
      city: "Tabanan",
      province: "Bali"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 – ke-17 M",
    sanad: "Jaringan penyebar Islam awal di dataran tinggi tengah Pulau Bali",
    karya: [
      "Pembinaan komunitas Muslim pegunungan Candikuning Bedugul"
    ],
    references: [
      "Sejarah Wali Pitu Bali — Yayasan Al-Khidmah",
      "Jurnal Kawistara Universitas Gadjah Mada: Situs Keramat Bedugul dalam Lanskap Multikultural Bali"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Pura_Ulundanu_Bedugul_di_pagi_hari.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Perbukitan Danau Beratan & Kebun Raya Bedugul (Lokasi Makam Syekh Habib Umar Al-Maghribi)",
    history: "Terletak di puncak bukit hutan hujan tropis di dalam kawasan Kebun Raya Bedugul dengan panorama Danau Beratan yang memesona, makam Syekh Habib Umar Al-Maghribi diziarahi ribuan jamaah dari Jawa, Madura, dan Lombok.",
    facilities: ["Cungkup Makam Puncak Bukit Bedugul", "Masjid Besar Al-Hidayah Candikuning", "Tangga Hutan Pinus", "Area Parkir Kebun Raya Bedugul"],
    openingHours: "08:00 - 18:00 WITA"
  },
  {
    id: "ulama-23",
    name: "Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid",
    title: "Tuan Guru Kyai Haji Zainuddin Abdul Madjid (Lombok)",
    description: "Pahlawan Nasional asal NTB, ulama besar lulusan Madrasah Ash-Shaulatiyah Makkah, dan pendiri Nahdlatul Wathan.",
    location: {
      lat: -8.6472,
      lng: 116.5284,
      address: "Kompleks Pondok Pesantren Darunnahdlatain NW, Pancor, Kec. Selong",
      city: "Lombok Timur",
      province: "Nusa Tenggara Barat"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (20 April 1898 – 21 Oktober 1997 M)",
    sanad: "Murid kesayangan Syekh Hasan Muhammad Al-Masysyath, Syekh Umar Hamdan Al-Mahrisi, & Syekh Salim Rahmatullah di Madrasah Ash-Shaulatiyah Makkah",
    karya: [
      "Hizib Nahdlatul Wathan & Hizib Nahdlatul Banat (Wirid perjuangan dan keselamatan)",
      "Kitab Wasiat Renungan Masa Pengalaman Baru",
      "Pendirian Madrasah NWDI (1937), NBDI (1943, madrasah khusus perempuan pertama di NTB), & ratusan lembaga pendidikan"
    ],
    references: [
      "Noor, Muhammad dkk. (2004). Visi Kebangsaan Religius: Refleksi Pemikiran dan Perjuangan Tuan Guru Kyai Haji Muhammad Zainuddin Abdul Madjid 1904–1997. Logos Wacana Ilmu.",
      "Keputusan Presiden RI No. 115/TK/Tahun 2017 tentang Pahlawan Nasional TGKH. Muhammad Zainuddin Abdul Madjid",
      "Wikipedia Bahasa Indonesia: Muhammad Zainuddin Abdul Madjid"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/c/cd/Hamzanwadi.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Potret Pahlawan Nasional Maulana Syaikh TGKH. Muhammad Zainuddin Abdul Madjid (Pancor Lombok)",
    history: "Dikenal masyarakat Sasak dengan panggilan takzim 'Maulana Syaikh' atau 'Tuan Guru Pancor', beliau belajar di Makkah selama 13 tahun dengan prestasi akademik luar biasa hingga gurunya Syekh Hasan Al-Masysyath memberikan syahadah ijazah yang ditulis dengan tinta emas. Sekembalinya ke Pulau Lombok pada 1934, beliau merevolusi pendidikan Islam dan perjuangan kemerdekaan di Nusa Tenggara Barat.",
    facilities: ["Kompleks Makam Taman Rinjani Pancor", "Masjid Agung Al-MAbrur Pancor", "Kampus IAI Hamzanwadi", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam",
    doaKhusus: [
      {
        title: "Doa Pusaka Hizib Nahdlatul Wathan",
        text: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى القَوْمِ الكَافِرِينَ.",
        translation: "Ya Tuhan kami, limpahkanlah kesabaran atas diri kami, kokohkanlah pendirian kami, dan tolonglah kami menghadapi kaum yang ingkar."
      }
    ]
  },
  {
    id: "auliya-15",
    name: "Syekh Gauz Abdurrazzaq (Maulana Syekh Gauz)",
    title: "Makam Keramat Loang Baloq (Mataram Lombok)",
    description: "Ulama sufi asal Baghdad penyebar Islam awal di Pulau Lombok yang makamnya berada di dalam akar pohon beringin raksasa.",
    location: {
      lat: -8.6042,
      lng: 116.0745,
      address: "Pantai Loang Baloq, Jl. Lingkar Selatan, Tanjung Karang, Kec. Sekarbela",
      city: "Mataram",
      province: "Nusa Tenggara Barat"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 – ke-17 M",
    sanad: "Ulama sufi asal Timur Tengah yang berdakwah dari Palembang menuju pantai barat Lombok",
    karya: [
      "Islamisasi pesisir Tanjung Karang & Ampenan Lombok"
    ],
    references: [
      "Budiwanti, Erni (2000). Islam Sasak: Wetu Telu versus Waktu Lima. LKiS.",
      "Jurnal Penelitian Keislaman UIN Mataram: Tradisi Ziarah Makam Loang Baloq di Kota Mataram"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/GraveBatuLayar.JPG",
    imageSource: "Wikimedia Commons — Kompleks Makam Keramat Pesisir Barat Lombok (Tradisi Ziarah Makam Loang Baloq & Batu Layar Mataram)",
    history: "Nama 'Loang Baloq' dalam bahasa Sasak berarti 'Lubang Buaya' atau 'Lubang Pohon Leluhur'. Di lokasi ini bersemayam Maulana Syekh Gauz Abdurrazzaq bersama Datuk Laut dan Anak Yatim di sela-sela akar pohon beringin tua yang sangat rindang di seberang Pantai Loang Baloq.",
    facilities: ["Kompleks Makam Loang Baloq", "Musholla & Bale Pertemuan Peziarah", "Taman Wisata Pantai Loang Baloq", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },

  // =========================================================================
  // VII. PULAU SUMATERA (ACEH, SUMUT, SUMBAR, RIAU & SUMSEL)
  // =========================================================================
  {
    id: "ulama-3",
    name: "Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili",
    title: "Teungku Syiah Kuala (Banda Aceh)",
    description: "Qadhi Malikul Adil (Mufti Besar) Kesultanan Aceh Darussalam, pengarang tafsir Al-Qur'an pertama berbahasa Melayu, dan pelopor Tarekat Syattariyah.",
    location: {
      lat: 5.5878,
      lng: 95.3333,
      address: "Desa Deah Raya, Kec. Syiah Kuala (Muara Sungai Krueng Aceh)",
      city: "Banda Aceh",
      province: "Aceh"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 M (1615 – 1693 M)",
    sanad: "Belajar 19 tahun di Haramain (1642–1661 M) kepada Syekh Ahmad Al-Qusyasyi & Syekh Ibrahim Al-Kurani; Mahaguru dari Syekh Burhanuddin Ulakan (Minangkabau) & Syekh Abdul Muhyi Pamijahan (Jawa Barat)",
    karya: [
      "Tarjuman al-Mustafid (Kitab Tafsir Al-Qur'an 30 Juz pertama dalam bahasa Melayu Nusantara)",
      "Mir'at ath-Thullab fi Tashil Ma'rifat al-Ahkam asy-Syar'iyyah lil Malik al-Wahhab (Kitab Hukum & Peradilan Kesultanan Aceh atas permintaan Sultanah Safiatuddin)",
      "Umdat al-Muhtajin & Tanbih al-Masyi"
    ],
    references: [
      "Azra, Azyumardi (2004). The Origins of Islamic Reformism in Southeast Asia: Networks of Malay-Indonesian and Middle Eastern 'Ulama' in the Seventeenth and Eighteenth Centuries. University of Hawaii Press.",
      "Riddell, Peter G. (2001). Islam and the Malay-Indonesian World: Transmission and Responses.",
      "Wikipedia Bahasa Indonesia: Abdurrauf as-Singkili"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Abdurrauf_Singkil.png",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Ilustrasi Sejarah Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala, Aceh)",
    history: "Lahir di Singkil tahun 1615 M, Syekh Abdurrauf diangkat menjadi Mufti Besar Kesultanan Aceh pada masa empat ratu (Sultanah Tajul Alam Safiatuddin hingga Kamalat Syah). Gelar 'Teungku Syiah Kuala' berasal dari bahasa Aceh 'Syaikh di Kuala' (Syekh yang bermukim dan dimakamkan di muara sungai). Nama beliau diabadikan menjadi Universitas Syiah Kuala (USK).",
    untoldStory: "Saat bencana gempa dan megatsunami Aceh pada 26 Desember 2004 menyapu rata seluruh bangunan di pesisir pantai Deah Raya, bangunan inti makam Teungku Syiah Kuala yang hanya berjarak beberapa puluh meter dari bibir pantai tetap bertahan.",
    facilities: ["Kompleks Makam Bersejarah Syiah Kuala", "Musholla & Bale Sejarah", "Area Parkir Pesisir Deah Raya"],
    openingHours: "07:00 - 18:00 WIB",
    karomah: [
      "Kompleks makam utama beliau tetap utuh meski diterjang gelombang megatsunami setinggi puluhan meter pada 26 Desember 2004.",
      "Mendamaikan pertikaian teologis antara aliran wujudiyah dan syariat di Aceh melalui karya-karya tasawuf neo-sufisme yang moderat."
    ]
  },
  {
    id: "ulama-24",
    name: "Syekh Hamzah Al-Fansuri",
    title: "Syekh Hamzah Fansuri (Subulussalam / Singkil)",
    description: "Bapak Sastra Melayu Klasik dan sufi agung abad ke-16 pencipta genre Syair Sufi Nusantara.",
    location: {
      lat: 2.6625,
      lng: 97.9612,
      address: "Desa Oboh, Kec. Rundeng (Tepi Sungai Lae Souraya)",
      city: "Subulussalam",
      province: "Aceh"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-16 M (Wafat sekitar 1590 M / 1527 M menurut epigrafi Makkah)",
    sanad: "Mursyid Tarekat Qadiriyah yang mengembara ke Baghdad, Makkah, Madinah, Yerusalem, Pahang, dan Ayutthaya (Siam)",
    karya: [
      "Syair Perahu, Syair Burung Pingai, & Syair Dagang",
      "Asrar al-'Arifin (Rahasia Para Ahli Makrifat) & Syarab al-'Asyiqin (Minuman Para Pecinta Tuhan)"
    ],
    references: [
      "Al-Attas, Syed Muhammad Naquib (1970). The Mysticism of Hamzah Fansuri. University of Malaya Press.",
      "Braginsky, Vladimir (2004). The Heritage of Traditional Malay Literature. Brill.",
      "Guillot, Claude & Kalus, Ludvik (2000). La stèle funéraire de Hamzah Fansuri. Archipel.",
      "Wikipedia Bahasa Indonesia: Hamzah Fansuri"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Lukisan_rekaan_wajah_Syekh_Hamzah_Fansuri_karya_M_Yasir.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Lukisan Sejarah Syekh Hamzah Fansuri karya M. Yasir",
    history: "Syekh Hamzah Fansuri berasal dari wilayah Barus/Fansur dan Singkil. Beliau adalah tokoh pertama yang mengangkat bahasa Melayu menjadi bahasa intelektual filsafat, teologi, dan puisi mistik (syair empat baris bersajak a-a-a-a) yang mempengaruhi perkembangan bahasa Indonesia modern.",
    facilities: ["Kompleks Makam Syekh Hamzah Fansuri Desa Oboh", "Masjid & Balai Ziarah", "Area Parkir"],
    openingHours: "07:00 - 18:00 WIB"
  },
  {
    id: "ulama-25",
    name: "Syekh Burhanuddin Ulakan (Pono)",
    title: "Syekh Burhanuddin Ulakan (Padang Pariaman)",
    description: "Ulama pelopor Islamisasi dataran Minangkabau, pendiri Surau Tanjung Medan, dan pusat tradisi ziarah 'Basafa'.",
    location: {
      lat: -0.7068,
      lng: 100.1812,
      address: "Nagari Ulakan, Kec. Ulakan Tapakis",
      city: "Padang Pariaman",
      province: "Sumatera Barat"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 M (1646 – 10 Shafar 1116 H / Juni 1704 M)",
    sanad: "Murid utama Syekh Abdurrauf As-Singkili di Banda Aceh selama hampir 30 tahun; Khalifah Agung Tarekat Syattariyah di Sumatera Barat",
    karya: [
      "Pendirian Surau Gadang Tanjung Medan Ulakan (1680 M) — cikal bakal sistem pendidikan Surau di Minangkabau",
      "Landasan filosofi 'Adat Basandi Syarak, Syarak Basandi Kitabullah'"
    ],
    references: [
      "Fathurahman, Oman (2008). Tarekat Syattariyah di Minangkabau: Teks dan Konteks. Prenada Media & EFEO.",
      "Dobbin, Christine (1983). Islamic Revivalism in a Changing Peasant Economy: Central Sumatra, 1784–1847.",
      "Wikipedia Bahasa Indonesia: Burhanuddin Ulakan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Surau_Gadang_Syekh_Burhanuddin_2020_01.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Surau Gadang & Kompleks Makam Syekh Burhanuddin Ulakan, Padang Pariaman",
    history: "Setelah menuntut ilmu agama dan Tarekat Syattariyah kepada Syekh Abdurrauf As-Singkili di Aceh, Syekh Burhanuddin kembali ke Ulakan, Pariaman pada tahun 1680 M. Setiap bulan Shafar, ratusan ribu jamaah dari berbagai provinsi di Sumatera berkumpul di makam beliau dalam tradisi 'Basafa' (Bersafar) untuk berdzikir dan menyambung silaturahmi keilmuan.",
    facilities: ["Masjid Agung Syekh Burhanuddin Ulakan", "Cungkup Makam Syekh Burhanuddin", "Surau Gadang Tanjung Medan", "Area Parkir Pantai Ulakan"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-26",
    name: "Syekh Abdul Wahab Rokan Al-Khalidi An-Naqsyabandi",
    title: "Tuan Guru Babussalam (Langkat Sumatera Utara)",
    description: "Mursyid Agung Tarekat Naqsyabandiyah Khalidiyah di Asia Tenggara dan pendiri Kampung Tariqat Babussalam Langkat.",
    location: {
      lat: 3.8965,
      lng: 98.4042,
      address: "Desa Besilam (Babussalam), Kec. Padang Tualang",
      city: "Langkat",
      province: "Sumatera Utara"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (28 September 1811 – 27 Desember 1926 M, usia 115 tahun)",
    sanad: "Lahir di Rokan (Riau); Murid Syekh Sulaiman Zuhdi di Jabal Abu Qubais Makkah & Syekh Zaini Dahlan",
    karya: [
      "Pendirian Kampung Religi Babussalam (Besilam) Langkat tahun 1883 M atas wakaf Sultan Musa Al-Mu'azzamsyah (Kesultanan Langkat)",
      "44 Wasiat Tuan Guru Babussalam",
      "Jaringan ratusan rumah suluk di Sumatera, Riau, hingga Semenanjung Malaya"
    ],
    references: [
      "Said, H.A. Fuad (1983). Syekh Abdul Wahab, Tuan Guru Babussalam. Pustaka Babussalam.",
      "Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Mizan.",
      "Wikipedia Bahasa Indonesia: Abdul Wahab Rokan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Azizi_Mosque%2C_Tanjung_Pura%2C_Langkat.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Azizi Kesultanan Langkat (Warisan Dakwah Tuan Guru Babussalam Syekh Abdul Wahab Rokan)",
    history: "Syekh Abdul Wahab Rokan mendirikan perkampungan mandiri berasaskan Tarekat Naqsyabandiyah di Besilam, Langkat pada tahun 1883 M. Beliau membimbing para sultan Melayu (Langkat, Deli, Serdang, Siak, Kunto Darussalam) dan mendidik ribuan khalifah suluk hingga wafat dalam usia 115 tahun.",
    facilities: ["Kompleks Makam Tuan Guru Babussalam", "Masjid Raya & Madrasah Babussalam", "Rumah Suluk Putra & Putri", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-27",
    name: "KH. Masagus Abdul Hamid bin Mahmud",
    title: "Kiai Marogan (Palembang Sumatera Selatan)",
    description: "Waliyullah kharismatik dari tepian Sungai Musi dan Sungai Ogan yang berdakwah dengan perahu menyusuri perairan Sumatera Selatan.",
    location: {
      lat: -3.0218,
      lng: 104.7495,
      address: "Kompleks Masjid Kiai Muara Ogan (Marogan), Kertapati, Pertemuan Sungai Musi & Sungai Ogan",
      city: "Palembang",
      province: "Sumatera Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 M (1811 – 31 Oktober 1901 M)",
    sanad: "Putra pasangan ulama Palembang dan bangsawan Tionghoa Muslim; Murid Syekh Ahmad Khatib As-Sambasi & Syekh Muhammad Azhari Al-Falimbani",
    karya: [
      "Pendirian Masjid Kiai Muara Ogan (1871 M) & Masjid Lawang Kidul Palembang (1881 M)",
      "Zikir 'Laa Ilaaha Illallah' dengan nada khas Marogan di sepanjang Sungai Musi"
    ],
    references: [
      "Rahim, Husni (1998). Sistem Otoritas dan Administrasi Islam: Studi tentang Pejabat Agama Masa Kesultanan dan Kolonial di Palembang. Logos.",
      "Jurnal Intizar UIN Raden Fatah Palembang: Biografi dan Karomah Kiai Marogan",
      "Wikipedia Bahasa Indonesia: Kiai Marogan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/LRT_Palembang_Ampera_Bridge.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Tepian Sungai Musi Palembang (Jalur Dakwah Perahu Kiai Marogan Muara Ogan)",
    history: "Lahir pada tahun 1811 M, KH. Masagus Abdul Hamid dikenal sebagai pengusaha kayu yang sangat dermawan sekaligus ulama sufi. Gelar 'Kiai Marogan' berasal dari lokasi masjid dan makam beliau di muara Sungai Ogan (Muara Ogan). Beliau berdakwah menaiki perahu kayu sembari menggemakan kalimat tauhid bersama para muridnya.",
    facilities: ["Masjid Kiai Muara Ogan (Cagar Budaya 1871 M)", "Kubah Makam Kiai Marogan", "Dermaga Wisata Religi Sungai Musi", "Area Parkir"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Memanggil kembali ribuan kayu gelondongan miliknya yang hanyut terbawa arus sungai hanya dengan tepukan tongkat dan dzikir.",
      "Memberi makan ribuan tamu pengajian hanya dari satu kawah penanak nasi kecil yang tidak habis-habis."
    ]
  },

  // =========================================================================
  // VIII. KALIMANTAN, SULAWESI & INDONESIA TIMUR (DATU, GURU & SULTAN)
  // =========================================================================
  {
    id: "ulama-2",
    name: "Syekh KH. Muhammad Zaini bin Abdul Ghani Al-Banjari",
    title: "Abah Guru Sekumpul (Martapura)",
    description: "Waliyullah kharismatik dari Martapura, Kalimantan Selatan yang Haul akbarnya dihadiri lebih dari 3 juta jamaah dari seluruh dunia.",
    location: {
      lat: -3.4357,
      lng: 114.8576,
      address: "Kompleks Musholla Ar-Raudhah, Jl. Sekumpul, Kec. Martapura",
      city: "Banjar",
      province: "Kalimantan Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 – Awal Abad ke-21 M (11 Februari 1942 – 10 Agustus 2005 M)",
    sanad: "Keturunan ke-8 Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan); Murid KH. Seman Mulia, KH. Syarwani Abdan Bangil, KH. Falak Bogor, & Syekh Yasin Al-Fadani",
    karya: [
      "Kitab Risalah Nuraniyah & Manaqib Walidatul Mu'minin Siti Khadijah",
      "Majelis Maulid Al-Habsyi & Burdah Musholla Ar-Raudhah Sekumpul",
      "Mursyid Tarekat Sammaniyah dengan jutaan murid di Kalimantan dan Nusantara"
    ],
    references: [
      "Tim Sahabat Sekumpul (2010). Manaqib Syekh Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul).",
      "Jurnal Al-Banjari UIN Antasari Banjarmasin: Fenomena Keagamaan dan Kharisma Abah Guru Sekumpul di Martapura",
      "Wikipedia Bahasa Indonesia: Muhammad Zaini Abdul Ghani"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Guru-ijai-sekumpul.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul, Martapura)",
    history: "Lahir di Tunggul Irang, Martapura pada 27 Muharram 1361 H (1942 M), KH. Muhammad Zaini Abdul Ghani (Guru Ijai / Abah Guru Sekumpul) menghafal Al-Qur'an dan tafsir Jalalain sejak usia kanak-kanak. Beliau membangun kawasan Sekumpul menjadi pusat pengajian tasawuf, maulid Nabi SAW, dan kemuliaan adab yang dicintai seluruh lapisan masyarakat.",
    untoldStory: "Setiap pelaksanaan Haul Abah Guru Sekumpul di bulan Rajab, warga Martapura dan Kalimantan Selatan membuka ribuan dapur umum gratis di sepanjang jalan berpuluh-puluh kilometer untuk menjamu jutaan peziarah yang datang dari dalam dan luar negeri.",
    facilities: ["Musholla Ar-Raudhah Sekumpul", "Kubah Makam Abah Guru Sekumpul, Guru Seman Mulia, & Guru Salman Jalil", "Pusat Perbelanjaan Batu Permata & Kitab Martapura", "Area Parkir Luas"],
    openingHours: "Buka Sesuai Jadwal Musholla Ar-Raudhah (Umum & Pengajian Rutin Malam Senin)",
    karomah: [
      "Aroma harum kasturi yang semerbak dari tubuh dan majelis beliau meskipun tanpa minyak wangi.",
      "Kemampuan kasyaf (mengetahui isi hati tamu) dan kemurahan hati beliau yang membagikan harta dalam jumlah sangat besar kepada para ulama dan fakir miskin.",
      "Haul beliau menjadi salah satu perkumpulan ziarah keagamaan terbesar di Asia Tenggara yang tertib dan penuh berkah."
    ],
    doaKhusus: [
      {
        title: "Tawasul Abah Guru Sekumpul",
        text: "إِلَى حَضْرَةِ العَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ زَيْنِي بِنْ عَبْدِ الغَنِي البَنْجَرِي (غُورُو سَكُومْفُولْ)، الفَاتِحَة...",
        translation: "Kepada kehadirat Al-Arif Billah Syekh Muhammad Zaini bin Abdul Ghani Al-Banjari (Abah Guru Sekumpul). Al-Fatihah..."
      }
    ]
  },
  {
    id: "ulama-28",
    name: "Syekh Muhammad Arsyad bin Abdullah Al-Banjari",
    title: "Datu Kalampayan (Astambul Banjar)",
    description: "Matahari Islam Kalimantan, pengarang kitab fikih monumental 'Sabilal Muhtadin', dan leluhur ribuan ulama Banjar.",
    location: {
      lat: -3.3742,
      lng: 114.8895,
      address: "Desa Kalampayan Tengah, Kec. Astambul",
      city: "Banjar",
      province: "Kalimantan Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-18 – Awal Abad ke-19 M (17 Maret 1710 – 3 Oktober 1812 M, usia 102 tahun)",
    sanad: "Belajar 30 tahun di Makkah dan 5 tahun di Madinah bersama Syekh Abdus Shamad Al-Falimbani & Syekh Abdul Wahab Bugis di bawah bimbingan Syekh Muhammad bin Abdul Karim As-Samman Al-Madani",
    karya: [
      "Kitab Sabilal Muhtadin lit-Tafaqquh fi Amrid-Din (Kitab Fikih Syafi'i terbesar di Asia Tenggara, ditulis tahun 1779 M atas permintaan Sultan Tahmidullah II)",
      "Kitab Tuhfat ar-Raghibin, Kanzul Ma'rifah, & Ushuluddin",
      "Pembetulan arah kiblat Masjid Jembatan Lima (Jakarta) saat singgah tahun 1772 M"
    ],
    references: [
      "Daudi, Abu (1996). Maulana Syekh Muhammad Arsyad Al-Banjari (Tuan Haji Besar). Madrasah Sullamul 'Ulum Dalam Pagar.",
      "Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII & XVIII. Kencana.",
      "Wikipedia Bahasa Indonesia: Muhammad Arsyad al-Banjari"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Muhammad_Arsyad_al-Banjari.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Lukisan Sejarah Maulana Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)",
    history: "Lahir di Lok Gabang, Martapura pada 15 Shafar 1122 H (1710 M), kecerdasan Muhammad Arsyad kecil menarik perhatian Sultan Hamidullah (Sultan Banjar) hingga diangkat anak dan dibiayai menuntut ilmu di Makkah dan Madinah selama 35 tahun. Sekembalinya ke Banjar pada Ramadhan 1186 H (1772 M), beliau membuka perkampungan pendidikan Islam Dalam Pagar dan mengubah lahan rawa Kalampayan menjadi lumbung pertanian dan pusat syariat Islam.",
    untoldStory: "Dalam perjalanan pulang dari Makkah menuju Kalimantan pada 1772 M, Syekh Muhammad Arsyad singgah di Batavia selama dua bulan dan mengoreksi arah kiblat beberapa masjid tua di Jakarta (Masjid Jembatan Lima, Masjid Pekojan, dan Masjid Luar Batang) hingga melenceng tepat 25 derajat ke kanan sesuai hisab falakiyah presisi. Peristiwa ini dicatat dalam prasasti batu Bahasa Arab di Masjid Jembatan Lima Jakarta Barat.",
    facilities: ["Kubah Agung Makam Datu Kalampayan", "Masjid Jami' Tuhfaturroghibin Dalam Pagar", "Dermaga Wisata Sungai Martapura & Jalur Darat", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam",
    karomah: [
      "Mengoreksi arah kiblat masjid-masjid di Batavia pada tahun 1772 M dan memperlihatkan penampakan Ka'bah secara nyata kepada para penguasa dan ulama Batavia.",
      "Bijih tanaman cempedak yang beliau kirim dari Makkah ke Kalimantan sampai lebih dahulu dan tumbuh subur sebelum kapal beliau mendarat."
    ]
  },
  {
    id: "habib-12",
    name: "Al-Habib Hamid bin Abbas Bahasyim",
    title: "Habib Basirih (Kubah Basirih Banjarmasin)",
    description: "Waliyullah majdzub di tepi Sungai Martapura Banjarmasin yang berkhalwat di atas pohon kelapa.",
    location: {
      lat: -3.3442,
      lng: 114.5685,
      address: "Jl. Keramat Basirih, Basirih, Kec. Banjarmasin Barat (Tepi Sungai Martapura)",
      city: "Banjarmasin",
      province: "Kalimantan Selatan"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (Wafat 18 Jumadil Awal 1368 H / 1949 M)",
    sanad: "Leluhur beliau Habib Awad bin Umar Bahasyim; Masih sejalur keturunan dengan Sunan Ampel melalui marga Azmatkhan/Bahasyim",
    karya: [
      "Keteladanan uzlah dan perlindungan spiritual masyarakat tepian Sungai Barito & Martapura"
    ],
    references: [
      "Jurnal Kebudayaan Kandil Balai Pelestarian Nilai Budaya Kalimantan: Sejarah dan Arsitektur Kubah Habib Basirih Banjarmasin",
      "Wikipedia Bahasa Indonesia: Kubah Basirih"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Masjid_Jami_Banjarmasin_%2815-08-2024%29.jpg",
    imageSource: "Wikimedia Commons — Arsitektur Islam Tepian Sungai Banjarmasin (Jalur Ziarah Kubah Habib Hamid bin Abbas Bahasyim / Habib Basirih)",
    history: "Habib Hamid bin Abbas Bahasyim dikenal sebagai waliyullah yang menempuh jalan khalwat unik di Basirih, Banjarmasin. Pada masa pendudukan Jepang, tentara Jepang tidak berani mengusik kawasan Basirih karena kewibawaan spiritual beliau. Makam beliau dikenal dengan sebutan 'Kubah Basirih' dan dapat diakses baik melalui jalur darat maupun perahu klotok menyusuri Sungai Martapura.",
    facilities: ["Kubah Makam Habib Basirih", "Masjid & Dermaga Klotok Sungai Martapura", "Pusat Kerajinan Sasirangan & Kuliner Soto Banjar", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-16",
    name: "Sultan Suriansyah (Pangeran Samudera)",
    title: "Makam Sultan Suriansyah (Banjarmasin)",
    description: "Raja pertama Kesultanan Banjar yang memeluk Islam pada 24 September 1526 M dan pendiri Masjid Sultan Suriansyah.",
    location: {
      lat: -3.2915,
      lng: 114.5732,
      address: "Jl. Kuin Utara, Kelurahan Kuin Utara, Kec. Banjarmasin Utara",
      city: "Banjarmasin",
      province: "Kalimantan Selatan"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 M (Memerintah 1526 – 1550 M)",
    sanad: "Dibimbing memeluk Islam oleh Khatib Dayan (Utusan Kesultanan Demak masa Sultan Trenggono & Sunan Kudus)",
    karya: [
      "Pendirian Kesultanan Islam Banjar (24 September 1526 M — menjadi Hari Jadi Kota Banjarmasin)",
      "Pembangunan Masjid Sultan Suriansyah (Masjid Kuin, masjid tertua di Kalimantan Selatan)"
    ],
    references: [
      "Ras, J.J. (1968). Hikajat Bandjar: A Study in Malay Historiography. KITLV.",
      "Wikipedia Bahasa Indonesia: Suriansyah dari Banjar"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Masjidbersejarahsultansuriansyah.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Bersejarah Sultan Suriansyah (1526 M), Kuin Utara, Banjarmasin",
    history: "Pangeran Samudera menjalin aliansi dengan Kesultanan Demak di Jawa dan mengucapkan syahadat pada tanggal 24 September 1526 M dengan gelar Sultan Suriansyah. Di kompleks makam Kuin Utara ini juga bersemayam Khatib Dayan (ulama utusan Demak) serta para bangsawan awal Kesultanan Banjar.",
    facilities: ["Kompleks Cagar Budaya Makam Sultan Suriansyah", "Masjid Bersejarah Sultan Suriansyah (Berdiri 1526 M)", "Dermaga Kuin & Area Parkir"],
    openingHours: "07:00 - 21:00 WITA"
  },
  {
    id: "ulama-4",
    name: "Syekh Yusuf Abul Mahasin Tajul Khalwati Al-Makassari",
    title: "Syekh Yusuf Al-Makassari (Gowa)",
    description: "Pahlawan Nasional Indonesia dan Afrika Selatan, Mahaguru Tarekat Khalwatiyah yang berjuang di Gowa, Banten, Sri Lanka, hingga Cape Town.",
    location: {
      lat: -5.2064,
      lng: 119.4533,
      address: "Jl. Syekh Yusuf, Lakiung / Ko'bang, Katangka, Kec. Somba Opu",
      city: "Gowa",
      province: "Sulawesi Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 M (3 Juli 1626 – 23 Mei 1699 M)",
    sanad: "Memegang ijazah 5 Tarekat Muktabarah (Khalwatiyah, Naqsyabandiyah, Syattariyah, Qadiriyah, & Ba'alawiyah) dari Syekh Abu Al-Barakat Ayyub Al-Khalwati (Damaskus), Syekh Ibrahim Al-Kurani (Madinah), & Syekh Nuruddin Ar-Raniri (Aceh)",
    karya: [
      "Zubdat al-Asrar fi Tahqiq Ba'd Masyarib al-Akhyar",
      "Safinat an-Najah (Ditulis saat pengasingan di Ceylon/Sri Lanka)",
      "An-Nafhat as-Saylaniyyah & lebih dari 25 risalah tasawuf berbahasa Arab"
    ],
    references: [
      "Hamid, Abu (1994). Syekh Yusuf: Seorang Ulama, Sufi dan Pejuang. Yayasan Obor Indonesia.",
      "Lubis, Nabilah (1996). Syekh Yusuf Al-Taj Al-Makasari: Menyingkap Intisari Segala Rahasia. Mizan & EFEO.",
      "Azra, Azyumardi (2004). The Origins of Islamic Reformism in Southeast Asia.",
      "Wikipedia Bahasa Indonesia: Syekh Yusuf"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Masjid_Syekh_Muhammad_Yusuf_20220626_151617.jpg",
    imageSource: "Wikimedia Commons — Kompleks Masjid & Makam Syekh Yusuf Al-Makassari (Tuanta Salamaka ri Gowa)",
    history: "Lahir di Gowa pada 3 Juli 1626 M (dikenal masyarakat Sulawesi sebagai 'Tuanta Salamaka ri Gowa' — Guru Kami yang Agung dari Gowa). Setelah menuntut ilmu di Aceh, Yaman, Makkah, Madinah, dan Damaskus selama lebih dari 20 tahun, beliau menjadi mufti dan panglima perang Sultan Ageng Tirtayasa di Kesultanan Banten melawan VOC. Beliau ditangkap dan diasingkan VOC ke Sri Lanka (1684) lalu ke Macassar, Cape Town, Afrika Selatan (1694) hingga wafat tahun 1699 dan menjadi Bapak Islam Afrika Selatan. Atas permintaan Raja Gowa Sultan Abdul Jalil, jenazah beliau dipulangkan ke Lakiung, Gowa pada tahun 1705 M.",
    facilities: ["Kubah Makam Tuanta Salamaka Syekh Yusuf Gowa", "Masjid Tua Katangka (Berdiri 1603 M — Dekat Lokasi)", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-17",
    name: "Abdul Makmur Khatib Tunggal (Datuk Ri Bandang)",
    title: "Makam Datuk Ri Bandang (Makassar)",
    description: "Ulama besar asal Koto Tangah Minangkabau dan santri Sunan Giri yang mengislamkan Kerajaan Gowa-Tallo di Sulawesi Selatan.",
    location: {
      lat: -5.1102,
      lng: 119.4425,
      address: "Jl. Sinassara, Kaluku Bodoa, Kec. Tallo",
      city: "Makassar",
      province: "Sulawesi Selatan"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 – Awal Abad ke-17 M (Tiba di Sulawesi 1603/1605 M)",
    sanad: "Santri Pesantren Giri Kedaton (Gresik); Satu dari 'Dato' Tallua' (Tiga Datuk Penyebar Islam Sulawesi Selatan bersama Datuk Patimang & Datuk Ri Tiro)",
    karya: [
      "Pengislaman Raja Tallo (I Mallingkaang Daeng Manyonri / Sultan Abdullah Awalul Islam) dan Raja Gowa XIV (I Mangarangi Daeng Manrabia / Sultan Alauddin) pada 22 September 1605 M",
      "Penyebaran Islam ke Kerajaan Bima (NTB) dan Kutai (Kalimantan Timur)"
    ],
    references: [
      "Noorduyn, J. (1956). De Islamisering van Makasar. Bijdragen tot de Taal-, Land- en Volkenkunde.",
      "Pelras, Christian (1985). Religion, Tradition and the Dynamics of Islamization in South-Sulawesi. Archipel.",
      "Wikipedia Bahasa Indonesia: Datuk ri Bandang"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Bangunan_Makam_Datuk_ri_Bandang.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Bangunan Cungkup Makam Datuk Ri Bandang, Tallo, Makassar",
    history: "Abdul Makmur Khatib Tunggal berasal dari Koto Tangah, Minangkabau dan belajar di Giri Kedaton Gresik sebelum diutus berdakwah ke Indonesia Timur. Bersama dua rekannya (Datuk Patimang / Khatib Sulaiman dan Datuk Ri Tiro / Khatib Bungsu), mereka membagi strategi dakwah: Datuk Patimang di Luwu dengan pendekatan tauhid, Datuk Ri Tiro di Bulukumba dengan tasawuf, dan Datuk Ri Bandang di Gowa-Tallo dengan pendekatan syariat dan fikih.",
    facilities: ["Kompleks Makam Datuk Ri Bandang Kaluku Bodoa", "Dekat Kompleks Makam Raja-Raja Tallo", "Musholla & Area Parkir"],
    openingHours: "07:00 - 18:00 WITA"
  },
  {
    id: "habib-13",
    name: "Al-Habib Sayyid Idrus bin Salim Al-Jufri",
    title: "Guru Tua (Alkhairaat Palu Sulawesi Tengah)",
    description: "Pahlawan Pendidikan Islam Indonesia Timur dan pendiri jaringan ribuan madrasah Alkhairaat dari Palu hingga Maluku dan Papua.",
    location: {
      lat: -0.9005,
      lng: 119.8582,
      address: "Kompleks Masjid Alkhairaat, Jl. Sis Aljufri, Kamonji, Kec. Palu Barat",
      city: "Palu",
      province: "Sulawesi Tengah"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (15 Maret 1892 – 22 Desember 1969 M)",
    sanad: "Lahir di Tarim (Hadramaut); Putra Mufti Tarim Sayyid Salim bin Alwi Al-Jufri; Murid Habib Ali bin Muhammad Al-Habsyi & Habib Abdurrahman bin Ubaidillah Assegaf",
    karya: [
      "Pendirian Perguruan Islam Alkhairaat di Palu pada 14 Muharram 1349 H (30 Juni 1930 M) yang berkembang menjadi 1.700+ madrasah dan Universitas Alkhairaat (Unisa)",
      "Diwan Syair Arab perjuangan kemerdekaan & pendidikan umat"
    ],
    references: [
      "Bachmid, Badaruddin (2007). Sang Bintang dari Timur: Sayyid Idrus bin Salim Al-Jufri Sosok Ulama dan Sastrawan. Studia Islamika.",
      "Wikipedia Bahasa Indonesia: Idrus bin Salim Al-Jufri"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Habib_Idrus_bin_Salim_al-Jufri.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Resmi Al-Habib Idrus bin Salim Al-Jufri (Guru Tua Alkhairaat, Palu)",
    history: "Sayyid Idrus bin Salim Al-Jufri (dihormati masyarakat Sulawesi Tengah dan kawasan timur Indonesia dengan panggilan 'Guru Tua') mendedikasikan hidupnya membuka isolasi pendidikan di pedalaman Sulawesi, Kalimantan Timur, Maluku, dan Papua sejak tahun 1930. Haul Guru Tua di Palu setiap bulan Syawal dihadiri ratusan ribu Abnaulkhairaat dari seluruh Indonesia.",
    facilities: ["Masjid Agung Alkhairaat Jl. Sis Aljufri", "Kubah Makam Guru Tua", "Kampus Universitas Alkhairaat (Unisa) Palu", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-29",
    name: "Kyai Muslim Muhammad Khalifah (Kyai Mojo)",
    title: "Makam Kyai Mojo (Tondano Minahasa)",
    description: "Ulama penasihat spiritual dan panglima utama Pangeran Diponegoro dalam Perang Jawa yang diasingkan ke Tondano, Sulawesi Utara.",
    location: {
      lat: 1.3268,
      lng: 124.9185,
      address: "Bukit Wulauan, Kampung Jawa Tondano, Kec. Tondano Utara",
      city: "Minahasa",
      province: "Sulawesi Utara"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-18 – ke-19 M (1792 – 20 Desember 1849 M)",
    sanad: "Putra Kyai Baderan (Imam Abdul Ngarip, ulama Keraton Surakarta); Sepupu sekaligus Guru Spiritual Pangeran Diponegoro",
    karya: [
      "Strategi perang Sabilillah dalam Perang Jawa (1825–1830)",
      "Pendirian Kampung Jawa Tondano (Jaton) bersama 62 pengikut setianya di Minahasa (1829)"
    ],
    references: [
      "Carey, Peter (2008). The Power of Prophecy: Prince Dipanagara and the End of an Old Order in Java, 1785–1855. KITLV Press.",
      "Babcock, Tim (1989). Kampung Jawa Tondano: Religion and Cultural Identity. Gadjah Mada University Press.",
      "Wikipedia Bahasa Indonesia: Kyai Maja"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Kyai_Modjo_Pejuang_Perang_Jawa_Yang_di_Asingkan_di_Tondano_%28cropped%29.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Lukisan Sejarah Kyai Mojo (Panglima Spiritual Perang Diponegoro di Tondano)",
    history: "Kyai Mojo adalah ulama asal Desa Mojo, Pajang (Surakarta) yang menjadi otak intelektual dan rohani di balik Perang Diponegoro (1825–1830). Setelah ditangkap Belanda dalam perundingan pada November 1828, beliau beserta 62 pengikutnya diasingkan ke Tondano, Minahasa pada tahun 1829. Para pengikut beliau menikah dengan gadis-gadis Minahasa dan melahirkan komunitas Muslim Kampung Jawa Tondano (Jaton) yang rukun dan lestari hingga kini.",
    facilities: ["Cungkup Makam Kyai Mojo di Bukit Wulauan", "Masjid Agung Al-Falah Kampung Jawa Tondano", "Pendopo Sejarah Perang Jawa", "Area Parkir"],
    openingHours: "07:00 - 18:00 WITA"
  },
  {
    id: "ulama-30",
    name: "KH. Noer Ali",
    title: "KH. Noer Ali (Singa Karawang-Bekasi)",
    description: "Pahlawan Nasional asal Bekasi, panglima Laskar Rakyat, dan pendiri Pondok Pesantren Attaqwa Ujung Harapan.",
    location: {
      lat: -6.1652,
      lng: 107.0185,
      address: "Kompleks Pondok Pesantren Attaqwa Putri, Ujung Harapan, Bahagia, Kec. Babelan",
      city: "Bekasi",
      province: "Jawa Barat"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (15 Juli 1914 – 29 Januari 1992 M)",
    sanad: "Murid Guru Marzuki Cipinang Muara, Syekh Ali Al-Maliki, Syekh Umar Hamdan, & Syekh Abdul Zalil di Makkah (1934–1940)",
    karya: [
      "Pendirian Yayasan & Pondok Pesantren Attaqwa Bekasi (membina puluhan ribu santri dan ratusan masjid/musholla)",
      "Komandan Laskar Rakyat Bekasi dalam pertempuran Pondok Ungu & Sasak Kapuk (Inspirasi puisi 'Karawang-Bekasi' Chairil Anwar)"
    ],
    references: [
      "Ali, Lukman (2006). KH. Noer Alie: Kemandirian Ulama Pejuang. Yayasan Attaqwa Bekasi.",
      "Keputusan Presiden RI No. 085/TK/Tahun 2006 tentang Gelar Pahlawan Nasional KH. Noer Ali",
      "Wikipedia Bahasa Indonesia: Noer Alie"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/KH._Noer_Alie_Professional_Photos.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Potret Pahlawan Nasional KH. Noer Ali (Pendiri Pesantren Attaqwa Bekasi)",
    history: "Sekembalinya dari menuntut ilmu di Makkah pada tahun 1940, KH. Noer Ali mendirikan pesantren di Ujung Harapan, Babelan, Bekasi. Saat tentara Sekutu dan NICA mencoba merebut kembali Republik Indonesia, beliau memimpin Laskar Rakyat Karawang-Bekasi di garis depan pertempuran dan setelah kemerdekaan mengabdikan hidupnya membangun jaringan pendidikan Islam Attaqwa.",
    facilities: ["Masjid Jami' Al-Baqiyatussholihat Attaqwa", "Kompleks Makam Pahlawan Nasional KH. Noer Ali", "Area Parkir Luas"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "ulama-31",
    name: "KH. Maimoen Zubair",
    title: "Mbah Moen (Pesantren Al-Anwar Sarang Rembang)",
    description: "Ulama kharismatik rujukan nasional dan pengasuh Pondok Pesantren Al-Anwar Sarang, Rembang.",
    location: {
      lat: -6.7285,
      lng: 111.6942,
      address: "Pondok Pesantren Al-Anwar, Desa Karangmangu, Kec. Sarang",
      city: "Rembang",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 – ke-21 M (28 Oktober 1928 – 6 Agustus 2019 M)",
    sanad: "Putra KH. Zubair Dahlan; Murid Sayyid Alawi bin Abbas Al-Maliki, Syekh Yasin Al-Fadani, Syekh Hasan Al-Masysyath (Makkah), & KH. Abdul Karim Lirboyo",
    karya: [
      "Kitab Al-'Ulama al-Mujaddidun, Tarajim Masyayikh al-Ma'ahid ad-Diniyyah bi Sarang, & Maslak at-Tanasuk",
      "Pendirian Pondok Pesantren Al-Anwar Sarang (1967) & STAI Al-Anwar"
    ],
    references: [
      "Zubair, Maimoen (2006). Tarajim Masyayikh al-Ma'ahid ad-Diniyyah bi Sarang al-Qudama'. Maktabah Al-Anwar.",
      "Wikipedia Bahasa Indonesia: Maimun Zubair"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Maimun_Zubair%2C_Antara_TV_Indonesia%2C_00.33.jpg",
    imageSource: "LKBN Antara / Wikimedia Commons — Potret KH. Maimoen Zubair (Pengasuh Pondok Pesantren Al-Anwar Sarang, Rembang)",
    history: "KH. Maimoen Zubair (Mbah Moen) adalah salah satu ulama fikih dan tafsir paling berpengaruh di Indonesia modern yang memadukan kedalaman tradisi pesantren salaf dengan wawasan kebangsaan Nusantara. Meskipun beliau wafat saat menunaikan ibadah haji pada 6 Agustus 2019 dan dimakamkan di Ma'la (Makkah) dekat makam gurunya Sayyid Alawi Al-Maliki dan Syekh Nawawi Al-Bantani, Pondok Pesantren Al-Anwar dan makam ayahanda beliau (KH. Zubair Dahlan) di Sarang, Rembang menjadi titik singgah utama para peziarah jalur Pantura Jawa Tengah–Jawa Timur.",
    facilities: ["Kompleks Pesantren Al-Anwar Sarang", "Makam KH. Zubair Dahlan & Masyayikh Sarang", "Masjid Pesantren & Parkir Bus Jalur Pantura"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "ulama-32",
    name: "Syekh KH. Baidhowi bin Abdul Aziz & Masyayikh Lasem",
    title: "Makam Masyayikh Masjid Jami' Lasem (Rembang)",
    description: "Kompleks makam ulama besar Lasem ('Tiongkok Kecil' & Kota Santri): Mbah Sambu (Sayyid Abdurrahman), KH. Ma'shum Ahmad, dan KH. Baidhowi.",
    location: {
      lat: -6.6962,
      lng: 111.4485,
      address: "Kompleks Masjid Jami' Baiturrahman Lasem, Jl. Raya Lasem, Kauman, Kec. Lasem",
      city: "Rembang",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-17 – ke-20 M (Mbah Sambu wafat 1671 M; KH. Ma'shum wafat 1972 M)",
    sanad: "Sayyid Abdurrahman (Mbah Sambu, cucu Jaka Tingkir & Pangeran Benowo); KH. Ma'shum Ahmad & KH. Baidhowi (Pendiri NU & guru KH. Abdul Hamid Pasuruan)",
    karya: [
      "Jaringan Pesantren Al-Hidayat & Al-Wahdah Lasem",
      "Harmoni persaudaraan Muslim santri dan warga Tionghoa Lasem sejak abad ke-15"
    ],
    references: [
      "Aziz, Munawir (2014). Lasem Kota Tiongkok Kecil: Interaksi Tionghoa, Arab, dan Jawa dalam Silang Budaya Pesisir. Ombak.",
      "Wikipedia Bahasa Indonesia: Masjid Jami' Lasem"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/6/68/Kantor_Kecamatan_lasem.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Kawasan Kota Pusaka Lasem, Rembang (Kompleks Masjid Jami' Lasem & Makam Mbah Sambu)",
    history: "Di belakang dan samping Masjid Jami' Lasem yang berdiri sejak 1588 M, bersemayam waliyullah pelindung Lasem Sayyid Abdurrahman (Mbah Sambu) beserta para mahaguru pesantren abad ke-20 seperti KH. Ma'shum Ahmad (ayahanda KH. Ali Ma'shum Krapyak) dan KH. Baidhowi Abdul Aziz (ulama ahli Qira'at dan Rais PBNU).",
    facilities: ["Masjid Jami' Lasem", "Cungkup Makam Mbah Sambu & Masyayikh Lasem", "Perpustakaan Masjid & Parkir Bus Pantura"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-18",
    name: "Sultan Maulana Yusuf bin Maulana Hasanuddin",
    title: "Sultan Maulana Yusuf (Kasemen Banten)",
    description: "Sultan kedua Kesultanan Banten yang menaklukkan Pakuan Pajajaran dan memajukan pertanian irigasi serta perniagaan Banten.",
    location: {
      lat: -6.0532,
      lng: 106.1628,
      address: "Kampung Pekalangan Gede, Desa Kasunyatan, Kec. Kasemen",
      city: "Serang",
      province: "Banten"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 M (Memerintah 1570 – 1580 M)",
    sanad: "Putra Sultan Maulana Hasanuddin Banten & Ratu Ayu Kirana; Cucu Sunan Gunung Jati Cirebon",
    karya: [
      "Pembangunan Masjid Kasunyatan Banten (Abad ke-16 M)",
      "Pembangunan benteng batu bata Keraton Surosowan & bendungan irigasi sawah Banten",
      "Semboyan 'Gawe Kuta Baluwarti Bata Kalawan Kawis' (Membangun kota dengan bata dan karang)"
    ],
    references: [
      "Djajadiningrat, Hoesein (1913). Critische Beschouwing van de Sadjarah Banten.",
      "Ambary, Hasan Muarif (1998). Menemukan Peradaban: Jejak Arkeologis dan Historis Islam Indonesia. Logos.",
      "Wikipedia Bahasa Indonesia: Maulana Yusuf dari Banten"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/COLLECTIE_TROPENMUSEUM_Begraafplaats_Maulana_Yusuf_Pakalangan_TMnr_60016489.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Kompleks Makam Sultan Maulana Yusuf di Pekalangan Gede, Kasemen, Banten",
    history: "Sultan Maulana Yusuf melanjutkan kepemimpinan ayahandanya, Sultan Maulana Hasanuddin, dari tahun 1570 hingga 1580 M. Beliau mengalihkan perekonomian Banten tidak hanya bertumpu pada pelabuhan lada, tetapi juga membuka lahan persawahan luas beririgasi teknis serta mendirikan pusat pendidikan ulama di Kasunyatan.",
    facilities: ["Kompleks Makam Sultan Maulana Yusuf Pekalangan", "Dekat Masjid Kuno Kasunyatan", "Musholla & Area Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-19",
    name: "Syekh Datuk Kahfi (Syekh Idhofi Mahdi)",
    title: "Syekh Datuk Kahfi (Bukit Amparan Jati Cirebon)",
    description: "Ulama besar asal Baghdad–Makkah perintis pesantren pertama di Cirebon (Amparan Jati) dan mahaguru Pangeran Walangsungsang serta Nyai Rara Santang.",
    location: {
      lat: -6.6588,
      lng: 108.5382,
      address: "Bukit Amparan Jati (Seberang Astana Gunung Sembung), Desa Astana, Kec. Gunungjati",
      city: "Cirebon",
      province: "Jawa Barat"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-15 M (Tiba di Muara Jati Cirebon sekitar 1420 M)",
    sanad: "Putra Syekh Datuk Ahmad; Keturunan Syekh Jamaluddin Akbar Al-Husaini; Guru dari Pangeran Cakrabuana (Mbah Kuwu Cirebon) dan Syarifah Mudaim (Ibunda Sunan Gunung Jati)",
    karya: [
      "Pesantren Bukit Amparan Jati (Pusat kaderisasi Islam pertama di Cirebon sebelum era Kesultanan)"
    ],
    references: [
      "Naskah Carita Purwaka Caruban Nagari (1720 M)",
      "Sulendraningrat, P.S. (1985). Sejarah Cirebon. Balai Pustaka.",
      "Wikipedia Bahasa Indonesia: Syekh Datuk Kahfi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/The_Great_Mosque_of_Cirebon.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Sang Cipta Rasa & Poros Dakwah Syekh Datuk Kahfi Cirebon",
    history: "Syekh Datuk Kahfi mendarat di pelabuhan Muara Jati (Pasambangan), Cirebon pada awal abad ke-15 dan disambut oleh Ki Gedeng Jumajan Jati. Beliau mendirikan perguruan Islam di Bukit Amparan Jati yang menarik putra-putri Prabu Siliwangi (Pangeran Walangsungsang dan Nyai Rara Santang) untuk memeluk Islam dan berangkat menunaikan ibadah haji ke Makkah.",
    facilities: ["Kompleks Makam Bukit Amparan Jati", "Musholla & Pendopo Peziarah", "Terhubung dengan Kawasan Parkir Sunan Gunung Jati"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-14",
    name: "Al-Habib Hasyim bin Umar bin Thoha bin Yahya",
    title: "Habib Hasyim bin Yahya (Sapuro Pekalongan)",
    description: "Ulama kharismatik Pekalongan dan kakek dari Maulana Al-Habib Muhammad Luthfi bin Ali bin Hasyim bin Yahya.",
    location: {
      lat: -6.8971,
      lng: 109.6648,
      address: "Kompleks Makam Sapuro, Sapuro Kebulen, Kec. Pekalongan Barat",
      city: "Pekalongan",
      province: "Jawa Tengah"
    },
    category: "Habaib",
    era: "Abad ke-19 – ke-20 M (Wafat 1349 H / 1930 M)",
    sanad: "Putra Habib Umar bin Thoha bin Yahya (Indramayu); Kakek dari Maulana Habib Luthfi bin Yahya (Rais 'Aam JATMAN)",
    karya: [
      "Pembinaan majelis ilmu dan tarekat di pesisir Pekalongan–Batang"
    ],
    references: [
      "Manaqib Al-Habib Hasyim bin Umar bin Yahya Pekalongan — Kanzus Sholawat",
      "Jurnal Penelitian IAIN Pekalongan: Jaringan Habaib dan Tarekat di Pekalongan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Entrance-masjid-smada-tegal.jpg",
    imageSource: "Wikimedia Commons — Khazanah Islam Pantura Jawa Tengah (Kawasan Makam Sapuro Habib Hasyim bin Umar bin Yahya Pekalongan)",
    history: "Habib Hasyim bin Umar bin Yahya dikenal dengan keteguhan memegang sunnah, kedalaman ilmu tasawuf, dan kepeduliannya terhadap persatuan umat di Pekalongan. Makam beliau berada satu kompleks dengan Habib Ahmad bin Abdullah bin Thalib Al-Attas di pemakaman Sapuro Pekalongan.",
    facilities: ["Kompleks Kubah Sapuro Pekalongan", "Masjid Roudhotul Jannah", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-33",
    name: "KH. Muhammad Munawwir bin KH. Abdullah Rosyad",
    title: "KH. Munawwir Krapyak (Dongkelan Yogyakarta)",
    description: "Mahaguru Al-Qur'an Nusantara, pemegang sanad Qira'at Sab'ah, dan pendiri Pondok Pesantren Al-Munawwir Krapyak Yogyakarta.",
    location: {
      lat: -7.8325,
      lng: 110.3542,
      address: "Pasarean Dongkelan, Panggungharjo, Kec. Sewon (Dekat Pesantren Krapyak)",
      city: "Bantul",
      province: "DI Yogyakarta"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (1870 – 6 Juli 1942 M)",
    sanad: "Belajar 21 tahun di Makkah & Madinah kepada Syekh Abdul Karim bin Umar Al-Badri Ad-Dimyathi (Sanad ke-28 Qira'at Sab'ah hingga Rasulullah SAW); Guru dari KH. Arwani Amin Kudus, KH. Umar Abdul Mannan Solo, & KH. Muntaha Wonosobo",
    karya: [
      "Pendirian Pondok Pesantren Al-Munawwir Krapyak Yogyakarta (15 November 1910 M) — Poros utama sanad Tahfidz Al-Qur'an di Indonesia",
      "Riyadhah khatam Al-Qur'an 30 juz setiap tiga hari sekali dan pernah satu kali khatam setiap satu rakaat selama 40 hari"
    ],
    references: [
      "Fathoni, Ahmad (2010). Sejarah dan Sanad Qira'at Al-Qur'an KH. Muhammad Munawwir Krapyak Yogyakarta. IIQ Press.",
      "Wikipedia Bahasa Indonesia: Muhammad Munawwir"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Museum_Islam_Indonesia1.jpg",
    imageSource: "Wikimedia Commons — Khazanah Museum Islam & Sanad Al-Qur'an Nusantara (KH. Muhammad Munawwir Krapyak Yogyakarta)",
    history: "Putra KH. Abdullah Rosyad (ulama pengiring Pangeran Diponegoro), KH. Muhammad Munawwir bermukim di Makkah dan Madinah selama 21 tahun untuk mengkhatamkan hafalan Al-Qur'an beserta tujuh qira'at mutawatir. Hampir seluruh pesantren tahfidz Al-Qur'an di Pulau Jawa menyambungkan sanad bacaan Al-Qur'annya kepada beliau. Beliau dimakamkan di Pasarean Dongkelan bersama KH. Ali Maksum.",
    facilities: ["Kompleks Makam Dongkelan (KH. Munawwir & KH. Ali Maksum)", "Pondok Pesantren Al-Munawwir Krapyak", "Masjid Jami' Krapyak & Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-34",
    name: "Syekh KH. Ihsan Muhammad Dahlan Al-Jampesi",
    title: "Syekh Ihsan Jampes (Kediri)",
    description: "Ulama jenius asal Kediri pengarang kitab tasawuf 'Sirajuth Thalibin' yang dikaji di Universitas Al-Azhar Kairo, Mesir.",
    location: {
      lat: -7.7685,
      lng: 112.0242,
      address: "Pondok Pesantren Al-Ihsan Jampes, Desa Putih, Kec. Gampengrejo",
      city: "Kediri",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (1901 – 16 September 1952 M)",
    sanad: "Putra KH. Muhammad Dahlan (Pendiri Pesantren Jampes, 1886); Otodidak dan mengaji kilatan di berbagai pesantren Jawa",
    karya: [
      "Kitab Sirajuth Thalibin (Syarah atas Minhajul 'Abidin karya Imam Al-Ghazali, 2 Jilid tebal بیش dari 1.000 halaman, dicetak Musthafa Al-Babi Al-Halabi Kairo tahun 1937 M)",
      "Kitab Tashrihul Ibarat (Ilmu Falak / Astronomi), Manahijul Imdad, & Irsyadul Ikhwan (Hukum Kopi dan Rokok)"
    ],
    references: [
      "Nata, Abuddin (2005). Tokoh-tokoh Pembaruan Pendidikan Islam di Indonesia. RajaGrafindo Persada.",
      "Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat. Mizan.",
      "Wikipedia Bahasa Indonesia: Ihsan Jampes"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/COLLECTIE_TROPENMUSEUM_Straatgezicht_met_een_auto_en_de_ingang_van_een_moskee_Pasoeroean_TMnr_10015091.jpg",
    imageSource: "Koleksi Tropenmuseum / Wikimedia Commons — Gerbang Masjid & Pesantren Jawa Timur Era 1930-an (Era Penulisan Kitab Sirajuth Thalibin Syekh Ihsan Jampes)",
    history: "Tanpa pernah belajar formal di Timur Tengah (hanya menunaikan ibadah haji singkat), Syekh Ihsan Jampes menulis kitab bahasa Arab tingkat tinggi 'Sirajuth Thalibin' pada tahun 1932. Ketika kitab itu dibawa ke Mesir, para ulama Universitas Al-Azhar Kairo sangat takjub hingga mengundang beliau menjadi guru besar kehormatan dan menjadikan kitabnya referensi wajib tasawuf internasional.",
    facilities: ["Kompleks Makam Syekh Ihsan Jampes", "Masjid Pondok Pesantren Al-Ihsan Jampes", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-20",
    name: "Syekh Maulana Ishaq",
    title: "Makam Syekh Maulana Ishaq (Kemantren Lamongan)",
    description: "Ayahanda Kanjeng Sunan Giri, paman Sunan Ampel, dan penyebar Islam di Kerajaan Blambangan serta Pasai.",
    location: {
      lat: -6.8742,
      lng: 112.4015,
      address: "Desa Kemantren, Kec. Paciran (Jalur Pantura Gresik–Lamongan)",
      city: "Lamongan",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-15 M",
    sanad: "Putra Syekh Jumadil Kubro; Adik kandung Syekh Ibrahim Asmoroqondi; Ayahanda Sunan Giri (Raden Paku) & Dewi Saroh (Istri Sunan Kalijaga)",
    karya: [
      "Pengislaman keluarga istana Blambangan (Dewi Sekardadu) & pembinaan kader sufi di Pasai dan pesisir Lamongan"
    ],
    references: [
      "Babad Gresik & Babad Blambangan",
      "Sunyoto, Agus (2016). Atlas Wali Songo.",
      "Wikipedia Bahasa Indonesia: Maulana Ishaq"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Gapura_Kabupaten_Lamongan.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Gapura Paduraksa Kabupaten Lamongan (Wilayah Makam Syekh Maulana Ishaq Kemantren Paciran)",
    history: "Syekh Maulana Ishaq adalah ulama sufi dan tabib masyhur yang menyembuhkan wabah penyakit di Kerajaan Blambangan (Banyuwangi) dan menikahi putri raja, Dewi Sekardadu, yang melahirkan Raden Paku (Sunan Giri). Situs makam dan petilasan beliau di pesisir Desa Kemantren, Paciran, Lamongan (dekat makam Sunan Drajat) ramai diziarahi jamaah.",
    facilities: ["Masjid Agung Maulana Ishaq Kemantren", "Cungkup Makam & Pendopo Tepi Pantai", "Area Parkir Bus Pantura Paciran"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-21",
    name: "Sayyid Abdullah Asy'ari bin Sayyid Jamaluddin Kubro",
    title: "Sunan Bejagung Lor (Tuban)",
    description: "Waliyullah pelopor dakwah Islam abad ke-14 di Tuban dan putra dari Syekh Jumadil Kubro.",
    location: {
      lat: -6.9152,
      lng: 112.0645,
      address: "Desa Bejagung, Kec. Semanding",
      city: "Tuban",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-14 – Awal Abad ke-15 M",
    sanad: "Putra Syekh Jumadil Kubro; Saudara Syekh Ibrahim Asmoroqondi & Syekh Maulana Ishaq",
    karya: [
      "Arsitektur Cungkup Kayu Kuno & Sumur Wali Bejagung Tuban"
    ],
    references: [
      "Laporan Inventarisasi Cagar Budaya Kabupaten Tuban — Balai Pelestarian Cagar Budaya (BPCB) Jawa Timur",
      "Jurnal Sejarah dan Budaya Universitas Negeri Malang: Situs Makam Sunan Bejagung Tuban"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Selamat_Datang_Tuban.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Bumi Wali Kabupaten Tuban (Lokasi Cagar Budaya Makam Sunan Bejagung Lor)",
    history: "Sunan Bejagung Lor (Sayyid Abdullah Asy'ari) bermukim di Desa Bejagung, sekitar 2 km di selatan Kota Tuban, pada masa kemaharajaan Majapahit. Kompleks makam beliau terkenal dengan arsitektur cungkup limasan Jawa Kuno dan sumur tua yang airnya jernih tak pernah kering.",
    facilities: ["Cungkup Cagar Budaya Sunan Bejagung", "Masjid Sunan Bejagung", "Sumur Wali", "Area Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-35",
    name: "Syekh KH. Muhammad Syarwani Abdan Al-Banjari",
    title: "Guru Bangil (Datuk Kalampayan Bangil Pasuruan)",
    description: "Ulama mutiara tanah Banjar yang mendirikan Pesantren Datuk Kalampayan di Bangil dan mahaguru dari Abah Guru Sekumpul.",
    location: {
      lat: -7.5968,
      lng: 112.7812,
      address: "Jl. Kauman, Dawur, Kersikan, Kec. Bangil",
      city: "Pasuruan",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (1915 – 11 September 1989 M)",
    sanad: "Keturunan ke-6 Syekh Muhammad Arsyad Al-Banjari; Murid Sayyid Amin Kutbi, Sayyid Alawi Al-Maliki, & Syekh Umar Hamdan di Makkah; Dijuluki 'Dua Mutiara dari Banjar' bersama Syekh Anang Sya'rani Arif oleh ulama Masjidil Haram; Guru utama KH. Zaini Abdul Ghani (Guru Sekumpul)",
    karya: [
      "Kitab Adz-Dzakhiratuts Tsaminah li Ahlil Istiqamah (Simpanan Berharga bagi Ahli Istiqomah)",
      "Pendirian Pondok Pesantren Datuk Kalampayan Bangil (1970 M)"
    ],
    references: [
      "Biografi dan Manaqib KH. Muhammad Syarwani Abdan (Guru Bangil) — Pondok Pesantren Datuk Kalampayan",
      "Wikipedia Bahasa Indonesia: Muhammad Syarwani Abdan"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/6/61/Alun-alun_Bangil_Pasuruan.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Kawasan Alun-Alun & Kauman Bangil, Pasuruan (Kompleks Makam KH. Syarwani Abdan / Guru Bangil)",
    history: "Lahir di Martapura tahun 1915 M, KH. Syarwani Abdan menuntut ilmu di Makkah hingga dipercaya mengajar di Masjidil Haram. Atas saran KH. Abdul Hamid Pasuruan, beliau menetap di Bangil, Pasuruan dan mendirikan Pondok Pesantren Datuk Kalampayan. Setiap hari ratusan peziarah dari Kalimantan dan Jawa memadati kubah makam beliau di Bangil.",
    facilities: ["Kubah Makam Guru Bangil", "Masjid Agung Bangil & Pesantren Datuk Kalampayan", "Area Parkir Bus"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-22",
    name: "Syekh Abdul Qodir Muhammad (The Kwan Pao Lie)",
    title: "Wali Pitu Bali: Keramat Karangrupit (Buleleng)",
    description: "Ulama sufi keturunan Tionghoa dan murid Sunan Gunung Jati yang menyebarkan Islam di pesisir utara Bali (Buleleng).",
    location: {
      lat: -8.1985,
      lng: 114.9265,
      address: "Desa Temukus, Kec. Banjar (Jalur Singaraja–Seririt)",
      city: "Buleleng",
      province: "Bali"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-16 M",
    sanad: "Murid Kanjeng Sunan Gunung Jati Cirebon asal daratan Tiongkok (The Kwan Pao Lie)",
    karya: [
      "Pembinaan komunitas Muslim pesisir utara Buleleng Bali"
    ],
    references: [
      "Zuhri, Saifuddin: Sejarah Wali Pitu di Bali",
      "Mashad, Dhurorudin (2014). Muslim Bali: Mencari Kembali Harmoni yang Hilang.",
      "Wikipedia Bahasa Indonesia: Wali Pitu"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Danau_Buyan.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Lanskap Buleleng Bali Utara (Wilayah Makam Wali Pitu Karangrupit Syekh Abdul Qodir Muhammad)",
    history: "The Kwan Pao Lie adalah seorang bangsawan dan tabib Tionghoa yang memeluk Islam di bawah bimbingan Sunan Gunung Jati di Cirebon dan diberi nama Syekh Abdul Qodir Muhammad. Beliau kemudian berhijrah dan berdakwah di Karangrupit, Desa Temukus, Buleleng (Bali Utara) hingga akhir hayatnya.",
    facilities: ["Kompleks Makam Keramat Karangrupit", "Musholla & Pendopo Peziarah", "Area Parkir Bus Jalur Singaraja–Gilimanuk"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-23",
    name: "Ratu Ayu Anak Agung Rai (Siti Khotijah)",
    title: "Wali Pitu Bali: Keramat Ratu मक्का (Denpasar)",
    description: "Putri bangsawan Kerajaan Mengwi/Pemecutan Bali yang memeluk Islam dan wafat saat berzikir dalam cahaya di Monang-Maning Denpasar.",
    location: {
      lat: -8.6652,
      lng: 115.1985,
      address: "Jl. Gunung Batukaru, Pemecutan Klod (Monang-Maning), Kec. Denpasar Barat",
      city: "Denpasar",
      province: "Bali"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 M",
    sanad: "Putri keluarga Puri Pemecutan/Mengwi yang mendapat hidayah Islam dan bergelar Raden Ayu Siti Khotijah",
    karya: [
      "Simbol kerukunan keluarga besar Puri Pemecutan Denpasar dan umat Islam Bali"
    ],
    references: [
      "Jurnal Studi Budaya Universitas Udayana: Situs Makam Keramat Ratu Ayu Siti Khotijah di Pemecutan Denpasar",
      "Wikipedia Bahasa Indonesia: Wali Pitu"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/001_Bajra_Sandhi_Monument_from_Behind%2C_Bajra_Sandhi_Monument%2C_Denpasar_City%2C_Bali%2C_photograph_by_Anandajoti_Bhikkhu.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kota Denpasar Bali (Wilayah Situs Makam Keramat Ratu Ayu Siti Khotijah Pemecutan)",
    history: "Gusti Ayu Made Rai memeluk agama Islam setelah sembuh dari sakit keras melalui perantaraan doa seorang pangeran Muslim asal Cakranegara/Bangkalan dan berganti nama menjadi Siti Khotijah. Saat beliau sedang khusyuk melaksanakan shalat malam dengan mengenakan mukena putih, prajurit kerajaan mengira ada kobaran api di kamarnya dan tanpa sengaja menombaknya. Atas penyesalan mendalam, Raja memerintahkan agar makam beliau dimuliakan selamanya.",
    facilities: ["Kompleks Makam Keramat Pemecutan Denpasar", "Musholla Peziarah", "Area Parkir Bus"],
    openingHours: "07:00 - 22:00 WITA"
  },
  {
    id: "auliya-24",
    name: "Syekh Maulana Yusuf Al-Baghdadi & Syekh Abdul Qodir Jaelani (Wali Kembar)",
    title: "Wali Pitu Bali: Makam Wali Kembar Karanggasem",
    description: "Dua waliyullah penyebar Islam di ujung timur Pulau Bali yang bersemayam di Bukit Kembar Desa Bungaya Kangin, Karangasem.",
    location: {
      lat: -8.4425,
      lng: 115.5912,
      address: "Desa Bungaya Kangin, Kec. Bebandem",
      city: "Karangasem",
      province: "Bali"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-17 M",
    sanad: "Jaringan dakwah sufi di Kerajaan Karangasem Bali Timur",
    karya: [
      "Komunitas Muslim Kecicang & Bungaya Karangasem"
    ],
    references: [
      "Sejarah Wali Pitu Bali — Yayasan Al-Khidmah",
      "Wikipedia Bahasa Indonesia: Wali Pitu"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Bali%2C_Pura_Besakih_6.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Lanskap Perbukitan Kabupaten Karangasem Bali Timur (Wilayah Makam Wali Kembar Bungaya)",
    history: "Melengkapi rangkaian tujuh makam keramat (Wali Pitu) di Pulau Bali, makam Wali Kembar di Desa Bungaya Kangin, Kabupaten Karangasem menjadi titik ziarah di Bali bagian timur dengan suasana pedesaan dan perbukitan yang asri.",
    facilities: ["Cungkup Makam Wali Kembar", "Musholla Peziarah", "Area Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-15",
    name: "Al-Habib Abu Bakar bin Husein Balfaqih",
    title: "Teungku Di Anjong (Peulanggahan Banda Aceh)",
    description: "Waliyullah dan ulama besar asal Hadramaut pada masa Kesultanan Aceh abad ke-18 yang mendirikan Masjid Teungku Di Anjong.",
    location: {
      lat: 5.5685,
      lng: 95.3142,
      address: "Gampong Peulanggahan, Kec. Kuta Raja",
      city: "Banda Aceh",
      province: "Aceh"
    },
    category: "Habaib",
    era: "Abad ke-18 M (Lahir 1117 H / 1705 M – Wafat 14 Ramadhan 1196 H / 1782 M)",
    sanad: "Dzurriyah Rasulullah SAW marga Balfaqih dari Tarim Hadramaut yang menjadi penasihat utama Sultan Alauddin Mahmud Syah (Kesultanan Aceh)",
    karya: [
      "Pendirian Masjid Teungku Di Anjong (1769 M) & Dayah Peulanggahan Banda Aceh"
    ],
    references: [
      "Lombard, Denys (1986). Kerajaan Aceh: Zaman Sultan Iskandar Muda. Balai Pustaka.",
      "Jurnal Adabiya UIN Ar-Raniry Banda Aceh: Sejarah dan Peran Teungku Di Anjong di Kesultanan Aceh"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid & Makam Bersejarah Teungku Di Anjong (Habib Abu Bakar Balfaqih, Peulanggahan Banda Aceh, 1769 M)",
    history: "Habib Abu Bakar bin Husein Balfaqih sangat dicintai masyarakat Aceh hingga diberi gelar kehormatan 'Teungku Di Anjong' (Ulama yang disanjung/dimuliakan di rumah panggung anjungan). Beliau wafat pada 14 Ramadhan 1196 H (1782 M) berdampingan dengan makam istrinya Syarifah Fathimah (Cut Po Fatimah).",
    facilities: ["Masjid Bersejarah Teungku Di Anjong", "Kompleks Makam Cagar Budaya Peulanggahan", "Area Parkir"],
    openingHours: "07:00 - 18:00 WIB"
  },
  {
    id: "auliya-25",
    name: "Sultan Malikussaleh (Meurah Silu)",
    title: "Makam Sultan Malikussaleh (Samudera Pasai Aceh Utara)",
    description: "Pendiri dan Sultan pertama Kesultanan Islam Samudera Pasai (1267 M), kerajaan Islam pertama di kepulauan Nusantara.",
    location: {
      lat: 5.1418,
      lng: 97.2185,
      address: "Desa Beuringen, Kec. Samudera",
      city: "Aceh Utara",
      province: "Aceh"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-13 M (Wafat Ramadhan 696 H / 1297 M)",
    sanad: "Diislamkan oleh Syekh Ismail As-Shiddiq (Utusan Syarif Makkah); Leluhur Sultan Malikudz Dzahir dan jaringan ulama Pasai–Jawa",
    karya: [
      "Pendirian Kesultanan Samudera Pasai (1267 M) — Pusat studi Islam dan perdagangan maritim pertama di Asia Tenggara",
      "Mata Uang Emas Dirham Samudera Pasai"
    ],
    references: [
      "Inskripsi Batu Nisan Sultan Malikussaleh Desa Beuringen (696 H / 1297 M)",
      "Hikayat Raja-Raja Pasai & Catatan Perjalanan Marco Polo (1292 M) serta Ibnu Battutah (1345 M)",
      "Alfian, Teuku Ibrahim (1973). Kronika Pasai: Sebuah Tinjauan Sejarah. Gadjah Mada University Press.",
      "Wikipedia Bahasa Indonesia: Malikussaleh"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Makam_Sultan_Malik_As-Shalih_%28Malikussaleh%29.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Nisan & Kompleks Makam Sultan Malikussaleh (1297 M), Samudera Pasai, Aceh Utara",
    history: "Meurah Silu memeluk Islam sekitar tahun 1267 M dengan gelar Sultan Malikussaleh. Di bawah kepemimpinannya, Samudera Pasai menjadi mercusuar keilmuan Mazhab Syafi'i di Asia Tenggara yang dikunjungi pengembara dunia Marco Polo (1292) dan Ibnu Battutah (1345). Dari Samudera Pasai inilah banyak ulama berangkat mengislamkan Pulau Jawa dan Semenanjung Malaya.",
    facilities: ["Kompleks Cagar Budaya Nasional Makam Sultan Malikussaleh", "Museum Islam Samudera Pasai", "Masjid & Area Parkir Luas"],
    openingHours: "08:00 - 18:00 WIB"
  },
  {
    id: "ulama-36",
    name: "Syekh Mahmud (Mursyid Luhak Nan Tuo)",
    title: "Makam Keramat Papan Tinggi (Barus Tapanuli Tengah)",
    description: "Situs makam Islam kuno berinskripsi abad ke-7/ke-14 M di puncak bukit Barus (Titik Nol Peradaban Islam Nusantara) dengan 715 anak tangga.",
    location: {
      lat: 2.0425,
      lng: 98.4112,
      address: "Desa Pananggahan, Kec. Barus",
      city: "Tapanuli Tengah",
      province: "Sumatera Utara"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-14 M (Era Kapur Barus / Fansur Kuno)",
    sanad: "Ulama penyebar Islam perdana dari Yaman/Hadramaut dan Persia di Pelabuhan Kapur Barus (Pantai Barat Sumatera)",
    karya: [
      "Komunitas Muslim kuno Barus (Fansur) sebagai gerbang masuknya Islam ke Nusantara"
    ],
    references: [
      "Guillot, Claude & Kalus, Ludvik (2008). Inskripsi Islam Tertua di Indonesia (Barus). Kepustakaan Populer Gramedia & EFEO.",
      "Perret, Daniel & Surachman, Heddy (2015). Barus Negeri Kamper: Sejarah dari Abad ke-12 hingga Pertengahan Abad ke-17.",
      "Wikipedia Bahasa Indonesia: Makam Papan Tinggi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Makam_Syeikh_Mahmud_Barus%2C_Papan_Tinggi_..JPG",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Batu Nisan Kuno Makam Syekh Mahmud di Puncak Bukit Papan Tinggi, Barus, Tapanuli Tengah",
    history: "Kota kuno Barus (Fansur) di pesisir barat Sumatera Utara telah dikenal sejak zaman Mesir Kuno dan Kekhalifahan Islam awal sebagai penghasil kapur barus dan kemenyan terbaik di dunia. Di puncak Bukit Papan Tinggi (setinggi 200 meter dengan lebih dari 700 anak tangga) terdapat makam Syekh Mahmud dengan batu nisan raksasa berukir kaligrafi Arab-Persia yang ditetapkan sebagai Titik Nol Peradaban Islam Nusantara.",
    facilities: ["Kompleks Makam Papan Tinggi & Makam Mahligai Barus", "715 Anak Tangga Bukit Barus", "Tugu Titik Nol Peradaban Islam Nusantara", "Area Parkir"],
    openingHours: "07:00 - 18:00 WIB"
  },
  {
    id: "auliya-26",
    name: "Sultan Mahmud Badaruddin I Jayo Wikramo & Ulama Kesultanan Palembang",
    title: "Kompleks Makam Kawah Tengkurep (Palembang)",
    description: "Kompleks makam agung para Sultan dan ulama Kesultanan Palembang Darussalam dengan kubah berbentuk kawah terbalik.",
    location: {
      lat: -2.9762,
      lng: 104.7845,
      address: "Jl. Belabak, 3 Ilir, Kec. Ilir Timur II",
      city: "Palembang",
      province: "Sumatera Selatan"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 M (Dibangun tahun 1728 M)",
    sanad: "Sultan Mahmud Badaruddin I (Pendiri Masjid Agung Palembang 1738 M) bersama para habaib dan ulama istana Palembang",
    karya: [
      "Pembangunan Masjid Agung Sultan Mahmud Badaruddin I Palembang (1738 M)",
      "Arsitektur Kubah Kawah Tengkurep dari campuran kapur, putih telur, dan batu bata"
    ],
    references: [
      "Sevenhoven, J.I. van (1971). Lukisan tentang Ibukota Palembang. Bhratara.",
      "Jurnal Siddhayatra Balai Arkeologi Sumatera Selatan: Kompleks Makam Kawah Tengkurep Palembang",
      "Wikipedia Bahasa Indonesia: Kawah Tengkurep"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Sultan Mahmud Badaruddin I Palembang (Pendiri Kompleks Kawah Tengkurep)",
    history: "Dibangun pada tahun 1728 M atas titah Sultan Mahmud Badaruddin I Jayo Wikramo, kompleks makam Kawah Tengkurep menjadi peristirahatan para sultan, ulama besar, dan habaib yang menjadikan Kesultanan Palembang Darussalam sebagai pusat penulisan naskah keislaman Melayu (era Syekh Abdus Shamad Al-Falimbani) pada abad ke-18.",
    facilities: ["Cungkup Cagar Budaya Kawah Tengkurep", "Musholla & Pendopo Ziarah Haul", "Area Parkir Luas"],
    openingHours: "08:00 - 17:00 WIB"
  },
  {
    id: "ulama-37",
    name: "Syekh Syihabuddin bin Zainal Abidin Al-Banjari & Syekh Kasyful Anwar",
    title: "Makam Ulama Kampung Melayu & Dalam Pagar (Martapura)",
    description: "Jejak mahaguru Pondok Pesantren Darussalam Martapura dan pewaris sanad keilmuan Datu Kalampayan di Kalimantan Selatan.",
    location: {
      lat: -3.4012,
      lng: 114.8542,
      address: "Kampung Melayu Ilir, Kec. Martapura Timur",
      city: "Banjar",
      province: "Kalimantan Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (KH. Kasyful Anwar: 1887 – 1940 M)",
    sanad: "Masyayikh Pondok Pesantren Darussalam Martapura (berdiri 1914 M); Guru dari para ulama Kalimantan Selatan, Tengah, dan Timur",
    karya: [
      "Penerapan sistem klasikal Madrasah Darussalam Martapura (1922 M)",
      "Kitab Risalah at-Tauhid, Risalah Fiqih, & Tarikh السيرة النبوية (Durusul Madaris)"
    ],
    references: [
      "Ideham, M. Suriansyah dkk. (2003). Sejarah Banjar. Badan Penelitian dan Pengembangan Daerah Provinsi Kalimantan Selatan.",
      "Wikipedia Bahasa Indonesia: Kasyful Anwar"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Pondok_Pesantren_Darussalam_Martapura_002.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Pondok Pesantren Darussalam Martapura (Warisan Keilmuan KH. Kasyful Anwar Kampung Melayu)",
    history: "KH. Kasyful Anwar adalah ulama pembaharu kurikulum Pondok Pesantren Darussalam Martapura (pesantren terbesar dan tertua di Kalimantan Selatan yang berdiri sejak 1914) dan mahaguru dari Syekh Seman Mulia serta Syekh Sya'rani Arif.",
    facilities: ["Kubah Makam Kampung Melayu Martapura", "Dekat Pondok Pesantren Darussalam Martapura", "Area Parkir"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "ulama-38",
    name: "Syekh Abdul Hamid Abulung (Datu Abulung)",
    title: "Makam Datu Abulung (Sungai Batang Martapura)",
    description: "Ulama sufi falsafi abad ke-18 di Kalimantan Selatan yang syahid mempertahankan ajaran tauhid hakikat.",
    location: {
      lat: -3.3845,
      lng: 114.8285,
      address: "Desa Sungai Batang, Kec. Martapura Barat",
      city: "Banjar",
      province: "Kalimantan Selatan"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 M (Masa Sultan Tahmidullah II Banjar)",
    sanad: "Ulama asal Yaman/Banjar yang menuntut ilmu tasawuf di Haramain sezaman dengan Syekh Muhammad Arsyad Al-Banjari",
    karya: [
      "Ajaran Tasawuf Martabat Tujuh di Tanah Banjar"
    ],
    references: [
      "Zamzam, Zafry (1979). Syekh Muhammad Arsyad Al-Banjari: Ulama Besar Juru Dakwah. Karya.",
      "Jurnal Kandil BPNB Kalimantan: Sejarah Makam dan Masjid Datu Abulung di Sungai Batang",
      "Wikipedia Bahasa Indonesia: Abdul Hamid Abulung"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/KH_Abdul_Qadir_Hasan_Mosque.jpg",
    imageSource: "Wikimedia Commons — Arsitektur Masjid & Kubah Ulama Kabupaten Banjar, Martapura (Jalur Ziarah Makam Datu Abulung Sungai Batang)",
    history: "Syekh Abdul Hamid Abulung (Datu Abulung) adalah tokoh tasawuf di Tanah Banjar pada abad ke-18. Sebagai penebusan dan penghormatan atas kesyahidan beliau, Sultan Banjar membangun Masjid Jami' Syekh Abdul Hamid Abulung dan memelihara makam beliau di Desa Sungai Batang yang kini selalu ramai diziarahi satu jalur dengan makam Datu Kalampayan.",
    facilities: ["Masjid Jami' Syekh Abdul Hamid Abulung", "Kubah Makam Datu Abulung", "Area Parkir & Dermaga Sungai"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "habib-16",
    name: "Al-Habib Husein bin Ahmad Al-Qadri",
    title: "Habib Husein Al-Qadri (Kramat Sebukit Mempawah)",
    description: "Ulama besar asal Hadramaut, Mufti Kerajaan Matan dan Mempawah, serta ayahanda Sultan Syarif Abdurrahman Alkadrie (Pendiri Kota Pontianak).",
    location: {
      lat: 0.3712,
      lng: 108.9625,
      address: "Bukit Sebukit Rama, Desa Pasir, Kec. Mempawah Hilir",
      city: "Mempawah",
      province: "Kalimantan Barat"
    },
    category: "Habaib",
    era: "Abad ke-18 M (1708 – 3 Dzulhijjah 1184 H / 1771 M)",
    sanad: "Lahir di Tarim Hadramaut; Mengembara dakwah ke Aceh, Betawi, Semarang, Matan (Ketapang), hingga Mempawah bersama sahabatnya Syekh Salim bin Hambal",
    karya: [
      "Pembinaan pusat keilmuan Islam di Kerajaan Mempawah (Opu Daeng Menambon)",
      "Ayahanda Sultan Syarif Abdurrahman Alkadrie (Pendiri Kesultanan Kadriah Pontianak, 1771 M)"
    ],
    references: [
      "Al-Qadri, Syarif Ibrahim (1998). Sejarah Kesultanan Kadriah Pontianak dan Manaqib Habib Husein Al-Qadri.",
      "Jurnal Khatulistiwa IAIN Pontianak: Peran Habib Husein Al-Qadri dalam Islamisasi Kalimantan Barat",
      "Wikipedia Bahasa Indonesia: Husain Alkadrie"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Masjid_Jami_Pontianak_%282026%29_01.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Jami' Sultan Syarif Abdurrahman (Putra Habib Husein Al-Qadri Mempawah)",
    history: "Habib Husein bin Ahmad Al-Qadri tiba di Kalimantan Barat pada tahun 1735 M dan diangkat menjadi Mufti Agung Kerajaan Matan lalu diundang oleh Raja Mempawah (Opu Daeng Menambon) untuk memimpin pengajaran agama di Mempawah. Putra beliau, Syarif Abdurrahman Alkadrie, kelak membuka hutan di pertemuan Sungai Kapuas dan Sungai Landak dan mendirikan Kesultanan Pontianak pada tahun 1771 M.",
    facilities: ["Kubah Makam Sebukit Rama Mempawah", "Masjid Keramat Habib Husein", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-27",
    name: "Khatib Sulaiman (Datuk Patimang / Datuk Sulaiman)",
    title: "Makam Datuk Patimang (Malangke Luwu Sulawesi Selatan)",
    description: "Ulama asal Minangkabau dan santri Giri Kedaton yang mengislamkan Kedatuan Luwu (kerajaan tertua di Sulawesi Selatan) pada tahun 1603/1605 M.",
    location: {
      lat: -2.7945,
      lng: 120.3812,
      address: "Desa Patimang, Kec. Malangke",
      city: "Luwu Utara",
      province: "Sulawesi Selatan"
    },
    category: "Auliya Nusantara",
    era: "Awal Abad ke-17 M (Tiba di Luwu tahun 1603 M)",
    sanad: "Satu dari tiga serangkai 'Dato' Tallua' (Datuk Patimang, Datuk Ri Bandang, & Datuk Ri Tiro) lulusan Pesantren Sunan Giri Gresik",
    karya: [
      "Pengislaman Payung Luwu La Patiware Daeng Parabung dengan gelar Sultan Muhammad Wali Muzahiruddin (15 Ramadhan 1013 H / Februari 1605 M)",
      "Pendekatan dakwah Tauhid yang diselaraskan dengan konsep 'Dewata SeuwaE' (Tuhan Yang Maha Esa) masyarakat Bugis Luwu"
    ],
    references: [
      "Mattulada (1998). Sejarah, Masyarakat, dan Kebudayaan Sulawesi Selatan. Hasanuddin University Press.",
      "Pelras, Christian (1996). The Bugis. Blackwell Publishers.",
      "Wikipedia Bahasa Indonesia: Datuk Patimang"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/Masjid_Tua_Palopo.JPG",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Tua Palopo (1604 M), Peninggalan Dakwah Datuk Patimang (Khatib Sulaiman) di Kedatuan Luwu",
    history: "Menyadari bahwa Kedatuan Luwu merupakan kerajaan yang paling dituakan oleh seluruh kerajaan Bugis-Makassar di Sulawesi Selatan, Datuk Sulaiman (Datuk Patimang) memulai dakwahnya di pusat istana Pattimang, Malangke. Dengan kebijaksanaan teologis, beliau menjelaskan kesesuaian keesaan Tuhan dalam Islam (Tauhid) dengan keyakinan monoteistik leluhur Luwu hingga Raja Luwu beserta seluruh rakyatnya memeluk Islam.",
    facilities: ["Kompleks Cagar Budaya Makam Datuk Patimang", "Masjid Tua Patimang", "Area Parkir"],
    openingHours: "07:00 - 18:00 WITA"
  },
  {
    id: "auliya-28",
    name: "Abdul Jawad Khatib Bungsu (Datuk Ri Tiro)",
    title: "Makam Datuk Ri Tiro (Bonto Bahari Bulukumba)",
    description: "Anggota tiga serangkai 'Dato' Tallua' yang menyebarkan Islam di Bulukumba, Bantaeng, dan Tiro dengan pendekatan tasawuf.",
    location: {
      lat: -5.4812,
      lng: 120.4125,
      address: "Kelurahan Eka Tiro, Kec. Bonto Tiro",
      city: "Bulukumba",
      province: "Sulawesi Selatan"
    },
    category: "Auliya Nusantara",
    era: "Awal Abad ke-17 M",
    sanad: "Santri Pesantren Giri Kedaton (Gresik) & Aceh asal Koto Tangah Minangkabau; Rekan seperjuangan Datuk Ri Bandang dan Datuk Patimang",
    karya: [
      "Pengislaman Raja Tiro La Unnyi dengan pendekatan tasawuf dan makrifat",
      "Situs Sumur Panjang Hila-Hila Bonto Tiro"
    ],
    references: [
      "Sewang, Ahmad M. (2005). Islamisasi Kerajaan Gowa (Abad XVI sampai Abad XVII). Yayasan Obor Indonesia.",
      "Wikipedia Bahasa Indonesia: Datuk ri Tiro"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Raiyani_Muharramah_Annyorong_lopi_DSC_8826.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Pesisir Bahari Kabupaten Bulukumba (Wilayah Dakwah Datuk Ri Tiro Bonto Tiro)",
    history: "Abdul Jawad Khatib Bungsu memilih wilayah selatan Sulawesi (Tiro, Bulukumba, dan Selayar) yang masyarakatnya saat itu gemar mendalami ilmu kebatinan. Dengan kedalaman ilmu tasawuf dan karomahnya, beliau membimbing Raja Tiro dan masyarakat pesisir Tanjung Bira memeluk Islam secara kaffah.",
    facilities: ["Kompleks Makam Datuk Ri Tiro", "Pemandian Alam Sumur Panjang Hila-Hila", "Musholla & Area Parkir Wisata"],
    openingHours: "07:00 - 18:00 WITA"
  },
  {
    id: "ulama-39",
    name: "Anregurutta KH. Muhammad As'ad Al-Bugisi",
    title: "AGH. Muhammad As'ad (Sengkang Wajo Sulawesi Selatan)",
    description: "Mahaguru para ulama Sulawesi Selatan (Anregurutta) dan pendiri Madrasah As'adiyah Sengkang Wajo.",
    location: {
      lat: -4.1285,
      lng: 120.0312,
      address: "Kompleks Masjid Jami' Sengkang, Jl. KH. Muh. As'ad, Kec. Tempe",
      city: "Wajo",
      province: "Sulawesi Selatan"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-20 M (1907 – 29 Desember 1952 M)",
    sanad: "Lahir di Makkah dari orang tua bangsawan Bugis Wajo; Pengajar di Masjidil Haram Makkah; Mahaguru dari AGH. Abdurrahman Ambo Dalle (Pendiri DDI), AGH. Daud Ismail, & AGH. Muhammad Yunus Martan",
    karya: [
      "Pendirian Madrasah Arabiyah Islamiyah (MAI) / Pondok Pesantren As'adiyah Sengkang (Mei 1930 M) — Pesantren induk di Sulawesi Selatan",
      "Kitab Al-Kawkab al-Munir, Sullamul Aqidah, & Nibrasul Abrar"
    ],
    references: [
      "Wekke, Ismail Suardi (2013). Tradisi Pendidikan Islam di Sulawesi Selatan: Studi tentang Anregurutta Haji Muhammad As'ad dan Pesantren As'adiyah. Jurnal Miqot.",
      "Wikipedia Bahasa Indonesia: Muhammad As'ad"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Saoraja_La_Tenri_Bali.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Pusaka Sejarah Sengkang, Kabupaten Wajo (Basis Pesantren As'adiyah AGH. Muhammad As'ad)",
    history: "Anregurutta KH. Muhammad As'ad (Gurutta Puang Haji Sade') lahir dan besar di Makkah hingga menjadi pengajar di Masjidil Haram. Pada tahun 1928 beliau pulang ke tanah leluhurnya di Sengkang, Kabupaten Wajo, dan mendirikan Madrasah As'adiyah pada 1930 yang melahirkan hampir seluruh ulama besar Bugis-Makassar abad ke-20.",
    facilities: ["Kompleks Makam AGH. Muhammad As'ad Sengkang", "Masjid Jami' Sengkang & Kampus Pesantren As'adiyah", "Area Parkir Luas"],
    openingHours: "Buka 24 Jam"
  },
  {
    id: "auliya-29",
    name: "Sultan Zainal Abidin (Raja Ternate ke-18) & Sultan Babullah",
    title: "Makam Sultan Babullah & Kesultanan Ternate (Maluku Utara)",
    description: "Sultan Ternate murid langsung Kanjeng Sunan Giri di Gresik yang meresmikan Kesultanan Islam Ternate di Kepulauan Rempah Maluku.",
    location: {
      lat: 0.8065,
      lng: 127.3812,
      address: "Bukit Foramadiahi & Kompleks Masjid Sultan Ternate, Kec. Pulau Ternate",
      city: "Ternate",
      province: "Maluku Utara"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-15 – ke-16 M (Sultan Zainal Abidin: 1486–1500 M; Sultan Babullah: 1570–1583 M)",
    sanad: "Sultan Zainal Abidin berguru langsung kepada Sunan Giri di Pesantren Giri Kedaton Gresik (1494 M) hingga dijuluki 'Sultan Bualawa' (Sultan Cengkeh)",
    karya: [
      "Transformasi Kerajaan Gapi menjadi Kesultanan Islam Ternate berdasarkan syariat Islam (1495 M)",
      "Pendirian lembaga Bobato Akhirat (Dewan Ulama Kesultanan) dan pengusiran kolonial Portugis oleh Sultan Babullah (1575 M)"
    ],
    references: [
      "Andaya, Leonard Y. (1993). The World of Maluku: Eastern Indonesia in the Early Modern Period. University of Hawaii Press.",
      "Putuhena, M. Shaleh (1997). Sejarah Masuk dan Berkembangnya Islam di Maluku.",
      "Wikipedia Bahasa Indonesia: Zainal Abidin dari Ternate & Babullah dari Ternate"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Masjid_Sultan_Ternate.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Sultan Ternate (Sigi Lamo), Warisan Kesultanan Islam Ternate Sultan Zainal Abidin & Sultan Babullah",
    history: "Pada tahun 1494 M, Raja Ternate Zainal Abidin berlayar ke Jawa Timur untuk berguru langsung kepada Sunan Giri di Pesantren Giri Kedaton, Gresik. Sekembalinya ke Maluku dengan membawa sejumlah ulama Jawa dan Melayu seperti Tuhubahahul, beliau menetapkan Islam sebagai agama resmi Kesultanan Ternate dan menyebarkan dakwah hingga Ambon, Banda, dan Raja Ampat Papua.",
    facilities: ["Kompleks Makam Sultan Babullah Foramadiahi", "Masjid Sultan Ternate (Sigi Lamo)", "Kedaton Sultan Ternate", "Area Parkir"],
    openingHours: "08:00 - 18:00 WIT"
  },
  {
    id: "ulama-40",
    name: "Syekh KH. Ahmad Rifa'i Kalisalak",
    title: "KH. Ahmad Rifa'i (Pahlawan Nasional Limpung Batang)",
    description: "Pahlawan Nasional, ulama pejuang анти-kolonial abad ke-19, dan pengarang ratusan kitab berbahasa Jawa Pegon ('Tarajumah').",
    location: {
      lat: -7.0185,
      lng: 109.9212,
      address: "Kompleks Pondok Pesantren Rifa'iyah Kalisalak, Kec. Limpung",
      city: "Batang",
      province: "Jawa Tengah"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-18 – ke-19 M (13 November 1786 – 1870 M)",
    sanad: "Lahir di Tempuran Kendal; Menuntut ilmu 8 tahun di Makkah & Madinah kepada Syekh Abdurrahman, Syekh Isa Al-Barawi, & Syekh Faqih Muhammad bin Abdul Aziz Al-Jaisyi",
    karya: [
      "Kitab Abyanul Hawaij, Ri'ayatul Himmah, Syarihatul Iman, & Tabyinul Ishlah (Lebih dari 60 kitab nadzam Jawa Pegon)",
      "Pendirian Pesantren Kalisalak Batang & gerakan perlawanan kultural terhadap kolonialisme Belanda"
    ],
    references: [
      "Djamil, Abdul (2001). Perlawanan Kiai Desa: Pemikiran dan Gerakan Islam KH. Ahmad Rifa'i Kalisalak. LKiS.",
      "Steenbrink, Karel A. (1984). Beberapa Aspek tentang Islam di Indonesia Abad ke-19. Bulan Bintang.",
      "Keputusan Presiden RI No. 089/TK/2004 tentang Pahlawan Nasional KH. Ahmad Rifa'i",
      "Wikipedia Bahasa Indonesia: Ahmad Rifa'i"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Makam-rifai-1_DjokoSanudin.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kompleks Makam Pahlawan Nasional KH. Ahmad Rifa'i (Foto: Djoko Sanudin)",
    history: "KH. Ahmad Rifa'i mendirikan Pesantren Kalisalak di Limpung, Batang sepulang dari Makkah pada tahun 1838 M. Melalui puluhan kitab nadzam Jawa Pegon yang mudah dihafal rakyat desa, beliau membangkitkan kesadaran beragama dan menolak bekerja sama dengan pemerintah kolonial Belanda hingga diasingkan ke Ambon dan kemudian ke Kampung Jawa Tondano, Minahasa.",
    facilities: ["Situs Pesantren & Masjid Kalisalak Limpung Batang", "Monumen Pahlawan Nasional KH. Ahmad Rifa'i", "Area Parkir"],
    openingHours: "07:00 - 20:00 WIB"
  },
  {
    id: "ulama-41",
    name: "Syekh KH. Mahfudz At-Tarmasi & KH. Dimyathi At-Tarmasi",
    title: "Pesantren Tremas & Makam Masyayikh Tremas (Pacitan)",
    description: "Poros sanad hadis dan fikih Nusantara tempat lahirnya Syekh Mahfudz At-Tarmasi (Ulama Besar Masjidil Haram) dan KH. Dimyathi Tremas.",
    location: {
      lat: -8.1125,
      lng: 111.1642,
      address: "Pondok Tremas, Desa Tremas, Kec. Arjosari",
      city: "Pacitan",
      province: "Jawa Timur"
    },
    category: "Ulama Nusantara",
    era: "Abad ke-19 – ke-20 M (Pondok Tremas berdiri 1830 M; Syekh Mahfudz: 1868–1920 M; KH. Dimyathi: 1879–1934 M)",
    sanad: "Putra KH. Abdullah bin KH. Abdul Mannan Dipomenggolo; Syekh Mahfudz At-Tarmasi adalah guru utama hadis bagi KH. Hasyim Asy'ari, KH. Wahab Chasbullah, KH. Bisri Syansuri, & ulama dunia",
    karya: [
      "Kitab Mauhibah Dzil Fadhl 'ala Syarh al-Muqaddimah al-Hadramiyyah (4 Jilid Fikih Syafi'i standar dunia)",
      "Kitab Kifayatul Mustafid lima 'Ala minal Asanid (Kumpulan Sanad Keilmuan Syekh Mahfudz At-Tarmasi) & Manhaj Dzawi an-Nadzar (Ulumul Qur'an)"
    ],
    references: [
      "Mas'ud, Abdurrahman (2006). Dari Haramain ke Nusantara: Jejak Intelektual Arsitek Pesantren. Kencana.",
      "Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat.",
      "Wikipedia Bahasa Indonesia: Mahfudz at-Tarmasi"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Klayar.jpg",
    imageSource: "Wikipedia Bahasa Indonesia / Wikimedia Commons — Kabupaten Pacitan, Jawa Timur (Wilayah Pondok Tremas Syekh Mahfudz & KH. Dimyathi At-Tarmasi)",
    history: "Didirikan oleh KH. Abdul Mannan Dipomenggolo (santri Pesantren Tegalsari Ponorogo) pada tahun 1830, Pondok Tremas di Pacitan melahirkan ulama kaliber internasional Syekh Mahfudz At-Tarmasi (wafat di Makkah 1920 M) dan adiknya KH. Dimyathi At-Tarmasi yang membesarkan Pondok Tremas hingga menjadi kiblat keilmuan pesantren Jawa pada awal abad ke-20.",
    facilities: ["Kompleks Makam Gunung Lembu Masyayikh Tremas", "Masjid Jami' Pondok Tremas Pacitan", "Perpustakaan Turats Syekh Mahfudz At-Tarmasi", "Area Parkir Bus"],
    openingHours: "07:00 - 21:00 WIB"
  },
  {
    id: "auliya-30",
    name: "Kyai Ageng Hasan Besari",
    title: "Makam Kyai Ageng Hasan Besari (Tegalsari Ponorogo)",
    description: "Ulama besar abad ke-18 pengasuh Pesantren Gebang Tinatar Tegalsari yang mendidik para pujangga keraton (Ranggawarsita), raja, dan pahlawan bangsa.",
    location: {
      lat: -7.9345,
      lng: 111.5125,
      address: "Kompleks Masjid Jami' Tegalsari, Desa Tegalsari, Kec. Jetis",
      city: "Ponorogo",
      province: "Jawa Timur"
    },
    category: "Auliya Nusantara",
    era: "Abad ke-18 – ke-19 M (Wafat 1862 M)",
    sanad: "Cucu Kyai Ageng Muhammad Besari (Pendiri Pesantren Tegalsari sekitar 1700 M); Keturunan Sunan Ampel dan Prabu Brawijaya V; Guru dari Susuhunan Pakubuwono II, Pujangga R.Ng. Ranggawarsita, & H.O.S. Tjokroaminoto (Cucu beliau)",
    karya: [
      "Masjid Jami' Tegalsari Ponorogo (Cagar Budaya Nasional Abad ke-18 dengan 36 tiang kayu jati tanpa paku)",
      "Pesantren Gebang Tinatar Tegalsari — Induk jaringan pesantren di seluruh Pulau Jawa"
    ],
    references: [
      "Guillot, Claude (1985). Le rôle historique des perdikan ou villages francs: le cas de Tegalsari. Archipel.",
      "Babad Perdikan Tegalsari",
      "Wikipedia Bahasa Indonesia: Hasan Besari"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/id/a/a0/Masjid_Tegalsari_Ponorogo2.jpg",
    imageSource: "Wikipedia Bahasa Indonesia — Masjid Jami' Kuno & Kompleks Makam Kyai Ageng Hasan Besari, Desa Perdikan Tegalsari, Ponorogo",
    history: "Pesantren Gebang Tinatar di Desa Perdikan Tegalsari, Ponorogo adalah salah satu pesantren paling bersejarah di Nusantara. Ketika Keraton Kartasura dilanda Geger Pecinan pada tahun 1742, Raja Pakubuwono II mengungsi dan memohon doa kepada Kyai Ageng Besari di Tegalsari hingga berhasil merebut kembali tahtanya. Dari rahim pesantren ini lahir pujangga besar Ranggawarsita, pendiri Pondok Tremas, pendiri Pondok Gontor, dan Pahlawan Nasional H.O.S. Tjokroaminoto.",
    facilities: ["Masjid Jami' Kuno Tegalsari", "Cungkup Makam Kyai Ageng Muhammad Besari & Kyai Ageng Hasan Besari", "Ndalem Gede Perdikan Tegalsari", "Area Parkir Bus Luas"],
    openingHours: "Buka 24 Jam"
  }
];

