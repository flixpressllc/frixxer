import React, { useState, SyntheticEvent } from 'react';
import { deepEqual } from 'happy-helpers';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [videoList, setVideoList] = useState(videos);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVid = () => {
    if (currentIndex < videoList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(-1);
    }
  };

  const currentVideo = currentIndex > -1 ? videoList[currentIndex] : undefined;
  const [lastProps, setLastProps] = useState(videos);
  if (!deepEqual(lastProps, videos)) {
    setLastProps(videos);
    if (!currentVideo) {
      setCurrentIndex(videoList.length);
    }
    setVideoList([...videoList, ...videos]);
  }

  const [blocked, setBlocked] = useState(false);
  const play = (ev: SyntheticEvent<HTMLVideoElement>) => {
    ev.currentTarget.play().catch(() => {
      // Autoplay is blocked, likely due to lack of interaction
      setBlocked(true);
    });
  };
  const notBlocked = () => setBlocked(false);

  return (
    <div className="text-white">
      <div className="(dev) hidden">
        <ol>
          {videoList.map((x, i) => (
            <li key={i} className="p-2">
              {x}
            </li>
          ))}
        </ol>
        <div>
          Index: {currentIndex + 1} - {currentVideo}
        </div>
      </div>
      <video
        className="max-w-full"
        src={currentVideo}
        onEnded={nextVid}
        controls={blocked}
        onCanPlayThrough={play}
        onPlay={notBlocked}
      />
    </div>
  );
};
