# Solusi Tuntas "Tidak Dapat Membaca Peta Situs" di Google Search Console

Rencana ini mengatasi masalah status **"Tidak dapat mengambil peta situs" (`Tidak dapat membaca peta situs`)** dan **"URL tidak ada di Google"** pada Google Search Console untuk **`https://ziarahnusantara.my.id`**, baik dari sisi teknis kode/server Vercel maupun langkah pemicu indeks di dashboard Google Search Console.

---

## User Review & Keputusan Penting

> [!IMPORTANT]
> **Mengapa Terjadi "Tidak dapat membaca peta situs" & "URL tidak ada di Google"?**
> 1. **Domain Baru Belum Pernah Di-crawl Sama Sekali (`URL tidak ada di Google`)**: Saat Anda memasukkan URL ke kotak Inspeksi URL dan muncul tulisan *"URL tidak ada di Google"*, itu artinya Googlebot **belum mengindeks halaman utama (`https://ziarahnusantara.my.id/`) sama sekali**. Untuk domain `.my.id` yang baru dibuat, Google tidak akan memproses *sitemap* sebelum halaman utamanya diminta pengindeksan (*Request Indexing*) atau diuji via tombol **Uji URL Aktif (Test Live URL)**.
> 2. **Bug Properti Domain (`sc-domain:ziarahnusantara.my.id`) & Cache URL Sitemap**: Di Google Search Console, jika sebuah URL *sitemap* (`sitemap.xml`) pernah gagal/tertunda satu kali pada properti `sc-domain`, Google mengunci (*cache*) status *"Tidak dapat membaca peta situs"* untuk nama file tersebut meskipun dikirim ulang berkali-kali.
> 3. **Penyederhanaan Skema XML & Header Vercel**: Google telah menghentikan dukungan tag `<changefreq>` dan `<priority>` di dalam `sitemap.xml`, serta lebih stabil membaca *header* `application/xml` dengan *caching* CDN standar dibandingkan `max-age=0, must-revalidate`.

- **Keputusan Terkonfirmasi 1**: Pesan detail di Search Console adalah **"Tidak dapat membaca peta situs"** dan status inspeksi awal adalah **"URL tidak ada di Google"**.
- **Keputusan Terkonfirmasi 2**: Kita akan menyediakan file peta situs dengan nama baru yang bersih dari *cache* kegagalan Google (**`/sitemap-utama.xml`** dan **`/sitemap_index.xml`**) sekaligus membersihkan format XML dan panduan langkah klik di Google Search Console.

---

## 1. Gambaran Umum & Konsep Utama

- **Apa yang Dilakukan**:
  1. Memperbarui generator *sitemap* pasca-*build* agar menghasilkan struktur XML paling murni sesuai standar spesifikasi terbaru Google (hanya elemen `<url><loc>...</loc></url>` tanpa atribut yang sudah didepresiasi Google).
  2. Menghasilkan file baru **`/sitemap-utama.xml`** dan **`/sitemap_index.xml`** agar saat Anda memasukkannya ke Google Search Console, Google menganggapnya sebagai URL baru (tidak terkena *cache* merah dari `sitemap.xml` sebelumnya).
  3. Menyesuaikan konfigurasi *header* dan *rewrite* di Vercel agar merespons semua varian URL *sitemap* dengan cepat dari *Edge CDN*.
- **Nilai Utama**: Memutus *cache* status gagal di Google Search Console dan memastikan Googlebot langsung membaca daftar 106 halaman situs Ziarah Nusantara.

---

## 2. Pengalaman Pengguna & Langkah di Google Search Console

> [!NOTE]
> Setelah kode ini di-*push* dan di-*deploy* ke Vercel, lakukan **3 langkah wajib** berikut di layar Google Search Console Anda (hanya butuh 2 menit):

1. **Langkah 1 — Paksa Googlebot Mengunjungi Halaman Utama (Wajib karena status masih "URL tidak ada di Google")**:
   - Ketik **`https://ziarahnusantara.my.id/`** di kotak pencarian paling atas (**"Periksa semua URL di ziarahnusantara.my.id"**) lalu tekan **Enter**.
   - Saat muncul layar **"URL tidak ada di Google"**, klik tombol **"UJI URL AKTIF"** (*Test Live URL*) di pojok kanan atas.
   - Tunggu 10–15 detik hingga berubah menjadi hijau (**"URL tersedia untuk Google"**), lalu klik tombol **"MINTA PENGINDEKSAN"** (*Request Indexing*).
2. **Langkah 2 — Gunakan Properti "Awalan URL" (`URL Prefix`) sebagai Pendamping**:
   - Klik dropdown **`ziarahnusantara.my.id`** di pojok kiri atas Google Search Console -> pilih **`+ Tambahkan properti`**.
   - Pilih kotak sebelah kanan: **Awalan URL (URL Prefix)** -> masukkan **`https://ziarahnusantara.my.id`** -> klik **Lanjutkan** (akan langsung terverifikasi otomatis tanpa perlu atur DNS lagi).
3. **Langkah 3 — Kirim Nama File Sitemap Baru (`sitemap-utama.xml`)**:
   - Masuk ke menu **Peta Situs (Sitemaps)** pada properti **Awalan URL (`https://ziarahnusantara.my.id`)** tersebut.
   - Ketik **`sitemap-utama.xml`** lalu klik **KIRIM**.

---

## 3. Keputusan Teknis & Trade-Off

- **Keputusan 1: Menghapus Tag `<changefreq>` dan `<priority>` dari XML Sitemap**
  - *Pendekatan*: Menyisakan tag wajib `<loc>` saja di dalam setiap blok `<url>`.
  - *Alasan*: Dokumentasi resmi Google Search Central menyatakan Google mengabaikan `<priority>` dan `<changefreq>`, dan struktur XML yang hanya berisi `<loc>` memiliki ukuran lebih kecil serta bebas dari potensi penolakan *strict parser* Googlebot.
- **Keputusan 2: Menyediakan Endpoint `/sitemap-utama.xml` dan `/sitemap_index.xml`**
  - *Pendekatan*: Membuat file fisik tambahan `sitemap-utama.xml` dan `sitemap_index.xml` selain `sitemap.xml`.
  - *Alasan*: Google Search Console menyimpan *cache* status gagal berdasarkan URL. Menggunakan nama file baru memaksa antrean Googlebot melakukan pengambilan (*fetch*) baru dari nol.

---

## 4. Arsitektur Teknis & Alur Pengambilan Sitemap

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Google Search Console & Googlebot                │
└──────────────────┬────────────────────────────────┬──────────────────┘
                   │ 1. Uji URL Aktif / Indexing    │ 2. Fetch Sitemap Baru
                   ▼                                ▼
┌──────────────────────────────────┐ ┌─────────────────────────────────┐
│  https://ziarahnusantara.my.id/  │ │ /sitemap-utama.xml              │
│  (Pre-rendered HTML + Meta SEO)  │ │ /sitemap_index.xml              │
│  Status: HTTP 200 OK             │ │ /sitemap.xml & /sitemap.txt     │
└──────────────────────────────────┘ └──────────────┬──────────────────┘
                                                    │
                                                    ▼
                                     ┌─────────────────────────────────┐
                                     │ Vercel Edge CDN Header          │
                                     │ Content-Type: application/xml   │
                                     │ Cache-Control: public, s-maxage │
                                     │ 106 Canonical URLs (<loc> only) │
                                     └─────────────────────────────────┘
```
