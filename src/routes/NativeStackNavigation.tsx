import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useDataControlContext } from '../contexts';
import { useAxios } from '../hooks';
import { iCard, iProduct } from '../interfaces';
import { CardScreen, CartScreen, LoginScreen } from '../pages';
import { axiosCardService, axiosProductService } from '../services';
import BottomTabNavigation from './BottomTabNavigation';
import { userId } from '../../userId';

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigation() {
  const { setProducts, refreshProducts, setCards, refreshCards } = useDataControlContext();
  const { data: productData, fetchData: fetchProductData } = useAxios<iProduct[], iProduct[]>();
  const { data: cardsData, fetchData: fetchCardData } = useAxios<iCard[], iCard[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductData({
        axiosInstance: axiosProductService,
        method: 'get',
        url: `/${userId}`,
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
        url: `user/${userId}`,
      });
    };

    fetchData();
  }, [refreshCards]);

  useEffect(() => {
    cardsData && setCards(cardsData);
  }, [cardsData]);

  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen options={{headerShown: false}} name='login' component={LoginScreen}/>
      <NativeStack.Screen name='menu' component={BottomTabNavigation} />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#343541' },
          headerTintColor: '#ffffff',
          title: 'Carrinho',
        }}
        name='cart'
        component={CartScreen}
      />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#343541' },
          headerTintColor: '#ffffff',
          title: 'Resumo',
        }}
        name='historyCart'
        component={CardScreen}
      />
    </NativeStack.Navigator>
  );
}
