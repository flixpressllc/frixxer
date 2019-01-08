import { configureStore } from 'redux-starter-kit';
import { Store } from 'redux';
import videoReducer, { VideoState } from './reducers/video';
import tickersReducer, { TickersState } from './reducers/tickers';
import middlewares from './middlewares';
import adsReducer from './reducers/ads';

export const store: Store<{
  video: VideoState;
  tickers: TickersState;
}> = configureStore({
  reducer: {
    video: videoReducer,
    tickers: tickersReducer,
    ads: adsReducer,
  },
  middleware: [...middlewares],
});

export type StoreData = ReturnType<typeof store['getState']>;
