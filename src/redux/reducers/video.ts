import { createReducer } from 'redux-starter-kit';
import { advanceQueue, replaceVideos } from '../actions/video';

export interface VideoState {
  queue: Array<{ id: number; url: string; label: string }>;
}

const initialVideoState: VideoState = { queue: [] };

const videoReducer = createReducer(initialVideoState, {
  [advanceQueue]: state => {
    // use of immer in redux-starter-kit allows mutation
    state.queue.shift();
  },
  [replaceVideos]: (state, action) => {
    state.queue = action.payload;
  },
});

export default videoReducer;
