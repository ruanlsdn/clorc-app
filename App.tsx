import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NativeStackNavigation from "./src/routes/NativeStackNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
