import { useRouter } from "expo-router";
import { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { ethers } from "ethers";

export default function Restore() {
  const router = useRouter();
  const [mnemonic, onChangeMnemonic] = useState("");
  const [wallets, setWallets] = useState<
    { address: string; privateKey: String }[]
  >([]);

  const handleRestore = () => {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    setWallets([
      {
        address: wallet.address,
        privateKey: wallet.privateKey,
      },
    ]);
  };

  return (
    <View style={{ padding: "5%" }}>
      <TextInput
        style={{
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 10,
        }}
        value={mnemonic}
        onChangeText={(text) => onChangeMnemonic(text)}
        placeholder="Memonic Phrase"
      />
      <Button title="Restore" onPress={handleRestore} />
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
