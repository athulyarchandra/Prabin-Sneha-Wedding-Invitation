import React from 'react';
import { Sparkles, Clock, MapPin, Award } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const InvitationDetails: React.FC = () => {
  return (
    <section id="invitation-details" className="py-10 md:py-14 px-4 max-w-4xl mx-auto">
      
      {/* Royal Main Invitation Card Container */}
      <div className="relative card-gradient-luxury rounded-3xl p-6 sm:p-12 text-center overflow-hidden border-2 border-[#d4af37]/45 shadow-xl">
        
        {/* Subtle Decorative Floral Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#936492]/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#936492]/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#936492]/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#936492]/40 rounded-br-xl pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#936492]">
            The Invitation
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* Main Headline */}
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#3b1d3a] tracking-tight mb-2">
          Together with our families
        </h2>

        {/* Blessing Verse */}
        <div className="max-w-2xl mx-auto mb-6">
          <p className="font-display italic text-base sm:text-lg text-[#523d51] leading-relaxed">
            "{weddingData.couple.subtaglineTwo}"
          </p>
        </div>

        {/* Families Section: Groom's Family & Bride's Family */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 border-y border-[#936492]/20 py-6">
          
          {/* Groom's Family */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-white/90 to-[#f9f2f8] border border-[#936492]/20 shadow-xs hover:border-[#936492]/50 transition-all">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#936492] mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Groom's Family
            </span>
            <h3 className="font-serif text-xl sm:text-xl font-semibold text-[#3b1d3a]">
              {weddingData.couple.groom.parents}
            </h3>
            <p className="font-display italic text-xs sm:text-sm text-[#7a5979] mt-0.5">
              {weddingData.couple.groom.parentsSubtitle}
            </p>
            <div className="mt-2.5 px-3 py-0.5 rounded-full bg-[#f4ecf3] text-[10px] sm:text-[11px] font-semibold text-[#6e416d] border border-[#936492]/15">
              Son: {weddingData.couple.groom.name}
            </div>
          </div>

          {/* Bride's Family */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-white/90 to-[#f9f2f8] border border-[#936492]/20 shadow-xs hover:border-[#936492]/50 transition-all">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#936492] mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Bride's Family
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3b1d3a]">
              {weddingData.couple.bride.parents}
            </h3>
            <p className="font-display italic text-xs sm:text-sm text-[#7a5979] mt-0.5">
              {weddingData.couple.bride.parentsSubtitle}
            </p>
            <div className="mt-2.5 px-3 py-0.5 rounded-full bg-[#f4ecf3] text-[10px] sm:text-[11px] font-semibold text-[#6e416d] border border-[#936492]/15">
              Daughter: {weddingData.couple.bride.name}
            </div>
          </div>

        </div>

        {/* Date Highlight */}
        <div className="my-4">
          <span className="text-[11px] uppercase tracking-widest text-[#936492] font-semibold">
            We cordially invite you on
          </span>
          <div className="font-serif text-xl sm:text-2xl font-bold text-[#3b1d3a] mt-0.5 text-gold-gradient">
            {weddingData.date.formattedFull}
          </div>
        </div>

        {/* Timeline Events / Itinerary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {weddingData.events.map((event) => (
            <div
              key={event.id}
              className="p-5 rounded-2xl bg-gradient-to-br from-white/95 to-[#fbf5fa] border border-[#d4af37]/35 shadow-sm hover:border-[#936492] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#936492] bg-[#f4ecf3] px-2.5 py-0.5 rounded-full border border-[#936492]/20">
                    <Clock className="w-3 h-3 text-[#d4af37]" /> {event.time}
                  </span>
                  {event.dressCode && (
                    <span className="text-[10px] uppercase font-medium text-[#7a5979] bg-[#faf7f9] px-2 py-0.5 rounded border border-gray-200">
                      {event.dressCode}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-lg font-bold text-[#3b1d3a] mt-1">
                  {event.title}
                </h4>

                <p className="text-xs text-[#5c495b] leading-relaxed my-2">
                  {event.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-gray-100 flex items-start gap-2 text-xs text-[#422e41]">
                <MapPin className="w-3.5 h-3.5 text-[#936492] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[#2c1d2b]">{event.venue}</strong>
                  <span className="text-[11px] text-[#6d556c]">{event.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
