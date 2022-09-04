import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../app/store';
import { restartGame } from '../../../app/actions';

import { initializeBoard } from './utils';

import CellType from '../../../ts/types/CellType';
import BoardType from '../../../ts/types/BoardType';
import Coords from '../../../ts/types/Coords';

type CellsType = {
  [key: string]: CellType;
};

export interface BoardState {
  board: BoardType;
  cells: CellsType;
}

const initialState: BoardState = {
  board: initializeBoard(),
  cells: {},
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addCell: (state, action: PayloadAction<CellType>) => {
      const cell = action.payload;
      const { x, y } = cell.position;

      state.cells[cell.id] = cell;
      state.board[x][y] = cell;
    },
    moveCell: (
      state,
      action: PayloadAction<{
        cell: CellType,
        newPosition: Coords
      }>,
    ) => {
      const { cell, newPosition } = action.payload;
      const prevPosition = cell.position;
      const cellWithNewPosition: CellType = {
        ...cell,
        position: newPosition,
      };

      state.cells[cell.id] = cellWithNewPosition;

      state.board[prevPosition.x][prevPosition.y] = null;
      state.board[newPosition.x][newPosition.y] = cellWithNewPosition;
    },
    resetCellStatus: (state, action: PayloadAction<CellType>) => {
      const cell: CellType = {
        ...action.payload,
        isMerged: false,
        isNew: false,
      };

      state.cells[cell.id] = cell;
      state.board[cell.position.x][cell.position.y] = cell;
    },
    mergeCellsAtBoard: (
      state,
      action: PayloadAction<{
        prev: CellType,
        next: CellType,
        mergeCell: CellType
      }>,
    ) => {
      const { prev, next, mergeCell } = action.payload;

      state.board[prev.position.x][prev.position.y] = null;
      state.board[next.position.x][next.position.y] = null;

      state.board[mergeCell.position.x][mergeCell.position.y] = mergeCell;
    },
    mergeCells: (
      state,
      action: PayloadAction<{
        prev: CellType,
        next: CellType,
        mergeCell: CellType
      }>,
    ) => {
      const { prev, next, mergeCell } = action.payload;

      delete state.cells[prev.id];
      delete state.cells[next.id];

      state.cells[mergeCell.id] = mergeCell;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.cells = {};
      state.board = initializeBoard();
    });
  },
});

export const {
  addCell,
  moveCell,
  resetCellStatus,
  mergeCellsAtBoard,
  mergeCells,
} = boardSlice.actions;

export const selectBoard = (state: RootState) => (
  state.board.board
);

export const selectCells = (state: RootState) => (
  state.board.cells
);

export default boardSlice.reducer;
