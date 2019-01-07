import React from 'react';
import { Provider } from 'react-redux';
import DefaultLayout from './components/DefaultLayout';
import { store } from './redux/store';
import { replaceVideos } from './redux/actions/video';
import { loadTickers } from './redux/actions/tickers';
import { loadData } from './api';

export default function App() {
  if (process.env.NODE_ENV === 'development') {
    loadData().then(data => {
      store.dispatch(replaceVideos(data.videos));
      store.dispatch(loadTickers(data.tickers));
    });
  }
  return (
    <Provider store={store}>
      <DefaultLayout />
    </Provider>
  );
}
