import { View, Text } from "react-native";
import React from "react";
import { Button, Input, XStack } from "tamagui";
import { Search } from "@tamagui/lucide-icons";

export default function Searchbar() {
  return (
    <XStack margin="$3" height="$5" alignItems="center" justifyContent="center">
      <Input placeholder="Pesquisar..." fontSize="$5" width="90%" />
      <Button icon={Search} bordered />
    </XStack>
  );
}
