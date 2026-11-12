import { ZiarahSite, REGIONAL_ID_TO_LEGACY_ID } from '../data/sites';

export function slugifySiteText(input: string): string {
  return String(input || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getSiteSlug(site: Pick<ZiarahSite, 'id' | 'title' | 'location'>): string {
  const titleSlug = slugifySiteText(site.title);
  const citySlug = slugifySiteText(site.location?.city || '');
  if (!citySlug || titleSlug.includes(citySlug)) {
    return titleSlug || slugifySiteText(site.id);
  }
  return `${titleSlug}-${citySlug}`;
}

export function getSitePath(site: Pick<ZiarahSite, 'id' | 'title' | 'location'>): string {
  return `/situs/${getSiteSlug(site)}`;
}

export function findSiteByParam(sites: ZiarahSite[], rawParam?: string | null): ZiarahSite | null {
  if (!rawParam) return null;
  const param = decodeURIComponent(rawParam).trim().toLowerCase();
  if (!param) return null;

  const mappedLegacy = REGIONAL_ID_TO_LEGACY_ID[param];

  // 1. Exact ID or legacyId match (e.g. "wali-2", "wali-9", or "sunan-gunung-jati")
  const byId = sites.find(
    (s) =>
      s.id.toLowerCase() === param ||
      (s.legacyId && s.legacyId.toLowerCase() === param) ||
      (mappedLegacy && s.id.toLowerCase() === mappedLegacy.toLowerCase()) ||
      (mappedLegacy && s.legacyId && s.legacyId.toLowerCase() === mappedLegacy.toLowerCase())
  );
  if (byId) return byId;

  // 2. Exact canonical SEO slug match (e.g. "sunan-ampel-surabaya")
  const byCanonicalSlug = sites.find((s) => getSiteSlug(s) === param);
  if (byCanonicalSlug) return byCanonicalSlug;

  // 3. Title-only slug or title+city slug match (only if non-ambiguous: altMatches.length === 1)
  const normalizedParam = slugifySiteText(param);
  const altMatches = sites.filter((s) => {
    const tSlug = slugifySiteText(s.title);
    const cSlug = slugifySiteText(s.location?.city || '');
    const preApostropheSlug = s.title.includes("'")
      ? slugifySiteText(s.title.split("'")[0])
      : '';
    const fullTitleSlug = s.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return (
      tSlug === normalizedParam ||
      `${tSlug}-${cSlug}` === normalizedParam ||
      fullTitleSlug === normalizedParam ||
      `${fullTitleSlug}-${cSlug}` === normalizedParam ||
      Boolean(
        preApostropheSlug &&
          (preApostropheSlug === normalizedParam || `${preApostropheSlug}-${cSlug}` === normalizedParam)
      )
    );
  });
  if (altMatches.length === 1) {
    return altMatches[0];
  }

  return null;
}
