import {create} from 'zustand';

import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: item => {
        const currentCart = get().cart;
        const existingItem = currentCart.findIndex(
          cartItem => cartItem._id === item._id,
        );
        if (existingItem !== -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingItem] = {
            ...updatedCart[existingItem],
            count: updatedCart[existingItem].count + 1,
          };
          set({cart: updatedCart});
        } else {
          set({
            cart: [...currentCart, {_id: item._id, item: item, count: 1}],
          });
        }
      },

      clearCart: () => set({cart: []}),
      removeItem: id => {
        const currentCart = get().cart;
        const existingItem = currentCart.findIndex(
          cartItem => cartItem._id === id,
        );
        if (existingItem !== -1) {
          const updatedCart = [...currentCart];
          if (updatedCart[existingItem].count > 1) {
            updatedCart[existingItem] = {
              ...updatedCart[existingItem],
              count: updatedCart[existingItem].count - 1,
            };
          } else {
            updatedCart.splice(existingItem, 1);
          }
          set({cart: updatedCart});
        }
      },
      getItemCount: id => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(cartItem => cartItem._id === id);
        return existingItem ? existingItem.count : 0;
      },
      getTotalPrice: () => {
        const currentCart = get().cart;
        return currentCart.reduce((acc, cartItem) => {
          return acc + cartItem.item.price * cartItem.count;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
