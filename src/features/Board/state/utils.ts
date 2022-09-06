import { nanoid } from '@reduxjs/toolkit';

import CellType from '../../../ts/types/CellType';
import BoardType from '../../../ts/types/BoardType';
import Coords from '../../../ts/types/Coords';
import Direction from '../../../ts/enums/Direction';

import * as constants from '../../../utils/constants';
import Traversal from '../../../ts/types/Traversal';

export function initializeBoard() {
  const board: BoardType = [];
  const line = [];

  for (let i = 0; i < constants.boardSize; i += 1) {
    line.push(null);
  }

  for (let i = 0; i < constants.boardSize; i += 1) {
    board.push([...line]);
  }

  return board;
}

export function newCell(value: number, position: Coords): CellType {
  return {
    id: nanoid(),
    value,
    position,
    isMerged: false,
    isNew: true,
  };
}

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

function moveCell(cellPosition: Coords, direction: Coords) {
  return {
    x: cellPosition.x + direction.x,
    y: cellPosition.y + direction.y,
  };
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
    nextCellPosition = moveCell(nextCellPosition, direction);
  } while (withinBorders(nextCellPosition) && cellAvailable(
    board,
    nextCellPosition,
  ));

  return {
    farthest: previousCellPosition,
    next: nextCellPosition,
  };
}

export function getDirection(direction: Direction): Coords {
  const map = {
    [Direction.Left]: {
      x: -1,
      y: 0,
    },
    [Direction.Up]: {
      x: 0,
      y: -1,
    },
    [Direction.Right]: {
      x: 1,
      y: 0,
    },
    [Direction.Down]: {
      x: 0,
      y: 1,
    },
  };

  return map[direction];
}

export function getTraversal(shift: Direction) {
  const traversal: Traversal = {
    x: [],
    y: [],
  };

  for (let i = 0; i < constants.boardSize; i += 1) {
    traversal.x.push(i);
    traversal.y.push(i);
  }

  if (shift === Direction.Right) {
    traversal.x.reverse();
  }

  if (shift === Direction.Down) {
    traversal.y.reverse();
  }

  return traversal;
}

export function getEmptyPositions(board: BoardType) {
  const emptyPositions: Coords[] = [];

  for (let x = 0; x < board.length; x += 1) {
    for (let y = 0; y < board[x].length; y += 1) {
      const cell = board[x][y];

      if (!cell) {
        emptyPositions.push({ x, y });
      }
    }
  }

  return emptyPositions;
}

export function getRandomValueAndPosition(board: BoardType) {
  const positions = getEmptyPositions(board);

  const randomValue = Math.random();
  const randomPosition = Math.floor(Math.random() * positions.length);

  return {
    value: randomValue <= 0.1 ? 4 : 2,
    position: positions[randomPosition],
  };
}

export function cellMoved(
  board: BoardType,
  initPosition: Coords,
  cell: CellType,
) {
  const checkCell = getCell(board, initPosition);

  return !checkCell || checkCell.id !== cell.id;
}

export function isMovesLeft(board: BoardType) {
  for (let x = 0; x < board.length; x += 1) {
    for (let y = 0; y < board[x].length; y += 1) {
      const cell = getCell(board, { x, y });

      if (cell) {
        const directions = Object.values(Direction);

        for (let i = 0; i < directions.length; i += 1) {
          const direction = getDirection(directions[i]);
          const position = { x, y };
          const surroundingCellPosition = moveCell(position, direction);

          const surroundingCell = getCell(board, surroundingCellPosition);

          if (surroundingCell && surroundingCell.value === cell.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

export const createRandomCell = (board: BoardType) => {
  const { value, position } = getRandomValueAndPosition(board);

  return newCell(value, position);
};
