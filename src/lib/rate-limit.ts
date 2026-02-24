import { NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window approach per IP address.
 *
 * Note: In production with multiple instances, use Redis or
 * Vercel Edge Config for distributed rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Maximum requests in the window (default: 60) */
  maxRequests?: number;
  /** Window size in seconds (default: 60) */
  windowSizeSeconds?: number;
}

/**
 * Check and enforce rate limit for a given identifier.
 * Returns null if allowed, or a NextResponse with 429 if rate limited.
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): NextResponse | null {
  const { maxRequests = 60, windowSizeSeconds = 60 } = options;
  const now = Date.now();
  const key = identifier;

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowSizeSeconds * 1000,
    });
    return null;
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetAt).toISOString(),
        },
      }
    );
  }

  entry.count++;
  return null;
}

/**
 * Extract client IP from a NextRequest (works on Vercel & local).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return '127.0.0.1';
}
