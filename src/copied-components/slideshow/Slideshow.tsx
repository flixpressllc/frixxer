import React, { Component, ReactChildren } from 'react';
import Arrows from './Arrows.js';
import './Slideshow.css';
import range from 'lodash/range';

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
  children: JSX.Element[];
}

type Props = PropsChildren | PropsSlides;
class Slideshow extends Component<
  Props,
  { currentSlide: number; effect: Effect; slides: JSX.Element[] | string[] }
> {
  private static defaultProps = {
    showIndex: false,
    showArrows: true,
    autoplay: true,
    enableKeyboard: true,
    useDotIndex: false,
    slideInterval: 2000,
    defaultIndex: 0,
    effect: 'fade',
    slides: [] as string[],
    height: '100%',
    width: '100%',
  };

  constructor(
    props: Props & typeof Slideshow.defaultProps & { children?: JSX.Element[] },
  ) {
    super(props);
    this.state = {
      currentSlide: props.defaultIndex,
      effect: props.effect,
      slides: this.props.children
        ? (this.props.children as JSX.Element[])
        : (this.props as PropsSlides).slides,
    };

    this.runSlideShow = this.runSlideShow.bind(this);
    this.autoSlideshow = this.autoSlideshow.bind(this);
    this.restartSlideshow = this.restartSlideshow.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  public componentDidMount() {
    if (this.props.autoplay) {
      this.runSlideShow();
    }

    if (this.props.enableKeyboard) {
      document.addEventListener('keydown', this.handleKeyboard);
    }
  }

  private handleKeyboard(e) {
    e.keyCode === 37
      ? this.decreaseCount()
      : e.keyCode === 39
      ? this.increaseCount()
      : null;
  }

  private runSlideShow() {
    let intervalId = setInterval(this.autoSlideshow, this.props.slideInterval);
    this.setState({
      intervalId,
    });
  }

  public componentWillUnmount() {
    clearInterval(this.state.intervalId);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  private autoSlideshow() {
    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    });
  }

  private restartSlideshow() {
    clearInterval(this.state.intervalId);
    this.runSlideShow();
  }

  private increaseCount() {
    this.state.effect === 'left'
      ? this.setState({
          effect: 'right',
        })
      : this.state.effect === 'bounce-left'
      ? this.setState({
          effect: 'bounce-right',
        })
      : null;

    this.props.autoplay ? this.restartSlideshow() : null;
    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    });
  }

  private decreaseCount() {
    this.state.effect === 'right'
      ? this.setState({
          effect: 'left',
        })
      : this.state.effect === 'bounce-right'
      ? this.setState({
          effect: 'bounce-left',
        })
      : null;

    this.props.autoplay ? this.restartSlideshow() : null;

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
    const { effect, slides } = this.state;

    let slideEffect = effect === undefined ? 'fade' : effect;
    let slideShowSlides;
    let slideShowIndex;

    if (!this.props.children) {
      slideShowSlides = (this.props as PropsSlides).slides.map((slide, i) => {
        return (
          <li
            className={`slide ${effect} ${
              this.state.currentSlide === i ? 'showing-' + slideEffect : ''
            }`}
            key={i}
            style={{ backgroundImage: `url(${slide})` }}
          />
        );
      });
    } else {
      slideShowSlides = (this.props.children as JSX.Element[]).map(
        (slide, i) => {
          return (
            <li
              className={`slide ${effect} ${
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

    return (
      <div
        style={{
          position: 'absolute',
          height: this.props.height || '100%',
          width: this.props.width || '100%',
        }}
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
