import React from "react";
import {
  AdaptedDialog,
  Alert,
  ProductsList,
  Searchbar,
} from "../../components";
import { iProduct } from "../../interfaces";
import { useApplicationControlContext } from "../../contexts";
import { ActionEnum } from "../../enums/ActionEnum";

const dummy: iProduct[] = [
  {
    title: "Item 1",
    price: 3.0,
  },
  {
    title: "Item 2",
    price: 3.0,
  },
  {
    title: "Item 3",
    price: 3.0,
  },
  {
    title: "Item 4",
    price: 3.0,
  },
  {
    title: "Item 5",
    price: 3.0,
  },
  {
    title: "Item 6",
    price: 3.0,
  },
  {
    title: "Item 7",
    price: 3.0,
  },
  {
    title: "Item 8",
    price: 3.0,
  },
];

export default function ProductsScreen() {
  const {
    action,
    isAdaptedDialogOpen,
    setIsAdaptedDialogOpen,
    isAlertOpen,
    setIsAlertOpen,
  } = useApplicationControlContext();

  const showAdaptedDialog = (action: ActionEnum) => {
    switch (action) {
      case ActionEnum.CREATE:
        return (
          <AdaptedDialog
            title="Cadastrar"
            description="Preencha os campos abaixo e confirme para salvar o produto:"
            isOpen={isAdaptedDialogOpen}
            setIsOpen={setIsAdaptedDialogOpen}
          />
        );
      case ActionEnum.UPDATE:
        return (
          <AdaptedDialog
            title="Editar"
            description="Atualize os campos abaixo e confirme para salvar suas alterações:"
            isOpen={isAdaptedDialogOpen}
            setIsOpen={setIsAdaptedDialogOpen}
          />
        );
    }
  };

  return (
    <>
      <Searchbar />
      <ProductsList list={dummy} />
      <Alert
        title="Excluir"
        description="Tem certeza que deseja excluir o produto?"
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        />
        {showAdaptedDialog(action)}
    </>
  );
}
