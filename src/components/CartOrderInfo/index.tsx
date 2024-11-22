import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button, Input, Label, XStack, YStack } from 'tamagui';
import { useCartControlContext, useDataControlContext } from '../../contexts';
import { useAxios } from '../../hooks';
import { axiosCardService } from '../../services';
import { CardProductDto, CreateCardDto, iCard } from '../../interfaces';
import { userId } from '../../../userId';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Calendar } from '@tamagui/lucide-icons';

export default function CartOrderInfo() {
  const { setRefreshHistory } = useDataControlContext();
  const { cartProducts } = useCartControlContext();
  const { fetchData } = useAxios<CreateCardDto, any>();

  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const showDatePickerInitialDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: deliveryDate,
      onChange: onChangeInitialDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeInitialDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDeliveryDate(currentDate);
  };

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
          userId: userId,
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
        <YStack>
          <Label disabled color='#D9D9E3'>
            Data de entrega:
          </Label>
          <XStack>
            <TextInput
              id='initialDate'
              editable={false}
              style={styles.dateInput}
              value={deliveryDate.toLocaleDateString('pt-br')}
            />
            <TouchableOpacity style={styles.dateButton} children={<Calendar />} onPress={showDatePickerInitialDate} />
          </XStack>
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

const styles = StyleSheet.create({
  dateInput: {
    backgroundColor: '#D9D9E3',
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
    height: 43,
  },
  dateButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 45,
    backgroundColor: '#D9D9E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
