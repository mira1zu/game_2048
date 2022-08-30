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

  const flatCells = useAppSelector((state) => {
    const cells = selectBoard(state);

    return _.flatten(cells);
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
    <div className="Field-Container">
      <div className="Field">
        <div className="FieldColumn">
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
        </div>

        <div className="FieldColumn">
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
        </div>

        <div className="FieldColumn">
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
        </div>

        <div className="FieldColumn">
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
          <div className="FieldCell" />
        </div>
      </div>

      <div className="Cells">
        {flatCells.map((cell, index) => {
          if (!cell) {
            return null;
          }

          const x = Math.floor(index / 4);
          const y = index % 4;

          return (
            <div
              key={cell.id}
              className={`FieldCell FieldCell_${cell.value} FieldCell_${x
              + 1}_${y + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Field);
