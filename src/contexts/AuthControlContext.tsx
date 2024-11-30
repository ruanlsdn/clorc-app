import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useState } from 'react';
import { useAxios } from '../hooks';
import { axiosAuthService } from '../services';
import { iUser } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { fetchData } = useAxios<iUser, iUser>();
  const navigation = useNavigation();

  const [user, setUser] = useState<iUser>(undefined!);

  function login(username: string, password: string) {
    fetchData(
      {
        axiosInstance: axiosAuthService,
        method: 'post',
        url: '/login',
      },
      { login: username, password: password },
    )
      .then(async (response) => {
        if (response !== undefined) {
          await AsyncStorage.setItem('@isLoggedIn', 'true');
          await AsyncStorage.setItem('@username', username);
          await AsyncStorage.setItem('@password', password);

          setUser(response);
          navigation.navigate('menu' as never);
        }
      })
      .catch((error) => {
        console.log('error ', error);
      });
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