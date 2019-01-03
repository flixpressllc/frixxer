import { configureStore, createReducer } from 'redux-starter-kit';
import { labeledDevVideos } from '../utils/dev-utils';
import { Store } from 'redux';

const initialVideoState = { queue: labeledDevVideos };

const video = createReducer(initialVideoState, {
  ADVANCE_VIDEO_QUEUE: state => {
    // use of immer in redux-starter-kit allows mutation
    state.queue.shift();
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
