import { Check, ClipboardPaste, X } from '@tamagui/lucide-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, XStack } from 'tamagui';
import { CardOrderList } from '../../components';
import { useDataControlContext } from '../../contexts';

export default function CardScreen() {
  const { selectedCard } = useDataControlContext();

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

  return (
    <View style={styles.container}>
      <View style={styles.clientInfoContainer}>
        <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
          {selectedCard?.clientName?.toUpperCase()}
        </Text>
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
          >
            <ClipboardPaste color='#D9D9E3' />
          </Button>
        </XStack>
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
