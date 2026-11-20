import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const TARGET_COUNT = 33;
const RING_RADIUS = 74;
const RING_CIRCUMFERENCE = 464.95;

export const TasbihRingWidget: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const progress = Math.min(1, count / TARGET_COUNT);
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
  const isCompleted = count >= TARGET_COUNT;

  const handleTap = () => {
    setCount((prev) => {
      if (prev >= TARGET_COUNT) return prev;
      const next = prev + 1;
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(next === TARGET_COUNT ? [35, 50, 35] : 12);
        } catch {
          // ignore vibration errors
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(20);
      } catch {
        // ignore vibration errors
      }
    }
    setCount(0);
  };

  return (
    <div className="bg-[#0A0B0D] text-[#F5F5F7] rounded-[28px] p-6 sm:p-8 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left max-w-md">
          <span className="text-[11px] font-medium uppercase tracking-widest text-[#A1A1A6] block">
            Jeda Ruhani · Tasbih Interaktif
          </span>
          <h3 className="apple-headline text-xl sm:text-2xl font-semibold text-[#F5F5F7]">
            Tenangkan Hati Sejenak dengan 33 Istighfar
          </h3>
          <p className="text-xs sm:text-sm text-[#D2D2D7] leading-relaxed">
            Ketuk lingkaran untuk melafalkan <em className="text-white font-serif">Astaghfirullahal &apos;azhim</em>{' '}
            (Aku memohon ampun kepada Allah Yang Maha Agung). Tanpa perlu terburu-buru, biarkan napas dan hati kembali tenang.
          </p>
          {isCompleted && (
            <p className="text-xs sm:text-sm font-medium text-[#5EA383] pt-1">
              Alhamdulillah, 33 hitungan selesai. Semoga hati makin tenang.
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleTap}
            aria-label={`Ketuk tasbih istighfar, hitungan saat ini ${count} dari ${TARGET_COUNT}`}
            className="relative w-44 h-44 flex items-center justify-center rounded-full focus:outline-none cursor-pointer select-none group active:scale-95 transition-transform"
          >
            <svg
              className="w-44 h-44 -rotate-90"
              viewBox="0 0 180 180"
              aria-hidden="true"
            >
              <circle
                cx="90"
                cy="90"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="12"
              />
              <circle
                cx="90"
                cy="90"
                r={RING_RADIUS}
                fill="none"
                stroke="#358360"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="464.95"
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 0.45s cubic-bezier(0.28, 0.11, 0.32, 1)',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-[#F5F5F7]">
                {count}
                <span className="text-sm font-normal text-[#A1A1A6]">/{TARGET_COUNT}</span>
              </span>
              <span className="text-[11px] font-medium text-[#A1A1A6] mt-1 group-hover:text-white transition-colors">
                {isCompleted ? 'Selesai 33x' : 'Ketuk Dzikir'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#D2D2D7] hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Ulangi dari nol</span>
          </button>
        </div>
      </div>
    </div>
  );
};
