import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Clipboard, History, List, Plus, ShoppingCart } from "@tamagui/lucide-icons";
import React from "react";
import { ButtonHeaderRight } from "../components";
import { HistoryScreen, OrderScreen, ProductsScreen } from "../pages";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const handleOrderButton = () => {
    console.log(1);
  };

  const handleProductsButton = () => {
    console.log(1);
  };

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <Clipboard />,
          headerTitle: "Pedido",
          headerRight: () => (
            <ButtonHeaderRight
              icon={<ShoppingCart size="$2" />}
              handleFunction={handleOrderButton}
            />
          ),
        }}
        name="order"
        component={OrderScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <List />,
          headerTitle: "Produtos",
          headerRight: () => (
            <ButtonHeaderRight
              icon={<Plus size="$2" />}
              handleFunction={handleProductsButton}
            />
          ),
        }}
        name="products"
        component={ProductsScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: () => <History />,
          headerTitle: "Histórico",
        }}
        name="history"
        component={HistoryScreen}
      />
    </BottomTab.Navigator>
  );
}
