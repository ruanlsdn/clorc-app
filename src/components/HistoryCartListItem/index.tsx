import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { iCartProduct } from "../../interfaces";
import { XStack, YStack, Text } from "tamagui";
import { BaggageClaim, Plus, X } from "@tamagui/lucide-icons";
import AvatarIcon from "../AvatarIcon";

type props = {
  item: iCartProduct;
};

export default function CartListItem({ item }: props) {
  return (
    <XStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="$2"
      marginHorizontal="$2"
      height="$5"
      bc="#343541"
      borderRadius="$5"
      padding="$2"
    >
      <Text fontSize="$5" color="#D9D9E3" width="60%">
        {item.name}
      </Text>
      <Text fontSize="$5" color="#D9D9E3">x{item.amount}</Text>
      <Text fontWeight="bold" fontSize="$5" color="#ffffff">
        R$ {(item.amount * item.price).toFixed(2)}
      </Text>
    </XStack>
  );
}

const styles = StyleSheet.create({});
