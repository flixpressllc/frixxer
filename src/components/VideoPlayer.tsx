import React, { useState, useEffect } from 'react';
import { deepEqual } from 'happy-helpers';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [videoList, setVideoList] = useState(videos);
  const [lastProps, setLastProps] = useState(videos);

  const nextVid = () => {
    const [_head, ...tail] = videoList;
    setVideoList(tail);
  };

  useEffect(() => {
    if (deepEqual(lastProps, videos)) {
      return;
    }
    setLastProps(videos);
    setVideoList([...videoList, ...videos]);
  });

  return (
    <div className="text-white">
      {videoList.map(x => (
        <span key={x} className="p-2">
          {x}
        </span>
      ))}
      <video
        className="max-w-full"
        src={videoList[0]}
        autoPlay
        onEnded={nextVid}
      />
    </div>
  );
};
