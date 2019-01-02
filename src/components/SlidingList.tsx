import React, { useState, useEffect } from 'react';

type Item = string;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[];
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
  return (
    <div {...props}>
      {masterList.map((name, i) => (
        <li
          key={i}
          className={`flex text-2xl p-4 ${i % 2 ? 'bg-shade-light' : ''}`}
        >
          <div className="px-4 flex-grow">{name}</div>
          <div className="px-4">12s</div>
        </li>
      ))}
    </div>
  );
}
