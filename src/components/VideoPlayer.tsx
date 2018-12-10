import React from 'react';

interface Props {
  videos: string[];
}

export default ({ videos }: Props) => {
  return <video src={videos[0]} autoPlay />;
};
