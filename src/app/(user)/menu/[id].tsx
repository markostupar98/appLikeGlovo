import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/app/providers/CartProvider";
import { PizzaSize } from "@/types";

// Product details page

// Sizes
const sizes: PizzaSize[] = ["Mala", "Srednja", "Velka", "Najveca"];

const ProductDetail = () => {
  // ID
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("Velka");

  // Add cart item context function
  const { addItem } = useCart();

  const addToCart = () => {
    if (!product) {
      return;
    }
    console.log("Adding to cart", product);
    addItem(product, selectedSize);
    router.push("/cart");
  };

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
      <Text className="text-xl font-semibold ml-2 mt-20">
        ${product?.price}
      </Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetail;
