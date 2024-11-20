import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Button, Input, Label, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useDataControlContext } from '../../contexts';
import { useAxios } from '../../hooks';
import { iProduct } from '../../interfaces';
import { axiosProductService } from '../../services';

type props = {
  isUpdate: boolean;
};

export default function UpsertProduct({ isUpdate }: props) {
  const { setIsCreateProductDialogOpen, setIsEditProductDialogOpen } = useApplicationControlContext();
  const { selectedProduct, setRefreshProducts } = useDataControlContext();
  const { fetchData } = useAxios<iProduct, iProduct>();

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (isUpdate) {
      setDescription(selectedProduct?.description!);
      setPrice(selectedProduct?.price?.toString()!);
      setStock(selectedProduct?.quantity?.toString()!);
    }
  }, [isUpdate]);

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (isUpdate) {
      handleSubmitUpdate();
      setIsEditProductDialogOpen(false);
    } else {
      handleSubmitCreate();
      setIsCreateProductDialogOpen(false);
    }

    setRefreshProducts((prev) => !prev);
  };

  const handleSubmitCreate = async () => {
    await fetchData(
      {
        axiosInstance: axiosProductService,
        method: 'post',
        url: '',
      },
      {
        description,
        price: Number(price),
        userId: '92b921e2-e479-4c50-947c-f7d98fcc5c82',
      },
    );
  };

  const handleSubmitUpdate = async () => {
    await fetchData(
      {
        axiosInstance: axiosProductService,
        method: 'patch',
        url: `/${selectedProduct?.id}`,
      },
      {
        description,
        price: Number(price),
        quantity: stock !== '' ? Number(stock) : 0,
      },
    );
  };

  return (
    <>
      <YStack space>
        <YStack>
          <Label disabled color='#D9D9E3'>
            Descrição:
          </Label>
          <Input onChangeText={(text) => setDescription(text)} bc='#D9D9E3' value={description} />
        </YStack>
        <XStack space>
          <YStack flex={1}>
            <Label disabled color='#D9D9E3'>
              Valor unitário:
            </Label>
            <Input onChangeText={(text) => setPrice(text)} keyboardType='numeric' bc='#D9D9E3' value={price} />
          </YStack>
          {isUpdate && selectedProduct?.countable && (
            <YStack flex={1}>
              <Label disabled color='#D9D9E3'>
                Estoque:
              </Label>
              <Input onChangeText={(text) => setStock(text)} keyboardType='numeric' bc='#D9D9E3' value={stock} />
            </YStack>
          )}
        </XStack>
      </YStack>
      <Button
        bc='#19C37D'
        marginTop='$8'
        elevationAndroid={5}
        pressStyle={{
          opacity: 0.5,
          borderColor: '#19C37D',
          backgroundColor: '#19C37D',
        }}
        onPress={handleSubmit}
      >
        Confirmar
      </Button>
    </>
  );
}

const styles = StyleSheet.create({});
