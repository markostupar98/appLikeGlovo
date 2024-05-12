import { View, Text, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { supabase } from "@/lib/supabase";

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-end p-2">
      <Pressable onPress={()=>supabase.auth.signOut()}>
        <MaterialIcons name="logout" size={32} color="black" />
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
