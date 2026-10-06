import React, { useState, useMemo } from 'react';
import { Product, CategoryId, CurrencyCode } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowUpDown, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products?: Product[];
  searchQuery: string;
  currency: CurrencyCode;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onClearSearch?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = PRODUCTS,
  searchQuery,
  currency,
  onViewProduct,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  onClearSearch,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q)) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy, products]);

  return (
    <section id="catalog" className="py-8 sm:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider text-emerald-400 uppercase mb-1.5 sm:mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FULL WARRANTY CATALOG · {products.length} ACTIVE SERVICES</span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            FEATURED DIGITAL SERVICES
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Instant digital access, official accounts, and full-duration replacement warranty.
          </p>
        </div>

        {/* Total count indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] sm:text-xs text-slate-300">
            Showing <strong className="text-cyan-400 font-bold">{filteredProducts.length}</strong> of {products.length} Products
          </div>
        </div>
      </div>

      {/* Category Tabs & Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        
        {/* Horizontal Category Filter Buttons with smooth touch scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 scrollbar-none touch-pan-x overscroll-x-contain">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-purple-400/40'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`ml-1 sm:ml-1.5 text-[10px] sm:text-[11px] ${isActive ? 'text-purple-200' : 'text-slate-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 w-full sm:w-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="featured">Sort: Featured & Best Sellers</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="rating">Sort: Highest Rated</option>
          </select>
        </div>

      </div>

      {/* Product Grid - fully responsive on mobile (single column sleek card) to 4 columns */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onView={onViewProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 sm:py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 px-4">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-sm sm:text-base font-bold text-white mb-1">No products found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4 sm:mb-5">
            We couldn't find any products matching your search "{searchQuery}". Try browsing other categories.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              if (onClearSearch) onClearSearch();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
