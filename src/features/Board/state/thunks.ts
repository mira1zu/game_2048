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

export const move = (shift: Direction): AppThunk => (dispatch, getState) => {
  if (selectIfGameOver(getState())) {
    return;
  }

  let board = selectBoard(getState());
  const direction = getDirection(shift);
  const traversal = getTraversal(shift);

  let moved = false;
  console.log(board);

  traversal.x.forEach((x) => {
    traversal.y.forEach((y) => {
      const position = { x, y };
      const cell = getCell(board, position);

      if (!cell) {
        return;
      }

      console.log('================');
      console.log('position clear', { x, y });

      const {
        farthest,
        next,
      } = findFarthest(board, direction, cell.position);

      const nextCell = getCell(board, next);

      console.log('position', position);
      console.log('cell', cell);
      console.log('farthest', farthest);
      console.log('next', next);
      console.log('nextCell', nextCell);

      if (nextCell && nextCell.value === cell.value && !nextCell.isMerged) {
        console.log('merge');
        // start moving cell, update board immediately
        // after animation - merge
        // move cell and when the animation ends - merge them
        // update board immediately with end vals

        // const mergedCell = newCell(nextCell.value * 2, next);

        // dispatch(moveCell(cell, next));

        // setTimeout(() => {
        //   dispatch(removeCellFromCells(cell));
        // }, constants.shiftAnimationLength);

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
          // animation should be timeouted, board update - immediate
        }, constants.shiftAnimationLength);

        // dispatch(delayedMergeCell(cell, nextCell));
        // dispatch(delayedAddScore(cell.value * 2));

        // dispatch(addCell(mergedCell));
        // dispatch(removeCell(cell));
        //
        // dispatch(moveCell({
        //   ...cell,
        //   position: next,
        // }));
      } else if (farthest.x !== x || farthest.y !== y) {
        console.log('moved to farthest');
        dispatch(moveCell({ cell, newPosition: farthest }));
      } else {
        dispatch(resetCellStatus(cell));
      }

      board = selectBoard(getState());

      if (cellMoved(board, position, cell)) {
        moved = true;
      }

      console.log(board);
      console.log('================');
    });
  });

  if (moved) {
    setTimeout(() => {
      dispatch(createRandomCell());

      board = selectBoard(getState());

      if (getEmptyPositions(board).length === 0 && !isMovesLeft(board)) {
        dispatch(setGameLost());
      }
    }, constants.shiftAnimationLength * 1.25);
  }
};
