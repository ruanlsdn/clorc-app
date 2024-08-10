import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Label, YStack } from 'tamagui';
import { useCartControlContext, useDataControlContext } from '../../contexts';
import { useAxios } from '../../hooks';
import { axiosCardService } from '../../services';
import { CardProductDto, CreateCardDto, iCard } from '../../interfaces';

export default function CartOrderInfo() {
  const { setRefreshHistory } = useDataControlContext();
  const { cartProducts } = useCartControlContext();
  const { fetchData } = useAxios<CreateCardDto, any>();

  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');

  const handleSubmit = async () => {
    if (cartProducts.length > 0) {
      const products: CardProductDto[] = [];

      cartProducts.forEach((product) => {
        products.push({ productId: product.id!, productPrice: product.price!, productQuantity: product.quantity });
      });

      await fetchData(
        {
          axiosInstance: axiosCardService,
          method: 'post',
          url: '',
        },
        {
          clientName: name,
          products: products,
          userId: '3961175a-382a-462d-b669-9978329276a3',
        },
      );

      setRefreshHistory((prev) => !prev);
    }
  };

  return (
    <>
      <YStack space>
        <YStack>
          <Label disabled color='#D9D9E3'>
            Nome do cliente:
          </Label>
          <Input onChangeText={(text) => setName(text)} bc='#D9D9E3' value={name} />
        </YStack>
        <YStack>
          <Label disabled color='#D9D9E3'>
            Endereço de entrega:
          </Label>
          <Input onChangeText={(text) => setAdress(text)} bc='#D9D9E3' value={adress} />
        </YStack>
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
