import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-purple-500">
      <Text>Tab</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
