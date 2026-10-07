import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KontribusiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KontribusiModal: React.FC<KontribusiModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'baru' | 'karomah' | 'doa'>('baru');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.93, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200/90 relative z-10"
        >
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-5 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-1.5 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>KONTRIBUSI KOMUNITAS PEZIARAH</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 mb-1 tracking-tight">Usulkan Makam / Pembaruan Data</h2>
              <p className="text-xs sm:text-sm text-slate-500">Bantu lengkapi basis data ziarah makam wali dan ulama di Indonesia. Setiap usulan akan diverifikasi oleh dewan kurator.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors mt-0.5 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-white">
            <div className="mb-6">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2.5 tracking-wide">Jenis Kontribusi:</label>
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
                {[
                  { id: 'baru', label: 'Lokasi Makam' },
                  { id: 'karomah', label: 'Rubrik' },
                  { id: 'doa', label: 'Doa Khusus' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                      activeTab === tab.id 
                        ? 'bg-white text-emerald-800 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 mb-6">
              <p className="text-xs sm:text-sm font-bold text-emerald-950">Pratinjau Pengajuan</p>
              <p className="text-xs text-emerald-800 mt-1">Formulir kontribusi siap dikurasi. Silakan isi informasi selengkap mungkin untuk mempermudah proses verifikasi lapangan.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Anda *</label>
                  <input required type="text" placeholder="Contoh: Hamba Allah / Nama Asli" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email / No. HP (Rahasia)</label>
                  <input type="text" placeholder="Untuk info status publikasi" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                </div>
              </div>

              {activeTab === 'baru' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Makam / Waliyullah *</label>
                      <input required type="text" placeholder="Contoh: Makam Syekh Nawawi Al-Bantani" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori *</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm">
                        <option>Ulama Nusantara</option>
                        <option>Walisongo</option>
                        <option>Habaib</option>
                        <option>Auliya Nusantara</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Link Google Maps *</label>
                    <input required type="url" placeholder="https://maps.app.goo.gl/..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Sejarah Singkat Makam</label>
                    <textarea rows={3} placeholder="Tuliskan biografi singkat atau sejarah..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'karomah' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 mb-3">
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                      Bagikan naskah, manuskrip, atau kisah karomah wali untuk "Rubrik" ziarah yang jarang diketahui publik. Kisah Anda akan menjadi catatan sejarah digital yang menginspirasi jutaan peziarah lainnya.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Makam / Wali yang Dimaksud *</label>
                    <input required type="text" placeholder="Contoh: Sunan Kalijaga" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Kisah Karomah / Naskah Rubrik *</label>
                    <textarea required rows={4} placeholder="Ceritakan detail kisahnya di sini. Anda bisa mencantumkan sumber riwayat (dari guru, kitab, atau tradisi lisan)..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'doa' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 mb-3">
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                      Bantu lengkapi panduan ziarah dengan bacaan Tawasul, Wirid, atau Doa khusus yang biasa diamalkan di makam wali tertentu.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Makam / Wali yang Dimaksud *</label>
                    <input required type="text" placeholder="Contoh: Abah Guru Sekumpul" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Teks Doa / Bacaan Khusus (Arab atau Latin) *</label>
                    <textarea required rows={3} placeholder="Ila hadroti... (atau teks doa berbahasa Arab)" dir="auto" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Terjemahan / Fadhilah (Opsional)</label>
                    <input type="text" placeholder="Khasiat atau arti dari doa tersebut..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400" />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 mt-6">
                <button type="button" onClick={onClose} className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">
                  Batal
                </button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  onClick={onClose} 
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-brand-900 hover:from-emerald-800 hover:to-brand-950 rounded-xl flex items-center shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Kirim Usulan
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
