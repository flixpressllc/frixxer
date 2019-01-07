import { getVideoData, delay } from './utils/dev-utils';
import _ from 'lodash';
const lipsum = _.chunk(
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  ),
  4,
).map(s => s.join(' '));

export function loadData() {
  return delay({
    videos: getVideoData(),
    tickers: {
      1: ['Global Headlines:', ...lipsum],
      2: ['Entertainment Headlines', ...lipsum],
      3: ['Sports Headlines', ...lipsum],
    },
  });
}
