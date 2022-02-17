import { Unit } from './Unit';
import { Damager } from './units-types/damage-type/Damager';
import { SingleTarget } from './units-types/damage-count/SingleTarget';
import { Range } from './units-types/range-type/Range';

export class ElfArcher extends Unit {
  constructor() {
    super(
      'Elf Archer',
      90,
      45,
      60,
      new Damager(),
      new Range(),
      new SingleTarget()
    );
  }
}
