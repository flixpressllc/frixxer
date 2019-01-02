import React, { useState, useEffect, useRef } from 'react';

interface Item {
  label: string;
  id: number | string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
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
  return (
    <div {...props}>
      {masterList.map((item, i) => (
        <li
          key={item.id}
          className={`flex text-2xl p-4 ${getItemShading.current(i)}`}
        >
          <div className="px-4 flex-grow">{item.label}</div>
          <div className="px-4">12s</div>
        </li>
      ))}
    </div>
  );
}
