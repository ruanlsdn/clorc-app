import React from 'react';
import { ScrollView, View, Text } from 'tamagui';
import { iProduct } from '../../interfaces';
import OrderListItem from '../OrderListItem';

type props = {
  list: iProduct[];
};

export default function OrderList({ list }: props) {
  return (
    <>
      {list.length > 0 && (
        <ScrollView bc='#202123'>
          {list.map((item, idx) => (
            <OrderListItem key={idx} item={item} />
          ))}
        </ScrollView>
      )}
      {list.length === 0 && (
        <View flex={1} bc='#202123' alignItems='center' justifyContent='center'>
          <Text color={'whitesmoke'}>Nenhum registro encontrado.</Text>
        </View>
      )}
    </>
  );
}
