import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import "@ethersproject/shims";

export default function MainLayout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
