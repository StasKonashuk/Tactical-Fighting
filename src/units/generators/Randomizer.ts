import { Unit } from '../Unit';
import { Skeleton } from '../Skeleton';
import { Centaur } from '../Centaur';
import { Bandit } from '../Bandit';
import { ElfArcher } from '../ElfArcher';
import { SkeletonMage } from '../SkeletonMage';
import { Archimage } from '../Archimage';
import { Monk } from '../Monk';
import { Bishop } from '../Bishop';
import { Sirena } from '../Sirena';

export class Randomizer {
  unitList: typeof Unit[];

  constructor() {
    this.unitList = [
      Skeleton,
      Centaur,
      Bandit,
      ElfArcher,
      SkeletonMage,
      Archimage,
      Monk,
      Bishop,
      Sirena,
    ];
  }

  shuffleListSequance(unitsList: Unit[]): Unit[] {
    for (let i = unitsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unitsList[i], unitsList[j]] = [unitsList[j], unitsList[i]];
    }
    return unitsList;
  }

  generateIndex(): number {
    return Math.floor(Math.random() * this.unitList.length);
  }

  generateUnit(): Unit {
    return new this.unitList[this.generateIndex()]();
  }

  generateFullBoardUnits(rowsCount: number, columnCount: number): Unit[][] {
    const matrix: Unit[][] = [];

    for (let i = 0; i < rowsCount; i++) {
      const row: Unit[] = [];
      for (let j = 0; j < columnCount; j++) {
        row.push(this.generateUnit());
      }
      matrix.push(row);
    }

    return matrix;
  }
}
