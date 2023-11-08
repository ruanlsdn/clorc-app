import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HistoryScreen, OrderScreen, ProductsScreen } from '../pages';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
        <BottomTab.Navigator>
            <BottomTab.Screen name='order' component={OrderScreen}/>
            <BottomTab.Screen name='products' component={ProductsScreen}/>
            <BottomTab.Screen name='history' component={HistoryScreen}/>
        </BottomTab.Navigator>
    )
}