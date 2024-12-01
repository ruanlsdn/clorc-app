import { CheckCircle2, ChevronDown, Pencil, ShoppingBag, Trash, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Accordion, Button, Square, Switch, Text, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useDataControlContext } from '../../contexts';
import { iProduct } from '../../interfaces';
import { axiosProductService } from '../../services';
import AvatarIcon from '../AvatarIcon';

type props = {
  item: iProduct;
};

export default function ProductsListItem({ item }: props) {
  const { setIsEditProductDialogOpen, setIsDeleteProductAlertOpen } = useApplicationControlContext();
  const { setSelectedProduct, setRefreshProducts } = useDataControlContext();
  const toast = useToastController();

  const handleOnPressEdit = () => {
    setSelectedProduct(item);
    setIsEditProductDialogOpen(true);
  };

  const handleOnPressDelete = () => {
    setSelectedProduct(item);
    setIsDeleteProductAlertOpen(true);
  };

  const handleSwitchChange = (checked: boolean) => {
    try {
      axiosProductService.patch<iProduct, AxiosResponse<iProduct>, iProduct>(`/${item.id}`, { countable: checked });
      toast.show('Produto atualizado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível atualizar o produto.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      setRefreshProducts((prev) => !prev);
    }
  };

  return (
    <>
      <Accordion marginBottom='$2' type='multiple' overflow='hidden' borderRadius='$5'>
        <Accordion.Item value={item.description!}>
          <Accordion.Trigger
            flexDirection='row'
            justifyContent='space-between'
            bc='#343541'
            borderColor='#343541'
            height='$8'
            pressStyle={{
              opacity: 0.8,
              backgroundColor: '#343541',
            }}
          >
            {({ open }: { open: boolean }) => (
              <>
                <XStack space='$3' alignItems='center' justifyContent='center'>
                  <AvatarIcon icon={<ShoppingBag color='#ffffff' />} />
                  <YStack>
                    <Text fontWeight='bold' fontSize='$6' color='#ffffff'>
                      {item.description}
                    </Text>
                    <Text color='#D9D9E3' fontSize='$5'>{`R$ ${item.price?.toFixed(2)}`}</Text>
                    {item.countable && (
                      <Text color='#D9D9E3' fontSize='$5'>{`${item.quantity} unidades disponíveis`}</Text>
                    )}
                  </YStack>
                </XStack>
                <Square animation='quick' rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown color='#ffffff' size='$1' />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content bc='#343541'>
            <YStack space marginTop='$3'>
              <XStack justifyContent='space-between' alignItems='center'>
                <Text color='#ffffff' fontSize='$6'>
                  Contabilizar
                </Text>
                <Switch
                  size='$3'
                  bc='#565869'
                  borderColor='#40414F'
                  checked={item.countable}
                  onCheckedChange={() => handleSwitchChange(!item.countable)}
                >
                  <Switch.Thumb bc={item.countable ? '#19C37D' : '#D9D9E3'} animation={'100ms'} />
                </Switch>
              </XStack>
              <XStack space marginTop='$3' justifyContent='space-between'>
                <Button
                  elevationAndroid={5}
                  pressStyle={{
                    opacity: 0.5,
                    borderColor: '#565869',
                    backgroundColor: '#565869',
                  }}
                  bc='#565869'
                  onPress={handleOnPressEdit}
                  flex={1}
                >
                  <Pencil color='#D9D9E3' />
                </Button>
                <Button
                  elevationAndroid={5}
                  pressStyle={{
                    opacity: 0.5,
                    borderColor: '#565869',
                    backgroundColor: '#565869',
                  }}
                  bc='#565869'
                  onPress={handleOnPressDelete}
                  flex={1}
                >
                  <Trash color='#D9D9E3' />
                </Button>
              </XStack>
            </YStack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
