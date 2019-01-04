import React, { useRef } from 'react';
import { TransitionMotion, spring, StaggeredMotion } from 'react-motion';
import { removeProps, nullDispatch } from '../utils';
import { connect } from 'react-redux';
import { StoreData } from '../redux/store';

interface Item {
  label: string;
  id: number | string;
}

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  list: Item[];
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
  const { list } = props;

  const getItemShading = useRef(getItemShadingA);
  function alternateShading() {
    getItemShading.current =
      getItemShading.current === getItemShadingA
        ? getItemShadingB
        : getItemShadingA;
  }

  const ulProps = removeProps(props, 'list');

  return (
    <TransitionMotion
      styles={list.map(item => ({
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
          styles={lastStyles => {
            if (!lastStyles!.length) {
              return transitionMotionStyles.map(x => x.style);
            }
            return lastStyles!.map((_, i) => {
              if (!transitionMotionStyles[0]) {
                return {};
              }
              if (transitionMotionStyles[0].style.y === 0) {
                return { y: 0 };
              }
              if (i === 0) {
                return transitionMotionStyles[0].style;
              }
              return {
                y: spring(lastStyles![i - 1].y),
              };
            });
          }}
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
  return { list: state.video.queue.slice(1) };
};

export default connect(
  mapStateToProps,
  nullDispatch,
)(SlidingList);
