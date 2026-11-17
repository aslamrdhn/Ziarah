import { useState, useEffect } from 'react';
import type { ZiarahSite } from '../data/sites';
import { PRE_RESOLVED_AUTHENTIC_IMAGES } from '../data/authenticImageUrls';

export const AUTHENTIC_IMAGES_STORAGE_KEY = 'ziarah_authentic_site_images_v3';
const LEGACY_IMAGES_STORAGE_KEYS = ['ziarah_authentic_site_images_v1', 'ziarah_authentic_site_images_v2'];

export const FIRST_12_THUMB_BY_ID: Record<string, string> = {
  'syekh-maulana-malik-ibrahim': '/thumbs/wali-1.webp',
  'wali-1': '/thumbs/wali-1.webp',
  'sunan-ampel': '/thumbs/wali-2.webp',
  'wali-2': '/thumbs/wali-2.webp',
  'sunan-bonang': '/thumbs/wali-3.webp',
  'wali-3': '/thumbs/wali-3.webp',
  'sunan-drajat': '/thumbs/wali-4.webp',
  'wali-4': '/thumbs/wali-4.webp',
  'sunan-kudus': '/thumbs/wali-5.webp',
  'wali-5': '/thumbs/wali-5.webp',
  'sunan-giri': '/thumbs/wali-6.webp',
  'wali-6': '/thumbs/wali-6.webp',
  'sunan-kalijaga': '/thumbs/wali-7.webp',
  'wali-7': '/thumbs/wali-7.webp',
  'sunan-muria': '/thumbs/wali-8.webp',
  'wali-8': '/thumbs/wali-8.webp',
  'sunan-gunung-jati': '/thumbs/wali-9.webp',
  'wali-9': '/thumbs/wali-9.webp',
  'habib-ali-kwitang': '/thumbs/wali-10.webp',
  'habib-1': '/thumbs/wali-10.webp',
  'habib-husein-luar-batang': '/thumbs/wali-11.webp',
  'habib-2': '/thumbs/wali-11.webp',
  'mbah-priok': '/thumbs/wali-12.webp',
  'habib-hasan-mbah-priok': '/thumbs/wali-12.webp',
  'habib-3': '/thumbs/wali-12.webp',
};

export function isFirst12OwnerSite(
  site?: Partial<Pick<ZiarahSite, 'id' | 'legacyId'>> | null
): boolean {
  if (!site) return false;
  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();
  return Boolean(
    (idKey && FIRST_12_THUMB_BY_ID[idKey]) || (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey])
  );
}

export const SITE_WIKI_QUERY_OVERRIDES: Record<string, string[]> = {
  'sultan-maulana-hasanuddin': ['Masjid_Agung_Banten', 'Maulana_Hasanuddin_dari_Banten', 'Kesultanan_Banten'],
  'habib-utsman-bin-yahya': ['Utsman_bin_Yahya', 'Masjid_Jami_Al-Abidin'],
  'pangeran-jayakarta': ['Pangeran_Jayakarta', 'Masjid_Assalafiyah'],
  'guru-marzuki-cipinang': ['Ahmad_Marzuki_bin_Mirshod', 'Masjid_Jami_Al-Marzuqiyah', 'Jatinegara,_Jakarta_Timur'],
  'habib-kuncung-kalibata': [
    'Rawajati,_Pancoran,_Jakarta_Selatan',
    'Kalibata,_Pancoran,_Jakarta_Selatan',
    'Alwi_bin_Thahir_al-Haddad',
  ],
  'habib-ahmad-bin-alwi-al-haddad': [
    'Rawajati,_Pancoran,_Jakarta_Selatan',
    'Kalibata,_Pancoran,_Jakarta_Selatan',
    'Alwi_bin_Thahir_al-Haddad',
  ],
  'pangeran-achmad-djajadiningrat': ['Achmad_Djajadiningrat', 'Serang'],
  'keramat-tajug-cililitan': ['Cililitan,_Kramat_Jati,_Jakarta_Timur', 'Kramat_Jati,_Jakarta_Timur'],
  'keramat-kampung-bandan': ['Masjid_Al-Mukarromah_Kampung_Bandan', 'Ancol,_Pademangan,_Jakarta_Utara'],
  'makam-kampung-bandan': ['Masjid_Al-Mukarromah_Kampung_Bandan', 'Ancol,_Pademangan,_Jakarta_Utara'],
  'pangeran-wijaya-kusuma': ['Wijayakusuma,_Grogol_Petamburan,_Jakarta_Barat', 'Tubagus_Angke'],
  'datuk-banjir': ['Cawang,_Kramat_Jati,_Jakarta_Timur', 'Sungai_Ciliwung'],
  'habib-abdullah-empang-bogor': ['Empang,_Bogor_Selatan,_Bogor', 'Kota_Bogor'],
  'raden-saleh-syarif-bustaman-bogor': ['Raden_Saleh', 'Bondongan,_Bogor_Selatan,_Bogor'],
  'mama-falak-pagentongan-bogor': ['Tubagus_Muhammad_Falak', 'Bogor_Barat,_Bogor'],
  'kh-noer-ali-bekasi': ['Noer_Ali', 'Kabupaten_Bekasi'],
  'syekh-abdul-muhyi-pamijahan': ['Abdul_Muhyi', 'Kabupaten_Tasikmalaya'],
  'syekh-quro-karawang': ['Syekh_Quro', 'Masjid_Agung_Syekh_Quro'],
  'pangeran-cakrabuana': ['Pangeran_Cakrabuana', 'Keraton_Kasepuhan'],
  'syekh-datuk-kahfi': ['Syekh_Datuk_Kahfi', 'Gunung_Jati,_Cirebon'],
  'sultan-maulana-yusuf': ['Maulana_Yusuf_dari_Banten', 'Kesultanan_Banten'],
  'syekh-nawawi-al-bantani': ['Nawawi_al-Bantani', 'Tanara,_Serang'],
  'syekh-asnawi-caringin': ['Asnawi_Caringin', 'Caringin,_Pandeglang'],
  'eyang-dalem-abdul-manaf-mahmud': ['Kampung_Adat_Mahmud', 'Margaasih,_Bandung'],
  'syaichona-kholil-bangkalan': ['Kholil_al-Bangkalani', 'Kabupaten_Bangkalan'],
  'kh-hasyim-asyari-tebuireng': ['Hasyim_Asy%27ari', 'Pondok_Pesantren_Tebuireng'],
  'gus-dur-tebuireng': ['Abdurrahman_Wahid', 'Pondok_Pesantren_Tebuireng'],
  'kh-abdul-karim-lirboyo': ['Abdul_Karim_(ulama)', 'Pondok_Pesantren_Lirboyo'],
  'syekh-abdurrauf-as-singkili': ['Abdurrauf_as-Singkili', 'Masjid_Raya_Baiturrahman'],
  'sultan-malikussaleh': ['Malikussaleh', 'Kesultanan_Samudera_Pasai'],
  'syekh-burhanuddin-ulakan': ['Burhanuddin_Ulakan', 'Ulakan_Tapakis,_Padang_Pariaman'],
  'syekh-muhammad-arsyad-al-banjari': ['Muhammad_Arsyad_al-Banjari', 'Martapura,_Banjar'],
  'guru-sekumpul-martapura': ['Muhammad_Zaini_Abdul_Ghani', 'Martapura,_Banjar'],
  'syekh-yusuf-al-makassari': ['Yusuf_al-Makassari', 'Kabupaten_Gowa'],
  'sultan-hasanuddin-gowa': ['Sultan_Hasanuddin', 'Kompleks_Makam_Sultan_Hasanuddin'],
  'habib-idrus-bin-salim-al-jufri-palu': ['Idrus_bin_Salim_al-Jufri', 'Alkhairaat'],
  'kyai-mojo-tondano': ['Kyai_Maja', 'Tondano'],
  'tuanku-imam-bonjol-minahasa': ['Tuanku_Imam_Bonjol', 'Pineleng,_Minahasa'],
  'sultan-baabullah-ternate': ['Baabullah_dari_Ternate', 'Kesultanan_Ternate'],
  'sultan-nuku-tidore': ['Nuku_dari_Tidore', 'Kesultanan_Tidore'],
  'tgkh-zainuddin-abdul-madjid': ['Muhammad_Zainuddin_Abdul_Madjid', 'Nahdlatul_Wathan'],
};

const memoryImageCache = new Map<string, string>();
const inFlightRequests = new Map<string, Promise<string>>();
let storageHydrated = false;

// Global Concurrency Queue (max 2 active requests, 150ms spacing) to prevent mobile lag & 429 rate-limits
const MAX_CONCURRENT_REQUESTS = 2;
const QUEUE_SPACING_MS = 150;
let activeRequestCount = 0;
const requestQueue: Array<() => void> = [];

function enqueueNetworkTask<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const run = () => {
      activeRequestCount++;
      fn()
        .then(resolve, reject)
        .finally(() => {
          setTimeout(() => {
            activeRequestCount = Math.max(0, activeRequestCount - 1);
            const next = requestQueue.shift();
            if (next) next();
          }, QUEUE_SPACING_MS);
        });
    };

    if (activeRequestCount < MAX_CONCURRENT_REQUESTS) {
      run();
    } else {
      requestQueue.push(run);
    }
  });
}

function hydrateCacheFromStorage(): void {
  if (storageHydrated) return;
  storageHydrated = true;
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    for (const oldKey of LEGACY_IMAGES_STORAGE_KEYS) {
      window.localStorage.removeItem(oldKey);
    }
    const raw = window.localStorage.getItem(AUTHENTIC_IMAGES_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, string>;
    if (parsed && typeof parsed === 'object') {
      for (const [key, val] of Object.entries(parsed)) {
        // Never allow /thumbs/wali-* to be hydrated for non-owner sites
        if (
          typeof val === 'string' &&
          isValidNonLogoImageUrl(val) &&
          (!val.startsWith('/thumbs/wali-') || Boolean(FIRST_12_THUMB_BY_ID[key]))
        ) {
          memoryImageCache.set(key, val);
        }
      }
    }
  } catch {
    // Ignore storage errors in private mode
  }
}

function persistImageToStorage(siteId: string, url: string): void {
  if (!siteId || !isValidNonLogoImageUrl(url)) return;
  if (url.startsWith('data:image/svg+xml')) return;
  if (url.startsWith('/thumbs/wali-') && !FIRST_12_THUMB_BY_ID[siteId]) return;
  memoryImageCache.set(siteId, url);
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current: Record<string, string> = {};
    for (const [k, v] of memoryImageCache.entries()) {
      current[k] = v;
    }
    window.localStorage.setItem(AUTHENTIC_IMAGES_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Ignore storage quota errors
  }
}

export function isValidNonLogoImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    trimmed.includes('pwa-512x512.png') ||
    trimmed.includes('pwa-192x192.png') ||
    trimmed.includes('pwa-maskable') ||
    trimmed.includes('logo-zn.svg') ||
    trimmed.includes('favicon') ||
    trimmed.includes('apple-touch-icon')
  ) {
    return false;
  }
  return true;
}

function escapeSvgText(raw: string): string {
  return String(raw || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates an Islamic Architectural Maqbarah & Calligraphy SVG illustration (`data:image/svg+xml;utf8,...`)
 * tailored with the site's own title, city, and province.
 * Used exclusively as a fallback for sites #13-#183 so we NEVER display another figure's tomb signboard
 * (such as "MAKAM SUNAN DRAJAT", Menara Kudus, or Mbah Priok's ship) and NEVER display the ZN app logo.
 */
export function createArchitecturalPlaceholderDataUri(
  site?: Partial<ZiarahSite> | null
): string {
  const rawTitle = String(site?.title || site?.name || 'Maqbarah Auliya Nusantara')
    .replace(/^Makam\s+/i, '')
    .trim();
  const displayTitle = rawTitle.length > 34 ? `${rawTitle.slice(0, 32).trim()}…` : rawTitle;
  const city = String(site?.location?.city || (site as any)?.city || 'Nusantara').trim();
  const province = String(site?.location?.province || (site as any)?.province || 'Indonesia').trim();
  const locationLine = city && province && city !== province ? `${city} • ${province}` : city || province;
  const categoryLabel = String(site?.category || 'Khazanah Maqbarah').toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="55%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#0f2922"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#f3e5ab" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="640" height="480" fill="url(#bg)"/>
  <circle cx="320" cy="195" r="165" fill="#047857" fill-opacity="0.16"/>
  <path d="M120 420 L120 250 Q120 190 175 190 L175 420 Z" fill="#065f46" fill-opacity="0.35"/>
  <path d="M465 420 L465 190 Q520 190 520 250 L520 420 Z" fill="#065f46" fill-opacity="0.35"/>
  <path d="M205 420 L205 225 Q320 95 435 225 L435 420 Z" fill="#047857" fill-opacity="0.28" stroke="url(#gold)" stroke-width="1.5"/>
  <path d="M245 420 L245 255 Q320 165 395 255 L395 420 Z" fill="#022c22" fill-opacity="0.55" stroke="#d4af37" stroke-opacity="0.4" stroke-width="1.2"/>
  <line x1="320" y1="78" x2="320" y2="112" stroke="#f3e5ab" stroke-width="2" stroke-opacity="0.8"/>
  <circle cx="320" cy="72" r="5" fill="#f3e5ab" fill-opacity="0.85"/>
  <line x1="70" y1="420" x2="570" y2="420" stroke="url(#gold)" stroke-width="1.5"/>
  <text x="320" y="150" text-anchor="middle" fill="#f3e5ab" font-family="Georgia, serif" font-size="22" opacity="0.9">مَقَامُ أَوْلِيَاءِ اللّٰهِ</text>
  <text x="320" y="182" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="3">${escapeSvgText(categoryLabel)}</text>
  <text x="320" y="315" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="21" font-weight="bold">${escapeSvgText(displayTitle)}</text>
  <text x="320" y="348" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="14" font-weight="500">${escapeSvgText(locationLine)}</text>
  <text x="320" y="395" text-anchor="middle" fill="#f3e5ab" font-family="system-ui, sans-serif" font-size="11" opacity="0.75">Arsip Cagar Budaya &amp; Maqbarah Nusantara</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns `/thumbs/wali-1.webp` .. `/thumbs/wali-12.webp` ONLY for their 12 original owner sites.
 * For all other sites (#13-#183), returns the site-specific Islamic Architectural Maqbarah SVG illustration
 * displaying the site's own title, city, and province — never another figure's tomb photo!
 */
export function getRegionalArchitecturalPhoto(
  site?: Partial<ZiarahSite> | null
): string {
  if (!site) return createArchitecturalPlaceholderDataUri(null);

  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();
  if (idKey && FIRST_12_THUMB_BY_ID[idKey]) return FIRST_12_THUMB_BY_ID[idKey];
  if (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey]) return FIRST_12_THUMB_BY_ID[legacyKey];

  return createArchitecturalPlaceholderDataUri(site);
}

function isAcceptableWikimediaImage(url?: string | null, titleOrFilename?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const lowerUrl = url.toLowerCase();
  const lowerTitle = String(titleOrFilename || '').toLowerCase();
  const combined = `${lowerUrl} ${lowerTitle}`;

  if (/\.(svg|gif|tif|tiff|pdf|djvu|ogg|ogv|webm|mp3|wav)(\?|$)/i.test(lowerUrl)) {
    return false;
  }

  const bannedKeywords = [
    'map',
    'locator',
    'location_map',
    'flag_of',
    'coat_of_arms',
    'lambang_',
    'logo',
    'signature',
    'tanda_tangan',
    'stamp',
    'prangko',
    'blank',
    'icon',
    'symbol',
    'question_book',
    'disambig',
    ' stub',
    'collectie_tropenmuseum_portret',
  ];
  for (const kw of bannedKeywords) {
    if (combined.includes(kw)) return false;
  }

  return /\.(jpe?g|png|webp)(\?|$)/i.test(lowerUrl);
}

function resizeWikimediaThumbTo800(url: string): string {
  return url.replace(/\/(\d+)px-([^/]+)$/, '/800px-$2');
}

function extractWikiTitlesFromSite(site: Partial<ZiarahSite>): string[] {
  const titles: string[] = [];
  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();

  if (idKey && SITE_WIKI_QUERY_OVERRIDES[idKey]) {
    titles.push(...SITE_WIKI_QUERY_OVERRIDES[idKey]);
  }
  if (legacyKey && SITE_WIKI_QUERY_OVERRIDES[legacyKey]) {
    titles.push(...SITE_WIKI_QUERY_OVERRIDES[legacyKey]);
  }

  if (Array.isArray(site.references)) {
    for (const ref of site.references) {
      const m = String(ref || '').match(/Wikipedia Bahasa Indonesia:\s*([^.;()\n]+)/i);
      if (m && m[1]) {
        const cleaned = m[1].trim().replace(/\s+/g, '_');
        if (cleaned && !titles.includes(cleaned)) {
          titles.push(cleaned);
        }
      }
    }
  }

  return titles;
}

async function fetchWikipediaSummaryImage(articleTitle: string): Promise<string | null> {
  try {
    const endpoint = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      articleTitle.replace(/\s+/g, '_')
    )}`;
    const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    const candidate: string | undefined = data?.thumbnail?.source || data?.originalimage?.source;
    if (candidate && isAcceptableWikimediaImage(candidate, data?.title)) {
      return resizeWikimediaThumbTo800(candidate);
    }
  } catch {
    // Ignore network errors
  }
  return null;
}

async function fetchCommonsSearchImage(query: string): Promise<string | null> {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap ${query}`
    )}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages || typeof pages !== 'object') return null;
    for (const page of Object.values(pages) as any[]) {
      const info = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : null;
      const thumbUrl: string | undefined = info?.thumburl || info?.url;
      if (thumbUrl && isAcceptableWikimediaImage(thumbUrl, page?.title)) {
        return thumbUrl;
      }
    }
  } catch {
    // Ignore network errors
  }
  return null;
}

function getPriority1DirectImage(site?: Partial<ZiarahSite> | null): string | null {
  if (!site) return null;
  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();

  // If edited by curator with a valid custom URL (including Google Maps photos), honor it immediately
  if ((site as any).editedByCurator === true && isValidNonLogoImageUrl(site.imageUrl)) {
    return String(site.imageUrl).trim();
  }

  // First 12 canonical owner sites with verified local /thumbs/wali-1.webp .. wali-12.webp
  if (idKey && FIRST_12_THUMB_BY_ID[idKey]) {
    return FIRST_12_THUMB_BY_ID[idKey];
  }
  if (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey]) {
    return FIRST_12_THUMB_BY_ID[legacyKey];
  }

  // Pre-resolved static Wikimedia Commons / Wikipedia URLs
  if (idKey && PRE_RESOLVED_AUTHENTIC_IMAGES[idKey]) {
    return PRE_RESOLVED_AUTHENTIC_IMAGES[idKey];
  }

  const rawUrl = String(site.imageUrl || '').trim();
  if (
    rawUrl.includes('lh3.googleusercontent.com') ||
    rawUrl.includes('maps.googleapis.com')
  ) {
    return rawUrl;
  }

  return null;
}

export function getInitialAuthenticSiteImage(site?: Partial<ZiarahSite> | null): string {
  if (!site) return createArchitecturalPlaceholderDataUri(null);
  hydrateCacheFromStorage();

  const p1 = getPriority1DirectImage(site);
  if (p1) return p1;

  const idKey = String(site.id || '').trim();
  if (idKey && memoryImageCache.has(idKey)) {
    return memoryImageCache.get(idKey)!;
  }

  return getRegionalArchitecturalPhoto(site);
}

export async function resolveAuthenticSiteImage(site?: Partial<ZiarahSite> | null): Promise<string> {
  if (!site) return createArchitecturalPlaceholderDataUri(null);
  hydrateCacheFromStorage();

  // Priority 1: Local /thumbs/wali-1..12.webp for first 12 owner sites, pre-resolved static map, or curator photo
  const p1 = getPriority1DirectImage(site);
  if (p1) return p1;

  const idKey = String(site.id || site.legacyId || site.name || '').trim();
  if (idKey && memoryImageCache.has(idKey)) {
    return memoryImageCache.get(idKey)!;
  }

  if (idKey && inFlightRequests.has(idKey)) {
    return inFlightRequests.get(idKey)!;
  }

  const task = enqueueNetworkTask(async (): Promise<string> => {
    // Priority 2: Wikipedia Indonesia REST Summary API (overrides + references)
    const wikiTitles = extractWikiTitlesFromSite(site);
    for (const title of wikiTitles) {
      const found = await fetchWikipediaSummaryImage(title);
      if (found) {
        persistImageToStorage(idKey, found);
        return found;
      }
    }

    // Priority 3: Wikimedia Commons Action API Search by specific figure/mosque name + city
    const cleanName = String(site.name || site.title || '')
      .replace(/\([^)]*\)/g, ' ')
      .replace(/^(makam|kompleks\s+makam|situs|petilasan)\s+/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    const city = String(site.location?.city || (site as any).city || '').trim();

    if (cleanName && city) {
      const found = await fetchCommonsSearchImage(`${cleanName} ${city}`);
      if (found) {
        persistImageToStorage(idKey, found);
        return found;
      }
    }

    // Priority 4: Bespoke Islamic Architectural Maqbarah SVG displaying site's own title, city & province
    // (Never returns another figure's tomb photo!)
    return getRegionalArchitecturalPhoto(site);
  });

  if (idKey) {
    inFlightRequests.set(idKey, task);
    task.finally(() => {
      inFlightRequests.delete(idKey);
    });
  }

  return task;
}

/**
 * React hook returning an authentic, non-logo photograph or bespoke architectural SVG for a ziarah site.
 * Supports lazy viewport resolution (`enabled` flag) so off-screen cards never trigger background network requests.
 */
export function useAuthenticSiteImage(
  site?: Partial<ZiarahSite> | null,
  enabled: boolean = true
): string {
  const [imageUrl, setImageUrl] = useState<string>(() => getInitialAuthenticSiteImage(site));

  useEffect(() => {
    if (!site) {
      setImageUrl(createArchitecturalPlaceholderDataUri(null));
      return;
    }
    const immediate = getInitialAuthenticSiteImage(site);
    setImageUrl(immediate);

    if (!enabled) {
      return;
    }

    let cancelled = false;
    resolveAuthenticSiteImage(site)
      .then((resolved) => {
        if (!cancelled && resolved && isValidNonLogoImageUrl(resolved)) {
          setImageUrl(resolved);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [site?.id, site?.legacyId, site?.imageUrl, (site as any)?.editedByCurator, enabled]);

  return imageUrl;
}

export function getSiteGoogleMapsPhotosUrl(site: Partial<ZiarahSite>): string {
  const name = String(site.name || site.title || 'Makam Waliyullah').trim();
  const city = String(site.location?.city || (site as any).city || '').trim();
  const province = String(site.location?.province || (site as any).province || '').trim();
  const q = [name, city, province].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
