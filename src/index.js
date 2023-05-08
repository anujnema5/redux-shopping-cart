import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import productReducers, { productsFetch } from './features/productSlice'
import { productsApi } from './features/productsAPI';
import cartReducer, { getTotals } from './features/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducers,
    cart : cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

store.dispatch(getTotals())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
