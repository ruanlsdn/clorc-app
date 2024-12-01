import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { ApplicationControlProvider } from './src/contexts/ApplicationControlContext';
import { AuthControlProvider } from './src/contexts/AuthControlContext';
import { CartControlProvider } from './src/contexts/CartControlContext';
import { DataControlProvider } from './src/contexts/DataControlContext';
import NativeStackNavigation from './src/routes/NativeStackNavigation';
import tamaguiConfig from './tamagui.config';

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
      <ToastProvider>
        <AuthControlProvider>
          <ApplicationControlProvider>
            <DataControlProvider>
              <CartControlProvider>
                <TamaguiProvider config={tamaguiConfig}>
                  <SafeAreaProvider>
                    <StatusBar style='light' />
                    <ToastViewport name='main' alignSelf='center' marginTop={45} />
                    <NativeStackNavigation />
                  </SafeAreaProvider>
                </TamaguiProvider>
              </CartControlProvider>
            </DataControlProvider>
          </ApplicationControlProvider>
        </AuthControlProvider>
      </ToastProvider>
    </NavigationContainer>
  );
}
