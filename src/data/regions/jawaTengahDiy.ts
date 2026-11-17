import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Jawa Tengah & DI Yogyakarta (Tahap 3).
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const JAWA_TENGAH_DIY_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. WALI SONGO JAWA TENGAH (DEMAK & KUDUS)
  // =========================================================================
  {
    id: 'sunan-kalijaga',
    legacyId: 'wali-7',
    name: 'Raden Mas Said / Syekh Malaya (Sunan Kalijaga)',
    title: 'Makam Sunan Kalijaga (Raden Mas Said)',
  },
];

