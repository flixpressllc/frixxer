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
      className=" bg-blue-darker h-screen flex flex-col justify-between overflow-x-hidden"
      style={{ width: 1280, height: 720 }}
    >
      <div className="flex">
        <Logo style={{ height: '50px', width: '200px' }} />
        <div className="flex-grow bg-blue-light flex justify-center items-center">
          Banner
        </div>
        <div
          className="bg-red  flex justify-center items-center"
          style={{ height: '50px', width: '200px' }}
        >
          Core Sponsor
        </div>
      </div>
      <div className="flex flex-grow">
        <div
          className="flex flex-col flex-no-shrink flex-no-grow"
          style={{ flexBasis: '380px' }}
        >
          <div
            className="bg-grey flex-no-shrink flex-no-grow bg-red flex justify-center items-center"
            style={{ flexBasis: '317px' }}
          >
            Ad Element
          </div>
          <div className="bg-grey flex-grow flex justify-center items-center">
            Cycling Widgets
            <ul>
              <li>Weather</li>
              <li>Gas</li>
              <li>Stocks</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col flex-shrink">
          <div className="flex flex-col flex-grow">
            <VideoPlayer videos={videos1} className="" />
            <div className="flex flex-grow justify-center items-center bg-green">
              coming up
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '17px' }}>
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
    </div>
  );
}
