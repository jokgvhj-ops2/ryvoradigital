import React, { useState } from 'react';
import { RyvoraLogo } from './RyvoraLogo';
import { MessageSquare, Send, ShieldCheck, Mail, ArrowUpRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (policy: 'refund' | 'terms' | 'privacy' | 'delivery') => void;
  onOpenChat: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onOpenChat,
  onOpenTracker,
  onOpenAdmin,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#05070c] border-t border-slate-900 text-slate-300">
      
      {/* Community Section (Matching screenshot 12.50.17) */}
      <div className="border-b border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-center bg-[#070a12]">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold text-cyan-400 tracking-[0.25em] uppercase block mb-2 font-mono">
            JOIN THE SQUAD
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-display mb-6 tracking-tight">
            JOIN OUR ACTIVE COMMUNITY
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>VIP Live Chat (Proofs & Updates)</span>
            </button>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span className="text-indigo-400 font-bold">#</span>
              <span>Discord Community (@ryvoradigital)</span>
            </a>

            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Telegram Alerts Channel</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Layout (Matching screenshot 12.50.17) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <RyvoraLogo size="md" showText={true} />
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted, one-stop digital boutique for premium subscriptions, streaming slots, design licenses, and next-generation AI platforms in North America. Guaranteed delivery with active support.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenChat}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
                title="Live Concierge Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <a
                href="mailto:support@ryvoradigital.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-cyan-400" />
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-slate-600" /> Home Page
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-slate-600" /> Store / All 32 Products
                </a>
              </li>
              <li>
                <a href="#proofs" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-slate-600" /> Verified Customer Reviews
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <ArrowUpRight className="w-3 h-3 text-slate-600" /> Order Lookup & Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <ArrowUpRight className="w-3 h-3 text-slate-600" /> Contact Support Team (24/7)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-left cursor-pointer font-semibold"
                >
                  <ArrowUpRight className="w-3 h-3 text-cyan-500" /> 🛡️ Admin Console (Staff)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-purple-400" />
              CUSTOMER POLICIES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenPolicy('delivery')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" /> How to Order / Instant Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" /> Refund & Replacement Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" /> General Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" /> Privacy & Zero-Log Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-emerald-400" />
              NEWSLETTER
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Subscribe to get instant alerts on coupon drops, stock refreshes, and seasonal discount packages.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                SUBSCRIBE
              </button>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Code "USA10" sent! Enjoy 10% off.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer (Matching screenshot 12.50.17) */}
      <div className="border-t border-slate-900/90 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div>
            © 2026 Ryvora Digital LLC. All Rights Reserved. Crafted for North America's Creators & Developers.
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              Theme: <strong className="text-cyan-400">Dim Slate</strong>
            </span>
          </div>

          {/* Accepted USA Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-500">SECURE PAYMENTS:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold">Visa</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold">Apple Pay</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold">PayPal</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-semibold">Crypto USDT</span>
          </div>

        </div>
      </div>

    </footer>
  );
};
