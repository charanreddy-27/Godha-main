/**
 * Category Definitions — Godha Collections
 *
 * Preserves the exact category hierarchy from the original codebase.
 * Categories: Ethnic Wear (was "Ethnic"), Dresses, Sarees
 * Each category has subcategories for granular product organisation.
 */

import type { CategoriesMap, Category, Subcategory } from '@/types';

export const categories: CategoriesMap = {
  'ethnic-wear': {
    name: 'Ethnic Wear',
    slug: 'ethnic-wear',
    subcategories: [
      { name: 'Kurtis', slug: 'kurtis' },
      { name: '2 Piece Sets', slug: '2-piece-sets' },
      { name: '3 Piece Sets', slug: '3-piece-sets' },
      { name: 'Lehanga Sets', slug: 'lehanga-sets' },
    ],
  },
  dresses: {
    name: 'Dresses',
    slug: 'dresses',
    subcategories: [
      { name: 'Frocks', slug: 'frocks' },
      { name: 'Indo-Western', slug: 'indo-western' },
    ],
  },
  sarees: {
    name: 'Sarees',
    slug: 'sarees',
    subcategories: [
      { name: 'Mangalgiri', slug: 'mangalgiri' },
      { name: 'Kalamkari', slug: 'kalamkari' },
      { name: 'Dharmavaram', slug: 'dharmavaram' },
      { name: 'Gadwal', slug: 'gadwal' },
      { name: 'Kanchivaram', slug: 'kanchivaram' },
      { name: 'Bengal', slug: 'bengal' },
      { name: 'Pochampally', slug: 'pochampally' },
    ],
  },
};

/** Look up a category by its URL slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories[slug];
}

/** Look up a subcategory within a given category */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find((sub) => sub.slug === subcategorySlug);
}
