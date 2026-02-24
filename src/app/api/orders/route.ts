import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

// GET /api/orders — List orders (optionally by userId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const constraints: Parameters<typeof query>[1][] = [];

    if (userId) {
      constraints.push(where('userId', '==', userId));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    const q = constraints.length > 0
      ? query(collection(db, 'orders'), ...constraints)
      : collection(db, 'orders');

    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map((d: { id: string; data: () => Record<string, unknown> }) => ({
      id: d.id,
      ...d.data(),
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST /api/orders — Create order
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, userEmail, items, total, shippingAddress, paymentMethod, paymentStatus } = data;

    if (!userId || !items || items.length === 0 || !total || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = {
      userId,
      userEmail: userEmail || '',
      items,
      total: parseFloat(total),
      shippingAddress,
      paymentMethod: paymentMethod || 'razorpay',
      paymentStatus: paymentStatus || 'pending',
      orderStatus: 'processing',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'orders'), order);

    return NextResponse.json({ message: 'Order created', orderId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
