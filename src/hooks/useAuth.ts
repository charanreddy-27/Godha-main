'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth';
import { useAuthStore } from '@/stores/auth-store';
import type { AuthUser } from '@/types';

/**
 * Listens to Firebase auth changes and syncs to Zustand.
 */
export function useAuth() {
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
      if (firebaseUser) {
        const role = await getUserRole(firebaseUser.uid);
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role,
        };
        setUser(authUser);
      } else {
        clearUser();
      }
    });

    return unsubscribe;
  }, [setUser, clearUser]);

  return { user, isLoggedIn: !!user, isAdmin: user?.role === 'admin' };
}
