import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem, Tables } from "../types";
import RemoteImage from "./RemoteImage";
import { defaultImage } from "./ProductList";
// import { defaultPizzaImage } from './ProductList';

type OrderItemListProps = {
  item: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemList = ({ item }: OrderItemListProps) => {
  return (
    <View className="bg-white rounded-lg p-2 flex-row items-center">
      <RemoteImage
        path={item.products.image}
        fallback={defaultImage}
        resizeMode="contain"
        className="w-14 aspect-square self-center mr-3"
      />
      <View className="flex-1">
        <Text className="font-semibold text-xl mb-2">{item.products.name}</Text>
        <View className="flex-row gap-2">
          <Text className="font-bold text-base text-sky-400">
            ${item.products.price.toFixed(2)}
          </Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View className="flex-row gap-3 items-center my-3">
        <Text className="font-semibold text-base">{item.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemList;
