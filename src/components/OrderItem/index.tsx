import { BaggageClaim, List, Plus, X } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { iProduct } from "../../interfaces";
import AvatarIcon from "../AvatarIcon";

type props = {
  item: iProduct;
};

export default function OrderItem({ item }: props) {
  return (
    <XStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="$2"
      marginHorizontal="$2"
      height="$8"
      padding="$4"
      bc="#343541"
      elevationAndroid={5}
      borderRadius="$5"
    >
      <XStack space="$3" alignItems="center" justifyContent="center">
        <AvatarIcon icon={<BaggageClaim color="#ffffff" />} />
        <YStack>
          <Text fontWeight="bold" fontSize="$6" color="#ffffff">
            {item.title}
          </Text>
          <Text color="#D9D9E3" fontSize="$5">{`x${item.price}`}</Text>
        </YStack>
      </XStack>
      <XStack space="$3">
        <TouchableOpacity style={styles.buttonContainer}>
          <Plus color="#19C37D" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <X color="red" />
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    backgroundColor: "#565869",
    borderRadius: 100,
    elevation: 5,
  },
});
