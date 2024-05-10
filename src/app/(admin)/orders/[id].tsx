import OrderItemList from "@/components/OrderItemList";
import OrderList from "@/components/OrderList";
// import orders from "@assets/data/orders";
import { OrderStatusList } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useOrderById, useUpdateOrder } from "@/api/orders";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  // const order = orders.find((order) => order.id.toString() === id);
  const { data: order, isLoading, error } = useOrderById(id);
  const {mutate:updateOrder} = useUpdateOrder()


  // Update order status
  const updateOrderStatus = (status)=>{
updateOrder({id:id,updatedFields:{status}})
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
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
        ListHeaderComponent={() => <OrderList order={order} />}
        ListFooterComponent={() => (
          <>
            <Text className="font-bold m-2">Status</Text>
            <View className="flex-row gap-2">
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateOrderStatus(status)}
                  className="border-2 border-sky-500 p-3 rounded-lg my-2"
                  style={{
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
