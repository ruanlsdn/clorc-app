import { useNavigation } from '@react-navigation/native';
import { CheckCircle2, ClipboardPaste, RefreshCcw, Share2, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosError, AxiosResponse } from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, XStack } from 'tamagui';
import { AdaptedDialog, CartList, CartOrderInfo } from '../../components';
import { useApplicationControlContext, useAuthControlContext, useCartControlContext } from '../../contexts';
import { generateHtml } from '../../helpers/reports/generate-html';
import { generateBodyHtml } from '../../helpers/reports/generate-order-report-body-html';
import { Base64ToImageDto, PdfToImageDto } from '../../interfaces';
import { axiosReportService } from '../../services';

export default function CartScreen() {
  const { user } = useAuthControlContext();
  const { cartProducts, getTotalPriceOnCart, getTotalQuantityOnCart, removeAllProductsFromCart } = useCartControlContext();
  const { isOrderInfoAlertOpen, setIsOrderInfoAlertOpen } = useApplicationControlContext();
  const { goBack } = useNavigation();
  const toast = useToastController();

  const handleRefreshButton = () => {
    removeAllProductsFromCart();
    goBack();
  };

  const handleShareButton = async () => {
    if (cartProducts.length === 0) return;

    const { base64 } = await Print.printToFileAsync({
      html: generateHtml(generateBodyHtml(user.name!, undefined!, undefined!, undefined!, cartProducts, false)),
      base64: true,
    });

    const filePath = `${FileSystem.cacheDirectory}converted-image.png`;

    try {
      const response = await axiosReportService.post<Base64ToImageDto, AxiosResponse<Base64ToImageDto>, PdfToImageDto>(
        'convert-pdf-to-image',
        { base64: base64! },
      );

      if (response.data.base64Image) {
        await FileSystem.writeAsStringAsync(filePath, response.data.base64Image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await shareAsync(filePath, {
          mimeType: 'image/png',
          dialogTitle: 'Compartilhar Imagem',
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = 'Não foi possível compartilhar o pedido.';
      toast.show(title, {
        message: message,
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      await FileSystem.deleteAsync(filePath, { idempotent: true });
      toast.show('Pedido compartilhado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    }
  };

  const handleCreateOrderButton = () => {
    setIsOrderInfoAlertOpen(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cartContainer}>
          <CartList list={cartProducts} />
        </View>
        <View style={styles.div} />
        <View style={styles.summaryContainer}>
          <XStack space='$2' alignSelf='flex-end' marginTop='$4'>
            <Text fontSize='$6' color='#D9D9E3'>
              Itens incluídos:
            </Text>
            <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
              x{getTotalQuantityOnCart()}
            </Text>
          </XStack>
          <XStack space='$2' alignSelf='flex-end' marginBottom='$4'>
            <Text fontSize='$6' color='#D9D9E3'>
              Somatório:
            </Text>
            <Text fontSize='$6' fontWeight='bold' color='#ffffff'>
              R$ {getTotalPriceOnCart()}
            </Text>
          </XStack>
          <XStack space justifyContent='space-between'>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleRefreshButton}
            >
              <RefreshCcw color='#D9D9E3' />
            </Button>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleShareButton}
            >
              <Share2 color='#D9D9E3' />
            </Button>
            <Button
              bc='#343541'
              flex={1}
              elevationAndroid={5}
              pressStyle={{
                opacity: 0.5,
                borderColor: '#343541',
                backgroundColor: '#343541',
              }}
              onPress={handleCreateOrderButton}
            >
              <ClipboardPaste color='#D9D9E3' />
            </Button>
          </XStack>
        </View>
      </View>
      <AdaptedDialog
        title='Pedido'
        description='Preencha os campos abaixo e confirme para gerar o pedido:'
        isOpen={isOrderInfoAlertOpen}
        setIsOpen={setIsOrderInfoAlertOpen}
        children={<CartOrderInfo />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202123',
  },
  cartContainer: {
    flex: 4,
    backgroundColor: '#202123',
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#202123',
    paddingHorizontal: 10,
  },
  div: {
    marginHorizontal: 45,
    backgroundColor: '#19C37D',
    height: 0.5,
  },
});
