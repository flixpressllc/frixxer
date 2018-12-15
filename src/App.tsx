import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import { useVideoFeed } from './utils/dev-utils';
import Ticker from './components/Ticker';

export default function App() {
  const [videos] = useVideoFeed();

  return (
    <div className="h-screen w-screen bg-blue-darkest">
      <VideoPlayer videos={videos} className="mx-auto w-4/5" />
      <Ticker
        pxPerSecond={300}
        items={['Test One', 'Test Two']}
        className="bg-shade text-yellow text-5xl font-bold pin-b pin-r w-full fixed"
      />
    </div>
  );
}
