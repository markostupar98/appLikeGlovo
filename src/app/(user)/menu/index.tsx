import products from "assets/data/products";
import ProductList from "src/components/ProductList";
import { FlatList, StyleSheet, Text, View } from "react-native";

const product = products[0];

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding:10 }}
      columnWrapperStyle={{gap:10}}
    />
  );
}
