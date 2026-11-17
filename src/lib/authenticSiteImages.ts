import { useState, useEffect } from 'react';
import type { ZiarahSite } from '../data/sites';

export const AUTHENTIC_IMAGES_STORAGE_KEY = 'ziarah_authentic_site_images_v2';

const FIRST_12_THUMB_BY_ID: Record<string, string> = {
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

export const SITE_WIKI_QUERY_OVERRIDES: Record<string, string[]> = {
  'sultan-maulana-hasanuddin': ['Masjid_Agung_Banten', 'Maulana_Hasanuddin_dari_Banten', 'Kesultanan_Banten'],
  'auliya-1': ['Masjid_Agung_Banten', 'Maulana_Hasanuddin_dari_Banten', 'Kesultanan_Banten'],
  'habib-utsman-bin-yahya': ['Utsman_bin_Yahya', 'Masjid_Jami_Al-Abidin'],
  'habib-12': ['Utsman_bin_Yahya', 'Masjid_Jami_Al-Abidin'],
  'pangeran-jayakarta': ['Pangeran_Jayakarta', 'Masjid_Assalafiyah'],
  'auliya-2': ['Pangeran_Jayakarta', 'Masjid_Assalafiyah'],
  'guru-marzuki-cipinang': ['Ahmad_Marzuki_bin_Mirshod', 'Masjid_Jami_Al-Marzuqiyah', 'Jatinegara,_Jakarta_Timur'],
  'ulama-12': ['Ahmad_Marzuki_bin_Mirshod', 'Masjid_Jami_Al-Marzuqiyah', 'Jatinegara,_Jakarta_Timur'],
  'habib-kuncung-kalibata': [
    'Rawajati,_Pancoran,_Jakarta_Selatan',
    'Kalibata,_Pancoran,_Jakarta_Selatan',
    'Alwi_bin_Thahir_al-Haddad',
  ],
  'habib-4': [
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
  'sultan-maulana-yusuf-banten': ['Maulana_Yusuf_dari_Banten', 'Kesultanan_Banten'],
  'syekh-nawawi-al-bantani': ['Nawawi_al-Bantani', 'Tanara,_Serang'],
  'syaichona-kholil-bangkalan': ['Kholil_al-Bangkalani', 'Kabupaten_Bangkalan'],
  'kh-hasyim-asyari-tebuireng': ['Hasyim_Asy%27ari', 'Pondok_Pesantren_Tebuireng'],
  'gus-dur-tebuireng': ['Abdurrahman_Wahid', 'Pondok_Pesantren_Tebuireng'],
  'kh-abdul-karim-lirboyo': ['Abdul_Karim_(ulama)', 'Pondok_Pesantren_Lirboyo'],
  'syekh-abdurrauf-as-singkili': ['Abdurrauf_as-Singkili', 'Masjid_Raya_Baiturrahman'],
  'sultan-malikussaleh-aceh': ['Malikussaleh', 'Kesultanan_Samudera_Pasai'],
  'syekh-burhanuddin-ulakan': ['Burhanuddin_Ulakan', 'Ulakan_Tapakis,_Padang_Pariaman'],
  'datu-kelampayan-martapura': ['Muhammad_Arsyad_al-Banjari', 'Martapura,_Banjar'],
  'guru-sekumpul-martapura': ['Muhammad_Zaini_Abdul_Ghani', 'Martapura,_Banjar'],
  'syekh-yusuf-al-makassari': ['Yusuf_al-Makassari', 'Kabupaten_Gowa'],
  'sultan-hasanuddin-gowa': ['Sultan_Hasanuddin', 'Kompleks_Makam_Sultan_Hasanuddin'],
  'guru-tua-palu': ['Idrus_bin_Salim_al-Jufri', 'Alkhairaat'],
  'kyai-mojo-tondano': ['Kyai_Maja', 'Tondano'],
  'tuanku-imam-bonjol-minahasa': ['Tuanku_Imam_Bonjol', 'Pineleng,_Minahasa'],
  'sultan-baabullah-ternate': ['Baabullah_dari_Ternate', 'Kesultanan_Ternate'],
  'sultan-nuku-tidore': ['Nuku_dari_Tidore', 'Kesultanan_Tidore'],
  'tgkh-zainuddin-abdul-madjid': ['Muhammad_Zainuddin_Abdul_Madjid', 'Nahdlatul_Wathan'],
};

const memoryImageCache = new Map<string, string>();
const inFlightRequests = new Map<string, Promise<string>>();
let storageHydrated = false;

function hydrateCacheFromStorage(): void {
  if (storageHydrated) return;
  storageHydrated = true;
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const raw = window.localStorage.getItem(AUTHENTIC_IMAGES_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, string>;
    if (parsed && typeof parsed === 'object') {
      for (const [key, val] of Object.entries(parsed)) {
        if (typeof val === 'string' && isValidNonLogoImageUrl(val)) {
          memoryImageCache.set(key, val);
        }
      }
    }
  } catch {
    // Ignore storage errors in private mode or crawler environments
  }
}

function persistImageToStorage(siteId: string, url: string): void {
  if (!siteId || !isValidNonLogoImageUrl(url)) return;
  memoryImageCache.set(siteId, url);
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current: Record<string, string> = {};
    for (const [k, v] of memoryImageCache.entries()) {
      current[k] = v;
    }
    window.localStorage.setItem(AUTHENTIC_IMAGES_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Ignore quota or storage restriction errors
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

function hashStringDeterministically(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

/**
 * Deterministic architectural photo fallback using real maqbarah/masjid photographs
 * in /public/thumbs/wali-1.webp .. /thumbs/wali-12.webp (never /pwa-512x512.png).
 */
export function getRegionalArchitecturalPhoto(
  site?: Partial<Pick<ZiarahSite, 'id' | 'legacyId' | 'name' | 'category'>> | null
): string {
  if (!site) return '/thumbs/wali-1.webp';

  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();
  if (idKey && FIRST_12_THUMB_BY_ID[idKey]) return FIRST_12_THUMB_BY_ID[idKey];
  if (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey]) return FIRST_12_THUMB_BY_ID[legacyKey];

  const seed = idKey || legacyKey || String(site.name || 'wali-1');
  const h = hashStringDeterministically(seed);
  const category = String(site.category || '').toLowerCase();

  if (category.includes('walisongo') || category.includes('wali songo')) {
    const pool = [
      '/thumbs/wali-1.webp',
      '/thumbs/wali-2.webp',
      '/thumbs/wali-3.webp',
      '/thumbs/wali-4.webp',
      '/thumbs/wali-5.webp',
      '/thumbs/wali-6.webp',
      '/thumbs/wali-7.webp',
      '/thumbs/wali-8.webp',
      '/thumbs/wali-9.webp',
    ];
    return pool[h % pool.length];
  }

  if (category.includes('habaib') || category.includes('habib')) {
    const pool = ['/thumbs/wali-10.webp', '/thumbs/wali-11.webp', '/thumbs/wali-12.webp'];
    return pool[h % pool.length];
  }

  if (category.includes('ulama')) {
    const pool = ['/thumbs/wali-2.webp', '/thumbs/wali-5.webp', '/thumbs/wali-6.webp'];
    return pool[h % pool.length];
  }

  if (category.includes('sultan') || category.includes('raja') || category.includes('auliya')) {
    const pool = ['/thumbs/wali-4.webp', '/thumbs/wali-7.webp', '/thumbs/wali-9.webp'];
    return pool[h % pool.length];
  }

  const allPool = [
    '/thumbs/wali-1.webp',
    '/thumbs/wali-2.webp',
    '/thumbs/wali-4.webp',
    '/thumbs/wali-5.webp',
    '/thumbs/wali-6.webp',
    '/thumbs/wali-7.webp',
    '/thumbs/wali-8.webp',
    '/thumbs/wali-9.webp',
    '/thumbs/wali-10.webp',
    '/thumbs/wali-11.webp',
    '/thumbs/wali-12.webp',
  ];
  return allPool[h % allPool.length];
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
    )}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
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

async function fetchCommonsGeosearchImage(lat: number, lng: number): Promise<string | null> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return null;
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=10000&ggsnamespace=6&ggslimit=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
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

  // First 12 canonical sites with verified local /thumbs/wali-1.webp .. wali-12.webp
  if (idKey && FIRST_12_THUMB_BY_ID[idKey]) {
    return FIRST_12_THUMB_BY_ID[idKey];
  }
  if (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey]) {
    return FIRST_12_THUMB_BY_ID[legacyKey];
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
  if (!site) return '/thumbs/wali-1.webp';
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
  if (!site) return '/thumbs/wali-1.webp';
  hydrateCacheFromStorage();

  // Priority 1: Local /thumbs/wali-1..12.webp for first 12 sites or curator-verified photo
  const p1 = getPriority1DirectImage(site);
  if (p1) return p1;

  const idKey = String(site.id || site.legacyId || site.name || '').trim();
  if (idKey && memoryImageCache.has(idKey)) {
    return memoryImageCache.get(idKey)!;
  }

  if (idKey && inFlightRequests.has(idKey)) {
    return inFlightRequests.get(idKey)!;
  }

  const task = (async (): Promise<string> => {
    // Priority 2: Wikipedia Indonesia REST Summary API (overrides + references)
    const wikiTitles = extractWikiTitlesFromSite(site);
    for (const title of wikiTitles) {
      const found = await fetchWikipediaSummaryImage(title);
      if (found) {
        persistImageToStorage(idKey, found);
        return found;
      }
    }

    // Priority 3: Wikimedia Commons Action API Search (filetype:bitmap, origin=*)
    const cleanName = String(site.name || site.title || '')
      .replace(/\([^)]*\)/g, ' ')
      .replace(/^(makam|kompleks\s+makam|situs|petilasan)\s+/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    const city = String(site.location?.city || (site as any).city || '').trim();
    const province = String(site.location?.province || (site as any).province || '').trim();

    const searchQueries: string[] = [];
    if (cleanName && city) searchQueries.push(`${cleanName} ${city}`);
    if (city && province) searchQueries.push(`Masjid ${city} ${province}`);

    for (const q of searchQueries) {
      const found = await fetchCommonsSearchImage(q);
      if (found) {
        persistImageToStorage(idKey, found);
        return found;
      }
    }

    // Priority 4: Wikimedia Commons Geosearch by authentic GPS coordinates
    const lat = Number(site.location?.lat ?? (site as any).coords?.[0] ?? 0);
    const lng = Number(site.location?.lng ?? (site as any).coords?.[1] ?? 0);
    const geoFound = await fetchCommonsGeosearchImage(lat, lng);
    if (geoFound) {
      persistImageToStorage(idKey, geoFound);
      return geoFound;
    }

    return getRegionalArchitecturalPhoto(site);
  })();

  if (idKey) {
    inFlightRequests.set(idKey, task);
    task.finally(() => {
      inFlightRequests.delete(idKey);
    });
  }

  return task;
}

/**
 * React hook returning an authentic, non-logo photograph URL for a ziarah site.
 * Immediately returns local /thumbs/wali-1..12.webp or cached Wikimedia photo,
 * and resolves live Wikipedia/Wikimedia Commons photos asynchronously for sites #13-#183.
 */
export function useAuthenticSiteImage(site?: Partial<ZiarahSite> | null): string {
  const [imageUrl, setImageUrl] = useState<string>(() => getInitialAuthenticSiteImage(site));

  useEffect(() => {
    if (!site) {
      setImageUrl('/thumbs/wali-1.webp');
      return;
    }
    const immediate = getInitialAuthenticSiteImage(site);
    setImageUrl(immediate);

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
  }, [site?.id, site?.legacyId, site?.imageUrl, (site as any)?.editedByCurator]);

  return imageUrl;
}

export function getSiteGoogleMapsPhotosUrl(site: Partial<ZiarahSite>): string {
  const name = String(site.name || site.title || 'Makam Waliyullah').trim();
  const city = String(site.location?.city || (site as any).city || '').trim();
  const province = String(site.location?.province || (site as any).province || '').trim();
  const q = [name, city, province].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
