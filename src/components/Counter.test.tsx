import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import { render, fireEvent } from 'react-testing-library';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Counter />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Couter interactions', () => {
  it('counts up', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('The count is', { exact: false }).textContent).toMatch(
      '0',
    );
    fireEvent.click(getByText('Increment'));
    expect(getByText('The count is', { exact: false }).textContent).toMatch(
      '1',
    );
  });
});
