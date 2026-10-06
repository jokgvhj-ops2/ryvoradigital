import React, { useState } from 'react';
import { X, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product, PlanDuration, AccountType, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { BrandIcon } from './BrandIcon';

interface ProductDetailModalProps {
  product: Product | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart: (product: Product, duration: PlanDuration, accountType: AccountType, price: number) => void;
  onBuyNow: (product: Product, duration: PlanDuration, accountType: AccountType, price: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>('1_month');
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>(
    product.allowedAccountTypes[0] || 'private_account'
  );

  // Variant options for plan duration
  const durationOptions: { id: PlanDuration; label: string; multiplier: number; discountBadge?: string }[] = [
    { id: '1_month', label: '1 Month', multiplier: 1 },
    { id: '3_months', label: '3 Months', multiplier: 2.7, discountBadge: 'Save 10%' },
    { id: '6_months', label: '6 Months', multiplier: 5.0, discountBadge: 'Save 17%' },
    { id: '1_year', label: '1 Year License', multiplier: 9.0, discountBadge: 'Save 25%' },
  ];

  const currentDuration = durationOptions.find((d) => d.id === selectedDuration) || durationOptions[0];
  const calculatedPriceUSD = Number((product.priceUSD * currentDuration.multiplier).toFixed(2));
  const calculatedRetailUSD = Number(
    (
      product.retailPriceUSD *
      (currentDuration.id === '1_year' ? 12 : currentDuration.id === '6_months' ? 6 : currentDuration.id === '3_months' ? 3 : 1)
    ).toFixed(2)
  );

  const accountTypeLabels: Record<AccountType, { title: string; subtitle: string; tag: string }> = {
    private_account: {
      title: 'Private Dedicated Account',
      subtitle: 'Exclusive login credentials for you alone',
      tag: '100% Private',
    },
    workspace_invite: {
      title: 'Upgrade Your Personal Email',
      subtitle: 'Official team/workspace invite on your email',
      tag: 'On Your Email',
    },
    dedicated_profile: {
      title: 'Dedicated Screen / Profile (PIN Locked)',
      subtitle: 'Ultra HD 4K screen slot with personalized PIN',
      tag: 'Private PIN',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Card - Responsive bottom-sheet on mobile, centered dialog on sm+ */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0b0f19] border border-slate-700/80 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300">
        
        {/* Mobile Pull-down bar indicator */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Modal Header */}
        <div className="relative flex items-start gap-3.5 p-4 sm:p-6 border-b border-slate-800/80 bg-slate-900/40">
          <BrandIcon
            id={product.id}
            name={product.name}
            brandColor={product.brandColor}
            className="w-12 h-12 sm:w-16 sm:h-16 shrink-0"
          />

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                {product.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight truncate">
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 line-clamp-1">
              {product.tagline}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content Body: Clean Description + Variants Only */}
        <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 space-y-5 text-slate-200">
          
          {/* 1. Description */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product Description
            </label>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </div>
          </div>

          {/* 2. Duration Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Plan Duration Variant
              </label>
              {currentDuration.discountBadge && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {currentDuration.discountBadge}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {durationOptions.map((opt) => {
                const isSelected = selectedDuration === opt.id;
                const optPriceUSD = (product.priceUSD * opt.multiplier).toFixed(2);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedDuration(opt.id)}
                    className={`relative p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-cyan-300 tabular-nums">
                      {formatPrice(Number(optPriceUSD), currency)}
                    </div>
                    {opt.discountBadge && (
                      <div className="text-[9px] text-emerald-400 font-semibold mt-1">
                        {opt.discountBadge}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Account Type Variants (if multiple options available) */}
          {product.allowedAccountTypes.length > 0 && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Account Variant
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {product.allowedAccountTypes.map((typeKey) => {
                  const isSelected = selectedAccountType === typeKey;
                  const info = accountTypeLabels[typeKey] || {
                    title: typeKey.replace('_', ' ').toUpperCase(),
                    subtitle: 'Full access variant',
                    tag: 'Active',
                  };

                  return (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => setSelectedAccountType(typeKey)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-white">{info.title}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30">
                          {info.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {info.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Sticky Action Footer: Price + Buy Now & Add to Cart */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#090d16] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
          
          {/* Price display */}
          <div className="flex items-baseline justify-between sm:justify-start gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs sm:text-sm text-slate-500 line-through tabular-nums">
                  {formatPrice(calculatedRetailUSD, currency)}
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-display tabular-nums">
                  {formatPrice(calculatedPriceUSD, currency)}
                </span>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
              Instant Delivery
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Add to Cart button */}
            <button
              type="button"
              onClick={() => {
                onAddToCart(product, selectedDuration, selectedAccountType, calculatedPriceUSD);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            {/* Buy Now Button (بائے ناؤ) */}
            <button
              type="button"
              onClick={() => {
                onBuyNow(product, selectedDuration, selectedAccountType, calculatedPriceUSD);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>BUY NOW</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
