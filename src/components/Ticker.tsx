import React, { useEffect, useRef, useState } from 'react';
import './Ticker.css';
import { removeProps } from '../utils';

interface ComponentProps {
  items: string[];
  pxPerSecond?: number;
}

interface Props extends React.HTMLAttributes<HTMLDivElement>, ComponentProps {}

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

export default function Ticker(props: Props) {
  const ticker = useRef(null as HTMLDivElement | null);
  const windowWidth = useWindowWidth();
  useEffect(
    () => {
      const pxPerSecond = props.pxPerSecond || 200;
      const tickerWidth = ticker.current!.clientWidth;
      const tickerWrapperWidth = ticker.current!.parentElement!.clientWidth;
      const fullWidth = tickerWidth + tickerWrapperWidth;
      const duration = fullWidth / pxPerSecond;
      ticker.current!.style.animationDuration = `${duration}s`;
    },
    [props.items, props.pxPerSecond, ticker.current, windowWidth],
  );

  // Remove non-div props
  const divProps = removeProps(props, 'pxPerSecond', 'items');

  return (
    <div {...divProps}>
      <div className="ticker-wrapper">
        <div ref={ticker} className="ticker">
          {props.items.map((text, i) => {
            return (
              <span className="ticker-item" key={i}>
                {text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
