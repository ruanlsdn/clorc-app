import { Clipboard, Eye, Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { iHistoryOrder } from '../../interfaces';
import AvatarIcon from '../AvatarIcon';
import { useNavigation } from '@react-navigation/native';
import { useDataControlContext } from '../../contexts';

type props = {
  item: iHistoryOrder;
};

export default function HistoryListItem({ item }: props) {
  const { setSelectedCard } = useDataControlContext();
  const { navigate } = useNavigation();

  const handleEyeButton = () => {
    setSelectedCard(item);
    navigate('historyCart' as never);
  };

  return (
    <>
      <View style={styles.container}>
        <XStack space='$3' alignItems='center' justifyContent='center'>
          {item.checked === null && <AvatarIcon icon={<Clipboard color='#ffffff' />} />}
          {item.checked && <AvatarIcon icon={<Clipboard color='#19C37D' />} />}
          {!item.checked && <AvatarIcon icon={<Clipboard color='red10Dark' />} />}
          <YStack space='$1.5' alignItems='flex-start' justifyContent='center'>
            <Text color='#ffffff' fontWeight='bold' fontSize='$6'>
              {item.clientName.toUpperCase()}
            </Text>
            <Text color='#D9D9E3' fontSize='$4'>
              {new Date(item.createdAt).toLocaleString('pt-br')}
            </Text>
          </YStack>
        </XStack>
        <TouchableOpacity onPress={handleEyeButton} style={styles.buttonContainer}>
          <Eye color='#ffffff' />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#343541',
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 6,
    height: 85,
    elevation: 5,
    padding: 20,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#565869',
    borderRadius: 100,
    elevation: 5,
  },
});
