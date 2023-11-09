import React from "react";
import { ProductsList, Searchbar } from "../../components";
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

export default function ProductsScreen() {
  return (
    <>
      <Searchbar />
      <ProductsList list={dummy} />
    </>
  );
}
