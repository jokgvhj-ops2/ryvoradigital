import React, { useState } from 'react';
import { Shield, KeyRound, Lock, X, Sparkles, AlertCircle } from 'lucide-react';
import { RyvoraLogo } from '../RyvoraLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes
    if (password.trim() === 'ryvora2026' || password.trim() === 'admin' || password.trim() === '1234') {
      setError('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid admin passcode. Try "ryvora2026" or click demo login.');
    }
  };

  const handleDemoUnlock = () => {
    setError('');
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl bg-[#090d16] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex justify-center mb-3">
            <RyvoraLogo size="sm" showText={false} />
          </div>

          <h3 className="text-xl font-extrabold text-white font-display">
            Ryvora Admin Console
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Restricted staff access for managing USA product catalog, orders, and license dispatching.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Passcode</span>
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="Enter passcode (e.g. ryvora2026)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            Authenticate & Open Console
          </button>

          <div className="relative my-4 text-center">
            <span className="text-[11px] text-slate-500 bg-[#090d16] px-2 relative z-10">
              or instant access
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoUnlock}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>1-Click Unlock (Admin Demo Mode)</span>
          </button>
        </form>

      </div>

    </div>
  );
};
