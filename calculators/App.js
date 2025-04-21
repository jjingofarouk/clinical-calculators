// src/App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { persistNavigationState, loadNavigationState } from './src/utils/navigationPersistence';

export default function App() {
  return (
    <AppNavigator
      persistNavigationState={persistNavigationState}
      loadNavigationState={loadNavigationState}
    />
  );
}