import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker'

// Icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "@/components/Button";
import { Stack } from "expo-router";

// Create product screen

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Error State
  const [errors, setErrors] = useState("");

  //Image picker state
  const [image, setImage] = useState<string | null>(null);

  // Image picker function
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Please enter a number in price field");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log("Create product");
    resetFields();
  };
  return (
    <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{title:'Create Product'}} />
      <Image
        className="w-[50%] aspect-square self-center rounded-lg"
        source={{
          uri:image || "https://as2.ftcdn.net/v2/jpg/04/81/13/43/1000_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg",
        }}
      />
      <Text onPress={pickImage} className="text-sky-300 self-center font-semibold my-2">Select Image</Text>
      <Text className="text-gray-400 text-xl">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        className="bg-white p-3 rounded-lg my-3"
      />

      <Text className="text-gray-400 text-xl">Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99$"
        className="bg-white p-3 rounded-lg my-3"
        keyboardType="numeric"
      />
      {errors && (
        <View className="flex-row items-center">
          <MaterialIcons name="error" size={24} color="red" />
          <Text className="text-rose-400 ml-1.5">{errors}!</Text>
        </View>
      )}

      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

export default CreateProduct;
