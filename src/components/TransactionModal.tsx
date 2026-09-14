import React, { useState } from 'react';
import { X, QrCode, ShoppingBag, CheckCircle2, ChevronRight, CreditCard, Heart, Upload, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ZiarahSite } from '../data/sites';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'badal' | 'untold';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(50000);
  const [badalPackage, setBadalPackage] = useState<'standard' | 'premium'>('standard');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={handleClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className={`p-6 text-white relative overflow-hidden ${type === 'infaq' ? 'bg-brand-600' : type === 'untold' ? 'bg-purple-600' : 'bg-gold-600'}`}>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 mb-2 relative z-10">
            {type === 'infaq' ? <Heart className="w-6 h-6" /> : type === 'untold' ? <Lock className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
            <h2 className="text-xl font-serif font-bold">
              {type === 'infaq' ? 'Infaq Digital' : type === 'untold' ? 'Buka Untold Story' : 'Pesan Badal Ziarah'}
            </h2>
          </div>
          <p className="text-white/80 text-sm relative z-10">
            {type === 'infaq' ? `Sedekah untuk pemeliharaan ${site.name}` : type === 'untold' ? `Buka kisah rahasia ${site.name}` : `Wakilkan ziarah ke ${site.name}`}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {type === 'infaq' && (
            <div className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-stone-700 mb-3 block">Pilih Nominal</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[10000, 25000, 50000, 100000].map(val => (
                        <button
                          key={val}
                          onClick={() => setAmount(val)}
                          className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${amount === val ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-stone-200 text-stone-600 hover:border-brand-200 hover:bg-stone-50'}`}
                        >
                          Rp {val.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center">
                    Lanjutkan Pembayaran <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col items-center">
                    <QrCode className="w-32 h-32 text-stone-800 mb-4" />
                    <p className="text-sm text-stone-500 mb-1">Scan dengan aplikasi e-Wallet / M-Banking</p>
                    <p className="font-bold text-brand-700 text-xl">Rp {amount.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={handleClose} className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all">
                    Selesai
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {type === 'untold' && (
            <div className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                    <Unlock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-stone-900 mb-1">Akses Seumur Hidup</h3>
                    <p className="text-sm text-stone-600">Buka akses kisah eksklusif ini selamanya di perangkat Anda.</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Total Pembayaran</p>
                    <p className="font-bold text-purple-700 text-3xl">Rp 15.000</p>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center">
                    Bayar Sekarang <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col items-center">
                    <QrCode className="w-32 h-32 text-stone-800 mb-4" />
                    <p className="text-sm text-stone-500 mb-1">Scan dengan aplikasi e-Wallet / M-Banking</p>
                    <p className="font-bold text-purple-700 text-xl">Rp 15.000</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (onSuccess) onSuccess();
                      else handleClose();
                    }} 
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all shadow-sm"
                  >
                    Simulasikan Bayar Berhasil
                  </button>
                </motion.div>
              )}
            </div>
          )}


          {type === 'badal' && (
            <div className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-stone-700 mb-2 block">Pilih Paket Badal</label>
                    <div className="space-y-3">
                      <div 
                        onClick={() => setBadalPackage('standard')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${badalPackage === 'standard' ? 'border-gold-500 bg-gold-50' : 'border-stone-200 hover:border-gold-200'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-stone-900">Paket Reguler</span>
                          <span className="text-gold-700 font-bold">Rp 150.000</span>
                        </div>
                        <p className="text-xs text-stone-500">Doa tawasul standar + Foto bukti di makam</p>
                      </div>
                      <div 
                        onClick={() => setBadalPackage('premium')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${badalPackage === 'premium' ? 'border-gold-500 bg-gold-50' : 'border-stone-200 hover:border-gold-200'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-stone-900">Paket Premium</span>
                          <span className="text-gold-700 font-bold">Rp 350.000</span>
                        </div>
                        <p className="text-xs text-stone-500">Doa tawasul khusus, Video Call live di makam, dan sedekah atas nama almarhum</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Nama Almarhum / Niat Untuk</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500" placeholder="Fulan bin Fulan" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Pesan Khusus (Opsional)</label>
                      <textarea className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 resize-none" rows={2} placeholder="Sampaikan doa khusus..."></textarea>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-3.5 bg-gold-600 hover:bg-gold-700 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center">
                    Lanjut ke Pembayaran <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">Pesanan Diterima</h3>
                    <p className="text-sm text-stone-600">
                      Tim ustadz perwakilan kami di <strong>{site.name}</strong> akan segera memproses badal ziarah Anda.
                    </p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-stone-500">Status Pembayaran</span>
                      <span className="font-bold text-amber-600">Menunggu Transfer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Total Tagihan</span>
                      <span className="font-bold text-stone-900">Rp {badalPackage === 'standard' ? '150.000' : '350.000'}</span>
                    </div>
                  </div>
                  <button onClick={handleClose} className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all">
                    Kembali ke Makam
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
