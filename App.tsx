import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { ApplicationControlProvider } from './src/contexts/ApplicationControlContext';
import { CartControlProvider } from './src/contexts/CartControlContext';
import { DataControlProvider } from './src/contexts/DataControlContext';
import NativeStackNavigation from './src/routes/NativeStackNavigation';
import tamaguiConfig from './tamagui.config';
import { AuthControlProvider } from './src/contexts/AuthControlContext';

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthControlProvider>
        <ApplicationControlProvider>
          <DataControlProvider>
            <CartControlProvider>
              <TamaguiProvider config={tamaguiConfig}>
                <SafeAreaProvider>
                  <StatusBar style='light' />
                  <NativeStackNavigation />
                </SafeAreaProvider>
              </TamaguiProvider>
            </CartControlProvider>
          </DataControlProvider>
        </ApplicationControlProvider>
      </AuthControlProvider>
    </NavigationContainer>
  );
}
