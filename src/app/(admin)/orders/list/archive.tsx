import { ActivityIndicator, FlatList, Text } from "react-native";
import orders from "@assets/data/orders";
import OrderList from "@/components/OrderList";
import { useAdminOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to get orders</Text>;
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
