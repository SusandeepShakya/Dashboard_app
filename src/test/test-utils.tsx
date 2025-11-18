import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../store/slices/apiSlice';
import filterReducer from '../store/slices/filterSlice';
import authReducer from '../store/slices/authSlice';

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      api: apiReducer,
      filter: filterReducer,
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

// Custom render function that includes Redux Provider and Router
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: ReturnType<typeof createTestStore>;
  initialEntries?: string[];
}

const AllTheProviders = ({ 
  children, 
  store,
  initialEntries = ['/']
}: { 
  children: React.ReactNode;
  store: ReturnType<typeof createTestStore>;
  initialEntries?: string[];
}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <AllTheProviders store={store} initialEntries={initialEntries}>
        {children}
      </AllTheProviders>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, createTestStore };

