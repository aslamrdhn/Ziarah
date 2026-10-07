import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, ScrollText, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { ZiarahSite } from '../data/sites';
import { Link } from 'react-router-dom';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'untold';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type, onSuccess }) => {
  const [selectedNominal, setSelectedNominal] = useState(25000);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsSuccess(true);
    if (type === 'untold') {
      try {
        const current = JSON.parse(localStorage.getItem('unlockedUntold') || '[]');
        if (!current.includes(site.id)) {
          localStorage.setItem('unlockedUntold', JSON.stringify([...current, site.id]));
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 320 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200/90"
      >
        {/* Header */}
        <div className={`p-6 text-white relative overflow-hidden ${type === 'infaq' ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-brand-950' : 'bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950'}`}>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 inline-flex items-center space-x-1.5 backdrop-blur-md">
              {type === 'infaq' ? (
                <>
                  <HeartHandshake className="w-3.5 h-3.5 mr-1" />
                  <span>Infaq Digital Makam</span>
                </>
              ) : (
                <>
                  <ScrollText className="w-3.5 h-3.5 mr-1" />
                  <span>Rubrik Khusus & Manuskrip</span>
                </>
              )}
            </span>
            <h2 className="text-xl font-serif font-black mb-1 drop-shadow-xs">{site.name}</h2>
            <p className="text-white/80 text-xs">
              {type === 'infaq' 
                ? 'Sedekah jariyah langsung untuk pemeliharaan makam & fasilitas jamaah.' 
                : 'Akses naskah dan catatan sejarah khusus yang belum dipublikasikan.'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">
                {type === 'infaq' ? 'Infaq Berhasil Dicatat' : 'Akses Rubrik Terbuka!'}
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                {type === 'infaq' 
                  ? 'Jazakumullahu khairan katsiran. Semoga menjadi amal jariyah yang membawa keberkahan.' 
                  : 'Naskah manuskrip dan kisah tersembunyi kini dapat Anda baca langsung di tab Rubrik.'}
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-emerald-800 to-brand-900 hover:from-emerald-900 hover:to-brand-950 text-white rounded-xl font-bold text-sm transition-all shadow-xs cursor-pointer"
              >
                Selesai & Tutup
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'infaq' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Pilih Nominal Infaq:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[10000, 25000, 50000, 100000, 250000, 500000].map((nominal) => (
                        <motion.button
                          key={nominal}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: "spring", stiffness: 450, damping: 25 }}
                          onClick={() => setSelectedNominal(nominal)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            selectedNominal === nominal 
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Rp {nominal.toLocaleString('id-ID')}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-700 mb-2">
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <span>QRIS Standar Bank Indonesia</span>
                    </div>
                    <div className="relative inline-block overflow-hidden rounded-xl">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=INFAQ-${site.id}-${selectedNominal}`} 
                        alt="QRIS Infaq"
                        className="w-32 h-32 mx-auto rounded-xl border border-slate-200 bg-white p-2 mb-2 shadow-2xs"
                      />
                      <motion.div 
                        animate={{ y: [0, 100, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.9)] pointer-events-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">Pindai dengan GoPay, OVO, Dana, BCA, Mandiri, atau BSI.</p>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={handleSimulatePayment}
                    className="w-full py-3 bg-gradient-to-r from-emerald-800 to-brand-900 hover:from-emerald-900 hover:to-brand-950 text-white rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Konfirmasi Pembayaran (Rp {selectedNominal.toLocaleString('id-ID')})
                  </motion.button>

                  <div className="text-center">
                    <Link 
                      to="/infaq" 
                      onClick={onClose}
                      className="text-xs text-emerald-700 hover:text-emerald-900 hover:underline font-semibold"
                    >
                      Buka Halaman Lengkap Infaq Digital →
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
                    <ScrollText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-bold text-purple-900 text-sm mb-1">Akses Rubrik Kisah Khusus</h4>
                    <p className="text-xs text-purple-700 leading-relaxed">
                      Dapatkan akses penuh ke catatan manuskrip dan sejarah tak terungkap dari makam ini seharga <strong className="font-bold">Rp 15.000</strong> (sekali bayar).
                    </p>
                  </div>

                  <button 
                    onClick={handleSimulatePayment}
                    className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center cursor-pointer"
                  >
                    Buka Akses Rubrik Sekarang
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Batalkan
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

