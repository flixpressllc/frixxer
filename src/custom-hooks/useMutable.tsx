import { useRef } from 'react';

/**
 * Sets the current prop of the returned value on every render
 * thus giving you access to the latest state that React
 * does not watch.
 *
 * Differs from useRef in that it is set every time, so there
 * is no need to create it, then set the current property
 */
export function useMutable(value: any) {
  const mutable = useRef(value);
  mutable.current = value;
  return mutable;
}
