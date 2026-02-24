'use client';

import { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProductCategory } from '@/types';

interface SizeGuideProps {
  category: ProductCategory;
  onClose: () => void;
}

const sizeCharts: Record<ProductCategory, { headers: string[]; rows: string[][] }> = {
  sarees: {
    headers: ['Type', 'Length (m)', 'Width (m)', 'Blouse Piece'],
    rows: [
      ['Standard Saree', '5.5', '1.15', '0.8m included'],
      ['Half Saree', '4.0', '1.15', '0.8m included'],
      ['Dupatta Style', '2.5', '1.0', 'Not included'],
    ],
  },
  'ethnic-wear': {
    headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)', 'Length (in)'],
    rows: [
      ['XS', '32', '26', '34', '38'],
      ['S', '34', '28', '36', '39'],
      ['M', '36', '30', '38', '40'],
      ['L', '38', '32', '40', '41'],
      ['XL', '40', '34', '42', '42'],
      ['XXL', '42', '36', '44', '43'],
    ],
  },
  dresses: {
    headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)', 'Length (in)'],
    rows: [
      ['XS', '31–32', '24–25', '33–34', '34'],
      ['S', '33–34', '26–27', '35–36', '35'],
      ['M', '35–36', '28–29', '37–38', '36'],
      ['L', '37–38', '30–31', '39–40', '37'],
      ['XL', '39–41', '32–34', '41–43', '38'],
      ['XXL', '42–44', '35–37', '44–46', '39'],
    ],
  },
};

const measurementTips: Record<ProductCategory, string[]> = {
  sarees: [
    'Saree length does not include the blouse piece.',
    'For best draping, choose standard 5.5m length.',
    'All our sarees come with a matching blouse piece unless specified otherwise.',
  ],
  'ethnic-wear': [
    'Bust: Measure around the fullest part of your chest.',
    'Waist: Measure around your natural waistline.',
    'Hip: Measure around the widest part of your hips.',
    'If you are between sizes, we recommend sizing up for a comfortable fit.',
  ],
  dresses: [
    'Bust: Wrap the tape around the fullest part of your chest.',
    'Waist: Measure at your natural waistline, keeping the tape snug.',
    'Length: Measured from shoulder seam to hem.',
    'Our dresses have a relaxed fit; size down for a more fitted look.',
  ],
};

export function SizeGuide({ category, onClose }: SizeGuideProps) {
  const chart = sizeCharts[category];
  const tips = measurementTips[category];

  if (!chart) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-auto z-10 animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-royal-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center">
              <Ruler className="h-5 w-5 text-gold-600" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-royal-900">
                Size Guide
              </h2>
              <p className="text-xs text-royal-500 capitalize">{category.replace('-', ' ')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-royal-50 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-royal-400" />
          </button>
        </div>

        {/* Size Chart Table */}
        <div className="px-6 py-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-royal-50">
                  {chart.headers.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left font-semibold text-royal-900 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-royal-50 last:border-0 hover:bg-ivory-50 transition-colors"
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`px-4 py-3 ${cellIdx === 0 ? 'font-semibold text-royal-900' : 'text-royal-600'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Tips */}
          <div className="mt-6 p-4 bg-gold-50/50 rounded-xl border border-gold-100">
            <h3 className="text-sm font-bold text-royal-900 mb-3">
              How to Measure
            </h3>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-royal-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-royal-100 px-6 py-4 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-royal-400">
              All measurements are in inches unless specified otherwise.
            </p>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="border-royal-200"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simple button that opens the size guide modal */
export function SizeGuideButton({ category }: { category: ProductCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-gold-600 hover:text-gold-700 underline underline-offset-4 decoration-gold-300 transition-colors"
      >
        Size Chart
      </button>
      {open && <SizeGuide category={category} onClose={() => setOpen(false)} />}
    </>
  );
}
