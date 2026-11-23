export type HaulVerification = {
  status: 'terverifikasi';
  displaySchedule: string;
  sourceUrl: string;
  sourceName: string;
};

export const HAUL_VERIFICATION: Record<string, HaulVerification> = {
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
    editedByCurator?: boolean | null;
  } | null
): HaulDisplayResult {
  if (
    site?.editedByCurator === true &&
    typeof site?.haulSchedule === 'string' &&
    site.haulSchedule.trim().length > 0
  ) {
    return {
      verified: true,
      text: site.haulSchedule.trim(),
      sourceUrl: '',
      sourceName: 'Kurasi Dewan Kurator Ziarah Nusantara',
    };
  }

  const idKey = String(site?.id || '').trim();
  const legacyKey = String(site?.legacyId || '').trim();
  const entry =
    (idKey ? HAUL_VERIFICATION[idKey] : undefined) ||
    (legacyKey ? HAUL_VERIFICATION[legacyKey] : undefined);

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
