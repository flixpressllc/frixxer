import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Counter />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Couter interactions', () => {
  let el: HTMLDivElement;
  let component: React.Component;
  beforeEach(() => {
    el = document.createElement('div');
    component = ReactDOM.render(<Counter />, el) as React.Component;
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(el);
  });

  it('counts up', () => {
    // component.
  });
});
