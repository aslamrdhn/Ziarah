import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminKurator: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white max-w-md w-full rounded-3xl shadow-sm border border-stone-200 p-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center mb-6 text-amber-600">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 mb-2 tracking-tight">Admin Kurator</h1>
            <p className="text-sm text-stone-500">Akses verifikasi & moderasi kontribusi data ziarah</p>
          </div>
          
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center">
            <p className="text-sm font-bold text-stone-800 mb-2">Preview Mode - Fitur Admin Butuh Integrasi Backend</p>
            <p className="text-xs text-stone-500 leading-relaxed">
              Dashboard ini hanya bersifat Read-Only untuk pratinjau. Sistem kurasi data, login, dan verifikasi belum dihubungkan ke API / Backend Firebase.
            </p>
          </div>

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
