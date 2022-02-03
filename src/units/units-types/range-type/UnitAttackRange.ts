import { CardLocation } from '../../../types/types';
import { Location } from '../../board/Location';

export interface UnitAttackRange {
  getPossibleTargets(
    unitCardLocation: CardLocation,
    location: Location
  ): CardLocation[];
}
