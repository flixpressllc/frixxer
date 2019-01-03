import { configureStore, createReducer } from 'redux-starter-kit';
import { labeledDevVideos } from '../utils/dev-utils';

const video = createReducer(
  { queue: labeledDevVideos },
  {
    ADVANCE_VIDEO_QUEUE: state => {
      // use of immer in redux-starter-kit allows mutation
      state.queue.shift();
    },
  },
);

export const store = configureStore({
  reducer: {
    video,
  },
});
