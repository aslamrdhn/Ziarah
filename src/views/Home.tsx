import { SITES, type ZiarahSite } from '../data/sites';
import { formatDynamicHeroSubtitle } from '../lib/siteCopy';
import { DaftarMakam } from './DaftarMakam';

/**
 * Computes dynamic maqbarah count (sites.length) and unique province count
 * for the homepage hero subtitle.
 */
export function buildHomeHeroSubtitle(sites: ZiarahSite[] = SITES): string {
  const siteCount = sites.length;
  const uniqueProvinceCount = new Set(
    sites.map((s) => s.location?.province).filter(Boolean)
  ).size;
  return formatDynamicHeroSubtitle(
    `Menghimpun riwayat ${siteCount} maqbarah di ${uniqueProvinceCount} provinsi agar setiap langkah ziarah menjadi pengingat akhirat, penguat iman, dan bakti doa bagi ahli kubur.`,
    siteCount,
    uniqueProvinceCount
  );
}

export { DaftarMakam as Home };
export default DaftarMakam;
