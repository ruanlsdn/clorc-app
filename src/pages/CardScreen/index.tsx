import { Check, ClipboardPaste, ListRestart, X } from '@tamagui/lucide-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, XStack } from 'tamagui';
import { CardOrderList } from '../../components';
import { useDataControlContext } from '../../contexts';
import { useAxios } from '../../hooks';
import { axiosCardService } from '../../services';
import { CardProductDto, CreateCardDto } from '../../interfaces';
import { userId } from '../../../userId';
import { useNavigation } from '@react-navigation/native';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import { generateHtml } from '../../helpers/reports/generate-html';
import { generateBodyHtml } from '../../helpers/reports/generate-order-report-body-html';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';

interface UpdateCardStatusDto {
  checked: boolean;
}

export default function CardScreen() {
  const { selectedCard, setRefreshCards, setRefreshProducts } = useDataControlContext();
  const { goBack } = useNavigation();
  const { fetchData: fetchDataCardStatus } = useAxios<UpdateCardStatusDto, any>();
  const { fetchData: fetchDataNewCard } = useAxios<CreateCardDto, any>();

  const getTotalQuantityOnCard = () => {
    let quantity = 0;

    selectedCard?.orders.forEach((item) => {
      quantity += item.productQuantity;
    });

    return quantity;
  };

  const getTotalPriceOnCard = () => {
    let price = 0;

    selectedCard?.orders.forEach((item) => {
      price += item.productPrice! * item.productQuantity;
    });

    return price.toFixed(2);
  };

  const handleDenyButton = async () => {
    await fetchDataCardStatus(
      {
        axiosInstance: axiosCardService,
        method: 'patch',
        url: String(selectedCard?.id),
      },
      {
        checked: false,
      },
    );

    setRefreshCards((prev) => !prev);

    goBack();
  };

  const handleConfirmButton = async () => {
    await fetchDataCardStatus(
      {
        axiosInstance: axiosCardService,
        method: 'patch',
        url: String(selectedCard?.id),
      },
      {
        checked: true,
      },
    );

    setRefreshCards((prev) => !prev);
    setRefreshProducts((prev) => !prev);

    goBack();
  };

  const handleRemakeButton = async () => {
    if (selectedCard?.orders?.length! > 0) {
      const products: CardProductDto[] = [];

      selectedCard?.orders?.forEach((order) => {
        products.push({
          productId: order.product.id,
          productPrice: order.productPrice,
          productQuantity: order.productQuantity,
        });
      });

      await fetchDataNewCard(
        {
          axiosInstance: axiosCardService,
          method: 'post',
          url: '',
        },
        {
          clientName: selectedCard?.clientName!,
          products: products,
          userId: userId,
        },
      );

      setRefreshCards((prev) => !prev);

      goBack();
    }
  };

  const handleClipboardButton = async () => {
    const report = await createOrderReport();

    try {
      await shareAsync(report);
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    } finally {
      await FileSystem.deleteAsync(report, { idempotent: true });
    }
  };

  const createOrderReport = async () => {
    const response = await Print.printToFileAsync({
      html: generateHtml(
        generateBodyHtml(
          selectedCard?.clientName!,
          undefined!,
          moment(selectedCard?.createdAt).toDate(),
          selectedCard?.orders!.map((order) => {
            return {
              description: order.product.description,
              price: order.productPrice,
              quantity: order.productQuantity,
            };
          })!,
        ),
      ),
    });

    const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}pedido_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });

    return pdfName;
  };

  return (
    <View style={styles.container}>
      <View style={styles.clientInfoContainer}>
        {selectedCard?.clientName && (
          <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
            {selectedCard?.clientName?.toUpperCase()}
          </Text>
        )}
        <Text fontSize='$4' color='#D9D9E3'>
          {new Date(selectedCard?.createdAt!).toLocaleString('pt-br')}
        </Text>
      </View>
      <View style={styles.ordersContainer}>
        <CardOrderList list={selectedCard?.orders!} />
      </View>
      <View style={styles.div} />
      <View style={styles.summaryContainer}>
        <XStack space='$2' alignSelf='flex-end' marginTop='$4'>
          <Text fontSize='$6' color='#D9D9E3'>
            Itens incluídos:
          </Text>
          <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
            {getTotalQuantityOnCard()}
          </Text>
        </XStack>
        <XStack space='$2' alignSelf='flex-end' marginBottom='$4'>
          <Text fontSize='$6' color='#D9D9E3'>
            Somatório:
          </Text>
          <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
            R$ {getTotalPriceOnCard()}
          </Text>
        </XStack>
        {selectedCard?.checked !== null && (
          <XStack space justifyContent='space-between'>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleRemakeButton}
            >
              <ListRestart color='#D9D9E3' />
            </Button>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleClipboardButton}
            >
              <ClipboardPaste color='#D9D9E3' />
            </Button>
          </XStack>
        )}
        {selectedCard?.checked === null && (
          <XStack space justifyContent='space-between'>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleDenyButton}
            >
              <X color='#D9D9E3' />
            </Button>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleConfirmButton}
            >
              <Check color='#D9D9E3' />
            </Button>
            <Button
              circular
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleClipboardButton}
            >
              <ClipboardPaste color='#D9D9E3' />
            </Button>
          </XStack>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202123',
    elevation: 5,
  },
  clientInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  ordersContainer: {
    flex: 3.5,
    backgroundColor: '#202123',
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#202123',
    paddingHorizontal: 10,
  },
  div: {
    marginHorizontal: 45,
    backgroundColor: '#19C37D',
    height: 0.5,
  },
});
