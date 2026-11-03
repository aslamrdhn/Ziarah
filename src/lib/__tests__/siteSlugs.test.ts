import { describe, it, expect } from 'vitest';
import { slugifySiteText, getSiteSlug, getSitePath, findSiteByParam } from '../siteSlugs';
import { initialSites } from '../../data/initialSites';

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

  it('resolves sites by exact ID, canonical slug, or title-only slug', () => {
    const target = initialSites[0];
    expect(findSiteByParam(initialSites, target.id)?.id).toBe(target.id);
    expect(findSiteByParam(initialSites, getSiteSlug(target))?.id).toBe(target.id);
    expect(findSiteByParam(initialSites, '')).toBeNull();
  });
});
