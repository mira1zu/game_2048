import React from 'react';

import Button from '../../common/Button';

import { useAppDispatch } from '../../app/hooks';
import { restartGame } from '../../app/actions';
import { initGame } from '../../features/Game/state/thunks';

type Props = {
  children: React.ReactNode;
};

const RestartButton: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(restartGame());
    dispatch(initGame());
  };

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default RestartButton;
