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

const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  const cells = useAppSelector(selectCells);

  const throttledMove = useCallback(_.throttle(
    (event: KeyboardEvent) => {
      dispatch(move(event.code as Direction));
    },
    constants.shiftAnimationLength,
  ), []);

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.code.startsWith('Arrow')) {
      throttledMove(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener);

    return () => {
      document.removeEventListener('keydown', keyboardListener);
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
