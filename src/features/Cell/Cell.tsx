import React from 'react';

import './Cell.scss';

type Props = {
  value: number;
  coords: { x: number, y: number },
};

const Cell: React.FC<Props> = ({
  value,
  coords,
}) => (
  <div
    className={`Cell Cell_${value} Cell_${coords.x + 1}_${coords.y + 1}`}
  />
);

export default Cell;
