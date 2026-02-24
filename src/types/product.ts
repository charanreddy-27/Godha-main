/**
 * Product-related type definitions
 * Matches the Firestore `products` collection schema
 */

/** Valid product categories aligned with store sections */
export type ProductCategory = 'dresses' | 'sarees' | 'ethnic-wear';

/** Product document as stored in Firestore */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subCategory: string;
  images: string[];
  stock: number;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  isNew?: boolean;
  createdAt?: unknown; // Firestore Timestamp
}

/** Shape used when creating/editing a product via the admin form */
export interface ProductFormData {
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  subCategory: string;
  description: string;
  stock: string;
  sizes: string;
  colors: string;
  imageUrl: string;
}

/** Query filters for fetching product lists */
export interface ProductFilters {
  category?: string;
  subCategory?: string;
  limit?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest';
}
