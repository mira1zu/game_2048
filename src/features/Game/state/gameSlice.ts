import { createSlice } from '@reduxjs/toolkit';
import GameState from '../../../enum/GameState';
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
    setGameWon: (state) => {
      state.gameState = GameState.Won;
    },
    setGameLost: (state) => {
      state.gameState = GameState.Lost;
    },
    setGameContinue: (state) => {
      state.gameState = GameState.Playing;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.gameState = GameState.Playing;
    });
  },
});

export const { setGameWon, setGameLost, setGameContinue } = gameSlice.actions;

export const selectIfGameWon = (state: RootState) => (
  state.game.gameState === GameState.Won
);

export const selectIfGameLost = (state: RootState) => (
  state.game.gameState === GameState.Lost
);

export const selectIfGameOver = (state: RootState) => (
  selectIfGameWon(state) || selectIfGameLost(state)
);

export default gameSlice.reducer;
