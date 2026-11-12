import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Jawa Barat, Banten & DKI Jakarta (Tahap 2).
 * Seluruh entri dikurasi berdasarkan literatur sejarah (Atlas Wali Songo, Cagar Budaya Kemendikbudristek,
 * Jaringan Ulama Nusantara-Haramain, dan Rabithah Alawiyah) dengan pemisahan tegas historiografi vs manaqib.
 */
export const JAWA_BARAT_BANTEN_DKI_SITES: Site[] = [
  {
    id: 'sunan-gunung-jati',
    legacyId: 'wali-9',
    name: 'Syekh Syarif Hidayatullah (Sunan Gunung Jati)',
    title: 'Sunan Gunung Jati',
    description:
      'Anggota Dewan Wali Songo dan Sultan pertama Kesultanan Cirebon yang memadukan dakwah kultural, diplomasi maritim, dan peletakan fondasi Islam di Tatar Sunda serta Banten.',
    category: 'Walisongo',
    era: 'Era Kesultanan Cirebon & Wali Songo (1448–1568 M)',
    province: 'Jawa Barat',
    city: 'Cirebon',
    district: 'Kec. Gunungjati',
    address: 'Kompleks Astana Gunung Sembung, Desa Astana, Kec. Gunungjati',
    location: {
      lat: -6.6714,
      lng: 108.5398,
      address: 'Kompleks Astana Gunung Sembung, Desa Astana, Kec. Gunungjati',
      district: 'Kec. Gunungjati',
      city: 'Cirebon',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg',
    imageSource: 'Wikimedia Commons — Gerbang Astana Gunung Sembung (Makam Sunan Gunung Jati, Cirebon)',
    sanad:
      'Putra Syarif Abdullah Umdatuddin bin Ali Nurul Alam dan Nyai Rara Santang (Syarifah Mudaim, putri Prabu Siliwangi); murid Syekh Tajuddin Al-Kubri (Mesir), Syekh Athaillah Asy-Syadzili (Makkah), Syekh Datuk Kahfi (Amparan Jati), dan Sunan Ampel (Surabaya).',
    karya: [
      'Pendirian Kesultanan Pakungwati Cirebon (1479 M) dan peletakan dasar Kesultanan Banten bersama putranya, Maulana Hasanuddin',
      'Pembangunan Masjid Agung Sang Cipta Rasa (1489 M) bersama Sunan Kalijaga dan Raden Sepat',
      'Pepatah falsafah sosial: "Ingsun titip tajug lan fakir miskin" (Aku titipkan langgar/masjid dan kaum fakir miskin)',
    ],
    history:
      'Syarif Hidayatullah atau Kanjeng Sunan Gunung Jati lahir sekitar tahun 1448 M dari pernikahan penguasa Mesir Syarif Abdullah Umdatuddin (keturunan Bani Hasyim jalur Sayyid Abdul Malik Azmatkhan) dengan Nyai Rara Santang (Syarifah Mudaim), putri Sri Baduga Maharaja Prabu Siliwangi dari Kerajaan Pajajaran. Sejak remaja beliau menuntut ilmu agama di Makkah, Madinah, Baghdad, dan Mesir sebelum memutuskan kembali ke tanah leluhur ibundanya di Nusantara untuk mengemban amanat dakwah.\n\nSetibanya di pesisir Caruban (Cirebon) sekitar tahun 1470-an, beliau berguru kepada Syekh Datuk Kahfi di Bukit Amparan Jati dan membantu pamannya, Pangeran Cakrabuana (Mbah Kuwu Sangkan), membina masyarakat dukuh Caruban. Pada tahun 1479 M, Pangeran Cakrabuana menyerahkan tampuk kepemimpinan Nagari Caruban kepada Syarif Hidayatullah yang kemudian dinobatkan sebagai Tumenggung Syarif Hidayatullah bin Maulana Sultan Muhammad Syarifuddin dan didukung oleh Dewan Wali Songo.\n\nSebagai satu-satunya anggota Wali Songo yang sekaligus memimpin kesultanan secara langsung, Sunan Gunung Jati membangun jaringan pelabuhan Muara Jati, memperluas dakwah ke pedalaman Pasundan serta pesisir Banten, dan menggalang koalisi bersama Kesultanan Demak untuk membebaskan Sunda Kelapa dari pendudukan Portugis pada tahun 1527 M. Beliau wafat pada tahun 1568 M dalam usia lanjut dan dimakamkan di puncak Bukit Gunung Sembung, Cirebon.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Cirebon serta Babad Tanah Sunda, dikisahkan bahwa ketika Sunan Gunung Jati membangun jaringan pengobatan dan pertanian bagi warga Caruban, banyak penduduk yang sembuh dari wabah penyakit hanya melalui perantara doa dan air wudhu di langgar (tajug) yang beliau dirikan. Kelembutan akhlak beliau membuat para adipati dan resi Pajajaran memeluk Islam tanpa paksaan pedang.<!--more-->\n\nTradisi lisan keraton juga mengisahkan peristiwa musyawarah para wali di Masjid Agung Sang Cipta Rasa, di mana pancaran kewibawaan batin Sunan Gunung Jati membuat para utusan yang semula datang untuk menguji kesaktian beliau justru bersimpuh menyatakan syahadat dan mengabdi sebagai santri penjaga pesisir Cirebon.',
    ],
    untoldStory:
      'Di balik kemegahan arsitektur sembilan pintu bertingkat di Astana Gunung Sembung yang dihiasi porselen Dinasti Ming, tersimpan pesan konstitusional Sunan Gunung Jati yang melampaui zamannya, yakni wasiat singkat namun menggetarkan: "Ingsun titip tajug lan fakir miskin" (Aku titipkan langgar tempat pendidikan ibadah dan kaum fakir miskin).<!--more-->\n\nWasiat ini bukan sekadar nasihat moral, melainkan fondasi kebijakan fiskal Kesultanan Cirebon di mana hasil pajak pelabuhan Muara Jati dan tanah perdikan dialokasikan untuk menghidupi masjid-masjid desa serta menjamin tidak ada warga miskin yang terlantar. Hingga kini, falsafah tersebut menjadi pedoman hidup masyarakat Cirebon dalam memuliakan tamu peziarah dan menyantuni kaum dhuafa di sekitar maqbarah.',
    barokahHajat:
      'Peziarah yang berwasilah di Astana Gunung Sembung lazimnya memohon keberkahan kepemimpinan yang adil, kemakmuran usaha perniagaan, serta keteguhan menjaga amanah keluarga dan kepedulian sosial terhadap sesama sebagaimana wasiat "Ingsun titip tajug lan fakir miskin".',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Sunan Gunung Jati (Syekh Syarif Hidayatullah)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ الشَّرِيفِ هِدَايَةِ اللهِ سُونَانْ غُونُونْج جَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ وَعُلُومِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سُلْطَانِ الْأَوْلِيَاءِ الشَّيْخِ الشَّرِيفِ هِدَايَةِ اللهِ سُونَانْ غُونُونْج جَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ وَعُلُومِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sulthaanil-Auliyaa-i Asy-Syaikh Asy-Syariif Hidaayatullaah Suunaan Gunuung Jaatii syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi karaamatihii wa asraarihii wa 'uluumihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sulthanul Auliya Syekh Syarif Hidayatullah Sunan Gunung Jati, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan, rahasia ketakwaan, dan ilmu beliau di dalam urusan agama, dunia, dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sulthanul Auliya Syekh Syarif Hidayatullah Sunan Gunung Jati, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan, rahasia ketakwaan, dan ilmu beliau di dalam urusan agama, dunia, dan akhirat.',
      },
    ],
    haulSchedule:
      '10 Dzulhijjah (Grebeg Agung Idul Adha) & 12 Rabiul Awal (Tradisi Panjang Jimat Maulid Nabi di Keraton & Astana Gunung Sembung Cirebon).',
    localAdab:
      'Peziarah umum berdoa dengan khusyuk di area Serambi Muka / depan Pintu Pasujudan (tingkat ke-3); area puncak tingkat ke-9 hanya dibuka bagi keluarga keraton dan atas izin khusus juru kunci (bekel/jeneng). Wajib berpakaian sopan menutup aurat dan tidak memberikan uang paksa di luar kotak infaq resmi.',
    facilities: ['Masjid Dog Jumeneng', 'Serambi Pasujudan Astana Gunung Sembung', 'Tempat Wudhu & Toilet', 'Area Parkir Bus Ziarah'],
    openingHours: 'Buka 24 Jam (Area Pintu Pasujudan)',
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo: Buku Pertama yang Mengungkap Wali Songo Sebagai Fakta Sejarah. Pustaka IIMaN.',
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Data Cagar Budaya Kompleks Makam Sunan Gunung Jati Cirebon.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-datuk-kahfi',
    legacyId: 'auliya-19',
    name: 'Syekh Datuk Kahfi (Syekh Idhofi Mahdi)',
    title: 'Syekh Datuk Kahfi (Bukit Amparan Jati Cirebon)',
    description:
      'Ulama pelopor pertama pesantren Bukit Amparan Jati di Cirebon dan mahaguru dari Pangeran Walangsungsang (Cakrabuana) serta Nyai Rara Santang.',
    category: 'Auliya Nusantara',
    era: 'Era Pra-Kesultanan Cirebon (Abad ke-15 M)',
    province: 'Jawa Barat',
    city: 'Cirebon',
    district: 'Kec. Gunungjati',
    address: 'Bukit Amparan Jati, Desa Astana, Kec. Gunungjati',
    location: {
      lat: -6.6701,
      lng: 108.5412,
      address: 'Bukit Amparan Jati, Desa Astana, Kec. Gunungjati',
      district: 'Kec. Gunungjati',
      city: 'Cirebon',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/The_Great_Mosque_of_Cirebon.jpg',
    imageSource: 'Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Sang Cipta Rasa & Poros Dakwah Syekh Datuk Kahfi Cirebon',
    sanad:
      'Putra Syekh Datuk Ahmad dari Semenanjung Malaka/Baghdad; keturunan Syekh Jamaluddin Akbar Al-Husaini; guru utama Pangeran Walangsungsang, Nyai Rara Santang, dan Prabu Kiansantang.',
    karya: [
      'Pendirian Pondok Pesantren Bukit Amparan Jati (sekitar 1420-an M), lembaga pendidikan Islam tertua di Cirebon',
      'Kaderisasi kepemimpinan Islam awal di pesisir Muara Jati sebelum berdirinya Kesultanan Cirebon',
    ],
    history:
      'Syekh Datuk Kahfi yang juga dikenal dalam naskah Cirebon sebagai Syekh Nurjati atau Syekh Idhofi Mahdi merupakan ulama pelopor yang membuka pusat pengajaran Islam pertama di Bukit Amparan Jati, dekat pelabuhan kuno Muara Jati, Cirebon pada paruh pertama abad ke-15 M. Beliau berasal dari jaringan ulama Malaka dan Baghdad yang diutus untuk membina komunitas muslim pedagang serta penduduk lokal di pesisir utara Tatar Sunda.\n\nPeran historis terbesar Syekh Datuk Kahfi tercatat ketika putra-putri Raja Pajajaran Sri Baduga Maharaja Prabu Siliwangi—yakni Pangeran Walangsungsang (Cakrabuana) dan adiknya Nyai Rara Santang—datang ke Bukit Amparan Jati untuk mendalami agama Islam. Syekh Datuk Kahfi membimbing keduanya dalam ilmu tauhid, fikih, dan tasawuf, lalu memberi gelar Somadullah kepada Walangsungsang sebelum memerintahkan keduanya menunaikan ibadah haji ke Makkah.\n\nDari pesantren Amparan Jati yang diasuh Syekh Datuk Kahfi inilah lahir cikal bakal pedukuhan Caruban Larang yang kelak berkembang menjadi Kesultanan Cirebon di bawah kepemimpinan murid sekaligus keponakan rohaninya, Syarif Hidayatullah (Sunan Gunung Jati). Makam beliau terletak di bukit Amparan Jati, bersebelahan dengan kompleks Astana Gunung Sembung.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Cirebon (Babad Cirebon), dikisahkan bahwa ketika Syekh Datuk Kahfi pertama kali mendarat di bukit Amparan Jati yang masih berupa hutan belantara gelap, beliau bermunajat kepada Allah SWT hingga bukit tersebut memancarkan cahaya terang di malam hari yang menuntun para pelaut di Laut Jawa. Oleh sebab itulah masyarakat menjuluki beliau sebagai Syekh Nurjati (Cahaya Sejati).<!--more-->\n\nSelain itu, tradisi lisan pesantren menceritakan ketajaman mata batin (firasat) Syekh Datuk Kahfi ketika menerima kedatangan Nyai Rara Santang di padepokannya; beliau menyampaikan kabar gembira bahwa dari rahim putri Pajajaran tersebut kelak akan lahir seorang raja sekaligus wali besar yang menerangi tanah Jawa Barat.',
    ],
    untoldStory:
      'Banyak peziarah yang datang ke Gunung Jati langsung menuju pintu utama makam Sunan Gunung Jati tanpa menyadari bahwa di bukit sebelah timurnya—yakni Bukit Amparan Jati—bersemayam sang guru perintis yang meletakkan batu pertama peradaban Islam Cirebon setengah abad sebelum berdirinya keraton.<!--more-->\n\nDalam adab ziarah yang diwariskan oleh para sepuh dan kiai pesantren Cirebon (seperti Buntet, Babakan Ciwaringin, dan Kempek), para santri dianjurkan untuk terlebih dahulu menghaturkan salam dan hadiah Al-Fatihah di pusara Syekh Datuk Kahfi sebagai bentuk penghormatan kepada sang mahaguru sebelum berziarah ke muridnya, Kanjeng Sunan Gunung Jati.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Datuk Kahfi umumnya bertawassul memohon dibukakan pintu kefahaman ilmu agama (futuhul ilmi), keberkahan bagi lembaga pendidikan atau pesantren yang sedang dirintis, serta keteguhan iman anak-keturunan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Datuk Kahfi (Syekh Nurjati)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ الشَّيْخِ دَاتُوكْ كَهْفِي (الشَّيْخِ نُورْ جَاتِي) صَاحِبِ أَمْفَارَانْ جَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ افْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ بِبَرَكَةِ عُلُومِهِ وَأَسْرَارِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الرَّبَّانِيِّ الشَّيْخِ دَاتُوكْ كَهْفِي (الشَّيْخِ نُورْ جَاتِي) صَاحِبِ أَمْفَارَانْ جَاتِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ افْتَحْ عَلَيْنَا فُتُوحَ الْعَارِفِينَ بِبَرَكَةِ عُلُومِهِ وَأَسْرَارِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimir-Rabbaanii Asy-Syaikh Daatuuk Kahfii (Asy-Syaikh Nuur Jaatii) shaahibi Amfaaraan Jaatii syai-un lillaahi lahumul-Faatihah. Allaahummaftah 'alainaa futuuhal-'aarifiina bi barakati 'uluumihii wa asraarih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani Syekh Datuk Kahfi (Syekh Nurjati) di Bukit Amparan Jati, Al-Fatihah. Ya Allah, bukakanlah atas kami pintu makrifat para arifin dengan keberkahan ilmu dan rahasia keshalihan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama rabbani Syekh Datuk Kahfi (Syekh Nurjati) di Bukit Amparan Jati, Al-Fatihah. Ya Allah, bukakanlah atas kami pintu makrifat para arifin dengan keberkahan ilmu dan rahasia keshalihan beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh keluarga/pengurus yayasan setempat di Bukit Amparan Jati (disarankan mengonfirmasi ke pengurus makam sebelum keberangkatan).',
    localAdab:
      'Menjaga ketenangan saat menaiki anak tangga Bukit Amparan Jati, berwudhu dan melepas alas kaki di batas pendopo maqbarah, serta mendahulukan adab takzim kepada para sepuh penjaga makam.',
    facilities: ['Pendopo Maqbarah Bukit Amparan Jati', 'Musholla & Tempat Wudhu', 'Jalur Tangga Terhubung ke Astana Gunung Sembung'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Sunyoto, Agus (2016). Atlas Wali Songo. Pustaka IIMaN.',
      'Sulendraningrat, P.S. (1985). Sejarah Cirebon. Balai Pustaka.',
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'pangeran-cakrabuana',
    name: 'Pangeran Cakrabuana (Mbah Kuwu Sangkan / Raden Walangsungsang)',
    title: 'Pangeran Cakrabuana (Mbah Kuwu Cirebon Girang)',
    description:
      'Putra mahkota Kerajaan Pajajaran yang merintis pedukuhan Caruban (Cirebon), membangun Keraton Pakungwati, dan membuka jalan berdirinya Kesultanan Cirebon.',
    category: 'Auliya Nusantara',
    era: 'Era Perintisan Kesultanan Cirebon (Abad ke-15 – Awal Abad ke-16 M)',
    province: 'Jawa Barat',
    city: 'Cirebon',
    district: 'Kec. Talun',
    address: 'Kompleks Keramat Mbah Kuwu Sangkan, Desa Cirebon Girang, Kec. Talun',
    location: {
      lat: -6.7628,
      lng: 108.5325,
      address: 'Kompleks Keramat Mbah Kuwu Sangkan, Desa Cirebon Girang, Kec. Talun',
      district: 'Kec. Talun',
      city: 'Cirebon',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg',
    imageSource: 'Wikimedia Commons — Arsip Sejarah Kesultanan Cirebon & Jejak Pangeran Cakrabuana',
    sanad:
      'Putra sulung Prabu Siliwangi (Sri Baduga Maharaja) dan Nyai Subang Larang (murid Syekh Quro Karawang); murid Syekh Datuk Kahfi Amparan Jati; paman sekaligus mertua Sunan Gunung Jati.',
    karya: [
      'Pembukaan hutan pesisir Tegal Alang-Alang menjadi pedukuhan Caruban (1445 M) dan pembangunan Istana Pakungwati',
      'Pembangunan Tajug Jalagrahan, masjid tertua di Cirebon sebelum Masjid Agung Sang Cipta Rasa',
    ],
    history:
      'Pangeran Cakrabuana yang lahir dengan nama Raden Walangsungsang merupakan putra sulung Raja Pajajaran Sri Baduga Maharaja (Prabu Siliwangi) dari permaisuri muslimah Nyai Subang Larang, seorang santriwati didikan Syekh Quro di Karawang. Setelah ibundanya wafat, Walangsungsang memilih meninggalkan kemewahan istana Pakuan Pajajaran demi mendalami ajaran Islam bersama adiknya, Nyai Rara Santang.\n\nAtas petunjuk gurunya, Syekh Datuk Kahfi di Bukit Amparan Jati, Raden Walangsungsang membuka hutan pesisir Tegal Alang-Alang pada tanggal 1 Muharram 1445 M bersama Ki Danusela (Ki Gedeng Alang-Alang) dan membangun pemukiman nelayan penghasil terasi udang (cai rebon) yang kemudian dikenal sebagai Caruban atau Cirebon. Setelah menunaikan ibadah haji ke Makkah dan memperoleh gelar Haji Abdullah Iman, beliau diangkat sebagai Kuwu Caruban kedua dengan gelar Pangeran Cakrabuana.\n\nKetawadhuan luar biasa Pangeran Cakrabuana terlihat ketika keponakannya, Syarif Hidayatullah (Sunan Gunung Jati), tiba di Cirebon. Meskipun beliau adalah perintis negeri dan paman kandung, Pangeran Cakrabuana dengan ikhlas menyerahkan tahta kepemimpinan Caruban kepada Syarif Hidayatullah pada tahun 1479 M agar dakwah Wali Songo memiliki legitimasi kesultanan yang utuh. Situs petilasan dan keramat beliau di Cirebon Girang, Kecamatan Talun, serta makam beliau di Gunung Sembung menjadi pusat ziarah utama masyarakat Pasundan dan Cirebon.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Cirebon (Babad Tjerbon), dikisahkan bahwa Pangeran Cakrabuana memiliki ketekunan kerja fisik dan riyadhoh yang luar biasa; beliau membuka hutan belantara dan menggali sumur-sumur mata air tawar di pesisir laut yang asin hanya dengan doa dan cangkul sederhananya hingga menjadi sumber penghidupan ribuan warga.<!--more-->\n\nMasyarakat Cirebon mengenal beliau dengan sebutan kehormatan "Mbah Kuwu Sangkan" (Sang Perintis Desa), yang menurut cerita tutur para sepuh senantiasa berkeliling di malam hari secara menyamar untuk mengantarkan bahan pangan ke depan pintu rumah warga miskin tanpa diketahui identitasnya.',
    ],
    untoldStory:
      'Dalam naskah kuno Carita Purwaka Caruban Nagari karya Pangeran Arya Carbon (1720 M), terungkap bahwa modal ekonomi pertama berdirinya Kesultanan Cirebon bukanlah rampasan perang, melainkan usaha pengolahan udang rebon dan garam laut yang dirintis langsung oleh tangan Pangeran Cakrabuana bersama rakyat jelata.<!--more-->\n\nKetika Kerajaan Pajajaran mengutus Tumenggung Jagabaya untuk menagih upeti terasi dan garam ke Caruban, Pangeran Cakrabuana menyambut rombongan prajurit ayahnya dengan jamuan makan dan dialog kekeluargaan yang santun, sehingga Tumenggung Jagabaya beserta pasukannya justru memilih menetap di Cirebon dan memeluk agama Islam.',
    barokahHajat:
      'Peziarah yang berziarah ke situs Mbah Kuwu Sangkan (Pangeran Cakrabuana) lazimnya bertawassul memohon keberkahan dalam merintis usaha dari nol, kelancaran rezeki pertanian dan hasil bumi, serta keikhlasan hati dalam mengabdi kepada masyarakat.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Pangeran Cakrabuana (Mbah Kuwu Sangkan)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الْحَاجِّ عَبْدِ اللهِ إِيمَانْ (فَانْجِيرَانْ شَكْرَابُوَانَا / مْبَاهْ كُووُو سَانْجْكَانْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَرْزَاقِنَا وَأَعْمَالِنَا بِبَرَكَتِهِ وَإِخْلَاصِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الْحَاجِّ عَبْدِ اللهِ إِيمَانْ (فَانْجِيرَانْ شَكْرَابُوَانَا / مْبَاهْ كُووُو سَانْجْكَانْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي أَرْزَاقِنَا وَأَعْمَالِنَا بِبَرَكَتِهِ وَإِخْلَاصِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Al-Haajj 'Abdillaah Iimaan (Paangeeraan Cakrabuaanaa / Mbah Kuwu Sangkan) syai-un lillaahi lahumul-Faatihah. Allaahumma baarik lanaa fii arzaaqinaa wa a'maalinaa bi barakatihii wa ikhlaashih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Haji Abdullah Iman (Pangeran Cakrabuana / Mbah Kuwu Sangkan), Al-Fatihah. Ya Allah, berkahilah rezeki dan amal usaha kami dengan keberkahan serta keikhlasan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Haji Abdullah Iman (Pangeran Cakrabuana / Mbah Kuwu Sangkan), Al-Fatihah. Ya Allah, berkahilah rezeki dan amal usaha kami dengan keberkahan serta keikhlasan beliau.',
      },
    ],
    haulSchedule:
      '1 Muharram (Peringatan Hari Jadi Caruban / Tradisi Syukuran Tahun Baru Hijriah di Kompleks Keramat Mbah Kuwu Sangkan Talun Cirebon).',
    localAdab:
      'Berpakaian sopan dan menutup aurat, berwudhu sebelum memasuki serambi keramat Cirebon Girang, menjaga ketertiban antrean, serta mematuhi arahan kuncen setempat.',
    facilities: ['Pendopo Keramat Mbah Kuwu Sangkan Cirebon Girang', 'Sumur Keramat & Tempat Wudhu', 'Musholla', 'Area Parkir'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
      'Sulendraningrat, P.S. (1985). Sejarah Cirebon. Balai Pustaka.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-magelung-sakti',
    name: 'Syekh Magelung Sakti (Syarif Abdurrahman Al-Baghdadi)',
    title: 'Syekh Magelung Sakti (Karanggetas Cirebon)',
    description:
      'Ulama dan panglima dakwah asal Syam/Baghdad yang menjadi murid setia Sunan Gunung Jati serta pelindung keamanan wilayah Kesultanan Cirebon.',
    category: 'Auliya Nusantara',
    era: 'Era Kesultanan Cirebon (Abad ke-15–16 M)',
    province: 'Jawa Barat',
    city: 'Cirebon',
    district: 'Kec. Kejaksan',
    address: 'Jl. Karanggetas, Kel. Pekalangan, Kec. Kejaksan',
    location: {
      lat: -6.7158,
      lng: 108.5641,
      address: 'Jl. Karanggetas, Kel. Pekalangan, Kec. Kejaksan',
      district: 'Kec. Kejaksan',
      city: 'Cirebon',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/The_Great_Mosque_of_Cirebon.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Kota Pusaka Cirebon & Panglima Dakwah Syekh Magelung Sakti',
    sanad:
      'Ulama perantau asal negeri Syam/Baghdad bernama asli Syarif Abdurrahman; murid ruhani langsung Kanjeng Sunan Gunung Jati (Syarif Hidayatullah) dan Pangeran Cakrabuana.',
    karya: [
      'Pengamanan jalur dakwah dan pelabuhan Kesultanan Cirebon pada masa awal pemerintahan Sunan Gunung Jati',
      'Pembinaan masyarakat muslim di kawasan Karanggetas dan pesisir utara Cirebon',
    ],
    history:
      'Syekh Magelung Sakti yang bernama asli Syarif Abdurrahman adalah seorang ulama sekaligus pendekar tangguh asal Timur Tengah (Syam/Baghdad) yang mengembara ke Nusantara pada abad ke-15 M untuk mencari seorang mursyid sejati. Nama "Magelung" disematkan oleh masyarakat Cirebon karena rambut panjangnya yang selalu digelung rapi di atas kepala.\n\nSetibanya di wilayah Caruban (Cirebon), Syarif Abdurrahman bertemu dengan Pangeran Cakrabuana dan kemudian dihadapkan kepada Kanjeng Sunan Gunung Jati di kawasan Karanggetas. Setelah menyaksikan kedalaman ilmu hakikat dan kemuliaan akhlak Sunan Gunung Jati, Syekh Magelung Sakti berbaiat menjadi murid setia beliau dan mengabdikan seluruh hidupnya untuk menjaga kedaulatan Kesultanan Cirebon.\n\nDalam struktur pemerintahan Kesultanan Pakungwati Cirebon, Syekh Magelung Sakti berperan penting sebagai salah satu senopati dan pembimbing rohani para prajurit kesultanan dalam menghadapi berbagai gangguan keamanan dari kerajaan-kerajaan bawahan yang menentang dakwah Islam. Beliau wafat dan dimakamkan di kawasan Jalan Karanggetas, Kecamatan Kejaksan, Kota Cirebon.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Cirebon (Babad Cirebon), dikisahkan bahwa sejak muda Syekh Magelung Sakti memiliki rambut yang sangat panjang dan tidak mempan dipotong oleh senjata tajam apa pun. Beliau bernazar hanya akan berguru kepada sosok waliyullah yang mampu memotong rambutnya tanpa menggunakan pisau atau pedang.<!--more-->\n\nKetika berjumpa dengan Sunan Gunung Jati di Karanggetas, Kanjeng Sunan hanya mengusapkan jari tangannya sembari membaca basmalah, dan seketika itu pula gelungan rambut Syekh Magelung Sakti terpotong dengan rapi. Peristiwa tersebut membuat Syekh Magelung Sakti tersungkur takzim dan menanggalkan kebanggaan dirinya untuk menempuh jalan tasawuf.',
    ],
    untoldStory:
      'Kawasan Jalan Karanggetas di pusat Kota Cirebon tempat maqbarah Syekh Magelung Sakti berada memiliki sejarah etimologis yang erat dengan peristiwa pertemuan beliau dengan Sunan Gunung Jati. Kata "Karanggetas" berasal dari istilah "Karang sing Getas" (keteguhan batu karang yang akhirnya luluh/patah).<!--more-->\n\nBagi para kiai dan budayawan Cirebon, kisah "luluh-nya" kesaktian Syekh Magelung Sakti di Karanggetas merupakan simbol filosofis bahwa setinggi apa pun kekuatan lahiriah atau ilmu kanuragan seseorang, ia harus tunduk (getas) di hadapan kerendahan hati, adab syariat, dan cahaya makrifat kepada Allah SWT.',
    barokahHajat:
      'Peziarah yang berziarah ke makam Syekh Magelung Sakti umumnya bertawassul memohon keteguhan mental dalam menghadapi ujian berat, perlindungan keselamatan dari kezaliman, serta dilembutkan hati dari sifat sombong dalam menuntut ilmu.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Magelung Sakti (Syarif Abdurrahman)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ الشَّرِيفِ عَبْدِ الرَّحْمٰنِ (الشَّيْخِ مَاغَلُونْج سَكْتِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنْ كُلِّ سُوءٍ وَثَبِّتْ قُلُوبَنَا عَلَى طَاعَتِكَ بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ الشَّرِيفِ عَبْدِ الرَّحْمٰنِ (الشَّيْخِ مَاغَلُونْج سَكْتِي) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْنَا مِنْ كُلِّ سُوءٍ وَثَبِّتْ قُلُوبَنَا عَلَى طَاعَتِكَ بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Asy-Syaikh Asy-Syariif 'Abdirrahmaan (Asy-Syaikh Maagaluung Saktii) syai-un lillaahi lahumul-Faatihah. Allaahummahfazhnaa min kulli suu-in wa tsabbit quluubanaa 'alaa thaa'atika bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Syarif Abdurrahman (Syekh Magelung Sakti), Al-Fatihah. Ya Allah, lindungilah kami dari segala keburukan dan teguhkanlah hati kami di atas ketaatan kepada-Mu dengan keberkahan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Syarif Abdurrahman (Syekh Magelung Sakti), Al-Fatihah. Ya Allah, lindungilah kami dari segala keburukan dan teguhkanlah hati kami di atas ketaatan kepada-Mu dengan keberkahan beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh keluarga/pengurus yayasan setempat di Karanggetas Cirebon (disarankan mengonfirmasi ke pengurus makam sebelum keberangkatan).',
    localAdab:
      'Melepas alas kaki saat memasuki ruang maqbarah di tepi Jl. Karanggetas, menjaga ketenangan karena lokasi berada di kawasan padat Kota Cirebon, dan mendoakan ahli kubur sesuai tuntunan sunnah.',
    facilities: ['Cungkup Makam Syekh Magelung Sakti', 'Musholla Kecil & Tempat Wudhu', 'Area Parkir Tepi Jalan Karanggetas'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Sulendraningrat, P.S. (1985). Sejarah Cirebon. Balai Pustaka.',
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
      'Dinas Kebudayaan dan Pariwisata Kota Cirebon — Inventaris Situs Cagar Budaya Keramat Karanggetas.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-quro-karawang',
    legacyId: 'ulama-10',
    name: 'Syekh Qurotul Ain (Syekh Hasanuddin bin Yusuf Sidik)',
    title: 'Syekh Qurotul Ain (Syekh Quro Karawang)',
    description:
      'Ulama besar asal Campa pendiri pesantren pertama di Tanah Sunda (1418 M) dan mahaguru dari Nyai Subang Larang (ibunda Pangeran Cakrabuana & Rara Santang).',
    category: 'Ulama Nusantara',
    era: 'Era Awal Islamisasi Tatar Sunda (Abad ke-15 M, Tiba di Karawang 1418 M)',
    province: 'Jawa Barat',
    city: 'Karawang',
    district: 'Kec. Lemahabang',
    address: 'Desa Pulokalapa (Pulobata), Kec. Lemahabang',
    location: {
      lat: -6.2564,
      lng: 107.4418,
      address: 'Desa Pulokalapa (Pulobata), Kec. Lemahabang',
      district: 'Kec. Lemahabang',
      city: 'Karawang',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg',
    imageSource: 'Wikipedia Bahasa Indonesia / Wikimedia Commons — Cagar Budaya Kabupaten Karawang (Wilayah Dakwah Syekh Quro)',
    sanad:
      'Putra Syekh Yusuf Sidik dari Negeri Campa; bersanad keilmuan Al-Qur’an dan Qira’at Sab’ah; guru utama Nyai Subang Larang, Syekh Abdul Rahman, dan Syekh Maulana Madzkur.',
    karya: [
      'Pendirian Pondok Pesantren Quro di Pura Dalem Karawang (1418 M / 1340 Saka) — pesantren Al-Qur’an tertua di Jawa Barat',
      'Penyebaran pengajaran tajwid dan tilawah Al-Qur’an di pesisir utara Tatar Sunda jauh sebelum berdirinya Kesultanan Cirebon',
    ],
    history:
      'Syekh Hasanuddin bin Yusuf Sidik, yang lebih masyhur dengan gelar Syekh Qurotul Ain atau Syekh Quro, adalah ulama besar asal Negeri Campa yang berlabuh di Pelabuhan Pura Dalem, Karawang pada tahun 1418 M (1340 Saka) bersama armada pelayaran Laksamana Cheng Ho. Gelar "Syekh Quro" disematkan kepada beliau karena kemerduan suaranya dalam melantunkan ayat-ayat suci Al-Qur’an dan keahliannya yang mendalam dalam ilmu Qira’at.\n\nDi Karawang, Syekh Quro mendirikan musholla dan pesantren pengajaran Al-Qur’an yang menarik perhatian penduduk lokal hingga kalangan bangsawan Kerajaan Sunda Pajajaran. Salah satu santriwati terbaik beliau adalah Nyai Subang Larang, putri Ki Gedeng Tapa (Syahbandar Muara Jati). Nyai Subang Larang kemudian dipersunting oleh Prabu Siliwangi (Sri Baduga Maharaja), dan dari pernikahan inilah lahir tiga tokoh kunci Islamisasi Jawa Barat: Pangeran Walangsungsang (Cakrabuana), Nyai Rara Santang (ibunda Sunan Gunung Jati), dan Raja Sengara (Prabu Kiansantang).\n\nDengan demikian, secara genealogis dan intelektual, Syekh Quro Karawang adalah peletak fondasi pertama yang menyambungkan darah bangsawan Pajajaran dengan garis keturunan Wali Songo di Cirebon dan Banten. Di masa tuanya, beliau berpindah ke wilayah Pulobata (kini Desa Pulokalapa, Kecamatan Lemahabang, Karawang) hingga wafat dan dimakamkan di sana.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Karawang (Naskah Purwaka Caruban Nagari), dikisahkan bahwa ketika Prabu Anggalarang mengutus pasukan untuk menutup pesantren Syekh Quro karena khawatir pengaruhnya meluas, lantunan bacaan Al-Qur’an Syekh Quro yang menggema dari dalam langgar membuat hati para prajurit bergetar hebat hingga mereka mengurungkan niat dan justru duduk menyimak pengajian beliau.<!--more-->\n\nSelain itu, tradisi lisan warga Lemahabang menuturkan keberadaan sumur tua di area maqbarah Pulobata yang digali pada masa riyadhoh Syekh Quro bersama para santrinya; mata air tersebut tidak pernah kering meskipun kemarau panjang melanda hamparan sawah pantura Karawang.',
    ],
    untoldStory:
      'Selama berabad-abad, lokasi makam Syekh Quro di tengah pematang sawah Dusun Pulobata, Desa Pulokalapa, dijaga secara turun-temurun dengan penuh kerahasiaan oleh para kuncen agar tidak dirusak pada masa gejolak kolonial, sebelum akhirnya diteliti kembali dan dipugar pada pertengahan abad ke-19 atas prakarsa Raden Aria Suriawinata (Dalem Shalawat, Bupati Karawang).<!--more-->\n\nFakta sejarah menunjukkan bahwa hubungan harmonis antara Syekh Quro dengan Syekh Bentong (ulama keturunan Tionghoa muslim dari armada Cheng Ho) di Karawang adalah bukti nyata bahwa sejak tahun 1418 M, Islam di Jawa Barat tumbuh melalui perjumpaan kosmopolitan yang damai, terbuka, dan menjunjung tinggi ilmu Al-Qur’an.',
    barokahHajat:
      'Peziarah yang datang ke maqbarah Syekh Quro Karawang lazimnya bertawassul memohon kepada Allah SWT agar putra-putrinya dikaruniai kecintaan menghafal dan membaca Al-Qur’an dengan fasih, dimudahkan dalam menuntut ilmu pesantren, serta dianugerahi keturunan yang shalih dan shalihah.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Qurotul Ain (Syekh Hasanuddin Karawang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ الْقُرَّاءِ الشَّيْخِ حَسَنِ الدِّينِ بْنِ يُوسُفَ صِدِّيقْ (الشَّيْخِ قُرَّةِ الْعَيْنِ كَرَاوَانْج) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا وَذُرِّيَّاتِنَا بِنُورِ الْقُرْآنِ الْعَظِيمِ بِبَرَكَةِ عُلُومِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ الْقُرَّاءِ الشَّيْخِ حَسَنِ الدِّينِ بْنِ يُوسُفَ صِدِّيقْ (الشَّيْخِ قُرَّةِ الْعَيْنِ كَرَاوَانْج) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ نَوِّرْ قُلُوبَنَا وَذُرِّيَّاتِنَا بِنُورِ الْقُرْآنِ الْعَظِيمِ بِبَرَكَةِ عُلُومِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Syaikhil-Qurraa-i Asy-Syaikh Hasaniddiin bin Yuusuf Shiddiiq (Asy-Syaikh Qurratil-'Ain Karawang) syai-un lillaahi lahumul-Faatihah. Allaahumma nawwir quluubanaa wa dzurriyyaatinaa bi nuuril-Qur'aanil-'Azhiimi bi barakati 'uluumih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh mahaguru ahli Al-Qur’an Syekh Hasanuddin bin Yusuf Sidik (Syekh Qurotul Ain Karawang), Al-Fatihah. Ya Allah, terangilah hati kami dan anak-keturunan kami dengan cahaya Al-Qur’an yang agung berkat kemuliaan ilmu beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh mahaguru ahli Al-Qur’an Syekh Hasanuddin bin Yusuf Sidik (Syekh Qurotul Ain Karawang), Al-Fatihah. Ya Allah, terangilah hati kami dan anak-keturunan kami dengan cahaya Al-Qur’an yang agung berkat kemuliaan ilmu beliau.',
      },
    ],
    haulSchedule:
      'Setiap malam Sabtu (Tradisi Pengajian Rutin Mingguan Malam Sabtu di Masjid Agung & Maqbarah Pulobata) serta Haul Tahunan yang ditetapkan pengurus makam.',
    localAdab:
      'Memasuki kompleks maqbarah Pulobata dengan busana muslim yang sopan, menjaga wudhu, mengutamakan bacaan ayat suci Al-Qur’an di dekat cungkup, dan mematuhi tata tertib pengurus DKM Makam Syekh Quro.',
    facilities: ['Masjid Jami’ Syekh Quro Pulobata', 'Aula Pendopo Peziarah', 'Sumur Tua & Tempat Wudhu', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Pustaka IIMaN.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-bentong-karawang',
    name: 'Syekh Bentong (Tan Go Wat / Syekh Darugem)',
    title: 'Syekh Bentong (Lemahabang Karawang)',
    description:
      'Ulama besar keturunan Tionghoa muslim pengiring armada Cheng Ho, sahabat seperjuangan Syekh Quro Karawang, dan kakek dari Raden Patah (Sultan Demak).',
    category: 'Auliya Nusantara',
    era: 'Era Awal Islamisasi Pesisir Utara Jawa (Abad ke-15 M)',
    province: 'Jawa Barat',
    city: 'Karawang',
    district: 'Kec. Lemahabang',
    address: 'Kompleks Makam Pulobata, Desa Pulokalapa, Kec. Lemahabang',
    location: {
      lat: -6.2569,
      lng: 107.4422,
      address: 'Kompleks Makam Pulobata, Desa Pulokalapa, Kec. Lemahabang',
      district: 'Kec. Lemahabang',
      city: 'Karawang',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Sejarah Kabupaten Karawang (Jejak Dakwah Syekh Bentong & Syekh Quro)',
    sanad:
      'Ulama dan saudagar muslim Tionghoa bernama asli Tan Go Wat (bergelar Kyai Bah Tong / Syekh Bentong / Syekh Darugem); murid dan sahabat seperjuangan Syekh Qurotul Ain Karawang; ayahanda dari Siu Ban Ci (ibunda Raden Patah Demak).',
    karya: [
      'Pendampingan pendirian Pesantren Quro Karawang (1418 M) dan pengembangan tata niaga pertanian pesisir Karawang',
      'Penyambung jaringan komunitas muslim Tionghoa-Nusantara dari Karawang, Cirebon, hingga Gresik dan Majapahit',
    ],
    history:
      'Syekh Bentong, yang tercatat dalam kronik sejarah sebagai Tan Go Wat atau Kyai Bah Tong (dan dikenal pula oleh masyarakat lokal sebagai Syekh Darugem), adalah seorang ulama sekaligus saudagar muslim keturunan Tionghoa yang turut berlayar bersama ekspedisi muhibah Laksamana Cheng Ho ke Nusantara pada awal abad ke-15 M. Beliau mendarat di Pelabuhan Pura Dalem, Karawang pada tahun 1418 M bersama Syekh Hasanuddin (Syekh Quro).\n\nSebagai sahabat setia sekaligus murid utama Syekh Quro, Syekh Bentong berperan besar dalam menopang kebutuhan logistik, pertanian, dan pembangunan Pesantren Quro di Karawang. Dalam catatan Purwaka Caruban Nagari dan historiografi Wali Songo, putri Syekh Bentong yang bernama Siu Ban Ci (Putri Cina) kelak menikah dengan Raja Majapahit Prabu Brawijaya V (Kertabhumi) dan melahirkan Jin Bun atau Raden Patah, pendiri Kesultanan Demak Bintoro.\n\nKesetiaan Syekh Bentong kepada gurunya, Syekh Quro, berlangsung hingga akhir hayat. Ketika Syekh Quro membuka pedukuhan dakwah di Pulobata (Lemahabang, Karawang), Syekh Bentong turut mendampingi beliau membina masyarakat setempat hingga wafat dan dimakamkan di kompleks maqbarah yang sama dengan sang mahaguru.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Karawang, dikisahkan bahwa Syekh Bentong dikenal sebagai sosok waliyullah yang sangat dermawan dan menguasai ilmu pengobatan tradisional serta tata kelola air pertanian. Setiap kali masyarakat sekitar mengalami gagal panen, beliau mengajarkan cara mengolah tanah sambil melantunkan dzikir hingga sawah-sawah di Karawang kembali subur.<!--more-->\n\nTradisi lisan warga Lemahabang juga menceritakan bagaimana persaudaraan ruhani antara Syekh Quro (asal Campa) dan Syekh Bentong (asal Tionghoa) dengan masyarakat Sunda di Pulobata menjadi teladan ukhuwah Islamiyah yang melampaui sekat-sekat suku bangsa.',
    ],
    untoldStory:
      'Peran historis Syekh Bentong (Tan Go Wat) sering kali luput dari buku pelajaran sejarah populer, padahal tanpa keberadaan beliau di Karawang dan Gresik, mata rantai silsilah Kesultanan Islam pertama di tanah Jawa—yakni Kesultanan Demak—tidak akan pernah tertulis secara utuh.<!--more-->\n\nKeberadaan makam Syekh Bentong yang berdampingan erat dengan makam Syekh Quro di Desa Pulokalapa, Karawang menjadi monumen sejarah hidup tentang betapa besarnya kontribusi ulama muslim Tionghoa dalam menyemai benih Islam yang damai di pesisir utara Pulau Jawa pada abad ke-15.',
    barokahHajat:
      'Peziarah yang berziarah ke pusara Syekh Bentong Karawang umumnya bertawassul memohon keberkahan perniagaan yang jujur, kesuburan usaha pertanian, serta dianugerahi sahabat dan mitra usaha yang amanah dalam kebaikan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Bentong (Syekh Darugem Karawang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بِينْتُونْج (الشَّيْخِ دَارُوغِيمْ) صَاحِبِ كَرَاوَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي تِجَارَتِنَا وَآلِفْ بَيْنَ قُلُوبِنَا فِي طَاعَتِكَ بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ بِينْتُونْج (الشَّيْخِ دَارُوغِيمْ) صَاحِبِ كَرَاوَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي تِجَارَتِنَا وَآلِفْ بَيْنَ قُلُوبِنَا فِي طَاعَتِكَ بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Asy-Syaikh Bintuung (Asy-Syaikh Daaruugem) shaahibi Karawang syai-un lillaahi lahumul-Faatihah. Allaahumma baarik lanaa fii tijaaratinaa wa aalif baina quluubinaa fii thaa'atika bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Bentong (Syekh Darugem) di Karawang, Al-Fatihah. Ya Allah, berkahilah perniagaan kami dan satukanlah hati kami dalam ketaatan kepada-Mu dengan keberkahan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Bentong (Syekh Darugem) di Karawang, Al-Fatihah. Ya Allah, berkahilah perniagaan kami dan satukanlah hati kami dalam ketaatan kepada-Mu dengan keberkahan beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh keluarga/pengurus yayasan setempat bersamaan dengan rangkaian haul kompleks Makam Pulobata Karawang.',
    localAdab:
      'Berziarah dengan tertib mengikuti alur maqbarah Pulobata, menjaga kesopanan pakaian, dan menghormati ketenangan jamaah yang sedang melantunkan tilawah Al-Qur’an.',
    facilities: ['Kompleks Maqbarah Pulobata', 'Masjid Jami’ & Serambi Dzikir', 'Tempat Wudhu & Toilet', 'Area Parkir'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
      'Sunyoto, Agus (2016). Atlas Wali Songo. Pustaka IIMaN.',
      'Qurtuby, Sumanto Al (2003). Arus Cina-Islam-Jawa: Bongkar Sejarah atas Peranan Tionghoa dalam Penyebaran Agama Islam di Nusantara Abad XV & XVI. Inspeal Ahimsakarya Press.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-abdul-muhyi-pamijahan',
    legacyId: 'ulama-8',
    name: 'Syekh Haji Abdul Muhyi Pamijahan',
    title: 'Syekh Abdul Muhyi Pamijahan (Tasikmalaya)',
    description:
      'Waliyullah dan mursyid besar Tarekat Syattariyah di Priangan Timur, murid langsung Syekh Abdurrauf As-Singkili yang menyebarkan Islam di pedalaman selatan Jawa Barat.',
    category: 'Ulama Nusantara',
    era: 'Era Jaringan Ulama Nusantara-Haramain (Abad ke-17 – Awal Abad ke-18 M, Sekitar 1650–1730 M)',
    province: 'Jawa Barat',
    city: 'Tasikmalaya',
    district: 'Kec. Bantarkalong',
    address: 'Desa Pamijahan, Kec. Bantarkalong, Kabupaten Tasikmalaya',
    location: {
      lat: -7.5681,
      lng: 108.0753,
      address: 'Desa Pamijahan, Kec. Bantarkalong, Kabupaten Tasikmalaya',
      district: 'Kec. Bantarkalong',
      city: 'Tasikmalaya',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Islam Tasikmalaya (Jalur Ziarah Syekh Abdul Muhyi Pamijahan)',
    sanad:
      'Lahir di Mataram dari keluarga bangsawan keturunan Kerajaan Galuh dan jalur Sunan Giri; murid kesayangan Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Kuala Aceh) dan berbaiat Tarekat Syattariyah di Aceh serta Makkah; mahaguru dari Dalem Bojong, Bagus Muhyiddin, dan para ulama Priangan.',
    karya: [
      'Naskah Martabat Kang Pitu (Martabat Tujuh) dalam tradisi suluk Tarekat Syattariyah Jawa Barat',
      'Perintisan pusat khalwat dan pesantren di Gua Safarwadi serta Desa Pamijahan, Tasikmalaya Selatan',
    ],
    history:
      'Syekh Haji Abdul Muhyi lahir sekitar tahun 1650 M di Lombok/Mataram dari pasangan Sembah Lebe Wartakusumah (keturunan bangsawan Galuh-Pajajaran) dan Raden Ajeng Tanganziah (keturunan Sunan Giri). Masa kecil dan remajanya dihabiskan di Gresik dan Ampel Denta untuk mempelajari ilmu syariat dasar sebelum berangkat ke Kuala Aceh pada usia 19 tahun guna berguru langsung kepada ulama besar Nusantara, Syekh Abdurrauf bin Ali As-Singkili (Teungku Syiah Kuala).\n\nSelama menuntut ilmu kepada Syekh Abdurrauf As-Singkili dan menunaikan ibadah haji ke Tanah Suci Makkah serta berziarah ke makam Syekh Abdul Qadir Al-Jailani di Baghdad, Syekh Abdul Muhyi menerima ijazah kemursyidan penuh Tarekat Syattariyah. Sekembalinya ke Pulau Jawa, atas petunjuk gurunya, beliau mengembara ke arah selatan Jawa Barat untuk mencari sebuah gua tempat beruzlah dan mendidik santri, melewati Darma (Kuningan), Pameungpeuk (Garut), Lebaksiuh, hingga akhirnya menemukan Gua Safarwadi di Desa Pamijahan, Bantarkalong, Tasikmalaya.\n\nDari lembah Pamijahan dan Gua Safarwadi inilah Syekh Abdul Muhyi mengislamkan masyarakat pedalaman Priangan Selatan yang sebelumnya masih memegang kepercayaan lama, serta mencetak jaringan ulama Tarekat Syattariyah yang menyebar ke Ciamis, Garut, Bandung, Cirebon, hingga Jawa Tengah. Beliau wafat sekitar tahun 1730 M dan dimakamkan di puncak bukit Desa Pamijahan.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Priangan, dikisahkan bahwa Syekh Abdul Muhyi menerima amanat dari gurunya untuk menanam bibit padi di tempat yang kelak menjadi pusat dakwahnya; ketika ditanam di lembah Pamijahan, bibit padi tersebut tumbuh dengan bulir yang bernas dan harum sebagai tanda tempat berkah yang ditunjuk.<!--more-->\n\nDi dalam Gua Safarwadi yang terletak tidak jauh dari maqbarah beliau, terdapat mata air jernih ("Cai Kahuripan" / Air Zamzam Pamijahan) dan ceruk batu berbentuk kopiah haji yang menurut tradisi lisan para kuncen merupakan tempat Syekh Abdul Muhyi melakukan riyadhoh dzikir dan munajat bersama para santrinya.',
    ],
    untoldStory:
      'Penelitian filologi oleh Prof. Tommy Christomy dari Universitas Indonesia terhadap naskah-naskah kuno milik keturunan Syekh Abdul Muhyi di Pamijahan mengungkap peran besar beliau sebagai jembatan intelektual yang menerjemahkan konsep tasawuf kosmologis *Martabat Tujuh* dari Aceh dan Haramain ke dalam bahasa Jawa dan Sunda yang selaras dengan syariat Ahlussunnah wal Jamaah.<!--more-->\n\nDi Kompleks Kampung Adat dan Makam Pamijahan hingga hari ini masih diberlakukan aturan kearifan lokal yang ketat sejak masa Syekh Abdul Muhyi: larangan merokok di seluruh kawasan suci makam dan Gua Safarwadi, serta kewajiban menjaga kelestarian hutan lindung di sekeliling bukit maqbarah.',
    barokahHajat:
      'Peziarah yang datang ke Pamijahan umumnya bertawassul memohon kebersihan hati dalam menempuh jalan dzikir, ketenangan batin dari kegelisahan hidup, serta keberkahan ilmu agama bagi keluarga dan keturunan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Haji Abdul Muhyi Pamijahan',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ الشَّيْخِ الْحَاجِّ عَبْدِ الْمُحْيِي فَامِيجَاهَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَحْيِ قُلُوبَنَا بِنُورِ مَعْرِفَتِكَ وَمَحَبَّتِكَ بِبَرَكَةِ أَسْرَارِهِ وَعُلُومِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ الشَّيْخِ الْحَاجِّ عَبْدِ الْمُحْيِي فَامِيجَاهَانْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَحْيِ قُلُوبَنَا بِنُورِ مَعْرِفَتِكَ وَمَحَبَّتِكَ بِبَرَكَةِ أَسْرَارِهِ وَعُلُومِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aarifi billaah Asy-Syaikh Al-Haajj 'Abdil-Muhyii Pamijahan syai-un lillaahi lahumul-Faatihah. Allaahumma ahyi quluubanaa bi nuuri ma'rifatika wa mahabbatika bi barakati asraarihii wa 'uluumih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah Syekh Haji Abdul Muhyi Pamijahan, Al-Fatihah. Ya Allah, hidupkanlah hati kami dengan cahaya makrifat dan cinta kepada-Mu berkat rahasia keshalihan dan ilmu beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah Syekh Haji Abdul Muhyi Pamijahan, Al-Fatihah. Ya Allah, hidupkanlah hati kami dengan cahaya makrifat dan cinta kepada-Mu berkat rahasia keshalihan dan ilmu beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul dan tradisi ziarah akbar ditetapkan setiap tahun oleh keluarga kasepuhan/pengurus yayasan Desa Pamijahan (puncak kunjungan lazimnya pada bulan Muharram, Rabiul Awal, dan Rajab).',
    localAdab:
      'DILARANG KERAS merokok di seluruh area suci makam Pamijahan dan Gua Safarwadi; wajib menutup aurat, melepas alas kaki di batas gerbang suci, serta membawa senter dan mengikuti pemandu resmi saat memasuki Gua Safarwadi.',
    facilities: ['Masjid Jami’ Pamijahan', 'Cungkup Makam Syekh Abdul Muhyi', 'Situs Gua Safarwadi', 'Penginapan & Terminal Bus Peziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Christomy, Tommy (2008). Signs of the Wali: Narratives at the Sacred Sites in Pamijahan, West Java. ANU Press.',
      'Azra, Azyumardi (2004). Jaringan Ulama Timur Tengah dan Kepulauan Nusantara Abad XVII & XVIII. Kencana.',
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mama-cibaduyut-kudang',
    name: 'Mama Eyang Cibaduyut (KH. Muhammad Zarkasyi) & Mama Kudang (KH. Abdul Majid)',
    title: 'Mama Cibaduyut & Mama Kudang (Bandung / Tasikmalaya)',
    description:
      'Poros mahaguru ulama ajengan Pasundan abad ke-19 hingga ke-20 yang mencetak ribuan kiai pesantren di Bandung, Garut, dan Tasikmalaya.',
    category: 'Ulama Nusantara',
    era: 'Era Jaringan Pesantren Pasundan (Abad ke-19 – Pertengahan Abad ke-20 M)',
    province: 'Jawa Barat',
    city: 'Bandung',
    district: 'Kec. Bojongloa Kidul',
    address: 'Kompleks Makam Mama Eyang Cibaduyut, Kel. Cibaduyut, Kec. Bojongloa Kidul, Kota Bandung (serta Kompleks Pesantren Kudang, Tasikmalaya)',
    location: {
      lat: -6.9584,
      lng: 107.5948,
      address: 'Kompleks Makam Mama Eyang Cibaduyut, Kel. Cibaduyut, Kec. Bojongloa Kidul, Kota Bandung',
      district: 'Kec. Bojongloa Kidul',
      city: 'Bandung',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Pesantren Priangan Jawa Barat (Jejak Keilmuan Mama Cibaduyut & Mama Kudang)',
    sanad:
      'Mama Eyang Cibaduyut (KH. Muhammad Zarkasyi bin KH. Muhammad Thahir, wafat 1948 M) bersanad kepada Syekh Nawawi Al-Bantani dan Syekh Khalil Bangkalan; Mama Kudang Tasikmalaya (KH. Abdul Majid / KH. Muhammad Soedja’i) merupakan poros sanad fikih Syafi’iyah Priangan Timur.',
    karya: [
      'Pendirian Pesantren Cibaduyut Bandung (1872 M) yang menjadi kawah candradimuka para ajengan besar Jawa Barat',
      'Pengembangan Pesantren Kudang Tasikmalaya sebagai benteng Ahlussunnah wal Jamaah dan pusat pengkajian kitab kuning di Priangan',
    ],
    history:
      'Dalam sejarah transmisi keilmuan Islam di Tanah Pasundan pada akhir abad ke-19 hingga paruh pertama abad ke-20, gelar "Mama" (singkatan dari *Rama Ajengan*, sebutan penghormatan tertinggi bagi ulama besar Sunda) melekat kuat pada dua poros keilmuan Priangan: Mama Eyang Cibaduyut (KH. Muhammad Zarkasyi) di Bandung dan Mama Kudang di Tasikmalaya. KH. Muhammad Zarkasyi lahir sekitar tahun 1848 M dan menimba ilmu di berbagai pesantren Jawa hingga bermukim di Makkah bersama jaringan murid Syekh Nawawi Al-Bantani.\n\nSekembalinya ke tanah air pada tahun 1872 M, Mama Eyang Cibaduyut mendirikan Pondok Pesantren Cibaduyut di selatan Bandung. Dari pesantren inilah lahir para ulama raksasa Jawa Barat seperti Mama Syathibi Gentur (Cianjur), Mama Eyang Cikافيت, dan puluhan pendiri pesantren di Priangan. Beliau juga mengajarkan keterampilan kerajinan kulit/sepatu kepada para santri dan warga sekitar agar mandiri secara ekonomi di masa penjajahan Belanda, yang menjadi cikal bakal sentra sepatu Cibaduyut hingga kini.\n\nSementara itu di wilayah Priangan Timur (Tasikmalaya dan Garut), Pesantren Kudang yang dirintis oleh Mama Kudang menjadi pusat pengkajian ilmu alat (nahwu-sharaf), fikih Syafi’iyah, dan ketahanan perjuangan santri melawan kolonialisme. Sinergi sanad keilmuan antara Cibaduyut di Bandung dan Kudang di Tasikmalaya membentuk tulang punggung tradisi pesantren salafiyah di seluruh Tatar Sunda.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Bandung dan Priangan, dikisahkan bahwa pada masa agresi militer kolonial ketika pesawat tempur menjatuhkan bom di sekitar Bandung Selatan, kompleks Pesantren dan Masjid Mama Eyang Cibaduyut tetap berdiri utuh dan menjadi tempat perlindungan warga yang berdzikir bersama beliau.<!--more-->\n\nPara santri sepuh juga menuturkan ketajaman basirah (mata batin) Mama Cibaduyut dan Mama Kudang dalam mendidik murid; beliau kerap mengetahui isi hati santri yang sedang kesulitan biaya mondok lalu diam-diam memberikan bekal beras dan kitab tanpa mempermalukan santri tersebut di hadapan teman-temannya.',
    ],
    untoldStory:
      'Jarang diketahui masyarakat luas bahwa terkenalnya kawasan Cibaduyut Bandung sebagai pusat pengrajin sepatu terbesar di Indonesia berakar dari visi pemberdayaan ekonomi santri yang ditanamkan oleh Mama Eyang KH. Muhammad Zarkasyi sejak akhir abad ke-19.<!--more-->\n\nBeliau selalu menekankan kepada para santrinya bahwa seorang ulama dan penuntut ilmu tidak boleh menggantungkan hidup dari pemberian penguasa kolonial, melainkan harus memiliki kemandirian karya tangan (*kasab*) sembari tetap menjaga keikhlasan mengajar ilmu agama secara cuma-cuma kepada umat.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Mama Cibaduyut dan Mama Kudang lazimnya bertawassul memohon keberkahan ilmu pesantren yang manfaat, kemandirian ekonomi dan kelancaran usaha kerajinan/perdagangan, serta keteguhan akidah keluarga.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Mama Eyang Cibaduyut & Mama Kudang',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ مُحَمَّدٍ زَرْكَشِي (مَامَا شِيبَادُويُوتْ) وَمَشَايِخِ كُودَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمَا وَبَارِكْ لَنَا فِي كَسْبِنَا وَذُرِّيَّاتِنَا.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ مُحَمَّدٍ زَرْكَشِي (مَامَا شِيبَادُويُوتْ) وَمَشَايِخِ كُودَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِمَا وَبَارِكْ لَنَا فِي كَسْبِنَا وَذُرِّيَّاتِنَا.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah Asy-Syaikh Muhammad Zarkasyii (Mama Cibaduyut) wa Masyaayikh Kudang syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihimaa wa baarik lanaa fii kasbinaa wa dzurriyyaatinaa.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah KH. Muhammad Zarkasyi (Mama Cibaduyut) dan para masyayikh Kudang Tasikmalaya, Al-Fatihah. Ya Allah, berikanlah kami kemanfaatan ilmu beliau berdua serta berkahilah usaha dan keturunan kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah KH. Muhammad Zarkasyi (Mama Cibaduyut) dan para masyayikh Kudang Tasikmalaya, Al-Fatihah. Ya Allah, berikanlah kami kemanfaatan ilmu beliau berdua serta berkahilah usaha dan keturunan kami.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh keluarga/pengurus yayasan Pesantren Cibaduyut Bandung dan Pesantren Kudang Tasikmalaya (disarankan mengonfirmasi ke pengurus makam sebelum keberangkatan).',
    localAdab:
      'Berpakaian muslim sopan dan rapi, menjaga ketenangan di lingkungan pesantren dan pemukiman warga Cibaduyut, serta melepas alas kaki saat memasuki cungkup makam.',
    facilities: ['Masjid & Kompleks Pesantren Cibaduyut', 'Cungkup Maqbarah Mama Cibaduyut', 'Tempat Wudhu', 'Area Parkir'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'ruhimat, Mumu dkk. (2015). Biografi Ulama-Ulama Jawa Barat. Puslitbang Lektur dan Khazanah Keagamaan Kemenag RI.',
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
      'Arsip Sejarah Pondok Pesantren Al-Basyariyah / Cibaduyut Bandung & Pesantren Kudang Tasikmalaya.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-jafar-shadiq-cibiuk',
    name: "Syekh Ja'far Shadiq (Sunan Haruman Cibiuk)",
    title: "Syekh Ja'far Shadiq (Sunan Haruman Cibiuk Garut)",
    description:
      'Waliyullah penyebar Islam di Lembah Garut Utara (Gunung Haruman & Cibiuk) yang memadukan dakwah santun, pertanian, dan falsafah kesabaran batin.',
    category: 'Auliya Nusantara',
    era: 'Era Islamisasi Priangan & Kesultanan Cirebon (Abad ke-16–17 M)',
    province: 'Jawa Barat',
    city: 'Garut',
    district: 'Kec. Cibiuk',
    address: 'Bukit Gunung Haruman, Desa Cipareuan, Kec. Cibiuk, Kabupaten Garut',
    location: {
      lat: -7.0582,
      lng: 107.9486,
      address: 'Bukit Gunung Haruman, Desa Cipareuan, Kec. Cibiuk, Kabupaten Garut',
      district: 'Kec. Cibiuk',
      city: 'Garut',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Islam Priangan Timur (Kawasan Ziarah Syekh Ja’far Shadiq Cibiuk Garut)',
    sanad:
      'Memiliki pertalian nasab dan sanad dakwah dengan jaringan Kesultanan Cirebon (Sunan Gunung Jati) serta Syekh Abdul Muhyi Pamijahan; mertua dari Eyang Dalem Wangsa Muhammad (Pangeran Papak Cinunuk).',
    karya: [
      'Islamisasi kawasan Limbangan, Cibiuk, dan lereng Gunung Haruman Garut secara damai',
      'Perintisan tradisi pesantren di kaki Gunung Haruman dan filosofi kuliner "Sambal Cibiuk" sebagai simbol pengendalian amarah',
    ],
    history:
      'Syekh Ja’far Shadiq, yang dikenal luas oleh masyarakat Priangan dengan gelar Sunan Haruman atau Wali Cibiuk, merupakan tokoh utama penyebar agama Islam di wilayah Garut bagian utara (kawasan Cibiuk, Limbangan, dan Kadungora). Dalam historiografi lokal Limbangan dan Cirebon, beliau menjalankan misi dakwah untuk mengislamkan masyarakat pedalaman Sunda yang kala itu masih menganut ajaran kabuyutan.\n\nBerpusat di lereng Gunung Haruman, Kecamatan Cibiuk, Syekh Ja’far Shadiq mendekati masyarakat melalui keteladanan akhlak, pengobatan, serta pengajaran bercocok tanam. Beliau berhasil mengislamkan tokoh-tokoh berpengaruh di kawasan Limbangan, termasuk menikahkan putrinya yang bernama Siti Fatimah dengan bangsawan setempat yang kemudian dikenal sebagai Eyang Dalem Wangsa Muhammad (Wali Pangeran Papak di Cinunuk, Wanaraja).\n\nJejak dakwah Syekh Ja’far Shadiq di Cibiuk melahirkan banyak kampung santri dan pondok pesantren tua di sekitar lereng Gunung Haruman. Kompleks makam beliau di Desa Cipareuan, Kecamatan Cibiuk, Kabupaten Garut telah ditetapkan sebagai situs cagar budaya religi yang ramai diziarahi masyarakat dari seluruh Jawa Barat.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Garut, dikisahkan tentang asal-usul "Sambal Cibiuk" yang diracik pada masa Syekh Ja’far Shadiq untuk menjamu para tamu dan santri. Meskipun dibuat dari cabai rawit pilihan yang banyak, sambal tersebut ketika disajikan dengan doa beliau tidak menimbulkan rasa panas yang menyakiti perut, melainkan memberikan kehangatan dan kesegaran tubuh.<!--more-->\n\nMasyarakat Cibiuk memaknai kisah tersebut sebagai simbol keteladanan batin Syekh Ja’far Shadiq: bahwa seorang mukmin yang hatinya dipenuhi dzikir dan kesabaran mampu meredam panasnya amarah dan mengubah kepedihan ujian hidup menjadi ketenteraman yang menyejukkan sesama.',
    ],
    untoldStory:
      'Gunung Haruman yang menjulang di dekat makam Syekh Ja’far Shadiq memiliki posisi strategis dalam sejarah penyebaran Islam di Priangan: dari puncak bukit inilah para ulama masa silam memantau pemukiman di cekungan Bandung Timur hingga lembah Garut.<!--more-->\n\nDi kompleks makam Cipareuan Cibiuk masih tersimpan artefak batu nisan kuno dan masjid bersejarah yang dijaga secara turun-temurun oleh kasepuhan juru kunci Cibiuk, yang hingga kini mempertahankan tradisi pembacaan tawassul dan manaqib setiap malam Jumat Kliwon.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Ja’far Shadiq Cibiuk lazimnya bertawassul memohon kepada Allah SWT agar dikaruniai kesabaran hati dalam meredam amarah rumah tangga, keberkahan rezeki kuliner dan pertanian, serta keteduhan batin.',
    doaKhusus: [
      {
        title: "Tawassul & Hadiah Fatihah Khusus Syekh Ja'far Shadiq (Sunan Haruman Cibiuk)",
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ جَعْفَرٍ الصَّادِقْ (سُونَانْ هَارُومَانْ شِيبِيُوكْ غَارُوتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَرِّدْ قُلُوبَنَا بِنُورِ السَّكِينَةِ وَالصَّبْرِ وَانْفَعْنَا بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ جَعْفَرٍ الصَّادِقْ (سُونَانْ هَارُومَانْ شِيبِيُوكْ غَارُوتْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَرِّدْ قُلُوبَنَا بِنُورِ السَّكِينَةِ وَالصَّبْرِ وَانْفَعْنَا بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Asy-Syaikh Ja'farish-Shaadiq (Suunaan Haaruumaan Cibiuk Garut) syai-un lillaahi lahumul-Faatihah. Allaahumma barrid quluubanaa bi nuuris-sakiinati wash-shabri wanfa'naa bi barakatih.",
        terjemahan:
          "Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Ja'far Shadiq (Sunan Haruman Cibiuk Garut), Al-Fatihah. Ya Allah, sejukkanlah hati kami dengan cahaya ketenteraman dan kesabaran serta limpahkanlah keberkahan beliau kepada kami.",
        translation:
          "Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Ja'far Shadiq (Sunan Haruman Cibiuk Garut), Al-Fatihah. Ya Allah, sejukkanlah hati kami dengan cahaya ketenteraman dan kesabaran serta limpahkanlah keberkahan beliau kepada kami.",
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh keluarga/pengurus yayasan makam Cibiuk Garut (pengajian rutin memuncak pada malam Jumat Kliwon dan bulan Mulud/Rabiul Awal).',
    localAdab:
      'Berpakaian sopan menutup aurat, melepas alas kaki sebelum menaiki serambi maqbarah Cipareuan, menjaga kebersihan area mata air dan lereng bukit, serta mengikuti petunjuk juru kunci.',
    facilities: ['Cungkup Makam Syekh Ja’far Shadiq', 'Masjid Jami’ Kompleks Makam', 'Tempat Wudhu & Toilet', 'Area Parkir Peziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
      'Dinas Pariwisata dan Kebudayaan Kabupaten Garut — Data Cagar Budaya Makam Syekh Ja’far Shadiq Cibiuk.',
      'Babad Limbangan & Arsip Sejarah Kasepuhan Cibiuk Garut.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sunan-rohmat-godog',
    name: 'Sunan Rohmat Suci (Prabu Kiansantang / Syekh Sunan Rohmat Godog)',
    title: 'Sunan Rohmat Suci (Makam Keramat Godog Garut)',
    description:
      'Putra Prabu Siliwangi dan adik kandung Pangeran Cakrabuana serta Nyai Rara Santang yang menyebarkan Islam di pedalaman Tatar Sunda hingga bersemayam di Bukit Godog, Garut.',
    category: 'Auliya Nusantara',
    era: 'Era Peralihan Pajajaran & Penyebaran Islam Sunda (Abad ke-15–16 M)',
    province: 'Jawa Barat',
    city: 'Garut',
    district: 'Kec. Karangpawitan',
    address: 'Kampung Godog, Desa Lebak Agung, Kec. Karangpawitan, Kabupaten Garut',
    location: {
      lat: -7.2314,
      lng: 107.9682,
      address: 'Kampung Godog, Desa Lebak Agung, Kec. Karangpawitan, Kabupaten Garut',
      district: 'Kec. Karangpawitan',
      city: 'Garut',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Priangan (Kawasan Ziarah Makam Sunan Rohmat Suci Godog Garut)',
    sanad:
      'Putra bungsu Prabu Siliwangi (Sri Baduga Maharaja) dari permaisuri Nyai Subang Larang (santriwati Syekh Quro Karawang); adik kandung Pangeran Walangsungsang (Cakrabuana) dan Nyai Rara Santang; paman dari Sunan Gunung Jati.',
    karya: [
      'Dakwah Islamisasi di wilayah pedalaman pegunungan Priangan Tengah dan Garut (Gunung Suci / Bukit Godog)',
      'Perintisan titik riyadhoh dan pusat pengajaran tauhid di lereng Gunung Karacak, Karangpawitan, Garut',
    ],
    history:
      'Sunan Rohmat Suci, yang dalam historiografi dan naskah Carita Purwaka Caruban Nagari dikenal sebagai Raja Sengara atau Prabu Kiansantang, adalah putra bungsu Raja Pajajaran Sri Baduga Maharaja (Prabu Siliwangi) dari pernikahannya dengan Nyai Subang Larang. Sejak kecil beliau mendapatkan dasar-dasar pendidikan keislaman dari ibundanya yang merupakan murid Syekh Qurotul Ain di Karawang, bersama kedua kakaknya yakni Pangeran Walangsungsang dan Nyai Rara Santang.\n\nSetelah dewasa dan mendalami agama Islam hingga menunaikan ibadah haji ke Tanah Suci Makkah, beliau menyandang gelar Syekh Mansyur atau Sunan Rohmat Suci. Berbeda dengan kakaknya Pangeran Cakrabuana dan keponakannya Sunan Gunung Jati yang memusatkan dakwah di pesisir utara Cirebon, Sunan Rohmat Suci memilih jalur dakwah yang berat di pedalaman pegunungan Tatar Sunda.\n\nBeliau mendirikan pusat perenungan dan pengajaran Islam di kawasan Suci dan lereng Gunung Karacak, Kampung Godog, Desa Lebak Agung, Kecamatan Karangpawitan, Kabupaten Garut. Kompleks Makam Keramat Godog yang berada di perbukitan sejuk Karangpawitan kini menjadi salah satu situs ziarah tertua dan paling dihormati oleh masyarakat Sunda.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Sunda (Babad Godog & Wawacan Gagak Lumayung), dikisahkan bahwa Prabu Kiansantang yang semula tak terkalahkan dalam olah kanuragan akhirnya menyadari kelemahan dirinya ketika tak sanggup mencabut sebatang tongkat di Tanah Suci sebelum mengucapkan kalimat basmalah dan berserah diri secara total kepada Allah SWT.<!--more-->\n\nSejak peristiwa batin tersebut, beliau menanggalkan kesombongan kependekarannya dan menyandang nama "Sunan Rohmat Suci", karena bertekad menyebarkan Islam sebagai rahmat kasih sayang yang menyucikan akhlak masyarakat di lereng-lereng gunung Priangan.',
    ],
    untoldStory:
      'Di Kompleks Makam Keramat Godog, selain pusara utama Sunan Rohmat Suci di puncak bukit, terdapat pula makam para murid dan pengikut setianya seperti Sembah Dalem Sareupna, Sembah Dalem Kholifah Agung, dan Syekh Dora yang mendampingi beliau membuka hutan lereng Gunung Karacak.<!--more-->\n\nSetiap bulan Mulud (Rabiul Awal), di kompleks ini diselenggarakan upacara adat "Ngalungsur Pusaka" (penurunan dan pembersihan benda-benda peninggalan sejarah Sunan Rohmat Suci) yang dihadiri ribuan peziarah dengan diiringi pembacaan shalawat dan tausiyah ulama guna mengenang perjuangan dakwah beliau.',
    barokahHajat:
      'Peziarah yang meniti tangga Bukit Godog untuk berziarah ke pusara Sunan Rohmat Suci umumnya bertawassul memohon kekuatan iman dalam berhijrah menuju kebaikan, keberanian menegakkan kebenaran dengan kasih sayang, serta kerukunan ikatan keluarga besar.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Sunan Rohmat Suci (Prabu Kiansantang Godog)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ سُونَانْ رَحْمَةْ سُوشِي (فَرَابُو كِيَانْ سَانْتَانْج غُودُوغْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اشْمَلْنَا بِرَحْمَتِكَ وَثَبِّتْنَا عَلَى الْإِسْلَامِ وَالْإِيمَانِ بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ سُونَانْ رَحْمَةْ سُوشِي (فَرَابُو كِيَانْ سَانْتَانْج غُودُوغْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اشْمَلْنَا بِرَحْمَتِكَ وَثَبِّتْنَا عَلَى الْإِسْلَامِ وَالْإِيمَانِ بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Asy-Syaikh Suunaan Rahmat Sucii (Prabu Kiansantang Godog) syai-un lillaahi lahumul-Faatihah. Allaahummasymalnaa bi rahmatika wa tsabbitnaa 'alal-Islaami wal-iimaani bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Sunan Rohmat Suci (Prabu Kiansantang Godog), Al-Fatihah. Ya Allah, liputilah kami dengan rahmat-Mu dan teguhkanlah kami di atas Islam dan iman dengan keberkahan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Sunan Rohmat Suci (Prabu Kiansantang Godog), Al-Fatihah. Ya Allah, liputilah kami dengan rahmat-Mu dan teguhkanlah kami di atas Islam dan iman dengan keberkahan beliau.',
      },
    ],
    haulSchedule:
      '14 Rabiul Awal / Bulan Mulud (Puncak Tradisi Tahunan Ziarah & Ngalungsur di Kompleks Makam Keramat Godog Karangpawitan Garut).',
    localAdab:
      'Menyiapkan kondisi fisik karena harus menaiki ratusan anak tangga menuju puncak bukit Godog, berpakaian sopan menutup aurat, melepas alas kaki di area cungkup, dan mematuhi tata tertib kuncen Makam Godog.',
    facilities: ['Cungkup Utama Makam Sunan Rohmat Suci', 'Masjid & Musholla Kompleks Godog', 'Jalur Tangga Bukit Terawat', 'Area Parkir Kendaraan'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Atja (1972). Tjarita Purwaka Tjaruban Nagari. Ikatan Karyawan Museum.',
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
      'Balai Pelestarian Nilai Budaya (BPNB) Jawa Barat — Kajian Sejarah dan Tradisi Situs Makam Keramat Godog Garut.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'dalem-cikundul-cianjur',
    name: 'Raden Aria Wiratanudatar I (Dalem Cikundul)',
    title: 'Dalem Cikundul (Cikalongkulon Cianjur)',
    description:
      'Ulama bangsawan pendiri Kabupaten Cianjur (1677 M) dan putra Raden Aria Wangsa Goparana yang meletakkan falsafah kota santri "Ngaos, Mamaos, Maenpo".',
    category: 'Auliya Nusantara',
    era: 'Era Penyebaran Islam Priangan & Berdirinya Cianjur (Abad ke-17 M, Wafat sekitar 1691 M)',
    province: 'Jawa Barat',
    city: 'Cianjur',
    district: 'Kec. Cikalongkulon',
    address: 'Bukit Pasir Gajah, Desa Cijagang, Kec. Cikalongkulon, Kabupaten Cianjur',
    location: {
      lat: -6.6968,
      lng: 107.1945,
      address: 'Bukit Pasir Gajah, Desa Cijagang, Kec. Cikalongkulon, Kabupaten Cianjur',
      district: 'Kec. Cikalongkulon',
      city: 'Cianjur',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Jawa Barat (Kawasan Ziarah Makam Dalem Cikundul Cikalongkulon Cianjur)',
    sanad:
      'Putra Raden Aria Wangsa Goparana (Sagaraherang Subang, penyebar Islam asal Talaga Majalengka keturunan Sunan Talaga Manggung yang berguru ke Kesultanan Cirebon).',
    karya: [
      'Pendirian nagari dan pemerintahan Islam Cianjur (2 Juli 1677 M) yang berpusat awal di Cikundul',
      'Peletakan pilar budaya santri Cianjur: Ngaos (mengaji Al-Qur’an & kitab), Mamaos (tembang syair puji-pujian), dan Maenpo (silat bela diri)',
    ],
    history:
      'Raden Aria Wiratanudatar I, yang sangat dihormati masyarakat Sunda dengan gelar Dalem Cikundul, adalah putra dari Raden Aria Wangsa Goparana, ulama bangsawan asal Talaga (Majalengka) yang menyebarkan Islam di Sagaraherang, Subang setelah berguru ke Kesultanan Cirebon. Pada pertengahan abad ke-17 M, Raden Aria Wiratanudatar mendapatkan amanat dari ayahnya untuk memperluas dakwah Islam dan membuka pemukiman baru di sepanjang aliran Sungai Cikundul dan Sungai Citarum.\n\nBeliau mendirikan pusat pesantren dan pemerintahan di Cikundul (kini Kecamatan Cikalongkulon, Kabupaten Cianjur). Pada tanggal 2 Juli 1677 M, ketika struktur kekuasaan Mataram di Priangan melemah akibat gejolak Trunojoyo dan intervensi VOC, Raden Aria Wiratanudatar mendeklarasikan kemandirian wilayah Cianjur sebagai pemerintahan otonom yang berlandaskan syariat Islam dan kearifan adat Sunda.\n\nKepemimpinan Dalem Cikundul yang memadukan kedalaman tasawuf dengan ketangguhan pemerintahan melahirkan identitas Cianjur sebagai "Kota Santri" dengan tiga pilar utama: *Ngaos* (tradisi mengaji di pesantren), *Mamaos* (seni suara yang berakar dari dzikir dan shalawat), serta *Maenpo* (pencak silat Cikalong untuk menjaga kehormatan agama dan bangsa). Beliau wafat sekitar tahun 1691 M dan dimakamkan di puncak Bukit Pasir Gajah, Desa Cijagang, Kecamatan Cikalongkulon.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Cianjur (Babad Cikundul), dikisahkan bahwa Dalem Cikundul dikenal sebagai pemimpin yang sangat zuhud; meskipun menyandang kedudukan bupati pertama, beliau lebih sering menghabiskan malam-malamnya dengan beruzlah dan berdzikir di perbukitan Cikundul sambil memikirkan kesejahteraan rakyatnya.<!--more-->\n\nTradisi lisan warga Cikalongkulon juga mengisahkan karomah kepemimpinan beliau ketika wilayah Cikundul terancam serangan gerombolan perampok dan ekspansi pasukan asing; berkat munajat dan kewibawaan batin Dalem Cikundul, pasukan lawan kehilangan arah di tengah kabut lembah Sungai Cikundul hingga akhirnya memilih berdamai.',
    ],
    untoldStory:
      'Silsilah keturunan Raden Aria Wiratanudatar I (Dalem Cikundul) melahirkan jaringan ulama dan pemimpin besar di Jawa Barat, mulai dari para bupati Cianjur dan Bandung (Wiranatakusumah), hingga para kiai pesantren di Cikalong, Gentur, dan Sukabumi.<!--more-->\n\nDi Kompleks Makam Bukit Pasir Gajah Cijagang, peziarah akan menapaki ratusan anak tangga batu yang teduh menuju cungkup utama. Desain tata ruang makam di atas bukit yang menghadap ke lembah Sungai Cikundul ini mencerminkan harmoni arsitektur Islam Pasundan abad ke-17 yang tetap lestari hingga kini.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Dalem Cikundul Cianjur umumnya bertawassul memohon kepada Allah SWT agar dianugerahi keteguhan amanah dalam jabatan atau kepemimpinan, kemuliaan akhlak keluarga, serta keberkahan ilmu agama dan rezeki.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Dalem Cikundul (Raden Aria Wiratanudatar I)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْعَالِمِ الصَّالِحِ رَادِينْ أَرْيَا وِيرَاتَانُودَاتَارْ الْأَوَّلِ (دَالِيمْ شِيكُونْدُولْ شِيَانْجُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا مِنْ أَهْلِ الْعِلْمِ وَالْأَمَانَةِ وَانْفَعْنَا بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْعَالِمِ الصَّالِحِ رَادِينْ أَرْيَا وِيرَاتَانُودَاتَارْ الْأَوَّلِ (دَالِيمْ شِيكُونْدُولْ شِيَانْجُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اجْعَلْنَا مِنْ أَهْلِ الْعِلْمِ وَالْأَمَانَةِ وَانْفَعْنَا بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Amiiril-'Aalimish-Shaalih Raadiin Aryaa Wiiraataanudaataar Al-Awwal (Dalem Cikundul Cianjur) syai-un lillaahi lahumul-Faatihah. Allaahummaj'alnaa min ahlil-'ilmi wal-amaanati wanfa'naa bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin ulama yang shalih Raden Aria Wiratanudatar I (Dalem Cikundul Cianjur), Al-Fatihah. Ya Allah, jadikanlah kami termasuk ahli ilmu dan pemegang amanah serta limpahkanlah keberkahan beliau kepada kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin ulama yang shalih Raden Aria Wiratanudatar I (Dalem Cikundul Cianjur), Al-Fatihah. Ya Allah, jadikanlah kami termasuk ahli ilmu dan pemegang amanah serta limpahkanlah keberkahan beliau kepada kami.',
      },
    ],
    haulSchedule:
      'Bulan Muharram & Rangkaian Hari Jadi Cianjur (bulan Juli), serta jadwal haul tahunan yang ditetapkan oleh Yayasan Wargi Cikundul Cianjur.',
    localAdab:
      'Menjaga kesopanan pakaian muslim/muslimah, melepas alas kaki di batas gerbang cungkup Pasir Gajah, menjaga ketertiban di jalur tangga bukit, dan tidak melakukan praktik di luar tuntunan syariat.',
    facilities: ['Masjid Agung Kompleks Makam Cikundul', 'Jalur Tangga Beratap menuju Cungkup', 'Tempat Wudhu & Toilet', 'Terminal & Parkir Bus Ziarah Luas'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Suryaningrat, Bayu (1982). Sejarah Kabupaten I Cianjur Beserta Hari Jadi Cianjur 2 Juli 1677. Rukun Warga Cianjur-Jakarta.',
      'Lubis, Nina Herlina (1998). Kehidupan Kaum Menak Priangan 1800–1942. Pusat Informasi Kebudayaan Sunda.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Data Situs Makam Dalem Cikundul Cianjur.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mama-gentur-cianjur',
    name: 'Syekh KH. Ahmad Syathibi Al-Qonturi (Mama Gentur)',
    title: 'Mama Gentur (Warungkondang Cianjur)',
    description:
      'Ulama besar pengarang puluhan kitab berbahasa Arab dan Sunda Pegon asal Gentur, Cianjur yang menjadi mahaguru para ulama Jawa Barat abad ke-20.',
    category: 'Ulama Nusantara',
    era: 'Era Kebangkitan Pesantren Nusantara (Abad ke-19–20 M, Wafat 14 Jumadil Akhir 1365 H / 15 Mei 1946 M)',
    province: 'Jawa Barat',
    city: 'Cianjur',
    district: 'Kec. Warungkondang',
    address: 'Kampung Gentur, Desa Jambudipa, Kec. Warungkondang, Kabupaten Cianjur',
    location: {
      lat: -6.8421,
      lng: 107.0754,
      address: 'Kampung Gentur, Desa Jambudipa, Kec. Warungkondang, Kabupaten Cianjur',
      district: 'Kec. Warungkondang',
      city: 'Cianjur',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Naruhito_and_Masako_visit_Bogor_Palace_56.jpg',
    imageSource: 'Wikimedia Commons — Kawasan Priangan Barat (Jejak Keilmuan Syekh KH. Ahmad Syathibi / Mama Gentur Cianjur)',
    sanad:
      'Putra KH. Muhammad Sa’id bin KH. Abdul Qadir Gentur; murid Mama Gudang (KH. Shoheh Tasikmalaya), Mama Cibaduyut (KH. Muhammad Zarkasyi Bandung), KH. Kholil Bangkalan, serta ulama Masjidil Haram Makkah (Syekh Mukhtar Atharid dan Syekh Ali Al-Maliki); guru dari Mama Sempur Purwakarta, Abuya Dimyathi Cidahu Banten, dan Syekh Yasin Al-Fadani.',
    karya: [
      'Lebih dari 80 kitab berbahasa Arab dan Sunda Pegon, di antaranya Sirajul Munir (Fikih), Nadzam Al-Muqaddimah Al-Jazariyyah, dan Tahdzibul Athfal',
      'Pengembangan Pesantren Gentur Warungkondang Cianjur sebagai kiblat ilmu alat (Nahwu, Sharaf, Mantiq, Balaghah) di Jawa Barat',
    ],
    history:
      'Syekh KH. Ahmad Syathibi bin KH. Muhammad Sa’id Al-Qonturi, yang masyhur dengan panggilan takzim Mama Gentur atau Mama Kaler, merupakan salah satu ulama paling produktif dan berpengaruh dalam sejarah intelektual Islam Jawa Barat. Beliau lahir di Kampung Gentur, Desa Jambudipa, Kecamatan Warungkondang, Cianjur dari keluarga ulama pejuang yang mendirikan Pesantren Gentur.\n\nSejak muda, KH. Ahmad Syathibi mengembara menuntut ilmu ke berbagai pesantren utama di Priangan dan Jawa, seperti Pesantren Gudang Tasikmalaya, Pesantren Cibaduyut Bandung, hingga ke Madura, sebelum bermukim di Makkah Al-Mukarramah. Kedalaman penguasaan beliau dalam ilmu fikih, tafsir, hadis, mantiq (logika), dan balaghah membuat ulama besar dunia asal Padang yang mengajar di Makkah, Syekh Muhammad Yasin bin Isa Al-Fadani, meminta ijazah sanad keilmuan kepada Mama Gentur dan menyebut beliau dalam kitab sanadnya.\n\nSepanjang hidupnya di Pesantren Gentur Cianjur, beliau menulis sekitar 80 judul kitab dalam bahasa Arab dan bahasa Sunda aksara Pegon, serta mendidik para ulama besar seperti Mama Sempur (KH. Tubagus Ahmad Bakri Purwakarta), Mama Eyang Royani Cijantung, dan Abuya Muhammad Dimyathi Cidahu Pandeglang. Mama Gentur wafat pada 14 Jumadil Akhir 1365 H (15 Mei 1946 M) dan dimakamkan di kompleks Pesantren Gentur, Warungkondang, Cianjur.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur para santri Gentur, dikisahkan bahwa Mama Ahmad Syathibi memiliki keistiqamahan luar biasa dalam muthala’ah (menelaah dan menulis kitab) serta shalat malam; lampu minyak di ruang belajar beliau hampir tidak pernah padam sepanjang malam sementara lisan beliau tiada henti melantunkan shalawat dan dzikir.<!--more-->\n\nKetika kawasan Warungkondang dan Cianjur dilanda ketegangan militer pada masa pendudukan Jepang dan awal revolusi kemerdekaan (1942–1946), kewibawaan ilmu dan doa perlindungan Mama Gentur menjadikan Kampung Gentur sebagai tempat pengungsian yang aman bagi para santri dan masyarakat sekitar.',
    ],
    untoldStory:
      'Tidak banyak yang mengetahui bahwa ulama ahli hadis dan sanad dunia abad ke-20 di Makkah, Syekh Yasin Al-Fadani (Direktur Madrasah Darul Ulum Makkah), secara khusus mencantumkan nama Syekh Ahmad Syathibi Al-Qonturi (Mama Gentur Cianjur) sebagai salah satu guru sanad Nusantara yang sangat beliau hormati.<!--more-->\n\nSelain mengarang kitab-kitab berat berbahasa Arab untuk kalangan kiai, Mama Gentur juga menyusun puluhan nadzam (syair pengajaran) berbahasa Sunda yang jenaka namun sarat makna akidah dan fikih, sehingga ibu-ibu dan petani di pelosok desa Cianjur dapat menghafal rukun shalat dan sifat dua puluh dengan mudah.',
    barokahHajat:
      'Peziarah dan para santri yang berziarah ke maqbarah Mama Gentur Cianjur lazimnya bertawassul memohon kecerdasan akal dan ketajaman memahami ilmu kitab kuning, keberkahan dalam menulis atau mengajar, serta keteguhan istiqamah ibadah.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Mama Gentur (KH. Ahmad Syathibi Al-Qonturi)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ أَحْمَدَ شَاطِبِي الْقَنْطُورِي (مَامَا غِينْتُورْ شِيَانْجُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا فَهْمَ النَّبِيِّينَ وَحِفْظَ الْمُرْسَلِينَ بِبَرَكَةِ عُلُومِهِ وَمُصَنَّفَاتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ أَحْمَدَ شَاطِبِي الْقَنْطُورِي (مَامَا غِينْتُورْ شِيَانْجُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا فَهْمَ النَّبِيِّينَ وَحِفْظَ الْمُرْسَلِينَ بِبَرَكَةِ عُلُومِهِ وَمُصَنَّفَاتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah Asy-Syaikh Ahmad Syaathibii Al-Qanthuurii (Mama Gentur Cianjur) syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa fahman-nabiyyiina wa hifzhal-mursaliina bi barakati 'uluumihii wa mushannafaatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah Syekh KH. Ahmad Syathibi Al-Qonturi (Mama Gentur Cianjur), Al-Fatihah. Ya Allah, karuniakanlah kepada kami kefahaman ilmu dan kekuatan hafalan dengan keberkahan ilmu serta karya-karya kitab beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah Syekh KH. Ahmad Syathibi Al-Qonturi (Mama Gentur Cianjur), Al-Fatihah. Ya Allah, karuniakanlah kepada kami kefahaman ilmu dan kekuatan hafalan dengan keberkahan ilmu serta karya-karya kitab beliau.',
      },
    ],
    haulSchedule:
      '14 Jumadil Akhir (Haul Tahunan Mama Gentur KH. Ahmad Syathibi di Kompleks Pesantren Gentur Warungkondang Cianjur).',
    localAdab:
      'Mengenakan busana muslim santun (dianjurkan baju koko/sarung bagi pria dan busana muslimah rapi bagi wanita), menjaga ketenangan kegiatan mengaji santri Pesantren Gentur, dan melepas alas kaki di serambi makam.',
    facilities: ['Masjid & Pondok Pesantren Gentur', 'Maqbarah Keluarga Besar Mama Gentur', 'Tempat Wudhu', 'Area Parkir Peziarah'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Ruhimat, Mumu dkk. (2015). Biografi Ulama-Ulama Jawa Barat. Puslitbang Lektur dan Khazanah Keagamaan Kemenag RI.',
      'Al-Fadani, Muhammad Yasin bin Isa. Al-‘Iqd al-Farid min Jawahir al-Asanid.',
      'Manaqib Syekh KH. Ahmad Syathibi Al-Qonturi — Arsip Pondok Pesantren Gentur Warungkondang Cianjur.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mama-sempur-purwakarta',
    name: 'Syekh KH. Tubagus Ahmad Bakri As-Sampuri (Mama Sempur)',
    title: 'Mama Sempur (Plered Purwakarta)',
    description:
      'Ulama kharismatik keturunan Kesultanan Banten, pendiri Pesantren As-Salafiyah Sempur Purwakarta, dan penulis lebih dari 50 kitab kuning.',
    category: 'Ulama Nusantara',
    era: 'Era Ulama Pesantren Abad ke-20 (1839 – 1 Desember 1975 M / 27 Dzulqa’dah 1395 H)',
    province: 'Jawa Barat',
    city: 'Purwakarta',
    district: 'Kec. Plered',
    address: 'Pondok Pesantren As-Salafiyah, Desa Sempur, Kec. Plered, Kabupaten Purwakarta',
    location: {
      lat: -6.6318,
      lng: 107.3842,
      address: 'Pondok Pesantren As-Salafiyah, Desa Sempur, Kec. Plered, Kabupaten Purwakarta',
      district: 'Kec. Plered',
      city: 'Purwakarta',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Purwakarta-Karawang (Jalur Ziarah Mama Sempur Plered Purwakarta)',
    sanad:
      'Putra KH. Tubagus Saida bin Tubagus Arsyad (Citeko Plered, keturunan Sultan Maulana Hasanuddin Banten); murid Syekh Nawawi Al-Bantani, Syekh Mahfudz At-Tarmasi, Syekh Ahmad Khatib Al-Minangkabawi, Syaikhona Kholil Bangkalan, Mama Cibaduyut, dan Mama Gentur Cianjur.',
    karya: [
      'Pendirian Pondok Pesantren As-Salafiyah Sempur, Plered, Purwakarta (1911 M)',
      'Lebih dari 50 kitab kuning dan risalah, antara lain Maslakul Abrar, Cempaka Dilaga, Fawaidul Mubtadiin, dan Tanbihul Muftarin',
    ],
    history:
      'Syekh KH. Tubagus Ahmad Bakri bin Tubagus Saida As-Sampuri, yang dikenal luas dengan sebutan Mama Sempur, adalah salah satu ulama poros Ahlussunnah wal Jamaah di Jawa Barat pada abad ke-20. Beliau lahir di Citeko, Plered, Purwakarta dari keluarga ulama berdarah bangsawan Kesultanan Banten yang hijrah ke Purwakarta pasca-perlawanan terhadap kolonial Belanda.\n\nSemangat menuntut ilmu membawa Tubagus Ahmad Bakri muda mengembara ke puluhan pesantren di Jawa Barat, Jawa Tengah, Jawa Timur, dan Madura—termasuk berguru kepada Mama Cibaduyut, Mama Gentur Cianjur, dan Syaikhona Kholil Bangkalan—sebelum bermukim di Makkah Al-Mukarramah untuk menimba ilmu kepada Syekh Nawawi Al-Bantani, Syekh Ahmad Khatib Al-Minangkabawi, dan Syekh Mahfudz At-Tarmasi. Sekembalinya ke tanah air pada tahun 1911 M, beliau mendirikan Pondok Pesantren As-Salafiyah di Desa Sempur, Kecamatan Plered, Kabupaten Purwakarta.\n\nMama Sempur dikenal sangat tegas dalam menjaga kemurnian akidah Ahlussunnah wal Jamaah Asy’ariyah, mazhab fikih Syafi’iyah, dan kecintaan kepada keluarga Nabi (Dzurriyah Rasul), sekaligus gigih menentang kolonialisme melalui fatwa-fatwanya dalam kitab *Cempaka Dilaga*. Beliau dianugerahi umur panjang yang penuh berkah dan wafat pada malam Selasa, 27 Dzulqa’dah 1395 H (1 Desember 1975 M), serta dimakamkan di kompleks Masjid Pesantren Sempur, Plered, Purwakarta.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur para santri Sempur, dikisahkan tentang keteguhan dan keberanian luar biasa Mama Sempur di hadapan tentara kolonial Belanda maupun Jepang; meskipun beliau menulis kitab yang mengharamkan meniru dan tunduk kepada penjajah, para serdadu kolonial yang datang ke Sempur selalu merasa gentar dan tidak pernah berani menangkap beliau.<!--more-->\n\nSelain itu, hingga usia lebih dari 100 tahun, daya ingat, ketajaman penglihatan dalam membaca kitab kuning bertulisan kecil, serta keistiqamahan Mama Sempur dalam mengimami shalat berjamaah lima waktu dan mengajar santri tetap terjaga dengan prima.',
    ],
    untoldStory:
      'Di dalam kitab *Cempaka Dilaga* yang ditulis Mama Sempur dengan aksara Pegon, beliau merumuskan argumen fikih dan kebangsaan tentang wajibnya membela tanah air (Hubbul Wathan) dan menjaga kehormatan identitas umat Islam Nusantara dari hegemoni budaya kolonial.<!--more-->\n\nHingga kini, karya-karya cetak batu (litografi) dan manuskrip asli tulisan tangan Mama Sempur masih dikaji di ratusan majelis taklim dan pesantren salafiyah di Purwakarta, Karawang, Subang, hingga Banten sebagai rujukan otoritatif fikih keseharian masyarakat Sunda.',
    barokahHajat:
      'Peziarah yang berziarah ke makam Mama Sempur Purwakarta umumnya bertawassul memohon keberkahan umur panjang dalam ketaatan (thulul umr fi tha’atillah), keteguhan memegang prinsip Ahlussunnah wal Jamaah, serta keberkahan ilmu bagi anak-cucu yang sedang mondok di pesantren.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Mama Sempur (KH. Tubagus Ahmad Bakri As-Sampuri)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ تُوبَاغُوسْ أَحْمَدَ بَكْرِي السَّمْفُورِي (مَامَا سِيمْفُورْ فُورْوَاكَارْتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ طَوِّلْ أَعْمَارَنَا فِي طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ تُوبَاغُوسْ أَحْمَدَ بَكْرِي السَّمْفُورِي (مَامَا سِيمْفُورْ فُورْوَاكَارْتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ طَوِّلْ أَعْمَارَنَا فِي طَاعَتِكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-'Allaamah Asy-Syaikh Tuubaaguus Ahmad Bakrii As-Sampuuri (Mama Sempur Purwakarta) syai-un lillaahi lahumul-Faatihah. Allaahumma thawwil a'maaranaa fii thaa'atika wanfa'naa bi 'uluumihii wa barakaatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah Syekh KH. Tubagus Ahmad Bakri As-Sampuri (Mama Sempur Purwakarta), Al-Fatihah. Ya Allah, panjangkanlah umur kami dalam ketaatan kepada-Mu dan limpahkanlah kemanfaatan ilmu serta keberkahan beliau kepada kami.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh al-allamah Syekh KH. Tubagus Ahmad Bakri As-Sampuri (Mama Sempur Purwakarta), Al-Fatihah. Ya Allah, panjangkanlah umur kami dalam ketaatan kepada-Mu dan limpahkanlah kemanfaatan ilmu serta keberkahan beliau kepada kami.',
      },
    ],
    haulSchedule:
      '27 Dzulqa’dah (Haul Akbar Tahunan Mama Sempur KH. Tubagus Ahmad Bakri di Pondok Pesantren As-Salafiyah Sempur Plered Purwakarta).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang menutup aurat secara sempurna, menjaga adab dan ketenangan di lingkungan Pondok Pesantren As-Salafiyah Sempur, serta memisahkan jalur jamaah laki-laki dan perempuan.',
    facilities: ['Masjid Jami’ Pesantren Sempur', 'Maqbarah Mama Sempur', 'Tempat Wudhu & Toilet', 'Area Parkir Peziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ruhimat, Mumu dkk. (2015). Biografi Ulama-Ulama Jawa Barat. Puslitbang Lektur dan Khazanah Keagamaan Kemenag RI.',
      'As-Sampuri, Ahmad Bakri. Maslakul Abrar & Tanbihul Muftarin. Pesantren As-Salafiyah Sempur.',
      'Bizawie, Zainul Milal (2016). Masterpiece Islam Nusantara: Sanad dan Jejaring Ulama-Santri (1830–1945). Compass.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-abdul-halim-majalengka',
    name: 'KH. Abdul Halim (KH. Muhammad Syathibi / Otong Syathibi)',
    title: 'KH. Abdul Halim Majalengka (Pahlawan Nasional & Pendiri PUI)',
    description:
      'Ulama pembaharu pendidikan pesantren, anggota BPUPKI perumus kemerdekaan RI, pendiri Persatuan Ummat Islam (PUI), dan Pahlawan Nasional asal Majalengka.',
    category: 'Ulama Nusantara',
    era: 'Era Pergerakan Nasional & Kemerdekaan RI (26 Juni 1887 – 7 Mei 1962 M)',
    province: 'Jawa Barat',
    city: 'Majalengka',
    district: 'Kec. Majalengka',
    address: 'Kompleks Pondok Pesantren Santi Asromo, Desa Pasirayu, Kec. Sindang / Majalengka',
    location: {
      lat: -6.8365,
      lng: 108.2842,
      address: 'Kompleks Pondok Pesantren Santi Asromo, Desa Pasirayu, Kec. Sindang, Kabupaten Majalengka',
      district: 'Kec. Sindang',
      city: 'Majalengka',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Cirebon-Majalengka (Jejak Perjuangan Pahlawan Nasional KH. Abdul Halim)',
    sanad:
      'Putra KH. Muhammad Iskandar (Penghulu Kawedanan Jatiwangi) dan Hj. Siti Mutmainnah (keturunan Imam Safari & Sunan Gunung Jati); murid Kyai Anwar Ranji Wetan, KH. Agus Kenas Bobos Cirebon, KH. Ahmad Sobari Ciwedus Kuningan, serta Syekh Ahmad Khatib Al-Minangkabawi di Makkah.',
    karya: [
      'Pendirian Majelis Ilmi (1911) yang berkembang menjadi Persjarikatan Oelama (PO) dan Persatuan Ummat Islam (PUI) bersama KH. Ahmad Sanusi Sukabumi (1952)',
      'Pendirian Pesantren Keterampilan & Kemandirian "Santi Asromo" di Majalengka (1932) serta konsep ishlah "Intisab PUI"',
    ],
    history:
      'KH. Abdul Halim lahir dengan nama Otong Syathibi pada tanggal 26 Juni 1887 M di Desa Ciborelang, Jatiwangi, Kabupaten Majalengka. Setelah menimba ilmu di berbagai pesantren di Majalengka, Cirebon, Kuningan, hingga Pekalongan, beliau berangkat ke Makkah pada tahun 1908 M dan belajar selama tiga tahun di Masjidil Haram kepada Syekh Ahmad Khatib Al-Minangkabawi dan Syekh Ahmad Khayyat, sekaligus bersahabat erat dengan KH. Mas Mansur dan KH. Abdul Wahab Chasbullah.\n\nSekembalinya ke Majalengka pada tahun 1911 M, KH. Abdul Halim mendirikan *Majelis Ilmi* yang kemudian bertransformasi menjadi *Hayatul Qulub* dan *Persjarikatan Oelama* (PO, diakui tahun 1917). Pada tahun 1932, beliau mendirikan Pondok Pesantren Santi Asromo di Desa Pasirayu, Majalengka yang memadukan pengajaran kitab kuning dan Al-Qur’an dengan pelatihan pertanian, pertukangan kayu, tenun, serta kepemimpinan kemasyarakatan.\n\nDalam kancah perjuangan kemerdekaan Indonesia, KH. Abdul Halim terpilih sebagai anggota Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan (BPUPKI) pada tahun 1945 dan memimpin perjuangan rakyat Majalengka mempertahankan Republik Indonesia saat Agresi Militer Belanda. Pada tanggal 5 April 1952, beliau menyatukan Persjarikatan Oelama dengan Al-Ittihadijatoel Islamijah (AII) pimpinan KH. Ahmad Sanusi (Sukabumi) menjadi organisasi besar Persatuan Ummat Islam (PUI). Beliau wafat pada 7 Mei 1962 M, dimakamkan di kompleks Santi Asromo Majalengka, dan dianugerahi gelar Pahlawan Nasional melalui Keputusan Presiden RI Nomor 041/TK/Tahun 2008.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian para murid sepuh PUI, KH. Abdul Halim dikenal dengan karomah istiqamah dan keluasan hati dalam mempersatukan berbagai golongan umat Islam (Ishlahul Ummah); beliau mampu mendamaikan pertikaian tajam antar-kelompok dengan kelembutan akhlak dan rumusan "Delapan Ishlah" yang menyentuh nurani.<!--more-->\n\nPada masa Agresi Militer Belanda tahun 1947–1948 ketika KH. Abdul Halim memimpin gerilya di pedalaman pegunungan Majalengka dalam usia lebih dari 60 tahun, berkali-kali kepungan patroli Belanda gagal menemukan tempat persembunyian beliau dan para santri pejuang berkat perlindungan Allah SWT.',
    ],
    untoldStory:
      'Nama "Santi Asromo" yang dipilih KH. Abdul Halim untuk pesantren yang beliau rintis di lereng perbukitan Pasirayu pada tahun 1932 memiliki makna filosofis mendalam dari bahasa Kawi/Sanskerta: "Tempat yang Damai, Hening, dan Tenteram".<!--more-->\n\nDi Santi Asromo, setiap santri diwajibkan menanam pohon, mengolah sawah, dan membuat kerajinan tangan sendiri sebelum lulus, karena KH. Abdul Halim berkeyakinan bahwa kemerdekaan bangsa Indonesia hanya akan kokoh apabila para ulama dan santrinya berdaulat di bidang pendidikan sekaligus berdikari di bidang ekonomi.',
    barokahHajat:
      'Peziarah dan pelajar yang berziarah ke makam Pahlawan Nasional KH. Abdul Halim di Santi Asromo Majalengka umumnya bertawassul memohon semangat pengabdian bagi agama dan bangsa, keberkahan lembaga pendidikan yang dikelola, serta kerukunan dalam organisasi dan masyarakat.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Pahlawan Nasional KH. Abdul Halim Majalengka',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّيْخِ عَبْدِ الْحَلِيمِ مَاجَالِينْجْكَا مُؤَسِّسِ إِتِّحَادِ الْأُمَّةِ الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَصْلِحْ ذَاتَ بَيْنِنَا وَانْفَعْنَا بِعُلُومِهِ وَجِهَادِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّيْخِ عَبْدِ الْحَلِيمِ مَاجَالِينْجْكَا مُؤَسِّسِ إِتِّحَادِ الْأُمَّةِ الْإِسْلَامِيَّةِ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ أَصْلِحْ ذَاتَ بَيْنِنَا وَانْفَعْنَا بِعُلُومِهِ وَجِهَادِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahid Asy-Syaikh 'Abdil-Haliim Majalengka mu-assisi Ittihaadil-Ummatil-Islaamiyyah syai-un lillaahi lahumul-Faatihah. Allaahumma ashlih dzaata baininaa wanfa'naa bi 'uluumihii wa jihaadihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang KH. Abdul Halim Majalengka pendiri Persatuan Ummat Islam, Al-Fatihah. Ya Allah, damaikanlah hubungan di antara kami dan limpahkanlah kemanfaatan ilmu serta perjuangan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang KH. Abdul Halim Majalengka pendiri Persatuan Ummat Islam, Al-Fatihah. Ya Allah, damaikanlah hubungan di antara kami dan limpahkanlah kemanfaatan ilmu serta perjuangan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Mei (Peringatan Haul KH. Abdul Halim pada sekitar tanggal 7 Mei) & Peringatan Milad PUI (21 Desember) di Kompleks Pesantren Santi Asromo Majalengka.',
    localAdab:
      'Memasuki lingkungan Pondok Pesantren Santi Asromo dengan pakaian sopan menutup aurat, melapor kepada pengurus pesantren/penjaga maqbarah jika datang dalam rombongan besar, dan menjaga kebersihan kawasan pendidikan.',
    facilities: ['Masjid & Kampus Pesantren Santi Asromo', 'Kompleks Makam Pahlawan Nasional KH. Abdul Halim', 'Aula & Tempat Wudhu', 'Area Parkir Bus'],
    openingHours: '07:00 - 20:00 WIB',
    references: [
      'Noer, Deliar (1980). Gerakan Modern Islam di Indonesia 1900–1942. LP3ES.',
      'Wanta, S. (1991). KH. Abdul Halim dan Pergerakannya. PB PUI Majalengka.',
      'Keputusan Presiden Republik Indonesia Nomor 041/TK/Tahun 2008 tentang Penganugerahan Gelar Pahlawan Nasional kepada KH. Abdul Halim.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-maulana-hasanuddin',
    legacyId: 'auliya-2',
    name: 'Sultan Maulana Hasanuddin (Pangeran Sabakingkin)',
    title: 'Sultan Maulana Hasanuddin (Kasemen Banten Lama)',
    description:
      'Putra Kanjeng Sunan Gunung Jati dan Sultan pertama Kesultanan Banten (1552–1570 M) yang mengubah Banten menjadi bandar maritim Islam terbesar di ujung barat Pulau Jawa.',
    category: 'Auliya Nusantara',
    era: 'Era Kesultanan Banten (Memerintah 1552–1570 M)',
    province: 'Banten',
    city: 'Serang',
    district: 'Kec. Kasemen',
    address: 'Kompleks Masjid Agung Banten Lama, Desa Banten, Kec. Kasemen, Kota Serang',
    location: {
      lat: -6.0361,
      lng: 106.1541,
      address: 'Kompleks Masjid Agung Banten Lama, Desa Banten, Kec. Kasemen, Kota Serang',
      district: 'Kec. Kasemen',
      city: 'Serang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Agung Banten Lama (Kompleks Makam Sultan Maulana Hasanuddin)',
    sanad:
      'Putra Kanjeng Sunan Gunung Jati (Syarif Hidayatullah Cirebon) dari permaisuri Nyai Kawunganten (putri Prabu Surosowan); ayahanda dari Sultan Maulana Yusuf Banten dan Pangeran Jepara.',
    karya: [
      'Pendirian Kesultanan Banten (1552 M), Keraton Surosowan, dan Masjid Agung Banten Lama dengan menara mercusuar ikonik',
      'Perluasan syiar Islam dan jaringan perdagangan lada dari Banten hingga Lampung dan Bengkulu',
    ],
    history:
      'Sultan Maulana Hasanuddin yang lahir dengan nama Pangeran Sabakingkin adalah putra Kanjeng Sunan Gunung Jati (Syarif Hidayatullah) dari pernikahannya dengan Nyai Kawunganten, putri penguasa lokal Banten. Sejak usia muda sekitar tahun 1520-an, beliau mendampingi ayahandanya berdakwah secara damai kepada masyarakat Sunda di lereng Gunung Pulosari dan pesisir Banten Girang.\n\nSetelah berhasil mengislamkan para pucuk umum dan masyarakat pedalaman Banten serta menunaikan ibadah haji ke Makkah bersama Sunan Gunung Jati, Pangeran Sabakingkin memindahkan pusat pemerintahan dari pedalaman Banten Girang ke pesisir utara di Surosowan atas petunjuk sang ayah. Pada tahun 1552 M, beliau resmi dinobatkan sebagai Sultan pertama Kesultanan Banten dengan gelar Sultan Maulana Hasanuddin Panembahan Surosowan.\n\nDi bawah kepemimpinannya (1552–1570 M), Kesultanan Banten tumbuh pesat menjadi pelabuhan niaga internasional yang menghubungkan pedagang Nusantara, Gujarat, Arab, Persia, dan Tiongkok, serta memperluas dakwah Islam ke wilayah Lampung (Tulang Bawang dan Selebar). Beliau wafat pada tahun 1570 M dan dimakamkan di serambi utara Masjid Agung Banten Lama, Kecamatan Kasemen, Kota Serang.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Banten (Sejarah Banten / Babad Banten), dikisahkan bahwa ketika Maulana Hasanuddin berdakwah di lereng Gunung Pulosari, beliau beruzlah dan bermunajat selama bertahun-tahun hingga ketulusan ibadah dan kesantunan akhlaknya meluluhkan hati delapan ratus ajar (pendeta Sunda kuno) di bawah pimpinan Pucuk Umun untuk memeluk agama Islam.<!--more-->\n\n karena beliau wafat dan dimakamkan di samping Masjid Agung yang dibangunnya sendiri, masyarakat Banten menganugerahkan gelar kehormatan anumerta "Pangeran Suwargi" (Pangeran yang Bersemayam di Surga).',
    ],
    untoldStory:
      'Keputusan strategis Sultan Maulana Hasanuddin memindahkan ibu kota Banten dari pedalaman Banten Girang ke muara sungai di pesisir Surosowan berdasarkan wasiat Sunan Gunung Jati mengandung tata ruang geopolitik Islam yang brilian: memadukan Masjid Agung di sebelah barat alun-alun, Keraton Surosowan di selatan, dan Pelabuhan Karangantu di timur.<!--more-->\n\nHingga hari ini, Kompleks Masjid Agung Banten Lama dan maqbarah Sultan Maulana Hasanuddin menjadi pusat ziarah paling ramai di Provinsi Banten, yang menyatukan warisan arsitektur Jawa-Sunda, Islam Timur Tengah, dan pengaruh Eropa kuno pada menara masjidnya.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sultan Maulana Hasanuddin di Banten Lama lazimnya bertawassul memohon kepada Allah SWT agar dikaruniai kewibawaan dalam kepemimpinan, kelancaran rezeki usaha perniagaan, serta keberkahan keturunan yang teguh memegang agama.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Sultan Maulana Hasanuddin Banten',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْعَادِلِ وَالْوَلِيِّ الصَّالِحِ السُّلْطَانِ مَوْلَانَا حَسَنِ الدِّينِ بِنْ الشَّيْخِ الشَّرِيفِ هِدَايَةِ اللهِ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِبَرَكَتِهِ وَأَسْرَارِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْعَادِلِ وَالْوَلِيِّ الصَّالِحِ السُّلْطَانِ مَوْلَانَا حَسَنِ الدِّينِ بِنْ الشَّيْخِ الشَّرِيفِ هِدَايَةِ اللهِ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِبَرَكَتِهِ وَأَسْرَارِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-'Aadil wal-Waliyyish-Shaalih As-Sulthaan Maulaanaa Hasaniddiin bin Asy-Syaikh Asy-Syariif Hidaayatillaah Banten syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi barakatihii wa asraarihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan yang adil dan wali yang shalih Sultan Maulana Hasanuddin bin Syekh Syarif Hidayatullah Banten, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui keberkahan dan rahasia keshalihan beliau di dalam agama, dunia, dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan yang adil dan wali yang shalih Sultan Maulana Hasanuddin bin Syekh Syarif Hidayatullah Banten, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui keberkahan dan rahasia keshalihan beliau di dalam agama, dunia, dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram & Rabiul Awal (Tradisi Panjang Mulud di Kawasan Kesultanan Banten Lama Serang) serta jadwal haul yang ditetapkan Kenadziran Banten Lama.',
    localAdab:
      'Berpakaian sopan menutup aurat, menitipkan alas kaki di loker resmi sebelum melintasi pelataran marmer Masjid Agung Banten, menjaga kekhusyukan dzikir di serambi makam, dan menolak pungutan liar di luar kotak infaq resmi Kenadziran.',
    facilities: ['Masjid Agung Banten Lama', 'Menara Banten & Museum Kepurbakalaan', 'Plaza Peziarah Terpadu', 'Terminal Bus Wisata Ziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
      'Guillot, Claude (2008). Banten: Sejarah dan Peradaban Abad X–XVII. Kepustakaan Populer Gramedia.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Data Cagar Budaya Nasional Kawasan Banten Lama.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-maulana-yusuf',
    legacyId: 'auliya-18',
    name: 'Sultan Maulana Yusuf (Pangeran Pasareyan)',
    title: 'Sultan Maulana Yusuf (Pekalangan Kasemen Banten)',
    description:
      'Sultan kedua Kesultanan Banten (1570–1580 M) dan putra Sultan Maulana Hasanuddin yang memelopori pertanian sawah irigasi serta menuntaskan penyebaran Islam di Pakuan Pajajaran.',
    category: 'Auliya Nusantara',
    era: 'Era Kejayaan Awal Kesultanan Banten (Memerintah 1570–1580 M)',
    province: 'Banten',
    city: 'Serang',
    district: 'Kec. Kasemen',
    address: 'Kampung Pekalangan Gede, Desa Kasunyatan, Kec. Kasemen, Kota Serang',
    location: {
      lat: -6.0512,
      lng: 106.1614,
      address: 'Kampung Pekalangan Gede, Desa Kasunyatan, Kec. Kasemen, Kota Serang',
      district: 'Kec. Kasemen',
      city: 'Serang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikipedia Bahasa Indonesia / Wikimedia Commons — Khazanah Kesultanan Banten (Jalur Ziarah Makam Sultan Maulana Yusuf Kasemen)',
    sanad:
      'Putra Sultan Maulana Hasanuddin Banten dan Ratu Ayu Kirana (putri Sultan Trenggono Demak); cucu dari Kanjeng Sunan Gunung Jati dan Sultan Trenggono Demak.',
    karya: [
      'Slogan pembangunan peradaban Banten: "Gawe Kuta Baluwarti Bata Kalawan Kawis" (Membangun benteng kota dengan batu bata dan karang)',
      'Pembangunan Masjid Kuno Kasunyatan, sistem irigasi persawahan Banten, dan penyatuan wilayah Pakuan Pajajaran (1579 M)',
    ],
    history:
      'Sultan Maulana Yusuf adalah putra mahkota Sultan Maulana Hasanuddin dari permaisuri Ratu Ayu Kirana (putri Sultan Trenggono dari Kesultanan Demak), sehingga dalam dirinya mengalir darah keulamaan Sunan Gunung Jati sekaligus darah kepemimpinan Kesultanan Demak. Beliau naik tahta menggantikan ayahandanya sebagai Sultan Banten kedua pada tahun 1570 M.\n\nBerbeda dengan ayahnya yang menitikberatkan kekuatan perdagangan maritim, Sultan Maulana Yusuf menyeimbangkan ekonomi Banten dengan memelopori pembukaan lahan persawahan beririgasi teknis, pembangunan bendungan, serta memperkokoh benteng Keraton Surosowan dengan batu bata dan batu karang (*Gawe Kuta Baluwarti Bata Kalawan Kawis*). Beliau juga membangun Masjid Kasunyatan sebagai pusat pendidikan para ulama dan qadhi kesultanan.\n\nPada tahun 1579 M, di masa pemerintahan Sultan Maulana Yusuf, proses transisi kekuasaan dari Kerajaan Sunda Pakuan Pajajaran ke Kesultanan Banten tuntas secara permanen, di mana para bangsawan Pajajaran yang memeluk Islam dirangkul ke dalam struktur masyarakat Banten. Beliau wafat pada tahun 1580 M dan dimakamkan di Kampung Pekalangan Gede, Kasemen, Kota Serang, sehingga mendapat gelar anumerta Pangeran Pasareyan.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Banten (Babad Banten), dikisahkan bahwa Sultan Maulana Yusuf sangat memuliakan guru-guru ngajinya di Kasunyatan; setiap kali selesai memimpin sidang kerajaan di Surosowan, beliau berjalan kaki dengan penuh tawadhu menuju Masjid Kasunyatan untuk menyimak pengajian kitab bersama rakyat biasa.<!--more-->\n\nKetika beliau jatuh sakit menjelang wafatnya pada tahun 1580 M, riwayat sejarah Banten mencatat bahwa beliau berwasiat agar pusaranya ditempatkan di Pekalangan dekat jalur masyarakat petani yang beliau cintai, dan hingga kini makam beliau tidak pernah sepi dari lantunan tahlil para peziarah.',
    ],
    untoldStory:
      'Semboyan historis Sultan Maulana Yusuf yang berbunyi *"Gawe Kuta Baluwarti Bata Kalawan Kawis"* (Membangun kota berbenteng batu bata dan karang) diabadikan menjadi moto resmi pembangunan daerah di Banten karena mencerminkan etos kerja keras dan kemandirian infrastruktur.<!--more-->\n\nTidak jauh dari Kompleks Makam Sultan Maulana Yusuf di Pekalangan terdapat Masjid Kuno Kasunyatan beserta kolam pemandian bersejarah yang dibangun pada abad ke-16 sebagai tempat bersuci para santri dan ulama Kesultanan Banten.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Sultan Maulana Yusuf di Pekalangan Kasemen umumnya bertawassul memohon keberkahan hasil pertanian dan pembangunan, keteguhan dalam membangun rumah tangga atau lembaga, serta kemuliaan akhlak.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Sultan Maulana Yusuf Banten',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ السُّلْطَانِ مَوْلَانَا يُوسُفَ بِنْ السُّلْطَانِ مَوْلَانَا حَسَنِ الدِّينِ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي بُلْدَانِنَا وَأَرْزَاقِنَا بِبَرَكَتِهِ وَصَلَاحِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ السُّلْطَانِ مَوْلَانَا يُوسُفَ بِنْ السُّلْطَانِ مَوْلَانَا حَسَنِ الدِّينِ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بَارِكْ لَنَا فِي بُلْدَانِنَا وَأَرْزَاقِنَا بِبَرَكَتِهِ وَصَلَاحِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahid As-Sulthaan Maulaanaa Yuusuf bin As-Sulthaan Maulaanaa Hasaniddiin Banten syai-un lillaahi lahumul-Faatihah. Allaahumma baarik lanaa fii buldaaninaa wa arzaaqinaa bi barakatihii wa shalaahih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan pejuang Sultan Maulana Yusuf bin Sultan Maulana Hasanuddin Banten, Al-Fatihah. Ya Allah, berkahilah negeri dan rezeki kami dengan keberkahan serta keshalihan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan pejuang Sultan Maulana Yusuf bin Sultan Maulana Hasanuddin Banten, Al-Fatihah. Ya Allah, berkahilah negeri dan rezeki kami dengan keberkahan serta keshalihan beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh pengurus Kenadziran Makam Sultan Maulana Yusuf Pekalangan Kasemen (lazimnya beriringan dengan agenda ziarah Banten Lama).',
    localAdab:
      'Menjaga kesopanan pakaian muslim/muslimah, melepas alas kaki saat memasuki serambi cungkup makam Pekalangan, menjaga ketertiban antrean peziarah, dan menghormati warga sekitar.',
    facilities: ['Cungkup Makam Cagar Budaya Sultan Maulana Yusuf', 'Musholla & Tempat Wudhu', 'Dekat Masjid Kuno Kasunyatan', 'Area Parkir'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
      'Guillot, Claude (2008). Banten: Sejarah dan Peradaban Abad X–XVII. Kepustakaan Populer Gramedia.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Inventaris Situs Makam Sultan Maulana Yusuf & Masjid Kasunyatan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'sultan-ageng-tirtayasa',
    name: 'Sultan Ageng Tirtayasa (Sultan Abu al-Fath Abdul Fattah)',
    title: 'Sultan Ageng Tirtayasa (Pahlawan Nasional Banten)',
    description:
      'Sultan terbesar Kesultanan Banten (1651–1683 M) dan Pahlawan Nasional yang membawa Banten ke puncak kejayaan maritim, keilmuan Islam bersama Syekh Yusuf Al-Makassari, serta perlawanan gigih terhadap VOC.',
    category: 'Auliya Nusantara',
    era: 'Era Puncak Kejayaan Kesultanan Banten (1631 – 1692 M, Memerintah 1651–1683 M)',
    province: 'Banten',
    city: 'Serang',
    district: 'Kec. Kasemen',
    address: 'Kompleks Makam Masjid Agung Banten Lama, Desa Banten, Kec. Kasemen (serta Situs Keraton Tirtayasa, Kec. Tirtayasa), Serang',
    location: {
      lat: -5.9842,
      lng: 106.3185,
      address: 'Situs Keraton & Petilasan Sultan Ageng Tirtayasa, Desa Tirtayasa, Kec. Tirtayasa (serta Makam Masjid Agung Banten Lama), Serang',
      district: 'Kec. Tirtayasa',
      city: 'Serang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikimedia Commons — Kompleks Masjid Agung Banten Lama (Maqbarah Sultan Ageng Tirtayasa)',
    sanad:
      'Putra Sultan Abu al-Ma’ali Ahmad bin Sultan Abu al-Mafakhir Mahmud Abdul Qadir (cicit Sultan Maulana Yusuf Banten); murid sekaligus mertua dari waliyullah besar Syekh Yusuf Al-Makassari (Tuanta Salamaka).',
    karya: [
      'Pembangunan jaringan kanal irigasi raksasa sepanjang puluhan kilometer dari Sungai Ciujung hingga Pontang (asal gelar "Tirtayasa" / Pengelola Air)',
      'Modernisasi armada maritim dan diplomasi internasional Kesultanan Banten ke Inggris, Prancis, Denmark, Turki Utsmani, dan Makkah',
    ],
    history:
      'Sultan Ageng Tirtayasa yang bernama resmi Sultan Abu al-Fath Abdul Fattah lahir pada tahun 1631 M dan naik tahta sebagai Sultan Banten ke-6 pada tahun 1651 M menggantikan kakeknya, Sultan Abu al-Mafakhir Mahmud Abdul Qadir. Di bawah kepemimpinan beliau selama lebih dari tiga dekade, Kesultanan Banten mencapai puncak keemasan sebagai kekuatan maritim, pusat perdagangan bebas internasional, dan mercusuar keilmuan Islam di Asia Tenggara.\n\nDalam bidang keagamaan, Sultan Ageng Tirtayasa mengangkat ulama sufi dan pejuang besar asal Gowa, Syekh Yusuf Al-Makassari, sebagai Mufti Agung Kesultanan Banten sekaligus menantunya. Bersama Syekh Yusuf Al-Makassari, beliau mendidik para pangeran dan rakyat Banten dalam semangat jihad melawan monopoli kolonial VOC Belanda di Batavia, serta membangun kanal pertanian megah di wilayah Tirtayasa (Serang Utara) yang mampu mengairi ribuan hektar sawah sekaligus menjadi jalur transportasi kapal.\n\nAkibat politik adu domba (*devide et impera*) VOC yang memanfaatkan putranya, Sultan Haji, terjadi perang saudara hebat pada tahun 1682–1683 M. Sultan Ageng Tirtayasa memilih bergerilya di pedalaman sebelum akhirnya ditawan secara licik oleh Belanda di Batavia hingga wafat sebagai syahid bangsa pada tahun 1692 M. Jenazah beliau dipulangkan dengan penuh kehormatan dan dimakamkan di serambi utara Masjid Agung Banten Lama di samping leluhurnya, Sultan Maulana Hasanuddin. Pemerintah RI menganugerahkan gelar Pahlawan Nasional kepada beliau melalui SK Presiden Nomor 045/TK/Tahun 1970.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Banten, dikisahkan bahwa keteguhan hati Sultan Ageng Tirtayasa selama ditawan oleh VOC di Batavia tidak pernah goyah sedikit pun; beliau menghabiskan masa pengasingannya dengan puasa, shalat malam, dan mengkhatamkan Al-Qur’an sebagaimana amalan Tarekat Khalwatiyah yang diijazahkan oleh menantunya, Syekh Yusuf Al-Makassari.<!--more-->\n\nMasyarakat Tirtayasa di Kabupaten Serang juga mewarisi kisah turun-temurun tentang keberkahan saluran air ("Kali Sultan") yang digali atas titah beliau pada abad ke-17; aliran sungai buatan tersebut tetap menghidupi sawah dan tambak masyarakat pesisir Serang selama lebih dari tiga ratus tahun.',
    ],
    untoldStory:
      'Surat-menyurat diplomatik Sultan Ageng Tirtayasa dengan Raja Inggris Charles II dan Raja Denmark Christian V yang tersimpan di arsip Eropa membuktikan bahwa Kesultanan Banten pada abad ke-17 telah memiliki armada kapal laut modern yang dinakhodai pelaut Nusantara dan dilengkapi meriam buatan sendiri.<!--more-->\n\nNama besar beliau kini diabadikan menjadi nama perguruan tinggi negeri kebanggaan masyarakat Banten, Universitas Sultan Ageng Tirtayasa (Untirta), sebagai pengingat akan perpaduan antara ilmu pengetahuan teknologi pengairan (*Tirtayasa*) dan keberanian menjaga kedaulatan bangsa.',
    barokahHajat:
      'Peziarah yang berziarah ke makam dan situs perjuangan Sultan Ageng Tirtayasa lazimnya bertawassul memohon keberanian dalam membela kebenaran dan keadilan, kesuksesan studi di perguruan tinggi, serta keteguhan prinsip pemimpin agar tidak mudah diadu domba.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Pahlawan Nasional Sultan Ageng Tirtayasa',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ أَبِي الْفَتْحِ عَبْدِ الْفَتَّاحِ (سُلْطَانْ أَغِينْج تِيرْتَايَاسَا بَانْتِينْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْصُرِ الْإِسْلَامَ وَالْمُسْلِمِينَ وَاحْفَظْ بِلَادَنَا بِبَرَكَةِ جِهَادِهِ وَإِخْلَاصِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السُّلْطَانِ الْمُجَاهِدِ أَبِي الْفَتْحِ عَبْدِ الْفَتَّاحِ (سُلْطَانْ أَغِينْج تِيرْتَايَاسَا بَانْتِينْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْصُرِ الْإِسْلَامَ وَالْمُسْلِمِينَ وَاحْفَظْ بِلَادَنَا بِبَرَكَةِ جِهَادِهِ وَإِخْلَاصِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sulthaanil-Mujaahid Abil-Fath 'Abdil-Fattaah (Sulthaan Ageng Tirtayasa Banten) syai-un lillaahi lahumul-Faatihah. Allaahummanshuril-Islaama wal-muslimiina wahfazh bilaadanaa bi barakati jihaadihii wa ikhlaashih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan pejuang Sultan Abu al-Fath Abdul Fattah (Sultan Ageng Tirtayasa Banten), Al-Fatihah. Ya Allah, tolonglah Islam dan kaum muslimin serta lindungilah negeri kami dengan keberkahan perjuangan dan keikhlasan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh sultan pejuang Sultan Abu al-Fath Abdul Fattah (Sultan Ageng Tirtayasa Banten), Al-Fatihah. Ya Allah, tolonglah Islam dan kaum muslimin serta lindungilah negeri kami dengan keberkahan perjuangan dan keikhlasan beliau.',
      },
    ],
    haulSchedule:
      'Bulan Agustus & November (Peringatan Hari Pahlawan & Haul Sultan Ageng Tirtayasa di Kompleks Banten Lama serta Situs Keraton Tirtayasa Serang).',
    localAdab:
      'Menjaga adab kesopanan saat berziarah di Kompleks Makam Masjid Agung Banten Lama maupun di Situs Tirtayasa, berpakaian menutup aurat, dan merenungi nilai patriotisme perjuangan beliau.',
    facilities: ['Kompleks Makam Masjid Agung Banten Lama', 'Situs Keraton Tirtayasa Serang', 'Musholla & Tempat Wudhu', 'Area Parkir'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Tjandrasasmita, Uka (1967). Sultan Ageng Tirtayasa: Musuh Besar Kompeni Belanda. Yayasan Kebudayaan Nusalarang.',
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
      'Keputusan Presiden RI Nomor 045/TK/Tahun 1970 tentang Pahlawan Nasional Sultan Ageng Tirtayasa.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-maulana-mansyur-cikaduen',
    name: 'Syekh Maulana Mansyuruddin (Sultan Haji / Wali Cikadueun)',
    title: 'Syekh Maulana Mansyuruddin (Cikadueun Pandeglang)',
    description:
      'Waliyullah penyebar Islam di Banten Selatan (Pandeglang) dan putra Sultan Ageng Tirtayasa yang menempuh jalan taubat, uzlah, serta dakwah penuh kasih sayang di Cikadueun.',
    category: 'Auliya Nusantara',
    era: 'Era Kesultanan Banten (Abad ke-17 M, Wafat sekitar 1687 M)',
    province: 'Banten',
    city: 'Pandeglang',
    district: 'Kec. Cipeucang',
    address: 'Desa Cikadueun, Kec. Cipeucang, Kabupaten Pandeglang',
    location: {
      lat: -6.3754,
      lng: 106.0382,
      address: 'Desa Cikadueun, Kec. Cipeucang, Kabupaten Pandeglang',
      district: 'Kec. Cipeucang',
      city: 'Pandeglang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Kesultanan Banten (Jalur Ziarah Syekh Maulana Mansyuruddin Cikadueun Pandeglang)',
    sanad:
      'Putra Sultan Ageng Tirtayasa (Kesultanan Banten); menunaikan ibadah haji dan menuntut ilmu di Makkah serta Madinah pada tahun 1674–1676 M.',
    karya: [
      'Perintisan pusat dakwah, masjid, dan pesantren masyarakat di kawasan Cikadueun, kaki Gunung Karang dan Gunung Pulosari, Pandeglang',
      'Penyebaran tradisi dzikir dan pengajaran fikih masyarakat pedalaman Banten Selatan',
    ],
    history:
      'Syekh Maulana Mansyuruddin, yang sangat dimuliakan oleh masyarakat Pandeglang dan Banten Selatan dengan sebutan Wali Cikadueun, adalah sosok ulama bangsawan Kesultanan Banten pada abad ke-17 M. Dalam tradisi sejarah lokal Banten, beliau diidentifikasikan sebagai putra Sultan Ageng Tirtayasa yang telah menunaikan ibadah haji ke Tanah Suci Makkah pada tahun 1674 M dan bermukim selama dua tahun untuk mempelajari ilmu agama serta tasawuf.\n\nDalam babak sejarah yang penuh hikmah, setelah melewati kemelut politik di istana Surosowan, Maulana Mansyuruddin memilih meninggalkan hiruk-pikuk kekuasaan duniawi dan menempuh jalan riyadhoh, uzlah, serta dakwah di pedalaman Banten Selatan, tepatnya di kawasan hutan Cikadueun di antara kaki Gunung Karang dan Gunung Pulosari, Kabupaten Pandeglang.\n\nDi Cikadueun, beliau membuka pemukiman santri, membangun masjid, dan membimbing masyarakat pedalaman Pandeglang serta Lebak dalam menjalankan syariat Islam dan bercocok tanam. Ketulusan pengabdian beliau menjadikan Cikadueun tumbuh sebagai salah satu poros pesantren tertua di Pandeglang. Makam beliau di Desa Cikadueun, Kecamatan Cipeucang, Kabupaten Pandeglang menjadi titik ziarah utama yang selalu dikunjungi dalam satu rangkaian dengan Banten Lama dan Caringin.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Pandeglang (Babad Cikadueun), dikisahkan berbagai karomah Syekh Maulana Mansyuruddin saat berdakwah di hutan belantara Banten Selatan; dengan izin Allah SWT, beliau mampu menundukkan keganasan alam dan mengislamkan para tokoh sakti pedalaman melalui keteduhan dzikir tanpa kekerasan.<!--more-->\n\nDi dekat area kompleks maqbarah Cikadueun terdapat batu petilasan ("Batu Qur’an" di Cibulakan) dan mata air jernih yang dalam cerita tutur warga setempat berkaitan erat dengan perjalanan riyadhoh dan pengajaran Al-Qur’an Syekh Maulana Mansyuruddin.',
    ],
    untoldStory:
      'Kisah hidup Syekh Maulana Mansyuruddin di Cikadueun memberikan pelajaran spiritual yang sangat dalam bagi masyarakat Banten: bahwa kemuliaan seseorang di sisi Allah SWT dan di hati umat tidak diukur dari mahkota istana, melainkan dari kesungguhan bertaubat, kerendahan hati menanggalkan jabatan, dan keikhlasan mengajar umat di pelosok desa.<!--more-->\n\nDari lingkungan dakwah Cikadueun dan lereng Gunung Karang inilah kelak lahir ratusan pondok pesantren salafiyah yang menjadikan Kabupaten Pandeglang dijuluki sebagai "Kota Sejuta Santri, Seribu Ulama".',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Maulana Mansyuruddin Cikadueun umumnya bertawassul memohon ampunan dan diterimanya taubat nasuha, ketenangan batin dari ambisi duniawi yang melelahkan, serta keberkahan ilmu bagi putra-putri yang mondok di Pandeglang.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Maulana Mansyuruddin Cikadueun',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ مَوْلَانَا مَنْصُورِ الدِّينِ شِيكَادُوئِينْ فَانْدِيغْلَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا تَوْبَةً نَصُوحًا وَانْفَعْنَا بِبَرَكَتِهِ وَأَسْرَارِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ مَوْلَانَا مَنْصُورِ الدِّينِ شِيكَادُوئِينْ فَانْدِيغْلَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا تَوْبَةً نَصُوحًا وَانْفَعْنَا بِبَرَكَتِهِ وَأَسْرَارِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Asy-Syaikh Maulaanaa Manshuuriddiin Cikadueun Pandeglang syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa taubatan nashuuhan wanfa'naa bi barakatihii wa asraarih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Maulana Mansyuruddin Cikadueun Pandeglang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami taubat yang tulus dan limpahkanlah kemanfaatan melalui keberkahan serta rahasia keshalihan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih Syekh Maulana Mansyuruddin Cikadueun Pandeglang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami taubat yang tulus dan limpahkanlah kemanfaatan melalui keberkahan serta rahasia keshalihan beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul ditetapkan setiap tahun oleh pengurus Kenadziran/Yayasan Makam Syekh Maulana Mansyuruddin Cikadueun Pandeglang (ramai dikunjungi pada bulan Rabiul Awal dan Sya’ban).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki saat memasuki serambi masjid dan cungkup makam Cikadueun, menjaga ketertiban antrean, serta tidak melakukan hal-hal yang menyimpang dari adab ziarah.',
    facilities: ['Masjid Jami’ & Cungkup Makam Cikadueun', 'Tempat Wudhu & Toilet', 'Kios Oleh-Oleh Khas Pandeglang', 'Terminal Parkir Bus Ziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
      'Dinas Pariwisata dan Kebudayaan Kabupaten Pandeglang — Inventaris Situs Ziarah Makam Syekh Maulana Mansyuruddin Cikadueun.',
      'Hakim, Lukman (2006). Banten dalam Pergumulan Sejarah: Sultan, Ulama, Jawara. Desantara.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-asnawi-caringin',
    legacyId: 'ulama-7',
    name: 'Syekh KH. Tubagus Muhammad Asnawi (Syekh Asnawi Caringin)',
    title: 'Syekh Asnawi Caringin (Labuan Pandeglang)',
    description:
      'Ulama besar mursyid Tarekat Qadiriyah wa Naqsyabandiyah di pesisir barat Banten, murid Syekh Nawawi Al-Bantani dan Syekh Abdul Karim Tanara, serta tokoh penggerak perjuangan rakyat Banten 1926.',
    category: 'Ulama Nusantara',
    era: 'Era Ulama Pejuang & Jaringan Haramain (1850 – 1937 M)',
    province: 'Banten',
    city: 'Pandeglang',
    district: 'Kec. Labuan',
    address: 'Kompleks Masjid Agung As-Salafiyah, Desa Caringin, Kec. Labuan, Kabupaten Pandeglang',
    location: {
      lat: -6.3642,
      lng: 105.8265,
      address: 'Kompleks Masjid Agung As-Salafiyah, Desa Caringin, Kec. Labuan, Kabupaten Pandeglang',
      district: 'Kec. Labuan',
      city: 'Pandeglang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Ulama Banten (Kawasan Ziarah Syekh Asnawi Caringin Labuan Pandeglang)',
    sanad:
      'Putra KH. Tubagus Abdurrahman (Kadhi Caringin, keturunan Sultan Ageng Tirtayasa Banten); murid utama Syekh Nawawi Al-Bantani dan Mursyid Agung Tarekat Qadiriyah wa Naqsyabandiyah Syekh Abdul Karim Al-Bantani di Makkah; kakek dari KH. Tubagus Achmad Chatib Al-Bantani (Residen Banten).',
    karya: [
      'Pendirian Masjid Agung As-Salafiyah Caringin (pasca-letusan Krakatau 1883 M) dan pesantren pusat Tarekat Qadiriyah wa Naqsyabandiyah di Banten Barat',
      'Kaderisasi ulama pejuang anti-kolonial di Pandeglang, Serang, dan Lebak pada awal abad ke-20',
    ],
    history:
      'Syekh KH. Tubagus Muhammad Asnawi lahir di Kampung Caringin, Labuan, Pandeglang sekitar tahun 1850 M dari pasangan KH. Tubagus Abdurrahman dan Ratu Siti Syamsiyah, yang nasabnya bersambung kepada Sultan Ageng Tirtayasa. Sejak usia sembilan tahun beliau telah hafal Al-Qur’an di bawah bimbingan ayahnya, sebelum diberangkatkan ke Tanah Suci Makkah pada usia belasan tahun untuk menuntut ilmu di Masjidil Haram.\n\nDi Makkah, Tubagus Muhammad Asnawi berguru langsung kepada dua ulama besar asal Banten yang menjadi rujukan dunia Islam: Sayyidul Ulama al-Hijaz Syekh Nawawi Al-Bantani dalam bidang tafsir, fikih, dan tauhid, serta Syekh Abdul Karim Tanara Al-Bantani (khalifah utama Syekh Ahmad Khatib As-Sambasi) yang membaiat dan mengangkat beliau sebagai mursyid Tarekat Qadiriyah wa Naqsyabandiyah.\n\nSekembalinya ke tanah air pasca-bencana dahsyat letusan Gunung Krakatau tahun 1883 yang menghancurkan pesisir Caringin, Syekh Asnawi membangun kembali Masjid Agung As-Salafiyah Caringin dan menghidupkan semangat keagamaan serta harga diri masyarakat Banten. Karena pengaruh kharismatiknya yang menggerakkan perlawanan rakyat Banten terhadap penindasan kolonial Belanda pada tahun 1926, pemerintah Hindia Belanda menangkap dan mengasingkan beliau ke Cianjur dan Batavia. Syekh Asnawi Caringin wafat pada tahun 1937 M dan dimakamkan di kompleks Masjid Agung Caringin, Labuan, Pandeglang.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian sejarah masyarakat Banten Barat, Syekh Asnawi Caringin dikenal memiliki kewibawaan ruhani (haibah) dan keberanian yang menggetarkan pemerintah kolonial; bahkan di tempat pengasingannya di Cianjur, rumah tahanan beliau justru berubah menjadi majelis ilmu yang didatangi ribuan santri dan kiai Jawa Barat.<!--more-->\n\nMasjid Agung As-Salafiyah Caringin yang dibangun oleh beliau bersama para santrinya di tepi Selat Sunda tetap berdiri kokoh melewati berbagai guncangan gempa dan gelombang pasang selama lebih dari satu abad sebagai saksi keikhlasan munajat sang waliyullah.',
    ],
    untoldStory:
      'Sejarawan Sartono Kartodirdjo dan Martin van Bruinessen mencatat bahwa jaringan Tarekat Qadiriyah wa Naqsyabandiyah yang dipimpin oleh Syekh Asnawi Caringin merupakan organisasi sosial-keagamaan paling rapi di Banten pada awal abad ke-20 yang menyatukan ulama, petani, dan jawara dalam satu barisan antikolonial.<!--more-->\n\nDari rahim keluarga dan pesantren Syekh Asnawi Caringin lahir para pemimpin besar Republik Indonesia di Provinsi Banten, termasuk cucu beliau KH. Tubagus Achmad Chatib Al-Bantani yang menjabat sebagai Residen Banten pertama pasca-Proklamasi Kemerdekaan 1945.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Syekh Asnawi Caringin di tepi pantai Labuan umumnya bertawassul memohon keteguhan dzikir dan istiqamah ibadah, perlindungan keselamatan dari musibah bencana alam, serta keberanian hati dalam memperjuangkan kebaikan umat.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh KH. Tubagus Muhammad Asnawi Caringin',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَالْمُجَاهِدِ فِي سَبِيلِهِ الشَّيْخِ تُوبَاغُوسْ مُحَمَّدْ أَسْنَاوِي شَارِينْغِينْ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى ذِكْرِكَ وَانْفَعْنَا بِكَرَامَتِهِ وَعُلُومِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَالْمُجَاهِدِ فِي سَبِيلِهِ الشَّيْخِ تُوبَاغُوسْ مُحَمَّدْ أَسْنَاوِي شَارِينْغِينْ بَانْتِينْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى ذِكْرِكَ وَانْفَعْنَا بِكَرَامَتِهِ وَعُلُومِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aarifi billaah wal-Mujaahidi fii sabiilih Asy-Syaikh Tuubaaguus Muhammad Asnawii Caringin Banten syai-un lillaahi lahumul-Faatihah. Allaahumma tsabbit quluubanaa 'alaa dzikrika wanfa'naa bi karaamatihii wa 'uluumih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah dan pejuang di jalan-Nya Syekh KH. Tubagus Muhammad Asnawi Caringin Banten, Al-Fatihah. Ya Allah, teguhkanlah hati kami dalam berdzikir kepada-Mu dan limpahkanlah kemanfaatan melalui kemuliaan serta ilmu beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah dan pejuang di jalan-Nya Syekh KH. Tubagus Muhammad Asnawi Caringin Banten, Al-Fatihah. Ya Allah, teguhkanlah hati kami dalam berdzikir kepada-Mu dan limpahkanlah kemanfaatan melalui kemuliaan serta ilmu beliau.',
      },
    ],
    haulSchedule:
      'Waktu pelaksanaan haul akbar ditetapkan setiap tahun oleh keluarga besar dzurriyah dan Yayasan Syekh Asnawi Caringin di Kompleks Masjid Agung As-Salafiyah Caringin Labuan Pandeglang.',
    localAdab:
      'Berpakaian sopan menutup aurat, melaksanakan shalat tahiyatul masjid di Masjid Agung Kuno As-Salafiyah Caringin, menjaga ketenangan dzikir di dalam kubah maqbarah, dan menjaga kebersihan kawasan pesisir Caringin.',
    facilities: ['Masjid Agung Cagar Budaya As-Salafiyah Caringin', 'Kubah Maqbarah Syekh Asnawi Caringin', 'Tempat Wudhu & Toilet', 'Area Parkir Bus Luas'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Mizan.',
      'Williams, Michael C. (1990). Communism, Religion, and Revolt in Banten. Ohio University Center for International Studies.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Data Situs Masjid dan Makam Syekh Asnawi Caringin.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'syekh-nawawi-al-bantani',
    legacyId: 'ulama-6',
    name: 'Syekh Muhammad Nawawi bin Umar Al-Jawi Al-Bantani',
    title: 'Syekh Nawawi Al-Bantani (Sayyidul Ulama Al-Hijaz - Tanara Serang)',
    description:
      'Mahaguru seluruh ulama pesantren Nusantara abad ke-19 di Makkah, bergelar Sayyidul Ulama Al-Hijaz dan pengarang lebih dari 100 kitab rujukan dunia Islam.',
    category: 'Ulama Nusantara',
    era: 'Era Jaringan Ulama Haramain-Nusantara (1230–1314 H / 1813–1897 M)',
    province: 'Banten',
    city: 'Serang',
    district: 'Kec. Tanara',
    address: 'Pondok Pesantren An-Nawawi & Situs Petilasan Tanara, Desa Pedaleman, Kec. Tanara, Kabupaten Serang',
    location: {
      lat: -6.0175,
      lng: 106.3822,
      address: 'Pondok Pesantren An-Nawawi & Situs Petilasan Tanara, Desa Pedaleman, Kec. Tanara, Kabupaten Serang',
      district: 'Kec. Tanara',
      city: 'Serang',
      province: 'Banten',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Great_Mosque_of_Banten.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Keilmuan Banten (Situs Kelahiran & Pesantren Syekh Nawawi Al-Bantani di Tanara Serang)',
    sanad:
      'Putra KH. Umar bin Arabi (Penghulu Tanara, keturunan Maulana Hasanuddin Banten); murid Syekh Ahmad Khatib As-Sambasi, Syekh Ahmad Zaini Dahlan, dan Syekh Abdul Hamid Ad-Daghistani di Makkah; mahaguru dari Syaikhona Kholil Bangkalan, KH. Hasyim Asy’ari, KH. Ahmad Dahlan, Syekh Asnawi Caringin, dan Mama Sempur.',
    karya: [
      'Tafsir Marah Labid (At-Tafsir Al-Munir li Ma’alim At-Tanzil) — Tafsir Al-Qur’an 30 Juz berbahasa Arab yang dicetak di Kairo dan Makkah',
      'Lebih dari 100 kitab standar pesantren dunia: Nashaihul Ibad, Nihayatuz Zain, Kasyifatus Saja, القطر الغيث (Qami’uth Thughyan), Uqudul Lujjain, dan Nuruz Zhalam',
    ],
    history:
      'Syekh Abu Abdul Mu’thi Muhammad Nawawi bin Umar Al-Tanari Al-Bantani Al-Jawi lahir di Kampung Tanara, Serang, Banten pada tahun 1230 H (1813 M). Setelah mempelajari ilmu dasar agama dari ayahnya KH. Umar bin Arabi serta berguru kepada Kyai Sahal Banten dan Kyai Yusuf Purwakarta, beliau berangkat ke Makkah pada usia 15 tahun dan memilih bermukim di Tanah Suci untuk menuntut ilmu sekaligus mengajar di serambi Masjidil Haram.\n\nKedalaman ilmu Syekh Nawawi Al-Bantani dalam bidang tafsir, fikih Syafi’iyah, ushuluddin, tasawuf, dan gramatika Arab diakui oleh para ulama Timur Tengah, terutama setelah beliau menerbitkan *Tafsir Marah Labid* di Kairo (Mesir) yang membuat para ulama Al-Azhar menganugerahkan gelar kehormatan *Sayyidul Ulama Al-Hijaz* (Pemimpin Ulama Hijaz) kepada beliau. Hampir seluruh tokoh pendiri organisasi Islam dan pesantren besar di Indonesia pada abad ke-20—mulai dari KH. Hasyim Asy’ari (NU), KH. Ahmad Dahlan (Muhammadiyah), hingga KH. Abdul Halim (PUI)—bersambung sanad keilmuannya kepada beliau.\n\nSyekh Nawawi Al-Bantani wafat di Syi’ib Ali, Makkah pada tanggal 25 Syawal 1314 H (1897 M) dan dimakamkan di Pemakaman Ma’la Makkah berdekatan dengan makam Siti Khadijah RA. Di tanah kelahirannya di Desa Tanara, Kabupaten Serang, berdiri Masjid Jami’ peninggalan ayahandanya, situs petilasan keluarga, dan Pondok Pesantren An-Nawawi Tanara yang setiap tahun menjadi pusat Haul Akbar Nasional untuk mengenang warisan keilmuan beliau.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian murid-murid beliau di Makkah maupun Nusantara, dikisahkan bahwa Syekh Nawawi Al-Bantani memiliki keberkahan waktu dan cahaya ilmu yang luar biasa; di tengah kesibukannya mengajar ratusan murid dari berbagai penjuru dunia di Masjidil Haram dengan hidup yang sangat sederhana, beliau mampu menulis lebih dari seratus kitab tebal hanya dengan penerangan lampu minyak.<!--more-->\n\nDiriwayatkan pula dalam literatur pesantren bahwa ketika masa sewa makam di Pemakaman Ma’la Makkah hendak digilir oleh petugas setempat beberapa tahun setelah wafatnya, jasad Syekh Nawawi Al-Bantani ditemukan masih utuh sempurna beserta kain kafannya, sehingga pemerintah setempat membiarkan pusara beliau tetap utuh.',
    ],
    untoldStory:
      'Meskipun Syekh Nawawi Al-Bantani menghabiskan sebagian besar usianya di Makkah, orientasi perjuangan beliau tidak pernah lepas dari tanah airnya di Nusantara. Snouck Hurgronje yang meneliti komunitas Jawi di Makkah pada tahun 1885 mencatat bagaimana Syekh Nawawi dengan tegas menolak segala bentuk kerja sama dengan pemerintah kolonial Hindia Belanda.<!--more-->\n\nSitus Tanara di tepi Sungai Cidurian, Kabupaten Serang kini tidak hanya menjadi monumen sejarah masa kecil sang Imam Nawawi kedua (An-Nawawi Ats-Tsani), tetapi juga pusat pengkajian kitab *Tafsir Al-Munir* dan *Nihayatuz Zain* yang menghidupkan kembali tradisi penulisan kitab berbahasa Arab di kalangan santri Indonesia.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang mengunjungi Situs Tanara Serang (maupun berziarah ke Ma’la Makkah) lazimnya bertawassul memohon kepada Allah SWT agar dianugerahi ilmu yang bermanfaat luas sepanjang zaman, kemudahan memahami kitab-kitab turats, serta keikhlasan hati dalam berkarya.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh Muhammad Nawawi Al-Bantani (Sayyidul Ulama Al-Hijaz)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِ عُلَمَاءِ الْحِجَازِ الشَّيْخِ أَبِي عَبْدِ الْمُعْطِي مُحَمَّدٍ نَوَوِي بْنِ عُمَرَ الْجَاوِي الْبَنْتَنِي التَّنَارِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ سَيِّدِ عُلَمَاءِ الْحِجَازِ الشَّيْخِ أَبِي عَبْدِ الْمُعْطِي مُحَمَّدٍ نَوَوِي بْنِ عُمَرَ الْجَاوِي الْبَنْتَنِي التَّنَارِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ وَأَسْرَارِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Sayyidi 'Ulamaa-il-Hijaaz Asy-Syaikh Abii 'Abdil-Mu'thii Muhammad Nawawii bin 'Umar Al-Jaawii Al-Bantanii At-Tanaarii syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi 'uluumihii wa mushannafaatihii wa asraarihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Pemimpin Ulama Hijaz Syekh Abu Abdul Mu’thi Muhammad Nawawi bin Umar Al-Jawi Al-Bantani At-Tanari, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan ilmu, karya kitab, dan rahasia keshalihan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Pemimpin Ulama Hijaz Syekh Abu Abdul Mu’thi Muhammad Nawawi bin Umar Al-Jawi Al-Bantani At-Tanari, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan ilmu, karya kitab, dan rahasia keshalihan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '25 Syawal (Haul Akbar Nasional Syekh Nawawi Al-Bantani di Kompleks Pondok Pesantren An-Nawawi & Masjid Jami’ Tanara, Kabupaten Serang).',
    localAdab:
      'Mengenakan pakaian muslim yang rapi dan menutup aurat saat mengunjungi Situs Masjid Kuno dan Makam Keluarga KH. Umar di Tanara, menjaga ketertiban di lingkungan pesantren, dan memperbanyak membaca shalawat serta kajian kitab beliau.',
    facilities: ['Masjid Jami’ Kuno Tanara', 'Makam KH. Umar bin Arabi (Ayahanda Syekh Nawawi)', 'Kampus Pesantren An-Nawawi Tanara', 'Area Parkir Bus'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Snouck Hurgronje, C. (1931). Mekka in the Latter Part of the 19th Century. Brill.',
      'Chaidar (1978). Sejarah Pujangga Islam Syech Nawawi Al-Banteni Indonesia. Sarana Utama.',
      'Bruinessen, Martin van (1995). Kitab Kuning, Pesantren dan Tarekat. Mizan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-husein-luar-batang',
    legacyId: 'habib-2',
    name: 'Al-Habib Husein bin Abubakar Alaydrus (Kramat Luar Batang)',
    title: 'Habib Husein bin Abubakar Alaydrus (Luar Batang Jakarta Utara)',
    description:
      'Waliyullah Quthb asal Hadramaut yang berdakwah di pelabuhan Sunda Kelapa pada abad ke-18 dan menjadi cahaya spiritual pesisir utara Jakarta.',
    category: 'Habaib',
    era: 'Era Batavia Kolonial (Wafat Kamis, 17 Ramadhan 1169 H / 24 Juni 1756 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Utara',
    district: 'Kec. Penjaringan',
    address: 'Kompleks Masjid Jami’ Keramat Luar Batang, Jl. Luar Batang V, Kel. Penjaringan, Kec. Penjaringan',
    location: {
      lat: -6.1238,
      lng: 106.8095,
      address: 'Kompleks Masjid Jami’ Keramat Luar Batang, Jl. Luar Batang V, Kel. Penjaringan, Kec. Penjaringan',
      district: 'Kec. Penjaringan',
      city: 'Jakarta Utara',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikipedia Bahasa Indonesia / Wikimedia Commons — Masjid Jami’ Keramat Luar Batang (Makam Habib Husein bin Abubakar Alaydrus)',
    sanad:
      'Dzurriyah Rasulullah SAW dari marga Alaydrus asal Migrab, dekat Hazm, Hadramaut (Yaman); menuntut ilmu di Hadramaut, India (Surat), sebelum berlabuh di Pelabuhan Sunda Kelapa Batavia sekitar tahun 1736 M; guru dari Abdul Kadir (Haji Abdul Kadir keturunan Tionghoa).',
    karya: [
      'Pendirian surau/zawiyah dakwah di kawasan pesisir Luar Batang (1739 M) yang kini menjadi Masjid Jami’ Keramat Luar Batang',
      'Pembinaan komunitas muslim maritim dan perlindungan kemanusiaan di pelabuhan Batavia abad ke-18',
    ],
    history:
      'Al-Habib Husein bin Abubakar bin Abdillah Alaydrus lahir di Migrab, dekat Hazm, Hadramaut (Yaman) pada awal abad ke-18 M dari keluarga ulama sufi keturunan Rasulullah SAW. Setelah riyadhoh dan menuntut ilmu di tanah kelahirannya serta singgah berdakwah di Gujarat (India), beliau berlayar menuju kepulauan Nusantara dan mendarat di Pelabuhan Sunda Kelapa (Batavia) sekitar tahun 1736 M dalam usia muda yang penuh wibawa keilmuan.\n\nDi kawasan pesisir utara Batavia yang kala itu diawasi ketat oleh pemerintah kolonial VOC, Habib Husein bin Abubakar Alaydrus membuka sebuah surau tempat ibadah dan pengajaran Islam di daratan baru di luar pos pemeriksaan kapal (*Luar Batang*), yang kini dikenal sebagai Kampung Luar Batang, Penjaringan, Jakarta Utara. Kemuliaan akhlak, kedermawanan, dan kedalaman tasawuf beliau menarik simpati penduduk pribumi, pedagang Arab, hingga masyarakat keturunan Tionghoa seperti Haji Abdul Kadir yang memeluk Islam dan menjadi murid setianya.\n\nHabib Husein bin Abubakar Alaydrus wafat dalam usia yang relatif muda (sekitar 30-an tahun) pada hari Kamis, 17 Ramadhan 1169 H (24 Juni 1756 M). Beliau dimakamkan berdampingan dengan murid setianya, Haji Abdul Kadir, di dalam ruang utama Masjid Jami’ Keramat Luar Batang yang ditetapkan sebagai bangunan Cagar Budaya DKI Jakarta.',
    karomah: [
      'Dalam riwayat manaqib yang ditulis oleh Mufti Betawi Habib Utsman bin Yahya serta tradisi tutur masyarakat Jakarta, dikisahkan bahwa ketika Habib Husein dan para muridnya ditahan di penjara VOC karena kecurigaan penguasa Belanda terhadap banyaknya warga yang datang mengaji, setiap malam para sipir melihat Habib Husein justru sedang mengimami shalat berjamaah dengan tenang di halaman luar penjara sementara pintu sel tetap terkunci rapat.<!--more-->\n\nSelain itu, pada saat beliau wafat tanggal 17 Ramadhan 1169 H dan pemerintah kolonial memerintahkan agar jenazah beliau dimakamkan di pemakaman umum Tanah Abang, keranda jenazah beliau menurut riwayat tutur masyarakat terasa sangat berat dan bergerak kembali ke arah surau kediamannya di Luar Batang hingga akhirnya VOC mengizinkan beliau dimakamkan di tempat tersebut.',
    ],
    untoldStory:
      'Di dalam cungkup keramat Masjid Luar Batang, tepat di sebelah pusara Habib Husein bin Abubakar Alaydrus, terdapat makam seorang Tionghoa muslim bernama Haji Abdul Kadir (Lie Khoon Seng). Penempatan makam sang murid Tionghoa berdampingan langsung dengan sang Habib adalah wasiat Habib Husein sendiri semasa hidup.<!--more-->\n\nFakta sejarah ini menjadi bukti abadi tentang persaudaraan Islam yang melampaui sekat etnis di pesisir Jakarta sejak abad ke-18, di mana seorang dzurriyah Nabi SAW memuliakan muridnya semata-mata karena ketakwaan dan kesetiaannya dalam membela dakwah.',
    barokahHajat:
      'Peziarah yang berziarah ke Keramat Luar Batang umumnya bertawassul memohon keberkahan istiqamah dalam ibadah dan dakwah, keselamatan dari kezaliman dan fitnah, serta kelancaran rezeki bagi para pedagang dan pekerja di ibu kota.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Al-Habib Husein bin Abubakar Alaydrus Luar Batang',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الْحَبِيبِ حُسَيْنِ بْنِ أَبِي بَكْرٍ الْعَيْدَرُوسْ صَاحِبِ لُوَارْ بَاتَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ وَأَنْوَارِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الرَّبَّانِيِّ وَالْعَارِفِ الصَّمَدَانِيِّ الْحَبِيبِ حُسَيْنِ بْنِ أَبِي بَكْرٍ الْعَيْدَرُوسْ صَاحِبِ لُوَارْ بَاتَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ وَأَنْوَارِهِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbir-Rabbaanii wal-'Aarifish-Shamadaanii Al-Habiib Husain bin Abii Bakrin Al-'Aidaruus shaahibi Luar Batang syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi karaamatihii wa asraarihii wa anwaarihii fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah quthb rabbani Al-Habib Husein bin Abubakar Alaydrus Luar Batang, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan, rahasia ketakwaan, dan cahaya ilmu beliau di dalam agama, dunia, dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah quthb rabbani Al-Habib Husein bin Abubakar Alaydrus Luar Batang, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan, rahasia ketakwaan, dan cahaya ilmu beliau di dalam agama, dunia, dan akhirat.',
      },
    ],
    haulSchedule:
      'Ahad terakhir bulan Syawal / Dzulqa’dah (Haul Akbar Nasional Al-Habib Husein bin Abubakar Alaydrus di Masjid Jami’ Keramat Luar Batang Jakarta Utara) serta peringatan wafat setiap 17 Ramadhan.',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, memisahkan pintu masuk ruang maqbarah jamaah pria dan wanita secara tertib, tidak berdesak-desakan mencium nisan, serta menjaga ketenangan shalat di Masjid Jami’ Luar Batang.',
    facilities: ['Masjid Jami’ Keramat Luar Batang', 'Ruang Maqbarah Terpisah Pria & Wanita', 'Tempat Wudhu & Toilet Bersih', 'Area Parkir Peziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Heuken, Adolf (2003). Mesjid-mesjid Tua di Jakarta. Yayasan Cipta Loka Caraka.',
      'Al-Aydrus, M. Hasyim Assagaf (1998). Sejarah dan Manaqib Al-Habib Husein bin Abubakar Alaydrus Luar Batang. Mutawalli Luar Batang.',
      'Dinas Kebudayaan Provinsi DKI Jakarta — Inventaris Bangunan Cagar Budaya Masjid Jami’ Keramat Luar Batang.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mbah-priok',
    legacyId: 'habib-3',
    name: 'Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok)',
    title: 'Habib Hasan bin Muhammad Al-Haddad (Mbah Priok Tanjung Priok)',
    description:
      'Ulama dan da’i bahari asal Palembang berdarah Hadramaut yang wafat dalam pelayaran dakwah menuju tanah Jawa pada tahun 1756 M dan namanya diabadikan menjadi Pelabuhan Tanjung Priok.',
    category: 'Habaib',
    era: 'Era Pelayaran Dakwah Nusantara (1727 – 1756 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Utara',
    district: 'Kec. Koja',
    address: 'Kompleks Maqom Keramat Mbah Priok, Jl. Dobo Pelabuhan Tanjung Priok, Kel. Koja, Kec. Koja',
    location: {
      lat: -6.1066,
      lng: 106.8858,
      address: 'Kompleks Maqom Keramat Mbah Priok, Jl. Dobo Pelabuhan Tanjung Priok, Kel. Koja, Kec. Koja',
      district: 'Kec. Koja',
      city: 'Jakarta Utara',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Pesisir Jakarta Utara (Kawasan Maqom Keramat Mbah Priok Tanjung Priok)',
    sanad:
      'Dzurriyah Rasulullah SAW marga Al-Haddad (keturunan Shohibul Ratib Al-Habib Abdullah bin Alwi Al-Haddad Hadramaut) yang lahir di Ulu Palembang pada tahun 1727 M.',
    karya: [
      'Rihlah dakwah maritim lintas Selat Sunda dan Laut Jawa bersama adiknya, Al-Habib Ali bin Muhammad Al-Haddad',
      'Asal-usul penamaan kawasan tanjung pelabuhan terbesar Indonesia: "Tanjung Priok" dari periuk nasi bekal pelayaran beliau',
    ],
    history:
      'Al-Habib Hasan bin Muhammad Al-Haddad, yang sangat masyhur di kalangan masyarakat Betawi dan para pelaut Nusantara dengan sebutan Mbah Priok atau Gubah Al-Haddad, lahir di Ulu Palembang, Sumatera Selatan pada tahun 1727 M. Setelah mendalami ilmu agama di tanah leluhurnya di Hadramaut (Yaman), beliau kembali ke Palembang dan pada tahun 1756 M memutuskan berlayar menuju Pulau Jawa bersama adiknya, Al-Habib Ali bin Muhammad Al-Haddad, untuk menyebarkan dakwah Islam.\n\nDalam pelayaran melintasi Laut Jawa menuju pantai utara Batavia tersebut, perahu yang ditumpangi Habib Hasan dan rombongannya dihadang badai besar serta gangguan armada patroli laut. Di tengah ganasnya gelombang laut di lepas pantai utara Jakarta, Habib Hasan bin Muhammad Al-Haddad wafat sebagai syahid fi sabilillah dalam usia sekitar 29 tahun pada tahun 1756 M.\n\nJenazah beliau kemudian terdampar di sebuah tanjung pesisir utara Jakarta dan dimakamkan dengan penuh takzim oleh para pelaut serta penduduk setempat. Ketika pemerintah Hindia Belanda membangun pelabuhan samudera modern di kawasan tersebut pada akhir abad ke-19 dan memindahkan makam beliau ke lokasi Gubah Al-Haddad di Koja, kawasan pelabuhan itu tetap menyandang nama "Tanjung Priok" yang berakar dari kisah sejarah makam beliau. Kini Kompleks Maqom Mbah Priok telah ditetapkan oleh Pemerintah Provinsi DKI Jakarta sebagai kawasan Cagar Budaya Religi.',
    karomah: [
      'Dalam riwayat manaqib Gubah Al-Haddad dan tradisi tutur masyarakat Tanjung Priok, dikisahkan bahwa ketika perahu Habib Hasan kehabisan bahan makanan akibat dihantam badai di tengah laut, beliau berdoa kepada Allah SWT sambil menanak sisa beras sedikit di dalam sebuah periuk (priuk) tanah liat hingga cukup untuk memberi makan seluruh awak kapal.<!--more-->\n\nKetika jenazah beliau ditemukan mengapung di tepi tanjung pantai utara Jakarta, di dekat jasadnya yang utuh dan harum ditemukan periuk penanak nasi tersebut serta sebatang dayung kayu yang ditancapkan sebagai nisan dan kemudian tumbuh menjadi pohon tanjung yang rindang; dari dua tanda inilah lahir nama "Tanjung Priok".',
    ],
    untoldStory:
      'Pada masa pembangunan kanal dan dermaga Pelabuhan Tanjung Priok oleh pemerintah kolonial Belanda tahun 1877–1886, makam asli Habib Hasan di tepi dermaga dipindahkan ke lahan perkebunan Dobo di Koja dengan disaksikan para habaib dan ulama Betawi.<!--more-->\n\nDi Kompleks Gubah Al-Haddad Tanjung Priok saat ini berdiri masjid megah berserta pendopo maqbarah yang setiap pekannya menjadi pusat majelis dzikir Ratib Al-Haddad, shalawat, dan santunan bagi ribuan jamaah serta pekerja pelabuhan.',
    barokahHajat:
      'Peziarah yang berziarah ke Maqom Keramat Mbah Priok (Habib Hasan bin Muhammad Al-Haddad) umumnya bertawassul memohon keselamatan pelayaran dan perjalanan jauh, kecukupan rezeki rumah tangga ("keberkahan periuk"), serta keteguhan hati dalam menghadapi badai ujian hidup.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الشَّهِيدِ الْحَبِيبِ حَسَنِ بْنِ مُحَمَّدٍ الْحَدَّادْ (مْبَاهْ فَرِيُوكْ تَانْجُونْج فَرِيُوكْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ سَلِّمْنَا فِي الْبَرِّ وَالْبَحْرِ وَارْزُقْنَا رِزْقًا حَلَالًا مُبَارَكًا بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الشَّهِيدِ الْحَبِيبِ حَسَنِ بْنِ مُحَمَّدٍ الْحَدَّادْ (مْبَاهْ فَرِيُوكْ تَانْجُونْج فَرِيُوكْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ سَلِّمْنَا فِي الْبَرِّ وَالْبَحْرِ وَارْزُقْنَا رِزْقًا حَلَالًا مُبَارَكًا بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyisy-Syahiid Al-Habiib Hasan bin Muhammad Al-Haddaad (Mbah Priok Tanjung Priok) syai-un lillaahi lahumul-Faatihah. Allaahumma sallimnaa fil-barri wal-bahri warzuqnaa rizqan halaalan mubaarakan bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali syahid Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok Tanjung Priok), Al-Fatihah. Ya Allah, selamatkanlah kami di daratan maupun di lautan dan karuniakanlah kepada kami rezeki yang halal lagi berkah dengan wasilah kemuliaan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali syahid Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok Tanjung Priok), Al-Fatihah. Ya Allah, selamatkanlah kami di daratan maupun di lautan dan karuniakanlah kepada kami rezeki yang halal lagi berkah dengan wasilah kemuliaan beliau.',
      },
    ],
    haulSchedule:
      'Ahad terakhir bulan Safar / Rabiul Awal (Haul Akbar Gubah Al-Haddad Mbah Priok Tanjung Priok) serta Majelis Rutin Malam Jumat di Kompleks Maqom Mbah Priok.',
    localAdab:
      'Mematuhi pemeriksaan keamanan dan rambu lalu lintas kawasan Pelabuhan Tanjung Priok, berpakaian muslim yang sopan menutup aurat, melepas alas kaki di batas suci pelataran Gubah Al-Haddad, serta menjaga ketertiban selama berdoa.',
    facilities: ['Masjid & Pendopo Agung Gubah Al-Haddad', 'Kubah Maqom Mbah Priok', 'Sumber Air & Tempat Wudhu', 'Area Parkir Bus di Kawasan Cagar Budaya'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Shahab, Alwi (2004). Saudagar Baghdad dari Betawi. Republika.',
      'Yayasan Gubah Al-Haddad — Manaqib Al-Arif Billah Al-Habib Hasan bin Muhammad Al-Haddad (Mbah Priok).',
      'Keputusan Gubernur Provinsi DKI Jakarta Tahun 2017 tentang Penetapan Situs Makam Mbah Priok sebagai Cagar Budaya.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'pangeran-jayakarta',
    legacyId: 'auliya-1',
    name: 'Pangeran Achmad Jaketra (Pangeran Jayakarta / Pangeran Sungerasa Jayawikarta)',
    title: 'Pangeran Jayakarta (Jatinegara Kaum Jakarta Timur)',
    description:
      'Penguasa terakhir Kadipaten Jayakarta dan ulama pejuang anti-VOC yang mendirikan Masjid Assalafiyah Jatinegara Kaum sebagai basis perjuangan rakyat Betawi.',
    category: 'Auliya Nusantara',
    era: 'Era Kadipaten Jayakarta & Perlawanan Awal Kolonial (Wafat sekitar 1640 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    district: 'Kec. Pulogadung',
    address: 'Kompleks Masjid Jami’ Assalafiyah, Jl. Jatinegara Kaum Raya No. 49, Kel. Jatinegara Kaum, Kec. Pulogadung',
    location: {
      lat: -6.2016,
      lng: 106.8992,
      address: 'Kompleks Masjid Jami’ Assalafiyah, Jl. Jatinegara Kaum Raya No. 49, Kel. Jatinegara Kaum, Kec. Pulogadung',
      district: 'Kec. Pulogadung',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Masjid Tua & Cagar Budaya Islam Jakarta (Kawasan Makam Pangeran Jayakarta Jatinegara Kaum)',
    sanad:
      'Putra Pangeran Tubagus Angke (Wijayakrama) dan Ratu Pembayun (putri Sultan Maulana Hasanuddin Banten); keturunan langsung Kanjeng Sunan Gunung Jati dan Fatahillah.',
    karya: [
      'Pendirian Masjid Assalafiyah Jatinegara Kaum (1620 M) sebagai pusat komando spiritual dan perjuangan melawan VOC Belanda',
      'Pembentukan komunitas pejuang muslim Jatinegara Kaum ("Negara Sejati" / *Jatina Nagara*) pasca-jatuhnya Sunda Kelapa ke tangan JP Coen (1619 M)',
    ],
    history:
      'Pangeran Jayakarta, yang dikenal dalam arsip sejarah Banten dan Betawi sebagai Pangeran Sungerasa Jayawikarta atau Pangeran Achmad Jaketra, adalah penguasa Kadipaten Jayakarta (bawahan Kesultanan Banten) pada awal abad ke-17 M. Beliau merupakan cucu Sultan Maulana Hasanuddin Banten dari garis ibunya, Ratu Pembayun, yang menikah dengan Tubagus Angke.\n\nKetika Gubernur Jenderal VOC Jan Pieterszoon Coen secara sepihak membangun benteng militer di muara Sungai Ciliwung dan menyerang keraton Jayakarta pada tanggal 30 Mei 1619 M, Pangeran Jayakarta beserta para ulama, prajurit, dan pengikut setianya menolak menyerah. Beliau melakukan hijrah strategis ke arah tenggara di tepian Sungai Sunter yang masih berupa hutan pohon jati, lalu membangun pemukiman pertahanan baru yang dinamakan *Jatinegara* (dari kata *Jatina Nagara*, artinya "Pemerintahan yang Sejati").\n\nDi Jatinegara Kaum, pada tahun 1620 M Pangeran Jayakarta mendirikan sebuah surau kayu sederhana yang kini berdiri megah sebagai Masjid Jami’ Assalafiyah. Dari masjid inilah beliau menyusun perlawanan gerilya terhadap VOC dan membina keislaman masyarakat Betawi serta Sunda hingga wafat sekitar tahun 1640 M. Makam beliau beserta keluarganya terletak di halaman Masjid Jami’ Assalafiyah, Kelurahan Jatinegara Kaum, Kecamatan Pulogadung, Jakarta Timur.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Jatinegara Kaum, dikisahkan bahwa Pangeran Jayakarta memilih bersembunyi dan menyamarkan identitas kebangsawanannya di tengah hutan jati Pulogadung sebagai seorang guru ngaji biasa bernama "Syekh Achmad", sehingga mata-mata VOC Belanda selama puluhan tahun tidak pernah berhasil melacak markas perlawanan beliau.<!--more-->\n\nEmpat tiang soko guru kayu jati asli di dalam ruang utama Masjid Jami’ Assalafiyah Jatinegara Kaum yang ditegakkan oleh Pangeran Jayakarta dan para pengikutnya pada tahun 1620 M hingga kini masih berdiri kokoh menopang atap masjid setelah berusia lebih dari empat abad.',
    ],
    untoldStory:
      'Nama wilayah "Jatinegara" di Jakarta Timur bukanlah sekadar nama geografis karena banyaknya pohon jati, melainkan pernyataan politik dan kedaulatan batin Pangeran Jayakarta bahwa meskipun VOC merampas pelabuhan dan mengganti nama Jayakarta menjadi Batavia pada tahun 1619, kedaulatan "Negara Sejati" (*Jatina Nagara*) tetap hidup di hati kaum beriman yang berjuang di Jatinegara Kaum.<!--more-->\n\nHingga hari ini, warga asli di sekitar Masjid Assalafiyah Jatinegara Kaum masih menjaga kekerabatan keturunan pengikut Pangeran Jayakarta dan melestarikan tradisi ziarah akbar menjelang bulan suci Ramadhan serta peringatan Hari Ulang Tahun Kota Jakarta.',
    barokahHajat:
      'Peziarah yang berziarah ke kompleks Makam Pangeran Jayakarta di Jatinegara Kaum lazimnya bertawassul memohon keteguhan iman dan harga diri dalam menghadapi tekanan hidup di ibu kota, keberkahan kepemimpinan masyarakat, serta perlindungan keluarga.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Pangeran Achmad Jaketra (Pangeran Jayakarta)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْمُجَاهِدِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ أَحْمَدَ جَاكِتْرَا (فَانْجِيرَانْ جَايَاكَارْتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ أَقْدَامَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِبَرَكَةِ جِهَادِهِ وَإِخْلَاصِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْأَمِيرِ الْمُجَاهِدِ الْوَلِيِّ الصَّالِحِ الشَّيْخِ أَحْمَدَ جَاكِتْرَا (فَانْجِيرَانْ جَايَاكَارْتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ثَبِّتْ أَقْدَامَنَا عَلَى الْحَقِّ وَانْفَعْنَا بِبَرَكَةِ جِهَادِهِ وَإِخْلَاصِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Amiiril-Mujaahid Al-Waliyyish-Shaalih Asy-Syaikh Ahmad Jaketra (Pangeran Jayakarta) syai-un lillaahi lahumul-Faatihah. Allaahumma tsabbit aqdaamanaa 'alal-haqqi wanfa'naa bi barakati jihaadihii wa ikhlaashih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pejuang dan wali yang shalih Syekh Achmad Jaketra (Pangeran Jayakarta), Al-Fatihah. Ya Allah, teguhkanlah pijakan kami di atas kebenaran dan limpahkanlah kemanfaatan melalui keberkahan perjuangan serta keikhlasan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh pemimpin pejuang dan wali yang shalih Syekh Achmad Jaketra (Pangeran Jayakarta), Al-Fatihah. Ya Allah, teguhkanlah pijakan kami di atas kebenaran dan limpahkanlah kemanfaatan melalui keberkahan perjuangan serta keikhlasan beliau.',
      },
    ],
    haulSchedule:
      'Bulan Sya’ban (Haul Akbar Menjelang Ramadhan) & Bulan Juni (Ziarah Resmi Rangkaian Hari Ulang Tahun DKI Jakarta di Kompleks Makam Pangeran Jayakarta Jatinegara Kaum).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki saat memasuki ruang maqbarah di samping Masjid Jami’ Assalafiyah, menjaga ketenangan ibadah shalat berjamaah, dan mengikuti arahan pengurus DKM/keluarga besar Jatinegara Kaum.',
    facilities: ['Masjid Cagar Budaya Assalafiyah (1620 M)', 'Cungkup Makam Pangeran Jayakarta & Keluarga', 'Tempat Wudhu & Toilet', 'Area Parkir'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Heuken, Adolf (2003). Mesjid-mesjid Tua di Jakarta. Yayasan Cipta Loka Caraka.',
      'Candrian Attahiyyat (2012). Jejak Pangeran Jayakarta di Jatinegara Kaum. Dinas Pariwisata dan Kebudayaan Provinsi DKI Jakarta.',
      'Djajadiningrat, Hoesein (1983). Tinjauan Kritis Tentang Sejarah Banten. Djambatan.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-ahmad-bin-alwi-al-haddad',
    legacyId: 'habib-4',
    name: 'Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung)',
    title: 'Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung Kalibata)',
    description:
      'Waliyullah majdzub asal Hadramaut yang sangat dicintai masyarakat Jakarta karena ketawadhuan, kedermawanan kepada fakir miskin, dan kopiah kerucut (kuncung) khasnya.',
    category: 'Habaib',
    era: 'Era Hindia Belanda Akhir Abad ke-19 – Awal Abad ke-20 (26 Sya’ban 1254 H / 1838 M – 29 Sya’ban 1345 H / 1926 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Kec. Pancoran',
    address: 'Kompleks Masjid At-Taubah, Jl. Rawajati Timur II No. 69, Kalibata, Kec. Pancoran',
    location: {
      lat: -6.2572,
      lng: 106.8576,
      address: 'Kompleks Masjid At-Taubah, Jl. Rawajati Timur II No. 69, Kalibata, Kec. Pancoran',
      district: 'Kec. Pancoran',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ziarah Habaib DKI Jakarta (Kompleks Makam Habib Kuncung Kalibata)',
    sanad:
      'Dzurriyah Rasulullah SAW marga Al-Haddad lahir di Qaidun, Hadramaut; murid ayahandanya Al-Habib Alwi bin Ahmad Al-Haddad, Al-Habib Abdurrahman bin Abdullah Al-Habsyi, Al-Habib Ali bin Muhammad Al-Habsyi (pengarang Simthud Durar), dan Al-Habib Husein bin Muhammad Al-Habsyi.',
    karya: [
      'Keteladanan tasawuf khumul (menyembunyikan kemuliaan diri) dan kepedulian sosial terhadap masyarakat kecil di Betawi',
      'Jejaring silaturahmi habaib Nusantara dari Timor, Singapura, Bugis, hingga Batavia dan Bogor',
    ],
    history:
      'Al-Habib Ahmad bin Alwi bin Ahmad Al-Haddad lahir di Kota Qaidun, lembah Hadramaut (Yaman) pada tanggal 26 Sya’ban 1254 H (1838 M). Sejak belia beliau menimba ilmu syariat dan hakikat langsung kepada ayahandanya serta para ulama besar Hadramaut, termasuk penyusun Maulid Simthud Durar Al-Habib Ali bin Muhammad Al-Habsyi di Sewun. Dalam pengembaraan dakwah dan perniagaannya ke Nusantara, beliau sempat singgah di Pulau Timor, Singapura, dan Sulawesi sebelum menetap di Batavia (Jakarta).\n\nDi Jakarta, Habib Ahmad bin Alwi Al-Haddad dikenal sebagai seorang waliyullah yang menempuh jalan *majdzub* dan *khumul* (menutupi derajat kewaliannya dengan penampilan sederhana). Masyarakat Betawi memanggil beliau dengan penuh kasih sayang sebagai "Habib Kuncung" karena kebiasaan beliau mengenakan kopiah/peci panjang berbentuk kerucut ke atas (*kuncung*) dari tradisi Hadramaut dan Bugis.\n\nBeliau sangat akrab dengan kaum dhuafa, pedagang pasar, dan anak-anak yatim di kawasan Kalibata, Tanah Abang, hingga Empang Bogor, serta bersahabat dekat dengan Al-Habib Abdullah bin Mukhsin Al-Attas (Keramat Empang Bogor) dan Al-Habib Muhammad bin Ahmad Al-Muhdhor (Bondowoso). Habib Ahmad bin Alwi Al-Haddad wafat pada tanggal 29 Sya’ban 1345 H (1926 M) dalam usia sekitar 91 tahun Hijriah dan dimakamkan di kompleks Masjid At-Taubah, Rawajati Timur, Kalibata, Kecamatan Pancoran, Jakarta Selatan.',
    karomah: [
      'Dalam riwayat manaqib yang dihimpun keluarga besar Al-Haddad dan tradisi tutur masyarakat Jakarta, dikisahkan bahwa meskipun Habib Kuncung sering tampil berpakaian sangat bersahaja, para waliyullah besar zamannya seperti Habib Abdullah bin Mukhsin Al-Attas Empang Bogor selalu berdiri menyambut dan mencium tangan beliau karena mengetahui kedudukan rohani Habib Kuncung yang tinggi di sisi Allah SWT.<!--more-->\n\nBanyak kesaksian warga Betawi masa lampau yang menceritakan bagaimana kehadiran Habib Kuncung di sebuah toko atau warung milik warga miskin selalu membawa keberkahan larisnya dagangan dan lunasnya utang piutang melalui doa singkat beliau.',
    ],
    untoldStory:
      'Di dalam kompleks kubah maqbarah Masjid At-Taubah Rawajati Kalibata, selain pusara utama Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung), bersemayam pula ulama besar Al-Habib Munzir bin Fuad Al-Musawa (Pendiri Majelis Rasulullah SAW, wafat 2013 M) yang semasa hidupnya sangat mencintai dan rutin berziarah ke makam Habib Kuncung.<!--more-->\n\nKeberadaan dua pusara ulama kecintaan umat lintas generasi di kompleks yang sama menjadikan Masjid At-Taubah Kalibata sebagai salah satu magnet ziarah dan majelis shalawat terbesar di Jakarta Selatan yang tak pernah sepi siang maupun malam.',
    barokahHajat:
      'Peziarah yang berziarah ke makam Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung) lazimnya bertawassul memohon kepada Allah SWT kelapangan rezeki usaha dan pelunasan beban utang, kelembutan hati untuk mencintai kaum fakir miskin, serta ketenangan batin.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ عَلَوِي الْحَدَّادْ (حَبِيبْ كُونْشُونْج كَالِيبَاتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ وَسِّعْ أَرْزَاقَنَا وَاقْضِ دُيُونَنَا وَانْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الْعَارِفِ بِاللهِ الْحَبِيبِ أَحْمَدَ بْنِ عَلَوِي الْحَدَّادْ (حَبِيبْ كُونْشُونْج كَالِيبَاتَا) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ وَسِّعْ أَرْزَاقَنَا وَاقْضِ دُيُونَنَا وَانْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Al-'Aarifi billaah Al-Habiib Ahmad bin 'Alawii Al-Haddaad (Habib Kuncung Kalibata) syai-un lillaahi lahumul-Faatihah. Allaahumma wassi' arzaaqanaa waqdhi duyuunanaa wanfa'naa bi karaamatihii wa asraarih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih arif billah Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung Kalibata), Al-Fatihah. Ya Allah, lapangkanlah rezeki kami, lunaskanlah tanggungan kami, dan limpahkanlah kemanfaatan melalui kemuliaan serta rahasia keshalihan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih arif billah Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung Kalibata), Al-Fatihah. Ya Allah, lapangkanlah rezeki kami, lunaskanlah tanggungan kami, dan limpahkanlah kemanfaatan melalui kemuliaan serta rahasia keshalihan beliau.',
      },
    ],
    haulSchedule:
      'Akhir bulan Sya’ban / Ahad terakhir bulan Syawal–Dzulqa’dah (Haul Akbar Al-Habib Ahmad bin Alwi Al-Haddad / Habib Kuncung di Kompleks Masjid At-Taubah Rawajati Kalibata Jakarta Selatan).',
    localAdab:
      'Memarkir kendaraan di kantong parkir resmi kawasan Kalibata agar tidak menghambat jalan warga Rawajati Timur, berpakaian muslim sopan menutup aurat, memisahkan area duduk peziarah pria dan wanita di dalam maqbarah, serta menjaga kekhusyukan.',
    facilities: ['Masjid Jami’ At-Taubah Rawajati', 'Kubah Maqbarah Habib Kuncung & Habib Munzir Al-Musawa', 'Tempat Wudhu & Toilet', 'Akses Dekat Stasiun KRL Duren Kalibata'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Manaqib Al-Arif Billah Al-Habib Ahmad bin Alwi Al-Haddad (Habib Kuncung) — Yayasan Masjid At-Taubah Rawajati Kalibata.',
      'Shahab, Alwi (2004). Saudagar Baghdad dari Betawi. Republika.',
      'Rabithah Alawiyah — Dokumentasi Sejarah Ulama dan Habaib Betawi Abad ke-19–20.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-ali-kwitang',
    legacyId: 'habib-1',
    name: 'Al-Habib Ali bin Abdurrahman Al-Habsyi (Habib Ali Kwitang)',
    title: 'Habib Ali bin Abdurrahman Al-Habsyi (Kwitang Jakarta Pusat)',
    description:
      'Ulama kharismatik pelopor Majelis Taklim Ahad Pagi Kwitang, guru para kiai besar Betawi, dan tokoh pemersatu umat yang merestui Proklamasi Kemerdekaan RI.',
    category: 'Habaib',
    era: 'Era Pergerakan Nasional & Kemerdekaan RI (20 Jumadil Awal 1286 H / 20 April 1870 M – 20 Rajab 1388 H / 13 Oktober 1968 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Kec. Senen',
    address: 'Kompleks Masjid Jami’ Al-Riyadh, Jl. Kembang III No. 2, Kel. Kwitang, Kec. Senen',
    location: {
      lat: -6.1825,
      lng: 106.8428,
      address: 'Kompleks Masjid Jami’ Al-Riyadh, Jl. Kembang III No. 2, Kel. Kwitang, Kec. Senen',
      district: 'Kec. Senen',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Islam Jakarta (Kawasan Masjid Al-Riyadh & Maqbarah Habib Ali Kwitang)',
    sanad:
      'Putra Al-Habib Abdurrahman bin Abdullah Al-Habsyi (Cikini) dan Hj. Salmah (ulama perempuan Betawi Meester Cornelis); murid Al-Habib Ali bin Muhammad Al-Habsyi (Sewun, pengarang Simthud Durar), Al-Habib Husein bin Muhammad Al-Habsyi, Syekh Muhammad Haqqi An-Nazili, Syekh Umar Hamdan, dan Habib Utsman bin Yahya; mahaguru dari KH. Abdullah Syafi’i, KH. Thahir Rohili, dan KH. Fathullah Harun.',
    karya: [
      'Perintisan Majelis Taklim Ahad Pagi Kwitang (sejak akhir abad ke-19) — induk dari ribuan majelis taklim di Jakarta dan Nusantara',
      'Pembangunan Masjid Jami’ Al-Riyadh Kwitang (1930-an), Madrasah Unwanul Falah, serta kitab Al-Azharul Wardiyyah fi Ash-Shalati ‘ala Khairil Bariyyah',
    ],
    history:
      'Al-Habib Ali bin Abdurrahman bin Abdullah Al-Habsyi lahir di Kwitang, Batavia (Jakarta Pusat) pada tanggal 20 Jumadil Awal 1286 H (20 April 1870 M) dari pasangan Al-Habib Abdurrahman bin Abdullah Al-Habsyi dan Nyai Hj. Salmah binti Wakidin, seorang perempuan Betawi yang shalihah asal Jatinegara. Pada usia sekitar 11 tahun setelah ayahandanya wafat, ibundanya menjual gelang emas warisan demi memberangkatkan Habib Ali muda menuntut ilmu ke Hadramaut dan Haramain.\n\nSelama menimba ilmu di Hadramaut dan Makkah, beliau berguru langsung kepada para kutub keilmuan zamannya, terutama Al-Habib Ali bin Muhammad Al-Habsyi (pengarang *Maulid Simthud Durar* di Sewun) dan para masyaikh Masjidil Haram. Sekembalinya ke tanah air pada tahun 1889 M, beliau merintis pengajian rutin setiap hari Ahad pagi di Kwitang yang kelak berkembang menjadi Islamic Center Indonesia (ICI) Majelis Taklim Kwitang serta membangun Masjid Jami’ Al-Riyadh.\n\nDari mimbar Majelis Kwitang inilah lahir generasi ulama besar Betawi seperti KH. Abdullah Syafi’i (Assyafi’iyah), KH. Thahir Rohili (At-Thahiriyah), dan KH. Noer Ali (Bekasi). Presiden Pertama RI Ir. Soekarno tercatat menemui Habib Ali Kwitang untuk memohon doa restu menjelang Proklamasi Kemerdekaan 17 Agustus 1945. Habib Ali Kwitang wafat pada hari Ahad, 20 Rajab 1388 H (13 Oktober 1968 M) dalam usia hampir satu abad dan kepergiannya disiarkan secara nasional melalui RRI.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian para ulama sezamannya, karomah terbesar Habib Ali Kwitang adalah pancaran mahabbah (cinta kasih) dan keberkahan dakwah lisannya; siapapun yang memandang wajah beliau yang teduh dan mendengar nasihat singkatnya akan tergerak hatinya untuk bertaubat dan mencintai Rasulullah SAW.<!--more-->\n\nMajelis Ahad Pagi yang beliau rintis di Kwitang sejak lebih dari satu abad silam tidak pernah terputus meskipun melewati masa kolonial Belanda, pendudukan Jepang, hingga gejolak kemerdekaan, dan menjadi teladan bagi berdirinya puluhan ribu majelis taklim di seluruh Asia Tenggara.',
    ],
    untoldStory:
      'Pertemuan batin dan kebangsaan antara Al-Habib Ali bin Abdurrahman Al-Habsyi dengan Bung Karno serta para tokoh pergerakan nasional di serambi rumah Kwitang memiliki arti sejarah yang krusial dalam penentuan waktu Proklamasi Kemerdekaan Indonesia pada bulan suci Ramadhan 1364 H (Agustus 1945).<!--more-->\n\nSelain itu, Habib Ali Kwitang adalah ulama pelopor yang pertama kali menyebarluaskan pembacaan *Maulid Simthud Durar* karya gurunya (Habib Ali bin Muhammad Al-Habsyi Sewun) di tanah Jawa dan Betawi, yang kini menjadi bacaan maulid paling populer di majelis-majelis Indonesia.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Habib Ali Kwitang di Masjid Al-Riyadh umumnya bertawassul memohon kecintaan yang tulus kepada Nabi Muhammad SAW, keberkahan majelis ilmu atau dakwah yang sedang dibina, serta kerukunan rumah tangga dan masyarakat.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Al-Habib Ali bin Abdurrahman Al-Habsyi Kwitang',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الدَّاعِي إِلَى اللهِ الْعَالِمِ الْعَامِلِ الْحَبِيبِ عَلِيِّ بْنِ عَبْدِ الرَّحْمٰنِ الْحَبْشِي صَاحِبِ كْوِيتَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا كَمَالَ الْمَحَبَّةِ لِنَبِيِّكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الدَّاعِي إِلَى اللهِ الْعَالِمِ الْعَامِلِ الْحَبِيبِ عَلِيِّ بْنِ عَبْدِ الرَّحْمٰنِ الْحَبْشِي صَاحِبِ كْوِيتَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا كَمَالَ الْمَحَبَّةِ لِنَبِيِّكَ وَانْفَعْنَا بِعُلُومِهِ وَبَرَكَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhid-Daa'ii ilallaah Al-'Aalimil-'Aamil Al-Habiib 'Alii bin 'Abdirrahmaan Al-Habsyii shaahibi Kwitang syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa kamaalal-mahabbati li Nabiyyika wanfa'naa bi 'uluumihii wa barakaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh da’i ilallah yang alim lagi mengamalkan ilmunya Al-Habib Ali bin Abdurrahman Al-Habsyi Kwitang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kesempurnaan cinta kepada Nabi-Mu serta limpahkanlah kemanfaatan ilmu dan keberkahan beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh da’i ilallah yang alim lagi mengamalkan ilmunya Al-Habib Ali bin Abdurrahman Al-Habsyi Kwitang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami kesempurnaan cinta kepada Nabi-Mu serta limpahkanlah kemanfaatan ilmu dan keberkahan beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      '20 Rajab & Rangkaian Maulid Akhir Kamis Sore Bulan Rabiul Awal (Haul Akbar Nasional & Maulid Agung di Masjid Jami’ Al-Riyadh Kwitang, serta Majelis Rutin setiap Ahad Pagi pukul 06:00–09:00 WIB).',
    localAdab:
      'Mengenakan pakaian muslim putih/sopan menutup aurat, mengikuti pemisahan ruang ziarah jamaah pria dan wanita di sisi Masjid Al-Riyadh Kwitang, menjaga ketenangan saat shalat berjamaah atau majelis berlangsung, dan mematuhi petugas ketertiban majelis.',
    facilities: ['Masjid Jami’ Al-Riyadh Kwitang', 'Kubah Maqbarah Keluarga Besar Al-Habsyi Kwitang', 'Gedung Islamic Center Indonesia (ICI)', 'Tempat Wudhu & Toilet'],
    openingHours: '05:00 - 22:00 WIB',
    references: [
      'Shahab, Alwi (2006). Kwitang: Pusat Pengembangan Islam di Jakarta. Republika.',
      'Kiki, Rakhmad Zailani dkk. (2011). Genealogi Intelektual Ulama Betawi. Jakarta Islamic Centre.',
      'Majelis Taklim Al-Habib Ali Al-Habsyi Kwitang — Biografi dan Manaqib Al-Habib Ali bin Abdurrahman Al-Habsyi.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-utsman-bin-yahya',
    legacyId: 'habib-5',
    name: 'Al-Habib Utsman bin Abdullah bin Aqil bin Yahya (Mufti Betawi)',
    title: 'Habib Utsman bin Yahya (Mufti Betawi - Pondok Bambu)',
    description:
      'Ulama besar Mufti Betawi abad ke-19 yang menulis lebih dari 100 kitab cetak litografi berbahasa Arab dan Melayu Jawi termasuk Sifat Dua Puluh.',
    category: 'Habaib',
    era: 'Era Ulama Intelektual Betawi Abad ke-19 (17 Rabiul Awal 1238 H / 1822 M – 21 Muharram 1331 H / 1913 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    district: 'Kec. Duren Sawit',
    address: 'Kompleks Masjid Al-Abidin, Jl. Pahlawan Revolusi, Kel. Pondok Bambu, Kec. Duren Sawit',
    location: {
      lat: -6.2348,
      lng: 106.9012,
      address: 'Kompleks Masjid Al-Abidin, Jl. Pahlawan Revolusi, Kel. Pondok Bambu, Kec. Duren Sawit',
      district: 'Kec. Duren Sawit',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Ulama Betawi (Kawasan Makam Mufti Betawi Habib Utsman bin Yahya Pondok Bambu)',
    sanad:
      'Putra Sayyid Abdullah bin Aqil bin Yahya dan Syarifah Aminah binti Syekh Abdurrahman Al-Mishri (ulama ahli falak asal Mesir di Petamburan); murid kakeknya Syekh Abdurrahman Al-Mishri, Sayyid Ahmad Zaini Dahlan (Mufti Syafi’iyah Makkah), Al-Habib Abdullah bin Husein bin Thahir (Hadramaut), dan Syekh Rahmatullah Al-Kairanawi.',
    karya: [
      'Lebih dari 116 kitab dan risalah cetak batu (litografi) sendiri di Pertamburan, antara lain Kitab Sifat Dua Puluh, Manasik Haji, Iqdul Juman, dan القوانين الشرعية (Al-Qawanin Asy-Syar’iyyah li Ahlil Majalis Al-Hukmiyyah)',
      'Perintisan percetakan litografi Islam pribumi di Batavia pada abad ke-19 dan pembakuan pedoman peradilan agama (Raad Agama)',
    ],
    history:
      'Al-Habib Utsman bin Abdullah bin Aqil bin Umar bin Yahya lahir di Pekojan, Batavia (Jakarta Barat) pada tanggal 17 Rabiul Awal 1238 H (Desember 1822 M). Sejak usia tiga tahun hingga remaja, beliau dididik langsung oleh kakek dari pihak ibunya, Syekh Abdurrahman bin Ahmad Al-Mishri, seorang ulama besar dan ahli astronomi (ilmu falak) asal Mesir yang bermukim di Batavia. Pada tahun 1841 M, Habib Utsman berangkat ke Makkah untuk berguru kepada Mufti Syafi’iyah Sayyid Ahmad Zaini Dahlan, kemudian melanjutkan pengembaraan ilmu selama более dari dua dekade ke Madinah, Hadramaut, Mesir, Tunisia, Aljazair, Turki (Istanbul), dan Syam.\n\nSekembalinya ke Batavia pada tahun 1862 M, Habib Utsman bin Yahya diangkat sebagai Mufti Betawi dan membuka majelis pengajaran serta mesin cetak batu (*litografi*) sendiri di kediamannya di Petamburan. Melalui percetakan mandiri tersebut, beliau menerbitkan lebih dari seratus judul kitab berbahasa Arab dan Melayu beraksara Jawi (Arab-Melayu) yang menyebar luas ke seluruh surau dan langgar di Jakarta, Jawa Barat, Sumatera, hingga Semenanjung Malaya.\n\nDi antara karya beliau yang paling melegenda dan masih dikaji oleh masyarakat Betawi hingga hari ini adalah *Kitab Sifat Dua Puluh* (akidah Ahlussunnah wal Jamaah) dan *Al-Qawanin Asy-Syar’iyyah* (pedoman hukum kewarisan dan peradilan agama). Habib Utsman bin Yahya wafat pada tanggal 21 Muharram 1331 H (1913 M). Makam beliau yang semula berada di Karet kemudian dipindahkan ke kompleks Masjid Al-Abidin, Pondok Bambu, Duren Sawit, Jakarta Timur.',
    karomah: [
      'Dalam riwayat manaqib keluarga besar Bin Yahya dan kesaksian murid-murid beliau seperti Guru Marzuki Cipinang dan Habib Ali Kwitang, produktivitas penulisan Habib Utsman bin Yahya merupakan karomah keilmuan yang langka; beliau menulis sendiri di atas pelat batu litografi dengan kaligrafi yang sangat indah dan presisi lebih dari seratus kitab tanpa bantuan mesin modern.<!--more-->\n\nKetika makam beliau dipindahkan dari kawasan Karet ke kompleks Masjid Al-Abidin Pondok Bambu puluhan tahun setelah wafatnya, para saksi mata dari kalangan ulama dan dzurriyah menuturkan bahwa kain kafan dan jasad sang Mufti Betawi masih dalam keadaan utuh.',
    ],
    untoldStory:
      'Koleksi lengkap kitab-kitab cetak batu karya Habib Utsman bin Yahya kini tersimpan sebagai naskah langka bernilai tinggi di Perpustakaan Nasional RI dan Perpustakaan Universitas Leiden (Belanda), menjadi bukti otentik bahwa masyarakat Muslim Betawi abad ke-19 memiliki tradisi literasi cetak yang sangat maju.<!--more-->\n\nHampir seluruh guru ngaji di kampung-kampung Betawi pada awal abad ke-20 mengajarkan rukun iman, rukun Islam, dan tajwid kepada anak-anak menggunakan kitab tipis berbahasa Melayu karya Habib Utsman bin Yahya yang mudah dipahami oleh masyarakat awam.',
    barokahHajat:
      'Peziarah dan akademisi yang berziarah ke maqbarah Mufti Betawi Habib Utsman bin Yahya di Pondok Bambu umumnya bertawassul memohon ketajaman ilmu fikih dan falak, keberkahan dalam menulis buku atau karya ilmiah, serta keteguhan akidah keluarga.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Mufti Betawi Al-Habib Utsman bin Abdullah bin Yahya',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مُفْتِي بَتَاوِي الْعَالِمِ الْعَلَّامَةِ الْحَبِيبِ عُثْمَانَ بْنِ عَبْدِ اللهِ بْنِ عَقِيلٍ بْنِ يَحْيَى شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ فَقِّهْنَا فِي الدِّينِ وَانْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ فِي الدَّارَيْنِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ مُفْتِي بَتَاوِي الْعَالِمِ الْعَلَّامَةِ الْحَبِيبِ عُثْمَانَ بْنِ عَبْدِ اللهِ بْنِ عَقِيلٍ بْنِ يَحْيَى شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ فَقِّهْنَا فِي الدِّينِ وَانْفَعْنَا بِعُلُومِهِ وَمُصَنَّفَاتِهِ فِي الدَّارَيْنِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Muftii Bataawii Al-'Aalimil-'Allaamah Al-Habiib 'Utsmaan bin 'Abdillaah bin 'Aqiil bin Yahyaa syai-un lillaahi lahumul-Faatihah. Allaahumma faqqihnaa fid-diini wanfa'naa bi 'uluumihii wa mushannafaatihii fid-daarain.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Mufti Betawi al-allamah Al-Habib Utsman bin Abdullah bin Aqil bin Yahya, Al-Fatihah. Ya Allah, pahamkanlah kami dalam urusan agama dan limpahkanlah kemanfaatan ilmu serta karya-karya kitab beliau di dunia dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Mufti Betawi al-allamah Al-Habib Utsman bin Abdullah bin Aqil bin Yahya, Al-Fatihah. Ya Allah, pahamkanlah kami dalam urusan agama dan limpahkanlah kemanfaatan ilmu serta karya-karya kitab beliau di dunia dan akhirat.',
      },
    ],
    haulSchedule:
      'Bulan Muharram / Rabiul Awal (Haul Tahunan Mufti Betawi Al-Habib Utsman bin Yahya di Kompleks Masjid Al-Abidin Pondok Bambu, Duren Sawit, Jakarta Timur).',
    localAdab:
      'Berpakaian muslim sopan dan menutup aurat, melepas alas kaki sebelum memasuki area maqbarah di lingkungan Masjid Al-Abidin Pondok Bambu, menjaga ketenangan ibadah, dan merawat kebersihan area makam.',
    facilities: ['Masjid Jami’ Al-Abidin Pondok Bambu', 'Maqbarah Habib Utsman bin Yahya', 'Tempat Wudhu & Toilet', 'Area Parkir'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Kaptein, Nico J.G. (2014). Islam, Colonialism and the Modern Age in the Netherlands East Indies: A Biography of Sayyid Usman (1822–1914). Brill.',
      'Azra, Azyumardi (1995). Hadhrami Scholars in the Malay-Indonesian Diaspora: A Preliminary Study of Sayyid Uthman. Studia Islamika.',
      'Kiki, Rakhmad Zailani dkk. (2011). Genealogi Intelektual Ulama Betawi. Jakarta Islamic Centre.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'guru-marzuki-cipinang',
    legacyId: 'ulama-5',
    name: 'Syekh KH. Ahmad Marzuki bin Mirshod (Guru Marzuki Cipinang Muara)',
    title: 'Guru Marzuki Cipinang Muara (Mahaguru Ulama Betawi)',
    description:
      'Mahaguru (Syaikhul Masyayikh) para ulama besar Betawi abad ke-20 yang mendirikan pesantren di Cipinang Muara dan mengarang tujuh kitab berbahasa Arab.',
    category: 'Ulama Nusantara',
    era: 'Era Kebangkitan Ulama Betawi (16 Ramadhan 1293 H / 1877 M – 25 Rajab 1352 H / 2 November 1934 M)',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    district: 'Kec. Jatinegara',
    address: 'Kompleks Masjid Jami’ Al-Marzuqiyah, Jl. Cipinang Muara I, Kel. Cipinang Muara, Kec. Jatinegara',
    location: {
      lat: -6.2242,
      lng: 106.8865,
      address: 'Kompleks Masjid Jami’ Al-Marzuqiyah, Jl. Cipinang Muara I, Kel. Cipinang Muara, Kec. Jatinegara',
      district: 'Kec. Jatinegara',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Masjid_Jami_Keramat_Luar_Batang.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Ulama Betawi Jakarta Timur (Kawasan Masjid Al-Marzuqiyah & Makam Guru Marzuki Cipinang Muara)',
    sanad:
      'Putra Syekh Ahmad Mirshod bin Hasbullah (keturunan bangsawan Melayu Pattani yang berhijrah ke Betawi) dan Hj. Fatimah binti Syihabuddin (keturunan Pangeran Senopati Melaka); murid KH. Anwarudin Kriyani Al-Malebari (Pekojan), Habib Utsman bin Yahya (Mufti Betawi), serta ulama Makkah: Syekh Muhammad Amin Al-Madani, Syekh Ahmad Khatib Al-Minangkabawi, Syekh Mahfudz At-Tarmasi, Syekh Mukhtar Atharid Al-Bogori, dan Syekh Ali Al-Maliki; mahaguru dari KH. Noer Ali Bekasi, KH. Abdullah Syafi’i, KH. Thahir Rohili, dan Muallim Syafi’i Hadzami.',
    karya: [
      'Tujuh kitab berbahasa Arab (dicetak di Kairo, Mesir), antara lain: Tamrinul Azhan, Zahrulrieadh, Tuhfatul Rahman, dan Sabilut Taqlid',
      'Pendirian Pondok Pesantren Cipinang Muara (1913 M) yang melahirkan hampir seluruh kiai besar Jakarta, Bekasi, dan Tangerang abad ke-20',
    ],
    history:
      'Syekh KH. Ahmad Marzuki bin Ahmad Mirshod, yang sangat dimuliakan masyarakat Jakarta dengan sebutan Guru Marzuki Cipinang Muara, lahir di Rawabangke (Rawa Bunga), Jatinegara, Batavia pada malam Ahad, 16 Ramadhan 1293 H (1877 M). Sejak usia sembilan tahun ketika ayahnya wafat, beliau dididik dengan disiplin oleh ibundanya, Hj. Fatimah, lalu diserahkan untuk belajar menghafal Al-Qur’an dan dasar-dasar ilmu agama kepada KH. Anwarudin Kriyani Al-Malebari di Pekojan serta Mufti Betawi Al-Habib Utsman bin Yahya.\n\nPada usia sekitar 16 tahun, Ahmad Marzuki muda berangkat ke Tanah Suci Makkah dan bermukim selama tujuh tahun untuk menimba ilmu kepada para ulama terkemuka Masjidil Haram, di antaranya Syekh Ahmad Khatib Al-Minangkabawi, Syekh Mahfudz At-Tarmasi, Syekh Mukhtar Atharid Al-Bogori, dan Syekh Umar Bajunaid. Sekembalinya ke Betawi pada tahun 1913 M atas permintaan gurunya Habib Utsman bin Yahya, beliau membuka pondok pesantren di Kampung Cipinang Muara, Jatinegara.\n\nDari pesantren Cipinang Muara inilah lahir mata rantai emas ulama Betawi abad ke-20 (dikenal sebagai salah satu dari "Enam Guru Besar Betawi"): Pahlawan Nasional KH. Noer Ali (Bekasi), KH. Abdullah Syafi’i (Pendiri Assyafi’iyah), KH. Thahir Rohili (Pendiri At-Thahiriyah), KH. Fathullah Harun, hingga KH. Zayadi Muhajir. Guru Marzuki wafat pada hari Jumat pagi, 25 Rajab 1352 H (2 November 1934 M) dan dimakamkan di kompleks Masjid Jami’ Al-Marzuqiyah, Cipinang Muara, Jakarta Timur.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian murid-murid utama beliau seperti KH. Noer Ali dan KH. Abdullah Syafi’i, Guru Marzuki dikenal memiliki keikhlasan dan kewibawaan mengajar yang luar biasa; setiap kalimat ilmu yang keluar dari lisan beliau langsung meresap ke dalam sanubari para santri sehingga hampir seluruh murid angkatan pertamanya berhasil menjadi ulama besar yang mendirikan pesantren.<!--more-->\n\nDi tengah kesibukan mendidik ratusan santri mukim tanpa memungut biaya sepeser pun, Guru Marzuki juga berhasil menyusun tujuh risalah kitab berbahasa Arab yang naskahnya dikirim dan dicetak langsung di percetakan Musthafa Al-Babi Al-Halabi, Kairo, Mesir.',
    ],
    untoldStory:
      'Jejaring genealogi intelektual Islam di DKI Jakarta, Bekasi, Depok, dan Tangerang hampir seluruhnya bermuara pada kamar pengajian Guru Marzuki di Cipinang Muara. Apabila seorang santri Betawi merunut sanad gurunya dua atau tiga lapis ke atas, niscaya ia akan bertemu dengan nama Syekh Ahmad Marzuki bin Mirshod.<!--more-->\n\nHingga hari ini, keturunan dan murid-murid beliau di Yayasan Al-Marzuqiyah Cipinang Muara tetap merawat tradisi pengajian kitab kuning serta menyelenggarakan Haul Akbar setiap bulan Rajab yang dihadiri oleh para kiai, habaib, dan pimpinan daerah se-Jabodetabek.',
    barokahHajat:
      'Peziarah dan para santri yang berziarah ke maqbarah Guru Marzuki Cipinang Muara lazimnya bertawassul memohon keberkahan ilmu yang melahirkan murid-murid shalih, kemudahan dalam menghafal dan memahami kitab turats, serta keteguhan menjaga tradisi pesantren di tengah kota metropolitan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh KH. Ahmad Marzuki bin Mirshod (Guru Marzuki Cipinang)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ مَشَايِخِ بَتَاوِي الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ أَحْمَدَ مَرْزُوقِي بْنِ أَحْمَدَ مِرْصَادْ شِيفِينَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا عِلْمًا نَافِعًا وَعَمَلًا مُتَقَبَّلًا بِبَرَكَةِ عُلُومِهِ وَإِخْلَاصِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ شَيْخِ مَشَايِخِ بَتَاوِي الْعَالِمِ الْعَلَّامَةِ الشَّيْخِ أَحْمَدَ مَرْزُوقِي بْنِ أَحْمَدَ مِرْصَادْ شِيفِينَانْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا عِلْمًا نَافِعًا وَعَمَلًا مُتَقَبَّلًا بِبَرَكَةِ عُلُومِهِ وَإِخْلَاصِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhi Syaikhi Masyaayikhi Bataawii Al-'Aalimil-'Allaamah Asy-Syaikh Ahmad Marzuuqii bin Ahmad Mirshaad Cipinang syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnaa 'ilman naafi'an wa 'amalan mutaqabbalan bi barakati 'uluumihii wa ikhlaashih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Mahaguru Ulama Betawi al-allamah Syekh KH. Ahmad Marzuki bin Ahmad Mirshod Cipinang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami ilmu yang bermanfaat dan amal yang diterima dengan keberkahan ilmu serta keikhlasan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Mahaguru Ulama Betawi al-allamah Syekh KH. Ahmad Marzuki bin Ahmad Mirshod Cipinang, Al-Fatihah. Ya Allah, karuniakanlah kepada kami ilmu yang bermanfaat dan amal yang diterima dengan keberkahan ilmu serta keikhlasan beliau.',
      },
    ],
    haulSchedule:
      '25 Rajab (Haul Akbar Tahunan Guru Marzuki Cipinang Muara di Kompleks Masjid Jami’ Al-Marzuqiyah Cipinang Muara, Jatinegara, Jakarta Timur).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, menjaga ketenangan karena maqbarah berada di lingkungan Masjid Jami’ dan Madrasah Al-Marzuqiyah, serta melepas alas kaki saat memasuki cungkup makam.',
    facilities: ['Masjid Jami’ Al-Marzuqiyah', 'Cungkup Maqbarah Guru Marzuki & Keluarga', 'Madrasah Al-Marzuqiyah', 'Tempat Wudhu & Toilet'],
    openingHours: '06:00 - 21:00 WIB',
    references: [
      'Kiki, Rakhmad Zailani dkk. (2011). Genealogi Intelektual Ulama Betawi. Jakarta Islamic Centre.',
      'Aziz, Abdul (2002). Islam dan Masyarakat Betawi. Logos Wacana Ilmu.',
      'Yayasan Al-Marzuqiyah Cipinang Muara — Manaqib Syaikhul Masyayikh KH. Ahmad Marzuki bin Mirshod.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'habib-abdullah-empang-bogor',
    legacyId: 'habib-6',
    name: 'Al-Habib Abdullah bin Mukhsin Al-Attas (Keramat Empang Bogor)',
    title: 'Habib Abdullah bin Mukhsin Al-Attas (Keramat Empang Bogor)',
    description:
      'Waliyullah Quthb asal Hadramaut pendiri Masjid An-Nur Empang Bogor dan mahaguru dari Al-Habib Alwi bin Muhammad Al-Haddad serta Al-Habib Ali Kwitang.',
    category: 'Habaib',
    era: 'Era Hindia Belanda Abad ke-19–20 (1265 H / 1849 M – Selasa, 29 Dzulhijjah 1351 H / 25 April 1933 M)',
    province: 'Jawa Barat',
    city: 'Bogor',
    district: 'Kec. Bogor Selatan',
    address: 'Kompleks Masjid Jami’ An-Nur Keramat Empang, Jl. Lolongok, Kel. Empang, Kec. Bogor Selatan, Kota Bogor',
    location: {
      lat: -6.6095,
      lng: 106.7942,
      address: 'Kompleks Masjid Jami’ An-Nur Keramat Empang, Jl. Lolongok, Kel. Empang, Kec. Bogor Selatan, Kota Bogor',
      district: 'Kec. Bogor Selatan',
      city: 'Bogor',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Naruhito_and_Masako_visit_Bogor_Palace_56.jpg',
    imageSource: 'Wikimedia Commons — Kota Pusaka Bogor (Kawasan Masjid An-Nur & Maqbarah Habib Abdullah bin Mukhsin Al-Attas Empang Bogor)',
    sanad:
      'Dzurriyah Rasulullah SAW marga Al-Attas (keturunan Shohibul Ratib Al-Habib Umar bin Abdurrahman Al-Attas) lahir di Desa Haurah, Kasr, Hadramaut; murid Al-Habib Abu Bakar bin Abdullah Al-Attas, Al-Habib Sholeh bin Abdullah Al-Attas (Wadi Amed), dan Al-Habib Ahmad bin Muhammad Al-Muhdhor (Quwairah); mahaguru dari Al-Habib Alwi bin Muhammad bin Thahir Al-Haddad (Mufti Johor) dan Al-Habib Ali bin Abdurrahman Al-Habsyi (Kwitang).',
    karya: [
      'Pendirian Masjid Jami’ An-Nur Keramat Empang Bogor (1318 H / 1900 M) sebagai poros dakwah dan ratib di Jawa Barat',
      'Penyebaran pengamalan Ratib Al-Attas, kajian kitab tasawuf Ihya Ulumuddin, serta pembentukan Kampung Arab Empang Bogor',
    ],
    history:
      'Al-Habib Abdullah bin Mukhsin bin Muhammad Al-Attas lahir di Desa Haurah, kawasan Kasr, lembah Hadramaut (Yaman) pada tahun 1265 H (1849 M). Sejak kecil beliau menghafal Al-Qur’an di bawah bimbingan Syaikh Umar bin Faraj bin Sabbah dan menimba ilmu syariat serta hakikat kepada para kutub auliya Hadramaut, termasuk Al-Habib Sholeh bin Abdullah Al-Attas di Wadi Amed dan Al-Habib Ahmad bin Muhammad Al-Muhdhor di Quwairah. Setelah menunaikan ibadah haji tahun 1282 H dan berziarah ke makam Rasulullah SAW di Madinah, beliau melakukan perjalanan dakwah menuju Nusantara.\n\nSetibanya di Batavia dan kemudian menetap di kawasan Empang, Buitenzorg (Kota Bogor) pada akhir abad ke-19, Habib Abdullah bin Mukhsin Al-Attas membangun Masjid Jami’ An-Nur pada tahun 1318 H (1900 M) di tepi aliran Sungai Cisadane. Keikhlasan ibadah, kemuliaan akhlak, dan kedalaman ilmu tasawuf beliau menjadikan kawasan Empang Bogor sebagai kiblat para penuntut ilmu dan peziarah dari seluruh Pulau Jawa.\n\nMurid utama beliau, Al-Habib Alwi bin Muhammad bin Thahir Al-Haddad (yang kelak menjadi Mufti Kesultanan Johor, Malaysia), membukukan perjalanan hidup, untaian kalam hikmah, dan sanad keilmuan beliau dalam kitab manaqib masyhur berjudul *Al-Anfasul ‘Aliyyah*. Habib Abdullah bin Mukhsin Al-Attas wafat pada hari Selasa, 29 Dzulhijjah 1351 H (25 April 1933 M) dan dimakamkan di dalam kubah barat Masjid Jami’ An-Nur, Kelurahan Empang, Kecamatan Bogor Selatan, Kota Bogor.',
    karomah: [
      'Dalam riwayat manaqib *Al-Anfasul ‘Aliyyah* karya murid beliau Al-Habib Alwi bin Thahir Al-Haddad, dikisahkan bahwa pada masa awal di Batavia ketika Habib Abdullah bin Mukhsin difitnah dan dipenjara secara zalim oleh pemerintah kolonial Belanda, beliau menjalani ujian tersebut dengan penuh kesabaran dan dzikir hingga kepala sipir penjara Belanda beserta keluarganya mengalami kejadian luar biasa yang membuat mereka memohon maaf dan membebaskan beliau dengan penuh penghormatan.<!--more-->\n\nDi kediamannya di Empang Bogor, dapur umum Habib Abdullah bin Mukhsin tidak pernah berhenti mengepul setiap hari untuk memberi makan para tamu, santri, dan fakir miskin yang datang dari berbagai daerah tanpa pernah kekurangan bahan pangan.',
    ],
    untoldStory:
      'Kamar uzlah (khalwat) tempat Al-Habib Abdullah bin Mukhsin Al-Attas beribadah dan bermunajat semasa hidupnya di Empang Bogor masih terawat dengan baik di dekat kompleks Masjid An-Nur, lengkap dengan peninggalan tempat tidur kayu sederhana, jubah, dan tongkat beliau.<!--more-->\n\nKitab *Fathul ‘Arifin* dan *Al-Anfasul ‘Aliyyah* yang merekam perkataan-perkataan hikmah Habib Abdullah bin Mukhsin Al-Attas menegaskan prinsip tasawuf beliau yang lurus: bahwa puncak kemuliaan seorang hamba bukanlah pada keajaiban lahiriah, melainkan pada keteguhan mengikuti sunnah Nabi Muhammad SAW (Istiqamah) dan kebersihan hati dari sifat dengki terhadap sesama muslim.',
    barokahHajat:
      'Peziarah yang berziarah ke Keramat Empang Bogor (Al-Habib Abdullah bin Mukhsin Al-Attas) lazimnya bertawassul memohon keistiqamahan dalam mengamalkan dzikir (khususnya Ratib Al-Attas), kelapangan rezeki yang berkah, serta keselamatan keluarga dari fitnah dan kesulitan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Al-Habib Abdullah bin Mukhsin Al-Attas Empang Bogor',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْغَوْثِ الْعَارِفِ بِاللهِ الْحَبِيبِ عَبْدِ اللهِ بْنِ مُحْسِنٍ الْعَطَّاسْ صَاحِبِ إِمْفَانْج بُوغُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَنْفَاسِهِ الْعَلِيَّةِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْقُطْبِ الْغَوْثِ الْعَارِفِ بِاللهِ الْحَبِيبِ عَبْدِ اللهِ بْنِ مُحْسِنٍ الْعَطَّاسْ صَاحِبِ إِمْفَانْج بُوغُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ انْفَعْنَا بِكَرَامَتِهِ وَأَنْفَاسِهِ الْعَلِيَّةِ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Quthbil-Ghauts Al-'Aarifi billaah Al-Habiib 'Abdillaah bin Muhsin Al-'Aththaas shaahibi Empang Bogor syai-un lillaahi lahumul-Faatihah. Allaahummanfa'naa bi karaamatihii wa anfaasihil-'aliyyati fid-diini wad-dun-yaa wal-aakhirah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah quthb arif billah Al-Habib Abdullah bin Mukhsin Al-Attas Empang Bogor, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan dan hembusan keberkahan luhur beliau di dalam urusan agama, dunia, dan akhirat.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah quthb arif billah Al-Habib Abdullah bin Mukhsin Al-Attas Empang Bogor, Al-Fatihah. Ya Allah, limpahkanlah kepada kami kemanfaatan melalui kemuliaan dan hembusan keberkahan luhur beliau di dalam urusan agama, dunia, dan akhirat.',
      },
    ],
    haulSchedule:
      '28–29 Dzulhijjah / Awal Bulan Muharram (Haul Akbar Nasional Al-Habib Abdullah bin Mukhsin Al-Attas di Kompleks Masjid Jami’ An-Nur Keramat Empang Bogor, serta Majelis Rutin setiap Malam Jumat).',
    localAdab:
      'Wajib mengenakan pakaian muslim yang sopan dan menutup aurat, mengikuti jalur antrean terpisah antara jamaah laki-laki dan perempuan menuju kubah maqbarah Masjid An-Nur, membaca Ratib Al-Attas dan tahlil dengan tertib, serta tidak berdesak-desakan.',
    facilities: ['Masjid Jami’ An-Nur Keramat Empang Bogor', 'Kubah Maqbarah Habib Abdullah bin Mukhsin Al-Attas', 'Tempat Wudhu & Toilet', 'Sentra Busana Muslim & Kuliner Timur Tengah Empang'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Al-Haddad, Alwi bin Muhammad bin Thahir. Al-Anfasul ‘Aliyyah fi Manaqib Al-Habib Abdullah bin Mukhsin Al-Attas.',
      'Shahab, Alwi (2004). Saudagar Baghdad dari Betawi. Republika.',
      'Majelis Taklim & Khalwat Masjid An-Nur Empang Bogor — Risalah Sejarah dan Manaqib Keramat Empang Bogor.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'raden-saleh-syarif-bustaman-bogor',
    name: 'Raden Saleh Syarif Bustaman (Sayyid Saleh bin Husein bin Yahya)',
    title: 'Makam Raden Saleh Syarif Bustaman (Bondongan Bogor)',
    description:
      'Pelukis maestro dunia pelopor seni rupa modern Indonesia dan bangsawan dzurriyah keluarga Kyai Bustam (marga Bin Yahya) yang mengabadikan penangkapan Pangeran Diponegoro.',
    category: 'Auliya Nusantara',
    era: 'Era Kebangkitan Seni & Intelektual Nusantara Abad ke-19 (Mei 1811 – 23 April 1880 M)',
    province: 'Jawa Barat',
    city: 'Bogor',
    district: 'Kec. Bogor Selatan',
    address: 'Jl. Pahlawan Gg. Raden Saleh No. 46, Kel. Empang / Bondongan, Kec. Bogor Selatan, Kota Bogor',
    location: {
      lat: -6.6145,
      lng: 106.7985,
      address: 'Jl. Pahlawan Gg. Raden Saleh No. 46, Kel. Empang / Bondongan, Kec. Bogor Selatan, Kota Bogor',
      district: 'Kec. Bogor Selatan',
      city: 'Bogor',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Naruhito_and_Masako_visit_Bogor_Palace_56.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Cagar Budaya Kota Bogor (Situs Makam Nasional Raden Saleh Syarif Bustaman Bondongan)',
    sanad:
      'Putra Sayyid Husein bin Alwi bin Awal bin Yahya dan Mas Adjeng Zarip Hoesen; cucu dari Kyai Ngabehi Kertoboso Bustam (keluarga besar Bustaman Semarang berdarah Hadramaut marga Bin Yahya); keponakan Bupati Semarang Raden Adipati Surahadimenggolo (pendukung Pangeran Diponegoro).',
    karya: [
      'Mahakarya lukisan sejarah nasional "Penangkapan Pangeran Diponegoro" (1857) — perlawanan simbolik terhadap lukisan kolonial Nicolaas Pieneman',
      'Pelopor penelitian fosil kepurbakalaan di Jawa dan pembangunan Masjid Cikini di halaman kediamannya (kini kawasan RS PGI Cikini / Taman Ismail Marzuki)',
    ],
    history:
      'Raden Saleh Syarif Bustaman lahir di Terboyo, Semarang pada bulan Mei 1811 M dari keluarga bangsawan keturunan Arab-Jawa (keluarga besar Kyai Bustam / marga Bin Yahya). Ayahnya adalah Sayyid Husein bin Alwi bin Awal bin Yahya, sedangkan pamannya yang mengasuh beliau sejak kecil adalah Bupati Semarang Raden Adipati Surahadimenggolo, seorang bangsawan terpelajar yang bersimpati dan mendukung perjuangan Pangeran Diponegoro dalam Perang Jawa (1825–1830).\n\nBakat melukis Raden Saleh yang luar biasa membawanya belajar di Eropa (Belanda, Jerman, Prancis, Italia) selama lebih dari 20 tahun (1829–1851) hingga diakui sebagai maestro aliran Romantisisme di istana-istana Eropa. Sekembalinya ke tanah air pada tahun 1852, meskipun menyandang gelar pelukis istana, hati Raden Saleh tetap berpihak pada kehormatan bangsanya. Pada tahun 1857, beliau menyelesaikan lukisan bersejarah *"Penangkapan Pangeran Diponegoro"* yang menampilkan Sang Pangeran berdiri tegak penuh wibawa dan menatap tajam Jenderal De Kock—sebuah koreksi nasionalis atas lukisan Belanda karya Pieneman.\n\nDi masa tuanya, Raden Saleh bermukim di Buitenzorg (Kota Bogor) bersama istrinya Raden Ayu Danudiredja (kerabat Kesultanan Yogyakarta). Beliau wafat pada hari Jumat, 23 April 1880 M di Bogor dan dimakamkan di kawasan Bondongan (Jl. Pahlawan), Kecamatan Bogor Selatan, Kota Bogor, tidak jauh dari kawasan Empang.',
    karomah: [
      'Dalam riwayat sejarah dan tradisi tutur masyarakat Bogor serta Semarang, Raden Saleh dikenal memiliki keteguhan iman dan kecintaan mendalam terhadap syiar Islam meskipun puluhan tahun hidup di tengah gemerlap bangsawan Eropa; di halaman istana kediamannya di Cikini (Batavia), beliau mendirikan musholla/masjid bagi warga pribumi dan mengikrarkan kalimat tauhid pada prasasti bangunannya.<!--more-->\n\nPada tahun 1869 ketika keponakannya terlibat dalam gerakan perlawanan petani di Bekasi terhadap tuan tanah kolonial, Raden Saleh sempat dicurigai oleh intelijen Hindia Belanda sebagai tokoh spiritual di balik gerakan tersebut sebelum akhirnya beliau memilih menenangkan diri di Bogor.',
    ],
    untoldStory:
      'Pada batu nisan dan monumen makam Raden Saleh Syarif Bustaman di Bondongan Bogor yang dipugar pada tahun 1953 atas perintah langsung Presiden Ir. Soekarno, terukir kalimat penghargaan negara: *"Raden Saleh adalah pendekar seni lukis Indonesia dan pelopor seni rupa nasional"*.<!--more-->\n\nSejarawan Peter Carey dan Werner Kraus mengungkap bahwa keluarga besar Surahadimenggolo–Bustaman tempat Raden Saleh tumbuh memiliki hubungan kekerabatan dengan ulama besar Mufti Betawi Habib Utsman bin Yahya (sama-sama berasal dari marga Bin Yahya), sehingga ziarah ke makam Raden Saleh di Bondongan sering dirangkaikan oleh para pecinta sejarah dengan ziarah ke Keramat Empang Bogor.',
    barokahHajat:
      'Peziarah, seniman, dan pelajar sejarah yang mengunjungi Makam Cagar Budaya Raden Saleh Syarif Bustaman di Bondongan Bogor lazimnya mendoakan ampunan bagi almarhum serta memohon inspirasi kejernihan akal, kemuliaan karya budaya, dan kecintaan kepada tanah air.',
    doaKhusus: [
      {
        title: 'Doa & Hadiah Fatihah Khusus Raden Saleh Syarif Bustaman (Sayyid Saleh bin Husein bin Yahya)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدِ صَالِحِ بْنِ حُسَيْنِ بْنِ عَلَوِي بْنِ يَحْيَى (رَادِينْ صَالِحْ شَرِيفْ بُوسْتَامَانْ بُوغُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ السَّيِّدِ صَالِحِ بْنِ حُسَيْنِ بْنِ عَلَوِي بْنِ يَحْيَى (رَادِينْ صَالِحْ شَرِيفْ بُوسْتَامَانْ بُوغُورْ) شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhis-Sayyid Shaalih bin Husain bin 'Alawii bin Yahyaa (Raden Saleh Syarif Bustaman Bogor) syai-un lillaahi lahumul-Faatihah. Allaahummaghfir lahu warhamhu wa'fu 'anhu wa akrim nuzulah.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyid Saleh bin Husein bin Alwi bin Yahya (Raden Saleh Syarif Bustaman Bogor), Al-Fatihah. Ya Allah, ampunilah beliau, rahmatilah beliau, maafkanlah kekhilafannya, dan muliakanlah tempat peristirahatannya.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh Sayyid Saleh bin Husein bin Alwi bin Yahya (Raden Saleh Syarif Bustaman Bogor), Al-Fatihah. Ya Allah, ampunilah beliau, rahmatilah beliau, maafkanlah kekhilafannya, dan muliakanlah tempat peristirahatannya.',
      },
    ],
    haulSchedule:
      '23 April (Peringatan Wafat & Ziarah Tahunan Komunitas Sejarah, Budayawan, dan Keluarga Besar di Situs Makam Raden Saleh Bondongan Bogor).',
    localAdab:
      'Memasuki gang situs makam Cagar Budaya Raden Saleh di Jl. Pahlawan Bondongan dengan tertib dan sopan, melapor kepada juru pelihara situs setempat, menjaga kebersihan pendopo makam, serta mendoakan almarhum sesuai adab.',
    facilities: ['Pendopo Cagar Budaya Makam Raden Saleh', 'Ruang Informasi Sejarah & Lukisan Reproduksi', 'Tempat Duduk Peziarah'],
    openingHours: '08:00 - 17:00 WIB',
    references: [
      'Kraus, Werner & Vogelsang, Irina (2012). Raden Saleh: Kehidupan dan Karyanya. Kepustakaan Populer Gramedia.',
      'Carey, Peter (2007). Kuasa Ramalan: Pangeran Diponegoro dan Akhir Tatanan Lama di Jawa 1785–1855. KPG.',
      'Balai Pelestarian Cagar Budaya (BPCB) Banten — Data Situs Cagar Budaya Makam Raden Saleh Kota Bogor.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'mama-falak-pagentongan-bogor',
    legacyId: 'ulama-9',
    name: 'Syekh KH. Tubagus Muhammad Falak bin KH. Tubagus Abbas (Mama Falak Pagentongan)',
    title: 'Mama Falak Pagentongan (Bogor Barat)',
    description:
      'Mursyid besar Tarekat Qadiriyah wa Naqsyabandiyah berdarah Kesultanan Banten dan Cirebon, ahli ilmu falak (astronomi Islam) di Makkah, serta pendiri Pesantren Al-Falak Pagentongan Bogor yang dianugerahi usia hingga 130 tahun.',
    category: 'Ulama Nusantara',
    era: 'Era Ulama Haramain & Kemerdekaan RI (1842 – 19 Juli 1972 M / 8 Jumadil Akhir 1392 H)',
    province: 'Jawa Barat',
    city: 'Bogor',
    district: 'Kec. Bogor Barat',
    address: 'Kompleks Pondok Pesantren Al-Falak, Jl. Pagentongan, Kel. Loji, Kec. Bogor Barat, Kota Bogor',
    location: {
      lat: -6.5812,
      lng: 106.7685,
      address: 'Kompleks Pondok Pesantren Al-Falak, Jl. Pagentongan, Kel. Loji, Kec. Bogor Barat, Kota Bogor',
      district: 'Kec. Bogor Barat',
      city: 'Bogor',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Naruhito_and_Masako_visit_Bogor_Palace_56.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Kota Bogor (Kawasan Pesantren & Maqbarah Mama Falak Pagentongan)',
    sanad:
      'Putra KH. Tubagus Abbas bin KH. Tubagus Abdul Halim (Pandeglang, keturunan Sultan Maulana Hasanuddin Banten dan Sunan Gunung Jati Cirebon); murid Syekh Nawawi Al-Bantani, Syekh Abdul Karim Tanara Al-Bantani (Mursyid TQN), Syekh Zaini Dahlan, dan Sayyid Utsman Syatha di Makkah.',
    karya: [
      'Pendirian Pondok Pesantren Al-Falak Pagentongan Bogor (1901 M) sebagai pusat ilmu falak, fikih, dan Tarekat Qadiriyah wa Naqsyabandiyah',
      'Penyusunan hisab taqwim (kalender astronomi Islam) dan pembinaan laskar perjuangan kemerdekaan di wilayah Bogor dan Banten',
    ],
    history:
      'Syekh KH. Tubagus Muhammad Falak bin KH. Tubagus Abbas, yang sangat masyhur dengan panggilan Abah Falak atau Mama Falak Pagentongan, lahir di Sabi, Pandeglang, Banten sekitar tahun 1842 M dengan nama kecil Tubagus Muhammad bin Abbas. Setelah menghafal Al-Qur’an dan menimba ilmu di berbagai pesantren Banten serta Cirebon, beliau berangkat ke Makkah Al-Mukarramah pada tahun 1857 M dan bermukim selama lebih dari dua puluh tahun.\n\nDi Tanah Suci Makkah, beliau berguru kepada Sayyidul Ulama Al-Hijaz Syekh Nawawi Al-Bantani, Syekh Ahmad Zaini Dahlan, serta mendalami ilmu astronomi Islam (ilmu falak) dengan sangat cemerlang hingga para ulama Haramain menganugerahkan gelar kehormatan "Al-Falak" kepada beliau. Dalam bidang tasawuf, beliau dibaiat dan diangkat sebagai mursyid Tarekat Qadiriyah wa Naqsyabandiyah oleh Syekh Abdul Karim Tanara Al-Bantani.\n\nSekembalinya ke tanah air dan sempat turut serta dalam jaringan perlawanan ulama Banten terhadap kolonial Belanda, beliau berhijrah ke kawasan Pagentongan, Loji, Kota Bogor dan mendirikan Pondok Pesantren Al-Falak pada tahun 1901 M. Mama Falak juga merupakan salah satu tokoh sepuh pendiri Nahdlatul Ulama di Jawa Barat dan pembimbing rohani para pejuang kemerdekaan. Beliau dianugerahi usia yang sangat panjang sekitar 130 tahun hingga wafat pada tanggal 19 Juli 1972 M (8 Jumadil Akhir 1392 H) dan dimakamkan di kompleks Pesantren Al-Falak Pagentongan, Bogor Barat.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian para ulama Jawa Barat, karomah Mama Falak Pagentongan tampak pada keberkahan usia beliau yang mencapai sekitar 130 tahun dalam keadaan sehat wal afiat, ingatan yang tetap tajam, serta pandangan mata batin yang jernih dalam membimbing ribuan murid tarekat dan pejabat negara yang datang meminta nasihat.<!--more-->\n\nPada masa revolusi fisik mempertahankan kemerdekaan RI tahun 1945–1949 di Bogor, Pondok Pesantren Al-Falak Pagentongan menjadi markas perlindungan para pejuang Hizbullah dan Sabilillah yang selamat dari kepungan tentara NICA berkat munajat dan riyadhoh dzikir yang dipimpin langsung oleh Mama Falak.',
    ],
    untoldStory:
      'Gelar "Falak" yang kini menjadi nama keluarga dan nama resmi Pondok Pesantren Al-Falak Pagentongan Bogor adalah bukti sejarah bahwa ulama pesantren tradisional Nusantara pada abad ke-19 telah menguasai sains astronomi dan matematika bola langit (*Ilmu Falak*) di tingkat tertinggi di Makkah.<!--more-->\n\nDi kompleks Pesantren Al-Falak Pagentongan masih tersimpan bedug tua bersejarah dan masjid kuno tempat Mama Falak mengajar selama lebih dari tujuh dekade, yang setiap pekannya dipadati jamaah manaqib Syekh Abdul Qadir Al-Jailani.',
    barokahHajat:
      'Peziarah dan penuntut ilmu yang berziarah ke maqbarah Mama Falak Pagentongan Bogor umumnya bertawassul memohon keberkahan umur panjang yang sehat dalam ibadah, kecerdasan menguasai ilmu agama dan sains (ilmu falak/hisab), serta ketenteraman batin.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Syekh KH. Tubagus Muhammad Falak Pagentongan Bogor',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَالْعَالِمِ الْفَلَكِيِّ الشَّيْخِ تُوبَاغُوسْ مُحَمَّدْ فَلَكْ بْنِ عَبَّاسْ فَاغِينْتُونْغَانْ بُوغُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بارِكْ فِي أَعْمَارِنَا وَعُلُومِنَا وَانْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَارِفِ بِاللهِ وَالْعَالِمِ الْفَلَكِيِّ الشَّيْخِ تُوبَاغُوسْ مُحَمَّدْ فَلَكْ بْنِ عَبَّاسْ فَاغِينْتُونْغَانْ بُوغُورْ شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ بارِكْ فِي أَعْمَارِنَا وَعُلُومِنَا وَانْفَعْنَا بِكَرَامَتِهِ وَأَسْرَارِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aarifi billaah wal-'Aalimil-Falakii Asy-Syaikh Tuubaaguus Muhammad Falak bin 'Abbaas Pagentongan Bogor syai-un lillaahi lahumul-Faatihah. Allaahumma baarik fii a'maarinaa wa 'uluuminaa wanfa'naa bi karaamatihii wa asraarih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah dan ulama ahli falak Syekh KH. Tubagus Muhammad Falak bin Abbas Pagentongan Bogor, Al-Fatihah. Ya Allah, berkahilah usia dan ilmu kami serta limpahkanlah kemanfaatan melalui kemuliaan dan rahasia keshalihan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh waliyullah arif billah dan ulama ahli falak Syekh KH. Tubagus Muhammad Falak bin Abbas Pagentongan Bogor, Al-Fatihah. Ya Allah, berkahilah usia dan ilmu kami serta limpahkanlah kemanfaatan melalui kemuliaan dan rahasia keshalihan beliau.',
      },
    ],
    haulSchedule:
      '8 Jumadil Akhir / Bulan Juli (Haul Akbar Tahunan Abah Mama Falak di Kompleks Pondok Pesantren Al-Falak Pagentongan, Loji, Bogor Barat).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat, menjaga ketenangan kegiatan belajar-mengajar santri di Pondok Pesantren Al-Falak Pagentongan, melepas alas kaki di serambi kubah makam, serta mengikuti arahan pengurus pesantren.',
    facilities: ['Masjid & Pondok Pesantren Al-Falak Pagentongan', 'Kubah Maqbarah Mama Falak', 'Tempat Wudhu & Toilet', 'Area Parkir Peziarah'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ruhimat, Mumu dkk. (2015). Biografi Ulama-Ulama Jawa Barat. Puslitbang Lektur dan Khazanah Keagamaan Kemenag RI.',
      'Bruinessen, Martin van (1992). Tarekat Naqsyabandiyah di Indonesia. Mizan.',
      'Yayasan Pondok Pesantren Al-Falak Pagentongan Bogor — Manaqib Syekh KH. Tubagus Muhammad Falak.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'eyang-dalem-abdul-manaf-mahmud',
    legacyId: 'auliya-3',
    name: 'Syekh Eyang Dalem Haji Abdul Manaf (Pendiri Kampung Adat Mahmud)',
    title: 'Eyang Dalem Abdul Manaf (Kampung Adat Mahmud Bandung)',
    description:
      'Ulama sufi keturunan Syarif Hidayatullah (Sunan Gunung Jati) yang mendirikan Kampung Adat Islami Mahmud di tepi Sungai Citarum sebagai benteng akidah dari intervensi kolonial VOC.',
    category: 'Auliya Nusantara',
    era: 'Era Islamisasi Cekungan Bandung & Perlawanan Kultural VOC (Abad ke-17–18 M)',
    province: 'Jawa Barat',
    city: 'Bandung',
    district: 'Kec. Margaasih',
    address: 'Kampung Adat Mahmud, Desa Mekarrahayu, Kec. Margaasih, Kabupaten Bandung',
    location: {
      lat: -6.9605,
      lng: 107.5472,
      address: 'Kampung Adat Mahmud, Desa Mekarrahayu, Kec. Margaasih, Kabupaten Bandung',
      district: 'Kec. Margaasih',
      city: 'Bandung',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Kampung Adat & Sejarah Islam Jawa Barat (Kawasan Makam Eyang Dalem Abdul Manaf Mahmud Bandung)',
    sanad:
      'Putra Sembah Dalem Bojong (keturunan jalur Pangeran Cakrabuana / Syarif Hidayatullah Cirebon dan bangsawan Sukapura); bermukim dan beruzlah di Tanah Suci Makkah sebelum kembali ke Bandung.',
    karya: [
      'Pendirian Kampung Adat Islami "Mahmud" di tepian melingkar Sungai Citarum (Margaasih, Kabupaten Bandung) dengan segenggam tanah dari Makkah',
      'Penetapan aturan adat kesederhanaan (zuhud) dan kemurnian tauhid bagi warga dan keturunan Kampung Mahmud',
    ],
    history:
      'Syekh Eyang Dalem Haji Abdul Manaf adalah seorang ulama sufi berdarah bangsawan Sunda-Cirebon yang hidup sekitar akhir abad ke-17 hingga paruh pertama abad ke-18 M. Melihat semakin kuatnya cengkeraman politik dan budaya kolonial VOC Belanda di wilayah Priangan kala itu, beliau berangkat menunaikan ibadah haji dan bermukim cukup lama di Tanah Suci Makkah untuk memperdalam ilmu tauhid, fikih, dan tasawuf.\n\nSebelum bertolak kembali ke tanah Jawa, Eyang Dalem Abdul Manaf berdoa di dekat Gubah Mahmud (dekat Masjidil Haram Makkah) memohon petunjuk tempat yang aman bagi anak-keturunan dan santrinya untuk menjaga kemurnian iman tanpa dijamah penjajah. Beliau membawa pulang segenggam tanah dari Makkah dan menebarkannya di sebuah lahan rawa yang dikelilingi aliran melingkar Sungai Citarum di wilayah selatan-barat Bandung, lalu menamakan perkampungan tersembunyi tersebut sebagai "Kampung Mahmud".\n\nDi Kampung Mahmud (kini Desa Mekarrahayu, Kecamatan Margaasih, Kabupaten Bandung), Eyang Dalem Abdul Manaf mendidik para santri dan keluarganya dengan prinsip hidup zuhud (kesederhanaan), kemandirian pertanian/pertukangan, serta keteguhan ibadah. Hingga wafatnya, kawasan Kampung Mahmud tidak pernah berhasil ditembus oleh patroli kolonial Belanda maupun Jepang. Makam beliau beserta murid-murid utamanya (Eyang Agung Zaenal Arif dan Eyang Abdullah Gedug) terletak di kompleks makam keramat Kampung Adat Mahmud.',
    karomah: [
      'Dalam riwayat manaqib dan tradisi tutur masyarakat Bandung, dikisahkan bahwa selama ratusan tahun di masa penjajahan Belanda dan pendudukan Jepang, Kampung Mahmud yang dirintis dengan taburan tanah suci Makkah oleh Eyang Dalem Abdul Manaf selalu tampak seperti hutan rawa tak berpenghuni di mata serdadu penjajah, sehingga menjadi tempat persembunyian yang aman bagi para ulama dan pejuang Bandung.<!--more-->\n\nWarga adat Kampung Mahmud juga memegang teguh wasiat dan amanat simbolis Eyang Dalem Abdul Manaf—seperti larangan membangun rumah gedung berkaca mewah, larangan memukul gong/musik hura-hura, dan larangan memelihara angsa atau kambing—yang sejatinya merupakan pengajaran tasawuf agar warga selalu hidup rendah hati, tenang dalam berdzikir, dan menjaga kesucian lingkungan masjid.',
    ],
    untoldStory:
      'Berbeda dengan kampung adat Sunda lainnya yang berakar pada tradisi pra-Islam, Kampung Adat Mahmud di Margaasih Bandung adalah satu-satunya kampung adat di Cekungan Bandung yang 100% berfondasikan syariat Islam dan nilai-nilai tasawuf sejak awal pendiriannya.<!--more-->\n\nDari garis keturunan (dzurriyah) dan murid-murid Eyang Dalem Haji Abdul Manaf di Kampung Mahmud inilah lahir banyak kiai dan ajengan besar yang mendirikan pesantren-pesantren di kawasan Soreang, Cililin, Cimahi, dan Kota Bandung.',
    barokahHajat:
      'Peziarah yang berziarah ke maqbarah Eyang Dalem Haji Abdul Manaf di Kampung Adat Mahmud lazimnya bertawassul memohon perlindungan keluarga dari fitnah akhir zaman, kesucian hati dalam hidup sederhana dan qana’ah, serta dikaruniai rezeki untuk dapat menunaikan ibadah haji dan umrah ke Tanah Suci Makkah.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Eyang Dalem Haji Abdul Manaf (Kampung Mahmud Bandung)',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الزَّاهِدِ الشَّيْخِ الْحَاجِّ عَبْدِ الْمَنَافْ صَاحِبِ مَحْمُودْ بَانْدُونْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْ إِيمَانَنَا وَذُرِّيَّاتِنَا وَارْزُقْنَا زِيَارَةَ بَيْتِكَ الْحَرَامِ بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْوَلِيِّ الصَّالِحِ الزَّاهِدِ الشَّيْخِ الْحَاجِّ عَبْدِ الْمَنَافْ صَاحِبِ مَحْمُودْ بَانْدُونْج شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ احْفَظْ إِيمَانَنَا وَذُرِّيَّاتِنَا وَارْزُقْنَا زِيَارَةَ بَيْتِكَ الْحَرَامِ بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-Waliyyish-Shaalih Az-Zaahid Asy-Syaikh Al-Haajj 'Abdil-Manaaf shaahibi Mahmud Bandung syai-un lillaahi lahumul-Faatihah. Allaahummahfazh iimaananaa wa dzurriyyaatinaa warzuqnaa ziyaarata Baitikal-Haraam bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih lagi zuhud Syekh Eyang Dalem Haji Abdul Manaf Kampung Mahmud Bandung, Al-Fatihah. Ya Allah, peliharalah iman kami dan anak-keturunan kami serta karuniakanlah kepada kami rezeki berziarah ke Baitullah Al-Haram dengan keberkahan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh wali yang shalih lagi zuhud Syekh Eyang Dalem Haji Abdul Manaf Kampung Mahmud Bandung, Al-Fatihah. Ya Allah, peliharalah iman kami dan anak-keturunan kami serta karuniakanlah kepada kami rezeki berziarah ke Baitullah Al-Haram dengan keberkahan beliau.',
      },
    ],
    haulSchedule:
      'Bulan Muharram, Rabiul Awal (Mulud), dan Rajab (Tradisi Ziarah Akbar & Pengajian di Kompleks Makam Keramat Kampung Adat Mahmud, Margaasih, Kabupaten Bandung).',
    localAdab:
      'Menghormati aturan adat kesopanan Kampung Mahmud: berpakaian muslim menutup aurat, tidak membuat kegaduhan atau membunyikan musik keras, melepas alas kaki saat memasuki pelataran maqbarah, dan mengikuti arahan sesepuh kuncen Kampung Mahmud.',
    facilities: ['Masjid Agung Kampung Adat Mahmud', 'Kompleks Maqbarah Eyang Dalem Abdul Manaf', 'Rumah Adat Panggung Sunda Mahmud', 'Jembatan Citarum & Area Parkir Bus'],
    openingHours: 'Buka 24 Jam',
    references: [
      'Ekadjati, Edi S. (1975). Penyebaran Agama Islam di Jawa Barat. Pustaka Jaya.',
      'Balai Pelestarian Nilai Budaya (BPNB) Jawa Barat — Kajian Kearifan Lokal Kampung Adat Mahmud Kabupaten Bandung.',
      'Dinas Pariwisata dan Kebudayaan Provinsi Jawa Barat — Profil Desa Wisata Religi Kampung Adat Mahmud.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
  {
    id: 'kh-noer-ali-bekasi',
    legacyId: 'ulama-30',
    name: 'KH. Noer Ali (Singa Karawang-Bekasi / Pahlawan Nasional)',
    title: 'KH. Noer Ali (Pesantren Attaqwa Ujung Harapan Bekasi)',
    description:
      'Ulama pejuang kemerdekaan berjuluk "Singa Karawang-Bekasi", komandan Laskar Rakyat Hizbullah, pendiri Pondok Pesantren Attaqwa Bekasi, dan Pahlawan Nasional RI.',
    category: 'Ulama Nusantara',
    era: 'Era Revolusi Kemerdekaan & Pembangunan Pendidikan Islam (15 Juli 1914 – 29 Januari 1992 M)',
    province: 'Jawa Barat',
    city: 'Bekasi',
    district: 'Kec. Babelan',
    address: 'Kompleks Pondok Pesantren Attaqwa Putri, Jl. KH. Noer Ali, Kel. Bahagia (Ujung Harapan), Kec. Babelan, Kabupaten Bekasi',
    location: {
      lat: -6.1785,
      lng: 107.0185,
      address: 'Kompleks Pondok Pesantren Attaqwa Putri, Jl. KH. Noer Ali, Kel. Bahagia (Ujung Harapan), Kec. Babelan, Kabupaten Bekasi',
      district: 'Kec. Babelan',
      city: 'Bekasi',
      province: 'Jawa Barat',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg',
    imageSource: 'Wikimedia Commons — Khazanah Sejarah Perjuangan Bekasi-Karawang (Kawasan Pesantren Attaqwa & Makam Pahlawan Nasional KH. Noer Ali)',
    sanad:
      'Putra H. Anwar bin H. Layu dan Hj. Maimunah binti H. Idris; murid utama Guru Marzuki Cipinang Muara (Jakarta), serta ulama Masjidil Haram Makkah (1934–1940): Syekh Ali Al-Maliki, Syekh Umar Hamdan, Syekh Ahmad Fatani, Syekh Muhammad Amin Al-Quthbi, dan Syekh Abdul Zalil.',
    karya: [
      'Kepemimpinan Laskar Rakyat dan Batalyon III Hizbullah Bekasi-Karawang dalam Pertempuran Sasak Kapuk dan Rawa Gede (1945–1949)',
      'Pendirian Yayasan Pembangunan, Pemeliharaan dan Pertolongan Islam (P3I) yang berkembang menjadi Pondok Pesantren Attaqwa Ujung Harapan Bekasi dengan puluhan cabang masjid dan madrasah',
    ],
    history:
      'KH. Noer Ali lahir di Kampung Ujung Malang (yang kemudian beliau ubah namanya menjadi Ujung Harapan), Babelan, Bekasi pada tanggal 15 Juli 1914 M dari pasangan H. Anwar bin H. Layu dan Hj. Maimunah. Setelah belajar agama kepada Guru Mughni Ujung Malang dan menjadi santri kesayangan Mahaguru Betawi KH. Ahmad Marzuki di Cipinang Muara, beliau berangkat ke Makkah Al-Mukarramah pada tahun 1934 M dan menuntut ilmu selama enam tahun kepada Syekh Ali Al-Maliki, Syekh Umar Hamdan, dan Syekh Muhammad Amin Al-Quthbi.\n\nSekembalinya ke tanah air pada tahun 1940 M, KH. Noer Ali mendirikan pesantren di Ujung Malang. Ketika Proklamasi Kemerdekaan RI dikumandangkan tahun 1945 dan pasukan Sekutu serta NICA Belanda mencoba menduduki kembali Bekasi dan Jakarta Timur, KH. Noer Ali tampil memimpin Laskar Rakyat dan Batalyon Hizbullah dalam berbagai pertempuran sengit di Pondok Ungu, Sasak Kapuk, hingga Karawang, sehingga penyair Chairil Anwar mengabadikan heroisme jalur perjuangan tersebut dalam puisi *"Karawang-Bekasi"*.\n\nPasca-pengakuan kedaulatan RI, KH. Noer Ali mengubah nama desanya dari "Ujung Malang" menjadi "Ujung Harapan" sebagai simbol optimisme umat, lalu membangun jaringan pendidikan Pondok Pesantren Attaqwa yang melahirkan ratusan masjid dan madrasah di Bekasi dan Jakarta. Beliau wafat pada tanggal 29 Januari 1992 M, dimakamkan di kompleks Pesantren Attaqwa Putri Ujung Harapan, Babelan, Bekasi, dan dianugerahi gelar Pahlawan Nasional melalui Keputusan Presiden RI Nomor 085/TK/Tahun 2006.',
    karomah: [
      'Dalam riwayat manaqib dan kesaksian para pejuang Hizbullah Bekasi, dikisahkan sebuah strategi dan karomah keberanian KH. Noer Ali pada tahun 1947 ketika ribuan warga Rawa Gede dibantai tentara Belanda; untuk membungkam klaim Belanda di hadapan Komisi Tiga Negara (PBB) bahwa "tidak ada lagi pejuang Republik di Bekasi", KH. Noer Ali memerintahkan pasukannya mengibarkan ratusan bendera Merah Putih berukuran kecil di atas pepohonan tinggi di sepanjang jalan kereta api Jakarta–Karawang dalam satu malam tanpa terdeteksi patroli musuh.<!--more-->\n\nKetulusan visi beliau ketika mengganti nama kampung kelahirannya dari "Ujung Malang" (Ujung Kemalangan) menjadi "Ujung Harapan" pada tahun 1950-an terbukti menjadi doa yang makbul: kawasan rawa yang dahulu miskin dan terisolasi kini bertransformasi menjadi kota santri yang makmur dengan ribuan penghafal Al-Qur’an dan pelajar.',
    ],
    untoldStory:
      'Saat masih menuntut ilmu di Makkah pada akhir tahun 1930-an bersama sahabat karibnya KH. Abdul Halim dan para mahasiswa Jawi lainnya, KH. Noer Ali muda pernah berdebat langsung di hadapan Konsul Belanda untuk membela hak-hak jamaah haji dan pelajar Indonesia di Hijaz.<!--more-->\n\nHingga akhir hayatnya, KH. Noer Ali menerapkan manajemen organisasi Islam modern yang tertib melalui konsep "Masjid sebagai Pusat Komando Umat", di mana setiap alumni Pesantren Attaqwa diwajibkan membina masjid dan madrasah di kampung halamannya masing-masing.',
    barokahHajat:
      'Peziarah, santri, dan masyarakat yang berziarah ke makam Pahlawan Nasional KH. Noer Ali di Ujung Harapan Bekasi umumnya bertawassul memohon semangat juang dan optimisme hidup ("Ujung Harapan"), keberkahan pendidikan anak-anak di pesantren, serta ketangguhan memimpin organisasi kemasyarakatan.',
    doaKhusus: [
      {
        title: 'Tawassul & Hadiah Fatihah Khusus Pahlawan Nasional KH. Noer Ali Bekasi',
        arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّيْخِ الْحَاجِّ نُورْ عَلِي بْنِ أَنْوَارْ مُؤَسِّسِ مَعْهَدِ التَّقْوَى بِكَاسِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا التَّقْوَى وَالْإِخْلَاصَ فِي الْجِهَادِ وَالْعِلْمِ بِبَرَكَتِهِ.',
        text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ إِلَى رُوحِ الْعَالِمِ الْمُجَاهِدِ الشَّيْخِ الْحَاجِّ نُورْ عَلِي بْنِ أَنْوَارْ مُؤَسِّسِ مَعْهَدِ التَّقْوَى بِكَاسِي شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ. اللّٰهُمَّ ارْزُقْنَا التَّقْوَى وَالْإِخْلَاصَ فِي الْجِهَادِ وَالْعِلْمِ بِبَرَكَتِهِ.',
        latin:
          "Ilaa hadhratin-Nabiyyil-Mushthafaa Muhammadin shallallaahu 'alaihi wa sallama, tsumma ilaa ruuhil-'Aalimil-Mujaahid Asy-Syaikh Al-Haajj Nuur 'Alii bin Anwaar mu-assisi Ma'hadit-Taqwaa Bekasi syai-un lillaahi lahumul-Faatihah. Allaahummarzuqnat-taqwaa wal-ikhlaasha fil-jihaadi wal-'ilmi bi barakatih.",
        terjemahan:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang KH. Noer Ali bin H. Anwar pendiri Pondok Pesantren Attaqwa Bekasi, Al-Fatihah. Ya Allah, karuniakanlah kepada kami ketakwaan dan keikhlasan dalam berjuang serta menuntut ilmu dengan keberkahan beliau.',
        translation:
          'Kepada kehadirat Nabi Agung Muhammad SAW, kemudian khusus kepada ruh ulama pejuang KH. Noer Ali bin H. Anwar pendiri Pondok Pesantren Attaqwa Bekasi, Al-Fatihah. Ya Allah, karuniakanlah kepada kami ketakwaan dan keikhlasan dalam berjuang serta menuntut ilmu dengan keberkahan beliau.',
      },
    ],
    haulSchedule:
      'Bulan Januari / Bulan Rajab–Sya’ban (Haul Akbar Nasional Pahlawan Nasional KH. Noer Ali di Kompleks Pondok Pesantren Attaqwa Ujung Harapan, Babelan, Kabupaten Bekasi).',
    localAdab:
      'Mengenakan pakaian muslim sopan dan menutup aurat karena maqbarah berada di dalam Kompleks Pondok Pesantren Attaqwa Putri Ujung Harapan, menjaga ketertiban dan kebersihan lingkungan pesantren, serta mengikuti jadwal kunjungan maqbarah.',
    facilities: ['Masjid Jami’ Attaqwa Ujung Harapan', 'Kompleks Maqbarah Pahlawan Nasional KH. Noer Ali', 'Museum & Perpustakaan KH. Noer Ali', 'Area Parkir Bus Luas'],
    openingHours: '07:00 - 21:00 WIB',
    references: [
      'Ali, Muhamad (2006). KH. Noer Ali: Kemandirian Ulama Pejuang. Yayasan Attaqwa Bekasi.',
      'Kiki, Rakhmad Zailani dkk. (2011). Genealogi Intelektual Ulama Betawi. Jakarta Islamic Centre.',
      'Keputusan Presiden Republik Indonesia Nomor 085/TK/Tahun 2006 tentang Penganugerahan Gelar Pahlawan Nasional kepada KH. Noer Ali.',
    ],
    verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
    lastVerified: '2026-11-11',
  },
];


