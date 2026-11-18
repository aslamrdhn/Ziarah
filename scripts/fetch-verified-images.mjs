import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

register();

const { SITES } = await import('../src/data/sites.ts');
const {
  FIRST_12_THUMB_BY_ID,
  BANNED_PHOTO_SUBSTRINGS,
  REQUIRED_HERITAGE_KEYWORDS,
  WHITELISTED_HISTORICAL_PORTRAIT_TOKENS,
  isValidPhotoUrl,
} = await import('../src/lib/authenticSiteImages.ts');
const { getSiteSlug } = await import('../src/lib/siteSlugs.ts');

const USER_AGENT =
  'ZiarahNusantaraStrictCurator/3.1 (https://ziarahnusantara.my.id; contact@ziarahnusantara.my.id) Node/20';

/**
 * Curated whitelist of specific Wikipedia articles (biography / tomb / mosque / pesantren / keraton)
 * and specific Commons queries. NEVER includes plain city/regency/district names!
 */
const CURATED_WHITELIST = {
  // DKI Jakarta, Banten & Jawa Barat
  'habib-ahmad-bin-alwi-al-haddad': {
    wiki: [],
    commons: ['Masjid At-Taubah Kalibata', 'Makam Habib Kuncung'],
  },
  'habib-utsman-bin-yahya': {
    wiki: ['Utsman_bin_Yahya'],
    commons: ['Uthman bin Yahya', 'Utsman bin Yahya', 'Makam Habib Utsman Pondok Bambu'],
  },
  'pangeran-jayakarta': {
    wiki: ['Pangeran_Jayakarta', 'Masjid_Assalafiyah'],
    commons: ['Masjid Assalafiyah Jatinegara Kaum', 'Makam Pangeran Jayakarta'],
  },
  'guru-marzuki-cipinang': {
    wiki: ['Ahmad_Marzuki_bin_Mirshod'],
    commons: ['Masjid Jami Al-Marzuqiyah', 'Makam Guru Marzuki'],
  },
  'sultan-maulana-hasanuddin': {
    wiki: ['Masjid_Agung_Banten', 'Maulana_Hasanuddin_dari_Banten'],
    commons: ['Masjid Agung Banten', 'Makam Sultan Maulana Hasanuddin'],
  },
  'sultan-maulana-yusuf': {
    wiki: ['Maulana_Yusuf_dari_Banten', 'Keraton_Surosowan'],
    commons: ['Makam Maulana Yusuf Banten', 'Masjid Pakalongan Banten', 'Keraton Surosowan Banten'],
  },
  'sultan-ageng-tirtayasa': {
    wiki: ['Ageng_Tirtayasa_dari_Banten'],
    commons: ['Sultan Ageng Tirtayasa', 'Masjid Sultan Ageng Tirtayasa'],
  },
  'syekh-maulana-mansyur-cikaduen': {
    wiki: ['Masjid_Cikadueun'],
    commons: ['Makam Syekh Mansyur Cikadueun', 'Masjid Cikadueun Pandeglang'],
  },
  'syekh-asnawi-caringin': {
    wiki: ['Asnawi_Caringin'],
    commons: ['Masjid Caringin Labuan', 'Makam Syekh Asnawi Caringin'],
  },
  'syekh-nawawi-al-bantani': {
    wiki: ['Nawawi_al-Bantani'],
    commons: ['Nawawi al-Bantani', 'Masjid Tanara Serang'],
  },
  'habib-abdullah-empang-bogor': {
    wiki: [],
    commons: ['Masjid Keramat Empang Bogor', 'Masjid An-Nur Empang Bogor', 'Makam Habib Empang Bogor'],
  },
  'raden-saleh-syarif-bustaman-bogor': {
    wiki: ['Raden_Saleh'],
    commons: ['Makam Raden Saleh Bogor', 'Raden Saleh'],
  },
  'mama-falak-pagentongan-bogor': {
    wiki: ['Tubagus_Muhammad_Falak'],
    commons: ['Pesantren Pagentongan Bogor', 'Makam Mama Falak'],
  },
  'syekh-quro-karawang': {
    wiki: ['Syekh_Quro'],
    commons: ['Masjid Agung Syekh Quro Karawang', 'Makam Syekh Quro Pulobata'],
  },
  'syekh-bentong-karawang': {
    wiki: [],
    commons: ['Makam Quro dan Bentong', 'Makam Syekh Bentong'],
  },
  'eyang-dalem-abdul-manaf-mahmud': {
    wiki: ['Kampung_Adat_Mahmud'],
    commons: ['Kampung Mahmud Mosque', 'Masjid Kampung Adat Mahmud'],
  },
  'kh-noer-ali-bekasi': {
    wiki: ['Noer_Ali'],
    commons: ['Masjid Agung Al-Barkah Bekasi', 'Makam KH Noer Ali Ujung Harapan'],
  },
  'syekh-datuk-kahfi': {
    wiki: ['Syekh_Datuk_Kahfi'],
    commons: ['Astana Gunung Jati Cirebon', 'Makam Syekh Datuk Kahfi'],
  },
  'pangeran-cakrabuana': {
    wiki: ['Keraton_Kasepuhan', 'Pangeran_Cakrabuana'],
    commons: ['Keraton Kasepuhan Cirebon', 'Makam Gunung Sembung Cirebon'],
  },
  'syekh-magelung-sakti': {
    wiki: ['Masjid_Agung_Sang_Cipta_Rasa'],
    commons: ['Masjid Agung Sang Cipta Rasa', 'Makam Syekh Magelung Sakti'],
  },
  'syekh-abdul-muhyi-pamijahan': {
    wiki: ['Abdul_Muhyi'],
    commons: ['Makam Syekh Abdul Muhyi Pamijahan', 'Masjid Pamijahan Tasikmalaya'],
  },
  'mama-cibaduyut-kudang': {
    wiki: [],
    commons: ['Makam Mama Cibaduyut', 'Makam Mama Kudang'],
  },
  'syekh-jafar-shadiq-cibiuk': {
    wiki: [],
    commons: ['Makam Syekh Jafar Shadiq Cibiuk'],
  },
  'sunan-rohmat-godog': {
    wiki: ['Sunan_Rohmat'],
    commons: ['Makam Keramat Godog Garut', 'Makam Sunan Rohmat Suci'],
  },
  'dalem-cikundul-cianjur': {
    wiki: ['Raden_Aria_Wira_Tanu_I'],
    commons: ['Makam Dalem Cikundul Cianjur'],
  },
  'mama-gentur-cianjur': {
    wiki: [],
    commons: ['Pesantren Gentur Cianjur', 'Makam Mama Gentur'],
  },
  'mama-sempur-purwakarta': {
    wiki: ['Tubagus_Ahmad_Bakri'],
    commons: ['Makam Mama Sempur Purwakarta', 'Masjid Agung Baing Yusuf Purwakarta'],
  },
  'kh-abdul-halim-majalengka': {
    wiki: ['Abdul_Halim_(ulama)', 'Abdul_Halim_Majalengka'],
    commons: ['Abdul Halim Majalengka', 'Masjid Agung Al-Imam Majalengka'],
  },
  'pangeran-achmad-djajadiningrat': {
    wiki: ['Achmad_Djajadiningrat'],
    commons: ['Achmad Djajadiningrat'],
  },
  'keramat-kampung-bandan': {
    wiki: ['Masjid_Al-Mukarromah_Kampung_Bandan'],
    commons: ['Masjid Al-Mukarromah Kampung Bandan', 'Masjid Kampung Bandan'],
  },

  // Jawa Tengah & DI Yogyakarta
  'raden-patah-demak': {
    wiki: ['Masjid_Agung_Demak'],
    commons: ['Makam Raden Patah Demak', 'Masjid Agung Demak'],
  },
  'syekh-jangkung-pati': {
    wiki: ['Saridin'],
    commons: ['Makam Syekh Jangkung Landoh', 'Masjid Landoh Kayen'],
  },
  'syekh-mutamakkin-kajen': {
    wiki: ['Ahmad_Mutamakkin'],
    commons: ['Makam Syekh Ahmad Mutamakkin Kajen', 'Masjid Kajen Pati'],
  },
  'ratu-kalinyamat-jepara': {
    wiki: ['Masjid_Mantingan', 'Ratu_Kalinyamat'],
    commons: ['Masjid Mantingan Jepara', 'Makam Ratu Kalinyamat Mantingan'],
  },
  'habib-ahmad-sapuro': {
    wiki: [],
    commons: ['Makam Habib Ahmad Sapuro Pekalongan', 'Masjid Jami Pekalongan'],
  },
  'habib-hasyim-bin-yahya-pekalongan': {
    wiki: [],
    commons: ['Makam Habib Hasyim Pekalongan'],
  },
  'ki-ageng-pandanaran-semarang': {
    wiki: ['Ki_Ageng_Pandan_Arang'],
    commons: ['Masjid Agung Kauman Semarang', 'Makam Ki Ageng Pandanaran'],
  },
  'sunan-pandanaran-bayat': {
    wiki: ['Sunan_Pandanaran'],
    commons: ['Makam Sunan Pandanaran Bayat', 'Masjid Bayat Klaten'],
  },
  'kh-sholeh-darat-semarang': {
    wiki: ['Sholeh_Darat'],
    commons: ['Makam KH Sholeh Darat Bergota', 'Sholeh Darat'],
  },
  'sunan-katong-kaliwungu': {
    wiki: [],
    commons: ['Masjid Agung Al-Muttaqin Kaliwungu', 'Makam Sunan Katong Kaliwungu'],
  },
  'syekh-subakir-tidar': {
    wiki: ['Gunung_Tidar'],
    commons: ['Makam Syekh Subakir Gunung Tidar', 'Gunung Tidar Magelang'],
  },
  'kh-dalhar-watucongol': {
    wiki: ['Dalhar'],
    commons: ['Makam KH Dalhar Gunungpring', 'Pesantren Watucongol Muntilan'],
  },
  'kh-subchi-parakan': {
    wiki: ['Subchi'],
    commons: ['Makam KH Subchi Parakan', 'Masjid Al-Barokah Parakan'],
  },
  'kh-muntaha-wonosobo': {
    wiki: ['Muntaha'],
    commons: ['Makam KH Muntaha Kalibeber', 'Pesantren Al-Asyariyyah Wonosobo'],
  },
  'syekh-makhdum-wali': {
    wiki: [],
    commons: ['Makam Syekh Makhdum Wali Banyumas', 'Masjid Nur Sulaiman Banyumas'],
  },
  'ki-ageng-henis-laweyan': {
    wiki: ['Masjid_Laweyan'],
    commons: ['Masjid Laweyan Solo', 'Makam Laweyan Surakarta'],
  },
  'habib-anis-solo': {
    wiki: [],
    commons: ['Masjid Riyadh Solo', 'Makam Habib Anis Solo'],
  },
  'ki-ageng-gribig-jatinom': {
    wiki: ['Yaqowiyu'],
    commons: ['Makam Ki Ageng Gribig Jatinom', 'Masjid Besar Jatinom'],
  },
  'syekh-maulana-maghribi-parangtritis': {
    wiki: [],
    commons: ['Makam Syekh Maulana Maghribi Parangtritis'],
  },
  'syekh-bela-belu': {
    wiki: [],
    commons: ['Makam Syekh Bela Belu Parangtritis'],
  },
  'panembahan-senopati-kotagede': {
    wiki: ['Masjid_Gedhe_Mataram', 'Panembahan_Senopati'],
    commons: ['Makam Raja Mataram Kotagede', 'Masjid Gedhe Mataram Kotagede'],
  },
  'sultan-agung-imogiri': {
    wiki: ['Permakaman_Imogiri', 'Sultan_Agung_dari_Mataram'],
    commons: ['Makam Raja-Raja Imogiri', 'Permakaman Imogiri Bantul'],
  },
  'kh-ahmad-dahlan-jogja': {
    wiki: ['Ahmad_Dahlan', 'Masjid_Gedhe_Kauman'],
    commons: ['Ahmad Dahlan', 'Masjid Gedhe Kauman Yogyakarta'],
  },
  'kh-munawwir-krapyak': {
    wiki: ['Pondok_Pesantren_Al-Munawwir', 'Muhammad_Munawwir'],
    commons: ['Pondok Pesantren Al-Munawwir Krapyak'],
  },
  'kyai-nur-iman-mlangi': {
    wiki: ['Masjid_Pathok_Negara_Mlangi'],
    commons: ['Masjid Pathok Negara Mlangi', 'Makam Kyai Nur Iman Mlangi'],
  },
  'kh-arwani-amin-kudus': {
    wiki: [],
    commons: ['Makam KH Arwani Amin', 'Pesantren Yanbuul Quran'],
  },
  'mbah-maimoen-zubair-sarang': {
    wiki: ['Maimun_Zubair'],
    commons: ['Pesantren Al-Anwar Sarang', 'Maimun Zubair'],
  },
  'masyayikh-lasem-rembang': {
    wiki: ['Masjid_Jami_Lasem'],
    commons: ['Masjid Jami Lasem', 'Makam Mbah Sambu Lasem'],
  },
  'kh-ahmad-rifai-kalisalak': {
    wiki: ['Ahmad_Rifa%27i'],
    commons: ['Masjid Kalisalak Batang', 'Ahmad Rifai Kalisalak'],
  },

  // Jawa Timur & Pulau Madura
  'syaichona-kholil-bangkalan': {
    wiki: ['Masjid_Syaikhona_Kholil'],
    commons: ['Masjid Syaikhona Kholil Bangkalan', 'Makam Syaikhona Kholil Bangkalan', 'Masjid Syaichona Kholil'],
  },
  'ratu-ibu-arosbaya': {
    wiki: ['Aer_Mata_Ratu_Ibu'],
    commons: ['Makam Aer Mata Ratu Ibu Bangkalan', 'Astana Aer Mata Ibu Arosbaya'],
  },
  'sunan-cendana-bangkalan': {
    wiki: [],
    commons: ['Makam Sunan Cendana Kwanyar', 'Masjid Sunan Cendana'],
  },
  'bujuk-batu-ampar': {
    wiki: [],
    commons: ['Makam Batu Ampar Pamekasan', 'Masjid Batu Ampar Madura'],
  },
  'sayyid-yusuf-talango': {
    wiki: ['Masjid_Jami_Sumenep'],
    commons: ['Makam Sayyid Yusuf Talango', 'Masjid Jami Sumenep', 'Asta Tinggi Sumenep'],
  },
  'fatimah-binti-maimun': {
    wiki: ['Makam_Siti_Fatimah_binti_Maimun', 'Fatimah_binti_Maimun'],
    commons: ['Makam Fatimah binti Maimun Gresik', 'Fatimah binti Maimun'],
  },
  'syekh-maulana-ishaq': {
    wiki: [],
    commons: ['Makam Syekh Maulana Ishaq Kemantren', 'Makam Maulana Ishaq Lamongan'],
  },
  'syekh-ibrahim-asmorokondi': {
    wiki: [],
    commons: ['Makam Syekh Ibrahim Asmoroqondi Tuban', 'Masjid Asmoroqondi Tuban'],
  },
  'sunan-sendang-duwur': {
    wiki: ['Masjid_Sendang_Duwur'],
    commons: ['Masjid Sendang Duwur', 'Makam Sunan Sendang Duwur'],
  },
  'sunan-bungkul-surabaya': {
    wiki: ['Sunan_Bungkul'],
    commons: ['Makam Sunan Bungkul Surabaya', 'Masjid Bungkul Surabaya'],
  },
  'habib-abu-bakar-gresik': {
    wiki: ['Masjid_Jami_Gresik'],
    commons: ['Masjid Jami Gresik', 'Makam Habib Abu Bakar Assegaf Gresik'],
  },
  'mbah-ud-sidoarjo': {
    wiki: [],
    commons: ['Makam Mbah Ud Pagerwojo Sidoarjo'],
  },
  'kh-abdul-hamid-pasuruan': {
    wiki: ['Masjid_Agung_Al-Anwar_Pasuruan'],
    commons: ['Masjid Agung Al-Anwar Pasuruan', 'Makam KH Abdul Hamid Pasuruan'],
  },
  'guru-bangil-pasuruan': {
    wiki: [],
    commons: ['Makam Guru Bangil', 'Masjid Manarul Islam Bangil'],
  },
  'kh-asad-syamsul-arifin': {
    wiki: ['As%27ad_Syamsul_Arifin'],
    commons: ['Asad Syamsul Arifin', 'Pesantren Salafiyah Syafiiyah Sukorejo'],
  },
  'kh-muhammad-shiddiq-jember': {
    wiki: [],
    commons: ['Makam KH Muhammad Shiddiq Jember'],
  },
  'habib-sholeh-tanggul-jember': {
    wiki: [],
    commons: ['Makam Habib Sholeh Tanggul', 'Masjid Riyadus Sholihin Tanggul'],
  },
  'datuk-malik-ibrahim-banyuwangi': {
    wiki: [],
    commons: ['Makam Datuk Malik Ibrahim Banyuwangi'],
  },
  'sunan-bejagung-tuban': {
    wiki: [],
    commons: ['Makam Sunan Bejagung Tuban', 'Masjid Bejagung Tuban'],
  },
  'kh-hasyim-asyari-tebuireng': {
    wiki: ['Pondok_Pesantren_Tebuireng', 'Hasyim_Asy%27ari'],
    commons: ['Masjid Tebuireng Jombang', 'Pondok Pesantren Tebuireng', 'Hasyim Asyari'],
  },
  'gus-dur-tebuireng': {
    wiki: ['Abdurrahman_Wahid', 'Makam_Gus_Dur'],
    commons: ['Makam Gus Dur Tebuireng', 'Abdurrahman Wahid'],
  },
  'kh-wahab-chasbullah': {
    wiki: ['Abdul_Wahab_Chasbullah'],
    commons: ['Abdul Wahab Chasbullah', 'Pesantren Bahrul Ulum Tambakberas'],
  },
  'kh-bisri-syansuri': {
    wiki: ['Bisri_Syansuri'],
    commons: ['Bisri Syansuri', 'Pesantren Mambaul Maarif Denanyar'],
  },
  'kh-romly-tamim-rejoso': {
    wiki: ['Pondok_Pesantren_Darul_Ulum_(Jombang)'],
    commons: ['Pesantren Darul Ulum Rejoso Jombang', 'Makam KH Romly Tamim'],
  },
  'syekh-jumadil-kubro-troloyo': {
    wiki: ['Makam_Troloyo'],
    commons: ['Makam Troloyo Trowulan', 'Makam Syekh Jumadil Kubro'],
  },
  'syekh-wasil-setono-gedong': {
    wiki: ['Setono_Gedong'],
    commons: ['Masjid Setono Gedong Kediri', 'Makam Setono Gedong Kediri'],
  },
  'kh-abdul-karim-lirboyo': {
    wiki: ['Pondok_Pesantren_Lirboyo'],
    commons: ['Pondok Pesantren Lirboyo Kediri', 'Masjid Lirboyo Kediri'],
  },
  'gus-miek-ploso-kediri': {
    wiki: [],
    commons: ['Pesantren Al-Falah Ploso Kediri', 'Makam Gus Miek Tambak'],
  },
  'syekh-ihsan-jampes-kediri': {
    wiki: [],
    commons: ['Pesantren Jampes Kediri', 'Makam Syekh Ihsan Jampes'],
  },
  'bathoro-katong-ponorogo': {
    wiki: ['Batoro_Katong'],
    commons: ['Makam Bathoro Katong Ponorogo', 'Masjid Agung Ponorogo'],
  },
  'kh-hasan-besari-tegalsari': {
    wiki: ['Masjid_Tegalsari_Jetis'],
    commons: ['Masjid Tegalsari Ponorogo', 'Makam Kiai Ageng Hasan Besari'],
  },
  'masyayikh-tremas-pacitan': {
    wiki: ['Pondok_Pesantren_Tremas'],
    commons: ['Pondok Pesantren Tremas Pacitan', 'Masjid Pondok Tremas'],
  },

  // Pulau Sumatera
  'syekh-abdurrauf-as-singkili': {
    wiki: ['Makam_Syiah_Kuala', 'Masjid_Raya_Baiturrahman'],
    commons: ['Makam Syiah Kuala Banda Aceh', 'Masjid Raya Baiturrahman'],
  },
  'syekh-hamzah-fansuri': {
    wiki: [],
    commons: ['Makam Syekh Hamzah Fansuri', 'Masjid Hamzah Fansuri Singkil'],
  },
  'sultan-malikussaleh': {
    wiki: ['Samudera_Pasai', 'Malikussaleh'],
    commons: ['Makam Sultan Malikussaleh', 'Nisan Sultan Malikussaleh Samudera Pasai'],
  },
  'sultan-iskandar-muda': {
    wiki: ['Iskandar_Muda_dari_Aceh'],
    commons: ['Makam Sultan Iskandar Muda', 'Kerkhof Peutjoet Banda Aceh'],
  },
  'teungku-di-anjong-banda-aceh': {
    wiki: [],
    commons: ['Masjid Teungku di Anjong Banda Aceh', 'Makam Teungku di Anjong'],
  },
  'syekh-abdul-wahab-rokan-besilam': {
    wiki: ['Abdul_Wahab_Rokan'],
    commons: ['Masjid Azizi Langkat', 'Makam Syekh Abdul Wahab Rokan Besilam'],
  },
  'syekh-musthafa-husein-purba-baru': {
    wiki: ['Pondok_Pesantren_Musthafawiyah'],
    commons: ['Pesantren Musthafawiyah Purba Baru'],
  },
  'makam-papan-tinggi-mahligai-barus': {
    wiki: ['Makam_Papan_Tinggi', 'Makam_Mahligai'],
    commons: ['Makam Papan Tinggi Barus', 'Makam Mahligai Barus'],
  },
  'syekh-hasan-mashum-medan': {
    wiki: ['Masjid_Raya_Al-Mashun'],
    commons: ['Masjid Raya Al-Mashun Medan'],
  },
  'syekh-burhanuddin-ulakan': {
    wiki: ['Syekh_Burhanuddin_Ulakan', 'Burhanuddin_Ulakan'],
    commons: ['Makam Syekh Burhanuddin Ulakan', 'Masjid Raya Syekh Burhanuddin Ulakan'],
  },
  'syekh-sulaiman-ar-rasuli-canduang': {
    wiki: ['Sulaiman_Ar-Rasuli'],
    commons: ['Pesantren Tarbiyah Islamiyah Canduang', 'Surau Canduang Agam'],
  },
  'syekh-muhammad-jamil-jaho': {
    wiki: [],
    commons: ['Surau Jaho Padang Panjang', 'Makam Syekh Muhammad Jamil Jaho'],
  },
  'sultan-syarif-kasim-ii-siak': {
    wiki: ['Syarif_Kasim_II_dari_Siak', 'Istana_Siak_Sri_Indrapura'],
    commons: ['Masjid Sultan Syahabuddin Siak', 'Makam Sultan Syarif Kasim II Siak'],
  },
  'syekh-abdurrahman-siddiq-sapat': {
    wiki: [],
    commons: ['Makam Syekh Abdurrahman Siddiq Sapat', 'Masjid Sapat Indragiri Hilir'],
  },
  'marhum-pekan-senapelan': {
    wiki: ['Masjid_Raya_Pekanbaru'],
    commons: ['Masjid Raya Senapelan Pekanbaru', 'Makam Marhum Pekan'],
  },
  'raja-ali-haji-penyengat': {
    wiki: ['Masjid_Raya_Sultan_Riau', 'Pulau_Penyengat'],
    commons: ['Masjid Raya Sultan Riau Pulau Penyengat', 'Makam Raja Ali Haji'],
  },
  'sultan-mahmud-riayat-syah-lingga': {
    wiki: [],
    commons: ['Masjid Sultan Lingga', 'Makam Sultan Mahmud Riayat Syah Daik'],
  },
  'sultan-thaha-syaifuddin-tebo': {
    wiki: ['Thaha_Syaifuddin'],
    commons: ['Makam Sultan Thaha Syaifuddin Muara Tebo'],
  },
  'guru-abdul-madjid-baragbah-jambi': {
    wiki: [],
    commons: ['Masjid Batu Seberang Kota Jambi'],
  },
  'kiai-marogan-palembang': {
    wiki: ['Masjid_Kiai_Muara_Ogan', 'Masjid_Lawang_Kidul'],
    commons: ['Masjid Kiai Muara Ogan Palembang', 'Masjid Lawang Kidul Palembang'],
  },
  'kompleks-kawah-tengkurep-palembang': {
    wiki: ['Kawah_Tengkurep'],
    commons: ['Kawah Tengkurep Palembang', 'Makam Kawah Tengkurep'],
  },
  'gubah-duku-habib-ahmad-shahab-palembang': {
    wiki: [],
    commons: ['Gubah Duku Palembang'],
  },
  'tuan-guru-siddiq-muntok-bangka': {
    wiki: ['Masjid_Jami_Muntok'],
    commons: ['Masjid Jami Muntok Bangka'],
  },
  'syekh-abu-bakar-al-attas-bangka': {
    wiki: [],
    commons: ['Makam Habib Abu Bakar Al-Attas Bangka'],
  },
  'sentot-alibasyah-bengkulu': {
    wiki: ['Sentot_Prawirodirdjo'],
    commons: ['Makam Sentot Alibasyah Bengkulu'],
  },
  'syekh-burhanuddin-imam-senggolo-bengkulu': {
    wiki: ['Masjid_Jamik_Bengkulu'],
    commons: ['Masjid Jamik Bengkulu'],
  },
  'raden-intan-ii-lampung': {
    wiki: ['Radin_Inten_II'],
    commons: ['Makam Radin Inten II Lampung'],
  },
  'kh-ghalib-pringsewu-lampung': {
    wiki: [],
    commons: ['Makam KH Ghalib Pringsewu'],
  },

  // Kalimantan & Sulawesi
  'syekh-muhammad-arsyad-al-banjari': {
    wiki: ['Muhammad_Arsyad_al-Banjari', 'Masjid_Agung_Al-Karomah'],
    commons: ['Makam Datu Kalampayan Martapura', 'Masjid Agung Al-Karomah Martapura'],
  },
  'guru-sekumpul-martapura': {
    wiki: ['Muhammad_Zaini_Abdul_Ghani'],
    commons: ['Musholla Ar-Raudhah Sekumpul', 'Kubah Guru Sekumpul Martapura'],
  },
  'sultan-suriansyah-banjarmasin': {
    wiki: ['Masjid_Sultan_Suriansyah'],
    commons: ['Masjid Sultan Suriansyah Banjarmasin', 'Makam Sultan Suriansyah'],
  },
  'habib-basirih-banjarmasin': {
    wiki: ['Kubah_Basirih'],
    commons: ['Kubah Basirih Banjarmasin'],
  },
  'datu-sanggul-rantau': {
    wiki: [],
    commons: ['Makam Datu Sanggul', 'Kubah Datu Sanggul'],
  },
  'syekh-kasyful-anwar-martapura': {
    wiki: ['Pondok_Pesantren_Darussalam_Martapura'],
    commons: ['Pondok Pesantren Darussalam Martapura'],
  },
  'datu-abulung-sungai-batang': {
    wiki: [],
    commons: ['Kubah Datu Abulung', 'Datu Abulung'],
  },
  'sultan-syarif-abdurrahman-alkadrie-pontianak': {
    wiki: ['Masjid_Jami_Pontianak'],
    commons: ['Masjid Jami Sultan Syarif Abdurrahman Pontianak', 'Makam Batulayang Pontianak'],
  },
  'habib-husein-alkadrie-mempawah': {
    wiki: ['Keraton_Amantubillah'],
    commons: ['Keraton Amantubillah Mempawah', 'Makam Habib Husein Mempawah'],
  },
  'kyai-gede-kotawaringin': {
    wiki: ['Masjid_Kyai_Gede'],
    commons: ['Masjid Kyai Gede Kotawaringin Lama'],
  },
  'tunggang-parangan-kutai-lama': {
    wiki: [],
    commons: ['Makam Habib Tunggang Parangan Kutai Lama', 'Masjid Jami Amir Hasanuddin Tenggarong'],
  },
  'kh-abul-hasan-samarinda': {
    wiki: ['Masjid_Shirathal_Mustaqiem'],
    commons: ['Masjid Shirathal Mustaqiem Samarinda'],
  },
  'makam-raja-bulungan-tanjung-palas': {
    wiki: [],
    commons: ['Keraton Kesultanan Bulungan Tanjung Palas'],
  },
  'syekh-yusuf-al-makassari': {
    wiki: ['Yusuf_al-Makassari'],
    commons: ['Makam Syekh Yusuf Gowa', 'Masjid Tua Katangka Gowa'],
  },
  'sultan-hasanuddin-gowa': {
    wiki: ['Kompleks_Makam_Sultan_Hasanuddin', 'Sultan_Hasanuddin'],
    commons: ['Makam Sultan Hasanuddin Gowa'],
  },
  'datuk-ri-bandang': {
    wiki: ['Datuk_Ri_Bandang'],
    commons: ['Makam Raja-Raja Tallo Makassar', 'Makam Datuk Ri Bandang'],
  },
  'datuk-patimang-luwu': {
    wiki: ['Masjid_Jami_Tua_Palopo'],
    commons: ['Masjid Jami Tua Palopo', 'Makam Datuk Patimang Luwu'],
  },
  'datuk-ri-tiro': {
    wiki: [],
    commons: ['Masjid Tua Dato Tiro Bulukumba', 'Makam Datuk Ri Tiro'],
  },
  'pangeran-diponegoro-makassar': {
    wiki: ['Makam_Pangeran_Diponegoro', 'Diponegoro'],
    commons: ['Makam Pangeran Diponegoro Makassar', 'Diponegoro'],
  },
  'agh-muhammad-asad-sengkang': {
    wiki: [],
    commons: ['Pesantren Asadiyah Sengkang', 'Masjid Agung Ummul Qura Sengkang'],
  },
  'agh-abdurrahman-ambo-dalle-barru': {
    wiki: [],
    commons: ['Pesantren DDI Mangkoso Barru'],
  },
  'imam-lapeo-polewali-mandar': {
    wiki: ['Imam_Lapeo'],
    commons: ['Masjid Nurut Taubah Lapeo', 'Makam Imam Lapeo Polewali Mandar'],
  },
  'syekh-abdul-mannan-salabose-majene': {
    wiki: [],
    commons: ['Masjid Purba Salabose Majene', 'Makam Salabose Majene'],
  },
  'habib-idrus-bin-salim-al-jufri-palu': {
    wiki: ['Idrus_bin_Salim_al-Jufri'],
    commons: ['Masjid Alkhairaat Palu', 'Makam Guru Tua Palu'],
  },
  'datuk-karama-palu': {
    wiki: [],
    commons: ['Makam Datuk Karama Palu', 'Masjid Agung Palu'],
  },
  'kyai-mojo-tondano': {
    wiki: ['Kyai_Maja'],
    commons: ['Makam Kyai Mojo Tondano', 'Masjid Al-Falah Kyai Mojo Tondano'],
  },
  'tuanku-imam-bonjol-minahasa': {
    wiki: ['Tuanku_Imam_Bonjol'],
    commons: ['Makam Tuanku Imam Bonjol Minahasa', 'Tuanku Imam Bonjol'],
  },
  'sultan-amai-gorontalo': {
    wiki: [],
    commons: ['Masjid Hunto Sultan Amai Gorontalo'],
  },
  'ju-panggola-gorontalo': {
    wiki: [],
    commons: ['Makam Keramat Ju Panggola'],
  },
  'sultan-murhum-buton': {
    wiki: ['Benteng_Keraton_Buton'],
    commons: ['Masjid Agung Keraton Buton', 'Makam Sultan Murhum Buton'],
  },

  // Bali, NTB, NTT, Maluku, Maluku Utara & Papua
  'habib-ali-bafaqih-negara': {
    wiki: [],
    commons: ['Masjid Baitul Qadim Loloan Jembrana', 'Makam Habib Ali Bafaqih'],
  },
  'habib-ali-kusamba': {
    wiki: [],
    commons: ['Masjid Al-Mahdi Kusamba Klungkung', 'Makam Keramat Kusamba'],
  },
  'karangrupit-buleleng': {
    wiki: [],
    commons: ['Makam Keramat Karangrupit Buleleng'],
  },
  'the-kwan-lie-buleleng': {
    wiki: [],
    commons: ['Makam The Kwan Lie Buleleng', 'Makam Syekh Abdul Qodir Buleleng'],
  },
  'makam-keramat-kembar-denpasar': {
    wiki: [],
    commons: ['Makam Keramat Kembar Denpasar'],
  },
  'pangeran-mas-sepuh-seseh': {
    wiki: [],
    commons: ['Makam Keramat Pantai Seseh Bali'],
  },
  'siti-khotijah-denpasar': {
    wiki: [],
    commons: ['Makam Keramat Pemecutan Denpasar'],
  },
  'habib-umar-bedugul-tabanan': {
    wiki: [],
    commons: ['Makam Keramat Bedugul', 'Masjid Al-Hidayah Bedugul'],
  },
  'wali-kembar-karangasem': {
    wiki: [],
    commons: ['Makam Wali Kembar Karangasem'],
  },
  'tgkh-zainuddin-abdul-madjid': {
    wiki: ['Muhammad_Zainuddin_Abdul_Madjid'],
    commons: ['Makam TGKH Zainuddin Abdul Madjid Pancor', 'Masjid Al-Mujahidin Pancor'],
  },
  'wali-nyatoq-lombok': {
    wiki: ['Masjid_Kuno_Rembitan'],
    commons: ['Masjid Kuno Rembitan Lombok', 'Makam Wali Nyatoq Lombok'],
  },
  'makam-loang-baloq': {
    wiki: [],
    commons: ['Makam Loang Baloq Mataram'],
  },
  'makam-batu-layar-lombok': {
    wiki: [],
    commons: ['Makam Batu Layar Lombok Barat'],
  },
  'makam-dana-traha-bima': {
    wiki: [],
    commons: ['Makam Dana Traha Bima', 'Masjid Sultan Muhammad Salahuddin Bima'],
  },
  'makam-sultan-menanga-solor': {
    wiki: [],
    commons: ['Masjid Menanga Solor', 'Makam Sultan Menanga Solor'],
  },
  'makam-keramat-kampung-solor-kupang': {
    wiki: [],
    commons: ['Masjid Al-Baitul Qadim Airmata Kupang'],
  },
  'makam-raja-islam-pulau-ende': {
    wiki: [],
    commons: ['Masjid Agung Nurul Hidayah Ende'],
  },
  'masjid-tua-wapauwe-kaitetu': {
    wiki: ['Masjid_Wapauwe'],
    commons: ['Masjid Tua Wapauwe Kaitetu Ambon', 'Masjid Wapauwe'],
  },
  'makam-penyebar-islam-banda-neira': {
    wiki: [],
    commons: ['Masjid Hatta Banda Neira'],
  },
  'sultan-zainal-abidin-ternate': {
    wiki: ['Masjid_Sultan_Ternate'],
    commons: ['Masjid Sultan Ternate', 'Kedaton Sultan Ternate'],
  },
  'sultan-baabullah-ternate': {
    wiki: ['Baabullah_dari_Ternate'],
    commons: ['Kedaton Sultan Ternate', 'Makam Sultan Baabullah Ternate'],
  },
  'sultan-nuku-tidore': {
    wiki: ['Nuku_dari_Tidore'],
    commons: ['Makam Sultan Nuku Tidore', 'Kedaton Kesultanan Tidore'],
  },
  'masjid-tua-patimburak-fakfak': {
    wiki: ['Masjid_Tua_Patimburak'],
    commons: ['Masjid Tua Patimburak Fakfak', 'Patimburak'],
  },
  'makam-raja-rumbati-fakfak': {
    wiki: [],
    commons: ['Makam Raja Rumbati Fakfak'],
  },
  'makam-kesultanan-misool-raja-ampat': {
    wiki: [],
    commons: ['Masjid Misool Raja Ampat'],
  },
};

const METADATA_STRICT_BANS = [
  'bupati',
  'walikota',
  'wali kota',
  'gubernur',
  'wakil bupati',
  'wakil walikota',
  'regent of',
  'mayor of',
  'governor of',
  'politician',
  'caleg',
  'kampanye',
  'pdub',
  'dprd',
  'pilkada',
  'bird',
  'burung',
  'parrot',
  'lovebird',
  'jembatan',
  'bridge',
  'tourist',
  'turis',
  'selfie',
  'wedding',
  'lembaga pemangku adat',
  'copyrighted',
  'fair use',
  'fairuse',
  'non-free',
  '©',
  'no free',
  'replace this',
  'woman',
  'girl',
  'actress',
  'singer',
  'living people',
  'putrajaya',
  'malaysia',
  'selangor',
  'kuala lumpur',
  'brunei',
  'amir hamzah',
];

function stripMaintenanceCategories(rawCatText) {
  return String(rawCatText || '')
    .split('|')
    .map((s) => s.trim())
    .filter((cat) => {
      const lc = cat.toLowerCase();
      return (
        !lc.includes('stub') &&
        !lc.includes('location') &&
        !lc.includes('pages with maps') &&
        !lc.includes('wikidata') &&
        !lc.includes('commons category') &&
        !lc.includes('short description') &&
        !lc.includes('use dmy') &&
        !lc.includes('use mdy') &&
        !lc.includes('cc-by') &&
        !lc.includes('pd-') &&
        !lc.includes('files with') &&
        !lc.includes('taken in') &&
        !lc.includes('uploaded via') &&
        !lc.includes('wikipedia')
      );
    })
    .join(' ');
}

/**
 * Strict quality & domain gatekeeper.
 * Uses the same canonical BANNED_PHOTO_SUBSTRINGS & REQUIRED_HERITAGE_KEYWORDS as runtime/tests,
 * and checks Wikimedia ImageDescription & cleaned topic categories for domain safety.
 */
export function isStrictHeritageImage(
  url,
  description = '',
  categories = '',
  width = 640,
  height = 400,
  site = null
) {
  if (!url || typeof url !== 'string') return false;
  if (
    !url.startsWith('https://upload.wikimedia.org/') &&
    !url.startsWith('https://thumb.wikimedia.org/')
  ) {
    return false;
  }

  const clean = cleanUrl(url);
  if (!isValidPhotoUrl(clean)) return false;

  if (typeof width === 'number' && width > 0 && width < 220) return false;
  if (typeof height === 'number' && height > 0 && height < 150) return false;

  const cleanedCats = stripMaintenanceCategories(categories);
  const metaText = `${String(description || '').toLowerCase()} ${cleanedCats.toLowerCase()}`;

  for (const banned of METADATA_STRICT_BANS) {
    if (metaText.includes(banned)) {
      return false;
    }
  }

  // Prevent cross-figure portrait bleed (e.g. Nawawi painting appearing in Sholeh Darat's article)
  if (site) {
    let decodedLower = clean.toLowerCase();
    try {
      decodedLower = decodeURIComponent(clean).toLowerCase();
    } catch {
      // ignore
    }
    const filenameOnly = decodedLower.split('/').pop()?.split('?')[0] || decodedLower;
    const isBuilding = REQUIRED_HERITAGE_KEYWORDS.some((kw) => filenameOnly.includes(kw));
    if (!isBuilding) {
      const matchedPortraitTok = WHITELISTED_HISTORICAL_PORTRAIT_TOKENS.find((tok) =>
        filenameOnly.includes(tok)
      );
      if (matchedPortraitTok) {
        const siteIdent = `${site.id || ''} ${site.name || ''} ${site.title || ''}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_');
        const tokCore = matchedPortraitTok.replace(/%27/g, '').replace(/_kdr$/, '');
        if (!siteIdent.includes(tokCore) && !tokCore.split('_').every((p) => p.length < 4 || siteIdent.includes(p))) {
          return false;
        }
      }
    }
  }

  return true;
}

function cleanUrl(url) {
  return String(url || '').split('?')[0].trim();
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, timeoutMs = 9500) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
        signal: controller.signal,
      });
      if (res.status === 429) {
        clearTimeout(timer);
        await delay(1500 * (attempt + 1));
        continue;
      }
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

async function verifyHttp200(url, timeoutMs = 3500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    // Reject missing/gone/forbidden; treat 200/206/304 and CDN rate-limit 429 on fresh API thumburls as reachable
    if (res.ok || res.status === 206 || res.status === 304 || res.status === 429) {
      return true;
    }
    return false;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

const TOMB_PRIORITY_RE = /(makam|maqam|maqbarah|kubah|tomb|grave|mausoleum|pesarean|nisan|gubah)/i;

function scoreCandidatePage(title = '') {
  if (TOMB_PRIORITY_RE.test(title)) return 2;
  if (/(masjid|mesjid|mosque|moskee|pesantren|surau|keraton)/i.test(title)) return 1;
  return 0;
}

async function tryWikipediaPageImages(titles, lang = 'id', site = null) {
  const cleanTitles = (Array.isArray(titles) ? titles : [titles])
    .map((t) => String(t || '').trim().replace(/\s+/g, '_'))
    .filter(Boolean);
  if (cleanTitles.length === 0) return null;

  const titlesParam = cleanTitles.map((t) => encodeURIComponent(t)).join('|');

  // Step 1: Check article pageimage
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail|original&pithumbsize=640&titles=${titlesParam}&redirects=1&format=json&origin=*`;
  const data = await fetchJson(endpoint);
  const pages = data?.query?.pages;
  if (pages && typeof pages === 'object') {
    for (const page of Object.values(pages)) {
      const thumb = page?.thumbnail;
      const orig = page?.original;
      const candidate = cleanUrl(thumb?.source || orig?.source);
      const w = thumb?.width || orig?.width || 640;
      const h = thumb?.height || orig?.height || 400;

      if (
        candidate &&
        isStrictHeritageImage(candidate, page?.title || '', '', w, h, site) &&
        (await verifyHttp200(candidate))
      ) {
        return candidate;
      }
    }
  }

  // Step 2: Check embedded heritage photographs inside the curated Wikipedia article
  const imgGenUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&generator=images&gimlimit=12&titles=${titlesParam}&redirects=1&prop=imageinfo&iiprop=url|dimensions|extmetadata&iiurlwidth=640&format=json&origin=*`;
  const imgData = await fetchJson(imgGenUrl);
  const imgPages = imgData?.query?.pages;
  if (!imgPages || typeof imgPages !== 'object') return null;

  const list = Object.values(imgPages).sort(
    (a, b) => scoreCandidatePage(b?.title) - scoreCandidatePage(a?.title)
  );
  for (const page of list) {
    const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
    if (!info) continue;
    const candidate = cleanUrl(info.thumburl || info.url);
    const w = info.thumbwidth || info.width || 640;
    const h = info.thumbheight || info.height || 400;
    const metaDesc = `${page?.title || ''} ${info?.extmetadata?.ImageDescription?.value || ''} ${
      info?.extmetadata?.ObjectName?.value || ''
    } ${info?.extmetadata?.LicenseShortName?.value || ''}`;
    const catText = info?.extmetadata?.Categories?.value || '';

    if (
      candidate &&
      isStrictHeritageImage(candidate, metaDesc, catText, w, h, site) &&
      (await verifyHttp200(candidate))
    ) {
      return candidate;
    }
  }

  return null;
}

const GENERIC_QUERY_STOPWORDS = new Set([
  'makam', 'maqam', 'maqbarah', 'masjid', 'mesjid', 'mosque', 'moskee', 'kubah',
  'pesantren', 'pondok', 'surau', 'keraton', 'kedaton', 'tomb', 'grave', 'cemetery',
  'agung', 'raya', 'jami', 'besar', 'kuno', 'keramat', 'kota', 'kabupaten', 'desa',
  'pulau', 'kompleks', 'astana', 'syekh', 'syaikh', 'syaichona', 'habib', 'sayyid',
  'sultan', 'sunan', 'pangeran', 'raden', 'kiai', 'kyai', 'guru', 'tuan', 'abah',
  'datu', 'datuk', 'mbah', 'eyang', 'mama', 'bin', 'binti', 'dari', 'pada',
  'muhammad', 'ahmad', 'abdul', 'abdurrahman', 'ibrahim', 'ismail', 'hasan', 'husein',
  'amin', 'said', 'sungai', 'batang', 'seberang', 'nusantara', 'indonesia', 'islam',
  'sejarah', 'cagar', 'budaya', 'pusaka', 'bawah', 'atas', 'barat', 'timur', 'utara',
  'selatan', 'tengah', 'kerajaan', 'kesultanan', 'lama', 'baru', 'tua', 'muda',
  'martapura', 'kudus', 'garut', 'pekalongan', 'banjar', 'tasikmalaya', 'palembang',
  'lampung', 'jambi', 'sidoarjo', 'pasuruan', 'banyuwangi', 'pontianak', 'samarinda',
  'gorontalo', 'makassar', 'surabaya', 'semarang', 'yogyakarta', 'bogor', 'bekasi',
  'cirebon', 'cianjur', 'bangil', 'sengkang', 'mempawah', 'lombok', 'mataram',
  'bali', 'buleleng', 'bengkulu', 'aceh', 'medan', 'padang', 'siak', 'riau',
  'jombang', 'kediri', 'tuban', 'gresik', 'lamongan', 'demak', 'banten', 'serang',
  'pandeglang', 'karawang', 'majalengka', 'banyumas', 'solo', 'surakarta', 'ponorogo',
  'pacitan', 'jember', 'situbondo', 'banjarmasin', 'jambi', 'mempawah', 'tapin',
  'rantau', 'bandung', 'tasikmalaya', 'tangerang', 'depok', 'bekasi', 'serang',
  'lebak', 'ciamis', 'subang', 'indramayu', 'brebes', 'tegal', 'kendal', 'klaten',
  'bantul', 'sleman', 'magelang', 'wonosobo', 'parakan', 'sampang', 'pamekasan',
  'sumenep', 'bangkalan', 'pasai', 'singkil', 'barus', 'ternate', 'tidore', 'ambon',
  'fakfak', 'raja', 'ampat', 'buton', 'minahasa', 'tondano', 'palu', 'majene',
  'barru', 'gowa', 'luwu', 'palopo', 'bulukumba', 'bima', 'ende', 'kupang', 'solor',
  'kalimantan', 'sulawesi', 'sumatera', 'jawa', 'maluku', 'papua',
]);

function getQueryDistinctiveTokens(queryStr, site) {
  const qToks = String(queryStr || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !GENERIC_QUERY_STOPWORDS.has(w));
  if (qToks.length > 0) return qToks;
  return site ? getDistinctiveTokens(site) : [];
}

async function tryCommonsStrictSearch(queryStr, site = null, requireQueryToken = true) {
  const cleanQ = String(queryStr || '').trim();
  if (!cleanQ) return null;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    `filetype:bitmap ${cleanQ}`
  )}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|dimensions|extmetadata&iiurlwidth=640&format=json&origin=*`;

  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;

  const queryTokens = getQueryDistinctiveTokens(cleanQ, site);
  const pageList = Object.values(pages).sort(
    (a, b) => scoreCandidatePage(b?.title) - scoreCandidatePage(a?.title)
  );

  for (const page of pageList) {
    const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
    if (!info) continue;
    const candidate = cleanUrl(info.thumburl || info.url);
    const w = info.thumbwidth || info.width || 640;
    const h = info.thumbheight || info.height || 400;
    const filenameNormalized = `${page?.title || ''} ${info?.extmetadata?.ObjectName?.value || ''}`
      .toLowerCase()
      .replace(/[_-]+/g, ' ');
    if (
      requireQueryToken &&
      queryTokens.length > 0 &&
      !queryTokens.some((tok) => filenameNormalized.includes(tok))
    ) {
      continue;
    }
    const metaDesc = `${page?.title || ''} ${info?.extmetadata?.ImageDescription?.value || ''} ${
      info?.extmetadata?.ObjectName?.value || ''
    } ${info?.extmetadata?.LicenseShortName?.value || ''}`;
    const catText = info?.extmetadata?.Categories?.value || '';

    if (
      candidate &&
      isStrictHeritageImage(candidate, metaDesc, catText, w, h, site) &&
      (await verifyHttp200(candidate))
    ) {
      return candidate;
    }
  }
  return null;
}

function getDistinctiveTokens(site) {
  const raw = simplifyFigureName(site.title || site.name)
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !GENERIC_QUERY_STOPWORDS.has(w));
  return raw;
}

async function tryCommonsStrictGeosearch(lat, lng, site) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return null;
  const nameTokens = getDistinctiveTokens(site);
  if (nameTokens.length === 0) return null;

  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=1800&ggsnamespace=6&ggslimit=12&prop=imageinfo&iiprop=url|dimensions|extmetadata&iiurlwidth=640&format=json&origin=*`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;

  const pageList = Object.values(pages).sort(
    (a, b) => scoreCandidatePage(b?.title) - scoreCandidatePage(a?.title)
  );

  for (const page of pageList) {
    const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
    if (!info) continue;
    const candidate = cleanUrl(info.thumburl || info.url);
    const w = info.thumbwidth || info.width || 640;
    const h = info.thumbheight || info.height || 400;
    const filenameNormalized = `${page?.title || ''} ${info?.extmetadata?.ObjectName?.value || ''}`
      .toLowerCase()
      .replace(/[_-]+/g, ' ');
    // Tight geosearch guard: require distinctive non-city token in the file title itself
    if (!nameTokens.some((tok) => filenameNormalized.includes(tok))) {
      continue;
    }
    const metaDesc = `${page?.title || ''} ${info?.extmetadata?.ImageDescription?.value || ''} ${
      info?.extmetadata?.ObjectName?.value || ''
    } ${info?.extmetadata?.LicenseShortName?.value || ''}`;
    const catText = info?.extmetadata?.Categories?.value || '';

    if (
      candidate &&
      isStrictHeritageImage(candidate, metaDesc, catText, w, h, site) &&
      (await verifyHttp200(candidate))
    ) {
      return candidate;
    }
  }
  return null;
}

function simplifyFigureName(rawName) {
  return String(rawName || '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(
      /\b(makam|kompleks|situs|petilasan|keramat|astana|kubah|masjid|tua|kuno|syekh|syaikh|syaichona|kh\.?|k\.?h\.?|kiai|kyai|nyai|habib|al-habib|sayyid|syarif|sultan|pangeran|raden|sunan|panembahan|adipati|prabu|ratu|tuan\s+guru|abah\s+guru|guru|datu|datuk|mbah|eyang|dalem|mama|abuya|teungku|tuanku|agh\.?|tgkh\.?)\b/gi,
      ' '
    )
    .replace(/[^a-zA-Z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function resolveStrictVerifiedPhoto(site) {
  const id = site.id;
  const legacyId = site.legacyId;
  if (FIRST_12_THUMB_BY_ID[id] || (legacyId && FIRST_12_THUMB_BY_ID[legacyId])) {
    return FIRST_12_THUMB_BY_ID[id] || FIRST_12_THUMB_BY_ID[legacyId];
  }

  // Stage A: Curated Whitelist (specific articles & specific heritage Commons queries — NO plain city names!)
  const curated = CURATED_WHITELIST[id];
  if (curated) {
    if (Array.isArray(curated.wiki) && curated.wiki.length > 0) {
      const idImg = await tryWikipediaPageImages(curated.wiki, 'id', site);
      if (idImg) return idImg;
    }
    if (Array.isArray(curated.commons) && curated.commons.length > 0) {
      for (const q of curated.commons) {
        const found = await tryCommonsStrictSearch(q, site, true);
        if (found) return found;
      }
    }
  }

  // Stage B: Wikipedia references belonging to the figure/site (NEVER city/district titles)
  if (Array.isArray(site.references)) {
    const refTitles = [];
    for (const ref of site.references) {
      const m = String(ref || '').match(/Wikipedia Bahasa Indonesia:\s*([^.;()\n]+)/i);
      if (m && m[1]) {
        const title = m[1].trim();
        if (!/^(Kota|Kabupaten|Kecamatan|Provinsi)\b/i.test(title)) {
          refTitles.push(title);
        }
      }
    }
    if (refTitles.length > 0) {
      const idImg = await tryWikipediaPageImages(refTitles, 'id', site);
      if (idImg) return idImg;
    }
  }

  // Stage C: Strict heritage Commons search WITHOUT OR ambiguity + requiring distinctive site token
  const shortName = simplifyFigureName(site.title || site.name);
  if (shortName && shortName.length >= 4) {
    for (const q of [`Makam ${shortName}`, `Masjid ${shortName}`]) {
      const found = await tryCommonsStrictSearch(q, site, true);
      if (found) return found;
    }
  }

  // Stage D: Tight 1.8km Geosearch requiring distinctive name match + strict heritage keyword
  const lat = Number(site.location?.lat || 0);
  const lng = Number(site.location?.lng || 0);
  const geoFound = await tryCommonsStrictGeosearch(lat, lng, site);
  if (geoFound) return geoFound;

  return null;
}

async function main() {
  const outJsonPath = path.join(rootDir, 'src/data/verifiedSiteImages.json');
  const resultMap = {};
  let verifiedCount = 0;

  console.log(`=== STRICT HERITAGE IMAGE AUDIT (${SITES.length} SITES) ===\n`);

  const BATCH_SIZE = 2;
  for (let i = 0; i < SITES.length; i += BATCH_SIZE) {
    const batch = SITES.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (site, batchIdx) => {
        const indexNumber = i + batchIdx + 1;
        const id = site.id;
        const slug = getSiteSlug(site);
        const legacyId = site.legacyId;

        const resolved = await resolveStrictVerifiedPhoto(site);
        if (resolved) {
          resultMap[id] = resolved;
          if (slug) resultMap[slug] = resolved;
          if (legacyId && !resultMap[legacyId]) resultMap[legacyId] = resolved;
          verifiedCount++;
          const filename = decodeURIComponent(resolved.split('/').pop() || resolved);
          console.log(`#${indexNumber} [VERIFIED] ${id} -> ${site.name} -> ${filename}`);
        } else {
          console.log(
            `#${indexNumber} [DOME-SVG] ${id} -> ${site.name} (${site.location?.city}, ${site.location?.province})`
          );
        }
      })
    );
    await delay(160);
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(resultMap, null, 2) + '\n', 'utf8');

  const tsContent = `import verifiedSiteImages from './verifiedSiteImages.json';

/**
 * Strictly verified heritage photographs for ziarah sites.
 * Generated by scripts/fetch-verified-images.mjs using isStrictHeritageImage.
 */
export const PRE_RESOLVED_AUTHENTIC_IMAGES: Record<string, string> = verifiedSiteImages as Record<string, string>;
`;
  fs.writeFileSync(path.join(rootDir, 'src/data/authenticImageUrls.ts'), tsContent, 'utf8');

  console.log(`\n========================================`);
  console.log(`STRICT AUDIT SUMMARY: ${verifiedCount} / ${SITES.length} sites verified with genuine photos`);
  console.log(`Remaining ${SITES.length - verifiedCount} sites use bespoke Golden Dome SVG + Google Maps Photo link`);
  console.log(`Saved to: ${outJsonPath}`);
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
