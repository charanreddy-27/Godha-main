'use client';

import { useEffect } from 'react';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/lib/store';
import { isDemoAuthMode } from '@/lib/auth-mode';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

function AuthProvider({ children }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    if (isDemoAuthMode) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Godha Collections - Premium Ethnic Wear & Sarees</title>
        <meta
          name="description"
          content="Discover the finest collection of ethnic wear, dresses, and traditional sarees at Godha Collections"
        />
      </head>
      <body className={dmSans.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
