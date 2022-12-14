import React from 'react';

import './Cell.scss';
import classNames from 'classnames';
import Coords from '../../ts/types/Coords';

type Props = {
  value: number;
  coords: Coords;
  isMerged: boolean;
  isNew: boolean;
};

const Cell: React.FC<Props> = ({
  value,
  coords,
  isMerged,
  isNew,
}) => {
  const superValue = value <= 2048 ? value : 'super';

  return (
    <div
      className={classNames({
        Cell: true,
        [`Cell_${superValue}`]: true,
        [`Cell_${coords.x + 1}_${coords.y + 1}`]: true,
        Cell_new: isNew,
        Cell_merged: isMerged,
      })}
    >
      {value}
    </div>
  );
};

export default React.memo(Cell);
