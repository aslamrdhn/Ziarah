import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITES } from '../../data/sites';
import { getSiteSlug } from '../siteSlugs';
import {
  extractSitesFromSource,
  buildPetaRootHtml,
  buildDoaRootHtml,
  buildDonasiRootHtml,
  buildKurasiRootHtml,
  buildPanduanRootHtml,
  buildRubrikRootHtml,
  buildSiteRootHtml,
  buildRouteJsonLd,
  renderCustomHtml,
// @ts-expect-error postbuild script is an untyped ESM module
} from '../../../scripts/vercel-postbuild.mjs';

describe('Technical SEO, Prerendering & Canonical Slug Integrity', () => {
  it('ensures extractSitesFromSource() matches all 183 canonical slugs and coordinates in SITES', () => {
    const extracted = extractSitesFromSource() as Array<{
      id: string;
      slug: string;
      lat: number;
      lng: number;
    }>;

    expect(extracted).toHaveLength(183);

    const uniqueSlugs = new Set<string>();
    for (const site of SITES) {
      const expectedSlug = getSiteSlug(site);
      const found = extracted.find((e) => e.id === site.id);
      expect(found, `Missing site ${site.id} in extractSitesFromSource()`).toBeDefined();
      expect(found?.slug, `Slug mismatch for ${site.id}`).toBe(expectedSlug);
      expect(typeof found?.lat).toBe('number');
      expect(typeof found?.lng).toBe('number');
      expect(found?.lat !== 0 || found?.lng !== 0).toBe(true);
      uniqueSlugs.add(expectedSlug);
    }
    expect(uniqueSlugs.size).toBe(183);
  });

  it('generates distinct prerendered HTML content for all 6 main menu routes and site pages', () => {
    const htmlBlocks = [
      buildPanduanRootHtml(),
      buildDoaRootHtml(),
      buildPetaRootHtml(),
      buildRubrikRootHtml(),
      buildDonasiRootHtml(),
      buildKurasiRootHtml(),
    ];

    for (const block of htmlBlocks) {
      expect(block).toContain('<main id="seo-prerender-shell"');
      expect(block).not.toContain('undefined');
      expect(block.length).toBeGreaterThan(400);
    }

    // All 6 route HTML bodies must be strictly unique
    expect(new Set(htmlBlocks).size).toBe(6);

    const baseHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
    const extracted = extractSitesFromSource() as any[];
    const sampleSite = extracted[0];

    const siteHtml = renderCustomHtml(baseHtml, {
      loc: `https://ziarahnusantara.my.id/situs/${sampleSite.slug}`,
      canonicalLoc: `https://ziarahnusantara.my.id/situs/${sampleSite.slug}`,
      path: `/situs/${sampleSite.slug}`,
      title: `${sampleSite.title} — Ziarah Nusantara`,
      description: sampleSite.description,
      site: sampleSite,
      bodyHtml: buildSiteRootHtml(sampleSite),
    });

    expect(siteHtml).toContain(
      `<link rel="canonical" id="canonical-link" href="https://ziarahnusantara.my.id/situs/${sampleSite.slug}" />`
    );

    const jsonLdMatch = siteHtml.match(
      /<script type="application\/ld\+json" id="schema-jsonld">([\s\S]*?)<\/script>/
    );
    expect(jsonLdMatch).not.toBeNull();
    const parsed = JSON.parse(jsonLdMatch![1]);
    const types = parsed['@graph'].flatMap((n: any) =>
      Array.isArray(n['@type']) ? n['@type'] : [n['@type']]
    );
    expect(types).toContain('Place');
    expect(types).toContain('LandmarksOrHistoricalBuildings');
    expect(types).toContain('BreadcrumbList');

    const placeNode = parsed['@graph'].find((n: any) =>
      Array.isArray(n['@type'])
        ? n['@type'].includes('Place')
        : n['@type'] === 'Place'
    );
    expect(placeNode.geo?.['@type']).toBe('GeoCoordinates');
    expect(placeNode.geo?.latitude).toBe(sampleSite.lat);
    expect(placeNode.geo?.longitude).toBe(sampleSite.lng);
    expect(placeNode.address?.['@type']).toBe('PostalAddress');
  });

  it('verifies index.html WebSite/Organization schema and clean logo alt attributes', () => {
    const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
    const jsonLdMatch = indexHtml.match(
      /<script type="application\/ld\+json" id="schema-jsonld">([\s\S]*?)<\/script>/
    );
    expect(jsonLdMatch).not.toBeNull();
    const graph = JSON.parse(jsonLdMatch![1])['@graph'];

    const website = graph.find((n: any) => n['@type'] === 'WebSite');
    expect(website?.name).toBe('Ziarah Nusantara');
    expect(website?.url).toBe('https://ziarahnusantara.my.id/');
    expect(website?.alternateName).toEqual([
      'Portal Ziarah Nusantara',
      'Direktori Makam Wali Nusantara',
    ]);

    const org = graph.find((n: any) => n['@type'] === 'Organization');
    expect(org?.name).toBe('Ziarah Nusantara');
    expect(org?.url).toBe('https://ziarahnusantara.my.id/');
    expect(org?.logo).toBe('https://ziarahnusantara.my.id/pwa-512x512.png');

    // Header/Footer/Editorial logos must use alt="" and aria-hidden="true" and never leak "Logo Resmi"
    const navbarSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf8');
    const appSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/App.tsx'), 'utf8');
    const homeSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/views/DaftarMakam.tsx'), 'utf8');
    for (const srcContent of [navbarSrc, appSrc, homeSrc]) {
      expect(srcContent).not.toContain('Logo Resmi');
      expect(srcContent).toContain('alt=""');
      expect(srcContent).toContain('aria-hidden="true"');
    }

    // Verify buildRouteJsonLd produces BreadcrumbList even for menu routes
    const menuLd = JSON.parse(
      buildRouteJsonLd({
        loc: 'https://ziarahnusantara.my.id/panduan',
        canonicalLoc: 'https://ziarahnusantara.my.id/panduan',
        path: '/panduan',
        title: 'Panduan Ziarah Kubur Lengkap | Ziarah Nusantara',
        description: 'Panduan ziarah kubur lengkap.',
      })
    );
    expect(menuLd['@graph'].some((n: any) => n['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
