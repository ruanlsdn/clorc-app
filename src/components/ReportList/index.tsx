import React from 'react';
import { ScrollView } from 'tamagui';
import { Report } from '../../pages/ReportsScreen';
import ReportListItem from '../ReportListItem';

type props = {
  list: Report[];
};

export default function ReportList({ list }: props) {
  return (
    <ScrollView flex={1} bc='#202123'>
      {list?.map((item, idx) => (
        <ReportListItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
}
