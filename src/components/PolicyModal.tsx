import React from 'react';
import { X, ShieldCheck, RefreshCw, FileText, Lock } from 'lucide-react';

interface PolicyModalProps {
  policy: 'refund' | 'terms' | 'privacy' | 'delivery' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  const contentMap = {
    refund: {
      title: 'Full Replacement Warranty & Refund Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At <strong className="text-white">Ryvora Digital</strong>, customer trust is our highest priority. Every subscription and license key purchased through our platform is backed by our full-duration guarantee.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">1. Instant Replacement Guarantee</h4>
          <p>
            If any digital workspace, login credential, or API access experiences downtime, lockout, or unexpected cancellation during your active subscription period, our automated system or live US support team will issue a fresh replacement within 15 minutes.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">2. Money-Back Guarantee</h4>
          <p>
            If we are unable to resolve or replace an issue within 24 hours, you are entitled to a 100% full refund to your original payment method (Stripe Credit Card, Apple Pay, PayPal, or Crypto).
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">3. How to File a Claim</h4>
          <p>
            Simply open the 24/7 Live Concierge chat on this website or email <span className="text-cyan-400">support@ryvoradigital.com</span> with your Order Reference ID. No complex paperwork or waiting days for approval.
          </p>
        </div>
      ),
    },
    delivery: {
      title: 'Instant Automated Digital Delivery System',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            We know you need tools immediately for client work and deadlines. That is why our digital provisioning pipeline is completely automated.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">1. Average Delivery Speed: 60 - 180 Seconds</h4>
          <p>
            Once your payment is authorized via our secure US gateway, the system automatically allocates your dedicated credentials or dispatches the official workspace invite to your submitted email address.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">2. Two Delivery Methods Available</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Dedicated Private Account:</strong> You receive a clean private email and secure password with 2FA setup guide. Only you have access.</li>
            <li><strong>Personal Email Upgrade:</strong> For tools like Canva Pro and Figma Pro, we send a direct official team link that upgrades your existing personal account without losing your saved projects or brand kits.</li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: 'General Terms & Conditions of Service',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            By purchasing and utilizing services provided by Ryvora Digital LLC, you agree to adhere to standard software usage standards.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">1. Dedicated & Private Use</h4>
          <p>
            Accounts provided as "Private" are intended strictly for your personal or authorized business team usage. Reselling or distributing credentials to unauthorized third parties without permission will void warranty coverage.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">2. Compliance & Ethics</h4>
          <p>
            All AI tools, image generators, and developer environments must be operated according to platform Acceptable Use Policies. No illegal activities or abusive automation scripts that trigger automated IP blocks.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy & Zero-Log Promise',
      icon: Lock,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Ryvora Digital respects your digital anonymity and confidentiality. We only collect the minimal information necessary to deliver your digital licenses and provide warranty tracking.
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">1. Payment Data Security</h4>
          <p>
            We never store customer credit card numbers or banking secrets on our servers. All transactions are processed through tokenized, Level 1 PCI-DSS certified payment processors (Stripe, Apple Pay, PayPal).
          </p>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">2. Zero Telemetry & No Spam</h4>
          <p>
            We do not sell your personal data or email to brokers. You will only receive order receipts and critical warranty renewal notifications.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[policy];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#090d16] border border-slate-800 p-6 sm:p-8 shadow-2xl z-10">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            {current.title}
          </h3>
        </div>

        {current.body}

        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Close & Understand
          </button>
        </div>

      </div>

    </div>
  );
};
