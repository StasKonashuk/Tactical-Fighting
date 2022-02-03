import { Randomizer } from './Randomizer';
import { Unit } from '../Unit';
import { UnitType } from '../../types/types';

export class UnitGenerator {
  private unitList: Unit[];
  unitGenerator: Generator<Unit>;
  private currentUnit: Unit;

  constructor(units: UnitType[][], randomizer: Randomizer) {
    this.unitList = this.splitByEqualInitiative(
      units.filter((u) => u) as Unit[][]
    ).reduce((acc, currentArray) => [
      ...acc,
      ...randomizer.shuffleListSequance(currentArray),
    ]);
    this.unitGenerator = this.generator();
    this.currentUnit = this.unitList[0];
  }

  *generator() {
    while (true) {
      yield* this.unitList;
    }
  }

  private skipCurrentUnit(): boolean {
    return (
      !this.currentUnit ||
      this.currentUnit.getHealth() <= 0 ||
      this.currentUnit.getInitiative() <= 0
    );
  }

  private getFilterCondition(u: Unit): boolean {
    return u && u.getHealth() > 0 && u.getInitiative() > 0;
  }

  next(): Unit {
    this.currentUnit = this.unitGenerator.next().value;

    while (this.currentUnit?.getInitiative() <= 0) {
      this.clearCurrentUnitParalyzation();
      this.currentUnit = this.unitGenerator.next().value;
    }

    while (this.skipCurrentUnit()) {
      this.currentUnit = this.unitGenerator.next().value;
    }

    if (this.currentUnit === this.unitList.filter(this.getFilterCondition)[0]) {
      this.removeDefending();
    }

    return this.currentUnit;
  }

  getUnitList(): Unit[] {
    return this.unitList.filter((u) => this.getFilterCondition(u));
  }

  getCurrentUnit(): Unit {
    return this.currentUnit;
  }

  private splitByEqualInitiative(units: Unit[][]): Unit[][] {
    const sortedUnitList = this.sortByInitiativeUnitsList(units);
    const equalInitiativeArrays: Unit[][] = [];

    let tempArr = [];
    for (let i = sortedUnitList.length - 1; i >= 0; i -= 1) {
      if (
        i !== sortedUnitList.length - 1 &&
        sortedUnitList[i].getInitiative() !==
          sortedUnitList[i + 1].getInitiative()
      ) {
        equalInitiativeArrays.push(tempArr);
        tempArr = [];
      }
      tempArr.push(sortedUnitList[i]);
      if (i === 0) {
        equalInitiativeArrays.push(tempArr);
      }
    }

    return equalInitiativeArrays;
  }

  private clearCurrentUnitParalyzation(): void {
    this.currentUnit.setInitiative(this.currentUnit.getOriginInitiative());
  }

  private removeDefending(): void {
    this.unitList
      .filter((u) => u && u.getHealth() > 0)
      .forEach((u) => {
        u.setIsDefending(false);
      });
  }

  private sortByInitiativeUnitsList(units: Unit[][]) {
    const list: Unit[] = [];
    units.forEach((row) => {
      row.forEach((unit) => {
        list.push(unit);
      });
    });

    return list.sort((a, b) => a.getInitiative() - b.getInitiative());
  }
}
