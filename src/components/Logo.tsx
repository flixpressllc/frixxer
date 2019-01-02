import React from 'react';
import { mergeClasses } from '../utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo(props: Props) {
  return (
    <div
      {...props}
      className={mergeClasses('bg-orange center-xy text-white text-2xl', props)}
    >
      Frixxer Logo
    </div>
  );
}
