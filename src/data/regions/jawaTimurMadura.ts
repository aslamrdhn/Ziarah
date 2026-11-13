import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Jawa Timur & Pulau Madura (Tahap 4).
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const JAWA_TIMUR_MADURA_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. LIMA WALI SONGO JAWA TIMUR & PELOPOR AWAL ISLAM NUSANTARA
  // =========================================================================
  {
    id: 'syekh-maulana-malik-ibrahim',
    legacyId: 'wali-1',
    name: 'Syekh Maulana Malik Ibrahim (Sunan Gresik / Kakek Bantal)',
    title: 'Sunan Gresik (Pelopor Dewan Wali Songo)',
    description:
      'Ketua Dewan Wali Songo generasi pertama (wafat 822 H / 1419 M), pelopor dakwah Islam di pesisir utara Jawa melalui tata niaga jujur, pengobatan gratis, dan rekayasa irigasi pertanian.',
    category: 'Walisongo',
    era: 'Abad ke-14 – Awal Abad ke-15 M (Wafat 12 Rabiul Awal 822 H / 8 April 1419 M)',
    province: 'Jawa Timur',
    city: 'Gresik',
    district: 'Kec. Gresik',
    address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik',
    location: {
      lat: -7.1643,
      lng: 112.6565,
      address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik',
      district: 'Kec. Gresik',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam Syekh Maulana Malik Ibrahim, Gapurosukolilo, Gresik',
    sanad:
      'Ulama jaringan Hadramaut, Samarkand, dan Champa; keturunan Sayyid Zainal Abidin bin Husein bin Ali bin Abi Thalib; leluhur dan perintis jaringan dakwah Wali Songo di Tanah Jawa.',
    karya: [
      'Pendirian pesantren dan surau pertama di Desa Sembalo (Leran, Manyar, Gresik)',
      'Rekayasa saluran irigasi pertanian lahan pesisir dan pengobatan cuma-cuma pada masa Kemaharajaan Majapahit',
      'Metode dakwah bil-hikmah yang menghapus sekat kasta sosial masyarakat pesisir Jawa Timur',
    ],
    history:
      'Syekh Maulana Malik Ibrahim—yang dalam historiografi lokal dikenal pula sebagai Maulana Maghribi, Syekh Kamaruddin, atau Kakek Bantal—merupakan tokoh tertua dalam dewan dakwah Wali Songo generasi pertama di Pulau Jawa. Berdasarkan pembacaan epigrafis terhadap inskripsi berbahasa Arab pada batu nisan marmer asal Cambay (Gujarat) di Gapurosukolilo oleh J.P. Moquette dan G.W.J. Drewes, beliau wafat pada hari Senin, 12 Rabiul Awal tahun 822 Hijriah yang bertepatan dengan tanggal 8 April 1419 Masehi. Kehadiran beliau di pesisir utara Jawa Timur diperkirakan berlangsung sejak paruh kedua abad ke-14 M, bertepatan dengan masa pemerintahan Sri Rajasanagara (Hayam Wuruk) dan Wikramawardhana di Kemaharajaan Majapahit.\n\nPertama kali mendarat di Desa Sembalo (kini berada di kawasan Leran, Kecamatan Manyar, Kabupaten Gresik), Syekh Maulana Malik Ibrahim memilih pendekatan dakwah kultural dan sosial-ekonomi yang sangat santun. Di tengah masyarakat Majapahit yang masih menerapkan stratifikasi kasta, beliau membuka warung perniagaan sembako dengan harga terjangkau bagi kaum jelata, mengajarkan teknik pengolahan tanah dan irigasi agar lahan pesisir yang tandus menjadi sawah produktif, serta memberikan layanan pengobatan herbal tanpa memungut bayaran.\n\nSetelah komunitas muslim di pesisir Gresik berkembang pesat, beliau merintis asrama pendidikan agama (*pondok pesantren*) di Leran untuk mendidik kader-kader mubaligh pribumi dan menjalin hubungan diplomatik yang harmonis dengan kalangan bangsawan Majapahit. Inskripsi batu nisan beliau di Gapurosukolilo memahat gelar kehormatan yang sangat menyentuh: *"Kebanggaan para pangeran, penopang para sultan dan menteri, penolong kaum fakir dan miskin, serta bantal tempat bersandar bagi orang-orang yang membutuhkan."* Makam beliau di Gapurosukolilo, Gresik telah ditetapkan sebagai Cagar Budaya Nasional dan menjadi titik awal rangkaian ziarah Wali Songo.',
    karomah: [
      'Dalam tradisi lisan masyarakat Gresik dan naskah *Babad Tanah Jawi*, gelar "Kakek Bantal" yang melekat pada Syekh Maulana Malik Ibrahim berasal dari kemuliaan akhlak dan karomah doa beliau yang menjadi sandaran hidup (*bantal*) bagi kaum lemah, serta kebiasaan beliau meletakkan mushaf dan kitab di atas bantal karena rasa takzim terhadap ilmu. Diriwayatkan pula bahwa melalui munajat beliau di sepertiga malam dan ikhtiar penggalian saluran air, tanah pesisir Gresik yang semula berair payau dan gersang memancarkan mata air tawar yang menyuburkan pertanian warga.<!--more-->\n\nTradisi tutur masyarakat pesisir juga mengisahkan bagaimana Syekh Maulana Malik Ibrahim menghentikan tradisi kuno pengorbanan manusia saat musim kemarau panjang di Gresik; ketika beliau mengangkat tangan bermunajat memohon rahmat Allah SWT, hujan lebat turun mengguyur ladang-ladang penduduk sehingga masyarakat berbondong-bondong memeluk Islam dengan sukarela.',
    ],
    untoldStory:
      'Batu nisan Syekh Maulana Malik Ibrahim di Gapurosukolilo memiliki nilai arkeologis dan filologis yang sangat penting dalam studi sejarah Islam Asia Tenggara. Pahatan kaligrafi Arab bergaya *Naskhi-Tsuluts* pada batu marmer putih tersebut memuat Surah Al-Baqarah ayat 255 (Ayat Kursi), Surah At-Taubah ayat 21–22, Surah Ar-Rahman ayat 26–27, serta Surah Ali Imran ayat 185, yang membuktikan tingginya cita rasa seni kaligrafi dan kedalaman teologi komunitas muslim Gresik pada awal abad ke-15 M.<!--more-->\n\nDi dalam satu cungkup utama makam Syekh Maulana Malik Ibrahim di Gapurosukolilo, bersemayam pula pendamping hidup beliau, Sayyidah Siti Fatimah, serta putra beliau Syekh Maulana Moqfaroh. Letak kompleks makam ini hanya berjarak sekitar dua ratus meter di sebelah selatan Alun-Alun Kota Gresik dan Masjid Jami’ Gresik.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Maulana Malik Ibrahim di Gapurosukolilo Gresik umumnya bertawassul memohon kepada Allah SWT keberkahan usaha perniagaan dan pertanian yang jujur, kesembuhan dari penyakit lahir maupun batin, serta keluasan hati untuk menolong sesama sebagaimana teladan "Kakek Bantal".',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Maulana Malik Ibrahim (Sunan Gresik)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا مَالِكْ إِبْرَاهِيمَ الْغَرِيسِكِيِّ (سُونَانْ غَرِيسِيكْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ وَارْزُقْنَا رِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا مَالِكْ إِبْرَاهِيمَ الْغَرِيسِكِيِّ (سُونَانْ غَرِيسِيكْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ وَارْزُقْنَا رِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa Maalik Ibraahiim al-Ghariisikii (Sunan Gresik) syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihii wa barakaatihii warzuqnaa rizqan halaalan thayyiban mubaarakan.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Malik Ibrahim (Sunan Gresik), Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu serta keberkahan beliau, dan karuniakanlah kepada kami rezeki yang halal, baik, dan penuh berkah.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Malik Ibrahim (Sunan Gresik), Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu serta keberkahan beliau, dan karuniakanlah kepada kami rezeki yang halal, baik, dan penuh berkah.',
      },
    ],
    haulSchedule:
      '12 Rabiul Awal (Puncak Haul Akbar Tahunan Syekh Maulana Malik Ibrahim sesuai penanggalan wafat pada inskripsi batu nisan Gapurosukolilo 12 Rabiul Awal 822 H / 8 April 1419 M).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki pendopo dan cungkup maqbarah, menundukkan kepala saat melewati pintu kayu cungkup utama, serta tidak berdesak-desakan.',
    facilities: ['Masjid Maulana Malik Ibrahim', 'Pendopo Tahlil & Cungkup Utama Cagar Budaya', 'Terminal Parkir Bus Peziarah Sukolilo', 'Toilet & Tempat Wudhu', 'Sentra Oleh-Oleh Pudak Gresik'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Moquette, J.P. (1912). De oudste Mohammedaansche inscriptie op Java n.m. de grafsteen te Leran (en Gresik). Verhandelingen BGKW.',
      'Drewes, G.W.J. (1968). New Light on the Coming of Islam to Indonesia? Bijdragen tot de Taal-, Land- en Volkenkunde (BKI), 124(4), 433–459.',
      'Sunyoto, Agus (2016). Atlas Wali Songo: Buku Pertama yang Mengungkap Wali Songo Sebagai Fakta Sejarah. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-ampel',
    legacyId: 'wali-2',
    name: 'Sunan Ampel (Raden Rahmat / Sayyid Ali Rahmatullah)',
    title: 'Sunan Ampel (Sesepuh Dewan Wali Songo & Pendiri Pesantren Ampel Denta)',
    description:
      'Mufti Agung dan sesepuh Dewan Wali Songo di Surabaya (1401–1481 M), pendiri Pesantren Ampel Denta yang melahirkan para wali penyebar Islam dan pendiri Kesultanan Demak Bintoro.',
    category: 'Walisongo',
    era: 'Abad ke-15 M (1401–1481 M)',
    province: 'Jawa Timur',
    city: 'Surabaya',
    district: 'Kec. Semampir',
    address: 'Jl. Ampel Masjid No. 53, Kel. Ampel, Kec. Semampir, Kota Surabaya',
    location: {
      lat: -7.2301,
      lng: 112.7429,
      address: 'Jl. Ampel Masjid No. 53, Kel. Ampel, Kec. Semampir, Kota Surabaya',
      district: 'Kec. Semampir',
      city: 'Surabaya',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Masjid Agung & Makam Sunan Ampel, Semampir, Surabaya',
    sanad:
      'Putra Syekh Ibrahim Asmorokondi (Maulana Ibrahim As-Samarqandi) dan Dewi Candrawulan (putri Raja Champa); keponakan Ratu Dwarawati (permaisuri Prabu Brawijaya Majapahit); Maha Guru bagi Sunan Bonang, Sunan Drajat, Sunan Giri, Raden Patah, dan Sunan Kalijaga.',
    karya: [
      'Pendirian Masjid Agung Sunan Ampel (1421 M) dengan 16 tiang utama kayu jati tanpa sambungan',
      'Falsafah dakwah etis Moh Limo (Moh Main, Moh Ngombe, Moh Maling, Moh Madat, Moh Madon)',
      'Kaderisasi ulama dan pemimpin Islam di Pesantren Ampel Denta Surabaya',
    ],
    history:
      'Sayyid Ali Rahmatullah—yang dikenal luas sebagai Raden Rahmat atau Sunan Ampel (1401–1481 M)—adalah putra dari ulama besar asal Samarkand, Syekh Ibrahim Asmorokondi (Maulana Ibrahim As-Samarqandi), dan putri Raja Champa bernama Dewi Candrawulan. Sekitar tahun 1440 M, beliau datang ke Pulau Jawa bersama ayahandanya dan kakaknya (Sayyid Ali Murtadha / Raden Santri) atas undangan bibinya, Ratu Dwarawati, yang menjadi permaisuri Raja Majapahit di Trowulan. Melihat kemerosotan moral di kalangan bangsawan dan masyarakat Majapahit kala itu, Prabu Brawijaya menganugerahkan tanah perdikan seluas 12 hektar di kawasan rawa Ampel Denta (Surabaya Utara) kepada Raden Rahmat untuk membina akhlak masyarakat.\n\nDi tanah perdikan Ampel Denta, Sunan Ampel beserta para santrinya membuka hutan dan membangun Masjid Agung Ampel pada tahun 1421 M (atau pertengahan abad ke-15 M) serta mendirikan Pesantren Ampel Denta. Pesantren ini segera bertransformasi menjadi kawah candradimuka intelektual dan spiritual paling berpengaruh di Nusantara; dari bilik-bilik santri Ampel Denta lahir dua putra kandung beliau yang menjadi Wali Songo (Sunan Bonang dan Sunan Drajat), menantu sekaligus murid beliau (Sunan Giri dan Sunan Kalijaga), serta pendiri Kesultanan Demak Bintoro (Raden Patah).\n\nDalam merumuskan strategi dakwah bagi masyarakat Jawa yang masih kental dengan tradisi lama, Sunan Ampel merumuskan ajaran moral praktis yang sangat terkenal dalam khazanah Jawa, yakni *Moh Limo*: *Moh Main* (menolak judi), *Moh Ngombe* (menolak minuman keras), *Moh Maling* (menolak mencuri/korupsi), *Moh Madat* (menolak candu/narkotika), dan *Moh Madon* (menolak perzinaan). Sunan Ampel wafat sekitar tahun 1481 M dan dimakamkan di sebelah barat Masjid Agung Sunan Ampel Surabaya berdampingan dengan makam permaisurinya, Nyai Ageng Manila (Dewi Condrowati) dan Nyai Ageng Karimah.',
    karomah: [
      'Dalam tradisi lisan masyarakat Surabaya dan riwayat *Babad Tanah Jawi*, salah satu karomah di kawasan Masjid Agung Sunan Ampel berkaitan dengan sahabat sekaligus santri setia beliau, Mbah Sholeh. Diriwayatkan bahwa Mbah Sholeh adalah penjaga kebersihan masjid yang sangat dicintai Sunan Ampel; setiap kali Mbah Sholeh wafat, tak seorang pun santri yang sanggup menyapu lantai masjid sebersih dirinya hingga Sunan Ampel berucap rindu, dan atas izin Allah SWT sosok Mbah Sholeh kembali hadir menyapu masjid hingga wafat sembilan kali dan meninggalkan sembilan makam berjajar di timur masjid.<!--more-->\n\nKaromah lainnya yang dikenal luas di Kompleks Masjid Ampel adalah keberadaan *Sumur Kemulian* (Sumur Zamzam Ampel) yang digali oleh Sunan Ampel bersama para santrinya di tengah rawa payau pesisir Surabaya namun memancarkan air tawar yang jernih dan tak pernah kering hingga ratusan tahun, serta sosok sahabat beliau Mbah Bolong (Mbah Sonhaji) yang dapat melihat arah Ka’bah secara kasatmata saat melubangi dinding mihrab pengimaman Masjid Ampel.',
    ],
    untoldStory:
      'Dalam sidang musyawarah Dewan Wali Songo, Sunan Ampel dikenal memegang mazhab dakwah *Putihan* yang sangat berhati-hati dalam menjaga kemurnian akidah tauhid agar tidak tercampur dengan sinkretisme adat pra-Islam, namun tetap mengizinkan murid-muridnya seperti Sunan Kalijaga dan Sunan Bonang menggunakan instrumen kesenian Jawa selama diisi dengan ruh kalimat *Thayyibah*. Sikap kenegarawanan Sunan Ampel juga tampak ketika beliau menasihati Raden Patah agar tidak tergesa-gesa menyerang Majapahit secara militer selama Prabu Brawijaya masih hidup, karena menghormati kemurahan hati raja yang telah memberi kebebasan dakwah Islam di Ampel Denta dan Gresik.<!--more-->\n\nArsitektur asli Masjid Agung Sunan Ampel ditopang oleh 16 tiang utama (*soko guru*) dari kayu jati utuh setinggi 17 meter (melambangkan 17 rakaat shalat fardhu) dan dikelilingi oleh lima gapura bersejarah (*Gapuro Munggah*, *Gapuro Poso*, *Gapuro Ngamal*, *Gapuro Madep*, dan *Gapuro Paneksan*) yang melambangkan lima Rukun Islam sebagai gerbang menuju keselamatan dunia dan akhirat.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Ampel di Surabaya umumnya bertawassul memohon kepada Allah SWT kemurnian iman dan keteguhan menjauhi maksiat (*Moh Limo*), keberkahan ilmu kepemimpinan dan pendidikan pesantren, serta keharmonisan rumah tangga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Ampel (Sayyid Ali Rahmatullah)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا عَلِيٍّ رَحْمَةُ اللهِ الْمَعْرُوفِ بِسُونَانْ أَمْفِيلْ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنَ الْمَعَاصِي وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا عَلِيٍّ رَحْمَةُ اللهِ الْمَعْرُوفِ بِسُونَانْ أَمْفِيلْ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنَ الْمَعَاصِي وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa 'Alii Rahmatullaah al-ma'ruufi bi Sunan Ampel wa ushuulihii wa furuu'ihii syai-un lillaahi lahumul-Faatihah. Allaahummahfazhnaa minal-ma'aashii wanfa'naa bi 'uluumihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sayyid Ali Rahmatullah (Sunan Ampel) beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, peliharalah kami dari segala kemaksiatan dan limpahkanlah kemanfaatan melalui ilmu serta rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sayyid Ali Rahmatullah (Sunan Ampel) beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, peliharalah kami dari segala kemaksiatan dan limpahkanlah kemanfaatan melalui ilmu serta rahasia hikmah beliau di dunia dan akhirat.',
      },
      {
        title: 'Doa Keteguhan Iman, Penjagaan Diri dari Maksiat & Husnul Khatimah (Wasilah Sunan Ampel)',
        arab: 'اللّٰهُمَّ إِنَّا نَسْأَلُكَ بِكَرَامَةِ وَلِيِّكَ السَّيِّدِ عَلِي رَحْمَةُ اللهِ أَنْ تَعْصِمَنَا وَذُرِّيَّاتِنَا مِنَ الْفَوَاحِشِ وَالْمَعَاصِي، وَأَنْ تَرْزُقَنَا عِلْمًا نَافِعًا وَاسْتِقَامَةً تَامَّةً وَحُسْنَ الْخَاتِمَةِ',
        text: 'اللّٰهُمَّ إِنَّا نَسْأَلُكَ بِكَرَامَةِ وَلِيِّكَ السَّيِّدِ عَلِي رَحْمَةُ اللهِ أَنْ تَعْصِمَنَا وَذُرِّيَّاتِنَا مِنَ الْفَوَاحِشِ وَالْمَعَاصِي، وَأَنْ تَرْزُقَنَا عِلْمًا نَافِعًا وَاسْتِقَامَةً تَامَّةً وَحُسْنَ الْخَاتِمَةِ',
        latin:
          "Allaahumma innaa nas-aluka bi karaamati waliyyika as-Sayyid 'Alii Rahmatullaah an ta'shimanaa wa dzurriyyaatinaa minal-fawaahisyi wal-ma'aashii, wa an tarzuqanaa 'ilman naafi'an wastiqaamatan taammatan wa husnal-khaatimah.",
        terjemahan:
          'Ya Allah, kami memohon kepada-Mu dengan kemuliaan kekasih-Mu Sayyid Ali Rahmatullah (Sunan Ampel), lindungilah kami dan anak keturunan kami dari perbuatan keji dan kemaksiatan, serta karuniakanlah kepada kami ilmu yang bermanfaat, keistiqamahan yang utuh, dan husnul khatimah.',
        translation:
          'Ya Allah, kami memohon kepada-Mu dengan kemuliaan kekasih-Mu Sayyid Ali Rahmatullah (Sunan Ampel), lindungilah kami dan anak keturunan kami dari perbuatan keji dan kemaksiatan, serta karuniakanlah kepada kami ilmu yang bermanfaat, keistiqamahan yang utuh, dan husnul khatimah.',
      },
    ],
    haulSchedule:
      "Pertengahan bulan Sya'ban (sekitar 15–17 Sya'ban / pekan Nisfu Sya'ban, Puncak Haul Agung Kanjeng Sunan Ampel Surabaya)",
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti jalur pemisahan jamaah laki-laki dan perempuan di pelataran makam Sunan Ampel, menjaga barang bawaan saat melintasi lorong Pasar Ampel, serta tidak melangkahi makam para dzurriyah dan santri.',
    facilities: ['Masjid Agung Sunan Ampel (Cagar Budaya)', 'Area Maqbarah Utama & Makam Mbah Sholeh / Mbah Bolong', 'Sumur Air Berkah Ampel', 'Kawasan Pasar Arab & Kuliner Ampel', 'Terminal Parkir Bus Pegirian'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Graaf, H.J. de & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa: Peralihan dari Majapahit ke Mataram. Jakarta: Grafiti Pers.',
      'Sunyoto, Agus (2016). Atlas Wali Songo: Buku Pertama yang Mengungkap Wali Songo Sebagai Fakta Sejarah. Depok: Pustaka IIMaN.',
      'Atmodarminto, R. (1955). Babad Demak. Yogyakarta: Pesat.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-giri',
    legacyId: 'wali-6',
    name: 'Sunan Giri (Raden Paku / Prabu Satmata / Sultan Abdul Faqih)',
    title: 'Sunan Giri (Raja-Pendeta Giri Kedaton & Mufti Nusantara Timur)',
    description:
      'Pendiri Pesantren dan Kerajaan Islam Giri Kedaton di perbukitan Kebomas Gresik (1442–1506 M) yang menjadi poros penyebaran Islam hingga ke Lombok, Kalimantan, Sulawesi, Maluku, dan Nusa Tenggara.',
    category: 'Walisongo',
    era: 'Abad ke-15 – Awal Abad ke-16 M (1442–1506 M)',
    province: 'Jawa Timur',
    city: 'Gresik',
    district: 'Kec. Kebomas',
    address: 'Jl. Sunan Giri, Dusun Giri Gajah, Desa Giri, Kec. Kebomas, Kabupaten Gresik',
    location: {
      lat: -7.1695,
      lng: 112.6311,
      address: 'Jl. Sunan Giri, Dusun Giri Gajah, Desa Giri, Kec. Kebomas, Kabupaten Gresik',
      district: 'Kec. Kebomas',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Cungkup_Makam_Sunan_Giri.jpg',
    imageSource: 'Wikimedia Commons — Cungkup Kayu Ukir Makam Sunan Giri, Kebomas, Gresik',
    sanad:
      'Putra Syekh Maulana Ishaq dan Dewi Sekardadu (putri Prabu Menak Sembuyu Blambangan); anak angkat Nyai Ageng Pinatih (Syahbandar Gresik); murid utama sekaligus menantu Sunan Ampel di Surabaya.',
    karya: [
      'Pendirian Pesantren dan Pemerintahan Giri Kedaton (1487 M) di perbukitan Kebomas Gresik',
      'Penciptaan tembang dolanan anak bernafaskan tauhid (Cublak-Cublak Suweng, Jamuran, Jelungan, Jor) dan tembang Asmaradana/Pucung',
      'Kaderisasi mubaligh lintas pulau ke Maluku (Hitu & Ternate), Lombok (Sunan Prapen), Kutai, dan Banjar',
    ],
    history:
      'Raden Paku—yang dikenal dengan gelar Sunan Giri, Prabu Satmata, atau Sultan Abdul Faqih (1442–1506 M)—adalah putra dari ulama besar Syekh Maulana Ishaq dan putri penguasa Blambangan (Banyuwangi) bernama Dewi Sekardadu. Semasa bayi, akibat gejolak politik di Kerajaan Blambangan, beliau dihanyutkan di dalam peti ke Selat Bali hingga ditemukan oleh awak kapal dagang milik saudagar muslimah kaya raya sekaligus Syahbandar Gresik, Nyai Ageng Pinatih, yang kemudian mengangkatnya sebagai anak dengan nama Joko Samudro.\n\nSaat berusia sebelas tahun, Joko Samudro dikirim oleh ibu angkatnya untuk menuntut ilmu di Pesantren Ampel Denta Surabaya di bawah asuhan Sunan Ampel, yang memberinya nama Raden Paku setelah mengetahui garis nasabnya. Sunan Ampel kemudian mengutus Raden Paku bersama putranya, Raden Makhdum Ibrahim (Sunan Bonang), untuk menunaikan haji dan mendalami ilmu ke Makkah. Dalam perjalanan singgah di Pasai (Aceh), keduanya bertemu langsung dengan ayahanda Raden Paku, Syekh Maulana Ishaq, yang membekali putranya dengan ilmu tasawuf, fikih, serta segenggam tanah sebagai petunjuk lokasi pendirian pesantren kelak di perbukitan Giri.\n\nSekembalinya ke Gresik, Raden Paku mendirikan Pesantren Giri di puncak bukit Desa Sidomukti/Giri, Kecamatan Kebomas, yang pada tanggal 9 Maret 1487 M (12 Rabiul Awal 1409 Saka, ditandai *candrasengkala* "Trus Giriuta") diresmikan sebagai *Giri Kedaton*. Di bawah kepemimpinan Sunan Giri dan para penerusnya (Sunan Dalem serta Sunan Prapen), Giri Kedaton menjadi pusat fatwa fikih (*Ahlul Halli wal Aqdi* Jawa) sekaligus akademi mubaligh maritim yang mengislamkan kepulauan Indonesia bagian timur, mulai dari Lombok, Sumbawa, Kalimantan, Sulawesi Selatan, hingga Kesultanan Ternate dan Hitu di Maluku. Sunan Giri wafat pada tahun 1506 M dan dimakamkan di puncak Bukit Giri, Kebomas, Gresik.',
    karomah: [
      'Dalam tradisi lisan masyarakat Gresik dan naskah *Babad Tanah Jawi*, salah satu karomah paling masyhur dari Sunan Giri adalah peristiwa terciptanya *Keris Kalamunyeng*. Ketika tentara Majapahit di bawah pimpinan Patih/Adipati Sengkala menyerbu naik ke bukit Giri Kedaton untuk membubarkan pesantren, Sunan Giri yang sedang menulis mushaf Al-Qur’an melemparkan pena kayu (*kalam*) yang dipegangnya seraya berdoa kepada Allah SWT; pena tersebut berubah menjadi sebilah keris berputar (*munyeng*) yang menghalau pasukan penyerang tanpa menjatuhkan korban jiwa yang zalim hingga mereka mundur dengan takjub.<!--more-->\n\nRiwayat tutur lainnya mengisahkan masa remaja Joko Samudro ketika ikut berlayar berdagang ke Pulau Banjar (Kalimantan); saat kapal milik Nyai Ageng Pinatih nyaris karam dihantam badai karena muatan barang dagangan yang kosong sepulang beramal kepada penduduk yang kelaparan, Joko Samudro mengisi karung-karung dengan pasir dan batu pemberat yang sesampainya di Pelabuhan Gresik berubah menjadi barang dagangan berharga tinggi seperti rotan, damar, dan emas atas izin Allah SWT.',
    ],
    untoldStory:
      'Pengaruh politik dan keagamaan Giri Kedaton pada abad ke-16 begitu besar hingga catatan kolonial Portugis (seperti karya Tomé Pires dalam *Suma Oriental* dan laporan Antonio Pigafetta) maupun VOC Belanda menjuluki penguasa Giri Kedaton sebagai *"Paus dari Timur"* (*De Paus van het Oosten*). Setiap sultan baru di Jawa hingga Maluku—termasuk Sultan Hadiwijaya (Joko Tingkir) dari Pajang dan Sultan Zainal Abidin dari Ternate—datang ke Bukit Giri untuk memohon pengesahan spiritual (*baiat* keulamaan) dan restu dari pemangku Giri Kedaton.<!--more-->\n\nSelain ketegasan fikihnya, Sunan Giri adalah pendidik anak-anak yang sangat jenius; beliau menciptakan permainan tradisional *Cublak-Cublak Suweng* yang mengajarkan filosofi bahwa harta sejati (*suweng* / anting permata kebahagiaan) tidak ditemukan dengan mengikuti hawa nafsu yang serakah (*pak empong lera-lere*), melainkan dengan membersihkan hati nurani (*sir-sir pong dele kopong*).',
    barokahHajat:
      'Peziarah yang menaiki anak tangga menuju maqbarah Sunan Giri di Kebomas Gresik umumnya bertawassul memohon kepada Allah SWT keteguhan prinsip iman, kewibawaan dalam kepemimpinan, keberkahan pendidikan anak-keturunan, serta kejernihan hati dari keserakahan dunia.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Giri (Raden Paku / Prabu Satmata)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا عَيْنِ الْيَقِينِ رَادِينْ فَاكُو (سُونَانْ غِيرِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى عَيْنِ الْيَقِينِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا عَيْنِ الْيَقِينِ رَادِينْ فَاكُو (سُونَانْ غِيرِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى عَيْنِ الْيَقِينِ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa 'Ainil-Yaqiin Raden Paku (Sunan Giri) syai-un lillaahi lahumul-Faatihah. Allaahumma tsabbit quluubanaa 'alaa 'ainil-yaqiini wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ainul Yaqin Raden Paku (Sunan Giri), Al-Fatihah. Ya Allah, teguhkanlah hati kami di atas keyakinan yang sejati (Ainul Yaqin) dan limpahkanlah kemanfaatan melalui ilmu serta keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ainul Yaqin Raden Paku (Sunan Giri), Al-Fatihah. Ya Allah, teguhkanlah hati kami di atas keyakinan yang sejati (Ainul Yaqin) dan limpahkanlah kemanfaatan melalui ilmu serta keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '24–25 Rabiul Awal (Puncak Haul Akbar Tahunan Sunan Giri di Kompleks Makam Sunan Giri, Desa Giri, Kecamatan Kebomas, Kabupaten Gresik).',
    localAdab:
      'Menyiapkan stamina fisik untuk menaiki anak tangga menuju puncak Bukit Giri (atau menggunakan jasa dokar/ojek resmi dari terminal parkir bawah), berpakaian muslim sopan dan menutup aurat, serta menundukkan kepala saat memasuki cungkup kayu berukir naga-padma warisan abad ke-16.',
    facilities: ['Masjid Besar Ainul Yaqin Sunan Giri', 'Cungkup Ukir Kayu Jati Kuno Cagar Budaya', 'Museum Sunan Giri', 'Pangkalan Dokar Tradisional & Terminal Bus Giri', 'Sentra Kerajinan & Kuliner Giri'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Graaf, H.J. de & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa: Peralihan dari Majapahit ke Mataram. Jakarta: Grafiti Pers.',
      'Uka Tjandrasasmita (2009). Arkeologi Islam Nusantara. Jakarta: Kepustakaan Populer Gramedia (KPG).',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-bonang',
    legacyId: 'wali-3',
    name: 'Sunan Bonang (Raden Makhdum Ibrahim)',
    title: 'Sunan Bonang (Maestro Suluk Tasawuf & Gamelan Dakwah Jawa)',
    description:
      'Putra sulung Sunan Ampel dan ulama sufi besar di Kutorejo Tuban (1465–1525 M), pengarang Suluk Wujil serta penggubah instrumen gamelan Bonang dan tembang Tombo Ati.',
    category: 'Walisongo',
    era: 'Abad ke-15 – Awal Abad ke-16 M (1465–1525 M)',
    province: 'Jawa Timur',
    city: 'Tuban',
    district: 'Kec. Tuban',
    address: 'Jl. KH. Mustain, Kel. Kutorejo (Barat Masjid Agung Tuban), Kec. Tuban, Kabupaten Tuban',
    location: {
      lat: -6.8946,
      lng: 112.0631,
      address: 'Jl. KH. Mustain, Kel. Kutorejo (Barat Masjid Agung Tuban), Kec. Tuban, Kabupaten Tuban',
      district: 'Kec. Tuban',
      city: 'Tuban',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Makam_Sunan_Bonang_Tuban.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam Sunan Bonang di Kutorejo, Tuban',
    sanad:
      'Putra Sunan Ampel (Raden Rahmat) dan Nyai Ageng Manila (Dewi Condrowati binti Arya Teja Tuban); murid Syekh Maulana Ishaq di Pasai; guru spiritual utama bagi Raden Said (Sunan Kalijaga).',
    karya: [
      'Naskah Suluk Wujil, Suluk Kaderesan, dan Suluk Khalifah (tersimpan dalam koleksi filologi Universitas Leiden, Belanda)',
      'Gubahan syair suluk penyucian jiwa Tombo Ati (Lima Obat Hati berdasarkan ajaran Ibrahim bin Adham)',
      'Inovasi instrumen gamelan Bonang dan gending-gending suluk Sekaten untuk dakwah kultural',
    ],
    history:
      'Raden Maulana Makhdum Ibrahim—yang masyhur dengan gelar Sunan Bonang (1465–1525 M)—adalah putra dari Sunan Ampel dan Nyai Ageng Manila (putri Adipati Arya Teja dari Tuban). Sejak kecil beliau ditempa langsung oleh ayahandanya di Pesantren Ampel Denta Surabaya, lalu dikirim bersama sahabat seperguruannya, Raden Paku (Sunan Giri), ke Samudera Pasai di Aceh untuk mendalami tasawuf dan ilmu hakikat kepada Syekh Maulana Ishaq serta para ulama asal Baghdad dan Persia yang bermukim di Pasai.\n\nSekembalinya ke Tanah Jawa, Sunan Ampel menugaskan Raden Makhdum Ibrahim untuk berdakwah di wilayah leluhur ibundanya di pesisir utara Jawa Timur, yakni Kadipaten Tuban dan Lasem (Desa Bonang). Berbeda dengan pendekatan formalistik, Sunan Bonang menjadikan kesenian gamelan, tembang *macapat*, dan sastra suluk sebagai jembatan dakwah untuk menyentuh hati masyarakat Jawa yang masih memeluk ajaran Hindu-Buddha Tantrayana (*Bhairawa*). Beliau menciptakan instrumen ketuk-kenong baru yang kemudian dinamai *Bonang*, yang tabuhannya mengiringi tembang-tembang pujian tauhid hingga menarik ribuan warga masuk ke serambi masjid.\n\nDalam bidang filologi Nusantara, Sunan Bonang diakui oleh orientalis Belanda seperti B.J.O. Schrieke, P.J. Zoetmulder, dan G.W.J. Drewes sebagai penulis karya sastra tasawuf Jawa Kuno (*suluk*) yang sangat bernas, di antaranya *Suluk Wujil* (berangka tahun *candrasengkala* 1529 Saka / 1607 M pada naskah salinannya) yang memuat dialog makrifat antara Sunan Bonang dengan muridnya yang bernama Wujil, serta *Primbon Bonang* yang merumuskan sintesis tasawuf ortodoks Al-Ghazali. Sunan Bonang wafat sekitar tahun 1525 M dan makam utamanya yang paling ramai diziarahi berada di Kelurahan Kutorejo, di sebelah barat Alun-Alun dan Masjid Agung Tuban.',
    karomah: [
      'Dalam tradisi lisan masyarakat Jawa dan naskah *Babad Tanah Jawi*, karomah Sunan Bonang yang paling melegenda adalah peristiwa perjumpaannya dengan Raden Said (Brandal Lokajaya) di tepi sungai hutan Jatiwangi. Ketika Raden Said hendak merampas tongkat dan pakaian Sunan Bonang, sang Wali menunjuk serumpun buah aren (*kolang-kaling*) di atas pohon seraya berucap bahwa harta dunia hanyalah perhiasan semu; seketika seluruh tandan kolang-kaling tersebut berubah menjadi emas murni yang berkilauan hingga meruntuhkan kesombongan batin Raden Said dan mengantarkannya bertobat menjadi Sunan Kalijaga.<!--more-->\n\nDalam sejarah lokal Tuban dan Lasem, dikisahkan pula bahwa ketika Sunan Bonang wafat, terjadi perebutan penuh cinta antara santri beliau dari Madura/Bawean dengan santri beliau dari Tuban yang sama-sama ingin memakamkan jenazah sang guru; melalui karomah kewaliannya, kain kafan dan jejak makam beliau dihormati di beberapa petilasan (di Kutorejo Tuban, di bukit Desa Bonang Lasem, dan di Pulau Bawean), dengan Kompleks Kutorejo Tuban sebagai pusara utama.',
    ],
    untoldStory:
      'Syair legendaris *Tombo Ati* ("Obat hati ada lima perkaranya: membaca Al-Qur’an dan maknanya, mendirikan shalat malam, berkumpul dengan orang shalih, memperbanyak puasa perut, dan dzikir malam yang panjang") yang dinisbatkan kepada Sunan Bonang sesungguhnya merupakan saduran puitis berbahasa Jawa atas lima nasihat sufi besar abad ke-8 M, Syekh Ibrahim bin Adham (dan diriwayatkan pula oleh Imam An-Nawawi dalam *At-Tibyan*), yang berhasil dibumikan oleh Sunan Bonang hingga hafal di luar kepala oleh masyarakat desa di seluruh Pulau Jawa.<!--more-->\n\nDi Kompleks Makam Sunan Bonang di Kutorejo Tuban, dinding-dinding pendopo dan pagar maqbarah masih dihiasi ratusan piring keramik porselen kuno asal Dinasti Ming (Tiongkok) abad ke-15 hingga ke-16 M serta ukiran kayu motif *Surya Majapahit* dan flora sulur yang menjadi bukti autentik akulturasi budaya maritim Islam di pelabuhan kuno Tuban.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Bonang di Kutorejo Tuban umumnya bertawassul memohon kepada Allah SWT kesembuhan penyakit hati (*Tombo Ati*), kelembutan jiwa dalam berdakwah dan mendidik keluarga, serta ketenangan batin dalam ibadah malam.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Bonang (Raden Makhdum Ibrahim)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا مَخْدُومْ إِبْرَاهِيمَ (سُونَانْ بُونَانْغ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اشْفِ قُلُوبَنَا بِنُورِ الْقُرْآنِ وَمُجَالَسَةِ الصَّالِحِينَ وَانْفَعْنَا بِأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا مَخْدُومْ إِبْرَاهِيمَ (سُونَانْ بُونَانْغ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اشْفِ قُلُوبَنَا بِنُورِ الْقُرْآنِ وَمُجَالَسَةِ الصَّالِحِينَ وَانْفَعْنَا بِأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa Makhduum Ibraahiim (Sunan Bonang) syai-un lillaahi lahumul-Faatihah. Allaahummasyfi quluubanaa bi nuuril-Qur'aani wa mujaalasatish-shaalihiina wanfa'naa bi asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Makhdum Ibrahim (Sunan Bonang), Al-Fatihah. Ya Allah, sembuhkanlah penyakit hati kami dengan cahaya Al-Qur’an dan duduk bersama orang-orang shalih, serta limpahkanlah kemanfaatan melalui rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Makhdum Ibrahim (Sunan Bonang), Al-Fatihah. Ya Allah, sembuhkanlah penyakit hati kami dengan cahaya Al-Qur’an dan duduk bersama orang-orang shalih, serta limpahkanlah kemanfaatan melalui rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Malam Jumat Wage Bulan Muharram / Suro (Puncak Haul Akbar Tahunan Sunan Bonang di Kompleks Makam Sunan Bonang Kutorejo & Alun-Alun Tuban yang dihadiri ratusan ribu jamaah).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki gapura *Paduraksa* menuju pendopo tahlil dan cungkup utama, serta tidak menyentuh atau merusak piring keramik kuno yang menempel pada dinding cagar budaya.',
    facilities: ['Masjid Agung Tuban', 'Gapura Paduraksa & Cungkup Makam Cagar Budaya', 'Museum Kambang Putih Tuban (di dekat Alun-Alun)', 'Terminal Parkir Bus Wisata Religi Pantai Boom Tuban'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Schrieke, B.J.O. (1916). Het Boek van Bonang (Disertasi Universitas Leiden). Utrecht: P. den Boer.',
      'Drewes, G.W.J. (1969). The Admonitions of Seh Bari. The Hague: Martinus Nijhoff.',
      'Poerbatjaraka, R.M.Ng. (1938). Geheimleer van Sunan Bonang (Suluk Wujil). Djawa, XVIII.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-drajat',
    legacyId: 'wali-4',
    name: 'Sunan Drajat (Raden Qasim / Maulana Hasyim Syarifuddin)',
    title: 'Sunan Drajat (Wali Filantropi Sosial & Pencipta Catur Piwulang)',
    description:
      'Putra bungsu Sunan Ampel dan pelopor dakwah filantropi sosial di pesisir Paciran Lamongan (1470–1522 M), perumus falsafah empati kemanusiaan Catur Piwulang.',
    category: 'Walisongo',
    era: 'Akhir Abad ke-15 – Abad ke-16 M (sekitar 1470–1522 M)',
    province: 'Jawa Timur',
    city: 'Lamongan',
    district: 'Kec. Paciran',
    address: 'Desa Drajat, Kec. Paciran, Kabupaten Lamongan',
    location: {
      lat: -6.8832,
      lng: 112.3905,
      address: 'Desa Drajat, Kec. Paciran, Kabupaten Lamongan',
      district: 'Kec. Paciran',
      city: 'Lamongan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Makam_Sunan_Drajat.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Makam & Museum Sunan Drajat, Paciran, Lamongan',
    sanad:
      'Putra Sunan Ampel (Raden Rahmat) dan Nyai Ageng Manila (Dewi Condrowati); adik kandung Sunan Bonang; menantu Sunan Gunung Jati Cirebon (menikah dengan Dewi Sufiyah).',
    karya: [
      'Falsafah filantropi sosial Catur Piwulang (Wenehono teken marang wong kang wuta, Wenehono mangan marang wong kang luwe, Wenehono iyup marang wong kang kodanan, Wenehono busana marang wong kang wuda)',
      'Gubahan Tembang Macapat Pangkur dan Gamelan Singo Mengkok sebagai media dakwah pesisir',
      'Pendirian Pesantren Dalem Duwur di perbukitan Desa Drajat, Paciran, Lamongan',
    ],
    history:
      'Raden Qasim—yang bergelar Maulana Hasyim, Sunan Mayang Madu, atau Sunan Drajat (sekitar 1470–1522 M)—adalah putra bungsu Sunan Ampel dari permaisuri Nyai Ageng Manila serta adik kandung dari Sunan Bonang. Setelah menguasai ilmu syariat, fikih, dan tasawuf di Pesantren Ampel Denta Surabaya serta memperdalam pengalaman dakwah ke Cirebon hingga menikah dengan putri Sunan Gunung Jati (Dewi Sufiyah), Raden Qasim diutus oleh ayahandanya untuk menyebarkan agama Islam di pesisir barat Gresik dan Lamongan yang masyarakat nelayannya masih hidup dalam kemiskinan dan kepercayaan animisme.\n\nSetibanya di Desa Jelag (Banjaranyar, Paciran), Raden Qasim mendirikan surau pengajian dan membimbing masyarakat pesisir memperbaiki kualitas hidup melalui pembuatan perahu tangkap ikan, tata kelola rumah sehat, dan santunan anak yatim. Tiga tahun kemudian, beliau memindahkan pusat dakwahnya ke dataran perbukitan di sebelah selatan yang disebut *Dalem Duwur* di Desa Drajat, Kecamatan Paciran, Kabupaten Lamongan. Atas jasanya memakmurkan wilayah pesisir dan mengentaskan kemiskinan warga, Sultan Demak menganugerahkan tanah perdikan Drajat serta gelar *Sunan Mayang Madu* kepada beliau pada tahun 1442 Saka (1520 M).\n\nInti sari dakwah Sunan Drajat terangkum dalam prasasti batu *Catur Piwulang* (Empat Ajaran Utama) dan *Sapta Paweling* yang terpahat di kompleks makamnya: *"Wenehono teken marang wong kang wuta"* (Berilah tongkat petunjuk ilmu kepada orang yang buta), *"Wenehono mangan marang wong kang luwe"* (Berilah makan kepada orang yang kelaparan), *"Wenehono busana marang wong kang wuda"* (Berilah pakaian dan kehormatan kepada orang yang tak berpakaian), dan *"Wenehono ngiyup marang wong kang kodanan"* (Berilah tempat berteduh kepada orang yang kehujanan/tertimpa musibah). Sunan Drajat wafat sekitar pertengahan abad ke-16 M dan dimakamkan di puncak bukit Dalem Duwur, Desa Drajat, Paciran, Lamongan.',
    karomah: [
      'Dalam tradisi lisan masyarakat pesisir Lamongan dan *Babad Sunan Drajat*, dikisahkan bahwa ketika perahu yang ditumpangi Raden Qasim dari Surabaya menuju pesisir Lamongan dihantam gelombang besar di tengah Laut Jawa hingga pecah di perairan Sedayu/Paciran, beliau berzikir dengan tenang kepada Allah SWT; tak lama kemudian muncul dua ekor ikan besar—ikan cucut dan ikan talang (*cakalang*)—yang menopang tubuh Raden Qasim di punggungnya hingga mendarat dengan selamat di pantai Desa Banjaranyar.<!--more-->\n\nKaromah lainnya yang dikenal masyarakat setempat adalah memancarnya sumber air tawar di puncak bukit batu kapur Drajat (*Sumur Lengsanga*) ketika wilayah Paciran dilanda kekeringan hebat; saat Sunan Drajat mencabut umbi keladi hutan di perbukitan tersebut sembari berdoa, dari bekas cabutan itu memancar mata air jernih yang menghidupi para santri dan warga desa.',
    ],
    untoldStory:
      'Kompleks Makam Sunan Drajat di Paciran memiliki penataan ruang berundak tujuh teras (*sapta teras*) dari halaman bawah hingga cungkup utama di puncak bukit Dalem Duwur, yang melambangkan tujuh tahapan pendakian ruhani manusia menuju keridhaan Allah SWT. Di samping cungkup makam, berdiri Museum Daerah Sunan Drajat yang menyimpan artefak asli peninggalan sang Wali, termasuk seperangkat *Gamelan Singo Mengkok* berukir singa duduk (simbol pengendalian amarah dan hawa nafsu) serta daun lontar bertuliskan tembang *Pangkur* (*"Mingkar-mingkuring angkara"*).<!--more-->\n\nSemangat kemandirian ekonomi dan filantropi Sunan Drajat hingga hari ini tetap dihidupkan secara nyata oleh Pondok Pesantren Sunan Drajat di bawah asuhan KH. Abdul Ghofur yang berada tepat di kaki bukit makam, menjadikannya salah satu pesantren wirausaha dan pendidikan terbesar di Jawa Timur.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Drajat di Paciran Lamongan umumnya bertawassul memohon kepada Allah SWT diangkatnya derajat kemuliaan hidup (*drajat*), kelapangan rezeki untuk berbagi kepada kaum dhuafa (*Catur Piwulang*), serta keselamatan dalam perjalanan dan usaha.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Drajat (Raden Qasim Syarifuddin)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا قَاسِمْ شَرِيفِ الدِّينِ (سُونَانْ دَرَاجَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْفَعْ دَرَجَاتِنَا فِي الدُّنْيَا وَالْآخِرَةِ وَاجْعَلْنَا مِنْ أَهْلِ الْإِحْسَانِ وَالْكَرَمِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا قَاسِمْ شَرِيفِ الدِّينِ (سُونَانْ دَرَاجَاتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْفَعْ دَرَجَاتِنَا فِي الدُّنْيَا وَالْآخِرَةِ وَاجْعَلْنَا مِنْ أَهْلِ الْإِحْسَانِ وَالْكَرَمِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa Qaasim Syariifuddiin (Sunan Drajat) syai-un lillaahi lahumul-Faatihah. Allaahummarfa' darajaatinaa fid-dunyaa wal-aakhirati waj'alnaa min ahlil-ihsaani wal-karam.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Qasim Syarifuddin (Sunan Drajat), Al-Fatihah. Ya Allah, angkatlah derajat kami di dunia dan akhirat serta jadikanlah kami termasuk golongan orang-orang yang berbuat ihsan dan dermawan.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Qasim Syarifuddin (Sunan Drajat), Al-Fatihah. Ya Allah, angkatlah derajat kami di dunia dan akhirat serta jadikanlah kami termasuk golongan orang-orang yang berbuat ihsan dan dermawan.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / menjelang Ramadhan (Puncak Haul Akbar Tahunan Sunan Drajat yang diselenggarakan bersama keluarga dzurriyah dan Pondok Pesantren Sunan Drajat di Paciran, Lamongan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga ketertiban saat menaiki tangga batu menuju cungkup makam Dalem Duwur, serta membaca dan merenungi prasasti *Catur Piwulang* dan *Sapta Paweling* yang terpampang di halaman makam.',
    facilities: ['Masjid Jami’ Sunan Drajat', 'Cungkup Kayu Jati Kuno Dalem Duwur', 'Museum Daerah Sunan Drajat (Gratis)', 'Kompleks Pondok Pesantren Sunan Drajat', 'Terminal Parkir Bus Wisata Religi Drajat'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Tim Peneliti Sejarah Sunan Drajat (1998). Sejarah Sunan Drajat dalam Jaringan Penyebaran Islam di Nusantara. Surabaya: Pemprov Jatim.',
      'Uka Tjandrasasmita (2009). Arkeologi Islam Nusantara. Jakarta: KPG.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'fatimah-binti-maimun',
    name: 'Makam Siti Fatimah binti Maimun (Situs Makam Panjang Leran Abad ke-11 M)',
    title: 'Bukti Epigrafis Tertua Kehadiran Islam di Nusantara (475 H / 1082 M)',
    description:
      'Situs arkeologi Islam tertua di Asia Tenggara di Desa Leran, Manyar, Gresik yang menyimpan prasasti batu nisan berangka tahun 7 Rajab 475 H (2 Desember 1082 M) beraksara Arab Kufi.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-11 M (Wafat 7 Rajab 475 H / 2 Desember 1082 M)',
    province: 'Jawa Timur',
    city: 'Gresik',
    district: 'Kec. Manyar',
    address: 'Dusun Pesucian, Desa Leran, Kec. Manyar, Kabupaten Gresik',
    location: {
      lat: -7.1318,
      lng: 112.5964,
      address: 'Dusun Pesucian, Desa Leran, Kec. Manyar, Kabupaten Gresik',
      district: 'Kec. Manyar',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Gresik (Kompleks Cungkup Batu Kapur Makam Fatimah binti Maimun Leran)',
    sanad:
      'Putri dari Maimun bin Hibatallah, bangsawan dan saudagar muslim jaringan pelayaran Timur Tengah–Persia–Champa yang bermukim di pesisir Jawa Timur pada masa Kerajaan Kediri/Janggala abad ke-11 M.',
    karya: [
      'Prasasti Batu Nisan Leran beraksara Arab Kufi (475 H / 1082 M) sebagai tonggak historiografi masuknya Islam ke Nusantara pada abad ke-11 M',
      'Kompleks Cungkup Batu Kapur Putih (Batu Putih) berarsitektur peralihan pra-Islam dan Islam awal',
    ],
    history:
      'Kompleks Makam Siti Fatimah binti Maimun bin Hibatallah di Dusun Pesucian, Desa Leran, Kecamatan Manyar, Kabupaten Gresik merupakan salah satu monumen arkeologi paling krusial dalam sejarah masuknya agama Islam di kepulauan Nusantara dan Asia Tenggara. Keberadaan makam ini menjadi pusat perhatian dunia akademik sejak epigraf Belanda J.P. Moquette (1912) dan orientalis Prancis Paul Ravaisse (1925) berhasil membaca tujuh baris inskripsi berbahasa Arab dengan khat *Kufi* bergaya Persia-Timur Tengah yang terpahat pada batu prasasti di kompleks makam tersebut.\n\nBerdasarkan pembacaan Paul Ravaisse dan S.Q. Fatimi, inskripsi tersebut menyebut wafatnya seorang perempuan muslimah mulia (*asy-syahidah*) bernama Fatimah binti Maimun bin Hibatallah pada hari Jumat, tanggal 7 Rajab tahun 475 Hijriah, yang bertepatan dengan tanggal 2 Desember 1082 Masehi. Angka tahun 1082 M ini membuktikan secara ilmiah dan tak terbantahkan bahwa komunitas muslim internasional telah hadir dan menetap dengan damai di pesisir utara Jawa Timur (pada era Kerajaan Janggala/Kediri) lebih dari tiga abad sebelum masa Wali Songo dan dua abad sebelum berdirinya Kesultanan Samudera Pasai.\n\nSecara arkeologis, makam Fatimah binti Maimun berada di dalam sebuah cungkup kuno yang tersusun dari balok-balok batu kapur putih (*limestone*) tanpa perekat semen yang menyerupai arsitektur candi Jawa Timur dengan atap berundak. Di sekeliling cungkup utama terdapat deretan makam kuno yang dikenal masyarakat sebagai "Makam Panjang" (makam para pengiring dan kerabat beliau seperti Sayyid Syafar, Sayyid Ja\'far, dan Sayyid Karim). Situs Makam Fatimah binti Maimun di Leran telah ditetapkan sebagai Cagar Budaya Peringkat Nasional oleh Pemerintah Republik Indonesia.',
    karomah: [
      'Dalam tradisi lisan masyarakat Desa Leran dan Gresik, Siti Fatimah binti Maimun dikenal dengan sebutan *Putri Dewi Retno Suwari*, seorang bangsawan muslimah yang sangat dermawan, suci, dan teguh menjaga kehormatan imannya di tengah lingkungan yang belum mengenal Islam. Dikisahkan bahwa kesantunan akhlak dan kemuliaan ibadah keluarga Maimun bin Hibatallah di Dusun Pesucian membuat raja dan penduduk setempat sangat menghormati mereka hingga menyediakan lahan khusus yang disucikan (*Pesucian*) ketika sang putri wafat pada usia muda.<!--more-->\n\nSelama lebih dari sembilan ratus tahun sejak abad ke-11 M hingga hari ini, cungkup batu kapur putih makam Siti Fatimah binti Maimun di Desa Leran tetap berdiri kokoh melintasi pergantian zaman kerajaan-kerajaan Jawa dan masa kolonial, menjadi saksi bisu cahaya tauhid pertama yang menyapa pesisir Tanah Jawa.',
    ],
    untoldStory:
      'Gaya khat *Kufi* berornamen daun (*floriated Kufic*) pada batu prasasti Fatimah binti Maimun di Leran memiliki kemiripan epigrafis yang sangat dekat dengan prasasti batu nisan Sultan Phan Rang di Champa (Vietnam Selatan, berangka tahun 1039 M) dan batu nisan dari era Dinasti Fatimiyah/Buwaihiyah di Timur Tengah. Hal ini menyingkap fakta sejarah bahwa pelabuhan kuno Gresik-Leran pada abad ke-11 telah terhubung langsung dengan jalur pelayaran maritim kosmopolitan yang membentang dari Teluk Persia, Gujarat, Champa, hingga Kanton di Tiongkok.<!--more-->\n\nSekitar tiga ratus tahun setelah wafatnya Siti Fatimah binti Maimun, ketika Syekh Maulana Malik Ibrahim (Sunan Gresik) pertama kali mendarat di Pulau Jawa pada akhir abad ke-14 M, beliau sengaja memilih Desa Sembalo di kawasan Leran sebagai titik pendaratan awalnya karena mengetahui adanya jejak komunitas muslim terdahulu di sekitar makam Fatimah binti Maimun.',
    barokahHajat:
      'Peziarah dan peneliti sejarah yang berziarah ke maqbarah Siti Fatimah binti Maimun di Desa Leran Gresik umumnya bertawassul memohon kepada Allah SWT penjagaan kesucian kehormatan diri dan keluarga, keteguhan iman di mana pun berada, serta kemuliaan wafat dalam keadaan husnul khatimah (*syahidah*).',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Siti Fatimah binti Maimun bin Hibatallah (Leran Gresik)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدَةِ الشَّهِيدَةِ فَاطِمَةَ بِنْتِ مَيْمُونْ بْنِ هِبَةِ اللهِ اللِّيرَانِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَاحْفَظْ إِيمَانَنَا وَذُرِّيَّاتِنَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدَةِ الشَّهِيدَةِ فَاطِمَةَ بِنْتِ مَيْمُونْ بْنِ هِبَةِ اللهِ اللِّيرَانِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَاحْفَظْ إِيمَانَنَا وَذُرِّيَّاتِنَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sayyidatisy-Syahiidah Faathimah binti Maimuun bin Hibatillaah al-Liiraaniyyah syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahaa warhamhaa wahfazh iimaananaa wa dzurriyyaatinaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyidah Syahidah Fatimah binti Maimun bin Hibatallah di Leran, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta peliharalah keimanan kami dan anak-keturunan kami di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyidah Syahidah Fatimah binti Maimun bin Hibatallah di Leran, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta peliharalah keimanan kami dan anak-keturunan kami di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Jumat Terakhir Bulan Rajab (Memperingati tanggal wafat pada inskripsi batu nisan Leran 7 Rajab 475 H di Kompleks Makam Siti Fatimah binti Maimun, Desa Leran, Manyar, Gresik).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki di pelataran pendopo, menundukkan badan saat memasuki pintu cungkup batu kapur yang sangat rendah, serta dilarang keras menggores atau bersandar pada batu kapur cagar budaya abad ke-11.',
    facilities: ['Cungkup Batu Kapur Cagar Budaya Nasional Abad ke-11', 'Masjid Jami’ Pesucian Leran', 'Pendopo Peziarah & Kompleks Makam Panjang', 'Area Parkir Peziarah Desa Leran Manyar'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ravaisse, Paul (1925). L’inscription coufique de Léran à Java. Tijdschrift voor Indische Taal-, Land- en Volkenkunde (TBG), 65, 668–703.',
      'Fatimi, S.Q. (1963). Islam Comes to Malaysia. Singapore: Malaysian Sociological Research Institute.',
      'Uka Tjandrasasmita (2009). Arkeologi Islam Nusantara. Jakarta: Kepustakaan Populer Gramedia (KPG).',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-maulana-ishaq',
    legacyId: 'auliya-20',
    name: 'Makam & Petilasan Syekh Maulana Ishaq (Ayahanda Sunan Giri)',
    title: 'Wali Agung Penyebar Islam Blambangan & Pasai, Ayahanda Sunan Giri',
    description:
      'Ulama sufi besar abad ke-15 M saudara Syekh Ibrahim Asmorokondi dan ayahanda Sunan Giri, yang jejak dakwah dan maqbarah/petilasannya dihormati di Desa Kemantren, Paciran, Lamongan.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 M',
    province: 'Jawa Timur',
    city: 'Lamongan',
    district: 'Kec. Paciran',
    address: 'Jl. Raya Deandles Pantura, Desa Kemantren, Kec. Paciran, Kabupaten Lamongan',
    location: {
      lat: -6.8758,
      lng: 112.3712,
      address: 'Jl. Raya Deandles Pantura, Desa Kemantren, Kec. Paciran, Kabupaten Lamongan',
      district: 'Kec. Paciran',
      city: 'Lamongan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Makam_Sunan_Drajat.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pesisir Paciran Lamongan (Kompleks Masjid & Maqbarah Syekh Maulana Ishaq Kemantren)',
    sanad:
      'Putra Syekh Jamaluddin Akbar Al-Husaini (Syekh Jumadil Kubro); adik dari Syekh Ibrahim Asmorokondi (ayahanda Sunan Ampel); ayahanda dari Raden Paku (Sunan Giri) serta guru tasawuf Sunan Bonang dan Sunan Giri di Pasai.',
    karya: [
      'Dakwah Islam dan penyembuhan wabah penyakit di Kerajaan Blambangan (Banyuwangi) pada abad ke-15 M',
      'Pengajaran ilmu hikmah, tasawuf, dan kaderisasi Sunan Giri serta Sunan Bonang di Pasai dan pesisir Jawa Timur',
    ],
    history:
      'Syekh Maulana Ishaq adalah salah satu ulama besar abad ke-15 M dari silsilah *Azmatkhan Al-Husaini* yang memegang peranan kunci dalam mata rantai genealogi dan intelektual Wali Songo. Dalam berbagai naskah genealogis Nusantara dan *Babad Tanah Jawi*, beliau disebut sebagai putra dari Syekh Jamaluddin Akbar Al-Husaini (Syekh Jumadil Kubro) sekaligus adik dari Syekh Ibrahim Asmorokondi (ayahanda Sunan Ampel). Sebelum berdakwah di ujung timur Pulau Jawa, Syekh Maulana Ishaq terlebih dahulu bermukim dan mengajar di Kesultanan Samudera Pasai (Aceh) yang kala itu menjadi pusat studi Islam di Asia Tenggara.\n\nPada pertengahan abad ke-15 M, setelah mengunjungi keponakannya Raden Rahmat (Sunan Ampel) di Surabaya, Syekh Maulana Ishaq mengembara ke wilayah Kerajaan Blambangan (Banyuwangi) yang masih beragama Hindu-Buddha dan sedang dilanda wabah penyakit mematikan (*pagebluk*). Atas izin Allah SWT, melalui doa dan pengobatan Syekh Maulana Ishaq, putri tunggal Raja Blambangan Prabu Menak Sembuyu yang bernama Dewi Sekardadu sembuh dari penyakit parah. Sang Raja kemudian menikahkan Dewi Sekardadu dengan Syekh Maulana Ishaq dan menganugerahkan wilayah kadipaten di Blambangan.\n\nKetika dakwah Islam Syekh Maulana Ishaq berkembang pesat di Blambangan, timbul kecemburuan politik dari kalangan patih istana yang menekan Prabu Menak Sembuyu. Demi menghindari pertumpahan darah, Syekh Maulana Ishaq berpamitan kepada istrinya yang sedang mengandung Raden Paku (kelak menjadi Sunan Giri) untuk kembali mengajar di Samudera Pasai, di mana beberapa belas tahun kemudian beliau mendidik langsung putranya (Raden Paku) dan keponakannya (Sunan Bonang) selama ratusan hari. Dalam khazanah ziarah Jawa Timur, situs makam dan petilasan utama Syekh Maulana Ishaq di pesisir Desa Kemantren, Kecamatan Paciran, Kabupaten Lamongan (tidak jauh dari Makam Sunan Drajat) menjadi salah satu maqbarah paling ramai diziarahi oleh jamaah Wali Songo.',
    karomah: [
      'Dalam tradisi lisan masyarakat Jawa Timur dan naskah *Babad Gresik*, karomah utama Syekh Maulana Ishaq yang dikenang sepanjang masa adalah penyembuhan wabah *pagebluk* di Blambangan serta ketajaman *firasat* kewalian beliau ketika membekali putranya, Raden Paku, dengan segenggam tanah di Pasai; beliau berwasiat agar Raden Paku mendirikan pesantren di tempat di Pulau Jawa yang aroma, warna, dan berat tanahnya persis sama dengan tanah pemberian tersebut, yang ternyata berada di puncak Bukit Giri Kebomas Gresik.<!--more-->\n\nDi Desa Kemantren, Paciran, Lamongan, masyarakat setempat juga memelihara riwayat tutur tentang kesejukan dan kewibawaan majelis dzikir Syekh Maulana Ishaq di tepi pantai utara Lamongan yang menjadi tempat persinggahan para pelaut dan santri pesisir.',
    ],
    untoldStory:
      'Dalam historiografi Islam Nusantara, terdapat beberapa situs yang menghormati jejak Syekh Maulana Ishaq: di Kuala Peudada (Bireuen, Aceh) sebagai tempat beliau mengajar di Pasai, di Paciran (Lamongan) sebagai maqbarah/petilasan pesisir Jawa Timur, serta di Tanjung Puteri (Singapura/Johor). Keberadaan situs-situs penghormatan di sepanjang Selat Malaka hingga Laut Jawa ini menegaskan luasnya jangkauan jaringan dakwah maritim Syekh Maulana Ishaq pada abad ke-15 M.<!--more-->\n\nKompleks Makam Syekh Maulana Ishaq di Desa Kemantren terletak tepat di tepi jalan raya pantura Daendels (Gresik–Tuban), berdampingan dengan Masjid Agung Syekh Maulana Ishaq yang megah berarsitektur Timur Tengah dan Jawa, berjarak hanya sekitar 2,5 kilometer di sebelah barat Makam Sunan Drajat.',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Syekh Maulana Ishaq di Kemantren Paciran Lamongan umumnya bertawassul memohon kepada Allah SWT kesembuhan dari penyakit berat, penjagaan anak-keturunan agar tumbuh menjadi ulama shalih seperti Sunan Giri, serta keselamatan dalam merantau menuntut ilmu.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Maulana Ishaq (Ayahanda Sunan Giri)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا إِسْحَاقَ الْحُسَيْنِيِّ وَالِدِ سُونَانْ غِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ عَافِنَا مِنْ كُلِّ بَلَاءٍ وَوَبَاءٍ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا إِسْحَاقَ الْحُسَيْنِيِّ وَالِدِ سُونَانْ غِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ عَافِنَا مِنْ كُلِّ بَلَاءٍ وَوَبَاءٍ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa Ishaaq al-Husainii waalidi Sunan Giri syai-un lillaahi lahumul-Faatihah. Allaahumma 'aafinaa min kulli balaa-in wa wabaa-in wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ishaq Al-Husaini (ayahanda Sunan Giri), Al-Fatihah. Ya Allah, selamatkanlah kami dari segala bala dan wabah penyakit serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ishaq Al-Husaini (ayahanda Sunan Giri), Al-Fatihah. Ya Allah, selamatkanlah kami dari segala bala dan wabah penyakit serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Muharram / Bulan Suro (Puncak Haul Akbar Tahunan Syekh Maulana Ishaq di Kompleks Masjid & Maqbarah Desa Kemantren, Kecamatan Paciran, Kabupaten Lamongan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki sebelum memasuki serambi masjid dan cungkup maqbarah, serta menjaga ketertiban antrean rombongan bus peziarah.',
    facilities: ['Masjid Agung Syekh Maulana Ishaq Kemantren', 'Cungkup Maqbarah & Pendopo Tahlil', 'Area Parkir Bus Pantura Kemantren', 'Dekat Makam Sunan Drajat (2,5 km)'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Graaf, H.J. de & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa. Jakarta: Grafiti Pers.',
      'Wisnu, Sastra (1913). Babad Gresik (Koleksi Naskah Jawa Timur).',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-ibrahim-asmorokondi',
    legacyId: 'auliya-11',
    name: 'Makam Syekh Ibrahim Asmorokondi (Maulana Ibrahim As-Samarqandi, Ayahanda Sunan Ampel)',
    title: 'Leluhur Para Wali Songo & Ulama Besar Samarkand di Palang Tuban',
    description:
      'Maqbarah ulama sufi agung asal Samarkand, Syekh Maulana Ibrahim As-Samarqandi (wafat sekitar 1440 M) di Desa Gesikharjo, Palang, Tuban—ayahanda Sunan Ampel dan kakek dari Sunan Bonang serta Sunan Drajat.',
    category: 'Auliya Nusantara',
    era: 'Pertengahan Abad ke-15 M (Wafat sekitar 1440 M)',
    province: 'Jawa Timur',
    city: 'Tuban',
    district: 'Kec. Palang',
    address: 'Dusun Gading, Desa Gesikharjo, Kec. Palang, Kabupaten Tuban',
    location: {
      lat: -6.9012,
      lng: 112.1425,
      address: 'Dusun Gading, Desa Gesikharjo, Kec. Palang, Kabupaten Tuban',
      district: 'Kec. Palang',
      city: 'Tuban',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Makam_Sunan_Bonang_Tuban.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pesisir Tuban (Kompleks Makam Syekh Ibrahim Asmorokondi Palang Tuban)',
    sanad:
      'Putra Syekh Jamaluddin Akbar Al-Husaini (Syekh Jumadil Kubro); kakak dari Syekh Maulana Ishaq; ayahanda dari Sayyid Ali Murtadha (Raden Santri Gresik) dan Sayyid Ali Rahmatullah (Sunan Ampel Surabaya).',
    karya: [
      'Dakwah Islam dan diplomasi keulamaan di Kerajaan Champa (Vietnam Selatan) hingga pelabuhan kuno Tuban pada abad ke-15 M',
      'Peletak fondasi silsilah keilmuan dan nasab mayoritas anggota Dewan Wali Songo di Tanah Jawa',
    ],
    history:
      'Syekh Maulana Ibrahim As-Samarqandi—yang oleh lidah masyarakat Jawa dilafalkan menjadi *Syekh Ibrahim Asmorokondi*—adalah tokoh sentral generasi awal penyebaran Islam di Asia Tenggara yang menjadi ayahanda dari Sunan Ampel (Raden Rahmat) sekaligus kakek dari Sunan Bonang dan Sunan Drajat. Berdasarkan kajian filologi terhadap *Babad Tanah Jawi*, *Hikayat Hasanuddin*, dan catatan silsilah *Bahrul Ansab*, beliau adalah putra dari Syekh Jamaluddin Akbar Al-Husaini yang lama menuntut ilmu dan bermukim di kota Samarkand (Uzbekistan, Asia Tengah) pada era keemasan Dinasti Timuriyah sebelum berlayar ke Asia Tenggara.\n\nSebelum tiba di Pulau Jawa, Syekh Maulana Ibrahim As-Samarqandi terlebih dahulu berdakwah di Kerajaan Champa (kawasan Indochina/Vietnam Selatan). Di Champa, beliau berhasil mengislamkan kalangan bangsawan istana dan dinikahkan oleh Raja Champa dengan putrinya yang bernama Dewi Candrawulan. Dari pernikahan mulia ini lahir dua putra yang kelak menjadi pilar utama dakwah Jawa: Sayyid Ali Murtadha (Raden Santri / Sunan Gisik) dan Sayyid Ali Rahmatullah (Raden Rahmat / Sunan Ampel). Adik ipar beliau, Putri Dwarawati, diperistri oleh Raja Majapahit di Jawa.\n\nSekitar tahun 1440 M, Syekh Ibrahim Asmorokondi berlayar menuju Pulau Jawa bersama kedua putranya dan keponakannya (Raden Burereh / Abu Hurairah) untuk bersilaturahmi dengan kerabat istana Majapahit sekaligus merintis dakwah Islam di Tanah Jawa. Kapal beliau berlabuh di pelabuhan kuno Gisik (kini Desa Gesikharjo, Kecamatan Palang, Kabupaten Tuban). Di pesisir Palang Tuban inilah beliau sempat membimbing masyarakat nelayan setempat sebelum jatuh sakit dan wafat sekitar tahun 1440 M, lalu dimakamkan dengan penuh penghormatan di Desa Gesikharjo, Kecamatan Palang, sekitar 7 kilometer di sebelah timur Kota Tuban.',
    karomah: [
      'Dalam tradisi lisan masyarakat Palang Tuban, dikisahkan bahwa ketika Syekh Ibrahim Asmorokondi mendarat di pantai Gesikharjo bersama rombongannya dan hendak menunaikan shalat di tengah musim kemarau yang kering, beliau menancapkan tongkatnya ke tanah berpasir di dekat pantai; seketika memancar air tawar yang sejuk dan jernih untuk berwudhu meskipun letaknya hanya beberapa puluh meter dari air laut yang asin.<!--more-->\n\nKaromah terbesar Syekh Ibrahim Asmorokondi sebagaimana dicatat oleh para ulama ahli nasab Nusantara adalah keberkahan doa beliau bagi anak-keturunannya (*dzurriyah*): dari sulbi beliau lahir Sunan Ampel, Sunan Bonang, Sunan Drajat, hingga bersambung kepada jaringan ratusan kiai pendiri pondok pesantren besar di seluruh Jawa dan Madura.',
    ],
    untoldStory:
      'Penamaan *Asmorokondi* yang terdengar sangat puitis dalam bahasa Jawa (seolah berasal dari kata *asmara* dan *kandhi*) sebenarnya merupakan adaptasi fonetis Jawa atas nisbah geografis bahasa Arab *As-Samarqandi* ("yang berasal dari Samarkand"). Fenomena linguistik ini menjadi bukti historis hubungan langsung antara pusat peradaban Islam Asia Tengah (Samarkand dan Bukhara) dengan pesisir utara Jawa pada abad ke-15 M.<!--more-->\n\nDi Kompleks Makam Syekh Ibrahim Asmorokondi di Desa Gesikharjo, Palang, Tuban, masih berdiri gapura *Paduraksa* bata merah kuno dan masjid bersejarah di tepi pantai utara Jawa. Setiap rombongan peziarah Wali Songo yang bergerak dari Lamongan menuju Makam Sunan Bonang di Kota Tuban hampir selalu singgah lebih dahulu di maqbarah ayahanda Sunan Ampel ini sebagai bentuk adab mendahulukan orang tua sebelum menziarahi anak-cucunya.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Ibrahim Asmorokondi di Palang Tuban umumnya bertawassul memohon kepada Allah SWT keberkahan nasab dan anak-keturunan yang menjadi ulama pejuang agama, keselamatan perjalanan, serta keteguhan iman keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Maulana Ibrahim As-Samarqandi (Asmorokondi)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا إِبْرَاهِيمَ السَّمَرْقَنْدِيِّ (أَسْمَارَاكَانْدِي) وَالِدِ سُونَانْ أَمْفِيلْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَوْلَادِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا إِبْرَاهِيمَ السَّمَرْقَنْدِيِّ (أَسْمَارَاكَانْدِي) وَالِدِ سُونَانْ أَمْفِيلْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَوْلَادِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa Ibraahiim as-Samarqandii (Asmorokondi) waalidi Sunan Ampel syai-un lillaahi lahumul-Faatihah. Allaahumma baarik lanaa fii aulaadinaa wa dzurriyyaatinaa wanfa'naa bi 'uluumihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ibrahim As-Samarqandi (Asmorokondi, ayahanda Sunan Ampel), Al-Fatihah. Ya Allah, berkahilah anak-anak serta keturunan kami dan limpahkanlah kemanfaatan melalui ilmu serta rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Syekh Maulana Ibrahim As-Samarqandi (Asmorokondi, ayahanda Sunan Ampel), Al-Fatihah. Ya Allah, berkahilah anak-anak serta keturunan kami dan limpahkanlah kemanfaatan melalui ilmu serta rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '20 Syawal (Puncak Haul Akbar Tahunan Syekh Maulana Ibrahim Asmorokondi di Desa Gesikharjo, Kecamatan Palang, Kabupaten Tuban).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki sebelum melewati gapura *Paduraksa* menuju cungkup makam, serta menjaga ketenangan dan kebersihan lingkungan masjid di tepi pantai.',
    facilities: ['Masjid Jami’ Syekh Ibrahim Asmorokondi', 'Gapura Paduraksa Kuno & Cungkup Makam Cagar Budaya', 'Sumur Kuno Asmorokondi', 'Terminal Parkir Bus Peziarah Palang Tuban'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Djajadiningrat, Hoesein (1913). Critische Beschouwing van de Sadjarah Banten. Haarlem: Joh. Enschedé en Zonen.',
      'Graaf, H.J. de & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa. Jakarta: Grafiti Pers.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-sendang-duwur',
    name: 'Makam Sunan Sendang Duwur (Raden Nur Rahmat, Paciran Lamongan)',
    title: 'Wali Arsitek Gapura Bersayap Bukit Amitunon (1585 M)',
    description:
      'Kompleks makam dan masjid kuno Sunan Sendang Duwur (Raden Nur Rahmat, 1520–1585 M) di puncak Bukit Amitunon, Desa Sendangduwur, Paciran, Lamongan—mahakarya arsitektur gapura bersayap peralihan Hindu-Islam.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 M (1520–1585 M)',
    province: 'Jawa Timur',
    city: 'Lamongan',
    district: 'Kec. Paciran',
    address: 'Bukit Amitunon, Desa Sendangduwur, Kec. Paciran, Kabupaten Lamongan',
    location: {
      lat: -6.8895,
      lng: 112.4048,
      address: 'Bukit Amitunon, Desa Sendangduwur, Kec. Paciran, Kabupaten Lamongan',
      district: 'Kec. Paciran',
      city: 'Lamongan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Makam_Sunan_Drajat.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Paciran Lamongan (Kompleks Gapura Bersayap & Makam Sunan Sendang Duwur)',
    sanad:
      'Putra Syekh Abdul Kohar bin Malik bin Sultan Abu Yazid asal Baghdad dan Dewi Sukarsih (putri Tumenggung Sedayu); murid dan sahabat dakwah Sunan Drajat serta Sunan Kalijaga.',
    karya: [
      'Masjid Kuno Sendang Duwur (1561 M / 1483 Saka) dan Kompleks Gapura Bersayap Meru di Bukit Amitunon',
      'Seni ukir kayu dan batu karang bercorak Kalpataru, Burung Garuda/Merak, dan Padmasana bernafaskan tauhid',
    ],
    history:
      'Raden Nur Rahmat—yang bergelar Sunan Sendang Duwur (1520–1585 M)—adalah ulama dan wali penyebar Islam abad ke-16 di perbukitan kapur pesisir utara Kabupaten Lamongan. Beliau lahir pada tahun 1520 M dari pasangan Syekh Abdul Kohar (ulama asal Timur Tengah yang berdakwah di Sedayu/Gresik) dan Dewi Sukarsih. Sejak muda, Raden Nur Rahmat menimba ilmu agama serta kesenian ukir dan arsitektur dari jaringan Wali Songo di pesisir Jawa Timur, khususnya kepada Sunan Drajat yang berdakwah hanya berjarak sekitar dua kilometer di sebelah barat Bukit Amitunon.\n\nAtas petunjuk ayahandanya dan Sunan Drajat, Raden Nur Rahmat memilih puncak Bukit Amitunon di Desa Sendangduwur, Kecamatan Paciran, Kabupaten Lamongan sebagai pusat pengajaran Islam. Pada tahun 1483 Saka (1561 M)—sebagaimana terpahat dalam prasasti *candrasengkala* *"Gunaning Salira Tirtaning Hayu"*—beliau membangun Masjid Kuno Sendang Duwur yang memadukan estetika bangunan suci Jawa Kuno dengan fungsi peribadatan Islam.\n\nSunan Sendang Duwur wafat pada tahun 1507 Saka (1585 M, ditandai *candrasengkala* pada dinding cungkup makamnya) dan dimakamkan tepat di belakang dinding barat Masjid Sendang Duwur. Kompleks Masjid dan Makam Sunan Sendang Duwur merupakan salah satu situs arkeologi Islam paling memukau di Indonesia yang telah diteliti secara mendalam oleh arkeolog Hasan Muarif Ambary dan A.J. Bernet Kempers karena keberadaan *Gapura Paduraksa Bersayap* (*winged gate*) yang mengapit halaman makam.',
    karomah: [
      'Dalam tradisi lisan masyarakat Sendangduwur dan Paciran, karomah paling terkenal dari Raden Nur Rahmat berkaitan dengan pembangunan Masjid Sendang Duwur pada tahun 1561 M. Diriwayatkan bahwa masjid tersebut semula adalah bangunan masjid kuno milik Mbok Rondo Mantingan di Jepara yang atas izin pemiliknya dan pertolongan Allah SWT dipindahkan oleh Raden Nur Rahmat ke puncak Bukit Amitunon di Lamongan hanya dalam waktu satu malam tanpa merusak selembar pun kayunya.<!--more-->\n\nRiwayat tutur masyarakat setempat juga mengisahkan bagaimana Raden Nur Rahmat mampu memancarkan sumber mata air (*sendang*) di puncak bukit batu kapur yang tinggi (*duwur*) sehingga desa tersebut dinamai *Sendangduwur*, yang airnya hingga kini tetap mengalir menghidupi warga sekitar.',
    ],
    untoldStory:
      'Keunikan arsitektur Kompleks Makam Sunan Sendang Duwur terletak pada dua gapura *Paduraksa* dari batu karang putih yang memiliki pahatan sepasang sayap burung Garuda/Merak raksasa yang sedang membentang, pohon *Kalpataru*, serta kepala *Kala* yang telah distilir menjadi sulur dedaunan. Dalam filsafat tasawuf Jawa abad ke-16, gapura bersayap ini melambangkan *Buraq* atau perjalanan mikraj ruhani seorang mukmin yang terbang meninggalkan keterikatan nafsu duniawi menuju hadirat Ilahi di puncak bukit.<!--more-->\n\nDi sekitar Desa Sendangduwur pula tumbuh tradisi kerajinan batik tulis khas Lamongan (*Batik Sendangduwur*) dan pandai emas tradisional yang motif-motifnya banyak terinspirasi langsung dari ragam hias sulur teratai, naga, dan sayap burung pada cungkup kayu jati makam Sunan Sendang Duwur.',
    barokahHajat:
      'Peziarah dan seniman/arsitek yang berziarah ke maqbarah Sunan Sendang Duwur di Bukit Amitunon Paciran umumnya bertawassul memohon kepada Allah SWT keluhuran budi dan keindahan karya yang bernilai ibadah, kemudahan rezeki usaha kerajinan dan perniagaan, serta ketenteraman batin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Sendang Duwur (Raden Nur Rahmat)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ رَادِينْ نُورْ رَحْمَةْ (سُونَانْ سِينْدَانْغ دُووُرْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ رَادِينْ نُورْ رَحْمَةْ (سُونَانْ سِينْدَانْغ دُووُرْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Raden Nuur Rahmat (Sunan Sendang Duwur) syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warfa' darajatahuu wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Raden Nur Rahmat (Sunan Sendang Duwur), Al-Fatihah. Ya Allah, ampunilah beliau, angkatlah derajatnya, dan limpahkanlah kemanfaatan melalui ilmu serta keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Raden Nur Rahmat (Sunan Sendang Duwur), Al-Fatihah. Ya Allah, ampunilah beliau, angkatlah derajatnya, dan limpahkanlah kemanfaatan melalui ilmu serta keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15 Sya’ban / Nisfu Sya’ban (Puncak Haul Akbar Tahunan Sunan Sendang Duwur di Bukit Amitunon, Desa Sendangduwur, Kecamatan Paciran, Kabupaten Lamongan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat menaiki teras cagar budaya menuju Masjid dan Gapura Bersayap, serta dilarang keras memanjat atau menggores ukiran batu karang dan kayu jati kuno abad ke-16.',
    facilities: ['Masjid Kuno Sendang Duwur (1561 M)', 'Gapura Paduraksa Bersayap & Cungkup Ukir Cagar Budaya Nasional', 'Sentra Batik Tulis Sendangduwur', 'Area Parkir Peziarah Desa Sendangduwur'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Uka Tjandrasasmita (1975). Islamic Antiquities of Sendang Duwur. Jakarta: Pusat Penelitian Purbakala dan Peninggalan Nasional.',
      'Ambary, Hasan Muarif (1998). Menemukan Peradaban: Jejak Arkeologis dan Historis Islam Indonesia. Jakarta: Logos Wacana Ilmu.',
      'Bernet Kempers, A.J. (1959). Ancient Indonesian Art. Amsterdam: C.P.J. van der Peet.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // =========================================================================
  // 2. SURABAYA, SIDOARJO, GRESIK, PASURUAN, PROBOLINGGO & TAPAL KUDA
  // =========================================================================
  {
    id: 'sunan-bungkul-surabaya',
    name: 'Makam Sunan Bungkul (Ki Ageng Supo / Mbah Bungkul, Surabaya)',
    title: 'Wali Sesepuh Surabaya & Mertua Sunan Ampel / Raden Paku',
    description:
      'Kompleks makam cagar budaya Ki Ageng Supo (Mbah Bungkul) di belakang Taman Bungkul, Jl. Raya Darmo, Wonokromo, Surabaya—ulama bangsawan akhir Majapahit yang menjadi pelopor Islam di selatan Surabaya.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-15 M (Masa Akhir Kemaharajaan Majapahit)',
    province: 'Jawa Timur',
    city: 'Surabaya',
    district: 'Kec. Wonokromo',
    address: 'Kompleks Taman Bungkul, Jl. Raya Darmo, Kel. Darmo, Kec. Wonokromo, Kota Surabaya',
    location: {
      lat: -7.2913,
      lng: 112.7397,
      address: 'Kompleks Taman Bungkul, Jl. Raya Darmo, Kel. Darmo, Kec. Wonokromo, Kota Surabaya',
      district: 'Kec. Wonokromo',
      city: 'Surabaya',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Surabaya (Kompleks Makam Sunan Bungkul Darmo Surabaya)',
    sanad:
      'Bangsawan Majapahit bergelar Ki Ageng Mbako / Empu Supo Mandrangi yang memeluk Islam melalui jaringan Sunan Ampel; ayahanda dari Dewi Wardah (istri Sunan Giri / Sunan Ampel dalam tradisi babad).',
    karya: [
      'Perintisan pemukiman santri dan pusat dakwah Islam di tepi Sungai Kalimas bagian selatan (kawasan Bungkul Surabaya)',
      'Situs Gapura Paduraksa Bata Merah dan Sumur Kuno Bungkul dari abad ke-15 M',
    ],
    history:
      'Sunan Bungkul—yang dikenal masyarakat Surabaya sebagai *Mbah Bungkul* atau Ki Ageng Supo (Ki Ageng Mbako)—merupakan salah satu tokoh penyebar Islam generasi awal di wilayah Surabaya pada pertengahan abad ke-15 Masehi, sezaman dengan dakwah Sunan Ampel di Ampel Denta. Dalam naskah *Babad Tanah Jawi* dan *Babad Gresik*, beliau semula adalah seorang bangsawan dan pejabat tinggi dari Kemaharajaan Majapahit yang menguasai kadipaten atau tanah perdikan di sekitar aliran Sungai Kalimas (kini kawasan Darmo, Wonokromo, Surabaya), sebelum akhirnya memeluk agama Islam dan menjadi ulama yang zuhud.\n\nHubungan kekerabatan dan keilmuan antara Sunan Bungkul dengan jaringan Wali Songo terjalin sangat erat melalui pernikahan putrinya yang bernama Dewi Wardah. Dalam riwayat tutur Surabaya dan Gresik, dikisahkan bahwa Sunan Bungkul mengadakan sayembara keulamaan bagi siapa saja yang mampu memetik buah delima di kebun pesantrennya dengan adab dan karomah; Raden Paku (Sunan Giri), murid kesayangan Sunan Ampel, berhasil memenuhi syarat tersebut sehingga dinikahkan dengan Dewi Wardah (Nyai Gede Kukusan) dan menjadi menantu Sunan Bungkul.\n\nSejak abad ke-15 hingga masa kolonial Hindia Belanda, kompleks pemakaman Sunan Bungkul tetap dipertahankan oleh masyarakat Surabaya di tengah pesatnya pembangunan kawasan elit *Darmo Boulevard*. Hingga kini, Kompleks Makam Sunan Bungkul yang dinaungi gapura *Paduraksa* bata merah kuno dan berdampingan dengan Taman Bungkul di jantung Kota Surabaya tidak pernah sepi dari ribuan peziarah setiap malam Jumat.',
    karomah: [
      'Dalam tradisi lisan masyarakat Surabaya dan *Babad Gresik*, salah satu karomah terkenal Sunan Bungkul adalah peristiwa pohon delima di kebun pesantrennya di tepi Sungai Kalimas; setiap orang yang berniat buruk atau sombong saat memanjat pohon delima tersebut selalu terjatuh sakit, namun ketika santri Sunan Ampel (Raden Paku / Sunan Giri) melintas di bawahnya, buah delima itu jatuh sendiri ke tangannya dan dihanyutkan lewat aliran sungai hingga sampai di hadapan Sunan Bungkul.<!--more-->\n\nKesaksian masyarakat Surabaya lintas generasi juga menuturkan kewibawaan maqbarah Mbah Bungkul saat masa pertempuran heroik 10 November 1945 di Jalan Raya Darmo, di mana kompleks cungkup dan gapura bata merah makam beliau tetap utuh di tengah hujan mortir dan pemboman tentara Sekutu.',
    ],
    untoldStory:
      'Ketika pemerintah kolonial Belanda melalui arsitek Henri Maclaine Pont dan perusahaan *Oost-Java Stoomtram Maatschappij* membangun kawasan hunian Eropa *Darmo* pada dekade 1910–1920-an, mereka tidak berani menggusur makam Sunan Bungkul dan justru menjadikan lahan di depannya sebagai alun-alun terbuka (*Bungkul Park*). Hal ini menjadikan Makam Sunan Bungkul sebagai jangkar sejarah pribumi-Islam di tengah kawasan modern Surabaya.<!--more-->\n\nDi dalam kompleks maqbarah Sunan Bungkul masih terdapat bangunan pendopo berarsitektur *Joglo* Jawa Timur, gapura *Paduraksa* berbahan bata merah tanpa semen khas era Majapahit akhir, serta sebuah sumur tua yang airnya sejak ratusan tahun silam digunakan para peziarah untuk berwudhu dan bertabarruk.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Bungkul di Darmo Surabaya umumnya bertawassul memohon kepada Allah SWT kemudahan mendapatkan jodoh yang shalih/shalihah sebagaimana kisah pernikahan Dewi Wardah dan Sunan Giri, keberkahan usaha di perantauan kota, serta ketenteraman batin.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Bungkul (Ki Ageng Supo Surabaya)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ سُوفُو الْمَعْرُوفِ بِسُونَانْ بُونْغكُولْ سُورَابَايَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ كِي أَغِينْغ سُوفُو الْمَعْرُوفِ بِسُونَانْ بُونْغكُولْ سُورَابَايَا شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Kii Ageng Supo al-ma'ruufi bi Sunan Bungkul Suraabaayaa syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi barakaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Supo (Sunan Bungkul Surabaya), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Ki Ageng Supo (Sunan Bungkul Surabaya), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Dzulqa’dah / Juni (Puncak Haul Akbar Tahunan Sunan Bungkul / Mbah Bungkul di Kompleks Taman Bungkul, Jl. Raya Darmo, Wonokromo, Kota Surabaya).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (meskipun berada di belakang taman kota), melepas alas kaki saat memasuki pendopo makam dan gapura Paduraksa, serta menjaga ketenangan ibadah.',
    facilities: ['Pendopo & Gapura Paduraksa Makam Sunan Bungkul', 'Mushalla & Tempat Wudhu Sumur Kuno', 'Kawasan Taman Bungkul Surabaya', 'Sentra Kuliner Rawon & Pecel Taman Bungkul'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Handinoto (1996). Perkembangan Kota dan Arsitektur Kolonial di Surabaya 1870–1940. Yogyakarta: Andi Offset.',
      'Wisnu, Sastra (1913). Babad Gresik.',
      'Pemerintah Kota Surabaya — Daftar Bangunan Cagar Budaya Kompleks Makam Sunan Bungkul.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-abu-bakar-gresik',
    legacyId: 'habib-8',
    name: 'Makam Al-Qutb Al-Habib Abu Bakar bin Muhammad Assegaf (Gresik)',
    title: 'Wali Quthub Al-Ghaus & Mahkota Para Auliya Ba’alawi Abad ke-20',
    description:
      'Maqbarah wali quthub agung Al-Habib Abu Bakar bin Muhammad bin Umar Assegaf (1285–1376 H / 1869–1957 M) di samping Masjid Jami’ Alun-Alun Gresik, yang haul akbarnya dihadiri ratusan ribu jamaah lintas negara.',
    category: 'Habaib',
    era: 'Abad ke-19 – Pertengahan Abad ke-20 M (1869–1957 M / 1285–1376 H)',
    province: 'Jawa Timur',
    city: 'Gresik',
    district: 'Kec. Gresik',
    address: 'Kompleks Masjid Jami’ Gresik, Jl. KH. Wachid Hasyim, Kel. Pekauman, Kec. Gresik, Kabupaten Gresik',
    location: {
      lat: -7.1568,
      lng: 112.6552,
      address: 'Kompleks Masjid Jami’ Gresik, Jl. KH. Wachid Hasyim, Kel. Pekauman, Kec. Gresik, Kabupaten Gresik',
      district: 'Kec. Gresik',
      city: 'Gresik',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Kota Gresik (Kompleks Masjid Jami’ & Maqbarah Habib Abu Bakar Assegaf Gresik)',
    sanad:
      'Murid utama Al-Habib Ali bin Muhammad Al-Habsyi (Pengarang Simthud Durar, Seiwun Hadramaut), Al-Habib Muhammad bin Idrus Al-Habsyi, Al-Habib Muhammad bin Ahmad Al-Muhdhar, dan Al-Habib Ahmad bin Hasan Al-Attas.',
    karya: [
      'Riyadhah Khalwat 15 Tahun dan Majelis Pembacaan Kitab Ihya Ulumuddin & Maulid Simthud Durar di Jalan KH. Zubair Gresik',
      'Kaderisasi ruhani para habaib dan kiai besar Jawa Timur pada paruh pertama abad ke-20',
    ],
    history:
      'Al-Qutb Al-Habib Abu Bakar bin Muhammad bin Umar Assegaf (16 Dzulhijjah 1285 H – 17 Dzulhijjah 1376 H / 1869–1957 M) lahir di Besuki, Jawa Timur dari pasangan Habib Muhammad bin Umar Assegaf (ulama kelahiran Seiwun Hadramaut) dan Syarifah Fatimah binti Abdullah Al-Haddad. Setelah ayahandanya wafat saat beliau masih kanak-kanak di Gresik, pada tahun 1293 H (usia 8 tahun) beliau diberangkatkan oleh neneknya ke kota Seiwun dan Tarim di Hadramaut, Yaman. Di lembah para wali tersebut, beliau ditempa langsung oleh pamannya Habib Syekh bin Umar Assegaf serta wali quthub agung pengarang *Maulid Simthud Durar*, Al-Habib Ali bin Muhammad Al-Habsyi, yang sejak awal telah melihat tanda-tanda kebesaran ruhani pada diri Habib Abu Bakar muda.\n\nSekembalinya ke Pulau Jawa pada tahun 1302 H (1885 M), Habib Abu Bakar bermukim di Gresik dan berguru pula kepada Habib Abdullah bin Muhsin Al-Attas (Bogor), Habib Ahmad bin Abdullah Al-Attas (Pekalongan), serta Habib Muhammad bin Idrus Al-Habsyi (Surabaya). Pada usia sekitar 20 tahun, saat sedang khusyuk berzikir di hari Jumat, beliau menerima isyarat ruhani yang membawanya menjalani *uzlah* dan *khalwat* (mengasingkan diri untuk beribadah penuh kepada Allah SWT) di dalam kamar rumahnya di Gresik selama 15 tahun berturut-turut tanpa keluar rumah kecuali untuk hal darurat syar’i.\n\nSetelah masa khalwat 15 tahun selesai atas perintah gurunya Habib Muhammad bin Idrus Al-Habsyi, Habib Abu Bakar membuka pintu rumahnya di Jalan KH. Zubair Gresik seluas-luasnya bagi umat. Majelis taklim dan pengkhataman kitab *Ihya Ulumuddin* di kediaman beliau menjadi pusat rujukan para ulama, habaib, dan masyarakat dari seluruh Nusantara. Sebelum wafat, beliau berpuasa tidak makan dan minum selama 15 hari dalam keadaan tetap bugar beribadah hingga mengembuskan napas terakhir pada malam Senin, 17 Dzulhijjah 1376 H (15 Juli 1957 M) dalam usia 91 tahun, dan dimakamkan di serambi barat Masjid Jami’ Alun-Alun Gresik.',
    karomah: [
      'Dalam kitab manaqib dan kesaksian para ulama sezamannya (termasuk Habib Abdul Qadir bin Ahmad Assegaf Jeddah dan KH. Abdul Hamid Pasuruan), Habib Abu Bakar Assegaf Gresik diakui mencapai derajat *Quthbul Ghaus* pada zamannya. Diriwayatkan bahwa selama puluhan tahun membuka majelis di Gresik, beliau sering menyingkap isi hati (*kasyaf*) tamu yang datang sebelum tamu tersebut berbicara, menolong orang-orang yang mengalami kesulitan di tengah lautan, serta mengalami perjumpaan ruhani (*yaqzhah*) dengan Rasulullah SAW.<!--more-->\n\nGuru beliau di Hadramaut, Al-Imam Al-Habib Ali bin Muhammad Al-Habsyi (Muallif Simthud Durar), pernah berkata kepada para muridnya di Seiwun: *"Kelak Abu Bakar bin Muhammad Assegaf ini akan menjadi magnetnya segala hati di Tanah Jawa."* Ucapan tersebut terbukti nyata hingga hari ini, di mana Haul Akbar beliau setiap tanggal 16–17 Dzulhijjah mengubah seluruh Kota Gresik menjadi lautan manusia putih yang hadir dari seluruh Indonesia, Malaysia, Singapura, hingga Yaman.',
    ],
    untoldStory:
      'Kediaman asli Al-Habib Abu Bakar bin Muhammad Assegaf di Jalan KH. Zubair No. 93 (Kampung Arab, sekitar 300 meter dari Masjid Jami’ Gresik) hingga kini masih terawat persis seperti sediakala. Kamar khalwat berukuran kecil tempat beliau beribadah selama 15 tahun, ranjang kayu sederhana, serta jubah dan sorban beliau masih tersimpan rapi dan dibuka untuk diziarahi oleh ratusan ribu jamaah saat puncak acara *Rauhah* dan *Arak-arakan Maulid* dari rumah beliau menuju Masjid Jami’ Gresik.<!--more-->\n\nDi dalam kubah maqbarah di sebelah barat Masjid Jami’ Gresik, pusara Habib Abu Bakar bin Muhammad Assegaf berdampingan dengan makam sahabat dekat beliau, Al-Habib Alwi bin Muhammad Hasyim Assegaf (wafat 1369 H), seorang wali *majdzub* yang sangat dicintai masyarakat Gresik.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Al-Qutb Al-Habib Abu Bakar bin Muhammad Assegaf di Masjid Jami’ Gresik umumnya bertawassul memohon kepada Allah SWT kebersihan hati (*tazkiyatun nafs*), dikabulkannya hajat-hajat besar dunia dan akhirat melalui keberkahan dzurriyah Nabi SAW, serta keistiqamahan dalam ibadah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Al-Qutb Al-Habib Abu Bakar bin Muhammad Assegaf Gresik',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْغَوْثِ الْحَبِيبِ أَبِي بَكْرِ بْنِ مُحَمَّدٍ السَّقَّافِ الْغَرِيسِكِيِّ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَمِدَّنَا بِأَمْدَادِهِ وَانْفَعْنَا بِأَسْرَارِهِ وَأَنْوَارِهِ وَعُلُومِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْغَوْثِ الْحَبِيبِ أَبِي بَكْرِ بْنِ مُحَمَّدٍ السَّقَّافِ الْغَرِيسِكِيِّ وَأُصُولِهِ وَفُرُوعِهِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَمِدَّنَا بِأَمْدَادِهِ وَانْفَعْنَا بِأَسْرَارِهِ وَأَنْوَارِهِ وَعُلُومِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbil-Ghauts al-Habiib Abii Bakr bin Muhammad as-Saqqaaf al-Ghariisikii wa ushuulihii wa furuu'ihii syai-un lillaahi lahumul-Faatihah. Allaahumma amiddanaa bi amdaadihii wanfa'naa bi asraarihii wa anwaarihii wa 'uluumihii fid-diini wad-dunyaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Quthbul Ghauts Al-Habib Abu Bakar bin Muhammad Assegaf Gresik beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, limpahkanlah kepada kami pancaran keberkahannya serta kemanfaatan melalui rahasia hikmah, cahaya, dan ilmunya di dalam agama, dunia, dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Quthbul Ghauts Al-Habib Abu Bakar bin Muhammad Assegaf Gresik beserta leluhur dan keturunannya, Al-Fatihah. Ya Allah, limpahkanlah kepada kami pancaran keberkahannya serta kemanfaatan melalui rahasia hikmah, cahaya, dan ilmunya di dalam agama, dunia, dan akhirat.',
      },
    ],
    haulSchedule:
      '16–17 Dzulhijjah (Puncak Rauhah, Hadrah Maulid di Jl. KH. Zubair, dan Haul Akbar di Masjid Jami’ Alun-Alun Gresik yang dihadiri ratusan ribu jamaah internasional).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (dianjurkan berpakaian putih bersih sebagaimana adab majelis Ba’alawi), menjaga ketenangan jamaah yang sedang shalat di Masjid Jami’ Gresik, serta mengikuti pengaturan jalur peziarah laki-laki dan perempuan.',
    facilities: ['Masjid Jami’ Alun-Alun Gresik (Cagar Budaya)', 'Kubah Maqbarah Habib Abu Bakar Assegaf', 'Rumah Khalwat Bersejarah di Jl. KH. Zubair No. 93', 'Dekat Makam Syekh Maulana Malik Ibrahim (250 meter)'],
    openingHours: 'Buka 24 Jam (Kubah dibuka mengikuti jadwal pengurus Masjid Jami’ Gresik)',
    references: [
      'Assegaf, Al-Habib Abu Bakar bin Ali (1985). Manaqib Al-Qutb Al-Ghauts Al-Habib Abu Bakar bin Muhammad Assegaf. Gresik.',
      'Al-Masyhur, Abdurrahman bin Muhammad (1984). Syamsuzh Zhahirah fi Nasabi Ahlil Bait min Bani Alawi.',
      'Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat. Bandung: Mizan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mbah-ud-sidoarjo',
    name: 'Makam KH. Ali Mas’ud (Mbah Ud Pagerwojo, Sidoarjo)',
    title: 'Wali Majdzub Penjaga Doa Umat di Pagerwojo Sidoarjo',
    description:
      'Maqbarah waliyullah karismatik KH. Ali Mas’ud (Mbah Ud, wafat 1979 M) di Desa Pagerwojo, Kecamatan Buduran, Kabupaten Sidoarjo—cucu KH. Said dan rujukan doa masyarakat Jawa Timur.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1903–1979 M)',
    province: 'Jawa Timur',
    city: 'Sidoarjo',
    district: 'Kec. Buduran',
    address: 'Jl. KH. Ali Mas’ud, Desa Pagerwojo, Kec. Buduran, Kabupaten Sidoarjo',
    location: {
      lat: -7.4348,
      lng: 112.7072,
      address: 'Jl. KH. Ali Mas’ud, Desa Pagerwojo, Kec. Buduran, Kabupaten Sidoarjo',
      district: 'Kec. Buduran',
      city: 'Sidoarjo',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Ulama Sidoarjo (Kompleks Makam KH. Ali Mas’ud Pagerwojo Buduran)',
    sanad:
      'Putra dari KH. Said dan Nyai Hj. Fatimah Pagerwojo; adik dari KH. Chozin Buduran; keturunan ulama penyebar Islam Sidoarjo yang bersambung hingga jaringan Pesantren Sono Buduran dan Panji.',
    karya: [
      'Bimbingan ruhani, majelis doa, dan keteladanan zuhud bagi masyarakat Jawa Timur di Pagerwojo Sidoarjo',
      'Tradisi istighatsah dan tahlil masif di Maqbarah Pagerwojo Sidoarjo',
    ],
    history:
      'KH. Ali Mas’ud—yang sangat akrab disapa oleh masyarakat Jawa Timur dengan panggilan *Mbah Ud Pagerwojo* (1903–1979 M)—adalah salah satu waliyullah berhaluan *majdzub* dan ulama kharismatik dari Kabupaten Sidoarjo pada abad ke-20. Beliau lahir di Desa Pagerwojo, Kecamatan Buduran, Kabupaten Sidoarjo dari pasangan ulama sepuh KH. Said dan Nyai Hj. Fatimah. Keluarga besar beliau di Buduran dan Sono (Sidoarjo) merupakan lingkungan pesantren tua yang sejak abad ke-19 dikenal mencetak banyak ulama besar di Jawa Timur.\n\nSejak masa mudanya, Mbah Ud ditempa dalam pengajaran Al-Qur’an dan ilmu agama oleh ayahandanya serta kakaknya, KH. Chozin, di Pagerwojo. Berbeda dengan kakaknya yang membina santri melalui madrasah dan pengajaran kitab secara reguler, perjalanan ruhani Mbah Ud mengalami *jadzab* (ketertarikan batin yang sangat kuat kepada Allah SWT) sehingga perilaku sehari-hari beliau tampak sangat bersahaja, tidak memedulikan kemewahan pakaian maupun harta duniawi, namun memiliki ketajaman mata batin (*bashirah*) dan kemustajaban doa yang luar biasa.\n\nSemasa hidupnya, kediaman sederhana Mbah Ud di Desa Pagerwojo maupun langkah kaki beliau saat berkeliling pasar dan kampung-kampung di Sidoarjo serta Surabaya selalu dinantikan oleh masyarakat dari berbagai lapisan—mulai dari petani, pedagang kecil, santri, hingga para pejabat dan kiai sepuh seperti KH. Abdul Hamid Pasuruan yang sangat menghormati maqam kewalian beliau. KH. Ali Mas’ud wafat pada hari Selasa, tanggal 17 Juli 1979 M (22 Sya’ban 1399 H) dan dimakamkan di Kompleks Pemakaman Keluarga Masjid Al-Abrar Desa Pagerwojo, Kecamatan Buduran, Kabupaten Sidoarjo.',
    karomah: [
      'Dalam tradisi lisan masyarakat Sidoarjo dan kesaksian para kiai Jawa Timur, Mbah Ud dikenal tidak pernah mau menyimpan uang pemberian tamu untuk dirinya sendiri. Setiap kali ada peziarah atau pengusaha yang menyelipkan amplop uang kepada beliau, Mbah Ud langsung membagikannya saat itu juga kepada fakir miskin, tukang becak, atau anak-anak yatim yang beliau temui di jalan sambil mendoakan keselamatan pemberinya.<!--more-->\n\nBanyak riwayat tutur warga Sidoarjo yang mengisahkan isyarat-isyarat unik (*perlambang*) dari tindakan Mbah Ud: apabila beliau tiba-tiba singgah ke warung atau toko seseorang dan meminta segelas air putih atau menyapu halaman toko tersebut, tak lama kemudian usaha warga itu berkembang pesat dan terhindar dari kebangkrutan atas izin Allah SWT.',
    ],
    untoldStory:
      'Kecamatan Buduran di Kabupaten Sidoarjo merupakan salah satu poros sejarah pesantren paling tua di Jawa Timur. Hanya berjarak beberapa kilometer dari makam Mbah Ud di Pagerwojo, terdapat bekas situs Pondok Pesantren Sono (Buduran) yang pada abad ke-19 menjadi tempat nyantri Syaichona Muhammad Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, dan KH. Abdul Wahab Chasbullah, serta Pondok Pesantren Al-Khoziny Buduran.<!--more-->\n\nHingga hari ini, Makam Mbah Ud di Desa Pagerwojo menjadi titik ziarah utama di Kabupaten Sidoarjo yang buka 24 jam penuh; pada setiap malam Jumat Legi, ribuan peziarah memadati sepanjang Jalan KH. Ali Mas’ud untuk melantunkan Surah Yasin, Tahlil, dan Shalawat Nabi.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah KH. Ali Mas’ud (Mbah Ud) di Pagerwojo Sidoarjo umumnya bertawassul memohon kepada Allah SWT kelancaran usaha dan perniagaan, kesembuhan penyakit dan ketenangan batin dari himpitan masalah hidup, serta sifat dermawan yang ikhlas.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Ali Mas’ud (Mbah Ud Pagerwojo Sidoarjo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْمَجْذُوبِ الشَّيْخِ كِيَاهِي الحَاجِّ عَلِيّ مَسْعُودْ (مَبَاهْ أُودْ فَاغِيرْوُوجُو سِيدُوأَرْجُو) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْمَجْذُوبِ الشَّيْخِ كِيَاهِي الحَاجِّ عَلِيّ مَسْعُودْ (مَبَاهْ أُودْ فَاغِيرْوُوجُو سِيدُوأَرْجُو) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Majdzuub asy-Syaikh Kiyaahii al-Haajj 'Alii Mas'uud (Mbah Ud Pagerwojo Sidoarjo) syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi barakaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah KH. Ali Mas’ud (Mbah Ud Pagerwojo Sidoarjo), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah KH. Ali Mas’ud (Mbah Ud Pagerwojo Sidoarjo), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '22 Sya’ban (Puncak Haul Akbar Tahunan KH. Ali Mas’ud / Mbah Ud di Kompleks Maqbarah Desa Pagerwojo, Kecamatan Buduran, Kabupaten Sidoarjo).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga ketertiban antrean di pendopo makam yang sering padat pada malam Jumat, serta tidak mengemis atau mengganggu kekhusyukan peziarah lain.',
    facilities: ['Cungkup & Pendopo Maqbarah KH. Ali Mas’ud', 'Masjid Jami’ Pagerwojo', 'Sentra UMKM & Oleh-Oleh Khas Sidoarjo', 'Area Parkir Bus Wisata Religi Pagerwojo'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zuhri, Achmad Muhibbin (2012). Jejak Wali Nusantara: Biografi dan Karomah KH. Ali Mas’ud Pagerwojo Sidoarjo.',
      'Pemerintah Kabupaten Sidoarjo — Profil Wisata Religi Makam Mbah Ud Pagerwojo Buduran.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-abdul-hamid-pasuruan',
    legacyId: 'ulama-19',
    name: 'Makam KH. Abdul Hamid bin Abdullah Umar (Mbah Hamid Pasuruan)',
    title: 'Wali Agung Penyejuk Umat & Pengasuh Pondok Pesantren Salafiyah Pasuruan',
    description:
      'Maqbarah waliyullah besar abad ke-20 KH. Abdul Hamid (1914–1982 M) di belakang Masjid Agung Al-Anwar, Kebonsari, Kota Pasuruan—ulama sufi yang dikenal dengan kelembutan akhlak dan kesabaran tiada batas.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1914–1982 M / 1333–1403 H)',
    province: 'Jawa Timur',
    city: 'Pasuruan',
    district: 'Kec. Panggungrejo',
    address: 'Kompleks Pemakaman Masjid Agung Al-Anwar, Jl. KH. Wachid Hasyim, Kel. Kebonsari, Kec. Panggungrejo, Kota Pasuruan',
    location: {
      lat: -7.6416,
      lng: 112.9065,
      address: 'Kompleks Pemakaman Masjid Agung Al-Anwar, Jl. KH. Wachid Hasyim, Kel. Kebonsari, Kec. Panggungrejo, Kota Pasuruan',
      district: 'Kec. Panggungrejo',
      city: 'Pasuruan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Masjid Agung Al-Anwar & Maqbarah KH. Abdul Hamid Kota Pasuruan',
    sanad:
      'Putra KH. Abdullah bin Umar Basyaiban (Lasem) dan cucu KH. Muhammad Shiddiq (Jember); murid dari KH. Ma’shum Ahmad Lasem, KH. Baidhowi Lasem, dan KH. Dimyathi At-Tarmasi (Pondok Tremas Pacitan); menerima isyarat kewalian dari Al-Habib Ja’far bin Syaikhan Assegaf Pasuruan.',
    karya: [
      'Pengembangan Pondok Pesantren Salafiyah Kebonsari Kota Pasuruan sebagai pusat pengajaran kitab kuning dan akhlak tasawuf',
      'Pengamalan wirid Hizib Nashr, Hizib Nawawi, dan Dalailul Khairat yang diijazahkan kepada ribuan santri dan kiai',
    ],
    history:
      'KH. Abdul Hamid bin Abdullah bin Umar (22 November 1914 – 25 Desember 1982 M / 4 Muharram 1333 H – 9 Rabiul Awal 1403 H) lahir di Desa Sumbergirang, Lasem, Kabupaten Rembang dengan nama masa kecil Abdul Mu’thi. Beliau berasal dari keluarga ulama besar keturunan Sayyid Abdurrahman Basyaiban (Mbah Sambu Lasem); ayahandanya adalah KH. Abdullah bin Umar dan ibundanya adalah Nyai Raihanah binti KH. Muhammad Shiddiq (ulama besar Jember). Sejak kecil, beliau belajar langsung kepada kakeknya KH. Muhammad Shiddiq di Talangsari Jember, lalu menimba ilmu di Pondok Pesantren Kasingan Rembang, Pesantren Lasem (KH. Ma’shum Ahmad), dan selama dua belas tahun mendalami kitab-kitab fikih serta tasawuf di Pondok Tremas Pacitan di bawah bimbingan KH. Dimyathi At-Tarmasi.\n\nSetelah menikahi Nyai Hj. Nafisah (putri KH. Ahmad Qusyairi bin Shiddiq) pada tahun 1940 M, KH. Abdul Hamid menetap di Kota Pasuruan dan melanjutkan kepemimpinan Pondok Pesantren Salafiyah di Jalan Jawa, Kebonsari, Pasuruan menggantikan mertuanya yang hijrah ke Makkah. Selama puluhan tahun mengasuh pesantren dalam kesederhanaan, kewalian KH. Abdul Hamid yang semula tersembunyi (*mastur*) mulai tersingkap secara luas setelah wafatnya wali besar Pasuruan, Al-Habib Ja’far bin Syaikhan Assegaf (1954 M), yang semasa hidupnya telah mengisyaratkan bahwa pengganti payung ruhani Kota Pasuruan adalah Kiai Abdul Hamid.\n\nNdalem KH. Abdul Hamid di Pesantren Salafiyah Pasuruan setiap hari dipadati ribuan tamu dari seluruh penjuru Nusantara—mulai dari orang awam yang memohon doa restu, pejabat negara, hingga para ulama besar seperti KH. As’ad Syamsul Arifin, KH. Ali Ma’shum, dan KH. Abdurrahman Wahid (Gus Dur). Beliau wafat pada hari Sabtu, 9 Rabiul Awal 1403 H (25 Desember 1982 M) dan dimakamkan di kompleks pemakaman belakang Masjid Agung Al-Anwar Alun-Alun Kota Pasuruan berdampingan dengan makam Habib Ja’far bin Syaikhan Assegaf dan KH. Ahmad Qusyairi.',
    karomah: [
      'Dalam biografi akademik yang ditulis oleh Prof. Dr. H. Abdurrahman Mas’ud maupun kitab manaqib susunan KH. Mustofa Bisri (Gus Mus), karomah paling agung dari KH. Abdul Hamid Pasuruan adalah kesabaran, kelembutan hati (*hilm*), dan kasih sayang beliau yang tak pernah marah meskipun diuji dengan sikap kasar orang lain. Dikisahkan terdapat seorang pemuda yang gemar berjudi datang meminta doa nomor undian kepada Mbah Hamid; bukannya menghardik, Mbah Hamid justru menepuk bahunya dengan penuh kasih dan mendoakannya hingga hati pemuda itu luluh, menangis bertobat, dan menjadi ahli ibadah yang taat.<!--more-->\n\nPara santri dan ulama juga banyak menyaksikan karomah *kasyaf* (tersingkapnya hijab batin) pada diri Mbah Hamid Pasuruan, di mana beliau sering memanggil nama tamu yang baru pertama kali datang dari luar pulau dan langsung memberikan jawaban atas masalah yang belum sempat diucapkan oleh tamu tersebut.',
    ],
    untoldStory:
      'Sastrawan dan ulama besar KH. A. Mustofa Bisri (Gus Mus) Rembang—yang merupakan keponakan KH. Abdul Hamid—menulis sebuah buku biografi berjudul *Kiai Hamid Pasuruan: Percik-Percik Keteladanan* yang mengungkap betapa disiplinnya Mbah Hamid dalam menjaga *istiqamah* ibadah harian. Meskipun menerima ribuan tamu setiap hari dari pagi hingga larut malam, Mbah Hamid tidak pernah sekalipun meninggalkan shalat fardhu berjamaah di awal waktu, pembacaan wirid *Dalailul Khairat*, serta mengajar santri.<!--more-->\n\nDi Kompleks Maqbarah belakang Masjid Agung Al-Anwar Kota Pasuruan, selain pusara KH. Abdul Hamid, peziarah juga dapat langsung bertawassul di pusara Al-Habib Ja’far bin Syaikhan Assegaf (ulama besar ahli Al-Qur’an yang bacaan huruf *Dhad*-nya dipuji para ulama Haramain) dan KH. Ahmad Qusyairi (pengarang kitab nazham *Tanwirul Hija*) yang berada dalam satu kawasan.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah KH. Abdul Hamid (Mbah Hamid) di Kota Pasuruan umumnya bertawassul memohon kepada Allah SWT kelembutan hati dan kesabaran dalam membina rumah tangga, kemudahan menyelesaikan masalah hidup yang pelik, serta keberkahan ilmu dan usaha.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Abdul Hamid bin Abdullah Umar (Pasuruan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْكَرِيمِ وَالْعَالِمِ الْحَلِيمِ الشَّيْخِ كِيَاهِي الحَاجِّ عَبْدِ الْحَمِيدِ بْنِ عَبْدِ اللهِ عُمَرَ الْفَاسُورُوَانِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا حِلْمًا وَعِلْمًا وَاسْتِقَامَةً وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْكَرِيمِ وَالْعَالِمِ الْحَلِيمِ الشَّيْخِ كِيَاهِي الحَاجِّ عَبْدِ الْحَمِيدِ بْنِ عَبْدِ اللهِ عُمَرَ الْفَاسُورُوَانِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا حِلْمًا وَعِلْمًا وَاسْتِقَامَةً وَانْفَعْنَا بِبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Kariim wal-'Aalimil-Haliim asy-Syaikh Kiyaahii al-Haajj 'Abdil-Hamiid bin 'Abdillaah 'Umar al-Faasuuruwaanii syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa hilman wa 'ilman wastiqaamatan wanfa'naa bi barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang mulia dan ulama yang penuh kelembutan KH. Abdul Hamid bin Abdullah Umar Pasuruan, Al-Fatihah. Ya Allah, karuniakanlah kepada kami sifat santun, ilmu, dan keistiqamahan, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang mulia dan ulama yang penuh kelembutan KH. Abdul Hamid bin Abdullah Umar Pasuruan, Al-Fatihah. Ya Allah, karuniakanlah kepada kami sifat santun, ilmu, dan keistiqamahan, serta limpahkanlah kemanfaatan melalui keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '9 Rabiul Awal (Puncak Haul Akbar Tahunan KH. Abdul Hamid bin Abdullah Umar di Pondok Pesantren Salafiyah & Kompleks Masjid Agung Al-Anwar Alun-Alun Kota Pasuruan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti jalur antrean dari serambi Masjid Agung Al-Anwar menuju cungkup maqbarah di belakang masjid, serta menjaga ketenangan saat melantunkan tahlil.',
    facilities: ['Masjid Agung Al-Anwar Kota Pasuruan', 'Cungkup Maqbarah KH. Abdul Hamid & Habib Ja’far Assegaf', 'Pondok Pesantren Salafiyah Pasuruan (300 meter)', 'Terminal Parkir Bus Wisata Religi Kota Pasuruan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Bisri, KH. A. Mustofa (2001). Kiai Hamid Pasuruan: Percik-Percik Keteladanan. Rembang: Al-Ibriz.',
      'Hamid, H.M. (1999). K.H. Abdul Hamid Pasuruan: Percikan Pemikiran dan Karomahnya. Surabaya: Pustaka Hidayah.',
      'Mas’ud, Abdurrahman (2006). Dari Haramain ke Nusantara: Jejak Intelektual Arsitek Pesantren. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-asad-syamsul-arifin',
    legacyId: 'ulama-20',
    name: 'Makam KHR. As’ad Syamsul Arifin (Situbondo) & KH. Zaini Mun’im (Paiton Probolinggo)',
    title: 'Pahlawan Nasional Mediator Berdirinya NU & Poros Pesantren Tapal Kuda',
    description:
      'Maqbarah Pahlawan Nasional KHR. As’ad Syamsul Arifin (1897–1990 M) di PP Salafiyah Syafi’iyah Sukorejo, Banyuputih, Situbondo, beserta jejak sahabat seperjuangannya KH. Zaini Mun’im (pendiri PP Nurul Jadid Paiton, Probolinggo).',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1897–1990 M)',
    province: 'Jawa Timur',
    city: 'Situbondo',
    district: 'Kec. Banyuputih',
    address: 'Kompleks Pondok Pesantren Salafiyah Syafi’iyah Sukorejo, Desa Sumberejo, Kec. Banyuputih, Kabupaten Situbondo',
    location: {
      lat: -7.7685,
      lng: 114.2254,
      address: 'Kompleks Pondok Pesantren Salafiyah Syafi’iyah Sukorejo, Desa Sumberejo, Kec. Banyuputih, Kabupaten Situbondo',
      district: 'Kec. Banyuputih',
      city: 'Situbondo',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Tapal Kuda Jawa Timur (PP Salafiyah Syafi’iyah Sukorejo Situbondo & PP Nurul Jadid Paiton)',
    sanad:
      'Putra KHR. Syamsul Arifin (pendiri PP Sukorejo); murid kesayangan Syaichona Muhammad Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, serta para ulama Masjidil Haram Makkah.',
    karya: [
      'Penyampaian isyarat Tongkat Musa (QS. Thaha: 17–23) dan Tasbih Ya Jabbar Ya Qahhar dari Syaichona Kholil kepada KH. Hasyim Asy’ari sebagai restu pendirian Nahdlatul Ulama (1924–1926)',
      'Kepemimpinan Laskar Sabilillah/Pelopor di Karesidenan Besuki pada Revolusi Kemerdekaan 1945–1949',
      'Pengembangan PP Salafiyah Syafi’iyah Sukorejo Situbondo dan sinergi dakwah bersama KH. Zaini Mun’im (PP Nurul Jadid Paiton Probolinggo)',
    ],
    history:
      'Kiai Haji Raden (KHR.) As’ad Syamsul Arifin (1897–1990 M) lahir di perkampungan Syi’ib Ali dekat Masjidil Haram, Makkah Al-Mukarramah, saat kedua orang tuanya—KHR. Syamsul Arifin dan Nyai Hj. Siti Maimunah (keturunan bangsawan dan ulama Pamekasan Madura)—sedang bermukim menuntut ilmu di Tanah Suci. Sekembalinya ke Nusantara, beliau membantu ayahandanya membuka hutan belantara yang dikenal angker di Desa Sukorejo, Kecamatan Banyuputih, Kabupaten Situbondo pada tahun 1908–1914 M untuk mendirikan Pondok Pesantren Salafiyah Syafi’iyah Sukorejo. Beliau kemudian nyantri kepada Syaichona Muhammad Kholil di Bangkalan Madura dan Hadratussyaikh KH. Hasyim Asy’ari di Tebuireng Jombang.\n\nPeran historis KHR. As’ad Syamsul Arifin yang paling menentukan dalam sejarah Islam Indonesia terjadi pada tahun 1924–1925 M. Ketika Hadratussyaikh KH. Hasyim Asy’ari masih bimbang untuk membentuk organisasi ulama (*Jam’iyyah*), Syaichona Muhammad Kholil Bangkalan memanggil santri mudanya, Raden As’ad, untuk mengantarkan sebatang tongkat kayu disertai pesan ayat Al-Qur’an Surah Thaha ayat 17–23 ke Tebuireng, disusul pada utusan kedua berupa seuntai tasbih yang dikalungkan langsung oleh Syaichona Kholil ke leher As’ad muda dengan wirid *"Ya Jabbar Ya Qahhar"*. Isyarat ruhani yang dibawa KHR. As’ad inilah yang memantapkan hati KH. Hasyim Asy’ari mendirikan Nahdlatul Ulama pada 31 Januari 1926.\n\nPada masa Revolusi Kemerdekaan 1945, KHR. As’ad Syamsul Arifin memimpin barisan pejuang *Pelopor* dan *Sabilillah* di wilayah Tapal Kuda (Situbondo, Bondowoso, Jember, Banyuwangi) bersama para ulama sahabatnya, termasuk KH. Zaini Mun’im (1906–1976 M, ulama besar keturunan Pamekasan yang pada tahun 1949 mendirikan Pondok Pesantren Nurul Jadid di Karanganyar, Paiton, Kabupaten Probolinggo). KHR. As’ad Syamsul Arifin wafat pada tanggal 4 Agustus 1990 (12 Muharram 1411 H) dan dimakamkan di Kompleks Maqbarah Pondok Pesantren Salafiyah Syafi’iyah Sukorejo Situbondo, serta dianugerahi gelar Pahlawan Nasional Republik Indonesia pada tahun 2016.',
    karomah: [
      'Dalam catatan sejarah pesantren dan tradisi lisan santri Sukorejo, ketaatan (*sam’an wa tha’atan*) KHR. As’ad muda kepada gurunya Syaichona Kholil Bangkalan adalah cermin karomah adab santri Nusantara: selama perjalanan jalan kaki dan naik angkutan dari Bangkalan menuju Tebuireng Jombang membawa kalung tasbih dari Syaichona Kholil, KHR. As’ad berpuasa dan tidak berani menyentuh atau melepas tasbih di lehernya sedikit pun hingga dilepas langsung oleh tangan Hadratussyaikh KH. Hasyim Asy’ari sambil menangis haru.<!--more-->\n\nDalam perjuangan mempertahankan kemerdekaan di Karesidenan Besuki dan pertempuran Surabaya 1945, KHR. As’ad dikenal memiliki keberanian luar biasa dalam merangkul para pendekar dan mantan bromocorah di hutan-hutan Tapal Kuda hingga mereka bertobat, menjadi santri yang taat, dan berdiri di garis terdepan melawan pasukan kolonial Belanda.',
    ],
    untoldStory:
      'Pondok Pesantren Salafiyah Syafi’iyah Sukorejo di Situbondo merupakan tuan rumah Muktamar ke-27 Nahdlatul Ulama pada Desember 1984 yang sangat bersejarah, di mana di bawah keteduhan dan kewibawaan KHR. As’ad Syamsul Arifin serta KH. Achmad Siddiq, NU mengambil keputusan monumental *Kembali ke Khittah 1926* dan menerima Pancasila sebagai asas tunggal dalam kehidupan berbangsa dan bernegara.<!--more-->\n\nDi jalur pantura Probolinggo–Situbondo, para peziarah yang menuju maqbarah KHR. As’ad Syamsul Arifin (dan ayahandanya KHR. Syamsul Arifin serta putranya KHR. Achmad Fawaid As’ad) di Sukorejo Situbondo lazimnya juga singgah berziarah ke maqbarah sahabat seperjuangan beliau, KH. Zaini Mun’im di Kompleks Pondok Pesantren Nurul Jadid, Paiton, Kabupaten Probolinggo.',
    barokahHajat:
      'Peziarah dan para santri yang berziarah ke maqbarah KHR. As’ad Syamsul Arifin di Sukorejo Situbondo (serta KH. Zaini Mun’im di Paiton) umumnya bertawassul memohon kepada Allah SWT keberkahan adab dan ketaatan santri kepada guru, keteguhan khidmah perjuangan agama dan bangsa, serta kewibawaan kepemimpinan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KHR. As’ad Syamsul Arifin (Sukorejo) & KH. Zaini Mun’im (Paiton)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ شَمْسِ الْعَارِفِينَ وَابْنِهِ الْعَلَّامَةِ الْمُجَاهِدِ كِيَاهِي الحَاجِّ رَادِينْ أَسْعَدْ شَمْسِ الْعَارِفِينَ وَالشَّيْخِ زَيْنِي مُنْعِمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَجِهَادِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ شَمْسِ الْعَارِفِينَ وَابْنِهِ الْعَلَّامَةِ الْمُجَاهِدِ كِيَاهِي الحَاجِّ رَادِينْ أَسْعَدْ شَمْسِ الْعَارِفِينَ وَالشَّيْخِ زَيْنِي مُنْعِمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَجِهَادِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Syamsil-'Aarifiin wabnihil-'Allaamatil-Mujaahid Kiyaahii al-Haajj Raden As'ad Syamsil-'Aarifiin wasy-Syaikh Zainii Mun'im syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa jihaadihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KHR. Syamsul Arifin, putranya ulama pejuang KHR. As’ad Syamsul Arifin (Sukorejo Situbondo), serta KH. Zaini Mun’im (Paiton Probolinggo), Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, perjuangan, dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KHR. Syamsul Arifin, putranya ulama pejuang KHR. As’ad Syamsul Arifin (Sukorejo Situbondo), serta KH. Zaini Mun’im (Paiton Probolinggo), Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, perjuangan, dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Muharram (Puncak Haul Majemuk Masyayikh PP Salafiyah Syafi’iyah Sukorejo Situbondo) & 25 Syawal (Haul KH. Zaini Mun’im di PP Nurul Jadid Paiton Probolinggo).',
    localAdab:
      'Wajib mengenakan busana muslim santri yang sopan dan menutup aurat (sarung/celana panjang dan peci bagi pria, busana muslimah longgar bagi wanita), melapor pada pos keamanan santri PP Salafiyah Syafi’iyah Sukorejo, serta menjaga ketenangan kegiatan belajar puluhan ribu santri.',
    facilities: ['Kompleks Maqbarah Masyayikh PP Salafiyah Syafi’iyah Sukorejo', 'Masjid Jami’ Ibrahimy Sukorejo Situbondo', 'Museum KHR. As’ad Syamsul Arifin', 'Area Parkir Bus Peziarah Sukorejo'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib kunjungan pesantren)',
    references: [
      'Hasan, Syamsul A. (2003). Kharisma Kiai As’ad di Mata Umat. Yogyakarta: Pustaka Pesantren / LKiS.',
      'Sufyan, Fathorrahem (2016). KHR. As’ad Syamsul Arifin: Biografi Perjuangan Pahlawan Nasional dari Pesantren Sukorejo.',
      'Feillard, Andrée (1999). NU vis-à-vis Negara: Pencarian Isi, Bentuk dan Makna. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-muhammad-shiddiq-jember',
    name: 'Makam KH. Muhammad Shiddiq & KH. Achmad Siddiq (Condro / Talangsari, Jember)',
    title: 'Leluhur Dinasti Ulama Bani Shiddiq & Perumus Trilogi Ukhuwah (Islamiyah, Wathaniyah, Basyariyah)',
    description:
      'Kompleks Maqbarah KH. Muhammad Shiddiq (1854–1934 M) di Condro, Kaliwates, Kabupaten Jember—perintis pesantren di Jember dan ayahanda dari Menteri Agama KH. Mahfudz Shiddiq, KH. Abdul Halim Shiddiq, serta Rais Aam PBNU KH. Achmad Siddiq.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1854–1934 M & 1926–1991 M)',
    province: 'Jawa Timur',
    city: 'Jember',
    district: 'Kec. Kaliwates',
    address: 'Jl. Gajah Mada Gang Maqbarah Condro, Kel. Kaliwates, Kec. Kaliwates, Kabupaten Jember',
    location: {
      lat: -8.1762,
      lng: 113.6795,
      address: 'Jl. Gajah Mada Gang Maqbarah Condro, Kel. Kaliwates, Kec. Kaliwates, Kabupaten Jember',
      district: 'Kec. Kaliwates',
      city: 'Jember',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Jember (Maqbarah Bani Shiddiq Condro & PP Ash-Shiddiqi Putera Talangsari Jember)',
    sanad:
      'Putra KH. Abdullah bin Saleh Lasem (keturunan Mbah Sambu / Sayyid Abdurrahman Basyaiban); murid Syaichona Muhammad Kholil Bangkalan, KH. Sholeh Darat Semarang, serta Syaikh Nawawi Al-Bantani dan Syaikh Abu Bakar Syatha di Makkah.',
    karya: [
      'Pendirian Pondok Pesantren Ash-Shiddiqi (Talangsari Jember) yang menjadi induk jaringan ulama Bani Shiddiq di Nusantara',
      'Karya pemikiran KH. Achmad Siddiq: Khittah Nahdliyyah (1979) dan perumusan Trilogi Ukhuwah (Ukhuwah Islamiyah, Ukhuwah Wathaniyah, Ukhuwah Basyariyah)',
    ],
    history:
      'KH. Muhammad Shiddiq (1854–1934 M) lahir di Lasem, Rembang dari keluarga ulama keturunan Mbah Sambu (Sayyid Abdurrahman Basyaiban). Setelah menuntut ilmu kepada KH. Sholeh Darat di Semarang, Syaichona Muhammad Kholil di Bangkalan Madura, serta bermukim di Makkah Al-Mukarramah berguru kepada Syaikh Nawawi Al-Bantani dan Sayyid Abu Bakar Syatha Ad-Dimyathi (pengarang *I’anatuth Thalibin*), beliau mendapat isyarat dari gurunya untuk berdakwah ke wilayah ujung timur Jawa yang kala itu masih berupa hutan perkebunan kolonial, yakni Jember.\n\nSetibanya di Jember pada akhir abad ke-19, KH. Muhammad Shiddiq merintis pengajian dan mendirikan pesantren di kawasan Talangsari (kini Pondok Pesantren Ash-Shiddiqi Putera/Puteri Jember). Keberkahan ilmu dan riyadhah beliau melahirkan deretan ulama besar tingkat nasional dari satu sulbi (*Bani Shiddiq*), di antaranya: KH. Manshur Shiddiq (Tuban), KH. Ahmad Qusyairi Shiddiq (ulama besar Pasuruan, mertua KH. Abdul Hamid Pasuruan), KH. Mahfudz Shiddiq (Ketua Umum Tanfidziyah HBNO/PBNU era 1937–1942 yang sangat brilian), KH. Abdul Halim Shiddiq (pengasuh PP Ash-Shiddiqi Jember), Nyai Hj. Raihanah (ibunda KH. Abdul Hamid Pasuruan), serta putra bungsu beliau KH. Achmad Siddiq (1926–1991 M).\n\nKH. Achmad Siddiq kemudian dikenal dalam sejarah Indonesia modern sebagai Rais Aam Syuriyah PBNU (1984–1991) yang bersama KH. Abdurrahman Wahid (Gus Dur) merumuskan penerimaan Pancasila sebagai kalimatun sawa bangsa serta menggagas konsep *Trilogi Ukhuwah*: *Ukhuwah Islamiyah* (persaudaraan sesama umat Islam), *Ukhuwah Wathaniyah* (persaudaraan sebangsa dan setanah air), dan *Ukhuwah Basyariyah/Insaniyah* (persaudaraan sesama umat manusia). KH. Muhammad Shiddiq wafat pada 29 Ramadhan 1353 H (1934 M) dan dimakamkan di Kompleks Maqbarah Condro, Kaliwates, Jember (sementara KH. Achmad Siddiq dimakamkan di Kompleks Pemakaman Ploso, Mojo, Kediri atas permintaan sahabat dan kerabat pesantren).',
    karomah: [
      'Dalam tradisi lisan masyarakat Jember dan manaqib *Bani Shiddiq*, karomah paling nyata dari KH. Muhammad Shiddiq adalah dikabulkannya doa beliau setiap selesai shalat tahajud agar seluruh anak-cucu keturunannya menjadi *Ahlul Qur’an* dan pemimpin umat. Terbukti dari pernikahan beliau dengan Nyai Hj. Maryam dan Nyai Hj. Zaqiah lahir para kiai besar, mufassir, penghafal Al-Qur’an, serta tokoh-tokoh nasional yang mewarnai sejarah Islam Indonesia abad ke-20.<!--more-->\n\nDikisahkan pula bahwa selama membuka dakwah di Talangsari dan Condro Jember pada awal abad ke-20, KH. Muhammad Shiddiq tidak pernah putus mengkhatamkan Al-Qur’an dan wirid *Dalailul Khairat*, sehingga wibawa batin beliau disegani baik oleh masyarakat pribumi Madura-Jawa di Jember maupun para penguasa perkebunan Belanda.',
    ],
    untoldStory:
      'Putra beliau, KH. Mahfudz Shiddiq (1906–1944 M), adalah intelektual santri lulusan pesantren Tebuireng yang fasih berbahasa Belanda, Arab, dan Inggris, serta berhasil memodernisasi manajemen organisasi Nahdlatul Ulama pada dekade 1930-an melalui penerbitan majalah *Berita Nahdlatoel Oelama*. Sementara adiknya, KH. Achmad Siddiq, pernah menjabat sebagai sekretaris pribadi Menteri Agama KH. Abdul Wahid Hasyim sebelum kembali mengabdi penuh di Pesantren Jember.<!--more-->\n\nKompleks Maqbarah Condro di Kecamatan Kaliwates, Kabupaten Jember yang menaungi pusara KH. Muhammad Shiddiq, KH. Abdul Halim Shiddiq, KH. Yusuf Muhammad (Gus Yus), dan keluarga besar Bani Shiddiq selalu dipadati ribuan santri dan peziarah terutama pada bulan suci Ramadhan menjelang malam 29 Ramadhan.',
    barokahHajat:
      'Peziarah dan para orang tua yang berziarah ke Maqbarah KH. Muhammad Shiddiq di Condro Jember umumnya bertawassul memohon kepada Allah SWT agar dikaruniai keturunan (*dzurriyah*) yang alim, hafizh Al-Qur’an, dan menjadi pemimpin umat yang bijaksana sebagaimana keberkahan keluarga besar Bani Shiddiq.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Muhammad Shiddiq & KH. Achmad Siddiq (Jember)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ مُحَمَّدْ صِدِّيقْ وَأَبْنَائِهِ الشَّيْخِ مَحْفُوظْ صِدِّيقْ وَالشَّيْخِ أَحْمَدْ صِدِّيقْ الْجَمْبَرِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَوْلَادِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِعُلُومِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ كِيَاهِي الحَاجِّ مُحَمَّدْ صِدِّيقْ وَأَبْنَائِهِ الشَّيْخِ مَحْفُوظْ صِدِّيقْ وَالشَّيْخِ أَحْمَدْ صِدِّيقْ الْجَمْبَرِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَوْلَادِنَا وَذُرِّيَّاتِنَا وَانْفَعْنَا بِعُلُومِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikhil-'Allaamah Kiyaahii al-Haajj Muhammad Shiddiiq wa abnaa-ihisy-Syaikh Mahfuuzh Shiddiiq wasy-Syaikh Ahmad Shiddiiq al-Jambarii syai-un lillaahi lahumul-Faatihah. Allaahumma baarik lanaa fii aulaadinaa wa dzurriyyaatinaa wanfa'naa bi 'uluumihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah KH. Muhammad Shiddiq beserta putra-putra beliau KH. Mahfudz Shiddiq dan KH. Achmad Siddiq Jember, Al-Fatihah. Ya Allah, berkahilah anak-anak serta keturunan kami dan limpahkanlah kemanfaatan melalui ilmu mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah KH. Muhammad Shiddiq beserta putra-putra beliau KH. Mahfudz Shiddiq dan KH. Achmad Siddiq Jember, Al-Fatihah. Ya Allah, berkahilah anak-anak serta keturunan kami dan limpahkanlah kemanfaatan melalui ilmu mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '29 Ramadhan (Puncak Haul Akbar Tahunan KH. Muhammad Shiddiq di Maqbarah Condro Kaliwates & Pondok Pesantren Ash-Shiddiqi Putera Talangsari Jember).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Maqbarah Condro, serta menjaga ketenangan warga sekitar Gang Maqbarah Condro Kaliwates.',
    facilities: ['Cungkup & Pendopo Maqbarah Bani Shiddiq Condro', 'Mushalla & Tempat Wudhu Peziarah', 'Pondok Pesantren Ash-Shiddiqi Putera (PPI) Talangsari Jember', 'Area Parkir Peziarah di Jl. Gajah Mada Kaliwates'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Siddiq, KH. Achmad (1979). Khittah Nahdliyyah. Surabaya: Balai Buku.',
      'Barton, Greg & Fealy, Greg (1996). Nahdlatul Ulama, Traditionalist Islam and Modernity in Indonesia. Monash Asia Institute.',
      'Tim Penulis Bani Shiddiq (2005). Biografi dan Silsilah KH. Muhammad Shiddiq Jember.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'datuk-malik-ibrahim-banyuwangi',
    name: 'Makam Datuk Abdurrahman bin Abu Bakar Bauzir (Datuk Malik Ibrahim) & Waliyah Zainab (Lateng, Banyuwangi)',
    title: 'Wali Penyebar Islam Bumi Blambangan & Karomah Makam Harum Lateng',
    description:
      'Kompleks makam waliyullah penyebar Islam di Banyuwangi abad ke-18/19 M—Datuk Abdurrahman Bauzir (Datuk Malik Ibrahim) dan Syarifah Waliyah Zainab di Kelurahan Lateng, Kecamatan Banyuwangi, Kabupaten Banyuwangi.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Abad ke-19 M',
    province: 'Jawa Timur',
    city: 'Banyuwangi',
    district: 'Kec. Banyuwangi',
    address: 'Jl. Basuki Rahmat, Lingkungan Kampung Arab / Lateng, Kel. Lateng, Kec. Banyuwangi, Kabupaten Banyuwangi',
    location: {
      lat: -8.2038,
      lng: 114.3742,
      address: 'Jl. Basuki Rahmat, Lingkungan Kampung Arab / Lateng, Kel. Lateng, Kec. Banyuwangi, Kabupaten Banyuwangi',
      district: 'Kec. Banyuwangi',
      city: 'Banyuwangi',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Bumi Blambangan (Kompleks Makam Datuk Abdurrahman Bauzir / Datuk Malik Ibrahim & Waliyah Zainab Lateng Banyuwangi)',
    sanad:
      'Ulama dan sadah asal Hadramaut/Yaman dari marga Bauzir (keturunan Syaikh Ya’qub bin Yusuf Bauzir yang bersambung ke Abbas bin Abdul Muthalib) serta jaringan ulama penyebar Islam di Kesultanan/Kabupaten Banyuwangi masa Bupati Mas Alit.',
    karya: [
      'Penyebaran dakwah Islam di pesisir Selat Bali dan pembentukan komunitas muslim Kampung Arab Lateng Banyuwangi',
      'Warisan tradisi Maulid dan majelis dzikir masyarakat Osing-Melayu-Arab di Banyuwangi',
    ],
    history:
      'Di ujung paling timur Pulau Jawa yang menghadap langsung ke Selat Bali, Kelurahan Lateng di Kota Banyuwangi menyimpan situs ziarah utama Bumi Blambangan, yakni Kompleks Makam Datuk Abdurrahman bin Abu Bakar Bauzir (yang dalam tradisi ziarah lokal dikenal pula sebagai Datuk Malik Ibrahim / Datuk Bauzir Lateng) beserta makam kerabat perempuannya yang salehah, Syarifah/Waliyah Siti Zainab. Kehadiran para mubaligh dari keluarga Bauzir dan Habaib di pesisir Banyuwangi berlangsung intensif sejak akhir abad ke-18 hingga abad ke-19 M, mengiringi berdirinya Kabupaten Banyuwangi pasca-Perang Puputan Bayu (1771 M) pada masa pemerintahan Bupati pertama, Tumenggung Wiroguno I (Mas Alit).\n\nDatuk Abdurrahman Bauzir beserta keluarganya mendarat di pelabuhan kuno Banyuwangi dan menetap di kawasan pesisir Lateng. Dengan akhlak yang lemah lembut, kedermawanan dalam berniaga, serta pengobatan dan bimbingan agama, beliau merangkul masyarakat pribumi Blambangan (Suku Osing) yang kala itu masih dalam masa transisi dari kepercayaan lama menuju Islam. Beliau mendirikan mushalla dan menghidupkan pengajian Al-Qur’an serta pembacaan Maulid Nabi di kawasan Lateng.\n\nBersama Datuk Abdurrahman Bauzir, sosok Waliyah Siti Zainab dikenal sebagai perempuan ahli ibadah (*’abidah*) dan zahidah yang mendedikasikan hidupnya untuk mengajar mengaji kaum perempuan di Banyuwangi. Kompleks makam Datuk di Kelurahan Lateng, Kecamatan Banyuwangi ini menjadi titik persinggahan utama para peziarah yang hendak menyeberang dari Pelabuhan Ketapang Banyuwangi menuju ziarah Wali Pitu di Pulau Bali maupun sebaliknya.',
    karomah: [
      'Dalam catatan sejarah lokal Banyuwangi dan kesaksian masyarakat Kelurahan Lateng, peristiwa karomah yang paling menggemparkan terjadi ketika dilakukan penggalian/penataan di area makam Datuk Abdurrahman Bauzir dan Waliyah Siti Zainab puluhan tahun setelah wafatnya: jasad beliau ditemukan masih utuh tidak dimakan tanah dan dari liang lahatnya menyebar bau harum semerbak minyak wangi kesturi yang tercium oleh warga sekitar selama berhari-hari.<!--more-->\n\nTradisi lisan masyarakat pesisir Banyuwangi juga menuturkan bahwa semasa hidupnya, air doa dari Datuk Lateng sering menjadi wasilah kesembuhan bagi warga Blambangan yang terkena penyakit maupun gangguan di wilayah hutan dan pesisir Selat Bali.',
    ],
    untoldStory:
      'Kawasan Kelurahan Lateng dan Kampung Arab di Banyuwangi memiliki peran sejarah yang sangat penting dalam integrasi keislaman masyarakat ujung timur Jawa. Dari kawasan inilah lahir tradisi seni Islam khas Banyuwangi seperti *Kuntulan* dan *Hadrah Caruk*, serta berdirinya perguruan Islam bersejarah di Banyuwangi pada awal abad ke-20 yang dikunjungi oleh tokoh-tokoh nasional.<!--more-->\n\nKarena letaknya yang hanya berjarak sekitar 6 kilometer di sebelah selatan Pelabuhan Penyeberangan Ketapang (Banyuwangi–Gilimanuk), Kompleks Makam Datuk di Lateng telah menjadi bagian tak terpisahkan dari jalur *Ziarah Wali Jawa–Bali* yang menghubungkan makam-makam ulama Tapal Kuda dengan Makam Habib Ali bin Umar Bafaqih di Negara, Bali.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Datuk Abdurrahman Bauzir (Datuk Malik Ibrahim) dan Waliyah Zainab di Lateng Banyuwangi umumnya bertawassul memohon kepada Allah SWT keharuman nama baik dan kemuliaan akhlak, penjagaan kehormatan kaum perempuan/keluarga, serta keselamatan menyeberangi lautan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Datuk Abdurrahman Bauzir & Waliyah Siti Zainab (Lateng Banyuwangi)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الدَّاتُوكْ عَبْدِ الرَّحْمَنِ بَاعُوزِيرْ (دَاتُوكْ مَالِكْ إِبْرَاهِيمَ) وَالْوَلِيَّةِ الصَّالِحَةِ السَّيِّدَةِ زَيْنَبَ اللاتِينْغ بَانْيُووَانْغِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الدَّاتُوكْ عَبْدِ الرَّحْمَنِ بَاعُوزِيرْ (دَاتُوكْ مَالِكْ إِبْرَاهِيمَ) وَالْوَلِيَّةِ الصَّالِحَةِ السَّيِّدَةِ زَيْنَبَ اللاتِينْغ بَانْيُووَانْغِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih ad-Daatuuk 'Abdir-Rahmaan Baa'uuziir (Datuk Malik Ibrahim) wal-Waliyyatish-Shaalihatis-Sayyidah Zainab Laating Baanyuuwaangii syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Datuk Abdurrahman Bauzir (Datuk Malik Ibrahim) dan Waliyah Siti Zainab Lateng Banyuwangi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Datuk Abdurrahman Bauzir (Datuk Malik Ibrahim) dan Waliyah Siti Zainab Lateng Banyuwangi, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban / Nisfu Sya’ban (Puncak Haul Akbar Tahunan Datuk Abdurrahman Bauzir & Waliyah Zainab di Kelurahan Lateng, Kecamatan Banyuwangi, Kabupaten Banyuwangi).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup makam, serta menjaga ketenangan di lingkungan pemukiman warga Kelurahan Lateng.',
    facilities: ['Cungkup Makam Datuk Lateng & Waliyah Zainab', 'Masjid & Mushalla Sekitar Lateng', 'Area Parkir di Tepi Jl. Basuki Rahmat Banyuwangi', 'Dekat Pelabuhan Penyeberangan Ketapang (15 menit)'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Margana, Sri (2012). Ujung Timur Jawa, 1763–1813: Perebutan Hegemoni Blambangan. Yogyakarta: Pustaka Ifada.',
      'Pemerintah Kabupaten Banyuwangi — Direktori Wisata Religi Makam Datuk Lateng Banyuwangi.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-sholeh-tanggul-jember',
    legacyId: 'habib-9',
    name: 'Makam Al-Habib Sholeh bin Muhsin Al-Hamid (Habib Sholeh Tanggul, Jember)',
    title: 'Wali Quthub Mustajabud Da’wah & Penggubah Shalawat Manshub',
    description:
      'Maqbarah waliyullah agung Al-Habib Sholeh bin Muhsin Al-Hamid (1895–1976 M) di samping Masjid Riyadlus Sholihin, Kecamatan Tanggul, Kabupaten Jember—rujukan doa dan pembuat Shalawat Manshub yang masyhur di seluruh Nusantara.',
    category: 'Habaib',
    era: 'Abad ke-20 M (1895–1976 M / 1313–1396 H)',
    province: 'Jawa Timur',
    city: 'Jember',
    district: 'Kec. Tanggul',
    address: 'Kompleks Masjid Riyadlus Sholihin, Jl. PB. Sudirman, Desa Tanggul Kulon, Kec. Tanggul, Kabupaten Jember',
    location: {
      lat: -8.1652,
      lng: 113.4478,
      address: 'Kompleks Masjid Riyadlus Sholihin, Jl. PB. Sudirman, Desa Tanggul Kulon, Kec. Tanggul, Kabupaten Jember',
      district: 'Kec. Tanggul',
      city: 'Jember',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Habaib Jawa Timur (Kompleks Masjid Riyadlus Sholihin & Kubah Habib Sholeh Tanggul Jember)',
    sanad:
      'Putra Al-Habib Muhsin bin Ahmad Al-Hamid (Wadi Amd, Hadramaut); murid utama Al-Qutb Al-Habib Abu Bakar bin Muhammad Assegaf (Gresik) dan menerima ijazah khirgah kewalian setelah khalwat.',
    karya: [
      'Gubahan Shalawat Manshub (Allahumma shalli ’ala Sayyidina Muhammadin shalatan taghfiru biha dzunub, wa tushlihu biha qulub, wa tanthaliqu biha ’ushub...)',
      'Pendirian Masjid Riyadlus Sholihin Tanggul dan pembinaan masyarakat di wilayah Jember–Lumajang',
    ],
    history:
      'Al-Arif Billah Al-Habib Sholeh bin Muhsin bin Ahmad Al-Hamid (17 Jumadil Awal 1313 H – 8 Syawal 1396 H / 1895–1976 M) lahir di Desa Korbah, Wadi Amd, Hadramaut, Yaman dari pasangan Habib Muhsin bin Ahmad Al-Hamid dan Syarifah Aisyah dari marga Al-Abud Ba’umar. Sejak remaja di Hadramaut, beliau telah mendalami ilmu fikih, tasawuf, dan Al-Qur’an kepada ayahandanya dan para ulama Wadi Amd. Pada tahun 1921 M (usia 26 tahun), beliau berlayar menuju Nusantara bersama sepupunya, Syekh Fadhli Sholeh, sempat singgah di Jakarta dan Lumajang sebelum akhirnya menetapkan hati untuk bermukim di sebuah kota kecamatan kecil bernama Tanggul di Kabupaten Jember.\n\nDi Tanggul, Habib Sholeh berguru dan menjalin ikatan ruhani yang sangat dekat dengan wali quthub Gresik, Al-Habib Abu Bakar bin Muhammad Assegaf. Atas isyarat batin dan keteladanan gurunya tersebut, Habib Sholeh sempat menjalani *uzlah* dan *khalwat* (mengurung diri beribadah dan menangis berzikir kepada Allah SWT) selama lebih dari tiga tahun tanpa menemui seorang manusia pun. Setelah masa khalwat berakhir, Habib Abu Bakar Assegaf Gresik memanggil Habib Sholeh untuk datang ke Gresik, memakaikan jubah dan sorban hijau ke tubuhnya, lalu memerintahkannya berziarah ke Makam Sunan Ampel Surabaya sebagai tanda pengukuhan maqam kewaliannya.\n\nSekembalinya dari Surabaya ke Tanggul, Habib Sholeh mewakafkan tanah dan mendirikan Masjid Riyadlus Sholihin serta menghidupkan majelis pembacaan kitab *Riyadhus Shalihin* dan Maulid Nabi. Beliau dikenal sangat dermawan, ramah kepada kaum fakir miskin, dan menggubah *Shalawat Manshub* yang diamalkan oleh jutaan umat Islam untuk memohon pengampunan dosa, ketenangan hati, dan kelapangan urusan. Habib Sholeh Tanggul wafat pada hari Sabtu senja, 8 Syawal 1396 H (2 Oktober 1976 M) dan dimakamkan di kubah sebelah selatan mihrab Masjid Riyadlus Sholihin, Tanggul, Jember.',
    karomah: [
      'Dalam manaqib sadah Ba’alawi dan kesaksian para ulama Nusantara, Habib Sholeh Tanggul dijuluki sebagai *Wali yang Doanya Cepat Menembus Langit* (*Sari’ul Ijabah*). Para habaib sepuh seperti Habib Ali bin Abdurrahman Al-Habsyi (Kwitang Jakarta) dan KH. Abdul Hamid (Pasuruan) sering menganjurkan tamu-tamu yang sedang menghadapi persoalan pelik untuk datang meminta doa kepada Habib Sholeh di Tanggul.<!--more-->\n\nSalah satu peristiwa karomah yang tercatat dalam sejarah lokal Tanggul adalah ketika wilayah Jember dilanda kemarau panjang yang mengeringkan sawah-sawah petani; Habib Sholeh mengajak warga berjalan menuju aliran sungai yang kering untuk melaksanakan Shalat Istisqa’ dan berdoa mengangkat tangan, dan belum sempat rombongan jamaah kembali ke rumah masing-masing, hujan deras langsung mengguyur Kecamatan Tanggul.',
    ],
    untoldStory:
      'Kedatangan Habib Sholeh Tanggul ke Jakarta pada era 1950–1960-an bersama sahabatnya Habib Ali Kwitang sempat mempertemukan beliau dengan tokoh-tokoh nasional, termasuk Wakil Presiden pertama RI Bung Hatta dan Menteri Luar Negeri H. Adam Malik yang menaruh rasa hormat mendalam terhadap nasihat-nasihat kebangsaan dan doa Habib Sholeh.<!--more-->\n\nTeks *Shalawat Manshub* karya Habib Sholeh Tanggul (*"Allahumma shalli ’ala Sayyidina Muhammadin shalatan taghfiru biha dzunub, wa tushlihu biha qulub, wa tanthaliqu biha ’ushub, wa talinu biha shu’ub, wa ’ala alihi wa shahbihi wa man ilaihi manshub"*) memiliki susunan rima bahasa Arab yang sangat indah dan diijazahkan secara umum oleh beliau untuk dibaca 11 atau 41 kali setiap selesai shalat fardhu.',
    barokahHajat:
      'Peziarah yang berziarah ke kubah Al-Habib Sholeh bin Muhsin Al-Hamid di Tanggul Jember umumnya bertawassul dan membaca Shalawat Manshub memohon kepada Allah SWT dikabulkannya hajat-hajat mendesak, dilunaskannya utang dan kesulitan ekonomi, serta dilembutkannya urusan yang sulit (*talinu biha shu’ub*).',
    doaKhusus: [
      {
        title: 'Tawassul & Shalawat Manshub Al-Habib Sholeh bin Muhsin Al-Hamid (Tanggul)',
        arab: 'اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تَغْفِرُ بِهَا الذُّنُوبَ، وَتُصْلِحُ بِهَا الْقُلُوبَ، وَتَنْطَلِقُ بِهَا الْعُصُوبُ، وَتَلِينُ بِهَا الصُّعُوبُ، وَعَلَى آلِهِ وَصَحْبِهِ وَمَنْ إِلَيْهِ مَنْسُوبٌ. اللّٰهُمَّ انْفَعْنَا بِبَرَكَاتِ الْحَبِيبِ صَالِحْ بْنِ مُحْسِنْ الْحَامِدْ تَانْغُولْ.',
        text: 'اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تَغْفِرُ بِهَا الذُّنُوبَ، وَتُصْلِحُ بِهَا الْقُلُوبَ، وَتَنْطَلِقُ بِهَا الْعُصُوبُ، وَتَلِينُ بِهَا الصُّعُوبُ، وَعَلَى آلِهِ وَصَحْبِهِ وَمَنْ إِلَيْهِ مَنْسُوبٌ. اللّٰهُمَّ انْفَعْنَا بِبَرَكَاتِ الْحَبِيبِ صَالِحْ بْنِ مُحْسِنْ الْحَامِدْ تَانْغُولْ.',
        latin:
          "Allaahumma shalli 'alaa Sayyidinaa Muhammadin shalaatan taghfiru bihad-dzunuub, wa tushlihu bihal-quluub, wa tanthaliqu bihal-'ushuub, wa taliinu bihash-shu'uub, wa 'alaa aalihii wa shahbihii wa man ilaihi mansuub. Allaahummanfa'naa bi barakaatil-Habiib Shaalih bin Muhsin al-Haamid Tanggul.",
        terjemahan:
          'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad SAW; rahmat yang dengannya Engkau mengampuni dosa-dosa, memperbaiki hati, melancarkan urat-urat kehidupan, dan melunakkan segala kesulitan, juga kepada keluarga, sahabat, dan siapa saja yang bernisbah kepadanya. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui keberkahan Al-Habib Sholeh bin Muhsin Al-Hamid Tanggul.',
        translation:
          'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad SAW; rahmat yang dengannya Engkau mengampuni dosa-dosa, memperbaiki hati, melancarkan urat-urat kehidupan, dan melunakkan segala kesulitan, juga kepada keluarga, sahabat, dan siapa saja yang bernisbah kepadanya. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui keberkahan Al-Habib Sholeh bin Muhsin Al-Hamid Tanggul.',
      },
    ],
    haulSchedule:
      'Ahad Kedua Bulan Syawal (Puncak Haul Akbar Tahunan Al-Habib Sholeh bin Muhsin Al-Hamid di Kompleks Masjid Riyadlus Sholihin, Tanggul, Kabupaten Jember yang dihadiri ratusan ribu jamaah).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi Masjid Riyadlus Sholihin dan Kubah Maqbarah, serta menjaga kekhusyukan saat membaca Yasin, Tahlil, dan Shalawat Manshub.',
    facilities: ['Masjid Riyadlus Sholihin Tanggul', 'Kubah Maqbarah Habib Sholeh bin Muhsin Al-Hamid', 'Dekat Stasiun Kereta Api Tanggul (sekitar 300 meter)', 'Area Parkir Bus Wisata Religi Tanggul Jember'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Al-Hamid, Keluarga Besar (2006). Manaqib Al-Arif Billah Al-Habib Sholeh bin Muhsin Al-Hamid Tanggul. Jember: Majelis Riyadlus Sholihin.',
      'Syukur, M. Amin (2012). Tasawuf Sosial dan Karomah Wali di Jawa Timur.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'guru-bangil-pasuruan',
    legacyId: 'ulama-35',
    name: 'Makam Syekh KH. Muhammad Syarwani Abdan Al-Banjari (Guru Bangil, Pasuruan)',
    title: 'Mutiara Kalimantan di Tanah Jawa, Pendiri PP Datuk Kalampayan Bangil & Guru Abah Guru Sekumpul',
    description:
      'Maqbarah ulama besar dzurriyah Syekh Muhammad Arsyad Al-Banjari—KH. Muhammad Syarwani Abdan (1915–1989 M / Guru Bangil)—di Pemakaman Keluarga Habaib/Ulama Dawur, Kecamatan Bangil, Kabupaten Pasuruan.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1915–1989 M / 1334–1410 H)',
    province: 'Jawa Timur',
    city: 'Pasuruan',
    district: 'Kec. Bangil',
    address: 'Kompleks Pemakaman Islam Dawur, Kel. Kauman, Kec. Bangil, Kabupaten Pasuruan',
    location: {
      lat: -7.5968,
      lng: 112.7812,
      address: 'Kompleks Pemakaman Islam Dawur, Kel. Kauman, Kec. Bangil, Kabupaten Pasuruan',
      district: 'Kec. Bangil',
      city: 'Pasuruan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Bangil Pasuruan (Maqbarah KH. Muhammad Syarwani Abdan / Guru Bangil)',
    sanad:
      'Dzurriyah generasi ke-6 Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan Martapura); murid utama Sayyid Amin Al-Kutbi, Sayyid Alawi bin Abbas Al-Maliki, Syaikh Umar Hamdan Al-Mahrisi, dan Syaikh Ali Al-Maliki di Makkah; guru ruhani utama dari KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul).',
    karya: [
      'Kitab Adz-Dzakhiratuts Tsaminah li Ahlil Istiqamah (Simpanan Berharga tentang Thariqah dan Amal Shalih)',
      'Pendirian Pondok Pesantren Datuk Kalampayan di Kauman, Bangil, Kabupaten Pasuruan (1970 M)',
    ],
    history:
      'Syekh KH. Muhammad Syarwani Abdan Al-Banjari—yang masyhur dengan panggilan *Tuan Guru Bangil* (1915–1989 M)—lahir di Kampung Melayu Ilir, Martapura, Kalimantan Selatan dari pasangan H. Muhammad Abdan dan Hj. Walidah, yang keduanya merupakan keturunan ke-5 dari ulama agung Kalimantan, Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan). Sejak usia muda setelah menamatkan pendidikan di Madrasah Darussalam Martapura dan berguru kepada pamannya KH. Muhammad Kasyful Anwar, beliau dibawa hijrah ke Kota Bangil, Pasuruan untuk mengaji kepada para ulama Jawa Timur seperti KH. Muhdhar Gondang Bangil dan KH. Abu Hasan Wetan Alun Bangil.\n\nPada usia 16 tahun, beliau berangkat ke Makkah Al-Mukarramah bersama sepupunya, Syekh Muhammad Anang Sya’rani Arif, dan bermukim selama lebih dari sepuluh tahun di Tanah Suci. Di Masjidil Haram, ketekunan dan kecerdasan Syarwani muda membuatnya dijuluki *"Dua Mutiara dari Banjar"* bersama sepupunya oleh para ulama Haramain. Beliau berguru langsung kepada Sayyid Muhammad Amin Al-Kutbi, Sayyid Alawi bin Abbas Al-Maliki, Syaikh Umar Hamdan Al-Mahrisi (Muhadditsul Haramain), dan Syaikh Hasan Al-Masysyath hingga dipercaya mengajar di serambi Masjidil Haram dan menerima ijazah sanad berbagai *thariqah mu’tabarah* (terutama Tarekat Sammaniyah).\n\nSetelah sempat kembali ke Martapura pada tahun 1939 M, demi menghindari hiruk-pikuk kemasyhuran dan jabatan duniawi, pada tahun 1943 M beliau memutuskan hijrah dan menetap secara permanen di Kota Bangil, Kabupaten Pasuruan. Di Bangil, beliau mendirikan Pondok Pesantren Datuk Kalampayan pada tahun 1970 M dan menulis kitab *Adz-Dzakhiratuts Tsaminah*. Kepada Guru Bangil inilah para ulama besar Kalimantan dan Jawa—termasuk keponakan sekaligus murid kesayangan beliau, KH. Muhammad Zaini bin Abdul Ghani (Abah Guru Sekumpul Martapura), serta KH. Abdul Hamid Pasuruan—merujuk dalam urusan tasawuf dan sanad thariqah. Beliau wafat pada malam Selasa, 11 September 1989 (12 Shafar 1410 H) dalam usia 74 tahun dan dimakamkan di Pemakaman Dawur, Kauman, Bangil, Kabupaten Pasuruan.',
    karomah: [
      'Dalam tradisi lisan para santri Banjar dan Jawa Timur, karomah utama Guru Bangil adalah sifat *khumul* (menyembunyikan kemuliaan diri) dan kezuhudan beliau yang luar biasa. Ketika sahabat dekatnya di Pasuruan, KH. Abdul Hamid (Mbah Hamid Pasuruan), sering kedatangan tamu dari Kalimantan Selatan yang meminta doa dan ijazah thariqah, Mbah Hamid selalu berkata dengan takzim: *"Mengapa kalian jauh-jauh datang kepadaku di Kota Pasuruan, padahal di Bangil ada guru kami semua dan mutiara dari tanah kalian sendiri, Kiai Syarwani Abdan?"*<!--more-->\n\nAbah Guru Sekumpul Martapura juga sering menceritakan dalam majelis pengajiannya di Sekumpul bagaimana bimbingan ruhani (*tarbiyah*) dan pandangan mata batin Guru Bangil mampu membukakan rahasia ilmu makrifat dan sanad kewalian para masyayikh terdahulu.',
    ],
    untoldStory:
      'Hubungan persaudaraan ruhani antara tiga waliyullah di poros Pasuruan–Bangil–Martapura pada paruh kedua abad ke-20 (yakni KH. Abdul Hamid di Kota Pasuruan, KH. Muhammad Syarwani Abdan di Bangil, dan KH. Muhammad Zaini Abdul Ghani di Martapura) merupakan salah satu bab paling indah dalam sejarah tasawuf Nusantara modern. Ketiganya saling mengunjungi, saling menghormati, dan menyambungkan kembali jembatan sanad keilmuan antara Jawa Timur dan Kalimantan Selatan yang telah terjalin sejak masa Sunan Giri.<!--more-->\n\nSetiap tahun pada bulan Shafar, puluhan ribu peziarah asal Kalimantan Selatan, Kalimantan Timur, dan Jawa Timur memadati Kota Bangil untuk menghadiri Haul Akbar Guru Bangil di Pondok Pesantren Datuk Kalampayan dan Kubah Maqbarah Dawur Bangil.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah KH. Muhammad Syarwani Abdan (Guru Bangil) di Pasuruan umumnya bertawassul memohon kepada Allah SWT keikhlasan hati (*khumul*) yang bersih dari sifat riya dan pamer, keberkahan sanad ilmu tasawuf, serta keselamatan hidup di dunia dan akhirat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh KH. Muhammad Syarwani Abdan (Guru Bangil)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الشَّيْخِ كِيَاهِي الحَاجِّ مُحَمَّدْ شَرْوَانِي عَبْدَانْ الْبَنْجَرِيِّ الْبَانْغِيلِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا الْإِخْلَاصَ وَالِاسْتِقَامَةَ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الشَّيْخِ كِيَاهِي الحَاجِّ مُحَمَّدْ شَرْوَانِي عَبْدَانْ الْبَنْجَرِيِّ الْبَانْغِيلِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا الْإِخْلَاصَ وَالِاسْتِقَامَةَ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimir-Rabbaanii wal-'Aarifish-Shamadaanii asy-Syaikh Kiyaahii al-Haajj Muhammad Syarwaanii 'Abdaan al-Banjarii al-Baangiilii syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnal-ikhlaasha wal-istiqaamata wanfa'naa bi 'uluumihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan arif billah Syekh KH. Muhammad Syarwani Abdan Al-Banjari (Guru Bangil), Al-Fatihah. Ya Allah, karuniakanlah kepada kami keikhlasan dan keistiqamahan, serta limpahkanlah kemanfaatan melalui ilmu dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani dan arif billah Syekh KH. Muhammad Syarwani Abdan Al-Banjari (Guru Bangil), Al-Fatihah. Ya Allah, karuniakanlah kepada kami keikhlasan dan keistiqamahan, serta limpahkanlah kemanfaatan melalui ilmu dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12 Shafar (Puncak Haul Akbar Tahunan KH. Muhammad Syarwani Abdan / Guru Bangil di Pondok Pesantren Datuk Kalampayan & Kompleks Maqbarah Dawur, Kauman, Bangil, Kabupaten Pasuruan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat (dianjurkan berpakaian putih dan berpeci), menjaga ketenangan saat melintasi gang menuju Kubah Maqbarah Dawur Bangil, serta mengikuti adab pembacaan tahlil dan Maulid.',
    facilities: ['Kubah Maqbarah KH. Muhammad Syarwani Abdan Dawur Bangil', 'Pondok Pesantren Datuk Kalampayan Bangil', 'Masjid Agung Bangil', 'Area Parkir Bus Peziarah di Alun-Alun Bangil'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Abdan, KH. Muhammad Syarwani (1980). Adz-Dzakhiratuts Tsaminah li Ahlil Istiqamah. Bangil: PP Datuk Kalampayan.',
      'Tim Manaqib PP Datuk Kalampayan (1995). Riwayat Hidup dan Perjuangan KH. Muhammad Syarwani Abdan (Guru Bangil).',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-bejagung-tuban',
    legacyId: 'auliya-21',
    name: 'Makam Sunan Bejagung Lor (Sayyid Abdullah Asy’ari bin Sayyid Jamaluddin Kubro, Tuban)',
    title: 'Wali Sesepuh Tuban Era Majapahit & Paman dari Sunan Ampel',
    description:
      'Kompleks makam cagar budaya Sayyid Abdullah Asy’ari (Sunan Bejagung Lor) di Desa Bejagung, Kecamatan Semanding, Kabupaten Tuban—putra Syekh Jumadil Kubro dan penyebar Islam abad ke-14/15 M di pedalaman Tuban.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-14 – Awal Abad ke-15 M',
    province: 'Jawa Timur',
    city: 'Tuban',
    district: 'Kec. Semanding',
    address: 'Jl. Pangeran Penghulu, Desa Bejagung, Kec. Semanding, Kabupaten Tuban',
    location: {
      lat: -6.9125,
      lng: 112.0652,
      address: 'Jl. Pangeran Penghulu, Desa Bejagung, Kec. Semanding, Kabupaten Tuban',
      district: 'Kec. Semanding',
      city: 'Tuban',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Makam_Sunan_Bonang_Tuban.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Kabupaten Tuban (Kompleks Makam Sunan Bejagung Lor Semanding Tuban)',
    sanad:
      'Putra Syekh Jamaluddin Akbar Al-Husaini (Syekh Jumadil Kubro); saudara kandung dari Syekh Ibrahim Asmorokondi dan Syekh Maulana Ishaq; paman dari Sunan Ampel dan Sunan Giri.',
    karya: [
      'Perintisan komunitas muslim dan pengajaran pertanian di Desa Bejagung Tuban pada masa Kemaharajaan Majapahit',
      'Situs Cungkup Kayu Kuno berinskripsi tahun Saka dan Sumur Kuno Sunan Bejagung Lor',
    ],
    history:
      'Sayyid Maulana Abdullah Asy’ari—yang dikenal luas dengan gelar *Sunan Bejagung Lor* atau Pangeran Penghulu—adalah salah satu wali perintis dakwah Islam generasi awal di wilayah Tuban, Jawa Timur pada pergantian abad ke-14 menuju abad ke-15 Masehi (lebih tua dari generasi Sunan Bonang). Berdasarkan catatan silsilah *Azmatkhan Al-Husaini* dan babad lokal Tuban, beliau merupakan putra dari Syekh Jamaluddin Akbar Al-Husaini (Syekh Jumadil Kubro) serta saudara dari Syekh Ibrahim Asmorokondi (ayahanda Sunan Ampel) dan Syekh Maulana Ishaq (ayahanda Sunan Giri).\n\nKetika berdakwah di wilayah Tuban yang kala itu merupakan pelabuhan utama Kemaharajaan Majapahit, Sayyid Abdullah Asy’ari memilih bermukim di daerah perbukitan kapur sebelah selatan Kota Tuban, yakni Desa Bejagung (Kecamatan Semanding). Di desa tersebut, beliau berbaur dengan masyarakat petani, mengajarkan budidaya tanaman pangan (termasuk jagung dan palawija di lahan kering) sembari memperkenalkan akidah tauhid dan tata cara bersuci serta shalat.\n\nSelain kompleks makam Sunan Bejagung Lor (Sayyid Abdullah Asy’ari), di Desa Bejagung juga terdapat kompleks makam *Sunan Bejagung Kidul* (Pangeran Kusumoyudo / Syekh Hasyim Alamuddin) yang melanjutkan estafet dakwah di kawasan Semanding Tuban. Kompleks Makam Sunan Bejagung Lor memiliki nilai arkeologis tinggi dengan keberadaan cungkup kayu jati kuno berukir motif *Surya Majapahit* dan sulur teratai yang telah ditetapkan sebagai Bangunan Cagar Budaya di Kabupaten Tuban.',
    karomah: [
      'Dalam tradisi lisan masyarakat Desa Bejagung dan Kabupaten Tuban, karomah utama Sunan Bejagung Lor berkaitan dengan keberadaan sumur kuno di halaman kompleks makam beliau. Diriwayatkan bahwa ketika wilayah perbukitan kapur Semanding dilanda kekeringan hebat, Sayyid Abdullah Asy’ari menggali tanah dengan tongkatnya sambil berdoa kepada Allah SWT hingga memancar sumber mata air tawar yang tidak pernah surut meskipun kemarau panjang melanda Tuban.<!--more-->\n\nKesaksian masyarakat setempat juga menuturkan keteduhan dan kewibawaan cungkup kuno makam Sunan Bejagung Lor yang kayu-kayu jatinya telah berusia lebih dari lima ratus tahun namun tetap kokoh menaungi pusara sang Wali.',
    ],
    untoldStory:
      'Secara arkeologis, tiang-tiang dan gebyok kayu pada cungkup Makam Sunan Bejagung Lor menyimpan pahatan angka tahun Jawa Kuno (*candrasengkala* dan angka tahun Saka dari abad ke-16/17 M saat pemugaran masa Kesultanan Pajang/Mataram) serta ragam hias *Kala-Makara* yang telah disamarkan menjadi ornamen dedaunan sesuai kaidah seni Islam awal.<!--more-->\n\nLetak Makam Sunan Bejagung Lor hanya berjarak sekitar 3 kilometer di sebelah selatan Makam Sunan Bonang di Alun-Alun Kota Tuban, sehingga para peziarah yang memahami silsilah Wali Songo selalu menyempatkan diri berziarah kepada paman Sunan Ampel ini.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Bejagung Lor di Semanding Tuban umumnya bertawassul memohon kepada Allah SWT kesuburan lahan pertanian dan kelancaran usaha pangan, kesembuhan penyakit lahir-batin, serta keteguhan iman keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Bejagung Lor (Sayyid Abdullah Asy’ari Tuban)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا عَبْدِ اللهِ الْأَشْعَرِيِّ بْنِ جَمَالِ الدِّينِ الْكُبْرَى الْمَعْرُوفِ بِسُونَانْ بِيَجَاغُونْغ لُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِنَا الشَّيْخِ مَوْلَانَا عَبْدِ اللهِ الْأَشْعَرِيِّ بْنِ جَمَالِ الدِّينِ الْكُبْرَى الْمَعْرُوفِ بِسُونَانْ بِيَجَاغُونْغ لُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidinaa asy-Syaikh Maulaanaa 'Abdillaah al-Asy'arii bin Jamaaliddiin al-Kubraa al-ma'ruufi bi Sunan Bejagung Lor syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sayyid Maulana Abdullah Asy’ari bin Jamaluddin Al-Kubro (Sunan Bejagung Lor Tuban), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh penghulu kami Sayyid Maulana Abdullah Asy’ari bin Jamaluddin Al-Kubro (Sunan Bejagung Lor Tuban), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '14–15 Dzulhijjah (Puncak Haul Akbar Tahunan Sunan Bejagung Lor di Desa Bejagung, Kecamatan Semanding, Kabupaten Tuban).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki pelataran cungkup kayu kuno cagar budaya, serta menjaga kebersihan di sekitar sumur kuno Sunan Bejagung.',
    facilities: ['Cungkup Kayu Jati Kuno Cagar Budaya Sunan Bejagung Lor', 'Masjid Jami’ Sunan Bejagung', 'Sumur Kuno Sunan Bejagung', 'Area Parkir Bus Peziarah Desa Bejagung Semanding'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Balai Pelestarian Cagar Budaya (BPCB) Jawa Timur — Laporan Inventarisasi Cagar Budaya Kompleks Makam Sunan Bejagung Tuban.',
      'Uka Tjandrasasmita (2009). Arkeologi Islam Nusantara. Jakarta: KPG.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // ============================================================================
  // 3. JOMBANG, MOJOKERTO, KEDIRI, PONOROGO & PACITAN
  // ============================================================================
  {
    id: 'kh-hasyim-asyari-tebuireng',
    legacyId: 'ulama-1',
    name: 'Makam Hadratussyaikh KH. Hasyim Asy’ari & KH. Abdul Wahid Hasyim (Tebuireng, Jombang)',
    title: 'Rais Akbar Pendiri Nahdlatul Ulama, Pahlawan Nasional & Pencetus Resolusi Jihad 22 Oktober 1945',
    description:
      'Kompleks Maqbarah Pondok Pesantren Tebuireng di Cukir, Kecamatan Diwek, Kabupaten Jombang—tempat peristirahatan Hadratussyaikh KH. Muhammad Hasyim Asy’ari (1871–1947 M) dan putranya Menteri Agama RI KH. Abdul Wahid Hasyim (1914–1953 M).',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1871–1947 M / 1287–1366 H)',
    province: 'Jawa Timur',
    city: 'Jombang',
    district: 'Kec. Diwek',
    address: 'Kompleks Pondok Pesantren Tebuireng, Jl. Irian Jaya No. 10, Desa Cukir, Kec. Diwek, Kabupaten Jombang',
    location: {
      lat: -7.6061,
      lng: 112.2392,
      address: 'Kompleks Pondok Pesantren Tebuireng, Jl. Irian Jaya No. 10, Desa Cukir, Kec. Diwek, Kabupaten Jombang',
      district: 'Kec. Diwek',
      city: 'Jombang',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Gus_Dur_Tebuireng.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Maqbarah Masyayikh Pondok Pesantren Tebuireng Jombang',
    sanad:
      'Putra KH. Asy’ari dan Nyai Hj. Halimah (keturunan Jaka Tingkir / Sultan Hadiwijaya Pajang); murid utama Syaichona Muhammad Kholil Bangkalan, KH. Sholeh Darat Semarang, KH. Ya’qub Siwalan Panji, serta para masyayikh Masjidil Haram Makkah: Syaikh Mahfudz At-Tarmasi (sanad Bukhari-Muslim), Syaikh Ahmad Khatib Al-Minangkabawi, dan Sayyid Abbas Al-Maliki.',
    karya: [
      'Pendirian Pondok Pesantren Tebuireng Jombang (1899) dan Jam’iyyah Nahdlatul Ulama (1926)',
      'Kitab Adabul ’Alim wal Muta’allim, Risalah Ahlussunnah wal Jama’ah, At-Tibyan fi an-Nahyi ’an Muqatha’atil Arham, dan Muqaddimah Qanun Asasi',
      'Fatwa Resolusi Jihad 22 Oktober 1945 yang menjadi landasan teologis pertempuran heroik 10 November 1945 di Surabaya',
    ],
    history:
      'Hadratussyaikh KH. Muhammad Hasyim Asy’ari (14 Februari 1871 – 25 Juli 1947 M / 24 Dzulqa’dah 1287 H – 7 Ramadhan 1366 H) lahir di Pesantren Gedang, Tambakrejo, Jombang dari pasangan KH. Asy’ari (ulama asal Demak) dan Nyai Hj. Halimah binti Kiai Utsman. Sejak usia 15 tahun, beliau mengembara menuntut ilmu ke berbagai pesantren utama di Jawa dan Madura—mulai dari Wonokoyo Probolinggo, Langitan Tuban, Tenggilis Surabaya, Siwalan Panji Sidoarjo (tempat beliau diambil menantu oleh KH. Ya’qub), Darat Semarang (KH. Sholeh Darat), hingga Bangkalan Madura (Syaichona Muhammad Kholil). Pada tahun 1892 M, beliau berangkat ke Makkah Al-Mukarramah dan bermukim selama tujuh tahun berguru kepada Syaikh Mahfudz At-Tarmasi (dari siapa beliau memperoleh sanad tertinggi *Shahih Bukhari*), Syaikh Ahmad Khatib Al-Minangkabawi, dan Syaikh Nawawi Al-Bantani.\n\nSekembalinya ke tanah air pada tahun 1899 M, KH. Hasyim Asy’ari beserta delapan santri pertamanya nekat membuka pesantren di Dusun Tebuireng, Desa Cukir, Kecamatan Diwek, Jombang—sebuah kawasan di dekat Pabrik Gula Cukir yang kala itu dikenal penuh tempat maksiat, perjudian, dan kejahatan. Berkat kesabaran, keteguhan riyadhah, dan ketinggian ilmu hadis beliau, Tebuireng berubah menjadi kiblat ilmu pesantren se-Nusantara yang melahirkan ribuan kiai pendiri pesantren. Setelah menerima restu Tongkat Musa dan Tasbih dari gurunya Syaichona Kholil Bangkalan melalui perantaraan KHR. As’ad Syamsul Arifin, Hadratussyaikh bersama KH. Abdul Wahab Chasbullah dan KH. Bisri Syansuri mendirikan *Jam’iyyah Nahdlatul Ulama* (NU) di Surabaya pada 31 Januari 1926 (16 Rajab 1344 H) dan menjabat sebagai *Rais Akbar*.\n\nDalam sejarah kemerdekaan Republik Indonesia, Hadratussyaikh menolak melakukan *Seikerei* (membungkuk ke arah Tokyo) hingga dipenjara dan disiksa oleh tentara Jepang pada tahun 1942. Puncak kontribusi kebangsaan beliau adalah pencetusan fatwa *Resolusi Jihad* pada 22 Oktober 1945 yang menetapkan kewajiban *fardhu ’ain* mempertahankan kemerdekaan RI dalam radius 94 km dari musuh. Beliau wafat pada malam 7 Ramadhan 1366 H (25 Juli 1947 M) setelah mendengar kabar agresi militer Belanda di Malang, dan dimakamkan di Kompleks Maqbarah Pondok Pesantren Tebuireng berdampingan dengan putranya, Pahlawan Nasional & Menteri Agama RI KH. Abdul Wahid Hasyim (perumus sila pertama Piagam Jakarta/Pancasila).',
    karomah: [
      'Dalam buku *Profil Pesantren Tebuireng* dan kesaksian para santri sepuh, karomah keilmuan dan kewalian Hadratussyaikh tampak sejak masa awal berdirinya Pesantren Tebuireng (1899–1904): ketika bilik pesantren dilempari batu dan tombak oleh para bromocorah yang terganggu aktivitas dakwah beliau, KH. Hasyim Asy’ari bersama sahabat-sahabatnya (termasuk Kiai Saleh Benda Kerep Cirebon) menghadapi gangguan tersebut dengan doa dan keteguhan hati hingga para pemimpin preman Tebuireng bertobat dan menjadi penjaga setia pesantren.<!--more-->\n\nTercatat pula peristiwa yang sangat masyhur dalam tradisi pesantren Nusantara ketika maha guru beliau, Syaichona Muhammad Kholil Bangkalan, datang secara tak terduga ke Tebuireng untuk ikut mengaji kitab *Shahih Bukhari* di hadapan muridnya sendiri, KH. Hasyim Asy’ari, sebagai pengakuan batin atas kemuliaan sanad hadis Hadratussyaikh.',
    ],
    untoldStory:
      'Di dalam Kompleks Maqbarah Tebuireng, pusara Hadratussyaikh KH. Hasyim Asy’ari berdampingan langsung dengan putra kebanggaannya, KH. Abdul Wahid Hasyim (1914–1953 M), yang pada usia 31 tahun menjadi anggota BPUPKI/Panitia Sembilan dan memelopori pendirian Perguruan Tinggi Agama Islam Negeri (cikal bakal UIN) serta modernisasi kurikulum Madrasah Nizhamiyah Tebuireng.<!--more-->\n\nDi sebelah barat kawasan Pondok Pesantren Tebuireng kini juga berdiri megah *Museum Islam Indonesia KH. Hasyim Asy’ari (MINHA)* yang menyimpan artefak sejarah masuknya Islam ke Nusantara, manuskrip kitab karya Hadratussyaikh, serta dokumentasi Resolusi Jihad 1945.',
    barokahHajat:
      'Peziarah, santri, dan pendidik yang berziarah ke maqbarah Hadratussyaikh KH. Hasyim Asy’ari dan KH. Abdul Wahid Hasyim di Tebuireng Jombang umumnya bertawassul memohon kepada Allah SWT keberkahan sanad ilmu hadis dan kitab kuning, adab kemuliaan seorang murid dan pengajar (*Adabul ’Alim wal Muta’allim*), serta semangat pengabdian bagi agama dan tanah air.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Hadratussyaikh KH. Hasyim Asy’ari & KH. Abdul Wahid Hasyim (Tebuireng)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ حَضْرَةِ الشَّيْخِ الرَّئِيسِ الْأَكْبَرِ كِيَاهِي الحَاجِّ مُحَمَّدْ هَاشِمْ أَشْعَرِيّ وَابْنِهِ الشَّيْخِ عَبْدِ الْوَاحِدِ هَاشِمْ تَبُوإِيرِينْغ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمَا وَجِهَادِهِمَا وَبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ حَضْرَةِ الشَّيْخِ الرَّئِيسِ الْأَكْبَرِ كِيَاهِي الحَاجِّ مُحَمَّدْ هَاشِمْ أَشْعَرِيّ وَابْنِهِ الشَّيْخِ عَبْدِ الْوَاحِدِ هَاشِمْ تَبُوإِيرِينْغ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمَا وَجِهَادِهِمَا وَبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Hadhratisy-Syaikhir-Ra-iisil-Akbar Kiyaahii al-Haajj Muhammad Haasyim Asy'arii wabnihisy-Syaikh 'Abdil-Waahid Haasyim Tebuireng Jombang syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihimaa wa jihaadihimaa wa barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Hadratussyaikh Rais Akbar KH. Muhammad Hasyim Asy’ari beserta putranya KH. Abdul Wahid Hasyim Tebuireng Jombang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, jihad, dan keberkahan keduanya di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Hadratussyaikh Rais Akbar KH. Muhammad Hasyim Asy’ari beserta putranya KH. Abdul Wahid Hasyim Tebuireng Jombang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, jihad, dan keberkahan keduanya di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Ramadhan (Pengajian Kitab Shahih Bukhari-Muslim setiap bulan Ramadhan yang ditutup dengan Haul Hadratussyaikh KH. Hasyim Asy’ari pada 7 Ramadhan di Pondok Pesantren Tebuireng Jombang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mematuhi jam buka-tutup gerbang Maqbarah Tebuireng (tutup saat waktu shalat fardhu berjamaah dan malam hari di luar jadwal khusus), serta menjaga ketenangan kegiatan belajar santri.',
    facilities: ['Kompleks Maqbarah Masyayikh Tebuireng', 'Masjid Ulul Albab & Masjid Jami’ Tebuireng', 'Museum Islam Indonesia KH. Hasyim Asy’ari (MINHA)', 'Terminal Parkir Bus Wisata Religi Kawasan Makam Gus Dur (KMGD) Cukir'],
    openingHours: '07.30 - 16.00 WIB & 19.30 - 21.00 WIB (Mengikuti jadwal tata tertib Maqbarah PP Tebuireng)',
    references: [
      'Khuluq, Lathiful (2000). Fajar Kebangunan Ulama: Biografi K.H. Hasyim Asy’ari. Yogyakarta: LKiS.',
      'Zuhri, KH. Saifuddin (1974). Guruku Orang-Orang dari Pesantren. Bandung: Al-Ma’arif.',
      'Dhofier, Zamakhsyari (1982). Tradisi Pesantren: Studi tentang Pandangan Hidup Kyai. Jakarta: LP3ES.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'gus-dur-tebuireng',
    name: 'Makam KH. Abdurrahman Wahid (Gus Dur) — Kompleks Pesantren Tebuireng, Jombang',
    title: 'Presiden ke-4 Republik Indonesia, Bapak Pluralisme & Waliyullah Kemanusiaan Nusantara',
    description:
      'Pusara KH. Abdurrahman Wahid / Gus Dur (1940–2009 M) di Kompleks Maqbarah Pondok Pesantren Tebuireng, Cukir, Diwek, Kabupaten Jombang—cucu Hadratussyaikh KH. Hasyim Asy’ari dan KH. Bisri Syansuri yang diziarahi jutaan lintas umat setiap tahun.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 – Awal Abad ke-21 M (1940–2009 M)',
    province: 'Jawa Timur',
    city: 'Jombang',
    district: 'Kec. Diwek',
    address: 'Kompleks Maqbarah Pondok Pesantren Tebuireng, Jl. Irian Jaya No. 10, Desa Cukir, Kec. Diwek, Kabupaten Jombang',
    location: {
      lat: -7.6062,
      lng: 112.2391,
      address: 'Kompleks Maqbarah Pondok Pesantren Tebuireng, Jl. Irian Jaya No. 10, Desa Cukir, Kec. Diwek, Kabupaten Jombang',
      district: 'Kec. Diwek',
      city: 'Jombang',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Gus_Dur_Tebuireng.jpg',
    imageSource: 'Wikimedia Commons — Pusara KH. Abdurrahman Wahid (Gus Dur) di Maqbarah Tebuireng Jombang',
    sanad:
      'Putra sulung KH. Abdul Wahid Hasyim dan Nyai Hj. Sholihah binti KH. Bisri Syansuri; cucu dari dua pendiri utama NU (KH. Hasyim Asy’ari Tebuireng dan KH. Bisri Syansuri Denanyar); menimba ilmu kepada KH. Chudlori Tegalrejo Magelang, KH. Ali Ma’shum Krapyak Yogyakarta, Pesantren Tambakberas, Universitas Al-Azhar Kairo, dan Universitas Baghdad.',
    karya: [
      'Kepemimpinan Ketua Umum Tanfidziyah PBNU tiga periode (1984–1999) dan Presiden ke-4 Republik Indonesia (1999–2001)',
      'Karya intelektual: Muslim di Tengah Pergumulan (1981), Tuhan Tidak Perlu Dibela (1999), Islamku Islam Anda Islam Kita (2006), dan Menggerakkan Tradisi',
      'Pengakuan hak-hak sipil masyarakat Tionghoa/Konghucu, perubahan nama Irian Jaya menjadi Papua, dan pembelaan konsisten terhadap kelompok minoritas',
    ],
    history:
      'KH. Abdurrahman Wahid—yang dikenal luas di seluruh dunia dengan panggilan akrab *Gus Dur* (7 September 1940 – 30 Desember 2009 M)—lahir di Denanyar, Jombang dengan nama Abdurrahman Addakhil. Dalam dirinya mengalir darah biru dua pendiri utama Nahdlatul Ulama sekaligus Pahlawan Nasional: dari jalur ayah beliau adalah cucu Hadratussyaikh KH. Hasyim Asy’ari (Tebuireng), dan dari jalur ibu beliau adalah cucu KH. Bisri Syansuri (Denanyar). Setelah ditempa di Pondok Pesantren API Tegalrejo Magelang (KH. Chudlori), Pesantren Krapyak Yogyakarta (KH. Ali Ma’shum), dan Pesantren Tambakberas Jombang (KH. Abdul Wahab Chasbullah), Gus Dur melanjutkan pengembaraan intelektual ke Universitas Al-Azhar Kairo (Mesir) dan Universitas Baghdad (Irak), di mana beliau melahap ribuan literatur turats Islam klasik sekaligus filsafat, sejarah, dan sastra dunia.\n\nPada Muktamar ke-27 NU di Situbondo tahun 1984, Gus Dur terpilih sebagai Ketua Umum Tanfidziyah PBNU mendampingi Rais Aam KH. Achmad Siddiq. Selama 15 tahun memimpin PBNU (1984–1999), beliau mentransformasikan pemikiran santri melalui gagasan *Pribumisasi Islam*, mendamaikan ketegangan antara Islam dan Pancasila, serta menjadikan pesantren sebagai benteng masyarakat sipil, demokrasi, dan hak asasi manusia. Pada masa transisi Reformasi Oktober 1999, Sidang Umum MPR RI memilih Gus Dur sebagai Presiden ke-4 Republik Indonesia (1999–2001).\n\nSebagai kepala negara maupun guru bangsa, Gus Dur meninggalkan warisan kemanusiaan yang abadi: mencabut Inpres No. 14/1967 sehingga warga Tionghoa bebas merayakan Imlek dan memeluk Konghucu, mengembalikan martabat kultural rakyat Papua dan Aceh dengan pendekatan dialog hati, serta membela kaum tertindas tanpa memandang suku maupun agama. Gus Dur wafat pada hari Rabu, 30 Desember 2009 M (13 Muharram 1431 H) di RSCM Jakarta dan dimakamkan di Kompleks Maqbarah Pondok Pesantren Tebuireng Jombang tepat di sisi utara pusara kakek dan ayahandanya.',
    karomah: [
      'Dalam kesaksian banyak ulama besar—termasuk Syaikhona KH. Maimoen Zubair Sarang, KH. Abdul Hamid Pasuruan, dan para habaib—di balik gaya humornya yang segar (*"Gitu aja kok repot"*) dan pemikirannya yang melampaui zaman, Gus Dur adalah seorang pengamal tarekat dan peziarah makam wali yang sangat *istiqamah* hingga sering melakukan perjalanan ziarah tengah malam ke makam-makam wali yang tersembunyi di pelosok Jawa dan luar Jawa.<!--more-->\n\nKaromah paling nyata dari Gus Dur terlihat justru setelah beliau wafat: pusara beliau yang sangat bersahaja (tanpa bangunan kubah mewah di atas liang lahatnya sesuai wasiat keluarga) setiap hari diziarahi oleh ribuan hingga puluhan ribu orang dari seluruh Nusantara, bahkan didoakan oleh lintas iman karena ketulusan kasih sayang beliau kepada sesama manusia semasa hidupnya.',
    ],
    untoldStory:
      'Di batu nisan pusara Gus Dur di Maqbarah Tebuireng, terpahat epitaf dalam empat bahasa (Indonesia, Arab, Inggris, dan Mandarin): *"Di Sini Beristirahat Pejuang Kemanusiaan / Here Rests a Humanist"* (*Huna يرقد نصير الإنسانية*). Epitaf ini mencerminkan pesan terkenal Gus Dur bahwa *"Yang lebih penting dari politik adalah kemanusiaan"*.<!--more-->\n\nKedatangan jutaan peziarah ke Makam Gus Dur dan Hadratussyaikh KH. Hasyim Asy’ari sejak tahun 2010 telah menghidupkan perekonomian ratusan pedagang kecil, pengrajin suvenir santri, dan warga Desa Cukir melalui penataan Kawasan Makam Gus Dur (KMGD) yang terintegrasi dengan Museum Islam Indonesia KH. Hasyim Asy’ari.',
    barokahHajat:
      'Peziarah yang berziarah ke pusara KH. Abdurrahman Wahid (Gus Dur) di Tebuireng Jombang umumnya bertawassul memohon kepada Allah SWT keluasan ilmu dan cakrawala berpikir, keikhlasan dalam membela kaum lemah (*mustadh’afin*), serta kedamaian dan kerukunan bangsa Indonesia.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Abdurrahman Wahid (Gus Dur) Tebuireng',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ نَصِيرِ الْإِنْسَانِيَّةِ كِيَاهِي الحَاجِّ عَبْدِ الرَّحْمَنِ وَاحِدْ (غُوسْ دُورْ) بْنِ عَبْدِ الْوَاحِدِ هَاشِمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْفُ عَنْهُ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ نَصِيرِ الْإِنْسَانِيَّةِ كِيَاهِي الحَاجِّ عَبْدِ الرَّحْمَنِ وَاحِدْ (غُوسْ دُورْ) بْنِ عَبْدِ الْوَاحِدِ هَاشِمْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْفُ عَنْهُ وَانْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Allaamatil-'Aarifi billaah Nashiiril-Insaaniyyah Kiyaahii al-Haajj 'Abdir-Rahmaan Waahid (Gus Dur) bin 'Abdil-Waahid Haasyim syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wa'fu 'anhu wanfa'naa bi 'uluumihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama arif billah pejuang kemanusiaan KH. Abdurrahman Wahid (Gus Dur) bin Abdul Wahid Hasyim, Al-Fatihah. Ya Allah, ampunilah, rahmatilah, dan maafkanlah beliau, serta limpahkanlah kemanfaatan melalui ilmu dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama arif billah pejuang kemanusiaan KH. Abdurrahman Wahid (Gus Dur) bin Abdul Wahid Hasyim, Al-Fatihah. Ya Allah, ampunilah, rahmatilah, dan maafkanlah beliau, serta limpahkanlah kemanfaatan melalui ilmu dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Akhir bulan Desember / 30 Desember (Puncak Haul Akbar KH. Abdurrahman Wahid / Gus Dur di Pondok Pesantren Tebuireng Jombang & Ciganjur Jakarta).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti jalur lorong peziarah dari Terminal Parkir KMGD menuju pelataran Maqbarah Tebuireng, serta tidak mengambil tanah atau menaburkan benda yang dilarang pengelola pesantren.',
    facilities: ['Pelataran Maqbarah Gus Dur & Masyayikh Tebuireng', 'Masjid Ulul Albab Tebuireng', 'Museum Islam Indonesia KH. Hasyim Asy’ari (MINHA)', 'Sentra Kuliner & Parkir Bus Kawasan Makam Gus Dur (KMGD)'],
    openingHours: '07.30 - 16.00 WIB & 19.30 - 21.00 WIB (Mengikuti jadwal tata tertib Maqbarah PP Tebuireng)',
    references: [
      'Barton, Greg (2002). Gus Dur: The Authorized Biography of Abdurrahman Wahid. Equinox Publishing / LKiS.',
      'Wahid, Abdurrahman (2006). Islamku, Islam Anda, Islam Kita. Jakarta: The Wahid Institute.',
      'Bruinessen, Martin van (1994). NU: Tradisi, Relasi-Relasi Kuasa, Pencarian Wacana Baru. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-wahab-chasbullah',
    legacyId: 'ulama-16',
    name: 'Makam KH. Abdul Wahab Chasbullah (Bahrul Ulum Tambakberas, Jombang)',
    title: 'Pahlawan Nasional, Penggerak Utama Pendirian NU & Pencipta Syubbanul Wathan (Ya Lal Wathan)',
    description:
      'Maqbarah Pahlawan Nasional KH. Abdul Wahab Chasbullah (1888–1971 M) di Kompleks Pondok Pesantren Bahrul Ulum Tambakberas, Kecamatan Jombang, Kabupaten Jombang—inisiator Komite Hijaz, Nahdlatul Wathan, dan Rais Aam PBNU.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1888–1971 M / 1305–1391 H)',
    province: 'Jawa Timur',
    city: 'Jombang',
    district: 'Kec. Jombang',
    address: 'Kompleks Pemakaman Pondok Pesantren Bahrul Ulum, Dusun Tambakberas, Desa Tambakrejo, Kec. Jombang, Kabupaten Jombang',
    location: {
      lat: -7.5153,
      lng: 112.2336,
      address: 'Kompleks Pemakaman Pondok Pesantren Bahrul Ulum, Dusun Tambakberas, Desa Tambakrejo, Kec. Jombang, Kabupaten Jombang',
      district: 'Kec. Jombang',
      city: 'Jombang',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Gus_Dur_Tebuireng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Jombang (Kompleks Maqbarah KH. Abdul Wahab Chasbullah PP Bahrul Ulum Tambakberas)',
    sanad:
      'Putra KH. Chasbullah Said (pengasuh Pesantren Tambakberas) dan Nyai Hj. Latifah; cicit Kiai Abdussalam (Mbah Shoichah, pendiri Pesantren Selawe/Tambakberas); murid utama Syaichona Muhammad Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, serta Syaikh Mahfudz At-Tarmasi dan Syaikh Sa’id Al-Yamani di Makkah.',
    karya: [
      'Pendirian Nahdlatul Wathan (1916), Taswirul Afkar (1918), Nahdlatut Tujjar (1918), Komite Hijaz, dan Nahdlatul Ulama (1926)',
      'Penciptaan mars patriotik santri Syubbanul Wathan ("Ya Lal Wathan - Hubbul Wathan minal Iman", 1934)',
      'Kepemimpinan sebagai Rais Aam Syuriyah PBNU (1947–1971) dan Panglima Laskar Mujahidin/Hizbullah',
    ],
    history:
      'KH. Abdul Wahab Chasbullah—yang akrab disapa *Mbah Wahab* (31 Maret 1888 – 29 Desember 1971 M)—lahir di Pesantren Tambakberas, Jombang dari pasangan KH. Chasbullah Said dan Nyai Hj. Latifah. Leluhur beliau adalah Kiai Abdussalam (*Mbah Shoichah*), panglima prajurit Pangeran Diponegoro yang mendirikan Pesantren Selawe (cikal bakal Pondok Pesantren Bahrul Ulum Tambakberas) pada tahun 1825 M. Sejak muda, Kiai Wahab mengembara menuntut ilmu ke Pesantren Langitan Tuban, Mojosari Nganjuk, Tawangsari Sepanjang, Bangkalan Madura (di bawah asuhan langsung Syaichona Muhammad Kholil), Tebuireng Jombang (menjadi lurah pondok kepercayaan Hadratussyaikh KH. Hasyim Asy’ari), hingga bermukim selama lima tahun di Makkah Al-Mukarramah (1909–1914 M).\n\nDi Makkah, Kiai Wahab mendirikan cabang *Sarekat Islam* bersama KH. Mas Mansur dan mengasah keahlian diplomasi serta pergerakan. Sekembalinya ke Surabaya dan Jombang pada tahun 1914, beliau memelopori kebangkitan intelektual dan ekonomi kaum santri melalui pendirian kelompok diskusi *Taswirul Afkar*, madrasah kebangsaan *Nahdlatul Wathan* (1916), dan koperasi *Nahdlatut Tujjar* (1918). Ketika Raja Ibnu Saud menguasai Hijaz pada tahun 1924 dan mengancam kebebasan bermazhab serta kelestarian situs sejarah di Makkah-Madinah, Kiai Wahab membentuk *Komite Hijaz* yang kemudian bertransformasi menjadi *Jam’iyyah Nahdlatul Ulama* pada 31 Januari 1926. Dalam perumpamaan sejarah NU, jika Hadratussyaikh KH. Hasyim Asy’ari adalah ideolog dan pengambil keputusan tertinggi, maka Kiai Wahab adalah motor penggerak, organisator, dan diplomat ulungnya.\n\nSetelah wafatnya Hadratussyaikh pada tahun 1947, KH. Abdul Wahab Chasbullah mengemban amanah sebagai *Rais Aam Syuriyah PBNU* selama hampir seperempat abad (1947–1971 M). Beliau wafat pada tanggal 29 Desember 1971 (12 Dzulqa’dah 1391 H) empat hari setelah memimpin Muktamar ke-25 NU di Surabaya, dan dimakamkan di Kompleks Pemakaman Keluarga Pondok Pesantren Bahrul Ulum Tambakberas, Jombang. Atas jasa besarnya, Pemerintah RI menganugerahkan gelar Pahlawan Nasional pada tahun 2014.',
    karomah: [
      'Dalam tradisi pesantren Nusantara, KH. Abdul Wahab Chasbullah dikenal sebagai *"Macan Bahtsul Masail"* dan ahli *ushul fiqh* yang kecerdasan argumennya tiada tanding, sekaligus pendekar silat yang menguasai ilmu kanuragan tingkat tinggi sejak masa nyantri di Bangkalan. Ketika utusan Komite Hijaz berdialog langsung dengan Raja Abdul Aziz bin Abdurrahman Al-Saud di Makkah pada tahun 1928, ketajaman diplomasi yang dirancang Kiai Wahab berhasil meluluhkan hati penguasa Arab Saudi sehingga makam-makam bersejarah dan kebebasan bermazhab tetap dihormati.<!--more-->\n\nMars perjuangan gubahan beliau, *Syubbanul Wathan* (*"Ya Lal Wathan Ya Lal Wathan, Hubbul Wathan minal Iman"*), yang diciptakan pada tahun 1934 terbukti memiliki daya ruhani luar biasa yang terus membakar semangat cinta tanah air jutaan santri dari era perang kemerdekaan 1945 hingga abad ke-21.',
    ],
    untoldStory:
      'Pondok Pesantren Bahrul Ulum Tambakberas adalah salah satu pesantren tertua di Jawa Timur (berdiri tahun 1825 M) yang melahirkan banyak ulama besar dan tokoh bangsa, termasuk KH. Abdurrahman Wahid (Gus Dur) dan paman sekaligus mertua Kiai Wahab, KH. Fattah Hasyim (pendiri Madrasah Muallimin/Muallimat Bahrul Ulum).<!--more-->\n\nDi Kompleks Maqbarah Tambakberas, selain pusara KH. Abdul Wahab Chasbullah, peziarah juga dapat berziarah ke makam ayahandanya KH. Chasbullah Said serta makam leluhur pendiri Tambakberas, Kiai Abdussalam (Mbah Shoichah) dan Kiai Utsman (kakek dari Hadratussyaikh KH. Hasyim Asy’ari).',
    barokahHajat:
      'Peziarah, aktivis pergerakan, dan santri yang berziarah ke maqbarah KH. Abdul Wahab Chasbullah di Tambakberas Jombang umumnya bertawassul memohon kepada Allah SWT kecerdasan berpikir dan ketangkasan berorganisasi, keberanian dalam memperjuangkan kebenaran, serta kecintaan yang tulus kepada agama dan tanah air.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Abdul Wahab Chasbullah (Tambakberas Jombang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُجَاهِدِ الْعَلَّامَةِ الرَّئِيسِ الْعَامِّ كِيَاهِي الحَاجِّ عَبْدِ الْوَهَّابْ حَسْبُ اللهِ تَامْبَاكْبَرَاسْ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَهِمَّتِهِ وَجِهَادِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْمُجَاهِدِ الْعَلَّامَةِ الرَّئِيسِ الْعَامِّ كِيَاهِي الحَاجِّ عَبْدِ الْوَهَّابْ حَسْبُ اللهِ تَامْبَاكْبَرَاسْ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَهِمَّتِهِ وَجِهَادِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Mujaahidil-'Allaamatir-Ra-iisil-'Aam Kiyaahii al-Haajj 'Abdil-Wahhaab Hasbullaah Tambakberas Jombang syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihii wa himmatihii wa jihaadihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang Rais Aam KH. Abdul Wahab Chasbullah Tambakberas Jombang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, semangat juang, dan jihad beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang Rais Aam KH. Abdul Wahab Chasbullah Tambakberas Jombang, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, semangat juang, dan jihad beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '12–13 Dzulqa’dah (Puncak Haul Akbar Tahunan KH. Abdul Wahab Chasbullah di Pondok Pesantren Bahrul Ulum Tambakberas, Kecamatan Jombang, Kabupaten Jombang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melapor pada petugas pos keamanan santri PP Bahrul Ulum Tambakberas, serta menjaga ketertiban dan adab selama berada di kompleks pemakaman keluarga pesantren.',
    facilities: ['Kompleks Maqbarah KH. Abdul Wahab Chasbullah & Masyayikh Tambakberas', 'Masjid Jami’ Bahrul Ulum Tambakberas', 'Ndalem Kasepuhan Tambakberas', 'Area Parkir Bus Wisata Religi Tambakberas Jombang'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib kunjungan pesantren)',
    references: [
      'Zuhri, KH. Saifuddin (1983). Berangkat dari Pesantren. Jakarta: Gunung Agung.',
      'Fealy, Greg (2003). Ijtihad Politik Ulama: Sejarah NU 1952–1967. Yogyakarta: LKiS.',
      'Tim PBNU & PP Bahrul Ulum (2014). Biografi Perjuangan Pahlawan Nasional KH. Abdul Wahab Chasbullah.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-bisri-syansuri',
    legacyId: 'ulama-17',
    name: 'Makam KH. Bisri Syansuri (Mamba’ul Ma’arif Denanyar, Jombang)',
    title: 'Pendiri Pesantren Mamba’ul Ma’arif Denanyar, Pelopor Pesantren Putri & Rais Aam PBNU',
    description:
      'Maqbarah KH. Bisri Syansuri (1886–1980 M) di Kompleks Pondok Pesantren Mamba’ul Ma’arif Denanyar, Kecamatan Jombang, Kabupaten Jombang—satu dari tiga serangkai pendiri NU, ahli fikih yang tegas, dan kakek dari Gus Dur.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1886–1980 M / 1304–1400 H)',
    province: 'Jawa Timur',
    city: 'Jombang',
    district: 'Kec. Jombang',
    address: 'Kompleks Pondok Pesantren Mamba’ul Ma’arif, Jl. KH. Bisri Syansuri, Desa Denanyar, Kec. Jombang, Kabupaten Jombang',
    location: {
      lat: -7.5378,
      lng: 112.2168,
      address: 'Kompleks Pondok Pesantren Mamba’ul Ma’arif, Jl. KH. Bisri Syansuri, Desa Denanyar, Kec. Jombang, Kabupaten Jombang',
      district: 'Kec. Jombang',
      city: 'Jombang',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Gus_Dur_Tebuireng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Jombang (Kompleks Maqbarah KH. Bisri Syansuri PP Mamba’ul Ma’arif Denanyar)',
    sanad:
      'Putra Kiai Syansuri dan Nyai Mariah asal Tayu, Pati (Jawa Tengah); murid KH. Sholeh Tayu, KH. Khalil Kasingan Rembang, Syaichona Muhammad Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, serta Syaikh Ahmad Khatib, Syaikh Syu’aib Daghistani, dan Syaikh Muhammad Baqir di Makkah; adik ipar KH. Abdul Wahab Chasbullah.',
    karya: [
      'Pendirian Pondok Pesantren Mamba’ul Ma’arif Denanyar Jombang (1917) dan pelopor pertama pembukaan kelas santri putri di pesantren Jawa Timur (1919)',
      'Kepemimpinan sebagai Kepala Staf Markas Oelama Djawa Timoer (MODT) 1945 dan Rais Aam Syuriyah PBNU (1971–1980)',
      'Perjuangan mempertahankan syariat Islam dalam pengesahan Undang-Undang Perkawinan No. 1 Tahun 1974 di DPR RI',
    ],
    history:
      'KH. Bisri Syansuri (18 September 1886 – 25 April 1980 M / 26 Dzulhijjah 1304 H – 9 Jumadil Akhir 1400 H) lahir di pesisir Tayu, Kabupaten Pati, Jawa Tengah dari pasangan Kiai Syansuri bin Abdusshomad dan Nyai Mariah. Sejak usia tujuh tahun beliau telah mengkhatamkan hafalan dan bacaan Al-Qur’an pada KH. Sholeh Tayu, kemudian belajar ilmu nahwu-sharaf dan fikih kepada KH. Abdulop Kasingan Rembang, Syaichona Muhammad Kholil di Bangkalan Madura, serta selama enam tahun kepada Hadratussyaikh KH. Hasyim Asy’ari di Pondok Pesantren Tebuireng Jombang. Di Tebuireng inilah beliau bersahabat karib dengan KH. Abdul Wahab Chasbullah dan kemudian menikahi adik kandung Kiai Wahab, yakni Nyai Hj. Nur Khadijah Chasbullah, saat bersama-sama menunaikan ibadah haji dan menuntut ilmu di Makkah Al-Mukarramah (1912–1914 M).\n\nSekembalinya ke Jombang, atas saran mertuanya KH. Chasbullah Said, Kiai Bisri membuka lahan baru di sebelah barat Kota Jombang dan mendirikan Pondok Pesantren Mamba’ul Ma’arif di Desa Denanyar pada tahun 1917 M. Terobosan bersejarah yang dilakukan KH. Bisri Syansuri bersama istrinya Nyai Hj. Nur Khadijah adalah mendirikan asrama dan madrasah khusus *santri putri* pada tahun 1919 M—sebuah langkah progresif yang belum pernah dilakukan oleh pesantren tradisional mana pun di Jawa Timur kala itu karena pendidikan pesantren sebelumnya hanya diperuntukkan bagi santri laki-laki.\n\nSebagai satu dari *Tiga Serangkai* pendiri Nahdlatul Ulama (bersama KH. Hasyim Asy’ari dan KH. Abdul Wahab Chasbullah), KH. Bisri Syansuri dikenal sebagai ahli *fiqh* (*faqih*) yang sangat memegang teguh kemurnian hukum syariat (*wara’* dan *ihtiyath*). Setelah wafatnya Kiai Wahab pada akhir tahun 1971, KH. Bisri Syansuri menjabat sebagai *Rais Aam Syuriyah PBNU* (1971–1980 M) dan memimpin perjuangan konstitusional di parlemen pada tahun 1973–1974 sehingga RUU Perkawinan direvisi menjadi UU No. 1 Tahun 1974 yang selaras dengan hukum perkawinan agama. Beliau wafat pada hari Jumat sore, 25 April 1980 (9 Jumadil Akhir 1400 H) dalam usia 93 tahun dan dimakamkan di Kompleks Maqbarah Pondok Pesantren Mamba’ul Ma’arif Denanyar, Jombang.',
    karomah: [
      'Dalam tradisi pesantren Jombang, hubungan antara dua ipar pendiri NU—KH. Abdul Wahab Chasbullah (Tambakberas) yang luwes dalam kaidah *ushul fiqh* dan KH. Bisri Syansuri (Denanyar) yang sangat ketat memegang teks *fiqh* mazhab Syafi’i—adalah teladan terindah perbedaan pendapat ulama yang penuh berkah: keduanya sering berdebat ilmiah secara sengit dalam forum *Bahtsul Masail*, namun begitu sidang selesai keduanya kembali berpelukan, saling mencium tangan, dan makan bersama dalam satu nampan.<!--more-->\n\nKeteguhan sikap (*istiqamah*) dan sifat *wara’* KH. Bisri Syansuri juga tampak ketika di masa tuanya sebagai anggota DPR RI dan Rais Aam PBNU, beliau tetap mengajar kitab kuning setiap pagi kepada para santri di Denanyar serta berhasil menghentikan draf pasal-pasal sekuler dalam RUU Perkawinan 1973 hanya dengan wibawa dan ketulusan doanya.',
    ],
    untoldStory:
      'Dari pernikahan KH. Bisri Syansuri dan Nyai Hj. Nur Khadijah lahir putri sulung bernama Nyai Hj. Sholihah yang dinikahkan dengan putra Hadratussyaikh KH. Hasyim Asy’ari, yakni KH. Abdul Wahid Hasyim. Di rumah kakeknya di Pesantren Denanyar inilah KH. Abdurrahman Wahid (Gus Dur) dilahirkan pada tahun 1940 dan menghabiskan masa kanak-kanaknya.<!--more-->\n\nDi Kompleks Maqbarah PP Mamba’ul Ma’arif Denanyar, pusara KH. Bisri Syansuri berdampingan dengan makam istrinya Nyai Hj. Nur Khadijah serta putra beliau KH. Abdul Aziz Bisri, terletak tepat di belakang Masjid Jami’ Pondok Pesantren Mamba’ul Ma’arif Denanyar.',
    barokahHajat:
      'Peziarah, santri putra-putri, dan pengkaji hukum Islam yang berziarah ke maqbarah KH. Bisri Syansuri di Denanyar Jombang umumnya bertawassul memohon kepada Allah SWT keteguhan memegang prinsip agama (*wara’*), keberkahan ilmu fikih, serta kemuliaan pendidikan bagi kaum perempuan dan keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Bisri Syansuri & Nyai Hj. Nur Khadijah (Denanyar Jombang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْفَقِيهِ الْوَرِعِ الرَّئِيسِ الْعَامِّ كِيَاهِي الحَاجِّ بِشْرِي شَنْصُورِي وَزَوْجَتِهِ نْيَائِي الحَاجَّةِ نُورْ خَدِيجَةَ دِينَانْيَارْ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا فِقْهًا فِي الدِّينِ وَوَرَعًا وَاسْتِقَامَةً فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْفَقِيهِ الْوَرِعِ الرَّئِيسِ الْعَامِّ كِيَاهِي الحَاجِّ بِشْرِي شَنْصُورِي وَزَوْجَتِهِ نْيَائِي الحَاجَّةِ نُورْ خَدِيجَةَ دِينَانْيَارْ جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا فِقْهًا فِي الدِّينِ وَوَرَعًا وَاسْتِقَامَةً فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Faqiihil-Wari'ir-Ra-iisil-'Aam Kiyaahii al-Haajj Bisyrii Syanshuurii wa zaujatihii Nyaa-ii al-Haajjah Nuur Khadiijah Denanyar Jombang syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa fiqhan fid-diini wa wara'an wastiqaamatan fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama ahli fikih yang wara’ Rais Aam KH. Bisri Syansuri beserta istrinya Nyai Hj. Nur Khadijah Denanyar Jombang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kefahaman dalam agama, sifat wara’, dan keistiqamahan di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama ahli fikih yang wara’ Rais Aam KH. Bisri Syansuri beserta istrinya Nyai Hj. Nur Khadijah Denanyar Jombang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kefahaman dalam agama, sifat wara’, dan keistiqamahan di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '9 Jumadil Akhir / Akhir bulan April (Puncak Haul Akbar Tahunan KH. Bisri Syansuri & Nyai Hj. Nur Khadijah di Pondok Pesantren Mamba’ul Ma’arif Denanyar, Kecamatan Jombang, Kabupaten Jombang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, memisahkan jalur duduk peziarah putra dan putri di serambi maqbarah sesuai ketertiban ketat Pesantren Denanyar, serta menjaga ketenangan saat jam belajar santri.',
    facilities: ['Cungkup Maqbarah KH. Bisri Syansuri di Belakang Masjid Jami’ Denanyar', 'Masjid Jami’ Pondok Pesantren Mamba’ul Ma’arif Denanyar', 'Area Parkir Bus Wisata Religi Denanyar Jombang'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib kunjungan pesantren)',
    references: [
      'Azizah, Siti (2010). K.H. Bisri Syansuri: Pecinta Fiqh Sepanjang Hayat. Surabaya: Lajnah Ta’lif wan Nasyr NU Jawa Timur.',
      'Dhofier, Zamakhsyari (1982). Tradisi Pesantren: Studi tentang Pandangan Hidup Kyai. Jakarta: LP3ES.',
      'Feillard, Andrée (1999). NU vis-à-vis Negara. Yogyakarta: LKiS.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-romly-tamim-rejoso',
    legacyId: 'ulama-18',
    name: 'Makam KH. Romly Tamim & Masyayikh Darul ’Ulum (Rejoso, Peterongan, Jombang)',
    title: 'Mursyid Agung Thariqah Qadiriyah wa Naqsyabandiyah & Penyusun Wirid Istighotsah',
    description:
      'Kompleks Maqbarah Masyayikh Pondok Pesantren Darul ’Ulum di Rejoso, Kecamatan Peterongan, Kabupaten Jombang—tempat peristirahatan KH. Tamim Irsyad, KH. Cholil, dan mursyid besar KH. Romly Tamim (1888–1958 M) penyusun kitab wirid *Al-Istighatsah bi Hadhrati Rabbil Bariyyah*.',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1888–1958 M / 1306–1377 H)',
    province: 'Jawa Timur',
    city: 'Jombang',
    district: 'Kec. Peterongan',
    address: 'Kompleks Pondok Pesantren Darul ’Ulum, Desa Rejoso, Kec. Peterongan, Kabupaten Jombang',
    location: {
      lat: -7.5475,
      lng: 112.2752,
      address: 'Kompleks Pondok Pesantren Darul ’Ulum, Desa Rejoso, Kec. Peterongan, Kabupaten Jombang',
      district: 'Kec. Peterongan',
      city: 'Jombang',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Gus_Dur_Tebuireng.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Jombang (Kompleks Maqbarah Masyayikh PP Darul ’Ulum Rejoso Peterongan)',
    sanad:
      'Putra KH. Tamim Irsyad (pendiri PP Darul ’Ulum Rejoso asal Bangkalan Madura); murid dari Syaichona Muhammad Kholil Bangkalan, Hadratussyaikh KH. Hasyim Asy’ari Tebuireng, serta menerima baiat dan kemursyidan Thariqah Qadiriyah wa Naqsyabandiyah dari kakak iparnya KH. Cholil Rejoso (murid Syaikh Ahmad Hasbullah bin Muhammad Madura di Makkah yang bersambung ke Syaikh Ahmad Khatib Sambas).',
    karya: [
      'Penyusunan kitab wirid fenomenal Al-Istighatsah bi Hadhrati Rabbil Bariyyah (1951) yang diamalkan jutaan warga Nahdliyin se-Nusantara',
      'Kitab Tsamratul Fikriyah (risalah silsilah dan kaifiyah Thariqah Qadiriyah wa Naqsyabandiyah)',
      'Pengembangan pusat kemursyidan Thariqah Qadiriyah wa Naqsyabandiyah (TQN) Al-Utsmaniyah / Rejoso Jombang',
    ],
    history:
      'Pondok Pesantren Darul ’Ulum di Desa Rejoso, Kecamatan Peterongan, Kabupaten Jombang didirikan pada tahun 1885 M oleh Kiai Tamim Irsyad (ulama asal Bangkalan Madura yang merupakan murid kepercayaan Syaichona Kholil) bersama menantunya, Kiai Cholil (asal Demak). Putra ketiga Kiai Tamim Irsyad adalah KH. Muhammad Romly Tamim (1888–1958 M), sosok ulama sufi dan mursyid besar yang mengharumkan nama Rejoso sebagai pusat *Thariqah Qadiriyah wa Naqsyabandiyah (TQN)* terbesar di Jawa Timur. Sejak kecil Kiai Romly belajar kepada ayahandanya dan kakak iparnya Kiai Cholil di Rejoso, kemudian nyantri kepada Syaichona Muhammad Kholil di Bangkalan Madura dan Hadratussyaikh KH. Hasyim Asy’ari di Tebuireng (di mana beliau juga dipercaya mengajar santri senior seperti KH. Abdul Wahid Hasyim).\n\nSetelah wafatnya KH. Cholil Rejoso pada tahun 1937 M, kepemimpinan Pondok Pesantren Darul ’Ulum dan kemursyidan Thariqah Qadiriyah wa Naqsyabandiyah dilanjutkan oleh KH. Romly Tamim bersama adiknya KH. Dahlan Kholil. Di bawah bimbingan ruhani Kiai Romly, pengamalan dzikir *Lathaif* dan *Khataman* tarekat berkembang pesat menjangkau ratusan ribu jamaah di seluruh Jawa Timur, Jawa Tengah, hingga luar Jawa. Di antara murid-murid utama beliau yang kemudian diangkat menjadi khalifah/mursyid besar adalah KH. Muhammad Utsman Al-Ishaqi (Jatipurwo Surabaya / Kedinding) dan putra beliau sendiri, KH. Musta’in Romly.\n\nWarisan abadi KH. Romly Tamim bagi umat Islam Indonesia adalah kitab kecil yang sangat dahsyat pengaruhnya, yakni *Al-Istighatsah bi Hadhrati Rabbil Bariyyah* yang beliau susun pada tahun 1951 M (1370 H). Rangkaian dzikir Istighotsah karya Kiai Romly Tamim inilah yang hingga hari ini menjadi bacaan resmi dalam setiap acara *Istighotsah Kubro* Nahdlatul Ulama dan pesantren-pesantren di seluruh Indonesia. KH. Romly Tamim wafat pada 16 Ramadhan 1377 H (6 April 1958 M) dan dimakamkan di Kompleks Maqbarah Masyayikh Pondok Pesantren Darul ’Ulum Rejoso, Peterongan, Jombang.',
    karomah: [
      'Dalam riwayat masyayikh Rejoso dan kesaksian para pengamal tarekat, rangkaian kalimat dzikir dalam kitab *Al-Istighatsah bi Hadhrati Rabbil Bariyyah* disusun oleh KH. Romly Tamim melalui *riyadhah* puasa dan khalwat yang sangat berat di masa genting pasca-kemerdekaan (1950–1951 M) ketika bangsa Indonesia dilanda berbagai pemberontakan dan kekacauan keamanan; atas izin Allah SWT, setiap majelis yang mengamalkan Istighotsah tersebut merasakan ketenangan batin dan pertolongan dari marabahaya.<!--more-->\n\nKetinggian adab dan kerendahan hati (*tawadhu’*) Kiai Romly Tamim juga terekam ketika beliau menikah dengan Nyai Siti Maisaroh (putri Hadratussyaikh KH. Hasyim Asy’ari); saking hormatnya kepada sang guru sekaligus mertuanya, Kiai Romly tidak pernah berani duduk sejajar di atas kursi di hadapan Hadratussyaikh.',
    ],
    untoldStory:
      'Jejak empat poros pesantren besar di Kabupaten Jombang—Tebuireng (Selatan/Hadis), Tambakberas (Utara/Ushul Fiqh), Denanyar (Barat/Fiqh), dan Rejoso (Timur/Tasawuf-Tarekat)—membentuk harmoni keilmuan Islam Nusantara yang paripurna antara syariat dan hakikat.<!--more-->\n\nDi Kompleks Maqbarah Islam Pondok Pesantren Darul ’Ulum Rejoso (yang terletak di sebelah barat daya kampus utama pesantren dan Universitas Darul ’Ulum), peziarah dapat berziarah sekaligus ke pusara KH. Tamim Irsyad, KH. Cholil Juraimi, KH. Romly Tamim, KH. Musta’in Romly, dan KH. As’ad Umar.',
    barokahHajat:
      'Peziarah dan jamaah tarekat yang berziarah ke maqbarah KH. Romly Tamim di Rejoso Peterongan Jombang umumnya bertawassul memohon kepada Allah SWT kejernihan kalbu (*tazkiyatun nafs*), ketekunan berdzikir dan kemustajaban doa melalui wasilah Istighotsah, serta ketentraman keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Romly Tamim & Masyayikh Darul ’Ulum (Rejoso Jombang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ تَمِيمْ إِرْشَادْ وَالشَّيْخِ خَلِيلْ وَالْعَارِفِ بِاللهِ الْمُرْشِدِ كِيَاهِي الحَاجِّ مُحَمَّدْ رَمْلِي تَمِيمْ رِيجُوسُو جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا بِذِكْرِكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ تَمِيمْ إِرْشَادْ وَالشَّيْخِ خَلِيلْ وَالْعَارِفِ بِاللهِ الْمُرْشِدِ كِيَاهِي الحَاجِّ مُحَمَّدْ رَمْلِي تَمِيمْ رِيجُوسُو جُومْبَانْغ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا بِذِكْرِكَ وَانْفَعْنَا بِأَسْرَارِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh Tamiim Irsyaad wasy-Syaikh Khaliil wal-'Aarifi billaahil-Mursyid Kiyaahii al-Haajj Muhammad Ramlii Tamiim Rejoso Jombang syai-un lillaahi lahumul-Faatihah. Allaahumma nawwir quluubanaa bi dzikrika wanfa'naa bi asraarihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Tamim Irsyad, KH. Cholil, dan al-arif billah sang mursyid KH. Muhammad Romly Tamim Rejoso Jombang, Al-Fatihah. Ya Allah, terangilah hati kami dengan dzikir kepada-Mu dan limpahkanlah kemanfaatan melalui rahasia hikmah serta keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Tamim Irsyad, KH. Cholil, dan al-arif billah sang mursyid KH. Muhammad Romly Tamim Rejoso Jombang, Al-Fatihah. Ya Allah, terangilah hati kami dengan dzikir kepada-Mu dan limpahkanlah kemanfaatan melalui rahasia hikmah serta keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '15–16 Ramadhan (Puncak Haul Akbar KH. Romly Tamim & Masyayikh Thariqah Qadiriyah wa Naqsyabandiyah di Pondok Pesantren Darul ’Ulum Rejoso, Kecamatan Peterongan, Kabupaten Jombang).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga kekhusyukan jamaah yang sedang mengamalkan wirid *Khataman Khawajagan* dan *Istighotsah* di pendopo maqbarah, serta mengikuti arahan petugas keamanan Pondok Pesantren Darul ’Ulum.',
    facilities: ['Pendopo & Cungkup Maqbarah Masyayikh Darul ’Ulum Rejoso', 'Masjid Induk Pondok Pesantren Darul ’Ulum', 'Kantor Pusat Thariqah Qadiriyah wa Naqsyabandiyah Rejoso', 'Area Parkir Bus Wisata Religi Rejoso Peterongan'],
    openingHours: 'Buka 24 Jam (Dengan pengawasan pos keamanan pesantren)',
    references: [
      'Tamim, KH. Muhammad Romly (1951). Al-Istighatsah bi Hadhrati Rabbil Bariyyah. Jombang: PP Darul ’Ulum Rejoso.',
      'Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Bandung: Mizan.',
      'Mulyati, Sri (2005). Mengenal dan Memahami Tarekat-Tarekat Muktabarah di Indonesia. Jakarta: Kencana.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-jumadil-kubro-troloyo',
    legacyId: 'auliya-10',
    name: 'Makam Syekh Jumadil Kubro & Kompleks Makam Islam Kuno Troloyo (Trowulan, Mojokerto)',
    title: 'Maha Guru Leluhur Wali Songo & Bukti Komunitas Muslim di Jantung Ibu Kota Majapahit Abad ke-14',
    description:
      'Kompleks Cagar Budaya Makam Troloyo di Desa Sentonorejo, Kecamatan Trowulan, Kabupaten Mojokerto—situs makam Syekh Jumadil Kubro (Sayyid Jamaluddin Al-Husaini Al-Akbar) dan puluhan batu nisan bertarikh Saka/Hijriah dari abad ke-14 hingga ke-15 M di pusat Kerajaan Majapahit.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-14 – Abad ke-15 M (Era Kejayaan Majapahit / 1376–1475 M)',
    province: 'Jawa Timur',
    city: 'Mojokerto',
    district: 'Kec. Trowulan',
    address: 'Dusun Sidodadi, Desa Sentonorejo, Kec. Trowulan, Kabupaten Mojokerto',
    location: {
      lat: -7.5718,
      lng: 112.3821,
      address: 'Dusun Sidodadi, Desa Sentonorejo, Kec. Trowulan, Kabupaten Mojokerto',
      district: 'Kec. Trowulan',
      city: 'Mojokerto',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Kompleks Makam Islam Kuno Troloyo Trowulan Mojokerto',
    sanad:
      'Sayyid Jamaluddin Al-Akbar Al-Husaini (Syekh Jumadil Kubro), ulama sufi keturunan Rasulullah SAW dari jalur Sayyidina Husain dan Imam Ali Zainal Abidin; ayahanda dari Syekh Ibrahim Asmorokondi (Tuban), Syekh Maulana Ishaq (Lamongan), dan Maulana Abdullah Asy’ari (Sunan Bejagung); kakek dari Sunan Ampel dan Sunan Giri.',
    karya: [
      'Perintisan dakwah Islam di kalangan bangsawan istana Kerajaan Majapahit (Trowulan) pada masa Prabu Hayam Wuruk dan Wikramawardhana',
      'Leluhur genealogis dan intelektual jaringan Wali Songo di Pulau Jawa',
      'Warisan epigrafi Nisan Troloyo berangka tahun Saka (1298–1397 Saka / 1376–1475 M) bertuliskan ayat Al-Qur’an dan kalimat tauhid',
    ],
    history:
      'Kompleks Makam Troloyo di Desa Sentonorejo, Kecamatan Trowulan, Kabupaten Mojokerto merupakan salah satu situs arkeologi Islam paling penting di Asia Tenggara. Terletak hanya sekitar 2 kilometer di sebelah selatan bekas pusat keraton Kerajaan Majapahit, situs ini membuktikan secara ilmiah bahwa sejak puncak kejayaan Majapahit di bawah pemerintahan Prabu Hayam Wuruk (1350–1389 M) dan Mahapatih Gajah Mada, telah hidup komunitas bangsawan dan ulama Muslim yang berdampingan secara damai di jantung ibu kota kerajaan Hindu-Buddha tersebut.\n\nTokoh sentral yang diziarahi di Kompleks Makam Troloyo adalah **Syekh Jumadil Kubro** (*Sayyid Jamaluddin Al-Akbar Al-Husaini*, abad ke-14 M). Dalam naskah-naskah babad Jawa (*Babad Tanah Jawi*, *Serat Kandha*), lontar Makassar (*Lontara Wajo*), dan silsilah pesantren Nusantara, Syekh Jumadil Kubro dicatat sebagai maha guru dan leluhur utama para Wali Songo: beliau adalah ayah dari Syekh Ibrahim Asmorokondi (ayah Sunan Ampel) dan Syekh Maulana Ishaq (ayah Sunan Giri). Karena jejak dakwah beliau yang melintasi Samudra Hindia hingga Jawa dan Sulawesi, terdapat beberapa situs makam maupun *petilasan* (*maqam*) yang dihubungkan dengan nama Syekh Jumadil Kubro (seperti di Troloyo Mojokerto, Turgo Sleman, Semarang, dan Tosora Wajo), namun situs Troloyo Trowulan memiliki dasar arkeologis tertua yang paling kuat.\n\nPenelitian epigrafi yang dilakukan oleh sarjana Prancis Louis-Charles Damais (1957) terhadap gugusan batu nisan di Kompleks Troloyo (Makam Tujuh, Makam Wali Songo/Pendopo, Makam Syekh Ngudung/Raden Ayu Kencanawungu) mengungkap hal yang sangat unik: nisan-nisan tersebut memiliki dua sisi pahatan—satu sisi memahat angka tahun dengan **huruf Jawa Kuno dalam tarikh Saka** (mulai dari 1298 Saka / 1376 M hingga 1397 Saka / 1475 M) lengkap dengan lambang *Surya Majapahit*, sementara sisi lainnya memahat kalimat Tauhid dan ayat-ayat Al-Qur’an (Surah Ali Imran: 185 dan Ar-Rahman: 26–27) dalam kaligrafi **aksara Arab kufi dan naskhi**.',
    karomah: [
      'Dalam tradisi lisan masyarakat Trowulan dan manaqib Wali Songo, Syekh Jumadil Kubro dikenal memiliki karomah kewibawaan ruhani dan kebijaksanaan tingkat tinggi yang membuat para pejabat istana Majapahit menaruh hormat kepada komunitas Muslim di Troloyo, bahkan sejumlah keluarga bangsawan keraton memeluk Islam secara sukarela tanpa peperangan satu abad sebelum berdirinya Kesultanan Demak.<!--more-->\n\nDi Kompleks Troloyo juga terdapat petilasan *Pendopo Wali Songo* yang menurut tradisi tutur lokal pernah menjadi tempat musyawarah rahasia para wali generasi awal sebelum pusat dakwah bergeser ke pesisir utara Jawa (Ampel Denta, Giri, dan Demak).',
    ],
    untoldStory:
      'Keberadaan simbol delapan pancaran sinar *Surya Majapahit* yang dipadukan secara harmonis dengan kaligrafi kalimat *Laa ilaaha illallaah Muhammadur Rasuulullaah* pada batu nisan Troloyo merupakan bukti arkeologis tak terbantahkan tentang akar *Islam Nusantara* yang menghargai identitas budaya lokal sembari menjaga kemurnian akidah Tauhid.<!--more-->\n\nSetiap malam Jumat Legi dan pada peringatan *Grebeg Suro Majapahit* (bulan Muharram), puluhan ribu peziarah dari seluruh Pulau Jawa memadati Kompleks Makam Syekh Jumadil Kubro Troloyo di Trowulan Mojokerto.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Jumadil Kubro di Troloyo Trowulan Mojokerto umumnya bertawassul memohon kepada Allah SWT kemuliaan nasab dan keturunan yang saleh, kebijaksanaan dalam berdakwah di tengah masyarakat majemuk, serta keteguhan iman keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Jumadil Kubro (Sayyid Jamaluddin Al-Akbar Troloyo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ جَدِّ الْأَوْلِيَاءِ سَيِّدِنَا الشَّيْخِ جَمَالِ الدِّينِ الْأَكْبَرِ الْحُسَيْنِيِّ الْمَعْرُوفِ بِشَيْخِ جُمَادِ الْكُبْرَى وَسَائِرِ أَوْلِيَاءِ تُرُولُويُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ جَدِّ الْأَوْلِيَاءِ سَيِّدِنَا الشَّيْخِ جَمَالِ الدِّينِ الْأَكْبَرِ الْحُسَيْنِيِّ الْمَعْرُوفِ بِشَيْخِ جُمَادِ الْكُبْرَى وَسَائِرِ أَوْلِيَاءِ تُرُولُويُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Jaddil-Auliyaa-i Sayyidinaa asy-Syaikh Jamaaliddiin al-Akbar al-Husainii al-ma'ruufi bi Syaikh Jumaadil-Kubraa wa saa-iri Auliyaa-i Troloyo syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wanfa'naa bi barakaatihim wa asraarihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh kakek para wali penghulu kami Sayyid Syaikh Jamaluddin Al-Akbar Al-Husaini (Syekh Jumadil Kubro) beserta seluruh auliya Troloyo Mojokerto, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh kakek para wali penghulu kami Sayyid Syaikh Jamaluddin Al-Akbar Al-Husaini (Syekh Jumadil Kubro) beserta seluruh auliya Troloyo Mojokerto, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Malam Jumat Legi bulan Suro (Puncak Haul Agung Syekh Jumadil Kubro & Kirab Budaya Islam Majapahit di Kompleks Makam Troloyo, Desa Sentonorejo, Kecamatan Trowulan, Kabupaten Mojokerto).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki cungkup Makam Tujuh dan Pendopo Wali Songo, serta dilarang keras menggores atau merusak pahatan kaligrafi dan angka tahun kuno pada batu nisan cagar budaya abad ke-14.',
    facilities: ['Cungkup Makam Syekh Jumadil Kubro (Makam Tujuh Troloyo)', 'Masjid Agung Syekh Jumadil Kubro Troloyo', 'Petilasan Pendopo Wali Songo Troloyo', 'Terminal Parkir Bus Wisata Religi Trowulan Mojokerto'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Damais, Louis-Charles (1957). "Études javanaises I: Les tombes musulmanes datées de Tralaya", Bulletin de l’École française d’Extrême-Orient (BEFEO), Tome 48.',
      'Guillot, Claude & Kalus, Ludvik (2008). Inskripsi Islam Tertua di Indonesia. Jakarta: KPG & EFEO.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Depok: Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-wasil-setono-gedong',
    name: 'Makam Syekh Al-Wasil Syamsuddin / Mbah Wasil (Setono Gedong, Kota Kediri)',
    title: 'Ulama Sufi Abad ke-12 dari Persia/Rum & Situs Epigrafi Arab Tertua di Pedalaman Jawa Timur',
    description:
      'Kompleks Cagar Budaya Makam Setono Gedong di Kelurahan Setonogedong, Kecamatan Kota, Kota Kediri—pusara Syekh Al-Wasil Syamsuddin (Mbah Wasil), ulama besar pakar fikih dan qira’at yang berdakwah di Kerajaan Kadiri pada masa Sri Maharaja Jayabaya.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-12 M (Masa Kerajaan Kadiri / Panjalu)',
    province: 'Jawa Timur',
    city: 'Kediri',
    district: 'Kec. Kota Kediri',
    address: 'Kompleks Masjid Auliya Setono Gedong, Jl. Dhoho Gang Setono Gedong, Kel. Setonogedong, Kec. Kota, Kota Kediri',
    location: {
      lat: -7.8139,
      lng: 112.0138,
      address: 'Kompleks Masjid Auliya Setono Gedong, Jl. Dhoho Gang Setono Gedong, Kel. Setonogedong, Kec. Kota, Kota Kediri',
      district: 'Kec. Kota Kediri',
      city: 'Kediri',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Masjid & Makam Auliya Setono Gedong (Syekh Al-Wasil Syamsuddin) Kota Kediri',
    sanad:
      'Ulama sufi, mufassir, dan pakar kitab Al-Mushtashfa / qira’at sab’ah asal Persia / Rum (Timur Tengah) yang hadir di pusat Kerajaan Kadiri (Panjalu) pada abad ke-12 M.',
    karya: [
      'Penyebaran dakwah intelektual Islam perdana di pedalaman Sungai Brantas (Kerajaan Kadiri) jauh sebelum era Wali Songo',
      'Prasasti/inskripsi batu nisan berbahasa Arab di cungkup Setono Gedong yang menyebut gelar Asy-Syaikh Al-’Alim Al-Fadhil Al-Wasil Syamsuddin',
    ],
    history:
      'Di tengah pusat perniagaan Jalan Dhoho, Kelurahan Setonogedong, Kecamatan Kota, Kota Kediri, berdiri sebuah kompleks cagar budaya kuno bernama **Makam dan Masjid Auliya Setono Gedong** yang menaungi pusara **Syekh Al-Wasil Syamsuddin** (sangat dihormati oleh masyarakat Kediri dan para kiai Jawa Timur dengan sebutan *Mbah Wasil*). Berbeda dengan kebanyakan makam wali yang hanya bersandar pada cerita tutur, keberadaan tokoh Syekh Al-Wasil Syamsuddin di Kediri diperkuat oleh bukti epigrafi berupa pahatan inskripsi bahasa Arab pada panil batu di dalam cungkup makam Setono Gedong.\n\nHasil pembacaan filologis dan epigrafis terhadap inskripsi batu Setono Gedong (yang diteliti oleh para ahli arkeologi Islam termasuk Prof. Habib Mustopo dan Claude Guillot) menyebutkan secara eksplisit penghormatan kepada *"Asy-Syaikh Al-’Alim Al-Fadhil Al-Kamil Al-Wasil Syamsuddin"*, seorang ulama besar yang menguasai ilmu fikih (disebutkan penguasaannya atas kitab *Al-Mushtashfa*), ilmu tafsir, dan ilmu *Qira’at*. Dalam tradisi kesejarahan Kediri dan kitab *Serat Pranitiradya*, Syekh Al-Wasil Syamsuddin adalah ulama asal negeri Rum/Persia yang datang ke pusat Kerajaan Kadiri (Panjalu) pada abad ke-12 M dan berdialog tentang ilmu hikmah serta ketuhanan dengan Raja Kadiri yang termasyhur, Sri Maharaja Jayabaya.\n\nKompleks bangunan cungkup Makam Mbah Wasil berdiri di atas fondasi struktur candi masa Hindu-Buddha dari batu andesit dan bata merah kuno yang kemudian dialihfungsikan menjadi masjid dan maqbarah Islam. Para ulama besar Jawa Timur—mulai dari KH. Abdul Karim Lirboyo, KH. Hamim Djazuli (Gus Miek), hingga Presiden KH. Abdurrahman Wahid (Gus Dur)—menempatkan Makam Mbah Wasil Setono Gedong sebagai *paku bumi* dan leluhur ruhani tertua di wilayah Kediri.',
    karomah: [
      'Dalam tradisi lisan pesantren-pesantren besar di Kediri (Lirboyo, Ploso, Jampes) dan kesaksian Gus Dur maupun Gus Miek, maqam kewalian Syekh Al-Wasil Syamsuddin berada pada derajat yang sangat tinggi sebagai ulama perintis yang membuka pintu keberkahan tanah Kediri, sehingga berabad-abad kemudian bumi Kediri tumbuh menjadi kota santri dengan puluhan ribu penghafal Al-Qur’an dan pengkaji kitab kuning.<!--more-->\n\nBanyak riwayat tutur masyarakat Kediri yang mengisahkan bahwa pada masa kolonial Belanda, kawasan cungkup Setono Gedong tidak pernah berani diganggu oleh pasukan kolonial karena kewibawaan batin yang menyelimuti kompleks makam kuno tersebut.',
    ],
    untoldStory:
      'Selain pusara utama Syekh Al-Wasil Syamsuddin di dalam cungkup batu kuno berukir kaligrafi, di Kompleks Pemakaman Setono Gedong juga terdapat makam para bupati dan ulama penyebar Islam di Kediri masa Kesultanan Mataram/Kartasura, termasuk makam Pangeran Demang dan para penghulu Kadiri.<!--more-->\n\nBagi para santri baru yang mulai mondok di Pondok Pesantren Lirboyo, Ploso, maupun Kwagean Kediri, berziarah ke Makam Mbah Wasil di Setono Gedong merupakan tradisi pembuka (*tabarrukan*) agar diberi kelancaran dalam menyerap ilmu di bumi Kediri.',
    barokahHajat:
      'Peziarah dan para santri yang berziarah ke maqbarah Syekh Al-Wasil Syamsuddin (Mbah Wasil) di Setono Gedong Kota Kediri umumnya bertawassul memohon kepada Allah SWT terbukanya pintu kefahaman ilmu-ilmu alat, fikih, dan Al-Qur’an (*futuhul ’ulum*), serta keberkahan menuntut ilmu di tanah Kediri.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Al-Wasil Syamsuddin (Mbah Wasil Setono Gedong Kediri)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَالِمِ الْفَاضِلِ الْكَامِلِ الْوَاصِلِ شَمْسِ الدِّينِ (مَبَاهْ وَاصِلْ سَتُونُو غَدُونْغ كَدِيرِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ افْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَالِمِ الْفَاضِلِ الْكَامِلِ الْوَاصِلِ شَمْسِ الدِّينِ (مَبَاهْ وَاصِلْ سَتُونُو غَدُونْغ كَدِيرِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ افْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikhil-'Aalimil-Faadhilil-Kaamilil-Waashil Syamsiddiin (Mbah Wasil Setono Gedong Kediri) syai-un lillaahi lahumul-Faatihah. Allaahummaftah 'alainaa futuuhal-'aarifiin wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama yang alim dan paripurna Syekh Al-Wasil Syamsuddin (Mbah Wasil Setono Gedong Kediri), Al-Fatihah. Ya Allah, bukakanlah bagi kami pintu kefahaman para arifin serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama yang alim dan paripurna Syekh Al-Wasil Syamsuddin (Mbah Wasil Setono Gedong Kediri), Al-Fatihah. Ya Allah, bukakanlah bagi kami pintu kefahaman para arifin serta limpahkanlah kemanfaatan melalui ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Dzulhijjah / Muharram (Puncak Haul Agung Syekh Al-Wasil Syamsuddin di Kompleks Masjid Auliya Setono Gedong, Kelurahan Setonogedong, Kecamatan Kota, Kota Kediri).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat memasuki pelataran cungkup kuno Setono Gedong, serta tidak menyentuh atau merusak panil inskripsi batu cagar budaya.',
    facilities: ['Masjid Auliya Setono Gedong Kota Kediri', 'Cungkup Kuno Cagar Budaya Makam Syekh Al-Wasil Syamsuddin', 'Area Wudhu & Pendopo Peziarah', 'Parkir Kendaraan di Kawasan Jl. Dhoho / Setonogedong'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Guillot, Claude & Kalus, Ludvik (2008). Inskripsi Islam Tertua di Indonesia (Kajian Inskripsi Setono Gedong Kediri). Jakarta: KPG & EFEO.',
      'Balai Pelestarian Cagar Budaya (BPCB) Jawa Timur — Deskripsi Cagar Budaya Situs Setono Gedong Kota Kediri.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-abdul-karim-lirboyo',
    legacyId: 'ulama-21',
    name: 'Makam KH. Abdul Karim, KH. Marzuqi Dahlan & KH. Mahrus Aly (Lirboyo) serta KH. Djazuli Utsman (Ploso, Kediri)',
    title: 'Pendiri Pondok Pesantren Lirboyo & Al-Falah Ploso — Benteng Utama Turats Salafiyah Nusantara',
    description:
      'Kompleks Maqbarah Masyayikh Pondok Pesantren Lirboyo di Kecamatan Mojoroto, Kota Kediri (KH. Abdul Karim, KH. Marzuqi Dahlan, KH. Mahrus Aly) beserta poros pesantren kembarannya Pondok Pesantren Al-Falah Ploso, Mojo, Kabupaten Kediri (KH. Ahmad Djazuli Utsman).',
    category: 'Ulama Nusantara',
    era: 'Akhir Abad ke-19 – Abad ke-20 M (1856–1954 M & 1900–1976 M)',
    province: 'Jawa Timur',
    city: 'Kediri',
    district: 'Kec. Mojoroto',
    address: 'Kompleks Pondok Pesantren Lirboyo, Kel. Lirboyo, Kec. Mojoroto, Kota Kediri',
    location: {
      lat: -7.8211,
      lng: 111.9818,
      address: 'Kompleks Pondok Pesantren Lirboyo, Kel. Lirboyo, Kec. Mojoroto, Kota Kediri',
      district: 'Kec. Mojoroto',
      city: 'Kediri',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Kediri (Kompleks Maqbarah Masyayikh PP Lirboyo Kota Kediri & PP Al-Falah Ploso)',
    sanad:
      'KH. Abdul Karim (Mbah Manab) asal Magelang adalah murid kesayangan Syaichona Muhammad Kholil Bangkalan (selama lebih dari 20 tahun) dan menantu KH. Sholeh Banjarmelati Kediri; bersama dua menantunya KH. Marzuqi Dahlan dan KH. Mahrus Aly, serta sahabat seperjuangannya KH. Ahmad Djazuli Utsman (pendiri PP Al-Falah Ploso Mojo Kediri).',
    karya: [
      'Pendirian Pondok Pesantren Lirboyo Kediri (1910 M) oleh KH. Abdul Karim yang menjadi salah satu pesantren salaf terbesar di Asia Tenggara',
      'Pendirian Pondok Pesantren Al-Falah Ploso Mojo Kediri (1925 M) oleh KH. Ahmad Djazuli Utsman sebagai pusat pengkajian kitab Fathul Wahhab dan Ihya Ulumuddin',
      'Pengiriman ribuan laskar santri Hizbullah-Sabilillah dari Lirboyo dan Ploso ke medan pertempuran 10 November 1945 di Surabaya serta pelucutan senjata tentara Jepang di Kediri',
    ],
    history:
      'KH. Abdul Karim—yang semasa mudanya dikenal dengan nama *Kiai Manab* atau *Mbah Manab* (1856–1954 M)—lahir di Dusun Banar, Kawedanan Mertoyudan, Kabupaten Magelang, Jawa Tengah. Sejak usia 14 tahun, beliau mengembara berjalan kaki ke Jawa Timur untuk menuntut ilmu di Pesantren Bungkuk Singosari Malang, Pesantren Cangaan Bangil, Pesantren Trayang Nganjuk, Pesantren Cepoko Nganjuk, hingga mengabdi selama lebih dari 23 tahun kepada maha guru ulama Nusantara, Syaichona Muhammad Kholil di Bangkalan Madura. Di Bangkalan, Kiai Manab bersahabat erat dengan Hadratussyaikh KH. Hasyim Asy’ari. Pada tahun 1908 M, beliau diambil menantu oleh ulama besar Kediri, KH. Sholeh Banjarmelati, dinikahkan dengan putrinya Nyai Hj. Siti Khodijah.\n\nPada tahun 1910 M, atas saran mertuanya, KH. Abdul Karim beserta istrinya pindah ke sebuah desa yang kala itu sangat rawan perampokan dan kejahatan di sebelah barat Sungai Brantas, yakni Desa Lirboyo, Kecamatan Mojoroto, Kediri. Dengan sifat *zuhud*, kesabaran tanpa batas, dan ketekunan mengajar ilmu alat (*Nahwu-Sharaf*) serta fikih, Mbah Abdul Karim berhasil menyulap Desa Lirboyo menjadi **Pondok Pesantren Lirboyo**. Kepemimpinan Lirboyo semakin kokoh ketika Mbah Abdul Karim dibantu oleh dua menantu utamanya: **KH. Marzuqi Dahlan** (1906–1975 M, ulama yang sangat alim dan telaten membina santri di dalam pondok) dan **KH. Mahrus Aly** (1907–1985 M, ulama pejuang asal Gedongan Cirebon yang memimpin laskar santri melucuti senjata tentara Jepang di Kediri dan menjabat Rais Syuriyah PWNU Jawa Timur).\n\nBersamaan dengan tumbuhnya Lirboyo, sekitar 12 kilometer di sebelah selatan menyusuri tepi barat Sungai Brantas, berdiri pesantren kembarannya yang sangat masyhur: **Pondok Pesantren Al-Falah Ploso**, Kecamatan Mojo, Kabupaten Kediri yang didirikan pada tahun 1925 M oleh **KH. Ahmad Djazuli Utsman** (1900–1976 M, ulama besar lulusan Tebuireng, Mojosari, dan Madura, ayahanda dari wali kharismatik KH. Hamim Tohari Djazuli / Gus Miek dan KH. Zainuddin Djazuli). KH. Abdul Karim Lirboyo wafat pada 21 Ramadhan 1373 H (24 Mei 1954 M) dan dimakamkan di Kompleks Maqbarah Barat Masjid Lawang Songo PP Lirboyo, sementara KH. Ahmad Djazuli Utsman wafat pada 10 Syawal 1395 H (1976 M) dan dimakamkan di Kompleks Maqbarah PP Al-Falah Ploso.',
    karomah: [
      'Dalam kitab manaqib *Lirboyo* dan kesaksian para ulama, karomah utama KH. Abdul Karim (Mbah Manab) adalah kezuhudan dan keikhlasan beliau yang luar biasa: ketika rumah dan bilik-bilik bambu Pesantren Lirboyo berulang kali dijarah oleh para pencuri di masa awal, Mbah Manab tidak pernah mengutuk pencurinya, melainkan mendoakan mereka di tengah malam hingga para pencuri itu datang menyerahkan diri dan menjadi santri.<!--more-->\n\nPada masa Revolusi Fisik 1945–1949, ketika Kota Kediri dibombardir oleh pesawat tempur Belanda dan para pejuang berlindung di Pondok Pesantren Lirboyo serta Ploso, bom-bom yang dijatuhkan tentara Belanda di atas kawasan Masjid Lirboyo gagal meledak berkat doa dan riyadhah Mbah Abdul Karim, KH. Marzuqi Dahlan, KH. Mahrus Aly, serta KH. Djazuli Utsman.',
    ],
    untoldStory:
      'Dari rahim Pondok Pesantren Lirboyo dan Al-Falah Ploso Kediri lahir para ulama rujukan tertinggi di Indonesia abad ke-20 dan ke-21, di antaranya Syaikhona KH. Maimoen Zubair (Sarang Rembang), KH. Ahmad Mustofa Bisri (Rembang), KH. Said Aqil Siroj (Cirebon), serta ribuan pengasuh pesantren yang tergabung dalam *Himpunan Alumni Santri Lirboyo (HIMASAL)*.<!--more-->\n\nDi Kompleks Maqbarah Pondok Pesantren Lirboyo (di belakang Masjid Lawang Songo), peziarah dapat berziarah sekaligus ke pusara KH. Abdul Karim, KH. Marzuqi Dahlan, KH. Mahrus Aly, KH. Idris Marzuqi, dan KH. Anwar Manshur (keluarga besar masyayikh Lirboyo).',
    barokahHajat:
      'Peziarah dan puluhan ribu santri yang berziarah ke maqbarah KH. Abdul Karim, KH. Marzuqi Dahlan, dan KH. Mahrus Aly di Lirboyo (serta KH. Ahmad Djazuli Utsman di Ploso Kediri) umumnya bertawassul memohon kepada Allah SWT kemantapan ilmu kitab kuning (*turats*), sifat zuhud dan ikhlas dalam mengajar, serta keberkahan keturunan santri.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Masyayikh Lirboyo (KH. Abdul Karim, KH. Marzuqi, KH. Mahrus) & Ploso (KH. Djazuli Utsman)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ الزَّاهِدِ كِيَاهِي الحَاجِّ عَبْدِ الْكَرِيمِ وَالشَّيْخِ مَرْزُوقِي دَحْلَانْ وَالشَّيْخِ مَحْرُوسْ عَلِيّ لِيرْبُويُو وَالشَّيْخِ أَحْمَدْ جَزُولِي عُثْمَانْ فُلُوسُو كَدِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَزُهْدِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ الزَّاهِدِ كِيَاهِي الحَاجِّ عَبْدِ الْكَرِيمِ وَالشَّيْخِ مَرْزُوقِي دَحْلَانْ وَالشَّيْخِ مَحْرُوسْ عَلِيّ لِيرْبُويُو وَالشَّيْخِ أَحْمَدْ جَزُولِي عُثْمَانْ فُلُوسُو كَدِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَزُهْدِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikhil-'Allaamatiz-Zaahid Kiyaahii al-Haajj 'Abdil-Kariim wasy-Syaikh Marzuuqii Dahlaan wasy-Syaikh Mahruus 'Alii Lirboyo wasy-Syaikh Ahmad Jazuulii 'Utsmaan Ploso Kediri syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa zuhdihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah yang zuhud KH. Abdul Karim, KH. Marzuqi Dahlan, KH. Mahrus Aly Lirboyo, serta KH. Ahmad Djazuli Utsman Ploso Kediri, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, kezuhudan, dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah yang zuhud KH. Abdul Karim, KH. Marzuqi Dahlan, KH. Mahrus Aly Lirboyo, serta KH. Ahmad Djazuli Utsman Ploso Kediri, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, kezuhudan, dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Menjelang bulan Sya’ban / Ramadhan (Haul Agung Masyayikh PP Lirboyo Kota Kediri — wafat Mbah Abdul Karim 21 Ramadhan, KH. Mahrus Aly 6 Ramadhan) & Bulan Syawal (Haul KH. Ahmad Djazuli Utsman di PP Al-Falah Ploso Mojo Kediri).',
    localAdab:
      'Wajib mengenakan busana santri yang sopan dan menutup aurat (sarung/celana panjang dan kemeja/baju koko berpeci bagi pria, busana muslimah longgar bagi wanita), mematuhi pemisahan jalur peziarah putra dan putri di Maqbarah Lirboyo, serta menjaga ketenangan kegiatan musyawarah kitab para santri.',
    facilities: ['Kompleks Maqbarah Masyayikh PP Lirboyo', 'Masjid Lawang Songo & Masjid Agung An-Nur Lirboyo', 'Pos Keamanan & Informasi Tamu Pesantren Lirboyo', 'Terminal Parkir Bus Wisata Religi Lirboyo Kota Kediri'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib Pondok Pesantren Lirboyo)',
    references: [
      'Tim Pembukuan Lirboyo (2010). Lirboyo: Sejarah, Perjuangan, dan Keteladanan Masyayikh (1 Abad Pondok Pesantren Lirboyo). Kediri: PP Lirboyo.',
      'Dhofier, Zamakhsyari (1982). Tradisi Pesantren. Jakarta: LP3ES.',
      'Tim PP Al-Falah Ploso (2005). Biografi KH. Ahmad Djazuli Utsman: Pendiri Pondok Pesantren Al-Falah Ploso Kediri.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'gus-miek-ploso-kediri',
    legacyId: 'ulama-22',
    name: 'Makam KH. Hamim Tohari Djazuli (Gus Miek) — Makam Tambak, Mojo, Kediri',
    title: 'Waliyullah Nyentrik Pendiri Majelis Semaan Al-Qur’an Mantab & Dzikrul Ghofilin',
    description:
      'Maqbarah KH. Hamim Tohari Djazuli / Gus Miek (1940–1993 M) di Dusun Tambak, Desa Ngadi, Kecamatan Mojo, Kabupaten Kediri—putra KH. Ahmad Djazuli Utsman Ploso yang berdakwah di tempat-tempat gelap sekaligus menggagas majelis *Dzikrul Ghofilin* dan *Semaan Al-Qur’an Jantiko Mantab*.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1940–1993 M / 1359–1413 H)',
    province: 'Jawa Timur',
    city: 'Kediri',
    district: 'Kec. Mojo',
    address: 'Kompleks Makam Tambak, Dusun Tambak, Desa Ngadi, Kec. Mojo, Kabupaten Kediri',
    location: {
      lat: -7.9082,
      lng: 111.9465,
      address: 'Kompleks Makam Tambak, Dusun Tambak, Desa Ngadi, Kec. Mojo, Kabupaten Kediri',
      district: 'Kec. Mojo',
      city: 'Kediri',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Kediri (Kompleks Makam Gus Miek di Dusun Tambak Ngadi Mojo Kediri)',
    sanad:
      'Putra ketiga KH. Ahmad Djazuli Utsman dan Nyai Hj. Rodliyah (pendiri PP Al-Falah Ploso Kediri); murid dari ayahandanya sendiri, KH. Abdul Karim & KH. Marzuqi Dahlan (Lirboyo), KH. Dalhar (Watucongol Magelang), KH. Hamid Wijaya, dan KH. Achmad Siddiq (Jember).',
    karya: [
      'Pendirian majelis wirid akbar Dzikrul Ghofilin (bersama KH. Abdul Hamid Pasuruan dan KH. Achmad Siddiq Jember)',
      'Pendirian majelis Semaan Al-Qur’an wa Dzikrul Ghofilin Jantiko Mantab (1986) yang menghimpun puluhan ribu jamaah dari pagi hingga tengah malam',
      'Dakwah kultural merangkul kaum marginal, seniman, dan masyarakat awam kembali mencintai Al-Qur’an dan para wali',
    ],
    history:
      'KH. Hamim Tohari Djazuli—yang sangat masyhur dengan sapaan **Gus Miek** (17 Agustus 1940 – 5 Juni 1993 M)—adalah putra ketiga dari pasangan ulama besar pendiri Pondok Pesantren Al-Falah Ploso, Kecamatan Mojo, Kabupaten Kediri, yakni KH. Ahmad Djazuli Utsman dan Nyai Hj. Rodliyah. Sejak remaja, setelah menimba ilmu di Pesantren Lirboyo Kediri dan memperoleh ijazah ruhani dari waliyullah KH. Dalhar Watucongol Magelang serta KH. Jogorekso Gunungpring, Gus Miek menempuh jalan dakwah yang sangat tidak lazim bagi seorang putra kiai besar (*gus*): beliau keluar dari kenyamanan tembok pesantren untuk terjun langsung ke jalanan, pelabuhan, klab malam, dan tempat-tempat berkumpulnya orang-orang yang jauh dari agama.\n\nDengan penampilan yang terkadang nyentrik dan metode dakwah *bil-hikmah* tanpa pernah menghakimi, Gus Miek menyentuh hati ribuan orang yang semula tenggelam dalam kemaksiatan hingga mereka menangis bertobat dan menjadi pecinta Al-Qur’an. Para waliyullah sezaman seperti KH. Abdul Hamid Pasuruan, KH. Achmad Siddiq Jember, dan KH. Mahrus Aly Lirboyo memberikan kesaksian tegas bahwa Gus Miek adalah seorang *Wali Kutub / Wali Majdzub-Salik* yang sengaja menyembunyikan kemuliaan ibadahnya (*Malāmatiyyah*) demi menyelamatkan umat di tempat-tempat gelap.\n\nPada dekade 1970-an dan 1980-an, Gus Miek memformalkan gerakan ruhaninya dengan merangkai wirid **Dzikrul Ghofilin** (*pengingat bagi orang-orang yang lalai*)—yang memadukan bacaan Al-Fatihah seratus kali, Asmaul Husna, Istighfar, Shalawat Muqarrabin, dan tawassul kepada para auliya—serta mendirikan majelis **Semaan Al-Qur’an Jantiko Mantab** (dimulai tahun 1986), di mana puluhan ribu jamaah duduk khusyuk menyimak lantunan 30 juz Al-Qur’an oleh para *Huffadz* sejak waktu Subuh hingga selesai shalat Isya. Gus Miek wafat pada tanggal 5 Juni 1993 M (14 Dzulhijjah 1413 H) di RS Budi Mulia Surabaya dan sesuai wasiat beliau sendiri dimakamkan di **Dusun Tambak, Desa Ngadi, Kecamatan Mojo, Kabupaten Kediri** (sekitar 4 km di sebelah selatan Pesantren Ploso).',
    karomah: [
      'Dalam buku biografi *Perjalanan dan Ajaran Gus Miek* karya Muhammad Nurul Ibad dan kesaksian para jamaah *Jantiko Mantab*, ratusan kisah karomah Gus Miek dituturkan oleh para saksi mata: mulai dari kemampuan beliau mengetahui isi hati dan masa lalu seseorang (*kasyaf*), menyadarkan para penjudi dan pemabuk hanya dengan satu tepukan bahu atau tatapan mata, hingga ketahanan fisik beliau yang nyaris tidak pernah tidur malam demi berdzikir dan berziarah ke makam-makam wali.<!--more-->\n\nSebelum wafat, Gus Miek sendiri yang menunjuk sebidang tanah sepi di Dusun Tambak, Desa Ngadi, Mojo (di dekat pusara ulama sepuh Mbah Tambak / Kiai Imam Nawawi) dan berpesan bahwa kelak tempat terpencil di tepi Sungai Brantas itu akan menjadi lautan manusia yang melantunkan Al-Qur’an—sebuah isyarat yang kini terbukti nyata setiap hari.',
    ],
    untoldStory:
      'Rangkaian wirid *Dzikrul Ghofilin* yang disusun oleh Gus Miek memiliki ikatan ruhani tiga ulama besar Jawa Timur (*Tiga Serangkai Dzikrul Ghofilin*): Gus Miek (Kediri), KH. Abdul Hamid (Pasuruan), dan KH. Achmad Siddiq (Jember). Bahkan KH. Achmad Siddiq Jember ketika wafat pada tahun 1991 dimakamkan di kawasan Ploso/Mojo Kediri karena kedekatan batin yang sangat kuat dengan keluarga besar Ploso dan Gus Miek.<!--more-->\n\nDi Kompleks Makam Tambak (Desa Ngadi, Mojo, Kediri), selain pusara Gus Miek dan istrinya Nyai Hj. Lilik Suyuthi, juga dimakamkan putra-putra beliau (Gus Sabuth Panoto Projo dan Gus Tijani Robert Saifunnawas) yang meneruskan perjuangan majelis *Semaan Al-Qur’an Mantab*.',
    barokahHajat:
      'Peziarah dan jamaah *Dzikrul Ghofilin / Mantab* yang berziarah ke maqbarah KH. Hamim Tohari Djazuli (Gus Miek) di Makam Tambak Mojo Kediri umumnya bertawassul memohon kepada Allah SWT taubat nasuha dari kelalaian masa lalu, kecintaan yang mendalam terhadap simaan Al-Qur’an, serta kasih sayang yang tulus tanpa memandang rendah sesama.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus KH. Hamim Tohari Djazuli (Gus Miek) Makam Tambak Kediri',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْكَامِلِ وَالْعَارِفِ بِاللهِ مُؤَسِّسِ ذِكْرِ الْغَافِلِينَ كِيَاهِي الحَاجِّ حَمِيمْ طَهَارِي جَزُولِي (غُوسْ مِيكْ) تَامْبَاكْ كَدِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا مِنَ الذَّاكِرِينَ وَأَهْلِ الْقُرْآنِ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْكَامِلِ وَالْعَارِفِ بِاللهِ مُؤَسِّسِ ذِكْرِ الْغَافِلِينَ كِيَاهِي الحَاجِّ حَمِيمْ طَهَارِي جَزُولِي (غُوسْ مِيكْ) تَامْبَاكْ كَدِيرِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا مِنَ الذَّاكِرِينَ وَأَهْلِ الْقُرْآنِ وَانْفَعْنَا بِبَرَكَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Kaamil wal-'Aarifi billaah Mu-assisi Dzikril-Ghaafiliin Kiyaahii al-Haajj Hamiim Thahaarii Jazuulii (Gus Miek) Tambak Kediri syai-un lillaahi lahumul-Faatihah. Allaahummaj'alnaa minadz-dzaakiriina wa ahlil-Qur-aani wanfa'naa bi barakaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang kamil dan arif billah pendiri Dzikrul Ghofilin KH. Hamim Tohari Djazuli (Gus Miek) Tambak Kediri, Al-Fatihah. Ya Allah, jadikanlah kami termasuk golongan ahli dzikir dan ahli Al-Qur’an, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang kamil dan arif billah pendiri Dzikrul Ghofilin KH. Hamim Tohari Djazuli (Gus Miek) Tambak Kediri, Al-Fatihah. Ya Allah, jadikanlah kami termasuk golongan ahli dzikir dan ahli Al-Qur’an, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Kamis Pahing malam Jumat Pon setiap bulan / Puncak Haul Akbar bulan Dzulhijjah (Majelis Semaan Al-Qur’an Jantiko Mantab & Dzikrul Ghofilin di Kompleks Makam Gus Miek Dusun Tambak, Desa Ngadi, Kecamatan Mojo, Kabupaten Kediri).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga kekhusyukan para penghafal Al-Qur’an (*huffadz*) dan jamaah yang sedang menyimak Al-Qur’an atau membaca *Dzikrul Ghofilin* di pendopo makam, serta merendahkan hati tanpa merasa lebih suci dari peziarah lain.',
    facilities: ['Pendopo Agung & Cungkup Makam Gus Miek Tambak', 'Masjid & Mushalla Kompleks Makam Tambak', 'Sentra UMKM Warga Desa Ngadi Mojo', 'Area Parkir Bus Wisata Religi Makam Tambak Mojo Kediri'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ibad, Muhammad Nurul (2001). Perjalanan dan Ajaran Gus Miek: Wajah Sebuah Kerinduan. Yogyakarta: Pustaka Pesantren / LKiS.',
      'Ibad, Muhammad Nurul (2007). Suluk Kiai Hamim Djazuli (Gus Miek) melalui Dzikrul Ghofilin. Yogyakarta: Pustaka Pesantren.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-ihsan-jampes-kediri',
    legacyId: 'ulama-34',
    name: 'Makam Syekh Ihsan Muhammad Dahlan Al-Jampesi (Jampes, Gampengrejo, Kediri)',
    title: 'Pengarang Kitab Fenomenal Sirajuth Thalibin (Syarah Minhajul ’Abidin Imam Al-Ghazali) yang Diakui Al-Azhar Kairo',
    description:
      'Maqbarah Syekh Ihsan bin Muhammad Dahlan Al-Jampesi Al-Kadiri (1901–1952 M) di Pondok Pesantren Al-Ihsan Jampes, Desa Putih, Kecamatan Gampengrejo, Kabupaten Kediri—ulama Nusantara yang kitab tasawufnya menjadi kurikulum di Universitas Al-Azhar Mesir.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-20 M (1901–1952 M / 1319–1371 H)',
    province: 'Jawa Timur',
    city: 'Kediri',
    district: 'Kec. Gampengrejo',
    address: 'Kompleks Pondok Pesantren Al-Ihsan Jampes, Dusun Jampes, Desa Putih, Kec. Gampengrejo, Kabupaten Kediri',
    location: {
      lat: -7.7689,
      lng: 112.0284,
      address: 'Kompleks Pondok Pesantren Al-Ihsan Jampes, Dusun Jampes, Desa Putih, Kec. Gampengrejo, Kabupaten Kediri',
      district: 'Kec. Gampengrejo',
      city: 'Kediri',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Kediri (Kompleks Maqbarah Syekh Ihsan Muhammad Dahlan PP Al-Ihsan Jampes Kediri)',
    sanad:
      'Putra KH. Muhammad Dahlan bin Saleh (pendiri Pesantren Jampes asal Bogor/Demak) dan Nyai Artimah (putri KH. Sholeh Banjarmelati Kediri, bibi dari istri KH. Abdul Karim Lirboyo); menimba ilmu di Pesantren Bungkuk Singosari, Pesantren Gondanglegi, Pesantren Bangkalan Madura, Pesantren Jamsaren Solo, dan KH. Ahmad Dahlan Semarang.',
    karya: [
      'Kitab Sirajuth Thalibin ’ala Minhajil ’Abidin ila Jannati Rabbil ’Alamin (2 jilid besar cetakan Musthafa Al-Babi Al-Halabi Kairo Mesir, 1932 M)',
      'Kitab Tashrihul ’Ibarat (Syarah Natijatul Miqat dalam ilmu Falak/Astronomi Islam)',
      'Kitab Manahijul Imdad (Syarah Irsyadul ’Ibad karya Syaikh Zainuddin Al-Malibari) dan Kitab Irsyadul Ikhwan fi Bayani Ahkamil Qahwati wad Dukhan (Hukum Kopi dan Rokok)',
    ],
    history:
      'Syekh Ihsan bin Muhammad Dahlan Al-Jampesi Al-Kadiri (1901–1952 M) lahir di Dusun Jampes, Desa Putih, Kecamatan Gampengrejo, Kabupaten Kediri dengan nama kecil Bakri. Ayahandanya, KH. Muhammad Dahlan, adalah perintis Pondok Pesantren Jampes (didirikan tahun 1886 M), sedangkan ibundanya, Nyai Artimah, adalah putri KH. Sholeh Banjarmelati Kediri (sehingga Kiai Ihsan Jampes merupakan keponakan dari istri Mbah Abdul Karim Lirboyo). Di masa mudanya, Bakri dikenal memiliki kecerdasan luar biasa dan menguasai bela diri pencak silat, namun sempat menjalani fase kehidupan yang bebas sebelum akhirnya mengalami titik balik ruhani (*taubat nasuha*) setelah menunaikan ibadah haji pada tahun 1926 M dan berganti nama menjadi **Ihsan**.\n\nSekembalinya dari Tanah Suci dan wafatnya ayahanda beliau pada tahun 1928 M, Kiai Ihsan bersama adiknya KH. Marzuqi Dahlan (yang kelak menjadi pengasuh PP Lirboyo) mengasuh Pondok Pesantren Jampes hingga jumlah santrinya melampaui seribu orang. Keajaiban intelektual Syekh Ihsan Jampes yang menggemparkan dunia Islam internasional adalah keberhasilan beliau menyusun kitab tasawuf berbahasa Arab tingkat tinggi setebal lebih dari 1.000 halaman (2 jilid besar) berjudul **Sirajuth Thalibin**—sebuah syarah (ulasan mendalam) atas kitab terakhir karya Hujjatul Islam Imam Al-Ghazali, *Minhajul ’Abidin*. Kitab ini diselesaikan beliau di bilik sederhana Pesantren Jampes pada 29 Sya’ban 1351 H (27 Desember 1932 M).\n\nKetika naskah *Sirajuth Thalibin* dicetak oleh penerbit terkemuka *Musthafa Al-Babi Al-Halabi* di Kairo, Mesir, para ulama besar Universitas Al-Azhar Kairo terkagum-kagum atas kedalaman bahasa Arab dan keluasan referensi seorang ulama dari desa kecil di Kediri yang bahkan tidak pernah kuliah di Timur Tengah. Universitas Al-Azhar bahkan sempat mengirim delegasi ke Kediri untuk mengundang Syekh Ihsan mengajar di Kairo, namun beliau dengan penuh *tawadhu’* memilih tetap mengajar para santri di Jampes. Syekh Ihsan Jampes wafat pada hari Senin, 25 Dzulhijjah 1371 H (15 September 1952 M) dalam usia 51 tahun dan dimakamkan di Kompleks Maqbarah Pondok Pesantren Al-Ihsan Jampes, Gampengrejo, Kediri.',
    karomah: [
      'Dalam catatan filologis Prof. Dr. Martin van Bruinessen dan riwayat pesantren Kediri, karomah ilmiah terbesar Syekh Ihsan Jampes adalah bagaimana seorang kiai kampung yang hanya mengembara singkat di pesantren-pesantren Jawa mampu menulis kitab berbahasa Arab yang sangat elok sastranya (*balaghah*) dan mengutip puluhan kitab klasik hingga dijadikan buku daras pascasarjana di Universitas Al-Azhar Mesir serta masjid-masjid di Afrika Utara dan Asia Tenggara.<!--more-->\n\nDalam tradisi lisan santri Jampes, selama delapan bulan menulis kitab *Sirajuth Thalibin*, Syekh Ihsan senantiasa menjaga wudhu (*dawamul wudhu*), menyeduh kopi hitam sambil bertafakur di malam hari, dan tidak pernah menulis satu kalimat pun kecuali setelah hatinya terasa hadir bersama cahaya ilmu Imam Al-Ghazali.',
    ],
    untoldStory:
      'Selain *Sirajuth Thalibin*, Syekh Ihsan Jampes juga menulis risalah fikih sosial yang sangat unik berjudul *Irsyadul Ikhwan fi Bayani Ahkamil Qahwati wad Dukhan* yang mengupas sejarah serta perbedaan pendapat ulama empat mazhab mengenai hukum meminum kopi dan merokok secara sangat objektif dan moderat.<!--more-->\n\nDi Kompleks Maqbarah Pondok Pesantren Al-Ihsan Jampes (Desa Putih, Gampengrejo, sekitar 6 km di sebelah utara Kota Kediri), pusara Syekh Ihsan Muhammad Dahlan berdampingan dengan makam ayahandanya KH. Muhammad Dahlan dan selalu diziarahi oleh para penulis, akademisi, serta santri pengkaji kitab *Minhajul ’Abidin* dan *Sirajuth Thalibin*.',
    barokahHajat:
      'Peziarah, santri, peneliti, dan penulis yang berziarah ke maqbarah Syekh Ihsan Muhammad Dahlan di Jampes Kediri umumnya bertawassul memohon kepada Allah SWT produktivitas dan keberkahan dalam menulis karya ilmiah (*ta’lif*), kejernihan batin dalam mendalami ilmu tasawuf Imam Al-Ghazali, serta keikhlasan dan ketawadhuan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syekh Ihsan bin Muhammad Dahlan Al-Jampesi Al-Kadiri',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ مُصَنِّفِ سِرَاجِ الطَّالِبِينَ الشَّيْخِ إِحْسَانْ بْنِ مُحَمَّدْ دَحْلَانْ الْجَمْفِسِيِّ الْكَدِيرِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَلَّامَةِ الْعَارِفِ بِاللهِ مُصَنِّفِ سِرَاجِ الطَّالِبِينَ الشَّيْخِ إِحْسَانْ بْنِ مُحَمَّدْ دَحْلَانْ الْجَمْفِسِيِّ الْكَدِيرِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikhil-'Allaamatil-'Aarifi billaah Mushannifi Siraajith-Thaalibiin asy-Syaikh Ihsaan bin Muhammad Dahlaan al-Jamfisii al-Kadiirii syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihii wa mushannafaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah Al-Arif Billah pengarang kitab Sirajuth Thalibin Syekh Ihsan bin Muhammad Dahlan Al-Jampesi Kediri, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, karya-karya kitab, dan rahasia hikmah beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Al-Allamah Al-Arif Billah pengarang kitab Sirajuth Thalibin Syekh Ihsan bin Muhammad Dahlan Al-Jampesi Kediri, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, karya-karya kitab, dan rahasia hikmah beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '25 Dzulhijjah (Puncak Haul Akbar Tahunan Syekh Ihsan bin Muhammad Dahlan Al-Jampesi di Pondok Pesantren Al-Ihsan Jampes, Desa Putih, Kecamatan Gampengrejo, Kabupaten Kediri).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melepas alas kaki saat memasuki serambi maqbarah keluarga Pesantren Jampes, serta menjaga ketenangan lingkungan asrama santri.',
    facilities: ['Cungkup Maqbarah Syekh Ihsan Jampes & KH. Muhammad Dahlan', 'Masjid Jami’ Pondok Pesantren Al-Ihsan Jampes', 'Perpustakaan Turats Pesantren Jampes', 'Area Parkir Peziarah Desa Putih Gampengrejo'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib Pondok Pesantren Al-Ihsan Jampes)',
    references: [
      'Al-Jampesi, Syekh Ihsan Muhammad Dahlan (1932). Sirajuth Thalibin ’ala Minhajil ’Abidin. Kairo: Musthafa Al-Babi Al-Halabi.',
      'Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat. Bandung: Mizan.',
      'Wieringa, Edwin (2009). "A Javanese Sufi Classic: Ihsan Dahlan’s Siraj al-Talibin", Studia Islamika.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'bathoro-katong-ponorogo',
    name: 'Makam Bathoro Katong (Raden Joko Piturun) — Setono, Jenangan, Ponorogo',
    title: 'Adipati Pertama & Pendiri Kabupaten Ponorogo, Putra Prabu Brawijaya V Pengemban Dakwah Kesultanan Demak',
    description:
      'Kompleks Cagar Budaya Makam Bathoro Katong (Raden Joko Piturun, wafat awal abad ke-16 M) di Kelurahan Setono, Kecamatan Jenangan, Kabupaten Ponorogo—pendiri Kadipaten Ponorogo (1496 M) dan pelopor pengislaman wilayah Mataraman Barat.',
    category: 'Auliya Nusantara',
    era: 'Akhir Abad ke-15 – Awal Abad ke-16 M (1496 M)',
    province: 'Jawa Timur',
    city: 'Ponorogo',
    district: 'Kec. Jenangan',
    address: 'Jl. Bathoro Katong, Lingkungan Plampitan, Kel. Setono, Kec. Jenangan, Kabupaten Ponorogo',
    location: {
      lat: -7.8558,
      lng: 111.4914,
      address: 'Jl. Bathoro Katong, Lingkungan Plampitan, Kel. Setono, Kec. Jenangan, Kabupaten Ponorogo',
      district: 'Kec. Jenangan',
      city: 'Ponorogo',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Kompleks Makam Bathoro Katong Setono Jenangan Ponorogo',
    sanad:
      'Putra Raja Majapahit Prabu Brawijaya V (Kertabhumi) dari permaisuri Putri Bagelen dan adik seayah dari Sultan Demak Raden Patah; murid dari Sunan Bonang dan Sunan Kalijaga; berdakwah di Ponorogo didampingi ulama kepercayaannya Kiai Ageng Mirah (Muslim) dan Selo Aji.',
    karya: [
      'Pendirian Kadipaten Ponorogo pada tahun 1496 M (1418 Saka) dan perintisan Kota Lama (Pasar Pon / Katongan)',
      'Pengislaman masyarakat Wengker/Ponorogo melalui akulturasi seni budaya Reog Ponorogo dan Grebeg Suro',
      'Pembangunan masjid kuno dan pusat pemerintahan Islam pertama di Ponorogo bersama Kiai Ageng Mirah',
    ],
    history:
      '**Bathoro Katong**—yang memiliki nama asli **Raden Joko Piturun** atau Raden Harakanyaketu (akhir abad ke-15 hingga awal abad ke-16 M)—adalah putra Raja Majapahit terakhir, Prabu Brawijaya V, sekaligus adik seayah dari pendiri Kesultanan Demak Bintoro, Sultan Alam Akbar Al-Fatah (Raden Patah). Setelah memeluk agama Islam dan berguru ilmu agama serta hikmah kepada para Wali Songo di Demak dan Tuban (terutama Sunan Bonang dan Sunan Kalijaga), Raden Joko Piturun diutus oleh kakaknya Raden Patah pada sekitar tahun 1486–1496 M untuk membuka wilayah dan menyebarkan agama Islam di bekas wilayah *Kademangan Wengker* di lereng barat Gunung Wilis yang kala itu masih dikuasai oleh penguasa lokal sakti penganut ajaran Hindu-Buddha/Kejawen, **Ki Ageng Kutu Surya Alam**.\n\nDalam menjalankan misi dakwah dan penataan pemerintahan di Wengker, Bathoro Katong didampingi oleh punggawa setianya **Selo Aji** serta seorang mubaligh alim asal pesisir, **Kiai Ageng Mirah** (putra Kiai Ageng Muslim). Melalui perjuangan panjang yang memadukan diplomasi kekeluargaan (menikahi putri Ki Ageng Kutu yang bernama Niken Gandini) dan keteguhan strategi, Bathoro Katong berhasil menundukkan perlawanan di Wengker, membabat hutan Glagahwangi/Pramana, dan secara resmi mendirikan **Kadipaten Ponorogo** pada tanggal **11 Agustus 1496 M** (1 Suro / Muharram). Gelar *Bathoro Katong* diberikan oleh masyarakat Ponorogo sebagai penghormatan tertinggi yang bermakna pemimpin agung yang memancarkan kewibawaan ilahiah.\n\nBersama Kiai Ageng Mirah, Adipati Bathoro Katong mentransformasikan seni pertunjukan rakyat peninggalan Ki Ageng Kutu (*Barongan/Reog*) menjadi media dakwah kultural Islam—di mana rangkaian *buntal* dan *tasbih* pada paruh burung merak di atas kepala *Singa Barong* melambangkan bimbingan dzikir dan ajaran Islam yang menuntun kekuatan nafsu. Setelah wafat pada awal abad ke-16 M, Bathoro Katong dimakamkan di Kompleks Pemakaman Kuno **Kelurahan Setono, Kecamatan Jenangan, Kabupaten Ponorogo**.',
    karomah: [
      'Dalam naskah *Babad Ponorogo* karya Purwowijoyo dan tradisi lisan masyarakat Ponorogo, karomah kepemimpinan Bathoro Katong tampak ketika beliau dan Kiai Ageng Mirah membuka hutan belantara yang penuh gangguan makhluk halus dan banjir di kawasan Katongan/Setono; melalui shalat hajat dan dzikir berjamaah, kawasan tersebut berubah menjadi tanah permukiman yang subur dan tenteram (*Pramana Raga / Ponorogo*).<!--more-->\n\nHingga hari ini, tiga pusaka peninggalan masa Bathoro Katong—yakni *Tombak Kyai Tunggul Naga*, *Sabuk Angkin Cinde Puspita*, dan *Payung Kyai Tunggul Wulung*—masih dirawat sebagai pusaka simbolik Kabupaten Ponorogo yang dikirab setiap peringatan Hari Jadi Ponorogo dan *Grebeg Suro* dari Kota Lama (Makam Bathoro Katong Setono) menuju Pusat Kota Ponorogo.',
    ],
    untoldStory:
      'Arsitektur Kompleks Makam Bathoro Katong di Kelurahan Setono, Jenangan masih mempertahankan tata ruang makam raja-raja Jawa masa transisi Majapahit–Demak: dikelilingi tembok bata merah kuno yang tebal tanpa semen (*kosod*), gapura *Paduraksa* dan *Candi Bentar* bersusun tujuh halaman, serta sepasang gentong air batu andesit kuno (*Gentong Kyai Mendung*) di depan masjid makam yang airnya tak pernah kering.<!--more-->\n\nDi sekitar kawasan Setono dan Kota Lama (Pasar Pon), peziarah juga dapat mengunjungi Makam Kiai Ageng Mirah (ulama penasihat utama Bathoro Katong) di Desa Nambangrejo/Mirah, Kecamatan Sukorejo, Ponorogo.',
    barokahHajat:
      'Peziarah dan masyarakat Ponorogo yang berziarah ke maqbarah Bathoro Katong di Setono Jenangan Ponorogo umumnya bertawassul memohon kepada Allah SWT kewibawaan dan keadilan dalam memimpin, keselamatan dan kerukunan masyarakat, serta keberkahan melestarikan budaya yang selaras dengan nilai agama.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Adipati Bathoro Katong & Kiai Ageng Mirah (Ponorogo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْمُجَاهِدِ وَالدَّاعِي إِلَى اللهِ رَادِينْ بَطَارَا كَاتُونْغ (جُوكُو فِيتُورُونْ) وَالشَّيْخِ كِيَاهِي أَغِينْغ مِيرَاهْ فُونُورُوغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْمُجَاهِدِ وَالدَّاعِي إِلَى اللهِ رَادِينْ بَطَارَا كَاتُونْغ (جُوكُو فِيتُورُونْ) وَالشَّيْخِ كِيَاهِي أَغِينْغ مِيرَاهْ فُونُورُوغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَانْفَعْنَا بِبَرَكَاتِهِمَا فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Amiiril-Mujaahid wad-Daa'ii ilallaah Raden Bathoro Katong (Joko Piturun) wasy-Syaikh Kiyaahii Ageng Mirah Ponorogo syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahumaa warhamhumaa wanfa'naa bi barakaatihimaa fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pejuang dan pendakwah di jalan Allah Raden Bathoro Katong (Joko Piturun) beserta Kiai Ageng Mirah Ponorogo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pejuang dan pendakwah di jalan Allah Raden Bathoro Katong (Joko Piturun) beserta Kiai Ageng Mirah Ponorogo, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah keduanya, serta limpahkanlah kemanfaatan melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '1 Muharram / Malam 1 Suro & 11 Agustus (Puncak Ziarah Agung Grebeg Suro & Hari Jadi Kabupaten Ponorogo di Kompleks Makam Bathoro Katong, Kelurahan Setono, Kecamatan Jenangan, Kabupaten Ponorogo).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, melepas alas kaki saat melewati gapura Paduraksa menuju halaman inti cungkup makam, serta melapor kepada juru kunci (*abdi dalem*) makam Setono.',
    facilities: ['Kompleks Cungkup & Gapura Bata Kuno Makam Bathoro Katong', 'Masjid Jami’ Bathoro Katong Setono', 'Gentong Batu Kuno Kyai Mendung', 'Area Parkir Bus Wisata Religi Setono Jenangan Ponorogo'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Purwowijoyo (1985). Babad Ponorogo (Jilid I–IV). Ponorogo: Pemerintah Kabupaten Daerah Tingkat II Ponorogo.',
      'Balai Pelestarian Cagar Budaya (BPCB) Jawa Timur — Profil Cagar Budaya Kompleks Makam Bathoro Katong Ponorogo.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-hasan-besari-tegalsari',
    legacyId: 'auliya-30',
    name: 'Makam Kiai Ageng Muhammad Besari & Kiai Ageng Hasan Besari (Tegalsari, Jetis, Ponorogo)',
    title: 'Maha Guru Raja, Pujangga & Ulama Jawa di Pesantren Gebang Tinatar Tegalsari Abad ke-18',
    description:
      'Kompleks Cagar Budaya Masjid Jami’ dan Maqbarah Kiai Ageng Muhammad Besari serta cucunya Kiai Ageng Hasan Besari di Desa Tegalsari, Kecamatan Jetis, Kabupaten Ponorogo—induk pesantren Nusantara yang melahirkan R.Ng. Ronggowarsito dan HOS Tjokroaminoto.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-18 – Abad ke-19 M (Berdiri ~1700–1742 M)',
    province: 'Jawa Timur',
    city: 'Ponorogo',
    district: 'Kec. Jetis',
    address: 'Kompleks Masjid Jami’ Tegalsari, Dukuh Gendol, Desa Tegalsari, Kec. Jetis, Kabupaten Ponorogo',
    location: {
      lat: -7.9347,
      lng: 111.5172,
      address: 'Kompleks Masjid Jami’ Tegalsari, Dukuh Gendol, Desa Tegalsari, Kec. Jetis, Kabupaten Ponorogo',
      district: 'Kec. Jetis',
      city: 'Ponorogo',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Nasional Masjid Jami’ & Makam Kiai Ageng Besari Tegalsari Jetis Ponorogo',
    sanad:
      'Kiai Ageng Muhammad Besari (wafat ~1747/1773 M) adalah putra Kiai Anom Besari Kuncen Caruban (keturunan Sunan Ampel dan Prabu Brawijaya V); ayah dari Kiai Ilyas dan kakek dari Kiai Ageng Hasan Besari (1762–1862 M) yang menikahkan putrinya dengan bangsawan Keraton Kasunanan Surakarta.',
    karya: [
      'Pendirian Pesantren Gebang Tinatar Tegalsari Ponorogo (awal abad ke-18 M), cikal bakal sistem pesantren besar di Pulau Jawa',
      'Pembangunan Masjid Jami’ Tegalsari berarsitektur tajug tumpang tiga dengan 36 tiang kayu jati utuh tanpa paku',
      'Kaderisasi tokoh besar Nusantara: Sri Susuhunan Pakubuwono II (Kartasura), Pujangga Agung R.Ng. Ronggowarsito (Bagus Burham), Kiai Abdul Mannan (pendiri Pesantren Tremas Pacitan), dan HOS Tjokroaminoto (cicit Kiai Ageng Hasan Besari)',
    ],
    history:
      'Desa Tegalsari di Kecamatan Jetis, Kabupaten Ponorogo menempati posisi yang sangat sakral dalam historiografi Islam Indonesia sebagai lokasi **Pesantren Gebang Tinatar Tegalsari**, salah satu pesantren tertua dan paling berpengaruh di Nusantara yang berdiri sejak awal abad ke-18 M. Pendirinya adalah **Kiai Ageng Muhammad Besari** (wafat sekitar 1747/1773 M), seorang ulama sufi keturunan Sunan Ampel dan trah Majapahit yang semula bertapa dan membuka dukuh perdikan di tepi Sungai Keyang, Jetis, Ponorogo bersama sahabatnya Kiai Donopuro.\n\nPeristiwa sejarah besar terjadi pada tahun **1742 M** ketika meletus *Geger Pecinan* di Keraton Kartasura. Raja Kasunanan Kartasura, **Sri Susuhunan Pakubuwono II**, terpaksa mengungsi ke arah timur melintasi Gunung Lawu hingga tiba di Pesantren Tegalsari Ponorogo. Di bawah bimbingan ruhani, riyadhah, dan nasihat Kiai Ageng Muhammad Besari (serta bantuan santri pilihan bernama Bagus Harun/Kiai Ageng Basyariyah Sewulan), Pakubuwono II berhasil merebut kembali takhtanya dan kemudian memindahkan keraton ke Surakarta Hadiningrat (1745 M). Sebagai ungkapan syukur, Pakubuwono II menetapkan Desa Tegalsari sebagai **Desa Perdikan** (bebas pajak kerajaan dan otonom secara hukum syariat).\n\nPuncak keemasan Pesantren Gebang Tinatar berlangsung pada masa kepemimpinan cucu beliau, **Kiai Ageng Hasan Besari** (memimpin 1800–1862 M), ketika jumlah santri mencapai ribuan orang dari seluruh Jawa dan Madura. Di pesantren inilah **Bagus Burham** (yang kelak menjadi Pujangga Besar Keraton Surakarta **R.Ng. Ronggowarsito**) ditempa riyadhahnya, **Kiai Abdul Mannan Dipomenggolo** (pendiri Pondok Tremas Pacitan) menimba ilmu, dan dari darah keturunan Kiai Ageng Hasan Besari lahir Pahlawan Nasional Guru Bangsa **HOS Tjokroaminoto** serta ulama diplomat **KH. Mas Mansur**. Kiai Ageng Muhammad Besari dan Kiai Ageng Hasan Besari dimakamkan di Kompleks Maqbarah Barat Masjid Jami’ Tegalsari, Kecamatan Jetis, Kabupaten Ponorogo.',
    karomah: [
      'Dalam naskah *Babad Perdikan Tegalsari* dan *Serat Centhini*, Kiai Ageng Muhammad Besari dan Kiai Ageng Hasan Besari dikenal memiliki karomah kewalian yang memadukan kedalaman tasawuf *Ahlussunnah wal Jama’ah* dengan keluhuran budi Jawa. Dikisahkan ketika santrinya yang nakal, Bagus Burham (Ronggowarsito muda), bertobat dan diperintahkan berendam (*kungkum*) berzikir selama 40 hari di Sungai Keyang oleh Kiai Ageng Hasan Besari, atas izin Allah SWT terbukalah mata batin (*kasyaf*) Bagus Burham hingga menjadi pujangga penutup tanah Jawa pengarang *Serat Kalatidha*.<!--more-->\n\nDi halaman depan Masjid Jami’ Tegalsari masih tersimpan artefak **Batu Bancik** (batu andesit peninggalan masa Hindu-Buddha yang dijadikan pijakan wudhu/shalat Kiai Ageng Besari), dan 36 tiang *saka guru* kayu jati Masjid Tegalsari yang berusia hampir tiga abad masih berdiri tegak tanpa sambungan paku besi.',
    ],
    untoldStory:
      'Silsilah keturunan Kiai Ageng Muhammad Besari dan Kiai Ageng Hasan Besari Tegalsari menurunkan jaringan pesantren dan tokoh pergerakan terbesar di Indonesia: mulai dari Pondok Pesantren Gontor Ponorogo (didirikan oleh keturunan trah Tegalsari, KH. Ahmad Sahal, KH. Zainuddin Fananie, dan KH. Imam Zarkasyi), Pesantren Sewulan Madiun, Pesantren Banjarsari, hingga tokoh nasional HOS Tjokroaminoto.<!--more-->\n\nKompleks Makam Kiai Ageng Muhammad Besari dan Kiai Ageng Hasan Besari berada tepat di belakang mihrab Masjid Jami’ Tegalsari dengan pintu masuk cungkup kayu jati kuno yang sangat rendah—mengajarkan filosofi bahwa setiap peziarah, setinggi apa pun pangkat dan jabatannya, wajib menundukkan kepala dan merendahkan hati (*tawadhu’*) di hadapan ulama.',
    barokahHajat:
      'Peziarah, santri, sastrawan, dan pemimpin yang berziarah ke maqbarah Kiai Ageng Muhammad Besari dan Kiai Ageng Hasan Besari di Tegalsari Ponorogo umumnya bertawassul memohon kepada Allah SWT kemuliaan ilmu dan sastra hikmah, keberkahan mendirikan lembaga pendidikan/pesantren, serta keturunan yang menjadi pemimpin umat.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Kiai Ageng Muhammad Besari & Kiai Ageng Hasan Besari (Tegalsari Ponorogo)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَارِفِ بِاللهِ كِيَاهِي أَغِينْغ مُحَمَّدْ بِسَارِي وَابْنِهِ الشَّيْخِ إِلْيَاسْ وَحَفِيدِهِ كِيَاهِي أَغِينْغ حَسَنْ بِسَارِي تَغَالْسَارِي فُونُورُوغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ الْعَارِفِ بِاللهِ كِيَاهِي أَغِينْغ مُحَمَّدْ بِسَارِي وَابْنِهِ الشَّيْخِ إِلْيَاسْ وَحَفِيدِهِ كِيَاهِي أَغِينْغ حَسَنْ بِسَارِي تَغَالْسَارِي فُونُورُوغُو شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikhil-'Aarifi billaah Kiyaahii Ageng Muhammad Besari wabnihisy-Syaikh Ilyaas wa hafiidihii Kiyaahii Ageng Hasan Besari Tegalsari Ponorogo syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa barakaatihim wa asraarihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-arif billah Kiai Ageng Muhammad Besari, putranya Kiai Ilyas, dan cucunya Kiai Ageng Hasan Besari Tegalsari Ponorogo, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, keberkahan, dan rahasia hikmah mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-arif billah Kiai Ageng Muhammad Besari, putranya Kiai Ilyas, dan cucunya Kiai Ageng Hasan Besari Tegalsari Ponorogo, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, keberkahan, dan rahasia hikmah mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Malam Jumat Kliwon & Bulan Rabiul Awal / Rajab (Puncak Haul Agung Kiai Ageng Muhammad Besari & Kiai Ageng Hasan Besari di Kompleks Masjid Jami’ Tegalsari, Kecamatan Jetis, Kabupaten Ponorogo).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menundukkan badan dengan khidmat saat melewati pintu kayu rendah cungkup utama Makam Kiai Ageng Muhammad Besari, serta menjaga kelestarian bangunan Masjid Jami’ dan Ndalem Ageng Tegalsari yang berstatus Cagar Budaya Nasional.',
    facilities: ['Masjid Jami’ Kuno Cagar Budaya Nasional Tegalsari', 'Cungkup Maqbarah Kiai Ageng Muhammad Besari & Kiai Ageng Hasan Besari', 'Ndalem Ageng Kasepuhan Tegalsari', 'Terminal Parkir Bus Wisata Religi Desa Tegalsari Jetis Ponorogo'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Guillot, Claude (1985). "La nécessaire relecture de l’accord de 1742 entre Pakubuwana II et Kyai Ageng Muhammad Besari de Tegalsari", Archipel.',
      'Fokkens, F. (1877). "De Priesterschool te Tegalsari", Tijdschrift voor Indische Taal-, Land- en Volkenkunde (TBG).',
      'BPCB Jawa Timur — Monografi Cagar Budaya Nasional Kompleks Masjid dan Makam Tegalsari Ponorogo.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'masyayikh-tremas-pacitan',
    legacyId: 'ulama-41',
    name: 'Makam Masyayikh Pondok Tremas: KH. Abdul Mannan, KH. Abdullah, KH. Dimyathi & KH. Hamid Dimyathi (Arjosari, Pacitan)',
    title: 'Lembah Keilmuan Gunung Semanten & Poros Sanad Muhaddits Haramain Syekh Mahfudz At-Tarmasi',
    description:
      'Kompleks Maqbarah Gunung Lembu / Semanten Pondok Tremas di Desa Tremas, Kecamatan Arjosari, Kabupaten Pacitan—tempat peristirahatan pendiri Pondok Tremas (1830 M) KH. Abdul Mannan Dipomenggolo, KH. Abdullah, KH. Dimyathi At-Tarmasi, dan syahid KH. Hamid Dimyathi, keluarga kandung muhaddits dunia Syekh Mahfudz At-Tarmasi.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Abad ke-20 M (Berdiri 1830 M)',
    province: 'Jawa Timur',
    city: 'Pacitan',
    district: 'Kec. Arjosari',
    address: 'Kompleks Pondok Tremas & Maqbarah Gunung Lembu, Desa Tremas, Kec. Arjosari, Kabupaten Pacitan',
    location: {
      lat: -8.1225,
      lng: 111.1585,
      address: 'Kompleks Pondok Tremas & Maqbarah Gunung Lembu, Desa Tremas, Kec. Arjosari, Kabupaten Pacitan',
      district: 'Kec. Arjosari',
      city: 'Pacitan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Pacitan (Kompleks Maqbarah Masyayikh Pondok Tremas Arjosari Pacitan)',
    sanad:
      'KH. Abdul Mannan Dipomenggolo (santri Kiai Ageng Hasan Besari Tegalsari Ponorogo & Universitas Al-Azhar Kairo abad ke-19) menurunkan KH. Abdullah At-Tarmasi (murid Syaikh Nawawi Al-Bantani), yang menurunkan dua permata dunia: Syaikh Muhammad Mahfudz bin Abdullah At-Tarmasi (1868–1920 M, Muhaddits Masjidil Haram yang wafat di Makkah) dan adiknya KH. Dimyathi bin Abdullah At-Tarmasi (1879–1934 M, pengasuh Pondok Tremas Pacitan).',
    karya: [
      'Pendirian Pondok Tremas Pacitan pada tahun 1830 M yang dijuluki para orientalis dan ulama sebagai "Al-Azhar-nya Pulau Jawa"',
      'Karya agung Syekh Mahfudz At-Tarmasi: Hasyiyah At-Tarmasi / Al-Manhalul ’Amim (7 jilid fikih Syafi’i), Mauhibah Dzil Fadhl, Kifayatul Mustafid (sanad keilmuan), dan Manhaj Dzawin Nazhar (Musthalah Hadis)',
      'Kaderisasi ulama besar abad ke-20 oleh KH. Dimyathi At-Tarmasi: KH. Ali Ma’shum (Krapyak), KH. Abdul Hamid (Pasuruan), KH. Mahrus Aly (Lirboyo), dan Prof. KH. Abdul Kahar Mudzakkir',
    ],
    history:
      '**Pondok Tremas** di Desa Tremas, Kecamatan Arjosari, Kabupaten Pacitan merupakan salah satu institusi pendidikan Islam tertua dan paling prestisius di Nusantara. Pesantren ini didirikan pada tahun **1830 M** (bertepatan dengan berakhirnya Perang Jawa) oleh **Raden Bagus Darso / KH. Abdul Mannan Dipomenggolo**, putra Demang Semanten (R. Ngabehi Dipomenggolo) yang menimba ilmu kepada Kiai Ageng Hasan Besari di Pesantren Tegalsari Ponorogo serta pernah belajar hingga ke Makkah dan Mesir. KH. Abdul Mannan awalnya mendirikan pesantren di Dusun Semanten sebelum dipindahkan ke Desa Tremas di tepi Sungai Grindulu oleh putranya, **KH. Abdullah bin Abdul Mannan At-Tarmasi** (wafat di Makkah tahun 1896 M).\n\nDari pernikahan KH. Abdullah At-Tarmasi dan Nyai Siti Aminah lahir deretan ulama kaliber dunia yang mengharumkan nama *At-Tarmasi* (Tremas) di kancah internasional, terutama putra sulungnya **Syaikh Muhammad Mahfudz bin Abdullah At-Tarmasi** (1868–1920 M) dan adiknya **KH. Muhammad Dimyathi bin Abdullah At-Tarmasi** (1879–1934 M). Syaikh Mahfudz At-Tarmasi menetap dan mengajar di Masjidil Haram Makkah, menulis lebih dari 20 kitab berbahasa Arab dalam bidang Hadis, القراءات العشر (*Qira’at Asyarah*), Ushul Fiqh, dan Fiqh Syafi’i, serta menjadi guru utama Hadratussyaikh KH. Hasyim Asy’ari, KH. Abdul Wahab Chasbullah, dan KH. Bisri Syansuri (Syaikh Mahfudz wafat di Makkah pada 1 Rajab 1338 H / 1920 M dan dimakamkan di Ma’la).\n\nSementara Syaikh Mahfudz mengajar di jantung Haramain, adiknya **KH. Dimyathi At-Tarmasi** (bersama saudaranya KH. Dahlan dan KH. Abdurrazzaq) pulang dari Makkah pada tahun 1894 M untuk memimpin langsung Pondok Tremas Pacitan. Di bawah asuhan KH. Dimyathi (1894–1934 M), Pondok Tremas mengalami masa keemasan luar biasa: santri-santri terbaik dari seluruh Jawa datang mengaji kitab-kitab besar kepada beliau, termasuk KH. Abdul Hamid Pasuruan, KH. Ali Ma’shum Krapyak, dan KH. Mahrus Aly Lirboyo. Kepemimpinan kemudian dilanjutkan oleh putranya, **KH. Hamid Dimyathi** (1913–1948 M, gugur sebagai syuhada mempertahankan NKRI saat tragedi pemberontakan PKI 1948) dan **KH. Habib Dimyathi** (1918–1997 M). Para masyayikh Pondok Tremas dimakamkan di **Maqbarah Gunung Lembu (Tremas)** dan **Maqbarah Semanten** di Kabupaten Pacitan.',
    karomah: [
      'Dalam buku *Dari Haramain ke Nusantara* karya Prof. Dr. Abdurrahman Mas’ud dan riwayat santri Tremas, kealiman KH. Dimyathi At-Tarmasi di Pacitan setara dengan kakaknya Syaikh Mahfudz At-Tarmasi di Makkah: KH. Dimyathi dikenal sanggup mengajar kitab-kitab fikih dan alat tingkat tinggi dari ba’da Subuh hingga larut malam hanya dari hafalan luar kepala, serta memiliki ketajaman *firasat* menentukan masa depan santri-santrinya (seperti saat beliau menggembleng khusus Abdul Mu’thi muda yang kelak menjadi wali besar KH. Abdul Hamid Pasuruan).<!--more-->\n\nDi Kompleks Maqbarah Gunung Lembu yang terletak di perbukitan sejuk sebelah barat Pondok Tremas, suasana keheningan dan kewibawaan ilmu sangat terasa; di puncak bukit inilah bersemayam KH. Dimyathi At-Tarmasi, KH. Hamid Dimyathi, dan KH. Habib Dimyathi.',
    ],
    untoldStory:
      'Sanad hadis *Shahih Bukhari* dan *Shahih Muslim* yang dimiliki oleh hampir seluruh pesantren Nahdlatul Ulama di Indonesia hari ini bermuara pada **Syaikh Mahfudz bin Abdullah At-Tarmasi (Tremas Pacitan)**—pemegang mata rantai sanad ke-23 dari Imam Al-Bukhari yang diakui oleh para muhaddits Makkah, Madinah, Mesir, hingga India dan Syam.<!--more-->\n\nPeziarah yang datang ke Pondok Tremas Pacitan lazimnya melakukan ziarah di dua titik utama: pertama ke makam pendiri awal **KH. Abdul Mannan Dipomenggolo** di Dusun Semanten (sekitar 8 km arah selatan di dekat Kota Pacitan), kemudian naik ke **Maqbarah Gunung Lembu** di kompleks Pondok Tremas, Kecamatan Arjosari.',
    barokahHajat:
      'Peziarah, santri, dan akademisi yang berziarah ke maqbarah Masyayikh Pondok Tremas di Arjosari Pacitan umumnya bertawassul memohon kepada Allah SWT ketersambungan sanad ilmu dengan Syaikh Mahfudz At-Tarmasi dan KH. Dimyathi, ketekunan muthala’ah kitab kuning, serta keteguhan menjaga akidah di masa fitnah.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syaikh Mahfudz At-Tarmasi & Masyayikh Pondok Tremas (Pacitan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْمَنَّانِ وَالشَّيْخِ عَبْدِ اللهِ وَالْعَلَّامَةِ الْمُحَدِّثِ الشَّيْخِ مُحَمَّدْ مَحْفُوظْ التَّرْمَسِيِّ وَأَخِيهِ الشَّيْخِ مُحَمَّدْ دِمْيَاطِي وَالشَّيْخِ حَمِيدْ دِمْيَاطِي وَالشَّيْخِ حَبِيبْ دِمْيَاطِي التَّرْمَسِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَأَسَانِيدِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الشَّيْخِ عَبْدِ الْمَنَّانِ وَالشَّيْخِ عَبْدِ اللهِ وَالْعَلَّامَةِ الْمُحَدِّثِ الشَّيْخِ مُحَمَّدْ مَحْفُوظْ التَّرْمَسِيِّ وَأَخِيهِ الشَّيْخِ مُحَمَّدْ دِمْيَاطِي وَالشَّيْخِ حَمِيدْ دِمْيَاطِي وَالشَّيْخِ حَبِيبْ دِمْيَاطِي التَّرْمَسِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمْ وَأَسَانِيدِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhisy-Syaikh 'Abdil-Mannaan wasy-Syaikh 'Abdillaah wal-'Allaamatil-Muhaddits asy-Syaikh Muhammad Mahfuuzh at-Tarmasii wa akhiihisy-Syaikh Muhammad Dimyaathii wasy-Syaikh Hamiid Dimyaathii wasy-Syaikh Habiib Dimyaathii at-Tarmasii syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihim wa asaaniidihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Abdul Mannan, KH. Abdullah, Al-Allamah Al-Muhaddits Syaikh Muhammad Mahfudz At-Tarmasi beserta saudaranya KH. Muhammad Dimyathi, KH. Hamid Dimyathi, dan KH. Habib Dimyathi Tremas Pacitan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, sanad-sanad, dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh KH. Abdul Mannan, KH. Abdullah, Al-Allamah Al-Muhaddits Syaikh Muhammad Mahfudz At-Tarmasi beserta saudaranya KH. Muhammad Dimyathi, KH. Hamid Dimyathi, dan KH. Habib Dimyathi Tremas Pacitan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, sanad-sanad, dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Rajab & Dzulqa’dah (Haul Syaikh Mahfudz At-Tarmasi pada 1 Rajab & Haul Akbar Masyayikh Pondok Tremas KH. Dimyathi pada bulan Dzulqa’dah di Pondok Tremas, Kecamatan Arjosari, Kabupaten Pacitan).',
    localAdab:
      'Wajib mengenakan pakaian muslim santri yang sopan dan menutup aurat, melapor pada pos tamu Pondok Tremas sebelum mendaki tangga menuju Maqbarah Gunung Lembu, serta menjaga ketenangan kegiatan belajar santri Perguruan Islam Pondok Tremas.',
    facilities: ['Kompleks Maqbarah Gunung Lembu Pondok Tremas', 'Masjid Jami’ Pondok Tremas Pacitan (Arsitektur Kuno 1894)', 'Perpustakaan Turats Attarmasi', 'Area Parkir Bus Tamu Pondok Tremas Arjosari Pacitan'],
    openingHours: '07.00 - 21.00 WIB (Mengikuti tata tertib Perguruan Islam Pondok Tremas)',
    references: [
      'Mas’ud, Abdurrahman (2006). Dari Haramain ke Nusantara: Jejak Intelektual Arsitek Pesantren. Jakarta: Kencana.',
      'At-Tarmasi, Syaikh Muhammad Mahfudz (1911). Kifayatul Mustafid lima ’ala minal Asanid. Kairo: Al-Maimuniyyah.',
      'Tim Penulis Pondok Tremas (2015). Biografi Masyayikh Pondok Tremas Pacitan (1830–2015). Pacitan: Attarmasi Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },

  // ============================================================================
  // 4. PULAU MADURA (BANGKALAN, SAMPANG, PAMEKASAN, SUMENEP)
  // ============================================================================
  {
    id: 'syaichona-kholil-bangkalan',
    legacyId: 'ulama-15',
    name: 'Makam Syaichona Muhammad Kholil (Martajasah, Bangkalan, Pulau Madura)',
    title: 'Maha Guru Ulama Pesantren Nusantara, Waliyullah Quthbul Zaman & Pemberi Restu Berdirinya NU',
    description:
      'Kompleks Masjid Agung dan Maqbarah Syaichona Muhammad Kholil bin Abdul Lathif (1820–1925 M) di Desa Martajasah, Kecamatan Bangkalan, Kabupaten Bangkalan, Pulau Madura—maha guru dari hampir seluruh kiai besar pendiri pesantren di Jawa dan Madura.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-19 – Awal Abad ke-20 M (1820–1925 M / 1235–1343 H)',
    province: 'Jawa Timur',
    city: 'Bangkalan',
    district: 'Kec. Bangkalan',
    address: 'Kompleks Masjid & Maqbarah Syaichona Muhammad Kholil, Jl. Raya Ketengan, Desa Martajasah, Kec. Bangkalan, Kabupaten Bangkalan, Madura',
    location: {
      lat: -7.0588,
      lng: 112.7318,
      address: 'Kompleks Masjid & Maqbarah Syaichona Muhammad Kholil, Jl. Raya Ketengan, Desa Martajasah, Kec. Bangkalan, Kabupaten Bangkalan, Madura',
      district: 'Kec. Bangkalan',
      city: 'Bangkalan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Masjid & Maqbarah Syaichona Muhammad Kholil Martajasah Bangkalan Madura',
    sanad:
      'Putra KH. Abdul Lathif bin Kiai Hamim bin Kiai Abdul Karim bin Kiai Muharram bin Kiai Asror Karomah bin Kiai Abdullah bin Sayyid Sulaiman (Mojoagung, cucu Sunan Gunung Jati dan Sultan Maulana Hasanuddin Banten); menimba ilmu di Pesantren Langitan, Cangaan Bangil, Keboncandi Pasuruan, Sidogiri, Bungah Gresik, serta di Makkah Al-Mukarramah berguru kepada Syaikh Nawawi Al-Bantani, Syaikh Ahmad Khatib Sambas, dan Sayyid Ahmad Zaini Dahlan.',
    karya: [
      'Kitab Al-Matnus Syarif (fikih dasar syariat yang menjadi pedoman pesantren Madura-Jawa), Kitab As-Silah fi Bayanin Nikah, dan Ratib Syaichona Kholil',
      'Penguasaan luar biasa atas Alfiyah Ibnu Malik (hafal 1.002 bait sejak muda bahkan mampu membacanya secara terbalik) dan Qira’at Sab’ah',
      'Kaderisasi langsung maha guru pesantren Nusantara: KH. Hasyim Asy’ari (Tebuireng), KH. Abdul Wahab Chasbullah (Tambakberas), KH. Bisri Syansuri (Denanyar), KH. Abdul Karim (Lirboyo), KH. Manaf / Mbah Ma’roef (Kedunglo), KH. As’ad Syamsul Arifin (Situbondo), KH. Maksum (Lasem), dan KH. Nawawi (Sidogiri)',
    ],
    history:
      '**Al-’Allamah Asy-Syaikh Muhammad Kholil bin Abdul Lathif Al-Bangkalani**—yang sangat dimuliakan oleh umat Islam Indonesia dengan gelar **Syaichona Kholil Bangkalan** atau *Mbah Kholil* (25 Mei 1820 / 11 Jumadil Akhir 1235 H – 24 April 1925 / 29 Ramadhan 1343 H)—lahir di Kampung Senenan, Kemayoran, Kabupaten Bangkalan, Pulau Madura. Ayahandanya, KH. Abdul Lathif, adalah ulama keturunan Sayyid Sulaiman Mojoagung (cucu Sunan Gunung Jati Cirebon). Sejak masa mudanya, Kholil kecil telah menghafal di luar kepala seribu bait *Alfiyah Ibnu Malik* dan Al-Qur’an, lalu mengembara menuntut ilmu sambil bekerja mandiri memanjat pohon kelapa dan mencuci pakaian gurunya di Pesantren Langitan Tuban, Cangaan Bangil, Keboncandi Pasuruan, dan Sidogiri.\n\nPada tahun 1859 M, Syaichona Kholil berangkat ke Makkah Al-Mukarramah. Selama perjalanan di atas kapal laut maupun saat bermukim di Makkah, beliau melakukan *riyadhah* tirakat yang sangat ketat demi menjaga kehalalan makanan. Di Masjidil Haram, beliau berguru kepada Sayyid Ahmad Zaini Dahlan, Syaikh Nawawi Al-Bantani, serta menerima baiat *Thariqah Qadiriyah wa Naqsyabandiyah* langsung dari Syaikh Ahmad Khatib As-Sambasi (satu angkatan dengan Syaikh Nawawi Banten dan Syaikh Abdul Karim Banten). Sekembalinya ke Pulau Madura, beliau mendirikan pesantren di Kademangan dan Demangan Barat, Bangkalan.\n\nPesantren Demangan Bangkalan di bawah asuhan Syaichona Kholil menjadi *"kawah candradimuka"* tempat digemblengnya hampir seluruh ulama besar pendiri pesantren di Jawa dan Madura pada akhir abad ke-19 dan awal abad ke-20: mulai dari Hadratussyaikh KH. Hasyim Asy’ari, KH. Abdul Wahab Chasbullah, KH. Bisri Syansuri, KH. Abdul Karim Lirboyo, KH. Romly Tamim Rejoso, KHR. As’ad Syamsul Arifin Situbondo, KH. Muhammad Shiddiq Jember, hingga KH. Ma’shum Lasem dan KH. Ahmad Syathibi Gentur Cianjur. Menjelang akhir hayatnya pada tahun 1924–1925, Syaichona Kholil mengutus santri mudanya Raden As’ad Syamsul Arifin mengantarkan isyarat tongkat Nabi Musa (QS. Thaha: 17–23) dan tasbih (*Ya Jabbar Ya Qahhar*) kepada KH. Hasyim Asy’ari di Tebuireng sebagai restu ilahiah berdirinya *Nahdlatul Ulama*. Beliau wafat dalam keadaan sujud/berzikir pada **29 Ramadhan 1343 H (24 April 1925 M)** dalam usia lebih dari satu abad (105 tahun Masehi / 108 tahun Hijriah) dan dimakamkan di **Desa Martajasah, Kecamatan Bangkalan, Kabupaten Bangkalan**.',
    karomah: [
      'Dalam kitab biografi *Surat kepada Anjing Hitam* karya Saifur Rachman dan ratusan riwayat mutawatir para kiai Jawa-Madura, karomah *kasyaf* (tersingkapnya tabir jarak dan waktu) Syaichona Muhammad Kholil sangat masyhur: mulai dari peristiwa beliau menghadap sedikit bergeser saat mengimami shalat Ashar di Bangkalan karena melihat langsung Ka’bah di Makkah, menyelamatkan kapal laut yang nyaris tenggelam dari kejauhan hanya dengan mengulurkan tangannya di sela-sela mengajar santri, hingga mendidik santri melalui isyarat batin yang baru dipahami puluhan tahun kemudian.<!--more-->\n\nDi antara kisah pendidikan ruhani (*tarbiyah*) yang paling legendaris di Pesantren Demangan Bangkalan adalah ketika Hadratussyaikh KH. Hasyim Asy’ari muda rela menceburkan diri ke dalam septik tank/jamban demi mencari cincin istri Syaichona Kholil yang jatuh, serta ketika KH. Abdul Wahab Chasbullah dan KH. Bisri Syansuri diuji keteguhan mentalnya oleh Syaichona Kholil sebelum keduanya diangkat menjadi pemimpin umat.',
    ],
    untoldStory:
      'Sejak dibukanya Jembatan Nasional Suramadu (Surabaya–Madura) pada tahun 2009, jumlah peziarah yang datang ke Kompleks Masjid Agung dan Maqbarah Syaichona Muhammad Kholil di Desa Martajasah, pesisir barat Kota Bangkalan melonjak hingga jutaan peziarah setiap tahunnya, menjadikan Martajasah sebagai salah satu dari tiga titik ziarah paling padat di Jawa Timur bersama Sunan Ampel Surabaya dan Gus Dur Tebuireng.<!--more-->\n\nDi dalam cungkup Maqbarah Martajasah Bangkalan, di samping pusara utama Syaichona Muhammad Kholil bin Abdul Lathif, juga bersemayam pusara cicit beliau yang sangat kharismatik dan dicintai masyarakat Madura, **KHS. Abdullah Schal** (wafat 2016 M), pengasuh Pondok Pesantren Syaichona Moh. Cholil Demangan Bangkalan.',
    barokahHajat:
      'Peziarah, kiai, dan santri dari seluruh Nusantara yang berziarah ke maqbarah Syaichona Muhammad Kholil di Martajasah Bangkalan umumnya bertawassul memohon kepada Allah SWT ketersambungan sanad ilmu dan berkah *Guru Para Wali Jawa-Madura*, hafalan dan kefahaman ilmu *Nahwu-Sharaf (Alfiyah Ibnu Malik)*, serta kemustajaban doa bagi anak-cucu yang sedang menuntut ilmu di pesantren.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Syaichona Muhammad Kholil bin Abdul Lathif (Bangkalan Madura)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ قُطْبِ الزَّمَانِ وَشَيْخِ مَشَايِخِ جَاوَى وَمَادُورَا شَيْخِنَا الْعَلَّامَةِ الشَّيْخِ مُحَمَّدْ خَلِيلْ بْنِ عَبْدِ اللَّطِيفْ الْبَانْغكَالَانِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ قُطْبِ الزَّمَانِ وَشَيْخِ مَشَايِخِ جَاوَى وَمَادُورَا شَيْخِنَا الْعَلَّامَةِ الشَّيْخِ مُحَمَّدْ خَلِيلْ بْنِ عَبْدِ اللَّطِيفْ الْبَانْغكَالَانِيِّ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Quthbiz-Zamaan wa Syaikhi Masyaayikhi Jaawaa wa Maaduuraa Syaikhinaa al-'Allaamah asy-Syaikh Muhammad Khaliil bin 'Abdil-Lathiif al-Bangkalaanii syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihii wa asraarihii wa karaamaatihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Quthbuz Zaman dan Maha Guru para ulama Jawa dan Madura Syaichona Al-Allamah Syaikh Muhammad Kholil bin Abdul Lathif Al-Bangkalani, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Quthbuz Zaman dan Maha Guru para ulama Jawa dan Madura Syaichona Al-Allamah Syaikh Muhammad Kholil bin Abdul Lathif Al-Bangkalani, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui ilmu, rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '27–29 Ramadhan (Puncak Haul Akbar Tahunan Syaichona Muhammad Kholil di Kompleks Masjid & Maqbarah Martajasah serta Pondok Pesantren Syaichona Moh. Cholil Demangan, Kecamatan Bangkalan, Kabupaten Bangkalan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti pembagian serambi maqbarah putra dan putri di sisi Masjid Syaichona Kholil Martajasah, serta menjaga ketertiban dari calo parkir atau pengemis di luar area resmi.',
    facilities: ['Masjid Agung Syaichona Muhammad Kholil Martajasah', 'Cungkup & Serambi Maqbarah Syaichona Muhammad Kholil', 'Sentra Oleh-Oleh Khas Madura & Batik Bangkalan', 'Terminal Parkir Bus Wisata Religi Martajasah Bangkalan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Rachman, Saifur (1999). Surat kepada Anjing Hitam: Biografi dan Karomah Syaikhona Kholil Bangkalan. Jakarta: Pustaka Ciganjur.',
      'Bakhri, Mokhammad Yahya (2006). Syaikhona Kholil Bangkalan: Penentu Berdirinya Nahdlatul Ulama. Surabaya: Khalista.',
      'Rifa’i, Mien Ahmad (2007). Manusia Madura: Pembawaan, Perilaku, Etos Kerja, Penampilan, dan Pandangan Hidupnya. Yogyakarta: Pilar Media.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'ratu-ibu-arosbaya',
    name: 'Kompleks Makam Aer Mata Ebhu (Ratu Ibu / Syarifah Ambami) — Buduran, Arosbaya, Bangkalan',
    title: 'Permaisuri Cakraningrat I, Cucu Sunan Giri & Situs Epigrafi Kaligrafi Batu Kapur Terbaik di Madura',
    description:
      'Kompleks Cagar Budaya Nasional Makam Aer Mata Ebhu di Desa Buduran, Kecamatan Arosbaya, Kabupaten Bangkalan—tempat peristirahatan Syarifah Ambami (Ratu Ibu, abad ke-17 M), cucu Sunan Giri dan permaisuri Pangeran Cakraningrat I, beserta raja-raja Bangkalan.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-17 – Abad ke-18 M (Wafat ~1648/1650 M)',
    province: 'Jawa Timur',
    city: 'Bangkalan',
    district: 'Kec. Arosbaya',
    address: 'Perbukitan Kampung Sekar, Desa Buduran, Kec. Arosbaya, Kabupaten Bangkalan, Madura',
    location: {
      lat: -6.9421,
      lng: 112.8512,
      address: 'Perbukitan Kampung Sekar, Desa Buduran, Kec. Arosbaya, Kabupaten Bangkalan, Madura',
      district: 'Kec. Arosbaya',
      city: 'Bangkalan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Situs Cagar Budaya Kompleks Makam Aer Mata Ebhu (Ratu Ibu Syarifah Ambami) Arosbaya Bangkalan Madura',
    sanad:
      'Syarifah Ambami (Ratu Ibu) adalah putri dari Panembahan Kawis Guwa dan cucu dari Sunan Giri (Raden Paku) di Gresik; permaisuri dari Pangeran Cakraningrat I (Raden Praseno, penguasa Madura Barat 1624–1647 M) dan ibunda dari Panembahan Cakraningrat II (Raden Undagan).',
    karya: [
      'Pertautan genealogis darah kewalian Sunan Giri (Gresik) dengan dinasti penguasa Bangkalan/Madura Barat (Wangsa Cakraningrat)',
      'Situs pertapaan bukit Buduran dan mahakarya arsitektur ukir batu kapur putih (*gunongan* dan *kijing* berornamen teratai-sulur abad ke-17 M)',
    ],
    history:
      'Di puncak bukit kapur Desa Buduran, Kecamatan Arosbaya, Kabupaten Bangkalan (sekitar 22 kilometer di sebelah utara Kota Bangkalan), terletak salah satu kompleks makam kerajaan Islam paling indah dan sakral di Nusantara, yakni **Kompleks Makam Aer Mata Ebhu** (*Air Mata Ibu*). Tokoh utama yang dimakamkan di cungkup tertinggi situs ini adalah **Kanjeng Ratu Ibu**, yang memiliki nama asli **Syarifah Ambami**, putri dari Panembahan Kawis Guwa dan cucu langsung dari anggota Wali Songo, **Sunan Giri (Prabu Satmata)** di Gresik.\n\nPada paruh pertama abad ke-17 M, Syarifah Ambami menikah dengan penguasa Madura Barat, **Pangeran Cakraningrat I** (*Raden Praseno*, memerintah 1624–1647 M). Karena tugas pemerintahan Mataram, Pangeran Cakraningrat I lebih banyak bertugas di keraton pusat Mataram (Plered/Kotagede Yogyakarta) membantu Sultan Agung Hanyakrakusuma, sementara Syarifah Ambami tinggal di keraton Sampang/Arosbaya mendidik putra-putranya dalam ketaatan agama. Dalam *Babad Madura*, dikisahkan bahwa Syarifah Ambami sangat merindukan suaminya dan memohon kepada Allah SWT agar keturunannya hingga tujuh turunan dianugerahi kekuasaan yang adil serta kemuliaan agama di Pulau Madura.\n\nKetika Pangeran Cakraningrat I pulang ke Madura dan mengetahui bahwa doa istrinya hanya dikabulkan hingga tujuh turunan karena istrinya sempat bersedih hati, Syarifah Ambami merasa sangat menyesal lalu mengasingkan diri untuk bertapa, berzikir, dan menangis bermunajat kepada Allah SWT di atas sebuah bukit batu kapur di Desa Buduran, Arosbaya, hingga air matanya membasahi batu pertapaan tersebut (yang kemudian melahirkan nama **Aer Mata Ebhu** / *Air Mata Ibu*). Beliau wafat sekitar pertengahan abad ke-17 M dan dimakamkan di bukit pertapaannya tersebut, didampingi oleh makam Pangeran Cakraningrat I hingga Cakraningrat V.',
    karomah: [
      'Dalam tradisi lisan masyarakat Madura dan naskah *Babad Tanah Jawi / Babad Madura*, riyadhah tangisan munajat (*buka’ aeng mata*) Ratu Ibu Syarifah Ambami di Bukit Buduran Arosbaya dipercaya dikabulkan oleh Allah SWT sehingga keturunan beliau dari Wangsa Cakraningrat bukan hanya memimpin pemerintahan di Madura selama berabad-abad, tetapi juga menurunkan ulama-ulama besar dan bangsawan yang taat beragama.<!--more-->\n\nDi kaki tebing Kompleks Makam Aer Mata Ebhu mengalir sumber mata air jernih dari celah batu kapur yang tidak pernah kering meskipun di puncak musim kemarau panjang di Pulau Madura, dan sering dimanfaatkan oleh para peziarah untuk berwudhu.',
    ],
    untoldStory:
      'Para arkeolog dan sejarawan seni—termasuk H.J. de Graaf dan Uka Tjandrasasmita—menobatkan pahatan batu nisan dan *gunongan* pada cungkup **Makam Ratu Ibu (Aer Mata Ebhu)** sebagai salah satu mahakarya seni pahat batu masa Islam paling halus di Indonesia: dinding kijing batu kapur putihnya diukir menyerupai sulur-suluran bunga teratai, kaligrafi Arab, dan medali geometris yang sangat artistik.<!--more-->\n\nTidak jauh dari Kompleks Makam Aer Mata Ebhu (sekitar 2 km di Desa Plakaran, Arosbaya), juga terdapat **Kompleks Makam Agung Arosbaya** tempat dimakamkannya raja-raja Islam pertama Bangkalan abad ke-16 M, yakni **Kiai Pratanu (Panembahan Lemah Duwur, memerintah 1531–1592 M)** yang pertama kali mengislamkan Kerajaan Arosbaya/Bangkalan.',
    barokahHajat:
      'Peziarah—khususnya para ibu dan orang tua—yang berziarah ke maqbarah Ratu Ibu Syarifah Ambami di Aer Mata Ebhu Arosbaya Bangkalan umumnya bertawassul memohon kepada Allah SWT kemustajaban doa seorang ibu bagi kesuksesan dan keimanan anak-cucu keturunannya, kesetiaan rumah tangga, serta kemuliaan derajat keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Ratu Ibu Syarifah Ambami (Aer Mata Ebhu Arosbaya Bangkalan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدَةِ الصَّالِحَةِ الْعَابِدَةِ الشَّرِيفَةِ أَمْبَامِي (رَاتُو إِيبُو أَيِيرْ مَاتَا إِيبُو) بِنْتِ فَانِيمْبَاهَانْ كَاوِيسْ غُووَا حَفِيدَةِ سُونَانْ غِيرِي وَسُلْطَانْ شَكْرَانِينْغَرَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي ذُرِّيَّاتِنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدَةِ الصَّالِحَةِ الْعَابِدَةِ الشَّرِيفَةِ أَمْبَامِي (رَاتُو إِيبُو أَيِيرْ مَاتَا إِيبُو) بِنْتِ فَانِيمْبَاهَانْ كَاوِيسْ غُووَا حَفِيدَةِ سُونَانْ غِيرِي وَسُلْطَانْ شَكْرَانِينْغَرَاتْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَنَا فِي ذُرِّيَّاتِنَا بِبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sayyidatish-Shaalihatil-'Aabidah asy-Syariifah Ambaamii (Ratu Ibu Aer Mata Ebhu) binti Panembahan Kawis Guwa hafiidati Sunan Giri wa Sulthaan Cakraningrat syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wa baarik lanaa fii dzurriyyaatinaa bi barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wanita salihah ahli ibadah Syarifah Ambami (Ratu Ibu Aer Mata Ebhu) cucu Sunan Giri beserta Pangeran Cakraningrat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta berkahilah keturunan kami melalui keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wanita salihah ahli ibadah Syarifah Ambami (Ratu Ibu Aer Mata Ebhu) cucu Sunan Giri beserta Pangeran Cakraningrat, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta berkahilah keturunan kami melalui keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Sya’ban (Ziarah Agung & Haul Ratu Ibu Syarifah Ambami di Kompleks Makam Aer Mata Ebhu, Desa Buduran, Kecamatan Arosbaya, Kabupaten Bangkalan).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, berhati-hati saat menaiki puluhan anak tangga batu terjal menuju pelataran cungkup bukit Buduran, serta dilarang menyentuh atau menggores ukiran batu kapur kuno abad ke-17 pada kijing Ratu Ibu.',
    facilities: ['Cungkup Ukiran Batu Kapur Kuno Makam Ratu Ibu (Cagar Budaya Nasional)', 'Mushalla & Tempat Wudhu Mata Air Bukit Buduran', 'Pendopo Istirahat Peziarah', 'Area Parkir Bus Wisata Religi Desa Buduran Arosbaya'],
    openingHours: '06.00 - 21.00 WIB (Buka 24 jam pada malam Jumat dan musim ziarah)',
    references: [
      'De Graaf, H.J. & Pigeaud, Th.G.Th. (1985). Kerajaan-Kerajaan Islam di Jawa. Jakarta: Grafiti Pers.',
      'Tjandrasasmita, Uka (2009). Arkeologi Islam Nusantara (Kajian Seni Hias Makam Aermata Arosbaya). Jakarta: KPG.',
      'Zainalfattah (1951). Sedjarah Tjaranja Pemerintahan di Daerah-Daerah di Kepulauan Madura dengan Hubungannja. Pamekasan: Paragon.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-cendana-bangkalan',
    name: 'Makam Sunan Cendana / Syaikh Zainal Abidin (Ketetang, Kwanyar, Bangkalan)',
    title: 'Waliyullah Agung Pengislam Tanah Madura, Cicit Sunan Giri & Guru Para Wali Madura Abad ke-16',
    description:
      'Kompleks Masjid dan Maqbarah Sunan Cendana (Sayyid Zainal Abidin bin Khotib Mantoh, abad ke-16/17 M) di Desa Ketetang, Kecamatan Kwanyar, Kabupaten Bangkalan—ulama sufi cicit Sunan Giri yang menjadi poros sanad kewalian Pulau Madura.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-16 – Awal Abad ke-17 M',
    province: 'Jawa Timur',
    city: 'Bangkalan',
    district: 'Kec. Kwanyar',
    address: 'Kompleks Makam Sunan Cendana, Kampung Cendana, Desa Ketetang, Kec. Kwanyar, Kabupaten Bangkalan, Madura',
    location: {
      lat: -7.1592,
      lng: 112.8531,
      address: 'Kompleks Makam Sunan Cendana, Kampung Cendana, Desa Ketetang, Kec. Kwanyar, Kabupaten Bangkalan, Madura',
      district: 'Kec. Kwanyar',
      city: 'Bangkalan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Madura (Kompleks Masjid & Makam Sunan Cendana Ketetang Kwanyar Bangkalan)',
    sanad:
      'Sayyid Zainal Abidin (Sunan Cendana) adalah putra dari Sunan Kulon / Pangeran Khotib Mantoh (Gresik/Sampang) bin Panembahan Kawis Guwa bin Sunan Giri (Raden Paku); guru ruhani dari Pangeran Katandur (Sumenep) dan leluhur jaringan ulama besar Pulau Madura hingga Syaichona Muhammad Kholil Bangkalan.',
    karya: [
      'Penyebaran dakwah Islam dan tasawuf di pesisir selatan Bangkalan (Kwanyar) dan pedalaman Pulau Madura pada abad ke-16 M',
      'Kaderisasi ulama dan bangsawan Madura serta perintisan pusat riyadhah Kampung Cendana Ketetang',
    ],
    history:
      '**Sunan Cendana**—yang memiliki nama asli **Sayyid Zainal Abidin** (hidup pada abad ke-16 hingga awal abad ke-17 M)—adalah salah satu waliyullah paling tua dan paling dihormati di seluruh Pulau Madura. Berdasarkan catatan genealogis *Lembaga Pencatat Silsilah Rato dan Bujuk Madura* serta naskah *Giri Kedaton*, beliau merupakan cicit langsung dari anggota Wali Songo, **Sunan Giri (Raden Paku)**: yakni putra dari Pangeran Khotib Mantoh (Sunan Kulon) bin Panembahan Kawis Guwa bin Sunan Giri.\n\nSejak masa mudanya, Sayyid Zainal Abidin ditempa ilmu syariat dan hakikat di Pesantren Giri Kedaton Gresik. Beliau kemudian menyeberang ke pesisir selatan Bangkalan dan memilih berkhalwat (*uzlah*) serta berdakwah di sebuah perbukitan yang ditumbuhi pohon-pohon cendana harum di **Desa Ketetang, Kecamatan Kwanyar, Kabupaten Bangkalan**. Karena tempat khalwat beliau berada di bawah naungan pohon cendana dan keharuman akhlak beliau yang menyebar ke seluruh penjuru Pulau Madura, masyarakat Madura memuliakan beliau dengan gelar **Sunan Cendana** (*Susuhunan Cendana* / *Bujuk Cendana*).\n\nSelama berdakwah di Kwanyar, Sunan Cendana berhasil mengislamkan masyarakat pesisir selatan Bangkalan dan menjadi rujukan utama para penguasa serta waliyullah di Madura, dari Bangkalan, Sampang, Pamekasan, hingga Sumenep. Beliau juga menurunkan banyak ulama besar di Madura dan Tapal Kuda Jawa Timur (termasuk silsilah leluhur Syaichona Muhammad Kholil Bangkalan dari jalur ibu/nenek serta para masyaikh di Probolinggo dan Situbondo). Setelah wafat, beliau dimakamkan di Kompleks Maqbarah Sunan Cendana, Desa Ketetang, Kecamatan Kwanyar, Kabupaten Bangkalan.',
    karomah: [
      'Dalam kitab manaqib dan tradisi lisan masyarakat Madura (*Babad Songennep* dan *Tjarita Bujuk*), dikisahkan karomah Sunan Cendana yang berpuasa bertahun-tahun di bukit Cendana Ketetang hingga tubuhnya menyatu dengan alam sekitar, serta kisah persahabatan ruhaninya dengan Kiai Agung Raba Pamekasan dan Pangeran Katandur Sumenep dalam menguji kesempurnaan ilmu makrifat.<!--more-->\n\nDi Kompleks Makam Sunan Cendana terdapat sebuah kolam kuno berisi **ikan-ikan keramat** (*Juko’ Sunan Cendana*) yang sejak ratusan tahun silam dijaga kelestariannya dan tidak pernah berani ditangkap atau dimakan oleh warga setempat sebagai bentuk penghormatan terhadap warisan ekologi sang wali.',
    ],
    untoldStory:
      'Bagi masyarakat Madura dan para santri Jawa Timur, berziarah ke Pulau Madura belum dianggap lengkap (*samporna*) apabila hanya berziarah ke Syaichona Kholil di Martajasah tanpa menyambung ziarah ke leluhur para wali Madura, yakni **Sunan Cendana** di Kecamatan Kwanyar (yang terletak sekitar 20 km di sebelah timur Jembatan Suramadu melalui jalur lintas selatan Kwanyar).<!--more-->\n\nHingga kini, Syaichona Muhammad Kholil Bangkalan semasa hidupnya diriwayatkan sangat sering berjalan kaki pada tengah malam dari Demangan Bangkalan menuju Desa Ketetang Kwanyar khusus untuk berziarah dan berkhalwat di pusara leluhurnya, Sunan Cendana.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sunan Cendana (Sayyid Zainal Abidin) di Ketetang Kwanyar Bangkalan umumnya bertawassul memohon kepada Allah SWT keharuman akhlak dan kemuliaan batin, keteguhan istiqamah dalam riyadhah dan ibadah, serta keberkahan silsilah keluarga.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sunan Cendana (Sayyid Zainal Abidin Kwanyar Bangkalan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْقُطْبِ الزَّاهِدِ سَيِّدِنَا الشَّيْخِ زَيْنِ الْعَابِدِينَ بْنِ خَطِيبْ مَانْتُوهْ الْمَعْرُوفِ بِسُونَانْ شَنْدَانَا كُوَانْيَارْ بَانْغكَالَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْقُطْبِ الزَّاهِدِ سَيِّدِنَا الشَّيْخِ زَيْنِ الْعَابِدِينَ بْنِ خَطِيبْ مَانْتُوهْ الْمَعْرُوفِ بِسُونَانْ شَنْدَانَا كُوَانْيَارْ بَانْغكَالَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَانْفَعْنَا بِأَسْرَارِهِ وَكَرَامَاتِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-Quthbiz-Zaahid Sayyidinaa asy-Syaikh Zainil-'Aabidiin bin Khathiib Maantuuh al-ma'ruufi bi Sunan Cendana Kwanyar Bangkalan syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahuu warhamhu wanfa'naa bi asraarihii wa karaamaatihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub yang zuhud penghulu kami Sayyid Syaikh Zainal Abidin bin Khotib Mantoh (Sunan Cendana Kwanyar Bangkalan), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali quthub yang zuhud penghulu kami Sayyid Syaikh Zainal Abidin bin Khotib Mantoh (Sunan Cendana Kwanyar Bangkalan), Al-Fatihah. Ya Allah, ampunilah dan rahmatilah beliau, serta limpahkanlah kemanfaatan melalui rahasia hikmah, karomah, dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '14–15 Muharram / Bulan Suro (Puncak Haul Akbar Tahunan Sunan Cendana di Desa Ketetang, Kecamatan Kwanyar, Kabupaten Bangkalan, Pulau Madura).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga ketenangan di dalam cungkup utama Sunan Cendana, serta dilarang keras menangkap atau menyakiti ikan-ikan di kolam kuno Kompleks Masjid Sunan Cendana.',
    facilities: ['Cungkup Utama Maqbarah Sunan Cendana', 'Masjid Jami’ Sunan Cendana Ketetang', 'Kolam Kuno Sunan Cendana', 'Terminal Parkir Bus Wisata Religi Desa Ketetang Kwanyar Bangkalan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zainalfattah (1951). Sedjarah Tjaranja Pemerintahan di Daerah-Daerah di Kepulauan Madura dengan Hubungannja. Pamekasan: Paragon.',
      'Wiryoprawiro, Zein M. (1986). Arsitektur Tradisional Madura Sumenep dengan Pendekatan Historis dan Deskriptif. Surabaya: Laboratorium Arsitektur Tradisional ITS.',
      'Kuntowijoyo (2002). Perubahan Sosial dalam Masyarakat Agraris: Madura 1850–1940. Yogyakarta: MataBangsa.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'bujuk-batu-ampar',
    name: 'Kompleks Makam Bujuk Batu Ampar (Syekh Abdul Mannan / Bujuk Kosambi & Syekh Abu Syamsuddin) — Pamekasan',
    title: 'Poros Utama Auliya Enem Bujuk Batu Ampar di Perbatasan Proppo–Pamekasan, Pulau Madura',
    description:
      'Kompleks Ziarah Akbar Bujuk Batu Ampar di Desa Pangbatok, Kecamatan Proppo, Kabupaten Pamekasan—menaungi enam pusara waliyullah besar Madura dari satu silsilah: Syekh Abdul Mannan (Bujuk Kosambi), Syekh Basyaniyah (Bujuk Tumpeng), Syekh Abu Syamsuddin (Bujuk Latthong), Syekh Husain, Syekh Moh. Romli, dan Syekh Damanhuri.',
    category: 'Ulama Nusantara',
    era: 'Abad ke-18 – Abad ke-20 M',
    province: 'Jawa Timur',
    city: 'Pamekasan',
    district: 'Kec. Proppo',
    address: 'Kompleks Wisata Religi Bujuk Batu Ampar, Desa Pangbatok, Kec. Proppo, Kabupaten Pamekasan, Madura',
    location: {
      lat: -7.0815,
      lng: 113.4126,
      address: 'Kompleks Wisata Religi Bujuk Batu Ampar, Desa Pangbatok, Kec. Proppo, Kabupaten Pamekasan, Madura',
      district: 'Kec. Proppo',
      city: 'Pamekasan',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pulau Madura (Kompleks Makam Auliya Batu Ampar Proppo Pamekasan)',
    sanad:
      'Silsilah Bujuk Batu Ampar bermula dari Syekh Abdul Mannan (Bujuk Kosambi, cicit Sunan Ampel / Pangeran Ketandur Sumenep) -> putranya Syekh Basyaniyah (Bujuk Tumpeng) -> putranya waliyullah masyhur Syekh Abu Syamsuddin (Bujuk Latthong) -> menurunkan Syekh Husain, Syekh Muhammad Romli, dan Syekh Damanhuri (Bujuk Pamekasan).',
    karya: [
      'Penyebaran dakwah Islam dan jaringan pesantren di wilayah tengah Pulau Madura (Pamekasan, Sampang, dan Sumenep Barat)',
      'Warisan tarekat, riyadhah, dan pusat ziarah enam generasi waliyullah (Enem Bujuk Batu Ampar)',
    ],
    history:
      'Di pedalaman hijau Desa Pangbatok, Kecamatan Proppo, Kabupaten Pamekasan (berdekatan dengan jalur menuju Guluk-Guluk Sumenep), terdapat kompleks makam waliyullah yang tidak pernah sepi selama 24 jam dari ribuan peziarah lintas provinsi, yakni **Pasarean Agung Bujuk Batu Ampar**. Dalam bahasa Madura, kata *Bujuk* adalah gelar kehormatan tertinggi bagi leluhur dan waliyullah penyebar agama Islam. Keistimewaan Kompleks Batu Ampar adalah berkumpulnya **enam generasi waliyullah besar (Enem Bujuk)** dari satu garis keturunan yang bersemayam di bukit-bukit yang saling berdekatan.\n\nPerintis pertama kemuliaan Batu Ampar adalah **Syekh Abdul Mannan** yang bergelar **Bujuk Kosambi** (abad ke-18 M), seorang ulama sufi keturunan Pangeran Katandur Sumenep dan Sunan Ampel Surabaya yang berkhalwat di bawah pohon kosambi di kawasan Batu Ampar. Putra beliau adalah **Syekh Basyaniyah** yang bergelar **Bujuk Tumpeng**. Dari pernikahan Syekh Basyaniyah lahirlah waliyullah paling termasyhur di Batu Ampar, yakni **Syekh Abu Syamsuddin** yang bergelar **Bujuk Latthong** (hidup pada pertengahan abad ke-18 hingga awal abad ke-19 M).\n\nNama *Batu Ampar* sendiri lahir dari sejarah riyadhah Syekh Abu Syamsuddin yang biasa mendirikan shalat dan menerima tamu di atas hamparan batu datar (*Batu Ampar*) di bawah pohon nangka (*Latthong*). Kemasyhuran kewalian dan kemustajaban doa Syekh Abu Syamsuddin menjangkau seluruh Pulau Madura dan Jawa, bahkan Syaichona Muhammad Kholil Bangkalan maupun para ulama Tapal Kuda sangat memuliakan maqam Bujuk Latthong. Silsilah kewalian Batu Ampar kemudian dilanjutkan oleh keturunan beliau yang juga dimakamkan di kompleks ini: **Syekh Husain**, **Syekh Muhammad Romli**, dan **Syekh Damanhuri** (wafat pertengahan abad ke-20 M).',
    karomah: [
      'Dalam tradisi lisan masyarakat Madura (*Babad Pamekasan* dan manaqib *Bujuk Batu Ampar*), karomah **Syekh Abu Syamsuddin (Bujuk Latthong)** dikenal sangat agung: dikisahkan ketika ada rombongan tamu yang hendak menguji kewalian beliau dengan berpura-pura membawa keranda jenazah orang hidup dan meminta dishalatkan, Syekh Abu Syamsuddin menunaikan shalat jenazah dan seketika itu juga orang yang berpura-pura mati di dalam keranda benar-benar wafat, hingga rekan-rekannya menangis memohon ampun dan atas doa Syekh Abu Syamsuddin orang tersebut hidup kembali lalu bertobat menjadi murid setianya.<!--more-->\n\nKaromah generasi penerus beliau, **Syekh Damanhuri Batu Ampar**, juga disaksikan langsung oleh masyarakat Pamekasan pada abad ke-20 melalui ketajaman mata batin (*kasyaf*) dan keberkahan air doa beliau yang menyembuhkan berbagai penyakit atas izin Allah SWT.',
    ],
    untoldStory:
      'Tata letak ziarah di Kompleks Bujuk Batu Ampar memiliki urutan adab khas tradisi pesantren Madura: peziarah biasanya memulai tawassul dari cungkup bawah tempat pusara **Syekh Damanhuri**, **Syekh Muhammad Romli**, dan **Syekh Husain**, kemudian mendaki ke cungkup **Syekh Abu Syamsuddin (Bujuk Latthong)** dan **Syekh Basyaniyah (Bujuk Tumpeng)**, hingga ke puncak bukit tempat pusara leluhur utama **Syekh Abdul Mannan (Bujuk Kosambi)**.<!--more-->\n\nKawasan Bujuk Batu Ampar di Kecamatan Proppo Pamekasan juga berjarak tidak jauh dari salah satu pesantren terbesar di Indonesia, yakni **Pondok Pesantren Annuqayah** di Guluk-Guluk, Sumenep (didirikan tahun 1887 M oleh KH. Muhammad Syarqawi Al-Kudusi).',
    barokahHajat:
      'Peziarah yang berziarah ke Kompleks Bujuk Batu Ampar (Syekh Abdul Mannan dan Syekh Abu Syamsuddin) di Pamekasan umumnya bertawassul memohon kepada Allah SWT kesinambungan kesalehan keturunan hingga anak-cucu, kejujuran hati dan penjagaan adab terhadap ulama, serta kelancaran rezeki perniagaan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Auliya Bujuk Batu Ampar (Syekh Abdul Mannan & Syekh Abu Syamsuddin Pamekasan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ أَوْلِيَاءِ بَاتُو أَمْفَارْ الشَّيْخِ عَبْدِ الْمَنَّانِ (بُوجُوكْ كُوسَامْبِي) وَالشَّيْخِ بَاشَانِيَّةَ وَالْوَلِيِّ الْقُطْبِ الشَّيْخِ أَبِي شَمْسِ الدِّينِ (بُوجُوكْ لَاطُونْغ) وَالشَّيْخِ حُسَيْنٍ وَالشَّيْخِ مُحَمَّدْ رَمْلِي وَالشَّيْخِ دَمَنْهُورِي فَامِيكَاسَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَاتِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى أَرْوَاحِ أَوْلِيَاءِ بَاتُو أَمْفَارْ الشَّيْخِ عَبْدِ الْمَنَّانِ (بُوجُوكْ كُوسَامْبِي) وَالشَّيْخِ بَاشَانِيَّةَ وَالْوَلِيِّ الْقُطْبِ الشَّيْخِ أَبِي شَمْسِ الدِّينِ (بُوجُوكْ لَاطُونْغ) وَالشَّيْخِ حُسَيْنٍ وَالشَّيْخِ مُحَمَّدْ رَمْلِي وَالشَّيْخِ دَمَنْهُورِي فَامِيكَاسَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَاتِهِمْ وَبَرَكَاتِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa arwaahi Auliyaa-i Batu Ampar asy-Syaikh 'Abdil-Mannaan (Bujuk Kosambi) wasy-Syaikh Baasyaaniyyah wal-Waliyyil-Quthb asy-Syaikh Abii Syamsiddiin (Bujuk Latthong) wasy-Syaikh Husain wasy-Syaikh Muhammad Ramlii wasy-Syaikh Damanhuurii Pamekasan syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi karaamaatihim wa barakaatihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para waliyullah Batu Ampar: Syekh Abdul Mannan (Bujuk Kosambi), Syekh Basyaniyah, Wali Quthub Syekh Abu Syamsuddin (Bujuk Latthong), Syekh Husain, Syekh Muhammad Romli, dan Syekh Damanhuri Pamekasan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui karomah dan keberkahan mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh para waliyullah Batu Ampar: Syekh Abdul Mannan (Bujuk Kosambi), Syekh Basyaniyah, Wali Quthub Syekh Abu Syamsuddin (Bujuk Latthong), Syekh Husain, Syekh Muhammad Romli, dan Syekh Damanhuri Pamekasan, Al-Fatihah. Ya Allah, limpahkanlah kemanfaatan kepada kami melalui karomah dan keberkahan mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban & Dzulqa’dah (Puncak Haul Akbar Masyayikh & Auliya Bujuk Batu Ampar di Desa Pangbatok, Kecamatan Proppo, Kabupaten Pamekasan, Pulau Madura).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti ketertiban jalur pendakian antar-cungkup dari Bujuk Damanhuri hingga Bujuk Kosambi, serta menjaga ketulusan niat dan kesopanan lisan di tanah para wali.',
    facilities: ['Enam Cungkup Maqbarah Auliya Bujuk Batu Ampar', 'Masjid Jami’ Batu Ampar', 'Sentra Pasar Wisata Religi & Oleh-Oleh Khas Madura', 'Terminal Parkir Bus Wisata Religi Batu Ampar Proppo Pamekasan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Zainalfattah (1951). Sedjarah Tjaranja Pemerintahan di Daerah-Daerah di Kepulauan Madura dengan Hubungannja. Pamekasan: Paragon.',
      'Rozaki, Abdur (2004). Menabur Kharisma Menuai Kuasa: Kiprah Kiai dan Blater sebagai Rezim Kembar di Madura. Yogyakarta: Pustaka Marwa.',
      'Pemerintah Kabupaten Pamekasan — Profil Kawasan Wisata Religi Pasarean Batu Ampar Proppo.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sayyid-yusuf-talango',
    legacyId: 'auliya-12',
    name: 'Makam Sayyid Yusuf bin Ali Al-Anggawi (Pulau Poteran, Talango) & Kompleks Asta Tinggi (Sumenep)',
    title: 'Ulama Hadramaut Penunjuk Isyarat Rihlah dari Kubah Masjid Agung Sumenep & Maqbarah Sultan Abdurrahman Pakunataningrat',
    description:
      'Kompleks Masjid Jami’ dan Maqbarah Sayyid Yusuf bin Ali bin Abdullah Al-Hasani Al-Anggawi (wafat 1791 M / 1205 H) di Pulau Poteran, Kecamatan Talango, serta Kompleks Makam Raja-Raja Asta Tinggi di Kota Sumenep, ujung timur Pulau Madura.',
    category: 'Auliya Nusantara',
    era: 'Abad ke-18 – Abad ke-19 M (Wafat 1791 M / 1205 H)',
    province: 'Jawa Timur',
    city: 'Sumenep',
    district: 'Kec. Talango',
    address: 'Desa Talango, Pulau Poteran, Kec. Talango (Seberang Pelabuhan Kalianget) & Bukit Kebon Agung (Asta Tinggi), Kabupaten Sumenep, Madura',
    location: {
      lat: -7.0539,
      lng: 113.9492,
      address: 'Desa Talango, Pulau Poteran, Kec. Talango (Seberang Pelabuhan Kalianget), Kabupaten Sumenep, Madura',
      district: 'Kec. Talango',
      city: 'Sumenep',
      province: 'Jawa Timur',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Masjid_Ampel_Surabaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Ujung Timur Madura (Kompleks Makam Sayyid Yusuf Talango & Asta Tinggi Sumenep)',
    sanad:
      'Sayyid Yusuf bin Ali bin Abdullah Al-Hasani Al-Anggawi (ulama dan sufi asal Hadramaut/Makkah keturunan Sayyidina Hasan bin Ali RA); sezaman dan dihormati oleh penguasa Kesultanan Sumenep Kanjeng Tumenggung Aria Tirtonagoro (Bindara Saod, 1750–1762 M), Panembahan Somala Asiruddin (pembangun Masjid Jami’ Sumenep 1787 M), dan Sultan Abdurrahman Pakunataningrat I.',
    karya: [
      'Penyebaran dakwah Islam di Pulau Poteran (Talango) dan kepulauan ujung timur Madura (Kangean, Sapudi, Raas)',
      'Situs Cagar Budaya Kompleks Asta Tinggi Sumenep (maqbarah Bindara Saod, Panembahan Somala, dan ulama-raja Sultan Abdurrahman Pakunataningrat)',
    ],
    history:
      'Di ujung paling timur Pulau Madura, tepatnya di **Desa Talango, Pulau Poteran, Kecamatan Talango, Kabupaten Sumenep** (yang dipisahkan oleh selat sempit sekitar 10 menit penyeberangan perahu/kapal tongkang dari Pelabuhan Kalianget), bersemayam seorang waliyullah dan ulama sufi keturunan Rasulullah SAW yang sangat dimuliakan oleh masyarakat Madura dan para pelaut Nusantara, yakni **Al-’Arif Billah Sayyid Yusuf bin Ali bin Abdullah Al-Hasani Al-Anggawi** (wafat pada hari Senin, 29 Dzulqa’dah 1205 H / Juli 1791 M).\n\nPenemuan makam Sayyid Yusuf di Pulau Poteran berkaitan erat dengan sejarah Kesultanan Sumenep di bawah pemerintahan **Sri Paduka Panembahan Somala Asiruddin Pakunataningrat** (memerintah 1762–1811 M, putra dari ulama-penguasa Sumenep Kiai Bindara Saod / Tumenggung Tirtonagoro). Dalam naskah *Babad Songennep* karya Werdisastra, dikisahkan bahwa pada tahun **1791 M (1205 H)**, ketika Panembahan Somala sedang beriktikaf di Masjid Jami’ Sumenep (masjid agung berarsitektur akulturasi Jawa-Tionghoa-Eropa karya arsitek Lauw Piango yang selesai dibangun tahun 1787 M), beliau melihat seberkas cahaya ganjil (*nur*) yang memancar tegak lurus dari arah hutan Pulau Poteran di sebelah tenggara Kalianget.\n\nKeesokan harinya, Panembahan Somala bersama pengawalnya menyeberangi Selat Kalianget menuju Pulau Poteran untuk menelusuri sumber cahaya tersebut. Di tengah hutan Talango, beliau menemukan gundukan makam baru yang berbau harum semerbak lengkap dengan secarik catatan/pertanda bahwa yang baru saja wafat dalam riyadhah di tempat itu adalah ulama sufi pengembara asal Anggawi (Hijaz/Hadramaut), **Sayyid Yusuf bin Ali bin Abdullah Al-Hasani**. Panembahan Somala segera membangun cungkup maqbarah dan masjid di lokasi tersebut (1791 M), yang kelak dipugar kembali oleh putranya, raja-ulama yang fasih berbagai bahasa asing, **Sultan Abdurrahman Pakunataningrat I** (memerintah 1811–1854 M). Di daratan utama Kota Sumenep (Kecamatan Kota Sumenep), peziarah juga menziarahi **Kompleks Makam Asta Tinggi** di Bukit Kebon Agung—tempat peristirahatan Kiai Bindara Saod, Panembahan Somala, dan Sultan Abdurrahman.',
    karomah: [
      'Dalam kitab *Babad Songennep* dan tradisi lisan masyarakat Sumenep-Talango, karomah utama Sayyid Yusuf bin Ali Al-Anggawi adalah tersembunyinya kewalian beliau semasa hidup (*khumul*) hingga baru disingkapkan oleh Allah SWT pada malam wafatnya melalui pancaran cahaya dari Pulau Poteran yang terlihat jelas oleh Panembahan Somala dari menara Masjid Jami’ Sumenep.<!--more-->\n\nDi Kompleks Asta Tinggi Sumenep, tokoh **Kiai Bindara Saod** (santri asal Lenteng yang menjadi Adipati Sumenep) dan cucunya **Sultan Abdurrahman Pakunataningrat** dikenal sebagai *Ulama-Umara* yang menguasai ilmu tafsir, hadis, serta bahasa Arab, Belanda, Inggris, dan Sanskerta hingga dianugerahi gelar Doktor Honoris Causa oleh pemerintah Hindia Belanda/Inggris pada abad ke-19.',
    ],
    untoldStory:
      'Perjalanan ziarah ke Makam Sayyid Yusuf di Pulau Poteran memberikan pengalaman maritim yang sangat berkesan bagi para peziarah: dari dermaga Pelabuhan Kalianget Sumenep, ribuan peziarah menyeberangi selat biru menggunakan kapal feri penyeberangan singkat atau perahu kayu tradisional warga lokal menuju dermaga Talango yang langsung terhubung dengan gerbang Masjid Sayyid Yusuf.<!--more-->\n\nDi Kompleks Asta Tinggi (Desa Kebonagung, Kota Sumenep) maupun di dekat Masjid Jami’ Sumenep (Makam Asta Gumuk / Pangeran Katandur yang memperkenalkan pertanian bajak sapi di Madura), pengunjung dapat menyaksikan perpaduan arsitektur batu kapur Madura, keramik Dinasti Qing Tiongkok, dan kubah gaya Mughal-Eropa dari abad ke-18 M.',
    barokahHajat:
      'Peziarah dan masyarakat pelaut yang berziarah ke maqbarah Sayyid Yusuf bin Ali Al-Anggawi di Talango (serta Asta Tinggi Sumenep) umumnya bertawassul memohon kepada Allah SWT keikhlasan beramal tanpa mengharap pujian manusia (*khumul*), keselamatan pelayaran dan perjalanan jauh, serta kemuliaan ilmu dan kepemimpinan.',
    doaKhusus: [
      {
        title: 'Hadoroh & Tawassul Khusus Sayyid Yusuf bin Ali Al-Anggawi (Talango) & Auliya Asta Tinggi (Sumenep)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ السَّيِّدِ يُوسُفَ بْنِ عَلِيٍّ بْنِ عَبْدِ اللهِ الْحَسَنِيِّ الْأَنْغَاوِيِّ (تَالَانْغُو) وَالشَّيْخِ بِنْدَارَا سَعُودْ وَالسُّلْطَانِ عَبْدِ الرَّحْمَنِ فَاكُونَاتَانِينْغَرَاتْ سُومِينِيفْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الْعَارِفِ بِاللهِ السَّيِّدِ يُوسُفَ بْنِ عَلِيٍّ بْنِ عَبْدِ اللهِ الْحَسَنِيِّ الْأَنْغَاوِيِّ (تَالَانْغُو) وَالشَّيْخِ بِنْدَارَا سَعُودْ وَالسُّلْطَانِ عَبْدِ الرَّحْمَنِ فَاكُونَاتَانِينْغَرَاتْ سُومِينِيفْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَانْفَعْنَا بِبَرَكَاتِهِمْ وَأَسْرَارِهِمْ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyil-'Aarifi billaah as-Sayyid Yuusuf bin 'Alii bin 'Abdillaah al-Hasanii al-Anggaawii (Talango) wasy-Syaikh Bindara Sa'uud was-Sulthaan 'Abdir-Rahmaan Pakunataningrat Sumenep syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahum warhamhum wanfa'naa bi barakaatihim wa asraarihim fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Sayyid Yusuf bin Ali bin Abdullah Al-Hasani Al-Anggawi (Talango) beserta Kiai Bindara Saod dan Sultan Abdurrahman Pakunataningrat Sumenep, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah mereka di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali arif billah Sayyid Yusuf bin Ali bin Abdullah Al-Hasani Al-Anggawi (Talango) beserta Kiai Bindara Saod dan Sultan Abdurrahman Pakunataningrat Sumenep, Al-Fatihah. Ya Allah, ampunilah dan rahmatilah mereka, serta limpahkanlah kemanfaatan melalui keberkahan dan rahasia hikmah mereka di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '28–29 Dzulqa’dah / Malam Senin Pertama Bulan Dzulhijjah (Puncak Haul Akbar Tahunan Sayyid Yusuf bin Ali Al-Anggawi di Desa Talango, Pulau Poteran, Kecamatan Talango, Kabupaten Sumenep).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, menjaga keselamatan saat naik-turun perahu penyeberangan Selat Kalianget–Talango, serta melepas alas kaki saat memasuki cungkup kuno Sayyid Yusuf dan Kompleks Asta Tinggi.',
    facilities: ['Cungkup Kuno & Masjid Jami’ Sayyid Yusuf Talango', 'Dermaga Penyeberangan Kalianget–Talango', 'Kompleks Cagar Budaya Asta Tinggi Sumenep', 'Terminal Parkir Bus Wisata Religi Pelabuhan Kalianget Sumenep'],
    openingHours: 'Buka 24 Jam (Penyeberangan perahu Kalianget–Talango beroperasi dari pagi hingga malam hari)',
    references: [
      'Werdisastra (1914). Babad Songennep. Weltevreden: Balai Poestaka.',
      'Wiryoprawiro, Zein M. (1986). Arsitektur Tradisional Madura Sumenep dengan Pendekatan Historis dan Deskriptif. Surabaya: ITS.',
      'De Jonge, Huub (1989). Madura dalam Empat Zaman: Pedagang, Perkembangan Ekonomi, dan Islam. Jakarta: KITLV & Gramedia.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];



