import { createAction } from 'redux-starter-kit';

export const advanceQueue = createAction('ADVANCE_VIDEO_QUEUE');

export const replaceVideos = createAction<
  Array<{ id: number; url: string; label: string }>
>('REPLACE_VIDEOS');
