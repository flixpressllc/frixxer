import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(count + 1);
  const dec = () => setCount(count - 1);
  return (
    <div>
      <div>The count is {count}</div>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
    </div>
  );
};
