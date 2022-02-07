import React, { ReactElement } from 'react';
import style from './UnitImage.module.css';
import classNames from 'classnames';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const SkeletonMageImage = ({
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => (
  <div className={style.imgContainer}>
    {gameRound && isOrder && (
      <span className={style.gameRoundValue}>{gameRound}</span>
    )}
    <img
      alt="skeleton-mage"
      src="https://cs10.pikabu.ru/post_img/big/2019/07/18/7/1563447298187165551.jpg"
      className={classNames(style.unitImage, {
        [style.orderImage]: isOrder,
        [style.topTeam]: unitTeam === 'TOP_TEAM' && isOrder,
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM' && isOrder,
      })}
    />
  </div>
);
