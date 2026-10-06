import React from 'react';

interface RyvoraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const RyvoraLogo: React.FC<RyvoraLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  layout = 'horizontal',
}) => {
  // Dimensions
  const emblemSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 42, height: 42 },
    lg: { width: 56, height: 56 },
    xl: { width: 80, height: 80 },
  };

  const { width, height } = emblemSizes[size];

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${
        layout === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
    >
      {/* Emblem SVG inspired by r.jpg with metallic chrome R and cyber data trails */}
      <div className="relative group shrink-0">
        {/* Subtle cyan backglow */}
        <div className="absolute -inset-1 rounded-xl bg-cyan-500/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Metallic Silver Gradient */}
            <linearGradient id="ryvoraChrome" x1="15" y1="10" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Inner Shading */}
            <linearGradient id="ryvoraBevel" x1="30" y1="20" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Cyan Cyber Glow Gradients */}
            <linearGradient id="cyberTrail1" x1="50" y1="58" x2="95" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="cyberTrail2" x1="55" y1="68" x2="88" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="cyberTrail3" x1="65" y1="50" x2="98" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background rounded tech square */}
          <rect width="100" height="100" rx="20" fill="#0A0E17" stroke="#1E293B" strokeWidth="1.5" />

          {/* Stylized Modern Letter 'R' */}
          {/* Main Left Vertical Stem of R */}
          <path
            d="M 22 20 L 40 20 L 40 80 L 22 80 Z"
            fill="url(#ryvoraChrome)"
          />

          {/* Top Loop of R */}
          <path
            d="M 38 20 L 68 20 C 78 20 84 26 84 37 C 84 48 77 54 66 54 L 38 54 Z"
            fill="url(#ryvoraChrome)"
          />
          {/* Cutout inside loop */}
          <path
            d="M 40 32 L 64 32 C 70 32 72 34 72 37 C 72 40 70 42 64 42 L 40 42 Z"
            fill="#0A0E17"
          />

          {/* Right Diagonal Leg of R */}
          <path
            d="M 46 52 L 60 52 L 78 80 L 62 80 Z"
            fill="url(#ryvoraChrome)"
          />

          {/* Cyber Data Pixel Trails (Speed Packets) from R leg */}
          {/* Top Pixel Bar */}
          <rect x="66" y="47" width="22" height="4.5" rx="1.5" fill="url(#cyberTrail3)" filter="url(#neonGlow)" />
          {/* Middle Pixel Bar */}
          <rect x="52" y="56" width="36" height="5" rx="1.5" fill="url(#cyberTrail1)" filter="url(#neonGlow)" />
          {/* Lower Pixel Bar */}
          <rect x="58" y="66" width="24" height="4.5" rx="1.5" fill="url(#cyberTrail2)" filter="url(#neonGlow)" />
          {/* Detached packet dot */}
          <rect x="92" y="56" width="5" height="5" rx="1.5" fill="#00E5FF" filter="url(#neonGlow)" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center' : 'items-start'}`}>
          <div className="flex items-center tracking-tight font-extrabold text-white text-lg sm:text-xl font-display leading-none">
            <span>RYVOR</span>
            {/* Custom 'A' with cyan delta triangle cutout */}
            <span className="relative inline-flex items-center justify-center">
              <span>A</span>
              <span
                className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-cyan-400"
                aria-hidden="true"
              />
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] tracking-[0.26em] font-semibold text-cyan-400 uppercase leading-none">
              DIGITAL
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};
