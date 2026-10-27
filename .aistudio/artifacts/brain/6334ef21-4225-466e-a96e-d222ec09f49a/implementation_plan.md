# Rencana Optimasi SEO Google Search Console, Sitemap.xml, & Robots.txt (`ziarahnusantara.my.id`)

Rencana ini menindaklanjuti instruksi pemasangan Meta Tag SEO dengan kata kunci persis **"Ziarah Nusantara"** serta pembuatan file `robots.txt` dan `sitemap.xml` agar fitur **Peta Situs (Sitemaps)** di Google Search Console berfungsi penuh pada domain resmi **`https://ziarahnusantara.my.id`**.

---

## 1. Pembaruan Meta Tag SEO Utama (`index.html` & `src/App.tsx`)
Memastikan Google mengindeks situs dengan nama dan kata kunci utama **Ziarah Nusantara** secara konsisten baik saat pertama kali di-crawl (HTML statis) maupun saat navigasi SPA:
- **Judul Utama (`<title>`, `og:title`, `twitter:title`)**:
  `Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara`
- **Deskripsi Utama (`<meta name="description">`, `og:description`, `twitter:description`)**:
  `Ziarah Nusantara adalah platform panduan dan informasi jejak spiritual makam para Waliyullah, ulama, dan tokoh bersejarah di seluruh Nusantara.`
- **Canonical & Structured Data JSON-LD**:
  Menjaga URL kanonikal pada `https://ziarahnusantara.my.id/` serta menyelaraskan deskripsi skema `WebSite` dan `EducationalOrganization` dengan kata kunci di atas.

---

## 2. Pembuatan `public/robots.txt` & `public/sitemap.xml`
Membuat dua file statis di dalam folder `public/` (yang otomatis disalin ke root `dist/` oleh Vite saat build di Vercel):
- **`public/robots.txt`**:
  Mengizinkan seluruh crawler mesin pencari (`User-agent: *`, `Allow: /`) dan mengarahkan langsung ke `Sitemap: https://ziarahnusantara.my.id/sitemap.xml`.
- **`public/sitemap.xml`**:
  Berisi daftar URL lengkap dalam format protokol Sitemap 0.9 dengan `<lastmod>2026-10-27</lastmod>` yang mencakup:
  - `https://ziarahnusantara.my.id/` (`priority: 1.0`, `changefreq: weekly`)
  - `https://ziarahnusantara.my.id/peta` (`priority: 0.9`, `changefreq: weekly`)
  - `https://ziarahnusantara.my.id/direktori` (`priority: 0.9`, `changefreq: weekly`)
  - `https://ziarahnusantara.my.id/rubrik` (`priority: 0.8`, `changefreq: weekly`)
  - `https://ziarahnusantara.my.id/panduan` (`priority: 0.8`, `changefreq: monthly`)
  - `https://ziarahnusantara.my.id/infaq` (`priority: 0.7`, `changefreq: monthly`)
  - `https://ziarahnusantara.my.id/kontribusi` (`priority: 0.7`, `changefreq: monthly`)
- **Pengecualian Rewrite di `vercel.json`**:
  Memastikan rute `/sitemap.xml` dan `/robots.txt` dilayani langsung sebagai file XML/teks statis oleh Vercel dan tidak tertimpa oleh fallback SPA `/index.html`.

---

## 3. Pintasan Cek Sitemap & Panduan Google Search Console di Panel Kurator (`src/views/AdminKurator.tsx`)
Menambahkan kartu **Google Search Console & Peta Situs (Sitemap)** di dalam tab **Domain & Hosting** pada Panel Admin Kurator yang menyediakan:
- Tombol salin cepat URL `https://ziarahnusantara.my.id/sitemap.xml` untuk ditempelkan ke menu **Peta Situs** di Google Search Console.
- Tombol pintasan langsung untuk membuka dan memverifikasi `/sitemap.xml` serta `/robots.txt` di tab baru setelah ter-deploy di Vercel.
