import { Middleware, AnyAction } from 'redux';
import {
  initializeApp,
  loadInitialDataMiddlewareOnly,
} from '../actions/initialize';
import { replaceVideos } from '../actions/video';
import { loadTickers } from '../actions/tickers';
import { loadData } from '../../api';

const initializeMiddleware: Middleware = store => next => (
  action: AnyAction,
) => {
  next(action);

  if (action.type === initializeApp.toString()) {
    store.dispatch(loadInitialDataMiddlewareOnly());
  }
};

const loadInitialData: Middleware = store => next => (action: AnyAction) => {
  next(action);

  if (action.type === loadInitialDataMiddlewareOnly.toString()) {
    loadData().then(data => {
      store.dispatch(replaceVideos(data.videos));
      store.dispatch(loadTickers(data.tickers));
    });
  }
};

export default [initializeMiddleware, loadInitialData];
