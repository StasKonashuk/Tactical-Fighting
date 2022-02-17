import { Unit } from './Unit';
import { Damager } from './units-types/damage-type/Damager';
import { SingleTarget } from './units-types/damage-count/SingleTarget';
import { Melee } from './units-types/range-type/Melee';

export class Bandit extends Unit {
  constructor() {
    super('Bandit', 75, 30, 60, new Damager(), new Melee(), new SingleTarget());
  }
}
