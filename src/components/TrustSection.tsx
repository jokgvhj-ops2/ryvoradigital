import React from 'react';
import { Zap, ShieldCheck, Headphones, CheckCircle } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="guarantees" className="py-16 bg-[#06080d] border-y border-slate-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 3 Pillar Feature Cards (Matching screenshot 12.50.07) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Instant Delivery */}
          <div className="p-6 rounded-2xl bg-[#0a0e17] border border-slate-800/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                INSTANT DELIVERY
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get your premium login credentials or group workspace invite links instantly after payment confirmation on your email.
              </p>
            </div>
          </div>

          {/* Card 2: 100% Safe & Secure */}
          <div className="p-6 rounded-2xl bg-[#0a0e17] border border-slate-800/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                100% SAFE & SECURE
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All accounts and keys are genuine enterprise-licensed and verified by Ryvora Digital. 100% private, no crack bugs, no data risks.
              </p>
            </div>
          </div>

          {/* Card 3: 24/7 Active Support */}
          <div className="p-6 rounded-2xl bg-[#0a0e17] border border-slate-800/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                24/7 ACTIVE USA SUPPORT
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ryvora support specialists are online across all US time zones. Got an issue? Get replacements and answers in under 15 minutes.
              </p>
            </div>
          </div>

        </div>

        {/* Big Numbers Banner (Matching screenshot 12.50.07) */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0d1322] via-[#0f172a] to-[#0d1322] border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            
            {/* Stat 1 */}
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-display tracking-tight mb-2 tabular-nums">
                4,850+
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                PERMANENT ACTIVE CLIENTS
              </div>
            </div>

            {/* Stat 2 */}
            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-3xl sm:text-5xl font-black text-purple-400 font-display tracking-tight mb-2 tabular-nums">
                28,400+
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                SUCCESSFUL DIGITAL SALES
              </div>
            </div>

            {/* Stat 3 */}
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-cyan-400 font-display tracking-tight mb-2 tabular-nums">
                100%
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                REPLACEMENT GUARANTEE
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
