import React, { useState, useEffect, useRef } from 'react';
import { TransitionMotion, spring, StaggeredMotion } from 'react-motion';
import { removeProps } from '../utils';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { StoreData } from '../redux/store';

interface Item {
  label: string;
  id: number | string;
}

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  items: Item[];
  advance: () => any;
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

function SlidingList(props: Props) {
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

  // Proof of concept: advance store manually
  useEffect(
    () => {
      const id = setInterval(props.advance, 2000);
      return () => clearInterval(id);
    },
    ['once'],
  );

  const getItemShading = useRef(getItemShadingA);
  function alternateShading() {
    getItemShading.current =
      getItemShading.current === getItemShadingA
        ? getItemShadingB
        : getItemShadingA;
  }

  const ulProps = removeProps(props, 'items', 'advance');

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
      {transitionMotionStyles => (
        <StaggeredMotion
          defaultStyles={transitionMotionStyles.map(({ style }) => style)}
          styles={lastStyles =>
            lastStyles!.map((_, i) => {
              if (transitionMotionStyles[0].style.y === 0) {
                return { y: 0 };
              }
              if (i === 0) {
                return transitionMotionStyles[0].style;
              }
              return {
                y: spring(lastStyles![i - 1].y),
              };
            })
          }
        >
          {(staggeredMotionStyles: any) => (
            <ul {...ulProps} style={{ listStyle: 'none' }}>
              {transitionMotionStyles.map(({ key, style, data: item }, i) => (
                <li
                  style={{
                    transform: `translate3d(0, ${
                      (staggeredMotionStyles[i] || style).y
                    }%, 0)`,
                  }}
                  key={key}
                  className="overflow-hidden"
                >
                  <div
                    className={`flex text-2xl p-4 ${getItemShading.current(i)}`}
                  >
                    <div className="px-4 flex-grow">{item.label}</div>
                    <div className="px-4">12s</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </StaggeredMotion>
      )}
    </TransitionMotion>
  );
}

const mapStateToProps = (state: StoreData) => {
  return { items: state.video.queue };
};
const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = dispatch => ({
  advance: () => dispatch({ type: 'ADVANCE_VIDEO_QUEUE' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SlidingList);
