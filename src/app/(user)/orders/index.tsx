import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderList from "@/components/OrderList";
import { useMyOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.error(error)
  
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
    />
  );
}
