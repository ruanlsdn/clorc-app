import React, { useEffect, useState } from 'react';
import { Alert, IncreaseAmount, OrderList, Searchbar } from '../../components';
import { useApplicationControlContext, useDataControlContext } from '../../contexts';

export default function OrderScreen() {
  const { products } = useDataControlContext();
  const { isIncreaseAmountAlertOpen, setIsIncreaseAmountAlertOpen } = useApplicationControlContext();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products])

  return (
    <>
      <Searchbar
        placeholder='Pesquisar produto...'
        list={products}
        searchParameter='description'
        onFilterUpdate={setFilteredProducts}
      />
      <OrderList list={filteredProducts} />
      <Alert
        isOpen={isIncreaseAmountAlertOpen}
        setIsOpen={setIsIncreaseAmountAlertOpen}
        title='Inserir no carrinho'
        description='Informe a quantidade desejada e confirme para inserir no carrinho: '
        children={<IncreaseAmount />}
      />
    </>
  );
}
