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
    sm: { box: 'w-10 h-10' },
    md: { box: 'w-16 h-16' },
    lg: { box: 'w-24 h-24' },
    xl: { box: 'w-32 h-32' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${currentSize.box} ${className}`}
    >
      {/* Soft ambient glow */}
      <div
        className={`absolute inset-0 rounded-full bg-[#936492]/35 blur-md ${
          animate ? 'animate-pulse [animation-duration:4s]' : ''
        }`}
      />

      {/* Elegant outer ring */}
      <div
        className={`absolute inset-0 rounded-full border border-[#d4af37]/50 ${
          animate ? 'animate-[spin_30s_linear_infinite]' : ''
        }`}
        style={{ borderStyle: 'dashed' }}
      />

      {/* Main circle */}
      <div className="absolute inset-[8%] rounded-full bg-linear-to-br from-[#936492] via-[#5c2a59] to-[#2b0d2a] shadow-[0_8px_25px_rgba(147,100,146,0.45)] border border-[#f1df9d]/50 flex items-center justify-center overflow-hidden">

        {/* Inner ring */}
        <div className="absolute inset-[9%] rounded-full border border-[#f1df9d]/25" />

        <svg
          viewBox="0 0 100 100"
          className="w-[82%] h-[82%]"
        >
          <defs>
            {/* Gold gradient */}
            <linearGradient
              id="psGold"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fff8dc" />
              <stop offset="35%" stopColor="#f1d77a" />
              <stop offset="65%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#a87912" />
            </linearGradient>

            {/* Soft text glow */}
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

{/* Centered monogram group */}
<g transform="translate(0, -5)">
  {/* P */}
  <text
    x="40"
    y="55"
    fontSize="43"
    fontStyle="italic"
    fontWeight="600"
    fill="url(#psGold)"
    textAnchor="middle"
    dominantBaseline="central"
    fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
    filter="url(#goldGlow)"
  >
    P
  </text>

  {/* S */}
  <text
    x="60"
    y="55"
    fontSize="43"
    fontStyle="italic"
    fontWeight="500"
    fill="#fff9e8"
    textAnchor="middle"
    dominantBaseline="central"
    fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
  >
    S
  </text>

</g>

          {/* Connecting flourish */}
          <path
            d="M29 67 C39 63, 48 70, 57 66 C65 63, 70 65, 74 69"
            fill="none"
            stroke="url(#psGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Tiny center diamond */}
          <path
            d="M50 76 L52 78 L50 80 L48 78 Z"
            fill="url(#psGold)"
          />

        </svg>
      </div>
    </div>
  );
};  