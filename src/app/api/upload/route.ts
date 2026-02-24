import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { validateUploadFile } from '@/lib/validation';

// POST /api/upload — Upload image to Firebase Storage
export async function POST(request: NextRequest) {
  const rateLimitResponse = rateLimit(getClientIp(request), { maxRequests: 20 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    const validation = validateUploadFile(file);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const validatedFile = validation.data;
    const bytes = await validatedFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${validatedFile.name}`;
    const storageRef = ref(storage, `products/${filename}`);

    await uploadBytes(storageRef, buffer, {
      contentType: validatedFile.type,
    });

    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
