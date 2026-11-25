import { describe, it, expect } from 'vitest';
import {
  ZIARAH_CORRIDORS,
  resolveCorridorSites,
} from '../../data/ziarahCorridors';
import { ziarahSites } from '../../data/sites';
import { getHaulDisplay } from '../haulVerification';

describe('ZIARAH_CORRIDORS integrity & haulVerification compliance', () => {
  it('defines 3 verified ziarah corridors with valid recommendedDonationAmount', () => {
    expect(ZIARAH_CORRIDORS).toHaveLength(3);
    for (const corridor of ZIARAH_CORRIDORS) {
      expect([20000, 30000]).toContain(corridor.recommendedDonationAmount);
      expect(corridor.siteIds.length).toBeGreaterThanOrEqual(9);
    }
  });

  it('resolves every siteId in all 3 corridors to a real ZiarahSite with >= 1 verified reference', () => {
    for (const corridor of ZIARAH_CORRIDORS) {
      const resolved = resolveCorridorSites(corridor, ziarahSites);
      expect(resolved).toHaveLength(corridor.siteIds.length);

      for (const item of resolved) {
        expect(item.site.id).toBeTruthy();
        expect(item.referencesCount).toBeGreaterThanOrEqual(1);
        expect(item.googleMapsUrl).toContain('https://www.google.com/maps/search/?api=1&query=');
      }
    }
  });

  it('always uses getHaulDisplay(site) for haulDisplay and never leaks unverified raw haul dates', () => {
    for (const corridor of ZIARAH_CORRIDORS) {
      const resolved = resolveCorridorSites(corridor, ziarahSites);
      for (const item of resolved) {
        expect(item.haulDisplay).toBe(getHaulDisplay(item.site).text);
      }
    }
  });
});
