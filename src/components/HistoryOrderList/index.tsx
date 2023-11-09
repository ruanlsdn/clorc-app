import { View, Text } from "react-native";
import React from "react";
import { Button, Input, ScrollView, XStack } from "tamagui";
import { Search } from "@tamagui/lucide-icons";
import { iHistoryOrder } from "../../interfaces";
import HistoryOrderItem from "../HistoryOrderItem";

type props = {
  list: iHistoryOrder[];
};

export default function HistoryOrderList({ list }: props) {
  return (
    <>
      <XStack
        margin="$3"
        height="$5"
        alignItems="center"
        justifyContent="center"
      >
        <Input placeholder="Pesquisar..." fontSize="$5" width="90%" />
        <Button icon={Search} bordered />
      </XStack>
      <ScrollView flex={1} >
        <XStack
        paddingHorizontal="$1"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {list.map((item, idx) => (
            <HistoryOrderItem key={idx} item={item} />
          ))}
        </XStack>
      </ScrollView>
    </>
  );
}
