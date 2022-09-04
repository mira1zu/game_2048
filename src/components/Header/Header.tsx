import React, { useEffect } from 'react';

import './Header.scss';

import RestartButton from '../RestartButton';
import Score from '../../features/Score';
import { useAppSelector } from '../../app/hooks';
import { selectDiff, selectScore } from '../../features/Score/scoreSlice';
import useLocalStorage from '../../utils/useLocalStorage';

const Header = () => {
  const score = useAppSelector(selectScore);
  const diff = useAppSelector(selectDiff);

  const [bestScore, setBestScore] = useLocalStorage('bestScore', 0);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  return (
    <div className="Header">
      <div className="Header-Heading">
        <h1 className="Header-Name">2048</h1>

        <div className="Header-Info">
          <Score title="Score" score={score} diff={diff} />
          <Score title="Best" score={bestScore} />
        </div>
      </div>

      <div className="Header-Controls">
        <RestartButton>
          New game
        </RestartButton>
      </div>
    </div>
  );
};

export default React.memo(Header);
