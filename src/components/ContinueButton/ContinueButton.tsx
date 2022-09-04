import React from 'react';
import Button from '../../common/Button';
import { useAppDispatch } from '../../app/hooks';
import { setGameContinue } from '../../features/Game/state/gameSlice';

const ContinueButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setGameContinue());
  };

  return (
    <Button onClick={handleClick}>
      Continue game
    </Button>
  );
};

export default ContinueButton;
