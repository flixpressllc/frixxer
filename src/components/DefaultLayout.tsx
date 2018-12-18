import React from 'react';
import VideoPlayer from './VideoPlayer';
import { useVideoFeed } from '../utils/dev-utils';
import Ticker from './Ticker';
import Logo from './Logo';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function DefaultLayout(props: Props) {
  const [videos1] = useVideoFeed();
  const [videos2] = useVideoFeed();
  const lipsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <div
      {...props}
      className=" bg-blue-darker h-screen flex flex-col justify-between p-4 overflow-x-hidden"
    >
      <div className="flex">
        <Logo />
        <div className="flex flex-grow">
          <div className="flex-grow bg-grey ml-2">Jokes </div>
          <div className="flex-grow bg-grey ml-2">Quotes </div>
          <div className="flex-grow bg-grey ml-2">Scores </div>
        </div>
      </div>
      <div className="flex my-2 flex-grow">
        <div className="flex flex-col w-64 flex-no-shrink">
          <div className="bg-grey" style={{ flexGrow: 3 }}>
            Cycling Widgets
            <ul>
              <li>Weather</li>
              <li>Gas</li>
              <li>Stocks</li>
            </ul>
          </div>
          <div className="bg-grey mt-2" style={{ flexGrow: 4 }}>
            Image Ads
          </div>
        </div>
        <div className="flex flex-col flex-shrink">
          <div className="flex">
            <VideoPlayer videos={videos1} className="ml-2" />
            <VideoPlayer videos={videos2} className="ml-2" />
          </div>
          <div className="flex flex-grow mt-2">
            <div className="bg-grey flex-grow ml-2">Local Events</div>
            <div className="bg-grey flex-grow ml-2">Deals</div>
            <div className="bg-grey flex-grow ml-2">Night out</div>
          </div>
        </div>
      </div>
      <div className="-ml-4">
        <Ticker
          pxPerSecond={150}
          items={['Global Headlines:', lipsum]}
          className="bg-shade text-yellow text-xl font-bold w-screen"
        />
        <Ticker
          pxPerSecond={125}
          items={['Entertainment Headlines', lipsum]}
          className="bg-shade text-yellow text-xl font-bold w-screen"
        />
        <Ticker
          pxPerSecond={100}
          items={['Sports Headlines', lipsum]}
          className="bg-shade text-yellow text-xl font-bold w-screen"
        />
      </div>
    </div>
  );
}
