import { useState, useEffect } from 'react';
import { useMutable } from './useMutable';

const listeners = new Set<{ current: (width: number) => void }>();

function perform() {
  listeners.forEach(ref => ref.current(window.innerWidth));
}

function addWindowSizeListener(setStateRef: {
  current: (width: number) => void;
}) {
  listeners.add(setStateRef);
  if (listeners.size === 1) {
    window.addEventListener('resize', perform);
  }
}

function removeWindowSizeListener(setStateRef: {
  current: (width: number) => void;
}) {
  listeners.delete(setStateRef);
  if (listeners.size === 0) {
    window.removeEventListener('resize', perform);
  }
}

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const setWidthRef = useMutable(setWidth);
  useEffect(
    () => {
      addWindowSizeListener(setWidthRef);
      return () => {
        removeWindowSizeListener(setWidthRef);
      };
    },
    ['once'],
  );
  return width;
}
