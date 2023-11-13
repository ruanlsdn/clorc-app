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
    isCreateProductDialogOpen,
    setIsCreateProductDialogOpen,
    isEditProductDialogOpen,
    setIsEditProductDialogOpen,
    isDeleteProductAlertOpen,
    setIsDeleteProductAlertOpen,
  } = useApplicationControlContext();

  return (
    <>
      <Searchbar />
      <ProductsList list={dummy} />
      <Alert
        title="Excluir"
        description="Tem certeza que deseja excluir o produto?"
        isOpen={isDeleteProductAlertOpen}
        setIsOpen={setIsDeleteProductAlertOpen}
      />
      <AdaptedDialog
        title="Cadastrar"
        description="Preencha os campos abaixo e confirme para salvar o produto:"
        isOpen={isCreateProductDialogOpen}
        setIsOpen={setIsCreateProductDialogOpen}
      />
      <AdaptedDialog
        title="Editar"
        description="Atualize os campos abaixo e confirme para salvar suas alterações:"
        isOpen={isEditProductDialogOpen}
        setIsOpen={setIsEditProductDialogOpen}
      />
    </>
  );
}
