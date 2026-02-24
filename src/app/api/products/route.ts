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

// GET /api/products — List & filter products
export async function GET(request: NextRequest) {
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
  try {
    const data = await request.json();
    const { name, price, category, subCategory, description, images, stock, sizes, colors, originalPrice } = data;

    if (!name || !price || !category || !subCategory) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = {
      name,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      category,
      subCategory,
      description: description || '',
      images: images || [],
      stock: parseInt(stock, 10) || 0,
      sizes: sizes || [],
      colors: colors || [],
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'products'), product);

    return NextResponse.json({ message: 'Product created', productId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
