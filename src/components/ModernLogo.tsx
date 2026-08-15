import React from 'react';

interface ModernLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const ModernLogo: React.FC<ModernLogoProps> = ({
  size = 'md',
  className = '',
  animate = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', svg: 'w-10 h-10', text: 'text-xs' },
    md: { box: 'w-16 h-16', svg: 'w-16 h-16', text: 'text-base' },
    lg: { box: 'w-24 h-24', svg: 'w-24 h-24', text: 'text-2xl' },
    xl: { box: 'w-32 h-32', svg: 'w-32 h-32', text: 'text-4xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${currentSize.box} ${className}`}>
      
      {/* Outer Rotating Subtle Gold Ring */}
      <div
        className={`absolute inset-0 rounded-full border border-[#d4af37]/40 ${
          animate ? 'animate-[spin_20s_linear_infinite]' : ''
        }`}
        style={{
          borderStyle: 'dashed',
        }}
      />

      {/* Radiant Background Aura */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#936492] via-[#5c2a59] to-[#2b0d2a] shadow-[0_8px_25px_rgba(147,100,146,0.45)] border border-[#f1df9d]/60 flex items-center justify-center overflow-hidden">
        
        {/* Subtle Geometric Diamond Overlay */}
        <div className="absolute inset-2 border border-[#f1df9d]/25 rotate-45 transform pointer-events-none" />

        {/* Intertwined Modern Monogram (P & S) */}
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5 text-[#fbf6e2] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle floral laurel curves */}
          <path
            d="M 20 50 C 20 30, 35 18, 50 18 C 65 18, 80 30, 80 50 C 80 70, 65 82, 50 82 C 35 82, 20 70, 20 50 Z"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Letter P */}
          <path
            d="M 36 68 V 32 H 49 C 57 32, 60 38, 60 44 C 60 50, 57 56, 49 56 H 36"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter S (Intertwined) */}
          <path
            d="M 64 36 C 60 33, 53 32, 48 36 C 42 40, 44 48, 56 50 C 68 52, 69 61, 62 66 C 56 70, 47 69, 41 64"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Sparkle */}
          <circle cx="50" cy="50" r="1.5" fill="#f1df9d" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#fbf3c4" />
              <stop offset="100%" stopColor="#b38719" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
};
