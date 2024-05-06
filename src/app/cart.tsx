import { View, Text } from "react-native";
import React from "react";
import {  useCart } from "./providers/CartProvider";

const cart = () => {
    const {items} = useCart()
  return (
    <View>
      <Text>cart</Text>
    </View>
  );
};

export default cart;
