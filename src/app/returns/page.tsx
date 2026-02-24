import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Returns & Exchanges | Godha Collections',
  description: 'Our hassle-free return and exchange policy for all Godha Collections products.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Returns & Exchanges"
        subtitle="Hassle-free returns within 7 days of delivery"
        breadcrumbs={[{ label: 'Returns & Exchanges' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-royal-50 space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Return Policy</h2>
            <p className="text-royal-600 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not happy with your order,
              you can return it within 7 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Eligibility</h2>
            <ul className="text-royal-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>Products must be unused, unwashed, and in original packaging</li>
              <li>All tags and labels must be intact</li>
              <li>Returns must be initiated within 7 days of delivery</li>
              <li>Sale items are eligible for exchange only</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">How to Return</h2>
            <ol className="text-royal-600 leading-relaxed space-y-2 list-decimal list-inside">
              <li>Contact us at care@godhacollections.com or call +91 98765 43210</li>
              <li>Share your order ID and reason for return</li>
              <li>We will arrange a pickup within 2-3 business days</li>
              <li>Refund will be processed within 5-7 business days after receiving the product</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Refund Method</h2>
            <p className="text-royal-600 leading-relaxed">
              Refunds will be credited to the original payment method. For COD orders, refunds will be
              processed via bank transfer. Please allow 5-7 business days for the refund to reflect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
