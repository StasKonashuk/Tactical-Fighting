import { Unit } from './Unit';
import { Healer } from './units-types/damage-type/Healer';
import { Range } from './units-types/range-type/Range';
import { SingleTarget } from './units-types/damage-count/SingleTarget';

export class Monk extends Unit {
  constructor() {
    super('Monk', 90, 40, 20, new Healer(), new Range(), new SingleTarget());
  }
}
