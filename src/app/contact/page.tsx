'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("Message sent successfully! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Get in Touch"
        subtitle="We'd love to hear from you. Our team is here to assist you."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-royal-900 mb-6">Contact Information</h2>
              <p className="text-royal-600 leading-relaxed mb-8">
                Have a question about a product, shipping, or need styling advice? Reach out to us through any of the
                channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-royal-50 transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0 text-royal-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-royal-900 mb-1">Phone &amp; WhatsApp</h3>
                  <p className="text-royal-600">+91 98765 43210</p>
                  <p className="text-royal-400 text-sm mt-1">Mon-Sat, 9am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-royal-50 transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0 text-royal-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-royal-900 mb-1">Email</h3>
                  <p className="text-royal-600">care@godhacollections.com</p>
                  <p className="text-royal-400 text-sm mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-royal-50 transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-royal-50 rounded-full flex items-center justify-center flex-shrink-0 text-royal-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-royal-900 mb-1">Store Address</h3>
                  <p className="text-royal-600">
                    Plot No. 45, Jubilee Hills,
                    <br />
                    Hyderabad, Telangana 500033
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-luxury border border-royal-50"
            >
              <h2 className="font-display text-3xl font-bold text-royal-900 mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-royal-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-royal-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all placeholder:text-royal-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-royal-700">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-royal-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all placeholder:text-royal-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-royal-700">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-royal-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-royal-700">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Returns &amp; Exchanges</option>
                    <option>Bulk Orders</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-royal-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    className="w-full px-4 py-3 rounded-xl border border-royal-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all placeholder:text-royal-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-royal-900 hover:bg-royal-800 text-white font-medium py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">Processing...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-4 h-4 ml-1" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
