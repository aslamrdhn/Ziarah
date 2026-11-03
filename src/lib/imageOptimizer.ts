import React from 'react';

/**
 * Converts Wikimedia Commons & Unsplash URLs to their official native resized thumbnail URLs
 * so images load fast without relying on blocked/rate-limited third-party proxies.
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
  if (trimmed.startsWith('/') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return undefined;
  }
  const w330 = optimizeSiteImageUrl(trimmed, 330, quality);
  const w500 = optimizeSiteImageUrl(trimmed, 500, quality);
  if (w330 === w500) return undefined;
  return `${w330} 330w, ${w500} 500w`;
}

/**
 * Two-stage fallback:
 * 1) If resized thumbnail URL returns 404 (e.g., original Wikimedia image is smaller than 500px),
 *    immediately load the original URL so the real photo always appears.
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



