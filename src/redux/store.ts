import { configureStore, createReducer } from 'redux-starter-kit';
import { Store } from 'redux';
import { advanceQueue, replaceVideos } from './actions/video';

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

export const store: Store<{ video: typeof initialVideoState }> = configureStore(
  {
    reducer: {
      video,
    },
  },
);

export type StoreData = ReturnType<typeof store['getState']>;
