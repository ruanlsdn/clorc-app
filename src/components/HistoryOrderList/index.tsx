import React from "react";
import { ScrollView, XStack } from "tamagui";
import { iHistoryOrder } from "../../interfaces";
import HistoryOrderItem from "../HistoryOrderItem";

type props = {
  list: iHistoryOrder[];
};

export default function HistoryOrderList({ list }: props) {
  return (
    <ScrollView flex={1} bc="#202123">
      {list.map((item, idx) => (
        <HistoryOrderItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
