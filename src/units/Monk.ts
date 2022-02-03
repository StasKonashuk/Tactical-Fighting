import { Unit } from './Unit';
import { Healer } from './units-types/damage-type/Healer';
import { Range } from './units-types/range-type/Range';
import { MassTarget } from './units-types/damage-count/MassTarget';

export class Monk extends Unit {
  constructor() {
    super('Monk', 90, 40, 20, new Healer(), new Range(), new MassTarget());
  }
}
