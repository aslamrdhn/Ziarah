import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Pulau Kalimantan & Sulawesi.
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id yang sama.
 */
export const KALIMANTAN_SULAWESI_SITES: ZiarahSite[] = [];
