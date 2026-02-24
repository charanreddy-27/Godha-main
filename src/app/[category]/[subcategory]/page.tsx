'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { useCartStore } from '@/stores/cart-store';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/lib/categories';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

export default function SubCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const subcategorySlug = params.subcategory as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const category = getCategoryBySlug(categorySlug);
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);

  useEffect(() => {
    if (category && subcategory) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, subcategorySlug]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?category=${categorySlug}&subCategory=${subcategorySlug}`);
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

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-royal-900 mb-4">Collection Not Found</h1>
          <p className="text-royal-600 mb-8">The collection you are looking for does not exist.</p>
          <Link href={`/${categorySlug || ''}`}>
            <Button>View All {category?.name || 'Collections'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title={subcategory.name}
        subtitle={`Discover our exclusive range of ${subcategory.name} from the ${category.name} collection`}
        breadcrumbs={[
          { label: category.name, href: `/${categorySlug}` },
          { label: subcategory.name },
        ]}
      />

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
                <h2 className="text-2xl font-display font-bold text-royal-900">{subcategory.name} Collection</h2>
                <p className="text-royal-500 text-sm mt-1">Showing {products.length} handpicked designs</p>
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
              Collection Coming Soon
            </h3>
            <p className="text-royal-500 mb-8 max-w-md mx-auto">
              We are currently curating the finest {subcategory.name} for you.
            </p>
            <Link href={`/${categorySlug}`}>
              <Button className="bg-royal-900 text-white hover:bg-royal-800 px-8">
                Explore {category.name}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
