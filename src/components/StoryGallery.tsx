import React, { useState } from 'react';
import { Sparkles, Heart, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { weddingData, type GalleryPhoto } from '../data/weddingData';
import { SmartImage } from './SmartImage';

export const StoryGallery: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const photos = weddingData.photos.gallery;

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const prevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
  };

  const nextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
  };

  return (
    <section id="gallery-section" className="py-10 md:py-14 px-4 max-w-6xl mx-auto">
      
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

      {/* Gallery Grid */}
      <div className="columns-2 md:columns-3 gap-3 sm:gap-6">
  {photos.map((photo: GalleryPhoto, idx: number) => (
    <div
      key={photo.id}
      onClick={() => openLightbox(idx)}
      className="group relative mb-3 sm:mb-6 break-inside-avoid rounded-2xl overflow-hidden card-gradient-luxury p-1.5 sm:p-2 border border-[#d4af37]/35 shadow-sm hover:shadow-xl hover:border-[#936492] transition-all duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl">
        <SmartImage
          src={photo.url}
          alt={photo.caption}
          aspectRatio={photo.aspect}
          placeholderLabel={`gallery-${idx + 1}.jpg`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a172a]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
          <span className="text-xs font-serif italic text-[#f1df9d] flex items-center gap-1">
            <Heart className="w-3 h-3 fill-[#f1df9d]" />
            {photo.caption}
          </span>

          <span className="text-[9px] text-white/80 uppercase tracking-widest mt-0.5 flex items-center gap-1">
            <Eye className="w-2.5 h-2.5" />
            View full
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-3xl max-h-[85vh] flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[75vh]">
              <SmartImage
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].caption}
                aspectRatio="aspect-auto"
                placeholderLabel={`gallery-${activePhotoIndex + 1}.jpg`}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            
            <p className="mt-3 font-display italic text-base sm:text-xl text-[#f1df9d] text-center">
              "{photos[activePhotoIndex].caption}"
            </p>
          </div>

        </div>
      )}

    </section>
  );
};
