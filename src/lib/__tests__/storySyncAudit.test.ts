import { describe, expect, it } from 'vitest';
import { SITES } from '../../data/sites';
import { INITIAL_SITES } from '../../data/initialSites';
import {
  getSiteBarokahHajat,
  getEffectiveSiteDoaKhusus,
  getSiteLogistics,
} from '../siteLogistics';
// @ts-expect-error postbuild script is an untyped ESM module
import { buildPanduanRootHtml, buildRubrikRootHtml } from '../../../scripts/vercel-postbuild.mjs';

const GRESIK_ALLOWED_IDS = new Set([
  'sunan-gresik',
  'syekh-maulana-malik-ibrahim',
  'wali-1',
]);
const AMPEL_ALLOWED_IDS = new Set([
  'sunan-ampel',
  'wali-2',
]);
const BONANG_ALLOWED_IDS = new Set([
  'sunan-bonang',
  'wali-3',
]);
const DRAJAT_ALLOWED_IDS = new Set([
  'sunan-drajat',
  'wali-4',
]);

describe('storySyncAudit — Historical Narrative Uniqueness & Anti-Template Fallback Audit', () => {
  it('ensures "pesisir Leran, Gresik" only appears on Sunan Gresik / Syekh Maulana Malik Ibrahim', () => {
    for (const site of SITES) {
      const logistics = getSiteLogistics(site);
      const combined = `${site.karomah} ${site.untoldStory} ${logistics.karomah} ${logistics.untoldStory}`;
      if (combined.includes('pesisir Leran, Gresik')) {
        expect(
          GRESIK_ALLOWED_IDS.has(site.id) || (site.legacyId ? GRESIK_ALLOWED_IDS.has(site.legacyId) : false),
          `Site ${site.id} (${site.name}) unexpectedly contains Sunan Gresik's Leran story`
        ).toBe(true);
      }
    }
  });

  it('ensures "pemuda bangsawan Majapahit yang hancur hidupnya akibat judi" only appears on Sunan Ampel', () => {
    for (const site of SITES) {
      const logistics = getSiteLogistics(site);
      const combined = `${site.karomah} ${site.untoldStory} ${logistics.karomah} ${logistics.untoldStory}`;
      if (combined.includes('pemuda bangsawan Majapahit yang hancur hidupnya akibat judi')) {
        expect(
          AMPEL_ALLOWED_IDS.has(site.id) || (site.legacyId ? AMPEL_ALLOWED_IDS.has(site.legacyId) : false),
          `Site ${site.id} (${site.name}) unexpectedly contains Sunan Ampel's Majapahit gambler story`
        ).toBe(true);
      }
    }
  });

  it('ensures "Wujil—mantan abdi terkasih keraton Majapahit" only appears on Sunan Bonang', () => {
    for (const site of SITES) {
      const logistics = getSiteLogistics(site);
      const combined = `${site.karomah} ${site.untoldStory} ${logistics.karomah} ${logistics.untoldStory}`;
      if (combined.includes('Wujil—mantan abdi terkasih keraton Majapahit')) {
        expect(
          BONANG_ALLOWED_IDS.has(site.id) || (site.legacyId ? BONANG_ALLOWED_IDS.has(site.legacyId) : false),
          `Site ${site.id} (${site.name}) unexpectedly contains Sunan Bonang's Wujil story`
        ).toBe(true);
      }
    }
  });

  it('ensures "mendaki bukit Dalem Duwur sambil mendekap anaknya" only appears on Sunan Drajat', () => {
    for (const site of SITES) {
      const logistics = getSiteLogistics(site);
      const combined = `${site.karomah} ${site.untoldStory} ${logistics.karomah} ${logistics.untoldStory}`;
      if (combined.includes('mendaki bukit Dalem Duwur sambil mendekap anaknya')) {
        expect(
          DRAJAT_ALLOWED_IDS.has(site.id) || (site.legacyId ? DRAJAT_ALLOWED_IDS.has(site.legacyId) : false),
          `Site ${site.id} (${site.name}) unexpectedly contains Sunan Drajat's Dalem Duwur story`
        ).toBe(true);
      }
    }
  });

  it('ensures "Raden Prawoto" never appears on Sunan Muria or anywhere in SITES / INITIAL_SITES', () => {
    const sunanMuria = SITES.find((s) => s.id === 'sunan-muria' || s.legacyId === 'wali-8');
    expect(sunanMuria).toBeDefined();
    expect(sunanMuria?.name).toBe('Raden Umar Said (Sunan Muria)');
    expect(JSON.stringify(sunanMuria)).not.toContain('Raden Prawoto');

    for (const site of [...SITES, ...INITIAL_SITES]) {
      expect(site.name).not.toContain('Raden Prawoto');
    }
  });

  it('ensures no two different sites in SITES share 100% identical karomah or untoldStory text', () => {
    const seenKaromah = new Map<string, string>();
    const seenUntold = new Map<string, string>();

    for (const site of SITES) {
      const karomahNorm = (
        Array.isArray(site.karomah) ? site.karomah.join('\n') : String(site.karomah || '')
      ).trim();
      const untoldNorm = String(site.untoldStory || '').trim();

      expect(karomahNorm.length, `Site ${site.id} has empty karomah`).toBeGreaterThan(20);
      expect(untoldNorm.length, `Site ${site.id} has empty untoldStory`).toBeGreaterThan(20);

      const prevKaromahSite = seenKaromah.get(karomahNorm);
      expect(
        prevKaromahSite,
        `Site ${site.id} has 100% identical karomah with ${prevKaromahSite}`
      ).toBeUndefined();
      seenKaromah.set(karomahNorm, site.id);

      const prevUntoldSite = seenUntold.get(untoldNorm);
      expect(
        prevUntoldSite,
        `Site ${site.id} has 100% identical untoldStory with ${prevUntoldSite}`
      ).toBeUndefined();
      seenUntold.set(untoldNorm, site.id);
    }
  });

  it('ensures getSiteBarokahHajat and getEffectiveSiteDoaKhusus mention site.name, city, and province without jodoh/hutang template fallbacks', () => {
    for (const site of SITES) {
      const hajat = getSiteBarokahHajat(site);
      expect(hajat.length).toBeGreaterThan(40);
      expect(hajat).not.toContain('dimudahkan bertemu jodoh yang shalih/shalihah');
      expect(hajat).not.toContain('dimudahkan melunasi beban hutang');

      // When site.barokahHajat is empty, role-based fallback must mention site.name, city, and province
      const roleFallbackHajat = getSiteBarokahHajat({ ...site, barokahHajat: undefined });
      expect(roleFallbackHajat).toContain(site.name);
      expect(roleFallbackHajat).toContain(site.city || site.location.city);
      expect(roleFallbackHajat).toContain(site.province || site.location.province);

      const doaList = getEffectiveSiteDoaKhusus(site);
      expect(doaList.length).toBeGreaterThanOrEqual(1);
      expect(doaList[0].text).toContain(site.name);
      expect(doaList[0].latin).toContain(site.name);
      expect(doaList[0].translation).toContain(site.name);
    }
  });

  it('ensures buildRubrikRootHtml() and buildPanduanRootHtml() generate valid static HTML without undefined references', () => {
    const rubrikHtml = buildRubrikRootHtml();
    const panduanHtml = buildPanduanRootHtml();

    expect(rubrikHtml).toContain('<main id="seo-prerender-shell"');
    expect(rubrikHtml).not.toContain('undefined');
    expect(panduanHtml).toContain('<main id="seo-prerender-shell"');
    expect(panduanHtml).not.toContain('undefined');
  });

  it('verifies all Java & Madura sites have unique history, karomah (with <!--more-->), untoldStory (with <!--more-->), and verified historical facts', () => {
    const javaProvinces = new Set([
      'DKI Jakarta',
      'Banten',
      'Jawa Barat',
      'Jawa Tengah',
      'DI Yogyakarta',
      'Jawa Timur',
    ]);
    const javaSites = SITES.filter((s) =>
      javaProvinces.has(s.province || s.location.province)
    );
    expect(javaSites.length).toBeGreaterThanOrEqual(80);

    const seenHistory = new Map<string, string>();
    for (const site of javaSites) {
      const historyNorm = String(site.history || '').trim();
      expect(historyNorm.length, `Site ${site.id} has short history`).toBeGreaterThan(80);
      expect(
        seenHistory.get(historyNorm),
        `Site ${site.id} shares duplicate history with ${seenHistory.get(historyNorm)}`
      ).toBeUndefined();
      seenHistory.set(historyNorm, site.id);

      const karomahText = Array.isArray(site.karomah)
        ? site.karomah.join('\n')
        : String(site.karomah || '');
      expect(karomahText, `Site ${site.id} karomah missing <!--more-->`).toContain('<!--more-->');
      expect(
        String(site.untoldStory || ''),
        `Site ${site.id} untoldStory missing <!--more-->`
      ).toContain('<!--more-->');
      expect(Array.isArray(site.references) && site.references.length > 0, `Site ${site.id} missing references`).toBe(true);
    }

    // Specific Kamus Fakta Sejarah & Manaqib Terverifikasi checks
    const kwitang = SITES.find((s) => s.id === 'habib-ali-kwitang');
    expect(kwitang?.barokahHajat).toContain('Wasilah keberkahan ilmu agama, kecintaan (mahabbah) kepada Rasulullah SAW dan Ahlul Bait');
    expect(kwitang?.haulSchedule).toContain('Hari Ahad terakhir bulan Rabiul Akhir (Haul Akbar Majelis Kwitang)');

    const luarBatang = SITES.find((s) => s.id === 'habib-husein-luar-batang');
    expect(luarBatang?.barokahHajat).toContain('Wasilah keteguhan iman di tengah ujian, keberkahan dakwah dan perniagaan yang jujur');
    expect(JSON.stringify(luarBatang)).toContain('Glodok');
    expect(JSON.stringify(luarBatang)).toContain('Haji Abdul Kadir');

    const mbahPriok = SITES.find((s) => s.id === 'mbah-priok');
    expect(mbahPriok?.barokahHajat).toContain('Wasilah kesabaran menghadapi badai ujian hidup, pengorbanan di jalan dakwah');

    const jayakarta = SITES.find((s) => s.id === 'pangeran-jayakarta');
    expect(jayakarta?.barokahHajat).toContain('Wasilah keberanian mempertahankan kedaulatan dan kehormatan umat');
    expect(JSON.stringify(jayakarta)).toContain('Mona Lohanda');

    const habibKuncung = SITES.find((s) => s.id === 'habib-ahmad-bin-alwi-al-haddad');
    expect(habibKuncung?.barokahHajat).toContain('Wasilah kelembutan hati, kepedulian terhadap anak yatim dan dhuafa');

    const empangBogor = SITES.find((s) => s.id === 'habib-abdullah-empang-bogor');
    expect(empangBogor?.barokahHajat).toContain('Wasilah keteguhan memegang sunnah Rasulullah SAW, kesabaran dalam ujian, dan keberkahan ilmu');

    const kholil = SITES.find((s) => s.id === 'syaichona-kholil-bangkalan');
    expect(JSON.stringify(kholil)).toContain('tongkat');
    expect(JSON.stringify(kholil)).toContain('tasbih');
  });

  it('verifies all Outer Islands sites (Sumatera, Kalimantan, Sulawesi, Bali, NTB, NTT, Maluku, Maluku Utara, Papua Barat, Papua Barat Daya) have 100% unique history, karomah, untoldStory, and verified historical facts', () => {
    const outerProvinces = new Set([
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
      'Bali',
      'Nusa Tenggara Barat',
      'Nusa Tenggara Timur',
      'Maluku',
      'Maluku Utara',
      'Papua Barat',
      'Papua Barat Daya',
    ]);

    const outerSites = SITES.filter((s) =>
      outerProvinces.has(s.province || s.location.province)
    );
    expect(outerSites.length).toBeGreaterThanOrEqual(80);

    // Ensure all 28 outer provinces are represented
    const coveredOuterProvinces = new Set(
      outerSites.map((s) => s.province || s.location.province)
    );
    for (const prov of outerProvinces) {
      expect(coveredOuterProvinces.has(prov), `Missing outer province ${prov}`).toBe(true);
    }

    // Ensure 100% unique history across ALL SITES in the entire catalog
    const seenAllHistory = new Map<string, string>();
    for (const site of SITES) {
      const historyNorm = String(site.history || '').trim();
      expect(historyNorm.length, `Site ${site.id} has short history`).toBeGreaterThan(80);
      expect(
        seenAllHistory.get(historyNorm),
        `Site ${site.id} shares duplicate history with ${seenAllHistory.get(historyNorm)}`
      ).toBeUndefined();
      seenAllHistory.set(historyNorm, site.id);

      const karomahText = Array.isArray(site.karomah)
        ? site.karomah.join('\n')
        : String(site.karomah || '');
      expect(karomahText, `Site ${site.id} karomah missing <!--more-->`).toContain('<!--more-->');
      expect(
        String(site.untoldStory || ''),
        `Site ${site.id} untoldStory missing <!--more-->`
      ).toContain('<!--more-->');
      expect(
        Array.isArray(site.references) && site.references.length > 0,
        `Site ${site.id} missing references`
      ).toBe(true);
    }

    // A. Pulau Sumatera checks
    const malikussaleh = SITES.find((s) => s.id === 'sultan-malikussaleh');
    expect(JSON.stringify(malikussaleh)).toContain('Hikayat Raja-Raja Pasai');
    expect(JSON.stringify(malikussaleh)).toContain('Ibnu Battutah');
    expect(JSON.stringify(malikussaleh)).toContain('696 H');

    const syiahKuala = SITES.find((s) => s.id === 'syekh-abdurrauf-as-singkili');
    expect(JSON.stringify(syiahKuala)).toContain('Tarjuman al-Mustafid');
    expect(JSON.stringify(syiahKuala)).toContain('Syattariyah');
    expect(JSON.stringify(syiahKuala)).toContain('2004');

    const iskandarMuda = SITES.find((s) => s.id === 'sultan-iskandar-muda');
    expect(JSON.stringify(iskandarMuda)).toContain('Baiturrahman');
    expect(JSON.stringify(iskandarMuda)).toContain('Adat Makuta Alam');

    const besilam = SITES.find((s) => s.id === 'syekh-abdul-wahab-rokan-besilam');
    expect(JSON.stringify(besilam)).toContain('Babussalam');
    expect(besilam?.haulSchedule).toContain('21 Jumadil Akhir');

    const barus = SITES.find((s) => s.id === 'makam-papan-tinggi-mahligai-barus');
    expect(JSON.stringify(barus)).toContain('Syekh Mahmud');
    expect(JSON.stringify(barus)).toContain('Mahligai');

    const ulakan = SITES.find((s) => s.id === 'syekh-burhanuddin-ulakan');
    expect(JSON.stringify(ulakan)).toContain('Basafa');
    expect(JSON.stringify(ulakan)).toContain('Safar');

    const siak = SITES.find((s) => s.id === 'sultan-syarif-kasim-ii-siak');
    expect(JSON.stringify(siak)).toContain('13 juta gulden');

    const sapat = SITES.find((s) => s.id === 'syekh-abdurrahman-siddiq-sapat');
    expect(JSON.stringify(sapat)).toContain('Syair Ibarat dan Khabar Kiamat');
    expect(JSON.stringify(sapat)).toContain('Kampung Hidayat');

    const penyengat = SITES.find((s) => s.id === 'raja-ali-haji-penyengat');
    expect(JSON.stringify(penyengat)).toContain('Tuhfat Al-Nafis');
    expect(JSON.stringify(penyengat)).toContain('Gurindam Dua Belas');

    const marogan = SITES.find((s) => s.id === 'kiai-marogan-palembang');
    expect(JSON.stringify(marogan)).toContain('17 Rajab 1319 H');
    expect(JSON.stringify(marogan)).toContain('Masjid Lawang Kidul');

    // B. Kalimantan & Sulawesi checks
    const kalampayan = SITES.find((s) => s.id === 'syekh-muhammad-arsyad-al-banjari');
    expect(JSON.stringify(kalampayan)).toContain('Sabilal Muhtadin');
    expect(JSON.stringify(kalampayan)).toContain('Dalam Pagar');

    const sekumpul = SITES.find((s) => s.id === 'guru-sekumpul-martapura');
    expect(sekumpul?.haulSchedule).toContain('5 Rajab');
    expect(JSON.stringify(sekumpul)).toContain('Ar-Raudhah');

    const syekhYusuf = SITES.find((s) => s.id === 'syekh-yusuf-al-makassari');
    expect(JSON.stringify(syekhYusuf)).toContain('Tuanta Salamaka');
    expect(JSON.stringify(syekhYusuf)).toContain('Afrika Selatan');
    expect(JSON.stringify(syekhYusuf)).toContain('Sultan Hasanuddin');
    expect(JSON.stringify(syekhYusuf)).toContain('Ayam Jantan dari Timur');

    const diponegoro = SITES.find((s) => s.id === 'pangeran-diponegoro-makassar');
    expect(JSON.stringify(diponegoro)).toContain('Babad Diponegoro');
    expect(JSON.stringify(diponegoro)).toContain('UNESCO');
    expect(JSON.stringify(diponegoro)).toContain('8 Januari 1855');

    const guruTua = SITES.find((s) => s.id === 'habib-idrus-bin-salim-al-jufri-palu');
    expect(JSON.stringify(guruTua)).toContain('Alkhairaat');
    expect(guruTua?.haulSchedule).toContain('12 Syawal');

    // C. Bali, NTB, NTT, Maluku, Maluku Utara & Papua checks
    const bafaqih = SITES.find((s) => s.id === 'habib-ali-bafaqih-negara');
    expect(JSON.stringify(bafaqih)).toContain('Syamsul Huda');
    expect(JSON.stringify(bafaqih)).toContain('1998 M');

    const pancor = SITES.find((s) => s.id === 'tgkh-zainuddin-abdul-madjid');
    expect(JSON.stringify(pancor)).toContain('Nahdlatul Wathan');
    expect(JSON.stringify(pancor)).toContain('Sholatihiyah');

    const baabullah = SITES.find((s) => s.id === 'sultan-baabullah-ternate');
    expect(baabullah?.barokahHajat).toBe(
      'Wasilah keteguhan iman, keberanian menjaga kedaulatan bangsa dan kehormatan agama dari kezaliman, kepemimpinan yang adil dan berwibawa, serta persatuan umat di kepulauan Nusantara.'
    );
    expect(JSON.stringify(baabullah)).toContain('Penguasa 72 Pulau');

    const nuku = SITES.find((s) => s.id === 'sultan-nuku-tidore');
    expect(JSON.stringify(nuku)).toContain('Jou Barakati');

    const wapauwe = SITES.find((s) => s.id === 'masjid-tua-wapauwe-kaitetu');
    expect(JSON.stringify(wapauwe)).toContain('1414 M');
    expect(JSON.stringify(wapauwe)).toContain('Imam Rijali');

    const patimburak = SITES.find((s) => s.id === 'masjid-tua-patimburak-fakfak');
    expect(JSON.stringify(patimburak)).toContain('1870 M');
    expect(JSON.stringify(patimburak)).toContain('Satu Tungku Tiga Batu');

    const misool = SITES.find((s) => s.id === 'makam-kesultanan-misool-raja-ampat');
    expect(JSON.stringify(misool)).toContain('Lilinta');
    expect(JSON.stringify(misool)).toContain('Fafanlap');
  });
});


