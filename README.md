# Ziarah Nusantara
Platform direktori dan peta interaktif untuk makam para wali, habaib, dan ulama di Indonesia.

## Fitur Utama
- **Database Dinamis (Firestore)**: Seluruh direktori makam tidak lagi hardcode, melainkan diambil secara real-time dari Firebase Firestore (`sites` collection).
- **Panel Admin Seeder**: Admin dapat dengan mudah memigrasikan data awal (seeding) ke Firestore langsung melalui antarmuka Panel Admin di aplikasi.
- **Peta Interaktif (Routing)**: Menampilkan titik lokasi makam dengan detail.
- **Progressive Web App (PWA)**: Dapat diinstal dan diakses dengan cepat secara offline.
- **Kumpulan Doa & Panduan**: Sinkronisasi cloud Bookmark Doa & Makam dengan Akun Google pengguna.
- **Pembayaran Infaq (Preview Mode)**: **Belum Aktif — perlu konfigurasi** Payment Gateway.
- **Moderasi Kurator**: **Belum Aktif — perlu konfigurasi** tambahan untuk usulan publik.

## Pengembangan & Hosting
Aplikasi ini dibangun menggunakan **React + Vite + TypeScript** dengan arsitektur **Single Page Application (SPA)** yang sangat fleksibel untuk dihosting di platform apapun (Firebase Hosting, Vercel, Netlify, Cloud Run, VPS).

### Menjalankan secara Lokal
```bash
npm install
npm run dev
```

### Cara Build & Hosting (Sangat Mudah)
1. Jalankan perintah kompilasi produksi:
```bash
npm run build
```
2. Aplikasi Anda akan dikemas ke dalam folder `dist/`.
3. Anda cukup mengunggah/men-deploy folder `dist/` ini ke layanan hosting statis favorit Anda.
