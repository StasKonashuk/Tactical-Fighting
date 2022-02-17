import { Unit } from './Unit';
import { Paralyzer } from './units-types/damage-type/Paralyzer';
import { Range } from './units-types/range-type/Range';
import { SingleTarget } from './units-types/damage-count/SingleTarget';

export class Sirena extends Unit {
  constructor() {
    super(
      'Sirena',
      80,
      0,
      20,
      new Paralyzer(),
      new Range(),
      new SingleTarget()
    );
  }
}
