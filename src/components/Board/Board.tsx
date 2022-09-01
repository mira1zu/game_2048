import React, { useEffect } from 'react';

import './Board.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  move, selectCells,
} from '../../features/Cell/state/cellSlice';
import Grid from '../Grid';
import Cell from '../../features/Cell';
import Shift from '../../enum/Shift';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  const cells = useAppSelector(selectCells);

  const keyboardListener = (event: KeyboardEvent) => {
    if (event.code.startsWith('Arrow')) {
      dispatch(move(event.code as Shift));
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
