import React, { useEffect } from 'react';

import Header from '../../components/Header';
import Field from '../../components/Board';
import Message from '../../components/Message';
import { useAppDispatch } from '../../app/hooks';
import { addRandomCell } from '../Cell/state/cellSlice';

const Game = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addRandomCell());
  }, []);

  return (
    <div className="Game">
      <Header />
      <div className="Game-Container">
        <Field />
        <Message />
      </div>
    </div>
  );
};

export default Game;
