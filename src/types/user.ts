/**
 * User-related type definitions
 * Matches the Firestore `users` collection schema
 */

/** Role determines access level throughout the app */
export type UserRole = 'admin' | 'customer';

/** User document as stored in Firestore */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: unknown; // Firestore Timestamp
}

/** Minimal user info stored in Zustand auth state */
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role?: UserRole;
}
