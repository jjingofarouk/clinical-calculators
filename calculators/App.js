// src/App.js
import 'react-native-gesture-handler'; // must be at the top
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { persistNavigationState, loadNavigationState } from './src/utils/navigationPersistence';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator
        persistNavigationState={persistNavigationState}
        loadNavigationState={loadNavigationState}
      />
    </GestureHandlerRootView>
  );
}
