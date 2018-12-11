import React, { useState } from 'react';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [videoList, setVideoList] = useState(videos);

  const nextVid = () => {
    const [head, ...tail] = videoList;
    setVideoList(tail);
  };

  return (
    <video
      className="max-w-full"
      src={videoList[0]}
      autoPlay
      onEnded={nextVid}
    />
  );
};
