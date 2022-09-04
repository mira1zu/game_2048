import React from 'react';

import './Score.scss';

type Props = {
  title: string;
  score: number;
  diff?: number;
};

const Score: React.FC<Props> = ({
  title,
  score,
  diff,
}) => (
  <div className="Score">
    <div className="Score-Title">
      {title}
    </div>

    <div className="Score-Stat">
      {score}

      {!!diff && (
        <span
          key={Math.random()}
          className="Score-StatDiff"
        >
          {`+${diff}`}
        </span>
      )}
    </div>
  </div>
);

Score.defaultProps = {
  diff: undefined,
};

export default React.memo(Score);
