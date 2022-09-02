import Coords, { Traversal } from '../../../types/Coords';
import * as constants from '../../../utils/constants';
import Shift from '../../../enum/Shift';
import CellType, { Cells } from '../../../types/CellType';

export type BoardType = (CellType | null)[][];

export function withinBorders(coords: Coords) {
  return (
    coords.x >= 0 && coords.x < constants.boardSize
  ) && (
    coords.y >= 0 && coords.y < constants.boardSize
  );
}

export function cellAvailable(board: BoardType, coords: Coords) {
  return board[coords.x][coords.y] === null;
}

export function getCell(board: BoardType, coords: Coords) {
  if (withinBorders(coords)) {
    return board[coords.x][coords.y];
  }

  return null;
}

export function findFarthest(
  board: BoardType,
  direction: Coords,
  cellPosition: Coords,
) {
  let nextCellPosition = { ...cellPosition };
  let previousCellPosition;

  do {
    previousCellPosition = { ...nextCellPosition };
    nextCellPosition = {
      x: nextCellPosition.x + direction.x,
      y: nextCellPosition.y + direction.y,
    };
  } while (withinBorders(nextCellPosition) && cellAvailable(
    board,
    nextCellPosition,
  ));

  return {
    farthest: previousCellPosition,
    next: nextCellPosition,
  };
}

export function calculateBoard(cells: Cells) { // !
  const board: BoardType = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  Object.keys(cells)
    .forEach((id) => {
      const cell = cells[id];

      board[cell.position.x][cell.position.y] = cell;
    });

  return board;
}

export function getDirection(shift: Shift): Coords {
  const map = {
    [Shift.Left]: {
      x: -1,
      y: 0,
    },
    [Shift.Up]: {
      x: 0,
      y: -1,
    },
    [Shift.Right]: {
      x: 1,
      y: 0,
    },
    [Shift.Down]: {
      x: 0,
      y: 1,
    },
  };

  return map[shift];
}

export function getTraversal(shift: Shift) {
  const traversal: Traversal = {
    x: [],
    y: [],
  };

  for (let i = 0; i < constants.boardSize; i += 1) {
    traversal.x.push(i);
    traversal.y.push(i);
  }

  if (shift === Shift.Right) {
    traversal.x.reverse();
  }

  if (shift === Shift.Down) {
    traversal.y.reverse();
  }

  return traversal;
}

export function getEmptyPositions(cells: Cells) {
  const board = calculateBoard(cells);
  const emptyPositions: Coords[] = [];

  for (let x = 0; x < board.length; x += 1) {
    for (let y = 0; y < board.length; y += 1) {
      const cell = board[x][y];

      if (!cell) {
        emptyPositions.push({ x, y });
      }
    }
  }

  return emptyPositions;
}

export function generateRandomCell(cells: Cells) {
  const positions = getEmptyPositions(cells);

  const randomValue = Math.random();
  const randomPosition = Math.floor(Math.random() * positions.length);

  return {
    value: randomValue <= 0.1 ? 4 : 2,
    position: positions[randomPosition],
  };
}
