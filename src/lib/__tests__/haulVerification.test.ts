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
    expect(entries).toHaveLength(4);

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

    expect(verifiedCount).toBe(4);
    expect(unverifiedCount).toBe(179);
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

  it('closes the editedByCurator loophole: editedByCurator: true without haulVerified and https:// haulSourceUrl must return verified: false', () => {
    const sunanGiri = SITES.find((s) => s.id === 'sunan-giri')!;
    expect(sunanGiri).toBeDefined();

    // Inject editedByCurator: true (e.g. curator only edited a photo or typo) WITHOUT haulVerified & haulSourceUrl
    const editedWithoutHaulVerification = {
      ...sunanGiri,
      editedByCurator: true,
    };

    const unverifiedDisplay = getHaulDisplay(editedWithoutHaulVerification);
    expect(unverifiedDisplay.verified).toBe(false);
    expect(unverifiedDisplay.text).toBe(UNVERIFIED_HAUL_DISPLAY_TEXT);
    expect(unverifiedDisplay.text).not.toContain('24–25 Rabiul Awal');

    // Also test when haulVerified is true but haulSourceUrl is missing or not https://
    const missingSourceDisplay = getHaulDisplay({
      ...sunanGiri,
      editedByCurator: true,
      haulVerified: true,
      haulSourceUrl: '',
    });
    expect(missingSourceDisplay.verified).toBe(false);

    // Only when haulVerified === true AND haulSourceUrl starts with https:// should it be verified
    const verifiedByCurator = getHaulDisplay({
      ...sunanGiri,
      editedByCurator: true,
      haulVerified: true,
      haulSourceUrl: 'https://gresikkab.go.id/haul-sunan-giri',
      haulSourceLabel: 'Pemkab Gresik',
      haulSchedule: '24–25 Rabiul Awal (Penetapan Resmi Yayasan Makam Sunan Giri)',
    });
    expect(verifiedByCurator.verified).toBe(true);
    if (verifiedByCurator.verified) {
      expect(verifiedByCurator.text).toBe(
        '24–25 Rabiul Awal (Penetapan Resmi Yayasan Makam Sunan Giri)'
      );
      expect(verifiedByCurator.sourceUrl).toBe('https://gresikkab.go.id/haul-sunan-giri');
      expect(verifiedByCurator.sourceName).toBe('Pemkab Gresik');
    }
  });
});

