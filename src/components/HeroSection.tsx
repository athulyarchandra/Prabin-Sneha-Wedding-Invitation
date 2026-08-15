import React, { useState } from 'react';
import { ChevronDown, Sparkles, Calendar, MapPin, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { ModernLogo } from './ModernLogo';

export const HeroSection: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const scrollToNext = () => {
    const el = document.getElementById('scratch-card-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-between text-center px-4 py-8 md:py-12 overflow-hidden">
      
      {/* Background Cinematic Photo with Luxury Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={weddingData.photos.hero}
          alt={`${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}`}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-1000 transform scale-105 ${
            imgLoaded ? 'opacity-85 filter brightness-95' : 'opacity-0'
          }`}
        />

        {/* Fallback pattern if image is loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1029] via-[#4d234c] to-[#1a0819]" />
        )}

        {/* Multi-layered Cinematic Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0819]/10 via-[#2a1029]/65 to-[#faf6f9] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(26,8,25,0.75)_100%)] pointer-events-none" />
      </div>

      {/* Top Header Badge & Monogram */}
      <div className="relative z-10 flex flex-col items-center animate-fadeIn pt-2">
        
        {/* Modern Monogram Emblem */}
        <div className="mb-3">
          <ModernLogo size="md" animate={false} />
        </div>

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-[#f1df9d]/40 shadow-lg text-white">
          <Sparkles className="w-3.5 h-3.5 text-[#f1df9d]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#fbf6e2]">
            The Wedding Invitation
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#f1df9d]" />
        </div>
      </div>

      {/* Main Center Content: Haute-Couture Typography */}
      <div className="relative z-10 max-w-3xl mx-auto my-auto py-6 animate-fadeIn">
        
        <p className="font-serif italic text-base sm:text-lg text-[#f1df9d] tracking-wider mb-2 drop-shadow-md">
          {weddingData.couple.tagline}
        </p>

        {/* Couple Names */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {weddingData.couple.groom.name}
          <span className="block sm:inline font-script text-6xl sm:text-8xl md:text-9xl text-[#f1df9d] font-normal mx-3 my-1 sm:my-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            &
          </span>
          {weddingData.couple.bride.name}
        </h1>

        {/* Date & Location Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white/95">
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            <Calendar className="w-3.5 h-3.5 text-[#f1df9d]" />
            {weddingData.date.formattedFull}
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#f1df9d]" />
            Kerala, India
          </span>
        </div>

        {/* Subtitle Blessings Verse */}
        <p className="mt-6 font-display italic text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md px-4">
          "{weddingData.couple.subtagline}"
        </p>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 pb-2">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-1 text-white/90 hover:text-white transition-all cursor-pointer group"
          aria-label="Scroll to date reveal"
        >
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#936492]/80 backdrop-blur-md border border-[#f1df9d]/50 text-xs font-semibold uppercase tracking-widest text-[#fbf6e2] shadow-lg group-hover:bg-[#936492] transition-all">
            <Heart className="w-3 h-3 text-[#f1df9d] fill-[#f1df9d]" />
            <span>Scratch To Reveal Date</span>
          </div>
          <ChevronDown className="w-5 h-5 text-[#f1df9d] animate-bounce mt-1" />
        </button>
      </div>

    </section>
  );
};
