import { configureStore } from 'redux-starter-kit';
import { labeledDevVideos } from '../utils/dev-utils';

interface VideoState {
  queue: typeof labeledDevVideos;
}

export const store = configureStore({
  reducer: {
    video: (state: VideoState = { queue: labeledDevVideos }, action) => {
      if (action.type === 'ADVANCE_VIDEO_QUEUE') {
        return state.queue.splice(1);
      }
      return state;
    },
  },
});
