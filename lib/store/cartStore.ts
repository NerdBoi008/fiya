import { CartItem } from "@/types/index.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const useCartStore = create(
    persist<CartStore>(
      (set) => ({
        cart: [],
  
        //   Add a product to the cart
        addToCart: (item) =>
          set((state) => {
            const existingItem = state.cart.find((i) => i.productId === item.productId);
            if (existingItem) {
                // If the product already exists, update the quantity
                return {
                    cart: state.cart.map((i) =>
                      i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            } else {
                // If the product doesn't exist, add it to the cart
                return { cart: [...state.cart, item] };
            }
          }),
  
        // Remove a product from the cart
        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart.filter((i) => i.productId !== productId),
          })),
  
        // Update the quantity of a product in the cart
        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity < 1) {
              // If quantity is less than 1, remove the product from the cart
              return {
                cart: state.cart.filter((i) => i.productId !== productId),
              };
            } else {
              // Otherwise, update the quantity
              return {
                cart: state.cart.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i
                ),
              };
            }
          }),
  
        // Clear the entire cart
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: 'cart-storage', // Unique name for localStorage
      }
    )
);

export default useCartStore;