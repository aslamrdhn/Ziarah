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
} from 'lucide-react';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { HeroCinemaShowcase } from '../components/HeroCinemaShowcase';
import { Link } from 'react-router-dom';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSitePath } from '../lib/siteSlugs';
import { extractShortEra } from '../lib/siteLogistics';

const InteractiveHeritageCanvas = lazy(() =>
  import('../components/InteractiveHeritageCanvas').then((m) => ({ default: m.InteractiveHeritageCanvas }))
);

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
}

const INITIAL_VISIBLE_SITES = 12;

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({ onSelectSite }) => {
  const { sites: ziarahSites, isLoading } = useSites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
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

  const provinces = useMemo(
    () => ['Semua Provinsi', ...Array.from(new Set(ziarahSites.map((s: ZiarahSite) => s.location.province)))].sort(),
    [ziarahSites]
  );

  const filteredSites = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ziarahSites.filter((site: ZiarahSite) => {
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
  }, [searchQuery, selectedCategory, selectedProvince, ziarahSites]);

  const isFiltered =
    Boolean(searchQuery.trim()) || selectedCategory !== 'Semua' || selectedProvince !== 'Semua Provinsi';

  const displayedSites = useMemo(() => {
    if (isFiltered) return filteredSites;
    return filteredSites.slice(0, visibleCount);
  }, [filteredSites, isFiltered, visibleCount]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-500">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/5 text-emerald-800 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>
                Arsip &amp; Direktori Jejak Spiritual · {ziarahSites.length} Situs di {provinces.length - 1} Provinsi
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-stone-900 leading-[1.15]">
              Telusuri Warisan Sejarah &amp; Ziarah Nusantara.
            </h1>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed tracking-tight max-w-xl">
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
                  : 'bg-white text-stone-600 border-stone-200/70 hover:border-stone-400'
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
              <span className="text-xs font-medium text-stone-500 tracking-tight">
                Eksplorasi Visual Jaringan Dakwah Nusantara
              </span>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-full border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('video')}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'video' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dokumenter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('constellation')}
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                    heroMediaMode === 'constellation' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Konstelasi</span>
                </button>
              </div>
            </div>

            {heroMediaMode === 'video' ? (
              <HeroCinemaShowcase
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                }}
              />
            ) : (
              <Suspense
                fallback={
                  <div className="h-[340px] rounded-2xl bg-stone-900 flex items-center justify-center text-stone-200 text-xs">
                    Memuat Peta Konstelasi...
                  </div>
                }
              >
                <InteractiveHeritageCanvas
                  activeCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                  }}
                />
              </Suspense>
            )}
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
              className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="site-search-input"
              type="search"
              placeholder="Cari nama tokoh, makam, atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border border-stone-200/80 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-700 transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
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
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200/70 hover:border-stone-400 hover:text-stone-900'
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
                onChange={(e) => setSelectedProvince(e.target.value)}
                className={`appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-medium tracking-tight cursor-pointer transition border focus:outline-none focus:border-emerald-700 ${
                  selectedProvince !== 'Semua Provinsi'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-stone-600 border-stone-200/70 hover:border-stone-400'
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
                  selectedProvince !== 'Semua Provinsi' ? 'text-white' : 'text-stone-400'
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Subtle Results Status Row */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <p>
            Menampilkan <strong className="font-semibold text-stone-900">{displayedSites.length}</strong> dari{' '}
            <strong className="font-semibold text-stone-900">{filteredSites.length}</strong> situs
            {selectedCategory !== 'Semua' && <span> · {selectedCategory}</span>}
            {selectedProvince !== 'Semua Provinsi' && <span> · {selectedProvince}</span>}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedProvince('Semua Provinsi');
                setVisibleCount(INITIAL_VISIBLE_SITES);
              }}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* =====================================================================
            3. CLEAN CARD GRID (Aturan Maksimal 3 Elemen — Anatomi Kartu ala Airbnb)
            ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedSites.map((site) => {
            const optimizedThumb = optimizeSiteImageUrl(site.imageUrl, 600, 76);
            const siteUrl = getSitePath(site);
            const shortEra = extractShortEra(site.era);
            const badgeLabel = site.category === 'Walisongo' ? 'Wali Songo' : site.category;

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
                      onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                      alt={`Makam ${site.title} (${site.name}) — ${site.location.city}, ${site.location.province}`}
                      width={600}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-stone-900/60 text-white backdrop-blur-md">
                      {badgeLabel}
                    </span>
                  </div>

                  {/* 2 & 3. Kota/Provinsi + Era Singkat & Nama Tokoh/Situs (Tanpa Tombol Berlapis) */}
                  <div className="space-y-1 px-1">
                    <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {site.location.city}, {site.location.province}
                        </span>
                      </span>
                      <span className="shrink-0 text-stone-400">{shortEra}</span>
                    </div>

                    <h2 className="font-serif text-lg font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition line-clamp-1">
                      Makam {site.title}
                    </h2>

                    <p className="text-xs text-stone-500 line-clamp-1">{site.name}</p>
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
        {!isFiltered && visibleCount < filteredSites.length && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(filteredSites.length, prev + 12))}
              className="px-6 py-3 bg-stone-900 hover:bg-emerald-800 text-white rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <span>Tampilkan Lebih Banyak (+{Math.min(12, filteredSites.length - visibleCount)} Situs)</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredSites.length)}
              className="px-5 py-3 bg-white hover:border-stone-400 text-stone-700 border border-stone-200/80 rounded-full text-xs font-medium tracking-tight transition cursor-pointer"
            >
              Buka Seluruh {filteredSites.length} Situs
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          CRAWLABLE SEO & 96-SITE DIRECTORY INDEX (SR-ONLY)
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

      <section
        id="indeks-lengkap-96-situs"
        aria-label="Indeks Direktori Lengkap 96 Situs Makam Waliyullah di 18 Provinsi"
        className="sr-only"
      >
        <h2>
          Daftar Lengkap {ziarahSites.length} Makam Waliyullah, Walisongo, Ulama &amp; Habaib per Provinsi
        </h2>
        <div>
          {provinces
            .filter((prov) => prov !== 'Semua Provinsi')
            .map((prov) => {
              const provSites = ziarahSites.filter((s) => s.location.province === prov);
              return (
                <div key={prov}>
                  <h3>{prov}</h3>
                  <ul>
                    {provSites.map((site) => (
                      <li key={site.id}>
                        <Link to={getSitePath(site)} onClick={() => onSelectSite(site)}>
                          <span>{site.title}</span> ({site.location.city})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
});
