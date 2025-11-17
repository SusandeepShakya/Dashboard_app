import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import filterReducer from './slices/filterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    api: apiReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

