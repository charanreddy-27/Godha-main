'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { toast } from 'sonner';
import { Loader2, ShoppingCart, ChevronRight, Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { SizeGuideButton } from '@/components/product/SizeGuide';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/shared/JsonLd';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(productId));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        toast.error('Product not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-ivory-50">
        <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Structured Data */}
      {product && (
        <>
          <ProductJsonLd product={product} />
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', url: '/' },
              { name: product.category, url: `/${product.category}` },
              { name: product.subCategory, url: `/${product.category}/${product.subCategory}` },
              { name: product.name, url: `/product/${product.id}` },
            ]}
          />
        </>
      )}

      {/* Premium Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-md border-b border-royal-100/50 sticky top-[80px] z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="text-royal-500 hover:text-gold-600 font-medium transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-300 flex-shrink-0" />
            <Link
              href={`/${product.category}`}
              className="text-royal-500 hover:text-gold-600 font-medium transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-300 flex-shrink-0" />
            <Link
              href={`/${product.category}/${product.subCategory}`}
              className="text-royal-500 hover:text-gold-600 font-medium transition-colors capitalize"
            >
              {product.subCategory}
            </Link>
            <ChevronRight className="h-3 w-3 text-royal-300 flex-shrink-0" />
            <span className="text-royal-900 font-bold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Images Section */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[600px] scrollbar-hide py-1">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-gold-500 shadow-md scale-105 ring-2 ring-gold-500/20'
                          : 'border-transparent hover:border-gold-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 aspect-[3/4] lg:h-[600px] bg-white rounded-2xl overflow-hidden shadow-luxury border border-royal-50 relative group">
                {product.images && product.images[selectedImage] ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-royal-200">
                    <span className="text-6xl">👗</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-royal-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    Premium Quality
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-royal-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-gold-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-royal-400 text-sm">(24 Reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-royal-900">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-royal-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-royal-500 text-sm mb-6">Inclusive of all taxes</p>
            </div>

            <div className="h-px bg-royal-100" />

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-royal-900 uppercase tracking-wide">Select Size</h3>
                  <button className="text-xs text-gold-600 hover:text-gold-700 underline underline-offset-4 decoration-gold-300">
                    <SizeGuideButton category={product.category} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-12 h-12 rounded-lg border-2 border-royal-100 hover:border-gold-500 hover:bg-gold-50 text-royal-700 font-medium transition-all duration-200 focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 flex items-center justify-center"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-royal-900 uppercase tracking-wide mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-6 py-2 rounded-lg border border-royal-200 hover:border-gold-500 bg-white hover:bg-gold-50 text-royal-700 text-sm font-medium transition-all duration-200"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-6 space-y-4">
              {product.stock > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="col-span-1 bg-royal-900 hover:bg-royal-800 text-white rounded-lg py-7 text-lg font-semibold shadow-luxury hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-none"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    className="col-span-1 bg-gold-500 hover:bg-gold-600 text-royal-900 rounded-lg py-7 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-none"
                  >
                    Buy Now
                  </Button>
                </div>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 rounded-lg py-6 cursor-not-allowed"
                  size="lg"
                >
                  Out of Stock
                </Button>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-royal-600 pt-4">
                <button
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all duration-300 ${
                    isWishlisted
                      ? 'border-lotus-300 bg-lotus-50 text-lotus-600'
                      : 'border-royal-200 hover:border-lotus-300 hover:bg-lotus-50/50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-lotus-500' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  Authentic Products
                </div>
              </div>
            </div>

            {product.description && (
              <div className="pt-6 border-t border-royal-100">
                <h3 className="text-lg font-bold text-royal-900 mb-2 font-display">Product Details</h3>
                <p className="text-royal-600 leading-relaxed text-sm">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
