import {
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import gameReducer from '../features/Game/state/gameSlice';
import scoreReducer from '../features/Score/scoreSlice';
import boardReducer from '../features/Board/state/boardSlice';

const store = configureStore({
  reducer: {
    game: gameReducer, // CHECK NOTION FOR DETAILS
    score: scoreReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
AnyAction>;

export default store;
