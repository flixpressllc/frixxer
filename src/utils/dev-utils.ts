export * from './dev-utils/fetch-video-data';

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
