import Coords from './Coords';

interface CellType {
  id: number;
  value: number;
  merged: boolean;
  coords: Coords;
}

export default CellType;
