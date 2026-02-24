import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
} from 'firebase/firestore';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { validateProductInput } from '@/lib/validation';

// GET /api/products — List & filter products
export async function GET(request: NextRequest) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 120 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const limitParam = searchParams.get('limit');
    const search = searchParams.get('search');

    const constraints: Parameters<typeof query>[1][] = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }
    if (subCategory) {
      constraints.push(where('subCategory', '==', subCategory));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (limitParam) {
      constraints.push(firestoreLimit(parseInt(limitParam, 10)));
    }

    const q = constraints.length > 0
      ? query(collection(db, 'products'), ...constraints)
      : collection(db, 'products');

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map((d: { id: string; data: () => Record<string, unknown> }) => ({
      id: d.id,
      ...d.data(),
    }));

    // Client-side search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      products = products.filter(
        (p: Record<string, unknown>) =>
          p.name?.toString().toLowerCase().includes(searchLower) ||
          p.description?.toString().toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products — Create product
export async function POST(request: NextRequest) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 30 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const data = await request.json();
    const validation = validateProductInput(data);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const validated = validation.data;

    const product = {
      name: validated.name,
      price: validated.price,
      originalPrice: validated.originalPrice,
      category: validated.category,
      subCategory: validated.subCategory,
      description: validated.description,
      images: validated.images,
      stock: validated.stock,
      sizes: validated.sizes,
      colors: validated.colors,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'products'), product);

    return NextResponse.json({ message: 'Product created', productId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
