import React, { useState, useMemo, useEffect } from 'react';
import { useSites } from '../context/SiteContext';
import { BookOpen, Bookmark, BookmarkCheck, Search, Copy, Check, Lock } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useVerifiedBarokahUnlock } from '../lib/transferProof';
import { useSiteCopy } from '../lib/siteCopy';
import { getSiteBarokahHajat, getEffectiveSiteDoaKhusus } from '../lib/siteLogistics';
import { TransactionModal } from '../components/TransactionModal';
import { ZiarahSite } from '../data/sites';

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
  barokahHook: string;
  text: string;
  latin?: string;
  translation?: string;
  siteRef?: ZiarahSite;
}

export const KumpulanDoa: React.FC<KumpulanDoaProps> = React.memo(({ savedDoas, onToggleSaveDoa }) => {
  const { sites: ziarahSites, isLoading } = useSites();
  const siteCopy = useSiteCopy();

  const [activeTab, setActiveTab] = useState<'semua' | 'tersimpan'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [approvedCommunityDoas, setApprovedCommunityDoas] = useState<DoaKaromahItem[]>([]);
  const [lockEnabled, setLockEnabled] = useState<boolean>(true);
  const [requireManualVerification, setRequireManualVerification] = useState<boolean>(false);
  const [unlockModalSite, setUnlockModalSite] = useState<ZiarahSite | null>(null);

  const { isUnlocked: isBarokahUnlocked } = useVerifiedBarokahUnlock('barokah', requireManualVerification);

  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (d.rubrikGate) {
            setLockEnabled(d.rubrikGate.lockEnabled !== undefined ? Boolean(d.rubrikGate.lockEnabled) : true);
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
        snapshot.docs.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.type === 'doa') {
            items.push({
              id: `doa-contrib-${docSnap.id}`,
              siteId: d.siteId || 'nusantara',
              siteName: d.targetName || 'Waliyullah Nusantara',
              type: 'doa',
              title: `Amalan & Doa: ${d.targetName || 'Waliyullah'} (Kontribusi ${d.contributorName || 'Jamaah'})`,
              barokahHook:
                'Amalan tawassul yang diamalkan para peziarah untuk memohon ketenangan batin, kelapangan rezeki halal, dan keberkahan keluarga.',
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

    ziarahSites.forEach((site) => {
      const hajatSentence = getSiteBarokahHajat(site);
      const effectiveDoas = getEffectiveSiteDoaKhusus(site);

      effectiveDoas.forEach((doa, idx) => {
        list.push({
          id: `${site.id}-doa-${idx}`,
          siteId: site.id,
          siteName: site.name,
          type: 'doa',
          title: doa.title,
          barokahHook: hajatSentence,
          text: doa.text,
          latin: doa.latin,
          translation: doa.translation,
          siteRef: site,
        });
      });

      if (site.karomah) {
        site.karomah.forEach((karomah, idx) => {
          list.push({
            id: `${site.id}-karomah-${idx}`,
            siteId: site.id,
            siteName: site.name,
            type: 'karomah',
            title: `Kesaksian Karomah #${idx + 1} — ${site.name}`,
            barokahHook: hajatSentence,
            text: karomah,
            siteRef: site,
          });
        });
      }
    });

    return list;
  }, [ziarahSites, approvedCommunityDoas]);

  const filteredList = useMemo(() => {
    let result = allDoaKaromah;

    if (activeTab === 'tersimpan') {
      result = result.filter((item) => savedDoas.includes(item.id));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.siteName.toLowerCase().includes(q) ||
          item.barokahHook.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allDoaKaromah, activeTab, searchQuery, savedDoas]);

  const openBarokahUnlockModal = (item?: DoaKaromahItem) => {
    const baseSite = item?.siteRef || ziarahSites[0];
    if (!baseSite) return;
    setUnlockModalSite({
      ...baseSite,
      id: 'barokah',
      name: item?.siteName || 'Seluruh Makam Auliya Nusantara',
      title: item?.siteName ? `Makam ${item.siteName}` : 'Khazanah Barokah & Doa Khusus Wali',
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic">Memuat Doa Khusus...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-slate-50">
      {/* Header Hub */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 transition-all">
        <div className="max-w-4xl mx-auto px-4 py-5 sm:py-7">
          {/* Sub-Tab Switcher: Amalan & Doa Hub (/panduan & /doa) */}
          <div className="flex items-center gap-6 border-b border-slate-200 mb-5 overflow-x-auto no-scrollbar">
            <Link
              to="/panduan"
              className="pb-3 -mb-px text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors"
            >
              1. Tuntunan Yasin, Tahlil &amp; Tasbih
            </Link>
            <Link
              to="/doa"
              aria-current="page"
              className="pb-3 -mb-px text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 border-emerald-700 text-slate-900 transition-colors"
            >
              2. Wirid &amp; Doa Khusus Para Wali
            </Link>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-normal text-slate-900 tracking-tight mb-1.5">
              {siteCopy.doaKhususTitle}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              {siteCopy.doaHeaderSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Cari doa hajat, jodoh, rezeki, atau nama wali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-700 text-slate-900 text-xs sm:text-sm placeholder-slate-400 transition-colors"
              />
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('semua')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'semua'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({allDoaKaromah.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tersimpan')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'tersimpan'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
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
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-600">
              <BookOpen className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-base sm:text-lg font-serif text-slate-900 mb-1">Tidak Ada Data Doa</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
              {activeTab === 'tersimpan'
                ? 'Anda belum menyimpan doa atau amalan apa pun. Klik ikon penanda pada kartu untuk menyimpan ke daftar favorit Anda.'
                : 'Tidak ada doa atau karomah yang cocok dengan pencarian Anda.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:gap-6">
            {filteredList.map((item, index) => {
              // Hanya item pertama (index === 0) yang terbuka penuh sebagai contoh gratis;
              // seluruh item ke-2 dan seterusnya (index >= 1) terkunci Rp 5.000 kecuali sudah dibuka via useVerifiedBarokahUnlock
              const isItemUnlocked = !lockEnabled || isBarokahUnlocked || index === 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-200">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                        {item.type === 'doa' ? 'Barokah & Doa Khusus' : 'Riwayat Karomah'} · {item.siteName}
                      </div>
                      <h4 className="font-serif text-xl text-slate-900 mt-1 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {item.barokahHook}
                      </p>
                    </div>

                    {isItemUnlocked ? (
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.id,
                              `${item.title}\n\n${item.text}${item.latin ? `\n\nLatin:\n${item.latin}` : ''}${
                                item.translation ? `\n\nArtinya:\n${item.translation}` : ''
                              }`
                            )
                          }
                          className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Salin doa"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-700" strokeWidth={1.75} />
                          ) : (
                            <Copy className="w-4 h-4" strokeWidth={1.75} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleSaveDoa(item.id)}
                          className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          title={savedDoas.includes(item.id) ? 'Hapus dari simpanan' : 'Simpan doa'}
                        >
                          {savedDoas.includes(item.id) ? (
                            <BookmarkCheck className="w-4 h-4 text-emerald-800" strokeWidth={1.75} />
                          ) : (
                            <Bookmark className="w-4 h-4" strokeWidth={1.75} />
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="blur-[6px] select-none pointer-events-none opacity-50 flex items-center space-x-1.5 shrink-0" aria-hidden="true">
                        <span className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
                          <Copy className="w-4 h-4" strokeWidth={1.75} />
                        </span>
                      </div>
                    )}
                  </div>

                  {isItemUnlocked ? (
                    item.type === 'doa' ? (
                      <div className="space-y-3">
                        <p
                          className="text-xl sm:text-2xl font-arabic text-slate-900 leading-[2.5] text-right font-normal"
                          dir="rtl"
                        >
                          {item.text}
                        </p>
                        {item.latin && (
                          <p className="text-xs sm:text-sm text-emerald-800 font-medium italic leading-relaxed">
                            {item.latin}
                          </p>
                        )}
                        {item.translation && (
                          <p className="text-sm text-slate-600 font-serif italic leading-relaxed pt-3 border-t border-slate-200">
                            &ldquo;{item.translation}&rdquo;
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[15px] sm:text-base text-slate-800 leading-[1.85]">
                        {item.text.replace(/<!--more-->/g, ' ')}
                      </p>
                    )
                  ) : (
                    <div className="space-y-4">
                      {/* Blurred Arabic, Latin, Translation & Content */}
                      <div className="blur-[6px] select-none pointer-events-none opacity-50 space-y-2.5" aria-hidden="true">
                        {item.type === 'doa' ? (
                          <>
                            <p
                              className="text-xl sm:text-2xl font-arabic text-slate-900 leading-[2.4] text-right"
                              dir="rtl"
                            >
                              {item.text}
                            </p>
                            {item.latin && (
                              <p className="text-xs sm:text-sm text-slate-700 italic">
                                {item.latin}
                              </p>
                            )}
                            {item.translation && (
                              <p className="text-xs sm:text-sm text-slate-600 italic">
                                {item.translation}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                            {item.text.replace(/<!--more-->/g, ' ')}
                          </p>
                        )}
                      </div>

                      {/* Clean Lock Card above/below blurred content */}
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                            <Lock className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} />
                            <span>Khazanah Barokah &amp; Doa Khusus Terkunci</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Buka seluruh bacaan Arab, transliterasi Latin, arti, dan fitur salin doa dengan infaq mulai <strong>Rp 5.000</strong>.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => openBarokahUnlockModal(item)}
                          className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span>Buka Seluruh Barokah &amp; Doa Khusus (Infaq Rp 5.000)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <footer className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900">
              Menyelami Ujian Batin yang Melahirkan Munajat Para Wali
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Di balik setiap wirid yang diwariskan para Auliya Nusantara, tersimpan kisah malam-malam penuh keteguhan dan pertolongan Allah.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openBarokahUnlockModal()}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Buka Seluruh Barokah &amp; Doa Khusus (Infaq Rp 5.000)
            </button>
            <Link
              to="/rubrik"
              className="text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-900 underline underline-offset-4"
            >
              Buka Arsip Kisah →
            </Link>
          </div>
        </footer>
      </div>

      {unlockModalSite && (
        <TransactionModal
          isOpen={Boolean(unlockModalSite)}
          onClose={() => setUnlockModalSite(null)}
          site={unlockModalSite}
          type="barokah_doa"
          onSuccess={() => {}}
        />
      )}
    </div>
  );
});
