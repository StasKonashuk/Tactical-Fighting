import { Board } from './Board';
import { Team, CardLocation, UnitType } from '../../types/types';

export class Location {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  getUnitCardLocation(unit: UnitType) {
    let rowIndex = 0;
    let columnIndex = 0;
    let wasFound = false;

    this.board.getBoardMatrix().every((row) => {
      const index: number = row.findIndex((u) => u === unit);
      if (index === -1) {
        rowIndex += 1;
      } else {
        wasFound = true;
        columnIndex = index;
        return false;
      }
      return true;
    });

    if (wasFound) {
      return { rowIndex, columnIndex };
    } else {
      return null;
    }
  }

  getUnitByLocation(cardLocation: CardLocation): UnitType {
    if (cardLocation) {
      return this.board.getBoardMatrix()[cardLocation.rowIndex][
        cardLocation.columnIndex
      ];
    }
    return null;
  }

  isAlive(cardLocation: CardLocation): boolean {
    return Boolean(
      this.board.getBoardMatrix()[cardLocation.rowIndex][
        cardLocation.columnIndex
      ]
    );
  }

  private removeDeadUnits<Value>(
    value: Value | null | undefined
  ): value is Value {
    return value !== null && value !== undefined;
  }

  getTeamOfUnits(unitCardLocation: CardLocation): Team {
    return unitCardLocation.rowIndex <
      Math.floor(this.board.getBoardMatrix().length / 2)
      ? Team.topTeam
      : Team.bottomTeam;
  }

  getEnemiesLocation(unitCardLocation: CardLocation): CardLocation[] {
    const team = this.getTeamOfUnits(unitCardLocation);
    const teamValue: number = team === Team.topTeam ? 1 : -1;

    const enemiesUnitsLocation: CardLocation[] = [];

    const enemyLocation = {
      rowIndex: unitCardLocation.rowIndex + teamValue,
      columnIndex: unitCardLocation.columnIndex,
    };

    const hasEnemiesNextLine: boolean =
      this.getTeamOfUnits({
        rowIndex: unitCardLocation.rowIndex + teamValue,
        columnIndex: unitCardLocation.columnIndex,
      }) !== team;

    const hasLeftEnemy: boolean =
      unitCardLocation.columnIndex - 1 >= 0 && hasEnemiesNextLine;

    const hasRightEnemy: boolean =
      unitCardLocation.columnIndex + 1 <
        this.board.getBoardMatrix()[unitCardLocation.rowIndex].length &&
      hasEnemiesNextLine;

    if (hasEnemiesNextLine) {
      if (this.isAlive(enemyLocation)) {
        enemiesUnitsLocation.push(enemyLocation);
      }
    }

    const leftEnemyLocation = {
      rowIndex: unitCardLocation.rowIndex + teamValue,
      columnIndex: unitCardLocation.columnIndex - 1,
    };

    const rightEnemyLocation = {
      rowIndex: unitCardLocation.rowIndex + teamValue,
      columnIndex: unitCardLocation.columnIndex + 1,
    };

    if (hasEnemiesNextLine && hasLeftEnemy && this.isAlive(leftEnemyLocation)) {
      enemiesUnitsLocation.push(leftEnemyLocation);
    }

    if (
      hasEnemiesNextLine &&
      hasRightEnemy &&
      this.isAlive(rightEnemyLocation)
    ) {
      enemiesUnitsLocation.push(rightEnemyLocation);
    }

    return enemiesUnitsLocation;
  }

  private getRowEnemiesLocation(rowIndex: number): (CardLocation | null)[] {
    return this.board
      .getBoardMatrix()
      [rowIndex].filter((u) => u && u.getHealth() > 0)
      .map((u) => {
        const unitCardLocation = this.getUnitCardLocation(u as UnitType);
        if (unitCardLocation) {
          return unitCardLocation;
        }
        return null;
      });
  }

  getTeamOfNextLine(unitCardLocation: CardLocation): Team | null {
    const team = this.getTeamOfUnits(unitCardLocation);
    const teamValue: number = team ? 1 : -1;

    if (
      this.getRowEnemiesLocation(unitCardLocation.rowIndex + teamValue)
        .length === 0
    ) {
      return null;
    }

    return this.getTeamOfUnits({
      rowIndex: unitCardLocation.rowIndex + teamValue,
      columnIndex: unitCardLocation.columnIndex,
    });
  }

  getNearestEnemiesLocation(
    unitCardLocation: CardLocation
  ): CardLocation[] | null {
    const matrix = this.board.getBoardMatrix();
    const teamOfUnits: Team = this.getTeamOfUnits(unitCardLocation);
    const rowsHalfIndex = Math.floor(matrix.length / 2);

    if (teamOfUnits === Team.topTeam) {
      for (let i = rowsHalfIndex; i < matrix.length; i += 1) {
        if (matrix[i].filter((u) => u).length) {
          return this.getRowEnemiesLocation(i).filter(this.removeDeadUnits);
        }
      }
    } else {
      for (let i = rowsHalfIndex - 1; i >= 0; i -= 1) {
        if (matrix[i].filter((u) => u).length) {
          return this.getRowEnemiesLocation(i).filter(this.removeDeadUnits);
        }
      }
    }
    return null;
  }

  private switchTeam(team: Team) {
    return team === Team.bottomTeam ? Team.topTeam : Team.bottomTeam;
  }

  private getAllTeamUnits(
    unitBoardLocation: CardLocation,
    allies = false
  ): CardLocation[] {
    const matrix = this.board.getBoardMatrix();
    const teamOfUnits: Team = this.getTeamOfUnits(unitBoardLocation);
    const consideringTeam = allies ? this.switchTeam(teamOfUnits) : teamOfUnits;
    const rowsHalfIndex = Math.floor(matrix.length / 2);
    const enemiesUnitsLocation = [];

    if (consideringTeam === Team.bottomTeam) {
      for (let i = rowsHalfIndex - 1; i >= 0; i -= 1) {
        for (let j = 0; j < matrix[i].length; j += 1) {
          if (matrix[i][j]) {
            const enemyBoardLocation = this.getUnitCardLocation(
              matrix[i][j] as UnitType
            );
            if (enemyBoardLocation) {
              enemiesUnitsLocation.push(enemyBoardLocation);
            }
          }
        }
      }
    } else {
      for (let i = rowsHalfIndex; i < matrix.length; i += 1) {
        for (let j = 0; j < matrix[i].length; j += 1) {
          if (matrix[i][j]) {
            const enemyBoardLocation = this.getUnitCardLocation(
              matrix[i][j] as UnitType
            );
            if (enemyBoardLocation) {
              enemiesUnitsLocation.push(enemyBoardLocation);
            }
          }
        }
      }
    }

    return enemiesUnitsLocation;
  }

  getAllEnemiesLocation(unitBoardLocation: CardLocation): CardLocation[] {
    return this.getAllTeamUnits(unitBoardLocation);
  }

  getAllAlliesLocation(unitBoardLocation: CardLocation): CardLocation[] {
    return this.getAllTeamUnits(unitBoardLocation, true);
  }
}
