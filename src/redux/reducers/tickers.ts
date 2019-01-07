import { createReducer } from 'redux-starter-kit';
import { loadTickers } from '../actions/tickers';

export interface TickersState {
  [n: number]: string[];
}

const initialTickersState: TickersState = { 1: [], 2: [], 3: [] };

const tickersReducer = createReducer(initialTickersState, {
  [loadTickers]: (_state, action) => action.payload,
});

export default tickersReducer;
