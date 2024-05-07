import { View, Text, FlatList } from "react-native";
import React from "react";
import { useCart } from "./providers/CartProvider";
import CartList from "@/components/CartList";
import Button from "@/components/Button";

const Cart = () => {
  const { items, total } = useCart();

  return (
    <View className="flex-1 p-1.5">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartList cartItem={item} />}
        // keyExtractor={(item) => item.id.toString()} // Add a keyExtractor
        contentContainerStyle={{ gap:10 }} // Add paddingBottom to prevent items from being hidden behind the bottom navigation
      />
      <Text className="mt-2 text-xl font-semibold">Total ${total}</Text>
      <Button text="Checkout" />
    </View>
  );
};

export default Cart;
