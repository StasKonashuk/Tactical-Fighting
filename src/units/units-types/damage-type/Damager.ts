import { UnitDamageType } from './UnitDamageType';
import { Unit } from '../../Unit';
import { Location } from '../../board/Location';
import { CardLocation, UnitType } from '../../../types/types';

export class Damager implements UnitDamageType {
  deal(
    unit: Unit,
    enemiesCardLocation: CardLocation[],
    location: Location
  ): Unit[] {
    const damagedUnits: Unit[] = [];
    enemiesCardLocation.forEach((enemyCardLocation) => {
      const enemy: UnitType = location.getUnitByLocation(enemyCardLocation);
      if (enemy) {
        const restHp = enemy.getIsDefending()
          ? enemy.getHealth() - 0.5 * unit.getDamageValue()
          : enemy.getHealth() - unit.getDamageValue();
        enemy.setHealth(restHp);
        damagedUnits.push(enemy);
      }
    });

    return damagedUnits;
  }
}
