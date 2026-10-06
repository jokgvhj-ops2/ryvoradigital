import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Ticket,
  ShieldCheck,
  Settings,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Copy,
  AlertCircle
} from 'lucide-react';
import { Product, CustomerOrder, CustomerReview, LiveActivation, PromoCoupon, CategoryId } from '../../types';
import { RyvoraLogo } from '../RyvoraLogo';
import { CATEGORIES } from '../../data/products';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  orders: CustomerOrder[];
  onUpdateOrders: (orders: CustomerOrder[]) => void;
  reviews: CustomerReview[];
  onUpdateReviews: (reviews: CustomerReview[]) => void;
  activations: LiveActivation[];
  onUpdateActivations: (activations: LiveActivation[]) => void;
  coupons: PromoCoupon[];
  onUpdateCoupons: (coupons: PromoCoupon[]) => void;
  onExitAdmin: () => void;
  announcementText: string;
  onUpdateAnnouncement: (text: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  orders,
  onUpdateOrders,
  reviews,
  onUpdateReviews,
  activations,
  onUpdateActivations,
  coupons,
  onUpdateCoupons,
  onExitAdmin,
  announcementText,
  onUpdateAnnouncement,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons' | 'proofs' | 'settings'>('analytics');
  
  // Product search & edit
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<CategoryId>('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // New Product Form state
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('ai');
  const [newRetailPrice, setNewRetailPrice] = useState('20.00');
  const [newPrice, setNewPrice] = useState('8.99');
  const [newFeatures, setNewFeatures] = useState('Full private account\nHigh speed priority access\nFull warranty replacement');
  const [newBrandColor, setNewBrandColor] = useState('#00E5FF');

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // New Live Activation Form
  const [newActProduct, setNewActProduct] = useState('ChatGPT Plus & Team');
  const [newActEmail, setNewActEmail] = useState('j****@gmail.com');
  const [newActCity, setNewActCity] = useState('New York');
  const [newActState, setNewActState] = useState('NY');
  const [newActDuration, setNewActDuration] = useState('1 Year License');

  // License manual dispatch
  const [dispatchOrderId, setDispatchOrderId] = useState<string | null>(null);
  const [customKey, setCustomKey] = useState('');

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalUSD, 0) + 142890;
  const pendingOrders = orders.filter((o) => o.status === 'processing');

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.tagline.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCatFilter === 'all' || p.category === productCatFilter;
    return matchesSearch && matchesCat;
  });

  // Handle Add Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === newCategory);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName.trim(),
      tagline: newTagline.trim() || 'Premium Digital License Key',
      category: newCategory,
      categoryLabel: catObj ? catObj.name.toUpperCase() : 'DIGITAL TOOL',
      iconName: 'Sparkles',
      brandColor: newBrandColor,
      accentGlow: `${newBrandColor}40`,
      rating: 5.0,
      reviewsCount: 1,
      features: newFeatures.split('\n').filter((f) => f.trim().length > 0),
      retailPriceUSD: parseFloat(newRetailPrice) || 29.99,
      priceUSD: parseFloat(newPrice) || 9.99,
      inStock: true,
      popular: true,
      allowedAccountTypes: ['private_account'],
      description: `${newName} digital subscription with instant automated license provisioning and full term replacement guarantee.`,
      deliveryTime: 'Instant (2-5 mins)',
      warranty: 'Full Duration Warranty Guarantee'
    };

    onUpdateProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    // Reset
    setNewName('');
    setNewTagline('');
  };

  // Toggle Stock
  const handleToggleStock = (productId: string) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    onUpdateProducts(updated);
  };

  // Save Inline Price
  const handleSavePrice = (productId: string) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, priceUSD: editPrice } : p
    );
    onUpdateProducts(updated);
    setEditingProductId(null);
  };

  // Delete Product
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to remove this product from Ryvora Digital?')) {
      onUpdateProducts(products.filter((p) => p.id !== productId));
    }
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const coupon: PromoCoupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: parseInt(newCouponDiscount) || 10,
      description: newCouponDesc.trim() || `${newCouponDiscount}% Discount Voucher`,
      active: true,
      usageCount: 0,
    };

    onUpdateCoupons([...coupons, coupon]);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  // Toggle Coupon
  const handleToggleCoupon = (code: string) => {
    onUpdateCoupons(
      coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Delete Coupon
  const handleDeleteCoupon = (code: string) => {
    onUpdateCoupons(coupons.filter((c) => c.code !== code));
  };

  // Add Live Activation Proof
  const handleAddActivation = (e: React.FormEvent) => {
    e.preventDefault();
    const newAct: LiveActivation = {
      id: `act-${Date.now()}`,
      productName: newActProduct,
      category: 'USA Verified',
      customerMasked: newActEmail,
      city: newActCity,
      state: newActState,
      minutesAgo: 1,
      planDuration: newActDuration,
    };

    onUpdateActivations([newAct, ...activations]);
  };

  // Dispatch Order
  const handleDispatchOrder = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'delivered' as const,
          credentials: {
            licenseKey: customKey.trim() || `RYV-DISPATCH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
            accountEmail: o.customerEmail,
            instructions: 'License provisioned manually via Ryvora Admin Console.',
          },
        };
      }
      return o;
    });

    onUpdateOrders(updated);
    setDispatchOrderId(null);
    setCustomKey('');
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#090d16]/95 border-b border-cyan-500/20 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <RyvoraLogo size="sm" showText={true} />
          
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>COMMAND CONSOLE · USA REGION</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 font-bold" />
            <span>View Live Customer Storefront</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Admin Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 font-mono">
            Management Modules
          </div>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Products & Catalog</span>
            </div>
            <span className="text-[11px] opacity-80">{products.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Orders</span>
            </div>
            {pendingOrders.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-bold">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-4 h-4" />
              <span>Coupons & Promos</span>
            </div>
            <span className="text-[11px] opacity-80">{coupons.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'proofs'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Proofs & Reviews</span>
            </div>
            <span className="text-[11px] opacity-80">{activations.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Configuration</span>
          </button>

          <div className="pt-6 border-t border-slate-900 mt-6">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div>Store Server: <strong className="text-emerald-400">Online</strong></div>
              <div>License Auto-Bot: <strong className="text-cyan-400">Active</strong></div>
              <div>US Gateway: <strong className="text-slate-200">Stripe Live</strong></div>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Store Performance & Revenue</h2>
                <p className="text-xs text-slate-400 mt-0.5">Live North American sales telemetry and active key activations.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Total Gross Volume</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-display tabular-nums">
                    ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +28.4% this month
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Active Subscriptions</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-display tabular-nums">
                    4,850+
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Across US, Canada & Global
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Catalog Items</span>
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-display tabular-nums">
                    {products.length} Active
                  </div>
                  <div className="text-[11px] text-purple-400 font-semibold mt-1">
                    100% In Stock Available
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Fulfillment Speed</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-display tabular-nums">
                    ~90s Avg
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    Automated Email Dispatch
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="p-6 rounded-3xl bg-[#090d16] border border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
                  Category Revenue Share
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">AI Tools</div>
                    <div className="text-lg font-bold text-cyan-400">48.2%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ChatGPT, Claude, Cursor</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">Design & Creative</div>
                    <div className="text-lg font-bold text-emerald-400">26.5%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Adobe CC, Canva, Figma</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">Video & Audio</div>
                    <div className="text-lg font-bold text-purple-400">14.1%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ElevenLabs, CapCut, HeyGen</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">Streaming & VPNs</div>
                    <div className="text-lg font-bold text-amber-400">11.2%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Netflix 4K, Spotify, NordVPN</div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 rounded-3xl bg-[#090d16] border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                    Recent Orders Log
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] uppercase font-bold text-slate-500">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer Email</th>
                        <th className="pb-3">Items</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-slate-900/40">
                          <td className="py-3 font-mono text-cyan-400 font-bold">{ord.orderId}</td>
                          <td className="py-3">{ord.customerEmail}</td>
                          <td className="py-3 font-medium text-white">{ord.items.map((i) => i.product.name).join(', ')}</td>
                          <td className="py-3 font-bold text-emerald-400 tabular-nums">${ord.totalUSD.toFixed(2)}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                              {ord.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & CATALOG MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white font-display">Catalog & Inventory</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Control product prices, stock status, and add new services.</p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4 font-bold" />
                  <span>Add New Digital Tool</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by tool name or description..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value as CategoryId)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Products Table */}
              <div className="rounded-3xl bg-[#090d16] border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase font-bold text-slate-500">
                        <th className="p-4">Product Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Retail Price</th>
                        <th className="p-4">Ryvora Price (USD)</th>
                        <th className="p-4">Stock Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProducts.map((p) => {
                        const isEditingThis = editingProductId === p.id;
                        return (
                          <tr key={p.id} className="hover:bg-slate-900/30">
                            <td className="p-4 font-bold text-white flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shrink-0"
                                style={{ backgroundColor: p.brandColor }}
                              >
                                {p.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span>{p.name}</span>
                                <span className="block text-[11px] font-normal text-slate-500 line-clamp-1">{p.tagline}</span>
                              </div>
                            </td>

                            <td className="p-4 font-mono text-[11px] text-cyan-400">
                              {p.categoryLabel}
                            </td>

                            <td className="p-4 text-slate-500 line-through tabular-nums">
                              ${p.retailPriceUSD.toFixed(2)}
                            </td>

                            {/* Price (Editable) */}
                            <td className="p-4 tabular-nums">
                              {isEditingThis ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 rounded bg-slate-950 border border-cyan-500 text-xs font-bold text-white focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleSavePrice(p.id)}
                                    className="p-1 rounded bg-emerald-500 text-slate-950 cursor-pointer"
                                    title="Save price"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingProductId(null)}
                                    className="p-1 rounded bg-slate-800 text-slate-400 cursor-pointer"
                                    title="Cancel"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingProductId(p.id);
                                    setEditPrice(p.priceUSD);
                                  }}
                                  className="group font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                                  title="Click to edit price"
                                >
                                  <span>${p.priceUSD.toFixed(2)}</span>
                                  <Edit2 className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                                </button>
                              )}
                            </td>

                            {/* In Stock Toggle */}
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleStock(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                  p.inStock
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {p.inStock ? '● IN STOCK' : '○ OUT OF STOCK'}
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Remove Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Product Modal */}
              {isAddProductOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d16] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
                    <button
                      onClick={() => setIsAddProductOpen(false)}
                      className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Add New Digital Tool
                    </h3>
                    <p className="text-xs text-slate-400 mb-5">
                      Publish a new software subscription or license to the USA storefront.
                    </p>

                    <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Tool Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. GitHub Copilot Enterprise"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Tagline / Short Hook</label>
                        <input
                          type="text"
                          placeholder="e.g. Next-Gen AI Code Pair Programmer"
                          value={newTagline}
                          onChange={(e) => setNewTagline(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                          >
                            <option value="ai">AI Tools</option>
                            <option value="design">Design & Graphics</option>
                            <option value="video">Video Editing</option>
                            <option value="development">Developer Tools</option>
                            <option value="streaming">Streaming & Entertainment</option>
                            <option value="marketing">Marketing & SEO</option>
                            <option value="vpn">VPNs & Security</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Brand Theme Color</label>
                          <input
                            type="color"
                            value={newBrandColor}
                            onChange={(e) => setNewBrandColor(e.target.value)}
                            className="w-full h-9 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Official Retail Price ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={newRetailPrice}
                            onChange={(e) => setNewRetailPrice(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Ryvora Discount Price ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Features (One per line)</label>
                        <textarea
                          rows={3}
                          value={newFeatures}
                          onChange={(e) => setNewFeatures(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddProductOpen(false)}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                        >
                          Publish to Store
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS & KEY DISPATCH */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Customer Orders & License Dispatch</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage customer purchases, dispatch credentials, and monitor warranty status.</p>
              </div>

              <div className="rounded-3xl bg-[#090d16] border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase font-bold text-slate-500">
                        <th className="p-4">Order ID & Date</th>
                        <th className="p-4">Customer Email</th>
                        <th className="p-4">Tools Purchased</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status & License</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-slate-900/30">
                          <td className="p-4">
                            <span className="font-mono text-cyan-400 font-bold block">{ord.orderId}</span>
                            <span className="text-[10px] text-slate-500">{ord.createdAt}</span>
                          </td>

                          <td className="p-4">
                            <span className="font-medium text-white">{ord.customerEmail}</span>
                            {ord.customerPhone && (
                              <span className="block text-[10px] text-slate-500">{ord.customerPhone}</span>
                            )}
                          </td>

                          <td className="p-4">
                            <div className="space-y-1">
                              {ord.items.map((i, idx) => (
                                <div key={idx} className="font-semibold text-slate-200">
                                  {i.product.name} ({i.duration.replace('_', ' ')})
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="p-4 text-slate-400">
                            {ord.paymentMethod}
                          </td>

                          <td className="p-4 font-bold text-emerald-400 tabular-nums">
                            ${ord.totalUSD.toFixed(2)}
                          </td>

                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {ord.status.toUpperCase()}
                            </span>
                            {ord.credentials?.licenseKey && (
                              <div className="font-mono text-[10px] text-slate-400 mt-1 truncate max-w-[140px] select-all">
                                {ord.credentials.licenseKey}
                              </div>
                            )}
                          </td>

                          <td className="p-4 text-right">
                            {ord.status !== 'delivered' ? (
                              <button
                                onClick={() => {
                                  setDispatchOrderId(ord.orderId);
                                  setCustomKey(`RYV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] cursor-pointer"
                              >
                                Dispatch Key
                              </button>
                            ) : (
                              <span className="text-[11px] text-emerald-400 font-semibold">✓ Dispatched</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dispatch Modal */}
              {dispatchOrderId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="relative w-full max-w-md rounded-3xl bg-[#090d16] border border-cyan-500/30 p-6 shadow-2xl">
                    <h3 className="text-base font-bold text-white font-display mb-2">
                      Dispatch Key for {dispatchOrderId}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Enter the generated license credentials or team invite URL:
                    </p>

                    <input
                      type="text"
                      value={customKey}
                      onChange={(e) => setCustomKey(e.target.value)}
                      placeholder="e.g. RYV-GPT4O-US-77891"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono mb-4 focus:outline-none focus:border-cyan-500"
                    />

                    <div className="flex justify-end gap-2 text-xs">
                      <button
                        onClick={() => setDispatchOrderId(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDispatchOrder(dispatchOrderId)}
                        className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold cursor-pointer"
                      >
                        Confirm Dispatch
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COUPONS & DISCOUNTS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Coupons & Promo Codes</h2>
                <p className="text-xs text-slate-400 mt-0.5">Create checkout discount codes for USA creators and seasonal sales.</p>
              </div>

              {/* Add Coupon Form */}
              <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USA15"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="w-28">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description / Campaign</label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Creator Discount"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
                >
                  Create Coupon
                </button>
              </form>

              {/* Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      c.active
                        ? 'bg-[#090d16] border-slate-800'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-extrabold text-cyan-400 tracking-wider">
                          {c.code}
                        </span>
                        <span className="text-xs font-black text-emerald-400 tabular-nums">
                          {c.discountPercent}% OFF
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{c.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-4">
                      <button
                        onClick={() => handleToggleCoupon(c.code)}
                        className={`text-[11px] font-bold cursor-pointer ${
                          c.active ? 'text-emerald-400' : 'text-slate-500'
                        }`}
                      >
                        {c.active ? '● Active' : '○ Disabled'}
                      </button>

                      <button
                        onClick={() => handleDeleteCoupon(c.code)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROOFS & ACTIVATIONS */}
          {activeTab === 'proofs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Customer Proofs & Real-Time Feed</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control live order activations and manage customer reviews shown on the storefront.</p>
              </div>

              {/* Add Activation Proof Form */}
              <form onSubmit={handleAddActivation} className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Publish New Live Activation Proof to Stream
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newActProduct}
                      onChange={(e) => setNewActProduct(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Customer Masked Email</label>
                    <input
                      type="text"
                      required
                      value={newActEmail}
                      onChange={(e) => setNewActEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">City, State</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newActCity}
                        onChange={(e) => setNewActCity(e.target.value)}
                        placeholder="City"
                        className="w-2/3 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        value={newActState}
                        onChange={(e) => setNewActState(e.target.value)}
                        placeholder="State"
                        className="w-1/3 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Plan Duration</label>
                    <input
                      type="text"
                      value={newActDuration}
                      onChange={(e) => setNewActDuration(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Add to Live Stream
                </button>
              </form>

              {/* Current Stream Preview */}
              <div className="rounded-2xl bg-[#090d16] border border-slate-800 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Active Live Stream Feed ({activations.length} Events)
                </span>
                {activations.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-white">{a.productName}</span>
                      <span className="text-slate-400 ml-2">({a.planDuration})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-cyan-400">{a.customerMasked}</span>
                      <span className="text-slate-400">{a.city}, {a.state}</span>
                      <button
                        onClick={() => onUpdateActivations(activations.filter((x) => x.id !== a.id))}
                        className="text-slate-600 hover:text-rose-400 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: STORE CONFIGURATION */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Store Configuration & Announcements</h2>
                <p className="text-xs text-slate-400 mt-0.5">Customize global storefront messaging, alerts, and backup data.</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#090d16] border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Top Announcement Bar Ticker Text
                  </label>
                  <textarea
                    rows={2}
                    value={announcementText}
                    onChange={(e) => onUpdateAnnouncement(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Updates live immediately in the top banner across the website.
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Default Store Currency</h4>
                    <p className="text-[11px] text-slate-400">Target audience configured for United States (USD $)</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                    USD ($)
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Reset Storefront to Factory Defaults</h4>
                    <p className="text-[11px] text-slate-400">Restores all original 32 products and prices.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Reset store to default products and prices?')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
