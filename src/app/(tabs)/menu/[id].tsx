import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";

// Product details page

// Sizes
const sizes = ["Mala", "Srednja", "Velka", "Najveca"];

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState("Velka");

  const addToCart = () => {
    console.log('Adding to cart')
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View className="bg-white flex-1 p-3">
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        className="w-full aspect-square"
        source={{ uri: product.image || undefined }}
      />
      <Text>Select size</Text>
      <View className="flex-row justify-between my-2 items-center">
        {sizes.map((size) => (
          <Pressable key={size} onPress={() => setSelectedSize(size)}>
            <Text
              className={`text-xl font-semibold bg-gray-100 rounded-full ${
                selectedSize === size ? "bg-sky-400" : "bg-white"
              }`}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-xl font-semibold ml-2 mt-20">${product?.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetail;
