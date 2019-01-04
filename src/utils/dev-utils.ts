function addLocation(vid: string): string {
  return `FrixxerVids/${vid}.mp4`;
}

const devVideos = [
  { label: 'Brain Blitz', url: 'BrainBlitz' },
  { label: 'The Lying Game', url: 'LyingGame' },
  { label: 'Need to Know', url: 'NeedtoKnow' },
  { label: 'Pint Size Replays', url: 'PintSizeReplays' },
  { label: 'Rules & Regs', url: 'RulesRegs' },
  { label: 'Sum City', url: 'SumCity' },
  { label: 'Sunday Shocker', url: 'SundayShocker' },
  { label: 'The Feed', url: 'TheFeed' },
  { label: 'The Scramble', url: 'TheScramble' },
  { label: 'Thrills & Spills', url: 'ThrillsSpills' },
  { label: 'Trick My Tailgate', url: 'TrickMyTailgate' },
  { label: 'Who Said It', url: 'WhoSaidIt' },
  { label: "X's and O's", url: 'XsOs' },
];

const labeledDevVideos = devVideos.map(({ label, url }, i) => ({
  label,
  url: addLocation(url),
  id: i,
}));

function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const invalidIds = [
  15,
  16,
  21,
  22,
  24,
  34,
  46,
  57,
  58,
  72,
  74,
  75,
  80,
  97,
  99,
  100,
  101,
  103,
  104,
  107,
  109,
  110,
  145,
  155,
];

function getRandomIgnoring(min: number, max: number, ignore: number[]) {
  const rand = getRandomArbitrary(min, max);
  if (ignore.indexOf(rand) > -1) {
    // @ts-ignore
    return getRandomIgnoring(...arguments);
  } else {
    return rand;
  }
}

function getRandomVideoId() {
  return getRandomIgnoring(1, 164, invalidIds);
}

function getVideo(): typeof labeledDevVideos[0] {
  const id = getRandomVideoId();
  const padded = id > 9 ? id.toString() : `0${id}`;
  const possibleUrl = `https://mediarobotvideo.s3.amazonaws.com/Template${padded}.mp4`;

  return {
    label: `Template ${id}`,
    id,
    url: possibleUrl,
  };
}

export function fetchVideoData(
  delay: number = 0,
  num: number = 5,
): Promise<typeof labeledDevVideos> {
  // const vids = Array.from(new Array(num)).map(() => getVideo());
  const vids = labeledDevVideos;
  return new Promise(r => {
    setTimeout(() => r(vids), delay);
  });
}

export function windowWatch(obj: object) {
  const w: any = window;
  if (!w.watch) {
    w.watch = {};
  }
  w.watch = { ...w.watch, ...obj };
}
