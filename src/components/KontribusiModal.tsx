import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface KontribusiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KontribusiModal: React.FC<KontribusiModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'baru' | 'karomah' | 'doa'>('baru');
  const [contributorName, setContributorName] = useState('');
  const [contributorContact, setContributorContact] = useState('');
  const [targetName, setTargetName] = useState('');
  const [category, setCategory] = useState('Ulama Nusantara');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [content, setContent] = useState('');
  const [translation, setTranslation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && auth.currentUser) {
      if (!contributorName && auth.currentUser.displayName) {
        setContributorName(auth.currentUser.displayName);
      }
      if (!contributorContact && auth.currentUser.email) {
        setContributorContact(auth.currentUser.email);
      }
    }
  }, [isOpen]);

  const resetForm = () => {
    setTargetName('');
    setCategory('Ulama Nusantara');
    setCity('');
    setProvince('');
    setMapsUrl('');
    setContent('');
    setTranslation('');
    setErrorMsg(null);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);

    const cleanContributor = (contributorName.trim() || 'Hamba Allah').slice(0, 100);
    const cleanTarget = targetName.trim().slice(0, 150);
    const cleanContent = content.trim().slice(0, 3000);

    if (!cleanTarget) {
      setErrorMsg('Mohon isi nama makam atau tokoh wali yang dimaksud.');
      return;
    }
    if (cleanContent.length < 5) {
      setErrorMsg('Mohon tuliskan keterangan sejarah, kisah, atau teks doa minimal 5 karakter.');
      return;
    }

    setIsSubmitting(true);
    const newDocRef = doc(collection(db, 'contributions'));
    try {
      await setDoc(newDocRef, {
        id: newDocRef.id,
        type: activeTab,
        contributorName: cleanContributor,
        contributorContact: contributorContact.trim().slice(0, 120),
        targetName: cleanTarget,
        category: activeTab === 'baru' ? category : '',
        city: activeTab === 'baru' ? city.trim().slice(0, 100) : '',
        province: activeTab === 'baru' ? province.trim().slice(0, 100) : '',
        mapsUrl: activeTab === 'baru' ? mapsUrl.trim().slice(0, 500) : '',
        content: cleanContent,
        translation: activeTab === 'doa' ? translation.trim().slice(0, 1500) : '',
        status: 'pending',
        authorUid: auth.currentUser?.uid || 'guest',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Failed to submit contribution:', err);
      setErrorMsg('Gagal mengirim usulan ke database. Silakan coba lagi.');
      try {
        handleFirestoreError(err, OperationType.CREATE, `contributions/${newDocRef.id}`);
      } catch {
        // Structured log emitted
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          onClick={handleClose}
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
              <p className="text-xs sm:text-sm text-slate-500">Bantu lengkapi basis data ziarah makam wali dan ulama di Indonesia. Setiap usulan akan tersimpan dan diverifikasi oleh dewan kurator.</p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors mt-0.5 text-slate-400 hover:text-slate-900 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-white">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 px-4 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Tersimpan di Antrean Kurasi
                </span>
                <h3 className="text-xl font-serif font-black text-slate-900">
                  Jazakumullahu Khairan atas Kontribusi Anda!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Usulan untuk <strong className="text-slate-900">{targetName}</strong> telah berhasil dikirim ke database dan akan ditinjau oleh Admin Kurator sebelum dipublikasikan ke direktori utama.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Kirim Usulan Lainnya
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-700 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2.5 tracking-wide">Jenis Kontribusi:</label>
                  <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
                    {[
                      { id: 'baru', label: 'Lokasi Makam' },
                      { id: 'karomah', label: 'Rubrik & Karomah' },
                      { id: 'doa', label: 'Doa Khusus' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => { setActiveTab(tab.id as any); setErrorMsg(null); }}
                        className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
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

                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-5 flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-800 font-medium">{errorMsg}</p>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Anda *</label>
                      <input
                        required
                        type="text"
                        maxLength={100}
                        value={contributorName}
                        onChange={(e) => setContributorName(e.target.value)}
                        placeholder="Contoh: Hamba Allah / Nama Asli"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email / No. HP (Rahasia)</label>
                      <input
                        type="text"
                        maxLength={120}
                        value={contributorContact}
                        onChange={(e) => setContributorContact(e.target.value)}
                        placeholder="Untuk info status publikasi"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {activeTab === 'baru' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Makam / Waliyullah *</label>
                          <input
                            required
                            type="text"
                            maxLength={150}
                            value={targetName}
                            onChange={(e) => setTargetName(e.target.value)}
                            placeholder="Contoh: Makam Syekh Nawawi Al-Bantani"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori *</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm"
                          >
                            <option value="Ulama Nusantara">Ulama Nusantara</option>
                            <option value="Walisongo">Walisongo</option>
                            <option value="Habaib">Habaib</option>
                            <option value="Auliya Nusantara">Auliya Nusantara</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Kota / Kabupaten *</label>
                          <input
                            required
                            type="text"
                            maxLength={100}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Contoh: Serang"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Provinsi *</label>
                          <input
                            required
                            type="text"
                            maxLength={100}
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            placeholder="Contoh: Banten"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Link Google Maps / Alamat Lengkap *</label>
                        <input
                          required
                          type="text"
                          maxLength={500}
                          value={mapsUrl}
                          onChange={(e) => setMapsUrl(e.target.value)}
                          placeholder="https://maps.app.goo.gl/... atau alamat lengkap"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Sejarah Singkat & Biografi Makam *</label>
                        <textarea
                          required
                          rows={3}
                          maxLength={3000}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Tuliskan biografi singkat, sejarah perjuangan dakwah, atau fasilitas makam..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'karomah' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 mb-3">
                        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                          Bagikan naskah, manuskrip, atau kisah karomah wali untuk "Rubrik" ziarah yang jarang diketahui publik. Kisah Anda akan menjadi catatan sejarah digital setelah dikurasi.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Makam / Wali yang Dimaksud *</label>
                        <input
                          required
                          type="text"
                          maxLength={150}
                          value={targetName}
                          onChange={(e) => setTargetName(e.target.value)}
                          placeholder="Contoh: Sunan Kalijaga"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Kisah Karomah / Naskah Rubrik *</label>
                        <textarea
                          required
                          rows={4}
                          maxLength={3000}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Ceritakan detail kisahnya di sini. Anda bisa mencantumkan sumber riwayat (dari guru, kitab, atau tradisi lisan)..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"
                        />
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
                        <input
                          required
                          type="text"
                          maxLength={150}
                          value={targetName}
                          onChange={(e) => setTargetName(e.target.value)}
                          placeholder="Contoh: Abah Guru Sekumpul"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Teks Doa / Bacaan Khusus (Arab atau Latin) *</label>
                        <textarea
                          required
                          rows={3}
                          maxLength={3000}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Ila hadroti... (atau teks doa berbahasa Arab)"
                          dir="auto"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Terjemahan / Fadhilah (Opsional)</label>
                        <input
                          type="text"
                          maxLength={1500}
                          value={translation}
                          onChange={(e) => setTranslation(e.target.value)}
                          placeholder="Khasiat atau arti dari doa tersebut..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm placeholder-slate-400"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-brand-900 hover:from-emerald-800 hover:to-brand-950 rounded-xl flex items-center shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-1.5" />
                          Kirim Usulan
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
