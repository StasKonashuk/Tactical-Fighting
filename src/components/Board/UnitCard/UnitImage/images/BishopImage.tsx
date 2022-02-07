import React, { ReactElement } from 'react';
import classNames from 'classnames';
import style from './UnitImage.module.css';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const BishopImage = ({
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => (
  <div className={style.imgContainer}>
    {gameRound && isOrder && (
      <span className={style.gameRoundValue}>{gameRound}</span>
    )}
    <img
      alt="bishop"
      src="https://www.worldanvil.com/uploads/images/1ebd51cff77cbb5abae496965ec93d5a.jpg"
      className={classNames(style.unitImage, {
        [style.orderImage]: isOrder,
        [style.topTeam]: unitTeam === 'TOP_TEAM' && isOrder,
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM' && isOrder,
      })}
    />
  </div>
);
