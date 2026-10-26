import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Film, Compass, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { ziarahSites } from '../data/sites';

interface CinemaScene {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  narration: string;
  videoUrl: string;
  fallbackImageUrl: string;
}

const CINEMA_SCENES: CinemaScene[] = [
  {
    id: 'scene-walisongo',
    index: 'BABAK I · JALUR PESISIR JAWA',
    title: 'Warisan Walisongo & Arsitektur Masjid Kuno',
    subtitle: 'Akulturasi Budaya, Gapura Bata Merah & Menara Kudus',
    location: 'Demak, Kudus, Tuban & Cirebon',
    category: 'Walisongo',
    narration: 'Menelusuri jejak sembilan wali pelopor dakwah Nusantara yang memadukan arsitektur klasik Jawa dengan nilai-nilai tauhid yang teduh dan penuh kebijaksanaan.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-buildings-on-a-sunny-day-41465-large.mp4',
    fallbackImageUrl: ziarahSites[0]?.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Masjid_Agung_Demak_2022.jpg/1280px-Masjid_Agung_Demak_2022.jpg',
  },
  {
    id: 'scene-ulama',
    index: 'BABAK II · POROS PESANTREN & HARAMAIN',
    title: 'Sanad Keilmuan Ulama & Mahaguru Nusantara',
    subtitle: 'Dari Bangkalan, Tebuireng, hingga Martapura',
    location: 'Jawa Timur, Kalimantan Selatan & Aceh',
    category: 'Ulama Nusantara',
    narration: 'Mata rantai keilmuan para ulama besar yang melahirkan jaringan pesantren, karya kitab turats, dan keteladanan akhlak bagi jutaan peziarah.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sunlight-passing-through-the-trees-in-a-forest-34443-large.mp4',
    fallbackImageUrl: ziarahSites[9]?.imageUrl || ziarahSites[1]?.imageUrl || '',
  },
  {
    id: 'scene-habaib',
    index: 'BABAK III · DZIKIR & PELABUHAN NUSANTARA',
    title: 'Majelis Maulid, Ratib & Jejak Para Habaib',
    subtitle: 'Cahaya Dzikir di Pesisir Jakarta, Pekalongan & Gresik',
    location: 'Luar Batang, Kwitang, Empang Bogor & Gresik',
    category: 'Habaib',
    narration: 'Untaian wirid, Ratib Al-Haddad, dan tradisi maulid yang terus bergema di maqam para dzurriyah Rasulullah SAW di sepanjang pesisir kepulauan Indonesia.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4',
    fallbackImageUrl: ziarahSites[15]?.imageUrl || ziarahSites[2]?.imageUrl || '',
  },
  {
    id: 'scene-auliya',
    index: 'BABAK IV · KESULTANAN & PENJAGA TRADISI',
    title: 'Auliya Nusantara & Penjaga Peradaban Kepulauan',
    subtitle: 'Banten Lama, Tembayat, hingga Wali Pitu Bali',
    location: 'Banten, Jawa Tengah, Bali & Sulawesi',
    category: 'Auliya Nusantara',
    narration: 'Menghormati jejak para sultan sufi dan waliyullah pembuka tanah perdikan yang merawat harmoni spiritual masyarakat Nusantara lintas abad.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    fallbackImageUrl: ziarahSites[20]?.imageUrl || ziarahSites[3]?.imageUrl || '',
  }
];

interface HeroCinemaShowcaseProps {
  onSelectCategory?: (category: string) => void;
}

export const HeroCinemaShowcase: React.FC<HeroCinemaShowcaseProps> = React.memo(({ onSelectCategory }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);
  const progressValueRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  const activeScene = CINEMA_SCENES[currentSceneIdx];

  // Pause video & canvas when scrolled out of viewport to save CPU/GPU on mobile & tablet
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        const vid = videoRef.current;
        if (vid) {
          if (entry.isIntersecting && isPlaying) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Control HTML5 video playback state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying && isVisibleRef.current) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isPlaying, currentSceneIdx]);

  // Direct DOM progress & timecode update (Zero React re-renders during playback!)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (!isVisibleRef.current) return;
      progressValueRef.current += 2;
      if (progressValueRef.current >= 100) {
        progressValueRef.current = 0;
        setCurrentSceneIdx((idx) => (idx + 1) % CINEMA_SCENES.length);
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressValueRef.current}%`;
      }
      if (timecodeRef.current) {
        const totalFrames = Math.floor((currentSceneIdx * 100 + progressValueRef.current) * 2.4);
        const secs = Math.floor(totalFrames / 24);
        const frames = totalFrames % 24;
        const mins = Math.floor(secs / 60);
        const remSecs = secs % 60;
        timecodeRef.current.textContent = `00:${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
      }
    }, 240);

    return () => clearInterval(interval);
  }, [isPlaying, currentSceneIdx]);

  // Lightweight Atmospheric Cinema Canvas (Capped DPR & Visibility-gated)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.3) * 0.0005,
      vy: -(Math.random() * 0.0006 + 0.0002),
      alpha: Math.random() * 0.55 + 0.2,
      phase: Math.random() * Math.PI * 2
    }));

    let tick = 0;
    const render = () => {
      if (isPlaying && isVisibleRef.current) {
        tick += 0.015;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        // Soft Golden Light Rays
        for (let i = 0; i < 3; i++) {
          const rayAngle = Math.sin(tick * 0.4 + i) * 0.05;
          const grad = ctx.createLinearGradient(w * (0.28 + i * 0.25), 0, w * (0.12 + i * 0.25 + rayAngle), h);
          grad.addColorStop(0, 'rgba(220, 194, 152, 0.12)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(w * (0.2 + i * 0.25), 0);
          ctx.lineTo(w * (0.34 + i * 0.25), 0);
          ctx.lineTo(w * (0.16 + i * 0.25 + rayAngle * 2), h);
          ctx.lineTo(w * (-0.02 + i * 0.25 + rayAngle * 2), h);
          ctx.closePath();
          ctx.fill();
        }

        // Floating Golden Dust Motes
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(tick + p.phase) * 0.0002;
          p.y += p.vy;
          if (p.y < -0.05) p.y = 1.05;
          if (p.x > 1.05) p.x = -0.05;
          if (p.x < -0.05) p.x = 1.05;
          const flicker = 0.5 + 0.5 * Math.sin(tick * 2.5 + p.phase);
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 211, 141, ${p.alpha * flicker})`;
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-stone-300/90 bg-stone-950 shadow-lg transition-all duration-300 ${
        isExpanded ? 'h-[460px] sm:h-[540px]' : 'h-[360px] sm:h-[420px] lg:h-[450px]'
      }`}
    >
      {/* LAYER 1: HARDWARE-ACCELERATED KEN BURNS + HTML5 VIDEO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: isPlaying ? [1.01, 1.09] : 1.03,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 12, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src={activeScene.fallbackImageUrl}
            alt={activeScene.title}
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
          />

          <video
            ref={videoRef}
            key={activeScene.videoUrl}
            src={activeScene.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 2: ATMOSPHERIC CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* LAYER 3: MEASURED CINEMA VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25 z-10 pointer-events-none" />

      {/* LAYER 4: TOP FILM ARCHIVE HUD */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/15 text-[11px] font-mono text-stone-300">
        <div className="flex items-center gap-2 min-w-0">
          <Film className="w-3.5 h-3.5 text-[#dcc298] shrink-0" />
          <span className="uppercase tracking-widest font-sans font-semibold text-white truncate">
            DOKUMENTER VISUAL
          </span>
          <span aria-hidden="true" className="text-white/40 hidden sm:inline">·</span>
          <span className="text-[#dcc298] hidden sm:inline truncate">{activeScene.index}</span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span ref={timecodeRef} className="tabular-nums text-white/80 text-[11px]">
            00:00:00:00
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isExpanded ? 'Perkecil Layar Video' : 'Perbesar Layar Video'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* LAYER 5: CAPTION & INTERACTIVE CONTROLS */}
      <div className="relative z-20 flex flex-col justify-end h-[calc(100%-45px)] p-4 sm:p-6">
        <div className="max-w-xl mb-4">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#dcc298] font-semibold mb-1">
            {activeScene.location}
          </div>
          <h3 className="text-lg sm:text-2xl font-serif font-normal text-white leading-snug mb-1.5">
            {activeScene.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed line-clamp-2">
            {activeScene.narration}
          </p>
        </div>

        <div className="pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-stone-950 hover:bg-[#dcc298] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              title={isPlaying ? 'Jeda Video' : 'Putar Video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <div className="flex items-center gap-1">
              {CINEMA_SCENES.map((scene, idx) => {
                const isCurrent = idx === currentSceneIdx;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      progressValueRef.current = 0;
                      setCurrentSceneIdx(idx);
                      setIsPlaying(true);
                    }}
                    className={`relative px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors overflow-hidden cursor-pointer whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-stone-300 hover:bg-white/15 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="relative z-10 font-mono tabular-nums mr-1 text-[10px] text-[#dcc298]">
                      0{idx + 1}
                    </span>
                    <span className="relative z-10">{scene.category}</span>
                    {isCurrent && (
                      <div
                        ref={progressBarRef}
                        className="absolute bottom-0 left-0 h-0.5 bg-[#dcc298] transition-all duration-200"
                        style={{ width: '0%' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {onSelectCategory && (
            <button
              type="button"
              onClick={() => onSelectCategory(activeScene.category)}
              className="px-3 py-1.5 rounded-lg bg-[#dcc298] hover:bg-[#c5a059] text-stone-950 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Arsip {activeScene.category}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
