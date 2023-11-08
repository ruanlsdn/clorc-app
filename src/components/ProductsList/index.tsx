import { Search } from "@tamagui/lucide-icons";
import React from "react";
import { Button, Input, ScrollView, XStack } from "tamagui";
import { iProduct } from "../../interfaces";
import ProductsListItem from "../ProductsListItem";

type props = {
  list: iProduct[];
};

export default function ProductsList({ list }: props) {
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
      <ScrollView>
        {list.map((item, idx) => (
          <ProductsListItem key={idx} item={item} />
        ))}
      </ScrollView>
    </>
  );
}
