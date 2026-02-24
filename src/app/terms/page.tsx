import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Terms of Service | Godha Collections',
  description: 'Terms and conditions for using Godha Collections online store.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        breadcrumbs={[{ label: 'Terms of Service' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-royal-50 space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Acceptance of Terms</h2>
            <p className="text-royal-600 leading-relaxed">
              By accessing and using Godha Collections website, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Products & Pricing</h2>
            <p className="text-royal-600 leading-relaxed">
              All product prices are listed in Indian Rupees (₹) and include applicable taxes.
              We reserve the right to modify prices without prior notice. Product availability is
              subject to stock and may change at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Orders & Payment</h2>
            <p className="text-royal-600 leading-relaxed">
              By placing an order, you confirm that all information provided is accurate. We accept
              payments through Razorpay, including credit/debit cards, UPI, and net banking.
              We reserve the right to cancel orders due to pricing errors or stock unavailability.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Intellectual Property</h2>
            <p className="text-royal-600 leading-relaxed">
              All content on this website including text, images, logos, and designs are the intellectual
              property of Godha Collections. Unauthorized reproduction or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Limitation of Liability</h2>
            <p className="text-royal-600 leading-relaxed">
              Godha Collections shall not be liable for any indirect, incidental, or consequential damages
              arising from the use of our services. Our liability is limited to the purchase price of the
              products ordered.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-royal-900 mb-3">Contact</h2>
            <p className="text-royal-600 leading-relaxed">
              For questions about these terms, contact us at care@godhacollections.com or +91 98765 43210.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
