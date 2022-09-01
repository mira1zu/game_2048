import React from 'react';

import './Grid.scss';
import * as constants from '../../utils/constants';

const Grid = () => {
  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const line: JSX.Element[] = [];

    for (let i = 0; i < constants.boardSize; i += 1) {
      line.push(<div key={i} className="GridCell" />);
    }

    for (let i = 0; i < constants.boardSize; i += 1) {
      cells.push(<div key={i} className="GridRow">{line}</div>);
    }

    return cells;
  };

  return (
    <div className="Grid">{renderGrid()}</div>
  );
};
export default Grid;
