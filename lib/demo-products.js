export const demoProducts = [
  {
    id: 'demo-saree-1',
    name: 'Royal Kanchivaram Silk Saree',
    price: 5499,
    category: 'sarees',
    subCategory: 'kanchivaram',
    description: 'Premium woven silk saree with zari border and traditional motifs.',
    images: ['/images/demo-saree-royal.svg'],
    stock: 12,
    sizes: ['Free Size'],
    colors: ['Gold', 'Navy', 'Maroon'],
    isNew: true,
  },
  {
    id: 'demo-saree-2',
    name: 'Elegant Kalamkari Printed Saree',
    price: 3299,
    category: 'sarees',
    subCategory: 'kalamkari',
    description: 'Handcrafted kalamkari-inspired print with soft drape and festive look.',
    images: ['/images/demo-saree-kalamkari.svg'],
    stock: 18,
    sizes: ['Free Size'],
    colors: ['Mustard', 'Teal', 'Indigo'],
  },
  {
    id: 'demo-saree-3',
    name: 'Classic Gadwal Border Saree',
    price: 4199,
    category: 'sarees',
    subCategory: 'gadwal',
    description: 'Lightweight Gadwal weave with contrast border for wedding and festive wear.',
    images: ['/images/demo-saree-gadwal.svg'],
    stock: 10,
    sizes: ['Free Size'],
    colors: ['Wine', 'Cream', 'Green'],
  },
  {
    id: 'demo-dress-1',
    name: 'Floral Party Frock',
    price: 2499,
    category: 'dresses',
    subCategory: 'frocks',
    description: 'Layered floral frock with premium lining, perfect for celebrations.',
    images: ['/images/demo-dress-floral.svg'],
    stock: 24,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Lavender', 'White'],
    isNew: true,
  },
  {
    id: 'demo-dress-2',
    name: 'Indo-Western Anarkali Dress',
    price: 3799,
    category: 'dresses',
    subCategory: 'indo-western',
    description: 'Contemporary indo-western silhouette with rich embroidery accents.',
    images: ['/images/demo-dress-indo.svg'],
    stock: 15,
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue', 'Rose', 'Ivory'],
  },
  {
    id: 'demo-dress-3',
    name: 'Festive Embroidered Maxi',
    price: 2999,
    category: 'dresses',
    subCategory: 'frocks',
    description: 'Elegant maxi dress with subtle shimmer and handcrafted neckline detailing.',
    images: ['/images/demo-dress-maxi.svg'],
    stock: 20,
    sizes: ['S', 'M', 'L'],
    colors: ['Peach', 'Gold', 'Olive'],
  },
];

export function getDemoProducts({ category, subCategory, limit } = {}) {
  let filtered = [...demoProducts];

  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (subCategory) {
    filtered = filtered.filter((product) => product.subCategory === subCategory);
  }

  if (limit && Number.isFinite(Number(limit))) {
    filtered = filtered.slice(0, Number(limit));
  }

  return filtered;
}

export function getDemoProductById(productId) {
  return demoProducts.find((product) => product.id === productId) || null;
}

export function getDemoSeedProducts() {
  return demoProducts.map(({ id, ...rest }) => rest);
}
