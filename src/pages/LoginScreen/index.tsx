import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Label, YStack, Text } from 'tamagui';
import { useAuthControlContext } from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { AdaptedToast } from '../../components';

export default function LoginScreen() {
  const { login } = useAuthControlContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (username !== '' && password !== '') {
      login(username, password);
    }
  };

  useEffect(() => {
    const promise = async () => {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      const isLoggedIn = JSON.parse(String(await AsyncStorage.getItem('@isLoggedIn')));

      if (isLoggedIn) {
        if (isCompatible) {
          const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique-se para continuar',
            fallbackLabel: 'Use senha',
            disableDeviceFallback: false,
          });

          auth.success &&
            login(String(await AsyncStorage.getItem('@username')), String(await AsyncStorage.getItem('@password')));
        } else {
          setUsername(String(await AsyncStorage.getItem('@username')));
          setPassword(String(await AsyncStorage.getItem('@password')));
        }
      }
    };

    promise();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <YStack
          space
          bc={'#343541'}
          w={375}
          h={500}
          alignItems='center'
          justifyContent='center'
          borderRadius={15}
          elevation={5}
        >
          <YStack ai={'center'} jc={'center'}>
            <Text color={'#ffffff'} fontWeight={'$10'} fontSize={35}>
              Login
            </Text>
            <Text fontSize='$4' color='#D9D9E3' textAlign='center' padding={25}>
              Preencha os dados abaixo e confirme para realizar o login:
            </Text>
          </YStack>
          <YStack>
            <Label disabled color='#D9D9E3'>
              Usuário:
            </Label>
            <Input onChangeText={(text) => setUsername(text)} bc='#D9D9E3' value={username} w={325} />
          </YStack>
          <YStack>
            <Label disabled color='#D9D9E3'>
              Senha:
            </Label>
            <Input secureTextEntry onChangeText={(text) => setPassword(text)} bc='#D9D9E3' value={password} w={325} />
          </YStack>
          <Button
            bc='#19C37D'
            w={325}
            marginTop='$8'
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: '#19C37D',
              backgroundColor: '#19C37D',
            }}
            onPress={handleSubmit}
          >
            Confirmar
          </Button>
        </YStack>
      </View>
      <AdaptedToast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202123',
  },
});
