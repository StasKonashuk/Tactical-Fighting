import { UnitType, CardLocation } from '../../types/types';

export class Board {
  private boardMatrix: Array<Array<UnitType>>;

  constructor(rowsCount: number, columnsCount: number) {
    const columns = Array<UnitType>(columnsCount).fill(null);
    this.boardMatrix = Array<Array<UnitType>>(rowsCount).fill(columns);
  }

  getBoardMatrix(): UnitType[][] {
    return this.boardMatrix;
  }

  setUnit(cardLocation: CardLocation, unit: UnitType): void {
    this.boardMatrix[cardLocation.rowIndex][cardLocation.columnIndex] = unit;
  }

  fillWithUnits(unitsMatrix: UnitType[][]) {
    this.boardMatrix = [...unitsMatrix];
  }
}
