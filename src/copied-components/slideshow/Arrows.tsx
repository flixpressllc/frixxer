import React from 'react';
import './Slideshow.css';

interface Props {
  decreaseCount: () => void;
  increaseCount: () => void;
}

function Arrows(props: Props) {
  return (
    <div className="arrows">
      <span
        onClick={props.decreaseCount}
        className="arrow btn-arrow btn-arrow-left"
      />
      <span
        onClick={props.increaseCount}
        className="arrow btn-arrow btn-arrow-right"
      />
    </div>
  );
}

export default Arrows;
