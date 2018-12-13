import { useState } from 'react';
import { deepEqual, clone } from 'happy-helpers';
import { addToWindow } from '../utils/window';

/**
 * Takes a list and compares it with the previous values.
 * If they are different, the new values are concatenated onto the
 * running list.
 *
 * @param list Array of items that you wish to concatenate to
 * your running list of items.
 *
 * @returns An array whose first element is the advance function. All
 * remaining elements are your items in order. Destructuring gives you
 * either an item or undefined for every remaining list item.
 *
 * @example
 *
 * ```
 * // hitters is Ruth, Cobb, Jackson, Gehrig
 * const [advanceOrStrikeout, upToBat, onDeck, inTheHole] =
 *   useTextQueue(hitters);
 *
 * // upToBat: Ruth, onDeck: Cobb, inTheHole: Jackson
 *
 * // Homerun!:
 * advanceOrStrikeout();
 *
 * // upToBat: Cobb, onDeck: Jackson, inTheHole: Gehrig
 * ```
 */
export function useQueue<T extends string | number | object>(list: T[]) {
  const [runningList, setRunningList] = useState(list);
  const [lastProps, setLastProps] = useState(list);

  if (!deepEqual(clone(lastProps), clone(list))) {
    setLastProps(list);
    setRunningList([...runningList, ...list]);
  }

  const advance = () => {
    setRunningList(runningList.slice(1));
  };

  type PossibleItem = T | undefined;
  return [advance, ...runningList] as [() => void, ...PossibleItem[]];
}
