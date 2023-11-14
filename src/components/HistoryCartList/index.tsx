import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "tamagui";
import { iCartProduct } from "../../interfaces";
import HistoryCartListItem from "../HistoryCartListItem";

type props = {
  list: iCartProduct[];
};

export default function HistoryCartList({ list }: props) {
  return (
    <ScrollView marginTop="$2">
      {list.map((item, idx) => (
        <HistoryCartListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
