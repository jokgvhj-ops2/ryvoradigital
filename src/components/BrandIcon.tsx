import React from 'react';

interface BrandIconProps {
  id: string;
  name: string;
  brandColor?: string;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  id,
  name,
  brandColor = '#1e293b',
  className = 'w-12 h-12',
}) => {
  // Render authentic SVG logos matching user screenshot
  switch (id) {
    case 'chatgpt-plus':
      return (
        <div className={`${className} rounded-2xl bg-[#10a37f] flex items-center justify-center p-2.5 shadow-lg shadow-emerald-950/40 shrink-0 border border-emerald-400/30`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4v1.5a4 4 0 0 1 3.5 2.5 4 4 0 0 1-.5 4.5 4 4 0 0 1 1 4 4 4 0 0 1-3.5 3.5 4 4 0 0 1-4.5-.5 4 4 0 0 1-4 1 4 4 0 0 1-3.5-3.5 4 4 0 0 1 .5-4.5 4 4 0 0 1-1-4 4 4 0 0 1 3.5-3.5 4 4 0 0 1 4.5.5V6a4 4 0 0 1 4-4z" fill="#0b7458" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        </div>
      );

    case 'claude-pro':
      return (
        <div className={`${className} rounded-2xl bg-[#d97706] flex items-center justify-center p-2.5 shadow-lg shadow-amber-950/40 shrink-0 border border-amber-400/30`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="2.5" fill="white" stroke="none" />
          </svg>
        </div>
      );

    case 'canva-pro':
      return (
        <div className={`${className} rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] flex items-center justify-center p-2 shadow-lg shrink-0 border border-cyan-400/40`}>
          <span className="text-white font-black text-xs tracking-tighter italic font-display select-none">
            Canva
          </span>
        </div>
      );

    case 'adobe-creative-cloud':
      return (
        <div className={`${className} rounded-2xl bg-gradient-to-br from-[#FA0F00] to-[#b30b00] flex items-center justify-center p-2 shadow-lg shadow-red-950/40 shrink-0 border border-red-500/40`}>
          <span className="text-white font-black text-base tracking-tighter font-display select-none">
            Cc
          </span>
        </div>
      );

    case 'cursor-ai':
      return (
        <div className={`${className} rounded-2xl bg-[#090d16] flex items-center justify-center p-2.5 shadow-lg shrink-0 border border-cyan-400/50 shadow-cyan-950/30`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <polygon points="12,2 22,8 22,18 12,22 2,18 2,8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="12,2 22,8 12,14 2,8" fill="#38bdf8" fillOpacity="0.4" />
            <line x1="12" y1="14" x2="12" y2="22" stroke="#38bdf8" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'elevenlabs-pro':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-slate-700`}>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-6 bg-white rounded-full" />
            <div className="w-1.5 h-6 bg-white rounded-full" />
          </div>
        </div>
      );

    case 'capcut-pro':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-slate-700`}>
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <path d="M3 6l9 6-9 6V6zm18 0l-9 6 9 6V6z" />
          </svg>
        </div>
      );

    case 'midjourney-pro':
      return (
        <div className={`${className} rounded-2xl bg-[#0a0f1d] flex items-center justify-center p-2.5 shadow-lg shrink-0 border border-blue-500/30`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="w-full h-full">
            <path d="M2 17l10 5 10-5M12 2l10 5-10 5-10-5 10-5zM2 12l10 5 10-5" />
          </svg>
        </div>
      );

    case 'figma-pro':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-purple-500/30`}>
          <svg viewBox="0 0 38 57" className="w-6 h-9">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
          </svg>
        </div>
      );

    case 'google-ai-pro':
      return (
        <div className={`${className} rounded-2xl bg-[#0a1428] flex items-center justify-center p-2.5 shadow-lg shrink-0 border border-blue-500/40`}>
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="geminiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="50%" stopColor="#9B72CF" />
                <stop offset="100%" stopColor="#1967D2" />
              </linearGradient>
            </defs>
            <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" fill="url(#geminiGrad)" />
          </svg>
        </div>
      );

    case 'heygen-creator':
      return (
        <div className={`${className} rounded-2xl bg-[#7c3aed] flex items-center justify-center p-2 shadow-lg shrink-0 border border-purple-400/40`}>
          <span className="text-white font-black text-xs tracking-tight font-display">
            HeyGen
          </span>
        </div>
      );

    case 'kling-ai':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-emerald-500/40`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 flex items-center justify-center p-1">
            <div className="w-3.5 h-3.5 rounded-full bg-black" />
          </div>
        </div>
      );

    case 'leonardo-ai':
      return (
        <div className={`${className} rounded-2xl bg-[#1a0826] flex items-center justify-center p-2 shadow-lg shrink-0 border border-pink-500/40`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" className="w-6 h-6">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#ec4899" fillOpacity="0.3" />
          </svg>
        </div>
      );

    case 'linkedin-premium':
      return (
        <div className={`${className} rounded-2xl bg-[#0a66c2] flex items-center justify-center p-2 shadow-lg shrink-0 border border-blue-400/30`}>
          <span className="text-white font-black text-lg tracking-tighter select-none font-sans">
            in
          </span>
        </div>
      );

    case 'coursera-plus':
      return (
        <div className={`${className} rounded-2xl bg-[#0056d2] flex items-center justify-center p-2 shadow-lg shrink-0 border border-blue-400/30`}>
          <span className="text-white font-extrabold text-base tracking-tighter select-none">
            C
          </span>
        </div>
      );

    case 'microsoft-365':
      return (
        <div className={`${className} rounded-2xl bg-[#0d1117] flex items-center justify-center p-2 shadow-lg shrink-0 border border-orange-500/30`}>
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-[#f25022] rounded-xs" />
            <div className="bg-[#7fba00] rounded-xs" />
            <div className="bg-[#00a4ef] rounded-xs" />
            <div className="bg-[#ffb900] rounded-xs" />
          </div>
        </div>
      );

    case 'netflix-4k':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-red-600/40`}>
          <span className="text-[#e50914] font-black text-2xl tracking-tighter select-none font-sans drop-shadow-md">
            N
          </span>
        </div>
      );

    case 'spotify-premium':
      return (
        <div className={`${className} rounded-2xl bg-[#1db954] flex items-center justify-center p-2.5 shadow-lg shadow-emerald-950/40 shrink-0 border border-emerald-300/40`}>
          <svg viewBox="0 0 24 24" fill="black" className="w-full h-full">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.747-.468-.077-.335.132-.67.467-.747 3.808-.87 7.076-.502 9.723 1.115.294.18.386.562.207.856zm1.224-2.72c-.226.368-.71.485-1.078.26-2.69-1.653-6.79-2.133-9.972-1.168-.413.125-.85-.11-.975-.523-.125-.413.11-.85.523-.975 3.633-1.103 8.147-.567 11.242 1.328.368.226.485.71.26 1.078zm.106-2.835C14.692 8.95 9.218 8.77 6.037 9.736c-.494.15-1.02-.128-1.17-.622-.15-.494.128-1.02.622-1.17 3.654-1.108 9.69-.904 13.432 1.316.444.263.59.84.327 1.284-.263.444-.84.59-1.284.327z" />
          </svg>
        </div>
      );

    case 'nordvpn-surfshark':
      return (
        <div className={`${className} rounded-2xl bg-[#0047cc] flex items-center justify-center p-2.5 shadow-lg shrink-0 border border-blue-400/30`}>
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <polygon points="12 4 4 18 20 18" fill="#ffffff" />
            <polygon points="12 9 8 18 16 18" fill="#0047cc" />
          </svg>
        </div>
      );

    case 'tradingview-premium':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-blue-500/40`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#2962ff" strokeWidth="2.5" className="w-full h-full">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
      );

    case 'vidiq-max':
      return (
        <div className={`${className} rounded-2xl bg-[#0066ff] flex items-center justify-center p-2 shadow-lg shrink-0 border border-blue-400/30`}>
          <span className="text-white font-black text-sm tracking-tighter select-none font-sans">
            vidIQ
          </span>
        </div>
      );

    case 'super-grok':
      return (
        <div className={`${className} rounded-2xl bg-black flex items-center justify-center p-2 shadow-lg shrink-0 border border-slate-700`}>
          <span className="text-white font-black text-lg select-none font-mono">
            /
          </span>
        </div>
      );

    case 'perplexity-pro':
      return (
        <div className={`${className} rounded-2xl bg-[#0f172a] flex items-center justify-center p-2 shadow-lg shrink-0 border border-cyan-400/40`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#22b8cd" strokeWidth="2" className="w-full h-full">
            <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
          </svg>
        </div>
      );

    case 'github-copilot':
      return (
        <div className={`${className} rounded-2xl bg-[#1e1e2e] flex items-center justify-center p-2 shadow-lg shrink-0 border border-purple-500/40`}>
          <svg viewBox="0 0 24 24" fill="#a855f7" className="w-full h-full">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        </div>
      );

    case 'envato-elements':
      return (
        <div className={`${className} rounded-2xl bg-[#82b440] flex items-center justify-center p-2 shadow-lg shrink-0 border border-lime-400/30`}>
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V7h2v4z" />
          </svg>
        </div>
      );

    case 'grammarly-premium':
      return (
        <div className={`${className} rounded-2xl bg-[#15c39a] flex items-center justify-center p-2 shadow-lg shrink-0 border border-emerald-400/30`}>
          <span className="text-white font-black text-lg select-none">
            G
          </span>
        </div>
      );

    case 'surfshark-vpn':
      return (
        <div className={`${className} rounded-2xl bg-[#1cd1a1] flex items-center justify-center p-2 shadow-lg shrink-0 border border-teal-300/30`}>
          <span className="text-slate-950 font-black text-lg select-none font-sans">
            S
          </span>
        </div>
      );

    default:
      return (
        <div
          className={`${className} rounded-2xl flex items-center justify-center font-extrabold text-white text-base shadow-md shrink-0 border border-white/10`}
          style={{ backgroundColor: brandColor }}
        >
          {name.substring(0, 2).toUpperCase()}
        </div>
      );
  }
};
