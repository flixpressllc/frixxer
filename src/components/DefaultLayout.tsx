import React from 'react';
import VideoPlayer from './VideoPlayer';
import { useVideoFeed, useTimedList } from '../utils/dev-utils';
import Ticker from './Ticker';
import Logo from './Logo';
import AspectRatio from './AspectRatio';
import SlidingList from './SlidingList';
import './DefaultLayout.css';
import PerpetualCountdown from './PerpetualCountdown';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function DefaultLayout(props: Props) {
  const [videos1] = useVideoFeed();
  const lipsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <div {...props} className="DefaultLayout bg-blue-darker relative">
      <div className="DefaultLayout__header">
        <div className="DefaultLayout__sponsor1 bg-red center-xy">
          Core Sponsor
        </div>
        <div className="DefaultLayout__banner bg-blue-light center-xy">
          Banner
        </div>
        <div className="DefaultLayout__sponsor2 bg-red center-xy">
          Core Sponsor
        </div>
      </div>
      <div className="DefaultLayout__center">
        <div className="DefaultLayout__sidebar flex flex-col">
          <div className="DefaultLayout__main-ad bg-yellow-dark center-xy">
            Ad Element
          </div>
          <div className="DefaultLayout__widgets bg-grey center-xy">
            Cycling Widgets
            <ul>
              <li>Weather</li>
              <li>Gas</li>
              <li>Stocks</li>
            </ul>
          </div>
        </div>
        <div className="DefaultLayout__video-area flex flex-col">
          <AspectRatio ratio="16:9">
            <VideoPlayer videos={videos1} className="" />
          </AspectRatio>
          <div className="bg-green overflow-hidden flex flex-grow">
            <div className="flex-grow flex">
              <div className="flex-none bg-shade-lighter center-xy p-4 text-center text-2xl">
                Coming <br /> Up
              </div>
              <SlidingList className="p-0 flex-grow" />
            </div>
          </div>
        </div>
      </div>
      <div className="DefaultLayout__footer flex relative">
        <div style={{ fontSize: '17px' }} className="DefaultLayout__tickers">
          <Ticker
            pxPerSecond={100}
            items={['Global Headlines:', lipsum]}
            className="bg-shade text-yellow font-bold w-screen"
          />
          <Ticker
            pxPerSecond={125}
            items={['Entertainment Headlines', lipsum]}
            className="bg-shade text-yellow font-bold w-screen"
          />
          <Ticker
            pxPerSecond={150}
            items={['Sports Headlines', lipsum]}
            className="bg-shade text-yellow font-bold w-screen"
          />
        </div>
        <AspectRatio
          ratio="1:1"
          className="DefaultLayout__countdown absolute pin-b pin-l bg-blue-dark"
        >
          <PerpetualCountdown
            className="h-full w-full center-xy text-white text-xl"
            timeInSeconds={30}
          />
        </AspectRatio>
      </div>
      <Logo className="DefaultLayout__bug absolute pin-r pin-b" />
    </div>
  );
}
