'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  align?: 'center' | 'left';
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  className,
  align = 'center',
}: PageHeaderProps) {
  return (
    <div className={cn('relative bg-royal-900 overflow-hidden', className)}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-800 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
        <div
          className={cn(
            'max-w-4xl',
            align === 'center' ? 'mx-auto text-center' : 'text-left'
          )}
        >
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav
              className={cn(
                'flex items-center gap-2 text-sm text-royal-200 mb-6 animate-fade-in-up',
                align === 'center' && 'justify-center'
              )}
            >
              <Link
                href="/"
                className="hover:text-gold-300 transition-colors"
              >
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gold-500/50" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-gold-300 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gold-100 font-medium">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Title */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-lg md:text-xl text-royal-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
    </div>
  );
}
