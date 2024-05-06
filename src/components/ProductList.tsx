import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import products from "assets/data/products";
import { Product } from "../types";
import { Link } from "expo-router";

type ProductListProps = {
  product: Product;
};

const ProductList = ({ product }: ProductListProps) => {
  return (
    <Link className="text-muted-foreground" href={`/menu/${product.id}`} asChild >
    <Pressable className="items-center bg-white p-5 rounded-lg flex-1 m-5 ">
      <Image
        source={{ uri: product.image || null }}
        className="w-full aspect-square"
        resizeMode="contain"
      />
      <Text className="text-sky-500 text-xl">{product.name}</Text>
      <Text className="text-sky-300 text-sm">$ {product.price}</Text>
    </Pressable>
    </Link>
  );
};

export default ProductList;
