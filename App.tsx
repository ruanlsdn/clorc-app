import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import NativeStackNavigation from "./src/routes/NativeStackNavigation";
import tamaguiConfig from "./tamagui.config";
import { useEffect } from "react";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
