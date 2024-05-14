import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRestaurantList } from "@/api/restaurants";
import RestaurantCard from "./RestaurantCard";

const Featured = ({ name, description, featuredRestaurants }) => {
    const { data: restaurants, error, isLoading } = useRestaurantList();
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <Text>Failed to get products</Text>;
    }
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{name}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: Colors.light }} className="font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="overflow-visible py-5"
      >
        {restaurants.map((restaurant, index)=>{
return (
    <RestaurantCard item={restaurant} key={index} />
)
        })}
      </ScrollView>
    </View>
  );
};

export default Featured;
