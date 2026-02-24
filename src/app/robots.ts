import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://godhacollections.com';

export default function robots(): MetadataRoute['robots'] {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/order-success', '/auth'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
