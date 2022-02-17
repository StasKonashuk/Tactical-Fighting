import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { action, unitGenerator } from '../../types/types';
import { Unit } from '../../units/Unit';
import { Order } from './Order/Order';
import { TurnController } from './TurnController/TurnController';
import style from './Sidebar.module.css';

interface SidebarPropsType {
  action: action;
  unitGenerator: unitGenerator;
  toSelectTarget: boolean;
  setToSelectTarget: Dispatch<SetStateAction<boolean>>;
  currentUnit: Unit;
  handleDefense: () => void;
  handleAttack: () => void;
  gameRound: number | undefined;
}

export const Sidebar = ({
  action,
  toSelectTarget,
  setToSelectTarget,
  currentUnit,
  unitGenerator,
  handleDefense,
  handleAttack,
  gameRound,
}: SidebarPropsType): ReactElement | null => {
  if (!currentUnit) {
    return null;
  }

  return (
    <div className={style.sideBarContainer}>
      <Order
        gameRound={gameRound}
        action={action}
        currentUnit={currentUnit as unknown as Unit}
        unitSequence={unitGenerator.getUnitList().filter((u) => u)}
      />
      <TurnController
        toSelectTarget={toSelectTarget}
        setToSelectTarget={setToSelectTarget}
        handleDefense={handleDefense}
        handleAttack={handleAttack}
      />
    </div>
  );
};
