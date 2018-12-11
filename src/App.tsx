import React from 'react';
import Counter from './components/Counter';
import VideoPlayer from './components/VideoPlayer';

export default () => {
  const videos = ['BrainBlitz', 'LyingGame', 'NeedToKnow'].map(
    x => `FrixxerVids/${x}.mp4`,
  );
  return (
    <div className="h-screen w-screen bg-blue-darkest">
      <Counter className="bg-green-darker" />
      <VideoPlayer videos={videos} />
    </div>
  );
};
