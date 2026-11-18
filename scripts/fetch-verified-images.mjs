import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

register();

const { SITES } = await import('../src/data/sites.ts');
const { FIRST_12_THUMB_BY_ID } = await import('../src/lib/authenticSiteImages.ts');
const { getSiteSlug } = await import('../src/lib/siteSlugs.ts');

const USER_AGENT =
  'ZiarahNusantaraCurator/2.0 (https://ziarahnusantara.my.id; contact@ziarahnusantara.my.id) Node/20';

/**
 * Curated mapping of site IDs to specific Wikipedia articles (figure / mosque / keraton / pesantren)
 * and specific Wikimedia Commons search queries.
 */
const CURATED_WIKI_MAP = {
  // DKI Jakarta, Banten & Jawa Barat
  'habib-ahmad-bin-alwi-al-haddad': {
    wiki: ['Alwi_bin_Thahir_al-Haddad'],
    commons: ['Masjid Kalibata Jakarta', 'Masjid Jami Jakarta Selatan', 'Masjid Raya Jakarta Selatan'],
  },
  'habib-utsman-bin-yahya': {
    wiki: ['Utsman_bin_Yahya'],
    commons: ['Uthman bin Yahya', 'Masjid Jatinegara Jakarta Timur'],
  },
  'pangeran-jayakarta': {
    wiki: ['Pangeran_Jayakarta', 'Masjid_Assalafiyah'],
    commons: ['Masjid Assalafiyah Jatinegara', 'Makam Pangeran Jayakarta', 'Masjid Jatinegara Kaum'],
  },
  'guru-marzuki-cipinang': {
    wiki: ['Ahmad_Marzuki_bin_Mirshod'],
    commons: ['Masjid Jatinegara Jakarta', 'Masjid Jakarta Timur'],
  },
  'sultan-maulana-hasanuddin': {
    wiki: ['Masjid_Agung_Banten', 'Maulana_Hasanuddin_dari_Banten', 'Kesultanan_Banten'],
    commons: ['Masjid Agung Banten', 'Makam Sultan Maulana Hasanuddin Banten'],
  },
  'sultan-maulana-yusuf': {
    wiki: ['Maulana_Yusuf_dari_Banten', 'Keraton_Surosowan'],
    commons: ['Masjid Agung Banten Menara', 'Keraton Surosowan Banten'],
  },
  'sultan-ageng-tirtayasa': {
    wiki: ['Ageng_Tirtayasa_dari_Banten'],
    commons: ['Sultan Ageng Tirtayasa', 'Banten Lama Mosque'],
  },
  'syekh-maulana-mansyur-cikaduen': {
    wiki: [],
    commons: ['Masjid Agung Pandeglang', 'Masjid Pandeglang Banten', 'Masjid Banten'],
  },
  'syekh-asnawi-caringin': {
    wiki: ['Asnawi_Caringin'],
    commons: ['Masjid Caringin Pandeglang', 'Syekh Asnawi Caringin', 'Masjid Pandeglang'],
  },
  'syekh-nawawi-al-bantani': {
    wiki: ['Nawawi_al-Bantani'],
    commons: ['Nawawi al-Bantani', 'Masjid Tanara Serang', 'Masjid Agung Serang'],
  },
  'habib-abdullah-empang-bogor': {
    wiki: [],
    commons: ['Masjid Empang Bogor', 'Masjid Keramat Empang Bogor', 'Masjid Raya Bogor'],
  },
  'raden-saleh-syarif-bustaman-bogor': {
    wiki: ['Raden_Saleh'],
    commons: ['Raden Saleh', 'Makam Raden Saleh Bogor'],
  },
  'mama-falak-pagentongan-bogor': {
    wiki: [],
    commons: ['Masjid Raya Bogor', 'Masjid Agung Bogor'],
  },
  'syekh-quro-karawang': {
    wiki: ['Syekh_Quro'],
    commons: ['Masjid Agung Karawang', 'Masjid Syekh Quro Karawang', 'Masjid Karawang'],
  },
  'syekh-bentong-karawang': {
    wiki: [],
    commons: ['Masjid Agung Karawang', 'Masjid Karawang Jawa Barat'],
  },
  'eyang-dalem-abdul-manaf-mahmud': {
    wiki: ['Kampung_Adat_Mahmud'],
    commons: ['Kampung Mahmud Bandung', 'Masjid Agung Bandung', 'Masjid Raya Bandung'],
  },
  'kh-noer-ali-bekasi': {
    wiki: ['Noer_Ali'],
    commons: ['KH Noer Ali', 'Masjid Agung Al-Barkah Bekasi', 'Masjid Bekasi'],
  },
  'syekh-datuk-kahfi': {
    wiki: ['Syekh_Datuk_Kahfi'],
    commons: ['Gunung Jati Cirebon', 'Masjid Agung Sang Cipta Rasa Cirebon'],
  },
  'pangeran-cakrabuana': {
    wiki: ['Pangeran_Cakrabuana', 'Keraton_Kasepuhan'],
    commons: ['Keraton Kasepuhan Cirebon', 'Masjid Agung Sang Cipta Rasa'],
  },
  'syekh-magelung-sakti': {
    wiki: ['Masjid_Agung_Sang_Cipta_Rasa'],
    commons: ['Masjid Agung Sang Cipta Rasa Cirebon', 'Keraton Kanoman Cirebon'],
  },
  'syekh-abdul-muhyi-pamijahan': {
    wiki: ['Abdul_Muhyi', 'Masjid_Agung_Manonjaya'],
    commons: ['Masjid Agung Manonjaya Tasikmalaya', 'Masjid Agung Tasikmalaya'],
  },
  'mama-cibaduyut-kudang': {
    wiki: [],
    commons: ['Masjid Agung Tasikmalaya', 'Masjid Raya Bandung'],
  },
  'syekh-jafar-shadiq-cibiuk': {
    wiki: [],
    commons: ['Masjid Agung Garut', 'Masjid Garut Jawa Barat'],
  },
  'sunan-rohmat-godog': {
    wiki: ['Sunan_Rohmat'],
    commons: ['Makam Godog Garut', 'Masjid Agung Garut'],
  },
  'dalem-cikundul-cianjur': {
    wiki: ['Raden_Aria_Wira_Tanu_I'],
    commons: ['Masjid Agung Cianjur', 'Cianjur Mosque'],
  },
  'mama-gentur-cianjur': {
    wiki: [],
    commons: ['Masjid Agung Cianjur', 'Masjid Cianjur'],
  },
  'mama-sempur-purwakarta': {
    wiki: ['Tubagus_Ahmad_Bakri'],
    commons: ['Masjid Agung Purwakarta', 'Purwakarta Mosque'],
  },
  'kh-abdul-halim-majalengka': {
    wiki: ['Abdul_Halim_(ulama)', 'Abdul_Halim_Majalengka'],
    commons: ['Abdul Halim Majalengka', 'Masjid Agung Majalengka'],
  },
  'pangeran-achmad-djajadiningrat': {
    wiki: ['Achmad_Djajadiningrat'],
    commons: ['Achmad Djajadiningrat', 'Masjid Agung Banten'],
  },
  'keramat-kampung-bandan': {
    wiki: ['Masjid_Al-Mukarromah_Kampung_Bandan'],
    commons: ['Masjid Kampung Bandan', 'Masjid Al-Mukarromah Jakarta'],
  },

  // Jawa Tengah & DI Yogyakarta
  'raden-patah-demak': {
    wiki: ['Raden_Patah', 'Masjid_Agung_Demak'],
    commons: ['Makam Raden Patah Demak', 'Masjid Agung Demak'],
  },
  'syekh-jangkung-pati': {
    wiki: ['Saridin'],
    commons: ['Makam Syekh Jangkung Kayen Pati', 'Masjid Agung Pati'],
  },
  'syekh-mutamakkin-kajen': {
    wiki: ['Ahmad_Mutamakkin'],
    commons: ['Masjid Kajen Pati', 'Masjid Agung Pati Jawa Tengah'],
  },
  'ratu-kalinyamat-jepara': {
    wiki: ['Ratu_Kalinyamat', 'Masjid_Mantingan'],
    commons: ['Masjid Mantingan Jepara', 'Makam Mantingan Jepara', 'Masjid Agung Jepara'],
  },
  'habib-ahmad-sapuro': {
    wiki: ['Ahmad_bin_Abdullah_bin_Thalib_al-Attas'],
    commons: ['Sapuro Pekalongan', 'Masjid Agung Pekalongan'],
  },
  'habib-hasyim-bin-yahya-pekalongan': {
    wiki: [],
    commons: ['Masjid Agung Al-Jami Pekalongan', 'Masjid Pekalongan'],
  },
  'ki-ageng-pandanaran-semarang': {
    wiki: ['Ki_Ageng_Pandan_Arang'],
    commons: ['Masjid Agung Kauman Semarang', 'Masjid Agung Jawa Tengah'],
  },
  'sunan-pandanaran-bayat': {
    wiki: ['Sunan_Pandanaran'],
    commons: ['Makam Sunan Pandanaran Bayat', 'Gapura Makam Sunan Pandanaran Klaten'],
  },
  'kh-sholeh-darat-semarang': {
    wiki: ['Sholeh_Darat'],
    commons: ['Masjid Agung Kauman Semarang', 'Sholeh Darat'],
  },
  'sunan-katong-kaliwungu': {
    wiki: [],
    commons: ['Masjid Agung Kendal', 'Kaliwungu Kendal Mosque'],
  },
  'syekh-subakir-tidar': {
    wiki: ['Gunung_Tidar'],
    commons: ['Gunung Tidar Magelang', 'Makam Syekh Subakir Gunung Tidar', 'Masjid Agung Magelang'],
  },
  'kh-dalhar-watucongol': {
    wiki: ['Dalhar'],
    commons: ['KH Dalhar Watucongol', 'Masjid Agung Magelang'],
  },
  'kh-subchi-parakan': {
    wiki: ['Subchi'],
    commons: ['Bambu Runcing Parakan', 'Masjid Agung Temanggung'],
  },
  'kh-muntaha-wonosobo': {
    wiki: ['Muntaha'],
    commons: ['Masjid Al-Manshur Wonosobo', 'Masjid Wonosobo'],
  },
  'syekh-makhdum-wali': {
    wiki: [],
    commons: ['Masjid Nur Sulaiman Banyumas', 'Masjid Agung Purwokerto'],
  },
  'ki-ageng-henis-laweyan': {
    wiki: ['Masjid_Laweyan'],
    commons: ['Masjid Laweyan Solo', 'Makam Laweyan Surakarta'],
  },
  'habib-anis-solo': {
    wiki: ['Anis_bin_Alwi_al-Habsyi'],
    commons: ['Masjid Riyadh Solo', 'Masjid Agung Surakarta'],
  },
  'ki-ageng-gribig-jatinom': {
    wiki: ['Yaqowiyu'],
    commons: ['Masjid Besar Jatinom Klaten', 'Yaqowiyu Jatinom Klaten'],
  },
  'syekh-maulana-maghribi-parangtritis': {
    wiki: ['Syekh_Maulana_Maghribi'],
    commons: ['Makam Syekh Bela Belu Parangtritis', 'Masjid Pathok Negara Dongkelan'],
  },
  'syekh-bela-belu': {
    wiki: [],
    commons: ['Makam Syekh Bela Belu', 'Masjid Agung Manunggal Bantul'],
  },
  'panembahan-senopati-kotagede': {
    wiki: ['Panembahan_Senopati', 'Masjid_Gedhe_Mataram'],
    commons: ['Masjid Gedhe Mataram Kotagede', 'Makam Raja Mataram Kotagede'],
  },
  'sultan-agung-imogiri': {
    wiki: ['Sultan_Agung_dari_Mataram', 'Permakaman_Imogiri'],
    commons: ['Makam Imogiri Bantul', 'Permakaman Imogiri', 'Sultan Agung Mataram'],
  },
  'kh-ahmad-dahlan-jogja': {
    wiki: ['Ahmad_Dahlan', 'Masjid_Gedhe_Kauman'],
    commons: ['Ahmad Dahlan', 'Masjid Gedhe Kauman Yogyakarta'],
  },
  'kh-munawwir-krapyak': {
    wiki: ['Muhammad_Munawwir', 'Pondok_Pesantren_Al-Munawwir'],
    commons: ['Pesantren Al-Munawwir Krapyak', 'Masjid Pathok Negara Dongkelan'],
  },
  'kyai-nur-iman-mlangi': {
    wiki: ['Masjid_Pathok_Negara_Mlangi'],
    commons: ['Masjid Pathok Negara Mlangi', 'Masjid Mlangi Sleman'],
  },
  'kh-arwani-amin-kudus': {
    wiki: ['Arwani_Amin'],
    commons: ['Masjid Agung Kudus', 'Kudus Mosque'],
  },
  'mbah-maimoen-zubair-sarang': {
    wiki: ['Maimun_Zubair'],
    commons: ['Maimun Zubair', 'Masjid Agung Rembang'],
  },
  'masyayikh-lasem-rembang': {
    wiki: ['Masjid_Jami_Lasem'],
    commons: ['Masjid Jami Lasem', 'Lasem Mosque'],
  },
  'kh-ahmad-rifai-kalisalak': {
    wiki: ['Ahmad_Rifa%27i'],
    commons: ['Ahmad Rifai', 'Masjid Agung Batang'],
  },

  // Jawa Timur & Pulau Madura
  'syaichona-kholil-bangkalan': {
    wiki: ['Masjid_Agung_Bangkalan'],
    commons: ['Masjid Syaichona Kholil Bangkalan', 'Makam Syaichona Kholil Bangkalan', 'Masjid Agung Bangkalan'],
  },
  'ratu-ibu-arosbaya': {
    wiki: ['Aer_Mata_Ratu_Ibu'],
    commons: ['Makam Aer Mata Ratu Ibu Bangkalan', 'Arosbaya Bangkalan'],
  },
  'sunan-cendana-bangkalan': {
    wiki: [],
    commons: ['Masjid Agung Bangkalan', 'Masjid Madura'],
  },
  'bujuk-batu-ampar': {
    wiki: [],
    commons: ['Masjid Agung Asy-Syuhada Pamekasan', 'Masjid Pamekasan Madura'],
  },
  'sayyid-yusuf-talango': {
    wiki: ['Masjid_Jami_Sumenep'],
    commons: ['Masjid Jami Sumenep', 'Asta Tinggi Sumenep'],
  },
  'fatimah-binti-maimun': {
    wiki: ['Fatimah_binti_Maimun'],
    commons: ['Makam Fatimah binti Maimun Leran Gresik', 'Fatimah binti Maimun'],
  },
  'syekh-maulana-ishaq': {
    wiki: ['Maulana_Ishaq'],
    commons: ['Masjid Agung Lamongan', 'Paciran Lamongan Mosque'],
  },
  'syekh-ibrahim-asmorokondi': {
    wiki: ['Ibrahim_Asmoroqondi'],
    commons: ['Makam Asmoroqondi Tuban', 'Masjid Agung Tuban'],
  },
  'sunan-sendang-duwur': {
    wiki: ['Masjid_Sendang_Duwur'],
    commons: ['Masjid Sendang Duwur', 'Makam Sunan Sendang Duwur Lamongan'],
  },
  'sunan-bungkul-surabaya': {
    wiki: ['Sunan_Bungkul', 'Taman_Bungkul'],
    commons: ['Makam Sunan Bungkul Surabaya', 'Taman Bungkul Surabaya'],
  },
  'habib-abu-bakar-gresik': {
    wiki: ['Abu_Bakar_bin_Muhammad_as-Segaf'],
    commons: ['Masjid Jami Gresik', 'Gresik Grand Mosque'],
  },
  'mbah-ud-sidoarjo': {
    wiki: ['Ali_Mas%27ud'],
    commons: ['Masjid Agung Sidoarjo', 'Sidoarjo Grand Mosque'],
  },
  'kh-abdul-hamid-pasuruan': {
    wiki: ['Abdul_Hamid_Pasuruan'],
    commons: ['Masjid Agung Al-Anwar Pasuruan', 'Makam KH Hamid Pasuruan'],
  },
  'guru-bangil-pasuruan': {
    wiki: ['Muhammad_Syadzili_Kalimantan'],
    commons: ['Masjid Agung Bangil', 'Masjid Agung Al-Anwar Pasuruan'],
  },
  'kh-asad-syamsul-arifin': {
    wiki: ['As%27ad_Syamsul_Arifin'],
    commons: ['Asad Syamsul Arifin', 'Masjid Agung Situbondo'],
  },
  'kh-muhammad-shiddiq-jember': {
    wiki: ['Muhammad_Shiddiq'],
    commons: ['Masjid Jami Al-Baitul Amien Jember', 'Masjid Jember'],
  },
  'habib-sholeh-tanggul-jember': {
    wiki: ['Sholeh_bin_Muhsin_al-Hamid'],
    commons: ['Masjid Jami Al-Baitul Amien Jember', 'Tanggul Jember'],
  },
  'datuk-malik-ibrahim-banyuwangi': {
    wiki: [],
    commons: ['Masjid Agung Baiturrahman Banyuwangi', 'Banyuwangi Mosque'],
  },
  'sunan-bejagung-tuban': {
    wiki: [],
    commons: ['Masjid Agung Tuban', 'Makam Bejagung Tuban'],
  },
  'kh-hasyim-asyari-tebuireng': {
    wiki: ['Hasyim_Asy%27ari', 'Pondok_Pesantren_Tebuireng'],
    commons: ['Hasyim Asyari', 'Pesantren Tebuireng Jombang'],
  },
  'gus-dur-tebuireng': {
    wiki: ['Abdurrahman_Wahid'],
    commons: ['Abdurrahman Wahid', 'Makam Gus Dur Tebuireng'],
  },
  'kh-wahab-chasbullah': {
    wiki: ['Abdul_Wahab_Chasbullah'],
    commons: ['Abdul Wahab Chasbullah', 'Tambakberas Jombang'],
  },
  'kh-bisri-syansuri': {
    wiki: ['Bisri_Syansuri'],
    commons: ['Bisri Syansuri', 'Denanyar Jombang'],
  },
  'kh-romly-tamim-rejoso': {
    wiki: ['Romly_Tamim', 'Pondok_Pesantren_Darul_Ulum_(Jombang)'],
    commons: ['Pesantren Darul Ulum Jombang', 'Masjid Agung Jombang'],
  },
  'syekh-jumadil-kubro-troloyo': {
    wiki: ['Syekh_Jumadil_Qubro'],
    commons: ['Makam Troloyo Trowulan', 'Troloyo Mojokerto'],
  },
  'syekh-wasil-setono-gedong': {
    wiki: ['Setono_Gedong'],
    commons: ['Masjid Setono Gedong Kediri', 'Makam Setono Gedong Kediri'],
  },
  'kh-abdul-karim-lirboyo': {
    wiki: ['Abdul_Karim_(ulama)', 'Pondok_Pesantren_Lirboyo'],
    commons: ['Pondok Pesantren Lirboyo Kediri', 'Masjid Agung Kediri'],
  },
  'gus-miek-ploso-kediri': {
    wiki: ['Hamim_Tohari_Djamil'],
    commons: ['Masjid Agung Kediri', 'Pesantren Ploso Kediri'],
  },
  'syekh-ihsan-jampes-kediri': {
    wiki: ['Ihsan_Jampes'],
    commons: ['Masjid Agung Kediri', 'Kediri Mosque'],
  },
  'bathoro-katong-ponorogo': {
    wiki: ['Batoro_Katong'],
    commons: ['Makam Batoro Katong Ponorogo', 'Masjid Agung Ponorogo'],
  },
  'kh-hasan-besari-tegalsari': {
    wiki: ['Hasan_Besari', 'Masjid_Tegalsari_Jetis'],
    commons: ['Masjid Tegalsari Ponorogo', 'Makam Hasan Besari Tegalsari'],
  },
  'masyayikh-tremas-pacitan': {
    wiki: ['Pondok_Pesantren_Tremas'],
    commons: ['Pesantren Tremas Pacitan', 'Masjid Agung Pacitan'],
  },

  // Sumatera
  'syekh-abdurrauf-as-singkili': {
    wiki: ['Abdurrauf_as-Singkili', 'Masjid_Raya_Baiturrahman'],
    commons: ['Masjid Raya Baiturrahman Banda Aceh', 'Makam Syiah Kuala'],
  },
  'syekh-hamzah-fansuri': {
    wiki: ['Hamzah_Fansuri'],
    commons: ['Masjid Agung Subulussalam', 'Masjid Aceh Singkil', 'Masjid Raya Baiturrahman'],
  },
  'sultan-malikussaleh': {
    wiki: ['Malikussaleh', 'Kesultanan_Samudera_Pasai'],
    commons: ['Makam Sultan Malikussaleh', 'Samudera Pasai Tomb'],
  },
  'sultan-iskandar-muda': {
    wiki: ['Iskandar_Muda_dari_Aceh'],
    commons: ['Makam Sultan Iskandar Muda Banda Aceh', 'Sultan Iskandar Muda'],
  },
  'teungku-di-anjong-banda-aceh': {
    wiki: [],
    commons: ['Masjid Teungku di Anjong Banda Aceh', 'Masjid Raya Baiturrahman Aceh'],
  },
  'syekh-abdul-wahab-rokan-besilam': {
    wiki: ['Abdul_Wahab_Rokan'],
    commons: ['Besilam Langkat', 'Masjid Azizi Tanjung Pura Langkat'],
  },
  'syekh-musthafa-husein-purba-baru': {
    wiki: ['Pondok_Pesantren_Musthafawiyah'],
    commons: ['Pesantren Musthafawiyah Purba Baru', 'Masjid Agung Mandailing Natal'],
  },
  'makam-papan-tinggi-mahligai-barus': {
    wiki: ['Makam_Papan_Tinggi', 'Makam_Mahligai'],
    commons: ['Makam Mahligai Barus', 'Makam Papan Tinggi Barus'],
  },
  'syekh-hasan-mashum-medan': {
    wiki: ['Masjid_Raya_Al-Mashun'],
    commons: ['Masjid Raya Al-Mashun Medan', 'Maimun Palace Mosque'],
  },
  'syekh-burhanuddin-ulakan': {
    wiki: ['Burhanuddin_Ulakan'],
    commons: ['Masjid Raya Syekh Burhanuddin Ulakan', 'Makam Syekh Burhanuddin Ulakan', 'Surau Lubuak Bauak'],
  },
  'syekh-sulaiman-ar-rasuli-canduang': {
    wiki: ['Sulaiman_Ar-Rasuli'],
    commons: ['Sulaiman Ar-Rasuli', 'Masjid Raya Sumatera Barat', 'Masjid Bingkudu Agam'],
  },
  'syekh-muhammad-jamil-jaho': {
    wiki: [],
    commons: ['Surau Tuo Rao Rao Tanah Datar', 'Masjid Tuo Kayu Jao'],
  },
  'sultan-syarif-kasim-ii-siak': {
    wiki: ['Syarif_Kasim_II_dari_Siak', 'Istana_Siak_Sri_Indrapura'],
    commons: ['Sultan Syarif Kasim II', 'Istana Siak', 'Masjid Syahabuddin Siak'],
  },
  'syekh-abdurrahman-siddiq-sapat': {
    wiki: ['Abdurrahman_Siddiq'],
    commons: ['Masjid Raya Pekanbaru', 'Masjid Agung Annur Pekanbaru'],
  },
  'marhum-pekan-senapelan': {
    wiki: ['Masjid_Raya_Pekanbaru'],
    commons: ['Masjid Raya Senapelan Pekanbaru', 'Makam Marhum Pekan Pekanbaru'],
  },
  'raja-ali-haji-penyengat': {
    wiki: ['Raja_Ali_Haji', 'Masjid_Raya_Sultan_Riau'],
    commons: ['Masjid Raya Sultan Riau Pulau Penyengat', 'Makam Raja Ali Haji Penyengat'],
  },
  'sultan-mahmud-riayat-syah-lingga': {
    wiki: ['Mahmud_Riayat_Syah_dari_Johor'],
    commons: ['Masjid Sultan Lingga', 'Pulau Penyengat Mosque'],
  },
  'sultan-thaha-syaifuddin-tebo': {
    wiki: ['Thaha_Syaifuddin'],
    commons: ['Sultan Thaha Syaifuddin', 'Masjid Agung Al-Falah Jambi'],
  },
  'guru-abdul-madjid-baragbah-jambi': {
    wiki: [],
    commons: ['Masjid Agung Al-Falah Jambi', 'Seberang Kota Jambi Mosque'],
  },
  'kiai-marogan-palembang': {
    wiki: ['Masjid_Kiai_Muara_Ogan', 'Masjid_Lawang_Kidul'],
    commons: ['Masjid Ki Marogan Palembang', 'Masjid Lawang Kidul Palembang', 'Masjid Agung Palembang'],
  },
  'kompleks-kawah-tengkurep-palembang': {
    wiki: ['Kawah_Tengkurep', 'Masjid_Agung_Palembang'],
    commons: ['Kawah Tengkurep Palembang', 'Masjid Agung Sultan Mahmud Badaruddin Palembang'],
  },
  'gubah-duku-habib-ahmad-shahab-palembang': {
    wiki: [],
    commons: ['Masjid Agung Palembang', 'Masjid Cheng Ho Palembang'],
  },
  'tuan-guru-siddiq-muntok-bangka': {
    wiki: ['Masjid_Jami_Muntok'],
    commons: ['Masjid Jami Muntok Bangka', 'Masjid Agung Pangkalpinang'],
  },
  'syekh-abu-bakar-al-attas-bangka': {
    wiki: [],
    commons: ['Masjid Kubah Timah Pangkalpinang', 'Masjid Jami Pangkalpinang'],
  },
  'sentot-alibasyah-bengkulu': {
    wiki: ['Sentot_Prawirodirdjo', 'Masjid_Jamik_Bengkulu'],
    commons: ['Makam Sentot Alibasyah Bengkulu', 'Masjid Jamik Bengkulu'],
  },
  'syekh-burhanuddin-imam-senggolo-bengkulu': {
    wiki: ['Masjid_Jamik_Bengkulu'],
    commons: ['Masjid Jamik Bengkulu', 'Masjid Raya Baitul Izzah Bengkulu'],
  },
  'raden-intan-ii-lampung': {
    wiki: ['Radin_Inten_II'],
    commons: ['Radin Inten II', 'Masjid Al-Furqon Bandar Lampung'],
  },
  'kh-ghalib-pringsewu-lampung': {
    wiki: [],
    commons: ['Masjid Al-Furqon Bandar Lampung', 'Lampung Mosque'],
  },

  // Kalimantan & Sulawesi
  'syekh-muhammad-arsyad-al-banjari': {
    wiki: ['Muhammad_Arsyad_al-Banjari', 'Masjid_Agung_Al-Karomah'],
    commons: ['Muhammad Arsyad al-Banjari', 'Makam Datu Kelampayan Martapura', 'Masjid Agung Al-Karomah Martapura'],
  },
  'guru-sekumpul-martapura': {
    wiki: ['Muhammad_Zaini_Abdul_Ghani'],
    commons: ['Musholla Ar-Raudhah Sekumpul Martapura', 'Masjid Agung Al-Karomah Martapura'],
  },
  'sultan-suriansyah-banjarmasin': {
    wiki: ['Masjid_Sultan_Suriansyah', 'Sultan_Suriansyah'],
    commons: ['Masjid Sultan Suriansyah Banjarmasin', 'Makam Sultan Suriansyah Banjarmasin'],
  },
  'habib-basirih-banjarmasin': {
    wiki: ['Kubah_Basirih'],
    commons: ['Kubah Basirih Banjarmasin', 'Masjid Raya Sabilal Muhtadin Banjarmasin'],
  },
  'datu-sanggul-rantau': {
    wiki: [],
    commons: ['Masjid Raya Sabilal Muhtadin Banjarmasin', 'Masjid Sultan Suriansyah'],
  },
  'syekh-kasyful-anwar-martapura': {
    wiki: ['Pondok_Pesantren_Darussalam_Martapura'],
    commons: ['Masjid Agung Al-Karomah Martapura', 'Martapura Mosque'],
  },
  'datu-abulung-sungai-batang': {
    wiki: [],
    commons: ['Masjid Agung Al-Karomah Martapura', 'Sungai Martapura Mosque'],
  },
  'sultan-syarif-abdurrahman-alkadrie-pontianak': {
    wiki: ['Masjid_Jami_Pontianak', 'Syarif_Abdurrahman_Alkadrie'],
    commons: ['Masjid Jami Sultan Syarif Abdurrahman Pontianak', 'Istana Kadriah Pontianak'],
  },
  'habib-husein-alkadrie-mempawah': {
    wiki: ['Keraton_Amantubillah'],
    commons: ['Istana Amantubillah Mempawah', 'Masjid Jami Pontianak'],
  },
  'kyai-gede-kotawaringin': {
    wiki: ['Masjid_Kyai_Gede'],
    commons: ['Masjid Kyai Gede Kotawaringin', 'Istana Kuning Pangkalan Bun'],
  },
  'tunggang-parangan-kutai-lama': {
    wiki: ['Kesultanan_Kutai_Kartanegara_ing_Martadipura'],
    commons: ['Masjid Jami Adji Amir Hasanuddin Tenggarong', 'Museum Mulawarman Tenggarong'],
  },
  'kh-abul-hasan-samarinda': {
    wiki: ['Masjid_Shirathal_Mustaqiem'],
    commons: ['Masjid Shirathal Mustaqiem Samarinda', 'Islamic Center Samarinda'],
  },
  'makam-raja-bulungan-tanjung-palas': {
    wiki: ['Kesultanan_Bulungan'],
    commons: ['Museum Kesultanan Bulungan', 'Tanjung Palas Bulungan'],
  },
  'syekh-yusuf-al-makassari': {
    wiki: ['Yusuf_al-Makassari'],
    commons: ['Makam Syekh Yusuf Gowa', 'Masjid Tua Katangka Gowa'],
  },
  'sultan-hasanuddin-gowa': {
    wiki: ['Sultan_Hasanuddin', 'Kompleks_Makam_Sultan_Hasanuddin'],
    commons: ['Makam Sultan Hasanuddin Gowa', 'Balla Lompoa Gowa'],
  },
  'datuk-ri-bandang': {
    wiki: ['Datuk_Ri_Bandang'],
    commons: ['Makam Raja-Raja Tallo Makassar', 'Masjid Raya Makassar'],
  },
  'datuk-patimang-luwu': {
    wiki: ['Masjid_Jami_Tua_Palopo'],
    commons: ['Masjid Tua Palopo', 'Masjid Jami Palopo'],
  },
  'datuk-ri-tiro': {
    wiki: ['Datuk_ri_Tiro'],
    commons: ['Masjid Islamic Center Dato Tiro Bulukumba', 'Masjid Tua Katangka'],
  },
  'pangeran-diponegoro-makassar': {
    wiki: ['Diponegoro', 'Makam_Pangeran_Diponegoro'],
    commons: ['Makam Pangeran Diponegoro Makassar', 'Diponegoro'],
  },
  'agh-muhammad-asad-sengkang': {
    wiki: ['Muhammad_As%27ad'],
    commons: ['Masjid Agung Ummul Qura Sengkang', 'Masjid Raya Makassar'],
  },
  'agh-abdurrahman-ambo-dalle-barru': {
    wiki: ['Abdurrahman_Ambo_Dalle'],
    commons: ['Masjid Agung Parepare', 'Masjid Raya Makassar'],
  },
  'imam-lapeo-polewali-mandar': {
    wiki: ['Imam_Lapeo'],
    commons: ['Masjid Nurut Taubah Lapeo', 'Polewali Mandar Mosque'],
  },
  'syekh-abdul-mannan-salabose-majene': {
    wiki: [],
    commons: ['Masjid Syekh Abdul Mannan Salabose Majene', 'Majene Mosque'],
  },
  'habib-idrus-bin-salim-al-jufri-palu': {
    wiki: ['Idrus_bin_Salim_al-Jufri', 'Alkhairaat'],
    commons: ['Idrus bin Salim al-Jufri', 'Alkhairaat Palu'],
  },
  'datuk-karama-palu': {
    wiki: ['Datuk_Karama'],
    commons: ['Masjid Agung Darussalam Palu', 'Palu Mosque'],
  },
  'kyai-mojo-tondano': {
    wiki: ['Kyai_Maja'],
    commons: ['Makam Kyai Mojo Tondano', 'Kyai Maja'],
  },
  'tuanku-imam-bonjol-minahasa': {
    wiki: ['Tuanku_Imam_Bonjol'],
    commons: ['Makam Tuanku Imam Bonjol Minahasa', 'Tuanku Imam Bonjol'],
  },
  'sultan-amai-gorontalo': {
    wiki: ['Sultan_Amai'],
    commons: ['Masjid Hunto Sultan Amai Gorontalo', 'Masjid Agung Baiturrahim Gorontalo'],
  },
  'ju-panggola-gorontalo': {
    wiki: [],
    commons: ['Masjid Agung Baiturrahim Gorontalo', 'Gorontalo Mosque'],
  },
  'sultan-murhum-buton': {
    wiki: ['Murhum', 'Benteng_Keraton_Buton'],
    commons: ['Masjid Agung Keraton Buton', 'Benteng Keraton Buton Baubau'],
  },

  // Bali, NTB, NTT, Maluku, Maluku Utara & Papua
  'habib-ali-bafaqih-negara': {
    wiki: [],
    commons: ['Masjid Raya Negara Jembrana Bali', 'Masjid di Bali'],
  },
  'habib-ali-kusamba': {
    wiki: [],
    commons: ['Masjid Nurul Huda Gelgel Klungkung', 'Masjid di Bali'],
  },
  'karangrupit-buleleng': {
    wiki: [],
    commons: ['Masjid Keramat Kuno Singaraja', 'Masjid Agung Jami Singaraja'],
  },
  'the-kwan-lie-buleleng': {
    wiki: [],
    commons: ['Masjid Agung Jami Singaraja', 'Singaraja Mosque'],
  },
  'makam-keramat-kembar-denpasar': {
    wiki: [],
    commons: ['Masjid Al-Muhajirin Denpasar', 'Masjid Raya Ukhuwah Denpasar'],
  },
  'pangeran-mas-sepuh-seseh': {
    wiki: [],
    commons: ['Pantai Seseh Bali', 'Masjid Agung Ibnu Batutah Nusa Dua'],
  },
  'siti-khotijah-denpasar': {
    wiki: [],
    commons: ['Masjid Raya Baiturrahmah Denpasar', 'Masjid di Bali'],
  },
  'habib-umar-bedugul-tabanan': {
    wiki: [],
    commons: ['Masjid Besar Al-Hidayah Bedugul', 'Bedugul Mosque Bali'],
  },
  'wali-kembar-karangasem': {
    wiki: [],
    commons: ['Puri Agung Karangasem', 'Masjid Karangasem Bali'],
  },
  'tgkh-zainuddin-abdul-madjid': {
    wiki: ['Muhammad_Zainuddin_Abdul_Madjid'],
    commons: ['Zainuddin Abdul Madjid', 'Islamic Center Mataram Lombok'],
  },
  'wali-nyatoq-lombok': {
    wiki: ['Masjid_Kuno_Rembitan'],
    commons: ['Masjid Kuno Rembitan Lombok', 'Masjid Kuno Bayan Beleq Lombok'],
  },
  'makam-loang-baloq': {
    wiki: [],
    commons: ['Masjid Hubbul Wathan Islamic Center Mataram', 'Loang Baloq Mataram'],
  },
  'makam-batu-layar-lombok': {
    wiki: [],
    commons: ['Masjid Kuno Bayan Beleq', 'Batu Layar Lombok'],
  },
  'makam-dana-traha-bima': {
    wiki: ['Kesultanan_Bima'],
    commons: ['Museum Asi Mbojo Bima', 'Masjid Sultan Muhammad Salahuddin Bima'],
  },
  'makam-sultan-menanga-solor': {
    wiki: ['Pulau_Solor'],
    commons: ['Benteng Lohayong Solor', 'Pulau Solor Flores Timur'],
  },
  'makam-keramat-kampung-solor-kupang': {
    wiki: [],
    commons: ['Masjid Raya Nurussaadah Kupang', 'Kupang Mosque'],
  },
  'makam-raja-islam-pulau-ende': {
    wiki: ['Kabupaten_Ende'],
    commons: ['Masjid Agung Nurul Hidayah Ende', 'Pulau Ende'],
  },
  'masjid-tua-wapauwe-kaitetu': {
    wiki: ['Masjid_Wapauwe'],
    commons: ['Masjid Tua Wapauwe Maluku', 'Wapauwe Mosque Ambon'],
  },
  'makam-penyebar-islam-banda-neira': {
    wiki: ['Banda_Neira'],
    commons: ['Banda Neira Maluku', 'Benteng Belgica Banda Neira'],
  },
  'sultan-zainal-abidin-ternate': {
    wiki: ['Masjid_Sultan_Ternate', 'Kesultanan_Ternate'],
    commons: ['Masjid Sultan Ternate', 'Kedaton Sultan Ternate'],
  },
  'sultan-baabullah-ternate': {
    wiki: ['Baabullah_dari_Ternate'],
    commons: ['Sultan Baabullah Ternate', 'Masjid Raya Al-Munawwar Ternate'],
  },
  'sultan-nuku-tidore': {
    wiki: ['Nuku_dari_Tidore'],
    commons: ['Sultan Nuku Tidore', 'Pulau Tidore Maluku Utara'],
  },
  'masjid-tua-patimburak-fakfak': {
    wiki: ['Masjid_Tua_Patimburak'],
    commons: ['Masjid Tua Patimburak Fakfak', 'Patimburak Mosque'],
  },
  'makam-raja-rumbati-fakfak': {
    wiki: ['Kabupaten_Fakfak'],
    commons: ['Masjid Tua Patimburak Fakfak', 'Fakfak Papua Barat'],
  },
  'makam-kesultanan-misool-raja-ampat': {
    wiki: ['Pulau_Misool'],
    commons: ['Misool Raja Ampat', 'Raja Ampat Islands'],
  },
};

const BANNED_SUBSTRINGS = [
  'copyright',
  'fair_use',
  'fairuse',
  '©',
  'no_free',
  'replace_this',
  'no_image',
  'placeholder',
  'ambox',
  'exclamation',
  'warning',
  'padlock',
  'question_book',
  'commons-logo',
  'wikimedia-logo',
  'wiki_letter',
  'icon',
  'logo',
  'emblem',
  'coat_of_arms',
  'lambang',
  'seal',
  'flag',
  'bendera',
  'map',
  'peta_',
  'locator',
  'location',
  'earth',
  'blue_marble',
  'globe',
  'planet',
  'satellite',
  'space',
  'signature',
  'tanda_tangan',
  'ttd',
  'stamp',
  'prangko',
  'disambig',
  'stub',
  'blank',
  'silhouette',
  'collectie_tropenmuseum_portret',
  'bupati',
  'wali_kota',
  'walikota',
  'gubernur',
  'candidate',
  'calon_',
  'kantor_',
  'batas_',
  'stasiun_',
  'arief_moelia',
  'djoko_susanto',
  'mohan_roliskana',
  'affan_alfian',
  'ali_mukhni',
  'aminatun',
  '.svg',
  '.gif',
  '.tif',
  '.tiff',
  '.pdf',
  '.djvu',
  '.ogg',
  '.ogv',
  '.webm',
  'makam_maulana_malik_ibrahim_tomb_complex',
  'makam_sunan_ampel',
  'sunan_bonang-bw',
  'makam_sunan_drajat_lamongan',
  'masjid_menara_kudus_tampak_depan',
  'makam_sunan_giri_gapura_undakan_pertama',
  'wisata_religi.jpg',
  'entrance_to_makam_sunan_gunung_jati',
  'habib_ali_kwitang',
  'moskee_luar_batang',
  'de_haven_van_tandjoengpriok',
];

export function isValidPhotoUrl(url, titleOrDesc = '', width = 640, height = 400) {
  if (!url || typeof url !== 'string') return false;
  let decodedUrl = url.toLowerCase();
  try {
    decodedUrl = decodeURIComponent(url).toLowerCase();
  } catch {
    // ignore
  }
  const lowerTitle = String(titleOrDesc || '').toLowerCase();
  const combined = `${decodedUrl} ${lowerTitle}`;

  if (!url.startsWith('https://upload.wikimedia.org/')) {
    return false;
  }

  for (const banned of BANNED_SUBSTRINGS) {
    if (combined.includes(banned)) {
      return false;
    }
  }

  if (!/\.(jpe?g|png|webp)(\?|$)/i.test(decodedUrl)) {
    return false;
  }

  if (typeof width === 'number' && width > 0 && width < 220) return false;
  if (typeof height === 'number' && height > 0 && height < 150) return false;

  return true;
}

function cleanWikimediaUrl(url) {
  return String(url || '').replace(/\?utm_source=[^&#]+$/, '');
}

async function fetchJsonWithTimeout(url, timeoutMs = 9000) {
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
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function tryWikipediaActionPageImages(titles, lang = 'id') {
  const cleanTitles = (Array.isArray(titles) ? titles : [titles])
    .map((t) => String(t || '').trim().replace(/\s+/g, '_'))
    .filter(Boolean);
  if (cleanTitles.length === 0) return null;

  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail|original&pithumbsize=640&titles=${cleanTitles
    .map((t) => encodeURIComponent(t))
    .join('|')}&redirects=1&format=json&origin=*`;
  const data = await fetchJsonWithTimeout(endpoint);
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;

  for (const page of Object.values(pages)) {
    const thumb = page?.thumbnail;
    const orig = page?.original;
    const candidate = cleanWikimediaUrl(thumb?.source || orig?.source);
    const w = thumb?.width || orig?.width || 640;
    const h = thumb?.height || orig?.height || 400;
    if (candidate && isValidPhotoUrl(candidate, page?.title, w, h)) {
      return candidate;
    }
  }
  return null;
}

async function tryCommonsSearch(queryStr, requireHeritageKeyword = false) {
  const cleanQ = String(queryStr || '').trim();
  if (!cleanQ) return null;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    `filetype:bitmap ${cleanQ}`
  )}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|dimensions&iiurlwidth=640&format=json&origin=*`;
  const data = await fetchJsonWithTimeout(url);
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;

  const pageList = Object.values(pages);
  const heritageRegex =
    /(masjid|mosque|moskee|makam|tomb|grave|mausoleum|keraton|istana|palace|pesantren|surau|meunasah|menara|kubah|cungkup|astana|sultan|sunan|syekh|habib|ulama|kiai|kyai|babad|sejarah)/i;
  const avoidRegex =
    /(food|makanan|kuliner|selfie|bus|train|kereta|spesies|insect|bird|plant|flower|hotel|mall|plaza|bandara|airport|stadion|stadium|rumah_sakit|hospital|gereja|church|cathedral|vihara|pura_)/i;

  const filtered = pageList.filter((p) => {
    const t = String(p?.title || '');
    if (avoidRegex.test(t)) return false;
    if (requireHeritageKeyword && !heritageRegex.test(t)) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const aScore = heritageRegex.test(String(a?.title || '')) ? 1 : 0;
    const bScore = heritageRegex.test(String(b?.title || '')) ? 1 : 0;
    return bScore - aScore;
  });

  for (const page of filtered) {
    const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
    if (!info) continue;
    const candidate = cleanWikimediaUrl(info.thumburl || info.url);
    const w = info.thumbwidth || info.width || 640;
    const h = info.thumbheight || info.height || 400;
    if (candidate && isValidPhotoUrl(candidate, page?.title, w, h)) {
      return candidate;
    }
  }
  return null;
}

async function tryCommonsGeosearch(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return null;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=10000&ggsnamespace=6&ggslimit=15&prop=imageinfo&iiprop=url|dimensions&iiurlwidth=640&format=json&origin=*`;
  const data = await fetchJsonWithTimeout(url);
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== 'object') return null;

  const pageList = Object.values(pages);
  const heritageRegex =
    /(masjid|mosque|moskee|makam|tomb|grave|mausoleum|keraton|istana|pesantren|surau|meunasah|menara|kubah|cungkup|astana|sultan|sunan|syekh|habib|ulama|kiai|kyai)/i;

  for (const page of pageList) {
    if (!heritageRegex.test(String(page?.title || ''))) continue;
    const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
    if (!info) continue;
    const candidate = cleanWikimediaUrl(info.thumburl || info.url);
    const w = info.thumbwidth || info.width || 640;
    const h = info.thumbheight || info.height || 400;
    if (candidate && isValidPhotoUrl(candidate, page?.title, w, h)) {
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

function cleanCityName(rawCity) {
  return String(rawCity || '')
    .replace(/\b(Kota|Kabupaten|Administrasi|Kepulauan)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function resolveVerifiedPhotoForSite(site) {
  const id = site.id;
  const legacyId = site.legacyId;
  if (FIRST_12_THUMB_BY_ID[id] || (legacyId && FIRST_12_THUMB_BY_ID[legacyId])) {
    return FIRST_12_THUMB_BY_ID[id] || FIRST_12_THUMB_BY_ID[legacyId];
  }

  // Stage A: Curated Wikipedia & Commons Map
  const curated = CURATED_WIKI_MAP[id];
  if (curated) {
    if (Array.isArray(curated.wiki) && curated.wiki.length > 0) {
      const fromId = await tryWikipediaActionPageImages(curated.wiki, 'id');
      if (fromId) return fromId;
      const fromEn = await tryWikipediaActionPageImages(curated.wiki, 'en');
      if (fromEn) return fromEn;
    }
    if (Array.isArray(curated.commons) && curated.commons.length > 0) {
      for (const q of curated.commons) {
        const fromCommons = await tryCommonsSearch(q, false);
        if (fromCommons) return fromCommons;
      }
    }
  }

  // Stage B: Wikipedia titles from site.references
  if (Array.isArray(site.references)) {
    const refTitles = [];
    for (const ref of site.references) {
      const m = String(ref || '').match(/Wikipedia Bahasa Indonesia:\s*([^.;()\n]+)/i);
      if (m && m[1]) {
        refTitles.push(m[1].trim());
      }
    }
    if (refTitles.length > 0) {
      const fromId = await tryWikipediaActionPageImages(refTitles, 'id');
      if (fromId) return fromId;
      const fromEn = await tryWikipediaActionPageImages(refTitles, 'en');
      if (fromEn) return fromEn;
    }
  }

  // Stage C: Simplified Figure + City Commons Search, Geosearch, & Regional Mosque Search
  const shortName = simplifyFigureName(site.title || site.name);
  const cityRaw = String(site.location?.city || site.city || '').trim();
  const cityShort = cleanCityName(cityRaw);
  const district = String(site.location?.district || site.district || '').trim();
  const province = String(site.location?.province || site.province || '').trim();

  if (shortName && cityShort) {
    const specificMatch = await tryCommonsSearch(`${shortName} ${cityShort}`, false);
    if (specificMatch) return specificMatch;
  }

  const lat = Number(site.location?.lat || 0);
  const lng = Number(site.location?.lng || 0);
  const geoFound = await tryCommonsGeosearch(lat, lng);
  if (geoFound) return geoFound;

  const heritageQueries = [];
  if (district && cityShort) heritageQueries.push(`Masjid ${district} ${cityShort}`);
  if (cityShort) {
    heritageQueries.push(`Masjid Agung ${cityShort}`);
    heritageQueries.push(`Masjid Raya ${cityShort}`);
    heritageQueries.push(`Masjid ${cityShort}`);
    heritageQueries.push(`Mosque ${cityShort}`);
  }
  if (province) {
    heritageQueries.push(`Masjid Raya ${province}`);
    heritageQueries.push(`Masjid Agung ${province}`);
    heritageQueries.push(`Mosque ${province}`);
  }

  for (const q of heritageQueries) {
    const found = await tryCommonsSearch(q, true);
    if (found) return found;
  }

  return null;
}

async function main() {
  const outJsonPath = path.join(rootDir, 'src/data/verifiedSiteImages.json');
  const resultMap = {};
  let verifiedCount = 0;

  console.log(`Starting verified photo resolution for ${SITES.length} sites...`);

  const BATCH_SIZE = 4;
  for (let i = 0; i < SITES.length; i += BATCH_SIZE) {
    const batch = SITES.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (site) => {
        const id = site.id;
        const slug = getSiteSlug(site);
        const legacyId = site.legacyId;

        const resolved = await resolveVerifiedPhotoForSite(site);
        if (resolved) {
          resultMap[id] = resolved;
          if (slug) resultMap[slug] = resolved;
          if (legacyId && !resultMap[legacyId]) resultMap[legacyId] = resolved;
          verifiedCount++;
          console.log(`[OK] ${id} -> ${resolved.slice(0, 88)}`);
        } else {
          console.warn(`[MISS] ${id} (${site.location?.city}, ${site.location?.province})`);
        }
      })
    );
  }

  fs.writeFileSync(outJsonPath, JSON.stringify(resultMap, null, 2) + '\n', 'utf8');

  const tsContent = `import verifiedSiteImages from './verifiedSiteImages.json';

/**
 * Pre-resolved, verified Wikimedia Commons / Wikipedia photographs for ziarah sites.
 * Generated by scripts/fetch-verified-images.mjs.
 */
export const PRE_RESOLVED_AUTHENTIC_IMAGES: Record<string, string> = verifiedSiteImages as Record<string, string>;
`;
  fs.writeFileSync(path.join(rootDir, 'src/data/authenticImageUrls.ts'), tsContent, 'utf8');

  console.log(`\n========================================`);
  console.log(`Verified Authentic Photos: ${verifiedCount} / ${SITES.length} sites`);
  console.log(`Saved to: ${outJsonPath}`);
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
