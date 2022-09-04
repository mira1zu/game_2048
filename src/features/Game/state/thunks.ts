import { AppThunk } from '../../../app/store';
import { createRandomCell } from '../../Board/state/thunks';

export const initGame = (): AppThunk => (dispatch) => {
  dispatch(createRandomCell());
  dispatch(createRandomCell());
};
