import React from "react";
import { Alert, IncreaseAmount, OrderList, Searchbar } from "../../components";
import {
  useApplicationControlContext,
  useDataControlContext,
} from "../../contexts";

export default function OrderScreen() {
  const { products } = useDataControlContext();
  const { isIncreaseAmountAlertOpen, setIsIncreaseAmountAlertOpen } = useApplicationControlContext();

  return (
    <>
      <Searchbar />
      <OrderList list={products} />
      <Alert
        isOpen={isIncreaseAmountAlertOpen}
        setIsOpen={setIsIncreaseAmountAlertOpen}
        title="Inserir no carrinho"
        description="Informe a quantidade desejada e confirme para inserir no carrinho: "
        children={<IncreaseAmount />}
      />
    </>
  );
}
