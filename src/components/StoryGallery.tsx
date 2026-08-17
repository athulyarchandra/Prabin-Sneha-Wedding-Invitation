import React, { useState } from 'react';
import { Sparkles, Heart, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { weddingData, type GalleryPhoto } from '../data/weddingData';
import { SmartImage } from './SmartImage';

const SprocketRow: React.FC<{ count?: number }> = ({ count = 26 }) => (
  <div className="flex justify-between px-3">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-[#f4ecf3]/25 shrink-0" />
    ))}
  </div>
);

const CornerBracket: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotations: Record<string, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 -scale-x-100',
    bl: 'bottom-0 left-0 -scale-y-100',
    br: 'bottom-0 right-0 -scale-x-100 -scale-y-100',
  };
  return (
    <svg
      viewBox="0 0 44 44"
      className={`absolute w-8 h-8 sm:w-10 sm:h-10 ${rotations[position]} pointer-events-none z-10`}
      fill="none"
    >
      <path d="M2 22V6a4 4 0 0 1 4-4h16" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="2" cy="2" r="2" fill="#d4af37" />
    </svg>
  );
};

export const StoryGallery: React.FC = () => {
  const photos = weddingData.photos.gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fading, setFading] = useState(false);

  const active: GalleryPhoto = photos[activeIndex];

  const goTo = (idx: number) => {
    if (idx === activeIndex) return;
    setFading(true);
    window.setTimeout(() => {
      setActiveIndex(idx);
      setFading(false);
    }, 220);
  };

  const step = (delta: number) => {
    goTo((activeIndex + delta + photos.length) % photos.length);
  };

  return (
    <section id="gallery-section" className="py-10 md:py-14 px-4 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#936492]">
            Our Story in Frames
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#3b1d3a] tracking-tight">
          Moments we cherish
        </h2>
        <p className="font-display italic text-sm sm:text-base text-[#6d556c] max-w-md mx-auto mt-1">
          Glimpses of laughter, stolen glances, and our journey to forever.
        </p>
      </div>

      {/* Spotlight stage */}
      <div className="relative mx-auto max-w-md sm:max-w-lg">
        <div className="relative rounded-2xl p-2 sm:p-3 card-gradient-luxury border border-[#d4af37]/40 shadow-xl">
          <div className="relative rounded-xl overflow-hidden bg-[#2a172a]">
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />

            <div
              onClick={() => setLightboxOpen(true)}
              className={`cursor-pointer transition-all duration-300 ease-out ${
                fading ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
              }`}
            >
              <SmartImage
                src={active.url}
                alt={active.caption}
                aspectRatio="aspect-[4/5]"
                placeholderLabel={`gallery-${activeIndex + 1}.jpg`}
              />
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="View fullscreen"
            >
              <Expand className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => step(-1)}
          className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 p-2 rounded-full bg-white shadow-md border border-[#d4af37]/30 text-[#936492] hover:text-[#3b1d3a] hover:scale-105 transition-all cursor-pointer"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => step(1)}
          className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 p-2 rounded-full bg-white shadow-md border border-[#d4af37]/30 text-[#936492] hover:text-[#3b1d3a] hover:scale-105 transition-all cursor-pointer"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Caption + counter */}
        <div
          className={`text-center mt-4 px-6 transition-opacity duration-300 ease-out ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="font-display italic text-sm sm:text-lg text-[#5c355b] flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 fill-[#936492] text-[#936492] shrink-0" />
            {active.caption}
          </p>
          <span className="block mt-1 text-[10px] font-mono tracking-widest text-[#936492]/70">
            {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Film strip */}
      <div className="mt-6 rounded-xl bg-linear-to-b from-[#2a172a] to-[#3b1d3a] py-2 shadow-inner">
        <SprocketRow />
       <div className="flex gap-2 overflow-x-auto px-4 py-2.5 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => goTo(idx)}
              className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden snap-start transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'ring-2 ring-[#d4af37] scale-105'
                  : 'ring-1 ring-white/15 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <SmartImage
                src={photo.url}
                alt={photo.caption}
                aspectRatio="aspect-square"
                placeholderLabel={`gallery-${idx + 1}.jpg`}
              />
            </button>
          ))}
        </div>
        <SprocketRow />
      </div>

      {/* Fullscreen lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[75vh]">
              <SmartImage
                src={active.url}
                alt={active.caption}
                aspectRatio="aspect-auto"
                placeholderLabel={`gallery-${activeIndex + 1}.jpg`}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <p className="mt-3 font-display italic text-base sm:text-xl text-[#f1df9d] text-center">
              {active.caption}
            </p>
          </div>
        </div>
      )}

    </section>
  );
};