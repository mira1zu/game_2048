import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppThunk, RootState } from '../../../app/store';

import {
  calculateBoard,
  findFarthest, generateRandomCell,
  getDirection,
  getTraversal,
} from './utils';

import CellType, { Cells } from '../../../types/CellType';
import Shift from '../../../enum/Shift';
import { animationLength } from '../../../utils/constants';
import Coords from '../../../types/Coords';
import { addScore } from '../../../components/Header/scoreSlice';
import { restartGame } from '../../../app/actions';

export interface CellState {
  cells: Cells;
  nextId: number;
}

const initialState: CellState = {
  cells: {},
  nextId: 0,
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
        position,
        value,
        isMerged: false,
        isNew: true,
      };

      state.nextId += 1;
      state.cells[cell.id] = cell;
    },
    updateCell: (state, action: PayloadAction<CellType>) => {
      const cell = action.payload;

      state.cells[cell.id] = {
        ...action.payload,
        isMerged: false,
        isNew: false,
      };
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
      state.cells[next.id].isMerged = true;
      state.cells[next.id].isNew = false;
      delete state.cells[prev.id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.cells = {};
    });
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

export const addRandomCell = (): AppThunk => (
  dispatch,
  getState,
) => {
  const cells = selectCells(getState());
  const newCell = generateRandomCell(cells);

  dispatch(createCell(newCell));
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

      if (nextCell
        && cell.id
        !== nextCell.id
        && nextCell.value
        === cell.value) {
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
    setTimeout(() => {
      dispatch(addRandomCell());
    }, animationLength * 1.25);
  }
};

export default cellSlice.reducer;
