import { Melee } from './units-types/range-type/Melee';
import { UnitAttackRange } from './units-types/range-type/UnitAttackRange';
import { UnitDamageType } from './units-types/damage-type/UnitDamageType';
import { Damager } from './units-types/damage-type/Damager';
import { DamageCount } from './units-types/damage-count/DamageCount';
import { SingleTarget } from './units-types/damage-count/SingleTarget';
import { CardLocation } from '../types/types';
import { Location } from './board/Location';

export class Unit {
  private name: string;
  private health: number;
  private maxHealth: number;
  private damageValue: number;
  private initiative: number;
  private originInitiative: number;
  private isDefending: boolean;
  private unitType: UnitDamageType;
  private attackRangeType: UnitAttackRange;
  private damageCount: DamageCount;

  constructor(
    name?: string,
    health?: number,
    damageValue?: number,
    initiative?: number,
    unitType?: UnitDamageType,
    attackRangeType?: UnitAttackRange,
    damageCount?: DamageCount
  ) {
    this.name = name || '';
    this.health = health || 0;
    this.maxHealth = health || 0;
    this.damageValue = damageValue || 0;
    this.initiative = initiative || 0;
    this.originInitiative = initiative || 0;
    this.isDefending = false;
    this.unitType = unitType || new Damager();
    this.attackRangeType = attackRangeType || new Melee();
    this.damageCount = damageCount || new SingleTarget();
  }

  getPossibleTargets(
    boardLocation: CardLocation,
    location: Location
  ): CardLocation[] {
    return this.attackRangeType.getPossibleTargets(boardLocation, location);
  }

  getTargets(
    boardLocation: CardLocation,
    location: Location,
    enemyBoardLocation: CardLocation | undefined
  ): CardLocation[] {
    return this.damageCount.getTargets(
      this.getPossibleTargets(boardLocation, location),
      enemyBoardLocation
    );
  }

  deal(
    boardLocation: CardLocation,
    location: Location,
    enemyBoardLocation: CardLocation | undefined = undefined
  ): Unit[] {
    return this.unitType.deal(
      this,
      this.getTargets(boardLocation, location, enemyBoardLocation),
      location
    );
  }

  getName(): string {
    return this.name;
  }

  getHealth(): number {
    return this.health;
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }

  getDamageValue(): number {
    return this.damageValue;
  }

  getInitiative(): number {
    return this.initiative;
  }

  getOriginInitiative(): number {
    return this.originInitiative;
  }

  getIsDefending(): boolean {
    return this.isDefending;
  }

  getUnitType(): UnitDamageType {
    return this.unitType;
  }

  getDamageCount(): DamageCount {
    return this.damageCount;
  }

  setHealth(value: number): void {
    this.health = value;
  }

  setInitiative(value: number): void {
    this.initiative = value;
  }

  setIsDefending(value: boolean): void {
    this.isDefending = value;
  }
}
