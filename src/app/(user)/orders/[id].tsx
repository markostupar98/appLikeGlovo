import OrderItemList from "@/components/OrderItemList";
import OrderList from "@/components/OrderList";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return <Text>No orders found</Text>;
  }
  return (
    <View className="p-3 gap-5 flex-1">
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderList order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemList item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={()=> <OrderItemList item={item}  />}
      />
    </View>
  );
}
