import _ from 'lodash';

import { AppThunk } from '../../../app/store';

import {
  selectBoard,
  selectCells,
  setCellsAndBoard,
  setMergedCells,
} from './boardSlice';
import {
  selectIsGameOver, gameLost, gameWon, selectIsGameContinued,
} from '../../Game/state/gameSlice';

import {
  cellMoved, createRandomCell,
  findFarthest,
  getCell,
  getDirection, getEmptyPositions,
  getTraversal, isMovesLeft,
  newCell,
} from './utils';

import Direction from '../../../ts/enums/Direction';

import * as constants from '../../../utils/constants';
import CellType from '../../../ts/types/CellType';
import { addScore } from '../../Score/scoreSlice';

export const move = (direction: Direction): AppThunk => (
  dispatch,
  getState,
) => {
  if (selectIsGameOver(getState())) {
    return;
  }

  const newCells = _.cloneDeep(selectCells(getState()));
  const newBoard = _.cloneDeep(selectBoard(getState()));

  const vector = getDirection(direction);
  const traversal = getTraversal(direction);

  const cellsToAdd: CellType[] = [];
  const cellsToRemove: CellType[] = [];

  let moved = false;

  traversal.x.forEach((x) => {
    traversal.y.forEach((y) => {
      const position = { x, y };
      const currCell = getCell(newBoard, position);

      if (!currCell) {
        return;
      }

      const {
        farthest,
        next,
      } = findFarthest(newBoard, vector, currCell.position);

      const nextCell = getCell(newBoard, next);

      if (nextCell && nextCell.value === currCell.value && !nextCell.isMerged) {
        const mergedCell = newCell(nextCell.value * 2, next);
        mergedCell.isMerged = true;

        newBoard[currCell.position.x][currCell.position.y] = null;
        newBoard[nextCell.position.x][nextCell.position.y] = mergedCell;

        newCells[currCell.id] = {
          ...currCell,
          position: next,
        };

        cellsToAdd.push(mergedCell);
        cellsToRemove.push(currCell, nextCell);

        if (!selectIsGameContinued(getState()) && mergedCell.value === 2048) {
          dispatch(gameWon());
        }
      } else {
        const updatedCell = {
          ...currCell,
          position: farthest,
          isNew: false,
          isMerged: false,
        };

        newCells[updatedCell.id] = updatedCell;

        newBoard[currCell.position.x][currCell.position.y] = null;
        newBoard[updatedCell.position.x][updatedCell.position.y] = updatedCell;
      }

      if (cellMoved(newBoard, position, currCell)) {
        moved = true;
      }
    });
  });

  if (moved) {
    const cell = createRandomCell(newBoard);

    newCells[cell.id] = cell;
    newBoard[cell.position.x][cell.position.y] = cell;

    if (getEmptyPositions(newBoard).length === 0 && !isMovesLeft(newBoard)) {
      dispatch(gameLost());
    }
  }

  dispatch(setCellsAndBoard({ cells: newCells, board: newBoard }));

  setTimeout(() => {
    const timeoutNewCells = _.cloneDeep(selectCells(getState()));
    let scoreToAdd = 0;

    cellsToAdd.forEach((cell) => {
      timeoutNewCells[cell.id] = cell;
      scoreToAdd += cell.value;
    });

    cellsToRemove.forEach((cell) => {
      delete timeoutNewCells[cell.id];
    });

    dispatch(setMergedCells(timeoutNewCells));
    dispatch(addScore(scoreToAdd));
  }, constants.shiftAnimationLength);
};
