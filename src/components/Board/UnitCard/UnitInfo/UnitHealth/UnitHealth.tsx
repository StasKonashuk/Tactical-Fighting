import { ReactElement, useEffect, useState } from 'react';
import style from './UnitHealth.module.css';

interface UnitHealthPropsType {
  hp: number;
  isDead: boolean;
  startHp: number;
}

export const UnitHealth = ({
  hp,
  isDead,
  startHp,
}: UnitHealthPropsType): ReactElement => {
  return (
    <div className={style.unitHealthContainer}>
      {!isDead && (
        <div
          style={{
            minHeight: '0px',
            height: `${255 - (hp * 255) / startHp}px`,
          }}
          className={style.healthPointContainer}
        ></div>
      )}

      <img
        src="https://img.icons8.com/glyph-neue/100/fa314a/like.png"
        alt="hp"
      />
      <span className={style.healthValue}>{hp}</span>
    </div>
  );
};
