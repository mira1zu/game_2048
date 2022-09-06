import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../app/store';
import { restartGame } from '../../../app/actions';

import { initializeBoard } from './utils';

import CellType from '../../../ts/types/CellType';
import BoardType from '../../../ts/types/BoardType';

export type CellsType = {
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
    setMergedCells: (state, action: PayloadAction<CellsType>) => {
      state.cells = action.payload;
    },
    setCellsAndBoard: (
      state,
      action: PayloadAction<{ cells: CellsType, board: BoardType }>,
    ) => {
      const { cells, board } = action.payload;

      state.cells = cells;
      state.board = board;
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
  setMergedCells,
  setCellsAndBoard,
} = boardSlice.actions;

export const selectBoard = (state: RootState) => (
  state.board.board
);

export const selectCells = (state: RootState) => (
  state.board.cells
);

export default boardSlice.reducer;
