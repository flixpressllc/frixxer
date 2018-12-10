import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(count + 1);
  const dec = () => setCount(count - 1);
  return (
    <div>
      <div className="text-red">The count is {count}</div>
      <button className="bg-blue-lighter p-2 m-2 rounded" onClick={inc}>
        Increment
      </button>
      <button className="bg-blue-lighter p-2 m-2 rounded" onClick={dec}>
        Decrement
      </button>
    </div>
  );
};
