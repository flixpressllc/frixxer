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

export const labeledDevVideos = devVideos.map(({ label, url }, i) => ({
  label,
  url: addLocation(url),
  id: i,
}));
