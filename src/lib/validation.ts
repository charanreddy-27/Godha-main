/**
 * Input validation schemas using lightweight runtime validation.
 * (No extra dependency — pure TypeScript validation.)
 *
 * Each validator returns { success: true, data } or { success: false, error }.
 */

// ─── Helpers ────────────────────────────────────────────────────
type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function ok<T>(data: T): ValidationResult<T> {
  return { success: true, data };
}

function fail<T>(error: string): ValidationResult<T> {
  return { success: false, error };
}

/** Strip HTML tags and trim */
function sanitize(s: string): string {
  return s.replace(/<[^>]*>/g, '').trim();
}

// ─── Product Validation ─────────────────────────────────────────
const VALID_CATEGORIES = ['dresses', 'sarees', 'ethnic-wear'] as const;

export interface ValidatedProductInput {
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  subCategory: string;
  description: string;
  images: string[];
  stock: number;
  sizes: string[];
  colors: string[];
}

export function validateProductInput(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): ValidationResult<ValidatedProductInput> {
  if (!data || typeof data !== 'object') {
    return fail('Request body must be a JSON object');
  }

  // Name
  const name = sanitize(String(data.name || ''));
  if (name.length < 3) return fail('Product name must be at least 3 characters');
  if (name.length > 200) return fail('Product name must be under 200 characters');

  // Price
  const price = parseFloat(data.price);
  if (isNaN(price) || price <= 0) return fail('Price must be a positive number');
  if (price > 10_000_000) return fail('Price exceeds maximum allowed value');

  // Original Price
  let originalPrice: number | null = null;
  if (data.originalPrice !== undefined && data.originalPrice !== null && data.originalPrice !== '') {
    originalPrice = parseFloat(data.originalPrice);
    if (isNaN(originalPrice) || originalPrice < 0) {
      return fail('Original price must be a non-negative number');
    }
  }

  // Category
  const category = sanitize(String(data.category || ''));
  if (!VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
    return fail(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  // Sub-category
  const subCategory = sanitize(String(data.subCategory || ''));
  if (subCategory.length < 1) return fail('Sub-category is required');
  if (subCategory.length > 100) return fail('Sub-category must be under 100 characters');

  // Description
  const description = sanitize(String(data.description || ''));
  if (description.length > 5000) return fail('Description must be under 5000 characters');

  // Images
  const images: string[] = Array.isArray(data.images)
    ? data.images.filter(
        (img: unknown) =>
          typeof img === 'string' && img.length > 0 && img.length < 2000
      )
    : [];

  // Stock
  const stock = parseInt(String(data.stock || '0'), 10);
  if (isNaN(stock) || stock < 0) return fail('Stock must be a non-negative integer');
  if (stock > 999_999) return fail('Stock exceeds maximum allowed value');

  // Sizes
  const sizes: string[] = Array.isArray(data.sizes)
    ? data.sizes.filter(
        (s: unknown) => typeof s === 'string' && s.trim().length > 0
      ).map((s: string) => sanitize(s))
    : [];

  // Colors
  const colors: string[] = Array.isArray(data.colors)
    ? data.colors.filter(
        (c: unknown) => typeof c === 'string' && c.trim().length > 0
      ).map((c: string) => sanitize(c))
    : [];

  return ok({
    name,
    price,
    originalPrice,
    category,
    subCategory,
    description,
    images,
    stock,
    sizes,
    colors,
  });
}

// ─── Order Validation ───────────────────────────────────────────
export interface ValidatedOrderInput {
  userId: string;
  userEmail: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentStatus: string;
}

export function validateOrderInput(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): ValidationResult<ValidatedOrderInput> {
  if (!data || typeof data !== 'object') {
    return fail('Request body must be a JSON object');
  }

  const userId = sanitize(String(data.userId || ''));
  if (!userId) return fail('User ID is required');

  const userEmail = sanitize(String(data.userEmail || ''));

  // Items
  if (!Array.isArray(data.items) || data.items.length === 0) {
    return fail('Order must contain at least one item');
  }

  const items = data.items.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: sanitize(String(item.id || '')),
      name: sanitize(String(item.name || '')),
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity, 10) || 1,
    })
  );

  // Total
  const total = parseFloat(data.total);
  if (isNaN(total) || total <= 0) return fail('Total must be a positive number');

  // Shipping address
  const addr = data.shippingAddress;
  if (!addr || typeof addr !== 'object') {
    return fail('Shipping address is required');
  }

  const fullName = sanitize(String(addr.fullName || addr.name || ''));
  if (fullName.length < 2) return fail('Full name must be at least 2 characters');
  if (fullName.length > 100) return fail('Full name must be under 100 characters');

  const phone = sanitize(String(addr.phone || ''));
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return fail('Please enter a valid 10-digit Indian phone number');
  }

  const address = sanitize(String(addr.address || ''));
  if (address.length < 10) return fail('Address must be at least 10 characters');
  if (address.length > 500) return fail('Address must be under 500 characters');

  const city = sanitize(String(addr.city || ''));
  if (city.length < 2) return fail('City is required');

  const state = sanitize(String(addr.state || ''));
  if (state.length < 2) return fail('State is required');

  const pincode = sanitize(String(addr.pincode || ''));
  if (!/^\d{6}$/.test(pincode)) return fail('Please enter a valid 6-digit pincode');

  const paymentMethod = sanitize(String(data.paymentMethod || 'razorpay'));
  const paymentStatus = sanitize(String(data.paymentStatus || 'pending'));

  return ok({
    userId,
    userEmail,
    items,
    total,
    shippingAddress: { fullName, phone, address, city, state, pincode },
    paymentMethod,
    paymentStatus,
  });
}

// ─── Upload Validation ──────────────────────────────────────────
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateUploadFile(
  file: File | null
): ValidationResult<File> {
  if (!file) return fail('No file provided');

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return fail(`Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.map((t) => t.split('/')[1]).join(', ')}`);
  }

  if (file.size > MAX_FILE_SIZE) {
    return fail('File size must be under 5 MB');
  }

  if (file.name && file.name.length > 255) {
    return fail('File name is too long');
  }

  return ok(file);
}
