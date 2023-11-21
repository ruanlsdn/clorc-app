import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { ApplicationControlProvider } from "./src/contexts/ApplicationControlContext";
import NativeStackNavigation from "./src/routes/NativeStackNavigation";
import tamaguiConfig from "./tamagui.config";
import { DataControlProvider } from "./src/contexts/DataControlContext";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationControlProvider>
      <DataControlProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="light" />
              <NativeStackNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </TamaguiProvider>
      </DataControlProvider>
    </ApplicationControlProvider>
  );
}
