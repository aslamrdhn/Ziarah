import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  BookOpen,
  HeartHandshake,
} from 'lucide-react';
import { useSiteCopy, DEFAULT_SITE_COPY } from '../lib/siteCopy';

const AUTO_SLIDE_INTERVAL_MS = 7000;

export const ZiarahStoryReel: React.FC = () => {
  const siteCopy = useSiteCopy();
  const slides =
    Array.isArray(siteCopy.storyReelSlides) && siteCopy.storyReelSlides.length > 0
      ? siteCopy.storyReelSlides
      : DEFAULT_SITE_COPY.storyReelSlides;

  const totalSlides = slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const safeIndex = activeIndex >= totalSlides ? 0 : activeIndex;
  const currentSlide = slides[safeIndex] || slides[0];
  const prevIndex = (safeIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (safeIndex + 1) % totalSlides;
  const prevSlide = slides[prevIndex];
  const nextSlide = slides[nextIndex];
  const isLastSlide = safeIndex === totalSlides - 1;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!isAutoPlay || isInteracting || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      goToNext();
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isAutoPlay, isInteracting, totalSlides, goToNext, safeIndex]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsInteracting(false);
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    if (e.changedTouches.length === 0) return;

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <section
      aria-label={siteCopy.storyReelSectionTitle || DEFAULT_SITE_COPY.storyReelSectionTitle}
      className="bg-[#F4F1EA] rounded-3xl p-5 sm:p-8 border border-stone-200/80 shadow-xs relative overflow-hidden"
    >
      {/* Subtle ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[240px] bg-gradient-to-b from-amber-500/10 via-emerald-900/5 to-transparent blur-3xl"
      />

      {/* Top Header Row */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-2 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-900/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
          <span>{siteCopy.storyReelSectionSubtitle || DEFAULT_SITE_COPY.storyReelSectionSubtitle}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 text-center">
          {siteCopy.storyReelSectionTitle || DEFAULT_SITE_COPY.storyReelSectionTitle}
        </h2>

        <div className="text-xs font-medium text-stone-600 tracking-tight">
          Cerita Visual ({safeIndex + 1}–{totalSlides})
        </div>
      </div>

      {/* 3D Overlapping Story Reel Stage */}
      <div
        className="relative z-10 flex items-center justify-center gap-3 lg:gap-5 py-1 select-none"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Preview Card (Previous Slide — visible on md+) */}
        {prevSlide && (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Lihat slide sebelumnya: ${prevSlide.shortTabTitle}`}
            onClick={() => setActiveIndex(prevIndex)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(prevIndex);
              }
            }}
            className="hidden md:flex w-[260px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1A382F] to-[#0D211B] p-6 opacity-60 scale-90 cursor-pointer hover:opacity-80 transition-all flex-col justify-between text-stone-200 shadow-lg border border-amber-500/10 shrink-0 -mr-6 lg:-mr-4"
          >
            {/* Dimmed Progress Bars */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1">
                {slides.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`h-1 rounded-full ${
                      idx <= prevIndex ? 'bg-amber-300/60' : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-amber-200/70">
                {prevSlide.stepLabel}
              </span>
            </div>

            {/* Subtle Silhouette Preview */}
            <div className="my-auto flex items-center justify-center opacity-40">
              <svg viewBox="0 0 160 80" className="w-36 h-20" aria-hidden="true">
                <circle cx="80" cy="44" r="24" fill="#C5A059" fillOpacity="0.25" />
                <path
                  d="M25 68 L52 44 L80 24 L108 44 L135 68 Z"
                  fill="#061510"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <p className="font-serif text-lg leading-snug text-stone-100 line-clamp-3">
                {prevSlide.shortTabTitle}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/80 font-medium">
                <ChevronLeft className="w-3.5 h-3.5" /> Ketuk untuk kembali
              </span>
            </div>
          </div>
        )}

        {/* Center Active Card */}
        <div className="w-full max-w-[350px] sm:max-w-[380px] min-h-[470px] sm:min-h-[500px] rounded-3xl bg-gradient-to-b from-[#0E3A2F] via-[#08261E] to-[#041611] text-amber-50 p-6 sm:p-7 shadow-2xl border border-amber-500/20 relative z-10 flex flex-col justify-between transition-all duration-500">
          {/* Top Story Progress Bar (5 Segments) + Auto-Slide Play/Pause */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Progres Slide Hikmah Ziarah">
              {slides.map((slideItem, idx) => {
                const isCompletedOrActive = idx <= safeIndex;
                return (
                  <button
                    key={slideItem.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === safeIndex}
                    aria-label={`Buka slide ${idx + 1}: ${slideItem.shortTabTitle}`}
                    onClick={() => setActiveIndex(idx)}
                    className="h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompletedOrActive ? 'w-full bg-amber-300' : 'w-0 bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-amber-200/80">
              <span className="font-medium tracking-wider uppercase text-amber-300/90">
                {currentSlide.stepLabel}
              </span>
              <button
                type="button"
                onClick={() => setIsAutoPlay((prev) => !prev)}
                aria-label={isAutoPlay ? 'Jeda putar otomatis' : 'Putar otomatis'}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/15 text-[10px] font-medium text-amber-100 transition cursor-pointer"
              >
                {isAutoPlay ? (
                  <>
                    <Pause className="w-2.5 h-2.5 text-amber-300" />
                    <span>Auto</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 text-amber-300" />
                    <span>Jeda</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Atmospheric Nusantara Dusk Multi-Layer SVG Illustration */}
          <div className="relative my-3 rounded-2xl overflow-hidden border border-amber-400/15 bg-gradient-to-b from-[#17493B] via-[#10352B] to-[#061A14]">
            <svg
              viewBox="0 0 360 135"
              className="w-full h-28 sm:h-32 block"
              role="img"
              aria-label="Ilustrasi siluet cungkup makam wali Nusantara di bawah langit senja keemasan"
            >
              <defs>
                <radialGradient id="znSunGlow" cx="50%" cy="62%" r="48%">
                  <stop offset="0%" stopColor="#EAB308" stopOpacity="0.55" />
                  <stop offset="55%" stopColor="#C5A059" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0E3A2F" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="znHorizonMist" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0.18" />
                </linearGradient>
              </defs>

              {/* Golden dusk sky aura */}
              <rect width="360" height="135" fill="url(#znHorizonMist)" />
              <circle cx="180" cy="82" r="68" fill="url(#znSunGlow)" />
              <circle cx="180" cy="82" r="24" fill="#EAB308" fillOpacity="0.28" />

              {/* Subtle stars & crescent */}
              <circle cx="64" cy="26" r="1.2" fill="#FDE68A" fillOpacity="0.7" />
              <circle cx="112" cy="18" r="1" fill="#FDE68A" fillOpacity="0.5" />
              <circle cx="255" cy="22" r="1.3" fill="#FDE68A" fillOpacity="0.65" />
              <circle cx="302" cy="32" r="1" fill="#FDE68A" fillOpacity="0.45" />

              {/* Distant archipelago hills */}
              <path
                d="M0 112 Q65 88 135 106 T275 100 T360 110 L360 135 L0 135 Z"
                fill="#0A2920"
              />

              {/* Left & Right Kamboja (Frangipani) sanctuary trees */}
              <g fill="#051712" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.3">
                <path d="M38 128 Q44 96 30 74 Q45 84 48 100 Q55 80 68 72 Q56 92 50 128 Z" />
                <circle cx="30" cy="72" r="7" fill="#07221B" />
                <circle cx="67" cy="70" r="8" fill="#07221B" />
                <path d="M318 128 Q312 96 326 74 Q311 84 308 100 Q301 80 288 72 Q300 92 306 128 Z" />
                <circle cx="326" cy="72" r="7" fill="#07221B" />
                <circle cx="289" cy="70" r="8" fill="#07221B" />
              </g>

              {/* Javanese 3-Tiered Joglo / Cungkup Maqbarah Silhouette */}
              <g>
                {/* Mustaka (Finial crown) */}
                <path d="M180 22 L184 31 L176 31 Z" fill="#EAB308" fillOpacity="0.85" />
                {/* Tier 1 Top Roof */}
                <path
                  d="M152 46 L180 29 L208 46 Z"
                  fill="#051813"
                  stroke="#C5A059"
                  strokeWidth="0.9"
                  strokeOpacity="0.65"
                />
                {/* Tier 2 Middle Roof */}
                <path
                  d="M126 64 L156 46 L204 46 L234 64 Z"
                  fill="#041510"
                  stroke="#C5A059"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Tier 3 Wide Pendopo Eaves */}
                <path
                  d="M96 80 L132 64 L228 64 L264 80 Z"
                  fill="#03110D"
                  stroke="#C5A059"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                {/* Wooden Soko Guru Pillars */}
                <rect x="122" y="80" width="4" height="38" fill="#04120E" />
                <rect x="152" y="80" width="4" height="38" fill="#04120E" />
                <rect x="204" y="80" width="4" height="38" fill="#04120E" />
                <rect x="234" y="80" width="4" height="38" fill="#04120E" />

                {/* Hanging Sanctuary Lanterns (Lentera Maqbarah) */}
                <line x1="138" y1="80" x2="138" y2="90" stroke="#FDE68A" strokeWidth="0.7" />
                <circle cx="138" cy="92" r="2.8" fill="#FDE68A" />
                <circle cx="138" cy="92" r="6" fill="#EAB308" fillOpacity="0.3" />

                <line x1="222" y1="80" x2="222" y2="90" stroke="#FDE68A" strokeWidth="0.7" />
                <circle cx="222" cy="92" r="2.8" fill="#FDE68A" />
                <circle cx="222" cy="92" r="6" fill="#EAB308" fillOpacity="0.3" />

                {/* Center Gravestone / Nisan Nusantara Silhouette */}
                <path
                  d="M175 116 L175 96 L180 90 L185 96 L185 116 Z"
                  fill="#C5A059"
                  fillOpacity="0.45"
                />
                {/* Peziarah sitting in quiet contemplation */}
                <path
                  d="M161 116 C161 107 168 107 169 116 Z"
                  fill="#020B08"
                />
                <circle cx="165" cy="104" r="3" fill="#020B08" />
              </g>

              {/* Foreground Courtyard Steps */}
              <rect x="82" y="118" width="196" height="5" rx="2" fill="#03100C" />
              <rect x="0" y="123" width="360" height="12" fill="#020B08" />
            </svg>
          </div>

          {/* Main Content: Sub-label, Title, Narrative & Optional Arabic Hadith Box */}
          <div className="my-auto flex-1 flex flex-col justify-center">
            <span className="text-[11px] font-medium tracking-widest uppercase text-amber-300/90">
              {currentSlide.stepLabel}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white leading-snug mt-1">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200/95 leading-relaxed mt-2.5">
              {currentSlide.narrative}
            </p>

            {currentSlide.arabicQuote && (
              <div className="my-3 py-2.5 px-3 rounded-xl bg-black/25 border border-amber-400/20 text-center">
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-lg sm:text-xl text-amber-300 leading-loose"
                >
                  {currentSlide.arabicQuote}
                </p>
                {currentSlide.arabicSource && (
                  <p className="text-[11px] text-stone-300 italic mt-1">
                    {currentSlide.arabicSource}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Card Footer Navigation & Final Slide Conversion CTAs */}
          <div className="pt-4 mt-3 border-t border-white/10">
            {!isLastSlide ? (
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={safeIndex === 0}
                  className={`inline-flex items-center gap-1 text-xs font-medium transition cursor-pointer ${
                    safeIndex === 0
                      ? 'text-stone-500 cursor-not-allowed'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-300 hover:text-amber-200 transition cursor-pointer"
                >
                  <span>
                    Geser Kisah ({safeIndex + 1}/{totalSlides})
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/panduan"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-stone-950 font-semibold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Tuntunan Yasin &amp; Doa Ziarah</span>
                  </Link>
                  <Link
                    to="/donasi"
                    className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-amber-100 font-medium text-xs text-center border border-white/15 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                    <span>Titip Doa Almarhum di Dinding Munajat</span>
                  </Link>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-300 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(0)}
                    className="text-[11px] font-medium text-amber-300/90 hover:text-amber-200 transition cursor-pointer"
                  >
                    Ulangi dari Slide 1 ↺
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Card (Next Slide — visible on md+) */}
        {nextSlide && (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Lihat slide berikutnya: ${nextSlide.shortTabTitle}`}
            onClick={() => setActiveIndex(nextIndex)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(nextIndex);
              }
            }}
            className="hidden md:flex w-[260px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1A382F] to-[#0D211B] p-6 opacity-60 scale-90 cursor-pointer hover:opacity-80 transition-all flex-col justify-between text-stone-200 shadow-lg border border-amber-500/10 shrink-0 -ml-6 lg:-ml-4"
          >
            {/* Dimmed Progress Bars */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1">
                {slides.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`h-1 rounded-full ${
                      idx <= nextIndex ? 'bg-amber-300/60' : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-amber-200/70">
                {nextSlide.stepLabel}
              </span>
            </div>

            {/* Subtle Silhouette Preview */}
            <div className="my-auto flex items-center justify-center opacity-40">
              <svg viewBox="0 0 160 80" className="w-36 h-20" aria-hidden="true">
                <circle cx="80" cy="44" r="24" fill="#C5A059" fillOpacity="0.25" />
                <path
                  d="M25 68 L52 44 L80 24 L108 44 L135 68 Z"
                  fill="#061510"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <p className="font-serif text-lg leading-snug text-stone-100 line-clamp-3">
                {nextSlide.shortTabTitle}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/80 font-medium">
                Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Quick-Jump Pill Selector for Desktop & Mobile */}
      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {slides.map((slideItem, idx) => {
          const active = idx === safeIndex;
          return (
            <button
              key={slideItem.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition cursor-pointer border ${
                active
                  ? 'bg-[#0E3A2F] text-amber-200 border-amber-500/30 shadow-2xs'
                  : 'bg-white/80 text-stone-700 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              {slideItem.shortTabTitle}
            </button>
          );
        })}
      </div>
    </section>
  );
};
