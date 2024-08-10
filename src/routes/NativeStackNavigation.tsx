import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDataControlContext } from "../contexts";
import { useAxios } from "../hooks";
import { iProduct } from "../interfaces";
import { CartScreen, HistoryCartScreen } from "../pages";
import { axiosProductService } from "../services";
import BottomTabNavigation from "./BottomTabNavigation";

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigation() {
  const { setProducts, refreshProducts } = useDataControlContext();
  const {
    data: productData,
    status: productStatus,
    error: productError,
    loading: productLoading,
    fetchData: fetchProductData,
  } = useAxios<iProduct[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductData({
      axiosInstance: axiosProductService,
        method: "get",
        url: `/a892f1d0-2b2a-49a7-a05b-02bd09aa8704`,
      });
    };

    fetchData();
  }, [refreshProducts]);

  useEffect(() => {
    productData && setProducts(productData);
  }, [productData]);

  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <NativeStack.Screen options={{headerShown: false}} name='login' component={LoginScreen}/> */}
      <NativeStack.Screen name="menu" component={BottomTabNavigation} />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#343541" },
          headerTintColor: "#ffffff",
          title: "Carrinho",
        }}
        name="cart"
        component={CartScreen}
      />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#343541" },
          headerTintColor: "#ffffff",
          title: "Resumo",
        }}
        name="historyCart"
        component={HistoryCartScreen}
      />
    </NativeStack.Navigator>
  );
}
