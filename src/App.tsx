/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { TrustSection } from './components/TrustSection';
import { SocialProofSection } from './components/SocialProofSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AccountModal } from './components/AccountModal';
import { PolicyModal } from './components/PolicyModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Product, CartItem, PlanDuration, AccountType, CustomerOrder, CurrencyCode, CategoryId, PromoCoupon, CustomerReview, LiveActivation } from './types';
import { PRODUCTS } from './data/products';
import { REVIEWS, LIVE_ACTIVATIONS } from './data/reviews';
import { Check } from 'lucide-react';

const INITIAL_COUPONS: PromoCoupon[] = [
  { code: 'USA10', discountPercent: 10, description: '10% USA Community Welcome Discount', active: true, usageCount: 142 },
  { code: 'VIP20', discountPercent: 20, description: '20% VIP Creator Program', active: true, usageCount: 68 },
  { code: 'CREATOR15', discountPercent: 15, description: '15% Discount on AI & Design Licenses', active: true, usageCount: 39 },
  { code: 'FLASH50', discountPercent: 50, description: 'Limited Flash Deal for Annual Bundles', active: false, usageCount: 12 },
];

const INITIAL_ORDERS: CustomerOrder[] = [
  {
    orderId: 'RYV-94821-US',
    customerEmail: 'austin.dev@gmail.com',
    customerPhone: '+1 (512) 883-9120',
    items: [
      {
        product: PRODUCTS[0], // ChatGPT Plus
        duration: '1_year',
        accountType: 'private_account',
        quantity: 1,
        priceUSD: 80.91,
      },
    ],
    subtotalUSD: 80.91,
    discountUSD: 8.09,
    totalUSD: 72.82,
    paymentMethod: 'Credit/Debit Card (Stripe USA)',
    status: 'delivered',
    createdAt: 'Today, 01:14 AM',
    credentials: {
      licenseKey: 'RYV-GPT4O-PRO-94821-US',
      accountEmail: 'austin.dev@gmail.com',
      instructions: 'Credentials dispatched to customer inbox automatically.',
    },
  },
  {
    orderId: 'RYV-83719-US',
    customerEmail: 'elena.design@creativeagency.us',
    customerPhone: '+1 (415) 309-8472',
    items: [
      {
        product: PRODUCTS[1], // Adobe CC
        duration: '1_month',
        accountType: 'private_account',
        quantity: 2,
        priceUSD: 39.98,
      },
    ],
    subtotalUSD: 39.98,
    discountUSD: 0,
    totalUSD: 39.98,
    paymentMethod: 'Apple Pay Express',
    status: 'delivered',
    createdAt: 'Yesterday, 04:32 PM',
    credentials: {
      licenseKey: 'RYV-ADOBE-CC-83719-US',
      accountEmail: 'elena.design@creativeagency.us',
      instructions: 'Adobe CC team seats allocated and active.',
    },
  },
  {
    orderId: 'RYV-71934-US',
    customerEmail: 'marcus.v@protonmail.com',
    items: [
      {
        product: PRODUCTS[3], // Cursor AI
        duration: '3_months',
        accountType: 'private_account',
        quantity: 1,
        priceUSD: 29.67,
      },
    ],
    subtotalUSD: 29.67,
    discountUSD: 2.97,
    totalUSD: 26.70,
    paymentMethod: 'PayPal Verified',
    status: 'delivered',
    createdAt: '2 days ago',
    credentials: {
      licenseKey: 'RYV-CURSOR-AI-71934-US',
      accountEmail: 'marcus.v@protonmail.com',
      instructions: 'Cursor AI Pro fast license token generated.',
    },
  },
];

export default function App() {
  // Store Products with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ryvora_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Store Orders with LocalStorage persistence
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ryvora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Store Coupons with LocalStorage persistence
  const [coupons, setCoupons] = useState<PromoCoupon[]>(() => {
    try {
      const saved = localStorage.getItem('ryvora_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Store Reviews & Live Activations
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS);
  const [activations, setActivations] = useState<LiveActivation[]>(LIVE_ACTIVATIONS);

  // Store Announcement Text
  const [announcementText, setAnnouncementText] = useState<string>(() => {
    try {
      return localStorage.getItem('ryvora_announcement') || '';
    } catch {
      return '';
    }
  });

  // Currency & Navigation State
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<'refund' | 'terms' | 'privacy' | 'delivery' | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Admin View State
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ryvora_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ryvora_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ryvora_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('ryvora_announcement', announcementText);
    } catch (e) {
      console.error(e);
    }
  }, [announcementText]);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    duration: PlanDuration = '1_month',
    accountType: AccountType = product.allowedAccountTypes[0] || 'private_account',
    customPrice?: number
  ) => {
    const itemPrice = customPrice !== undefined ? customPrice : product.priceUSD;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.duration === duration &&
          item.accountType === accountType
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }

      return [
        ...prev,
        {
          product,
          duration,
          accountType,
          quantity: 1,
          priceUSD: itemPrice,
        },
      ];
    });

    showToast(`Added ${product.name} to your bag`);
  };

  // Instant Buy Now
  const handleBuyNow = (
    product: Product,
    duration: PlanDuration,
    accountType: AccountType,
    price: number
  ) => {
    handleAddToCart(product, duration, accountType, price);
    setIsCartOpen(true);
  };

  // Cart modifications
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // When order completes, add to customer orders list as well
  const handleOrderCompleted = (order: CustomerOrder) => {
    setCompletedOrder(order);
    setOrders((prev) => [order, ...prev]);
  };

  // Smooth scroll to catalog
  const handleExploreClick = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickFilter = (tag: string) => {
    setSearchQuery(tag);
    handleExploreClick();
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // If in Admin Mode, render the full executive dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        products={products}
        onUpdateProducts={setProducts}
        orders={orders}
        onUpdateOrders={setOrders}
        reviews={reviews}
        onUpdateReviews={setReviews}
        activations={activations}
        onUpdateActivations={setActivations}
        coupons={coupons}
        onUpdateCoupons={setCoupons}
        onExitAdmin={() => setIsAdminView(false)}
        announcementText={announcementText}
        onUpdateAnnouncement={setAnnouncementText}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-xs font-semibold text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Ticker */}
      <AnnouncementBar customText={announcementText || undefined} />

      {/* Navigation Bar */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Hero Section with Live Search */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExploreClick={handleExploreClick}
        onQuickFilter={handleQuickFilter}
      />

      {/* Main Product Catalog */}
      <ProductCatalog
        products={products}
        searchQuery={searchQuery}
        currency={currency}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onClearSearch={() => setSearchQuery('')}
        onViewProduct={(product) => setViewingProduct(product)}
        onAddToCart={(product) => handleAddToCart(product)}
      />

      {/* Guarantees & Stats Counter Section */}
      <TrustSection />

      {/* Real Customer Activations & Reviews */}
      <SocialProofSection onOpenChat={() => setIsChatOpen(true)} />

      {/* Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={viewingProduct}
        currency={currency}
        onClose={() => setViewingProduct(null)}
        onAddToCart={(p, d, a, pr) => handleAddToCart(p, d, a, pr)}
        onBuyNow={(p, d, a, pr) => handleBuyNow(p, d, a, pr)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderSuccessModal
        order={completedOrder}
        currency={currency}
        onClose={() => setCompletedOrder(null)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* Customer Account Portal Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Customer Policy Modal */}
      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* 24/7 Live Concierge Chat Widget */}
      <LiveChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Admin Passcode Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminView(true);
          showToast('Admin Console Authenticated');
        }}
      />

    </div>
  );
}
