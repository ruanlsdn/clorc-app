import React, { useState, useCallback } from 'react';
import { View, Text, Spinner, YStack } from 'tamagui';
import { HistoryList, Searchbar } from '../../components';
import { useAuthControlContext, useDataControlContext } from '../../contexts';
import { useInfiniteScroll } from '../../hooks';

export default function HistoryScreen() {
  const { user } = useAuthControlContext();
  const { refreshCards } = useDataControlContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    data: cards,
    loading,
    hasMore,
    error,
    isInitialized,
    loadMore,
    refresh,
    search,
  } = useInfiniteScroll({
    userId: user?.id || '',
    searchTerm,
    pageSize: 15,
    refreshSignal: refreshCards,
  });

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleRefresh = useCallback(() => {
    setSearchTerm('');
    refresh();
  }, [refresh]);

  return (
    <YStack flex={1} bc='#202123'>
      <Searchbar
        placeholder='Pesquisar cliente...'
        onSearch={handleSearch}
        loading={loading}
      />
      
      {loading && cards.length === 0 ? (
        <View flex={1} alignItems='center' justifyContent='center'>
          <Spinner size='large' color='#19C37D' />
          <Text color='#D9D9E3' marginTop='$2' fontSize='$4'>
            Carregando registros...
          </Text>
        </View>
      ) : (
        <HistoryList 
          list={cards}
          loading={loading}
          hasMore={hasMore}
          error={error}
          isInitialized={isInitialized}
          onLoadMore={loadMore}
          onRefresh={handleRefresh}
        />
      )}
    </YStack>
  );
}
