import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  X,
  ArrowLeft,
  ArrowRight,
  Compass,
  BookOpen,
  MapPin,
  Clock,
} from 'lucide-react';
import {
  ZIARAH_ARTICLES,
  ARTICLE_CATEGORIES,
  findArticleBySlug,
  type ZiarahArticleCategory,
} from '../data/articles';
import { useSites } from '../context/SiteContext';
import { findSiteByParam, getSiteDisplayHeading, getSiteSlug, formatMakamHeading } from '../lib/siteSlugs';

function formatIndonesianDate(isoDate: string): string {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (monthIdx < 0 || monthIdx > 11 || Number.isNaN(day)) return isoDate;
  return `${day} ${months[monthIdx]} ${year}`;
}

function renderFormattedParagraph(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-stone-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function slugToFallbackTitle(slug: string): string {
  return formatMakamHeading(
    slug
      .split('-')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
}

export const ArtikelZiarah: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { sites } = useSites();

  const [selectedCategory, setSelectedCategory] = useState<'Semua' | ZiarahArticleCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const activeArticle = useMemo(() => (slug ? findArticleBySlug(slug) : null), [slug]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ZIARAH_ARTICLES.filter((article) => {
      const matchesCat = selectedCategory === 'Semua' || article.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const haystack = `${article.title} ${article.excerpt} ${article.category} ${article.metaDescription}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  // ---------------------------------------------------------------------------
  // CASE 1: Invalid / Not Found Article Slug
  // ---------------------------------------------------------------------------
  if (slug && !activeArticle) {
    return (
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 text-center space-y-4 shadow-2xs">
          <div className="inline-flex p-3.5 rounded-2xl bg-stone-100 text-stone-700">
            <BookOpen className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Maaf, halaman artikel panduan ziarah yang Anda cari tidak ditemukan atau alamat tautannya telah berubah.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/artikel"
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-900 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Kembali ke Daftar Artikel</span>
            </Link>
            <Link
              to="/direktori"
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Buka Direktori 183 Makam</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------------------------
  // CASE 2: Single Article Reading View (/artikel/:slug)
  // ---------------------------------------------------------------------------
  if (activeArticle) {
    const resolvedRelatedSites = activeArticle.relatedSiteSlugs.map((siteSlug) => {
      const matched = findSiteByParam(sites, siteSlug);
      if (matched) {
        const { heading, subtitle } = getSiteDisplayHeading(matched);
        return {
          slug: getSiteSlug(matched),
          heading,
          subtitle,
          city: matched.location.city,
          province: matched.location.province,
          category: matched.category === 'Walisongo' ? 'Wali Songo' : matched.category,
        };
      }
      return {
        slug: siteSlug,
        heading: slugToFallbackTitle(siteSlug),
        subtitle: 'Maqbarah Waliyullah Nusantara',
        city: 'Nusantara',
        province: 'Indonesia',
        category: 'Waliyullah',
      };
    });

    const otherArticles = ZIARAH_ARTICLES.filter((a) => a.slug !== activeArticle.slug)
      .sort((a, b) => {
        const aSame = a.category === activeArticle.category ? 0 : 1;
        const bSame = b.category === activeArticle.category ? 0 : 1;
        return aSame - bSame;
      })
      .slice(0, 3);

    return (
      <article
        lang="id"
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10"
      >
        {/* Breadcrumb & Back Link */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 pb-4 border-b border-stone-200/80"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-emerald-900 underline-offset-4 hover:underline">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link
                to="/artikel"
                className="hover:text-emerald-900 underline-offset-4 hover:underline"
              >
                Artikel
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-stone-900 font-medium">{activeArticle.category}</li>
          </ol>

          <Link
            to="/artikel"
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Semua Artikel</span>
          </Link>
        </nav>

        {/* Editorial Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
            <span className="text-emerald-900 font-semibold">{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={activeArticle.publishedAt}>
              {formatIndonesianDate(activeArticle.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
              <span>{activeArticle.readTimeMinutes} menit baca</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
            {activeArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
            {activeArticle.excerpt}
          </p>
        </header>

        {/* Main Article Body Sections */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-8 lg:p-10 shadow-2xs space-y-8">
          {activeArticle.sections.map((section, secIdx) => (
            <section
              key={secIdx}
              className={secIdx > 0 ? 'pt-6 border-t border-stone-200/70 space-y-4' : 'space-y-4'}
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {section.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-stone-800 leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {renderFormattedParagraph(p)}
                  </p>
                ))}
              </div>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-2.5 bg-[#FAF8F5] rounded-xl border border-stone-200/80 p-4 sm:p-5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-800 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{renderFormattedParagraph(bp)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Related Maqbarah Internal Linking Grid */}
        <section
          aria-labelledby="related-maqbarah-heading"
          className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-2xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
                Rujukan Situs &amp; Koordinat
              </span>
              <h2
                id="related-maqbarah-heading"
                className="font-serif text-lg sm:text-xl font-bold text-stone-900"
              >
                Maqbarah Terkait dalam Artikel Ini ({resolvedRelatedSites.length} Situs)
              </h2>
            </div>
            <Link
              to="/peta"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
            >
              Lihat Semua di Peta Rute
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resolvedRelatedSites.map((item) => (
              <Link
                key={item.slug}
                to={`/situs/${item.slug}`}
                className="group p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-emerald-50/60 border border-stone-200/80 hover:border-emerald-300 transition-colors flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="text-[11px] text-stone-600 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-800 shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {item.city}, {item.province} · {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-900 leading-snug line-clamp-2">
                    {item.heading}
                  </h3>
                  {item.subtitle && item.subtitle !== item.heading && (
                    <p className="text-xs text-stone-600 line-clamp-1">{item.subtitle}</p>
                  )}
                </div>
                <ArrowRight
                  className="w-4 h-4 text-stone-500 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Contextual Soft CTA Box */}
        <section
          aria-label="Langkah Lanjutan Peziarah"
          className="rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-200">
              Panduan &amp; Fitur Pendamping Ziarah
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
              {activeArticle.ctaTarget.label}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {activeArticle.ctaTarget.description}
            </p>
          </div>
          <Link
            to={activeArticle.ctaTarget.to}
            className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-950 text-xs font-semibold inline-flex items-center gap-2 shrink-0 transition-colors"
          >
            <span>Buka Fitur</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </section>

        {/* References & Academic / Turats Citations */}
        <section
          aria-labelledby="article-references-heading"
          className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 space-y-3"
        >
          <h2
            id="article-references-heading"
            className="font-serif text-base sm:text-lg font-bold text-stone-900"
          >
            Referensi &amp; Rujukan Pustaka
          </h2>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {activeArticle.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ol>
        </section>

        {/* Related Other Articles */}
        <section aria-labelledby="other-articles-heading" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2
              id="other-articles-heading"
              className="font-serif text-lg sm:text-xl font-bold text-stone-900"
            >
              Artikel Panduan Terkait Lainnya
            </h2>
            <Link
              to="/artikel"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
            >
              Lihat Semua ({ZIARAH_ARTICLES.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherArticles.map((art) => (
              <Link
                key={art.slug}
                to={`/artikel/${art.slug}`}
                className="group bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-300 p-4 sm:p-5 flex flex-col justify-between gap-3 transition-colors shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="text-[11px] text-stone-600 font-medium">
                    <span className="text-emerald-900 font-semibold">{art.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{art.readTimeMinutes} menit baca</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-emerald-800 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Baca Panduan</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    );
  }

  // ---------------------------------------------------------------------------
  // CASE 3: Article Index View (/artikel)
  // ---------------------------------------------------------------------------
  return (
    <section
      lang="id"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8"
    >
      {/* Editorial Index Header */}
      <header className="space-y-3 border-b border-stone-200/80 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600">
          <span className="text-emerald-900 font-semibold uppercase tracking-wider">
            Literasi &amp; Panduan Perjalanan
          </span>
          <span aria-hidden="true">·</span>
          <span>{ZIARAH_ARTICLES.length} Artikel Terkurasi</span>
          <span aria-hidden="true">·</span>
          <span>Ahlussunnah wal Jamaah</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
          Artikel Panduan, Fikih &amp; Rute Ziarah Nusantara
        </h1>

        <p className="text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed">
          Kumpulan panduan praktis perencanaan rute ziarah Wali Songo dan ulama pesantren, urutan bacaan doa ziarah kubur orang tua, kaidah tawassul yang lurus, hingga kalender haul tahunan di 34 provinsi.
        </p>
      </header>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
          <label htmlFor="article-search-input" className="sr-only">
            Cari artikel rute ziarah, doa, atau haul
          </label>
          <Search
            className="w-4 h-4 text-stone-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            id="article-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari rute Wali Songo, ziarah Jakarta, urutan doa orang tua, hukum haid, atau kalender haul..."
            className="w-full pl-11 pr-10 py-3 bg-transparent text-sm text-stone-900 placeholder-stone-600 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian artikel"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Filter kategori artikel"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {ARTICLE_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            const count =
              cat === 'Semua'
                ? ZIARAH_ARTICLES.length
                : ZIARAH_ARTICLES.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-white text-stone-700 hover:text-stone-950 border border-stone-200/80'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article, index) => (
          <article
            key={article.slug}
            className="group bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-300 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-2xs transition-colors"
          >
            <div className="space-y-2.5">
              {/* Unboxed Editorial Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
                <span className="text-emerald-900 font-semibold">
                  {String(index + 1).padStart(2, '0')}. {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>
                  {formatIndonesianDate(article.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readTimeMinutes} menit baca</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                <Link to={`/artikel/${article.slug}`} className="focus:outline-none">
                  {article.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-3.5 border-t border-stone-200/70 flex items-center justify-between gap-3 text-xs">
              <span className="text-stone-600 font-medium">
                Menautkan {article.relatedSiteSlugs.length} maqbarah terkait
              </span>
              <Link
                to={`/artikel/${article.slug}`}
                className="font-bold text-emerald-800 group-hover:text-emerald-950 inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-stone-200/80 p-10 text-center space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Tidak Ada Artikel yang Cocok
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Coba gunakan kata kunci pencarian lain atau pilih kategori &ldquo;Semua&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold cursor-pointer"
            >
              Tampilkan Semua Artikel
            </button>
          </div>
        )}
      </div>

      {/* Bottom Cross-Navigation Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            Siap Merencanakan Perjalanan Ziarah Anda?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Jelajahi direktori 183 maqbarah di 34 provinsi atau buka panduan Yasin, Tahlil, dan Tasbih Digital.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/peta"
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors"
          >
            Buka Peta Rute
          </Link>
          <Link
            to="/panduan"
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            Panduan Yasin &amp; Tahlil
          </Link>
        </div>
      </div>
    </section>
  );
};
