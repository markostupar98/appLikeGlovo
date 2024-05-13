import ProductList from "src/components/ProductList";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProductList } from "@/api/products";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Search from "@/components/Search";
import Categories from "@/components/Categories";

export default function HomeScreen() {
  // Product fetching
  // const { data: products, error, isLoading } = useProductList();
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }
  // if (error) {
  //   return <Text>Failed to get products</Text>;
  // }
  return (
    <>
      {/* <FlatList
      data={products}
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    /> */}
      <SafeAreaView>
        {/* <StatusBar style="dark-content" /> */}
        {/* Search Bar */}
        <Search />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Categories />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
