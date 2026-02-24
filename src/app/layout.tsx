import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';
import { Analytics } from '@/components/shared/Analytics';
import { WebsiteJsonLd } from '@/components/shared/JsonLd';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Godha Collections - Premium Ethnic Wear & Sarees',
  description:
    'Discover the finest collection of ethnic wear, dresses, and traditional sarees at Godha Collections. Handcrafted elegance from India.',
  keywords: [
    'sarees',
    'ethnic wear',
    'kanchivaram',
    'kalamkari',
    'kurtis',
    'lehenga',
    'indian fashion',
  ],
  openGraph: {
    title: 'Godha Collections - Premium Ethnic Wear & Sarees',
    description:
      'Discover handcrafted sarees, elegant lehengas, and contemporary ethnic fashion.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E3A5F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <WebsiteJsonLd />
      </head>
      <body className={dmSans.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
