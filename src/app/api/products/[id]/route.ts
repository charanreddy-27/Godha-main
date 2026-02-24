import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { validateProductInput } from '@/lib/validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id] — Get single product
export async function GET(request: NextRequest, context: RouteContext) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 120 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { id } = await context.params;
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: { id: docSnap.id, ...docSnap.data() } });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id] — Update product
export async function PUT(request: NextRequest, context: RouteContext) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 30 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { id } = await context.params;
    const data = await request.json();
    const docRef = doc(db, 'products', id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Validate input (partial updates ok — only validate provided fields)
    const validation = validateProductInput({ ...docSnap.data(), ...data });
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const validated = validation.data;
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = validated.name;
    if (data.price !== undefined) updateData.price = validated.price;
    if (data.originalPrice !== undefined) updateData.originalPrice = validated.originalPrice;
    if (data.category !== undefined) updateData.category = validated.category;
    if (data.subCategory !== undefined) updateData.subCategory = validated.subCategory;
    if (data.description !== undefined) updateData.description = validated.description;
    if (data.images !== undefined) updateData.images = validated.images;
    if (data.stock !== undefined) updateData.stock = validated.stock;
    if (data.sizes !== undefined) updateData.sizes = validated.sizes;
    if (data.colors !== undefined) updateData.colors = validated.colors;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] — Delete product
export async function DELETE(request: NextRequest, context: RouteContext) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 30 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { id } = await context.params;
    const docRef = doc(db, 'products', id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
