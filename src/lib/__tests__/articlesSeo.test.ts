import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { ZIARAH_ARTICLES, findArticleBySlug, ARTICLE_CATEGORIES } from '../../data/articles';
import { SITES } from '../../data/sites';
import { getSiteSlug } from '../siteSlugs';
import {
  extractArticlesFromSource,
  buildArtikelIndexRootHtml,
  buildArticleDetailRootHtml,
  buildRouteJsonLd,
  renderCustomHtml,
  // @ts-expect-error postbuild script is an untyped ESM module
} from '../../../scripts/vercel-postbuild.mjs';

describe('SEO Articles Catalog, Canonical Internal Links & Prerender Schema', () => {
  it('provides at least 10 unique long-tail articles with 140–160 char metaDescriptions and 4+ substantive sections', () => {
    expect(ZIARAH_ARTICLES.length).toBeGreaterThanOrEqual(10);
    expect(ARTICLE_CATEGORIES).toEqual([
      'Semua',
      'Rute Ziarah',
      'Tata Cara & Fikih',
      'Musiman & Haul',
      'Hajat & Keteladanan',
    ]);

    const seenSlugs = new Set<string>();
    for (const article of ZIARAH_ARTICLES) {
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
      expect(seenSlugs.has(article.slug)).toBe(false);
      seenSlugs.add(article.slug);

      expect(article.title.length).toBeGreaterThan(25);
      expect(article.metaDescription.length, `Meta description length for ${article.slug}`).toBeGreaterThanOrEqual(140);
      expect(article.metaDescription.length, `Meta description length for ${article.slug}`).toBeLessThanOrEqual(160);
      expect(article.publishedAt).toBe('2026-11-20');
      expect(article.readTimeMinutes).toBeGreaterThanOrEqual(5);
      expect(article.excerpt.length).toBeGreaterThan(50);
      expect(article.sections.length, `Sections count for ${article.slug}`).toBeGreaterThanOrEqual(4);

      for (const sec of article.sections) {
        expect(sec.heading.length).toBeGreaterThan(10);
        expect(sec.paragraphs.length).toBeGreaterThanOrEqual(1);
      }

      expect(article.ctaTarget.label).toBeTruthy();
      expect(article.ctaTarget.to.startsWith('/')).toBe(true);
      expect(article.ctaTarget.description).toBeTruthy();
      expect(article.references.length).toBeGreaterThanOrEqual(2);

      expect(findArticleBySlug(article.slug)?.slug).toBe(article.slug);
    }

    expect(findArticleBySlug('artikel-tidak-ada')).toBeNull();
    expect(findArticleBySlug('')).toBeNull();
  });

  it('ensures 100% of relatedSiteSlugs across all 10 articles match canonical slugs in SITES (0 broken internal links)', () => {
    const validCanonicalSiteSlugs = new Set(SITES.map((s) => getSiteSlug(s)));
    expect(validCanonicalSiteSlugs.size).toBe(183);

    for (const article of ZIARAH_ARTICLES) {
      expect(article.relatedSiteSlugs.length).toBeGreaterThanOrEqual(4);
      for (const siteSlug of article.relatedSiteSlugs) {
        expect(
          validCanonicalSiteSlugs.has(siteSlug),
          `Article "${article.slug}" references non-canonical site slug "${siteSlug}"`
        ).toBe(true);
      }
    }
  });

  it('enforces zero forbidden terms (Wakaf, Logo Resmi Ziarah Nusantara) in articles data and view', () => {
    const articlesDataSrc = fs.readFileSync(
      path.resolve(process.cwd(), 'src/data/articles.ts'),
      'utf8'
    );
    const articlesViewSrc = fs.readFileSync(
      path.resolve(process.cwd(), 'src/views/ArtikelZiarah.tsx'),
      'utf8'
    );

    for (const content of [articlesDataSrc, articlesViewSrc]) {
      expect(content).not.toMatch(/wakaf/i);
      expect(content).not.toMatch(/Logo Resmi Ziarah Nusantara/i);
    }
  });

  it('extracts all 10 articles in vercel-postbuild.mjs and generates valid static HTML + Schema.org Article JSON-LD', () => {
    const extractedArticles = extractArticlesFromSource() as any[];
    expect(extractedArticles).toHaveLength(ZIARAH_ARTICLES.length);

    const indexHtmlBlock = buildArtikelIndexRootHtml();
    expect(indexHtmlBlock).toContain('<main id="seo-prerender-shell"');
    for (const art of ZIARAH_ARTICLES) {
      expect(indexHtmlBlock).toContain(`/artikel/${art.slug}`);
    }

    const baseHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
    const firstArticle = extractedArticles[0];
    const detailHtml = renderCustomHtml(baseHtml, {
      loc: `https://ziarahnusantara.my.id/artikel/${firstArticle.slug}`,
      canonicalLoc: `https://ziarahnusantara.my.id/artikel/${firstArticle.slug}`,
      path: `/artikel/${firstArticle.slug}`,
      title: `${firstArticle.title} | Ziarah Nusantara`,
      description: firstArticle.metaDescription,
      article: firstArticle,
      bodyHtml: buildArticleDetailRootHtml(firstArticle),
    });

    expect(detailHtml).toContain(
      `<link rel="canonical" id="canonical-link" href="https://ziarahnusantara.my.id/artikel/${firstArticle.slug}" />`
    );
    expect(detailHtml).toContain(`<h1>${firstArticle.title}</h1>`);
    expect(detailHtml).toContain('/situs/sunan-gunung-jati-cirebon');

    const jsonLdObj = JSON.parse(
      buildRouteJsonLd({
        loc: `https://ziarahnusantara.my.id/artikel/${firstArticle.slug}`,
        canonicalLoc: `https://ziarahnusantara.my.id/artikel/${firstArticle.slug}`,
        path: `/artikel/${firstArticle.slug}`,
        title: `${firstArticle.title} | Ziarah Nusantara`,
        description: firstArticle.metaDescription,
        article: firstArticle,
      })
    );

    const articleNode = jsonLdObj['@graph'].find((n: any) => n['@type'] === 'Article');
    expect(articleNode).toBeDefined();
    expect(articleNode.headline).toBe(firstArticle.title);
    expect(articleNode.datePublished).toBe('2026-11-20');

    const breadcrumbNode = jsonLdObj['@graph'].find((n: any) => n['@type'] === 'BreadcrumbList');
    expect(breadcrumbNode?.itemListElement).toHaveLength(3);
  });
});
