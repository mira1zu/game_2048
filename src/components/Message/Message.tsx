import React from 'react';

import './Message.scss';

function Message() {
  return (
    <div className="message-container">
      <p className="message message-lose hidden">
        You lose! Restart the game?
      </p>
      <p className="message message-win hidden">
        Winner! Congrats! You did it!
      </p>
      <p className="message message-start">
        Press &quot;Start&quot; to begin game. Good luck!
      </p>
    </div>
  );
}

export default Message;
