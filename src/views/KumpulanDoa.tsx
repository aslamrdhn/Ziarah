
import React, { useState, useMemo } from 'react';
import { useSites } from '../context/SiteContext';
import { BookOpen, Sparkles, MapPin, Bookmark, BookmarkCheck, Search, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface KumpulanDoaProps {
  savedDoas: string[];
  onToggleSaveDoa: (id: string) => void;
}

export const KumpulanDoa: React.FC<KumpulanDoaProps> = React.memo(({ savedDoas, onToggleSaveDoa }) => {
  const { sites: ziarahSites, isLoading } = useSites();

  const [activeTab, setActiveTab] = useState<'semua' | 'tersimpan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  // Extract all Doa and Karomah from sites
  const allDoaKaromah = useMemo(() => {
    const list: Array<{
      id: string;
      siteId: string;
      siteName: string;
      type: 'doa' | 'karomah';
      title: string;
      text: string;
      translation?: string;
    }> = [];

    ziarahSites.forEach(site => {
      if (site.doaKhusus) {
        site.doaKhusus.forEach((doa, idx) => {
          list.push({
            id: `${site.id}-doa-${idx}`,
            siteId: site.id,
            siteName: site.name,
            type: 'doa',
            title: doa.title,
            text: doa.text,
            translation: doa.translation
          });
        });
      }
      
      if (site.karomah) {
        site.karomah.forEach((karomah, idx) => {
          list.push({
            id: `${site.id}-karomah-${idx}`,
            siteId: site.id,
            siteName: site.name,
            type: 'karomah',
            title: `Kisah Karomah #${idx + 1}`,
            text: karomah
          });
        });
      }
    });

    return list;
  }, [ziarahSites]);

  const filteredList = useMemo(() => {
    let result = allDoaKaromah;

    if (activeTab === 'tersimpan') {
      result = result.filter(item => savedDoas.includes(item.id));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.siteName.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allDoaKaromah, activeTab, searchQuery, savedDoas]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium">Memuat Doa Khusus...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header Hub */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 transition-all">
        <div className="max-w-4xl mx-auto px-4 py-5 sm:py-7">
          <div className="mb-4">
            <h1 className="text-xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight mb-1">
              Doa Khusus & Amalan Waliyullah
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Koleksi bacaan tawasul, wirid, karomah, dan amalan yang dinisbatkan kepada para wali di Nusantara.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari doa, amalan, atau nama wali..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm font-medium placeholder-slate-400 transition-all"
              />
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-2xl shrink-0 border border-slate-200/80">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab('semua')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'semua' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Semua ({allDoaKaromah.length})
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab('tersimpan')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'tersimpan' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Tersimpan ({savedDoas.length})
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {filteredList.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-600">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Tidak Ada Data Doa</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto">
              {activeTab === 'tersimpan' 
                ? "Anda belum menyimpan doa atau amalan apa pun. Klik ikon bookmark pada kartu untuk menyimpan ke daftar favorit Anda."
                : "Tidak ada doa atau karomah yang cocok dengan pencarian Anda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:gap-6">
            {filteredList.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.008 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className={`p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between ${item.type === 'doa' ? 'bg-emerald-50/70' : 'bg-amber-50/70'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl ${item.type === 'doa' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'} shadow-xs`}>
                      {item.type === 'doa' ? <BookOpen className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight">{item.title}</h4>
                      <div className="flex items-center text-[11px] font-semibold text-emerald-800 mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        {item.siteName}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1.5">
                    <motion.button 
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleCopy(item.id, `${item.title}\n\n${item.text}${item.translation ? `\n\nArtinya:\n${item.translation}` : ''}`)}
                      className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Salin doa"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                    
                    <motion.button 
                      whileTap={{ scale: 1.35 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      onClick={() => onToggleSaveDoa(item.id)}
                      className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title={savedDoas.includes(item.id) ? "Hapus dari simpanan" : "Simpan doa"}
                    >
                      {savedDoas.includes(item.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-5 sm:p-7">
                  {item.type === 'doa' ? (
                    <>
                      <p className="text-xl sm:text-2xl font-arabic text-slate-900 leading-[2.5] text-right mb-5 font-normal" dir="rtl">
                        {item.text}
                      </p>
                      {item.translation && (
                        <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Artinya:</p>
                          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">{item.translation}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {item.text}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
