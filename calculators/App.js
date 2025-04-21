// src/App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { persistNavigationState, loadNavigationState } from './utils/navigationPersistence';

export default function App() {
  return (
    <AppNavigator
      persistNavigationState={persistNavigationState}
      loadNavigationState={loadNavigationState}
    />
  );
}