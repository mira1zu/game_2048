import React, { useEffect } from 'react';

import Header from '../../components/Header';
import Field from '../Board';
import Message from '../../components/Message';
import { useAppDispatch } from '../../app/hooks';
import { initGame } from './state/thunks';

let init = false;

const Game = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(initGame());
      init = true;
    }
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
