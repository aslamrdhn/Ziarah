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
  Share2,
  Download,
} from 'lucide-react';
import { useSiteCopy, DEFAULT_SITE_COPY, StoryReelSlide } from '../lib/siteCopy';

const AUTO_SLIDE_INTERVAL_MS = 7000;

function wrapCanvasLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function renderStorySlideCanvasBlob(
  slide: StoryReelSlide,
  slideIndex: number,
  totalSlides: number
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context tidak tersedia');
  }

  // 1. Deep Emerald Gradient Background (1080 x 1920 — 9:16 Story Format)
  const bgGradient = ctx.createLinearGradient(0, 0, 0, 1920);
  bgGradient.addColorStop(0, '#041f1a');
  bgGradient.addColorStop(0.52, '#062c24');
  bgGradient.addColorStop(1, '#021310');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 1080, 1920);

  // Subtle radial glow behind center content
  const glow = ctx.createRadialGradient(540, 620, 40, 540, 620, 520);
  glow.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
  glow.addColorStop(1, 'rgba(4, 31, 26, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Ornamental Gold Frame Border (40px margin)
  ctx.save();
  drawRoundedRect(ctx, 40, 40, 1000, 1840, 44);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.38)';
  ctx.lineWidth = 3;
  ctx.stroke();

  drawRoundedRect(ctx, 56, 56, 968, 1808, 34);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // 3. Top Header Badge & Step Label
  ctx.textAlign = 'center';
  ctx.fillStyle = '#d4af37';
  ctx.font = '600 24px Inter, system-ui, sans-serif';
  ctx.fillText('ZIARAH NUSANTARA · HIKMAH & SANAD', 540, 145);

  // Progress Pill Bar
  const barWidth = 128;
  const barGap = 14;
  const totalBarWidth = totalSlides * barWidth + (totalSlides - 1) * barGap;
  const startBarX = (1080 - totalBarWidth) / 2;
  for (let i = 0; i < totalSlides; i++) {
    drawRoundedRect(ctx, startBarX + i * (barWidth + barGap), 175, barWidth, 8, 4);
    ctx.fillStyle = i <= slideIndex ? '#d4af37' : 'rgba(255, 255, 255, 0.18)';
    ctx.fill();
  }

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '700 26px Inter, system-ui, sans-serif';
  ctx.fillText((slide.stepLabel || `BAGIAN ${slideIndex + 1}`).toUpperCase(), 540, 238);

  // 4. Nusantara Joglo / Dome Silhouette Header Artwork
  ctx.save();
  ctx.beginPath();
  ctx.arc(540, 355, 76, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
  ctx.fill();

  // Three-tiered Joglo Maqbarah roof
  ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
  ctx.beginPath();
  ctx.moveTo(540, 275);
  ctx.lineTo(552, 295);
  ctx.lineTo(528, 295);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(465, 335);
  ctx.lineTo(540, 295);
  ctx.lineTo(615, 335);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 372);
  ctx.lineTo(475, 335);
  ctx.lineTo(605, 335);
  ctx.lineTo(680, 372);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(335, 405);
  ctx.lineTo(415, 372);
  ctx.lineTo(665, 372);
  ctx.lineTo(745, 405);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 5. Center Content: Slide Title (Serif, White, Bold)
  let cursorY = 510;
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 54px Georgia, "Playfair Display", serif';
  const titleLines = wrapCanvasLines(ctx, slide.title, 860);
  for (const line of titleLines) {
    ctx.fillText(line, 540, cursorY);
    cursorY += 68;
  }

  // Ornamental Divider
  cursorY += 12;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(420, cursorY);
  ctx.lineTo(660, cursorY);
  ctx.stroke();
  cursorY += 58;

  // Optional Arabic Quote Box
  if (slide.arabicQuote) {
    ctx.font = '600 42px "Amiri", "Traditional Arabic", Georgia, serif';
    const arabicLines = wrapCanvasLines(ctx, slide.arabicQuote, 800);
    const boxHeight = arabicLines.length * 64 + (slide.arabicSource ? 95 : 50);

    ctx.save();
    drawRoundedRect(ctx, 100, cursorY - 42, 880, boxHeight, 28);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#fef08a';
    let arabY = cursorY + 18;
    for (const aLine of arabicLines) {
      ctx.fillText(aLine, 540, arabY);
      arabY += 62;
    }

    if (slide.arabicSource) {
      ctx.fillStyle = '#d1fae5';
      ctx.font = 'italic 25px Inter, system-ui, sans-serif';
      ctx.fillText(slide.arabicSource, 540, arabY + 10);
    }

    cursorY += boxHeight + 52;
  }

  // Narrative Body Text
  ctx.fillStyle = '#ecfdf5';
  ctx.font = '400 35px Inter, system-ui, sans-serif';
  const narrativeLines = wrapCanvasLines(ctx, slide.narrative, 850);
  for (const line of narrativeLines) {
    ctx.fillText(line, 540, cursorY);
    cursorY += 54;
  }

  // 6. Bottom Footer Branding & Gold CTA Pill
  ctx.fillStyle = '#a7f3d0';
  ctx.font = '500 25px Inter, system-ui, sans-serif';
  ctx.fillText(
    'Panduan Ziarah Kubur, Doa Tahlil & 183 Makam Wali di 34 Provinsi',
    540,
    1695
  );

  ctx.save();
  drawRoundedRect(ctx, 310, 1730, 460, 74, 37);
  ctx.fillStyle = '#d4af37';
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#041f1a';
  ctx.font = '700 30px Inter, system-ui, sans-serif';
  ctx.fillText('ziarahnusantara.my.id', 540, 1778);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Gagal membuat gambar Story 9:16'));
      },
      'image/png',
      1.0
    );
  });
}

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
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [storyFeedback, setStoryFeedback] = useState<string | null>(null);
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

  useEffect(() => {
    if (!storyFeedback) return;
    const timer = window.setTimeout(() => setStoryFeedback(null), 5000);
    return () => window.clearTimeout(timer);
  }, [storyFeedback]);

  const triggerBlobDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handleShareStory = async (
    slide: StoryReelSlide,
    slideIndex: number,
    mode: 'share' | 'download'
  ) => {
    if (isGeneratingStory) return;
    setIsGeneratingStory(true);
    setIsInteracting(true);
    try {
      const blob = await renderStorySlideCanvasBlob(slide, slideIndex, totalSlides);
      const fileName = `ziarah-nusantara-story-slide-${slideIndex + 1}.png`;
      const pngFile = new File([blob], fileName, { type: 'image/png' });

      if (
        mode === 'share' &&
        typeof navigator !== 'undefined' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [pngFile] })
      ) {
        await navigator.share({
          files: [pngFile],
          title: slide.title,
          text: `${slide.title} — https://ziarahnusantara.my.id`,
        });
        setStoryFeedback('Slide Story 9:16 siap dibagikan ke Instagram Story atau WhatsApp Status.');
      } else {
        triggerBlobDownload(blob, fileName);
        setStoryFeedback(
          'Gambar Story 9:16 berhasil diunduh! Siap langsung diunggah ke Instagram Story atau WhatsApp Status Anda.'
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User closed native share sheet
      } else {
        setStoryFeedback('Gagal menyiapkan gambar Story. Silakan coba kembali.');
      }
    } finally {
      setIsGeneratingStory(false);
    }
  };

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

          {/* 9:16 Story Share & Download Actions (IG Story / WA Status) */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleShareStory(currentSlide, safeIndex, 'share')}
                disabled={isGeneratingStory}
                className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-[11px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span>{isGeneratingStory ? 'Menyiapkan...' : '📲 Post ke IG / WA Story (9:16)'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleShareStory(currentSlide, safeIndex, 'download')}
                disabled={isGeneratingStory}
                className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-60 text-slate-800 border border-slate-200 text-[11px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>⬇ Unduh Gambar Story</span>
              </button>
            </div>
            {storyFeedback && (
              <p
                role="status"
                className="text-[11px] leading-snug text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-center font-medium"
              >
                {storyFeedback}
              </p>
            )}
          </div>

          {/* Card Footer Navigation & Final Slide Conversion CTAs */}
          <div className="pt-3 mt-3 border-t border-slate-200">
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

