'use client';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/stores/cart-store';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products?limit=9');
        const data = await res.json();
        setFeaturedProducts(data.products || []);
      } catch {
        console.error('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-ivory-50 via-white to-gold-50/20">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gold-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-royal-200/15 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text content */}
            <div className="space-y-6 lg:pr-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100/60 border border-gold-200/50 text-xs font-semibold text-gold-700 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                New Collection 2026
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] text-royal-900 tracking-tight">
                Where Tradition
                <span className="block mt-2 text-gold-600">Meets Elegance</span>
              </h1>

              <p className="text-base md:text-lg text-royal-500 leading-relaxed max-w-lg">
                Discover handcrafted sarees, ethnic wear, and dresses that
                celebrate India&apos;s rich textile heritage with contemporary
                grace.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/sarees">
                  <Button
                    size="lg"
                    className="bg-royal-900 hover:bg-royal-800 text-white px-7 py-5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Explore Sarees
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/ethnic-wear">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-royal-800 text-royal-800 hover:bg-royal-800 hover:text-white px-7 py-5 rounded-full text-sm font-semibold transition-all duration-300"
                  >
                    View Ethnic Wear
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-royal-100/50">
                <div>
                  <div className="text-2xl font-bold text-royal-900 font-display">
                    500+
                  </div>
                  <div className="text-xs text-royal-500 mt-1 font-medium">
                    Unique Designs
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-600 font-display">
                    50K+
                  </div>
                  <div className="text-xs text-royal-500 mt-1 font-medium">
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600 font-display">
                    4.9★
                  </div>
                  <div className="text-xs text-royal-500 mt-1 font-medium">
                    Avg. Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image grid */}
            <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-6 gap-3">
                <div className="col-span-3 row-span-6 relative rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop"
                    alt="Kanchivaram silk saree on mannequin"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-display font-bold text-white">
                      Silk Sarees
                    </h3>
                    <p className="text-ivory-200 text-sm mt-0.5">
                      Premium handwoven
                    </p>
                  </div>
                </div>

                <div className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=987&auto=format&fit=crop"
                    alt="Ethnic wear collection on mannequin"
                    fill
                    sizes="(max-width: 1024px) 100vw, 24vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-base font-semibold text-white">
                      Ethnic Wear
                    </h4>
                  </div>
                </div>

                <div className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop"
                    alt="Indo-western dress collection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 24vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-base font-semibold text-white">
                      Dresses
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white py-10 border-y border-royal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {(
              [
                {
                  icon: ShieldCheck,
                  label: '100% Authentic',
                  sub: 'Guaranteed Quality',
                  color: 'text-royal-600',
                },
                {
                  icon: Truck,
                  label: 'Free Shipping',
                  sub: 'Orders above ₹2,999',
                  color: 'text-teal-600',
                },
                {
                  icon: RotateCcw,
                  label: 'Easy Returns',
                  sub: '7-day return policy',
                  color: 'text-gold-600',
                },
                {
                  icon: Star,
                  label: 'Top Rated',
                  sub: '4.9/5 customer rating',
                  color: 'text-lotus-600',
                },
              ] as const
            ).map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-royal-50/80 flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-royal-900">
                    {label}
                  </div>
                  <div className="text-xs text-royal-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-royal-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-royal-500">
              Handpicked collections of traditional and contemporary designs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/ethnic-wear"
              className="group md:col-span-2 md:row-span-2"
            >
              <div className="relative h-[300px] md:h-full min-h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=987&auto=format&fit=crop"
                  alt="Ethnic wear collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-2">
                    Trending
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Ethnic Wear
                  </h3>
                  <p className="text-ivory-200 text-sm mb-4 max-w-sm">
                    Kurtis, 2-Piece & 3-Piece Sets, Lehangas – for every
                    occasion
                  </p>
                  <span className="inline-flex items-center text-white text-sm font-medium group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/sarees" className="group">
              <div className="relative h-[200px] md:h-full min-h-[200px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=987&auto=format&fit=crop"
                  alt="Saree collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Sarees
                  </h3>
                  <p className="text-ivory-200 text-xs mb-3">
                    Kanchivaram, Kalamkari & more
                  </p>
                  <span className="inline-flex items-center text-white text-sm font-medium group-hover:gap-1.5 transition-all">
                    Explore <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/dresses" className="group">
              <div className="relative h-[200px] md:h-full min-h-[200px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop"
                  alt="Dress collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Dresses
                  </h3>
                  <p className="text-ivory-200 text-xs mb-3">
                    Frocks & Indo-Western styles
                  </p>
                  <span className="inline-flex items-center text-white text-sm font-medium group-hover:gap-1.5 transition-all">
                    Explore <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      {!loading && featuredProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-ivory-50/50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-semibold mb-3 tracking-wide">
                  Trending Now
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-royal-900">
                  Bestsellers
                </h2>
              </div>
              <Link href="/ethnic-wear">
                <Button
                  variant="ghost"
                  className="text-royal-600 hover:text-royal-900 font-medium text-sm"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 9).map((product, idx) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section className="py-16 md:py-20 bg-royal-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Stay in the Loop
            </h2>
            <p className="text-ivory-200 text-base mb-8 max-w-lg mx-auto">
              Get exclusive access to new collections, special offers, and
              styling tips
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder:text-ivory-400 border border-white/15 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
              />
              <Button className="bg-gold-500 hover:bg-gold-600 text-royal-900 font-semibold px-6 py-3 rounded-xl text-sm">
                Subscribe
              </Button>
            </div>
            <p className="text-ivory-400/60 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
