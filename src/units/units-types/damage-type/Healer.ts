import { UnitDamageType } from './UnitDamageType';
import { Unit } from '../../Unit';
import { Location } from '../../board/Location';
import { CardLocation, UnitType } from '../../../types/types';

export class Healer implements UnitDamageType {
  deal(
    unit: Unit,
    unitsCardLocation: CardLocation[],
    location: Location
  ): Unit[] {
    const healedUnits: Unit[] = [];

    unitsCardLocation.forEach((card) => {
      const healedUnit: UnitType = location.getUnitByLocation(card);
      if (healedUnit) {
        const healthAfterHeal: number =
          healedUnit.getHealth() + unit.getDamageValue() >
          healedUnit.getMaxHealth()
            ? healedUnit.getMaxHealth()
            : healedUnit.getHealth() + unit.getDamageValue();
        healedUnit.setHealth(healthAfterHeal);
        healedUnits.push(healedUnit);
      }
    });

    return healedUnits;
  }
}
