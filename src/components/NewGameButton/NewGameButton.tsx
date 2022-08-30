import React from 'react';

import './NewGameButton.scss';
import { useAppDispatch } from '../../app/hooks';
import { restartGame } from '../../app/actions';

type Props = {
  children: React.ReactNode;
};

const NewGameButton: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="NewGameButton"
      onClick={() => dispatch(restartGame())}
    >
      {children}
    </button>
  );
};

export default NewGameButton;
