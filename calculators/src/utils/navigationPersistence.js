// src/utils/navigationPersistence.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistNavigationState = async (state) => {
  try {
    await AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state));
  } catch (e) {
    console.error('Error persisting navigation state:', e);
  }
};

export const loadNavigationState = async () => {
  try {
    const state = await AsyncStorage.getItem('NAVIGATION_STATE');
    return state ? JSON.parse(state) : undefined;
  } catch (e) {
    console.error('Error loading navigation state:', e);
    return undefined;
  }
};