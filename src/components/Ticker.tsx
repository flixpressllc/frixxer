import React, { useEffect, useRef, useState } from 'react';
import './Ticker.css';

interface Props {
  items: string[];
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}

export default ({ items }: Props) => {
  const ticker = useRef(null as HTMLDivElement | null);
  const windowWidth = useWindowWidth();
  useEffect(
    () => {
      const pxPerSecond = 200;
      const tickerWidth = ticker.current!.clientWidth;
      const tickerWrapperWidth = ticker.current!.parentElement!.clientWidth;
      const fullWidth = tickerWidth + tickerWrapperWidth;
      const duration = fullWidth / pxPerSecond;
      ticker.current!.style.animationDuration = `${duration}s`;
    },
    [items, ticker.current, windowWidth],
  );
  return (
    <div className="ticker-wrapper">
      <div ref={ticker} className="ticker">
        {items.map((text, i) => {
          return (
            <span className="ticker-item" key={i}>
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
