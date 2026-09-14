import React, { useState, useMemo } from 'react';
import { ziarahSites } from '../data/sites';
import { BookOpen, Sparkles, MapPin, Bookmark, BookmarkCheck, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface KumpulanDoaProps {
  savedDoas: string[];
  onToggleSaveDoa: (id: string) => void;
}

export const KumpulanDoa: React.FC<KumpulanDoaProps> = React.memo(({ savedDoas, onToggleSaveDoa }) => {
  const [activeTab, setActiveTab] = useState<'semua' | 'tersimpan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

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
  }, []);

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

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50 pb-20">
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 tracking-tight mb-2">Kumpulan Doa & Karomah</h1>
              <p className="text-stone-500 text-sm md:text-base font-medium">Temukan dan simpan bacaan khusus serta kisah karomah dari berbagai makam waliyullah.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input 
                type="text" 
                placeholder="Cari doa, karomah, atau nama wali..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-stone-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 font-medium placeholder-stone-400 transition-all"
              />
            </div>
            
            <div className="flex bg-stone-100 p-1 rounded-xl shrink-0">
              <button 
                onClick={() => setActiveTab('semua')}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'semua' ? 'bg-white text-brand-700 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
              >
                Semua Data
              </button>
              <button 
                onClick={() => setActiveTab('tersimpan')}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'tersimpan' ? 'bg-white text-brand-700 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
              >
                Tersimpan ({savedDoas.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {filteredList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Belum ada data</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto">
              {activeTab === 'tersimpan' 
                ? "Anda belum menyimpan doa atau karomah apa pun. Klik ikon bookmark pada kartu untuk menyimpan."
                : "Tidak ada doa atau karomah yang cocok dengan pencarian Anda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredList.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm"
              >
                <div className={`p-4 border-b border-stone-100 flex items-center justify-between ${item.type === 'doa' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  <div className="flex items-center">
                    {item.type === 'doa' ? (
                      <BookOpen className="w-5 h-5 text-emerald-600 mr-3" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-amber-500 mr-3" />
                    )}
                    <div>
                      <h4 className="font-serif font-bold text-brand-900 text-lg leading-tight pr-8">{item.title}</h4>
                      <div className="flex items-center text-[11px] font-bold text-stone-500 mt-1 uppercase tracking-wider">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.siteName}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onToggleSaveDoa(item.id)}
                    className="p-2 bg-white rounded-lg shadow-sm border border-stone-200 text-stone-400 hover:text-brand-600 transition-colors"
                  >
                    {savedDoas.includes(item.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-brand-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                <div className="p-5 md:p-6">
                  {item.type === 'doa' ? (
                    <>
                      <p className="text-lg md:text-xl font-arabic text-emerald-900 leading-loose text-right mb-5" dir="rtl">
                        {item.text}
                      </p>
                      {item.translation && (
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Terjemahan:</p>
                          <p className="text-sm text-stone-600 italic leading-relaxed">{item.translation}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm md:text-base text-stone-700 leading-relaxed font-medium">
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
