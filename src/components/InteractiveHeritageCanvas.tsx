import React, { useEffect, useRef, useState } from 'react';

interface InteractiveHeritageCanvasProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

interface NodePoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  region: string;
  category: string;
  isPrimary: boolean;
}

const ARCHIPELAGO_NODES: Omit<NodePoint, 'x' | 'y'>[] = [
  { baseX: 0.22, baseY: 0.34, radius: 5.5, label: 'Syekh Kuala', region: 'Aceh', category: 'Ulama Nusantara', isPrimary: true },
  { baseX: 0.34, baseY: 0.56, radius: 5.5, label: 'Syarif Hidayatullah', region: 'Cirebon', category: 'Walisongo', isPrimary: true },
  { baseX: 0.29, baseY: 0.54, radius: 5, label: 'Maulana Hasanuddin', region: 'Banten', category: 'Auliya Nusantara', isPrimary: false },
  { baseX: 0.31, baseY: 0.52, radius: 5, label: 'Habib Luar Batang', region: 'Jakarta', category: 'Habaib', isPrimary: true },
  { baseX: 0.45, baseY: 0.58, radius: 6.5, label: 'Sunan Kalijaga', region: 'Demak', category: 'Walisongo', isPrimary: true },
  { baseX: 0.48, baseY: 0.55, radius: 5.5, label: 'Sunan Kudus', region: 'Kudus', category: 'Walisongo', isPrimary: true },
  { baseX: 0.54, baseY: 0.56, radius: 6, label: 'Sunan Ampel', region: 'Surabaya', category: 'Walisongo', isPrimary: true },
  { baseX: 0.52, baseY: 0.61, radius: 5.5, label: 'KH. Hasyim Asy\'ari', region: 'Jombang', category: 'Ulama Nusantara', isPrimary: true },
  { baseX: 0.57, baseY: 0.59, radius: 5, label: 'Syaikhona Kholil', region: 'Bangkalan', category: 'Ulama Nusantara', isPrimary: false },
  { baseX: 0.59, baseY: 0.42, radius: 6, label: 'Abah Guru Sekumpul', region: 'Martapura', category: 'Ulama Nusantara', isPrimary: true },
  { baseX: 0.71, baseY: 0.51, radius: 5, label: 'Syekh Yusuf Al-Makassari', region: 'Gowa', category: 'Ulama Nusantara', isPrimary: true },
  { baseX: 0.64, baseY: 0.66, radius: 4.5, label: 'Wali Pitu', region: 'Bali & Nusa', category: 'Auliya Nusantara', isPrimary: false },
];

export const InteractiveHeritageCanvas: React.FC<InteractiveHeritageCanvasProps> = React.memo(({
  onSelectCategory,
  activeCategory = 'Semua'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const azimuthRef = useRef<HTMLSpanElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isVisibleRef = useRef<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<string>('Sunan Kalijaga · Demak (Walisongo)');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
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

    const nodes: NodePoint[] = ARCHIPELAGO_NODES.map((n) => ({
      ...n,
      x: n.baseX,
      y: n.baseY,
    }));

    let tick = 0;
    let frameCount = 0;

    const render = () => {
      if (isVisibleRef.current) {
        tick += 0.004;
        frameCount++;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        const cx = w * 0.5;
        const cy = h * 0.5;
        const maxR = Math.min(w, h) * 0.42;

        const mx = (mouseRef.current.x - 0.5) * 16;
        const my = (mouseRef.current.y - 0.5) * 16;

        // 1. Archival Astrolabe Concentric Rings
        ctx.save();
        ctx.translate(cx + mx * 0.35, cy + my * 0.35);

        const rings = [0.38, 0.62, 0.85, 1.0];
        rings.forEach((rRatio, idx) => {
          ctx.beginPath();
          ctx.arc(0, 0, maxR * rRatio, 0, Math.PI * 2);
          ctx.strokeStyle = idx % 2 === 0 ? 'rgba(197, 160, 89, 0.22)' : 'rgba(20, 83, 45, 0.12)';
          ctx.lineWidth = 1;
          ctx.setLineDash(idx === 1 || idx === 3 ? [4, 6] : []);
          ctx.stroke();
        });

        ctx.rotate(tick * 0.4);
        ctx.setLineDash([]);
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (maxR * 0.2), Math.sin(angle) * (maxR * 0.2));
          ctx.lineTo(Math.cos(angle) * maxR, Math.sin(angle) * maxR);
          ctx.strokeStyle = 'rgba(197, 160, 89, 0.14)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();

        // 2. Archipelago Sanad Network Connections
        nodes.forEach((node, i) => {
          const waveX = Math.sin(tick * 2 + i * 1.1) * 0.007;
          const waveY = Math.cos(tick * 1.7 + i * 0.9) * 0.007;
          node.x = node.baseX + waveX + (mouseRef.current.x - 0.5) * 0.02;
          node.y = node.baseY + waveY + (mouseRef.current.y - 0.5) * 0.02;
        });

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = (nodes[i].x - nodes[j].x) * w;
            const dy = (nodes[i].y - nodes[j].y) * h;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < Math.min(w, h) * 0.36) {
              const alpha = (1 - dist / (Math.min(w, h) * 0.36)) * 0.26;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
              ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
              ctx.strokeStyle = `rgba(6, 78, 59, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // 3. Draw Nodes & Labels
        nodes.forEach((node) => {
          const px = node.x * w;
          const py = node.y * h;
          const isMatched = activeCategory === 'Semua' || node.category === activeCategory;

          if (node.isPrimary && isMatched) {
            ctx.beginPath();
            ctx.arc(px, py, node.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(197, 160, 89, 0.15)';
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(px, py, isMatched ? node.radius : node.radius * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = isMatched
            ? node.category === 'Walisongo'
              ? '#064e3b'
              : '#b48a3e'
            : 'rgba(168, 162, 158, 0.45)';
          ctx.fill();

          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#F9F8F4';
          ctx.stroke();

          if (node.isPrimary && isMatched && w > 420) {
            ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = 'rgba(28, 25, 23, 0.78)';
            ctx.fillText(node.label, px + 9, py + 3);
          }
        });

        // Update azimuth via DOM ref every 20 frames (no React state re-render!)
        if (frameCount % 20 === 0 && azimuthRef.current) {
          azimuthRef.current.textContent = `AZIMUTH ${Math.round((tick * 25) % 360)}° E`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCategory]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x: rx, y: ry };

    let closest: string | null = null;
    let minD = 0.09;
    ARCHIPELAGO_NODES.forEach((n) => {
      const d = Math.hypot(n.baseX - rx, n.baseY - ry);
      if (d < minD) {
        minD = d;
        closest = `${n.label} · ${n.region} (${n.category})`;
      }
    });
    if (closest && closest !== hoveredNode) setHoveredNode(closest);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[360px] sm:h-[420px] lg:h-[450px] rounded-2xl border border-stone-300/80 bg-[#F4F1EA]/90 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5"
    >
      <div className="relative z-10 flex items-center justify-between text-[11px] tracking-widest uppercase text-stone-500 font-medium border-b border-stone-300/60 pb-3">
        <span className="truncate pr-2">FIG. 02 · PETA KONSTELASI SANAD</span>
        <span ref={azimuthRef} className="font-mono tabular-nums shrink-0">AZIMUTH 0° E</span>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pt-3 border-t border-stone-300/60">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">
            Titik Simpul Aktif
          </p>
          <p className="text-xs sm:text-sm font-serif italic text-stone-900">
            {hoveredNode}
          </p>
        </div>

        {onSelectCategory && (
          <div className="flex flex-wrap items-center gap-1.5">
            {['Semua', 'Walisongo', 'Ulama Nusantara', 'Habaib'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-[#F9F8F4]'
                    : 'bg-[#F9F8F4]/80 text-stone-700 hover:bg-stone-200/80 border border-stone-300/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
