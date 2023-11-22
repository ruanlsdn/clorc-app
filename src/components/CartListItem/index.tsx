import React from "react";
import { StyleSheet } from "react-native";
import { Text, XStack } from "tamagui";
import { iCartProduct } from "../../interfaces";

type props = {
  item: iCartProduct;
};

export default function CartListItem({ item }: props) {
  return (
    <XStack
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      marginBottom="$2"
      marginHorizontal="$2"
      height="$5"
      bc="#343541"
      borderRadius="$5"
      padding="$2"
    >
      <Text fontSize="$5" color="#D9D9E3" width="55%">
        {item.description}
      </Text>
      <Text fontSize="$5" color="#D9D9E3" width={"20%"}>
        x{item.quantity}
      </Text>
      <Text fontWeight="bold" fontSize="$5" color="#ffffff" width={"30%"}>
        R$ {(item.quantity * item.price!).toFixed(2)}
      </Text>
    </XStack>
  );
}

const styles = StyleSheet.create({});
