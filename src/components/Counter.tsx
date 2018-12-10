import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(count + 1);
  const dec = () => setCount(count - 1);
  return (
    <div>
      <div className="text-red">The count is {count}</div>
      <button
        className="bg-blue-lighter px-2 py-1 m-2 rounded-lg"
        onClick={dec}
      >
        Decrement
      </button>
      <button
        className="bg-blue-lighter px-2 py-1 m-2 rounded-lg"
        onClick={inc}
      >
        Increment
      </button>
    </div>
  );
};
