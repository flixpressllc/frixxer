import React, { useState, useEffect } from 'react';
import { useMutable } from '../custom-hooks/useMutable';
import { removeProps } from '../utils';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  timeInSeconds: number;
}

export default function PerpetualCountdown(props: Props) {
  const [countdown, setCountdown] = useState(props.timeInSeconds);
  const r = useMutable({ countdown, setCountdown });
  useEffect(
    () => {
      const timeoutNumber = setInterval(() => {
        const newTime =
          r.current.countdown - 1 === 0
            ? props.timeInSeconds
            : r.current.countdown - 1;
        r.current.setCountdown(newTime);
      }, 1000);
      return () => {
        clearInterval(timeoutNumber);
      };
    },
    ['once'],
  );
  const spanProps = removeProps(props, 'timeInSeconds');
  return <span {...spanProps}>{countdown}</span>;
}
