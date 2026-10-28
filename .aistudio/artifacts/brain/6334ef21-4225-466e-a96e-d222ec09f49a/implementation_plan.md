# Rencana Pembaruan Identitas Google Search, Ikon Profil (Favicon), & Koreksi AI Overview (`ziarahnusantara.my.id`)

## 1. Tujuan & Akar Masalah yang Diperbaiki
Berdasarkan hasil pencarian Google untuk `ziarah nusantara.my.id`, pembaruan ini mengatasi dua masalah utama secara permanen:
1. **Menampilkan Ikon Profil Resmi di Google Search (Menggantikan Ikon Bola Dunia Abu-abu)**:
   - Merancang ulang ikon resmi (`/public/icon.svg` dan `/public/favicon.svg`) dengan **Lambang Kubah Emas dan Kaligrafi Monogram ZN di atas Latar Hijau Zamrud (`#0F3D33`)**.
   - Menambahkan deklarasi `<link rel="icon">` multi-ukuran yang diwajibkan oleh *Google Search Favicon Guidelines* (`sizes="48x48"`, `sizes="96x96"`, `sizes="192x192"`, `sizes="512x512"`, `shortcut icon`, dan `apple-touch-icon`) pada kode statis `/index.html`.
2. **Meluruskan Informasi Google AI Overview & Identitas Pemilik Situs**:
   - Menyematkan **Schema.org `@graph` JSON-LD** lengkap di `/index.html` dan `/src/App.tsx` yang menghubungkan entitas `Organization` (**Tim Kurator Arsip Ziarah Nusantara**), `WebSite` (`https://ziarahnusantara.my.id/`), `alternateName` (`["Ziarah Nusantara", "ziarahnusantara.my.id", "ziarah nusantara.my.id", "Direktori Makam Waliyullah Nusantara"]`), `logo` resmi, serta `ItemList` Direktori Makam Wali Songo & Ulama Nusantara.
   - Menambahkan konten semantik statis (*crawlable fallback*) di dalam `/index.html` agar bot pencari dan AI Google langsung membaca profil resmi **Ziarah Nusantara** (dikelola oleh **Tim Kurator Arsip Ziarah Nusantara**) tanpa tertukar dengan blog pihak ketiga (`nusantara.my.id`).

---

## 2. Daftar Perubahan File & Fitur

### A. Desain Ikon Profil & Favicon Resmi (`/public/icon.svg` & `/public/favicon.svg`)
- Memperbarui `/public/icon.svg` dan membuat `/public/favicon.svg` dengan desain **Kubah Masjid/Makam Klasik Emas (`#D4AF37`), Bintang Sembilan Wali Songo, dan Kaligrafi/Monogram "ZN" di atas Latar Hijau Zamrud (`#0F3D33`)** yang tajam pada ukuran kecil (16x16 / 48x48 di hasil pencarian Google Mobile & Desktop) maupun ukuran besar (512x512).

### B. Standarisasi Tag Favicon, Meta Identitas, & Schema.org `@graph` di `/index.html`
- Menambahkan deklarasi lengkap di `<head>` `/index.html`:
  - `<link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />`
  - `<link rel="icon" type="image/svg+xml" href="/icon.svg" sizes="48x48 96x96 144x144 192x192 512x512" />`
  - `<link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />`
  - `<link rel="icon" type="image/png" sizes="512x512" href="/pwa-512x512.png" />`
  - `<link rel="shortcut icon" href="/pwa-192x192.png" />`
  - `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`
  - `<meta name="author" content="Tim Kurator Arsip Ziarah Nusantara" />`
  - `<meta name="publisher" content="Tim Kurator Arsip Ziarah Nusantara" />`
  - `<meta name="application-name" content="Ziarah Nusantara" />`
- Memperbarui `<script type="application/ld+json" id="schema-jsonld">` menjadi struktur `@graph` yang mencakup:
  - **`Organization`**: Nama `Ziarah Nusantara`, `legalName` & `publishingPrinciples` oleh **Tim Kurator Arsip Ziarah Nusantara**, `url: "https://ziarahnusantara.my.id/"`, dan `logo` ImageObject (`https://ziarahnusantara.my.id/pwa-512x512.png` & `/favicon.svg`).
  - **`WebSite`**: Nama `Ziarah Nusantara`, `alternateName: ["ziarahnusantara.my.id", "ziarah nusantara.my.id", "Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara"]`, `publisher` merujuk ke `@id: "https://ziarahnusantara.my.id/#organization"`.
  - **`ItemList`**: Ringkasan terstruktur direktori makam Wali Songo dan Ulama Nusantara, panduan adab ziarah, kumpulan doa tahlil/tawassul, serta program infaq pelestarian situs sejarah Islam Nusantara.
- Menyediakan ringkasan HTML semantik di dalam `<div id="root">` (yang otomatis digantikan oleh React saat aplikasi dimuat di browser pengguna, namun langsung terbaca oleh *crawler* HTML statis Googlebot dan AI Overview).

### C. Sinkronisasi Dinamis SEO & Schema.org per Halaman (`/src/App.tsx` & `/public/sitemap.xml`)
- Memperbarui hook SEO di `/src/App.tsx` agar setiap rute (`/`, `/peta`, `/direktori`, `/panduan`, `/rubrik`, `/doa`, `/infaq`, `/kurasi`) memiliki judul halaman spesifik, deskripsi yang kaya konteks sejarah & akademik, serta menjaga struktur JSON-LD `@graph` (`Organization` + `WebSite` + `WebPage`) tetap konsisten.
- Memperbarui tanggal `<lastmod>` pada `/public/sitemap.xml` agar Google Search Console mendeteksi pembaruan metadata dan ikon terbaru.

### D. Alat Cek Status Favicon & Panduan *Request Indexing* di Panel Admin (`/src/views/AdminKurator.tsx`)
- Menambahkan kartu diagnostik **"Status Ikon Profil Google (Favicon) & Identitas AI Overview"** pada tab **Pengaturan Infaq & QRIS** di `/admin`:
  - **Pratinjau Live Tampilan Google Search (SERP Snippet Preview)**: Menampilkan simulasi nyata bagaimana `ziarahnusantara.my.id` tampil di Google Mobile lengkap dengan ikon Kubah Emas ZN, nama situs `Ziarah Nusantara`, dan atribusi **Tim Kurator Arsip Ziarah Nusantara**.
  - **Cek Kesehatan Asset Ikon & Schema.org**: Indikator pemeriksaan otomatis untuk `/favicon.svg`, `/pwa-192x192.png`, `/pwa-512x512.png`, dan JSON-LD `Organization`.
  - **Tombol Salin Cepat & Panduan 3 Langkah *Request Indexing* Google Search Console**: Langkah praktis untuk meminta `Google-Favicon` dan `Googlebot` memperbarui gambar profil serta mereset ringkasan AI Overview pada domain `https://ziarahnusantara.my.id/`.
