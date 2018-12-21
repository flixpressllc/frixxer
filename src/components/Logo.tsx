import React from 'react';
import { mergeClasses } from '../utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo(props: Props) {
  return (
    <div
      className={mergeClasses(
        'bg-grey h-32 w-32 flex justify-center items-center',
        props,
      )}
    >
      logo
    </div>
  );
}
