import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { iProduct } from "../../interfaces";
import { List, Plus, X } from "@tamagui/lucide-icons";
import { XStack, Avatar, YStack, H4, Text, Button } from "tamagui";

type props = {
  item: iProduct;
};

export default function OrderItem({ item }: props) {
  return (
    <XStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginTop="$2"
      marginHorizontal="$3"
      height="$8"
      padding="$3"
      bc="white"
      elevationAndroid={2}
    >
      <XStack space="$3" alignItems="center" justifyContent="center">
        <Avatar elevationAndroid={1} circular size="$5">
          <Avatar.Image
            asChild
            children={
              <YStack
                bc="$color.gray6Light"
                alignItems="center"
                justifyContent="center"
              >
                <List size="$1.5" />
              </YStack>
            }
          />
        </Avatar>
        <YStack>
          <Text fontWeight="bold" fontSize="$6">
            {item.title}
          </Text>
          <Text fontSize="$4">{`x${item.price}`}</Text>
        </YStack>
      </XStack>
      <XStack space="$3">
        <TouchableOpacity style={styles.buttonContainer}>
          <Plus />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <X />
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
    backgroundColor: "lightgray",
    borderRadius: 100
  },
});
