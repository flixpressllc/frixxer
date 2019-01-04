import { createAction } from 'redux-starter-kit';
import { Store, AnyAction } from 'redux';
import { fetchVideoData } from '../../utils/dev-utils';

export const advanceQueue = createAction<never>('ADVANCE_VIDEO_QUEUE');

export const replaceVideos = createAction('REPLACE_VIDEOS');

export const loadVideos = () =>
  (((dispatch: Store['dispatch']) => {
    fetchVideoData().then(data => dispatch(replaceVideos(data)));
  }) as any) as AnyAction;
