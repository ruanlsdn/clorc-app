import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Calendar, CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosError, AxiosResponse } from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button, Input, Label, XStack, YStack } from 'tamagui';
import {
  useApplicationControlContext,
  useAuthControlContext,
  useCartControlContext,
  useDataControlContext,
} from '../../contexts';
import { generateHtml } from '../../helpers/reports/generate-html';
import { generateBodyHtml } from '../../helpers/reports/generate-order-report-body-html';
import { CardProductDto, CreateCardDto, iCard } from '../../interfaces';
import { axiosCardService } from '../../services';

export default function CartOrderInfo() {
  const { user } = useAuthControlContext();
  const { setRefreshCards } = useDataControlContext();
  const { setIsOrderInfoAlertOpen } = useApplicationControlContext();
  const { cartProducts } = useCartControlContext();
  const toast = useToastController();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const showDatePickerInitialDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: deliveryDate,
      onChange: onChangeDeliveryDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeDeliveryDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDeliveryDate(currentDate);
  };

  const handleSubmit = async () => {
    setIsOrderInfoAlertOpen((prev) => !prev);

    if (cartProducts.length > 0) {
      const report = await createOrderReport();

      await createCard();

      try {
        await shareAsync(report);
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      } finally {
        await FileSystem.deleteAsync(report, { idempotent: true });
      }

      setRefreshCards((prev) => !prev);
    }
  };

  const createOrderReport = async () => {
    const response = await Print.printToFileAsync({ html: generateHtml(generateBodyHtml(name, address, deliveryDate, cartProducts, true)) });
    const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}pedido_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });

    return pdfName;
  };

  const createCard = async () => {
    const products: CardProductDto[] = [];

    cartProducts.forEach((product) => {
      products.push({ productId: product.id!, productPrice: product.price!, productQuantity: product.quantity });
    });

    try {
      await axiosCardService.post<iCard, AxiosResponse<iCard>, CreateCardDto>('', {
        clientName: name,
        clientAddress: address,
        products: products,
        userId: user.id!,
      });

      toast.show('Pedido criado!', {
        message: 'Visualização disponível no histórico.',
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = 'Não foi possível criar o pedido.';
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
            Nome do cliente:
          </Label>
          <Input onChangeText={(text) => setName(text)} bc='#D9D9E3' value={name} />
        </YStack>
        <YStack>
          <Label disabled color='#D9D9E3'>
            Endereço de entrega:
          </Label>
          <Input onChangeText={(text) => setAddress(text)} bc='#D9D9E3' value={address} />
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
