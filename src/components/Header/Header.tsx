import React from 'react';

import './Header.scss';
import NewGameButton from '../NewGameButton';
import { useAppSelector } from '../../app/hooks';
import { selectDiff, selectScore } from './scoreSlice';

const Header = () => {
  const score = useAppSelector(selectScore);
  const diff = useAppSelector(selectDiff);

  return (
    <div className="Header">
      <h1 className="Header-Name">2048</h1>
      <div className="Header-Controls">
        <p className="Header-Info">
          Score
          {' '}
          <div className="Header-Score">
            {score}
            <span
              key={Math.random()}
              className="Header-DiffScore"
            >
              {`+${diff}`}
            </span>
          </div>
        </p>

        <NewGameButton>
          New game
        </NewGameButton>
      </div>
    </div>
  );
};

export default Header;
