import chunk from 'lodash/chunk';

const lipsum = chunk(
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  ),
  4,
).map(s => s.join(' '));

function getTickerText(title?: string): string[] {
  return title ? [title, ...lipsum] : lipsum;
}

export function getTickerData() {
  return {
    1: getTickerText('Global Headlines:'),
    2: getTickerText('Entertainment Headlines'),
    3: getTickerText('Sports Headlines'),
  };
}
