// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import Sidebar from '../components/Sidebar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="Main"
          component={MainNavigator}
          options={{ title: 'Calculators' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}