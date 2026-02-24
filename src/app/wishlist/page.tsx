'use client';

import { useEffect, useState } from 'react';
import { useWishlistStore } from '@/stores/wishlist-store';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/stores/cart-store';
import { toast } from 'sonner';
import { Heart, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addToCart = useCartStore((s) => s.addItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          wishlistIds.map(async (id) => {
            try {
              const res = await fetch(`/api/products/${id}`);
              if (res.ok) {
                const data = await res.json();
                return data.product as Product;
              }
              return null;
            } catch {
              return null;
            }
          })
        );
        setProducts(results.filter(Boolean) as Product[]);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlistProducts();
  }, [wishlistIds]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-700 via-royal-600 to-royal-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-8 w-8 mx-auto mb-4 text-lotus-300" />
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            My Wishlist
          </h1>
          <p className="text-royal-200 text-sm">
            {wishlistIds.length} {wishlistIds.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 mx-auto mb-4 text-royal-200" />
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-royal-500 mb-6">
              Browse our collections and save items you love
            </p>
            <Button asChild className="bg-royal-800 hover:bg-royal-700 text-white rounded-lg">
              <a href="/">Explore Collections</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Clear All */}
            <div className="flex justify-end mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                className="text-royal-500 hover:text-lotus-600 border-royal-200"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Clear All
              </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
