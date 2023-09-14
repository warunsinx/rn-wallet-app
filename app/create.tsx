import { useState } from "react";
import { View, Button, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ethers } from "ethers";

export default function Create() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<
    { address: string; privateKey: String }[]
  >([]);

  const handleCreate = async () => {
    setLoading(true);
    const m = ethers.Wallet.createRandom();
    setMnemonic(m.mnemonic?.phrase || "");
    setWallets((prev) => [
      ...prev,
      { address: m.address, privateKey: m.privateKey },
    ]);
    setLoading(false);
  };

  return (
    <View style={{ padding: "3%" }}>
      <Button title="Create" onPress={handleCreate} />
      {loading ? <Text style={{ marginTop: "1%" }}>Loading...</Text> : null}
      {mnemonic ? (
        <Text style={{ marginTop: "1%" }}>mnemonic Phrase: {mnemonic}</Text>
      ) : null}
      <FlatList
        data={wallets}
        renderItem={({ item }) => (
          <View
            style={{
              padding: "1%",
              backgroundColor: "pink",
              marginTop: 10,
            }}
          >
            <Text>WalletAddress:{item.address}</Text>
            <Text>PrivateKey:{item.privateKey}</Text>
          </View>
        )}
        keyExtractor={(item) => item.address}
      />
      <View style={{ marginTop: 5 }}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}
