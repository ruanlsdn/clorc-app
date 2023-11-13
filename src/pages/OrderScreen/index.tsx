import { View, Text } from "react-native";
import React from "react";
import { Alert, IncreaseAmount, OrderList, Searchbar } from "../../components";
import { iProduct } from "../../interfaces";
import { useApplicationControlContext } from "../../contexts";

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
  const { isIncreaseAmountAlertOpen, setIsIncreaseAmountAlertOpen } = useApplicationControlContext();
  
  return (
    <>
      <Searchbar />
      <OrderList list={dummy} />
      <Alert
        isOpen={isIncreaseAmountAlertOpen}
        setIsOpen={setIsIncreaseAmountAlertOpen}
        title="Inserir no carrinho"
        description="Informe a quantidade desejada e confirme para inserir no carrinho: "
        children={<IncreaseAmount/>}
      />
    </>
  );
}
