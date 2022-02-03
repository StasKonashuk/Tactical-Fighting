import { DamageCount } from './DamageCount';
import { CardLocation } from '../../../types/types';

export class SingleTarget implements DamageCount {
  getTargets(
    possibleTargets: CardLocation[],
    targetLocation: CardLocation | undefined
  ): CardLocation[] {
    if (
      targetLocation &&
      possibleTargets.findIndex(
        (t) =>
          t.rowIndex === targetLocation.rowIndex &&
          t.columnIndex === targetLocation.columnIndex
      ) !== -1
    ) {
      return [targetLocation];
    }

    return [];
  }
}
