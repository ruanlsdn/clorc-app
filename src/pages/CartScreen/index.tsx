import { useNavigation } from '@react-navigation/native';
import { CheckCircle2, ClipboardPaste, RefreshCcw, Share2, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { shareAsync } from 'expo-sharing';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Button, Text, XStack } from 'tamagui';
import { AdaptedDialog, CartList, CartOrderInfo, OrderTicketImage } from '../../components';
import { useApplicationControlContext, useAuthControlContext, useCartControlContext } from '../../contexts';

export default function CartScreen() {
  const { user } = useAuthControlContext();
  const { cartProducts, getTotalPriceOnCart, getTotalQuantityOnCart, removeAllProductsFromCart } = useCartControlContext();
  const { isOrderInfoAlertOpen, setIsOrderInfoAlertOpen } = useApplicationControlContext();
  const { goBack } = useNavigation();
  const toast = useToastController();
  const orderTicketRef = useRef<View>(null);

  const handleRefreshButton = () => {
    removeAllProductsFromCart();
    goBack();
  };

  const handleShareButton = async () => {
    if (cartProducts.length === 0) return;

    try {
      const uri = await captureRef(orderTicketRef, { format: 'png', quality: 1, result: 'tmpfile' });

      await shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartilhar Imagem',
      });

      toast.show('Pedido compartilhado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível compartilhar o pedido.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    }
  };

  const handleCreateOrderButton = () => {
    setIsOrderInfoAlertOpen(true);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Renderizado fora da tela apenas para captura da imagem */}
        <View style={styles.offscreen} pointerEvents='none'>
          <OrderTicketImage ref={orderTicketRef} username={user.name || ''} products={cartProducts} />
        </View>
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
  offscreen: {
    position: 'absolute',
    left: -10000,
    top: 0,
  },
  div: {
    marginHorizontal: 45,
    backgroundColor: '#19C37D',
    height: 0.5,
  },
});
