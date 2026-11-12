import { describe, it, expect } from 'vitest';
import { SITES } from '../../data/sites';
import { JAWA_BARAT_BANTEN_DKI_SITES } from '../../data/regions/jawaBaratBantenDki';
import { JAWA_TENGAH_DIY_SITES } from '../../data/regions/jawaTengahDiy';
import { JAWA_TIMUR_MADURA_SITES } from '../../data/regions/jawaTimurMadura';
import { SUMATERA_SITES } from '../../data/regions/sumatera';
import { KALIMANTAN_SULAWESI_SITES } from '../../data/regions/kalimantanSulawesi';
import { BALI_NUSA_MALUKU_PAPUA_SITES } from '../../data/regions/baliNusaMalukuPapua';
import { getSiteGoogleMapsNavigationUrl } from '../../components/SiteDetails';
import { ADMIN_WHATSAPP_NUMBER } from '../../config/siteCopy';
import { getSiteBarokahHajat, getSiteLogistics, HONEST_UNVERIFIED_LOGISTICS_FALLBACK } from '../siteLogistics';

describe('Audit Integritas Data Makam & Navigasi Peta (dataIntegrity)', () => {
  it('memastikan tidak ada id makam yang duplikat di seluruh katalog SITES', () => {
    expect(SITES.length).toBeGreaterThanOrEqual(96);
    const seenIds = new Set<string>();
    for (const site of SITES) {
      expect(site.id).toBeTruthy();
      expect(seenIds.has(site.id)).toBe(false);
      seenIds.add(site.id);
    }
  });

  it('memastikan seluruh koordinat lat berada di rentang Indonesia (-11.5 s.d. 6.5) dan lng di rentang Indonesia (94.5 s.d. 141.5)', () => {
    for (const site of SITES) {
      const { lat, lng } = site.location;
      expect(typeof lat).toBe('number');
      expect(typeof lng).toBe('number');
      expect(Number.isNaN(lat)).toBe(false);
      expect(Number.isNaN(lng)).toBe(false);
      expect(lat).toBeGreaterThanOrEqual(-11.5);
      expect(lat).toBeLessThanOrEqual(6.5);
      expect(lng).toBeGreaterThanOrEqual(94.5);
      expect(lng).toBeLessThanOrEqual(141.5);
    }
  });

  it('memastikan tidak ada dua makam berbeda yang memakai titik koordinat default Semarang (lat: -6.95, lng: 110.42)', () => {
    const defaultSemarangMatches = SITES.filter(
      (s) => Math.abs(s.location.lat - -6.95) < 0.0001 && Math.abs(s.location.lng - 110.42) < 0.0001
    );
    expect(defaultSemarangMatches.length).toBeLessThanOrEqual(1);
  });

  it('menghasilkan URL navigasi Google Maps berbasis Place Search atau googleMapsUrl yang akurat', () => {
    const sample = SITES[0];
    const searchUrl = getSiteGoogleMapsNavigationUrl(sample);
    expect(searchUrl).toContain('https://www.google.com/maps/search/?api=1&query=');
    expect(decodeURIComponent(searchUrl)).toContain(`Makam ${sample.name}`);

    const customUrlSite = {
      ...sample,
      googleMapsUrl: 'https://maps.app.goo.gl/customPlaceId123',
    };
    expect(getSiteGoogleMapsNavigationUrl(customUrlSite)).toBe(
      'https://maps.app.goo.gl/customPlaceId123'
    );
  });

  it('menyediakan konstanta terpusat ADMIN_WHATSAPP_NUMBER yang valid', () => {
    expect(ADMIN_WHATSAPP_NUMBER).toMatch(/^62\d{8,14}$/);
  });

  it('memverifikasi kelengkapan seluruh 29 makam Tahap 2 (Jawa Barat, Banten & DKI Jakarta) sesuai standar filologi dan anti-halusinasi', () => {
    const requiredTahap2Ids = [
      'sunan-gunung-jati',
      'syekh-datuk-kahfi',
      'pangeran-cakrabuana',
      'syekh-magelung-sakti',
      'syekh-quro-karawang',
      'syekh-bentong-karawang',
      'syekh-abdul-muhyi-pamijahan',
      'mama-cibaduyut-kudang',
      'syekh-jafar-shadiq-cibiuk',
      'sunan-rohmat-godog',
      'dalem-cikundul-cianjur',
      'mama-gentur-cianjur',
      'mama-sempur-purwakarta',
      'kh-abdul-halim-majalengka',
      'sultan-maulana-hasanuddin',
      'sultan-maulana-yusuf',
      'sultan-ageng-tirtayasa',
      'syekh-maulana-mansyur-cikaduen',
      'syekh-asnawi-caringin',
      'syekh-nawawi-al-bantani',
      'habib-husein-luar-batang',
      'mbah-priok',
      'pangeran-jayakarta',
      'habib-ahmad-bin-alwi-al-haddad',
      'habib-ali-kwitang',
      'habib-utsman-bin-yahya',
      'guru-marzuki-cipinang',
      'habib-abdullah-empang-bogor',
      'raden-saleh-syarif-bustaman-bogor',
      'mama-falak-pagentongan-bogor',
      'eyang-dalem-abdul-manaf-mahmud',
      'kh-noer-ali-bekasi',
    ];

    const regionalIds = new Set(JAWA_BARAT_BANTEN_DKI_SITES.map((s) => s.id));
    for (const reqId of requiredTahap2Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    for (const site of JAWA_BARAT_BANTEN_DKI_SITES) {
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }
  });

  it('memverifikasi kelengkapan seluruh makam Tahap 3 (Jawa Tengah & DI Yogyakarta) sesuai standar filologi dan anti-halusinasi', () => {
    const requiredTahap3Ids = [
      'sunan-kalijaga',
      'sunan-kudus',
      'sunan-muria',
      'raden-patah-demak',
      'syekh-jangkung-pati',
      'syekh-mutamakkin-kajen',
      'ratu-kalinyamat-jepara',
      'habib-ahmad-sapuro',
      'ki-ageng-pandanaran-semarang',
      'sunan-pandanaran-bayat',
      'kh-sholeh-darat-semarang',
      'sunan-katong-kaliwungu',
      'syekh-subakir-tidar',
      'kh-dalhar-watucongol',
      'kh-subchi-parakan',
      'kh-muntaha-wonosobo',
      'syekh-makhdum-wali',
      'ki-ageng-henis-laweyan',
      'habib-anis-solo',
      'ki-ageng-gribig-jatinom',
      'syekh-maulana-maghribi-parangtritis',
      'syekh-bela-belu',
      'panembahan-senopati-kotagede',
      'sultan-agung-imogiri',
      'kh-ahmad-dahlan-jogja',
      'kh-munawwir-krapyak',
      'kyai-nur-iman-mlangi',
      'kh-arwani-amin-kudus',
      'mbah-maimoen-zubair-sarang',
      'masyayikh-lasem-rembang',
      'habib-hasyim-bin-yahya-pekalongan',
      'kh-ahmad-rifai-kalisalak',
    ];

    const regionalIds = new Set(JAWA_TENGAH_DIY_SITES.map((s) => s.id));
    for (const reqId of requiredTahap3Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    for (const site of JAWA_TENGAH_DIY_SITES) {
      expect(['Jawa Tengah', 'DI Yogyakarta']).toContain(site.province);
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }
  });

  it('memverifikasi kelengkapan seluruh 37 makam Tahap 4 (Jawa Timur & Pulau Madura) sesuai standar filologi dan anti-halusinasi', () => {
    const requiredTahap4Ids = [
      'syekh-maulana-malik-ibrahim',
      'sunan-ampel',
      'sunan-giri',
      'sunan-bonang',
      'sunan-drajat',
      'fatimah-binti-maimun',
      'syekh-maulana-ishaq',
      'syekh-ibrahim-asmorokondi',
      'sunan-sendang-duwur',
      'sunan-bungkul-surabaya',
      'habib-abu-bakar-gresik',
      'mbah-ud-sidoarjo',
      'kh-abdul-hamid-pasuruan',
      'kh-asad-syamsul-arifin',
      'kh-muhammad-shiddiq-jember',
      'datuk-malik-ibrahim-banyuwangi',
      'habib-sholeh-tanggul-jember',
      'guru-bangil-pasuruan',
      'sunan-bejagung-tuban',
      'kh-hasyim-asyari-tebuireng',
      'gus-dur-tebuireng',
      'kh-wahab-chasbullah',
      'kh-bisri-syansuri',
      'kh-romly-tamim-rejoso',
      'syekh-jumadil-kubro-troloyo',
      'syekh-wasil-setono-gedong',
      'kh-abdul-karim-lirboyo',
      'gus-miek-ploso-kediri',
      'syekh-ihsan-jampes-kediri',
      'bathoro-katong-ponorogo',
      'kh-hasan-besari-tegalsari',
      'masyayikh-tremas-pacitan',
      'syaichona-kholil-bangkalan',
      'ratu-ibu-arosbaya',
      'sunan-cendana-bangkalan',
      'bujuk-batu-ampar',
      'sayyid-yusuf-talango',
    ];

    const regionalIds = new Set(JAWA_TIMUR_MADURA_SITES.map((s) => s.id));
    for (const reqId of requiredTahap4Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    for (const site of JAWA_TIMUR_MADURA_SITES) {
      expect(site.province).toBe('Jawa Timur');
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }
  });

  it('memverifikasi kelengkapan seluruh 28 makam Tahap 5 (10 Provinsi Pulau Sumatera) sesuai standar filologi dan anti-halusinasi', () => {
    const requiredTahap5Ids = [
      'syekh-abdurrauf-as-singkili',
      'syekh-hamzah-fansuri',
      'sultan-malikussaleh',
      'sultan-iskandar-muda',
      'teungku-di-anjong-banda-aceh',
      'syekh-abdul-wahab-rokan-besilam',
      'syekh-musthafa-husein-purba-baru',
      'makam-papan-tinggi-mahligai-barus',
      'syekh-hasan-mashum-medan',
      'syekh-burhanuddin-ulakan',
      'syekh-sulaiman-ar-rasuli-canduang',
      'syekh-muhammad-jamil-jaho',
      'sultan-syarif-kasim-ii-siak',
      'syekh-abdurrahman-siddiq-sapat',
      'marhum-pekan-senapelan',
      'raja-ali-haji-penyengat',
      'sultan-mahmud-riayat-syah-lingga',
      'sultan-thaha-syaifuddin-tebo',
      'guru-abdul-madjid-baragbah-jambi',
      'kiai-marogan-palembang',
      'kompleks-kawah-tengkurep-palembang',
      'gubah-duku-habib-ahmad-shahab-palembang',
      'tuan-guru-siddiq-muntok-bangka',
      'syekh-abu-bakar-al-attas-bangka',
      'sentot-alibasyah-bengkulu',
      'syekh-burhanuddin-imam-senggolo-bengkulu',
      'raden-intan-ii-lampung',
      'kh-ghalib-pringsewu-lampung',
    ];

    const expectedSumateraProvinces = [
      'Aceh',
      'Sumatera Utara',
      'Sumatera Barat',
      'Riau',
      'Kepulauan Riau',
      'Jambi',
      'Sumatera Selatan',
      'Kepulauan Bangka Belitung',
      'Bengkulu',
      'Lampung',
    ];

    const regionalIds = new Set(SUMATERA_SITES.map((s) => s.id));
    for (const reqId of requiredTahap5Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    const coveredProvinces = new Set(SUMATERA_SITES.map((s) => s.province));
    for (const prov of expectedSumateraProvinces) {
      expect(coveredProvinces.has(prov)).toBe(true);
    }

    for (const site of SUMATERA_SITES) {
      expect(expectedSumateraProvinces).toContain(site.province);
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }
  });

  it('memverifikasi kelengkapan seluruh 29 makam Tahap 6 (5 Provinsi Kalimantan & 6 Provinsi Sulawesi) sesuai standar filologi dan anti-halusinasi', () => {
    const requiredTahap6Ids = [
      'syekh-muhammad-arsyad-al-banjari',
      'guru-sekumpul-martapura',
      'sultan-suriansyah-banjarmasin',
      'habib-basirih-banjarmasin',
      'datu-sanggul-rantau',
      'syekh-kasyful-anwar-martapura',
      'datu-abulung-sungai-batang',
      'sultan-syarif-abdurrahman-alkadrie-pontianak',
      'habib-husein-alkadrie-mempawah',
      'kyai-gede-kotawaringin',
      'tunggang-parangan-kutai-lama',
      'kh-abul-hasan-samarinda',
      'makam-raja-bulungan-tanjung-palas',
      'syekh-yusuf-al-makassari',
      'datuk-ri-bandang',
      'datuk-patimang-luwu',
      'datuk-ri-tiro',
      'pangeran-diponegoro-makassar',
      'agh-muhammad-asad-sengkang',
      'agh-abdurrahman-ambo-dalle-barru',
      'imam-lapeo-polewali-mandar',
      'syekh-abdul-mannan-salabose-majene',
      'habib-idrus-bin-salim-al-jufri-palu',
      'datuk-karama-palu',
      'kyai-mojo-tondano',
      'tuanku-imam-bonjol-minahasa',
      'sultan-amai-gorontalo',
      'ju-panggola-gorontalo',
      'sultan-murhum-buton',
    ];

    const expectedKalimantanSulawesiProvinces = [
      'Kalimantan Selatan',
      'Kalimantan Barat',
      'Kalimantan Tengah',
      'Kalimantan Timur',
      'Kalimantan Utara',
      'Sulawesi Selatan',
      'Sulawesi Barat',
      'Sulawesi Tengah',
      'Sulawesi Utara',
      'Gorontalo',
      'Sulawesi Tenggara',
    ];

    const regionalIds = new Set(KALIMANTAN_SULAWESI_SITES.map((s) => s.id));
    for (const reqId of requiredTahap6Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    const coveredProvinces = new Set(KALIMANTAN_SULAWESI_SITES.map((s) => s.province));
    for (const prov of expectedKalimantanSulawesiProvinces) {
      expect(coveredProvinces.has(prov)).toBe(true);
    }

    for (const site of KALIMANTAN_SULAWESI_SITES) {
      expect(expectedKalimantanSulawesiProvinces).toContain(site.province);
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }
  });

  it('memverifikasi kelengkapan seluruh 25 makam Tahap 7 (Bali, NTB, NTT, Maluku, Maluku Utara & Papua) serta 100% kurasi logistik tanpa tebakan kata kunci', () => {
    const requiredTahap7Ids = [
      'habib-ali-bafaqih-negara',
      'habib-ali-kusamba',
      'karangrupit-buleleng',
      'the-kwan-lie-buleleng',
      'makam-keramat-kembar-denpasar',
      'pangeran-mas-sepuh-seseh',
      'siti-khotijah-denpasar',
      'habib-umar-bedugul-tabanan',
      'wali-kembar-karangasem',
      'tgkh-zainuddin-abdul-madjid',
      'wali-nyatoq-lombok',
      'makam-loang-baloq',
      'makam-batu-layar-lombok',
      'makam-dana-traha-bima',
      'makam-sultan-menanga-solor',
      'makam-keramat-kampung-solor-kupang',
      'makam-raja-islam-pulau-ende',
      'masjid-tua-wapauwe-kaitetu',
      'makam-penyebar-islam-banda-neira',
      'sultan-zainal-abidin-ternate',
      'sultan-baabullah-ternate',
      'sultan-nuku-tidore',
      'masjid-tua-patimburak-fakfak',
      'makam-raja-rumbati-fakfak',
      'makam-kesultanan-misool-raja-ampat',
    ];

    const expectedEasternProvinces = [
      'Bali',
      'Nusa Tenggara Barat',
      'Nusa Tenggara Timur',
      'Maluku',
      'Maluku Utara',
      'Papua Barat',
      'Papua Barat Daya',
    ];

    const regionalIds = new Set(BALI_NUSA_MALUKU_PAPUA_SITES.map((s) => s.id));
    for (const reqId of requiredTahap7Ids) {
      expect(regionalIds.has(reqId)).toBe(true);
    }

    const coveredProvinces = new Set(BALI_NUSA_MALUKU_PAPUA_SITES.map((s) => s.province));
    for (const prov of expectedEasternProvinces) {
      expect(coveredProvinces.has(prov)).toBe(true);
    }

    for (const site of BALI_NUSA_MALUKU_PAPUA_SITES) {
      expect(expectedEasternProvinces).toContain(site.province);
      expect(site.district).toBeTruthy();
      expect(site.era).toBeTruthy();
      const historyParagraphs = site.history.split(/\n\s*\n/).filter(Boolean);
      expect(historyParagraphs.length).toBeGreaterThanOrEqual(3);

      const karomahText = Array.isArray(site.karomah) ? site.karomah.join('\n\n') : String(site.karomah || '');
      expect(karomahText).toContain('<!--more-->');

      expect(site.untoldStory).toBeTruthy();
      expect(site.untoldStory).toContain('<!--more-->');

      expect(site.barokahHajat).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length).toBeGreaterThan(0);
      expect(site.doaKhusus?.[0]?.arab).toBeTruthy();
      expect(site.doaKhusus?.[0]?.latin).toBeTruthy();
      expect(site.doaKhusus?.[0]?.terjemahan).toBeTruthy();
      expect(site.haulSchedule).toBeTruthy();
      expect(site.localAdab).toBeTruthy();
      expect(site.references && site.references.length).toBeGreaterThanOrEqual(2);
      expect(site.verifiedBy).toBe('Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara');
      expect(site.lastVerified).toBe('2026-11-11');
    }

    // Pastikan 100% seluruh makam di SITES telah memiliki field eksplisit barokahHajat, doaKhusus, haulSchedule, dan localAdab
    for (const site of SITES) {
      expect(site.barokahHajat, `Missing barokahHajat on ${site.id}`).toBeTruthy();
      expect(site.doaKhusus && site.doaKhusus.length > 0, `Missing doaKhusus on ${site.id}`).toBe(true);
      expect(site.haulSchedule, `Missing haulSchedule on ${site.id}`).toBeTruthy();
      expect(site.localAdab, `Missing localAdab on ${site.id}`).toBeTruthy();
    }

    // Pastikan fallback siteLogistics menyusun narasi spesifik berbasis peran sejarah (nama, kota, provinsi)
    // dan jadwal haul jujur jika ada makam usulan baru yang belum memiliki barokahHajat / haulSchedule eksplisit
    const unverifiedNewSite = {
      ...SITES[0],
      id: 'usulan-pengunjung-baru',
      legacyId: undefined,
      barokahHajat: undefined,
      haulSchedule: undefined,
    };
    const fallbackHajat = getSiteBarokahHajat(unverifiedNewSite);
    expect(fallbackHajat).toContain(unverifiedNewSite.name);
    expect(fallbackHajat).toContain(unverifiedNewSite.location.city);
    expect(fallbackHajat).toContain(unverifiedNewSite.location.province);
    expect(getSiteLogistics(unverifiedNewSite).haulSchedule).toBe(
      HONEST_UNVERIFIED_LOGISTICS_FALLBACK
    );
  });
});


