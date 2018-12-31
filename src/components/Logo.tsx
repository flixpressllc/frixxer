import React from 'react';
import { mergeClasses } from '../utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo(props: Props) {
  return (
    <div
      {...props}
      className={mergeClasses(
        'bg-grey flex justify-center items-center',
        props,
      )}
    >
      Frixxer Logo
    </div>
  );
}
