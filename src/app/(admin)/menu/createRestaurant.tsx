import { View, Text, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "@/components/Button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreateRestaurant,
  useDeleteRestaurant,
  useRestaurantById,
  useUpdateRestaurant,
} from '@/api/restaurants/index'
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!idString;

  const { mutate: createRestaurant } = useCreateRestaurant();
  const { mutate: updateRestaurant } = useUpdateRestaurant();
  const { data: updatingRestaurant } = useRestaurantById(id);
  const { mutate: deleteRestaurant } = useDeleteRestaurant();

  useEffect(() => {
    if (updatingRestaurant) {
      setName(updatingRestaurant.name);
      setAddress(updatingRestaurant.address);
      setPhone(updatingRestaurant.phone);
      setImage(updatingRestaurant.image);
    }
  }, [updatingRestaurant]);

  const pickImage = async () => {
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

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const extension = image.split(".").pop();
    const filePath = `${randomUUID()}.${extension}`;
    const contentType = `image/${extension === "jpg" ? "jpeg" : extension}`;

    const { data, error } = await supabase.storage
      .from("restaurant-images")
      .upload(filePath, decode(base64), { contentType });
    if (error) {
      console.log(error);
      return null;
    }
    if (data) {
      return data.path;
    }
  };

  const resetFields = () => {
    setName("");
    setAddress("");
    setPhone("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!address) {
      setErrors("Address is required");
      return false;
    }
    if (!phone) {
      setErrors("Phone number is required");
      return false;
    }
    return true;
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    createRestaurant(
      { name, address, phone, image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage();
    updateRestaurant(
      { id, name, address, phone, image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteRestaurant(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/admin/menu");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this restaurant", [
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
        options={{
          title: isUpdating ? "Updating Restaurant" : "Create Restaurant",
        }}
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
      <Text className="text-gray-400 text-xl">Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        className="bg-white p-3 rounded-lg my-3"
      />
      <Text className="text-gray-400 text-xl">Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        className="bg-white p-3 rounded-lg my-3"
        keyboardType="phone-pad"
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

export default CreateRestaurant;
