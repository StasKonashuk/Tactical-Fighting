import React, { ReactElement, useEffect, useState } from 'react';
import { action } from '../../../types/types';
import { Unit } from '../../../units/Unit';
import { UnitImage } from '../../Board/UnitCard/UnitImage/UnitImage';
import style from './Order.module.css';
import { UNIT_COUNT_TO_DISPLAY } from '../../../helpers/constants';

interface OrderPropsType {
  currentUnit: Unit;
  unitSequence: Unit[];
  action: action;
  gameRound: number | undefined;
}

export const Order = ({
  gameRound,
  action,
  currentUnit,
  unitSequence,
}: OrderPropsType): ReactElement => {
  const [currentSequence, setCurrentSequence] = useState<Unit[]>(unitSequence);

  useEffect(() => {
    const currentUnitIndexInSequence = unitSequence.findIndex(
      (u) => u === currentUnit
    );
    if (currentUnitIndexInSequence !== -1) {
      setCurrentSequence([
        unitSequence[currentUnitIndexInSequence],
        ...[
          ...unitSequence.slice(currentUnitIndexInSequence + 1),
          ...unitSequence.slice(0, currentUnitIndexInSequence),
        ].slice(0, UNIT_COUNT_TO_DISPLAY + 1),
      ]);
    }
  }, [currentUnit]);

  return (
    <div className={style.orderContainer}>
      {currentSequence.map((u, index) => (
        <div className={style.orderItem} key={index}>
          <UnitImage
            gameRound={gameRound}
            unitTeam={action.getTeamOfUnit(u)}
            isOrder={true}
            name={u.getName()}
          />
        </div>
      ))}
    </div>
  );
};
