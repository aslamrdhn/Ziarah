import { describe, it, expect } from 'vitest';
import { MUNAJAT_7_MALAM } from '../../data/munajat7Malam';
import { ziarahSites } from '../../data/sites';

const FORBIDDEN_KLENIK_TERMS = [
  'pesugihan',
  'penglaris',
  'pasti kaya',
  'dijamin lunas',
  'ilmu kebal',
];

describe('MUNAJAT_7_MALAM data integrity & anti-hallucination', () => {
  it('contains exactly 7 sequential nights (day 1 to 7)', () => {
    expect(MUNAJAT_7_MALAM).toHaveLength(7);
    const days = MUNAJAT_7_MALAM.map((item) => item.day);
    expect(days).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('has non-empty arabic, latin, translation, sourceRef, reflection, and actionStep without ellipsis in arabic', () => {
    for (const item of MUNAJAT_7_MALAM) {
      expect(item.title.trim().length).toBeGreaterThan(5);
      expect(item.arabic.trim().length).toBeGreaterThan(5);
      expect(item.arabic).not.toContain('...');
      expect(item.latin.trim().length).toBeGreaterThan(5);
      expect(item.translation.trim().length).toBeGreaterThan(10);
      expect(item.sourceRef.trim().length).toBeGreaterThan(4);
      expect(item.reflection.trim().length).toBeGreaterThan(40);
      expect(item.actionStep.trim().length).toBeGreaterThan(15);
    }
  });

  it('does not contain any forbidden klenik or instant-wealth promises', () => {
    for (const item of MUNAJAT_7_MALAM) {
      const combined = `${item.title} ${item.translation} ${item.reflection} ${item.actionStep}`.toLowerCase();
      for (const term of FORBIDDEN_KLENIK_TERMS) {
        expect(combined).not.toContain(term);
      }
    }
  });

  it('references only valid relatedSiteId entries that exist in local ziarahSites catalog', () => {
    const validSiteIds = new Set(ziarahSites.map((s) => s.id));
    for (const item of MUNAJAT_7_MALAM) {
      expect(validSiteIds.has(item.relatedSiteId)).toBe(true);
    }
  });
});
