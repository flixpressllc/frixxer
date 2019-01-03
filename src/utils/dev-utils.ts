import { useEffect, useState } from 'react';
import { shuffleClone, clone } from 'happy-helpers';

function addLocation(...vids: string[]): string[] {
  return vids.map(x => `FrixxerVids/${x}.mp4`);
}

export const devVideos = [
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

export const labeledDevVideos = devVideos.map((name, i) => ({
  label: name,
  url: addLocation(name),
  id: i,
}));

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

export function useTimedList(
  intervalTime: number = 1000,
  list: string[] = devVideos,
) {
  const [currentList, setCurrentList] = useState(labeledDevVideos);

  useEffect(
    () => {
      const id = setTimeout(() => {
        const newItem = clone(currentList[0]);
        newItem.id = currentList[currentList.length - 1].id + 1;
        setCurrentList(currentList.concat(newItem).splice(1));
      }, intervalTime);
      return () => {
        clearTimeout(id);
      };
    },
    [intervalTime, currentList],
  );

  return currentList;
}
