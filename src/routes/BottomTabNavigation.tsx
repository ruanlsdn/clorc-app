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
import { useApplicationControlContext } from "../contexts";
import { HistoryScreen, OrderScreen, ProductsScreen } from "../pages";
import { useNavigation } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { setIsCreateProductDialogOpen } = useApplicationControlContext();
  const { navigate } = useNavigation();

  const handleOrderButton = () => {
    navigate("cart" as never);
  };

  const handleProductsButton = () => {
    setIsCreateProductDialogOpen(true);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#202123" },
        headerTitleStyle: { color: "#ffffff" },
        tabBarStyle: { backgroundColor: "#202123", borderColor: "#202123" },
        tabBarActiveTintColor: "#19C37D",
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Clipboard color={focused ? "#19C37D" : "#ffffff"} />
          ),
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
          tabBarIcon: ({ focused }) => (
            <List color={focused ? "#19C37D" : "#ffffff"} />
          ),
          headerTitle: "Produtos",
          headerRight: () => (
            <ButtonHeaderRight
              icon={<Plus size="$2" color="#ffffff" />}
              handleFunction={handleProductsButton}
            />
          ),
        }}
        name="Produtos"
        component={ProductsScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <History color={focused ? "#19C37D" : "#ffffff"} />
          ),
          headerTitle: "Histórico",
        }}
        name="Histórico"
        component={HistoryScreen}
      />
    </BottomTab.Navigator>
  );
}
