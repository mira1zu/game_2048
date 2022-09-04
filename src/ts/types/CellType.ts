import Coords from './Coords';

interface CellType {
  id: string;
  position: Coords;
  value: number;
  isMerged: boolean;
  isNew: boolean;
}

export default CellType;
