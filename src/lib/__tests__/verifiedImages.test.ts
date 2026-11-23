import { describe, it, expect } from 'vitest';
import verifiedSiteImages from '../../data/verifiedSiteImages.json';
import localPhotoProvenance from '../../data/localPhotoProvenance.json';
import { SITES } from '../../data/sites';
import {
  FIRST_12_THUMB_BY_ID,
  BANNED_PHOTO_SUBSTRINGS,
  REQUIRED_HERITAGE_KEYWORDS,
  WHITELISTED_HISTORICAL_PORTRAIT_TOKENS,
  isFirst12OwnerSite,
  isValidPhotoUrl,
  getInitialAuthenticSiteImage,
  getSitePhotoAttribution,
  getVerifiedLocalPhotoProvenance,
} from '../authenticSiteImages';

describe('Strict Heritage Image Verification', () => {
  it('verifies all entries in verifiedSiteImages.json pass strict heritage & anti-junk rules and include non-Unknown, non-fair-use author/license metadata', () => {
    const entries = Object.entries(
      verifiedSiteImages as Record<string, string | { url: string; author: string; license: string }>
    );
    expect(entries.length).toBeGreaterThanOrEqual(12);

    for (const [key, rawEntry] of entries) {
      const url = typeof rawEntry === 'string' ? rawEntry : rawEntry.url;
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);

      expect(typeof rawEntry).toBe('object');
      if (typeof rawEntry === 'object' && rawEntry !== null) {
        expect(typeof rawEntry.author).toBe('string');
        expect(rawEntry.author.trim().length).toBeGreaterThan(1);
        expect(
          /unknown/i.test(rawEntry.author),
          `Entry "${key}" must not have "Unknown" author ("${rawEntry.author}")`
        ).toBe(false);

        expect(typeof rawEntry.license).toBe('string');
        expect(rawEntry.license.trim().length).toBeGreaterThan(1);
        expect(
          /fair[\s_-]*use|penggunaan\s+wajar/i.test(rawEntry.license),
          `Entry "${key}" must not use fair-use license ("${rawEntry.license}")`
        ).toBe(false);
      }

      let decodedLower = url.toLowerCase();
      try {
        decodedLower = decodeURIComponent(url).toLowerCase();
      } catch {
        // ignore
      }

      for (const banned of BANNED_PHOTO_SUBSTRINGS) {
        expect(
          decodedLower.includes(banned),
          `Entry "${key}" URL "${url}" must not contain banned substring "${banned}"`
        ).toBe(false);
      }

      expect(
        isValidPhotoUrl(url),
        `Entry "${key}" URL "${url}" failed isValidPhotoUrl`
      ).toBe(true);

      if (
        url.startsWith('https://upload.wikimedia.org/') ||
        url.startsWith('https://thumb.wikimedia.org/')
      ) {
        expect(url.includes('utm_source')).toBe(false);
        const filenameOnly = decodedLower.split('/').pop()?.split('?')[0] || decodedLower;
        const matchesHeritage = REQUIRED_HERITAGE_KEYWORDS.some((kw) =>
          filenameOnly.includes(kw)
        );
        const matchesPortrait = WHITELISTED_HISTORICAL_PORTRAIT_TOKENS.some((tok) =>
          filenameOnly.includes(tok)
        );
        expect(
          matchesHeritage || matchesPortrait,
          `Wikimedia file "${filenameOnly}" for "${key}" lacks heritage/whitelisted keyword`
        ).toBe(true);
      }
    }
  });

  it('enforces fail-safe on /thumbs/wali-1..12.webp based on localPhotoProvenance.json and keeps them exclusive to the first 12 owner sites', () => {
    expect(SITES.length).toBe(183);

    const provMap = localPhotoProvenance as Record<
      string,
      { status: string; author: string; license: string; sourceUrl: string; note: string }
    >;

    for (let i = 0; i < SITES.length; i++) {
      const site = SITES[i];
      const img = getInitialAuthenticSiteImage(site);
      expect(isValidPhotoUrl(img)).toBe(true);

      if (i < 12) {
        expect(isFirst12OwnerSite(site)).toBe(true);
        const thumbFile = `wali-${i + 1}.webp`;
        const verifiedLocal = getVerifiedLocalPhotoProvenance(thumbFile);
        if (verifiedLocal) {
          expect(img).toBe(`/thumbs/${thumbFile}`);
        } else {
          expect(img.startsWith('data:image/svg+xml')).toBe(true);
        }
      } else {
        expect(isFirst12OwnerSite(site)).toBe(false);
        expect(img.startsWith('/thumbs/wali-')).toBe(false);
        expect(img.includes('pwa-512x512.png')).toBe(false);
        expect(img.includes('logo-zn.svg')).toBe(false);
      }
    }

    // Verify local attribution never fabricates project name unless explicitly set in localPhotoProvenance.json
    for (let i = 0; i < 12; i++) {
      const site = SITES[i];
      const thumbFile = `wali-${i + 1}.webp`;
      const provEntry = provMap[thumbFile];
      const attr = getSitePhotoAttribution(site, `/thumbs/${thumbFile}`);

      if (getVerifiedLocalPhotoProvenance(thumbFile)) {
        expect(attr.kind).toBe('local_archive');
        expect(attr.isDomeSvg).toBe(false);
        expect(attr.author).toBe(provEntry.author);
        expect(attr.license).toBe(provEntry.license);
      } else {
        expect(attr.kind).toBe('dome_svg');
        expect(attr.isDomeSvg).toBe(true);
        expect(attr.author).toBeNull();
        expect(attr.license).toBeNull();
      }
    }

    // Verify temporarily marking one entry as "terverifikasi" with a single license enables the photo and exact credit
    const originalWali1 = { ...provMap['wali-1.webp'] };
    try {
      provMap['wali-1.webp'].status = 'terverifikasi';
      provMap['wali-1.webp'].author = 'Fotografer Uji Coba';
      provMap['wali-1.webp'].license = 'CC BY-SA 4.0';
      provMap['wali-1.webp'].sourceUrl = 'https://commons.wikimedia.org/wiki/File:Test.jpg';

      const restoredUrl = getInitialAuthenticSiteImage(SITES[0]);
      expect(restoredUrl).toBe('/thumbs/wali-1.webp');
      const restoredAttr = getSitePhotoAttribution(SITES[0], restoredUrl);
      expect(restoredAttr.kind).toBe('local_archive');
      expect(restoredAttr.isDomeSvg).toBe(false);
      expect(restoredAttr.author).toBe('Fotografer Uji Coba');
      expect(restoredAttr.license).toBe('CC BY-SA 4.0');
      expect(restoredAttr.sourceUrl).toBe('https://commons.wikimedia.org/wiki/File:Test.jpg');
      expect(restoredAttr.formattedAttribution).toBe('Foto: Fotografer Uji Coba (CC BY-SA 4.0)');

      // Reject dual/alternative license containing " / "
      provMap['wali-1.webp'].license = 'Domain Publik / CC BY-SA';
      expect(getVerifiedLocalPhotoProvenance('wali-1.webp')).toBeNull();
      expect(getInitialAuthenticSiteImage(SITES[0]).startsWith('data:image/svg+xml')).toBe(true);
    } finally {
      Object.assign(provMap['wali-1.webp'], originalWali1);
    }

    // Also verify verifiedSiteImages.json never assigns /thumbs/wali-* to non-owner keys
    for (const [key, rawEntry] of Object.entries(
      verifiedSiteImages as Record<string, string | { url: string; author: string; license: string }>
    )) {
      const url = typeof rawEntry === 'string' ? rawEntry : rawEntry.url;
      if (url.startsWith('/thumbs/wali-')) {
        const ownerSite = SITES.slice(0, 12).find(
          (s) => s.id === key || s.legacyId === key || key.includes(s.id.split('-')[0])
        );
        expect(ownerSite || FIRST_12_THUMB_BY_ID[key]).toBeTruthy();
      }
    }
  });

  it('stores non-empty author and license attribution metadata for all non-placeholder photos and falls back to Golden Dome SVG when unverified', () => {
    let wikimediaCount = 0;
    let localArchiveCount = 0;
    let domeSvgCount = 0;

    const provMap = localPhotoProvenance as Record<
      string,
      { status: string; author: string; license: string }
    >;

    for (const site of SITES) {
      const resolvedUrl = getInitialAuthenticSiteImage(site);
      const attr = getSitePhotoAttribution(site, resolvedUrl);

      if (!attr.isDomeSvg) {
        expect(Boolean(attr.author && attr.author.trim().length > 0)).toBe(true);
        expect(Boolean(attr.license && attr.license.trim().length > 0)).toBe(true);
      }

      if (attr.kind === 'dome_svg') {
        domeSvgCount++;
        expect(attr.isDomeSvg).toBe(true);
        expect(attr.url).toBeNull();
        expect(attr.author).toBeNull();
        expect(attr.license).toBeNull();
        expect(attr.formattedAttribution).toBe(
          "Ilustrasi Arsitektur Maqbarah Ziarah Nusantara — gunakan tombol 'Lihat Foto Asli Lokasi di Google Maps' untuk dokumentasi lokasi terkini."
        );
      } else if (attr.kind === 'wikimedia') {
        wikimediaCount++;
        expect(attr.isDomeSvg).toBe(false);
        expect(attr.isWikimediaPhoto).toBe(true);
        expect(Boolean(attr.author && attr.author.length > 1)).toBe(true);
        expect(Boolean(attr.license && attr.license.length > 1)).toBe(true);
        expect(attr.formattedAttribution).toContain('via Wikimedia Commons');
      } else if (attr.kind === 'local_archive') {
        localArchiveCount++;
        expect(attr.isDomeSvg).toBe(false);
        const fileKey = (attr.url || '').replace(/^\/thumbs\//, '');
        expect(attr.author).toBe(provMap[fileKey]?.author);
        expect(attr.license).toBe(provMap[fileKey]?.license);
        if (!provMap[fileKey]?.author.includes('Ziarah Nusantara')) {
          expect(attr.author).not.toContain('Ziarah Nusantara');
        }
      }
    }

    expect(wikimediaCount).toBe(74);
    expect(localArchiveCount).toBe(10);
    expect(domeSvgCount).toBe(99);
  });

  it('rejects copyright icons, bupati/mayor portraits, birds, bridges, tourists, Earth globes, and ZN logos', () => {
    const badSamples = [
      'https://upload.wikimedia.org/wikipedia/commons/e/e0/Copyright_icon.svg',
      'https://upload.wikimedia.org/wikipedia/commons/1/11/©_Fair_use_warning.png',
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Bupati_Bangkalan_PDUB.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Wali_Kota_Pekalongan.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Blue_Marble_Earth.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/d/d4/Lovebird_in_cage.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e5/Jembatan_Kretek_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Female_tourist_selfie.jpg',
      '/pwa-512x512.png',
      '/logo-zn.svg',
    ];

    for (const url of badSamples) {
      expect(isValidPhotoUrl(url), `Should reject "${url}"`).toBe(false);
    }

    expect(
      isValidPhotoUrl(
        'https://upload.wikimedia.org/wikipedia/commons/4/4a/Masjid_Caringin_%287%29.jpg'
      )
    ).toBe(true);
    expect(
      isValidPhotoUrl(
        'https://upload.wikimedia.org/wikipedia/commons/1/10/Makam_Syekh_Jumadil_Kubro.jpg'
      )
    ).toBe(true);
  });
});

