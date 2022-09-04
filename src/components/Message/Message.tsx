import React from 'react';
import classNames from 'classnames';

import './Message.scss';

import RestartButton from '../RestartButton';

import { useAppSelector } from '../../app/hooks';
import {
  selectIfGameOver,
  selectIfGameLost,
  selectIfGameWon,
} from '../../features/Game/state/gameSlice';
import ContinueButton from '../ContinueButton';

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
        <>
          <p className="Message">
            You win!
          </p>

          <div className="Message-Controls">
            <ContinueButton />

            <RestartButton>
              Play again
            </RestartButton>
          </div>
        </>
      )}

      {gameLost && (
        <>
          <p className="Message">
            You lost
          </p>

          <div className="Message-Controls">
            <RestartButton>
              Try again
            </RestartButton>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Message);
