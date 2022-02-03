import { Unit } from './Unit';
import { Damager } from './units-types/damage-type/Damager';
import { SingleTarget } from './units-types/damage-count/SingleTarget';
import { Melee } from './units-types/range-type/Melee';

export class Centaur extends Unit {
  constructor() {
    super(
      'Centaur',
      150,
      50,
      50,
      new Damager(),
      new Melee(),
      new SingleTarget()
    );
  }
}
