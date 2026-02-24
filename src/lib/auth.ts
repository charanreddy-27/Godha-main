/**
 * Authentication Service Layer
 *
 * Centralises all Firebase Auth operations so components don't
 * import Firebase SDK directly. Includes user profile creation
 * in Firestore on sign-up for role-based access control.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { AuthUser, UserRole } from '@/types';

/** Sign in with email and password */
export async function signInWithEmail(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** Create a new account and initialise user profile in Firestore */
export async function signUpWithEmail(
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  // Create user document in Firestore with default 'customer' role
  await createUserProfile(credential.user.uid, {
    email,
    name: email.split('@')[0],
    role: 'customer',
  });

  return credential;
}

/** Sign in with Google popup */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  // Create user profile if it doesn't exist yet
  const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
  if (!userDoc.exists()) {
    await createUserProfile(credential.user.uid, {
      email: credential.user.email || '',
      name: credential.user.displayName || credential.user.email?.split('@')[0] || 'User',
      role: 'customer',
    });
  }

  return credential;
}

/** Sign out the current user */
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

/** Create or update user profile document in Firestore */
async function createUserProfile(
  uid: string,
  data: { email: string; name: string; role: UserRole }
): Promise<void> {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/** Fetch user role from Firestore (used for admin checks) */
export async function getUserRole(uid: string): Promise<UserRole> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return (userDoc.data().role as UserRole) || 'customer';
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
  }
  return 'customer';
}
