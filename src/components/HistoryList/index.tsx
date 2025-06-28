import React from 'react';
import { ScrollView, View, Text, Spinner, YStack, Button } from 'tamagui';
import { RefreshCw } from '@tamagui/lucide-icons';
import { iHistoryOrder } from '../../interfaces';
import HistoryListItem from '../HistoryListItem';

type props = {
  list: iHistoryOrder[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
};

export default function HistoryList({ 
  list, 
  loading = false, 
  hasMore = false, 
  onLoadMore,
  onRefresh
}: props) {
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (hasMore && !loading && onLoadMore) {
        onLoadMore();
      }
    }
  };

  if (list.length === 0 && !loading) {
    return (
      <View flex={1} bc='#202123' alignItems='center' justifyContent='center' paddingHorizontal='$4'>
        <Text color={'whitesmoke'} textAlign='center' marginBottom='$4'>
          Nenhum registro encontrado.
        </Text>
        {onRefresh && (
          <Button
            onPress={onRefresh}
            icon={<RefreshCw size={16} />}
            backgroundColor='#19C37D'
            color='white'
            size='$3'
          >
            Tentar Novamente
          </Button>
        )}
      </View>
    );
  }

  return (
    <ScrollView 
      bc='#202123' 
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <YStack space='$2' paddingBottom='$4'>
        {list?.map((item, idx) => (
          <HistoryListItem key={`${item.id}-${idx}`} item={item} />
        ))}
        
        {loading && (
          <View 
            alignItems='center' 
            justifyContent='center' 
            paddingVertical='$4'
            paddingHorizontal='$4'
          >
            <Spinner size='large' color='#19C37D' />
            <Text color='#D9D9E3' marginTop='$2' fontSize='$3'>
              Carregando mais registros...
            </Text>
          </View>
        )}
        
        {!hasMore && list.length > 0 && (
          <View 
            alignItems='center' 
            justifyContent='center' 
            paddingVertical='$4'
            paddingHorizontal='$4'
          >
            <Text color='#D9D9E3' fontSize='$3'>
              Todos os registros foram carregados.
            </Text>
          </View>
        )}
      </YStack>
    </ScrollView>
  );
}
