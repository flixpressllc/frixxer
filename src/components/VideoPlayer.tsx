import React, { useState, useEffect } from 'react';
import { deepEqual } from 'happy-helpers';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [videoList, setVideoList] = useState(videos);
  const [lastProps, setLastProps] = useState(videos);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVid = () => {
    if (currentIndex < videoList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (deepEqual(lastProps, videos)) {
      return;
    }
    setLastProps(videos);
    setVideoList([...videoList, ...videos]);
  });

  return (
    <div className="text-white flex flex-wrap">
      {videoList.map(x => (
        <span key={x} className="p-2">
          {x}
        </span>
      ))}
      <video
        className="max-w-full"
        src={videoList[currentIndex]}
        autoPlay
        onEnded={nextVid}
      />
    </div>
  );
};
