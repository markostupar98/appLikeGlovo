import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "../types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderListProps = {
  order: Order;
};

const OrderList = ({ order }: OrderListProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable className="bg-white p-3 rounded-lg flex-row justify-between items-center">
        <View>
          <Text className="font-semibold my-2">Order #{order.id}</Text>
          <Text className="text-gray-400">{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text className="font-semibold">{order.status}</Text>
      </Pressable>
    </Link>
  );
};


export default OrderList;
