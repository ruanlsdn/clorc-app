import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Plus } from "@tamagui/lucide-icons";
import React from "react";
import { ButtonHeaderRight } from "../components";
import { HistoryScreen, OrderScreen, ProductsScreen } from "../pages";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const handleProductsButton = () => {
    console.log(1);
  };

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="order" component={OrderScreen} />
      <BottomTab.Screen
        options={{
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
          headerTitle: "Histórico",
        }}
        name="history"
        component={HistoryScreen}
      />
    </BottomTab.Navigator>
  );
}
