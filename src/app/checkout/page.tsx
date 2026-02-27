'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';
import { Loader2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [hasHydrated, setHasHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      router.replace('/auth');
      return;
    }
    if (items.length === 0) {
      router.replace('/cart');
    }
  }, [hasHydrated, items.length, router, user]);

  if (!hasHydrated || !user || items.length === 0) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: formData.email,
          items,
          total: getTotal(),
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          paymentMethod: 'razorpay',
          paymentStatus: 'pending',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!');
        clearCart();
        router.push('/order-success?orderId=' + data.orderId);
      } else {
        toast.error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12 text-royal-900">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6 border border-royal-100 shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-royal-50 to-ivory-50 border-b border-royal-100">
                  <CardTitle className="flex items-center gap-3 text-royal-900">
                    <div className="p-2 rounded-lg bg-royal-100/50">
                      <Truck className="h-5 w-5 text-royal-700" />
                    </div>
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-royal-900">Full Name *</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-royal-900">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-royal-900">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block text-royal-900">Address *</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, apartment, suite, etc."
                      className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block text-royal-900">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Hyderabad"
                        className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block text-royal-900">State *</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Telangana"
                        className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block text-royal-900">Pincode *</label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="500001"
                        className="border-royal-200 focus:border-gold-400 focus:ring-gold-400/20"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-royal-100 shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-royal-50 to-ivory-50 border-b border-royal-100">
                  <CardTitle className="flex items-center gap-3 text-royal-900">
                    <div className="p-2 rounded-lg bg-royal-100/50">
                      <CreditCard className="h-5 w-5 text-royal-700" />
                    </div>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="p-4 border border-gold-200 bg-gold-50/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-royal-900 rounded flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-royal-900">Razorpay Payment Gateway</p>
                        <p className="text-sm text-royal-600">Secure online payment</p>
                      </div>
                    </div>
                    <p className="text-sm text-royal-600 mt-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      Your transaction is 100% secure.
                    </p>
                  </div>
                  <p className="text-xs text-royal-400 mt-4 text-center">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full mt-6 bg-gold-500 hover:bg-gold-600 text-royal-900 font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-royal-100 shadow-lg bg-white">
              <CardHeader className="bg-royal-50 border-b border-royal-100">
                <CardTitle className="text-royal-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-ivory-100 rounded flex-shrink-0 overflow-hidden border border-royal-100 relative">
                        {item.images && item.images[0] ? (
                          <Image src={item.images[0]} alt={item.name} fill sizes="64px" className="object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">👗</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1 text-royal-900">{item.name}</p>
                        <p className="text-sm text-royal-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-royal-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-royal-100 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-royal-600">Subtotal</span>
                    <span className="font-semibold text-royal-900">₹{getTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-royal-100 pt-3 flex justify-between text-lg">
                    <span className="font-bold text-royal-900">Total</span>
                    <span className="font-bold text-royal-900">₹{getTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
