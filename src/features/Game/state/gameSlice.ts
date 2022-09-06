import { createSlice } from '@reduxjs/toolkit';
import GameState from '../../../ts/enums/GameState';
import type { RootState } from '../../../app/store';
import { restartGame } from '../../../app/actions';

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
    gameWon: (state) => {
      state.gameState = GameState.Won;
    },
    gameLost: (state) => {
      state.gameState = GameState.Lost;
    },
    gameContinued: (state) => {
      state.gameState = GameState.Continued;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.gameState = GameState.Playing;
    });
  },
});

export const { gameWon, gameLost, gameContinued } = gameSlice.actions;

export const selectIsGameWon = (state: RootState) => (
  state.game.gameState === GameState.Won
);

export const selectIsGameLost = (state: RootState) => (
  state.game.gameState === GameState.Lost
);

export const selectIsGameContinued = (state: RootState) => (
  state.game.gameState === GameState.Continued
);

export const selectIsGameOver = (state: RootState) => (
  selectIsGameWon(state) || selectIsGameLost(state)
);

export default gameSlice.reducer;
