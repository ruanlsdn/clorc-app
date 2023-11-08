import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../pages';
import BottomTabNavigation from './BottomTabNavigation';

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigation() {
  return (
    <NativeStack.Navigator>
        {/* <NativeStack.Screen options={{headerShown: false}} name='login' component={LoginScreen}/> */}
        <NativeStack.Screen options={{headerShown: false}} name='menu' component={BottomTabNavigation}/>
    </NativeStack.Navigator>
  )
}