import React from 'react';
import './DynamicLayout.css';
import UserComponent, { UserComponentProps } from './UserComponent';

type Props = object;

function DynamicLayout(props: Props) {
  function toComData(
    type: string,
    data: string,
    id: string,
    top: number,
    left: number,
    width: number,
    height: number,
    z?: number,
  ): UserComponentProps {
    return {
      comDataId: data,
      comHeight: height,
      comWidth: width,
      comId: id,
      comType: type,
      comX: left,
      comY: top,
      comZ: z,
    };
  }
  const fakeDatas = ([
    ['image-holder', 'image-feed', 'core-sponsor-1', 0, 0, 200, 50],
    ['image-holder', 'banner-feed', 'banner', 0, 200, 880, 50],
    ['image-holder', 'image-feed', 'core-sponsor-2', 0, 1080, 200, 50],
    ['image-slides', 'ad-feed', 'main-ad', 50, 0, 480, 317],
    ['any-slides', 'widgets-feed', 'widgets', 367, 0, 480, 251],
    ['main-video', 'video-feed', 'my-video', 50, 480, 800, 450],
    ['coming-up', 'video-feed?', 'coming-up', 500, 480, 800, 568 - 450],
    ['ticker', 'sports-feed', 'sports', 618, 0, 1280, 34],
    ['ticker', 'ent-feed', 'entertainment', 618 + 34, 0, 1280, 34],
    ['ticker', 'poli-feed', 'politics', 618 + 68, 0, 1280, 34],
    ['countdown', 'countdown-data', 'countdown', 720 - 34, 0, 34, 34, 2],
    ['logo', 'logo-data', 'logo', 720 - 68, 1280 - 300, 300, 68, 2],
  ] as any) as [
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number | undefined
  ][];
  const userComponents = fakeDatas.map((d, i) => (
    <UserComponent key={i} {...toComData(...d)} />
  ));
  return (
    <div className="DynamicLayout__MainContainer relative">
      {userComponents}
    </div>
  );
}

export default DynamicLayout;
