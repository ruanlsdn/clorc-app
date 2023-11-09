import { Clipboard } from "@tamagui/lucide-icons";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, H4, Text, YStack } from "tamagui";
import { iHistoryOrder } from "../../interfaces";

type props = {
  item: iHistoryOrder;
};

export default function HistoryOrderItem({ item }: props) {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <YStack space alignItems="center" justifyContent="center">
          <Avatar circular size="$6">
            <Avatar.Image
              asChild
              children={
                <YStack
                  bc="$color.gray6Light"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Clipboard size="$2.5" />
                </YStack>
              }
            />
          </Avatar>
          <YStack alignItems="center" justifyContent="center">
            <H4>{item.clientName}</H4>
            <Text fontSize="$5">{item.createdAt}</Text>
          </YStack>
        </YStack>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    borderRadius: 15,
    width: "45%",
    marginHorizontal: 5,
    marginTop: 10,
    height: 175,
    elevation: 5
  },
});
