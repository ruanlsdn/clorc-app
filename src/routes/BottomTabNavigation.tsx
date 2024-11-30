import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Clipboard, History, List, Newspaper, Plus, ShoppingCart } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { AdaptedDialog, Alert, ButtonHeaderRight, IncreaseAmount } from '../components';
import { useApplicationControlContext, useAuthControlContext, useDataControlContext } from '../contexts';
import { HistoryScreen, OrderScreen, ProductsScreen, ReportsScreen } from '../pages';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import { XStack, AlertDialog, Button } from 'tamagui';
import { useAxios } from '../hooks';
import { iProduct, iCard } from '../interfaces';
import { axiosProductService, axiosCardService } from '../services';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { user, logout } = useAuthControlContext();
  const { setProducts, refreshProducts, setCards, refreshCards } = useDataControlContext();
  const { setIsCreateProductDialogOpen } = useApplicationControlContext();
  const { data: productData, fetchData: fetchProductData } = useAxios<iProduct[], iProduct[]>();
  const { data: cardsData, fetchData: fetchCardData } = useAxios<iCard[], iCard[]>();
  const navigation = useNavigation();

  const [action, setAction] = useState<NavigationAction>();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const handleOrderButton = () => {
    navigation.navigate('cart' as never);
  };

  const handleProductsButton = () => {
    setIsCreateProductDialogOpen(true);
  };

  const ButtonConfirmation = () => {
    const handleCancelButton = () => {
      setIsLogoutAlertOpen((prev) => !prev);
    };

    const handleConfirmButton = () => {
      navigation.dispatch(action!);
      logout();
    };

    return (
      <XStack space='$3' justifyContent='center'>
        <AlertDialog.Action bc='#565869' asChild>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            color='$red10Dark'
            onPress={handleCancelButton}
          >
            Cancelar
          </Button>
        </AlertDialog.Action>
        <AlertDialog.Action bc='#565869' asChild>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            color='#19C37D'
            onPress={handleConfirmButton}
          >
            Confirmar
          </Button>
        </AlertDialog.Action>
      </XStack>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setAction(e.data.action);
      setIsLogoutAlertOpen((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductData({
        axiosInstance: axiosProductService,
        method: 'get',
        url: `/${user.id}`,
      });
    };

    fetchData();
  }, [refreshProducts]);

  useEffect(() => {
    productData && setProducts(productData);
  }, [productData]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCardData({
        axiosInstance: axiosCardService,
        method: 'get',
        url: `user/${user.id}`,
      });
    };

    fetchData();
  }, [refreshCards]);

  useEffect(() => {
    cardsData && setCards(cardsData);
  }, [cardsData]);

  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#343541' },
          headerTitleStyle: { color: '#ffffff' },
          tabBarStyle: { backgroundColor: '#343541', borderColor: '#343541' },
          tabBarActiveTintColor: '#19C37D',
          tabBarInactiveTintColor: '#ffffff',
        }}
      >
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ focused }) => <Clipboard color={focused ? '#19C37D' : '#ffffff'} />,
            headerTitle: 'Pedido',
            headerRight: () => (
              <ButtonHeaderRight icon={<ShoppingCart size='$2' color='#ffffff' />} handleFunction={handleOrderButton} />
            ),
          }}
          name='Pedido'
          component={OrderScreen}
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ focused }) => <List color={focused ? '#19C37D' : '#ffffff'} />,
            headerTitle: 'Produtos',
            headerRight: () => (
              <ButtonHeaderRight icon={<Plus size='$2' color='#ffffff' />} handleFunction={handleProductsButton} />
            ),
          }}
          name='Produtos'
          component={ProductsScreen}
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ focused }) => <History color={focused ? '#19C37D' : '#ffffff'} />,
            headerTitle: 'Histórico',
          }}
          name='Histórico'
          component={HistoryScreen}
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ focused }) => <Newspaper color={focused ? '#19C37D' : '#ffffff'} />,
            headerTitle: 'Relatórios',
          }}
          name='Relatórios'
          component={ReportsScreen}
        />
      </BottomTab.Navigator>
      <Alert
        isOpen={isLogoutAlertOpen}
        setIsOpen={setIsLogoutAlertOpen}
        title='Deseja sair de sua conta?'
        description='Toque em algum dos botões abaixo para prosseguir: '
        children={<ButtonConfirmation />}
      />
    </>
  );
}
