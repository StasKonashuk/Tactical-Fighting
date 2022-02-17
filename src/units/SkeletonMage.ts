import { Unit } from './Unit';
import { Damager } from './units-types/damage-type/Damager';
import { MassTarget } from './units-types/damage-count/MassTarget';
import { Range } from './units-types/range-type/Range';

export class SkeletonMage extends Unit {
  constructor() {
    super(
      'Skeleton Mage',
      50,
      20,
      40,
      new Damager(),
      new Range(),
      new MassTarget()
    );
  }
}
