import { useOrderById } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";
import OrderItemList from "@/components/OrderItemList";
import OrderList from "@/components/OrderList";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderById(id);

  // subscription to order update changes
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error while tried to get orders</Text>;
  }

  return (
    <View className="p-3 gap-5 flex-1">
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemList item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderList order={order} />}
      />
    </View>
  );
}
