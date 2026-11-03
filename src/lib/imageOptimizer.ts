import React from 'react';

/**
 * Local first-party WebP thumbnails (/public/thumbs/*.webp, 480x360, ~10-45 KiB each)
 * for the 12 initial above-the-fold homepage cards.
 * Keyed by original Wikimedia URL so that if an Admin Curator replaces a site's photo in Firestore,
 * the custom photo URL will automatically take precedence.
 */
const LOCAL_THUMB_BY_URL: Record<string, string> = {
  'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg':
    '/thumbs/wali-1.webp',
  'https://upload.wikimedia.org/wikipedia/commons/1/1f/Makam_Sunan_Ampel.jpg':
    '/thumbs/wali-2.webp',
  'https://upload.wikimedia.org/wikipedia/commons/2/20/Sunan_Bonang-BW.png':
    '/thumbs/wali-3.webp',
  'https://upload.wikimedia.org/wikipedia/commons/1/1c/Makam_Sunan_Drajat_Lamongan.jpg':
    '/thumbs/wali-4.webp',
  'https://upload.wikimedia.org/wikipedia/commons/e/e6/Masjid_Menara_Kudus_Tampak_Depan.jpg':
    '/thumbs/wali-5.webp',
  'https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg':
    '/thumbs/wali-6.webp',
  'https://upload.wikimedia.org/wikipedia/commons/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg':
    '/thumbs/wali-7.webp',
  'https://upload.wikimedia.org/wikipedia/commons/3/3f/Wisata_Religi.jpg':
    '/thumbs/wali-8.webp',
  'https://upload.wikimedia.org/wikipedia/commons/e/e8/Entrance_to_Makam_Sunan_Gunung_Jati.jpg':
    '/thumbs/wali-9.webp',
  'https://upload.wikimedia.org/wikipedia/commons/d/d6/Habib_ali_kwitang.jpg':
    '/thumbs/habib-1.webp',
  'https://upload.wikimedia.org/wikipedia/commons/9/98/COLLECTIE_TROPENMUSEUM_Moskee_Luar_Batang_%28Batavia%29_TMnr_60046455.jpg':
    '/thumbs/habib-2.webp',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/COLLECTIE_TROPENMUSEUM_De_haven_van_Tandjoengpriok_op_de_achtergrond_het_station_Batavia_Java_TMnr_10008011.jpg':
    '/thumbs/habib-3.webp',
};

/**
 * Converts Wikimedia Commons & Unsplash URLs to fast resized thumbnails.
 * Uses local first-party WebP thumbnails (/thumbs/*.webp) for the 12 initial homepage cards
 * when width <= 600, eliminating Wikimedia 429 rate-limits and passing PageSpeed cache/image audits.
 */
export function optimizeSiteImageUrl(url: string | undefined, width = 500, quality = 75): string {
  if (!url) return '/pwa-512x512.png';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  if (width <= 600 && LOCAL_THUMB_BY_URL[trimmed]) {
    return LOCAL_THUMB_BY_URL[trimmed];
  }

  if (trimmed.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(trimmed);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(quality));
      parsed.searchParams.set('fm', 'webp');
      return parsed.toString();
    } catch {
      return trimmed;
    }
  }

  // Native Wikimedia Commons / Wikipedia thumbnail CDN:
  // https://upload.wikimedia.org/wikipedia/commons/c/ca/File.jpg
  // -> https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/File.jpg/500px-File.jpg
  const wikiMatch = trimmed.match(
    /^https?:\/\/upload\.wikimedia\.org\/wikipedia\/(commons|id|en)\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)$/i
  );
  if (wikiMatch) {
    const [, repo, h1, h2, filename] = wikiMatch;
    if (!/\.(svg|gif|tif|tiff)$/i.test(filename)) {
      const bucketWidth = width <= 380 ? 330 : width <= 600 ? 500 : 800;
      return `https://upload.wikimedia.org/wikipedia/${repo}/thumb/${h1}/${h2}/${filename}/${bucketWidth}px-${filename}`;
    }
  }

  return trimmed;
}

export function getSiteImageSrcSet(url: string | undefined, quality = 75): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    Boolean(LOCAL_THUMB_BY_URL[trimmed])
  ) {
    return undefined;
  }
  const w330 = optimizeSiteImageUrl(trimmed, 330, quality);
  const w500 = optimizeSiteImageUrl(trimmed, 500, quality);
  if (w330 === w500) return undefined;
  return `${w330} 330w, ${w500} 500w`;
}

/**
 * Two-stage fallback:
 * 1) If local/resized thumbnail URL fails, immediately load the original Wikimedia/remote URL.
 * 2) Only if the original URL itself is unreachable, fall back to the app icon.
 */
export function handleOptimizedImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  originalUrl?: string
) {
  const img = e.currentTarget;
  img.removeAttribute('srcset');

  if (originalUrl && !img.dataset.fallbackOriginal && img.src !== originalUrl) {
    img.dataset.fallbackOriginal = 'true';
    img.src = originalUrl;
    return;
  }

  if (!img.dataset.fallbackFinal) {
    img.dataset.fallbackFinal = 'true';
    img.src = '/pwa-512x512.png';
  }
}
