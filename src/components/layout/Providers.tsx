'use client';

import { useAuth } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(
  () => import('@/components/shared/WhatsAppButton').then((m) => m.WhatsAppButton),
  { ssr: false }
);

/**
 * Client boundary that wraps the entire app.
 * Handles auth listener setup and global toaster.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // Starts Firebase onAuthStateChanged listener
  useAuth();

  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton />
      <WhatsAppButton />
    </>
  );
}
