'use client';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Star, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDemoProducts } from '@/lib/demo-products';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    console.log('Home page mounted');
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=8');
      const data = await response.json();
      const products = data.products || [];
      setFeaturedProducts(products.length > 0 ? products : getDemoProducts({ limit: 8 }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts(getDemoProducts({ limit: 8 }));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Luxury Hero Section - Split Design */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory-50 via-white to-gold-50/30">
          <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTNhNWYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLTAuOS0yLTItMnMtMiAwLjktMiAyIDAuOSAyIDIgMiAyLTAuOSAyLTJ6bS0yIDEyYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyIDItMC45IDItMi0wLjktMi0yLTJ6bTAgMTJjLTEuMSAwLTIgMC45LTIgMnMwLjkgMiAyIDIgMi0wLjkgMi0yLTAuOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Luxury Geometric Patterns */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-royal-900 to-teal-900 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gold-600 to-lotus-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Elegant Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-lg shadow-gold-300/50"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-50 to-gold-100/50 border border-gold-300/30 shadow-md backdrop-blur-sm animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-gold-600 animate-pulse" />
                <span className="text-sm font-bold text-gold-700 tracking-wide">New Collection 2026</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-royal-900 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Where Tradition
                <span className="block mt-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  Meets Elegance
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-royal-600 leading-relaxed max-w-lg font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Discover the finest collection of handcrafted sarees, ethnic wear, and dresses that celebrate 
                India's rich textile heritage with contemporary grace.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/sarees">
                  <Button size="lg" className="bg-gradient-to-r from-royal-800 to-royal-900 hover:from-royal-900 hover:to-royal-800 text-white px-8 py-6 rounded-full text-sm md:text-base font-bold shadow-luxury hover:shadow-luxury-lg transition-all duration-500 group">
                    Explore Sarees
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/ethnic">
                  <Button size="lg" variant="outline" className="border-2 border-royal-800 text-royal-800 hover:bg-royal-800 hover:text-white px-8 py-6 rounded-full text-sm md:text-base font-bold transition-all duration-500 shadow-md hover:shadow-luxury">
                    View Ethnic Wear
                  </Button>
                </Link>
              </div>

              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-5 pt-6 border-t border-gold-200/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-royal-900 to-royal-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-sm text-royal-600 mt-1.5 font-semibold">Designs</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-gold-600 to-gold-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50K+</div>
                  <div className="text-sm text-royal-600 mt-1.5 font-semibold">Happy Customers</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-lotus-600 to-lotus-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">4.9★</div>
                  <div className="text-sm text-royal-600 mt-1 font-medium">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Visual Grid */}
            <div className="relative lg:h-[560px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Large Image */}
                <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group shadow-2xl border border-gold-200/20">
                  <Image
                    src="/images/demo-hero-main.svg"
                    alt="Kanchivaram silk saree collection"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-royal-900/45 via-royal-900/30 to-teal-900/25 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  {/* Luxury Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 flex items-end p-6 md:p-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Kanchivaram Silk</h3>
                      <p className="text-ivory-200">Premium handwoven sarees</p>
                    </div>
                  </div>
                </div>
                
                {/* Small Image 1 */}
                <div className="relative rounded-3xl overflow-hidden group">
                  <Image
                    src="/images/demo-ethnic.svg"
                    alt="Ethnic set styles"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-end p-4 md:p-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-white">Ethnic Sets</h4>
                    </div>
                  </div>
                </div>
                
                {/* Small Image 2 */}
                <div className="relative rounded-3xl overflow-hidden group">
                  <Image
                    src="/images/demo-dresses.svg"
                    alt="Elegant dress collection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-end p-4 md:p-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-white">Dresses</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Minimalist */}
      <section className="bg-gradient-to-b from-white to-ivory-50/50 py-14 md:py-16 border-y border-royal-100/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 via-transparent to-royal-400/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-royal-50 to-royal-100/50 flex items-center justify-center group-hover:from-royal-100 group-hover:to-royal-200/50 transition-all duration-500 shadow-md group-hover:shadow-luxury group-hover:scale-110 border border-royal-200/50">
                <ShieldCheck className="h-7 w-7 text-royal-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-sm font-bold text-royal-900">100% Authentic</div>
              <div className="text-xs text-royal-500 mt-1.5 font-medium">Guaranteed Quality</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 flex items-center justify-center group-hover:from-teal-100 group-hover:to-teal-200/50 transition-all duration-500 shadow-md group-hover:shadow-luxury group-hover:scale-110 border border-teal-200/50">
                <Truck className="h-7 w-7 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-sm font-bold text-royal-900">Free Shipping</div>
              <div className="text-xs text-royal-500 mt-1.5 font-medium">On orders above ₹2,999</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100/50 flex items-center justify-center group-hover:from-gold-100 group-hover:to-gold-200/50 transition-all duration-500 shadow-md group-hover:shadow-gold-lg group-hover:scale-110 border border-gold-200/50">
                <RotateCcw className="h-7 w-7 text-gold-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-sm font-bold text-royal-900">Easy Returns</div>
              <div className="text-xs text-royal-500 mt-1.5 font-medium">7 days return policy</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-lotus-50 to-lotus-100/50 flex items-center justify-center group-hover:from-lotus-100 group-hover:to-lotus-200/50 transition-all duration-500 shadow-md group-hover:shadow-luxury group-hover:scale-110 border border-lotus-200/50">
                <Star className="h-7 w-7 text-lotus-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-sm font-bold text-royal-900">Top Rated</div>
              <div className="text-xs text-royal-500 mt-1.5 font-medium">4.9/5 customer rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - Modern Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-ivory-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-royal-900 mb-3">
              Curated Collections
            </h2>
            <p className="text-base md:text-lg text-royal-600">
              Explore our handpicked selection of traditional and contemporary designs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Ethnic Category - Large */}
            <Link href="/ethnic" className="group md:col-span-2 md:row-span-2">
              <div className="relative h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-royal-900 via-royal-800 to-teal-900">
                <Image
                  src="/images/demo-ethnic.svg"
                  alt="Ethnic wear collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLTAuOS0yLTItMnMtMiAwLjktMiAyIDAuOSAyIDIgMiAyLTAuOSAyLTJ6bS0yIDEyYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyIDItMC45IDItMi0wLjktMi0yLTJ6bTAgMTJjLTEuMSAwLTIgMC45LTIgMnMwLjkgMiAyIDIgMi0wLjkgMi0yLTAuOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <TrendingUp className="h-6 w-6 text-gold-400 mb-4" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                    Ethnic Wear
                  </h3>
                  <p className="text-ivory-200 text-base mb-2">Kurtis, 2-Piece & 3-Piece Sets, Lehangas</p>
                  <p className="text-ivory-300/80 mb-6 max-w-md text-sm md:text-base">
                    Contemporary ethnic designs perfect for every occasion, from daily wear to festive celebrations
                  </p>
                  <Button className="w-fit bg-white text-royal-900 hover:bg-ivory-100 rounded-full px-7 py-5 font-semibold group-hover:px-9 transition-all duration-300">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-gold-400/20 to-transparent blur-2xl"></div>
              </div>
            </Link>

            {/* Sarees Category */}
            <Link href="/sarees" className="group">
              <div className="relative h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-wood-700 via-wood-600 to-gold-700">
                <Image
                  src="/images/demo-hero-main.svg"
                  alt="Saree collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLTAuOS0yLTItMnMtMiAwLjktMiAyIDAuOSAyIDIgMiAyLTAuOSAyLTJ6bS0yIDEyYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyIDItMC45IDItMi0wLjktMi0yLTJ6bTAgMTJjLTEuMSAwLTIgMC45LTIgMnMwLjkgMiAyIDIgMi0wLjkgMi0yLTAuOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display text-2xl font-bold text-white mb-1.5">
                    Sarees
                  </h3>
                  <p className="text-ivory-200 text-sm mb-6">
                    Kanchivaram, Kalamkari & more
                  </p>
                  <div className="flex items-center text-white font-medium group-hover:gap-2 transition-all duration-300">
                    Explore
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Dresses Category */}
            <Link href="/dresses" className="group">
              <div className="relative h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-lotus-600 via-lotus-500 to-teal-600">
                <Image
                  src="/images/demo-dresses.svg"
                  alt="Dress collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLTAuOS0yLTItMnMtMiAwLjktMiAyIDAuOSAyIDIgMiAyLTAuOSAyLTJ6bS0yIDEyYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyIDItMC45IDItMi0wLjktMi0yLTJ6bTAgMTJjLTEuMSAwLTIgMC45LTIgMnMwLjkgMiAyIDIgMi0wLjkgMi0yLTAuOS0yLTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display text-2xl font-bold text-white mb-1.5">
                    Dresses
                  </h3>
                  <p className="text-ivory-200 text-sm mb-6">
                    Frocks & Indo-Western styles
                  </p>
                  <div className="flex items-center text-white font-medium group-hover:gap-2 transition-all duration-300">
                    Explore
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-sm font-medium mb-6">
                  Trending Now
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-900">
                  Bestsellers
                </h2>
              </div>
              <Link href="/ethnic">
                <Button variant="ghost" className="text-royal-700 hover:text-royal-900 font-semibold">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
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

      {/* Newsletter - Modern Minimal */}
      <section className="py-24 bg-royal-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-ivory-200 text-lg mb-6">
                  Get exclusive access to new collections, special offers, and styling tips delivered to your inbox
                </p>
                <div className="flex items-center gap-4 text-sm text-ivory-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                    <span>Weekly updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                    <span>No spam</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder:text-ivory-400 border border-white/20 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                  />
                  <Button className="bg-gold-500 hover:bg-gold-600 text-royal-900 font-semibold px-8 py-4 rounded-xl">
                    Subscribe
                  </Button>
                </div>
                <p className="text-ivory-400 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
