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

function isRoleDescriptionTitle(rawTitle) {
  const cleaned = String(rawTitle || '').trim();
  return /^(pendiri|sesepuh|mursyid|ulama|waliyullah|wali\s+songo|waliyyul|mahaguru|maha\s+guru|pelopor|presiden|pahlawan|pengarang|penyusun|mufti|imam\s+besar|qadhi|tokoh|putra|putri|cucu|panglima|pejuang|penjaga|pencipta|arsitek|perintis|guru\s+besar|raja\s+pertama|raja\s+ke-|sultan\s+pertama|penyebar\s+islam|adipati\s+semarang|pecinta\s+agung|utusan\s+kesultanan|leluhur\s+raja|khodimul\s+maulid|pangeran\s+majapahit\s+murid|poros\s+sanad)\b/i.test(
    cleaned
  );
}

function getSiteSlug(title, city, id, name = '') {
  const rawName = String(name || '').trim();
  const rawTitle = String(title || '').trim();
  const baseSource =
    rawName && isRoleDescriptionTitle(rawTitle)
      ? formatMakamHeading(rawName.split(/\s+serta\s+|\s+[—–]\s+/i)[0])
      : rawTitle || rawName;
  const titleSlug = slugifySiteText(baseSource);
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
    .replace(/\\n/g, ' ')
    .replace(/<!--more-->/g, ' ')
    .replace(/Raden Umar Said\s*\(\s*Raden Prawoto\s*\)/gi, 'Raden Umar Said (Sunan Muria)')
    .replace(/\bRaden Prawoto\b/gi, 'Raden Umar Said (Sunan Muria)')
    .replace(
      /dimudahkan bertemu jodoh pendamping hidup/gi,
      'memohon kepada Allah SWT kecintaan tulus kepada Nabi Muhammad SAW, keberkahan majelis ilmu dan dakwah, serta keteguhan iman keluarga'
    )
    .replace(/\s+/g, ' ')
    .trim();
}

export function getPublicTeaserOnly(val) {
  if (Array.isArray(val)) {
    const firstItem = val.find((item) => typeof item === 'string' && item.trim().length > 0) || '';
    return cleanSeoText(String(firstItem).split('<!--more-->')[0]);
  }
  return cleanSeoText(String(val || '').split('<!--more-->')[0]);
}

export function formatMakamHeading(rawTitle) {
  const cleaned = cleanSeoText(rawTitle).replace(/^(?:Makam\s+){2,}/i, 'Makam ');
  if (!cleaned) return 'Makam Waliyullah';
  if (
    /^(?:makam|kompleks\s+makam|astana|kubah|pasarean|masjid|pesantren|situs|petilasan)\b/i.test(
      cleaned
    ) ||
    /\b(?:makam|maqbarah|astana|pasarean)\b/i.test(cleaned)
  ) {
    return cleaned;
  }
  return `Makam ${cleaned}`;
}

export function extractRawQuotedField(block, fieldName, fallback = '') {
  const regex = new RegExp(`\\b${fieldName}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`);
  const m = block.match(regex);
  if (!m) return fallback;
  return m[2] || fallback;
}

export function extractQuotedField(block, fieldName, fallback = '') {
  const rawVal = extractRawQuotedField(block, fieldName, '');
  if (!rawVal) return fallback;
  return cleanSeoText(rawVal) || fallback;
}

export function extractNumericField(block, fieldName, fallback = 0) {
  const regex = new RegExp(`\\b${fieldName}:\\s*(-?\\d+(?:\\.\\d+)?)`);
  const m = block.match(regex);
  if (!m) return fallback;
  const num = Number(m[1]);
  return Number.isFinite(num) ? num : fallback;
}

export function extractPublicTeaserField(block, fieldName, fallback = '') {
  const directRaw = extractRawQuotedField(block, fieldName, '');
  if (directRaw) {
    return getPublicTeaserOnly(directRaw) || fallback;
  }
  const arrayRegex = new RegExp(`\\b${fieldName}:\\s*\\[\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`);
  const mArr = block.match(arrayRegex);
  if (mArr && mArr[2]) {
    return getPublicTeaserOnly(mArr[2]) || fallback;
  }
  return fallback;
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
    const lat = extractNumericField(block, 'lat', 0);
    const lng = extractNumericField(block, 'lng', 0);
    const era = extractQuotedField(block, 'era', '');
    const sanad = extractQuotedField(block, 'sanad', '');
    const karomah = extractPublicTeaserField(block, 'karomah', '');
    const untoldStory = extractPublicTeaserField(block, 'untoldStory', '');
    const slug = getSiteSlug(title, city, id, name);
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
      lat,
      lng,
      era,
      sanad,
      karomah,
      untoldStory,
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
  'syekh-kasyful-anwar-martapura': 'ulama-37',
  'datu-abulung-sungai-batang': 'ulama-38',
  'habib-husein-alkadrie-mempawah': 'habib-16',
  'syekh-yusuf-al-makassari': 'ulama-4',
  'datuk-ri-bandang': 'auliya-17',
  'datuk-patimang-luwu': 'auliya-27',
  'datuk-ri-tiro': 'auliya-28',
  'agh-muhammad-asad-sengkang': 'ulama-39',
  'habib-idrus-bin-salim-al-jufri-palu': 'habib-13',
  'kyai-mojo-tondano': 'ulama-29',
  // Bali, Nusa Tenggara, Maluku & Papua (Tahap 7)
  'habib-ali-bafaqih-negara': 'habib-11',
  'habib-ali-kusamba': 'habib-10',
  'karangrupit-buleleng': 'auliya-22',
  'pangeran-mas-sepuh-seseh': 'auliya-13',
  'siti-khotijah-denpasar': 'auliya-23',
  'habib-umar-bedugul-tabanan': 'auliya-14',
  'wali-kembar-karangasem': 'auliya-24',
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
          const mergedName = item.name || prev.name;
          const mergedObj = {
            id: item.id,
            slug: getSiteSlug(mergedTitle, mergedCity, item.id, mergedName),
            name: mergedName,
            title: mergedTitle,
            category: item.category || prev.category,
            description: item.description || prev.description,
            history: item.history || prev.history,
            address: item.address || prev.address,
            city: mergedCity,
            province: item.province || prev.province,
            lat: item.lat || prev.lat || 0,
            lng: item.lng || prev.lng || 0,
            era: item.era || prev.era,
            sanad: item.sanad || prev.sanad,
            karomah: item.karomah || prev.karomah || '',
            untoldStory: item.untoldStory || prev.untoldStory || '',
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
    {
      path: '/artikel',
      priority: '0.9',
      changefreq: 'weekly',
      title: 'Artikel Panduan, Fikih & Rute Ziarah Wali Nusantara — Ziarah Nusantara',
      description: `Kumpulan artikel panduan rute ziarah Wali Songo dan ulama Nusantara, urutan doa ziarah kubur orang tua, kaidah tawassul, dan kalender haul di ${provinceCount} provinsi.`,
    },
  ];
}

function extractStringArrayFromBlock(block, fieldName) {
  const regex = new RegExp(`\\b${fieldName}:\\s*\\[([\\s\\S]*?)\\]`);
  const m = block.match(regex);
  if (!m || !m[1]) return [];
  const items = [];
  const strRegex = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let sm;
  while ((sm = strRegex.exec(m[1])) !== null) {
    const cleaned = cleanSeoText(sm[2]);
    if (cleaned) items.push(cleaned);
  }
  return items;
}

function extractSectionsFromArticleBlock(block) {
  const secMatch = block.match(/\bsections:\s*\[([\s\S]*?)\],\s*relatedSiteSlugs:/);
  if (!secMatch || !secMatch[1]) return [];
  const secRaw = secMatch[1];
  const headingRegex = /\bheading:\s*(['"])((?:\\.|(?!\1).)*)\1/g;
  const hPos = [];
  let hm;
  while ((hm = headingRegex.exec(secRaw)) !== null) {
    hPos.push({ heading: cleanSeoText(hm[2]), index: hm.index });
  }
  const sections = [];
  for (let i = 0; i < hPos.length; i++) {
    const start = hPos[i].index;
    const end = i + 1 < hPos.length ? hPos[i + 1].index : secRaw.length;
    const sBlock = secRaw.slice(start, end);
    const paragraphs = extractStringArrayFromBlock(sBlock, 'paragraphs');
    const bulletPoints = extractStringArrayFromBlock(sBlock, 'bulletPoints');
    sections.push({
      heading: hPos[i].heading,
      paragraphs,
      ...(bulletPoints.length > 0 ? { bulletPoints } : {}),
    });
  }
  return sections;
}

export function extractArticlesFromSource(customTarget) {
  let articlesFile = path.resolve(cwd, 'src', 'data', 'articles.ts');
  if (customTarget && typeof customTarget === 'string') {
    const resolvedTarget = path.resolve(customTarget);
    if (fs.existsSync(resolvedTarget) && fs.statSync(resolvedTarget).isDirectory()) {
      articlesFile = path.join(resolvedTarget, 'src', 'data', 'articles.ts');
    } else if (resolvedTarget.endsWith('.ts')) {
      articlesFile = resolvedTarget;
    }
  }
  if (!fs.existsSync(articlesFile)) return [];
  const raw = fs.readFileSync(articlesFile, 'utf8');
  const arrayStart = raw.indexOf('export const ZIARAH_ARTICLES');
  const bodyRaw = arrayStart >= 0 ? raw.slice(arrayStart) : raw;

  const slugRegex = /\bslug:\s*(['"])((?:\\.|(?!\1).)*)\1/g;
  const positions = [];
  let match;
  while ((match = slugRegex.exec(bodyRaw)) !== null) {
    positions.push({ slug: cleanSeoText(match[2]), index: match.index });
  }

  const extracted = [];
  for (let i = 0; i < positions.length; i++) {
    const { slug, index } = positions[i];
    if (!slug) continue;
    const nextIndex = i + 1 < positions.length ? positions[i + 1].index : bodyRaw.length;
    const block = bodyRaw.slice(index, nextIndex);
    const title = extractQuotedField(block, 'title', slug);
    const metaDescription = extractQuotedField(block, 'metaDescription', '');
    const category = extractQuotedField(block, 'category', 'Rute Ziarah');
    const publishedAt = extractQuotedField(block, 'publishedAt', '2026-11-20');
    const readTimeMinutes = extractNumericField(block, 'readTimeMinutes', 6);
    const excerpt = extractQuotedField(block, 'excerpt', metaDescription);
    const sections = extractSectionsFromArticleBlock(block);
    const relatedSiteSlugs = extractStringArrayFromBlock(block, 'relatedSiteSlugs');
    const references = extractStringArrayFromBlock(block, 'references');
    const ctaMatch = block.match(/\bctaTarget:\s*\{([\s\S]*?)\}/);
    const ctaBlock = ctaMatch ? ctaMatch[1] : '';
    const ctaTarget = {
      label: extractQuotedField(ctaBlock, 'label', 'Buka Peta Rute Ziarah'),
      to: extractQuotedField(ctaBlock, 'to', '/peta'),
      description: extractQuotedField(ctaBlock, 'description', ''),
    };

    extracted.push({
      slug,
      title,
      metaDescription,
      category,
      publishedAt,
      readTimeMinutes,
      excerpt,
      sections,
      relatedSiteSlugs,
      ctaTarget,
      references,
    });
  }
  return extracted;
}

function parseFirestoreStringField(fields, key, fallback = '') {
  const val = fields?.[key]?.stringValue;
  return typeof val === 'string' && val.trim() ? cleanSeoText(val) : fallback;
}

function parseFirestoreNumberField(fields, key, fallback = 0) {
  const f = fields?.[key];
  if (!f || typeof f !== 'object') return fallback;
  if (typeof f.doubleValue === 'number' && Number.isFinite(f.doubleValue)) return f.doubleValue;
  if (f.integerValue !== undefined) {
    const parsed = Number(f.integerValue);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
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
    const legacyToCanonicalId = new Map();
    for (const [canonId, legacyId] of Object.entries(REGIONAL_ID_TO_LEGACY_ID)) {
      legacyToCanonicalId.set(legacyId, canonId);
    }
    for (const s of localSites) {
      mergedById.set(s.id, s);
      if (s.slug) slugToId.set(s.slug, s.id);
    }

    let addedCloudCount = 0;
    for (const docItem of docs) {
      const f = docItem.fields || {};
      const docNameParts = String(docItem.name || '').split('/');
      const rawDocId = parseFirestoreStringField(f, 'id', docNameParts[docNameParts.length - 1]);
      if (!rawDocId) continue;
      const docId = legacyToCanonicalId.get(rawDocId) || rawDocId;

      const isCuratorEdited = f.editedByCurator?.booleanValue === true;

      if (f.isDeleted?.booleanValue === true) {
        if (isCuratorEdited) {
          const existingSlug = mergedById.get(docId)?.slug;
          mergedById.delete(docId);
          if (existingSlug) slugToId.delete(existingSlug);
        }
        continue;
      }

      const locFields = f.location?.mapValue?.fields || {};
      const baseById = mergedById.get(docId);
      const name = parseFirestoreStringField(f, 'name', baseById?.name || docId);
      const title = parseFirestoreStringField(f, 'title', baseById?.title || formatMakamHeading(name));
      const city = parseFirestoreStringField(locFields, 'city', baseById?.city || 'Nusantara');
      const slug = getSiteSlug(title, city, docId, name);

      // Deduplicate by id or slug
      const existingIdBySlug = slugToId.get(slug);
      const targetId = baseById ? docId : existingIdBySlug || docId;
      const base = mergedById.get(targetId);

      // Canonical local 183-site catalog is always authoritative unless explicitly edited by a curator
      if (base && !isCuratorEdited) {
        continue;
      }

      const category = parseFirestoreStringField(f, 'category', base?.category || 'Waliyullah Nusantara');
      const description = parseFirestoreStringField(f, 'description', base?.description || '');
      const history = parseFirestoreStringField(f, 'history', base?.history || description);
      const address = parseFirestoreStringField(locFields, 'address', base?.address || '');
      const province = parseFirestoreStringField(locFields, 'province', base?.province || 'Indonesia');
      const lat = parseFirestoreNumberField(locFields, 'lat', base?.lat || 0);
      const lng = parseFirestoreNumberField(locFields, 'lng', base?.lng || 0);
      const era = parseFirestoreStringField(f, 'era', base?.era || '');
      const sanad = parseFirestoreStringField(f, 'sanad', base?.sanad || '');
      const karomah = getPublicTeaserOnly(parseFirestoreStringField(f, 'karomah', base?.karomah || ''));
      const untoldStory = getPublicTeaserOnly(parseFirestoreStringField(f, 'untoldStory', base?.untoldStory || ''));

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
        lat,
        lng,
        era,
        sanad,
        karomah,
        untoldStory,
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
const articles = extractArticlesFromSource();
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
                      `<li><a href="${SITE_ORIGIN}/situs/${escapeHtml(s.slug)}">Panduan Rute dan Sejarah ${escapeHtml(formatMakamHeading(s.title))} di Kota ${escapeHtml(s.city)}, Provinsi ${escapeHtml(s.province)}</a></li>`
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
          <span class="zn-badge">Arsip Sejarah &amp; Panduan Ziarah Nusantara</span>
          <h1 class="zn-h1">Merawat Sanad Ulama, Menemukan Ketenangan Batin.</h1>
          <p class="zn-lead">Menghimpun riwayat <strong>${sites.length} maqbarah di ${uniqueProvinces.length} provinsi</strong> agar setiap langkah ziarah menjadi pengingat akhirat, penguat iman, dan bakti doa bagi ahli kubur—dilengkapi urutan bacaan doa ziarah kubur (Arab, Latin, Artinya), Surah Yasin, Tahlil, Tasbih digital, kisah karomah, jadwal haul, dan peta rute GPS.</p>
          <nav class="zn-nav" aria-label="Pintasan Utama Ziarah Nusantara">
            <a class="zn-btn-primary" href="/panduan">Baca Doa Ziarah Kubur, Yasin &amp; Tahlil</a>
            <a class="zn-btn-secondary" href="/peta">Buka Peta Rute ${sites.length} Makam Wali</a>
            <a class="zn-btn-secondary" href="/rubrik">Rubrik Kisah Karomah &amp; Sejarah</a>
            <a class="zn-btn-secondary" href="/donasi">Layanan Infaq Operasional</a>
          </nav>
        </header>
        <section aria-label="Daftar Pilihan Lokasi Makam Wali Songo dan Ulama Nusantara">
          <div class="zn-grid">
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Gresik, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-syekh-maulana-malik-ibrahim-gresik">Makam Syekh Maulana Malik Ibrahim (Sunan Gresik)</a></h2>
              <p class="zn-card-desc">Pelopor dakwah Wali Songo tertua di Tanah Jawa (wafat 1419 M) yang memadukan pengobatan cuma-cuma, irigasi pertanian, dan penghapusan kasta.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Surabaya, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-ampel-surabaya">Makam Sunan Ampel (Raden Rahmat)</a></h2>
              <p class="zn-card-desc">Sesepuh dewan Wali Songo dan pendiri Pesantren Ampel Denta Surabaya yang melahirkan falsafah Moh Limo serta jaringan ulama Jawa.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Tuban, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-bonang-tuban">Makam Sunan Bonang (Raden Makhdum Ibrahim)</a></h2>
              <p class="zn-card-desc">Maestro dakwah kebudayaan dan suluk tasawuf Jawa melalui instrumen gamelan Bonang serta karya sastra Suluk Wujil.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Lamongan, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-drajat-lamongan">Makam Sunan Drajat (Raden Qasim)</a></h2>
              <p class="zn-card-desc">Pelopor filantropi Islam Nusantara dengan empat ajaran Catur Piwulang tentang kepedulian sosial terhadap fakir miskin.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Gresik, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-giri-gresik">Makam Sunan Giri (Raden Paku / Prabu Satmata)</a></h2>
              <p class="zn-card-desc">Pendiri Kedaton Giri yang menjadi pusat jaringan pendidikan dakwah Islam hingga Maluku, Lombok, Sulawesi, dan Kalimantan.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Demak, Jawa Tengah</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-kalijaga-demak">Makam Sunan Kalijaga (Raden Mas Said)</a></h2>
              <p class="zn-card-desc">Wali budayawan pencipta tembang Ilir-Ilir dan Lingsir Wengi yang mengislamkan masyarakat Jawa melalui seni wayang dan filosofi hidup.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Kudus, Jawa Tengah</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-kudus-kudus">Makam Sunan Kudus (Ja'far Shadiq)</a></h2>
              <p class="zn-card-desc">Wali al-Ilmi pendiri Masjid Menara Kudus yang mengajarkan toleransi luhur dan kearifan fikih kemasyarakatan.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Kudus, Jawa Tengah</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-muria-kudus">Makam Sunan Muria — Raden Umar Said (Sunan Muria)</a></h2>
              <p class="zn-card-desc">Putra Sunan Kalijaga yang berdakwah membina kaum petani, nelayan, dan pedagang kecil di lereng Gunung Muria melalui tembang Sinom dan Kinanthi.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Walisongo · Cirebon, Jawa Barat</span>
              <h2 class="zn-card-title"><a href="/situs/makam-sunan-gunung-jati-cirebon">Makam Sunan Gunung Jati (Syarif Hidayatullah)</a></h2>
              <p class="zn-card-desc">Ulama-sultan pendiri Kesultanan Cirebon dan Banten dengan wasiat abadi: Ingsun titip tajug lan fakir miskin.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Ulama · Jombang, Jawa Timur</span>
              <h2 class="zn-card-title"><a href="/situs/makam-kh-hasyim-asy-ari-jombang">Makam Hadratussyaikh KH. Hasyim Asy'ari (Tebuireng)</a></h2>
              <p class="zn-card-desc">Pendiri Pesantren Tebuireng dan Nahdlatul Ulama serta pencetus Resolusi Jihad yang membela kemerdekaan Republik Indonesia.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Ulama · Banjar, Kalimantan Selatan</span>
              <h2 class="zn-card-title"><a href="/situs/makam-guru-sekumpul-banjar">Makam Abah Guru Sekumpul (KH. Muhammad Zaini Abdul Ghani)</a></h2>
              <p class="zn-card-desc">Ulama kharismatik Kalimantan Selatan pengasuh Majelis Ar-Raudhah Martapura yang dihadiri jutaan jamaah dari seluruh penjuru dunia.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Habaib · Jakarta Pusat, DKI Jakarta</span>
              <h2 class="zn-card-title"><a href="/situs/makam-habib-ali-kwitang-jakarta-pusat">Makam Habib Ali Kwitang (Al-Habib Ali bin Abdurrahman Al-Habsyi)</a></h2>
              <p class="zn-card-desc">Pelopor Majelis Taklim Ahad Pagi Kwitang sejak abad ke-19, tempat peziarah memohon kepada Allah SWT kecintaan tulus kepada Nabi Muhammad SAW, keberkahan majelis ilmu dan dakwah, serta keteguhan iman keluarga.</p>
            </article>
            <article class="zn-card">
              <span class="zn-card-meta">Direktori Nasional · ${uniqueProvinces.length} Provinsi Indonesia</span>
              <h2 class="zn-card-title"><a href="/direktori">Buka Seluruh ${sites.length} Situs di ${uniqueProvinces.length} Provinsi</a></h2>
              <p class="zn-card-desc">Jelajahi direktori lengkap ${sites.length} makam Wali Songo, Ulama Pesantren, Raja Kesultanan Islam, dan Habaib di ${uniqueProvinces.length} provinsi seluruh kepulauan Nusantara.</p>
            </article>
          </div>
        </section>
        <section class="zn-faq" aria-label="Tanya Jawab Seputar Ziarah Kubur dan Direktori ${sites.length} Makam">
          <h2>Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?</h2>
          <p>Secara bahasa, kata <strong>ziarah</strong> berarti berkunjung atau menengok. Dalam syariat Islam, hukum melaksanakan ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim: <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em> Tujuan utama berziarah adalah melembutkan hati yang sedang penat oleh urusan dunia, mengingatkan diri akan kematian dan hari akhirat, mendoakan ampunan bagi orang tua serta kaum muslimin yang telah wafat, dan meneladani kesalehan maupun perjuangan dakwah para Waliyullah.</p>
          <h2>Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?</h2>
          <ol>
            <li><strong>Berwudhu dan Meluruskan Niat:</strong> Memasuki kawasan pemakaman dengan pakaian yang sopan, menjaga ketenangan, dan meluruskan niat berziarah semata-mata mengharap ridha Allah SWT.</li>
            <li><strong>Mengucapkan Salam kepada Ahli Kubur:</strong> Menghadap ke arah makam sambil mengucapkan salam penghormatan dan mendoakan keselamatan bagi seluruh penghuni makam kaum mukminin dan muslimin.</li>
            <li><strong>Membaca Istighfar dan Tawassul Al-Fatihah:</strong> Membaca istighfar tiga kali kemudian menghadiahkan pahala bacaan Surah Al-Fatihah kepada Nabi Muhammad SAW, para sahabat, para Waliyullah, ulama, orang tua, serta ahli kubur yang diziarahi.</li>
            <li><strong>Membaca Surah Yasin, Tahlil, dan Doa Arwah:</strong> Melantunkan Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, Ayat Kursi, kalimat dzikir tahlil, shalawat Nabi, lalu menutup dengan doa permohonan ampunan dan rahmat bagi ahli kubur.</li>
          </ol>
          <h2>Di Mana Saja Lokasi ${sites.length} Makam Wali Songo dan Ulama di Ziarah Nusantara?</h2>
          <p><strong>Ziarah Nusantara</strong> mendokumentasikan <strong>${sites.length} lokasi makam Waliyullah di ${uniqueProvinces.length} provinsi Indonesia</strong> lengkap dengan titik koordinat peta rute perjalanan, jadwal haul, kisah karomah, dan sanad keilmuan. Direktori ini mencakup sembilan makam Wali Songo di Jawa Timur, Jawa Tengah, dan Jawa Barat (Sunan Gresik, Sunan Ampel, Sunan Bonang, Sunan Drajat, Sunan Giri, Sunan Kalijaga, Sunan Kudus, Sunan Muria — Raden Umar Said (Sunan Muria), dan Sunan Gunung Jati) hingga makam ulama besar, raja kesultanan Islam, dan habaib di seluruh ${uniqueProvinces.length} provinsi Indonesia.</p>
          <h2>Layanan dan Direktori Utama Ziarah Nusantara</h2>
          <ul>
            <li><a href="${SITE_ORIGIN}/direktori">Direktori ${sites.length} Makam Walisongo, Ulama, dan Habaib di ${uniqueProvinces.length} Provinsi Indonesia</a></li>
            <li><a href="${SITE_ORIGIN}/panduan">Panduan Doa Ziarah Kubur Lengkap (Arab, Latin, dan Artinya) beserta Tahlil dan Adab Ziarah</a></li>
            <li><a href="${SITE_ORIGIN}/peta">Peta Rute Perjalanan Ziarah Wali Songo dan Ulama Nusantara</a></li>
            <li><a href="${SITE_ORIGIN}/doa">Kumpulan Doa Khusus Ziarah Kubur, Tahlil, dan Tawassul</a></li>
            <li><a href="${SITE_ORIGIN}/rubrik">Rubrik Sejarah, Kisah Karomah, dan Wasiat Batin Para Wali</a></li>
            <li><a href="${SITE_ORIGIN}/kurasi">Standar Kurasi dan Metodologi Referensi Sejarah</a></li>
            <li><a href="${SITE_ORIGIN}/donasi">Infaq Operasional &amp; Pemeliharaan Digital dan Ruang Munajat Doa Peziarah</a></li>
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

export function buildPanduanRootHtml() {
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

export function buildRubrikRootHtml() {
  const featuredSites = (Array.isArray(sites) ? sites : [])
    .filter((s) => s && (s.untoldStory || s.karomah))
    .slice(0, 24);
  const itemsHtml = featuredSites
    .map((s) => {
      const safeTitle = escapeHtml(formatMakamHeading(s.title || s.name || s.id || 'Makam Waliyullah'));
      const safeName = escapeHtml(s.name || s.title || s.id || 'Waliyullah');
      const safeCity = escapeHtml(s.city || 'Nusantara');
      const safeProv = escapeHtml(s.province || 'Indonesia');
      const safeSlug = escapeHtml(s.slug || s.id || '');
      const rawTeaser = getPublicTeaserOnly(s.untoldStory || s.karomah || s.history || s.description || '');
      const safeStory = escapeHtml(rawTeaser);
      return `<li>
              <article>
                <h3><a href="${SITE_ORIGIN}/situs/${safeSlug}">Kisah &amp; Keteladanan ${safeTitle} (${safeName}) — ${safeCity}, ${safeProv}</a></h3>
                <p>${safeStory}</p>
              </article>
            </li>`;
    })
    .join('\n          ');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Rubrik Sejarah, Kisah Karomah &amp; Wasiat Batin Para Wali — Ziarah Nusantara</h1>
          <p>Kisah nyata keteladanan, wasiat batin, sanad keilmuan, dan sejarah dakwah ${sites.length} Waliyullah Nusantara di ${uniqueProvinces.length} provinsi berbasis naskah babad dan rujukan akademik.</p>
        </header>
        <section>
          <h2>Indeks Kisah Keteladanan &amp; Karomah Waliyullah Nusantara</h2>
          <ul>
            ${itemsHtml}
          </ul>
        </section>
      </main>`;
}

export function buildPetaRootHtml() {
  const provinceBlocks = uniqueProvinces
    .map((prov) => {
      const provSites = sites.filter((s) => s.province === prov);
      const sampleLinks = provSites
        .slice(0, 6)
        .map(
          (s) =>
            `<li><a href="${SITE_ORIGIN}/situs/${escapeHtml(s.slug)}">${escapeHtml(formatMakamHeading(s.title))} — ${escapeHtml(s.city)} (${s.lat || 0}, ${s.lng || 0})</a></li>`
        )
        .join('\n              ');
      return `<section>
            <h2>Peta Titik Koordinat Makam Wali di Provinsi ${escapeHtml(prov)} (${provSites.length} Situs)</h2>
            <ul>
              ${sampleLinks}
            </ul>
          </section>`;
    })
    .join('\n        ');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Peta Rute Ziarah Makam Wali Songo &amp; Ulama Nusantara (${sites.length} Titik di ${uniqueProvinces.length} Provinsi)</h1>
          <p>Peta geospasial interaktif dan titik koordinat GPS seluruh ${sites.length} makam Waliyullah, Wali Songo, Ulama Pesantren, dan Habaib di ${uniqueProvinces.length} provinsi kepulauan Indonesia untuk perencanaan rute perjalanan ziarah kubur.</p>
        </header>
        ${provinceBlocks}
      </main>`;
}

export function buildDoaRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Kumpulan Doa Khusus Ziarah Kubur, Tahlil &amp; Tawassul Lengkap — Ziarah Nusantara</h1>
          <p>Himpunan bacaan doa ziarah kubur orang tua dan makam Waliyullah lengkap teks Arab, transliterasi Latin, dan terjemahan Bahasa Indonesia beserta susunan tawassul khusus masing-masing tokoh.</p>
        </header>
        <section>
          <h2>Rangkaian Pokok Doa Ziarah Kubur &amp; Tahlil Nusantara</h2>
          <ol>
            <li><strong>Salam Ziarah Kubur Umum (Assalamu&rsquo;alaikum Ahlad Diyar):</strong> Doa penghormatan dan permohonan keselamatan ketika memasuki area pemakaman kaum mukminin dan muslimin.</li>
            <li><strong>Qasidah Salamullah Ya Sadah:</strong> Bait salam tawassul kepada para kekasih Allah SWT dan ahli kubur yang dirangkai secara khusyuk sebelum memulai dzikir.</li>
            <li><strong>Tawassul Al-Fatihah &amp; Surah Pilihan:</strong> Pengiriman pahala bacaan Surah Al-Fatihah, Surah Yasin, Al-Ikhlas, Al-Falaq, An-Nas, dan Ayat Kursi kepada Rasulullah SAW, para Waliyullah, ulama, dan ahli kubur.</li>
            <li><strong>Dzikir Tahlil, Tasbih &amp; Doa Arwah Penutup:</strong> Bacaan kalimat thayyibah La ilaha illallah, shalawat Nabi, serta doa permohonan ampunan dan keluasan rahmat bagi ahli kubur.</li>
          </ol>
          <p>Pelajari juga <a href="${SITE_ORIGIN}/panduan">Urutan Lengkap Tata Cara &amp; Adab Ziarah Kubur</a> atau telusuri <a href="${SITE_ORIGIN}/peta">Peta ${sites.length} Makam Waliyullah di ${uniqueProvinces.length} Provinsi</a>.</p>
        </section>
      </main>`;
}

export function buildDonasiRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Infaq Operasional &amp; Pemeliharaan Digital Arsip Sejarah Makam Wali — Ziarah Nusantara</h1>
          <p>Program dukungan sukarela berbasis QRIS resmi Ziarah Nusantara untuk menopang riset sumber sejarah, digitalisasi manuskrip doa ziarah, serta pemeliharaan basis data ${sites.length} makam Waliyullah di ${uniqueProvinces.length} provinsi agar tetap terbuka dan gratis bagi peziarah.</p>
        </header>
        <section>
          <h2>Pilar Pengelolaan Dana Pemeliharaan Arsip &amp; Layanan Peziarah</h2>
          <ul>
            <li><strong>Pelestarian Arsip Sejarah &amp; Sanad Ulama:</strong> Verifikasi naskah babad, inskripsi makam, karya kitab kuning, dan literatur akademik sejarah dakwah Islam Nusantara.</li>
            <li><strong>Akses Terbuka Panduan Doa, Yasin &amp; Tahlil:</strong> Menjaga fitur panduan bacaan Arab-Latin, tasbih digital, dan direktori koordinat GPS makam tetap mudah diakses dari perangkat seluler.</li>
            <li><strong>Ruang Munajat Doa Bersama Peziarah:</strong> Wadah kebersamaan peziarah untuk menitipkan hajat dan doa keselamatan keluarga yang turut diaminkan sesama jamaah.</li>
          </ul>
          <nav aria-label="Tautan Terkait Layanan">
            <a href="${SITE_ORIGIN}/panduan">Panduan Doa &amp; Tahlil</a> · <a href="${SITE_ORIGIN}/kurasi">Standar Kurasi Sejarah</a> · <a href="${SITE_ORIGIN}/">Beranda Direktori</a>
          </nav>
        </section>
      </main>`;
}

export function buildKurasiRootHtml() {
  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Standar Kurasi &amp; Metodologi Referensi Sejarah — Ziarah Nusantara</h1>
          <p>Pedoman ilmiah dan kaidah penulisan biografi yang digunakan Tim Kurator Arsip Ziarah Nusantara dalam memverifikasi profil sejarah, koordinat lokasi, jadwal haul, dan rujukan pustaka ${sites.length} situs maqbarah di ${uniqueProvinces.length} provinsi.</p>
        </header>
        <section>
          <h2>Hierarki Rujukan Historis dalam Kurasi Ziarah Nusantara</h2>
          <ol>
            <li><strong>Inskripsi &amp; Sumber Primer Cagar Budaya:</strong> Data nisan bersejarah, prasasti masjid kuno, piagam kesultanan, serta dokumentasi cagar budaya resmi.</li>
            <li><strong>Catatan Sejarah, Babad &amp; Literatur Akademik:</strong> Rujukan kitab manaqib, babad klasik, disertasi, skripsi sejarah Islam, dan jurnal kajian filologi Nusantara.</li>
            <li><strong>Riwayat Tradisi Lisan Terverifikasi:</strong> Kesaksian ahli waris, pengasuh pesantren, juru kunci maqbarah, dan majelis haul yang diakui secara turun-temurun.</li>
          </ol>
          <p>Lihat pula <a href="${SITE_ORIGIN}/rubrik">Rubrik Kisah &amp; Wasiat Batin Para Wali</a> dan <a href="${SITE_ORIGIN}/peta">Peta Direktori ${sites.length} Makam Wali</a>.</p>
        </section>
      </main>`;
}

export function buildArtikelIndexRootHtml() {
  const listItemsHtml = articles
    .map((art) => {
      const safeSlug = escapeHtml(art.slug);
      const safeTitle = escapeHtml(art.title);
      const safeCategory = escapeHtml(art.category);
      const safeExcerpt = escapeHtml(art.excerpt || art.metaDescription);
      return `<li>
              <article>
                <span>${safeCategory} &middot; ${art.readTimeMinutes || 6} menit baca</span>
                <h2><a href="/artikel/${safeSlug}">${safeTitle}</a></h2>
                <p>${safeExcerpt}</p>
              </article>
            </li>`;
    })
    .join('\n            ');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <header>
          <h1>Artikel Panduan, Fikih &amp; Rute Ziarah Wali Nusantara — Ziarah Nusantara</h1>
          <p>Kumpulan ${articles.length} panduan praktis rute ziarah Wali Songo dan ulama pesantren, urutan doa ziarah kubur orang tua (Arab, Latin, Artinya), kaidah tawassul Ahlussunnah wal Jamaah, serta kalender haul tahunan di ${uniqueProvinces.length} provinsi.</p>
        </header>
        <section aria-label="Daftar Artikel Panduan dan Rute Ziarah">
          <ul>
            ${listItemsHtml}
          </ul>
        </section>
      </main>`;
}

export function buildArticleDetailRootHtml(article) {
  const sectionsHtml = (Array.isArray(article.sections) ? article.sections : [])
    .map((sec) => {
      const paragraphsHtml = (Array.isArray(sec.paragraphs) ? sec.paragraphs : [])
        .map((p) => `<p>${escapeHtml(p.replace(/\*\*/g, ''))}</p>`)
        .join('\n            ');
      const bulletsHtml =
        Array.isArray(sec.bulletPoints) && sec.bulletPoints.length > 0
          ? `<ul>\n              ${sec.bulletPoints
              .map((bp) => `<li>${escapeHtml(bp.replace(/\*\*/g, ''))}</li>`)
              .join('\n              ')}\n            </ul>`
          : '';
      return `<section>
            <h2>${escapeHtml(sec.heading)}</h2>
            ${paragraphsHtml}
            ${bulletsHtml}
          </section>`;
    })
    .join('\n          ');

  const relatedLinksHtml = (Array.isArray(article.relatedSiteSlugs) ? article.relatedSiteSlugs : [])
    .map((siteSlug) => {
      const matched = sites.find((s) => s.slug === siteSlug || s.id === siteSlug);
      if (matched) {
        return `<li><a href="/situs/${escapeHtml(matched.slug)}">${escapeHtml(formatMakamHeading(matched.title))} (${escapeHtml(matched.city)}, ${escapeHtml(matched.province)})</a></li>`;
      }
      return `<li><a href="/situs/${escapeHtml(siteSlug)}">${escapeHtml(formatMakamHeading(siteSlug.replace(/-/g, ' ')))}</a></li>`;
    })
    .join('\n              ');

  const refsHtml = (Array.isArray(article.references) ? article.references : [])
    .map((ref) => `<li>${escapeHtml(ref)}</li>`)
    .join('\n              ');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <article>
          <p><a href="${SITE_ORIGIN}/">Beranda Ziarah Nusantara</a> &rsaquo; <a href="${SITE_ORIGIN}/artikel">Artikel Panduan Ziarah</a> &rsaquo; ${escapeHtml(article.category)}</p>
          <h1>${escapeHtml(article.title)}</h1>
          <p><strong>Kategori:</strong> ${escapeHtml(article.category)} | <strong>Terbit:</strong> ${escapeHtml(article.publishedAt)} | <strong>Estimasi Baca:</strong> ${article.readTimeMinutes || 6} menit</p>
          <p>${escapeHtml(article.excerpt || article.metaDescription)}</p>
          ${sectionsHtml}
          <nav aria-label="Maqbarah Terkait dalam Artikel Ini">
            <h2>Maqbarah Terkait dalam Artikel Ini</h2>
            <ul>
              ${relatedLinksHtml}
            </ul>
          </nav>
          ${
            article.ctaTarget
              ? `<section aria-label="Fitur Pendamping Ziarah">
            <h2>${escapeHtml(article.ctaTarget.label)}</h2>
            <p>${escapeHtml(article.ctaTarget.description)}</p>
            <p><a href="${escapeHtml(article.ctaTarget.to)}">${escapeHtml(article.ctaTarget.label)}</a></p>
          </section>`
              : ''
          }
          ${
            refsHtml
              ? `<section aria-label="Referensi dan Rujukan">
            <h2>Referensi &amp; Rujukan Pustaka</h2>
            <ol>
              ${refsHtml}
            </ol>
          </section>`
              : ''
          }
        </article>
      </main>`;
}

export function buildSiteRootHtml(site) {
  const sameProvince = sites.filter((s) => s.id !== site.id && s.province === site.province);
  const otherSites = sites.filter((s) => s.id !== site.id && s.province !== site.province);
  const relatedSites = [...sameProvince, ...otherSites].slice(0, 6);
  const relatedLinksHtml = relatedSites
    .map(
      (rel) =>
        `<li><a href="${SITE_ORIGIN}/situs/${escapeHtml(rel.slug)}">${escapeHtml(formatMakamHeading(rel.title))} (${escapeHtml(rel.city)}, ${escapeHtml(rel.province)})</a></li>`
    )
    .join('\n              ');

  const safeKaromahTeaser = getPublicTeaserOnly(site.karomah || '');
  const safeUntoldTeaser = getPublicTeaserOnly(site.untoldStory || '');
  const headingTitle = formatMakamHeading(site.title || site.name || site.id || 'Makam Waliyullah');

  return `<main id="seo-prerender-shell" class="zn-prerender-shell" lang="id">
        <article>
          <p><a href="${SITE_ORIGIN}/">Beranda Ziarah Nusantara</a> &rsaquo; <a href="${SITE_ORIGIN}/peta">Peta &amp; Direktori ${escapeHtml(site.province)}</a> &rsaquo; ${escapeHtml(headingTitle)}</p>
          <h1>${escapeHtml(headingTitle)} (${escapeHtml(site.name)}) — ${escapeHtml(site.city)}, ${escapeHtml(site.province)}</h1>
          <p><strong>Kategori Tokoh:</strong> ${escapeHtml(site.category)} ${site.era ? `| <strong>Periode Sejarah:</strong> ${escapeHtml(site.era)}` : ''}</p>
          <p><strong>Alamat Lokasi Pemakaman:</strong> ${escapeHtml(site.address)}, Kota/Kabupaten ${escapeHtml(site.city)}, Provinsi ${escapeHtml(site.province)}, Indonesia.</p>
          <h2>Profil, Riwayat Dakwah, dan Sejarah ${escapeHtml(site.title)}</h2>
          <p>${escapeHtml(site.description)}</p>
          <p>${escapeHtml(site.history)}</p>
          ${safeKaromahTeaser ? `<h2>Kisah Keteladanan dan Karomah ${escapeHtml(site.name)}</h2><p>${escapeHtml(safeKaromahTeaser)}</p>` : ''}
          ${safeUntoldTeaser ? `<h2>Jejak Batin dan Kisah di Balik Layar ${escapeHtml(site.name)}</h2><p>${escapeHtml(safeUntoldTeaser)}</p>` : ''}
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

export function buildRouteJsonLd(entry) {
  const canonicalHref = entry.canonicalLoc || entry.loc;
  const fullImageUrl = `${SITE_ORIGIN}/pwa-512x512.png`;
  const cleanTitle = cleanSeoText(entry.title);
  const cleanDesc = cleanSeoText(entry.description);

  const graphNodes = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Ziarah Nusantara',
      legalName: 'Tim Kurator Arsip Ziarah Nusantara',
      url: `${SITE_ORIGIN}/`,
      logo: fullImageUrl,
      image: {
        '@type': 'ImageObject',
        '@id': `${SITE_ORIGIN}/#logo`,
        url: fullImageUrl,
        contentUrl: fullImageUrl,
        width: 512,
        height: 512,
        caption: 'Ziarah Nusantara',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: 'Ziarah Nusantara',
      alternateName: ['Portal Ziarah Nusantara', 'Direktori Makam Wali Nusantara'],
      description: cleanDesc,
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalHref}#webpage`,
      url: canonicalHref,
      name: cleanTitle,
      description: cleanDesc,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      primaryImageOfPage: { '@id': `${SITE_ORIGIN}/#logo` },
      thumbnailUrl: fullImageUrl,
    },
  ];

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Ziarah Nusantara',
      item: `${SITE_ORIGIN}/`,
    },
  ];

  if (entry.site) {
    const siteHeading = cleanSeoText(formatMakamHeading(entry.site.title || entry.site.name));
    const lat = Number(entry.site.lat);
    const lng = Number(entry.site.lng);
    const hasCoords = Number.isFinite(lat) && Number.isFinite(lng) && (lat !== 0 || lng !== 0);

    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Peta & Direktori Makam Wali',
        item: `${SITE_ORIGIN}/peta`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: siteHeading,
        item: canonicalHref,
      }
    );

    graphNodes.push({
      '@type': ['Place', 'LandmarksOrHistoricalBuildings'],
      '@id': `${canonicalHref}#place`,
      name: `${siteHeading} (${cleanSeoText(entry.site.name)})`,
      description: cleanSeoText(entry.site.description),
      url: canonicalHref,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cleanSeoText(entry.site.address),
        addressLocality: cleanSeoText(entry.site.city),
        addressRegion: cleanSeoText(entry.site.province),
        addressCountry: 'ID',
      },
      ...(hasCoords
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: lat,
              longitude: lng,
            },
          }
        : {}),
    });
  } else if (entry.article) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Artikel Panduan Ziarah',
        item: `${SITE_ORIGIN}/artikel`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cleanSeoText(entry.article.title),
        item: canonicalHref,
      }
    );

    graphNodes.push({
      '@type': 'Article',
      '@id': `${canonicalHref}#article`,
      headline: cleanSeoText(entry.article.title),
      description: cleanSeoText(entry.article.metaDescription || entry.description),
      articleSection: cleanSeoText(entry.article.category || 'Panduan Ziarah'),
      inLanguage: 'id-ID',
      datePublished: entry.article.publishedAt || '2026-11-20',
      dateModified: entry.article.publishedAt || '2026-11-20',
      mainEntityOfPage: { '@id': `${canonicalHref}#webpage` },
      author: { '@id': `${SITE_ORIGIN}/#organization` },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      image: fullImageUrl,
    });
  } else if (entry.path && entry.path !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: cleanTitle.split('—')[0].split('|')[0].trim(),
      item: canonicalHref,
    });
  }

  graphNodes.push({
    '@type': 'BreadcrumbList',
    '@id': `${canonicalHref}#breadcrumb`,
    itemListElement: breadcrumbItems,
  });

  if (entry.path === '/' || entry.path === '/panduan') {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': `${canonicalHref}#faq`,
      inLanguage: 'id-ID',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dalam syariat Islam, hukum ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim: Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.',
          },
        },
        {
          '@type': 'Question',
          name: 'Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Urutan doa ziarah kubur meliputi berwudhu dan meluruskan niat, mengucapkan salam ahli kubur, membaca istighfar dan tawassul Al-Fatihah, membaca Surah Yasin, surat-surat pendek dan Ayat Kursi, dzikir tahlil dan shalawat Nabi, lalu menutup dengan doa arwah.',
          },
        },
      ],
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
      `<meta property="og:description" id="og-description" content="${escapeHtml(cleanDesc)}" />`
    )
    .replace(
      /<meta property="og:url" id="og-url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" id="og-url" content="${escapeHtml(canonicalHref)}" />`
    )
    .replace(
      /<meta name="twitter:title" id="twitter-title" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" id="twitter-title" content="${escapeHtml(cleanTitle)}" />`
    )
    .replace(
      /<meta name="twitter:description" id="twitter-description" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" id="twitter-description" content="${escapeHtml(cleanDesc)}" />`
    );

  if (entry.path && entry.path !== '/') {
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
          : r.path === '/doa'
            ? buildDoaRootHtml()
            : r.path === '/peta'
              ? buildPetaRootHtml()
              : r.path === '/rubrik'
                ? buildRubrikRootHtml()
                : r.path === '/donasi' || r.path === '/infaq'
                  ? buildDonasiRootHtml()
                  : r.path === '/kurasi'
                    ? buildKurasiRootHtml()
                    : r.path === '/artikel'
                      ? buildArtikelIndexRootHtml()
                      : r.path === '/direktori'
                        ? buildDirektoriRootHtml()
                        : buildHomepageRootHtml(),
    })),
    ...articles.map((art) => ({
      loc: `${SITE_ORIGIN}/artikel/${encodeURIComponent(art.slug)}`,
      canonicalLoc: `${SITE_ORIGIN}/artikel/${encodeURIComponent(art.slug)}`,
      isAliasRoute: false,
      changefreq: 'weekly',
      priority: '0.8',
      title: cleanSeoText(`${art.title} | Ziarah Nusantara`),
      description: cleanSeoText(art.metaDescription || art.excerpt),
      path: `/artikel/${art.slug}`,
      article: art,
      bodyHtml: buildArticleDetailRootHtml(art),
    })),
    ...sites.map((s) => {
      const legacyApostropheSlug = s.title.includes("'")
        ? getSiteSlug(s.title.split("'")[0], s.city, s.id)
        : null;
      const headingTitle = formatMakamHeading(s.title);
      return {
        loc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
        canonicalLoc: `${SITE_ORIGIN}/situs/${encodeURIComponent(s.slug)}`,
        isAliasRoute: false,
        changefreq: 'weekly',
        priority: '0.8',
        title: cleanSeoText(`${headingTitle} (${s.city}, ${s.province}) — Rute, Kisah Karomah & Doa Ziarah | Ziarah Nusantara`),
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

  const aiCatalogJsonContent = JSON.stringify(
    {
      specVersion: '1.0',
      host: {
        displayName: 'Ziarah Nusantara — Tim Kurator Arsip Ziarah Nusantara',
      },
      entries: [
        {
          identifier: 'urn:air:ziarahnusantara.my.id:docs:llms-summary',
          displayName: 'Panduan & Ringkasan Arsip Ziarah Nusantara (LLMs.txt)',
          type: 'text/markdown',
          url: `${SITE_ORIGIN}/llms.txt`,
          description: `Dokumentasi ringkas dalam format Markdown untuk agen AI mengenai hukum ziarah kubur, urutan bacaan doa ziarah kubur, tahlil, tawassul, dan indeks direktori ${sites.length} makam Waliyullah di ${uniqueProvinces.length} provinsi Indonesia.`,
          representativeQueries: [
            'Bagaimana urutan bacaan doa ziarah kubur lengkap Arab Latin dan artinya?',
            `Apa saja daftar ${sites.length} lokasi makam Wali Songo dan Ulama Nusantara di Indonesia?`,
            'Apa tujuan dan hukum ziarah kubur dalam Islam menurut hadits?',
          ],
        },
        {
          identifier: 'urn:air:ziarahnusantara.my.id:docs:llms-full-catalog',
          displayName: `Katalog Lengkap ${sites.length} Situs Makam Waliyullah Nusantara (LLMs-Full.txt)`,
          type: 'text/markdown',
          url: `${SITE_ORIGIN}/llms-full.txt`,
          description: `Katalog ensiklopedis lengkap dalam format Markdown yang memuat profil sejarah, sanad keilmuan, alamat, koordinat geospasial, dan riwayat ${sites.length} makam Wali Songo, Ulama, Habaib, dan Auliya Nusantara di ${uniqueProvinces.length} provinsi.`,
          representativeQueries: [
            'Dimana alamat lengkap dan koordinat makam Sunan Ampel dan Sunan Gunung Jati?',
            'Siapa saja tokoh ulama dan habaib yang dimakamkan di Jawa, Sumatera, Kalimantan, dan Sulawesi?',
            'Bagaimana sejarah dakwah dan sanad keilmuan para Wali Songo?',
          ],
        },
        {
          identifier: 'urn:air:ziarahnusantara.my.id:feeds:sitemap-xml',
          displayName: 'Peta Situs Kanonis Ziarah Nusantara (Sitemap XML)',
          type: 'application/xml',
          url: `${SITE_ORIGIN}/sitemap.xml`,
          description: `Indeks XML seluruh ${sitemapEntries.length} halaman kanonis Ziarah Nusantara meliputi direktori makam, peta rute geospasial, panduan doa ziarah kubur, rubrik sejarah, dan profil ${sites.length} situs makam di ${uniqueProvinces.length} provinsi.`,
          representativeQueries: [
            'Daftar lengkap URL halaman makam wali di Ziarah Nusantara',
            'Indeks halaman panduan doa dan direktori makam Nusantara',
          ],
        },
        {
          identifier: 'urn:air:ziarahnusantara.my.id:feeds:rss-feed',
          displayName: 'Umpan Sindikasi Arsip & Profil Makam Wali (RSS 2.0)',
          type: 'application/rss+xml',
          url: `${SITE_ORIGIN}/rss.xml`,
          description: `Umpan RSS 2.0 berisi pembaruan artikel sejarah, panduan adab ziarah, dan katalog ${sites.length} lokasi makam Waliyullah Nusantara di ${uniqueProvinces.length} provinsi.`,
          representativeQueries: [
            'Artikel terbaru rubrik kisah karomah dan sejarah wali Nusantara',
            'Pembaruan direktori lokasi makam ulama dan habaib di Indonesia',
          ],
        },
      ],
    },
    null,
    2
  ) + '\n';

  // Write generated sitemaps, feeds, llms.txt, ziarah-sites.json, and AI catalogs to both public/ and dist/
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
      fs.writeFileSync(path.join(targetFolder, 'ai-catalog.json'), aiCatalogJsonContent, 'utf8');
      fs.writeFileSync(path.join(targetFolder, 'ard.json'), aiCatalogJsonContent, 'utf8');
      const wellKnownDir = path.join(targetFolder, '.well-known');
      fs.mkdirSync(wellKnownDir, { recursive: true });
      fs.writeFileSync(path.join(wellKnownDir, 'ai-catalog.json'), aiCatalogJsonContent, 'utf8');
      fs.writeFileSync(path.join(wellKnownDir, 'ard.json'), aiCatalogJsonContent, 'utf8');
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
