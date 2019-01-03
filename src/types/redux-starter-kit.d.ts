type AnyFn = (...args: any[]) => any;

declare module 'redux-starter-kit' {
  import Redux from 'redux';
  const configureStore: (
    input: {
      reducer: { [s: string]: Redux.Reducer } | Redux.Reducer;
      middleware?: Array<AnyFn>;
      devTools?: boolean;
      preloadedState?: any;
      enhancer?: any;
    },
  ) => Redux.Store;
}
