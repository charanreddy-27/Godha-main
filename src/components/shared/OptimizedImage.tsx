'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'product';
  fallbackEmoji?: string;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-video',
  product: 'aspect-[3/4]',
};

/**
 * Optimized image component with:
 * - Next.js Image optimization (lazy loading, responsive sizes, WebP)
 * - Blur placeholder while loading
 * - Graceful fallback on error
 * - Responsive sizing by default
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  aspectRatio,
  fallbackEmoji = '👗',
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ivory-50 to-gold-50/20 ${
          aspectRatio ? aspectRatioClasses[aspectRatio] : ''
        } ${className}`}
      >
        <div className="text-center">
          <span className="text-5xl block mb-2">{fallbackEmoji}</span>
          <span className="text-[11px] text-royal-400 tracking-wider uppercase font-medium">
            Image unavailable
          </span>
        </div>
      </div>
    );
  }

  // External URL or Firebase Storage — use fill mode or explicit dimensions
  const isExternal = src.startsWith('http');

  if (fill) {
    return (
      <div className={`relative ${aspectRatio ? aspectRatioClasses[aspectRatio] : ''} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          quality={80}
          {...(isExternal ? {} : { placeholder: 'empty' })}
        />
        {!loaded && (
          <div className="absolute inset-0 bg-ivory-100 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 533}
      sizes={sizes}
      priority={priority}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      quality={80}
    />
  );
}
