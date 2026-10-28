import React, { useState, useMemo, lazy, Suspense } from 'react';
import {
  Search,
  MapPin,
  X,
  Compass,
  ChevronRight,
  Filter,
  ArrowDown,
  BookOpen,
  Map as MapIcon,
  ScrollText,
  Film,
} from 'lucide-react';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { HeroCinemaShowcase } from '../components/HeroCinemaShowcase';
import { Link } from 'react-router-dom';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';

const InteractiveHeritageCanvas = lazy(() =>
  import('../components/InteractiveHeritageCanvas').then((m) => ({ default: m.InteractiveHeritageCanvas }))
);

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
}

const INITIAL_VISIBLE_SITES = 9;

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({ onSelectSite }) => {
  const { sites: ziarahSites, isLoading } = useSites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [activeReportTab, setActiveReportTab] = useState<'walisongo' | 'ulama' | 'habaib' | 'auliya'>('walisongo');
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'constellation'>('video');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_SITES);

  const categories = useMemo(() => ['Semua', 'Walisongo', 'Ulama Nusantara', 'Habaib', 'Auliya Nusantara'], []);
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
        (site.era && site.era.toLowerCase().includes(q)) ||
        (site.karya && site.karya.some((k) => k.toLowerCase().includes(q))) ||
        (site.references && site.references.some((r) => r.toLowerCase().includes(q)));
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

  const reportHighlights = useMemo(
    () => ({
      walisongo: {
        index: '01 / JALUR PANTURA & TANAH JAWA',
        title: 'Dewan Walisongo: Akulturasi Budaya & Poros Maritim',
        era: 'Abad ke-15 hingga ke-16 Masehi',
        categoryFilter: 'Walisongo',
        count: ziarahSites.filter((s) => s.category === 'Walisongo').length,
        summary:
          'Sembilan tokoh utama dakwah Islam di Pulau Jawa yang menyelaraskan nilai tauhid dengan kesenian, arsitektur, tata kota, dan perdagangan pesisir dari Surabaya, Gresik, Tuban, Lamongan, Kudus, Demak, hingga Cirebon.',
        keyFigures: ['Sunan Ampel', 'Sunan Giri', 'Sunan Bonang', 'Sunan Kalijaga', 'Sunan Gunung Jati'],
      },
      ulama: {
        index: '02 / JARINGAN PESANTREN & KEILMUAN',
        title: 'Ulama Nusantara: Sanad Keilmuan Haramain & Pesantren',
        era: 'Abad ke-17 hingga ke-20 Masehi',
        categoryFilter: 'Ulama Nusantara',
        count: ziarahSites.filter((s) => s.category === 'Ulama Nusantara').length,
        summary:
          'Para mahaguru dan pendiri pesantren yang menyambungkan sanad keilmuan Nusantara dengan Makkah dan Madinah, melahirkan karya kitab kuning, jaringan pendidikan umat, serta perjuangan kemerdekaan.',
        keyFigures: ["Syaikhona Kholil Bangkalan", "KH. Hasyim Asy'ari", 'Abah Guru Sekumpul', 'Syekh Kuala Aceh'],
      },
      habaib: {
        index: '03 / DZURRIYAH & DAKWAH KOTA PESISIR',
        title: 'Para Habaib: Majelis Dzikir, Ratib, & Pelabuhan Nusantara',
        era: 'Abad ke-18 hingga ke-20 Masehi',
        categoryFilter: 'Habaib',
        count: ziarahSites.filter((s) => s.category === 'Habaib').length,
        summary:
          'Jejak keturunan Rasulullah SAW yang berdakwah dengan akhlak mulia, menghidupkan majelis maulid, menyusun wirid seperti Ratib Al-Haddad dan Al-Attas, serta mengayomi masyarakat di pelabuhan besar Nusantara.',
        keyFigures: [
          'Habib Husein Luar Batang',
          'Habib Ahmad bin Abdullah Al-Attas',
          'Habib Abu Bakar Gresik',
          'Habib Kuncung',
        ],
      },
      auliya: {
        index: '04 / KESULTANAN & PENJAGA TRADISI',
        title: 'Auliya Nusantara: Raja Sufi, Leluhur, & Penjaga Wilayah',
        era: 'Abad ke-14 hingga ke-19 Masehi',
        categoryFilter: 'Auliya Nusantara',
        count: ziarahSites.filter((s) => s.category === 'Auliya Nusantara').length,
        summary:
          'Para tokoh pelopor, sultan sufi, dan waliyullah di berbagai kepulauan yang membuka pemukiman, menanamkan adab ketuhanan, serta menjadi rujukan spiritual lintas generasi.',
        keyFigures: ['Sultan Maulana Hasanuddin', 'Sunan Bayat Klaten', 'Mbah Priok', 'Wali Pitu Bali'],
      },
    }),
    [ziarahSites]
  );

  const activeHighlight = reportHighlights[activeReportTab];

  const scrollToDirectory = () => {
    const el = document.getElementById('katalog-direktori');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-700">
        <div className="w-9 h-9 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic">Memuat katalog arsip makam Nusantara...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 relative z-10 pb-20">
      {/* =====================================================================
          SECTION 1: INTERACTIVE ANNUAL REPORT STYLE HERO COVER
          ===================================================================== */}
      <section aria-label="Pengantar Utama Ziarah Nusantara" className="pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-stone-300/80">
        {/* Top Archival Volume Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-stone-300/80 text-xs uppercase tracking-widest text-stone-700 font-semibold">
          <div className="flex items-center gap-2">
            <span>EDISI KHAZANAH NUSANTARA</span>
            <span aria-hidden="true">·</span>
            <span>ARSIP DIGITAL TERKURASI</span>
          </div>
          <div className="flex items-center gap-2 font-mono tabular-nums text-[11px] text-stone-700">
            <span>{ziarahSites.length} SITUS TERVERIFIKASI</span>
            <span aria-hidden="true">·</span>
            <span>{provinces.length - 1} PROVINSI</span>
          </div>
        </div>

        {/* 2-Column Editorial Cover Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Monumental Serif Typography & Narrative Lead */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-950 font-bold mb-4">
                Atlas Sejarah, Sanad &amp; Panduan Ziarah
              </p>

              <h1
                className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-normal tracking-tight text-stone-950 leading-[1.08] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Jejak Spiritual <br />
                <span className="italic font-normal text-[#6E5219]">Para Waliyullah Nusantara.</span>
              </h1>

              <div className="w-16 h-px bg-stone-400 my-6" />

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                Dokumentasi interaktif makam Walisongo, ulama pesantren, dan habaib di kepulauan Indonesia—dilengkapi
                pemetaan rute presisi, naskah riwayat karomah, serta tuntunan adab dan wirid ziarah oleh{' '}
                <strong className="font-semibold text-stone-900">Tim Kurator Arsip Ziarah Nusantara</strong>.
              </p>
            </div>

            {/* Primary Actions & Chapter Jumpers */}
            <div className="pt-8 mt-8 border-t border-stone-300/80 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToDirectory}
                className="px-5 py-3 bg-stone-900 hover:bg-emerald-950 active:scale-[0.98] text-[#F9F8F4] text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Jelajahi Direktori Makam</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>

              <Link
                to="/peta"
                className="px-4 py-3 bg-[#EFECE4] hover:bg-stone-200 text-stone-900 border border-stone-300 text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <MapIcon className="w-4 h-4 text-emerald-900" aria-hidden="true" />
                <span>Buka Peta Rute</span>
              </Link>

              <Link
                to="/panduan"
                className="px-4 py-3 text-stone-800 hover:text-stone-950 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4 text-stone-700" aria-hidden="true" />
                <span>Tuntunan Tahlil &amp; Adab</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Moving Documentary Video Reel & Interactive Constellation Switcher */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] uppercase tracking-widest text-stone-700 font-semibold">
                VISUALISASI UTAMA
              </span>
              <div className="flex items-center gap-1 p-1 bg-[#E5E0D5] rounded-lg border border-stone-300">
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('video')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    heroMediaMode === 'video'
                      ? 'bg-stone-900 text-[#F9F8F4] shadow-2xs'
                      : 'text-stone-800 hover:text-stone-950'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Video Dokumenter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('constellation')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    heroMediaMode === 'constellation'
                      ? 'bg-stone-900 text-[#F9F8F4] shadow-2xs'
                      : 'text-stone-800 hover:text-stone-950'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Peta Konstelasi</span>
                </button>
              </div>
            </div>

            {heroMediaMode === 'video' ? (
              <>
                <HeroCinemaShowcase
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    scrollToDirectory();
                  }}
                />
                <p className="text-xs font-serif italic text-stone-700 mt-2.5">
                  Fig. 1 — Tayangan bergerak 4 babak khazanah Walisongo, Ulama Pesantren, Habaib, dan Auliya Nusantara.
                  Klik babak atau tombol putar untuk menjelajah.
                </p>
              </>
            ) : (
              <>
                <Suspense
                  fallback={
                    <div className="h-[360px] sm:h-[420px] rounded-2xl bg-stone-900 flex items-center justify-center text-stone-200 text-xs">
                      Memuat Peta Konstelasi...
                    </div>
                  }
                >
                  <InteractiveHeritageCanvas
                    activeCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                      setSelectedCategory(cat);
                      scrollToDirectory();
                    }}
                  />
                </Suspense>
                <p className="text-xs font-serif italic text-stone-700 mt-2.5">
                  Fig. 2 — Visualisasi interaktif simpul jaringan dakwah dari Aceh, Banten, Pantura Jawa, Kalimantan,
                  hingga Sulawesi.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Full-Width 4-Column Archival Metric Strip Below Hero Split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-stone-300/80">
          {[
            {
              index: '01',
              metric: '9 Tokoh',
              label: 'Dewan Walisongo',
              detail: 'Jalur Pesisir Jawa Timur, Jawa Tengah & Cirebon',
            },
            {
              index: '02',
              metric: `${ziarahSites.length} Situs`,
              label: 'Koordinat Terverifikasi',
              detail: 'Terhubung dengan navigasi jalan raya OSRM',
            },
            {
              index: '03',
              metric: 'Sanad & Doa',
              label: 'Tuntunan Bacaan Ziarah',
              detail: 'Yasin, Tahlil, Tawasul & Wirid Khusus Makam',
            },
            {
              index: '04',
              metric: 'Manuskrip',
              label: 'Rubrik Sejarah Lisan',
              detail: 'Catatan keteladanan, adab & riwayat karomah',
            },
          ].map((stat) => (
            <div key={stat.index} className="flex flex-col justify-between">
              <div className="text-[11px] font-mono text-stone-700 font-semibold tabular-nums mb-1">
                {stat.index} / ARSIP
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-medium text-stone-950 tabular-nums tracking-tight">
                {stat.metric}
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">{stat.label}</div>
              <div className="text-xs text-stone-700 mt-0.5 leading-relaxed">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: EDITORIAL CHAPTER & INTERACTIVE JALUR DAKWAH EXPLORER
          ===================================================================== */}
      <section aria-label="Pengantar Kuratorial dan Klasifikasi Jaringan" className="py-12 sm:py-16 border-b border-stone-300/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Editorial Essay with Drop Cap */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
              01 / PENGANTAR KURATORIAL
            </div>
            <h2
              className="text-2xl sm:text-3xl font-serif font-normal text-stone-950 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              Merawat Ingatan Kolektif dan Sanad Keilmuan Nusantara
            </h2>
            <div className="w-12 h-px bg-stone-400" />
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-stone-950 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              Tradisi ziarah makam para waliyullah di kepulauan Nusantara bukan sekadar perjalanan geografis, melainkan
              ruang perjumpaan batin dengan jejak keteladanan, keikhlasan dakwah, dan mata rantai keilmuan yang
              membentuk peradaban Islam yang teduh dan berbudaya.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Melalui arsip digital yang dikelola oleh <strong>Tim Kurator Arsip Ziarah Nusantara</strong>, setiap titik
              makam dipetakan beserta konteks sejarahnya, fasilitas jamaah di lapangan, serta khazanah doa yang
              diwariskan secara turun-temurun oleh para masyayikh.
            </p>
            <div className="pt-2">
              <Link
                to="/rubrik"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950 hover:text-stone-950 transition-colors"
              >
                <ScrollText className="w-4 h-4" aria-hidden="true" />
                <span>Baca Rubrik Khazanah &amp; Manuskrip Lengkap</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Report Breakdown Card */}
          <div className="lg:col-span-7 bg-[#F3F0E8] rounded-2xl border border-stone-300/90 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-stone-300/80">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-stone-700 font-semibold">
                  KLASIFIKASI PERIODE &amp; JARINGAN
                </p>
                <h3 className="text-lg font-serif font-medium text-stone-950 mt-0.5">
                  Empat Pilar Khazanah Makam Nusantara
                </h3>
              </div>

              {/* Interactive Segmented Selector */}
              <div
                className="flex items-center gap-1 p-1 bg-[#E5E0D5] rounded-lg overflow-x-auto scrollbar-hide"
                role="tablist"
                aria-label="Pilih Pilar Khazanah Makam Nusantara"
              >
                {[
                  { id: 'walisongo', label: 'Walisongo' },
                  { id: 'ulama', label: 'Ulama' },
                  { id: 'habaib', label: 'Habaib' },
                  { id: 'auliya', label: 'Auliya' },
                ].map((tab) => {
                  const isTabActive = activeReportTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isTabActive}
                      onClick={() => setActiveReportTab(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isTabActive
                          ? 'bg-[#FBF9F5] text-stone-950 shadow-2xs'
                          : 'text-stone-800 hover:text-stone-950'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-950">
                  {activeHighlight.index}
                </span>
                <span className="text-xs text-stone-700 font-serif italic">
                  Rentang Utama: {activeHighlight.era}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-serif font-medium text-stone-950">{activeHighlight.title}</h4>

              <p className="text-sm text-stone-700 leading-relaxed">{activeHighlight.summary}</p>

              <div className="pt-4 border-t border-stone-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-stone-700 font-semibold mb-1">
                    Tokoh Rujukan Utama
                  </div>
                  <div className="text-xs text-stone-900 font-semibold">
                    {activeHighlight.keyFigures.join(' · ')}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(activeHighlight.categoryFilter);
                    scrollToDirectory();
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-emerald-950 text-[#F9F8F4] text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <span>Tampilkan {activeHighlight.count} Situs</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: MUSEUM-GRADE ARCHIVAL DIRECTORY & FILTER HUB
          ===================================================================== */}
      <section id="katalog-direktori" aria-label="Direktori Makam dan Situs Ziarah" className="pt-12 sm:pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-700 font-semibold mb-2">
              02 / KATALOG INDEKS LOKASI
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-stone-950 tracking-tight">
              Direktori Makam &amp; Situs Ziarah
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 font-serif italic">
            Klik pada kartu arsip untuk membuka peta navigasi, biografi, karomah, dan doa khusus.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-[#FBF9F5] rounded-2xl p-5 sm:p-6 border border-stone-300/90 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-5">
            {/* Search Box with Accessible Label */}
            <div className="relative flex-1">
              <label htmlFor="site-search-input" className="sr-only">
                Cari nama wali, makam, atau kota
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-600" aria-hidden="true" />
              </div>
              <input
                id="site-search-input"
                type="search"
                aria-label="Cari nama wali, makam, atau kota"
                className="block w-full pl-10 pr-10 py-3 bg-[#F3F0E8] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-950 text-sm placeholder-stone-600 transition-all"
                placeholder="Cari nama wali, makam, atau kota (cth: Sunan Kalijaga, Kudus, Ampel, Martapura)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Province Selector with Associated Accessible Label */}
            <div className="flex items-center shrink-0">
              <div className="relative w-full md:w-auto">
                <label htmlFor="province-filter-select" className="sr-only">
                  Filter lokasi ziarah berdasarkan provinsi
                </label>
                <select
                  id="province-filter-select"
                  aria-label="Filter lokasi ziarah berdasarkan provinsi"
                  className="w-full md:w-auto appearance-none bg-[#F3F0E8] border border-stone-300 text-stone-900 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-sm font-semibold cursor-pointer"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <Filter
                  className="w-4 h-4 text-stone-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Interactive Category Segmented Buttons */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pt-1"
            role="group"
            aria-label="Filter berdasarkan kategori tokoh"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === 'Semua'
                  ? ziarahSites.length
                  : ziarahSites.filter((s) => s.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-[#F9F8F4]'
                      : 'bg-[#EFECE4] text-stone-800 hover:bg-stone-200 hover:text-stone-950'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono tabular-nums text-[11px] ${
                      isSelected ? 'text-stone-200' : 'text-stone-700'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs text-stone-700">
          <p>
            Menampilkan <strong className="font-mono tabular-nums text-stone-950">{displayedSites.length}</strong> dari{' '}
            <strong className="font-mono tabular-nums text-stone-950">{filteredSites.length}</strong> situs ziarah
            {selectedCategory !== 'Semua' && (
              <span>
                {' '}
                · Kategori <strong className="text-stone-950">{selectedCategory}</strong>
              </span>
            )}
            {selectedProvince !== 'Semua Provinsi' && (
              <span>
                {' '}
                · Provinsi <strong className="text-stone-950">{selectedProvince}</strong>
              </span>
            )}
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
              className="text-xs font-bold text-emerald-950 hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Grid of Archival Catalog Cards (Mobile 1-col, Tablet 2-col, Desktop 3-col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedSites.map((site, index) => {
            const catalogNumber = String(index + 1).padStart(2, '0');
            const metadataParts = [
              site.category,
              site.references && site.references.length > 0 ? `${site.references.length} Ref. Jurnal/Babad` : null,
              site.doaKhusus && site.doaKhusus.length > 0 ? 'Doa Khusus' : null,
            ].filter(Boolean);
            const optimizedThumb = optimizeSiteImageUrl(site.imageUrl, 520, 74);

            return (
              <article
                key={site.id}
                role="button"
                tabIndex={0}
                aria-label={`Buka arsip dan rute ${site.name} (${site.title}) di ${site.location.city}, ${site.location.province}`}
                onClick={() => onSelectSite(site)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSite(site);
                  }
                }}
                className="group cursor-pointer bg-[#FBF9F5] rounded-2xl border border-stone-300/90 hover:border-stone-500 hover:-translate-y-1 flex flex-col h-full overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              >
                {/* Card Image Frame */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-200">
                  <img
                    src={optimizedThumb}
                    onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                    alt={`${site.title} — ${site.location.city}, ${site.location.province}`}
                    width={520}
                    height={208}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-100 font-medium mb-1">
                      <MapPin className="w-3 h-3 text-[#f3d9a4] shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        {site.location.city}, {site.location.province}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-medium text-white leading-snug line-clamp-1">
                      {site.title}
                    </h3>
                  </div>
                </div>

                {/* Card Archival Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Clean Unboxed Metadata Line */}
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-700 font-mono tabular-nums mb-1.5">
                      <span>NO. {catalogNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-sans font-bold text-emerald-950 truncate">
                        {metadataParts.join(' · ')}
                      </span>
                    </div>

                    {site.era && (
                      <div className="text-[11px] font-serif italic text-stone-700 mb-1.5 line-clamp-1">
                        {site.era}
                      </div>
                    )}

                    <p className="text-base font-serif font-semibold text-stone-950 mb-2 line-clamp-1 group-hover:text-emerald-950 transition-colors">
                      {site.name}
                    </p>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-2 mb-3">
                      {site.description}
                    </p>

                    {site.sanad && (
                      <p className="text-[11px] text-stone-700 leading-snug line-clamp-2 bg-[#F3F0E8] px-3 py-2 rounded-lg border border-stone-300/80 mb-2.5">
                        <strong className="text-stone-900">Sanad/Jaringan:</strong> {site.sanad}
                      </p>
                    )}

                    {site.imageSource && (
                      <p className="text-[10px] text-stone-700 font-serif italic line-clamp-1 mb-3">
                        <strong className="font-sans not-italic text-stone-800">Ref. Foto:</strong> {site.imageSource}
                      </p>
                    )}
                  </div>

                  {/* Footer Action Row */}
                  <div className="pt-3.5 border-t border-stone-200/90 flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-medium truncate max-w-[140px] sm:max-w-[160px]">
                      {site.openingHours}
                    </span>
                    <span className="font-bold text-stone-950 group-hover:text-emerald-950 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0">
                      <span>Buka Arsip &amp; Rute</span>
                      <ChevronRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="col-span-full bg-[#FBF9F5] rounded-2xl p-8 sm:p-12 text-center border border-stone-300/90 my-4">
              <div className="inline-flex p-3.5 bg-stone-200/70 text-stone-800 rounded-xl mb-3">
                <Compass className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-medium text-stone-950 mb-1">Arsip Makam Tidak Ditemukan</h3>
              <p className="text-xs sm:text-sm text-stone-700 max-w-sm mx-auto mb-5">
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
                className="px-5 py-2.5 bg-stone-900 hover:bg-emerald-950 text-[#F9F8F4] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Tampilkan Seluruh Arsip
              </button>
            </div>
          )}
        </div>

        {/* Progressive Load More Button to Keep Initial DOM & Network Payload Fast */}
        {!isFiltered && visibleCount < filteredSites.length && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(filteredSites.length, prev + 12))}
              className="px-6 py-3.5 bg-stone-900 hover:bg-emerald-950 text-[#F9F8F4] rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>
                Tampilkan Lebih Banyak Situs (+{Math.min(12, filteredSites.length - visibleCount)} Situs)
              </span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filteredSites.length)}
              className="px-5 py-3.5 bg-[#EFECE4] hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Buka Seluruh {filteredSites.length} Situs Sekaligus
            </button>
          </div>
        )}
      </section>
    </div>
  );
});
