import React, { useState } from 'react';
import Counter from './components/Counter';
import VideoPlayer from './components/VideoPlayer';

const addLocation = (...vids: string[]): string[] =>
  vids.map(x => `FrixxerVids/${x}.mp4`);

export default () => {
  const videos = addLocation('BrainBlitz', 'LyingGame', 'NeedToKnow');
  const videos2 = addLocation('PintSizeReplays', 'RulesRegs');
  const [currentVids, setCurrentVids] = useState(videos);

  setTimeout(() => setCurrentVids(videos2), 3000);

  return (
    <div className="h-screen w-screen bg-blue-darkest">
      <Counter className="bg-green-darker" />
      <VideoPlayer videos={currentVids} />
    </div>
  );
};
