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
}
