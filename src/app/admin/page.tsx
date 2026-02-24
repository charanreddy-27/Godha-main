'use client';

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/categories';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  Layers3,
  RefreshCcw,
} from 'lucide-react';
import type { Product } from '@/types';

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  subCategory: string;
  description: string;
  stock: string;
  sizes: string;
  colors: string;
  imageUrl: string;
}

interface OrderData {
  id: string;
  userEmail?: string;
  total?: number;
  paymentStatus?: string;
  items?: unknown[];
  shippingAddress?: { address?: string; city?: string };
}

const emptyForm: ProductFormData = {
  name: '',
  price: '',
  category: '',
  subCategory: '',
  description: '',
  stock: '',
  sizes: '',
  colors: '',
  imageUrl: '',
};

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({ ...emptyForm });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ ...formData, imageUrl: data.url });
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.subCategory) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        subCategory: formData.subCategory,
        description: formData.description,
        stock: parseInt(formData.stock, 10) || 0,
        sizes: formData.sizes ? formData.sizes.split(',').map((s) => s.trim()) : [],
        colors: formData.colors ? formData.colors.split(',').map((c) => c.trim()) : [],
        images: formData.imageUrl ? [formData.imageUrl] : [],
      };

      let response: Response;
      if (editingProduct) {
        response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (response.ok) {
        toast.success(editingProduct ? 'Product updated!' : 'Product created!');
        setFormData({ ...emptyForm });
        setEditingProduct(null);
        fetchProducts();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      subCategory: product.subCategory,
      description: product.description || '',
      stock: product.stock?.toString() || '0',
      sizes: product.sizes?.join(', ') || '',
      colors: product.colors?.join(', ') || '',
      imageUrl: product.images?.[0] || '',
    });
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Product deleted!');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const selectedCategory = categories[formData.category as keyof typeof categories];

  const collectionStats = Object.values(categories).map((category) => {
    const categoryProducts = products.filter((p) => p.category === category.slug);
    const subcategoryBreakdown = category.subcategories
      .map((sub) => ({
        slug: sub.slug,
        name: sub.name,
        count: categoryProducts.filter((p) => p.subCategory === sub.slug).length,
      }))
      .filter((sub) => sub.count > 0);

    return { ...category, total: categoryProducts.length, subcategoryBreakdown };
  });

  const jumpToProductForm = (categorySlug = '') => {
    setActiveTab('products');
    setEditingProduct(null);
    setFormData((prev) => ({ ...prev, category: categorySlug, subCategory: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-royal-950 via-royal-900 to-gold-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-royal-200">Manage your products and orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="collections">
              <Layers3 className="mr-2 h-4 w-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Product Name *</label>
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Elegant Silk Kurtis" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Price (₹) *</label>
                      <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="2499" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category *</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: '' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(categories).map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Sub-Category *</label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                        disabled={!formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sub-category" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory?.subcategories.map((sub) => (
                            <SelectItem key={sub.slug} value={sub.slug}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Stock Quantity *</label>
                      <Input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="50" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Sizes (comma-separated)</label>
                      <Input name="sizes" value={formData.sizes} onChange={handleChange} placeholder="S, M, L, XL" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Colors (comma-separated)</label>
                      <Input name="colors" value={formData.colors} onChange={handleChange} placeholder="Red, Blue, Green" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Upload Image</label>
                      <div className="flex gap-2">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
                        {formData.imageUrl && (
                          <div className="w-12 h-12 rounded border border-gray-300 overflow-hidden flex-shrink-0">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed product description..." rows={4} />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-royal-900 hover:bg-royal-800" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : editingProduct ? (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Update Product
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Product
                        </>
                      )}
                    </Button>

                    {editingProduct && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(null);
                          setFormData({ ...emptyForm });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>All Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No products yet. Add your first product above!</p>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-ivory-50 to-gold-50 rounded overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">👗</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {product.category} &bull; {product.subCategory}
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold text-royal-900">₹{product.price?.toLocaleString('en-IN')}</span>
                            {' • Stock: '}
                            {product.stock}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Collection Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={fetchProducts} disabled={loading}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refresh Collections
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Manage individual items in the Products tab. Use the collections overview below to track inventory.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Collections Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {collectionStats.map((cat) => (
                    <div key={cat.slug} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900">{cat.name}</h3>
                        <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-royal-50 text-royal-700">
                          {cat.total}
                        </span>
                      </div>

                      {cat.subcategoryBreakdown.length > 0 ? (
                        <div className="space-y-2 mb-4">
                          {cat.subcategoryBreakdown.map((sub) => (
                            <div key={sub.slug} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{sub.name}</span>
                              <span className="text-gray-500">{sub.count}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mb-4">No products in this collection yet.</p>
                      )}

                      <Button type="button" variant="outline" size="sm" onClick={() => jumpToProductForm(cat.slug)}>
                        Add to {cat.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>All Orders ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No orders yet. Orders will appear here once customers make purchases.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-600">{order.userEmail}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-royal-900">₹{order.total?.toLocaleString('en-IN')}</p>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Items:</strong> {order.items?.length || 0}
                          </p>
                          <p>
                            <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
