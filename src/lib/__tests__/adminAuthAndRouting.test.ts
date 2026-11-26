import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Portal Kurator Auth & Direct Route Access Regression Suite', () => {
  it('passes browserPopupRedirectResolver to all getRedirectResult, signInWithPopup, and signInWithRedirect calls in AdminKurator.tsx', () => {
    const adminFile = path.resolve(process.cwd(), 'src/views/AdminKurator.tsx');
    const content = fs.readFileSync(adminFile, 'utf8');

    expect(content).toContain('browserPopupRedirectResolver');

    const redirectResultCalls = content.match(/getRedirectResult\s*\([^)]*\)/g) || [];
    expect(redirectResultCalls.length).toBeGreaterThanOrEqual(1);
    for (const call of redirectResultCalls) {
      expect(call).toContain('browserPopupRedirectResolver');
    }

    const popupCalls = content.match(/signInWithPopup\s*\([^)]*\)/g) || [];
    expect(popupCalls.length).toBeGreaterThanOrEqual(1);
    for (const call of popupCalls) {
      expect(call).toContain('browserPopupRedirectResolver');
    }

    const redirectCalls = content.match(/signInWithRedirect\s*\([^)]*\)/g) || [];
    expect(redirectCalls.length).toBeGreaterThanOrEqual(1);
    for (const call of redirectCalls) {
      expect(call).toContain('browserPopupRedirectResolver');
    }
  });

  it('keeps browserPopupRedirectResolver conditional in src/lib/firebase.ts so homepage / does not load Firebase Auth iframe on boot', () => {
    const firebaseFile = path.resolve(process.cwd(), 'src/lib/firebase.ts');
    const content = fs.readFileSync(firebaseFile, 'utf8');

    expect(content).toContain("window.location.pathname.startsWith('/admin')");
    expect(content).toContain("window.location.pathname.startsWith('/kurator')");
    expect(content).toContain('popupRedirectResolver: browserPopupRedirectResolver');
  });

  it('validates vercel.json JSON syntax, /admin and /kurator-admin rewrites, and SPA catch-all fallback rewrite', () => {
    const vercelPath = path.resolve(process.cwd(), 'vercel.json');
    const raw = fs.readFileSync(vercelPath, 'utf8');
    const parsed = JSON.parse(raw);

    expect(Array.isArray(parsed.rewrites)).toBe(true);

    const sources = parsed.rewrites.map((r: { source: string; destination: string }) => r.source);
    expect(sources).toContain('/admin');
    expect(sources).toContain('/kurator');
    expect(sources).toContain('/kurator-admin');
    expect(sources).toContain('/situs/:id*');
    expect(sources).toContain('/makam/:id*');

    const lastRewrite = parsed.rewrites[parsed.rewrites.length - 1];
    expect(lastRewrite).toEqual({
      source: '/((?!assets/|thumbs/|.*\\..*).*)',
      destination: '/index.html',
    });
  });

  it('ensures scripts/vercel-postbuild.mjs pre-generates noindex dist/admin/index.html and dist/kurator-admin/index.html without adding them to sitemap.xml', () => {
    const postbuildPath = path.resolve(process.cwd(), 'scripts/vercel-postbuild.mjs');
    const postbuildCode = fs.readFileSync(postbuildPath, 'utf8');

    expect(postbuildCode).toContain('Portal Internal Dewan Kurator — Ziarah Nusantara');
    expect(postbuildCode).toContain('<meta name="robots" content="noindex, nofollow" />');
    expect(postbuildCode).toContain("['admin', 'kurator-admin', 'kurator']");

    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
      expect(sitemapXml).not.toContain('/admin</loc>');
      expect(sitemapXml).not.toContain('/kurator-admin</loc>');
    }
  });

  it('includes explicit SPA route redirect from /kurator to /admin in src/App.tsx (F10)', () => {
    const appPath = path.resolve(process.cwd(), 'src/App.tsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    expect(appContent).toContain(
      '<Route path="/kurator" element={<Navigate to="/admin" replace />} />'
    );
  });
});

