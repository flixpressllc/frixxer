import { getVideoData, delay, getTickerData } from './utils/dev-utils';

export function loadData() {
  if (process.env.NODE_ENV !== 'production') {
    return delay({
      videos: getVideoData(),
      tickers: getTickerData(),
    });
  } else {
    throw new Error('I only have data for non-production env for now');
  }
}
