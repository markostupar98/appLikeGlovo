import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function HomeStack() {
  return (
    <Stack screenOptions={{
      headerShown:false
    }}
    //   screenOptions={{
    //     headerRight: () => (
    //       <Link href="/(admin)/menu/" asChild>
    //         <Pressable>
    //           {({ pressed }) => (
    //             <FontAwesome
    //               name="plus"
    //               size={25}
    //               color={Colors.light.tint}
    //               style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
    //             />
    //           )}
    //         </Pressable>
    //       </Link>
    //     ),
    //   }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
