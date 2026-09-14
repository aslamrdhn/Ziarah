import React from 'react';
import { CheckCircle2, Scale, BookOpen, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const KebijakanKurasi: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pb-20">
      
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 sm:p-12 mb-8 shadow-sm border border-stone-200 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-brand-700 text-xs font-bold mb-6 tracking-wider uppercase">
            <span className="w-5 h-5 flex items-center justify-center border-2 border-brand-200 bg-brand-50 rounded-full text-[10px]">✓</span>
            <span>Pedoman Editorial & Standar Ilmiah</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-stone-900">
            Kebijakan Konten & <span className="text-brand-600">Moderasi Data</span>
          </h1>
          <p className="text-stone-600 max-w-3xl leading-relaxed text-sm sm:text-lg">
            Mengingat sensitivitas dan kesucian nilai sejarah para Wali dan Ulama Nusantara, setiap data lokasi, silsilah, dan narasi sejarah yang dipublikasikan di platform Ziarah Nusantara tunduk pada proses kurasi multi-tahap yang transparan dan dapat dipertanggungjawabkan.
          </p>
        </div>
      </motion.div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-brand-50 rounded-2xl border border-brand-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-7 h-7 text-brand-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-4 tracking-tight">1. Verifikasi Multi-Tahap</h2>
          <p className="text-sm text-stone-500 mb-6 flex-1">
            Data awal dan usulan masyarakat tidak langsung dipublikasikan. Alur verifikasi berlangsung melalui 4 status ketat:
          </p>
          <ul className="space-y-4 text-sm text-stone-700 font-medium">
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-stone-400 mt-1.5 mr-3 shrink-0"></span><strong>Pending:</strong> Usulan masuk dari masyarakat / peziarah.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 mr-3 shrink-0"></span><strong>Reviewed:</strong> Divalidasi oleh dewan kurator sejarah Islam.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-1.5 mr-3 shrink-0"></span><strong>Approved:</strong> Titik koordinat & biografi resmi tayang.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 mr-3 shrink-0"></span><strong>Rejected:</strong> Ditolak jika fiktif, SARA, atau duplikat.</li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center mb-6">
            <Scale className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-4 tracking-tight">2. Penanganan Sengketa</h2>
          <p className="text-sm text-stone-500 mb-6 flex-1">
            Dalam sejarah Islam Nusantara, wajar terdapat perbedaan penuturan manuskrip atau tradisi lisan (babad, prasasti, lontar).
          </p>
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-sm text-stone-700 italic">
            <strong className="text-amber-700 not-italic block mb-1">Aturan Editorial:</strong> Jika terdapat perbedaan riwayat atau lebih dari satu petilasan makam, sistem menyertakan "Catatan Kritis & Variasi Riwayat" transparan tanpa memaksakan satu klaim mutlak.
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-center mb-6">
            <BookOpen className="w-7 h-7 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-4 tracking-tight">3. Rujukan & Dewan Kurator</h2>
          <p className="text-sm text-stone-500 mb-6 flex-1">
            Basis data ziarah kami diselaraskan dengan rujukan otoritatif seperti:
          </p>
          <ul className="space-y-3 text-sm text-stone-700 font-medium list-none">
            <li className="flex items-start"><span className="text-indigo-500 mr-3">✦</span>Kementerian Agama Republik Indonesia (Direktorat Zawa).</li>
            <li className="flex items-start"><span className="text-indigo-500 mr-3">✦</span>Buku <em>Atlas Wali Songo</em> karya KH. Agus Sunyoto / LESBUMI PBNU.</li>
            <li className="flex items-start"><span className="text-indigo-500 mr-3">✦</span>Manuskrip Babad Cirebon, Babad Demak, dan Carita Purwaka Caruban.</li>
            <li className="flex items-start"><span className="text-indigo-500 mr-3">✦</span>Silsilah resmi Rabithah Alawiyah & Lembaga Nasab Nasional.</li>
          </ul>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-center mb-6">
            <Globe className="w-7 h-7 text-sky-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-4 tracking-tight">4. Standar Spasial PostGIS</h2>
          <p className="text-sm text-stone-500 mb-6 flex-1">
            Semua koordinat makam disimpan menggunakan standar GeoJSON dan indeks spasial <strong className="text-sky-700">GiST PostGIS (EPSG:4326)</strong> dengan urutan bujur/lintang <code>[longitude, latitude]</code> untuk memastikan integrasi akurat dengan peta rute Google Maps navigasi lapangan.
          </p>
        </motion.div>

      </div>
    </div>
  );
};
