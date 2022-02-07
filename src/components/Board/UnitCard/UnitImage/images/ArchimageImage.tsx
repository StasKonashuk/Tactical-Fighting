import React, { ReactElement } from 'react';
import style from './UnitImage.module.css';
import classNames from 'classnames';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const ArchimageImage = ({
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => (
  <div className={style.imgContainer}>
    {gameRound && isOrder && (
      <span className={style.gameRoundValue}>{gameRound}</span>
    )}
    <img
      alt="archimage"
      src="https://i.pinimg.com/564x/e0/05/d1/e005d10d84f65caec46b87df7f52d331.jpg"
      className={classNames(style.unitImage, {
        [style.orderImage]: isOrder,
        [style.topTeam]: unitTeam === 'TOP_TEAM' && isOrder,
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM' && isOrder,
      })}
    />
  </div>
);
