import { View, Text, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

const Search = () => {
  return (
    <View className="flex-row items-center space-x-2 px-4 pb-2">
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
        <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text className="text-gray-600">Banja Luka,RS</Text>
        </View>
      </View>
      <View className="p-3 rounded-full">
        <Feather name="sliders" size={24} color="black" />
      </View>
    </View>
  );
};

export default Search;
