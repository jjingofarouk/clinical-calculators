import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

// Import Clinical Calculators Component
import ClinicalCalculators from './src/ClinicalCalculators';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#004C54" />
          <ClinicalCalculators />
        </SafeAreaView>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004C54',
  },
});