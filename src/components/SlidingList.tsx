import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: any[];
}

export default function SlidingList(props: Props) {
  return (
    <div {...props}>
      {props.items.map((name, i) => (
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
