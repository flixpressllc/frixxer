import React, { useEffect, useRef } from 'react';
import './Ticker.css';
import { nullDispatch, removeNonAttributePropsAnd } from '../utils';
import { StoreData } from '../redux/store';
import { connect } from 'react-redux';
import { useWindowWidth } from '../custom-hooks/useWindowWidth';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
  pxPerSecond?: number;
}

function Ticker(props: Props) {
  const ticker = useRef(null as HTMLDivElement | null);
  const windowWidth = useWindowWidth();
  const itemsTwice = props.items.concat(props.items);
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
  const divProps = removeNonAttributePropsAnd(props, 'items');

  return (
    <div {...divProps}>
      <div className="ticker-wrapper">
        <div ref={ticker} className="ticker">
          {itemsTwice.map((text, i) => {
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

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type ConnectedProps = Omit<Props, 'items'> & { tickerId: number };

const mapStateToProps = (
  state: StoreData,
  ownProps: ConnectedProps,
): Props => ({
  items: state.tickers[ownProps.tickerId],
});

export default (connect(
  mapStateToProps,
  nullDispatch,
)(Ticker) as any) as (props: ConnectedProps) => JSX.Element;

export { Ticker as UnconnectedTicker };
