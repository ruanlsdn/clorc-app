import React from 'react';
import { ScrollView, View, Text } from 'tamagui';
import { iHistoryOrder } from '../../interfaces';
import HistoryListItem from '../HistoryListItem';

type props = {
  list: iHistoryOrder[];
};

export default function HistoryList({ list }: props) {
  return (
    <>
      {list.length > 0 && (
        <ScrollView bc='#202123'>
          {list?.map((item, idx) => (
            <HistoryListItem key={idx} item={item} />
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
