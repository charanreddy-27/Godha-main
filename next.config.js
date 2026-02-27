/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // Enable Next.js image optimization for production performance
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    // Serve modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimise device sizes for common breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Compress responses
  compress: true,
  // Enable React strict mode for better development
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob: https://*.googleapis.com https://*.googleusercontent.com https://firebasestorage.googleapis.com https://images.unsplash.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com wss://*.firebaseio.com https://www.google-analytics.com https://www.googletagmanager.com;",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache optimised images
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // Cache public assets (favicon, manifest, etc.)
      {
        source: "/(.*\\.(?:ico|png|svg|jpg|jpeg|webp|avif|woff|woff2))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
