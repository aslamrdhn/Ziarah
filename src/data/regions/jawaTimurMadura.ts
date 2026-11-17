import type { ZiarahSite, Site, PeninggalanSite } from '../sites';

export type { ZiarahSite, Site, PeninggalanSite };

/**
 * Modul Data Makam Wilayah Jawa Timur & Pulau Madura (Tahap 4).
 * Setiap entri di dalam array ini akan digabungkan ke katalog utama SITES
 * dan secara otomatis memperbarui data BASE_SITES jika memiliki id atau legacyId yang sama.
 */
export const JAWA_TIMUR_MADURA_SITES: ZiarahSite[] = [
  // =========================================================================
  // 1. LIMA WALI SONGO JAWA TIMUR & PELOPOR AWAL ISLAM NUSANTARA
  // =========================================================================
  {
    id: 'syekh-maulana-malik-ibrahim',
    legacyId: 'wali-1',
    name: 'Syekh Maulana Malik Ibrahim (Sunan Gresik / Kakek Bantal)', title: 'Sunan Gresik (Pelopor Dewan Wali Songo)', description: 'Ketua Dewan Wali Songo generasi pertama (wafat 822 H / 1419 M), pelopor dakwah Islam di pesisir utara Jawa melalui tata niaga jujur, pengobatan gratis, dan rekayasa irigasi pertanian.', category: 'Walisongo', era: 'Abad ke-14 – Awal Abad ke-15 M (Wafat 12 Rabiul Awal 822 H / 8 April 1419 M)', province: 'Jawa Timur', city: 'Gresik', district: 'Kec. Gresik', address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik', location: { lat: -7.1643, lng: 112.6565, address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik', district: 'Kec. Gresik', city: 'Gresik', province: 'Jawa Timur', }, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg', imageSource: 'Wikimedia Commons',
    title: 'Makam Syekh Maulana Malik Ibrahim (Sunan Gresik / Kakek Bantal)', title: 'Sunan Gresik (Pelopor Dewan Wali Songo)', description: 'Ketua Dewan Wali Songo generasi pertama (wafat 822 H / 1419 M), pelopor dakwah Islam di pesisir utara Jawa melalui tata niaga jujur, pengobatan gratis, dan rekayasa irigasi pertanian.', category: 'Walisongo', era: 'Abad ke-14 – Awal Abad ke-15 M (Wafat 12 Rabiul Awal 822 H / 8 April 1419 M)', province: 'Jawa Timur', city: 'Gresik', district: 'Kec. Gresik', address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik', location: { lat: -7.1643, lng: 112.6565, address: 'Jl. Malik Ibrahim No. 52–62, Kel. Gapurosukolilo, Kec. Gresik, Kabupaten Gresik', district: 'Kec. Gresik', city: 'Gresik', province: 'Jawa Timur', }, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Makam_Maulana_Malik_Ibrahim_Tomb_Complex.jpg', imageSource: 'Wikimedia Commons',
  },
];



