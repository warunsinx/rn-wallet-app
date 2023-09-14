import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Button } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ padding: "5%" }}>
      <Button onPress={() => router.push("/create")} title="Create Mnemonic" />
      <View style={{ marginVertical: 5 }} />
      <Button
        onPress={() => router.push("/restore")}
        title="Restore Mnemonic"
      />
      <StatusBar style="auto" />
    </View>
  );
}
