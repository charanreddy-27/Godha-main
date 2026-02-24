/**
 * Product Service Layer
 *
 * Centralised Firestore CRUD operations for the `products` collection.
 * Used by API routes — keeps Firestore logic out of route handlers.
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product, ProductFilters } from '@/types';

const COLLECTION = 'products';

/** Fetch products with optional filters */
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const constraints = [];

  if (filters.category) {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters.subCategory) {
    constraints.push(where('subCategory', '==', filters.subCategory));
  }

  constraints.push(orderBy('createdAt', 'desc'));

  if (filters.limit) {
    constraints.push(firestoreLimit(filters.limit));
  }

  const q = query(collection(db, COLLECTION), ...constraints);
  const snapshot = await getDocs(q);

  let products = snapshot.docs.map((d: { id: string; data: () => Record<string, unknown> }) => ({
    id: d.id,
    ...d.data(),
  })) as Product[];

  // Client-side text search (Firestore doesn't support full-text search)
  if (filters.search?.trim()) {
    const term = filters.search.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }

  // Client-side sorting
  if (filters.sortBy === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
}

/** Fetch a single product by its Firestore document ID */
export async function getProductById(productId: string): Promise<Product | null> {
  const docRef = doc(db, COLLECTION, productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() } as Product;
}

/** Create a new product document */
export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Update an existing product (partial update) */
export async function updateProduct(
  productId: string,
  data: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<void> {
  const docRef = doc(db, COLLECTION, productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Product not found');
  }

  await updateDoc(docRef, data);
}

/** Delete a product by ID */
export async function deleteProduct(productId: string): Promise<void> {
  const docRef = doc(db, COLLECTION, productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Product not found');
  }

  await deleteDoc(docRef);
}
