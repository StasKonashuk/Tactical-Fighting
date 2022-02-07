import { ReactElement } from 'react';
import classNames from 'classnames';
import { team, Team } from '../../types/types';
import style from './GameOver.module.css';

interface GameOverPropsType {
  currentTeam: team;
  handleNewGame: () => void;
}

export const GameOver = ({
  currentTeam,
  handleNewGame,
}: GameOverPropsType): ReactElement => {
  return (
    <div className={style.gameOverContainer}>
      <span>Game Over</span>
      <span>
        The winner is{' '}
        <span
          className={classNames({
            [style.bottomTeam]: currentTeam === Team.bottomTeam,
            [style.topTeam]: currentTeam === Team.topTeam,
          })}
        >
          {currentTeam === Team.bottomTeam ? 'Bottom team' : 'Top team'}
        </span>
      </span>
      <button type="button" onClick={() => handleNewGame()}>
        New game
      </button>
    </div>
  );
};
