import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

// Defiing cart type
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

// Context
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

// Provider
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Function responsible for adding items in cart
  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem:CartItem = {
        id:'1',
        product,
        quantity : 1,
        size,
        product_id:product.id
    }
    setItems([newCartItem, ...items])
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
