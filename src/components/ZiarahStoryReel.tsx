import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  BookOpen,
  HeartHandshake,
  Lock,
} from 'lucide-react';
import { useSiteCopy, DEFAULT_SITE_COPY } from '../lib/siteCopy';

const AUTO_SLIDE_INTERVAL_MS = 7000;

export const ZiarahStoryReel: React.FC = () => {
  const { copy } = useSiteCopy();
  const slides =
    Array.isArray(copy.storyReelSlides) && copy.storyReelSlides.length > 0
      ? copy.storyReelSlides
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
  const isClosingSlides = safeIndex >= 3;
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
      aria-label={copy.storyReelSectionTitle || DEFAULT_SITE_COPY.storyReelSectionTitle}
      className="bg-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-200 relative overflow-hidden"
    >
      {/* Top Header Row */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-2 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{copy.storyReelSectionSubtitle || DEFAULT_SITE_COPY.storyReelSectionSubtitle}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 text-center">
          {copy.storyReelSectionTitle || DEFAULT_SITE_COPY.storyReelSectionTitle}
        </h2>

        <div className="text-xs font-medium text-slate-600 tracking-tight">
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
            className="hidden md:flex w-[260px] aspect-[4/5] rounded-3xl bg-white p-6 opacity-75 scale-90 cursor-pointer hover:opacity-95 transition-all flex-col justify-between text-slate-700 border border-slate-200 shrink-0 -mr-6 lg:-mr-4"
          >
            {/* Dimmed Progress Bars */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1">
                {slides.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`h-1 rounded-full ${
                      idx <= prevIndex ? 'bg-emerald-700' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">
                {prevSlide.stepLabel}
              </span>
            </div>

            {/* Subtle Silhouette Preview */}
            <div className="my-auto flex items-center justify-center opacity-60">
              <svg viewBox="0 0 160 80" className="w-36 h-20" aria-hidden="true">
                <circle cx="80" cy="44" r="24" fill="#059669" fillOpacity="0.12" />
                <path
                  d="M25 68 L52 44 L80 24 L108 44 L135 68 Z"
                  fill="#F8FAFC"
                  stroke="#059669"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <p className="font-serif text-lg leading-snug text-slate-900 line-clamp-3">
                {prevSlide.shortTabTitle}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                <ChevronLeft className="w-3.5 h-3.5" /> Ketuk untuk kembali
              </span>
            </div>
          </div>
        )}

        {/* Center Active Card */}
        <div className="w-full max-w-[350px] sm:max-w-[380px] min-h-[470px] sm:min-h-[500px] rounded-3xl bg-white text-slate-900 p-6 sm:p-7 shadow-sm border border-slate-200 relative z-10 flex flex-col justify-between transition-all duration-500">
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
                    className="h-1.5 rounded-full bg-slate-200 overflow-hidden cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompletedOrActive ? 'w-full bg-emerald-700' : 'w-0 bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="font-semibold tracking-wider uppercase text-emerald-800">
                {currentSlide.stepLabel}
              </span>
              <button
                type="button"
                onClick={() => setIsAutoPlay((prev) => !prev)}
                aria-label={isAutoPlay ? 'Jeda putar otomatis' : 'Putar otomatis'}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-700 transition cursor-pointer"
              >
                {isAutoPlay ? (
                  <>
                    <Pause className="w-2.5 h-2.5 text-emerald-700" />
                    <span>Auto</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 text-emerald-700" />
                    <span>Jeda</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Clean Slate & Emerald Nusantara Joglo Maqbarah Illustration */}
          <div className="relative my-3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
            <svg
              viewBox="0 0 360 120"
              className="w-full h-24 sm:h-28 block"
              role="img"
              aria-label="Ilustrasi siluet cungkup makam wali Nusantara"
            >
              <circle cx="180" cy="68" r="46" fill="#059669" fillOpacity="0.08" />
              <path
                d="M0 98 Q75 82 145 94 T280 90 T360 98 L360 120 L0 120 Z"
                fill="#E2E8F0"
              />
              <g>
                <path d="M180 18 L184 26 L176 26 Z" fill="#059669" />
                <path
                  d="M152 40 L180 25 L208 40 Z"
                  fill="#0F172A"
                />
                <path
                  d="M126 56 L156 40 L204 40 L234 56 Z"
                  fill="#1E293B"
                />
                <path
                  d="M96 70 L132 56 L228 56 L264 70 Z"
                  fill="#0F172A"
                />
                <rect x="124" y="70" width="4" height="34" fill="#334155" />
                <rect x="154" y="70" width="4" height="34" fill="#334155" />
                <rect x="202" y="70" width="4" height="34" fill="#334155" />
                <rect x="232" y="70" width="4" height="34" fill="#334155" />
                <path
                  d="M175 104 L175 86 L180 80 L185 86 L185 104 Z"
                  fill="#059669"
                />
              </g>
              <rect x="82" y="104" width="196" height="5" rx="2" fill="#CBD5E1" />
            </svg>
          </div>

          {/* Main Content: Sub-label, Title, Narrative & Optional Arabic Hadith Box */}
          <div className="my-auto flex-1 flex flex-col justify-center">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-800">
              {currentSlide.stepLabel}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-slate-900 leading-snug mt-1">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              {currentSlide.narrative}
            </p>

            {currentSlide.arabicQuote && (
              <div className="my-3 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-lg sm:text-xl text-slate-900 leading-loose"
                >
                  {currentSlide.arabicQuote}
                </p>
                {currentSlide.arabicSource && (
                  <p className="text-[11px] text-slate-600 italic mt-1">
                    {currentSlide.arabicSource}
                  </p>
                )}
              </div>
            )}

            {/* Slide 4 & 5: Blurred Amalan & Doa Preview to guide visitors to full guide & infaq */}
            {isClosingSlides && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Rangkaian Tawassul &amp; Doa Munajat Lengkap
                  </span>
                </div>
                <div className="blur-[5px] select-none pointer-events-none opacity-55 space-y-1" aria-hidden="true">
                  <p dir="rtl" className="font-arabic text-base text-slate-900 text-right">
                    اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ وَانْفَعْنَا بِأَسْرَارِهِمْ
                  </p>
                  <p className="text-[11px] text-slate-600 italic">
                    Ya Allah, limpahkanlah rahmat dan keberkahan ilmu para kekasih-Mu kepada keluarga kami...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer Navigation & Final Slide Conversion CTAs */}
          <div className="pt-4 mt-3 border-t border-slate-200">
            {!isLastSlide ? (
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={safeIndex === 0}
                  className={`inline-flex items-center gap-1 text-xs font-medium transition cursor-pointer ${
                    safeIndex === 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition cursor-pointer"
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
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Tuntunan Yasin &amp; Doa Ziarah</span>
                  </Link>
                  <Link
                    to="/donasi"
                    className="w-full py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium text-xs text-center border border-slate-200 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Titip Doa Almarhum di Dinding Munajat</span>
                  </Link>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(0)}
                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 transition cursor-pointer"
                  >
                    Ulangi dari Slide 1
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
            className="hidden md:flex w-[260px] aspect-[4/5] rounded-3xl bg-white p-6 opacity-75 scale-90 cursor-pointer hover:opacity-95 transition-all flex-col justify-between text-slate-700 border border-slate-200 shrink-0 -ml-6 lg:-ml-4"
          >
            {/* Dimmed Progress Bars */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1">
                {slides.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className={`h-1 rounded-full ${
                      idx <= nextIndex ? 'bg-emerald-700' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">
                {nextSlide.stepLabel}
              </span>
            </div>

            {/* Subtle Silhouette Preview */}
            <div className="my-auto flex items-center justify-center opacity-60">
              <svg viewBox="0 0 160 80" className="w-36 h-20" aria-hidden="true">
                <circle cx="80" cy="44" r="24" fill="#059669" fillOpacity="0.12" />
                <path
                  d="M25 68 L52 44 L80 24 L108 44 L135 68 Z"
                  fill="#F8FAFC"
                  stroke="#059669"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <p className="font-serif text-lg leading-snug text-slate-900 line-clamp-3">
                {nextSlide.shortTabTitle}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Quick-Jump Selector for Desktop & Mobile */}
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
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
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
