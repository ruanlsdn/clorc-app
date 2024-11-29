import { View, Text } from "react-native";
import React from "react";
import { iProduct } from "../../interfaces";
import { ScrollView } from "tamagui";
import OrderListItem from "../OrderListItem";

type props = {
  list: iProduct[];
};

export default function OrderList({ list }: props) {
  return (
    <ScrollView bc="#202123">
      {list.map((item, idx) => (
        <OrderListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
