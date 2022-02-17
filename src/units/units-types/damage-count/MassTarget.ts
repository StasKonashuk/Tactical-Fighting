import { DamageCount } from './DamageCount';
import { CardLocation } from '../../../types/types';

export class MassTarget implements DamageCount {
  getTargets(possibleTargets: CardLocation[]): CardLocation[] {
    return possibleTargets;
  }
}
