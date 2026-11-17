import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Pulau Kalimantan (5 Provinsi) & Pulau Sulawesi (6 Provinsi).
 * Tahap 6 — Ekspansi & Kurasi Penuh Kalimantan Selatan, Kalimantan Barat, Kalimantan Tengah,
 * Kalimantan Timur, Kalimantan Utara, Sulawesi Selatan, Sulawesi Barat, Sulawesi Tengah,
 * Sulawesi Utara, Gorontalo, dan Sulawesi Tenggara.
 *
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const KALIMANTAN_SULAWESI_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. PROVINSI KALIMANTAN SELATAN (BUMI LAMBUNG MANGKURAT / BANJAR)
  // =========================================================================
  {
    id: 'syekh-muhammad-arsyad-al-banjari',
    legacyId: 'ulama-28',
    name: 'Syekh Muhammad Arsyad bin Abdullah Al-Banjari (Datu Kalampayan)',
    title: 'Makam Syekh Muhammad Arsyad Al-Banjari (Datu Kalampayan)',
  },
];

