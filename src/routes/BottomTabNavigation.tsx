import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen, OrderScreen, ProductsScreen } from "../pages";
import { ButtonHeaderRight } from "../components";
import { Plus } from "@tamagui/lucide-icons";

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
              icon={<Plus size="$2"/>}
              handleFunction={handleProductsButton}
            />
          ),
        }}
        name="products"
        component={ProductsScreen}
      />
      <BottomTab.Screen name="history" component={HistoryScreen} />
    </BottomTab.Navigator>
  );
}
