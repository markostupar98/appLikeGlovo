import products from "assets/data/products";
import ProductList from "src/components/ProductList";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  
  // Fetch products
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to get products</Text>;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
