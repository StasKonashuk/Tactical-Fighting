import React, { ReactElement } from 'react';
import classNames from 'classnames';
import style from './UnitImage.module.css';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const CentaurImage = ({
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => (
  <div className={style.imgContainer}>
    {gameRound && isOrder && (
      <span className={style.gameRoundValue}>{gameRound}</span>
    )}
    <img
      alt="centaur"
      src="https://i.pinimg.com/originals/de/1d/d5/de1dd5f4e9049013e13f05621274b0c4.jpg"
      className={classNames(style.unitImage, {
        [style.orderImage]: isOrder,
        [style.topTeam]: unitTeam === 'TOP_TEAM' && isOrder,
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM' && isOrder,
      })}
    />
  </div>
);
