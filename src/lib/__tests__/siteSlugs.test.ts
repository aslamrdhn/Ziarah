import { describe, it, expect } from 'vitest';
import { slugifySiteText, getSiteSlug, getSitePath, findSiteByParam } from '../siteSlugs';
import { initialSites } from '../../data/initialSites';
import { ziarahSites } from '../../data/sites';
import { matchesEmotionalIntent } from '../../views/DaftarMakam';
import { FALLBACK_MUNAJAT_ITEMS } from '../transferProof';
// @ts-ignore
import { extractSitesFromSource } from '../../../scripts/vercel-postbuild.mjs';

describe('Site SEO Slug Generation & Route Resolution', () => {
  it('generates clean canonical slugs without parenthetical noise or duplicate city names', () => {
    expect(slugifySiteText('Makam Sunan Ampel (Raden Rahmat)')).toBe('makam-sunan-ampel');
    const sampleSite = {
      id: 'wali-2',
      title: 'Makam Sunan Ampel (Raden Rahmat)',
      location: { city: 'Surabaya', province: 'Jawa Timur', address: '', lat: 0, lng: 0 },
    };
    expect(getSiteSlug(sampleSite)).toBe('makam-sunan-ampel-surabaya');
    expect(getSitePath(sampleSite)).toBe('/situs/makam-sunan-ampel-surabaya');
  });

  it('resolves sites by exact ID, canonical slug, or pre-apostrophe legacy slug', () => {
    const target = initialSites[0];
    expect(findSiteByParam(initialSites, target.id)?.id).toBe(target.id);
    expect(findSiteByParam(initialSites, getSiteSlug(target))?.id).toBe(target.id);
    expect(findSiteByParam(initialSites, '')).toBeNull();

    // Resolves AGH. Muhammad As'ad by both full canonical slug and legacy pre-apostrophe slug
    expect(findSiteByParam(ziarahSites, 'agh-muhammad-as-ad-wajo')?.id).toBe('ulama-39');
    expect(findSiteByParam(ziarahSites, 'agh-muhammad-as-wajo')?.id).toBe('ulama-39');
  });

  it('extracts all 96 sites in vercel-postbuild.mjs without apostrophe truncation or <!--more--> leakage', () => {
    const extracted = extractSitesFromSource();
    expect(extracted.length).toBeGreaterThanOrEqual(96);

    const asadSite = extracted.find((s: any) => s.id === 'ulama-39');
    expect(asadSite).toBeDefined();
    expect(asadSite.title).toContain("AGH. Muhammad As'ad");
    expect(asadSite.description).toContain("As'adiyah Sengkang");
    expect(asadSite.history).toContain("As'adiyah");

    for (const s of extracted) {
      expect(s.description).not.toContain('<!--more-->');
      expect(s.history).not.toContain('<!--more-->');
    }
  });

  it('filters emotional intents into distinct, non-100% subsets and keeps FALLBACK_MUNAJAT_ITEMS empty', () => {
    const keteduhanCount = ziarahSites.filter((s) => matchesEmotionalIntent(s, 'keteduhan')).length;
    const ikhtiarCount = ziarahSites.filter((s) => matchesEmotionalIntent(s, 'ikhtiar')).length;
    const keteguhanCount = ziarahSites.filter((s) => matchesEmotionalIntent(s, 'keteguhan')).length;
    const ilmuCount = ziarahSites.filter((s) => matchesEmotionalIntent(s, 'ilmu')).length;

    expect(keteduhanCount).toBeGreaterThan(5);
    expect(keteduhanCount).toBeLessThan(ziarahSites.length);
    expect(ikhtiarCount).toBeGreaterThan(5);
    expect(ikhtiarCount).toBeLessThan(ziarahSites.length);
    expect(keteguhanCount).toBeGreaterThan(5);
    expect(keteguhanCount).toBeLessThan(ziarahSites.length);
    expect(ilmuCount).toBeGreaterThan(5);
    expect(ilmuCount).toBeLessThan(ziarahSites.length);

    expect(FALLBACK_MUNAJAT_ITEMS).toEqual([]);
  });
});

