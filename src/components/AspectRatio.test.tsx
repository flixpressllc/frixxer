import React from 'react';
import ReactDOM from 'react-dom';
import AspectRatio from './AspectRatio';
import { render } from 'react-testing-library';

function ancestorCss(el: HTMLElement | null, classes: string[] = []): string[] {
  if (!el) {
    return classes;
  } else {
    return ancestorCss(el.parentElement, classes.concat(el.className));
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AspectRatio ratio="4:3">Hi</AspectRatio>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('creates a div with the appropriate padding', () => {
  const { getByText, rerender } = render(
    <AspectRatio ratio="16:9">Things</AspectRatio>,
  );

  const ratioDiv = getByText('Things').parentElement;
  expect(ratioDiv).toHaveStyle('padding-bottom: 56.25%');

  rerender(<AspectRatio ratio="4:3">Things</AspectRatio>);
  expect(ratioDiv).toHaveStyle('padding-bottom: 75%');
});

it('allows direct className association', () => {
  const { getByText } = render(
    <AspectRatio ratio="16:9" className="bg-grey">
      Things
    </AspectRatio>,
  );

  const ascendingClasses = ancestorCss(getByText('Things'));
  expect(ascendingClasses).toContain('bg-grey');
});
