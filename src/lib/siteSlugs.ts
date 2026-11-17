import type { ZiarahSite } from '../data/sites';
import { REGIONAL_ID_TO_LEGACY_ID } from '../data/initialSites';

export function slugifySiteText(input: string): string {
  return String(input || '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isRoleDescriptionTitle(rawTitle?: string | null): boolean {
  const cleaned = String(rawTitle || '').trim();
  return /^(pendiri|sesepuh|mursyid|ulama|waliyullah|wali\s+songo|waliyyul|mahaguru|maha\s+guru|pelopor|presiden|pahlawan|pengarang|penyusun|mufti|imam\s+besar|qadhi|tokoh|putra|putri|cucu|panglima|pejuang|penjaga|pencipta|arsitek|perintis|guru\s+besar|raja\s+pertama|raja\s+ke-|sultan\s+pertama|penyebar\s+islam|adipati\s+semarang|pecinta\s+agung|utusan\s+kesultanan|leluhur\s+raja|khodimul\s+maulid|pangeran\s+majapahit\s+murid|poros\s+sanad)\b/i.test(
    cleaned
  );
}

export function getSiteSlug(
  site: Pick<ZiarahSite, 'id' | 'title' | 'location'> & { name?: string }
): string {
  const rawName = String(site.name || '').trim();
  const rawTitle = String(site.title || '').trim();
  const baseSource =
    rawName && isRoleDescriptionTitle(rawTitle)
      ? formatMakamHeading(rawName.split(/\s+serta\s+|\s+[—–]\s+/i)[0])
      : rawTitle || rawName;

  const titleSlug = slugifySiteText(baseSource);
  const citySlug = slugifySiteText(site.location?.city || '');
  if (!citySlug || titleSlug.includes(citySlug)) {
    return titleSlug || slugifySiteText(site.id);
  }
  return `${titleSlug}-${citySlug}`;
}

export function getSitePath(
  site: Pick<ZiarahSite, 'id' | 'title' | 'location'> & { name?: string }
): string {
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

  // 3. Title-only slug, legacy role-title slug, or name+city slug match (only if non-ambiguous: altMatches.length === 1)
  const normalizedParam = slugifySiteText(param);
  const altMatches = sites.filter((s) => {
    const tSlug = slugifySiteText(s.title);
    const nSlug = slugifySiteText(s.name || '');
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
      (Boolean(nSlug) && isRoleDescriptionTitle(s.title) && (nSlug === normalizedParam || `${nSlug}-${cSlug}` === normalizedParam)) ||
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

export const findSiteBySlug = findSiteByParam;

/**
 * Formats a tomb/site heading so that "Makam" is never duplicated ("Makam Makam ...")
 * when site.title or site.name already begins with "Makam", "Kompleks Makam", "Astana", or "Masjid".
 */
export function formatMakamHeading(rawTitle?: string | null): string {
  const cleaned = String(rawTitle || '')
    .replace(/\s+/g, ' ')
    .replace(/^(Makam\s+)+/i, 'Makam ')
    .trim();
  if (!cleaned) return 'Makam Waliyullah';
  if (
    /^(makam|kompleks\s+makam|astana|kubah|pasarean|masjid|pesantren|situs|petilasan)\b/i.test(cleaned) ||
    /\b(makam|maqbarah|astana|pasarean)\b/i.test(cleaned)
  ) {
    return cleaned;
  }
  return `Makam ${cleaned}`;
}

export function getSiteDisplayHeading(site: Pick<ZiarahSite, 'name' | 'title'>): {
  heading: string;
  subtitle: string;
} {
  const rawName = String(site.name || '').trim();
  const rawTitle = String(site.title || '').trim();

  const nameStartsWithTombNoun =
    /^(makam|kompleks\s+makam|astana|kubah|pasarean|masjid|petilasan|situs|pesantren)\b/i.test(rawName);
  const titleLooksLikeRole = isRoleDescriptionTitle(rawTitle);

  if (nameStartsWithTombNoun || titleLooksLikeRole) {
    return {
      heading: formatMakamHeading(rawName || rawTitle),
      subtitle: rawTitle || rawName,
    };
  }

  return {
    heading: formatMakamHeading(rawTitle || rawName),
    subtitle: rawName || rawTitle,
  };
}

