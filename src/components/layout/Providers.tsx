'use client';

import { useAuth } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/sonner';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

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
