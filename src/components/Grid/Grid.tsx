import React from 'react';

import './Grid.scss';

const BOARD_SIZE = 4;

const Grid = () => {
  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const line: JSX.Element[] = [];

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      line.push(<div key={i} className="GridCell" />);
    }

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      cells.push(<div key={i} className="GridRow">{line}</div>);
    }

    return cells;
  };

  return (
    <div className="Grid">{renderGrid()}</div>
  );
};
export default Grid;
