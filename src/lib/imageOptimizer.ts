import React from 'react';

/**
 * Optimizes external Wikimedia / Unsplash image URLs using wsrv.nl CDN proxy
 * to deliver properly sized WebP images with 1-year immutable cache headers.
 */
export function optimizeSiteImageUrl(url: string | undefined, width = 640, quality = 76): string {
  if (!url) return '/pwa-512x512.png';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.includes('wsrv.nl')
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

  // Route Wikimedia and other external images through wsrv.nl WebP + 1y CDN cache
  return `https://wsrv.nl/?url=${encodeURIComponent(trimmed)}&w=${width}&q=${quality}&output=webp&maxage=1y`;
}

/**
 * Automatic fallback to raw original URL if CDN proxy is unreachable.
 */
export function handleOptimizedImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  originalUrl: string | undefined
) {
  const img = e.currentTarget;
  if (originalUrl && img.src !== originalUrl && !img.dataset.fallbackApplied) {
    img.dataset.fallbackApplied = 'true';
    img.src = originalUrl;
  }
}
