import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen, LoginScreen } from "../pages";
import BottomTabNavigation from "./BottomTabNavigation";

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigation() {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <NativeStack.Screen options={{headerShown: false}} name='login' component={LoginScreen}/> */}
      <NativeStack.Screen name="menu" component={BottomTabNavigation} />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#202123" },
          headerTintColor: "#ffffff",
          title: "Carrinho",
        }}
        name="cart"
        component={CartScreen}
      />
    </NativeStack.Navigator>
  );
}
