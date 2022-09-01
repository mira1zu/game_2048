import React from 'react';

import Header from '../../components/Header';
import Field from '../../components/Board';
import Message from '../../components/Message';

const Game = () => (
  <div className="Game">
    <Header />
    <div className="Game-Container">
      <Field />
      <Message />
    </div>
  </div>
);

export default Game;
