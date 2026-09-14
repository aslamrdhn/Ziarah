import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminKurator: React.FC = () => {
  const [pin, setPin] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Fungsi login dikunci pada mode preview.');
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white max-w-md w-full rounded-3xl shadow-sm border border-stone-200 p-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 bg-brand-50 rounded-2xl border border-brand-100 flex items-center justify-center mb-6 text-brand-600">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 mb-2 tracking-tight">Admin Kurator</h1>
            <p className="text-sm text-stone-500">Akses verifikasi & moderasi kontribusi data ziarah</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-widest">KODE AKSES / PIN</label>
              <input 
                type="password" 
                placeholder="Masukkan PIN"
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm text-stone-900 placeholder-stone-400 transition-all text-center tracking-widest font-mono"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl transition-colors mt-2"
            >
              Masuk ke Panel Kurasi
            </button>
            
            <button 
              type="button"
              onClick={() => setPin('admin123')}
              className="w-full bg-white hover:bg-stone-50 text-stone-600 font-semibold py-3.5 rounded-xl transition-colors text-sm border border-stone-200"
            >
              Isi Otomatis (Demo)
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-400 leading-relaxed">
              Sistem kurasi berpegang pada <strong className="text-stone-600">Kebijakan Editorial</strong> untuk menjamin akurasi historis.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
