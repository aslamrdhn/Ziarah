import { ZiarahSite } from '../data/sites';

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

  // 1. Exact ID match (e.g. "wali-2")
  const byId = sites.find((s) => s.id.toLowerCase() === param);
  if (byId) return byId;

  // 2. Exact canonical SEO slug match (e.g. "sunan-ampel-surabaya")
  const byCanonicalSlug = sites.find((s) => getSiteSlug(s) === param);
  if (byCanonicalSlug) return byCanonicalSlug;

  // 3. Title-only slug or title+city slug match (e.g. "sunan-ampel" or "sunan-gresik-gresik")
  const normalizedParam = slugifySiteText(param);
  const byAltSlug = sites.find((s) => {
    const tSlug = slugifySiteText(s.title);
    const cSlug = slugifySiteText(s.location?.city || '');
    const fullTitleSlug = s.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return (
      tSlug === normalizedParam ||
      `${tSlug}-${cSlug}` === normalizedParam ||
      fullTitleSlug === normalizedParam ||
      `${fullTitleSlug}-${cSlug}` === normalizedParam
    );
  });
  if (byAltSlug) return byAltSlug;

  // 4. Prefix/substring fallback
  return (
    sites.find((s) => {
      const slug = getSiteSlug(s);
      return slug.startsWith(normalizedParam) || normalizedParam.startsWith(slug);
    }) || null
  );
}
