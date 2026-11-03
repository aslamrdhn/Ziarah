import React, { useState, useMemo, lazy, Suspense } from 'react';
import {
  Search,
  MapPin,
  X,
  Compass,
  Filter,
  ArrowDown,
  BookOpen,
  Map as MapIcon,
  Sparkles,
  Film,
  Lock,
} from 'lucide-react';
import type { ZiarahSite } from '../data/sites';
import { ALL_PROVINCES, TOTAL_SITE_COUNT } from '../data/initialSites';
import { useSites } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { optimizeSiteImageUrl, getSiteImageSrcSet, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSitePath } from '../lib/siteSlugs';
import { extractShortEra } from '../lib/siteLogistics';

const HeroCinemaShowcase = lazy(() =>
  import('../components/HeroCinemaShowcase').then((m) => ({ default: m.HeroCinemaShowcase }))
);

const InteractiveHeritageCanvas = lazy(() =>
  import('../components/InteractiveHeritageCanvas').then((m) => ({ default: m.InteractiveHeritageCanvas }))
);

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
}

export type EmotionalIntentId = 'all' | 'keteduhan' | 'ikhtiar' | 'keteguhan' | 'ilmu';

const EMOTIONAL_INTENTS: Array<{
  id: EmotionalIntentId;
  label: string;
}> = [
  { id: 'all', label: 'Semua Jejak Auliya' },
  { id: 'keteduhan', label: 'Penawar Hati Gelisah & Rindu Keteduhan' },
  { id: 'ikhtiar', label: 'Ikhtiar Rezeki, Dagang & Kedermawanan' },
  { id: 'keteguhan', label: 'Keteguhan Saat Ujian Berat & Perjuangan' },
  { id: 'ilmu', label: 'Sanad Ilmu, Pesantren & Bakti Guru' },
];

function matchesEmotionalIntent(site: ZiarahSite, intent: EmotionalIntentId): boolean {
  if (intent === 'all') return true;

  const corpus = [
    site.id,
    site.title,
    site.name,
    site.category,
    site.era || '',
    site.description,
    site.history,
    site.sanad || '',
    site.untoldStory || '',
    ...(site.karomah || []),
    ...(site.karya || []),
  ]
    .join(' ')
    .toLowerCase();

  switch (intent) {
    case 'keteduhan': {
      const keywords = [
        'lembut',
        'kelembutan',
        'seni',
        'budaya',
        'wayang',
        'gamelan',
        'tembang',
        'suluk',
        'tasawuf',
        'kasih',
        'sejuk',
        'tenang',
        'ketenangan',
        'keteduhan',
        'damai',
        'mahabbah',
        'sholawat',
        'dzikir',
        'kalijaga',
        'bonang',
        'muria',
        'sekumpul',
        'sholeh tanggul',
        'hamid pasuruan',
      ];
      return (
        keywords.some((kw) => corpus.includes(kw)) ||
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
        'sedekah',
        'infaq',
        'yatim',
        'fakir',
        'miskin',
        'sosial',
        'pertanian',
        'nelayan',
        'kemakmuran',
        'drajat',
        'ampel',
        'gresik',
        'malik ibrahim',
        'kuncung',
        'luar batang',
        'gunung jati',
      ];
      return (
        keywords.some((kw) => corpus.includes(kw)) ||
        site.id === 'wali-1' ||
        site.id === 'wali-2' ||
        site.id === 'wali-6' ||
        site.id === 'wali-9'
      );
    }
    case 'keteguhan': {
      const keywords = [
        'perjuangan',
        'pejuang',
        'ujian',
        'sabar',
        'kesabaran',
        'tirakat',
        'riyadhoh',
        'uzlah',
        'penjajah',
        'kolonial',
        'perang',
        'benteng',
        'pahlawan',
        'jihad',
        'keteguhan',
        'kesultanan',
        'giri',
        'kudus',
        'kalijaga',
        'gunung jati',
        'yusuf',
        'hasyim',
        'diponegoro',
      ];
      return (
        keywords.some((kw) => corpus.includes(kw)) ||
        site.category === 'Auliya Nusantara' ||
        site.id === 'wali-3' ||
        site.id === 'wali-5' ||
        site.id === 'wali-7'
      );
    }
    case 'ilmu': {
      const keywords = [
        'pesantren',
        'sanad',
        'guru',
        'mahaguru',
        'ulama',
        'kitab',
        'santri',
        'madrasah',
        'ilmu',
        'fikih',
        'hadits',
        'tafsir',
        'kholil',
        'hasyim',
        'wahab',
        'bisri',
        'mahrus',
        'hamid',
        'sekumpul',
        'nawawi',
        'arsyad',
        'ampel',
        'giri',
        'bonang',
      ];
      return (
        keywords.some((kw) => corpus.includes(kw)) ||
        site.category === 'Ulama Nusantara' ||
        Boolean(site.sanad && site.sanad.length > 20) ||
        Boolean(site.karya && site.karya.length > 0)
      );
    }
    default:
      return true;
  }
}

const INITIAL_VISIBLE_SITES = 12;

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({ onSelectSite }) => {
  const { sites: ziarahSites, isLoading, ensureFullSitesLoaded } = useSites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [emotionalFilter, setEmotionalFilter] = useState<EmotionalIntentId>('all');
  const [showVisualShowcase, setShowVisualShowcase] = useState(false);
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'constellation'>('video');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_SITES);

  const categories = useMemo(
    () => [
      { id: 'Semua', label: 'Semua Situs' },
      { id: 'Walisongo', label: 'Wali Songo' },
      { id: 'Ulama Nusantara', label: 'Ulama Nusantara' },
      { id: 'Habaib', label: 'Habaib' },
      { id: 'Auliya Nusantara', label: 'Auliya & Kesultanan' },
    ],
    []
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

  const filteredSites = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const baseFiltered = ziarahSites.filter((site: ZiarahSite) => {
      const matchesSearch =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.title.toLowerCase().includes(q) ||
        site.location.city.toLowerCase().includes(q) ||
        site.location.province.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.history.toLowerCase().includes(q) ||
        (site.sanad && site.sanad.toLowerCase().includes(q)) ||
        (site.era && site.era.toLowerCase().includes(q));
      const matchesCategory = selectedCategory === 'Semua' || site.category === selectedCategory;
      const matchesProvince = selectedProvince === 'Semua Provinsi' || site.location.province === selectedProvince;

      return matchesSearch && matchesCategory && matchesProvince;
    });

    if (emotionalFilter === 'all') {
      return baseFiltered;
    }

    const intentMatches = baseFiltered.filter((site) => matchesEmotionalIntent(site, emotionalFilter));
    if (intentMatches.length > 0) {
      return intentMatches;
    }

    // Fallback logis berdasarkan category / era / id agar tab suasana hati tidak pernah kosong jika baseFiltered memiliki data
    if (baseFiltered.length > 0) {
      return baseFiltered.slice(0, Math.min(6, baseFiltered.length));
    }

    return [];
  }, [searchQuery, selectedCategory, selectedProvince, emotionalFilter, ziarahSites]);

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
    <section className="min-h-screen bg-[#FAF8F5] text-stone-900 px-4 py-6 sm:py-10 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* =====================================================================
            1. EDITORIAL HEADER: Bersih, Tanpa Banner Berlebihan (85-10-5 Formula)
            ===================================================================== */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/8 text-emerald-900 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-800" aria-hidden="true" />
              <span>
                Arsip &amp; Direktori Jejak Spiritual · {totalCatalogCount} Situs di {provinces.length - 1} Provinsi
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-stone-900 leading-[1.15]">
              Telusuri Warisan Sejarah &amp; Ziarah Nusantara.
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed tracking-tight max-w-xl">
              Dokumentasi terkurasi makam Wali Songo, ulama pesantren, dan habaib di kepulauan Indonesia—lengkap dengan
              pemetaan rute, riwayat sanad, jadwal haul, serta tuntunan doa lapangan.
            </p>
          </div>

          {/* Subtle Editorial Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/peta"
              className="px-4 py-2.5 rounded-full bg-stone-900 hover:bg-emerald-800 text-white text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition shadow-xs"
            >
              <MapIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Peta &amp; Jalur Wali Songo</span>
            </Link>
            <Link
              to="/panduan"
              className="px-4 py-2.5 rounded-full bg-white hover:border-stone-400 text-stone-700 border border-stone-200/80 text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>Yasin, Tahlil &amp; Tasbih</span>
            </Link>
            <button
              type="button"
              onClick={() => setShowVisualShowcase(!showVisualShowcase)}
              className={`px-3.5 py-2.5 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition cursor-pointer border ${
                showVisualShowcase
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>{showVisualShowcase ? 'Tutup Visualisasi' : 'Visualisasi Dokumenter'}</span>
            </button>
          </div>
        </header>

        {/* Optional Collapsible Documentary / Constellation Showcase */}
        {showVisualShowcase && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/70 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-stone-600 tracking-tight">
                Eksplorasi Visual Jaringan Dakwah Nusantara
              </span>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-full border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('video')}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'video' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dokumenter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('constellation')}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'constellation' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
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
            2. MINIMALIST SEARCH & HORIZONTAL PILL FILTERS
            ===================================================================== */}
        <div
          id="katalog-direktori"
          className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pt-2"
        >
          {/* Minimalist Search Input */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="site-search-input" className="sr-only">
              Cari nama tokoh, makam, atau kota
            </label>
            <Search
              className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="site-search-input"
              type="search"
              placeholder="Cari nama tokoh, makam, atau kota..."
              value={searchQuery}
              onFocus={() => {
                ensureFullSitesLoaded();
              }}
              onChange={(e) => {
                ensureFullSitesLoaded();
                setSearchQuery(e.target.value);
              }}
              className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border border-stone-200/80 text-sm text-stone-900 placeholder-stone-500 focus:outline-none focus:border-emerald-700 transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Pill Filters + Province Pill */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
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
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 border border-stone-200/80 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Minimal Province Pill Dropdown */}
            <div className="relative shrink-0">
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
                className={`appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-medium tracking-tight cursor-pointer transition border focus:outline-none focus:border-emerald-700 ${
                  selectedProvince !== 'Semua Provinsi'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
                }`}
              >
                {provinces.map((prov) => (
                  <option key={prov} value={prov} className="bg-white text-stone-900">
                    {prov}
                  </option>
                ))}
              </select>
              <Filter
                className={`w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                  selectedProvince !== 'Semua Provinsi' ? 'text-white' : 'text-stone-500'
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* =====================================================================
            2B. BARIS FILTER "JEJAK BATIN & HIKMAH KEHIDUPAN" (EMOTIONAL INTENT PILLS)
            ===================================================================== */}
        <div className="bg-gradient-to-r from-emerald-950/[0.03] via-amber-900/[0.04] to-emerald-950/[0.03] rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 px-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
            <span>Temukan Kisah &amp; Wasilah Sesuai Suasana Hati Anda:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {EMOTIONAL_INTENTS.map((intent) => {
              const isSelected = emotionalFilter === intent.id;
              return (
                <button
                  key={intent.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    ensureFullSitesLoaded();
                    setEmotionalFilter(intent.id);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-900 text-amber-50 border-emerald-800 shadow-xs'
                      : 'bg-white/90 text-stone-700 border-stone-200/90 hover:border-amber-400/80 hover:bg-amber-50/40 hover:text-stone-900'
                  }`}
                >
                  {intent.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtle Results Status Row */}
        <div className="flex items-center justify-between text-xs text-stone-600 px-1">
          <p>
            Menampilkan <strong className="font-semibold text-stone-900">{displayedSites.length}</strong> dari{' '}
            <strong className="font-semibold text-stone-900">
              {isFiltered ? filteredSites.length : totalCatalogCount}
            </strong>{' '}
            situs
            {selectedCategory !== 'Semua' && <span> · {selectedCategory}</span>}
            {selectedProvince !== 'Semua Provinsi' && <span> · {selectedProvince}</span>}
            {emotionalFilter !== 'all' && (
              <span> · {EMOTIONAL_INTENTS.find((i) => i.id === emotionalFilter)?.label}</span>
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
              className="text-xs font-medium text-emerald-800 hover:text-emerald-900 hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* =====================================================================
            3. CLEAN CARD GRID (Aturan Maksimal 3 Elemen — Anatomi Kartu ala Airbnb)
            ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedSites.map((site, index) => {
            const optimizedThumb = optimizeSiteImageUrl(site.imageUrl, 480, 68);
            const thumbSrcSet = getSiteImageSrcSet(site.imageUrl, 68);
            const siteUrl = getSitePath(site);
            const shortEra = extractShortEra(site.era);
            const badgeLabel = site.category === 'Walisongo' ? 'Wali Songo' : site.category;
            const isLcpCandidate = index === 0;
            const karomahCount = site.karomah ? site.karomah.length : 0;

            return (
              <article key={site.id} className="group">
                <Link
                  to={siteUrl}
                  onClick={() => onSelectSite(site)}
                  aria-label={`Buka profil, sejarah, dan rute Makam ${site.title} (${site.name}) di ${site.location.city}, ${site.location.province}`}
                  className="block cursor-pointer space-y-3 focus:outline-none"
                >
                  {/* 1. Foto Rasio 4:3 dengan sudut membulat (rounded-2xl) & 1 Badge Transparan */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-200 border border-stone-200/60 shadow-2xs">
                    <img
                      src={optimizedThumb}
                      srcSet={thumbSrcSet}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                      onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                      alt={`Makam ${site.title} (${site.name}) — ${site.location.city}, ${site.location.province}`}
                      width={480}
                      height={360}
                      loading={isLcpCandidate ? 'eager' : 'lazy'}
                      fetchPriority={isLcpCandidate ? 'high' : 'auto'}
                      decoding={isLcpCandidate ? 'sync' : 'async'}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-stone-900/75 text-white backdrop-blur-md">
                      {badgeLabel}
                    </span>
                  </div>

                  {/* 2 & 3. Kota/Provinsi + Era Singkat & Nama Tokoh/Situs + Curiosity Badge */}
                  <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between gap-2 text-xs text-stone-600">
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {site.location.city}, {site.location.province}
                        </span>
                      </span>
                      <span className="shrink-0 text-stone-600">{shortEra}</span>
                    </div>

                    <h2 className="font-serif text-lg font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition line-clamp-1">
                      Makam {site.title}
                    </h2>

                    <p className="text-xs text-stone-600 line-clamp-1">{site.name}</p>

                    {karomahCount > 1 && (
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/90 text-amber-900 border border-amber-200/80 text-[11px] font-medium tracking-tight group-hover:bg-amber-100/80 transition">
                          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" aria-hidden="true" />
                          <span>{karomahCount} Kisah Karomah &amp; Riwayat Khusus</span>
                          <Lock className="w-2.5 h-2.5 text-amber-700/70 shrink-0 ml-0.5" aria-hidden="true" />
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200/70 shadow-2xs my-4">
              <div className="inline-flex p-3.5 bg-stone-100 text-stone-600 rounded-2xl mb-3">
                <Compass className="w-6 h-6" aria-hidden="true" />
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
                className="px-5 py-2.5 bg-stone-900 hover:bg-emerald-800 text-white rounded-full text-xs font-medium transition cursor-pointer"
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
              className="px-6 py-3 bg-stone-900 hover:bg-emerald-800 text-white rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <span>Tampilkan Lebih Banyak (+{Math.min(12, totalCatalogCount - visibleCount)} Situs)</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={async () => {
                const all = await ensureFullSitesLoaded();
                setVisibleCount(all.length);
              }}
              className="px-5 py-3 bg-white hover:border-stone-400 text-stone-700 border border-stone-200/80 rounded-full text-xs font-medium tracking-tight transition cursor-pointer"
            >
              Buka Seluruh {totalCatalogCount} Situs
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          CRAWLABLE SEO SUMMARY (SR-ONLY)
          ===================================================================== */}
      <section aria-label="Pengertian, Hukum, dan Tata Cara Ziarah Kubur dalam Islam" className="sr-only">
        <div>
          <h2>Pengertian, Hukum, &amp; Tujuan Ziarah Kubur dalam Islam</h2>
          <p>
            Secara bahasa, <strong>ziarah</strong> (زيارة) berarti berkunjung atau menengok. Dalam syariat Islam,{' '}
            <strong>ziarah kubur</strong> adalah amalan sunnah mendatangi makam kaum muslimin, orang tua, ulama, dan
            para Waliyullah untuk mendoakan ampunan serta rahmat bagi ahli kubur sekaligus mengingatkan diri akan
            kehidupan akhirat.
          </p>
          <Link to="/panduan">Bacaan Doa Ziarah Kubur Lengkap (Arab, Latin &amp; Artinya)</Link>
          <Link to="/doa">Kumpulan Tawassul &amp; Tahlil</Link>
        </div>
      </section>
    </section>
  );
});
