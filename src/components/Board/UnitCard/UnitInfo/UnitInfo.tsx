import { ReactElement } from 'react';
import { UnitDamageType } from '../../../../units/units-types/damage-type/UnitDamageType';
import { UnitHealth } from './UnitHealth/UnitHealth';
import { UnitDamageValue } from './UnitDamageValue/UnitDamageValue';
import style from './UnitInfo.module.css';

interface IUnitInfoProps {
  hp: number;
  name: string;
  damageValue: number;
  unitDamageType: UnitDamageType;
  isDead: boolean;
  startHp: number;
}

export const UnitInfo = ({
  hp,
  startHp,
  name,
  damageValue,
  unitDamageType,
  isDead,
}: IUnitInfoProps): ReactElement => {
  return (
    <div className={style.userInfoContainer}>
      <UnitDamageValue
        damageValue={damageValue}
        unitDamageType={unitDamageType}
      />
      <span className={style.unitName}>{name}</span>
      <UnitHealth isDead={isDead} hp={hp} startHp={startHp} />
    </div>
  );
};
