import React from 'react';
import { connect } from 'react-redux';
import { removeNonAttributePropsAnd, nullDispatch } from '../utils';
import { StoreData } from '../redux/store';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  images: string[];
}

function AdImageSlides(props: Props) {
  const divProps = removeNonAttributePropsAnd(props);
  return (
    <div {...divProps}>
      I should display
      <ol>
        {props.images.map((image, i) => {
          return <li key={i}>{image}</li>;
        })}
      </ol>
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
