import { describe, it, expect } from 'vitest';
import {
  HAUL_VERIFICATION,
  UNVERIFIED_HAUL_DISPLAY_TEXT,
  getHaulDisplay,
} from '../../data/haulVerification';
import { SITES } from '../../data/sites';
import {
  selectFeaturedHaulSite,
  formatCompactHaulSummary,
} from '../../views/DaftarMakam';

describe('Haul Verification & Display Rules', () => {
  it('ensures every HAUL_VERIFICATION entry has https:// sourceUrl and non-empty displaySchedule', () => {
    const entries = Object.entries(HAUL_VERIFICATION);
    expect(entries).toHaveLength(3);

    for (const [key, entry] of entries) {
      expect(entry.status).toBe('terverifikasi');
      expect(entry.displaySchedule.trim().length, `Empty displaySchedule for ${key}`).toBeGreaterThan(0);
      expect(entry.sourceName.trim().length, `Empty sourceName for ${key}`).toBeGreaterThan(0);
      expect(
        entry.sourceUrl.startsWith('https://'),
        `sourceUrl for ${key} must start with https://`
      ).toBe(true);
    }
  });

  it('returns verified schedule for the 3 verified sites and never exposes raw site.haulSchedule for unverified sites', () => {
    let verifiedCount = 0;
    let unverifiedCount = 0;

    for (const site of SITES) {
      const display = getHaulDisplay(site);
      const isInMap = Boolean(
        HAUL_VERIFICATION[site.id] || (site.legacyId && HAUL_VERIFICATION[site.legacyId])
      );

      if (isInMap) {
        verifiedCount++;
        expect(display.verified).toBe(true);
        if (display.verified) {
          expect(display.text.length).toBeGreaterThan(0);
          expect(display.sourceUrl.startsWith('https://')).toBe(true);
          expect(display.sourceName.length).toBeGreaterThan(0);
        }
      } else {
        unverifiedCount++;
        expect(display.verified).toBe(false);
        expect(display.text).toBe(UNVERIFIED_HAUL_DISPLAY_TEXT);
        if (site.haulSchedule && site.haulSchedule !== UNVERIFIED_HAUL_DISPLAY_TEXT) {
          expect(display.text).not.toBe(site.haulSchedule);
        }
      }
    }

    expect(verifiedCount).toBe(3);
    expect(unverifiedCount).toBe(180);
  });

  it('selects featuredHaulSite strictly from verified sites and formats compact haul summary without stray periods', () => {
    const featured = selectFeaturedHaulSite(SITES);
    expect(featured).not.toBeNull();
    expect(getHaulDisplay(featured).verified).toBe(true);

    // Unverified-only list must return null
    const unverifiedOnly = SITES.filter((s) => !getHaulDisplay(s).verified);
    expect(selectFeaturedHaulSite(unverifiedOnly)).toBeNull();

    for (const site of SITES) {
      const summary = formatCompactHaulSummary(site);
      expect(summary.shortName.endsWith('.')).toBe(false);
      expect(summary.shortSchedule.endsWith(' .')).toBe(false);
      expect(/[,;:\s]\.$/.test(summary.shortSchedule)).toBe(false);
    }
  });
});
