import { UnitDamageType } from './UnitDamageType';
import { Unit } from '../../Unit';
import { Location } from '../../board/Location';
import { CardLocation, UnitType } from '../../../types/types';

export class Paralyzer implements UnitDamageType {
  deal(
    unit: Unit,
    enemiesCardLocation: CardLocation[],
    location: Location
  ): Unit[] {
    const damagedUnits: Unit[] = [];
    enemiesCardLocation.forEach((enemyCardLocation) => {
      const enemy: UnitType = location.getUnitByLocation(enemyCardLocation);
      if (enemy) {
        enemy.setInitiative(0);
        damagedUnits.push(enemy);
      }
    });

    return damagedUnits;
  }
}
