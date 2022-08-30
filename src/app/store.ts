import {
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import gameReducer from '../features/Game/gameSlice';
import fieldReducer from '../features/Field/fieldSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    field: fieldReducer, // CHECK NOTION FOR DETAILS
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
AnyAction>;

export default store;
