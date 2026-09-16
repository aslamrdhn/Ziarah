import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ZiarahSite } from '../data/sites';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'badal' | 'untold';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className={`p-6 text-white relative overflow-hidden ${type === 'infaq' ? 'bg-brand-600' : type === 'untold' ? 'bg-purple-600' : 'bg-gold-600'}`}>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              {type === 'infaq' ? 'Infaq & Sedekah' : type === 'untold' ? 'Untold Story' : 'Badal Ziarah'}
            </span>
            <h2 className="text-2xl font-serif font-bold mb-1">{site.name}</h2>
            <p className="text-white/80 text-sm">
              {type === 'infaq' ? 'Salurkan infaq untuk pemeliharaan makam.' : type === 'untold' ? 'Akses kisah eksklusif.' : 'Layanan badal ziarah perwakilan.'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-stone-400 mb-3" />
            <h3 className="font-bold text-stone-900 mb-1">Preview Mode</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Fitur transaksi / pembayaran belum aktif karena membutuhkan integrasi dengan Payment Gateway di sisi Backend.
            </p>
          </div>
          <button onClick={onClose} className="w-full mt-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all">
            Tutup Jendela
          </button>
        </div>
      </motion.div>
    </div>
  );
};
