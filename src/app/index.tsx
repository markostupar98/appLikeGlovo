import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "./providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
  if(loading){
    return <ActivityIndicator />
  }
  if(!isAdmin){
    return <Redirect href={"/(user)/menu"} />;
  }
  return (
    <View className="flex-1 justify-center p-2">
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/home"} asChild>
        <Button text="Home" />
      </Link>
      <Link href={"/restaurant"} asChild>
        <Button text="Restaurant" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      {/* <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link> */}
      <Button onPress={()=>supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;
