import React, { useState } from 'react';
import { X, User, Key, CheckCircle, Shield, Copy, Check, LogOut, Sparkles } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  if (!isOpen) return null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const mockPurchasedLicenses = [
    {
      id: 'sub-1',
      name: 'ChatGPT Plus & Team (1-Year)',
      licenseKey: 'RYV-GPT4O-PRO-77491-US',
      status: 'Active',
      type: 'Private Dedicated Account',
      expiry: 'October 14, 2027',
      warranty: 'Full 1-Year Guarantee Active',
    },
    {
      id: 'sub-2',
      name: 'Adobe Creative Cloud All Apps',
      licenseKey: 'RYV-ADOBE-CC-99214-US',
      status: 'Active',
      type: 'Direct Team Seat',
      expiry: 'November 20, 2026',
      warranty: 'Active Warranty',
    },
  ];

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsLoggedIn(true);
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

        {!isLoggedIn ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <User className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-white font-display">
              Customer Portal Login
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Access your active digital software licenses, renewal dates, and warranty certificates.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Account / Checkout Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Send Instant Magic Link / Sign In
              </button>

              <div className="relative my-4 text-center">
                <span className="text-[11px] text-slate-500 bg-[#090d16] px-2 relative z-10">
                  or quick preview
                </span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEmailInput('us.creator@ryvora.com');
                  setIsLoggedIn(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In as Demo Customer</span>
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  {emailInput.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {emailInput}
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    Verified Customer (USA)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Your Active Licenses ({mockPurchasedLicenses.length})
            </h4>

            <div className="space-y-3 mb-6">
              {mockPurchasedLicenses.map((lic) => (
                <div key={lic.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase">{lic.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {lic.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-300">
                    <span className="truncate select-all">{lic.licenseKey}</span>
                    <button
                      onClick={() => handleCopy(lic.licenseKey)}
                      className="ml-2 text-slate-400 hover:text-white cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedKey === lic.licenseKey ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Valid until: <strong className="text-slate-200">{lic.expiry}</strong></span>
                    <span className="text-emerald-400 font-medium">{lic.warranty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer text-center"
              >
                Request Warranty Replacement
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
