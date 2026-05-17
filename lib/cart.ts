import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  description?: string;
  genre?: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

interface CartStore {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(persist(
  (set, get) => ({
    items: [],
    addItem: (book: Book) => {
      const state = get();
      const existingItem = state.items.find((item) => item.bookId === book.id);

      if (existingItem) {
        set({
          items: state.items.map((item) =>
            item.bookId === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      } else {
        set({
          items: [
            ...state.items,
            {
              bookId: book.id,
              quantity: 1,
              book,
            },
          ],
        });
      }
    },
    removeItem: (bookId: string) => {
      const state = get();
      set({
        items: state.items.filter((item) => item.bookId !== bookId),
      });
    },
    updateQuantity: (bookId: string, quantity: number) => {
      const state = get();
      if (quantity <= 0) {
        set({
          items: state.items.filter((item) => item.bookId !== bookId),
        });
      } else {
        set({
          items: state.items.map((item) =>
            item.bookId === bookId ? { ...item, quantity } : item
          ),
        });
      }
    },
    clearCart: () => {
      set({ items: [] });
    },
    getTotalPrice: () => {
      const state = get();
      return state.items.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      );
    },
  }),
  {
    name: 'cart-storage',
  }
));
