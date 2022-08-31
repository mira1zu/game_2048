/* eslint-disable */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import type { AppThunk, RootState } from '../../app/store';

import CellType from '../../types/CellType';
import Coords from '../../types/Coords';

type BoardType = (CellType | null)[][];

export interface FieldState {
  board: BoardType;
}

const testCell1: CellType = {
  id: 1,
  value: 64,
  merged: false,
  coords: {
    x: 3,
    y: 1,
  },
};

const testCell2: CellType = {
  id: 2,
  value: 32,
  merged: false,
  coords: {
    x: 1,
    y: 1,
  },
};

const testCell3: CellType = {
  id: 3,
  value: 16,
  merged: false,
  coords: {
    x: 1,
    y: 3,
  },
};

const initialState: FieldState = {
  board: [
    [null, null, null, null],
    [null, testCell2, null, testCell3],
    [null, null, null, null],
    [null, testCell1, null, null],
  ],
};

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    updateBoard: (state, action: PayloadAction<BoardType>) => {
      state.board = action.payload;
    },
  },
});

export const { updateBoard } = fieldSlice.actions;

export const selectBoard = (state: RootState) => (
  state.field.board
);

function withinBorders(coords: Coords) {
  return (
      coords.x >= 0 && coords.x < 4
    )
    && (
      coords.y >= 0 && coords.y < 4
    );
}

function cellAvailable(board: BoardType, coords: Coords) {
  return board[coords.x][coords.y] === null;
}

function findFarthest(board: BoardType, direction: Coords, coords: Coords) {
  let newCoords = { ...coords };
  let previous;

  do {
    previous = { ...newCoords };
    newCoords =
      {
        x: newCoords.x + direction.x,
        y: newCoords.y + direction.y,
      };
  } while (withinBorders(newCoords) && cellAvailable(board, newCoords));

  return {
    farthest: previous,
    next: newCoords,
  };
}

function calculate(board: BoardType, direction: Coords, coords: Coords) {
  const newBoard = _.cloneDeep(board);

  // @ts-ignore
  coords.x.forEach((x) => {
    // @ts-ignore
    coords.y.forEach((y) => {
      if (!newBoard[x][y]) {
        return;
      }

      const cellCoords = {
        x,
        y,
      };

      const {
        farthest,
        next,
      } = findFarthest(newBoard, direction, cellCoords);

      // console.log(newBoard[x][y], 'current');
      //
      // console.log(farthest, 'where');

      if (newBoard[next.x]
        && newBoard[next.x][next.y]
        // @ts-ignore

        && newBoard[next.x][next.y].value
        // @ts-ignore

        === newBoard[x][y].value) {
        // @ts-ignore
        newBoard[next.x][next.y] = {
          // @ts-ignore

          id: newBoard[next.x][next.y].id,
          // @ts-ignore

          value: newBoard[x][y].value * 2,
          merged: true,
          coords: next,
        }; // tile generator, since we have to keep ids

        newBoard[x][y] = null;
      } else if (farthest.x !== x || farthest.y !== y) {
        // @ts-ignore
        newBoard[farthest.x][farthest.y] =
          {
            ...newBoard[x][y],
            coords: farthest,
          };
        newBoard[x][y] = null;
      }
    });
  });

  return newBoard;
}

export const moveLeft = (): AppThunk => (dispatch, getState) => {
  const board = selectBoard(getState());

  const direction = {
    x: -1,
    y: 0,
  };

  const coords = { // make it resizable
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
  };
  // @ts-ignore

  dispatch(updateBoard(calculate(board, direction, coords)));
};

// @ts-ignore

export const moveRight = (): AppThunk => (dispatch, getState) => {
  const board = selectBoard(getState());

  const direction = {
    x: 1,
    y: 0,
  };

  const coords = {
    x: [3, 2, 1, 0],
    y: [0, 1, 2, 3],
  };
  // @ts-ignore

  dispatch(updateBoard(calculate(board, direction, coords)));
};

// @ts-ignore

export const moveUp = (): AppThunk => (dispatch, getState) => {
  const board = selectBoard(getState());

  const direction = {
    x: 0,
    y: -1,
  };

  const coords = {
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
  };
  // @ts-ignore

  dispatch(updateBoard(calculate(board, direction, coords)));
};

// @ts-ignore
export const moveDown = (): AppThunk => (dispatch, getState) => {
  const board = selectBoard(getState());

  const direction = {
    x: 0,
    y: 1,
  };

  const coords = {
    x: [0, 1, 2, 3],
    y: [3, 2, 1, 0],
  };
  // @ts-ignore

  dispatch(updateBoard(calculate(board, direction, coords)));
};

export default fieldSlice.reducer;
