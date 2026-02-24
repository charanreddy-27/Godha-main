/**
 * Formatting utilities for currency, dates, and display strings
 */

/** Format a number as Indian Rupee currency string */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/** Calculate discount percentage between original and current price */
export function getDiscountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}

/** Format a Firestore timestamp or Date to a readable date string */
export function formatDate(date: unknown): string {
  if (!date) return '';

  // Handle Firestore Timestamp objects
  if (typeof date === 'object' && date !== null && 'toDate' in date) {
    return (date as { toDate: () => Date }).toDate().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Handle regular Date objects or ISO strings
  const d = new Date(date as string | number);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Truncate text to a maximum length with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
