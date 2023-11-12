import { View, Text } from "react-native";
import React from "react";
import { Button, Input, XStack } from "tamagui";
import { Search } from "@tamagui/lucide-icons";

export default function Searchbar() {
  return (
    <XStack
      padding="$4"
      alignItems="center"
      justifyContent="center"
      bc="#202123"
    >
      <Input
        placeholder="Pesquisar..."
        fontSize="$5"
        width="90%"
        bc="#565869"
        borderColor="#565869"
        borderTopRightRadius="$0"
        borderBottomRightRadius="$0"
        color="#ffffff"
      />
      <Button
        bc="#343541"
        borderTopLeftRadius="$0"
        borderBottomLeftRadius="$0"
        icon={<Search color="#19C37D" size="$1"/>}
        pressStyle={{
          opacity: 0.5,
          borderColor: "#343541",
          backgroundColor: "#343541",
        }}
      />
    </XStack>
  );
}
