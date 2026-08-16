import React from 'react';
import { Heart, ArrowUp, Calendar } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { ModernLogo } from './ModernLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative text-white pt-6 pb-6 px-4 overflow-hidden border-t border-[#d4af37]/25"
      style={{
        backgroundImage: `url(${weddingData.footer.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Darkened Background Overlay */}
      <div className="absolute inset-0 bg-[#1e071d]/20" />

      {/* Subtle additional gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b0d2a]/60 via-[#1e071d]/70 to-[#120512]/95" />

      {/* Decorative Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#936492]/10 blur-3xl" />

      {/* Footer Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10">

        {/* Modern Monogram Logo */}
        <div className="mb-4 flex justify-center">
          <ModernLogo size="sm" animate={false} />
        </div>

        {/* Couple Names */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf6e2] font-normal tracking-wide drop-shadow-md">
          {weddingData.couple.groom.name}

          <span className="font-script text-3xl sm:text-4xl text-[#f1df9d] mx-2">
            &
          </span>

          {weddingData.couple.bride.name}
        </h3>

        {/* Date & Location */}
        <p className="mt-1 text-xs font-light text-[#f1df9d] tracking-widest uppercase flex items-center justify-center gap-1.5">
          <Calendar className="w-3 h-3" />

          {weddingData.footer.dateVenue}
        </p>

        {/* Hashtag */}
        <p className="mt-1 font-display italic text-sm text-white/70">
          {weddingData.couple.hashtag}
        </p>

        {/* Divider */}
        <div className="h-[1px] w-24 mx-auto my-5 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

        {/* Sibling Wish */}
        <p className="font-display italic text-sm sm:text-base text-[#fbf6e2]/90">
          With love & blessings, <span className="text-[#f1df9d]">Nived</span>
        </p>

        {/* Made with Love Note */}
        <div className="flex items-center justify-center gap-1 text-xs text-white/80 font-light mt-3">
          <span>Made with love</span>

          <Heart
            className="w-3.5 h-3.5 text-[#e06d91] fill-[#e06d91] animate-pulse"
          />

          <span>for our beloved family & friends</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="mt-5 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] transition-all cursor-pointer border border-white/10 backdrop-blur-sm"
        >
          <ArrowUp className="w-3 h-3" />
          Back to Top
        </button>

      </div>
    </footer>
  );
};