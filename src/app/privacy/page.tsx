import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Privacy Policy | Godha Collections',
  description: 'How Godha Collections collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-royal-50 prose prose-royal max-w-none">
          <p className="text-royal-600 leading-relaxed">Last updated: {new Date().getFullYear()}</p>

          <h2 className="font-display text-2xl font-bold text-royal-900 mt-8 mb-3">Information We Collect</h2>
          <p className="text-royal-600 leading-relaxed">
            We collect information you provide directly, including your name, email address, phone number,
            shipping address, and payment information when you make a purchase. We also collect usage data
            automatically through cookies and analytics.
          </p>

          <h2 className="font-display text-2xl font-bold text-royal-900 mt-8 mb-3">How We Use Your Information</h2>
          <ul className="text-royal-600 leading-relaxed space-y-2 list-disc list-inside">
            <li>Process and fulfill your orders</li>
            <li>Communicate order updates and shipping information</li>
            <li>Send promotional offers (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraudulent transactions</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-royal-900 mt-8 mb-3">Data Protection</h2>
          <p className="text-royal-600 leading-relaxed">
            We implement industry-standard security measures including SSL encryption, secure payment
            processing through Razorpay, and restricted access to personal information. We never sell
            your data to third parties.
          </p>

          <h2 className="font-display text-2xl font-bold text-royal-900 mt-8 mb-3">Cookies</h2>
          <p className="text-royal-600 leading-relaxed">
            We use cookies to remember your preferences, keep items in your cart, and analyze site traffic.
            You can control cookie settings through your browser preferences.
          </p>

          <h2 className="font-display text-2xl font-bold text-royal-900 mt-8 mb-3">Contact Us</h2>
          <p className="text-royal-600 leading-relaxed">
            For privacy-related inquiries, contact us at care@godhacollections.com or call +91 98765 43210.
          </p>
        </div>
      </div>
    </div>
  );
}
