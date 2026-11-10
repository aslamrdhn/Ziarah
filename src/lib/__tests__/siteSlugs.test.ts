import { describe, it, expect } from 'vitest';
import { slugifySiteText, getSiteSlug, getSitePath, findSiteByParam } from '../siteSlugs';
import { initialSites } from '../../data/initialSites';
import { ziarahSites, getSourceClassificationLabel } from '../../data/sites';
import { matchesEmotionalIntent } from '../../views/DaftarMakam';
import { FALLBACK_MUNAJAT_ITEMS } from '../transferProof';
import { extractCoordinatesFromMapsUrl } from '../../views/AdminKurator';
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

  it('rejects arbitrary prefix slugs and ambiguous alternative slugs', () => {
    // Prefix slug must not match first site starting with "makam-sunan"
    expect(findSiteByParam(ziarahSites, 'makam-sunan')).toBeNull();
    expect(findSiteByParam(ziarahSites, 'sunan')).toBeNull();

    // Ambiguous alternative title slug shared by 2 sites must return null
    const duplicateAltSites = [
      {
        ...initialSites[0],
        id: 'habib-ali-kwitang',
        title: 'Makam Habib Ali Al-Habsyi',
        location: { ...initialSites[0].location, city: 'Jakarta Pusat' },
      },
      {
        ...initialSites[0],
        id: 'habib-ali-solo',
        title: 'Makam Habib Ali Al-Habsyi',
        location: { ...initialSites[0].location, city: 'Surakarta' },
      },
    ];
    expect(findSiteByParam(duplicateAltSites, 'makam-habib-ali-al-habsyi')).toBeNull();
    // Canonical slug with city still resolves uniquely
    expect(findSiteByParam(duplicateAltSites, 'makam-habib-ali-al-habsyi-jakarta-pusat')?.id).toBe('habib-ali-kwitang');
    expect(findSiteByParam(duplicateAltSites, 'makam-habib-ali-al-habsyi-surakarta')?.id).toBe('habib-ali-solo');
  });

  it('extracts valid Indonesian coordinates from Google Maps URLs and formats source classifications', () => {
    expect(extractCoordinatesFromMapsUrl('https://www.google.com/maps/@-7.2285,112.7397,17z')).toEqual({
      lat: -7.2285,
      lng: 112.7397,
    });
    expect(extractCoordinatesFromMapsUrl('https://maps.google.com/?q=-6.8945,110.6376')).toEqual({
      lat: -6.8945,
      lng: 110.6376,
    });
    // Out-of-bounds coordinates outside Indonesia return null
    expect(extractCoordinatesFromMapsUrl('https://www.google.com/maps/@48.8566,2.3522,15z')).toBeNull();
    expect(extractCoordinatesFromMapsUrl('')).toBeNull();

    expect(getSourceClassificationLabel('inskripsi_primer')).toBe('Inskripsi & Sumber Primer');
    expect(getSourceClassificationLabel('tradisi_lisan')).toBe('Riwayat Tradisi Lisan');
    expect(getSourceClassificationLabel(undefined, 'catatan_sejarah')).toBe('Catatan Sejarah & Literatur');
  });
});

