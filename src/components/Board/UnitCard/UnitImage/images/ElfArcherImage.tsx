import React, { ReactElement } from 'react';
import style from './UnitImage.module.css';
import classNames from 'classnames';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const ElfArcherImage = ({
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => (
  <div className={style.imgContainer}>
    {gameRound && isOrder && (
      <span className={style.gameRoundValue}>{gameRound}</span>
    )}
    <img
      alt="elf-archer"
      src="https://i.pinimg.com/originals/31/ab/d4/31abd45b0fa076583bd9ab792fb28a10.jpg"
      className={classNames(style.unitImage, {
        [style.orderImage]: isOrder,
        [style.topTeam]: unitTeam === 'TOP_TEAM' && isOrder,
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM' && isOrder,
      })}
    />
  </div>
);
