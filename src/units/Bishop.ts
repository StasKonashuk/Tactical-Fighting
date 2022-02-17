import { Unit } from './Unit';
import { Healer } from './units-types/damage-type/Healer';
import { Range } from './units-types/range-type/Range';
import { MassTarget } from './units-types/damage-count/MassTarget';

export class Bishop extends Unit {
  constructor() {
    super('Bishop', 130, 25, 20, new Healer(), new Range(), new MassTarget());
  }
}
