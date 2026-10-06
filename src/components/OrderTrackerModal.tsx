import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, Mail, ShieldCheck, Key } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    // Simulated realistic order result
    setTrackedOrder({
      orderId: query.trim().toUpperCase().startsWith('RYV') ? query.trim().toUpperCase() : `RYV-84920-US`,
      email: query.includes('@') ? query.trim() : 'customer.access@gmail.com',
      status: 'DELIVERED & ACTIVE',
      product: 'ChatGPT Plus & Claude 3.5 Sonnet Enterprise',
      duration: '1 Year License',
      activatedAt: 'Today, 12:44 PM EST',
      warrantyExpires: 'October 2027',
      licenseKey: 'RYV-GPT4O-PRO-98421-US',
      supportStatus: 'Full Replacement Warranty Active',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl bg-[#090d16] border border-slate-800 p-6 sm:p-8 shadow-2xl z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <Search className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-extrabold text-white font-display">
            Track License Activation
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your Order ID (e.g. RYV-84920-US) or your checkout email address to view live credentials and warranty status.
          </p>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Order ID (RYV-...) or Email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Lookup
            </button>
          </div>
          <span className="text-[10px] text-slate-500 mt-1.5 block">
            Tip: Quick test? Type <code className="text-cyan-400 font-mono">RYV-10492</code> or your email.
          </span>
        </form>

        {/* Results Timeline */}
        {searched && trackedOrder && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Order Reference</span>
                <div className="font-mono text-sm font-bold text-cyan-400">{trackedOrder.orderId}</div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {trackedOrder.status}
              </span>
            </div>

            {/* Stepper */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1. Payment Verified via Stripe / USA Gateway</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2. Official Private License Allocated & Tested</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3. Dispatched to inbox: <strong className="text-cyan-300 font-mono">{trackedOrder.email}</strong></span>
              </div>
            </div>

            {/* License details */}
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1">
              <div><strong>Product:</strong> {trackedOrder.product} ({trackedOrder.duration})</div>
              <div><strong>Warranty Status:</strong> <span className="text-emerald-400">{trackedOrder.supportStatus}</span></div>
              <div className="p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-cyan-400 break-all mt-2 select-all">
                Key: {trackedOrder.licenseKey}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
