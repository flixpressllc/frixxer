import { createAction } from 'redux-starter-kit';

export const setAds = createAction<{
  core1: string[];
  core2: string[];
  banner: string[];
  main: string[];
}>('SET_ADS_DATA');
