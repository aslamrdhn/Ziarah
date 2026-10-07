const fs = require('fs');
let content = fs.readFileSync('src/views/AdminKurator.tsx', 'utf8');

// We need to import the data and the firebase tools
content = content.replace(
  "import { ShieldCheck, Users, Database, Activity, Search, Filter } from 'lucide-react';",
  "import { ShieldCheck, Users, Database, Activity, Search, Filter, UploadCloud } from 'lucide-react';\nimport { ziarahSites as localSites } from '../data/sites';\nimport { db } from '../lib/firebase';\nimport { doc, setDoc } from 'firebase/firestore';"
);

// Add the state and function
content = content.replace(
  /export const AdminKurator: React.FC = \(\) => \{/,
  `export const AdminKurator: React.FC = () => {
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
`
);

// Add the button to the UI (inside the first Grid)
content = content.replace(
  /<div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">/,
  `<div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-200 bg-brand-50 relative overflow-hidden">
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

  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">`
);

fs.writeFileSync('src/views/AdminKurator.tsx', content);
console.log('Fixed AdminKurator.tsx');
