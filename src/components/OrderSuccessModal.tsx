import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Download, ExternalLink, ShieldCheck, Mail, Sparkles, X } from 'lucide-react';
import { CustomerOrder, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  currency: CurrencyCode;
  onClose: () => void;
  onOpenChat: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  currency,
  onClose,
  onOpenChat,
}) => {
  if (!order) return null;

  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d16] border border-emerald-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-extrabold text-white font-display">
            Order Activated Successfully!
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Order Ref: <span className="font-mono text-cyan-400 font-bold">{order.orderId}</span>
          </p>
        </div>

        {/* Fast Delivery Notification Box */}
        <div className="mb-6 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
          <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Dispatched to {order.customerEmail}</span>
            Detailed instructions and password credentials have been emailed. Please also check your spam/promotions folder if not visible immediately.
          </div>
        </div>

        {/* Credentials / License Box */}
        {order.credentials && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Instant License Access Code:
              </span>
              <button
                onClick={() => handleCopy(order.credentials?.licenseKey || '')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-300 font-bold select-all tracking-wider break-all">
              {order.credentials.licenseKey}
            </div>

            <div className="mt-3 text-[11px] text-slate-400 space-y-1">
              <div>✓ Status: <strong className="text-emerald-400 font-medium">Activated & Verified</strong></div>
              <div>✓ Warranty: <strong className="text-slate-300 font-medium">Full Duration Replacement Protection</strong></div>
            </div>
          </div>
        )}

        {/* Purchased Items Summary */}
        <div className="mb-6 space-y-2">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Order Items:
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
              <div>
                <span className="font-bold text-white uppercase">{item.product.name}</span>
                <span className="text-slate-400 ml-2">({item.duration.replace('_', ' ')})</span>
              </div>
              <span className="font-bold text-emerald-400 tabular-nums">
                {formatPrice(item.priceUSD * item.quantity, currency)}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2 px-1 text-xs">
            <span className="text-slate-400">Total Paid ({order.paymentMethod})</span>
            <span className="font-extrabold text-white text-sm tabular-nums">
              {formatPrice(order.totalUSD, currency)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenChat();
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors cursor-pointer text-center"
          >
            Need Help? Open Live Agent
          </button>

          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer text-center shadow-md"
          >
            Return to Store
          </button>
        </div>

      </div>

    </div>
  );
};
