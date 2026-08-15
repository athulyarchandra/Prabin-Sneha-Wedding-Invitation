import React, { useState } from 'react';
import { Sparkles, Music, Volume2, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';
import { weddingData } from '../data/weddingData';
import { ModernLogo } from './ModernLogo';

interface EnvelopeCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ onOpen, isOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    romanticAudio.start();

    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  if (isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a0b19] via-[#331532] to-[#120512] p-4 transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-12 left-12 w-72 h-72 bg-[#936492]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Royal Card */}
      <div className="relative w-full max-w-md card-gradient-luxury rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] border-2 border-[#d4af37]/50 text-center overflow-hidden transition-all duration-500">
        
        {/* Subtle Gold Corner Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/70 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/70 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/70 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/70 rounded-br-lg pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center justify-center gap-2 text-[#936492] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#7a5979]">
            The Wedding Invitation
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* Couple Names */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#3b1d3a] tracking-tight font-normal">
          {weddingData.couple.groom.name}
          <span className="font-script text-4xl sm:text-5xl text-[#936492] mx-2">&</span>
          {weddingData.couple.bride.name}
        </h2>

        <p className="mt-1.5 text-xs font-medium text-[#7a5979] tracking-widest uppercase">
          {weddingData.date.formattedFull}
        </p>

        {/* Modern Interactive Monogram Wax Seal */}
        <div className="my-7 flex flex-col items-center justify-center">
          <div
            onClick={handleSealClick}
            className="group relative cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Glowing Pulse Aura */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#936492] to-[#d4af37] opacity-40 blur-md group-hover:opacity-75 transition duration-500 animate-pulse" />
            
            {/* Modern Monogram Emblem */}
            <ModernLogo size="xl" animate={true} />
          </div>

          <div className="mt-5 flex items-center gap-1.5 text-xs text-[#7a5979] animate-bounce">
            <Heart className="w-3.5 h-3.5 text-[#936492] fill-[#936492]" />
            <span className="font-semibold tracking-wide text-[#5c2a59]">Tap seal to open </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#936492]/20 pt-3 flex items-center justify-between text-[11px] text-[#8c748a]">
          <span className="flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> Sound on
          </span>
          <span className="italic font-medium">{weddingData.couple.hashtag}</span>
          <span className="flex items-center gap-1">
            <Music className="w-3.5 h-3.5 text-[#936492]" /> Ambient harp
          </span>
        </div>

      </div>
    </div>
  );
};
