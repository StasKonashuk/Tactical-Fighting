import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import style from './TurnController.module.css';

interface TurnControllerPropsType {
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
  handleDefense: () => void;
  handleAttack: () => void;
}

export const TurnController = ({
  toSelectTarget,
  setToSelectTarget,
  handleDefense,
  handleAttack,
}: TurnControllerPropsType): ReactElement => {
  return (
    <div className={style.turnControllerContainer}>
      <button onClick={() => handleAttack()} className={style.attackButton}>
        Attack
        <img
          className={style.damageIcon}
          src="https://img.icons8.com/external-flat-icons-inmotus-design/67/fa314a/external-ancien-ancient-rome-flat-icons-inmotus-design.png"
        />
      </button>
      <button className={style.defenseButton} onClick={() => handleDefense()}>
        Defense
        <img
          className={style.damageIcon}
          src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/fa314a/external-weapons-museum-icongeek26-flat-icongeek26.png"
        />
      </button>
    </div>
  );
};
