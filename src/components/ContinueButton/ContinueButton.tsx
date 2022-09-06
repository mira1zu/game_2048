import React from 'react';
import Button from '../../common/Button';
import { useAppDispatch } from '../../app/hooks';
import { gameContinued } from '../../features/Game/state/gameSlice';

const ContinueButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(gameContinued());
  };

  return (
    <Button onClick={handleClick}>
      Continue game
    </Button>
  );
};

export default ContinueButton;
