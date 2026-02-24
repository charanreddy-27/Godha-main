export const demoProducts = [
  {
    id: 'demo-saree-1',
    name: 'Royal Kanchivaram Silk Saree',
    price: 5499,
    originalPrice: 7999,
    category: 'sarees',
    subCategory: 'kanchivaram',
    description: 'Premium woven silk saree with real zari border and traditional temple motifs. Handcrafted by master weavers of Kanchipuram.',
    images: ['/images/demo-saree-royal.svg'],
    stock: 12,
    sizes: ['Free Size'],
    colors: ['Gold', 'Maroon', 'Navy'],
    isNew: true,
  },
  {
    id: 'demo-saree-2',
    name: 'Elegant Kalamkari Printed Saree',
    price: 3299,
    originalPrice: 4499,
    category: 'sarees',
    subCategory: 'kalamkari',
    description: 'Handcrafted kalamkari-inspired print with soft drape, perfect for festive occasions.',
    images: ['/images/demo-saree-kalamkari.svg'],
    stock: 18,
    sizes: ['Free Size'],
    colors: ['Mustard', 'Teal', 'Indigo'],
  },
  {
    id: 'demo-saree-3',
    name: 'Classic Gadwal Border Saree',
    price: 4199,
    originalPrice: 5299,
    category: 'sarees',
    subCategory: 'gadwal',
    description: 'Lightweight Gadwal weave with rich contrast border for wedding and festive wear.',
    images: ['/images/demo-saree-gadwal.svg'],
    stock: 10,
    sizes: ['Free Size'],
    colors: ['Green', 'Cream', 'Wine'],
  },
  {
    id: 'demo-ethnic-1',
    name: 'Teal Embroidered Kurti',
    price: 1899,
    originalPrice: 2499,
    category: 'ethnic',
    subCategory: 'kurtis',
    description: 'Breezy A-line kurti with delicate thread embroidery and mandarin collar.',
    images: ['/images/demo-kurti-teal.svg'],
    stock: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Teal', 'Coral', 'Ivory'],
    isNew: true,
  },
  {
    id: 'demo-ethnic-2',
    name: 'Royal Purple Lehanga Set',
    price: 7999,
    originalPrice: 11999,
    category: 'ethnic',
    subCategory: 'lehanga-sets',
    description: 'Stunning lehanga choli with mirror work, zari embroidery and net dupatta.',
    images: ['/images/demo-lehanga-purple.svg'],
    stock: 6,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Purple', 'Magenta', 'Royal Blue'],
    isNew: true,
  },
  {
    id: 'demo-ethnic-3',
    name: 'Classic Blue 3-Piece Set',
    price: 3499,
    originalPrice: 4999,
    category: 'ethnic',
    subCategory: '3-piece-sets',
    description: 'Elegant kurta with palazzo pants and chiffon dupatta. Perfect for daily and party wear.',
    images: ['/images/demo-3piece-blue.svg'],
    stock: 22,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Sage', 'Dusty Rose'],
  },
  {
    id: 'demo-dress-1',
    name: 'Floral Party Frock',
    price: 2499,
    originalPrice: 3299,
    category: 'dresses',
    subCategory: 'frocks',
    description: 'Layered floral frock with premium lining, perfect for celebrations.',
    images: ['/images/demo-dress-floral.svg'],
    stock: 24,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Lavender', 'White'],
  },
  {
    id: 'demo-dress-2',
    name: 'Indo-Western Anarkali Dress',
    price: 3799,
    originalPrice: 4999,
    category: 'dresses',
    subCategory: 'indo-western',
    description: 'Contemporary indo-western silhouette with rich embroidery accents.',
    images: ['/images/demo-dress-indo.svg'],
    stock: 15,
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy', 'Rose', 'Ivory'],
    isNew: true,
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
    colors: ['Peach', 'Olive', 'Rust'],
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
