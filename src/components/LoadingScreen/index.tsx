import React from 'react';
import { View, Text, Spinner } from 'tamagui';

type LoadingScreenProps = {
  message?: string;
  size?: 'large' | 'small';
};

export default function LoadingScreen({ 
  message = 'Carregando...', 
  size = 'large' 
}: LoadingScreenProps) {
  return (
    <View flex={1} alignItems='center' justifyContent='center' bc='#202123'>
      <Spinner size={size} color='#19C37D' />
      <Text color='#D9D9E3' marginTop='$2' fontSize='$4'>
        {message}
      </Text>
    </View>
  );
} 