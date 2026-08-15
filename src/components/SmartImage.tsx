import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  placeholderLabel?: string;
  onClick?: () => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-auto',
  placeholderLabel,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getResolvedSrc = (url: string) => {
    if (!url || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }
    const base = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    if (url.startsWith(base)) {
      return url;
    }
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    return `${base}${cleanPath}`;
  };

  const resolvedSrc = getResolvedSrc(src);
  const filename = src.split('/').pop() || 'photo.jpg';
  const label = placeholderLabel || filename;

  if (hasError) {
    return (
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-[#936492]/35 bg-gradient-to-br from-[#936492]/10 via-[#f4ecf3] to-[#e8d5b5]/30 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#936492] hover:bg-[#936492]/15 ${aspectRatio} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/80 shadow-md flex items-center justify-center text-[#936492] mb-3 border border-[#936492]/20">
          <Camera className="w-6 h-6" />
        </div>
        <span className="font-serif text-sm font-semibold text-[#5c355b] max-w-[200px] truncate">
          {alt}
        </span>
        <span className="mt-1 text-xs font-mono text-[#936492]/80 bg-white/60 px-2.5 py-0.5 rounded-full border border-[#936492]/15">
          {label}
        </span>
        <span className="mt-2 text-[11px] text-[#7a5979] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#d4af37]" /> Place in <code className="font-mono bg-white/70 px-1 rounded">/public/images/</code>
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${aspectRatio} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-[#f4ecf3] animate-pulse flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#936492]/40 animate-spin" />
        </div>
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
