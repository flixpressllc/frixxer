import React from 'react';
import { connect } from 'react-redux';
import {
  removeNonAttributePropsAnd,
  nullDispatch,
  mergeClasses,
} from '../utils';
import { StoreData } from '../redux/store';
import Slideshow from '../copied-components/slideshow';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  images: string[];
}

function AdImageSlides(props: Props) {
  const divProps = removeNonAttributePropsAnd(props, 'images');
  return (
    <div {...divProps} className={mergeClasses('w-full h-full', divProps)}>
      <div className="w-full h-full relative overflow-hidden">
        {props.images.length ? (
          <Slideshow
            slides={props.images}
            showArrows={false}
            slideInterval={5000}
            enableKeyboard={false}
          />
        ) : null}
      </div>
    </div>
  );
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type ConnectedProps = Omit<Props, 'images'> & { adId: keyof StoreData['ads'] };

const mapStateToProps = (state: StoreData, ownProps: ConnectedProps): Props => {
  return {
    images: state.ads[ownProps.adId],
  };
};

export default (connect(
  mapStateToProps,
  nullDispatch,
)(AdImageSlides) as any) as (props: ConnectedProps) => JSX.Element;
