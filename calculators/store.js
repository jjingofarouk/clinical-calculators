// store.js
import { configureStore } from '@reduxjs/toolkit';

// Define a root reducer (you can add specific reducers for your app)
const rootReducer = (state = {}, action) => {
  return state; // Placeholder; replace with actual reducers
};

export default configureStore({
  reducer: rootReducer,
});