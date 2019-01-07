import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import DefaultLayout from './components/DefaultLayout';
import { store } from './redux/store';
import { initializeApp } from './redux/actions/initialize';

export default function App() {
  useEffect(() => {
    store.dispatch(initializeApp());
  }, []);

  return (
    <Provider store={store}>
      <DefaultLayout />
    </Provider>
  );
}
