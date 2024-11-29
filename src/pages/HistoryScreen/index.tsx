import React from 'react';
import { HistoryList, Searchbar } from '../../components';
import { useDataControlContext } from '../../contexts';

export default function HistoryScreen() {
  const { cards } = useDataControlContext();

  return (
    <>
      <Searchbar />
      <HistoryList list={cards} />
    </>
  );
}
