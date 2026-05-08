import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productSlug: string;
  designUrl: string;
  designPrompt: string;
  quantity: number;
  size?: string;
  price: number;
};

type CartStore = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, id: crypto.randomUUID(), quantity: item.quantity ?? 1 },
          ],
        })),

      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),

      clear: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      shipping: () => {
        const sub = get().subtotal();
        return sub === 0 ? 0 : sub >= 30 ? 0 : 3.99;
      },

      total: () => get().subtotal() + get().shipping(),
    }),
    { name: "meudesign-cart-v1" }
  )
);
