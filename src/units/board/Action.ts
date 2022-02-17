import { Location } from './Location';
import { Board } from './Board';
import { Unit } from '../Unit';
import {
  CardLocation,
  UnitType,
  ActionType,
  Team,
  team,
} from '../../types/types';
import { SingleTarget } from '../units-types/damage-count/SingleTarget';
import { UnitGenerator } from '../generators/UnitGenerator';
import { MassTarget } from '../units-types/damage-count/MassTarget';

export class Action {
  private location: Location;
  private board: Board;
  private unitGenerator: UnitGenerator;

  constructor(location: Location, board: Board, unitGenerator: UnitGenerator) {
    this.location = location;
    this.board = board;
    this.unitGenerator = unitGenerator;
  }

  doAction(
    action: ActionType,
    unit: Unit,
    targetCardLocation?: CardLocation
  ): void | ((targetEnemyBoardLocation: CardLocation) => void) {
    switch (action) {
      case ActionType.attack:
        const dealAction = this.deal(unit);
        if (
          !(unit.getDamageCount() instanceof MassTarget) &&
          dealAction &&
          targetCardLocation
        ) {
          dealAction(targetCardLocation);
        }
        this.unitGenerator.next();
        break;
      case ActionType.defense:
        this.defense(unit);
        this.unitGenerator.next();
        break;
      default:
        throw new Error('There is no such an action');
    }
  }

  private killUnit(boardLocation: CardLocation): void {
    this.board.setUnit(boardLocation, null);
  }

  private checkAndRemoveDeadUnits(enemiesCardLocations: CardLocation[]): void {
    enemiesCardLocations.forEach((e) => {
      const enemyUnit: UnitType = this.location.getUnitByLocation(e);
      if (enemyUnit && enemyUnit.getHealth() <= 0) {
        this.killUnit(e);
      }
    });
  }

  private attackSingleTarget(
    unit: Unit,
    targetEnemyBoardLocation: CardLocation
  ): void {
    const unitBoardLocation = this.location.getUnitCardLocation(unit);
    if (unitBoardLocation) {
      unit.deal(unitBoardLocation, this.location, targetEnemyBoardLocation);
    }
  }

  private attackAllTargets(unit: Unit) {
    const unitBoardLocation = this.location.getUnitCardLocation(unit);
    unit.deal(unitBoardLocation as CardLocation, this.location);
  }

  private deal(
    unit: Unit
  ): void | ((targetEnemyBoardLocation: CardLocation) => void) {
    const unitCardLocation = this.location.getUnitCardLocation(unit);

    if (unitCardLocation && unit.getDamageCount() instanceof SingleTarget) {
      return (targetEnemyCardLocation: CardLocation) => {
        this.attackSingleTarget(unit, targetEnemyCardLocation);
        this.checkAndRemoveDeadUnits(
          this.location.getAllEnemiesLocation(
            this.location.getUnitCardLocation(unit) as CardLocation
          )
        );
      };
    } else if (
      unitCardLocation &&
      unit.getDamageCount() instanceof MassTarget
    ) {
      this.attackAllTargets(unit);
      this.checkAndRemoveDeadUnits(
        this.location.getAllEnemiesLocation(
          this.location.getUnitCardLocation(unit) as CardLocation
        )
      );
    }
  }

  private defense(unit: Unit): void {
    unit.setIsDefending(true);
  }

  getPossibleTargetsOfUnit(unit: Unit): UnitType[] {
    return unit
      .getPossibleTargets(
        this.location.getUnitCardLocation(unit) as CardLocation,
        this.location
      )
      .map((loc) => this.location.getUnitByLocation(loc));
  }

  getBoardLocationOfTarget(unit: Unit): CardLocation | null {
    return this.location.getUnitCardLocation(unit);
  }

  getTeamOfUnit(unit: Unit): team {
    return this.location.getTeamOfUnits(
      this.location.getUnitCardLocation(unit) as CardLocation
    );
  }
}
