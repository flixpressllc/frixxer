import { configureStore, createReducer } from 'redux-starter-kit';
import { Store } from 'redux';
import { advanceQueue, replaceVideos } from './actions/video';
import { loadTickers } from './actions/tickers';

const initialVideoState: {
  queue: Array<{ id: number; url: string; label: string }>;
} = { queue: [] };

const video = createReducer(initialVideoState, {
  [advanceQueue]: state => {
    // use of immer in redux-starter-kit allows mutation
    state.queue.shift();
  },
  [replaceVideos]: (state, action) => {
    state.queue = action.payload;
  },
});

const initialTickersState: { [n: number]: string[] } = { 1: [], 2: [], 3: [] };
const tickers = createReducer(initialTickersState, {
  [loadTickers]: (_state, action) => action.payload,
});

export const store: Store<{
  video: typeof initialVideoState;
  tickers: typeof initialTickersState;
}> = configureStore({
  reducer: {
    video,
    tickers,
  },
});

export type StoreData = ReturnType<typeof store['getState']>;
