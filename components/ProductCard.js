'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';

export function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice && product.price < product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative bg-white overflow-hidden rounded-2xl border border-royal-100/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-ivory-50 to-gold-50/20">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ivory-100 to-ivory-50">
                <div className="text-center">
                  <span className="text-5xl block mb-2">👗</span>
                  <span className="text-[11px] text-royal-400 tracking-wider uppercase font-medium">Coming Soon</span>
                </div>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Out of Stock */}
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-royal-900/60 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-display text-lg tracking-wide">Sold Out</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="bg-lotus-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-teal-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                  NEW
                </span>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className={`absolute right-3 top-3 flex flex-col gap-1.5 transition-all duration-400 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-lotus-500 text-white' 
                    : 'bg-white/90 text-royal-600 hover:bg-lotus-500 hover:text-white'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <Link 
                href={`/product/${product.id}`}
                className="p-2 bg-white/90 rounded-full text-royal-600 hover:bg-royal-700 hover:text-white backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110"
              >
                <Eye className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            {/* Add to Cart */}
            {product.stock > 0 && (
              <div className={`absolute bottom-3 left-3 right-3 transition-all duration-400 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.(product);
                  }}
                  className="w-full bg-white/95 hover:bg-royal-800 text-royal-800 hover:text-white font-medium py-2.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm text-sm"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </Link>
        
        <CardContent className="p-4">
          {/* Category */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] font-semibold text-gold-600 uppercase tracking-widest">
              {product.category}
            </span>
            {product.subCategory && (
              <>
                <span className="text-royal-200">·</span>
                <span className="text-[10px] text-royal-400 uppercase tracking-wider">
                  {product.subCategory}
                </span>
              </>
            )}
          </div>
          
          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-display text-base font-semibold text-royal-900 mb-2 line-clamp-2 group-hover:text-royal-700 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-royal-900 font-body">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {discount > 0 && (
              <span className="text-xs text-royal-400 line-through">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-royal-50">
              {product.colors.slice(0, 4).map((color, idx) => (
                <span
                  key={idx}
                  className="w-4 h-4 rounded-full border-2 border-white shadow ring-1 ring-royal-100 hover:scale-125 transition-transform cursor-pointer"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-royal-400 ml-0.5">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
