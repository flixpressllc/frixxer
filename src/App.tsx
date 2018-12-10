import React from 'react';
import Counter from './components/Counter';
import VideoPlayer from './components/VideoPlayer';

export default () => (
  <div className="h-screen w-screen bg-blue-darkest">
    <Counter className="bg-green-darker" />
    <VideoPlayer videos={['FrixxerVids/BrainBlitz.mp4']} />
  </div>
);
