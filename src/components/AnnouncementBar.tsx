import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

interface AnnouncementBarProps {
  customText?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ customText }) => {
  return (
    <aside aria-label="Special Offers" className="bg-gradient-to-r from-[#0a1120] via-[#0f172a] to-[#0a1120] border-b border-cyan-500/20 text-xs text-slate-300 py-2 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-2 text-cyan-400 font-medium tracking-wide">
          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>USA #1 TRUSTED DIGITAL TOOLS RESELLER</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3 text-center truncate">
          {customText ? (
            <span className="font-medium text-slate-200">{customText}</span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                All Subscriptions Instant & Active
              </span>
              <span className="text-slate-600 hidden sm:inline">✦</span>
              <span className="text-slate-300 hidden sm:inline">
                Use code <strong className="text-cyan-400 font-semibold tracking-wider">USA10</strong> for 10% OFF at checkout
              </span>
              <span className="text-slate-600 hidden md:inline">✦</span>
              <span className="text-emerald-400 font-medium hidden md:inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Replacement Warranty
              </span>
            </>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-400">
          <span>Delivery within <strong className="text-slate-200">60-180s</strong></span>
        </div>
      </div>
    </aside>
  );
};
