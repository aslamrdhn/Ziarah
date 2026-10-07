import React from 'react';
import { CheckCircle2, Scale, BookOpen, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const KebijakanKurasi: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pt-4 pb-24">
      
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 mb-6 sm:mb-8 shadow-xs border border-slate-200/90 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-4 tracking-wider uppercase">
            <span className="w-5 h-5 flex items-center justify-center bg-emerald-100/80 text-emerald-800 rounded-full text-[10px] font-black">✓</span>
            <span>Pedoman Editorial & Standar Ilmiah</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black mb-4 leading-tight tracking-tight text-slate-900">
            Kebijakan Konten & <span className="bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">Moderasi Data</span>
          </h1>
          <p className="text-slate-600 max-w-3xl leading-relaxed text-xs sm:text-base">
            Mengingat sensitivitas dan kesucian nilai sejarah para Wali dan Ulama Nusantara, setiap data lokasi, silsilah, dan narasi sejarah yang dipublikasikan di platform Ziarah Nusantara tunduk pada proses kurasi multi-tahap yang transparan dan dapat dipertanggungjawabkan.
          </p>
        </div>
      </motion.div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-lg font-serif font-black text-slate-900 mb-3 tracking-tight">1. Verifikasi Multi-Tahap</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 flex-1">
            Data awal dan usulan masyarakat tidak langsung dipublikasikan. Alur verifikasi berlangsung melalui 4 status ketat:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1.5 mr-3 shrink-0"></span><strong>Pending:</strong> Usulan masuk dari masyarakat / peziarah.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 mr-3 shrink-0"></span><strong>Reviewed:</strong> Divalidasi oleh dewan kurator sejarah Islam.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1.5 mr-3 shrink-0"></span><strong>Approved:</strong> Titik koordinat & biografi resmi tayang.</li>
            <li className="flex items-start"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 mr-3 shrink-0"></span><strong>Rejected:</strong> Ditolak jika fiktif, SARA, atau duplikat.</li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mb-5">
            <Scale className="w-6 h-6 text-amber-700" />
          </div>
          <h2 className="text-lg font-serif font-black text-slate-900 mb-3 tracking-tight">2. Penanganan Sengketa</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 flex-1">
            Dalam sejarah Islam Nusantara, wajar terdapat perbedaan penuturan manuskrip atau tradisi lisan (babad, prasasti, lontar).
          </p>
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 italic">
            <strong className="text-amber-800 not-italic block mb-1 font-bold">Aturan Editorial:</strong> Jika terdapat perbedaan riwayat atau lebih dari satu petilasan makam, sistem menyertakan "Catatan Kritis & Variasi Riwayat" transparan tanpa memaksakan satu klaim mutlak.
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-center mb-5">
            <BookOpen className="w-6 h-6 text-indigo-700" />
          </div>
          <h2 className="text-lg font-serif font-black text-slate-900 mb-3 tracking-tight">3. Rujukan & Dewan Kurator</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 flex-1">
            Basis data ziarah kami diselaraskan dengan rujukan otoritatif seperti:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium list-none">
            <li className="flex items-start"><span className="text-indigo-600 mr-2.5 font-bold">✦</span>Kementerian Agama Republik Indonesia (Direktorat Zawa).</li>
            <li className="flex items-start"><span className="text-indigo-600 mr-2.5 font-bold">✦</span>Buku <em>Atlas Wali Songo</em> karya KH. Agus Sunyoto / LESBUMI PBNU.</li>
            <li className="flex items-start"><span className="text-indigo-600 mr-2.5 font-bold">✦</span>Manuskrip Babad Cirebon, Babad Demak, dan Carita Purwaka Caruban.</li>
            <li className="flex items-start"><span className="text-indigo-600 mr-2.5 font-bold">✦</span>Silsilah resmi Rabithah Alawiyah & Lembaga Nasab Nasional.</li>
          </ul>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-center mb-5">
            <Globe className="w-6 h-6 text-sky-700" />
          </div>
          <h2 className="text-lg font-serif font-black text-slate-900 mb-3 tracking-tight">4. Standar Spasial PostGIS</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 flex-1 leading-relaxed">
            Semua koordinat makam disimpan menggunakan standar GeoJSON dan indeks spasial <strong className="text-sky-800">GiST PostGIS (EPSG:4326)</strong> dengan urutan bujur/lintang <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] text-slate-800">[longitude, latitude]</code> untuk memastikan integrasi akurat dengan peta rute Google Maps navigasi lapangan.
          </p>
        </motion.div>

      </div>
    </div>
  );
};
