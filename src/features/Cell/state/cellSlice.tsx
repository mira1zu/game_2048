import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppThunk, RootState } from '../../../app/store';

import {
  calculateBoard,
  findFarthest, generateRandomCell,
  getDirection,
  getTraversal,
} from './utils';

import CellType from '../../../types/CellType';
import Shift from '../../../enum/Shift';
import { animationLength } from '../../../utils/constants';
import Coords from '../../../types/Coords';
import { addScore } from '../../../components/Header/scoreSlice';

export type Cells = {
  [key: string]: CellType,
};

export interface CellState {
  cells: Cells;
  nextId: number;
}

const testCell1: CellType = {
  id: 0,
  value: 64,
  merged: false,
  position: {
    x: 2,
    y: 0,
  },
};

const testCell2: CellType = {
  id: 1,
  value: 32,
  merged: false,
  position: {
    x: 0,
    y: 0,
  },
};

const testCell3: CellType = {
  id: 2,
  value: 64,
  merged: false,
  position: {
    x: 0,
    y: 2,
  },
};

const initialState: CellState = {
  cells: {
    0: testCell1,
    1: testCell2,
    2: testCell3,
  },
  nextId: 3,
};

export const cellSlice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    createCell: (
      state,
      action: PayloadAction<{ value: number, position: Coords }>,
    ) => {
      const { value, position } = action.payload;

      const cell: CellType = {
        id: state.nextId,
        value,
        merged: false,
        position,
      };

      state.nextId += 1;
      state.cells[cell.id] = cell;
    },
    updateCell: (state, action: PayloadAction<CellType>) => {
      const cell = action.payload;

      state.cells[cell.id] = action.payload;
    },
    mergeCell: (
      state,
      action: PayloadAction<{ next: CellType, prev: CellType }>,
    ) => {
      const {
        next,
        prev,
      } = action.payload;

      state.cells[next.id].value *= 2;
      state.cells[next.id].merged = true;
      delete state.cells[prev.id];
    },
  },
});

export const {
  createCell,
  updateCell,
  mergeCell,
} = cellSlice.actions;

export const selectCells = (state: RootState) => (
  state.cell.cells
);

const delayedMergeCell = (cells: {
  prev: CellType,
  next: CellType,
}): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(mergeCell(cells));
    dispatch(addScore(cells.prev.value * 2));
  }, animationLength);
};

export const addRandomCell = (): AppThunk => (dispatch, getState) => {
  const cell = generateRandomCell(selectCells(getState()));

  dispatch(createCell(cell));
};

export const move = (shift: Shift): AppThunk => (dispatch, getState) => {
  const cells = selectCells(getState());
  const direction = getDirection(shift);
  const coords = getTraversal(shift);

  let board = calculateBoard(cells);
  let moved = false;

  coords.x.forEach((x) => {
    coords.y.forEach((y) => {
      const cell = board[x][y];

      if (!cell) {
        return;
      }

      const {
        farthest,
        next,
      } = findFarthest(board, direction, cell.position);

      const nextCell = board[next.x][next.y];

      if (nextCell && cell !== nextCell && nextCell.value === cell.value) {
        dispatch(updateCell({
          ...cell,
          position: next,
        }));

        dispatch(delayedMergeCell({
          prev: cell,
          next: nextCell,
        }));
        moved = true;
      } else if (farthest.x !== cell.position.x
        || farthest.y !== cell.position.y) {
        dispatch(updateCell({
          ...cell,
          position: farthest,
        }));

        moved = true;
      }

      board = calculateBoard(selectCells(getState()));
    });
  });

  if (moved) {
    setTimeout(() => dispatch(addRandomCell()), animationLength);
  }
};

export default cellSlice.reducer;
