import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CellType from '../../../types/CellType';
import type { RootState } from '../../../app/store';
import { restartGame } from '../../../app/actions';
import { BoardType } from './utils';
import * as constants from '../../../utils/constants';

export interface BoardState {
  board: BoardType;
}

function initializeBoard() {
  const board: BoardType = [];
  const line = [];

  for (let i = 0; i < constants.boardSize; i += 1) {
    line.push(null);
  }

  for (let i = 0; i < constants.boardSize; i += 1) {
    board.push(line);
  }

  return board;
}

const initialState: BoardState = {
  board: initializeBoard(),
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    insertCell: (
      state,
      action: PayloadAction<CellType>,
    ) => {
      const cell = action.payload;
      const { x, y } = cell.position;

      state.board[x][y] = cell;
    },
    removeCell: (
      state,
      action: PayloadAction<CellType>,
    ) => {
      const { x, y } = action.payload.position;

      state.board[x][y] = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.board = initializeBoard();
    });
  },
});

export const { insertCell, removeCell } = boardSlice.actions;

export const selectBoard = (state: RootState) => (
  state.board.board
);

export default boardSlice.reducer;
