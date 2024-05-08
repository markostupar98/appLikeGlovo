import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "@/components/Button";

const index = () => {
  return (
    <View className="flex-1 justify-center p-2">
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
};

export default index;
