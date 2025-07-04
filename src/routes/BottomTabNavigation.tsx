import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import { Clipboard, History, List, Newspaper, Plus, ShoppingCart, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, AlertButtons, ButtonHeaderRight } from '../components';
import { useApplicationControlContext, useAuthControlContext, useDataControlContext } from '../contexts';
import { iProduct } from '../interfaces';
import { HistoryScreen, OrderScreen, ProductsScreen, ReportsScreen } from '../pages';
import { axiosProductService } from '../services';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { user, logout } = useAuthControlContext();
  const { setProducts, refreshProducts, setLoadingProducts } = useDataControlContext();
  const { setIsCreateProductDialogOpen } = useApplicationControlContext();
  const navigation = useNavigation();
  const toast = useToastController();

  const [action, setAction] = useState<NavigationAction>();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const handleOrderButton = () => {
    navigation.navigate('cart' as never);
  };

  const handleProductsButton = () => {
    setIsCreateProductDialogOpen(true);
  };

  const handleCancelButton = () => {
    setIsLogoutAlertOpen((prev) => !prev);
  };

  const handleConfirmButton = () => {
    navigation.dispatch(action!);
    logout();
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
    const getProducts = async () => {
      try {
        if (!user) return;
        setLoadingProducts(true);
        const response: AxiosResponse<iProduct[]> = await axiosProductService.get(`/${user.id}`);
        setProducts(response.data);
      } catch (error) {
        const err = error as AxiosError;
        const status = err.response?.status;
        const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
        const message = 'Não foi possível carregar a lista de produtos.';
        toast.show(title, {
          message: message,
          viewportName: 'main',
          customData: { icon: <XCircle size={25} /> },
        });
      } finally {
        setLoadingProducts(false);
      }
    };

    getProducts();
  }, [user, refreshProducts]);

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
        children={<AlertButtons handleCancelButton={handleCancelButton} handleConfirmButton={handleConfirmButton} />}
      />
    </>
  );
}
