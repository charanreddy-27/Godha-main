'use client';

import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  onAddToCart,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<span>🛍️</span>}
        title={emptyMessage}
        description="Try adjusting your filters or browse other categories."
        actionLabel="Browse All"
        actionHref="/"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
