import { ReactElement } from 'react';
import classNames from 'classnames';
import { Unit } from '../../../units/Unit';
import { UnitImage } from './UnitImage/UnitImage';
import { UnitInfo } from './UnitInfo/UnitInfo';
import style from './UnitCard.module.css';
import { team } from '../../../types/types';

interface UnitCardPropsType {
  unit: Unit;
  isDead: boolean;
  isDefending: boolean;
  isParalyzing: boolean;
  isCurrent: boolean;
  isTarget: boolean;
  unitTeam: string;
  handleSelectTarget: (arg: Unit) => void;
}

export const UnitCard = ({
  unit,
  isDead,
  isDefending,
  isParalyzing,
  isCurrent,
  isTarget,
  unitTeam,
  handleSelectTarget,
}: UnitCardPropsType): ReactElement => {
  return (
    <div
      onClick={() => handleSelectTarget(unit)}
      className={classNames(style.unitItem, {
        [style.current]: isCurrent,
        [style.target]: isTarget,
        [style.topTeam]: unitTeam === 'TOP_TEAM',
        [style.bottomTeam]: unitTeam === 'BOTTOM_TEAM',
      })}
    >
      <UnitImage
        unitTeam={unitTeam as team}
        gameRound={1}
        name={unit.getName()}
        isOrder={false}
        isDead={isDead}
        isParalyzing={isParalyzing}
        isDefending={isDefending}
      />
      <UnitInfo
        isDead={isDead}
        name={unit.getName()}
        hp={unit.getHealth()}
        startHp={unit.getMaxHealth()}
        damageValue={unit.getDamageValue()}
        unitDamageType={unit.getUnitType()}
      />
    </div>
  );
};
