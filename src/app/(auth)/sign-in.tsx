import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Supabase sign in
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View className="p-5 justify-center flex-1">
      <Stack.Screen options={{ title: "Sign in" }} />

      <Text className="text-gray-300">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        className="border border-gray-400 p-3 mt-2 mb-10 bg-white rounded-lg"
      />

      <Text className="text-gray-300">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        secureTextEntry
        className="border border-gray-400 p-3 mt-2 mb-10 bg-white rounded-md"
      />

      <Button
        onPress={signInWithEmail}
        text={loading ? "Signing In..." : "Sign In"}
        disabled={loading}
      />
      <Link
        href="/sign-up"
        className="self-center font-semibold text-sky-400 my-3"
      >
        Create an account
      </Link>
    </View>
  );
};

export default SignInScreen;
