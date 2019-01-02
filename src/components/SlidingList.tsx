import React, { useState, useEffect } from 'react';

interface Item {
  label: string;
  id: number | string;
}

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
      {masterList.map((item, i) => (
        <li
          key={item.id}
          className={`flex text-2xl p-4 ${i % 2 ? 'bg-shade-light' : ''}`}
        >
          <div className="px-4 flex-grow">{item.label}</div>
          <div className="px-4">12s</div>
        </li>
      ))}
    </div>
  );
}
