import React from 'react';
import ReactDOM from 'react-dom';
import './tmp/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { replaceVideos } from './redux/actions/video';
import { loadTickers } from './redux/actions/tickers';
import { loadData } from './api';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === 'development') {
  loadData().then(data => {
    store.dispatch(replaceVideos(data.videos));
    store.dispatch(loadTickers(data.tickers));
  });
}
