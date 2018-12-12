import React, { useState, SyntheticEvent, useRef, useEffect } from 'react';
import { deepEqual } from 'happy-helpers';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [videoList, setVideoList] = useState(videos);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnded = () => {
    if (currentIndex < videoList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(-1);
    }
  };

  const currentSrc = currentIndex > -1 ? videoList[currentIndex] : undefined;
  const [lastProps, setLastProps] = useState(videos);
  if (!deepEqual(lastProps, videos)) {
    setLastProps(videos);
    if (!currentSrc) {
      setCurrentIndex(videoList.length);
    }
    setVideoList([...videoList, ...videos]);
  }

  const nextSrc =
    currentSrc && videoList[currentIndex + 1]
      ? videoList[currentIndex + 1]
      : undefined;

  const [blocked, setBlocked] = useState(false);
  const play = (playerEl: HTMLVideoElement) => {
    if (!playerEl.paused) {
      return;
    }
    playerEl.play().catch(() => {
      // Autoplay is blocked, likely due to lack of interaction
      setBlocked(true);
    });
  };
  const notBlocked = () => (blocked ? setBlocked(false) : void 0);

  const player1: React.MutableRefObject<null | HTMLVideoElement> = useRef(null);
  const player2: React.MutableRefObject<null | HTMLVideoElement> = useRef(null);
  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);
  function reportReady(playerEl: HTMLVideoElement) {
    if (playerEl === player1.current) {
      setPlayer1Ready(true);
    }
    if (playerEl === player2.current) {
      setPlayer2Ready(true);
    }
  }
  function reportPlaying(playerEl: HTMLVideoElement) {
    notBlocked();
    if (playerEl === player1.current) {
      setPlayer1Ready(false);
    }
    if (playerEl === player2.current) {
      setPlayer2Ready(false);
    }
  }
  useEffect(
    () => {
      [player1, player2].forEach(ref => {
        if (!ref.current) {
          throw new Error('players were not properly referenced');
        }
        const endMatch = new RegExp(currentSrc + '$');
        if (endMatch.test(ref.current.src)) {
          const playerReady = ref === player1 ? player1Ready : player2Ready;
          if (playerReady) {
            play(ref.current);
          }
        }
      });
    },
    [currentSrc, nextSrc, player1Ready, player2Ready, player1, player2],
  );
  function player(key: number, ref: any, initialSrc: string | undefined) {
    // const isCurrent = key === currentPlayerKey.current;
    // const className = isCurrent ? 'max-w-full relative z-10' : 'absolute max-w-full z-0';
    const className = 'max-w-1/2 relative z-10';
    return (
      <video
        ref={ref}
        key={key}
        className={className}
        src={initialSrc}
        onEnded={handleEnded}
        controls={blocked}
        onCanPlayThrough={ev => reportReady(ev.currentTarget)}
        onPlay={ev => reportPlaying(ev.currentTarget)}
      />
    );
  }

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
          Index: {currentIndex + 1} - {currentSrc}
        </div>
      </div>
      <div className="relative max-w-full">
        {[[1, player1, currentSrc], [2, player2, nextSrc]].map(x =>
          // @ts-ignore
          player(...x),
        )}
      </div>
    </div>
  );
};
