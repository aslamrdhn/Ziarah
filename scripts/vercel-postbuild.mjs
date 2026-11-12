import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SITE_ORIGIN = 'https://ziarahnusantara.my.id';
const cwd = process.cwd();
const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : cwd;
const rootDist = path.resolve(cwd, 'dist');
const rootPublic = path.resolve(cwd, 'public');

if (!process.env.VITEST && !fs.existsSync(rootDist)) {
  console.error('[postbuild] Error: dist directory was not generated at', rootDist);
  process.exit(1);
}

// Strip temporary chat screenshot attachments from production dist/
const tempAistudioAssets = path.join(rootDist, 'assets', 'aistudio');
if (!process.env.VITEST && fs.existsSync(tempAistudioAssets)) {
  fs.rmSync(tempAistudioAssets, { recursive: true, force: true });
}

export function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugifySiteText(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getSiteSlug(title, city, id) {
  const titleSlug = slugifySiteText(title);
  const citySlug = slugifySiteText(city);
  if (!citySlug || titleSlug.includes(citySlug)) {
    return titleSlug || slugifySiteText(id);
  }
  return `${titleSlug}-${citySlug}`;
}

export function cleanSeoText(val) {
  return String(val || '')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/<!--more-->/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractQuotedField(block, fieldName, fallback = '') {
  const regex = new RegExp(`\\b${fieldName}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`);
  const m = block.match(regex);
  if (!m) return fallback;
  return cleanSeoText(m[2]) || fallback;
}

function parseSiteBlocksFromRawTs(raw) {
  const idRegex = /\bid:\s*(['"])((?:\\.|(?!\1).)*)\1/g;
  const positions = [];
  let match;
  while ((match = idRegex.exec(raw)) !== null) {
    positions.push({ id: cleanSeoText(match[2]), index: match.index });
  }
  const extracted = [];
  for (let i = 0; i < positions.length; i++) {
    const { id, index } = positions[i];
    if (!id) continue;
    const nextIndex = i + 1 < positions.length ? positions[i + 1].index : raw.length;
    const block = raw.slice(index, nextIndex);
    const name = extractQuotedField(block, 'name', id);
    const title = extractQuotedField(block, 'title', id);
    const category = extractQuotedField(block, 'category', 'Waliyullah Nusantara');
    const description = extractQuotedField(block, 'description', '');
    const history = extractQuotedField(block, 'history', '');
    const address = extractQuotedField(block, 'address', '');
    const city = extractQuotedField(block, 'city', '');
    const province = extractQuotedField(block, 'province', '');
    const era = extractQuotedField(block, 'era', '');
    const sanad = extractQuotedField(block, 'sanad', '');
    const slug = getSiteSlug(title, city, id);
    extracted.push({
      id,
      slug,
      name,
      title,
      category,
      description,
      history,
      address,
      city,
      province,
      era,
      sanad,
    });
  }
  return extracted;
}

const REGIONAL_ID_TO_LEGACY_ID = {
  // Jawa Barat, Banten & DKI Jakarta (Tahap 2)
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
  // Jawa Tengah & DI Yogyakarta (Tahap 3)
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
  // Jawa Timur & Pulau Madura (Tahap 4)
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
  // Sumatera (Tahap 5)
  'syekh-abdurrauf-as-singkili': 'ulama-3',
  'syekh-hamzah-fansuri': 'ulama-24',
  'sultan-malikussaleh': 'auliya-25',
  'teungku-di-anjong-banda-aceh': 'habib-15',
  'syekh-abdul-wahab-rokan-besilam': 'ulama-26',
  'makam-papan-tinggi-mahligai-barus': 'ulama-36',
  'syekh-burhanuddin-ulakan': 'ulama-25',
  'kiai-marogan-palembang': 'ulama-27',
  'kompleks-kawah-tengkurep-palembang': 'auliya-26',
  // Kalimantan & Sulawesi (Tahap 6)
  'syekh-muhammad-arsyad-al-banjari': 'ulama-28',
  'guru-sekumpul-martapura': 'ulama-2',
  'sultan-suriansyah-banjarmasin': 'auliya-16',
  'habib-basirih-banjarmasin': 'habib-12',
  'habib-husein-alkadrie-mempawah': 'habib-16',
  'syekh-yusuf-al-makassari': 'ulama-4',
  'datuk-ri-bandang': 'auliya-17',
  'datuk-patimang-luwu': 'auliya-27',
  'datuk-ri-tiro': 'auliya-28',
  'habib-idrus-bin-salim-al-jufri-palu': 'habib-13',
  'kyai-mojo-tondano': 'ulama-29',
  // Bali, Nusa Tenggara, Maluku & Papua (Tahap 7)
  'habib-ali-bafaqih-negara': 'habib-11',
  'habib-ali-kusamba': 'habib-10',
  'karangrupit-buleleng': 'auliya-22',
  'pangeran-mas-sepuh-seseh': 'auliya-13',
  'siti-khotijah-denpasar': 'auliya-23',
  'tgkh-zainuddin-abdul-madjid': 'ulama-23',
  'makam-loang-baloq': 'auliya-15',
  'sultan-baabullah-ternate': 'auliya-29',
};

export function extractSitesFromSource(customTarget) {
  let sitesFile = path.resolve(cwd, 'src', 'data', 'sites.ts');
  let regionsDir = path.resolve(cwd, 'src', 'data', 'regions');

  if (customTarget && typeof customTarget === 'string') {
    const resolvedTarget = path.resolve(customTarget);
    if (fs.existsSync(resolvedTarget) && fs.statSync(resolvedTarget).isDirectory()) {
      sitesFile = path.join(resolvedTarget, 'src', 'data', 'sites.ts');
      regionsDir = path.join(resolvedTarget, 'src', 'data', 'regions');
    } else if (resolvedTarget.endsWith('.ts')) {
      sitesFile = resolvedTarget;
      regionsDir = path.join(path.dirname(resolvedTarget), 'regions');
    }
  }

  const byId = new Map();

  // 1. Read BASE_SITES from src/data/sites.ts
  if (fs.existsSync(sitesFile)) {
    const rawBase = fs.readFileSync(sitesFile, 'utf8');
    for (const item of parseSiteBlocksFromRawTs(rawBase)) {
      if (!byId.has(item.id)) {
        byId.set(item.id, item);
      }
    }
  }

  // 2. Read all regional .ts files in src/data/regions/ and override/deduplicate by id or legacyId
  if (fs.existsSync(regionsDir) && fs.statSync(regionsDir).isDirectory()) {
    const regionFiles = fs
      .readdirSync(regionsDir)
      .filter((f) => f.endsWith('.ts'))
      .sort();

    for (const fileName of regionFiles) {
      const fullRegionPath = path.join(regionsDir, fileName);
      if (!fs.statSync(fullRegionPath).isFile()) continue;
      const rawRegion = fs.readFileSync(fullRegionPath, 'utf8');
      for (const item of parseSiteBlocksFromRawTs(rawRegion)) {
        const legacyTargetId = REGIONAL_ID_TO_LEGACY_ID[item.id];
        const prevBySameId = byId.get(item.id);
        const prevByLegacyId = legacyTargetId ? byId.get(legacyTargetId) : undefined;
        const prev = prevBySameId || prevByLegacyId;

        if (prev) {
          const mergedTitle = item.title || prev.title;
          const mergedCity = item.city || prev.city;
          const mergedObj = {
            id: item.id,
            slug: getSiteSlug(mergedTitle, mergedCity, item.id),
            name: item.name || prev.name,
            title: mergedTitle,
            category: item.category || prev.category,
            description: item.description || prev.description,
            history: item.history || prev.history,
            address: item.address || prev.address,
            city: mergedCity,
            province: item.province || prev.province,
            era: item.era || prev.era,
            sanad: item.sanad || prev.sanad,
          };
          if (prevByLegacyId && legacyTargetId && legacyTargetId !== item.id) {
            const rebuilt = new Map();
            for (const [k, v] of byId.entries()) {
              if (k === legacyTargetId) {
                rebuilt.set(item.id, mergedObj);
              } else {
                rebuilt.set(k, v);
              }
            }
            byId.clear();
            for (const [k, v] of rebuilt.entries()) {
              byId.set(k, v);
            }
          } else {
            byId.set(item.id, mergedObj);
          }
        } else {
          byId.set(item.id, item);
        }
      }
    }
  }

  return Array.from(byId.values());
}

function buildStaticRoutes(siteCount, provinceCount) {
  return [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      title: `Ziarah Kubur & Makam Wali Nusantara: Doa, Yasin, Tahlil & Peta ${siteCount} Wali | Ziarah Nusantara`,
      description: `Panduan lengkap ziarah kubur dan direktori ${siteCount} makam Wali Songo & Ulama Nusantara di ${provinceCount} provinsi. Dilengkapi bacaan doa ziarah kubur (Arab, Latin, Artinya), Surah Yasin, Tahlil, Tasbih digital, kisah karomah, dan peta rute GPS.`,
    },
    {
      path: '/direktori',
      priority: '0.9',
      changefreq: 'daily',
      title: `Direktori ${siteCount} Makam Walisongo, Ulama & Habaib di ${provinceCount} Provinsi — Ziarah Nusantara`,
      description: `Jejak spiritual ${siteCount} lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di ${provinceCount} provinsi Indonesia lengkap dengan alamat, peta rute GPS, kisah karomah, dan bacaan doa tawassul.`,
    },
    {
      path: '/peta',
      priority: '0.9',
      changefreq: 'weekly',
      title: 'Peta Rute Ziarah Makam Wali Songo & Ulama Nusantara — Ziarah Nusantara',
      description: `Peta interaktif titik lokasi GPS dan navigasi rute perjalanan ziarah ke ${siteCount} makam Waliyullah serta ulama besar di seluruh kepulauan Indonesia.`,
    },
    {
      path: '/panduan',
      priority: '0.9',
      changefreq: 'weekly',
      title: 'Panduan Ziarah Kubur Lengkap: Urutan Doa (Arab, Latin, Artinya), Tahlil, Yasin & Adab | Ziarah Nusantara',
      description:
        'Tuntunan lengkap adab & urutan bacaan doa ziarah kubur orang tua dan makam Wali (Arab, Latin, Artinya), Salam Ahli Kubur, Qasidah Salamullah Ya Sadah, Tawassul, Yasin & Tahlil sesuai sunnah Ahlussunnah wal Jamaah.',
    },
    {
      path: '/rubrik',
      priority: '0.8',
      changefreq: 'weekly',
      title: 'Rubrik Sejarah, Kisah Karomah & Wasiat Batin Para Wali — Ziarah Nusantara',
      description:
        'Kisah nyata keteladanan, wasiat batin, sanad keilmuan, dan sejarah dakwah para Waliyullah Nusantara berbasis naskah babad dan jurnal akademik.',
    },
    {
      path: '/doa',
      priority: '0.8',
      changefreq: 'monthly',
      title: 'Kumpulan Doa Khusus Ziarah Kubur, Tahlil & Tawassul Lengkap — Ziarah Nusantara',
      description:
        'Bacaan salam ziarah kubur, susunan tawassul khusus para Waliyullah, Surah Yasin, dan tahlil lengkap teks Arab, transliterasi Latin, serta terjemahan Bahasa Indonesia.',
    },
    {
      path: '/donasi',
      priority: '0.8',
      changefreq: 'monthly',
      title: 'Infaq Operasional & Pemeliharaan Digital Arsip Sejarah Makam Wali — Ziarah Nusantara',
      description: `Layanan Infaq Operasional & Pemeliharaan Digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori ${siteCount} makam Waliyullah tetap bebas akses.`,
    },
    {
      path: '/infaq',
      priority: '0.7',
      changefreq: 'monthly',
      title: 'Infaq Operasional & Pemeliharaan Digital Arsip Sejarah Makam Wali — Ziarah Nusantara',
      description: `Layanan Infaq Operasional & Pemeliharaan Digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori ${siteCount} makam Waliyullah tetap bebas akses.`,
    },
    {
      path: '/kurasi',
      priority: '0.7',
      changefreq: 'monthly',
      title: 'Standar Kurasi & Metodologi Referensi Sejarah — Ziarah Nusantara',
      description: `Pedoman metodologi verifikasi sumber sejarah, jurnal akademik, naskah babad, dan kurasi ${siteCount} situs makam di ${provinceCount} provinsi oleh Tim Kurator Arsip Ziarah Nusantara.`,
    },
  ];
}

function parseFirestoreStringField(fields, key, fallback = '') {
  const val = fields?.[key]?.stringValue;
  return typeof val === 'string' && val.trim() ? cleanSeoText(val) : fallback;
}

async function fetchCloudSitesForSeo(localSites) {
  try {
    const configPath = path.resolve(cwd, 'firebase-applet-config.json');
    if (!fs.existsSync(configPath) || typeof fetch !== 'function') {
      return localSites;
    }

    const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const projectId = rawConfig.projectId;
    const databaseId = rawConfig.firestoreDatabaseId || '(default)';
    const apiKey = rawConfig.apiKey;
    if (!projectId) return localSites;

    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      projectId
    )}/databases/${encodeURIComponent(databaseId)}/documents/sites?pageSize=300${
      apiKey ? `&key=${encodeURIComponent(apiKey)}` : ''
    }`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    let res;
    try {
      res = await fetch(url, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }

    if (!res || !res.ok) {
      return localSites;
    }

    const json = await res.json();
    const docs = Array.isArray(json?.documents) ? json.documents : [];
    if (docs.length === 0) return localSites;

    const mergedById = new Map();
    const slugToId = new Map();
    for (const s of localSites) {
      mergedById.set(s.id, s);
      if (s.slug) slugToId.set(s.slug, s.id);
    }

    let addedCloudCount = 0;
    for (const docItem of docs) {
      const f = docItem.fields || {};
      const docNameParts = String(docItem.name || '').split('/');
      const docId = parseFirestoreStringField(f, 'id', docNameParts[docNameParts.length - 1]);
      if (!docId) continue;

      if (f.isDeleted?.booleanValue === true) {
        const existingSlug = mergedById.get(docId)?.slug;
        mergedById.delete(docId);
        if (existingSlug) slugToId.delete(existingSlug);
        continue;
      }

      const locFields = f.location?.mapValue?.fields || {};
      const baseById = mergedById.get(docId);
      const name = parseFirestoreStringField(f, 'name', baseById?.name || docId);
      const title = parseFirestoreStringField(f, 'title', baseById?.title || `Makam ${name}`);
      const city = parseFirestoreStringField(locFields, 'city', baseById?.city || 'Nusantara');
      const slug = getSiteSlug(title, city, docId);

      // Deduplicate by id or slug
      const existingIdBySlug = slugToId.get(slug);
      const targetId = baseById ? docId : existingIdBySlug || docId;
      const base = mergedById.get(targetId);

      const category = parseFirestoreStringField(f, 'category', base?.category || 'Waliyullah Nusantara');
      const description = parseFirestoreStringField(f, 'description', base?.description || '');
      const history = parseFirestoreStringField(f, 'history', base?.history || description);
      const address = parseFirestoreStringField(locFields, 'address', base?.address || '');
      const province = parseFirestoreStringField(locFields, 'province', base?.province || 'Indonesia');
      const era = parseFirestoreStringField(f, 'era', base?.era || '');
      const sanad = parseFirestoreStringField(f, 'sanad', base?.sanad || '');

      if (!base) addedCloudCount++;
      const mergedEntry = {
        id: targetId,
        slug: base?.slug || slug,
        name,
        title,
        category,
        description,
        history,
        address,
        city,
        province,
        era,
        sanad,
      };
      mergedById.set(targetId, mergedEntry);
      slugToId.set(mergedEntry.slug, targetId);
    }

    console.log(
      `[postbuild] Synced ${docs.length} cloud sites from Firestore REST API (${addedCloudCount} net-new cloud sites merged).`
    );
    return Array.from(mergedById.values());
  } catch (err) {
    console.log('[postbuild] Using local sites catalog fallback (Firestore REST sync skipped):', err?.message || 'offline');
    return localSites;
  }
}

const localExtractedSites = extractSitesFromSource();
const sites = process.env.VITEST ? localExtractedSites : await fetchCloudSitesForSeo(localExtractedSites);
const uniqueProvinces = Array.from(new Set(sites.map((s) => s.province).filter(Boolean))).sort();
const staticRoutes = buildStaticRoutes(sites.length, uniqueProvinces.length);

function buildDirectoryLinksHtml() {
  return `
    <section aria-label="Indeks Direktori Lengkap ${sites.length} Makam Waliyullah di ${uniqueProvinces.length} Provinsi">
      <h2>Daftar Lengkap ${sites.length} Lokasi Ziarah Makam Waliyullah, Walisongo, Ulama, dan Habaib di ${uniqueProvinces.length} Provinsi Indonesia</h2>
      <p>Berikut adalah indeks direktori situs pemakaman para Waliyullah, ulama pesantren, dan habaib yang tersebar di berbagai wilayah kepulauan Nusantara beserta tautan menuju halaman peta rute dan riwayat sejarah masing-masing tokoh:</p>
      ${uniqueProvinces
        .map((prov) => {
          const provSites = sites.filter((s) => s.province === prov);
          return `
            <div>
              <h3>Daftar Lokasi Ziarah Makam Wali di Provinsi ${escapeHtml(prov)} (${provSites.length} Situs)</h3>
              <ul>
                ${provSites
                  .map(
                    (s) =>
                      `<li><a href="${SITE_ORIGIN}/situs/${escapeHtml(s.slug)}">Panduan Rute dan Sejarah Makam ${escapeHtml(s.title)} di Kota ${escapeHtml(s.city)}, Provinsi ${escapeHtml(s.province)}</a></li>`
                  )
                  .join('\n                ')}
              </ul>
            </div>`;
        })
        .join('\n      ')}
    </section>`;
}

function buildHomepageRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Ziarah Kubur &amp; Makam Wali Nusantara: Doa, Yasin, Tahlil &amp; Peta ${sites.length} Wali | Ziarah Nusantara</h1>
          <p><strong>Panduan lengkap ziarah kubur dan direktori ${sites.length} makam Wali Songo &amp; Ulama Nusantara.</strong> Dilengkapi bacaan doa ziarah kubur (Arab, Latin, Artinya), Surah Yasin, Tahlil, Tasbih digital, kisah karomah, dan peta rute GPS di ${uniqueProvinces.length} provinsi Indonesia.</p>
        </header>
        <section>
          <h2>Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?</h2>
          <p>Secara bahasa, kata <strong>ziarah</strong> berarti berkunjung atau menengok. Dalam syariat Islam, hukum melaksanakan ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim: <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em> Tujuan utama berziarah adalah melembutkan hati yang sedang penat oleh urusan dunia, mengingatkan diri akan kematian dan hari akhirat, mendoakan ampunan bagi orang tua serta kaum muslimin yang telah wafat, dan meneladani kesalehan maupun perjuangan dakwah para Waliyullah.</p>
          <h2>Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?</h2>
          <ol>
            <li><strong>Berwudhu dan Meluruskan Niat:</strong> Memasuki kawasan pemakaman dengan pakaian yang sopan, menjaga ketenangan, dan meluruskan niat berziarah semata-mata mengharap ridha Allah SWT.</li>
            <li><strong>Mengucapkan Salam kepada Ahli Kubur:</strong> Menghadap ke arah makam sambil mengucapkan salam penghormatan dan mendoakan keselamatan bagi seluruh penghuni makam kaum mukminin dan muslimin.</li>
            <li><strong>Membaca Istighfar dan Tawassul Al-Fatihah:</strong> Membaca istighfar tiga kali kemudian menghadiahkan pahala bacaan Surah Al-Fatihah kepada Nabi Muhammad SAW, para sahabat, para Waliyullah, ulama, orang tua, serta ahli kubur yang diziarahi.</li>
            <li><strong>Membaca Surah Yasin, Tahlil, dan Doa Arwah:</strong> Melantunkan Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, Ayat Kursi, kalimat dzikir tahlil, shalawat Nabi, lalu menutup dengan doa permohonan ampunan dan rahmat bagi ahli kubur.</li>
          </ol>
          <h2>Layanan dan Direktori Utama Ziarah Nusantara</h2>
          <ul>
            <li><a href="${SITE_ORIGIN}/direktori">Direktori ${sites.length} Makam Walisongo, Ulama, dan Habaib di ${uniqueProvinces.length} Provinsi Indonesia</a></li>
            <li><a href="${SITE_ORIGIN}/panduan">Panduan Doa Ziarah Kubur Lengkap (Arab, Latin, dan Artinya) beserta Tahlil dan Adab Ziarah</a></li>
            <li><a href="${SITE_ORIGIN}/peta">Peta Rute Perjalanan Ziarah Wali Songo dan Ulama Nusantara</a></li>
            <li><a href="${SITE_ORIGIN}/doa">Kumpulan Doa Khusus Ziarah Kubur, Tahlil, dan Tawassul</a></li>
            <li><a href="${SITE_ORIGIN}/rubrik">Rubrik Sejarah, Kisah Karomah, dan Wasiat Batin Para Wali</a></li>
            <li><a href="${SITE_ORIGIN}/kurasi">Standar Kurasi dan Metodologi Referensi Sejarah</a></li>
            <li><a href="${SITE_ORIGIN}/infaq">Infaq Operasional &amp; Pemeliharaan Digital dan Ruang Munajat Doa Peziarah</a></li>
          </ul>
        </section>
      </main>`;
}

function buildDirektoriRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Direktori ${sites.length} Makam Walisongo, Ulama &amp; Habaib di ${uniqueProvinces.length} Provinsi — Ziarah Nusantara</h1>
          <p>Jejak spiritual ${sites.length} lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di ${uniqueProvinces.length} provinsi Indonesia lengkap dengan alamat, peta rute perjalanan, kisah karomah, dan bacaan doa tawassul.</p>
        </header>
        ${buildDirectoryLinksHtml()}
      </main>`;
}

function buildPanduanRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Panduan Ziarah Kubur Lengkap: Urutan Doa (Arab, Latin, Artinya), Tahlil, Yasin &amp; Adab</h1>
          <p>Tuntunan lengkap adab, tata cara, dan urutan bacaan doa ziarah kubur singkat maupun lengkap untuk berziarah ke makam orang tua, kerabat, serta makam para Waliyullah (Wali Songo dan Ulama Nusantara) sesuai tradisi Ahlussunnah wal Jamaah.</p>
        </header>
        <h2>Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?</h2>
        <p>Dalam syariat Islam, hukum ziarah kubur adalah sunnah (dianjurkan) berdasarkan hadits shahih riwayat Imam Muslim: <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah kalian ke kubur, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em> Tujuan utamanya adalah mengingatkan diri kepada hari akhirat, mendoakan ampunan dan rahmat bagi ahli kubur, serta meneladani perjuangan dakwah dan kesalehan para Waliyullah.</p>
        <h2>Urutan Tata Cara dan Bacaan Doa Ziarah Kubur</h2>
        <ol>
          <li><strong>Berwudhu dan Meluruskan Niat:</strong> Memasuki kawasan pemakaman dengan sopan, melepas alas kaki bila diperlukan, dan berniat ziarah semata-mata karena Allah SWT.</li>
          <li><strong>Mengucapkan Salam Ahli Kubur:</strong> Mengucapkan salam penghormatan kepada penghuni makam kaum mukminin dan muslimin seraya mendoakan keselamatan bagi mereka dan bagi peziarah.</li>
          <li><strong>Membaca Salam Khusus Makam Waliyullah:</strong> Melantunkan bait salam penghormatan ketika memasuki area makam para Auliya dan ulama besar.</li>
          <li><strong>Membaca Istighfar dan Tawassul Al-Fatihah:</strong> Membaca istighfar tiga kali lalu mengirimkan hadiah bacaan Surah Al-Fatihah kepada Nabi Muhammad SAW, keluarga dan sahabat beliau, para Waliyullah, serta ahli kubur yang diziarahi.</li>
          <li><strong>Membaca Surah Yasin dan Surat Pendek:</strong> Membaca Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, Surah Al-Fatihah, dan Ayat Kursi.</li>
          <li><strong>Membaca Dzikir Tahlil dan Tasbih:</strong> Melantunkan kalimat tauhid tahlil, tasbih, tahmid, dan shalawat kepada Nabi Muhammad SAW dengan khusyuk.</li>
          <li><strong>Membaca Doa Ziarah Kubur (Doa Arwah):</strong> Menutup rangkaian ziarah dengan memohonkan ampunan, kelapangan kubur, dan rahmat Allah SWT bagi almarhum maupun almarhumah.</li>
        </ol>
      </main>`;
}

function buildSiteRootHtml(site) {
  const sameProvince = sites.filter((s) => s.id !== site.id && s.province === site.province);
  const otherSites = sites.filter((s) => s.id !== site.id && s.province !== site.province);
  const relatedSites = [...sameProvince, ...otherSites].slice(0, 6);
  const relatedLinksHtml = relatedSites
    .map(
      (rel) =>
        `<li><a href="${SITE_ORIGIN}/situs/${escapeHtml(rel.slug)}">Makam ${escapeHtml(rel.title)} (${escapeHtml(rel.city)}, ${escapeHtml(rel.province)})</a></li>`
    )
    .join('\n              ');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <article>
          <p><a href="${SITE_ORIGIN}/">Beranda Ziarah Nusantara</a> &rsaquo; <a href="${SITE_ORIGIN}/direktori">Direktori Provinsi ${escapeHtml(site.province)}</a> &rsaquo; Makam ${escapeHtml(site.title)}</p>
          <h1>Makam ${escapeHtml(site.title)} (${escapeHtml(site.name)}) — ${escapeHtml(site.city)}, ${escapeHtml(site.province)}</h1>
          <p><strong>Kategori Tokoh:</strong> ${escapeHtml(site.category)} ${site.era ? `| <strong>Periode Sejarah:</strong> ${escapeHtml(site.era)}` : ''}</p>
          <p><strong>Alamat Lokasi Pemakaman:</strong> ${escapeHtml(site.address)}, Kota/Kabupaten ${escapeHtml(site.city)}, Provinsi ${escapeHtml(site.province)}, Indonesia.</p>
          <h2>Profil, Riwayat Dakwah, dan Sejarah ${escapeHtml(site.title)}</h2>
          <p>${escapeHtml(site.description)}</p>
          <p>${escapeHtml(site.history)}</p>
          ${site.sanad ? `<h2>Sanad Keilmuan dan Jaringan Dakwah</h2><p>${escapeHtml(site.sanad)}</p>` : ''}
          <nav aria-label="Makam Wali Terkait">
            <h2>Makam Wali Terkait &amp; Panduan Bacaan Ziarah</h2>
            <ul>
              <li><a href="${SITE_ORIGIN}/panduan">Bacaan Yasin &amp; Doa Ziarah Kubur</a></li>
              <li><a href="${SITE_ORIGIN}/doa">Doa Khusus &amp; Wasilah Hajat</a></li>
              <li><a href="${SITE_ORIGIN}/peta">Buka Peta Rute Perjalanan Ziarah</a></li>
              ${relatedLinksHtml}
            </ul>
          </nav>
        </article>
      </main>`;
}

function buildRouteJsonLd(entry) {
  const canonicalHref = entry.canonicalLoc || entry.loc;
  const fullImageUrl = `${SITE_ORIGIN}/pwa-512x512.png`;
  const graphNodes = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Ziarah Nusantara',
      legalName: 'Tim Kurator Arsip Ziarah Nusantara',
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_ORIGIN}/#logo`,
        url: fullImageUrl,
        contentUrl: fullImageUrl,
        width: 512,
        height: 512,
      },
      image: { '@id': `${SITE_ORIGIN}/#logo` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: 'Ziarah Nusantara',
      description: cleanSeoText(entry.description),
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalHref}#webpage`,
      url: canonicalHref,
      name: cleanSeoText(entry.title),
      description: cleanSeoText(entry.description),
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      primaryImageOfPage: { '@id': `${SITE_ORIGIN}/#logo` },
      thumbnailUrl: fullImageUrl,
    },
  ];

  if (entry.site) {
    graphNodes.push({
      '@type': 'TouristAttraction',
      '@id': `${canonicalHref}#place`,
      name: `Makam ${cleanSeoText(entry.site.title)} (${cleanSeoText(entry.site.name)})`,
      description: cleanSeoText(entry.site.description),
      url: canonicalHref,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cleanSeoText(entry.site.address),
        addressLocality: cleanSeoText(entry.site.city),
        addressRegion: cleanSeoText(entry.site.province),
        addressCountry: 'ID',
      },
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  });
}

export function renderCustomHtml(baseHtml, entry) {
  const canonicalHref = entry.canonicalLoc || entry.loc;
  const cleanTitle = cleanSeoText(entry.title);
  const cleanDesc = cleanSeoText(entry.description);
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(cleanTitle)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(cleanDesc)}" />`
    )
    .replace(
      /<link rel="canonical" id="canonical-link" href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" id="canonical-link" href="${escapeHtml(canonicalHref)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="id-ID" id="hreflang-id" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="id-ID" id="hreflang-id" href="${escapeHtml(canonicalHref)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="id" id="hreflang-id-short" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="id" id="hreflang-id-short" href="${escapeHtml(canonicalHref)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" id="hreflang-default" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="x-default" id="hreflang-default" href="${escapeHtml(canonicalHref)}" />`
    )
    .replace(
      /<meta property="og:title" id="og-title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" id="og-title" content="${escapeHtml(cleanTitle)}" />`
    )
    .replace(
      /<meta property="og:description" id="og-description" content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(cleanDesc)}" />`
    )
    .replace(
      /<meta property="og:url" id="og-url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" id="og-url" content="${escapeHtml(entry.loc)}" />`
    )
    .replace(
      /<meta name="twitter:title" id="twitter-title" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" id="twitter-title" content="${escapeHtml(cleanTitle)}" />`
    )
    .replace(
      /<meta name="twitter:description" id="twitter-description" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" id="twitter-description" content="${escapeHtml(cleanDesc)}" />`
    );

  if (entry.site) {
    html = html.replace(
      /<script type="application\/ld\+json" id="schema-jsonld">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="schema-jsonld">${buildRouteJsonLd(entry)}</script>`
    );
  } else {
    html = html
      .replace(/\b96\s+(makam|lokasi makam|Wali|situs makam|Makam)/g, `${sites.length} $1`)
      .replace(/\b18\s+(provinsi|Provinsi)/g, `${uniqueProvinces.length} $1`);
  }

  if (entry.bodyHtml) {
    html = html.replace(
      /<!--SEO_ROOT_START-->[\s\S]*?<!--SEO_ROOT_END-->/i,
      `<!--SEO_ROOT_START-->\n      ${entry.bodyHtml}\n      <!--SEO_ROOT_END-->`
    );
  }
  return html;
}

if (!process.env.VITEST) {
  // Build canonical URL list for XML, TXT, and RSS sitemaps
  const allEntries = [
    ...staticRoutes.map((r) => ({
      loc: `${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`,
      canonicalLoc:
        r.path === '/direktori'
          ? `${SITE_ORIGIN}/`
          : r.path === '/infaq'
            ? `${SITE_ORIGIN}/donasi`
            : `${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`,
      isAliasRoute: r.path === '/direktori' || r.path === '/infaq',
      changefreq: r.changefreq,
      priority: r.priority,
      title: cleanSeoText(r.title),
      description: cleanSeoText(r.description),
      path: r.path,
      bodyHtml:
        r.path === '/panduan'
          ? buildPanduanRootHtml()
          : r.path === '/direktori'
            ? buildDirektoriRootHtml()
            : buildHomepageRootHtml(),
    })),
    ...sites.map((s) => {
      const legacyApostropheSlug = s.title.includes("'")
        ? getSiteSlug(s.title.split("'")[0], s.city, s.id)
        : null;
      return {
        loc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
        canonicalLoc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
        isAliasRoute: false,
        changefreq: 'weekly',
        priority: '0.8',
        title: cleanSeoText(`Makam ${s.title} (${s.city}, ${s.province}) — Rute, Kisah Karomah & Doa Ziarah | Ziarah Nusantara`),
        description: cleanSeoText(`${s.description} Lokasi: ${s.address}, ${s.city}, ${s.province}. Lengkap dengan peta rute, riwayat karomah, dan doa tawassul.`),
        path: `/situs/${s.slug}`,
        legacyPath: `/makam/${s.id}`,
        legacyApostrophePath:
          legacyApostropheSlug && legacyApostropheSlug !== s.slug
            ? `/situs/${legacyApostropheSlug}`
            : null,
        site: s,
        bodyHtml: buildSiteRootHtml(s),
      };
    }),
  ];

  const sitemapEntries = allEntries.filter((e) => !e.isAliasRoute);
  const todayIsoDate = new Date().toISOString().split('T')[0];

  // 1. Generate standards-compliant sitemap XML with W3C <lastmod> YYYY-MM-DD
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${todayIsoDate}</lastmod>\n  </url>`
    ),
    '</urlset>',
    '',
  ];
  const sitemapXmlContent = xmlLines.join('\n');

  // 1b. Generate Sitemap Index file (sitemap_index.xml)
  const sitemapIndexLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${SITE_ORIGIN}/sitemap.xml</loc>`,
    `    <lastmod>${todayIsoDate}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
    '',
  ];
  const sitemapIndexContent = sitemapIndexLines.join('\n');

  // 2. Generate plain-text sitemap.txt & clean robots.txt with single canonical Sitemap line
  const sitemapTxtContent = sitemapEntries.map((entry) => entry.loc).join('\n') + '\n';
  const robotsTxtContent = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');

  // 3. Generate RSS 2.0 feed (rss.xml) — also supported by Google Search Console as a Sitemap
  const rssLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>Ziarah Kubur &amp; Makam Wali Nusantara: Doa, Yasin, Tahlil &amp; Peta ${sites.length} Wali | Ziarah Nusantara</title>`,
    `    <link>${SITE_ORIGIN}/</link>`,
    `    <description>Panduan lengkap ziarah kubur dan direktori ${sites.length} makam Wali Songo &amp; Ulama Nusantara di ${uniqueProvinces.length} provinsi. Dilengkapi bacaan doa ziarah kubur (Arab, Latin, Artinya), Surah Yasin, Tahlil, Tasbih digital, kisah karomah, dan peta rute GPS.</description>`,
    '    <language>id-ID</language>',
    `    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...sitemapEntries.map(
      (entry) =>
        `    <item>\n      <title>${escapeXml(entry.title)}</title>\n      <link>${escapeXml(entry.loc)}</link>\n      <guid isPermaLink="true">${escapeXml(entry.loc)}</guid>\n      <description>${escapeXml(entry.description)}</description>\n    </item>`
    ),
    '  </channel>',
    '</rss>',
    '',
  ];
  const rssXmlContent = rssLines.join('\n');

  // 3b. Generate ziarah-sites.json & dynamic llms.txt so external tools & AI crawlers see all modular regional sites
  const ziarahSitesJsonContent = JSON.stringify(
    {
      totalSites: sites.length,
      totalProvinces: uniqueProvinces.length,
      provinces: uniqueProvinces,
      updatedAt: todayIsoDate,
      sites: sites.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        title: s.title,
        category: s.category,
        city: s.city,
        province: s.province,
        address: s.address,
        url: `${SITE_ORIGIN}/situs/${s.slug}`,
      })),
    },
    null,
    2
  );

  const llmsTxtContent = [
    '# Ziarah Nusantara',
    '',
    `> Situs resmi Ziarah Nusantara (${SITE_ORIGIN}) dikelola oleh Tim Kurator Arsip Ziarah Nusantara. Platform direktori ensiklopedis ${sites.length} makam para Waliyullah, Wali Songo, dan Ulama Nusantara di ${uniqueProvinces.length} provinsi Indonesia, dilengkapi peta rute geospasial, panduan adab ziarah, kumpulan doa tahlil & tawassul, serta literasi sejarah Islam Nusantara berbasis referensi jurnal ilmiah dan naskah babad.`,
    '',
    `Ziarah Nusantara menyediakan dokumentasi terverifikasi mengenai ${sites.length} lokasi makam di ${uniqueProvinces.length} provinsi, biografi sejarah, jaringan sanad keilmuan, karya tulis (kitab kuning/manuskrip), karomah, serta tuntunan doa ziarah kubur di seluruh Indonesia. Seluruh data dikurasi oleh Tim Kurator Arsip Ziarah Nusantara.`,
    '',
    '## Direktori & Layanan Utama',
    '',
    `- [Beranda & Katalog Direktori Makam](${SITE_ORIGIN}/): Halaman utama dan indeks pencarian seluruh ${sites.length} situs makam Waliyullah, Wali Songo, Ulama Pesantren, Habaib, dan Auliya Nusantara di ${uniqueProvinces.length} provinsi.`,
    `- [Arsip & Direktori Makam Waliyullah](${SITE_ORIGIN}/direktori): Katalog lengkap ${sites.length} situs ziarah di ${uniqueProvinces.join(', ')} beserta rujukan akademik.`,
    `- [Peta Rute Geospasial Ziarah](${SITE_ORIGIN}/peta): Peta interaktif lokasi ${sites.length} makam Waliyullah dengan perhitungan rute jalan raya dan estimasi waktu tempuh peziarah.`,
    `- [Panduan Adab & Tata Cara Ziarah](${SITE_ORIGIN}/panduan): Pedoman adab sopan santun, niat, salam ziarah, dan tuntunan ziarah kubur sesuai tradisi Ahlussunnah wal Jamaah.`,
    `- [Rubrik Kisah, Karomah & Naskah Sejarah](${SITE_ORIGIN}/rubrik): Kajian biografi mendalam, sanad keilmuan Haramain-Nusantara, dan keteladanan dakwah para Waliyullah.`,
    `- [Kumpulan Doa Khusus, Tahlil & Tawassul](${SITE_ORIGIN}/doa): Bacaan salam ziarah, susunan tawassul, Surah Yasin, dan tahlil lengkap teks Arab, Latin, dan terjemahan Bahasa Indonesia.`,
    `- [Infaq Operasional & Pemeliharaan Digital](${SITE_ORIGIN}/infaq): Layanan Infaq Operasional & Pemeliharaan Digital QRIS resmi Ziarah Nusantara untuk riset literasi sejarah dan pemeliharaan direktori ${sites.length} situs makam.`,
    '',
    '## Dokumentasi, Kebijakan & Metadata Agen',
    '',
    `- [Standar & Kebijakan Kurasi Ilmiah](${SITE_ORIGIN}/kurasi): Metodologi verifikasi sumber sejarah, jurnal akademik, skripsi, dan naskah babad oleh Tim Kurator Arsip Ziarah Nusantara.`,
    `- [Dokumentasi Lengkap LLMs](${SITE_ORIGIN}/llms-full.txt): Ringkasan komprehensif seluruh kategori makam, daftar tokoh Wali Songo & Ulama Nusantara, serta struktur data platform.`,
    `- [Indeks JSON Situs Makam](${SITE_ORIGIN}/ziarah-sites.json): Data terstruktur JSON seluruh ${sites.length} makam di ${uniqueProvinces.length} provinsi.`,
    `- [Katalog AI & WebMCP](${SITE_ORIGIN}/.well-known/ai-catalog.json): Skema katalog terstruktur untuk penjelajahan agen AI dan integrasi indeks pengetahuan.`,
    `- [Peta Situs XML](${SITE_ORIGIN}/sitemap.xml): Daftar indeks seluruh halaman publik Ziarah Nusantara.`,
    '',
  ].join('\n');

  // Write generated sitemaps, feeds, llms.txt, and ziarah-sites.json to both public/ and dist/
  for (const targetFolder of [rootPublic, rootDist]) {
    if (fs.existsSync(targetFolder)) {
      fs.writeFileSync(path.join(targetFolder, 'sitemap.xml'), sitemapXmlContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'peta-situs.xml'), sitemapXmlContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'sitemap-utama.xml'), sitemapXmlContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'sitemap_index.xml'), sitemapIndexContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'sitemap.txt'), sitemapTxtContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'rss.xml'), rssXmlContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'robots.txt'), robotsTxtContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'ziarah-sites.json'), ziarahSitesJsonContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'llms.txt'), llmsTxtContent, 'utf8');
    }
  }

  // 4. Pre-generate route-specific index.html files in dist/ with unique semantic body & metadata
  const baseIndexHtmlPath = path.join(rootDist, 'index.html');
  if (fs.existsSync(baseIndexHtmlPath)) {
    let baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');

    // Inline the primary blocking CSS file (<link rel="stylesheet" crossorigin href="/assets/index-*.css">)
    // directly into <head> to eliminate the 190ms render-blocking stylesheet request on mobile 4G.
    const cssLinkMatch = baseHtml.match(/<link\s+rel="stylesheet"[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/i);
    if (cssLinkMatch) {
      const cssHref = cssLinkMatch[1];
      const cssFilePath = path.join(rootDist, cssHref.replace(/^\/+/, ''));
      if (fs.existsSync(cssFilePath)) {
        const cssContent = fs.readFileSync(cssFilePath, 'utf8').trim();
        baseHtml = baseHtml.replace(
          cssLinkMatch[0],
          `<style id="zn-inlined-app-css">${cssContent}</style>`
        );
        console.log(`[postbuild] Inlined ${cssHref} (${(cssContent.length / 1024).toFixed(1)} KB) into <head> to eliminate render-blocking CSS.`);
      }
    }

    // Inject <link rel="modulepreload"> for the main entry script right before </head> to flatten critical request chain
    const entryScriptMatch = baseHtml.match(/<script\s+type="module"[^>]*src="(\/assets\/index-[^"]+\.js)"[^>]*>/i);
    if (entryScriptMatch) {
      const entryJsHref = entryScriptMatch[1];
      if (!baseHtml.includes(`href="${entryJsHref}" rel="modulepreload"`) && !baseHtml.includes(`rel="modulepreload" crossorigin href="${entryJsHref}"`)) {
        baseHtml = baseHtml.replace(
          '</head>',
          `    <link rel="modulepreload" crossorigin href="${entryJsHref}" />\n  </head>`
        );
      }
    }

    for (const entry of allEntries) {
      const routeHtml = renderCustomHtml(baseHtml, entry);
      if (entry.path === '/') {
        fs.writeFileSync(baseIndexHtmlPath, routeHtml, 'utf8');
        continue;
      }
      const relativeDir = entry.path.replace(/^\/+/, '');
      const routeDir = path.join(rootDist, relativeDir);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');

      // Also write dist/${relativeDir}.html so Vercel cleanUrls: true serves the prerendered HTML directly
      const flatHtmlPath = path.join(rootDist, `${relativeDir}.html`);
      fs.mkdirSync(path.dirname(flatHtmlPath), { recursive: true });
      fs.writeFileSync(flatHtmlPath, routeHtml, 'utf8');

      // Also pre-generate /makam/<id>/index.html and /makam/<id>.html for legacy links
      if (entry.legacyPath) {
        const legacyRel = entry.legacyPath.replace(/^\/+/, '');
        const legacyDir = path.join(rootDist, legacyRel);
        fs.mkdirSync(legacyDir, { recursive: true });
        fs.writeFileSync(path.join(legacyDir, 'index.html'), routeHtml, 'utf8');
        const legacyFlatHtml = path.join(rootDist, `${legacyRel}.html`);
        fs.mkdirSync(path.dirname(legacyFlatHtml), { recursive: true });
        fs.writeFileSync(legacyFlatHtml, routeHtml, 'utf8');
      }

      // Also pre-generate legacy apostrophe-truncated slug path (.html and /index.html)
      if (entry.legacyApostrophePath) {
        const legacyApostropheRel = entry.legacyApostrophePath.replace(/^\/+/, '');
        const legacyApostropheDir = path.join(rootDist, legacyApostropheRel);
        fs.mkdirSync(legacyApostropheDir, { recursive: true });
        fs.writeFileSync(path.join(legacyApostropheDir, 'index.html'), routeHtml, 'utf8');
        const legacyApostropheFlatHtml = path.join(rootDist, `${legacyApostropheRel}.html`);
        fs.mkdirSync(path.dirname(legacyApostropheFlatHtml), { recursive: true });
        fs.writeFileSync(legacyApostropheFlatHtml, routeHtml, 'utf8');
      }
    }

    // Sync the updated dist/index.html MD5 revision hash inside dist/sw.js so Workbox precache stays 100% valid
    const swPath = path.join(rootDist, 'sw.js');
    if (fs.existsSync(swPath)) {
      const updatedIndexHtml = fs.readFileSync(baseIndexHtmlPath);
      const newRevision = crypto.createHash('md5').update(updatedIndexHtml).digest('hex');
      const swContent = fs.readFileSync(swPath, 'utf8');
      const updatedSw = swContent.replace(
        /(\{url:"index\.html",revision:")([a-f0-9]+)("\})/i,
        `$1${newRevision}$3`
      );
      if (updatedSw !== swContent) {
        fs.writeFileSync(swPath, updatedSw, 'utf8');
        console.log('[postbuild] Synced dist/sw.js precache revision for index.html:', newRevision);
      }
    }
  }

  console.log(
    `[postbuild] Generated sitemap.xml, sitemap.txt, rss.xml, and pre-rendered HTML for ${allEntries.length} canonical URLs at:`,
    rootDist
  );

  // Mirror dist if Vercel invoked the build from a subdirectory
  if (process.env.VERCEL || initCwd !== cwd) {
    const candidateDirs = new Set([
      path.join(initCwd, 'dist'),
      path.join(cwd, 'src', 'dist'),
      path.join(cwd, 'public', 'dist'),
    ]);

    for (const targetDist of candidateDirs) {
      if (path.resolve(targetDist) !== rootDist) {
        try {
          fs.mkdirSync(path.dirname(targetDist), { recursive: true });
          fs.cpSync(rootDist, targetDist, { recursive: true, force: true });
          console.log('[postbuild] Mirrored dist to:', targetDist);
        } catch (err) {
          console.warn('[postbuild] Skipped mirroring to', targetDist, err?.message);
        }
      }
    }
  }
}
