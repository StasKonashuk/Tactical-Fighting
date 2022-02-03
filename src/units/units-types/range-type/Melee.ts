import { UnitAttackRange } from './UnitAttackRange';
import { CardLocation, Team } from '../../../types/types';
import { Location } from '../../board/Location';

export class Melee implements UnitAttackRange {
  getPossibleTargets(
    unitCardLocation: CardLocation,
    location: Location
  ): CardLocation[] {
    const enemiesLocation = location.getEnemiesLocation(unitCardLocation);

    if (enemiesLocation.length) {
      return enemiesLocation;
    }

    const unitTeam: Team | null = location.getTeamOfUnits(unitCardLocation);
    if (unitTeam && unitTeam === location.getTeamOfNextLine(unitCardLocation)) {
      return [];
    }

    const nearestLineEnemiesLocation: CardLocation[] | null =
      location.getNearestEnemiesLocation(unitCardLocation);

    if (nearestLineEnemiesLocation) {
      return nearestLineEnemiesLocation;
    }

    return [];
  }
}
