import fs from 'fs';
import path from 'path';

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
    title: 'Ziarah Kubur & Makam Wali Nusantara — Doa Ziarah, Tahlil, Adab & 96 Lokasi Makam | Ziarah Nusantara',
    description:
      'Panduan lengkap pengertian, hukum, tujuan, adab, dan bacaan doa ziarah kubur (Arab, Latin, Artinya), susunan Yasin, Tahlil & Tawassul, serta direktori 96 lokasi makam Walisongo, Ulama & Habaib di 18 provinsi Indonesia.',
  },
  {
    path: '/direktori',
    priority: '0.9',
    changefreq: 'daily',
    title: 'Direktori 96 Makam Walisongo, Ulama & Habaib di 18 Provinsi — Ziarah Nusantara',
    description:
      'Indeks lengkap 96 lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di 18 provinsi Indonesia beserta alamat, koordinat peta rute, sejarah, dan bacaan doa tawassul.',
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
    title: 'Bacaan Doa Ziarah Kubur Lengkap (Arab, Latin, Artinya) — Tahlil, Yasin & Adab Ziarah Wali',
    description:
      'Urutan bacaan doa ziarah kubur singkat dan lengkap (Arab, Latin, Artinya), salam ahli kubur, Qasidah Salamullah Ya Sadah, Tawassul, Yasin, Tahlil, serta tujuan & hukum ziarah kubur dalam Islam.',
  },
  {
    path: '/rubrik',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Rubrik Sejarah, Kisah Karomah & Sanad Keilmuan Wali — Ziarah Nusantara',
    description:
      'Kajian mendalam biografi, sanad keilmuan, sejarah dakwah, dan keteladanan para Waliyullah Nusantara berbasis naskah babad dan jurnal akademik.',
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
    title: 'Donasi Digital & Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
    description:
      'Layanan donasi dan wakaf digital QRIS resmi Ziarah Nusantara untuk mendukung riset literasi sejarah dan pelestarian situs makam Waliyullah.',
  },
  {
    path: '/infaq',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Donasi Digital & Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
    description:
      'Layanan donasi dan wakaf digital QRIS resmi Ziarah Nusantara untuk mendukung riset literasi sejarah dan pelestarian situs makam Waliyullah.',
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

const sites = extractSitesFromSource();

function buildDirectoryLinksHtml() {
  const provinces = Array.from(new Set(sites.map((s) => s.province))).sort();
  return `
    <section aria-label="Indeks Direktori Lengkap 96 Makam Waliyullah di 18 Provinsi">
      <h2>Daftar Lengkap ${sites.length} Makam Waliyullah, Walisongo, Ulama &amp; Habaib di ${provinces.length} Provinsi</h2>
      ${provinces
        .map((prov) => {
          const provSites = sites.filter((s) => s.province === prov);
          return `
            <div>
              <h3>${escapeXml(prov)} (${provSites.length} Makam)</h3>
              <ul>
                ${provSites
                  .map(
                    (s) =>
                      `<li><a href="${SITE_ORIGIN}/situs/${escapeXml(s.slug)}">Makam ${escapeXml(s.title)} (${escapeXml(s.name)}) — ${escapeXml(s.city)}, ${escapeXml(s.province)}</a></li>`
                  )
                  .join('\n                ')}
              </ul>
            </div>`;
        })
        .join('\n      ')}
    </section>`;
}

function buildHomepageRootHtml() {
  return `<main class="sr-only">
        <header>
          <h1>Ziarah Kubur &amp; Makam Wali Nusantara — Doa Ziarah, Tahlil, Adab &amp; 96 Lokasi Makam</h1>
          <p><strong>Ziarah Nusantara (${SITE_ORIGIN})</strong> menyajikan panduan lengkap pengertian, hukum, tujuan, dan urutan bacaan doa ziarah kubur (Arab, Latin, Artinya) beserta direktori 96 situs makam Walisongo, Ulama Nusantara, Habaib, dan Auliya di 18 provinsi Indonesia.</p>
        </header>
        <section>
          <h2>Apa Tujuan &amp; Hukum Ziarah Kubur dalam Islam?</h2>
          <p>Secara bahasa, ziarah berarti berkunjung. Dalam Islam, hukum ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW: <em>&ldquo;Dahulu aku melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu mengingatkan kalian kepada akhirat.&rdquo;</em> (HR. Muslim). Tujuan ziarah kubur meliputi mengingat kematian dan akhirat, mendoakan ampunan bagi ahli kubur, serta meneladani kesalehan dan perjuangan dakwah para Waliyullah.</p>
          <h2>Menu Utama Ziarah Nusantara</h2>
          <ul>
            <li><a href="${SITE_ORIGIN}/panduan">Bacaan Doa Ziarah Kubur Lengkap (Arab, Latin, Artinya) — Tahlil, Yasin &amp; Adab Ziarah Wali</a></li>
            <li><a href="${SITE_ORIGIN}/direktori">Direktori 96 Makam Walisongo, Ulama &amp; Habaib di 18 Provinsi</a></li>
            <li><a href="${SITE_ORIGIN}/peta">Peta Rute Interaktif Makam Waliyullah Nusantara</a></li>
            <li><a href="${SITE_ORIGIN}/doa">Kumpulan Doa Khusus, Tawassul &amp; Tahlil Ziarah</a></li>
            <li><a href="${SITE_ORIGIN}/rubrik">Rubrik Sejarah, Kisah Karomah &amp; Sanad Keilmuan</a></li>
            <li><a href="${SITE_ORIGIN}/kurasi">Standar Kurasi &amp; Referensi Ilmiah</a></li>
            <li><a href="${SITE_ORIGIN}/infaq">Donasi Digital Pelestarian Arsip Sejarah</a></li>
          </ul>
        </section>
        ${buildDirectoryLinksHtml()}
      </main>`;
}

function buildPanduanRootHtml() {
  return `<main class="sr-only">
        <h1>Bacaan Doa Ziarah Kubur Lengkap (Arab, Latin, Artinya) — Tahlil, Yasin &amp; Adab Ziarah Wali</h1>
        <p>Panduan lengkap tata cara dan urutan bacaan doa ziarah kubur singkat maupun lengkap untuk ziarah makam orang tua, kerabat, dan makam para Waliyullah (Walisongo &amp; Ulama Nusantara).</p>
        <h2>Apa Tujuan &amp; Hukum Ziarah Kubur dalam Islam?</h2>
        <p>Dalam syariat Islam, hukum ziarah kubur adalah sunnah (dianjurkan) berdasarkan hadits shahih riwayat Imam Muslim (no. 977): <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah kalian ke kubur, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em> Tujuan utamanya adalah: (1) Mengingat akhirat (tadzkiratul akhirah), (2) Mendoakan ampunan dan rahmat bagi ahli kubur, serta (3) Meneladani perjuangan dakwah dan kesalehan para Waliyullah.</p>
        <h2>Urutan Bacaan Doa Ziarah Kubur Singkat</h2>
        <ol>
          <li><strong>Berwudhu &amp; Meluruskan Niat:</strong> Memasuki area makam dengan sopan dan berniat ziarah karena Allah SWT.</li>
          <li><strong>Mengucapkan Salam Ahli Kubur:</strong> <em>Assalaamu'alaikum ahlad-diyaari minal mu'miniina wal muslimiin, wa innaa insyaa Allaahu bikum laahiquun, nas'alullaaha lanaa wa lakumul 'aafiyah.</em></li>
          <li><strong>Salam Masuk Makam Waliyullah:</strong> <em>Salaamullaahi yaa saadah, minar-Rahmaani yaghshaakum, 'ibaadallaahi ji'naakum, qashadnaakum thalabnaakum...</em></li>
          <li><strong>Membaca Istighfar (3x) &amp; Tawassul Al-Fatihah:</strong> <em>Ilaa hadhratin nabiyyil musthafaa Muhammadin SAW... al-faatihah. Tsumma ilaa ruuhi al-waliyyi / ahlil qubuur... al-faatihah.</em></li>
          <li><strong>Membaca Surah Yasin &amp; Surat Pendek:</strong> Membaca Surah Yasin, Surah Al-Ikhlas (3x), Al-Falaq (1x), An-Nas (1x), Al-Fatihah, dan Ayat Kursi.</li>
          <li><strong>Membaca Dzikir Tahlil &amp; Tasbih:</strong> <em>Laa ilaaha illallaah</em> (33x/100x), shalawat Nabi, dan <em>Subhaanallaahi wa bihamdihi subhaanallaahil 'azhiim</em> (33x).</li>
          <li><strong>Membaca Doa Ziarah Kubur (Doa Arwah):</strong> <em>Allaahummaghfir lahum warhamhum wa 'aafihim wa'fu 'anhum... Rabbanaa aatinaa fid-dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban naar.</em></li>
        </ol>
        ${buildDirectoryLinksHtml()}
      </main>`;
}

function buildSiteRootHtml(site) {
  return `<main class="sr-only">
        <article>
          <p><a href="${SITE_ORIGIN}/">Beranda Ziarah Nusantara</a> &rsaquo; <a href="${SITE_ORIGIN}/direktori">Direktori ${escapeXml(site.province)}</a> &rsaquo; ${escapeXml(site.title)}</p>
          <h1>Makam ${escapeXml(site.title)} (${escapeXml(site.name)}) — ${escapeXml(site.city)}, ${escapeXml(site.province)}</h1>
          <p><strong>Kategori:</strong> ${escapeXml(site.category)} ${site.era ? `| <strong>Era:</strong> ${escapeXml(site.era)}` : ''}</p>
          <p><strong>Alamat Lokasi:</strong> ${escapeXml(site.address)}, ${escapeXml(site.city)}, Provinsi ${escapeXml(site.province)}</p>
          <h2>Profil &amp; Sejarah ${escapeXml(site.title)}</h2>
          <p>${escapeXml(site.description)}</p>
          <p>${escapeXml(site.history)}</p>
          ${site.sanad ? `<h2>Sanad Keilmuan &amp; Jaringan Dakwah</h2><p>${escapeXml(site.sanad)}</p>` : ''}
          <p><a href="${SITE_ORIGIN}/panduan">Baca Panduan Doa Ziarah Kubur Lengkap (Arab, Latin &amp; Artinya)</a> | <a href="${SITE_ORIGIN}/peta">Buka Peta Rute Interaktif</a></p>
        </article>
        ${buildDirectoryLinksHtml()}
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
    bodyHtml: r.path === '/panduan' ? buildPanduanRootHtml() : buildHomepageRootHtml(),
  })),
  ...sites.map((s) => ({
    loc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
    changefreq: 'weekly',
    priority: '0.8',
    title: `Makam ${s.title} (${s.city}, ${s.province}) — Rute, Sejarah & Doa Ziarah | Ziarah Nusantara`,
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
  `    <loc>${SITE_ORIGIN}/sitemap-utama.xml</loc>`,
  '  </sitemap>',
  '</sitemapindex>',
  '',
];
const sitemapIndexContent = sitemapIndexLines.join('\n');

// 2. Generate plain-text sitemap.txt
const sitemapTxtContent = allEntries.map((entry) => entry.loc).join('\n') + '\n';

// 3. Generate RSS 2.0 feed (rss.xml)
const rssLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>Ziarah Kubur &amp; Makam Wali Nusantara — Ziarah Nusantara</title>',
  `    <link>${SITE_ORIGIN}/</link>`,
  '    <description>Panduan lengkap doa ziarah kubur (Arab, Latin, Artinya), tahlil, tawassul, serta direktori 96 lokasi makam Walisongo, Ulama &amp; Habaib di 18 provinsi Indonesia.</description>',
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
  const baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');
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
