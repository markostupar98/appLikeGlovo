import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/app/providers/CartProvider";
// import RemoteImage from './RemoteImage';

type CartListProps = {
  cartItem: CartItem;
};

const CartList = ({ cartItem }: CartListProps) => {
  const { updateQuantity } = useCart();

  return (
    <View className="bg-white rounded-lg p-2 flex-1 flex-row items-center">
      <Image
        source={{ uri: cartItem.product.image || undefined}}
        resizeMode="contain"
        className="w-14 aspect-square self-center mr-3"
      />

      <View className="flex-1">
        <Text className="font-semibold text-xl mb-2">
          {cartItem.product.name}
        </Text>
        <View className="flex-row gap-2">
          <Text className={`text-sky-400 font-semibold`}>
            ${cartItem.product.price.toFixed(2)}
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View className="flex-row gap-5 my-3 items-center">
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text className="font-semibold text-xl">{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

export default CartList;
