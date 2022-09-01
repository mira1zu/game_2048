import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { restartGame } from '../../app/actions';
import type { RootState } from '../../app/store';

export interface ScoreState {
  score: number;
}

const initialState: ScoreState = {
  score: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, (state) => {
      state.score = 0;
    });
  },
});

export const { addScore } = scoreSlice.actions;

export const selectScore = (state: RootState) => (
  state.score.score
);

export default scoreSlice.reducer;
