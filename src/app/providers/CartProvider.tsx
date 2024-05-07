import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

// Defiing cart type
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

// Context
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

// Provider
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Function responsible for adding items in cart
  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      quantity: 1,
      size,
      product_id: product.id,
    };
    setItems([newCartItem, ...items]);
  };

  // Update quantity function
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    console.log(itemId, amount);
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity),0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
