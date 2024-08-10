import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'tamagui';
import { iCardOrder } from '../../interfaces';
import CardOrderListItem from '../CardOrderListItem';

type props = {
  list: iCardOrder[];
};

export default function CardOrderList({ list }: props) {
  return (
    <ScrollView marginTop='$2'>
      {list.map((item, idx) => (
        <CardOrderListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
