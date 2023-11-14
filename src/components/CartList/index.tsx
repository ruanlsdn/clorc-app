import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text } from "tamagui";
import CartListItem from "../CartListItem";
import { iCartProduct } from "../../interfaces";

type props = {
  list: iCartProduct[];
};

export default function CartList({ list }: props) {
  return (
    <ScrollView marginTop="$2">
      {list.map((item, idx) => (
        <CartListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
