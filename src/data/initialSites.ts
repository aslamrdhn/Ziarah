import type { ZiarahSite } from './sites';

export const TOTAL_SITE_COUNT = 183;
export const TOTAL_SITES_COUNT = 183;
export const TOTAL_PROVINCES_COUNT = 34;

export const ALL_PROVINCES: string[] = [
  'Semua Provinsi',
  'Aceh',
  'Bali',
  'Banten',
  'Bengkulu',
  'DI Yogyakarta',
  'DKI Jakarta',
  'Gorontalo',
  'Jambi',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Kalimantan Barat',
  'Kalimantan Selatan',
  'Kalimantan Tengah',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Kepulauan Bangka Belitung',
  'Kepulauan Riau',
  'Lampung',
  'Maluku',
  'Maluku Utara',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Papua Barat',
  'Papua Barat Daya',
  'Riau',
  'Sulawesi Barat',
  'Sulawesi Selatan',
  'Sulawesi Tengah',
  'Sulawesi Tenggara',
  'Sulawesi Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Sumatera Utara',
];

export const initialSites: ZiarahSite[] = [
  {
    id: 'syekh-maulana-malik-ibrahim',
    legacyId: 'wali-1',
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
      'Malam itu angin kemarau berembus kering di pesisir Leran, Gresik. Di bawah cahaya pelita minyak jarak yang redup, seorang petani tua datang merangkak ke serambi surau sambil mendekap segenggam bulir padi yang hampa; sawahnya retak berair payau dan anak-anaknya sudah dua hari hanya meminum air tajin.<!--more-->\n\nSyekh Maulana Malik Ibrahim tidak langsung menceramahi petani itu dengan dalil-dalil rumit, melainkan memeluk bahunya yang gemetar dan menyuguhkan semangkuk bubur gandum hangat dari dapurnya sendiri. Keesokan paginya sebelum fajar menyingsing, sang Wali turun langsung mencangkul parit bersama warga untuk mengalirkan air tawar dari perbukitan ke sawah-sawah pesisir Gresik dan mengajarkan teknik penyaringan air.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Area Parkir Bus & Mobil', 'Toilet & Tempat Wudhu', 'Pendopo Peziarah'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap 12 Rabiul Awal (Haul Akbar Syekh Maulana Malik Ibrahim di Gapuro Sukolilo, Gresik)',
    localAdab: [
      'Melepas alas kaki sebelum menaiki serambi cungkup utama makam Gapuro Sukolilo dan menjaga ketenangan dzikir',
      'Mengenakan busana muslim rapi (tidak memakai celana pendek) serta mendahulukan jamaah sepuh di barisan depan nisan batu pualam Khambhat'
    ],
    barokahHajat: [
      'Wasilah keberkahan usaha perniagaan yang jujur, pertanian, dan ketahanan pangan keluarga',
      'Ikhtiar kesembuhan penyakit lahir-batin sebagaimana keteladanan beliau sebagai tabib pengobatan gratis rakyat',
      'Keteguhan iman dalam merintis dakwah dan amal kebajikan di lingkungan yang baru'
    ],
    doaKhusus: [
      {
        title: 'Tawasul Khusus Syekh Maulana Malik Ibrahim',
        text: 'إِلَى حَضْرَةِ الشَّيْخِ مَوْلَانَا مَالِكْ إِبْرَاهِيمَ المَغْرِبِيِّ أَوَّلِ الوَلِيِّ السَّنْغَا بِغَرْسِيكْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratisy Syaikh Maulânâ Mâlik Ibrâhîmal Maghribî awwalil Waliyyis Sanga bi Gharsîk, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Syekh Maulana Malik Ibrahim Al-Maghribi, perintis utama Walisongo di Gresik, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Keberkahan Usaha & Kesembuhan',
        text: 'اللَّهُمَّ بَارِكْ لَنَا فِي أَرْزَاقِنَا وَزُرُوعِنَا وَتِجَارَتِنَا، وَاشْفِ مَرْضَانَا شِفَاءً لَا يُغَادِرُ سَقَمًا بِبَرَكَةِ الصَّالِحِينَ.',
        latin: 'Allâhumma bârik lanâ fî arzâqinâ wa zurû\'inâ wa tijâratinâ, wasyfi mardhânâ syifâ\'an lâ yughâdiru saqaman bibarakatish shâlihîn.',
        translation: 'Ya Allah, berkahilah rezeki, pertanian, dan perniagaan kami, serta sembuhkanlah yang sakit di antara kami dengan kesembuhan sempurna berkat kemuliaan orang-orang shalih.'
      }
    ],
  },
  {
    id: 'sunan-ampel',
    legacyId: 'wali-2',
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
      'Sepertiga malam di serambi Masjid Agung Ampel Denta terasa begitu hening, hanya terdengar gemericik air wudhu dan desir angin dari arah Sungai Kalimas. Tiba-tiba seorang pemuda bangsawan Majapahit yang hancur hidupnya akibat judi, minuman keras, dan lilitan utang datang merangkak di lantai kayu sambil menangis tersedu-sedu.<!--more-->\n\nDi hadapan Raden Rahmat (Sunan Ampel), pemuda itu mengaku ingin mengakhiri hidupnya karena merasa terlalu kotor untuk diampuni Tuhan. Sunan Ampel meletakkan telapak tangannya yang hangat di pundak pemuda itu, membimbingnya mengambil air wudhu dari sumur pesantren, lalu membisikkan lima janji penyucian diri yang kelak dikenal di seluruh Tanah Jawa sebagai falsafah "Moh Limo".',
    facilities: ['Masjid Agung Sunan Ampel (Berdiri 1421 M)', 'Sumur Karomah Nadzir', 'Area Wudhu & Toilet Terpadu'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap Akhir Bulan Sya\'ban (Jumat/Sabtu/Ahad Terakhir Sya\'ban — Haul Akbar Kanjeng Sunan Ampel Surabaya)',
    localAdab: [
      'Menjaga adab pemisahan jalur peziarah laki-laki dan perempuan di pelataran cungkup makam Sunan Ampel dan Nyai Condrowati',
      'Berwudhu terlebih dahulu di area Masjid Agung Sunan Ampel dan tidak melangkahi bahu jamaah yang sedang bertahlil'
    ],
    barokahHajat: [
      'Wasilah kekuatan hijrah meninggalkan maksiat (Moh Limo) dan pembersihan akhlak keluarga',
      'Ikhtiar memohon keberkahan ilmu pesantren, kepemimpinan umat, serta anak keturunan yang alim dan shalih',
      'Keteguhan istiqomah dalam mendirikan shalat malam dan membina masyarakat'
    ],
    doaKhusus: [
      {
        title: 'Tawasul Khusus Sunan Ampel',
        text: 'إِلَى حَضْرَةِ السَّيِّدِ عَلِيٍّ رَحْمَةُ اللهِ (سُونَانْ أَمْفِيلْ) شَيْخِ الأَوْلِيَاءِ بِسُورَابَايَا، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratis Sayyid \'Alî Rahmatullâh (Sunan Ampel) Syaikhil Auliyâ\'i bi Sûrâbâyâ, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Sayyid Ali Rahmatullah (Sunan Ampel) guru besar para wali di Surabaya, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Penjagaan Diri dari Maksiat (Falsafah Moh Limo)',
        text: 'اللَّهُمَّ طَهِّرْ قُلُوبَنَا مِنَ النِّفَاقِ، وَأَعْمَالَنَا مِنَ الرِّيَاءِ، وَأَلْسِنَتَنَا مِنَ الكَذِبِ، وَأَعْيُنَنَا مِنَ الخِيَانَةِ، وَاحْفَظْ ذُرِّيَّاتِنَا مِنَ المَعَاصِي.',
        latin: 'Allâhumma thahhir qulûbanâ minan nifâq, wa a\'mâlanâ minar riyâ\', wa alsinatanâ minal kadzib, wa a\'yunanâ minal khiyânah, wahfazh dzurriyyâtinâ minal ma\'âshî.',
        translation: 'Ya Allah, sucikanlah hati kami dari kemunafikan, amal kami dari riya, lisan kami dari dusta, pandangan kami dari khianat, dan peliharalah keturunan kami dari perbuatan maksiat.'
      }
    ],
  },
  {
    id: 'sunan-bonang',
    legacyId: 'wali-3',
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
      'Di bawah cahaya bulan purnama yang memantul di permukaan laut Tuban, suara denting gamelan bonang mengalun pelan dari pendopo kayu pesantren. Wujil—mantan abdi terkasih keraton Majapahit yang telah sepuluh tahun mengembara mencari arti hidup namun dadanya tetap terasa hampa—datang bersimpuh dengan air mata berlinang.<!--more-->\n\nSyekh Maulana Makhdum Ibrahim (Sunan Bonang) menghentikan tabuhan bonangnya, menatap Wujil dengan penuh kasih, lalu melantunkan syair lima obat penawar jiwa yang kelak abadi sebagai tembang "Tombo Ati". Malam itu juga, Sunan Bonang membukakan rahasia makrifat tentang mengenal diri (Suluk Wujil).',
    facilities: ['Masjid Agung Tuban', 'Pendopo & Gapura Paduraksa Kuno', 'Area Parkir Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap Malam Jumat Wage di Bulan Muharram (Haul Agung Sunan Bonang di Kutorejo, Tuban)',
    localAdab: [
      'Melewati gapura paduraksa kuno dengan menundukkan kepala sebagai simbol tawadhu dan melepas alas kaki di batas suci',
      'Tidak bersuara keras di sekitar cungkup makam utama karena ruang dzikir relatif teduh dan padat peziarah'
    ],
    barokahHajat: [
      'Wasilah ketenangan batin dan penawar kegelisahan jiwa melalui lima laku spiritual Tombo Ati',
      'Ikhtiar kejernihan pikiran bagi para penuntut ilmu, sastrawan, pendidik, dan penggerak dakwah seni budaya',
      'Kelembutan hati dalam membimbing keluarga atau murid yang sedang mencari jalan taubat'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Sunan Bonang (Syekh Maulana Makhdum Ibrahim)',
        text: 'إِلَى حَضْرَةِ الشَّيْخِ مَوْلَانَا مَخْدُومْ إِبْرَاهِيمَ (سُونَانْ بُونَانْغ) بِتُوبَانْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratisy Syaikh Maulânâ Makhdûm Ibrâhîm (Sunan Bonang) bi Tûbân, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Syekh Maulana Makhdum Ibrahim (Sunan Bonang) di Tuban, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Munajat Penawar Hati (Washilah Tombo Ati)',
        text: 'اللَّهُمَّ نَوِّرْ قُلُوبَنَا بِتِلَاوَةِ القُرْآنِ، وَقِيَامِ اللَّيْلِ، وَمُجَالَسَةِ الصَّالِحِينَ، وَاشْفِ صُدُورَنَا مِنْ كُلِّ هَمٍّ وَغَمٍّ.',
        latin: 'Allâhumma nawwir qulûbanâ bitilâwatil Qur\'ân, wa qiyâmil lail, wa mujâlasatish shâlihîn, wasyfi shudûranâ min kulli hammin wa ghamm.',
        translation: 'Ya Allah, terangilah hati kami dengan bacaan Al-Qur\'an, shalat malam, dan berkumpul bersama orang-orang shalih, serta sembuhkanlah dada kami dari segala resah dan duka.'
      }
    ],
  },
  {
    id: 'sunan-drajat',
    legacyId: 'wali-4',
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
      'Malam itu angin barat menderu kencang menghantam pesisir Paciran, Lamongan, membuat perahu-perahu nelayan tertambat berhari-hari tanpa hasil tangkapan. Di tengah dingin yang menusuk tulang, seorang janda miskin mendaki bukit Dalem Duwur sambil mendekap anaknya yang menggigil kelaparan.<!--more-->\n\nRaden Qasim (Sunan Drajat) yang sedang berdzikir di pendopo segera membuka pintu lumbung pesantrennya sendiri, memikul karung beras di pundaknya, dan membagikan selimut tenun kepada keluarga-keluarga nelayan di sepanjang pantai. Di atas batu prasasti pesantren, beliau kemudian memahat wasiat suci "Catur Piwulang".',
    facilities: ['Museum Sunan Drajat', "Masjid Jami' Sunan Drajat", 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 22:00 WIB',
    haulSchedule: 'Setiap Bulan Dzulhijjah / Muharram (Haul Agung Kanjeng Sunan Drajat di Kompleks Dalem Duwur, Paciran, Lamongan)',
    localAdab: [
      'Menapaki tujuh undakan bukit makam Dalem Duwur dengan tertib, menjaga adab berpakaian sopan, dan menghormati koleksi cagar budaya di Museum Sunan Drajat',
      'Menyisihkan sedekah bagi fakir miskin di sekitar kompleks sebagai pengamalan langsung wasiat Catur Piwulang'
    ],
    barokahHajat: [
      'Wasilah kelapangan rezeki dan kedermawanan sosial sesuai empat pilar Catur Piwulang (Menehono teken, pangan, busana, lan payung)',
      'Ikhtiar keselamatan bagi para pelaut, nelayan, dan pekerja yang mencari nafkah di perantauan atau pesisir',
      'Kemuliaan derajat hidup melalui pelayanan tulus kepada kaum dhuafa dan anak yatim'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Sunan Drajat (Raden Qasim)',
        text: 'إِلَى حَضْرَةِ الشَّيْخِ شَرِيفِ الدِّينِ رَادِينْ قَاسِمْ (سُونَانْ دَرَاجَاتْ) بِفَاسِيرَانْ لَامُونْغَانْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratisy Syaikh Syarîfiddîn Râdên Qâsim (Sunan Drajat) bi Fâsîrân Lâmûngân, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Syekh Syarifuddin Raden Qasim (Sunan Drajat) di Paciran Lamongan, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Kedermawanan & Kemuliaan Derajat',
        text: 'اللَّهُمَّ اجْعَلْنَا مَفَاتِيحَ لِلْخَيْرِ مَغَالِيقَ لِلشَّرِّ، وَارْزُقْنَا السَّخَاءَ وَالرَّحْمَةَ بِالفُقَرَاءِ وَالمَسَاكِينِ وَارْفَعْ دَرَجَاتِنَا فِي الدَّارَيْنِ.',
        latin: 'Allâhummaj\'alnâ mafâtîha lil-khairi maghâlîqa lisy-syarri, warzuqnas sakhâ\'a war-rahmata bil-fuqarâ\'i wal-masâkîn warfa\' darajâtinâ fid-dârain.',
        translation: 'Ya Allah, jadikanlah kami pembuka pintu kebaikan dan penutup pintu keburukan, karuniakanlah kedermawanan serta kasih sayang kepada fakir miskin, dan angkatlah derajat kami di dunia dan akhirat.'
      }
    ],
  },
  {
    id: 'sunan-kudus',
    legacyId: 'wali-5',
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
      'Malam menjelang Hari Raya Idul Adha pada tahun-tahun awal berdirinya Masjid Al-Aqsha Menara Kudus terasa begitu mencekam. Di sudut-sudut kampung, para tetua masyarakat Hindu Kudus berbisik dengan wajah cemas karena khawatir esok pagi umat Islam yang semakin besar jumlahnya akan menyembelih sapi—hewan yang sangat mereka sucikan.<!--more-->\n\nMengetahui kegelisahan tetangganya itu, Sayyid Ja\'far Shadiq (Sunan Kudus) keluar ke pelataran Menara Kudus sambil menuntun seekor kerbau besar dan mengikat sapi di halaman masjid agar tidak seorang pun menyembelihnya. Di hadapan seluruh warga, sang Wali menyerukan maklumat kasih sayang agar umat Islam di Kudus mengganti kurban sapi dengan kerbau demi menjaga perasaan saudara-saudara mereka.',
    facilities: ['Masjid Al-Aqsha & Menara Kudus', 'Tempat Wudhu Pancuran 8', 'Terminal Wisata Bakalan Krapyak'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap 10 Muharram / Hari Asyura (Tradisi Buka Luwur & Haul Akbar Kanjeng Sunan Kudus di Kauman, Kudus)',
    localAdab: [
      'Menghormati kearifan lokal masyarakat Kudus (termasuk tradisi tidak menghidangkan daging sapi di sekitar kawasan Menara Kudus)',
      'Berwudhu di padasan kuno, menjaga ketertiban saat melewati lorong sempit menuju cungkup belakang Masjid Al-Aqsha, dan tidak mendorong peziarah lain'
    ],
    barokahHajat: [
      'Wasilah kebijaksanaan hukum (fikih), keadilan dalam memimpin, serta kerukunan hidup bertetangga (filosofi Gusjigang: Bagus akhlaknya, Ngaji ilmunya, Dagang usahanya)',
      'Ikhtiar kelancaran usaha industri kreatif, perdagangan, dan kemandirian ekonomi umat',
      'Keteguhan hati dalam menegakkan keadilan dengan cara yang santun dan merangkul'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Sunan Kudus (Sayyid Ja\'far Shadiq)',
        text: 'إِلَى حَضْرَةِ السَّيِّدِ جَعْفَرْ صَادِقْ عَظْمَتْ خَانْ (سُونَانْ قُدُوسْ) صَاحِبِ المَسْجِدِ الأَقْصَى وَالمَنَارَةِ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratis Sayyid Ja\'far Shâdiq \'Azhmat Khân (Sunan Kudus) shâhibil Masjidil Aqshâ wal Manârah, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Sayyid Ja\'far Shadiq Azmatkhan (Sunan Kudus) pendiri Masjid Al-Aqsha dan Menara Kudus, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Hikmah Ilmu & Keberkahan Niaga (Gusjigang)',
        text: 'اللَّهُمَّ ارْزُقْنَا حُسْنَ الخُلُقِ وَفِقْهًا فِي الدِّينِ وَبَرَكَةً فِي التِّجَارَةِ وَالكَسْبِ الحَلَالِ، وَاجْعَلْنَا مِنْ أَهْلِ العَدْلِ وَالإِحْسَانِ.',
        latin: 'Allâhummarzuqnâ husnal khuluqi wa fiqhan fid-dîni wa barakatan fit-tijârati wal-kasbil halâl, waj\'alnâ min ahlil \'adli wal-ihsân.',
        translation: 'Ya Allah, karuniakanlah kepada kami akhlak yang mulia, pemahaman mendalam dalam agama, serta keberkahan dalam perniagaan dan rezeki yang halal, dan jadikanlah kami golongan ahli keadilan dan kebaikan.'
      }
    ],
  },
  {
    id: 'sunan-giri',
    legacyId: 'wali-6',
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
      'Malam itu obor-obor pasukan bersenjata tampak mengepung lereng Bukit Giri dari segala penjuru, membuat para santri dan keluarga di puncak Giri Kedaton dilanda kepanikan hebat. Namun di dalam bilik khalwatnya yang sederhana, Raden Paku (Sunan Giri) tetap duduk bersila dengan tenang menggoreskan pena kayu di atas lembaran kertas.<!--more-->\n\nKetika pasukan penyerbu semakin merangsek naik mendekati gerbang pesantren, sang Wali memanjatkan munajat perlindungan kepada Allah SWT dan melemparkan pena kayunya ke tanah sambil berdoa agar tidak terjadi pertumpahan darah di bukit ilmu tersebut. Atas izin Allah, kepungan pasukan itu porak-poranda dalam kabut malam, sementara pena kayu sang Wali dikenang abadi sebagai simbol kekuatan ilmu pengetahuan (Kalamunyeng).',
    facilities: ['Cungkup Ukiran Kayu Jati Kuno', 'Masjid Besar Ainul Yaqin Sunan Giri', 'Museum & Parkir Terpadu Giri'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap 24–25 Rabiul Awal (Haul Akbar Kanjeng Sunan Giri / Prabu Satmata di Bukit Giri, Kebomas, Gresik)',
    localAdab: [
      'Menjaga stamina dan kesopanan saat menaiki ratusan anak tangga batu menuju puncak Bukit Giri serta mendahulukan lansia',
      'Melepas alas kaki sebelum memasuki pelataran cungkup kayu jati berukir kuno dan menjaga keheningan dzikir'
    ],
    barokahHajat: [
      'Wasilah kecerdasan anak dan pendidikan generasi muda melalui keteladanan metode pengajaran tembang Cublak-Cublak Suweng & Jelungan',
      'Ikhtiar keteguhan prinsip, kewibawaan kepemimpinan, dan keberanian membela kebenaran ilmu',
      'Keberkahan bagi para guru, ustadz, dan mubaligh yang mengabdi di daerah terpencil atau kepulauan'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Sunan Giri (Prabu Satmata)',
        text: 'إِلَى حَضْرَةِ السُّلْطَانِ عَبْدِ الفَقِيهِ رَادِينْ فَاكُو (سُونَانْ غِيرِي) صَاحِبِ غِيرِي كَدَاتُونْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratis Sulthân \'Abdil Faqîh Râdên Pâkû (Sunan Giri) shâhibi Giri Kedaton, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Sultan Abdul Faqih Raden Paku (Sunan Giri) pemimpin Giri Kedaton, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Ketajaman Ilmu & Pendidikan Anak',
        text: 'اللَّهُمَّ عَلِّمْنَا مَا يَنْفَعُنَا وَانْفَعْنَا بِمَا عَلَّمْتَنَا وَزِدْنَا عِلْمًا وَحِكْمَةً، وَاجْعَلْ أَوْلَادَنَا مِنْ حَمَلَةِ القُرْآنِ وَالعِلْمِ النَّافِعِ.',
        latin: 'Allâhumma \'allimnâ mâ yanfa\'unâ wanfa\'nâ bimâ \'allamtanâ wa zidnâ \'ilman wa hikmah, waj\'al aulâdanâ min hamalatil Qur\'âni wal-\'ilmin nâfi\'.',
        translation: 'Ya Allah, ajarkanlah kepada kami ilmu yang bermanfaat, berikanlah manfaat atas apa yang Engkau ajarkan, tambahkanlah ilmu serta hikmah, dan jadikanlah anak-anak kami pengemban Al-Qur\'an dan ilmu yang bermanfaat.'
      }
    ],
  },
  {
    id: 'sunan-kalijaga',
    legacyId: 'wali-7',
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
      'Malam terakhir sebelum peresmian Masjid Agung Demak Bintoro menyisakan kecemasan yang mendalam di hati para tukang kayu dan bangsawan. Tiga tiang raksasa (Soko Guru) milik Sunan Ampel, Sunan Bonang, dan Sunan Gunung Jati telah berdiri megah, namun satu tiang bagian jatah Raden Mas Said (Sunan Kalijaga) belum juga tampak batang kayunya.<!--more-->\n\nDi tengah keheningan malam, Sunan Kalijaga justru duduk tenang mengumpulkan ratusan serpihan dan tatal (sisa serutan kayu) yang terbuang di sudut pelataran proyek, lalu mengikatnya erat-erat sambil memanjatkan doa penyatuan umat. Ketika fajar menyingsing, ikatan serpihan kayu yang remeh itu telah menyatu menjadi tiang Soko Tatal yang luar biasa kokoh.',
    facilities: ['Kompleks Makam Kadilangu', 'Masjid Sunan Kalijaga Kadilangu', 'Pendopo Notobratan'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap 10 Dzulhijjah / Hari Raya Idul Adha (Tradisi Grebeg Besar, Jamasan Pusaka Kyai Crubuk & Kotang Ontokusumo di Kadilangu, Demak)',
    localAdab: [
      'Mematuhi tata tertib juru kunci (Kasepuhan Kadilangu) dan menjaga ketenangan saat berada di serambi pendopo makam',
      'Berpakaian sopan tertutup dan tidak melakukan ritual yang menyimpang dari adab ziarah Ahlussunnah wal Jamaah'
    ],
    barokahHajat: [
      'Wasilah penjagaan diri dan keluarga dari marabahaya lahir-batin sebagaimana munajat Kidung Rumeksa ing Wengi',
      'Ikhtiar kekuatan taubat nasuha (dari masa lalu yang kelam menuju derajat kemuliaan) serta kearifan merangkul sesama (Urip Iku Urup)',
      'Inspirasi bagi seniman, budayawan, dan komunikator publik agar karyanya membawa manfaat spiritual'
    ],
    doaKhusus: [
      {
        title: 'Tawasul Khusus Sunan Kalijaga',
        text: 'إِلَى حَضْرَةِ الشَّيْخِ مَلَايَا رَادِينْ مَاسْ سَعِيدْ (سُونَانْ كَالِيجَاغَا) بِكَادِيلَانْغُو دَمَاكْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratisy Syaikh Malâyâ Râdên Mâs Sa\'îd (Sunan Kalijaga) bi Kâdîlângû Damâk, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Syekh Malaya Raden Mas Said (Sunan Kalijaga) di Kadilangu Demak, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Perlindungan Malam (Intisari Munajat Rumeksa ing Wengi)',
        text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ، اللَّهُمَّ احْفَظْنَا فِي لَيْلِنَا وَنَهَارِنَا مِنْ كُلِّ بَلَاءٍ وَفِتْنَةٍ وَاجْعَلْ حَيَاتَنَا نُورًا يَنْتَفِعُ بِهِ النَّاسُ.',
        latin: 'A\'ûdzu bikalimâtillâhit tâmmâti min syarri mâ khalaq, Allâhummahfazhnâ fî lailinâ wa nahârinâ min kulli balâ\'in wa fitnatin waj\'al hayâtanâ nûran yantafi\'u bihin nâs.',
        translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya. Ya Allah, peliharalah kami di waktu malam dan siang dari segala bala dan fitnah, serta jadikanlah hidup kami cahaya yang memberi manfaat bagi sesama (Urip Iku Urup).'
      }
    ],
  },
  {
    id: 'sunan-muria',
    legacyId: 'wali-8',
    name: 'Raden Umar Said (Sunan Muria)',
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
      'Kabut malam turun menyelimuti lereng Gunung Muria yang dingin dan sunyi di ketinggian Desa Colo. Sepasang suami istri petani yang telah dua belas tahun menikah namun belum dikaruniai keturunan—hingga nyaris bercerai karena cemoohan lingkungan—mendaki ratusan anak tangga batu sambil berpegangan tangan dan menangis dalam gelap.<!--more-->\n\nSesampainya di surau puncak, Raden Umar Said (Sunan Muria) menyambut mereka dengan senyum teduh, menyuguhkan air sejuk dari gentong tanah liat, dan membimbing keduanya merapikan niat rumah tangga lewat filosofi tembang "Sinom" dan "Kinanthi" (saling menuntun dalam ketaatan). Sang Wali juga mewasiatkan agar warga lereng gunung menanam pohon parijoto dan menjaga kelestarian mata air hutan Muria.',
    facilities: ['Masjid Sunan Muria', '700+ Anak Tangga & Pangkalan Ojek Gunung', 'Sumber Air Gentong Keramat'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap 15–16 Muharram (Haul Akbar Kanjeng Sunan Muria di Puncak Desa Colo, Gunung Muria, Kudus)',
    localAdab: [
      'Menjaga keselamatan saat menggunakan jasa ojek gunung atau menapaki 700+ anak tangga, serta menjaga kebersihan hutan lereng Muria',
      'Mengantre dengan tertib di area Masjid dan cungkup makam Sunan Muria serta tidak berebut saat mengambil air di Gentong Muria'
    ],
    barokahHajat: [
      'Wasilah keharmonisan rumah tangga (saling menuntun sebagaimana filosofi Kinanthi) dan ikhtiar memohon keturunan yang shalih/shalihah',
      'Keberkahan hasil bumi pertanian, perkebunan, dan kelestarian lingkungan alam',
      'Keteduhan hati dalam menjalani hidup sederhana, mandiri, dan jauh dari hiruk-pikuk kesombongan dunia'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Sunan Muria (Raden Umar Said)',
        text: 'إِلَى حَضْرَةِ الشَّيْخِ رَادِينْ عُمَرْ سَعِيدْ (سُونَانْ مُورِيَا) بِجَبَلِ مُورِيَا قُدُوسْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratisy Syaikh Râdên \'Umar Sa\'îd (Sunan Muria) bi Jabali Mûriyâ Qudûs, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Syekh Raden Umar Said (Sunan Muria) di Gunung Muria Kudus, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Keharmonisan Keluarga & Keturunan Shalih',
        text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا، وَبَارِكْ لَنَا فِي ثِمَارِنَا وَمِيَاهِنَا.',
        latin: 'Rabbanâ hab lanâ min azwâjinâ wa dzurriyyâtinâ qurrata a\'yunin waj\'alnâ lil-muttaqîna imâmâ, wa bârik lanâ fî tsimârinâ wa miyâhinâ.',
        translation: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan kami sebagai penyejuk mata, jadikanlah kami pemimpin bagi orang-orang bertakwa, serta berkahilah buah-buahan dan sumber air kami.'
      }
    ],
  },
  {
    id: 'sunan-gunung-jati',
    legacyId: 'wali-9',
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
      'Malam itu suasana di Keraton Pakungwati dan Masjid Agung Sang Cipta Rasa Cirebon terasa begitu haru dan hening. Para pangeran, adipati, dan panglima perang berkumpul mengelilingi pembaringan Syarif Hidayatullah (Sunan Gunung Jati) yang telah berusia lebih dari satu abad, menantikan wasiat terakhir beliau: "Ingsun titip tajug lan fakir miskin."<!--more-->\n\nAlih-alih mewariskan pesan tentang perebutan takhta, ekspansi wilayah, atau harta pusaka keraton, sang Raja-Ulama mengangkat tangannya yang bergetar dan hanya mengucapkan satu kalimat pendek dalam bahasa Cirebon: "Ingsun titip tajug lan fakir miskin" (Aku titip langgar/masjid tempat mengaji dan fakir miskin). Dua wasiat suci inilah yang hingga hari ini terpatri di hati setiap peziarah yang bersimpuh di depan Pintu Pasujudan Astana Gunung Sembung.',
    facilities: ['Kompleks Astana Gunung Sembung (9 Pintu)', 'Masjid Dog Jumeneng', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap Bulan Dzulhijjah (Grebeg Agung Idul Adha) & Rabiul Awal (Tradisi Panjang Jimat / Pelal Ageng Maulid Nabi di Cirebon)',
    localAdab: [
      'Berzikir dan bertawasul dengan khusyuk di area Serambi Muka / Pintu Pasujudan (Pintu ke-3) karena pintu ke-4 hingga ke-9 tertutup bagi peziarah umum sesuai adat Keraton Cirebon',
      'Waspada terhadap oknum pemaksa sedekah liar di luar area resmi; salurkan infaq hanya melalui kotak resmi kasepuhan atau santuni fakir miskin secara tertib sesuai wasiat beliau'
    ],
    barokahHajat: [
      'Wasilah kemakmuran masjid/musholla dan kepedulian sosial lewat pengamalan wasiat "Ingsun titip tajug lan fakir miskin"',
      'Ikhtiar memohon kepemimpinan yang adil, berwibawa, serta memadukan kekuatan spiritual dan pengabdian publik',
      'Keberkahan silaturahmi lintas budaya dan keteguhan menjaga kedaulatan umat'
    ],
    doaKhusus: [
      {
        title: 'Tawasul Khusus Sunan Gunung Jati',
        text: 'إِلَى حَضْرَةِ السُّلْطَانِ الشَّرِيفِ هِدَايَةُ اللهِ (سُونَانْ غُونُونْغ جَاتِي) بِشِيرْبُونْ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratis Sulthânisy Syarîf Hidâyatullâh (Sunan Gunung Jati) bi Syîrbûn, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Sultan Syarif Hidayatullah (Sunan Gunung Jati) di Cirebon, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Pengamalan Wasiat Tajug & Fakir Miskin',
        text: 'اللَّهُمَّ اجْعَلْنَا مِنْ عُمَّارِ مَسَاجِدِكَ وَالمُحْسِنِينَ إِلَى الفُقَرَاءِ وَالمَسَاكِينِ، وَانْصُرْ دِينَكَ وَأَعْلِ كَلِمَتَكَ بِالحِكْمَةِ وَالمَوْعِظَةِ الحَسَنَةِ.',
        latin: 'Allâhummaj\'alnâ min \'ummâri masâjidika wal-muhsinîna ilal fuqarâ\'i wal-masâkîn, wanshur dînaka wa a\'li kalimataka bil-hikmati wal-mau\'izhatil hasanah.',
        translation: 'Ya Allah, jadikanlah kami termasuk golongan yang memakmurkan masjid-masjid-Mu dan berbuat baik kepada fakir miskin, serta tolonglah agama-Mu dengan hikmah dan nasihat yang baik.'
      }
    ],
  },
  {
    id: 'habib-ali-kwitang',
    legacyId: 'habib-1',
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
      'Pada malam-malam genting di bulan suci Ramadhan tahun 1945, suasana Kota Jakarta diselimuti ketegangan luar biasa di bawah bayang-bayang senjata tentara pendudukan. Di tengah kebimbangan menentukan langkah besar bagi nasib jutaan rakyat, Bung Karno datang diam-diam ke serambi kediaman Al-Habib Ali bin Abdurrahman Al-Habsyi di Kwitang.<!--more-->\n\nDi ruangan sederhana yang harum dengan aroma minyak wangi dan lembaran kitab kuning itu, Habib Ali Kwitang memegang tangan Bung Karno, mendoakan keselamatan bangsa dengan air mata berlinang, dan meneguhkan restu para ulama agar Proklamasi Kemerdekaan Indonesia segera dikumandangkan pada hari Jumat yang penuh berkah, 17 Agustus 1945 (9 Ramadhan 1364 H).',
    facilities: ["Masjid Jami' Al-Riyadh Kwitang", 'Gedung Majelis Taklim ICI', 'Kubah Makam Habib Ali Kwitang'],
    openingHours: '07:00 - 21:00 WIB',
    haulSchedule: 'Setiap Hari Minggu Terakhir Bulan Rabiul Akhir (Haul Akbar Al-Habib Ali bin Abdurrahman Al-Habsyi & Maulid Akhir Khamis di Kwitang, Jakarta Pusat)',
    localAdab: [
      'Mengenakan busana muslim rapi (disunnahkan berpakaian putih dan berkopiah saat menghadiri majelis Minggu pagi pukul 06.00–09.00 WIB)',
      'Menjaga ketertiban di dalam Kubah Masjid Al-Riyadh Kwitang (tempat bersemayam Habib Ali Kwitang, Syarifah Ni\'mah, dan Habib Muhammad bin Ali Al-Habsyi)'
    ],
    barokahHajat: [
      'Wasilah kecintaan kepada Rasulullah SAW dan Ahlul Bait melalui keistiqomahan membaca Maulid Simthud Durar',
      'Ikhtiar menyejukkan hati yang keras, mempererat ukhuwah ulama-umara, dan memohon keberkahan majelis ilmu di perkotaan',
      'Keteguhan menjaga tradisi ngaji Minggu pagi bersama keluarga'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Habib Ali Kwitang',
        text: 'إِلَى حَضْرَةِ الحَبِيبِ عَلِيِّ بْنِ عَبْدِ الرَّحْمٰنِ الحَبْشِيِّ صَاحِبِ كْوِيتَانْغ جَاكَرْتَا، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratil Habîb \'Alî bin \'Abdirrahmân Al-Habsyî shâhibi Kwitang Jakarta, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Al-Habib Ali bin Abdurrahman Al-Habsyi pendiri Majelis Kwitang Jakarta, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Doa Pembuka Majelis & Mahabbah Rasul (Tradisi Kwitang)',
        text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ مِفْتَاحِ بَابِ رَحْمَةِ اللهِ، وَاجْمَعْنَا بِهِ وَبِأَهْلِ بَيْتِهِ وَأَوْلِيَائِهِ فِي الدُّنْيَا وَالآخِرَةِ.',
        latin: 'Allâhumma shalli wa sallim \'alâ Sayyidinâ Muhammadin miftâhi bâbi rahmatillâh, wajma\'nâ bihi wa bi ahli baitihi wa auliyâ\'ihi fid-dunyâ wal-âkhirah.',
        translation: 'Ya Allah, limpahkanlah shalawat dan salam atas junjungan kami Nabi Muhammad, kunci pintu rahmat Allah, dan kumpulkanlah kami bersama beliau, Ahlul Baitnya, serta para kekasih-Nya di dunia dan akhirat.'
      }
    ],
  },
  {
    id: 'habib-husein-luar-batang',
    legacyId: 'habib-2',
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
    untoldStory:
      'Suatu malam yang gelap di abad ke-18, seorang saudagar Tionghoa bernama Noh (Haji Abdul Kadir) berlari terengah-engah menyusuri rawa-rawa pesisir Sunda Kelapa dengan tangan terikat rantai besi; ia dijatuhi hukuman mati secara sewenang-wenang oleh kompeni VOC dan mencari tempat persembunyian terakhir.<!--more-->\n\nKetika obor patroli serdadu Belanda mengepung surau bambu milik Al-Habib Husein bin Abubakar Alaydrus di Luar Batang, sang Habib yang masih berusia sangat muda berdiri tenang di ambang pintu dan menyatakan bahwa pemuda Tionghoa itu berada dalam perlindungannya. Atas izin Allah SWT, para serdadu VOC menjadi gentar dan pergi meninggalkan surau itu.',
    facilities: ["Masjid Jami' Keramat Luar Batang", 'Ruang Makam Habib Husein & Haji Abdul Kadir'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap Hari Minggu di Bulan Syawal (Haul Akbar Al-Habib Husein bin Abubakar Alaydrus di Masjid Keramat Luar Batang, Penjaringan, Jakarta Utara)',
    localAdab: [
      'Menjaga wudhu dan kesopanan busana saat memasuki Ruang Makam Keramat Luar Batang (peziarah pria dan wanita dipisahkan tirai pembatas)',
      'Turut mendoakan Haji Abdul Kadir (murid setia keturunan Tionghoa) yang dimakamkan berdampingan persis di sebelah makam Habib Husein'
    ],
    barokahHajat: [
      'Wasilah memohon perlindungan dari kezaliman, fitnah, dan kesempitan urusan hukum atau perniagaan di pelabuhan/perkotaan',
      'Ikhtiar memohon istiqomah ibadah di usia muda sebagaimana Habib Husein mencapai derajat kewalian sebelum usia 30 tahun',
      'Keteladanan persaudaraan lintas etnis dalam naungan tauhid dan kasih sayang'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Habib Husein Luar Batang & Haji Abdul Kadir',
        text: 'إِلَى حَضْرَةِ القُطْبِ الحَبِيبِ حُسَيْنِ بْنِ أَبِي بَكْرٍ العَيْدَرُوسِ وَتِلْمِيذِهِ الحَاجِّ عَبْدِ القَادِرِ بِلُوَارْ بَاتَانْغ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratil Quthbil Habîb Husain bin Abî Bakrinil \'Aidarûs wa tilmîdzihil Hâjj \'Abdil Qâdir bi Luwâr Bâtâng, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Wali Qutub Al-Habib Husein bin Abubakar Alaydrus beserta murid beliau Haji Abdul Kadir di Luar Batang, segala kemuliaan milik Allah, untuk keduanya Al-Fatihah...'
      },
      {
        title: 'Doa Munajat Perlindungan & Keberkahan Usia Muda',
        text: 'اللَّهُمَّ احْفَظْنَا مِنْ ظُلْمِ الظَّالِمِينَ وَكَيْدِ الحَاسِدِينَ، وَبَارِكْ فِي أَعْمَارِنَا وَشَبَابِنَا فِي طَاعَتِكَ وَمَحَبَّةِ أَوْلِيَائِكَ.',
        latin: 'Allâhummahfazhnâ min zhulmizh zhâlimîna wa kaidil hâsidîn, wa bârik fî a\'mârinâ wa syabâbinâ fî thâ\'atika wa mahabbati auliyâ\'ik.',
        translation: 'Ya Allah, lindungilah kami dari kezaliman orang-orang zalim dan tipu daya pendengki, serta berkahilah usia dan masa muda kami dalam ketaatan kepada-Mu dan kecintaan kepada para wali-Mu.'
      }
    ],
  },
  {
    id: 'mbah-priok',
    legacyId: 'habib-3',
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
    untoldStory:
      'Pada tahun 1756 M, perahu layar kayu yang ditumpangi Al-Habib Hasan bin Muhammad Al-Haddad dan saudaranya dari Palembang menuju tanah Jawa dihantam badai samudera yang dahsyat selama berhari-hari. Gelombang setinggi tiang layar membalikkan perahu mereka dan menenggelamkan seluruh perbekalan makanan.<!--more-->\n\nDi tengah lautan yang ganas dengan hanya menyisakan sebuah periuk penanak nasi (priuk) yang terapung di samping tubuhnya, Habib Hasan tetap melantunkan dzikir Ratib Al-Haddad tanpa putus hingga menghembuskan napas terakhir dalam keadaan syahid laut di usia 29 tahun. Jenazah beliau terdampar dengan utuh di sebuah tanjung pesisir utara Batavia bersama periuk nasi dan dayung kayu yang kelak tumbuh menjadi pohon tanjung, sehingga kawasan itu dinamakan "Tanjung Priok".',
    facilities: ['Kubah & Pendopo Makam Mbah Priok', 'Masjid Al-Maqom', 'Sumur Keramat Air Tawar'],
    openingHours: 'Buka 24 Jam',
    haulSchedule: 'Setiap Akhir Bulan Sya\'ban / Menjelang Ramadhan (Haul Akbar Al-Habib Hasan bin Muhammad Al-Haddad / Mbah Priok di Koja, Tanjung Priok)',
    localAdab: [
      'Memasuki kawasan Cagar Budaya Gubah Al-Haddad dengan tertib karena berlokasi di area vital Pelabuhan Tanjung Priok',
      'Membaca Ratib Al-Haddad (karya leluhur beliau Imam Abdullah bin Alwi Al-Haddad) dengan khusyuk di pendopo kubah utama'
    ],
    barokahHajat: [
      'Wasilah keselamatan pelayaran, perjalanan jauh, dan keberkahan rezeki bagi pekerja maritim, pelabuhan, serta logistik',
      'Ikhtiar keteguhan berdzikir Ratib Al-Haddad di tengah badai ujian hidup yang paling berat sekalipun',
      'Kemuliaan husnul khatimah dalam perjuangan menuntut ilmu dan berdakwah'
    ],
    doaKhusus: [
      {
        title: 'Hadiyah Fatihah Habib Hasan bin Muhammad Al-Haddad (Mbah Priok)',
        text: 'إِلَى حَضْرَةِ الوَلِيِّ الشَّهِيدِ الحَبِيبِ حَسَنِ بْنِ مُحَمَّدٍ الحَدَّادِ (مْبَاهْ فَرِيُوكْ) صَاحِبِ غُبَّةِ الحَدَّادِ، شَيْءٌ لِلّٰهِ لَهُمُ الفَاتِحَة...',
        latin: 'Ilâ hadhratil Waliyyisy Syahîdil Habîb Hasan bin Muhammadinil Haddâd (Mbah Priok) shâhibi Ghubbatil Haddâd, syai\'un lillâhi lahumul Fâtihah...',
        translation: 'Kepada kehadirat Wali Syahid Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok) di Gubah Al-Haddad, segala kemuliaan milik Allah, untuk beliau Al-Fatihah...'
      },
      {
        title: 'Wirid Penjagaan Ratib Al-Haddad',
        text: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ العَلِيمُ، يَا لَطِيفًا بِخَلْقِهِ يَا عَلِيمًا بِخَلْقِهِ يَا خَبِيرًا بِخَلْقِهِ الطُفْ بِنَا يَا لَطِيفُ يَا عَلِيمُ يَا خَبِيرُ.',
        latin: 'Bismillâhilladzî lâ yadhurru ma\'asmihî syai\'un fil ardhi wa lâ fis samâ\'i wa huwas Samî\'ul \'Alîm. Yâ Lathîfan bikhalqihî yâ \'Alîman bikhalqihî yâ Khabîran bikhalqihî ulthuf binâ yâ Lathîfu yâ \'Alîmu yâ Khabîr.',
        translation: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi dan di langit yang membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui. Wahai Dzat Yang Maha Lembut, Maha Mengetahui, dan Maha Mengenal ciptaan-Nya, berlaku lembutlah kepada kami.'
      }
    ],
  },
];

export const INITIAL_SITES: ZiarahSite[] = initialSites;
export const INITIAL_FIRST_PAGE_SITES: ZiarahSite[] = initialSites;

export const REGIONAL_ID_TO_LEGACY_ID: Record<string, string> = {
  'sunan-gunung-jati': 'wali-9',
  'syekh-datuk-kahfi': 'auliya-19',
  'syekh-quro-karawang': 'ulama-10',
  'syekh-abdul-muhyi-pamijahan': 'ulama-8',
  'sultan-maulana-hasanuddin': 'auliya-2',
  'sultan-maulana-yusuf': 'auliya-18',
  'syekh-asnawi-caringin': 'ulama-7',
  'syekh-nawawi-al-bantani': 'ulama-6',
  'habib-husein-luar-batang': 'habib-2',
  'mbah-priok': 'habib-3',
  'pangeran-jayakarta': 'auliya-1',
  'habib-ahmad-bin-alwi-al-haddad': 'habib-4',
  'habib-ali-kwitang': 'habib-1',
  'habib-utsman-bin-yahya': 'habib-5',
  'guru-marzuki-cipinang': 'ulama-5',
  'habib-abdullah-empang-bogor': 'habib-6',
  'mama-falak-pagentongan-bogor': 'ulama-9',
  'eyang-dalem-abdul-manaf-mahmud': 'auliya-3',
  'kh-noer-ali-bekasi': 'ulama-30',
  'sunan-kalijaga': 'wali-7',
  'sunan-kudus': 'wali-5',
  'sunan-muria': 'wali-8',
  'raden-patah-demak': 'auliya-6',
  'syekh-jangkung-pati': 'auliya-7',
  'syekh-mutamakkin-kajen': 'ulama-11',
  'habib-ahmad-sapuro': 'habib-7',
  'sunan-pandanaran-bayat': 'auliya-5',
  'kh-sholeh-darat-semarang': 'ulama-13',
  'syekh-subakir-tidar': 'auliya-4',
  'kh-dalhar-watucongol': 'ulama-12',
  'syekh-maulana-maghribi-parangtritis': 'auliya-9',
  'kh-munawwir-krapyak': 'ulama-33',
  'kyai-nur-iman-mlangi': 'auliya-8',
  'kh-arwani-amin-kudus': 'ulama-14',
  'mbah-maimoen-zubair-sarang': 'ulama-31',
  'masyayikh-lasem-rembang': 'ulama-32',
  'habib-hasyim-bin-yahya-pekalongan': 'habib-14',
  'kh-ahmad-rifai-kalisalak': 'ulama-40',
  'syekh-maulana-malik-ibrahim': 'wali-1',
  'sunan-ampel': 'wali-2',
  'sunan-bonang': 'wali-3',
  'sunan-drajat': 'wali-4',
  'sunan-giri': 'wali-6',
  'syekh-maulana-ishaq': 'auliya-20',
  'syekh-ibrahim-asmorokondi': 'auliya-11',
  'habib-abu-bakar-gresik': 'habib-8',
  'kh-abdul-hamid-pasuruan': 'ulama-19',
  'kh-asad-syamsul-arifin': 'ulama-20',
  'kh-hasyim-asyari-tebuireng': 'ulama-1',
  'kh-wahab-chasbullah': 'ulama-16',
  'kh-bisri-syansuri': 'ulama-17',
  'kh-romly-tamim-rejoso': 'ulama-18',
  'syekh-jumadil-kubro-troloyo': 'auliya-10',
  'kh-abdul-karim-lirboyo': 'ulama-21',
  'gus-miek-ploso-kediri': 'ulama-22',
  'syekh-ihsan-jampes-kediri': 'ulama-34',
  'kh-hasan-besari-tegalsari': 'auliya-30',
  'masyayikh-tremas-pacitan': 'ulama-41',
  'habib-sholeh-tanggul-jember': 'habib-9',
  'guru-bangil-pasuruan': 'ulama-35',
  'sunan-bejagung-tuban': 'auliya-21',
  'syaichona-kholil-bangkalan': 'ulama-15',
  'sayyid-yusuf-talango': 'auliya-12',
  'syekh-abdurrauf-as-singkili': 'ulama-3',
  'syekh-hamzah-fansuri': 'ulama-24',
  'sultan-malikussaleh': 'auliya-25',
  'teungku-di-anjong-banda-aceh': 'habib-15',
  'syekh-abdul-wahab-rokan-besilam': 'ulama-26',
  'makam-papan-tinggi-mahligai-barus': 'ulama-36',
  'syekh-burhanuddin-ulakan': 'ulama-25',
  'kiai-marogan-palembang': 'ulama-27',
  'kompleks-kawah-tengkurep-palembang': 'auliya-26',
  'syekh-muhammad-arsyad-al-banjari': 'ulama-28',
  'guru-sekumpul-martapura': 'ulama-2',
  'sultan-suriansyah-banjarmasin': 'auliya-16',
  'habib-basirih-banjarmasin': 'habib-12',
  'syekh-kasyful-anwar-martapura': 'ulama-37',
  'datu-abulung-sungai-batang': 'ulama-38',
  'habib-husein-alkadrie-mempawah': 'habib-16',
  'syekh-yusuf-al-makassari': 'ulama-4',
  'datuk-ri-bandang': 'auliya-17',
  'datuk-patimang-luwu': 'auliya-27',
  'datuk-ri-tiro': 'auliya-28',
  'agh-muhammad-asad-sengkang': 'ulama-39',
  'habib-idrus-bin-salim-al-jufri-palu': 'habib-13',
  'kyai-mojo-tondano': 'ulama-29',
  'habib-ali-bafaqih-negara': 'habib-11',
  'habib-ali-kusamba': 'habib-10',
  'karangrupit-buleleng': 'auliya-22',
  'pangeran-mas-sepuh-seseh': 'auliya-13',
  'siti-khotijah-denpasar': 'auliya-23',
  'habib-umar-bedugul-tabanan': 'auliya-14',
  'wali-kembar-karangasem': 'auliya-24',
  'tgkh-zainuddin-abdul-madjid': 'ulama-23',
  'makam-loang-baloq': 'auliya-15',
  'sultan-baabullah-ternate': 'auliya-29',
};

