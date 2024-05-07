import { View, Text, FlatList } from "react-native";
import React from "react";
import { useCart } from "./providers/CartProvider";
import CartList from "@/components/CartList";

const Cart = () => {
  const { items } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartList cartItem={item} />}
        // keyExtractor={(item) => item.id.toString()} // Add a keyExtractor
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }} // Add paddingBottom to prevent items from being hidden behind the bottom navigation
      />
    </View>
  );
};

export default Cart;
