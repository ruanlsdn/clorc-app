import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserX2, XCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AxiosError, AxiosResponse } from 'axios';
import { createContext, useContext, useState } from 'react';
import { iUser } from '../interfaces';
import { axiosAuthService } from '../services';

type AuthControlContextProps = {
  user: iUser;
  login: (username: string, password: string) => void;
  logout: () => void;
};

type props = {
  children: React.ReactNode;
};

export const AuthControlContext = createContext<AuthControlContextProps>(null!);

export const AuthControlProvider = ({ children }: props) => {
  const toast = useToastController();
  const navigation = useNavigation();

  const [user, setUser] = useState<iUser>(undefined!);

  async function login(username: string, password: string) {
    try {
      const response: AxiosResponse<iUser> = await axiosAuthService.post(
        '/login',
        { login: username, password: password, cidade: true },
        { timeout: 5 * 1000 },
      );
      if (response.data !== undefined && response.data.active) {
        await AsyncStorage.setItem('@isLoggedIn', 'true');
        await AsyncStorage.setItem('@username', username);
        await AsyncStorage.setItem('@password', password);

        setUser(user);
        navigation.navigate('menu' as never);
      } else {
        toast.show('Usuário inativo!', {
          message: 'Contate o Administrador do sistema.',
          viewportName: 'main',
          customData: { icon: <UserX2 size={25} /> },
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const title = status ? `${status} - Ocorreu um erro!` : 'Ocorreu um erro!';
      const message = status && status === 401 ? 'Dados incorretos ou usuário não cadastrado.' : 'Tente novamente em alguns instantes.';
      toast.show(title, {
        message: message,
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    }
  }

  async function logout() {
    await AsyncStorage.setItem('@isLoggedIn', 'false');
    await AsyncStorage.multiRemove(['@username', '@password']);

    setUser(undefined!);
    navigation.navigate('login' as never);
  }

  return (
    <AuthControlContext.Provider
      value={{
        user: user,
        login,
        logout,
      }}
    >
      {children}
    </AuthControlContext.Provider>
  );
};

export default function useAuthControlContext() {
  return useContext(AuthControlContext);
}
