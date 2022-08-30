import React from 'react';
import classNames from 'classnames';

import './Message.scss';

import { selectGame } from '../../features/Game/gameSlice';
import { useAppSelector } from '../../app/hooks';
import GameState from '../../enum/GameState';
import NewGameButton from '../NewGameButton';

const Message = () => {
  const { gameState } = useAppSelector(selectGame);
  const gameWon = gameState === GameState.Won;
  const gameLost = gameState === GameState.Lost;
  const gameOver = true;

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
