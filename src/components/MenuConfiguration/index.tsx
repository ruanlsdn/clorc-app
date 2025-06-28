import { CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, Label, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useAuthControlContext, useDataControlContext } from '../../contexts';
import { generateHtml, generateMenuHtml } from '../../helpers/reports/generate-html';
import { generateMenuBodyHtml } from '../../helpers/reports/generate-menu-body-html';
import { useToastController } from '@tamagui/toast';
import { MenuThemeEnum } from '../../enums/ActionEnum';

export default function MenuConfiguration() {
  const { user } = useAuthControlContext();
  const { products } = useDataControlContext();
  const { setIsMenuConfigurationDialogOpen } = useApplicationControlContext();
  const toast = useToastController();

  const [footerText, setFooterText] = useState('Obrigado pela preferência!');
  const [subFooterText, setSubFooterText] = useState('Faça seu pedido pelo WhatsApp');
  const [observation, setObservation] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<MenuThemeEnum>(MenuThemeEnum.DEFAULT);

  const handleCancelButton = () => {
    setIsMenuConfigurationDialogOpen(false);
  };

  const handleConfirmButton = async () => {
    let pdfName: string = '';
    
    try {
      const businessName = user?.name || 'Estabelecimento';
      const response = await Print.printToFileAsync({
        html: generateMenuHtml(generateMenuBodyHtml(products, businessName, footerText, subFooterText, observation, selectedTheme))
      });
      pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}cardapio_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

      await FileSystem.moveAsync({
        from: response.uri,
        to: pdfName,
      });

      await shareAsync(pdfName);

      toast.show('Cardápio gerado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível gerar o cardápio.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      if (pdfName) {
        await FileSystem.deleteAsync(pdfName, { idempotent: true });
      }
      setIsMenuConfigurationDialogOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <YStack space='$3'>
        <YStack>
          <Label color='#D9D9E3' fontSize='$4'>
            Tema do Cardápio:
          </Label>
          <XStack space='$3'>
            <Button
              bc={selectedTheme === MenuThemeEnum.DEFAULT ? '#19C37D' : '#565869'}
              color='white'
              onPress={() => setSelectedTheme(MenuThemeEnum.DEFAULT)}
              pressStyle={{
                opacity: 0.5,
                borderColor: selectedTheme === MenuThemeEnum.DEFAULT ? '#19C37D' : '#565869',
                backgroundColor: selectedTheme === MenuThemeEnum.DEFAULT ? '#19C37D' : '#565869',
              }}
              flex={1}
            >
              Padrão
            </Button>
            <Button
              bc={selectedTheme === MenuThemeEnum.VIBRANT ? '#19C37D' : '#565869'}
              color='white'
              onPress={() => setSelectedTheme(MenuThemeEnum.VIBRANT)}
              pressStyle={{
                opacity: 0.5,
                borderColor: selectedTheme === MenuThemeEnum.VIBRANT ? '#ff6b6b' : '#565869',
                backgroundColor: selectedTheme === MenuThemeEnum.VIBRANT ? '#ff6b6b' : '#565869',
              }}
              flex={1}
            >
              Chamativo
            </Button>
          </XStack>
        </YStack>
        
        <YStack>
          <Label color='#D9D9E3' fontSize='$4'>
            Observação/Nota de destaque (opcional):
          </Label>
          <TextInput
            style={styles.input}
            value={observation}
            onChangeText={setObservation}
            placeholder='Ex: Venda apenas em pacotes de 5 unidades'
            placeholderTextColor='#565869'
            multiline
            numberOfLines={2}
          />
        </YStack>
        
        <YStack>
          <Label color='#D9D9E3' fontSize='$4'>
            Texto do Rodapé:
          </Label>
          <TextInput
            style={styles.input}
            value={footerText}
            onChangeText={setFooterText}
            placeholder='Ex: Obrigado pela preferência!'
            placeholderTextColor='#565869'
            multiline
            numberOfLines={2}
          />
        </YStack>

        <YStack>
          <Label color='#D9D9E3' fontSize='$4'>
            Texto Secundário:
          </Label>
          <TextInput
            style={styles.input}
            value={subFooterText}
            onChangeText={setSubFooterText}
            placeholder='Ex: Faça seu pedido pelo WhatsApp'
            placeholderTextColor='#565869'
            multiline
            numberOfLines={2}
          />
        </YStack>

        <XStack space='$3' justifyContent='center' marginTop='$5'>
          <Button
            bc='#565869'
            color='$red10Dark'
            onPress={handleCancelButton}
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
          >
            Cancelar
          </Button>
          <Button
            bc='#565869'
            color='#19C37D'
            onPress={handleConfirmButton}
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
          >
            Confirmar
          </Button>
        </XStack>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202123',
    borderRadius: 15,
  },
  input: {
    backgroundColor: '#343541',
    color: '#D9D9E3',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#565869',
    minHeight: 60,
    textAlignVertical: 'top',
  },
}); 