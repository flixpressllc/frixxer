declare module 'react-slidez' {
  import React, { ReactChildren } from 'react';

  enum Effect {
    fade = 'fade',
    left = 'left',
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    bounceRight = 'bounce-right',
    bounceLeft = 'bounce-left',
  }

  interface SharedProps {
    showIndex: boolean;
    showArrows: boolean;
    autoplay: boolean;
    enableKeyboard: boolean;
    useDotIndex: boolean;
    slideInterval: number;
    defaultIndex: boolean;
    effect: Effect;
    height: string;
    width: string;
  }

  interface PropsSlides extends Partial<SharedProps> {
    slides: string[];
  }

  interface PropsChildren extends Partial<SharedProps> {
    children: JSX.Element[] | JSX.Element;
  }

  type Props = PropsChildren | PropsSlides;
  export default function Slideshow(props: Props): JSX.Element;
}
