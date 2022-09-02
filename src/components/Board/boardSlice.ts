import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardType } from '../../features/Cell/state/utils';
import CellType from '../../types/CellType';
import type { RootState } from '../../app/store';
import { restartGame } from '../../app/actions';
import Coords from '../../types/Coords';

export interface BoardState {
  board: BoardType;
}

const initialBoard: BoardType = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const initialState: BoardState = {
  board: initialBoard,
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
      state.board = initialBoard;
    });
  },
});

export const { insertCell, removeCell } = boardSlice.actions;

export const selectBoard = (state: RootState) => (
  state.board.board
);

export const selectIfCellAvailable = (state: RootState) => (
  (position: Coords) => {
    const board = selectBoard(state);

    return board[position.x][position.y] === null;
  }
);

export const selectBoardCell = (state: RootState) => (position: Coords) => {
  const board = selectBoard(state);

  if (selectIfCellAvailable(state)) {
    return board[position.x][position.y];
  }

  return null;
};

export default boardSlice.reducer;
