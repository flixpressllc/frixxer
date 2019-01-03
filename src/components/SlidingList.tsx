import React, { useState, useEffect, useRef } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { removeProps } from '../utils';

interface Item {
  label: string;
  id: number | string;
}

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  items: Item[];
}

const getItemShadingA = (i: number): string => {
  return i % 2 ? 'bg-shade-light' : '';
};
const getItemShadingB = (i: number): string => {
  return i % 2 ? '' : 'bg-shade-light';
};

function willLeave() {
  return { y: spring(-100) };
}

export default function SlidingList(props: Props) {
  const [list, setList] = useState(props.items);
  const [previousList, setPreviousList] = useState([] as Item[]);
  function combineLists(prev: Item[], next: Item[]): Item[] {
    return prev[0] ? [prev[0]].concat(next) : next;
  }
  const [masterList, setMasterList] = useState(
    combineLists(previousList, list),
  );
  useEffect(
    () => {
      if (list !== props.items) {
        setPreviousList(list);
        setList(props.items);
        setMasterList(combineLists(list, props.items));
      }
    },
    [props.items],
  );

  const getItemShading = useRef(getItemShadingA);
  function alternateShading() {
    getItemShading.current =
      getItemShading.current === getItemShadingA
        ? getItemShadingB
        : getItemShadingA;
  }

  const ulProps = removeProps(props, 'items');

  return (
    <TransitionMotion
      styles={masterList.map(item => ({
        key: item.id.toString(),
        style: { y: 0 },
        data: item,
      }))}
      willLeave={willLeave}
      didLeave={alternateShading}
    >
      {styles => (
        <ul {...ulProps} style={{ listStyle: 'none' }}>
          {styles.map(({ key, style, data: item }, i) => (
            <li
              style={{ transform: `translate3d(0, ${style.y}%, 0)` }}
              key={key}
              className="overflow-hidden"
            >
              <div className={`flex text-2xl p-4 ${getItemShading.current(i)}`}>
                <div className="px-4 flex-grow">{item.label}</div>
                <div className="px-4">12s</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </TransitionMotion>
  );
}
