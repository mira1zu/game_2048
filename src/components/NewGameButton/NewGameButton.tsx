import React from 'react';

import './NewGameButton.scss';
import { useAppDispatch } from '../../app/hooks';
import { initGame } from '../../features/Game/state/thunks';
import { restartGame } from '../../app/actions';

type Props = {
  children: React.ReactNode;
};

const NewGameButton: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const onButtonClick = () => {
    dispatch(restartGame());
    dispatch(initGame());
  };

  return (
    <button
      type="button"
      className="NewGameButton"
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

export default NewGameButton;
