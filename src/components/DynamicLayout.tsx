import React from 'react';
import './DynamicLayout.css';
import UserComponent from './UserComponent';

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
  ) {
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
    ['image-holder', 'logo-feed', 'on-top', 8, 8, 200, 200, 2],
    ['main-video', 'video-feed', 'my-video', 12, 12, 640, 360],
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
