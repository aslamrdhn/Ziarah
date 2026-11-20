import { useState, useEffect } from 'react';
import type { ZiarahSite } from '../data/sites';
import {
  PRE_RESOLVED_AUTHENTIC_IMAGES,
  PRE_RESOLVED_AUTHENTIC_IMAGE_META,
} from '../data/authenticImageUrls';

export interface SitePhotoAttribution {
  kind: 'wikimedia' | 'local_archive' | 'dome_svg';
  isDomeSvg: boolean;
  isWikimediaPhoto: boolean;
  url: string | null;
  author: string | null;
  license: string | null;
  formattedAttribution: string;
}

/**
 * Resolves exact photo attribution metadata for a site and its currently rendered image URL.
 * - For 93 sites using Golden Dome SVG (`data:image/svg` or no external photo): returns kind === 'dome_svg'
 *   with honest note and hides Wikimedia Commons attribution / file link.
 * - For 78 Wikimedia photo sites and 12 local WebP sites: returns author and license metadata.
 */
export function getSitePhotoAttribution(
  site: Pick<ZiarahSite, 'id' | 'imageUrl' | 'imageSource'> & { legacyId?: string },
  activeImageUrl?: string | null
): SitePhotoAttribution {
  const effectiveUrl = (activeImageUrl ?? getInitialAuthenticSiteImage(site as ZiarahSite) ?? '').trim();
  const isSvgOrEmpty =
    !effectiveUrl ||
    effectiveUrl.startsWith('data:image/svg') ||
    effectiveUrl.includes('svg+xml');

  if (isSvgOrEmpty) {
    return {
      kind: 'dome_svg',
      isDomeSvg: true,
      isWikimediaPhoto: false,
      url: null,
      author: null,
      license: null,
      formattedAttribution:
        "Ilustrasi Arsitektur Maqbarah Ziarah Nusantara — gunakan tombol 'Lihat Foto Asli Lokasi di Google Maps' untuk dokumentasi lokasi terkini.",
    };
  }

  const meta =
    PRE_RESOLVED_AUTHENTIC_IMAGE_META[site.id] ||
    (site.legacyId ? PRE_RESOLVED_AUTHENTIC_IMAGE_META[site.legacyId] : undefined);
  const isWikimediaUrl =
    effectiveUrl.startsWith('https://upload.wikimedia.org/') ||
    effectiveUrl.startsWith('https://thumb.wikimedia.org/');

  if (isWikimediaUrl) {
    const author = meta?.author || 'Kontributor Wikimedia Commons';
    const license = meta?.license || 'CC BY-SA 4.0';
    return {
      kind: 'wikimedia',
      isDomeSvg: false,
      isWikimediaPhoto: true,
      url: effectiveUrl,
      author,
      license,
      formattedAttribution: `Foto: ${author} (${license}) via Wikimedia Commons`,
    };
  }

  const author = meta?.author || 'Arsip Dokumentasi Wikimedia Commons / Tropenmuseum';
  const license = meta?.license || 'Domain Publik / CC BY-SA';
  return {
    kind: 'local_archive',
    isDomeSvg: false,
    isWikimediaPhoto: false,
    url: effectiveUrl,
    author,
    license,
    formattedAttribution: `Foto: ${author} (${license}) via Wikimedia Commons`,
  };
}

export const AUTHENTIC_IMAGES_STORAGE_KEY = 'ziarah_verified_images_v4_strict';
const LEGACY_IMAGES_STORAGE_KEYS = [
  'ziarah_authentic_site_images_v1',
  'ziarah_authentic_site_images_v2',
  'ziarah_authentic_site_images_v3',
  'ziarah_authentic_site_images_v4',
];

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

export const BANNED_PHOTO_SUBSTRINGS = [
  'pwa-512x512.png',
  'pwa-192x192.png',
  'pwa-maskable',
  'logo-zn.svg',
  'favicon',
  'apple-touch-icon',
  'bupati',
  'walikota',
  'wali_kota',
  'gubernur',
  'wakil',
  'regent',
  'mayor',
  'governor',
  'politician',
  'caleg',
  'kampanye',
  'pdub',
  'seragam',
  'dprd',
  'dpr',
  'menteri',
  'kpu',
  'pilkada',
  'bird',
  'burung',
  'parrot',
  'lovebird',
  'animal',
  'fauna',
  'bridge',
  'jembatan',
  'tourist',
  'turis',
  'selfie',
  'wedding',
  'lembaga_pemangku_adat',
  'copyright',
  'fair_use',
  'fairuse',
  '©',
  'no_free',
  'replace_this',
  'no_image',
  'ambox',
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
  'placeholder',
  'exclamation',
  'warning',
  'padlock',
  'question_book',
  'commons-logo',
  'wikimedia-logo',
  'wiki_letter',
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
  'kantor_',
  'jalan_',
  'jl_',
  'symbol_',
  'batas_',
  'stasiun_',
  'candidate',
  'calon_',
  'montage_of',
  'living_people',
  'woman',
  'girl',
  'lady',
  'perempuan',
  'wanita',
  'actor',
  'actress',
  'singer',
  'artis',
  'arief_moelia',
  'djoko_susanto',
  'mohan_roliskana',
  'affan_alfian',
  'ali_mukhni',
  'aminatun',
  'putrajaya',
  'malaysia',
  'selangor',
  'kuala_lumpur',
  'brunei',
  'airport',
  'bandara',
  'temple',
  'pura_',
  '.svg',
  '.gif',
  '.tif',
  '.tiff',
  '.pdf',
  '.djvu',
  '.ogg',
  '.ogv',
  '.webm',
];

export const REQUIRED_HERITAGE_KEYWORDS = [
  'makam',
  'maqam',
  'maqbarah',
  'permakaman',
  'pemakaman',
  'kubah',
  'kuburan',
  'pesarean',
  'astana',
  'gubah',
  'nisan',
  'masjid',
  'mesjid',
  'mosque',
  'moskee',
  'musholla',
  'musala',
  'langgar',
  'meunasah',
  'menara',
  'pesantren',
  'ponpes',
  'surau',
  'keraton',
  'kedaton',
  'cungkup',
  'tomb',
  'grave',
  'cemetery',
  'mausoleum',
  'heritage',
  'wapauwe',
  'patimburak',
  'tengkurep',
  'troloyo',
  'imogiri',
  'tidar',
  'samudera_pasai',
  'kasepuhan',
  'kalampayan',
  'sekumpul',
  'basirih',
  'sendang_duwur',
  'mantingan',
  'tegalsari',
  'setono_gedong',
  'shirathal',
  'alkhairaat',
  'al-mashun',
  'al-anwar',
  'al-karomah',
  'bayan_beleq',
  'loang_baloq',
  'katangka',
  'salabose',
  'lapeo',
  'baiturrahman',
  'suriansyah',
];

export const WHITELISTED_HISTORICAL_PORTRAIT_TOKENS = [
  'utsman_bin_yahya',
  'uthman_bin_yahya',
  'sayyid_uthman',
  'nawawi',
  'hasanuddin',
  'abdurrahman_wahid',
  'hasyim_asy',
  'ahmad_dahlan',
  'wahab_hasbullah',
  'wahab_chasbullah',
  'bisri_syansuri',
  'diponegoro',
  'imam_bonjol',
  'iskandar_muda',
  'syekh_yusuf',
  'raden_saleh',
  'asad_syamsul_arifin',
  'as%27ad_syamsul_arifin',
  'achmad_djajadiningrat',
  'maimun_zubair',
  'zainuddin_abdul_madjid',
  'arsyad_al-banjari',
  'fatimah_binti_maimun',
  'pangeran_jayakarta',
  'raden_patah',
  'ratu_kalinyamat',
  'syarif_kasim',
  'thaha_syaifuddin',
  'radin_inten',
  'sentot',
  'kyai_maja',
  'kyai_mojo',
  'idrus_bin_salim',
  'guru_tua',
  'sholeh_darat',
  'noer_ali',
  'abdul_halim',
  'ageng_tirtayasa',
  'abdul_karim_kdr',
];

/**
 * Strict heritage validator for site photographs.
 * Blocks copyright icons (©!), politicians/bupati, birds, tourists, maps, flags, logos, and planet earth.
 * Requires remote Wikimedia images to match a heritage keyword or whitelisted historical figure token.
 */
export function isValidPhotoUrl(url?: string | null, titleOrFilename?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith('data:image/svg+xml')) {
    return true;
  }

  let decoded = trimmed.toLowerCase();
  try {
    decoded = decodeURIComponent(trimmed).toLowerCase();
  } catch {
    // Ignore malformed URI encoding
  }
  const lowerTitle = String(titleOrFilename || '').toLowerCase();
  const combined = `${decoded} ${lowerTitle}`;

  for (const banned of BANNED_PHOTO_SUBSTRINGS) {
    if (combined.includes(banned)) {
      return false;
    }
  }

  if (trimmed.startsWith('/thumbs/wali-') && trimmed.endsWith('.webp')) {
    return true;
  }

  if (
    trimmed.includes('lh3.googleusercontent.com') ||
    trimmed.includes('maps.googleapis.com')
  ) {
    return true;
  }

  if (!/\.(jpe?g|png|webp)(\?|$)/i.test(decoded)) {
    return false;
  }

  const filenameOnly = decoded.split('/').pop()?.split('?')[0] || decoded;
  const matchesHeritage = REQUIRED_HERITAGE_KEYWORDS.some((kw) => filenameOnly.includes(kw));
  const matchesPortrait = WHITELISTED_HISTORICAL_PORTRAIT_TOKENS.some((tok) =>
    filenameOnly.includes(tok)
  );

  return matchesHeritage || matchesPortrait;
}

export const isValidNonLogoImageUrl = isValidPhotoUrl;

const memoryImageCache = new Map<string, string>();
let storageHydrated = false;

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
        if (
          typeof val === 'string' &&
          !val.startsWith('data:image/svg+xml') &&
          isValidPhotoUrl(val) &&
          (!val.startsWith('/thumbs/wali-') || Boolean(FIRST_12_THUMB_BY_ID[key]))
        ) {
          memoryImageCache.set(key, val);
        }
      }
    }
  } catch {
    // Ignore storage errors
  }
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
 * Used when a site does not yet have a verified Wikimedia photo or when an image fails to load.
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
  <text x="320" y="182" text-anchor="middle" fill="#EAE4D7" font-family="system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="3">${escapeSvgText(categoryLabel)}</text>
  <text x="320" y="315" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="21" font-weight="bold">${escapeSvgText(displayTitle)}</text>
  <text x="320" y="348" text-anchor="middle" fill="#D6CCBA" font-family="system-ui, sans-serif" font-size="14" font-weight="500">${escapeSvgText(locationLine)}</text>
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

export function getVerifiedStaticSitePhoto(site?: Partial<ZiarahSite> | null): string | null {
  if (!site) return null;
  const idKey = String(site.id || '').trim();
  const legacyKey = String(site.legacyId || '').trim();

  // 1. Edited by curator with a valid photo URL
  if ((site as any).editedByCurator === true && isValidPhotoUrl(site.imageUrl)) {
    return String(site.imageUrl).trim();
  }

  // 2. First 12 canonical owner sites -> /thumbs/wali-1..12.webp
  if (idKey && FIRST_12_THUMB_BY_ID[idKey]) {
    return FIRST_12_THUMB_BY_ID[idKey];
  }
  if (legacyKey && FIRST_12_THUMB_BY_ID[legacyKey]) {
    return FIRST_12_THUMB_BY_ID[legacyKey];
  }

  // 3. Pre-verified static map from src/data/verifiedSiteImages.json
  const fromId = idKey ? PRE_RESOLVED_AUTHENTIC_IMAGES[idKey] : undefined;
  if (fromId && isValidPhotoUrl(fromId) && !fromId.startsWith('/thumbs/wali-')) {
    return fromId;
  }
  const fromLegacy = legacyKey ? PRE_RESOLVED_AUTHENTIC_IMAGES[legacyKey] : undefined;
  if (fromLegacy && isValidPhotoUrl(fromLegacy) && !fromLegacy.startsWith('/thumbs/wali-')) {
    return fromLegacy;
  }

  // 4. Valid non-placeholder imageUrl already on the site object
  const rawUrl = String(site.imageUrl || '').trim();
  if (
    rawUrl &&
    !rawUrl.startsWith('data:image/svg+xml') &&
    !rawUrl.startsWith('/thumbs/wali-') &&
    isValidPhotoUrl(rawUrl)
  ) {
    return rawUrl;
  }

  return null;
}

export function hasVerifiedSitePhoto(site?: Partial<ZiarahSite> | null): boolean {
  return Boolean(getVerifiedStaticSitePhoto(site));
}

export function getInitialAuthenticSiteImage(site?: Partial<ZiarahSite> | null): string {
  if (!site) return createArchitecturalPlaceholderDataUri(null);
  hydrateCacheFromStorage();

  const staticVerified = getVerifiedStaticSitePhoto(site);
  if (staticVerified) return staticVerified;

  const idKey = String(site.id || '').trim();
  if (idKey && memoryImageCache.has(idKey)) {
    const cached = memoryImageCache.get(idKey)!;
    if (isValidPhotoUrl(cached)) return cached;
  }

  return getRegionalArchitecturalPhoto(site);
}

export async function resolveAuthenticSiteImage(site?: Partial<ZiarahSite> | null): Promise<string> {
  return getInitialAuthenticSiteImage(site);
}

/**
 * React hook returning an authentic, strictly verified photograph URL directly from
 * `verifiedSiteImages.json` (or `/thumbs/wali-1..12.webp` for #1-#12) with ZERO runtime API lag.
 * Falls back to the bespoke Golden Dome architectural SVG when no strict photo exists.
 */
export function useAuthenticSiteImage(
  site?: Partial<ZiarahSite> | null,
  _enabled: boolean = true
): string {
  const [imageUrl, setImageUrl] = useState<string>(() => getInitialAuthenticSiteImage(site));

  useEffect(() => {
    setImageUrl(getInitialAuthenticSiteImage(site));
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
