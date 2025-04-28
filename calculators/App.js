// App.js
import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import ClinicalCalculators from './src/components/calculators/ClinicalCalculators';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#004C54" />
      <ClinicalCalculators />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#004C54',
  },
});