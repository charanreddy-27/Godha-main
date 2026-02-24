'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface WishlistState {
  items: string[]; // product IDs
  addItem: (productId: string, productName?: string) => void;
  removeItem: (productId: string, productName?: string) => void;
  toggleItem: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, productName) => {
        const items = get().items;
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
          toast.success(productName ? `${productName} added to wishlist` : 'Added to wishlist');
        }
      },

      removeItem: (productId, productName) => {
        set({ items: get().items.filter((id) => id !== productId) });
        toast.info(productName ? `${productName} removed from wishlist` : 'Removed from wishlist');
      },

      toggleItem: (productId, productName) => {
        const items = get().items;
        if (items.includes(productId)) {
          get().removeItem(productId, productName);
        } else {
          get().addItem(productId, productName);
        }
      },

      isInWishlist: (productId) => get().items.includes(productId),

      clearWishlist: () => {
        set({ items: [] });
        toast.info('Wishlist cleared');
      },

      getCount: () => get().items.length,
    }),
    { name: 'godha-wishlist' }
  )
);
