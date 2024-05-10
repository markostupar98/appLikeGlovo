import { useOrderById } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";
import OrderItemList from "@/components/OrderItemList";
import OrderList from "@/components/OrderList";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: order, isLoading, error } = useOrderById(id);

  // subscription to order update changes
  useUpdateOrderSubscription(id);

  if (!order) {
    return <Text>No orders found</Text>;
  }

  return (
    <View className="p-3 gap-5 flex-1">
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderList order={order} />
      <FlatList
        data={order}
        renderItem={({ item }) => <OrderItemList item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderList order={order} />}
      />
    </View>
  );
}
