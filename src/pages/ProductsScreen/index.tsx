import { CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { AdaptedDialog, Alert, AlertButtons, ProductsList, Searchbar, UpsertProduct } from '../../components';
import { useApplicationControlContext, useDataControlContext } from '../../contexts';
import { axiosProductService } from '../../services';

export default function ProductsScreen() {
  const { products, selectedProduct, setRefreshProducts } = useDataControlContext();
  const {
    isCreateProductDialogOpen,
    setIsCreateProductDialogOpen,
    isEditProductDialogOpen,
    setIsEditProductDialogOpen,
    isDeleteProductAlertOpen,
    setIsDeleteProductAlertOpen,
  } = useApplicationControlContext();
  const toast = useToastController();

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleCancelButton = () => {
    setIsDeleteProductAlertOpen(false);
  };

  const handleConfirmButton = () => {
    try {
      axiosProductService.patch(`virtual-delete/${selectedProduct?.id}`);
      setIsDeleteProductAlertOpen(false);
      setRefreshProducts((prev) => !prev);
      toast.show('Produto excluído!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = 'Não foi possível excluir o produto.';
      toast.show(title, {
        message: message,
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <>
      <Searchbar
        placeholder='Pesquisar produto...'
        list={products}
        searchParameter='description'
        onFilterUpdate={setFilteredProducts}
      />
      <ProductsList list={filteredProducts} />
      <Alert
        title='Excluir'
        description='Tem certeza que deseja excluir o produto?'
        isOpen={isDeleteProductAlertOpen}
        setIsOpen={setIsDeleteProductAlertOpen}
        children={<AlertButtons handleCancelButton={handleCancelButton} handleConfirmButton={handleConfirmButton} />}
      />
      <AdaptedDialog
        title='Cadastrar'
        description='Preencha os campos abaixo e confirme para salvar o produto:'
        isOpen={isCreateProductDialogOpen}
        setIsOpen={setIsCreateProductDialogOpen}
        children={<UpsertProduct isUpdate={false} />}
      />
      <AdaptedDialog
        title='Editar'
        description='Atualize os campos abaixo e confirme para salvar suas alterações:'
        isOpen={isEditProductDialogOpen}
        setIsOpen={setIsEditProductDialogOpen}
        children={<UpsertProduct isUpdate={true} />}
      />
    </>
  );
}
