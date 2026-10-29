# Ziarah Nusantara — Implementation Plan (Finalisasi Pra-Push GitHub & Pra-Deploy Vercel)

Rencana pematangan akhir aplikasi **Ziarah Nusantara** sebelum di-push ke repositori GitHub dan di-deploy ulang ke Vercel pada domain resmi `https://ziarahnusantara.my.id`. Fokus utama mencakup pembersihan 100% pemeriksaan TypeScript ketat (`tsc --noEmit`), pemangkasan beban JavaScript pada jalur render awal (*critical rendering path*) untuk mendongkrak skor Mobile PageSpeed (FCP & LCP), penguncian konfigurasi SEO/Sitemap kanonik, serta sanitasi aturan Git.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan yang Telah Dikonfirmasi:**
> 1. **Optimasi Performa FCP/LCP & Perbaikan Lint**: Menerapkan seluruh perbaikan kode TypeScript (`0 error` pada `tsc --noEmit`) sekaligus memisahkan pemuatan modul berat (Firebase SDK & animasi sinematik Hero) dari bundel sinkron awal menggunakan *dynamic import* dan *lazy loading*.
> 2. **Domain Kanonik Produksi**: Mengunci `https://ziarahnusantara.my.id` sebagai satu-satunya acuan domain utama untuk seluruh tag `<link rel="canonical">`, OpenGraph, Schema.org JSON-LD (`@graph`), `robots.txt`, dan pembangkitan otomatis `sitemap.xml` saat proses *post-build* Vercel.

---

## 1. Overview & Core Concept

**Ziarah Nusantara** adalah direktori ensiklopedis, pemetaan geospasial interaktif, panduan adab ziarah, kumpulan doa tahlil/tawassul, serta portal literasi sejarah Waliyullah dan Ulama Nusantara. Hasil audit menyeluruh menunjukkan arsitektur fitur dan tampilan telah matang, namun terdapat empat aspek krusial yang perlu diselesaikan agar proses *push* ke GitHub dan *re-deploy* ke Vercel berjalan mulus tanpa peringatan:

- **Kepatuhan Kompilasi TypeScript (`Zero Lint Errors`)**: Menghapus variabel dan impor yang tidak terpakai pada komponen pembayaran QRIS dan unggah bukti transfer agar pemeriksaan tipe ketat (`npm run lint`) lulus 100% di pipeline CI/CD.
- **Dekonstruksi Beban Bundel Awal (Optimasi FCP & LCP Mobile)**: Saat ini modul Firebase Firestore (`~455 KB`), Firebase Auth (`~113 KB`), serta animasi `motion/react` (`~127 KB`) masih diimpor secara statis di tingkat atas (*top-level import*) pada jalur beranda utama. Mengubahnya menjadi pemuatan dinamis (*dynamic import* pasca-render awal) akan memangkas hampir **~790 KB** JavaScript dari jalur kritis sebelum judul utama (LCP) dirender.
- **Kesiapan SEO & Indeksasi Google Search Console**: Memastikan generator `sitemap.xml` dan prarender rute statis menghasilkan berkas XML/HTML murni yang langsung dapat diambil oleh Googlebot tanpa terhalang *rewrite* SPA di Vercel.
- **Sanitasi Repositori GitHub**: Memperketat aturan pengecualian Git agar artefak lokal dan direktori sementara tidak ikut ter-commit ke GitHub.

---

## 2. User Experience & Visual Design

Seluruh optimasi teknis dilakukan dengan menjaga keutuhan estetika **Museum & Editorial Warisan Islam Nusantara** serta stabilitas tata letak (*Zero Cumulative Layout Shift / CLS = 0.00*):

- **Palet Warna & Tipografi Kuratorial**: Mempertahankan kertas arsip hangat (`#F9F8F4`), zamrud tua (`#0D3B32`), dan aksen emas kubah (`#C5A059`) dengan pasangan tipografi serif *Cormorant Garamond* untuk tajuk utama dan *Plus Jakarta Sans* untuk teks bacaan.
- **Pratinjau Hero Instan Tanpa Kedipan (*Zero-Flicker Hero Fallback*)**: Saat komponen `HeroCinemaShowcase` dimuat secara tunda (*lazy*), beranda menampilkan kartu pratinjau statis berdimensi identik dengan ilustrasi kubah zamrud sehingga teks utama halaman langsung tampil instan di layar perangkat seluler tanpa pergeseran tata letak.
- **Navigasi Atas & Bawah Bebas Halangan**: Bilah navigasi atas menggunakan efek buram pada elemen semu (`before:backdrop-blur-md`) dan merender navigasi bawah seluler melalui `createPortal` langsung ke `document.body`, memastikan posisi tombol selalu presisi di semua ukuran layar.

---

## 3. Key Product Decisions & Trade-Offs

- **Pemuatan Dinamis Firebase (`import()`) vs Impor Statis**:
  - *Keputusan*: Mengganti impor statis `firebase/firestore` dan `firebase/auth` pada konteks situs, komponen utama, dan bilah navigasi menjadi pemuatan modul dinamis di dalam efek latar belakang atau saat pengguna menekan tombol masuk.
  - *Dampak*: Pengunjung pertama kali dapat langsung membaca direktori makam, panduan ziarah, dan doa dalam hitungan milidetik menggunakan data arsip kurasi bawaan (`localStorage` + katalog statis), sementara sinkronisasi awan Firestore bekerja secara asinkron di latar belakang.
- **Isolasi Animasi `motion/react` dari Jalur Kritis Pertama**:
  - *Keputusan*: Memuat `HeroCinemaShowcase` menggunakan `React.lazy` + `<Suspense>` dengan kerangka visual statis yang selaras.
  - *Dampak*: Browser tidak perlu mengunduh dan mengeksekusi mesin animasi 127 KB sebelum menampilkan teks judul beranda utama.
- **Konsistensi Domain Kanonik `https://ziarahnusantara.my.id`**:
  - *Keputusan*: Menetapkan `https://ziarahnusantara.my.id` sebagai nilai bawaan (`default fallback`) di seluruh lapisan aplikasi dan skrip *post-build*, namun tetap mengizinkan pembaruan dinamis dari pengaturan kurator apabila dibutuhkan di masa mendatang.

---

## 4. Technical Architecture & Data Strategy

### Alur Render Jalur Kritis & Pemuatan Asinkron

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    KUNJUNGAN AWAL (FIRST PAINT / LCP)                   │
│  HTML Prarender + CSS Kritis + Katalog Arsip Bawaan + Cache Lokal       │
│  (Tanpa memblokir render untuk mengunduh SDK Firebase / Motion)         │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                  Render Instan (< 1.2 dtk di Mobile)
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│   HIDRASI VISUAL INTERAKTIF   │               │   SINKRONISASI LATAR (IDLE)   │
│ • Lazy-load HeroCinemaShowcase│               │ • Dynamic import() Firestore  │
│ • Navigasi Portal Mobile      │               │ • Dynamic import() Auth SDK   │
│ • Pencarian & Filter Instan   │               │ • Pembaruan Koleksi & Infaq   │
└───────────────────────────────┘               └───────────────────────────────┘
```

### Pemetaan Status Interaktif & Kesiapan Produksi

| Area Sistem | Kondisi Saat Ini | Perbaikan & Optimasi Pra-Deploy | Hasil Akhir yang Diverifikasi |
| :--- | :--- | :--- | :--- |
| **Pemeriksaan Tipe (`tsc --noEmit`)** | Terdapat 3 peringatan variabel/impor tak terpakai (`TS6133`) pada modul pembayaran & bukti transfer | Membersihkan deklarasi yang tidak digunakan agar kode 100% bersih | `npm run lint` lulus sempurna dengan kode keluar `0` |
| **Jalur Kritis Beranda (FCP / LCP)** | SDK Firebase (`~568 KB`) & Motion (`~127 KB`) terikat pada impor statis awal | Mengubah ke `import()` dinamis pada layanan Firebase & `React.lazy` pada *showcase* Hero | Bundel JS awal menyusut drastis; teks LCP langsung tampil |
| **SEO, Sitemap & Vercel Routing** | `vercel.json` dan skrip *post-build* menghasilkan halaman statis per rute + `sitemap.xml` | Memastikan header `Content-Type: application/xml` dan canonical URL terkunci ke `https://ziarahnusantara.my.id` | Google Search Console dapat membaca `/sitemap.xml` dengan status sukses |
| **Kebersihan Repositori Git** | `.gitignore` standar belum mengecualikan direktori aset pratinjau sementara & cache Vercel | Menambahkan pengecualian untuk folder sementara dan berkas lokal | `git status` bersih dan siap di-*push* ke GitHub |
