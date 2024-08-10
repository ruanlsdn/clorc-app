import React from "react";
import { ScrollView } from "tamagui";
import { iHistoryOrder } from "../../interfaces";
import HistoryListItem from "../HistoryListItem";

type props = {
  list: iHistoryOrder[];
};

export default function HistoryList({ list }: props) {
  return (
    <ScrollView flex={1} bc="#202123">
      {list?.map((item, idx) => (
        <HistoryListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
