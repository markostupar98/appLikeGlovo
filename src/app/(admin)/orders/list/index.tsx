import { FlatList, Text } from "react-native";
import orders from "@assets/data/orders";
import OrderList from "@/components/OrderList";

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
      contentContainerStyle={{gap:10, padding:10}}
    />
  );
}
