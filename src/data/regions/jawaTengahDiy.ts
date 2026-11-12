import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Jawa Tengah & DI Yogyakarta (Tahap 3).
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const JAWA_TENGAH_DIY_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. WALI SONGO JAWA TENGAH (DEMAK & KUDUS)
  // =========================================================================
  {
    id: 'sunan-kalijaga',
    legacyId: 'wali-7',
    name: 'Makam Sunan Kalijaga (Raden Mas Said / Syekh Malaya)',
    title: 'Wali Songo Pelopor Dakwah Kultural Nusantara di Kadilangu Demak',
    description:
      'Kompleks Cagar Budaya Maqbarah Sunan Kalijaga (Raden Mas Said) di Desa Kadilangu, Kecamatan Demak, Kabupaten Demak—arsitek kebudayaan Islam Jawa melalui seni wayang, gamelan Sekaten, dan suluk tasawuf.',
    category: 'Walisongo',
    era: 'Abad ke-15 – Abad ke-16 M',
    province: 'Jawa Tengah',
    city: 'Demak',
    district: 'Kec. Demak',
    address: 'Kelurahan Kadilangu, Kec. Demak, Kabupaten Demak',
    location: {
      lat: -6.9052,
      lng: 110.6512,
      address: 'Kelurahan Kadilangu, Kec. Demak, Kabupaten Demak',
      district: 'Kec. Demak',
      city: 'Demak',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Kesultanan Demak & Maqbarah Sunan Kalijaga Kadilangu',
    sanad:
      'Putra Adipati Tuban Tumenggung Wilatikta; murid utama Sunan Bonang (Raden Makhdum Ibrahim), Sunan Ampel, dan Syekh Siti Jenar / Syekh Sutabaris; guru spiritual para sultan Demak dan Mataram.',
    karya: [
      'Kidung Rumekso ing Wengi dan tembang suluk Lir-Ilir serta Gundul-Gundul Pacul',
      'Rekayasa Saka Tatal Masjid Agung Demak dan penciptaan Gamelan Sekaten (Syahadatain)',
      'Reformasi pakeliran Wayang Kulit Purwa bernafaskan tauhid (Lakon Dewa Ruci & Jamus Kalimasada)',
    ],
    history:
      'Raden Mas Said—yang kemudian masyhur dengan gelar **Sunan Kalijaga** atau *Syekh Malaya*—adalah putra Adipati Tuban, Tumenggung Wilatikta (Raden Sahur). Pada masa mudanya, keprihatinan melihat penderitaan rakyat jelata akibat upeti dan kemarau panjang di akhir era Majapahit mendorong Raden Said mengambil harta gudang kadipaten untuk dibagikan kepada fakir miskin hingga beliau dijuluki *Brandal Lokajaya*. Titik balik perjalanan ruhaninya terjadi ketika beliau bertemu dengan **Sunan Bonang** di tepi sungai dan diperintahkan menjaga tongkat sang guru (*bertapa di tepi kali / Kalijaga*) selama bertahun-tahun hingga hatinya bersih dan siap menerima ilmu hakikat.\n\nSebagai anggota termuda namun paling luas jangkauan dakwahnya di Dewan Wali Songo, Sunan Kalijaga memilih metode *dakwah bil-hikmah* yang mengakomodasi khazanah seni dan budaya Jawa tanpa mengorbankan kemurnian tauhid. Beliau menggubah lakon-lakon wayang kulit (*Jamus Kalimasada* dari kalimat Syahadat), merancang baju takwa (*Surjan*), menciptakan tembang filosofis *Lir-Ilir* dan *Kidung Rumekso ing Wengi*, serta mempelopori perayaan *Grebeg Maulud* dan *Sekaten* di serambi Masjid Agung Demak.\n\nDalam pembangunan Masjid Agung Demak (1479 M), Sunan Kalijaga berkontribusi menyusun salah satu dari empat tiang utama (*Saka Guru* sebelah timur laut) dari serpihan kayu jati yang diikat menjadi satu kesatuan kokoh (*Saka Tatal*) serta menetapkan arah kiblat masjid. Di masa sepuhnya, beliau dianugerahi tanah perdikan di **Kadilangu** (sekitar 2 km di sebelah tenggara Masjid Agung Demak) dan wafat pada abad ke-16 M serta dimakamkan di Kompleks Maqbarah Kadilangu.',
    karomah: [
      'Dalam naskah *Babad Demak* dan tradisi lisan masyarakat Jawa, karomah Sunan Kalijaga yang paling masyhur terjadi saat malam pendirian Masjid Agung Demak: ketika waktu tenggat hampir habis sementara satu tiang utama (*saka guru*) belum terbentuk, Sunan Kalijaga mengumpulkan tatal-tatal (serpihan kayu sisa pahatan para wali), mengikatnya, dan berdoa memohon kepada Allah SWT hingga keesokan paginya ikatan tatal tersebut menyatu laksana kayu utuh (*Saka Tatal*).<!--more-->\n\nDiriwayatkan pula karomah Sunan Kalijaga saat meluruskan arah kiblat Masjid Agung Demak dengan satu tangan kanannya memegang puncak kubah/tiang Masjid Demak dan tangan kirinya mengarah lurus ke Ka’bah di Makkah, serta anugerah *Rompi Ontokusumo* dan *Keris Kyai Carubuk* yang hingga kini masih dirawat dalam tradisi *Penjamasan Pusaka Sunan Kalijaga* setiap 10 Dzulhijjah di Kadilangu.',
    ],
    untoldStory:
      'Tanah Perdikan Kadilangu memiliki tata kelola adat yang unik sejak abad ke-16: keturunan langsung Sunan Kalijaga yang terhimpun dalam *Yayasan Sunan Kalijaga Kadilangu* menjaga kelestarian Masjid Sunan Kalijaga (yang memiliki inskripsi tahun 1456 Saka / 1534 M di atas mihrabnya) serta ritual *Ancakan* dan pembuatan minyak jamas tradisional oleh para sesepuh wanita dzurriyah Kadilangu.<!--more-->\n\nPintu cungkup utama pusara Sunan Kalijaga di Kadilangu hanya dibuka pada waktu-waktu terjadwal di bawah pengawasan juru kunci (*Lurah Tamu*), sementara pada hari-hari tertentu peziarah bermunajat dengan khusyuk dari serambi pendopo di luar cungkup utama.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Kalijaga di Kadilangu Demak umumnya bertawassul memohon kepada Allah SWT keluasan hikmah dan kebijaksanaan dalam berdakwah/memimpin masyarakat, penjagaan keluarga dari marabahaya lahir-batin sebagaimana munajat *Kidung Rumekso ing Wengi*, serta keluhuran budi pekerti.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Kalijaga (Raden Mas Said Kadilangu)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَلَايَا رَادِينْ سَعِيدْ الْمَعْرُوفِ بِسُونَانْ كَالِيجَاغَا كَادِيلَانْغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنْ كُلِّ سُوءٍ وَارْزُقْنَا الْحِكْمَةَ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَلَايَا رَادِينْ سَعِيدْ الْمَعْرُوفِ بِسُونَانْ كَالِيجَاغَا كَادِيلَانْغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنْ كُلِّ سُوءٍ وَارْزُقْنَا الْحِكْمَةَ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Malaayaa Raden Sa'iid al-ma'ruufi bi Sunan Kalijaga Kadilangu syai-un lillaahi lahumul-Faatihah. Allaahummahfazhnaa min kulli suu-in warzuqnal-hikmata wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Malaya Raden Said (Sunan Kalijaga Kadilangu), Al-Fatihah. Ya Allah, lindungilah kami dari segala keburukan, karuniakanlah hikmah kepada kami, dan limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Malaya Raden Said (Sunan Kalijaga Kadilangu), Al-Fatihah. Ya Allah, lindungilah kami dari segala keburukan, karuniakanlah hikmah kepada kami, dan limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Dzulhijjah / Hari Raya Idul Adha (Puncak Haul Akbar & Tradisi Penjamasan Pusaka Kanjeng Sunan Kalijaga di Kadilangu, Kecamatan Demak, Kabupaten Demak).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mematuhi jadwal buka-tutup pintu cungkup utama yang diatur oleh juru kunci Kadilangu, serta menjaga ketertiban antrean peziarah.',
    facilities: ['Cungkup Utama Maqbarah Sunan Kalijaga', 'Masjid Kuno Sunan Kalijaga Kadilangu (1534 M)', 'Pendopo Notobratan Kadilangu', 'Terminal Parkir Bus Wisata Religi Kadilangu Demak'],
    openingHours: 'Buka 24 Jam (Cungkup dalam dibuka mengikuti jadwal resmi Yayasan Kadilangu)',
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
      'Geertz, Clifford (1960). The Religion of Java. Glencoe: The Free Press.',
      'Woodward, Mark R. (1989). Islam in Java: Normative Piety and Mysticism in the Sultanate of Yogyakarta. University of Arizona Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-kudus',
    legacyId: 'wali-5',
    name: 'Makam Sunan Kudus (Sayyid Ja’far Shadiq Azmatkhan)',
    title: 'Waliyyul ’Ilmi, Qadhi Agung Kesultanan Demak & Pendiri Masjid Al-Aqsha Menara Kudus',
    description:
      'Kompleks Cagar Budaya Nasional Masjid Al-Aqsha Menara Kudus dan Maqbarah Sunan Kudus (Sayyid Ja’far Shadiq, wafat 1550 M) di Desa Kauman, Kecamatan Kota, Kabupaten Kudus—simbol toleransi kultural dan keteguhan syariat.',
    category: 'Walisongo',
    era: 'Abad ke-16 M (Wafat ~1550 M / 957 H)',
    province: 'Jawa Tengah',
    city: 'Kudus',
    district: 'Kec. Kota Kudus',
    address: 'Jl. Menara, Desa Kauman, Kec. Kota, Kabupaten Kudus',
    location: {
      lat: -6.8042,
      lng: 110.8328,
      address: 'Jl. Menara, Desa Kauman, Kec. Kota, Kabupaten Kudus',
      district: 'Kec. Kota Kudus',
      city: 'Kudus',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Masjid Al-Aqsha Menara Kudus & Maqbarah Sunan Kudus',
    sanad:
      'Sayyid Ja’far Shadiq bin Raden Usman Haji (Sunan Ngudung, panglima Kesultanan Demak) bin Sayyid Fadhal Ali Murtadha (Raja Pandita); murid dari ayahandanya sendiri, Sunan Ampel, Sunan Kalijaga, dan Kyai Telingsing (ulama sufi asal Yunan/Tiongkok di Kudus).',
    karya: [
      'Pembangunan Masjid Al-Aqsha dan Menara Kudus (956 H / 1549 M) berarsitektur akulturasi bata merah Majapahit-Islam',
      'Fatwa toleransi larangan menyembelih sapi di Kudus untuk menghormati masyarakat Hindu lokal dan menggantinya dengan kerbau',
      'Penciptaan tembang Maskumambang dan Mijil serta sistem peradilan Qadhi Kesultanan Demak',
    ],
    history:
      '**Sunan Kudus**—yang memiliki nama asli **Sayyid Ja’far Shadiq Azmatkhan** (wafat sekitar tahun 1550 M)—adalah putra dari **Raden Usman Haji (Sunan Ngudung)**, senopati agung Kesultanan Demak Bintoro, dan Syarifah Dewi Ruhil (putri Sunan Ampel). Karena penguasaan beliau yang sangat mendalam atas ilmu fikih, ushul fiqh, tafsir, hadis, dan sastra Arab setelah menuntut ilmu hingga ke Baitul Maqdis (Yerusalem, Palestina) dan Makkah, Dewan Wali Songo menganugerahkan gelar **Waliyyul ’Ilmi** (*Wali Penguasa Ilmu*) kepada beliau. Di Kesultanan Demak, beliau sempat menjabat sebagai *Qadhi* (Hakim Agung) sekaligus Panglima Perang menggantikan ayahandanya.\n\nSekitar pertengahan abad ke-16 M, Sayyid Ja’far Shadiq memilih meninggalkan hiruk-pikuk politik istana Demak dan memusatkan dakwah di daerah **Tajug** (yang sebelumnya telah dirintis oleh guru beliau, ulama Tionghoa-Muslim **Kyai Telingsing**). Mengambil berkah dari kenangan rihlah beliau ke Baitul Maqdis (*Al-Quds*), beliau menamai kota tersebut **Kudus** dan mendirikan **Masjid Al-Aqsha Menara Kudus** pada tanggal **19 Rajab 956 H (23 Agustus 1549 M)**—sebagaimana terpahat jelas pada batu prasasti berbahasa Arab (*Prasasti Tajug*) di atas mihrab masjid.\n\nPendekatan dakwah Sunan Kudus menjadi teladan abadi toleransi beragama di Nusantara: untuk menghormati perasaan masyarakat Tajug yang kala itu masih banyak memeluk agama Hindu (yang memuliakan sapi), Sunan Kudus menambatkan seekor sapi bernama *Kebo Gumarang* di halaman masjid dan melarang pengikutnya menyembelih sapi di Kudus (termasuk saat Idul Adha), seraya menganjurkan penyembelihan kerbau. Beliau wafat sekitar tahun 1550 M dan dimakamkan tepat di belakang mihrab Masjid Al-Aqsha Menara Kudus.',
    karomah: [
      'Dalam tradisi lisan masyarakat Kudus dan naskah *Babad Tanah Jawi*, ketika wilayah Baitul Maqdis (Palestina) dilanda wabah penyakit, Sayyid Ja’far Shadiq muda berhasil menyembuhkan penduduk melalui doa munajatnya kepada Allah SWT sehingga Amir Palestina menghadiahi beliau sebuah batu pualam bersejarah dari Baitul Maqdis yang kemudian dipasang sebagai batu fondasi pengimaman Masjid Al-Aqsha Kudus.<!--more-->\n\nHingga lebih dari 470 tahun setelah wafatnya Sunan Kudus, wasiat beliau untuk tidak menyembelih sapi di Kudus masih dipatuhi dengan penuh takzim oleh masyarakat Muslim Kudus, melahirkan kuliner khas *Sate Kerbau* dan *Soto Kerbau Kudus* sebagai warisan hidup dakwah yang ramah dan penuh tenggang rasa.',
    ],
    untoldStory:
      'Di sekeliling kompleks Masjid dan Menara Kudus, terdapat gapura-gapura *Paduraksa* dan *Candi Bentar* kuno (termasuk *Lawang Kembar* di dalam masjid) serta pancuran wudhu berjumlah delapan buah yang di atasnya dipasang arca kepala *Kala*—melambangkan *Asta Sanghika Marga* (Delapan Jalan Kebenaran dalam filsafat Buddha) yang diselaraskan oleh Sunan Kudus dengan akhlak Islam.<!--more-->\n\nTidak jauh dari Kompleks Menara Kudus (sekitar 400 meter di Desa Sunggingan), peziarah juga dapat berziarah ke makam guru seni ukir dan tasawuf Sunan Kudus, yakni **Kyai Telingsing (The Ling Sing)**.',
    barokahHajat:
      'Peziarah, santri, dan usahawan yang berziarah ke maqbarah Sunan Kudus di Kauman Kota Kudus umumnya bertawassul memohon kepada Allah SWT ketajaman ilmu agama (*Waliyyul ’Ilmi*), keberkahan etos kerja dan kemandirian ekonomi (*Gusjigang*: Bagus akhlaknya, Ngaji ilmunya, Dagang usahanya), serta keteguhan iman.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Kudus (Sayyid Ja’far Shadiq Azmatkhan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ وَلِيِّ الْعِلْمِ سَيِّدِنَا الشَّيْخِ جَعْفَرْ صَادِقْ عَظْمَةْ خَانْ الْمَعْرُوفِ بِسُونَانْ قُدُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ وَلِيِّ الْعِلْمِ سَيِّدِنَا الشَّيْخِ جَعْفَرْ صَادِقْ عَظْمَةْ خَانْ الْمَعْرُوفِ بِسُونَانْ قُدُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Waliyyil-'Ilmi Sayyidinaa asy-Syaikh Ja'far Shaadiq 'Azhmatkhan al-ma'ruufi bi Sunan Kudus syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa 'ilman naafi'an wa rizqan waasi'an wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Waliyyul Ilmi penghulu kami Sayyid Ja’far Shadiq Azmatkhan (Sunan Kudus), Al-Fatihah. Ya Allah, karuniakanlah kepada kami ilmu yang bermanfaat dan rezeki yang luas, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Waliyyul Ilmi penghulu kami Sayyid Ja’far Shadiq Azmatkhan (Sunan Kudus), Al-Fatihah. Ya Allah, karuniakanlah kepada kami ilmu yang bermanfaat dan rezeki yang luas, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Muharram / Hari Asyura (Puncak Tradisi Buka Luwur Kanjeng Sunan Kudus & Pembagian Nasi Jangkrik di Kompleks Masjid Al-Aqsha Menara Kudus).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menghormati kearifan lokal Kudus dengan tidak membawa makanan berbahan daging sapi ke area makam, serta mengikuti jalur antrean lorong cungkup Menara Kudus.',
    facilities: ['Masjid Al-Aqsha & Menara Kudus (Cagar Budaya Nasional 1549 M)', 'Cungkup Maqbarah Sunan Kudus & Panembahan Palembang', 'Museum & Perpustakaan Menara Kudus', 'Terminal Parkir Bus Wisata Religi Bakalan Krapyak Kudus'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Said, Nur (2013). Tradisi Buka Luwur Sunan Kudus: Merawat Toleransi di Kota Santri. Kudus:STAIN Kudus Press.',
      'Tjandrasasmita, Uka (2009). Arkeologi Islam Nusantara. Jakarta: KPG.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-muria',
    legacyId: 'wali-8',
    name: 'Makam Sunan Muria (Raden Umar Said)',
    title: 'Wali Songo Penjaga Ekologi Pegunungan & Pendakwah Kaum Jelata di Puncak Gunung Muria',
    description:
      'Kompleks Cagar Budaya Masjid dan Maqbarah Sunan Muria (Raden Umar Said, abad ke-16 M) di puncak Bukit Colo, Kecamatan Dawe, Kabupaten Kudus—putra Sunan Kalijaga yang memilih berdakwah di tengah petani, nelayan, dan peladang lereng Gunung Muria.',
    category: 'Walisongo',
    era: 'Abad ke-16 M',
    province: 'Jawa Tengah',
    city: 'Kudus',
    district: 'Kec. Dawe',
    address: 'Desa Colo, Kec. Dawe, Lereng Gunung Muria, Kabupaten Kudus',
    location: {
      lat: -6.6663,
      lng: 110.9012,
      address: 'Desa Colo, Kec. Dawe, Lereng Gunung Muria, Kabupaten Kudus',
      district: 'Kec. Dawe',
      city: 'Kudus',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Masjid & Maqbarah Sunan Muria di Puncak Colo Gunung Muria Kudus',
    sanad:
      'Putra dari Sunan Kalijaga (Raden Mas Said) dan Dewi Saroh binti Syekh Maulana Ishaq (adik kandung Sunan Giri); murid dari ayahandanya Sunan Kalijaga dan Sunan Ngerang (Juwana, Pati).',
    karya: [
      'Penciptaan tembang macapat Sinom dan Kinanthi sebagai media dakwah akhlak dan tasawuf',
      'Pelestarian ekosistem hutan, mata air, dan tanaman pangan pegunungan (Parijoto, Pakis Haji, dan Jati) di Gunung Muria',
      'Pembinaan spiritual masyarakat peladang, petani, dan nelayan di kawasan eks-Selat Muria (Kudus, Jepara, Pati)',
    ],
    history:
      '**Sunan Muria**—yang memiliki nama asli **Raden Umar Said** atau *Raden Prawoto* (abad ke-16 M)—adalah putra dari pasangan **Sunan Kalijaga** dan **Dewi Saroh binti Syekh Maulana Ishaq**. Dengan demikian, dari jalur ibu beliau adalah keponakan kandung Sunan Giri di Gresik. Sejak muda, Raden Umar Said berguru ilmu syariat dan hakikat kepada ayahandanya sendiri, kepada pamannya Sunan Giri, serta kepada waliyullah sepuh di pesisir timur Muria, yakni **Sunan Ngerang (Ki Ageng Ngerang)** di Juwana, Pati, bersama sahabat seperguruannya Sunan Kudus dan Adipati Pathak Warak.\n\nBerbeda dengan para wali lain yang berdakwah di pusat-pusat ibu kota kesultanan atau pelabuhan ramai, Sunan Muria memilih membangun pusat dakwah dan pesantrennya di puncak perbukitan **Desa Colo, Kecamatan Dawe, Kabupaten Kudus**, pada ketinggian sekitar 1.600 meter di atas permukaan laut di lereng selatan Gunung Muria. Dari puncak gunung yang sejuk dan hening inilah beliau turun menyapa kaum petani, penyadap nira, pedagang kecil, dan nelayan di sepanjang pesisir Kudus, Pati, dan Jepara (yang pada abad ke-16 masih dipisahkan dari daratan Jawa oleh *Selat Muria*).\n\nMelalui pendekatan kesenian rakyat—menciptakan tembang *Sinom* dan *Kinanthi*—serta pengajaran bercocok tanam yang menjaga kelestarian mata air pegunungan, Sunan Muria sangat dicintai oleh rakyat jelata. Beliau menikah dengan **Dewi Sujinah** (putri Sunan Ngudung / kakak perempuan Sunan Kudus) serta Dewi Roroyono (putri Sunan Ngerang). Setelah wafat pada pertengahan abad ke-16 M, beliau dimakamkan tepat di belakang Masjid Sunan Muria di puncak Bukit Colo, Kecamatan Dawe, Kabupaten Kudus.',
    karomah: [
      'Dalam tradisi lisan masyarakat lereng Gunung Muria dan naskah babad Jawa, Sunan Muria dikenal memiliki fisik yang sangat kuat dan karomah *melipat jarak* (*thayyul ardh*): beliau sanggup naik-turun lereng terjal Gunung Muria setinggi 1.600 mdpl setiap hari untuk menghadiri sidang Wali Songo di Masjid Agung Demak maupun membimbing nelayan di pesisir Juwana dan Jepara.<!--more-->\n\nDi serambi depan Kompleks Makam Sunan Muria terdapat **Gentong Air Keramat Sunan Muria** yang dialiri mata air pegunungan Muria yang tak pernah kering sepanjang abad; air ini diminum oleh ribuan peziarah sebagai wasilah kesembuhan dan kesegaran fisik setelah mendaki ratusan anak tangga Bukit Colo.',
    ],
    untoldStory:
      'Di dalam bangunan Masjid dan Cungkup Makam Sunan Muria, masih tersimpan artefak asli peninggalan abad ke-16 M berupa **umpak batu andesit kuno** penyangga tiang masjid, **mihrab batu bata ekspos** berhias piring keramik Tiongkok kuno, serta **pelana kuda** dan **bedug kayu jati** peninggalan masa Sunan Muria.<!--more-->\n\nDi kawasan lereng Gunung Muria sekitar makam tumbuh tanaman endemik **Buah Parijoto** (*Medinilla speciosa*) dan kayu **Pakis Haji** yang sejak zaman Sunan Muria dipercaya secara turun-temurun oleh masyarakat Jawa memiliki khasiat kesehatan bagi ibu hamil dan simbol doa memohon keturunan yang rupawan serta saleh.',
    barokahHajat:
      'Peziarah dan pasangan suami-istri yang berziarah ke maqbarah Sunan Muria di puncak Colo Kudus umumnya bertawassul memohon kepada Allah SWT agar dikaruniai keturunan yang saleh-salehah, kerukunan rumah tangga (*Kinanthi*: saling menuntun dalam kebaikan), serta kelancaran usaha pertanian dan perniagaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Muria (Raden Umar Said Colo Kudus)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ رَادِينْ عُمَرْ سَعِيدْ الْمَعْرُوفِ بِسُونَانْ مُورِيَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ رَادِينْ عُمَرْ سَعِيدْ الْمَعْرُوفِ بِسُونَانْ مُورِيَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Raden 'Umar Sa'iid al-ma'ruufi bi Sunan Muria syai-un lillaahi lahumul-Faatihah. Allaahumma hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a'yunin wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Raden Umar Said (Sunan Muria), Al-Fatihah. Ya Allah, karuniakanlah kepada kami pasangan dan keturunan yang menjadi penyejuk mata, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Raden Umar Said (Sunan Muria), Al-Fatihah. Ya Allah, karuniakanlah kepada kami pasangan dan keturunan yang menjadi penyejuk mata, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15 Muharram (Puncak Haul Akbar & Tradisi Buka Luwur Kanjeng Sunan Muria di Puncak Bukit Colo, Kecamatan Dawe, Kabupaten Kudus).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, berhati-hati saat meniti lebih dari 700 anak tangga maupun saat menggunakan jasa ojek resmi Gunung Muria, serta menjaga kelestarian alam dan kebersihan mata air gentong Sunan Muria.',
    facilities: ['Masjid & Cungkup Maqbarah Sunan Muria', 'Gentong Air Berkah Sunan Muria', 'Pangkalan Ojek Resmi Wisata Religi Colo', 'Terminal Parkir Bus Colo Dawe Kudus'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
      'Widodo, Dukut Imam (2008). Kudus dan Sejarahnya. Kudus: Pemerintah Kabupaten Kudus.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 2. KESULTANAN DEMAK, PATI, JEPARA & PEKALONGAN
  // =========================================================================
  {
    id: 'raden-patah-demak',
    legacyId: 'auliya-6',
    name: 'Makam Sultan Raden Patah, Adipati Unus & Sultan Trenggono (Kompleks Masjid Agung Demak)',
    title: 'Pendiri & Raja-Raja Kesultanan Islam Pertama di Tanah Jawa (Demak Bintoro, 1478–1546 M)',
    description:
      'Kompleks Pemakaman Raja-Raja Kesultanan Demak Bintoro di sisi barat laut Masjid Agung Demak, Kelurahan Kauman, Kecamatan Demak, Kabupaten Demak—peristirahatan Sultan Alam Akbar Al-Fatah (Raden Patah), Pangeran Sabrang Lor (Adipati Unus), dan Sultan Trenggono.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Pertengahan Abad ke-16 M (1478–1546 M)',
    province: 'Jawa Tengah',
    city: 'Demak',
    district: 'Kec. Demak',
    address: 'Kompleks Masjid Agung Demak, Kel. Kauman, Kec. Demak, Kabupaten Demak',
    location: {
      lat: -6.8946,
      lng: 110.6373,
      address: 'Kompleks Masjid Agung Demak, Kel. Kauman, Kec. Demak, Kabupaten Demak',
      district: 'Kec. Demak',
      city: 'Demak',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Masjid Agung Demak & Kompleks Makam Sultan Raden Patah',
    sanad:
      'Raden Patah (Jin Bun / Senapati Jimbun) adalah putra Prabu Brawijaya V (Majapahit) yang dibesarkan oleh Arya Damar di Palembang; murid utama dan menantu Sunan Ampel di Surabaya; ayahanda dari Adipati Unus (Pangeran Sabrang Lor) dan Sultan Trenggono.',
    karya: [
      'Pendirian Kesultanan Demak Bintoro (1478 M) sebagai kerajaan Islam pertama di Pulau Jawa',
      'Pembangunan Masjid Agung Demak bersama Dewan Wali Songo (1479 M / 1401 Saka)',
      'Penyusunan kitab hukum pidana dan perdata Islam Jawa Salokantara dan ekspedisi maritim antikolonial ke Malaka (1513 M) serta Sunda Kelapa (1527 M)',
    ],
    history:
      '**Raden Patah**—yang bergelar resmi **Sultan Syah Alam Akbar Al-Fatah** (memerintah 1478–1518 M)—adalah pendiri dan sultan pertama **Kesultanan Demak Bintoro**, kerajaan Islam pertama di Pulau Jawa. Lahir di Palembang sekitar tahun 1455 M sebagai putra Prabu Brawijaya V dari putri Champa/Tionghoa yang diasuh oleh Adipati Palembang Arya Damar, Raden Patah muda berlayar ke tanah Jawa dan menuntut ilmu agama kepada **Sunan Ampel** di Pesantren Ampel Denta, Surabaya. Atas petunjuk Sunan Ampel, Raden Patah membuka hutan rawa beraroma wangi (*Glagahwangi*) di Bintoro, Demak, yang segera tumbuh menjadi pesantren dan bandar maritim yang makmur.\n\nDengan dukungan penuh Dewan Wali Songo, Raden Patah dinobatkan menjadi Sultan Demak pertama dan membangun **Masjid Agung Demak** pada tahun 1479 M (ditandai *candrasengkala* gambar bulus di mihrab: *Sarira Sunyi Kiblating Gusti* = 1401 Saka). Kepemimpinan beliau dilanjutkan oleh putra sulungnya yang gagah berani, **Pati Unus / Pangeran Sabrang Lor** (memerintah 1518–1521 M), yang memimpin armada laut gabungan Nusantara menyeberangi selat untuk menyerang benteng Portugis di Malaka pada tahun 1513 M.\n\nKejayaan teritorial Kesultanan Demak mencapai puncaknya pada masa putra ketiga Raden Patah, **Sultan Trenggono** (memerintah 1521–1546 M), yang mempersatukan pesisir utara dan pedalaman Jawa serta mengutus Fatahillah membebaskan Sunda Kelapa (Jayakarta) dari ancaman Portugis pada 22 Juni 1527 M. Raden Patah (wafat 1518 M), Adipati Unus (wafat 1521 M), Sultan Trenggono (wafat 1546 M), dan Syekh Maulana Maghribi dimakamkan di Kompleks Maqbarah Raja-Raja Kesultanan Demak tepat di sisi barat laut Masjid Agung Demak.',
    karomah: [
      'Dalam naskah *Babad Tanah Jawi* dan catatan pengembara Portugis Tomé Pires (*Suma Oriental*, 1515 M), karomah kepemimpinan Raden Patah dan putra-putranya terletak pada perpaduan ketawadhuan seorang santri kepada Dewan Wali Songo dengan ketegasan seorang panglima yang menjaga kedaulatan Nusantara dari penetrasi kolonialisme Eropa awal.<!--more-->\n\nDi Kompleks Masjid Agung Demak masih berdiri tegak empat *Saka Guru* buatan empat Wali Songo (Sunan Bonang, Sunan Gunung Jati, Sunan Ampel, dan Sunan Kalijaga), *Pintu Bledeg* karya Ki Ageng Selo (1466 M), serta *Dampar Kencana* peninggalan Majapahit yang dijadikan mimbar khutbah Jumat Kesultanan Demak.',
    ],
    untoldStory:
      'Di dalam kompleks pemakaman belakang Masjid Agung Demak, pusara **Raden Patah** berdampingan dengan pusara permaisurinya (Ratu Asyikah binti Sunan Ampel), pusara **Pangeran Sabrang Lor (Adipati Unus)**, **Sultan Trenggono**, serta **Arya Penangsang / Pangeran Arya Jipang** dan **Pangeran Benawa**.<!--more-->\n\nDi sisi utara halaman Masjid Agung Demak juga terdapat **Museum Masjid Agung Demak** yang menyimpan mushaf Al-Qur’an tulis tangan kuno, bedug raksasa abad ke-15, dan gentong keramik hadiah Dinasti Ming untuk Kesultanan Demak.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sultan Raden Patah, Adipati Unus, dan Sultan Trenggono di Kompleks Masjid Agung Demak umumnya bertawassul memohon kepada Allah SWT kejayaan dan keadilan kepemimpinan (*umara*), sinergi yang berkah antara pemimpin dan ulama, serta keberanian membela agama dan kedaulatan bangsa.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Raden Patah, Adipati Unus & Sultan Trenggono (Demak Bintoro)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ شَاهْ عَالَمْ أَكْبَرْ الْفَتَّاحْ (رَادِينْ فَتَاهْ) وَالْأَمِيرِ يُونُسْ (فَانْغِيرَانْ سَابْرَانْغ لُورْ) وَالسُّلْطَانِ تْرِينْغغُونُو دَمَاكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِجِهَادِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ شَاهْ عَالَمْ أَكْبَرْ الْفَتَّاحْ (رَادِينْ فَتَاهْ) وَالْأَمِيرِ يُونُسْ (فَانْغِيرَانْ سَابْرَانْغ لُورْ) وَالسُّلْطَانِ تْرِينْغغُونُو دَمَاكْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِجِهَادِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Syaah 'Aalam Akbar al-Fattaah (Raden Patah) wal-Amiir Yuunus (Pangeran Sabrang Lor) was-Sulthaan Trenggono Demak syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wanfa'naa bi jihaadihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Syah Alam Akbar Al-Fatah (Raden Patah), Adipati Unus (Pangeran Sabrang Lor), dan Sultan Trenggono Demak, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui perjuangan dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Syah Alam Akbar Al-Fatah (Raden Patah), Adipati Unus (Pangeran Sabrang Lor), dan Sultan Trenggono Demak, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui perjuangan dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal (Grebeg Maulud) & 10 Dzulhijjah (Grebeg Besar Demak serta Haul Agung Sultan Fatah di Kompleks Masjid Agung Demak, Kabupaten Demak).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki pelataran serambi Masjid Agung Demak dan pendopo maqbarah Sultan Fatah, serta menjaga ketenangan jamaah yang sedang shalat dan berzikir.',
    facilities: ['Masjid Agung Demak (Cagar Budaya Nasional 1479 M)', 'Cungkup Maqbarah Sultan Raden Patah & Raja-Raja Demak', 'Museum Masjid Agung Demak', 'Terminal Parkir Bus Wisata Religi Tembiring Demak'],
    openingHours: 'Buka 24 Jam',
    references: [
      'De Graaf, H.J. & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa: Peralihan dari Majapahit ke Mataram. Jakarta: Grafiti Pers.',
      'Pires, Tomé (1515 / 2015). Suma Oriental: Perjalanan dari Laut Merah ke Cina. Yogyakarta: Ombak.',
      'Muljana, Slamet (2005). Runtuhnya Kerajaan Hindu-Jawa dan Timbulnya Negara-Negara Islam di Nusantara. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-jangkung-pati',
    legacyId: 'auliya-7',
    name: 'Makam Syekh Jangkung / Saridin (Landoh, Kayen, Pati)',
    title: 'Waliyullah Sufi Pengembara Samudra & Penasihat Ruhani Sultan Agung Mataram',
    description:
      'Kompleks Maqbarah Syekh Jangkung (Raden Saridin, wafat ~1641 M) di Desa Landoh, Kecamatan Kayen, Kabupaten Pati—wali sufi berhaluan *malāmatiyyah* murid Sunan Kalijaga dan Sunan Kudus yang sangat dicintai masyarakat pesisir utara Jawa.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-16 – Abad ke-17 M (Masa Sultan Agung Mataram)',
    province: 'Jawa Tengah',
    city: 'Pati',
    district: 'Kec. Kayen',
    address: 'Dusun Landoh, Desa Kayen, Kec. Kayen, Kabupaten Pati',
    location: {
      lat: -6.8982,
      lng: 111.0315,
      address: 'Dusun Landoh, Desa Kayen, Kec. Kayen, Kabupaten Pati',
      district: 'Kec. Kayen',
      city: 'Pati',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pati (Kompleks Masjid & Maqbarah Syekh Jangkung Landoh Kayen Pati)',
    sanad:
      'Putra Sunan Muria (atau murid asuh Ki Ageng Kiringan di Miyono Pati); menimba ilmu syariat dan hakikat di Pesantren Sunan Kudus dan Sunan Kalijaga, serta berkhalwat di Cirebon dan Palembang; saudara ipar sekaligus penasihat spiritual Sultan Agung Hanyakrakusuma (Mataram).',
    karya: [
      'Pembukaan lahan pertanian dan pusat dakwah Desa Perdikan Landoh di Kayen, Pati',
      'Keteladanan tasawuf kerakyatan (Suluk Saridin) yang membela kaum jelata dari kesewenang-wenangan penguasa feodal',
    ],
    history:
      '**Syekh Jangkung**—yang sejak masa kecilnya sangat akrab di hati rakyat Jawa Tengah dengan nama **Saridin** (hidup pada akhir abad ke-16 hingga pertengahan abad ke-17 M)—adalah salah satu waliyullah paling unik dalam khazanah *Islam Nusantara*. Lahir dan tumbuh di kawasan Miyono, Kayen, Kabupaten Pati, Saridin adalah seorang pengamal tasawuf *hakikat* (*ahlul ma’rifah*) yang tampil sangat sederhana sebagai rakyat biasa. Ketika nyantri di Kudus dan Kadilangu, cara pandang ruhaninya yang langsung menembus esensi tauhid sering disalahpahami oleh orang-orang yang hanya melihat sisi lahiriah, namun justru diakui kemuliaan derajat kewaliannya oleh **Sunan Kudus**, **Sunan Kalijaga**, dan **Sunan Gunung Jati**.\n\nDalam naskah *Babad Tanah Jawi* dan *Serat Syekh Jangkung*, dikisahkan perjalanan rihlah dan riyadhah Saridin yang mengapung di lautan hanya berbekal belahan buah kelapa (*kelapa sacukil*) hingga sampai di Cirebon dan Palembang. Ketika Kesultanan Mataram di bawah pemerintahan **Sultan Agung Hanyakrakusuma** (1613–1645 M) sedang menghadapi berbagai ujian besar termasuk ekspedisi ke Jawa Timur dan Batavia, Saridin hadir membantu Sultan Agung secara ruhani hingga dianugerahi gelar kehormatan **Panembahan Syekh Jangkung** (*Jangkung*: pelindung/penjaga ruhani yang tinggi derajatnya) dan dinikahkan dengan kakak perempuan Sultan Agung, **Ratu Retno Jinoli**.\n\nMeskipun menjadi kerabat istana Mataram, Syekh Jangkung menolak hidup bermewah-mewah di keraton dan memilih kembali ke kampung halamannya untuk membuka hutan **Landoh di Kecamatan Kayen, Kabupaten Pati** sebagai desa perdikan dan pusat dakwah pertanian rakyat. Beliau wafat pada tanggal **15 Rajab** sekitar tahun 1641 M dan dimakamkan di Kompleks Maqbarah Desa Landoh, Kayen, Pati.',
    karomah: [
      'Dalam tradisi lisan masyarakat Pati-Kudus dan lakon ketoprak/babad *Saridin (Syekh Jangkung)*, ratusan kisah karomah beliau dituturkan secara turun-temurun: mulai dari kisah pembagian pohon durian Miyono yang buahnya hanya jatuh di bagian milik Saridin, perjalanan mengarungi Laut Jawa di atas tempurung kelapa, hingga karomah memelihara **Kerbau Landoh (Kebo Landoh)** bernama *Si Dhungkul* yang memiliki kekuatan luar biasa.<!--more-->\n\nSaat perayaan Haul Akbar Syekh Jangkung setiap tanggal 15 Rajab di Desa Landoh Kayen Pati, tradisi penggantian *luwur* (kain kelambu makam) dan pembagian nasi berkat dengan lauk daging kerbau dihadiri oleh puluhan ribu peziarah dari seluruh penjuru Pulau Jawa.',
    ],
    untoldStory:
      'Di dalam kompleks Maqbarah Syekh Jangkung di Dusun Landoh, Desa Kayen, Pati, selain pusara utama Syekh Jangkung (Saridin), terdapat pula makam istri-istri beliau (**Ratu Retno Jinoli** dari Mataram dan **RA. Bakirah** dari Cirebon), makam putra beliau (**Raden Momok / Pangeran Kusumoyudo**), serta cungkup makam kerbau kesayangan beliau (*Kebo Landoh*) di luar pagar utama.<!--more-->\n\nKisah hidup Syekh Jangkung telah diteliti oleh banyak filolog sebagai potret resistensi kultural kaum sufi pedesaan Jawa yang mengajarkan bahwa kemuliaan seorang hamba di sisi Allah tidak diukur dari jubah kebesaran, melainkan dari kebersihan hati (*qalbun salim*).',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Jangkung (Saridin) di Landoh Kayen Pati umumnya bertawassul memohon kepada Allah SWT kejujuran dan kebersihan hati (*tawadhu’*), kelancaran usaha pertanian dan peternakan rakyat, serta jalan keluar dari ketidakadilan atau fitnah sosial.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Panembahan Syekh Jangkung / Saridin (Landoh Kayen Pati)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ جَانْغكُونْغ (سَارِيدِينْ) لَانْدُوهْ كَايِينْ فَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ جَانْغكُونْغ (سَارِيدِينْ) لَانْدُوهْ كَايِينْ فَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh Jangkung (Saridin) Landoh Kayen Pati syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi asraarihii wa karaamaatihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Jangkung (Saridin) Landoh Kayen Pati, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Jangkung (Saridin) Landoh Kayen Pati, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15 Rajab (Puncak Haul Akbar & Buka Luwur Panembahan Syekh Jangkung di Dusun Landoh, Desa Kayen, Kecamatan Kayen, Kabupaten Pati).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi pendopo dan cungkup maqbarah Syekh Jangkung, serta mengikuti arahan pengurus yayasan makam Landoh.',
    facilities: ['Cungkup Utama & Pendopo Maqbarah Syekh Jangkung', 'Masjid Jami’ Syekh Jangkung Landoh', 'Museum Kecil & Petilasan Kebo Landoh', 'Terminal Parkir Bus Wisata Religi Kayen Pati'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Rinkes, D.A. (1911). De Heiligen van Java. Batavia: Albrecht & Co.',
      'Pemerintah Kabupaten Pati — Monografi Sejarah dan Cagar Budaya Makam Syekh Jangkung Landoh Kayen.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-mutamakkin-kajen',
    legacyId: 'ulama-11',
    name: 'Makam Syekh Ahmad Mutamakkin (Kajen, Margoyoso, Pati)',
    title: 'Waliyullah Sufi Abad ke-18, Guru Spiritual Paku Buwono II & Leluhur Ulama Kajen–Tebuireng',
    description:
      'Kompleks Masjid Jami’ dan Maqbarah Syekh Ahmad Mutamakkin (1645–1740 M) di Desa Kajen, Kecamatan Margoyoso, Kabupaten Pati—ulama besar pemegang sanad tarekat Haramain dan leluhur puluhan kiai besar Nusantara.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 – Abad ke-18 M (1645–1740 M)',
    province: 'Jawa Tengah',
    city: 'Pati',
    district: 'Kec. Margoyoso',
    address: 'Desa Kajen, Kec. Margoyoso, Kabupaten Pati',
    location: {
      lat: -6.6152,
      lng: 111.0418,
      address: 'Desa Kajen, Kec. Margoyoso, Kabupaten Pati',
      district: 'Kec. Margoyoso',
      city: 'Pati',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Kajen Pati (Kompleks Masjid & Maqbarah Syekh Ahmad Mutamakkin)',
    sanad:
      'Cicit Sultan Hadiwijaya (Jaka Tingkir, Sultan Pajang) dan Pangeran Benawa; berguru ilmu tafsir, hadis, dan Thariqah Naqsyabandiyah-Syathariyah di Yaman dan Haramain kepada Syaikh Muhammad Zain Al-Mizjaji (Yaman) serta jaringan murid Syaikh Ibrahim Al-Kurani.',
    karya: [
      'Naskah tasawuf dan akidah ’Arsyul Muwahhidin (Teks Kajen)',
      'Pembangunan Masjid Kuno Kajen dengan mimbar kayu ukir simbolik tahun 1705 M',
      'Perintisan Desa Santri Kajen (Margoyoso, Pati) yang melahirkan ratusan pesantren dan ulama besar seperti KH. Bisri Syansuri, KH. Mahfudz Salam, dan KH. Sahal Mahfudh',
    ],
    history:
      '**Syekh Ahmad Mutamakkin** (hidup sekitar 1645–1740 M) adalah ulama sufi dan *waliyullah* besar pada masa Kasunanan Kartasura (abad ke-18 M) yang menjadi mata rantai penting jaringan intelektual ulama Haramain–Nusantara sekaligus leluhur genealogis para kiai besar Pulau Jawa. Lahir dengan nama **Raden Sumohadiwijoyo** (cicit Sultan Hadiwijaya / Jaka Tingkir dari jalur Pangeran Benawa), beliau mengembara menuntut ilmu agama hingga ke Timur Tengah (Zabid di Yaman, Makkah, dan Madinah) serta berguru kepada ulama hadis dan mursyid tarekat terkemuka, **Syaikh Muhammad Zain bin Faqih Jalaluddin Al-Mizjaji Al-Yamani**.\n\nSekembalinya ke tanah Jawa, kapal yang ditumpangi beliau mendarat di pesisir utara Pati (kawasan Bulumanis/Cebolek) sebelum akhirnya beliau menetap dan mendirikan masjid serta pusat pendidikan Islam di **Desa Kajen, Kecamatan Margoyoso, Kabupaten Pati**. Nama beliau diabadikan dalam karya sastra klasik Jawa yang sangat terkenal, **Serat Cebolek** (karya Yasadipura I), yang mengisahkan perdebatan teologis mengenai batas syariat dan hakikat pada masa pemerintahan **Sri Susuhunan Pakubuwono II** (memerintah 1726–1749 M). Berbeda dengan bias politis keraton dalam *Serat Cebolek*, kajian filologis terhadap manuskrip asli peninggalan Syekh Ahmad Mutamakkin di Kajen (yang diteliti oleh Dr. Zainul Milal Bizawie) membuktikan bahwa beliau adalah ulama *Ahlussunnah wal Jama’ah* yang sangat alim dalam fikih dan tasawuf.\n\nDoa dan riyadhah Syekh Ahmad Mutamakkin agar Desa Kajen kelak menjadi *"kampung ilmu dan penghafal Al-Qur’an"* terkabul secara nyata: dari sulbi keturunan beliau lahir deretan ulama besar dan Pahlawan Nasional Indonesia, di antaranya **KH. Nawawi Kajen**, **KH. Siroj Kajen**, **KH. Abdussalam (Mbah Shoichah Tambakberas)**, **Hadratussyaikh KH. Hasyim Asy’ari (Tebuireng)**, **KH. Bisri Syansuri (Denanyar)**, **KH. Abdullah Salam**, hingga Rais Aam PBNU & Ketua Umum MUI **KH. Muhammad Ahmad Sahal Mahfudh (Kajen)**. Syekh Ahmad Mutamakkin wafat sekitar tahun 1740 M dan dimakamkan di Kompleks Maqbarah Barat Masjid Jami’ Kajen, Kecamatan Margoyoso, Kabupaten Pati.',
    karomah: [
      'Dalam kitab manaqib *Syekh Ahmad Mutamakkin* dan tradisi lisan pesantren Kajen, karomah paling agung dari beliau adalah makbulnya doa beliau bagi tanah Kajen dan anak-cucu keturunannya: Desa Kajen yang dulunya rawa dan hutan di pesisir Margoyoso Pati kini berdiri lebih dari 40 pondok pesantren dalam satu desa dengan puluhan ribu santri, tanpa satu pun tempat hiburan maksiat.<!--more-->\n\nDi dalam Masjid Jami’ Kajen masih tersimpan ukiran kayu kuno peninggalan langsung tangan Syekh Ahmad Mutamakkin pada mimbar dan papan masjid yang memuat simbol filosofis *Bulan Sabit, Ikan Todhak, dan Burung Bangau* sebagai wasiat agar para santri dan ulama senantiasa menjaga keseimbangan ilmu syariat dan hakikat serta berhati-hati memilih makanan yang halal.',
    ],
    untoldStory:
      'Kajian filologi mutakhir atas naskah tangan Syekh Ahmad Mutamakkin (seperti naskah *’Arsyul Muwahhidin* dan catatan sanad keluarga Kajen) telah meluruskan distorsi sejarah dalam *Serat Cebolek*, menunjukkan bahwa Syekh Ahmad Mutamakkin justru diangkat sebagai guru ruhani yang sangat dihormati di lingkungan Kasunanan Kartasura.<!--more-->\n\nSetiap tanggal **10 Muharram (Asyura)**, Desa Kajen berubah menjadi lautan manusia selama sepekan penuh dalam acara **Haul Akbar Syekh Ahmad Mutamakkin** dan tradisi buka luwur yang dihadiri ratusan ribu peziarah dan alumni pesantren Kajen.',
    barokahHajat:
      'Peziarah, santri, dan orang tua yang berziarah ke maqbarah Syekh Ahmad Mutamakkin di Kajen Margoyoso Pati umumnya bertawassul memohon kepada Allah SWT kemantapan tempat berpijak dalam ilmu dan iman (*Mutamakkin*), dikaruniai keturunan penghafal Al-Qur’an dan ahli fikih, serta keberkahan menuntut ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Ahmad Mutamakkin & Masyayikh Kajen (Margoyoso Pati)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ أَحْمَدْ مُتَمَكِّنْ وَالشَّيْخِ عَبْدِ اللهِ سَلَامْ وَالشَّيْخِ مُحَمَّدْ أَحْمَدْ سَهْلْ مَحْفُوظْ كَاجِينْ فَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ مَكِّنَّا فِي الدِّينِ وَالْعِلْمِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ أَحْمَدْ مُتَمَكِّنْ وَالشَّيْخِ عَبْدِ اللهِ سَلَامْ وَالشَّيْخِ مُحَمَّدْ أَحْمَدْ سَهْلْ مَحْفُوظْ كَاجِينْ فَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ مَكِّنَّا فِي الدِّينِ وَالْعِلْمِ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh Ahmad Mutamakkin wasy-Syaikh 'Abdillaah Salaam wasy-Syaikh Muhammad Ahmad Sahal Mahfuudh Kajen Pati syai-un lillaahi lahumul-Faatihah. Allaahumma makkinnaa fid-diini wal-'ilmi wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Ahmad Mutamakkin, KH. Abdullah Salam, dan KH. MA. Sahal Mahfudh Kajen Pati, Al-Fatihah. Ya Allah, kokohkanlah kedudukan kami dalam agama dan ilmu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Ahmad Mutamakkin, KH. Abdullah Salam, dan KH. MA. Sahal Mahfudh Kajen Pati, Al-Fatihah. Ya Allah, kokohkanlah kedudukan kami dalam agama dan ilmu, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Muharram / Hari Asyura (Puncak Haul Akbar & Buka Luwur Syekh Ahmad Mutamakkin di Desa Kajen, Kecamatan Margoyoso, Kabupaten Pati).',
    localAdab:
      'Wajib mengenakan busana muslim santri yang sopan dan menutup aurat, menjaga ketenangan ratusan asrama pesantren di sepanjang gang Desa Kajen, serta mengikuti tata tertib pengurus Pesarean Syekh Ahmad Mutamakkin.',
    facilities: ['Cungkup Utama Pesarean Syekh Ahmad Mutamakkin', 'Masjid Jami’ Kajen (Mimbar Kuno 1705 M)', 'Maqbarah KH. Abdullah Salam & KH. MA. Sahal Mahfudh', 'Terminal Parkir Bus Wisata Religi Kajen Margoyoso Pati'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Bizawie, Zainul Milal (2002). Perlawanan Kultural Agama Rakyat: Pemikiran dan Paham Keagamaan Syekh Ahmad al-Mutamakkin dalam Pergumulan Islam dan Tradisi (1645–1740). Yogyakarta: Samha.',
      'Soebardi, S. (1975). The Book of Cabolek. The Hague: Martinus Nijhoff / KITLV.',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII & XVIII. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'ratu-kalinyamat-jepara',
    name: 'Makam Ratu Kalinyamat & Sultan Hadlirin (Mantingan, Tahunan, Jepara)',
    title: 'Pahlawan Nasional Penguasa Maritim Jepara, Pelopor Seni Ukir & Pembangun Masjid Astana Mantingan (1559 M)',
    description:
      'Kompleks Cagar Budaya Nasional Masjid dan Makam Astana Sultan Hadlirin serta Pahlawan Nasional Ratu Kalinyamat (Retno Kencono, wafat ~1579 M) di Desa Mantingan, Kecamatan Tahunan, Kabupaten Jepara.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (Memerintah 1549–1579 M)',
    province: 'Jawa Tengah',
    city: 'Jepara',
    district: 'Kec. Tahunan',
    address: 'Kompleks Masjid Astana Sultan Hadlirin, Desa Mantingan, Kec. Tahunan, Kabupaten Jepara',
    location: {
      lat: -6.6186,
      lng: 110.6682,
      address: 'Kompleks Masjid Astana Sultan Hadlirin, Desa Mantingan, Kec. Tahunan, Kabupaten Jepara',
      district: 'Kec. Tahunan',
      city: 'Jepara',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Nasional Masjid & Makam Astana Mantingan (Ratu Kalinyamat & Sultan Hadlirin) Jepara',
    sanad:
      'Ratu Kalinyamat (Retno Kencono) adalah putri Sultan Trenggono dan cucu Sultan Raden Patah (Kesultanan Demak Bintoro); permaisuri dari Sultan Hadlirin (Pangeran Toyib / ulama-saudagar asal Aceh yang juga pernah bermukim di Tiongkok dengan ayah angkat Tjie Hwio Gwan / Sungging Badarante).',
    karya: [
      'Pembangunan Masjid dan Makam Astana Mantingan pada tahun 1481 Saka / 1559 M (Candrasengkala: Rupa Brahmana Warna Sari)',
      'Peletakan dasar industri seni ukir batu pualam dan kayu Jepara bersama patih Tjie Hwio Gwan (Sungging Badarante)',
      'Pengiriman dua ekspedisi armada laut besar Jepara (1551 M dan 1574 M dengan 300 kapal & 15.000 prajurit) membantu Kesultanan Johor dan Aceh mengusir Portugis di Malaka',
    ],
    history:
      '**Ratu Kalinyamat**—yang memiliki nama asli **Retno Kencono** (wafat sekitar tahun 1579 M)—adalah putri dari Sultan Demak ketiga, **Sultan Trenggono**, dan cucu dari pendiri Kesultanan Demak, **Raden Patah**. Beliau menikah dengan seorang bangsawan dan ulama-pelaut asal Kesultanan Aceh Darussalam bernama **Pangeran Toyib** yang setelah dinobatkan memimpin Kadipaten Kalinyamat/Jepara bergelar **Sultan Hadlirin**. Bersama ayah angkat Sultan Hadlirin yang merupakan ahli pahat asal Tiongkok bernama **Tjie Hwio Gwan (Sungging Badarante)**, pasangan ini membangun pusat pemerintahan dan seni budaya Islam di Jepara.\n\nPada tahun 1549 M, terjadi tragedi berdarah konflik suksesi Kesultanan Demak di mana Sultan Hadlirin wafat dibunuh oleh utusan Arya Penangsang setelah pulang mengadu kepada Sunan Kudus. Atas duka mendalam dan tekad menuntut keadilan hukum (*qishash*), Ratu Kalinyamat melakukan riyadhah uzlah (*tapa wuda sinjang rambut*—bertapa menanggalkan seluruh perhiasan kerajaan di Bukit Donorojo) dan mendirikan **Masjid serta Maqbarah Astana Mantingan** untuk makam suaminya tercinta. Di atas mihrab Masjid Mantingan terpahat prasasti *candrasengkala* berbahasa Jawa Kuno: **"Rupa Brahmana Warna Sari"** yang bernilai angka tahun **1481 Saka (1559 Masehi)**.\n\nSelama tiga dekade memimpin Jepara seorang diri (1549–1579 M), Ratu Kalinyamat membawa Jepara ke puncak kejayaan sebagai kekuatan maritim terkuat di Laut Jawa. Kronik sejarah Portugis karya **Diego do Couto (*Da Ásia*)** menjuluki Ratu Kalinyamat dengan kalimat penuh kekaguman: ***"Rainha de Japara, senhora poderosa e rica, de kranige Dame"*** (*Ratu Jepara, seorang wanita yang kaya raya dan sangat berkuasa, perempuan pemberani*) karena beliau dua kali mengirim ratusan kapal perang membantu Kesultanan Johor (1551) dan Kesultanan Aceh (1574) mengepung benteng Portugis di Malaka. Ratu Kalinyamat wafat sekitar tahun 1579 M dan dimakamkan berdampingan dengan suaminya Sultan Hadlirin di Kompleks Astana Mantingan, Jepara, serta dianugerahi gelar **Pahlawan Nasional Republik Indonesia** pada tahun 2023.',
    karomah: [
      'Dalam tradisi sejarah masyarakat Jepara dan naskah *Babad Tanah Jawi*, keteguhan riyadhah dan kesetiaan Ratu Kalinyamat terhadap suaminya Sultan Hadlirin menjadi teladan kemuliaan perempuan Muslimah Nusantara yang mampu memadukan kedalaman spiritualitas dengan ketangguhan memimpin armada laut internasional.<!--more-->\n\nDinding Masjid dan Cungkup Makam Astana Mantingan (1559 M) dihiasi puluhan panil relief batu putih (*karang*) berukir sulur-suluran daun dan bunga teratai yang menyamarkan bentuk makhluk hidup sesuai kaidah fikih Islam—yang menjadi cikal bakal lahirnya keahlian **Seni Ukir Jepara** yang mendunia hingga hari ini.',
    ],
    untoldStory:
      'Di dalam cungkup utama Astana Mantingan, selain pusara **Sultan Hadlirin** dan **Ratu Kalinyamat**, terdapat pula pusara **Patih Sungging Badarante (Tjie Hwio Gwan)**—tokoh Muslim Tionghoa yang mengajarkan teknik memahat batu dan kayu kepada para pengrajin Jepara pada abad ke-16.<!--more-->\n\nSetiap tanggal **12 Rabiul Awal** dan menjelang Hari Jadi Kabupaten Jepara (**10 April**), diselenggarakan tradisi **Buka Luwur Astana Sultan Hadlirin & Ratu Kalinyamat** di Desa Mantingan, Kecamatan Tahunan, Kabupaten Jepara.',
    barokahHajat:
      'Peziarah, pengrajin ukir/mebel, dan para pemimpin perempuan yang berziarah ke maqbarah Sultan Hadlirin dan Ratu Kalinyamat di Astana Mantingan Jepara umumnya bertawassul memohon kepada Allah SWT kesetiaan dan keharmonisan pasangan suami-istri, ketangguhan dan kemandirian perempuan dalam memimpin usaha, serta keberkahan industri kriya dan perniagaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Hadlirin & Ratu Kalinyamat (Astana Mantingan Jepara)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ حَاضِرِينَ وَزَوْجَتِهِ الْمُجَاهِدَةِ الصَّالِحَةِ رَاتُو كَالِينْيَامَاتْ (رَتْنُو كَنْشُونُو) مَانْتِينْغَانْ جَفَارَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ حَاضِرِينَ وَزَوْجَتِهِ الْمُجَاهِدَةِ الصَّالِحَةِ رَاتُو كَالِينْيَامَاتْ (رَتْنُو كَنْشُونُو) مَانْتِينْغَانْ جَفَارَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Haadhiriin wa zaujatihil-Mujaahidatish-Shaalihah Ratu Kalinyamat (Retno Kencono) Mantingan Jepara syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Hadlirin dan permaisurinya pejuang yang salihah Ratu Kalinyamat (Retno Kencono) Mantingan Jepara, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Hadlirin dan permaisurinya pejuang yang salihah Ratu Kalinyamat (Retno Kencono) Mantingan Jepara, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal & 10 April (Puncak Haul Agung, Buka Luwur Astana Sultan Hadlirin & Kirab Hari Jadi Jepara di Desa Mantingan, Kecamatan Tahunan, Kabupaten Jepara).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki pelataran Masjid dan Cungkup Astana Mantingan, serta dilarang menyentuh atau menggores panil relief batu ukir kuno abad ke-16 pada dinding masjid.',
    facilities: ['Masjid Kuno Astana Sultan Hadlirin Mantingan (1559 M)', 'Cungkup Maqbarah Sultan Hadlirin & Ratu Kalinyamat', 'Sentra Pameran Mebel & Ukir Kayu Mantingan', 'Area Parkir Bus Wisata Religi Mantingan Tahunan Jepara'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Couto, Diego do (1602). Da Ásia (Década VIII). Lisboa.',
      'Hayati, Chusnul dkk. (2000). Ratu Kalinyamat: Biografi Tokoh Perempuan Maritim Nusantara Abad ke-16. Semarang: UNDIP.',
      'Tjandrasasmita, Uka (2009). Arkeologi Islam Nusantara (Kajian Panil Hias Masjid Mantingan Jepara). Jakarta: KPG.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-ahmad-sapuro',
    legacyId: 'habib-7',
    name: 'Makam Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas (Sapuro, Kota Pekalongan)',
    title: 'Waliyullah Quthub Penjaga Kota Santri Pekalongan & Ulama Agung Marga Al-Attas',
    description:
      'Kompleks Kubah Maqbarah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas (1839–1929 M) di Pemakaman Islam Kelurahan Sapuro Kebulen, Kecamatan Pekalongan Barat, Kota Pekalongan—pusat ziarah habaib terbesar di jalur Pantura Jawa Tengah.',
    category: 'Habaib',
    era: 'Abad ke-19 – Awal Abad ke-20 M (1839–1929 M / 1255–1347 H)',
    province: 'Jawa Tengah',
    city: 'Pekalongan',
    district: 'Kec. Pekalongan Barat',
    address: 'Kompleks Pemakaman Islam Sapuro, Jl. Jenderal Sudirman, Kel. Sapuro Kebulen, Kec. Pekalongan Barat, Kota Pekalongan',
    location: {
      lat: -6.8925,
      lng: 109.6642,
      address: 'Kompleks Pemakaman Islam Sapuro, Jl. Jenderal Sudirman, Kel. Sapuro Kebulen, Kec. Pekalongan Barat, Kota Pekalongan',
      district: 'Kec. Pekalongan Barat',
      city: 'Pekalongan',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pantura Jawa Tengah (Kubah Maqbarah Habib Ahmad bin Abdullah bin Thalib Al-Attas Sapuro Pekalongan)',
    sanad:
      'Dzurriyah Rasulullah SAW dari marga Al-Attas (keturunan القطب الأنفاس Al-Habib Umar bin Abdurrahman Al-Attas penyusun Ratib Al-Attas); lahir di Hajren Hadramaut, murid utama Mufti Makkah Sayyid Ahmad Zaini Dahlan, Syaikh Abu Bakar Syatha, dan Habib Fadhl bin Alwi Bafaqih.',
    karya: [
      'Pembinaan dakwah Ahlussunnah wal Jama’ah, majelis Ratib Al-Attas, dan Maulid Simthuddurar di Kota Pekalongan selama lebih dari setengah abad (1878–1929 M)',
      'Pembangunan Madrasah Salafiyah dan Masjid Raudhatul Jannah Kota Pekalongan',
      'Kaderisasi ulama dan habaib di Pekalongan, Tegal, dan Pemalang (termasuk Habib Ali bin Ahmad Al-Attas dan Habib Hasyim bin Umar bin Yahya)',
    ],
    history:
      '**Al-’Arif Billah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas** (1255 H / 1839 M – 24 Rajab 1347 H / 6 Januari 1929 M) lahir di kota Hajren, lembah Hadramaut, Yaman. Sejak usia belia, beliau telah menghafal Al-Qur’an 30 juz dan mendalami ilmu syariat serta tasawuf kepada para ulama di Hadramaut. Beliau kemudian merantau ke Tanah Suci Makkah Al-Mukarramah dan bermukim selama bertahun-tahun untuk berguru langsung kepada Mufti Syafi’iyah Masjidil Haram, **Sayyid Ahmad bin Zaini Dahlan**, hingga dipercaya menjadi pengajar di lingkungan Makkah.\n\nAtas isyarat gurunya Sayyid Ahmad Zaini Dahlan untuk berdakwah ke kepulauan Nusantara, Habib Ahmad berangkat menuju Hindia Belanda sekitar tahun 1878–1880 M dan memilih menetap di **Kota Pekalongan**, Jawa Tengah. Selama hampir setengah abad berdakwah di Pekalongan, Habib Ahmad bin Abdullah bin Thalib Al-Attas menjadi payung ruhani masyarakat Pantura: beliau mendirikan majelis taklim, menghidupkan pengamalan *Ratib Al-Attas* dan *Maulid Nabi*, membimbing para pengusaha batik Pekalongan agar jujur dan gemar bersedekah kepada fakir miskin, serta menjalin hubungan sangat erat dengan ulama pesantren pribumi maupun sesama habaib (seperti Habib Hasyim bin Umar bin Yahya, kakek dari Habib Luthfi bin Yahya).\n\nHabib Ahmad dikenal memiliki akhlak yang sangat mulia, dermawan, tegas dalam menjaga hukum syariat, serta sangat mencintai para penuntut ilmu. Beliau wafat pada malam Ahad, **24 Rajab 1347 H** (bertepatan dengan **6 Januari 1929 M**) dalam usia 90 tahun dan dimakamkan di **Kompleks Kubah Maqbarah Sapuro, Kelurahan Sapuro Kebulen, Kecamatan Pekalongan Barat, Kota Pekalongan**.',
    karomah: [
      'Dalam kitab manaqib *Habib Ahmad bin Abdullah bin Thalib Al-Attas* dan kesaksian para ulama sezaman (termasuk Al-Habib Alwi bin Thahir Al-Haddad Mufti Johor dan Al-Habib Ali bin Abdurrahman Al-Habsyi Kwitang), Habib Ahmad diakui memegang maqam kewalian tertinggi (*Quthb*) di masanya. Banyak riwayat mutawatir masyarakat Pekalongan yang mengisahkan bagaimana doa Habib Ahmad menyelamatkan kapal nelayan dari badai Laut Jawa serta membuka keberkahan perniagaan batik warga Pekalongan.<!--more-->\n\nTercatat pula kisah karomah *kasyaf* Habib Ahmad ketika beliau sedang duduk di serambi rumahnya di Pekalongan lalu tiba-tiba menyiramkan seember air ke udara; beberapa minggu kemudian seorang nakhoda kapal datang bersujud syukur menceritakan bahwa saat kapalnya terbakar di tengah samudra dan ia bertawassul memanggil nama Habib Ahmad, tiba-tiba turun guyuran air yang memadamkan api di atas kapalnya tepat pada jam dan hari tersebut.',
    ],
    untoldStory:
      'Di dalam bangunan Kubah Hijau Maqbarah Sapuro Pekalongan yang sangat megah dan sejuk, pusara **Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas** berdampingan dengan pusara putra-putra beliau (**Al-Habib Ali bin Ahmad Al-Attas** dan **Al-Habib Muhammad bin Ahmad Al-Attas**) serta ulama besar **Al-Habib Hasyim bin Umar bin Thaha bin Yahya** (kakek kandung Maulana Habib Luthfi bin Yahya Pekalongan).<!--more-->\n\nKarena letak Kompleks Makam Sapuro berada tepat di pinggir jalur utama Pantura (Jalan Jenderal Sudirman Kota Pekalongan), hampir seluruh bus rombongan Ziarah Wali Songo yang melintas dari Jawa Barat menuju Jawa Tengah dan Jawa Timur selalu berhenti berziarah di Maqbarah Sapuro.',
    barokahHajat:
      'Peziarah dan para pedagang yang berziarah ke maqbarah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas di Sapuro Pekalongan umumnya bertawassul memohon kepada Allah SWT syafaat kecintaan kepada Dzurriyah Rasulullah SAW, keberkahan usaha perniagaan dan industri tekstil/batik, serta penjagaan keluarga melalui wasilah *Ratib Al-Attas*.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas (Sapuro Pekalongan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْكَامِلِ وَالْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ عَبْدِ اللهِ بْنِ طَالِبٍ الْعَطَّاسِ وَأَبْنَائِهِ صَفُورُو فِيكَالُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِأَسْرَارِهِمْ وَأَنْوَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْكَامِلِ وَالْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ عَبْدِ اللهِ بْنِ طَالِبٍ الْعَطَّاسِ وَأَبْنَائِهِ صَفُورُو فِيكَالُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِأَسْرَارِهِمْ وَأَنْوَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbil-Kaamil wal-'Aarifi billaah al-Habiib Ahmad bin 'Abdillaah bin Thaalib al-'Aththaas wa abnaa-ihii Sapuro Pekalongan syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi asraarihim wa anwaarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub yang kamil dan arif billah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas beserta putra-putra beliau di Sapuro Pekalongan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui rahasia hikmah, cahaya, dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub yang kamil dan arif billah Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas beserta putra-putra beliau di Sapuro Pekalongan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui rahasia hikmah, cahaya, dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '14–15 Sya’ban / Malam Nisfu Sya’ban (Puncak Haul Akbar Tahunan Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas di Kompleks Kubah Maqbarah Sapuro, Kota Pekalongan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (dianjurkan berbusana putih), memisahkan shaf peziarah laki-laki dan perempuan di dalam Kubah Maqbarah Sapuro, serta menjaga ketenangan saat pembacaan *Ratib Al-Attas* dan *Yasin*.',
    facilities: ['Kubah Agung Maqbarah Habib Ahmad bin Abdullah bin Thalib Al-Attas', 'Masjid & Mushalla Kompleks Sapuro', 'Sentra Oleh-Oleh Batik & Kuliner Khas Pekalongan', 'Terminal Parkir Bus Wisata Religi Sapuro Jl. Jenderal Sudirman'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait min Bani Alawi. Jeddah: Alamul Ma’rifah.',
      'Assegaf, Muhammad bin Ahmad (1999). Manaqib Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas Pekalongan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 3. SEMARANG, KLATEN (BAYAT), KENDAL, MAGELANG, TEMANGGUNG, WONOSOBO & BANYUMAS
  // =========================================================================
  {
    id: 'ki-ageng-pandanaran-semarang',
    name: 'Makam Ki Ageng Pandanaran I / Pangeran Made Pandan (Mugassari, Kota Semarang)',
    title: 'Pendiri & Bupati Pertama Kota Semarang (1476 M) serta Penyebar Islam Perbukitan Pragota',
    description:
      'Kompleks Cagar Budaya Makam Ki Ageng Pandanaran I (Pangeran Made Pandan, wafat ~1500-an M) di perbukitan Jalan Mugas Dalam II, Kelurahan Mugassari, Kecamatan Semarang Selatan, Kota Semarang—pendiri Kota Semarang dan ayahanda Sunan Pandanaran II (Bayat).',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Awal Abad ke-16 M (Pendirian Semarang 2 Mei 1476 M)',
    province: 'Jawa Tengah',
    city: 'Semarang',
    district: 'Kec. Semarang Selatan',
    address: 'Jl. Mugas Dalam II No. 4, Kel. Mugassari, Kec. Semarang Selatan, Kota Semarang',
    location: {
      lat: -6.9922,
      lng: 110.4153,
      address: 'Jl. Mugas Dalam II No. 4, Kel. Mugassari, Kec. Semarang Selatan, Kota Semarang',
      district: 'Kec. Semarang Selatan',
      city: 'Semarang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Makam Ki Ageng Pandanaran I Mugassari Kota Semarang',
    sanad:
      'Putra Sultan Demak kedua (Pangeran Sabrang Lor / Adipati Unus) atau kerabat bangsawan Kesultanan Demak Bintoro yang berguru kepada Sunan Bonang dan Sunan Kalijaga; ayahanda dari Ki Ageng Pandanaran II (Sunan Pandanaran / Sunan Tembayat di Klaten).',
    karya: [
      'Pembukaan pusat dakwah dan pemerintahan Islam di Pulau Tirang / Pragota yang melahirkan Kota Semarang (2 Mei 1476 M)',
      'Pengislaman para ajar dan resi di perbukitan Bergota–Pulau Tirang secara damai',
      'Peletakan tata pemerintahan Kadipaten Semarang di kawasan Bubakan / Kanjengan',
    ],
    history:
      'Dalam historiografi Jawa Tengah (*Babad Demak* dan *Amenangi Sejarah Semarang*), terdapat dua tokoh besar bergelar **Ki Ageng Pandanaran** yang merupakan ayah dan anak: **Ki Ageng Pandanaran I (Pangeran Made Pandan)** yang dimakamkan di **Bukit Mugas, Kota Semarang**, dan putranya **Ki Ageng Pandanaran II (Sunan Pandanaran / Sunan Tembayat)** yang dimakamkan di **Bukit Cakaran, Paseban, Bayat, Kabupaten Klaten**.\n\nPada akhir abad ke-15 M, Pangeran Made Pandan (Ki Ageng Pandanaran I) diutus oleh Kesultanan Demak Bintoro menuju arah barat ke sebuah semenanjung subur yang kala itu masih berada di tepi pantai bernama **Pulau Tirang** (kawasan perbukitan Pragota/Bergota dan Mugas). Di tempat tersebut, Ki Ageng Pandanaran I membuka pesantren, surau, dan lahan pertanian. Di sela-sela tanah yang subur itu, tumbuh pohon-pohon **asam yang jarang-jarang** (*Asem Arang*), sehingga Ki Ageng Pandanaran I menamai wilayah baru tersebut **Semarang**—yang secara resmi ditetapkan sebagai cikal bakal berdirinya Kota Semarang pada tanggal **2 Mei 1476 M**.\n\nDengan kebijaksanaan, kesantunan akhlak, dan ilmu hikmah, Ki Ageng Pandanaran I berhasil mengajak para pendeta dan *ajar* di Pulau Tirang (seperti Ajar Sejanila dan Ajar Pramoni) memeluk agama Islam. Menjelang wafatnya pada awal abad ke-16 M, Ki Ageng Pandanaran I berwasiat kepada putranya (Adipati Pandanaran II) agar melanjutkan pemerintahan Semarang dengan adil dan senantiasa mengikuti bimbingan Dewan Wali Songo. Ki Ageng Pandanaran I dimakamkan di puncak bukit **Jalan Mugas Dalam II, Kelurahan Mugassari, Kecamatan Semarang Selatan, Kota Semarang**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Semarang dan *Serat Kandha*, karomah Ki Ageng Pandanaran I tampak ketika beliau berdialog dengan para *ajar* sakti penghuni Pulau Tirang dan perbukitan Pragota; tanpa menumpahkan darah setetes pun, kewibawaan doa beliau meluluhkan hati para petapa tersebut hingga seluruh komunitas Pulau Tirang bersyahadat dan menjadi santri.<!--more-->\n\nHingga hari ini, setiap menjelang peringatan Hari Jadi Kota Semarang (2 Mei) dan bulan Muharram, jajaran Pemerintah Kota Semarang, para habaib, kiai, dan ribuan warga rutin menggelar *Ziarah Agung & Haul Ki Ageng Pandanaran I* di Bukit Mugas.',
    ],
    untoldStory:
      'Memahami perbedaan lokasi antara **Makam Ki Ageng Pandanaran I di Mugassari Semarang** (ayah) dan **Makam Sunan Pandanaran II di Bayat Klaten** (anak) sangat penting bagi para peziarah agar tidak tertukar saat merencanakan rute ziarah Jawa Tengah.<!--more-->\n\nDi Kompleks Makam Ki Ageng Pandanaran I di Mugas Dalam II Semarang (yang terletak di belakang kawasan Tugu Muda / Pandanaran), suasana cungkup dan masjidnya sangat teduh di atas bukit di tengah pusat Kota Semarang.',
    barokahHajat:
      'Peziarah dan aparatur pemerintahan yang berziarah ke maqbarah Ki Ageng Pandanaran I di Mugassari Kota Semarang umumnya bertawassul memohon kepada Allah SWT keberkahan dalam merintis usaha atau wilayah baru, kebijaksanaan kepemimpinan yang mengayomi masyarakat, serta keselamatan keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Ki Ageng Pandanaran I (Pangeran Made Pandan Mugassari Semarang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الدَّاعِي إِلَى اللهِ كِيَاهِي أَغِينْغ فَانْدَانْ أَرَانْ الْأَوَّلِ (فَانْغِيرَانْ مَادِي فَانْدَانْ) مُوغَاسَّارِي سَمَارَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الدَّاعِي إِلَى اللهِ كِيَاهِي أَغِينْغ فَانْدَانْ أَرَانْ الْأَوَّلِ (فَانْغِيرَانْ مَادِي فَانْدَانْ) مُوغَاسَّارِي سَمَارَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Amiirid-Daa'ii ilallaah Kiyaahii Ageng Pandanaran al-Awwal (Pangeran Made Pandan) Mugassari Semarang syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pendakwah di jalan Allah Ki Ageng Pandanaran I (Pangeran Made Pandan) Mugassari Semarang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pendakwah di jalan Allah Ki Ageng Pandanaran I (Pangeran Made Pandan) Mugassari Semarang, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Suro & Menjelang 2 Mei (Puncak Haul Akbar Ki Ageng Pandanaran I & Ziarah Hari Jadi Kota Semarang di Bukit Mugas, Kelurahan Mugassari, Kecamatan Semarang Selatan, Kota Semarang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat menaiki tangga menuju serambi masjid dan cungkup utama makam Ki Ageng Pandanaran I, serta menjaga ketertiban parkir di gang Mugas Dalam II.',
    facilities: ['Cungkup Utama Makam Ki Ageng Pandanaran I', 'Masjid Makam Ki Ageng Pandanaran Mugas', 'Pendopo Peziarah Bukit Mugas', 'Area Parkir Peziarah Jl. Mugas Dalam II Semarang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Budiman, Amen (1978). Semarang Riwayatmu Dulu. Semarang: Tanjung Sari.',
      'De Graaf, H.J. & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa. Jakarta: Grafiti Pers.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-pandanaran-bayat',
    legacyId: 'auliya-5',
    name: 'Makam Sunan Pandanaran II / Sunan Tembayat (Paseban, Bayat, Klaten)',
    title: 'Adipati Semarang yang Menanggalkan Tahta Demi Jalan Tasawuf di Bawah Bimbingan Sunan Kalijaga',
    description:
      'Kompleks Cagar Budaya Nasional Makam Sunan Pandanaran (Sunan Tembayat / Pangeran Mangkubumi, wafat ~1530-an M) di puncak Bukit Cakaran, Desa Paseban, Kecamatan Bayat, Kabupaten Klaten—mahakarya arsitektur gapura batu masa awal Mataram.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (Inskripsi Gapura Segara Muncar 1555 Saka / 1633 M)',
    province: 'Jawa Tengah',
    city: 'Klaten',
    district: 'Kec. Bayat',
    address: 'Bukit Cakaran, Desa Paseban, Kec. Bayat, Kabupaten Klaten',
    location: {
      lat: -7.7819,
      lng: 110.6382,
      address: 'Bukit Cakaran, Desa Paseban, Kec. Bayat, Kabupaten Klaten',
      district: 'Kec. Bayat',
      city: 'Klaten',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Nasional Kompleks Makam Sunan Pandanaran (Sunan Tembayat) Bayat Klaten',
    sanad:
      'Putra Ki Ageng Pandanaran I (Bupati Pertama Semarang); murid kesayangan Sunan Kalijaga (Raden Mas Said) yang menerima ijazah ilmu hakikat di Gunung Jabalkat, Tembayat; guru dari Syekh Domba (Sambang Dalan) dan Syekh Kewel.',
    karya: [
      'Penyebaran dakwah Islam di wilayah pedalaman Jawa Tengah bagian selatan (Klaten, Pajang, Mataram, dan Gunungkidul) pada abad ke-16 M',
      'Pembangunan Masjid Gala di puncak Bukit Jabalkat dan tradisi Apeman / Sadranan Tembayat',
      'Keteladanan hijrah ruhani dari kemewahan jabatan duniawi menuju kezuhudan total (*zuhud*)',
    ],
    history:
      '**Sunan Pandanaran II**—yang sangat dimuliakan dengan gelar **Sunan Tembayat** atau **Sunan Bayat** (abad ke-16 M)—adalah putra dari Ki Ageng Pandanaran I dan menggantikan ayahandanya sebagai Adipati Kedua Semarang. Dalam naskah klasik *Babad Tanah Jawi* dan *Serat Pandanaran*, dikisahkan bahwa di tengah kemakmuran pelabuhan Semarang, Adipati Pandanaran II sempat terlena mengumpulkan harta kekayaan duniawi dan melalaikan pemeliharaan pesantren peninggalan ayahnya. Melihat hal tersebut, **Sunan Kalijaga** datang menyamar sebagai tukang rumput miskin yang menjual rumput kepada sang Adipati.\n\nKetika Sunan Kalijaga mencangkul bongkahan tanah di halaman kadipaten dan mengubahnya menjadi emas murni di hadapan mata Adipati Pandanaran seraya menegur bahwa kemuliaan sejati bukan pada tumpukan emas melainkan pada kebersihan kalbu di hadapan Allah SWT, hati Adipati Pandanaran II tersentak hebat dan menangis bertobat. Beliau memutuskan menanggalkan jabatan Bupati Semarang, menyerahkan hartanya kepada fakir miskin, dan berjalan kaki bersama istrinya (**Nyai Ageng Kaliwungu**) menyusul Sunan Kalijaga ke arah selatan menuju **Perbukitan Jabalkat di Tembayat (Kecamatan Bayat, Kabupaten Klaten)**.\n\nSelama perjalanan penuh ujian dari Semarang menuju Klaten (yang melahirkan nama tempat seperti *Salatiga* dan *Boyolali*), beliau juga berhasil mengislamkan dua kepala perampok sakti yang kemudian menjadi murid setianya, yakni **Syekh Domba** dan **Syekh Kewel**. Di Tembayat, Sunan Pandanaran mendirikan pesantren dan **Masjid Gala** di puncak Bukit Jabalkat serta mengislamkan masyarakat pedalaman Jawa bagian selatan hingga wafat pada pertengahan abad ke-16 M. Pada tahun **1555 Saka (1633 M)**, Raja Mataram **Sultan Agung Hanyakrakusuma** memugar secara besar-besaran Kompleks Makam Sunan Pandanaran di Bukit Cakaran, Desa Paseban, Bayat, Klaten dengan membangun rentetan gapura batu andesit putih (*Gapura Segara Muncar* dan *Gapura Panemut*) yang menjadi mahakarya Cagar Budaya Nasional.',
    karomah: [
      'Dalam naskah *Serat Babad Tembayat* dan penelitian filolog Belanda D.A. Rinkes (*De Maqam van Pangeran Pandan Arang te Tembajat*), karomah Sunan Pandanaran II yang paling masyhur adalah ketika **Masjid Gala** yang beliau dirikan di puncak Bukit Jabalkat dapat dipindahkan secara utuh ke kaki bukit (Desa Gala/Paseban) untuk memudahkan masyarakat lanjut usia melaksanakan shalat berjamaah, serta panggilan azan beliau yang terdengar hingga ke Demak Bintoro.<!--more-->\n\nKesetiaan murid beliau, **Syekh Domba** (mantan pembegal berwajah menyerupai domba yang bertobat dan mengangkut air wudhu dari lembah ke puncak Bukit Jabalkat menggunakan keranjang bambu berlubang hingga wajahnya kembali rupawan saat wafat), menjadi simbol abadi karomah bimbingan ruhani Sunan Pandanaran.',
    ],
    untoldStory:
      'Kompleks Makam Sunan Pandanaran di Bukit Cakaran, Desa Paseban, Kecamatan Bayat, Klaten memiliki tata ruang arsitektur sakral yang sangat menakjubkan: peziarah menaiki ratusan anak tangga melewati delapan halaman berjenjang yang dipisahkan oleh gapura-gapura *Paduraksa* dan *Candi Bentar* berinskripsi angka tahun 1555 Saka (1633 M) masa Sultan Agung Mataram.<!--more-->\n\nDi halaman cungkup dalam, pusara Sunan Pandanaran didampingi oleh makam permaisuri-permaisuri beliau (**Nyai Ageng Kaliwungu** dan **Nyai Ageng Krakitan**) serta para murid utamanya (**Pawukon**, **Syekh Kewel**, dan **Syekh Domba** di bukit sebelah).',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Pandanaran II (Sunan Tembayat) di Bayat Klaten umumnya bertawassul memohon kepada Allah SWT hidayah taubat dari cinta dunia yang berlebihan, keteguhan hati dalam meniti jalan hijrah menuju keridhaan Allah, serta kemuliaan derajat dunia dan akhirat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Pandanaran II / Sunan Tembayat (Bayat Klaten)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الزَّاهِدِ سَيِّدِنَا الشَّيْخِ فَانْغِيرَانْ مَانْغكُوبُومِي الْمَعْرُوفِ بِسُونَانْ فَانْدَانْ أَرَانْ تِمْبَايَاتْ كَلَاتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ طَهِّرْ قُلُوبَنَا مِنْ حُبِّ الدُّنْيَا وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الزَّاهِدِ سَيِّدِنَا الشَّيْخِ فَانْغِيرَانْ مَانْغكُوبُومِي الْمَعْرُوفِ بِسُونَانْ فَانْدَانْ أَرَانْ تِمْبَايَاتْ كَلَاتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ طَهِّرْ قُلُوبَنَا مِنْ حُبِّ الدُّنْيَا وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyiz-Zaahid Sayyidinaa asy-Syaikh Pangeran Mangkubumi al-ma'ruufi bi Sunan Pandanaran Tembayat Klaten syai-un lillaahi lahumul-Faatihah. Allaahumma thahhir quluubanaa min hubbid-dun-yaa wanfa'naa bi barakaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang zuhud penghulu kami Pangeran Mangkubumi (Sunan Pandanaran Tembayat Klaten), Al-Fatihah. Ya Allah, sucikanlah hati kami dari cinta dunia yang melalaikan, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang zuhud penghulu kami Pangeran Mangkubumi (Sunan Pandanaran Tembayat Klaten), Al-Fatihah. Ya Allah, sucikanlah hati kami dari cinta dunia yang melalaikan, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '27 Ramadhan / Malam Lailatul Qadar & Bulan Sya’ban (Puncak Haul Agung & Tradisi Sadranan Sunan Pandanaran di Bukit Cakaran, Desa Paseban, Kecamatan Bayat, Kabupaten Klaten).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (pengelola menyediakan kain jarik/selendang adat bagi peziarah di pos registrasi), melepas alas kaki saat memasuki gapura halaman inti, serta menjaga kelestarian struktur batu Cagar Budaya Nasional.',
    facilities: ['Kompleks Gapura Kuno & Cungkup Sunan Pandanaran (Cagar Budaya Nasional 1633 M)', 'Masjid Agung Sunan Pandanaran Paseban', 'Bangsal Pengulon & Pendopo Peziarah', 'Terminal Parkir Bus Wisata Religi Paseban Bayat Klaten'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Rinkes, D.A. (1911). "De Maqam van Pangeran Pandan Arang te Tembajat", Tijdschrift voor Indische Taal-, Land- en Volkenkunde (TBG), Deel 53.',
      'De Graaf, H.J. (1987). Awal Kebangkitan Mataram: Masa Pemerintahan Senapati. Jakarta: Grafiti Pers.',
      'BPCB Jawa Tengah — Monografi Cagar Budaya Kompleks Makam Sunan Pandanaran Bayat Klaten.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-sholeh-darat-semarang',
    legacyId: 'ulama-13',
    name: 'Makam KH. Muhammad Sholeh Darat As-Samarani (Bergota, Kota Semarang)',
    title: 'Maha Guru Pendiri NU & Muhammadiyah, Pelopor Tafsir Al-Qur’an Aksara Pegon Jawa (Faidhur Rahman)',
    description:
      'Maqbarah Al-’Allamah KH. Muhammad Sholeh bin Umar As-Samarani / Mbah Sholeh Darat (1820–1903 M) di TPU Bergota, Kelurahan Randusari, Kecamatan Semarang Selatan, Kota Semarang—guru dari KH. Hasyim Asy’ari, KH. Ahmad Dahlan, dan RA. Kartini.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-20 M (1820–1903 M / 1235–1321 H)',
    province: 'Jawa Tengah',
    city: 'Semarang',
    district: 'Kec. Semarang Selatan',
    address: 'Kompleks Pemakaman Umum Bergota, Jl. Kyai Saleh, Kel. Randusari, Kec. Semarang Selatan, Kota Semarang',
    location: {
      lat: -6.9935,
      lng: 110.4086,
      address: 'Kompleks Pemakaman Umum Bergota, Jl. Kyai Saleh, Kel. Randusari, Kec. Semarang Selatan, Kota Semarang',
      district: 'Kec. Semarang Selatan',
      city: 'Semarang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Nusantara (Cungkup Maqbarah KH. Sholeh Darat di Pemakaman Bergota Kota Semarang)',
    sanad:
      'Putra Kiai Umar (ulama pejuang Perang Diponegoro asal Kedung Cumpleng Jepara); berguru di Jawa kepada KH. M. Syahid Waturoyo, KH. Raden Muhammad Shaleh Asnawi Kudus, dan Kiai Abu Abdillah Muhammad Al-Hadi Girikusumo, lalu bermukim lama di Makkah berguru kepada Sayyid Ahmad Zaini Dahlan, Syaikh Muhammad Al-Muqri, dan Syaikh Ibrahim Al-Baijuri.',
    karya: [
      'Kitab Tafsir Faidhur Rahman fi Tarjamati Tafsir Kalam Malikid Dayyan (1894 M) — tafsir Al-Qur’an berbahasa Jawa Pegon bercorak isyari pertama di Nusantara yang dihadiahkan kepada RA. Kartini',
      'Lebih dari 14 kitab Pegon Jawa yang dicetak di Singapura dan Bombay: Majmu’at asy-Syari’at al-Kafiyat lil ’Awam, Munjiyat (saduran Ihya Ulumuddin), Al-Hikam (terjemah Hikam Ibnu Athaillah), Latha’ifut Thaharah, dan Manasik Haji',
      'Maha guru dari Hadratussyaikh KH. Hasyim Asy’ari (pendiri NU), KH. Ahmad Dahlan (pendiri Muhammadiyah), KH. Idris Jamsaren, KH. Dalhar Watucongol, KH. Moenauwir Krapyak, dan RA. Kartini',
    ],
    history:
      '**Al-’Allamah KH. Muhammad Sholeh bin Umar As-Samarani**—yang sangat masyhur dengan sebutan **Mbah Sholeh Darat** (1820 – 18 Desember 1903 M / 28 Ramadhan 1321 H)—lahir di Desa Kedung Cumpleng, Kecamatan Mayong, Kabupaten Jepara. Ayahandanya, Kiai Umar, adalah ulama kepercayaan Pangeran Diponegoro di pesisir utara Jawa bersama Kiai Syada’ dan Kiai Murtadha. Setelah menimba ilmu di berbagai pesantren Jawa Tengah, Mbah Sholeh berangkat ke Makkah bersama ayahnya dan bermukim selama puluhan tahun hingga dipercaya menjadi salah satu pengajar di lingkungan Masjidil Haram bersama sahabatnya, Syaikh Nawawi Al-Bantani dan Syaichona Muhammad Kholil Bangkalan.\n\nSekitar tahun 1870 M, beliau kembali ke tanah Jawa dan mendirikan **Pondok Pesantren Darat** di kawasan pantai utara **Darat, Semarang Barat**. Di pesantren inilah berkumpul para pemuda pilihan yang kelak mengubah wajah sejarah Indonesia abad ke-20: **Raden Mas Darwisy (KH. Ahmad Dahlan, pendiri Muhammadiyah)** dan **Muhammad Hasyim (Hadratussyaikh KH. Hasyim Asy’ari, pendiri Nahdlatul Ulama)** pernah nyantri dan tidur satu kamar di Pesantren Darat Semarang, bersama **KH. Mahfudz At-Tarmasi**, **KH. Idris Jamsaren Solo**, **KH. Sya’ban Semarang**, **KH. Dalhar Watucongol**, dan **KH. Moenauwir Krapyak**.\n\nJasa intelektual Mbah Sholeh Darat yang paling revolusioner adalah keberaniannya menerjemahkan dan menafsirkan Al-Qur’an serta kitab-kitab fikih-tasawuf ke dalam **bahasa Jawa beraksara Arab Pegon** di tengah larangan pemerintah kolonial Belanda menerjemahkan Al-Qur’an. Ketika bangsawan muda Jepara, **Raden Ajeng Kartini**, mengikuti pengajian tafsir Surah Al-Fatihah Mbah Sholeh Darat di pendopo Kabupaten Demak, Kartini sangat tergetar hingga memohon agar Al-Qur’an diterjemahkan agar dapat dipahami maknanya oleh masyarakat Jawa. Mbah Sholeh Darat kemudian menghadiahkan kitab tafsir karyanya, **Faidhur Rahman**, sebagai kado pernikahan RA. Kartini—yang mengilhami semboyan abadi Kartini: *"Minazh-zhulumaati ilan-nuur"* (*Habis Gelap Terbitlah Terang*). Mbah Sholeh Darat wafat pada hari Jumat, **28 Ramadhan 1321 H (18 Desember 1903 M)** dan dimakamkan di **TPU Bergota, Kelurahan Randusari, Kecamatan Semarang Selatan, Kota Semarang**.',
    karomah: [
      'Dalam buku biografi karya KH. Saifuddin Zuhri dan kajian filolog, karomah terbesar Mbah Sholeh Darat adalah bagaimana bilik kecil Pesantren Darat Semarang menjadi *"rahim persatuan umat Islam Indonesia"* yang melahirkan pendiri dua organisasi Islam terbesar di dunia—Nahdlatul Ulama dan Muhammadiyah—serta menyalakan obor emansipasi pemikiran Islam RA. Kartini melalui kitab *Tafsir Faidhur Rahman*.<!--more-->\n\nDalam tradisi lisan masyarakat Semarang, dikisahkan pula karomah Mbah Sholeh Darat ketika beliau berjalan kaki menuju pengajian di Demak dan kendaraannya mogok atau dihadang patroli tentara kolonial Belanda; ketika tentara Belanda mencoba menghalangi langkah beliau, kuda dan kereta patroli kolonial tidak dapat bergerak sedikit pun hingga mereka meminta maaf kepada sang kiai.',
    ],
    untoldStory:
      'Kitab-kitab karya Mbah Sholeh Darat seperti *Majmu’at asy-Syari’at al-Kafiyat lil ’Awam*, *Munjiyat*, dan *Syarah Al-Hikam* dicetak secara masif pada akhir abad ke-19 oleh percetakan batu (*litografi*) *Haji Muhammad Amin* di Singapura serta percetakan di Bombay (India) dan Kairo, menjadikannya buku pegangan wajib umat Islam Jawa selama lebih dari satu abad.<!--more-->\n\nDi Kompleks Pemakaman Bergota (di belakang RSUP Dr. Kariadi Semarang, Jalan Kyai Saleh yang dinamai untuk menghormati beliau), cungkup maqbarah KH. Sholeh Darat kini telah ditata rapi oleh Pemerintah Kota Semarang dan Komunitas Pecinta Kiai Sholeh Darat (KOPISODA).',
    barokahHajat:
      'Peziarah, santri, pendidik, dan aktivis persatuan umat yang berziarah ke maqbarah KH. Sholeh Darat di Bergota Semarang umumnya bertawassul memohon kepada Allah SWT ketersambungan sanad ilmu pesantren, ukhuwah Islamiyah lintas organisasi, serta kefahaman mendalam terhadap Al-Qur’an dan tasawuf.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Maha Guru KH. Muhammad Sholeh Darat As-Samarani (Semarang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ مَشَايِخِ جَاوَى الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ صَالِحْ بْنِ عُمَرَ السَّمَارَانِيِّ (مَبَاهْ صَالِحْ دَارَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَخْرِجْنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَانْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ مَشَايِخِ جَاوَى الْعَلَّامَةِ الْعَارِفِ بِاللهِ الشَّيْخِ مُحَمَّدْ صَالِحْ بْنِ عُمَرَ السَّمَارَانِيِّ (مَبَاهْ صَالِحْ دَارَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَخْرِجْنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَانْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Syaikhi Masyaayikhi Jaawaa al-'Allaamatil-'Aarifi billaah asy-Syaikh Muhammad Shaalih bin 'Umar as-Samaaraanii (Mbah Sholeh Darat) syai-un lillaahi lahumul-Faatihah. Allaahumma akhrijnaa minazh-zhulumaati ilan-nuuri wanfa'naa bi 'uluumihii wa mushannafaatihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maha Guru ulama Jawa Al-Allamah Al-Arif Billah Syaikh Muhammad Sholeh bin Umar As-Samarani (Mbah Sholeh Darat), Al-Fatihah. Ya Allah, keluarkanlah kami dari kegelapan menuju cahaya ilmu, dan limpahkanlah kemanfaatan melalui ilmu, karya-karya kitab, dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Maha Guru ulama Jawa Al-Allamah Al-Arif Billah Syaikh Muhammad Sholeh bin Umar As-Samarani (Mbah Sholeh Darat), Al-Fatihah. Ya Allah, keluarkanlah kami dari kegelapan menuju cahaya ilmu, dan limpahkanlah kemanfaatan melalui ilmu, karya-karya kitab, dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Syawal (Puncak Haul Akbar Tahunan KH. Muhammad Sholeh Darat di Kompleks Maqbarah Bergota & Masjid Kiai Sholeh Darat Dadapsari, Kota Semarang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam Mbah Sholeh Darat di perbukitan TPU Bergota, serta menjaga ketertiban jalur peziarah.',
    facilities: ['Cungkup & Pendopo Maqbarah KH. Sholeh Darat Bergota', 'Mushalla & Tempat Wudhu Peziarah', 'Masjid Kiai Sholeh Darat (Jl. Kakap Dadapsari Semarang)', 'Area Parkir Peziarah Kawasan Bergota Randusari Semarang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ghazali, Abdullah (1981). Biografi K.H. Sholeh Darat Semarang. Semarang: IAIN Walisongo.',
      'Ulum, Amirul (2016). KH. Muhammad Sholeh Darat Al-Samarani: Maha Guru Ulama Nusantara. Yogyakarta: Global Press.',
      'Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat. Bandung: Mizan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-katong-kaliwungu',
    name: 'Makam Sunan Katong & Kyai Guru KH. Asy’ari (Kaliwungu, Kendal)',
    title: 'Penyebar Islam Pesisir Kendal Abad ke-15 & Maha Guru Kota Santri Kaliwungu',
    description:
      'Kompleks Ziarah Bukit Jabal Protomulyo di Kecamatan Kaliwungu Selatan & Kaliwungu, Kabupaten Kendal—menaungi makam waliyullah penyebar Islam Kendal Sunan Katong, Pangeran Mandurorejo, Kyai Musyaffa’, dan maha guru ulama KH. Asy’ari (Kyai Guru).',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 – Abad ke-20 M',
    province: 'Jawa Tengah',
    city: 'Kendal',
    district: 'Kec. Kaliwungu Selatan',
    address: 'Bukit Jabal, Desa Protomulyo, Kec. Kaliwungu Selatan, Kabupaten Kendal',
    location: {
      lat: -6.9765,
      lng: 110.2492,
      address: 'Bukit Jabal, Desa Protomulyo, Kec. Kaliwungu Selatan, Kabupaten Kendal',
      district: 'Kec. Kaliwungu Selatan',
      city: 'Kendal',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Kota Santri Kaliwungu (Kompleks Makam Sunan Katong & Kyai Guru Bukit Jabal Protomulyo Kendal)',
    sanad:
      'Sunan Katong adalah panglima dan mubaligh Kesultanan Demak Bintoro masa awal; sementara KH. Asy’ari (Kyai Guru Kaliwungu, wafat 1921 M) adalah ulama besar lulusan Makkah yang menjadi guru dari KH. Abdul Wahab Chasbullah, KH. Bisri Mustofa, dan KH. Dimyathi Kaliwungu.',
    karya: [
      'Pengislaman wilayah Kaliwungu dan Kendal oleh Sunan Katong pada akhir abad ke-15 M (melahirkan toponim Kaliwungu)',
      'Perintisan tradisi keilmuan Kota Santri Kaliwungu dan pembangunan Masjid Agung Al-Muttaqin Kaliwungu oleh KH. Asy’ari (Kyai Guru)',
      'Tradisi Syawalan / Haul Akbar Kyai Guru dan Sunan Katong di Bukit Jabal Kaliwungu',
    ],
    history:
      'Kecamatan **Kaliwungu** di Kabupaten Kendal dikenal luas sejak berabad-abad silam sebagai *"Kota Santri"* di sebelah barat Semarang. Sejarah pengislaman wilayah ini bermula pada akhir abad ke-15 hingga awal abad ke-16 M melalui dakwah **Sunan Katong**, seorang ulama dan senopati dari Kesultanan Demak Bintoro yang masih memiliki pertalian darah dengan raja-raja Majapahit/Demak. Dalam babad lokal Kendal, dikisahkan Sunan Katong berdakwah ke wilayah barat Semarang yang kala itu dikuasai oleh Adipati Pakuwojo. Setelah melalui adu kesaktian dan dialog kebijaksanaan di dekat pohon ketapang hingga aliran sungai berubah warna menjadi keungu-unguan (*Kali Wungu*), Pakuwojo memeluk Islam dan menjadi murid setia Sunan Katong.\n\nEmpat abad kemudian, pada paruh kedua abad ke-19 hingga awal abad ke-20 M, obor keilmuan Kaliwungu menyala terang benderang berkat kehadiran **KH. Asy’ari**—yang sangat dimuliakan oleh para ulama Jawa dengan gelar **Kyai Guru Kaliwungu** (wafat Syawal 1339 H / 1921 M). Setelah bermukim belasan tahun menuntut ilmu di Makkah Al-Mukarramah, Kyai Guru pulang ke Kaliwungu, mendirikan pesantren dan membangun Masjid Agung Al-Muttaqin Kaliwungu. Hampir seluruh kiai besar pesisir Jawa Tengah dan Jawa Timur pernah bertabarruk mengaji kepada Kyai Guru Kaliwungu, termasuk **KH. Abdul Wahab Chasbullah (Tambakberas)**, **KH. Romly Tamim**, dan **KH. Bisri Mustofa (Rembang)**.\n\nPusara **Sunan Katong** dan **KH. Asy’ari (Kyai Guru)**—bersama pusara waliyullah karismatik **KH. Ahmad Ru’yat**, **KH. Musyaffa’ (Mbah Syaffa’ Kampir)**, **Pangeran Mandurorejo** (Panglima Sultan Agung dalam ekspedisi Batavia 1628 M), dan **Wali Gembyang**—terletak di kawasan perbukitan **Jabal Protomulyo dan Kota Kaliwungu, Kabupaten Kendal**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Kendal dan santri Kaliwungu, **Kyai Guru (KH. Asy’ari)** dikenal memiliki karomah keilmuan yang sangat luas (*’alim ’allamah*) serta kewibawaan batin yang membuat pemerintah kolonial Belanda tidak berani mencampuri urusan syariat di Masjid Agung Kaliwungu.<!--more-->\n\nSementara penerus ruhaninya di Kaliwungu, **KH. Musyaffa’ (Mbah Syaffa’)** dan **KH. Ahmad Ru’yat**, dikenal sebagai waliyullah berderajat *kasyaf* dan *zuhud* yang selalu menjadi tempat para ulama besar Jawa meminta doa restu pada abad ke-20.',
    ],
    untoldStory:
      'Tradisi **Syawalan Kaliwungu**—yang digelar setiap tanggal **8 hingga 10 Syawal** (sepekan setelah Idul Fitri) untuk memperingati **Haul Akbar KH. Asy’ari (Kyai Guru) dan Sunan Katong**—telah berlangsung selama lebih dari satu abad dan ditetapkan sebagai warisan budaya takbenda Kabupaten Kendal yang dihadiri ratusan ribu peziarah.<!--more-->\n\nDalam sekali kunjungan ke Kaliwungu, peziarah dapat menziarahi rangkaian makam para wali dari era Kesultanan Demak (Sunan Katong & Wali Gembyang), era Kesultanan Mataram (Pangeran Mandurorejo & Pangeran Djuminah), hingga era ulama pesantren modern (Kyai Guru KH. Asy’ari, KH. Ru’yat, dan KH. Musyaffa’).',
    barokahHajat:
      'Peziarah dan santri yang berziarah ke maqbarah Sunan Katong dan Kyai Guru KH. Asy’ari di Kaliwungu Kendal umumnya bertawassul memohon kepada Allah SWT kemantapan ilmu alat dan fikih pesantren, keberkahan mendidik generasi santri, serta keselamatan dan kemakmuran keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Katong, Kyai Guru KH. Asy’ari & Auliya Kaliwungu (Kendal)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ سُونَانْ كَاتُونْغ وَالشَّيْخِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ أَشْعَرِيّ (كِيَاهِي غُورُو) وَالشَّيْخِ أَحْمَدْ رُؤْيَةْ وَالشَّيْخِ مُشَفَّعْ كَالِيوُونْغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ سُونَانْ كَاتُونْغ وَالشَّيْخِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ أَشْعَرِيّ (كِيَاهِي غُورُو) وَالشَّيْخِ أَحْمَدْ رُؤْيَةْ وَالشَّيْخِ مُشَفَّعْ كَالِيوُونْغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Sunan Katong wasy-Syaikhil-'Allaamah Kiyaahii al-Haajj Asy'arii (Kyai Guru) wasy-Syaikh Ahmad Ru'yat wasy-Syaikh Musyaffa' Kaliwungu syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sunan Katong, Al-Allamah KH. Asy’ari (Kyai Guru), KH. Ahmad Ru’yat, dan KH. Musyaffa’ Kaliwungu Kendal, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sunan Katong, Al-Allamah KH. Asy’ari (Kyai Guru), KH. Ahmad Ru’yat, dan KH. Musyaffa’ Kaliwungu Kendal, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '8–10 Syawal (Puncak Tradisi Syawalan & Haul Akbar Kyai Guru KH. Asy’ari serta Sunan Katong di Bukit Jabal Protomulyo & Masjid Agung Al-Muttaqin Kaliwungu, Kabupaten Kendal).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, berhati-hati saat meniti tangga menuju cungkup Bukit Jabal Protomulyo, serta mengikuti arahan petugas keamanan makam.',
    facilities: ['Cungkup Maqbarah Sunan Katong & Kyai Guru Bukit Jabal', 'Masjid Agung Al-Muttaqin Kaliwungu', 'Mushalla & Area Wudhu Bukit Jabal Protomulyo', 'Area Parkir Bus Wisata Religi Protomulyo Kaliwungu Selatan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Pemerintah Kabupaten Kendal — Sejarah Kota Santri Kaliwungu dan Tradisi Syawalan Kyai Guru.',
      'Bizawie, Zainul Milal (2016). Masterpiece Islam Nusantara: Sanad dan Jejaring Ulama-Santri (1830–1945). Ciputat: Pustaka Compass.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-subakir-tidar',
    legacyId: 'auliya-4',
    name: 'Makam / Petilasan Syekh Subakir & Kyai Sepanjang (Gunung Tidar, Kota Magelang)',
    title: 'Ulama Sufi Persia Generasi Awal Wali Songo & Paku Bumi Tanah Jawa di Puncak Gunung Tidar',
    description:
      'Kompleks Ziarah Puncak Gunung Tidar di Kelurahan Magersari, Kecamatan Magelang Selatan, Kota Magelang—situs maqam/petilasan Syekh Subakir (Sayyid Muhammad Al-Baqir dari Persia, abad ke-15 M), Tombak Kyai Panjang, dan Kyai Semar.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 M (904 M / 1404 M — Wali Songo Periode Pertama)',
    province: 'Jawa Tengah',
    city: 'Magelang',
    district: 'Kec. Magelang Selatan',
    address: 'Puncak Gunung Tidar, Kel. Magersari, Kec. Magelang Selatan, Kota Magelang',
    location: {
      lat: -7.4932,
      lng: 110.2185,
      address: 'Puncak Gunung Tidar, Kel. Magersari, Kec. Magelang Selatan, Kota Magelang',
      district: 'Kec. Magelang Selatan',
      city: 'Magelang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Kebun Raya & Situs Ziarah Syekh Subakir di Puncak Gunung Tidar Kota Magelang',
    sanad:
      'Ulama sufi, pakar rukyah syar’iyyah, dan ahli ekologi/geofisika asal Persia (Iran) yang diutus oleh Sultan Muhammad I (Kesultanan Turki Utsmani) pada tahun 1404 M sebagai anggota Dewan Wali Songo periode pertama bersama Syekh Maulana Malik Ibrahim.',
    karya: [
      'Pembersihan spiritual dan pembukaan permukiman Muslim perdana di jantung Pulau Jawa (Gunung Tidar Magelang)',
      'Simbolisasi Tugu Sa (Sapa-Sira-Sapa-Ingsun / Kalimat Tauhid) sebagai Paku Tanah Jawa di puncak Gunung Tidar',
    ],
    history:
      '**Syekh Subakir**—yang dalam literatur kesejarahan Wali Songo dikenal dengan nama asli **Syekh Syamsuddin Al-Baqir Al-Farisi** (awal abad ke-15 M)—adalah ulama sufi asal negeri Persia (Iran) yang termasuk dalam rombongan pertama *Wali Songo* utusan Khalifah/Sultan Turki Utsmani (Sultan Muhammad I Celebi) pada tahun **1404 M**. Dalam naskah *Babad Tanah Jawi* dan *Serat Kanda*, dikisahkan bahwa sebelum kedatangan Syekh Subakir, upaya dakwah Islam di pedalaman Pulau Jawa sering mengalami kegagalan karena kuatnya pengaruh mistisisme kuno dan tantangan alam.\n\nDengan keahlian beliau dalam ilmu hikmah, rukyah, dan pemahaman ekologis tentang titik keseimbangan bumi Jawa, Syekh Subakir mendaki sebuah bukit yang terletak tepat di titik tengah geografis Pulau Jawa, yakni **Gunung Tidar** di Kota Magelang (ketinggian 503 mdpl). Di puncak Gunung Tidar itulah beliau menancapkan batu hitam berajah kalimat Tauhid serta tombak pusaka bernama **Kyai Sepanjang** untuk menetralisir pengaruh negatif dan menjadikan Gunung Tidar sebagai *"Pakuning Tanah Jawa"* (Paku Bumi Pulau Jawa) yang memancarkan keteduhan tauhid.\n\nSetelah masyarakat pedalaman Kedu mulai menerima dakwah Islam secara damai dan kader-kader Wali Songo generasi berikutnya telah siap melanjutkan estafet dakwah, Syekh Subakir diriwayatkan kembali ke tanah kelahirannya di Persia pada tahun 1462 M (untuk menghindari pengkultusan berlebih terhadap dirinya), seraya meninggalkan situs **Maqam / Petilasan Syekh Subakir** dan makam tombak pusaka **Kyai Sepanjang** (sepanjang 7 meter) di puncak Gunung Tidar, Kelurahan Magersari, Kecamatan Magelang Selatan, Kota Magelang.',
    karomah: [
      'Dalam tradisi lisan masyarakat Jawa dan naskah *Babad Tanah Jawi*, peristiwa riyadhah empat puluh hari empat puluh malam Syekh Subakir di puncak Gunung Tidar dipandang sebagai tonggak spiritual terbukanya gerbang hidayah Islam di pedalaman Jawa Tengah (*Bumi Kedu dan Mataram*).<!--more-->\n\nDi pelataran puncak Gunung Tidar juga berdiri **Tugu Sa** (tugu bersegi tiga bertuliskan aksara Jawa *"Sa"* pada ketiga sisinya: *Sapa Sira Sapa Ingsun*—Siapa Kamu Siapa Aku, yakni kesadaran makrifat mengenal diri dan mengenal Tuhan) yang dikelilingi hutan pinus kota yang sangat sejuk.',
    ],
    untoldStory:
      'Penjelasan jujur secara filologis kepada peziarah bahwa situs Syekh Subakir di puncak Gunung Tidar merupakan **Maqam (tempat riyadhah/petilasan bersejarah)**—sebagaimana *Maqam Ibrahim* di Makkah—sedangkan pusara panjang 7 meter di sebelahnya adalah tempat pendaman tombak pusaka **Kyai Sepanjang**, justru menambah kemuliaan ilmiah situs ini.<!--more-->\n\nSetiap bulan Rajab, Sya’ban (Sadranan), dan Muharram, puluhan ribu santri dan peziarah dari seluruh Jawa Tengah, Jawa Timur, dan Jawa Barat mendaki ratusan anak tangga Gunung Tidar untuk berzikir dan bertawassul di Pendopo Maqam Syekh Subakir.',
    barokahHajat:
      'Peziarah yang berziarah ke Maqam Syekh Subakir di puncak Gunung Tidar Kota Magelang umumnya bertawassul memohon kepada Allah SWT keteguhan iman yang kokoh laksana paku bumi, perlindungan keluarga dari gangguan jin dan sihir (*rukyah syar’iyyah*), serta keselamatan tanah air dari bencana.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Subakir (Sayyid Syamsuddin Al-Baqir Gunung Tidar Magelang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ شَمْسِ الدِّينِ الْبَاقِرِ الْفَارِسِيِّ الْمَعْرُوفِ بِشَيْخِ سُوبَاكِيرْ جَبَلْ تِيدَارْ مَاغَلَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ إِيمَانَنَا وَاحْفَظْ بِلَادَنَا وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ شَمْسِ الدِّينِ الْبَاقِرِ الْفَارِسِيِّ الْمَعْرُوفِ بِشَيْخِ سُوبَاكِيرْ جَبَلْ تِيدَارْ مَاغَلَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ إِيمَانَنَا وَاحْفَظْ بِلَادَنَا وَانْفَعْنَا بِأَسْرَارِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Syamsiddiin al-Baaqir al-Faarisii al-ma'ruufi bi Syaikh Subakir Jabal Tidar Magelang syai-un lillaahi lahumul-Faatihah. Allaahumma tsabbit iimaananaa wahfazh bilaadanaa wanfa'naa bi asraarihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Syamsuddin Al-Baqir Al-Farisi (Syekh Subakir Gunung Tidar Magelang), Al-Fatihah. Ya Allah, teguhkanlah iman kami, lindungilah negeri kami, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Syamsuddin Al-Baqir Al-Farisi (Syekh Subakir Gunung Tidar Magelang), Al-Fatihah. Ya Allah, teguhkanlah iman kami, lindungilah negeri kami, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Suro & Bulan Sya’ban (Puncak Haul Agung Syekh Subakir & Doa Bersama Kebangsaan di Puncak Gunung Tidar, Kelurahan Magersari, Kecamatan Magelang Selatan, Kota Magelang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga stamina saat mendaki jalur anak tangga Kebun Raya Gunung Tidar, serta dilarang memberi makan sembarangan atau mengganggu kawanan kera ekor panjang di hutan Gunung Tidar.',
    facilities: ['Pendopo & Cungkup Maqam Syekh Subakir', 'Situs Makam Tombak Kyai Sepanjang & Tugu Sa', 'Mushalla & Tempat Wudhu Puncak Gunung Tidar', 'Terminal Parkir Bus Wisata Religi Gunung Tidar Kota Magelang'],
    openingHours: '06.00 - 21.00 WIB (Mengikuti tata tertib UPT Kebun Raya Gunung Tidar Kota Magelang)',
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
      'Olthof, W.L. (1941). Poenika Serat Babad Tanah Djawi Wiwit Saking Nabi Adam Doemoegi ing Taoen 1647. ’s-Gravenhage: M. Nijhoff.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-dalhar-watucongol',
    legacyId: 'ulama-12',
    name: 'Makam KH. Dalhar Watucongol & Kyai Raden Santri (Gunungpring, Muntilan, Magelang)',
    title: 'Mursyid Agung Thariqah Syadziliyah, Penyusun Tanwirul Ma’ani & Pembimbing Para Pejuang Kemerdekaan',
    description:
      'Kompleks Ziarah Gunungpring dan Pesantren Darussalam Watucongol di Desa Gunungpring, Kecamatan Muntilan, Kabupaten Magelang—tempat peristirahatan waliyullah KH. Nahrowi Dalhar (1870–1959 M) dan ulama Kesultanan Mataram Kyai Raden Santri (Pangeran Singosari).',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 – Abad ke-20 M (KH. Dalhar: 1870–1959 M / 1286–1378 H)',
    province: 'Jawa Tengah',
    city: 'Magelang',
    district: 'Kec. Muntilan',
    address: 'Bukit Gunungpring & Dusun Watucongol, Desa Gunungpring, Kec. Muntilan, Kabupaten Magelang',
    location: {
      lat: -7.5892,
      lng: 110.2784,
      address: 'Bukit Gunungpring & Dusun Watucongol, Desa Gunungpring, Kec. Muntilan, Kabupaten Magelang',
      district: 'Kec. Muntilan',
      city: 'Magelang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Maqbarah Bukit Gunungpring & Pesantren Watucongol Muntilan Magelang',
    sanad:
      'Putra KH. Abdurrahman bin Abdurrauf (panglima laskar Pangeran Diponegoro bergelar Kyai Hasan Tuqo) dan cicit Kyai Raden Santri; murid dari KH. Mad Ushul (Kebumen), KH. Sholeh Darat (Semarang), serta di Makkah menerima ijazah kemursyidan Thariqah Syadziliyah dari Syaikh Muhtarom Al-Makki dan Sayyid Muhammad Babashol Al-Hasani.',
    karya: [
      'Kitab Tanwirul Ma’ani fi Manaqibisy Syaikh Abil Hasan Asy-Syadzili (risalah kemursyidan dan manaqib Imam Abul Hasan Asy-Syadzili)',
      'Ijazah wirid Hizib Bahr, Hizib Nashr, dan Shalawat Munjiyat yang diwariskan ke jaringan pesantren Jawa',
      'Kaderisasi waliyullah dan ulama besar abad ke-20: KH. Mahrus Aly (Lirboyo), KH. Dimyathi (Banten), KH. Marzuki (Giriloyo), Gus Miek (Kediri), dan KH. Ahmad Abdul Haq (Mbah Mad Watucongol)',
    ],
    history:
      '**KH. Nahrowi Dalhar**—yang sangat dimuliakan oleh masyarakat Nusantara dengan sapaan **Mbah Dalhar Watucongol** (10 Syawal 1286 H / 12 Januari 1870 M – 29 Ramadhan 1378 H / 8 April 1959 M)—lahir di lingkungan Pesantren Watucongol, Desa Gunungpring, Kecamatan Muntilan, Kabupaten Magelang. Ayahandanya adalah **KH. Abdurrahman**, putra dari **Kyai Abdurrauf (Kyai Hasan Tuqo)** yang merupakan salah satu panglima perang Pangeran Diponegoro pada Perang Jawa (1825–1830), sementara garis leluhur beliau ke atas bersambung kepada **Kyai Raden Santri (Pangeran Singosari, putra Ki Ageng Pemanahan)** yang dimakamkan di puncak Bukit Gunungpring.\n\nSejak remaja, pemuda yang bernama asli Abdul Qadir ini menuntut ilmu selama delapan tahun di Pondok Pesantren Somalangu Kebumen dan berguru kepada **KH. Sholeh Darat** di Semarang. Pada tahun 1896 M, beliau berangkat ke Makkah Al-Mukarramah dan bermukim selama 25 tahun di rubath **Sayyid Muhammad Babashol Al-Hasani** (Mufti Syafi’iyah Makkah yang memberinya nama **Nahrowi**) serta menerima baiat kemursyidan **Thariqah Syadziliyah** dari **Syaikh Muhtarom Al-Makki**. Di Makkah pula beliau menulis kitab berbahasa Arab yang sangat masyhur di kalangan pengamal tarekat, yakni **Tanwirul Ma’ani fi Manaqibisy Syaikh Abil Hasan Asy-Syadzili**.\n\nSekembalinya ke tanah air sekitar tahun 1920-an, Mbah Dalhar mengasuh **Pondok Pesantren Darussalam Watucongol** di Muntilan, Magelang. Pada masa Perang Kemerdekaan 1945–1949 (termasuk pertempuran Palagan Ambarawa dan pengungsian ke Magelang), Pesantren Watucongol menjadi markas doa dan dapur umum para pejuang: Panglima Besar Jenderal Sudirman, Bung Tomo, dan KH. Subchi Parakan datang memohon doa serta pengisian batin kepada Mbah Dalhar. Beliau wafat pada hari Rabu, **29 Ramadhan 1378 H (8 April 1959 M)** dan dimakamkan di Kompleks Maqbarah Gunungpring / Santren Watucongol bersama putranya yang juga waliyullah besar, **KH. Ahmad Abdul Haq (Mbah Mad Watucongol, wafat 2010 M)**.',
    karomah: [
      'Dalam kesaksian para ulama besar—termasuk KH. Abdul Hamid Pasuruan, Abuya KH. Dimyathi Cidahu Banten, dan KH. Mahrus Aly Lirboyo—Mbah Dalhar Watucongol dikenal sebagai *Wali Quthub* tanah Jawa pada paruh pertama abad ke-20 yang memiliki sifat *wara’* luar biasa: beliau tidak pernah mau memakan nasi kecuali dari padi yang ditanam dan dipanen sendiri secara yakin kehalalannya.<!--more-->\n\nPada masa Agresi Militer Belanda 1948, ketika pesawat tempur Belanda hendak membombardir kawasan Muntilan dan Pesantren Watucongol tempat persembunyian para laskar Hizbullah dan TNI, dalam pandangan pilot Belanda kawasan Watucongol tampak berubah menjadi telaga air dan kabut tebal berkat munajat *Hizib Bahr* Mbah Dalhar Watucongol.',
    ],
    untoldStory:
      'Kawasan Desa Gunungpring di Muntilan memiliki dua titik ziarah utama yang selalu dikunjungi beriringan oleh jutaan peziarah: pertama adalah **Puncak Bukit Gunungpring** (tempat pusara **Kyai Raden Santri / Pangeran Singosari**, **KH. Jogorekso**, **KH. Krapyak**, dan **Gusuku**), dan kedua adalah **Maqbarah Santren Watucongol** di kaki bukit (tempat pusara **Mbah Dalhar Watucongol** dan putranya **KH. Ahmad Abdul Haq / Mbah Mad**).<!--more-->\n\nDari tangan dingin Mbah Dalhar Watucongol di Muntilan inilah sanad *Thariqah Syadziliyah* menyebar luas ke Pondok Pesantren PETA Tulungagung (KH. Mustaqim Husain), Pesantren Al-Falah Somalangu Kebumen, hingga Banten dan Jawa Barat.',
    barokahHajat:
      'Peziarah, santri, dan pengamal tarekat yang berziarah ke maqbarah KH. Dalhar Watucongol dan Kyai Raden Santri di Gunungpring Muntilan umumnya bertawassul memohon kepada Allah SWT kemurnian rezeki yang halal (*wara’*), ketenangan batin melalui wirid *Thariqah Syadziliyah*, serta keberkahan ilmu dan keselamatan keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Nahrowi Dalhar Watucongol & Kyai Raden Santri (Gunungpring Muntilan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ كِيَاهِي رَادِينْ سَانْتْرِي وَالْوَلِيِّ الْكَامِلِ الْمُرْشِدِ كِيَاهِي الحَاجِّ نَحْرَاوِي ضَلْهَرْ وَابْنِهِ الشَّيْخِ أَحْمَدْ عَبْدِ الْحَقِّ وَاتُوشُونْغُولْ مَاغَلَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَوَرَعِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ كِيَاهِي رَادِينْ سَانْتْرِي وَالْوَلِيِّ الْكَامِلِ الْمُرْشِدِ كِيَاهِي الحَاجِّ نَحْرَاوِي ضَلْهَرْ وَابْنِهِ الشَّيْخِ أَحْمَدْ عَبْدِ الْحَقِّ وَاتُوشُونْغُولْ مَاغَلَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَوَرَعِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Kiyaahii Raden Santri wal-Waliyyil-Kaamilil-Mursyid Kiyaahii al-Haajj Nahraawii Dhalhar wabnihisy-Syaikh Ahmad 'Abdil-Haqq Watucongol Magelang syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa wara'ihim wa asraarihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Kyai Raden Santri, wali kamil sang mursyid KH. Nahrowi Dalhar, dan putranya KH. Ahmad Abdul Haq Watucongol Magelang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, sifat wara’, dan rahasia hikmah mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Kyai Raden Santri, wali kamil sang mursyid KH. Nahrowi Dalhar, dan putranya KH. Ahmad Abdul Haq Watucongol Magelang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, sifat wara’, dan rahasia hikmah mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '20–21 Muharram (Haul Agung Kyai Raden Santri Gunungpring) & Bulan Sya’ban / Syawal (Puncak Haul Akbar KH. Nahrowi Dalhar & KH. Ahmad Abdul Haq di PP Darussalam Watucongol, Muntilan, Kabupaten Magelang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga ketenangan saat mendaki tangga Bukit Gunungpring maupun saat berdoa di Maqbarah Santren Watucongol, serta mengikuti arahan petugas keamanan pesantren.',
    facilities: ['Kompleks Maqbarah Bukit Gunungpring & Maqbarah Santren Watucongol', 'Masjid Jami’ Pondok Pesantren Darussalam Watucongol', 'Sentra Oleh-Oleh Tape Ketan Muntilan', 'Terminal Parkir Bus Wisata Religi Gunungpring Muntilan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Dalhar, KH. Nahrowi (1935). Tanwirul Ma’ani fi Manaqibisy Syaikh Abil Hasan Asy-Syadzili. Semarang: Toha Putra.',
      'Zuhri, KH. Saifuddin (1974). Guruku Orang-Orang dari Pesantren. Bandung: Al-Ma’arif.',
      'Mulyati, Sri (2005). Mengenal dan Memahami Tarekat-Tarekat Muktabarah di Indonesia. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-subchi-parakan',
    name: 'Makam KH. Subchi — "Kyai Bambu Runcing" (Parakan, Temanggung)',
    title: 'Ulama Sufi Pengijazah Doa Bambu Runcing bagi Laskar Pejuang Kemerdekaan 1945',
    description:
      'Maqbarah KH. Subchi / Mbah Subchi (1858–1959 M) di pemakaman belakang Masjid Al-Barokah Bambu Runcing, Kelurahan Parakan Kauman, Kecamatan Parakan, Kabupaten Temanggung—ulama sepuh tempat ratusan ribu pemuda pejuang menyepuh bambu runcing dengan doa.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Abad ke-20 M (1858–1959 M)',
    province: 'Jawa Tengah',
    city: 'Temanggung',
    district: 'Kec. Parakan',
    address: 'Belakang Masjid Al-Barokah Bambu Runcing, Kel. Parakan Kauman, Kec. Parakan, Kabupaten Temanggung',
    location: {
      lat: -7.2836,
      lng: 110.0982,
      address: 'Belakang Masjid Al-Barokah Bambu Runcing, Kel. Parakan Kauman, Kec. Parakan, Kabupaten Temanggung',
      district: 'Kec. Parakan',
      city: 'Temanggung',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Pejuang Kemerdekaan (Masjid & Makam KH. Subchi Bambu Runcing Parakan Temanggung)',
    sanad:
      'Putra KH. Harun Rasyid (Kyai Abdul Wahab, ulama laskar Pangeran Diponegoro yang membuka Parakan Kauman); murid dari ayahandanya sendiri, KH. Sholeh Darat Semarang, serta seangkatan dalam perjuangan ruhani dengan KH. Dalhar Watucongol Muntilan dan KH. Mandhur Temanggung.',
    karya: [
      'Kepemimpinan Barisan Muslimin Temanggung (BMT) dan pengijazahan doa Bambu Runcing di Parakan (1945–1946) bersama KH. Sumoguna, KH. Nawawi, dan KH. Ali',
      'Pembinaan mental-ruhani Panglima Besar Jenderal Sudirman, KH. Saifuddin Zuhri, dan ratusan ribu laskar Hizbullah-Sabilillah sebelum terjun ke Palagan Ambarawa dan Surabaya',
    ],
    history:
      '**KH. Subchi**—yang tercatat dalam tinta emas sejarah Republik Indonesia dengan gelar **Kyai Bambu Runcing Parakan** (1858 – 6 April 1959 M)—lahir di Parakan Kauman, Kabupaten Temanggung dengan nama kecil Muhammad Benjing. Ayahandanya, **KH. Harun Rasyid (Kyai Abdul Wahab)**, adalah prajurit ulama Pangeran Diponegoro yang hijrah ke lereng Gunung Sumbing–Sindoro pasca-Perang Jawa 1830. Sejak muda, Kiai Subchi menuntut ilmu di berbagai pesantren Jawa Tengah dan dikenal sebagai ulama sufi yang sangat tawadhu’, sehari-hari bekerja mandiri sebagai petani dan penjahit kopiah di dekat Langgar Kauman Parakan.\n\nPeran historis KH. Subchi yang menggetarkan seluruh Pulau Jawa terjadi pada bulan **Oktober–Desember 1945** ketika tentara Sekutu dan NICA mendarat di Semarang serta Surabaya, sementara laskar pemuda Indonesia kekurangan senjata api. Di bawah koordinasi **Barisan Muslimin Temanggung (BMT)** yang dipimpin oleh KH. Subchi bersama KH. Sumoguna, KH. M. Ali, KH. Nawawi, dan KH. Abdurrahman, Kota Parakan di kaki Gunung Sumbing–Sindoro berubah menjadi lautan manusia: setiap hari puluhan kereta api uap menurunkan ribuan pemuda laskar *Hizbullah*, *Sabilillah*, dan *BKR/TKR* dari Jawa Barat, Jakarta, Jawa Tengah, hingga Jawa Timur yang membawa bilah bambu runcing untuk didoakan (*disuwuk*) oleh KH. Subchi.\n\nSambil memercikkan air doa dari gentong dan menghembuskan kalimat *Lafaz Jalalah*, Surah Al-Fil, serta ayat *"Wa maa ramaita idz ramaita walaakinnallaaha ramaa"* (QS. Al-Anfal: 17) pada ujung bambu runcing dan ikat kepala para pejuang, KH. Subchi menanamkan keberanian tauhid yang menghapus rasa takut mati di medan pertempuran **10 November Surabaya** dan **Palagan Ambarawa**. Panglima Besar **Jenderal Sudirman** dan Menteri Agama **KH. Saifuddin Zuhri** hadir langsung ke Parakan memohon doa restu beliau. KH. Subchi wafat pada tanggal **6 April 1959 M (27 Ramadhan 1378 H)** dalam usia 101 tahun dan dimakamkan di belakang **Masjid Al-Barokah Bambu Runcing, Kelurahan Parakan Kauman, Kecamatan Parakan, Kabupaten Temanggung**.',
    karomah: [
      'Dalam buku memoar sejarah *Guruku Orang-Orang dari Pesantren* karya Menteri Agama KH. Saifuddin Zuhri (yang menjadi saksi mata langsung di Parakan tahun 1945), karomah KH. Subchi tampak dari bagaimana sepotong bambu sederhana yang telah didoakan beliau sanggup membakar keberanian ratusan ribu pemuda santri menghadapi tank dan meriam tentara Sekutu di Ambarawa serta Surabaya.<!--more-->\n\nKH. Subchi selalu berpesan tegas kepada setiap pejuang yang menerima doa bambu runcing di Parakan: senjata bambu runcing itu hanya akan bertuah apabila pemegangnya menjaga shalat lima waktu, tidak merampas harta rakyat, tidak menyakiti tawanan yang menyerah, dan meluruskan niat semata-mata *li i’la’i kalimatillah* membela tanah air.',
    ],
    untoldStory:
      'Peristiwa wafatnya dua waliyullah besar pengayom pejuang kemerdekaan di kawasan Kedu—yakni **KH. Subchi Parakan Temanggung** (wafat Senin malam, 6 April 1959 / 27 Ramadhan 1378 H) dan sahabat kentalnya **KH. Dalhar Watucongol Muntilan** (wafat Rabu, 8 April 1959 / 29 Ramadhan 1378 H)—hanya berselisih dua hari di penghujung bulan suci Ramadhan 1378 H.<!--more-->\n\nDi Kompleks Masjid Al-Barokah Parakan Kauman kini masih tersimpan artefak bersejarah berupa **Gentong Air Doa Bambu Runcing** dan monumen perjuangan Bambu Runcing Parakan di Kabupaten Temanggung.',
    barokahHajat:
      'Peziarah, prajurit TNI/Polri, dan santri yang berziarah ke maqbarah KH. Subchi (Kyai Bambu Runcing) di Parakan Temanggung umumnya bertawassul memohon kepada Allah SWT keteguhan mental dan keberanian dalam membela kebenaran, semangat cinta tanah air (*hubbul wathan*), serta keselamatan dalam menjalankan tugas negara.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Subchi (Kyai Bambu Runcing Parakan Temanggung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الْوَلِيِّ الصَّالِحِ كِيَاهِي الحَاجِّ صُبْحِي وَمَشَايِخِ فَارَاكَانْ تَمَانْغغُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ أَقْدَامَنَا وَانْصُرْ بِلَادَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الْوَلِيِّ الصَّالِحِ كِيَاهِي الحَاجِّ صُبْحِي وَمَشَايِخِ فَارَاكَانْ تَمَانْغغُونْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ أَقْدَامَنَا وَانْصُرْ بِلَادَنَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahidil-Waliyyish-Shaalih Kiyaahii al-Haajj Shubhii wa Masyaayikhi Parakan Temanggung syai-un lillaahi lahumul-Faatihah. Allaahumma tsabbit aqdaamanaa wanshur bilaadanaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang wali yang shalih KH. Subchi beserta para masyayikh Parakan Temanggung, Al-Fatihah. Ya Allah, teguhkanlah langkah perjuangan kami, tolonglah negeri kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang wali yang shalih KH. Subchi beserta para masyayikh Parakan Temanggung, Al-Fatihah. Ya Allah, teguhkanlah langkah perjuangan kami, tolonglah negeri kami, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '27 Ramadhan & 10 November / Hari Pahlawan (Puncak Haul Akbar KH. Subchi Kyai Bambu Runcing di Kompleks Masjid Al-Barokah, Kelurahan Parakan Kauman, Kecamatan Parakan, Kabupaten Temanggung).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi Masjid Al-Barokah dan cungkup maqbarah KH. Subchi di belakang masjid, serta menjaga ketenangan lingkungan Kampung Kauman Parakan.',
    facilities: ['Cungkup Maqbarah KH. Subchi Parakan', 'Masjid Al-Barokah Bambu Runcing Parakan Kauman', 'Monumen Sejarah Bambu Runcing Parakan', 'Area Parkir Peziarah Kauman Parakan Temanggung'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zuhri, KH. Saifuddin (1974). Guruku Orang-Orang dari Pesantren (Bab Kyai Subchi dan Bambu Runcing Parakan). Bandung: Al-Ma’arif.',
      'Ricklefs, M.C. (2008). Sejarah Indonesia Modern 1200–2008. Jakarta: Serambi.',
      'Pemerintah Kabupaten Temanggung — Monografi Sejarah Perjuangan KH. Subchi Bambu Runcing Parakan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-muntaha-wonosobo',
    name: 'Makam KH. Muntaha Al-Hafizh & KH. Asy’ari (Kalibeber, Mojotengah, Wonosobo)',
    title: 'Pecinta Agung Al-Qur’an, Penggagas Mushaf Al-Qur’an Akbar & Pendiri UNSIQ Wonosobo',
    description:
      'Kompleks Maqbarah Deroduwur di Desa Deroduwur / Kalibeber, Kecamatan Mojotengah, Kabupaten Wonosobo—tempat peristirahatan KH. Muntaha Al-Hafizh (1912–2004 M), KH. Asy’ari, dan KH. Mustahal, pengasuh Pondok Pesantren Al-Asy’ariyyah Kalibeber.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-21 M (KH. Muntaha: 1912–2004 M)',
    province: 'Jawa Tengah',
    city: 'Wonosobo',
    district: 'Kec. Mojotengah',
    address: 'Kompleks Maqbarah Masyayikh Desa Deroduwur / Pondok Pesantren Al-Asy’ariyyah Kalibeber, Kec. Mojotengah, Kabupaten Wonosobo',
    location: {
      lat: -7.3264,
      lng: 109.9048,
      address: 'Kompleks Maqbarah Masyayikh Desa Deroduwur / Pondok Pesantren Al-Asy’ariyyah Kalibeber, Kec. Mojotengah, Kabupaten Wonosobo',
      district: 'Kec. Mojotengah',
      city: 'Wonosobo',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Al-Qur’an Wonosobo (PP Al-Asy’ariyyah Kalibeber & Maqbarah KH. Muntaha Al-Hafizh Mojotengah)',
    sanad:
      'Putra KH. Asy’ari bin KH. Abdurrohim bin Kyai Muntaha I (cucu pendiri Pesantren Kalibeber tahun 1832 M yang merupakan ulama laskar Pangeran Diponegoro); menghafal Al-Qur’an 30 juz dan Qira’at Sab’ah kepada KH. Utsman Kaliwungu Kendal, KH. Moenauwir Krapyak Yogyakarta, dan KH. Dimyathi Termas Pacitan.',
    karya: [
      'Pengembangan Pondok Pesantren Tahfidzul Qur’an Al-Asy’ariyyah Kalibeber dan pendirian Universitas Sains Al-Qur’an (UNSIQ) Wonosobo',
      'Pemrakarsa penulisan Mushaf Al-Qur’an Akbar (ukuran raksasa 2 x 1,5 meter halaman terbentang) yang diresmikan Presiden Soeharto dan Presiden Abdurrahman Wahid',
      'Penyusunan Tafsir Al-Qur’an Tematik dan pembinaan kerukunan lintas umat di dataran tinggi Dieng–Wonosobo',
    ],
    history:
      '**KH. Muntaha bin KH. Asy’ari Al-Hafizh**—yang akrab disapa **Mbah Muntaha Kalibeber** (9 Juli 1912 – 29 Desember 2004 M)—adalah ulama besar penghafal Al-Qur’an (*Ahlul Qur’an*) dan tokoh pendidikan Islam visioner dari lereng Gunung Sindoro–Dieng, Kabupaten Wonosobo. Pondok Pesantren Tahfidzul Qur’an **Al-Asy’ariyyah** di Kelurahan Kalibeber, Kecamatan Mojotengah, Wonosobo awalnya dirintis pada tahun **1832 M** oleh kakek buyut beliau, **KH. Muntaha bin Nida Muhammad** (ulama pejuang Pangeran Diponegoro), lalu dilanjutkan oleh kakeknya **KH. Abdurrohim** dan ayahandanya **KH. Asy’ari**.\n\nSejak usia 16 tahun, Muntaha muda telah mengkhatamkan hafalan 30 juz Al-Qur’an di bawah bimbingan **KH. Utsman Kaliwungu (Kendal)**, kemudian memperdalam ilmu *Qira’at Sab’ah* kepada **KH. Muhammad Moenauwir di Pondok Pesantren Krapyak Yogyakarta** serta mendalami kitab-kitab fikih dan hadis kepada **KH. Dimyathi di Pondok Tremas Pacitan**. Pada masa Revolusi Kemerdekaan 1945–1949, beliau memimpin barisan pejuang *Bambu Runcing / Sabilillah* di Karesidenan Kedu.\n\nSepanjang hidupnya mengasuh Pondok Pesantren Al-Asy’ariyyah Kalibeber (1950–2004 M), Mbah Muntaha memadukan tradisi hafalan Al-Qur’an dengan ilmu pengetahuan dan teknologi modern melalui semboyan *"Membumikan Al-Qur’an"* hingga lahirlah **IIQ / Universitas Sains Al-Qur’an (UNSIQ) Jawa Tengah di Wonosobo**. Beliau juga memprakarsai penulisan tangan **Mushaf Al-Qur’an Akbar** berukuran raksasa di atas kertas khusus yang kini tersimpan di Baitul Qur’an TMII, Masjid Agung Jawa Tengah, dan Kampus UNSIQ Kalibeber. KH. Muntaha Al-Hafizh wafat pada hari Rabu, **29 Desember 2004 M (17 Dzulqa’dah 1425 H)** dalam usia 92 tahun dan dimakamkan di **Kompleks Maqbarah Keluarga Bukit Deroduwur, Kecamatan Mojotengah, Kabupaten Wonosobo**.',
    karomah: [
      'Dalam biografi *Mbah Muntaha: Sang Pecinta Al-Qur’an* dan kesaksian para santri Kalibeber, karomah utama KH. Muntaha Al-Hafizh adalah penjagaan hafalan Al-Qur’an di dalam dadanya yang tidak pernah luntur sedikit pun hingga usia lebih dari 90 tahun: bahkan ketika beliau sedang sakit berat di rumah sakit dan tampak tertidur, bibir beliau terus bergerak melantunkan *muraja’ah* ayat-ayat suci Al-Qur’an secara berurutan.<!--more-->\n\nKeteduhan akhlak dan kasih sayang Mbah Muntaha juga berhasil mengislamkan ribuan warga di desa-desa terpencil lereng Pegunungan Dieng dan Mojotengah (termasuk Desa Deroduwur tempat maqbarah beliau berada) melalui pendekatan santunan sosial, pembangunan jalan desa, dan penyediaan air bersih tanpa paksaan sedikit pun.',
    ],
    untoldStory:
      'Lokasi pemakaman keluarga besar Masyayikh Pondok Pesantren Al-Asy’ariyyah Kalibeber sengaja ditempatkan di **Desa Deroduwur, Kecamatan Mojotengah** (sekitar 5 km mendaki ke arah perbukitan barat dari kompleks pesantren Kalibeber) dengan pemandangan lembah Gunung Sindoro yang sangat indah dan udara pegunungan yang sejuk.<!--more-->\n\nPeziarah yang datang ke Kalibeber Wonosobo dapat mengunjungi Masjid Baitul Qur’an Pondok Pesantren Al-Asy’ariyyah untuk melihat langsung **Mushaf Al-Qur’an Akbar** karya santri Mbah Muntaha sebelum naik berziarah ke Maqbarah Deroduwur.',
    barokahHajat:
      'Peziarah, santri penghafal Al-Qur’an (*huffadz*), dan mahasiswa yang berziarah ke maqbarah KH. Muntaha Al-Hafizh di Mojotengah Wonosobo umumnya bertawassul memohon kepada Allah SWT kelancaran dan kekuatan menjaga hafalan Al-Qur’an 30 juz, integrasi antara ilmu agama dan sains modern, serta kemuliaan akhlak.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muntaha Al-Hafizh & KH. Asy’ari (Kalibeber Wonosobo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الرَّحِيمِ وَالشَّيْخِ أَشْعَرِيّ وَحَامِلِ الْقُرْآنِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ مُنْتَهَى الْحَافِظْ كَالِيبِيبِيرْ وُونُوسُوبُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا وَذُرِّيَّاتِنَا مِنْ أَهْلِ الْقُرْآنِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الرَّحِيمِ وَالشَّيْخِ أَشْعَرِيّ وَحَامِلِ الْقُرْآنِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ مُنْتَهَى الْحَافِظْ كَالِيبِيبِيرْ وُونُوسُوبُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا وَذُرِّيَّاتِنَا مِنْ أَهْلِ الْقُرْآنِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh 'Abdir-Rahiim wasy-Syaikh Asy'arii wa Haamilil-Qur-aan al-'Allaamah Kiyaahii al-Haajj Muntahaa al-Haafizh Kalibeber Wonosobo syai-un lillaahi lahumul-Faatihah. Allaahummaj'alnaa wa dzurriyyaatinaa min ahlil-Qur-aani wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Abdurrohim, KH. Asy’ari, dan pengemban Al-Qur’an Al-Allamah KH. Muntaha Al-Hafizh Kalibeber Wonosobo, Al-Fatihah. Ya Allah, jadikanlah kami dan keturunan kami termasuk Ahlul Qur’an, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Abdurrohim, KH. Asy’ari, dan pengemban Al-Qur’an Al-Allamah KH. Muntaha Al-Hafizh Kalibeber Wonosobo, Al-Fatihah. Ya Allah, jadikanlah kami dan keturunan kami termasuk Ahlul Qur’an, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Menjelang Ramadhan & 17 Dzulqa’dah (Puncak Haul Akbar Masyayikh PP Al-Asy’ariyyah & KH. Muntaha Al-Hafizh di Kalibeber & Deroduwur, Kecamatan Mojotengah, Kabupaten Wonosobo).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, menjaga kekhusyukan para penghafal Al-Qur’an yang sedang muraja’ah di kompleks maqbarah Deroduwur dan Pesantren Al-Asy’ariyyah, serta berhati-hati saat berkendara di jalur tanjakan Deroduwur.',
    facilities: ['Kompleks Maqbarah Bukit Deroduwur Mojotengah', 'Masjid Baitul Qur’an PP Al-Asy’ariyyah Kalibeber', 'Galeri Mushaf Al-Qur’an Akbar UNSIQ Wonosobo', 'Area Parkir Bus Tamu Kalibeber Mojotengah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Tim Penulis UNSIQ (2004). KH. Muntaha Al-Hafizh (1912–2004): Pecinta dan Pelestari Al-Qur’an dari Lereng Dieng. Wonosobo: UNSIQ Press.',
      'Mas’ud, Abdurrahman (2006). Dari Haramain ke Nusantara. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-makhdum-wali',
    name: 'Makam Syekh Makhdum Wali & Pangeran Senopati Mangkubumi (Pasir Luhur, Karanglewas, Banyumas)',
    title: 'Utusan Kesultanan Demak Pengislam Kadipaten Pasirluhur & Pelopor Islam Bumi Banyumas',
    description:
      'Kompleks Cagar Budaya Makam Syekh Makhdum Wali dan Adipati Banyak Belanak (Pangeran Senopati Mangkubumi I) di Desa Pasir Wetan / Pasir Luhur, Kecamatan Karanglewas, Kabupaten Banyumas—tonggak sejarah pengislaman wilayah Jawa Tengah bagian barat daya (Banyumas Raya).',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Awal Abad ke-16 M',
    province: 'Jawa Tengah',
    city: 'Banyumas',
    district: 'Kec. Karanglewas',
    address: 'Desa Pasir Wetan, Kec. Karanglewas, Kabupaten Banyumas',
    location: {
      lat: -7.4162,
      lng: 109.1935,
      address: 'Desa Pasir Wetan, Kec. Karanglewas, Kabupaten Banyumas',
      district: 'Kec. Karanglewas',
      city: 'Banyumas',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Banyumas (Kompleks Makam Syekh Makhdum Wali Pasirluhur Karanglewas)',
    sanad:
      'Ulama utusan resmi Sultan Alam Akbar Al-Fatah (Raden Patah, Kesultanan Demak Bintoro) dan Dewan Wali Songo (Sunan Kalijaga & Sunan Gunung Jati) untuk wilayah pedalaman selatan Jawa (Pasirluhur / Banyumas); guru ruhani Adipati Banyak Belanak (Pangeran Senopati Mangkubumi).',
    karya: [
      'Pengislaman secara damai Kadipaten Pasirluhur di bawah kepemimpinan Adipati Banyak Belanak pada akhir abad ke-15 M',
      'Penyebaran dakwah Islam di sepanjang lembah Sungai Logawa dan Sungai Serayu hingga Cilacap, Purbalingga, dan Banjarnegara',
      'Pelestarian warisan naskah Babad Pasirluhur sebagai dokumen historiografi Islam awal di wilayah Banyumas',
    ],
    history:
      '**Syekh Makhdum Wali** adalah ulama agung dan panglima dakwah utusan **Kesultanan Demak Bintoro** pada masa pemerintahan **Sultan Raden Patah** (akhir abad ke-15 hingga awal abad ke-16 M) yang menjadi pelopor utama masuknya agama Islam di wilayah **Pasirluhur (Banyumas Raya)**. Berdasarkan naskah klasik **Babad Pasirluhur**, setelah berdirinya Kesultanan Demak, Raden Patah mengutus Syekh Makhdum Wali bersama Pangeran Mangkubumi (putra Sunan Gunung Jati / kerabat Demak) menuju wilayah barat daya lereng selatan Gunung Slamet untuk berdakwah kepada penguasa Kadipaten Pasirluhur, **Adipati Banyak Belanak** (keturunan Raden Kamandaka / Banyak Catra).\n\nMelalui dialog yang penuh hikmah, kesantunan akhlak, serta pembuktian karomah ruhani, Adipati Banyak Belanak beserta seluruh keluarga kadipaten dan rakyat Pasirluhur memeluk agama Islam dengan sukarela. Atas jasa besarnya membantu syiar Islam di wilayah pedalaman selatan Jawa, Sultan Demak menganugerahkan gelar kehormatan **Pangeran Senopati Mangkubumi I** kepada Adipati Banyak Belanak, sementara Syekh Makhdum Wali menetap di Pasirluhur sebagai mursyid, hakim agama (*qadhi*), dan pembimbing spiritual masyarakat.\n\nBersama Pangeran Senopati Mangkubumi, Syekh Makhdum Wali mendirikan masjid-masjid kuno dan pesantren awal di sepanjang aliran Sungai Logawa dan Sungai Serayu, menjangkau wilayah yang kini menjadi Kabupaten Banyumas (Purwokerto), Purbalingga, Cilacap, hingga Kebumen. Setelah wafat pada awal abad ke-16 M, Syekh Makhdum Wali dimakamkan berdampingan dengan murid tercintanya, Pangeran Senopati Mangkubumi (Adipati Banyak Belanak), di perbukitan **Desa Pasir Wetan (eks-Kraton Pasirluhur), Kecamatan Karanglewas, Kabupaten Banyumas**.',
    karomah: [
      'Dalam naskah *Babad Pasirluhur* yang diteliti oleh filolog Belanda J. Knebel (1900), dikisahkan karomah Syekh Makhdum Wali ketika tiba di Pasirluhur: kesejukan wajah dan doa beliau sanggup meluluhkan hati Adipati Banyak Belanak beserta para senopati Pasirluhur dalam waktu singkat tanpa pertumpahan darah, sehingga Pasirluhur menjadi basis pertahanan dan dakwah Islam paling barat milik Kesultanan Demak di jalur selatan.<!--more-->\n\nDi Kompleks Makam Syekh Makhdum Wali di Desa Pasir Wetan Karanglewas masih tersimpan batu-batu umpak kuno, lesung batu, dan petilasan Masjid Pasirluhur abad ke-15 yang ditetapkan sebagai Situs Cagar Budaya Kabupaten Banyumas.',
    ],
    untoldStory:
      'Kedudukan Syekh Makhdum Wali dan Adipati Banyak Belanak sangat sentral dalam identitas kultural masyarakat *Panginyongan* (Banyumas): meskipun keturunan Pasirluhur (Adipati Thole) sempat mengalami dinamika politik di masa Sultan Trenggono, akar keislaman santri di Karanglewas, Kedungbanteng, dan Sokaraja tetap bertahan kokoh berkat fondasi yang ditanamkan Syekh Makhdum Wali.<!--more-->\n\nSetiap bulan **Sya’ban (Ruwah)** dan **Muharram (Sura)**, ribuan peziarah dari wilayah Eks-Karesidenan Banyumas memadati Kompleks Maqbarah Pasir Wetan Karanglewas untuk melaksanakan ziarah kubur dan Haul Agung Syekh Makhdum Wali.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Makhdum Wali dan Pangeran Senopati Mangkubumi di Pasirluhur Karanglewas Banyumas umumnya bertawassul memohon kepada Allah SWT keberkahan dakwah yang damai dan merangkul masyarakat, keteguhan iman keluarga, serta kelancaran rezeki dan amanah kepemimpinan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Makhdum Wali & Pangeran Senopati Mangkubumi (Pasirluhur Banyumas)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ مَخْدُومْ وَلِيّ وَالْأَمِيرِ سِينُوفَاتِي مَانْغكُوبُومِي فَاسِيرْ لُوهُورْ بَانْيُومَاسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الدَّاعِي إِلَى اللهِ الشَّيْخِ مَخْدُومْ وَلِيّ وَالْأَمِيرِ سِينُوفَاتِي مَانْغكُوبُومِي فَاسِيرْ لُوهُورْ بَانْيُومَاسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyid-Daa'ii ilallaah asy-Syaikh Makhduum Walii wal-Amiir Senopati Mangkubumi Pasirluhur Banyumas syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali pendakwah di jalan Allah Syekh Makhdum Wali dan Pangeran Senopati Mangkubumi Pasirluhur Banyumas, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali pendakwah di jalan Allah Syekh Makhdum Wali dan Pangeran Senopati Mangkubumi Pasirluhur Banyumas, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram (Sura) & Pertengahan Sya’ban (Ruwahan Agung & Haul Syekh Makhdum Wali di Desa Pasir Wetan, Kecamatan Karanglewas, Kabupaten Banyumas).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam Cagar Budaya Syekh Makhdum Wali, serta menjaga keasrian pepohonan tua di bukit Pasir Wetan.',
    facilities: ['Cungkup Maqbarah Syekh Makhdum Wali & Pangeran Senopati Mangkubumi', 'Masjid Jami’ Syekh Makhdum Wali Pasir Wetan', 'Pendopo Peziarah Cagar Budaya Pasirluhur', 'Area Parkir Peziarah Karanglewas Purwokerto Barat'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Knebel, J. (1900). Babad Pasir volgens een Banjoemaasch Handschrift. Batavia: Tijdschrift voor Indische Taal-, Land- en Volkenkunde (TBG).',
      'Priyadi, Sugeng (2002). Babad Pasirluhur: Suntingan Teks dan Terjemahan. Jakarta: Pusat Bahasa Departemen Pendidikan Nasional.',
      'De Graaf, H.J. & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa. Jakarta: Grafiti Pers.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 4. SURAKARTA (SOLO) & KLATEN
  // =========================================================================
  {
    id: 'ki-ageng-henis-laweyan',
    name: 'Makam Ki Ageng Henis / Ki Ageng Anis (Astana Pajang Laweyan, Surakarta)',
    title: 'Leluhur Raja-Raja Mataram Islam, Murid Sunan Kalijaga & Perintis Sentra Batik Laweyan Solo',
    description:
      'Kompleks Cagar Budaya Masjid dan Pasarean Laweyan di Kelurahan Laweyan, Kecamatan Laweyan, Kota Surakarta (tepat di perbatasan Desa Makamhaji, Kartasura)—tempat peristirahatan Ki Ageng Henis (putra Ki Ageng Selo dan kakek Panembahan Senopati) beserta Sultan Hadiwijaya.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (Masa Kesultanan Demak & Pajang)',
    province: 'Jawa Tengah',
    city: 'Surakarta',
    district: 'Kec. Laweyan',
    address: 'Jl. Liris No. 1, Belukan, Pajang / Kel. Laweyan, Kec. Laweyan, Kota Surakarta',
    location: {
      lat: -7.5718,
      lng: 110.7912,
      address: 'Jl. Liris No. 1, Belukan, Pajang / Kel. Laweyan, Kec. Laweyan, Kota Surakarta',
      district: 'Kec. Laweyan',
      city: 'Surakarta',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Masjid & Pasarean Ki Ageng Henis Laweyan Surakarta',
    sanad:
      'Putra tunggal Ki Ageng Selo (Abdurrahman Selo, Grobogan) dan keturunan Prabu Brawijaya V; murid dari Sunan Kalijaga; ayahanda dari Ki Ageng Pemanahan dan kakek kandung dari Panembahan Senopati (pendiri Kesultanan Mataram Islam).',
    karya: [
      'Pendirian Masjid Laweyan (1546 M, masjid tertua di Surakarta yang bertransformasi dari pura/sanggar Hindu-Jawa secara damai)',
      'Perintisan kerajinan tenun kapas (lawe) dan seni membatik di Kampung Laweyan yang melahirkan saudagar-saudagar santri Solo',
      'Pembinaan spiritual dan ketatanegaraan Sultan Hadiwijaya (Jaka Tingkir) saat memindahkan pusat kerajaan dari Demak ke Kesultanan Pajang',
    ],
    history:
      '**Ki Ageng Henis**—atau **Ki Ageng Anis** (hidup pada abad ke-16 M)—adalah tokoh kunci penghubung mata rantai spiritual dan genealogis antara **Wali Songo**, **Kesultanan Pajang**, dan **Kesultanan Mataram Islam**. Beliau adalah putra dari waliyullah masyhur **Ki Ageng Selo** (Grobogan) dan ayahanda dari **Ki Ageng Pemanahan**, yang menurunkan **Danang Sutawijaya (Panembahan Senopati)** serta seluruh raja-raja Kasunanan Surakarta, Kasultanan Yogyakarta, Mangkunegaran, dan Pakualaman.\n\nKetika murid sekaligus saudara seperguruannya, **Raden Mas Karebet (Jaka Tingkir / Sultan Hadiwijaya)**, mendirikan Kesultanan Pajang, Ki Ageng Henis diminta menetap di sebelah utara keraton, tepatnya di dusun **Laweyan** di tepi Sungai Jenes (anak Bengawan Solo) yang kala itu merupakan bandar perdagangan benang kapas (*lawe*). Di Laweyan, Ki Ageng Henis berdakwah dengan penuh kelembutan hingga tokoh biksu/pendeta setempat, **Ki Beluk**, memeluk agama Islam dan menyerahkan bangunan sanggar pemujaannya kepada Ki Ageng Henis untuk diubah menjadi **Masjid Laweyan** pada tahun **1546 M** (jauh sebelum berdirinya Keraton Kasunanan Surakarta).\n\nSelain mengajarkan ilmu tauhid dan tasawuf, Ki Ageng Henis juga mengajari masyarakat Laweyan teknik menenun kain dan membatik bermotif *tirto tejo* yang kemudian menjadikan **Kampung Batik Laweyan** sebagai sentra saudagar batik pribumi terkaya di Jawa (tempat lahirnya *Sarekat Dagang Islam* oleh H. Samanhudi pada tahun 1911). Ki Ageng Henis wafat sekitar tahun 1560-an M dan dimakamkan di Kompleks Pasarean Masjid Laweyan, Kecamatan Laweyan, Kota Surakarta.',
    karomah: [
      'Dalam naskah *Babad Tanah Jawi*, karomah terbesar Ki Ageng Henis dan ayahandanya Ki Ageng Selo adalah sabda Sunan Kalijaga bahwa keturunan langsung Ki Ageng Henis-lah yang kelak ditakdirkan oleh Allah SWT memegang tampuk kepemimpinan Tanah Jawa (Dinasti Mataram Islam), berkat keikhlasan dan riyadhah batin Ki Ageng Henis yang memilih jalan dakwah ilmu daripada berebut kekuasaan duniawi.<!--more-->\n\nDi Kompleks Masjid Laweyan masih terdapat *Sumur Tuyul / Sumur Bandung* yang airnya tidak pernah kering dan dahulu digunakan oleh Ki Ageng Henis untuk berwudhu serta memasak jamuan bagi para santri dan tamu.',
    ],
    untoldStory:
      'Arsitektur **Masjid dan Pasarean Laweyan** masih mempertahankan tata ruang transisi Hindu-Jawa ke Islam abad ke-16: bangunan terbagi menjadi tiga undakan (*Kaki, Tubuh, dan Puncak Bukit*) dengan dinding kayu jati kuno serta lorong batu yang memisahkan area masjid dengan cungkup makam para bangsawan Pajang dan Mataram.<!--more-->\n\nDi puncak bukit Pasarean Laweyan, selain pusara utama **Ki Ageng Henis**, terdapat pula makam istri beliau (**Nyai Ageng Prodobinabar**), sahabat beliau **Ki Beluk**, hingga permaisuri **Susuhunan Pakubuwono II (Kanjeng Ratu Kencana)**.',
    barokahHajat:
      'Peziarah dan para pengusaha/pengrajin batik yang berziarah ke maqbarah Ki Ageng Henis di Laweyan Surakarta umumnya bertawassul memohon kepada Allah SWT keberkahan usaha perniagaan dan kerajinan yang jujur, kemuliaan anak-cucu keturunan, serta keteduhan hati dalam berdakwah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Ki Ageng Henis (Pasarean Masjid Laweyan Surakarta)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ هِينِيسْ (أَنِيسْ) بِنْ كِي أَغِينْغ سِيلُو لَاوِيَانْ سُورَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَبَارِكْ فِي أَرْزَاقِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ هِينِيسْ (أَنِيسْ) بِنْ كِي أَغِينْغ سِيلُو لَاوِيَانْ سُورَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَبَارِكْ فِي أَرْزَاقِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Ki Ageng Henis (Anis) bin Ki Ageng Selo Laweyan Surakarta syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa baarik fii arzaaqinaa wa dzurriyyaatinaa wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Henis (Anis) bin Ki Ageng Selo Laweyan Surakarta, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, berkahilah rezeki dan keturunan kami, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Henis (Anis) bin Ki Ageng Selo Laweyan Surakarta, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, berkahilah rezeki dan keturunan kami, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Ruwah & Malam Jumat Kliwon (Ziarah Kubro & Haul Leluhur Mataram Ki Ageng Henis di Kompleks Masjid Kuno Laweyan, Kecamatan Laweyan, Kota Surakarta).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (pengunjung wanita disediakan mukena/kain penutup oleh pengurus makam), melepas alas kaki sebelum menaiki tangga batu Pasarean Laweyan, serta mematuhi tata tertib juru kunci keraton.',
    facilities: ['Masjid Kuno Laweyan (Cagar Budaya 1546 M)', 'Cungkup Utama Maqbarah Ki Ageng Henis', 'Bangsal Pendopo Peziarah Pasarean Laweyan', 'Kawasan Wisata Kampung Batik Laweyan Solo'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Olthof, W.L. (1941). Poenika Serat Babad Tanah Djawi Wiwit Saking Nabi Adam Doemoegi ing Taoen 1647. ’s-Gravenhage: Martinus Nijhoff.',
      'Brenner, Suzanne April (1998). The Domestication of Desire: Women, Wealth, and Modernity in Java (Laweyan Solo). Princeton University Press.',
      'De Graaf, H.J. (1985). Awal Kebangkitan Mataram: Masa Pemerintahan Senapati. Jakarta: Grafiti Pers.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-anis-solo',
    name: 'Makam Habib Anis bin Alwi Al-Habsyi & Habib Alwi bin Ali Al-Habsyi (Masjid Riyadh, Pasar Kliwon, Surakarta)',
    title: 'Khodimul Maulid Simthuddurar & Pusat Haul Akbar Solo yang Dihadiri Jutaan Peziarah Dunia',
    description:
      'Kompleks Maqbarah Masjid Ar-Riyadh di Jl. Kapten Mulyadi, Gurawan, Kecamatan Pasar Kliwon, Kota Surakarta—tempat peristirahatan Habib Alwi bin Ali Al-Habsyi (putra pengarang Maulid Simthuddurar, wafat 1953 M) dan putranya yang penuh senyum kesejukan, Habib Anis bin Alwi Al-Habsyi (1928–2006 M).',
    category: 'Habaib',
    era: 'Abad ke-20 – Awal Abad ke-21 M (Habib Alwi w. 1953 M; Habib Anis: 1928–2006 M)',
    province: 'Jawa Tengah',
    city: 'Surakarta',
    district: 'Kec. Pasar Kliwon',
    address: 'Kompleks Masjid Ar-Riyadh, Jl. Kapten Mulyadi, Kel. Pasar Kliwon, Kec. Pasar Kliwon, Kota Surakarta',
    location: {
      lat: -7.5812,
      lng: 110.8305,
      address: 'Kompleks Masjid Ar-Riyadh, Jl. Kapten Mulyadi, Kel. Pasar Kliwon, Kec. Pasar Kliwon, Kota Surakarta',
      district: 'Kec. Pasar Kliwon',
      city: 'Surakarta',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Habaib Surakarta (Kompleks Masjid Ar-Riyadh & Maqbarah Habib Anis Al-Habsyi Pasar Kliwon Solo)',
    sanad:
      'Al-Habib Muhammad Anis bin Alwi bin Ali bin Muhammad Al-Habsyi; cucu kandung Al-Imam Al-Quthb Habib Ali bin Muhammad Al-Habsyi (pengarang kitab Maulid Simthuddurar di Seiwun, Hadramaut); murid dari ayahandanya Habib Alwi bin Ali Al-Habsyi dan Habib Abdul Qadir bin Ahmad Bilfaqih.',
    karya: [
      'Penyebaran dan pengijazahan pembacaan Maulid Simthuddurar (Maulid Al-Habsyi) ke seluruh penjuru Nusantara hingga Asia Tenggara',
      'Penyelenggaraan Haul Solo (Haul Habib Ali bin Muhammad Al-Habsyi setiap 20 Rabiul Akhir di Masjid Riyadh) yang menjadi salah satu majelis haul terbesar di dunia Islam',
      'Keteladanan dakwah ramah dan murah senyum (Sang Penebar Senyum dari Gurawan) yang mempersatukan habaib, kiai pesantren, dan masyarakat luas',
    ],
    history:
      'Kompleks **Masjid Ar-Riyadh di Gurawan, Pasar Kliwon, Kota Surakarta (Solo)** adalah jantung kecintaan umat Islam Nusantara terhadap mahakarya sastra maulid Nabi SAW, **Simthud Durar fi Akhbar Maulidi Khairil Basyar**, yang dikarang oleh waliyullah besar Hadramaut, **Al-Imam Al-Quthb Habib Ali bin Muhammad Al-Habsyi** (1843–1915 M di Seiwun, Yaman). Putra bungsu beliau, **Al-Habib Alwi bin Ali Al-Habsyi** (wafat 20 Rabiul Awal 1373 H / 1953 M), berhijrah ke Nusantara dan mendirikan **Masjid Ar-Riyadh** di Pasar Kliwon, Solo pada tahun **1936 M**, meniru nama dan tradisi keilmuan Masjid Riyadh yang didirikan ayahandanya di Seiwun.\n\nSepeninggal Habib Alwi pada tahun 1953 M (ketika putranya masih berusia 25 tahun), kepemimpinan Masjid Ar-Riyadh dan Zawiyah Al-Habsyi dilanjutkan oleh **Al-Habib Muhammad Anis bin Alwi Al-Habsyi** (lahir di Garut, 5 Mei 1928 – wafat di Solo, 31 Oktober 2006 M). Selama lebih dari setengah abad, Habib Anis menjadi magnet spiritual Kota Solo: wajah beliau yang senantiasa tersenyum teduh, pintu rumahnya di Gurawan yang terbuka lebar bagi siapa saja tanpa memandang status sosial, serta istiqamah beliau memimpin majelis *Maulid Simthuddurar* setiap Kamis sore dan Subuh Jumat menjadikan Masjid Riyadh rujukan utama para ulama, kiai, dan muhibbin.\n\nDi bawah asuhan Habib Anis pula, peringatan **Haul Solo** (Haul kakek beliau, Habib Ali bin Muhammad Al-Habsyi, setiap tanggal **19–21 Rabiul Akhir**) tumbuh menjadi fenomena spiritual internasional yang dihadiri ratusan ribu hingga jutaan jamaah dari seluruh provinsi Indonesia, Malaysia, Singapura, Yaman, hingga Timur Tengah. Habib Anis wafat pada hari Senin, **31 Oktober 2006 M (9 Syawal 1427 H)** dan dimakamkan di samping pusara ayahandanya (**Habib Alwi**) serta pamannya (**Habib Ahmad**) tepat di sisi mihrab **Masjid Ar-Riyadh Pasar Kliwon, Kota Surakarta**.',
    karomah: [
      'Dalam kesaksian para ulama besar—termasuk KH. Abdurrahman Wahid (Gus Dur), KH. Maimoen Zubair, dan Habib Umar bin Hafidz—karomah paling nyata dari Habib Anis bin Alwi Al-Habsyi adalah *mahabbah* (cinta kasih) dan senyum tulus beliau yang sanggup mendamaikan hati orang yang sedang berselisih atau gelisah hanya dengan memandang wajah beliau di zawiyah Gurawan.<!--more-->\n\nKeberkahan Masjid Ar-Riyadh Solo juga tampak setiap perhelatan Haul Solo di bulan Rabiul Akhir: seluruh warga Pasar Kliwon dan Kota Solo berlomba-lomba membuka pintu rumah mereka serta membagikan ratusan ribu porsi *Nasi Kebuli* secara cuma-cuma kepada para peziarah tanpa pernah kekurangan sedikit pun.',
    ],
    untoldStory:
      'Di dalam cungkup maqbarah Masjid Ar-Riyadh Surakarta, bersemayam tiga tokoh agung putra dan cucu pengarang *Simthuddurar*: **Al-Habib Alwi bin Ali Al-Habsyi** (pendiri Masjid Riyadh Solo), **Al-Habib Ahmad bin Ali Al-Habsyi** (saudara kandung Habib Alwi), dan **Al-Habib Muhammad Anis bin Alwi Al-Habsyi**.<!--more-->\n\nSetiap pagi selesai shalat Subuh berjamaah pada hari Jumat, di Masjid Ar-Riyadh Pasar Kliwon rutin dibacakan *Burdah* dan *Maulid Simthuddurar* dengan irama khas Hadramaut-Solo yang sanadnya terjaga langsung dari pengarangnya.',
    barokahHajat:
      'Peziarah dan pecinta shalawat yang berziarah ke maqbarah Habib Anis dan Habib Alwi Al-Habsyi di Masjid Riyadh Solo umumnya bertawassul memohon kepada Allah SWT kecintaan yang tulus kepada Rasulullah SAW dan *Ahlul Bait*, kelapangan dada dan keindahan akhlak, serta keberkahan majelis maulid dan keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Habib Alwi & Habib Anis bin Alwi Al-Habsyi (Masjid Riyadh Solo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْحَبِيبِ عَلِيِّ بْنِ مُحَمَّدٍ الْحَبْشِيِّ وَوَلَدِهِ الْحَبِيبِ عَلْوِي بْنِ عَلِيٍّ وَحَفِيدِهِ الْحَبِيبِ مُحَمَّدْ أَنِيسْ بْنِ عَلْوِي الْحَبْشِيِّ سُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا كَمَالَ الْمَحَبَّةِ وَالْمُتَابَعَةِ لِنَبِيِّكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْحَبِيبِ عَلِيِّ بْنِ مُحَمَّدٍ الْحَبْشِيِّ وَوَلَدِهِ الْحَبِيبِ عَلْوِي بْنِ عَلِيٍّ وَحَفِيدِهِ الْحَبِيبِ مُحَمَّدْ أَنِيسْ بْنِ عَلْوِي الْحَبْشِيِّ سُولُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا كَمَالَ الْمَحَبَّةِ وَالْمُتَابَعَةِ لِنَبِيِّكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbil-Habiib 'Alii bin Muhammad al-Habsyii wa waladihil-Habiib 'Alwii bin 'Alii wa hafiidihil-Habiib Muhammad Aniis bin 'Alwii al-Habsyii Solo syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa kamaalal-mahabbati wal-mutaaba'ati li Nabiyyika wanfa'naa bi asraarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Quthb Habib Ali bin Muhammad Al-Habsyi, putranya Habib Alwi bin Ali, dan cucunya Habib Muhammad Anis bin Alwi Al-Habsyi Solo, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kesempurnaan cinta dan keteladanan kepada Nabi-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Quthb Habib Ali bin Muhammad Al-Habsyi, putranya Habib Alwi bin Ali, dan cucunya Habib Muhammad Anis bin Alwi Al-Habsyi Solo, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kesempurnaan cinta dan keteladanan kepada Nabi-Mu, serta limpahkanlah kemanfaatan melalui rahasia hikmah dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '19–21 Rabiul Akhir (Puncak Haul Akbar Habib Ali bin Muhammad Al-Habsyi / Haul Solo) & 9 Syawal (Haul Habib Anis Al-Habsyi di Masjid Ar-Riyadh, Pasar Kliwon, Kota Surakarta).',
    localAdab:
      'Wajib mengenakan busana muslim yang rapi dan menutup aurat (disunnahkan berbusana putih dan memakai wewangian non-alkohol), memisahkan jalur peziarah laki-laki dan perempuan sesuai pengaturan takmir Masjid Ar-Riyadh, serta menjaga adab di dalam rumah ibadah.',
    facilities: ['Masjid Ar-Riyadh Pasar Kliwon Surakarta', 'Cungkup Maqbarah Habib Alwi & Habib Anis Al-Habsyi', 'Zawiyah Majelis Maulid Simthuddurar', 'Sentra Kuliner & Oleh-Oleh Timur Tengah Pasar Kliwon Solo'],
    openingHours: 'Buka Setiap Hari 04.00 – 22.00 WIB (Mengikuti jadwal operasional Masjid Ar-Riyadh)',
    references: [
      'Al-Habsyi, Husin Anis (2007). Biografi Habib Anis bin Alwi Al-Habsyi: Sang Penebar Senyum dari Gurawan. Surakarta: Pustaka Zawiyah.',
      'Alatas, Ismail Fajrie (2021). What Is Religious Authority? Cultivating Islamic Communities in Indonesia (Studi Majelis & Haul Habib Ali di Solo). Princeton University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'ki-ageng-gribig-jatinom',
    name: 'Makam Ki Ageng Gribig (Sayyid Wasibagno Timur — Jatinom, Klaten)',
    title: 'Ulama Agung Penasihat Sultan Agung Mataram & Pelopor Tradisi Sebaran Apem Ya Qowiyyu (1619 M)',
    description:
      'Kompleks Cagar Budaya Masjid Besar dan Maqbarah Ki Ageng Gribig (wafat ~1645 M) di Kelurahan Krajan, Kecamatan Jatinom, Kabupaten Klaten—ulama keturunan Brawijaya V / Kesultanan Demak yang mewariskan tradisi sedekah *Ya Qowiyyu* setiap bulan Safar.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-16 – Pertengahan Abad ke-17 M',
    province: 'Jawa Tengah',
    city: 'Klaten',
    district: 'Kec. Jatinom',
    address: 'Kompleks Masjid Besar Jatinom, Kel. Krajan, Kec. Jatinom, Kabupaten Klaten',
    location: {
      lat: -7.6285,
      lng: 110.5982,
      address: 'Kompleks Masjid Besar Jatinom, Kel. Krajan, Kec. Jatinom, Kabupaten Klaten',
      district: 'Kec. Jatinom',
      city: 'Klaten',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Klaten (Masjid Alit, Masjid Besar & Maqbarah Ki Ageng Gribig Jatinom)',
    sanad:
      'Sayyid Wasibagno Timur (Ki Ageng Gribig), keturunan Prabu Brawijaya V dari jalur Raden Bondan Kejawan / Pangeran Puger Demak; menunaikan ibadah haji dan menuntut ilmu di Makkah Al-Mukarramah; guru spiritual sekaligus besan/mertua saudara perempuan Sultan Agung Hanyakrakusuma (Mataram).',
    karya: [
      'Pendirian Masjid Alit Jatinom dan perintisan Desa Perdikan Jatinom di lereng timur Gunung Merapi, Klaten',
      'Perintisan tradisi dakwah sedekah kue Apem (dari kata Arab ’Afwan = permohonan ampunan) dan zikir Ya Qowiyyu sejak 15 Safar tahun 1541 Saka (1619 M)',
      'Pendampingan spiritual Sultan Agung Mataram dalam menata perdamaian wilayah pedalaman Jawa',
    ],
    history:
      '**Ki Ageng Gribig**—yang memiliki nama asli **Wasibagno Timur** (wafat pada pertengahan abad ke-17 M)—adalah ulama besar dan bangsawan sufi pada masa kejayaan **Kesultanan Mataram Islam** di bawah pemerintahan **Sultan Agung Hanyakrakusuma** (1613–1645 M). Beliau memilih meninggalkan gemerlap istana untuk membuka pusat dakwah Islam di daerah **Jatinom** (lereng timur Gunung Merapi, Kabupaten Klaten), yang dinamai dari pohon *Jati Enom* (jati muda) tempat beliau pertama kali berkhalwat dan mendirikan **Masjid Alit Jatinom**.\n\nKisah historis yang paling masyhur dari Ki Ageng Gribig terjadi sepulang beliau menunaikan ibadah haji dan bermukim menuntut ilmu di Tanah Suci Makkah sekitar tahun **1541 Saka / 1619 M**. Beliau membawa oleh-oleh berupa tiga buah kue hangat dari Makkah untuk dibagikan kepada cucu-cucu dan para santrinya di Jatinom. Karena jumlah tamu dan tetangga yang datang menyambut sangat banyak sementara kue dari Makkah tidak mencukupi, Ki Ageng Gribig meminta istrinya, **Nyai Ageng Gribig**, membuat kue bundar dari tepung beras yang dicampur sisa kue Makkah tersebut dan membagikannya secara merata kepada seluruh warga sambil mengajak mereka melantunkan doa memohon ampunan (*"’Afwan"*—yang oleh lidah masyarakat Jawa dilafalkan menjadi **Apem**).\n\nSeiring berjalannya waktu, setiap pertengahan bulan **Safar (Sapar)** Ki Ageng Gribig menganjurkan masyarakat Jatinom bersedekah kue *Apem* sebagai wujud syukur kepada Allah SWT sekaligus berdoa dengan wirid **Asmaul Husna: "Yaa Qowiyyu, Yaa ’Aziiz, qowwinaa wal-muslimiin"** (*Wahai Dzat Yang Maha Kuat, Wahai Dzat Yang Maha Perkasa, kuatkanlah iman kami dan kaum muslimin*). Tradisi yang telah berlangsung lebih dari 400 tahun ini kini dikenal sebagai perayaan **Saparan Ya Qowiyyu Jatinom** (Warisan Budaya Takbenda Nasional). Ki Ageng Gribig wafat pada pertengahan abad ke-17 M dan dimakamkan di Kompleks Maqbarah barat **Masjid Besar Jatinom, Kabupaten Klaten**.',
    karomah: [
      'Dalam babad Mataram dan tradisi lisan masyarakat Jatinom Klaten, karomah Ki Ageng Gribig tampak dari keberkahan sedekah kue *Apem Ya Qowiyyu*: selama empat abad lebih sejak tahun 1619 M, setiap bulan Safar masyarakat Jatinom secara sukarela menyedekahkan hingga **6 hingga 8 ton kue apem** kepada ratusan ribu peziarah yang datang dari seluruh Indonesia, dan warga Jatinom meyakini siapa yang ikhlas bersedekah di bulan Safar justru dilipatgandakan hasil panen serta rezekinya oleh Allah SWT.<!--more-->\n\nTidak jauh dari Kompleks Makam Ki Ageng Gribig terdapat **Sendang Plampeyan** dan **Oro-Oro Tarwiyah** yang airnya dahulu dibuka oleh Ki Ageng Gribig untuk mencukupi kebutuhan wudhu dan pertanian warga lereng Merapi.',
    ],
    untoldStory:
      'Di Jatinom Klaten terdapat dua masjid bersejarah yang berkaitan erat dengan Ki Ageng Gribig: pertama, **Masjid Alit (Masjid Tiban)** yang dibangun langsung oleh Ki Ageng Gribig dengan mihrab dan tata ruang asli abad ke-17; kedua, **Masjid Besar Jatinom** yang berada tepat di depan kompleks maqbarah beliau dan terhubung langsung dengan lapangan **Sendang Plampeyan** tempat panggung *Gunungan Apem Ya Qowiyyu* didirikan.<!--more-->\n\nDi dalam cungkup utama Maqbarah Ki Ageng Gribig, pusara beliau berdampingan dengan makam permaisurinya (**Ratu Emas / adik Sultan Agung Mataram**) serta para ulama penerus perdikan Jatinom.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Ki Ageng Gribig di Jatinom Klaten umumnya bertawassul memohon kepada Allah SWT kekuatan lahir dan batin (*Yaa Qowiyyu*) dalam menghadapi ujian hidup, ampunan dosa (*’Afwan*), serta keberkahan rezeki dan pertanian.',
    doaKhusus: [
      {
        title: 'Doa Wirid Ya Qowiyyu & Tawassul Ki Ageng Gribig (Jatinom Klaten)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ غْرِيبِيغْ جَاتِينُومْ كَلَاتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. يَا قَوِيُّ يَا عَزِيزُ قَوِّنَا وَالْمُسْلِمِينَ، يَا غَنِيُّ يَا حَمِيدُ أَغْنِنَا وَالْمُسْلِمِينَ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ غْرِيبِيغْ جَاتِينُومْ كَلَاتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. يَا قَوِيُّ يَا عَزِيزُ قَوِّنَا وَالْمُسْلِمِينَ، يَا غَنِيُّ يَا حَمِيدُ أَغْنِنَا وَالْمُسْلِمِينَ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Ki Ageng Gribig Jatinom Klaten syai-un lillaahi lahumul-Faatihah. Yaa Qawiyyu Yaa 'Aziizu qawwinaa wal-muslimiin, Yaa Ghaniyyu Yaa Hamiidu aghninaa wal-muslimiin bi rahmatika Yaa Arhamar-Raahimiin.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Gribig Jatinom Klaten, Al-Fatihah. Wahai Dzat Yang Maha Kuat lagi Maha Perkasa, kuatkanlah iman kami dan kaum muslimin; Wahai Dzat Yang Maha Kaya lagi Maha Terpuji, cukupkanlah rezeki kami dan kaum muslimin dengan rahmat-Mu wahai Dzat Yang Maha Penyayang.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Gribig Jatinom Klaten, Al-Fatihah. Wahai Dzat Yang Maha Kuat lagi Maha Perkasa, kuatkanlah iman kami dan kaum muslimin; Wahai Dzat Yang Maha Kaya lagi Maha Terpuji, cukupkanlah rezeki kami dan kaum muslimin dengan rahmat-Mu wahai Dzat Yang Maha Penyayang.',
      },
    ],
    haulSchedule:
      'Hari Jumat terdekat dengan 15 Safar (Puncak Haul Akbar Ki Ageng Gribig & Tradisi Sebaran Apem Ya Qowiyyu di Kompleks Masjid Besar & Sendang Plampeyan, Kecamatan Jatinom, Kabupaten Klaten).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi Masjid Besar Jatinom dan cungkup makam Ki Ageng Gribig, serta menjaga ketertiban saat mengikuti zikir maupun tradisi Ya Qowiyyu.',
    facilities: ['Cungkup Utama Maqbarah Ki Ageng Gribig', 'Masjid Besar Jatinom & Masjid Alit Kuno', 'Kawasan Sendang Plampeyan & Panggung Ya Qowiyyu', 'Terminal Parkir Wisata Religi Jatinom Klaten'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Pigeaud, Th.G.Th. (1960). Java in the 14th Century: A Study in Cultural History. The Hague: Martinus Nijhoff.',
      'Kementerian Pendidikan dan Kebudayaan RI — Penetapan Tradisi Saparan Ya Qowiyyu Ki Ageng Gribig Jatinom Klaten sebagai Warisan Budaya Takbenda Indonesia.',
      'De Graaf, H.J. (1986). Puncak Kekuasaan Mataram: Politik Ekspansi Sultan Agung. Jakarta: Grafiti Pers.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 5. DAERAH ISTIMEWA YOGYAKARTA (MATARAM ISLAM & ULAMA BESAR JOGJA)
  // =========================================================================
  {
    id: 'syekh-maulana-maghribi-parangtritis',
    legacyId: 'auliya-9',
    name: 'Makam Syekh Maulana Maghribi (Puncak Bukit Sentono, Parangtritis, Bantul)',
    title: 'Waliyullah Sufi Pelopor Syiar Islam Pesisir Selatan Jawa di Bukit Sentono Parangtritis',
    description:
      'Kompleks Cagar Budaya Makam Syekh Maulana Maghribi (Syekh Jumadil Qubro / Maulana Ibrahim As-Samarkandi dalam tradisi pesisir selatan) di puncak Bukit Sentono, Desa Parangtritis, Kecamatan Kretek, Kabupaten Bantul, DI Yogyakarta.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 – Abad ke-16 M',
    province: 'DI Yogyakarta',
    city: 'Bantul',
    district: 'Kec. Kretek',
    address: 'Puncak Bukit Sentono, Girijati / Desa Parangtritis, Kec. Kretek, Kabupaten Bantul',
    location: {
      lat: -8.0185,
      lng: 110.3324,
      address: 'Puncak Bukit Sentono, Girijati / Desa Parangtritis, Kec. Kretek, Kabupaten Bantul',
      district: 'Kec. Kretek',
      city: 'Bantul',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pesisir Selatan Yogyakarta (Makam Syekh Maulana Maghribi Bukit Sentono Parangtritis)',
    sanad:
      'Ulama sufi keturunan Rasulullah SAW asal wilayah Maghrib / Persia-Samarkand yang berdakwah di sepanjang pesisir Jawa pada abad ke-15 hingga ke-16 M; guru spiritual bagi pangeran-pangeran pelarian akhir Majapahit di Parangtritis (seperti Raden Jokowat / Syekh Bela-Belu dan Gagak Emprit).',
    karya: [
      'Pendirian zawiyah khalwat dan mercusuar dakwah tauhid pertama di pesisir pantai selatan Jawa (Bukit Sentono, Parangtritis)',
      'Pengislaman para bangsawan Majapahit yang mengasingkan diri di pesisir selatan (Raden Dhandhun / Syekh Bela-Belu dan Raden Dhandher / Syekh Gagak Emprit)',
      'Penanaman tradisi zikir dan riyadhah malam Selasa Kliwon dan Jumat Kliwon di perbukitan Parangtritis',
    ],
    history:
      '**Syekh Maulana Maghribi** adalah gelar penghormatan bagi ulama sufi pengembara asal negeri Barat (*Al-Maghrib* / Timur Tengah) yang menjadi mercusuar awal masuknya cahaya tauhid di kawasan **Pesisir Pantai Selatan Jawa (Parangtritis, Kabupaten Bantul, DI Yogyakarta)** pada abad ke-15 hingga ke-16 M. Dalam historiografi Jawa, terdapat beberapa situs maqbarah dan petilasan yang menyandang nama *Syekh Maulana Maghribi* (seperti di Ujungnegoro Batang, Pantaran Boyolali, Jatinom, dan Baturaden), namun situs di puncak **Bukit Sentono, Parangtritis, Kecamatan Kretek, Bantul** memiliki kedudukan spiritual yang sangat khusus bagi Kesultanan Mataram dan masyarakat Yogyakarta.\n\nBerdasarkan naskah babad lokal dan tradisi lisan pesisir selatan, Syekh Maulana Maghribi memilih puncak Bukit Sentono—sebuah tebing karang tinggi yang menghadap langsung ke deburan ombak Samudra Hindia dan muara Sungai Opak—sebagai tempat *uzlah* (khalwat), shalat malam, dan mengajar ilmu ma’rifat. Kehadiran beliau yang memancarkan kewibawaan ruhani menarik perhatian para bangsawan pelarian Majapahit yang bertapa di gua-gua sekitar Parangtritis, termasuk putra Prabu Brawijaya V yakni **Raden Dhandhun (Syekh Bela-Belu)**.\n\nMelalui bimbingan lembut Syekh Maulana Maghribi, kawasan Parangtritis yang semula kental dengan tapa-brata pra-Islam bertransformasi menjadi titik temu spiritual para pencari Tuhan (*salik*). Hingga kini, kompleks cungkup Makam Syekh Maulana Maghribi di puncak Bukit Sentono dirawat dengan tata tertib keraton yang ketat oleh para abdi dalem juru kunci (*Kanca Juru Suranata*) Kasultanan Ngayogyakarta Hadiningrat.',
    karomah: [
      'Dalam tradisi lisan masyarakat Bantul dan abdi dalem Parangtritis, dikisahkan karomah Syekh Maulana Maghribi ketika berdakwah kepada para pertapa sakti di pesisir selatan: sehelai sorban dan keteduhan zikir beliau mampu menundukkan kesaktian kanuragan para pangeran pelarian Majapahit hingga mereka bersimpuh mengucap dua kalimat syahadat dan menjadi murid setia beliau.<!--more-->\n\nDari pelataran pendopo Makam Syekh Maulana Maghribi di puncak Bukit Sentono (setelah menaiki ratusan anak tangga batu), peziarah dapat menyaksikan bentangan garis pantai selatan Parangtritis–Parangkusumo yang megah sambil bertafakur atas kebesaran ciptaan Allah SWT.',
    ],
    untoldStory:
      'Bangunan cungkup Makam Syekh Maulana Maghribi di Bukit Sentono Parangtritis dikelilingi oleh pagar tembok bata putih bergaya arsitektur Mataram kuno (*cepuri*) dan pohon-pohon kamboja tua yang berusia ratusan tahun.<!--more-->\n\nDi kompleks ziarah perbukitan Parangtritis, peziarah lazimnya memulai ziarah ke puncak tertinggi yakni **Makam Syekh Maulana Maghribi** di Bukit Sentono, kemudian turun sedikit ke arah barat menuju **Makam Syekh Bela-Belu** dan **Makam Syekh Siti Jenar / Gagak Emprit** yang masih berada dalam satu gugusan perbukitan Kretek, Bantul.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Maulana Maghribi di Bukit Sentono Parangtritis Bantul umumnya bertawassul memohon kepada Allah SWT keteguhan tauhid di tengah gelombang ujian hidup, kejernihan mata hati (*bashirah*) dalam berzikir, serta keselamatan lahir dan batin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Maulana Maghribi (Bukit Sentono Parangtritis Bantul)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ مَوْلَانَا الْمَغْرِبِيِّ جَبَلِ سِينْتُونُو فَارَانْغ تْرِيتِيسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَنَوِّرْ قُلُوبَنَا بِنُورِ التَّوْحِيدِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الشَّيْخِ مَوْلَانَا الْمَغْرِبِيِّ جَبَلِ سِينْتُونُو فَارَانْغ تْرِيتِيسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَنَوِّرْ قُلُوبَنَا بِنُورِ التَّوْحِيدِ وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah asy-Syaikh Maulaanaa al-Maghribii Jabal Sentono Parangtritis syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa nawwir quluubanaa bi nuurit-tauhiidi wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Maulana Maghribi Bukit Sentono Parangtritis, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, terangilah hati kami dengan cahaya tauhid, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Syekh Maulana Maghribi Bukit Sentono Parangtritis, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, terangilah hati kami dengan cahaya tauhid, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram (1 Sura) & Malam Selasa Kliwon / Jumat Kliwon (Ziarah & Mujahadah di Kompleks Makam Syekh Maulana Maghribi, Bukit Sentono, Parangtritis, Kecamatan Kretek, Kabupaten Bantul).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melapor dan mengikuti tata tertib abdi dalem juru kunci Bukit Sentono, serta meluruskan niat ziarah semata-mata karena Allah SWT dan menjauhi segala bentuk kemusyrikan.',
    facilities: ['Cungkup Utama Makam Syekh Maulana Maghribi', 'Bangsal Pendopo Peziarah Bukit Sentono', 'Musholla & Tempat Wudhu Puncak Bukit Sentono', 'Area Parkir Bawah Tangga Parangtritis Kretek Bantul'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Woodward, Mark R. (2011). Java, Indonesia and Islam. Dordrecht: Springer.',
      'Dinas Kebudayaan (Kundha Kabudayan) Daerah Istimewa Yogyakarta — Inventarisasi Situs Cagar Budaya Makam Syekh Maulana Maghribi Parangtritis Bantul.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-bela-belu',
    name: 'Makam Syekh Bela-Belu (Raden Dhandhun / Joko Bandem — Parangtritis, Bantul)',
    title: 'Pangeran Majapahit Murid Syekh Maulana Maghribi & Waliyullah Sufi Pesisir Parangtritis',
    description:
      'Kompleks Cagar Budaya Makam Syekh Bela-Belu (Raden Dhandhun / Raden Joko Bandem) dan Syekh Gagak Emprit di perbukitan Desa Parangtritis, Kecamatan Kretek, Kabupaten Bantul, DI Yogyakarta.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Abad ke-16 M',
    province: 'DI Yogyakarta',
    city: 'Bantul',
    district: 'Kec. Kretek',
    address: 'Bukit Parangtritis, Desa Parangtritis, Kec. Kretek, Kabupaten Bantul',
    location: {
      lat: -8.0198,
      lng: 110.3302,
      address: 'Bukit Parangtritis, Desa Parangtritis, Kec. Kretek, Kabupaten Bantul',
      district: 'Kec. Kretek',
      city: 'Bantul',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pesisir Selatan Yogyakarta (Kompleks Makam Syekh Bela-Belu Parangtritis Bantul)',
    sanad:
      'Raden Dhandhun (Raden Joko Bandem), putra Prabu Brawijaya V (raja terakhir Majapahit) yang mengembara ke pantai selatan bersama adiknya Raden Dhandher (Syekh Gagak Emprit); memeluk Islam dan berguru ilmu hakikat langsung kepada Syekh Maulana Maghribi di Bukit Sentono Parangtritis.',
    karya: [
      'Perintisan komunitas santri dan pertapaan sufi di perbukitan barat Parangtritis bersama Syekh Gagak Emprit',
      'Keteladanan tasawuf kesederhanaan (zuhud) yang meninggalkan atribut kebangsawanan istana demi mengabdi kepada Allah SWT dan masyarakat nelayan/petani',
    ],
    history:
      '**Syekh Bela-Belu**—yang memiliki nama asli **Raden Dhandhun** atau **Raden Joko Bandem** (hidup pada akhir abad ke-15 hingga abad ke-16 M)—adalah seorang pangeran putra raja terakhir Majapahit, **Prabu Brawijaya V**, yang memilih menanggalkan jubah kebangsawanannya dan menempuh jalan sufi di pesisir pantai selatan Yogyakarta. Saat terjadi pergolakan politik di ibu kota Majapahit, Raden Dhandhun bersama adik kandungnya, **Raden Dhandher**, mengembara ke arah selatan hingga tiba di perbukitan karang **Parangtritis, Kecamatan Kretek, Kabupaten Bantul**.\n\nDi perbukitan Parangtritis, Raden Dhandhun yang semula gemar memasak dan menikmati hidangan lezat (*belah-beluh* / *bela-belu* dalam bahasa Jawa kuno yang bermakna gemar mengolah masakan atau apa adanya tanpa kepura-puraan) bertemu dengan waliyullah besar **Syekh Maulana Maghribi** yang sedang berkhalwat di Bukit Sentono. Setelah berdialog tentang hakikat penciptaan alam semesta dan menyaksikan kemuliaan akhlak Syekh Maulana Maghribi, Raden Dhandhun dan adiknya Raden Dhandher mengucap dua kalimat syahadat dan memeluk agama Islam.\n\nAtas bimbingan Syekh Maulana Maghribi, Raden Dhandhun menjalani *riyadhah* penyucian jiwa hingga mencapai derajat kewalian dan digelari **Syekh Bela-Belu**, sementara adiknya digelari **Syekh Gagak Emprit**. Keduanya berdakwah membina masyarakat pesisir selatan dengan pendekatan kerakyatan yang hangat dan bersahaja. Setelah wafat, Syekh Bela-Belu dimakamkan di perbukitan **Parangtritis, Kecamatan Kretek, Kabupaten Bantul** (di sebelah barat Bukit Sentono Makam Syekh Maulana Maghribi).',
    karomah: [
      'Dalam tradisi lisan masyarakat Parangtritis dan catatan abdi dalem juru kunci, karomah Syekh Bela-Belu terletak pada sifat *ikhlas* dan *wara’* beliau yang menyembunyikan derajat kewaliannya di balik penampilan sederhana seorang juru masak dan petani biasa (*wali mastur*), sehingga siapa pun yang datang kepada beliau merasa diterima dan dijamu dengan penuh kasih sayang.<!--more-->\n\nHingga kini, peziarah yang memiliki hajat membuka usaha kuliner, rumah makan, maupun perniagaan hasil bumi banyak yang berziarah dan bertawassul di maqbarah Syekh Bela-Belu Parangtritis memohon keberkahan rezeki yang halal dan melimpah.',
    ],
    untoldStory:
      'Kompleks Makam Syekh Bela-Belu di Parangtritis memiliki tangga pendakian tersendiri yang rindang oleh pepohonan jati dan kamboja, serta dilengkapi bangsal pendopo kayu tempat para peziarah beristirahat dan membaca tahlil.<!--more-->\n\nDi dekat cungkup utama Syekh Bela-Belu terdapat pula makam adik seperjuangannya, **Syekh Gagak Emprit (Raden Dhandher)**, yang menunjukkan betapa eratnya ikatan persaudaraan ruhani kedua putra Majapahit ini hingga akhir hayat.',
    barokahHajat:
      'Peziarah dan pelaku usaha kuliner/perniagaan yang berziarah ke maqbarah Syekh Bela-Belu di Parangtritis Bantul umumnya bertawassul memohon kepada Allah SWT ketulusan hati tanpa kepura-puraan (*ikhlas*), kelancaran dan keberkahan usaha pangan/kuliner, serta kerukunan persaudaraan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Bela-Belu & Syekh Gagak Emprit (Parangtritis Bantul)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بيلَا بيلُو (رَادِينْ دَانْدُونْ) وَالشَّيْخِ غَاغَاكْ إِمْفْرِيتْ فَارَانْغ تْرِيتِيسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَوَسِّعْ أَرْزَاقَنَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بيلَا بيلُو (رَادِينْ دَانْدُونْ) وَالشَّيْخِ غَاغَاكْ إِمْفْرِيتْ فَارَانْغ تْرِيتِيسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَوَسِّعْ أَرْزَاقَنَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih asy-Syaikh Bela-Belu (Raden Dhandhun) wasy-Syaikh Gagak Emprit Parangtritis syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wa wassi' arzaaqanaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Bela-Belu (Raden Dhandhun) dan Syekh Gagak Emprit Parangtritis, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, luaskanlah rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Bela-Belu (Raden Dhandhun) dan Syekh Gagak Emprit Parangtritis, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, luaskanlah rezeki kami, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram (Sura) & Malam Jumat Kliwon / Selasa Kliwon (Ziarah Rutin & Haul Syekh Bela-Belu di Perbukitan Parangtritis, Kecamatan Kretek, Kabupaten Bantul).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki pendopo dan cungkup makam Syekh Bela-Belu, serta menjaga adab ziarah sesuai tuntunan syariat Islam.',
    facilities: ['Cungkup Maqbarah Syekh Bela-Belu & Syekh Gagak Emprit', 'Pendopo Peziarah Bukit Parangtritis', 'Musholla & Kamar Mandi Peziarah', 'Area Parkir Wisata Religi Parangtritis Bantul'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Dinas Kebudayaan (Kundha Kabudayan) Daerah Istimewa Yogyakarta — Direktori Cagar Budaya dan Situs Ziarah Pesisir Selatan Bantul.',
      'Woodward, Mark R. (1989). Islam in Java: Normative Piety and Mysticism in the Sultanate of Yogyakarta. University of Arizona Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'panembahan-senopati-kotagede',
    name: 'Makam Panembahan Senopati, Ki Ageng Pemanahan & Sultan Hadiwijaya (Pasarean Agung Kotagede, Yogyakarta)',
    title: 'Pendiri Kesultanan Mataram Islam (1587–1601 M) & Kompleks Masjid Gedhe Mataram Kotagede',
    description:
      'Kompleks Cagar Budaya Nasional Masjid Gedhe Mataram dan Pasarean Kerajaan Kotagede di Desa Jagalan (perbatasan Kecamatan Kotagede Kota Yogyakarta dan Kecamatan Banguntapan Kabupaten Bantul, DI Yogyakarta)—peristirahatan Panembahan Senopati, Ki Ageng Pemanahan, dan Sultan Hadiwijaya (Jaka Tingkir).',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – Awal Abad ke-17 M (Panembahan Senopati wafat 1601 M)',
    province: 'DI Yogyakarta',
    city: 'Yogyakarta',
    district: 'Kec. Kotagede',
    address: 'Kompleks Masjid Gedhe Mataram Kotagede, Jl. Masjid Mataram, Jagalan, Kotagede, Yogyakarta',
    location: {
      lat: -7.8295,
      lng: 110.3982,
      address: 'Kompleks Masjid Gedhe Mataram Kotagede, Jl. Masjid Mataram, Jagalan, Kotagede, Yogyakarta',
      district: 'Kec. Kotagede',
      city: 'Yogyakarta',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Cagar Budaya Masjid Gedhe Mataram & Pasarean Agung Panembahan Senopati Kotagede Yogyakarta',
    sanad:
      'Danang Sutawijaya (Panembahan Senopati ing Alaga Sayidin Panatagama Khalifatullah, wafat 1601 M) adalah putra Ki Ageng Pemanahan bin Ki Ageng Henis bin Ki Ageng Selo; anak angkat Sultan Hadiwijaya (Jaka Tingkir, Sultan Pajang); murid ruhani utama Sunan Kalijaga.',
    karya: [
      'Pendirian Kesultanan Mataram Islam di Alas Mentaok / Kotagede (Pasar Gedhe) pada tahun 1586/1587 M',
      'Pembangunan Masjid Gedhe Mataram Kotagede bersama Sunan Kalijaga sebagai masjid kerajaan tertua di Daerah Istimewa Yogyakarta',
      'Penyatuan kembali wilayah Jawa Tengah dan Jawa Timur di bawah panji Kesultanan Mataram Islam dengan gelar Sayidin Panatagama',
    ],
    history:
      '**Panembahan Senopati**—yang memiliki nama kecil **Danang Sutawijaya** atau *Raden Bagus Dananjaya* dan bergelar lengkap **Panembahan Senopati ing Alaga Sayidin Panatagama Khalifatullah** (memerintah 1587–1601 M)—adalah pendiri dan penguasa pertama **Kesultanan Mataram Islam**, kerajaan Islam terbesar di pedalaman Pulau Jawa yang menjadi induk dari Kasunanan Surakarta dan Kasultanan Yogyakarta. Ayahanda beliau, **Ki Ageng Pemanahan**, menerima hadiah tanah *Alas Mentaok* dari **Sultan Hadiwijaya (Jaka Tingkir, Sultan Pajang)** pada tahun 1556 M. Bersama ayahandanya dan pamannya **Ki Juru Martani**, Danang Sutawijaya membuka hutan lebat Mentaok menjadi kota praja yang makmur bernama **Kotagede (Kitha Ageng / Pasar Gedhe)**.\n\nDalam perjalanan membangun kedaulatan Mataram, Danang Sutawijaya mendapat bimbingan spiritual langsung dari **Sunan Kalijaga** ketika sang wali berkunjung ke Kotagede. Sunan Kalijaga menasihati Sutawijaya bahwa benteng sejati seorang raja muslim bukanlah sekadar tembok bata yang tinggi, melainkan keadilan, kedermawanan kepada rakyat, dan ketakwaan kepada Allah SWT, seraya menetapkan arah kiblat bagi pembangunan **Masjid Gedhe Mataram Kotagede** (sekitar tahun 1587 M).\n\nPanembahan Senopati berhasil mempersatukan kadipaten-kadipaten di Jawa Tengah, Pasundan timur, hingga Jawa Timur di bawah panji Kesultanan Mataram. Beliau wafat di Kajenar pada tahun **1601 M** dan dimakamkan tepat di sebelah selatan kaki pusara ayahandanya (**Ki Ageng Pemanahan**, wafat 1584 M) di dalam cungkup utama **Pasarean Agung Kerajaan Mataram Kotagede**, berdampingan dengan Masjid Gedhe Mataram Kotagede, Yogyakarta.',
    karomah: [
      'Dalam naskah *Babad Tanah Jawi* dan historiografi H.J. de Graaf (*Awal Kebangkitan Mataram*), ketokohan Panembahan Senopati dikenal karena kekuatan riyadhah tirakatnya—mulai dari bertafakur di batu gilang *Selo Gilang* Lipuro hingga munajat di muara Sungai Opak Parangkusumo—serta ketawadhuan beliau yang memilih dimakamkan dengan posisi kepala menyentuh bagian kaki makam ayahandanya, Ki Ageng Pemanahan, sebagai tanda bakti seorang anak (*birrul walidain*) yang abadi.<!--more-->\n\nDi dalam cungkup Pasarean Agung Kotagede yang dijaga oleh *Abdi Dalem Juru Kunci Surakarta dan Yogyakarta* ini, bersemayam pula tokoh-tokoh raksasa sejarah Jawa: **Sultan Hadiwijaya (Jaka Tingkir, Sultan Pajang)**, **Ki Ageng Pemanahan**, **Ki Juru Martani**, **Panembahan Hanyakrawati (Seda ing Krapyak)**, hingga **Sultan Hamengkubuwono II** dan **KGPAA Paku Alam I–IV**.',
    ],
    untoldStory:
      'Kompleks Masjid Gedhe dan Pasarean Kotagede memadukan arsitektur *Gapura Paduraksa* dan *Candi Bentar* berukir indah dengan **Sendang Seliran** (kolam pemandian kuno di selatan makam yang mata airnya berasal dari bawah pusara Panembahan Senopati dan dihuni ikan lele langka).<!--more-->\n\nBagi peziarah yang ingin masuk ke dalam cungkup utama (*Prabayeksa*) Makam Panembahan Senopati di Kotagede, terdapat aturan adat keraton yang masih berlaku sejak ratusan tahun lalu: cungkup dalam dibuka pada hari **Minggu, Senin, Kamis, dan Jumat** pukul 08.00–16.00 WIB, dan peziarah yang masuk ke cungkup dalam wajib mengenakan **Busana Adat Jawa Peranakan** (yang dapat disewa di loket abdi dalem setempat), sedangkan ziarah dari pelataran luar dapat dilakukan dengan busana muslim sopan.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Panembahan Senopati, Ki Ageng Pemanahan, dan Sultan Hadiwijaya di Kotagede Yogyakarta umumnya bertawassul memohon kepada Allah SWT keteguhan jiwa kepemimpinan, keberkahan merintis usaha/peradaban dari nol (*babat alas*), serta kemuliaan bakti kepada orang tua.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Panembahan Senopati, Ki Ageng Pemanahan & Sultan Hadiwijaya (Kotagede Yogyakarta)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ هَادِيوِيجَايَا (جَاكَا تِينْغكِيرْ) وَكِي أَغِينْغ فَمَانَاهَانْ وَفَانِيمْبَاهَانْ سِينُوفَاتِي مَاتَارَامْ كُوتَاغِيدِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنَ الْبَارِّينَ بِوَالِدِينَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ هَادِيوِيجَايَا (جَاكَا تِينْغكِيرْ) وَكِي أَغِينْغ فَمَانَاهَانْ وَفَانِيمْبَاهَانْ سِينُوفَاتِي مَاتَارَامْ كُوتَاغِيدِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَاجْعَلْنَا مِنَ الْبَارِّينَ بِوَالِدِينَا وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaan Haadiiwijaayaa (Jaka Tingkir) wa Ki Ageng Pemanahan wa Panembahan Senopati Mataram Kotagede syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waj'alnaa minal-baarriina bi waalidiinaa wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Hadiwijaya (Jaka Tingkir), Ki Ageng Pemanahan, dan Panembahan Senopati Mataram Kotagede, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami anak-anak yang berbakti kepada kedua orang tua, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Hadiwijaya (Jaka Tingkir), Ki Ageng Pemanahan, dan Panembahan Senopati Mataram Kotagede, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, jadikanlah kami anak-anak yang berbakti kepada kedua orang tua, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram (Sura), Rajab, dan Sya’ban (Ruwahan Agung & Tradisi Nawu Sendang Seliran di Kompleks Masjid Gedhe Mataram dan Pasarean Agung Kotagede, Yogyakarta).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat di area masjid dan serambi luar; apabila ingin masuk ke dalam cungkup utama (Prabayeksa) pada hari buka (Minggu, Senin, Kamis, Jumat), wajib mengenakan pakaian adat Jawa sesuai tata tertib Abdi Dalem Juru Kunci Puroloyo Kotagede serta dilarang memotret di dalam cungkup.',
    facilities: ['Masjid Gedhe Mataram Kotagede (Cagar Budaya 1587 M)', 'Cungkup Prabayeksa Pasarean Agung Kotagede', 'Sendang Seliran Kotagede', 'Loket Penyewaan Busana Adat Abdi Dalem & Parkir Wisata Kotagede'],
    openingHours: 'Masjid & Serambi Luar: 24 Jam | Cungkup Dalam: Minggu, Senin, Kamis (08.00–16.00 WIB) & Jumat (13.00–16.00 WIB)',
    references: [
      'De Graaf, H.J. (1985). Awal Kebangkitan Mataram: Masa Pemerintahan Senapati. Jakarta: Grafiti Pers.',
      'Nakamura, Mitsuo (2012). The Crescent Arises over the Banyan Tree: A Study of the Muhammadiyah Movement in a Central Javanese Town (Kotagede). Singapore: ISEAS.',
      'Olthof, W.L. (1941). Babad Tanah Djawi. ’s-Gravenhage: Martinus Nijhoff.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-agung-imogiri',
    name: 'Makam Sultan Agung Hanyakrakusuma & Raja-Raja Mataram (Astana Pajimatan Himagiri / Imogiri, Bantul)',
    title: 'Pahlawan Nasional, Pengarang Sastra Gending, Pencipta Kalender Jawa Islam & Pemimpin Ekspedisi Batavia (1628–1629)',
    description:
      'Kompleks Cagar Budaya Nasional Pajimatan Girirejo Imogiri (Astana Himagiri) di puncak Bukit Merak, Desa Girirejo/Wukirsari, Kecamatan Imogiri, Kabupaten Bantul, DI Yogyakarta—pemakaman agung Sultan Agung Hanyakrakusuma (1593–1645 M) beserta para Susuhunan Surakarta dan Sultan Yogyakarta.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 M – Masa Kini (Dibangun Tahun 1632 M; Sultan Agung wafat 1645 M)',
    province: 'DI Yogyakarta',
    city: 'Bantul',
    district: 'Kec. Imogiri',
    address: 'Puncak Bukit Merak, Desa Girirejo & Wukirsari, Kec. Imogiri, Kabupaten Bantul',
    location: {
      lat: -7.9195,
      lng: 110.3958,
      address: 'Puncak Bukit Merak, Desa Girirejo & Wukirsari, Kec. Imogiri, Kabupaten Bantul',
      district: 'Kec. Imogiri',
      city: 'Bantul',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Cagar Budaya Nasional Astana Pajimatan Raja-Raja Mataram Imogiri Bantul Yogyakarta',
    sanad:
      'Sultan Agung Adi Prabu Hanyakrakusuma Senopati ing Alaga Abdurrahman Sayidin Panatagama Khalifatullah Tanah Jawi (1593–1645 M); cucu Panembahan Senopati; murid ruhani Sunan Kalijaga (secara barzakhi/tradisi), Syekh Jangkung (Saridin), Pangeran Tembayat, dan mendapat pengukuhan gelar Sultan dari Syarif Makkah (1641 M).',
    karya: [
      'Penyusunan Serat Sastra Gending (risalah filsafat mistisisme Islam Jawa yang menyelaraskan syariat dan hakikat)',
      'Penetapan Kalender Jawa Islam (Tahun Sultan Agungan) pada 1 Muharram 1043 H / 8 Juli 1633 M (1 Sura 1555 Jawa) yang memadukan tarikh Hijriah dengan tahun Saka',
      'Komando dua ekspedisi militer besar-besaran menggempur benteng VOC Belanda di Batavia (1628 dan 1629 M) demi mempertahankan kedaulatan Nusantara',
    ],
    history:
      '**Sultan Agung Adi Prabu Hanyakrakusuma** (lahir di Kotagede, 1593 M – wafat di Plered/Karta, Februari 1645 M; ditetapkan sebagai **Pahlawan Nasional RI** melalui SK Presiden No. 106/TK/1975) adalah raja terbesar **Kesultanan Mataram Islam** yang memerintah selama 32 tahun (1613–1645 M). Di bawah kepemimpinan beliau, hampir seluruh Pulau Jawa, Madura, hingga Sukadana (Kalimantan) dan Palembang berada dalam naungan persatuan politik Mataram, dan beliau mengirimkan dua armada besar pada tahun **1628 dan 1629 M** untuk mengepung markas VOC Belanda di Batavia.\n\nLebih dari sekadar panglima militer, Sultan Agung adalah seorang ulama-raja (*ulama-umara*) dan filsuf sufi yang sangat alim. Beliau menggubah mahakarya sastra tasawuf **Serat Sastra Gending**, membangun Masjid Agung di setiap kabupaten disertai jabatan *Penghulu*, serta mengambil keputusan jenius pada tanggal **1 Muharram 1043 H (8 Juli 1633 M)** dengan menciptakan **Kalender Jawa Islam (Anno Javanico)** yang menyatukan perhitungan bulan kamariah Hijriah umat Islam dengan angka tahun Saka masyarakat Jawa, sehingga perayaan hari besar Islam (seperti *Grebeg Maulud*, *Syawalan*, dan *1 Sura*) menyatu ke dalam nadi kehidupan seluruh rakyat Jawa.\n\nPada tahun **1632 M**, Sultan Agung membangun kompleks pemakaman kerajaan di puncak **Bukit Merak, Kecamatan Imogiri, Kabupaten Bantul** (sekitar 17 km di selatan Kota Yogyakarta) yang diberi nama **Pajimatan Girirejo / Astana Himagiri**, dirancang oleh arsitek keraton Kyai Tumenggung Citrokusumo. Ketika wafat pada tahun **1645 M**, Sultan Agung dimakamkan di puncak tertinggi Astana Imogiri (*Kedhaton Sultan Agungan*), yang kemudian menjadi pemakaman resmi bagi raja-raja **Kasunanan Surakarta Hadiningrat** (di sayap barat) dan **Kasultanan Ngayogyakarta Hadiningrat** (di sayap timur, termasuk **Sultan Hamengkubuwono IX**).',
    karomah: [
      'Dalam naskah *Babad Tanah Jawi* dan tradisi lisan keraton, dikisahkan bahwa Sultan Agung memiliki ikatan spiritual yang sangat kuat dengan Tanah Suci Makkah: ketika rencana beliau untuk dimakamkan di Makkah dialihkan demi kemaslahatan rakyat Jawa, segenggam tanah harum dari Makkah dilemparkan dan jatuh di puncak Bukit Merak Imogiri, sehingga tanah di puncak pusara Sultan Agung senantiasa mengeluarkan aroma harum alami.<!--more-->\n\nUntuk mencapai cungkup utama Makam Sultan Agung di puncak Bukit Merak Imogiri, peziarah harus mendaki **409 anak tangga batu bata kuno** yang dibangun lurus menjulang sejak abad ke-17 M, melewati **Masjid Pajimatan Imogiri** dan empat tempayan air pusaka (*Enceh*) persembahan empat kerajaan sahabat (Aceh, Palembang, Siam/Thailand, dan Turki Utsmani).',
    ],
    untoldStory:
      'Di pelataran depan gerbang *Supit Urang* Makam Sultan Agung Imogiri terdapat empat gentong keramik kuno (**Empat Enceh Pusaka**): **Nyai Danumurti** (dari Kesultanan Palembang) dan **Kyai Danumaya** (dari Kesultanan Aceh) di sisi barat milik Surakarta, serta **Kyai Mendung** (dari Kesultanan Turki Utsmani) dan **Nyai Siyem** (dari Kerajaan Siam/Thailand) di sisi timur milik Yogyakarta, yang dikuras setiap bulan Sura dalam upacara adat **Nguras Enceh**.<!--more-->\n\nSebagaimana di Kotagede, cungkup utama Makam Sultan Agung di Imogiri dijaga oleh Abdi Dalem Keraton dan dibuka pada jadwal khusus (**Senin, Jumat, dan Minggu**), di mana peziarah yang masuk ke cungkup dalam wajib mengenakan pakaian adat Jawa peranakan/kemben tanpa alas kaki dan tanpa perhiasan emas.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sultan Agung Hanyakrakusuma di puncak Pajimatan Imogiri Bantul umumnya bertawassul memohon kepada Allah SWT kejayaan dan kewibawaan kepemimpinan bangsa, penyatuan antara kecerdasan intelektual, budaya, dan ketakwaan agama (*Sastra Gending*), serta keteguhan menjaga kedaulatan tanah air.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sultan Agung Hanyakrakusuma & Raja-Raja Mataram (Pajimatan Imogiri Bantul)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْأَعْظَمِ عَبْدِ الرَّحْمٰنِ هَانْيَاكْرَاكُوسُومَا (سُلْطَانْ أَغُونْغ مَاتَارَامْ) وَسَلَاطِينِ سُورَاكَارْتَا وَيُوغْيَاكَارْتَا فِي إِيمُوغِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْأَعْظَمِ عَبْدِ الرَّحْمٰنِ هَانْيَاكْرَاكُوسُومَا (سُلْطَانْ أَغُونْغ مَاتَارَامْ) وَسَلَاطِينِ سُورَاكَارْتَا وَيُوغْيَاكَارْتَا فِي إِيمُوغِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَأَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-A'zham 'Abdir-Rahmaan Hanyakrakusuma (Sultan Agung Mataram) wa Salaathiini Surakarta wa Yogyakarta fii Imogiri syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa a'izzal-Islaama wal-muslimiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Agung Abdurrahman Hanyakrakusuma Mataram beserta para raja Surakarta dan Yogyakarta di Imogiri, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum muslimin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sultan Agung Abdurrahman Hanyakrakusuma Mataram beserta para raja Surakarta dan Yogyakarta di Imogiri, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, muliakanlah Islam dan kaum muslimin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Jumat Kliwon Sura (Upacara Adat Nguras Enceh & Haul Akbar Sultan Agung Hanyakrakusuma) serta Bulan Sya’ban/Ruwah di Pajimatan Imogiri, Kabupaten Bantul.',
    localAdab:
      'Wajib menjaga kesopanan saat mendaki 409 anak tangga Imogiri; peziarah dapat berdoa di pelataran luar dengan pakaian muslim sopan, namun bagi yang ingin masuk ke dalam cungkup Kedhaton Sultan Agung pada jam buka (Senin, Jumat, Minggu) wajib mengenakan pakaian adat Jawa peranakan/kemben yang disewakan abdi dalem serta dilarang mengambil foto/video di dalam kedhaton.',
    facilities: ['Kedhaton Sultan Agung & Kasultanan/Kasunanan Imogiri', '409 Anak Tangga Batu Kuno Abad ke-17', 'Masjid Kagungan Dalem Pajimatan Imogiri', 'Empat Enceh Pusaka & Terminal Parkir Wisata Imogiri Bantul'],
    openingHours: 'Tangga & Pelataran Luar: Setiap Hari 08.00–16.00 WIB | Cungkup Dalam Kedhaton: Senin (10.00–13.00), Jumat (13.30–16.00), Minggu (10.00–13.00 WIB); Tutup sebulan penuh saat Ramadhan',
    references: [
      'De Graaf, H.J. (1986). Puncak Kekuasaan Mataram: Politik Ekspansi Sultan Agung. Jakarta: Grafiti Pers.',
      'Ricklefs, M.C. (1974). Jogjakarta under Sultan Mangkubumi 1749–1792: A History of the Division of Java. London: Oxford University Press.',
      'Woodward, Mark R. (1989). Islam in Java: Normative Piety and Mysticism in the Sultanate of Yogyakarta. University of Arizona Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-ahmad-dahlan-jogja',
    name: 'Makam KH. Ahmad Dahlan / Muhammad Darwis (Makam Karangkajen, Mergangsan, Yogyakarta)',
    title: 'Pahlawan Nasional, Khatib Amin Kasultanan Yogyakarta & Pendiri Persyarikatan Muhammadiyah (1912 M)',
    description:
      'Kompleks Pemakaman Islam Karangkajen di Kelurahan Brontokusuman, Kecamatan Mergangsan, Kota Yogyakarta, DI Yogyakarta—tempat peristirahatan Pahlawan Nasional KH. Ahmad Dahlan (1868–1923 M), ulama pembaru pendidikan dan amal sosial Islam modern di Indonesia.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Awal Abad ke-20 M (1868–1923 M)',
    province: 'DI Yogyakarta',
    city: 'Yogyakarta',
    district: 'Kec. Mergangsan',
    address: 'Makam Islam Karangkajen, Jl. Menukan, Kel. Brontokusuman, Kec. Mergangsan, Kota Yogyakarta',
    location: {
      lat: -7.8214,
      lng: 110.3712,
      address: 'Makam Islam Karangkajen, Jl. Menukan, Kel. Brontokusuman, Kec. Mergangsan, Kota Yogyakarta',
      district: 'Kec. Mergangsan',
      city: 'Yogyakarta',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Yogyakarta (Masjid Gedhe Kauman & Makam KH. Ahmad Dahlan di Karangkajen Yogyakarta)',
    sanad:
      'Lahir dengan nama Muhammad Darwis bin KH. Abu Bakar (Khatib Masjid Gedhe Kauman Yogyakarta, keturunan ke-12 Maulana Malik Ibrahim Sunan Gresik); murid dari KH. Sholeh Darat Semarang, Syaikh Ahmad Khatib Al-Minangkabawi, Syaikh Nawawi Al-Bantani, dan Syaikh Mahfudz At-Tarmasi di Makkah (seperguruan dengan Hadratussyaikh KH. Hasyim Asy’ari).',
    karya: [
      'Pendirian Persyarikatan Muhammadiyah di Kauman Yogyakarta pada 8 Dzulhijjah 1330 H / 18 November 1912 M bersama Nyai Siti Walidah (Pendiri Aisyiyah)',
      'Revolusi praksis sosial Teologi Al-Ma’un (pendirian PKO/PKU Rumah Sakit, Panti Asuhan Yatim, dan ribuan sekolah modern berbasis nilai Islam)',
      'Pelurusan arah kiblat (Roshdul Qiblat) berbasis ilmu falak dan astronomi dari Langgar Kidul Kauman Yogyakarta (1897 M)',
    ],
    history:
      '**KH. Ahmad Dahlan**—yang lahir di Kampung Kauman, Yogyakarta pada tanggal **1 Agustus 1868 M** dengan nama kecil **Muhammad Darwis** dan wafat pada **23 Februari 1923 M** (ditetapkan sebagai **Pahlawan Nasional RI** melalui SK Presiden No. 657 Tahun 1961)—adalah ulama besar pembaru (*mujaddid*) praksis pendidikan dan pelayanan sosial Islam di Indonesia. Ayahanda beliau adalah **KH. Abu Bakar**, Khatib Amin Masjid Gedhe Kasultanan Yogyakarta yang silsilahnya bersambung kepada **Syekh Maulana Malik Ibrahim (Sunan Gresik)**.\n\nPada tahun 1890 dan 1903 M, Muhammad Darwis berangkat menunaikan ibadah haji dan bermukim menuntut ilmu di Makkah Al-Mukarramah. Di Tanah Suci dan di Jawa, beliau berguru kepada ulama-ulama besar yang sama dengan sahabat kentalnya **Hadratussyaikh KH. Hasyim Asy’ari** (pendiri Nahdlatul Ulama)—yakni **KH. Sholeh Darat di Semarang**, **Syaikh Ahmad Khatib Al-Minangkabawi**, dan **Syaikh Nawawi Al-Bantani**—serta mendalami gagasan pembaruan Islam (*ishlah*). Sekembalinya ke Yogyakarta dengan nama **Haji Ahmad Dahlan**, beliau diangkat menjadi *Khatib Amin* Keraton Yogyakarta dan mulai mengoreksi akurasi arah kiblat masjid menggunakan perhitungan ilmu falak serta globe dunia.\n\nPada tanggal **8 Dzulhijjah 1330 H (18 November 1912 M)** di Kauman Yogyakarta, KH. Ahmad Dahlan bersama sang istri tercinta, Pahlawan Nasional **Nyai Hj. Siti Walidah (Nyai Ahmad Dahlan, dimakamkan di Kauman)**, mendirikan **Persyarikatan Muhammadiyah**. Melalui metode pengajaran **Teologi Surah Al-Ma’un**—di mana beliau mengulang-ulang kajian Surah Al-Ma’un selama berbulan-bulan sampai para muridnya benar-benar turun ke jalan mencari anak yatim dan fakir miskin untuk diberi makan, disekolahkan, dan diobati di klinik **PKO (Penolong Kesengsaraan Oemoem)**—KH. Ahmad Dahlan meletakkan fondasi amal usaha pendidikan dan kesehatan terbesar di dunia Islam modern. Beliau wafat pada usia 54 tahun tanggal **23 Februari 1923 M (7 Rajab 1341 H)** dan dimakamkan dengan sangat bersahaja di **Pemakaman Umum Islam Karangkajen, Kelurahan Brontokusuman, Kecamatan Mergangsan, Kota Yogyakarta**.',
    karomah: [
      'Dalam kesaksian murid-murid utama beliau seperti Kyai Sudja’ dan KR.H. Hadjid (*Pelajaran K.H.A. Dahlan: 7 Falsafah & 17 Kelompok Ayat Al-Qur’an*), keistimewaan luar biasa KH. Ahmad Dahlan adalah ketulusan amal nyata (*amal shalih*) dan pengorbanan hartanya: ketika kas sekolah dan panti asuhan Muhammadiyah kosong, Kiai Dahlan melelang seluruh perabotan rumah pribadinya di Kauman untuk menggaji guru-guru dan memberi makan anak yatim, lalu beliau sendiri yang membeli kembali perabotannya sedikit demi sedikit.<!--more-->\n\nDi Kompleks Pemakaman Islam Karangkajen Yogyakarta, pusara KH. Ahmad Dahlan berada di tengah-tengah makam warga dan tokoh pergerakan Islam (termasuk KH. Ibrahim, Ki Bagus Hadikusumo, KH. Fakhruddin, dan Prof. KH. Kahar Muzakkir) tanpa cungkup megah, mencerminkan kesetaraan manusia di hadapan Allah SWT yang beliau ajarkan semasa hidup.',
    ],
    untoldStory:
      'Persaudaraan sejati antara dua pendiri ormas Islam terbesar di Indonesia—**KH. Ahmad Dahlan (Muhammadiyah)** dan **KH. Hasyim Asy’ari (Nahdlatul Ulama)**—terjalin sejak masa muda ketika keduanya tinggal satu kamar (*satu pondokan*) saat mengaji kepada **KH. Sholeh Darat di Darat, Semarang** maupun saat menuntut ilmu di Makkah.<!--more-->\n\nPeziarah dan peneliti sejarah yang mengunjungi Makam KH. Ahmad Dahlan di **Karangkajen (Mergangsan)** juga dapat mengunjungi **Langgar Kidul KH. Ahmad Dahlan** dan **Makam Nyai Hj. Siti Walidah (Nyai Ahmad Dahlan)** di Kampung **Kauman (Ngupasan, Gondomanan)** di sebelah barat Masjid Gedhe Kauman Yogyakarta.',
    barokahHajat:
      'Peziarah, pendidik, tenaga kesehatan, dan pegiat sosial yang berziarah serta bertafakur di maqbarah KH. Ahmad Dahlan di Karangkajen Yogyakarta umumnya memohon kepada Allah SWT keikhlasan dalam beramal sosial (*Hidup-hidupilah agama dan umat, jangan mencari penghidupan di dalamnya*), semangat mengamalkan Surah Al-Ma’un, serta kemajuan pendidikan umat.',
    doaKhusus: [
      {
        title: 'Doa Ampunan & Munajat Keteladanan KH. Ahmad Dahlan (Karangkajen Yogyakarta)',
        arab: 'اللّٰهُمَّ اغْفِرْ لِعَبْدِكَ الْعَالِمِ الْمُجَاهِدِ كِيَاهِي الحَاجِّ أَحْمَدْ دَحْلَانْ وَزَوْجَتِهِ نْيَايِي سِتِّي وَالِدَةْ وَارْحَمْهُمَا وَعَافِهِمَا وَاعْفُ عَنْهُمَا، وَأَكْرِمْ نُزُلَهُمَا وَاجْزِهِمَا عَنِ الْإِسْلَامِ وَالْمُسْلِمِينَ خَيْرَ الْجَزَاءِ، وَارْزُقْنَا الْإِخْلَاصَ فِي الْعِلْمِ وَالْعَمَلِ الصَّالِحِ يَا أَرْحَمَ الرَّاحِمِينَ.',
        text: 'اللّٰهُمَّ اغْفِرْ لِعَبْدِكَ الْعَالِمِ الْمُجَاهِدِ كِيَاهِي الحَاجِّ أَحْمَدْ دَحْلَانْ وَزَوْجَتِهِ نْيَايِي سِتِّي وَالِدَةْ وَارْحَمْهُمَا وَعَافِهِمَا وَاعْفُ عَنْهُمَا، وَأَكْرِمْ نُزُلَهُمَا وَاجْزِهِمَا عَنِ الْإِسْلَامِ وَالْمُسْلِمِينَ خَيْرَ الْجَزَاءِ، وَارْزُقْنَا الْإِخْلَاصَ فِي الْعِلْمِ وَالْعَمَلِ الصَّالِحِ يَا أَرْحَمَ الرَّاحِمِينَ.',
        latin:
          "Allaahummaghfir li 'abdikal-'Aalimil-Mujaahidi Kiyaahii al-Haajj Ahmad Dahlan wa zaujatihii Nyai Sittii Waalidah warhamhumaa wa 'aafihimaa wa'fu 'anhumaa, wa akrim nuzulahumaa wajzihimaa 'anil-Islaami wal-muslimiina khairal-jazaa', warzuqnal-ikhlaasha fil-'ilmi wal-'amalish-shaalihi Yaa Arhamar-Raahimiin.",
        terjemahan:
          'Ya Allah, ampunilah hamba-Mu ulama pejuang KH. Ahmad Dahlan beserta istrinya Nyai Siti Walidah, rahmatilah dan maafkanlah keduanya, muliakanlah tempat peristirahatan keduanya, balaslah jasa besar keduanya bagi Islam dan kaum muslimin dengan sebaik-baik balasan, serta karuniakanlah kepada kami keikhlasan dalam ilmu dan amal shalih, wahai Dzat Yang Maha Penyayang.',
        translation:
          'Ya Allah, ampunilah hamba-Mu ulama pejuang KH. Ahmad Dahlan beserta istrinya Nyai Siti Walidah, rahmatilah dan maafkanlah keduanya, muliakanlah tempat peristirahatan keduanya, balaslah jasa besar keduanya bagi Islam dan kaum muslimin dengan sebaik-baik balasan, serta karuniakanlah kepada kami keikhlasan dalam ilmu dan amal shalih, wahai Dzat Yang Maha Penyayang.',
      },
    ],
    haulSchedule:
      '18 November / 8 Dzulhijjah (Refleksi Milad Muhammadiyah) & 23 Februari (Mengenang Wafatnya Pahlawan Nasional KH. Ahmad Dahlan di Makam Islam Karangkajen, Mergangsan & Kauman, Kota Yogyakarta).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga adab ziarah kubur sesuai tuntunan Sunnah (mengucap salam kepada ahli kubur, mendoakan ampunan bagi almarhum, serta tidak melakukan perbuatan ratapan atau kultus yang dilarang syariat), dan menjaga kebersihan Makam Islam Karangkajen.',
    facilities: ['Kompleks Pemakaman Islam Karangkajen Mergangsan', 'Papan Penunjuk Pusara Pahlawan Nasional (KH. Ahmad Dahlan, Ki Bagus Hadikusumo, KH. Fakhruddin)', 'Masjid Jami’ Karangkajen Yogyakarta', 'Situs Langgar Kidul KH. Ahmad Dahlan di Kauman Yogyakarta'],
    openingHours: 'Buka Setiap Hari 06.00 – 18.00 WIB',
    references: [
      'Alfian (1989). Muhammadiyah: The Political Behavior of a Muslim Modernist Organization under Dutch Colonialism. Yogyakarta: Gadjah Mada University Press.',
      'Hadjid, K.R.H. (2013). Pelajaran K.H.A. Dahlan: 7 Falsafah Ajaran dan 17 Kelompok Ayat Al-Qur’an. Yogyakarta: Suara Muhammadiyah.',
      'Nakamura, Mitsuo (2012). The Crescent Arises over the Banyan Tree. Singapore: ISEAS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-munawwir-krapyak',
    legacyId: 'ulama-33',
    name: 'Makam KH. Muhammad Moenauwir & KH. Ali Maksum (Dongkelan & Krapyak, Bantul, Yogyakarta)',
    title: 'Maha Guru Tahfidzul Qur’an Qira’at Sab’ah Nusantara & Rais Aam PBNU Pengasuh Pesantren Krapyak',
    description:
      'Kompleks Pemakaman Keluarga Pesantren Krapyak di Makam Dongkelan, Desa Panggungharjo, Kecamatan Sewon, Kabupaten Bantul (dekat Pondok Pesantren Al-Munawwir & Yayasan Ali Maksum Krapyak, DI Yogyakarta)—peristirahatan KH. Muhammad Moenauwir (1870–1942 M) dan menantunya KH. Ali Maksum (1915–1989 M).',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (KH. Moenauwir: 1870–1942 M; KH. Ali Maksum: 1915–1989 M)',
    province: 'DI Yogyakarta',
    city: 'Bantul',
    district: 'Kec. Sewon',
    address: 'Kompleks Makam Dongkelan, Kauman Dongkelan, Panggungharjo, Kec. Sewon, Kabupaten Bantul (Pesantren Krapyak Yogyakarta)',
    location: {
      lat: -7.8312,
      lng: 110.3548,
      address: 'Kompleks Makam Dongkelan, Kauman Dongkelan, Panggungharjo, Kec. Sewon, Kabupaten Bantul (Pesantren Krapyak Yogyakarta)',
      district: 'Kec. Sewon',
      city: 'Bantul',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Al-Qur’an Yogyakarta (Pondok Pesantren Al-Munawwir Krapyak & Maqbarah Dongkelan Sewon Bantul)',
    sanad:
      'KH. Muhammad Moenauwir bin KH. Abdullah Rosyad bin KH. Hasan Besari (Kauman Yogyakarta); bermukim 21 tahun di Makkah dan Madinah mengambil sanad Al-Qur’an Qira’at Sab’ah (Asy-Syathibiyyah) yang bersambung lurus hingga Rasulullah SAW dari Syaikh Abdul Karim bin Umar Al-Badri Ad-Dimyathi, Syaikh Yusuf Hajar, dan Syaikh Abdus Syakur.',
    karya: [
      'Pendirian Pondok Pesantren Al-Munawwir Krapyak Yogyakarta (15 November 1910 M) sebagai kiblat utama sanad Tahfidzul Qur’an di Indonesia',
      'Kaderisasi maha guru Al-Qur’an Nusantara (seperti KH. Arwani Amin Kudus, KH. Badawi Kaliwungu, KH. Muntaha Wonosobo, KH. Umar Abdul Mannan Mangkuyudan Solo, dan KH. Mufid Mas’ud Pandanaran)',
      'Karya kamus leksikografi Arab-Indonesia Kamus Al-Munawwir (disusun putra beliau KH. Ahmad Warson Munawwir) dan kitab-kitab fikih/shorof karya KH. Ali Maksum',
    ],
    history:
      '**KH. Muhammad Moenauwir** (lahir di Kauman Yogyakarta, 1870 M – wafat di Krapyak, 6 Juni 1942 M / 11 Jumadil Akhir 1361 H) adalah *Maha Guru Al-Qur’an Nusantara* yang menjadi muara sanad hampir seluruh pesantren *Tahfidzul Qur’an* di Indonesia modern. Putra dari ulama Keraton Yogyakarta **KH. Abdullah Rosyad** ini menuntut ilmu di berbagai pesantren tanah Jawa (Bangkalan Madura di bawah Syaikhona Kholil, Darat Semarang di bawah KH. Sholeh Darat, dan Kanggotan Pleret), sebelum berangkat ke Tanah Suci Makkah dan Madinah pada tahun **1888 M** dan bermukim selama **21 tahun**.\n\nDi Makkah dan Madinah, Kiai Moenauwir mengkhususkan diri menghafal Al-Qur’an 30 juz beserta *Qira’at Sab’ah* (Tujuh Bacaan Mutawatir melalui jalur *Hirzul Amani / Asy-Syathibiyyah*) di bawah bimbingan langsung **Syaikh Abdul Karim bin Umar Al-Badri Ad-Dimyathi** dan **Syaikh Yusuf Hajar**, serta melakukan riyadhah mengkhatamkan Al-Qur’an setiap tiga hari sekali selama tiga tahun, setiap sehari semalam sekali selama tiga tahun, dan sekali khatam dalam sepekan selama 40 hari tanpa putus hingga mulut beliau mengeluarkan darah karena dinginnya udara Madinah. Sekembalinya ke Yogyakarta pada tahun 1909 M, beliau mendirikan **Pondok Pesantren Krapyak (Al-Munawwir)** di Desa Panggungharjo, Kecamatan Sewon, Kabupaten Bantul pada tanggal **15 November 1910 M**.\n\nSepeninggal KH. Muhammad Moenauwir pada **6 Juni 1942 M**, estafet keilmuan Pesantren Krapyak dilanjutkan oleh putra-putra beliau (**KH. R. Abdul Qodir Munawwir**, **KH. Zainal Abidin Munawwir**, **KH. Ahmad Warson Munawwir** penyusun *Kamus Al-Munawwir*) bersama sang menantu yang merupakan ulama ensiklopedis asal Lasem dan **Rais Aam PBNU (1981–1984)**, **Al-Allamah KH. Ali Maksum** (2 Maret 1915 – 7 Desember 1989 M). KH. Muhammad Moenauwir dan KH. Ali Maksum beserta keluarga besar Krapyak dimakamkan di **Kompleks Pemakaman Dongkelan, Desa Panggungharjo, Kecamatan Sewon, Kabupaten Bantul** (sekitar 1,5 km di sebelah barat daya Pondok Pesantren Krapyak).',
    karomah: [
      'Dalam kitab manaqib KH. Muhammad Moenauwir dan kesaksian para santri sepuh, karomah paling agung dari Kiai Moenauwir adalah ketajaman pendengaran batin (*dzauq Qur’ani*) beliau terhadap kalamullah: meskipun beliau sedang berada di dalam kamar atau tampak terpejam, apabila ada santri yang sedang *nderes* (menghafal) di serambi masjid lalu keliru satu harakat atau makhraj huruf saja, beliau langsung menegur dan membetulkan bacaan ayat tersebut dari kejauhan.<!--more-->\n\nHampir seluruh pesantren Al-Qur’an terbesar di Pulau Jawa—mulai dari **Yanbu’ul Qur’an Kudus** (KH. Arwani Amin), **Al-Muayyad Solo** (KH. Abdul Mannan & KH. Umar), **Al-Asy’ariyyah Wonosobo** (KH. Muntaha), **Sunan Pandanaran Sleman** (KH. Mufid Mas’ud), hingga **Lirboyo dan Ploso Kediri**—memiliki sanad Al-Qur’an yang bermuara langsung kepada KH. Muhammad Moenauwir Krapyak.',
    ],
    untoldStory:
      'Sinergi keilmuan antara mertua dan menantu di Pesantren Krapyak—yakni **KH. Muhammad Moenauwir** (pakar puncak *Tahfidzul Qur’an & Qira’at Sab’ah*) dan **KH. Ali Maksum** (pakar puncak *Kitab Kuning, Tafsir, Hadis, dan Ushul Fiqh* lulusan Tremas dan Lasem)—menjadikan Krapyak sebagai salah satu pusat intelektual Islam paling berpengaruh di Indonesia abad ke-20 (tempat belajarnya KH. Abdurrahman Wahid / Gus Dur dan ribuan ulama).<!--more-->\n\nKompleks **Maqbarah Dongkelan** terletak di belakang Masjid Pathok Negara / Masjid Jami’ Dongkelan, Kecamatan Sewon, Bantul, sehingga peziarah dapat berziarah sekaligus ke pusara KH. M. Moenauwir, KH. Ali Maksum, KH. Zainal Abidin Munawwir, KH. Ahmad Warson Munawwir, dan KH. Atabik Ali.',
    barokahHajat:
      'Peziarah dan para santri penghafal Al-Qur’an (*hamalatul Qur’an*) yang berziarah ke maqbarah KH. Muhammad Moenauwir dan KH. Ali Maksum di Dongkelan–Krapyak Yogyakarta umumnya bertawassul memohon kepada Allah SWT ketersambungan sanad dan kemutqinan hafalan Al-Qur’an, keluasan penguasaan ilmu kitab kuning dan bahasa Arab (*Kamus Al-Munawwir*), serta istiqamah mengabdi pada umat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muhammad Moenauwir & KH. Ali Maksum (Krapyak–Dongkelan Yogyakarta)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ الْقُرَّاءِ كِيَاهِي الحَاجِّ مُحَمَّدْ مُنَوِّرْ بْنِ عَبْدِ اللهِ رَشَادْ وَالْعَلَّامَةِ كِيَاهِي الحَاجِّ عَلِيّ مَعْصُومْ وَمَشَايِخِ كَرَافْيَاكْ يُوغْيَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا بِنُورِ الْقُرْآنِ وَالْعِلْمِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ الْقُرَّاءِ كِيَاهِي الحَاجِّ مُحَمَّدْ مُنَوِّرْ بْنِ عَبْدِ اللهِ رَشَادْ وَالْعَلَّامَةِ كِيَاهِي الحَاجِّ عَلِيّ مَعْصُومْ وَمَشَايِخِ كَرَافْيَاكْ يُوغْيَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا بِنُورِ الْقُرْآنِ وَالْعِلْمِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Syaikhil-Qurraa' Kiyaahii al-Haajj Muhammad Munawwir bin 'Abdillaah Rasyaad wal-'Allaamah Kiyaahii al-Haajj 'Alii Ma'shuum wa Masyaayikhi Krapyak Yogyakarta syai-un lillaahi lahumul-Faatihah. Allaahumma nawwir quluubanaa bi nuuril-Qur-aani wal-'ilmi wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syaikhul Qurra’ KH. Muhammad Moenauwir bin Abdullah Rosyad, Al-Allamah KH. Ali Maksum, beserta para masyayikh Krapyak Yogyakarta, Al-Fatihah. Ya Allah, terangilah hati kami dengan cahaya Al-Qur’an dan ilmu agama, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Syaikhul Qurra’ KH. Muhammad Moenauwir bin Abdullah Rosyad, Al-Allamah KH. Ali Maksum, beserta para masyayikh Krapyak Yogyakarta, Al-Fatihah. Ya Allah, terangilah hati kami dengan cahaya Al-Qur’an dan ilmu agama, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '11 Jumadil Akhir (Puncak Haul Akbar KH. Muhammad Moenauwir) & Jumadil Awal (Haul Akbar KH. Ali Maksum di Pondok Pesantren Al-Munawwir Krapyak & Maqbarah Dongkelan, Kecamatan Sewon, Kabupaten Bantul, DI Yogyakarta).',
    localAdab:
      'Wajib mengenakan busana muslim santri yang sopan dan menutup aurat (laki-laki memakai sarung dan peci, perempuan memakai busana muslimah longgar dan kerudung), menjaga ketenangan di Kompleks Makam Dongkelan dan lingkungan asrama santri Krapyak, serta mengutamakan tilawah Al-Qur’an.',
    facilities: ['Kompleks Maqbarah Keluarga Krapyak di Dongkelan', 'Masjid Jami’ Pondok Pesantren Al-Munawwir Krapyak', 'Aula AB & Kompleks Pesantren Yayasan Ali Maksum Krapyak', 'Area Parkir Bus Tamu Krapyak & Dongkelan Sewon Bantul'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Mas’ud, Abdurrahman (2006). Dari Haramain ke Nusantara: Jejak Intelektual Arsitek Pesantren. Jakarta: Kencana.',
      'Tim Penulis PP Al-Munawwir (2010). Seabad Pondok Pesantren Al-Munawwir Krapyak Yogyakarta (1910–2010): Biografi KH. Muhammad Moenauwir. Yogyakarta: Pustaka Al-Munawwir.',
      'Arief, Subhan (2001). Biografi KH. Ali Maksum: Dari Pesantren ke Panggung Nasional. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kyai-nur-iman-mlangi',
    legacyId: 'auliya-8',
    name: 'Makam Kyai Nur Iman Mlangi (BPH Sandiyo — Masjid Pathok Negara Mlangi, Sleman, Yogyakarta)',
    title: 'Putra Mahkota Mataram yang Memilih Jalan Santri, Kakak Sultan Hamengkubuwono I & Pendiri Desa Pesantren Mlangi',
    description:
      'Kompleks Cagar Budaya Masjid Pathok Negara Sulthoni dan Maqbarah Kyai Nur Iman (Bendara Pangeran Harya Sandiyo, abad ke-18 M) di Dusun Mlangi, Desa Nogotirto, Kecamatan Gamping, Kabupaten Sleman, DI Yogyakarta.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-18 M (Sekitar 1711–1795 M)',
    province: 'DI Yogyakarta',
    city: 'Sleman',
    district: 'Kec. Gamping',
    address: 'Kompleks Masjid Pathok Negara Mlangi, Dusun Mlangi, Desa Nogotirto, Kec. Gamping, Kabupaten Sleman',
    location: {
      lat: -7.7712,
      lng: 110.3315,
      address: 'Kompleks Masjid Pathok Negara Mlangi, Dusun Mlangi, Desa Nogotirto, Kec. Gamping, Kabupaten Sleman',
      district: 'Kec. Gamping',
      city: 'Sleman',
      province: 'DI Yogyakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Cagar Budaya Masjid Pathok Negara & Maqbarah Kyai Nur Iman Mlangi Sleman Yogyakarta',
    sanad:
      'Lahir dengan nama Raden Mas Suryo Putra / Bendara Pangeran Harya (BPH) Sandiyo, putra sulung Susuhunan Amangkurat IV (Mangkurat Jawi) dan kakak kandung/tiri Pangeran Mangkubumi (Sultan Hamengkubuwono I) serta RM Said (Pangeran Sambernyawa); nyantri di Pondok Pesantren Gedangan Pasuruan (KH. Abdullah Muhsin) dan Sidogiri.',
    karya: [
      'Pendirian Desa Perdikan Santri Mlangi (*Mulangi* = Mengajar Ilmu Agama) dan Masjid Pathok Negara Sulthoni Mlangi (~1758/1760 M) sebagai benteng ruhani barat Kasultanan Yogyakarta',
      'Leluhur genealogis jaringan kiai besar Jawa Tengah dan DIY (termasuk KH. Nawawi Berjan Purworejo, KH. Dalhar Watucongol Magelang, dan para pengasuh 16+ pesantren di Mlangi)',
    ],
    history:
      '**Kyai Nur Iman Mlangi**—yang memiliki nama bangsawan **Raden Mas Suryo Putra** atau **Bendara Pangeran Harya (BPH) Sandiyo** (hidup sekitar 1711–1795 M)—adalah teladan agung keikhlasan (*zuhud*) dalam sejarah kerajaan Islam di Jawa: seorang pangeran putra sulung **Susuhunan Amangkurat IV** (raja Mataram Kartasura) yang rela meninggalkan hak takhta kerajaan dan hiruk-pikuk intrik kolonial VOC demi mengembara menjadi santri biasa di Jawa Timur. Dengan menyamar sebagai pemuda desa bernama **Nur Iman**, beliau menuntut ilmu tafsir, fikih, dan tasawuf di **Pondok Pesantren Gedangan, Pasuruan** di bawah asuhan **KH. Abdullah Muhsin** (putra Mbah Suropati) hingga diangkat menjadi menantu sang kiai.\n\nSetelah Perjanjian Giyanti (13 Februari 1755 M) yang melahirkan **Kasultanan Ngayogyakarta Hadiningrat**, adik beliau yang naik takhta sebagai **Sri Sultan Hamengkubuwono I (Pangeran Mangkubumi)** mengutus abdi dalem mencari keberadaan sang kakak di Jawa Timur dan memohon dengan penuh takzim agar Kyai Nur Iman berkenan kembali ke Yogyakarta sebagai guru spiritual kesultanan. Sultan Hamengkubuwono I kemudian menganugerahkan tanah *Perdikan* (bebas pajak) di sebelah barat keraton yang dinamai **Mlangi** (dari kata bahasa Jawa *Mulangi* yang berarti *"Mengajar Ilmu Agama"*, atau *Wangi*).\n\nDi Dusun Mlangi, Desa Nogotirto, Kecamatan Gamping, Kabupaten Sleman, Kyai Nur Iman membangun pesantren dan **Masjid Pathok Negara Sulthoni Mlangi** sekitar tahun **1758–1760 M**, yang menjadi satu dari empat *Masjid Pathok Negara* (pilar pengadilan syariat dan benteng pertahanan empat penjuru angin Kasultanan Yogyakarta bersama Plosokuning di utara, Babadan di timur, dan Dongkelan di selatan). Dari pernikahan dan pengajaran Kyai Nur Iman di Mlangi, lahir jaringan ulama besar Jawa Tengah dan Yogyakarta (seperti **KH. Dalhar Watucongol**, **KH. Zarkasyi Berjan Purworejo**, serta belasan pondok pesantren yang hingga kini mengelilingi Dusun Mlangi). Setelah wafat pada akhir abad ke-18 M, Kyai Nur Iman dimakamkan di Kompleks Maqbarah barat **Masjid Pathok Negara Mlangi, Gamping, Sleman**.',
    karomah: [
      'Dalam serat babad keraton Yogyakarta dan manaqib *Kyai Nur Iman Mlangi*, karomah terbesar beliau adalah kemuliaan derajat *zuhud* yang membuat adik kandungnya sendiri, Sri Sultan Hamengkubuwono I (pendiri Keraton Yogyakarta), selalu turun dari kereta kencana dan berjalan kaki dengan penuh takzim setiap kali berkunjung menghadap Kyai Nur Iman di Pesantren Mlangi.<!--more-->\n\nBerkat doa dan wasiat Kyai Nur Iman, Dusun Mlangi yang berada di pinggiran Kota Metropolitan Yogyakarta hingga hari ini tetap terjaga sebagai **"Kampung Santri Yogyakarta"** yang dikelilingi lebih dari 15 pondok pesantren aktif (seperti PP As-Salafiyyah, Al-Miftah, Hujjatul Islam, An-Nasyath, dan Al-Falahiyyah) dengan lantunan pengajian Al-Qur’an dan kitab kuning selama 24 jam.',
    ],
    untoldStory:
      'Bangunan **Masjid Pathok Negara Sulthoni Mlangi** memiliki keunikan arsitektur tradisional Jawa berpadu pesantren: atap *tajug* bersusun dua dengan mustaka keraton, kolam air (*blumbang*) yang mengelilingi serambi masjid untuk menyucikan kaki jamaah sebelum masuk, serta mimbar kayu kuno abad ke-18 peninggalan Kyai Nur Iman.<!--more-->\n\nKompleks Maqbarah Kyai Nur Iman di belakang Masjid Pathok Negara Mlangi dikelilingi tembok bata tebal (*cepuri*) dengan gerbang *Paduraksa* dan dijaga oleh keluarga dzurriyah serta Abdi Dalem Keraton Yogyakarta.',
    barokahHajat:
      'Peziarah, santri, dan para pejabat/abdi masyarakat yang berziarah ke maqbarah Kyai Nur Iman di Mlangi Sleman Yogyakarta umumnya bertawassul memohon kepada Allah SWT sifat *zuhud* (tidak silau oleh jabatan dan harta duniawi), keberkahan menuntut ilmu di pesantren (*Mulangi*), serta dikaruniai keturunan ulama dan orang-orang shalih.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Kyai Nur Iman / BPH Sandiyo (Masjid Pathok Negara Mlangi Yogyakarta)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الزَّاهِدِ الْوَلِيِّ الصَّالِحِ كِيَاهِي نُورْ إِيمَانْ (فَانْغِيرَانْ سَانْدِيُو) وَمَشَايِخِ مَلَانْغِي يُوغْيَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا الزُّهْدَ فِي الدُّنْيَا وَالرَّغْبَةَ فِي الْآخِرَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الزَّاهِدِ الْوَلِيِّ الصَّالِحِ كِيَاهِي نُورْ إِيمَانْ (فَانْغِيرَانْ سَانْدِيُو) وَمَشَايِخِ مَلَانْغِي يُوغْيَاكَارْتَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا الزُّهْدَ فِي الدُّنْيَا وَالرَّغْبَةَ فِي الْآخِرَةِ وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimiz-Zaahidil-Waliyyish-Shaalih Kiyaahii Nuur Iimaan (Pangeran Sandiyo) wa Masyaayikhi Mlangi Yogyakarta syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaz-zuhda fid-dunyaa war-raghbata fil-aakhirati wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama zahid wali yang shalih Kyai Nur Iman (Pangeran Sandiyo) beserta para masyayikh Mlangi Yogyakarta, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kezuhudan terhadap dunia dan kecintaan terhadap akhirat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama zahid wali yang shalih Kyai Nur Iman (Pangeran Sandiyo) beserta para masyayikh Mlangi Yogyakarta, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kezuhudan terhadap dunia dan kecintaan terhadap akhirat, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15 Muharram / Bulan Sura (Puncak Haul Akbar Kyai Nur Iman Mlangi / BPH Sandiyo yang dihadiri puluhan ribu santri, ulama, dan keluarga Keraton Yogyakarta di Kompleks Masjid Pathok Negara Mlangi, Kecamatan Gamping, Kabupaten Sleman).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat (pengunjung perempuan wajib berkerudung dan berpakaian longgar saat memasuki Kampung Santri Mlangi), melepas alas kaki sebelum melintasi serambi masjid menuju cungkup maqbarah, serta menjaga ketenangan pesantren.',
    facilities: ['Masjid Pathok Negara Sulthoni Mlangi (Cagar Budaya ~1760 M)', 'Cungkup Maqbarah Kyai Nur Iman Mlangi', 'Kawasan 15+ Pondok Pesantren Dusun Mlangi', 'Area Parkir Bus Wisata Religi Mlangi Nogotirto Sleman'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Carey, Peter (2014). Takdir: Riwayat Pangeran Diponegoro (1785–1855) — Mencatat peran jaringan ulama Pathok Negara dan Mlangi. Jakarta: Kompas.',
      'Ricklefs, M.C. (1974). Jogjakarta under Sultan Mangkubumi 1749–1792. London: Oxford University Press.',
      'Dinas Kebudayaan DIY — Monografi Cagar Budaya Masjid Pathok Negara dan Makam Kyai Nur Iman Mlangi Sleman.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 6. KUDUS, REMBANG (SARANG & LASEM), PEKALONGAN & BATANG (INTEGRASI LEGACY)
  // =========================================================================
  {
    id: 'kh-arwani-amin-kudus',
    legacyId: 'ulama-14',
    name: 'Makam KH. Muhammad Arwani Amin Said (Pondok Tahfidh Yanbu’ul Qur’an, Kota Kudus)',
    title: 'Maha Guru Qira’at Sab’ah, Mursyid Thariqah Naqsyabandiyah Khalidiyah & Pendiri Yanbu’ul Qur’an Kudus',
    description:
      'Kompleks Maqbarah Pondok Tahfidh Yanbu’ul Qur’an di Jl. KH. M. Arwani, Kelurahan Kajeksan, Kecamatan Kota, Kabupaten Kudus—tempat peristirahatan Al-Allamah Al-Muqri’ KH. Muhammad Arwani Amin (1905–1994 M), penyusun kitab *Faidhul Barakat fi Sab’il Qira’at*.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (5 September 1905 – 1 Oktober 1994 M)',
    province: 'Jawa Tengah',
    city: 'Kudus',
    district: 'Kec. Kota Kudus',
    address: 'Kompleks Pondok Tahfidh Yanbu’ul Qur’an, Jl. KH. M. Arwani, Kel. Kajeksan, Kec. Kota, Kabupaten Kudus',
    location: {
      lat: -6.8058,
      lng: 110.8342,
      address: 'Kompleks Pondok Tahfidh Yanbu’ul Qur’an, Jl. KH. M. Arwani, Kel. Kajeksan, Kec. Kota, Kabupaten Kudus',
      district: 'Kec. Kota Kudus',
      city: 'Kudus',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Al-Qur’an Kudus (Pondok Tahfidh Yanbu’ul Qur’an & Maqbarah KH. Arwani Amin Kajeksan Kudus)',
    sanad:
      'Putra H. Amin Said dan Hj. Wanifah (keturunan Pangeran Diponegoro melalui Kyai Hasan Besari); murid utama KH. Muhammad Moenauwir Krapyak Yogyakarta (sanad Qira’at Sab’ah), Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, KH. Muhammad Manshur Popongan Klaten (Thariqah Naqsyabandiyah Khalidiyah), dan KH. Turaichan Adjhuri Kudus.',
    karya: [
      'Kitab Faidhul Barakat fi Sab’il Qira’at (3 Jilid panduan monumental Qira’at Sab’ah dari jalur Hirzul Amani / Asy-Syathibiyyah yang dicetak hingga Timur Tengah)',
      'Pendirian Pondok Tahfidh Yanbu’ul Qur’an (PTYQ) Kudus (1942/1973 M) dan perumusan metode baca Al-Qur’an Thariqah Baca Tulis & Menghafal Yanbu’a',
      'Kemursyidan Thariqah Naqsyabandiyah Khalidiyah yang memadukan riyadhah zikir khafi dengan penjagaan hafalan Al-Qur’an 30 juz',
    ],
    history:
      '**Al-Allamah Al-Muqri’ KH. Muhammad Arwani bin H. Amin Said**—yang masyhur dengan sapaan takzim **Mbah Arwani Kudus** (lahir di Kerjasan, Kota Kudus pada Selasa Kliwon, **5 September 1905 M / 5 Rajab 1323 H** dan wafat pada **1 Oktober 1994 M / 25 Rabiul Akhir 1415 H**)—adalah ulama besar penjaga kemurnian *Qira’at Sab’ah* dan mursyid *Thariqah Naqsyabandiyah Khalidiyah* yang harum namanya di seluruh Nusantara. Sejak usia 7 tahun beliau telah khatam membaca Al-Qur’an, lalu berkelana menuntut ilmu selama puluhan tahun ke berbagai pesantren utama: **Jamsaren Solo**, **Tebuireng Jombang** (berguru langsung kepada Hadratussyaikh KH. Hasyim Asy’ari hingga dipercaya mengajar di Madrasah Salafiyah Syafi’iyah), **Al-Munawwir Krapyak Yogyakarta**, dan **Popongan Klaten**.\n\nSaat nyantri di Krapyak Yogyakarta (1927–1938 M) di bawah bimbingan **KH. Muhammad Moenauwir**, Arwani muda menghafal 30 juz Al-Qur’an dalam waktu dua tahun dan melanjutkan mendalami *Qira’at Sab’ah* selama sembilan tahun hingga gurunya, Kiai Moenauwir, berwasiat khusus: *"Nanti kalau kamu sudah boyong ke Kudus, catatlah ilmu Qira’at Sab’ah ini agar tidak hilang."* Memenuhi amanat sang guru, KH. Arwani Amin menyusun kitab tiga jilid **Faidhul Barakat fi Sab’il Qira’at** yang menjadi rujukan utama para *qurra’* di Asia Tenggara.\n\nSepulang ke Kudus dan menikah dengan **Nyai Hj. Naqiyyah binti KH. Abdullah Sajjad** pada tahun 1935 M, beliau mulai mengajar Al-Qur’an di Masjid Kenepan dan mendirikan **Pondok Tahfidh Yanbu’ul Qur’an (PTYQ)** di Kelurahan Kajeksan, Kecamatan Kota, Kabupaten Kudus (hanya sekitar 200 meter di sebelah tenggara Menara Sunan Kudus). Beliau wafat pada tanggal **1 Oktober 1994 M (25 Rabiul Akhir 1415 H)** dalam usia 89 tahun dan dimakamkan di Kompleks Maqbarah Pondok Tahfidh Yanbu’ul Qur’an, Kajeksan, Kota Kudus.',
    karomah: [
      'Dalam biografi *KH. M. Arwani Amin: Sang Penjaga Wahyu* dan kesaksian para santri Yanbu’ul Qur’an, karomah Mbah Arwani tampak dari ketelitian *talaqqi* dan *musyafahah* beliau yang luar biasa: ribuan penghafal Al-Qur’an (*huffadz*) dan kiai pesantren dari seluruh Indonesia mengantre menyetorkan bacaan Al-Qur’an di hadapan beliau, dan metode pengajaran beliau kemudian melahirkan sistem pembelajaran Al-Qur’an **Yanbu’a** serta **Mushaf Al-Qur’an Kudus (Rasm Utsmani)**.<!--more-->\n\nSelain sebagai *Syaikhul Qurra’*, Mbah Arwani juga merupakan Mursyid *Thariqah Naqsyabandiyah Khalidiyah* (penerus sanad KH. Muhammad Manshur Popongan Klaten), sehingga di Pesantren Yanbu’ul Qur’an Kudus tradisi ketajaman hafalan Al-Qur’an menyatu secara harmonis dengan kelembutan zikir sufi.',
    ],
    untoldStory:
      'Lokasi Pondok Tahfidh Yanbu’ul Qur’an dan Maqbarah KH. Arwani Amin di Kelurahan **Kajeksan, Kota Kudus** berada sangat dekat dengan Kompleks Masjid Al-Aqsha **Menara Sunan Kudus** (dapat ditempuh dengan berjalan kaki sekitar 3–5 menit ke arah tenggara).<!--more-->\n\nDi dalam cungkup Maqbarah Yanbu’ul Qur’an, pusara **KH. Muhammad Arwani Amin** berdampingan dengan pusara putra-putra penerus beliau: **KH. Muhammad Ulin Nuha Arwani** dan **KH. Muhammad Ulil Albab Arwani** (wafat 2024 M), di mana lantunan khataman Al-Qur’an oleh para santri *huffadz* tidak pernah berhenti siang dan malam.',
    barokahHajat:
      'Peziarah, santri penghafal Al-Qur’an, dan pengajar TPQ/Yanbu’a yang berziarah ke maqbarah KH. Muhammad Arwani Amin di Kajeksan Kota Kudus umumnya bertawassul memohon kepada Allah SWT kefasihan lisan dalam membaca Al-Qur’an sesuai *tajwid* dan *qira’at* yang bersanad, kekuatan menjaga hafalan Al-Qur’an, serta kebersihan hati melalui zikir.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muhammad Arwani Amin (Pondok Tahfidh Yanbu’ul Qur’an Kudus)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُقْرِئِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ كِيَاهِي الحَاجِّ مُحَمَّدْ أَرْوَانِي أَمِينْ سَعِيدْ وَأَوْلَادِهِ وَمَشَايِخِ يَنْبُوعِ الْقُرْآنِ قُدُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلِ الْقُرْآنَ الْعَظِيمَ رَبِيعَ قُلُوبِنَا وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُقْرِئِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ كِيَاهِي الحَاجِّ مُحَمَّدْ أَرْوَانِي أَمِينْ سَعِيدْ وَأَوْلَادِهِ وَمَشَايِخِ يَنْبُوعِ الْقُرْآنِ قُدُوسْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلِ الْقُرْآنَ الْعَظِيمَ رَبِيعَ قُلُوبِنَا وَانْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Muqri-il-'Allaamatil-'Aarifi billaah Kiyaahii al-Haajj Muhammad Arwaanii Amiin Sa'iid wa aulaadihii wa Masyaayikhi Yanbuu'il-Qur-aan Kudus syai-un lillaahi lahumul-Faatihah. Allaahummaj'alil-Qur-aanal-'Azhiima rabii'a quluubinaa wanfa'naa bi 'uluumihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Muqri’ Al-Allamah Al-Arif billah KH. Muhammad Arwani Amin Said beserta putra-putra dan masyayikh Yanbu’ul Qur’an Kudus, Al-Fatihah. Ya Allah, jadikanlah Al-Qur’an yang agung sebagai penyejuk hati kami, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Muqri’ Al-Allamah Al-Arif billah KH. Muhammad Arwani Amin Said beserta putra-putra dan masyayikh Yanbu’ul Qur’an Kudus, Al-Fatihah. Ya Allah, jadikanlah Al-Qur’an yang agung sebagai penyejuk hati kami, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '25 Rabiul Akhir (Puncak Haul Akbar KH. Muhammad Arwani Amin & Khataman Al-Qur’an Kubro di Pondok Tahfidh Yanbu’ul Qur’an, Kelurahan Kajeksan, Kecamatan Kota, Kabupaten Kudus).',
    localAdab:
      'Wajib mengenakan busana muslim santri yang sopan dan menutup aurat (laki-laki memakai sarung/celana panjang sopan dan peci, perempuan memakai busana muslimah longgar dan kerudung), menjaga keheningan saat berada di maqbarah Yanbu’ul Qur’an, serta menghormati para santri yang sedang menyetorkan hafalan Al-Qur’an.',
    facilities: ['Cungkup Maqbarah KH. Muhammad Arwani Amin', 'Masjid & Aula Pondok Tahfidh Yanbu’ul Qur’an Kajeksan Kudus', 'Pusat Kitab Yanbu’a & Mushaf Al-Qur’an Kudus', 'Terintegrasi dengan Kawasan Ziarah Menara Sunan Kudus'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Arwani, KH. Muhammad (1972). Faidhul Barakat fi Sab’il Qira’at (3 Jilid). Kudus: Pondok Tahfidh Yanbu’ul Qur’an / Menara Kudus.',
      'Tim Penulis PTYQ (2004). Biografi KH. Muhammad Arwani Amin: Maha Guru Al-Qur’an dan Mursyid Thariqah. Kudus: Yanbu’ul Qur’an.',
      'Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Bandung: Mizan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mbah-maimoen-zubair-sarang',
    legacyId: 'ulama-31',
    name: 'Pesantren Al-Anwar & Maqbarah Masyayikh Sarang (KH. Zubair Dahlan & Peninggalan Syaikhina KH. Maimoen Zubair, Rembang)',
    title: 'Poros Sanad Keilmuan Haramain–Pesantren Nusantara di Pesisir Timur Jawa Tengah (Sarang, Rembang)',
    description:
      'Kompleks Pondok Pesantren Al-Anwar dan Maqbarah Masyayikh Sarang di Desa Karangmangu, Kecamatan Sarang, Kabupaten Rembang—pusat pengkaderan ulama fikih dan tafsir yang diasuh oleh Syaikhina KH. Maimoen Zubair (1928–2019 M, dimakamkan di Ma’la Makkah) serta tempat peristirahatan ayahanda beliau KH. Zubair Dahlan dan KH. Imam Khalil.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-21 M (KH. Maimoen Zubair: 28 Oktober 1928 – 6 Agustus 2019 M)',
    province: 'Jawa Tengah',
    city: 'Rembang',
    district: 'Kec. Sarang',
    address: 'Pondok Pesantren Al-Anwar & Maqbarah Masyayikh Karangmangu, Kec. Sarang, Kabupaten Rembang',
    location: {
      lat: -6.7215,
      lng: 111.6482,
      address: 'Pondok Pesantren Al-Anwar & Maqbarah Masyayikh Karangmangu, Kec. Sarang, Kabupaten Rembang',
      district: 'Kec. Sarang',
      city: 'Rembang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Sarang Rembang (PP Al-Anwar Karangmangu & Maqbarah Masyayikh Sarang)',
    sanad:
      'Syaikhina KH. Maimoen Zubair (Mbah Moen) bin KH. Zubair Dahlan (murid Syaikh Umar Hamdan Al-Mahrisi) dan Nyai Hj. Mahmudah binti KH. Ahmad bin Syuaib; murid utama Sayyid Alawi bin Abbas Al-Maliki, Syaikh Hasan Al-Masysyath, dan Syaikh Yasin bin Isa Al-Fadani di Makkah, serta KH. Abdul Karim Lirboyo Kediri.',
    karya: [
      'Pendirian Pondok Pesantren Al-Anwar Sarang Rembang (1967 M) hingga berkembang menjadi Al-Anwar 1, 2, 3, dan STAI Al-Anwar',
      'Karya tulis bahasa Arab: Tarajim Masyayikh Al-Ma’ahid Ad-Diniyyah bi Sarang Al-Qudama’, Al-’Ulama Al-Mujaddidun, dan Taqrirat Mandzumah Jauharatul Tauhid / Bad’ul Amali',
      'Perumusan fikih kebangsaan (PBNU & PPP) yang mengokohkan sintesis keislaman Ahlussunnah wal Jama’ah dan kecintaan pada NKRI (Hubbul Wathan Minal Iman)',
    ],
    history:
      'Kecamatan **Sarang di ujung timur Kabupaten Rembang** (tepat di perbatasan Jawa Tengah dan Kabupaten Tuban, Jawa Timur) sejak abad ke-18 dan ke-19 M telah dikenal sebagai *"Kampung Masyayikh"* sejak dirintis oleh **KH. Ghazali bin Lanah** dan dilanjutkan oleh **KH. Umar bin Harun**, **KH. Syuaib**, **KH. Ahmad bin Syuaib**, **KH. Fathurrahman**, **KH. Imam Khalil**, serta **KH. Zubair bin Dahlan** (1905–1969 M). Puncak kemasyhuran keilmuan Sarang di era kontemporer memancar melalui sosok putra KH. Zubair Dahlan, yakni **Al-Allamah Syaikhina KH. Maimoen Zubair (Mbah Moen)** (lahir di Karangmangu, Sarang pada Kamis Legi, **28 Oktober 1928 M / 14 Jumadil Awal 1347 H** – wafat di Makkah Al-Mukarramah pada Selasa, **6 Agustus 2019 M / 5 Dzulhijjah 1440 H**).\n\nSetelah mengkhatamkan kitab-kitab induk di bawah bimbingan ayahandanya KH. Zubair Dahlan dan paman-pamannya di Sarang, Maimoen muda nyantri di **Pondok Pesantren Lirboyo Kediri** (di bawah KH. Abdul Karim, KH. Marzuqi Dahlan, dan KH. Mahrus Aly), kemudian berangkat ke Makkah Al-Mukarramah pada usia 21 tahun (1950 M). Di Masjidil Haram, beliau menjadi murid kesayangan **Sayyid Alawi bin Abbas Al-Maliki**, **Syaikh Hasan bin Sa’id Al-Yamani**, **Syaikh Amin Al-Kutbi**, dan **Musnidud Dunya Syaikh Yasin bin Isa Al-Fadani**. Sekembalinya ke tanah air, beliau mendirikan **Pondok Pesantren Al-Anwar Karangmangu, Sarang** pada tahun **1967 M**.\n\nSelama lebih dari setengah abad, pengajian kitab *Fathul Wahhab* dan *Tafsir Jalalain* setiap hari Ahad di Pesantren Al-Anwar Sarang dihadiri ribuan santri dan kiai dari seluruh Nusantara. Doa lisan Mbah Moen yang paling dirindukan untuk wafat di Tanah Suci pada hari Selasa akhirnya dikabulkan oleh Allah SWT: beliau wafat saat menunaikan ibadah haji pada hari **Selasa, 6 Agustus 2019 M (5 Dzulhijjah 1440 H)** dan dimakamkan di **Maqbarah Jannatul Ma’la, Makkah Al-Mukarramah** (di dekat makam Sayyidah Khadijah Al-Kubra dan guru beliau Sayyid Alawi Al-Maliki). Di **Desa Karangmangu, Kecamatan Sarang, Kabupaten Rembang**, ribuan peziarah setiap hari mengunjungi **Kompleks Maqbarah Masyayikh Sarang** (makam ayahanda beliau **KH. Zubair Dahlan**, **KH. Ahmad bin Syuaib**, **KH. Imam Khalil**, dan para leluhur pesantren Sarang) serta **Ndalem/Kamar Khalwat Syaikhina KH. Maimoen Zubair di PP Al-Anwar Sarang**.',
    karomah: [
      'Dalam kesaksian jutaan umat Islam Indonesia dan ulama Haramain, karomah paling nyata dari Syaikhina KH. Maimoen Zubair adalah terkabulnya doa dan cita-cita beliau secara persis sebagaimana yang sering beliau ucapkan semasa hidup: wafat dalam keadaan ihram haji di kota suci Makkah Al-Mukarramah, tepat pada hari Selasa (hari wafatnya para ulama keluarga beliau), dan dishalatkan di Masjidil Haram serta dimakamkan di **Jannatul Ma’la Makkah**.<!--more-->\n\nHingga bertahun-tahun setelah wafatnya beliau, ketika makam-makam di Ma’la Makkah digali kembali sesuai prosedur pemakaman Arab Saudi, jasad Syaikhina KH. Maimoen Zubair ditemukan masih utuh sempurna sehingga pusara beliau tetap dipertahankan.',
    ],
    untoldStory:
      'Bagi peziarah di tanah air yang belum berkesempatan berhaji atau umrah untuk berziarah langsung ke pusara Mbah Moen di **Jannatul Ma’la Makkah**, silaturahmi ruhani dan ziarah dipusatkan di **Pondok Pesantren Al-Anwar Karangmangu, Sarang, Rembang** serta **Maqbarah Masyayikh Sarang** tempat bersemayamnya ayahanda sekaligus guru utama beliau, **KH. Zubair Dahlan** (wafat 15 Ramadhan 1389 H / 1969 M), bersama para pendiri Pesantren Sarang.<!--more-->\n\nDi Kompleks PP Al-Anwar Sarang, putra-putra beliau (seperti KH. Muhammad Najih Maimoen, KH. Majid Kamil Maimoen [wafat 2020 M dan dimakamkan di Sarang], KH. Abdul Ghofur Maimoen, KH. Muhammad Wafi Maimoen, dan KH. Idror Maimoen) terus melanjutkan tradisi pengajian kitab kuning bersanad.',
    barokahHajat:
      'Peziarah dan santri yang berziarah ke Maqbarah Masyayikh Sarang (KH. Zubair Dahlan & KH. Majid Kamil Maimoen) serta bertawassul kepada Syaikhina KH. Maimoen Zubair di PP Al-Anwar Sarang Rembang umumnya memohon kepada Allah SWT keluasan ilmu agama yang berkah, dianugerahi keturunan yang alim dan shalih (sebagaimana doa masyhur Mbah Moen), serta wafat dalam keadaan *husnul khatimah*.',
    doaKhusus: [
      {
        title: 'Hadoroh & Doa Ijazah Syaikhina KH. Maimoen Zubair & Masyayikh Sarang (Rembang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ زُبَيْرْ بْنِ دَحْلَانْ وَشَيْخِنَا الْعَلَّامَةِ كِيَاهِي الحَاجِّ مَيْمُونْ زُبَيْرْ وَمَشَايِخِ سَارَانْغ رِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْشُرْ عَلَيْنَا رَحْمَتَكَ وَفُيُوضَاتِ عِلْمِكَ وَاجْعَلْ ذُرِّيَّاتِنَا عُلَمَاءَ صَالِحِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ زُبَيْرْ بْنِ دَحْلَانْ وَشَيْخِنَا الْعَلَّامَةِ كِيَاهِي الحَاجِّ مَيْمُونْ زُبَيْرْ وَمَشَايِخِ سَارَانْغ رِيمْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْشُرْ عَلَيْنَا رَحْمَتَكَ وَفُيُوضَاتِ عِلْمِكَ وَاجْعَلْ ذُرِّيَّاتِنَا عُلَمَاءَ صَالِحِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Zubair bin Dahlan wa Syaikhinal-'Allaamah Kiyaahii al-Haajj Maimoen Zubair wa Masyaayikhi Sarang Rembang syai-un lillaahi lahumul-Faatihah. Allaahummansyur 'alainaa rahmataka wa fuyuudhaati 'ilmika waj'al dzurriyyaatinaa 'ulamaa-a shaalihiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Zubair bin Dahlan, Syaikhina Al-Allamah KH. Maimoen Zubair, dan para masyayikh Sarang Rembang, Al-Fatihah. Ya Allah, bentangkanlah atas kami rahmat-Mu dan limpahan ilmu-Mu, jadikanlah keturunan kami ulama dan orang-orang yang shalih, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Zubair bin Dahlan, Syaikhina Al-Allamah KH. Maimoen Zubair, dan para masyayikh Sarang Rembang, Al-Fatihah. Ya Allah, bentangkanlah atas kami rahmat-Mu dan limpahan ilmu-Mu, jadikanlah keturunan kami ulama dan orang-orang yang shalih, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '5 Dzulhijjah (Puncak Haul Akbar Syaikhina KH. Maimoen Zubair) & 15 Ramadhan (Haul KH. Zubair Dahlan di Pondok Pesantren Al-Anwar, Desa Karangmangu, Kecamatan Sarang, Kabupaten Rembang).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat (laki-laki memakai sarung dan peci, perempuan memakai busana muslimah longgar dan kerudung), melapor ke pos keamanan tamu PP Al-Anwar Karangmangu, serta menjaga ketenangan kegiatan mengaji ribuan santri Sarang.',
    facilities: ['Kompleks Maqbarah Masyayikh Sarang (KH. Zubair Dahlan, KH. Ahmad Syuaib, KH. Majid Kamil)', 'Masjid & Musholla Pondok Pesantren Al-Anwar Karangmangu Sarang', 'Majelis Pengajian Ahadan PP Al-Anwar', 'Area Parkir Bus Wisata Religi Jalur Pantura Sarang Rembang'],
    openingHours: 'Buka Setiap Hari 06.00 – 22.00 WIB (Mengikuti tata tertib Pondok Pesantren Al-Anwar Sarang)',
    references: [
      'Zubair, KH. Maimoen (2008). Tarajim Masyayikh Al-Ma’ahid Ad-Diniyyah bi Sarang Al-Qudama’ (Biografi Ulama-Ulama Sepuh Pesantren Sarang). Sarang: Al-Anwar Press.',
      'Zubair, KH. Maimoen (2009). Al-’Ulama Al-Mujaddidun. Sarang: Al-Anwar Press.',
      'Anam, Choirul (2010). Pertumbuhan dan Perkembangan Nahdlatul Ulama. Surabaya: Duta Aksara Mulia.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'masyayikh-lasem-rembang',
    legacyId: 'ulama-32',
    name: 'Makam Mbah Sambu (Sayyid Abdurrahman), KH. Ma’shum Ahmad & KH. Baidlowi (Kompleks Masjid Jami’ Lasem, Rembang)',
    title: 'Waliyullah Leluhur Ulama Jawa–Madura & Tiga Pendiri Nahdlatul Ulama dari "Tiongkok Kecil" Lasem',
    description:
      'Kompleks Cagar Budaya Masjid Jami’ Lasem dan Maqbarah Masyayikh di Desa Kauman, Kecamatan Lasem, Kabupaten Rembang—tempat peristirahatan Sayyid Abdurrahman Basyaiban (Mbah Sambu, wafat 1671 M), Al-Allamah KH. Muhammad Ma’shum Ahmad (Pendiri PP Al-Hidayat Lasem, 1870–1972 M), dan KH. Baidlowi Lasem.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-17 – Abad ke-20 M (Mbah Sambu wafat 1671 M; Mbah Ma’shum: 1870–1972 M)',
    province: 'Jawa Tengah',
    city: 'Rembang',
    district: 'Kec. Lasem',
    address: 'Kompleks Masjid Jami’ Lasem, Jl. Sunan Bonang KM 1, Desa Kauman / Karangturi, Kec. Lasem, Kabupaten Rembang',
    location: {
      lat: -6.6968,
      lng: 111.4485,
      address: 'Kompleks Masjid Jami’ Lasem, Jl. Sunan Bonang KM 1, Desa Kauman / Karangturi, Kec. Lasem, Kabupaten Rembang',
      district: 'Kec. Lasem',
      city: 'Rembang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Masjid_Menara_Kudus.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Cagar Budaya Masjid Jami’ Lasem & Maqbarah Mbah Sambu serta KH. Ma’shum Ahmad Lasem Rembang',
    sanad:
      'Sayyid Abdurrahman bin Sayyid Hasyim bin Sayyid Abdurrahman Basyaiban (Mbah Sambu, menantu Adipati Lasem Tejakusuma I); menurunkan Syaikhona Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari, dan KH. Abdul Wahab Hasbullah. Adapun KH. Ma’shum Ahmad adalah murid Syaikhona Kholil Bangkalan, KH. Hasyim Asy’ari, dan Syaikh Mahfudz At-Tarmasi.',
    karya: [
      'Peletakan silsilah emas ulama Jawa–Madura melalui dzurriyah Mbah Sambu (Sayyid Abdurrahman Basyaiban) dan pendirian Masjid Jami’ Lasem (1588 M)',
      'Pendirian Pondok Pesantren Al-Hidayat Soditan Lasem (1916 M) oleh KH. Ma’shum Ahmad dan Pesantren Al-Wahdah oleh KH. Baidlowi bin Abdul Aziz',
      'Peran 3 Ulama Serangkai Lasem (KH. Ma’shum Ahmad, KH. Khalil Masyhuri, dan KH. Baidlowi) sebagai muassis Nahdlatul Ulama (1926) dan pelopor harmoni Muslim-Tionghoa di Lasem',
    ],
    history:
      'Kota tua **Lasem di Kabupaten Rembang** bukan hanya dikenal karena warisan arsitektur Pecinan dan perjuangan **Perang Kuning (1741–1743 M)** di mana ulama santri (**Kyai Ali Badawi**) dan masyarakat Tionghoa (**Tan Kee Wie** dan **Oey Ing Kiat / Raden Panji Margono**) bersatu melawan VOC Belanda, melainkan juga merupakan **Poros Genealogis dan Intelektual Ulama Nusantara**. Di Kompleks **Masjid Jami’ Lasem** (didirikan tahun 1588 M oleh Adipati Tejakusuma I), bersemayam waliyullah agung abad ke-17 M, **Sayyid Abdurrahman bin Hasyim Basyaiban** yang bergelar **Pangeranabdurrahman Sambu Digdadiningrat (Mbah Sambu)** (wafat sekitar tahun 1671 M). Dari sulbi Mbah Sambu Lasem inilah lahir silsilah emas hampir seluruh kiai besar Pulau Jawa dan Madura: mulai dari **Syaikhona Kholil Bangkalan**, **Hadratussyaikh KH. Hasyim Asy’ari (Tebuireng)**, **KH. Abdul Wahab Hasbullah (Tambakberas)**, hingga **KH. Bisri Mustofa (Rembang)**.\n\nPada abad ke-20 M, kemuliaan Masjid Jami’ Lasem semakin bercahaya dengan dimakamkannya **Al-Allamah KH. Muhammad Ma’shum bin KH. Ahmad Abdul Karim (Mbah Ma’shum Lasem)** (lahir 1870 M – wafat Jumat, **20 Oktober 1972 M / 12 Ramadhan 1392 H** dalam usia 102 tahun). Mbah Ma’shum adalah murid kesayangan Syaikhona Kholil Bangkalan yang pada tahun **1916 M** mendirikan **Pondok Pesantren Al-Hidayat di Soditan, Lasem**. Dari Pesantren Al-Hidayat Lasem dan rahim keluarga Mbah Ma’shum lahir ulama-ulama raksasa seperti putra beliau **KH. Ali Maksum (Rais Aam PBNU, Krapyak)** dan **KH. Ahmad Syakir Ma’shum**, serta santri-santri utama seperti **KH. Abdul Hamid Pasuruan**, **KH. Abdullah Faqih Langitan**, **KH. Mahrus Aly Lirboyo**, dan **KH. Fuad Hasyim Buntet**.\n\nDi Kompleks Pemakaman Utara Masjid Jami’ Lasem, tepat di samping pusara KH. Ma’shum Ahmad, bersemayam pula menantu sekaligus sahabat seperjuangan beliau dalam mendirikan Nahdlatul Ulama (1926), **Al-Allamah KH. Baidlowi bin Abdul Aziz Lasem** (wafat 1970 M, pengarang nadzam *Faraidh* dan pengasuh Pesantren Al-Wahdah), serta ulama pejuang Perang Kuning **Kyai Ali Badawi**.',
    karomah: [
      'Dalam kitab manaqib *Mbah Ma’shum Lasem* dan kesaksian para ulama, ketika Mbah Ma’shum muda datang nyantri ke Bangkalan Madura, **Syaikhona Kholil Bangkalan** menyuruh santri-santrinya membuat kurungan ayam dan bersabda: *"Aku mau kedatangan jago (ayam jantan) dari tanah Jawa yang kelak suaranya membangunkan seluruh Jawa."* Tak lama kemudian datanglah pemuda Muhammad Ma’shum dari Lasem.<!--more-->\n\nDi Kompleks Masjid Jami’ Lasem juga terdapat karomah persaudaraan lintas iman yang teruji sejarah: keturunan ulama Lasem dan warga Tionghoa Karangturi/Soditan hidup berdampingan dengan penuh hormat sejak masa Mbah Sambu dan Perang Kuning 1742 hingga masa Mbah Ma’shum dan Gus Zaim (KH. Zaim Ahmad Ma’shum) hari ini.',
    ],
    untoldStory:
      'Di dalam kompleks **Masjid Jami’ Lasem**, maqbarah para auliya terbagi menjadi dua bagian utama: di **Sisi Barat/Belakang Mihrab** terdapat cungkup kuno berarsitektur Jawa-Hindia tempat bersemayamnya **Mbah Sambu (Sayyid Abdurrahman Basyaiban)** dan **Adipati Tejakusuma I (Mbah Srimpet)**; sedangkan di **Sisi Utara Serambi Masjid** terdapat kompleks makam keluarga besar **KH. Ma’shum Ahmad**, **Nyai Hj. Nuriyyah Zainuddin**, **KH. Baidlowi bin Abdul Aziz**, dan **KH. Ahmad Syakir Ma’shum**.<!--more-->\n\nDi halaman depan Masjid Jami’ Lasem juga berdiri **Perpustakaan dan Museum Islam Nusantara Lasem** yang menyimpan manuskrip Al-Qur’an kuno tulis tangan abad ke-17 hingga ke-19 M serta artefak sejarah Lasem.',
    barokahHajat:
      'Peziarah, santri, dan pengasuh pesantren yang berziarah ke maqbarah Mbah Sambu, KH. Ma’shum Ahmad, dan KH. Baidlowi di Kompleks Masjid Jami’ Lasem Rembang umumnya bertawassul memohon kepada Allah SWT ketersambungan berkah silsilah ilmu ulama Jawa–Madura, kesabaran dan keistiqamahan dalam mendidik santri/anak, serta kerukunan hidup bermasyarakat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Mbah Sambu (Sayyid Abdurrahman), KH. Ma’shum Ahmad & KH. Baidlowi (Masjid Jami’ Lasem Rembang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ السَّيِّدِ عَبْدِ الرَّحْمٰنِ بَاشَيْبَانْ (مبَاهْ سَامْبُو) وَالْعَلَّامَةِ كِيَاهِي الحَاجِّ مُحَمَّدْ مَعْصُومْ أَحْمَدْ وَكِيَاهِي الحَاجِّ بَيْضَاوِي وَمَشَايِخِ لَاسِيمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ السَّيِّدِ عَبْدِ الرَّحْمٰنِ بَاشَيْبَانْ (مبَاهْ سَامْبُو) وَالْعَلَّامَةِ كِيَاهِي الحَاجِّ مُحَمَّدْ مَعْصُومْ أَحْمَدْ وَكِيَاهِي الحَاجِّ بَيْضَاوِي وَمَشَايِخِ لَاسِيمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَافْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ وَانْفَعْنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah as-Sayyid 'Abdir-Rahmaan Baasyaibaan (Mbah Sambu) wal-'Allaamah Kiyaahii al-Haajj Muhammad Ma'shuum Ahmad wa Kiyaahii al-Haajj Baidhaawii wa Masyaayikhi Lasem syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum waftah 'alainaa futuuhal-'aarifiina wanfa'naa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Sayyid Abdurrahman Basyaiban (Mbah Sambu), Al-Allamah KH. Muhammad Ma’shum Ahmad, KH. Baidlowi, beserta para masyayikh Lasem, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, bukakanlah bagi kami pintu makrifat para arifin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Sayyid Abdurrahman Basyaiban (Mbah Sambu), Al-Allamah KH. Muhammad Ma’shum Ahmad, KH. Baidlowi, beserta para masyayikh Lasem, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, bukakanlah bagi kami pintu makrifat para arifin, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Ramadhan & Jumadil Akhir (Haul Akbar Mbah Ma’shum Ahmad Lasem) serta Bulan Dzulhijjah / Muharram (Haul Agung Mbah Sambu Sayyid Abdurrahman di Kompleks Masjid Jami’ Lasem, Kabupaten Rembang).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melepas alas kaki saat memasuki pelataran serambi Masjid Jami’ Lasem menuju cungkup Mbah Sambu (di barat masjid) maupun Maqbarah Mbah Ma’shum (di utara masjid), serta menjaga ketertiban jamaah.',
    facilities: ['Masjid Jami’ Lasem (Cagar Budaya 1588 M)', 'Cungkup Maqbarah Mbah Sambu (Sayyid Abdurrahman Basyaiban)', 'Maqbarah KH. Ma’shum Ahmad & KH. Baidlowi Lasem', 'Museum Islam Nusantara Lasem & Parkir Bus Wisata Religi Lasem'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Aziz, Munawir (2014). Lasem Kota Tiongkok Kecil: Interaksi Tionghoa, Arab, dan Jawa dalam Silang Budaya Pesisir. Yogyakarta: Ombak.',
      'Chaidar (1972). Manaqib Mbah Ma’shum Lasem (KH. Muhammad Ma’shum bin KH. Ahmad). Kudus: Menara Kudus.',
      'Basyaiban, Muhsin (2018). Silsilah dan Sejarah Sayyid Abdurrahman Basyaiban (Mbah Sambu Lasem). Malang: Mihrab.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-hasyim-bin-yahya-pekalongan',
    legacyId: 'habib-14',
    name: 'Makam Habib Hasyim bin Umar bin Thoha bin Yahya (Kakek Habib Luthfi — Sapuro, Pekalongan)',
    title: 'Waliyullah Quthub Pesisir Utara Jawa & Leluhur Maulana Habib Luthfi bin Yahya di Sapuro Pekalongan',
    description:
      'Kompleks Pemakaman Islam Sapuro di Kelurahan Sapuro Kebulen, Kecamatan Pekalongan Barat, Kota Pekalongan—tempat peristirahatan Al-Habib Hasyim bin Umar bin Thoha bin Yahya (wafat 1349 H / 1930 M), ulama sufi besar yang menjadi kakek kandung sekaligus rujukan sanad Maulana Habib Muhammad Luthfi bin Ali bin Hasyim bin Yahya.',
    category: 'Habaib',
    era: 'Akhir Abad ke-19 – Awal Abad ke-20 M (Wafat 12 Rabiul Awal 1349 H / 1930 M)',
    province: 'Jawa Tengah',
    city: 'Pekalongan',
    district: 'Kec. Pekalongan Barat',
    address: 'Kompleks Pemakaman Sapuro, Jl. KHM. Mansyur, Kel. Sapuro Kebulen, Kec. Pekalongan Barat, Kota Pekalongan',
    location: {
      lat: -6.8935,
      lng: 109.6642,
      address: 'Kompleks Pemakaman Sapuro, Jl. KHM. Mansyur, Kel. Sapuro Kebulen, Kec. Pekalongan Barat, Kota Pekalongan',
      district: 'Kec. Pekalongan Barat',
      city: 'Pekalongan',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Habaib Pekalongan (Kompleks Maqbarah Sapuro: Habib Ahmad Al-Attas & Habib Hasyim bin Yahya)',
    sanad:
      'Al-Habib Hasyim bin Umar bin Thoha bin Hasan bin Thoha bin Muhammad Al-Qadhi bin Thoha bin Muhammad bin Syaikh bin Ahmad bin Yahya Ba’alawi; cucu dari waliyullah besar Semarang/Cirebon Habib Thoha bin Hasan bin Yahya (Ciledug/Jatiseeng); kakek kandung dari Al-Habib Muhammad Luthfi bin Ali bin Hasyim bin Yahya (Rais Aam JATMAN).',
    karya: [
      'Pembinaan jaringan dakwah Thariqah ’Alawiyyah dan Syadziliyah di sepanjang pantai utara Jawa Tengah dan Jawa Barat (Pekalongan, Batang, Pemalang, Tegal, Cirebon)',
      'Pendampingan spiritual para kiai pesantren dan pejuang bumiputra di Karesidenan Pekalongan bersama sahabat beliau Habib Ahmad bin Abdullah bin Thalib Al-Attas',
    ],
    history:
      '**Al-Habib Hasyim bin Umar bin Thoha bin Yahya** (wafat pada bulan Rabiul Awal 1349 H / sekitar tahun 1930 M) adalah waliyullah besar dan ulama *Ahlul Bait* yang menjadi salah satu tiang penyangga ruhani masyarakat Pantai Utara Jawa Tengah pada akhir abad ke-19 hingga awal abad ke-20 M. Beliau berasal dari keluarga besar *Saadah Ba’alawi* marga **Bin Yahya** yang telah lama menyatu dengan perjuangan dakwah dan antikolonial di Nusantara: kakek buyut beliau adalah **Habib Hasan bin Thoha bin Yahya (Syaikh Kramat Jati / Singo Barong di Lamper Kidul, Semarang)** yang merupakan panglima perang Kesultanan Yogyakarta dan mertua Pangeran Diponegoro, sedangkan kakek beliau adalah **Habib Thoha bin Hasan bin Yahya** (yang dimakamkan di Jatiseeng, Ciledug, Cirebon).\n\nDalam perjalanan dakwahnya di Kota Pekalongan dan sekitarnya, Habib Hasyim bin Umar bin Yahya dikenal sebagai ulama yang sangat alim dalam ilmu fikih, tasawuf, dan falak, namun memilih jalan *khumul* (menyembunyikan kemasyhuran diri) dan hidup sangat dekat dengan rakyat kecil, para petani, serta kiai-kiai kampung. Beliau menjalin persahabatan ruhani yang sangat erat dengan **Al-Habib Ahmad bin Abdullah bin Thalib Al-Attas** di Pekalongan serta **KH. Said bin Armia** di Giren Tegal.\n\nDari putra beliau, **Al-Habib Ali bin Hasyim bin Yahya**, lahirlah ulama kharismatik pemimpin *Jam’iyyah Ahlith Thariqah Al-Mu’tabarah An-Nahdliyyah (JATMAN)*, **Maulana Al-Habib Muhammad Luthfi bin Ali bin Hasyim bin Yahya**. Setelah wafat pada tahun 1349 H (1930 M), Habib Hasyim bin Umar bin Yahya dimakamkan di **Kompleks Pemakaman Islam Sapuro, Kecamatan Pekalongan Barat, Kota Pekalongan** (satu kompleks pemakaman dengan kubah maqbarah Habib Ahmad bin Abdullah bin Thalib Al-Attas).',
    karomah: [
      'Dalam manaqib keluarga Bin Yahya dan tutur lisan para kiai sepuh Pekalongan, karomah Habib Hasyim bin Umar bin Yahya tampak dari ketajaman *firasat* batin dan kemakbulan doa beliau bagi keturunannya: jauh sebelum cucunya lahir, beliau telah memberi isyarat bahwa dari sulbi putranya (Habib Ali) kelak akan lahir seorang ulama besar yang mempersatukan mursyid-mursyid tarekat dan menjaga keutuhan bangsa Indonesia.<!--more-->\n\nDi Kompleks Pemakaman Sapuro Pekalongan, ribuan peziarah yang datang ke Kubah Habib Ahmad bin Abdullah bin Thalib Al-Attas selalu menyempatkan diri berziarah ke pusara **Habib Hasyim bin Umar bin Yahya** dan **Habib Ali bin Hasyim bin Yahya** (ayahanda Habib Luthfi) yang berada di kompleks yang sama.',
    ],
    untoldStory:
      'Silsilah keluarga **Habib Hasyim bin Umar bin Yahya** di Sapuro Pekalongan menghubungkan tiga titik ziarah besar di Jawa Tengah dan Jawa Barat: **Makam Habib Hasan bin Thoha bin Yahya (Mbah Singo Barong)** di Duku/Lamper Kidul Semarang, **Makam Habib Thoha bin Hasan bin Yahya** di Jatiseeng Ciledug Cirebon, dan **Makam Habib Hasyim bin Umar bin Yahya** di Sapuro Pekalongan.<!--more-->\n\nPeringatan Haul Habib Hasyim bin Umar bin Yahya di Pekalongan selalu dirangkai dengan pembacaan *Maulid Simthuddurar*, *Maulid Ad-Diba’i*, dan kirab merah-putih yang dipimpin langsung oleh dzurriyah beliau di Kanzus Sholawat Pekalongan.',
    barokahHajat:
      'Peziarah dan pengamal tarekat yang berziarah ke maqbarah Habib Hasyim bin Umar bin Yahya di Sapuro Pekalongan umumnya bertawassul memohon kepada Allah SWT keistiqamahan dalam berzikir dan bershalawat, keberkahan silsilah keluarga yang cinta ulama dan tanah air, serta ketenangan batin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Habib Hasyim bin Umar bin Yahya & Habib Ali bin Hasyim bin Yahya (Sapuro Pekalongan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ هَاشِمْ بْنِ عُمَرَ بْنِ طٰهَ بْنِ يَحْيَى وَوَلَدِهِ الْحَبِيبِ عَلِيِّ بْنِ هَاشِمْ بْنِ يَحْيَى سَافُورُو فِيكَالُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَأَدِمْ عَلَيْنَا نِعْمَةَ الْإِيمَانِ وَالْأَمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ الْحَبِيبِ هَاشِمْ بْنِ عُمَرَ بْنِ طٰهَ بْنِ يَحْيَى وَوَلَدِهِ الْحَبِيبِ عَلِيِّ بْنِ هَاشِمْ بْنِ يَحْيَى سَافُورُو فِيكَالُونْغَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَأَدِمْ عَلَيْنَا نِعْمَةَ الْإِيمَانِ وَالْأَمَانِ وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah al-Habiib Haasyim bin 'Umar bin Thaahaa bin Yahyaa wa waladihil-Habiib 'Alii bin Haasyim bin Yahyaa Sapuro Pekalongan syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wa adim 'alainaa ni'matal-iimaani wal-amaani wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Habib Hasyim bin Umar bin Thoha bin Yahya beserta putranya Habib Ali bin Hasyim bin Yahya Sapuro Pekalongan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, kekalkanlah atas kami nikmat iman dan keamanan negeri, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Habib Hasyim bin Umar bin Thoha bin Yahya beserta putranya Habib Ali bin Hasyim bin Yahya Sapuro Pekalongan, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, kekalkanlah atas kami nikmat iman dan keamanan negeri, serta limpahkanlah kemanfaatan melalui keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Rabiul Awal / Maulid Akbar Kanzus Sholawat & 14 Sya’ban (Rangkaian Haul di Kompleks Pemakaman Sapuro, Kecamatan Pekalongan Barat, Kota Pekalongan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam keluarga Bin Yahya dan Al-Attas di Kompleks Sapuro, serta menjaga kekhusyukan peziarah lainnya.',
    facilities: ['Cungkup Maqbarah Habib Hasyim bin Umar bin Yahya & Habib Ali bin Yahya', 'Kubah Maqbarah Habib Ahmad bin Abdullah bin Thalib Al-Attas Sapuro', 'Masjid Raudhatul Jannah Sapuro', 'Terminal Parkir Bus Wisata Religi Sapuro Pekalongan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Yahya, Habib Luthfi bin Ali bin (2012). Secercah Tinta: Jalinan Cinta Seorang Hamba dengan Sang Pencipta. Pekalongan: Menara Publisher.',
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait. Jeddah: Alamul Ma’rifah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-ahmad-rifai-kalisalak',
    legacyId: 'ulama-40',
    name: 'Situs Pesantren & Maqbarah Dzurriyah KH. Ahmad Rifa’i Kalisalak (Limpung, Batang)',
    title: 'Pahlawan Nasional, Mujaddid Kitab Tarajumah Pegon (60+ Kitab) & Pejuang Antikolonial Abad ke-19',
    description:
      'Kompleks Situs Sejarah Masjid Baitul Muttaqin, Pondok Pesantren, dan Maqbarah Keluarga/Murid Pahlawan Nasional KH. Ahmad Rifa’i (1786–1870 M) di Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang (serta monumen perjuangan beliau yang diasingkan Belanda hingga wafat di Kampung Jawa Tondano, Minahasa).',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 M (13 November 1786 – 1870/1875 M)',
    province: 'Jawa Tengah',
    city: 'Batang',
    district: 'Kec. Limpung',
    address: 'Kompleks Masjid Baitul Muttaqin & Situs KH. Ahmad Rifa’i, Desa Kalisalak, Kec. Limpung, Kabupaten Batang',
    location: {
      lat: -7.0185,
      lng: 109.9214,
      address: 'Kompleks Masjid Baitul Muttaqin & Situs KH. Ahmad Rifa’i, Desa Kalisalak, Kec. Limpung, Kabupaten Batang',
      district: 'Kec. Limpung',
      city: 'Batang',
      province: 'Jawa Tengah',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Masjid_Agung_Demak.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pahlawan Nasional Jawa Tengah (Situs Perjuangan & Pesantren KH. Ahmad Rifa’i Kalisalak Limpung Batang)',
    sanad:
      'Putra KH. Muhammad Marhum bin KH. Abi Sujak (Penghulu Kendal keturunan Raden Mas Hadi / Sunan Kalijaga); nyantri kepada KH. Asy’ari Kaliwungu Kendal, lalu bermukim 8 tahun di Makkah dan Madinah (1833–1841 M) berguru kepada Syaikh Abdurrahman, Syaikh Abu Su’ud, Syaikh Muhammad bin Abdul Aziz Al-Habasyi, dan Syaikh Ahmad Al-Fayyumi.',
    karya: [
      'Lebih dari 62 kitab nadzam bahasa Jawa beraksara Arab Pegon (Kitab Tarajumah), di antaranya Ri’ayatul Himmah, Abyanul Hawaij, Syarihul Iman, Tabyinul Ishlah, dan Husnul Mithalab',
      'Pendirian pusat pendidikan Islam dan gerakan resistensi antikolonial di Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang (1841–1859 M)',
      'Warisan organisasi kemasyarakatan Islam Rifa’iyah yang berpusat di Batang, Pekalongan, Kendal, dan Wonosobo',
    ],
    history:
      '**KH. Ahmad Rifa’i** (lahir di Desa Tempuran, Kabupaten Kendal pada Kamis, **9 Muharram 1200 H / 13 November 1786 M** – wafat di pengasingan Kampung Jawa Tondano, Minahasa pada tahun **1870/1875 M**; ditetapkan sebagai **Pahlawan Nasional RI** oleh Presiden Susilo Bambang Yudhoyono melalui **Keppres No. 089/TK/2004 tanggal 5 November 2004**) adalah salah satu ulama paling produktif dalam sejarah literasi *Arab Pegon Nusantara* sekaligus pelopor gerakan perlawanan kultural-teologis terhadap kolonialisme Belanda pada abad ke-19 M. Setelah nyantri di Kaliwungu Kendal di bawah asuhan kakak iparnya, **KH. Asy’ari (Kyai Guru)**, dan berdakwah dengan tegas menentang penindasan kolonial di Kendal, beliau berangkat ke Makkah dan Madinah pada tahun 1833 M serta bermukim menuntut ilmu selama delapan tahun.\n\nSekembalinya dari Tanah Suci sekitar tahun 1841 M karena Kendal diawasi ketat oleh pemerintah kolonial Hindia Belanda, KH. Ahmad Rifa’i hijrah dan mendirikan pusat pesantren di **Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang** setelah menikah dengan Nyai Sujinah (janda Demang Kalisalak Kyai Murtaman). Di Kalisalak Batang inilah terjadi ledakan intelektual yang luar biasa: KH. Ahmad Rifa’i menulis lebih dari **62 judul kitab berbahasa Jawa beraksara Arab Pegon** dalam bentuk *nadzam* (puisi berirama) dan prosa yang disebut **Kitab Tarajumah** (seperti *Ri’ayatul Himmah*, *Syarihul Iman*, *Abyanul Hawaij*, dan *Tabyinul Ishlah*) agar masyarakat awam Jawa dapat memahami akidah, fikih Syafi’iyah, dan tasawuf secara langsung sekaligus menanamkan fatwa jihad antikolonial bahwa bekerja sama dengan penjajah kafir Belanda adalah haram.\n\nKetegasan dakwah dan membludaknya ribuan santri *Tarajumah* dari Batang, Pekalongan, Kendal, Wonosobo, hingga Jawa Barat membuat Residen Pekalongan F.N. Nieuwenhuijzen dan Gubernur Jenderal Belanda menangkap KH. Ahmad Rifa’i pada bulan **Mei 1859 M** dan mengasingkan beliau ke **Ambon (Maluku)** lalu dipindahkan ke **Kampung Jawa Tondano, Minahasa, Sulawesi Utara** (bersama rombongan Kyai Mojo) hingga beliau wafat sekitar tahun **1870/1875 M**. Di **Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang**, kompleks masjid pesantren, koleksi manuskrip asli *Kitab Tarajumah*, serta maqbarah keluarga dan murid-murid utama beliau (**Mbah Kyai Ilham Kalisalak** dan dzurriyah) menjadi pusat ziarah, haul nasional, dan kajian sejarah Pahlawan Nasional KH. Ahmad Rifa’i.',
    karomah: [
      'Dalam kajian sejarah Prof. Sartono Kartodirdjo dan Prof. Karel A. Steenbrink (*Beberapa Aspek tentang Islam di Indonesia Abad ke-19*), keistimewaan luar biasa KH. Ahmad Rifa’i adalah kemampuannya menyusun lebih dari 60 kitab tebal bersajak (*nadzam pegon*) dengan ribuan bait di tengah keterbatasan kertas dan tekanan pengawasan intelijen kolonial Belanda di Kalisalak Batang.<!--more-->\n\nMeskipun pemerintah kolonial Belanda menyita ratusan keranjang manuskrip *Kitab Tarajumah* saat menangkap KH. Ahmad Rifa’i pada tahun 1859 M (yang sebagian kini tersimpan di Perpustakaan Universitas Leiden Belanda), para santri Kalisalak berhasil menyalin ulang dan menyembunyikan naskah-naskah tersebut di bumbung bambu hingga tetap lestari dan dikaji di madrasah-madrasah *Rifa’iyah* hingga abad ke-21.',
    ],
    untoldStory:
      'Jejak sejarah KH. Ahmad Rifa’i menghubungkan tiga provinsi di Indonesia: tanah kelahiran beliau di **Kendal (Masjid Agung Kendal)**, pusat pesantren dan penulisan puluhan kitab beliau di **Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang**, serta pusara jasad beliau di **Kompleks Makam Kyai Mojo & KH. Ahmad Rifa’i di Kampung Jawa Tondano, Kabupaten Minahasa, Sulawesi Utara**.<!--more-->\n\nDi Situs Kalisalak Limpung Batang, peziarah dapat berziarah ke makam keluarga dan murid penerus beliau (seperti Kyai Murtaman / Nyai Sujinah dan para sesepuh Kalisalak) serta melihat langsung warisan sumur kuno dan manuskrip *Kitab Tarajumah* peninggalan sang Pahlawan Nasional.',
    barokahHajat:
      'Peziarah, peneliti filologi, dan santri yang berziarah ke Situs Pesantren & Maqbarah Kalisalak Limpung Batang serta bertawassul kepada Pahlawan Nasional KH. Ahmad Rifa’i umumnya memohon kepada Allah SWT keteguhan memegang prinsip kebenaran (*izzul Islam wal muslimin*), produktivitas dalam menulis dan menyebarkan ilmu agama, serta keberkahan perjuangan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Pahlawan Nasional KH. Ahmad Rifa’i Kalisalak (Limpung Batang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الْمُجَدِّدِ الشَّيْخِ الحَاجِّ أَحْمَدْ رِفَاعِي بْنِ مُحَمَّدْ مَرْحُومْ كَالِيسَالَاكْ بَاتَانْغ وَتَلَامِيذِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ قُلُوبَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الْمُجَدِّدِ الشَّيْخِ الحَاجِّ أَحْمَدْ رِفَاعِي بْنِ مُحَمَّدْ مَرْحُومْ كَالِيسَالَاكْ بَاتَانْغ وَتَلَامِيذِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْ قُلُوبَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahidil-Mujaddidi asy-Syaikh al-Haajj Ahmad Rifaa'ii bin Muhammad Marhuum Kalisalak Batang wa talaamiidzihii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa tsabbit quluubanaa 'alal-haqqi wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang dan mujaddid KH. Ahmad Rifa’i bin Muhammad Marhum Kalisalak Batang beserta para muridnya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah hati kami di atas kebenaran, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang dan mujaddid KH. Ahmad Rifa’i bin Muhammad Marhum Kalisalak Batang beserta para muridnya, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, teguhkanlah hati kami di atas kebenaran, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '9 Muharram & 5 November (Puncak Haul Akbar Nasional & Hari Pahlawan Mengenang KH. Ahmad Rifa’i di Desa Kalisalak, Kecamatan Limpung, Kabupaten Batang, Jawa Tengah).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, menjaga adab di lingkungan Masjid Baitul Muttaqin dan Situs Maqbarah Kalisalak Limpung Batang, serta menghormati tradisi pengajian kitab Tarajumah warga setempat.',
    facilities: ['Masjid Baitul Muttaqin & Situs Pesantren KH. Ahmad Rifa’i Kalisalak', 'Maqbarah Keluarga & Murid Sepuh Kalisalak Limpung', 'Galeri Manuskrip Kitab Tarajumah Rifa’iyah', 'Area Parkir Peziarah Kalisalak Limpung Batang'],
    openingHours: 'Buka Setiap Hari 06.00 – 21.00 WIB',
    references: [
      'Djamil, Abdul (2001). Perlawanan Kiai Desa: Pemikiran dan Gerakan Islam KH. Ahmad Rifa’i Kalisalak. Yogyakarta: LKiS.',
      'Steenbrink, Karel A. (1984). Beberapa Aspek tentang Islam di Indonesia Abad ke-19. Jakarta: Bulan Bintang.',
      'Kartodirdjo, Sartono (1973). Protest Movements in Rural Java. Singapore: Oxford University Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];

