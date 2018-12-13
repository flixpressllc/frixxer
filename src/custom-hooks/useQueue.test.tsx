import React from 'react';
import ReactDOM from 'react-dom';
import { useQueue } from './useQueue';
import { render, fireEvent } from 'react-testing-library';

describe('useQueue', () => {
  // tslint:disable-next-line
  const BaseBall = ({ hitters }: { hitters: string[] }) => {
    const [advanceOrStrikeOut, ...allHitters] = useQueue(hitters);
    const [atBat, onDeck, inTheHole] = allHitters;
    return (
      <div>
        <div id="allHitters"> {allHitters} </div>
        <div id="atBat">{atBat}</div>
        <div id="onDeck">{onDeck}</div>
        <div id="inTheHole">{inTheHole}</div>
        <button onClick={advanceOrStrikeOut}>Home Run</button>
      </div>
    );
  };
  it('Works on initial render', () => {
    const { container } = render(
      <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
    );

    expect(container.querySelector('#allHitters')!.textContent!.trim()).toEqual(
      'RuthRobinsonJacksonGehrig',
    );
    expect(container.querySelector('#atBat')!.textContent).toEqual('Ruth');
    expect(container.querySelector('#onDeck')!.textContent).toEqual('Robinson');
    expect(container.querySelector('#inTheHole')!.textContent).toEqual(
      'Jackson',
    );
  });

  it('Does not append the same values on rerender with same list', () => {
    const { container, rerender } = render(
      <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
    );

    rerender(<BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />);

    expect(container.querySelector('#allHitters')!.textContent!.trim()).toEqual(
      'RuthRobinsonJacksonGehrig',
    );
  });

  it('Does not remove values on rerender without list', () => {
    const { container, rerender } = render(
      <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
    );

    rerender(<BaseBall hitters={[]} />);

    expect(container.querySelector('#allHitters')!.textContent!.trim()).toEqual(
      'RuthRobinsonJacksonGehrig',
    );
  });

  it('Appends values on rerender with new list', () => {
    const { container, rerender } = render(
      <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
    );

    rerender(<BaseBall hitters={['Banks', 'Clemente', 'Robinson']} />);

    expect(container.querySelector('#allHitters')!.textContent!.trim()).toEqual(
      'RuthRobinsonJacksonGehrigBanksClementeRobinson',
    );
  });

  describe('advancing', () => {
    it('removes an item from the front of the list', () => {
      const { container, rerender, getByText } = render(
        <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
      );

      getByText('Home Run').click();

      rerender(
        <BaseBall hitters={['Ruth', 'Robinson', 'Jackson', 'Gehrig']} />,
      );

      expect(
        container.querySelector('#allHitters')!.textContent!.trim(),
      ).toEqual('RobinsonJacksonGehrig');
      expect(container.querySelector('#atBat')!.textContent).toEqual(
        'Robinson',
      );
      expect(container.querySelector('#onDeck')!.textContent).toEqual(
        'Jackson',
      );
      expect(container.querySelector('#inTheHole')!.textContent).toEqual(
        'Gehrig',
      );
    });
  });
});
