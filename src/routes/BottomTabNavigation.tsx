import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Clipboard,
  History,
  List,
  Plus,
  ShoppingCart,
} from "@tamagui/lucide-icons";
import React from "react";
import { ButtonHeaderRight } from "../components";
import { HistoryScreen, OrderScreen, ProductsScreen } from "../pages";
import { useApplicationControlContext } from "../contexts";
import { ActionEnum } from "../enums/ActionEnum";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { setAction, setIsAdaptedDialogOpen } = useApplicationControlContext();
  const handleOrderButton = () => {
    console.log(1);
  };

  const handleProductsButton = () => {
    setAction(ActionEnum.CREATE);
    setIsAdaptedDialogOpen(true);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#202123" },
        headerTitleStyle: { color: "#ffffff" },
        tabBarStyle: { backgroundColor: "#202123", borderColor: "#202123"},
        tabBarActiveTintColor: "#19C37D",
        tabBarInactiveTintColor: "#ffffff"
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <Clipboard color="#ffffff" />,
          headerTitle: "Pedido",
          headerRight: () => (
            <ButtonHeaderRight
              icon={<ShoppingCart size="$2" color="#ffffff" />}
              handleFunction={handleOrderButton}
            />
          ),
        }}
        name="Pedido"
        component={OrderScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <List color="#ffffff" />,
          headerTitle: "Produtos",
          headerRight: () => (
            <ButtonHeaderRight
              icon={<Plus size="$2" color="#ffffff"/>}
              handleFunction={handleProductsButton}
            />
          ),
        }}
        name="Produtos"
        component={ProductsScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <History color="#ffffff" />,
          headerTitle: "Histórico",
        }}
        name="Histórico"
        component={HistoryScreen}
      />
    </BottomTab.Navigator>
  );
}
