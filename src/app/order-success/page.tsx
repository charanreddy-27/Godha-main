'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="font-display text-4xl font-bold mb-4 text-royal-900">Order Placed Successfully!</h1>
        <p className="text-lg text-royal-600 mb-2">
          Thank you for your order. Your order has been received and is being processed.
        </p>
        {orderId && (
          <p className="text-sm text-royal-500 mb-8">
            Order ID: <span className="font-mono font-semibold text-royal-900">{orderId}</span>
          </p>
        )}

        <div className="bg-ivory-50 border border-gold-200 rounded-lg p-6 mb-8 shadow-sm">
          <p className="text-royal-800 font-medium">
            🎉 <strong>Payment Status:</strong> Pending (Demo Mode)
          </p>
          <p className="text-sm text-royal-500 mt-2">
            This is a demonstration. In production, Razorpay payment gateway will handle secure transactions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-royal-900 hover:bg-royal-800 text-white w-full sm:w-auto px-8 transition-colors"
            >
              Continue Shopping
            </Button>
          </Link>
          <Link href="/admin">
            <Button
              variant="outline"
              size="lg"
              className="border-royal-200 text-royal-900 hover:bg-gold-50 w-full sm:w-auto px-8 transition-colors"
            >
              View All Orders (Admin)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
