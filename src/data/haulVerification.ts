export type HaulVerification = {
  status: 'terverifikasi';
  displaySchedule: string;
  sourceUrl: string;
  sourceName: string;
};

export const HAUL_VERIFICATION: Record<string, HaulVerification> = {
  'syekh-maulana-malik-ibrahim': {
    status: 'terverifikasi',
    displaySchedule:
      '12 Rabiul Awal / 12 Maulid (jadwal pelaksanaan mengikuti penetapan Yayasan Makam Syeikh Maulana Malik Ibrahim)',
    sourceName: 'Disparekrafbudpora Kab. Gresik',
    sourceUrl: 'https://disparekrafbudpora.gresikkab.go.id/detailpost/makam-maulana-malik-ibrahim',
  },
  'sunan-kudus': {
    status: 'terverifikasi',
    displaySchedule: '10 Muharram (puncak tradisi Buka Luwur)',
    sourceName: 'Detik Jateng',
    sourceUrl:
      'https://www.detik.com/jateng/budaya/d-7424634/catat-lur-rangkaian-acara-buka-luwur-makam-sunan-kudus-tahun-ini',
  },
  'sunan-ampel': {
    status: 'terverifikasi',
    displaySchedule: "Pekan Nisfu Sya'ban (tahun 2023 digelar sekitar 17 Sya'ban)",
    sourceName: 'Detik Jatim',
    sourceUrl:
      'https://www.detik.com/jatim/berita/d-6612815/pesan-mendalam-gubernur-khofifah-di-haul-agung-ke-546-sunan-ampel',
  },
  'sunan-muria': {
    status: 'terverifikasi',
    displaySchedule: 'Rangkaian Buka Luwur dimulai 1 Muharram (puncak mengikuti penetapan panitia)',
    sourceName: 'Visit Jawa Tengah',
    sourceUrl: 'https://visitjawatengah.jatengprov.go.id/en/event/buka-luwur-sunan-muria',
  },
};

export const UNVERIFIED_HAUL_DISPLAY_TEXT =
  'Jadwal haul mengikuti penetapan panitia atau pengurus makam setempat (belum kami verifikasi).';

export type HaulDisplayResult =
  | {
      verified: true;
      text: string;
      sourceUrl: string;
      sourceName: string;
    }
  | {
      verified: false;
      text: string;
    };

export function getHaulDisplay(
  site?: {
    id?: string | null;
    legacyId?: string | null;
    haulSchedule?: string | null;
    haulVerified?: boolean | null;
    haulSourceUrl?: string | null;
    haulSourceLabel?: string | null;
    editedByCurator?: boolean | null;
  } | null
): HaulDisplayResult {
  const idKey = String(site?.id || '').trim();
  const legacyKey = String(site?.legacyId || '').trim();
  const entry =
    (idKey ? HAUL_VERIFICATION[idKey] : undefined) ||
    (legacyKey ? HAUL_VERIFICATION[legacyKey] : undefined);

  if (
    site?.haulVerified === true &&
    typeof site?.haulSourceUrl === 'string' &&
    /^https:\/\/.+/i.test(site.haulSourceUrl.trim()) &&
    typeof site?.haulSchedule === 'string' &&
    site.haulSchedule.trim().length > 0
  ) {
    const cleanSourceUrl = site.haulSourceUrl.trim();
    const cleanSourceLabel =
      typeof site?.haulSourceLabel === 'string' && site.haulSourceLabel.trim().length > 0
        ? site.haulSourceLabel.trim()
        : entry?.sourceName || 'Sumber Resmi Haul Terverifikasi';
    return {
      verified: true,
      text: site.haulSchedule.trim(),
      sourceUrl: cleanSourceUrl,
      sourceName: cleanSourceLabel,
    };
  }

  if (entry && entry.status === 'terverifikasi') {
    return {
      verified: true,
      text: entry.displaySchedule,
      sourceUrl: entry.sourceUrl,
      sourceName: entry.sourceName,
    };
  }

  return {
    verified: false,
    text: UNVERIFIED_HAUL_DISPLAY_TEXT,
  };
}
