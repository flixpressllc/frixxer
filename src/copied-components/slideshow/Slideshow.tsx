import React, { Component } from 'react';
import Arrows from './Arrows';
import './Slideshow.css';
import range from 'lodash/range';
import castArray from 'lodash/castArray';
import { removeNonAttributePropsAnd, mergeClasses } from '../../utils';

enum Effect {
  fade = 'fade',
  left = 'left',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  bounceRight = 'bounce-right',
  bounceLeft = 'bounce-left',
}

interface SharedProps extends React.HTMLAttributes<HTMLDivElement> {
  showIndex: boolean;
  showArrows: boolean;
  disableAutoPlay: boolean;
  enableKeyboard: boolean;
  useDotIndex: boolean;
  slideInterval: number;
  defaultIndex: boolean;
  transitionEffect: Effect;
}

interface PropsSlides extends Partial<SharedProps> {
  imageUrls: string[];
}

interface PropsChildren extends Partial<SharedProps> {
  children: JSX.Element[] | JSX.Element;
}

type Props = PropsChildren | PropsSlides;
class Slideshow extends Component<
  Props,
  {
    currentSlide: number;
    transitionEffect: Effect;
    slides: JSX.Element[] | string[];
    intervalId: number | undefined;
  }
> {
  private static defaultProps = {
    showIndex: false,
    showArrows: false,
    disableAutoPlay: false,
    enableKeyboard: false,
    useDotIndex: false,
    slideInterval: 5000,
    defaultIndex: 0,
    transitionEffect: 'fade',
    imageUrls: [] as string[],
  };

  constructor(
    props: Props & typeof Slideshow.defaultProps & { children?: JSX.Element[] },
  ) {
    super(props);
    this.state = {
      intervalId: undefined,
      currentSlide: props.defaultIndex,
      transitionEffect: props.transitionEffect,
      slides: this.props.children
        ? castArray((this.props as PropsChildren).children)
        : (this.props as PropsSlides).imageUrls,
    };

    this.runSlideShow = this.runSlideShow.bind(this);
    this.autoSlideshow = this.autoSlideshow.bind(this);
    this.restartSlideshow = this.restartSlideshow.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  public componentDidMount() {
    if (!this.props.disableAutoPlay) {
      this.runSlideShow();
    }

    if (this.props.enableKeyboard) {
      document.addEventListener('keydown', this.handleKeyboard);
    }
  }

  private handleKeyboard(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 37:
        return this.decreaseCount();
      case 39:
        return this.increaseCount();
      default:
        return;
    }
  }

  private runSlideShow() {
    this.setState({
      intervalId: setInterval(this.autoSlideshow, this.props.slideInterval),
    });
  }

  public componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  private autoSlideshow() {
    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    });
  }

  private restartSlideshow() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.runSlideShow();
  }

  private increaseCount() {
    this.state.transitionEffect === Effect.left
      ? this.setState({
          transitionEffect: Effect.right,
        })
      : this.state.transitionEffect === Effect.bounceLeft
      ? this.setState({
          transitionEffect: Effect.bounceRight,
        })
      : null;

    !this.props.disableAutoPlay ? this.restartSlideshow() : null;
    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    });
  }

  private decreaseCount() {
    this.state.transitionEffect === Effect.right
      ? this.setState({
          transitionEffect: Effect.left,
        })
      : this.state.transitionEffect === Effect.bounceRight
      ? this.setState({
          transitionEffect: Effect.bounceLeft,
        })
      : null;

    !this.props.disableAutoPlay ? this.restartSlideshow() : null;

    let currentSlide;
    currentSlide =
      this.state.currentSlide === 0
        ? this.state.slides.length - 1
        : (currentSlide = this.state.currentSlide - 1);
    this.setState({
      currentSlide,
    });
  }

  public render() {
    const { transitionEffect, slides } = this.state;

    const slideEffect: Effect = transitionEffect
      ? transitionEffect
      : Effect.fade;
    let slideShowSlides;
    let slideShowIndex;

    if (!this.props.children) {
      slideShowSlides = (this.props as PropsSlides).imageUrls.map(
        (slide, i) => {
          return (
            <li
              className={`slide ${transitionEffect} ${
                this.state.currentSlide === i ? 'showing-' + slideEffect : ''
              }`}
              key={i}
              style={{ backgroundImage: `url(${slide})` }}
            />
          );
        },
      );
    } else {
      slideShowSlides = castArray((this.props as PropsChildren).children).map(
        (slide, i) => {
          return (
            <li
              className={`slide ${transitionEffect} ${
                this.state.currentSlide === i ? 'showing-' + slideEffect : ''
              }`}
              key={i}
            >
              {slide}
            </li>
          );
        },
      );
    }

    if (this.props.useDotIndex) {
      slideShowIndex = (
        <div className="show-index is-dot">
          {range(slides.length).map(i => {
            return (
              <span
                className={`dot ${
                  this.state.currentSlide === i ? 'is-active' : ''
                }`}
                key={`dot${i}`}
              />
            );
          })}
        </div>
      );
    } else {
      slideShowIndex = (
        <div className="show-index is-text">
          <p>{`${this.state.currentSlide + 1} / ${slides.length}`}</p>
        </div>
      );
    }

    const divProps = removeNonAttributePropsAnd(this.props);

    return (
      <div
        {...divProps}
        className={mergeClasses('relative w-full h-full', divProps)}
      >
        <div className="slideshow-container">
          <ul className="slides">{slideShowSlides}</ul>

          {this.props.showArrows && (
            <Arrows
              decreaseCount={this.decreaseCount}
              increaseCount={this.increaseCount}
            />
          )}

          {this.props.showIndex && slideShowIndex}
        </div>
      </div>
    );
  }
}

export default Slideshow;
