// src/navigation/MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClinicalCalculators from '../components/calculators/ClinicalCalculators';
import SearchCalculators from '../components/calculators/SearchCalculators';
import FavoritesCalculators from '../components/calculators/FavoritesCalculators';
import CalculatorsTabNavigator from './CalculatorsTabNavigator';
import { calculatorMetadata } from '../config/calculatorMetadata';
import CalculatorScreens from './CalculatorScreens';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ClinicalCalculators"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ClinicalCalculators"
        component={ClinicalCalculators}
        initialParams={{ allCalculators: calculatorMetadata }}
      />
      <Stack.Screen
        name="SearchCalculators"
        component={SearchCalculators}
        initialParams={{ allCalculators: calculatorMetadata }}
      />
      <Stack.Screen
        name="FavoritesCalculators"
        component={FavoritesCalculators}
        initialParams={{ allCalculators: calculatorMetadata }}
      />
      <Stack.Screen
        name="Calculators"
        component={CalculatorsTabNavigator}
        initialParams={{ allCalculators: calculatorMetadata }}
      />
      <CalculatorScreens />
    </Stack.Navigator>
  );
}