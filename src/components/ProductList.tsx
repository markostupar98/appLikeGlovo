import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

export const defaultImage =
  "https://www.recipesfromeurope.com/wp-content/uploads/2023/04/balkan-cevapi-recipe.jpg";

type ProductListProps = {
  product: Tables<"products">;
};

const ProductList = ({ product }: ProductListProps) => {
  const segments = useSegments();
  console.log(segments);
  return (
    <Link
      className="text-muted-foreground"
      href={`/${segments[0]}/menu/${product.id}`}
      asChild
    >
      <Pressable className="items-center bg-white p-5 rounded-lg flex-1">
        <RemoteImage
          path={product.image}
          fallback={defaultImage}
          className="w-full aspect-square rounded-full"
          resizeMode="contain"
        />
        <Text className="text-sky-500 text-xl">{product.name}</Text>
        <Text className="text-sky-300 text-sm">$ {product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductList;
