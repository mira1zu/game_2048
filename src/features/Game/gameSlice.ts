import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GameState from '../../enum/GameState';
import type { AppThunk, RootState } from '../../app/store';
import { restartGame } from '../../app/actions';
import { addRandomCell } from '../Cell/state/cellSlice';

export interface AppState {
  gameState: GameState;
}

const initialState: AppState = {
  gameState: GameState.Playing,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.gameState = GameState.Playing;
    });
  },
});

export const { setGameState } = gameSlice.actions;

export const selectGame = (state: RootState) => (
  state.game
);

export const initGame = (): AppThunk => (dispatch) => {
  dispatch(addRandomCell());
  dispatch(addRandomCell());
};

export default gameSlice.reducer;
