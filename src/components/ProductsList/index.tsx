import React from "react";
import { ScrollView } from "tamagui";
import { iProduct } from "../../interfaces";
import ProductsListItem from "../ProductsListItem";

type props = {
  list: iProduct[];
};

export default function ProductsList({ list }: props) {
  return (
    <ScrollView paddingHorizontal="$2" space="$2" bc="#202123">
      {list.map((item, idx) => (
        <ProductsListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
