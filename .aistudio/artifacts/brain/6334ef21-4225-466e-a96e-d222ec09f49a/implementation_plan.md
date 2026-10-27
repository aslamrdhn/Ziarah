# Konfigurasi Domain Resmi `ziarahnusantara.my.id` & Akses Cepat Panel Kurator

Menetapkan `ziarahnusantara.my.id` sebagai domain resmi utama untuk seluruh tag SEO, Canonical URL, OpenGraph, dan konfigurasi DNS IDCloudHost–Vercel, sekaligus menyediakan metode masuk Panel Admin Kurator bebas blokir pop-up melalui **Login Google Redirect** serta **Kode Akses PIN Kurator**.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Pilihan berikut telah dikonfirmasi dan akan diterapkan langsung begitu Anda menekan tombol **Proceed**:

- **Confirmed Decision 1 (Domain Utama Aplikasi)**: Menetapkan **`ziarahnusantara.my.id`** (`https://ziarahnusantara.my.id`) sebagai domain default resmi pada tag Canonical URL, OpenGraph, Schema.org JSON-LD, serta panduan DNS IDCloudHost di Panel Kurator.
- **Confirmed Decision 2 (Akses Masuk Panel Admin Kurator Tanpa Pop-up)**: Mengaktifkan dua jalur autentikasi tahan blokir browser di halaman `/admin` dan menu navigasi:
  1. **Masuk Tanpa Pop-up (Redirect Google)** serta **Autentikasi Anonim + Kode Akses PIN Kurator** agar kurator tetap bisa membuka dan menyimpan perubahan di Panel Admin meskipun browser memblokir pop-up atau domain baru sedang dalam proses propagasi.
  2. **Pengaturan Kode Akses PIN Kurator** (default awal: `ZIARAH2026`, dapat diubah kapan saja oleh Kurator di Panel Admin dan disimpan di Firestore).

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Memperbarui seluruh referensi domain default aplikasi menjadi `https://ziarahnusantara.my.id/`.
  2. Menyediakan panduan interaktif khusus **IDCloudHost (`DNSCloud.ID`)** dengan tombol salin cepat (`@` → `76.76.21.21`, `www` → `cname.vercel-dns.com`, dan pengingat mematikan toggle *Proxied* biru).
  3. Menghilangkan hambatan login di Vercel (`ziarah-theta.vercel.app` & `ziarahnusantara.my.id`) dengan menghadirkan **Login via Kode Akses PIN Kurator** di samping **Login Google (Pop-up & Redirect)**.
- **Target Audience / Persona**: Super Admin & Dewan Kurator Ziarah Nusantara yang mengelola direktori makam, rubrik kisah karomah, dan program infaq di produksi Vercel.
- **Key Value**: Kurator dapat langsung masuk ke Panel Admin dari browser mana pun tanpa terhalang *pop-up blocker* atau kendala domain baru, serta membagikan tautan `https://ziarahnusantara.my.id` di WhatsApp/sosial media dengan kartu pratinjau resmi.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Alur Masuk Cepat dengan Kode Akses PIN Kurator (`/admin`)**:
     - Saat membuka `/admin`, kurator melihat dua opsi utama yang bersih:
       - **Opsi 1: Masuk dengan Kode Akses PIN Kurator** (input PIN langsung di halaman tanpa pop-up, langsung membuka akses penuh Panel Kurator).
       - **Opsi 2: Masuk dengan Akun Google** (tersedia tombol *Pop-up* dan *Redirect Tanpa Pop-up*, dilengkapi tombol salin domain otomatis untuk *Firebase Authorized Domains*).
  2. **Alur Konfigurasi DNS IDCloudHost & Domain (`Tab Infaq & Program`)**:
     - Menampilkan kartu panduan spesifik **IDCloudHost → Vercel** untuk `ziarahnusantara.my.id`, lengkap dengan status URL Canonical aktif dan pengaturan ganti PIN Kurator.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Archival Warm Editorial (`#F9F8F4` warm paper background, `#1C1917` deep stone ink, `#065F46` forest emerald accent).
  - *Typography & Hierarchy*: `Playfair Display` untuk judul bagian kuratorial dan `Plus Jakarta Sans` untuk kontrol formulir serta tabel DNS.
  - *Interactive Feedback & Motion*: Indikator salin instan (`✓ Tersalin`) dalam `< 150ms` dan transisi tab halus saat membuka Panel Kurator.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Kombinasi Google Auth (Pop-up/Redirect) + Kode Akses PIN Kurator**
  - *Chosen Approach*: Menyediakan input **Kode Akses PIN Kurator** yang terintegrasi dengan sesi lokal & verifikasi keamanan Firestore, berdampingan dengan Google Sign-In.
  - *Why*: Browser modern dan ekstensi privasi kerap memblokir jendela pop-up OAuth pihak ketiga, atau domain baru (`.my.id` / `.vercel.app`) belum sempat didaftarkan di *Firebase Authorized Domains*. Dengan PIN Kurator, pengelola tetap dapat masuk ke `/admin` kapan saja tanpa terkunci di luar.
  - *Alternatives Considered*: Hanya mengandalkan `signInWithPopup` (ditolak karena mudah terblokir oleh browser/ekstensi seperti yang terjadi di `ziarah-theta.vercel.app`).
- **Decision 2: Resolusi Domain SEO Hibrida (`ziarahnusantara.my.id`)**
  - *Chosen Approach*: Menetapkan `https://ziarahnusantara.my.id/` sebagai nilai bawaan di HTML statis dan state awal aplikasi, sambil tetap menyinkronkan perubahan dari dokumen Firestore `settings/infaq`.
  - *Why*: Memastikan *crawler* WhatsApp, Telegram, dan Google Search langsung membaca `https://ziarahnusantara.my.id/` sejak pemuatan pertama.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   DNS IDCloudHost (ziarahnusantara.my.id)               │
│   • A Record     : Host @   ──► 76.76.21.21          (Proxy: OFF)       │
│   • CNAME Record : Host www ──► cname.vercel-dns.com (Proxy: OFF)       │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 Aplikasi Produksi Vercel & Kepala Dokumen               │
│   • Canonical, OG URL, Schema.org Default: https://ziarahnusantara.my.id│
│   • Sinkronisasi Rute Dinamis (App Root)                                │
└─────────────────┬───────────────────────────────────┬───────────────────┘
                  │                                   │
                  ▼                                   ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│   Autentikasi Bebas Blokir        │ │   Panel Admin Kurator (/admin)    │
│   • Google Sign-In (Pop-up)       │ │   • Input PIN Kurator & Ubah PIN  │
│   • Google Sign-In (Redirect)     │ │   • Pengaturan Domain .my.id      │
│   • Kode Akses PIN Kurator        │ │   • Panduan Salin DNS IDCloudHost │
└───────────────────────────────────┘ └───────────────────────────────────┘
```

- **Data Model & State**:
  - Dokumen Firestore `settings/infaq` menyimpan:
    - `customDomain`: string (default `'ziarahnusantara.my.id'`).
    - `adminPin`: string opsional untuk pembaruan kode PIN Kurator (default `'ZIARAH2026'`).
  - `localStorage` menyimpan sesi kurator terverifikasi (`ziarah_curator_pin_session`) agar kurator tidak perlu mengetik ulang PIN setiap kali memuat ulang halaman.
- **Interactive Component & State Mapping**:
  - **Form Masuk PIN Kurator**: Memvalidasi input PIN terhadap `adminPin` aktif (mendukung tombol *Masuk dengan PIN*, tekan `Enter`, pesan kesalahan jika PIN salah, dan tombol *Keluar Mode Kurator*).
  - **Pengaturan Keamanan & Domain di Panel Kurator**: Memungkinkan kurator memperbarui `customDomain` (`ziarahnusantara.my.id`) dan `adminPin` secara langsung ke Firestore.
