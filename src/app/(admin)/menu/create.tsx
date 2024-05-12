import { View, Text, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

// Icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "@/components/Button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreateProduct,
  useDeleteProduct,
  useProductById,
  useUpdateProduct,
} from "@/api/products";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

// Create product screen

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!idString;
  // Error State

  //Image picker state

  // Create product fn
  const { mutate: createProduct } = useCreateProduct();
  // Update product fn
  const { mutate: updateProduct } = useUpdateProduct();
  // Get product by id
  const { data: updatingProduct } = useProductById(id);
  // Deleting product
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  // Image upload
  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const extension = image.split(".").pop(); // Extract the file extension
    const filePath = `${randomUUID()}.${extension}`; // Use the file extension in the file path
    const contentType = `image/${extension === "jpg" ? "jpeg" : extension}`; // Adjust contentType based on the file extension

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });
    if (error) {
      console.log(error);
      return null;
    }
    if (data) {
      return data.path;
    }
  };

  // Field reset
  const resetFields = () => {
    setName("");
    setPrice("");
  };

  // Input validation
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

  // Image

  // Create product function

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    // Save in the database
    createProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  // Update product function

  const onUpdate = async() => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage()
    updateProduct(
      { id, name, price: parseFloat(price), image:imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  // Submit func
  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
      console.log("Updating");
    } else {
      onCreate();
    }
  };

  // Delete func
  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)/menu");
      },
    });
  };

  // Delete confirmation
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View className="flex-1 justify-center p-3">
      <Stack.Screen
        options={{ title: isUpdating ? "Updating Product" : "Create Product" }}
      />
      <Image
        className="w-[50%] aspect-square self-center rounded-lg"
        source={{
          uri:
            image ||
            "https://www.recipesfromeurope.com/wp-content/uploads/2023/04/balkan-cevapi-recipe.jpg",
        }}
      />
      <Text
        onPress={pickImage}
        className="text-sky-300 self-center font-semibold my-2"
      >
        Select Image
      </Text>
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
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text
          onPress={confirmDelete}
          className="text-rose-500 self-center text-base"
        >
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProduct;
