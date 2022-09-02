import { nanoid } from '@reduxjs/toolkit';

import CellType from '../../../types/CellType';
import Coords from '../../../types/Coords';

export function newCell(value: number, position: Coords): CellType {
  return {
    id: nanoid(),
    value,
    position,
    isMerged: false,
    isNew: true,
  };
}
