import { Newspaper, Printer, Settings } from '@tamagui/lucide-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useDataControlContext } from '../../contexts';
import { generateHtml } from '../../helpers/reports/generate-html';
import { Report } from '../../pages/ReportsScreen';
import AvatarIcon from '../AvatarIcon';
import { generateBodyHtml } from '../../helpers/reports/generate-stock-report-body-html';

type props = {
  item: Report;
};

export default function ReportListItem({ item }: props) {
  const { setIsSellReportSettingsDialogOpen } = useApplicationControlContext();
  const { products, setRefreshProducts } = useDataControlContext();

  const handleOnPressSettingsButton = () => {
    setIsSellReportSettingsDialogOpen(true);
  };

  const handleOnPressPrintButton = async () => {
    setRefreshProducts(true);

    const response = await Print.printToFileAsync({ html: generateHtml(generateBodyHtml(products.filter((product) => product.countable))) });
    const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}relatorio_estoque_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });

    await shareAsync(pdfName);
  };

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
          <TouchableOpacity onPress={handleOnPressSettingsButton} style={styles.buttonContainer}>
            <Settings color='#ffffff' />
          </TouchableOpacity>
        )}
        {!item.hasOptions && (
          <TouchableOpacity onPress={handleOnPressPrintButton} style={styles.buttonContainer}>
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
