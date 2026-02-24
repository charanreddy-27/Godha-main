'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { useCartStore } from '@/stores/cart-store';
import { getCategoryBySlug } from '@/lib/categories';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const category = getCategoryBySlug(categorySlug);

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?category=${categorySlug}`);
      const data = await response.json();
      const apiProducts: Product[] = data.products || [];
      setProducts(apiProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-royal-900 mb-4">Category Not Found</h1>
          <p className="text-royal-600 mb-8">The category you are looking for does not exist.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-royal-900 hover:bg-royal-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title={category.name}
        subtitle={`Explore our exquisite collection of handcrafted ${category.name.toLowerCase()}`}
        breadcrumbs={[{ label: category.name }]}
      />

      {/* Subcategories */}
      <div className="sticky top-[80px] md:top-[132px] z-40 bg-white border-b border-royal-100 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-royal-400 uppercase tracking-widest mr-2">
              Browse:
            </span>
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/${categorySlug}/${sub.slug}`}
                className="group relative px-5 py-2 rounded-full border border-royal-100 bg-white hover:border-gold-300 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-sm font-medium text-royal-600 group-hover:text-royal-900 transition-colors">
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-12 flex items-end justify-between border-b border-royal-100 pb-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-royal-900">All Collections</h2>
                <p className="text-royal-500 text-sm mt-1">Showing {products.length} exclusive designs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-royal-50 mx-auto max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-ivory-100 flex items-center justify-center relative">
              <Sparkles className="h-10 w-10 text-gold-500" />
              <div className="absolute inset-0 rounded-full border border-gold-200 animate-ping opacity-20" />
            </div>
            <h3 className="text-2xl font-display font-bold text-royal-900 mb-3">
              New Collection Arriving Soon
            </h3>
            <p className="text-royal-500 mb-8 max-w-md mx-auto">
              Our artisans are currently crafting new masterpieces for this category. Please check back shortly.
            </p>
            <Link href="/">
              <Button className="bg-royal-900 text-white hover:bg-royal-800 px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
