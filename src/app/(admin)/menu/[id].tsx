import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/app/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProductById } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
import { defaultImage } from "@/components/ProductList";

// Product details page

// Sizes
const sizes: PizzaSize[] = ["Mala", "Srednja", "Velka", "Najveca"];

const ProductDetail = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  // Fetching
  const { data: product, error, isLoading } = useProductById(id);
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("Velka");

  // ID

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
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product.image}
        fallback={defaultImage}
        className="w-full aspect-square"
      />

      <Text className="text-xl font-semibold ml-2">${product?.price}</Text>
      <Text className="text-xl font-semibold ml-2 mt-2">{product?.name}</Text>
    </View>
  );
};

export default ProductDetail;
