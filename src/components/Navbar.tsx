import React, { useState } from 'react';
import { ShoppingBag, Search, Shield, Globe, User, Menu, X } from 'lucide-react';
import { RyvoraLogo } from './RyvoraLogo';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';

interface NavbarProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenAccount,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop Catalog', href: '#catalog' },
    { label: 'Customer Proofs', href: '#proofs' },
    { label: 'Guarantees', href: '#guarantees' },
    { label: 'Track Order', action: onOpenTracker },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Single element Brand Zone */}
          <a
            href="#home"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg group"
            aria-label="Ryvora Digital Home"
          >
            <RyvoraLogo size="md" showText={true} />
          </a>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) =>
              link.action ? (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="hover:text-cyan-400 transition-colors cursor-pointer py-1 text-slate-300"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-cyan-400 transition-colors py-1 text-slate-300"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-sm"
                title="Change currency"
                aria-expanded={currencyDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                    Select Currency
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        onCurrencyChange(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                        currency === cur
                          ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{CURRENCIES[cur].label}</span>
                      {currency === cur && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Track Order Icon Button */}
            <button
              onClick={onOpenTracker}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors"
              title="Track Active Order"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Track Order</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950 font-bold" />
              <span className="hidden sm:inline font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-slate-950 text-cyan-400 text-[11px] font-bold border border-cyan-400">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Login button */}
            <button
              onClick={onOpenAccount}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
              title="Customer Login / Register"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Sign In</span>
            </button>

            {/* Admin Console trigger button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)]"
              title="Open Admin Control Panel"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-2 animate-in fade-in slide-in-from-top-2">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Home
            </a>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Store Catalog (32 Tools)
            </a>
            <a
              href="#proofs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Live Activations & Reviews
            </a>
            <a
              href="#guarantees"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Warranty & Guarantees
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Lookup & Track Order Status
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-cyan-400"
            >
              Customer Account Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 hover:bg-cyan-900/40"
            >
              🛡️ Admin Control Console
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
