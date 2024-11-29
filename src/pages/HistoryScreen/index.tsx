import React, { useState } from 'react';
import { HistoryList, Searchbar } from '../../components';
import { useDataControlContext } from '../../contexts';

export default function HistoryScreen() {
  const { cards } = useDataControlContext();
  const [filteredCards, setFilteredCards] = useState(cards);

  return (
    <>
      <Searchbar
        placeholder='Pesquisar cliente...'
        list={cards}
        searchParameter='clientName'
        onFilterUpdate={setFilteredCards}
      />
      <HistoryList list={filteredCards} />
    </>
  );
}
