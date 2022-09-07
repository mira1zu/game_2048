import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

import './Board.scss';

import Grid from '../../components/Grid';
import Cell from '../../components/Cell';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCells } from './state/boardSlice';
import { move } from './state/thunks';

import Direction from '../../ts/enums/Direction';

import * as constants from '../../utils/constants';
import Coords from '../../ts/types/Coords';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  const cells = useAppSelector(selectCells);

  const throttledMove = useCallback(_.throttle(
    (direction: Direction) => {
      dispatch(move(direction));
    },
    constants.shiftAnimationLength,
  ), []);

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.code.startsWith('Arrow')) {
      throttledMove(event.code as Direction);
    }
  };

  const touchStartCoords: Coords = {
    x: 0,
    y: 0,
  };
  const touchEndCoords: Coords = {
    x: 0,
    y: 0,
  };

  const swipeStartListener = (event: TouchEvent) => {
    const swipe = event.changedTouches.item(0);

    if (!swipe) {
      return;
    }

    touchStartCoords.x = swipe.clientX;
    touchStartCoords.y = swipe.clientY;
  };

  const swipeEndListener = (event: TouchEvent) => {
    const swipe = event.changedTouches.item(0);

    if (!swipe) {
      return;
    }

    touchEndCoords.x = swipe.clientX;
    touchEndCoords.y = swipe.clientY;

    const diffX = touchEndCoords.x - touchStartCoords.x;
    const diffY = touchEndCoords.y - touchStartCoords.y;

    switch (true) {
      case diffX < 0 && Math.abs(diffX) > Math.abs(diffY):
        throttledMove(Direction.Left);
        break;

      case diffX > 0 && Math.abs(diffX) > Math.abs(diffY):
        throttledMove(Direction.Right);
        break;

      case diffY > 0 && Math.abs(diffX) < Math.abs(diffY):
        throttledMove(Direction.Down);
        break;

      case diffY < 0 && Math.abs(diffX) < Math.abs(diffY):
        throttledMove(Direction.Up);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener);
    document.addEventListener('touchstart', swipeStartListener);
    document.addEventListener('touchend', swipeEndListener);

    return () => {
      document.removeEventListener('keydown', keyboardListener);
      document.removeEventListener('touchstart', swipeStartListener);
      document.removeEventListener('touchend', swipeEndListener);
    };
  }, []);

  return (
    <div className="Field">
      <Grid />

      <div className="Cells-Container">
        {Object.values(cells).map((cell) => (
          <Cell
            key={cell.id}
            coords={cell.position}
            value={cell.value}
            isMerged={cell.isMerged}
            isNew={cell.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Board);
