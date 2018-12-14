import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import VideoPlayer from './components/VideoPlayer';
import { useVideoFeed } from './utils/dev-utils';

export default () => {
  const [videos] = useVideoFeed();

  return (
    <div className="h-screen w-screen bg-blue-darkest text-white">
      <Counter className="bg-green-darker" />
      <VideoPlayer videos={videos} />
    </div>
  );
};
