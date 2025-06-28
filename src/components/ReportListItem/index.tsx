import { CheckCircle2, Newspaper, Printer, Settings, XCircle } from '@tamagui/lucide-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useAuthControlContext, useDataControlContext } from '../../contexts';
import { generateHtml } from '../../helpers/reports/generate-html';
import { Report } from '../../pages/ReportsScreen';
import AvatarIcon from '../AvatarIcon';
import { generateBodyHtml } from '../../helpers/reports/generate-stock-report-body-html';
import { useToastController } from '@tamagui/toast';

type props = {
  item: Report;
};

export default function ReportListItem({ item }: props) {
  const { 
    setIsSellReportSettingsDialogOpen,
    setIsMenuConfigurationDialogOpen
  } = useApplicationControlContext();
  const { products, setRefreshProducts } = useDataControlContext();
  const toast = useToastController();

  const handleOnPressSettingsButton = () => {
    if (item.title === 'Cardápio') {
      setIsMenuConfigurationDialogOpen(true);
    } else {
      setIsSellReportSettingsDialogOpen(true);
    }
  };

  const handleOnPressPrintButton = async () => {
    setRefreshProducts(true);

    const filteredProducts = products.filter((product) => product.countable).sort((a, b) => b.quantity! - a.quantity!);
    const response = await Print.printToFileAsync({ html: generateHtml(generateBodyHtml(filteredProducts)) });
    const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}relatorio_estoque_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });

    try {
      await shareAsync(pdfName);
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível gerar o relatório.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      await FileSystem.deleteAsync(pdfName, { idempotent: true });

      toast.show('Relatório gerado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    }
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
