import { AppThunk } from '../../../app/store';

import {
  addCell, mergeCells,
  mergeCellsAtBoard,
  moveCell, resetCellStatus,
  selectBoard,
} from './boardSlice';
import {
  selectIfGameOver,
  setGameLost,
  setGameWon,
} from '../../Game/state/gameSlice';
import { addScore } from '../../Score/scoreSlice';

import {
  cellMoved,
  findFarthest,
  getCell,
  getDirection, getEmptyPositions,
  getRandomValueAndPosition, getTraversal,
  isMovesLeft,
  newCell,
} from './utils';

import * as constants from '../../../utils/constants';

import Direction from '../../../ts/enums/Direction';

export const createRandomCell = (): AppThunk => (
  dispatch,
  getState,
) => {
  const board = selectBoard(getState());
  const { value, position } = getRandomValueAndPosition(board);

  const cell = newCell(value, position);

  dispatch(addCell(cell));
};

export const move = (direction: Direction): AppThunk => (
  dispatch,
  getState,
) => {
  if (selectIfGameOver(getState())) {
    return;
  }

  let board = selectBoard(getState());
  const vector = getDirection(direction);
  const traversal = getTraversal(direction);

  let moved = false;

  traversal.x.forEach((x) => {
    traversal.y.forEach((y) => {
      const position = { x, y };
      const cell = getCell(board, position);

      if (!cell) {
        return;
      }

      const {
        farthest,
        next,
      } = findFarthest(board, vector, cell.position);

      const nextCell = getCell(board, next);

      if (nextCell
        && nextCell.value === cell.value
        && (
          !cell.isMerged || !nextCell.isMerged
        )
      ) {
        const mergeCell = newCell(nextCell.value * 2, next);
        mergeCell.isMerged = true;

        dispatch(moveCell({ cell, newPosition: next }));
        dispatch(mergeCellsAtBoard({ prev: cell, next: nextCell, mergeCell }));

        setTimeout(() => {
          dispatch(mergeCells({ prev: cell, next: nextCell, mergeCell }));
          dispatch(addScore(mergeCell.value));

          if (mergeCell.value === 2048) {
            dispatch(setGameWon());
          }
        }, constants.shiftAnimationLength);
      } else if (farthest.x !== x || farthest.y !== y) {
        dispatch(moveCell({ cell, newPosition: farthest }));
      } else {
        dispatch(resetCellStatus(cell));
      }

      board = selectBoard(getState());

      if (cellMoved(board, position, cell)) {
        moved = true;
      }
    });
  });

  if (moved) {
    setTimeout(() => {
      dispatch(createRandomCell());

      board = selectBoard(getState());

      if (getEmptyPositions(board).length === 0 && !isMovesLeft(board)) {
        dispatch(setGameLost());
      }
    }, constants.shiftAnimationLength);
  }
};
