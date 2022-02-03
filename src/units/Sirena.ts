import { Unit } from './Unit';
import { Paralyzer } from './units-types/damage-type/Paralyzer';
import { Range } from './units-types/range-type/Range';
import { MassTarget } from './units-types/damage-count/MassTarget';

export class Sirena extends Unit {
  constructor() {
    super('Sirena', 80, 0, 20, new Paralyzer(), new Range(), new MassTarget());
  }
}
