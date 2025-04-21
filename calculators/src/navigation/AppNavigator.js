import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Main screens
import ClinicalCalculators from '../components/calculators/ClinicalCalculators';
import SearchCalculators from '../components/calculators/SearchCalculators'; // New search screen
import FavoritesCalculators from '../components/calculators/FavoritesCalculators'; // New favorites screen

// Category screens
import GeneralCalculators from '../components/calculators/general/GeneralCalculators';
import GastroenterologyCalculators from '../components/calculators/git/GastroenterologyCalculators';
import CardiovascularCalculators from '../components/calculators/cardiovascular/CardiovascularCalculators';
import NephrologyCalculators from '../components/calculators/nephrology/NephrologyCalculators';

// General calculators
import BMICalculator from '../components/calculators/general/BMICalculator';
import BMRCalculator from '../components/calculators/general/BMRCalculator';

// Gastroenterology calculators
import AlvaradoScore from '../components/calculators/git/AlvaradoScore';
import ChildPughScore from '../components/calculators/git/ChildPughScore';

// Cardiovascular calculators
import ASCVD from '../components/calculators/cardiovascular/ASCVD';
import CHA2DS2VASc from '../components/calculators/cardiovascular/CHA2DS2VASc';

// Nephrology calculators
import CKDEpiCalculator from '../components/calculators/nephrology/CKDEpiCalculator';
import GFRCalculator from '../components/calculators/nephrology/GFRCalculator';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for Categories
function CalculatorsDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { width: 300 },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ClinicalCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: 'Clinical Calculators',
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          title: 'Search Calculators',
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
          title: 'Favorites',
        }}
      />
      <Drawer.Screen
        name="General"
        component={GeneralCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="body" size={size} color={color} />
          ),
          title: 'General',
        }}
      />
      <Drawer.Screen
        name="Gastroenterology"
        component={GastroenterologyCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="nutrition" size={size} color={color} />
          ),
          title: 'Gastroenterology',
        }}
      />
      <Drawer.Screen
        name="Cardiovascular"
        component={CardiovascularCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          title: 'Cardiovascular',
        }}
      />
      <Drawer.Screen
        name="Nephrology"
        component={NephrologyCalculators}
        options={{
          drawerIcon: ({ color, size }) => (
            < Ionicons name="water" size={size} color={color} />
          ),
          title: 'Nephrology',
        }}
      />
      {/* Add other categories (ICU, Neurology, etc.) similarly */}
    </Drawer.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CalculatorsDrawer">
        <Stack.Screen
          name="CalculatorsDrawer"
          component={CalculatorsDrawerNavigator}
          options={{ headerShown: false }}
        />
        {/* General Calculators */}
        <Stack.Screen name="BMICalculator" component={BMICalculator} options={{ title: 'BMI Calculator' }} />
        <Stack.Screen name="BMRCalculator" component={BMRCalculator} options={{ title: 'BMR Calculator' }} />
        {/* Gastroenterology Calculators */}
        <Stack.Screen name="AlvaradoScore" component={AlvaradoScore} options={{ title: 'Alvarado Score' }} />
        <Stack.Screen name="ChildPughScore" component={ChildPughScore} options={{ title: 'Child-Pugh Score' }} />
        {/* Cardiovascular Calculators */}
        <Stack.Screen name="ASCVD" component={ASCVD} options={{ title: 'ASCVD Risk' }} />
        <Stack.Screen name="CHA2DS2VASc" component={CHA2DS2VASc} options={{ title: 'CHA2DS2-VASc Score' }} />
        {/* Nephrology Calculators */}
        <Stack.Screen name="CKDEpiCalculator" component={CKDEpiCalculator} options={{ title: 'CKD-EPI Calculator' }} />
        <Stack.Screen name="GFRCalculator" component={GFRCalculator} options={{ title: 'GFR Calculator' }} />
        {/* Add other calculators similarly */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}