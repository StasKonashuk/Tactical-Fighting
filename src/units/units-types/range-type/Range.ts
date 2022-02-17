import { UnitAttackRange } from './UnitAttackRange';
import { CardLocation } from '../../../types/types';
import { Location } from '../../board/Location';
import { Healer } from '../damage-type/Healer';

export class Range implements UnitAttackRange {
  getPossibleTargets(
    unitCardLocation: CardLocation,
    location: Location
  ): CardLocation[] {
    const unit = location.getUnitByLocation(unitCardLocation);

    return unit && unit.getUnitType() instanceof Healer
      ? location.getAllAlliesLocation(unitCardLocation)
      : location.getAllEnemiesLocation(unitCardLocation);
  }
}
