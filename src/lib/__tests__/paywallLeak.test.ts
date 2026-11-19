import { describe, expect, it } from 'vitest';
import { SITES } from '../../data/sites';
import {
  buildSiteRootHtml,
  buildRubrikRootHtml,
  getPublicTeaserOnly,
  formatMakamHeading,
  // @ts-expect-error — importing ESM postbuild script for unit testing
} from '../../../scripts/vercel-postbuild.mjs';
import { getSiteSlug } from '../siteSlugs';

describe('Static Prerender Paywall Security & Heading Hygiene Audit', () => {
  it('truncates any string at <!--more--> in getPublicTeaserOnly', () => {
    const sample = 'Bagian pembuka publik yang menggugah hati.<!--more-->Bagian rahasia di balik paywall Rp 10.000.';
    expect(getPublicTeaserOnly(sample)).toBe('Bagian pembuka publik yang menggugah hati.');
    expect(getPublicTeaserOnly(sample)).not.toContain('Bagian rahasia');
  });

  it('never leaks post-<!--more--> karomah or untoldStory content in buildSiteRootHtml across all 183 sites', () => {
    for (const site of SITES) {
      const karomahJoined = Array.isArray(site.karomah)
        ? site.karomah.join('\n\n')
        : String(site.karomah || '');
      const siteForPrerender = {
        id: site.id,
        slug: getSiteSlug(site),
        name: site.name,
        title: site.title,
        category: site.category,
        description: site.description,
        history: site.history,
        address: site.location.address,
        city: site.location.city,
        province: site.location.province,
        era: site.era || '',
        sanad: site.sanad || '',
        karomah: karomahJoined,
        untoldStory: site.untoldStory || '',
      };

      const html = buildSiteRootHtml(siteForPrerender);

      // Ensure no duplicate "Makam Makam" in prerendered HTML
      expect(html, `Site ${site.id} should not contain "Makam Makam"`).not.toMatch(/Makam\s+Makam/i);

      if (karomahJoined && karomahJoined.includes('<!--more-->')) {
        const secretKaromah = karomahJoined.split('<!--more-->')[1]?.trim() || '';
        const secretProbe = secretKaromah.slice(0, 45).trim();
        if (secretProbe.length >= 20) {
          expect(
            html,
            `Site ${site.id} leaked locked karomah after <!--more--> in static HTML`
          ).not.toContain(secretProbe);
        }
      }

      if (site.untoldStory && site.untoldStory.includes('<!--more-->')) {
        const secretUntold = site.untoldStory.split('<!--more-->')[1]?.trim() || '';
        const secretProbe = secretUntold.slice(0, 45).trim();
        if (secretProbe.length >= 20) {
          expect(
            html,
            `Site ${site.id} leaked locked untoldStory after <!--more--> in static HTML`
          ).not.toContain(secretProbe);
        }
      }
    }
  });

  it('never leaks post-<!--more--> content in buildRubrikRootHtml()', () => {
    const rubrikHtml = buildRubrikRootHtml();
    expect(rubrikHtml).not.toContain('<!--more-->');
    expect(rubrikHtml).not.toMatch(/Makam\s+Makam/i);

    for (const site of SITES.slice(0, 30)) {
      if (site.untoldStory && site.untoldStory.includes('<!--more-->')) {
        const secretUntold = site.untoldStory.split('<!--more-->')[1]?.trim() || '';
        const secretProbe = secretUntold.slice(0, 45).trim();
        if (secretProbe.length >= 20) {
          expect(
            rubrikHtml,
            `Rubrik HTML leaked locked untoldStory for ${site.id}`
          ).not.toContain(secretProbe);
        }
      }
    }
  });

  it('formats headings without duplicating Makam prefix', () => {
    expect(formatMakamHeading('Sunan Ampel')).toBe('Makam Sunan Ampel');
    expect(formatMakamHeading('Makam Sultan Babullah Ternate')).toBe('Makam Sultan Babullah Ternate');
    expect(formatMakamHeading('Kompleks Makam Raja-Raja Mataram Imogiri')).toBe(
      'Kompleks Makam Raja-Raja Mataram Imogiri'
    );
  });

  it('ensures SiteDetails.tsx locked branches never render blurred full prayers or post-<!--more--> text into the DOM', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const siteDetailsPath = path.resolve(process.cwd(), 'src/components/SiteDetails.tsx');
    const source = fs.readFileSync(siteDetailsPath, 'utf8');

    // Must not use CSS blur-[6px] or blur-[5px] paywall bypass in SiteDetails.tsx
    expect(source).not.toContain('blur-[6px]');
    expect(source).not.toContain('blur-[5px]');
    expect(source).not.toContain('cliffhanger.remainder');
    expect(source).not.toContain('untoldCliffhanger.remainder');

    // Must include the 5 Bagian Kitab Amalan checklist and honest free-vs-operational affirmation in the locked branch
    expect(source).toContain('5 BAGIAN KITAB AMALAN YANG TERBUKA PENUH');
    expect(source).toContain(
      'Bacaan Yasin, Tahlil &amp; Salam Ahli Kubur tetap 100% gratis di menu Panduan. Infaq Rp 2.000 adalah dukungan operasional penyusunan lembar amalan khusus per maqbarah &amp; fitur cetak PDF.'
    );

    // Must include the 4 Bagian Khazanah & Tadabbur checklist and open Konteks Jaringan Dakwah preview
    expect(source).toContain('4 BAGIAN KHAZANAH &amp; TADABBUR YANG TERBUKA PENUH');
    expect(source).toContain('Konteks Jaringan Dakwah &amp; Sanad Sejarah');
  });
});
