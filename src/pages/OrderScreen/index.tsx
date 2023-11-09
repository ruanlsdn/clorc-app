import { View, Text } from "react-native";
import React from "react";
import { OrderList, Searchbar } from "../../components";
import { iProduct } from "../../interfaces";

const dummy: iProduct[] = [
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 1",
    price: 3.0,
  },
];

export default function OrderScreen() {
  return (
    <>
      <Searchbar />
      <OrderList list={dummy} />
    </>
  );
}
