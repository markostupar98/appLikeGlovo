import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// Product details page

const ProductDetail = () => {
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Stack.Screen options={{title:'Details'}} />
      <Text>ProductDetails id : {id}</Text>
    </View>
  );
};

export default ProductDetail;
