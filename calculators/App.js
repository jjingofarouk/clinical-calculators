// App.js
import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import CardiovascularCalculators from './src/components/calculators/cardiovascular/CardiovascularCalculators';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#004C54" />
      <CardiovascularCalculators />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004C54',
  },
});