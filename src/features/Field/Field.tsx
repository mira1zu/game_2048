import React, { useEffect } from 'react';
import _ from 'lodash';

import './Field.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  selectBoard,
} from './fieldSlice';
import Grid from '../../components/Grid';
import Cell from '../../components/Cell';
import CellType from '../../types/CellType';

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

const Field: React.FC = () => {
  const dispatch = useAppDispatch();

  const flatCells = useAppSelector((state): CellType[] => {
    const cells = selectBoard(state);

    return _.flatten(cells)
      .filter((cell) => cell !== null)
    // @ts-ignore
      .sort((a, b) => a.id - b.id) as CellType[];
  });

  const keyboardListener = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        dispatch(moveUp());
        break;

      case 'ArrowDown':
        dispatch(moveDown());
        break;

      case 'ArrowLeft':
        dispatch(moveLeft());
        break;

      case 'ArrowRight':
        dispatch(moveRight());
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener);

    return () => {
      document.removeEventListener('keydown', keyboardListener);
    };
  }, [flatCells]);

  console.log(flatCells);

  return (
    <div className="Field">
      <Grid />

      <div className="Cells-Container">
        {flatCells.map((cell) => (
          <Cell
            key={cell.id}
            coords={cell.coords}
            value={cell.value}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Field);
