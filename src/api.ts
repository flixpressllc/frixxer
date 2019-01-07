import { getVideoData, delay, getTickerData } from './utils/dev-utils';

export function loadData() {
  return delay({
    videos: getVideoData(),
    tickers: getTickerData(),
  });
}
