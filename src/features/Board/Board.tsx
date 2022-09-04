import React, { useEffect } from 'react';

import './Board.scss';

import Grid from '../../components/Grid';
import Cell from '../../components/Cell';

import { selectCells } from './state/boardSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Direction from '../../ts/enums/Direction';
import { move } from './state/thunks';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  const cells = useAppSelector(selectCells);

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.code.startsWith('Arrow')) {
      dispatch(move(event.code as Direction));
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
