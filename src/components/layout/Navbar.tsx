'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useCartStore } from '@/stores/cart-store';
import { categories } from '@/lib/categories';
import { signOut } from '@/lib/auth';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const cartItemCount = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      clearUser();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm border-b border-ivory-200' : 'bg-white'
      }`}
    >
      {/* Top Bar */}
      <div className="hidden md:block bg-gradient-to-r from-royal-700 via-royal-600 to-royal-700 text-white py-2.5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <div className="container mx-auto px-4 flex justify-between items-center text-xs tracking-wide relative z-10">
          <span className="font-light flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Free Shipping on Orders Above ₹2,999
          </span>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold-300 transition-colors cursor-pointer">
              📞 +91 98765 43210
            </span>
            <span className="hover:text-gold-300 transition-colors cursor-pointer">
              ✉️ care@godhacollections.com
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-gold-400/20 to-royal-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/images/godha-logo.png"
                alt="Godha Collections"
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10 drop-shadow-lg"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {Object.values(categories).map((category) => (
              <div
                key={category.slug}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${category.slug}`}
                  className="relative px-5 py-3 text-royal-700 hover:text-royal-900 font-medium text-sm tracking-wide flex items-center gap-1.5 transition-all duration-300 group/link"
                >
                  {category.name}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === category.slug ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 transition-all duration-300 group-hover/link:w-3/4 shadow-sm shadow-gold-300" />
                </Link>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-luxury-lg py-4 min-w-[260px] border border-gold-100/50 transition-all duration-300 origin-top backdrop-blur-sm ${
                    activeDropdown === category.slug
                      ? 'opacity-100 scale-100 visible'
                      : 'opacity-0 scale-95 invisible pointer-events-none'
                  }`}
                >
                  <div className="px-4 pb-3 mb-3 border-b border-gold-200/50">
                    <span className="text-xs font-bold text-gold-700 uppercase tracking-wider flex items-center gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-gold-500" />
                      Shop {category.name}
                    </span>
                  </div>
                  {category.subcategories.map((sub, idx) => (
                    <Link
                      key={sub.slug}
                      href={`/${category.slug}/${sub.slug}`}
                      className="group/item block px-4 py-3 text-royal-600 hover:text-royal-900 hover:bg-gradient-to-r hover:from-gold-50/50 hover:to-transparent text-sm transition-all duration-300 hover:pl-6 rounded-lg mx-2 relative"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex hover:bg-ivory-200 text-royal-600 hover:text-royal-800 rounded-full transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-royal-600 hover:text-gold-600 hover:bg-ivory-200 font-medium tracking-wide transition-all duration-300"
                  >
                    Admin
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-royal-600 hover:text-lotus-600 hover:bg-ivory-200 font-medium tracking-wide transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-ivory-200 text-royal-600 hover:text-royal-800 rounded-full transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link href="/cart" className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-ivory-200 text-royal-600 hover:text-royal-800 rounded-full transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in shadow-gold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-ivory-200 rounded-full transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-royal-600" />
              ) : (
                <Menu className="h-6 w-6 text-royal-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 border-t border-ivory-200 bg-white">
            {Object.values(categories).map((category, categoryIdx) => (
              <div
                key={category.slug}
                className="py-3 animate-fade-in"
                style={{ animationDelay: `${categoryIdx * 100}ms` }}
              >
                <Link
                  href={`/${category.slug}`}
                  className="block py-2 font-display text-lg font-semibold text-royal-700 hover:text-gold-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-gold-200">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${category.slug}/${sub.slug}`}
                      className="block py-2 text-sm text-royal-500 hover:text-gold-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile Contact Info */}
            <div className="mt-6 pt-6 border-t border-ivory-200">
              <p className="text-xs text-royal-400 uppercase tracking-wider mb-3">
                Contact Us
              </p>
              <p className="text-sm text-royal-600 mb-2">📞 +91 98765 43210</p>
              <p className="text-sm text-royal-600">
                ✉️ care@godhacollections.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
