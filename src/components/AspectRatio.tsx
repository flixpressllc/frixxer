import React from 'react';
import { removeProps } from '../utils';

interface ComponentProps {
  ratio: string;
}

interface Props extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 *
 * @param props includes a `ratio` property which is a string in the form of width:height. Eg. "16:9", "4:3"
 *
 * @example
 *
 * <AspectRatio ratio='16:9'>
 *   // Your children here
 * </AspectRatio>
 */
export default function AspectRatio(props: Props) {
  const ratioAsNumber = props.ratio
    .split(':')
    .map(str => +str)
    .reduce((prev, curr) => curr / prev);

  const divProps = removeProps(props, 'children', 'ratio');
  return (
    <div {...divProps}>
      <div
        style={{
          paddingBottom: `${ratioAsNumber * 100}%`,
        }}
        className="relative"
      >
        <div className="absolute w-full h-full pin">{props.children}</div>
      </div>
    </div>
  );
}
