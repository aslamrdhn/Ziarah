import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  RotateCcw,
  Copy,
  Sun,
  Smartphone,
  Vibrate,
  BookOpen,
  Check,
  Eye,
  ArrowUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useSiteCopy } from '../lib/siteCopy';
import { useSites } from '../context/SiteContext';
import { getEffectiveSiteDoaKhusus } from '../lib/siteLogistics';
import { PRAYER_SECTIONS } from '../data/bacaanZiarahData';

const STORAGE_KEY = 'ziarah_panduan_prefs_v1';

interface SavedPanduanPrefs {
  tasbihCount: number;
  tasbihMax: 33 | 100;
  tasbihLoops: number;
  fontSize: 'A' | 'A+' | 'A++';
  showLatin: boolean;
  showTerjemahan: boolean;
  outdoorMode: boolean;
  hapticEnabled: boolean;
}


export const BacaanZiarah: React.FC = () => {
  const { copy } = useSiteCopy();
  const { sites: ziarahSites } = useSites();
  const totalSitesCount = ziarahSites.length || 183;
  const totalWiridCount = useMemo(() => {
    let count = 0;
    for (const s of ziarahSites) {
      if (!s || !s.id) continue;
      count += getEffectiveSiteDoaKhusus(s).length;
      const kList = Array.isArray(s.karomah) ? s.karomah.filter(Boolean) : [];
      count += kList.length;
    }
    return count || 549;
  }, [ziarahSites]);
  // Load initial preferences & tasbih state from localStorage
  const [fontSize, setFontSize] = useState<'A' | 'A+' | 'A++'>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (saved.fontSize === 'A' || saved.fontSize === 'A+' || saved.fontSize === 'A++') return saved.fontSize;
    } catch {}
    return 'A';
  });

  const [tasbihCount, setTasbihCount] = useState<number>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.tasbihCount === 'number' && saved.tasbihCount >= 0) return saved.tasbihCount;
    } catch {}
    return 0;
  });

  const [tasbihMax, setTasbihMax] = useState<33 | 100>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (saved.tasbihMax === 33 || saved.tasbihMax === 100) return saved.tasbihMax;
    } catch {}
    return 33;
  });

  const [tasbihLoops, setTasbihLoops] = useState<number>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.tasbihLoops === 'number' && saved.tasbihLoops >= 0) return saved.tasbihLoops;
    } catch {}
    return 0;
  });

  const [showLatin, setShowLatin] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.showLatin === 'boolean') return saved.showLatin;
    } catch {}
    return true;
  });

  const [showTerjemahan, setShowTerjemahan] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.showTerjemahan === 'boolean') return saved.showTerjemahan;
    } catch {}
    return true;
  });

  const [outdoorMode, setOutdoorMode] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.outdoorMode === 'boolean') return saved.outdoorMode;
    } catch {}
    return false;
  });

  const [hapticEnabled, setHapticEnabled] = useState<boolean>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<SavedPanduanPrefs>;
      if (typeof saved.hapticEnabled === 'boolean') return saved.hapticEnabled;
    } catch {}
    return true;
  });

  const [activeStep, setActiveStep] = useState<'SEMUA' | 'SALAM' | 'TAWASSUL' | 'YASIN' | 'TAHLIL' | 'DOA'>('SEMUA');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);
  const [wakeLockSupported, setWakeLockSupported] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window !== 'undefined') {
        setShowBackToTop(window.scrollY > 420);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [tawassulIntent, setTawassulIntent] = useState<string>(() => {
    try {
      return localStorage.getItem('zn_tawassul_intent_v1') || '';
    } catch {
      return '';
    }
  });

  const handleTawassulIntentChange = (val: string) => {
    const clean = val.slice(0, 120);
    setTawassulIntent(clean);
    try {
      localStorage.setItem('zn_tawassul_intent_v1', clean);
    } catch {
      // ignore storage error
    }
  };

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      const prefs: SavedPanduanPrefs = {
        tasbihCount,
        tasbihMax,
        tasbihLoops,
        fontSize,
        showLatin,
        showTerjemahan,
        outdoorMode,
        hapticEnabled,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [tasbihCount, tasbihMax, tasbihLoops, fontSize, showLatin, showTerjemahan, outdoorMode, hapticEnabled]);

  // Screen Wake Lock API integration so screen never dims/locks mid-Yasin or Tahlil
  const requestWakeLock = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      setWakeLockSupported(false);
      return null;
    }
    setWakeLockSupported(true);
    try {
      const sentinel = await (navigator as any).wakeLock.request('screen');
      setWakeLockActive(true);
      sentinel.addEventListener('release', () => {
        setWakeLockActive(false);
      });
      return sentinel;
    } catch {
      setWakeLockActive(false);
      return null;
    }
  }, []);

  useEffect(() => {
    let sentinel: any = null;
    requestWakeLock().then((s) => {
      sentinel = s;
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock().then((s) => {
          sentinel = s;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (sentinel && typeof sentinel.release === 'function') {
        sentinel.release().catch(() => {});
      }
    };
  }, [requestWakeLock]);

  // Haptic Tasbih Digital Handler
  const handleTasbihClick = () => {
    setTasbihCount((prev) => {
      const next = prev + 1;
      if (next >= tasbihMax) {
        // Completed 33 or 100 round -> Double Haptic Pulse [40, 60, 40]
        if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          try {
            navigator.vibrate([40, 60, 40]);
          } catch {}
        }
        setTasbihLoops((loops) => loops + 1);
        return tasbihMax;
      }
      if (prev >= tasbihMax) {
        // Starting new round from 1
        if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          try {
            navigator.vibrate(15);
          } catch {}
        }
        return 1;
      }
      // Standard single tap -> 15ms Haptic Tick
      if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(15);
        } catch {}
      }
      return next;
    });
  };

  const handleResetTasbih = () => {
    if (hapticEnabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(25);
      } catch {}
    }
    setTasbihCount(0);
    setTasbihLoops(0);
  };

  const getArabicFontSizeClass = () => {
    if (fontSize === 'A+') return 'text-4xl md:text-5xl';
    if (fontSize === 'A++') return 'text-5xl md:text-6xl';
    return 'text-3xl md:text-4xl';
  };

  const displayedSections =
    activeStep === 'SEMUA' ? PRAYER_SECTIONS : PRAYER_SECTIONS.filter((s) => s.id === activeStep);

  return (
    <section
      className={`min-h-screen px-4 pt-6 sm:pt-10 pb-28 md:pb-14 md:px-8 transition-colors duration-200 ${
        outdoorMode ? 'bg-white text-black' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Sub-Tab Switcher: Amalan & Doa Hub (/panduan & /doa) */}
        <div
          className={`flex items-center gap-6 border-b overflow-x-auto no-scrollbar ${
            outdoorMode ? 'border-black' : 'border-stone-200/80'
          }`}
        >
          <Link
            to="/panduan"
            aria-current="page"
            className={`pb-3 -mb-px text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              outdoorMode
                ? 'border-black text-black'
                : 'border-emerald-900 text-emerald-950'
            }`}
          >
            1. Tuntunan Yasin, Tahlil &amp; Tasbih
          </Link>
          <Link
            to="/doa"
            className={`pb-3 -mb-px text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 border-transparent transition-colors ${
              outdoorMode
                ? 'text-stone-700 hover:text-black'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            2. {totalWiridCount} Wirid &amp; Doa Khusus Para Wali
          </Link>
        </div>

        {/* Prominent Navigation Banner to /doa */}
        <div
          className={`rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
            outdoorMode
              ? 'bg-stone-100 border-2 border-black text-black'
              : 'bg-emerald-950 text-white border-emerald-900'
          }`}
        >
          <div className="space-y-0.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest block ${
                outdoorMode ? 'text-black' : 'text-emerald-200'
              }`}
            >
              Khazanah Wasilah &amp; Sanad {totalSitesCount} Maqbarah
            </span>
            <p className="text-xs sm:text-sm font-serif">
              Ingin membaca susunan tawassul, hizib, dan doa khusus masing-masing makam Wali Songo &amp; Ulama Nusantara?
            </p>
          </div>
          <Link
            to="/doa"
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap inline-flex items-center justify-center gap-1.5 shrink-0 transition ${
              outdoorMode
                ? 'bg-black text-white hover:bg-stone-800'
                : 'bg-white text-emerald-950 hover:bg-emerald-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <span>Buka {totalWiridCount} Wirid &amp; Doa Khusus Para Wali →</span>
          </Link>
        </div>

        {/* =====================================================================
            1. EDITORIAL HEADER (Bersih Tanpa Kapsul/Bintang)
            ===================================================================== */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span
              className={`text-[11px] font-semibold uppercase tracking-widest block ${
                outdoorMode ? 'text-black' : 'text-emerald-800'
              }`}
            >
              Panduan Ibadah Lapangan · Ahlussunnah wal Jama&apos;ah
            </span>
            <h1
              className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-[1.15] ${
                outdoorMode ? 'text-black font-bold' : 'text-stone-900'
              }`}
            >
              {copy.bacaanTitle}
            </h1>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                outdoorMode ? 'text-stone-900 font-medium' : 'text-stone-600'
              }`}
            >
              {copy.bacaanSubtitle}
            </p>
          </div>

          {/* Field Status Controls (Wake Lock & Outdoor Contrast Toggle) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setOutdoorMode(!outdoorMode)}
              aria-pressed={outdoorMode}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition cursor-pointer border ${
                outdoorMode
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} aria-hidden="true" />
              <span>{outdoorMode ? 'Mode Kontras Matahari: Aktif' : 'Mode Luar Ruangan'}</span>
            </button>

            {wakeLockSupported && (
              <button
                type="button"
                onClick={() => {
                  if (!wakeLockActive) requestWakeLock();
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-tight inline-flex items-center gap-1.5 border ${
                  wakeLockActive
                    ? outdoorMode
                      ? 'bg-stone-100 text-black border-black font-semibold'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-white text-stone-500 border-stone-200/70'
                }`}
                title="Mencegah layar ponsel mati otomatis saat membaca Yasin dan Tahlil"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} aria-hidden="true" />
                <span>{wakeLockActive ? 'Layar Tetap Menyala' : 'Aktifkan Layar Menyala'}</span>
              </button>
            )}
          </div>
        </header>

        {/* Kotak Ringkas Ramah Pemula */}
        <div
          className={`rounded-2xl p-4 sm:p-5 border space-y-1.5 ${
            outdoorMode
              ? 'bg-white border-2 border-black text-black'
              : 'bg-emerald-50/70 border-emerald-200/80 text-stone-800'
          }`}
        >
          <div className={`text-xs sm:text-sm font-serif font-bold ${outdoorMode ? 'text-black' : 'text-emerald-950'}`}>
            Baru Pertama Kali Berziarah?
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${outdoorMode ? 'text-stone-900' : 'text-stone-700'}`}>
            Jangan khawatir bila belum hafal bacaan Arabnya. Seluruh urutan di halaman ini sudah dilengkapi <strong>tulisan Latin dan artinya</strong>. Ingatlah adab utamanya: kita hadir untuk mendoakan ahli kubur dan mengambil keteladanan hidup beliau, sedangkan <strong>seluruh permohonan maupun doa hajat tetap dipanjatkan murni langsung kepada Allah SWT</strong>.
          </p>
        </div>

        {/* =====================================================================
            2. READER TOOLBAR & TASBIH DIGITAL
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* TASBIH DIGITAL INTERAKTIF + HAPTIC */}
          <div
            className={`lg:col-span-5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition ${
              outdoorMode
                ? 'bg-white border-2 border-black shadow-none'
                : 'bg-white border border-stone-200/70 shadow-2xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider block ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    Tasbih Digital Lapangan
                  </span>
                  <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                    Ketuk tanpa perlu menatap layar · Tersimpan otomatis
                  </span>
                </div>

                {/* Target 33 / 100 Segmented Control */}
                <div
                  className={`flex items-center p-1 rounded-lg border ${
                    outdoorMode ? 'bg-stone-100 border-black' : 'bg-stone-100 border-stone-200/70'
                  }`}
                >
                  {([33, 100] as const).map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => {
                        setTasbihMax(target);
                        setTasbihCount(0);
                      }}
                      className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer ${
                        tasbihMax === target
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {target}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Smooth Progress Bar */}
              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-emerald-800 h-full rounded-full"
                  initial={false}
                  animate={{ width: `${Math.min(100, Math.round((tasbihCount / tasbihMax) * 100))}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            </div>

            {/* Giant Tactile Thumb-Zone Tap Area */}
            <div className="my-4 flex items-stretch gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                onClick={handleTasbihClick}
                aria-label={`Tambah hitungan tasbih, saat ini ${tasbihCount} dari ${tasbihMax}`}
                className={`flex-1 min-h-[144px] rounded-xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer select-none transition border ${
                  outdoorMode
                    ? 'bg-stone-50 border-2 border-black hover:bg-stone-100'
                    : 'bg-[#FAF8F5] hover:bg-emerald-950/5 border-stone-200/80'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <motion.span
                    key={tasbihCount}
                    initial={{ scale: 1.2, y: -2 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    className={`font-serif text-5xl sm:text-6xl font-bold tabular-nums tracking-tight ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    {tasbihCount}
                  </motion.span>
                  <span className={`text-sm font-medium tabular-nums ${outdoorMode ? 'text-stone-800' : 'text-stone-400'}`}>
                    / {tasbihMax}
                  </span>
                </div>

                <span
                  className={`text-xs font-medium mt-2 ${
                    tasbihCount === tasbihMax
                      ? 'text-emerald-800 font-semibold'
                      : outdoorMode
                        ? 'text-stone-900'
                        : 'text-stone-500'
                  }`}
                >
                  {tasbihCount === tasbihMax
                    ? 'Alhamdulillah, Selesai 1 Putaran (Ketuk untuk Lanjut)'
                    : 'Ketuk area ini untuk menghitung dzikir'}
                </span>
              </motion.button>

              <button
                type="button"
                onClick={handleResetTasbih}
                title="Reset Hitungan Tasbih"
                aria-label="Reset Hitungan Tasbih"
                className={`px-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  outdoorMode
                    ? 'bg-white border-2 border-black text-black hover:bg-stone-100'
                    : 'bg-white border-stone-200/80 text-stone-500 hover:text-stone-900 hover:border-stone-400'
                }`}
              >
                <RotateCcw className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-[10px] font-medium">Reset</span>
              </button>
            </div>

            {/* Bottom Tasbih Footer: Loop Counter & Haptic Feedback Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200/70 text-xs">
              <span className={outdoorMode ? 'text-black font-semibold' : 'text-stone-500'}>
                Putaran Selesai: <strong className="text-stone-900 tabular-nums">{tasbihLoops}×</strong>
              </span>

              {typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function' ? (
                <button
                  type="button"
                  onClick={() => setHapticEnabled(!hapticEnabled)}
                  aria-pressed={hapticEnabled}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer border ${
                    hapticEnabled
                      ? 'bg-emerald-950/5 text-emerald-800 border-emerald-200/80'
                      : 'bg-stone-100 text-stone-500 border-stone-200/70'
                  }`}
                >
                  <Vibrate className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>Getar Haptik: {hapticEnabled ? 'Aktif' : 'Nonaktif'}</span>
                </button>
              ) : (
                <span className="text-[11px] text-stone-400">
                  Ketukan Visual Aktif
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: READER TOOLBAR (TAHAPAN BACAAN & KONTROL TIPOGRAFI) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* TAHAPAN BACAAN YASIN, TAHLIL & DOA */}
            <div
              className={`rounded-2xl p-5 sm:p-6 flex-1 flex flex-col justify-between transition ${
                outdoorMode
                  ? 'bg-white border-2 border-black'
                  : 'bg-white border border-stone-200/70 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider block ${
                      outdoorMode ? 'text-black' : 'text-stone-900'
                    }`}
                  >
                    Urutan Bacaan Ziarah Kubur
                  </span>
                  <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                    Pilih &ldquo;Semua Sekaligus&rdquo; untuk membaca dari awal hingga doa tanpa mengetuk layar
                  </span>
                </div>
                <Link
                  to="/doa"
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 shrink-0"
                >
                  Buka {totalWiridCount} Wirid &amp; Doa Khusus Para Wali →
                </Link>
              </div>

              {/* Clean Reader Step Buttons (rounded-lg) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('SEMUA')}
                  className={`py-2.5 px-3.5 rounded-lg text-xs font-medium tracking-tight text-left flex items-center justify-between transition cursor-pointer border ${
                    activeStep === 'SEMUA'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : outdoorMode
                        ? 'bg-white text-black border-black hover:bg-stone-100'
                        : 'bg-[#FAF8F5] text-stone-700 border-stone-200/70 hover:border-stone-400'
                  }`}
                >
                  <span>Semua Sekaligus</span>
                  <Eye className="w-3.5 h-3.5 opacity-80 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </button>

                {PRAYER_SECTIONS.map((sec) => {
                  const isSelected = activeStep === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveStep(sec.id)}
                      className={`py-2.5 px-3.5 rounded-lg text-xs font-medium tracking-tight text-left flex items-center justify-between transition cursor-pointer border ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900'
                          : outdoorMode
                            ? 'bg-white text-black border-black hover:bg-stone-100'
                            : 'bg-[#FAF8F5] text-stone-700 border-stone-200/70 hover:border-stone-400'
                      }`}
                    >
                      <span>{sec.stepLabel}</span>
                      <BookOpen className="w-3.5 h-3.5 opacity-60 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* KONTROL TIPOGRAFI ARAB & TERJEMAHAN */}
            <div
              className={`rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                outdoorMode
                  ? 'bg-white border-2 border-black'
                  : 'bg-white border border-stone-200/70 shadow-2xs'
              }`}
            >
              <div className="space-y-1">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider block ${
                    outdoorMode ? 'text-black' : 'text-stone-900'
                  }`}
                >
                  Tipografi Naskh &amp; Terjemahan
                </span>
                <span className={`text-xs ${outdoorMode ? 'text-stone-800' : 'text-stone-500'}`}>
                  Atur ukuran harakat Arab serta tampilan Latin &amp; arti Bahasa Indonesia
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Font Size Segmented Control */}
                <div
                  className={`flex items-center p-1 rounded-lg border ${
                    outdoorMode ? 'bg-stone-100 border-black' : 'bg-[#FAF8F5] border-stone-200/80'
                  }`}
                >
                  {(['A', 'A+', 'A++'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                        fontSize === size
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Latin Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowLatin(!showLatin)}
                  aria-pressed={showLatin}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer border ${
                    showLatin
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400'
                  }`}
                >
                  {showLatin ? 'Latin: Aktif' : 'Latin'}
                </button>

                {/* Translation Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowTerjemahan(!showTerjemahan)}
                  aria-pressed={showTerjemahan}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer border ${
                    showTerjemahan
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400'
                  }`}
                >
                  {showTerjemahan ? 'Terjemahan: Aktif' : 'Terjemahan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. MINIMALIST INLINE TAWASSUL INPUT ABOVE READING CANVAS
            ===================================================================== */}
        <div
          className={`py-4 px-1 border-b ${
            outdoorMode ? 'border-black' : 'border-stone-200/80'
          }`}
        >
          <div className="max-w-3xl space-y-2">
            <label
              htmlFor="tawassul-intent-input"
              className={`block font-serif text-base sm:text-lg ${
                outdoorMode ? 'text-black font-bold' : 'text-stone-900'
              }`}
            >
              {copy.tawassulTitle}
            </label>
            <input
              id="tawassul-intent-input"
              type="text"
              value={tawassulIntent}
              onChange={(e) => handleTawassulIntentChange(e.target.value)}
              placeholder={copy.tawassulPlaceholder}
              className={`w-full border-b bg-transparent py-2 text-sm focus:outline-none transition-colors ${
                outdoorMode
                  ? 'border-black text-black placeholder-stone-600 font-medium'
                  : 'border-stone-200 focus:border-emerald-700 text-stone-900 placeholder-stone-400'
              }`}
            />
            {tawassulIntent.trim() && (
              <p
                className={`pt-2 font-serif italic text-sm sm:text-base leading-relaxed ${
                  outdoorMode ? 'text-black font-semibold' : 'text-emerald-900'
                }`}
              >
                Khususon ilaa ruuhi / hajat: &ldquo;{tawassulIntent}&rdquo; — Semoga Allah lapangkan kuburnya dengan cahaya kasih-Nya, terima setiap tetes rindu dalam doa ini, dan bukakan jalan keluar bagi setiap beban yang menyesakkan dada. Al-Fatihah...
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {displayedSections.map((section) => {
            const isCopied = copiedId === section.id;
            return (
              <article
                key={section.id}
                className={`rounded-2xl p-6 sm:p-10 transition ${
                  outdoorMode
                    ? 'bg-white border-2 border-black shadow-none'
                    : 'bg-white border border-stone-200/70 shadow-2xs'
                }`}
              >
                {/* Section Header */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-8 border-b ${
                    outdoorMode ? 'border-black' : 'border-stone-200/70'
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-widest block ${
                        outdoorMode ? 'text-black' : 'text-emerald-800'
                      }`}
                    >
                      {section.stepLabel}
                    </span>
                    <h2
                      className={`font-serif text-xl sm:text-2xl font-normal tracking-tight ${
                        outdoorMode ? 'text-black font-bold' : 'text-stone-900'
                      }`}
                    >
                      {section.title}
                    </h2>
                    <p className={`text-xs ${outdoorMode ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                      {section.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const fullText = `${section.title}\n\n${section.arabicLines.join('\n')}\n\nLatin:\n${section.latinText}\n\nArtinya:\n${section.translationText}`;
                      navigator.clipboard?.writeText(fullText);
                      setCopiedId(section.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className={`self-start sm:self-auto px-3.5 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer border ${
                      outdoorMode
                        ? 'bg-white text-black border-black hover:bg-stone-100'
                        : 'bg-[#FAF8F5] text-stone-700 border-stone-200/80 hover:border-stone-400'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} aria-hidden="true" />
                        <span className="text-emerald-700 font-semibold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>Salin Bacaan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Arabic Naskh Text, Latin Transliteration & Translation with Spacious Contrast */}
                <div className="max-w-3xl mx-auto">
                  <div className="divide-y divide-stone-200/50" dir="rtl">
                    {section.arabicLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="py-5 border-b border-stone-200/50 last:border-b-0 text-right sm:text-center"
                      >
                        <p
                          className={`font-arabic leading-[2.6] ${getArabicFontSizeClass()} ${
                            outdoorMode ? 'text-black font-bold' : 'text-stone-950'
                          }`}
                        >
                          {line}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Transliterasi Latin & Terjemahan Bahasa Indonesia */}
                  {(showLatin || showTerjemahan) && (
                    <div
                      className={`mt-6 pt-5 border-t text-left sm:text-center ${
                        outdoorMode ? 'border-black' : 'border-stone-200/70'
                      }`}
                    >
                      {showLatin && (
                        <p
                          className={`font-medium text-sm sm:text-base mt-3 leading-relaxed whitespace-pre-line ${
                            outdoorMode ? 'text-black font-semibold' : 'text-emerald-900/90'
                          }`}
                        >
                          &ldquo;{section.latinText}&rdquo;
                        </p>
                      )}

                      {showTerjemahan && (
                        <p
                          className={`italic text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl mx-auto ${
                            outdoorMode ? 'text-black font-medium' : 'text-stone-600'
                          }`}
                        >
                          &ldquo;{section.translationText}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================================
            4. CALM EDITORIAL CLOSING FOOTER (Tahap Desain 3)
            ===================================================================== */}
        <footer className="py-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xl space-y-1.5">
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              {copy.postPrayerTitle}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {copy.postPrayerDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/infaq"
              className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Titipkan Doa di Dinding Munajat
            </Link>
            <Link
              to="/buku-yasin"
              className="px-4 py-2.5 rounded-xl border border-stone-300 bg-[#FAF8F5] hover:border-emerald-800 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
            >
              Susun Buku Tahlil &amp; Doa Arwah Kenangan (A5) →
            </Link>
            <Link
              to="/rubrik"
              className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4"
            >
              Baca Riwayat Para Wali →
            </Link>
          </div>
        </footer>
      </div>

      {/* Crawlable SEO Content (SR-Only so visual design remains 100% clean) */}
      <div className="sr-only">
        <h2>Apa Tujuan &amp; Hukum Ziarah Kubur dalam Islam?</h2>
        <p>
          Dalam syariat Islam, hukum ziarah kubur adalah sunnah berdasarkan hadits riwayat Imam Muslim (no. 977). Tujuan
          ziarah kubur adalah mengingatkan diri kepada kematian dan akhirat, mendoakan ampunan bagi ahli kubur, serta
          meneladani perjuangan dakwah para Waliyullah.
        </p>
        <h2>Urutan Bacaan Doa Ziarah Kubur Singkat</h2>
        <ol>
          <li>Berwudhu dan meluruskan niat ziarah kubur karena Allah SWT.</li>
          <li>
            Mengucapkan salam ahli kubur: Assalaamu&apos;alaikum ahlad-diyaari minal mu&apos;miniina wal muslimiin, wa
            innaa insyaa Allaahu bikum laahiquun, nas&apos;alullaaha lanaa wa lakumul &apos;aafiyah.
          </li>
          <li>Membaca Istighfar 3x dan Tawassul Al-Fatihah kepada Rasulullah SAW, para Waliyullah, dan ahli kubur.</li>
          <li>Membaca Surah Yasin, Al-Ikhlas (3x), Al-Falaq, An-Nas, dan Ayat Kursi.</li>
          <li>Membaca kalimat thayyibah Tahlil (Laa ilaaha illallaah) dan tasbih.</li>
          <li>Membaca doa khusus ziarah kubur (doa arwah) memohon ampunan dan rahmat Allah SWT.</li>
        </ol>
        <ul>
          <li><Link to="/situs/sunan-gresik">Makam Sunan Gresik</Link></li>
          <li><Link to="/situs/sunan-ampel-surabaya">Makam Sunan Ampel Surabaya</Link></li>
          <li><Link to="/situs/sunan-bonang-tuban">Makam Sunan Bonang Tuban</Link></li>
          <li><Link to="/situs/sunan-drajat-lamongan">Makam Sunan Drajat Lamongan</Link></li>
          <li><Link to="/situs/sunan-kudus">Makam Sunan Kudus</Link></li>
          <li><Link to="/situs/sunan-giri-gresik">Makam Sunan Giri Gresik</Link></li>
          <li><Link to="/situs/sunan-kalijaga-demak">Makam Sunan Kalijaga Demak</Link></li>
          <li><Link to="/situs/sunan-muria-kudus">Makam Sunan Muria Kudus</Link></li>
          <li><Link to="/situs/sunan-gunung-jati-cirebon">Makam Sunan Gunung Jati Cirebon</Link></li>
        </ul>
      </div>

      {/* Tombol Mengambang Kecil "Kembali ke Atas" (↑) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke Atas"
          className={`fixed bottom-24 md:bottom-8 right-4 sm:right-6 z-40 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium shadow-lg transition-all cursor-pointer border ${
            outdoorMode
              ? 'bg-black text-white border-black'
              : 'bg-[#1D1D1F]/90 hover:bg-[#1D1D1F] text-white border-white/15 backdrop-blur-md'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
          <span>Kembali ke Atas</span>
        </button>
      )}
    </section>
  );
};
