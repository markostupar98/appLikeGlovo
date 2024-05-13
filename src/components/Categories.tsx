import { View, Text, ScrollView } from "react-native";
import React from "react";

const Main = () => {
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      ></ScrollView>
    </View>
  );
};

export default Main;
