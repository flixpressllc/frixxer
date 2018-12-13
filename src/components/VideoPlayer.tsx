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
  const [player1Loaded, setPlayer1Loaded] = useState(false);
  const [player2Loaded, setPlayer2Loaded] = useState(false);
  const noPlayersLoaded = !player1Loaded && !player2Loaded;
  function reportLoaded(playerEl: HTMLVideoElement) {
    if (playerEl === player1.current) {
      setPlayer1Loaded(true);
    }
    if (playerEl === player2.current) {
      setPlayer2Loaded(true);
    }
  }
  function reportPlaying(playerEl: HTMLVideoElement) {
    notBlocked();
    if (playerEl === player1.current) {
      setPlayer1Loaded(false);
    }
    if (playerEl === player2.current) {
      setPlayer2Loaded(false);
    }
  }
  useEffect(
    () => {
      makeCurrent(player1);
      player1.current!.src = currentSrc as string;
    },
    ['once'],
  );
  useEffect(
    () => {
      const endMatchNext = new RegExp(nextSrc + '$');
      if (nextSrc && nextPlayer && !endMatchNext.test(nextPlayer.src)) {
        nextPlayer.src = nextSrc;
      }
    },
    [nextPlayer],
  );
  useEffect(
    () => {
      if (noPlayersLoaded) {
        const endMatchNext = new RegExp(nextSrc + '$');
        if (nextSrc && nextPlayer && !endMatchNext.test(nextPlayer.src)) {
          nextPlayer.src = nextSrc;
        }
      }
    },
    [nextSrc],
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
          const playerReady = ref === player1 ? player1Loaded : player2Loaded;
          if (playerReady) {
            play(ref.current);
          }
        }
      });
    },
    [currentSrc, player1Loaded, player2Loaded],
  );
  function makeCurrent(ref: React.MutableRefObject<HTMLVideoElement | null>) {
    setCurrentPlayer(ref.current);
    setNextPlayer(player1 === ref ? player2.current : player1.current);
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
        ref={ref}
        key={key}
        className={className}
        onEnded={handleEnded}
        controls={blocked}
        onCanPlayThrough={ev => reportLoaded(ev.currentTarget)}
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
