import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

// Import Clinical Calculator Screens
import ClinicalCalculators from './src/components/calculators/ClinicalCalculators';
import CardiovascularCalculators from './src/components/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './src/components/calculators/neurology/NeurologyCalculators';
import OrthopedicsCalculators from './src/components/calculators/ortho/OrthopedicsCalculators';
import ObstetricsCalculators from './src/components/calculators/obstetrics/ObstetricsCalculators';
import GastroenterologyCalculators from './src/components/calculators/git/GastroenterologyCalculators';
import PulmonaryCalculators from './src/components/calculators/pulmonary/PulmonaryCalculators';
import ICUCalculators from './src/components/calculators/icu/ICUCalculators';
import GeneralCalculators from './src/components/calculators/general/GeneralCalculators';
import NephrologyCalculators from './src/components/calculators/nephrology/NephrologyCalculators';

const Stack = createStackNavigator();

// Screen wrapper component
const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#004C54" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

// Higher Order Component to wrap screens with SafeArea
const withSafeArea = (WrappedComponent) => {
  return (props) => (
    <ScreenWrapper>
      <WrappedComponent {...props} />
    </ScreenWrapper>
  );
};

// Screen options for headers
const screenOptions = {
  headerStyle: { backgroundColor: '#004C54' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
  headerBackTitleVisible: false,
};

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            {/* Clinical Calculator Screens */}
            <Stack.Screen
              name="Clinical Calculators"
              component={withSafeArea(ClinicalCalculators)}
              options={{ title: 'Clinical Calculators' }}
            />
            <Stack.Screen
              name="Cardiovascular"
              component={withSafeArea(CardiovascularCalculators)}
              options={{ title: 'Cardiovascular Calculators' }}
            />
            <Stack.Screen
              name="Neurology"
              component={withSafeArea(NeurologyCalculators)}
              options={{ title: 'Neurology Calculators' }}
            />
            <Stack.Screen
              name="Orthopedics"
              component={withSafeArea(OrthopedicsCalculators)}
              options={{ title: 'Orthopedics Calculators' }}
            />
            <Stack.Screen
              name="Obstetrics"
              component={withSafeArea(ObstetricsCalculators)}
              options={{ title: 'Obstetrics Calculators' }}
            />
            <Stack.Screen
              name="Gastroenterology"
              component={withSafeArea(GastroenterologyCalculators)}
              options={{ title: 'Gastroenterology Calculators' }}
            />
            <Stack.Screen
              name="Pulmonary"
              component={withSafeArea(PulmonaryCalculators)}
              options={{ title: 'Pulmonary Calculators' }}
            />
            <Stack.Screen
              name="ICU"
              component={withSafeArea(ICUCalculators)}
              options={{ title: 'ICU Calculators' }}
            />
            <Stack.Screen
              name="General"
              component={withSafeArea(GeneralCalculators)}
              options={{ title: 'General Calculators' }}
            />
            <Stack.Screen
              name="Nephrology"
              component={withSafeArea(NephrologyCalculators)}
              options={{ title: 'Nephrology Calculators' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004C54',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});