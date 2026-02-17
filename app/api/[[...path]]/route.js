import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Helper to get path segments
function getPathSegments(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace('/api/', '');
  return pathname.split('/').filter(Boolean);
}

// Helper to get query params
function getQueryParams(request) {
  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams);
}

// ============== PRODUCTS ==============

async function handleGetProducts(request) {
  try {
    const params = getQueryParams(request);
    const { category, subCategory, limit: limitParam, search } = params;

    let q = collection(db, 'products');
    const constraints = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }
    if (subCategory) {
      constraints.push(where('subCategory', '==', subCategory));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (limitParam) {
      constraints.push(firestoreLimit(parseInt(limitParam)));
    }

    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Client-side search if needed
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

async function handleGetProduct(productId) {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      product: { id: docSnap.id, ...docSnap.data() },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

async function handleCreateProduct(request) {
  try {
    const data = await request.json();
    const {
      name,
      price,
      category,
      subCategory,
      description,
      images,
      stock,
      sizes,
      colors,
    } = data;

    // Validation
    if (!name || !price || !category || !subCategory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = {
      name,
      price: parseFloat(price),
      category,
      subCategory,
      description: description || '',
      images: images || [],
      stock: parseInt(stock) || 0,
      sizes: sizes || [],
      colors: colors || [],
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'products'), product);

    return NextResponse.json(
      { message: 'Product created', productId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

async function handleUpdateProduct(productId, request) {
  try {
    const data = await request.json();
    const docRef = doc(db, 'products', productId);

    // Check if exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update only provided fields
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.subCategory !== undefined)
      updateData.subCategory = data.subCategory;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.stock !== undefined) updateData.stock = parseInt(data.stock);
    if (data.sizes !== undefined) updateData.sizes = data.sizes;
    if (data.colors !== undefined) updateData.colors = data.colors;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

async function handleDeleteProduct(productId) {
  try {
    const docRef = doc(db, 'products', productId);
    
    // Check if exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

// ============== ORDERS ==============

async function handleGetOrders(request) {
  try {
    const params = getQueryParams(request);
    const { userId } = params;

    let q = collection(db, 'orders');
    
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

async function handleCreateOrder(request) {
  try {
    const data = await request.json();
    const {
      userId,
      userEmail,
      items,
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus,
    } = data;

    // Validation
    if (!userId || !items || items.length === 0 || !total || !shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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

    return NextResponse.json(
      { message: 'Order created', orderId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

async function handleUpdateOrder(orderId, request) {
  try {
    const data = await request.json();
    const docRef = doc(db, 'orders', orderId);

    // Check if exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updateData = {};
    if (data.orderStatus !== undefined) updateData.orderStatus = data.orderStatus;
    if (data.paymentStatus !== undefined)
      updateData.paymentStatus = data.paymentStatus;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ message: 'Order updated' });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// ============== IMAGE UPLOAD ==============

async function handleImageUpload(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `products/${filename}`);

    // Upload to Firebase Storage
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// ============== MAIN ROUTER ==============

export async function GET(request) {
  const segments = getPathSegments(request);

  // Products
  if (segments[0] === 'products' && !segments[1]) {
    return handleGetProducts(request);
  }
  if (segments[0] === 'products' && segments[1]) {
    return handleGetProduct(segments[1]);
  }

  // Orders
  if (segments[0] === 'orders') {
    return handleGetOrders(request);
  }

  return NextResponse.json({ message: 'Godha Collections API' });
}

export async function POST(request) {
  const segments = getPathSegments(request);

  // Products
  if (segments[0] === 'products' && !segments[1]) {
    return handleCreateProduct(request);
  }

  // Orders
  if (segments[0] === 'orders' && !segments[1]) {
    return handleCreateOrder(request);
  }

  // Image Upload
  if (segments[0] === 'upload') {
    return handleImageUpload(request);
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}

export async function PUT(request) {
  const segments = getPathSegments(request);

  // Products
  if (segments[0] === 'products' && segments[1]) {
    return handleUpdateProduct(segments[1], request);
  }

  // Orders
  if (segments[0] === 'orders' && segments[1]) {
    return handleUpdateOrder(segments[1], request);
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}

export async function DELETE(request) {
  const segments = getPathSegments(request);

  // Products
  if (segments[0] === 'products' && segments[1]) {
    return handleDeleteProduct(segments[1]);
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}
