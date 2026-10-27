# Rencana Perbaikan Deployment Vercel (`404: NOT_FOUND`) & Integrasi Domain

## 1. Diagnosis Masalah
Berdasarkan pemeriksaan pada kode repositori dan tangkapan layar dashboard Vercel (`ziarah-nusantara.vercel.app`), halaman **`404: NOT_FOUND` (`This page doesn't exist`)** muncul karena dua hal:
1. **Konfigurasi Build & Folder Output (`dist`) Belum Terkunci di `vercel.json`**: File `vercel.json` saat ini hanya berisi aturan `rewrites` tanpa mendeklarasikan `framework`, `buildCommand`, dan `outputDirectory`. Akibatnya, saat Vercel mengimpor repositori tanpa preset Vite yang aktif (terlihat dari munculnya notifikasi **`Deployment Settings: 3 Recommendations`** di dashboard Vercel), Vercel tidak menyajikan hasil build dari folder `dist/index.html`.
2. **Perubahan Terbaru di AI Studio Belum Ter-push ke GitHub**: Deployment di Vercel masih membaca commit lama (`59486d0`) pada branch `main`.

---

## 2. Perubahan Teknis yang Akan Dilakukan

### A. Pembaruan Konfigurasi `/vercel.json`
Mengunci pengaturan build dan output secara eksplisit di dalam `/vercel.json` agar Vercel otomatis mengenali proyek sebagai aplikasi **Vite**, menjalankan perintah build yang benar, menyajikan folder **`dist`**, dan menangani navigasi halaman Single Page Application (React Router) serta Service Worker PWA tanpa error 404:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/((?!assets/|pwa-|icon\\.svg|manifest\\.webmanifest|sw\\.js|workbox-).*)",
      "destination": "/index.html"
    }
  ]
}
```

### B. Verifikasi Build Produksi (`compile_applet`)
Menjalankan pengujian kompilasi penuh untuk memastikan seluruh bundel aplikasi, aset PWA (`manifest.webmanifest`, `sw.js`), dan halaman `dist/index.html` terbangun tanpa error.

---

## 3. Langkah Sinkronisasi Setelah Kode Diperbarui
Setelah perubahan pada `/vercel.json` diterapkan, saya juga akan menyertakan panduan ringkas 3 langkah untuk Anda lakukan:
1. **Push dari AI Studio ke GitHub**: Klik ikon **GitHub** di pojok kanan atas AI Studio untuk melakukan *Commit & Push* perubahan terbaru ke branch `main`.
2. **Verifikasi Pengaturan Vercel (Deployment Settings)**: Memastikan **Root Directory** kosong (`./`) dan menerima rekomendasi preset **Vite** pada bagian *Deployment Settings (3 Recommendations)* di dashboard Vercel bila diperlukan.
3. **Menambahkan Domain ke Firebase Authentication**: Menambahkan `ziarah-nusantara.vercel.app` ke **Firebase Console → Authentication → Settings → Authorized domains** agar fitur Login Google dan Panel Kurator berjalan lancar di domain Vercel.
