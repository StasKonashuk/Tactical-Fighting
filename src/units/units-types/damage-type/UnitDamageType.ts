import { CardLocation } from '../../../types/types';
import { Location } from '../../board/Location';
import { Unit } from '../../Unit';

export interface UnitDamageType {
  deal(
    unit: Unit,
    enemiesCardLocation: CardLocation[],
    location: Location
  ): Unit[];
}
