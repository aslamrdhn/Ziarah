import { describe, it, expect } from 'vitest';
import { ziarahSites } from '../../data/sites';
import {
  buildStructuredTawassul,
  getCanonicalWasilahPrayers,
  buildDeepTadabburAndContext,
  detectWasilahTheme,
} from '../premiumKitabEnrichment';

describe('Kitab Amalan & Tadabbur Berlapis Bebas-Halusinasi (183 Situs)', () => {
  it('memvalidasi 4 simpul Silsilah Hadiah Al-Fatihah untuk seluruh 183 situs tanpa huruf Latin pada teks Arab', () => {
    expect(ziarahSites.length).toBeGreaterThanOrEqual(183);

    for (const site of ziarahSites) {
      const nodes = buildStructuredTawassul(site);
      expect(nodes).toHaveLength(4);
      expect(nodes.map((n) => n.order)).toEqual([1, 2, 3, 4]);

      for (const node of nodes) {
        expect(node.arabic.length).toBeGreaterThan(20);
        expect(node.arabic).not.toMatch(/[a-zA-Z]/);
        expect(node.latin.length).toBeGreaterThan(15);
        expect(node.translation.length).toBeGreaterThan(15);
      }

      // Simpul ke-3 wajib menyebut nama & kota situs secara spesifik
      const cleanName = site.name.replace(/Raden\s+Prawoto/gi, 'Raden Umar Said (Sunan Muria)');
      expect(nodes[2].recipientSummary).toContain(cleanName.slice(0, 12));
      expect(nodes[2].recipientSummary).toContain(site.location.city);
    }
  });

  it('memvalidasi 3 rangkaian ayat Al-Qur’an & Doa Nabawi Sahih dengan rujukan eksplisit dan teks Arab murni untuk seluruh situs', () => {
    const allowedTargets = new Set([3, 7, 11, 33]);

    for (const site of ziarahSites) {
      const prayers = getCanonicalWasilahPrayers(site);
      expect(prayers).toHaveLength(3);

      for (const prayer of prayers) {
        expect(prayer.title.length).toBeGreaterThan(8);
        expect(prayer.sourceCitation).toMatch(/(Al-Qur['’]an|QS\.|HR\.)/);
        expect(prayer.arabic.length).toBeGreaterThan(15);
        expect(prayer.arabic).not.toMatch(/[a-zA-Z]/);
        expect(prayer.latin.length).toBeGreaterThan(12);
        expect(prayer.translation.length).toBeGreaterThan(15);
        expect(prayer.kaifiyah.length).toBeGreaterThan(20);
        expect(allowedTargets.has(prayer.targetCount)).toBe(true);
      }
    }
  });

  it('mendeteksi seluruh 5 tema wasilah secara akurat (kesembuhan, rezeki, ilmu, keteguhan negeri, ketenangan/taubat)', () => {
    const base = ziarahSites[0];

    expect(
      detectWasilahTheme({
        ...base,
        barokahHajat: 'Peziarah bertawassul memohon kesembuhan dari penyakit menahun dan kesehatan keluarga.',
      }).key
    ).toBe('kesembuhan');

    expect(
      detectWasilahTheme({
        ...base,
        barokahHajat: 'Bertawassul memohon kelancaran perniagaan, kelapangan rezeki halal, dan lepas dari hutang.',
      }).key
    ).toBe('rezeki');

    expect(
      detectWasilahTheme({
        ...base,
        barokahHajat: 'Para santri memohon keberkahan ilmu pesantren, kelancaran hafalan Al-Quran, dan keturunan shalih.',
      }).key
    ).toBe('ilmu_keluarga');

    expect(
      detectWasilahTheme({
        ...base,
        barokahHajat: 'Memohon keteguhan iman, amanah kepemimpinan yang adil, serta keselamatan negeri.',
      }).key
    ).toBe('keteguhan_negeri');

    expect(
      detectWasilahTheme({
        ...base,
        barokahHajat: 'Memohon ketenangan batin, keikhlasan taubat, dan mahabbah kepada Rasulullah SAW.',
        description: 'Tokoh dakwah dan pengajar tauhid yang tawadhu.',
        history: 'Beliau dikenal membimbing masyarakat dengan kelembutan budi pekerti.',
      }).key
    ).toBe('ketenangan_taubat');
  });

  it('membangun Konteks Sanad Sejarah & 3 Butir Muhasabah faktual tanpa halusinasi karomah untuk seluruh situs', () => {
    for (const site of ziarahSites) {
      const ctx = buildDeepTadabburAndContext(site);
      expect(ctx.dakwahNetworkSummary).toContain(site.location.city);
      expect(ctx.dakwahNetworkSummary).toContain(site.location.province);
      expect(ctx.factualDetails.region).toBe(`${site.location.city}, ${site.location.province}`);
      expect(ctx.muhasabahPoints).toHaveLength(3);
      expect(ctx.muhasabahPoints.map((p) => p.number)).toEqual([1, 2, 3]);
      expect(ctx.muhasabahPoints[0].title).toContain('QS. Yunus');
      for (const pt of ctx.muhasabahPoints) {
        expect(pt.body.length).toBeGreaterThan(60);
      }
    }
  });
});
