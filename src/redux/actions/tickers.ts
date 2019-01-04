import { createAction } from 'redux-starter-kit';

export const loadTickers = createAction<{ [n: number]: string[] }>(
  'LOAD_TICKERS',
);
