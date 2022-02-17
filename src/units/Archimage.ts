import { Unit } from './Unit';
import { Range } from './units-types/range-type/Range';
import { MassTarget } from './units-types/damage-count/MassTarget';
import { Damager } from './units-types/damage-type/Damager';

export class Archimage extends Unit {
  constructor() {
    super(
      'Archimage',
      90,
      30,
      40,
      new Damager(),
      new Range(),
      new MassTarget()
    );
  }
}
