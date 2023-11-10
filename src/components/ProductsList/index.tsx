import React from "react";
import { ScrollView } from "tamagui";
import { iProduct } from "../../interfaces";
import ProductsListItem from "../ProductsListItem";

type props = {
  list: iProduct[];
};

export default function ProductsList({ list }: props) {
  return (
    <ScrollView>
      {list.map((item, idx) => (
        <ProductsListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
