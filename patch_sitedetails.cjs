const fs = require('fs');
let content = fs.readFileSync('src/components/SiteDetails.tsx', 'utf8');

// 1. Add Lock and Unlock icons
content = content.replace(
  'QrCode, ShoppingBag, MessageSquare, Send } from \'lucide-react\';',
  'QrCode, ShoppingBag, MessageSquare, Send, Lock, Unlock } from \'lucide-react\';'
);

// 2. Update activeTab state and add transactionType 'untold'
content = content.replace(
  "useState<'info' | 'karomah' | 'doa' | 'kisah'>('info');",
  "useState<'info' | 'karomah' | 'doa' | 'kisah' | 'untold'>('info');"
);
content = content.replace(
  "useState<'infaq' | 'badal' | null>(null);",
  "useState<'infaq' | 'badal' | 'untold' | null>(null);\n  const [unlockedUntold, setUnlockedUntold] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('unlockedUntold') || '[]'); } catch { return []; } });\n  useEffect(() => { localStorage.setItem('unlockedUntold', JSON.stringify(unlockedUntold)); }, [unlockedUntold]);"
);

// 3. Add hasUntold variable
content = content.replace(
  "const hasDoa = site.doaKhusus && site.doaKhusus.length > 0;",
  "const hasDoa = site.doaKhusus && site.doaKhusus.length > 0;\n  const hasUntold = !!site.untoldStory;"
);

// 4. Add 'Kisah Rahasia' Tab button
content = content.replace(
  /(\s*<button\s*onClick=\{\(\) => setActiveTab\('kisah'\)\}[\s\S]*?Kisah Pengunjung\s*<\/button>)/,
  `$1
            {hasUntold && (
              <button 
                onClick={() => setActiveTab('untold')}
                className={\`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors \${activeTab === 'untold' ? 'bg-purple-50 text-purple-700' : 'text-stone-500 hover:bg-stone-100'}\`}
              >
                <Lock className="w-4 h-4 mr-2" /> Untold Story
              </button>
            )}`
);

// 5. Render Untold Story Tab
const untoldContent = `
            {activeTab === 'untold' && hasUntold && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-xl text-purple-900 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-purple-600" /> Kisah Rahasia
                  </h3>
                  {unlockedUntold.includes(site.id) && (
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">Terbuka</span>
                  )}
                </div>
                
                {unlockedUntold.includes(site.id) ? (
                  <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <p className="text-stone-700 leading-relaxed relative z-10 text-sm italic border-l-4 border-purple-300 pl-4">
                      {site.untoldStory}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center relative overflow-hidden flex flex-col items-center">
                    <div className="absolute inset-0 bg-stone-50/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6">
                      <Lock className="w-10 h-10 text-stone-400 mb-3" />
                      <h4 className="font-bold text-stone-900 mb-2">Konten Eksklusif</h4>
                      <p className="text-xs text-stone-500 mb-5 max-w-[250px]">Kisah ini dikumpulkan dari sumber tertutup dan tidak dipublikasikan secara umum. Buka akses untuk membacanya.</p>
                      <button 
                        onClick={() => setTransactionType('untold')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center"
                      >
                        <Unlock className="w-4 h-4 mr-2" /> Buka Akses (Rp 15.000)
                      </button>
                    </div>
                    {/* Blurred preview text */}
                    <p className="text-stone-300 leading-relaxed text-sm italic blur-sm select-none">
                      Dalam sebuah manuskrip kuno yang tersimpan rapat, disebutkan bahwa tokoh ini memiliki kemampuan luar biasa yang jarang diketahui publik. Kisah ini dijaga lisan secara turun temurun oleh para penjaga rahasia...
                    </p>
                  </div>
                )}
              </motion.div>
            )}
`;

content = content.replace(
  /(\s*\{activeTab === 'kisah' && \([\s\S]*?<\/motion\.div>\s*\)\})/,
  `$1\n${untoldContent}`
);

// 6. Provide the callback to TransactionModal
content = content.replace(
  /<TransactionModal\s*isOpen={transactionType !== null}\s*onClose={\(\) => setTransactionType\(null\)}\s*site={site}\s*type={transactionType \|\| 'infaq'}\s*\/>/,
  `<TransactionModal 
      isOpen={transactionType !== null}
      onClose={() => setTransactionType(null)}
      site={site}
      type={transactionType || 'infaq'}
      onSuccess={() => {
        if (transactionType === 'untold' && site) {
          setUnlockedUntold(prev => [...prev, site.id]);
        }
        setTransactionType(null);
      }}
    />`
);

fs.writeFileSync('src/components/SiteDetails.tsx', content);
console.log('SiteDetails updated');
