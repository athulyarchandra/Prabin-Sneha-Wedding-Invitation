import React from 'react';
import { MapPin, Navigation, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { SmartImage } from './SmartImage';

export const VenueDetails: React.FC = () => {
  const venue = weddingData.primaryVenue;

  const handleGetDirections = () => {
    window.open(venue.directionsUrl, '_blank');
  };

  return (
    <section id="venue-section" className="py-10 md:py-14 px-4 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#936492]">
            Location & Directions
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#3b1d3a] tracking-tight">
          {venue.heading}
        </h2>
        <p className="font-display italic text-sm sm:text-base text-[#6d556c] max-w-2xl mx-auto mt-1">
          {venue.description}
        </p>
      </div>

      {/* Side-by-Side Container with Modern Gradient */}
      <div className="card-gradient-luxury rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37]/35 shadow-xl overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Side 1: Auditorium Image */}
          <div className="flex flex-col justify-between">
            <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-[#936492]/20 bg-white">
              <SmartImage
                src={venue.image}
                alt={venue.name}
                aspectRatio="aspect-[16/10]"
                className="w-full h-full object-cover"
                placeholderLabel="auditorium-venue.jpg"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5 border border-white/20">
                <Building2 className="w-3 h-3 text-[#f1df9d]" />
                <span>Auditorium View</span>
              </div>
            </div>

            {/* Address Info Box */}
            <div className="mt-3 p-3.5 rounded-2xl bg-linear-to-br from-white/90 to-[#faf4f9] border border-[#936492]/15 flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#f4ecf3] flex items-center justify-center text-[#936492] shrink-0 border border-[#936492]/20 mt-0.5">
                <MapPin className="w-4 h-4 text-[#936492]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#3b1d3a]">
                  {venue.name}
                </h4>
                <p className="text-xs text-[#6e586d] mt-0.5">
                  {venue.address}
                </p>
                <span className="inline-block mt-1.5 text-[10px] font-bold text-[#936492] bg-[#f4ecf3] px-2.5 py-0.5 rounded-full border border-[#936492]/15">
                  Wedding Function: 12:00 PM - 3:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Side 2: Map & Navigation */}
          <div className="flex flex-col justify-between">
            <div className="relative w-full h-60 sm:h-70 rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-inner bg-[#f0eef0]">
              <iframe
                title="NAS Auditorium Location Map"
                src={venue.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#3b1d3a] shadow-xs border border-gray-200 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#936492]" /> Kumbidi, Kerala
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={handleGetDirections}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-linear-to-r from-[#936492] via-[#7e477d] to-[#5c355b] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#f1df9d]" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
