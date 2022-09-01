import Coords from './Coords';

interface CellType {
  id: number;
  value: number;
  merged: boolean;
  position: Coords;
}

export default CellType;
