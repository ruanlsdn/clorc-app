import { Newspaper, Printer, Settings } from '@tamagui/lucide-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { Report } from '../../pages/ReportsScreen';
import AvatarIcon from '../AvatarIcon';

type props = {
  item: Report;
};

export default function ReportListItem({ item }: props) {
  return (
    <>
      <View style={styles.container}>
        <XStack space='$3' alignItems='center' justifyContent='center'>
          <AvatarIcon icon={<Newspaper color='#ffffff' />} />
          <YStack space='$1.5' alignItems='flex-start' justifyContent='center'>
            <Text color='#ffffff' fontWeight='bold' fontSize='$6'>
              {item.title.toUpperCase()}
            </Text>
          </YStack>
        </XStack>
        {item.hasOptions && (
          <TouchableOpacity onPress={() => console.log(1)} style={styles.buttonContainer}>
            <Settings color='#ffffff' />
          </TouchableOpacity>
        )}
        {!item.hasOptions && (
          <TouchableOpacity onPress={() => console.log(1)} style={styles.buttonContainer}>
            <Printer color='#ffffff' />
          </TouchableOpacity>
        )}
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
