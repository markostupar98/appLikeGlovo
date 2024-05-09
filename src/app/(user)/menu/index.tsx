import ProductList from "src/components/ProductList";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProductList } from "@/api/products";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

export default function MenuScreen() {
  
  // Product fetching
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to get products</Text>;
  }
  return (
    <> 
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
    <Button text="signout" onPress={()=>supabase.auth.signOut()} />
    </>
  );
}
