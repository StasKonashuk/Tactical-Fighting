import { useEffect, useState, ReactElement } from 'react';
import { UnitType, action } from '../../types/types';
import { Unit } from '../../units/Unit';
import { UnitCard } from './UnitCard/UnitCard';
import style from './Board.module.css';

interface BoardPropsType {
  initialUnits: UnitType[][];
  units: UnitType[][];
  toSelectTarget: boolean;
  handleSelectTarget: (unit: Unit) => void;
  currentUnit: Unit;
  action: action;
}

export const Board = ({
  initialUnits,
  units,
  currentUnit,
  toSelectTarget,
  action,
  handleSelectTarget,
}: BoardPropsType): ReactElement => {
  const [possibleTargets, setPossibleTargets] = useState<UnitType[]>();

  useEffect(() => {
    if (currentUnit) {
      setPossibleTargets(action.getPossibleTargetsOfUnit(currentUnit));
    }
  }, [currentUnit]);

  return (
    <div className={style.boardContainer}>
      {initialUnits.map((row, rowIndex) => (
        <div key={rowIndex} className={style.boardRow}>
          {row.map((unit, columnIndex) => {
            return (
              <UnitCard
                unitTeam={
                  rowIndex > Math.floor(row.length / 2)
                    ? 'BOTTOM_TEAM'
                    : 'TOP_TEAM'
                }
                key={columnIndex}
                unit={unit as Unit}
                isDead={Boolean(!units[rowIndex][columnIndex])}
                isDefending={Boolean(unit?.getIsDefending())}
                isParalyzing={Boolean(unit?.getIsParalyzed())}
                isCurrent={unit === currentUnit}
                isTarget={
                  toSelectTarget &&
                  possibleTargets?.findIndex(
                    (u) => u === units[rowIndex][columnIndex]
                  ) !== -1
                }
                handleSelectTarget={handleSelectTarget}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
