'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';

export function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Luxury Border Gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gold-400/30 via-royal-300/20 to-lotus-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      <Card className="relative card-premium border border-royal-100/50 bg-white overflow-hidden rounded-2xl shadow-elegant hover:shadow-luxury-lg transition-all duration-700 hover:-translate-y-2">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-ivory-50 via-white to-gold-50/30">
            {product.images && product.images[0] ? (
              <>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
                {/* Premium overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ivory-100 via-lotus-50 to-ivory-100">
                <div className="text-center">
                  <span className="text-6xl block mb-2 animate-float">👗</span>
                  <span className="text-xs text-royal-400 tracking-wider uppercase font-medium">Image Coming Soon</span>
                </div>
              </div>
            )}
            
            {/* Shimmer Effect on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-full' : ''}`}></div>
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-royal-900/70 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Out of Stock Badge */}
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-royal-900/70 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-display text-xl tracking-wide">Out of Stock</span>
              </div>
            )}
            
            {/* Sale Badge */}
            {product.originalPrice && product.price < product.originalPrice && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-lotus-500 to-lotus-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            )}
            
            {/* New Badge */}
            {product.isNew && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  NEW
                </span>
              </div>
            )}
            
            {/* Quick Action Buttons */}
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`p-3.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-luxury transform hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-lotus-500 text-white shadow-lg' 
                    : 'bg-white/95 text-royal-600 hover:bg-lotus-500 hover:text-white'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <Link 
                href={`/product/${product.id}`}
                className="p-3.5 bg-white/95 rounded-full text-royal-600 hover:bg-royal-600 hover:text-white backdrop-blur-xl transition-all duration-300 shadow-luxury transform hover:scale-110"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Add to Cart Button - Bottom */}
            {product.stock > 0 && (
              <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.(product);
                  }}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-600 text-royal-700 hover:text-white font-semibold py-3.5 rounded-xl shadow-luxury transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-gold-200/50 hover:border-gold-400"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </Link>
        
        <CardContent className="p-6">
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-gold-50 to-gold-100/50 border border-gold-200/50">
              <span className="text-[10px] font-bold text-gold-700 uppercase tracking-widest">
                {product.category}
              </span>
            </span>
            {product.subCategory && (
              <>
                <span className="text-royal-300">•</span>
                <span className="text-[10px] text-royal-500 uppercase tracking-wider font-medium">
                  {product.subCategory}
                </span>
              </>
            )}
          </div>
          
          <Link href={`/product/${product.id}`}>
            <h3 className="font-display text-lg font-bold text-royal-900 mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors duration-300 leading-tight tracking-tight">
              {product.name}
            </h3>
          </Link>
          
          {/* Price Section */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-royal-800 to-royal-700 bg-clip-text text-transparent font-display">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.price < product.originalPrice && (
              <span className="text-sm text-royal-400 line-through font-medium">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          {/* Colors Available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-3 border-t border-royal-100/50">
              <span className="text-xs text-royal-500 font-medium">Colors:</span>
              <div className="flex gap-1.5">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md ring-1 ring-royal-200/50 hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-royal-100 text-[10px] text-royal-600 font-semibold">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
