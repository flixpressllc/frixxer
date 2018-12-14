import { useEffect, useState } from 'react';
import { shuffleClone } from 'happy-helpers';

function addLocation(...vids: string[]): string[] {
  return vids.map(x => `FrixxerVids/${x}.mp4`);
}

const devVideos = [
  'BrainBlitz',
  'LyingGame',
  'NeedtoKnow',
  'PintSizeReplays',
  'RulesRegs',
  'SumCity',
  'SundayShocker',
  'TheFeed',
  'TheScramble',
  'ThrillsSpills',
  'TrickMyTailgate',
  'WhoSaidIt',
  'XsOs',
];

export function useVideoFeed() {
  const allVideos = addLocation(...shuffleClone(devVideos));
  const [currentVids, setCurrentVids] = useState([] as string[]);

  useEffect(
    () => {
      const [vid1, ...remaining] = allVideos;
      setTimeout(() => setCurrentVids([vid1]), 500);
      setTimeout(() => setCurrentVids(remaining), 3500);
    },
    ['once'],
  );

  return [currentVids, setCurrentVids] as [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ];
}
