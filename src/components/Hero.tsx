import React from 'react';
import { Search, Zap, ShieldCheck, Award, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreClick: () => void;
  onQuickFilter: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onExploreClick,
  onQuickFilter,
}) => {
  const trendingTags = ['ChatGPT Plus', 'Canva Pro', 'Adobe CC', 'Cursor AI', 'ElevenLabs', 'Netflix 4K'];

  return (
    <section id="home" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyber Grid Lines subtle texture */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Eyebrow Badge (Matching screenshot) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-wide uppercase text-[11px]">#1 PREMIUM DIGITAL TOOLS RESELLER IN USA</span>
        </div>

        {/* Hero Title with Gradient (Matching screenshot) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.08] text-balance">
          <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            PREMIUM DIGITAL TOOLS
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 mb-8 font-normal leading-relaxed text-balance">
          Top Quality Tools for Creators, Marketers, Developers & Entrepreneurs in North America.
          Unlock <span className="text-white font-medium">ChatGPT Plus</span>, <span className="text-white font-medium">Canva Pro</span>, <span className="text-white font-medium">Adobe Creative Cloud</span>, <span className="text-white font-medium">Cursor AI</span>, <span className="text-white font-medium">CapCut</span>, <span className="text-white font-medium">Spotify</span>, and more instantly.
        </p>

        {/* Trust Badges Trio (Matching screenshot) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-9">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Access (<span className="text-cyan-400 font-semibold">&lt;180s</span>)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Safe & Private</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Full Duration Warranty</span>
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="mb-10">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>EXPLORE PRODUCTS</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
        </div>

        {/* Interactive Search Bar (Matching screenshot) */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for digital products, premium streaming, or editing keys..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none py-2 px-1"
            />

            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-sm shrink-0 cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Trending Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onQuickFilter(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 hover:text-cyan-400 text-slate-300 border border-slate-700/50 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
