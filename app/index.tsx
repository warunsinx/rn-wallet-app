import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export default function Home() {
  const [phrase, setPhrase] = useState("");
  const [wallets, setWallets] = useState<ethers.HDNodeWallet[]>([]);
  const [phraseInput, setPhraseInput] = useState("");

  const handleCreateWallet = () => {
    setPhrase("");
    setWallets([]);
    const wallet = ethers.Wallet.createRandom();
    const phraseString = wallet.mnemonic?.phrase || "";
    setPhrase(phraseString);
    for (let i = 0; i < 3; i++) {
      const wallet = getPrivateKey(phraseString, i);
      setWallets((wallets) => [...wallets, wallet]);
    }
  };

  const getPrivateKey = (phrase: string, index: number) => {
    return ethers.Wallet.fromPhrase(phrase).derivePath(
      `m/44'/60'/0'/0/${index}`
    );
  };

  const handleRestore = () => {
    setPhrase("");
    setWallets([]);
    setPhrase(phraseInput);
    for (let i = 0; i < 3; i++) {
      const wallet = getPrivateKey(phraseInput, i);
      setWallets((wallets) => [...wallets, wallet]);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: "black", borderWidth: 1 }}
        value={phraseInput}
        onChange={(e) => setPhraseInput(e.nativeEvent.text)}
      />
      <Sperator />
      <Button onPress={handleRestore} title="Restore" />
      <Sperator />
      <Button onPress={handleCreateWallet} title="Create" />
      <Sperator />
      {phrase ? <Text>{phrase}</Text> : null}
      <Sperator />
      {wallets.map((wallet, i) => (
        <View key={i}>
          <Text>{wallet.privateKey}</Text>
          <Sperator />
        </View>
      ))}
    </View>
  );
}

const Sperator = () => {
  return <View style={{ height: 10 }} />;
};
