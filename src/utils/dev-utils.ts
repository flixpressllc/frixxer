export * from './dev-utils/get-video-data';
export * from './dev-utils/get-ticker-data';

export function windowWatch(obj: object) {
  const w: any = window;
  if (!w.watch) {
    w.watch = {};
  }
  w.watch = { ...w.watch, ...obj };
}

export function windowCount(name: string) {
  const w: any = window;
  if (!w.count) {
    w.count = {};
  }
  if (!w.count[name]) {
    w.count[name] = 0;
  }
  ++w.count[name];
}

/**
 * Returns a value at a later time, via a promise.
 *
 * @param value any. This is the exact value returned from the promise
 * @param ms milliseconds to stall the promise. defaults to 1000
 */
export function delay<T extends any>(value: T, ms: number = 1000): Promise<T> {
  return new Promise(res => {
    setTimeout(() => res(value), ms);
  });
}
