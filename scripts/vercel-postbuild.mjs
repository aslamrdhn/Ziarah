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
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
    const titleMatch = block.match(/\btitle:\s*["']([^"']+)["']/);
    const categoryMatch = block.match(/\bcategory:\s*["']([^"']+)["']/);
    const descMatch = block.match(/\bdescription:\s*["']([^"']+)["']/);
    result.push({
      id,
      title: titleMatch?.[1]?.trim() || id,
      category: categoryMatch?.[1]?.trim() || 'Waliyullah Nusantara',
      description: descMatch?.[1]?.trim() || '',
    });
  }
  return result;
}

const staticRoutes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    title: 'Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara',
    description:
      'Situs resmi Ziarah Nusantara (ziarahnusantara.my.id) dikelola oleh Tim Kurator Arsip Ziarah Nusantara. Direktori makam Wali Songo, ulama Nusantara, peta interaktif, adab ziarah, kumpulan doa tahlil & tawassul, serta literasi sejarah Islam Nusantara.',
  },
  {
    path: '/direktori',
    priority: '0.9',
    changefreq: 'daily',
    title: 'Direktori Makam Waliyullah & Ulama Nusantara | Ziarah Nusantara',
    description:
      'Katalog lengkap lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Kesultanan Islam beserta koordinat dan referensi sejarah terkurasi.',
  },
  {
    path: '/peta',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Peta Interaktif & Rute Ziarah Wali Nusantara | Ziarah Nusantara',
    description:
      'Eksplorasi peta geospasial titik koordinat makam para Waliyullah dan ulama besar di seluruh kepulauan Indonesia.',
  },
  {
    path: '/panduan',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Panduan Adab & Tata Cara Ziarah Kubur | Ziarah Nusantara',
    description:
      'Tuntunan adab berziarah kubur sesuai sunnah dan tradisi ulama Ahlussunnah wal Jamaah beserta bacaan salam dan tawassul.',
  },
  {
    path: '/rubrik',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Rubrik Sejarah, Kisah Karomah & Sanad Keilmuan | Ziarah Nusantara',
    description:
      'Kajian sejarah peradaban Islam Nusantara, biografi, sanad keilmuan, dan keteladanan dakwah para Waliyullah.',
  },
  {
    path: '/doa',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Kumpulan Doa Khusus, Tahlil & Tawassul Ziarah | Ziarah Nusantara',
    description:
      'Bacaan doa ziarah kubur, rangkaian tawassul, dan tahlil lengkap teks Arab, transliterasi Latin, serta terjemahan Bahasa Indonesia.',
  },
  {
    path: '/infaq',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Infaq Digital & Pelestarian Arsip Sejarah | Ziarah Nusantara',
    description:
      'Layanan infaq digital QRIS resmi Ziarah Nusantara untuk riset literasi sejarah dan pengembangan database makam Waliyullah.',
  },
  {
    path: '/kurasi',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Standar Metodologi & Dewan Kurasi Arsip | Ziarah Nusantara',
    description:
      'Pedoman verifikasi historis, rujukan akademik, dan metodologi pengarsipan situs makam Waliyullah oleh Tim Kurator Arsip Ziarah Nusantara.',
  },
];

const sites = extractSitesFromSource();

// Build URL list for XML, TXT, and RSS sitemaps
const allEntries = [
  ...staticRoutes.map((r) => ({
    loc: `${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`,
    changefreq: r.changefreq,
    priority: r.priority,
    title: r.title,
    description: r.description,
    path: r.path,
  })),
  ...sites.map((s) => ({
    loc: `${SITE_ORIGIN}/makam/${encodeURIComponent(s.id)}`,
    changefreq: 'weekly',
    priority: '0.8',
    title: `${s.title} (${s.category}) — Lokasi, Sejarah & Doa Ziarah | Ziarah Nusantara`,
    description: s.description || `Profil sejarah, lokasi koordinat peta, karomah, dan panduan ziarah ${s.title} di Ziarah Nusantara.`,
    path: `/makam/${s.id}`,
  })),
];

// 1. Generate clean standards-compliant sitemap.xml (no future lastmod dates)
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allEntries.map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
  ),
  '</urlset>',
  '',
];
const sitemapXmlContent = xmlLines.join('\n');

// 2. Generate plain-text sitemap.txt (100% immune to XML parser issues in Google Search Console)
const sitemapTxtContent = allEntries.map((entry) => entry.loc).join('\n') + '\n';

// 3. Generate RSS 2.0 feed (rss.xml) as an additional sitemap format supported by Google Search Console
const rssLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara</title>',
  `    <link>${SITE_ORIGIN}/</link>`,
  '    <description>Direktori makam Wali Songo, ulama Nusantara, peta interaktif, adab ziarah, kumpulan doa tahlil &amp; tawassul oleh Tim Kurator Arsip Ziarah Nusantara.</description>',
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
    fs.writeFileSync(path.join(targetFolder, 'sitemap.txt'), sitemapTxtContent, 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'rss.xml'), rssXmlContent, 'utf8');
  }
}

// 4. Pre-generate route-specific index.html files in dist/ so Googlebot gets HTTP 200 and accurate metadata on every route
const baseIndexHtmlPath = path.join(rootDist, 'index.html');
if (fs.existsSync(baseIndexHtmlPath)) {
  const baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');
  for (const entry of allEntries) {
    if (entry.path === '/') continue;
    const relativeDir = entry.path.replace(/^\/+/, '');
    const routeDir = path.join(rootDist, relativeDir);
    fs.mkdirSync(routeDir, { recursive: true });
    let routeHtml = baseHtml
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
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
  }
}

console.log(
  `[postbuild] Generated sitemap.xml, sitemap.txt, rss.xml, and pre-rendered HTML for ${allEntries.length} URLs at:`,
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
