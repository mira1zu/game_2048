import {
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import gameReducer from '../features/Game/gameSlice';
import cellReducer from '../features/Cell/state/cellSlice';
import scoreReducer from '../components/Header/scoreSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    cell: cellReducer, // CHECK NOTION FOR DETAILS
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
AnyAction>;

export default store;