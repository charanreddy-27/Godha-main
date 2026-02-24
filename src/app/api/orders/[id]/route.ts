import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/orders/[id] — Get single order
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: { id: docSnap.id, ...docSnap.data() } });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

// PATCH /api/orders/[id] — Update order status
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    const docRef = doc(db, 'orders', id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (data.orderStatus !== undefined) updateData.orderStatus = data.orderStatus;
    if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ message: 'Order updated' });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
