import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RotateCcw, Eye } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface ScratchItemProps {
  label: string;
  value: string;
  subLabel?: string;
  isRevealed: boolean;
  onRevealed: () => void;
}

const REVEAL_THRESHOLD = 0.5;
const BRUSH_RADIUS = 20;
const SAMPLE_STEP = 4;
const CARD_SIZE = 90; // fixed px — guarantees Day/Month/Year are identical

const MONTH_TO_NUMBER: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12',
};

const getMonthNumber = (monthName: string): string =>
  MONTH_TO_NUMBER[monthName.trim().toLowerCase()] ?? monthName;

const SingleScratchCard: React.FC<ScratchItemProps> = ({
  label,
  value,
  subLabel,
  isRevealed,
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);
  const rafPendingRef = useRef(false);

  // Longer values (e.g. a 4-digit year) get a smaller font so they
  // never clip inside the fixed-size card.
  const fontSizeClass = value.length >= 4 ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl';

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = CARD_SIZE;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Velvet plum base
    const base = ctx.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, '#3b1d3a');
    base.addColorStop(0.5, '#5c2f5a');
    base.addColorStop(1, '#2c122b');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    // Diagonal brushed-gold sweep
    const sweep = ctx.createLinearGradient(0, 0, size, size);
    sweep.addColorStop(0, 'rgba(212,175,55,0)');
    sweep.addColorStop(0.45, 'rgba(247,231,169,0.35)');
    sweep.addColorStop(0.55, 'rgba(212,175,55,0.55)');
    sweep.addColorStop(0.65, 'rgba(247,231,169,0.35)');
    sweep.addColorStop(1, 'rgba(212,175,55,0)');
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, size, size);

    // Fine gold flecks — foil texture, no text/labels on the canvas itself
    for (let i = 0; i < 130; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 0.9 + 0.3;
      ctx.fillStyle = `rgba(247, 231, 169, ${Math.random() * 0.35 + 0.1})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hairline gold border
    ctx.strokeStyle = 'rgba(247, 231, 169, 0.55)';
    ctx.lineWidth = 1.25;
    ctx.strokeRect(5, 5, size - 10, size - 10);

    // A single quiet monogram mark, centered — nothing else printed on the foil
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(247, 231, 169, 0.85)';
    ctx.font = '20px "Playfair Display", serif';
    ctx.fillText('✦', size / 2, size / 2 + 7);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      revealedRef.current = false;
      initCanvas();
    }
  }, [initCanvas, isRevealed]);

  const getPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const eraseTo = (point: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.lineWidth = BRUSH_RADIUS * 2;
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkClearedArea = () => {
    if (rafPendingRef.current || revealedRef.current) return;
    rafPendingRef.current = true;

    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d', { willReadFrequently: true });
      if (!canvas || !ctx) return;

      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;

      let cleared = 0;
      let total = 0;
      for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha < 30) cleared++;
          total++;
        }
      }

      if (total > 0 && cleared / total >= REVEAL_THRESHOLD && !revealedRef.current) {
        revealedRef.current = true;
        onRevealed();
      }
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const point = getPoint(e.clientX, e.clientY);
    lastPointRef.current = point;
    eraseTo(point);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || revealedRef.current || !lastPointRef.current) return;
    const point = getPoint(e.clientX, e.clientY);
    eraseTo(point);
    lastPointRef.current = point;
    checkClearedArea();
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkClearedArea();
  };

  return (
    <div className="flex flex-col items-center shrink-0">
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#7a5979] font-bold mb-1.5">
        {label}
      </span>

      {/* Fixed identical size for every card */}
      <div
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
        className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
          isRevealed
            ? 'border-[#d4af37]/70 shadow-[0_0_22px_-4px_rgba(212,175,55,0.55)]'
            : 'border-[#d4af37]/30 shadow-md'
        }`}
      >
        {/* Reveal layer sits underneath the canvas at all times.
            As destination-out clears the canvas, this shows through
            live — the digit is visible mid-scratch, not just at 100%. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-linear-to-b from-[#fdfaf6] via-white to-[#f6ecf5] select-none">
          <div
            className={`font-serif ${fontSizeClass} font-bold my-0.5 w-full px-1 leading-tight`}
            style={{
              backgroundImage: 'linear-gradient(180deg, #d4af37 0%, #8a5c3b 55%, #3b1d3a 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {value}
          </div>
          {subLabel && (
            <span className="text-[8px] sm:text-[10px] font-medium text-[#8c748a] w-full tracking-wide">
              {subLabel}
            </span>
          )}
        </div>

        {/* Scratchable foil on top */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            style={{ width: CARD_SIZE, height: CARD_SIZE }}
          />
        )}
      </div>
    </div>
  );
};

export const ScratchCardReveal: React.FC = () => {
  const [revealed, setRevealed] = useState<{ day: boolean; month: boolean; year: boolean }>({
    day: false,
    month: false,
    year: false,
  });

  const allRevealed = revealed.day && revealed.month && revealed.year;

  const triggerCelebration = () => {
    
  };

  const handleReveal = (field: 'day' | 'month' | 'year') => {
    setRevealed((prev) => {
      const next = { ...prev, [field]: true };
      if (next.day && next.month && next.year) triggerCelebration();
      return next;
    });
  };

  const revealAll = () => {
    setRevealed({ day: true, month: true, year: true });
    triggerCelebration();
  };

  const resetAll = () => setRevealed({ day: false, month: false, year: false });

  return (
    <section id="scratch-card-section" className="py-10 md:py-14 px-4 max-w-3xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#936492]">
          Reveal
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
      </div>

      <h2 className="font-serif text-2xl sm:text-4xl text-[#3b1d3a] font-normal mb-1">
        Scratch to Reveal Our Date
      </h2>
      <p className="font-display italic text-sm sm:text-base text-[#6d556c] max-w-md mx-auto mb-6">
        Rub each card gently to unlock the auspicious day.
      </p>

      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-6">
        <SingleScratchCard
          label="Day"
          value={weddingData.date.day}
          subLabel={weddingData.date.dayOfWeek}
          isRevealed={revealed.day}
          onRevealed={() => handleReveal('day')}
        />
        <SingleScratchCard
          label="Month"
          value={getMonthNumber(weddingData.date.month)}
          subLabel="Auspicious"
          isRevealed={revealed.month}
          onRevealed={() => handleReveal('month')}
        />
        <SingleScratchCard
          label="Year"
          value={weddingData.date.year}
          subLabel="Forever"
          isRevealed={revealed.year}
          onRevealed={() => handleReveal('year')}
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        {!allRevealed ? (
          <button
            onClick={revealAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-r from-[#936492] to-[#754474] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#f1df9d]" /> Reveal All Cards
          </button>
        ) : (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs text-[#7a5979] hover:text-[#936492] underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Scratch again
          </button>
        )}
      </div>
    </section>
  );
};