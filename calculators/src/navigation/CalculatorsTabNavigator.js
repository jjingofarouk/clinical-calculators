// src/navigation/CalculatorsTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Calculator category screens
import GeneralCalculators from '../components/calculators/general/GeneralCalculators';
import GastroenterologyCalculators from '../components/calculators/git/GastroenterologyCalculators';
import ICUCalculators from '../components/calculators/icu/ICUCalculators';
import NephrologyCalculators from '../components/calculators/nephrology/NephrologyCalculators';
import NeurologyCalculators from '../components/calculators/neurology/NeurologyCalculators';
import ObstetricsCalculators from '../components/calculators/obstetrics/ObstetricsCalculators';
import PulmonaryCalculators from '../components/calculators/pulmonary/PulmonaryCalculators';
import OrthopedicsCalculators from '../components/calculators/ortho/OrthopedicsCalculators';
import CardiovascularCalculators from '../components/calculators/cardiovascular/CardiovascularCalculators';

const Tab = createBottomTabNavigator();

export default function CalculatorsTabNavigator({ route }) {
  const allCalculators = route?.params?.allCalculators ?? [];

  const getTabIcon = (routeName) => {
    switch (routeName) {
      case 'General': return 'body';
      case 'Gastroenterology': return 'nutrition';
      case 'ICU': return 'medkit';
      case 'Nephrology': return 'water';
      case 'Neurology': return 'pulse'; // using valid Ionicons fallback
      case 'Obstetrics': return 'female';
      case 'Pulmonary': return 'cloud'; // fallback for lungs
      case 'Orthopedics': return 'walk'; // fallback for bone/ortho
      case 'Cardiovascular': return 'heart';
      default: return 'help-circle';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={getTabIcon(route.name)} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="General" component={GeneralCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Gastroenterology" component={GastroenterologyCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="ICU" component={ICUCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Nephrology" component={NephrologyCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Neurology" component={NeurologyCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Obstetrics" component={ObstetricsCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Pulmonary" component={PulmonaryCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Orthopedics" component={OrthopedicsCalculators} initialParams={{ allCalculators }} />
      <Tab.Screen name="Cardiovascular" component={CardiovascularCalculators} initialParams={{ allCalculators }} />
    </Tab.Navigator>
  );
}
