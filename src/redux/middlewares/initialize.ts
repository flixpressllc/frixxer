import { Middleware, AnyAction } from 'redux';
import {
  initializeApp,
  fetchInitialDataMiddlewareOnly,
  recieveInitialDataMiddlewareOnly,
  InitialDataType,
} from '../actions/initialize';
import { replaceVideos } from '../actions/video';
import { loadTickers } from '../actions/tickers';
import { loadData } from '../../api';

const initializeMiddleware: Middleware = store => next => (
  action: AnyAction,
) => {
  next(action);

  if (action.type === initializeApp.toString()) {
    store.dispatch(fetchInitialDataMiddlewareOnly());
  }
};

const loadInitialData: Middleware = store => next => (action: AnyAction) => {
  next(action);

  if (action.type === fetchInitialDataMiddlewareOnly.toString()) {
    loadData().then(data =>
      store.dispatch(recieveInitialDataMiddlewareOnly(data)),
    );
  }
};

const receiveInitialData: Middleware = store => next => (action: AnyAction) => {
  next(action);

  if (actionIsReceiveData(action)) {
    store.dispatch(replaceVideos(action.payload.videos));
    store.dispatch(loadTickers(action.payload.tickers));
  }
};

function actionIsReceiveData(
  action: AnyAction,
): action is { type: string; payload: InitialDataType } {
  return action.type === recieveInitialDataMiddlewareOnly.toString();
}

export default [initializeMiddleware, loadInitialData, receiveInitialData];
