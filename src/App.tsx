import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import VideoPlayer from './components/VideoPlayer';

const addLocation = (...vids: string[]): string[] =>
  vids.map(x => `FrixxerVids/${x}.mp4`);

export default () => {
  const videos = addLocation('TheScramble', 'LyingGame');
  const videos2 = addLocation('LyingGame');
  const videos3 = addLocation('NeedToKnow', 'PintSizeReplays', 'RulesRegs');
  const [currentVids, setCurrentVids] = useState(videos);

  useEffect(
    () => {
      setTimeout(() => setCurrentVids(videos2), 15000);
      setTimeout(() => setCurrentVids(videos3), 1000);
    },
    ['once'],
  );

  return (
    <div className="h-screen w-screen bg-blue-darkest text-white">
      <Counter className="bg-green-darker" />
      <VideoPlayer videos={currentVids} />
    </div>
  );
};
