import React from 'react';
import classNames from 'classnames';

import './Message.scss';

import NewGameButton from '../NewGameButton';

import { useAppSelector } from '../../app/hooks';
import {
  selectIfGameOver,
  selectIfGameLost,
  selectIfGameWon,
} from '../../features/Game/state/gameSlice';

const Message = () => {
  const gameWon = useAppSelector(selectIfGameWon);
  const gameLost = useAppSelector(selectIfGameLost);
  const gameOver = useAppSelector(selectIfGameOver);

  if (!gameOver) {
    return null;
  }

  return (
    <div
      className={classNames({
        'Message-Container': true,
        'Message-Container_won': gameWon,
        'Message-Container_lost': gameLost,
      })}
    >
      {gameWon && (
        <p className="Message">
          You win!
        </p>
      )}

      {gameLost && (
        <>
          <p className="Message">
            You lost
          </p>

          <NewGameButton>
            Try again
          </NewGameButton>
        </>
      )}
    </div>
  );
};

export default React.memo(Message);
