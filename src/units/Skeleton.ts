import { Unit } from './Unit';
import { Damager } from './units-types/damage-type/Damager';
import { SingleTarget } from './units-types/damage-count/SingleTarget';
import { Melee } from './units-types/range-type/Melee';

export class Skeleton extends Unit {
  constructor() {
    super(
      'Skeleton',
      100,
      25,
      50,
      new Damager(),
      new Melee(),
      new SingleTarget()
    );
  }
}
