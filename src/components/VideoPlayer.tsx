import React, { useState, useRef, useEffect } from 'react';
import { useQueue } from '../custom-hooks/useQueue';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  const [handleEnded, currentSrc, nextSrc] = useQueue(videos);

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
  const [currentPlayer, setCurrentPlayer] = useState(
    null as null | HTMLVideoElement,
  );
  const [nextPlayer, setNextPlayer] = useState(null as null | HTMLVideoElement);
  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
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
      makeCurrent(player1);
    },
    ['once'],
  );
  useEffect(
    () => {
      const endMatchCurrent = new RegExp(currentSrc + '$');
      const endMatchNext = new RegExp(nextSrc + '$');
      if (
        currentSrc &&
        currentPlayer &&
        currentPlayer.paused &&
        !endMatchCurrent.test(currentPlayer.src)
      ) {
        currentPlayer.src = currentSrc;
      }
      if (nextSrc && nextPlayer && !endMatchNext.test(nextPlayer.src)) {
        nextPlayer.src = nextSrc;
      }
    },
    [currentPlayer, nextPlayer, nextSrc, currentSrc],
  );
  useEffect(
    () => {
      [player1, player2].forEach(ref => {
        if (!ref.current) {
          throw new Error('players were not properly referenced');
        }
        const endMatch = new RegExp(currentSrc + '$');
        if (endMatch.test(ref.current.src)) {
          makeCurrent(ref);
          const playerReady = ref === player1 ? player1Ready : player2Ready;
          if (playerReady) {
            play(ref.current);
          }
        }
      });
    },
    [currentSrc, nextSrc, player1Ready, player2Ready],
  );
  function makeCurrent(ref: React.MutableRefObject<HTMLVideoElement | null>) {
    setCurrentPlayer(ref.current);
    setNextPlayer(player1 === ref ? player2.current : player1.current);
  }
  function updatePlayerRef(
    ref: React.MutableRefObject<null | HTMLVideoElement>,
    el: HTMLVideoElement | null,
  ) {
    if (ref.current === el) {
      return;
    }
    if (updateCount === 0) {
      setUpdateCount(1);
    }
    ref.current = el;
  }
  function player(
    key: number,
    ref: React.MutableRefObject<null | HTMLVideoElement>,
  ) {
    const isCurrent = ref.current === currentPlayer;
    const className =
      'max-w-full ' + (isCurrent ? 'z-10 relative' : 'z-0 absolute pin');
    return (
      <video
        ref={el => updatePlayerRef(ref, el)}
        key={key}
        className={className}
        onEnded={handleEnded}
        controls={blocked}
        onCanPlayThrough={ev => reportReady(ev.currentTarget)}
        onPlay={ev => reportPlaying(ev.currentTarget)}
      />
    );
  }

  return (
    <div className="text-white">
      <div className="relative max-w-full">
        {[[1, player1], [2, player2]].map(x =>
          // @ts-ignore
          player(...x),
        )}
      </div>
    </div>
  );
};
