import { describe, it, expect } from 'vitest';
import verifiedSiteImages from '../../data/verifiedSiteImages.json';
import { SITES } from '../../data/sites';
import {
  FIRST_12_THUMB_BY_ID,
  BANNED_PHOTO_SUBSTRINGS,
  REQUIRED_HERITAGE_KEYWORDS,
  WHITELISTED_HISTORICAL_PORTRAIT_TOKENS,
  isFirst12OwnerSite,
  isValidPhotoUrl,
  getInitialAuthenticSiteImage,
} from '../authenticSiteImages';

describe('Strict Heritage Image Verification', () => {
  it('verifies all entries in verifiedSiteImages.json pass strict heritage & anti-junk rules', () => {
    const entries = Object.entries(verifiedSiteImages as Record<string, string>);
    expect(entries.length).toBeGreaterThanOrEqual(12);

    for (const [key, url] of entries) {
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);

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

  it('keeps /thumbs/wali-1..12.webp exclusive to the first 12 owner sites', () => {
    expect(SITES.length).toBe(183);

    for (let i = 0; i < SITES.length; i++) {
      const site = SITES[i];
      const img = getInitialAuthenticSiteImage(site);
      expect(isValidPhotoUrl(img)).toBe(true);

      if (i < 12) {
        expect(isFirst12OwnerSite(site)).toBe(true);
        expect(img).toBe(`/thumbs/wali-${i + 1}.webp`);
      } else {
        expect(isFirst12OwnerSite(site)).toBe(false);
        expect(img.startsWith('/thumbs/wali-')).toBe(false);
        expect(img.includes('pwa-512x512.png')).toBe(false);
        expect(img.includes('logo-zn.svg')).toBe(false);
      }
    }

    // Also verify verifiedSiteImages.json never assigns /thumbs/wali-* to non-owner keys
    for (const [key, url] of Object.entries(verifiedSiteImages as Record<string, string>)) {
      if (url.startsWith('/thumbs/wali-')) {
        const ownerSite = SITES.slice(0, 12).find(
          (s) => s.id === key || s.legacyId === key || key.includes(s.id.split('-')[0])
        );
        expect(ownerSite || FIRST_12_THUMB_BY_ID[key]).toBeTruthy();
      }
    }
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
