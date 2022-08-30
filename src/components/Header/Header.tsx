import React from 'react';

import './Header.scss';
import NewGameButton from '../NewGameButton';

const Header = () => (
  <div className="Header">
    <h1 className="Header-Name">2048</h1>
    <div className="Header-Controls">
      <p className="Header-Info">
        Score
        {' '}
        <span className="Header-Score">0</span>
      </p>

      <NewGameButton>
        New game
      </NewGameButton>
    </div>
  </div>
);

export default Header;
