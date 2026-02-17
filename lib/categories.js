// Category definitions for Godha Collections - Indian Ethnic Fashion
export const categories = {
  ethnic: {
    name: "Ethnic",
    slug: "ethnic",
    subcategories: [
      { name: "Kurtis", slug: "kurtis" },
      { name: "2 Piece Sets", slug: "2-piece-sets" },
      { name: "3 Piece Sets", slug: "3-piece-sets" },
      { name: "Lehanga Sets", slug: "lehanga-sets" },
    ],
  },
  dresses: {
    name: "Dresses",
    slug: "dresses",
    subcategories: [
      { name: "Frocks", slug: "frocks" },
      { name: "Indo-Western", slug: "indo-western" },
    ],
  },
  sarees: {
    name: "Sarees",
    slug: "sarees",
    subcategories: [
      { name: "Mangalgiri", slug: "mangalgiri" },
      { name: "Kalamkari", slug: "kalamkari" },
      { name: "Dharmavaram", slug: "dharmavaram" },
      { name: "Gadwal", slug: "gadwal" },
      { name: "Kanchivaram", slug: "kanchivaram" },
      { name: "Bengal", slug: "bengal" },
      { name: "Pochampally", slug: "pochampally" },
    ],
  },
};

// Helper function to get category by slug
export function getCategoryBySlug(slug) {
  return Object.values(categories).find((cat) => cat.slug === slug);
}

// Helper function to get subcategory by slug
export function getSubcategoryBySlug(categorySlug, subcategorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  return category.subcategories.find((sub) => sub.slug === subcategorySlug);
}

// Get all categories as an array
export function getAllCategories() {
  return Object.values(categories);
}

// Get all subcategories for a category
export function getSubcategories(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  return category ? category.subcategories : [];
}
