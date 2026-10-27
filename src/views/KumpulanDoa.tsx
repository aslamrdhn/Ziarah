import React, { useState, useMemo, useEffect } from 'react';
import { useSites } from '../context/SiteContext';
import { BookOpen, Sparkles, MapPin, Bookmark, BookmarkCheck, Search, Copy, Check, Lock, Unlock } from 'lucide-react';
import { auth, db, isUserAdmin } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface KumpulanDoaProps {
  savedDoas: string[];
  onToggleSaveDoa: (id: string) => void;
}

interface DoaKaromahItem {
  id: string;
  siteId: string;
  siteName: string;
  type: 'doa' | 'karomah';
  title: string;
  text: string;
  translation?: string;
}

export const KumpulanDoa: React.FC<KumpulanDoaProps> = React.memo(({ savedDoas, onToggleSaveDoa }) => {
  const { sites: ziarahSites, isLoading } = useSites();

  const [activeTab, setActiveTab] = useState<'semua' | 'tersimpan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [approvedCommunityDoas, setApprovedCommunityDoas] = useState<DoaKaromahItem[]>([]);
  const [lockEnabled, setLockEnabled] = useState<boolean>(true);
  const [freeSampleCount, setFreeSampleCount] = useState<number>(2);
  const [hasDonated, setHasDonated] = useState<boolean>(() => {
    try {
      const flag = localStorage.getItem('hasDonatedRubrik') === 'true';
      const unlockedList = JSON.parse(localStorage.getItem('unlockedUntold') || '[]');
      return flag || (Array.isArray(unlockedList) && unlockedList.length > 0);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (d.rubrikGate) {
            setLockEnabled(d.rubrikGate.lockEnabled !== undefined ? Boolean(d.rubrikGate.lockEnabled) : true);
            if (typeof d.rubrikGate.freeSampleCount === 'number') {
              setFreeSampleCount(d.rubrikGate.freeSampleCount);
            }
          }
        }
      },
      () => {}
    );
    return () => unsubSettings();
  }, []);

  useEffect(() => {
    const checkStorage = () => {
      try {
        const flag = localStorage.getItem('hasDonatedRubrik') === 'true';
        const unlockedList = JSON.parse(localStorage.getItem('unlockedUntold') || '[]');
        setHasDonated(flag || (Array.isArray(unlockedList) && unlockedList.length > 0));
      } catch {}
    };
    window.addEventListener('storage', checkStorage);
    return () => window.removeEventListener('storage', checkStorage);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'contributions'), where('status', '==', 'approved'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: DoaKaromahItem[] = [];
        snapshot.docs.forEach(docSnap => {
          const d = docSnap.data();
          if (d.type === 'doa') {
            items.push({
              id: `doa-contrib-${docSnap.id}`,
              siteId: d.siteId || 'nusantara',
              siteName: d.targetName || 'Waliyullah Nusantara',
              type: 'doa',
              title: `Amalan & Doa: ${d.targetName || 'Waliyullah'} (Kontribusi ${d.contributorName || 'Jamaah'})`,
              text: d.content || '',
              translation: d.translation || undefined,
            });
          }
        });
        setApprovedCommunityDoas(items);
      },
      () => {}
    );
    return () => unsubscribe();
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  // Extract all Doa and Karomah from sites + approved community contributions
  const allDoaKaromah = useMemo(() => {
    const list: DoaKaromahItem[] = [...approvedCommunityDoas];

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
  }, [ziarahSites, approvedCommunityDoas]);

  const unlockedKaromahIds = useMemo(() => {
    const karomahItems = allDoaKaromah.filter(i => i.type === 'karomah');
    return new Set(karomahItems.slice(0, Math.max(0, freeSampleCount)).map(i => i.id));
  }, [allDoaKaromah, freeSampleCount]);

  const isKaromahItemUnlocked = (item: DoaKaromahItem): boolean => {
    if (item.type === 'doa') return true;
    if (!lockEnabled) return true;
    if (hasDonated || isUserAdmin(auth.currentUser)) return true;
    return unlockedKaromahIds.has(item.id);
  };

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
      <div className="bg-[#F9F8F4]/95 backdrop-blur-md border-b border-stone-300/80 sticky top-0 z-20 transition-all">
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
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-xs sm:text-sm font-medium placeholder-slate-400 transition-all"
              />
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-2xl shrink-0 border border-slate-200/80">
              <button 
                type="button"
                onClick={() => setActiveTab('semua')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'semua' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Semua ({allDoaKaromah.length})
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('tersimpan')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'tersimpan' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Tersimpan ({savedDoas.length})
              </button>
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
            {filteredList.map((item) => {
              const unlocked = isKaromahItemUnlocked(item);
              const isSampleKaromah = item.type === 'karomah' && unlocked && lockEnabled && !hasDonated;
              return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className={`p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between ${item.type === 'doa' ? 'bg-emerald-50/70' : 'bg-amber-50/70'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl ${item.type === 'doa' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'} shadow-xs`}>
                      {item.type === 'doa' ? <BookOpen className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight">{item.title}</h4>
                        {isSampleKaromah && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Contoh Gratis
                          </span>
                        )}
                        {!unlocked && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Khusus Donatur
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-[11px] font-semibold text-emerald-800 mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        {item.siteName}
                      </div>
                    </div>
                  </div>
                  
                  {unlocked && (
                    <div className="flex items-center space-x-1.5">
                      <button 
                        type="button"
                        onClick={() => handleCopy(item.id, `${item.title}\n\n${item.text}${item.translation ? `\n\nArtinya:\n${item.translation}` : ''}`)}
                        className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200 text-slate-400 hover:text-emerald-700 active:scale-95 transition-all cursor-pointer"
                        title="Salin doa"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => onToggleSaveDoa(item.id)}
                        className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200 text-slate-400 hover:text-emerald-700 active:scale-95 transition-all cursor-pointer"
                        title={savedDoas.includes(item.id) ? "Hapus dari simpanan" : "Simpan doa"}
                      >
                        {savedDoas.includes(item.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
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
                  ) : unlocked ? (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {item.text}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <span>{item.text.slice(0, 50)}... </span>
                        <span className="blur-[4px] select-none opacity-65">
                          {item.text.slice(50) || 'Kisah karomah lanjutan dibuka khusus bagi pengunjung yang telah melakukan donasi infaq riset database.'}
                        </span>
                      </p>
                      <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 italic">Terkunci untuk mendukung riset database</span>
                        <Link
                          to="/rubrik"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Unlock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Buka via Infaq di Rubrik</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});
