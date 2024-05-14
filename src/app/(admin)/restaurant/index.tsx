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
import { useRestaurantList } from "@/api/restaurants";

export default function MenuScreen() {
  
  // Fetch products
  const { data: restaurants, error, isLoading } = useRestaurantList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to get products</Text>;
  }
  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
