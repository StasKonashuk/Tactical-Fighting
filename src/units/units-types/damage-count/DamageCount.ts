import { CardLocation } from '../../../types/types';

export interface DamageCount {
  getTargets(
    possibleTargets: CardLocation[],
    targetLocation: CardLocation | undefined
  ): CardLocation[];
}
