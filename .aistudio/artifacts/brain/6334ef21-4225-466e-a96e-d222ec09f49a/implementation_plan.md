# Penyesuaian Identitas Nama Aplikasi & Tagline Header

Rencana ini mengatur pembaruan langsung pada kode sumber untuk menampilkan **Nama Aplikasi** dan **Tagline** baru di bagian Header atas kanvas aplikasi serta menyelaraskannya dengan judul tab browser (`<title>`) dan metadata berbagi tautan (OpenGraph/SEO).

### User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan jawaban klarifikasi Anda sebelumnya, berikut adalah keputusan yang telah dikonfirmasi beserta satu detail opsional yang dapat Anda tentukan:

- **Keputusan Terkonfirmasi 1 (Metode Pengaturan)**: Mengganti langsung di kode sumber dengan nama baru pilihan Anda (tanpa menambah beban kueri konfigurasi tambahan saat pemuatan awal halaman).
- **Keputusan Terkonfirmasi 2 (Cakupan Header & Layout)**: Menyesuaikan **Nama Aplikasi** dan menambahkan **Tagline** di bagian Header navigasi atas, sekaligus memperbarui judul tab browser.
- **Konfirmasi Teks Nama & Tagline Baru**:
  - Jika Anda sudah memiliki teks spesifik untuk **Nama Aplikasi** dan **Tagline**, Anda dapat menuliskannya di kolom chat sebelum atau saat menekan tombol **Proceed**.
  - Jika Anda langsung menekan **Proceed**, sistem akan menerapkan struktur Header dua baris yang elegan dengan konstanta terpusat (default: **"Ziarah Nusantara"** dengan tagline **"Arsip & Direktori Makam Wali Nusantara"**) yang sangat mudah diganti kapan saja.
- **Catatan Mengenai "Nama Proyek" (Bar Abu-Abu Gelap Paling Atas)**: Area bar gelap paling atas merupakan antarmuka platform Google AI Studio (di luar kode aplikasi web). Nama tersebut dapat Anda ubah kapan saja secara langsung dengan mengklik teks judul di bar atas AI Studio, dan tidak akan tampil saat website Anda di-deploy ke domain publik (seperti Vercel/Cloudflare).

---

### 1. Overview & Core Concept

- **What It Does**: Memperbarui komponen Header navigasi utama agar menampilkan identitas utama berupa **Nama Aplikasi** yang berdampingan secara proporsional dengan **Tagline** di bawahnya, serta menyinkronkan judul dokumen HTML pada tab browser.
- **Target Audience / Persona**: Pengunjung dan peziarah yang membuka situs melalui desktop maupun perangkat seluler agar langsung memahami identitas dan fokus utama portal sejak pertama kali halaman dimuat.
- **Key Value**: Memberikan kesan pertama yang lebih berwibawa dan informatif melalui tata letak tipografi editorial pada Header atas tanpa mengorbankan ruang bagi menu navigasi.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. Pengunjung membuka situs dan langsung melihat **Nama Aplikasi** (huruf serif tegas) beserta **Tagline** ringkas di sudut kiri atas Header.
  2. Saat halaman digulir (*scroll*), Header dengan efek kaca (*editorial glass*) tetap menempel di bagian atas layar dengan proporsi tinggi yang nyaman di layar desktop maupun ponsel.
  3. Saat tautan situs dibagikan ke WhatsApp atau media sosial, judul tab browser dan kartu pratinjau menampilkan identitas aplikasi yang konsisten.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Editorial hangat bernuansa arsip klasik Nusantara (*Warm Archival Editorial*).
  - *Color Palette & Mood*: Latar kertas hangat (`#F9F8F4`), teks utama batu tua (`text-stone-900`), dan aksen tagline bernuansa batu medium/zamrud (`text-stone-500` / `text-emerald-800`).
  - *Typography & Hierarchy*: Nama aplikasi menggunakan font serif tebal (`font-serif font-bold tracking-tight`), dipadukan dengan tagline berukuran mikro (`text-[10px] sm:text-[11px] uppercase tracking-widest`) di bawahnya dengan jarak baris rapat (`leading-tight`).
  - *Component Styling & Layout*: Tata letak vertikal kompak di sisi kiri bar navigasi dengan `shrink-0` agar tidak bertabrakan dengan deretan tautan menu (`Arsip & Direktori`, `Peta Rute`, `Panduan`, `Rubrik`, `Doa Khusus`, `Infaq`) dan tombol `Kontribusi Arsip`.
- **Interactive Feedback & Motion**: Efek transisi warna halus saat kursor diarahkan ke identitas brand di Header (`hover:opacity-85 transition-opacity`) yang mengarahkan pengguna kembali ke halaman Beranda.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Konstanta Identitas Brand Terpusat di Kode**
  - *Chosen Approach*: Menyimpan teks Nama Aplikasi dan Tagline dalam konstanta terpusat yang digunakan bersama oleh Header, halaman Beranda/Footer, dan konfigurasi judul dokumen.
  - *Why*: Menjamin pemuatan instan (*zero layout shift* / tidak berkedip saat halaman pertama kali dibuka) dan memudahkan penggantian teks di satu tempat.
  - *Alternatives Considered*: Menyimpan nama situs di database jarak jauh dan memuatnya secara asinkron tidak dipilih karena menyebabkan teks judul berubah mendadak (*flicker*) saat halaman baru dibuka dan tidak terbaca oleh *crawler* pratinjau WhatsApp/SEO statis.
- **Decision 2: Tata Letak Tagline Responsif di Header**
  - *Chosen Approach*: Menampilkan Nama Aplikasi dan Tagline dalam susunan dua baris rapat (`flex-col`) dengan ukuran huruf mikro yang proporsional di semua ukuran layar.
  - *Why*: Menjaga keseimbangan horizontal bar navigasi agar deretan menu utama tetap muat dalam satu baris tanpa terpotong di layar laptop maupun ponsel.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌───────────────────────────────────────────────────────────────────┐
│                   Konfigurasi Identitas Brand                     │
│            (Nama Aplikasi, Tagline Header, Judul SEO)             │
└─────────────────┬─────────────────────────────────┬───────────────┘
                  │                                 │
                  ▼                                 ▼
┌───────────────────────────────────┐ ┌─────────────────────────────┐
│      Header & Navigasi Utama      │ │   Dokumen HTML & Metadata   │
│  ┌─────────────────────────────┐  │ │  • Judul Tab Browser        │
│  │ Brand Wordmark (Serif Bold) │  │ │  • Meta OpenGraph / Sosial  │
│  │ Tagline Mikro (Tracking)    │  │ │  • Data Terstruktur JSON-LD │
│  └─────────────────────────────┘  │ └─────────────────────────────┘
│  • Menu Navigasi & Status Login   │
└───────────────────────────────────┘
```
- **Data Model & State**:
  - `APP_NAME`: Teks nama utama aplikasi yang tampil sebagai judul besar di Header dan tab browser.
  - `APP_TAGLINE`: Teks sub-judul/tagline pendek yang tampil tepat di bawah nama aplikasi pada Header.
- **Interactive Component & State Mapping**:
  - Klik pada area **Nama Aplikasi + Tagline** di Header memicu navigasi kembali ke rute utama (`/`) dan menutup menu *drawer* seluler jika sedang terbuka.
