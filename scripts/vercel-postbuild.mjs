import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SITE_ORIGIN = 'https://ziarahnusantara.my.id';
const cwd = process.cwd();
const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : cwd;
const rootDist = path.resolve(cwd, 'dist');
const rootPublic = path.resolve(cwd, 'public');

if (!fs.existsSync(rootDist)) {
  console.error('[postbuild] Error: dist directory was not generated at', rootDist);
  process.exit(1);
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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

function extractSitesFromSource() {
  const sitesFile = path.resolve(cwd, 'src', 'data', 'sites.ts');
  if (!fs.existsSync(sitesFile)) return [];
  const raw = fs.readFileSync(sitesFile, 'utf8');
  const idRegex = /\bid:\s*["']([^"']+)["']/g;
  const positions = [];
  let match;
  while ((match = idRegex.exec(raw)) !== null) {
    positions.push({ id: match[1].trim(), index: match.index });
  }
  const seen = new Set();
  const result = [];
  for (let i = 0; i < positions.length; i++) {
    const { id, index } = positions[i];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const nextIndex = i + 1 < positions.length ? positions[i + 1].index : raw.length;
    const block = raw.slice(index, nextIndex);
    const name = block.match(/\bname:\s*["']([^"']+)["']/)?.[1]?.trim() || id;
    const title = block.match(/\btitle:\s*["']([^"']+)["']/)?.[1]?.trim() || id;
    const category = block.match(/\bcategory:\s*["']([^"']+)["']/)?.[1]?.trim() || 'Waliyullah Nusantara';
    const description = block.match(/\bdescription:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const history = block.match(/\bhistory:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const address = block.match(/\baddress:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const city = block.match(/\bcity:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const province = block.match(/\bprovince:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const era = block.match(/\bera:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const sanad = block.match(/\bsanad:\s*["']([^"']+)["']/)?.[1]?.trim() || '';
    const slug = getSiteSlug(title, city, id);
    result.push({
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
  return result;
}

const staticRoutes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    title: 'Ziarah Nusantara: Panduan Ziarah Kubur, Doa Tahlil & Jejak Batin 96 Makam Wali',
    description:
      'Hati sedang rindu keteduhan atau hendak berziarah? Temukan urutan doa ziarah kubur lengkap (Arab, Latin, Artinya), Tahlil & Tawassul, serta peta rute & kisah karomah 96 makam Walisongo, Ulama & Habaib di 18 provinsi Indonesia.',
  },
  {
    path: '/direktori',
    priority: '0.9',
    changefreq: 'daily',
    title: 'Direktori 96 Makam Walisongo, Ulama & Habaib di 18 Provinsi — Ziarah Nusantara',
    description:
      'Jejak spiritual 96 lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di 18 provinsi Indonesia lengkap dengan alamat, peta rute GPS, kisah karomah, dan bacaan doa tawassul.',
  },
  {
    path: '/peta',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Peta Rute Ziarah Makam Wali Songo & Ulama Nusantara — Ziarah Nusantara',
    description:
      'Peta interaktif titik lokasi GPS dan navigasi rute perjalanan ziarah ke 96 makam Waliyullah serta ulama besar di seluruh kepulauan Indonesia.',
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
    title: 'Infaq & Amal Jariyah Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
    description:
      'Layanan infaq dan wakaf literasi digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori 96 makam Waliyullah tetap bebas akses.',
  },
  {
    path: '/infaq',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Infaq & Amal Jariyah Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
    description:
      'Layanan infaq dan wakaf literasi digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori 96 makam Waliyullah tetap bebas akses.',
  },
  {
    path: '/kurasi',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Standar Kurasi & Metodologi Referensi Sejarah — Ziarah Nusantara',
    description:
      'Pedoman metodologi verifikasi sumber sejarah, jurnal akademik, naskah babad, dan kurasi 96 situs makam oleh Tim Kurator Arsip Ziarah Nusantara.',
  },
];

function parseFirestoreStringField(fields, key, fallback = '') {
  const val = fields?.[key]?.stringValue;
  return typeof val === 'string' && val.trim() ? val.trim() : fallback;
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
const sites = await fetchCloudSitesForSeo(localExtractedSites);

function buildDirectoryLinksHtml() {
  const provinces = Array.from(new Set(sites.map((s) => s.province))).sort();
  return `
    <section aria-label="Indeks Direktori Lengkap 96 Makam Waliyullah di 18 Provinsi">
      <h2>Daftar Lengkap ${sites.length} Lokasi Ziarah Makam Waliyullah, Walisongo, Ulama, dan Habaib di ${provinces.length} Provinsi Indonesia</h2>
      <p>Berikut adalah indeks direktori situs pemakaman para Waliyullah, ulama pesantren, dan habaib yang tersebar di berbagai wilayah kepulauan Nusantara beserta tautan menuju halaman peta rute dan riwayat sejarah masing-masing tokoh:</p>
      ${provinces
        .map((prov) => {
          const provSites = sites.filter((s) => s.province === prov);
          return `
            <div>
              <h3>Daftar Lokasi Ziarah Makam Wali di Provinsi ${escapeXml(prov)} (${provSites.length} Situs)</h3>
              <ul>
                ${provSites
                  .map(
                    (s) =>
                      `<li><a href="${SITE_ORIGIN}/situs/${escapeXml(s.slug)}">Panduan Rute dan Sejarah Makam ${escapeXml(s.title)} di Kota ${escapeXml(s.city)}, Provinsi ${escapeXml(s.province)}</a></li>`
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
          <img
            src="${SITE_ORIGIN}/pwa-512x512.png"
            alt="Logo Resmi Ziarah Nusantara — Panduan Ziarah Kubur, Doa Tahlil &amp; Direktori 96 Makam Wali"
            width="512"
            height="512"
          />
          <h1>Ziarah Nusantara: Panduan Ziarah Kubur, Doa Tahlil &amp; Jejak Batin 96 Makam Wali</h1>
          <p><strong>Hati sedang rindu keteduhan atau hendak berziarah?</strong> Temukan urutan doa ziarah kubur lengkap (teks Arab, Latin, dan artinya), bacaan Yasin, Tahlil, dan Tawassul, serta peta rute perjalanan dan kisah karomah 96 makam Walisongo, Ulama Nusantara, dan Habaib di 18 provinsi Indonesia.</p>
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
            <li><a href="${SITE_ORIGIN}/direktori">Direktori 96 Makam Walisongo, Ulama, dan Habaib di 18 Provinsi Indonesia</a></li>
            <li><a href="${SITE_ORIGIN}/panduan">Panduan Doa Ziarah Kubur Lengkap (Arab, Latin, dan Artinya) beserta Tahlil dan Adab Ziarah</a></li>
            <li><a href="${SITE_ORIGIN}/peta">Peta Rute Perjalanan Ziarah Wali Songo dan Ulama Nusantara</a></li>
            <li><a href="${SITE_ORIGIN}/doa">Kumpulan Doa Khusus Ziarah Kubur, Tahlil, dan Tawassul</a></li>
            <li><a href="${SITE_ORIGIN}/rubrik">Rubrik Sejarah, Kisah Karomah, dan Wasiat Batin Para Wali</a></li>
            <li><a href="${SITE_ORIGIN}/kurasi">Standar Kurasi dan Metodologi Referensi Sejarah</a></li>
            <li><a href="${SITE_ORIGIN}/infaq">Infaq Digital dan Ruang Munajat Doa Peziarah</a></li>
          </ul>
        </section>
      </main>`;
}

function buildDirektoriRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <img
            src="${SITE_ORIGIN}/pwa-512x512.png"
            alt="Logo Resmi Ziarah Nusantara — Direktori 96 Makam Walisongo, Ulama &amp; Habaib di 18 Provinsi"
            width="512"
            height="512"
          />
          <h1>Direktori 96 Makam Walisongo, Ulama &amp; Habaib di 18 Provinsi — Ziarah Nusantara</h1>
          <p>Jejak spiritual 96 lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di 18 provinsi Indonesia lengkap dengan alamat, peta rute perjalanan, kisah karomah, dan bacaan doa tawassul.</p>
        </header>
        ${buildDirectoryLinksHtml()}
      </main>`;
}

function buildPanduanRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <img
            src="${SITE_ORIGIN}/pwa-512x512.png"
            alt="Logo Resmi Ziarah Nusantara — Panduan Bacaan Doa Ziarah Kubur Lengkap"
            width="512"
            height="512"
          />
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
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <article>
          <img
            src="${SITE_ORIGIN}/pwa-512x512.png"
            alt="Logo Resmi Ziarah Nusantara — Makam ${escapeXml(site.title)} (${escapeXml(site.city)}, ${escapeXml(site.province)})"
            width="512"
            height="512"
          />
          <p><a href="${SITE_ORIGIN}/">Beranda Ziarah Nusantara</a> &rsaquo; <a href="${SITE_ORIGIN}/direktori">Direktori Provinsi ${escapeXml(site.province)}</a> &rsaquo; Makam ${escapeXml(site.title)}</p>
          <h1>Makam ${escapeXml(site.title)} (${escapeXml(site.name)}) — ${escapeXml(site.city)}, ${escapeXml(site.province)}</h1>
          <p><strong>Kategori Tokoh:</strong> ${escapeXml(site.category)} ${site.era ? `| <strong>Periode Sejarah:</strong> ${escapeXml(site.era)}` : ''}</p>
          <p><strong>Alamat Lokasi Pemakaman:</strong> ${escapeXml(site.address)}, Kota/Kabupaten ${escapeXml(site.city)}, Provinsi ${escapeXml(site.province)}, Indonesia.</p>
          <h2>Profil, Riwayat Dakwah, dan Sejarah ${escapeXml(site.title)}</h2>
          <p>${escapeXml(site.description)}</p>
          <p>${escapeXml(site.history)}</p>
          ${site.sanad ? `<h2>Sanad Keilmuan dan Jaringan Dakwah</h2><p>${escapeXml(site.sanad)}</p>` : ''}
          <p><a href="${SITE_ORIGIN}/panduan">Baca Panduan Doa Ziarah Kubur Lengkap (Arab, Latin, dan Artinya)</a> | <a href="${SITE_ORIGIN}/peta">Buka Peta Rute Perjalanan Ziarah</a></p>
        </article>
      </main>`;
}

// Build canonical URL list for XML, TXT, and RSS sitemaps
const allEntries = [
  ...staticRoutes.map((r) => ({
    loc: `${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`,
    changefreq: r.changefreq,
    priority: r.priority,
    title: r.title,
    description: r.description,
    path: r.path,
    bodyHtml:
      r.path === '/panduan'
        ? buildPanduanRootHtml()
        : r.path === '/direktori'
          ? buildDirektoriRootHtml()
          : buildHomepageRootHtml(),
  })),
  ...sites.map((s) => ({
    loc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
    changefreq: 'weekly',
    priority: '0.8',
    title: `Makam ${s.title} (${s.city}, ${s.province}) — Rute, Kisah Karomah & Doa Ziarah | Ziarah Nusantara`,
    description: `${s.description} Lokasi: ${s.address}, ${s.city}, ${s.province}. Lengkap dengan peta rute, riwayat karomah, dan doa tawassul.`,
    path: `/situs/${s.slug}`,
    legacyPath: `/makam/${s.id}`,
    bodyHtml: buildSiteRootHtml(s),
  })),
];

// 1. Generate standards-compliant sitemap XML
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allEntries.map((entry) => `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n  </url>`),
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
  '  </sitemap>',
  '</sitemapindex>',
  '',
];
const sitemapIndexContent = sitemapIndexLines.join('\n');

// 2. Generate plain-text sitemap.txt
const sitemapTxtContent = allEntries.map((entry) => entry.loc).join('\n') + '\n';

// 3. Generate RSS 2.0 feed (rss.xml) — also supported by Google Search Console as a Sitemap
const rssLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>Ziarah Nusantara: Panduan Ziarah Kubur, Doa Tahlil &amp; Jejak Batin 96 Makam Wali</title>',
  `    <link>${SITE_ORIGIN}/</link>`,
  '    <description>Hati sedang rindu keteduhan atau hendak berziarah? Temukan urutan doa ziarah kubur lengkap (Arab, Latin, Artinya), Tahlil &amp; Tawassul, serta peta rute &amp; kisah karomah 96 makam Walisongo, Ulama &amp; Habaib di 18 provinsi Indonesia.</description>',
  '    <language>id-ID</language>',
  `    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />`,
  ...allEntries.map(
    (entry) =>
      `    <item>\n      <title>${escapeXml(entry.title)}</title>\n      <link>${escapeXml(entry.loc)}</link>\n      <guid isPermaLink="true">${escapeXml(entry.loc)}</guid>\n      <description>${escapeXml(entry.description)}</description>\n    </item>`
  ),
  '  </channel>',
  '</rss>',
  '',
];
const rssXmlContent = rssLines.join('\n');

// Write generated sitemaps to both public/ and dist/
for (const targetFolder of [rootPublic, rootDist]) {
  if (fs.existsSync(targetFolder)) {
    fs.writeFileSync(path.join(targetFolder, 'sitemap.xml'), sitemapXmlContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'peta-situs.xml'), sitemapXmlContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'sitemap-utama.xml'), sitemapXmlContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'sitemap_index.xml'), sitemapIndexContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'sitemap.txt'), sitemapTxtContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'rss.xml'), rssXmlContent, 'utf8');
  }
}

function renderCustomHtml(baseHtml, entry) {
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(entry.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeXml(entry.description)}" />`
    )
    .replace(
      /<link rel="canonical" id="canonical-link" href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" id="canonical-link" href="${escapeXml(entry.loc)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="id-ID" id="hreflang-id" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="id-ID" id="hreflang-id" href="${escapeXml(entry.loc)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="id" id="hreflang-id-short" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="id" id="hreflang-id-short" href="${escapeXml(entry.loc)}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" id="hreflang-default" href="[^"]*"\s*\/?>/i,
      `<link rel="alternate" hreflang="x-default" id="hreflang-default" href="${escapeXml(entry.loc)}" />`
    )
    .replace(
      /<meta property="og:title" id="og-title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" id="og-title" content="${escapeXml(entry.title)}" />`
    )
    .replace(
      /<meta property="og:description" id="og-description" content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" id="og-description" content="${escapeXml(entry.description)}" />`
    )
    .replace(
      /<meta property="og:url" id="og-url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" id="og-url" content="${escapeXml(entry.loc)}" />`
    )
    .replace(
      /<meta name="twitter:title" id="twitter-title" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" id="twitter-title" content="${escapeXml(entry.title)}" />`
    )
    .replace(
      /<meta name="twitter:description" id="twitter-description" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" id="twitter-description" content="${escapeXml(entry.description)}" />`
    );

  if (entry.bodyHtml) {
    html = html.replace(
      /<!--SEO_ROOT_START-->[\s\S]*?<!--SEO_ROOT_END-->/i,
      `<!--SEO_ROOT_START-->\n      ${entry.bodyHtml}\n      <!--SEO_ROOT_END-->`
    );
  }
  return html;
}

// 4. Pre-generate route-specific index.html files in dist/ with unique semantic body & metadata
const baseIndexHtmlPath = path.join(rootDist, 'index.html');
if (fs.existsSync(baseIndexHtmlPath)) {
  let baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');

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

    // Also pre-generate /makam/<id>/index.html for legacy links
    if (entry.legacyPath) {
      const legacyDir = path.join(rootDist, entry.legacyPath.replace(/^\/+/, ''));
      fs.mkdirSync(legacyDir, { recursive: true });
      fs.writeFileSync(path.join(legacyDir, 'index.html'), routeHtml, 'utf8');
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
