# Rencana Pengembangan Strategis Ziarah Nusantara: UX Lapangan, GIS Terpadu & Ketahanan Offline-First

Transformasi **Ziarah Nusantara** dari prototipe direktori menjadi aplikasi lapangan skala produksi yang dirancang khusus untuk kondisi nyata peziarah di area makam (di bawah terik matahari, navigasi satu tangan, sinyal seluler terbatas, dan kebutuhan rombongan).

## User Review & Critical Decisions

> [!IMPORTANT]
> Berikut adalah keputusan produk yang telah dikonfirmasi dari sesi tanya-jawab dan siap dieksekusi setelah Anda menyetujui rencana ini:

- **Fokus Fase Eksekusi**:
  1. **Fase 1 (UX Lapangan, Wake Lock & Tasbih Haptic)**: Prioritas utama untuk kenyamanan ibadah langsung di lokasi maqbarah.
  2. **Fase 4 (Peta GIS, Clustering, Jalur Wali Songo, Filter Radius GPS & Bottom Sheet)**: Peningkatan menyeluruh pengalaman pemetaan interaktif.
  3. **Fase 2 (Optimalisasi Precache Offline-First PWA)**: Memastikan bacaan Yasin, Tahlil, Tawassul, dan direktori 96 makam tetap dapat diakses 100% tanpa sinyal internet.
- **Arsitektur Backend & Persistensi**: Tetap mempertahankan **Firebase Cloud Firestore** yang sudah aktif dan terintegrasi untuk penyimpanan data makam, verifikasi bukti transfer donasi, dan antrean moderasi kontribusi kurator, dilengkapi dengan sinkronisasi lokal otomatis (`localStorage` & cache PWA) untuk mode luar jaringan (*offline*).
- **Metadata Logistik Makam**: Menambahkan informasi **Jadwal Haul Tahunan** serta **Ketentuan Adab Lokal & Pesan Juru Kunci** pada profil detail setiap makam untuk memandu ketua rombongan dan peziarah.
- **Fitur Interaktif Peta Rute**:
  - **Jalur Ziarah Wali Songo Terpadu** (garis rute berurutan Jawa Timur, Jawa Tengah, dan Jawa Barat/Cirebon-Banten).
  - **Custom Pin Berwarna per Kategori & Pengelompokan Titik Padat (Marker Clustering)**.
  - **Filter Radius Jarak Terdekat** dari titik GPS peziarah saat ini (mis. radius 15 km / 50 km / 100 km).
  - **Slide-up Bottom Sheet** ergonomis di bagian bawah layar ponsel saat pin makam diketuk.

---

## 1. Overview & Core Concept

- **What It Does**: Menyediakan ekosistem pendamping ziarah ujung-ke-ujung (*end-to-end*) yang memadukan direktori 96 situs makam terverifikasi, pemetaan GIS dengan rute kurasi Wali Songo & deteksi jarak terdekat, panduan doa lapangan (Salam, Tawassul, Yasin, Tahlil, Doa Arwah) dengan layar anti-mati otomatis (*Screen Wake Lock*) dan mode kontras matahari (*Outdoor Mode*), serta tasbih digital bergetar (*haptic feedback*).
- **Target Audience / Persona**:
  - **Peziarah Lapangan & Lansia**: Membutuhkan huruf Arab yang besar, jelas di bawah sinar matahari langsung, layar ponsel tidak mati sendiri saat membaca Yasin/Tahlil, dan tasbih yang memberikan getaran fisik tanpa perlu menatap layar.
  - **Ketua Rombongan & Keluarga**: Membutuhkan panduan rute berurutan (Jalur Wali Songo), informasi jadwal haul tahunan, aturan adab lokal maqbarah, serta navigasi cepat satu jari ke Google Maps.
- **Key Value**: Mengatasi tiga hambatan terbesar saat berziarah di lapangan: keterbacaan visual di area terbuka, putusnya sinyal internet di daerah pelosok/perbukitan makam, dan kebingungan menentukan urutan rute perjalanan ziarah.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Alur Ibadah di Maqbarah (Panduan Ziarah & Tasbih Haptic)**:
     - Peziarah membuka halaman Panduan Ziarah → sistem otomatis mengaktifkan **Screen Wake Lock API** (ditandai indikator status *"Layar Tetap Menyala"* di bilah kontrol atas).
     - Jika berada di bawah terik matahari, peziarah menekan tombol **Mode Luar Ruangan (Kontras Tinggi WCAG AAA)** yang mengubah kanvas bacaan menjadi putih murni (`#FFFFFF`) dengan tinta hitam pekat (`#0A0A0A`) dan garis pembatas tegas.
     - Saat mengetuk tombol **Tasbih Digital**, ponsel memberikan getaran pendek (`15ms`) di setiap ketukan dan getaran ganda (`[40ms, 60ms, 40ms]`) saat mencapai target putaran 33 atau 100. Hitungan dan jumlah putaran tersimpan otomatis di `localStorage` sehingga aman meski berpindah halaman.
  2. **Alur Eksplorasi Peta GIS, Jalur Wali Songo & Radius Terdekat**:
     - Peziarah membuka Peta Rute → melihat pin makam dengan ikon dan warna berbeda untuk **Walisongo** (Hijau Zamrud), **Ulama Nusantara** (Biru Lapis), **Habaib** (Emas Amber), dan **Auliya Nusantara** (Cokelat Terakota).
     - Pada level zoom kepulauan/provinsi, titik-titik yang berdekatan dikelompokkan dalam **Cluster Lingkaran Angka** yang rapi dan otomatis memekar saat diperbesar.
     - Peziarah dapat mengaktifkan **Jalur Ziarah Wali Songo** (Jawa Timur, Jawa Tengah, atau Jawa Barat) untuk menampilkan garis rute perjalanan berurutan (*polyline*) dari titik pertama hingga terakhir, atau menekan tombol **Makam Terdekat dari Lokasi Saya** untuk memfilter makam dalam radius GPS (15 km, 50 km, 100 km).
     - Saat salah satu pin makam diketuk di ponsel, muncul **Slide-Up Bottom Sheet** di sepertiga bawah layar (mudah dijangkau ibu jari) yang menampilkan foto makam, kategori, jarak kilometer dari pengguna, jadwal haul/adab singkat, tombol *"Buka Detail Lengkap"*, dan tombol langsung *"Rute Google Maps"*.
  3. **Alur Informasi Haul & Adab Lokal Juru Kunci**:
     - Pada panel detail makam, peziarah dan ketua rombongan dapat langsung melihat kartu informasi **Jadwal Haul Tahunan & Ketentuan Adab Lokal** (waktu terbaik berkunjung, adab berpakaian/ketertiban di area maqbarah, dan tradisi majelis setempat).

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: **Editorial Heritage & Tactile Field Utility** — memadukan keanggunan katalog museum/manuskrip (`#F9F8F4` Warm Alabaster, `#0D3B32` Deep Emerald, `#C5A059` Antique Gold) dengan mode lapangan berkontras tinggi (*Outdoor Daylight Mode* rasio kontras $\ge 7:1$ WCAG AAA).
  - *Typography & Hierarchy*:
    - Judul & Tajuk Sejarah: *Playfair Display* / *Lora* untuk kesan otoritatif dan klasik.
    - Teks Arab Doa & Yasin/Tahlil: *Amiri* dengan jarak baris longgar (`leading-[2.5]`) agar harakat terbaca jelas oleh lansia, dilengkapi pengatur ukuran 3 tingkat (`A`, `A+`, `A++`) dan Mode Fokus Bacaan.
    - Antarmuka & Kontrol Lapangan: *Plus Jakarta Sans* dengan angka tabular (`tabular-nums`) pada penghitung tasbih dan indikator jarak kilometer.
  - *Touch Target & Ergonomics*: Seluruh tombol interaktif di halaman doa, tasbih, dan peta memiliki area sentuh minimal $44 \times 44\text{px}$, dan total elemen melayang (*sticky header + bottom nav*) dijaga ketat di bawah 15% tinggi layar ponsel.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Mempertahankan Cloud Firestore + Offline Cache Lokal (Bukan Migrasi ke Supabase)**
  - *Chosen Approach*: Menggunakan Firebase Cloud Firestore yang sudah terhubung penuh untuk koleksi situs makam, donasi dengan bukti transfer, dan moderasi kontribusi, ditambah penyimpanan luring (*localStorage* & *Workbox Runtime Caching*).
  - *Why*: Aplikasi sudah memiliki alur autentikasi kurator, aturan keamanan Firestore, dan verifikasi donasi yang berjalan stabil. Menambahkan lapisan cache lokal dan perhitungan jarak spasial (*Haversine distance formula*) langsung di sisi klien untuk 96+ titik makam memberikan respon instan (<1 milidetik) bahkan saat peziarah kehilangan sinyal di area perbukitan makam.
  - *Alternatives Considered*: Migrasi ke Supabase + PostGIS ditangguhkan karena 96–500 titik koordinat dapat dihitung jarak radiusnya secara instan di memori perangkat tanpa membebani latensi jaringan di lapangan.

- **Decision 2: Slide-Up Bottom Sheet Menggantikan Popup Balon Leaflet di Layar Seluler**
  - *Chosen Approach*: Ketika pengguna mengetuk marker di peta, tampilkan *Bottom Sheet* ringkas di bagian bawah layar untuk pratinjau cepat (nama makam, jarak km dari GPS pengguna, jadwal haul, tombol *Buka Detail Arsip* & *Rute Google Maps*), sebelum membuka laci detail penuh jika diinginkan.
  - *Why*: Balon popup standar di tengah peta sering terpotong tepi layar ponsel dan sulit dijangkau dengan satu tangan saat peziarah sedang berjalan.

- **Decision 3: Pengelompokan Titik (Clustering) Berbasis Grid Spasial Ringan**
  - *Chosen Approach*: Mengimplementasikan pengelompokan marker dinamis berbasis level *zoom* peta dengan indikator jumlah situs di setiap klaster wilayah (mis. klaster padat Jalur Pantura Jawa Timur & Jawa Tengah).
  - *Why*: Mencegah penumpukan puluhan pin di Pulau Jawa pada tampilan awal sekaligus menjaga performa render peta tetap ringan tanpa konflik dependensi React 19.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   ZIARAH NUSANTARA — FIELD PWA ARCHITECTURE                │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│  PANDUAN & IBADAH    │   │   PETA GIS & RUTE    │   │  ARSIP, HAUL & ADAB  │
│  LAPANGAN (FASE 1)   │   │   TERPADU (FASE 4)   │   │  KURATOR (FASE 3/5)  │
├──────────────────────┤   ├──────────────────────┤   ├──────────────────────┤
│ • Screen Wake Lock   │   │ • Custom Category    │   │ • Jadwal Haul &      │
│   Controller         │   │   SVG Pins           │   │   Ketentuan Adab     │
│ • Outdoor High-      │   │ • Dynamic Zoom       │   │   Juru Kunci         │
│   Contrast Toggle    │   │   Marker Clustering  │   │ • Moderasi Usulan    │
│   (WCAG AAA 7:1+)    │   │ • Jalur Wali Songo   │   │   Komunitas + Sitasi │
│ • Typography & Focus │   │   Route Polylines    │   │ • Transparansi       │
│   Reading Toolbar    │   │ • GPS Haversine      │   │   Donasi Operasional │
│ • Haptic Tasbih      │   │   Radius Filter      │   │   & Bukti Transfer   │
│   (Vibrate + Persist)│   │ • Thumb-Zone         │   │ • Pre-rendered SEO   │
│                      │   │   Bottom Sheet       │   │   & JSON-LD Schema   │
└──────────┬───────────┘   └──────────┬───────────┘   └──────────┬───────────┘
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│             OFFLINE-FIRST DATA & SERVICE WORKER LAYER (FASE 2)             │
├────────────────────────────────────────────────────────────────────────────┤
│ • Firebase Cloud Firestore (Real-time Sites, Donations, Contributions)     │
│ • LocalStorage Persistence (Tasbih State, Outdoor Mode, Cached Sites)      │
│ • Workbox PWA Precache & Tile/Image Runtime Caching (Airplane Mode Ready)  │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State Enhancements**:
  - **Atribut Logistik & Adab pada Entitas Makam (`ZiarahSite`)**:
    - `haulSchedule`: Waktu pelaksanaan haul akbar tahunan (mis. *"10 Muharram / Bulan Syawal / Ahad Akhir Sya'ban"*).
    - `localAdab`: Ketentuan adab lokal dan pesan juru kunci setempat (mis. *"Menjaga ketenangan di area cungkup utama, berpakaian sopan menutup aurat, dan mengikuti jalur antrean peziarah"*).
  - **Kurasi Jalur Ziarah (`CuratedRoute`)**:
    - Rute terstruktur berisi urutan titik koordinat makam:
      1. *Jalur Wali Songo Jawa Timur* (Sunan Ampel → Sunan Giri → Maulana Malik Ibrahim → Sunan Drajat → Sunan Bonang).
      2. *Jalur Wali Songo Jawa Tengah* (Sunan Muria → Sunan Kudus → Sunan Kalijaga).
      3. *Jalur Kesultanan Cirebon & Banten* (Sunan Gunung Jati → Syekh Datuk Kahfi → Sultan Maulana Hasanuddin Banten).
  - **Persistensi Tasbih & Preferensi Bacaan**:
    - Menyimpan `{ count, target, totalLoops, outdoorMode, fontSize, showLatin, showTerjemahan }` di `localStorage` agar tidak ter-reset saat pengguna berpindah ke halaman Peta atau Doa Khusus.

- **Interactive Component & State Mapping**:
  - **Wake Lock Lifecycle**: Saat komponen Panduan Ziarah dibuka, sistem memanggil `navigator.wakeLock.request('screen')` dan otomatis meminta ulang (*re-acquire*) ketika tab kembali aktif (`visibilitychange`), serta melepaskannya saat pengguna meninggalkan halaman. Jika pengguna juga menyediakan kontrol manual *"Jaga Layar Menyala"*, statusnya ditampilkan secara jujur.
  - **Haptic Tasbih Engine**: Setiap ketukan memicu `navigator.vibrate(15)` (bila didukung perangkat) dan menambah hitungan. Saat mencapai kelipatan 33 atau 100, memicu `navigator.vibrate([40, 60, 40])` dan menambah penghitung putaran (*Putaran ke-N*).
  - **GIS Filter & Bottom Sheet Workflow**:
    - Pengguna memilih filter **Jalur Rute** atau **Radius Terdekat (GPS)** pada bilah kontrol peta.
    - Peta menggambar garis jalur (*Polyline*) berurutan lengkap dengan nomor urut ziarah (`1`, `2`, `3`...) atau lingkaran cakupan radius GPS pengguna.
    - Mengetuk pin membuka *Slide-Up Bottom Sheet* ringkas di bagian bawah layar berisi jarak (km), jadwal haul, tombol *"Rute Google Maps"*, dan tombol *"Buka Arsip & Doa Lengkap"* yang membuka panel informasi menyeluruh.
  - **Workbox Offline Caching**: Menambahkan aturan *runtime caching* untuk *tile* peta OpenStreetMap yang telah dilihat pengguna serta *precache* penuh untuk bundel bacaan Yasin, Tahlil, dan 96 profil makam agar aplikasi tetap berfungsi di mode pesawat (*airplane mode*).
