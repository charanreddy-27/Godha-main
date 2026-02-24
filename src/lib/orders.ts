/**
 * Order Service Layer
 *
 * Centralised Firestore operations for the `orders` collection.
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Order, CreateOrderPayload, OrderStatus, PaymentStatus } from '@/types';

const COLLECTION = 'orders';

/** Create a new order */
export async function createOrder(payload: CreateOrderPayload): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...payload,
    orderStatus: 'processing' as OrderStatus,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Fetch all orders (admin) or filter by userId */
export async function getOrders(userId?: string): Promise<Order[]> {
  let q;

  if (userId) {
    q = query(
      collection(db, COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
  } else {
    q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d: { id: string; data: () => Record<string, unknown> }) => ({
    id: d.id,
    ...d.data(),
  })) as Order[];
}

/** Fetch a single order by ID */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const docRef = doc(db, COLLECTION, orderId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() } as Order;
}

/** Update order status and/or payment status */
export async function updateOrderStatus(
  orderId: string,
  data: { orderStatus?: OrderStatus; paymentStatus?: PaymentStatus }
): Promise<void> {
  const docRef = doc(db, COLLECTION, orderId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Order not found');
  }

  await updateDoc(docRef, data);
}
