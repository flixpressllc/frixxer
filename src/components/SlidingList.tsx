import React, { useState, useEffect, useRef } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
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
  useEffect(
    () => {
      if (previousList[0] && list[0] && previousList[0].id === list[0].id) {
        return;
      }
      if (previousList[1] && list[0] && previousList[1].id === list[0].id) {
        getItemShading.current =
          getItemShading.current === getItemShadingA
            ? getItemShadingB
            : getItemShadingA;
      }
    },
    [props.items],
  );

  function willEnter() {
    return { height: 0 };
  }

  function willLeave() {
    return { height: spring(0) };
  }

  const ulProps = removeProps(props, 'items');

  return (
    <TransitionMotion
      styles={masterList.map(item => ({
        key: item.id.toString(),
        style: { height: spring(60, presets.gentle) },
        data: item,
      }))}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {styles => (
        <ul {...ulProps} style={{ listStyle: 'none' }}>
          {styles.map(({ key, style, data: item }, i) => (
            <li style={style} key={key}>
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
