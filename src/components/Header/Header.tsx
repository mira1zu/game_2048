import React from 'react';

import './Header.scss';

function Header() {
  return (
    <div className="GameHeader">
      <h1>2048</h1>
      <div className="Controls">
        <p className="Info">
          Score:
          {' '}
          <span className="GameScore">0</span>
        </p>
        <button type="button" className="Button Start">Start</button>
      </div>
    </div>
  );
}

export default Header;
