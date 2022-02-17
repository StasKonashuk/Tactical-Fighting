import { Randomizer } from '../generators/Randomizer';
import { Board } from '../board/Board';
import { Location } from '../board/Location';
import { Action } from '../board/Action';
import { Unit } from '../Unit';
import { CardLocation, team, Team, UnitType } from '../../types/types';
import { UnitGenerator } from '../generators/UnitGenerator';

type initialGameData = {
  units: UnitType[][];
  unitGenerator: UnitGenerator;
  action: Action;
};

export class Game {
  static location: Location;
  static unitGenerator: UnitGenerator;

  static start(rowsCount: number, columnsCount: number): initialGameData {
    const randomizer = new Randomizer();
    const board = new Board(rowsCount, columnsCount);
    board.fillWithUnits(
      randomizer.generateFullBoardUnits(rowsCount, columnsCount)
    );
    this.location = new Location(board);
    const units = board.getBoardMatrix();
    this.unitGenerator = new UnitGenerator(units, randomizer);
    const action = new Action(this.location, board, this.unitGenerator);

    return {
      units,
      unitGenerator: this.unitGenerator,
      action,
    };
  }

  static finish(currentUnit: Unit): { isFinished: boolean; currentTeam: team } {
    return {
      isFinished: !this.location
        .getAllEnemiesLocation(
          this.location.getUnitCardLocation(currentUnit) as CardLocation
        )
        .some((enemyLocation) => this.location.isAlive(enemyLocation)),
      currentTeam: this.location.getTeamOfUnits(
        this.location.getUnitCardLocation(currentUnit) as CardLocation
      ),
    };
  }
}
