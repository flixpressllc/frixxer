import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import { useVideoFeed } from './utils/dev-utils';
import Ticker from './components/Ticker';

export default () => {
  const [videos] = useVideoFeed();

  return (
    <div className="h-screen w-screen bg-blue-darkest">
      <VideoPlayer videos={videos} className="m-auto w-1/2" />
      <Ticker
        items={['Test One', 'Test Two']}
        className="bg-shade text-yellow text-5xl"
      />
    </div>
  );
};
