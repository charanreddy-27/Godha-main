/**
 * Category & subcategory type definitions
 * Used by lib/categories.ts and all category-aware components
 */

export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

/** The top-level categories record keyed by slug */
export type CategoriesMap = Record<string, Category>;
