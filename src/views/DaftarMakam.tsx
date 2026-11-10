import React, { useState, useEffect, useMemo, useDeferredValue, lazy, Suspense } from 'react';
import {
  Search,
  X,
  Compass,
  Filter,
  ArrowDown,
  BookOpen,
  Map as MapIcon,
  Film,
} from 'lucide-react';
import type { ZiarahSite } from '../data/sites';
import { ALL_PROVINCES, TOTAL_SITE_COUNT } from '../data/initialSites';
import { useSites } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { optimizeSiteImageUrl, getSiteImageSrcSet, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSitePath } from '../lib/siteSlugs';
import { extractShortEra, getSiteBarokahHajat, getEffectiveSiteDoaKhusus } from '../lib/siteLogistics';
import { useSiteCopy } from '../lib/siteCopy';
import { ZiarahStoryReel } from '../components/ZiarahStoryReel';

const SiteDetails = lazy(() =>
  import('../components/SiteDetails').then((m) => ({ default: m.SiteDetails }))
);

const HeroCinemaShowcase = lazy(() =>
  import('../components/HeroCinemaShowcase').then((m) => ({ default: m.HeroCinemaShowcase }))
);

const InteractiveHeritageCanvas = lazy(() =>
  import('../components/InteractiveHeritageCanvas').then((m) => ({ default: m.InteractiveHeritageCanvas }))
);

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
  savedSiteIds?: string[];
  handleToggleSave?: (id: string) => void;
  savedDoas?: string[];
  onToggleSaveDoa?: (id: string) => void;
  onOpenKontribusi?: () => void;
}

export type EmotionalIntentId = 'all' | 'keteduhan' | 'ikhtiar' | 'keteguhan' | 'ilmu';

const EMOTIONAL_INTENTS: Array<{
  id: EmotionalIntentId;
  label: string;
}> = [
  { id: 'all', label: 'Semua Riwayat' },
  { id: 'keteduhan', label: 'Penawar Hati' },
  { id: 'ikhtiar', label: 'Ikhtiar & Rezeki' },
  { id: 'keteguhan', label: 'Keteguhan Uji' },
  { id: 'ilmu', label: 'Sanad Keilmuan' },
];

function extractCoreWasilahHajat(rawHajat: string): string {
  const cleaned = (rawHajat || '').replace(/<!--more-->/g, ' ').replace(/\s+/g, ' ').trim();
  const withoutPrefix = cleaned
    .replace(
      /^(?:Biasanya peziarah yang datang ke makam|Para peziarah dan santri yang berziarah ke pusara|Banyak jamaah dan peziarah datang ke makam)\s+[^,]+?(?:bertawassul mengharapkan wasilah|lazim bertawassul memohon wasilah|dengan hajat memohon wasilah)\s+/i,
      ''
    )
    .trim();
  if (!withoutPrefix) return cleaned;
  return withoutPrefix.charAt(0).toUpperCase() + withoutPrefix.slice(1);
}

export function matchesEmotionalIntent(site: ZiarahSite, intent: EmotionalIntentId): boolean {
  if (intent === 'all') return true;

  const primaryCorpus = [
    site.id,
    site.title,
    site.name,
    site.category,
    site.era || '',
    (site.description || '').replace(/<!--more-->/g, ' '),
  ]
    .join(' ')
    .toLowerCase();

  switch (intent) {
    case 'keteduhan': {
      const keywords = [
        'kelembutan',
        'wayang',
        'gamelan',
        'tembang',
        'suluk',
        'ketenangan',
        'keteduhan',
        'mahabbah',
        'sholawat',
        'kalijaga',
        'bonang',
        'muria',
        'sekumpul',
        'sholeh tanggul',
        'hamid pasuruan',
        'abu bakar',
        'al-haddad',
        'al-aydrus',
      ];
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        site.category === 'Habaib' ||
        site.id === 'wali-4' ||
        site.id === 'wali-8' ||
        site.id === 'wali-9'
      );
    }
    case 'ikhtiar': {
      const keywords = [
        'rezeki',
        'dagang',
        'perniagaan',
        'niaga',
        'pelabuhan',
        'saudagar',
        'dermawan',
        'kedermawanan',
        'pertanian',
        'nelayan',
        'kemakmuran',
        'drajat',
        'malik ibrahim',
        'kuncung',
        'luar batang',
        'kwitang',
        'empang bogor',
      ];
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        site.id === 'wali-1' ||
        site.id === 'wali-2' ||
        site.id === 'wali-6' ||
        site.id === 'wali-9'
      );
    }
    case 'keteguhan': {
      const keywords = [
        'pahlawan',
        'perlawanan',
        'benteng',
        'pengasingan',
        'diasingkan',
        'laskar',
        'jihad',
        'diponegoro',
        'fatahillah',
        'faletehan',
        'sultan agung',
        'hasanuddin',
        'imam bonjol',
        'cik di tiro',
        'antasari',
        'yusuf al-makassari',
        'abdul jalil',
      ];
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        site.id === 'wali-3' ||
        site.id === 'wali-5' ||
        site.id === 'wali-7'
      );
    }
    case 'ilmu': {
      const keywords = [
        'kitab',
        'pengarang',
        'mahaguru',
        'fikih',
        'hadits',
        'tafsir',
        'nahwu',
        'pesantren',
        'madrasah',
        'kholil',
        'hasyim',
        'wahab',
        'bisri',
        'nawawi',
        'arsyad',
        'mahfudz',
        'sholeh darat',
        'abdurrauf',
        'hamzah fansuri',
        'as\'ad',
      ];
      return keywords.some((kw) => primaryCorpus.includes(kw));
    }
    default:
      return true;
  }
}

const INITIAL_VISIBLE_SITES = 12;

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({
  onSelectSite,
  savedSiteIds = [],
  handleToggleSave,
  savedDoas = [],
  onToggleSaveDoa,
  onOpenKontribusi,
}) => {
  const { sites: ziarahSites, isLoading, ensureFullSitesLoaded } = useSites();
  const { copy } = useSiteCopy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [emotionalFilter, setEmotionalFilter] = useState<EmotionalIntentId>('all');
  const [showVisualShowcase, setShowVisualShowcase] = useState(false);
  const [showEditorialFaq, setShowEditorialFaq] = useState(false);
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'constellation'>('video');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_SITES);
  const [activeSiteModal, setActiveSiteModal] = useState<ZiarahSite | null>(null);
  const [originPathBeforeModal, setOriginPathBeforeModal] = useState<string>('/');

  const handleOpenReaderModal = React.useCallback(
    (site: ZiarahSite, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }
      ensureFullSitesLoaded();
      if (typeof window !== 'undefined') {
        const current = window.location.pathname.startsWith('/direktori') ? '/direktori' : '/';
        setOriginPathBeforeModal(current);
        window.history.pushState({ inPlaceReaderSiteId: site.id }, '', getSitePath(site));
      }
      setActiveSiteModal(site);
    },
    [ensureFullSitesLoaded]
  );

  const handleCloseReaderModal = React.useCallback(() => {
    setActiveSiteModal(null);
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/situs/') || window.location.pathname.startsWith('/makam/'))) {
      window.history.pushState(null, '', originPathBeforeModal || '/');
    }
  }, [originPathBeforeModal]);

  useEffect(() => {
    const onPopState = () => {
      if (activeSiteModal) {
        setActiveSiteModal(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeSiteModal]);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const sites = ziarahSites;
  const currentModalSite = useMemo(
    () => (activeSiteModal ? ziarahSites.find((s) => s.id === activeSiteModal.id) || activeSiteModal : null),
    [activeSiteModal, ziarahSites]
  );
  const isJumatMomentum = [4, 5].includes(new Date().getDay());
  const featuredHaulSite =
    sites.find((s) => Boolean(s.haulSchedule && (s.untoldStory || s.karomah))) || sites[0];

  const categories = useMemo(
    () => [
      { id: 'Semua', label: copy.tabLabelAll },
      { id: 'Walisongo', label: copy.tabLabelWaliSongo },
      { id: 'Ulama Nusantara', label: copy.tabLabelUlama },
      { id: 'Habaib', label: 'Habaib' },
      { id: 'Auliya Nusantara', label: copy.tabLabelRaja },
    ],
    [copy.tabLabelAll, copy.tabLabelWaliSongo, copy.tabLabelUlama, copy.tabLabelRaja]
  );

  const dynamicEmotionalIntents = useMemo(
    () =>
      EMOTIONAL_INTENTS.map((item) => ({
        id: item.id,
        label: copy.intentLabels?.[item.id] || item.label,
      })),
    [copy.intentLabels]
  );

  const provinces = useMemo(() => {
    const merged = new Set<string>(ALL_PROVINCES);
    for (const s of ziarahSites) {
      if (s.location?.province) merged.add(s.location.province);
    }
    const list = Array.from(merged).filter((p) => p !== 'Semua Provinsi').sort();
    return ['Semua Provinsi', ...list];
  }, [ziarahSites]);

  const totalCatalogCount = Math.max(TOTAL_SITE_COUNT, ziarahSites.length);

  // Precompute search corpus and emotional intent flags once per site array change
  const siteSearchIndexMap = useMemo(() => {
    const map = new Map<
      string,
      {
        searchCorpus: string;
        intents: Record<Exclude<EmotionalIntentId, 'all'>, boolean>;
      }
    >();
    for (const site of ziarahSites) {
      const searchCorpus = [
        site.name,
        site.title,
        site.location.city,
        site.location.province,
        (site.description || '').replace(/<!--more-->/g, ' '),
        (site.history || '').replace(/<!--more-->/g, ' '),
        site.sanad || '',
        site.era || '',
      ]
        .join(' ')
        .toLowerCase();

      map.set(site.id, {
        searchCorpus,
        intents: {
          keteduhan: matchesEmotionalIntent(site, 'keteduhan'),
          ikhtiar: matchesEmotionalIntent(site, 'ikhtiar'),
          keteguhan: matchesEmotionalIntent(site, 'keteguhan'),
          ilmu: matchesEmotionalIntent(site, 'ilmu'),
        },
      });
    }
    return map;
  }, [ziarahSites]);

  const baseFilteredSites = useMemo(() => {
    const q = deferredSearchQuery.toLowerCase().trim();
    return ziarahSites.filter((site: ZiarahSite) => {
      const indexed = siteSearchIndexMap.get(site.id);
      const matchesSearch = !q || (indexed ? indexed.searchCorpus.includes(q) : true);
      const matchesCategory = selectedCategory === 'Semua' || site.category === selectedCategory;
      const matchesProvince = selectedProvince === 'Semua Provinsi' || site.location.province === selectedProvince;

      return matchesSearch && matchesCategory && matchesProvince;
    });
  }, [deferredSearchQuery, selectedCategory, selectedProvince, ziarahSites, siteSearchIndexMap]);

  const intentCountMap = useMemo(() => {
    const counts: Record<EmotionalIntentId, number> = {
      all: baseFilteredSites.length,
      keteduhan: 0,
      ikhtiar: 0,
      keteguhan: 0,
      ilmu: 0,
    };
    for (const site of baseFilteredSites) {
      const indexed = siteSearchIndexMap.get(site.id);
      if (indexed ? indexed.intents.keteduhan : matchesEmotionalIntent(site, 'keteduhan')) counts.keteduhan++;
      if (indexed ? indexed.intents.ikhtiar : matchesEmotionalIntent(site, 'ikhtiar')) counts.ikhtiar++;
      if (indexed ? indexed.intents.keteguhan : matchesEmotionalIntent(site, 'keteguhan')) counts.keteguhan++;
      if (indexed ? indexed.intents.ilmu : matchesEmotionalIntent(site, 'ilmu')) counts.ilmu++;
    }
    return counts;
  }, [baseFilteredSites, siteSearchIndexMap]);

  const filteredSites = useMemo(() => {
    if (emotionalFilter === 'all') {
      return baseFilteredSites;
    }

    const intentMatches = baseFilteredSites.filter((site) => {
      const indexed = siteSearchIndexMap.get(site.id);
      return indexed ? indexed.intents[emotionalFilter] : matchesEmotionalIntent(site, emotionalFilter);
    });
    return intentMatches;
  }, [baseFilteredSites, emotionalFilter, siteSearchIndexMap]);

  const isFiltered =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== 'Semua' ||
    selectedProvince !== 'Semua Provinsi' ||
    emotionalFilter !== 'all';

  const displayedSites = useMemo(() => {
    if (isFiltered) return filteredSites;
    return filteredSites.slice(0, visibleCount);
  }, [filteredSites, isFiltered, visibleCount]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-600">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic">Memuat arsip &amp; direktori makam Nusantara...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF8F5] text-stone-900 px-4 py-5 sm:py-10 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* =====================================================================
            1. EDITORIAL HEADER: Kompak di Ponsel (< 640px), Tanpa Kapsul Berlapis
            ===================================================================== */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-5">
          <div className="space-y-1.5 sm:space-y-2.5 max-w-2xl">
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
              {copy.heroBadge}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-stone-900 leading-snug">
              {copy.heroTitle}
            </h1>
            <p className="text-xs sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              {copy.heroSubtitle}
            </p>
          </div>

          {/* Subtle Editorial Quick Actions (1 Baris Geser Horizontal Kompak di HP) */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 items-center shrink-0">
            <Link
              to="/peta"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-900 text-white text-xs font-medium tracking-tight inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition"
            >
              <MapIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>Peta &amp; Jalur Wali Songo</span>
            </Link>
            <Link
              to="/panduan"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:border-stone-400 text-stone-700 border border-stone-200/80 text-xs font-medium tracking-tight inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-800 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>Yasin, Tahlil &amp; Tasbih</span>
            </Link>
            <button
              type="button"
              onClick={() => setShowVisualShowcase(!showVisualShowcase)}
              className={`px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-medium tracking-tight inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition cursor-pointer border ${
                showVisualShowcase
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-emerald-800 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>{showVisualShowcase ? 'Tutup Eksplorasi Visual' : 'Buka Eksplorasi Visual Nusantara'}</span>
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById('hikmah-ziarah-reel')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-3.5 py-2 sm:py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium tracking-tight inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition cursor-pointer"
            >
              <span>Hikmah Ziarah · 5 Slide</span>
            </button>
          </div>
        </header>

        {/* Optional Collapsible Documentary / Constellation Showcase */}
        {showVisualShowcase && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/70 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-stone-600 tracking-tight">
                Eksplorasi Visual Jaringan Dakwah Nusantara
              </span>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('video')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'video' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>Dokumenter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('constellation')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'constellation' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>Konstelasi</span>
                </button>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="h-[340px] rounded-2xl bg-stone-900 flex items-center justify-center text-stone-200 text-xs">
                  Memuat Visualisasi...
                </div>
              }
            >
              {heroMediaMode === 'video' ? (
                <HeroCinemaShowcase
                  onSelectCategory={(cat) => {
                    ensureFullSitesLoaded();
                    setSelectedCategory(cat);
                  }}
                />
              ) : (
                <InteractiveHeritageCanvas
                  activeCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    ensureFullSitesLoaded();
                    setSelectedCategory(cat);
                  }}
                />
              )}
            </Suspense>
          </div>
        )}

        {/* =====================================================================
            1B. SATU BARIS KALIMAT PEMBUKA MINIMALIS TANPA KOTAK (Editorial Lead)
            ===================================================================== */}
        {isJumatMomentum ? (
          <div className="py-2.5 border-y border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <p className="font-serif italic text-stone-700 leading-relaxed">
              {copy.jumatBannerTitle} — {copy.jumatBannerSubtitle}
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/rubrik"
                className="py-1.5 min-h-[32px] inline-flex items-center text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
              >
                Buka kisah pengobat hati
              </Link>
              <Link
                to="/infaq"
                className="py-1.5 min-h-[32px] inline-flex items-center text-xs font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4"
              >
                Titip doa
              </Link>
            </div>
          </div>
        ) : featuredHaulSite ? (
          <div className="py-2.5 border-y border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <p className="font-serif italic text-stone-700 leading-relaxed">
              Jejak Haul &amp; Wasiat {featuredHaulSite.title} ({featuredHaulSite.haulSchedule || 'Waliyullah Nusantara'}) — Menyelami rahasia keteguhan batin beliau saat menghadapi ujian zaman.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={(e) => handleOpenReaderModal(featuredHaulSite, e)}
                className="py-1.5 min-h-[32px] inline-flex items-center text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
              >
                Baca wasiat beliau
              </button>
              <Link
                to="/infaq"
                className="py-1.5 min-h-[32px] inline-flex items-center text-xs font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4"
              >
                Dinding munajat
              </Link>
            </div>
          </div>
        ) : null}

        {/* =====================================================================
            2. UNIFIED SEARCH & FILTER BAR (Direct-to-Content Layout)
            ===================================================================== */}
        <div id="katalog-direktori" className="space-y-4">
          {/* Unified Search Input + Province Select */}
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70">
            <div className="relative flex-1">
              <label htmlFor="site-search-input" className="sr-only">
                Cari nama tokoh, makam, atau kota
              </label>
              <Search
                className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <input
                id="site-search-input"
                type="search"
                placeholder={copy.searchPlaceholder}
                value={searchQuery}
                onFocus={() => {
                  ensureFullSitesLoaded();
                }}
                onChange={(e) => {
                  ensureFullSitesLoaded();
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-11 pr-10 py-3 bg-transparent text-sm text-stone-900 placeholder-stone-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative sm:w-56 shrink-0">
              <label htmlFor="province-filter-select" className="sr-only">
                Filter berdasarkan provinsi
              </label>
              <select
                id="province-filter-select"
                aria-label="Filter berdasarkan provinsi"
                value={selectedProvince}
                onFocus={() => {
                  ensureFullSitesLoaded();
                }}
                onChange={(e) => {
                  ensureFullSitesLoaded();
                  setSelectedProvince(e.target.value);
                }}
                className="w-full appearance-none pl-4 pr-9 py-3 bg-transparent text-xs sm:text-sm font-medium text-stone-700 cursor-pointer focus:outline-none"
              >
                {provinces.map((prov) => (
                  <option key={prov} value={prov} className="bg-white text-stone-900">
                    {prov}
                  </option>
                ))}
              </select>
              <Filter
                className="w-3.5 h-3.5 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Minimalist Underline Tabs for Category + Clean Text Chips for Emotional Intent */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-200">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      ensureFullSitesLoaded();
                      setSelectedCategory(cat.id);
                    }}
                    className={`pb-3 -mb-px text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                      isSelected
                        ? 'border-emerald-800 text-emerald-950 font-semibold'
                        : 'border-transparent text-stone-600 hover:text-stone-900 font-medium'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Clean Text Chips for Emotional Intent */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2.5 lg:pb-2">
              {dynamicEmotionalIntents.map((intent) => {
                const isSelected = emotionalFilter === intent.id;
                const count = intentCountMap[intent.id];
                return (
                  <button
                    key={intent.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      ensureFullSitesLoaded();
                      setEmotionalFilter(intent.id);
                    }}
                    className={`px-3 py-1.5 min-h-[32px] rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900 text-white font-medium'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {intent.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subtle Results Status Row */}
        <div className="flex items-center justify-between text-xs text-stone-600 px-0.5">
          <p>
            Menampilkan <strong className="font-semibold text-stone-900">{displayedSites.length}</strong> dari{' '}
            <strong className="font-semibold text-stone-900">
              {isFiltered ? filteredSites.length : totalCatalogCount}
            </strong>{' '}
            makam di {provinces.length - 1} provinsi
            {selectedCategory !== 'Semua' && <span> · {selectedCategory}</span>}
            {selectedProvince !== 'Semua Provinsi' && <span> · {selectedProvince}</span>}
            {emotionalFilter !== 'all' && (
              <span> · {dynamicEmotionalIntents.find((i) => i.id === emotionalFilter)?.label}</span>
            )}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedProvince('Semua Provinsi');
                setEmotionalFilter('all');
                setVisibleCount(INITIAL_VISIBLE_SITES);
              }}
              className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* =====================================================================
            3. CLEAN CARD GRID (Airbnb / Kinfolk Editorial Card Style)
            ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedSites.map((site, index) => {
            const optimizedThumb = optimizeSiteImageUrl(site.imageUrl, 480, 68);
            const thumbSrcSet = getSiteImageSrcSet(site.imageUrl, 68);
            const siteUrl = getSitePath(site);
            const shortEra = extractShortEra(site.era);
            const badgeLabel = site.category === 'Walisongo' ? 'Wali Songo' : site.category;
            const isLcpCandidate = index === 0;
            const snippetText = (site.untoldStory || site.description || '')
              .replace(/<!--more-->/g, ' ')
              .trim();
            const coreHajatText = extractCoreWasilahHajat(getSiteBarokahHajat(site));
            const karomahCount = Array.isArray(site.karomah) && site.karomah.length > 0 ? site.karomah.length : 1;
            const doaCount = getEffectiveSiteDoaKhusus(site).length;
            const practicalInfo = site.haulSchedule
              ? `Haul: ${site.haulSchedule}`
              : site.openingHours
                ? `Buka: ${site.openingHours}`
                : 'Buka Setiap Hari';

            return (
              <article key={site.id} className={index >= 3 ? 'group content-auto' : 'group'}>
                <a
                  href={siteUrl}
                  onClick={(e) => handleOpenReaderModal(site, e)}
                  aria-label={`Baca kisah, karomah, dan panduan Makam ${site.title} (${site.name}) di ${site.location.city}, ${site.location.province}`}
                  className="block cursor-pointer space-y-3 focus:outline-none"
                >
                  {/* 1. Foto Rasio 4:3 dengan sudut membulat (rounded-2xl) & 1 Label Sudut */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200">
                    <img
                      src={optimizedThumb}
                      srcSet={thumbSrcSet}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                      onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                      alt={`Makam ${site.title} (${site.name}) — ${site.location.city}, ${site.location.province}`}
                      width={400}
                      height={300}
                      loading={isLcpCandidate ? 'eager' : 'lazy'}
                      fetchPriority={isLcpCandidate ? 'high' : 'auto'}
                      decoding={isLcpCandidate ? 'sync' : 'async'}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-950/80 text-white backdrop-blur-xs">
                      {badgeLabel}
                    </span>
                  </div>

                  {/* 2. Konten di Bawah Foto: Kota/Provinsi, Judul Serif, Kotak Ringkas Wasilah Hajat, Cuplikan */}
                  <div className="space-y-1 px-0.5">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-600 font-medium">
                      <span className="truncate">
                        {site.location.city}, {site.location.province}
                      </span>
                      <span className="shrink-0 text-[11px] text-slate-500 truncate max-w-[140px]">
                        {shortEra || practicalInfo}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                      Makam {site.title}
                    </h2>

                    <div className="text-[11px] text-slate-500 truncate">
                      {practicalInfo}
                    </div>

                    {/* Kotak Ringkas Wasilah Hajat Spesifik */}
                    <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl px-3 py-2 my-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          Wasilah Hajat Spesifik
                        </span>
                        <span className="text-[10px] font-medium text-emerald-800">
                          {karomahCount} Karomah · {doaCount} Doa
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium line-clamp-2 mt-0.5 leading-relaxed">
                        {coreHajatText}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {snippetText}
                    </p>
                  </div>
                </a>

                {/* 3. Footer Aksi Terpisah */}
                <div className="pt-2.5 mt-3 border-t border-slate-200 flex items-center justify-between gap-3 px-0.5 text-xs text-slate-600">
                  <button
                    type="button"
                    onClick={() => onSelectSite(site)}
                    className="py-2 pr-3 min-h-[36px] inline-flex items-center hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                  >
                    {copy.cardSecondaryMapCta}
                  </button>
                  <a
                    href={siteUrl}
                    onClick={(e) => handleOpenReaderModal(site, e)}
                    className="py-2 pl-3 min-h-[36px] inline-flex items-center font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-transform"
                  >
                    {copy.cardCtaLabel}
                  </a>
                </div>
              </article>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200/70 shadow-2xs my-4">
              <div className="inline-flex p-3.5 bg-stone-100 text-stone-600 rounded-2xl mb-3">
                <Compass className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-1">Situs Tidak Ditemukan</h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-5">
                Silakan gunakan kata kunci lain, atau sesuaikan filter kategori dan provinsi di atas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setSelectedProvince('Semua Provinsi');
                  setEmotionalFilter('all');
                  setVisibleCount(INITIAL_VISIBLE_SITES);
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-emerald-900 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Tampilkan Semua Situs
              </button>
            </div>
          )}
        </div>

        {/* Progressive Load More Controls */}
        {!isFiltered && visibleCount < totalCatalogCount && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={async () => {
                const all = await ensureFullSitesLoaded();
                setVisibleCount((prev) => Math.min(all.length, prev + 12));
              }}
              className="px-6 py-3 bg-stone-900 hover:bg-emerald-900 text-white rounded-xl text-xs font-medium tracking-tight inline-flex items-center gap-2 transition cursor-pointer shadow-2xs"
            >
              <span>Tampilkan Lebih Banyak (+{Math.min(12, totalCatalogCount - visibleCount)} Situs)</span>
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={async () => {
                const all = await ensureFullSitesLoaded();
                setVisibleCount(all.length);
              }}
              className="px-5 py-3 bg-white hover:border-stone-400 text-stone-700 border border-stone-200/80 rounded-xl text-xs font-medium tracking-tight transition cursor-pointer"
            >
              Buka Seluruh {totalCatalogCount} Situs
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          3.8. STORY REEL & AUDIO-VISUAL CAROUSEL (OPSI 2: 5 SLIDE HIKMAH ZIARAH)
          ===================================================================== */}
      <div id="hikmah-ziarah-reel" className="max-w-6xl mx-auto mt-12 mb-6">
        <ZiarahStoryReel />
      </div>

      {/* =====================================================================
          4. VISIBLE INDONESIAN EDITORIAL GUIDE & FAQ (100% Crawlable by Google WRS & CLD3)
          ===================================================================== */}
      <article
        lang="id"
        aria-label="Panduan Lengkap Pengertian, Hukum, Adab, dan Urutan Bacaan Doa Ziarah Kubur dalam Islam"
        className="max-w-6xl mx-auto mt-10 pt-8 border-t border-stone-200/80 text-stone-800"
      >
        <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-5 border border-stone-200/80 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src="/favicon.svg"
                alt="Logo Resmi Ziarah Nusantara — Panduan Ziarah Kubur, Doa Tahlil & Direktori 96 Makam Wali"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="w-11 h-11 rounded-xl border border-stone-200/80 shrink-0 object-cover"
              />
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
                  {copy.faqSectionSubtitle}
                </span>
                <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {copy.faqSectionTitle}
                </h2>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={showEditorialFaq}
              onClick={() => setShowEditorialFaq((prev) => !prev)}
              className="px-4 py-2 min-h-[36px] rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100 text-xs font-medium text-stone-700 hover:text-stone-950 inline-flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            >
              <span>{showEditorialFaq ? 'Sembunyikan Panduan' : 'Tampilkan Panduan'}</span>
              <ArrowDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showEditorialFaq ? 'rotate-180' : ''}`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </div>

          <div
            className={
              showEditorialFaq
                ? 'grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-stone-100 text-sm leading-relaxed text-stone-700'
                : 'hidden'
            }
          >
            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?
              </h3>
              <p>
                Secara bahasa, kata <strong>ziarah</strong> berarti berkunjung atau menengok. Dalam syariat Islam, hukum melaksanakan ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim: <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em>
              </p>
              <p>
                Tujuan utama berziarah adalah melembutkan hati yang sedang penat oleh kesibukan dunia, mengingatkan diri akan kematian dan hari akhirat, mendoakan ampunan bagi orang tua serta kaum muslimin yang telah wafat, dan meneladani perjuangan dakwah para Waliyullah.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?
              </h3>
              <p>
                Urutan tata cara dan bacaan doa ziarah kubur sesuai tuntunan ulama Ahlussunnah wal Jamaah meliputi enam tahapan utama yang mudah diamalkan oleh setiap peziarah:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-stone-700">
                <li>Berwudhu dan meluruskan niat ziarah semata-mata mengharap ridha Allah SWT.</li>
                <li>Mengucapkan salam penghormatan kepada ahli kubur ketika memasuki gerbang pemakaman.</li>
                <li>Membaca istighfar tiga kali dan menghadiahkan bacaan Surah Al-Fatihah (tawassul) kepada Rasulullah SAW, para Waliyullah, orang tua, dan ahli kubur.</li>
                <li>Membaca Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, dan Ayat Kursi.</li>
                <li>Melantunkan kalimat dzikir tahlil serta shalawat Nabi dengan khusyuk dan tenang.</li>
                <li>Menutup rangkaian ziarah dengan doa permohonan ampunan dan rahmat bagi ahli kubur.</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Di Mana Saja Lokasi 96 Makam Wali Songo dan Ulama di Ziarah Nusantara?
              </h3>
              <p>
                <strong>Ziarah Nusantara</strong> mendokumentasikan 96 lokasi makam Waliyullah di 18 provinsi Indonesia lengkap dengan titik koordinat peta rute perjalanan, jadwal haul, kisah karomah, dan sanad keilmuan.
              </p>
              <p>
                Direktori ini mencakup sembilan makam <strong>Wali Songo</strong> di Jawa Timur, Jawa Tengah, dan Jawa Barat (Sunan Gresik, Sunan Ampel, Sunan Bonang, Sunan Drajat, Sunan Giri, Sunan Kalijaga, Sunan Kudus, Sunan Muria, dan Sunan Gunung Jati) hingga makam ulama besar, raja kesultanan Islam, dan habaib di Aceh, Sumatera, Banten, DKI Jakarta, Yogyakarta, Kalimantan, Sulawesi, Bali, Nusa Tenggara Barat, dan Maluku Utara.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/panduan"
                  className="py-1.5 min-h-[32px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Baca Teks Lengkap Doa Ziarah Kubur</span>
                </Link>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <Link
                  to="/doa"
                  className="py-1.5 min-h-[32px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Buka Susunan Tahlil &amp; Tawassul</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* In-Place Reader Modal over DaftarMakam (No Map Redirect, Preserves Scroll Position) */}
      {currentModalSite && (
        <Suspense fallback={null}>
          <SiteDetails
            site={currentModalSite}
            onClose={handleCloseReaderModal}
            isSaved={savedSiteIds.includes(currentModalSite.id)}
            onToggleSave={handleToggleSave ? () => handleToggleSave(currentModalSite.id) : undefined}
            savedDoas={savedDoas}
            onToggleSaveDoa={onToggleSaveDoa}
            onContribute={onOpenKontribusi}
            onViewOnMap={(targetSite) => {
              setActiveSiteModal(null);
              onSelectSite(targetSite);
            }}
          />
        </Suspense>
      )}
    </section>
  );
});
