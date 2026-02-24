import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'FAQ | Godha Collections',
  description: 'Frequently asked questions about shopping at Godha Collections.',
};

const faqs = [
  {
    q: 'Are all products authentic handloom?',
    a: 'Yes, every product at Godha Collections is sourced directly from master weavers and artisans across India. We guarantee 100% authenticity.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Delivery typically takes 3-5 business days for metro cities and 5-10 business days for other areas. All orders include free shipping.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer hassle-free returns within 7 days of delivery. Products must be unused, unwashed, and in original packaging with all tags intact.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Currently, we ship within India only. We are working on expanding to international markets soon.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use it to track your delivery status.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets through our Razorpay payment gateway.',
  },
  {
    q: 'Can I modify or cancel my order?',
    a: 'Orders can be modified or cancelled within 2 hours of placement. Please contact us at care@godhacollections.com immediately.',
  },
  {
    q: 'Do you offer bulk or wholesale pricing?',
    a: 'Yes! For bulk orders (10+ pieces), please contact us directly for special pricing. Email us at care@godhacollections.com.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about Godha Collections"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-royal-50">
              <h3 className="font-display text-lg font-bold text-royal-900 mb-2">{faq.q}</h3>
              <p className="text-royal-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
