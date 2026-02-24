'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ivory-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-ivory-100 to-gold-100 flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-gold-600" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4 text-royal-900">Your Cart is Empty</h1>
            <p className="text-royal-600 text-lg mb-10">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-royal-900 hover:bg-royal-800 text-white px-10 py-6 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12 text-royal-900">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border border-royal-100 shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-ivory-100 to-gold-50 rounded-xl overflow-hidden shadow-md">
                    {item.images && item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        👗
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-royal-900">{item.name}</h3>
                    <p className="text-sm text-royal-600 mb-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-royal-100 text-royal-700 font-medium">{item.category}</span>
                      <span className="text-royal-400">•</span>
                      <span className="text-royal-600">{item.subCategory}</span>
                    </p>
                    <p className="text-xl font-bold text-royal-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.success('Item removed from cart');
                      }}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-1 border-2 border-royal-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:bg-royal-50 transition-colors duration-300 text-royal-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-royal-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:bg-royal-50 transition-colors duration-300 text-royal-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border border-royal-100 shadow-xl">
            <CardContent className="p-8 bg-gradient-to-br from-white via-ivory-50/30 to-gold-50/20">
              <h2 className="font-display text-3xl font-bold mb-8 text-royal-900">Order Summary</h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-royal-600 font-medium">Subtotal</span>
                  <span className="font-bold text-royal-900 text-lg">
                    ₹{getTotalPrice().toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-royal-600 font-medium">Shipping</span>
                  <span className="font-bold text-teal-600 px-3 py-1 rounded-full bg-teal-50 text-sm">FREE</span>
                </div>
                <div className="border-t-2 border-gold-200 pt-5 flex justify-between items-center">
                  <span className="font-bold text-royal-900 text-lg">Total</span>
                  <span className="font-bold text-2xl text-royal-900">
                    ₹{getTotalPrice().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-royal-900 hover:bg-royal-800 text-white py-6 rounded-xl text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 mb-4" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full border-2 border-royal-800 text-royal-800 hover:bg-royal-50 py-6 rounded-xl text-base font-semibold transition-all duration-300">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
