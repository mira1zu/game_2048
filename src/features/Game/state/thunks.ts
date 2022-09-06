import _ from 'lodash';

import { AppThunk } from '../../../app/store';
import {
  selectBoard,
  selectCells,
  setCellsAndBoard,
} from '../../Board/state/boardSlice';
import { createRandomCell } from '../../Board/state/utils';

export const initGame = (): AppThunk => (dispatch, getState) => {
  const cells = _.cloneDeep(selectCells(getState()));
  const board = _.cloneDeep(selectBoard(getState()));

  for (let i = 0; i < 2; i += 1) {
    const cell = createRandomCell(board);

    cells[cell.id] = cell;
    board[cell.position.x][cell.position.y] = cell;
  }

  dispatch(setCellsAndBoard({ cells, board }));
};
