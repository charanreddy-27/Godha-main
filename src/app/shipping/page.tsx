import { PageHeader } from '@/components/layout/PageHeader';
import { Truck, Clock, MapPin, Shield } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | Godha Collections',
  description: 'Learn about our shipping methods, delivery timelines, and free delivery policy.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Shipping Policy"
        subtitle="Free shipping across India on all orders"
        breadcrumbs={[{ label: 'Shipping Policy' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-royal-50 space-y-10">
          <section className="flex gap-4">
            <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-royal-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Free Delivery</h2>
              <p className="text-royal-600 leading-relaxed">
                We offer complimentary shipping on all orders across India. No minimum order value is required.
                Our trusted logistics partners ensure your products reach you safely.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-royal-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Delivery Timelines</h2>
              <ul className="text-royal-600 leading-relaxed space-y-2 list-disc list-inside">
                <li>Metro cities: 3-5 business days</li>
                <li>Tier 2 cities: 5-7 business days</li>
                <li>Other areas: 7-10 business days</li>
              </ul>
            </div>
          </section>

          <section className="flex gap-4">
            <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-royal-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Order Tracking</h2>
              <p className="text-royal-600 leading-relaxed">
                Once your order is shipped, you will receive a tracking number via email and SMS.
                You can track your order status anytime through our website.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-royal-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Packaging</h2>
              <p className="text-royal-600 leading-relaxed">
                Each product is carefully packaged in premium, eco-friendly packaging to ensure it arrives in
                perfect condition. Sarees and delicate fabrics are wrapped in protective tissue paper.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
