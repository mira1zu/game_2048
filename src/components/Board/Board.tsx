import React, { useEffect } from 'react';
// import _ from 'lodash';

import './Board.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  move,
  selectCells,
} from '../../features/Cell/state/cellSlice';
import Grid from '../Grid';
import Cell from '../../features/Cell';
import Shift from '../../enum/Shift';

// function generateRandom(cells: Cell[]): Cell[] {
//   if (cells.length === 16) {
//     return cells;
//   }
//
//   let maxId = 1;
//
//   const grid = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//   ];
//
//   cells.forEach((cell) => {
//     grid[cell.y - 1][cell.x - 1] = 1;
//
//     if (cell.id > maxId) {
//       maxId = cell.id;
//     }
//   });
//
//   console.log(grid);
//
//   while (true) {
//     const x = Math.floor(Math.random() * 5);
//     const y = Math.floor(Math.random() * 5);
//
//     if (!grid[x][y]) {
//       return [
//         ...cells, {
//           id: maxId + 1,
//           value: 2,
//           x,
//           y,
//         },
//       ];
//     }
//   }
// }

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
  }, [cells]);

  return (
    <div className="Field">
      <Grid />

      <div className="Cells-Container">
        {Object.values(cells)
          .map((cell) => (
            <Cell
              key={cell.id}
              coords={cell.position}
              value={cell.value}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(Board);
