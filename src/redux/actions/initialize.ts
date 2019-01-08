import { createAction } from 'redux-starter-kit';
import { loadData } from '../../api';

type PromiseData<P> = P extends Promise<infer U> ? U : never;

type LoadPromise = ReturnType<typeof loadData>;
export type InitialDataType = PromiseData<LoadPromise>;

export const initializeApp = createAction('INITIALIZE_APP');
export const fetchInitialDataMiddlewareOnly = createAction(
  'FETCH_INITIAL_DATA',
);
export const recieveInitialDataMiddlewareOnly = createAction<InitialDataType>(
  'RECEIVE_INITIAL_DATA',
);
