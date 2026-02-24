'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';
import type { ReactNode } from 'react';

interface Stat {
  label: string;
  value: string;
}

interface Value {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function AboutPage() {
  const stats: Stat[] = [
    { label: 'Years of Tradition', value: '25+' },
    { label: 'Happy Customers', value: '50k+' },
    { label: 'Unique Designs', value: '1000+' },
    { label: 'Artisans', value: '100+' },
  ];

  const values: Value[] = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold-500" />,
      title: 'Authenticity',
      description: 'We guarantee 100% authentic handloom products directly sourced from master weavers.',
    },
    {
      icon: <Heart className="w-8 h-8 text-gold-500" />,
      title: 'Craftsmanship',
      description: 'Every piece tells a story of skill, patience, and tradition passed down through generations.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold-500" />,
      title: 'Quality',
      description: 'Rigorous quality checks ensure that you receive nothing but the finest fabrics.',
    },
    {
      icon: <Truck className="w-8 h-8 text-gold-500" />,
      title: 'Service',
      description: 'Exceptional customer service with free shipping and hassle-free returns.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50">
      <PageHeader
        title="Our Story"
        subtitle="Celebrating twenty-five years of Indian textile heritage"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury">
              <div className="absolute inset-0 bg-royal-900/20 mix-blend-multiply z-10" />
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop"
                alt="Weaving loom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-royal-100 rounded-full -z-10 blur-3xl opacity-50" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-gold-100 rounded-full -z-10 blur-3xl opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-royal-900 mb-6">Preserving the Art of Handloom</h2>
            <div className="space-y-6 text-lg text-royal-700 leading-relaxed">
              <p>
                Godha Collections began as a humble initiative to bridge the gap between traditional weavers and modern
                connoisseurs of ethnic fashion. What started as a small boutique has grown into a beloved brand known
                for its uncompromising quality and exquisite designs.
              </p>
              <p>
                Our journey takes us to the remote weaving clusters of India, where we work directly with artisan
                families. By eliminating middlemen, we ensure fair wages for the creators and authentic prices for you.
              </p>
              <p>
                Each saree, lehenga, and dress in our collection is handpicked for its weave, texture, and color
                harmony. We believe that wearing ethnic is not just a style statement, but a celebration of our rich
                cultural identity.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="bg-royal-900 text-white rounded-3xl overflow-hidden relative mb-24 py-16 px-4">
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-4xl md:text-5xl font-display font-bold text-gold-400">{stat.value}</div>
                  <div className="text-royal-200 uppercase tracking-widest text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-royal-900 mb-4">Why Choose Godha?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-luxury hover:-translate-y-2 transition-transform duration-500 border border-royal-50"
            >
              <div className="w-16 h-16 bg-ivory-50 rounded-full flex items-center justify-center mb-6 mx-auto border border-gold-100">
                {val.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-royal-900 mb-3 text-center">{val.title}</h3>
              <p className="text-royal-600 text-center leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
