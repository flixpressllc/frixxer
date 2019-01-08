import { createReducer } from 'redux-starter-kit';
import { setAds } from '../actions/ads';

export interface AdsState {
  main: string[];
  banner: string[];
  core1: string[];
  core2: string[];
}

const initialAdsState: AdsState = {
  main: [],
  banner: [],
  core1: [],
  core2: [],
};

const adsReducer = createReducer(initialAdsState, {
  [setAds]: (_state, action) => action.payload,
});

export default adsReducer;
