const fs = require('fs');

const adminCode = `import React from 'react';
import { ShieldAlert, Database, UploadCloud } from 'lucide-react';
import { motion } from 'motion/react';
import { ziarahSites as localSites } from '../data/sites';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const AdminKurator: React.FC = () => {
  const [isSeeding, setIsSeeding] = React.useState(false);
  const [seedMessage, setSeedMessage] = React.useState('');

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedMessage('Memulai sinkronisasi data...');
    try {
      for (const site of localSites) {
        await setDoc(doc(db, 'sites', site.id), site);
      }
      setSeedMessage('Berhasil mensinkronisasi ' + localSites.length + ' data makam ke Firestore.');
    } catch (e: any) {
      setSeedMessage('Gagal: ' + e.message);
    }
    setIsSeeding(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 sm:p-12 mb-8 shadow-sm border border-stone-200 relative overflow-hidden"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Panel Admin Kurator</h1>
            <p className="text-sm text-stone-500 font-medium tracking-wide">Preview Mode - Read Only</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <p className="text-sm font-bold text-red-900">Akses Ditolak (Preview Mode)</p>
          <p className="text-xs text-red-700 mt-1">Anda tidak memiliki kredensial admin yang valid. Sistem manajemen pengguna, moderasi usulan, dan log aktivitas belum aktif. Fitur ini memerlukan konfigurasi Backend Admin Panel terpisah.</p>
        </div>

        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UploadCloud className="w-24 h-24 text-brand-900" />
          </div>
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-brand-700" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-lg">Migrasi Database Server</h3>
              <p className="text-sm text-brand-600">Sinkronisasi data statis ke Firestore</p>
            </div>
          </div>
          <button 
            onClick={handleSeedDatabase} 
            disabled={isSeeding}
            className="mt-2 w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-bold rounded-lg transition-colors flex items-center justify-center relative z-10"
          >
            {isSeeding ? 'Memproses...' : 'Jalankan Migrasi Database'}
          </button>
          {seedMessage && <p className="mt-3 text-xs font-semibold text-brand-800 relative z-10">{seedMessage}</p>}
        </div>

      </motion.div>
    </div>
  );
};
`;
fs.writeFileSync('src/views/AdminKurator.tsx', adminCode);
