import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, Zap, ArrowRight, Tag, CreditCard, Check } from 'lucide-react';
import { CartItem, CurrencyCode, CustomerOrder } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: CustomerOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'applepay' | 'paypal' | 'crypto'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotalUSD = items.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  const discountUSD = Number(((subtotalUSD * appliedDiscountPercent) / 100).toFixed(2));
  const totalUSD = Math.max(0, Number((subtotalUSD - discountUSD).toFixed(2)));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'USA10' || code === 'RYVORA10') {
      setAppliedDiscountPercent(10);
      setCouponMessage({ text: '10% USA Community Discount applied!' });
    } else if (code === 'SAVE20' || code === 'VIP20') {
      setAppliedDiscountPercent(20);
      setCouponMessage({ text: '20% VIP Creator Discount applied!' });
    } else {
      setCouponMessage({ text: 'Invalid coupon code. Try "USA10"', error: true });
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter a valid email address for license key delivery.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    // Simulate instant order generation
    setTimeout(() => {
      const generatedOrderId = `RYV-${Math.floor(10000 + Math.random() * 90000)}-US`;
      const generatedLicense = `RYV-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const newOrder: CustomerOrder = {
        orderId: generatedOrderId,
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim() || undefined,
        items: [...items],
        subtotalUSD,
        discountUSD,
        totalUSD,
        paymentMethod:
          selectedPayment === 'card'
            ? 'Credit/Debit Card (Stripe USA)'
            : selectedPayment === 'applepay'
            ? 'Apple Pay / Google Pay'
            : selectedPayment === 'paypal'
            ? 'PayPal Verified'
            : 'Crypto (USDT TRC20)',
        status: 'delivered',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        credentials: {
          licenseKey: generatedLicense,
          accountEmail: customerEmail.trim(),
          instructions: 'Your dedicated access credentials and activation instructions have been sent to your email. Check your primary inbox and spam folder within 1-3 minutes.',
        },
      };

      setIsSubmitting(false);
      onClearCart();
      onClose();
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#090d16] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl relative z-10">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white font-display">Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Your bag is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Explore our catalog of 30+ discounted tools and AI subscriptions.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Itemized List */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 relative group"
                  >
                    {/* Tool Badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0 border border-white/10"
                      style={{ backgroundColor: item.product.brandColor }}
                    >
                      {item.product.name.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-white truncate uppercase font-display">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-cyan-400 font-medium">
                        {item.duration.replace('_', ' ')} · {item.accountType.replace('_', ' ')}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1 text-slate-200 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-emerald-400 tabular-nums">
                          {formatPrice(item.priceUSD * item.quantity, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (try USA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponMessage.error ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Delivery Contact Information */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Delivery Destination:
                </label>
                
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email for Instant Delivery *"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    ⚡ Credentials and workspace invites arrive here in &lt;180 seconds.
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Optional US Mobile or Discord for SMS Ping"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {formError && (
                  <p className="text-xs text-rose-400 font-medium">{formError}</p>
                )}
              </div>

              {/* Payment Methods */}
              <div className="pt-3 border-t border-slate-800/80">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select US Payment Method:
                </label>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      selectedPayment === 'card'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-[11px]">Card (Stripe)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('applepay')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      selectedPayment === 'applepay'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-[11px]">Apple / G-Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('paypal')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      selectedPayment === 'paypal'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-blue-400 text-xs">P</span>
                    <span className="font-semibold text-[11px]">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('crypto')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      selectedPayment === 'crypto'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-amber-400 text-xs">₮</span>
                    <span className="font-semibold text-[11px]">Crypto USDT</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200 tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount ({appliedDiscountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountUSD, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Instant Delivery Fee</span>
                  <span className="text-emerald-400 font-semibold">FREE ($0.00)</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800/80">
                  <span>Total Amount</span>
                  <span className="text-emerald-400 font-display tabular-nums">
                    {formatPrice(totalUSD, currency)}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* Sticky Checkout Button Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#070a12] space-y-3">
              <button
                disabled={isSubmitting}
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure USA Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Order & Receive Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  256-Bit SSL Encrypted
                </span>
                <span>·</span>
                <span>Full Term Warranty</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
