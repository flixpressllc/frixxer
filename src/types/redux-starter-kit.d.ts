type AnyFn = (...args: any[]) => any;

declare module 'redux-starter-kit' {
  import Redux from 'redux';

  function createReducer<T extends any>(
    initialState: T,
    actionsMap: {
      [s: string]: (state: T, action: Redux.AnyAction) => T | void;
    },
  ): Redux.Reducer<T>;

  function configureStore(input: {
    reducer: { [s: string]: Redux.Reducer } | Redux.Reducer;
    middleware?: Array<AnyFn>;
    devTools?: boolean;
    preloadedState?: any;
    enhancer?: any;
  }): Redux.Store;

  function createAction<Payload extends any = undefined, N extends string = N>(
    name: N,
  ): Payload extends (undefined | null)
    ? (() => { type: N }) & string
    : ((payload: Payload) => { type: N; payload: Payload }) & string;
}
