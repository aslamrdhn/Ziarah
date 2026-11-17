import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Pulau Sumatera (Tahap 5 — 10 Provinsi):
 * Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau,
 * Jambi, Sumatera Selatan, Kepulauan Bangka Belitung, Bengkulu, dan Lampung.
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const SUMATERA_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. PROVINSI ACEH (SERAMBI MAKKAH)
  // =========================================================================
  {
    id: 'syekh-abdurrauf-as-singkili',
    legacyId: 'ulama-3',
    name: 'Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Teungku Syiah Kuala)', title: 'Mufti Agung Kesultanan Aceh Darussalam, Pengarang Tafsir Tarjuman Al-Mustafid & Mursyid Utama Thariqah Syattariyah Nusantara', description: 'Kompleks Cagar Budaya Makam Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala) di Gampong Deah Raya, Kecamatan Syiah Kuala, Kota Banda Aceh, Provinsi Aceh—maha guru para wali penyebar Islam ke Sumatera Barat (Syekh Burhanuddin Ulakan) dan Tanah Jawa (Syekh Abdul Muhyi Pamijahan).', category: 'Ulama Nusantara', era: 'Abad ke-17 M (1024–1105 H / 1615–1693 M)', province: 'Aceh', city: 'Banda Aceh', district: 'Kec. Syiah Kuala', address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh', location: { lat: 5.5956, lng: 95.3318, address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh', district: 'Kec. Syiah Kuala', city: 'Banda Aceh', province: 'Aceh', }, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg', imageSource: 'Wikimedia Commons',
    title: 'Makam Syekh Abdurrauf bin Ali Al-Fansuri As-Singkili (Teungku Syiah Kuala)', title: 'Mufti Agung Kesultanan Aceh Darussalam, Pengarang Tafsir Tarjuman Al-Mustafid & Mursyid Utama Thariqah Syattariyah Nusantara', description: 'Kompleks Cagar Budaya Makam Syekh Abdurrauf As-Singkili (Teungku Syiah Kuala) di Gampong Deah Raya, Kecamatan Syiah Kuala, Kota Banda Aceh, Provinsi Aceh—maha guru para wali penyebar Islam ke Sumatera Barat (Syekh Burhanuddin Ulakan) dan Tanah Jawa (Syekh Abdul Muhyi Pamijahan).', category: 'Ulama Nusantara', era: 'Abad ke-17 M (1024–1105 H / 1615–1693 M)', province: 'Aceh', city: 'Banda Aceh', district: 'Kec. Syiah Kuala', address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh', location: { lat: 5.5956, lng: 95.3318, address: 'Gampong Deah Raya, Kec. Syiah Kuala, Kota Banda Aceh', district: 'Kec. Syiah Kuala', city: 'Banda Aceh', province: 'Aceh', }, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Meuseujid_Teungku_di_Anj%C3%B4ng.jpg', imageSource: 'Wikimedia Commons',
  },
];

