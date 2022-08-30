import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GameState from '../../enum/GameState';
import type { RootState } from '../../app/store';
import { restartGame } from '../../app/actions';

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

export default gameSlice.reducer;
