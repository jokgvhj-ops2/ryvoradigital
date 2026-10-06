import React from 'react';
import { Star, Check, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { BrandIcon } from './BrandIcon';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onView,
  onAddToCart,
}) => {
  return (
    <div
      onClick={() => onView(product)}
      className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#090d16] border border-slate-800/90 p-4 sm:p-5 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Top Header: Category Tag & In-Stock Status */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-slate-400 uppercase font-mono">
            {product.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
              {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
            </span>
          </div>
        </div>

        {/* Product Brand Header: Authentic Logo + Title + Tagline + Rating */}
        <div className="flex items-start gap-3 sm:gap-3.5 mb-3.5 sm:mb-4">
          {/* Authentic Brand SVG Logo */}
          <div className="shrink-0">
            <BrandIcon
              id={product.id}
              name={product.name}
              brandColor={product.brandColor}
              className="w-11 h-11 sm:w-13 sm:h-13"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight truncate font-display">
              {product.name}
            </h3>

            <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 mt-0.5 leading-snug">
              {product.tagline}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-amber-300">{product.rating}</span>
              <span className="text-slate-500 text-[10px] sm:text-[11px]">({product.reviewsCount})</span>
              {product.badge && (
                <span className="ml-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hidden xs:inline-block">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3 Concrete Feature Checkmarks */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 pt-2 border-t border-slate-800/80">
          {product.features.slice(0, 3).map((feat, index) => (
            <div key={index} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300 leading-snug">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Price + Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80">
        
        {/* Pricing line */}
        <div className="mb-3">
          <span className="block text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5 font-mono">
            STARTING FROM
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] sm:text-xs text-slate-500 line-through tabular-nums">
              {formatPrice(product.retailPriceUSD, currency)}
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-display tabular-nums tracking-tight">
              {formatPrice(product.priceUSD, currency)}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">/ mo</span>
          </div>
        </div>

        {/* Actions (View and Cart button) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500 hover:bg-cyan-950/40 transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">VIEW / BUY</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:border-cyan-500 hover:bg-cyan-950/40 transition-all cursor-pointer shrink-0 active:scale-95"
            title="Quick Add to Cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
