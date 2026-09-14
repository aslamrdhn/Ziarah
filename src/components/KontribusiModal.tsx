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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-stone-200 relative z-10"
        >
          {/* Header */}
          <div className="bg-stone-50 border-b border-stone-200 px-6 py-6 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 text-brand-700 text-xs font-bold mb-2 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span>KONTRIBUSI KOMUNITAS PEZIARAH</span>
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900 mb-1 tracking-tight">Usulkan Makam / Pembaruan Data</h2>
              <p className="text-sm text-stone-500">Bantu lengkapi basis data ziarah makam wali dan ulama di Indonesia. Setiap usulan akan diverifikasi oleh dewan kurator.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors mt-1 text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-white">
            <div className="mb-8">
              <label className="block text-sm font-bold text-stone-800 mb-3 tracking-wide">Jenis Kontribusi:</label>
              <div className="flex bg-stone-100 p-1 rounded-xl">
                {[
                  { id: 'baru', label: 'Lokasi Makam' },
                  { id: 'karomah', label: 'Untold Story' },
                  { id: 'doa', label: 'Doa Khusus' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2.5 px-3 text-sm font-bold rounded-lg transition-all ${
                      activeTab === tab.id 
                        ? 'bg-white text-brand-700 shadow-sm border border-stone-200' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1.5">Nama Anda *</label>
                  <input required type="text" placeholder="Contoh: Hamba Allah / Nama Asli" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1.5">Email / No. HP (Rahasia)</label>
                  <input type="text" placeholder="Untuk info status publikasi" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400" />
                </div>
              </div>

              {activeTab === 'baru' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1.5">Nama Makam / Waliyullah *</label>
                      <input required type="text" placeholder="Contoh: Makam Syekh Nawawi Al-Bantani" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1.5">Kategori *</label>
                      <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900">
                        <option>Ulama Nusantara</option>
                        <option>Walisongo</option>
                        <option>Habaib</option>
                        <option>Auliya Nusantara</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Link Google Maps *</label>
                    <input required type="url" placeholder="https://maps.app.goo.gl/..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Sejarah Singkat Makam</label>
                    <textarea rows={3} placeholder="Tuliskan biografi singkat atau sejarah..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400 resize-none"></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'karomah' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-4">
                    <p className="text-sm text-amber-800 leading-relaxed font-medium">
                      Bagikan "Untold Story" atau kisah karomah wali yang jarang diketahui publik. Kisah Anda akan menjadi catatan sejarah digital yang menginspirasi jutaan peziarah lainnya.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Nama Makam / Wali yang Dimaksud *</label>
                    <input required type="text" placeholder="Contoh: Sunan Kalijaga" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 placeholder-stone-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Kisah Karomah / Untold Story *</label>
                    <textarea required rows={5} placeholder="Ceritakan detail kisahnya di sini. Anda bisa mencantumkan sumber riwayat (dari guru, kitab, atau tradisi lisan)..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 placeholder-stone-400 resize-none"></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'doa' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mb-4">
                    <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                      Bantu lengkapi panduan ziarah dengan bacaan Tawasul, Wirid, atau Doa khusus yang biasa diamalkan (dii-jazahkan) di makam wali tertentu.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Nama Makam / Wali yang Dimaksud *</label>
                    <input required type="text" placeholder="Contoh: Abah Guru Sekumpul" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 placeholder-stone-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Teks Doa / Bacaan Khusus (Arab atau Latin) *</label>
                    <textarea required rows={4} placeholder="Ila hadroti... (atau teks doa berbahasa Arab)" dir="auto" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 placeholder-stone-400 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1.5">Terjemahan / Fadhilah (Opsional)</label>
                    <input type="text" placeholder="Khasiat atau arti dari doa tersebut..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 placeholder-stone-400" />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t border-stone-200 mt-8">
                <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200">
                  Batal
                </button>
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-sm flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Kontribusi
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
