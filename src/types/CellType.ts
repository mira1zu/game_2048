import Coords from './Coords';

interface CellType {
  id: number;
  position: Coords;
  value: number;
  isMerged: boolean;
  isNew: boolean;
}

export type Cells = {
  [key: string]: CellType,
};

export default CellType;
