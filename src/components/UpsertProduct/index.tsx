import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Button, Input, Label, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useAuthControlContext, useDataControlContext } from '../../contexts';
import { iProduct } from '../../interfaces';
import { axiosProductService } from '../../services';
import { useToastController } from '@tamagui/toast';
import { CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import { AxiosError, AxiosResponse } from 'axios';
import { applyAlwaysIntegerMask, applyCurrencyMask, removeCurrencyMask } from '../../helpers/utils';

type props = {
  isUpdate: boolean;
};

export default function UpsertProduct({ isUpdate }: props) {
  const { user } = useAuthControlContext();
  const { setIsCreateProductDialogOpen, setIsEditProductDialogOpen } = useApplicationControlContext();
  const { selectedProduct, setRefreshProducts } = useDataControlContext();
  const toast = useToastController();

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (isUpdate) {
      setDescription(selectedProduct?.description!);
      setPrice(applyCurrencyMask(String(selectedProduct?.price! * 100)));
      setStock(selectedProduct?.countable ? selectedProduct?.quantity?.toString()! : '0');
    }
  }, [isUpdate]);

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (isUpdate) {
      handleSubmitUpdate();
    } else {
      handleSubmitCreate();
    }

    setRefreshProducts((prev) => !prev);
  };

  const handleSubmitCreate = () => {
    if (description === '' || price === '') {
      toast.show('Ocorreu um erro!', {
        message: 'Existem campos não preenchidos.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });

      return;
    }

    try {
      axiosProductService.post<iProduct, AxiosResponse<iProduct>, iProduct>('', {
        description,
        price: removeCurrencyMask(price),
        userId: user.id,
      });

      toast.show('Produto incluído!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });

      setIsCreateProductDialogOpen(false);
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = 'Não foi possível incluir o produto.';
      toast.show(title, {
        message: message,
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    }
  };

  const handleSubmitUpdate = () => {
    if (description === '' || price === '') {
      toast.show('Ocorreu um erro!', {
        message: 'Existem campos não preenchidos.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });

      return;
    }

    try {
      axiosProductService.patch<iProduct, AxiosResponse<iProduct>, iProduct>(`/${selectedProduct?.id}`, {
        description,
        price: removeCurrencyMask(price),
        quantity: stock !== '' ? Number(stock) : 0,
      });

      toast.show('Produto atualizado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });

      setIsEditProductDialogOpen(false);
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = 'Não foi possível atualizar o produto.';
      toast.show(title, {
        message: message,
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    }
  };

  return (
    <>
      <YStack space>
        <YStack>
          <Label disabled color='#D9D9E3'>
            Descrição:
          </Label>
          <Input onChangeText={(text) => setDescription(text)} bc='#D9D9E3' value={description} maxLength={20} />
        </YStack>
        <XStack space>
          <YStack flex={1}>
            <Label disabled color='#D9D9E3'>
              Valor unitário:
            </Label>
            <Input onChangeText={(text) => setPrice(applyCurrencyMask(text))} keyboardType='numeric' bc='#D9D9E3' value={price} />
          </YStack>
          {isUpdate && selectedProduct?.countable && (
            <YStack flex={1}>
              <Label disabled color='#D9D9E3'>
                Estoque:
              </Label>
              <Input onChangeText={(text) => setStock(applyAlwaysIntegerMask(text))} keyboardType='numeric' bc='#D9D9E3' value={stock} />
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
