import { UnitDamageType } from '../../../../../units/units-types/damage-type/UnitDamageType';
import { Damager } from '../../../../../units/units-types/damage-type/Damager';
import { Healer } from '../../../../../units/units-types/damage-type/Healer';
import { Paralyzer } from '../../../../../units/units-types/damage-type/Paralyzer';
import { ReactElement } from 'react';
import style from './UnitDamageValue.module.css';

interface UnitDamageValuePropsType {
  damageValue: number;
  unitDamageType: UnitDamageType;
}

const damageType = (unitDamageType: UnitDamageType): string => {
  if (unitDamageType instanceof Damager) {
    return 'damage';
  } else if (unitDamageType instanceof Healer) {
    return 'heal';
  } else if (unitDamageType instanceof Paralyzer) {
    return 'paralyze';
  }
  return 'damage';
};

export const UnitDamageValue = ({
  damageValue,
  unitDamageType,
}: UnitDamageValuePropsType): ReactElement => {
  return (
    <div className={style.unitDamageContainer}>
      {damageType(unitDamageType) === 'damage' ? (
        <div>
          <img
            src="https://img.icons8.com/external-neu-royyan-wijaya/32/26e07f/external-attack-neu-game-neu-royyan-wijaya.png"
            alt="value"
            className={style.damageIcon}
          />
          <span className={style.damageValue}>{damageValue}</span>
        </div>
      ) : damageType(unitDamageType) === 'heal' ? (
        <div>
          <img
            src="https://img.icons8.com/ios/50/26e07f/bandage.png"
            alt="value"
            className={style.healIcon}
          />

          <span className={style.healValue}>{damageValue}</span>
        </div>
      ) : damageType(unitDamageType) === 'paralyze' ? (
        <div>
          <img
            src="https://img.icons8.com/fluency-systems-regular/48/000000/lightning-bolt.png"
            alt="value"
            className={style.paralizeIcon}
          />
        </div>
      ) : null}
    </div>
  );
};
