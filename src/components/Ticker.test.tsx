import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedTicker as Ticker } from './Ticker';
import { render, wait } from 'react-testing-library';
import { resizeWindow } from '../testing/utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ticker items={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Ticker interactions', () => {
  it('displays the text', () => {
    const { container } = render(<Ticker items={['one', 'two', 'three']} />);
    expect(container.textContent).toMatch('onetwothree');
  });

  it('sets the animation duration', async () => {
    // not sure of a better way to test that animation is happening without a real browser.
    const { getByText } = render(<Ticker items={['one', 'two', 'three']} />);
    const { style } = getByText('one').parentElement!;
    await wait(() => style.animationDuration !== '');
    expect(style.animationDuration).toMatch('s');
  });

  describe.skip('size-based calculations', () => {
    // needs actual browser testing becuase jsdom does not actually render this stuff.
    it('the animation duration changes with the number of items', async () => {
      const { getByText, rerender } = render(
        <Ticker items={['one', 'two', 'three']} />,
      );
      const { style } = getByText('one').parentElement!;
      await wait(() => style.animationDuration !== '');

      const firstDuration = parseFloat(style.animationDuration);

      rerender(<Ticker items={['one']} />);

      await wait(() =>
        expect(parseFloat(style.animationDuration)).toBeLessThan(firstDuration),
      );
    });

    it('the animation duration changes with the number of characters', async () => {
      const { getByText, rerender } = render(
        <Ticker items={['one', 'two', 'three']} />,
      );
      const { style } = getByText('one').parentElement!;
      await wait(() => style.animationDuration !== '');

      const firstDuration = parseFloat(style.animationDuration);

      rerender(<Ticker items={['one', 'two', 'three and four']} />);

      await wait(() =>
        expect(parseFloat(style.animationDuration)).toBeGreaterThan(
          firstDuration,
        ),
      );
    });

    it('the animation duration changes when the container size changes', async () => {
      const { getByText } = render(<Ticker items={['one', 'two', 'three']} />);
      const { style } = getByText('one').parentElement!;
      await wait(() => style.animationDuration !== '');

      const firstDuration = parseFloat(style.animationDuration);

      resizeWindow(500, 768);

      await wait(() =>
        expect(parseFloat(style.animationDuration)).toBeGreaterThan(
          firstDuration,
        ),
      );
    });
  });
});
