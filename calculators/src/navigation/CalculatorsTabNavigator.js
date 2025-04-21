// src/navigation/CalculatorsTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
  const { allCalculators } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'General': iconName = 'body'; break;
            case 'Gastroenterology': iconName = 'nutrition'; break;
            case 'ICU': iconName = 'medkit'; break;
            case 'Nephrology': iconName = 'water'; break;
            case 'Neurology': iconName = 'brain'; break;
            case 'Obstetrics': iconName = 'woman'; break;
            case 'Pulmonary': iconName = 'lungs'; break;
            case 'Orthopedics': iconName = 'fitness'; break;
            case 'Cardiovascular': iconName = 'heart'; break;
            default: iconName = 'help';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarScrollEnabled: true,
      })}
    >
      <Tab.Screen
        name="General"
        component={GeneralCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'General' }}
      />
      <Tab.Screen
        name="Gastroenterology"
        component={GastroenterologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Gastroenterology' }}
      />
      <Tab.Screen
        name="ICU"
        component={ICUCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'ICU' }}
      />
      <Tab.Screen
        name="Nephrology"
        component={NephrologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Nephrology' }}
      />
      <Tab.Screen
        name="Neurology"
        component={NeurologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Neurology' }}
      />
      <Tab.Screen
        name="Obstetrics"
        component={ObstetricsCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Obstetrics' }}
      />
      <Tab.Screen
        name="Pulmonary"
        component={PulmonaryCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Pulmonary' }}
      />
      <Tab.Screen
        name="Orthopedics"
        component={OrthopedicsCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Orthopedics' }}
      />
      <Tab.Screen
        name="Cardiovascular"
        component={CardiovascularCalculators}
        initialParams={{ allCalculators }}
        options={{ title: 'Cardiovascular' }}
      />
    </Tab.Navigator>
  );
}