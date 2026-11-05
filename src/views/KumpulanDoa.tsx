import React, { useState, useMemo, useEffect } from 'react';
import { useSites } from '../context/SiteContext';
import { BookOpen, Bookmark, BookmarkCheck, Search, Copy, Check } from 'lucide-react';
import { auth, db, isUserAdmin } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useVerifiedDonationUnlock } from '../lib/transferProof';

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
  const [requireManualVerification, setRequireManualVerification] = useState<boolean>(false);
  const { isUnlocked: hasDonated } = useVerifiedDonationUnlock(undefined, requireManualVerification);

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
            if (d.rubrikGate.requireManualVerification !== undefined) {
              setRequireManualVerification(Boolean(d.rubrikGate.requireManualVerification));
            }
          }
        }
      },
      () => {}
    );
    return () => unsubSettings();
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
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-500">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic">Memuat Doa Khusus...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-[#FAF8F5]">
      {/* Header Hub */}
      <div className="bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-20 transition-all">
        <div className="max-w-4xl mx-auto px-4 py-5 sm:py-7">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-1.5">
              Doa Khusus &amp; Amalan Waliyullah.
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm">
              Koleksi bacaan tawasul, wirid, karomah, dan amalan yang dinisbatkan kepada para wali di Nusantara.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" strokeWidth={1.75} />
              <input 
                type="text" 
                placeholder="Cari doa, amalan, atau nama wali..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-stone-200/80 rounded-2xl focus:outline-none focus:border-emerald-700 text-stone-900 text-xs sm:text-sm placeholder-stone-400 transition-colors shadow-2xs"
              />
            </div>
            
            <div className="flex bg-stone-200/60 p-1 rounded-xl shrink-0">
              <button 
                type="button"
                onClick={() => setActiveTab('semua')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${activeTab === 'semua' ? 'bg-white text-emerald-950 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'}`}
              >
                Semua ({allDoaKaromah.length})
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('tersimpan')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${activeTab === 'tersimpan' ? 'bg-white text-emerald-950 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'}`}
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
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-stone-200/70 shadow-2xs">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-stone-600">
              <BookOpen className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-base sm:text-lg font-serif text-stone-900 mb-1">Tidak Ada Data Doa</h3>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto">
              {activeTab === 'tersimpan' 
                ? "Anda belum menyimpan doa atau amalan apa pun. Klik ikon penanda pada kartu untuk menyimpan ke daftar favorit Anda."
                : "Tidak ada doa atau karomah yang cocok dengan pencarian Anda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:gap-6">
            {filteredList.map((item) => {
              const unlocked = isKaromahItemUnlocked(item);
              return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/70 p-5 sm:p-7 shadow-2xs transition-colors"
              >
                <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                      {item.type === 'doa' ? 'Doa & Amalan' : 'Riwayat Karomah'} · {item.siteName}
                    </div>
                    <h4 className="font-serif text-xl text-stone-900 mt-1 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  
                  {unlocked && (
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button 
                        type="button"
                        onClick={() => handleCopy(item.id, `${item.title}\n\n${item.text}${item.translation ? `\n\nArtinya:\n${item.translation}` : ''}`)}
                        className="p-2 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200/80 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                        title="Salin doa"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-700" strokeWidth={1.75} /> : <Copy className="w-4 h-4" strokeWidth={1.75} />}
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => onToggleSaveDoa(item.id)}
                        className="p-2 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200/80 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                        title={savedDoas.includes(item.id) ? "Hapus dari simpanan" : "Simpan doa"}
                      >
                        {savedDoas.includes(item.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-800" strokeWidth={1.75} />
                        ) : (
                          <Bookmark className="w-4 h-4" strokeWidth={1.75} />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  {item.type === 'doa' ? (
                    <>
                      <p className="text-xl sm:text-2xl font-arabic text-stone-900 leading-[2.5] text-right mb-4 font-normal" dir="rtl">
                        {item.text}
                      </p>
                      {item.translation && (
                        <p className="text-sm text-stone-600 font-serif italic leading-relaxed pt-3 border-t border-stone-100">
                          &ldquo;{item.translation}&rdquo;
                        </p>
                      )}
                    </>
                  ) : unlocked ? (
                    <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                      {item.text.replace(/<!--more-->/g, ' ')}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                        <p>{item.text.replace(/<!--more-->/g, ' ').slice(0, 90)}...</p>
                        <p className="mt-1 opacity-40 blur-[2px] select-none pointer-events-none line-clamp-2 text-stone-600">
                          Kisah karomah lanjutan dibuka khusus bagi pengunjung yang telah menyalurkan infaq jariyah penjagaan arsip digital.
                        </p>
                      </div>
                      <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-stone-500 italic">Arsip Khazanah Terkunci</span>
                        <Link
                          to="/rubrik"
                          className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                        >
                          Buka Seluruh Arsip Kisah →
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

        <footer className="mt-10 pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h3 className="font-serif text-lg sm:text-xl text-stone-900">
              Menyelami Ujian Batin yang Melahirkan Munajat Para Wali
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Di balik setiap wirid yang diwariskan para Auliya Nusantara, tersimpan kisah malam-malam penuh keteguhan dan pertolongan Allah.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/rubrik"
              className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Buka Arsip Kisah
            </Link>
            <Link
              to="/infaq"
              className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4"
            >
              Titip Hajat di Dinding Munajat →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
});
